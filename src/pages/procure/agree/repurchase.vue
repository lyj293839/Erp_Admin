<style lang="scss" scoped type="text/scss">
/deep/.div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  border: 1px solid #e5e5e5;
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
.from-item {
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
  }
}
/deep/.quoteInput {
  .el-input__inner {
    border: 1px solid #dcdfe6;
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
/deep/.checkbox_nei{
    margin-left: 10px;padding-left:0px;
    .el-checkbox__label{padding-left:0px;}
  }
/deep/.el-checkbox__label{padding-left:5px;}
.el-checkbox{margin-right: 0px;}
</style>
<template>
  <d2-container>
    <div class="div">
      <el-form label-width="0px" label-position="right">
        <!-- 双方 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>双方</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th colspan="2" class="td">合同双方</th>
                <th class="td"><span style="color:red;">*</span>名称</th>
                <th class="td"><span style="color:red;">*</span>联系人</th>
                <th class="td"><span style="color:red;">*</span>联系电话</th>
                <th class="td">传真</th>
              </tr>
              <tr>
                <td>甲方</td>
                <td>
                  <el-input v-model="addContract.supplier_id" size="small"></el-input>
                </td>
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
                <td colspan="2">乙方</td>
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
              <b>需求</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <div v-for="(index_,index) in addContract.detail">
              <table border="1" bordercolor="#E5E5E5">
                <tr>
                  <th class="td">#询单号</th>
                  <th class="td" width="150px">Cas</th>
                  <th style="width:200px;">产品名称</th>
                  <th class="td">品牌</th>
                  <th class="td">规格</th>
                  <th class="td">纯度</th>
                  <th class="td">数量</th>
                  <th class="td">数量单位</th>
                  <th class="td">币种</th>
                  <th class="td">单价</th>
                  <th class="td">金额</th>
                  <th>提交货时间</th>
                  <th class="td"></th>
                </tr>
                <tr>
                  <td>
                    <el-input readonly v-model="index_.inquiry_id" size="small"></el-input>
                  </td>
                  <td>
                    <el-input readonly v-model="index_.cas" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.product_name_cn" size="small"></el-input>
                  </td>
                  <td>
                    <el-select clearable v-model="index_.brand_id" size="small">
                      <el-option
                        v-for="item in brand_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index_.package" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.purity" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.quantity" @change="priceMoney()" size="small"></el-input>
                  </td>
                  <td>
                    <el-select v-model="index_.quantity_unit" size="small">
                      <el-option
                        v-for="item in units"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="index_.currency_id" size="small">
                      <el-option
                        v-for="item in currency"
                        :key="item.id"
                        :label="item.name_cn"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index_.price" @change="priceMoney()" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.total_price" @change="totalMoney()" size="small"></el-input>
                  </td>
                  <td class="dateInputStyle">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index_.delivery_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                    ></el-date-picker>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>子合同号</td>
                  <td>
                    <el-input
                      v-model="index_.contract_number"
                      @change="contractChange()"
                      size="small"
                    ></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.product_name" size="small"></el-input>
                  </td>
                  <td><span style="color:red;">*</span> {{$t('procure.agree.agree22')}}</td><!-- 发票类型 -->
                  <td colspan="2">
                    <el-select v-model="index_.invoice_type"
                               size="small" clearable>
                      <el-option
                              v-for="item,key in enums.pu_invoice_types"
                              :key="key"
                              :label="enums.pu_invoice_types[key]"
                              :value="enums.pu_invoice_types[key]"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>发票税率</td>
                  <td colspan="2">
                    <el-select v-model="index_.invoice_type_id" size="small">
                      <el-option
                        v-for="item in Invoicetype"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="text" @click="hand_additional(index)" size="mini">附加费用</el-button>
                  </td>
                  <td colspan="3"></td>
                  <td>{{index_.additional_cost}}</td>
                  <td>是否现货</td>
                  <td>
                    <el-select v-model="index_.is_stock" size="small">
                      <el-option
                        v-for="item in is_stock_info"
                        :key="item.id"
                        :label="item.name_cn"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>分析要求</td>
                  <td colspan="12">
                    <span
                          v-for="i in index_.checked_items"
                          v-if="i.child.length==0"
                          :label="i.id"
                          style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                    <div v-for="i in index_.checked_items" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                       <span>{{i.name}}</span>:
                          <el-checkbox
                                  v-for="j in i.child"
                                  :key="j.id"
                                  :label="j.id"
                                  v-model="j.checked"
                                  @change="select(index_,j,item.id,j.checked)"
                                  class="checkbox_nei"
                          ><span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>其他要求</td>
                  <td colspan="5">
                    <el-input v-model="index_.checked_requirement" size="small"></el-input>
                  </td>
                  <td>存储条件</td>
                  <td colspan="2"></td>
                  <td>运输条件</td>
                  <td></td>
                  <td>危险性</td>
                  <td></td>
                </tr>
                <tr>
                  <td>包装要求</td>
                  <td colspan="5">
                    <el-input v-model="index_.package_requirement" size="small"></el-input>
                  </td>
                  <td>要求发货时间</td>
                  <td colspan="6" class="dateInputStyle">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index_.required_delivery_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                    ></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>标签要求</td>
                  <td colspan="5">
                    <el-input v-model="index_.label_requirement" size="small"></el-input>
                  </td>
                  <td>发货备注</td>
                  <td colspan="6">
                    <el-input v-model="index_.note" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>随货文件</td>
                  <td colspan="5">
                    <el-checkbox-group v-model="index_.product_file">
                      <el-checkbox
                        v-for="item in product_file_info"
                        :label="item.id"
                        :key="item.id"
                      >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </td>
                  <td>生产日期</td>
                  <td colspan="2" class="dateInputStyle">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index_.production_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                    ></el-date-picker>
                  </td>
                  <td>是否需要报关</td>
                  <td>
                    <el-select v-model="index_.if_declare" size="small">
                      <el-option
                        v-for="item in if_declare_info"
                        :key="item.id"
                        :label="item.name_cn"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="text" @click="hand_quoteinfo(index_)" size="mini" disabled>采购报价</el-button>
                  </td>
                  <td></td>
                </tr>
                <tr v-if="addContract.detail.indexOf(index_) == addContract.detail.length-1">
                  <td colspan="9"></td>
                  <td>总金额</td>
                  <td>
                    <el-input v-model="addContract.total_money" readonly size="small"></el-input>
                  </td>
                  <td colspan="2"></td>
                </tr>
              </table>
            </div>
          </el-form-item>
        </div>
        <!-- 条款 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>条款</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">#合同号</th>
                <th class="td">签约时间</th>
                <th class="td">签约地点</th>
                <th class="td">采购人员</th>
                <th class="td">销售</th>
                <th class="td">PO</th>
                <th>结算方式</th>
              </tr>
              <tr>
                <td>
                  <el-input v-model="addContract.contract_number" size="small"></el-input>
                </td>
                <td class="dateInputStyle">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="addContract.contract_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                  ></el-date-picker>
                </td>
                <td>
                  <el-input v-model="addContract.signed_address" size="small"></el-input>
                </td>
                <td>
                  <el-select v-model="addContract.purchase_user_id" size="small">
                    <el-option
                      v-for="item in purchaseList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="addContract.sale_id" size="small">
                    <el-option
                      v-for="item in salesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.customer_po" size="small"></el-input>
                </td>
                <td>
                  <el-select
                    v-model="addContract.settle_type_id"
                    filterable
                    style="width:100%;"
                    size="small"
                  >
                    <el-option
                      v-for="item in settle_list"
                      :label="item.name"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>交(提)货地点</td>
                <td colspan="6">
                  <el-autocomplete
                    v-model="addContract.transportation"
                    :fetch-suggestions="querySearch"
                    style="width:100%;"
                  ></el-autocomplete>
                </td>
              </tr>
              <tr>
                <td>质量标准</td>
                <td colspan="6">
                  <el-input v-model="addContract.quality_standard" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>合理损耗</td>
                <td colspan="6">
                  <el-input v-model="addContract.reasonable_loss" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>包装标准&运输方式</td>
                <td colspan="6">
                  <el-input v-model="addContract.package_standard" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>验收标准</td>
                <td colspan="6">
                  <el-input v-model="addContract.accept_mode" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>有效期</td>
                <td colspan="4">
                  <el-input v-model="addContract.expdate" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="4">
                  <el-input v-model="addContract.note" size="small"></el-input>
                </td>
                <td>加电子章</td>
                <td>
                  <el-radio-group v-model="addContract.if_echapter">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="0">否</el-radio>
                  </el-radio-group>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="display:flex;justify-content: flex-end;margin:0px;">
          <el-button type="primary" @click="saveAdd()" size="mini">保存</el-button>
          <el-button class="sbaoClose" @click="close()" size="mini">取消</el-button>
        </el-form-item>
      </el-form>

      <!-- 额外费用 -->
      <el-dialog :visible.sync="additional" width="30%">
        <el-form>
          <el-form-item>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td>费用名称</td>
                <td>金额</td>
                <td>操作</td>
              </tr>
              <tr v-for="item in additional_list">
                <td>
                  <el-select style="width:100%;" v-model="item.additional_type_id" size="small">
                    <el-option
                      v-for="item in additional_type"
                      :key="item.id"
                      :label="item.name_cn"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.price" size="small"></el-input>
                </td>
                <td align="center">
                  <el-button
                    type="primary"
                    @click="cut_additional(item)"
                    icon="el-icon-minus"
                    size="mini"
                  ></el-button>
                </td>
              </tr>
            </table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="add_Additional()" icon="el-icon-plus" size="mini"></el-button>
            <el-button type="primary" @click="save_Additional()" size="mini">保存</el-button>
            <el-button class="sbaoClose" @click="close_Additional()" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import Cookies from "js-cookie";
import request from "@/plugin/axios";
import { saler_contract_info } from "@/api/sale";
import { lists, listTotal, update, create, listPost } from "@/api/prod";
export default {
  name:"procure-repurchase",
  data() {
    return {
      form_show1: true,
      form_show2: true,
      form_show3: true,
      supplyloading: false,
      additional_list: [],
      additional: false,
      addContract: {
        contract_date: "2019-04-23",
        accept_mode: "",
        supplier_id: "",
        supplier_name: "",
        supplier_contact: "",
        supplier_mobile: "",
        supplier_fax: "",
        corp_id: 1,
        corp_name: "艾康",
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
        total_money: 0,
        currency_id: "",
        package_standard: "",
        reasonable_loss: "",
        transportation: "",
        quality_standard: "",
        expdate: "",
        if_invoice: "",
        note: "",
        if_echapter: ""
      },
      supply_list: [],
      corp_List: [],
      units: [],
      currency: [],
      Invoicetype: [],
      testitems: [],
      is_stock_info: [],
      product_file_info: [],
      if_declare_info: [],
      purchaseList: [],
      salesList: [],
      settle_list: [],
      additional_type: [],
      transportation: [],
      brand_list: []
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='procure-repurchase'){
          listPost("ProcurementContract",this.$route.query.item_id, "edit").then(res => {
            this.addContract = res.data;
            this.addContract.supplier_id = "";
            this.addContract.supplier_name = "";
            this.addContract.supplier_contact = "";
            this.addContract.supplier_mobile = "";
            this.addContract.supplier_fax = "";
            this.addContract = JSON.parse(
              JSON.stringify(this.addContract).replace(/details/g, "detail")
            );
            this.addContract.detail = JSON.parse(
              JSON.stringify(this.addContract.detail)
                .replace(/procurement_contract_number/g, "contract_number")
                .replace(/name/g, "product_name")
            );
            enumList(this, res.enum);
            this.fetchData_a();
            this.addContract.detail.forEach(element => {
              element.quantity_unit = parseInt(element.quantity_unit);
              element.checked_items = JSON.parse(
              JSON.stringify(element.checked_items).replace(/product_name/g, "name")
            );
            });
          });
        }
    }
  },
  created() {
    // if (this.$route.query.ids) {
    //   Cookies.set("ids", this.$route.query.ids.id);
    //   this.addContract = this.$route.query.ids;
    //   this.addContract.supplier_id = "";
    //   this.addContract.supplier_name = "";
    //   this.addContract.supplier_contact = "";
    //   this.addContract.supplier_mobile = "";
    //   this.addContract.supplier_fax = "";
    //   this.addContract = JSON.parse(
    //     JSON.stringify(this.addContract).replace(/details/g, "detail")
    //   );
    //   this.addContract.detail = JSON.parse(
    //     JSON.stringify(this.addContract.detail)
    //       .replace(/notice_number/g, "contract_number")
    //       .replace(/name/g, "product_name")
    //   );
    //   enumList(this, this.$route.query.enum);
    //   this.fetchData_a();
    //   this.addContract.detail.forEach(element => {
    //     element.quantity_unit = parseInt(element.quantity_unit);
    //     element.checked_items = JSON.parse(
    //       JSON.stringify(element.checked_items).replace(/product_name/g, "name")
    //     );
    //   });
    // } else {
    //   listPost("ProcurementContract", Cookies.get("ids"), "edit").then(res => {
    //     this.addContract = res.data;
    //     this.addContract.supplier_id = "";
    //     this.addContract.supplier_name = "";
    //     this.addContract.supplier_contact = "";
    //     this.addContract.supplier_mobile = "";
    //     this.addContract.supplier_fax = "";
    //     this.addContract = JSON.parse(
    //       JSON.stringify(this.addContract).replace(/details/g, "detail")
    //     );
    //     this.addContract.detail = JSON.parse(
    //       JSON.stringify(this.addContract.detail)
    //         .replace(/notice_number/g, "contract_number")
    //         .replace(/name/g, "product_name")
    //     );
    //     enumList(this, res.enum);
    //     this.fetchData_a();
    //     this.addContract.detail.forEach(element => {
    //       element.quantity_unit = parseInt(element.quantity_unit);
    //       element.checked_items = JSON.parse(
    //       JSON.stringify(element.checked_items).replace(/product_name/g, "name")
    //     );
    //     });
    //   });
    // }
    listPost("ProcurementContract",this.$route.query.item_id, "edit").then(res => {
        this.addContract = res.data;
        this.addContract.supplier_id = "";
        this.addContract.supplier_name = "";
        this.addContract.supplier_contact = "";
        this.addContract.supplier_mobile = "";
        this.addContract.supplier_fax = "";
        this.addContract = JSON.parse(
          JSON.stringify(this.addContract).replace(/details/g, "detail")
        );
        this.addContract.detail = JSON.parse(
          JSON.stringify(this.addContract.detail)
            .replace(/procurement_contract_number/g, "contract_number")
            .replace(/name/g, "product_name")
        );
        enumList(this, res.enum);
        this.fetchData_a();
        this.addContract.detail.forEach(element => {
          element.quantity_unit = parseInt(element.quantity_unit);
          element.checked_items = JSON.parse(
          JSON.stringify(element.checked_items).replace(/product_name/g, "name")
        );
        });
      });
  },
  methods: {
    select(i, item, id,checked) {
        if(checked){
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
        }else{
            this.addContract.detail[i].checked_items.forEach((items, index) => {
                items.child.forEach((m, n) => {
                    if (item.id == m.id) {
                        this.$set(
                            this.addContract.detail[i].checked_items[index],
                            "checked",
                            false
                        );
                    }
                });
            });
        }
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
    fetchData_a() {
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
      listTotal("data/user_list?user_type=102").then(res => {
        this.salesList = res.data;
      });
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
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.supply_list = res.data;

          });
        }, 200);
      } else {
        this.supply_list = [];
      }
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
    priceMoney() {
      this.addContract.total_money = 0;
      for (var i = 0; i < this.addContract.detail.length; i++) {
        this.addContract.detail[i].total_price =
          this.addContract.detail[i].price *
          this.addContract.detail[i].quantity;
        this.addContract.total_money +=
          parseInt(this.addContract.detail[i].total_price) +
          parseInt(this.addContract.detail[i].additional_cost);
      }
    },
    totalMoney() {
      this.addContract.total_money = 0;
      for (var i = 0; i < this.addContract.detail.length; i++) {
        this.addContract.detail[i].price =
          this.addContract.detail[i].total_price /
          this.addContract.detail[i].quantity;
        this.addContract.total_money +=
          parseInt(this.addContract.detail[i].total_price) +
          parseInt(this.addContract.detail[i].additional_cost);
      }
    },
    hand_additional(a) {
      this.additional = true;
      this.additional_list = a.additional;
      var ids = { additional_type_id: "", price: "", contract_detail_id: a.id };
      this.additional_list.push(ids);
    },
    add_Additional() {
      var item = { additional_type_id: "", price: "" };
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
              item.additional_cost += parseFloat(res.price);
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
    querySearch(queryString, cb) {
      var restaurants = [];
      for (var i = 0; i < this.transportation.length; i++) {
        var a = { value: "" };
        a.value = this.transportation[i];
        restaurants.push(a);
      }
      var results = queryString ? restaurants : restaurants;
      cb(results);
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
    saveAdd() {
      this.addContract = JSON.parse(
        JSON.stringify(this.addContract).replace(/detail/g, "details")
      );
      this.addContract.details.forEach(item => {
        item.supplier_id = this.addContract.supplier_id;
        if (!item.checked_items) {
          item.checked_items = [];
        }
        if (!item.product_file) {
          item.product_file = [];
        }
      });
      createMethod(this.addContract, "ProcurementContract", "create", this);
    },
    close() {
      this.$router.push({
        path: "/contract/index.vue",
        name: "procure-contract"
      });
    }
  }
};
function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
}
function enumList(b, a) {
  obj(b.units, a.units);
  obj(b.currency, a.Currency);
  obj(b.brand_list, a.brands);
  obj(b.testitems, a.testitems);
  obj(b.Invoicetype, a.Invoicetype);
  obj(b.is_stock_info, a.is_stock_info);
  obj(b.if_declare_info, a.if_declare_info);
  obj(b.product_file_info, a.product_file_info);
  obj(b.settle_list, a.PurchaseSettlementMethod);
  b.additional_type = a.additional_cost_type;
  b.transportation = a.transportation;
  b.corp_List = a.company;
}
function createMethod(datas, type, method_type, that) {
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
        if (that.list.length != 0) {
          that.list.forEach(item => {
            item.contract_status = 1;
            update(item, "ProcurementContract/Notice", "update", this);
          });
          that.$router.push({
            path: "/notice/index.vue",
            name: "procure-notice"
          });
        } else {
          that.$router.push({
            path: "/contract/index.vue",
            name: "procure-contract"
          });
        }
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
