<style lang="scss" scoped type="text/scss">
.sbaoHeard {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .el-input{
    margin: 5px;
    width: 200px;
  }
  .el-select{
    margin: 5px;
    width: 100px;
  }
}
.sbaoInput {
  width: 70%;
}

el-table {
  background: #d9edf6;
}
</style>
<template>
  <d2-container>
    <div class="sbaoHeard">
      <el-input
        class="sbaoInput"
        v-model="queryList.cas"
        placeholder="CAS"
        size="mini"
      ></el-input>
      <el-input
        class="sbaoInput"
        v-model="queryList.batchno"
        placeholder="批号"
        size="mini"
      ></el-input>
      <el-input
        class="sbaoInput"
        v-model="queryList.contract_number"
        placeholder="合同号"
        size="mini"
      ></el-input>
      <el-input
        class="sbaoInput"
        v-model="queryList.prod_name"
        placeholder="产品名称"
        size="mini"
      ></el-input>
      <el-select
        placeholder="发货状态"
        clearable
        v-model="queryList.ship_status"
        size="mini"
      >
        <el-option
          v-for="item in enums.ship_status"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="分装状态"
        clearable
        v-model="queryList.repack_status"
        size="mini"
      >
        <el-option
          v-for="item in enums.repack_status"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="入库状态"
        clearable
        v-model="queryList.Warehous_status"
        size="mini"
      >
        <el-option
          v-for="item in enums.Warehous_status"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="仓库"
        clearable
        v-model="queryList.Warehous_id"
        size="mini"
      >
        <el-option
          v-for="item in enums.Warehous_id"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        size="mini"
        :loading="loading_search"
        @click="sbaoSearch"
      >{{$t('wareHouse.xunit.searchButton')}}</el-button>
    </div>

    <!-- 页面 -->

    <el-table
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="CAS" width="100px">
        <template slot-scope="scope">{{scope.row.cas}}</template>
      </el-table-column>
      <el-table-column
        label="批次号"
        class="sbaoTable"
        width="150px"
      >
        <template slot-scope="scope">{{scope.row.contract_detail.batchno}}</template>
      </el-table-column>
      <el-table-column label="合同号" width='150'>
        <template slot-scope="scope">{{scope.row.contract_detail.contract_number}}</template>
      </el-table-column>
      <el-table-column label="产品名称">
        <template slot-scope="scope">{{scope.row.inventory.name_cn}}</template>
      </el-table-column>
      <el-table-column label="发货状态" width='100px'>
        <template slot-scope="scope">{{}}</template>
      </el-table-column>
      <el-table-column label="分装状态" width='100px'>
        <template slot-scope="scope">{{}}</template>
      </el-table-column>
      <el-table-column label="入库状态" width='100px'>
        <template slot-scope="scope">{{}}</template>
      </el-table-column>
      <el-table-column label="仓库" width='100px'>
        <template slot-scope="scope">{{getEnumValue(GEnums.Warehouse,scope.row.transfer_warehouse_id)}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.xunit.xunit_page.make')" width="80px">
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
  </d2-container>
</template>
<script>
import axios from "axios";
import {transfer_index} from "@/api/warehouse";

export default {
  name: "Warehouse-transfer",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      list: [],
      currentPage: 1,
      queryList: {
        page: "1",
        cas: "",
        batchno:'',
        contract_number:'',
        prod_name:'',
        ship_status:'',
        repack_status:"",
        Warehous_status:'',
        Warehous_id:''
      },
      enums:{},
      loading_search:false
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-transfer") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      transfer_index(this.queryList).then(res => {
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
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    sbaoSearch() {
      this.loading_search=true
      this.queryList.page = 1;
      this.currentPage=1
      this.fetchData();
    },
  }
};
</script>
