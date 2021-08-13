<style lang="scss" scoped type="text/scss">
.sbaoHeard{
    text-align: right;
    margin-bottom: 10px;
    /deep/.el-checkbox__label{
      padding-left: 5px;
    }
}
</style>
<template>
  <d2-container>
    <div class="sbaoHeard">
      <div class="sbaoHeard-one">
           <el-date-picker
            v-model="queryList.ship_start_date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="发货开始日期"
            size="mini"
            style="width: 130px;"
            clearable
          ></el-date-picker>
          <el-date-picker
            v-model="queryList.ship_end_date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="发货结束日期"
            size="mini"
            style="width: 130px;margin-left: 5px;"
            clearable
          ></el-date-picker>
          <el-input
            v-model="queryList.batchno"
            clearable
            placeholder="批次"
            size="mini"
            style="width:140px;margin-left:5px;"
          ></el-input>
          <el-select v-model="queryList.warehouse_id"  clearable filterable
                      style="width: 140px;margin-left:5px;" size="mini"
                      placeholder="仓库">
              <el-option
                      v-for="(item,index) in warehouse"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
              </el-option>
          </el-select>
          <el-input
          v-model="queryList.cas"
          clearable
          placeholder="CAS"
          size="mini"
          style="width:140px;margin-left:5px;"
        ></el-input>
        <!-- <el-autocomplete
                clearable
                size='mini'
                v-model="queryList.supplier_name"
                :fetch-suggestions="querySearchAsync_corporation"
                placeholder="供应商"
                :trigger-on-focus="false"
                @select="handleSelect_corporation"
                style="margin-left:5px;"
        >
          <template slot-scope="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </el-autocomplete> -->
        <el-input
          v-model="queryList.supplier_name"
          clearable
          placeholder="供应商"
          size="mini"
          style="width:180px;margin-left:5px;"
        ></el-input>
        <el-input
          v-model="queryList.procurement_contract_number"
          clearable
          placeholder="采购订单号"
          size="mini"
          style="width:150px;margin:0px 5px;"
        ></el-input>
        <el-checkbox v-model="queryList.is_jmc" :true-label="1"  :false-label="0" style="margin: 0 5px;">含JMC</el-checkbox>
        <el-button
          type="primary"
          size="mini"
          :loading="loading_search"
          @click="sbaoSearch"
        >{{$t('wareHouse.xunit.searchButton')}}</el-button>
        <el-button class="d2-mr-5" type="primary" size="mini" :loading="prod_export_loading" @click="prod_export" v-if="permissions.indexOf(631)>-1">导出</el-button>
        <a hidden="hidden" :href="prod_export_url" ref="prod_export_url" ></a>
      </div>
    </div>

    <!-- 页面 -->

    <el-table
      :data="list.data"
      border
      fit
      highlight-current-row
      size="mini"
    >
      <el-table-column label="批次号" width="110">
        <template slot-scope="scope">{{scope.row.inventory.batchno}}</template>
      </el-table-column>
      <el-table-column label="发货时间" width="90">
        <template slot-scope="scope">{{scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column label="仓库" width="100">
        <template slot-scope="scope">{{getEnumValue(warehouse,scope.row.inventory.warehouse_id)}}</template>
      </el-table-column>
      <el-table-column label="出货金额" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.base_quantity==scope.row.contract_detail.base_quantity">
            {{scope.row.contract_detail.total_money}}{{getEnumValue(Currency,scope.row.contract_detail.currency_id)}}
          </span>
          <span v-else>
            {{((Number(scope.row.base_quantity)/Number(scope.row.contract_detail.base_quantity))*Number(scope.row.contract_detail.total_money)).toFixed(2)}}
            {{getEnumValue(Currency,scope.row.contract_detail.currency_id)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Cas" width="100">
        <template slot-scope="scope">{{scope.row.cas}}</template>
      </el-table-column>
      <el-table-column label="出库数量" width="80">
        <template slot-scope="scope">
          {{scope.row.preout.quantity}}
          {{getEnumValue(units,scope.row.preout.quantity_unit)}}
        </template>
      </el-table-column>
      <el-table-column label="品名">
        <template slot-scope="scope">{{scope.row.prod.name}}<br>{{scope.row.prod.name_cn}}</template>
      </el-table-column>
      <el-table-column label="供应商" width="120">
        <template slot-scope="scope">{{scope.row.inventory.porder.supplier_name}}</template>
      </el-table-column>
      <el-table-column label="采购订单号" width="110">
        <template slot-scope="scope">{{scope.row.inventory.purchaseorder_no}}</template>
      </el-table-column>
      <el-table-column label="销售订单号" width="100">
        <template slot-scope="scope">{{scope.row.contract_detail.contract_number}}</template>
      </el-table-column>
      <el-table-column label="合同总金额" width="100">
        <template slot-scope="scope">{{scope.row.contract_detail.total_money}}{{getEnumValue(Currency,scope.row.contract_detail.currency_id)}}</template>
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
import {
  ship_logs,
  ship_download
} from "@/api/warehouse";
import { supplier_lists } from "@/api/instore";
export default {
  name: "Warehouse-ship_logs",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      list: [],
      currentPage: 1,
      queryList: {
        page: "1",
        procurement_contract_number: "",
        ship_start_date:'',
        ship_end_date:'',
        supplier_name:'',
        is_jmc:1,
        cas:'',
        batchno:'',
        warehouse_id:''
      },
      prod_export_url:'',
      loading_search:false,
      prod_export_loading:false,
      warehouse:[],
      units:[],
      Currency:[]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-ship_logs") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      ship_logs(this.queryList).then(res => {
        if(this.loading_search){
            this.$message({
                message:res.msg,
                type:'success'
            })
            this.loading_search=false
        }
        this.list = res.data;
        this.warehouse = res.enum.warehouse
        this.units = res.enum.units
        this.Currency = this.GEnums.Currency;
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
    prod_export(){
      this.prod_export_loading = true
      ship_download(this.queryList).then(res => {
        if (res && res.code === 0) {
          this.prod_export_url = res.data
          this.prod_export_loading = false
          setTimeout(() => {
            this.$refs.prod_export_url.click()
          }, 500)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.prod_export_loading = false
        }
      }).catch(rr => {
        this.prod_export_loading = false
      })
    },
    querySearchAsync_corporation(queryString, cb) {
        var restaurants = '';
        if(queryString){
            supplier_lists(queryString).then(res => {
                restaurants = res.data
                cb(restaurants)
            })
        }else{
            cb(restaurants)
        }
    },
    handleSelect_corporation(item){
        this.queryList.supplier_name=item.name
        this.$forceUpdate()
    },
  }
};
</script>
