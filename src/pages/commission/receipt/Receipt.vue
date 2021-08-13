<template>
  <d2-container>
    <table border="1" bordercolor="#E5E5E5" style="width: 100%;font-size:12px;">
      <tr>
        <th width="100px;">合同号</th>
        <th width="60px;">合同额</th>
        <th width="60px;">已收金额</th>
        <th width="70px;">收合同金额</th>
        <th width="90px;">已收银行费用</th>
        <th width="80px;">已使用往来账</th>
        <th width="110px;">已登其它费用(￥)</th>
        <th width="90px;">已登运费(￥)</th>
        <th width="80px;">已登佣金(￥)</th>
        <th width="60px;">银行费用</th>
        <th width="60px;">往来账</th>
        <th width="60px;">到帐金额</th>
        <!-- <th width='100px'>佣金公式
          <div style="color:red;font-weight:normal;">(需要含有p如:p*1.0)</div>
        </th> -->
        <th width='60px'>佣金</th>
        <th width="80px;">其它费用(￥)</th>
        <th width='100'>备注</th>
        <th width="70px;" v-if="!$route.query.transactionpipe_id">人民币汇率</th>
        <th width="60px;">操作</th>
      </tr>
      <tr v-for="items in list.data" :key="items.id">
        <td>{{items.saler_contract_detail.contract_number}}</td>
        <td>{{items.saler_contract_detail.total_money}}{{Currency[items.saler_contract_detail.currency_id].name}}</td>
        <td>{{items.real_checkin}}</td>
        <td>{{items.total_money2}}</td>
        <td>{{items.bank_fee_recieved}}</td>
        <td>{{items.currentaccount_recieved}}</td>
        <td>{{items.other_fee_recieved}}</td>
        <td>{{items.transport_fee}}</td>
        <td>{{items.commission_fee}}</td>
        <td>
          <el-input size="mini" v-model="items.bank_fee"></el-input>
        </td>
        <td>
          <el-input size="mini" v-model="items.currentaccount"></el-input>
        </td>
        <td>
          <el-input size="mini" v-model="items.checkin"></el-input>
        </td>
        <!-- <td>
          <el-input size="mini" v-model="items.saler_contract_detail.commission_expression"></el-input>
        </td> -->
        <td>
          <el-input size="mini" v-model="items.commission_fee_"></el-input>
        </td>
        <td>
          <el-input size="mini" v-model="items.other_fee"></el-input>
        </td>
        <td>
          <el-input size="mini" v-model="items.note"></el-input>
        </td>
        <td v-if="!$route.query.transactionpipe_id">{{items.ratio}}</td>
        <td align="center" style="padding:2px;">
          <el-button type="primary" size="mini" @click="save_other(items)" style="margin-bottom:2px;">保存</el-button><br>
          <el-button type="primary" size="mini" @click="RecieptStatus(items.saler_contract_detail.contract_number)">更新状态</el-button>
        </td>
      </tr>
    </table>

    <el-form :inline="true" :model="formInline" label-width="120px" class="demo-form-inline d2-m">
      <el-form-item label="贷余额" style="width:32%" v-if="$route.query.transactionpipe_id">
        <el-input v-model="formInline.pay_in_balance" size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="本次应收金额" style="width:32%">
        <el-input v-model="formInline.total_money" @input="fee()" size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="银行到账金额" style="width:32%">
        <el-input v-model="formInline.checkin" @input="fee()" size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="银行费用" style="width:32%">
        <el-input v-model="formInline.bank_fee" disabled size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="类别" style="width:32%" v-if="list.currentaccount.length>0">
        <el-select
          v-model="formInline.currentaccount_type"
          @change="select_type(formInline.currentaccount_type)"
          size="mini"
          clearable
          filterable
          style="width: 178px;"
        >
          <el-option v-for="i in account_types" :label="i.name" :value="i.id" :key="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="往来账余额" style="width:32%" v-if="list.currentaccount.length>0">
        <el-input v-model="currentaccount" disabled size="mini" placeholder></el-input>
      </el-form-item>
      <el-form-item label="往来账使用金额" style="width:32%" v-if="list.currentaccount.length>0">
        <el-input
          v-if="currentaccount>0"
          v-model="formInline.currentaccount"
          @input="account()"
          size="mini"
          placeholder
        ></el-input>
        <el-input
          v-else
          v-model="formInline.currentaccount"
          @input="account()"
          disabled
          size="mini"
          placeholder
        ></el-input>
      </el-form-item>
      <el-form-item label="收款比例" style="width:32%" v-if="!$route.query.transactionpipe_id">
        <el-input v-model="formInline.checkin_rate" size="mini" @change="checkin_rate()" placeholder></el-input>
      </el-form-item>
      <!-- <el-form-item label="佣金公式" style="width:32%">
        <el-input
          v-model="formInline.commission_expression"
          size="mini"
          @input="evaluate()"
          placeholder
        ></el-input>
      </el-form-item>
      <el-form-item label="佣金总额" style="width:32%">
        <el-input
          v-model="formInline.commission_fee"
          size="mini"
          @input="evaluate_commission_fee()"
          placeholder
        ></el-input>
      </el-form-item> -->
      <el-form-item label="收款日期" style="width:32%" :required="true">
        <el-date-picker
          class="date_picker d2-ml-5"
          v-model="formInline.checked_date"
          value-format="yyyy-MM-dd"
          type="date"
          size="mini"
          style="width: 178px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="收款银行" style="width:32%" :required="true">
        <el-select
          v-model="formInline.bank_id"
          size="mini"
          clearable
          filterable
          style="width: 178px;"
        >
          <el-option v-for="i in Bank" :label="i.name" :value="i.id" :key="i.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人民币汇率" style="width:32%" v-if="!$route.query.transactionpipe_id">
        <el-input v-model="formInline.currency_rate" @input="rate" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="收款备注" style="width:32%">
        <el-input v-model="formInline.note" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div style="width: 100%;text-align: center">
      <el-button type="primary" @click="save()" size="mini" :loading="save_fy">保存</el-button>
      <el-button @click="cancel()" size="mini">取消</el-button>
    </div>

    <el-form style="margin-top:30px;">
      <el-form-item label="收款历史：" style="font-weight: bold;">
        <!-- <table border="1" bordercolor="#E5E5E5" style="width: 100%;font-size:12px;">
          <tr>
            <th width="121px;">合同号</th>
            <th width="70px;">收款日期</th>
            <th width="60px;">收款比例</th>
            <th width='40px'>状态</th>
            <th>银行</th>
            <th width="60px;">银行费用</th>
            <th width="70px;">佣金</th>
            <th width="60px;">往来账</th>
            <th width="60px;">到帐金额</th>
            <th width="60px;">类别</th>
            <th width="80px;">已登的运费(￥)</th>
            <th width="80px;">其它费用(￥)</th>
            <th width='200'>备注</th>
          </tr>
          <tr v-for="item in list.data">
            <td colspan="14" style="padding:0px;">
              <table border="1" bordercolor="#E5E5E5">
                <tr v-for="i in item.receipts" v-if="item.receipts.length>0">
                  <td width="120px;">{{list.data.filter(j=>{return j.contract_detail_id == i.saler_contract_detail_id})[0].saler_contract_detail.contract_number}}</td>
                  <td width="70px;">{{i.checked_date}}</td>
                  <td width="60px;">{{i.checkin_rate}}</td>
                  <td width='40px' :style="i.status==1?'color:green':'color:red;'">{{getEnumValue(Statuses,i.status)}}</td>
                  <td >
                    <span v-if="Bank[i.bank_id]">{{Bank[i.bank_id].note}}</span><br>
                    <span>{{getEnumValue(Bank,i.bank_id)}}</span>
                  </td>
                  <td width="60px;">{{i.bank_fee}}</td>
                  <td width='70'>{{i.commission_fee}}</td>
                  <td width="60px;">{{i.currentaccount}}</td>
                  <td width="60px;">{{i.checkin}}</td>
                  <td width="60px;">{{getEnumValue(account_types,i.currentaccount_type)}}</td>
                  <td width="80px;">{{i.transport_fee}}</td>
                  <td width="80px;">{{i.other_fee}}</td>
                  <td width='199'>{{i.note}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table> -->
        <el-form-item label="收款历史：" style="font-weight: bold;">
        <table border="1" bordercolor="#E5E5E5" style="width: 100%;font-size:12px;" v-for="(item,index) in list.data" :key="item.id">
          <tr v-if="index==0">
            <th width='50'>ID</th>
            <th width="120px;">合同号</th>
            <th width="50px;">操作人</th>
            <th width="70px;">收款日期</th>
            <th width="70px;">登记日期</th>
            <th width='40px'>状态</th>
            <th width='150'>银行</th>
            <th width="60px;">银行费用</th>
            <th width="60px;">佣金</th>
            <th width="60px;">往来账</th>
            <th width="80px;">合同总金额</th>
            <th width="70px;">合同状态</th>
            <th width="60px;">到帐金额</th>
            <th width="60px;">类别</th>
            <th width="80px;">已登的运费(￥)</th>
            <th width="80px;">其它费用(￥)</th>
            <th width='200'>备注</th>
            <th>操作</th>
          </tr>
          <tr v-for="i in item.receipts" v-if="item.receipts.length>0" :key="i.id">
            <td width='50'>{{i.id}}</td>
            <td width="120px;">{{list.data.filter(j=>{return j.contract_detail_id == i.saler_contract_detail_id})[0].saler_contract_detail.contract_number}}</td>
            <td width="50px;">{{getEnumValue(Users,i.user_id)}}</td>
            <td width="70px;">{{i.checked_date}}</td>
            <td width="70px;">{{i.created_at.trim().split(" ")[0]}}</td>
            <td width='40px' >
              <span :style="i.status==1?'color:green':'color:red;'">
                {{getEnumValue(Statuses,i.status)}}
              </span>
            </td>
            <td width='150'>
                <span v-if="i.bank_id">
                    <span>{{getEnumValue(Bank,i.bank_id)}}</span>
                </span>
                <span v-else>
                    <!-- <span v-if="Bank[i.account_id]">{{Bank[i.account_id].note}}</span><br> -->
                    <span>{{getEnumValue(Bank,i.account_id)}}</span>
                </span>
            </td>
            <td width="60px;">{{i.bank_fee}}</td>
            <td width='60'>{{i.commission_fee}}</td>
            <td width="60px;">{{i.currentaccount}}</td>
            <td width='80px;'>
              {{item.saler_contract_detail?item.saler_contract_detail.total_money:''}}
            </td>
            <td width='70px'>{{getEnumValue(receipt_status_info,item.saler_contract_detail?item.saler_contract_detail.receipt_status:'')}}</td>
            <td width="60px;">{{i.checkin}}</td>
            <td width="60px;">{{getEnumValue(account_types,i.currentaccount_type)}}</td>
            <td width="80px;">{{i.transport_fee}}</td>
            <td width="80px;">{{i.other_fee}}</td>
            <td width='200'>
              <div>{{i.note}}</div>
              <div v-if="i.cancle_note">
                <span style="color:red;">取消收款备注:{{i.cancle_note}}</span>
              </div>
            </td>
            <td style="padding-top:2px;">
              <el-button @click="cancel_list(i.id)" size="mini" type="danger" v-if="i.status==1">取消收款</el-button>
              <div style="margin:2px;">
                  <el-button v-if="i.tps.length>0" @click="cancel_log(i.tps)" size="mini" type="primary">收款记录</el-button>
              </div>
            </td>
          </tr>
        </table>
      </el-form-item>
      </el-form-item>
    </el-form>

    <!-- 取消理由 -->
    <el-dialog :visible.sync="resonDialog" width="30%" >
      <div style="text-align:left;display:flex;align-items: center;">
        <span>取消理由:</span>
        <el-input type="textarea" size="mini" v-model="reson_obj.cancle_note" style="width:75%;margin-left:10px"></el-input>
      </div>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="cancel_sure()">确定</el-button>
        <el-button size="mini" @click="resonDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- logs -->
      <el-dialog :visible.sync="is_log" width="50%" class="log_table">
        <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
          <tr style="font-weight: bold;">
          <td >收款账户</td>
          <td width='120'>时间</td>
          <td width='60'>用户</td>
          <td>收款</td>
          <td>费用</td>
          <td>状态</td>
        </tr>
        <tr v-for="item in log_list" :key="item.id">
          <td>{{getEnumValue(Bank,item.tp.account_id)}}</td>
          <td>{{item.created_at}}</td>
          <td>{{getEnumValue(Users,item.user_id)}}</td>
          <td>{{item.pay_in_flow}}{{getEnumValue(Bank,item.tp.account_id,'currency')}}</td>
          <td>{{item.pay_out_flow}}</td>
          <td>{{item.type}}</td>
        </tr>
        </table>
      </el-dialog>
  </d2-container>
</template>

<script>
import Big from "@/big/a/big.mjs";

import {
  receipt_index,
  receipt_create,
  evaluate,
  save_other_fee,
  cancle_f
} from "@/api/sale";
import {} from '@/api/commission';
import { fixRecieptStatus,account_search} from "@/api/commission";
import { mapActions } from "vuex";
export default {
  name: "commission-Receipt",
  data() {
    return {
      a:'12313---3333',
      save_fy:false,
      currency: "",
      currentaccount_fy:true,
      resonDialog:false,
      log_list:[],
      is_log:false,
      list: {currentaccount:[]},
      Bank: [],
      Currency: [],
      formInline: {
        receipt: [],
        total_money: "",
        bank_fee: 0,
        currency_rate: "",
        checkin: "",
        checkin_rate: 1,
        commission_expression: "",
        currentaccount: 0,
        commission_fee: 0,
        checked_date: "",
        bank_id: 1,
        note: "",
        currentaccount_type: ""
      },
      reson_obj:{},
      total_money: "",
      total_money2: "",
      expression: {},
      money_a: "",
      currentaccount: "",
      account_types: [],
      Statuses:[],
      Users:[],
      receipt_status_info:[],
      useID:''
    };
  },
  created() {
    this.fetchData();
    this.useID = this.$route.query.ids
  },
  watch: {
    $route(to, from) {
      if (to.name == "commission-Receipt") {
          this.useID = this.$route.query.ids
      }
    },
    useID(to,form){
        if(to!=form){
            this.formInline={
                receipt: [],
                total_money: "",
                bank_fee: 0,
                currency_rate: "",
                checkin: "",
                checkin_rate: 1,
                commission_expression: "",
                currentaccount: 0,
                commission_fee: 0,
                checked_date: "",
                bank_id: 1,
                note: "",
                currentaccount_type: ""
            }
            this.fetchData()
        }
    }
  },
  computed: {
    total_money_all() {
      let money = 0;
      this.list.data.forEach((items, index) => {
        money = new Big(money).plus(items.saler_contract_detail.total_money);
      });

      return Number(money);
    },
    uncheckin_all() {
      let money = 0;
      this.list.data.forEach((items, index) => {
        money = new Big(money).plus(items.uncheckin ? items.uncheckin : 0);
      });
      return Number(money);
    },
    checkin_all() {
      let money = 0;
      this.list.data.forEach((items, index) => {
        money = new Big(money).plus(items.checkin ? items.checkin : 0);
      });
      return Number(money);
    },
    commission_fee_all() {
      let money = 0;
      this.list.data.forEach((items, index) => {
        money = new Big(money).plus(
          items.commission_fee ? items.commission_fee : 0
        );
      });
      return Number(money);
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    select_type(type) {
      let num = 0;
      this.list.currentaccount.forEach((items, index) => {
        if (items.account_type == type) {
          this.currentaccount = items.amount;
          this.formInline.currentaccount = 0
          this.currentaccount_fy = true
        } else {
          num++;
        }
      });
      if (num == this.list.currentaccount.length) {
        this.formInline.currentaccount = this.currentaccount = 0;
        this.currentaccount_fy = false
      }
      this.formInline.bank_fee = Number(new Big(this.formInline.total_money).minus(this.formInline.checkin).minus(this.formInline.currentaccount));
    },
    save_other(items) {
      var obj = {
        contract_detail_id: items.contract_detail_id,
        other_fee: items.other_fee,
        commission_fee: items.commission_fee_,
        // commission_expression: items.saler_contract_detail.commission_expression
        note:items.note
      };
      save_other_fee(obj)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            items.other_fee_recieved =
              parseFloat(items.other_fee_recieved) +
              parseFloat(items.other_fee);
            items.other_fee = 0;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    fetchData() {
      let that = this;
      let ids = JSON.parse(that.$route.query.ids);
      let transactionpipe_id = that.$route.query.transactionpipe_id?JSON.parse(that.$route.query.transactionpipe_id):'';
      let obj = {}
      if(that.$route.query.pl){
        obj = {
          ids: ids,
          transactionpipe_id:transactionpipe_id,
          combine:true
        };
      }else{
        obj = {
          ids: ids,
          transactionpipe_id:transactionpipe_id,
        };
      }
      receipt_index(obj, that).then(res => {
        if (res && res.code == 0) {
          let money = 0;
          res.data.data.forEach((items, index) => {
            for (var index in res.enum.Currency) {
              if (index == items.saler_contract_detail.currency_id) {
                items.ratio = res.enum.Currency[index]?res.enum.Currency[index].ratio:'';
              }
            }
            // items.currentaccount = 0
            items.total_money2 = items.saler_contract_detail.total_money;
            this.total_money2 = JSON.parse(
              JSON.stringify(items.saler_contract_detail.total_money)
            );
            items.checkin = items.checkin ? items.checkin : 0;
            items.commission_fee_recieved = items.commission_fee
              ? items.commission_fee
              : 0;
            items.bank_fee_recieved = items.bank_fee ? items.bank_fee : 0;
            items.currentaccount_recieved = items.currentaccount
              ? items.currentaccount
              : 0;
            items.bank_fee = 0;
            // items.commission_fee = 0;
            // items.currentaccount = 0
            items.bank_fee = items.bank_fee ? items.bank_fee : 0;
            items.other_fee_recieved = items.other_fee ? items.other_fee : 0;
            // items.other_fee = items.other_fee ? items.other_fee : 0
            // items.other_fee = 0;
            items.transport_fee = items.transport_fee ? items.transport_fee : 0;
            items.uncheckin = Number(
              new Big(items.saler_contract_detail.total_money).minus(items.real_checkin ? items.real_checkin : 0).minus(items.currentaccount ? items.currentaccount : 0).minus(items.bank_fee_recieved ? items.bank_fee_recieved : 0)
            );
            items.checkin = items.uncheckin;
            money = new Big(money).plus(items.uncheckin ? items.uncheckin : 0);
            if(items.saler_contract_detail.customer_id==71139){
              if(items.saler_contract_detail.invoice_type_id==2){
                this.formInline.bank_id = 35
              }else{
                this.formInline.bank_id = 29
              }
            }
          });
          this.list = res.data;
          this.list.data.forEach(i=>{
            i.other_fee = 0
          })
          this.account_types = res.enum.account_types;
          // this.currentaccount = this.list.currentaccount[0]
          //   ? this.list.currentaccount[0].amount
          //   : "";
          // this.currentaccount = this.attr(this.list,'currentaccount[0].amount')
          // this.formInline.currentaccount = this.currentaccount;
          // this.Bank = res.enum.Bank;
          this.Currency = res.enum.Currency;
          this.expression = res.enum.expression;
          this.Statuses = res.enum.Statuses
          this.formInline.commission_expression =
            res.enum.expression.expression;
          this.formInline.total_money = JSON.parse(
            JSON.stringify(Number(money))
          );
          this.total_money = JSON.parse(JSON.stringify(Number(money)));
          this.formInline.checkin = Number(money);
          // this.currentaccount = this.list.currentaccount ? this.list.currentaccount.amount : ''
          this.formInline.currency_rate = this.list.data[0]?this.list.data[0].ratio:'';
          this.formInline.checked_date = init();
          // this.formInline.commission_fee = (res.enum.expression.expression.slice(2) * Number(money)).toFixed(2)
          // this.evaluate_s();
          this.money_a =JSON.parse(
            JSON.stringify(Number(money))
          );
          if(this.formInline.currentaccount){
            this.formInline.bank_fee = Number(new Big(this.formInline.total_money).minus(this.formInline.checkin).minus(this.formInline.currentaccount));
          }
        }
      });
      account_search().then(res => {
          res.data.forEach((items,index)=>{
              items.name = items.account_name+'-'+(items.account?items.account:'')+(items.currency?'-'+items.currency:'')
          })
          this.Bank = res.data;
          this.$forceUpdate()
      })
      this.Users=this.GEnums.Users
      this.receipt_status_info =this.GEnums.ReceiptStatus;
    },
    fetchData_b() {
      let ids = JSON.parse(this.$route.query.ids);;
      let transactionpipe_id = this.$route.query.transactionpipe_id?JSON.parse(this.$route.query.transactionpipe_id):'';
      let obj = {}
      if(this.$route.query.pl){
        obj = {
          ids: ids,
          transactionpipe_id:transactionpipe_id,
          combine:true
        };
      }else{
        obj = {
          ids: ids,
          transactionpipe_id:transactionpipe_id,
        };
      }
      receipt_index(obj, this).then(res => {
        if (res && res.code == 0) {
          this.list.data.forEach((i,index)=>{
            i.receipts = res.data.data[index].receipts
          })
        }
      });
    },
    cancel_log(log){
      this.log_list = []
      this.log_list = log
      this.is_log = true
    },
    RecieptStatus(number){
      var obj = {
        id:number
      }
      fixRecieptStatus(obj,this)
    },
    checkin_rate() {
      this.list.data.forEach((items, index) => {
        items.total_money2 = new Big(items.total_money2)
          .times(this.formInline.checkin_rate)
          .toFixed(2);
      });
      this.formInline.total_money = new Big(this.total_money)
        .times(this.formInline.checkin_rate)
        .toFixed(2);
      this.formInline.checkin = new Big(this.formInline.checkin)
        .times(this.formInline.checkin_rate)
        .toFixed(2);
      this.evaluate();
    },
    account() {
      // this.formInline.checkin = new Big(this.formInline.total_money).minus(
      //   this.formInline.currentaccount
      // );
      this.formInline.bank_fee = Number(new Big(this.formInline.total_money).minus(this.formInline.checkin).minus(this.formInline.currentaccount));
      this.list.data.forEach((items, index) => {
        items.currentaccount = new Big(items.saler_contract_detail.total_money)
          .div(this.total_money_all)
          .times(this.formInline.currentaccount)
          .toFixed(2);
      });
    },
    evaluate_s() {
      var a = 0;
      let obj = {
        commission_expression: this.formInline.commission_expression,
        commission_fee: ""
      };
      this.list.data.forEach((items, index) => {
        a += Number(items.uncheckin);
      });
      obj.commission_fee = a;
      evaluate(obj).then(res => {
        if (res && res.code == 0) {
          this.formInline.commission_fee = new Big(res.data)
            .div(this.formInline.currency_rate)
            .toFixed(2);
          this.list.data.forEach((items, index) => {
            items.commission_fee = new Big(
              items.saler_contract_detail.total_money
            )
              .div(this.total_money_all)
              .times(this.formInline.commission_fee)
              .toFixed(2);
          });
        } else {
        }
      });
    },
    evaluate_commission_fee() {
      this.list.data.forEach((items, index) => {
        items.commission_fee = new Big(items.saler_contract_detail.total_money)
          .div(this.total_money_all)
          .times(this.formInline.commission_fee)
          .toFixed(2);
      });
    },
    evaluate() {
      let obj = {
        commission_expression: this.formInline.commission_expression,
        commission_fee: this.formInline.total_money
      };
      evaluate(obj).then(res => {
        if (res && res.code === 0) {
          this.formInline.commission_fee = new Big(res.data)
            .div(this.formInline.currency_rate)
            .toFixed(2);
          this.list.data.forEach((items, index) => {
            items.commission_fee = new Big(
              items.saler_contract_detail.total_money
            )
              .div(this.total_money_all)
              .times(this.formInline.commission_fee)
              .toFixed(2);
          });
        } else {
        }
      });
    },
    fee() {
      // if (Number(this.formInline.total_money) > Number(this.money_a)) {
      //   this.formInline.total_money = Number(this.money_a)
      // }
      // this.formInline.total_money = JSON.parse(JSON.stringify(Number(this.money_a)))
      // this.formInline.commission_fee = (this.formInline.commission_expression.slice(2) * Number(this.formInline.total_money)).toFixed(2)
      this.evaluate();
      this.evaluate_commission_fee();
      if(this.formInline.currentaccount){
        this.formInline.bank_fee = Number(new Big(this.formInline.total_money).minus(this.formInline.checkin).minus(this.formInline.currentaccount));
      }else{
        this.formInline.bank_fee = Number(new Big(this.formInline.total_money).minus(this.formInline.checkin));
      }
      this.list.data.forEach((items, index) => {
        items.bank_fee = new Big(items.saler_contract_detail.total_money)
          .div(this.total_money_all)
          .times(this.formInline.bank_fee)
          .toFixed(2);
      });
    },
    rate() {
      this.list.data.forEach((items, index) => {
        items.ratio = this.formInline.currency_rate;
      });
      this.evaluate();
    },
    save() {
      this.formInline.receipt = [];
      this.list.data.forEach((items, index) => {
        this.formInline.receipt.push({
          id: items.saler_contract_detail.id,
          currency_rate: items.ratio,
          total_money: items.total_money2,
          bank_fee: items.bank_fee,
          commission_fee: items.commission_fee,
          other_fee: items.other_fee,
          currentaccount: items.currentaccount
        });
      });
      var tagName = "commission-Receipt";
      if(this.list.currentaccount.length==0||!this.currentaccount_fy){
        delete this.formInline.currentaccount_type
        delete this.formInline.currentaccount
      }
      this.save_fy = true
      delete this.formInline.commission_expression
      delete this.formInline.commission_fee
      receipt_create(this.formInline, this, tagName);
    },
    cancel_list(id){
      this.reson_obj = {
        ids:[id],
        cancle_note:''
      }
      this.resonDialog = true
    },
    cancel_sure(){
      cancle_f(this.reson_obj,"receipt", "cancel", this)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.resonDialog = false
            this.fetchData_b()
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    cancel() {
      let  that=this
      // that.$router.go(-1);
      that.$router.push({
                path: '/commission/Receipt_list',
                name: 'commission-Receipt_list',
                query: {
                  id_list: JSON.stringify(that.$route.query.ids)
                }
            })
      var tagName = "commission-Receipt";
        that.closeAdd({ tagName });
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

  return year + "-" + month + "-" + day;
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
  td,th {
    padding: 0px 5px;
    line-height: 20px;
    font-size: 12px;
  }
  td{
    font-weight: normal;
  }
}
</style>
