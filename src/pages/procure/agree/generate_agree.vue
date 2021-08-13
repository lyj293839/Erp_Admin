<style lang="scss" scoped type="text/scss">
/deep/ .div {
  width: 100%;
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

/deep/ .checkbox_nei {
  margin-left: 10px;
  padding-left: 0px;
  .el-checkbox__label {
    padding-left: 0px;
  }
}

/deep/ .el-checkbox__label {
  padding-left: 5px;
}

.el-checkbox {
  margin-right: 0px;
}
/deep/.distpicker-address-wrapper select{
  padding: 0px;
  font-size: 13px;
  line-height: 20px;
  height: 30px;;
}
.address{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.address /deep/.el-input__inner{
  border: 1px solid #DCDFE6;
  padding: 0px 5px;
  height: 30px;
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
              <b>双方</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th colspan="2" class="td">合同双方</th>
                <th class="td">
                  <span style="color:red;">*</span>名称
                </th>
                <th class="td">
                  <span style="color:red;">*</span>联系人
                </th>
                <th class="td">
                  <span style="color:red;">*</span>联系电话
                </th>
                <th class="td">传真</th>
              </tr>
              <tr>
                <td>甲方</td>
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
                    @clear="clear_supplier"
                    style="width:90%;"
                    size="small"
                    clearable
                  >
                    <el-option
                      v-for="item in supply_list"
                      :label="item.name"
                      :key="item.id"
                      :value="item.name"
                    >
                      <span style="float: left">{{ item.name }}</span>
                      <el-tag type="danger" size="mini" v-if="item.pay_way==2" style="margin-left:3px;">月</el-tag>
                    </el-option>
                  </el-select>
                  <el-tag type="danger" size="mini" v-if="addContract.pay_way==2" style="margin-left:3px;">月</el-tag>
                  <!--{{addContract.detail[0].supplier?addContract.detail[0].supplier.name:''}}-->
                </td>
                <td>
                  <el-autocomplete
                    clearable
                    v-model="addContract.supplier_contact"
                    :fetch-suggestions="querySearchAsync_contact"
                    placeholder
                    @select="contactChange"
                    @clear="clear_contact"
                    style="width:100%"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_mobile" size="small" clearable></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_fax" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">乙方</td>
                <td>
                  <el-select
                    filterable
                    v-model="addContract.corp_id"
                    size="small"
                    clearable
                    @change="corpChange()"
                    :disabled="enums.special2_suppliers.includes(addContract.supplier_name)"
                  >
                    <el-option
                      v-for="item in enums.company"
                      :label="item.name"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.corp_contact" size="small" clearable></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.corp_mobile" size="small" clearable></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.corp_fax" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">实际采购供应商</td>
                <td>
                  <el-select
                    v-model="addContract.real_supplier_name"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="real_supplyMethod"
                    @change="real_supplyChange()"
                    :loading="real_supplyloading"
                    style="width:100%;"
                    size="small"
                    clearable
                    @clear='clear_real_supply'
                  >
                    <el-option
                      v-for="item in real_supply_list"
                      :label="item.name"
                      :key="item.id"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </td>
                <td colspan="3">
                  <span style="color:#efa011;">不填则默认甲方</span>
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
            <div v-for="(index,index_) in addContract.detail">
              <table border="1" bordercolor="#E5E5E5">
                <tr>
                  <th class="td" width="100">#询单号</th>
                  <th class="td" width="150">
                    <span style="color:red;">*</span>CAS
                  </th>
                  <th width="200">
                    <span style="color:red;">*</span>产品名称
                  </th>
                  <th class="td">品牌</th>
                  <th width="130">规格</th>
                  <th class="td">
                    <span style="color:red;">*</span>纯度
                  </th>
                  <th class="td">
                    <span style="color:red;">*</span>数量
                  </th>
                  <th class="td">
                    <span style="color:red;">*</span>数量单位
                  </th>
                  <th class="td">币种</th>
                  <th class="td" width="80">单价</th>
                  <th class="td">金额</th>
                  <th colspan="2">提交货时间</th>
                </tr>
                <tr>
                  <td>
                    <span>{{index.inquiry_id}}</span>
                  </td>
                  <td>
                    <span
                      @click="product_detail(index.prod_id)"
                      :style="{cursor: 'pointer',color:(index.prod_id?'#66b1ff':'')}"
                    >{{index.cas}}</span>
                  </td>
                  <td>
                    <el-input v-model="index.product.name_cn" size="small" clearable></el-input>
                  </td>
                  <td>
                    <el-select clearable v-model="index.brand_id" size="small">
                      <el-option
                        v-for="item in enums.brands"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index.package" size="small" clearable></el-input>
                  </td>
                  <td style="padding:0">
                    <el-input
                      v-model="index.purity"
                      size="small"
                      clearable
                      :style="{'border':index.purity==''?'1px solid red':''}"
                    ></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.quantity" @input="priceMoney()" size="small" clearable></el-input>
                  </td>
                  <td>
                    <el-select v-model="index.quantity_unit" size="small" clearable>
                      <el-option
                        v-for="item in enums.units"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="index.currency_id" size="small" @change="changeCurrency(index)" clearable>
                      <el-option
                        v-for="item in enums.Currency"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>{{index.price}}</td>
                  <td>
                    <el-input
                      v-model="index.total_price"
                      @input="totalMoney()"
                      size="small"
                      clearable
                    ></el-input>
                  </td>
                  <td class="dateInputStyle" colspan="2">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index.delivery_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                      clearable
                    ></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="color:red;">*</span>子合同号
                  </td>
                  <td>
                    <el-input v-model="index.procurement_contract_number" size="small" clearable></el-input>
                  </td>
                  <td>
                    <el-input v-model="index.product.name" size="small" clearable></el-input>
                  </td>
                  <td><span style="color:red;">*</span> {{$t('procure.agree.agree22')}}</td><!-- 发票类型 -->
                  <td>
                    <el-select v-model="index.invoice_type"  @change="change_invoice_type(index)"
                               size="small" clearable>
                      <el-option
                              v-for="item,key in enums.pu_invoice_types"
                              :key="key"
                              :label="enums.pu_invoice_types[key]"
                              :value="enums.pu_invoice_types[key]"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <span style="color:red;">*</span>发票税率
                  </td>
                  <td>
                    <el-select
                      v-model="index.invoice_type_id"
                      @change="change_invoice(index.invoice_type_id)"
                      size="small"
                      clearable
                    >
                      <el-option
                        v-for="item in enums.InvoiceInfo"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="item.disabled"
                      ></el-option>
                    </el-select>
                  </td>
                  <!--<td>-->
                    <!--<el-button type="text" @click="hand_additional(index)" size="mini">附加费用</el-button>-->
                  <!--</td>-->
                  <!--<td>{{index.additional_cost}}</td>-->
                  <td>来货颜色</td>
                  <td colspan="2">
                    <el-select
                      v-model="index.chemical_appearance_id"
                      @change="change_ChemicalAppearance(index)"
                      size="small"
                      filterable
                      clearable
                    >
                      <el-option
                        v-for="item in GEnums.ChemicalAppearance"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <span style="color:red;">*</span>是否现货
                  </td>
                  <td colspan="2">
                    <el-select v-model="index.is_stock" size="small" clearable>
                      <el-option
                        v-for="item in enums.is_stock_info"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>分析要求</td>
                  <td colspan="12">
                    <span
                      v-for="i in index.checked_items"
                      v-if="i.child.length==0"
                      :label="i.id"
                      style="margin:0 5px"
                    >
                      <el-checkbox v-model="i.checked" name="type" :disabled='index.if_need_check==2'>{{i.name}}</el-checkbox>
                    </span>
                    <br />
                    <div
                      v-for="i in index.checked_items"
                      v-if="i.child.length!=0"
                      style="margin-right:10px;display: inline-block;width:40%;"
                    >
                      <span>{{i.name}}</span>:
                      <el-checkbox
                        v-for="j in i.child"
                        :key="j.id"
                        :label="j.id"
                        v-model="j.checked"
                        @change="select(index_,j,index.id)"
                        class="checkbox_nei"
                        :disabled='index.if_need_check==2'
                      >
                        <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                      </el-checkbox>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>是否免检</td>
                  <td colspan="5">
                    <el-radio-group v-model="index.if_need_check" @change="change_need_check(index)">
                      <el-radio :label="1">不免检</el-radio>
                      <el-radio :label="2">免检</el-radio>
                    </el-radio-group>
                  </td>
                  <td  colspan="2"> <span style="color:red;">{{$t('procure.agree.agree113')}}</span></td>
                  <td  colspan="4">
                    <el-radio-group v-model="index.is_from_consign" @change="change_need_check(index)">
                      <el-radio :label="0">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>采购备注</td>
                  <td colspan="5">
                    <el-input v-model="index.purchase_requirement" size="small" clearable></el-input>
                  </td>
                  <td>存储条件</td>
                  <td
                    colspan="3"
                  >{{getEnumValue(enums.StorageCondition,attr(index,'product.property.storagecondition_id'))}}</td>
                  <td>运输条件</td>
                  <td>
                    <span
                      v-if="index.saler_contract_detail&&index.saler_contract_detail.saler_contract.type==1"
                    >{{getEnumValue(enums.Trancondition,attr(index,'product.property.inland_trancond_id'))}}</span>
                    <span
                      v-else
                    >{{getEnumValue(enums.Trancondition,attr(index,'product.property.abroad_trancond_id'))}}</span>
                  </td>
                  <!--<td>危险性</td>-->
                  <!--<td>-->
                  <!--{{getEnumValue(enums.Danger,attr(index,'product.property.danger_id'))}}-->
                  <!--</td>-->
                </tr>
                <tr>
                  <td>分析备注</td>
                  <td colspan="5">
                    <el-input v-model="index.checked_requirement" size="small" clearable></el-input>
                  </td>
                  <td>供应商单号</td>
                  <td colspan="5">
                    <el-input v-model="index.supplier_order_no" size="small" clearable></el-input>
                  </td>
                </tr>
                <tr>
                  <td>包装要求</td>
                  <td colspan="5">
                    <el-input v-model="index.package_requirement" size="small" clearable></el-input>
                  </td>
                  <td>要求发货时间</td>
                  <td colspan="6" class="dateInputStyle">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index.required_delivery_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                      clearable
                    ></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>标签要求</td>
                  <td colspan="12">
                    <el-input v-model="index.label_requirement" size="small" clearable></el-input>
                  </td>
                </tr>
                <tr>
                  <td>发货备注</td>
                  <td colspan="12">
                    <el-input v-model="index.note" size="small" clearable></el-input>
                  </td>
                </tr>
                <tr>
                  <td>随货文件</td>
                  <td colspan="5">
                    <el-checkbox-group v-model="index.product_file">
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
                      v-model="index.production_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                      clearable
                    ></el-date-picker>
                  </td>
                  <td>
                    <span style="color:red;">*</span>是否报关
                  </td>
                  <td>
                    <el-select v-model="index.if_declare" size="small" clearable>
                      <el-option
                        v-for="item in enums.if_declare_info"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="text" @click="hand_quoteinfo(index)" size="mini" readonly>采购报价</el-button>
                  </td>
                  <td></td>
                </tr>
                <tr v-if="!index.profit">
                  <td colspan="13">
                    <span style="color: red;">{{index.profit_msg}}</span>
                  </td>
                </tr>
                <tr v-if="addContract.detail.indexOf(index) == addContract.detail.length-1">
                  <td colspan="9"></td>
                  <td>总金额</td>
                  <td colspan="3">
                    {{addContract.total_money}}{{currency.filter(i=>{return
                    i.id==addContract.detail[0].currency_id})[0]?currency.filter(i=>{return
                    i.id==addContract.detail[0].currency_id})[0].name:''}}
                  </td>
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
                <th class="td">
                  <span style="color:red;">*</span>合同号
                </th>
                <th class="td">签约时间</th>
                <th class="td">签约地点</th>
                <th class="td">
                  <span style="color:red;">*</span>采购人员
                </th>
                <th class="td">销售</th>
                <th class="td">PO</th>
                <th width="500">
                  <span style="color:red;">*</span>结算方式
                </th>
              </tr>
              <tr>
                <td>
                  <el-input v-model="addContract.contract_number" size="small" clearable></el-input>
                </td>
                <td class="dateInputStyle">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="addContract.contract_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                  ></el-date-picker>
                </td>
                <td>
                  <el-input v-model="addContract.signed_address" size="small" clearable></el-input>
                </td>
                <td>
                  <el-select v-model="addContract.purchase_user_id" size="small" @change='change_purchase_user_id' clearable>
                    <el-option
                      v-for="item in purchaseList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="addContract.sale_id" size="small" clearable>
                    <el-option
                      v-for="item in salesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.customer_po" size="small" clearable></el-input>
                </td>
                <td>
                  <!--<el-select-->
                  <!--v-model="addContract.settle_type_id"-->
                  <!--filterable-->
                  <!--style="width:100%;"-->
                  <!--size="small"-->
                  <!--&gt;-->
                  <!--<el-option-->
                  <!--v-for="item in enums.PurchaseSettlementMethod"-->
                  <!--:label="item.name"-->
                  <!--:key="item.id"-->
                  <!--:value="item.id"-->
                  <!--&gt;</el-option>-->
                  <!--</el-select>-->
                  <el-autocomplete
                    clearable
                    v-model="addContract.settle_type"
                    :fetch-suggestions="querySearchAsync_corporation"
                    placeholder
                    @select="handleSelect_corporation"
                    @clear="clear"
                    style="width:100%"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </td>
              </tr>
              <tr>
                <td>交(提)货地点</td>
                <td colspan="4">
                  <el-autocomplete
                      clearable
                      @select="address_change"
                      v-model="addContract.transportation"
                      :fetch-suggestions="querySearch"
                      style="width:100%;"
                    ></el-autocomplete>
                </td>
                <td>指派仓库</td>
                <td>
                  <span style="color:red;">{{addContract.procurement_warehouse}}</span>
                </td>
              </tr>
              <tr v-if="addContract.supplier_id==39057">
                <td>标准化地址</td>
                <td colspan="6">
                  <div class="address">
                    <v-distpicker :province="addContract.province" :city="addContract.city" :area="addContract.district" @selected="onSelected"></v-distpicker>
                    <el-input
                                clearable
                                v-model="addContract.address"
                                placeholder="详细地址"
                                size="mini"
                                style="width:30%;margin-left:10px;"
                        ></el-input>
                        <el-input
                                clearable
                                v-model="addContract.name"
                                placeholder="姓名"
                                size="mini"
                                 style="width:100px;margin-left:10px;"
                        ></el-input>
                        <el-input
                                clearable
                                v-model="addContract.mobile"
                                placeholder="电话"
                                size="mini"
                                 style="width:100px;margin-left:10px;"
                        ></el-input>
                  </div>
                </td>
              </tr>
              <tr>
                <td>质量标准</td>
                <td colspan="6">
                  <el-input v-model="addContract.quality_standard" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>合理损耗</td>
                <td colspan="6">
                  <el-input v-model="addContract.reasonable_loss" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>包装标准&运输方式</td>
                <td colspan="6">
                  <el-input v-model="addContract.package_standard" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>验收标准</td>
                <td colspan="6">
                  <el-input v-model="addContract.accept_mode" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>有效期
                </td>
                <td colspan="4">
                  <el-input v-model="addContract.expdate" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>备注</td>
                <td colspan="4">
                  <el-input v-model="addContract.note" size="small" clearable></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>加电子章
                </td>
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
          <span v-if="addContract.supplier_name=='安徽泽升科技有限公司'||addContract.supplier_name=='上海迈瑞尔化学技术有限公司'||addContract.supplier_name=='上海易恩化学技术有限公司'" class="red bold d2-mr-10">生成合同后请立即用往来账申请付款</span>
          <el-button v-if="pay_apply_show" type="danger" @click="pay_apply()" size="mini">付款申请</el-button>
          <el-button :disabled="pay_apply_show" type="primary" @click="saveAdd()" size="mini">保存</el-button>
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
                      v-for="item in enums.additional_cost_type"
                      :key="item.id"
                      :label="item.name"
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
import play from "../agree/play";
import $ from "jquery";
import axios from "axios";
import request from "@/plugin/axios";
import Cookies from "js-cookie";
import util from "@/libs/util";
import Big from "@/big/a/big.mjs";
import { saler_contract_info } from "@/api/sale";
import { supplier_exemption_amount } from "@/api/procure";
import { lists, listTotal, update, listPost } from "@/api/prod";
import { mapState, mapActions } from "vuex";
import VDistpicker from 'v-distpicker'
export default {
  name: "procure-generate_agree",
  components: {
    play,
    VDistpicker
  },
  data() {
    return {
      id: "",
      pay_apply_show: false,
      member_id: "",
      asd: "",
      bank_list: {},
      play: false,
      list: [],
      quote_info: {},
      additional_list: [],
      additional: false,
      quoteinfo: false,
      supplyloading: false,
      real_supplyloading: false,
      addContract: {
        pay_way:'',
        accept_mode: "",
        supplier_id: "",
        supplier_name: "",
        real_supplier_id: "",
        real_supplier_name: "",
        supplier_contact: "",
        supplier_mobile: "",
        supplier_fax: "",
        corp_id: "",
        corp_name: "",
        corp_contact: "",
        corp_mobile: "025-66061693",
        corp_fax: "025-57626690",
        detail: [1],
        contract_number: "",
        contract_date: "",
        check_status: 1,
        signed_address: "",
        purchase_user_id: "",
        sale_id: "",
        customer_po: "",
        settle_type: "",
        settle_type_id: "",
        total_money: "",
        currency_id: "",
        package_standard: "",
        reasonable_loss: "",
        transportation: "",
        quality_standard: "",
        expdate: "",
        if_invoice: "",
        note: "",
        if_echapter: "",
        procurement_warehouse: "",
        name:'',
        mobile:'',
        province:'',
        city:'',
        district:'',
        address:''
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
        bank_note: "",
        bank_account: "",
        receiver: "",
        note: "",
        paybank: "",
        offset_amount: 0, //往来账
        corp_id: ""
      },
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      form_show6: true,
      supply_list: [],
      real_supply_list: [],
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
      PurchaseSettlementMethod: [],
      brand_list: [],
      PayType: [],
      account_type_info: [],
      bank_account_type_info: [],
      contacts: [],
      enums: {},
      special_name:false,
      userId:'',
    };
  },
  created() {
    this.userId= this.$route.query.id
    this.fetchData();
  },
  watch: {
    $route(to, from) {
      if (to.name == "procure-generate_agree" &&from.name == "procure-notice") {
          if(this.userId!==this.$route.query.id){
             this.fetchData();
          }
      }
    },
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
     change_ChemicalAppearance(item){
        item.chemical_appearance=this.GEnums.ChemicalAppearance[item.chemical_appearance_id].name
    },
    change_invoice(invoice_id) {
      // if (invoice_id == 1 || invoice_id == 4) {
      //   this.addContract.settle_type = "款到发货，甲方提供增值税专用发票；";
      // } else if (invoice_id == 3 || invoice_id == 5) {
      //   this.addContract.settle_type = "款到发货，甲方提供普通发票；";
      // } else if (invoice_id == 2) {
      //   this.addContract.settle_type = "款到发货";
      // }
    },
      change_invoice_type(item){
          if(item.invoice_type=='不含税'){
              for(let key in this.enums.InvoiceInfo){
                  if(this.enums.InvoiceInfo[key].name!='不含税'){
                      this.enums.InvoiceInfo[key].disabled=true
                  }else{
                      this.enums.InvoiceInfo[key].disabled=false
                  }
              }
              item.invoice_type_id=2
              this.addContract.settle_type='款到发货'
          }else if(item.invoice_type=='增值税专用发票'){
              for(let key in this.enums.InvoiceInfo){
                  if(this.enums.InvoiceInfo[key].name!='13%增票'&&this.enums.InvoiceInfo[key].name!='6%增票'){
                      this.enums.InvoiceInfo[key].disabled=true
                  }else{
                      this.enums.InvoiceInfo[key].disabled=false
                  }
              }
              item.invoice_type_id=1
              this.addContract.settle_type='款到发货，甲方提供增值税专用发票；'
          }else if(item.invoice_type=='增值税普通发票'||item.invoice_type=='增值税电子专用发票'||item.invoice_type=='增值税电子普通发票'||item.invoice_type=='机打发票'){
              for(let key in this.enums.InvoiceInfo){
                  if(this.enums.InvoiceInfo[key].name!='普票'&&this.enums.InvoiceInfo[key].name!='增值税普票'){
                      this.enums.InvoiceInfo[key].disabled=true
                  }else{
                      this.enums.InvoiceInfo[key].disabled=false
                  }
              }
              item.invoice_type_id=3
              this.addContract.settle_type='款到发货，甲方提供普通发票；'
          }
      },
    change_need_check(item){
        if(item.if_need_check==2){
          item.checked_items.forEach((items, index) => {
               items.checked=false;
                items.child.forEach((m, n) => {
                    m.checked = false;
                });
          });
        }
    },
    onSelected(data){
      this.addContract.province = data.province.value
      this.addContract.city = data.city.value
      this.addContract.district = data.area.value
    },
    fetchData() {
      this.addContract.real_supplier_name=''
      this.addContract.real_supplier_id=''
      this.special_name=false
      this.pay_apply_show = false;
      this.product_file_info = [];
      listTotal(
        "ProcurementContract/generate?ids=" + this.$route.query.id
      ).then(res => {
        res.data.forEach((items, index) => {
          items.if_need_check = 1;
          items.procurement_contract_number = JSON.parse(
            JSON.stringify(items.notice_number)
          );
          if (items.package == "" && items.inquiry_confirm) {
            items.package = items.inquiry_confirm.skuno;
          }
        });
          res.data.forEach(res=>{
              if(res.consign_note){
                  res.is_from_consign=1
              }else{
                  res.is_from_consign=0
              }
          })
        this.list = res.data;
        this.addContract.purchase_user_id = res.data[0].purchase_user_id
          ? res.data[0].purchase_user_id
          : "";
        this.list.forEach((item, index) => {
          item.additional = [];
          item.additional_cost = 0;
          // if(index!==this.list.length-1){
          //     this.addContract.contract_number+=item.procurement_contract_number+ "-"
          // }else{
          //     this.addContract.contract_number+=item.procurement_contract_number
          // }
          item.quantity_unit = parseInt(item.quantity_unit);
          if(item.currency_id==2){
              item.invoice_type_id=1
              item.invoice_type='增值税专用发票'
          }else{
              item.invoice_type_id=2
              item.invoice_type='不含税'
          }
          item.currency_id = parseInt(item.currency_id);
          if (item.brand_id == 0) {
            item.brand_id = "";
          }
          if (item.product_file instanceof Array == false) {
            var brr = [];
            for (let i in item.product_file) {
              brr.push(parseInt(i));
            }
            item.product_file = brr;
          }
        });
        for(var key in res.enum.InvoiceInfo){
            res.enum.InvoiceInfo[key].disabled=false
        }
        this.enums = res.enum;
        if(this.enums.is_straight_hair){
            this.addContract.transportation=this.enums.transportation[2].val
            if(res.data[0].supplier_id==39057&&this.enums.transportation[2].json_data){
              this.addContract.province = this.enums.transportation[2].json_data.province
              this.addContract.city = this.enums.transportation[2].json_data.city
              this.addContract.district = this.enums.transportation[2].json_data.district
              this.addContract.address = this.enums.transportation[2].json_data.address
              this.addContract.name = this.enums.transportation[2].json_data.name
              this.addContract.mobile = this.enums.transportation[2].json_data.mobile
            }
        }else{
            if(this.enums.procurement_warehouse=='南京仓库'){
                this.addContract.transportation=this.enums.transportation[0].val
                if(res.data[0].supplier_id==39057&&this.enums.transportation[0].json_data){
                  this.addContract.province = this.enums.transportation[0].json_data.province
                  this.addContract.city = this.enums.transportation[0].json_data.city
                  this.addContract.district = this.enums.transportation[0].json_data.district
                  this.addContract.address = this.enums.transportation[0].json_data.address
                  this.addContract.name = this.enums.transportation[0].json_data.name
                  this.addContract.mobile = this.enums.transportation[0].json_data.mobile
                }
            }else if(this.enums.procurement_warehouse=='深圳仓库'){
                this.addContract.transportation=this.enums.transportation[1].val
                if(res.data[0].supplier_id==39057&&this.enums.transportation[1].json_data){
                  this.addContract.province = this.enums.transportation[1].json_data.province
                  this.addContract.city = this.enums.transportation[1].json_data.city
                  this.addContract.district = this.enums.transportation[1].json_data.district
                  this.addContract.address = this.enums.transportation[1].json_data.address
                  this.addContract.name = this.enums.transportation[1].json_data.name
                  this.addContract.mobile = this.enums.transportation[1].json_data.mobile
                }
            }
        }
        this.addContract.contract_number = res.enum.purchase_contract_number;
        let Notic_generate = res.enum.corporations;
        this.addContract.contract_date = init();
        this.addContract.signed_address =
          Notic_generate.salercontract_signed_address;
        this.addContract.settle_type_id = 1;
        obj(this.PurchaseSettlementMethod, res.enum.PurchaseSettlementMethod);
        this.PurchaseSettlementMethod.forEach((items, index) => {
          if (items.id == 1) {
            this.addContract.settle_type = items.name;
          }
        });
        this.addContract.corp_id = res.enum.company[0].id;
         if(res.enum.special_suppliers.includes(this.list[0].supplier.name)){
             this.addContract.corp_id=100000
             this.addContract.corp_name='江苏艾康生物医药研发有限公司'
          }else if(res.enum.special2_suppliers.includes(this.list[0].supplier.name)){
             this.addContract.corp_id=1002569
             this.addContract.corp_name='江苏艾康商贸有限公司'
         }else{
             let flag=false
             this.list.forEach((item,index)=>{
                 if(item.product.is_danger_inland==1){
                     flag=true
                 }
             })
             if(flag){
                 this.addContract.corp_id=100000
                 this.addContract.corp_name='江苏艾康生物医药研发有限公司'
             }else{
                 this.addContract.corp_id=1002569
                 this.addContract.corp_name='江苏艾康商贸有限公司'
             }
          }
        this.corpChange();
        this.addContract.if_echapter = 1;
        this.addContract.quality_standard = Notic_generate.s_quality_stardard;
        this.addContract.reasonable_loss = Notic_generate.s_reasonable_loss;
        this.addContract.package_standard = Notic_generate.s_package_stardard;
        this.addContract.accept_mode = Notic_generate.s_accept_mode;
        this.addContract.detail = this.list;
        this.addContract.procurement_warehouse = this.addContract.detail[0].procurement_warehouse;
        this.addContract.supplier_id = this.addContract.detail[0].supplier_id;
        this.addContract.supplier_name = this.addContract.detail[0].supplier.name;
        this.contacts = this.addContract.detail[0].supplier.contacts
          ? this.addContract.detail[0].supplier.contacts
          : [];
        this.addContract.supplier_mobile = this.addContract.detail[0].supplier
          .contacts[0]
          ? this.addContract.detail[0].supplier.contacts[0].phone
          : "";
        this.addContract.supplier_contact = this.addContract.detail[0].supplier
          .contacts[0]
          ? this.addContract.detail[0].supplier.contacts[0].name
          : "";
        this.addContract.supplier_fax = this.addContract.detail[0].supplier
          .contacts[0]
          ? this.addContract.detail[0].supplier.contacts[0].fax
          : "";
        this.addContract.sale_id = this.list[0].sale_id;
        this.addContract.expdate = res.enum.expdate ? res.enum.expdate : "";
        let money = 0;
        this.addContract.detail.forEach((items, index) => {
          items.invoice_disabled=false
          money = new Big(money).plus(
            new Big(items.total_price).plus(items.additional_cost)
          );
        });
        this.addContract.total_money = Number(money);
        const user_name = util.cookies.get("user_name");
        if(this.addContract.purchase_user_id){
           this.addContract.corp_contact =this.getEnumValue(this.purchaseList,this.addContract.purchase_user_id)
        }else{
           this.addContract.corp_contact = user_name;
        }
        let flag=false
        this.addContract.detail[0].checked_items.forEach((items,index)=>{
           if(items.checked){
                 flag=true
           }
           items.child.forEach((m,n)=>{
               if(m.checked){
                 flag=true
              }
           })
        })
        JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
            if(items.id=='26'){
                flag=true
            }
        })
        if(!flag){
          supplier_exemption_amount(this.addContract.supplier_id).then(
            res => {
              this.addContract.detail.forEach((items, index) => {
                  if(res.data.invoice_type){
                      items.invoice_type_id=res.data.invoice_type
                      for(var key in this.enums.InvoiceInfo){
                          if((this.enums.InvoiceInfo[key].id!=res.data.invoice_type)&&(this.enums.InvoiceInfo[key].id!=2)){
                              this.enums.InvoiceInfo[key].disabled=true
                          }
                      }
                  }else{
                      for(var key in this.enums.InvoiceInfo){
                          this.enums.InvoiceInfo[key].disabled=false
                      }
                  }
                if (Number(items.total_price) <= Number(res.data.amount)) {
                  items.if_need_check = 2;
                } else {
                  items.if_need_check = 1;
                }
              });
            }
          );
        }

      });
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
      listTotal("data/user_list?user_type=102").then(res => {
        this.salesList = res.data;
      });
    },
    changeCurrency(item){
        if(item.currency_id==2){
            item.invoice_type_id=1
            item.invoice_type='增值税专用发票'
            this.addContract.settle_type='款到发货，甲方提供增值税专用发票；'
        }else{
            item.invoice_type_id=2
            item.invoice_type='不含税'
            this.addContract.settle_type='款到发货'
        }
    },
    address_change(item){
      this.enums.transportation.forEach(i=>{
        if(i.val==item.value&&i.json_data){
          this.addContract.province = i.json_data.province
          this.addContract.city = i.json_data.city
          this.addContract.district = i.json_data.district
          this.addContract.address = i.json_data.address
          this.addContract.name = i.json_data.name
          this.addContract.mobile = i.json_data.mobile
        }
      })
    },
    change_purchase_user_id(){
        this.addContract.corp_contact =this.getEnumValue(this.purchaseList,this.addContract.purchase_user_id)
    },
    clear_real_supply(){
      this.addContract.real_supplier_id=''
    },
    select(i, item, id) {
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
        let flag=false
        items.child.forEach((m, n) => {
            if(m.checked){
               flag=true
            }
        })
       if(items.id==item.pid){
          if(flag){
             items.checked=true
          }else{
            items.checked=false
          }
        }
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
    corpChange() {
      var corp = this.enums.company.filter(i => {
        return this.addContract.corp_id == i.id;
      })[0];
      this.addContract.corp_name = corp.name;
    },
    querySearchAsync_corporation(queryString, cb) {
      var restaurants = this.PurchaseSettlementMethod;
      cb(restaurants);
    },
    querySearchAsync_contact(queryString, cb) {
      var restaurants = this.contacts;
      cb(restaurants);
    },
    clear_supplier() {
      this.addContract.supplier_id='';
      this.addContract.real_supplier_id='';
      this.addContract.supplier_contact = "";
      this.addContract.supplier_mobile = "";
      this.addContract.supplier_fax = "";
      this.addContract.pay_way = "";
    },
    clear_contact() {
      this.addContract.supplier_mobile = "";
      this.addContract.supplier_fax = "";
    },
    clear() {
      this.addContract.settle_type = "";
      this.addContract.settle_type_id = "";
    },
    handleSelect_corporation(item) {
      this.addContract.settle_type = item.name;
      this.addContract.settle_type_id = item.id;
    },
    product_detail(id) {
      if (id) {
        this.$router.push({
          path: "/Prod/Add2",
          query: {
            id: id
          }
        });
      }
    },
    contractChange() {
      this.addContract.contract_number = "";
      for (var i = 0; i < this.addContract.detail.length; i++) {
        if (i < this.addContract.detail.length - 1) {
          this.addContract.contract_number +=
            this.addContract.detail[i].procurement_contract_number + "-";
        } else {
          this.addContract.contract_number += this.addContract.detail[
            i
          ].procurement_contract_number;
        }
      }
    },
    totalMoney() {
      this.addContract.total_money = 0;
      for (var i = 0; i < this.addContract.detail.length; i++) {
        this.addContract.detail[i].price = new Big(
          this.addContract.detail[i].total_price
        )
          .div(this.addContract.detail[i].quantity)
          .toFixed(4);
        this.addContract.total_money = new Big(this.addContract.total_money)
          .plus(
            new Big(this.addContract.detail[i].total_price).plus(
              this.addContract.detail[i].additional_cost
            )
          )
          .toFixed(2);
      }
      let flag=false
       this.addContract.detail[0].checked_items.forEach((items,index)=>{
           if(items.checked){
                 flag=true
           }
           items.child.forEach((m,n)=>{
               if(m.checked){
                 flag=true
              }
           })
        })
        JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
            if(items.id=='26'){
                flag=true
            }
        })
        if(!flag){
          supplier_exemption_amount(this.addContract.supplier_id).then(
            res => {
              this.addContract.detail.forEach((items, index) => {
                  if(res.data.invoice_type){
                      items.invoice_type_id=res.data.invoice_type
                      for(var key in this.enums.InvoiceInfo){
                          if((this.enums.InvoiceInfo[key].id!=res.data.invoice_type)&&(this.enums.InvoiceInfo[key].id!=2)){
                              this.enums.InvoiceInfo[key].disabled=true
                          }
                      }
                  }else{
                      for(var key in this.enums.InvoiceInfo){
                          this.enums.InvoiceInfo[key].disabled=false
                      }
                  }
                if (Number(items.total_price) <= Number(res.data.amount)) {
                  items.if_need_check = 2;
                } else {
                  items.if_need_check = 1;
                }
              });
            }
          );
        }
    },
    priceMoney() {
      this.addContract.total_money = 0;
      for (var i = 0; i < this.addContract.detail.length; i++) {
        this.addContract.detail[i].price = new Big(
          this.addContract.detail[i].total_price
        )
          .div(this.addContract.detail[i].quantity)
          .toFixed(4);
        this.addContract.total_money = new Big(this.addContract.total_money)
          .plus(
            new Big(this.addContract.detail[i].total_price).plus(
              this.addContract.detail[i].additional_cost
            )
          )
          .toFixed(2);
      }
      let flag=false
      this.addContract.detail[0].checked_items.forEach((items,index)=>{
           if(items.checked){
                 flag=true
           }
           items.child.forEach((m,n)=>{
               if(m.checked){
                 flag=true
              }
           })
        })
        JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
            if(items.id=='26'){
                flag=true
            }
        })
        if(!flag){
          supplier_exemption_amount(this.addContract.supplier_id).then(
            res => {
              this.addContract.detail.forEach((items, index) => {
                  if(res.data.invoice_type){
                      items.invoice_type_id=res.data.invoice_type
                      for(var key in this.enums.InvoiceInfo){
                          if((this.enums.InvoiceInfo[key].id!=res.data.invoice_type)&&(this.enums.InvoiceInfo[key].id!=2)){
                              this.enums.InvoiceInfo[key].disabled=true
                          }
                      }
                  }else{
                      for(var key in this.enums.InvoiceInfo){
                          this.enums.InvoiceInfo[key].disabled=false
                      }
                  }
                if (Number(items.total_price) <= Number(res.data.amount)) {
                  items.if_need_check = 2;
                } else {
                  items.if_need_check = 1;
                }
              });
            }
          );
        }
    },
    querySearch(queryString, cb) {
      var restaurants = [];
      for (var i = 0; i < this.enums.transportation.length; i++) {
        var a = { value: "" };
        a.value = this.enums.transportation[i].val;
        restaurants.push(a);
      }
      var results = queryString ? restaurants : restaurants;
      cb(results);
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.supply_list = res.data;
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    real_supplyMethod(query) {
      if (query !== "") {
        this.real_supplyloading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.real_supply_list = res.data;
            this.real_supplyloading = false;
          });
        }, 200);
      } else {
        this.real_supply_list = [];
      }
    },
    supplyChange() {
        if(this.enums.special_suppliers.includes(this.addContract.supplier_name)){
            if(this.addContract.supplier_name&&this.addContract.corp_name!='江苏艾康生物医药研发有限公司'){
                this.$alert('由于甲方变动,乙方已由江苏艾康商贸有限公司转变为江苏艾康生物医药研发有限公司,请悉知！', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {}
                });
            }
            this.addContract.corp_id=100000
            this.addContract.corp_name='江苏艾康生物医药研发有限公司'
        }else{
            let flag=false
            this.addContract.detail.forEach((item,index)=>{
                if(item.product.is_danger_inland==1){
                    flag=true
                }
            })
            if(flag){
                this.addContract.corp_id=100000
                this.addContract.corp_name='江苏艾康生物医药研发有限公司'
            }else{
                if(this.addContract.supplier_name&&this.addContract.corp_name!='江苏艾康商贸有限公司'){
                    this.$alert('由于甲方变动,乙方已由江苏艾康生物医药研发有限公司转变为江苏艾康商贸有限公司,请悉知！', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {}
                    });
                }
                this.addContract.corp_id=1002569
                this.addContract.corp_name='江苏艾康商贸有限公司'
            }
        }
        if(this.addContract.supplier_name=='AA Blocks'){
            this.addContract.corp_id=500000
        }
      this.addContract.supplier_id = this.supply_list.filter(item => {
        return item.name == this.addContract.supplier_name;
      })[0].id;
      saler_contract_info(this.addContract.supplier_id).then(res => {
        this.contacts = res.data.info.contacts ? res.data.info.contacts : [];
        this.addContract.pay_way = res.data.info.pay_way
          ? res.data.info.pay_way
          : "";
        this.addContract.supplier_contact = res.data.info.contacts
          ? res.data.info.contacts[0].name
          : "";
        this.addContract.supplier_mobile = res.data.info.contacts
          ? res.data.info.contacts[0].phone
            ? res.data.info.contacts[0].phone
            : res.data.info.contacts[0].mobile
          : "";
        this.addContract.supplier_fax = res.data.info.contacts
          ? res.data.info.contacts[0].fax
          : "";
      });
        supplier_exemption_amount(this.addContract.supplier_id).then(
            res => {
                this.addContract.detail.forEach((items, index) => {
                    if(res.data.invoice_type){
                        items.invoice_type_id=res.data.invoice_type
                        this.change_invoice(res.data.invoice_type)
                        for(var key in this.enums.InvoiceInfo){
                            if((this.enums.InvoiceInfo[key].id!=res.data.invoice_type)&&(this.enums.InvoiceInfo[key].id!=2)){
                                this.enums.InvoiceInfo[key].disabled=true
                            }
                        }
                    }else{
                        for(var key in this.enums.InvoiceInfo){
                            this.enums.InvoiceInfo[key].disabled=false
                        }
                    }
                    if (Number(items.total_price) <= Number(res.data.amount)) {
                        items.if_need_check = 2;
                    } else {
                        items.if_need_check = 1;
                    }
                    this.$forceUpdate()
                });
            }
        );
    },
    real_supplyChange() {
      this.addContract.real_supplier_id = this.real_supply_list.filter(item => {
        return item.name == this.addContract.real_supplier_name;
      })[0].id;
    },
    contactChange(item) {
      this.addContract.supplier_contact = item.name;
      this.contacts.forEach((items, index) => {
        if (items.name == this.addContract.supplier_contact) {
          this.addContract.supplier_mobile = items.phone
            ? items.phone
            : items.mobile;
          this.addContract.supplier_fax = items.fax;
        }
      });
      if(this.enums.special2_suppliers.includes(this.addContract.supplier_name)){
          this.addContract.corp_id=1002569
          this.addContract.corp_name='江苏艾康商贸有限公司'
      }
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
      if (this.additional_list.length == 0) {
        var ids = {
          additional_type_id: "",
          price: "",
          contract_detail_id: a.id
        };
        this.additional_list.push(ids);
      }
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
              item.additional_cost = new Big(item.additional_cost).plus(
                res.price
              );
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
        this.addContract.total_money +=
          parseFloat(this.addContract.detail[i].total_price) +
          parseFloat(this.addContract.detail[i].additional_cost);
      }
      this.additional = false;
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
    account(id) {
      this.member_id = id;
      this.play = true;
    },
    pay_apply() {
      let that = this;
      const tagName = "procure-generate_agree";
      that.closeAdd({ tagName });
      that.$router.push({
        path: "/agree/pay_apply_agree.vue",
        name: "procure-pay_apply_agree",
        query: {
          ids: this.id,
          enum_pay: true
        }
      });
    },
    bank() {
      this.bank_list = this.addContract.supplier_bank_account.filter(item => {
        return item.id == this.asd;
      })[0];
    },
    saveAdd() {
        let flag=false;
        if(this.addContract.supplier_id==39057){
        // this.addContract.transportation = 
        // this.addContract.province+this.addContract.city+this.addContract.district+this.addContract.address+" "+
        // this.addContract.name+this.addContract.mobile
      }else{
        this.addContract.transportation = this.addContract.transportation
        this.addContract.province=''
        this.addContract.city=''
        this.addContract.district=''
        this.addContract.name=''
        this.addContract.address=''
        this.addContract.mobile=''
      }
        this.addContract.detail.forEach((items, index) => {
            if(!items.prod_id){
                flag=true
            }
        });
        if(flag){
            this.$message({
                message:'产品ID不能为空！',
                type: 'error'
            });
            return false;
        }
      if (this.addContract.real_supplier_id == "") {
        this.addContract.real_supplier_id = this.addContract.supplier_id;
        this.addContract.real_supplier_name = this.addContract.supplier_name;
      }
      this.addContract.currency_id = this.addContract.detail[0].currency_id;
      this.addContract.detail.forEach((items, index) => {
        items.product_name = items.product?items.product.name:'';
        items.product_name_cn = items.product?items.product.name_cn:'';
      });
      this.addContract.detail = JSON.parse(
        JSON.stringify(this.addContract.detail).replace(/product_name/g, "name")
      );
      this.addContract.detail = JSON.parse(
        JSON.stringify(this.addContract.detail).replace(
          /product_name_cn/g,
          "name_cn"
        )
      );
      createMethod(this.addContract, "ProcurementContract", "create", this);
    },
    close() {
      if (this.$route.query.ids) {
        this.$router.push({
          path: "/contract/index.vue",
          name: "procure-contract"
        });
      } else {
        this.$router.push({
          path: "/notice/index.vue",
          name: "procure-notice"
        });
      }
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
        that.$router.push({
          path: "/contract/index.vue",
          name: "procure-contract"
        });
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
        that.id = res.data.id;
        that.pay_apply_show = true;
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











