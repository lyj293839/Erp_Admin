<style lang="scss" scoped type="text/scss">
.sbaoHeard {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 15px;
  .el-input {
    max-width: 200px;
  }
  .el-date-picker {
    max-width: 150px;
  }
  .el-select {
    max-width: 150px;
  }
}
.sbaoFrom {
  .el-checkbox {
    margin: 0px;
    /*width: 13%;*/
  }
  /deep/table {
    td{padding-left: 5px;}
    .el-input__inner {
      border: 0px;
      padding: 0px;
    }
    .el-select{width: 100%;}
  }
}
/deep/.inputStyle {
  .el-input__inner {
    border: 0px;
  }
}
</style>
<template>
  <d2-container>
    <el-form class="sbaoFrom">
      <el-form-item>
        <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
          <tr>
            <td>合同号</td>
            <td>
              <el-select v-model="editForm.prefix" size="small" style="width:100%;">
                <el-option
                  v-for="item in contractNumberPrefix"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="editForm.postfix" size="small"></el-input>
            </td>
            <td>供应商名称</td>
            <td>
              <el-select
                @change="supplyChange()"
                v-model="supply_name"
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod"
                :loading="loading"
                style="width:100%;"
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
          </tr>
          <tr>
            <td>CAS</td>
            <td colspan="2">
              <el-select
                @change="casEven(editForm.cas)"
                v-model="editForm.cas"
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
            <td>产品名称</td>
            <td>
              <el-input v-model="editForm.product_name+editForm.product_name_cn" size="small"></el-input>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item>
        <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
          <tr>
            <td>品牌</td>
            <td>规格</td>
            <td>纯度</td>
            <td>数量</td>
            <td>数量单位</td>
            <td>单价</td>
            <td>货币</td>
            <td>金额</td>
            <td>采购人员</td>
            <td>提交货时间</td>
          </tr>
          <tr></tr>
          <tr>
            <td>
              <el-select clearable v-model="editForm.brand_id" size="small">
                <el-option
                  v-for="item in brand_list"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="editForm.package" size="small"></el-input>
            </td>
            <td>
              <el-input v-model="editForm.purity" size="small"></el-input>
            </td>
            <td>
              <el-input v-model="editForm.quantity" @change="quantity_change()" size="small"></el-input>
            </td>
            <td>
              <el-select v-model="editForm.quantity_unit" size="small">
                <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="editForm.price" @change="price_change()" size="small"></el-input>
            </td>
            <td>
              <el-select v-model="editForm.currency_id" size="small">
                <el-option
                  v-for="item in currency"
                  :key="item.id"
                  :label="item.name_cn"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="editForm.total_price" @change="total_change()" size="small"></el-input>
            </td>
            <td>
              <el-select v-model="editForm.purchase_user_id" size="small">
                <el-option
                  v-for="item in purchaseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-date-picker
                type="date"
                v-model="editForm.delivery_date"
                value-format="yyyy-MM-dd"
                size="small"
              ></el-date-picker>
            </td>
          </tr>
          <tr>
            <td>发票类型</td>
            <td colspan="9">
              <el-radio-group v-model="editForm.invoice_type_id">
                <el-radio v-for="item in InvoiceInfo"  :key="item.id" :label="item.id">{{item.name}}</el-radio>
              </el-radio-group>
            </td>
          </tr>
          <tr>
            <td>分析要求</td>
            <td colspan="9">
              <span
                v-for="i in editForm.checked_items"
                v-if="i.child.length==0"
                :label="i.id"
                style="margin:0 5px"
              >
                <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
              </span>
              <div v-else>
                <el-card
                  v-for="i in editForm.checked_items"
                  v-if="i.child.length>0"
                  :label="i.id"
                  style="display: inline-block;"
                >
                  <!-- <el-checkbox v-model="i.checked" @change="select_parent(i)" name="type">
                    <div class="checked_items">{{i.name}}</div>
                  </el-checkbox> -->
                  <span>{{i.name}}</span>
                  <div>
                    <el-checkbox
                      v-for="j in i.child"
                      :key="j.id"
                      :label="j.id"
                      v-model="j.checked"
                      @change="select(j.id,j.checked)"
                    >{{j.name}}</el-checkbox>
                  </div>
                </el-card>
              </div>
            </td>
          </tr>
          <tr>
            <td>包装要求</td>
            <td colspan="4">
              <el-input v-model="editForm.package_requirement" size="small"></el-input>
            </td>
            <td>标签要求</td>
            <td colspan="4">
              <el-input v-model="editForm.label_requirement" size="small"></el-input>
            </td>
          </tr>
          <tr>
            <td>其他要求</td>
            <td colspan="9">
              <el-input v-model="editForm.checked_requirement" size="small"></el-input>
            </td>
          </tr>
          <tr>
            <td>随货文件</td>
            <td colspan="2">
              <el-checkbox-group v-model="editForm.product_file">
                <el-checkbox
                  v-for="item in product_file_info"
                  :label="item.id"
                  :key="item.id"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </td>
            <td>是否报关</td>
            <td colspan="3">
              <el-select v-model="editForm.if_declare" size="small">
                <el-option
                  v-for="item in if_declare_info"
                  :key="item.id"
                  :label="item.name_cn"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>是否现货</td>
            <td colspan="3">
              <el-select v-model="editForm.is_stock" size="small">
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
            <td>备注：</td>
            <td colspan="9">
              <el-input
                v-model="editForm.note"
                size="small"
              ></el-input>
            </td>
          </tr>
        </table>
      </el-form-item>
      <el-form-item style="text-align:right;">
        <el-button type="primary" @click="saveEdit()" size="mini">保存</el-button>
        <el-button class="sbaoClose" @click="editClose()" size="mini">关闭</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>
