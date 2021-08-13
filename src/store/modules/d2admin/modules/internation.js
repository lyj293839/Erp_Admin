import util from '@/libs/util.js'
export default {
    namespaced: true,
    state: {
        // 中英文
        value: 'cn' // en cn
    },
    actions: {
        /**
         * @description 设置中英文
         * @param {Object} state vuex state
         * @param {String} internation 国际
         */
        set ({ state, dispatch }, internation) {
            return new Promise(async resolve => {
                // store 赋值
                state.value = internation
                // 持久化
                await dispatch('d2admin/db/set', {
                    dbName: 'sys',
                    path: 'internation.value',
                    value: state.value,
                    user: true
                }, { root: true })
                // end
                resolve()
                // util.cookies.set('language', internation)
            })
        },
        /**
         * @description 从持久化数据读取尺寸设置
         * @param {Object} state vuex state
        */
        load ({ state, dispatch }) {
            return new Promise(async resolve => {
                // store 赋值
                state.value = await dispatch('d2admin/db/get', {
                    dbName: 'sys',
                    path: 'internation.value',
                    defaultValue: 'default',
                    user: true
                }, { root: true })
                // end
                resolve()
            })
        }
    }
}
