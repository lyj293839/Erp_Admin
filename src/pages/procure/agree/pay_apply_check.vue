<style lang="scss" scoped type="text/scss">
  /deep/ .div {
    width: 100%;
    overflow: auto;
    font-size: 14px;
    border: 1px solid #e5e5e5;
    table {
      width: 100%;
    }
    .el-input__inner {
      border: 0px;
      padding: 0px 0px;
    }
    .el-dialog {
      table {
        width: 100%;
        border-collapse: collapse;
      }
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
    }
    th {
      padding-left: 5px;
      text-align: left;
    }
  }

  /deep/ .from-item {
    width: 100%;
    overflow: auto;
    flex-wrap: wrap;
    table {
      border-collapse: collapse;
      margin-top: 5px;
      .el-select {
        width: 100%;
      }
      .el-textarea__inner {
        padding: 0px;
        border: 0px;
        font-size: 14px;
      }
    }
  }

  /deep/ .quoteInput {
    .el-input__inner {
      border: 1px solid #dcdfe6;
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
</style>
<template>
  <d2-container>
    <div class="div">
      <el-form label-width="0px" :model="addContract" label-position="right">
        <!-- 双方 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree1')}}</b><!-- 双方 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th colspan="2" class="td">{{$t('procure.agree.agree2')}}</th><!-- 合同双方 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree3')}}</th>
                <!-- 名称 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree4')}}</th>
                <!-- 联系人 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree5')}}</th>
                <!-- 联系电话 -->
                <th class="td">{{$t('procure.agree.agree6')}}</th><!-- 传真 -->
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree7')}}</td><!-- 甲方 -->
                <td style="padding:0px 5px;">id:{{addContract.supplier_id}}</td>
                <td>
                  <el-select
                          v-model="addContract.supplier_name"
                          filterable
                          remote
                          reserve-keyword
                          :remote-method="supplyMethod"
                          @change="supplyChange()"
                          :loading="supplyloading"
                          style="width:100%;"
                          size="small"
                  >
                    <el-option
                            v-for="item in supply_list"
                            :label="item.name"
                            :key="item.id"
                            :value="item.name"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_contact" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_mobile" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_fax" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">{{$t('procure.agree.agree8')}}</td><!-- 乙方 -->
                <td>
                  <el-select
                          filterable
                          v-model="addContract.corp_id"
                          size="small"
                          @change="corpChange()"
                  >
                    <el-option
                            v-for="item in corp_List"
                            :label="item.name"
                            :key="item.id"
                            :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.corp_contact" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.corp_mobile" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.corp_fax" size="small"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 需求 -->
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree9')}}</b><!-- 需求 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <div v-for="(index,index_) in addContract.detail" :key="index_">
              <table border="1" bordercolor="#E5E5E5">
                <tr>
                  <th class="td">{{$t('procure.agree.agree10')}}</th><!-- 询单号 -->
                  <th class="td" width="150px"><span style="color:red;">*</span>CAS</th>
                  <th style="width:200px;"><span style="color:red;">*</span>{{$t('procure.agree.agree11')}}</th><!-- 产品名称 -->
                  <th class="td">{{$t('procure.agree.agree12')}}</th><!-- 品牌 -->
                  <th class="td">{{$t('procure.agree.agree13')}}</th><!-- 规格 -->
                  <th class="td">{{$t('procure.agree.agree14')}}</th><!-- 纯度 -->
                  <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree15')}}</th>
                  <!-- 数量 -->
                  <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree16')}}</th>
                  <!-- 数量单位 -->
                  <th class="td">{{$t('procure.agree.agree17')}}</th><!-- 币种 -->
                  <th class="td">{{$t('procure.agree.agree18')}}</th><!-- 单价 -->
                  <th class="td">{{$t('procure.agree.agree19')}}</th><!-- 金额 -->
                  <th>{{$t('procure.agree.agree20')}}</th><!-- 提交货时间 -->
                  <th class="td"></th>
                </tr>
                <tr>
                  <td>
                    <el-input readonly v-model="index.inquiry_id" size="small"></el-input>
                  </td>
                  <td>
                    <el-input readonly v-model="index.cas" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.product_name_cn" size="small"></el-input>
                  </td>
                  <td>
                    <el-select clearable v-model="index.brand_id" size="small">
                      <el-option
                              v-for="item in brand_list"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index.package" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.purity" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.quantity" @input="priceMoney()"
                              size="small"></el-input>
                  </td>
                  <td>
                    <el-select v-model="index.quantity_unit" size="small">
                      <el-option
                              v-for="item in units"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="index.currency_id" size="small">
                      <el-option
                              v-for="item in currency"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index.price" @input="priceMoney()" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.total_price" @input="totalMoney()" size="small"
                              readonly></el-input>
                  </td>
                  <td class="dateInputStyle">
                    <el-date-picker
                            type="date"
                            style="width:100%;"
                            v-model="index.delivery_date"
                            value-format="yyyy-MM-dd"
                            size="small"
                    ></el-date-picker>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td><span style="color:red;">*</span>{{$t('procure.agree.agree21')}}</td>
                  <!-- 子合同号 -->
                  <td>
                    <el-input
                            v-model="index.contract_number"
                            @change="contractChange()"
                            size="small"
                    ></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.product_name" size="small"></el-input>
                  </td>
                  <td><span style="color:red;">*</span> {{$t('procure.agree.agree22')}}</td><!-- 发票类型 -->
                  <td colspan="2">
                    <el-select v-model="index.invoice_type"
                               size="small" clearable>
                      <el-option
                              v-for="item,key in enums.pu_invoice_types"
                              :key="key"
                              :label="enums.pu_invoice_types[key]"
                              :value="enums.pu_invoice_types[key]"
                      ></el-option>
                    </el-select>
                  </td>
                  <td><span style="color:red;">*</span>{{$t('procure.agree.agree22_')}}</td>
                  <!-- 发票类型 -->
                  <td colspan="2">
                    <el-select v-model="index.invoice_type_id" size="small">
                      <el-option
                              v-for="item in InvoiceInfo"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <!--<td>-->
                      <!--{{$t('procure.agree.agree95')}}-->
                  <!--</td>-->
                  <!--<td colspan="3"></td>-->
                  <!--<td>{{index.additional_cost}}</td>-->
                  <td><span style="color:red;">*</span>{{$t('procure.agree.agree23')}}</td>
                  <!-- 是否现货 -->
                  <td>
                    <el-select v-model="index.is_stock" size="small">
                      <el-option
                              v-for="item in is_stock_info"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree28')}}</td><!-- 其他要求 -->
                  <td colspan="5">
                    <el-input v-model="index.checked_requirement" size="small"></el-input>
                  </td>
                  <td>{{$t('procure.agree.agree29')}}</td><!-- 存储条件 -->
                  <td colspan="2"></td>
                  <td>{{$t('procure.agree.agree30')}}</td><!-- 运输条件 -->
                  <td></td>
                  <td>{{$t('procure.agree.agree31')}}</td><!-- 危险性 -->
                  <td></td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree32')}}</td><!-- 包装要求 -->
                  <td colspan="5">
                    <el-input v-model="index.package_requirement" size="small"></el-input>
                  </td>
                  <td>{{$t('procure.agree.agree33')}}</td><!-- 要求发货时间 -->
                  <td colspan="6" class="dateInputStyle">
                    <el-date-picker
                            type="date"
                            style="width:100%;"
                            v-model="index.required_delivery_date"
                            value-format="yyyy-MM-dd"
                            size="small"
                    ></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree34')}}</td><!-- 标签要求 -->
                  <td colspan="5">
                    <el-input v-model="index.label_requirement" size="small"></el-input>
                  </td>
                  <td>{{$t('procure.agree.agree35')}}</td><!-- 发货备注 -->
                  <td colspan="6">
                    <el-input v-model="index.note" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree36')}}</td><!-- 随货文件 -->
                  <td colspan="5">
                    <el-checkbox-group v-model="index.product_file">
                      <el-checkbox
                              v-for="item in product_file_info"
                              :label="item.id"
                              :key="item.id"
                      >{{item.name}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </td>
                  <td>{{$t('procure.agree.agree37')}}</td><!-- 生产日期 -->
                  <td colspan="2" class="dateInputStyle">
                    <el-date-picker
                            type="date"
                            style="width:100%;"
                            v-model="index.production_date"
                            value-format="yyyy-MM-dd"
                            size="small"
                    ></el-date-picker>
                  </td>
                  <td><span style="color:red;">*</span>{{$t('procure.agree.agree38')}}</td>
                  <!-- 是否报关 -->
                  <td>
                    <el-select v-model="index.if_declare" size="small">
                      <el-option
                              v-for="item in if_declare_info"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="text" @click="hand_quoteinfo(index)" size="mini" disabled>
                      {{$t('procure.agree.agree39')}}
                    </el-button><!-- 采购报价 -->
                  </td>
                  <td></td>
                </tr>
                <tr v-if="addContract.detail.indexOf(index) == addContract.detail.length-1">
                  <td colspan="9"></td>
                  <td>{{$t('procure.agree.agree40')}}</td><!-- 总金额 -->
                  <td>
                    <el-input v-model="addContract.total_money" readonly size="small"></el-input>
                  </td>
                  <td colspan="2"></td>
                </tr>
              </table>
            </div>
          </el-form-item>
        </div>

        <!------付款数据---------->
        <el-form-item class="form_title" v-if="addContract.paylist.length>0">
          <el-button @click="form_show4 = !form_show4" type="text" icon="el-icon-arrow-down">
            <b>付款数据</b>
          </el-button>
        </el-form-item>
        <el-form-item v-show="form_show5" class="from-item" v-if="addContract.paylist.length>0">
          <table border="1" bordercolor="#E5E5E5" style="width:100%;">
            <tr>
              <th>#ID</th>
              <th width="200">申请时间</th>
              <th>支付方式</th>
              <th>申请金额</th>
              <th>支付金额</th>
              <th>付款时间</th>
              <th>退款金额</th>
              <th>货币</th>
              <th>状态</th>
              <th>备注</th>
              <th width="100">审核状态</th>
              <th width="80">操作</th>
            </tr>
            <tr v-for="(item,index) in addContract.paylist" :key="index">
              <td>{{item.id}}</td>
              <td>{{item.pay_time}}</td>
              <td>{{getEnumValue(enums.PayType,item.pay_type)}}</td>
              <td>{{item.pay_requestamount}}</td>
              <td>{{item.pay_amount}}
                <span v-if="item.offset_amount>0">(抵充往来账{{item.offset_amount}})</span>
              </td>
              <td>{{item.finance_pay_time}}</td>
              <td>{{item.refund_amount}}<span v-if="item.refund_credit_flag==1" style="font-size: 10px;">(往来账)</span>
              </td>
              <td>{{getEnumValue(enums.Currency,item.currency_id)}}</td>
              <td>
                <span v-if="item.status==-1">撤销</span>
                <span v-else>{{getEnumValue(enums.finance_pay_status,item.finance_pay_status)}}</span>
              </td>
              <td>{{item.note}}</td>
              <td>
                <div v-if="item.status!=-1">
                  <div v-if="item.check_status2==0">
                    <el-select size="mini" v-model="item.check_status" clearable
                               style="width:100px;">
                      <el-option
                              v-for="i in enums.paylist_check_status"
                              v-if="i.id!==0"
                              :key="i.id"
                              :label="i.name"
                              :value="i.id"
                      ></el-option>
                    </el-select>
                  </div>
                  <div v-else>
                    <div class="d2-text-center" style="color: #606266;font-size:12px;">
                      {{getEnumValue(enums.check_status,item.check_status)}}
                    </div>
                  </div>
                </div>
              </td>
              <td class="d2-text-center">
                <el-button type="primary" size="mini" v-if="item.check_status2==0&&item.status!=-1" @click="check_pay(item.check_status,item.id)">审批</el-button>
                <el-button type="danger" size="mini" v-if="item.status==1&&item.check_status2!=0&&item.finance_check_status==0" @click="check_pay(0,item.id)">撤销</el-button>
              </td>
            </tr>
          </table>
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>
<script>
    import play from "../agree/play";
    import $ from "jquery";
    import axios from "axios";
    import request from "@/plugin/axios";
    import Cookies from "js-cookie";
    import Big from "@/big/a/big.mjs";
    import {lists, listTotal, update, create, listPost} from "@/api/prod";
    import {edit, payment_verify} from "@/api/procure";

    export default {
        name: "procure-check",
        components: {
            play
        },
        data() {
            return {
                id: '',
                asd: "",
                bank_list: {},
                play: false,
                list: [],
                quote_info: {},
                additional_list: [],
                additional: false,
                quoteinfo: false,
                supplyloading: false,
                addContract: {
                    accept_mode: "",
                    supplier_id: "",
                    supplier_name: "",
                    supplier_contact: "",
                    supplier_mobile: "",
                    supplier_fax: "",
                    corp_id: "",
                    corp_name: "",
                    corp_contact: "",
                    corp_mobile: "",
                    corp_fax: "",
                    detail: [1],
                    contract_number: "",
                    contract_date: "",
                    signed_address: "",
                    purchase_user_id: "",
                    sale_id: "",
                    customer_po: "",
                    settle_type_id: "",
                    total_money: '',
                    currency_id: "",
                    package_standard: "",
                    reasonable_loss: "",
                    transportation: "",
                    quality_standard: "",
                    expdate: "",
                    if_invoice: "",
                    note: "",
                    if_echapter: "",
                    check_status: "",
                    check_content: ""
                },
                Addpay: {
                    procurement_contract_id: "",
                    supplier_id: "",
                    supplier_name: "",
                    pay_type: "",
                    pay_requestamount: "", //合计金额
                    pay_amount: "", //实付金额
                    currency_id: "",
                    bank_account_id: "",
                    bank: "",
                    bank_account: "",
                    receiver: "",
                    bank_note: "",
                    paybank: "",
                    offset_amount: 0, //往来账
                    corp_id: ''
                },
                form_show1: true,
                form_show2: true,
                form_show3: true,
                form_show4: true,
                form_show5: true,
                form_show6: true,
                supply_list: [],
                corp_List: [],
                units: [],
                currency: [],
                InvoiceInfo: [],
                testitems: [],
                is_stock_info: [],
                product_file_info: [],
                if_declare_info: [],
                purchaseList: [],
                salesList: [],
                settle_list: [],
                additional_type: [],
                transportation: [],
                brand_list: [],
                PayType: [],
                account_type_info: [],
                enums: {}
            };
        },
        watch: {
            $route(to, from) {
                if (to.name == 'procure-agree') {
                    this.fetchData()
                }
            }
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id
            }
            this.fetchData();
        },
        methods: {
            fetchData() {
                edit(this.$route.query.id).then(res => {
                    if (res && res.code == 0) {
                        res.data.paylist.forEach((items, index) => {
                            items.check_status2 = JSON.parse(JSON.stringify(items.check_status))
                            if (items.check_status == 0) {
                                items.check_status = 1
                            }
                        })
                        if (res.data.check_status == 0) {
                            res.data.check_status = 1
                        }
                        this.addContract = res.data
                        this.list = res.data.details;
                        this.list.forEach(item => {
                            item.additional = [];
                            item.additional_cost = 0;
                            item.quantity_unit = parseInt(item.quantity_unit);
                            item.currency_id = parseInt(item.currency_id);
                            if (item.brand_id == 0) {
                                item.brand_id = ''
                            }
                            if (item.product_file instanceof Array == false) {
                                var brr = [];
                                for (let i in item.product_file) {
                                    brr.push(parseInt(i));
                                }
                                item.product_file = brr;
                            }
                        });
                        this.addContract.detail = this.list;
                        this.addContract.sale_id = this.list[0].sale_id
                        for (var i = 0; i < this.addContract.detail.length; i++) {
                            this.addContract.total_money += (parseFloat(this.addContract.detail[i].total_price) + parseFloat(this.addContract.detail[i].additional_cost))
                        }
                        this.currency = res.enum.Currency
                        this.InvoiceInfo = res.enum.InvoiceInfo
                        this.Invoicetype = res.enum.Invoicetype
                        this.settle_list = res.enum.PayType
                        this.PurchaseSettlementMethod = res.enum.PurchaseSettlementMethod
                        this.account_type_info = res.enum.account_type_info
                        this.additional_cost_type = res.enum.additional_cost_type
                        this.brand_list = res.enum.brands
                        this.check_status = res.enum.check_status
                        this.company = res.enum.company
                        this.if_declare_info = res.enum.if_declare_info
                        this.is_stock_info = res.enum.is_stock_info
                        this.product_file_info = res.enum.product_file_info
                        this.testitems = res.enum.testitem
                        this.transportation = res.enum.transportation
                        this.units = res.enum.units
                        this.enums = res.enum
                    }
                })
                listTotal("data/user_list?user_type=101").then(res => {
                    this.purchaseList = res.data;
                });
                listTotal("data/user_list?user_type=102").then(res => {
                    this.salesList = res.data;
                });
            },
            select(i, item) {
                this.addContract.detail[i].checked_items.forEach((items, index) => {
                    items.child.forEach((m, n) => {
                        if (item.id == m.id) {
                            this.$set(
                                this.addContract.detail[i].checked_items[index],
                                "checked",
                                true
                            );
                        }
                    });
                });
            },
            select_parent(i, item) {
                this.addContract.detail[i].checked_items.forEach((items, index) => {
                    if (!items.checked) {
                        items.child.forEach((m, n) => {
                            m.checked = false;
                        });
                    }
                });
            },
            check_pay(status, id) {
                let obj = {
                    id: id,
                    check_status: status
                }
                payment_verify(obj, this)
            },
            contractChange() {
                this.addContract.contract_number = "";
                for (var i = 0; i < this.addContract.detail.length; i++) {
                    if (i < this.addContract.detail.length - 1) {
                        this.addContract.contract_number +=
                            this.addContract.detail[i].contract_number + "-";
                    } else {
                        this.addContract.contract_number += this.addContract.detail[
                            i
                            ].contract_number;
                    }
                }
            },
            totalMoney() {
                this.addContract.total_money = 0;
                for (var i = 0; i < this.addContract.detail.length; i++) {
                    // this.addContract.detail[i].price =
                    //   this.addContract.detail[i].total_price /
                    //   this.addContract.detail[i].quantity;
                    this.addContract.total_money += (parseFloat(this.addContract.detail[i].total_price) + parseFloat(this.addContract.detail[i].additional_cost))
                }
            },
            priceMoney() {
                this.addContract.total_money = 0;
                for (var i = 0; i < this.addContract.detail.length; i++) {
                    this.addContract.detail[i].total_price = (this.addContract.detail[i].price * this.addContract.detail[i].quantity).toFixed(2)
                    this.addContract.total_money += (parseFloat(this.addContract.detail[i].total_price) + parseFloat(this.addContract.detail[i].additional_cost))
                }
            },
            querySearch(queryString, cb) {
                var restaurants = [];
                for (var i = 0; i < this.transportation.length; i++) {
                    var a = {value: ""};
                    a.value = this.transportation[i];
                    restaurants.push(a);
                }
                var results = queryString ? restaurants : restaurants;
                cb(results);
            },
            supplyMethod(query) {
                if (query !== "") {
                    this.supplyloading = true;
                    setTimeout(() => {
                        this.supplyloading = false;
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            supplyChange() {
                this.addContract.supplier_id = this.supply_list.filter(item => {
                    return item.name == this.addContract.supplier_name;
                })[0].id;
                saler_contract_info(this.addContract.supplier_id).then(res => {
                    this.addContract.supplier_contact = res.data.info.contacts[0].name;
                    this.addContract.supplier_mobile = res.data.info.contacts[0].phone;
                    this.addContract.supplier_fax = res.data.info.contacts[0].fax;
                });
            },
            hand_quoteinfo(item) {
                this.quoteinfo = true;
                this.quote_info = item;
            },
            save_quoteinfo(item) {
                this.quoteinfo = false;
            },
            close_quoteinfo(item) {
                this.quoteinfo = false;
            },
            hand_additional(a) {
                this.additional = true;
                this.additional_list = a.additional;
                if (this.additional_list.length == 0) {
                    var ids = {additional_type_id: "", price: "", contract_detail_id: a.id};
                    this.additional_list.push(ids);
                }
            },
            add_Additional() {
                var item = {additional_type_id: "", price: ""};
                this.additional_list.push(item);
            },
            cut_additional(a) {
                if (this.additional_list.length > 1) {
                    this.additional_list = this.additional_list.filter(item => {
                        return item != a;
                    });
                }
            },
            save_Additional() {
                this.addContract.detail.forEach(item => {
                    for (var i = 0; i < this.additional_list.length; i++) {
                        if (this.additional_list[i].contract_detail_id == item.id) {
                            item.additional = this.additional_list.filter(res => {
                                return res.additional_type_id != "" && res.price != "";
                            });
                            item.additional_cost = 0;
                            item.additional.forEach(res => {
                                item.additional_cost = new Big(item.additional_cost).plus(res.price)
                                res.contract_detail_id = item.id;
                            });
                        }
                    }
                });
                this.addContract.detail.forEach(item => {
                    item.additional = item.additional.filter(res => {
                        return res.additional_type_id != "" && res.price != "";
                    });
                });
                this.addContract.total_money = 0;
                for (var i = 0; i < this.addContract.detail.length; i++) {
                    this.addContract.total_money += (parseFloat(this.addContract.detail[i].total_price) + parseFloat(this.addContract.detail[i].additional_cost))
                }
                this.additional = false;
                this.additional_list = [];
            },
            close_Additional() {
                this.addContract.detail.forEach(item => {
                    item.additional = item.additional.filter(res => {
                        return res.additional_type_id != "" || res.price != "";
                    });
                });
                this.additional = false;
                this.additional_list = [];
            },
            account() {
                // this.play = true;
            },
            noticeClose(even) {
                this.play = even;
            },
            bank() {
                this.bank_list = this.addContract.supplier_bank_account.filter(item => {
                    return item.id == this.asd;
                })[0];
            },
            corpChange() {
                var corp = this.corp_List.filter(i => {
                    return this.addContract.corp_id == i.id;
                })[0];
                this.addContract.corp_name = corp.name;
                if (corp.contacts.length != 0) {
                    this.addContract.corp_mobile = corp.contacts[0].phone;
                    this.addContract.corp_fax = corp.contacts[0].fax;
                    this.addContract.corp_contact = corp.contacts[0].name;
                }
            },
            account_change() {
                if (
                    parseFloat(this.Addpay.offset_amount) >
                    parseFloat(this.addContract.currentaccount)
                ) {
                    this.Addpay.offset_amount = this.addContract.currentaccount;
                }
                this.Addpay.pay_amount
                    ? (this.Addpay.pay_requestamount =
                    parseFloat(this.Addpay.offset_amount) +
                    parseFloat(this.Addpay.pay_amount))
                    : (this.Addpay.pay_requestamount = parseFloat(
                    this.Addpay.offset_amount
                    ));
            },
            saveAdd() {
                updateMethod(this.addContract, "ProcurementContract", "verify", this);
            },
            close() {
                this.$router.push({
                    path: "/notice/index.vue",
                    name: "procure-notice"
                });
            },
        }
    };

    function updateMethod(datas, type, method_type, that) {
        datas.loading = true;
        let data = JSON.parse(JSON.stringify(datas));
        delete data.loading;
        request({
            url: "api/v1/" + type + "/" + data.id + "/" + method_type,
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
                    that.$router.push({
                        path: "/contract/index.vue",
                        name: "procure-contract"
                    });
                } else {
                    that.$message({
                        message: res.msg,
                        type: "success"
                    });
                }
            })
            .catch(rr => {
                datas.loading = false;
            });
    }
</script>

