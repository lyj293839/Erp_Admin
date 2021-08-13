<style lang="scss" scoped type="text/scss">
.heard_top {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span {
    font-size: 11px;
  }
  .el-select {
    margin: 0px 10px;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  td {
    padding-left: 5px;
    font-size: 13px;
    word-break: break-all;
    line-height: 25px;
  }
}

.form_item {
  .el-form-item {
    margin-top: 10px;
  }
}

/deep/ .gutter {
  display: block !important;
}
.el-table {
  /deep/.cell {
    padding: 0px 5px;
  }
}
.danger{
        font-size: 12px;
    }
</style>
<style lang="scss" type="text/scss">
.data-thead{
    background: #dae0e5;
}
.data-td-supplier{
    color: #95c5ed;
}
.data-td-instore{
    color: red;
    font-weight: bold;
}
.data-testitem{
    color: red;
    font-weight: bold;
}

.data-testitem1{
    color: green;
    font-weight: bold;
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <div>
        <el-input
          v-model="queryList.cas"
          placeholder="cas"
          style="width: 100px;"
          size="mini"
          type="text"
          clearable
        ></el-input>
        <el-select size="mini" v-model="queryList.warehouse_id" clearable style="width: 150px;">
          <el-option v-for="item in warehouse" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input
          v-model="queryList.contract_number"
          :placeholder="$t('sale.add.sale198')"
          style="width: 120px;margin-left: 2px;"
          size="mini"
          type="text"
          clearable
        ></el-input>
        <!-- 销售合同号 -->
        <!-- 选择销售人员 -->
        <el-select
          size="mini"
          v-if="search_sale"
          v-model="queryList.sale_id"
          :placeholder="$t('sale.add.sale199')"
          clearable
          style="width: 120px;"
        >
          <el-option v-for="item in sales" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select size="mini" v-model="queryList.status" clearable style="width: 100px;">
          <el-option v-for="item in preout_status" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        
      </div>
      <el-select
        v-model="queryList.customer_id"
        filterable
        clearable
        remote
        size="mini"
        reserve-keyword
        :placeholder="$t('sale.add.sale178')"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 200px;"
      >
        <!-- 客户 -->
        <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>

      <el-button
        type="primary"
        size="mini"
        :loading="loading_search"
        @click="search()"
      >{{$t('search')}}</el-button>
      <!-- 搜索 -->
    </div>
    <!-- 页面 -->
    <div style="text-align:right;">
      <el-checkbox v-model="checked_all" @change="select_all()">全选</el-checkbox>
      <el-button type="primary" size="mini" style="margin:0px 10px;" @click="merge()">合并通知发货</el-button>
    </div>
    <el-card v-for="item in list.data" :key="item.id" style="margin:10px;">
      <table border="1" bordercolor="#E5E5E5">
        <tr style="background: #f2f2f2;font-weight:bold;line-height: 30px;">
          <td width='100'>合同号</td>
          <td width='100'>客户名称</td>
          <td width='100'>批次</td>
          <td width='100'>仓库</td>
          <td width='100'>
            CAS
            <span v-if="item.prod.is_danger==null" class="danger">(未知)</span>
            <span v-if="item.prod.is_danger==0" class="danger">(非危)</span>
            <el-tooltip placement="top"  v-if="item.prod.is_danger==1">
              <div slot="content">
                uncode:{{item.prod.property.uncode}},packinggroup:{{item.prod.property.packinggroup}},hazardclass:{{item.prod.property.hazardclass}}
              </div>
              <span style="color: red;" class="danger">(危险品)</span>
            </el-tooltip>
          </td>
          <td width='100'>PO</td>
          <td colspan="3">名称</td>
          <td width='100'>销售人员</td>
          <td align='center' width='100'>
            <el-checkbox
              v-model="item.checked"
              @change="select_one(item.checked,item.id)"
            ></el-checkbox>
            合并
          </td>
        </tr>
        <tr>
          <td ><span style="color:#409EFF;">{{item.contract_detail.contract_number}}</span></td>
          <td>
            <span v-if="showCustomer_sale(department_id,attr(item.saler_contract,'sale.department_id'),attr(item.saler_contract,'sale.id'))">{{item.saler_contract.customer_name}}</span>
            <span v-else>********</span>
          </td>
          <td><span style="color:#409EFF;">{{item.inventory?item.inventory.batchno:''}}</span></td>
          <td>{{item.inventory.warehouse?item.inventory.warehouse.name:''}}</td>
          <td>
            <span style="color:#409EFF;">{{item.cas}}</span>
          </td>
          <td>{{item.saler_contract.customer_po}}</td>
          <td colspan="3">{{item.prod.name}}</td>
          <td>{{item.saler_contract.sale?item.saler_contract.sale.name:''}}</td>
          <td rowspan="3">
            <div style="text-align:center;">
              <el-button
                type="primary"
                size="mini"
                v-if="item.status==0&&permissions.indexOf(471)>-1"
                @click="ship(item.id,'2')"
              >{{$t('sale.add.sale202')}}</el-button>
              <!-- 通知发货 -->
            </div>
            <div style="margin-top:5px;text-align:center;">
              <el-button
                type="primary"
                size="mini"
                v-if="item.status==0"
                @click="cancel(item.id,item.prod_id)"
              >{{$t('sale.add.sale203')}}</el-button>
              <!-- 取消预占 -->
              <el-button
                type="primary"
                size="mini"
                v-if="item.status==1"
                @click="cancle_notice(item.id,item.prod_id)"
              >{{$t('sale.add.sale204')}}</el-button>
              <!-- 取消通知 -->
            </div>
          </td>
        </tr>
        <tr style="font-weight:bold;line-height: 30px;">
          <td>类型</td>
          <td>金额</td>
          <td>需求</td>
          <td>规格</td>
          <td>库存</td>
          <td width='100'>预占数量
            <el-tooltip placement="top" v-if="item.split_package_log_id>0">
              <div slot="content">从{{item.split_package_log.out_shelf}}货架中规格为{{item.split_package_log.packsize}}
                {{getEnumValue(units,item.split_package_log.unit_id)}}的拆出
              </div>
              <span style="color:red;cursor: pointer;">(拆)</span>
            </el-tooltip>
          </td>
          <td width='100'>仓库</td>
          <td>外观性状</td>
          <td>来货包装</td>
          <td>检测状态</td>
        </tr>
        <tr>
          <td>{{getEnumValue(preout_type_info,item.type)}}</td>
          <td>{{item.preout_money}}</td>
          <td>{{item.contract_detail.base_quantity}}{{getEnumValue(units,item.contract_detail.base_quantity_unit)}}</td>
          <td>
            {{item.packs?item.packs.packsize:'/'}}
            <span v-if="item.packs">{{getEnumValue(units,item.packs.unit_id)}}</span>
          </td>
          <td>
            {{item.inventory?item.inventory.remained_stock:''}}
            <span v-if="item.inventory">{{getEnumValue(units,item.inventory.base_unit_id)}}</span>
          </td>
          <td >
            <span :style="item.base_quantity!=item.contract_detail.base_quantity?'color:red;':''">
            <!-- <span style="color:red;"> -->
              <span v-if="item.type==2">{{item.base_quantity}}{{getEnumValue(units,item.base_quantity_unit)}}</span>
              <span v-else>
                {{item.package_nums}}
                <span v-if="item.packs">({{Number(item.package_nums)*Number(item.packs.packsize)}}{{getEnumValue(units,item.packs.unit_id)}})</span>
              </span>
            </span>
          </td>
          <td>{{getEnumValue(warehouse,item.inventory.warehouse_id)}}</td>
          <td>{{getEnumValue(ChemicalAppearance,item.inventory.chemprodappearance_id)?getEnumValue(ChemicalAppearance,item.inventory.chemprodappearance_id):item.inventory.characterinfo}}</td>
          <td>{{item.inventory.packinginfo}}</td>
          <td>
            <div v-html="item.checkresult_info"></div>
            <!-- <div v-if="item.inventory&&item.inventory.if_need_check==2" style="color:#67C23A;">免检</div>
            <div
              v-if="item.inventory.checked_result==1"
              style="color:#67C23A;margin-right:5px;"
            >{{getEnumValue(enums.order_result,item.inventory.checked_result)}}</div>
            <div
              v-else-if="item.inventory.checked_result==3"
              style="color:#F56C6C;margin-right:5px;"
            >{{getEnumValue(enums.order_result,item.inventory.checked_result)}}</div>
            <div
              v-else
              style="color:#E6A23C;margin-right:5px;"
            >{{getEnumValue(enums.order_result,item.inventory.checked_result)}}</div>
            <div
              v-if="item.inventory.if_need_check!=2&&item.inventory.quality_orders&&item.inventory.quality_orders.length>0"
            >
              <span
                v-if="item.inventory.flow_status==1300"
                style="color:#67C23A;"
              >{{getEnumValue(enums.flow_statuses,item.inventory.flow_status)}}</span>
              <span
                v-else-if="item.inventory.flow_status==1001||item.inventory.flow_status==1000"
                style="color:#F56C6C;"
              >{{getEnumValue(enums.flow_statuses,item.inventory.flow_status)}}</span>
              <span
                v-else
                style="color:#E6A23C;"
              >{{getEnumValue(enums.flow_statuses,item.inventory.flow_status)}}</span>
            </div> -->
          </td>
        </tr>
      </table>
    </el-card>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="sizes,prev,pager,next"
      :page-sizes="[10, 20,50, 100,150]"
      :page-size="queryList.per_page"
      @size-change="handleSizeChange"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import {
  pending_contract_list,
  sale_list,
  customer_company,
  shipping_notice_view,
  cancle_preout,
  cancle_notice
} from "@/api/sale";
import { parseTime } from "@/utils";
import util from "@/libs/util";
export default {
  name: "sales-notice",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      list: {},
      loading: false,
      search_sale:false,
      currentPage: 1,
      department_id:'',
      queryList: {
        page: "1",
        per_page: 10,
        cas: "",
        contract_detail_id: "",
        status: 0,
        contract_number: "",
        customer_id: "",
        warehouse_id:''
        // sale_id: ""
      },
      sales: [],
      customer: [],
      preout_status: [],
      preout_type_info: [],
      units: [],
      delivery_type: [],
      ids: [],
      ChemicalAppearance: [],
      warehouse:{},
      enums: {},
      checked_all: false,
      loading_search: false
    };
  },
  created() {
    this.queryList.contract_number = "";
    this.queryList.cas = "";
    this.queryList.status = 0;
    if (this.$route.query.contract_number) {
      this.queryList.contract_number = this.$route.query.contract_number;
    }
    if (this.$route.query.cas) {
      this.queryList.cas = this.$route.query.cas;
    }
    if (this.$route.query.preout_status != null) {
      this.queryList.status = Number(this.$route.query.preout_status);
    }
    this.department_id=util.cookies.get('department_id')
    // this.queryList.sale_id = Number(util.cookies.get('user_id'))
    this.fetchData();
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-notice") {
        if (this.$route.query.notice_detail) {
          this.fetchData();
          this.$route.query.contract_number = this.$route.query.cas = this.$route.query.preout_status = null;
        }
        if (
          this.$route.query.contract_number ||
          this.$route.query.cas ||
          this.$route.query.preout_status != null
        ) {
          this.queryList.contract_number = this.$route.query.contract_number;
          this.queryList.cas = this.$route.query.cas;
          this.queryList.status = this.$route.query.preout_status;
          this.fetchData();
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.queryList.per_page = val;
      this.fetchData();
    },
    select_all() {
      this.ids = [];
      this.list.data.forEach((items, index) => {
        if (this.checked_all) {
          items.checked = true;
          this.ids.push(items.id);
        } else {
          this.ids = [];
          items.checked = false;
        }
      });
    },
    select_one(checked, id) {
      this.ids = [];
      let num = 0;
      this.list.data.forEach((items, index) => {
        if (items.checked) {
          this.ids.push(items.id);
          num++;
        }
      });
      if (num == this.list.data.length) {
        this.checked_all = true;
      } else {
        this.checked_all = false;
      }
    },
    merge() {
      let obj = {
        ids: this.ids
      };
      shipping_notice_view(obj).then(res => {
        if (res.code == 0) {
          this.$router.push({
            path: "/sales/notice_detail",
            name: "sales-notice_detail",
            query: {
              ids: this.ids,
              res:JSON.stringify(res)
            }
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    ship(id) {
      let obj = {
        ids: [id]
      };
      shipping_notice_view(obj).then(res => {
        if (res.code == 0) {
          this.$router.push({
            path: "/sales/notice_detail",
            name: "sales-notice_detail",
            query: {
              ids: [id],
              res:JSON.stringify(res)
            }
          });
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    cancel(id,prod_id) {
      cancle_preout(id,prod_id ,this, "", "", 0);
    },
    cancle_notice(id,prod_id) {
      cancle_notice(id,prod_id, this);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          customer_company(query).then(res => {
            this.customer = res.data;
            this.loading = false;
          });
        }, 200);
      } else {
        this.customer = [];
      }
    },
    fetchData() {
      pending_contract_list(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.loading_search = false;
        }
        this.ids = [];
        this.checked_all = false;
        res.data.result.data.forEach((items, index) => {
          items.checked = false;
        });
        this.list = res.data.result;
        this.search_sale = res.data.search_sale
        this.units = res.enum.units;
        this.preout_status = res.enum.preout_status;
        this.preout_type_info = res.enum.preout_type_info;
        this.enums = res.enum;
        this.delivery_type = res.enum.delivery_type;
        this.ChemicalAppearance = res.enum.ChemicalAppearance;
        this.warehouse = res.enum.warehouse
        this.sales = this.GEnums.Sales
      }).catch(rr => {this.loading_search=false})
      // sale_list().then(res => {
      //   this.sales = res.data;
      // });
      this.$route.query.notice_detail = null;
      if (
        this.$route.query.contract_number ||
        this.$route.query.cas ||
        this.$route.query.preout_status != null
      ) {
        this.$route.query.contract_number = this.$route.query.cas = this.$route.query.preout_status = null;
      }
    },
    search() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.fetchData();
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          customer_company(query).then(res => {
            this.customer = res.data;
            this.loading = false;
          });
        }, 200);
      } else {
        this.customer = [];
      }
    },
    remoteMethod_supplier(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          customer_company().then(res => {
            this.supplier = res.data;
            this.loading = false;
          });
        }, 200);
      } else {
        this.supplier = [];
      }
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    saveCustomerForm() {
      currentaccount_create(this.addCustomerForm, this);
    },
    check(id, status) {
      currentaccount_review(id, status, this);
    }
  }
};
</script>
