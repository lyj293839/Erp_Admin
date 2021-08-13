<style lang="scss" scoped type="text/scss">
/deep/.div {
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
/deep/.from-item {
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
/deep/.checkbox_nei {
  margin-left: 10px;
  padding-left: 0px;
  .el-checkbox__label {
    padding-left: 0px;
  }
}
/deep/.el-checkbox__label {
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
      <el-form
        label-width="0px"
        :model="addContract"
        label-position="right"
        style="background-color: #fff;"
      >
        <!-- 双方 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree1')}}</b>
              <!-- 双方 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th colspan="2" class="td">{{$t('procure.agree.agree2')}}</th>
                <!-- 合同双方 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree3')}}
                </th>
                <!-- 名称 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree4')}}
                </th>
                <!-- 联系人 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree5')}}
                </th>
                <!-- 联系电话 -->
                <th class="td">{{$t('procure.agree.agree6')}}</th>
                <!-- 传真 -->
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree7')}}</td>
                <!-- 甲方 -->
                <td style="padding:0px 5px;">id:{{addContract.supplier_id}}</td>
                <td>
                  <div v-if="addContract.check_status==1||addContract.check_status==3">
                    <span style="color: #606266;">{{addContract.supplier_name}}</span>
                    <el-tag type="danger" size="mini" v-if="addContract.supplier&&addContract.supplier.pay_way==2" style="margin-left:3px;">月</el-tag>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="addContract.supplier_name"
                      filterable
                      clearable
                      remote
                      reserve-keyword
                      :remote-method="supplyMethod"
                      @change="supplyChange()"
                      :loading="supplyloading"
                      style="width:90%;"
                      size="small"
                      :value="addContract.supplier_name"
                    >
                      <el-option
                        v-for="item in supply_list"
                        :label="item.name"
                        :key="item.id"
                        :value="item.name"
                        :style="{color:item.supplier_status==2?'red':''}"
                        :disabled="item.supplier_status==2?true:false"
                      ></el-option>
                    </el-select>
                    <el-tag type="danger" size="mini" v-if="addContract.pay_way" style="margin-left:3px;">月</el-tag>
                  </div>
                </td>
                <td>
                  <el-input
                    v-model="addContract.supplier_contact"
                    size="small"
                    clearable
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    v-model="addContract.supplier_mobile"
                    size="small"
                    clearable
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    v-model="addContract.supplier_fax"
                    size="small"
                    clearable
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">{{$t('procure.agree.agree8')}}</td>
                <!-- 乙方 -->
                <td>
                  <el-select
                    filterable
                    clearable
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
                  <el-input
                    v-model="addContract.corp_contact"
                    clearable
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    v-model="addContract.corp_mobile"
                    clearable
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <el-input
                    v-model="addContract.corp_fax"
                    clearable
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">实际采购供应商</td>
                <td>
                  <div v-if="addContract.check_status==1||addContract.check_status==3">
                    <span style="color: #606266;">{{addContract.real_supplier_name}}</span>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="addContract.real_supplier_name"
                      filterable
                      clearable
                      remote
                      reserve-keyword
                      :remote-method="real_supplyMethod"
                      @change="real_supplyChange()"
                      :loading="real_supplyloading"
                      style="width:100%;"
                      size="small"
                      :value="addContract.real_supplier_name"
                      @clear='clear_real_supply'
                    >
                      <el-option
                        v-for="item in real_supply_list"
                        :label="item.name"
                        :key="item.id"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </div>
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
              <b>{{$t('procure.agree.agree9')}}</b>
              <!-- 需求 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <div v-for="(index,index_) in addContract.detail">
              <table border="1" bordercolor="#E5E5E5">
                <tr>
                  <th class="td">{{$t('procure.agree.agree10')}}</th>
                  <!-- 询单号 -->
                  <th class="td" width="150px">
                    <span style="color:red;">*</span>CAS
                  </th>
                  <th width="200">
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree11')}}
                  </th>
                  <!-- 产品名称 -->
                  <th class="td">{{$t('procure.agree.agree12')}}</th>
                  <!-- 品牌 -->
                  <th width="130">{{$t('procure.agree.agree13')}}</th>
                  <!-- 规格 -->
                  <th class="td">
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree14')}}
                  </th>
                  <!-- 纯度 -->
                  <th class="td">
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree15')}}
                  </th>
                  <!-- 数量 -->
                  <th class="td">
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree16')}}
                  </th>
                  <!-- 数量单位 -->
                  <th class="td">{{$t('procure.agree.agree17')}}</th>
                  <!-- 币种 -->
                  <th class="td">{{$t('procure.agree.agree18')}}</th>
                  <!-- 单价 -->
                  <th class="td">
                    <el-tooltip v-if="index.jiesuan_price" placement="top">
                      <div slot="content">
                        <span class="red">结算单价:{{index.jiesuan_price}}</span>
                      </div>
                      {{$t('procure.agree.agree19')}}
                    </el-tooltip>
                    <span v-else>{{$t('procure.agree.agree19')}}</span>
                  </th>
                  <!-- 金额 -->
                  <th colspan="2">{{$t('procure.agree.agree20')}}</th>
                  <!-- 提交货时间 -->
                </tr>
                <tr>
                  <td>
                    <el-input readonly v-model="index.inquiry_id" clearable size="small"></el-input>
                  </td>
                  <td>
                    <span
                      @click="product_detail(index.prod_id)"
                      :style="{cursor: 'pointer',color:(index.prod_id?'#66b1ff':'')}"
                    >{{index.cas}}</span>
                  </td>
                  <td>
                    <div v-if="addContract.check_status==1">
                      <span
                        style="color: #606266;line-height: 20px;display: inline-block"
                      >{{index.product_name_cn}}</span>
                    </div>
                    <div v-else>
                      <el-input clearable v-model="index.product_name_cn" size="small"></el-input>
                    </div>
                  </td>
                  <td>
                    <el-select
                      clearable
                      v-model="index.brand_id"
                      size="small"
                      :readonly="addContract.check_status==1?true:false"
                    >
                      <el-option
                        v-for="item in brand_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.package"
                      size="small"
                    ></el-input>
                  </td>
                  <td style="padding:0">
                    <el-input
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.purity"
                      size="small"
                      clearable
                      :style="{'border':index.purity==''?'1px solid red':''}"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.quantity"
                      @input="priceMoney(index)"
                      size="small"
                    ></el-input>
                  </td>
                  <td>
                    <el-select
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.quantity_unit"
                      size="small"
                    >
                      <el-option
                        v-for="item in units"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.currency_id"
                      size="small"
                      @change="changeCurrency(index)"
                    >
                      <el-option
                        v-for="item in currency"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.price"
                      size="small"
                    ></el-input>
                  </td>
                  <td>
                    <el-input
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.total_price"
                      @input="totalMoney(index)"
                      size="small"
                    ></el-input>
                  </td>
                  <td class="dateInputStyle" colspan="2">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index.delivery_date"
                      value-format="yyyy-MM-dd"
                      clearable
                      size="small"
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                    ></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree21')}}
                  </td>
                  <!-- 子合同号 -->
                  <td>
                    <el-input
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.procurement_contract_number"
                      @change="contractChange()"
                      size="small"
                    ></el-input>
                  </td>
                  <td>
                    <div v-if="addContract.check_status==1">
                      <span
                        style="color: #606266;line-height: 20px;display: inline-block"
                      >{{index.product_name}}</span>
                    </div>
                    <div v-else>
                      <el-input clearable v-model="index.product_name" size="small"></el-input>
                    </div>
                  </td>
                  <td><span style="color:red;">*</span> {{$t('procure.agree.agree22')}}</td><!-- 发票类型 -->
                  <td>
                    <el-select v-model="index.invoice_type" @change="change_invoice_type(index)"
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
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree22_')}}
                  </td>
                  <td>
                    <el-select
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      @change="change_invoice(index.invoice_type_id)"
                      v-model="index.invoice_type_id"
                      size="small"
                    >
                      <el-option
                        v-for="item in InvoiceInfo"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <!--<td>-->
                    <!--<el-button-->
                      <!--:readonly="addContract.check_status==1||addContract.check_status==3?true:false"-->
                      <!--type="text"-->
                      <!--@click="hand_additional(index)"-->
                      <!--size="mini"-->
                    <!--&gt;{{$t('procure.agree.agree95')}}</el-button>-->
                    <!--&lt;!&ndash; 附加费用 &ndash;&gt;-->
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
                      :disabled="index.storage_status==0?false:true"
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
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree23')}}
                  </td>
                  <!-- 是否现货 -->
                  <td colspan="2">
                    <el-select
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.is_stock"
                      size="small"
                    >
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
                  <td>{{$t('procure.agree.agree24')}}</td>
                  <!-- 分析要求 -->
                  <td colspan="12">
                    <span
                      v-for="i in index.checked_items"
                      v-if="i.child.length==0"
                      :label="i.id"
                      style="margin:0 5px"
                    >
                      <el-checkbox v-model="i.checked" name="type" :disabled='index.inventories.length>0||index.if_need_check==2'>{{i.name}}</el-checkbox>
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
                        @change="select(index_,j,j.checked)"
                        class="checkbox_nei"
                        :disabled='index.inventories.length>0||index.if_need_check==2'
                      >
                        <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                      </el-checkbox>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree25')}}</td>
                  <!-- 是否免检 -->
                  <td colspan="5">
                    <el-radio-group v-model="index.if_need_check" @change="change_need_check(index)">
                      <el-radio :label="1" :disabled='index.inventories.length>0'>{{$t('procure.agree.agree26')}}</el-radio>
                      <!-- 不免检 -->
                      <el-radio :label="2" :disabled='index.inventories.length>0'>{{$t('procure.agree.agree27')}}</el-radio>
                      <!-- 免检 -->
                    </el-radio-group>
                  </td>
                  <td>{{$t('Inquery.index.table6_title17')}}</td>
                  <td colspan="5">
                  <span v-if="index.jiesuan_price">￥{{index.jiesuan_price}}/<span v-if="index.quantity_unit==1||index.quantity_unit==3||index.quantity_unit==4||index.quantity_unit==5">g</span><span v-if="index.quantity_unit==2||index.quantity_unit==6">ml</span></span>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree112')}}</td>
                  <!-- 其他要求 -->
                  <td colspan="5">
                    <el-input clearable v-model="index.purchase_requirement" size="small"></el-input>
                  </td>
                  <td>{{$t('procure.agree.agree29')}}</td>
                  <!-- 存储条件 -->
                  <td colspan="2">{{attr(index,'storagecondition')}}</td>
                  <td>{{$t('procure.agree.agree30')}}</td>
                  <!-- 运输条件 -->
                  <td colspan="3">{{attr(index,'trancondition')}}</td>
                  <!--<td>{{$t('procure.agree.agree31')}}</td>&lt;!&ndash; 危险性 &ndash;&gt;-->
                  <!--<td>{{getEnumValue(enums.Danger,attr(index,'chemprod.property.danger_id'))}}</td>-->
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree28')}}</td>
                  <!-- 其他要求 -->
                  <td colspan="11">
                    <el-input clearable v-model="index.checked_requirement" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree32')}}</td>
                  <!-- 包装要求 -->
                  <td colspan="5">
                    <el-input clearable v-model="index.package_requirement" size="small"></el-input>
                  </td>
                  <td>{{$t('procure.agree.agree33')}}</td>
                  <!-- 要求发货时间 -->
                  <td colspan="6" class="dateInputStyle">
                    <el-date-picker
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
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
                  <td>{{$t('procure.agree.agree34')}}</td>
                  <!-- 标签要求 -->
                  <td colspan="12">
                    <el-input clearable v-model="index.label_requirement" size="small"></el-input>
                  </td>
                </tr>
                <tr>

                  <td>{{$t('procure.agree.agree35')}}</td>
                  <!-- 发货备注 -->
                  <td colspan="12">
                    <el-input
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.note"
                      size="small"
                    ></el-input>
                  </td>
                </tr>
                <tr>
                  <td>{{$t('procure.agree.agree36')}}</td>
                  <!-- 随货文件 -->
                  <td colspan="5">
                    <el-checkbox-group v-model="index.product_file">
                      <el-checkbox
                        v-for="item in product_file_info"
                        :label="item.id"
                        :key="item.id"
                        :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </td>
                  <td>{{$t('procure.agree.agree37')}}</td>
                  <!-- 生产日期 -->
                  <td colspan="2" class="dateInputStyle">
                    <el-date-picker
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      type="date"
                      style="width:100%;"
                      v-model="index.production_date"
                      value-format="yyyy-MM-dd"
                      size="small"
                      clearable
                    ></el-date-picker>
                  </td>
                  <td>
                    <span style="color:red;">*</span>
                    {{$t('procure.agree.agree38')}}
                  </td>
                  <!-- 是否报关 -->
                  <td>
                    <el-select
                      clearable
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                      v-model="index.if_declare"
                      size="small"
                    >
                      <el-option
                        v-for="item in if_declare_info"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button
                      type="text"
                      @click="hand_quoteinfo(index)"
                      size="mini"
                      readonly
                    >{{$t('procure.agree.agree39')}}</el-button>
                    <!-- 采购报价 -->
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
                  <td>{{$t('procure.agree.agree40')}}</td>
                  <!-- 总金额 -->
                  <td
                    colspan="3"
                  >{{addContract.total_money}}{{currency.filter(i=>{return i.id==addContract.detail[0].currency_id})[0]?currency.filter(i=>{return i.id==addContract.detail[0].currency_id})[0].name:''}}</td>
                </tr>
                <tr v-if="permission_names['documentary.create']=='documentary.create'">
                  <td colspan='13' style='text-align:right;padding:0px 5px;'>
                    <el-button
                            size="mini"
                            type="primary"
                            v-if="index.confirm_stock!=1"
                            @click="sure(index)"
                    >库存确认</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            v-else
                            :disabled="index.confirm_stock==1"
                    >库存已确认</el-button>
                    <el-button
                      size="mini"
                      type="primary"
                      @click="documentaryAdd(index)"
                      v-if="permission_names['documentary.create']=='documentary.create'&&!index.documentary"
                    >跟单</el-button>
                    <span v-if='index.documentary' style='margin:0px 5px;'>
                      <span v-for="i in index.documentary.aaa">
                        <el-button
                          type="primary"
                          @click="confirmed(i)"
                          size="mini"
                          style="margin-right:5px;margin-top:5px;"
                          v-if="permission_names[i.permission]==i.permission"
                        >{{i.product_name}}</el-button>
                      </span>
                    </span>
                    <el-button
                        type="primary"
                        size="mini"
                        v-if="permission_names['documentary.create']=='documentary.create'&&index.documentary&&index.documentary.logs&&index.documentary.logs.length>0"
                        @click="logs_click(index.documentary.logs)"
                    >Logs</el-button>
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
              <b>{{$t('procure.agree.agree41')}}</b>
              <!-- 条款 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree42')}}
                </th>
                <!-- 合同号 -->
                <th class="td">{{$t('procure.agree.agree43')}}</th>
                <!-- 签约时间 -->
                <th class="td">{{$t('procure.agree.agree44')}}</th>
                <!-- 签约地点 -->
                <th class="td">{{$t('procure.agree.agree45')}}</th>
                <!-- 采购人员 -->
                <th class="td">{{$t('procure.agree.agree46')}}</th>
                <!-- 销售 -->
                <th class="td">PO</th>
                <th width="500">
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree47')}}
                </th>
                <!-- 结算方式 -->
              </tr>
              <tr>
                <td>
                  <el-input
                    clearable
                    v-model="addContract.contract_number"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td class="dateInputStyle">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="addContract.contract_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-date-picker>
                </td>
                <td>
                  <el-input
                    clearable
                    v-model="addContract.signed_address"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <el-select
                    clearable
                    v-model="addContract.purchase_user_id"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  >
                    <el-option
                      v-for="item in purchaseList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    clearable
                    v-model="addContract.sale_id"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  >
                    <el-option
                      v-for="item in salesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input
                    clearable
                    v-model="addContract.customer_po"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <!--<el-select-->
                  <!--v-model="addContract.settle_type_id"-->
                  <!--filterable-->
                  <!--style="width:100%;"-->
                  <!--size="small"-->
                  <!--:readonly="addContract.check_status==1||addContract.check_status==3?true:false"-->
                  <!--&gt;-->
                  <!--<el-option-->
                  <!--v-for="item in settle_list"-->
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
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree48')}}</td>
                <!-- 交(提)货地点 -->
                <td colspan="4" >
                  <el-autocomplete
                      clearable
                      v-model="addContract.transportation"
                      @select="address_change"
                      :fetch-suggestions="querySearch"
                      style="width:100%;"
                      :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
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
                <td>{{$t('procure.agree.agree49')}}</td>
                <!-- 质量标准 -->
                <td colspan="6">
                  <el-input
                    clearable
                    v-model="addContract.quality_standard"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree50')}}</td>
                <!-- 合理损耗 -->
                <td colspan="6">
                  <el-input
                    clearable
                    v-model="addContract.reasonable_loss"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree51')}}</td>
                <!-- 包装标准&运输方式 -->
                <td colspan="6">
                  <el-input
                    clearable
                    v-model="addContract.package_standard"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree52')}}</td>
                <!-- 验收标准 -->
                <td colspan="6">
                  <el-input
                    clearable
                    v-model="addContract.accept_mode"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree53')}}
                </td>
                <!-- 有效期 -->
                <td colspan="4">
                  <el-input
                    clearable
                    v-model="addContract.expdate"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree54')}}</td>
                <!-- 备注 -->
                <td colspan="4">
                  <el-input
                    clearable
                    v-model="addContract.note"
                    size="small"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  ></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree47')}}
                </td>
                <!-- 加电子章 -->
                <td>
                  <el-radio-group
                    v-model="addContract.if_echapter"
                    :readonly="addContract.check_status==1||addContract.check_status==3?true:false"
                  >
                    <el-radio :label="1">{{$t('procure.agree.agree56')}}</el-radio>
                    <!-- 是 -->
                    <el-radio :label="0">{{$t('procure.agree.agree57')}}</el-radio>
                    <!-- 否 -->
                  </el-radio-group>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 审核 -->
        <div v-if="this.$route.query.enum_check" style="margin-top: 20px;">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree58')}}</b>
              <!-- 审批 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td class="td">
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree59')}}
                </td>
                <!-- 审批意见 -->
                <td>
                  <el-radio-group v-model="addContract.check_status">
                    <el-radio :label="1">{{$t('procure.agree.agree60')}}</el-radio>
                    <!-- 审核通过 -->
                    <el-radio :label="-1">{{$t('procure.agree.agree61')}}</el-radio>
                    <!-- 审核未通过 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td class="td">{{$t('procure.agree.agree59')}}</td>
                <!-- 审批意见 -->
                <td>
                  <el-input
                    clearable
                    type="textarea"
                    style="width:100%;"
                    :rows="2"
                    v-model="addContract.check_content"
                    size="small"
                  ></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 付款申请 -->
        <div v-if="this.$route.query.enum_pay" style="margin-top: 20px;">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show6 = !form_show6" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree62')}}</b>
              <!-- 付款申请 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show6" class="from-item">
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <th>#ID</th>
                <th>{{$t('procure.agree.agree63')}}</th>
                <!-- 申请时间 -->
                <th>{{$t('procure.agree.agree64')}}</th>
                <!-- 支付方式 -->
                <th>{{$t('procure.agree.agree65')}}</th>
                <!-- 银行 -->
                <th>{{$t('procure.agree.agree66')}}</th>
                <!-- 账号银行 -->
                <th>{{$t('procure.agree.agree67')}}</th>
                <!-- 开户账号 -->
                <th>{{$t('procure.agree.agree68')}}</th>
                <!-- 实付金额 -->
                <th>{{$t('procure.agree.agree69')}}</th>
                <!-- 冲往来账 -->
                <th>{{$t('procure.agree.agree70')}}</th>
                <!-- 退款 -->
                <th>{{$t('procure.agree.agree71')}}</th>
                <!-- 付款时间 -->
                <th>{{$t('procure.agree.agree72')}}</th>
                <!-- 状态 -->
                <th>{{$t('procure.agree.agree73')}}</th>
                <!-- 采购审核 -->
                <th>{{$t('procure.agree.agree74')}}</th>
                <!-- 财务审核 -->
                <th>{{$t('procure.agree.agree75')}}</th>
                <!-- 财务付款 -->
                <th>{{$t('procure.agree.agree54')}}</th>
                <!-- 备注 -->
                <th>{{$t('procure.agree.agree76')}}</th>
                <!-- 操作 -->
              </tr>
              <tr v-for="item in addContract.paylist">
                <td>{{item.id}}</td>
                <td>{{item.created_at}}</td>
                <td>{{item.pay_type == 1?$t('procure.agree.agree77'):item.pay_type == 2?$t('procure.agree.agree78'):$t('procure.agree.agree79')}}</td>
                <!-- 银行转账/现金/paypal付款 -->
                <td></td>
                <td>{{item.bank}}</td>
                <td>{{item.bank_account}}</td>
                <td>{{item.pay_amount}}{{currency.filter(i=>{return i.id==item.currency_id})[0].icon}}</td>
                <td>{{item.offset_amount}}{{currency.filter(i=>{return i.id==item.currency_id})[0].icon}}</td>
                <td>{{item.refund_amount}}{{item.refund_amount?currency.filter(i=>{return i.id==item.currency_id})[0].icon:''}}</td>
                <td>{{item.pay_date}}</td>
                <td>
                  <span v-if="item.status==-1">{{$t('procure.agree.agree80')}}</span>
                  <!-- 撤销 -->
                  <span
                    v-else
                  >{{getEnumValue(enums.paylist_finance_pay_status,item.finance_pay_status)}}</span>
                </td>
                <td>{{getEnumValue(enums.paylist_check_status,item.check_status)}}</td>
                <td>{{getEnumValue(enums.paylist_finance_check_status,item.finance_check_status)}}</td>
                <td>{{getEnumValue(enums.paylist_finance_pay_status,item.finance_pay_status)}}</td>
                <td>{{item.flow?item.flow.note:''}}</td>
                <td>
                  <el-button
                    type="danger"
                    @click="pay_cancel(item.id)"
                    size="mini"
                    v-if="item.check_status!=1&&item.status!=-1"
                  >{{$t('procure.agree.agree80')}}</el-button>
                </td>
              </tr>
              <!-- 撤销 -->
              <tr>
                <td colspan="16">
                  <b>{{$t('procure.agree.agree81')}}</b>
                  <!-- 详情 -->
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree65')}}
                </td>
                <!-- 银行 -->
                <td colspan="10">
                  <el-select v-model="asd" @change="bank()" size="small" clearable>
                    <el-option
                      v-for="item in addContract.supplier_bank_account"
                      :key="item.id"
                      :label="item.opening_bank"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td style="text-align: center;">
                  <el-button
                    type="primary"
                    @click="account(addContract.supplier_id)"
                    size="mini"
                  >{{$t('procure.agree.agree82')}}</el-button>
                  <!-- 账户 -->
                </td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td rowspan="2">{{$t('procure.agree.agree83')}}</td>
                <!-- 收款账户 -->
                <td colspan="3">{{$t('procure.agree.agree65')}}</td>
                <!-- 银行 -->
                <td colspan="2">{{$t('procure.agree.agree84')}}</td>
                <!-- 收款人 -->
                <td colspan="3">{{$t('procure.agree.agree85')}}</td>
                <!-- 银行账号 -->
                <td>{{$t('procure.agree.agree86')}}</td>
                <!-- 省份 -->
                <td>{{$t('procure.agree.agree87')}}</td>
                <!-- 地市 -->
                <td colspan="2">{{$t('procure.agree.agree88')}}</td>
                <!-- 账户类型 -->
                <td colspan="3">{{$t('procure.agree.agree89')}}</td>
                <!-- 银行备注 -->
              </tr>
              <tr>
                <td colspan="3">{{bank_list.opening_bank}}</td>
                <td colspan="2">{{bank_list.payee}}</td>
                <td colspan="3">{{bank_list.bank_account_number}}</td>
                <td>{{bank_list.province_code}}</td>
                <td>{{bank_list.city?bank_list.city.Name:''}}</td>
                <td colspan="2">
                  <el-select v-model="bank_list.type" clearable size="small" readonly>
                    <el-option
                      v-for="item in account_type_info"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td colspan="3">{{bank_list.remark}}</td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('procure.agree.agree64')}}
                </td>
                <!-- 支付方式 -->
                <td colspan="15">
                  <div v-if="addContract.currentaccount">转往来账</div>
                  <div v-else>
                    <el-select
                      v-model="Addpay.pay_type"
                      clearable
                      size="small"
                      style="width: 200px;border: 1px solid #f2f2f2;"
                    >
                      <el-option
                        v-for="item in enums.PayType"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </div>
                </td>
              </tr>
              <tr v-if="addContract.currentaccount">
                <td>{{$t('procure.agree.agree90')}}</td>
                <!-- 往来账余额 -->
                <td style="text-align:center;">
                  <span v-if="addContract.currentaccount>=0">({{$t('procure.agree.agree91')}})</span>
                  <!-- (欠供应商) -->
                  <span v-if="addContract.currentaccount<0">({{$t('procure.agree.agree92')}})</span>
                  <!-- (供应商欠) -->
                </td>
                <td colspan="6">
                  <el-input readonly clearable v-model="addContract.currentaccount"></el-input>
                </td>
                <td>{{$t('procure.agree.agree93')}}</td>
                <!-- 冲抵往来账 -->
                <td colspan="7">
                  <el-input clearable v-model="Addpay.offset_amount" @input="amount_change()"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree68')}}</td>
                <!-- 实付金额 -->
                <td colspan="7">
                  <el-input
                    clearable
                    v-model="Addpay.pay_amount"
                    size="small"
                    @input="pay_amount_change()"
                  ></el-input>
                </td>
                <td>{{$t('procure.agree.agree40')}}</td>
                <!-- 合计金额 -->
                <td colspan="7">
                  <el-input
                    clearable
                    v-model="Addpay.pay_requestamount"
                    @input="pay_requestamount_change()"
                    size="small"
                  ></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree54')}}</td>
                <!-- 备注 -->
                <td colspan="15">
                  <el-input clearable type="textarea" :rows="2" v-model="Addpay.note" size="small"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 退货 -->
        <!-- <div v-if="this.$route.query.enum_reback" style="margin-top: 20px;">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show5 = !form_show5" icon="el-icon-arrow-down">
              <b>退货</b>
            </el-button>
          </el-form-item>
        </div>-->
        <div v-if="enum_detail">
          <el-form-item class="form_title" v-if="addContract.paylist&&addContract.paylist.length>0">
            <el-button @click="form_show7 = !form_show7" type="text" icon="el-icon-arrow-down">
              <b>付款数据</b>
            </el-button>
          </el-form-item>
          <el-form-item
            v-show="form_show7"
            class="from-item"
            v-if="addContract.paylist&&addContract.paylist.length>0"
          >
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
                <th>采购审核状态</th>
                <th>财务审核状态</th>
                <th>财务付款状态</th>
                <!--<th>状态</th>-->
                <th>备注</th>
                <!--<th width="100">审核状态</th>-->
              </tr>
              <tr v-for="(item,index) in addContract.paylist">
                <td>{{item.id}}</td>
                <td>{{item.pay_time}}</td>
                <td>{{getEnumValue(enums.PayType,item.pay_type)}}</td>
                <td>{{item.pay_requestamount}}</td>
                <td>
                  {{item.pay_amount}}
                  <span v-if="item.offset_amount>0">(抵充往来账{{item.offset_amount}})</span>
                </td>
                <td>{{item.finance_pay_time}}</td>
                <td>
                  {{item.refund_amount}}
                  <span v-if="item.refund_credit_flag==1" style="font-size: 10px;">(往来账)</span>
                </td>
                <td>{{getEnumValue(enums.Currency,item.currency_id)}}</td>
                <!--<td>-->
                <!--<span v-if="item.status==-1">撤销</span>-->
                <!--<span v-else>{{getEnumValue(enums.paylist_finance_pay_status,item.finance_pay_status)}}</span>-->
                <!--</td>-->
                <td>
                  <div v-if="item.status!=-1">
                    <div v-if="item.check_status2==0">
                      <el-select
                        size="mini"
                        v-model="item.check_status"
                        clearable
                        style="width:100px;"
                      >
                        <el-option
                          v-for="i in enums.check_status"
                          v-if="i.id!==0"
                          :key="i.id"
                          :label="i.name"
                          :value="i.id"
                        ></el-option>
                      </el-select>
                    </div>
                    <div v-else>
                      <div>
                        <div class="h-20">
                          {{getEnumValue(enums.check_status,item.check_status)}}
                          <span
                            v-if="item.check_user"
                          >({{item.check_user.name}})</span>
                        </div>
                        <div class="h-20" v-if="item.check_user">{{(item.check_time)}}</div>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="h-20">
                    {{getEnumValue(enums.paylist_finance_check_status,item.finance_check_status)}}
                    <span
                            v-if="item.finance_check_user"
                    >({{item.finance_check_user.name}})</span>
                  </div>
                  <div class="h-20" v-if="item.finance_check_user">{{(item.finance_check_time)}}</div>
                </td>
                <td>
                  <div class="h-20">
                    <span v-if="item.status==-1">撤销</span>
                    <span
                            v-else
                    >{{getEnumValue(enums.paylist_finance_pay_status,item.finance_pay_status)}}</span>
                    <span v-if="item.finance_pay_user">({{item.finance_pay_user.name}})</span>
                  </div>
                  <div class="h-20" v-if="item.finance_pay_user">{{(item.finance_pay_time)}}</div>
                </td>
                <td>
                  {{item.note}}
                  <div v-if="item.package_no"><span>包号:</span>{{item.package_no}}</div>
                </td>
                <!--<td>{{getEnumValue(enums.check_status,item.check_status)}}</td>-->
              </tr>
            </table>
          </el-form-item>

          <el-form-item
            class="form_title"
            v-if="addContract.inventories&&addContract.inventories.length>0"
          >
            <el-button @click="form_show8 = !form_show8" type="text" icon="el-icon-arrow-down">
              <b>收货数据</b>
            </el-button>
          </el-form-item>
          <el-form-item
            v-show="form_show8"
            class="from-item"
            v-if="addContract.inventories&&addContract.inventories.length>0"
          >
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <th>#ID</th>
                <th>CAS</th>
                <th>产品名称</th>
                <th>仓库</th>
                <th>收货数量</th>
                <th>现有库存</th>
                <th>时间</th>
                <th>备注</th>
              </tr>
              <tr v-for="item in addContract.inventories">
                <td>{{item.id}}</td>
                <td>{{item.cas}}</td>
                <td>{{item.name_cn}}/{{item.name}}</td>
                <td>{{attr(item,'warehouse.name')}}</td>
                <td>{{item.original_stock}}{{getEnumValue(enums.units,item.original_stock_unit_id)}}</td>
                <td>{{item.stock}}{{getEnumValue(enums.units,item.base_unit_id)}}</td>
                <td>{{item.created_at}}</td>
                <td>{{item.note}}</td>
              </tr>
            </table>
          </el-form-item>

          <el-form-item
            class="form_title"
            v-if="addContract.invoices&&addContract.invoices.length>0"
          >
            <el-button @click="form_show9 = !form_show9" type="text" icon="el-icon-arrow-down">
              <b>发票数据</b>
            </el-button>
          </el-form-item>
          <el-form-item
            v-show="form_show9"
            class="from-item"
            v-if="addContract.invoices&&addContract.invoices.length>0"
          >
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <th>#ID</th>
                <th>发票类型</th>
                <th>发票号码</th>
                <th>开票日期</th>
                <th>到票日期</th>
                <th>公司名称</th>
                <th>产品名称</th>
                <th>数量</th>
                <th>单位</th>
                <th>单价</th>
                <th>金额</th>
                <th>税率</th>
                <th>税额</th>
                <th>不含税金额</th>
                <th>处理状态</th>
                <th>状态</th>
              </tr>
              <tr v-for="item in addContract.invoices">
                <td>{{item.id}}</td>
                <td>{{getEnumValue(enums.InvoiceInfo,item.invoice_type)}}</td>
                <td>{{item.invoice_number}}</td>
                <td>{{item.invoice_date}}</td>
                <td>{{item.invoice_receiver_date}}</td>
                <td>{{item.supplier_name}}</td>
                <td>{{item.name}}</td>
                <td>{{item.quantity}}</td>
                <td>{{getEnumValue(enums.units,item.quantity_unit)}}</td>
                <td>{{item.price}}</td>
                <td>{{item.total}}</td>
                <td>{{item.tax}}</td>
                <td>{{item.tax_amount}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.returns&&item.returns.post_time?'已处理':'未处理'}}</td>
                <td>
                  {{item.status==0?'待财务审核':(item.status==1?'有效':(item.status==-1?'作废':'退票'))}}
                  <!--0待财务审核,1有效,-1作废，-2退票-->
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="display:flex;justify-content: flex-end;margin:0px;">
          <el-button type="primary" @click="saveAdd()" :loading="save_loading" size="mini">{{$t('save')}}</el-button>
          <!-- 保存 -->
          <el-button class="sbaoClose" @click="close()" size="mini">{{$t('cancel')}}</el-button>
          <!-- 取消 -->
        </el-form-item>
      </el-form>

      <!-- 额外费用 -->
      <el-dialog :visible.sync="additional" width="30%">
        <el-form>
          <el-form-item>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td>{{$t('procure.agree.agree94')}}</td>
                <!-- 费用名称 -->
                <td>{{$t('procure.agree.agree19')}}</td>
                <!-- 金额 -->
                <td>{{$t('procure.agree.agree76')}}</td>
                <!-- 操作 -->
              </tr>
              <tr v-for="item in additional_list">
                <td>
                  <el-select style="width:100%;" v-model="item.additional_type_id" size="small">
                    <el-option
                      v-for="item in additional_type"
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
            <el-button type="primary" @click="save_Additional()" size="mini">{{$t('save')}}</el-button>
            <!-- 保存 -->
            <el-button class="sbaoClose" @click="close_Additional()" size="mini">{{$t('cancel')}}</el-button>
            <!-- 取消 -->
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 采购详情 -->
      <!-- <el-dialog :visible.sync="quoteinfo" width="40%" class="quoteInput">
        <el-form :model="quote_info">
          <el-form-item label="采购报价">
            <el-input type="textarea" v-model="quote_info.quote_info" size="small"></el-input>
          </el-form-item>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="性状描述">
                <el-input v-model="quote_info.character_info" size="small"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="交货城市">
                <el-input v-model="quote_info.delivery_city" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              @click="save_quoteinfo(quote_info)"
              size="mini"
            >保存</el-button>
            <el-button class="sbaoClose" @click="close_quoteinfo(quote_info)" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>-->
      <!-- 账户 -->
      <el-dialog :visible.sync="play" width="80%" class="quoteInput">
        <play :member="member_id" :type="bank_account_type_info" @noticeClose="noticeClose($event)"></play>
      </el-dialog>

      <!-- 工作流 -->
      <el-dialog :title="list_Confirmed.product_name" :visible.sync="dialogConfirmed" width="20%">
        <div style="display:flex;justify-content: space-between;width:100%;">
          <div></div>
          <el-select size="mini" v-model="list_Confirmed.obj" clearable style="width:150px;">
            <el-option v-for="i in list_Confirmed.list" :key="i.val" :label="i.product_name" :value="i.val"></el-option>
          </el-select>
          <el-button @click="Confirmed_save(list_Confirmed)" type="primary" size="mini">确定</el-button>
        </div>
      </el-dialog>

      <!-- 更新 -->
      <el-dialog :title="update_list.name+'Log'" :visible.sync="dialogUpdate" width="30%">
        <div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            style="width:100%;"
            v-model="update_list.log">
          </el-input>
        </div>
        <div style="text-align:right;margin-top:20px;">
          <el-button @click="update_save(update_list)" type="primary" size="mini">确定</el-button>
        </div>
      </el-dialog>

      <!-- logs -->
      <el-dialog :visible.sync="dialogLogs" width="40%" class="log_table">
        <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
          <tr style="font-weight: bold;">
          <td width='50'>ID</td>
          <td width='140'>时间</td>
          <td width='60'>用户</td>
          <td>log</td>
        </tr>
        <tr v-for="item in logs_list">
          <td>{{item.id}}</td>
          <td>{{item.created_at}}</td>
          <td>{{getEnumValue(Users,item.user_id)}}</td>
          <td>{{item.log}}</td>
        </tr>
        </table>
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
import Big from "@/big/a/big.mjs";
import { saler_contract_info } from "@/api/sale";
import { lists, listTotal, update, listPost } from "@/api/prod";
import { supplier_exemption_amount } from "@/api/procure";
import {
  documentary_index,
  documentary_create,
  documentary_make,
  documentary_export,
  documentary_update,
  documentary_log
} from "@/api/commission";
import VDistpicker from 'v-distpicker'
export default {
  name: "procure-agree",
  components: {
    play,
    VDistpicker 
  },
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
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
      dialogUpdate:false,
      update_list:{},
      dialogConfirmed:false,
      dialogLogs:false,
      list_Confirmed:{},
      logs_list:[],
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
        corp_mobile: "",
        corp_fax: "",
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
        pay_type: 1,
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
      form_show7: true,
      form_show8: true,
      form_show9: true,
      save_loading:false,
      Users:[],
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
      PurchaseSettlementMethod: [],
      additional_type: [],
      transportation: [],
      brand_list: [],
      PayType: [],
      account_type_info: [],
      bank_account_type_info: [],
      enums: {},
      enum_detail: false
    };
  },
  created() {
    if (this.$route.query.enum_detail) {
      this.enum_detail = true;
    }
    this.fetch_data();
  },
  computed: {
    ids() {
      return this.$route.query.ids;
    }
  },
  watch: {
    // ids(newValue, oldValue) {
    //     if(newValue!=oldValue){
    //         this.fetch_data();
    //     }
    // }
    $route(to, from) {
      if (to.name == "procure-agree") {
        this.fetch_data();
      }
    }
  },

  // watch:{
  //   if(this.$route.query.ids){
  //       this.fetch_data();
  //   }
  // },
  methods: {
    fetch_data() {
      this.product_file_info = [];
      this.bank_list = {};
      this.Addpay = {
        procurement_contract_id: "",
        supplier_id: "",
        supplier_name: "",
        pay_type: 1,
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
      };
      if (this.$route.query.ids) {
        listPost("ProcurementContract", this.$route.query.ids, "edit").then(
          res => {
            res.data.details.forEach(i=>{
              if(i.documentary&&i.documentary!=null){
                i.documentary.aaa = []
                this.workflow(
                  i.documentary.id,
                  i.documentary.workflow.enabledTrans,
                  i.documentary.workflow.i18n,
                  i.documentary.aaa,
                  i.documentary.workflow.routes
                );
                console.log(i.documentary.aaa)
              }
            })
            this.addContract.details = [];
            this.addContract = res.data;

            this.addContract.province = res.data.transportation_json?res.data.transportation_json.province:'';
            this.addContract.city =  res.data.transportation_json?res.data.transportation_json.city:'';
            this.addContract.district =  res.data.transportation_json?res.data.transportation_json.district:'';
            this.addContract.address = res.data.transportation_json?res.data.transportation_json.address:'';
            this.addContract.name =  res.data.transportation_json?res.data.transportation_json.name:'';
            this.addContract.mobile =  res.data.transportation_json?res.data.transportation_json.mobile:'';

            let money = 0;
            this.addContract.details.forEach((items, index) => {
              money = Number(
                new Big(money).plus(
                  new Big(items.total_price).plus(items.additional_cost)
                )
              ).toFixed(2);
            });
            this.addContract.total_money = Number(money);
            this.Addpay.pay_amount = this.addContract.total_money;
            this.Addpay.pay_requestamount = this.addContract.total_money;
            this.amount_change();
            this.enums = res.enum;
            if (this.addContract.details) {
              this.addContract = JSON.parse(
                JSON.stringify(this.addContract).replace(/details/g, "detail")
              );
              this.addContract.detail = JSON.parse(
                JSON.stringify(this.addContract.detail).replace(
                  /name/g,
                  "product_name"
                )
              );
              this.addContract.detail.forEach(element => {
                element.quantity_unit = parseInt(element.quantity_unit);
                element.checked_items = JSON.parse(
                  JSON.stringify(element.checked_items).replace(
                    /product_name/g,
                    "name"
                  )
                );
              });
            }
            this.corp_List = res.enum.company;
            this.$route.query.enum_pay &&
            this.addContract.supplier_bank_account[0]
              ? (this.asd = this.addContract.supplier_bank_account[0].id)
              : "";
            this.$route.query.enum_pay &&
            this.addContract.supplier_bank_account[0]
              ? (this.bank_list = this.addContract.supplier_bank_account[0])
              : "";
            enumList(this, res.enum);
          }
        );
      } else {
        listTotal(
          "ProcurementContract/generate?ids=" + this.$route.query.id
        ).then(res => {
          this.list = res.data;
          this.list.forEach(item => {
            item.additional = [];
            item.additional_cost = 0;
            item.quantity_unit = parseInt(item.quantity_unit);
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
          let Notic_generate = res.enum.corporations;
          this.addContract.contract_date = init();
          this.addContract.signed_address =
            Notic_generate.salercontract_signed_address;
          this.addContract.transportation = res.enum.transportation[0].val;
          if(res.data[0].supplier_id==39057&&res.enum.transportation[0].json_data){
            this.addContract.province = res.enum.transportation[0].json_data.province
            this.addContract.city = res.enum.transportation[0].json_data.city
            this.addContract.district = res.enum.transportation[0].json_data.district
            this.addContract.address = res.enum.transportation[0].json_data.address
            this.addContract.name = res.enum.transportation[0].json_data.name
            this.addContract.mobile = res.enum.transportation[0].json_data.mobile
          }
          this.addContract.if_echapter = 1;
          this.addContract.quality_standard = Notic_generate.s_quality_stardard;
          this.addContract.reasonable_loss = Notic_generate.s_reasonable_loss;
          this.addContract.package_standard = Notic_generate.s_package_stardard;
          this.addContract.accept_mode = Notic_generate.s_accept_mode;
          this.addContract.detail = this.list;
          this.addContract.sale_id = this.list[0].sale_id;
          this.addContract.expdate = res.enum.expdate ? res.enum.expdate : "";
          this.fromNotice();
          let money = 0;
          this.addContract.detail.forEach((items, index) => {
            money = Number(
              new Big(money).plus(
                new Big(items.total_price).plus(items.additional_cost)
              )
            ).toFixed(2);
          });
          this.addContract.total_money = Number(money);
          obj(this.brand_list, res.enum.brands);
          obj(this.PurchaseSettlementMethod, res.enum.PurchaseSettlementMethod);
          this.additional_type = res.enum.additional_cost_type;
          this.transportation = res.enum.transportation;
          this.corp_List = res.enum.company;
          this.enums = res.enum
        });
      }
      this.Users = this.GEnums.Users;
      this.fetchData();
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
    onSelected(data){
      this.addContract.province = data.province.value
      this.addContract.city = data.city.value
      this.addContract.district = data.area.value

    },
    sure(item){
        const h = this.$createElement;
        this.$msgbox({
            message: h('p', null, [
                h('span', null, '确定要执行此操作吗？ ')
            ]),
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            type: 'warning',
            beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '执行中...';
                    request({
                        url: 'api/v1/ProcurementContract/confirm_stock/'+item.id,
                        method: 'get',
                    }).then(res => {
                        instance.confirmButtonLoading = false;
                        instance.confirmButtonText = '确定';
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            item.confirm_stock=1
                            done();
                        }
                    })
                }
                if (action === 'cancel') {
                    done();
                }
            }
        })
    },
    documentaryAdd(item){
      var obj = {
        pod_id: item.procurement_contract_number
      };
      documentary_create(obj).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.fetch_data()
        } else {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      }).catch(rr => {
      })
    },
    confirmed(item) {
      if(item.list.length>1){
        this.list_Confirmed = JSON.parse(JSON.stringify(item));
        this.dialogConfirmed = true;
      }else if(item.product_name == '更新'){
        this.update_list = {
          id:item.id,
          log:'',
          name:item.product_name,
          url:item.url,
        }
        this.dialogUpdate = true
      }else if(item.product_name == '跟单'){
        this.update_list = {
          id:item.id,
          log:'',
          name:item.product_name,
          url:item.url,
        }
        this.update_list[item.obj_product_name] = item.list[0].val;
        this.dialogUpdate = true
      }else{
        var obj = {
          id: item.id
        };
        obj[item.obj_product_name] = item.list[0].val;
        documentary_make(item.url, obj, this);
      }
    },
    logs_click(list){
      this.logs_list = []
      this.logs_list = list
      this.dialogLogs = true
    },
    update_save(item){
      var obj = JSON.parse(JSON.stringify(item))
      delete obj.url
      delete obj.name
      documentary_log(item.url,obj,this)
    },
    Confirmed_save(item) {
      var obj = {
        id: item.id
      };
      obj[item.obj_product_name] = item.obj;
      documentary_make(item.url, obj, this);
    },

    change_ChemicalAppearance(item){
        item.chemical_appearance=this.GEnums.ChemicalAppearance[item.chemical_appearance_id].name
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
    change_invoice(invoice_id) {
      // if (invoice_id == 1 || invoice_id == 4) {
      //   this.addContract.settle_type = "款到发货，甲方提供增值税专用发票；";
      // } else if (invoice_id == 3 || invoice_id == 5) {
      //   this.addContract.settle_type = "款到发货，甲方提供普通发票；";
      // } else if (invoice_id == 2) {
      //   this.addContract.settle_type = "款到发货";
      // }
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
    select(i, item, checked) {
      if (checked) {
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
      } else {
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
       let flag=false
        this.addContract.detail[i].checked_items.forEach((items, index) => {
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
    clear_real_supply(){
       this.addContract.real_supplier_id=''
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
    querySearchAsync_corporation(queryString, cb) {
      var restaurants = this.PurchaseSettlementMethod;
      cb(restaurants);
    },
    clear() {
      this.addContract.settle_type = "";
    },
    handleSelect_corporation(item) {
      this.addContract.settle_type = item.name;
    },
    pay_cancel(id) {
      let that = this;
      request({
        url: "api/v1/ProcurementContract/modify/payment_cancel",
        method: "post",
        data: {
          id: id,
          status: "-1"
        }
      }).then(res => {
        if (res && res.code == 0) {
          this.fetch_data();
        } else {
          that.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    fetchData() {
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
      listTotal("data/user_list?user_type=102").then(res => {
        this.salesList = res.data;
      });
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
    totalMoney(item) {
      this.addContract.total_money = 0;
      this.addContract.detail.forEach((items, index) => {
        items.price = Number(
          new Big(items.total_price).div(items.quantity)
        ).toFixed(4);
        if(item.inventories.length==0){
          supplier_exemption_amount(this.addContract.supplier_id).then(res => {
            if (Number(items.total_price) <= Number(res.data.amount)) {
              items.if_need_check = 2;
            } else {
              items.if_need_check = 1;
            }
          });
        }
        this.addContract.total_money = Number(
          new Big(this.addContract.total_money)
            .plus(items.total_price)
            .plus(items.additional_cost)
        ).toFixed(2);
      });
    },
    priceMoney(item) {
      this.addContract.total_money = 0;
      this.addContract.detail.forEach((items, index) => {
        items.price = Number(
          new Big(items.total_price).div(items.quantity)
        ).toFixed(4);
        if(item.inventories.length==0){
          supplier_exemption_amount(this.addContract.supplier_id).then(res => {
            if (Number(items.total_price) <= Number(res.data.amount)) {
              items.if_need_check = 2;
            } else {
              items.if_need_check = 1;
            }
          });
        }
        this.addContract.total_money = Number(
          new Big(this.addContract.total_money)
            .plus(items.total_price)
            .plus(items.additional_cost)
        ).toFixed(2);
      });
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
            res.data.forEach((m,n)=>{
                if(m.supplier_status==2){
                    m.name=m.name+'(黑名单)'
                }
            })
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
      let flag=false
      this.addContract.supplier_id = this.supply_list.filter(item => {
        return item.name == this.addContract.supplier_name;
      })[0].id;
      if(this.addContract.supplier_id==39057){
        this.addContract.province = this.transportation[0].json_data.province
        this.addContract.city = this.transportation[0].json_data.city
        this.addContract.district = this.transportation[0].json_data.district
        this.addContract.address = this.transportation[0].json_data.address
        this.addContract.name = this.transportation[0].json_data.name
        this.addContract.mobile = this.transportation[0].json_data.mobile
      }
      saler_contract_info(this.addContract.supplier_id).then(res => {
        this.addContract.pay_way = res.data.info.pay_way
        if (res.data.info.contacts.length > 0) {
          this.addContract.supplier_contact = res.data.info.contacts[0].name;
          this.addContract.supplier_mobile = res.data.info.contacts[0].phone
            ? res.data.info.contacts[0].phone
            : res.data.info.contacts[0].mobile;
          this.addContract.supplier_fax = res.data.info.contacts[0].fax;
        }
      });
      if(this.enums.special_suppliers.includes(this.addContract.supplier_name)){
          if(this.addContract.supplier_name&&this.addContract.corp_name!='江苏艾康生物医药研发有限公司') {
              this.$alert('由于甲方变动,乙方已由江苏艾康商贸有限公司转变为江苏艾康生物医药研发有限公司,请悉知！', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
              });
          }
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
      let country_code = this.supply_list.filter(item => {
              return item.name == this.addContract.supplier_name;
          })[0]?this.supply_list.filter(item => {
              return item.name == this.addContract.supplier_name;
          })[0].country_code: "";
      if (country_code == "CHN") {
        this.addContract.detail.forEach(i=>{
          i.currency_id = 2;
          i.invoice_type_id = 1;
        })
        this.change_invoice(1)
      } else {
        this.addContract.detail.forEach(i=>{
          i.currency_id = 1;
          i.invoice_type_id = 2;
        })
        this.change_invoice(2)
      }

      if(!flag){
          supplier_exemption_amount(this.addContract.supplier_id).then((res=>{
              if(res.data.invoice_type){
                this.addContract.detail.forEach(i=>{
                  i.invoice_type_id=res.data.invoice_type;
                })
                  this.change_invoice(res.data.invoice_type)
                  for(var key in this.InvoiceInfo){
                      if((this.InvoiceInfo[key].id!=res.data.invoice_type)&&(this.InvoiceInfo[key].id!=2)){
                          this.InvoiceInfo[key].disabled=true
                      }
                  }

              }else{
                  for(var key in this.InvoiceInfo){
                      this.InvoiceInfo[key].disabled=false
                  }
              }
              this.addContract.detail.forEach(i=>{
                if(Number(i.total_price)<=Number(res.data.amount)){
                    i.if_need_check=2
                }else{
                    i.if_need_check=1
                }
              })
          }))
      }
    },
    real_supplyChange() {
      this.addContract.real_supplier_id = this.real_supply_list.filter(item => {
        return item.name == this.addContract.real_supplier_name;
      })[0].id;
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
              item.additional_cost = Number(
                new Big(item.additional_cost).plus(res.price)
              ).toFixed(2);
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
    account(id) {
      this.member_id = id;
      this.play = true;
    },
    noticeClose(even) {
      this.play = even;
      this.fetch_data();
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
    amount_change() {
      if (
        parseFloat(this.Addpay.offset_amount) >
        parseFloat(this.addContract.currentaccount)
      ) {
        this.Addpay.offset_amount = this.addContract.currentaccount;
      }
      this.Addpay.pay_amount = Number(
        new Big(this.Addpay.pay_requestamount).minus(this.Addpay.offset_amount)
      ).toFixed(2);
    },
    pay_amount_change() {
      this.Addpay.pay_requestamount = Number(
        new Big(this.Addpay.pay_amount).plus(this.Addpay.offset_amount)
      ).toFixed(2);
    },
    pay_requestamount_change() {
      this.Addpay.pay_amount = Number(
        new Big(this.Addpay.pay_requestamount).minus(this.Addpay.offset_amount)
      ).toFixed(2);
    },
    saveAdd() {
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
      if (this.$route.query.ids) {
        if (this.addContract.detail) {
          this.addContract.details = this.addContract.detail;
          // this.addContract = JSON.parse(
          //   JSON.stringify(this.addContract).replace(/detail/g, "details")
          // );
        }
        this.addContract.details.forEach(item => {
          item.supplier_id = this.addContract.supplier_id;
          if (!item.checked_items) {
            item.checked_items = [];
          }
          if (!item.product_file) {
            item.product_file = [];
          }
        });
        if (this.$route.query.enum_check) {
          updateMethod(this.addContract, "ProcurementContract", "verify", this);
        } else if (this.$route.query.enum_pay) {
          this.Addpay.procurement_contract_id = this.addContract.id;
          this.Addpay.supplier_id = this.bank_list.member_id;
          this.Addpay.supplier_name = this.addContract.supplier_name;
          this.Addpay.currency_id = this.addContract.currency_id;
          this.Addpay.bank_account_id = this.asd;
          this.Addpay.bank = this.bank_list.opening_bank;
          this.Addpay.bank_note = this.bank_list.remark;
          this.Addpay.bank_account = this.bank_list.bank_account_number;
          this.Addpay.receiver = this.bank_list.payee;
          this.addContract.paylist[0]
            ? (this.Addpay.paybank = this.addContract.paylist[0].paybank)
            : (this.Addpay.paybank = "");
          this.Addpay.offset_amount = this.Addpay.offset_amount
            ? parseFloat(this.Addpay.offset_amount)
            : 0;
          this.Addpay.pay_amount = this.Addpay.pay_amount
            ? parseFloat(this.Addpay.pay_amount)
            : "";
          this.Addpay.corp_id = this.addContract.corp_id;
          create(this.Addpay, "ProcurementContract/Paylist", "create", this);
        } else if (this.$route.query.enum_detail) {
          if (this.addContract.real_supplier_id == "") {
            this.addContract.real_supplier_id = this.addContract.supplier_id;
            this.addContract.real_supplier_name = this.addContract.supplier_name;
          }
          if (this.addContract.details) {
            this.addContract = JSON.parse(
              JSON.stringify(this.addContract).replace(/details/g, "detail")
            );
            this.addContract.detail.forEach(item => {
              item.supplier_id = this.addContract.supplier_id;
              if (!item.checked_items) {
                item.checked_items = [];
              }
              if (!item.product_file) {
                item.product_file = [];
              }
            });
            this.addContract.currency_id = this.addContract.detail[0].currency_id;
          }
          updateMethod(this.addContract, "ProcurementContract", "update", this);
        }
      } else {
        this.addContract.total_money = 0;
        this.addContract.contract_number = "";
        this.addContract.detail = JSON.parse(
          JSON.stringify(this.addContract.detail).replace(
            /product_name/g,
            "name"
          )
        );
        this.addContract.detail = JSON.parse(
          JSON.stringify(this.addContract.detail).replace(
            /product_name_cn/g,
            "name_cn"
          )
        );
        for (var i = 0; i < this.addContract.detail.length; i++) {
          if (i < this.addContract.detail.length - 1) {
            this.addContract.contract_number +=
              this.addContract.detail[i].contract_number + "-";
          } else {
            this.addContract.contract_number += this.addContract.detail[
              i
            ].contract_number;
          }
          this.addContract.detail[
            i
          ].procurement_contract_number = this.addContract.detail[
            i
          ].contract_number;
          this.addContract.detail[i].notice_id = this.addContract.detail[i].id;
          this.addContract.total_money +=
            parseFloat(this.addContract.detail[i].total_price) +
            parseFloat(this.addContract.detail[i].additional_cost);
          this.addContract.detail[i].quantity = parseFloat(
            this.addContract.detail[i].quantity
          );
          this.addContract.detail[
            i
          ].purchase_user_id = this.addContract.purchase_user_id;
          this.addContract.detail[
            i
          ].purchase_user_id = this.addContract.purchase_user_id;
          this.addContract.detail[i].supplier_id = this.addContract.supplier_id;
        }
        this.addContract.currency_id = this.addContract.detail[0].currency_id;
        this.list = this.addContract.detail;
        createMethod(this.addContract, "ProcurementContract", "create", this);
      }
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
    },
    fromNotice() {
      this.addContract.supplier_id = this.list[0].supplier_id;
      this.addContract.supplier_name = this.list[0].supplier.name;
      this.addContract.purchase_user_id = this.list[0].purchase_user_id;
      this.addContract.note = this.list[0].note;
      if (this.list[0].supplier.contacts.length != 0) {
        this.addContract.supplier_contact = this.list[0].supplier.contacts[0].name;
        this.addContract.supplier_mobile = this.list[0].supplier.contacts[0].phone;
        this.addContract.supplier_fax = this.list[0].supplier.contacts[0].fax;
      }
      for (var i = 0; i < this.list.length; i++) {
        if (i < this.list.length - 1) {
          this.addContract.contract_number +=
            this.list[i].contract_number + "-";
        } else {
          this.addContract.contract_number += this.list[i].contract_number;
        }
        this.addContract.total_money += parseInt(this.list[i].total_price);
        this.addContract.detail[i].id = JSON.parse(
          JSON.stringify(this.addContract.detail[i].id).replace(
            /id/g,
            "notice_id"
          )
        );
      }
      this.addContract.detail = JSON.parse(
        JSON.stringify(this.addContract.detail).replace(
          /procurement_contract_number/g,
          "contract_number"
        )
      );
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
function enumList(b, a) {
  obj(b.units, a.units);
  obj(b.PayType, a.PayType);
  obj(b.currency, a.Currency);
  obj(b.brand_list, a.brands);
  obj(b.testitems, a.testitems);
  obj(b.InvoiceInfo, a.InvoiceInfo);
  obj(b.is_stock_info, a.is_stock_info);
  obj(b.if_declare_info, a.if_declare_info);
  obj(b.product_file_info, a.product_file_info);
  obj(b.PurchaseSettlementMethod, a.PurchaseSettlementMethod);
  b.transportation = a.transportation;
  b.account_type_info = a.account_type_info;
  b.additional_type = a.additional_cost_type;
}
function create(data, type, method_type, that) {
  that.save_loading=true
  request({
    url: "api/v1/" + type + "/" + method_type,
    method: "post",
    data
  })
    .then(res => {
      that.save_loading=false
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
        that.save_loading=false
    });
}
function createMethod(data, type, method_type, that) {
  that.save_loading=true
  request({
    url: "api/v1/" + type + "/" + method_type,
    method: "post",
    data
  })
    .then(res => {
      that.save_loading=false
      if (res && res.code == 0) {
        that.$message({
          message: res.msg,
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
        that.save_loading=false
    });
}
function updateMethod(data, type, method_type, that) {
  that.save_loading=true
  request({
    url: "api/v1/" + type + "/" + data.id + "/" + method_type,
    method: "post",
    data
  })
    .then(res => {
      that.save_loading=false
      if (res && res.code == 0) {
        that.$message({
          message: res.msg,
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
      that.save_loading=false
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











