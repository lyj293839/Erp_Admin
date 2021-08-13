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
            <el-dialog :title="$t('sale.add.sale10')" :visible.sync="dialogVisible" width="50%">
              <!-- 要求附加额外费用 -->
              <el-table :data="item.additional" border style="width: 100%">
                <el-table-column :label="$t('sale.add.sale11')" align="center" min-width="80">
                  <!-- 费用名称 -->
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
                        :label="i.name"
                        :value="i.id"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sale.add.sale12')" align="center" min-width="80">
                  <!-- 金额 -->
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
                <el-table-column :label="$t('sale.add.sale13')" width="100">
                  <!-- 操作 -->
                  <template slot-scope="scope">
                    <el-button @click="delete_cost(scope.row)" type="primary" size="mini">-</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="add_cost" type="primary" size="mini">+</el-button>
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button>
                <!-- 取 消 -->
                <el-button type="primary" @click="hide_dialogVisible">{{$t('define')}}</el-button>
                <!-- 确 定 -->
              </span>
            </el-dialog>
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
                  <!-- <el-autocomplete
                    v-model="item.cas"
                    :fetch-suggestions="querySearchAsync"
                    @select="handleSelect"
                    disabled
                  >
                    <template slot-scope="{ item }">
                      <div @click="get_index(index)">{{ item.cas }}</div>
                    </template>
                  </el-autocomplete> -->
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
                  <el-select
                    v-model="item.invoice_type_id"
                    clearable
                    filterable
                    disabled
                    style="width: 140px;"
                    v-if="!item.is_old"
                  >
                    <el-option v-for="i in invoice_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                  <el-select
                    v-model="item.invoice_type_str"
                    clearable
                    filterable
                    disabled
                    style="width: 140px;"
                    v-else
                  >
                    <el-option v-for="i in invoice_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
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
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="i in item.test_item" :key="i.id" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                    <!-- <el-checkbox v-model="i.checked" @change="select_parent(index,i)" name="type"> -->
                      <span class="checked_items" style="font-weight: bold;">{{i.name}}</span>:
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
                <td>{{$t('sale.add.sale31')}}</td>
                <!-- 包装要求  -->
                <td colspan="5">
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
                      style="width: 100px;border: 1px solid #f2f2f2;"
                    >
                      <el-option v-for="i in units"  :key="i.id"  :label="i.name" :value="i.id"></el-option>
                    </el-select>
                  </div>
                </td>
                <td colspan="2">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale29')}}
                  <!-- 是否报关 -->
                </td>
                <td colspan="2">
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
                <td>{{$t('sale.add.sale33')}}</td>
                <!-- 标签要求 -->
                <td colspan="5">
                  <el-input v-model="item.label_requirement"></el-input>
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
                    v-if="!item.is_old"
                  ></el-date-picker>
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.required_delivery_date_str"
                    value-format="yyyy-MM-dd"
                    size="small"
                    v-else
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td>
                <!-- 随货文件 -->
                <td colspan="5">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id" name="type" style="margin-right:10px;">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td colspan="2">{{$t('sale.add.sale36')}}</td>
                <!-- 是否自动发货 -->
                <td colspan="5">
                  <el-radio-group v-model="item.if_auto_delivery">
                    <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio>
                    <!-- 乙方 -->
                    <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio>
                    <!-- 乙方 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale39')}}</td>
                <!-- 是否代发 -->
                <td colspan="5">
                  <el-radio-group v-model="item.is_generation">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                    <!-- 是 -->
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                    <!-- 否 -->
                  </el-radio-group>
                </td>
                <td colspan="2">{{$t('sale.add.sale294')}}</td>
                <td colspan="5">
                  <el-radio-group v-model="item.inventory_auto_preempt">
                    <el-radio v-for="i in inventory_auto_preempt_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
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
                <td colspan="2">{{$t('sale.index.sale74')}}</td><!-- 结算日期 -->
                <td colspan="5">{{item.settled_month}}</td>
              </tr>
              <tr>
                <td>是否中转</td>
                <td colspan="11">
                  <el-radio-group v-model="item.is_transfer">
                    <el-radio :label="2">{{$t('sale.add.sale40')}}</el-radio>
                    <el-radio :label="1">{{$t('sale.add.sale41')}}</el-radio>
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
                <td colspan="11">
                  <el-input v-model="item.checked_requirement"></el-input>
                </td>
                <td rowspan="3" align='center'>
                  <el-button type="primary" @click="edit_note(item)" size="mini">修改备注</el-button>
                </td>
              </tr>
              <tr>
                <td >{{$t('sale.add.sale34')}}</td>
                <!-- 发货备注 -->
                <td colspan="11">
                  <el-input v-model="item.deliver_note"></el-input>
                </td>
              </tr>
              <tr>
                <td >{{$t('sale.add.sale278')}}</td>
                <td colspan="11">
                  <el-input v-model="item.straight_hair_note"></el-input>
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
                <td colspan="11">{{item.expected_pay_date}}</td>
                <td rowspan="2" align='center'>
                  <el-button type="primary" @click="expected_pay_add(item)" style="margin-left:10px;" size="mini">填写</el-button>
                </td>
              </tr>
              <tr>
                <td>预计收款备注</td>
                <td colspan="11">{{item.expected_pay_remark}}</td>
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
                    <div>
                      <el-button type="primary" @click="settle_add(item.id)" size="mini">+</el-button>
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
                <th class="td" style="min-width:100px;">
                 第一负责人
                </th>
                <th class="td" style="min-width:150px;">
                  第二负责人
                </th>
              </tr>
              <tr>
                <td>
                  {{sale.contract_number}}
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
                  <el-select v-model="sale.sale_id" clearable filterable style="width:100%;">
                    <el-option
                      v-for="(i,index) in sale_list"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  {{getEnumValue(GEnums.Sales,persons_.persons_one)}}
                </td>
                <td>
                  {{getEnumValue(GEnums.Sales,persons_.persons_two)}}
                </td>
              </tr>
              <tr>
                <td>PO</td>
                <td>
                  <el-input v-model="sale.customer_po"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale48')}}
                  <!-- 结算方式 -->
                </td>
                <td colspan="3">
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
                  <el-select v-model="sale.trade_type_id" clearable filterable>
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
                <td>{{$t('sale.add.sale99')}}</td>
                <!-- 是否含税 -->
                <td>
                  <el-radio-group v-model="sale.if_invoice">
                    <el-radio :label="1">{{$t('sale.add.sale97')}}</el-radio>
                    <!-- 含税 -->
                    <el-radio :label="0">{{$t('sale.add.sale98')}}</el-radio>
                    <!-- 不含税 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale90')}}</td>
                <td colspan="6">
                  <el-input v-model="sale.transportation" @input="change_forceUpdate($event)"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale50')}}</td>
                <!-- 质量标准 -->
                <td colspan="6">
                  <el-input v-model="sale.quality_stardard" @input="change_forceUpdate($event)"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale51')}}</td>
                <!-- 合理损耗 -->
                <td colspan="6">
                  <el-input v-model="sale.reasonable_loss" @input="change_forceUpdate($event)"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale95')}}</td>
                <!-- 包装标准&运输方式 -->
                <td colspan="6">
                  <el-input v-model="sale.package_stardard" @input="change_forceUpdate($event)"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale53')}}</td>
                <!-- 验收标准 -->
                <td colspan="6">
                  <el-input v-model="sale.accept_stardard" @input="change_forceUpdate($event)"></el-input>
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
                  ></el-date-picker>
                </td>
                <td>{{$t('sale.add.sale55')}}</td>
                <!-- 有效期结束 -->
                <td colspan="1" class="dateInput">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="sale.expdate_end"
                    type="date"
                    size="small"
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
                  <el-input v-model="sale.note" @input="change_forceUpdate($event)"></el-input>
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
                    filterable
                    style="width: 80%"
                  >
                    <el-option
                      v-for="(i,index) in express_account_type"
                      :key="index"
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
                <td>
                  <el-autocomplete
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
              <tr>
                <td colspan="8" style="text-align:center;">
                  <el-button
                    type="primary"
                    size="mini"
                    style="color:white;"
                    :loading='loading_transport'
                    @click="save_transport()"
                  >{{$t('save')}}</el-button>
                  <!-- 保存 -->
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <div style="display:flex;justify-content: space-between;background:#F8DDDD;">
              <el-button type="text" @click="form_show8 = !form_show8" icon="el-icon-arrow-down">
                <b>1.{{$t('sale.add.sale119')}}</b>
                <!-- 收款数据 -->
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="from-item" v-show="form_show8">
            <table border="1" bordercolor="#E5E5E5" class="table_f" v-if="!(JSON.stringify(receipt_data)==='[]'&&JSON.stringify(refund_data)==='[]')">
              <tr>
                <td width="120">{{$t('sale.add.sale44')}}</td><!--合同号-->
                <td width="41">{{$t('sale.add.sale75')}}</td><!--类型-->
                <td width="80">登记{{$t('sale.add.sale108')}}</td><!--日期-->
                <td width="80">收款{{$t('sale.add.sale108')}}</td><!--日期-->
                <td width="200">{{$t('sale.add.sale120')}}</td><!--银行-->
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
              <tr v-for="item in sale.details" :key="item.id">
                <td v-if="receipt_data[item.id]">
                  {{item.contract_number}}
                </td>
                <td class="td_padd" colspan="14" v-if="receipt_data[item.id]" style="padding:0px;">
                  <table border="1" bordercolor="#E5E5E5" class="table_f" style="width:100%;">
                    <tr v-for="item_i in receipt_data[item.id]">
                      <td width="40" style="color:#67C23A;">{{$t('sale.add.sale138')}}</td><!--收款-->
                      <td width="80">{{item_i.created_at.trim().split(" ")[0]}}</td>
                      <td width="80">{{item_i.checked_date}}</td>
                      <td width="200">
                        <span v-if="item_i.bank_id">{{getEnumValue(bank_info,item_i.bank_id)}}</span>
                        <span v-else>
                          {{getEnumValue(Account,item_i.account_id,'account_name')}}
                          <span v-if="getEnumValue(Account,item_i.account_id,'account')">{{'-'+getEnumValue(Account,item_i.account_id,'account')}}</span>
                          <span v-if="getEnumValue(Account,item_i.account_id,'currency')">{{'-'+getEnumValue(Account,item_i.account_id,'currency')}}</span> 
                        </span>
                      </td>
                      <td width="80">
                        {{Number(item_i.bank_fee)+Number(item_i.checkin)+Number(item_i.currentaccount)}}
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
                      <td>{{item_i.note}}</td>
                      <td
                        width="70"
                      >{{getEnumValue(pay_status_info,item_i.pay_status)}}</td>
                      <td
                        width="79"
                        :style="item_i.status==1?'color:green;':'color:red;'"
                      >{{item_i.status!=null?getEnumValue(obsolete_status_info,item_i.status):''}}</td>
                    </tr>
                    <tr v-for="item_j in refund_data[item.id]">
                      <td style="color:#F56C6C;">{{$t('sale.add.sale139')}}</td><!--退款-->
                      <td>{{item_j.created_at.trim().split(" ")[0]}}</td>
                      <td>{{item_j.checked_date}}</td>
                      <td>
                        {{item_j.opening_bank}}
                        <br />
                        {{item_j.payee}}
                        <br />
                        {{item_j.bank_account_number}}
                      </td>
                      <td>{{item_j.total_money?item_j.total_money:0}}{{item_j.currency_id?currencys.filter(res=>{return res.id == item_j.currency_id})[0].name:''}}</td>
                      <td>{{item_j.bank_fee?item_j.bank_fee:0}}{{item_j.currency_id?currencys.filter(res=>{return res.id == item_j.currency_id})[0].name:''}}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{{item_j.remark}}</td>
                      <td >
                        <span :style="item_j.pay_status==10?'color:red;':''">{{getEnumValue(pay_status_info,item_j.pay_status)}}</span>
                      </td>
                      <td :style="item_j.status==1?'color:green;':'color:red;'">
                        {{item_j.status!=null?refund_status_info.filter(res=>{return res.id == item_j.status})[0].name:''}}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <div style="display:flex;justify-content: space-between;background:#DBF1D9;">
              <el-button type="text" @click="form_show6 = !form_show6" icon="el-icon-arrow-down">
                <b>2.{{$t('sale.add.sale238')}}</b>
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
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <div style="display:flex;background:#FFE793;">
              <el-button type="text" @click="form_show7 = !form_show7" icon="el-icon-arrow-down">
                <b>3.{{$t('sale.add.sale110')}}</b>
                <!-- 发货数据 -->
              </el-button>
              <span @click="see_list()" style="font-size:12px;margin-left:5px;cursor: pointer;color:#909399;">(查看更多...)</span>
            </div>
          </el-form-item>
          <el-form-item class="from-item" v-show="form_show7">
            <table class="table_f" border="1" bordercolor="#E5E5E5" v-for="item in ship_notice_list" style="margin-bottom:20px;" v-if="ship_notice_list.length>0">
              <tr style="background:#EAF2F7;font-weight:bold;">
                <td width='150'>{{$t('sale.add.sale243')}}</td><!-- 通知单ID -->
                <td width='140'>{{$t('sale.add.sale183')}}</td><!-- 通知时间 -->
                <td width='110'>{{$t('sale.add.sale164')}}</td><!-- 申请人 -->
                <td width='220'>{{$t('sale.add.sale250')}}</td><!-- 运单号 -->
                <td width='80'>{{$t('sale.add.sale248')}}</td><!-- 发货人 -->
                <td width='100'>{{$t('sale.add.sale249')}}</td><!-- 运输公司 -->
                <td>{{$t('sale.add.sale247')}}</td><!-- 发货确认日期 -->
              </tr>
              <tr>
                <td>{{item.id}}</td>
                <td>{{item.created_at}}</td>
                <td>{{item.sales.name}}</td>
                <td>
                  <div v-if="item.combine_ship">
                  <span v-if="item.combine_ship.logistic" v-for="j in item.combine_ship.logistic">{{j.waybill_number}}<br></span>
                  </div>
                </td>
                <td>
                  <div v-if="item.combine_ship">
                    <span v-if="item.combine_ship.logistic" v-for="j in item.combine_ship.logistic">{{getEnumValue(Users,j.user_id)}}<br></span>
                  </div>
                </td>
                <td>
                  <div v-if="item.combine_ship">
                    <span v-if="item.combine_ship.logistic" v-for="j in item.combine_ship.logistic">{{getEnumValue(enum_express_company,j.express_company_id)}}<br></span>
                  </div>
                </td>
                <td>
                  {{item.invoice_number}}
                  {{item.combine_ship?item.combine_ship.shipment_date:''}}
                </td>
              </tr>
              <tr>
                <td><b>{{$t('sale.add.sale252')}}:</b></td>
                <td colspan="6">
                  {{item.ship_notice_address.filter(res=>{return res.type == 2})[0].address}}
                  {{item.ship_notice_address.filter(res=>{return res.type == 2})[0].contact_name}}
                  {{item.ship_notice_address.filter(res=>{return res.type == 2})[0].mobile}}
                </td>
              </tr>
              <tr style="background:#F5F8FB;">
                <td>
                  {{$t('sale.add.sale190')}}
                </td><!-- 批次 -->
                <td>CAS</td><!-- CAS -->
                <td>销售子合同号</td>
                <td>{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
                <td>{{$t('sale.add.sale17')}}</td><!-- 纯度 -->
                <td>{{$t('sale.add.sale251')}}</td><!-- 通知数量 -->
                <td width='100'>{{$t('sale.add.sale234')}}</td><!-- 通知状态 -->
              </tr>
              <tr v-for="(i,index) in item.notice" v-show="i.contract_detail_number_show">
                <td>
                  <span @click="purchase_batchno(i.inventory_id)" style="color:#409EFF;cursor: pointer;">{{i.batchno}}</span>
                </td>
                <td>{{i.cas}}</td>
                <td>{{i.contract_detail_number}}</td>
                <td>{{i.prod.name}}</td>
                <td>{{i.inventory?i.inventory.purity:''}}</td>
                <td>
                  <div
                    v-if="i.preout.type==2"
                  >{{i.preout.quantity}}{{getEnumValue(units,i.preout?i.preout.quantity_unit:'')}}</div>
                  <div
                    v-else
                  >
                  {{i.preout.package_nums}}*{{i.packs?i.packs.packsize:''}}{{getEnumValue(units,i.packs?i.packs.unit_id:'')}}
                  ({{i.preout.quantity}}{{getEnumValue(units,i.preout?i.preout.quantity_unit:'')}})</div> 
                </td>
                <td>{{getEnumValue(notice_status_info,i.status)}}</td>
              </tr>
            </table>
            <el-form class="font_b" v-if="return_list.length>0">
              <el-form-item class="from-item" :label="$t('sale.add.sale115')+':'"><!-- 退货数据： -->
                <table border="1" bordercolor="#E5E5E5">
                  <tr>
                    <td width='100'>{{$t('sale.add.sale44')}}</td><!-- 合同号 -->
                    <td width='150'>{{$t('sale.add.sale253')}}</td><!-- 批次号 -->
                    <td width='100'>CAS</td><!-- CAS -->
                    <td width='260'>{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
                    <td width='100'>{{$t('sale.add.sale116')}}</td><!-- 退货数量 -->
                    <td width='100'>{{$t('sale.add.sale117')}}</td><!-- 退货应收额 -->
                    <td>{{$t('sale.add.sale59')}}</td><!-- 备注 -->
                    <td width='60'>{{$t('sale.add.sale118')}}</td><!-- 货要退回 -->
                    <td width='60'>{{$t('sale.add.sale105')}}</td><!-- 审核状态 -->
                    <td width='60'>{{$t('sale.add.sale254')}}</td><!-- 退货状态 -->
                  </tr>
                  <tr v-for="item in return_list">
                    <td>{{item.contract_no}}</td>
                    <td>{{item.batchno}}</td>
                    <td>{{item.cas}}</td>
                    <td>{{item.prod_name}}</td>
                    <td>
                      {{item.quantity}}
                      {{getEnumValue(units,item.quantity_unit_id)}}
                    </td>
                    <td>{{item.money}}{{getEnumValue(currencys,item.currency_id)}}</td>
                    <td>{{item.return_note}}</td>
                    <td>{{getEnumValue(return_type_info,item.return_type)}}</td>
                    <td>{{getEnumValue(return_status_info,item.status)}}</td>
                    <td>{{getEnumValue(return_goods_status,item.return_status)}}</td>
                  </tr>
                </table>
              </el-form-item>
            </el-form>
            <el-dialog :visible.sync="batchnoDialog" width="72%" @close='batchnoClose()'>
              <table border="1" bordercolor="#E5E5E5" class="table_f" v-if="procurement_contract_list_batchno.length>0">
                <tr style="background:#EAF2F7;">
                  <td width='100'>{{$t('sale.add.sale44')}}</td><!-- 合同号 -->
                  <td width='60'>{{$t('sale.add.sale224')}}</td><!-- 采购 -->
                  <td width='100'>{{$t('sale.add.sale253')}}</td><!-- 批号 -->
                  <td width='100'>CAS</td><!-- CAS -->
                  <td width='200'>{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
                  <td width='60'>{{$t('sale.add.sale16')}}</td><!-- 规格 -->
                  <td width='60'>{{$t('sale.add.sale18')}}</td><!-- 数量 -->
                  <td width='60'>{{$t('sale.add.sale21')}}</td><!-- 单价 -->
                  <td width='60'>{{$t('sale.add.sale12')}}</td><!-- 金额 -->
                  <td width='60'>{{$t('sale.add.sale128')}}</td><!-- 付款状态 -->
                  <td width='60'>{{$t('sale.add.sale255')}}</td><!-- 发票状态 -->
                  <td width='80'>{{$t('sale.add.sale256')}}</td><!-- 开票日期 -->
                  <td width='60'>{{$t('sale.add.sale257')}}</td><!-- 入库状态 -->
                  <!--<td>供应商评价</td>-->
                  <td width='60'>{{$t('sale.add.sale105')}}</td><!-- 审核状态 -->
                </tr>
                <tr v-for="item in procurement_contract_list_batchno">
                  <td>{{item.procurement_contract_number}}</td>
                  <td>{{attr(item,'purchase_user.name')}}</td>
                  <td>
                    <span v-for="itm in item.inventories">
                      {{itm.batchno}}<br>
                    </span>
                  </td>
                  <td>{{item.cas}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.package}}</td>
                  <td>{{item.quantity}}{{getEnumValue(units,Number(item.quantity_unit))}}</td>
                  <td>{{item.price}}</td>
                  <td>{{item.total_price}}{{getEnumValue(currencys,item.currency_id)}}</td>
                  <td>
                    <!-- <div v-if="item.pay_result==5" style="background-color: rgb(255, 193, 7);">已申请</div>
                    <div v-if="item.pay_result==1" style="background-color: #FFF0DD;">部分付款</div>
                    <div v-if="item.pay_result==2" style="background-color: #FFC0CB;">付款完成</div>
                    <div v-if="item.pay_result==3" style="background-color: #F5DEB3;">超额付款</div>
                    <div v-if="item.pay_result==0||item.pay_result==6">未申请</div>
                    <div v-if="item.pay_result==9" style="background-color: lightgrey;">处理中</div> -->
                    <span>{{getEnumValue(pay_status_procurement,item.pay_result)}}</span>
                  </td>
                  <td>
                    <span>{{getEnumValue(invoice_status_procurement,item.invoice_status)}}</span>
                  </td>
                  <td>
                    <span v-if="item.invoice.length>0">
                          {{item.invoice[0].invoice_date}}
                    </span>
                  </td>
                  <td>
                    <span
                            style="background-color: #FFF0DD;display: inline-block;width: 100%;"
                            v-if="item.storage_status==2"
                    >{{$t('sale.add.sale268')}}</span><!-- 部分入库 -->
                    <span
                            style="background-color: #FFC0CB;display: inline-block;width: 100%;"
                            v-if="item.storage_status==1"
                    >{{$t('sale.add.sale269')}}</span><!-- 已入库 -->
                    <span
                            style="background-color: #F5DEB3;display: inline-block;width: 100%;"
                            v-if="item.storage_status==4"
                    >{{$t('sale.add.sale270')}}</span><!-- 超额入库 -->
                    <span v-if="item.storage_status==0">{{$t('sale.add.sale271')}}</span><!-- 未入库 -->
                  </td>
                  <!--<td>{{}}</td>-->
                  <td>
                      <span v-if="item.purchase_contract.check_status==0">{{$t('sale.add.sale272')}}</span><!-- 待审核 -->
                      <span v-if="item.purchase_contract.check_status==1" class="green">{{$t('sale.add.sale273')}}</span><!-- 审核通过 -->
                      <span v-if="item.purchase_contract.check_status==-1">{{$t('sale.add.sale274')}}</span><!-- 审核未通过 -->
                      <span v-if="item.purchase_contract.check_status==3">{{$t('sale.add.sale275')}}</span><!-- 变更待审核 -->
                  </td>
                </tr>
              </table>
            </el-dialog>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <div style="display:flex;justify-content: space-between;background:#EBEEF5;">
              <el-button type="text" @click="form_show9 = !form_show9" icon="el-icon-arrow-down">
                <b>4.{{$t('sale.add.sale258')}}</b>
                <!-- 采购或库存情况 -->
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="from-item" v-show="form_show9">
            <table border="1" bordercolor="#E5E5E5" class="table_f" style="margin:10px 0px;" v-if="procurement_notice_list.length>0">
              <tr style="background:#EAF2F7;">
                <td>NoticeID</td><!-- NoticeID -->
                <td>{{$t('sale.add.sale223')}}</td><!-- 供应商名称 -->
                <td>{{$t('sale.add.sale224')}}</td><!-- 采购 -->
                <td>Cas</td><!-- Cas -->
                <td>{{$t('sale.add.sale17')}}</td><!-- 纯度 -->
                <td>{{$t('sale.add.sale225')}}</td><!-- 采购数量 -->
                <td>{{$t('sale.add.sale21')}}</td><!-- 单价 -->
                <td>{{$t('sale.add.sale12')}}</td><!-- 金额 -->
                <td>{{$t('sale.add.sale183')}}</td><!-- 通知时间 -->
                <td>{{$t('sale.add.sale105')}}</td><!-- 审核状态 -->
                <td>{{$t('sale.add.sale91')}}</td><!-- 状态 -->
              </tr>
              <tr v-for="item in procurement_notice_list">
                <td>{{item.id}}</td>
                <td>{{attr(item,'supplier.name')}}</td>
                <td>{{attr(item,'purchase.name')}}</td>
                <td>{{item.cas}}</td>
                <td>{{item.purity}}</td>
                <td>{{item.quantity}}{{getEnumValue(units,item.quantity_unit)}}</td>
                <td>{{item.price}}{{getEnumValue(currencys,item.currency_id)}}</td>
                <td>{{item.total_price}}{{getEnumValue(currencys,item.currency_id)}}</td>
                <td>{{item.created_at}}</td>
                <td>{{getEnumValue(check_status,item.check_status)}}</td>
                <td>{{getEnumValue(procurement_contract_status,item.contract_status)}}</td>
              </tr>
            </table>
            <table border="1" bordercolor="#E5E5E5" class="table_f" v-if="procurement_contract_list.length>0">
              <tr style="background:#EAF2F7;">
                <td width='100'>{{$t('sale.add.sale44')}}</td><!-- 合同号 -->
                <td width='50'>{{$t('sale.add.sale224')}}</td><!-- 采购 -->
                <td width='100'>{{$t('sale.add.sale253')}}</td><!-- 批号 -->
                <td width='100'>CAS</td><!-- CAS -->
                <td >{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
                <td width='50'>{{$t('sale.add.sale16')}}</td><!-- 规格 -->
                <td width='60'>{{$t('sale.add.sale18')}}</td><!-- 数量 -->
                <td width='100'>{{$t('sale.add.sale12')}}</td><!-- 金额 -->
                <td width='60'>{{$t('sale.add.sale128')}}</td><!-- 付款状态 -->
                <td width='60'>{{$t('sale.add.sale255')}}</td><!-- 发票状态 -->
                <td width='100'>{{$t('sale.add.sale256')}}</td><!-- 开票日期 -->
                <td width='60'>{{$t('sale.add.sale257')}}</td><!-- 入库状态 -->
                <!--<td>供应商评价</td>-->
                <td width='60'>{{$t('sale.add.sale105')}}</td><!-- 审核状态 -->
              </tr>
              <tr v-for="item in procurement_contract_list">
                <td>{{item.procurement_contract_number}}</td>
                <td>{{attr(item,'purchase_user.name')}}</td>
                <td>
                  <span v-for="itm in item.inventories">
                    {{itm.batchno}}<br>
                  </span>
                </td>
                <td>{{item.cas}}</td>
                <td>{{item.name}}</td>
                <td>{{item.package}}</td>
                <td>{{item.quantity}}{{getEnumValue(units,Number(item.quantity_unit))}}</td>
                <td>{{item.total_price}}{{getEnumValue(currencys,item.currency_id)}}</td>
                <td>
                   <span v-if="item.purchase_contract.procurement_pay_result">
                    <span v-if="Number(item.purchase_contract.procurement_pay_result.pay_requestamount)<=0">{{$t('sale.add.sale260')}}</span><!-- 未付款 -->
                    <span style="background-color: #FFF0DD;display: inline-block;width: 100%;" v-if="Number(item.purchase_contract.procurement_pay_result.pay_requestamount)>0 && Number(item.purchase_contract.procurement_pay_result.pay_requestamount)<Number(item.purchase_contract.total_money)">{{$t('sale.add.sale261')}}</span><!-- 部分付款 -->
                    <span style="background-color: #FFC0CB;display: inline-block;width: 100%;" v-if="Number(item.purchase_contract.procurement_pay_result.pay_requestamount)==Number(item.purchase_contract.total_money)">{{$t('sale.add.sale262')}}</span><!-- 全额付款 -->
                    <span style="background-color: #F5DEB3;display: inline-block;width: 100%;" v-if="Number(item.purchase_contract.procurement_pay_result.pay_requestamount)>Number(item.purchase_contract.total_money)">{{$t('sale.add.sale263')}}</span><!-- 超额付款 -->
                  </span>
                  <span v-else>{{$t('sale.add.sale260')}}</span><!-- 未付款 -->
                </td>
                <td>
                  <span v-if="item.invoice_status==4" style="background-color:#C0C0C0;display: inline-block;width: 100%;">
                    {{getEnumValue(procurement_contract_invoice_status,item.invoice_status)}}</span><!--不含税-->
                  <span
                          style="display: inline-block;width: 100%;"
                          v-if="item.invoice_status==0"
                  >{{getEnumValue(procurement_contract_invoice_status,item.invoice_status)}}</span><!-- 未收票 -->
                  <span
                          style="background-color: #FFF0DD;display: inline-block;width: 100%;"
                          v-if="item.invoice_status==1"
                  >{{getEnumValue(procurement_contract_invoice_status,item.invoice_status)}}</span><!-- 部分收票 -->
                  <span
                          style="background-color: #FFC0CB;display: inline-block;width: 100%;"
                          v-if="item.invoice_status==2"
                  >{{getEnumValue(procurement_contract_invoice_status,item.invoice_status)}}</span><!-- 全额收票 -->
                  <span
                          style="background-color: #F5DEB3;display: inline-block;width: 100%;"
                          v-if="item.invoice_status==3"
                  >{{getEnumValue(procurement_contract_invoice_status,item.invoice_status)}}</span><!-- 超额收票 -->
                </td>
                <td>
                  <span v-if="item.invoice.length>0">
                        {{item.invoice[0].invoice_date}}
                  </span>
                </td>
                <td>
                   <span
                           style="background-color: #FFF0DD;display: inline-block;width: 100%;"
                           v-if="item.storage_status==2"
                   >{{$t('sale.add.sale268')}}</span><!-- 部分入库 -->
                  <span
                          style="background-color: #FFC0CB;display: inline-block;width: 100%;"
                          v-if="item.storage_status==1"
                  >{{$t('sale.add.sale269')}}</span><!-- 已入库 -->
                  <span
                          style="background-color: #F5DEB3;display: inline-block;width: 100%;"
                          v-if="item.storage_status==4"
                  >{{$t('sale.add.sale270')}}</span><!-- 超额入库 -->
                  <span v-if="item.storage_status==0">{{$t('sale.add.sale271')}}</span><!-- 未入库 -->
                </td>
                <!--<td>{{}}</td>-->
                <td>
                     <span v-if="item.purchase_contract.check_status==0">{{$t('sale.add.sale272')}}</span><!-- 待审核 -->
                     <span v-if="item.purchase_contract.check_status==1" class="green">{{$t('sale.add.sale273')}}</span><!-- 审核通过 -->
                     <span v-if="item.purchase_contract.check_status==-1">{{$t('sale.add.sale274')}}</span><!-- 审核未通过 -->
                     <span v-if="item.purchase_contract.check_status==3">{{$t('sale.add.sale275')}}</span><!-- 变更待审核 -->
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <div style="display:flex;justify-content: space-between;background:#DCDFE6;">
              <el-button type="text" @click="form_show10 = !form_show10" icon="el-icon-arrow-down">
                <b>5.{{$t('sale.add.sale295')}}</b>
                <!-- 运费信息 -->
              </el-button>
            </div>
          </el-form-item>
          <el-form-item class="from-item" v-show="form_show10">
            <table border="1" bordercolor="#E5E5E5" class="table_f" style="margin-top:10px;" v-if="freights.length>0">
              <tr style="background:#EAF2F7;font-weight:bold;">
                <td :rowspan="freights.length+1" width='100' align='center' style="background:white;"><b>{{$t('sale.add.sale296')}}</b></td><!-- 运费登记 -->
                <td width='140'>{{$t('sale.add.sale44_')}}</td><!-- 子合同号 -->
                <td width='100'>{{$t('sale.add.sale67')}}</td><!-- 快递公司 -->
                <td width='200'>{{$t('sale.add.sale68')}}</td><!-- 快递单号 -->
                <td width='120'>{{$t('sale.add.sale297')}}</td><!-- 运费 -->
                <td>{{$t('sale.add.sale59')}}</td><!-- 备注 -->
              </tr>
              <tr v-for="item in freights">
                <td>{{item.contract_detail?item.contract_detail.contract_number:''}}</td>
                <td>{{getEnumValue(enum_express_company,item.express_company_id)}}</td>
                <td>{{item.waybill_number}}</td>
                <td>{{item.total_money?item.total_money:0}}{{getEnumValue(currencys,item.currency_id)}}</td>
                <td>{{item.remark}}</td>
              </tr>
            </table>
            <table border="1" bordercolor="#E5E5E5" class="table_f" v-if="ship_freights.length>0" style="margin:10px 0px;">
              <tr style="background:#EAF2F7;font-weight:bold;">
                <td :rowspan="ship_freights.length+1" width='100' align='center' style="background:white;"><b>发货运费</b></td>
                <td width='80'>合发ID</td>
                <td width='300'>合发子合同号</td>
                <td width='100'>快递公司</td>
                <td width='200'>快递单号</td>
                <td width='120'>运费</td>
                <td>备注</td>
              </tr>
              <tr v-for="item in ship_freights">
                <td>{{item.combine_shipping_notice_id}}</td>
                <td>
                  <span v-for="(i,index_i) in item.shipping_notice">
                    <span>
                      {{i.contract_detail_number}}
                      <span v-if="index_i!=(item.shipping_notice.length-1)">,</span>
                    </span>
                  </span>
                </td>
                <td>{{getEnumValue(enum_express_company,item.express_company_id)}}</td>
                <td>{{item.waybill_number}}</td>
                <td>{{item.total_money?item.total_money:0}}{{getEnumValue(currencys,item.currency_id)}}</td>
                <td>{{item.remark}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item
          class="from-item"
          style="text-align:center;"
        >
          <!-- <el-button type="primary" :loading="loading" @click="save()" size="mini">{{$t('save')}}</el-button> -->
          <!-- 保存 -->
          <el-button @click="close()" size="mini">{{$t('back')}}</el-button>
          <!-- 取消 -->
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
          <!-- 启用地址 -->
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
              <!-- 是/否 -->
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
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
              <!-- 是/否 -->
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
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
                <el-option
                  v-for="(i,index) in country"
                  :key="index"
                  :label="i.Name"
                  :value="i.Code"
                ></el-option>
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
                <el-option
                  v-for="(i,index) in addressItem.city"
                  :key="index"
                  :label="i.Name"
                  :value="i.ID"
                ></el-option>
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
          <!--开/关-->
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
              <td>{{$t('sale.add.sale67')}}</td>
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
                <el-button
                  type="primary"
                  size="mini"
                  @click="update_deliver(item)"
                >{{$t('sale.add.sale171')}}</el-button>
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
              <td>{{$t('sale.add.sale67')}}</td>
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
                <el-button
                  type="primary"
                  size="mini"
                  @click="update_deliver(item)"
                >{{$t('sale.add.sale171')}}</el-button>
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
            <el-form-item :label="$t('sale.add.sale67')" :required="true">
              <!-- 快递公司 -->
              <el-select
                v-model="deliveryItem.express_company_id"
                size="mini"
                placeholder="Please Select"
              >
                <el-option
                  v-for="(i,index) in express_company_"
                  :key="index"
                  :label="i.name"
                  :value="i.id"
                ></el-option>
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

    <!-- 预计收款 -->
    <el-dialog
      title="预计收款"
      :visible.sync="dialogExpected"
      width="40%"
    >
     <el-form label-width="110px">
       <el-form-item label="预计收款时间:">
        <el-date-picker
            v-model="expected_pay_form.expected_pay_date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            size="mini"
            style="width: 150px;"
          ></el-date-picker>
      </el-form-item>
      <el-form-item label="预计收款备注:">
        <el-input size="mini" type="textarea" v-model="expected_pay_form.expected_pay_remark"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button @click="expected_pay_save()" type="primary" size="mini">保存</el-button>
        <el-button size="mini" @click="dialogExpected=false">取消</el-button>
      </el-form-item>
     </el-form>
    </el-dialog>

    <!-- 结算备注 -->
    <el-dialog
      :title="$t('sale.add.sale293')"
      :visible.sync="dialogSettle"
      width="40%"
      @close="settle_close()"
    >
     <el-form label-width="60px">
      <el-form-item :label="$t('sale.add.sale59')">
        <el-input size="mini" type="textarea" v-model="settle_note.settlement_remark"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button @click="settle_save()" type="primary" size="mini">保存</el-button>
        <el-button size="mini" @click="settle_close()">取消</el-button>
      </el-form-item>
     </el-form>
    </el-dialog>

    <!-- 备注编辑 -->
    <el-dialog
      :title="$t('sale.add.sale59')"
      :visible.sync="dialogNote"
      width="40%"
    >
     <el-form label-width="80px">
      <el-form-item :label="$t('sale.add.sale28')">
        <el-input size="mini" type="textarea" v-model="note_data.checked_requirement"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sale.add.sale34')">
        <el-input size="mini" type="textarea" v-model="note_data.deliver_note"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sale.add.sale278')">
        <el-input size="mini" type="textarea" v-model="note_data.straight_hair_note"></el-input>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button @click="save_note()" type="primary" size="mini">保存</el-button>
        <el-button size="mini" @click="dialogNote = false">取消</el-button>
      </el-form-item>
     </el-form>
    </el-dialog>

  </d2-container>
</template>
<script>
import Big from "@/big/a/big.mjs";
import util from "@/libs/util";
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
  view_update,
  purchase_inventory_info,
  settlement_remark,
  expected_pay_date,
  update_detial_remark
} from "@/api/sale";
import $ from "jquery";
import { city_list, country_list } from "@/api/user";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-detail",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      check_total: false,
      loading_city:false,
      loading_transport:false,
      receipt_data:[],
      refund_data:[],
      return_list:[],
      check_list: [],
      ship_notice_list:[],
      freights:[],
      ship_freights:[],
      corporation:[],
      contract_detail_number_list:[],
      procurement_contract_list:[],
      procurement_contract_list_batchno:[],
      procurement_notice_list:[],
      check_total_account: false,
      check_account_list: [],
      corp: [],
      titleAddresses: "",
      department_id:'',
      department_id_index:'',
      dialogAddresses: false,
      dialogSettle:false,
      batchnoDialog:false,
      addresses: true,
      dialogExpected:false,
      dialogNote:false,
      addressList: [],
      invoice_notice_list:[],
      expected_pay_form:{},
      note_data:{},
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
      country: [],
      express_company: [],
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      form_show6: false,
      form_show7:false,
      form_show8:true,
      form_show9:false,
      form_show10:false,
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
      settle_note:{
        saler_contract_detail_id:'',
        settlement_remark:''
      },
      sale_list: [],
      Users:[],
      invoicing_type:[],
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
      check_status:[],
      return_type_info:[],
      obsolete_status_info:[],
      notice_status_info:[],
      status_info:[],
      product_file_info: [],
      checked: false,
      payment_type: [],
      return_goods_status:[],
      receive_invoice_addresses: [],
      receive_goods_addresses: [],
      get_deliver_goods: [],
      account: [],
      return_status_info:[],
      deal_status_info:[],
      pay_status_info:[],
      bank_info:[],
      refund_status_info:[],
      invoice_notice_return_statuses:[],
      statuses:[],
      procurement_contract_status:[],
      invoice_status_info:[],
      invoicing_status_info:[],
      pay_status_procurement:[],
      invoice_status_procurement:[],
      inventory_auto_preempt_info:[],
      procurement_contract_invoice_status:[],
      invoice_cate_info:[],
      save_show: false,
      check_contract: {
        saler_contract_id: "",
        approval_comment: "",
        status: ""
      },
      trade_type: [],
      Account:{},
      loading: false,
      persons_:{
        persons_one:'1',
        persons_two:'1'
      },
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-detail") {
        if (this.$route.query.id) {
          this.check_contract.saler_contract_id = this.$route.query.id;
          this.department_id_index = this.$route.query.department_id
          this.fetch_data();
        }
      }
    }
  },
  created() {
    this.department_id=util.cookies.get('department_id')
    if (this.$route.query.id) {
      this.check_contract.saler_contract_id = this.$route.query.id;
      this.department_id_index = this.$route.query.department_id
      this.$nextTick(()=>{
        this.fetch_data();
      })
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    change_forceUpdate(e){
      this.$forceUpdate()
    },
    edit_note(item){
      this.note_data = {
        saler_contract_detail_id:item.id,
        checked_requirement:item.checked_requirement,
        deliver_note:item.deliver_note,
        straight_hair_note:item.straight_hair_note
      }
      this.dialogNote = true
    },
    save_note(){
      update_detial_remark(this.note_data,this)
    },
    expected_pay_add(item){
      this.expected_pay_form = {
        expected_pay_date:item.expected_pay_date,
        expected_pay_remark:item.expected_pay_remark,
        saler_contract_detail_id:item.id
      }
      this.dialogExpected = true
    },
    expected_pay_save(){
      expected_pay_date(this.expected_pay_form,this)
    },
    settle_add(id){
      this.settle_note.saler_contract_detail_id = id
      this.dialogSettle = true
    },
    settle_save(){
      settlement_remark(this.settle_note,this)
    },
    settle_close(){
      this.dialogSettle = false
      this.settle_note = {
        saler_contract_detail_id:'',
        settlement_remark:''
      }
    },
    querySearchAsync_corporation(queryString, cb) {
        var restaurants = this.corporation;
        cb(restaurants);
    },
    handleSelect_corporation(item){
        this.sale.settle_type=item.name
        this.sale.payment_id=item.id
        this.sale.receiver_money_date = item.receiver_money_date
        this.$forceUpdate()
    },
    clear(){
        this.sale.payment_id=0
    },
    purchase_batchno(id){
      purchase_inventory_info(id).then(res=>{
        this.procurement_contract_list_batchno = res.data.procurement_contract_list
        this.batchnoDialog = true
        this.pay_status_procurement = res.enum.pay_status
        this.invoice_status_procurement = res.enum.invoice_status
      })
    },
    see_list(){
      this.ship_notice_list.forEach(item=>{
        var num = 0
        item.notice.forEach(i=>{
          if(i.contract_detail_number_show){
            num++
          }
        })
        if(num==item.notice.length){
          item.notice.forEach(i=>{
            if(this.contract_detail_number_list.indexOf(i.contract_detail_number)>-1){
              i.contract_detail_number_show = true
            }else{
              i.contract_detail_number_show = false
            }
          })
        }else{
          item.notice.forEach(i=>{
            i.contract_detail_number_show = true
          })
        }
        this.$forceUpdate()
      })
      
    },
    batchnoClose(){
      this.batchnoDialog = false
      this.procurement_contract_list_batchno = []
    },
    remoteMethod_city(query){
      // if (query) {
      //   this.loading_city = false;
      //       city_list(this.addressItem.country_code, '').then(res => {
      //         this.addressItem.city = res.data.filter(item => {
      //           return item.Name.toLowerCase()
      //             .indexOf(query.toLowerCase()) > -1;
      //         });
      //         this.loading_city = true;
      //       });
      //   } else {
      //     this.addressItem.city = []
      //   }
    },
    check_change() {
      this.check_list = [];
      this.addressList.forEach(res => {
        res.check = this.check_total;
        if (this.check_total) {
          this.check_list.push(res.id);
        }
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
    querySearchAsync_account(queryString, cb) {
      var restaurants = this.account;
      cb(restaurants);
    },
    handleSelect_account(item) {
      this.sale.express_account = item.accounts;
    },
    fetch_data() {
      saler_contract_detail(this.$route.query.id).then(res => {
        if(res.data.saler_contract.responsible_persons){
          res.data.saler_contract.responsible_persons.forEach(i=>{
            if(i.responsible_level_id==1101){
              this.persons_.persons_one = i.duty_user_id
            }else if(i.responsible_level_id==1102){
              this.persons_.persons_two = i.duty_user_id
            }
          })
        }
        res.data.saler_contract.detail = res.data.saler_contract.details;
        this.invoice_notice_list = res.data.invoice_notice_list
        this.ship_notice_list = res.data.ship_notice_list
        this.procurement_contract_list = res.data.procurement_contract_list
        this.procurement_notice_list = res.data.procurement_notice_list
        this.return_list = res.data.return_list
        this.freights = res.data.freights
        this.ship_freights = res.data.ship_freights
        this.sale = res.data.saler_contract;
        this.contract_detail_number_list = []
        res.data.saler_contract.details.forEach(i=>{
          i.invoice_type_str = Number(i.invoice_type_str)
          this.contract_detail_number_list.push(i.contract_number)
        })
        this.refund_data = res.data.refund_data
        this.receipt_data = res.data.receipt_data
        this.sale.express_account_type = res.data.saler_contract.express_account_type;
        this.sale.express_company_id = res.data.saler_contract.express_company_id;
        this.sale.express_account = res.data.saler_contract.express_account;
        this.sale.transportation = res.data.saler_contract.remarks?res.data.saler_contract.remarks.transportation:"";
        this.sale.quality_stardard =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.quality_stardard:"";
        this.sale.reasonable_loss =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.reasonable_loss:"";
        this.sale.package_stardard =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.package_stardard:"";
        this.sale.accept_stardard =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.accept_stardard:'';
        this.sale.note =  res.data.saler_contract.remarks?res.data.saler_contract.remarks.note:'';
        this.additional_cost_type = res.enum.additional_cost_type;
        this.address_type_info = res.enum.address_type_info;
        this.invoice_cate_info = res.enum.invoice_cate_info
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
        this.receive_invoice_addresses = [];
        this.receive_goods_addresses = [];
        this.trade_type = res.enum.trade_type;
        this.status_info = res.enum.status_info;
        this.deal_status_info = res.enum.deal_status_info
        this.invoice_notice_return_statuses = res.enum.invoice_notice_return_statuses
        this.statuses = res.enum.statuses
        this.notice_status_info = res.enum.notice_status_info
        this.return_type_info = res.enum.return_type_info
        this.return_status_info = res.enum.return_status_info
        this.pay_status_info = res.enum.pay_status_info
        this.bank_info = res.enum.bank_info
        this.refund_status_info = res.enum.refund_status_info
        this.return_goods_status = res.enum.return_goods_status
        this.procurement_contract_status = res.enum.procurement_contract_status
        this.check_status = res.enum.check_status
        this.obsolete_status_info = res.enum.obsolete_status_info
        this.invoicing_type = res.enum.invoicing_type
        this.invoicing_status_info = res.enum.invoicing_status_info
        this.invoice_status_info = res.enum.invoice_status_info
        this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info
        this.procurement_contract_invoice_status = res.enum.procurement_contract_invoice_status
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
        this.select_express_account_type(this.sale.express_account_type, 1);
        this.ship_notice_list.forEach(items=>{
          items.notice.forEach(i=>{
            if(this.contract_detail_number_list.indexOf(i.contract_detail_number)>-1){
              i.contract_detail_number_show=true
            }else{
              i.contract_detail_number_show=false
            }
          })
        })
        this.Users = this.GEnums.Users
        this.Account = this.GEnums.Account
      });
      sale_lists().then(res => {
        this.sale_list = res.data;
      });
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
              if (clear) {
                this.account = this.get_deliver_goods[
                  this.sale.express_company_id
                ];
              }
              this.enum_express_company.forEach((items, index) => {
                for (var key in res.data) {
                  if (items.id == key) {
                    express_company.push(items);
                  }
                }
              });
              this.express_company = express_company;
              let num = 0;
              this.express_company.forEach((items, index) => {
                if (this.sale.express_company_id != items.id) {
                  num++;
                }
              });
              if (num == this.express_company.length) {
                this.enum_express_company.forEach((items, index) => {
                  if (this.sale.express_company_id == items.id) {
                    this.express_company.push(items);
                  }
                });
              }
            }
          });
        }
      } else if (id == 1) {
        get_deliver_goods(this.sale.corp_id, id).then(res => {
          let express_company = [];
          this.get_deliver_goods = res.data;
          if (clear) {
            this.account = this.get_deliver_goods[this.sale.express_company_id];
          }
          this.enum_express_company.forEach((items, index) => {
            for (var key in res.data) {
              if (items.id == key) {
                express_company.push(items);
              }
            }
          });
          this.express_company = express_company;
          let num = 0;
          this.express_company.forEach((items, index) => {
            if (this.sale.express_company_id != items.id) {
              num++;
            }
          });
          if (num == this.express_company.length) {
            this.enum_express_company.forEach((items, index) => {
              if (this.sale.express_company_id == items.id) {
                this.express_company.push(items);
              }
            });
          }
        });
      }
    },
    select_express_company(id) {
      this.sale.express_account = "";
      if (this.get_deliver_goods[id]) {
        this.account = this.get_deliver_goods[id];
      } else {
        this.account = [];
      }
    },
    change_quantity(index) {
      // let money = 0;
      // this.sale.detail.forEach((items, index) => {
      //   money = new Big(money).plus(
      //     new Big(items.quantity).times(items.price).plus(items.additional_cost)
      //   );
      // });
      // this.sale.total_money = Number(money);
    },
    change_price(index) {
      // let money = 0;
      // this.sale.detail.forEach((items, index) => {
      //   money = new Big(money).plus(
      //     new Big(items.quantity).times(items.price).plus(items.additional_cost)
      //   );
      // });
      // this.sale.total_money = Number(money);
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
          if (items.type == 1 && items.deleted_at == null) {
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
      // this.dialogVisible = false;
      // let num = 0;
      // this.sale.detail[this.index].additional.forEach((item, index) => {
      //   num = new Big(num).plus(item.price);
      // });
      // this.sale.detail[this.index].additional_cost = Number(num);
      // let money = 0;
      // this.sale.detail.forEach((items, index) => {
      //   money = new Big(money).plus(
      //     new Big(items.quantity).times(items.price).plus(items.additional_cost)
      //   );
      // });
      // this.sale.total_money = Number(money);
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
        let  that=this
        that.$router.push({
        path: "/sales/sales",
        name: "sales-sales"
      });
      var tagName = 'sales-detail'
        that.closeAdd({tagName})
    },
    save_transport() {
      if(this.sale.is_old){
        var transportList = {
          id: this.sale.id,
          from_port: this.sale.from_port,
          dest_port: this.sale.dest_port,
          delivery_address_id: this.sale.delivery_address_id,
          invoice_address_id: this.sale.invoice_address_id,
          delivery_type_id: this.sale.delivery_type_id,
          express_account_type: this.sale.express_account_type,
          express_company_id: this.sale.express_company_id,
          express_account: this.sale.express_account,
        }
      }else{
        var transportList = {
          id: this.sale.id,
          from_port: this.sale.from_port,
          dest_port: this.sale.dest_port,
          delivery_address_id: this.sale.delivery_address_id,
          invoice_address_id: this.sale.invoice_address_id,
          delivery_type_id: this.sale.delivery_type_id,
          express_account_type: this.sale.express_account_type,
          express_company_id: this.sale.express_company_id,
          express_account: this.sale.express_account,
          contract_date:this.sale.contract_date,
          contract_address:this.sale.contract_address,
          sale_id:this.sale.sale_id,
          customer_po:this.sale.customer_po,
          settle_type:this.sale.settle_type,
          trade_type_id:this.sale.trade_type_id,
          delivery_days:this.sale.delivery_days,
          if_invoice:this.sale.if_invoice,
          transportation:this.sale.transportation,
          quality_stardard:this.sale.quality_stardard,
          reasonable_loss:this.sale.reasonable_loss,
          package_stardard:this.sale.package_stardard,
          accept_stardard:this.sale.accept_stardard,
          expdate_start:this.sale.expdate_start,
          expdate_end:this.sale.expdate_end,
          if_echapter:this.sale.if_echapter,
          note:this.sale.note,
          payment_id:this.sale.payment_id,
          receiver_money_date:this.sale.receiver_money_date
        }
      }
      this.loading_transport = true
      view_update(transportList, this)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            this.loading_transport = false
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.loading_transport = false
          }
        })
        .catch(rr => {
          this.loading_transport = false
        });
    },
    delete_cost(index) {
      this.sale.detail[this.index].additional.splice(index, 1);
    },
    delete_sale(item, index) {
      // if (item.id) {
      //   destroy(item, "hs", "destroy", this, index);
      // } else {
        this.sale.detail.splice(index, 1);
      // }
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
      this.receive_goods_addresses = [];
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
    // supplyChange(){
    //   if (this.sale.customer_id) {
    //     saler_contract_info(this.sale.customer_id).then(res => {
    //       this.receive_invoice_addresses = []
    //       this.receive_goods_addresses = []
    //       res.data.info.receive_addresses.forEach((items, index) => {
    //         if (items.type == 1) {
    //           this.receive_invoice_addresses.push(items);
    //         } else {
    //           this.receive_goods_addresses.push(items);
    //         }
    //       });
    //     });
    //   }
    //   this.select_express_account_type(this.sale.express_account_type);
    // },
    handleSelect_customer() {
      saler_contract_info(this.sale.customer_id).then(res => {
        this.receive_invoice_addresses = [];
        this.receive_goods_addresses = [];
        res.data.info.receive_addresses.forEach((items, index) => {
          if (items.type == 1) {
            this.receive_invoice_addresses.push(items);
          } else {
            this.receive_goods_addresses.push(items);
          }
        });
      });
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
      deliver_good_destory(obj, "saler_contract", "deliver_good_destory", this);
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
</script>
