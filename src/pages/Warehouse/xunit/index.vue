<style lang="scss" scoped type="text/scss">
.sbaoHeard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.sbaoInput {
  width: 70%;
}

.sbaoHeard-one {
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: space-around;
}

.tipOne {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.sbaoClose {
  margin-left: 140px;
}

.sbaoClose:hover {
  color: black;
  background: gainsboro;
}

.sbaoFrom {
  font-weight: bold;
}

.sbaoDialog {
  font-size: 12px;
  font-weight: bold;
}

.question-select {
  height: 40px;
}

.question-select select {
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  outline: none;
  height: 100%;
  padding: 0 20px;
  color: #333;
  font-size: 22px;
}

.question-select .el-select {
  margin-right: 5px;
}

el-table {
  background: #d9edf6;
}
</style>
<template>
  <d2-container>
    <div class="sbaoHeard">
      <el-button
        class="add"
        size="mini"
        type="primary"
        @click="handleAdd"
        icon="plus"
        v-if="permissions.indexOf(216)>-1"
      >{{$t('wareHouse.xunit.addButton')}}</el-button>
      <div class="sbaoHeard-one">
        <el-input
          class="sbaoInput"
          v-model="queryList.name"
          :placeholder="$t('wareHouse.xunit.serchInput')"
          size="mini"
          @focus="inputFocus"
        ></el-input>
        <el-button
          type="primary"
          size="mini"
          :loading="loading_search"
          @click="sbaoSearch"
        >{{$t('wareHouse.xunit.searchButton')}}</el-button>
      </div>
    </div>

    <!-- 页面 -->

    <el-table
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      size="mini"
    >
      <el-table-column :label="$t('wareHouse.xunit.xunit_page.id')" width="100px">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column
        :label="$t('wareHouse.xunit.xunit_page.name')"
        class="sbaoTable"
        width="100px"
      >
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.xunit.xunit_page.name_cn')" width="100px">
        <template slot-scope="scope">{{scope.row.name_cn}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.xunit.xunit_page.note')">
        <template slot-scope="scope">{{scope.row.note}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.xunit.xunit_page.make')" width="130px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
            v-if="permissions.indexOf(215)>-1"
          >{{$t('wareHouse.xunit.editButton')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="permissions.indexOf(217)>-1"
            @click="handleDel(scope.row)"
          >{{$t('wareHouse.xunit.delButton')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :total="list.total"
      :page-size="list.per_page"
    ></el-pagination>

    <!-- 增加 -->

    <el-dialog class="sbaoDialog" title :visible.sync="dialogAdd" top="5vh">
      <el-form class="sbaoFrom" :model="addForm" label-width="80px" label-position="right">
        <el-form-item :label="$t('wareHouse.xunit.xunit_page.name')" :required="true">
          <el-input v-model="addForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.xunit.xunit_page.name_cn')">
          <el-input v-model="addForm.name_cn" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.xunit.xunit_page.note')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="addForm.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            :loading="save_fy"
            @click="saveAdd()"
            icon="el-icon-edit-outline"
          >{{$t('wareHouse.xunit.xunit_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            size="mini"
            @click="addClose"
          >{{$t('wareHouse.xunit.xunit_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->

    <el-dialog title :visible.sync="dialogEdit"  top="5vh">
      <el-form class="sbaoFrom" :model="editForm" label-width="100px" label-position="right">
        <el-form-item :label="$t('wareHouse.xunit.xunit_page.name')" :required="true">
          <el-input v-model="editForm.name" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.xunit.xunit_page.name_cn')">
          <el-input v-model="editForm.name_cn" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.xunit.xunit_page.note')">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="editForm.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="save_fy"
            @click="saveEdit()"
            size="mini"
            icon="el-icon-edit-outline"
          >{{$t('wareHouse.xunit.xunit_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            @click="dialogEdit= false"
            size="mini"
          >{{$t('wareHouse.xunit.xunit_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import axios from "axios";
import {
  lists,
  destroy,
  create,
  update,
  listTotal,
  list_Total
} from "@/api/prod";

export default {
  name: "Warehouse-xunit",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      save_fy:false,
      list: [],
      currentPage: 1,
      address: "",
      queryList: {
        page: "1",
        name: ""
      },
      dialogAdd: false,
      addForm: {
        name: "",
        name_cn: "",
        note: "",
        loading: false
      },
      addForm_loadingSave: false,
      dialogEdit: false,
      editForm: {
        id: "",
        name: "",
        name_cn: "",
        note: ""
      },
      editForm_loadingSave: false,
      loading_search:false
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-xunit") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    selected_country_address(id) {
      city_list(id).then(res => {
        this.city = res.data;
      });
    },
    fetchData() {
      this.queryList.name = this.queryList.name.replace(/\s/g, "");
      lists(this.queryList, "virtualunit").then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.list = res.data;
      });
    },
    handleAdd() {
      this.dialogAdd = true;
    },
    saveAdd() {
      create(this.addForm, "virtualunit", "create", this);
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.name;
      this.editForm.name_cn = row.name_cn;
      this.editForm.note = row.note;
    },
    saveEdit() {
      update(this.editForm, "virtualunit", "update", this);
      this.dialogEdit = false;
    },
    handleDel(row) {
      destroy(row, "virtualunit", "destroy", this, row.id);
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    inputFocus() {
      this.fetchData();
    },
    sbaoSearch() {
      this.loading_search=true
      this.queryList.page = 1;
      this.currentPage=1
      this.fetchData();
    },
    addClose() {
      this.addForm = {
        name: "",
        name_cn: "",
        note: ""
      };
      this.dialogAdd = false;
    }
  }
};
</script>
