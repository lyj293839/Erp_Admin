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
  padding: 0px;
}
.sales td {
  min-width: 90px;
  text-align: left;
  padding-left: 5px !important;
}
/deep/.sales .dateInput{
  .el-input__inner{
    padding: 0px 15px;
  }
  .el-input__prefix{
    left: -5px;
  }
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
.cost_style{
  table{
    /deep/.el-input__inner{
      border: 0px;
    }
  }
}
/deep/.td_placeholder{
  .el-input__inner::-webkit-input-placeholder {
        color: rgb(201, 199, 199) !important;
      }
      .el-input__inner::-moz-input-placeholder {
        color: rgb(201, 199, 199) !important;
      }
      .el-input__inner::-ms-input-placeholder {
        color: rgb(201, 199, 199) !important;
      }
}
</style>
<template>
  <d2-container>
    <div v-if="GEnums.sousuo_assignsalers.includes(user_name)"   class="d2-text-center d2-m-10">
      <el-input v-model="orderNo" size="small" clearable style="width:200px;display: inline-block;"></el-input>
      <el-button type="primary" size="small" @click.stop="request_orderNo" class="d2-ml-5">{{$t('sale.add.sale285')}}</el-button>
    </div>
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
                      :label="item.name"
                      :key="item.id"
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
                    <el-option v-for="i in corp"  :key="i.id" :label="i.name" :value="i.id"></el-option>
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
          <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.detail" :key="index">
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
                    <el-option v-for="i in currencys"  :key="i.id" :label="i.name" :value="i.id"></el-option>
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
                <td class='td_placeholder'>
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
                    @click="show_dialog(item,index)"
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
                    v-for="(i,index) in item.checked_items"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="(i,index_i) in item.checked_items" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
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
                <!-- <td>{{$t('sale.add.sale31')}}</td>
                <td colspan="5">
                  <el-input
                    v-model="item.claim_pack_number"
                    style="width: 80px;border: 1px solid #f2f2f2;"
                    clearable
                  ></el-input>
                  *
                  <el-input
                    v-model="item.claim_pack_size"
                    style="width: 80px;border: 1px solid #f2f2f2;"
                    clearable
                  ></el-input>/
                  <el-select
                    v-model="item.claim_unit_id"
                    filterable
                    clearable
                    style="width: 100px;border: 1px solid #f2f2f2;"
                  >
                    <el-option v-for="i in units" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td> -->
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
                <td >{{$t('sale.add.sale36')}}</td>
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
                <td >{{$t('sale.add.sale294')}}</td>
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
              <tr v-if="index==(sale.detail.length-1)">
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
                <td class="dateInput">
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
                  <el-input v-model="sale.transportation"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale50')}}</td>
                <td colspan="6">
                  <el-input v-model="sale.quality_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale51')}}</td>
                <td colspan="6">
                  <el-input v-model="sale.reasonable_loss"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale52')}}</td>
                <td colspan="6">
                  <el-input v-model="sale.package_stardard"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale53')}}</td>
                <td colspan="6">
                  <el-input v-model="sale.accept_stardard"></el-input>
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
                    clearable
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
                    clearable
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
        <el-form-item class="from-item" style="margin:0px;text-align: right">
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
    <!-- 附加费用 -->
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
import setting from "@/setting.js";
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
import { city_list, country_list } from "@/api/user";
import $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-add",
  data() {
    return {
      loading_city:false,
      check_total: false,
      qq:true,
      pre:'',
      number:'',
      currency_id:1,
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
      requestData:{
        is_request:false,
        orderNo:'',
        corp:''
      },
      trade_type: [],
      sale: {
        customer_id: "",
        customer_name: "",
        customer_contact: "",
        customer_mobile: "",
        customer_fax: "",
        corp_id: "",
        corp_name: "",
        corp_contact: "",
        corp_mobile: "025-66061693",
        corp_fax: "025-57626690",
        currency_id: "",
        detail: [
          {
            aa: "",
            is_straight_hair:0,
            is_transfer:1,
            transfer_warehouse_id:'',
            straight_hair_note:'',
            inquiry_id: "",
            batchno: "",
            cas: "",
            product_name: "",
            product_name_cn: "",
            package: "",
            purity: "",
            quantity: "",
            quantity_unit: 1,
            currency_id: 1,
            price: "",
            leadtime: "",
            prod_no: "",
            productid2:'',
            prodno: "",
            prod_id: "",
            invoice_type_id: "",
            inventory_auto_preempt:2,
            additional: [
              {
                additional_type_id: "",
                price: ""
              }
            ],
            claims:[],
            additional_cost: 0,
            checked_items: [],
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
        trade_type_id: 1,
        delivery_days:3,
        payment_id: 0,
        receive_money_date: "",
        settle_type: "",
        if_echapter: 1,

        from_port: "",
        dest_port: "",
        delivery_address_id: "",
        invoice_address_id: "",
        delivery_type_id: 3,
        express_account_type: 1,
        express_company_id: "",
        express_account: ""
      },
      additional: [
              {
                additional_type_id: "",
                price: ""
              }
            ],
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
      check_contract: {
        saler_contract_id: "",
        approval_comment: "",
        status: ""
      },
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
      orderNo:'',
      user_id:'',
      user_name:'',
      user_flag:'',
      enums:{}
    };
  },
  created() {
    this.user_id=Number(util.cookies.get('user_id')) 
    this.user_name=util.cookies.get('user_name');
    this.user_flag = util.cookies.get('user_flag');
    this.fetch_data();
  },
  watch: {
    'currency_id':{
      deep:true,
      handler: function (newVal,oldVal){
                // if(newVal==2||oldVal==2){
                //   if(this.qq){
                //     get_contract_number(newVal).then(res=>{
                //       this.pre = res.data.pre
                //       this.number = res.data.number
                //       this.contract_address()
                //     })
                //   }
                // }
                if(this.qq&&!this.flag_map[this.user_flag]){
                  if(newVal==2){
                    this.pre='AK'
                  }else{
                    this.pre='AGN'
                  }
                  this.contract_address()
                }
              }
    },
    $route (to, from) {
                if(from.name=='sales-sales'){
                  if(this.$route.query.sales_add){
                    this.sale= {
                      customer_id: "",
                      customer_name: "",
                      customer_contact: "",
                      customer_mobile: "",
                      customer_fax: "",
                      corp_id: "",
                      corp_name: "",
                      corp_contact: "",
                      corp_mobile: "025-66061693",
                      corp_fax: "025-57626690",
                      currency_id: "",
                      detail: [
                        {
                          aa: "",
                          inquiry_id: "",
                          batchno: "",
                          cas: "",
                          product_name: "",
                          product_name_cn: "",
                          package: "",
                          purity: "",
                          quantity: "",
                          quantity_unit: 1,
                          currency_id: 1,
                          price: "",
                          leadtime: "",
                          prod_no: "",
                          prod_id: "",
                          invoice_type_id: "",
                          inventory_auto_preempt:2,
                          additional: [
                            {
                              additional_type_id: "",
                              price: ""
                            }
                          ],
                          claims:[],
                          additional_cost: 0,
                          checked_items: [],
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
                          transfer_warehouse_id:''
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
                      trade_type_id: 1,
                      delivery_days:3,
                      payment_id: 0,
                      receive_money_date: "",
                      settle_type: "",
                      if_echapter: 1,

                      from_port: "",
                      dest_port: "",
                      delivery_address_id: "",
                      invoice_address_id: "",
                      delivery_type_id: 3,
                      express_account_type: 1,
                      express_company_id: "",
                      express_account: ""
                    }
                    this.orderNo = ''
                    this.user_id=util.cookies.get('user_id');
                    this.user_name=util.cookies.get('user_name');
                    this.fetch_data();
                  }
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
      this.sale.detail[index].claims.push(item)
    },
    claim_dev(index,index_i){
      this.sale.detail[index].claims.splice(index_i,1)
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
    request_orderNo(){
        let that=this
        if(that.orderNo.substring(0,2)=='CH'){
          this.requestData.is_request = true
          this.requestData.orderNo = JSON.parse(JSON.stringify(this.orderNo))
          this.requestData.corp = 1004484
          $.ajax({
                      url: 'http://www.buysellchem.com/api/dataout/getOrderByNo?orderNo='+this.orderNo,
                      method:'get',
                      success: function (response) {
                          if(response.code==0){
                              that.sale.customer_name=response.data.company_name
                              that.sale.detail[0].cas=response.data.cas
                              that.sale.detail[0].package=response.data.pack
                              that.sale.detail[0].purity=response.data.purity
                              // that.sale.detail[0].price=Number(new Big(response.data.total).div(response.data.quantity)).toFixed(2)
                              that.sale.detail[0].currency_id=2
                              that.sale.detail[0].origin_order_no = response.data.origin_order_no?response.data.origin_order_no:''
                              that.qq = false
                              that.sale.detail[0].aa=response.data.total
                              that.sale.detail[0].trade_type=3
                              that.sale.contract_number=response.data.orderNo
                              that.pre = response.data.orderNoPre
                              that.number = response.data.orderNoNum
                              that.sale.total_money = response.data.total
                              that.sale.customer_po=response.data.customerpo
                              that.sale.detail[0].deliver_note =response.data.shippingAddress?(response.data.shippingAddress.contact_name+response.data.shippingAddress.mobile+response.data.shippingAddress.address_more+response.data.shippingAddress.address):''
                              that.invoice_type.forEach(items=>{
                                if(items.name==response.data.invoice){
                                  that.sale.detail[0].invoice_type_id=items.id
                                }
                              })
                              if(response.data.packunit.toLocaleLowerCase()=='mg'){
                                  that.sale.detail[0].quantity_unit=1
                                  that.sale.detail[0].quantity= Number(new Big(response.data.quantity).div(1000))
                              }else{
                                that.sale.detail[0].quantity = response.data.quantity
                              }
                              if(response.data.packunit.toLocaleLowerCase()=='g'){
                                that.sale.detail[0].quantity_unit = 1
                              }else if(response.data.packunit.toLocaleLowerCase()=='kg'){
                                that.sale.detail[0].quantity_unit = 4
                              }else if(response.data.packunit.toLocaleLowerCase()=='ton'){
                                that.sale.detail[0].quantity_unit= 3
                              }else if(response.data.packunit.toLocaleLowerCase()=='ml'){
                                that.sale.detail[0].quantity_unit = 2
                              }else if(response.data.packunit.toLocaleLowerCase()=='l'){
                                that.sale.detail[0].quantity_unit = 6
                              }
                              that.sale.detail[0].price=Number(new Big(response.data.total).div(that.sale.detail[0].quantity)).toFixed(4)
                              // if(response.data.source_type==2){
                              //     if(response.data.labgle_contact=='徐艳'){
                              //         that.sale.sale_id=162
                              //     }else if(response.data.labgle_contact=='沈璐雯'){
                              //         that.sale.sale_id=174
                              //     }else if(response.data.labgle_contact=='张红'){
                              //         that.sale.sale_id=157
                              //     }else{
                              //         that.sale.sale_id=157
                              //     }
                              // }else{
                              //     that.sale.sale_id=116
                              // }
                              that.sale.sale_id=Number(util.cookies.get('user_id'));
                              if (that.sale.customer_name !== "") {
                                  customer_lists(that.sale.customer_name).then(res => {
                                    that.supply_list = res.data;
                                    that.supplyChange_b()
                                  });
                              } else {
                                that.supply_list = [];
                              }
                              cas_info(response.data.cas).then(res=>{
                                that.sale.detail[0].product_name_cn = res.data[0].name_cn;
                                that.sale.detail[0].product_name = res.data[0].name;
                                that.sale.detail[0].prod_id = res.data[0].prod_id;
                                that.sale.detail[0].productid2 = res.data[0].productid2
                                that.sale.detail[0].prodno = res.data[0].prodno
                                  if(that.sale.detail[0].currency_id==2){
                                    that.sale.detail[0].prod_no = res.data[0].productid2;
                                  }else{
                                    that.sale.detail[0].prod_no = res.data[0].prodno;
                                  }
                              })
                              that.currency_change('CH')
                          }else{
                              alert('输入的编号有误或查询不到订单信息，请核实！');
                          }
                      },
                      error:function () {
                          alert('输入的编号有误或查询不到订单信息，请核实！');
                      },
                  });
        }else{
           var url='http://www.labgle.com/api/dataout/getSygPtOrder?orderNo='+this.orderNo
          //  if(that.orderNo.substring(0,2)=='PT'){
          //      url='http://member.labgle.com/api/dataout/getOrderByNo?orderNo='+this.orderNo
          //  }
          $.ajax({
              url: url,
              method:'get',
              success: function (response) {
                  if(response.code==0){
                      that.sale.customer_name=response.data.company_name
                      that.sale.detail[0].cas=response.data.cas
                      that.sale.detail[0].package=response.data.pack
                      that.sale.detail[0].purity=response.data.purity
                      // that.sale.detail[0].price=Number(new Big(response.data.total).div(response.data.quantity)).toFixed(2)
                      that.sale.detail[0].currency_id=2
                      that.currency_change()
                      that.sale.detail[0].origin_order_no = response.data.origin_order_no?response.data.origin_order_no:''
                      that.qq = false
                      that.sale.detail[0].aa=response.data.total
                      that.sale.detail[0].trade_type=3
                      that.sale.contract_number=response.data.orderNo
                      that.pre = response.data.orderNoPre
                      that.number = response.data.orderNoNum
                      that.sale.total_money = response.data.total
                      that.sale.customer_po=response.data.customerpo
                      that.sale.detail[0].deliver_note = response.data.shippingAddress.contact_name+response.data.shippingAddress.mobile+response.data.shippingAddress.address_more+response.data.shippingAddress.address
                      that.invoice_type.forEach(items=>{
                        if(items.name==response.data.invoice){
                          that.sale.detail[0].invoice_type_id=items.id
                        }
                      })
                      if(response.data.packunit.toLocaleLowerCase()=='mg'){
                          that.sale.detail[0].quantity_unit=1
                          that.sale.detail[0].quantity= Number(new Big(response.data.quantity).div(1000))
                      }else{
                        that.sale.detail[0].quantity = response.data.quantity
                      }
                      if(response.data.packunit.toLocaleLowerCase()=='g'){
                        that.sale.detail[0].quantity_unit = 1
                      }else if(response.data.packunit.toLocaleLowerCase()=='kg'){
                        that.sale.detail[0].quantity_unit = 4
                      }else if(response.data.packunit.toLocaleLowerCase()=='ton'){
                        that.sale.detail[0].quantity_unit= 3
                      }else if(response.data.packunit.toLocaleLowerCase()=='ml'){
                        that.sale.detail[0].quantity_unit = 2
                      }else if(response.data.packunit.toLocaleLowerCase()=='l'){
                        that.sale.detail[0].quantity_unit = 6
                      }
                      that.sale.detail[0].price=Number(new Big(response.data.total).div(that.sale.detail[0].quantity)).toFixed(4)

                      if(response.data.source_type==2){
                          if(response.data.labgle_contact=='徐艳'){
                              that.sale.sale_id=162
                          }else if(response.data.labgle_contact=='沈璐雯'){
                              that.sale.sale_id=174
                          }else if(response.data.labgle_contact=='张红'){
                              that.sale.sale_id=157
                          }else{
                              that.sale.sale_id=157
                          }
                      }else{
                          that.sale.sale_id=116
                      }
                      if (that.sale.customer_name !== "") {
                          customer_lists(that.sale.customer_name).then(res => {
                            that.supply_list = res.data;
                            that.supplyChange_b()
                          });
                      } else {
                        that.supply_list = [];
                      }
                      cas_info(response.data.cas).then(res=>{
                        that.sale.detail[0].product_name_cn = res.data[0].name_cn;
                        that.sale.detail[0].product_name = res.data[0].name;
                        that.sale.detail[0].prod_id = res.data[0].prod_id;
                        that.sale.detail[0].productid2 = res.data[0].productid2
                        that.sale.detail[0].prodno = res.data[0].prodno
                          if(that.sale.detail[0].currency_id==2){
                            that.sale.detail[0].prod_no = res.data[0].productid2;
                          }else{
                            that.sale.detail[0].prod_no = res.data[0].prodno;
                          }
                      })
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
    currency_change(a) {
      this.currency_id = this.sale.detail[0].currency_id
      if(this.flag_map[this.user_flag]){
        if (this.sale.detail[0].currency_id == 2) {
          this.sale.delivery_type_id = 4;
          this.sale.type = 1;
        } else {
          this.sale.delivery_type_id = 3;
          this.sale.type = 2;
        }
        // this.sale.corp_id = 1000000
        // this.get_custcontact_crop_id(this.sale.corp_id)
        // this.sale.corp_id = this.flag_map[this.user_flag]
      }else{
        if (this.sale.detail[0].currency_id == 2) {
          this.sale.delivery_type_id = 4;
          this.sale.type = 1;
          this.corp.forEach(i=>{
            if(this.requestData.corp&&this.requestData.corp==1004484){
              if(i.id==1004484){this.sale.corp_id = 1004484}
            }else{
              if(i.id==100000){this.sale.corp_id = 100000}
            }
          })
          this.$forceUpdate();
        } else {
          this.corp.forEach(i=>{
            if(i.id==500000){this.sale.corp_id = 500000}
          })
          this.sale.delivery_type_id = 3;
          this.sale.type = 2;
          this.$forceUpdate();
        }
        this.get_custcontact_crop_id(this.sale.corp_id)
        this.sale.detail.forEach(item=>{
          if(item.currency_id==2){
            item.prod_no = item.productid2?item.productid2:''
          }else{
            item.prod_no = item.prodno?item.prodno:''
          }
        })
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
      this.sale.contract_number = this.pre+this.number
      if (this.sale.contract_number) {
        this.contract_name_button = false;
      } else {
        this.contract_name_button = true;
      }
    },
    generatePrebatchNo(index) {
      generatePrebatchNo(this.sale.contract_number).then(res => {
        this.sale.detail[index].batchno = res.data;
      });
    },
    select(i, item) {
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
              ? (res.data.info.contacts[0].phone?res.data.info.contacts[0].mobile:'')
              : '';
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
          this.sale.detail.forEach(item => {
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
        this.sale.type = 1;
        this.sale.detail.forEach((items, index) => {
          // items.currency_id = 2;
          items.trade_type = 2
        });
      } else {
        this.sale.type = 2;
        this.sale.detail.forEach((items, index) => {
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
          this.sale.detail.forEach(item => {
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
    select_express_account_type(id) {
      (this.sale.express_company_id = ""),
        (this.sale.express_account = ""),
        (this.express_company = []);
      this.account = [];
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
      (this.sale.express_account = ""),
        (this.account = this.get_deliver_goods[id]);
    },
    change_quantity(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        // if (items.quantity && items.quantity > 0) {
          items.aa = new Big(items.quantity).times(items.price).toFixed(2);
          money = new Big(money).plus(
            new Big(items.aa)
              .plus(items.additional_cost)
          );
        // }
      });
      this.sale.total_money = Number(money);
    },
    change_price(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        // if (items.price && items.price > 0) {
          items.aa = Math.round((new Big(items.quantity).times(items.price))*10000)/10000;
          money = new Big(money).plus(
            new Big(items.aa)
              .plus(items.additional_cost)
          );
        // }
      });
      this.sale.total_money = Number(money);
    },
    change_money(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        if (items.quantity && items.quantity > 0) {
          // items.price = new Big(items.aa).div(items.quantity).toFixed(4);
          items.price = Math.round((new Big(items.aa).div(items.quantity))*10000)/10000;
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
        this.sale.detail.forEach(item => {
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
      if(!this.sale.detail[index].cas){
        this.sale.detail[index].prod_no = ''
      }
    },
    handleSelect(item) {
      this.sale.detail[this.detail_index].cas = item.cas;
      this.sale.detail[this.detail_index].product_name_cn = item.name_cn;
      this.sale.detail[this.detail_index].product_name = item.name;
      this.sale.detail[this.detail_index].prod_id = item.prod_id;
      this.sale.detail[this.detail_index].prodno = item.prodno;
      this.sale.detail[this.detail_index].productid2 = item.productid2;
      if(!this.flag_map[this.user_flag]){
        if(this.sale.detail[this.detail_index].currency_id==2){
          this.sale.detail[this.detail_index].prod_no = item.productid2;
        }else{
          this.sale.detail[this.detail_index].prod_no = item.prodno;
        }
      }
    },
    fetch_data() {
        saler_contract().then(res => {
          // this.corp = res.data.corp;
          if(res.data.user.flag){
            this.user_flag = res.data.user.flag
          }
          // if(this.user_flag==2){
          //   this.sale.corp_id = 1000000
          // }else{
          //   this.sale.corp_id = 500000;
          // }
          if(res.enum.flag_map[this.user_flag]){
            var corp_id = res.enum.flag_map[this.user_flag]
            this.sale.corp_id = corp_id
            this.corp = res.data.corp.filter(i=>{return i.id==corp_id})
            if(this.user_flag == 3){
              this.sale.detail[0].currency_id = 2
            }
          }else{
            this.corp = res.data.corp;
            this.sale.corp_id = 500000;
            // this.corp.forEach((i,index)=>{
            //   for(var k in res.enum.flag_map){
            //     if(res.enum.flag_map[k]==i.id){
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
          this.get_custcontact_crop_id(this.sale.corp_id);
          this.sale.contract_address = res.data.corporation.signed_address;
          this.sale.contract_date = res.data.corporation.contractdate;
          this.sale.expdate_start = init();
          this.sale.transportation = res.data.corporation.transportation;
          this.sale.quality_stardard = res.data.corporation.quality_stardard;
          this.sale.reasonable_loss = res.data.corporation.reasonable_loss;
          this.sale.package_stardard = res.data.corporation.package_stardard;
          this.sale.accept_stardard = res.data.corporation.accept_mode;
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
          this.enums=res.enum;
          this.test_item = JSON.parse(JSON.stringify(res.enum.test_item));
          this.sale.detail[0].checked_items = res.enum.test_item;
          this.trade_mode = res.enum.trade_mode;
          this.product_file_info = res.enum.product_file_info;
          this.units = res.enum.units;
          this.product_type = res.enum.product_type;
          this.payment_type = res.enum.payment_type;
          this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info;
          this.trade_type = res.enum.trade_type;
          this.sale.corp_contact = JSON.parse(JSON.stringify(this.info.name));
          this.number_type_info = res.enum.number_type_info
          this.flag_map = res.enum.flag_map
          if(!this.$route.query.order_num||this.$route.query.order_num==''){
            this.pre = res.data.contract_number_info.pre
            this.number = res.data.contract_number_info.number
            this.sale.contract_number = res.data.contract_number_info.pre+res.data.contract_number_info.number
          }
          this.contract_address()
          // get_contract_number(this.currency_id).then(res_a=>{
          //   this.pre = res_a.data.pre
          //   this.number = res_a.data.number
          //   this.sale.contract_number = res_a.data.pre+res_a.data.number
          //   if (this.sale.contract_number) {
          //     this.contract_name_button = false;
          //   } else {
          //     this.contract_name_button = true;
          //   }
          // })
          this.$route.query.sales_add = false
          if(this.$route.query.order_num&&this.$route.query.order_num!=''){
            this.orderNo = this.$route.query.order_num
            this.request_orderNo()
          }
        }),
        sale_lists().then(res => {
          this.sale_list = res.data;
          if(this.sale_list.filter(i=>{return i.id == this.user_id})[0]){
            this.sale.sale_id = this.user_id
          }else{
            this.sale_list.push({id:this.user_id,name:this.user_name})
            this.sale.sale_id = this.user_id
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
    cost_close(){
      this.dialogVisible = false;
      this.additional= [
              {
                additional_type_id: "",
                price: ""
              }
            ]
    },
    add_demand() {
      let test_item = JSON.parse(JSON.stringify(this.test_item));
      this.sale.detail.push({
        inquiry_id: "",
        is_straight_hair:0,
        is_transfer:1,
        transfer_warehouse_id:'',
        straight_hair_note:'',
        batchno: "",
        cas: "",
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
        additional_cost: 0,
        checked_items: test_item,
        checked_requirement: "",
        package_requirement: "",
        deliver_note: "",
        label_requirement: "",
        file_requirement: "",
        product_file: [],
        if_declare: 0,
        trade_type: this.sale.detail[0].trade_type,
        required_delivery_date: "",
        if_auto_delivery: this.sale.detail[0].if_auto_delivery,
        is_generation: 0,
        commission:'',
        claims:[]
      });
    },
    add_cost() {
      // this.sale.detail[this.index].additional.push({
      //   additional_type_id: "",
      //   price: ""
      // });
      this.additional.push({
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
        if (items.additional_cost == 0) {
          delete items.additional;
        }
        if(items.aa){
          items.total_money = Number(new Big(items.aa).plus(items.additional_cost)).toFixed(2)
        }
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
      var tagName = "sales-add";
      delete this.sales.type
      // if(this.requestData.is_request&&this.requestData.orderNo){
      //   if(this.sales.contract_number!=this.requestData.orderNo){
      //     console.log(this.sales.contract_number)
      //     console.log(this.requestData.orderNo)
      //     this.$message.error('新建合同数据与请求数据有差异，请稍等后再试')
      //   }else{
      //     saler_create(this.sales, this, tagName)
      //   }
      // }else{
        saler_create(this.sales, this, tagName)
      // }
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
      const tagName = "sales-add";
      // this.closeAdd({
      //     tagName,
      //     vm: this
      // })
        that.closeAdd({ tagName });
        that.loading = false
    },
    delete_cost(index) {
      // this.sale.detail[this.index].additional.splice(index, 1);
      this.additional.splice(index,1)
    },
    delete_sale(item, index) {
      if (item.id) {
        destroy(item, "hs", "destroy", this, index);
      } else {
        this.sale.detail.splice(index, 1);
      }
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
    }
  }
};
function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
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
