<style lang="scss" scoped type="text/scss">
/deep/.div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  .el-dialog {
    table {
      width: 100%;
      border-collapse: collapse;
    }
  }
  .el-input__inner {
    border: 0px;
    padding: 0px 0px;
  }
  .form_title {
    background: #f1f1f1;
    margin-bottom: 0px;
    .el-button {
      color: black;
    }
  }
  td {
    padding-left: 5px;
    text-align: left;
    line-height: 35px;
    font-size: 12px;
  }
  th {
    padding-left: 5px;
    line-height: 35px;
    text-align: left;
    font-size: 12px;
  }
}
/deep/.dateInputStyle {
  .el-input__inner {
    padding: 0px 15px;
  }
  .el-input__prefix {
    left: -8px;
  }
}
/deep/.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
  table {
    border-collapse: collapse;
    margin-top: 5px;
    width: 100%;
    .el-select {
      width: 100%;
    }
    .el-textarea__inner {
      padding: 0px;
      border: 0px;
      line-height: 1;
      font-size: 12px;
    }
  }
}
</style>
<template>
  <d2-container>
    <div class="div">
      <el-form>
        <!-- 需求 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree99')}}</b><!-- 合同明细 -->
            </el-button>
          </el-form-item>
          <el-form-item class="from-item">
            <div>
              <table border="1" bordercolor="#E5E5E5">
                <tr>
                  <th style="width:80px;">Cas</th>
                  <th>{{$t('procure.agree.agree11')}}</th><!-- 产品名称 -->
                  <th style="width:60px;">{{$t('procure.agree.agree14')}}</th><!-- 纯度 -->
                  <th style="width:60px;">{{$t('procure.agree.agree15')}}</th><!-- 数量 -->
                  <th >{{$t('procure.agree.agree16')}}</th><!-- 数量单位 -->
                  <th style="width:60px;">{{$t('procure.agree.agree17')}}</th><!-- 币种 -->
                  <th >{{$t('procure.agree.agree18')}}</th><!-- 单价 -->
                  <th >{{$t('procure.agree.agree19')}}</th><!-- 金额 -->
                  <th style="width:80px;">{{$t('procure.agree.agree20')}}</th><!-- 提交货时间 -->
                  <th >{{$t('procure.agree.agree54')}}</th><!-- 备注 -->
                  <th style="width:80px;">{{$t('procure.agree.agree100')}}</th><!-- 发票 -->
                  <th style="width:80px;">{{$t('procure.agree.agree38')}}</th><!-- 是否报关 -->
                </tr>
                <tr>
                  <td>{{addContract.cas}}</td>
                  <td>{{addContract.name}}</td>
                  <td>{{addContract.purity}}</td>
                  <td>{{addContract.quantity}}</td>
                  <td>{{units.filter(i=>{return addContract.quantity_unit==i.id})[0]?units.filter(i=>{return addContract.quantity_unit==i.id})[0].name:addContract.quantity_unit}}</td>
                  <td>{{Currency.filter(i=>{return addContract.currency_id==i.id})[0]?Currency.filter(i=>{return addContract.currency_id==i.id})[0].name_cn:addContract.currency_id}}</td>
                  <td>{{addContract.price}}</td>
                  <td>{{addContract.total_price}}</td>
                  <td>{{addContract.required_delivery_date}}</td>
                  <td>{{addContract.note}}</td>
                  <td>{{InvoiceInfo.filter(i=>{return addContract.invoice_type_id==i.id})[0]?InvoiceInfo.filter(i=>{return addContract.invoice_type_id==i.id})[0].name:addContract.invoice_type_id}}</td>
                  <td>{{addContract.if_declare==1?'报关':'不报关'}}</td><!-- 报关/不报关 -->
                </tr>
                <tr>
                  <td>
                    <b>{{$t('procure.agree.agree40')}}：</b><!-- 总金额： -->
                  </td>
                  <td colspan="11">{{addContract.total_price}}</td>
                </tr>
              </table>
            </div>
          </el-form-item>
        </div>

        <!-- 收票历史 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree101')}}</b><!-- 收票历史 -->
            </el-button>
          </el-form-item>
          <el-form-item class="from-item">
            <table border="1" bordercolor="#E5E5E5" v-for="(item,index) in addContract.invoice">
              <tr>
                <th>{{$t('procure.agree.agree102')}}</th><!-- 发票编号 -->
                <th>{{$t('procure.agree.agree103')}}</th><!-- 开票日期 -->
                <th>{{$t('procure.agree.agree104')}}</th><!-- 到票日期 -->
                <th colspan="2">{{$t('procure.agree.agree105')}}</th><!-- 公司全称 -->
                <th>{{$t('procure.agree.agree22')}}</th><!-- 发票类型 -->
                <th>扫票人</th>
                <th colspan="2">{{$t('procure.agree.agree54')}}</th><!-- 备注 -->
                <th width='140'>{{$t('procure.agree.agree76')}}</th><!-- 操作 -->
              </tr>
              <tr>
                <td>
                  <el-input size="mini" v-model="item.invoice_number"></el-input>
                </td>
                <td class="dateInputStyle">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.invoice_date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  ></el-date-picker>
                </td>
                <td class="dateInputStyle">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.invoice_receiver_date"
                    value-format="yyyy-MM-dd"
                    size="mini"
                  ></el-date-picker>
                </td>
                <td colspan="2">
                  <el-input size="mini" v-model="item.supplier_name"></el-input>
                </td>
                <td>
                  <el-select size="mini" v-model="item.invoice_type">
                    <el-option
                      v-for="item in Invoicetype"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>{{attr(item,'user.name')}}</td>
                <td colspan="2">
                  <el-input type="textarea" size="mini" v-model="item.note"></el-input>
                </td>
                <td style="text-align:center;">
                  <el-button type="primary" size="mini" @click="update_collection(item)">{{$t('procure.agree.agree106')}}</el-button><!-- 保存修改 -->
                  <el-button type="danger" v-if='item.status!=1' size="mini" @click="delete_collection(item)"> 删除</el-button>
                </td>
              </tr>
              <tr>
                <th>CAS</th>
                <th colspan="2">{{$t('procure.agree.agree11')}}</th><!-- 产品名称 -->
                <th>{{$t('procure.agree.agree16')}}</th><!-- 单位 -->
                <th>{{$t('procure.agree.agree15')}}</th><!-- 数量 -->
                <th>{{$t('procure.agree.agree18')}}</th><!-- 单价 -->
                <th>{{$t('procure.agree.agree19')}}</th><!-- 金额 -->
                <th>{{$t('procure.agree.agree107')}}</th><!-- 税率 -->
                <th>{{$t('procure.agree.agree108')}}</th><!-- 税额 -->
                <th>{{$t('procure.agree.agree109')}}</th><!-- 不含税金额 -->
              </tr>
              <tr>
                <td>
                  <el-input size="mini" v-model="item.cas"></el-input>
                </td>
                <td colspan="2">
                  <el-input size="mini" v-model="item.name_cn"></el-input>
                  <el-input size="mini" v-model="item.name"></el-input>
                </td>
                <td>
                  <el-select size="mini" v-model="item.quantity_unit">
                    <el-option
                      v-for="item in units"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input size="mini" v-model="item.quantity"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="item.price"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="item.total" readonly></el-input>
                </td>
                <td>
                  <!--<el-input size="mini" v-model="item.tax" @input="tax(index)"></el-input>-->
                  <el-select size="mini" v-model="item.tax" @input="tax(index)">
                    <el-option
                            v-for="(item,index) in taxs"
                            :key="index"
                            :label="item"
                            :value="item"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input size="mini" v-model="item.tax_amount" @input="tax_amount(index)"></el-input>
                </td>
                <td>
                  <el-input size="mini" v-model="item.amount"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="6"></td>
                <td>
                  <b>{{$t('procure.agree.agree110')}}：</b><!-- 发票状态： -->
                </td>
                <td>
                  <el-select size="mini" v-model="item.status">
                    <el-option
                      v-for="item in invoice_status"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <b>{{$t('procure.agree.agree40')}}：</b><!-- 总金额： -->
                </td>
                <td>{{item.total}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item label-width="90px" style="text-align: right;margin-right:20px;">
          <!-- <el-button type="primary" size="mini">保存</el-button> -->
          <el-button size="mini" @click="close()">{{$t('back')}}</el-button><!-- 返回 -->
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
import Cookies from "js-cookie";
import { listTotal } from "@/api/prod";
import {delete_invoice} from '@/api/finance'
import request from "@/plugin/axios";
import Big from "@/big/a/big.mjs";
export default {
  name:"procure-collection",
  data() {
    return {
      addContract: {},
      details: [],
      total_moneny: 0,
      invoice_status: [],
      units: [],
      Currency: [],
      Invoicetype: [],
      InvoiceInfo: [],
      purchaseList: [],
      PurchaseSettlementMethod: [],
      taxs:['0','0.03','0.06','0.13']
    };
  },
  created() {
    this.fetchData();
    // var x = new Big(0.3);
    // x.minus(0.1);
    // console.log(Big(0.7).times(2).toString());
  },
    watch: {
    $route(to,from) {
        if(to.name=='procure-collection'){
            this.fetchData();
        }
       }
    },
  methods: {
      tax(index){
          this.addContract.invoice[index].amount=(new Big(this.addContract.invoice[index].total).div(new Big(this.addContract.invoice[index].tax).plus(1))).toFixed(2)
          this.addContract.invoice[index].tax_amount=(new Big(this.addContract.invoice[index].amount).times(this.addContract.invoice[index].tax)).toFixed(2)
      },
      tax_amount(index){
          this.addContract.invoice[index].amount=(new Big(this.addContract.invoice[index].total).minus(this.addContract.invoice[index].tax_amount)).toFixed(2)
      },
      delete_collection(item){
         let obj={
              ids:[item.id]
          }
          delete_invoice(obj,this)
      },
    fetchData() {
      listTotal(
          "ProcurementContract/Invoice/generate?id=" + this.$route.query.item_id
        ).then(res => {
          this.addContract = res.data.contract;
          obj(this.units, res.enum.units);
          obj(this.Currency, res.enum.Currency);
          obj(this.Invoicetype, res.enum.Invoicetype);
          obj(this.InvoiceInfo, res.enum.InvoiceInfo);
          obj(this.invoice_status, res.enum.invoice_status);
          obj(this.PurchaseSettlementMethod, res.enum.PurchaseSettlementMethod);
        });
    },
    update_collection(item) {
      var a = item;
      create(a, "ProcurementContract/Invoice", "update", this);
    },
    close() {
      this.$router.push({
        path: "/invoice/index.vue",
        name: "procure-invoice"
      });
    }
  }
};
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
function obj(arr, object) {
  if (arr.length == 0) {
    for (let i in object) {
      arr.push(object[i]);
    }
  }
}
</script>
