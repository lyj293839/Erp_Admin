<style lang="scss"  type="text/scss">
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
    <el-row :gutter="20">
      <!--树形结构 开始-->
      <el-col :span="8">
        <el-button type="primary" @click="add_company" size="mini" style="margin:10px;" v-if="permissions.indexOf(293)>-1">Add</el-button>
        <el-input
                v-model="keywords"
                style="width: 155px;margin:2px;"
                size="mini"
                clearable
        ></el-input>
        <el-button type="primary" @click="search" size="mini" style="margin:10px;">Search</el-button>
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
              <span>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => check_user(node,data)"
                  style="margin-left: 5px;padding: 7px 0!important;"
                >
                  <d2-icon name="user" style="font-size: 16px;color: #333;" />
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-if="permissions.indexOf(294)>-1"
                  @click="() => edit(node,data)"
                  style="margin-left: 5px;padding: 7px 0!important;"
                >
                  <d2-icon name="edit" style="font-size: 16px;color: #333;" />
                </el-button>
                <!-- <el-button
                  type="text"
                  size="mini"
                  v-if="permissions.indexOf(294)>-1"
                  @click="() => edit_new(node,data)"
                  style="margin-left: 5px;padding: 7px 0!important;"
                >
                  <d2-icon name="edit" style="font-size: 16px;color: #333;" />(新)
                </el-button> -->
                <el-button
                  type="text"
                  size="mini"
                  v-if="data.type!='user'"
                  @click="() => append(node,data)"
                  style="margin-left: 5px;padding: 7px 0!important;"
                >
                  <d2-icon name="plus" style="font-size: 16px;color: #333;" />
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  v-if="permissions.indexOf(296)>-1&&data.member_id"
                  @click="() => remove(node,data)"
                  style="margin-left: 5px;padding: 7px 0!important;"
                >
                  <d2-icon name="times" style="font-size: 16px;color: #333;" />
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <!--树形结构 结束-->
      <el-col :span="16">
        <div class="grid-content">
          <!--主公司表单 开始-->
          <el-card v-if="dialogCompany" class="box-card">
            <el-form :model="company_form" label-width="130px" class="demo-ruleForm">
              <el-form-item :label="$t('organize.companyForm.name')">
                <el-input v-model="company_form.name" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item :label="$t('organize.companyForm.english_name')">
                <el-input v-model="company_form.english_name" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  size="mini"
                  @click="save_company"
                  v-text="company_form.id?'Save':'Add'"
                ></el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <!--主公司表单 结束-->
          <!--子部门表单 开始-->
          <el-card v-if="dialogDepartment" class="box-card">
            <el-form :model="department_form" label-width="130px" class="demo-ruleForm">
              <el-form-item :label="$t('organize.child_departmentsForm.name')" :required="true">
                <el-input v-model="department_form.name" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item :label="$t('organize.child_departmentsForm.name_cn')" :required="true">
                <el-input v-model="department_form.name_cn" autocomplete="off" size="small"></el-input>
              </el-form-item>
              <el-form-item :label="$t('status')">
                <el-radio-group v-model="department_form.status" size="small">
                  <el-radio :label="0">{{$t('disable')}}</el-radio>
                  <el-radio :label="1">{{$t('enable')}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="save_department">Save</el-button>
              </el-form-item>
            </el-form>
          </el-card>
          <!--子部门表单 结束-->
          <!--子公司或部门表单 开始-->
          <el-card v-if="dialogCompanyOrDepartment" class="box-card">
            <el-form label-width="130px" class="demo-ruleForm">
              <el-form-item label="选择" v-if="companyOrdepartment">
                <el-select
                  v-model="select_type"
                  @change="select(select_type)"
                  size="small"
                  placeholder="Please Select"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div v-if="is_department">
                <el-form-item :label="$t('organize.departmentsForm.name')" :required="true">
                  <el-input v-model="department_form.name" size="small"></el-input>
                </el-form-item>
                <el-form-item :label="$t('organize.departmentsForm.name_cn')" :required="true">
                  <el-input v-model="department_form.name_cn" size="small"></el-input>
                </el-form-item>
                <el-form-item :label="$t('status')">
                  <el-radio-group v-model="department_form.status" size="small">
                    <el-radio :label="0">{{$t('disable')}}</el-radio>
                    <el-radio :label="1">{{$t('enable')}}</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="save_department">Save</el-button>
                </el-form-item>
              </div>
              <div v-else>
                <el-form-item :label="$t('organize.child_companyForm.name')">
                  <el-input v-model="company_form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('organize.child_companyForm.english_name')">
                  <el-input v-model="company_form.english_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="save_company">Save</el-button>
                </el-form-item>
              </div>
            </el-form>
          </el-card>
          <!--子公司或部门表单 结束-->
        </div>
      </el-col>
      <!--员工组建 开始-->
      <el-col v-if="dialogUserForm" :span="16">
        <User v-if="show_UserForm" :datas="datas" :keywords="keywords" :list="list" :date="date" :page="1"></User>
      </el-col>
      <!--员工组建 结束-->
    </el-row>
  </d2-container>
</template>
<style>
</style>
<script>
import {
  company_lists,
  company_create,
  company_update,
  company_destroy,
  departments_create,
  departments_update,
  departments_destroy
} from "@/api/organize";
import $ from "jquery";
import User from "../userForm/user";
export default {
  name: "Organize-index",
  components: {
    User
  },
  data() {
    return {
      permissions:JSON.parse(localStorage.getItem('permissions')),
      datas: {},
      list: [],
      dialogCompany: false,
      dialogDepartment: false,
      dialogCompanyOrDepartment: false,
      dialogUserForm: false,
      is_department: true,

      show: false,
      show2: false,
      options: [{ id: 1, name: "部门" }, { id: 0, name: "子公司" }],
      select_type: 1,
      company_form: {
        pid: 0,
        name: "",
        english_name: "",
        is_system: 1
      },
      department_form: {
        pid: 0,
        member_id: "",
        name: "",
        name_cn: "",
        status: 1
      },
      defaultProps: {
        children: "children",
        label: "name"
      },
      member_id: "",
      pid: "",
      companyOrdepartment: false,
      dialogUser: true,
      date: "",
      keywords:'',
      show_UserForm:false
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Organize-index'){
            this.fetchData()
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    search(){
       if(this.keywords){
           this.show_UserForm= false;
           this.$nextTick(() => {
               this.dialogUserForm=true
               this.show_UserForm=true
           });
       }
    },
    hidden_all() {
      this.companyOrdepartment = false;
      this.dialogCompany = false;
      this.dialogDepartment = false;
      this.dialogUserForm = false;
      this.dialogCompanyOrDepartment = false;
      this.is_department = true;
    },
    resetFormData() {
      this.department_form.id = "";
      this.department_form.name = "";
      this.department_form.name_cn = "";
      this.company_form.id = "";
      this.company_form.name = "";
      this.company_form.english_name = "";
    },
    fetchData() {
      company_lists().then(res => {
        this.list = res.data.companies;
      });
    },
    add_company() {
      this.hidden_all();
      this.dialogCompany = true;
      this.companyOrdepartment = true;
      this.company_form = {
        name: "",
        english_name: "",
        is_system: 1
      };
    },
    save_company() {
      if (this.company_form.id) {
        company_update(this.company_form).then(res => {
          if (res && res.code == 0) {
            this.dialogCompany = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      } else {
        company_create(this.company_form).then(res => {
          if (res && res.code == 0) {
            this.dialogCompany = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      }
    },
    save_department() {
      if (this.department_form.id) {
        departments_update(this.department_form).then(res => {
          if (res && res.code == 0) {
            this.dialogDepartments = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      } else {
        departments_create(this.department_form).then(res => {
          if (res && res.code == 0) {
            this.dialogDepartments = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      }
    },
    check_user(node, data) {
      this.hidden_all();
      console.log(this.keywords);
      this.dialogUserForm = true;
      this.show_UserForm=true
      this.date = new Date().getTime();
      this.datas = data;
      console.log(this.datas);
    },
    select(item) {
      if (item == 1) {
        this.is_department = true;
      } else {
        this.is_department = false;
      }
    },
    append(node, data) {
      console.log(data);
      this.hidden_all();
      this.resetFormData();
      event.preventDefault();
      event.stopPropagation();
      if (!data.member_id) {
        //公司
        this.dialogCompanyOrDepartment = true;
        this.companyOrdepartment = true;
        this.select_type = 1;
        this.company_form.pid = data.id;
        this.department_form.member_id = data.id;
      } else {
        this.dialogDepartment = true;
        this.department_form.pid = data.id;
        this.department_form.member_id = data.member_id;
      }
    },
    edit(node, data) {
      this.hidden_all();
      if (!data.member_id && data.pid == 0) {
        //主公司 数据
        // this.dialogCompany=true
        this.company_form.pid = 0;
        this.company_form.id = data.id;
        this.company_form.name = data.name;
        this.company_form.english_name = data.english_name;
        this.$router.push({
          path: "/Organize/index",
          name: "Organize-edit",
          query: {
            ids: data.id
          }
        });
      } else if (!data.member_id && data.pid != 0) {
        //子公司 数据
        this.dialogCompanyOrDepartment = true;
        this.is_department = false;
        this.company_form.pid = data.pid;
        this.company_form.id = data.id;
        this.company_form.name = data.name;
        this.company_form.english_name = data.english_name;
      } else if (data.member_id && data.pid == 0) {
        //主部门 数据
        this.dialogCompanyOrDepartment = true;
        this.is_department = true;
        this.department_form.member_id = data.member_id;
        this.department_form.id = data.id;
        this.department_form.pid = data.pid;
        this.department_form.name = data.name;
        this.department_form.name_cn = data.name_cn;
        this.department_form.status = data.status;
      } else if (data.member_id && data.pid != 0) {
        //子部门 数据
        this.dialogDepartment = true;
        this.department_form.member_id = data.member_id;
        this.department_form.id = data.id;
        this.department_form.pid = data.pid;
        this.department_form.name = data.name;
        this.department_form.name_cn = data.name_cn;
        this.department_form.status = data.status;
      }
    },
    edit_new(node, data) {
      this.hidden_all();
      if (!data.member_id && data.pid == 0) {
        //主公司 数据
        // this.dialogCompany=true
        this.company_form.pid = 0;
        this.company_form.id = data.id;
        this.company_form.name = data.name;
        this.company_form.english_name = data.english_name;
        this.$router.push({
          path: "/Organize/index",
          name: "Organize-edit_new",
          query: {
            ids: data.id
          }
        });
      } else if (!data.member_id && data.pid != 0) {
        //子公司 数据
        this.dialogCompanyOrDepartment = true;
        this.is_department = false;
        this.company_form.pid = data.pid;
        this.company_form.id = data.id;
        this.company_form.name = data.name;
        this.company_form.english_name = data.english_name;
      } else if (data.member_id && data.pid == 0) {
        //主部门 数据
        this.dialogCompanyOrDepartment = true;
        this.is_department = true;
        this.department_form.member_id = data.member_id;
        this.department_form.id = data.id;
        this.department_form.pid = data.pid;
        this.department_form.name = data.name;
        this.department_form.name_cn = data.name_cn;
        this.department_form.status = data.status;
      } else if (data.member_id && data.pid != 0) {
        //子部门 数据
        this.dialogDepartment = true;
        this.department_form.member_id = data.member_id;
        this.department_form.id = data.id;
        this.department_form.pid = data.pid;
        this.department_form.name = data.name;
        this.department_form.name_cn = data.name_cn;
        this.department_form.status = data.status;
      }
    },
    remove(node, data) {
      if (!data.member_id) {
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
              company_destroy([data.id]).then(res => {
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
      } else {
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
              departments_destroy([data.id]).then(res => {
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
  }
};
</script>

