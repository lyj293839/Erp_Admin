import util from '@/libs/util.js'
import Cookies from 'js-cookie'
import {AccountLogin} from '@/api/sys/login'
import {user_edit} from '@/api/organize';
import menuAside from '@/menu/aside'
import store from '@/store/index'
import i18n from '@/i18n'
import $ from 'jquery'

export default {
    namespaced: true,
    actions: {
        /**
         * @description 登录
         * @param {Object} param context
         * @param {Object} param vm {Object} vue 实例
         * @param {Object} param username {String} 用户账号
         * @param {Object} param password {String} 密码
         * @param {Object} param route {Object} 登录成功后定向的路由对象
         */

        login({dispatch, commit}, {
            vm,
            username,
            password,
            language,
            macdata,
            route = {
                name: 'index'
            }
        }) {
            // 开始请求登录接口
            AccountLogin({
                username,
                password,
                language,
                macdata
            }).then(async res => {

                // 设置 cookie 一定要存 uuid 和 token 两个 cookie
                // 整个系统依赖这两个数据进行校验和存储
                // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
                // token 代表用户当前登录状态 建议在网络请求中携带 token
                // 如有必要 token 需要定时更新，默认保存一天
                // util.cookies.set('uuid', res.uuid)
                //   util.cookies.set('permissions', JSON.stringify(res.data.permissions))
                util.cookies.set('user_name', res.data.user.username)
                util.cookies.set('user_tel', res.data.user.tel)
                util.cookies.set('user_fax', res.data.user.fax)
                util.cookies.set('user_id', res.data.user.id)
                util.cookies.set('is_xiangmubu', res.data.user.is_xiangmubu)
                util.cookies.set('member_id', res.data.user.member_id )
                util.cookies.set('user_type', res.data.user.user_type)
                util.cookies.set('department_id', res.data.user.department_id)
                util.cookies.set('token', res.token)
                util.cookies.set('session_id', res.session_id)
                util.cookies.set('name', res.data.user.name)
                util.cookies.set('password', password)
                util.cookies.set('language', language)
                util.cookies.set('user_flag', res.data.user.flag)
                if (language === 'zh' || language === 'cn') {
                    i18n.locale = 'cn'
                } else {
                    i18n.locale = 'en'
                }
                localStorage.setItem('roles_ids', JSON.stringify(res.data.user.roles))
                localStorage.setItem('permissions', JSON.stringify(res.data.permissions))
                localStorage.setItem('permission_names', JSON.stringify(res.data.permission_names))
                var permissions = JSON.parse(localStorage.getItem('permissions'))
                var permission_names = JSON.parse(localStorage.getItem('permission_names'))
                if (res.data.permissions != null && res.data.permissions != '' && res.data.permissions.length > 0) {
                    permissions = res.data.permissions
                } else {
                    permissions = []
                }
                if (res.data.permission_names != null && res.data.permission_names != '') {
                    permission_names = res.data.permission_names
                } else {
                    permission_names = []
                }
                let menuAside2 = JSON.parse(JSON.stringify(menuAside))
                for (var i = menuAside2.length - 1; i > -1; i--) {
                    var name_ = menuAside2[i].name
                    if (permissions && permissions.indexOf(menuAside2[i].id) == -1 && (permission_names && !permission_names[name_])) {
                        menuAside2.splice(i, 1)
                    } else {
                        for (var y = menuAside2[i].children.length - 1; y > -1; y--) {
                            if (menuAside2[i].children[y].is_name) {
                                var name = menuAside2[i].children[y].name
                                if (permission_names && permission_names[name] != name) {
                                    menuAside2[i].children.splice(y, 1)
                                }
                            } else {
                                if (permissions && permissions.indexOf(menuAside2[i].children[y].id) == -1) {
                                    menuAside2[i].children.splice(y, 1)
                                }
                            }

                        }
                    }
                }
                localStorage.setItem('menuAside', JSON.stringify(menuAside2))
                if (res.data.user.need_change_password == 1) {
                    vm.dialogVisible = true
                    user_edit(res.data.user.id).then(res => {
                        if (res && res.code == 0) {
                            vm.user_form = {
                                id: res.data.id,
                                only_id: res.data.only_id,
                                member_id: res.data.member_id,
                                department_id: res.data.department_id,
                                name: res.data.name,
                                tel: res.data.tel,
                                password: '',
                                fax: res.data.fax,
                                username: res.data.username,
                                email: res.data.email,
                                role_id: res.data.role_id,
                                sex: res.data.sex,
                                user_type: res.data.user_type,
                                grade: res.data.grade,
                                status: res.data.status,
                            }
                        }
                    })
                } else {
                    commit('d2admin/menu/asideSet', menuAside2, {root: true})
                    // 设置 vuex 用户信息
                    await dispatch('d2admin/user/set', {
                        name: username
                    }, {root: true})
                    // 用户登录后从持久化数据加载一系列的设置
                    await dispatch('load')
                    // // 更新路由 尝试去获取 cookie 里保存的需要重定向的页面完整地址
                    const path = util.cookies.get('redirect')
                    // // 根据是否存有重定向页面判断如何重定向
                    vm.$router.replace(path ? {path} : route)
                    // // 删除 cookie 中保存的重定向页面
                    util.cookies.remove('redirect')
                }
            }).catch(err => {
                console.log('err: ', err)
            })
        },
        /**
         * @description 注销用户并返回登录页面
         * @param {Object} param context
         * @param {Object} param vm {Object} vue 实例
         * @param {Object} param confirm {Boolean} 是否需要确认
         */
        logout({commit}, {vm, confirm = false}) {
            /**
             * @description 注销
             */
            function logout() {
                // 删除cookie
                util.cookies.remove('token')
                util.cookies.remove('uuid')
                util.cookies.remove('user_id')
                localStorage.removeItem('Inquery-inquery')
                localStorage.removeItem('Inquery-inquery2')
                localStorage.removeItem('Inquery-inquery3')
                localStorage.removeItem('Inquery-inquery4')
                localStorage.removeItem('Inquery-inquery5')
                localStorage.removeItem('Inquery-inquery6')
                localStorage.removeItem('Inquery-inquery7')
                localStorage.removeItem('Inquery-inquery8')
                localStorage.removeItem('Inquery-inquery9')
                localStorage.removeItem('Inquery-inquery10')
                // var body = document.getElementsByTagName("body");
                // var div = document.createElement("div");
                // div.innerHTML = '<iframe id="iframe_logout" src="'+process.env.VUE_APP_IFRAME_URL+'currentaccount'+'" style="display:none;width:100%;frameborder=no" frameborder="no" border="0" marginWidth=0 marginHeight=0></iframe>'
                // document.body.appendChild(div)
                // var iframe_logout = document.getElementById('iframe_logout');
                // console.log(document.getElementById("iframe_logout"))
                // iframe_logout.onload = function () {
                //   iframe_logout.contentWindow.postMessage('logout',process.env.VUE_APP_IFRAME_URL+'currentaccount');
                // }
                // 跳转路由
                vm.$router.push({
                    name: 'login'
                })
            }

            // 判断是否需要确认
            if (confirm) {
                commit('d2admin/gray/set', true, {root: true})
                vm.$confirm('退出当前账户吗?  打开的标签页和用户设置将会被保存。', '确认操作', {
                    confirmButtonText: '确定退出',
                    cancelButtonText: '放弃',
                    type: 'warning'
                })
                    .then(() => {
                        commit('d2admin/gray/set', false, {root: true})
                        logout()
                    })
                    .catch(() => {
                        commit('d2admin/gray/set', false, {root: true})
                    })
            } else {
                logout()
            }
        },
        /**
         * @description 用户登录后从持久化数据加载一系列的设置
         * @param {Object} state vuex state
         */
        load({commit, dispatch}) {
            return new Promise(async resolve => {
                // DB -> store 加载用户名
                await dispatch('d2admin/user/load', null, {root: true})
                // DB -> store 加载主题
                await dispatch('d2admin/theme/load', null, {root: true})
                // DB -> store 加载页面过渡效果设置
                await dispatch('d2admin/transition/load', null, {root: true})
                // DB -> store 持久化数据加载上次退出时的多页列表
                await dispatch('d2admin/page/openedLoad', null, {root: true})
                // DB -> store 持久化数据加载侧边栏折叠状态
                await dispatch('d2admin/menu/asideCollapseLoad', null, {root: true})
                // DB -> store 持久化数据加载全局尺寸
                await dispatch('d2admin/size/load', null, {root: true})
                // end
                resolve()
            })
        }
    }
}
