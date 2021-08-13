<style lang="scss" scoped type="text/scss">
.heard_top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  .el-input {
    width: 200px;
  }
  .el-select {
    margin: 0px 10px;
    width: 120px;
  }
}
/deep/.gutter {
  display: block !important;
}
/deep/.el-form-item {
   margin-bottom: 5px;
}
.el-table{
  /deep/.cell{
    padding:0px 5px;
  }
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <el-date-picker
        size="mini"
        type="date"
        placeholder="开始日期"
        value-format="yyyy-MM-dd"
        format="yyyyMMdd"
        style="width: 118px"
        v-model="queryList.start_date"
        clearable
      ></el-date-picker>
      <el-date-picker
        size="mini"
        type="date"
        placeholder="结束日期"
        value-format="yyyy-MM-dd"
        format="yyyyMMdd"
        style="width: 118px"
        v-model="queryList.end_date"
        clearable
      ></el-date-picker>
      <el-input size="mini" style="margin:0px 10px;" placeholder="批次号" v-model="queryList.batchno" clearable></el-input>
      <el-input placeholder="CAS" size="mini" v-model="queryList.cas" clearable></el-input>
      <el-select size="mini" placeholder="选择状态" v-model="queryList.status" clearable>
        <el-option v-for="item in status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
    </div>

    <!-- 页面 -->
    <div>
      <el-table
        :data="list.data"
        border
        style="width: 100%;padding:0px;margin:0px;font-size: 12px;"
        highlight-current-row
        fit
      >
        <el-table-column label="ID" width="60">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="通知时间" width="80">
          <template slot-scope="scope">{{scope.row.created_at}}</template>
        </el-table-column>
        <!--<el-table-column label="仓库">-->
          <!--<template-->
            <!--scope="scope"-->
          <!--&gt;{{warehouse.filter(i=>{return scope.row.warehouse_id==i.id})[0].name}}</template>-->
        <!--</el-table-column>-->
        <el-table-column label="CAS">
          <template slot-scope="scope">{{scope.row.prod.cas}}</template>
        </el-table-column>
        <el-table-column label="产品名称" width="200">
          <template slot-scope="scope">
            {{scope.row.prod.name_cn}}
            {{scope.row.prod.name}}
          </template>
        </el-table-column>
        <el-table-column label="包装类型" width="60">
          <template slot-scope="scope">{{scope.row.package_type==1?'整装':'散装'}}</template>
        </el-table-column>
        <el-table-column label="规格" width="60">
          <template slot-scope="scope">
            <div
              v-if="scope.row.package_shelves&&scope.row.package_type!=2"
            >{{scope.row.package_shelves.packsize}}{{scope.row.package_shelves.packsize_unit_id?units.filter(res=>{return scope.row.package_shelves.packsize_unit_id == res.id})[0].name:''}}</div>
          </template>
        </el-table-column>
        <el-table-column label="份数" width="60">
          <template slot-scope="scope">{{scope.row.package_nums}}</template>
        </el-table-column>
        <el-table-column label="总数量">
          <template slot-scope="scope">
            {{scope.row.quantity}}
            {{units.filter(i=>{return scope.row.quantity_unit==i.id})[0].name}}
          </template>
        </el-table-column>
        <el-table-column label="批次">
          <template slot-scope="scope">{{scope.row.inventory.batchno}}</template>
        </el-table-column>
        <el-table-column label="公司" width="120">
          <template slot-scope="scope">{{scope.row.company?scope.row.company.name:'' }}</template>
        </el-table-column>
        <el-table-column label="仓库/货架">
          <template  slot-scope="scope">{{warehouse.filter(i=>{return scope.row.warehouse_id==i.id})[0].name}}/{{scope.row.shelf}}</template>
        </el-table-column>
        <el-table-column label="需调拨公司" width="120">
          <template slot-scope="scope">{{scope.row.company_to?scope.row.company_to.name:'' }}</template>
        </el-table-column>
        <el-table-column label="需调拨仓库/货架">
          <template slot-scope="scope" >{{warehouse.filter(i=>{return scope.row.warehouse_id_to==i.id})[0].name}}/{{scope.row.shelf_to}}</template>
        </el-table-column>
        <el-table-column label="审批状态" width="70">
          <template slot-scope="scope">{{status_info.filter(i=>{return scope.row.status==i.id})[0].name}}</template>
        </el-table-column>
        <el-table-column label="申请人" width="60">
          <template slot-scope="scope">{{scope.row.user.name}}</template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="80">
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
    </div>

    <!-- 审批 -->
    <el-dialog :visible.sync="dialogAdd" width="60%">
      <el-form label-width="150px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请时间:">
              <el-input size="small" :placeholder="reviewAdd.created_at" disabled></el-input>
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
              <el-input size="small" :placeholder="reviewAdd.package_type==1?'整装':'散装'" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" >
            <el-form-item label="规格">
              <el-input
                v-if="reviewAdd.package_type==1"
                size="small"
                disabled
                :placeholder="reviewAdd.package_shelves?reviewAdd.package_shelves.packsize+units.filter(res=>{return reviewAdd.package_shelves.packsize_unit_id == res.id})[0].name:''"
              ></el-input>
              <el-input v-else  size="small" disabled></el-input>
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
            <el-form-item label="总数量:">
              <el-input
                size="small"
                :placeholder="reviewAdd.quantity_unit?reviewAdd.quantity+units.filter(i=>{return reviewAdd.quantity_unit==i.id})[0].name:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="仓库/货架:">
              <el-input
                size="small"
                :placeholder="(reviewAdd.warehouse_id?warehouse.filter(i=>{return reviewAdd.warehouse_id==i.id})[0].name:'')+'/'+reviewAdd.shelf"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需调拨仓库/货架:">
              <el-input
                size="small"
                :placeholder="(reviewAdd.warehouse_id_to?warehouse.filter(i=>{return reviewAdd.warehouse_id_to==i.id})[0].name:'')+'/'+reviewAdd.shelf_to"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司:">
              <el-input
                size="small"
                :placeholder="reviewAdd.company?reviewAdd.company.name:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="需调拨公司:">
              <el-input
                size="small"
                :placeholder="reviewAdd.company_to?reviewAdd.company_to.name:''"
                disabled
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人:">
              <el-input size="small" :placeholder="reviewAdd.user?reviewAdd.user.name:''" disabled></el-input>
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
  name: "Warehouse-allot_review",
  data() {
    return {
      list: {},
      reviewAdd: {},
      currentPage: 1,
      save_fy:false,
      dialogAdd: false,
      queryList: {
        page: "1",
        start_date: "",
        end_date: "",
        status: 0,
        cas: "",
        batchno: ""
      },
      status_info: [],
      type_info: [],
      units: [],
      virtualunits: [],
      warehouse: [],
      loading_search:false
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Warehouse-allot_review'){
            this.fetchData()
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      lists(this.queryList, "transfer").then(res => {
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
      });
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    Search(){
      this.loading_search=true
      this.queryList.page = 1
      this.currentPage=1
      this.queryList.batchno = this.queryList.batchno.replace(/\s/g, '')
      this.queryList.cas = this.queryList.cas.replace(/\s/g, '')
      this.fetchData()
    },
    reviewClick(id) {
      listTotal("inventory/transfer_detail?id=" + id).then(res => {
        this.reviewAdd = res.data;
        this.reviewAdd.status = 1;
        this.dialogAdd = true;
      });
    },
    reviewCreate(){
      var a ={}
      a.id = this.reviewAdd.id
      a.status = this.reviewAdd.status
      a.approval_note = this.reviewAdd.approval_note
      create(a, "inventory", "transfer_verify", this);
    },
    reviewClose() {
      this.dialogAdd = false;
    },
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
