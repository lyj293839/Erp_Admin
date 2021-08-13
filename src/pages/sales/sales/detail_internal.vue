<style lang="scss" scoped type="text/scss">
.bold {
  font-weight: bold;
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.grey {
  color: grey;
}

.l_h {
  line-height: 1.5;
}

.l_h80 {
  line-height: 80px;
}

.el-pagination {
  text-align: right;
  margin: 10px;
}

.d2-text-center {
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.border-right {
  border-right: 1px solid #f2f2f2;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 0;
  display: flex;
  /*justify-content: center;*/
  flex-wrap: wrap;
  padding: 0;
}

.options {
  justify-content: center;
}

.options div {
  width: 33%;
  text-align: center;
}

.item1 {
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  /*width: 400px;*/
  width: 31%;
  margin: 10px 0;
  box-sizing: border-box;
}

.el-main {
  padding: 0;
}

.el-card__body {
  padding: 10px;
}

.basis {
  padding: 10px;
}

.basis .el-card__header {
  background-color: rgba(250, 250, 250, 1);
}

.logo {
  width: 100px;
  height: 100px;
  background-color: rgba(246, 246, 246, 1);
}

.logo i {
  font-size: 30px;
  margin: 45px;
}

p {
  margin: 5px 0;
}

.customWidth {
  width: 70%;
}

.level {
  width: 40px;
  height: 30px;
  line-height: 30px;
  margin: 0 15px;
  background-color: yellow;
  text-align: center;
  box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.1);
}

.check {
  width: 30px;
  height: 30px;
  margin: 5px 20px;
}

.level span {
  display: inline-block !important;
  width: 100% !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.logo i {
  margin: 20px;
}

.div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  margin: 0px auto;
  border: 1px solid #e5e5e5;
  .form_title {
    background: #f1f1f1;
    margin-bottom: 0px;
    .el-button {
      color: black;
    }
  }
}

.from-item {
  width: 100%;
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  /deep/.el-form-item__content{
    width: 100%;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    line-height: 25px;
    td{
      line-height: 30px;
       word-break: break-all;
       padding: 0px 2px;
    }
    /deep/.el-input__inner {
      border: none;
    }
  }
  .table_f{
    td{
      line-height: 25px;
      /deep/.el-input__inner{
        padding: 0px 5px;
      }
    }
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
/deep/.el-input.is-disabled .el-input__inner {
  background-color: #f9fcff;
}
.check_table {
  .el-checkbox {
    margin: 5px;
  }
  /deep/.el-checkbox__label {
    padding: 2px;
  }
  td {
    padding-left: 5px;
  }
}
.td_padd{
  padding: 0px;
  padding-left: 0px!important;
}
.el-radio{
  margin-right: 10px;
}
</style>
<template>
  <d2-container>
    <div class="div sales">
      <el-form label-width="0px">
        <div>
          <el-form-item class="form_title">
            <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale1')}}</b>
              <!-- 双方 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale2')}}</th>
                <!-- 合同双方 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale3')}}
                  <!-- 名称 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale4')}}
                  <!-- 联系人 -->
                </th>
                <th class="td">{{$t('sale.add.sale5')}}</th>
                <!-- 联系电话 -->
                <th class="td">{{$t('sale.add.sale6')}}</th>
                <!-- 传真 -->
              </tr>
              <tr>
                <td>{{$t('sale.add.sale7')}}</td>
                <!-- 甲方 -->
                <td>
                  <span style="color:red;width:3%">*</span>
                  <span v-if="showCustomer_sale(department_id,department_id_index,sale.sale_id)">
                    {{sale.customer_name}}
                    <span style="margin-left:5px;color:red;" v-if="sale.customer_name2&&(sale.customer_name2!=sale.customer_name)">{{'('+sale.customer_name2+')'}}</span>
                  </span>
                  <span v-else>********</span>
                  
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <span>{{sale.customer_contact}}</span>
                </td>
                <td>
                  <span>{{sale.customer_mobile}}</span>
                </td>
                <td>
                  <span>{{sale.customer_fax}}</span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale8')}}</td>
                <!-- 乙方 -->
                <td>
                  <span style="color:red;width:3%">*</span>
                  <span>{{sale.corp_name}}</span>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <span>{{sale.corp_contact}}</span>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <span>{{sale.corp_mobile}}</span>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <span>{{sale.corp_fax}}</span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale9')}}</b>
              <!-- 需求 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.detail" :key="index">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width='100'>{{$t('sale.add.sale84')}}</th>
                <!-- 询单号 -->
                <th class="td" width='170' colspan="2">{{$t('sale.add.sale14')}}</th>
                <!-- 预占批号 -->
                <th class="td">
                  <span style="color:red;">*</span>CAS
                </th>
                <th class="td" width="260">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale15')}}
                  <!-- 产品名称 -->
                </th>
                <th class="td" width='80'>{{$t('sale.add.sale16')}}</th>
                <!-- 规格 -->
                <th class="td" width='60'>{{$t('sale.add.sale17')}}</th>
                <!-- 纯度 -->
                <th class="td" width='80'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale18')}}
                  <!-- 数量 -->
                </th>
                <th class="td" width='60'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale19')}}
                  <!-- 数量单位 -->
                </th>
                <th class="td" width='60'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale20')}}
                  <!-- 币种 -->
                </th>
                <th class="td" width='80'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale21')}}
                  <!-- 单价 -->
                </th>
                <th class="td" width='80'>{{$t('sale.add.sale22')}}</th>
                <!-- 金额 -->
                <th class="td" width="120">{{$t('sale.add.sale23')}}</th>
                <!-- 提交货时间 -->
              </tr>
              <tr>
                <td>
                  {{item.inquiry_id}}
                </td>
                <td colspan="2">
                  {{item.batchno}}
                </td>
                <td>
                  {{item.cas}}
                </td>
                <td>
                  {{item.product_name_cn}}
                </td>

                <td>
                  {{item.package}}
                </td>
                <td>
                  {{item.purity}}
                </td>
                <td>
                  {{item.quantity}}
                </td>
                <td>
                  <span v-if="!item.is_old">{{getEnumValue(units,item.quantity_unit)}}</span>
                  <span v-else>{{item.quantity_unit_str}}</span>
                </td>
                <td>
                  {{getEnumValue(currencys,item.currency_id)}}
                </td>
                <td>
                  {{item.price}}
                </td>
                <td>
                  <!-- <el-input
                    :value="item.quantity*item.price>0?item.quantity*item.price:''"
                    disabled
                  ></el-input> -->
                  {{(Number(item.total_money) - Number(item.additional_cost)).toFixed(2)}}
                </td>
                <td class="dateInput">
                  <!-- <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.leadtime"
                    value-format="yyyy-MM-dd"
                    size="small"
                    disabled
                  ></el-date-picker> -->
                  {{item.leadtime}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale276')}}</td>
                <td>{{item.contract_number}}</td>
                <td>{{$t('sale.add.sale24')}}</td>
                <!-- 产品编码 -->
                <td>
                  {{item.prod_no}}
                </td>
                <td>
                  {{item.product_name}}
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale25')}}
                  <!-- 发票类型 -->
                </td>
                <td>
                  <span v-if="!item.is_old">{{getEnumValue(invoice_type,item.invoice_type_id)}}</span>
                  <span v-else>{{getEnumValue(invoice_type,item.invoice_type_str)}}</span>
                </td>
                <td>{{$t('sale.add.sale26')}}</td>
                <!-- 额外费用 -->
                <td>{{item.additional_cost}}</td>
                <td>{{$t('sale.add.sale124')}}</td>
                <td colspan="3">{{item.commission}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale27')}}</td>
                <!-- 分析要求 -->
                <td colspan="12">
                  <span
                    v-for="i in item.test_item"
                    :key="i.id"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-if="i.checked" disabled v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span>
                  <br>
                  <div v-for="i in item.test_item" :key="i.id" v-if="i.child.length!=0&&i.checked" style="margin-right:10px;display: inline-block;width:40%;">
                      <span class="checked_items" style="font-weight: bold;">{{i.name}}</span>:
                      <el-checkbox
                        v-for="j in i.child"
                        :key="j.id"
                        v-if="j.checked"
                        :label="j.id"
                        v-model="j.checked"
                        @change="select(index,j,item.id)"
                        class="checkbox_nei"
                        disabled
                      >
                        <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                      </el-checkbox>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale31')}}</td>
                <!-- 包装要求  -->
                <td colspan="5">
                  <div v-for="(i,index_i) in item.claims">
                    {{i.claim_pack_number}}*{{i.claim_pack_size}}/{{getEnumValue(units,i.claim_unit_id)}}
                  </div>
                </td>
                <td colspan="2">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale29')}}
                  <!-- 是否报关 -->
                </td>
                <td colspan="2">
                  {{getEnumValue(if_declare_info,item.if_declare)}}
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale30')}}
                  <!-- 合同贸易 -->
                </td>
                <td colspan="2">
                  {{getEnumValue(trade_type,item.trade_type)}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale33')}}</td>
                <!-- 标签要求 -->
                <td colspan="5">
                  {{item.label_requirement}}
                </td>
                <td colspan="2">{{$t('sale.add.sale32')}}</td>
                <!-- 要求发货时间 -->
                <td colspan="5" class="dateInput">
                  <span v-if="!item.is_old">{{item.required_delivery_date}}</span>
                  <span v-else>{{item.required_delivery_date_str}}</span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td>
                <!-- 随货文件 -->
                <td colspan="5">
                  <span v-if="item.product_file&&item.product_file.length>0">
                    <span v-for="i in item.product_file" style="margin: 0px 10px;">
                      {{getEnumValue(product_file_info,i)}}
                    </span>
                  </span>
                </td>
                <td colspan="2">{{$t('sale.add.sale36')}}</td>
                <!-- 是否自动发货 -->
                <td colspan="5">
                  <span>{{item.if_auto_delivery==1?$t('sale.add.sale37'):$t('sale.add.sale38')}}</span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale39')}}</td>
                <!-- 是否代发 -->
                <td colspan="5">
                  <span>{{item.is_generation==1?$t('sale.add.sale40'):$t('sale.add.sale41')}}</span>
                </td>
                <td colspan="2">{{$t('sale.add.sale294')}}</td>
                <td colspan="5">
                  {{getEnumValue(inventory_auto_preempt_info,item.inventory_auto_preempt)}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale289')}}</td>
                <td colspan="5">
                  <span>{{item.is_straight_hair==1?$t('sale.add.sale40'):$t('sale.add.sale41')}}</span>
                </td>
                <td colspan="2">{{$t('sale.index.sale74')}}</td><!-- 结算日期 -->
                <td colspan="5">{{item.settled_month}}</td>
              </tr>
              <tr>
                <td>是否中转</td>
                <td colspan="11">
                  <el-radio-group v-model="item.is_transfer">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                  </el-radio-group>
                  <el-select
                    placeholder="选择仓库"
                    filterable
                    v-model="item.transfer_warehouse_id"
                    v-if="item.is_transfer==2"
                    style="width:200px;border-bottom:1px solid #dcdfe6;margin-left:50px;"
                    size="mini"
                  >
                    <el-option
                      v-for="item in GEnums.Warehouse"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale28')}}</td>
                <!-- 分析备注 -->
                <td colspan="12">
                  {{item.checked_requirement}}
                </td>
              </tr>
              <tr>
                <td >{{$t('sale.add.sale34')}}</td>
                <!-- 发货备注 -->
                <td colspan="12">
                  {{item.deliver_note}}
                </td>
              </tr>
              <tr>
                <td >{{$t('sale.add.sale278')}}</td>
                <td colspan="12">
                  {{item.straight_hair_note}}
                </td>
              </tr>
              <tr v-if="index==(sale.detail.length-1)">
                <td colspan="6"></td>
                <td colspan="2">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale42')}}
                  <!-- 总金额 -->
                </td>
                <td colspan="5">{{sale.total_money>0?sale.total_money:''}}</td>
              </tr>
              <tr>
                <td>预计收款时间</td>
                <td colspan="12">{{item.expected_pay_date}}</td>
              </tr>
              <tr>
                <td>预计收款备注</td>
                <td colspan="12">{{item.expected_pay_remark}}</td>
              </tr>
              <tr v-if="permission_names['sales_contract.settlement_remark']=='sales_contract.settlement_remark'">
                <td>{{$t('sale.add.sale293')}}</td>
                <!-- 结算备注 -->
                <td colspan="12">
                  <div style="display:flex;justify-content: space-between;align-items: center;">
                    <div>
                      <div v-for="i in item.settlement_remark">
                        <span style="margin-right:15px;">{{i.settlement_remark}}</span>
                        <span style="color:#409EFF;">{{i.created_at}}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale43')}}</b>
              <!-- 条款 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width="130px">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale44')}}
                  <!-- 合同号 -->
                </th>
                <th class="td">{{$t('sale.add.sale45')}}</th>
                <!-- 签约时间 -->
                <th class="td">{{$t('sale.add.sale46')}}</th>
                <!-- 签约地点 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale47')}}
                  <!-- 销售 -->
                </th>
                <th class="td" >
                 PO
                </th>
                <th style="min-width:300px">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale48')}}
                  <!-- 结算方式 -->
                </th>
              </tr>
              <tr>
                <td>
                  {{sale.contract_number}}
                </td>
                <td class="dateInput">
                  {{sale.contract_date}}
                </td>
                <td>
                  {{sale.contract_address}}
                </td>
                <td>
                  {{sale.sale.name}}
                </td>
                <td>
                  {{sale.customer_po}}
                </td>
                <td>
                  {{sale.settle_type}}
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale49')}}
                  <!-- 贸易方式 -->
                </td>
                <td>
                  {{getEnumValue(trade_mode,sale.trade_type_id)}}
                </td>
                <td><span style="color:red;">*</span>交货天数</td>
                <td>
                  <span>{{sale.delivery_days}}</span>
                </td>
                <td>{{$t('sale.add.sale99')}}</td>
                <!-- 是否含税 -->
                <td>
                  <span>{{sale.if_invoice==1?$t('sale.add.sale97'):$t('sale.add.sale98')}}</span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale90')}}</td>
                <td colspan="6">
                  {{sale.transportation}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale50')}}</td>
                <!-- 质量标准 -->
                <td colspan="6">
                  {{sale.quality_stardard}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale51')}}</td>
                <!-- 合理损耗 -->
                <td colspan="6">
                  {{sale.reasonable_loss}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale95')}}</td>
                <!-- 包装标准&运输方式 -->
                <td colspan="6">
                  {{sale.package_stardard}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale53')}}</td>
                <!-- 验收标准 -->
                <td colspan="6">
                  {{sale.accept_stardard}}
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale54')}}</td>
                <!-- 有效期开始 -->
                <td colspan="1" class="dateInput">
                  {{sale.expdate_start}}
                </td>
                <td>{{$t('sale.add.sale55')}}</td>
                <!-- 有效期结束 -->
                <td colspan="1" class="dateInput">
                  {{sale.expdate_end}}
                </td>
                <td>{{$t('sale.add.sale56')}}</td>
                <!-- 加电子章 -->
                <td>
                  <span>{{sale.if_echapter==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale59')}}</td>
                <!-- 备注 -->
                <td colspan="5">
                  {{sale.note}}
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <div style="display:flex;justify-content: space-between;">
              <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
                <b>{{$t('sale.add.sale60')}}</b>
                <!-- 运输物流 -->
              </el-button>
            </div>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th style="width: 300px;"><span style="color:red;">*</span>{{$t('sale.add.sale63')}}</th>
                <!-- 收货地址 -->
                <th style="width: 300px;">{{$t('sale.add.sale64')}}</th>
                <!-- 收票地址 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale65')}}
                  <!-- 发货方式 -->
                </th>
                <th class="td" style="width: 140px;">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale66')}}
                  <!-- 账号 -->
                </th>
                <th class="td">{{$t('sale.add.sale67')}}</th>
                <!-- 快递公司 -->
                <th class="td" width="250px">{{$t('sale.add.sale68')}}</th>
                <!-- 快递账号 -->
              </tr>
              <tr>
                <td>
                  {{getEnumValue(receive_goods_addresses,sale.delivery_address_id)}}
                </td>
                <td>
                  {{getEnumValue(receive_invoice_addresses,sale.invoice_address_id)}}
                </td>
                <td>
                  {{getEnumValue(delivery_type,sale.delivery_type_id)}}
                </td>
                <td>
                  {{getEnumValue(express_account_type,sale.express_account_type)}}
                </td>
                <td>
                  {{getEnumValue(express_company,sale.express_company_id)}}
                </td>
                <td>
                  {{sale.express_account}}
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <div style="display:flex;justify-content: space-between;background:#DBF1D9;">
              <el-button type="text" @click="form_show6 = !form_show6" icon="el-icon-arrow-down">
                <b>1.{{$t('sale.add.sale238')}}</b>
                <!-- 开票数据 -->
              </el-button>
            </div>
          </el-form-item>
          <el-form-item v-show="form_show6" class="from-item">
            <div v-if="invoice_notice_list.length>0" v-for="item in invoice_notice_list" style="margin-bottom:20px;">
              <table border="1" bordercolor="#E5E5E5" class="table_f">
                <tr style="background:#EAF2F7;">
                  <th width='80'>开票分类</th>
                  <th width="150">{{$t('sale.add.sale160')}}</th><!-- 申请时间 -->
                  <th width="100">{{$t('sale.add.sale25')}}</th><!-- 发票类型 -->
                  <th width="150">{{$t('sale.add.sale239')}}</th><!-- 开票金额 -->
                  <th>{{$t('sale.add.sale59')}}</th><!-- 备注 -->
                  <th width="100">{{$t('sale.add.sale105')}}</th><!-- 审核状态 -->
                  <th width="200">{{$t('sale.add.sale240')}}</th><!-- 开票状态 -->
                  <th width="200">{{$t('sale.add.sale181')}}</th><!-- 处理状态 -->
                  <th v-if="item.invoice_type==3" width="150">接受发票邮箱</th>
                </tr>
                <tr>
                  <td>
                    <span v-if="item.type==1" style="color:green;">{{getEnumValue(invoice_cate_info,item.type)}}</span>
                    <span v-else style="color:red;">{{getEnumValue(invoice_cate_info,item.type)}}</span>
                  </td>
                  <td>{{item.created_at}}</td>
                  <td>{{getEnumValue(invoicing_type,item.invoice_type)}}</td>
                  <td>{{item.total_money}}</td>
                  <td>{{item.remark}}</td>
                  <td>
                    <span
                      v-if="item.status==3"
                      style="color:red;"
                    >{{getEnumValue(invoice_status_info,item.status)}}</span>
                    <span v-else-if="item.status==2" style="color:green;">{{getEnumValue(invoice_status_info,item.status)}}</span>
                    <span v-else style="color:#E6A23C;">{{getEnumValue(invoice_status_info,item.status)}}</span>
                  </td>
                  <td>
                    <span v-if="item.invoice_status==2" style="color:green;">{{getEnumValue(invoicing_status_info,item.invoice_status)}}</span>
                    <span v-else-if="item.invoice_status==10" style="color:red;">{{getEnumValue(invoicing_status_info,item.invoice_status)}}</span>
                    <span v-else>{{getEnumValue(invoicing_status_info,item.invoice_status)}}</span>
                  </td>
                  <td>
                    <span :style="(item.deal_status==2)?'color:green;':'color:red;'">{{getEnumValue(deal_status_info,item.deal_status)}}</span>
                  </td>
                  <td v-if="item.invoice_type==3">{{item.receive_invoice_email}}</td>
                </tr>
              </table>
              <table border="1" bordercolor="#E5E5E5" class="table_f" v-if="item.invoices&&item.invoices.length>0" v-for="item_a in item.invoices">
                <tr style="background:#F5F8FB;">
                  <td>{{$t('sale.add.sale242')}}</td><!-- 发票号码 -->
                  <td>{{$t('sale.add.sale243')}}</td><!-- 通知单ID -->
                  <td>{{$t('sale.add.sale174')}}</td><!-- 公司名称 -->
                  <td >{{$t('sale.add.sale25')}}</td><!-- 发票类型 -->
                  <td >{{$t('sale.add.sale244')}}</td><!-- 发票日期 -->
                  <td>{{$t('sale.add.sale175')}}</td><!-- 税号 -->
                  <td colspan="2">{{$t('sale.add.sale71')}}&{{$t('sale.add.sale73')}}</td><!-- 地址电话 -->
                  <td colspan="2">{{$t('sale.add.sale150')}}</td><!-- 银行账号 -->
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
                        v-for="(i,index) in invoicing_type"
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
                <tr v-if="item_a.invoice_details&&item_a.invoice_details.length>0">
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
        </div>
        <el-form-item
          class="from-item"
          style="text-align:center;"
        >
          <!-- 保存 -->
          <el-button @click="close()" size="mini">{{$t('back')}}</el-button>
          <!-- 取消 -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑地址 -->
    <!-- 账号 -->

    <!-- 预计收款 -->

    <!-- 结算备注 -->

  </d2-container>
</template>
<script>
import Big from "@/big/a/big.mjs";
import util from "@/libs/util";
import {
  saler_contract,
  saler_contract_info,
  sale_lists,
  cas_info,
  saler_contract_detail_nb,
  settlement_remark,
} from "@/api/sale";
import $ from "jquery";
import { city_list, country_list } from "@/api/user";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-detail_internal",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      corporation:[],
      corp: [],
      department_id:'',
      department_id_index:'',
      addresses: true,
      invoice_notice_list:[],
      delivery: true,
      country: [],
      express_company: [],
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show6: false,
      sale: {
        customer_id: "",
        customer_name: "",
        customer_contact: "",
        customer_mobile: "",
        customer_fax: "",
        corp_id: "",
        corp_name: "",
        corp_contact: "",
        corp_mobile: "",
        corp_fax: "",
        currency_id: "",
        detail: [
          {
            inquiry_id: "",
            cas: "",
            batchno: "",
            product_name: "",
            product_name_cn: "",
            package: "",
            purity: "",
            quantity: "",
            quantity_unit: "",
            currency_id: "",
            price: "",
            leadtime: "",
            prod_no: "",
            prod_id: "",
            invoice_type_id: "",
            additional: [
              {
                additional_type_id: "",
                price: ""
              }
            ],
            additional_cost: "",
            checked_items: [],
            checked_requirement: "",
            package_requirement: "",
            deliver_note: "",
            label_requirement: "",
            file_requirement: "",
            product_file: [],
            if_declare: "",
            required_delivery_date: "",
            if_auto_delivery: 0,
            is_generation: 0
          }
        ],
        contract_number: "",
        contract_date: "",
        contract_address: "",
        customer_po: "",
        sale_id: "",
        expdate_start: "",
        expdate_end: "",
        if_invoice: 0,
        transportation: "",
        quality_stardard: "",
        reasonable_loss: "",
        package_stardard: '1',
        accept_stardard: "",
        total_money: "",
        trade_type_id: "",
        delivery_days:3,
        payment_id: 0,
        receive_money_date: "",
        settle_type: "",
        if_echapter: 0,
        from_port: "",
        dest_port: "",
        delivery_address_id: "",
        invoice_address_id: "",
        delivery_type_id: "",
        express_account_type: "",
        express_company_id: "",
        express_account: ""
      },
      sale_list: [],
      Users:[],
      invoicing_type:[],
      index: "",
      currencys: [],
      delivery_type: [],
      express_account_type: [],
      express_company_: [],
      if_declare_info: [],
      invoice_type: [],
      test_item: [],
      trade_mode: [],
      units: [],
      status_info:[],
      product_file_info: [],
      checked: false,
      receive_invoice_addresses: [],
      receive_goods_addresses: [],
      account: [],
      deal_status_info:[],
      statuses:[],
      invoice_status_info:[],
      invoicing_status_info:[],
      inventory_auto_preempt_info:[],
      invoice_cate_info:[],
      trade_type: [],
      Account:{},
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-detail_internal") {
        if (this.$route.query.id) {
        //   this.department_id_index = this.$route.query.department_id
          this.fetch_data();
        }
      }
    }
  },
  created() {
    this.department_id=util.cookies.get('department_id')
    if (this.$route.query.id) {
    //   this.department_id_index = this.$route.query.department_id
      this.fetch_data();
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    querySearchAsync_corporation(queryString, cb) {
        var restaurants = this.corporation;
        cb(restaurants);
    },
    fetch_data() {
      saler_contract_detail_nb(this.$route.query.id).then(res => {
        res.data.saler_contract.detail = res.data.saler_contract.details;
        this.invoice_notice_list = res.data.invoice_notice_list
        this.sale = res.data.saler_contract;
        this.department_id_index = res.data.saler_contract.sale.department_id
        this.sale.express_account_type = res.data.saler_contract.express_account_type;
        this.sale.express_company_id = res.data.saler_contract.express_company_id;
        this.sale.express_account = res.data.saler_contract.express_account;
        this.sale.transportation = res.data.saler_contract.remarks?res.data.saler_contract.remarks.transportation:"";
        this.sale.quality_stardard =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.quality_stardard:"";
        this.sale.reasonable_loss =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.reasonable_loss:"";
        this.sale.package_stardard =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.package_stardard:"";
        this.sale.accept_stardard =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.accept_stardard:'';
        this.sale.note =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.note:'';
        this.invoice_cate_info = res.enum.invoice_cate_info
        this.currencys = res.enum.currencys;
        this.delivery_type = res.enum.delivery_type;
        this.express_account_type = res.enum.express_account_type;
        this.if_declare_info = res.enum.if_declare_info;
        this.invoice_type = res.enum.invoice_type;
        this.test_item = res.enum.test_item;
        this.trade_mode = res.enum.trade_mode;
        this.product_file_info = res.enum.product_file_info;
        this.units = res.enum.units;
        this.receive_invoice_addresses = [];
        this.receive_goods_addresses = [];
        this.trade_type = res.enum.trade_type;
        this.status_info = res.enum.status_info;
        this.deal_status_info = res.enum.deal_status_info
        this.statuses = res.enum.statuses
        this.invoicing_type = res.enum.invoicing_type
        this.invoicing_status_info = res.enum.invoicing_status_info
        this.invoice_status_info = res.enum.invoice_status_info
        this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info
        saler_contract_info(res.data.saler_contract.customer_id).then(response => {
          this.corporation = response.data.customer_payment_days;
          response.data.info.receive_addresses.forEach((items, index) => {
            if (items.type == 1) {
              this.receive_invoice_addresses.push(items);
            } else {
              this.receive_goods_addresses.push(items);
            }
          });
          if (
            this.receive_goods_addresses.filter(i => {
              return i.id == res.data.saler_contract.delivery_address_id;
            }).length == 0
          ) {
            this.sale.delivery_address_id = "";
          }
          if (
            this.receive_invoice_addresses.filter(i => {
              return i.id == res.data.saler_contract.invoice_address_id;
            }).length == 0
          ) {
            this.sale.invoice_address_id = "";
          }
        });
        this.Users = this.GEnums.Users
        this.Account = this.GEnums.Account
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
    },
    querySearchAsync(queryString, cb) {
      if (queryString != "") {
        cas_info(queryString).then(res => {
          var restaurants = res.data;
          var results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        });
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.cas.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    close() {
        let  that=this
        that.$router.push({
        path: "/sales/index_internal",
        name: "sales-index_internal"
      });
      var tagName = 'sales-detail_internal'
        that.closeAdd({tagName})
    },
    toggle_both() {
      $(".both .el-card__body").toggle();
    },
    toggle_demand() {
      $(".demand .el-card__body").toggle();
    },
    toggle_item() {
      $(".item .el-card__body").toggle();
    },
    toggle_transport() {
      $(".transport .el-card__body").toggle();
    },
  }
};
</script>
