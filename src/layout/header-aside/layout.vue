<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div
        class="d2-theme-header"
        :style="{
          opacity: this.searchActive ? 0.5 : 1
        }"
        flex-box="0"
        flex>
        <div class="logo-group" :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}" flex-box="0" style="text-align: center;">
          <!--<img v-if="asideCollapse" style="width: 25px;height: 25px;"  :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">-->
          <!--<span v-else></span>-->
          <!--<img style="width: 40px;height: 40px;" v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">-->
          <!--<img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">-->
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </div>
        <!--<div class="toggle-aside-btn" flex-box="0">-->
          <!--<router-link to="/"> <d2-icon name="bars"/></router-link>-->
        <!--</div>-->
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars"/>
        </div>
        <d2-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div class="d2-header-right" flex-box="0">
          <d2-header-shortcut-keys/>
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <!--<d2-header-search @click="handleSearchClick"/>-->
          <d2-header-log/>
          <!--<d2-header-error-log/>-->
          <d2-header-fullscreen/>
          <d2-header-theme/>
          <!--<d2-header-size/>-->
          <!--<d2-header-international/>-->
          <d2-header-user/>
          <d2-header-notice/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          flex-box="0"
          ref="aside"
          class="d2-theme-container-aside"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1
          }">
          <d2-menu-side/>
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-show="searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <d2-panel-search
                ref="panelSearch"
                @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-show="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
              <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs/>
              </div>
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view/>
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import {
    search_menu
} from "@/api/Inquery";
import {enums} from '@/api/prod';
import util from "@/libs/util";
import { getDay } from '@/utils/index'
import mixinSearch from './mixins/search'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    'd2-menu-side': () => import('./components/menu-side'),
    'd2-menu-header': () => import('./components/menu-header'),
    'd2-tabs': () => import('./components/tabs'),
    'd2-header-fullscreen': () => import('./components/header-fullscreen'),
    'd2-header-search': () => import('./components/header-search'),
    'd2-header-size': () => import('./components/header-size'),
    'd2-header-theme': () => import('./components/header-theme'),
    'd2-header-user': () => import('./components/header-user'),
    'd2-header-notice': () => import('./components/header-notice'),
    'd2-header-shortcut-keys': () => import('./components/header-shortcut-keys'),
    'd2-header-log': () => import('./components/header-log'),
    'd2-header-international': () => import('./components/header-international')
  },
  data () {
    return {
        // [侧边栏宽度] 正常状态
        asideWidth: '200px',
        // [侧边栏宽度] 折叠状态
        asideWidthCollapse: '65px',
        menu:{},
        menu_two:{},
        menu_three:{},
        all_search:[],
        url:process.env.VUE_APP_IFRAME_URL
    }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return {
        ...this.themeActiveSetting.backgroundImage ? {
          backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`
        } : {}
      }
    },
  },
  created(){
      let obj={
          language:util.cookies.get('language')
      }
      enums().then(res=>{
          localStorage.setItem('enum', JSON.stringify(res.data));
      })
    search_menu(obj).then(res=> {
        this.menu = res.data
        let user_type=util.cookies.get('user_type')
        let user_id=util.cookies.get('user_id')
        let user_name=util.cookies.get('user_name')
        if(user_type=='102'){
            this.menu_two = this.menu['assignsaler'].con
            this.menu_three = this.menu['assignsaler'].value
            this.all_search.push({
                search_one: 'assignsaler',
                search_two: 'dy',
                search_content:user_id,
                name:this.menu['assignsaler'].name+this.menu_two['dy']+user_name
            })
            this.all_search.push({
                search_one: 'created_at',
                search_two: 'dy',
                search_content: getDay(),
                name:this.menu['created_at'].name+this.menu_two['dy']+getDay()
            })
        }else if(user_type=='101'){
            this.menu_two = this.menu['purchaseuser'].con
            this.menu_two_level = this.menu['level'].con
            this.menu_three = this.menu['purchaseuser'].value
            this.all_search.push({
                search_one: 'purchaseuser',
                search_two: 'dy',
                search_content:user_id,
                name:this.menu['purchaseuser'].name+this.menu_two['dy']+user_name
            })
            this.all_search.push({
                search_one: 'created_at',
                search_two: 'dy',
                search_content: getDay(),
                name:this.menu['created_at'].name+this.menu_two['dy']+getDay()
            })
            this.all_search.push({
                search_one: 'level',
                search_two: 'gtedy',
                search_content: '3',
                name:this.menu['level'].name+this.menu_two_level['gtedy']+'3'
            })
        }else{
            this.menu_two = this.menu['purchaseuser'].con
            this.all_search.push({
                search_one: 'created_at',
                search_two: 'dy',
                search_content: getDay(),
                name:this.menu['created_at'].name+this.menu_two['dy']+getDay()
            })
        }
        if(!localStorage.getItem('Inquery-inquery')){
            localStorage.setItem('Inquery-inquery', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery2')){
            localStorage.setItem('Inquery-inquery2',JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery3')){
            localStorage.setItem('Inquery-inquery3', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery4')){
            localStorage.setItem('Inquery-inquery4',JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery5')){
            localStorage.setItem('Inquery-inquery5', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery6')){
            localStorage.setItem('Inquery-inquery6', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery7')){
            localStorage.setItem('Inquery-inquery7', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery8')){
            localStorage.setItem('Inquery-inquery8', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery9')){
            localStorage.setItem('Inquery-inquery9', JSON.stringify(this.all_search))
        }
        if(!localStorage.getItem('Inquery-inquery10')){
            localStorage.setItem('Inquery-inquery10', JSON.stringify(this.all_search))
        }
    })
  },
  methods: {
    ...mapActions('d2admin/menu', [
      'asideCollapseToggle'
    ]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside () {
      this.asideCollapseToggle()
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
  .toggle-aside-btn,.d2-header-right,.d2-theme-header{
    height: 50px!important;
  }
.d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-header .d2-multiple-page-control-group {
  padding-right: 5px;
}
.d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full {
  right: 5px;
}
.d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__body {
  background: #fafbfb;
}
.el-menu-item, .el-submenu__title {
  height: 45px!important;
  line-height: 45px!important;
  font-size: 14px;
}
.el-submenu .el-menu-item {
  height: 45px!important;
  line-height: 45px!important;
  font-size: 14px;
}
.el-tabs__item {
  height: 34px!important;
  line-height: 34px!important;
}
.d2-multiple-page-control-btn .el-button {
  padding: 10px 20px!important;
}
</style>
