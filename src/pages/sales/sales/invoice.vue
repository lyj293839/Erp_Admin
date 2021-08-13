<style lang="scss" scoped type="text/scss">
.form_title {
  background: #f1f1f1;
  margin-bottom: 0px;
  .el-button {
    color: black;
  }
}
/deep/ table {
  width: 100%;
  border-collapse: collapse;
  .el-input__inner {
    border: 0px;
    padding: 0px;
  }
  td,th {
    padding: 5px;
    line-height: 30px;
    font-size: 14px;
  }
}
.table_f{
  table{
    td{
      line-height: 20px;
      word-break: break-all;
      /deep/.el-input__inner{
        padding: 0px 5px;
      }
    }
  }
}
.radio_group{
  /deep/ .el-radio__label{padding-left: 0px !important;}
}
</style>
<template>
  <d2-container>
    <el-form label-width="0px" label-position="right">
      <el-form-item class="form_title">
        <el-button type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale172')}}</b> <!-- 合同方 -->
        </el-button>
      </el-form-item>
      <el-form-item>
        <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
          <tr>
            <th>{{$t('sale.add.sale172')}}</th>
            <!-- 合同方 -->
            <th>{{$t('sale.add.sale3')}}</th>
            <!-- 名称 -->
            <th>{{$t('sale.add.sale4')}}</th>
            <!-- 联系人 -->
            <th>{{$t('sale.add.sale5')}}</th>
            <!-- 联系电话 -->
            <th>{{$t('sale.add.sale6')}}</th>
            <!-- 传真 -->
          </tr>
          <tr>
            <td>{{$t('sale.add.sale102')}}</td>
            <!-- 需方 -->
            <td>
              <span v-if="data.saler_contract">
                <span v-if="data.saler_contract.customer_name2&&data.saler_contract.customer_name2!=data.saler_contract.customer_name">{{data.saler_contract.customer_name2}}</span>
                <span v-else>{{data.saler_contract.customer_name}}</span>
              </span>
            </td>
            <td>{{data.saler_contract?data.saler_contract.customer_contact:''}}</td>
            <td>{{data.saler_contract?data.saler_contract.customer_mobile:''}}</td>
            <td>{{data.saler_contract?data.saler_contract.customer_fax:''}}</td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale103')}}</td>
            <!-- 需方 -->
            <td>
              <span v-if="data.saler_contract">
                <span>{{data.saler_contract.corp_name}}</span>
              </span>
            </td>
            <td>{{data.saler_contract?data.saler_contract.corp_contact:''}}</td>
            <td>{{data.saler_contract?data.saler_contract.corp_mobile:''}}</td>
            <td>{{data.saler_contract?data.saler_contract.corp_fax:''}}</td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale286')}}</b> <!-- 开票记录 -->
        </el-button>
      </el-form-item>
      <el-form-item class="table_f">
        <div v-if="invoice_notice_list.length>0" v-for="item in invoice_notice_list">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="width: 100%;margin-top: 20px;"
          >
            <tr style="background:#EAF2F7;">
              <th width="150">{{$t('sale.add.sale160')}}</th> <!-- 申请时间 -->
              <th width='80'>税率</th>
              <th width="100">{{$t('sale.add.sale25')}}</th> <!-- 发票类型 -->
              <th width="150">{{$t('sale.add.sale239')}}</th> <!-- 开票金额 -->
              <th>{{$t('sale.add.sale59')}}</th> <!-- 备注 -->
              <th width="100">{{$t('sale.add.sale105')}}</th> <!-- 审核状态 -->
              <th width="200">{{$t('sale.add.sale240')}}</th> <!-- 开票状态 -->
              <th width="200">{{$t('sale.add.sale181')}}</th> <!-- 处理状态 -->
            </tr>
            <tr>
              <td>{{item.created_at}}</td>
              <td>{{item.tax}}</td>
              <td>{{getEnumValue(invoice_type,item.invoice_type)}}</td>
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
              <td>
                <el-select
                  v-model="item_a.invoice_type"
                  size="mini"
                  clearable
                  filterable
                  style="width:100%;"
                >
                  <el-option
                    v-for="(i,index) in invoice_type"
                    :key="index"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </td>
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
              <td width="100">{{$t('sale.add.sale44')}}</td><!-- 合同号 -->
              <td width="100">CAS</td>
              <td width="280">{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
              <td width='90'>{{$t('sale.add.sale18')}}</td><!-- 数量 -->
              <td width="80">{{$t('sale.add.sale19')}}</td><!-- 数量单位 -->
              <td width="90">{{$t('sale.add.sale21')}}</td><!-- 单价 -->
              <td>{{$t('sale.add.sale12')}}</td><!-- 金额 -->
              <td>{{$t('sale.add.sale245')}}</td><!-- 税率 -->
              <td>{{$t('sale.add.sale246')}}</td><!-- 税额 -->
              <td>{{$t('sale.add.sale98')}}</td><!-- 不含税金额 -->
              <td width="180">{{$t('sale.add.sale59')}}</td><!-- 备注 -->
            </tr>
            <tr v-if="item_a.invoice_details&&item_a.invoice_details.length>0" v-for="i in item_a.invoice_details">
              <td>{{i.contract_number}}</td>
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
              <td><b>总计:</b></td>
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
        <el-button type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale102')}}</b> <!-- 需方 -->
        </el-button>
      </el-form-item>
      <el-form-item>
        <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
          <tr >
            <th width='150'>
              <span style="color:red;">*</span>
              发票类型
            </th>
            <!-- 发票类型 -->
            <th>{{$t('sale.add.sale173')}}</th>
            <!-- 发票信息 -->
            <th>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale174')}}
            </th>
            <!-- 公司名称 -->
            <th>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale175')}}
            </th>
            <!-- 税号 -->
            <th>税率</th>
          </tr>
          <tr>
            <td>
              <el-select size="mini" v-model="form.invoice_type" @change="invoice_type_change(form.invoice_type)" clearable>
                <el-option
                  v-for="item in invoice_type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-select
                size="mini"
                v-model="select_invoice"
                @change="select(select_invoice)"
                clearable
                style="width:100%;"
              >
                <el-option
                  v-for="item in data.invoices"
                  :key="item.id"
                  :label="item.info"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input size="mini" v-model="form.company_name" disabled></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="form.duty_paragraph"></el-input>
            </td>
            <td>
              <el-select size="mini" v-model="form.tax" @change="tax_change()">
                <el-option v-for="item in tax_info" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <th><span style="color:red;" v-if="invoice_type_is">*</span>{{$t('sale.add.sale73')}}</th>
            <!-- 电话 -->
            <th><span style="color:red;" v-if="invoice_type_is">*</span>{{$t('sale.add.sale71')}}</th>
            <!-- 地址 -->
            <th><span style="color:red;" v-if="invoice_type_is">*</span>{{$t('sale.add.sale142')}}</th>
            <!-- 开户行 -->
            <th><span style="color:red;" v-if="invoice_type_is">*</span>{{$t('sale.add.sale150')}}</th>
            <!-- 银行账号 -->
            <th width='120'>是否虚拟开票</th>
          </tr>
          <tr>
            <td>
              <el-input size="mini" v-model="form.mobile"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="form.address"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="form.opening_bank"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="form.bank_account_number"></el-input>
            </td>
            <td class="radio_group">
              <el-radio-group v-model="form.is_virtual" size="small">
                <el-radio v-for="item in is_virtual_info" :label="item.id">
                  {{item.name}}
                  <el-tooltip class="item" effect="dark" content="使用场景：不含税合同在系统中做成含税合同，选择虚拟开票" placement="top-end">
                    <i v-if="item.id==2" class="el-icon-info" style="color:#E6A23C;font-size:16px;margin-top:3px;"></i>
                  </el-tooltip>
                </el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr v-show="invoice_email_is">
            <th><span style="color:red;">*</span>接收电子发票的邮箱:</th>
            <td colspan="8">
              <el-input size="mini" v-model="form.receive_invoice_email"></el-input>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale180')}}</b> <!-- 开票明细 -->
        </el-button>
      </el-form-item>
      <el-form-item>
        <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
          <tr >
            <th width='120'>{{$t('sale.add.sale44')}}</th>
            <!-- 合同号 -->
            <th width='100'>
              <span style="color:red;">*</span>CAS No.
            </th>
            <th>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale15')}}
            </th>
            <!-- 产品名称 -->
            <th width='100'>
              {{$t('sale.add.sale16')}}
            </th>
            <th width='60'>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale18')}}
            </th>
            <!-- 数量 -->
            <th width='60'>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale19')}}
            </th>
            <!-- 单位 -->
            <th width='60'>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale21')}}
            </th>
            <!-- 单价 -->
            <th width='90'>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale22')}}
            </th>
            <!-- 金额 -->
            <th width='80'>
              <span style="color:red;" width="80">*</span>
              {{$t('sale.add.sale176')}}
            </th>
            <!-- 发票税率 -->
            <!-- <th>{{$t('sale.add.sale59')}}</th> -->
            <!-- 备注 -->
            <th width='40'>{{$t('sale.add.sale177')}}</th>
            <!-- 选择 -->
          </tr>
          <tr v-for="item in data.saler_contract_details">
            <td>{{item.contract_number}}</td>
            <td>
              <el-input size="mini" v-model="item.cas" style="width:80%;"></el-input>
              <el-tooltip placement="top" v-if="item.prod.is_danger_inland">
                  <div slot="content">
                      <span>{{getEnumValue(danger_inland_status,item.prod.is_danger_inland)}}</span>
                  </div>
                  <i class="el-icon-bell" style="font-weight: bold;color: red;"></i>
              </el-tooltip>
            </td>
            <td>
              <el-input size="mini" v-model="item.product_name_cn"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="item.package"></el-input>
            </td>
            <td>
              <el-input
                size="mini"
                v-model="item.quantity"
                @input="change_quantity(item.checked,item.id)"
              ></el-input>
            </td>
            <td>
              <el-select size="mini" v-model="item.quantity_unit" clearable>
                <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </td>
            <td>
              <el-input
                size="mini"
                v-model="item.price"
                @input="change_price(item.checked,item.id)"
              ></el-input>
            </td>
            <td>
              <el-input
                size="mini"
                v-model="item.total_money"
                @input="change_total_money(item.checked,item.id)"
              ></el-input>
            </td>
            <td>
              <!-- {{getEnumValue(invoice_info,item.invoice_type_id)}} -->
              <el-select size="mini" v-model="item.tax" disabled>
                <el-option v-for="item in tax_info" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </td>
            <!-- <td>
              <el-input size="mini" v-model="item.remark"></el-input>
            </td> -->
            <td>
              <el-checkbox v-model="item.checked" @change="selected(item.checked,item.id)"></el-checkbox>
            </td>
          </tr>
          <tr>
            <td>备注：</td>
            <td colspan="6">
              <el-input size="mini" v-model="form.remark"></el-input>
            </td>
            <td>
              <span>{{total_money}}</span>
            </td>
            <td colspan="3"></td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button type="primary" :loading='loading' @click="save()" size="mini">{{$t('save')}}</el-button>
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
  </d2-container>
</template>

<script>
import Big from "@/big/a/big.mjs";
import { billing_application_view, billing_application } from "@/api/sale";
import { mapActions } from "vuex";
export default {
  name: "sales-invoice",
  data() {
    return {
      data: {},
      invoice_type: [],
      invoice_info: [],
      invoice_notice_list: [],
      currencys: [],
      units: [],
      select_invoice: "",
      money: [],
      total_money: 0,
      is_school:'',
      loading:false,
      invoice_email_is:false,
      form: {
        customer_id: "",
        customer_name: "",
        saler_contract_ids: "",
        company_name: "",
        duty_paragraph: "",
        address: "",
        mobile: "",
        opening_bank: "",
        bank_account_number: "",
        invoice_type: "",
        remark: "",
        currency_id: "",
        total_money: "",
        detail: [],
        remark:'',
        receive_invoice_email:'',
        tax:0.13,
        is_virtual:1
      },
      one: false,
      show_invoice: true,
      dialogSchool:false,
      invoice_type_is:true,
      status_info: [],
      deal_status_info: [],
      invoice_notice_return_statuses: [],
      statuses:[],
      invoice_status_info:[],
      invoice_notice_status:[],
      danger_inland_status:[],
      tax_info:[{name:0.13}],
      is_virtual_info:[]
    };
  },
  created() {
    if (this.$route.query.ids) {
      this.fetchData();
    }
    if (this.$route.query.type == 2) {
      this.one = true;
    } else {
      this.one = false;
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-invoice") {
        if (this.$route.query.ids) {
          this.fetchData();
        }
        if (this.$route.query.type == 2) {
          this.one = true;
        } else {
          this.one = false;
        }
      }
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["close"]),
    fetchData() {
      let obj = {
        ids: JSON.parse(this.$route.query.ids),
        type: this.$route.query.type
      };
      billing_application_view(obj, this).then(res => {
        this.form = {
          customer_id: "",
          customer_name: "",
          saler_contract_ids: "",
          company_name: "",
          duty_paragraph: "",
          address: "",
          mobile: "",
          opening_bank: "",
          bank_account_number: "",
          receive_invoice_email:'',
          invoice_type: "",
          remark: "",
          currency_id: "",
          total_money: "",
          detail: [],
          is_virtual:1,
          tax:0.13
        }
        res.data.invoices.forEach((items, index) => {
          // items.info = items.company_name + "," + items.address;
          items.info = items.duty_paragraph + (items.address?(','+items.address):'');
        });
        let money = 0;
        res.data.saler_contract_details.forEach((items, index) => {
          items.remark = "";
          items.checked = true;
          money = new Big(money).plus(items.total_money).toFixed(4);
          items.package = items.cas
          items.tax = 0.13
        });
        // res.data.saler_contract_details.forEach((items, index) => {
          // items.total_money = Number(
          //   new Big(items.quantity)
          //     .times(items.price)
          //     .plus(items.additional_cost)
          // ).toFixed(4);
          // items.price = Number(
          //   new Big(items.total_money).div(items.quantity)
          // ).toFixed(4);
          // money = new Big(money).plus(items.total_money).toFixed(4);
        // });
        if(res.data.saler_contract_details[0].invoice_type_id==9){
          this.form.invoice_type = 3;
        }else{
          this.form.invoice_type = res.enum.invoice_type[0].id;
        }
        this.select_invoice = "";
        this.form.total_money = Number(money)
        this.total_money = Number(money);
        this.data = res.data;
        this.invoice_notice_list = res.data.invoice_notice_list;
        this.invoice_type = res.enum.invoice_type;
        this.invoice_info = res.enum.invoice_info;
        this.currencys = res.enum.currencys;
        this.units = res.enum.units;
        this.status_info = res.enum.status_info;
        this.deal_status_info = res.enum.deal_status_info;
        this.invoice_notice_return_statuses =
          res.enum.invoice_notice_return_statuses;
        this.invoice_status_info = res.enum.invoice_status_info
        this.statuses = res.enum.statuses
        this.invoice_notice_status = res.enum.invoice_notice_status
        this.danger_inland_status = res.enum.danger_inland_status
        this.tax_info = res.enum.tax_info
        this.is_school = res.data.is_school
        this.is_virtual_info = res.enum.is_virtual_info
        if(this.data.saler_contract){
          if(this.data.saler_contract.customer_name2&&this.data.saler_contract.customer_name2!=this.data.saler_contract.customer_name){
            this.form.company_name = this.data.saler_contract.customer_name2
          }else{
            this.form.company_name = this.data.saler_contract.customer_name
          }
        }else{
          this.form.company_name = ''
        }
        if(this.form.invoice_type==3){
          this.invoice_email_is = true
        }else{
          this.invoice_email_is = false
        }
        if(this.form.invoice_type==1){
          this.invoice_type_is = true
        }else{
          this.invoice_type_is = false
        }
      });
    },
    save() {
      this.form.detail = [];
      this.form.customer_id = this.data.saler_contract.customer_id2?this.data.saler_contract.customer_id2:this.data.saler_contract.customer_id;
      this.form.currency_id = this.data.saler_contract.currency_id;
      this.form.customer_name = this.data.saler_contract.customer_name2?this.data.saler_contract.customer_name2:this.data.saler_contract.customer_name;
      // this.form.saler_contract_ids = JSON.parse(this.$route.query.ids);
      this.form.saler_contract_ids = []
      this.data.saler_contract_details.forEach((items, index) => {
        if (items.checked) {
          this.form.detail.push({
            saler_contract_id: items.saler_contract_id,
            contract_detail_id: items.id,
            contract_number: items.contract_number,
            cas: items.cas,
            prod_id: items.prod_id,
            product_name: items.product_name_cn?items.product_name_cn:items.prod.name_cn,
            quantity: items.quantity,
            quantity_unit: items.quantity_unit,
            currency_id: items.currency_id,
            price: items.price,
            total_money: items.total_money,
            remark: items.remark,
            invoice_type_id: items.invoice_type_id,
            package:items.package,
            is_danger_inland:items.prod?items.prod.is_danger_inland:'',
            tax:items.tax
          });
          this.form.saler_contract_ids.push(items.saler_contract_id)
        }
      });
      this.form.type = 1
      this.form.total_money = this.total_money;
      const tagName = "sales-invoice";
      if(this.is_school&&this.form.invoice_type==1){
        this.dialogSchool = true
      }else{
        this.loading = true
        billing_application(this.form, this, tagName);
      }
    },
    tax_change(){
      this.data.saler_contract_details.forEach(item=>{
        item.tax = this.form.tax
      })
    },
    save_sure(){
      this.dialogSchool = false
      const tagName = "sales-invoice";
      this.loading = true
      billing_application(this.form, this, tagName);
    },
    invoice_type_change(item){
      if(item==1){
        this.invoice_type_is = true
        this.invoice_email_is = false
        this.form.receive_invoice_email = ''
      }else if(item==3){
        this.invoice_email_is = true
        this.invoice_type_is = false
      }else{
        this.invoice_type_is = false
        this.invoice_email_is = false
        this.form.receive_invoice_email = ''
      }
    },
    selected(checked, id) {
      if (checked) {
        this.money = [];
        this.money.push(id);
        // let num=0
        // this.data.saler_contract_details.forEach((items, index) => {
        //     this.money.forEach((m,n)=>{
        //         if(items.id==m){
        //             num=new Big(num).plus(items.total_money).toFixed(4)
        //         }
        //     })
        // })
        // this.total_money=Number(num)
      } else {
        // let num=0
        this.money.forEach((items, index) => {
          if (items == id) {
            this.money.splice(index, 1);
          }
        });
        // this.data.saler_contract_details.forEach((items, index) => {
        //     this.money.forEach((m,n)=>{
        //         if(items.id==m){
        //             num=new Big(num).plus(items.total_money).toFixed(4)
        //         }
        //     })
        // })
        // this.total_money=Number(num)
      }
      this.total_money = 0;
      this.data.saler_contract_details.forEach(items => {
        if (items.checked) {
          this.total_money = new Big(this.total_money)
            .plus(items.total_money)
            .toFixed(4);
        }
      });
    },
    change_quantity(checked, id) {
      let money = 0;
      this.data.saler_contract_details.forEach((items, index) => {
        if(items.id==id){
          items.total_money = new Big(items.quantity)
          .times(items.price)
          .toFixed(4);
        }
        money = new Big(money).plus(items.total_money).toFixed(4);
      });
      this.form.total_money = Number(money);
      this.selected(checked, id);
    },
    change_price(checked, id) {
      let money = 0;
      this.data.saler_contract_details.forEach((items, index) => {
        if(items.id==id){
          items.total_money = new Big(items.quantity)
          .times(items.price)
          .toFixed(4);
        }
        money = new Big(money).plus(items.total_money).toFixed(4);
      });
      this.form.total_money = Number(money);
      this.selected(checked, id);
    },
    change_total_money(checked, id) {
      let money = 0;
      this.data.saler_contract_details.forEach((items, index) => {
        if(items.id==id){
          items.price = new Big(items.total_money).div(items.quantity).toFixed(4);
        }
        money = new Big(money).plus(items.total_money).toFixed(4);
      });
      this.form.total_money = Number(money);
      this.selected(checked, id);
    },
    select(id) {
      // this.form.company_name = this.data.invoices.filter(i => {
      //   return i.id == id;
      // })[0].company_name;
      this.form.duty_paragraph = this.data.invoices.filter(i => {
        return i.id == id;
      })[0].duty_paragraph;
      this.form.address = this.data.invoices.filter(i => {
        return i.id == id;
      })[0].address;
      this.form.mobile = this.data.invoices.filter(i => {
        return i.id == id;
      })[0].mobile;
      this.form.opening_bank = this.data.invoices.filter(i => {
        return i.id == id;
      })[0].opening_bank;
      this.form.bank_account_number = this.data.invoices.filter(i => {
        return i.id == id;
      })[0].bank_account_number;
      this.form.receive_invoice_email = this.data.invoices.filter(i => {
        return i.id == id;
      })[0].receive_invoice_email;
    }
  }
};
</script>