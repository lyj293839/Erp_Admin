<style lang="scss" scoped type="text/scss">
/deep/.div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  border: 1px solid #e5e5e5;
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
.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
  table {
    border-collapse: collapse;
    margin-top: 5px;
    width: 100%;
    .el-select {
      width: 100%;
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
/deep/.checkbox_nei{
    margin-left: 10px;padding-left:0px;
    .el-checkbox__label{padding-left:0px;}
  }
/deep/.el-checkbox__label{padding-left:5px;}
.el-checkbox{margin-right: 0px;}
</style>
<template>
  <d2-container>
    <div class="div">
      <div style="margin:20px 0px;">
        <el-form label-width="0px" label-position="right" style="background-color: #fff">
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
              <b>需求</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <div v-for="(index_,index) in addContract_detail">
              <table border="1" bordercolor="#E5E5E5">
                <tr>
                  <th class="td">#询单号</th>
                  <th class="td" width="150px">Cas</th>
                  <th style="width:200px;">产品名称</th>
                  <th class="td">品牌</th>
                  <th class="td">规格</th>
                  <th class="td">纯度</th>
                  <th class="td">数量</th>
                  <th class="td">数量单位</th>
                  <th class="td">币种</th>
                  <th class="td">单价</th>
                  <th class="td">金额</th>
                  <th>提交货时间</th>
                  <th class="td"></th>
                </tr>
                <tr>
                  <td>
                    <el-input readonly v-model="index_.inquiry_id" size="small"></el-input>
                  </td>
                  <td>
                    <el-input readonly v-model="index_.cas" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.product_name_cn" size="small"></el-input>
                  </td>
                  <td>
                    <el-select clearable v-model="index_.brand_id" size="small">
                      <el-option
                        v-for="item in brand_list"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index_.package" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.purity" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.quantity" @change="priceMoney()" size="small"></el-input>
                  </td>
                  <td>
                    <el-select v-model="index_.quantity_unit" size="small">
                      <el-option
                        v-for="item in units"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select v-model="index_.currency_id" size="small">
                      <el-option
                        v-for="item in currency"
                        :key="item.id"
                        :label="item.name_cn"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-input v-model="index_.price" @change="priceMoney()" size="small"></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.total_price" @change="totalMoney()" size="small"></el-input>
                  </td>
                  <td class="dateInput">
                    <el-date-picker type="date" style="width:100%;" v-model="index_.delivery_date"></el-date-picker>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>子合同号</td>
                  <td>
                    <el-input
                      v-model="index_.contract_number"
                      @change="contractChange()"
                      size="small"
                    ></el-input>
                  </td>
                  <td>
                    <el-input v-model="index_.product_name" size="small"></el-input>
                  </td>
                  <td><span style="color:red;">*</span> {{$t('procure.agree.agree22')}}</td><!-- 发票类型 -->
                  <td colspan="2">
                    <el-select v-model="index_.invoice_type"
                               size="small" clearable>
                      <el-option
                              v-for="item,key in enums.pu_invoice_types"
                              :key="key"
                              :label="enums.pu_invoice_types[key]"
                              :value="enums.pu_invoice_types[key]"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>发票类型</td>
                  <td colspan="2">
                    <el-select v-model="index_.invoice_type_id" size="small">
                      <el-option
                        v-for="item in Invoicetype"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <!--<td>-->
                    <!--<el-button type="text" @click="hand_additional(index_)" size="mini">附加费用</el-button>-->
                  <!--</td>-->
                  <!--<td colspan="3"></td>-->
                  <!--<td>{{index.additional_cost}}</td>-->
                  <td>是否现货</td>
                  <td>
                    <el-select v-model="index_.is_stock" size="small">
                      <el-option
                        v-for="item in is_stock_info"
                        :key="item.id"
                        :label="item.name_cn"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td>分析要求</td>
                  <td colspan="12">
                    <span v-for="i in index_.checked_items" :label="i.id" style="margin:0 5px">
                      <el-checkbox v-model="i.checked" name="type" v-if="i.child.length==0">{{i.name}}</el-checkbox>
                    </span><br>
                      <div v-for="i in index_.checked_items" v-if="i.child.length1=0" style="margin-right:10px;display: inline-block;width:40%;">
                        <span>{{i.name}}</span>:
                        <el-checkbox v-for="j in i.child" :key="j.id" :label="j.id" v-model="j.checked" @change="select(index_,j,item.id,j.checked)" class="checkbox_nei"><span  style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>&nbsp;&nbsp;&nbsp;&nbsp;
                      </div>
                  </td>
                </tr>
                <tr>
                  <td>是否免检</td>
                  <td colspan="12">
                    <el-radio-group v-model="index_.if_need_check">
                      <el-radio :label="1">不免检</el-radio>
                      <el-radio :label="2">免检</el-radio>
                    </el-radio-group>
                  </td>
                </tr>
                <tr>
                  <td>采购备注</td>
                  <td colspan="5">
                    <el-input v-model="index_.purchase_requirement" size="small"></el-input>
                  </td>
                  <td>存储条件</td>
                  <td colspan="2"></td>
                  <td>运输条件</td>
                  <td colspan="2"></td>
                  <!--<td>危险性</td>-->
                  <!--<td></td>-->
                </tr>
                <tr>
                  <td>分析备注</td>
                  <td colspan="12">
                    <el-input v-model="index_.checked_requirement" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>包装要求</td>
                  <td colspan="5">
                    <el-input v-model="index_.package_requirement" size="small"></el-input>
                  </td>
                  <td>要求发货时间</td>
                  <td colspan="6" class="dateInput">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index_.required_delivery_date"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </td>
                </tr>
                <tr>
                  <td>标签要求</td>
                  <td colspan="5">
                    <el-input v-model="index_.label_requirement" size="small"></el-input>
                  </td>
                  <td>发货备注</td>
                  <td colspan="6">
                    <el-input v-model="index_.note" size="small"></el-input>
                  </td>
                </tr>
                <tr>
                  <td>随货文件</td>
                  <td colspan="5">
                    <el-checkbox-group v-model="index_.product_file">
                      <el-checkbox
                        v-for="item in product_file_info"
                        :label="item.id"
                        :key="item.id"
                      >{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                  </td>
                  <td>生产日期</td>
                  <td colspan="2" class="dateInput">
                    <el-date-picker
                      type="date"
                      style="width:100%;"
                      v-model="index_.production_date"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </td>
                  <td>是否需要报关</td>
                  <td>
                    <el-select v-model="index_.if_declare" size="small">
                      <el-option
                        v-for="item in if_declare_info"
                        :key="item.id"
                        :label="item.name_cn"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="text" @click="hand_quoteinfo(index_)" disabled size="mini">采购报价</el-button>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <span style="color:red;">*</span>分装要求
                  </td>
                  <td colspan="12">
                    <el-input v-model="index_.packing_requirement" size="small"></el-input>
                  </td>
                </tr>
              </table>
            </div>
          </el-form-item>
          <el-form-item
            class="from-item"
            style="display:flex;justify-content: flex-end;margin:0px;"
          >
            <el-button type="primary" @click="saveAdd()" size="mini">保存</el-button>
            <el-button class="sbaoClose" @click="close()" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 额外费用 -->
      <el-dialog :visible.sync="additional" width="30%">
        <el-form>
          <el-form-item>
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td>费用名称</td>
                <td>金额</td>
                <td>操作</td>
              </tr>
              <tr v-for="item in additional_list">
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
            <el-button type="primary" @click="save_Additional()" size="mini">保存</el-button>
            <el-button class="sbaoClose" @click="close_Additional()" size="mini">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 采购详情 -->
      <!-- <el-dialog :visible.sync="quoteinfo" width="40%">
        <el-form :model="quote_info">
          <el-form-item label="采购报价">
            <el-input type="textarea" v-model="quote_info.quote_info"></el-input>
          </el-form-item>
          <el-row type="flex" justify="space-between">
            <el-col :span="10">
              <el-form-item label="性状描述">
                <el-input v-model="quote_info.character_info"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="交货城市">
                <el-input v-model="quote_info.delivery_city"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              @click="save_quoteinfo(quote_info)"
              icon="el-icon-edit-outline"
            >保存</el-button>
            <el-button class="sbaoClose" @click="close_quoteinfo(quote_info)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>-->
    </div>
  </d2-container>
</template>
<script>
import play from "../agree/play";
import Cookies from "js-cookie";
import $ from "jquery";
import axios from "axios";
import request from "@/plugin/axios";
import { lists, listTotal, listPost } from "@/api/prod";
import { mapState, mapActions } from "vuex";
export default {
  name: "procure-packRequiery",
  components: {
    play
  },
  data() {
    return {
      form_show2: true,
      additional: false,
      quoteinfo: false,
      play: false,
      quote_info: {},
      addContract_detail: [],
      additional_list: [],
      additional_type: [],
      corp_List: [],
      units: [],
      currency: [],
      Invoicetype: [],
      testitems: [],
      is_stock_info: [],
      product_file_info: [],
      if_declare_info: [],
      brand_list: []
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='procure-packRequiery'){
          listPost("ProcurementContract",this.$route.query.item_id, "edit").then(res => {
            this.addContract_detail = res.data.details;
            this.addContract_detail = JSON.parse(
              JSON.stringify(this.addContract_detail)
                .replace(/procurement_contract_number/g, "contract_number")
                .replace(/name/g, "product_name")
            );
            this.addContract_detail.forEach(element => {
              element.quantity_unit = parseInt(element.quantity_unit);
              element.checked_items = JSON.parse(
                JSON.stringify(element.checked_items).replace(
                  /product_name/g,
                  "name"
                )
              );
            });
          });
          this.fetchData_a();
        }
    }
  },
  created() {
    // if (this.$route.query.ids) {
    //   Cookies.set("ids", this.$route.query.item_id);
    //   this.addContract_detail = this.$route.query.ids;
    //   this.addContract_detail = JSON.parse(
    //     JSON.stringify(this.addContract_detail)
    //       .replace(/notice_number/g, "contract_number")
    //       .replace(/name/g, "product_name")
    //   );
    //   this.addContract_detail.forEach(element => {
    //     element.quantity_unit = parseInt(element.quantity_unit);
    //     element.checked_items = JSON.parse(
    //       JSON.stringify(element.checked_items).replace(/product_name/g, "name")
    //     );
    //   });
    // } else {
    //   listPost("ProcurementContract", Cookies.get("ids"), "edit").then(res => {
    //     this.addContract_detail = res.data.details;
    //     this.addContract_detail = JSON.parse(
    //       JSON.stringify(this.addContract_detail)
    //         .replace(/notice_number/g, "contract_number")
    //         .replace(/name/g, "product_name")
    //     );
    //     this.addContract_detail.forEach(element => {
    //       element.quantity_unit = parseInt(element.quantity_unit);
    //       element.checked_items = JSON.parse(
    //         JSON.stringify(element.checked_items).replace(
    //           /product_name/g,
    //           "name"
    //         )
    //       );
    //     });
    //   });
    // }
    listPost("ProcurementContract",this.$route.query.item_id, "edit").then(res => {
        this.addContract_detail = res.data.details;
        this.addContract_detail = JSON.parse(
          JSON.stringify(this.addContract_detail)
            .replace(/procurement_contract_number/g, "contract_number")
            .replace(/name/g, "product_name")
        );
        this.addContract_detail.forEach(element => {
          element.quantity_unit = parseInt(element.quantity_unit);
          element.checked_items = JSON.parse(
            JSON.stringify(element.checked_items).replace(
              /product_name/g,
              "name"
            )
          );
        });
      });
    this.fetchData_a();
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData_a() {
      listTotal("ProcurementContract/generateDirect").then(res => {
        obj(this.units, res.enum.units);
        obj(this.currency, res.enum.Currency);
        obj(this.brand_list, res.enum.brands);
        obj(this.testitems, res.enum.testitems);
        obj(this.Invoicetype, res.enum.Invoicetype);
        obj(this.is_stock_info, res.enum.is_stock_info);
        obj(this.if_declare_info, res.enum.if_declare_info);
        obj(this.product_file_info, res.enum.product_file_info);
        obj(this.additional_type, res.enum.additional_cost_type);
      });
    },
    totalMoney() {
      this.addContract.total_money = 0;
      for (var i = 0; i < this.addContract_detail.length; i++) {
        this.addContract_detail[i].price =
          this.addContract_detail[i].total_price /
          this.addContract_detail[i].quantity;
      }
    },
    contractChange() {
      this.addContract.contract_number = "";
      for (var i = 0; i < this.addContract_detail.length; i++) {
        if (i < this.addContract_detail.length - 1) {
          this.addContract.contract_number +=
            this.addContract_detail[i].contract_number + "-";
        } else {
          this.addContract.contract_number += this.addContract_detail[
            i
          ].contract_number;
        }
      }
    },
    hand_additional(a) {
      this.additional = true;
      this.additional_list = a.additional;
      var ids = { additional_type_id: "", price: "", contract_detail_id: a.id };
      this.additional_list.push(ids);
    },
    hand_quoteinfo(item) {
      this.quoteinfo = true;
      this.quote_info = item;
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
      this.addContract_detail.forEach(item => {
        for (var i = 0; i < this.additional_list.length; i++) {
          if (this.additional_list[i].contract_detail_id == item.id) {
            item.additional = this.additional_list.filter(res => {
              return res.additional_type_id != "" && res.price != "";
            });
            item.additional_cost = 0;
            item.additional.forEach(res => {
              item.additional_cost += parseFloat(res.price);
              res.contract_detail_id = item.id;
            });
          }
        }
      });
      this.addContract_detail.forEach(item => {
        item.additional = item.additional.filter(res => {
          return res.additional_type_id != "" && res.price != "";
        });
      });
      this.additional = false;
      this.additional_list = [];
    },
    close_Additional() {
      this.addContract_detail.forEach(item => {
        item.additional = item.additional.filter(res => {
          return res.additional_type_id != "" || res.price != "";
        });
      });
      this.additional = false;
      this.additional_list = [];
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
    saveAdd() {
      var pack_request_obj = { data: [] };
      pack_request_obj.procurement_contract_id = this.addContract_detail[0].procurement_contract_id;
      this.addContract_detail.forEach(item => {
        pack_request_obj.data.push({
          id: item.id,
          packing_requirement: item.packing_requirement
        });
      });
      createMethod(
        pack_request_obj,
        "ProcurementContract",
        "updatePackingRequirement",
        this
      );
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
          const tagName = "procure-packRequiery";
          that.closeAdd({ tagName });
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
      datas.loading = false;
    });
}
</script>
