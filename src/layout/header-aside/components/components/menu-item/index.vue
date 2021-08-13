<style lang="scss" scoped type="text/scss">
.aa{
  width: 130px;
  line-height: normal;
  word-wrap:break-word;
  white-space: normal;
}
</style>
<template>
  <el-menu-item :index="menu.path || uniqueId" style="display:flex;align-items:center;">
    <div style="display:flex;align-items:center;">
      <i v-if="menu.icon" :class="`fa fa-${menu.icon}`"></i>
      <d2-icon-svg v-else-if="menu.iconSvg" :name="menu.iconSvg" />
      <i v-else class="fa fa-file-o"></i>
      <div
        slot="title"
        class="aa"
      >{{$i18n.locale=='cn'?menu.title:(menu.title_en?menu.title_en:menu.title) || '未命名菜单'}} <el-badge v-if="menu.title=='采购合同销票'&&total>0" :value="total" class="item"></el-badge></div>
    </div>
  </el-menu-item>
</template>

<script>
import { uniqueId } from "lodash";
import {getInvoiceList} from "@/api/procure"
export default {
  name: "d2-layout-header-aside-menu-item",
  props: {
    menu: {
      type: Object,
      required: false,
      default: () => {}
    },
      total:{
          type:Number,
          required: false,
      }
  },
  data() {
    return {
      uniqueId: uniqueId("d2-menu-empty-"),
    };
  },
};
</script>

