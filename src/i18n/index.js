import Vue from 'vue'
import VueI18n from 'vue-i18n'

import cn from './lang/cn'
import ja from './lang/ja'
import en from './lang/en'

Vue.use(VueI18n)
// var cn2=eval(cn.responseText)
// var cn2 = eval("("+cn.responseText+")");
export default new VueI18n({
    locale: 'cn',
    messages: {
        ja,
        en,
        cn,
    },
    silentTranslationWarn: true,
})

