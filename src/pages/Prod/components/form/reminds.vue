<style lang="scss" scoped type="text/scss">
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>

<template>
  <div>
    <el-card style="width: 100%;">
      <div slot="header" class="clearfix">
        <i class="el-icon-caret-bottom"></i>
        产品提示
        <el-button style="float: right;" type="primary" size="mini" @click="edit()">{{$t('edit')}}</el-button>
      </div>
      <div v-if="xsh">
        <div v-for="(i,index) in remindsData" style="margin-right:5px;">{{index+1}}、{{i.title}}。</div>
      </div>
      <div v-else>
        <el-select v-model="value" multiple placeholder="请选择" size="mini" style="width:500px;">
          <el-option v-for="item in prodremind" :key="item.id" :label="item.title" :value="item.id"></el-option>
        </el-select>
        <span style="margin-left:10px;">
          <el-button type="primary" size="mini" @click="save()" :loading="save_fy">确定</el-button>
          <el-button type="danger" size="mini" @click="cancel()">取消</el-button>
        </span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { updateprodredmine } from "@/api/prod";
import $ from "jquery";
export default {
  props: ["datas", "enum", "prod_id"],
  data() {
    return {
      save_fy:false,
      value: [],
      remindsData: [],
      prodremind: {},
      xsh: true
    };
  },
  watch: {
    datas(val) {
      this.remindsData = val;
    },
    enum(val) {
      if (val != null) {
        this.prodremind = val;
      }
    }
  },
  created() {
    if (this.datas.length > 0) {
      this.remindsData = this.datas;
    }
    if (this.enum != null) {
      this.prodremind = this.enum;
    }
  },
  methods: {
    edit() {
      this.xsh = false;
      this.value = [];
      this.remindsData.forEach(res => {
        if (res.id) {
          this.value.push(res.id);
        }
      });
    },
    save() {
      var obj = {
        prod_id: this.prod_id,
        prodreminds: this.value
      };
      this.save_fy = true
      updateprodredmine(obj, this);
    },
    cancel() {
      this.value = "";
      this.xsh = true;
    }
  }
};
</script>