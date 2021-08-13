<style lang="scss" scoped type="text/scss">
.aa{
  /deep/.el-submenu__icon-arrow{
    right: 0px;
  }
}
</style>
<template>
  <el-submenu :index="menu.path || uniqueId" :class="$i18n.locale=='cn'?'':'aa'">
    <template slot="title">
      <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
      <d2-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg"/>
      <i v-else class="fa fa-folder-o"></i>
      <span slot="title">{{$i18n.locale=='cn'?menu.title:(menu.title_en?menu.title_en:menu.title)}}</span>
    </template>
    <template v-for="(child, childIndex) in menu.children" >
      <d2-layout-header-aside-menu-item v-if="child.children === undefined" @click.native="getTotal()" :menu="child" :total="total_" :key="childIndex"/>
      <d2-layout-header-aside-menu-sub v-else :menu="child" :key="childIndex"/>
    </template>
  </el-submenu>
</template>

<script>
import { uniqueId } from 'lodash'
// 组件
import d2LayoutMainMenuItem from '../menu-item'
import {getInvoiceList} from "@/api/procure"
export default {
  name: 'd2-layout-header-aside-menu-sub',
  components: {
    'd2-layout-header-aside-menu-item': d2LayoutMainMenuItem
  },
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data () {
    return {
      uniqueId: uniqueId('d2-menu-empty-'),
        total_:0
    }
  },
    methods:{
      getTotal(){
          getInvoiceList({hexiao_status:-1}).then(res => {
              if (res && res.code == 0) {
                  this.total_=res.data.total
              }
          })
      }
   }
}
</script>
