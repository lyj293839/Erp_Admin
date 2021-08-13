<style lang="scss" scoped type="text/scss">
/deep/.div {
  width: 100%;
  font-size: 14px;
  margin: 0px auto;
  border: 1px solid #e5e5e5;
  .el-input__inner{
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
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 5px;
    background-color: #fff;
  }
  td{padding-left: 5px;text-align: left;}
  th{padding-left: 5px;text-align: left;}
}
.from-item {
  width: 100%;
  flex-wrap: wrap;
}
/deep/.quoteInput{
  .el-input__inner{
    border:1px solid #dcdfe6;
    padding: 0px 5px;
  }
}
/deep/.dateInput{
  .el-input__inner{
    padding: 0px 15px;
  }
  .el-input__prefix{
    left: -8px;
  }
}
  .display_br{display: inline-block;}
  /deep/.checkbox_nei{
    margin-left: 10px;padding-left:0px;
    .el-checkbox__label{padding-left:0px;}
  }
/deep/.el-checkbox__label{padding-left:5px;}
.el-checkbox{margin-right: 10px;}
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
    <div >
    <!-- yangshuai -->
      <el-form label-width="0px" :model="addContract" style="background-color: #fff;">
        <div v-if="GEnums.sousuo_purchaseuser.includes(user_name)"  class="d2-text-center d2-m-10">
        <el-input v-model="orderNo" size="small" clearable style="width:200px;display: inline-block;"></el-input>
        <el-button type="primary" size="small" @click.stop="request_orderNo" class="d2-ml-5">请求</el-button>
        </div>
        <div class="div">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree1')}}</b><!-- 双方 -->

            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th colspan="2" class="td">{{$t('procure.agree.agree2')}}</th><!-- 合同双方 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree3')}}</th><!-- 名称 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree4')}}</th><!-- 联系人 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree5')}}</th><!-- 联系电话 -->
                <th class="td">{{$t('procure.agree.agree6')}}</th><!-- 传真 -->
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree7')}}</td><!-- 甲方 -->
                <td width="100">
                  <el-input v-model="addContract.supplier_id" size="small" clearable></el-input>
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
                      :style="{color:(item.supplier_status==2||item.is_stop==2)?'red':''}"
                      :disabled="(item.supplier_status==2||item.is_stop==2)?true:false"
                    >
                      <span style="float: left">{{ item.name }}</span>
                      <el-tag type="danger" size="mini" v-if="item.pay_way==2" style="margin-left:3px;">月</el-tag>
                    </el-option>
                  </el-select>
                  <el-tag type="danger" size="mini" v-if="addContract.pay_way==2" style="margin-left:3px;">月</el-tag>
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
                      <div>{{item.name+'-'+(item.phone?item.phone:(item.mobile?item.mobile:''))}}</div>
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
                <td colspan="2">{{$t('procure.agree.agree8')}}</td><!-- 乙方 -->
                <td>
                  <el-select filterable clearable v-model="addContract.corp_id" :disabled="special2_suppliers.includes(addContract.supplier_name)" size="small" id='corp_name' style="width:100%;" @change="corpChange()" >
                    <el-option
                      v-for="item in corp_List"
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
                <td colspan="3"><span style='color:#efa011;'>不填则默认甲方</span></td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin-top: 20px;">
          {{$t('procure.agree.agree42')}}：<span style="color:red;">*</span><!-- 合同号： -->
          <el-select v-model="addForm.prefix" size="small" @change="select_prefix" clearable>
            <el-option
                    v-for="item in ContractNumberPrefix"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                    style="border: 1px solid #f2f2f2;"
            ></el-option>
          </el-select>
          <el-input v-model="addForm.postfix" size="small" @change="select_postfix" clearable style="display: inline-block;width: 200px;margin-left: 5px;"></el-input>
        </div>
        <!-- 需求 -->
        <div class="div" style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree9')}}</b><!-- 需求 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width="80px">#{{$t('procure.agree.agree10')}}</th><!-- 询单号 -->
                <th class="td" width="150px"><span style="color:red;">*</span>CAS</th>
                <th width='200'><span style="color:red;">*</span>{{$t('procure.agree.agree11')}}</th><!-- 产品名称 -->
                <th class="td">{{$t('procure.agree.agree12')}}</th><!-- 品牌 -->
                <th width='130'>{{$t('procure.agree.agree13')}}</th><!-- 规格 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree14')}}</th><!-- 纯度 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree15')}}</th><!-- 数量 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree16')}}</th><!-- 数量单位 -->
                <th class="td">{{$t('procure.agree.agree17')}}</th><!-- 币种 -->
                <th class="td" width="80">{{$t('procure.agree.agree18')}}</th><!-- 单价 -->
                <th class="td"><span style="color:red;">*</span>{{$t('procure.agree.agree19')}}</th><!-- 金额 -->
                <th colspan="2">{{$t('procure.agree.agree20')}}</th><!-- 提交货时间 -->
              </tr>
              <tr>
                <td>
                  <el-input v-model="list.inquiry_id" size="small" clearable></el-input>
                </td>
                <td>
                  <el-select
                    @change="casChange(list.cas)"
                    v-model="list.cas"
                    filterable
                    clearable
                    remote
                    reserve-keyword
                    :remote-method="remoteCas"
                    :loading="loadCas"
                    style="width:100%;"
                    size="small"
                  >
                    <el-option
                      v-for="item in cas_list"
                      :label="item.cas"
                      :key="item.id"
                      :value="item.cas"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="list.name_cn" size="small" clearable></el-input>
                </td>
                <td>
                  <el-select clearable v-model="list.brand_id" size="small">
                    <el-option
                      v-for="item in brand_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="list.package" size="small" clearable></el-input>
                </td>
                <td  style='padding:0'>
                  <el-input v-model="list.purity" size="small" clearable  :style="{'border':list.purity==''?'1px solid red':''}"></el-input>
                </td>
                <td>
                  <el-input v-model="list.quantity" @input="priceMoney()" size="small" clearable></el-input>
                </td>
                <td>
                  <el-select v-model="list.quantity_unit" size="small" clearable>
                    <el-option
                      v-for="item in units"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="list.currency_id" @change="changeCurrency(list)" size="small" clearable>
                    <el-option
                      v-for="item in currency"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                    <span>{{list.price}}</span>
                </td>
                <td>
                  <el-input v-model="list.total_price" @input="totalMoney()" size="small" clearable></el-input>
                </td>
                <td class="dateInput" colspan="2">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="list.delivery_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td><span style="color:red;">*</span> {{$t('procure.agree.agree21')}}</td><!-- 子合同号 -->
                <td>
                  <el-input v-model="list.contract_number" @change="contractChange()" size="small" clearable></el-input>
                </td>
                <td>
                  <el-input v-model="list.name" size="small" clearable></el-input>
                </td>

                <td><span style="color:red;">*</span> {{$t('procure.agree.agree22')}}</td><!-- 发票类型 -->
                <td>
                  <el-select v-model="list.invoice_type"  @change="change_invoice_type(list.invoice_type)"
                             size="small" clearable>
                    <el-option
                            v-for="item,key in enums.pu_invoice_types"
                            :key="key"
                            :label="enums.pu_invoice_types[key]"
                            :value="enums.pu_invoice_types[key]"
                    ></el-option>
                  </el-select>
                </td>
                <td><span style="color:red;">*</span> {{$t('procure.agree.agree22_')}}</td><!-- 发票税率 -->
                <td>
                  <el-select v-model="list.invoice_type_id"  @change="change_invoice(list.invoice_type_id)"
                             size="small" clearable>
                    <el-option
                      v-for="item in InvoiceInfo"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </td>
                <!--<td>-->
                  <!--<el-button type="text" @click="hand_additional()"  size="mini">{{$t('procure.agree.agree95')}}</el-button>&lt;!&ndash; 附加费用 &ndash;&gt;-->
                <!--</td>-->
                <!--<td>{{list.additional_cost}}</td>-->
                <td>来货颜色</td>
                <td  colspan="2">
                  <el-select v-model="list.chemical_appearance_id" @change="change_ChemicalAppearance" size="small" filterable  clearable>
                    <el-option
                      v-for="item in GEnums.ChemicalAppearance"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td ><span style="color:red;">*</span> {{$t('procure.agree.agree23')}}</td><!-- 是否现货 -->
                <td colspan="2">
                  <el-select v-model="list.is_stock" size="small" clearable>
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
                <td>{{$t('procure.agree.agree24')}}</td><!-- 分析要求 -->
                <td colspan="12">
                  <span v-for="i in list.checked_items" :label="i.id" style="margin:0 5px">
                    <el-checkbox v-model="i.checked" name="type" v-if="i.child.length==0" :disabled='list.if_need_check==2'>{{i.name}}</el-checkbox>
                  </span><br>
                    <div v-for="i in list.checked_items" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                      <span>{{i.name}}</span>:
                      <el-checkbox v-for="j in i.child" :key="j.id" :label="j.id" v-model="j.checked" @change="select(j.id,j.checked)" class="checkbox_nei" :disabled='list.if_need_check==2'><span  style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>
                    </div>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree25')}}</td><!-- 是否免检 -->
                <td colspan="5">
                  <el-radio-group v-model="list.if_need_check" @change="change_need_check(list.if_need_check)">
                    <el-radio :label="1">{{$t('procure.agree.agree26')}}</el-radio><!-- 不免检 -->
                    <el-radio :label="2">{{$t('procure.agree.agree27')}}</el-radio><!-- 免检 -->
                  </el-radio-group>
                </td>
                <td  colspan="2"><span style="color:red;">{{$t('procure.agree.agree113')}}</span></td><!--是否从寄售库存采购-->
                <td   class="red" colspan="4">
                  <div style="display:flex;justify-content: space-between;align-items: center;">
                    <el-radio-group v-model="list.is_from_consign" @change="fromConsign_change(list.is_from_consign)">
                      <el-radio :label="0">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                    <!-- <el-select v-model="list.value" v-if="list.is_from_consign==1"
                      size='small' 
                      placeholder="请选择" 
                      style="width:50%;" class="quoteInput">
                      <el-option
                        v-for="item in batch_list"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>
                    </el-select> -->
                  </div>
                </td>
                <!--<td>{{$t('procure.agree.agree28')}}</td>&lt;!&ndash; 分析要求 &ndash;&gt;-->
                <!--<td colspan="5">-->
                  <!--<el-input v-model="list.checked_requirement" size="small" clearable></el-input>-->
                <!--</td>-->
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree112')}}</td><!-- 采购备注 -->
                <td colspan="5">
                  <el-input v-model="list.purchase_requirement " size="small" clearable></el-input>
                </td>
                <td>{{$t('procure.agree.agree29')}}</td><!-- 存储条件 -->
                <td colspan="2">{{list.storagecondition}}</td>
                <td>{{$t('procure.agree.agree30')}}</td><!-- 运输条件 -->
                <td colspan="3"><span v-if="list.trancondition">{{list.trancondition}}</span></td>
                <!--<td>{{$t('procure.agree.agree31')}}</td>&lt;!&ndash; 危险性 &ndash;&gt;-->
                <!--<td></td>-->
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree28')}}</td><!-- 分析要求 -->
                <td colspan="5">
                  <el-input v-model="list.checked_requirement" size="small" clearable></el-input>
                </td>
                <td>供应商单号</td>
                <td colspan="5">
                  <el-input v-model="list.supplier_order_no" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree32')}}</td><!-- 包装要求 -->
                <td colspan="5">
                  <el-input v-model="list.package_requirement" size="small" clearable></el-input>
                </td>
                <td>{{$t('procure.agree.agree33')}}</td><!-- 要求发货时间 -->
                <td colspan="6" class="dateInput">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="list.required_delivery_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree34')}}</td><!-- 标签要求 -->
                <td colspan="12">
                  <el-input v-model="list.label_requirement" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree35')}}</td><!-- 发货备注 -->
                <td colspan="12">
                  <el-input v-model="list.note" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree36')}}</td><!-- 随货文件 -->
                <td colspan="5">
                  <el-checkbox-group v-model="list.product_file">
                    <el-checkbox
                      v-for="item in product_file_info"
                      :label="item.id"
                      :key="item.id"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{$t('procure.agree.agree37')}}</td><!-- 生产日期 -->
                <td colspan="2" class="dateInput">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="list.production_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                  ></el-date-picker>
                </td>
                <td><span style="color:red;">*</span>{{$t('procure.agree.agree38')}}</td><!-- 是否报关 -->
                <td>
                  <el-select v-model="list.if_declare" size="small" clearable>
                    <el-option
                      v-for="item in if_declare_info"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-button type="text" @click="hand_quoteinfo(list)" size="mini" readonly>{{$t('procure.agree.agree39')}}</el-button>
                </td><!-- 采购报价 -->
                <td></td>
              </tr>
              <tr>
                <td colspan="9"></td>
                <td>{{$t('procure.agree.agree40')}}</td><!-- 总金额 -->
                <td>
                  <el-input v-model="addContract.total_money" readonly size="small"></el-input>
                </td>
                <td colspan="2"></td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 条款 -->
        <div class="div">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>{{$t('procure.agree.agree41')}}</b><!-- 条款 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th width="125"> <span style="color:red;">*</span>{{$t('procure.agree.agree42')}}</th><!-- 合同号 -->
                <th>{{$t('procure.agree.agree43')}}</th><!-- 签约时间 -->
                <th>{{$t('procure.agree.agree44')}}</th><!-- 签约地点 -->
                <th>{{$t('procure.agree.agree45')}}</th><!-- 采购人员 -->
                <th>{{$t('procure.agree.agree46')}}</th><!-- 销售 -->
                <th>PO</th>
                <th width="500"><span style="color:red;">*</span>{{$t('procure.agree.agree47')}}</th><!-- 结算方式 -->
              </tr>
              <tr>
                <td>
                  <el-input v-model="addContract.contract_number" size="small" clearable></el-input>
                </td>
                <td class="dateInput">
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
                  <el-select v-model="addContract.purchase_user_id" size="small" clearable>
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
                  <!--<el-select v-model="addContract.settle_type_id" filterable style="width:100%;" size="small">-->
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
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree48')}}</td><!-- 交(提)货地点 -->
                <td colspan="6">
                  <el-autocomplete
                      clearable
                      @select="address_change"
                      v-model="addContract.transportation"
                      :fetch-suggestions="querySearch"
                      style="width:100%;"
                    ></el-autocomplete>
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
                <td>{{$t('procure.agree.agree49')}}</td><!-- 质量标准 -->
                <td colspan="6">
                  <el-input v-model="addContract.quality_standard" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree50')}}</td><!-- 合理损耗 -->
                <td colspan="6">
                  <el-input v-model="addContract.reasonable_loss" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree51')}}</td><!-- 包装标准&运输方式 -->
                <td colspan="6">
                  <el-input v-model="addContract.package_standard" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree52')}}</td><!-- 验收标准 -->
                <td colspan="6">
                  <el-input v-model="addContract.accept_mode" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td><span style="color:red;">*</span>{{$t('procure.agree.agree53')}}</td><!-- 有效期 -->
                <td colspan="4">
                  <el-input v-model="addContract.expdate" size="small" clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('procure.agree.agree54')}}</td><!-- 备注 -->
                <td colspan="4">
                  <el-input v-model="addContract.note" type size="small" clearable></el-input>
                </td>
                <td><span style="color:red;">*</span>{{$t('procure.agree.agree55')}}</td><!-- 加电子章 -->
                <td>
                  <el-radio-group v-model="addContract.if_echapter">
                    <el-radio :label="1">{{$t('procure.agree.agree56')}}</el-radio><!-- 是  -->
                    <el-radio :label="0">{{$t('procure.agree.agree57')}}</el-radio><!-- 否 -->
                  </el-radio-group>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="display:flex;justify-content: flex-end;margin:0px;">
          <span v-if="addContract.supplier_name=='安徽泽升科技有限公司'||addContract.supplier_name=='上海迈瑞尔化学技术有限公司'||addContract.supplier_name=='上海易恩化学技术有限公司'" class="red bold d2-mr-10">新建合同后请立即用往来账申请付款</span>
          <el-button v-if="pay_apply_show" type="danger" @click="pay_apply()" size="mini">付款申请</el-button>
          <el-button  :disabled="pay_apply_show" type="primary" :loading="save_loading" @click="saveAdd()" size="mini">{{$t('save')}}</el-button><!-- 保存 -->
          <el-button @click="close()" size="mini">{{$t('cancel')}}</el-button><!-- 取消 -->
        </el-form-item>
      </el-form>
      <!-- 额外费用 -->
      <el-dialog class="div" :visible.sync="additional" width="30%">
        <el-form>
          <el-form-item>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td>{{$t('procure.agree.agree94')}}</td><!-- 费用名称 -->
                <td>{{$t('procure.agree.agree19')}}</td><!-- 金额 -->
                <td>{{$t('procure.agree.agree76')}}</td><!-- 操作 -->

              </tr>
              <tr v-for="item in list.additional">
                <td>
                  <el-select style="width:100%;" v-model="item.additional_type_id" size="small" clearable>
                    <el-option
                      v-for="item in additional_type"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.price" size="small" clearable></el-input>
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
            <el-button  type="primary" @click="save_Additional()" :loading='loading?true:false' size="small">{{$t('save')}}</el-button><!-- 保存 -->
            <el-button class="sbaoClose" @click="close_Additional()" size="small">{{$t('cancel')}}</el-button><!-- 取消 -->
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 采购详情 -->
      <!-- <el-dialog :visible.sync="quoteinfo" width="40%">
        <el-form :model="quote_info">
          <el-form-item label="采购报价">
            <el-input type="textarea" v-model="quote_info.quote_info" size="small"></el-input>
          </el-form-item>
          <el-row type="flex" justify="space-between" class="quoteInput">
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
      </el-dialog> -->
    </div>
  </d2-container>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import request from "@/plugin/axios";
