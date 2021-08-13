<style lang="scss" scoped type="text/scss">
.bold {
  font-weight: bold;
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
  table {
    border-collapse: collapse;
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
</style>
<style lang="scss" type="text/scss">
.el-tooltip span {
  display: inline-block !important;
  width: 100% !important;
}

.el-card__header {
  width: 100%;
}

.el-switch__label--left {
  position: relative;
  left: 46px;
  color: #fff;
  z-index: -1111;
}

.el-switch__label--right {
  position: relative;
  right: 46px;
  color: #fff;
  z-index: -1111;
}

.el-switch__label--right.is-active {
  z-index: 1111;
  color: #fff !important;
}

.el-switch__label--left.is-active {
  z-index: 1111;
  color: #9c9c9c !important;
}

.el-pagination {
  text-align: right;
}

/*.sales .el-checkbox + .el-checkbox {*/
/*margin-left: 0;*/
/*}*/

/*.sales .el-checkbox {*/
/*width: 120px;*/
/*}*/

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
  table {
    border-collapse: collapse;
  }
  .bj {
    width: 96%;
    .el-input__inner {
      padding: 0px;
    }
    .el-select {
      padding: 0px;
    }
  }
}

.sales td {
  min-width: 100px;
  text-align: left;
  overflow: auto;
  padding-left: 5px !important;
}

.sales .el-input__inner {
  border: none;
}
</style>
<template>
  <d2-container>
    <div class="div sales">
      <el-form label-width="0px">
        <div>
          <el-form-item class="form_title">
            <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale1')}}</b><!-- 双方 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale2')}}</th><!-- 合同双方 -->
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale3')}}<!-- 名称 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale4')}}<!-- 联系人 -->
                </th>
                <th class="td">{{$t('sale.add.sale5')}}</th><!-- 联系电话 -->
                <th class="td">{{$t('sale.add.sale6')}}</th><!-- 传真 -->
              </tr>
              <tr>
                <td>{{$t('sale.add.sale7')}}</td><!-- 甲方 -->
                <td>
                  <span style="color:red;width:3%">*</span>
                  {{sale.customer_name}}
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.customer_contact" class="bj"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.customer_mobile"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.customer_fax"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale8')}}</td><!-- 乙方 -->
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-select
                    v-if="!this.$route.query.id"
                    v-model="sale.corp_id"
                    @change="get_custcontact_crop_id(sale.corp_id)"
                    class="bj"
                    clearable
                    filterable
                  >
                    <el-option v-for="i in corp" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                  <el-input v-if="this.$route.query.id" v-model="sale.corp_name" class="bj"></el-input>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_contact" class="bj"></el-input>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_mobile" class="bj"></el-input>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_fax" class="bj"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale9')}}</b><!-- 需求 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.detail" :key="index">
            <el-dialog :title="$t('sale.add.sale10')" :visible.sync="dialogVisible" width="50%"><!-- 要求附加额外费用 -->
              <el-table :data="item.additional" border style="width: 100%">
                <el-table-column :label="$t('sale.add.sale11')" align="center" min-width="80"><!-- 费用名称 -->
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.additional_type_id"
                      clearable
                      filterable
                      size="mini"
                      style="width: 150px;margin: 0 10px;"
                    >
                      <el-option
                        v-for="(i,index) in additional_cost_type"
                        :key="index"
                        :label="i.name_cn"
                        :value="i.id"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sale.add.sale12')" align="center" min-width="80"><!-- 金额 -->
                  <template slot-scope="scope" class="d2-text-center">
                    <el-input
                      size="mini"
                      type="text"
                      class="input"
                      placeholder
                      v-model="scope.row.price"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sale.add.sale13')" width="100"><!-- 操作 -->
                  <template slot-scope="scope">
                    <el-button @click="delete_cost(scope.row)" type="primary" size="mini">-</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="add_cost" type="primary" size="mini">+</el-button>
                <el-button @click="dialogVisible = false">{{$t('sale.add.sale100')}}</el-button><!-- 取 消 -->
                <el-button type="primary" @click="hide_dialogVisible">{{$t('sale.add.sale101')}}</el-button><!-- 确 定 -->
              </span>
            </el-dialog>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale84')}}</th><!-- #询单号 -->
                <th class="td">{{$t('sale.add.sale14')}}</th><!-- 预占批号 -->
                <th class="td">
                  <span style="color:red;">*</span>Cas
                </th>
                <th class="td" width="400">
                  <span style="color:red;">*</span>{{$t('sale.add.sale15')}}<!-- 产品名称 -->
                </th>
                <th class="td">{{$t('sale.add.sale16')}}</th><!-- 规格 -->
                <th class="td">{{$t('sale.add.sale17')}}</th><!-- 纯度 -->
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale18')}}<!-- 数量 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale19')}}<!-- 数量单位 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale20')}}<!-- 币种 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale21')}}<!-- 单价 -->
                </th>
                <th class="td">{{$t('sale.add.sale22')}}</th><!-- 金额 -->
                <th class="td" width="200">{{$t('sale.add.sale23')}}</th><!-- 提交货时间 -->
                <th></th>
              </tr>
              <tr>
                <td>
                  <el-input v-model="item.inquiry_id" disabled></el-input>
                </td>
                <td>
                  <el-input v-model="item.batchno" disabled></el-input>
                </td>
                <td>
                  <el-autocomplete
                    v-model="item.cas"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                  >
                    <template slot-scope="{ item }">
                      <div @click="get_index(index)">{{ item.cas }}</div>
                    </template>
                  </el-autocomplete>
                </td>
                <td>
                  <el-input v-model="item.product_name_cn"></el-input>
                </td>

                <td>
                  <el-input v-model="item.package"></el-input>
                </td>
                <td>
                  <el-input v-model="item.purity"></el-input>
                </td>
                <td>
                  <el-input v-model="item.quantity" @input="change_quantity(index)"></el-input>
                </td>
                <td>
                  <el-select v-model="item.quantity_unit" clearable filterable >
                    <el-option v-for="i in units" :key="i.id"  :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="item.currency_id" clearable filterable>
                    <el-option v-for="i in currencys" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.price" @input="change_price(index)"></el-input>
                </td>
                <td>{{(Number(item.total_money) - Number(item.additional_cost))}}</td>
                <td class="dateInput">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.leadtime"
                    value-format="yyyy-MM-dd"
                    size="small"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale24')}}</td><!-- 产品编码 -->
                <td>
                  <el-input v-model="item.prod_no"></el-input>
                </td>
                <td>
                  <el-input v-model="item.product_name" placeholder="english product name"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>{{$t('sale.add.sale25')}}<!-- 发票类型 -->
                </td>
                <td>
                  <el-select
                    v-model="item.invoice_type_id"
                    clearable
                    filterable
                    style="width: 140px;"
                  >
                    <el-option v-for="i in invoice_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-button type="primary" size="mini" @click="show_dialog(index)">{{$t('sale.add.sale26')}}</el-button><!-- 附加费用 -->
                </td>
                <td>{{item.additional_cost}}</td>
                <td>佣金</td>
                <td>{{item.commission}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale27')}}</td><!-- 分析要求 -->
                <td colspan="11" class="checkbox">
                  <span
                    v-for="i in item.test_item"
                    :key="i.id"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span>
                  <div v-else>
                    <el-card
                      v-for="i in item.test_item"
                      :key="i.id"
                      v-if="i.child.length>0"
                      :label="i.id"
                      style=""
                    >
                      <el-checkbox v-model="i.checked" @change="select_parent(index,i)" name="type">
                        <div class="checked_items">{{i.name}}</div>
                      </el-checkbox>
                      <div>
                        <el-checkbox
                          v-for="j in i.child"
                          :key="j.id"
                          :label="j.id"
                          v-model="j.checked"
                          @change="select(index,j,item.id)"
                        >{{j.name}}</el-checkbox>
                      </div>
                    </el-card>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale28')}}</td><!-- 其他要求 -->
                <td colspan="5">
                  <el-input v-model="item.checked_requirement"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>{{$t('sale.add.sale29')}}<!-- 是否报关 -->
                </td>
                <td>
                  <el-select v-model="item.if_declare">
                    <el-option
                      v-for="i in if_declare_info"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;">*</span>{{$t('sale.add.sale30')}}<!-- 合同贸易 -->
                </td>
                <td>
                  <el-select v-model="item.trade_type">
                    <el-option v-for="i in trade_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale31')}}</td><!-- 包装要求 -->
                <td colspan="5">
                  <el-input
                    v-model="item.claim_pack_number"
                    style="width: 80px;border: 1px solid #f2f2f2;"
                  ></el-input>*
                  <el-input
                    v-model="item.claim_pack_size"
                    style="width: 80px;border: 1px solid #f2f2f2;"
                  ></el-input>/
                  <el-select
                    v-model="item.claim_unit_id"
                    style="width: 100px;border: 1px solid #f2f2f2;"
                  >
                    <el-option v-for="i in units" :key="i.id"  :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>{{$t('sale.add.sale32')}}</td><!-- 要求发货时间 -->
                <td colspan="5" class="dateInput">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.required_delivery_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale33')}}</td><!-- 标签要求 -->
                <td colspan="5">
                  <el-input v-model="item.label_requirement"></el-input>
                </td>
                <td>{{$t('sale.add.sale34')}}</td><!-- 发货备注 -->
                <td colspan="5">
                  <el-input v-model="item.deliver_note"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td><!-- 随货文件 -->
                <td colspan="5">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{$t('sale.add.sale36')}}</td><!-- 是否自动发货 -->
                <td colspan="2">
                  <el-radio-group v-model="item.if_auto_delivery">
                    <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio><!-- 自动 -->
                    <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio><!-- 不自动 -->
                  </el-radio-group>
                </td>
                <td>{{$t('sale.add.sale39')}}</td><!-- 是否代发 -->
                <td colspan="2">
                  <el-radio-group v-model="item.is_generation">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio><!-- 是 -->
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio><!-- 否 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale278')}}</td>
                <td colspan="12">
                  <el-input v-model="item.straight_hair_note"></el-input>
                </td>
              </tr>
              <tr v-if="index==(sale.detail.length-1)">
                <td colspan="6"></td>
                <td>
                  <span style="color:red;">*</span>{{$t('sale.add.sale42')}}<!-- 总金额 -->
                </td>
                <td colspan="5">{{sale.total_money>0?sale.total_money:''}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale43')}}</b><!-- 条款 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale44')}}<!-- 合同号 -->
                </th>
                <th class="td">{{$t('sale.add.sale45')}}</th><!-- 签约时间 -->
                <th class="td">{{$t('sale.add.sale46')}}</th><!-- 签约地点 -->
                <th class="td">
                  <span style="color:red;">*</span>{{$t('sale.add.sale47')}}<!-- 销售 -->
                </th>
                <th class="td">
                  PO
                </th>
                <th style="min-width:400px">
                  <span style="color:red;">*</span>{{$t('sale.add.sale48')}}<!-- 结算方式 -->
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
                  <el-select v-model="sale.payment_id" clearable filterable style="width: 100%;">
                    <el-option
                      v-for="(i,index) in payment_type"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>{{$t('sale.add.sale49')}}<!-- 贸易方式 -->
                </td>
                <td>
                  <el-select v-model="sale.trade_type_id" clearable filterable>
                    <el-option
                      v-for="(i,index) in trade_mode"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>

                <td>{{$t('sale.add.sale99')}}</td><!-- 是否含税 -->
                <td>
                  <el-radio-group v-model="sale.if_invoice">
                    <el-radio :label="1">{{$t('sale.add.sale97')}}</el-radio><!-- 含税 -->
                    <el-radio :label="0">{{$t('sale.add.sale98')}}</el-radio><!-- 不含税 -->
                  </el-radio-group>
                </td>
                <td>{{$t('sale.add.sale96')}}</td><!-- 结算信息 -->
                <td>
                  <el-input v-model="sale.settle_type"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale50')}}</td><!-- 质量标准 -->
                <td colspan="6">
                  <el-input v-model="sale.quality_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale51')}}</td><!-- 合理损耗 -->
                <td colspan="6">
                  <el-input v-model="sale.reasonable_loss"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale95')}}</td><!-- 包装标准&运输方式 -->
                <td colspan="6">
                  <el-input v-model="sale.package_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale53')}}</td><!-- 验收标准 -->
                <td colspan="6">
                  <el-input v-model="sale.accept_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale54')}}</td><!-- 有效期开始 -->
                <td colspan="1" class="dateInput">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="sale.expdate_start"
                    type="date"
                    size="small"
                  ></el-date-picker>
                </td>
                <td>{{$t('sale.add.sale55')}}</td><!-- 有效期结束 -->
                <td colspan="1" class="dateInput">
                  <el-date-picker value-format="yyyy-MM-dd" v-model="sale.expdate_end" type="date" size="small"></el-date-picker>
                </td>
                <td>{{$t('sale.add.sale56')}}</td><!-- 加电子章 -->
                <td>
                  <el-radio-group v-model="sale.if_echapter">
                    <el-radio :label="1">{{$t('sale.add.sale57')}}</el-radio><!-- 是 -->
                    <el-radio :label="0">{{$t('sale.add.sale58')}}</el-radio><!-- 否 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale59')}}</td><!-- 备注 -->
                <td colspan="5">
                  <el-input v-model="sale.note"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale60')}}</b><!-- 运输物流 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale61')}}</th><!-- 起运港 -->
                <th class="td">{{$t('sale.add.sale62')}}</th><!-- 目的港 -->
                <th style="width: 300px;">{{$t('sale.add.sale63')}}</th><!-- 收货地址 -->
                <th style="width: 300px;">{{$t('sale.add.sale64')}}</th><!-- 收票地址 -->
                <th class="td">{{$t('sale.add.sale65')}}</th><!-- 发货方式 -->
                <th class="td">{{$t('sale.add.sale79')}}</th><!-- 账号 -->
                <th class="td">{{$t('sale.add.sale78')}}</th><!-- 快递公司 -->
                <th class="td">{{$t('sale.add.sale68')}}</th><!-- 快递账号 -->
              </tr>
              <tr>
                <td>
                  <el-input v-model="sale.from_port"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.dest_port"></el-input>
                </td>
                <td>
                  <el-select
                    v-model="sale.delivery_address_id"
                    clearable
                    filterable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(i,index) in receive_goods_addresses"
                      :key="index"
                      :label="i.address+'__'+i.contact_name+i.mobile"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    v-model="sale.invoice_address_id"
                    clearable
                    filterable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(i,index) in receive_invoice_addresses"
                      :key="index"
                      :label="i.address+'__'+i.contact_name+i.mobile"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="sale.delivery_type_id" clearable filterable >
                    <el-option
                      v-for="(i,index) in delivery_type"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    v-model="sale.express_account_type"
                    @change="select_express_account_type(sale.express_account_type)"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="(i,index) in express_account_type"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    v-model="sale.express_company_id"
                    @change="select_express_company(sale.express_company_id)"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="(i,index) in express_company"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>{{sale.express_account}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item
          v-if="save_show"
          class="from-item"
          style="justify-content: flex-end;margin:0px;"
        >
          <el-button type="primary" :loading="loading" @click="save()" size="mini">{{$t('save')}}</el-button><!-- 保存 -->
          <el-button @click="close()" size="mini">{{$t('cancel')}}</el-button><!-- 取消 -->
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
import Big from "@/big/a/big.mjs";
import {
  saler_contract,
  saler_contract_info,
  saler_create,
  customer_lists,
  contact_info,
  corp_lists,
  sale_lists,
  corp_info,
  cas_info,
  get_deliver_goods,
  saler_contract_detail,
  saler_contract_generate,
  saler_contract_verify
} from "@/api/sale";
import $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-alter",
  data() {
    return {
      corp: [],
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      detail_index: "",
      loading: false,
      dialogVisible: false,
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
        package_stardard: "",
        accept_stardard: "",
        total_money: "",
        trade_type_id: "",
        payment_id: "",
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
      index: "",
      customers: [],
      customers_crop: [],
      additional_cost_type: [],
      address_type_info: [],
      currencys: [],
      delivery_type: [],
      express_account_type: [],
      express_company: [],
      enum_express_company: [],
      if_declare_info: [],
      if_echapter_info: [],
      if_invoice_info: [],
      invoice_type: [],
      product_type: [],
      test_item: [],
      trade_mode: [],
      units: [],
      product_file_info: [],
      checked: false,
      payment_type: [],
      receive_invoice_addresses: [],
      receive_goods_addresses: [],
      get_deliver_goods: [],
      account: [],
      save_show: false,
      check_contract: {
        saler_contract_id: "",
        approval_comment: "",
        status: ""
      },
      trade_type: []
    };
  },
  created() {
    if (this.$route.query.id) {
      this.check_contract.saler_contract_id = this.$route.query.id;
      this.fetch_data();
    }
    if (this.$route.query.ids) {
      this.save_show = true;
      let obj = {
        ids: JSON.parse(this.$route.query.ids)
      };
      saler_contract_generate(obj).then(res => {
        (this.customers_crop = [
          {
            id: res.data.corp[0].id,
            name: res.data.corp[0].name
          }
        ]),
          saler_contract_info(res.data.customer.id).then(res => {
            res.data.info.receive_addresses.forEach((items, index) => {
              if (items.type == 1) {
                this.receive_invoice_addresses.push(items);
              } else {
                this.receive_goods_addresses.push(items);
              }
            });
          });
        this.corp = res.data.corp;
        this.sale = {
          customer_id: res.data.customer.id,
          customer_name: res.data.customer.name,
          customer_contact:
            res.data.customer.contacts.length > 0
              ? res.data.customer.contacts[0].name
              : "",
          customer_mobile: res.data.customer.contacts.length
            ? res.data.customer.contacts[0].mobile
            : "",
          customer_fax: res.data.customer.contacts.length
            ? res.data.customer.contacts[0].fax
            : "",
          corp_id: res.data.corp[0].id,
          corp_name: res.data.corp[0].name,
          corp_contact: res.data.corp[0].contacts.length
            ? res.data.corp[0].contacts[0].name
            : "",
          corp_mobile: res.data.corp[0].contacts.length
            ? res.data.corp[0].contacts[0].mobile
            : "",
          corp_fax: res.data.corp[0].contacts.length
            ? res.data.corp[0].contacts[0].fax
            : "",
          currency_id: "",
          contract_number: res.data.contract_number,
          contract_date: "",
          contract_address: res.data.corporation.signed_address,
          customer_po: "",
          sale_id: res.data.sale_id,
          expdate_start: res.data.corporation.contractdate,
          expdate_end: res.data.corporation.expdate,
          if_invoice: 0,
          transportation: res.data.corporation.transportation,
          detail: [],
          quality_stardard: res.data.corporation.quality_stardard,
          reasonable_loss: res.data.corporation.reasonable_loss,
          package_stardard: res.data.corporation.package_stardard,
          accept_stardard: res.data.corporation.accept_mode,
          total_money: "",
          trade_type_id: "",
          payment_id: "",
          receive_money_date: res.data.corporation.receiver_money_date,
          settle_type: res.data.corporation.settle_type,
          if_echapter: 0,
          from_port: "",
          dest_port: "",
          delivery_address_id: "",
          invoice_address_id: "",
          delivery_type_id: "",
          express_account_type: "",
          express_company_id: "",
          express_account: ""
        };
        res.data.inquirys.forEach((i, j) => {
          this.sale.detail.push({
            additional: [
              {
                additional_type_id: "",
                price: ""
              }
            ],
            additional_cost: 0,
            batchno: i.prebatch_no,
            inquiry_id: i.inquiry_confirm.inquiry_id,
            cas: i.cas,
            checked_items: [],
            prod_id: i.prod_id,
            leadtime: i.leadtime,
            product_file: [],
            product_name: i.name,
            product_name_cn: i.name_cn,
            package: i.inquiry_confirm.comfirm_pack,
            purity: i.inquiry_confirm.comfirm_purity,
            quantity: i.inquiry_confirm.comfirm_quantity,
            quantity_unit: Number(i.inquiry_confirm.comfirm_quantity_unit),
            currency_id: i.inquiry_confirm.comfirm_currency_id,
            price: i.inquiry_confirm.comfirm_price
          });
        });
        this.additional_cost_type = res.enum.additional_cost_type;
        this.address_type_info = res.enum.address_type_info;
        this.currencys = res.enum.currencys;
        this.delivery_type = res.enum.delivery_type;
        this.express_account_type = res.enum.express_account_type;
        this.enum_express_company = res.enum.express_company;
        this.if_declare_info = res.enum.if_declare_info;
        this.if_echapter_info = res.enum.if_echapter_info;
        this.if_invoice_info = res.enum.if_invoice_info;
        this.invoice_type = res.enum.invoice_type;
        this.test_item = res.enum.test_item;
        this.trade_mode = res.enum.trade_mode;
        this.product_file_info = res.enum.product_file_info;
        this.units = res.enum.units;
        this.product_type = res.enum.product_type;
        this.payment_type = res.enum.payment_type;
        this.trade_type = res.enum.trade_type;
        let money = 0;
        this.sale.detail.forEach((items, index) => {
          money = new Big(money).plus(
            new Big(items.quantity)
              .times(items.price)
              .plus(items.additional_cost)
          );
        });
        this.sale.total_money = Number(money);
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
    }
  },
  watch: {
    $route (to, from) {
        if(to.name=='sales-alter'){
          if (this.$route.query.id) {
            this.check_contract.saler_contract_id = this.$route.query.id;
            this.fetch_data();
          }
          if (this.$route.query.ids) {
            this.save_show = true;
            let obj = {
              ids: JSON.parse(this.$route.query.ids)
            };
            saler_contract_generate(obj).then(res => {
              (this.customers_crop = [
                {
                  id: res.data.corp[0].id,
                  name: res.data.corp[0].name
                }
              ]),
                saler_contract_info(res.data.customer.id).then(res => {
                  res.data.info.receive_addresses.forEach((items, index) => {
                    if (items.type == 1) {
                      this.receive_invoice_addresses.push(items);
                    } else {
                      this.receive_goods_addresses.push(items);
                    }
                  });
                });
              this.corp = res.data.corp;
              this.sale = {
                customer_id: res.data.customer.id,
                customer_name: res.data.customer.name,
                customer_contact:
                  res.data.customer.contacts.length > 0
                    ? res.data.customer.contacts[0].name
                    : "",
                customer_mobile: res.data.customer.contacts.length
                  ? res.data.customer.contacts[0].mobile
                  : "",
                customer_fax: res.data.customer.contacts.length
                  ? res.data.customer.contacts[0].fax
                  : "",
                corp_id: res.data.corp[0].id,
                corp_name: res.data.corp[0].name,
                corp_contact: res.data.corp[0].contacts.length
                  ? res.data.corp[0].contacts[0].name
                  : "",
                corp_mobile: res.data.corp[0].contacts.length
                  ? res.data.corp[0].contacts[0].mobile
                  : "",
                corp_fax: res.data.corp[0].contacts.length
                  ? res.data.corp[0].contacts[0].fax
                  : "",
                currency_id: "",
                contract_number: res.data.contract_number,
                contract_date: "",
                contract_address: res.data.corporation.signed_address,
                customer_po: "",
                sale_id: res.data.sale_id,
                expdate_start: res.data.corporation.contractdate,
                expdate_end: res.data.corporation.expdate,
                if_invoice: 0,
                transportation: res.data.corporation.transportation,
                detail: [],
                quality_stardard: res.data.corporation.quality_stardard,
                reasonable_loss: res.data.corporation.reasonable_loss,
                package_stardard: res.data.corporation.package_stardard,
                accept_stardard: res.data.corporation.accept_mode,
                total_money: "",
                trade_type_id: "",
                payment_id: "",
                receive_money_date: res.data.corporation.receiver_money_date,
                settle_type: res.data.corporation.settle_type,
                if_echapter: 0,
                from_port: "",
                dest_port: "",
                delivery_address_id: "",
                invoice_address_id: "",
                delivery_type_id: "",
                express_account_type: "",
                express_company_id: "",
                express_account: ""
              };
              res.data.inquirys.forEach((i, j) => {
                this.sale.detail.push({
                  additional: [
                    {
                      additional_type_id: "",
                      price: ""
                    }
                  ],
                  additional_cost: 0,
                  batchno: i.prebatch_no,
                  inquiry_id: i.inquiry_confirm.inquiry_id,
                  cas: i.cas,
                  checked_items: [],
                  prod_id: i.prod_id,
                  leadtime: i.leadtime,
                  product_file: [],
                  product_name: i.name,
                  product_name_cn: i.name_cn,
                  package: i.inquiry_confirm.comfirm_pack,
                  purity: i.inquiry_confirm.comfirm_purity,
                  quantity: i.inquiry_confirm.comfirm_quantity,
                  quantity_unit: Number(i.inquiry_confirm.comfirm_quantity_unit),
                  currency_id: i.inquiry_confirm.comfirm_currency_id,
                  price: i.inquiry_confirm.comfirm_price
                });
              });
              this.additional_cost_type = res.enum.additional_cost_type;
              this.address_type_info = res.enum.address_type_info;
              this.currencys = res.enum.currencys;
              this.delivery_type = res.enum.delivery_type;
              this.express_account_type = res.enum.express_account_type;
              this.enum_express_company = res.enum.express_company;
              this.if_declare_info = res.enum.if_declare_info;
              this.if_echapter_info = res.enum.if_echapter_info;
              this.if_invoice_info = res.enum.if_invoice_info;
              this.invoice_type = res.enum.invoice_type;
              this.test_item = res.enum.test_item;
              this.trade_mode = res.enum.trade_mode;
              this.product_file_info = res.enum.product_file_info;
              this.units = res.enum.units;
              this.product_type = res.enum.product_type;
              this.payment_type = res.enum.payment_type;
              this.trade_type = res.enum.trade_type;
              let money = 0;
              this.sale.detail.forEach((items, index) => {
                money = new Big(money).plus(
                  new Big(items.quantity)
                    .times(items.price)
                    .plus(items.additional_cost)
                );
              });
              this.sale.total_money = Number(money);
            });
            sale_lists().then(res => {
              this.sale_list = res.data;
            });
          }
        }
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    fetch_data() {
      saler_contract_detail(this.$route.query.id).then(res => {
        res.data.detail = res.data.details;
        this.sale = res.data;
        this.sale.transportation = res.data.remarks.transportation;
        this.sale.quality_stardard = res.data.remarks.quality_stardard;
        this.sale.reasonable_loss = res.data.remarks.reasonable_loss;
        this.sale.package_stardard = res.data.remarks.package_stardard;
        this.sale.accept_stardard = res.data.remarks.accept_stardard;
        this.additional_cost_type = res.enum.additional_cost_type;
        this.address_type_info = res.enum.address_type_info;
        this.currencys = res.enum.currencys;
        this.delivery_type = res.enum.delivery_type;
        this.express_account_type = res.enum.express_account_type;
        this.enum_express_company = res.enum.express_company;
        this.if_declare_info = res.enum.if_declare_info;
        this.if_echapter_info = res.enum.if_echapter_info;
        this.if_invoice_info = res.enum.if_invoice_info;
        this.invoice_type = res.enum.invoice_type;
        this.test_item = res.enum.test_item;
        this.trade_mode = res.enum.trade_mode;
        this.product_file_info = res.enum.product_file_info;
        this.units = res.enum.units;
        this.product_type = res.enum.product_type;
        this.payment_type = res.enum.payment_type;
        saler_contract_info(res.data.customer_id).then(response => {
          response.data.info.receive_addresses.forEach((items, index) => {
            if (items.type == 1) {
              this.receive_invoice_addresses.push(items);
            } else {
              this.receive_goods_addresses.push(items);
            }
          });
        });
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
    },
    select_express_account_type(id) {
      get_deliver_goods(this.sale.customer_id, id).then(res => {
        let express_company = [];
        this.get_deliver_goods = res.data;
        this.enum_express_company.forEach((items, index) => {
          for (var key in res.data) {
            if (items.id == key) {
              express_company.push(items);
            }
          }
        });
        this.express_company = express_company;
      });
    },
    select_express_company(id) {
      this.account = this.get_deliver_goods[id];
    },
    change_quantity(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        money = new Big(money).plus(
          new Big(items.quantity).times(items.price).plus(items.additional_cost)
        );
      });
      this.sale.total_money = Number(money);
    },
    change_price(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        money = new Big(money).plus(
          new Big(items.quantity).times(items.price).plus(items.additional_cost)
        );
      });
      this.sale.total_money = Number(money);
    },

    get_index(index) {
      this.detail_index = index;
    },
    querySearchAsync_customer(queryString, cb) {
      if (queryString != "") {
        customer_lists(queryString).then(res => {
          var restaurants = res.data;
          var results = queryString
            ? restaurants.filter(this.createFilter_customer(queryString))
            : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        });
      }
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
    createFilter_customer(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.cas.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect_customer(item) {
      this.sale.customer_id = item.id;
      this.sale.customer_name = item.name;
      this.receive_invoice_addresses = [];
      this.receive_goods_addresses = [];
      saler_contract_info(item.id).then(res => {
        this.sale.customer_contact = res.data.info.contacts[0].name;
        this.sale.customer_mobile = res.data.info.contacts[0].mobile;
        this.sale.customer_fax = res.data.info.contacts[0].fax;
        this.sale.contract_number = res.data.number;
        this.sale.payment_id = res.data.corporation.payment_day_id;
        this.sale.receive_money_date = res.data.corporation.receiver_money_date;
        this.sale.settle_type = res.data.corporation.settle_type;
        res.data.info.receive_addresses.forEach((items, index) => {
          if (items.type == 1) {
            this.receive_invoice_addresses.push(items);
          } else {
            this.receive_goods_addresses.push(items);
          }
        });
      });
    },
    handleSelect(item) {
      this.sale.detail[this.detail_index].cas = item.cas;
      this.sale.detail[this.detail_index].product_name_cn = item.name_cn;
      this.sale.detail[this.detail_index].product_name = item.name;
      this.sale.detail[this.detail_index].prod_no = item.prodno;
      this.sale.detail[this.detail_index].prod_id = item.prod_id;
    },

    get_custcontact_id(id) {
      contact_info(id).then(res => {
        this.sale.customer_contact = res.data[0].name;
        this.sale.customer_mobile = res.data[0].phone
          ? res.data[0].phone
          : res.data[0].mobile;
        this.sale.customer_fax = res.data[0].fax;
      });
    },
    get_custcontact_crop_id(id) {
      corp_info(id).then(res => {
        this.sale.corp_name = res.data.info.name;
        this.sale.corp_contact = res.data.info.contacts[0].name;
        this.sale.corp_mobile = res.data.info.contacts[0].phone
          ? res.data.info.contacts[0].phone
          : res.data.info.contacts[0].mobile;
        this.sale.corp_fax = res.data.info.contacts[0].fax;
      });
    },
    remoteMethod_crop(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          corp_lists(query).then(res => {
            this.customers_crop = res.data;
            this.loading = false;
          });
        }, 200);
      } else {
        this.customers_crop = [];
      }
    },
    show_dialog(index) {
      this.dialogVisible = true;
      this.index = index;
    },
    hide_dialogVisible() {
      this.dialogVisible = false;
      let num = 0;
      this.sale.detail[this.index].additional.forEach((item, index) => {
        num = new Big(num).plus(item.price);
      });
      this.sale.detail[this.index].additional_cost = Number(num);
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        money = new Big(money).plus(
          new Big(items.quantity).times(items.price).plus(items.additional_cost)
        );
      });
      this.sale.total_money = Number(money);
    },
    add_demand() {
      this.sale.detail.push({
        inquiry_id: "",
        batchno: "",
        cas: "",
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
        if_declare: 0,
        required_delivery_date: "",
        if_auto_delivery: 0,
        is_generation: 0,
        commission:''
      });
    },
    add_cost() {
      this.sale.detail[this.index].additional.push({
        additional_type_id: "",
        price: ""
      });
    },
    save() {
      if (this.check) {
        saler_contract_verify(this.check_contract, this);
      } else {
        this.sale.currency_id = this.sale.detail[0].currency_id;
        this.sale.detail.forEach((items, index) => {
          items.currency_id = this.sale.currency_id;
          if (items.additional_cost == 0) {
            delete items.additional;
          }
        });
        saler_create(this.sale, this);
      }
    },
    close() {
        let that=this
        that.$router.push({
          path: "/sales/sales",
          name: "sales-sales"
        });
        var tagName = 'sales-alter'
        that.closeAdd({tagName})
    },
    delete_cost(index) {
      this.sale.detail[this.index].additional.splice(index, 1);
    },
    delete_sale(item, index) {
      if (item.id) {
        destroy(item, "hs", "destroy", this, index);
      } else {
        this.sale.detail.splice(index, 1);
      }
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
    }
  }
};
</script>
