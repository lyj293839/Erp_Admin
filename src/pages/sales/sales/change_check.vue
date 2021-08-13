<style lang="scss" scoped type="text/scss">
.form_title {
  background: #f1f1f1;
  .el-button {
    color: black;
  }
}
table {
  border-collapse: collapse;
  width: 100%;
  td {
    text-align: left;
    padding-left: 5px;
    font-size: 14px;
    line-height: 30px;
  }
}
.table_input {
  td {
    padding: 5px;
  }
  th {
    line-height: 30px;
  }
  td {
    line-height: 30px;
    .el-select {
      width: 100%;
    }
  }
  /deep/.el-input__inner {
    border: none;
    padding: 0px;
  }
}
/deep/.dateInput {
  .el-input__inner {
    padding: 0px 15px;
  }
  .el-input__prefix {
    left: -8px;
  }
}
.status {
  padding: 0px;
  /deep/.el-input__inner {
    padding: 0px;
  }
}
</style>

<template>
  <d2-container>
    <el-form label-width="0px">
      <el-form-item class="form_title">
        <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale1')}}</b>
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show1" class="from-item">
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <th>{{$t('sale.add.sale2')}}</th><!--合同双方-->
            <th>{{$t('sale.add.sale3')}}</th><!--名称-->
            <th>{{$t('sale.add.sale4')}}</th><!--联系人-->
            <th>{{$t('sale.add.sale5')}}</th><!--联系电话-->
            <th>{{$t('sale.add.sale6')}}</th><!--传真-->
          </tr>
          <tr>
            <td>{{$t('sale.add.sale102')}}</td><!--需方-->
            <td>
              {{sale.customer_name}}
              <span style="margin-left:5px;color:red;" v-if="sale.customer_name2&&(sale.customer_name2!=sale.customer_name)">{{'('+sale.customer_name2+')'}}</span>
            </td>
            <td>{{sale.customer_contact}}</td>
            <td>{{sale.customer_mobile}}</td>
            <td>{{sale.customer_fax}}</td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale103')}}</td><!--供方-->
            <td>{{sale.corp_name}}</td>
            <td>{{sale.corp_contact}}</td>
            <td>{{sale.corp_mobile}}</td>
            <td>{{sale.corp_fax}}</td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale9')}}</b><!--需求信息-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.details" :key="index">
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <th width="80">{{$t('sale.add.sale84')}}</th><!--询单号-->
            <th width="100">CASNo.</th>
            <th width='220'>{{$t('sale.add.sale15')}}</th><!--产品名称-->
            <th>{{$t('sale.add.sale16')}}</th><!--规格-->
            <th>{{$t('sale.add.sale17')}}</th><!--纯度-->
            <th>{{$t('sale.add.sale18')}}</th><!--数量-->
            <th>{{$t('sale.add.sale21')}}</th><!--单价-->
            <th>{{$t('sale.add.sale22')}}</th><!--金额-->
            <th width='80'>{{$t('sale.add.sale25')}}</th>
            <th width="200">{{$t('sale.add.sale104')}}</th><!--附加项-->
            <th>{{$t('sale.add.sale26')}}</th><!--附加费-->
            <th>{{$t('sale.add.sale124')}}</th>
            <th width="100">{{$t('sale.add.sale105')}}</th><!--审核状态-->
            <th width="40">{{$t('sale.add.sale106')}}</th><!--处理-->
          </tr>
          <tr>
            <td>{{item.inquiry_id}}</td>
            <td>{{item.cas}}</td>
            <td>{{item.product_name_cn}}</td>
            <td>{{item.package}}</td>
            <td>{{item.purity}}</td>
            <td>
              {{item.quantity}}
              {{getEnumValue(units,item.quantity_unit)}}
            </td>
            <td>{{item.price}}</td>
            <td>
              {{item.total_money}}
              {{getEnumValue(currencys,item.currency_id)}}
            </td>
            <td>
              {{getEnumValue(invoice_type,item.invoice_type_id)}}
            </td>
            <td>
              <div v-if="item.additionals&&item.additionals.length>0">
                <span v-for="item_cost in item.additionals">
                  {{item_cost.additional_type_id?(additional_cost_type.filter(res=>{return res.id == item_cost.additional_type_id})[0].name+':'):''}}
                  {{item_cost.price}}
                  {{getEnumValue(currencys,item.currency_id)}}
                  ,
                </span>
              </div>
            </td>
            <td>
              {{item.additional_cost}}
              {{getEnumValue(currencys,item.currency_id)}}
            </td>
            <td>{{item.commission}}</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th>{{$t('sale.add.sale31')}}</th>
            <td colspan="12">
              <span v-for="(i,index_i) in item.claims" style="margin-right:5px;">
                <span>{{i.claim_pack_number}}*{{i.claim_pack_size}}/{{getEnumValue(units,i.claim_unit_id)}}</span>
                <span v-if="index_i!=(item.claims.length-1)">、</span>
              </span>
            </td>
          </tr>
          <tr v-for="(item_log,index_log) in item.change_log" style="background:#F5F8FB;">
            <td v-if="index_log==0" :rowspan="item.change_log.length" style="text-align:center;">
              <b>{{$t('sale.add.sale107')}}</b><!--变更记录-->
            </td>
            <td>
              <!-- <span>{{$t('sale.add.sale108')}}：</span>时间： -->
              {{item_log.created_at}}
            </td>
            <td>
              <span>{{$t('sale.add.sale59')}}:{{item_log.remark}}</span><!--备注：--><br>
              <span>{{$t('sale.add.sale278')}}:{{item_log.straight_hair_note}}</span><br>
              <span>
                <span>{{$t('sale.add.sale31')}}:</span>
                <span v-for="(i,index_i) in item_log.claims">
                  <span>{{i.claim_pack_number}}*{{i.claim_pack_size}}/{{getEnumValue(units,i.claim_unit_id)}}</span>
                  <span v-if="index_i!=(item.claims.length-1)">、</span>
                </span>
              </span>
            </td>
            <td>{{item_log.package}}</td>
            <td>{{item_log.purity}}</td>
            <td>
              {{item_log.quantity}}
              {{getEnumValue(units,item_log.quantity_unit)}}
            </td>
            <td>{{item_log.price}}</td>
            <td>
              {{item_log.total_money}}
              {{getEnumValue(currencys,item_log.currency_id)}}
            </td>
            <td>
              {{getEnumValue(invoice_type,item_log.invoice_type_id)}}
            </td>
            <td>
              <span
                v-if="item_log.additional_cost_info&&item_log.additional_cost_info.length"
                v-for="item_cost in item_log.additional_cost_info"
              >
                {{item_cost.additional_type_id?(additional_cost_type.filter(res=>{return res.id == item_cost.additional_type_id})[0].name+':'):''}}
                {{item_cost.price}}
                {{getEnumValue(currencys,item_log.currency_id)}}
                ,
              </span>
            </td>
            <td>
              {{item_log.additional_cost}}
              {{getEnumValue(currencys,item_log.currency_id)}}
            </td>
            <td>{{item_log.commission}}</td>
            <td>
              <el-select size="mini" v-if="item_log.status==0" v-model="item_log.refund_status">
                <el-option
                  v-for="item in refund_status_info"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <span
                v-else
                style="margin-left:5px;"
              >{{getEnumValue(refund_status_info,item_log.status)}}</span>
            </td>
            <td>
              <el-button
                type="primary"
                size="mini"
                v-if="item_log.status==0"
                @click="datails_review(item_log)"
              >{{$t('sale.add.sale109')}}</el-button><!--审批-->
            </td>
          </tr>
          <tr v-if="index==(sale.details.length-1)">
            <td colspan="6"></td>
            <td>{{$t('sale.add.sale42')}}</td>
            <td colspan="7">
              {{sale.total_money}}
              {{getEnumValue(currencys,sale.currency_id)}}
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show6 = !form_show6" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale110')}}</b><!--发货数据-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show6" class="from-item">
        <table border="1" bordercolor="#E5E5E5" v-if="sale.ship_notices&&sale.ship_notices.length>0">
          <tr>
            <td width="160">{{$t('sale.add.sale111')}}</td><!--批次号/合同号-->
            <td width="101">CAS</td><!--CAS-->
            <td>{{$t('sale.add.sale15')}}</td><!--产品名称-->
            <td width="100">{{$t('sale.add.sale17')}}</td><!--纯度-->
            <td width="100">{{$t('sale.add.sale75')}}</td><!--类型-->
            <td width="100">{{$t('sale.add.sale16')}}</td><!--规格-->
            <td width="120">{{$t('sale.add.sale112')}}</td><!--发货数量-->
            <td width="130">{{$t('sale.add.sale113')}}</td><!--申请退货&已退数量-->
            <td width="100">{{$t('sale.add.sale114')}}</td><!--样品-->
          </tr>
          <tr v-for="item_delivery_b in sale.ship_notices">
            <td>
              {{item_delivery_b.batchno}}/
              <br />
              {{item_delivery_b.contract_detail_number}}
            </td>
            <td width="100">{{item_delivery_b.cas}}</td>
            <td>{{item_delivery_b.product_name}}</td>
            <td width="100">{{item_delivery_b.purity}}</td>
            <td width="100">
              <div v-if="item_delivery_b.preout">
                <span
                  v-if="item_delivery_b.preout.type"
                >{{getEnumValue(preout_type_info,item_delivery_b.preout.type)}}</span>
              </div>
            </td>
            <td width="100">
              <div v-if="item_delivery_b.preout">
                <span
                  v-if="item_delivery_b.preout.type==1"
                >{{item_delivery_b.preout.packs.packsize}}{{getEnumValue(units,item_delivery_b.preout.packs.unit_id)}}</span>
                <span v-else>/</span>
              </div>
            </td>
            <td width="120">
              <div v-if="item_delivery_b.preout">
                <span v-if="item_delivery_b.preout.type==1">
                  {{item_delivery_b.preout.package_nums}}
                  ({{(Number(item_delivery_b.preout.package_nums)*Number(item_delivery_b.preout.packs.packsize)).toFixed(2)}}
                  {{getEnumValue(units,item_delivery_b.preout.packs.unit_id)}})
                </span>
                <span
                  v-else
                >{{item_delivery_b.preout.base_quantity}}{{getEnumValue(units,item_delivery_b.preout.base_quantity_unit)}}</span>
              </div>
            </td>
            <td width="130">
              {{sale.ship_statistical_data[item_delivery_b.id].batch_return_quantity}}
              {{getEnumValue(units,sale.ship_statistical_data[item_delivery_b.id].base_unit_id)}}
            </td>
            <td width="99"></td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show7 = !form_show7" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale115')}}</b><!--退货数据-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show7" class="from-item">
        <table border="1" bordercolor="#E5E5E5" v-for="item in sale.details" v-if="sale.return_date&&sale.return_date[item.id]" >
          <tr>
            <td width="130">{{$t('sale.add.sale111')}}</td><!--批次号/合同号-->
            <td width="100">Cas</td><!--Cas-->
            <td width="240">{{$t('sale.add.sale15')}}</td><!--产品名称-->
            <td width="100">{{$t('sale.add.sale116')}}</td><!--退货数量-->
            <td width="100">{{$t('sale.add.sale117')}}</td><!--退货应收额-->
            <td>{{$t('sale.add.sale59')}}</td><!--备注-->
            <td width="120">{{$t('sale.add.sale118')}}</td><!--货要退回-->
            <td width="100">{{$t('sale.add.sale105')}}</td><!--审核状态-->
            <td width="50">{{$t('sale.add.sale106')}}</td><!--处理-->
          </tr>
          <tr v-for="item_i in sale.return_date[item.id]">
            <td>
              {{item_i.batchno}}/
              <br />
              {{item_i.contract_no}}
            </td>
            <td>{{item_i.cas}}</td>
            <td>{{item_i.prod_name}}</td>
            <td>
              {{item_i.quantity}}
              {{getEnumValue(units,item_i.quantity_unit_id)}}
            </td>
            <td>{{item_i.money}}</td>
            <td>{{item_i.return_note}}</td>
            <td >{{getEnumValue(return_type_info,item_i.return_type)}}</td>
            <td v-if="item_i.status==1">
              <el-select size="mini" v-model="item_i.refund_status">
                <el-option
                  v-for="item in return_status_info"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td v-else>
              <span>{{getEnumValue(return_status_info,item_i.status)}}</span>
            </td>
            <td >
              <el-button
                type="primary"
                size="mini"
                v-if="item_i.status==1"
                @click="return_review(item_i)"
              >{{$t('sale.add.sale106')}}</el-button><!--审批-->
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale119')}}</b><!--收款数据-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show3" class="from-item">
        <table border="1" bordercolor="#E5E5E5" v-if="sale.receipt_data&&sale.receipt_data.length!=0">
          <tr>
            <td width="120">{{$t('sale.add.sale44')}}</td><!--合同号-->
            <td width="81">{{$t('sale.add.sale108')}}</td><!--日期-->
            <td width="140">{{$t('sale.add.sale120')}}</td><!--银行-->
            <td width="80">{{$t('sale.add.sale12')}}</td><!--金额-->
            <td width="80">{{$t('sale.add.sale121')}}</td><!--银行费用-->
            <td width="90">{{$t('sale.add.sale122')}}</td><!--冲往来账-->
            <td width="90">{{$t('sale.add.sale123')}}</td><!--到帐金额-->
            <td width="70">{{$t('sale.add.sale124')}}(￥)</td><!--佣金(￥)-->
            <td width="60">{{$t('sale.add.sale125')}}</td><!--汇率-->
            <td style="min-width:40px;">{{$t('sale.add.sale59')}}</td><!--备注-->
            <td width="80">{{$t('status')}}</td><!--状态-->
          </tr>
          <tr v-for="item in sale.details" :key="item.id">
            <td v-if="sale.receipt_data[item.id]">
              <span>{{item.contract_number}}</span>
            </td>
            <td style="padding:0px;" colspan="15" v-if="sale.receipt_data[item.id]">
              <table border="1" bordercolor="#E5E5E5">
                <tr v-for="item_i in sale.receipt_data[item.id]">
                  <td width="80">{{item_i.created_at}}</td>
                  <td width="140">
                    <span v-if="item_i.bank_id">{{getEnumValue(bank_info,item_i.bank_id)}}</span>
                    <span v-else>
                      {{getEnumValue(Account,item_i.account_id,'account_name')}}
                      <span v-if="getEnumValue(Account,item_i.account_id,'account')">{{'-'+getEnumValue(Account,item_i.account_id,'account')}}</span>
                      <span v-if="getEnumValue(Account,item_i.account_id,'currency')">{{'-'+getEnumValue(Account,item_i.account_id,'currency')}}</span> 
                    </span>
                  </td>
                  <td width="80">
                    {{Number(item_i.bank_fee)+Number(item_i.checkin)}}
                    {{item_i.currency_id?currencys.filter(res=>{return res.id == item_i.currency_id})[0].name:''}}
                  </td>
                  <td
                    width="80"
                  >{{item_i.bank_fee?item_i.bank_fee:0}}{{item_i.currency_id?currencys.filter(res=>{return res.id == item_i.currency_id})[0].name:''}}</td>
                  <td
                    width="90"
                  >{{item_i.currentaccount?item_i.currentaccount:0}}{{item_i.currency_id?currencys.filter(res=>{return res.id == item_i.currency_id})[0].name:''}}</td>
                  <td
                    width="90"
                  >{{item_i.checkin?item_i.checkin:0}}{{item_i.currency_id?currencys.filter(res=>{return res.id == item_i.currency_id})[0].name:''}}</td>
                  <td
                    width="70"
                  >{{item_i.commission_fee}}</td>
                  <td width="60">{{item_i.currency_rate}}</td>
                  <td style="min-width:40px;">{{item_i.note}}</td>
                  <td
                    width="79"
                    :style="item_i.status==1?'color:green':'color:red'"
                  >{{item_i.status!=null?getEnumValue(obsolete_status_info,item_i.status):''}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show4 = !form_show4" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale126')}}</b><!--退款数据-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show4" class="from-item">
        <table border="1" bordercolor="#E5E5E5" v-if="sale.refund_data&&sale.refund_data.length!=0">
          <tr>
            <td width="110">{{$t('sale.add.sale44')}}</td><!--合同号-->
            <td width="81">{{$t('sale.add.sale108')}}</td><!--日期-->
            <td width="130">{{$t('sale.add.sale120')}}</td><!--银行-->
            <td width="80">{{$t('sale.add.sale22')}}</td><!--金额-->
            <td width="90">{{$t('sale.add.sale127')}}</td><!--是否转往来账-->
            <td style="min-width:40px;">{{$t('sale.add.sale59')}}</td><!--备注-->
            <td width="70">{{$t('sale.add.sale128')}}</td><!--付款状态-->
            <td width="90" style="padding:0px;">
              <span style="margin-left:5px;">{{$t('sale.add.sale105')}}</span><!--审核状态-->
            </td>
            <td width="50">{{$t('sale.add.sale106')}}</td><!--处理-->
          </tr>
          <tr v-for="item in sale.details" :key="item.id">
            <td v-if="sale.refund_data[item.id]">
              <span>{{item.contract_number}}</span>
            </td>
            <td style="padding:0px;" colspan="14" v-if="sale.refund_data[item.id]">
              <table border="1" bordercolor="#E5E5E5">
                <tr v-for="item_j in sale.refund_data[item.id]">
                  <td width="80">{{item_j.created_at}}</td>
                  <td width="130">
                    {{item_j.opening_bank}}
                    <br />
                    {{item_j.payee}}
                    <br />
                    {{item_j.bank_account_number}}
                  </td>
                  <td width="80">
                    {{item_j.total_money}}
                    {{getEnumValue(currencys,item_j.currency_id)}}
                  </td>
                  <td width="90">{{getEnumValue(transfer_to_account,item_j.transfer_to_account)}}</td>
                  <td style="min-width:40px;">{{item_j.remark}}</td>
                  <td
                    width="70"
                  ><span :style="item_j.pay_status==10?'color:red;':''">{{getEnumValue(pay_status_info,item_j.pay_status)}}</span></td>
                  <td width="90" class="status">
                    <el-select size="mini" v-model="item_j.refund_status" v-if="item_j.status==0">
                      <el-option
                        v-for="item in refund_status_info"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <span
                      v-else
                      style="margin-left:5px;"
                      :style="item_j.status==2?'color:red':'color:green'"
                    >{{getEnumValue(refund_status_info,item_j.status)}}</span>
                  </td>
                  <td width="49">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="refund_review(item_j)"
                      v-if="item_j.status==0"
                    >{{$t('sale.add.sale109')}}</el-button><!--审批-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show5 = !form_show5" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale129')}}</b><!--合同条款-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show5" class="from-item">
        <table border="1" bordercolor="#E5E5E5" class="table_input">
          <tr>
            <th class="td">
              <span style="color:red;">*</span>
              {{$t('sale.add.sale44')}}
            </th>
            <th class="td">{{$t('sale.add.sale45')}}</th>
            <th class="td">{{$t('sale.add.sale46')}}</th>
            <th class="td">
              <span style="color:red;">*</span>
              {{$t('sale.add.sale47')}}
            </th>
            <th class="td">
              PO
            </th>
            <th style="min-width:400px">
              <span style="color:red;">*</span>
              {{$t('sale.add.sale48')}}
            </th>
          </tr>
          <tr>
            <td>
              <el-input v-model="sale.contract_number" size="mini"></el-input>
            </td>
            <td class="dateInput">
              <el-date-picker
                type="date"
                style="width:100%;"
                v-model="sale.contract_date"
                value-format="yyyy-MM-dd"
                size="mini"
              ></el-date-picker>
            </td>
            <td>
              <el-input v-model="sale.contract_address" size="mini"></el-input>
            </td>
            <td>
              <el-select v-model="sale.sale_id" clearable filterable size="mini">
                <el-option
                  v-for="(i,index) in sale_list"
                  :key="index"
                  :label="i.name"
                  :value="i.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="sale.customer_po" size="mini"></el-input>
            </td>
            <td>
              <el-input v-model="sale.settle_type" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale49')}}
            </td>
            <td>
              <el-select v-model="sale.trade_type_id" clearable filterable placeholder size="mini">
                <el-option
                  v-for="(i,index) in trade_mode"
                  :key="index"
                  :label="i.name"
                  :value="i.id"
                ></el-option>
              </el-select>
            </td>
            <td><span style="color:red;">*</span>交货天数</td>
            <td>
              <el-input style="width:80%;" v-model="sale.delivery_days"></el-input>
              <span>天</span>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale90')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.transportation" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale50')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.quality_stardard" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale51')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.reasonable_loss" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale52')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.package_stardard" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale53')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.accept_stardard" size="mini"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale54')}}</td>
            <td colspan="1" class="dateInput">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="sale.expdate_start"
                type="date"
                size="mini"
              ></el-date-picker>
            </td>
            <td>{{$t('sale.add.sale55')}}</td>
            <td colspan="1" class="dateInput">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="sale.expdate_end"
                type="date"
                size="mini"
              ></el-date-picker>
            </td>
            <td>{{$t('sale.add.sale56')}}</td>
            <td>
              <el-radio-group v-model="sale.if_echapter">
                <el-radio :label="1">{{$t('sale.add.sale57')}}</el-radio>
                <el-radio :label="0">{{$t('sale.add.sale58')}}</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale59')}}</td>
            <td colspan="5">
              <el-input v-model="sale.remarks.note" size="mini"></el-input>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button
          type="primary"
          size="mini"
          @click="change_verify()"
        >{{$t('sale.add.sale130')}}</el-button><!--审批通过-->
        <el-button size="mini" @click="close()">{{$t('back')}}</el-button><!--返回-->
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import { listTotal } from "@/api/prod";
import { getEnumValue } from "@/utils/index";
import {mapActions} from 'vuex'
import {
  sale_lists,
  refund_review,
  change_review,
  return_review,
  change_verify
} from "@/api/sale";
export default {
  name: "sales-change_check",
  data() {
    return {
      sale: { remarks: {} },
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      form_show6: true,
      form_show7: true,
      sale_list: [],
      units: [],
      currencys: [],
      additional_cost_type: [],
      status_info: [],
      trade_mode: [],
      preout_type_info: [],
      bank_info: [],
      pay_type_info: [],
      pay_status_info: [],
      refund_status_info: [],
      return_status_info: [],
      transfer_to_account: {},
      return_type_info:[],
      obsolete_status_info:[],
      invoice_type:[],
      Account:[]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-change_check") {
        if (this.$route.query.ids&&this.$route.query.check) {
          this.fetchData();
        }
      }
    }
  },
  created() {
    if (this.$route.query.ids) {
      this.fetchData();
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    fetchData() {
      listTotal(
        "saler_contract/" + this.$route.query.ids + "/change_review_view"
      ).then(res => {
        res.data.details.forEach(i => {
          if (i.change_log.length > 0) {
            i.change_log.forEach(j => {
              j.refund_status = 1;
            });
          }
          if (res.data.refund_data[i.id]) {
            res.data.refund_data[i.id].forEach(j => {
              j.refund_status = 1;
            });
          }
          if (res.data.return_date[i.id]) {
            res.data.return_date[i.id].forEach(j => {
              j.refund_status = 2;
            });
          }
        });
        this.sale = res.data;
        this.units = res.enum.units;
        this.currencys = res.enum.currencys;
        this.additional_cost_type = res.enum.additional_cost_type;
        this.status_info = res.enum.status_info;
        this.trade_mode = res.enum.trade_mode;
        this.preout_type_info = res.enum.preout_type_info;
        this.bank_info = res.enum.bank_info;
        this.pay_type_info = res.enum.pay_type_info;
        this.pay_status_info = res.enum.pay_status_info;
        this.transfer_to_account = res.enum.transfer_to_account;
        this.return_type_info = res.enum.return_type_info;
        this.obsolete_status_info = res.enum.obsolete_status_info
        this.invoice_type = res.enum.invoice_type
        this.Account = this.GEnums.Account
        res.enum.refund_status_info.forEach((i, index) => {
          if (i.name == "待审核") {
            res.enum.refund_status_info.splice(index, 1);
          }
        });
        for(let i in res.enum.return_status_info){
          if(res.enum.return_status_info[i].name == "待审核"){
            delete res.enum.return_status_info[i]
          }
        }
        this.refund_status_info = res.enum.refund_status_info;
        this.return_status_info = res.enum.return_status_info;
        this.$route.query.check = false
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
    },
    datails_review(item) {
      var obj = {
        id: item.id,
        status: item.refund_status
      };
      change_review(obj).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    refund_review(item) {
      var obj = {
        id: item.id,
        status: item.refund_status
      };
      refund_review(obj).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    return_review(item) {
      var obj = {
        id: item.id,
        status: item.refund_status
      };
      return_review(obj).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    change_verify(){
      var obj = {
        id:this.sale.id
      }
      change_verify(obj).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.close()
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    close() {
      let that=this
      var tagName = 'sales-change_check'
      that.closeAdd({tagName})
      that.$router.push({
        path: "/sales/sales",
        name: "sales-sales"
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
</script>