<script>
import axios from "axios";
import {
  lists,
  destroy,
  create,
  update,
  listTotal,
  list_Total,
  listTotalPost
} from "@/api/prod";

export default {
  props: ["editItem", "Notic_enum", "check", "id"],
  watch: {
    editItem(news, olds) {
      if (news.brand_id == 0) {
        news.brand_id = "";
      }

      listTotalPost("ProcurementContract/Notice/" + news.id + "/edit").then(
        res => {
          this.editForm = res.data;
          obj(this.brand_list, res.enum.brands);
        }
      );
      this.supply_name = news.supply_name;
      // var arr = [];
      // for (let i in news.checked_items) {
      //   arr.push(parseInt(news.checked_items[i]));
      // }
      // this.editForm.checked_items = arr;
      if (news.product_file instanceof Array == false) {
        var brr = [];
        for (let i in news.product_file) {
          brr.push(parseInt(i));
        }
        this.editForm.product_file = brr;
      }
      console.log(this.editForm);
    }
  },
  data() {
    return {
      queryList: {
        page: "1"
      },
      supply_name: "",
      datas: [],
      loading: false,
      loadCas: false,
      editForm: {},
      check_status: "",
      check_content: "",
      contractNumberPrefix: [],
      units: [],
      currency: [],
      InvoiceInfo: [],
      test_item: [],
      product_file_info: [],
      if_declare_info: [],
      is_stock_info: [],
      purchaseList: [],
      supply_list: [],
      cas_list: [],
      brand_list: []
    };
  },
  created() {
    this.fetchData_child();
  },
  methods: {
    fetchData_child() {
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
      lists(this.queryList, "ProcurementContract/Notice/generate").then(res => {
        this.test_item = JSON.parse(JSON.stringify(res.enum.test_item));
        // this.editForm.checked_items = res.enum.test_item;
      });
      // obj(this.brand_list, this.Notic_enum.brands);
      obj(this.contractNumberPrefix, this.Notic_enum.ContractNumberPrefix);
      obj(this.units, this.Notic_enum.units);
      // this.units.forEach(item => {
      //   item.id = item.id.toString();
      // });
      obj(this.currency, this.Notic_enum.Currency);
      // this.currency.forEach(item => {
      //   item.id = item.id.toString();
      // });
      obj(this.InvoiceInfo, this.Notic_enum.InvoiceInfo);
      obj(this.testitems, this.Notic_enum.testitems);
      obj(this.product_file_info, this.Notic_enum.product_file_info);
      obj(this.if_declare_info, this.Notic_enum.if_declare_info);
      obj(this.is_stock_info, this.Notic_enum.is_stock_info);
    },
    select(id,checked) {
      if(checked){
        this.editForm.checked_items.forEach((items, index) => {
          items.child.forEach((m, n) => {
            if (id == m.id) {
              this.$set(this.editForm.checked_items[index], "checked", true);
            }
          });
        });
      }else{
        this.editForm.checked_items.forEach((items, index) => {
          items.child.forEach((m, n) => {
            if (id == m.id) {
              this.$set(this.editForm.checked_items[index], "checked", false);
            }
          });
        });
      }
    },
    select_parent() {
      this.editForm.checked_items.forEach((items, index) => {
        if (!items.checked) {
          items.child.forEach((m, n) => {
            m.checked = false;
          });
        }
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.supply_list = res.data;
              this.loading = false;
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
          this.loadCas = false;
          listTotal("es/cas/" + query).then(res => {
            this.cas_list = res.data;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    casEven(a) {
      this.editForm.product_name_cn = this.cas_list.filter(item => {
        return item.cas == a;
      })[0].name_cn;
      this.editForm.product_name = this.cas_list.filter(item => {
        return item.cas == a;
      })[0].name;
      this.editForm.prod_id = this.cas_list.filter(item => {
        return item.cas == a;
      })[0].prod_id;
    },
    supplyChange() {
      this.editForm.supplier_id = parseInt(this.supply_name);
    },
    quantity_change() {
      if (!this.editForm.price) {
        this.editForm.price = 0;
      }
      this.editForm.total_price =
        parseFloat(this.editForm.price) * parseFloat(this.editForm.quantity);
    },
    price_change() {
      this.editForm.total_price =
        parseFloat(this.editForm.price) * parseFloat(this.editForm.quantity);
    },
    total_change() {
      this.editForm.price =
        parseFloat(this.editForm.total_price) /
        parseFloat(this.editForm.quantity);
    },
    saveEdit() {
      this.editForm.contract_number =
        this.editForm.prefix + this.editForm.postfix;
      if (this.check) {
        this.$emit("saveCheck", this.editForm);
      } else {
        this.$emit("saveEdit", this.editForm);
      }
      this.$emit("noticeClose", false);
    },
    editClose() {
      this.$emit("noticeClose", false);
    }
  }
};

function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
}
</script>