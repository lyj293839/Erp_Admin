<style lang="scss" scoped type="text/scss">
/deep/.div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  margin: 0px auto;
  border: 1px solid #e5e5e5;
  .el-input__inner {
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
.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
}
/deep/.quoteInput {
  .el-input__inner {
    border: 1px solid #dcdfe6;
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
/deep/.checkbox_nei{
    margin-left: 10px;padding-left:0px;
    .el-checkbox__label{padding-left:0px;}
  }
/deep/.el-checkbox__label{padding-left:5px;}
</style>
<template>
  <d2-container>
    <div >
      <el-form label-width="0px" :model="addContract">
        <!-- 双方 -->
        <div class="div">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>双方</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">双方</th>
                <th class="td">名称</th>
                <th class="td">联系人</th>
                <th class="td">联系电话</th>
                <th class="td">传真</th>
              </tr>
              <tr>
                <td>甲方</td>
                <td>
                  <span style="color:red;">*</span>
                  <el-select
                    v-model="addContract.supplier_id"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    @change="supplyChange(addContract.supplier_id)"
                    :loading="supplyloading"
                    style="width:96%;"
                    size="small"
                  >
                    <el-option
                      v-for="item in supply_list"
                      :label="item.name"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  <el-input v-model="addContract.supplier_contact" size="small" style="width:96%"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_mobile" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.supplier_fax" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>乙方</td>
                <td>
                  <span style="color:red;">*</span>
                  <el-select
                    filterable
                    v-model="addContract.corp_id"
                    @change="corpChange()"
                    size="small"
                    style="width:96%;"
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
                  <span style="color:red;">*</span>
                  <el-input v-model="addContract.corp_contact" size="small" style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  <el-input v-model="addContract.corp_mobile" size="small" style="width:96%;"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>
                  <el-input v-model="addContract.corp_fax" size="small" style="width:96%;"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin-top: 20px;">
            合同号：
            <el-select v-model="addForm.prefix" size="small" @change="select_prefix">
              <el-option
                      v-for="item in ContractNumberPrefix"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                      style="border: 1px solid #f2f2f2;"
              ></el-option>
            </el-select>
            <el-input v-model="addForm.postfix" size="small" style="display: inline-block;width: 200px;margin-left: 5px;"></el-input>
        </div>
        <!-- 需求 -->
        <div class="div" style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
              <b>需求</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">
                  <span style="color:red;">*</span>CAS
                </th>
                <th class="td" style="width:140px;">批次</th>
                <th class="td">
                  <span style="color:red;">*</span>仓库
                </th>
                <th class="td">品牌</th>
                <th class="td">规格</th>
                <th class="td">纯度</th>
                <th class="td">数量</th>
                <th class="td">数量单位</th>
                <th class="td">毛重</th>
                <th class="td">毛重单位</th>
                <th class="td">货位</th>
                <th class="td">币种</th>
                <th class="td">单价</th>
                <th class="td">金额</th>
              </tr>
              <tr>
                <td>
                  <el-select
                    @change="casChange(list.cas)"
                    v-model="list.cas"
                    filterable
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
                <td>{{list.batchno}}</td>
                <td>
                  <el-select v-model="list.warehouse_id" size="small">
                    <el-option
                      v-for="item in warehouse"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
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
                  <el-input v-model="list.package" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="list.purity" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="list.quantity" @input="change_quantity()" size="small"></el-input>
                </td>
                <td>
                  <el-select v-model="list.quantity_unit" size="small">
                    <el-option
                      v-for="item in units"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="list.netweight" size="small" style="width:70%;"></el-input>
                </td>
                <td>
                  <el-select v-model="list.netweight_unit_id" size="small">
                    <el-option
                      v-for="item in units"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-autocomplete
                          v-model="list.shelf"
                          :fetch-suggestions="querySearch_shelf"
                          placeholder=""
                          size="mini"
                          @select="handleSelect_shelf"
                          clearable
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item }}</div>
                    </template>
                  </el-autocomplete>
                </td>
                <td>
                  <el-select v-model="list.currency_id" size="small">
                    <el-option
                      v-for="item in currency"
                      :key="item.id"
                      :label="item.name_cn"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="list.price" @input="change_price()" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="list.total_price" @input="change_money()" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>用途</td>
                <td>
                  <el-input size="small"></el-input>
                </td>
                <td>来货包装</td>
                <td>
                  <el-select v-model="list.in_virtualunit_id" size="small">
                    <el-option
                      v-for="item in virtualunits"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>存储条件</td>
                <td>
                  <el-select v-model="list.storagecondition_id" size="small">
                    <el-option
                      v-for="item in StorageCondition"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>产品特殊性</td>
                <td>
                  <el-input v-model="list.specificity" size="small"></el-input>
                </td>
                <td>
                  <span style="color:red;">*</span>发票类型
                </td>
                <td>
                  <el-select v-model="list.invoice_type_id" size="small">
                    <el-option
                      v-for="item in InvoiceInfo"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>产品外观</td>
                <td>
                  <el-select v-model="list.chemprodappearance_id" size="small">
                    <el-option
                      v-for="item in ChemicalAppearance"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-button type="text" @click="hand_additional()" size="mini">附加费用</el-button>
                </td>
                <td>{{list.additional_cost}}</td>
              </tr>
              <tr>
                <td>
                  <span style="color:red;">*</span>采购人员
                </td>
                <td>
                  <el-select v-model="addContract.purchase_user_id" size="small">
                    <el-option
                      v-for="item in purchaseList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;">*</span>销售人员
                </td>
                <td>
                  <el-select v-model="addContract.sale_id" size="small">
                    <el-option
                      v-for="item in salesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <span style="color:red;">*</span>生产日期
                </td>
                <td colspan="2">
                  <el-date-picker
                    size="mini"
                    type="date"
                    style="width:100%;padding: 0 30px;box-sizing: border-box;"
                    v-model="list.manufactured_at"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>
                <td>
                  <span style="color:red;">*</span>有效期
                </td>
                <td colspan="2">
                  <el-date-picker
                    size="mini"
                    type="date"
                    style="width:100%;padding: 0 30px;box-sizing: border-box;"
                    v-model="list.expired_at"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </td>

                <td>快递单号</td>
                <td>
                  <el-input v-model="list.express_number" size="small"></el-input>
                </td>
                <td>快递费用</td>
                <td>
                  <el-input v-model="list.express_fee" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td>分析要求</td>
                <td colspan="13">
                  <!-- <el-checkbox-group v-model="list.checked_items">
                    <el-checkbox
                      v-for="item in testitems"
                      :label="item.id"
                      :key="item.id"
                    >{{item.name}}</el-checkbox>
                  </el-checkbox-group>-->
                  <span
                    v-for="i in list.checked_items"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="i in list.checked_items" v-if="i.child.length!=0" style="display: inline-block;width:40%;">
                      <span>{{i.name}}</span>
                        <el-checkbox
                          v-for="j in i.child"
                          :key="j.id"
                          :label="j.id"
                          v-model="j.checked"
                          @change="select(j.id,j.checked)"
                          class="checkbox_nei"
                        ><span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>
                  </div>
                </td>
              </tr>
              <tr>
                <td>其他要求</td>
                <td colspan="7">
                  <el-input v-model="list.checked_requirement" size="small"></el-input>
                </td>
                <td>运输条件</td>
                <td colspan="2"></td>
                <td>危险性</td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>包装要求</td>
                <td colspan="7">
                  <el-input v-model="list.package_requirement" size="small"></el-input>
                </td>
                <td>标签要求</td>
                <td colspan="7">
                  <el-input v-model="list.label_requirement" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="12"></td>
                <td>
                  <span style="color:red;">*</span>总金额
                </td>
                <td>
                  <el-input v-model="addContract.total_money" disabled size="small"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="display:flex;justify-content: flex-end;margin:0px;">
          <el-button type="primary" @click="saveAdd()" size="mini">保存</el-button>
          <el-button @click="close()" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
      <!-- 额外费用 -->
      <el-dialog class="div" :visible.sync="additional" width="30%">
        <el-form >
          <el-form-item>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td>费用名称</td>
                <td>金额</td>
                <td>操作</td>
              </tr>
              <tr v-for="item in list.additional">
                <td>
                  <el-select style="width:100%;" v-model="item.additional_type_id" size="small">
                    <el-option
                      v-for="item in additional_type"
                      :key="item.id"
                      :label="item.name_cn"
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
            <el-button type="primary" @click="save_Additional()" size="small">保存</el-button>
            <el-button class="sbaoClose" @click="close_Additional()" size="small">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </d2-container>
