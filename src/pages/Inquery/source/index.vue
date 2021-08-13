<style lang="scss" scoped type="text/scss">
.add {
  margin-bottom: 9px;
}

.wrapMenu {
  margin-top: 12px;
  .menuMoudle {
    border: 1px solid #bfcbd9;
    height: 60px;
    .menuHeader {
      line-height: 30px;
      padding-left: 5px;
      height: 30px;
      border-bottom: 1px solid #bfcbd9;
    }
    .menuBody {
      line-height: 30px;
      padding-left: 5px;
    }
  }
}

.el-form-item__label {
  width: 100px !important;
}

.el-form-item__content {
  margin-left: 110px !important;
}

.el-pagination {
  text-align: right;
}
/deep/.gutter {
  display: block !important;
}
</style>
<template>
  <d2-container>
    <el-button
      class="add"
      size="mini"
      type="primary"
      @click="handleAdd"
      v-if="permissions_all.indexOf(405)>-1"
    >{{$t('Inquery.source.addButton')}}</el-button>
    <el-table
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column align="center" :label="$t('Inquery.source.source_page.id')" width="60px">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column :label="$t('Inquery.source.source_page.name')" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column :label="$t('Inquery.source.source_page.remark')" align="center">
        <template slot-scope="scope">{{scope.row.remark}}</template>
      </el-table-column>
      <el-table-column :label="$t('Inquery.source.source_page.email')" align="center">
        <template slot-scope="scope">{{scope.row.email}}</template>
      </el-table-column>
      <el-table-column :label="$t('Inquery.source.source_page.user_name')" align="center">
        <template slot-scope="scope">{{scope.row.user?scope.row.user.name:''}}</template>
      </el-table-column>
      <el-table-column
        :label="$t('Inquery.source.source_page.allocselfwhennull')"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">{{scope.row.allocselfwhennull==1?'√':''}}</template>
      </el-table-column>
      <el-table-column
        :label="$t('Inquery.source.source_page.status')"
        align="center"
        width="150px"
      >
        <template slot-scope="scope">{{scope.row.status==1?$t('Inquery.source.source_page.open'):$t('Inquery.source.source_page.close')}}</template>
      </el-table-column>
      <el-table-column align="center" :label="$t('Inquery.source.source_page.make')" width="200px">
        <template slot-scope="scope">
          <template>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
              v-if="permissions_all.indexOf(406)>-1"
            >{{$t('Inquery.source.editButton')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDel(scope.row)"
              v-if="permissions_all.indexOf(408)>-1"
            >{{$t('Inquery.source.delButton')}}</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>

    <!-- 增加 -->
    <el-dialog :title="$t('Inquery.source.addButton')" :visible.sync="dialogAdd" width="40%">
      <el-form :model="addForm" :label-width="$i18n.locale=='cn'?'180px':'200px'" label-position="right">
        <el-form-item :label="$t('Inquery.source.source_Form.name')" :required="true">
          <el-input v-model="addForm.name" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.user_name')">
          <el-select v-model="addForm.user_id" clearable size="small" style="width: 100%;">
            <el-option v-for="item in saleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.allocselfwhennull')">
          <el-select v-model="addForm.allocselfwhennull" size="small" style="width: 100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.email')">
          <el-input v-model="addForm.email" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.status')" :required="true">
          <el-radio-group v-model="addForm.status" size="small">
            <el-radio :label="1">{{$t('Inquery.source.source_Form.open')}}</el-radio>
            <el-radio :label="0">{{$t('Inquery.source.source_Form.close')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.remark')">
          <el-input type="textarea" :rows="3" v-model="addForm.remark" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveAddRole(addForm.name)"
            size="mini"
            :loading='loading?true:false'
          >{{$t('Inquery.source.source_Form.keepButton')}}</el-button>
          <el-button @click="addClose" size="mini">{{$t('Inquery.source.source_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 编辑 -->
    <el-dialog :title="$t('Inquery.source.editButton')" :visible.sync="dialogEdit" width="40%">
      <el-form :model="editForm" :label-width="$i18n.locale=='cn'?'180px':'200px'" label-position="right">
        <el-form-item :label="$t('Inquery.source.source_Form.name')">
          <el-input v-model="editForm.name" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.user_name')">
          <el-select v-model="editForm.user_id" clearable size="small" style="width: 100%;">
            <el-option v-for="item in saleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.allocselfwhennull')">
          <el-select v-model="editForm.allocselfwhennull" size="small" style="width: 100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.email')">
          <el-input v-model="editForm.email" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.status')">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="1">{{$t('Inquery.source.source_Form.open')}}</el-radio>
            <el-radio :label="0">{{$t('Inquery.source.source_Form.close')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('Inquery.source.source_Form.remark')">
          <el-input type="textarea" :rows="3" v-model="editForm.remark" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveEditRole()"
            size="mini"
            :loading='loading?true:false'
          >{{$t('Inquery.source.source_Form.keepButton')}}</el-button>
          <el-button
            @click="dialogEdit=false"
            size="mini"
          >{{$t('Inquery.source.source_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </d2-container>
</template>
<script>
import { lists,create_source, update, sales_lists } from "@/api/Inquery";
import { destroy } from "@/api/prod";
export default {
  name: "Inquery-source",
  data() {
    return {
      permissions_all :JSON.parse(localStorage.getItem('permissions')),
      list: [],
      saleList: [],
      value1: "",
      currentPage: 1,
      dialogAdd: false,
      dialogEdit: false,
      dialogPermission: false,
      queryList: {
        page: "1"
      },
      options: [
        {
          value: 1,
          label: "Y"
        },
        {
          value: 0,
          label: "N"
        }
      ],
      addForm: {
        name: "",
        email: "",
        status: 1,
        user_id: "",
        allocselfwhennull: '',
        remark: "",
      },
      editForm: {
        id: "",
        name: "",
        email: "",
        status: "",
        user_id: "",
        allocselfwhennull: "",
        remark: ""
      },
      permissionid: "",
      permission: [],
      permissions: [],
      data: [],
      defaultProps: {
        children: "_child",
        label: "name"
      },
      loading:false
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Inquery-source'){
            this.fetchData()
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      lists(this.queryList, "resource", this).then(res => {
        this.list = res.data;
      });
      sales_lists().then(res => {
        this.saleList = res.data;
      });
    },
    handleAdd() {
      this.dialogAdd = true;
    },
    saveAddRole(name) {
        create_source(this.addForm, "inquiry/resource", "create", this);
    },
    handleEdit(row) {
      console.log(row)
      this.dialogEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.email = row.email;
      this.editForm.status = row.status;
      this.editForm.user_id = row.user_id;
      this.editForm.allocselfwhennull = row.allocselfwhennull;
      this.editForm.remark = row.remark;
      this.value1 = "";
      if (this.editForm.user_id) {
        this.value1 = row.user.name;
      }
    },
    saveEditRole() {
      // for (var i = 0; i < this.saleList.length; i++) {
      //   if (this.saleList[i].name === this.value1) {
      //     this.editForm.user_id = this.saleList[i].id;
      //   }
      // }
      update(this.editForm, "resource", this);
    },
    handlePermission(row) {
      let that = this;
      that.dialogPermission = true;
      that.permissionid = row.id;
      that.permission = [];
      role_permission(row).then(res => {
        res.data.forEach(function(items, index) {
          if (items._child) {
            items._child.forEach(function(m, n) {
              if (m._child) {
              } else {
                if (m.own == "checked") {
                  that.permission.push(m.id);
                  that.permissions.push(m.id);
                }
              }
            });
          } else {
            if (items.own == "checked") {
              that.permission.push(items.id);
              that.permissions.push(items.id);
            }
          }
        });
        that.data = res.data;
      });
    },
    handleCheckChange(data, checked, indeterminate) {
      let that = this;
      if (checked) {
        that.permissions.push(data.id);
      } else {
        that.permissions.forEach(function(items, index) {
          if (items == data.id) {
            that.permissions.splice(index, 1);
          }
        });
      }
      that.permissions = unique1(that.permissions);
    },
    saveEditPermission() {
      var permissions = unique1(this.permissions);
      role_assignPermission(this.permissionid, permissions).then(res => {
        this.dialogPermission = false;
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
        }
      });
    },
    handleDel(row) {
      destroy(row, "inquiry/resource", "destroy", this, row.id);
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    addClose() {
      this.dialogAdd = false;
      this.addForm = {
        loadingSave: false,
        name: "",
        email: "",
        status: "",
        user_id: "",
        allocselfwhennull: 0,
        remark: ""
      };
    },
  }
};
// function unique1(arr) {
//   var hash = [];
//   for (var i = 0; i < arr.length; i++) {
//     if (hash.indexOf(arr[i]) == -1) {
//       hash.push(arr[i]);
//     }
//   }
//   return hash;
// }
</script>


