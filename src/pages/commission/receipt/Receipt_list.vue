<template>
  <d2-container>
    <div class="heard">
      <el-row justify="start">
        <el-col :span="24" class="d2-text-right">
          <el-input
            size="mini"
            style="width: 120px;"
            v-model="queryList.contract_number"
            placeholder="销售合同号"
          ></el-input>
          <el-select
            size="mini"
            v-model="queryList.sale_id"
            :placeholder="$t('sale.index.sale9')"
            style="width:100px;margin-left:5px;"
            clearable
          >
            <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <!-- <el-select v-model="queryList.purchase_id"  placeholder="采购人员" size="mini" clearable style="width:100px;margin-left:5px;">
            <el-option
                    v-for="item in Purchases"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            ></el-option>
          </el-select> -->
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.settled_start_month"
            value-format="yyyyMMdd"
            format="yyyyMMdd"
            type="date"
            placeholder="结算开始"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.settled_end_month"
            value-format="yyyyMMdd"
            format="yyyyMMdd"
            type="date"
            placeholder="结算结束"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.contract_start_date"
            value-format="yyyy-MM-dd"
            format="yyyyMMdd"
            type="date"
            placeholder="合同开始"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.contract_end_date"
            value-format="yyyy-MM-dd"
            format="yyyyMMdd"
            type="date"
            placeholder="合同结束"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.receipt_start_data"
            value-format="yyyy-MM-dd"
            format="yyyyMMdd"
            type="date"
            placeholder="收款开始"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.receipt_end_data"
            value-format="yyyy-MM-dd"
            format="yyyyMMdd"
            type="date"
            placeholder="收款结束"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <el-input
            size="mini"
            style="width: 120px;"
            clearable
            class="d2-ml-5"
            v-model="queryList.invoice_number"
            placeholder="发票号码"
          ></el-input>
          <el-input
            size="mini"
            style="width: 120px;"
            clearable
            class="d2-ml-5"
            v-model="queryList.invoice_no"
            placeholder="invoice No"
          ></el-input>
          <el-select
            v-model="queryList.invoice_status"
            multiple
            clearable
            size="mini"
            style="width: 110px;"
            placeholder="开票情况"
          >
            <el-option
              v-for="item in enums.invoice_status_info"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.receipt_status"
            multiple
            clearable
            size="mini"
            style="width: 110px;"
            class="d2-ml-5"
            placeholder="收款状态"
          >
            <el-option
              v-for="item in enums.receipt_status_info"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.settle_completed"
            clearable
            size="mini"
            style="width: 110px;"
            class="d2-ml-5"
            placeholder="结算状态"
          >
            <el-option
              v-for="item in enums.settle_completed_status"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.status"
            multiple
            clearable
            size="mini"
            style="width: 110px;"
            class="d2-ml-5"
            placeholder="审核状态"
          >
            <el-option
              v-for="item in enums.status_info"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.customer_id"
            filterable
            remote
            reserve-keyword
            :remote-method="supplyMethod"
            :loading="supplyloading"
            :placeholder="queryList.customer_id&&transactionpipe_ids&&$route.query.name?$route.query.name:'客户'"
            style="width:160px;margin-top:5px;margin-left:5px;"
            size="mini"
            clearable
          >
            <el-option v-for="item in supply_list" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6;">{{ item.country_code }}</span>
            </el-option>
          </el-select>
          <el-select
            v-model="queryList.delivery_status"
            multiple
            clearable
            size="mini"
            style="width: 110px;"
            class="d2-ml-5"
            placeholder="发货状态"
          >
            <el-option
              v-for="item in enums.settle_delivery_status"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.settle_instore_status"
            multiple
            clearable
            size="mini"
            style="width: 120px;"
            class="d2-ml-5"
            placeholder="入库状态"
          >
            <el-option
              v-for="item in enums.settle_instore_status"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.settle_express_status"
            clearable
            size="mini"
            style="width: 130px;"
            class="d2-ml-5"
            placeholder="运单完整状态"
          >
            <el-option
              v-for="item in enums.settle_express_status"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.settle_buy_invoice_status"
            clearable
            multiple
            size="mini"
            style="width: 130px;"
            class="d2-ml-5"
            placeholder="采购收票状态"
          >
            <el-option
              v-for="item in enums.settle_buy_invoice_status"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.settle_buy_pay_status"
            clearable
            multiple
            size="mini"
            style="width: 130px;"
            class="d2-ml-5"
            placeholder="采购付款状态"
          >
            <el-option
              v-for="item in enums.settle_buy_pay_status"
              :key="item.id"
              :label="item.name_cn"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
                  size="mini"
                  v-model="queryList.quality_dispute"
                  placeholder="有无质量争议"
                  style="width:130px;margin-left:5px;"
                  clearable
          >
            <el-option v-for="item in enums.quality_dispute" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select
                  size="mini"
                  multiple
                  v-model="queryList.finish_status"
                  placeholder="结束状态"
                  style="width:150px;margin-left:5px;margin-top:5px;"
                  clearable
          >
            <el-option v-for="item in enums.finish_status" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          
          <el-button
                  class="d2-ml-5"
                  size="mini"
                  type="primary"
                  @click="search"
                  :loading="loading_search"
          >{{$t('search')}}</el-button>
          <el-button
                  class="d2-ml-5"
                  size="mini"
                  type="primary"
                  :loading="loading_e"
                  @click="doExport"
                  v-if="permission_names['receipt.export']=='receipt.export'"
          >导出</el-button>
          <a :href="prod_export_url" ref="prod_export_url" hidden></a>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="d2-mt-10"
      style="width: 100%;"
    >
      <el-table-column align="center" label="ID" width="70px;">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column align="center" label="合同时间" width="85px;">
        <template slot-scope="scope">{{attr(scope.row.saler_contract,'contract_date')}}</template>
      </el-table-column>
      <el-table-column align="center" label="合同号" width="120px;">
        <template slot-scope="scope">
          {{scope.row.contract_number}}<br>
          <span v-if="scope.row.saler_contract.quality_dispute" style="color:red;">
            ({{getEnumValue(enums.quality_dispute,scope.row.saler_contract.quality_dispute)}})<br>
          </span>
          <span v-if="scope.row.saler_contract.finish_status" style="color:red;">
            ({{getEnumValue(enums.finish_status,scope.row.saler_contract.finish_status)}})
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="客户名称" width="200px">
        <!-- <template slot-scope="scope">{{scope.row.saler_contract.customer_name}}</template> -->
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.customer_name')}}</template>
      </el-table-column>
      <el-table-column align="center" label="销售" width="60px;">
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.sale.name')}}</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="采购" width="60px;">
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.sale.name')}}</template>
      </el-table-column> -->
      <el-table-column align="center" label="应收" width="70px;">
        <template
          slot-scope="scope"
        >{{scope.row.total_money?(scope.row.total_money+getEnumValue(Currency,scope.row.currency_id,'icon')):''}}</template>
      </el-table-column>
      <el-table-column align="center" label="已收" width="70px;">
        <template
          slot-scope="scope"
        >{{scope.row.view_receipt?((scope.row.view_receipt.checkin?scope.row.view_receipt.checkin:0)+getEnumValue(Currency,scope.row.currency_id,'icon')):''}}</template>
      </el-table-column>
      <el-table-column align="center" label="待收" width="70px;">
        <template
          slot-scope="scope"
        >{{scope.row.view_receipt?((scope.row.view_receipt.uncheckin?scope.row.view_receipt.uncheckin:0)+getEnumValue(Currency,scope.row.currency_id,'icon')):''}}</template>
      </el-table-column>
      <el-table-column align="center" label="手续费" width="60px;">
        <template
          slot-scope="scope"
        >{{scope.row.view_receipt?(scope.row.view_receipt.bank_fee?scope.row.view_receipt.bank_fee:0)+getEnumValue(Currency,scope.row.currency_id,'icon'):''}}</template>
      </el-table-column>
      <el-table-column align="center" label="佣金" width="60px;">
        <template
          slot-scope="scope"
        >{{scope.row.view_receipt?(scope.row.view_receipt.commission_fee?scope.row.view_receipt.commission_fee:0)+"¥":''}}</template>
      </el-table-column>
      <el-table-column align="center" label="运费" width="60px;">
        <template
          slot-scope="scope"
        >{{scope.row.view_receipt?(scope.row.view_receipt.transport_fee?scope.row.view_receipt.transport_fee:0)+"¥":''}}</template>
      </el-table-column>
      <el-table-column align="center" label="其他" width="60px;">
        <template
          slot-scope="scope"
        >{{scope.row.view_receipt?(scope.row.view_receipt.other_fee?scope.row.view_receipt.other_fee:0)+"¥":''}}</template>
      </el-table-column>
      <el-table-column align="center" label="发货" width="70px;">
        <template
          slot-scope="scope"
        >{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</template>
      </el-table-column>
      <el-table-column align="center" label="开票" width="70px;">
        <template slot-scope="scope">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</template>
      </el-table-column>
      <el-table-column align="center" label="收款" width="70px;">
        <template slot-scope="scope">{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</template>
      </el-table-column>
      <el-table-column align="center" label="审核" width="70px;">
        <template slot-scope="scope">{{getEnumValue(enums.status_info,scope.row.status)}}</template>
      </el-table-column>
      <el-table-column align="center" label="核算月份" width="70px;">
        <template slot-scope="scope">{{scope.row.settled_month}}</template>
      </el-table-column>
      <el-table-column align="center" label="确认人员" width="70px;">
        <template slot-scope="scope">{{scope.row.sellted_user?scope.row.sellted_user.name:''}}</template>
      </el-table-column>
      <el-table-column align="left" fixed="right" width="240px;">
        <template slot="header" slot-scope="scope">
          <el-checkbox v-model="checked_all" @change="select_all" style="margin: 0px;"></el-checkbox>
          <el-button type="primary" @click="settling()" class="d2-ml-5" size="mini" v-if="permissions.indexOf(544)>-1">结算</el-button>
          <el-button type="primary" class="d2-ml-5" size="mini" @click="more" v-if="permissions.indexOf(569)>-1">收款</el-button>
          <el-button type="primary" class="d2-ml-5" size="mini" @click="more_w" v-if="permissions.indexOf(569)>-1">往来账收款</el-button>
          <!--<el-button type="primary" @click="cancel_more()"  size="mini" class="d2-ml-5">作废</el-button>-->
        </template>
        <template slot-scope="scope">
          <div style="display: flex;align-items: center;">
            <el-checkbox
              v-model="scope.row.checked"
              @change="select_one(scope.row.checked,scope.row.id)"
              style="margin: 0px;"
            ></el-checkbox>
            <div>
              <div style="margin:2px 0px;">
                <el-button
                  v-if="scope.row.settling_show===2&&permissions.indexOf(544)>-1"
                  type="primary"
                  @click="settling_one(scope.row.id)"
                  class="d2-ml-5"
                  size="mini"
                >结算</el-button>
                <el-button
                  type="primary"
                  @click="receipt(scope.row.id)"
                  class="d2-ml-5"
                  size="mini"
                  v-if="permissions.indexOf(569)>-1"
                >收款</el-button>
                <el-button
                  type="primary"
                  @click="receipt_w(scope.row.id)"
                  class="d2-ml-5"
                  size="mini"
                  v-if="permissions.indexOf(569)>-1&&scope.row.show_currentaccounts"
                >往来账收款</el-button>
              </div>
              <div style="margin:2px 0px;">
                <el-button
                  type="danger"
                  v-if="scope.row.settling_show===0&&permission_names['receipt.cancle_settle']=='receipt.cancle_settle'"
                  @click="reson(scope.row.id)"
                  class="d2-ml-5"
                  size="mini"
                >取消结算</el-button>
                <el-button
                  type="info"
                  v-if="scope.row.view_receipt&&permissions.indexOf(565)>-1"
                  @click="cancel_f(scope.row.id)"
                  size="mini"
                  style="margin-left:5px;"
                >取消收款</el-button>
              </div>
              <div style="margin:2px 0px;">
                <el-button
                    type="primary"
                    v-if="user_id==1"
                    @click="RecieptStatus(scope.row.contract_number)"
                    class="d2-ml-5"
                    size="mini"
                  >更新收款状态</el-button>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 取消理由 -->
    <el-dialog :visible.sync="resonDialog" width="30%" @close="close_reson()">
      <div style="text-align:left;display:flex;align-items: center;">
        <span>取消理由:</span>
        <el-input type="textarea" size="mini" v-model="reson_obj.cancle_reason" style="width:75%;margin-left:10px"></el-input>
      </div>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="cancle()">确定</el-button>
        <el-button size="mini" @click="close_reson()">取消</el-button>
      </div>
    </el-dialog>

    <!-- 取消收款 -->
    <el-dialog :visible.sync="cancel_f_Dialog" width="30%">
      <div style="text-align:left;display:flex;align-items: center;">
        <span>取消理由:</span>
        <el-input type="textarea" size="mini" v-model="cancle_f_form.cancle_note" style="width:75%;margin-left:10px"></el-input>
      </div>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="cancle_f_sure()">确定</el-button>
        <el-button size="mini" @click="cancel_f_Dialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total,sizes,prev, pager, next"
      :page-sizes="[10,30,50,100,150,200,300,400,500]"
      :page-size="10"
      @size-change="handleSizeChange"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>

<script>
import Big from "@/big/a/big.mjs";
import util from "@/libs/util";
import { mapActions } from "vuex";
import { listTotal, destroy, destroy_more } from "@/api/prod";
import { fixRecieptStatus,transactionpipe_detail } from "@/api/commission";
import {
  saler_receipt_list,
  customer_lists,
  select,
  export_file,
  settling,
  cancle_settle,
  receipt_export,
  cancle_f
} from "@/api/sale";
export default {
  name: "commission-Receipt_list",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      loading_search: false,
      cancel_f_Dialog:false,
      currentPage: 1,
      enums: {},
      reson_obj:{},
      cancle_f_form:{},
      transactionpipe_ids:[],
      queryList: {
        page: "1",
        per_page: "10",
        contract_number: "",
        settled_end_month: "",
        settled_start_month: "",
        contract_start_date: "",
        contract_end_date: "",
        receipt_start_data: "",
        receipt_end_data: "",
        sale_id: '',
        customer_id: "",
        receipt_status: [],
        invoice_status: [],
        status: [],
        // trade_type: '',
        invoice_number: "",
        delivery_status:[],
        settle_instore_status:[],
        settle_express_status:'',
        settle_buy_invoice_status:[],
        settle_buy_pay_status:[],
        settle_completed:'',
        finish_status:[],
        quality_dispute:'',
        invoice_no:''
      },
      resonDialog:false,
      supplyloading: false,
      loading_e:false,
      prod_export_url:'',
      supply_list: [],
      list: [],
      Currency: [],
      delivery_status_info: [],
      invoice_status_info: [],
      receipt_status_info: [],
      status_info: [],
      trade_type: [],
      customer: [],
      loading: false,
      ids: [],
      salesList:[],
      Purchases:[],
      checked_all: false,
      export_file_loading: false,
      user_id:''
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "commission-Receipt_list") {
        if(this.$route.query.id_list){
          this.transactionpipe_ids = this.$route.query.transactionpipe_id?JSON.parse(this.$route.query.transactionpipe_id):''
          this.fetchData();
        }
        if(from.name=='commission-subscription'){
          this.supply_list = []
          this.queryList.customer_id = ''
          if(this.$route.query.is_click){
            this.queryList.receipt_status = [1,2]
            this.queryList.status = [1]
          }
          listTotal("data/member_list?type=1&name=" + this.$route.query.name).then(res => {
            if(res.data.length>0&&this.$route.query.name){
              this.supply_list = res.data;
              if(this.$route.query.member_id){
                this.queryList.customer_id = this.$route.query.member_id
              }else{
                if(res.data.filter(i=>{return i.name===this.$route.query.name})[0]){
                  this.queryList.customer_id = parseInt(res.data.filter(i=>{return i.name==this.$route.query.name})[0].id)
                }
              }
            }
            this.fetchData()
            this.transactionpipe_ids = JSON.parse(this.$route.query.transactionpipe_id)
          });
        }
      }
    }
  },
  created() {
    this.user_id=Number(util.cookies.get('user_id')) 
    if(util.cookies.get('user_type')==102){
      this.queryList.sale_id = Number(util.cookies.get('user_id'))
    }
    this.$route.query.id_list = ''
    if(this.$route.query.transactionpipe_id){
      if(this.$route.query.is_click){
        this.queryList.receipt_status = [1,2]
        this.queryList.status = [1]
      }
      listTotal("data/member_list?type=1&name=" + this.$route.query.name).then(res => {
        if(res.data.length>0&&this.$route.query.name){
          this.supply_list = res.data;
          if(this.$route.query.member_id){
                this.queryList.customer_id = this.$route.query.member_id
          }else{
            if(res.data.filter(i=>{return i.name===this.$route.query.name})[0]){
              this.queryList.customer_id = parseInt(res.data.filter(i=>{return i.name==this.$route.query.name})[0].id)
            }
          }
        }
        this.transactionpipe_ids = JSON.parse(this.$route.query.transactionpipe_id)
        this.fetchData();
      });
    }else{
      this.transactionpipe_ids = ''
      this.queryList.customer_id = ''
      this.$route.query.name=''
      this.supply_list = []
      // this.$route.query.payment=''
      // this.$route.query.account_id=''
      this.fetchData();
    }
    var lett = this;
            document.onkeydown = function(e) {
              var key = window.event.keyCode;
              if (key == 13) {
                lett.search()
              }
            }
  },
  methods: {
    cancel_f(id) {
      // destroy(item, "receipt", "cancel", this);
      this.cancle_f_form = {
        saler_contract_detail_ids:[id],
        cancle_note:''
      }
      this.cancel_f_Dialog = true
    },
    cancle_f_sure(){
      cancle_f(this.cancle_f_form,"receipt", "cancel", this)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.fetchData()
            this.cancel_f_Dialog = false
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    cancel_more(item) {
        destroy_more( this.ids, "receipt", "cancel", this);
    },
    reson(id){
      this.reson_obj = {
        ids:[id],
        cancle_reason:''
      }
      this.resonDialog = true
    },
    close_reson(){
      this.reson_obj = {}
      this.resonDialog = false
    },
    export_file() {
      var obj = this.queryList;
      delete obj.page;
      export_file(obj, this);
    },
    handleSizeChange(val) {
      this.queryList.per_page = val;
      this.fetchData();
    },
    supplyMethod(query) {
      this.supply_list = [];
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=1&name=" + query).then(res => {
            this.supply_list = res.data;
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData() {
      var queryList = JSON.parse(JSON.stringify(this.queryList)) 
      if(queryList.delivery_status.length==0){
        delete queryList.delivery_status
      }
      if(queryList.settle_instore_status.length==0){
        delete queryList.settle_instore_status
      }
      if(!queryList.settle_express_status&&queryList.settle_express_status!==0){
        delete queryList.settle_express_status
      }
      if(queryList.settle_buy_invoice_status.length==0){
        delete queryList.settle_buy_invoice_status
      }
      if(queryList.settle_buy_pay_status.length==0){
        delete queryList.settle_buy_pay_status
      }
      if(!queryList.settle_completed){
        delete queryList.settle_completed
      }
      if(this.transactionpipe_ids){
        queryList.account_id = this.$route.query.account_id
      }
      saler_receipt_list(queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.loading_search = false;
        }
        var arr = [10,12,14,16,18,19,20,21,22,23,24,25]
        if(res.data.data.length==0&&this.$route.query.account_id&&arr.filter(i=>{return i==this.$route.query.account_id}).length!=0){
          this.$route.query.account_id = ''
          this.$route.query.name = ''
          this.queryList.customer_id = ''
          this.$router.push({
            path: "/commission/subscription",
            name: "commission-subscription"
          });
          this.$message({
            message: "没有搜索到该账户",
            type: "error"
          });
          var tagName = "commission-Receipt_list";
          this.closeAdd({ tagName });
        }else{
          var id_list = []
          if(this.$route.query.id_list){
            id_list = this.$route.query.id_list
          }
          res.data.data.forEach((items, index) => {
            items.checked = this.checked_all;
            if(id_list.indexOf(items.id)>-1){
              items.checked = true
            }
            items.uncheckin = Number(
              new Big(items.total_money).minus(items.checkin ? items.checkin : 0)
            );
            if (items.settled_month) {
              items.settling_show = 0;
            } else {
              items.settling_show = 2;
            }

            items.show_currentaccounts=false;
            if(items.view_currentaccounts instanceof Array){
              if(items.view_currentaccounts.length>0){
                  items.view_currentaccounts.forEach((item,index)=>{
                      if(Number(item.amount)>0){
                          items.show_currentaccounts=true
                      }
                  })
              }
            }else{
              for(var key in items.view_currentaccounts){
                if(Number(items.view_currentaccounts[key].amount)>0){
                  items.show_currentaccounts=true
                }
              }
            }
            
          });
          this.list = res.data;
          this.enums = res.enum;
          this.salesList = this.GEnums.Sales
          this.Purchases = this.GEnums.Purchases
          this.$route.query.id_list = ''
          this.loading_e = false
        }
        this.$route.query.is_click = false
      });
      this.Currency = this.GEnums.Currency;
      
    },
    doExport(){
      var queryList = JSON.parse(JSON.stringify(this.queryList)) 
      if(queryList.delivery_status.length==0){
        delete queryList.delivery_status
      }
      if(queryList.settle_instore_status.length==0){
        delete queryList.settle_instore_status
      }
      if(!queryList.settle_express_status&&queryList.settle_express_status!==0){
        delete queryList.settle_express_status
      }
      if(queryList.settle_buy_invoice_status.length==0){
        delete queryList.settle_buy_invoice_status
      }
      if(queryList.settle_buy_pay_status.length==0){
        delete queryList.settle_buy_pay_status
      }
      if(!queryList.settle_completed){
        delete queryList.settle_completed
      }
      this.loading_e = true
      receipt_export(queryList).then(res => {
        if (res && res.code === 0) {
          this.prod_export_url = res.data
          setTimeout(() => {
            this.$refs.prod_export_url.click()
            this.loading_e = false
          }, 200)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.loading_e = false
        }
      }).catch(rr => {
        this.loading_e = false
      })
    },
    search() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.checked_all = false
      this.ids = []
      this.fetchData();
    },
    select_all() {
      this.ids = []
      this.list.data.forEach((items, index) => {
        if (this.checked_all) {
          items.checked = true;
          this.ids.push(items.id);
        } else {
          this.ids = [];
          items.checked = false;
        }
      });
    },
    select_one(checked, id) {
      // if (checked) {
      //   this.ids.push(id);
      // } else {
      //   this.ids.forEach((items, index) => {
      //     if (items == id) {
      //       this.ids.splice(index, 1);
      //     }
      //   });
      // }
      this.ids = []
      this.list.data.forEach((items, index) => {
        if (items.checked) {
          this.ids.push(items.id);
        } 
      });
      let num = 0;
      this.list.data.forEach((items, index) => {
        if (items.checked) {
          num++;
        }
      });
      if (num == this.list.data.length) {
        this.ids = [];
        this.checked_all = true;
        this.list.data.forEach((items, index) => {
          this.ids.push(items.id);
        });
      } else {
        this.checked_all = false;
      }
    },
    RecieptStatus(number){
      var obj = {
        id:number
      }
      fixRecieptStatus(obj,this)
    },
    more() {
      let obj = {
        ids: this.ids,
        transactionpipe_id:this.transactionpipe_ids?this.transactionpipe_ids[0]:''
      };
      if(this.transactionpipe_ids){
        obj.account_id = this.$route.query.account_id
      }
      select(obj, this)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            // this.$router.push({
            //   path: "/commission/Receipt",
            //   name: "commission-Receipt",
            //   query: {
            //     ids: JSON.stringify(this.ids),
            //     pl:true
            //   }
            // });
            if(!this.transactionpipe_ids){
              this.$router.push({
                path: "/commission/Receipt_new",
                name: "commission-Receipt_new",
                query: {
                  ids: JSON.stringify(this.ids),
                  pl:true,
                  trade_date:this.$route.query.trade_date,
                  currency:this.$route.query.currency
                }
              });
            }else{
              var arr={
                  id:this.transactionpipe_ids
              }
              transactionpipe_detail(arr).then(i=>{
                this.$router.push({
                  path: "/commission/Receipt_new",
                  name: "commission-Receipt_new",
                  query: {
                    ids: JSON.stringify(this.ids),
                    first_transactionpipe_id:JSON.stringify(this.transactionpipe_ids),
                    transactionpipe_id:i.data.transactionpipe_id?JSON.stringify(i.data.transactionpipe_id):'',
                    pay_out_balance:i.data.pay_out_balance?i.data.pay_out_balance:'',
                    pay_in_balance:i.data.pay_in_balance?i.data.pay_in_balance:'',
                    account_id:i.data.account_id?i.data.account_id:'',
                    trade_date:i.data.trade_date,
                    currency:this.$route.query.currency
                  }
                });
              })
              // this.$router.push({
              //   path: "/commission/Receipt_new",
              //   name: "commission-Receipt_new",
              //   query: {
              //     ids: JSON.stringify(this.ids),
              //     pl:true,
              //     transactionpipe_id:this.transactionpipe_ids?JSON.stringify(this.transactionpipe_ids):'',
              //     pay_out_balance:this.$route.query.pay_out_balance?this.$route.query.pay_out_balance:'',
              //     pay_in_balance:this.$route.query.pay_in_balance?this.$route.query.pay_in_balance:'',
              //     account_id:this.$route.query.account_id?this.$route.query.account_id:'',
              //     trade_date:this.$route.query.trade_date
              //   }
              // });
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    settling_one(id) {
      let obj = {
        ids: [id]
      };
      settling(obj, this)
        .then(res => {
          if (res && res.code == 0) {
            this.list.data.forEach((items, index) => {
              res.data.forEach((m, n) => {
                if (items.id == m.id) {
                  items.settling_show = 0;
                  items.settled_month = m.settled_month;
                  items.sellted_user = m.settled_user;
                }
              });
            });
            this.$message({
              message: "success",
              type: "success"
            });
          } else {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    settling() {
      let obj = {
        ids: this.ids
      };
      settling(obj, this)
        .then(res => {
          if (res && res.code == 0) {
            this.list.data.forEach((items, index) => {
              res.data.forEach((m, n) => {
                if (items.id == m.id) {
                  items.settling_show = 0;
                  items.settled_month = m.settled_month;
                  items.sellted_user = m.settled_user;
                }
              });
            });
            this.$message({
              message: "success",
              type: "success"
            });
          } else {
            this.$message({
              dangerouslyUseHTMLString: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    cancle(id) {
      // let obj = {
      //   ids: [id]
      // };
      cancle_settle(this.reson_obj, this)
        .then(res => {
          if (res && res.code == 0) {
            this.list.data.forEach((items, index) => {
              res.data.forEach((m, n) => {
                if (items.id == m.id) {
                  items.settled_month = "";
                  items.sellted_user = "";
                  items.settling_show = 2;
                }
              });
            });
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.close_reson()
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    receipt(id) {
      let obj = {
        ids: [id],
        transactionpipe_id:this.transactionpipe_ids?this.transactionpipe_ids[0]:''
      };
      if(this.transactionpipe_ids){
        obj.account_id = this.$route.query.account_id
      }
      select(obj, this)
        .then(res => {
          if (res && res.code == 0) {
            if(!this.transactionpipe_ids){
              this.$router.push({
                path: "/commission/Receipt_new",
                name: "commission-Receipt_new",
                query: {
                  ids: JSON.stringify([id]),
                  trade_date:this.$route.query.trade_date
                }
              });
            }else{
              var arr={
                  id:this.transactionpipe_ids
              }
              transactionpipe_detail(arr).then(i=>{
                this.$router.push({
                  path: "/commission/Receipt_new",
                  name: "commission-Receipt_new",
                  query: {
                    ids: JSON.stringify([id]),
                    first_transactionpipe_id:JSON.stringify(this.transactionpipe_ids),
                    transactionpipe_id:i.data.transactionpipe_id?JSON.stringify(i.data.transactionpipe_id):'',
                    pay_out_balance:i.data.pay_out_balance?i.data.pay_out_balance:'',
                    pay_in_balance:i.data.pay_in_balance?i.data.pay_in_balance:'',
                    account_id:i.data.account_id?i.data.account_id:'',
                    trade_date:i.data.trade_date,
                    currency:this.$route.query.currency
                  }
                });
              })
              // this.$router.push({
              //   path: "/commission/Receipt_new",
              //   name: "commission-Receipt_new",
              //   query: {
              //     ids: JSON.stringify([id]),
              //     transactionpipe_id:this.transactionpipe_ids?JSON.stringify(this.transactionpipe_ids):'',
              //     pay_out_balance:this.$route.query.pay_out_balance?this.$route.query.pay_out_balance:'',
              //     pay_in_balance:this.$route.query.pay_in_balance?this.$route.query.pay_in_balance:'',
              //     account_id:this.$route.query.account_id?this.$route.query.account_id:'',
              //     trade_date:this.$route.query.trade_date
              //   }
              // });
            }
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    more_w(id){
      let obj = {
        ids: this.ids,
        transactionpipe_id:this.transactionpipe_ids?this.transactionpipe_ids[0]:''
      };
      let that=this;
      select(obj)
        .then(res => {
          if (res && res.code == 0) {
              that.$router.push({
                path: "/commission/Receipt_w",
                name: "commission-Receipt_w",
                query: {
                  ids: JSON.stringify(this.ids),
                  first_transactionpipe_id:JSON.stringify(this.transactionpipe_ids),
                  transactionpipe_id:this.transactionpipe_ids?JSON.stringify(this.transactionpipe_ids):'',
                  pay_out_balance:this.$route.query.pay_out_balance?this.$route.query.pay_out_balance:'',
                  pay_in_balance:this.$route.query.pay_in_balance?this.$route.query.pay_in_balance:'',
                  account_id:this.$route.query.account_id?this.$route.query.account_id:'',
                  trade_date:this.$route.query.trade_date,
                }
              });
          } else {
            that.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    receipt_w(id){
      let obj = {
        ids: [id],
        transactionpipe_id:this.transactionpipe_ids?this.transactionpipe_ids[0]:''
      };
      let that=this;
      select(obj)
        .then(res => {
          if (res && res.code == 0) {
              that.$router.push({
                path: "/commission/Receipt_w",
                name: "commission-Receipt_w",
                query: {
                  ids: JSON.stringify([id]),
                  first_transactionpipe_id:JSON.stringify(this.transactionpipe_ids),
                  transactionpipe_id:this.transactionpipe_ids?JSON.stringify(this.transactionpipe_ids):'',
                  pay_out_balance:this.$route.query.pay_out_balance?this.$route.query.pay_out_balance:'',
                  pay_in_balance:this.$route.query.pay_in_balance?this.$route.query.pay_in_balance:'',
                  account_id:this.$route.query.account_id?this.$route.query.account_id:'',
                  trade_date:this.$route.query.trade_date
                }
              });
          } else {
            that.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.customer = res.data;
            this.loading = false;
          });
        }, 200);
      } else {
        this.customer = [];
      }
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.ids = []
      this.checked_all = false
      this.fetchData();
    }
  }
};
function init() {
  var date = new Date();
  // 年
  var year = date.getFullYear();
  // 月
  var month = date.getMonth() + 1;
  // 日
  var day = date.getDate();
  month = month < 10 ? "0" + month : month; // 如果小于10即显示为09月
  day = day < 10 ? "0" + day : day; // 如果小于10即显示为09日

  return String(year) + String(month);
}
</script>

<style lang="scss" scoped type="text/scss">
/deep/ table {
  width: 100%;
  border-collapse: collapse;
  .el-input__inner {
    border: 0px;
    padding: 0px;
  }
  td,
  th {
    padding: 0px;
    line-height: 15px;
    font-size: 11px;
  }
}
/deep/.el-checkbox__inner{
  transition: 0s;
}
/deep/.el-checkbox__inner::after{
  transition: 0s;
}
/deep/.heard{
  // input{
  //   vertical-align: baseline;
  // }
}
</style>
