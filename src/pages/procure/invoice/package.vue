<style lang="scss" scoped type="text/scss">
.heard_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 5px;
  .el-autocomplete {
    width: 20%;
  }
  .el-input {
    width: 15%;
  }
  .el-select {
    width: 15%;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
}
.dialog {
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
}
/deep/.plTableBox .el-table{
    font-size: 13px!important;
}
/deep/.d2-container-full__body::-webkit-scrollbar {
    overflow-y:hidden;
}
/deep/.el-textarea__inner{
    padding: 5px 20px;
}
    .el-icon-circle-close{
        position: absolute;
        left: 185px;
        z-index: 99999;
        font-size: 14px;
        color: #C0C4CC;
        border-color: #C0C4CC;
    }

</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
        <el-input placeholder="合同编号"  size="mini" type="textarea" autosize  v-model="queryList.contract_number" style="margin:0px 10px 0px 0px;width:200px;position: absolute;left:10px;top:10px;z-index: 99999;" clearable>
        </el-input>
        <i v-if="queryList.contract_number" class="el-icon-circle-close" @click="close_contract_number"></i>
        <div style="margin-left: 210px;">
        <el-input placeholder="CAS" size="mini" style="margin:0px 10px 0px 0px;" v-model="queryList.cas" clearable></el-input>
        <el-date-picker
                type="date"
                placeholder="合同开始日期"
                clearable
                v-model="queryList.date_start"
                value-format="yyyy-MM-dd"
                style="width:200px;"
                class="d2-mr-5"
                size="mini"
        ></el-date-picker>
        <el-date-picker
                size="mini"
                type="date"
                clearable
                placeholder="合同结束日期"
                v-model="queryList.date_end"
                class="d2-mr-5"
                style="width:200px;"
                value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select placeholder="采购员" size="mini" clearable v-model="queryList.purchase_user_id" style="margin:0px 10px 0px 0px;width: 130px;">
          <el-option
                  v-for="item in purchaseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-autocomplete
          size="mini"
          style="margin:0px 10px 0px 0px;"
          v-model="supplier"
          :fetch-suggestions="querySearch"
          placeholder="供应商"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
        <!-- <el-select placeholder="是否付款" size="mini" clearable v-model="queryList.pay_status" style="margin:0px 10px 0px 0px;">
          <el-option
                  v-for="item in enums.pay_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select> -->
         <el-select
          placeholder="入库状态"
          style="margin:0px 10px 0px 0px;"
          size="mini"
          clearable
          v-model="queryList.storage_status">
          <el-option
            v-for="item in storage_status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          placeholder="扫票状态"
          style="margin:0px 10px 0px 0px;"
          size="mini"
          clearable
          v-model="queryList.saopiao_status">
          <el-option
            v-for="item in saopiao_status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
          <el-select
                  placeholder="付款状态"
                  style="margin:0px 10px 0px 0px;"
                  size="mini"
                  clearable
                  v-model="queryList.pay_status">
              <el-option
                      v-for="item in enums.pay_status"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
          </el-select>
        <el-select
                placeholder="收票情况"
                style="margin:0px 10px 0px 0px;"
                size="mini"
                clearable
                v-model="queryList.status">
          <el-option
                  v-for="item in invoice_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:10px;" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
      </div>
    </div>
      <div class="d2-mt-5 d2-text-right d2-mb-5">当前选中合同{{number}}条,合同总金额：￥{{selected_money}}</div>
    <!-- 页面 -->
      <u-table
              ref="plTable"
              :height="height"
              row-key="id"
              use-virtual
              :row-height="rowHeight"
              border>
     <!-- <el-table-column label="打包编号" width="120px;">
        <template slot-scope="scope">{{scope.row.package_no}}</template>
      </el-table-column> -->
      <u-table-column label="合同编号" width="140">
        <template slot-scope="scope">{{scope.row.procurement_contract_number}}</template>
      </u-table-column>
      <u-table-column label="合同时间" width="110">
        <template slot-scope="scope">{{scope.row.contract_contract_date}}</template>
      </u-table-column>
      <u-table-column label="供应商" width="250">
        <template slot-scope="scope">{{scope.row.supplier_name}}</template>
      </u-table-column>
      <u-table-column label="CAS"  width="140">
        <template slot-scope="scope">{{scope.row.cas}}</template>
      </u-table-column>
      <u-table-column label="产品名称" width="350">
        <template slot-scope="scope">
          <div>{{scope.row.name_cn}}</div>
          <!-- <div>{{scope.row.name}}</div> -->
        </template>
      </u-table-column>
      <u-table-column label="合同金额" width="120">
        <template slot-scope="scope">
          {{getEnumValue(Currency,scope.row.currency_id,'icon')}}
          {{scope.row.total_price}}
        </template>
      </u-table-column>
      <u-table-column label="发票类型">
        <template slot-scope="scope">
          {{getEnumValue(InvoiceInfo,scope.row.invoice_type_id)}}
        </template>
      </u-table-column>
      <u-table-column label="采购人员" >
        <template slot-scope="scope">
          {{scope.row?scope.row.purchase_name:''}}
        </template>
      </u-table-column>
      <u-table-column label="扫票状态" width="100">
        <template slot-scope="scope">
          <div class="d2-text-center" v-if="scope.row.saopiao_status=='0'">未扫票</div>
          <div class="d2-text-center" style="background-color:#FFC0CB;" v-if="scope.row.saopiao_status==1">已扫票</div>
        </template>
      </u-table-column>
        <u-table-column label="付款状态" width="100">
            <template slot-scope="scope">
                <div class="d2-text-center" v-if="scope.row.pay_result==5" style="background-color: rgb(255, 193, 7);">已申请<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
                <div class="d2-text-center" v-if="scope.row.pay_result==1" style="background-color: #FFF0DD;">部分付款<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
                <div class="d2-text-center" v-if="scope.row.pay_result==2" style="background-color: #FFC0CB;">付款完成<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
                <div class="d2-text-center" v-if="scope.row.pay_result==3" style="background-color: #F5DEB3;">超额付款<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
                <div class="d2-text-center" v-if="scope.row.pay_result==0||scope.row.pay_result==6">未申请</div>
            </template>
        </u-table-column>
      <u-table-column label="收票状态" width="100">
        <template slot-scope="scope">
          <!-- <div class="d2-text-center" v-if="scope.row.invoice_total==null||scope.row.invoice_total==''||scope.row.invoice_total==0&&scope.row.total_price!=0">未收票</div>
          <div v-else>
          <div class="d2-text-center" style="background-color:#FFF0DD;" v-if="scope.row.invoice_total!=null&&scope.row.invoice_total!=''&&scope.row.invoice_total!=0&&Number(scope.row.invoice_total)<Number(scope.row.total_price)">部分收票</div>
          <div class="d2-text-center" style="background-color:#FFC0CB;" v-if="Number(scope.row.invoice_total)==Number(scope.row.total_price)">全额收票</div>
          <div class="d2-text-center" style="background-color:#F5DEB3;" v-if="Number(scope.row.invoice_total)>Number(scope.row.total_price)">超额收票</div>
          <div class="d2-text-center" style="background-color:#F5DEB3;" v-if="scope.row.pending_flag==1">收票待审核</div>
          <div class="d2-text-center" style="background-color:#F5DEB3;" v-if="scope.row.failure_flag==1">收票审核驳回</div>
          </div> -->
          <div class="d2-text-center" v-if='scope.row.invoice_status==0'>{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
          <div class="d2-text-center" style="background-color:#FFF0DD;" v-if='scope.row.invoice_status==1'>{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
          <div class="d2-text-center" style="background-color:#FFC0CB;" v-if='scope.row.invoice_status==2'>{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
          <div class="d2-text-center" style="background-color:#F5DEB3;" v-if='scope.row.invoice_status==3'>{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
          <div class="d2-text-center" v-if='scope.row.invoice_status==4'>{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
        </template>
      </u-table-column>
      <u-table-column label="收票余额">
        <template slot-scope="scope">
          <span v-if="scope.row.view_invoice">{{scope.row.total_price-scope.row.view_invoice.total}}</span>
          <span slot-scope="scope" v-else>
            {{scope.row.total_price}}
          </span>
        </template>
      </u-table-column>
        <u-table-column label="甲方" width="200px;">
         <template slot-scope="scope">{{scope.row.corp_name}}</template>
        </u-table-column>
      <u-table-column label="操作"  fixed="right">
        <template slot="header" slot-scope="scope">
          <el-checkbox v-model="checked_all" @change="select_all"></el-checkbox>
          <span @click="AllCheck()" v-if="permissions.indexOf(491)>-1" style="color:#409EFF;cursor: pointer;padding-left: 10px;">打包</span>
        </template>

        <template slot-scope="scope">
            <!--invoice_status 发票状态：0未收票，1部分收票，2全部收票，3超额收票,4不含税-->

            <!--0未付款,1部分付款,2付款完成,3超额付款,5已申请，未付款,6未申请，未付款-->
            <!--0未扫票，1已扫票-->
            <!--0未打包，1已打包-->




          <div v-if='!(scope.row.total_price==0 || scope.row.package_status==1 ||(scope.row.saopiao_status==1 && (scope.row.pay_result==1||scope.row.pay_result==2||scope.row.pay_result==3||scope.row.pay_result==5)))'>

          <el-checkbox
            v-model="scope.row.checked"
            @change="checkChange(scope.row)"
            style="margin-right:10px;"
          ></el-checkbox>
          </div>
            <div v-else>
                <el-tooltip class="item" effect="dark" content="该合同有付款记录或扫票记录！" placement="top-start">
                   <div style="width:60px;height:30px;">  </div>
                </el-tooltip>
            </div>
          <span @click="detail(scope.row.package_no)" style='cursor:pointer;'>{{scope.row.package_no}}</span>
        </template>
      </u-table-column>
    </u-table>

    <!-- 提示 -->
    <el-dialog :visible.sync="dialogTip" title="提示" width="30%">
      <span>请先选择需要开票的订单</span>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="dialogTip = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogTip2" title="提示" width="30%">
      <span v-html="title"></span>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="dialogTip2 = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
      background
      :page-sizes="[10,500,1000,1500]"
      :page-size="queryList.per_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="sizes, prev, pager, next"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import request from "@/plugin/axios";
import Big from "@/big/a/big.mjs";
import { contract_detail_lists,package_create } from "@/api/procure";
import { listTotal } from "@/api/prod";
export default {
    name:"procure-package",
  data() {
    return {
      permissions :JSON.parse(localStorage.getItem('permissions')),
      list: {},
      check: [],
      checked_all:false,
      dialogAdd: false,
      dialog_Add: false,
      dialogTip: false,
      dialogTip2: false,
      results: [],
      supplier: "",
      currentPage: 1,
      queryList: {
        page: "1",
        per_page:500,
        supplier_id: "",
        contract_number: "",
        cas: "",
        purchase_user_id: "",
        status: "",
        storage_status:'',
        pay_status:''
      },
      Add_invoice: {
        invoice_date: "",
        invoice_receiver_date: "",
        invoice_number: "",
        note: "",
        tax:'',
        total_money: "",
        invoice_type: "",
        detail: []
      },
      detailList: {
        cas: "",
        procurement_contract_detail_id: "",
        procurement_contract_id: "",
        supplier_name: "",
        name: "",
        name_cn: "",
        quantity: "",
        quantity_unit: "",
        price: 0,
        amount: "",
        tax: 0,
        tax_amount: 0,
        total: ""
      },
      Currency: [],
      units:[],
      storage_status:[],
      Invoicetype: [],
      InvoiceInfo: [],
      invoice_status: [],
      saopiao_status: [],
      purchaseList: [],
      loading_search:false,
      loading_down:false,
      enums:{},
      file_url:'',
      taxs:['0','0.03','0.06','0.13'],
      package:[],
      selected_money:0,
      number:0,
      title:'',
      height: 0,
      rowHeight: 0,
    };
  },
  created() {
    if(this.$route.query.queryList){
        this.queryList=JSON.parse(this.$route.query.queryList)
        this.supplier=this.$route.query.supplier
    }
    this.fetchData();
  },
    mounted () {
        this.height = window.innerHeight-210
        this.rowHeight=this.height/10
    },
    watch: {
        $route(to,from) {
            if(to.name=='procure-package'){
                if(this.$route.query.queryList){
                    this.queryList=JSON.parse(this.$route.query.queryList)
                    this.supplier=this.$route.query.supplier
                }
                this.fetchData();
            }
        }
    },
  methods: {
    fetchData() {
        this.title='';
      contract_detail_lists(this.queryList).then(res => {
          this.package=[]
          this.selected_money=0
          this.number=0
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
          // res.data.data=[{additional_cost: "0.0000",
          //     batchno: null,
          //     brand_id: null,
          //     cas: "12024-14-5",
          //     checked_items: [],
          //     checked_requirement: null,
          //     chemical_appearance: null,
          //     chemical_appearance_id: null,
          //     confirm_stock: 2,
          //     confirm_stock_at: null,
          //     confirm_stock_user_id: null,
          //     contract_contract_date: "2021-01-20",
          //     contract_number: null,
          //     corp_name: "南京艾康生物科技有限公司",
          //     created_at: "2021-01-20 14:03:03",
          //     currency_id: 2,
          //     danger: null,
          //     delivery_date: null,
          //     id: 230655,
          //     if_declare: 0,
          //     if_need_check: 2,
          //     inquiry_id: null,
          //     invoice_status: 0,
          //     invoice_type_id: 1,
          //     invoice_yue: "62.4000",
          //     is_flag: 0,
          //     is_old: 0,
          //     is_stock: 1,
          //     label_requirement: null,
          //     name: "Gallium(II) telluride",
          //     name_cn: "碲化镓(II)",
          //     note: null,
          //     note_sync: null,
          //     notice_id: null,
          //     package: null,
          //     package_no: null,
          //     package_requirement: null,
          //     package_status: 0,
          //     packing_requirement: null,
          //     pay_result: 5,
          //     price: "62.40",
          //     procurement_contract_id: 238031,
          //     procurement_contract_number: "AZF2021-238605",
          //     procurement_contract_number_p: "AZF2021-238605",
          //     procurement_total_money: "62.40",
          //     prod_id: 79679,
          //     prod_no: null,
          //     product_file: [],
          //     production_date: null,
          //     purchase_name: "唐年华",
          //     purchase_requirement: null,
          //     purchase_user_id: 35,
          //     purity: "99.9%",
          //     quantity: "1",
          //     quantity_unit: "1",
          //     required_delivery_date: null,
          //     saler_contract_id: null,
          //     saopiao_status: 0,
          //     settled_at: null,
          //     settled_note: null,
          //     settled_status: null,
          //     sku_no: null,
          //     status: 1,
          //     storage_quantity: "0.000000000000",
          //     storage_quantity_unit: null,
          //     storage_status: 0,
          //     storagecondition: null,
          //     supplier_id: 44156,
          //     supplier_name: "萨恩化学技术（上海）有限公司",
          //     supplier_order_no: null,
          //     total_price: "62.40",
          //     trancondition: null,
          //     updated_at: "2021-01-20 14:39:13"}]
        res.data.data.forEach((items,index)=>{
          items.checked=false
        })
        this.list = res.data;
        this.$refs.plTable.reloadData(res.data.data)
        this.checked_all = false
        obj(this.Currency, res.enum.Currency);
        obj(this.Invoicetype, res.enum.Invoicetype);
        obj(this.InvoiceInfo, res.enum.InvoiceInfo);
        this.units=res.enum.units;
        this.storage_status=res.enum.storage_status;
        this.invoice_status = res.enum.invoice_status;
        this.saopiao_status = res.enum.saopiao_status;
        this.enums=res.enum
        this.Add_invoice.invoice_receiver_date=this.getDate()
      });
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
    },
      close_contract_number(){
      this.queryList.contract_number=''
    },
    detail(package_no){
         this.$router.push({
          path: "/invoice/package_list.vue",
          name: "procure-package_list",
          query: {
            package_no:package_no
          }
      });
    },
      tax(){
          this.detailList.amount=(new Big(this.detailList.total).div(new Big(this.detailList.tax).plus(1))).toFixed(2)
          this.detailList.tax_amount=(new Big(this.detailList.amount).times(this.detailList.tax)).toFixed(2)
      },
      changeTotal(){
          this.tax();
      },
      tax_amount(){
          this.detailList.amount=(new Big(this.detailList.total).minus(this.detailList.tax_amount)).toFixed(2)
      },
      handleSizeChange(val) {
          this.queryList.per_page=val
          this.fetchData();
      },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        listTotal("data/member_list?type=2&name=" + queryString).then(res => {
          this.results = res.data;
          this.results = JSON.parse(
            JSON.stringify(this.results).replace(/name/g, "value")
          );
          // 调用 callback 返回建议列表的数据
          cb(this.results);
        });
      }
    },
    handleSelect() {
      this.queryList.supplier_id = this.results.filter(item => {
        return item.value == this.supplier;
      })[0].id;
    },
    Search() {
        this.loading_search=true
        this.queryList.page = 1;
        this.currentPage=1
        this.fetchData();
    },
    changeMoney() {
      this.detailList.amount = parseFloat(this.detailList.price) * parseFloat(this.detailList.quantity);
      this.detailList.total = this.detailList.amount;
      this.tax();
    },
    select_all(){
        if(this.checked_all){
          // this.package=JSON.parse(JSON.stringify(this.list.data))
          this.list.data.forEach((items,index)=>{
            if(!(items.total_price==0 || items.package_status==1 ||(items.saopiao_status==1 && (items.pay_result==1||items.pay_result==2||items.pay_result==3||items.pay_result==5)))){
              items.checked=true
               this.package.push(items)
            }
          })
        }else{
          this.list.data.forEach((items,index)=>{
              if(!(items.total_price==0 || items.package_status==1 ||(items.saopiao_status==1 && (items.pay_result==1||items.pay_result==2||items.pay_result==3||items.pay_result==5)))){
                items.checked=false
            }
          })
            this.package=[]
        }
        this.selected_money=0
        this.number=0
        this.package.forEach((m,n)=>{
          this.selected_money=Number(new Big(this.selected_money).plus(m.total_price)).toFixed(2)
          this.number++
        })
    },
    checkChange(item) {
      if(item.checked){
        this.package.push(item)
      }else{
        this.package.forEach((m,n)=>{
          if(m.id==item.id){
            this.package.splice(n,1);
            this.$forceUpdate();
          }
        })
      }
      let money=0
      this.number=0
      this.selected_money=0
      this.package.forEach((m,n)=>{
        this.selected_money+=Number(new Big(money).plus(m.total_price))
        this.number++
      })
      var num = 0
      this.list.data.forEach((items,index)=>{
        if(items.checked){
            num++
        }
      })
      if(num==this.list.data.length){
        this.checked_all = true
      }else{
        this.checked_all = false
      }
    },
    AllCheck() {
      let flag=0;
      this.title='';
      let pay_result0=false;
      let pay_result2=false;
      let pay_result3=false;
      let pay_result6=false;
        if(this.package.length==0){
            this.dialogTip2=false
            this.dialogTip=true
        }
        this.package.forEach((items,index)=>{
            if(items.pay_result==0){
                pay_result0=true
            }else if(items.pay_result==2){
                pay_result2=true
            }else if(items.pay_result==3){
                pay_result3=true
            }else if(items.pay_result==6){
                pay_result6=true
            }
            if(items.pay_result==6){
                items.pay_result=0
            }
        })
      this.package.forEach((items,index)=>{
          if(items.supplier_name!=this.package[0].supplier_name){
              this.title+=items.procurement_contract_number+'供应商须保持一致'+'<br/>'
              this.dialogTip2=true
          }else if(items.corp_name!=this.package[0].corp_name){
              this.title+=items.procurement_contract_number+'甲方须保持一致'+'<br/>'
              this.dialogTip2=true
          }else if(items.invoice_type_id!=this.package[0].invoice_type_id){
              this.title+=items.procurement_contract_number+'发票类型须保持一致'+'<br/>'
              this.dialogTip2=true
          }else if(items.currency_id!=this.package[0].currency_id){
              this.title+=items.procurement_contract_number+'货币单位须保持一致'+'<br/>'
              this.dialogTip2=true
          }else if(items.saopiao_status!=this.package[0].saopiao_status){
              this.title+=items.procurement_contract_number+'扫票状态须保持一致'+'<br/>'
              this.dialogTip2=true
          }else if(items.invoice_status!=this.package[0].invoice_status){
              this.title+=items.procurement_contract_number+'发票状态须保持一致'+'<br/>'
              this.dialogTip2=true
          }else if(items.pay_result!=this.package[0].pay_result){
              this.title+=items.procurement_contract_number+'付款状态须保持一致'+'<br/>'
              this.dialogTip2=true
          }else{
              flag++
          }
      })
        if(((pay_result0||pay_result6)&&(!pay_result2||!pay_result3))||((!pay_result0||!pay_result6)&&(pay_result2||pay_result3))){
            if(this.package.length==flag){
                let ids=[]
                this.package.forEach((m,n)=>{
                    ids.push(m.id)
                })
                var obj={
                    ids:ids,
                    supplier_name:this.package[0].supplier_name,
                    supplier_id:this.package[0].supplier_id,
                    invoice_type_id:this.package[0].invoice_type_id,
                    currency_id:this.package[0].currency_id
                }
                package_create(obj,this)
            }
        }else{
            this.dialogTip2=true
        }
    },
    handle_invoice(item) {
        this.detailList.tax=this.getEnumValue(this.enums.InvoiceInfo,item.invoice_type_id,'rate')
        if(item.invoice_type_id==1||item.invoice_type_id==4){
            this.Add_invoice.invoice_type=1
        }else if(item.invoice_type_id==2){
            this.Add_invoice.invoice_type=4
        }else if(item.invoice_type_id==3){
            this.Add_invoice.invoice_type=3
        }else{
            this.Add_invoice.invoice_type=2
        }
      this.detailList.procurement_contract_id = item.procurement_contract_id;
      this.detailList.procurement_contract_detail_id = item.id;
      this.detailList.supplier_name = item.supplier_name;
      this.detailList.cas = item.cas;
      this.detailList.name = item.name;
      this.detailList.name_cn = item.name_cn;
      this.detailList.quantity = item.quantity;
      this.detailList.quantity_unit = Number(item.quantity_unit);
      this.detailList.price = item.price;
      this.detailList.amount = this.detailList.total = item.total_price;
      this.dialog_Add = true;
      this.tax()
    },
    keep_() {
      this.Add_invoice.detail=[]
      this.Add_invoice.total_money = this.detailList.total;
      this.Add_invoice.detail.push(this.detailList);
      create(this.Add_invoice, "ProcurementContract/Invoice", "create", this);
    },
    keep_all() {
      create(this.Add_invoice, "ProcurementContract/Invoice", "create_all", this);
    },
    close_() {
      this.dialog_Add = false;
      this.Add_invoice.invoice_date = "";
      this.Add_invoice.invoice_receiver_date = "";
      this.Add_invoice.invoice_number = "";
      this.Add_invoice.note = "";
      this.Add_invoice.total_money = "";
      this.Add_invoice.invoice_type = "";
      this.detailList = {
        cas: "",
        procurement_contract_detail_id: "",
        procurement_contract_id: "",
        supplier_name: "",
        name: "",
        name_cn: "",
        quantity: "",
        quantity_unit: "",
        price: "",
        amount: "",
        tax: 0,
        tax_amount: 0,
        total: "",
        currency_id: ""
      };
    },
    close() {
      this.dialogAdd = false;
      this.Add_invoice.invoice_date = "";
      this.Add_invoice.invoice_receiver_date = "";
      this.Add_invoice.invoice_number = "";
      this.Add_invoice.note = "";
      this.Add_invoice.total_money = "";
      this.Add_invoice.invoice_type = "";
    },
    handle_detail(id) {
      // listTotal("ProcurementContract/Invoice/generate?id=" + id).then(res => {
      //   this.$router.push({
      //     path: "/agree/collection.vue",
      //     name: "procure-collection",
      //     query: {
      //       ids: res.data,
      //       enum: res.enum
      //     }
      //   });
      // });
      this.$router.push({
          path: "/agree/collection.vue",
          name: "procure-collection",
          query: {
            item_id:id
          }
      });
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
function create(datas, type, method_type, that) {
  datas.loading = true;
  let data = JSON.parse(JSON.stringify(datas));
  delete data.loading;
  request({
    url: "api/v1/" + type + "/" + method_type,
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
        that.dialog_Add = false;
        that.dialogAdd = false;
        that.detailList = {
          cas: "",
          procurement_contract_detail_id: "",
          procurement_contract_id: "",
          supplier_name: "",
          name: "",
          name_cn: "",
          quantity: "",
          quantity_unit: "",
          price: "",
          amount: "",
          tax: 0,
          tax_amount: 0,
          total: ""
        };
        that.Add_invoice.invoice_date = "";
        that.Add_invoice.invoice_receiver_date = "";
        that.Add_invoice.invoice_number = "";
        that.Add_invoice.note = "";
        that.Add_invoice.total_money = "";
        that.Add_invoice.invoice_type = "";
        that.fetchData();
      } else {
        that.$message({
          message: res.msg,
          type: "error"
        });
      }
    })
    .catch(rr => {
      datas.loading = false;
    });
}
</script>
