<style lang="scss" scoped type="text/scss">
/deep/table{
    border-collapse: collapse;
    width: 100%;
    line-height: 26px;
    margin:10px;
    td{
      text-align: center;
      line-height: 22px;
    }
    .el-input__inner {
      border: 0px;
      padding: 0px 0px;
    }
}
.form_title {
    background: #f1f1f1;
    margin-bottom: 0px;
    .el-button {
      color: black;
    }
  }
</style>
<template>
  <d2-container>
    <div>
        <el-form label-width="0px">
          <el-form-item class="form_title">
              <el-button @click="form_show4 = !form_show4" type="text" icon="el-icon-arrow-down">
                  <b>红字发票开票记录</b>
              </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4">
            <div v-if="red_invoice_list.length>0" v-for="item in red_invoice_list">
              <table
                border="1"
                bordercolor="#E5E5E5"
                style="width: 100%;margin-top: 20px;"
              >
                <tr style="background:#EAF2F7;">
                  <th width='80'>开票分类</th>
                  <th width="150">{{$t('sale.add.sale160')}}</th> <!-- 申请时间 -->
                  <th width="100">{{$t('sale.add.sale25')}}</th> <!-- 发票类型 -->
                  <th width='60'>税率</th>
                  <th width="150">{{$t('sale.add.sale239')}}</th> <!-- 开票金额 -->
                  <th>{{$t('sale.add.sale59')}}</th> <!-- 备注 -->
                  <th width="100">{{$t('sale.add.sale105')}}</th> <!-- 审核状态 -->
                  <th width="200">{{$t('sale.add.sale240')}}</th> <!-- 开票状态 -->
                  <th width="200">{{$t('sale.add.sale181')}}</th> <!-- 处理状态 -->
                </tr>
                <tr>
                  <td>
                    <span v-if="item.type==1" style="color:green;">{{getEnumValue(type_info,item.type)}}</span>
                    <span v-else style="color:red;">{{getEnumValue(type_info,item.type)}}</span>
                  </td>
                  <td>{{item.created_at}}</td>
                  <td>{{getEnumValue(invoice_type,item.invoice_type)}}</td>
                  <td>{{item.tax}}</td>
                  <td>{{item.total_money}}</td>
                  <td>{{item.remark}}</td>
                  <td>
                    <span
                      v-if="item.status==3"
                      style="color:red;"
                    >{{getEnumValue(status_info,item.status)}}</span>
                    <span v-else-if="item.status==2" style="color:green;">{{getEnumValue(status_info,item.status)}}</span>
                    <span v-else style="color:#E6A23C;">{{getEnumValue(status_info,item.status)}}</span>
                  </td>
                  <td>
                    <span v-if="item.invoice_status==2" style="color:green;">{{getEnumValue(invoice_notice_status,item.invoice_status)}}</span>
                    <span v-else-if="item.invoice_status==10" style="color:red;">{{getEnumValue(invoice_notice_status,item.invoice_status)}}</span>
                    <span v-else>{{getEnumValue(invoice_notice_status,item.invoice_status)}}</span>
                  </td>
                  <td>
                    <span :style="(item.deal_status==2)?'color:green;':'color:red;'">{{getEnumValue(deal_status_info,item.deal_status)}}</span>
                  </td>
                </tr>
              </table>
              <table
                border="1"
                bordercolor="#E5E5E5"
                v-if="item.invoices.length>0"
                v-for="item_a in item.invoices"
              >
                <tr style="background:#F5F8FB;">
                  <td>{{$t('sale.add.sale242')}}</td> <!-- 发票号码 -->
                  <td>{{$t('sale.add.sale243')}}</td> <!-- 通知单ID -->
                  <td>{{$t('sale.add.sale174')}}</td> <!-- 公司名称 -->
                  <td>{{$t('sale.add.sale25')}}</td> <!-- 发票类型 -->
                  <td>税率</td>
                  <td>{{$t('sale.add.sale244')}}</td> <!-- 发票日期 -->
                  <td>{{$t('sale.add.sale175')}}</td> <!-- 税号 -->
                  <td colspan="2">{{$t('sale.add.sale287')}}</td> <!-- 地址电话 -->
                  <td colspan="2">{{$t('sale.add.sale150')}}</td> <!-- 银行账号 -->
                  <td>{{$t('sale.add.sale181')}}</td><!-- 处理状态 -->
                </tr>
                <tr>
                  <td>{{item_a.invoice_number}}</td>
                  <td>{{item_a.invoice_notice_id}}</td>
                  <td>{{item_a.company_name}}</td>
                  <td>{{getEnumValue(invoice_type,item_a.invoice_type)}}</td>
                  <td>{{item_a.tax}}</td>
                  <td>{{item_a.invoice_date}}</td>
                  <td>{{item.duty_paragraph}}</td>
                  <td colspan="2">
                    <span>{{item.address}}</span>
                    <br />
                    <span>{{item.mobile}}</span>
                  </td>
                  <td colspan="2">{{item.bank_account_number}}</td>
                  <td>
                    <span :style="(item_a.status==2)?'color:red;':'color:green;'">{{getEnumValue(statuses,item_a.status)}}</span>
                  </td>
                </tr>
                <tr v-if="item_a.invoice_details&&item_a.invoice_details.length>0" style="background:#F5F8FB;">
                  <td width="120">
                    {{$t('sale.add.sale44')}}
                    <span v-if="item.type==2">/原发票号</span>
                  </td><!-- 合同号 -->
                  <td width="100">CAS</td>
                  <td width="280">{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
                  <td width='90'>{{$t('sale.add.sale18')}}</td><!-- 数量 -->
                  <td width="80">{{$t('sale.add.sale19')}}</td><!-- 数量单位 -->
                  <td width='90'>{{$t('sale.add.sale21')}}</td><!-- 单价 -->
                  <td>{{$t('sale.add.sale12')}}</td><!-- 金额 -->
                  <td>{{$t('sale.add.sale245')}}</td><!-- 税率 -->
                  <td>{{$t('sale.add.sale246')}}</td><!-- 税额 -->
                  <td>{{$t('sale.add.sale98')}}</td><!-- 不含税金额 -->
                  <td width="180">{{$t('sale.add.sale59')}}</td><!-- 备注 -->
                </tr>
                <tr v-if="item_a.invoice_details&&item_a.invoice_details.length>0" v-for="i in item_a.invoice_details">
                  <td>
                    {{i.contract_number}}<br>
                    <span v-if="item.type==2">{{i.related_invoice_number}}</span>
                  </td>
                  <td>{{i.cas}}</td>
                  <td>{{i.product_name}}</td>
                  <td>{{i.quantity}}</td>
                  <td>{{getEnumValue(units,i.quantity_unit)}}</td>
                  <td>{{i.price}}</td>
                  <td>{{i.total_money}}</td>
                  <td>{{i.tax}}</td>
                  <td>{{i.tax_amount}}</td>
                  <td>{{i.excluding_tax_amount}}</td>
                  <td>{{i.remark}}</td>
                </tr>
                <tr>
                  <td><b>{{$t('sale.add.sale259')}}:</b></td>
                  <td colspan="5"></td>
                  <td>{{item_a.total_money}}</td>
                  <td></td>
                  <td>{{item_a.tax_money}}</td>
                  <td colspan="2"></td>
                </tr>
              </table>
            </div>
          </el-form-item>
          <el-form-item class="form_title">
              <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
                  <b>开票详情</b>
              </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1">
            <table border="1" bordercolor="#E5E5E5" v-for="(item,index) in list">
              <tr style="background:#F4F9FC;">
                <th width='120'>发票号码</th>
                <th width='120'>发票类型/税率</th>
                <th width='180'>客户名称</th>
                <th width='180'>公司开票名称</th>
                <th width='90'>开票时间</th>
                <th colspan="2" width='120'>税号</th>
                <th colspan="2">地址电话</th>
                <th width='180'>银行账号</th>
              </tr>
              <tr>
                <td>{{item.invoice_number}}</td>
                <td>{{getEnumValue(invoice_type,item.invoice_type)}}/<br>{{item.tax}}</td>
                <td>{{item.customer_name}}</td>
                <td>{{item.company_name}}</td>
                <td>{{item.created_at}}</td>
                <td colspan="2">{{item.duty_paragraph}}</td>
                <td colspan="2">{{item.address}}<br>{{item.mobile}}</td>
                <td>{{item.opening_bank}}<br>{{item.bank_account_number}}</td>
              </tr>
              <tr>
                <th class="td">合同号</th>
                <th class="td">CAS</th>
                <th class="td">产品名称</th>
                <th class="td">规格</th>
                <th class="td">数量</th>
                <th class="td" width='60'>单位</th>
                <th class="td" width='100'>单价</th>
                <th class="td" >金额</th>
                <th class="td" >货币符号</th>
                <th class="td" >操作</th>
              </tr>
              <tr v-for="(i,index_i) in item.invoice_details">
                <td>{{i.contract_number}}</td>
                <td>{{i.cas}}</td>
                <td>{{i.product_name}}</td>
                <td >{{i.package}}</td>
                <td >{{i.quantity}}</td>
                <td >{{getEnumValue(units,i.quantity_unit)}}</td>
                <td>{{i.price}}</td>
                <td >{{i.total_money}}</td>
                <td >{{getEnumValue(currencys,i.currency_id)}}</td>
                <td>
                  <el-checkbox v-model="i.checked" @change="select_one()"></el-checkbox>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item class="form_title">
              <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
                  <b>红字发票</b>
              </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2">
            <table border="1" bordercolor="#E5E5E5">
              <tr style="background:#F4F9FC;">
                <th width='120'>发票类型</th>
                <th width='60'>税率</th>
                <th width='180'>客户名称</th>
                <th width='120'>税号</th>
                <th><span style="color:red;" v-if="red_list.invoice_type==1">*</span>地址</th>
                <th><span style="color:red;" v-if="red_list.invoice_type==1">*</span>电话</th>
                <th><span style="color:red;" v-if="red_list.invoice_type==1">*</span>开户银行</th>
                <th><span style="color:red;" v-if="red_list.invoice_type==1">*</span>账号</th>
              </tr>
              <tr>
                <td>
                  <el-select size="mini" v-model="red_list.invoice_type" clearable disabled>
                    <el-option
                      v-for="item in invoice_type"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>{{red_list.tax}}</td>
                <td>{{red_list.customer_name}}</td>
                <td>
                  {{red_list.duty_paragraph}}
                </td>
                <td><el-input size="mini" style="width: 100%;" v-model="red_list.address" clearable></el-input></td>
                <td><el-input size="mini" style="width: 100%;" v-model="red_list.mobile" clearable></el-input></td>
                <td><el-input size="mini" style="width: 100%;" v-model="red_list.opening_bank" clearable></el-input></td>
                <td><el-input size="mini" style="width: 100%;" v-model="red_list.bank_account_number" clearable></el-input></td>
              </tr>
              <tr v-if="red_list.invoice_type==3">
                <th colspan="2"><span style="color:red;">*</span>接收电子发票的邮箱:</th>
                <td colspan="6">
                  <el-input size="mini" v-model="red_list.receive_invoice_email"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item class="form_title">
              <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
                  <b>红字发票明细</b>
              </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width='150'>合同号</th>
                <th class="td" width='100'>CAS</th>
                <th class="td">产品名称</th>
                <th class="td" width='100'>规格</th>
                <th class="td" width='60'>数量</th>
                <th class="td" width='60'>单位</th>
                <th class="td" width='60'>单价</th>
                <th class="td" width='60'>金额</th>
                <th class="td" width='60'>货币符号</th>
                <th width='100'>发票税率</th>
                <th >备注</th>
              </tr>
              <tr v-for="(i,index) in red_list.invoice_details">
                <td>{{i.contract_number}}</td>
                <td>{{i.cas}}</td>
                <td>{{i.product_name}}</td>
                <td >{{i.package}}</td>
                <td >-
                  <el-input
                    size="mini"
                    v-model="i.quantity"
                    style="width:85%;"
                    @input="change_quantity(i)"
                  ></el-input>
                </td>
                <td >{{getEnumValue(units,i.quantity_unit)}}</td>
                <td>-
                  <el-input
                    size="mini"
                    v-model="i.price"
                    style="width:85%;"
                    @input="change_price(i)"
                  ></el-input>
                </td>
                <td >-
                  <el-input
                    size="mini"
                    v-model="i.total_money"
                    style="width:85%;"
                    @input="change_total_money(i)"
                  ></el-input>
                </td>
                <td >{{getEnumValue(currencys,i.currency_id)}}</td>
                <td>
                  <!-- {{getEnumValue(invoice_info,i.invoice_notice_detail.invoice_type_id)}} -->
                  {{i.tax}}
                </td>
                <td>
                  <el-input size="mini" style="width: 100%;" v-model="i.remark" clearable></el-input>
                </td>
              </tr>
              <tr v-if="red_list.invoice_details.length>0">
                <td><b>备注</b></td>
                <td colspan="5">
                  <el-input size="mini" style="width: 100%;" v-model="red_list.remark" clearable></el-input>
                </td>
                <td><b>总金额</b></td>
                <td colspan="3">-{{red_list.total_money}}</td>
                <td></td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item style="margin:0px;text-align: right;">
            <el-button type="primary" @click="save()" :loading="loading_save" size="mini">{{$t('save')}}</el-button>
            <el-button @click="back()" size="small">返回</el-button>
          </el-form-item>
        </el-form>
        
        <!-- 提示 -->
        <el-dialog title="提示" :visible.sync="dialogSchool" width="30%">
          <div>
            <span style="font-size:16px;">是否确认选择增值税<span style="font-size:18px;color:red;">专票</span></span>
          </div>
          <div style="text-align:right;margin-top:10px;">
            <el-button type="primary" @click="save_sure()" size="mini">确认</el-button>
            <el-button @click="dialogSchool = false" size="mini">{{$t('cancel')}}</el-button>
          </div>
        </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import $ from "jquery";
import {credit_note_invoicing_view,credit_note_invoicing} from "@/api/sale";
import util from "@/libs/util";
import Big from "@/big/a/big.mjs";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-Red_invoice_detail",
  data() {
    return {
      select_invoice:'',
      is_school:'',
      list:[],
      red_list:{invoice_details:[]},
      red_invoice_list:[],
      form_show1:true,
      form_show2:true,
      form_show3:true,
      form_show4:true,
      loading_save:false,
      dialogSchool:false,
      invoice_type:[],
      invoice_info:[],
      units:[],
      currencys:[],
      invoice_notice_status:[],
      deal_status_info:[],
      status_info:[],
      statuses:[],
      type_info:[],
      index_id:''
    };
  },
  watch: {
      $route(to, from) {
          if (to.name=='sales-Red_invoice_detail') {
            this.index_id = JSON.parse(this.$route.query.ids)
          }
      },
      index_id(to,from){
        if(to.ids){
          if(from.ids&&to.ids.toString()!=from.ids.toString()){
            this.fetchData()
          }else if(!from.ids){
            this.fetchData()
          }
        }
      }
  },
  created () {
    if(this.$route.query.ids){
      this.index_id = JSON.parse(this.$route.query.ids)
      this.fetchData()
    }
  },
  methods: {
      ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData(){
      if(this.$route.query.res){
        var res = JSON.parse(this.$route.query.res)
        res.data.invoice_list.forEach(items=>{
          items.info = items.duty_paragraph + (items.address?(','+items.address):'');
          items.invoice_details.forEach(i=>{
            i.checked = false
          })
        })
        this.list = res.data.invoice_list
        this.red_invoice_list = res.data.red_invoice_list
        this.is_school = res.data.is_school
        this.red_list = JSON.parse(JSON.stringify(res.data.invoice_list[0]))
        this.red_list.invoice_details = []
        this.red_list.saler_contract_ids=[]
        this.invoice_type = res.enum.invoice_type
        this.units = res.enum.units
        this.currencys = res.enum.currencys
        this.invoice_info = res.enum.invoice_info
        this.invoice_notice_status = res.enum.invoice_notice_status
        this.deal_status_info = res.enum.deal_status_info
        this.status_info = res.enum.status_info
        this.statuses = res.enum.statuses
        this.type_info = res.enum.type_info
      }
    },
    fetchData_b(){
      credit_note_invoicing_view(JSON.parse(this.$route.query.ids)).then(res=>{
        res.data.invoice_list.forEach(items=>{
          items.info = items.duty_paragraph + (items.address?(','+items.address):'');
          items.invoice_details.forEach(i=>{
            i.checked = false
          })
        })
        this.list = res.data.invoice_list
        this.red_invoice_list = res.data.red_invoice_list
        this.is_school = res.data.is_school
        this.red_list = JSON.parse(JSON.stringify(res.data.invoice_list[0]))
        this.red_list.invoice_details = []
        this.red_list.saler_contract_ids = []
        this.invoice_type = res.enum.invoice_type
        this.units = res.enum.units
        this.currencys = res.enum.currencys
        this.invoice_info = res.enum.invoice_info
        this.invoice_notice_status = res.enum.invoice_notice_status
        this.deal_status_info = res.enum.deal_status_info
        this.status_info = res.enum.status_info
        this.statuses = res.enum.statuses
        this.type_info = res.enum.type_info
      })
    },
    select_one(){
      var list=[]
      var saler_contract_ids = []
      var total_money = 0
      this.list.forEach(item=>{
        item.invoice_details.forEach(i=>{
          if(i.checked){
            list.push(JSON.parse(JSON.stringify(i)))
            saler_contract_ids.push(i.saler_contract_id)
            total_money += Number(i.total_money)
          }
        })
      })
      // list.forEach(i=>{
      //   i.quantity = Number(-i.quantity) 
      //   i.price = Number(-i.price)
      //   i.total_money = Number(-i.total_money)
      // })
      this.red_list.invoice_details = JSON.parse(JSON.stringify(list))
      this.red_list.saler_contract_ids = saler_contract_ids
      this.red_list.total_money = Number(total_money).toFixed(4)
    },
    select(id){
      this.list.forEach(item=>{
        if(item.id == id){
          this.red_list.duty_paragraph = item.duty_paragraph
          this.red_list.address = item.address
          this.red_list.mobile = item.mobile
          this.red_list.opening_bank = item.opening_bank
          this.red_list.bank_account_number = item.bank_account_number
          this.red_list.invoice_type = item.invoice_type
        }
      })
    },
    save(){
      if(this.is_school&&this.red_list.invoice_type==1){
        this.dialogSchool = true
      }else{
        this.loading_save = true
        this.red_list.type = 2
        var obj = JSON.parse(JSON.stringify(this.red_list))
        obj.detail = obj.invoice_details
        obj.detail.forEach(i=>{
          i.invoice_type_id = i.invoice_notice_detail.invoice_type_id
          i.quantity = Number(-i.quantity) 
          i.price = Number(-i.price)
          i.total_money = Number(-i.total_money)
          delete i.invoice_notice_detail
        })
        obj.total_money = Number(-obj.total_money)
        delete obj.invoice_details
        delete obj.contract_numbers
        delete obj.tax_money
        credit_note_invoicing(obj,this)
      }
    },
    save_sure(){
      this.dialogSchool = false
      var obj = JSON.parse(JSON.stringify(this.red_list))
      obj.detail = obj.invoice_details
      obj.detail.forEach(i=>{
        i.invoice_type_id = i.invoice_notice_detail.invoice_type_id
        i.quantity = Number(-i.quantity) 
        i.price = Number(-i.price)
        i.total_money = Number(-i.total_money)
        delete i.invoice_notice_detail
      })
      obj.total_money = Number(-obj.total_money)
      delete obj.invoice_details
      delete obj.contract_numbers
      delete obj.tax_money
      this.loading_save = true
      credit_note_invoicing(obj,this)
    },
    change_quantity(i){
      i.total_money =new Big(i.quantity?i.quantity:0).times(i.price?i.price:0).toFixed(4);
      var total_money = 0
      this.red_list.invoice_details.forEach(item=>{
        total_money += Number(item.total_money)
      })
      this.red_list.total_money = Number(total_money).toFixed(4)
    },
    change_price(i){
      i.total_money =new Big(i.quantity?i.quantity:0).times(i.price?i.price:0).toFixed(4);
      var total_money = 0
      this.red_list.invoice_details.forEach(item=>{
        total_money += Number(item.total_money)
      })
      this.red_list.total_money = Number(total_money).toFixed(4)
    },
    change_total_money(i){
      i.price = new Big(i.total_money?i.total_money:0).div(i.quantity).toFixed(4);
      var total_money = 0
      this.red_list.invoice_details.forEach(item=>{
        total_money += Number(item.total_money)
      })
      this.red_list.total_money = Number(total_money).toFixed(4)
    },
    back(){
      let that=this
        that.$router.push({
        path: "/sales/Red_invoice",
        name: "sales-Red_invoice"
      });
      var tagName = 'sales-Red_invoice_detail'
        that.closeAdd({tagName})
    },
  }
};
</script>

