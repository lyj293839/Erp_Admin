<style lang="scss" scoped type="text/scss">
.form_title {
  background: #f1f1f1;
  .el-button {
    color: black;
  }
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
table {
  border-collapse: collapse;
  .el-checkbox {
    margin: 5px;
  }
  /deep/.el-checkbox__label {
    padding: 2px;
  }
  .el-select{width: 100%;}
}
/deep/ .sales .el-input__inner {
  border: none;
}
.sales td {
  min-width: 90px;
  text-align: left;
  padding-left: 5px !important;
}
.dialog_input {
  /deep/ .el-input__inner {
    border: 1px solid #dcdfe6;
  }
}
.contract_number{
  /deep/.el-input__inner{
    padding: 0px 5px;
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
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <th class="td">{{$t('sale.add.sale2')}}</th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale3')}}
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale4')}}
                </th>
                <th class="td">{{$t('sale.add.sale5')}}</th>
                <th class="td">{{$t('sale.add.sale6')}}</th>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale7')}}</td>
                <td>
                  <span style="color:red;width:3%">*</span>
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
                  <span style="color:red;width:3%;">*</span>
                  <el-autocomplete
                    clearable
                    v-model="sale.customer_contact"
                    :fetch-suggestions="querySearchAsync_contact"
                    placeholder
                    @select="handleSelect_contact"
                    style="width:96%;"
                  >
                    <template slot-scope="{ item }">
                      <div>{{item.name+'-'+(item.phone?item.phone:(item.mobile?item.mobile:''))}}</div>
                    </template>
                  </el-autocomplete>
                  <!--<el-input v-model="sale.customer_contact" class="bj"></el-input>-->
                </td>
                <td>
                  <el-input v-model="sale.customer_mobile" clearable class="bj"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.customer_fax" clearable class="bj"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale8')}}</td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-select
                    v-model="sale.corp_id"
                    @change="get_custcontact_crop_id(sale.corp_id)"
                    style="width:96%;"
                    clearable
                    filterable
                  >
                    <el-option v-for="i in corp" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_contact" clearable style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_mobile"  clearable style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;width:3%">*</span>
                  <el-input v-model="sale.corp_fax" clearable style="width:96%;"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale9')}}</b>
            </el-button>
            <el-button
              style="float: right;margin: 7px 7px 0 0;color: white;"
              type="primary"
              size="mini"
              @click="add_demand"
            >{{$t('add')}}</el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.details" :key="index">
            <el-dialog :title="$t('sale.add.sale10')" :visible.sync="dialogVisible" width="40%">
              <el-table :data="item.additionals" border style="width: 100%" size='mini'>
                <el-table-column :label="$t('sale.add.sale11')" align="center" min-width="80">
                  <template slot-scope="scope">
                    <el-select
                      v-model="scope.row.additional_type_id"
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
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sale.add.sale12')" align="center" min-width="80">
                  <template slot-scope="scope" class="d2-text-center">
                    <el-input
                      size="mini"
                      type="text"
                      class="input"
                      placeholder
                      v-model="scope.row.price"
                      clearable
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('sale.add.sale13')" width="60">
                  <template slot-scope="scope">
                    <el-button @click="delete_cost(scope.row)" type="primary" size="mini">-</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <span slot="footer" class="dialog-footer">
                <el-button @click="add_cost" type="primary" size="mini">+</el-button>
                <el-button @click="dialogVisible = false" size="mini">{{$t('cancel')}}</el-button>
                <el-button type="primary" @click="hide_dialogVisible" size="mini">{{$t('save')}}</el-button>
              </span>
            </el-dialog>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" style="min-width:150px;">
                  {{$t('sale.add.sale14')}}
                  <el-button
                    size="mini"
                    type="primary"
                    @click="generatePrebatchNo(index)"
                    :disabled="contract_name_button"
                  >{{$t('sale.add.sale14_')}}</el-button>
                </th>
                <th class="td" style="min-width: 150px;">
                  <span style="color:red;">*</span>CAS
                </th>
                <th class="td" width="400">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale15')}}
                </th>
                <th class="td">{{$t('sale.add.sale16')}}</th>
                <th class="td">{{$t('sale.add.sale17')}}</th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale18')}}
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale19')}}
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale20')}}
                </th>
                <th class="td">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale21')}}
                </th>
                <th class="td">{{$t('sale.add.sale22')}}</th>
                <th class="td" width="140">{{$t('sale.add.sale23')}}</th>
                <th width='80'>
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
                  <el-input v-model="item.batchno" disabled></el-input>
                </td>
                <td>
                  <el-autocomplete
                    v-model="item.cas"
                    :fetch-suggestions="querySearchAsync"
                    placeholder
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
                  <el-input v-model="item.product_name_cn"  clearable></el-input>
                </td>

                <td>
                  <el-input v-model="item.package"  clearable></el-input>
                </td>
                <td>
                  <el-input v-model="item.purity"  clearable></el-input>
                </td>
                <td>
                  <el-input v-model="item.quantity"  clearable @input="change_quantity(index)"></el-input>
                </td>
                <td>
                  <el-select v-model="item.quantity_unit" clearable filterable placeholder>
                    <el-option v-for="i in units" :key="i.id" :label="i.name" :value="i.id"></el-option>
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
                  <el-input v-model="item.price" @input="change_price(index)"  clearable></el-input>
                </td>
                <!-- <td>{{item.quantity*item.price>0?item.quantity*item.price:''}}</td> -->
                <td>
                  <el-input v-model="item.aa" @input="change_money(index)"  clearable></el-input>
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
                <td>
                  <el-input v-model="item.prod_no"  clearable></el-input>
                </td>
                <td>
                  <el-input v-model="item.product_name"  clearable placeholder="english product name"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale25')}}
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
                    @click="show_dialog(index)"
                  >{{$t('sale.add.sale26')}}</el-button>
                </td>
                <td>{{item.additional_cost}}</td>
                <td>{{$t('sale.add.sale124')}}</td><!-- 佣金 -->
                <td>
                  <el-input v-model="item.commission"  clearable ></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale27')}}</td>
                <td colspan="11">
                  <span
                    v-for="(i,index) in item.test_item"
                    :key="index"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="(i,index_i) in item.test_item" :key="index_i" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                    <!-- <el-checkbox v-model="i.checked" @change="select_parent(index,i)" name="type"> -->
                      <span class="checked_items" style="font-weight: bold;">{{i.name}}</span>:
                    <!-- </el-checkbox>: -->
                    <el-checkbox
                      v-for="j in i.child"
                      :key="j.id"
                      :label="j.id"
                      v-model="j.checked"
                      @change="select(index,j)"
                      class="checkbox_nei"
                    >
                      <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                    </el-checkbox>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale28')}}</td>
                <td colspan="5">
                  <el-input v-model="item.checked_requirement"  clearable></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale29')}}
                </td>
                <td colspan="2">
                  <el-select v-model="item.if_declare"  clearable>
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
                </td>
                <td colspan="2">
                  <el-select v-model="item.trade_type"  clearable>
                    <el-option v-for="i in trade_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale31')}}</td>
                <td colspan="5">
                  <div style="display: flex;align-items:center;justify-content: space-between;">
                    <div>
                      <div v-for="(i,index_i) in item.claims">
                        <el-input
                            v-model="i.claim_pack_number"
                            style="width: 80px;border: 1px solid #f2f2f2;"
                            clearable
                          ></el-input>
                          *
                          <el-input
                            v-model="i.claim_pack_size"
                            style="width: 80px;border: 1px solid #f2f2f2;"
                            clearable
                          ></el-input>/
                          <el-select
                            v-model="i.claim_unit_id"
                            filterable
                            clearable
                            style="width: 100px;border: 1px solid #f2f2f2;margin-right:10px;"
                          >
                            <el-option v-for="i in units" :key="i.id" :label="i.name" :value="i.id"></el-option>
                          </el-select>
                          <el-button type="primary" icon="el-icon-minus" @click="claim_dev(index,index_i)" size="mini"></el-button>
                      </div>
                    </div>
                    <el-button type="primary" icon="el-icon-plus" style="margin-right:10px;" @click="claim_add(index)" size="mini"></el-button>
                  </div>
                </td>
                <td>{{$t('sale.add.sale32')}}</td>
                <td colspan="6" class="dateInput">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.required_delivery_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale33')}}</td>
                <td colspan="5">
                  <el-input v-model="item.label_requirement"  clearable></el-input>
                </td>
                <td>{{$t('sale.add.sale34')}}</td>
                <td colspan="5">
                  <el-input v-model="item.deliver_note"  clearable></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td>
                <td colspan="5">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{$t('sale.add.sale36')}}</td>
                <td colspan="5">
                  <el-radio-group v-model="item.if_auto_delivery">
                    <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio>
                    <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio>
                  </el-radio-group>
                </td>
               
              </tr>
              <tr>
                 <td>{{$t('sale.add.sale39')}}</td>
                <td colspan="5">
                  <el-radio-group v-model="item.is_generation">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                  </el-radio-group>
                </td>
                <td>{{$t('sale.add.sale294')}}</td>
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
                <td>{{$t('sale.add.sale278')}}</td>
                <td colspan="5">
                  <el-input v-model="item.straight_hair_note"></el-input>
                </td>
              </tr>
              <tr>
                <td>是否中转</td>
                <td colspan="11">
                  <el-radio-group v-model="item.is_transfer" @change="item.transfer_warehouse_id=(item.is_transfer==2?12:'')">
                    <el-radio :label="2">{{$t('sale.add.sale40')}}</el-radio>
                    <el-radio :label="1">{{$t('sale.add.sale41')}}</el-radio>
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
              <tr v-if="index==(sale.details.length-1)">
                <td colspan="6"></td>
                <td>{{$t('sale.add.sale42')}}</td>
                <td colspan="5">{{sale.total_money}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale43')}}</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width='180'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale44')}}
                </th>
                <th class="td" width='140'>{{$t('sale.add.sale45')}}</th>
                <th class="td">{{$t('sale.add.sale46')}}</th>
                <th class="td" width='140'>
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale47')}}
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
                <td >
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="sale.contract_date"
                    value-format="yyyy-MM-dd"
                    size="small"
                    clearable
                  ></el-date-picker>
                </td>
                <td>
                  <el-input v-model="sale.contract_address"  clearable></el-input>
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
                  <el-input v-model="sale.customer_po" clearable></el-input>
                </td>
                <td>
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
                    style="width:100%;"
                  ></el-date-picker>
                </td>
                <td>{{$t('sale.add.sale55')}}</td>
                <td colspan="1" class="dateInput">
                  <el-date-picker
                    value-format="yyyy-MM-dd"
                    v-model="sale.expdate_end"
                    type="date"
                    size="small"
                    style="width:100%;"
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
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale60')}}</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th style="width: 300px;">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale63')}}
                </th>
                <th style="width: 300px;">{{$t('sale.add.sale64')}}</th>
                <th class="td"><span style="color:red;">*</span>{{$t('sale.add.sale65')}}</th>
                <th class="td"><span style="color:red;">*</span>{{$t('sale.add.sale66')}}</th>
                <th class="td">{{$t('sale.add.sale67')}}</th>
                <th class="td" width='240px'>{{$t('sale.add.sale68')}}</th>
              </tr>
              <tr>
                <td>
                  <el-select
                    v-model="sale.delivery_address_id"
                    clearable
                    filterable
                    style="width: 90%"
                    placeholder
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
                    placeholder
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
                  <el-select v-model="sale.delivery_type_id"  clearable filterable placeholder>
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
                    style="width: 80%"
                    placeholder
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
                    clearable
                    filterable
                    placeholder
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
        <el-form-item class="from-item" style="margin:0px;text-align: right;">
          <el-button
            v-if="save_show"
            type="primary"
            :loading="loading"
            @click="check_save()"
            size="mini"
          >{{$t('save')}}</el-button>
          <el-button @click="close()" size="mini">{{$t('cancel')}}</el-button>
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
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;margin-bottom:10px;"
          >
            <tr>
              <td style="width:60px;">{{$t('sale.add.sale69')}}</td>
              <td style="width:100px;">{{$t('sale.add.sale70')}}</td>
              <td>{{$t('sale.add.sale71')}}</td>
              <td style="width:60px;">{{$t('sale.add.sale72')}}</td>
              <td style="width:90px;">{{$t('sale.add.sale73')}}</td>
              <td style="width:110px;">{{$t('sale.add.sale74')}}</td>
              <td style="width:40px;">{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:60px;">{{$t('sale.add.sale76')}}</td>
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
              <td>{{item.mobile}} </td>
              <td>{{item.email}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="destory_address(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('sale.add.sale170')">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
          >
            <tr>
              <td style="width:60px;">{{$t('sale.add.sale69')}}</td>
              <td style="width:100px;">{{$t('sale.add.sale70')}}</td>
              <td>{{$t('sale.add.sale71')}}</td>
              <td style="width:60px;">{{$t('sale.add.sale72')}}</td>
              <td style="width:90px;">{{$t('sale.add.sale73')}}</td>
              <td style="width:110px;">{{$t('sale.add.sale74')}}</td>
              <td style="width:40px;">{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:60px;">{{$t('sale.add.sale76')}}</td>
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
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="destory_address(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <el-form label-position="right" label-width="90px" class="dialog_input">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale69')" >
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
            <el-form-item :label="$t('sale.add.sale70')" >
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
          <el-input type="textarea" v-model="addressItem.address" size="small" placeholder="Please Write"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale72')" :required="titleAddresses==('收货地址'||'Shipping address')">
              <el-input v-model="addressItem.contact_name" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale73')" :required="titleAddresses==('收货地址'||'Shipping address')">
              <el-input v-model="addressItem.mobile" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale74')">
              <el-input v-model="addressItem.email" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-form-item label="类型">
          <el-select v-model="addressItem.user_type" size="mini" placeholder="Please Select">
            <el-option
              v-for="(item,index) in user_type"
              :key="index"
              :label="user_type[index]"
              :value="index"
            ></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item :label="$t('sale.add.sale81')">
          <el-switch
            name="is_default"
            v-model="addressItem.is_default"
            :active-value="1"
            :inactive-value="0"
            :active-text="$t('sale.add.sale82')"
            :inactive-text="$t('sale.add.sale83')"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="save_receive_good(addressItem)"
          >{{$t('save')}}</el-button>
          <el-button size="mini" @click="delete_receive_good(addressItem)">{{$t('cancel')}}</el-button>
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
          >
            <tr>
              <td>{{$t('sale.add.sale78')}}</td>
              <td>{{$t('sale.add.sale79')}}</td>
              <td>{{$t('sale.add.sale91')}}</td>
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total_account"
                  @change="check_account_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <el-button
                  type="danger"
                  size="mini"
                  @click="account_del()"
                >{{$t('sale.add.sale94')}}</el-button>
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
                <el-button
                  type="danger"
                  size="mini"
                  @click="deliver_good_destory(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('sale.add.sale170')">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
          >
            <tr>
              <td>{{$t('sale.add.sale78')}}</td>
              <td>{{$t('sale.add.sale79')}}</td>
              <td>{{$t('sale.add.sale91')}}</td>
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total_account"
                  @change="check_account_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <el-button
                  type="primary"
                  size="mini"
                  @click="account_star()"
                >{{$t('sale.add.sale93')}}</el-button>
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
                <el-button
                  type="danger"
                  size="mini"
                  @click="deliver_good_destory(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <el-form label-position="right" label-width="110px" class="dialog_input">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale78')" :required="true">
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
          <el-button size="mini" @click="deliver_good_close(deliveryItem)">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import setting from "@/setting.js";
import Big from "@/big/a/big.mjs";
import util from "@/libs/util";
import { generatePrebatchNo } from "@/api/Inquery";
import {
  saler_edit,
  saler_update,
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
import { city_list, country_list } from "@/api/user";
import $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-revise",
  data() {
    return {
      loading_city:false,
      check_total: false,
      qq:true,
      useID:'',
      pre:'',
      number:'',
      check_list: [],
      check_total_account: false,
      check_account_list: [],
      corp: [],
      titleAddresses: "",
      titleDeliver: "",
      deliverList: [],
      deliveryItem: {
        express_company_id: "",
        accounts: "",
        is_straight_hair: 0,
        member_id: ""
      },
      delivery: true,
      addresses: true,
      addressList: [],
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
      contract_name_button: true,
      dialogAccount: false,
      dialogAddresses: false,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      detail_index: "",
      loading: false,
      dialogVisible: false,
      trade_type: [],
      sale: {remarks:{}},
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
      save_show: true,
      supply_list: [],
      supplyloading: false,
      customer_contacts: [],
      country: [],
      user_type: [],
      express_company_: [],
      corporation: {},
      number_type_info:[],
      inventory_auto_preempt_info:[],
      flag_map:[],
      user_id:'',
      user_name:'',
      user_flag:''
    };
  },
  created() {
    this.user_id=Number(util.cookies.get('user_id')) 
    this.user_name=util.cookies.get('user_name');
    this.user_flag = util.cookies.get('user_flag');
    this.fetch_data();
    this.useID = this.$route.query.id
  },
  watch: {
    $route (to, from) {
      if (to.name === 'sales-revise') {
        this.useID = this.$route.query.id
      }
    },
    useID(to,form){
      if(to!=form&&to){
        this.fetch_data()
      }
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    claim_add(index){
      var item = {
        claim_pack_number:'',
        claim_pack_size:'',
        claim_unit_id:''
      }
      this.sale.details[index].claims.push(item)
    },
    claim_dev(index,index_i){
      this.sale.details[index].claims.splice(index_i,1)
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
    querySearchAsync_contact(queryString, cb) {
      var restaurants = this.customer_contacts;
      cb(restaurants);
    },
    querySearchAsync_account(queryString, cb) {
      var restaurants = this.account;
      cb(restaurants);
    },
    querySearchAsync_corporation(queryString, cb) {
        var restaurants = this.corporation;
        cb(restaurants);
    },
    currency_change() {
      if(this.flag_map[this.user_flag]){
        if (this.sale.details[0].currency_id == 2) {
          this.sale.delivery_type_id = 4;
          // this.pre='AK'
          this.sale.type = 1;
        } else {
          this.sale.delivery_type_id = 3;
          // this.pre='AGN'
          this.sale.type = 2;
        }
        // this.sale.corp_id = this.flag_map[this.user_flag]
      }else{
        if (this.sale.details[0].currency_id == 2) {
          this.sale.delivery_type_id = 4;
          this.pre='AK'
          this.sale.type = 1;
          this.corp.forEach(i=>{
            if(i.id==100000){this.sale.corp_id = 100000}
          })
          this.get_custcontact_crop_id(this.sale.corp_id)
        } else {
          this.sale.delivery_type_id = 3;
          this.pre='AGN'
          this.sale.type = 2;
          this.corp.forEach(i=>{
            if(i.id==500000){this.sale.corp_id = 500000}
          })
          this.get_custcontact_crop_id(this.sale.corp_id)
        }
      }
      
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
    handleSelect_account(item) {
      this.sale.express_account = item.accounts;
    },
    clear(){
        this.sale.payment_id=0
    },
    handleSelect_corporation(item){
      this.sale.settle_type=item.name
      this.sale.payment_id=item.id
      this.$forceUpdate()
    },
    handleSelect_contact(item) {
      this.sale.customer_contact = "";
      this.sale.customer_mobile = "";
      this.sale.customer_fax = "";
      this.sale.customer_contact = item.name;
      this.sale.customer_mobile = item.phone?item.phone:(item.mobile?item.mobile:'');
      this.sale.customer_fax = item.fax;
    },
    contract_address() {
      if (this.sale.contract_number) {
        this.contract_name_button = false;
      } else {
        this.contract_name_button = true;
      }
    },
    generatePrebatchNo(index) {
      generatePrebatchNo(this.sale.contract_number).then(res => {
        this.sale.details[index].batchno = res.data;
      });
    },
    select(i, item) {
      this.sale.details[i].test_item.forEach((items, index) => {
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
      // this.sale.detail[i].checked_items.forEach((items, index) => {
      //   if (!items.checked) {
      //     items.child.forEach((m, n) => {
      //       m.checked = false;
      //     });
      //   }
      // });
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.supply_list = res.data;
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    supplyChange() {
        (this.sale.customer_id = ""),
        (this.sale.delivery_address_id = ""),
        (this.sale.invoice_address_id = ""),
        (this.sale.express_company_id = ""),
        (this.sale.express_account = ""),
        (this.sale.customer_contact = ""),
        (this.sale.customer_mobile = ""),
        (this.sale.customer_fax = "");
        this.sale.settle_type = ''
      this.sale.customer_id =this.supply_list.filter(item => {
          return item.name == this.sale.customer_name;
          })[0]?this.supply_list.filter(item => {
              return item.name == this.sale.customer_name;
          })[0].id: "";
      let country_code = this.supply_list.filter(item => {
            return item.name == this.sale.customer_name;
          })[0]? this.supply_list.filter(item => {
              return item.name == this.sale.customer_name;
          })[0].country_code: "";
      if (country_code == "CHN") {
        // this.sale.type = 1;
        this.sale.details.forEach((items, index) => {
          // items.currency_id = 2;
          items.invoice_type_id = 1;
          items.trade_type = 2
        });
      } else {
        // this.sale.type = 2;
        this.sale.details.forEach((items, index) => {
          // items.currency_id = 1;
          items.invoice_type_id = 2;
          items.trade_type = 1
        });
      }
      this.receive_invoice_addresses = [];
      this.receive_goods_addresses = [];
      if (this.sale.customer_id) {
        // this.sale.settle_type = "";
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
              : res.data.info.contacts[0].phone;
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
          this.sale.details.forEach(item => {
            item.if_declare_info = res.data.corporation.if_declare_info;
            item.if_auto_delivery = res.data.info.if_auto_delivery;
          });
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
    supplyChange_b() {
        (this.sale.customer_id = ""),
        (this.sale.delivery_address_id = ""),
        (this.sale.invoice_address_id = ""),
        (this.sale.express_company_id = ""),
        (this.sale.express_account = ""),
        (this.sale.customer_contact = ""),
        (this.sale.customer_mobile = ""),
        (this.sale.customer_fax = "");
        this.sale.settle_type = ''
      this.sale.customer_id =this.supply_list.filter(item => {
          return item.name == this.sale.customer_name;
          })[0]?this.supply_list.filter(item => {
              return item.name == this.sale.customer_name;
          })[0].id: "";
      let country_code = this.supply_list.filter(item => {
            return item.name == this.sale.customer_name;
          })[0]? this.supply_list.filter(item => {
              return item.name == this.sale.customer_name;
          })[0].country_code: "";
      if (country_code == "CHN") {
        // this.sale.type = 1;
        this.sale.details.forEach((items, index) => {
          // items.currency_id = 2;
          items.trade_type = 2
        });
      } else {
        // this.sale.type = 2;
        this.sale.details.forEach((items, index) => {
          // items.currency_id = 1;
          items.trade_type = 1
        });
      }
      this.receive_invoice_addresses = [];
      this.receive_goods_addresses = [];
      if (this.sale.customer_id) {
        // this.sale.settle_type = "";
        saler_contract_info(this.sale.customer_id).then(res => {
          this.corporation = res.data.customer_payment_days;
          for (var i in res.data.customer_payment_days) {
            if (res.data.customer_payment_days[i].id == 8) {
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
              ? (res.data.info.contacts[0].phone?res.data.info.contacts[0].mobile:'')
              : '';
          this.sale.customer_fax =
            res.data.info.contacts.length > 0
              ? res.data.info.contacts[0].fax
              : "";
          this.sale.details.forEach(item => {
            item.if_declare_info = res.data.corporation.if_declare_info;
            item.if_auto_delivery = res.data.info.if_auto_delivery;
          });
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
      (this.sale.express_account = ""),
        (this.account = this.get_deliver_goods[id]);
    },
    change_quantity(index) {
      let money = 0;
      this.sale.details.forEach((items, index) => {
        if (items.quantity && items.quantity >= 0) {
          items.aa = new Big(items.quantity).times(items.price).toFixed(2);
          money = new Big(money).plus(
            new Big(items.aa)
              .plus(items.additional_cost)
          );
        }
      });
      this.sale.total_money = Number(money);
    },
    change_price(index) {
      let money = 0;
      this.sale.details.forEach((items, index) => {
        if (items.price && items.price > 0) {
          items.aa = new Big(items.quantity).times(items.price).toFixed(2);
          money = new Big(money).plus(
            new Big(items.aa)
              .plus(items.additional_cost)
          );
        }
      });
      this.sale.total_money = Number(money);
    },
    change_money(index) {
      let money = 0;
      this.sale.details.forEach((items, index) => {
        if (items.quantity && items.quantity > 0) {
          items.price = new Big(items.aa).div(items.quantity).toFixed(2);
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
    querySearchAsync(queryString, cb) {
      if (queryString != "") {
        queryString = queryString.replace(/\s/g, "");
        cas_info(queryString).then(res => {
          var restaurants = res.data;
          cb(restaurants);
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
    handleSelect_customer() {
      this.receive_invoice_addresses = [];
      this.receive_goods_addresses = [];
      this.sale.settle_type = "";
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
        // this.sale.payment_id = res.data.corporation.payment_day_id;
        // this.sale.receive_money_date = res.data.corporation.receiver_money_date;
        this.sale.settle_type = res.data.corporation.settle_type;
        this.sale.details.forEach(item => {
          item.if_declare_info = res.data.corporation.if_declare_info;
          item.if_auto_delivery = res.data.info.if_auto_delivery;
        });
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
      if(!this.sale.details[index].cas){
        this.sale.details[index].prod_no = ''
      }
    },
    handleSelect(item) {
      this.sale.details[this.detail_index].cas = item.cas;
      this.sale.details[this.detail_index].product_name_cn = item.name_cn;
      this.sale.details[this.detail_index].product_name = item.name;
      // this.sale.details[this.detail_index].prod_no = item.prodno;
      this.sale.details[this.detail_index].prod_id = item.prod_id;
      if(!this.flag_map[this.user_flag]){
        if(this.sale.detail[this.detail_index].currency_id==2){
          this.sale.detail[this.detail_index].prod_no = item.productid2;
        }else{
          this.sale.detail[this.detail_index].prod_no = item.prodno;
        }
      }
    },
    fetch_data() {
        // saler_contract_detail(this.$route.query.id).then(res => {
        saler_edit(this.$route.query.id).then(res => {
          // this.corp = res.data.corp;
          this.corp = []
          if(res.enum.flag_map[this.user_flag]){
            var corp_id = res.enum.flag_map[this.user_flag]
            this.corp = res.data.corp.filter(i=>{return i.id==corp_id})
          }else{
            this.corp = res.data.corp;
            // this.corp.forEach((i,index)=>{
            //   for(var k in res.enum.flag_map){
            //     if(res.enum.flag_map[k]==i.id){
            //       console.log(i.id)
            //       this.corp.splice(index,1)
            //     }
            //   }
            // })
            for(var k in res.enum.flag_map){
              this.corp.forEach((i,index)=>{
                if(res.enum.flag_map[k]==i.id){
                  this.corp.splice(index,1)
                }
              })
            }
          }
          // console.log(this.corp)
          this.sale = res.data.saler_contract
          this.pre = res.data.number_info.pre
          this.number = res.data.number_info.number
          this.sale.details.forEach(item=>{
            item.aa = (Number(item.total_money) - Number(item.additional_cost)).toFixed(2)
            delete item.claim_pack_number
            delete item.claim_pack_size
            delete item.claim_unit_id
          })
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
          this.trade_mode = res.enum.trade_mode;
          this.product_file_info = res.enum.product_file_info;
          this.units = res.enum.units;
          this.product_type = res.enum.product_type;
          this.payment_type = res.enum.payment_type;
          this.trade_type = res.enum.trade_type;
          this.number_type_info = res.enum.number_type_info
          this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info
          this.flag_map = res.enum.flag_map
          this.receive_invoice_addresses = [];
          this.receive_goods_addresses = [];
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
          this.select_express_account_type(this.sale.express_account_type,1);
          this.contract_address()
        })
        sale_lists().then(res => {
          this.sale_list = res.data;
          if(!this.sale_list.filter(i=>{return i.id == this.user_id})[0]){
            this.sale_list.push({id:this.user_id,name:this.user_name})
          }
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
          // this.sale.corp_mobile = res.data.info.contacts.length>0?(res.data.info.contacts[0].phone? res.data.info.contacts[0].phone: res.data.info.contacts[0].mobile):''
          // this.sale.corp_fax = res.data.info.contacts.length>0?res.data.info.contacts[0].fax:''
          this.sale.corp_mobile = res.data.corporation.mobile?res.data.corporation.mobile:''
          this.sale.corp_fax = res.data.corporation.fax?res.data.corporation.fax:''
          this.sale.contract_address = res.data.corporation.signed_address;
          this.sale.contract_date = res.data.corporation.contractdate;
          this.sale.expdate_end = res.data.corporation.expdate;
          this.sale.remarks.transportation = res.data.corporation.transportation;
          this.sale.remarks.quality_stardard = res.data.corporation.quality_stardard;
          this.sale.remarks.reasonable_loss = res.data.corporation.reasonable_loss;
          this.sale.remarks.package_stardard = res.data.corporation.package_stardard;
          this.sale.remarks.accept_stardard = res.data.corporation.accept_mode;
        });
        this.select_express_account_type(this.sale.express_account_type);
      }
    },
    show_dialog(index) {
      this.dialogVisible = true;
      this.index = index;
      if(this.sale.details[index].additionals.length==0){
        this.sale.details[index].additionals.push({
          additional_type_id: "",
          price: ""
        });
      }
    },
    hide_dialogVisible() {
      this.dialogVisible = false;
      if (this.sale.details[this.index].additionals[0].additional_type_id != "") {
        let num = 0;
        this.sale.details[this.index].additionals.forEach((item, index) => {
          num = new Big(num).plus(item.price);
        });
        this.sale.details[this.index].additional_cost = Number(num);
        let money = 0;
        this.sale.details.forEach((items, index) => {
          money = new Big(money).plus(
            new Big(items.aa)
              .plus(items.additional_cost)
          );
        });
        this.sale.total_money = Number(money);
      }
    },
    add_demand() {
      let test_item = JSON.parse(JSON.stringify(this.test_item));
      this.sale.details.push({
        inquiry_id: "",
        is_straight_hair:0,
        straight_hair_note:'',
        batchno: "",
        cas: "",
        product_name: "",
        product_name_cn: "",
        package: "",
        purity: "",
        quantity: "",
        quantity_unit: this.sale.details[0].quantity_unit,
        currency_id: this.sale.details[0].currency_id,
        price: "",
        leadtime: "",
        prod_no: "",
        prod_id: "",
        invoice_type_id: this.sale.details[0].invoice_type_id,
        additional: [
          {
            additional_type_id: "",
            price: ""
          }
        ],
        additional_cost: 0,
        test_item: test_item,
        checked_requirement: "",
        package_requirement: "",
        deliver_note: "",
        label_requirement: "",
        file_requirement: "",
        product_file: [],
        if_declare: 0,
        trade_type: this.sale.details[0].trade_type,
        required_delivery_date: "",
        if_auto_delivery: this.sale.details[0].if_auto_delivery,
        is_generation: 0,
        is_transfer:1,
        transfer_warehouse_id:'',
        commission:''
      });
    },
    add_cost() {
      this.sale.details[this.index].additionals.push({
        additional_type_id: "",
        price: ""
      });
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
      this.loading = true
      this.sale.currency_id = this.sale.details[0].currency_id;
      this.sale.contract_number = this.pre+this.number
      this.sale.details.forEach((items, index) => {
        if(items.aa){
          items.total_money = Number(new Big(items.aa).plus(items.additional_cost)).toFixed(2)
        }
      });
      for (var i in this.corporation) {
        if (this.sale.settle_type == this.corporation[i].name) {
          this.sale.receive_money_date = this.corporation[
            i
          ].receiver_money_date;
          this.sale.payment_id = this.corporation[i].id;
        }
      }
      var tagName = "sales-revise";
      delete this.sale.type
      // 
      var saleList = JSON.parse(JSON.stringify(this.sale))
      saleList = JSON.parse(JSON.stringify(saleList).replace(/details/g, "detail"));
      saleList.transportation = saleList.remarks.transportation;
      saleList.quality_stardard = saleList.remarks.quality_stardard;
      saleList.reasonable_loss = saleList.remarks.reasonable_loss;
      saleList.package_stardard = saleList.remarks.package_stardard;
      saleList.accept_stardard = saleList.remarks.accept_stardard;
      saleList.note = saleList.remarks.note;
      delete saleList.remarks
      saleList.detail.forEach(res=>{
         var arr = [];
        res.test_item.forEach((item, index) => {
          if (item.checked == true) {
            arr.push(item);
          }
        });
        res.test_item = arr;
        res.test_item.forEach(m => {
          var brr = [];
          m.child.forEach(n => {
            if (n.checked == true) {
              brr.push(n);
            }
          });
          m.child = brr;
        });
        res.additional = res.additionals
        res.checked_items = res.test_item
        delete res.additionals
        delete res.test_item
      })
      saler_update(saleList)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            this.loading = false
            this.close()
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.loading = false
          }
        })
        .catch(rr => {this.loading = false});
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
          // if (res.data.length == 0) {
          //   this.delivery = false;
          // }
        });
      }
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
    update_deliver(item) {
      this.deliveryItem.express_company_id = item.express_company_id;
      this.deliveryItem.accounts = item.accounts;
      this.deliveryItem.id = item.id;
      this.deliveryItem.is_straight_hair = item.is_straight_hair;
      this.deliveryItem.member_id = item.member_id;
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
    deliver_good_close(item) {
      this.dialogAccount = false;
      this.deliveryItem = {
        express_company_id: "",
        accounts: "",
        is_straight_hair: 0,
        member_id: ""
      };
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
    save_receive_good(item) {
      if (item.id) {
        receive_address_update(item, item.id, this);
      } else {
        item.member_id = this.sale.customer_id;
        receive_address_create(item, this);
      }
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
    close() {
        var that = this
        that.$router.push({
        path: "/sales/sales",
        name: "sales-sales"
      });
      const tagName = "sales-revise";
      // this.closeAdd({
      //     tagName,
      //     vm: this
      // })
        that.closeAdd({ tagName });
    },
    delete_cost(index) {
      this.sale.details[this.index].additionals.splice(index, 1);
    },
    delete_sale(item, index) {
      // if (item.id) {
      //   destroy(item, "hs", "destroy", this, index);
      // } else {
      //   this.sale.details.splice(index, 1);
      // }
      this.sale.details.splice(index, 1);
      let money = 0;
      this.sale.details.forEach((items, index) => {
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
    }
  }
};
function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
}
</script>
