<style lang="scss" type="text/scss">
.el-select__tags {
  max-width: 250px !important;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  min-width: 164px;
}

.status .el-form-item__content {
  margin-left: 20px !important;
}
</style>
<template>
  <d2-container>
    <el-row :gutter="10">
      <!--树形结构 开始-->
      <el-col :span="8">
        <el-button
          type="primary"
          @click="add_First"
          size="mini"
          v-if="permissions.indexOf(260)>-1"
          style="margin:10px;"
        >{{$t('add')}}</el-button>
        <div class="grid-content">
          <el-tree
            :data="list"
            :props="defaultProps"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <!--<span>-->
                <!--<el-button-->
                  <!--v-if="permissions.indexOf(262)>-1"-->
                  <!--type="text"-->
                  <!--size="mini"-->
                  <!--@click="() => edit(node,data)"-->
                  <!--style="margin-left: 5px;padding: 7px 0!important;"-->
                <!--&gt;-->
                  <!--<d2-icon name="edit" style="font-size: 16px;color: #333;" />-->
                <!--</el-button>-->
                <!--<el-button-->
                  <!--v-if="data.pid==0&&permissions.indexOf(260)>-1"-->
                  <!--type="text"-->
                  <!--size="mini"-->
                  <!--@click="() => append(node,data)"-->
                  <!--style="margin-left: 5px;padding: 7px 0!important;"-->
                <!--&gt;-->
                  <!--<d2-icon name="plus" style="font-size: 16px;color: #333;" />-->
                <!--</el-button>-->
                <!--<el-button-->
                  <!--v-if="permissions.indexOf(264)>-1"-->
                  <!--type="text"-->
                  <!--size="mini"-->
                  <!--@click="() => remove(node,data)"-->
                  <!--style="margin-left: 5px;padding: 7px 0!important;"-->
                <!--&gt;-->
                  <!--<d2-icon name="times" style="font-size: 16px;color: #333;" />-->
                <!--</el-button>-->
              <!--</span>-->
            </span>
          </el-tree>
        </div>
      </el-col>
      <!--树形结构 结束-->
      <el-col :span="16">
        <div class="grid-content">
          <el-card v-if="dialogFirst" class="box-card">
            <el-form :model="first_unit" label-width="130px" class="demo-ruleForm">
              <el-form-item :label="$t('wareHouse.unit.unit1')" :required="true"><!-- 分类 -->
                <el-select
                  v-model="first_unit.type"
                  filterable
                  size="small"
                  placeholder="Please Select"
                >i
                  <el-option v-for="(i,index) in type" :key="i" :label="i" :value="i"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('wareHouse.unit.unit2')" :required="true"><!-- 主计量单位 -->
                <el-input v-model="first_unit.name" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="save_fy"
                  @click="save_first"
                  size="mini"
                  v-text="first_unit.id?'Save':'Add'"
                ></el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <el-card v-if="dialogSecond" class="box-card">
            <el-form :model="second_unit" label-width="130px" class="demo-ruleForm">
              <el-form-item :label="$t('wareHouse.unit.unit2')" :required="true"><!-- 主计量单位 -->
                <el-input
                  v-model="second_unit.parent_name"
                  disabled
                  autocomplete="off"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('wareHouse.unit.unit3')" :required="true"><!-- 副计量单位 -->
                <el-input v-model="second_unit.name" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item :label="$t('wareHouse.unit.unit4')" :required="true"><!-- 转化方式比 -->
                <el-input v-model="second_unit.rate" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  :loading="save_fy"
                  @click="save_second"
                  size="mini"
                  v-text="second_unit.id?$t('save'):$t('add')"
                ></el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>
<style>
</style>
<script>
import { unit_lists, create, update, destroy } from "@/api/unit";
import $ from "jquery";

export default {
  name: "Warehouse-unit",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      datas: {},
      list: [],
      save_fy:false,
      dialogFirst: false,
      dialogSecond: false,
      show: false,
      show2: false,
      first_unit: {
        pid: 0,
        type: "",
        name: ""
      },
      second_unit: {
        parent_name: "",
        pid: "",
        name: "",
        rate: ""
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      type: []
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-unit") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      unit_lists().then(res => {
        this.list = res.data;
        this.type = res.enum;
      });
    },
    add_First() {
      this.dialogSecond = false;
      this.dialogFirst = true;
      this.first_unit = {
        pid: 0,
        type: "",
        name: ""
      };
    },
    save_first() {
      if (this.first_unit.id) {
        update(this.first_unit).then(res => {
          this.save_fy = true
          if (res && res.code == 0) {
            this.dialogFirst = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
            this.save_first = false
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.save_fy = false
          }
        });
      } else {
        create(this.first_unit).then(res => {
          this.save_fy = true
          if (res && res.code == 0) {
            this.dialogFirst = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
            this.save_fy = false
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.save_fy = false
          }
        });
      }
    },
    save_second() {
      if (this.second_unit.id) {
        update(this.second_unit).then(res => {
          this.save_fy = true
          if (res && res.code == 0) {
            this.dialogSecond = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
            this.save_fy = false
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.save_fy = false
          }
        })
      } else {
        create(this.second_unit).then(res => {
          this.save_fy = true
          if (res && res.code == 0) {
            this.dialogSecond = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
            this.save_fy = false
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.save_fy = false
          }
        })
      }
    },
    append(node, data) {
      console.log(data);
      this.dialogFirst = false;
      this.dialogSecond = true;
      (this.second_unit = {
        parent_name: data.name,
        pid: "",
        name: "",
        rate: ""
      }),
        (this.second_unit.pid = data.id);
    },
    edit(node, data) {
      console.log(data);
      if (data.pid == 0) {
        this.dialogFirst = true;
        this.dialogSecond = false;
        this.first_unit.id = data.id;
        this.first_unit.type = data.type;
        this.first_unit.name = data.name;
      } else {
        this.dialogFirst = false;
        this.dialogSecond = true;
        this.second_unit.id = data.id;
        this.second_unit.pid = data.pid;
        this.list.forEach((item, index) => {
          if (item.id == data.pid) {
            this.second_unit.parent_name = item.name;
          }
        });
        this.second_unit.rate = data.rate;
        this.second_unit.name = data.name;
      }
    },

    remove(node, data) {
      const h = this.$createElement;
      this.$msgbox({
        message: h("p", null, [h("span", null, "确定要执行此操作吗？ ")]),
        showCancelButton: true,
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            destroy([data.id]).then(res => {
              instance.confirmButtonLoading = false;
              instance.confirmButtonText = "确定";
              if (res && res.code == 0) {
                this.$message({
                  message: "success",
                  type: "success"
                });
                done();
                this.fetchData();
              } else {
                this.$message({
                  message: res.msg,
                  type: "error"
                });
                done();
              }
            });
          }
          if (action === "cancel") {
            done();
          }
        }
      });
    }
  }
};
</script>
<style>
</style>
