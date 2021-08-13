// polyfill
import 'babel-polyfill'
// Vue
import Vue from 'vue'
import App from './App'
// store
import store from '@/store/index'
// 模拟数据
// import '@/mock'
// 多国语
import i18n from './i18n'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 菜单和路由设置
import router from './router'

import util from '@/libs/util.js'
import menuHeader from '@/menu/header'
import menuAside from '@/menu/aside'
// eslint-disable-next-line camelcase
import { frameInRoutes } from '@/router/routes'
import vuePicturePreview from 'vue-picture-preview'
import VueBus from 'vue-bus'
import Print from 'vue-print-nb'

import UmyUi from 'umy-ui'
import 'umy-ui/lib/theme-chalk/index.css';// 引入样式
Vue.use(UmyUi);

Vue.use(Print);
// eslint-disable-next-line no-unused-vars
import { forceFileDownload, getEnumValue, getImgPath, attr, getDate, is, beforeSearch,workflow,downGo,upGo,showCustomer,showCustomer_sale } from './utils'
// eslint-disable-next-line eqeqeq
import './directives'
// import enums from './enum/enums'
var menuAside2=menuAside
var menuAside_local = JSON.parse(localStorage.getItem('menuAside'))
if(menuAside_local){
    menuAside2 = menuAside_local
}
let language = util.cookies.get('language')
let token = util.cookies.get('token')
if(token&&language != 'zh' && language != 'cn' && language!='en'){
}
if (language === 'zh' || language === 'cn') {
  i18n.locale = 'cn'
} else {
  i18n.locale = 'en'
}

Vue.use(VueQuillEditor)
Vue.use(vuePicturePreview)
Vue.use(VueBus)
// 核心插件
Vue.use(d2Admin)
// Vue.prototype.enums = enums
Vue.prototype.GEnums = JSON.parse(localStorage.getItem("enum"))
Vue.prototype.GEnums_OP = [
  {
    name: ""
  },
  {
    name: "≥"
  },
  {
    name: "≤"
  },{
    name: "="
  }
]
Vue.prototype.getImgPath = getImgPath
Vue.prototype.getEnumValue = getEnumValue
Vue.prototype.showCustomer = showCustomer
Vue.prototype.showCustomer_sale = showCustomer_sale
Vue.prototype.workflow = workflow
Vue.prototype.upGo = upGo
Vue.prototype.downGo = downGo
// eslint-disable-next-line no-undef
Vue.prototype.getDate = getDate
Vue.prototype.attr = attr
Vue.prototype.beforeSearch = beforeSearch
Vue.prototype.forceFileDownload = forceFileDownload

// const errorHandler = (error, vm) => {
//   console.error('抛出全局异常')
//   console.error(vm)
//   console.error(error)
// }
//
// Vue.config.errorHandler = errorHandler
// Vue.prototype.$throw = (error) => errorHandler(error, this)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 设置侧边栏菜单
    this.$store.commit('d2admin/menu/asideSet', menuAside2)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    // this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')