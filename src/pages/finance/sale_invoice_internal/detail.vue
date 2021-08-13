<style lang="scss" scoped type="text/scss">
/deep/ .div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  .el-input__inner {
    border: 0px;
    padding: 0px 0px;
  }
  .note{
    .el-textarea__inner{
      border: 0px;
      padding: 0px 0px;
    }
  }
  
  .el-dialog {
    table {
      width: 100%;
    }
  }
  .form_title {
    background: #f1f1f1;
    margin-bottom: 0px;
    .el-button {
      color: black;
    }
  }
  // td {
  //   padding: 0px 5px;
  // }
  // th {
  //   padding: 5px;
  // }
}

.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
  table {
    border-collapse: collapse;
    margin-top: 5px;
    .el-select {
      width: 100%;
    }
  }
}

/deep/ .quoteInput {
  padding: 20px 0px;
  .el-input__inner {
    border: 1px solid #dcdfe6;
    padding: 0px 10px;
  }
}

/deep/ .dateInputStyle {
  .el-input__inner {
    padding: 0px 15px;
  }
  .el-input__prefix {
    left: -8px;
  }
}

/deep/ table {
  width: 100%;
  border-collapse: collapse;
  .el-input__inner {
    border: 0px;
    padding: 0px;
  }
  td {
    padding: 5px;
    line-height: 20px;
    min-width: 50px;
  }
  th{
    line-height: 30px;
    min-width: 50px;
  }
}
</style>
<template>
  <d2-container>
    <div class="div">
      <!-- 页面 -->
      <el-form label-width="0px" label-position="right">
        <div style="margin:20px 0px;">
          <el-form-item v-show="form_show0" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">合同方</th>
                <th class="td">合同号</th>
                <th class="td">名称</th>
                <th class="td">联系人</th>
                <th class="td">联系电话</th>
                <th class="td">传真</th>
                <th class="td">合同时间</th>
                <th class="td">合同额</th>
              </tr>
              <tr>
                <td>需方</td>
                <td></td>
                <td>{{detail.company_name}}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr v-for="items in saler_contracts" :key='items.id'>
                <td>供方</td>
                <td>{{items.contract_number}}</td>
                <td>{{items.corp_name}}</td>
                <td>{{items.customer_contact}}</td>
                <td>{{items.customer_mobile}}</td>
                <td>{{items.customer_fax}}</td>
                <td>{{items.contract_date}}</td>
                <td>{{items.total_money}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title" style="margin-bottom:10px;">
            <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
              <b>开票历史</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5" v-for="item in detail_.invoices" :key='item.id'>
              <tr style="background:#F5F9FC;">
                <th>开票分类</th>
                <th class="td">发票号码	</th>
                <th class="td">通知单ID</th>
                <th class="td">开票ID</th>
                <th class="td" :colspan="item.type==2?1:2">公司名称</th>
                <th class="td" width='60'>税率</th>
                <th class="td">发票类型</th>
                <th class="td">开票日期</th>
                <th :colspan="item.type==2?2:1">状态</th>
              </tr>
              <tr>
                <td>
                  <span v-if="item.type==1" style="color:green;">{{getEnumValue(type_info,item.type)}}</span>
                  <span v-else style="color:red;">{{getEnumValue(type_info,item.type)}}</span>
                </td>
                <td >{{item.invoice_number}}</td>
                <td >{{item.invoice_notice_id}}</td>
                <td >{{item.id}}</td>
                <td :colspan="item.type==2?1:2">{{item.company_name}}</td>
                <td>{{item.tax}}</td>
                <td >{{getEnumValue(invoice_type,item.invoice_type)}}</td>
                <td >{{item.invoice_date}}</td>
                <td align='center' :colspan="item.type==2?2:1">
                    <span :style="(item.status==2)?'color:red;':'color:green;'">{{getEnumValue(statuses,item.status)}}</span>
                    <!-- <el-button v-if="item.status==1" type="primary" size="mini" @click="refund(item.id)" style="margin-left:5px;">取消开票</el-button> -->
                </td>
              </tr>
              <tr>
                <th width='80' v-if="item.type==2">原开票号</th>
                <th width="110">合同号</th>
                <th width="100" :colspan="item.type==2?2:1">CAS</th>
                <th width='300'>产品名称</th>
                <th width="100">数量</th>
                <th width="100">单价</th>
                <th width="100">金额</th>
                <th width="50">货币</th>
                <th :colspan="item.type==2?2:3">备注</th>
              </tr>
              <tr v-for="item_a in item.invoice_details" :key='item_a.id'>
                <td v-if="item.type==2">{{item_a.related_invoice_number}}</td>
                <td>{{item_a.contract_number}}</td>
                <td :colspan="item.type==2?2:1">{{item_a.cas}}</td>
                <td>{{item_a.product_name}}</td>
                <td>{{item_a.quantity}}{{units.filter(i => {return i.id == item_a.quantity_unit})[0].name}}</td>
                <td>{{item_a.price}}</td>
                <td>{{item_a.total_money}}</td>
                <td>{{currencys.filter(i => {return i.id == item_a.currency_id})[0].name}}</td>
                <td :colspan="item.type==2?2:3">{{item_a.remark}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
              <b>发票信息</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th width='80'>开票分类</th>
                <th class="td" width='60'>申请单ID</th>
                <th class="td" width='80'>申请时间</th>
                <th class="td" width='60'>申请人员</th>
                <th class="td" width='100'>发票类型</th>
                <th class="td" width='60'>税率</th>
                <th class="td">公司开票名称</th>
                <th class="td">税号</th>
                <th class="td">地址电话</th>
                <th class="td">银行账号</th>
                <th class="td" v-if="detail_.invoice_type==3">接受发票邮箱</th>
              </tr>
              <tr>
                <td>
                  <span v-if="detail_.type==1" style="color:green;">{{getEnumValue(type_info,detail_.type)}}</span>
                  <span v-else style="color:red;">{{getEnumValue(type_info,detail_.type)}}</span>
                </td>
                <td>{{detail_.id}}</td>
                <td>{{detail_.created_at}}</td>
                <td>{{detail_.user?detail.user.name:''}}</td>
                <td>{{detail_.invoice_type?invoice_type.filter(i => {return i.id == detail_.invoice_type})[0].name:''}}</td>
                <td>{{detail_.tax}}</td>
                <td>{{detail_.company_name}}</td>
                <td>{{detail_.duty_paragraph}}</td>
                <td>{{detail_.address}}{{detail.mobile}}</td>
                <td>{{detail_.opening_bank}}<br>{{detail_.bank_account_number}}</td>
                <td v-if="detail_.invoice_type==3">{{detail_.receive_invoice_email}}</td>
              </tr>
              <tr class="note">
                <td>备注</td>
                <td :colspan="detail_.invoice_type==3?10:9">
                  <el-input type="textarea" size="mini" v-model="detail_.remark"></el-input>
                </td>
              </tr>
              <tr>
                <td>审批意见</td>
                <td :colspan="detail_.invoice_type==3?10:9">
                  <el-radio-group v-model="detail_.status">
                    <el-radio :label="2">通过</el-radio>
                    <el-radio :label="3">不通过</el-radio>
                  </el-radio-group>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>开票明细</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">合同号</th>
                <th class="td">CAS</th>
                <th class="td">产品名称</th>
                <th class="td">规格</th>
                <th class="td">数量</th>
                <th class="td">单位</th>
                <th class="td">单价</th>
                <th class="td">金额</th>
                <th class="td">货币符号</th>
                <th class="td">备注</th>
              </tr>
              <tr v-for="(item,index) in detail_.details" :key='item.id'>
                <td width="110">{{item.contract_number}}</td>
                <td width="100">{{item.cas}}</td>
                <td width="300">{{item.product_name}}</td>
                <td width="100">{{item.package}}</td>
                <td width="100">{{item.quantity}}</td>
                <td width="60">{{units.filter(i => {return i.id == item.quantity_unit})[0].name}}</td>
                <td width="100">{{item.price}}</td>
                <td width="100">{{item.total_money}}</td>
                <td width="60">{{currencys.filter(i => {return i.id == item.currency_id})[0].name}}</td>
                <td>{{item.remark}}</td>
              </tr>
              <tr>
                <td>备注：</td>
                <td colspan="9">{{detail_.remark}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:25px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show4 = !form_show4" type="text" icon="el-icon-arrow-down">
              <b>修改发票信息</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" style="background:#83D9FE;"><span style="color:red;">*</span>发票号码</th>
                <th class="td">申请时间</th>
                <th class="td" width='60'>申请人员</th>
                <th class="td" width='80'>开票日期</th>
                <th class="td">发票类型</th>
                <th class="td" width='60'>税率</th>
                <th class="td">公司开票名称</th>
                <th class="td">税号</th>
                <th class="td">地址</th>
                <th class="td">电话</th>
                <th class="td">银行账号</th>
                <th v-if="detail.invoice_type==3">接受发票邮箱</th>
              </tr>
              <tr>
                <td>
                  <el-input size="mini" v-model="detail.invoice_number"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="detail.created_at"></el-input>
                </td>
                <td><el-input size="mini" v-model="detail.user.name"></el-input></td>
                <td>
                  <!-- <el-date-picker
                    class="date_picker"
                    v-model="detail.invoice_date"
                    value-format="yyyy-MM-dd"
                    type="date"
                    size="mini"
                    style="width:100px;"
                  ></el-date-picker> -->
                  {{detail.invoice_date}}
                </td>
                <td>
                  <el-select v-model="detail.invoice_type" size="mini" clearable filterable>
                    <el-option
                      v-for="(i,index) in invoice_type"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>{{detail.tax}}</td>
                <td>
                  <el-input size="mini" v-model="detail.company_name"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="detail.duty_paragraph"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="detail.address"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="detail.mobile"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="detail.bank_account_number"></el-input>
                </td>
                <td v-if="detail.invoice_type==3">
                  <el-input size="mini" v-model="detail.receive_invoice_email"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show5 = !form_show5" type="text" icon="el-icon-arrow-down">
              <b>修改开票明细</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show5" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th width='80' v-if="detail.type==2">原开票号</th>
                <th class="td" width='110'>合同号</th>
                <th class="td" width='100'>CAS</th>
                <th class="td" min-width="200">产品名称</th>
                <th class="td" width='100'>规格</th>
                <th class="td" width='60'>数量</th>
                <th class="td" width='50'>单位</th>
                <th class="td" width='50'>单价</th>
                <th class="td" width='80'>金额</th>
                <th class="td" width='60'>税率</th>
                <th class="td" width='80'>税额</th>
                <th class="td" width='80'>不含税金额</th>
                <th class="td" width='60'>货币符号</th>
                <th class="td">备注</th>
                <!-- <th class="td" style="width: 80px;">操作</th> -->
              </tr>
              <tr v-for="(item,index) in detail.details" :key='index'>
                <td v-if="detail.type==2">{{item.red_invoice_related?item.red_invoice_related.invoice_number:''}}</td>
                <td>{{item.contract_number}}</td>
                <td>
                  <el-input size="mini" v-model="item.cas"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="item.product_name"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="item.package"></el-input>
                </td>
                <td>
                  <!-- <el-input size="mini" v-model="item.quantity" @input="change_quantity(item)"></el-input> -->
                  {{item.quantity}}
                </td>
                <td>
                  <el-select v-model="item.quantity_unit" size="mini" clearable filterable>
                    <el-option
                      v-for="(i,index) in units"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <!-- <el-input size="mini" v-model="item.price" @input="change_price(item)"></el-input> -->
                  {{item.price}}
                </td>
                <td>
                  {{item.total_money}}
                </td>
                <td>
                  <!-- <el-input size="mini" v-model="item.tax" @input="change_tax(item)"></el-input> -->
                  {{item.tax}}
                </td>
                <td>
                  {{item.tax_amount?item.tax_amount:0}}
                </td>
                <td>
                  {{item.excluding_tax_amount?item.excluding_tax_amount:0}}
                </td>
                <td>
                  <el-select v-model="item.currency_id" size="mini" clearable filterable>
                    <el-option
                      v-for="(i,index) in currencys"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input size="mini" v-model="item.remark"></el-input>
                </td>
                <!-- <td class="d2-text-center">
                  <el-button type="primary" @click="declare(item.id)" size="mini">-</el-button>
                </td> -->
              </tr>
              <tr>
                <td :colspan="detail_.type==2?'8':'7'"></td>
                <td>{{total_money}}</td>
                <td></td>
                <td>{{tax_money}}</td>
                <td colspan="3"></td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show6 = !form_show6" icon="el-icon-arrow-down">
              <b>备注</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show6" class="from-item">
            <el-input v-model="remark" type="textarea"></el-input>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="margin:0px;text-align: center">
          <el-button type="primary" v-if="permission_names['invoice_nb.billing']=='invoice_nb.billing'" @click="save()" size="small" :loading="save_fy">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>
<script>
import Big from "@/big/a/big.mjs";
import $ from "jquery";
import { notice_nb_billing_view, notice_nb_billing,rollback_invoice } from "@/api/finance";
import { getEnumValue } from '@/utils/index'
import util from "@/libs/util";
import { mapActions } from "vuex";
export default {
  name: "finance-sale_invoice_internal_detail",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      total_money: 0,
      tax_money: 0,
      save_fy:false,
      form_show0: true,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      form_show6: true,
      detail: {user:{}},
      detail_: {},
      saler_contracts: [],
      invoice_type: [],
      units: [],
      currencys: [],
      invoice_status_info: [],
      statuses:[],
      type_info:[],
      remark:'',
      index_id:'',
      form: {
        status: "",
        remark: "",
        invoice_notice_id: ""
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      this.index_id = this.$route.query.id
      this.fetchData(this.$route.query.id);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name=='finance-sale_invoice_internal_detail') {
        this.index_id = this.$route.query.id
      }
    },
    index_id(to,from){
      if(to!=from&&to&&from){
        this.fetchData(this.$route.query.id);
      }
    }
  },
  computed: {
    // total_money(){
    //     let money=0
    //     this.detail.details.forEach((items,index)=>{
    //         money=new Big(money).plus(items.total_money)
    //     })
    //     return Number(money)
    // },
    // tax_money(){
    //     let money=0
    //     this.detail.details.forEach((items,index)=>{
    //         money=new Big(money).plus(items.tax_amount)
    //     })
    //     return Number(money)
    // }
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData(id) {
      notice_nb_billing_view(id).then(res => {
        if (res && res.code == 0) {
          this.total_money = 0
          this.tax_money = 0
          res.data.notice.details.forEach((items, index) => {
            if(res.data.notice.type==2){
              items.tax = items.red_invoice_related.tax
              if(items.total_money&&items.tax){
                items.excluding_tax_amount =Number('-'+items.red_invoice_related.excluding_tax_amount.toString())
                items.tax_amount = Number('-'+items.red_invoice_related.tax_amount.toString())
                this.total_money = Number(new Big(this.total_money).plus(items.total_money));
                this.tax_money = Number(new Big(this.tax_money).plus(items.tax_amount));
              }
            }else{
              // items.tax = res.enum.invoice_info.filter(i => {
              //   return i.id == items.saler_contract_detail.invoice_type_id;
              // })[0].rate;
              if(items.total_money&&items.tax){
                items.excluding_tax_amount = Number(new Big(items.total_money).div(Number(items.tax)+1)).toFixed(2)
                items.tax_amount = Number(new Big(items.total_money).minus(items.excluding_tax_amount)).toFixed(2)
                this.total_money = Number(new Big(this.total_money).plus(items.total_money));
                this.tax_money = Number(new Big(this.tax_money).plus(items.tax_amount));
              }
            }
            items.package = items.cas
          });
          this.saler_contracts = res.data.saler_contracts;
          this.detail_ = JSON.parse(JSON.stringify(res.data.notice));
          this.detail = res.data.notice;
          this.detail.invoice_date = init();
          this.invoice_type = res.enum.invoice_type;
          this.units = res.enum.units;
          this.currencys = res.enum.currencys;
          this.invoice_status_info = res.enum.invoice_status_info;
          this.statuses = res.enum.statuses
          this.type_info = res.enum.type_info
        }
      });
    },
    refund(id){
      rollback_invoice(id).then(res => {
          if (res && res.code === 0) {
              this.$message({
                  message: 'success',
                  type: 'success'
              })
              this.fetchData(this.$route.query.id)
          } else {
              this.$message({
                  message: res.msg,
                  type: 'error'
              })
          }
      })
    },
    change_quantity(items) {
      items.total_money = new Big(items.quantity).times(items.price);
      items.tax_amount = new Big(items.total_money).times(items.tax);
      items.excluding_tax_amount = new Big(items.total_money).minus(
        items.tax_amount
      );
      this.total_money = 0
      this.tax_money = 0
      this.detail.details.forEach(res=>{
        this.total_money += Number(res.total_money)
        this.tax_money += Number(res.tax_amount)
      })
    },
    change_price(items) {
      items.total_money = new Big(items.quantity).times(items.price);
      items.tax_amount = new Big(items.total_money).times(items.tax);
      items.excluding_tax_amount = new Big(items.total_money).minus(
        items.tax_amount
      );
      this.total_money = 0
      this.tax_money = 0
      this.detail.details.forEach(res=>{
        this.total_money += Number(res.total_money)
        this.tax_money += Number(res.tax_amount)
      })
    },
    change_tax(items) {
      items.total_money = new Big(items.quantity).times(items.price);
      items.tax_amount = new Big(items.total_money).times(items.tax);
      items.excluding_tax_amount = new Big(items.total_money).minus(
        items.tax_amount
      );
      this.total_money = 0
      this.tax_money = 0
      this.detail.details.forEach(res=>{
        this.total_money += Number(res.total_money)
        this.tax_money += Number(res.tax_amount)
      })
    },
    declare(id) {
      if(this.detail.details.length>1){
        this.detail.details.forEach((items, index) => {
          if (items.id == id) {
            this.detail.details.splice(index, 1);
          }
        });
        this.total_money = 0
        this.tax_money = 0
        this.detail.details.forEach(res=>{
          this.total_money += Number(res.total_money)
          this.tax_money += Number(res.tax_amount)
        })
      }
    },
    save() {
      this.form = {
        invoice_notice_id: this.detail.id,
        customer_id: this.detail.customer_id,
        customer_name: this.detail.customer_name,
        company_name: this.detail.company_name,
        duty_paragraph: this.detail.duty_paragraph,
        address: this.detail.address,
        mobile: this.detail.mobile,
        opening_bank: this.detail.opening_bank,
        bank_account_number: this.detail.bank_account_number,
        invoice_type: this.detail.invoice_type,
        invoice_date: this.detail.invoice_date,
        invoice_number: this.detail.invoice_number,
        total_money: this.total_money,
        tax_money: this.tax_money,
        currency_id: this.detail.currency_id,
        remark: this.remark,
        type:this.detail.type,
        tax:this.detail.tax,
        receive_invoice_email:this.detail.receive_invoice_email&&this.detail.invoice_type==3?this.detail.receive_invoice_email:''
      };
      let detail = [];
      this.detail.details.forEach((items, index) => {
        detail.push({
          invoice_notice_id: items.invoice_notice_id,
          invoice_notice_detail_id: items.id,
          contract_detail_id: items.contract_detail_id,
          saler_contract_id: items.saler_contract_id,
          contract_number: items.contract_number,
          cas: items.cas,
          package:items.package,
          product_name: items.product_name,
          quantity: items.quantity,
          quantity_unit: items.quantity_unit,
          price: items.price,
          total_money: items.total_money,
          tax: items.tax,
          tax_amount: items.tax_amount?items.tax_amount:'0',
          excluding_tax_amount: items.excluding_tax_amount?items.excluding_tax_amount:'0',
          currency_id: items.currency_id,
          invoice_number: this.detail.invoice_number,
          remark: items.remark,
          tax:items.tax
        });
      });
      this.form.detail = detail;
      this.save_fy = true
      notice_nb_billing(this.form, this);
    },
    close(){
      var that = this
        that.$router.push({
        path: '/finance/sale_invoice_internal',
        name: 'finance-sale_invoice_internal'
      });
      const tagName = "finance-sale_invoice_internal_detail";
        that.closeAdd({ tagName });
    }
  }
};
function init() {
  var date = new Date();
  //年
  var year = date.getFullYear();
  //月
  var month = date.getMonth() + 1;
  //日
  var day = date.getDate();
  month = month < 10 ? "0" + month : month; //如果小于10即显示为09月
  day = day < 10 ? "0" + day : day; //如果小于10即显示为09日

  return year + "-" + month + "-" + day;
}
</script>

