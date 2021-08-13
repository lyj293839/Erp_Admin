<template>
  <d2-container>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column label="ID">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="公式" class="sbaoTable">
        <template slot-scope="scope">{{scope.row.expression}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.make')" width="130px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialog" top="5vh" width="40%">
      <el-form>
        <el-form-item label="公式" :required="true">
          <el-input size="small" v-model="expression.expression"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveAdd()"
            :loading="save_fy"
            icon="el-icon-edit-outline"
            size="mini"
          >{{$t('wareHouse.wareHome.wareHome_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            @click="addClose"
            size="mini"
          >{{$t('wareHouse.wareHome.wareHome_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import request from "@/plugin/axios";
import { listTotal } from "@/api/prod";
export default {
  name:'commission-expression',
  data() {
    return {
      list: [],
      save_fy:false,
      dialog: false,
      expression: {
        expression: "",
        id: ""
      }
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "commission-expression") {
        this.fetchData_a();
      }
    }
  },
  created() {
    this.fetchData_a();
  },
  methods: {
    fetchData_a() {
      listTotal("expression").then(res => {
        this.list = res.data;
      });
    },
    handleEdit(item) {
      this.dialog = true;
      this.expression.expression = item.expression;
      this.expression.id = item.id;
    },
    saveAdd() {
      this.save_fy = true
      update(this.expression, "expression", "update", this);
    },
    addClose() {
      this.expression.expression = "";
      this.expression.id = "";
      this.dialog = false;
    }
  }
};
function update(datas, type, method_type, that) {
  datas.loading = true;
  let data = JSON.parse(JSON.stringify(datas));
  delete data.loading;
  request({
    url: "api/v1/" + type + "/" + data.id + "/" + method_type,
    method: "post",
    data
  })
    .then(res => {
      datas.loading = false;
      if (res && res.code == 0) {
        that.$message({
          message: "success",
          type: "success"
        });
        that.fetchData_a();
        that.dialog = false;
        that.save_fy = false
      } else {
        that.$message({
          message: res.msg,
          type: "success"
        });
        that.save_fy = false
      }
    })
    .catch(rr => {
      datas.loading = false;
      that.save_fy = false
    });
}
</script>
