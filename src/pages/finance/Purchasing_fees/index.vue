<style lang="scss" scoped type="text/scss">
.heard_top {
  margin: 10px 0px 15px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    font-size: 14px;
  }
  .el-select {
    margin: 0px 5px;
  }
  .el-input {
    margin: 0px 5px;
  }
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <el-select
              v-model="queryList.system_company"
              filterable
              clearable
              size="mini"
              placeholder="付款公司"
              style="width: 200px;"
      >
        <el-option v-for="(i,index) in enums.system_company" :key="index" :label="i.name" :value="i.id"></el-option>
      </el-select>
      <el-select
        v-model="queryList.supplier_id"
        filterable
        remote
        reserve-keyword
        :remote-method="supplyMethod"
        :loading="supplyloading"
        placeholder="供应商"
        style="width:200px;"
        size="mini"
        clearable
      >
        <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
      <el-input
        size="mini"
        v-model="queryList.contract_number"
        placeholder="合同号"
        clearable
        style="width:150px;"
      ></el-input>
      <el-select placeholder="采购员" size="mini" class="d2-ml-5" style="width: 100px;" clearable v-model="queryList.purchase_user_id">
        <el-option
                v-for="item in purchaseList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-select
              v-model="queryList.status"
              clearable
              filterable
              size="mini"
              placeholder="状态"
              style="width: 100px;"
      >
        <el-option v-for="(i,index) in enums.finance_check_status" :label="i.name" :value="i.id" :key="i.id"></el-option>
      </el-select>
      <el-select
              v-model="queryList.settlement_type"
              filterable
              clearable
              size="mini"
              placeholder="全部供应"
              style="width: 120px;"
      >
        <el-option v-for="(i,index) in enums.SettlementType" :label="i.name" :value="i.id" :key="index"></el-option>
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
      <el-table-column label="#ID" width="50px">
        <template
                slot-scope="scope"
        >{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="合同编号" width="100px">
        <template
          slot-scope="scope"
        >{{scope.row.procurement_contract_number}}</template>
      </el-table-column>
      <el-table-column label="付款公司" width="150px">
        <template
                slot-scope="scope"
        >
          <el-tooltip placement="top">
            <div slot="content">
              <span>{{scope.row.paybank}}</span>
            </div>
             <span>{{scope.row.corp_name}}</span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="供应商" width="150px">
        <template slot-scope="scope">{{scope.row.supplier_name}}</template>
      </el-table-column>
      <el-table-column label="审批金额" width="100px">
        <template slot-scope="scope">{{Currency[scope.row.currency_id].icon}}{{scope.row.pay_requestamount}}</template>
      </el-table-column>
      <el-table-column label="金额详情">
        <template slot-scope="scope">
          付款:{{Currency[scope.row.currency_id].icon}}{{scope.row.pay_amount}}
          <el-tag type="danger" size="mini" v-if="scope.row.offset_amount>0">往来账抵扣:{{scope.row.offset_amount?Currency[scope.row.currency_id].icon:''}}{{scope.row.offset_amount}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="收款人" width="80px">
        <template slot-scope="scope">{{scope.row.receiver}}</template>
      </el-table-column>
      <el-table-column label="对方银行"  width="150px">
        <template slot-scope="scope">{{scope.row.bank}}</template>
      </el-table-column>
      <el-table-column label="银行账号">
        <template slot-scope="scope">{{scope.row.bank_account}}</template>
      </el-table-column>
      <el-table-column label="付款方式">
        <template slot-scope="scope">
          {{getEnumValue(enums.PayType,scope.row.pay_type)}}
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">{{scope.row.note}}</template>
      </el-table-column>
      <el-table-column label="采购" width="80px">
        <template slot-scope="scope">{{scope.row.purchase_user_name}}</template>
      </el-table-column>
      <el-table-column label="财务审核" width="70px">
        <template slot-scope="scope">{{getEnumValue(enums.finance_check_status,scope.row.finance_check_status)}}</template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">{{scope.row.pay_time?scope.row.pay_time.slice(0,10):''}}</template>
      </el-table-column>
      <el-table-column label="审核时间">
        <template slot-scope="scope">{{scope.row.finance_check_time?scope.row.finance_check_time.slice(0,10):''}}</template>
      </el-table-column>
      <el-table-column label="操作" width="115px" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-checkbox v-model="checked_all" @change="select_all"></el-checkbox>
          <el-button
                  class="d2-ml-5"
                  type="primary"
                  size="mini"
                  @click="reviewClick_all()"
          >批量审核</el-button>
        </template>
        <template slot-scope="scope">
          <div v-if="scope.row.package_no">{{scope.row.package_no}}</div>
          <div v-else>
            <el-checkbox v-if="scope.row.finance_check_status!=1" v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row.id)"></el-checkbox>
            <el-button
                    class="d2-ml-5"
                    type="primary"
                    size="mini"
                    v-if="scope.row.finance_pay_status!=1"
                    @click="reviewClick(scope.row)"
            >审核</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="审核" :visible.sync="dialogVisible_check" width="30%">
      <el-form label-width="80px" label-position="left">
        <el-form-item class="from-item">
          <div>
            <span style="margin-right: 10px;">付款银行:</span>
            <el-select
                    v-model="check.pay_bank"
                    filterable
                    size="mini"
                    placeholder=""
                    clearable
                    style="width: 250px;"
            >
              <el-option v-for="(i,index) in enums.paybanks" :label="i.bank" :value="i.bank" :key="index"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item class="from-item">
          <div>
            <span style="margin-right: 10px;">审核:</span>
            <el-radio-group v-model="check.finance_check_status">
              <el-radio :label="1">审核通过</el-radio>
              <el-radio :label="-1">不通过</el-radio>
            </el-radio-group>
          </div>
          <!--<div class="d2-m-10">-->
            <!--<span style="margin-right: 10px;vertical-align: top;display: inline-block;">审核意见:</span>-->
            <!--<textarea v-model="check.note" name="" id="" cols="40"-->
                      <!--rows="4"></textarea>-->
          <!--</div>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_check = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_check">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev,pager,next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import { lists, listTotal, create } from "@/api/prod";
import { verify } from "@/api/finance";
export default {
  name: "finance-Purchasing_fees",
  data() {
    return {
      list: {},
      loading:false,
      currentPage: 1,
      supplyloading: false,
      dialogVisible_check:false,
      queryList: {
        page: "1",
        supplier_id: "",
        contract_number: "",
        status:'',
        settlement_type:'',
        purchase_user_id:'',
        system_company:'',
        type:3
      },
      supply_list: [],
      purchaseList:[],
      check:{
          id:'',
          pay_bank:'',
          finance_check_status:1
      },
        status:{},
        Currency:{},
        enums:{},
        loading_search:false,
        checked_all: false,
        id:[]
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.id=[]
      this.checked_all=false
      lists(this.queryList, "ProcurementContract/paylist").then(res => {
          if(this.loading_search){
              this.$message({
                  message: 'success',
                  type: 'success'
              })
              this.loading_search=false
          }
          res.data.data.forEach((items, index) => {
              items.checked = false
          })
          this.list = res.data;
          this.status=res.enum.status
          this.Currency=res.enum.Currency
          this.enums=res.enum
      });
        listTotal("data/user_list?user_type=101").then(res => {
            this.purchaseList = res.data;
        });
    },
      select_all () {
          this.list.data.forEach((items, index) => {
              if (this.checked_all&&items.finance_check_status!=1&&!items.package_no) {
                  items.checked = true
                  this.id.push(items.id)
              }
              if (!this.checked_all){
                  this.id = []
                  items.checked = false
              }
          })
      },
      select_one (checked, id) {
          if (checked) {
              this.id.push(id)
          } else {
              this.id.forEach((items, index) => {
                  if (items == id) {
                      this.id.splice(index, 1)
                  }
              })
          }
          let num = 0
          this.list.data.forEach((items, index) => {
              if (items.checked) {
                  num++
              }
          })
          if (num == this.list.data.length) {
              this.id = []
              this.checked_all = true
              this.list.data.forEach((items, index) => {
                  this.id.push(items.id)
              })
          } else {
              this.checked_all = false
          }
      },
      Search(){
          this.loading_search=true
          this.queryList.page = 1;
          this.currentPage=1
          this.fetchData();
      },
      reviewClick(row){
          this.check.pay_bank=''
          this.check.id=row.id
          this.enums.paybanks.forEach((items,index)=>{
              if(items.bank==row.paybank){
                  this.check.pay_bank=row.paybank
              }
          })
          if(!this.check.pay_bank){
              this.check.pay_bank= this.enums.paybanks[0].bank
          }
          this.dialogVisible_check=true
      },
      reviewClick_all(){
          this.check.id=this.id
          this.check.pay_bank=''
          this.dialogVisible_check=true
      },
      save_check(){
          verify(this.check,this)
      },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.supply_list = res.data;
              this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    handleCurrentChange(page_current) {
      this.id = []
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    }
  }
};
</script>