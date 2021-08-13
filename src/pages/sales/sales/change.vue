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
  }
}

/deep/.el-input__inner {
  border: none;
}
.additional_cost_a {
  /deep/.el-input__inner {
    border: 1px solid #dcdfe6;
    width: 200px;
  }
  .claims_calss{
    width:100% !important;
    /deep/.el-input__inner {
      border: 1px solid #dcdfe6;
      width: 90px;
      padding: 0px 5px;
    }
  }
  .el-input {
    width: 200px;
  }
  .el-col {
    display: flex;
    margin: 5px 0px;
    div {
      width: 80px;
    }
  }
  table {
    line-height: 25px;
    width: 100%;
    /deep/.el-input__inner {
      border: none;
      padding: 0px;
    }
  }
}
.table_delivery {
  div {
    margin-top: 10px;
  }
  /deep/.el-input__inner {
    padding: 0px 5px;
    border: 1px solid #dcdfe6;
  }
}
.el-tabs_a {
  .el-checkbox {
    margin-right: 10px;
  }
  table {
    td {
      line-height: 25px;
    }
  }
  .el-form {
    /deep/.el-input__inner {
      border: 1px solid #dcdfe6;
    }
  }
}
.td_checkbox {
  .el-radio {
    margin-right: 0px;
  }
  /deep/.el-radio__label {
    padding-left: 5px;
  }
}
/deep/.el-form-item__label {
  font-weight: bold;
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
        <table border="1" bordercolor="#E5E5E5" style="width:100%;">
          <tr>
            <th>{{$t('sale.add.sale2')}}</th><!--合同双方-->
            <th>{{$t('sale.add.sale3')}}</th><!--名称-->
            <th>{{$t('sale.add.sale4')}}</th><!--联系人-->
            <th>{{$t('sale.add.sale5')}}</th><!--联系电话-->
            <th>{{$t('sale.add.sale6')}}</th><!--传真-->
          </tr>
          <tr>
            <td>{{$t('sale.add.sale9')}}</td><!--需方-->
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
        <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale131')}}</b><!--需求信息-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show3" class="from-item" v-for="(item,index) in sale.details" :key="index">
        <el-dialog
          :visible.sync="dialogVisible"
          width="50%"
          class="additional_cost_a"
          @close="hide_close()"
        >
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale44')}}：</div>
              <span>{{list.contract_number}}</span>
            </el-col><!--合同号：-->
            <el-col :span="12">
              <div style="width:110px;">{{$t('sale.add.sale15')}}：</div>
              <span>{{list.product_name_cn}}</span>
            </el-col><!--产品名称：-->
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale132')}}：</div><!--最终数量：-->
              <el-input v-model="list.quantity" size="small" @input="change_quantity()"></el-input>
            </el-col>
            <el-col :span="12">
              {{$t('sale.add.sale19')}}：<!--数量单位：-->
              {{units.filter(res=>{return res.id == list.quantity_unit})[0]?units.filter(res=>{return res.id == list.quantity_unit})[0].name:''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale133')}}：</div><!--最终单价：-->
              <el-input v-model="list.price" size="small" @input="change_price()"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale134')}}：</div><!--最终金额：-->
              <el-input v-model="list.total_money" size="small" @input="change_money()"></el-input>
            </el-col>
            <el-col :span="12">
              {{$t('sale.add.sale135')}}：<!--货币单位：-->
              {{currencys.filter(res=>{return res.id == list.currency_id})[0]?currencys.filter(res=>{return res.id == list.currency_id})[0].name:''}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale16')}}：</div><!--规格：-->
              <el-input v-model="list.package" size="small"></el-input>
            </el-col>
            <el-col :span="12">
              <div>{{$t('sale.add.sale17')}}：</div><!--纯度：-->
              <el-input v-model="list.purity" size="small"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <div>{{$t('sale.add.sale31')}}：</div>
              <div style="width:80%;">
                <div v-for="(i,index_i) in list.claims" class="claims_calss">
                  <el-input
                    size="small"
                    v-model="i.claim_pack_number"
                    style="width:90px;"
                  ></el-input>*
                  <el-input
                    v-model="i.claim_pack_size"
                    size="small"
                    style="width:90px;"
                  ></el-input>/
                  <el-select
                    v-model="i.claim_unit_id"
                    size="small"
                    style="width:90px;"
                  >
                    <el-option v-for="i in units" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                  <el-button type="primary" icon="el-icon-minus" @click="claim_dev(index_i)" size="mini" style="margin-left:5px;"></el-button>
                </div>
              </div>
            </el-col>
            <el-col :span='8'>
              <el-button type="primary" icon="el-icon-plus" @click="claim_add()" size="mini" style="margin-top:6px;"></el-button>
            </el-col>
          </el-row>
          <table border="1" bordercolor="#E5E5E5">
            <tr>
              <td>{{$t('sale.add.sale11')}}</td>
              <td>{{$t('sale.add.sale12')}}</td>
              <td width="100px" style="text-align:center;">
                {{$t('sale.add.sale13')}}
                <el-button @click="add_cost" type="primary" size="mini">+</el-button>
              </td>
            </tr>
            <tr v-for="(item_i,index_i) in list.additional_cost_info">
              <td>
                <el-select
                  v-model="item_i.additional_type_id"
                  clearable
                  filterable
                  size="mini"
                  style="width: 100%;"
                  placeholder
                >
                  <el-option
                    v-for="(i,index) in additional_cost_type"
                    :key="index"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-input
                  size="mini"
                  type="text"
                  class="input"
                  placeholder
                  v-model="item_i.price"
                  style="width: 100%;"
                ></el-input>
              </td>
              <td style="text-align:center;">
                <el-button @click="delete_cost(index_i)" type="primary" size="mini">-</el-button>
              </td>
            </tr>
          </table>
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale124')}}:</div><!--佣金-->
              <el-input v-model="list.commission" size="small"></el-input>
            </el-col>
            <el-col :span="12">
              <div>{{$t('sale.add.sale25')}}:</div><!--发票类型：-->
              <el-select
                    v-model="list.invoice_type_id"
                    clearable
                    size='small'
                    style="width:200px;"
                  >
                    <el-option v-for="i in invoice_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div>{{$t('sale.add.sale278')}}:</div><!--直发备注-->
              <el-input type="textarea" v-model="list.straight_hair_note" style="width:80%;"></el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top:10px;">
            <el-col :span="12">
              <div>{{$t('sale.add.sale136')}}：</div><!--变更备注：-->
              <el-input type="textarea" v-model="list.remark" style="width:80%;"></el-input>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button @click="hide_close()" size="mini">{{$t('cancel')}}</el-button>
            <el-button type="primary" @click="hide_dialogVisible()" size="mini">{{$t('save')}}</el-button>
          </span>
        </el-dialog>
        <table border="1" bordercolor="#E5E5E5" style="width:100%;line-height:22px;">
          <tr>
            <th width="80">{{$t('sale.add.sale84')}}</th><!--询单号-->
            <th width="100">CASNo.</th><!--CASNo-->
            <th width='240'>{{$t('sale.add.sale15')}}</th><!--产品名称-->
            <th width='80'>{{$t('sale.add.sale16')}}</th><!--规格-->
            <th width='50'>{{$t('sale.add.sale17')}}</th><!--纯度-->
            <th width='80'>{{$t('sale.add.sale18')}}</th><!--数量-->
            <th width='60'>{{$t('sale.add.sale21')}}</th><!--单价-->
            <th>{{$t('sale.add.sale22')}}</th><!--金额-->
            <th width='80'>{{$t('sale.add.sale25')}}</th>
            <th width="150">{{$t('sale.add.sale104')}}</th><!--附加项-->
            <th width='80'>{{$t('sale.add.sale26')}}</th><!--附加费-->
            <th width='80'>{{$t('sale.add.sale124')}}</th>
            <th width="60">{{$t('sale.add.sale91')}}</th><!--状态-->
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
              <!-- {{units.filter(res=>{return res.id == item.quantity_unit})[0]?units.filter(res=>{return res.id == item.quantity_unit})[0].name:''}} -->
            </td>
            <td>{{item.price}}</td>
            <td>
              {{item.total_money}}
              {{getEnumValue(currencys,item.currency_id)}}
              <!-- {{currencys.filter(res=>{return res.id == item.currency_id})[0]?currencys.filter(res=>{return res.id == item.currency_id})[0].name:''}} -->
            </td>
            <td>
              {{getEnumValue(invoice_type,item.invoice_type_id)}}
            </td>
            <td>
              <div v-if="item.additionals.length>0">
                <span v-for="item_cost in item.additionals">
                  {{item_cost.additional_type_id?(additional_cost_type.filter(res=>{return res.id == item_cost.additional_type_id})[0].name+':'):''}}
                  {{item_cost.price}}
                  {{currencys.filter(res=>{return res.id == item.currency_id})[0]?currencys.filter(res=>{return res.id == item.currency_id})[0].name:''}}
                  ,
                </span>
              </div>
            </td>
            <td>
              {{item.additional_cost}}
              {{getEnumValue(currencys,item.currency_id)}}
              <!-- {{currencys.filter(res=>{return res.id == item.currency_id})[0]?currencys.filter(res=>{return res.id == item.currency_id})[0].name:''}} -->
            </td>
            <td>{{item.commission}}</td>
            <td style="text-align: center;">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="show_dialog(item,index)"
              ></el-button>
            </td>
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
              <!--时间：-->
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
              {{units.filter(res=>{return res.id == item_log.quantity_unit})[0]?units.filter(res=>{return res.id == item_log.quantity_unit})[0].name:''}}
            </td>
            <td>{{item_log.price}}</td>
            <td>
              {{item_log.total_money}}
              {{currencys.filter(res=>{return res.id == item_log.currency_id})[0]?currencys.filter(res=>{return res.id == item_log.currency_id})[0].name:''}}
            </td>
            <td>{{getEnumValue(invoice_type,item_log.invoice_type_id)}}</td>
            <td>
              <span
                v-if="item_log.additional_cost_info.length"
                v-for="item_cost in item_log.additional_cost_info"
              >
                {{item_cost.additional_type_id?(additional_cost_type.filter(res=>{return res.id == item_cost.additional_type_id})[0].name+':'):''}}
                {{item_cost.price}}
                {{currencys.filter(res=>{return res.id == item_log.currency_id})[0]?currencys.filter(res=>{return res.id == item_log.currency_id})[0].name:''}}
                ,
              </span>
            </td>
            <td>
              {{item_log.additional_cost}}
              {{currencys.filter(res=>{return res.id == item_log.currency_id})[0]?currencys.filter(res=>{return res.id == item_log.currency_id})[0].name:''}}
            </td>
            <td>{{item_log.commission}}</td>
            <td style="text-align: center;">
              {{status_info.filter(res=>{return res.id == item_log.status})[0]?status_info.filter(res=>{return res.id == item_log.status})[0].name:''}}
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                v-if="item_log.status !=1&&item_log.status !=2"
                @click="show_dialog_log(item_log,index_log,item)"
              ></el-button>
            </td>
          </tr>
          <tr v-if="index==(sale.details.length-1)">
            <td colspan="6"></td>
            <td>{{$t('sale.add.sale42')}}</td>
            <td colspan="6">
              {{sale.total_money}}
              {{getEnumValue(currencys,sale.currency_id)}}
              <!-- {{currencys.filter(res=>{return res.id == sale.currency_id})[0]?currencys.filter(res=>{return res.id == sale.currency_id})[0].name:''}} -->
            </td>
          </tr>
        </table>
      </el-form-item>
      <!-- tab切换 -->
      <el-form-item class="el-tabs_a">
        <el-tabs type="border-card">
          <el-tab-pane :label="$t('sale.add.sale110')"><!--发货数据-->
            <!-- <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td style="text-align:center;width:170px;">
                  <el-checkbox v-model="checktotal" @change="checktotal_change()">全选</el-checkbox>
                  <b>{{$t('sale.add.sale111')}}</b>
                </td>
                <td></td>
              </tr>
              <tr v-for="(item_delivery,index_delivery) in sale.ship_notices" v-if="sale.ship_notices&&sale.ship_notices.length>0">
                <td>
                  <span v-if="item_delivery[0]">
                    <el-checkbox v-model="item_delivery.check" @change="check_change()"></el-checkbox>
                    <br />
                    {{item_delivery[0].batchno}}/
                    <br />
                    {{item_delivery[0].contract_detail_number}}
                  </span>
                </td>
                <td style="padding:0px;">
                  <table border="1" bordercolor="#E5E5E5" class="table_delivery">
                    <tr>
                      <td width='100'>CAS</td>
                      <td >{{$t('sale.add.sale15')}}</td>
                      <td width='50'>{{$t('sale.add.sale17')}}</td>
                      <td width='60'>{{$t('sale.add.sale75')}}</td>
                      <td width='100'>{{$t('sale.add.sale16')}}</td>
                      <td width='100'>{{$t('sale.add.sale112')}}</td>
                      <td width="90">{{$t('sale.add.sale113')}}</td>
                      <td width="100">{{$t('sale.add.sale117')}}</td>
                      <td width="100">{{$t('sale.add.sale116')}}</td>
                      <td width="60">{{$t('sale.add.sale118')}}</td>
                    </tr>
                    <tr v-for="(item_delivery_b,index_delivery_b) in item_delivery">
                      <td>{{item_delivery_b.cas}}</td>
                      <td>{{item_delivery_b.product_name}}</td>
                      <td>{{item_delivery_b.purity}}</td>
                      <td>
                        <div v-if="item_delivery_b.preout">
                          <span
                            v-if="item_delivery_b.preout.type"
                          >{{getEnumValue(preout_type_info,item_delivery_b.preout.type)}}</span>
                        </div>
                      </td>
                      <td>
                        <div v-if="item_delivery_b.preout">
                          <span
                            v-if="item_delivery_b.preout.type==1"
                          >{{item_delivery_b.preout.packs.packsize}}{{getEnumValue(units,item_delivery_b.preout.packs.unit_id)}}</span>
                          <span v-else>/</span>
                        </div>
                      </td>
                      <td>
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
                      <td v-if="index_delivery_b==0" :rowspan="item_delivery.length">
                        {{sale.ship_statistical_data[item_delivery_b.batchno].batch_return_quantity}}
                        {{getEnumValue(units,sale.ship_statistical_data[item_delivery_b.batchno].base_unit_id)}}
                      </td>
                      <td
                        style="padding:1px;width:100px;"
                        v-if="index_delivery_b==0"
                        :rowspan="item_delivery.length"
                      >
                        <el-input
                          size="mini"
                          v-model="sale.ship_statistical_data[item_delivery_b.batchno].total_money"
                        ></el-input>
                      </td>
                      <td
                        style="padding:1px;width:130px;"
                        v-if="index_delivery_b==0"
                        :rowspan="item_delivery.length"
                      >
                        <el-input
                          style="width:100px;"
                          size="mini"
                          v-model="sale.ship_statistical_data[item_delivery_b.batchno].total_quantity"
                        ></el-input>
                        <span>{{getEnumValue(units,sale.ship_statistical_data[item_delivery_b.batchno].base_unit_id)}}</span>
                      </td>
                      <td
                        v-if="index_delivery_b==0"
                        :rowspan="item_delivery.length"
                      >
                        <el-radio-group
                          v-model="sale.ship_statistical_data[item_delivery_b.batchno].return_type"
                        >
                          <div v-for="res in return_type_info">
                            <el-radio :label="res.id">{{res.name}}</el-radio>
                          </div>
                        </el-radio-group>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table> -->


            <table border="1" bordercolor="#E5E5E5" v-if="sale.ship_notices">
              <tr>
                <td>
                  <el-checkbox v-model="checktotal" @change="checktotal_change()"></el-checkbox><!--全选-->
                  <b>{{$t('sale.add.sale111')}}</b><!--批次号/合同号-->
                </td>
                <td width='75'>发货通知ID</td>
                <td width='100'>CAS</td>
                <td >{{$t('sale.add.sale15')}}</td><!--产品名称-->
                <td width='40'>{{$t('sale.add.sale17')}}</td><!--纯度-->
                <td width='60'>{{$t('sale.add.sale75')}}</td><!--类型-->
                <td width='100'>{{$t('sale.add.sale16')}}</td><!--规格-->
                <td width='100'>{{$t('sale.add.sale112')}}</td><!--发货数量-->
                <td width="70">{{$t('sale.add.sale113')}}</td><!--申请退货&已退数量-->
                <td width="100">{{$t('sale.add.sale117')}}</td><!--退货应收额-->
                <td width="100">{{$t('sale.add.sale116')}}</td><!--退货数量-->
                <td width="60">{{$t('sale.add.sale118')}}</td><!--货要退回-->
              </tr>
              <tr v-for="(item_delivery_b,index_delivery_b) in sale.ship_notices">
                <td width='130'>
                  <span>
                    <el-checkbox v-model="item_delivery_b.check" @change="check_change()"></el-checkbox>
                    <br />
                    {{item_delivery_b.batchno}}/
                    <br />
                    {{item_delivery_b.contract_detail_number}}
                  </span>
                </td>
                <td>{{item_delivery_b.id}}</td>
                <td>{{item_delivery_b.cas}}</td>
                <td style="word-break:break-all;">{{item_delivery_b.product_name}}</td>
                <td>{{item_delivery_b.purity}}</td>
                <td>
                  <div v-if="item_delivery_b.preout">
                    <span
                      v-if="item_delivery_b.preout.type"
                    >{{getEnumValue(preout_type_info,item_delivery_b.preout.type)}}</span>
                  </div>
                </td>
                <td>
                  <div v-if="item_delivery_b.preout">
                    <span
                      v-if="item_delivery_b.preout.type==1"
                    >{{item_delivery_b.preout.packs.packsize}}{{getEnumValue(units,item_delivery_b.preout.packs.unit_id)}}</span>
                    <span v-else>/</span>
                  </div>
                </td>
                <td>
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
                <td >
                  {{sale.ship_statistical_data[item_delivery_b.id].batch_return_quantity}}
                  {{getEnumValue(units,sale.ship_statistical_data[item_delivery_b.id].base_unit_id)}}
                </td>
                <td
                  style="padding:1px;"
                >
                  <el-input
                    size="mini"
                    v-model="sale.ship_statistical_data[item_delivery_b.id].total_money"
                  ></el-input>
                </td>
                <td
                  style="padding:1px;"
                >
                  <el-input
                    size="mini"
                    v-model="sale.ship_statistical_data[item_delivery_b.id].total_quantity"
                    style="width:80%;"
                  ></el-input>
                  <span>{{getEnumValue(units,sale.ship_statistical_data[item_delivery_b.id].base_unit_id)}}</span>
                </td>
                <td
                >
                  <el-radio-group
                    v-model="sale.ship_statistical_data[item_delivery_b.id].return_type"
                  >
                    <div v-for="res in return_type_info">
                      <el-radio :label="res.id">{{res.name}}</el-radio>
                    </div>
                  </el-radio-group>
                </td>
              </tr>
            </table>


            <div v-if="sale.ship_notices">
              {{$t('sale.add.sale136')}}:<!--变更备注-->
              <el-input
                size="mini"
                type="textarea"
                placeholder
                style="width: 100%;"
                v-model="remark"
              ></el-input>
            </div>
            <div v-if="sale.ship_notices" style="text-align:center;margin-bottom:10px;">
              <el-button type="primary" size="mini" @click="save_delivery()">{{$t('sale.add.sale137')}}</el-button><!--退货提交-->
            </div>
            <el-form label-width="90px" label-position="top" v-if="sale.return_date&&sale.return_date.length!=0">
              <el-form-item :label="$t('sale.add.sale115')" label-width="90px"><!--退货数据：-->
                <table
                  border="1"
                  bordercolor="#E5E5E5"
                  v-for="item in sale.details" v-if='sale.return_date[item.id]'
                >
                  <tr>
                    <td width="130">合同号</td><!--批次号/合同号-->
                    <td width="130">批次号</td>
                    <td width="100">Cas</td>
                    <td width="200">{{$t('sale.add.sale15')}}</td><!--产品名称-->
                    <td width="100">{{$t('sale.add.sale116')}}</td><!--退货数量-->
                    <td width="100">{{$t('sale.add.sale117')}}</td><!--退货应收额-->
                    <td>{{$t('sale.add.sale59')}}</td><!--备注-->
                    <td width="100">{{$t('sale.add.sale118')}}</td><!--货要退回-->
                    <td width='60'>{{$t('sale.add.sale105')}}</td><!--审核状态-->
                  </tr>
                  <tr v-for="(item_i,index_i) in sale.return_date[item.id]" >
                    <td :rowspan="sale.return_date[item.id].length" v-if="index_i===0">
                      <span>
                        {{item_i.contract_no}}
                      </span>
                    </td>
                    <td>{{item_i.batchno}}</td>
                    <td >{{item_i.cas}}</td>
                    <td >{{item_i.prod_name}}</td>
                    <td >
                      {{item_i.quantity}}
                      {{getEnumValue(units,item_i.quantity_unit_id)}}
                    </td>
                    <td>{{item_i.money}}{{getEnumValue(currencys,item_i.currency_id)}}</td>
                    <td>{{item_i.return_note}}</td>
                    <td >{{getEnumValue(return_type_info,item_i.return_type)}}</td>
                    <td :style="item_i.status==3?'color:red':'color:green'">
                      <span>{{getEnumValue(return_status_info,item_i.status)}}</span>
                    </td>
                  </tr>
                </table>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane :label="$t('sale.add.sale119')"><!--收款数据-->
            <!-- <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-bottom:10px;">
              <tr>
                <td width="120">{{$t('sale.add.sale44')}}</td>
                <td width="41">{{$t('sale.add.sale75')}}</td>
                <td width="80">{{$t('sale.add.sale108')}}</td>
                <td width="130">{{$t('sale.add.sale120')}}</td>
                <td width="80">{{$t('sale.add.sale22')}}</td>
                <td width="80">{{$t('sale.add.sale121')}}</td>
                <td width="90">{{$t('sale.add.sale122')}}</td>
                <td width="90">{{$t('sale.add.sale123')}}</td>
                <td width="70">{{$t('sale.add.sale124')}}(￥)</td>
                <td width="60">{{$t('sale.add.sale125')}}</td>
                <td >{{$t('sale.add.sale59')}}</td>
                <td width="70">{{$t('sale.add.sale128')}}</td>
                <td width="80">{{$t('status')}}</td>
              </tr>
              <tr v-for="item in sale.details">
                <td class="td_checkbox" v-if="sale.receipt_data[item.id]">
                  <el-radio
                    v-model="radio"
                    :label="item.id"
                    @change="radio_change(item)"
                  >{{item.contract_number}}</el-radio>
                </td>
                <td style="padding:0px;" colspan="14" v-if="sale.receipt_data[item.id]">
                  <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                    <tr v-for="item_i in sale.receipt_data[item.id]">
                      <td width="40" style="color:#67C23A;">{{$t('sale.add.sale138')}}</td>
                      <td width="80">{{item_i.created_at}}</td>
                      <td width="130">
                        <span v-if="item_i.bank_id">{{getEnumValue(bank_info,item_i.bank_id)}}</span>
                        <span v-else>
                          {{getEnumValue(Account,item_i.account_id,'account_name')}}
                          <span v-if="getEnumValue(Account,item_i.account_id,'account')">{{'-'+getEnumValue(Account,item_i.account_id,'account')}}</span>
                          <span v-if="getEnumValue(Account,item_i.account_id,'currency')">{{'-'+getEnumValue(Account,item_i.account_id,'currency')}}</span> 
                        </span>
                      </td>
                      <td width="80">
                        {{Number(item_i.bank_fee)+Number(item_i.checkin)+Number(item_i.currentaccount)}}
                        {{getEnumValue(currencys,item_i.currency_id)}}
                      </td>
                      <td width="80">
                        {{item_i.bank_fee?item_i.bank_fee:0}}
                        {{getEnumValue(currencys,item_i.currency_id)}}
                      </td>
                      <td
                        width="90"
                      >{{item_i.currentaccount?item_i.currentaccount:0}}{{getEnumValue(currencys,item_i.currency_id)}}</td>
                      <td
                        width="90"
                      >{{item_i.checkin?item_i.checkin:0}}{{getEnumValue(currencys,item_i.currency_id)}}</td>
                      <td
                        width="70"
                      >{{item_i.commission_fee}}</td>
                      <td width="60">{{item_i.currency_rate}}</td>
                      <td>{{item_i.note}}</td>
                      <td
                        width="70"
                      >{{getEnumValue(pay_status_info,item_i.pay_status)}}</td>
                      <td
                        width="79"
                        :style="item_i.status==1?'color:green':'color:red'"
                      >{{item_i.status!=null?getEnumValue(obsolete_status_info,item_i.status):''}}</td>
                    </tr>
                    <tr v-for="item_j in sale.refund_data[item.id]">
                      <td style="color:#F56C6C;">{{$t('sale.add.sale139')}}</td>
                      <td>{{item_j.created_at}}</td>
                      <td>
                        {{item_j.opening_bank}}
                        <br />
                        {{item_j.payee}}
                        <br />
                        {{item_j.bank_account_number}}
                      </td>
                      <td>{{item_j.total_money?item_j.total_money:0}}{{getEnumValue(currencys,item_j.currency_id)}}</td>
                      <td>{{item_j.bank_fee?item_j.bank_fee:0}}{{getEnumValue(currencys,item_j.currency_id)}}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{{item_j.remark}}</td>
                      <td>
                        <span :style="item_j.pay_status==10?'color:red;':''">{{getEnumValue(pay_status_info,item_j.pay_status)}}</span>
                      </td>
                      <td :style="item_j.status==1?'color:green':'color:red'">
                        {{getEnumValue(refund_status_info,item_j.status)}}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table> -->

            <table border="1" bordercolor="#E5E5E5" style="width:100%;" v-for="(item,index) in sale.details" :key="index">
              <tr v-if="index==0">
                <td width="120">{{$t('sale.add.sale44')}}</td><!--合同号-->
                <td width="40">{{$t('sale.add.sale75')}}</td><!--类型-->
                <td width="80">{{$t('sale.add.sale108')}}</td><!--日期-->
                <td width="130">{{$t('sale.add.sale120')}}</td><!--银行-->
                <td width="80">{{$t('sale.add.sale22')}}</td><!--金额-->
                <td width="80">{{$t('sale.add.sale121')}}</td><!--银行费用-->
                <td width="90">{{$t('sale.add.sale122')}}</td><!--冲往来账-->
                <td width="90">{{$t('sale.add.sale123')}}</td><!--到帐金额-->
                <td width="70">{{$t('sale.add.sale124')}}(￥)</td><!--佣金-->
                <td width="60">{{$t('sale.add.sale125')}}</td><!--汇率-->
                <td >{{$t('sale.add.sale59')}}</td><!--备注-->
                <td width="70">{{$t('sale.add.sale128')}}</td><!--付款状态-->
                <td width="80">{{$t('status')}}</td><!--状态-->
              </tr>
              <tr  v-for="(item_i,index_i) in sale.receipt_data[item.id]">
                <td width="120" class="td_checkbox" v-if="index_i==0" 
                  :rowspan="(sale.receipt_data[item.id]?sale.receipt_data[item.id].length:'')+(sale.refund_data[item.id]?sale.refund_data[item.id].length:'')">
                  <el-radio
                    v-model="radio"
                    :label="item.id"
                    @change="radio_change(item)"
                  >{{item.contract_number}}</el-radio>
                </td>
                <td width="40" style="color:#67C23A;">{{$t('sale.add.sale138')}}</td>
                <td width="80">{{item_i.created_at}}</td>
                <td width="130">
                  <span v-if="item_i.bank_id">{{getEnumValue(bank_info,item_i.bank_id)}}</span>
                  <span v-else>
                    {{getEnumValue(Account,item_i.account_id,'account_name')}}
                    <span v-if="getEnumValue(Account,item_i.account_id,'account')">{{'-'+getEnumValue(Account,item_i.account_id,'account')}}</span>
                    <span v-if="getEnumValue(Account,item_i.account_id,'currency')">{{'-'+getEnumValue(Account,item_i.account_id,'currency')}}</span> 
                  </span>
                </td>
                <td width="80">
                  {{Number(item_i.bank_fee)+Number(item_i.checkin)+Number(item_i.currentaccount)}}
                  {{getEnumValue(currencys,item_i.currency_id)}}
                </td>
                <td width="80">
                  {{item_i.bank_fee?item_i.bank_fee:0}}
                  {{getEnumValue(currencys,item_i.currency_id)}}
                </td>
                <td width="90">{{item_i.currentaccount?item_i.currentaccount:0}}{{getEnumValue(currencys,item_i.currency_id)}}</td>
                <td width="90">{{item_i.checkin?item_i.checkin:0}}{{getEnumValue(currencys,item_i.currency_id)}}</td>
                <td width="70">{{item_i.commission_fee}}</td>
                <td width="60">{{item_i.currency_rate}}</td>
                <td>{{item_i.note}}</td>
                <td width="70">{{getEnumValue(pay_status_info,item_i.pay_status)}}</td>
                <td width="80"
                  :style="item_i.status==1?'color:green':'color:red'"
                >{{item_i.status!=null?getEnumValue(obsolete_status_info,item_i.status):''}}</td>
              </tr>
              <tr  v-for="item_j in sale.refund_data[item.id]">
                <td width="40" style="color:#F56C6C;">{{$t('sale.add.sale139')}}</td>
                <td width="80">{{item_j.created_at}}</td>
                <td width="130">
                  {{item_j.opening_bank}}
                  <br />
                  {{item_j.payee}}
                  <br />
                  {{item_j.bank_account_number}}
                </td>
                <td width="80">{{item_j.total_money?item_j.total_money:0}}{{getEnumValue(currencys,item_j.currency_id)}}</td>
                <td width="80">{{item_j.bank_fee?item_j.bank_fee:0}}{{getEnumValue(currencys,item_j.currency_id)}}</td>
                <td width="90"></td>
                <td width="90"></td>
                <td width="70"></td>
                <td width="60"></td>
                <td>{{item_j.remark}}</td>
                <td width="70">
                  <span :style="item_j.pay_status==10?'color:red;':''">{{getEnumValue(pay_status_info,item_j.pay_status)}}</span>
                </td>
                <td width="80" :style="item_j.status==1?'color:green':'color:red'">
                  {{getEnumValue(refund_status_info,item_j.status)}}
                </td>
              </tr>
            </table>



            <el-form label-width="150px">
              <el-form-item :label="$t('sale.add.sale140')" :required="true"><!--申请退款信息：-->
                <el-select
                  size="mini"
                  @change="collection_information_change()"
                  v-model="collection_data.information"
                  style="width:300px;margin-right:10px;"
                >
                  <el-option
                    v-for="item in collection_information"
                    :key="item.id"
                    :label="((item.country?item.country.Cname:'')+(item.province_code?'-'+item.province_code:'')+','+item.opening_bank+','+item.payee+','+item.bank_account_number)"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button size="mini" type="primary" @click="Payment_account()">{{$t('sale.add.sale141')}}</el-button><!--收款账户-->
              </el-form-item>
              <el-form-item>
                <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                  <tr style="background:#F5F8FB;">
                    <td>{{$t('sale.add.sale142')}}</td><!--开户银行-->
                    <td>{{$t('sale.add.sale69')}}/{{$t('sale.add.sale151')}}</td>
                    <td>{{$t('sale.add.sale143')}}</td><!--收款人-->
                    <td>{{$t('sale.add.sale144')}}</td><!--开户账号-->
                    <td>{{$t('sale.add.sale145')}}</td><!--银行备注-->
                  </tr>
                  <tr>
                    <td>{{collection_data.opening_bank}}</td>
                    <td>
                      <span v-if="collection_data.country">{{collection_data.country.Cname}},</span>
                      <span>{{collection_data.province_code}}</span>
                    </td>
                    <td>{{collection_data.payee}}</td>
                    <td>{{collection_data.bank_account_number}}</td>
                    <td>{{collection_data.bank_remark}}</td>
                  </tr>
                </table>
              </el-form-item>
              <el-form-item label="Swift" v-if="wam" :required="true"><!--swift-->
                <el-input
                  size="mini"
                  style="width:300px;"
                  v-model="collection_data.swift"
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('sale.add.sale290')" v-if="wam" :required="true"><!--汇款货币-->
                <el-select size="mini" v-model="collection_data.trade_currency" style="width:200px;">
                  <el-option v-for="item in currencys_rem" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('sale.add.sale291')" v-if="wam" :required="true"><!--汇款费用-->
                <el-select size="mini" v-model="collection_data.remittance_fee_selection" style="width:300px;">
                  <el-option v-for="item in remittance_fee_selection" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('sale.add.sale146')" :required="true"><!--付款方式：-->
                <el-select size="mini" v-model="collection_data.pay_type" style="width:300px;">
                  <el-option v-for="item in pay_type_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('sale.add.sale292')" :required="true"><!--退款银行-->
                <el-select size="mini" v-model="collection_data.refund_bank_id" style="width:300px;">
                  <el-option v-for="item in bank_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('sale.add.sale147')" :required="true"><!--实际退款金额：-->
                <el-input
                  size="mini"
                  style="width:200px;margin-right:20px;"
                  v-model="collection_data.actual_amount"
                ></el-input>
                <el-checkbox v-model="check">{{$t('sale.add.sale148')}}</el-checkbox><!--退款转往来账-->
              </el-form-item>
              <el-form-item :label="$t('sale.add.sale59')"><!--备注：-->
                <el-input
                  size="mini"
                  type="textarea"
                  style="width:400px;"
                  v-model="collection_data.remark"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="primary" @click="refund_application()">{{$t('sale.add.sale149')}}</el-button><!--提交变更-->
              </el-form-item>
            </el-form>
            <el-dialog :visible.sync="dialogCollection" width="50%" @close="bank_account_close()">
              <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                <tr>
                  <td>{{$t('sale.add.sale142')}}</td><!--开户银行-->
                  <td>{{$t('sale.add.sale143')}}</td><!--收款人-->
                  <td>{{$t('sale.add.sale150')}}</td><!--银行账号-->
                  <td>{{$t('sale.add.sale69')}}/{{$t('sale.add.sale151')}}</td><!--国家/省市-->
                  <td width="60">{{$t('sale.add.sale75')}}</td><!--类型-->
                  <td>{{$t('sale.add.sale59')}}</td><!--备注-->
                  <td width="60">{{$t('sale.add.sale81')}}</td><!--默认-->
                  <td width="110">{{$t('sale.add.sale80')}}</td><!--操作-->
                </tr>
                <tr v-for="item in bank_account_list">
                  <td>{{item.opening_bank}}</td>
                  <td>{{item.payee}}</td>
                  <td>{{item.bank_account_number}}</td>
                  <td>
                    <!-- <span
                      v-if="item.city"
                    >{{item.city.CountryCode}},{{item.city.District}},{{item.city.Name}}</span> -->
                    <span v-if="item.country">{{item.country.Cname}},</span>
                    <span>{{item.province_code}}</span>
                  </td>
                  <td>{{type_info.filter(res=>{return res.id==item.type})[0].name}}</td>
                  <td>{{item.remark}}</td>
                  <td>{{is_default_info.filter(res=>{return res.id==item.is_default})[0].name}}</td>
                  <td style="text-align:center;">
                    <el-button size="mini" type="primary" @click="bank_account_update(item)">{{$t('edit')}}</el-button><!--修改-->
                    <el-button size="mini" type="danger" @click="bank_account_destory(item)">{{$t('delete')}}</el-button><!--删除-->
                  </td>
                </tr>
              </table>
              <el-form label-width="115px">
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('sale.add.sale69')" :required="wam"><!--国家-->
                      <el-select
                        v-model="bank_account.country_code"
                        filterable
                        @change="selected_country()"
                        size="mini"
                      >
                        <el-option
                          v-for="(item,index) in Country"
                          :key="index"
                          :label="item.Name"
                          :value="item.Code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('sale.add.sale152')"><!--省份-->
                      <el-select
                        v-model="bank_account.province_code"
                        filterable
                        @change="selected_province()"
                        size="mini"
                        clearable
                      >
                        <el-option
                          v-for="(i,index) in province"
                          :key="index"
                          :label="i.province_code"
                          :value="i.province_code"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('sale.add.sale153')" :required="true"><!--账号类型-->
                      <el-select size="mini" style="width:100%;" v-model="bank_account.type">
                        <el-option v-for="item in type_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item :hidden="$t('sale.add.sale154')"><!--地市-->
                  <el-select v-model="bank_account.city_id" filterable size="mini">
                    <el-option v-for="(i,index) in city" :key="index" :label="i.Name" :value="i.ID"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale142')" :required="true"><!--开户银行：-->
                  <el-input size="mini" style="width:300px;" v-model="bank_account.opening_bank"></el-input>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale143')" :required="true"><!--收款人：-->
                  <el-input size="mini" style="width:300px;" v-model="bank_account.payee"></el-input>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale150')" :required="true"><!--银行账号：-->
                  <el-input
                    size="mini"
                    style="width:400px;"
                    v-model="bank_account.bank_account_number"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale59')"><!--备注：-->
                  <el-input
                    size="mini"
                    type="textarea"
                    style="width:400px;"
                    v-model="bank_account.remark"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale76')"><!--是否默认-->
                  <el-select size="mini" style="width:200px;" v-model="bank_account.is_default">
                    <el-option v-for="item in is_default_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" @click="bank_account_create()">{{$t('save')}}</el-button><!--保存-->
                  <el-button size="mini" @click="bank_account_close()">{{$t('back')}}</el-button><!--返回-->
                </el-form-item>
              </el-form>
            </el-dialog>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item class="form_title">
        <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
          <b>{{$t('sale.add.sale129')}}</b><!--合同条款-->
        </el-button>
      </el-form-item>
      <el-form-item v-show="form_show2" class="from-item">
        <table border="1" bordercolor="#E5E5E5">
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
              <el-input v-model="sale.contract_number"></el-input>
            </td>
            <td class="dateInput">
              <el-date-picker
                type="date"
                style="width:100%;"
                v-model="sale.contract_date"
                value-format="yyyy-MM-dd"
                size="small"
              ></el-date-picker>
            </td>
            <td>
              <el-input v-model="sale.contract_address"></el-input>
            </td>
            <td>
              <el-select v-model="sale.sale_id" clearable filterable>
                <el-option
                  v-for="(i,index) in sale_list"
                  :key="index"
                  :label="i.name"
                  :value="i.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="sale.customer_po"></el-input>
            </td>
            <td>
              <el-input v-model="sale.settle_type"></el-input>
            </td>
          </tr>
          <tr>
            <td>
              <span style="color:red;">*</span>
              {{$t('sale.add.sale49')}}
            </td>
            <td>
              <el-select v-model="sale.trade_type_id" clearable filterable placeholder>
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
              <el-input v-model="sale.remarks.transportation"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale50')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.quality_stardard"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale51')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.reasonable_loss"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale52')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.package_stardard"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale53')}}</td>
            <td colspan="6">
              <el-input v-model="sale.remarks.accept_stardard"></el-input>
            </td>
          </tr>
          <tr>
            <td>{{$t('sale.add.sale54')}}</td>
            <td colspan="1" class="dateInput">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="sale.expdate_start"
                type="date"
                size="small"
              ></el-date-picker>
            </td>
            <td>{{$t('sale.add.sale55')}}</td>
            <td colspan="1" class="dateInput">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="sale.expdate_end"
                type="date"
                size="small"
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
              <el-input v-model="sale.remarks.note"></el-input>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button size="mini" @click="close()">{{$t('back')}}</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import Big from "@/big/a/big.mjs";
import {
  sale_lists,
  contract_change,
  change_log_edit,
  retrun_application,
  bank_account_create,
  bank_account_update,
  bank_account_destory,
  refund_application
} from "@/api/sale";
import { listTotal } from "@/api/prod";
import { getEnumValue } from "@/utils/index";
import { province_list, city_list,country_list } from "@/api/user";
import {mapActions} from 'vuex'
export default {
  name: "sales-change",
  data() {
    return {
      useID:'',
      index: "",
      remark: "",
      bank_update_id: "",
      radio: "",
      check: false,
      checktotal: false,
      dialogVisible: false,
      dialogCollection: false,
      dialog: false,
      wam:false,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      sale: { remarks: {},receipt_data:{} },
      list: {},
      bank_account_list: [],
      bank_account: {
        bank_account_number: "",
        is_default: 0,
        member_id: "",
        opening_bank: "",
        payee: "",
        type: "",
        province_code: "",
        city_id: "",
        remark: "",
        country_code:'',
        country:''
      },
      collection_data: {
        information: "",
        saler_contract_id: "",
        saler_contract_detail_id: "",
        customer_id: "",
        opening_bank: "",
        payee: "",
        bank_account_number: "",
        bank_remark: "",
        pay_type: 1,
        // bank_fee: "",
        actual_amount: "",
        remark: "",
        transfer_to_account: "",
        receipt_id: [],
        currency_id: "",
        corp_id: "",
        province_code:'',
        country:'',
        country_code:'',
        swift:'',
        trade_currency:'',
        remittance_fee_selection:'',
        refund_bank_id:'',
        type:''
      },
      units: [],
      currencys: [],
      additional_cost_type: [],
      status_info: [],
      sale_list: [],
      trade_mode: [],
      preout_type_info: [],
      type_info: [],
      is_default_info: [],
      Country:[],
      province: [],
      city: [],
      bank_info: [],
      collection_information: [],
      pay_type_info: [],
      refund_status_info: [],
      return_status_info: [],
      pay_status_info: [],
      transfer_to_account: [],
      return_type_info:[],
      obsolete_status_info:[],
      invoice_type:[],
      remittance_fee_selection:[],
      currencys_rem:[],
      Account:[],
    };
  },
  created() {
    if (this.$route.query.ids) {
      this.fetchData();
      this.useID = this.$route.query.ids
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'sales-change') {
        this.useID = this.$route.query.ids
      }
    },
    useID(to,form){
      if(to!=form&&to&&form){
        if (this.$route.query.ids) {
          this.fetchData();
        }
      }
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    fetchData() {
      listTotal(
        "saler_contract/" + this.$route.query.ids + "/contract_change_view"
      ).then(res => {
        for (let i in res.data.ship_statistical_data) {
          res.data.ship_statistical_data[i].return_type = 2;
        }
        for (let i in res.data.ship_notices) {
          res.data.ship_notices[i].check = false;
        }
        if(res.data.type==2){
          this.wam = true
        }else{
          this.wam = false
        }
        if(res.data.customer_id==71139){
          if(res.data.details[0].invoice_type_id==2){
            this.collection_data.refund_bank_id = 15
          }else{
            this.collection_data.refund_bank_id = 14
          }
        }else{
          this.collection_data.refund_bank_id = ''
        }
        this.sale = JSON.parse(JSON.stringify(res.data));
        this.units = res.enum.units;
        this.currencys = res.enum.currencys;
        this.additional_cost_type = res.enum.additional_cost_type;
        this.status_info = res.enum.status_info;
        this.trade_mode = res.enum.trade_mode;
        this.preout_type_info = res.enum.preout_type_info;
        this.bank_info = res.enum.bank_info;
        this.pay_type_info = res.enum.pay_type_info;
        this.pay_status_info = res.enum.pay_status_info;
        this.refund_status_info = res.enum.refund_status_info;
        this.return_status_info = res.enum.return_status_info;
        this.transfer_to_account = res.enum.transfer_to_account;
        this.return_type_info = res.enum.return_type_info
        this.obsolete_status_info = res.enum.obsolete_status_info
        this.invoice_type = res.enum.invoice_type
        this.remittance_fee_selection = res.enum.remittance_fee_selection
        this.Account = this.GEnums.Account
        this.currencys_rem = []
        res.enum.currencys.forEach(i=>{
          if(i.id!=2){
            this.currencys_rem.push(i)
          }
        })
        this.sale.ship_notices = [];
        obj(this.sale.ship_notices, res.data.ship_notices);
        if(res.data.details.length==1){
            this.radio = res.data.details[0].id
            this.radio_change(res.data.details[0])
        }
        listTotal(
          "saler_contract/" + this.sale.customer_id + "/bank_account"
        ).then(res => {
          this.collection_information = res.data;
        });
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
      this.checktotal = false
    },
    claim_add(){
      var item = {
        claim_pack_number:'',
        claim_pack_size:'',
        claim_unit_id:''
      }
      this.list.claims.push(item)
    },
    claim_dev(index_i){
      this.list.claims.splice(index_i,1)
    },
    collection_information_change() {
      var arr = this.collection_information.filter(res => {
        return res.id == this.collection_data.information;
      })[0];
      this.collection_data.opening_bank = arr.opening_bank;
      this.collection_data.payee = arr.payee;
      this.collection_data.bank_account_number = arr.bank_account_number;
      this.collection_data.bank_remark = arr.remark;
      this.collection_data.province_code = arr.province_code;
      this.collection_data.country = arr.country;
      this.collection_data.country_code = arr.country.Code
    },
    show_dialog(item, index) {
      this.dialogVisible = true;
      this.index = index;
      this.list = {
        contract_number: item.contract_number,
        product_name_cn: item.product_name_cn,
        contract_detail_id: item.id,
        package: item.package,
        purity: item.purity,
        quantity: item.quantity,
        quantity_unit: item.quantity_unit,
        currency_id: item.currency_id,
        total_money: (
          Number(item.total_money) - Number(item.additional_cost)
        ).toFixed(2),
        price: item.price,
        additional_cost: item.additional_cost,
        additional_cost_info: JSON.parse(JSON.stringify(item.additionals)),
        status: 0,
        remark: item.remark,
        commission:item.commission,
        type: 1,
        invoice_type_id:item.invoice_type_id,
        straight_hair_note:item.straight_hair_note,
        claims:item.claims?JSON.parse(JSON.stringify(item.claims)):[],
        prod_id:item.prod_id
      };
    },
    show_dialog_log(item, index, item_fa) {
      this.dialogVisible = true;
      this.dialog = true;
      this.index = index;
      this.list = {
        id: item.id,
        contract_number: item_fa.contract_number,
        product_name_cn: item_fa.product_name_cn,
        contract_detail_id: item_fa.id,
        package: item.package,
        purity: item.purity,
        quantity: item.quantity,
        quantity_unit: item.quantity_unit,
        currency_id: item.currency_id,
        total_money: (
          Number(item.total_money) - Number(item.additional_cost)
        ).toFixed(2),
        price: item.price,
        additional_cost: item.additional_cost,
        additional_cost_info: JSON.parse(
          JSON.stringify(item.additional_cost_info)
        ),
        status: 0,
        remark: item.remark,
        commission:item.commission,
        type: 1,
        invoice_type_id:item.invoice_type_id,
        straight_hair_note:item.straight_hair_note,
        prod_id:item_fa.prod_id,
        claims:item.claims?JSON.parse(JSON.stringify(item.claims)):[],
      };
    },
    delete_cost(index) {
      this.list.additional_cost_info.splice(index, 1);
    },
    add_cost() {
      this.list.additional_cost_info.push({
        id: null,
        additional_type_id: "",
        price: ""
      });
    },
    change_quantity() {
      if (this.list.quantity && this.list.quantity >= 0) {
        this.list.total_money = new Big(this.list.quantity)
          .times(this.list.price)
          .toFixed(2);
      }
    },
    change_price() {
      if (this.list.price && this.list.price > 0) {
        this.list.total_money = new Big(this.list.quantity)
          .times(this.list.price)
          .toFixed(2);
      }
    },
    change_money() {
      if (this.list.quantity && this.list.quantity > 0) {
        this.list.price = new Big(this.list.total_money)
          .div(this.list.quantity)
          .toFixed(2);
      }
    },
    checktotal_change() {
      this.sale.ship_notices.forEach(res => {
        res.check = this.checktotal;
      });
    },
    check_change() {
      let num = 0
      this.sale.ship_notices.forEach(res => {
        if (res.check) {
          num++
        } 
      });
      if(num == this.sale.ship_notices.length){
        this.checktotal = true;
      }else{
        this.checktotal = false;
      }
    },
    hide_dialogVisible() {
      let num = 0;
      var arr = [];
      this.list.additional_cost_info.forEach((item, index) => {
        if (item.price && item.additional_type_id) {
          num = new Big(num).plus(item.price);
          arr.push(item);
        }
      });
      this.list.additional_cost_info = arr;
      this.list.additional_cost = Number(num);
      if (!this.dialog) {
        contract_change(this.list).then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
            this.dialogVisible = false;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      } else {
        change_log_edit(this.list).then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            this.fetchData();
            this.dialogVisible = false;
            this.dialog = false;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      }
    },
    hide_close() {
      this.dialogVisible = false;
      this.dialog = false;
      this.list = {
        contract_detail_id: "",
        package: "",
        purity: "",
        quantity: "",
        quantity_unit: "",
        currency_id: "",
        total_money: "",
        price: "",
        additional_cost: "",
        additional_cost_info: [],
        status: "",
        remark: "",
        commission:'',
        type: 1,
        straight_hair_note:''
      };
    },
    save_delivery() {
      var arr = {
        saler_contract_id: this.sale.id,
        returns: []
      };
      this.sale.ship_notices.forEach(res => {
        if (res.check == true) {
          var obj = {
            inventory_id: res.inventory_id,
            warehouse_id: res.warehouse_id,
            batchno: res.batchno,
            return_type: this.sale.ship_statistical_data[res.id].return_type,
            money: this.sale.ship_statistical_data[res.id].total_money,
            currency_id: this.sale.ship_statistical_data[res.id].currency_id,
            contract_id: res.contract_detail_id,
            prod_id: res.prod_id,
            prod_no: res.prod.prodno,
            prod_name: res.product_name,
            prod_name_cn: res.prod.name_cn,
            cas: res.cas,
            contract_no: res.contract_detail_number,
            quantity: Number(this.sale.ship_statistical_data[res.id].total_quantity),
            quantity_unit_id: this.sale.ship_statistical_data[res.id].base_unit_id,
            return_note: this.remark,
            package_id:res.package_id,
            package_type:res.preout.type,
            notice_id:res.id
          };
          arr.returns.push(obj);
        }
      });
      retrun_application(arr).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
          this.checktotal = false
          this.checktotal_change()
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    Payment_account() {
      this.dialogCollection = !this.dialogCollection;
      listTotal(
        "saler_contract/" + this.sale.customer_id + "/bank_account"
      ).then(res => {
        this.type_info = res.enum.type_info;
        this.is_default_info = res.enum.is_default_info;
        this.bank_account_list = res.data;
      });
      country_list().then(res=>{
        this.Country = res.data
      })
      this.bank_account.country_code = 'CHN'
      // this.bank_account.country = 'China'
      province_list(this.bank_account.country_code).then(res => {
        this.province = res.data;
      });
    },
    selected_country(){
      // this.Country.forEach(item=>{
      //   if(item.Code==this.bank_account.country_code){
      //     this.bank_account.country = item.Name
      //   }
      // })
      this.bank_account.province_code = ''
      province_list(this.bank_account.country_code).then(res => {
        this.province = res.data;
      });
    },
    selected_province() {
      this.bank_account.city_id = "";
      city_list(this.bank_account.country_code, this.bank_account.province_code).then(res => {
        this.city = res.data;
      });
    },
    bank_account_update(item) {
      this.bank_account = {
        bank_account_number: item.bank_account_number,
        is_default: item.is_default,
        member_id: item.member_id,
        opening_bank: item.opening_bank,
        payee: item.payee,
        type: item.type,
        province_code: item.province_code,
        city_id: "",
        remark: item.remark,
        country_code: item.country_code,
        // country:item.country
      };
      // city_list(this.bank_account.country_code, this.bank_account.province_code).then(res => {
      //   this.bank_account.city_id = item.city_id;
      //   this.city = res.data;
      // });
      province_list(this.bank_account.country_code).then(res => {
        this.province = res.data;
      });
      this.bank_update_id = item.id;
    },
    bank_account_destory(item) {
      bank_account_destory(item, this);
    },
    bank_account_create() {
      if (this.bank_update_id) {
        bank_account_update(this.bank_account, this.bank_update_id, this).then(
          res => {
            if (res && res.code == 0) {
              this.$message({
                message: "success",
                type: "success"
              });
              this.bank_account_close();
              listTotal(
                "saler_contract/" + this.sale.customer_id + "/bank_account"
              ).then(res => {
                this.collection_information = res.data;
                this.collection_information_change()
              });
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
            }
          }
        );
      } else {
        this.bank_account.member_id = this.sale.customer_id;
        this.bank_account.flag = 1
        bank_account_create(this.bank_account).then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            this.bank_account_close();
            listTotal(
              "saler_contract/" + this.sale.customer_id + "/bank_account"
            ).then(res => {
              this.collection_information = res.data;
              this.collection_information_change()
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      }
    },
    radio_change(item) {
      this.check = false;
      this.collection_data = {
        information: "",
        contract_number: "",
        saler_contract_id: "",
        saler_contract_detail_id: "",
        customer_id: "",
        opening_bank: "",
        payee: "",
        bank_account_number: "",
        bank_remark: "",
        pay_type: 1,
        // bank_fee: "",
        actual_amount: "",
        remark: "",
        transfer_to_account: "",
        receipt_id: [],
        currency_id: "",
        corp_id: "",
        province_code:'',
        country:'',
        country_code:'',
        swift:'',
        trade_currency:'',
        remittance_fee_selection:'',
        refund_bank_id:'',
        type:''
      };
      if(this.sale.receipt_data[item.id]){
        this.sale.receipt_data[item.id].forEach(res => {
          this.collection_data.receipt_id.push(res.id);
        });
      }
      var arr = this.sale.details.filter(res => {
        return res.id == this.radio;
      })[0];
      if(this.sale.customer_id==71139){
          if(this.sale.details[0].invoice_type_id==2){
            this.collection_data.refund_bank_id = 15
          }else{
            this.collection_data.refund_bank_id = 14
          }
        }else{
          this.collection_data.refund_bank_id = ''
        }
      this.collection_data.contract_number = item.contract_number;
      this.collection_data.currency_id = item.currency_id;
      this.collection_data.saler_contract_id = arr.saler_contract_id;
      this.collection_data.saler_contract_detail_id = arr.id;
      this.collection_data.customer_id = this.sale.customer_id;
      this.collection_data.corp_id = this.sale.corp_id;
    },
    refund_application() {
      this.check
        ? (this.collection_data.transfer_to_account = 2)
        : (this.collection_data.transfer_to_account = 1);
      this.collection_data.type = this.sale.type
      refund_application(this.collection_data).then(res => {
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
    bank_account_close() {
      this.dialogCollection = false;
      this.city = [];
      this.bank_update_id = "";
      this.bank_account = {
        bank_account_number: "",
        is_default: 0,
        member_id: "",
        opening_bank: "",
        payee: "",
        type: "",
        province_code: "",
        city_id: "",
        remark: ""
      };
    },
    close() {
        let that=this
        that.$router.push({
          path: "/sales/sales",
          name: "sales-sales"
        });
        var tagName = 'sales-change'
        that.closeAdd({tagName})
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