import Big from "@/big/a/big.mjs";
import util from "@/libs/util";
import { saler_contract_info } from '@/api/sale'
import { lists, listTotal, update, create } from "@/api/prod";
import {supplier_exemption_amount} from "@/api/procure";
import { tsTypeQuery, declareModuleExports } from "@babel/types";
import { delimiter } from "path";
import { getDate,futureDate } from '@/utils/index'
import { mapState, mapActions } from "vuex";
import VDistpicker from 'v-distpicker'
export default {
    name:"procure-agreeNew",
    components: {
    VDistpicker 
  },
  data() {
    return {
      id:'',
      form_show1: true,
      form_show2: true,
      form_show3: true,
      additional: false,
      quoteinfo: false,
      quote_info: {},
      cas_list: [],
      loadCas: false,
      pay_apply_show:false,
      supplyloading: false,
      real_supplyloading:false,
      loading:false,
      list: {
        sku_no:'',
        value:'',
        additional: [],
        additional_cost: 0,
        production_date: "",
        required_delivery_date: "",
        package: "",
        inquiry_id: "",
        contract_status: 0,
        prefix: "",
        postfix: "",
        contract_number: "",
        supplier_id: "",
        cas: "",
        name: "",
        name_cn: "",
        brand_id: "",
        purity: "",
        quantity: "",
        quantity_unit: "",
        price: 0,
        storagecondition:'',
        trancondition:'',
        danger:'',
        currency_id: 1,
        total_price: "",
        purchase_user_id: "",
        delivery_date: "",
        invoice_type_id: 1,
        invoice_type: '增值税专用发票',
        if_need_check: 1,
        is_from_consign:0,
        checked_requirement: "",
        supplier_order_no:'',
        purchase_requirement:"",
        label_requirement: "",
        package_requirement: "",
        product_file: [],
        is_stock: 1,
        note: "",
        checked_items: [],
        if_declare: 0,
        prod_id: ""
      },
      addContract: {
        pay_way:'',
        accept_mode: "",
        supplier_id: "",
        supplier_name: "",
        real_supplier_id:"",
        real_supplier_name: "",
        supplier_contact: "",
        supplier_mobile: "",
        supplier_fax: "",
        corp_id: '',
        corp_name: "",
        corp_contact: "",
        corp_mobile: "025-66061693",
        corp_fax: "025-57626690",
        detail: [],
        contract_number: "",
        contract_date: "",
        signed_address: "",
        purchase_user_id: "",
        sale_id: "",
        customer_po: "",
        settle_type:'',
        total_money: "",
        currency_id: "",
        package_standard: "",
        reasonable_loss: "",
        transportation: "",
        quality_standard: "",
        expdate: "",
        if_invoice: "",
        note: "",
        if_echapter: 1,
        name:'',
        mobile:'',
        province:'',
        city:'',
        district:'',
        address:''
      },
      corp_List: [],
      units: [],
      currency: [],
      InvoiceInfo: [],
        test_item: [],
      is_stock_info: [],
      product_file_info: [],
      if_declare_info: [],
      purchaseList: [],
      salesList: [],
      contacts:[],
      special_suppliers:[],
      special2_suppliers:[],
      settle_list: [],
      supply_list: [],
      real_supply_list:[],
      additional_type: [],
      transportation: [],
      brand_list: [],
      ContractNumberPrefix:[],
      PurchaseSettlementMethod:[],
      batch_list:[1,2,3],
      enums:{},
      addForm:{
          prefix:'',
          postfix:''
      },
      orderNo:'',
      user_name:'',
      request_order:false,
      special_name:false,
      invoice_disabled:false,
      save_loading:false,
      is_danger_inland:'',
    };
  },
  created() {
    this.user_name=util.cookies.get('user_name')
    this.fetchData_a();
    
  },
  methods: {
      ...mapActions("d2admin/page", ["closeAdd"]),
    change_ChemicalAppearance(){
        this.list.chemical_appearance=this.GEnums.ChemicalAppearance[this.list.chemical_appearance_id].name
    },
    onSelected(data){
      this.addContract.province = data.province.value
      this.addContract.city = data.city.value
      this.addContract.district = data.area.value
    },
    fromConsign_change(a){
      this.list.value = ''
      // if(!this.addContract.supplier_name&&a==1){
      //   this.list.is_from_consign = 0
      //   this.$message.error('请先选择甲方')
      // }
    },
    change_need_check(check_need){
        if(check_need==2){
          this.list.checked_items.forEach((items, index) => {
               items.checked=false;
                items.child.forEach((m, n) => {
                    m.checked = false;
                });
          });
        }
    },
    change_invoice(invoice_id){
          // if(invoice_id==1||invoice_id==4){
          //     this.addContract.settle_type='款到发货，甲方提供增值税专用发票；'
          // }else if(invoice_id==3||invoice_id==5){
          //     this.addContract.settle_type='款到发货，甲方提供普通发票；'
          // }else if(invoice_id==2){
          //     this.addContract.settle_type='款到发货'
          // }
    },
    change_invoice_type(type){
        if(type=='不含税'){
            for(let key in this.InvoiceInfo){
                 if(this.InvoiceInfo[key].name!='不含税'){
                     this.InvoiceInfo[key].disabled=true
                 }else{
                     this.InvoiceInfo[key].disabled=false
                 }
            }
            this.list.invoice_type_id=2
            this.addContract.settle_type='款到发货'
        }else if(type=='增值税专用发票'){
            for(let key in this.InvoiceInfo){
                if(this.InvoiceInfo[key].name!='13%增票'&&this.InvoiceInfo[key].name!='6%增票'){
                    this.InvoiceInfo[key].disabled=true
                }else{
                    this.InvoiceInfo[key].disabled=false
                }
            }
            this.list.invoice_type_id=1
            this.addContract.settle_type='款到发货，甲方提供增值税专用发票；'
        }else if(type=='增值税普通发票'||type=='增值税电子专用发票'||type=='增值税电子普通发票'||type=='机打发票'){
            for(let key in this.InvoiceInfo){
                if(this.InvoiceInfo[key].name!='普票'&&this.InvoiceInfo[key].name!='增值税普票'){
                    this.InvoiceInfo[key].disabled=true
                }else{
                    this.InvoiceInfo[key].disabled=false
                }
            }
            this.list.invoice_type_id=3
            this.addContract.settle_type='款到发货，甲方提供普通发票；'
        }
    },
    select_prefix(){
        let obj=this.addForm.prefix+this.addForm.postfix
        this.addContract.contract_number=obj
        this.list.contract_number=obj
    },
    select_postfix(){
        let obj=this.addForm.prefix+this.addForm.postfix
        this.addContract.contract_number=obj
        this.list.contract_number=obj
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
    request_orderNo(){
          let that=this
          if(that.orderNo.substring(0,2)=='CH'){
               $.ajax({
                      url: 'http://www.buysellchem.com/api/dataout/getPurchaseOrderByNo?orderNo='+this.orderNo,
                      method:'get',
                      success: function (response) {
                          if(response.code==0){
                              that.request_order=true
                              that.addContract.real_supplier_name=''
                              that.addContract.real_supplier_id=''
                              that.addContract.supplier_name=response.data.supplier_name
                              if(that.special_suppliers.includes(that.addContract.supplier_name)){
                                  that.addContract.corp_id=100000
                                  that.addContract.corp_name='江苏艾康生物医药研发有限公司'
                              }else{
                                  that.addContract.corp_id=1002569
                                  that.addContract.corp_name='江苏艾康商贸有限公司'
                              }
                              if(that.special2_suppliers.includes(that.addContract.supplier_name)){
                                  that.addContract.corp_id=1002569
                                  that.addContract.corp_name='江苏艾康商贸有限公司'
                              }
                              that.supplyMethod(response.data.supplier_name,response.dataOrigin)
                              that.list.sku_no = response.data.sku_no?response.data.sku_no:''
                              that.list.cas=response.data.cas
                              that.remoteCas(response.data.cas)
                              that.list.package=response.data.pack
                              that.list.purity=response.data.purity
                              that.list.currency_id=2
                              // if(response.data.packunit.toLocaleLowerCase()=='mg'){
                              //     response.data.packunit='g'
                              //     response.data.quantity= new Big(response.data.quantity).div(1000)
                              // }
                              that.units.forEach((items,index)=>{
                                  if(items.name==response.data.packunit.toLocaleLowerCase()){
                                      that.list.quantity_unit=items.id
                                  }
                              })
                              console.log(that.list.quantity_unit)
                              that.list.quantity=response.data.quantity
                              that.list.total_price=response.data.place_shifu
                              that.list.if_need_check=2
                              that.totalMoney()
                              that.list.price=(new Big(that.list.total_price).div(that.list.quantity)).toFixed(2)
                              console.log(that.InvoiceInfo)
                              console.log(response.data.invoice)
                              for(let key in that.InvoiceInfo){
                                  if(that.InvoiceInfo[key].name===response.data.invoice){
                                      if(that.InvoiceInfo[key].name=='13%增票'||that.InvoiceInfo[key].name=='6%增票'){
                                         that.list.invoice_type='增值税专用发票'
                                          that.list.invoice_type_id=1
                                          that.addContract.settle_type='款到发货，甲方提供增值税专用发票；'
                                      }else if(that.InvoiceInfo[key].name=='不含税'){
                                          that.list.invoice_type='不含税'
                                          that.list.invoice_type_id=2
                                          that.addContract.settle_type='款到发货'
                                      }else if(that.InvoiceInfo[key].name=='普票'){
                                          that.list.invoice_type='增值税普通发票'
                                          that.list.invoice_type_id=3
                                          that.addContract.settle_type='款到发货，甲方提供普通发票；'
                                      }
                                      // that.list.invoice_type_id=that.InvoiceInfo[key].id
                                  }
                              }
                              that.list.contract_number=response.data.orderNo
                              that.addForm.prefix=response.data.orderNoPre
                              that.addForm.postfix=response.data.orderNoNum
                              that.addContract.contract_number=response.data.orderNo
                              that.addContract.corp_contact=response.dataOrigin.purchase_user
                              that.purchaseList.forEach((items,index)=>{
                                  if(items.name==response.dataOrigin.purchase_user){
                                      that.addContract.purchase_user_id=items.id
                                  }
                              })
                              // that.addContract.purchase_user_id=181
                              that.addContract.customer_po=response.data.customerpo
                              that.addContract.transportation=response.dataOrigin.shipping_contact+' '+ response.dataOrigin.shipping_mobile+' '+response.dataOrigin.shipping_address

                          }else{
                              alert('输入的编号有误或查询不到订单信息，请核实！');
                          }
                      },
                      error:function () {
                          alert('输入的编号有误或查询不到订单信息，请核实！');
                      },
                      
                  });   
          }else{
            $.ajax({
                      url: 'http://api.aikonchem.cn:17689/api/dataout/getOrderByNo?orderNo='+this.orderNo,
                      method:'get',
                      success: function (response) {
                          if(response.code==0){
                              that.request_order=true
                              that.addContract.real_supplier_id=''
                              that.addContract.real_supplier_name=''
                              that.addContract.supplier_name=response.data.supplier_name
                              if(that.special_suppliers.includes(that.addContract.supplier_name)){
                                  that.addContract.corp_id=100000
                                  that.addContract.corp_name='江苏艾康生物医药研发有限公司'
                              }else{
                                  that.addContract.corp_id=1002569
                                  that.addContract.corp_name='江苏艾康商贸有限公司'
                              }
                              if(that.special2_suppliers.includes(that.addContract.supplier_name)){
                                  that.addContract.corp_id=1002569
                                  that.addContract.corp_name='江苏艾康商贸有限公司'
                              }
                              that.supplyMethod(response.data.supplier_name,response.dataOrigin)
                              that.list.sku_no = response.data.sku_no?response.data.sku_no:''
                              that.list.cas=response.data.cas
                              that.remoteCas(response.data.cas)
                              that.list.package=response.data.pack
                              that.list.purity=response.data.purity
                              that.list.currency_id=2
                              // if(response.data.packunit.toLocaleLowerCase()=='mg'){
                              //     response.data.packunit='g'
                              //     response.data.quantity= new Big(response.data.quantity).div(1000)
                              // }

                              that.units.forEach((items,index)=>{
                                  console.log(items.name)
                                  if(items.name==response.data.packunit.toLocaleLowerCase()){
                                      that.list.quantity_unit=items.id
                                  }
                              })
                              that.list.quantity=response.data.quantity
                              that.list.total_price=response.data.place_shifu
                              that.list.if_need_check=2
                              that.totalMoney()
                              that.list.price=(new Big(that.list.total_price).div(that.list.quantity)).toFixed(2)
                              that.list.invoice_type='增值税专用发票'
                              that.list.invoice_type_id=1
                              that.list.contract_number=response.data.orderNo
                              that.addForm.prefix=response.data.orderNoPre
                              that.addForm.postfix=response.data.orderNoNum
                              that.addContract.contract_number=response.data.orderNo
                              that.addContract.purchase_user_id=62
                              that.addContract.customer_po=response.data.customerpo
                              that.addContract.transportation=response.dataOrigin.shipping_contact+' '+ response.dataOrigin.shipping_mobile+' '+response.dataOrigin.shipping_address
                               if(response.dataOrigin.prod_brand=='King Scientific'){
                                  that.list.delivery_date=futureDate(getDate(),15)
                                   that.list.is_stock=0
                               }else{
                                   that.list.delivery_date=''
                                   that.list.is_stock=1
                               }
                          }else{
                              alert('输入的编号有误或查询不到订单信息，请核实！');
                          }
                      },
                      error:function () {
                          alert('输入的编号有误或查询不到订单信息，请核实！');
                      },
                  });
                    }
                
              },
              fetchData_a() {
                  this.special_name=false
                  this.pay_apply_show=false
                  this.addContract.real_supplier_id=''
                  this.addContract.real_supplier_name=''
                listTotal("ProcurementContract/generateDirect").then(res => {
                    this.addForm.postfix=res.data.postfix_contract_number
                    this.ContractNumberPrefix=res.enum.ContractNumberPrefix
                    obj(this.units,res.enum.units)
                    // this.units=res.enum.units;
                    this.special_suppliers=res.enum.special_suppliers;
                    this.special2_suppliers=res.enum.special2_suppliers;
                    this.enums=res.enum;
                    this.currency=res.enum.Currency;
                    this.brand_list=res.enum.brands;
                    this.test_item = JSON.parse(JSON.stringify(res.enum.test_item));
                    this.list.checked_items = res.enum.test_item;
                    this.InvoiceInfo=res.enum.InvoiceInfo
                    for(var key in this.InvoiceInfo){
                        this.InvoiceInfo[key].disabled=false
                        if(this.InvoiceInfo[key].name!='13%增票'&&this.InvoiceInfo[key].name!='6%增票'){
                            this.InvoiceInfo[key].disabled=true
                        }
                    }
                    // for(let key in this.InvoiceInfo){
                    //     if(this.InvoiceInfo[key].name!='13%增票'&&this.InvoiceInfo[key].name!='6%增票'){
                    //         this.InvoiceInfo[key].disabled=true
                    //     }
                    // }
                    this.is_stock_info=res.enum.is_stock_info;
                    this.if_declare_info=res.enum.if_declare_info;
                    this.product_file_info=res.enum.product_file_info;
                    this.additional_type=res.enum.additional_cost_type;
                    // this.settle_list=res.enum.PurchaseSettlementMethod;
                    obj(this.PurchaseSettlementMethod,res.enum.PurchaseSettlementMethod)
                    this.PurchaseSettlementMethod.forEach((items,index)=>{
                        if(items.id==1){
                            this.addContract.settle_type = items.name
                        }
                    })
                  this.transportation = res.enum.transportation;
                  this.corp_List = res.enum.company;
                  this.addContract.corp_id=1002569
                  this.corpChange()
                  const user_name = util.cookies.get("user_name");
                  this.addContract.corp_contact = user_name
                  this.addContract.contract_date=init()
                  this.addContract.purchase_user_id = res.data.purchase_user_id;
                  this.addContract.signed_address = res.data.corporations.salercontract_signed_address
                  this.addContract.transportation = res.enum.transportation[0].val
                  if(res.data.supplier_id==39057&&res.enum.transportation[0].json_data){
                    this.addContract.province = res.enum.transportation[0].json_data.province
                    this.addContract.city = res.enum.transportation[0].json_data.city
                    this.addContract.district = res.enum.transportation[0].json_data.district
                    this.addContract.address = res.enum.transportation[0].json_data.address
                    this.addContract.name = res.enum.transportation[0].json_data.name
                    this.addContract.mobile = res.enum.transportation[0].json_data.mobile
                  }
                  this.addContract.quality_standard = res.data.corporations.s_quality_stardard
                  this.addContract.reasonable_loss = res.data.corporations.s_reasonable_loss
                  this.addContract.package_standard = res.data.corporations.s_package_stardard
                  this.addContract.accept_mode = res.data.corporations.s_accept_mode
                  this.addContract.expdate = res.enum.expdate?res.enum.expdate:''
                  if(this.$route.query.order_num&&this.$route.query.order_num!=''){
                          this.orderNo=this.$route.query.order_num
                          this.request_orderNo()
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
                pay_apply(){
                    let  that=this
                    const tagName = "procure-agreeNew";
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
                clear_supplier(){
                    this.addContract.supplier_id='';
                    this.addContract.real_supplier_id='';
                    this.addContract.supplier_contact=''
                    this.addContract.supplier_mobile=''
                    this.addContract.supplier_fax=''
                    this.addContract.pay_way=''
                    this.list.value = ''
                    this.list.is_from_consign = 0
                },
                clear_contact(){
                    this.addContract.supplier_mobile=''
                    this.addContract.supplier_fax=''
                },
                contactChange(item){
                    this.addContract.supplier_contact =item.name
                    this.contacts.forEach((items,index)=>{
                        if(items.name==this.addContract.supplier_contact){
                            this.addContract.supplier_mobile =items.phone?items.phone:items.mobile
                            this.addContract.supplier_fax=items.fax
                        }
                    })
                    if(this.special2_suppliers.includes(this.addContract.supplier_name)){
                        this.addContract.corp_id=1002569
                        this.addContract.corp_name='江苏艾康商贸有限公司'
                    }
                },
                querySearchAsync_contact(queryString, cb){
                    var restaurants = this.contacts;
                    cb(restaurants);
                },
                select(id,checked) {
                    if(checked){
                        this.list.checked_items.forEach((items, index) => {
                            items.child.forEach((m, n) => {
                                if (id == m.id) {
                                    this.$set(
                                        this.list.checked_items[index],
                                        "checked",
                                        true
                                    );
                                }
                            });
                        });
                    }else{
                        this.list.checked_items.forEach((items, index) => {
                            items.child.forEach((m, n) => {
                                if (id == m.id) {
                                    this.$set(
                                        this.list.checked_items[index],
                                        "checked",
                                        false
                                    );
                                }
                            });
                        });
                    }

                },
                select_parent() {
                    this.list.checked_items.forEach((items, index) => {
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
                clear(){
                    this.addContract.settle_type=''
                },
                handleSelect_corporation(item){
                    this.addContract.settle_type=item.name
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
              supplyMethod(query,req) {
                if (query !== "") {
                  this.supplyloading = true;
                  setTimeout(() => {
                    this.supplyloading = false;
                    listTotal("data/member_list?type=2&name=" + query).then(res => {
                      res.data.forEach((m,n)=>{
                          if(m.is_stop==2){
                              m.name=m.name+'(停用)'
                          }
                          if(m.supplier_status==2){
                              m.name=m.name+'(黑名单)'
                          }
                      })
                      this.supply_list = res.data;
                      if(this.request_order){
                          this.supplyChange(req)
                      }
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
                    this.real_supplyloading = false;
                    listTotal("data/member_list?type=2&name=" + query).then(res => {
                      this.real_supply_list = res.data;
                    });
                  }, 200);
                } else {
                  this.real_supply_list = [];
                }
              },
              remoteCas(query) {
                if (query !== "") {
                  this.loadCas = true;
                  // setTimeout(() => {
                    this.loadCas = false;
                    listTotal("es/cas/" + query).then(res => {
                      this.cas_list = res.data;
                        if(this.request_order){
                            this.casChange(query)
                        }
                    });
                  // }, 100);
                } else {
                  this.cas_list = [];
                }
              },
              real_supplyChange(){
                 this.addContract.real_supplier_id = this.real_supply_list.filter(item => {
                  return item.name == this.addContract.real_supplier_name;
                })[0]?this.real_supply_list.filter(item => {
                    return item.name == this.addContract.real_supplier_name;
                })[0].id:'';
              },
              supplyChange(req) {
                  if(this.special_suppliers.includes(this.addContract.supplier_name)){
                    if(this.addContract.supplier_name&&this.addContract.corp_name!='江苏艾康生物医药研发有限公司'){
                        this.$alert('由于甲方变动,乙方已由江苏艾康商贸有限公司转变为江苏艾康生物医药研发有限公司,请悉知！', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {}
                        });
                    }
                    this.addContract.corp_id=100000
                    this.addContract.corp_name='江苏艾康生物医药研发有限公司'
                  }else{
                      if(this.is_danger_inland==1){
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
                if(this.orderNo===''){
                    let country_code = this.supply_list.filter(item => {
                        return item.name == this.addContract.supplier_name;
                    })[0]?this.supply_list.filter(item => {
                        return item.name == this.addContract.supplier_name;
                    })[0].country_code: "";

                    if (country_code == "CHN") {
                        this.list.currency_id = 2;
                        this.list.invoice_type_id = 1;
                        this.change_invoice(1)
                    } else {
                        this.list.currency_id = 1;
                        this.list.invoice_type_id = 2;
                        this.change_invoice(2)
                    }
                }
                this.addContract.supplier_id = this.supply_list.filter(item => {
                  return item.name == this.addContract.supplier_name;
                })[0]?this.supply_list.filter(item => {
                    return item.name == this.addContract.supplier_name;
                })[0].id:'';
                if(this.addContract.supplier_id){
                    saler_contract_info(this.addContract.supplier_id).then(res=>{
                        this.contacts=res.data.info.contacts
                        this.addContract.pay_way = res.data.info.pay_way?res.data.info.pay_way:''
                        this.addContract.supplier_contact = res.data.info.contacts[0].name
                        this.addContract.supplier_mobile = res.data.info.contacts[0].mobile?res.data.info.contacts[0].mobile:res.data.info.contacts[0].phone
                        this.addContract.supplier_fax = res.data.info.contacts[0].fax
                    })
                    let flag=false
                    JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
                        if(items.id=='26'){
                            this.list.if_need_check=2
                            flag=true
                        }
                    })
                    if(!flag){
                        supplier_exemption_amount(this.addContract.supplier_id).then((res=>{
                            if(res.data.invoice_type){
                                if(this.orderNo==='') {
                                    this.list.invoice_type_id = res.data.invoice_type;
                                    this.change_invoice(this.list.invoice_type_id)
                                    for(var key in this.InvoiceInfo){
                                        if((this.InvoiceInfo[key].id!=res.data.invoice_type)&&(this.InvoiceInfo[key].id!=2)){
                                            this.InvoiceInfo[key].disabled=true
                                        }
                                    }
                                }
                            }else{
                                for(var key in this.InvoiceInfo){
                                    this.InvoiceInfo[key].disabled=false
                                }
                            }
                            if(Number(this.list.total_price)<=Number(res.data.amount)){
                                this.list.if_need_check=2
                            }else{
                                this.list.if_need_check=1
                            }
                        }))
                    }
                }
                if(this.addContract.supplier_id==39057){
                  if(req){
                    this.addContract.province = req.shipping_province
                    this.addContract.city = req.shipping_city
                    this.addContract.district = req.shipping_county
                    this.addContract.address = req.shipping_addr
                    this.addContract.name = req.shipping_contact
                    this.addContract.mobile = req.shipping_mobile
                  }else{
                    this.addContract.province = this.transportation[0].json_data.province
                    this.addContract.city = this.transportation[0].json_data.city
                    this.addContract.district = this.transportation[0].json_data.district
                    this.addContract.address = this.transportation[0].json_data.address
                    this.addContract.name = this.transportation[0].json_data.name
                    this.addContract.mobile = this.transportation[0].json_data.mobile
                  }
                }
              },
              clear_real_supply(){
                this.addContract.real_supplier_id=''
              },
              casChange(a) {
                this.is_danger_inland=this.cas_list.filter(item => {return item.cas == a;})[0].is_danger_inland;
                if(this.special_suppliers.includes(this.addContract.supplier_name)){
                    this.addContract.corp_id=100000
                    this.addContract.corp_name='江苏艾康生物医药研发有限公司'
                }else{
                    if(this.is_danger_inland==1){
                        if(this.addContract.supplier_name&&this.addContract.corp_name!='江苏艾康生物医药研发有限公司'){
                            this.$alert('由于此合同存在危险品,乙方已由江苏艾康商贸有限公司转变为江苏艾康生物医药研发有限公司,请悉知！', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            });
                        }
                        this.addContract.corp_id=100000
                        this.addContract.corp_name='江苏艾康生物医药研发有限公司'
                    }else{
                        if(this.addContract.supplier_name&&this.addContract.corp_name!='江苏艾康商贸有限公司'){
                            this.$alert('由于此合同已不存在危险品,乙方已由江苏艾康生物医药研发有限公司转变为江苏艾康商贸有限公司,请悉知！', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {}
                            });
                        }
                        this.addContract.corp_id=1002569
                        this.addContract.corp_name='江苏艾康商贸有限公司'
                    }
                }
                this.list.name_cn = this.cas_list.filter(item => {
                  return item.cas == a;
                })[0].name_cn;
                this.list.name = this.cas_list.filter(item => {
                  return item.cas == a;
                })[0].name;
                this.list.prod_id = this.cas_list.filter(item => {
                  return item.cas == a;
                })[0].prod_id;
                  if(this.cas_list.filter(item => {return item.cas == a;})[0].storage_cond_id) {
                      this.list.storagecondition=this.GEnums.StorageCondition[this.cas_list.filter(item => {return item.cas == a;})[0].storage_cond_id].name;
                  }
                  if(this.cas_list.filter(item => {return item.cas == a;})[0].inland_trancond_id){
                      this.list.trancondition=this.GEnums.Trancondition[this.cas_list.filter(item => {return item.cas == a;})[0].inland_trancond_id].name;
                  }
                  // this.danger=this.GEnums.StorageCondition[this.cas_list.filter(item => {return item.cas == a;})[0].storage_cond_id].name;
              },
              totalMoney() {
                if(this.list.total_price){
                    this.list.price = (new Big(this.list.total_price).div(this.list.quantity)).toFixed(4);
                    this.addContract.total_money =(new Big(this.list.total_price).plus(this.list.additional_cost)).toFixed(2);
                }
                if(this.addContract.supplier_id&&!this.request_order){
                    let flag=false
                    JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
                        if(items.id=='26'){
                            this.list.if_need_check=2
                            flag=true
                        }
                    })
                    if(!flag){
                        supplier_exemption_amount(this.addContract.supplier_id).then((res=>{
                            if(res.data.invoice_type){
                                this.list.invoice_type_id=res.data.invoice_type
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
                            if(Number(this.list.total_price)<=Number(res.data.amount)){
                                this.list.if_need_check=2
                            }else{
                                this.list.if_need_check=1
                            }
                        }))
                    }
                }
              },
              priceMoney() {
                if(this.list.total_price){
                    this.list.price = (new Big(this.list.total_price).div(this.list.quantity)).toFixed(4);
                    this.addContract.total_money = (new Big(this.list.total_price).plus(this.list.additional_cost)).toFixed(2);
                }
              },
              hand_quoteinfo(item) {
                this.quoteinfo = true;
                this.quote_info = item;
              },
              save_quoteinfo() {
                this.quoteinfo = false;
              },
              close_quoteinfo() {
                this.quoteinfo = false;
              },
              hand_additional(a) {
                this.additional = true;
                if(this.list.additional.length==0){
                  var item = { additional_type_id: "", price: "" };
                this.list.additional.push(item);
                }
              },
              add_Additional() {
                var item = { additional_type_id: "", price: "" };
                this.list.additional.push(item);
              },
              cut_additional(a) {
                if (this.list.additional.length > 1) {
                  this.list.additional = this.list.additional.filter(item => {
                    return item != a;
                  });
                }
              },
              save_Additional() {
                this.list.additional_cost = 0;
                this.list.additional = this.list.additional.filter(res => {
                  return res.additional_type_id != "" && res.price != "";
                });
                this.list.additional.forEach(item => {
                  this.list.additional_cost =new Big(this.list.additional_cost).plus(item.price)
                });
                this.list.total_price
                  ? (this.addContract.total_money =
                      parseFloat(this.list.total_price) +
                      parseFloat(this.list.additional_cost))
                  : (this.addContract.total_money = parseFloat(this.list.additional_cost));
                this.additional = false;
              },
              close_Additional() {
                this.list.additional = this.list.additional.filter(res => {
                  return res.additional_type_id != "" && res.price != "";
                });
                this.additional = false;
                this.additional_list = [];
              },
              contractChange() {
                this.addContract.contract_number = this.list.contract_number;
              },
              corpChange(){
                
                  var corp = this.corp_List.filter(i=>{return this.addContract.corp_id == i.id})[0]
                  this.addContract.corp_name = corp.name

              },
              saveAdd() {
                if(!this.list.prod_id){
                    this.$message({
                        message:'产品ID不能为空！',
                        type: 'error'
                    });
                    return false;
                }
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
                if(this.addContract.real_supplier_id==''){
                    this.addContract.real_supplier_id=this.addContract.supplier_id;
                    this.addContract.real_supplier_name=this.addContract.supplier_name;
                }
                this.addContract.contract_number = this.addForm.prefix+this.addForm.postfix;
                this.list.notice_id = this.list.inquiry_id;
                this.list.purchase_user_id = this.addContract.purchase_user_id;
                this.list.supplier_id = this.addContract.supplier_id;
                this.list.supplier_name = this.addContract.supplier_name;
                this.addContract.currency_id = this.list.currency_id;
                this.addContract.detail[0] = this.list;
                this.addContract.detail[0] = JSON.parse(
                  JSON.stringify(this.addContract.detail[0]).replace(
                    /contract_number/g,
                    "procurement_contract_number"
                  )
                );
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
function createMethod(datas, type, method_type, that) {
  that.save_loading=true;
  let data = JSON.parse(JSON.stringify(datas));
  request({
    url: "api/v1/" + type + "/" + method_type,
    method: "post",
    data
  })
    .then(res => {
      if (res && res.code == 0) {
        that.save_loading=false;
        that.$message({
          message: "success",
          type: "success"
        });
        that.id=res.data.id
        that.pay_apply_show=true
        that.list.contract_status = 1;
        // create(that.list, "ProcurementContract/Notice", "create", that);
        // const tagName = "procure-agreeNew";
        // that.closeAdd({ tagName });
        // that.$router.push({
        //   path: "/contract/index.vue",
        //   name: "procure-contract"
        // });
        } else {
        that.$message({
          message: res.msg,
          type: "error"
        });
      }
    })
    .catch(rr => {
        that.save_loading=false;
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