</template>
<script>
import $ from "jquery";
import axios from "axios";
import { getShevies } from '@/api/instore'
// import Cookies from "js-cookie";
import request from "@/plugin/axios";
import { futureDate } from '@/utils/index'
import { lists, listTotal, update, create } from "@/api/prod";
import { storageIn, saler_contract_info,generatePrebatchNo } from "@/api/warehouse";
import { tsTypeQuery, declareModuleExports } from "@babel/types";
import { delimiter } from "path";
import Big from "@/big/a/big.mjs";
import { mapState, mapActions } from "vuex";
export default {
  name: "Warehouse-instoreForm",
  data() {
    return {
      form_show1: true,
      form_show2: true,
      additional: false,
      cas_list: [],
      loadCas: false,
      supplyloading: false,
      list: {
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
        quantity_unit: 1,
        netweight: "",
        netweight_unit_id: 1,
        price: "",
        currency_id: 1,
        total_price: "",
        // purchase_user_id: "",
        delivery_date: "",
        invoice_type_id: "",
        checked_requirement: "",
        label_requirement: "",
        package_requirement: "",
        product_file: [],
        is_stock: "",
        note: "",
        checked_items: [],
        if_declare: "",
        prod_id: "",

        manufactured_at:'',
        expired_at: '',
        batchno: "",
        in_virtualunit_id: "",
        storagecondition_id: "",
        chemprodappearance_id: "",
        specificity: "",
        warehouse_id: "",
        shelf: "",
        netweight: "",
        express_fee: "",
        express_number: "",
        purchase_user_id: ""
        // sale_id: ""
      },
      addContract: {
        prefix:'',
        accept_mode: "",
        supplier_id: "",
        supplier_name: "",
        supplier_contact: "",
        supplier_mobile: "",
        supplier_fax: "",
        contract_number:'',
        corp_id: "",
        corp_name: "",
        corp_contact: "",
        corp_mobile: "",
        corp_fax: "",
        detail: [],
        contract_date: "",
        signed_address: "",
        purchase_user_id: "",
        sale_id: "",
        customer_po: "",
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
        if_echapter: ""
      },
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
      supply_list: [],
      additional_type: [],
      transportation: [],
      brand_list: [],
      ChemicalAppearance: [],
      StorageCondition: [],
      virtualunits: [],
      warehouse: [],
      ContractNumberPrefix:{},
      addForm:{
          prefix:'',
          postfix:''
      }
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Warehouse-instoreForm'){
            this.fetchData_a()
        }
    }
  },
  created() {
    this.fetchData_a();
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
      querySearch_shelf (queryString, cb) {
          getShevies(this.list.warehouse_id).then(res => {
              var restaurants = []
              for (var i in res.data) {
                  restaurants.push(res.data[i])
              }
              cb(restaurants)
          })
      },
      handleSelect_shelf (item) {
          this.list.shelf = item
      },
    select_prefix(){
        let obj=this.addForm.prefix+this.addForm.postfix
        this.addContract.contract_number=obj
        generatePrebatchNo(obj).then(res=>{
            if(res&&res.code==0){
                this.list.batchno=res.data
            }
        })
    },
    select(id,checked) {
      if(checked){
        this.list.checked_items.forEach((items, index) => {
          items.child.forEach((m, n) => {
            if (id == m.id) {
              this.$set(this.list.checked_items[index], "checked", true);
            }
          });
        });
      }else{
        this.list.checked_items.forEach((items, index) => {
          items.child.forEach((m, n) => {
            if (id == m.id) {
              this.$set(this.list.checked_items[index], "checked", false);
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
    fetchData_a() {
        storageIn().then(res => {
        this.ChemicalAppearance = res.enum.ChemicalAppearance;
        this.StorageCondition = res.enum.StorageCondition;
        this.virtualunits = res.enum.virtualunits;
        this.warehouse = res.enum.warehouse;
        this.list.checked_items = res.enum.test_item;
            var d = new Date();
            var y1 = d.getFullYear();
            var m1 = d.getMonth() + 1;
            var d1 = d.getDate();
            if (m1 < 10) {
                m1 = '0' + m1;
            }
            if (d1 < 10) {
                d1 = '0' + d1;
            }
            this.list.manufactured_at = y1 + '-' + m1 + '-' + d1;
            this.list.expired_at = futureDate(y1 + '-' + m1 + '-' + d1,90).split(' ')[0]
      });
      listTotal("ProcurementContract/generateDirect").then(res => {
        this.list.batchno = res.data.batchnumber;
        this.addForm.postfix=res.data.postfix_contract_number
        this.addContract.contract_number = res.data.contract_number;
        obj(this.units, res.enum.units);
        obj(this.currency, res.enum.Currency);
        obj(this.brand_list, res.enum.brands);
        obj(this.testitems, res.enum.testitems);
        obj(this.InvoiceInfo, res.enum.InvoiceInfo);
        obj(this.is_stock_info, res.enum.is_stock_info);
        obj(this.if_declare_info, res.enum.if_declare_info);
        obj(this.product_file_info, res.enum.product_file_info);
        obj(this.additional_type, res.enum.additional_cost_type);
        obj(this.settle_list, res.enum.PurchaseSettlementMethod);
        this.transportation = res.enum.transportation;
        this.corp_List = res.enum.company;
        this.ContractNumberPrefix=res.enum.ContractNumberPrefix
      });
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
      listTotal("data/user_list?user_type=102").then(res => {
        this.salesList = res.data;
      });
    },
    querySearch(queryString, cb) {
      var restaurants = [];
      for (var i = 0; i < this.transportation.length; i++) {
        var a = { value: "" };
        a.value = this.transportation[i];
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
    remoteCas(query) {
      if (query !== "") {
        this.loadCas = true;
        setTimeout(() => {
        listTotal("es/cas/" + query).then(res => {
          this.cas_list = res.data;
            this.loadCas = false;
        });
        }, 100);
      } else {
        this.cas_list = [];
      }
    },
    supplyChange(id) {
      this.addContract.supplier_name = this.supply_list.filter(item => {
        return item.id == this.addContract.supplier_id;
      })[0].name;
      saler_contract_info(id).then(res => {
        this.addContract.supplier_contact = res.data.info.contacts[0].name;
        this.addContract.supplier_mobile = res.data.info.contacts[0].phone;
        this.addContract.supplier_fax = res.data.info.contacts[0].fax;
      });
      let country_code = this.addContract.supplier_name
        ? this.supply_list.filter(item => {
            return item.name == this.addContract.supplier_name;
          })[0].country_code
        : "";
      if (country_code == "CHN") {
        this.list.currency_id = 2;
        this.list.invoice_type_id = "";
      } else {
        this.list.currency_id = 1;
        this.list.invoice_type_id = 5;
      }
    },
    casChange(a) {
      this.list.name_cn = this.cas_list.filter(item => {
        return item.cas == a;
      })[0].name_cn;
      this.list.name = this.cas_list.filter(item => {
        return item.cas == a;
      })[0].name;
      this.list.prod_id = this.cas_list.filter(item => {
        return item.cas == a;
      })[0].prod_id;
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
    change_quantity() {
      let money = 0;
      if (this.list.quantity && this.list.quantity > 0) {
        this.list.total_price = new Big(this.list.quantity)
          .times(this.list.price)
          .toFixed(2);
        money = new Big(this.list.quantity)
          .times(this.list.price)
          .plus(this.list.additional_cost);
      }
      this.addContract.total_money = Number(money);
    },
    change_price() {
      let money = 0;
      if (this.list.price && this.list.price > 0) {
        this.list.total_price = new Big(this.list.quantity)
          .times(this.list.price)
          .toFixed(2);
        money = new Big(this.list.quantity)
          .times(this.list.price)
          .plus(this.list.additional_cost);
      }
      this.addContract.total_money = Number(money);
    },
    change_money() {
      let money = 0;
      if (this.list.quantity && this.list.quantity > 0) {
        this.list.price = new Big(this.list.total_price)
          .div(this.list.quantity)
          .toFixed(2);
      }
      money = new Big(this.list.quantity)
        .times(this.list.price)
        .plus(this.list.additional_cost);
      this.addContract.total_money = Number(money);
    },
    // totalMoney() {
    //   this.addContract.total_money = 0;
    //   this.list.price = this.list.total_price / this.list.quantity;
    //   this.addContract.total_money =
    //     parseFloat(this.list.total_price) +
    //     parseFloat(this.list.additional_cost);
    // },
    // priceMoney() {
    //   this.addContract.total_money = 0;
    //   this.list.total_price = this.list.price * this.list.quantity;
    //   this.addContract.total_money =
    //     parseFloat(this.list.total_price) +
    //     parseFloat(this.list.additional_cost);
    // },
    hand_additional(a) {
      this.additional = true;
      var item = { additional_type_id: "", price: "" };
      this.list.additional.push(item);
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
        this.list.additional_cost += parseFloat(item.price);
      });
      this.list.total_price
        ? (this.addContract.total_money =
            parseFloat(this.list.total_price) +
            parseFloat(this.list.additional_cost))
        : (this.addContract.total_money = parseFloat(
            this.list.additional_cost
          ));
      this.additional = false;
    },
    close_Additional() {
      this.list.additional = this.list.additional.filter(res => {
        return res.additional_type_id != "" && res.price != "";
      });
      this.additional = false;
      this.additional_list = [];
    },
    saveAdd() {
      this.lists = JSON.parse(JSON.stringify(this.list));
      var arr = [];
      this.lists.checked_items.forEach(i => {
        if (i.checked == true) {
          arr.push(i);
        }
      });
      this.lists.checked_items = arr;
      this.lists.checked_items.forEach(j => {
        var brr = [];
        j.child.forEach(n => {
          if (n.checked == true) {
            brr.push(n);
          }
        });
        j.child = brr;
      });

      this.lists.notice_id = this.lists.inquiry_id;
      //   this.addContract.purchase_user_id = this.list.purchase_user_id;
      this.lists.supplier_id = this.addContract.supplier_id;
      this.lists.supplier_name = this.addContract.supplier_name;
      this.addContract.currency_id = this.lists.currency_id;
      this.addContract.prefix=this.addForm.prefix;
      this.addContract.detail[0] = this.lists;
      this.addContract.detail[0] = JSON.parse(
        JSON.stringify(this.addContract.detail[0]).replace(
          /contract_number/g,
          "procurement_contract_number"
        )
      );
      createMethod(this.addContract, "storageIn", "create", this);
    },
    close() {
      let that=this
      that.$router.push({
        path: "/Warehouse/instore",
        name: "Warehouse-instore"
      });
      // Cookies.remove("addContract");
      // Cookies.remove("list");
      const tagName = "Warehouse-instoreForm";
      that.closeAdd({ tagName });
    }
  }
};
function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
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
        that.list.contract_status = 1;
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
</script>











