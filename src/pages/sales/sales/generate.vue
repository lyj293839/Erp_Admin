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
  /*overflow: auto;*/
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

.el-select {
  width: 100%;
}
.from-item {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /deep/.el-form-item__content{
    width: 100%;
  }
  table {
    border-collapse: collapse;
  }
  /deep/.el-input__inner {
    border: none;
    padding: 0px 5px;
  }
}

.checked_items {
  display: flex;
}

/deep/ .dateInput {
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
.check_table {
  .el-checkbox {
    margin: 5px;
  }
  /deep/.el-checkbox__label {
    padding: 2px;
  }
}
.contract_number{
  /deep/.el-input__inner{
    padding: 0px 5px;
  }
}
.cost_style{
  table{
    border-collapse: collapse;
    /deep/.el-input__inner{
      border: 0px;
    }
  }
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
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
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
                <th class="td">
                  <span style="color:red;"></span>
                  {{$t('sale.add.sale5')}}
                  <!-- 联系电话 -->
                </th>
                <th class="td">
                  <span style="color:red;"></span>
                  {{$t('sale.add.sale6')}}
                  <!-- 传真 -->
                </th>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale7')}}</td>
                <!-- 甲方 -->
                <td>
                  <span style="color:red;">*</span>
                  <el-select
                    v-model="sale.customer_name"
                    clearable
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    @change="supplyChange()"
                    :loading="supplyloading"
                    style="width:96%;"
                    size="small"
                  >
                    <el-option
                      v-for="item in supply_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      :disabled="item.is_stop==2"
                    >
                      <span v-if="item.is_stop==1">
                        <span style="float: left">{{ item.name }}</span>
                      </span>
                      <span v-else>
                        <span style="float: left;color:red;">{{ item.name }}(停用)</span>
                      </span>
                    </el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  <el-autocomplete
                    clearable
                    v-model="sale.customer_contact"
                    :fetch-suggestions="querySearchAsync_contact"
                    @select="handleSelect_contact"
                    style="width:96%;"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </td>
                <td>
                  <el-input v-model="sale.customer_mobile" style="width:96%;"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.customer_fax" style="width:96%;"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale8')}}</td>
                <!-- 乙方 -->
                <td>
                  <span style="color:red;">*</span>
                  <el-select
                    v-if="!this.$route.query.id"
                    v-model="sale.corp_id"
                    @change="get_custcontact_crop_id(sale.corp_id)"
                    style="width:96%;"
                    clearable
                    filterable
                  >
                    <el-option v-for="i in corp" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                  <el-input v-if="this.$route.query.id" v-model="sale.corp_name" style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  <el-input v-model="sale.corp_contact" style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  <el-input v-model="sale.corp_mobile" style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_fax" style="width:96%;"></el-input>
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
            <el-button
              style="float: right;margin: 7px 7px 0 0;color: white;"
              type="primary"
              size="mini"
              @click="add_demand"
            >{{$t('add')}}</el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.detail" :key="index">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale84')}}</th>
                <!-- 询单号 -->
                <th class="td" width="150">
                  {{$t('sale.add.sale14')}}
                  <!-- 预占批号 -->
                  <el-button
                    size="mini"
                    type="primary"
                    @click="generatePrebatchNo(index)"
                    :disabled="contract_name_button"
                  >{{$t('sale.add.sale14_')}}</el-button>
                  <!-- 自动生成 -->
                </th>
                <th class="td" width="120">
                  <span style="color:red;">*</span>CAS
                </th>
                <th class="td" width="200">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale15')}}
                  <!-- 产品名称 -->
                </th>
                <th class="td">{{$t('sale.add.sale16')}}</th>
                <!-- 规格 -->
                <th class="td">{{$t('sale.add.sale17')}}</th>
                <!-- 纯度 -->
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale18')}}
                  <!-- 数量 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale19')}}
                  <!-- 数量单位 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale20')}}
                  <!-- 币种 -->
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale21')}}
                  <!-- 单价 -->
                </th>
                <th class="td">{{$t('sale.add.sale22')}}</th>
                <!-- 金额 -->
                <th class="td" width="120">{{$t('sale.add.sale23')}}</th>
                <!-- 提交货时间 -->
                <th width='60'>
                  <el-button
                    type="primary"
                    v-if="index>0"
                    size="mini"
                    @click="delete_sale(item,index)"
                  >{{$t('delete')}}</el-button>
                </th>
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
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    @input="cas_change(index)"
                    clearable
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
                  <el-select v-model="item.quantity_unit" clearable filterable>
                    <el-option v-for="i in units"  :key="i.id"  :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    v-model="item.currency_id"
                    clearable
                    filterable
                    @change="currency_change()"
                  >
                    <el-option v-for="i in currencys" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.price" @input="change_price(index)"></el-input>
                </td>
                <td>
                  <el-input v-model="item.aa" @input="change_money(index)"></el-input>
                </td>
                <td class="dateInput" colspan="2">
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
                <td>{{$t('sale.add.sale24')}}</td>
                <!-- 产品编码 -->
                <td colspan="2">
                  <el-input v-model="item.prod_no"></el-input>
                </td>
                <td>
                  <el-input v-model="item.product_name" placeholder="english product name"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale25')}}
                  <!-- 发票类型 -->
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
                  <el-button
                    type="primary"
                    size="mini"
                    @click="show_dialog(item,index)"
                  >{{$t('sale.add.sale26')}}</el-button>
                  <!-- 附加费用 -->
                </td>
                <td>{{item.additional_cost}}</td>
                <td>佣金</td>
                <td><el-input v-model="item.commission" size="mini"></el-input></td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale27')}}</td>
                <!-- 分析要求 -->
                <td colspan="12" class="checkbox">
                  <span
                    v-for="i in item.checked_items"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="i in item.checked_items" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                    <!-- <el-checkbox v-model="i.checked" @change="select_parent(index,i)" name="type"> -->
                      <span style="font-weight: bold;">{{i.name}}</span>:
                    <!-- </el-checkbox>: -->
                    <el-checkbox
                      v-for="j in i.child"
                      :key="j.id"
                      :label="j.id"
                      v-model="j.checked"
                      @change="select(index,j,item.id)"
                      class="checkbox_nei"
                    >
                      <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                    </el-checkbox>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale28')}}</td>
                <!-- 其他要求 -->
                <td colspan="5">
                  <el-input v-model="item.checked_requirement"></el-input>
                </td>
                <td colspan="2">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale29')}}
                  <!-- 是否报关 -->
                </td>
                <td colspan="2">
                  <el-select v-model="item.if_declare">
                    <el-option v-for="i in if_declare_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale30')}}
                  <!-- 合同贸易 -->
                </td>
                <td colspan="2">
                  <el-select v-model="item.trade_type">
                    <el-option v-for="i in trade_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale31')}} </td>
                <!-- 包装要求 -->
                <td colspan="5">
                  <div style="display: flex;align-items:center;justify-content: space-between;">
                    <div>
                      <div v-for="(i,index_i) in item.claims">
                        <el-input
                          v-model="i.claim_pack_number"
                          style="width: 80px;border: 1px solid #f2f2f2;"
                        ></el-input>*
                        <el-input
                          v-model="i.claim_pack_size"
                          style="width: 80px;border: 1px solid #f2f2f2;"
                        ></el-input>/
                        <el-select
                          v-model="i.claim_unit_id"
                          clearable
                          style="width: 100px;border: 1px solid #f2f2f2;"
                        >
                          <el-option v-for="i in units"  :key="i.id"  :label="i.name" :value="i.id"></el-option>
                        </el-select>
                        <el-button type="primary" icon="el-icon-minus" @click="claim_dev(index,index_i)" size="mini"></el-button>
                      </div>
                    </div>
                    <el-button type="primary" icon="el-icon-plus" style="margin-right:10px;" @click="claim_add(index)" size="mini"></el-button>
                  </div>
                </td>
                <td colspan="2">{{$t('sale.add.sale32')}}</td>
                <!-- 要求发货时间 -->
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
                <td>{{$t('sale.add.sale33')}}</td>
                <!-- 标签要求 -->
                <td colspan="5">
                  <el-input v-model="item.label_requirement"></el-input>
                </td>
                <td colspan="2">{{$t('sale.add.sale34')}}</td>
                <!-- 发货备注 -->
                <td colspan="5">
                  <el-input v-model="item.deliver_note"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td>
                <!-- 随货文件 -->
                <td colspan="5">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id":label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td colspan="2">{{$t('sale.add.sale36')}}</td>
                <!-- 是否自动发货 -->
                <td colspan="5">
                  <el-radio-group v-model="item.if_auto_delivery">
                    <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio>
                    <!-- 自动 -->
                    <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio>
                    <!-- 不自动 -->
                  </el-radio-group>
                </td>
                
              </tr>
              <tr>
                <td>{{$t('sale.add.sale39')}}</td>
                <!-- 是否代发 -->
                <td colspan="5">
                  <el-radio-group v-model="item.is_generation">
                    <el-radio :label="1">{{$t('sale.add.sale57')}}</el-radio>
                    <!-- 是 -->
                    <el-radio :label="0">{{$t('sale.add.sale58')}}</el-radio>
                    <!-- 否 -->
                  </el-radio-group>
                </td>
                <td colspan="2">{{$t('sale.add.sale294')}}</td>
                <td colspan="5">
                  <el-radio-group v-model="item.inventory_auto_preempt">
                    <el-radio v-for="i in inventory_auto_preempt_info"  :key="i.id" :label="i.id">{{i.name}}</el-radio>
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale289')}}</td>
                <td colspan="5">
                  <el-radio-group v-model="item.is_straight_hair">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                  </el-radio-group>
                </td>
                <td colspan="2">{{$t('sale.add.sale278')}}</td>
                <td colspan="5">
                  <el-input v-model="item.straight_hair_note"></el-input>
                </td>
              </tr>
              <tr>
                <td>是否中转</td>
                <td colspan="12">
                  <el-radio-group v-model="item.is_transfer" @change="item.transfer_warehouse_id=(item.is_transfer==2?12:'')">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                  </el-radio-group>
                  <el-select
                    placeholder="仓库"
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
              <tr v-if="index==(sale.detail.length-1)">
                <td colspan="6"></td>
                <td colspan="2">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale42')}}
                  <!-- 总金额 -->
                </td>
                <td colspan="5">{{sale.total_money>0?sale.total_money:''}}</td>
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
                <th class="td" width='180'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale44')}}
                  <!-- 合同号 -->
                </th>
                <th class="td" width='140'>{{$t('sale.add.sale45')}}</th>
                <!-- 签约时间 -->
                <th class="td">{{$t('sale.add.sale46')}}</th>
                <!-- 签约地点 -->
                <th class="td" width='140'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale47')}}
                  <!-- 销售 -->
                </th>
                <th class="td" width='200'>PO</th>
                <th style="min-width:400px">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale48')}}
                </th>
              </tr>
              <tr>
                <td style="padding:0px !important;" class="contract_number">
                  <el-select style="width:39%;border:1px solid #E5E5E5" v-model="pre" placeholder="" @change="contract_address()" clearable filterable>
                    <el-option
                      v-for="(i,index) in number_type_info"
                      :key="index"
                      :label="i"
                      :value="i"
                    ></el-option>
                  </el-select>
                  <el-input style="width:58%;" v-model="number" @input="contract_address()"  clearable></el-input>
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
                    <el-option v-for="(i,index) in sale_list" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="sale.customer_po"></el-input>
                </td>
                <td>
                  <!--<el-select v-model="sale.settle_type" clearable filterable>-->
                    <!--<el-option-->
                      <!--v-for="(i,index) in corporation"-->
                      <!--:key="index"-->
                      <!--:label="i.name"-->
                      <!--:value="i.name"-->
                    <!--&gt;</el-option>-->
                  <!--</el-select>-->
                  <el-autocomplete
                          clearable
                          v-model="sale.settle_type"
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
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale49')}}
                  <!-- 贸易方式 -->
                </td>
                <td>
                  <el-select
                    v-model="sale.trade_type_id"
                    clearable
                    filterable
                    size="small"
                    style="width:100%;"
                  >
                    <el-option v-for="(i,index) in trade_mode" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td><span style="color:red;">*</span>交货天数</td>
                <td>
                  <el-input style="width:80%;" v-model="sale.delivery_days"></el-input>
                  <span>天</span>
                </td>
                <!--<td>是否含税</td>-->
                <!--<td>-->
                <!--<el-radio-group v-model="sale.if_invoice">-->
                <!--<el-radio :label="1">含税</el-radio>-->
                <!--<el-radio :label="0">不含税</el-radio>-->
                <!--</el-radio-group>-->
                <!--</td>-->
              </tr>
              <tr>
                <td>{{$t('sale.add.sale90')}}</td>
                <td colspan="6">
                  <el-input v-model="sale.transportation"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale50')}}</td>
                <!-- 质量标准 -->
                <td colspan="6">
                  <el-input v-model="sale.quality_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale51')}}</td>
                <!-- 合理损耗 -->
                <td colspan="6">
                  <el-input v-model="sale.reasonable_loss"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale95')}}</td>
                <!-- 包装标准&运输方式 -->
                <td colspan="6">
                  <el-input v-model="sale.package_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale53')}}</td>
                <!-- 验收标准 -->
                <td colspan="6">
                  <el-input v-model="sale.accept_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale54')}}</td>
                <!-- 有效期开始 -->
                <td colspan="1" class="dateInput">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="sale.expdate_start"
                    type="date"
                    size="small"
                    style="width:100%;"
                  ></el-date-picker>
                </td>
                <td>{{$t('sale.add.sale55')}}</td>
                <!-- 有效期结束 -->
                <td colspan="1" class="dateInput">
                  <el-date-picker
                    size="small"
                    value-format="yyyy-MM-dd"
                    v-model="sale.expdate_end"
                    type="date"
                    style="width:100%;"
                  ></el-date-picker>
                </td>
                <td>{{$t('sale.add.sale56')}}</td>
                <!-- 加电子章 -->
                <td>
                  <el-radio-group v-model="sale.if_echapter">
                    <el-radio :label="1">{{$t('sale.add.sale57')}}</el-radio>
                    <!-- 是 -->
                    <el-radio :label="0">{{$t('sale.add.sale58')}}</el-radio>
                    <!-- 否 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale59')}}</td>
                <!-- 备注 -->
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
              <b>{{$t('sale.add.sale60')}}</b>
              <!-- 运输物流 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th style="width: 300px;">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale63')}}
                </th>
                <!-- 收货地址 -->
                <th style="width: 300px;">{{$t('sale.add.sale64')}}</th>
                <!-- 收票地址 -->
                <th class="td"><span style="color:red;">*</span>{{$t('sale.add.sale65')}}</th>
                <!-- 发货方式 -->
                <th class="td" style="width: 170px;"><span style="color:red;">*</span>{{$t('sale.add.sale66')}}</th>
                <!-- 账号 -->
                <th class="td">{{$t('sale.add.sale67')}}</th>
                <!-- 快递公司 -->
                <th class="td" width='240px'>{{$t('sale.add.sale68')}}</th>
                <!-- 快递账号 -->
              </tr>
              <tr>
                <td>
                  <el-select
                    v-model="sale.delivery_address_id"
                    clearable
                    filterable
                    style="width: 90%"
                  >
                    <el-option
                      v-for="(i,index) in receive_goods_addresses"
                      :key="index"
                      :label="i.address+'__'+i.contact_name+i.mobile"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                  <i class="el-icon-edit" style="cursor: pointer;" @click="delivery_edit()"></i>
                </td>
                <td>
                  <el-select
                    v-model="sale.invoice_address_id"
                    clearable
                    filterable
                    style="width: 90%"
                  >
                    <el-option
                      v-for="(i,index) in receive_invoice_addresses"
                      :key="index"
                      :label="i.address+'__'+i.contact_name+i.mobile"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                  <i class="el-icon-edit" style="cursor: pointer;" @click="invoice_edit()"></i>
                </td>
                <td>
                  <el-select v-model="sale.delivery_type_id" filterable>
                    <el-option v-for="(i,index) in delivery_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    v-model="sale.express_account_type"
                    @change="select_express_account_type(sale.express_account_type)"
                    filterable
                    style="width: 80%"
                  >
                    <el-option
                      v-for="(i,index) in express_account_type"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                  <i class="el-icon-edit" style="cursor: pointer;" @click="account_edit()"></i>
                </td>
                <td>
                  <el-select
                    v-model="sale.express_company_id"
                    @change="select_express_company(sale.express_company_id)"
                    clearable
                    filterable
                  >
                    <el-option v-for="(i,index) in express_company" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-autocomplete
                    clearable
                    v-model="sale.express_account"
                    :fetch-suggestions="querySearchAsync_account"
                    placeholder
                    @select="handleSelect_account"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.accounts }}</div>
                    </template>
                  </el-autocomplete>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item
          v-if="save_show"
          class="from-item"
          style="margin:0px;"
        >
        <div style="text-align:center;">
          <el-button type="primary" :loading="loading" @click="check_save()" size="mini">{{$t('save')}}</el-button>
          <!-- 保存 -->
          <el-button @click="close_a()" size="mini">{{$t('cancel')}}</el-button>
          <!-- 取消 -->
        </div>
          
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑地址 -->
    <el-dialog
      :title="titleAddresses"
      :visible.sync="dialogAddresses"
      width="65%"
      @close="delete_receive_good(addressItem)"
    >
      <el-tabs type="card">
        <el-tab-pane :label="$t('sale.add.sale169')">
          <!-- 账号 -->
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
            class="check_table"
          >
            <tr>
              <td style="width:60px;">{{$t('sale.add.sale69')}}</td>
              <!-- 国家 -->
              <td style="width:100px;">{{$t('sale.add.sale70')}}</td>
              <!-- 城市 -->
              <td>{{$t('sale.add.sale71')}}</td>
              <!-- 地址 -->
              <td style="width:60px;">{{$t('sale.add.sale72')}}</td>
              <!-- 联系人 -->
              <td style="width:90px;">{{$t('sale.add.sale73')}}</td>
              <!-- 电话 -->
              <td style="width:110px;">{{$t('sale.add.sale74')}}</td>
              <!-- 邮箱 -->
              <td style="width:40px;">{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:60px;">{{$t('sale.add.sale76')}}</td>
              <!-- 是否默认 -->
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total"
                  @change="check_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="address_del()"
                >{{$t('sale.add.sale94')}}</el-button>
                <!-- 作废 -->
              </td>
            </tr>
            <tr v-for="item in addressList" v-if="!item.deleted_at">
              <td>{{item.country?item.country.Name:''}}</td>
              <td>{{item.city?item.city.Name:''}}</td>
              <td><pre>{{item.address}}</pre></td>
              <td>{{item.contact_name}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.email}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
              <!--是/否-->
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('sale.add.sale171')}}</el-button>
                <!-- 修改 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="destory_address(item)"
                >{{item.deleted_at?$t('sale.add.sale169'):$t('sale.add.sale170')}}</el-button>
                <!--启用/作废-->
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('sale.add.sale170')">
          <!-- 作废地址 -->
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
            class="check_table"
          >
            <tr>
              <td style="width:60px;">{{$t('sale.add.sale69')}}</td>
              <!-- 国家 -->
              <td style="width:100px;">{{$t('sale.add.sale70')}}</td>
              <!-- 城市 -->
              <td>{{$t('sale.add.sale71')}}</td>
              <!-- 地址 -->
              <td style="width:60px;">{{$t('sale.add.sale72')}}</td>
              <!-- 联系人 -->
              <td style="width:90px;">{{$t('sale.add.sale73')}}</td>
              <!-- 电话 -->
              <td style="width:110px;">{{$t('sale.add.sale74')}}</td>
              <!-- 邮箱 -->
              <td style="width:40px;">{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:60px;">{{$t('sale.add.sale76')}}</td>
              <!-- 是否默认 -->
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total"
                  @change="check_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="address_star()"
                >{{$t('sale.add.sale93')}}</el-button>
                <!-- 启用 -->
              </td>
            </tr>
            <tr v-for="item in addressList" v-if="item.deleted_at">
              <td>{{item.country?item.country.Name:''}}</td>
              <td>{{item.city?item.city.Name:''}}</td>
              <td><pre>{{item.address}}</pre></td>
              <td>{{item.contact_name}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.email}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
              <!-- 是/否-->
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
                <!-- 修改 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="destory_address(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <el-form label-position="right" label-width="90px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale69')">
              <!-- 国家 -->
              <el-select
                v-model="addressItem.country_code"
                filterable
                @change="selected_country_address(addressItem)"
                size="small"
                placeholder="Please Select"
              >
                <el-option v-for="(i,index) in country" :key="index" :label="i.Name" :value="i.Code"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale70')">
              <!-- 城市 -->
              <!-- <el-select
                v-model="addressItem.city_id"
                clearable
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod_city"
                :loading_city="loading_city"
                size="small"
              >
                <el-option v-for="(i,index) in addressItem.city" :label="i.Name" :value="i.ID"></el-option>
              </el-select> -->
              <el-select
                v-model="addressItem.city_id"
                clearable
                filterable
                size="small"
              >
                <el-option
                  v-for="(i,index) in addressItem.city"
                  :key="index"
                  :label="i.Name"
                  :value="i.ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('sale.add.sale71')" :required="true">
          <!-- 地址 -->
          <el-input v-model="addressItem.address" type="textarea" size="small" placeholder="Please Write"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale72')" :required="titleAddresses==('收货地址'||'Shipping address')">
              <!-- 联系人 -->
              <el-input v-model="addressItem.contact_name" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale73')" :required="titleAddresses==('收货地址'||'Shipping address')">
              <!-- 电话 -->
              <el-input v-model="addressItem.mobile" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale74')">
              <!-- 邮箱 -->
              <el-input v-model="addressItem.email" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('sale.add.sale81')">
          <!-- 默认 -->
          <el-switch
            name="is_default"
            v-model="addressItem.is_default"
            :active-value="1"
            :inactive-value="0"
            :active-text="$t('sale.add.sale82')"
            :inactive-text="$t('sale.add.sale83')"
          ></el-switch>
          <!-- 开/关 -->
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="save_receive_good(addressItem)"
          >{{$t('save')}}</el-button>
          <!-- 保存 -->
          <el-button size="mini" @click="delete_receive_good(addressItem)">{{$t('cancel')}}</el-button>
          <!-- 取消 -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 账号 -->
    <el-dialog
      :title="titleDeliver"
      :visible.sync="dialogAccount"
      width="65%"
      @close="deliver_good_close(deliveryItem)"
    >
      <el-tabs type="card">
        <el-tab-pane :label="$t('sale.add.sale169')">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
            class="check_table"
          >
            <tr>
              <td>{{$t('sale.add.sale78')}}</td>
              <!-- 快递公司 -->
              <td>{{$t('sale.add.sale79')}}</td>
              <!-- 账号 -->
              <td>{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total_account"
                  @change="check_account_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="account_del()"
                >{{$t('sale.add.sale94')}}</el-button>
                <!-- 作废 -->
              </td>
            </tr>
            <tr v-for="item in deliverList" v-if="!item.deleted_at">
              <td>{{express_company_.filter(i=>{return item.express_company_id == i.id})[0]?express_company_.filter(i=>{return item.express_company_id == i.id})[0].name:''}}</td>
              <td>{{item.accounts}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>
                <el-checkbox v-model="item.check" @change="checkItem_account_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_deliver(item)">{{$t('edit')}}</el-button>
                <!-- 修改 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="deliver_good_destory(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('sale.add.sale170')">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
            class="check_table"
          >
            <tr>
              <td>{{$t('sale.add.sale78')}}</td>
              <!-- 快递公司 -->
              <td>{{$t('sale.add.sale79')}}</td>
              <!-- 账号 -->
              <td>{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total_account"
                  @change="check_account_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="account_star()"
                >{{$t('sale.add.sale93')}}</el-button>
                <!-- 启用 -->
              </td>
            </tr>
            <tr v-for="item in deliverList" v-if="item.deleted_at">
              <td>{{express_company_.filter(i=>{return item.express_company_id == i.id})[0]?express_company_.filter(i=>{return item.express_company_id == i.id})[0].name:''}}</td>
              <td>{{item.accounts}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>
                <el-checkbox v-model="item.check" @change="checkItem_account_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_deliver(item)">{{$t('edit')}}</el-button>
                <!-- 修改 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="deliver_good_destory(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <el-form label-position="right" label-width="110px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale78')" :required="true">
              <!-- 快递公司 -->
              <el-select
                v-model="deliveryItem.express_company_id"
                size="mini"
                placeholder="Please Select"
              >
                <el-option v-for="(i,index) in express_company_" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale79')" :required="true">
              <!-- 账号 -->
              <el-input v-model="deliveryItem.accounts" size="mini" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="deliver_good_create(deliveryItem)"
          >{{$t('save')}}</el-button>
          <!-- 保存 -->
          <el-button size="mini" @click="deliver_good_close(deliveryItem)">{{$t('cancel')}}</el-button>
          <!-- 取消 -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :title="$t('sale.add.sale10')" :visible.sync="dialogVisible" width="40%" class="cost_style">
              <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                <tr>
                  <td>{{$t('sale.add.sale11')}}</td>
                  <td>{{$t('sale.add.sale12')}}</td>
                  <td>{{$t('sale.add.sale13')}}</td>
                </tr>
                <tr v-for="(i,index_) in additional">
                  <td>
                    <el-select
                      v-model="i.additional_type_id"
                      clearable
                      filterable
                      size="mini"
                      style="width: 100%;"
                      placeholder
                    >
                      <el-option
                        v-for="(i_,index_i) in additional_cost_type"
                        :key="index_i"
                        :label="i_.name"
                        :value="i_.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input
                      size="mini"
                      type="text"
                      class="input"
                      placeholder
                      v-model="i.price"
                      clearable
                    ></el-input>
                  </td>
                  <td>
                    <el-button @click="delete_cost(index_)" type="primary" size="mini">-</el-button>
                  </td>
                </tr>
              </table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="add_cost" type="primary" size="mini">+</el-button>
                <el-button @click="cost_close()" size="mini">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="hide_dialogVisible()" size="mini">{{$t('save')}}</el-button>
              </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import Big from "@/big/a/big.mjs";
import util from "@/libs/util";
import { generatePrebatchNo } from "@/api/Inquery";
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
  saler_contract_verify,
  receive_address,
  receive_address_create,
  receive_address_update,
  receive_address_destory,
  deliver_good,
  deliver_good_create,
  deliver_good_update,
  deliver_good_destory,
  get_contract_number,
  check_customer_account_period
} from "@/api/sale";
import $ from "jquery";
import { city_list, country_list } from "@/api/user";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-generate",
  data() {
    return {
      check_total: false,
      loading_city:false,
      check_list: [],
      pre:'',
      number:'',
      currency_id:'',
      check_total_account: false,
      check_account_list: [],
      corp: [],
      titleAddresses: "",
      dialogAddresses: false,
      prodno_is:'',
      addresses: true,
      addressList: [],
      // productid2:'',
      addressItem: {
        country_code: "",
        city_id: "",
        city: [],
        address: "",
        contact_name: "",
        mobile: "",
        email: "",
        is_default: 0,
        user_type: 101,
        member_id: "",
        type: ""
      },
      titleDeliver: "",
      dialogAccount: false,
      delivery: true,
      deliverList: [],
      deliveryItem: {
        express_company_id: "",
        accounts: "",
        is_straight_hair: 0,
        member_id: ""
      },
      additional: [
              {
                additional_type_id: "",
                price: ""
              }
            ],
      country: [],
      express_company: [],
      number_type_info:[],
      contract_name_button: true,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      detail_index: "",
      // user_id:'',
      // user_name:'',
      loading: false,
      dialogVisible: false,
      sale:{},
      supplyloading: false,
      sale_list: [],
      index: "",
      customers: [],
      customers_crop: [],
      additional_cost_type: [],
      address_type_info: [],
      currencys: [],
      delivery_type: [],
      express_account_type: [],
      express_company_: [],
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
      flag_map:[],
      save_show: false,
      check_contract: {
        saler_contract_id: "",
        approval_comment: "",
        status: ""
      },
      trade_type: [],
      supply_list: [],
      customer_contacts: [],
      inventory_auto_preempt_info:[],
      corporation: {},
      user_flag:'',
      item_id:''
    };
  },
  created() {
    if (this.$route.query.ids) {
      this.sale = {}
      this.item_id = this.$route.query.ids
      // this.user_id=Number(util.cookies.get('user_id'))
      // this.user_name=util.cookies.get('user_name');
      this.user_flag = util.cookies.get('user_flag');
      this.fetch_data();
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-generate") {
        // this.sale = {}
        // this.fetch_data();
        this.item_id = this.$route.query.ids
      }
    },
    item_id(to,from){
      if(to&&to!=from){
        this.sale = {}
        this.fetch_data();
      }
    },
    'currency_id':{
      deep:true,
      handler: function (newVal,oldVal){
                // if(newVal==2||oldVal==2){
                //   get_contract_number(newVal).then(res=>{
                //     this.pre = res.data.pre
                //     this.number = res.data.number
                //     this.contract_address()
                //   })
                // }
                if(!this.flag_map[this.user_flag]){
                  if(newVal==2){
                    this.pre='AK'
                  }else{
                    this.pre='AGN'
                  }
                }
                this.contract_address()
              }
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    claim_add(index){
      var item = {
        claim_pack_number:'',
        claim_pack_size:'',
        claim_unit_id:''
      }
      this.sale.detail[index].claims.push(item)
    },
    claim_dev(index,index_i){
      this.sale.detail[index].claims.splice(index_i,1)
    },
    clear(){
        this.sale.payment_id=0
    },
    remoteMethod_city(query){
      if (query) {
        this.loading_city = false;
            city_list(this.addressItem.country_code, '').then(res => {
              this.addressItem.city = res.data.filter(item => {
                return item.Name.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
              this.loading_city = true;
            });
        } else {
          this.addressItem.city = []
        }
    },
    querySearchAsync_corporation(queryString, cb) {
        var restaurants = this.corporation;
        cb(restaurants);
    },
    handleSelect_corporation(item){
        this.sale.settle_type=item.name
        this.sale.payment_id=item.id
        this.$forceUpdate()
    },
    currency_change() {
      this.currency_id = this.sale.detail[0].currency_id
      if(this.flag_map[this.user_flag]){
        if (this.sale.detail[0].currency_id == 2) {
          this.sale.delivery_type_id = 4;
          this.sale.type = 1;
        } else {
          this.sale.delivery_type_id = 3;
          this.sale.type = 2;
        }
        this.sale.corp_id = this.flag_map[this.user_flag]
        this.get_custcontact_crop_id(this.sale.corp_id)
      }else{
        if (this.sale.detail[0].currency_id == 2) {
          this.sale.delivery_type_id = 4;
          this.sale.type = 1;
          this.corp.forEach(i=>{
            if(i.id==100000){this.sale.corp_id = 100000}
          })
        } else {
          this.sale.delivery_type_id = 3;
          this.sale.type = 2;
          this.corp.forEach(i=>{
            if(i.id==500000){this.sale.corp_id = 500000}
          })
        }
        this.get_custcontact_crop_id(this.sale.corp_id)
          this.sale.detail.forEach(item=>{
            if(!item.prodno_is){
              if(item.currency_id==2){
                item.prod_no = item.productid2?item.productid2:''
              }else{
                item.prod_no = item.prodno?item.prodno:''
              }
            }
          })
      }
      
    },
    check_change() {
      this.check_list = [];
      this.addressList.forEach(res => {
        res.check = this.check_total;
        this.check_list.push(res.id);
      });
    },
    check_item_change(item) {
      this.check_list = [];
      this.check_total = item.check;
      this.addressList.forEach(res => {
        if (res.check == false) {
          this.check_total = false;
        } else {
          this.check_list.push(res.id);
        }
      });
    },
    check_account_change() {
      this.check_account_list = [];
      this.deliverList.forEach(res => {
        res.check = this.check_total_account;
        if (this.check_total_account) {
          this.check_account_list.push(res.id);
        }
      });
    },
    checkItem_account_change(item) {
      this.check_account_list = [];
      this.check_total_account = item.check;
      this.deliverList.forEach(res => {
        if (res.check == false) {
          this.check_total_account = false;
        } else {
          this.check_account_list.push(res.id);
        }
      });
    },
    address_star() {
      var obj = {
        id: this.check_list,
        enabled_state: 1
      };
      receive_address_destory(
        obj,
        "saler_contract",
        "receive_address_destory",
        this
      );
    },
    address_del() {
      var obj = {
        id: this.check_list,
        enabled_state: 0
      };
      receive_address_destory(
        obj,
        "saler_contract",
        "receive_address_destory",
        this
      );
    },
    account_star() {
      var obj = {
        id: this.check_account_list,
        enabled_state: 1
      };
      deliver_good_destory(obj, "saler_contract", "deliver_good_destory", this);
    },
    account_del() {
      var obj = {
        id: this.check_account_list,
        enabled_state: 0
      };
      deliver_good_destory(obj, "saler_contract", "deliver_good_destory", this);
    },
    contract_address() {
      this.sale.contract_number = this.pre+this.number
      if (this.sale.contract_number) {
        this.contract_name_button = false;
      } else {
        this.contract_name_button = true;
      }
    },
    querySearchAsync_account(queryString, cb) {
      var restaurants = this.account;
      cb(restaurants);
    },
    handleSelect_account(item) {
      this.sale.express_account = item.accounts;
    },
    generatePrebatchNo(index) {
      generatePrebatchNo(this.sale.contract_number).then(res => {
        this.sale.detail[index].batchno = res.data;
      });
    },
    select(i, item, id) {
      this.sale.detail[i].checked_items.forEach((items, index) => {
        // items.child.forEach((m, n) => {
        //   if (item.id == m.id) {
        //     this.$set(
        //       this.sale.detail[i].checked_items[index],
        //       "checked",
        //       true
        //     );
        //   }
        // });
        if(items.child.length>0){
          let num = 0
          items.child.forEach(m=>{
            if(m.checked){
              num++;
            }
          })
          if(num>0){
            items.checked = true
          }else{
            items.checked = false
          }
        }
      });
    },
    select_parent(i, item) {
      this.sale.detail[i].checked_items.forEach((items, index) => {
        if (!items.checked) {
          items.child.forEach((m, n) => {
            m.checked = false;
          });
        }
      });
    },
    fetch_data() {
      this.save_show = true;
      let obj = {
        ids: JSON.parse(this.$route.query.ids)
      };
      saler_contract_generate(obj).then(res => {
        if(res.code == 0){
          if(res.data.user.flag){
            this.user_flag = res.data.user.flag
          }
          if(JSON.stringify(this.sale)==='{}'){
          this.sale = {
            customer_id: res.data.customer.id,
            customer_name: res.data.customer.name,
            customer_contact:
              res.data.customer.contacts.length > 0
                ? res.data.customer.contacts[0].name
                : "",
            customer_mobile: res.data.customer.contacts.length>0
              ? (res.data.customer.contacts[0].phone?res.data.customer.contacts[0].mobile:'')
              : '',
            customer_fax: res.data.customer.contacts.length>0
              ? res.data.customer.contacts[0].fax
              : "",
            // corp_id: res.data.corp[0].id,
            // corp_name: res.data.corp[0].name,
            // corp_contact: res.data.corp[0].contacts.length>0
            //   ? res.data.corp[0].contacts[0].name
            //   : JSON.parse(JSON.stringify(this.info.name)),
            // corp_mobile: res.data.corp[0].contacts.length>0
            //   ? res.data.corp[0].contacts[0].mobile
            //   : "025-66061693",
            // corp_fax: res.data.corp[0].contacts.length>0
            //   ? res.data.corp[0].contacts[0].fax
            //   : "025-57626690",
            corp_id: '',
            corp_name:'',
            corp_contact: JSON.parse(JSON.stringify(this.info.name)),
            corp_mobile: '',
            corp_fax: '',
            currency_id: "",
            contract_number: '',
            contract_date: init(),
            contract_address: res.data.corporation.signed_address,
            customer_po: "",
            sale_id: res.data.sale_id,
            expdate_start: init(),
            expdate_end: res.data.corporation.expdate,
            if_invoice: 0,
            transportation: res.data.corporation.transportation,
            detail: [],
            quality_stardard: res.data.corporation.quality_stardard,
            reasonable_loss: res.data.corporation.reasonable_loss,
            package_stardard: res.data.corporation.package_stardard,
            accept_stardard: res.data.corporation.accept_mode,
            total_money: "",
            trade_type_id: 1,
            delivery_days:3,
            payment_id: 0,
            receive_money_date: res.data.corporation.receiver_money_date,
            if_echapter: 1,
            from_port: "",
            dest_port: "",
            delivery_address_id: "",
            invoice_address_id: '',
            delivery_type_id: 3,
            express_account_type: 1,
            express_company_id: "",
            express_account: ""
          } 
          this.sale.detail = []
          res.data.inquirys.forEach((i, j) => {
              this.sale.detail.push({
                additional: [
                  {
                    additional_type_id: "",
                    price: ""
                  }
                ],
                inventory_auto_preempt:2,
                if_declare: 0,
                if_auto_delivery: 0,
                is_generation: 0,
                is_transfer:1,
                transfer_warehouse_id:'',
                additional_cost: 0,
                batchno: i.prebatch_no,
                inquiry_id: i.inquiry_confirm.inquiry_id,
                cas: i.cas,
                invoice_type_id: i.inquiry_confirm.comfirm_invoice_type_id,
                prod_no: i.prodno,
                prodno_is:i.prodno?true:false,
                prodno:'',
                productid2:'',
                cas_old:i.cas,
                checked_items: res.enum.test_item,
                prod_id: i.prod_id,
                leadtime: new Date(i.inquiry_confirm.comfirm_leadtime)=='Invalid Date'?'':i.inquiry_confirm.comfirm_leadtime,
                product_file: [],
                product_name: i.name,
                product_name_cn: i.name_cn,
                package: i.inquiry_confirm.comfirm_pack,
                purity: i.inquiry_confirm.comfirm_purity,
                quantity: i.inquiry_confirm.comfirm_quantity,
                quantity_unit: Number(i.inquiry_confirm.comfirm_quantity_unit),
                currency_id: i.inquiry_confirm.comfirm_currency_id,
                price: i.inquiry_confirm.comfirm_price,
                commission:i.commission,
                aa:i.inquiry_confirm.comfirm_total_price,
                claims:[],
                is_straight_hair:i.inquiry_confirm.is_straight_hair?i.inquiry_confirm.is_straight_hair:0,
                straight_hair_note:i.inquiry_confirm.straight_hair_note
              });
          });
          if(res.enum.flag_map[this.user_flag]){
            var corp_id = res.enum.flag_map[this.user_flag]
            this.corp = res.data.corp.filter(i=>{return i.id==corp_id})
          }else{
            this.corp = res.data.corp;
            for(var k in res.enum.flag_map){
              this.corp.forEach((i,index)=>{
                if(res.enum.flag_map[k]==i.id){
                  this.corp.splice(index,1)
                }
              })
            }
          }
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
          this.test_item = JSON.parse(JSON.stringify(res.enum.test_item));
          // this.sale.detail[0].checked_items = res.enum.test_item;
          this.trade_mode = res.enum.trade_mode;
          this.product_file_info = res.enum.product_file_info;
          this.units = res.enum.units;
          this.product_type = res.enum.product_type;
          this.payment_type = res.enum.payment_type;
          this.trade_type = res.enum.trade_type;
          this.number_type_info = res.enum.number_type_info
          this.flag_map = res.enum.flag_map
          this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info
          let money = 0;
          if (this.sale.detail[0].currency_id == 2) {
            this.sale.delivery_type_id = 4;
          } else {
            this.sale.delivery_type_id = 3;
          }
          this.currency_change()
          this.sale.detail.forEach((items, index) => {
            items.checked_items = JSON.parse(JSON.stringify(res.enum.test_item))
            cas_info(items.cas).then(res => {
              if (res && res.code == 0) {
                // if(!items.prod_no){
                //   items.prod_no = res.data[0].prodno;
                // }
                items.productid2 = res.data[0].productid2
                items.prodno = res.data[0].prodno
                if(!items.prodno_is&&!this.flag_map[this.user_flag]){
                  if(items.currency_id==2){
                    items.prod_no = res.data[0].productid2;
                  }else{
                    items.prod_no = res.data[0].prodno;
                  }
                }
              }
            });
            // items.aa = Number(new Big(items.quantity).times(items.price));
            money = new Big(money).plus(
              new Big(items.aa)
                .plus(items.additional_cost)
            );
            if (!items.batchno) {
              this.contract_name_button = false;
            }
          });
          this.sale.total_money = Number(money);
          saler_contract_info(this.sale.customer_id).then(res => {
            this.corporation = res.data.customer_payment_days;
            for (var i in res.data.customer_payment_days) {
              if (res.data.customer_payment_days[i].checked == true) {
                this.sale.settle_type = res.data.customer_payment_days[i].name;
                this.sale.receive_money_date =
                  res.data.customer_payment_days[i].receiver_money_date;
                this.sale.payment_id = res.data.customer_payment_days[i].id;
              }
            }
            // res.data.info.receive_addresses.forEach((items, index) => {
            //   if (items.type == 1) {
            //     this.receive_invoice_addresses.push(items);
            //   } else {
            //     this.receive_goods_addresses.push(items);
            //   }
            // });
            this.customer_contacts = res.data.info.contacts;
            // this.sale.customer_contact =
            //     res.data.info.contacts.length > 0
            //         ? res.data.info.contacts[0].name
            //         : "";
            // this.sale.customer_mobile =
            //     res.data.info.contacts.length > 0
            //         ? res.data.info.contacts[0].mobile
            //         : "";
            // this.sale.customer_fax =
            //     res.data.info.contacts.length > 0
            //         ? res.data.info.contacts[0].fax
            //         : "";
            // this.sale.contract_number = res.data.number;
            this.sale.payment_id = res.data.corporation.payment_day_id;
            this.sale.receive_money_date =
              res.data.corporation.receiver_money_date;
            // this.sale.settle_type = res.data.corporation.settle_type;
            this.sale.detail.forEach(item => {
              item.if_declare_info = res.data.corporation
                ? res.data.corporation.if_declare_info
                : 0;
              item.if_auto_delivery = res.data.info.if_auto_delivery
                ? res.data.info.if_auto_delivery
                : 0;
            });
            this.receive_invoice_addresses = [];
            this.receive_goods_addresses = [];
            res.data.info.receive_addresses.forEach((items, index) => {
              if (items.type == 1) {
                this.receive_invoice_addresses.push(items);
              } else {
                this.receive_goods_addresses.push(items);
              }
            });
            if(this.sale.customer_id==17749){
              this.sale.delivery_address_id = this.receive_goods_addresses[0].id
              this.sale.invoice_address_id = this.receive_invoice_addresses[0].id
            }else{
              if(this.receive_invoice_addresses.length==1){
                this.sale.invoice_address_id = this.receive_invoice_addresses[0].id
              }
              if(this.receive_goods_addresses.length==1){
                this.sale.delivery_address_id = this.receive_goods_addresses[0].id
              }
            }
          });
          this.select_express_account_type(this.sale.express_account_type, 1);
          if (res.data.customer.country_code == "CHN") {
            this.sale.detail.forEach((items, index) => {
              // items.currency_id = 2;
              // items.invoice_type_id = "";
              items.trade_type = 2
            });
          } else {
            this.sale.detail.forEach((items, index) => {
              // items.currency_id = 1;
              // items.invoice_type_id = 5;
              items.trade_type = 1
            });
          }
            }
          this.currency_id = this.sale.detail[0].currency_id
          this.pre = res.data.contract_number_info.pre
          this.number = res.data.contract_number_info.number
          this.sale.contract_number = res.data.contract_number_info.pre+res.data.contract_number_info.number
          this.contract_address()
        }else{
          this.$message({
              message: res.msg,
              type: 'error'
          })
          this.close_a()
        }
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.supply_list = res.data;
            this.supply_list.forEach((items, index) => {
              if (items.country_code) {
                this.supply_list[index].disabled = false;
              } else {
                this.supply_list[index].disabled = true;
              }
            });
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    handleSelect_contact(item) {
      this.sale.customer_contact = "";
      this.sale.customer_mobile = "";
      this.sale.customer_fax = "";
      this.sale.customer_contact = item.name;
      this.sale.customer_mobile = item.mobile;
      this.sale.customer_fax = item.fax;
    },
    supplyChange() {
      (this.sale.delivery_address_id = ""),
        (this.sale.invoice_address_id = ""),
        (this.sale.express_company_id = ""),
        (this.sale.express_account = ""),
        (this.sale.express_account = ""),
        (this.sale.customer_contact = ""),
        (this.sale.customer_mobile = ""),
        (this.sale.customer_fax = ""),
        this.sale.settle_type = ''
        this.sale.customer_id = this.sale.customer_name?this.supply_list.filter(item => {
          return item.name == this.sale.customer_name;
        })[0].id:''
      let country_code = this.sale.customer_name?this.supply_list.filter(item => {
        return item.name == this.sale.customer_name;
      })[0].country_code:'';
      if (country_code == "CHN") {
        this.sale.detail.forEach((items, index) => {
          // items.currency_id = 2;
          items.invoice_type_id = 1;
          items.trade_type = 2
        });
      } else {
        this.sale.detail.forEach((items, index) => {
          // items.currency_id = 1;
          items.invoice_type_id = 2;
          items.trade_type = 1
        });
      }
      if(this.sale.customer_id){
          saler_contract_info(this.sale.customer_id).then(res => {
            this.corporation = res.data.customer_payment_days;
            for (var i in res.data.customer_payment_days) {
              if (res.data.customer_payment_days[i].checked == true) {
                this.sale.settle_type = res.data.customer_payment_days[i].name;
                this.sale.receive_money_date =
                  res.data.customer_payment_days[i].receiver_money_date;
                this.sale.payment_id = res.data.customer_payment_days[i].id;
              }
            }
            this.customer_contacts = res.data.info.contacts;
            this.sale.customer_contact =
              res.data.info.contacts.length > 0
                ? res.data.info.contacts[0].name
                : "";
            this.sale.customer_mobile =
              res.data.info.contacts.length > 0
                ? res.data.info.contacts[0].mobile
                : "";
            this.sale.customer_fax =
              res.data.info.contacts.length > 0
                ? res.data.info.contacts[0].fax
                : "";
            // this.sale.contract_number = res.data.number;
            if (res.data.number) {
              this.contract_name_button = false;
            } else {
              this.contract_name_button = true;
            }
            this.sale.payment_id = res.data.corporation.payment_day_id;
            this.sale.receive_money_date = res.data.corporation.receiver_money_date;
            // this.sale.settle_type = res.data.corporation.settle_type;
            this.sale.detail.forEach(item => {
              item.if_declare_info = res.data.corporation
                ? res.data.corporation.if_declare_info
                : 0;
              item.if_auto_delivery = res.data.info.if_auto_delivery
                ? res.data.info.if_auto_delivery
                : 0;
            });
            this.receive_invoice_addresses = [];
            this.receive_goods_addresses = [];
            res.data.info.receive_addresses.forEach((items, index) => {
              if (items.type == 1) {
                this.receive_invoice_addresses.push(items);
              } else {
                this.receive_goods_addresses.push(items);
              }
            });
            if(this.sale.customer_id==17749){
              this.sale.delivery_address_id = this.receive_goods_addresses[0].id
              this.sale.invoice_address_id = this.receive_invoice_addresses[0].id
            }else{
              if(this.receive_invoice_addresses.length==1){
                this.sale.invoice_address_id = this.receive_invoice_addresses[0].id
              }
              if(this.receive_goods_addresses.length==1){
                this.sale.delivery_address_id = this.receive_goods_addresses[0].id
              }
            }
          });
      }
      this.select_express_account_type(this.sale.express_account_type);
      if(!this.sale.customer_name){
        this.supply_list = []
        this.corporation = []
      }
    },
    supplyChange_a(){
      this.receive_invoice_addresses = [];
      this.receive_goods_addresses = [];
      saler_contract_info(this.sale.customer_id).then(res=>{
        this.corporation = res.data.customer_payment_days;
        res.data.info.receive_addresses.forEach((items, index) => {
            if (items.type == 1) {
              this.receive_invoice_addresses.push(items);
            } else {
              this.receive_goods_addresses.push(items);
            }
        });
      })
    },
    select_express_account_type(id, clear) {
      if (!clear) {
        (this.sale.express_company_id = ""),
          (this.sale.express_account = ""),
          (this.express_company = []);
        this.account = [];
      }
      if (id == 2) {
        //个人
        if (this.sale.customer_name != "") {
          get_deliver_goods(this.sale.customer_id, id).then(res => {
            if (res.data.length == 0) {
              this.express_company = this.enum_express_company;
            } else {
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
            }
          });
        }
      } else if (id == 1) {
        get_deliver_goods(this.sale.corp_id, id).then(res => {
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
      }
    },
    select_express_company(id) {
      this.sale.express_account = "";
      this.account = this.get_deliver_goods[id];
    },
    change_quantity(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        // if (items.quantity && items.quantity > 0) {
          items.aa = new Big(items.quantity).times(items.price).toFixed(2);
          money = new Big(money).plus(
            new Big(items.aa).plus(items.additional_cost)
          );
        // }
      });
      this.sale.total_money = Number(money);
    },
    change_price(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        // if (items.price && items.price > 0) {
          items.aa = new Big(items.quantity).times(items.price).toFixed(2);
          money = new Big(money).plus(
            new Big(items.aa).plus(items.additional_cost)
          );
        // }
      });
      this.sale.total_money = Number(money);
    },
    change_money(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        if (items.quantity && items.quantity > 0) {
          items.price = new Big(items.aa).div(items.quantity).toFixed(2);
        }else{
          items.price = 0
        }
        money = new Big(money).plus(
          new Big(items.aa).plus(items.additional_cost)
        );
      });
      this.sale.total_money = Number(money);
    },
    get_index(index) {
      this.detail_index = index;
    },
    querySearchAsync_contact(queryString, cb) {
      var restaurants = this.customer_contacts;
      cb(restaurants);
    },
    querySearchAsync(queryString, cb) {
      if (queryString != "") {
        // queryString = queryString.replace(/\s/g, "");
        cas_info(queryString).then(res => {
          var restaurants = res.data;
          var results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants;
          this.timeout = setTimeout(() => {
            cb(results);
          }, 1000);
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
      this.sale.settle_type = "";
      saler_contract_info(item.id).then(res => {
        this.corporation = res.data.customer_payment_days;
        for (var i in res.data.customer_payment_days) {
          if (res.data.customer_payment_days[i].checked == true) {
            this.sale.settle_type = res.data.customer_payment_days[i].name;
            this.sale.receive_money_date =
              res.data.customer_payment_days[i].receiver_money_date;
            this.sale.payment_id = res.data.customer_payment_days[i].id;
          }
        }
        this.sale.customer_contact = res.data.info.contacts[0].name;
        this.sale.customer_mobile = res.data.info.contacts[0].mobile;
        this.sale.customer_fax = res.data.info.contacts[0].fax;
        // this.sale.contract_number = res.data.number;
        this.sale.payment_id = res.data.customer_payment_days.payment_day_id;
        this.sale.receive_money_date = res.data.customer_payment_days.receiver_money_date;
        this.sale.settle_type = res.data.customer_payment_days.settle_type;
        res.data.info.receive_addresses.forEach((items, index) => {
          if (items.type == 1) {
            this.receive_invoice_addresses.push(items);
          } else {
            this.receive_goods_addresses.push(items);
          }
        });
      });
    },
    cas_change(index){
      if(!this.sale.detail[index].cas){
        this.sale.detail[index].prod_no = ''
      }
    },
    handleSelect(item) {
      this.sale.detail[this.detail_index].product_name_cn = item.name_cn;
      this.sale.detail[this.detail_index].product_name = item.name;
      this.sale.detail[this.detail_index].prod_id = item.prod_id;
      this.sale.detail[this.detail_index].prodno = item.prodno;
      this.sale.detail[this.detail_index].productid2 = item.productid2;
      this.sale.detail[this.detail_index].cas = item.cas;

      if(this.sale.detail[this.detail_index].cas_old!=item.cas&&!this.flag_map[this.user_flag]){
        this.sale.detail[this.detail_index].prodno_is = false
        if(this.sale.detail[this.detail_index].currency_id==2){
          this.sale.detail[this.detail_index].prod_no = item.productid2;
        }else{
          this.sale.detail[this.detail_index].prod_no = item.prodno;
        }
      }
      this.sale.detail[this.detail_index].cas_old = item.cas;
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
      // this.sale.corp_contact = "";
      // this.sale.corp_mobile = "";
      // this.sale.corp_fax = "";
      if (id) {
        corp_info(id).then(res => {
          this.sale.corp_name = res.data.info.name;
          // this.sale.corp_contact = res.data.info.contacts.length>0?res.data.info.contacts[0].name:'';
          // this.sale.corp_mobile = res.data.info.contacts.length>0?(res.data.info.contacts[0].phone? res.data.info.contacts[0].phone: res.data.info.contacts[0].mobile):'';
          // this.sale.corp_fax = res.data.info.contacts.length>0?res.data.info.contacts[0].fax:'';
          this.sale.corp_mobile = res.data.corporation.mobile?res.data.corporation.mobile:''
          this.sale.corp_fax = res.data.corporation.fax?res.data.corporation.fax:''
          this.sale.expdate_end = res.data.corporation.expdate;
          this.sale.contract_address = res.data.corporation.signed_address;
          this.sale.contract_date = res.data.corporation.contractdate;
          this.sale.transportation = res.data.corporation.transportation;
          this.sale.quality_stardard = res.data.corporation.quality_stardard;
          this.sale.reasonable_loss = res.data.corporation.reasonable_loss;
          this.sale.package_stardard = res.data.corporation.package_stardard;
          this.sale.accept_stardard = res.data.corporation.accept_mode;
        });
        this.select_express_account_type(this.sale.express_account_type);
      }
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
    show_dialog(item,index) {
      this.index = index;
      if(!item.additional||item.additional.length==0){
        this.additional=[
              {
                additional_type_id: "",
                price: ""
              }
            ]
      }else{
        this.additional = item.additional
      }
      this.dialogVisible = true;
    },
    hide_dialogVisible() {
      this.dialogVisible = false;
        let num = 0;
        this.additional.forEach((item, index) => {
          if(item.price){
            num = new Big(num).plus(item.price);
          }
        });
        this.sale.detail[this.index].additional_cost = Number(num);
        this.sale.detail[this.index].additional = this.additional;
        let money = 0;
        this.sale.detail.forEach((items, index) => {
          money = new Big(money).plus(
            new Big(items.aa)
              .plus(items.additional_cost)
          );
        });
        this.sale.total_money = Number(money);
    },
    add_demand() {
      let test_item = JSON.parse(JSON.stringify(this.test_item));
      this.sale.detail.push({
        inquiry_id: "",
        cas: "",
        batchno: "",
        product_name: "",
        product_name_cn: "",
        package: "",
        purity: "",
        quantity: "",
        quantity_unit: this.sale.detail[0].quantity_unit,
        currency_id: this.sale.detail[0].currency_id,
        price: "",
        leadtime: "",
        prod_no: "",
        prod_id: "",
        invoice_type_id: this.sale.detail[0].invoice_type_id,
        inventory_auto_preempt:2,
        additional: [
          {
            additional_type_id: "",
            price: ""
          }
        ],
        is_straight_hair:0,
        straight_hair_note:'',
        additional_cost: 0,
        checked_items: test_item,
        checked_requirement: "",
        package_requirement: "",
        deliver_note: "",
        label_requirement: "",
        file_requirement: "",
        product_file: [],
        if_declare: 0,
        trade_type: "",
        required_delivery_date: "",
        if_auto_delivery: 0,
        is_generation: 0,
        is_transfer:1,
        transfer_warehouse_id:'',
        commission:''
      });
    },
    add_cost() {
      this.additional.push({
        additional_type_id: "",
        price: ""
      });
    },
    cost_close(){
      this.dialogVisible = false;
      this.additional= [
              {
                additional_type_id: "",
                price: ""
              }
            ]
    },
    open(msg) {
        this.$confirm(msg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.save()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      },
    check_save(){
      if(this.sale.customer_id){
        check_customer_account_period(this.sale.customer_id).then(res=>{
          if (res && res.code == 0){
            this.save()
          }else if(res && res.code == 10){
            this.open(res.msg)
          }else{
            this.$message.error(res.msg)
          }
        })
      }else{
        this.save()
      }
    },
    save() {
      this.sales = JSON.parse(JSON.stringify(this.sale));
      this.sales.detail.forEach((i, j) => {
        var arr = [];
        i.checked_items.forEach((item, index) => {
          if (item.checked == true) {
            arr.push(item);
          }
        });
        i.checked_items = arr;
        i.checked_items.forEach(m => {
          var brr = [];
          m.child.forEach(n => {
            if (n.checked == true) {
              brr.push(n);
            }
          });
          m.child = brr;
        });
      });
      this.sales.currency_id = this.sales.detail[0].currency_id;
      this.sales.detail.forEach((items, index) => {
        // items.currency_id = this.sales.currency_id;
        if (items.additional_cost == 0) {
          delete items.additional;
        }
        items.total_money = Number(new Big(items.aa).plus(items.additional_cost)).toFixed(2)
      });
      this.sales.payment_id = 0
      for (var i in this.corporation) {
        if (this.sales.settle_type == this.corporation[i].name) {
          this.sales.receive_money_date = this.corporation[
            i
          ].receiver_money_date;
          this.sales.payment_id = this.corporation[i].id;
        }
      }
      saler_create(this.sales, this);
    },
    close() {
        let that=this
        that.$router.push({
        path: "/sales/sales",
        name: "sales-sales"
      });
      var tagName = 'sales-generate'
        that.closeAdd({tagName})
        that.loading = false
    },
    close_a(){
      let that=this
      that.$router.push({
        path: "/sales/sales",
        name: "sales-ss_generate"
      });
      var tagName = 'sales-generate'
      that.closeAdd({tagName})
    },
    delete_cost(index) {
      this.additional.splice(index,1)
    },
    delete_sale(item, index) {
      // if (item.id) {
      //   destroy(item, "hs", "destroy", this, index);
      // } else {
        this.sale.detail.splice(index, 1);
      // }
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        money = new Big(money).plus(
          new Big(items.quantity).times(items.price).plus(items.additional_cost)
        );
      });
      this.sale.total_money = Number(money);
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
    delivery_edit() {
      if (this.sale.customer_id) {
        this.$i18n.locale=='cn'?this.titleAddresses = "收货地址":this.titleAddresses = "Shipping address"
        country_list().then(res => {
          this.country = res.data;
        });
        receive_address(this.sale.customer_id, 2).then(res => {
          this.check_total = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.addressList = res.data;
          // this.receive_goods_addresses=res.data;
          this.receive_goods_addresses = [];
          res.data.forEach(item => {
            if (!item.deleted_at) {
              this.receive_goods_addresses.push(item);
            }
          });
          let num = 0;
          this.receive_goods_addresses.forEach((items, index) => {
            if (items.id != this.sale.delivery_address_id) {
              num++;
            }
          });
          if (num == this.receive_goods_addresses.length) {
            this.sale.delivery_address_id = "";
          }
          this.dialogAddresses = true;
          this.user_type = res.enum.user_type;
          if (res.data.length == 0) {
            this.addresses = false;
          }
        });
        this.addressItem.type = 2;
      }
    },
    invoice_edit() {
      if (this.sale.customer_id) {
        this.$i18n.locale=='cn'?this.titleAddresses = "收票地址":this.titleAddresses = "Ticket collection address"
        country_list().then(res => {
          this.country = res.data;
        });
        receive_address(this.sale.customer_id, 1).then(res => {
          this.check_total = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.addressList = res.data;
          // this.receive_invoice_addresses=res.data;
          this.receive_invoice_addresses = [];
          res.data.forEach(item => {
            if (!item.deleted_at) {
              this.receive_invoice_addresses.push(item);
            }
          });
          let num = 0;
          this.receive_invoice_addresses.forEach((items, index) => {
            if (items.id != this.sale.invoice_address_id) {
              num++;
            }
          });
          if (num == this.receive_invoice_addresses.length) {
            this.sale.invoice_address_id = "";
          }
          this.dialogAddresses = true;
          this.user_type = res.enum.user_type;
          if (res.data.length == 0) {
            this.addresses = false;
          }
        });
        this.addressItem.type = 1;
      }
    },
    account_edit_api() {
      if (this.sale.express_account_type == 2 && this.sale.customer_id) {
        deliver_good(this.sale.customer_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      } else if (this.sale.express_account_type == 1 && this.sale.corp_id) {
        deliver_good(this.sale.corp_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      }
    },
    account_edit() {
      if (this.sale.express_account_type == 2 && this.sale.customer_id) {
        deliver_good(this.sale.customer_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.$i18n.locale=='cn'?this.titleDeliver = "个人账户":this.titleDeliver = "Private account"
          this.dialogAccount = true;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      } else if (this.sale.express_account_type == 1 && this.sale.corp_id) {
        deliver_good(this.sale.corp_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.$i18n.locale=='cn'?this.titleDeliver = "公司账户":this.titleDeliver = "Corporate account"
          this.dialogAccount = true;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      }
    },
    delete_receive_good() {
      this.dialogAddresses = false;
      this.addressItem = {
        country_code: "",
        city_id: "",
        city: [],
        address: "",
        contact_name: "",
        mobile: "",
        email: "",
        is_default: 0,
        user_type: 101,
        member_id: "",
        type: ""
      };
    },
    update_address(item) {
      this.addressItem.country_code = item.country_code;
      this.addressItem.address = item.address;
      this.addressItem.contact_name = item.contact_name;
      this.addressItem.mobile = item.mobile;
      this.addressItem.email = item.email;
      // this.addressItem.user_type = item.user_type.toString();
      this.addressItem.is_default = item.is_default;
      this.addressItem.member_id = item.member_id;
      this.addressItem.id = item.id;
      city_list(item.country_code, "").then(res => {
        this.addressItem.city_id = item.city_id;
        this.$set(this.addressItem, "city", res.data);
      });
    },
    destory_address(item) {
      if (item.deleted_at) {
        item.enabled_state = 1;
      } else {
        item.enabled_state = 0;
      }
      var obj = {
        id: [],
        enabled_state: item.enabled_state
      };
      obj.id.push(item.id);
      receive_address_destory(
        obj,
        "saler_contract",
        "receive_address_destory",
        this
      );
    },
    selected_country_address(item) {
      if (item.city_id) {
        item.city_id = "";
      }
      item.city = []
      city_list(item.country_code, '').then(res=>{
        item.city = res.data
      })
    },
    save_receive_good(item) {
      if (item.id) {
        receive_address_update(item, item.id, this);
      } else {
        item.member_id = this.sale.customer_id;
        receive_address_create(item, this, "detail");
      }
    },
    update_deliver(item) {
      this.deliveryItem.express_company_id = item.express_company_id;
      this.deliveryItem.accounts = item.accounts;
      this.deliveryItem.id = item.id;
      this.deliveryItem.is_straight_hair = item.is_straight_hair;
      this.deliveryItem.member_id = item.member_id;
    },
    deliver_good_destory(item) {
      if (item.deleted_at) {
        item.enabled_state = 1;
      } else {
        item.enabled_state = 0;
      }
      var obj = {
        id: [],
        enabled_state: item.enabled_state
      };
      obj.id.push(item.id);
      deliver_good_destory(
        item,
        "saler_contract",
        "deliver_good_destory",
        this
      );
    },
    deliver_good_create(item) {
      if (item.id) {
        deliver_good_update(item, item.id, this);
      } else {
        if (this.sale.express_account_type == 2) {
          this.deliveryItem.member_id = this.sale.customer_id;
          deliver_good_create(item, this);
        } else if (this.sale.express_account_type == 1) {
          this.deliveryItem.member_id = this.sale.corp_id;
          deliver_good_create(item, this);
        }
      }
    },
    deliver_good_close(item) {
      this.dialogAccount = false;
      this.deliveryItem = {
        express_company_id: "",
        accounts: "",
        is_straight_hair: 0,
        member_id: ""
      };
    }
  }
};
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
