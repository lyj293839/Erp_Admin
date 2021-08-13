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
  // display: flex;
  overflow: auto;
  // flex-wrap: wrap;
  /deep/.el-form-item__content{width: 100%;}
  /deep/.el-input__inner {
    border: none;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
}
</style>
<template>
  <d2-container>
    <div class="div sales">
      <el-form label-width="0px">
        <div style="background:#f1f1f1;padding:10px 10px;">
          <span style="color:red;margin-right:5px;">*</span>
          <el-select
            v-model="saler_detail_select"
            :placeholder="$t('sale.add.sale221')"
            @change="saler_detail_charge()"
          ><!-- 请先选择CAS -->
            <el-option
              v-for="item in saler_detail_list"
              :key="item.id"
              :label="item.cas"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
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
                <th class="td">{{$t('sale.add.sale3')}}</th><!-- 名称 -->
                <th class="td">{{$t('sale.add.sale4')}}</th><!-- 联系人 -->
                <th class="td">{{$t('sale.add.sale5')}}</th><!-- 联系电话 -->
                <th class="td">{{$t('sale.add.sale6')}}</th><!-- 传真 -->
              </tr>
              <tr>
                <td>{{$t('sale.add.sale7')}}</td><!-- 甲方 -->
                <td>
                  <el-autocomplete
                    v-model="sale.customer_name"
                    :fetch-suggestions="querySearchAsync_customer"
                    @select="handleSelect_customer"
                    style="width: 100%;"
                  >
                    <template slot-scope="{ item }">
                      <div class="mac">{{ item.name }}</div>
                    </template>
                  </el-autocomplete>
                </td>
                <td>
                  <el-input v-model="sale.customer_contact"></el-input>
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
                  <el-select
                    v-model="sale.corp_id"
                    @change="get_custcontact_crop_id(sale.corp_id)"
                    clearable
                    filterable
                    style="width:100%;"
                  >
                    <el-option v-for="i in corp" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="sale.corp_contact"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.corp_mobile"></el-input>
                </td>
                <td>
                  <el-input v-model="sale.corp_fax"></el-input>
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
            <!-- <el-button
              style="float: right;margin: 7px 7px 0 0;color: white;"
              type="primary"
              size="mini"
              @click="add_demand"
            >{{$t('add')}}</el-button>-->
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
                        :label="i.name"
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
                <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button><!-- 取 消 -->
                <el-button type="primary" @click="hide_dialogVisible">{{$t('define')}}</el-button><!-- 确 定 -->
              </span>
            </el-dialog>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale84')}}</th><!-- 询单号 -->
                <th class="td">Cas</th>
                <th class="td" width="400">{{$t('sale.add.sale15')}}</th><!-- 产品名称 -->
                <th class="td">{{$t('sale.add.sale16')}}</th><!-- 规格 -->
                <th class="td">{{$t('sale.add.sale17')}}</th><!-- 纯度 -->
                <th class="td">{{$t('sale.add.sale18')}}</th><!-- 数量 -->
                <th class="td">{{$t('sale.add.sale19')}}</th><!-- 数量单位 -->
                <th class="td">{{$t('sale.add.sale20')}}</th><!-- 币种 -->
                <th class="td">{{$t('sale.add.sale21')}}</th><!-- 单价 -->
                <th class="td">{{$t('sale.add.sale22')}}</th><!-- 金额 -->
                <th class="td" width="200">{{$t('sale.add.sale23')}}</th><!-- 提交货时间 -->
                <th></th>
              </tr>
              <tr>
                <td>
                  <el-input v-model="item.inquiry_id" disabled></el-input>
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
                  <el-select v-model="item.quantity_unit" clearable filterable>
                    <el-option v-for="i in units" :key="i.id" :label="i.name" :value="i.id"></el-option>
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
                <td>{{item.quantity*item.price>0?item.quantity*item.price:''}}</td>
                <td>
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.leadtime"
                    value-format="yyyy-MM-dd"
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
                <td>{{$t('sale.add.sale25')}}</td><!-- 发票类型 -->
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
                  <!-- <el-button type="primary" size="mini" @click="show_dialog(index)">附加费用</el-button> -->
                  {{$t('sale.add.sale26')}}<!-- 附加费用 -->
                </td>
                <td>{{item.additional_cost}}</td>
                <td>{{$t('sale.add.sale124')}}</td>
                <td>{{item.commission}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale27')}}</td><!-- 分析要求 -->
                <td colspan="10">
                  <el-checkbox-group v-model="item.checked_items">
                    <el-checkbox v-for="i in test_item" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale28')}}</td><!-- 其他要求 -->
                <td colspan="4">
                  <el-input v-model="item.checked_requirement"></el-input>
                </td>
                <td>{{$t('sale.add.sale29')}}</td>
                <td><!-- 是否需要报关 -->
                  <el-select v-model="item.if_declare">
                    <el-option
                      v-for="i in if_declare_info"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale31')}}</td><!-- 包装要求 -->
                <td colspan="4">
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
                      <el-option v-for="i in units" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                  </div>
                </td>
                <td>{{$t('sale.add.sale32')}}</td><!-- 要求发货时间 -->
                <td colspan="5">
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="item.required_delivery_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale33')}}</td><!-- 标签要求 -->
                <td colspan="4">
                  <el-input v-model="item.label_requirement"></el-input>
                </td>
                <td>{{$t('sale.add.sale34')}}</td><!-- 发货备注 -->
                <td colspan="5">
                  <el-input v-model="item.deliver_note"></el-input>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td><!-- 随货文件 -->
                <td colspan="4">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{$t('sale.add.sale36')}}</td><!-- 是否自动发货 -->
                <td colspan="5">
                  <el-radio-group v-model="item.if_auto_delivery">
                    <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio><!-- 自动 -->
                    <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio><!-- 不自动 -->
                  </el-radio-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale39')}}</td><!-- 是否代发 -->
                <td colspan="4">
                  <el-radio-group v-model="item.is_generation">
                    <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio><!-- 是 -->
                    <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio><!-- 否 -->
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
                <td colspan="10">
                  <el-radio-group v-model="item.is_transfer">
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
                <td colspan="5"></td>
                <td>{{$t('sale.add.sale42')}}</td><!-- 总金额 -->
                <td colspan="5">{{sale.total_money>0?sale.total_money:''}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale222')}}</b><!-- 已经提交的采购通知单 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">#ID</th>
                <th class="td">{{$t('sale.add.sale223')}}</th><!-- 供应商名称 -->
                <th class="td">{{$t('sale.add.sale224')}}</th><!-- 采购 -->
                <th class="td">{{$t('sale.add.sale17')}}</th><!-- 纯度 -->
                <th class="td">{{$t('sale.add.sale225')}}</th><!-- 采购数量 -->
                <th class="td">{{$t('sale.add.sale21')}}</th><!-- 单价 -->
                <th class="td">{{$t('sale.add.sale22')}}</th><!-- 金额 -->
                <th class="td">{{$t('sale.add.sale23')}}</th><!-- 提交货时间 -->
                <!--<th class="td">审核状态</th>-->
                <!--<th class="td">修改</th>-->
                <!--<th class="td">提交状态</th>-->
                <!--<th class="td">状态</th>-->
                <!--<th class="td">操作</th>-->
              </tr>
              <tr v-for="items in history">
                <td>{{items.id}}</td>
                <td>{{items.supplier.name}}</td>
                <td>{{items.purchase.name}}</td>
                <td>{{items.purity}}</td>
                <td>{{items.quantity}}</td>
                <td>{{items.price}}</td>
                <td>{{items.total_price}}</td>
                <td>{{items.delivery_date}}</td>
                <!--<td>{{items.check_status}}</td>-->
                <!--<td>{{items.total_price}}</td>-->
                <!--<td></td>-->
                <!--<td></td>-->
                <!--<td></td>-->
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale226')}}:</b><!-- 合同采购数量 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">#ID</th>
                <th class="td">{{$t('sale.add.sale223')}}</th><!-- 供应商名称 -->
                <th class="td">{{$t('sale.add.sale227')}}</th><!-- 报价信息 -->
                <th class="td">{{$t('sale.add.sale228')}}</th><!-- 外观性状 -->
                <th class="td">{{$t('sale.add.sale229')}}</th><!-- 交货城市 -->
                <th class="td" width="160">{{$t('sale.add.sale230')}}</th><!-- 报价时间 -->
                <th class="td">{{$t('sale.add.sale224')}}</th><!-- 采购 -->
                <th class="td">{{$t('sale.add.sale17')}}</th><!-- 纯度 -->
                <th class="td">{{$t('sale.add.sale18')}}</th><!-- 数量 -->
                <th class="td">{{$t('sale.add.sale19')}}</th><!-- 单位 -->
                <th class="td">{{$t('sale.add.sale23')}}</th><!-- 提交货时间 -->
                <th class="td">{{$t('sale.add.sale77')}}</th><!-- 操作 -->
              </tr>
              <tr v-for="items in applyPurchase">
                <td>{{items.id}}</td>
                <td>{{items.quote.supplier.english_name}}</td>
                <td>{{items.quote_price_string}}</td>
                <td>{{items.quote.remark}}</td>
                <td>{{items.quote.delivery_city}}</td>
                <td>{{items.quote.created_at}}</td>
                <td>{{items.inquiry.purchaseuser.name}}</td>
                <td>
                  <el-input v-model="items.purity"></el-input>
                </td>
                <td>
                  <el-input v-model="items.quantity"></el-input>
                </td>
                <td>{{items.quote_price[0].postfix_packunit}}</td>
                <td>
                  <el-date-picker
                    type="date"
                    style="width:100%;"
                    v-model="items.delivery_date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
                <td>
                  <el-button type="primary" @click="save(items)" size="mini">{{$t('sale.add.sale231')}}</el-button><!-- 采购通知 -->
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="justify-content: flex-end;margin:0px;">
          <el-button
            v-if="save_show"
            type="primary"
            :loading="loading"
            @click="save()"
            size="mini"
          >{{$t('save')}}</el-button><!-- 保存 -->
          <el-button @click="close()" size="mini">{{$t('cancel')}}</el-button><!-- 取消 -->
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
import {
  saler_select,
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
  applyPurchase,
  applyPurchase_create
} from "@/api/sale";
import $ from "jquery";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-procure",
  data() {
    return {
      corp: [],
      saler_detail_list: [],
      saler_detail_select: "",
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: true,
      check: false,
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
            is_generation: 0,
            commission:''
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
      applyPurchase: [],
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
      inventory_auto_preempt_info:[],
      save_show: true,
      check_contract: {
        saler_contract_id: "",
        approval_comment: "",
        status: ""
      },
      history: []
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='sales-procure'){
          this.fetch_data();
          if (this.$route.query.id) {
            saler_select(this.$route.query.id).then(res => {
              this.saler_detail_list = res.data;
            });
            this.check_contract.saler_contract_id = this.$route.query.id;
            this.save_show = false;
          }
        }
    }
  },
  created() {
    this.fetch_data();
    if (this.$route.query.id) {
      saler_select(this.$route.query.id).then(res => {
        this.saler_detail_list = res.data;
      });
      this.check_contract.saler_contract_id = this.$route.query.id;
      this.save_show = false;
      //   saler_contract_detail(this.$route.query.id).then(res => {
      //     res.data.detail = res.data.details;
      //     this.sale = res.data;
      //     saler_contract_info(res.data.customer_id).then(response => {
      //       response.data.info.receive_addresses.forEach((items, index) => {
      //         if (items.type == 1) {
      //           this.receive_invoice_addresses.push(items);
      //         } else {
      //           this.receive_goods_addresses.push(items);
      //         }
      //       });
      //     });
      //   });
      // applyPurchase(this.$route.query.id).then(res => {
      //   res.data.Inquiry_quotes.forEach((items, index) => {
      //     items.quantity = "";
      //     items.purity = "";
      //     items.delivery_date = "";
      //   });
      //   this.applyPurchase = res.data.Inquiry_quotes;
      //   this.history = res.data.history;
      // });
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    saler_detail_charge() {
      saler_contract_detail(this.$route.query.id).then(res => {
        res.data.detail = res.data.details;
        this.sale = res.data;
        this.sale.detail = this.saler_detail_list.filter(res => {
          return res.id == this.saler_detail_select;
        });
        applyPurchase(this.saler_detail_select).then(res => {
          res.data.Inquiry_quotes.forEach((items, index) => {
            items.quantity = "";
            items.purity = "";
            items.delivery_date = "";
          });
          this.applyPurchase = res.data.Inquiry_quotes;
          this.history = res.data.history;
        });
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
    },
    save(items) {
      let obj = {
        id: items.id,
        contract_detail_id: this.saler_detail_select,
        quote_id: items.quote_id,
        supplier_id: items.quote.supplier.id,
        purchase_user_id: items.inquiry.purchaseuser.id,
        quantity: items.quantity,
        purity: items.purity,
        delivery_date: items.delivery_date
      };
      this.loading = true
      applyPurchase_create(obj, this);
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
        money += parseFloat(
          items.quantity * items.price + items.additional_cost
        );
      });
      this.sale.total_money = money;
    },
    change_price(index) {
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        money += parseFloat(
          items.quantity * items.price + items.additional_cost
        );
      });
      this.sale.total_money = money;
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
    fetch_data() {
      saler_contract().then(res => {
        this.corp = res.data.corp;
        this.sale.contract_address = res.data.corporation.signed_address;
        this.sale.contract_date = res.data.corporation.contractdate;
        this.sale.transportation = res.data.corporation.expdate;
        this.sale.transportation = res.data.corporation.transportation;
        this.sale.quality_stardard = res.data.corporation.quality_stardard;
        this.sale.reasonable_loss = res.data.corporation.reasonable_loss;
        this.sale.package_stardard = res.data.corporation.package_stardard;
        this.sale.accept_stardard = res.data.corporation.accept_stardard;
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
        this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info;
      }),
        sale_lists().then(res => {
          this.sale_list = res.data;
        });
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
        num += parseFloat(item.price);
      });
      this.sale.detail[this.index].additional_cost = num;
      let money = 0;
      this.sale.detail.forEach((items, index) => {
        money += parseFloat(
          items.quantity * items.price + items.additional_cost
        );
      });
      this.sale.total_money = money;
    },
    add_demand() {
      this.sale.detail.push({
        inquiry_id: "",
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
    close() {
        var that = this
        that.$router.push({
        path: "/sales/sales",
        name: "sales-sales"
      });
      var tagName = 'sales-procure'
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
