<style lang="scss" scoped type="text/scss">
.heard_top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  .el-input {
    width: 15%;
  }
  .el-select {
    margin: 0px 10px;
  }
}
/deep/.gutter {
  display: block !important;
}
/deep/.el-table{
  td,th{
    .cell{
      padding:0px 5px;
    }
  }
  
}
</style>
<template>
  <d2-container class="div">
    <!-- 页眉 -->
    <div class="heard_top">
      <el-date-picker
        size="mini"
        type="date"
        placeholder="开始日期"
        value-format="yyyy-MM-dd"
        format="yyyyMMdd"
        v-model="queryList.start_date"
        clearable
        style="width: 118px"
      ></el-date-picker>
      <el-date-picker
        size="mini"
        type="date"
        placeholder="结束日期"
        value-format="yyyy-MM-dd"
        format="yyyyMMdd"
        v-model="queryList.end_date"
        clearable
        style="width: 118px"
      ></el-date-picker>
      <el-input
        size="mini"
        style="margin:0px 10px;"
        placeholder="合同号"
        v-model="queryList.contract_number"
        clearable
      ></el-input>
      <el-input size="mini" style="margin:0px 10px;" placeholder="批次号" v-model="queryList.batchno" clearable></el-input>
      <el-input placeholder="CAS" size="mini" v-model="queryList.cas" clearable></el-input>
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
      <el-select size="mini" placeholder="选择状态" v-model="queryList.status" style="width:110px;" clearable>
        <el-option v-for="item in status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
    </div>

    <!-- 页面 -->
    <el-table
      :data="list.data"
      border
      style="width: 100%;padding:0px;margin:0px;font-size: 12px;"
      highlight-current-row
      fit
    >
      <el-table-column label="通知时间" width="80px">
        <template slot-scope="scope">{{scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column label="批次号" width="80px">
        <template slot-scope="scope">{{scope.row.inventory?scope.row.inventory.batchno:''}}</template>
      </el-table-column>
      <el-table-column label="仓库" width="120px">
        <template
          slot-scope="scope"
        >{{warehouse.filter(i=>{return scope.row.warehouse_id==i.id})[0].name}}</template>
      </el-table-column>
      <el-table-column label="货架">
        <template slot-scope="scope">{{scope.row.shelf}}</template>
      </el-table-column>
      <el-table-column label="CAS">
        <template slot-scope="scope">{{scope.row.prod?scope.row.prod.cas:''}}</template>
      </el-table-column>
      <el-table-column label="产品名称" width="250px">
        <template slot-scope="scope">
          {{scope.row.prod?scope.row.prod.name_cn:''}}<br/>
          {{scope.row.prod?scope.row.prod.name:''}}
        </template>
      </el-table-column>
      <el-table-column label="包装类型" width="60">
        <template slot-scope="scope">{{package_type_info[Number(scope.row.package_type)].name}}</template>
      </el-table-column>
      <el-table-column label="规格" width="70">
        <template slot-scope="scope">
          <div
            v-if="scope.row.package"
          >{{scope.row.package.packsize}}{{scope.row.package.unit_id?units.filter(res=>{return scope.row.package.unit_id == res.id})[0].name:''}}</div>
        </template>
      </el-table-column>
      <el-table-column label="份数" width="70">
        <template slot-scope="scope">{{scope.row.package_nums}}</template>
      </el-table-column>
      <el-table-column label="总数量" width="70">
        <template slot-scope="scope">
          {{scope.row.quantity}}
          {{units.filter(i=>{return scope.row.quantity_unit==i.id})[0].name}}
        </template>
      </el-table-column>
      <el-table-column label="类型" width="60">
        <template slot-scope="scope">{{type_info.filter(i=>{return scope.row.type==i.id})[0].name}}</template>
      </el-table-column>
      <el-table-column label="备注" width="120">
        <template slot-scope="scope">{{scope.row.reason}}</template>
      </el-table-column>
      <el-table-column label="审批状态" width="60">
        <template slot-scope="scope">{{status_info.filter(i=>{return scope.row.status==i.id})[0].name}}</template>
      </el-table-column>
      <el-table-column label="申请人" width="60">
        <template slot-scope="scope">{{scope.row.user.name}}</template>
      </el-table-column>
      <el-table-column label="操作" width="60px"  fixed="right">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==0"
            type="primary"
            size="mini"
            @click="reviewClick(scope.row.id)"
          >审批</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审批 -->
    <el-dialog :visible.sync="dialogAdd">
      <el-form label-width="100px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请时间:">
              <el-input size="small" :placeholder="reviewAdd.created_at" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仓库:">
              <el-input
                      size="small"
                      :placeholder="reviewAdd.warehouse_id?warehouse.filter(i=>{return reviewAdd.warehouse_id==i.id})[0].name:''"
                      disabled
              ></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="货位:">
              <el-input size="small" :placeholder="reviewAdd.shelf" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="批次号:">
              <el-input
                size="small"
                :placeholder="reviewAdd.inventory?reviewAdd.inventory.batchno:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品名称:">
              <el-input
                size="small"
                :placeholder="reviewAdd.prod?reviewAdd.prod.name_cn+reviewAdd.prod.name:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CAS">
              <el-input size="small" :placeholder="reviewAdd.prod?reviewAdd.prod.cas:''" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="包装类型：">
              <el-input size="small" :placeholder="reviewAdd.package_type?package_type_info[reviewAdd.package_type].name:''" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="reviewAdd.package_type==1">
            <el-form-item label="规格">
              <el-input
                size="small"
                disabled
                :placeholder="reviewAdd.package?reviewAdd.package.packsize+units.filter(res=>{return reviewAdd.package.unit_id == res.id})[0].name:''"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="份数:">
              <el-input size="small" :placeholder="reviewAdd.package_nums" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格:">
              <el-input size="small" :placeholder="(reviewAdd.inventory?reviewAdd.inventory.base_price:'')+(reviewAdd.inventory&&reviewAdd.inventory.procurement_currency_id?getEnumValue(Currency,reviewAdd.inventory.procurement_currency_id):'人民币')" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="类型:">
              <el-input
                size="small"
                :placeholder="reviewAdd.type?type_info.filter(i=>{return reviewAdd.type==i.id})[0].name:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请人:">
              <el-input size="small" :placeholder="reviewAdd.user?reviewAdd.user.name:''" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="总数量:">
              <el-input
                size="small"
                :placeholder="reviewAdd.quantity_unit?reviewAdd.quantity+units.filter(i=>{return reviewAdd.quantity_unit==i.id})[0].name:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注:">
              <el-input size="small" type="textarea" :placeholder="reviewAdd.reason" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="审批：">
          <el-radio-group v-model="reviewAdd.status">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="-1">审核不通过</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批意见：">
          <el-input type="textarea" v-model="reviewAdd.approval_note" :rows="3" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="reviewCreate()" :loading="save_fy">确定</el-button>
          <el-button size="mini" @click="reviewClose()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
      v-if="list.total"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="list.per_page"
      layout="prev, pager, next"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import { lists, listTotal, create } from "@/api/inventory";
export default {
  name: "Warehouse-profit_loss_review",
  data() {
    return {
      list: {},
      dialogAdd: false,
      save_fy:false,
      reviewAdd: {},
      currentPage: 1,
      queryList: {
        page: "1",
        start_date: "",
        end_date: "",
        status: 0,
        cas: "",
        contract_number: "",
        batchno: "",
        warehouse_id:''
      },
      status_info: [],
      type_info: [],
      units: [],
      virtualunits: [],
      warehouse: [],
      Currency: [],
      package_type_info:{},
      loading_search:false
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Warehouse-profit_loss_review'){
            this.fetchData()
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      lists(this.queryList, "profit_loss_list").then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.list = res.data;
        obj(this.status_info, res.enum.status_info);
        obj(this.type_info, res.enum.type_info);
        this.units = res.enum.units;
        this.virtualunits = res.enum.virtualunits;
        this.warehouse = res.enum.warehouse;
        this.package_type_info=res.enum.package_type_info
        this.Currency = this.GEnums.Currency;
      });
    },
    Search() {
      this.loading_search=true
      this.queryList.page = 1
      this.currentPage=1
      this.queryList.cas = this.queryList.cas.replace(/\s/g, '')
      this.queryList.contract_number = this.queryList.contract_number.replace(/\s/g, '')
      this.queryList.batchno = this.queryList.batchno.replace(/\s/g, '')
      this.fetchData();
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    reviewClick(id) {
      listTotal("inventory/profit_loss_verify_view?id=" + id).then(res => {
        res.data.status=1
        this.reviewAdd = res.data;
        this.dialogAdd = true;
        this.reviewAdd.id = res.data.id;
        this.reviewAdd.type = Number(res.data.type);
      });
    },
    reviewCreate() {
      var a = {};
      a.id = this.reviewAdd.id;
      a.type = this.reviewAdd.type;
      a.status = this.reviewAdd.status;
      a.approval_note = this.reviewAdd.approval_note;
      create(a, "inventory", "profit_loss_verify", this);
    },
    reviewClose() {
      this.dialogAdd = false;
    }
  }
};
function obj(arr, object) {
  if (arr.length == 0) {
    for (let i in object) {
      arr.push(object[i]);
    }
  }
}
</script>
