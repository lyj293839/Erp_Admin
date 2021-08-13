<style lang="scss" scoped type="text/scss">
.top{
  .el-input,.el-select,.el-date-picker{
    margin-top: 5px;
  }
}
.el-table {
  margin-top: 10px;
}
.el-checkbox{
  margin-right:15px;
}
/deep/.el-checkbox__label{
  padding-left: 5px;
}
table{
  width: 100%;
  border-collapse: collapse;
  td{
    font-size: 13px;
    padding: 0px 5px;
    line-height: 30px;
    /deep/.el-input__inner{
      border: 0px;
      padding: 0px;
    }
  }
}
/deep/.el-dialog__body{
  padding-top: 0px;
}
/deep/.el-form-item__label {
  font-weight: bold;
  padding: 0px;
  font-size: 14px;
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="top">
      <el-row type="flex" justify="start">
        <el-col :span="24">
          <el-input
            size="mini"
            style="width: 120px;"
            class="d2-ml-5"
            v-model="queryList.contract_number"
            :placeholder="$t('sale.add.sale44')"
          ></el-input>
          <!-- 合同号 -->
          <el-input
            size="mini"
            style="width: 120px;"
            class="d2-ml-5"
            v-model="queryList.cas"
            placeholder="cas"
          ></el-input>
           <el-input
            size="mini"
            style="width: 120px;"
            class="d2-ml-5"
            v-model="queryList.waybill_number"
            placeholder="运单号"
          ></el-input>
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.start_time"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('sale.add.sale184')"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <!-- 开始日期 -->
          <el-date-picker
            class="date_picker d2-ml-5"
            v-model="queryList.end_time"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('sale.add.sale185')"
            size="mini"
            style="width: 125px;"
          ></el-date-picker>
          <!-- 合同结束日期 -->
          <el-select
            v-model="queryList.customer_id"
            filterable
            clearable
            remote
            size="mini"
            reserve-keyword
            :placeholder="$t('Inquery.index.customer')"
            :remote-method="remoteMethod"
            :loading="loading"
            class="d2-ml-5"
            style="width: 200px;"
          >
            <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-select
            v-model="queryList.receipt_status_ids"
            class="d2-ml-5"
            size="mini"
            multiple
            clearable
            placeholder="收款状态"
            style="width: 110px;"
          >
            <el-option
              v-for="item in enums.receipt_status_info"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.delivery_status_ids"
            class="d2-ml-5"
            size="mini"
            multiple
            clearable
            placeholder="发货状态"
            style="width: 110px;"
          >
            <el-option
              v-for="item in enums.delivery_status_info"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.invoice_status_ids"
            class="d2-ml-5"
            size="mini"
            multiple
            clearable
            placeholder="开票状态"
            style="width: 110px;"
          >
            <el-option
              v-for="item in enums.invoice_status_info"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.sale_id"
            size="mini"
            class="d2-ml-5"
            clearable
            placeholder="销售人员"
            style="width: 100px;"
          >
            <el-option v-for="item in sales" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-button
            class="d2-ml-5"
            size="mini"
            type="primary"
            :loading="loading_search"
            @click="search"
          >{{$t('search')}}</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 页面 -->
    <el-table
      :data="list.data"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" :label="$t('sale.add.sale44')" width="125px;">
        <!-- 合同号 -->
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.contract_number')}}</template>
      </el-table-column>
      <el-table-column align="center" :label="$t('sale.add.sale44_')" width="125px;">
        <!-- 子合同号 -->
        <template slot-scope="scope">{{scope.row.contract_number}}</template>
      </el-table-column>
      <el-table-column align="center" label="cas" width="120px;">
        <!-- 子合同号 -->
        <template slot-scope="scope">{{scope.row.cas}}</template>
      </el-table-column>
      <el-table-column align="center" :label="$t('sale.add.sale178')" width="300">
        <!-- 客户名称 -->
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.customer_name')}}</template>
      </el-table-column>
      <el-table-column align="center" label="合同金额">
        <!-- 合同金额 -->
        <template slot-scope="scope">{{scope.row.total_money}}</template>
      </el-table-column>
      <el-table-column align="center" label="签约时间">
        <!-- 签约时间 -->
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.contract_date')}}</template>
      </el-table-column>
      <el-table-column align="center" label="销售人员">
        <!-- 销售人员 -->
        <template slot-scope="scope">{{attr(scope.row,'saler_contract.sale.name')}}</template>
      </el-table-column>
      <el-table-column align="center" label="收款状态">
        <!-- 收款状态 -->
        <template slot-scope="scope">
          <div
            v-if="scope.row.receipt_status==2"
            style="background:#E6A23C;"
          >{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
          <div
            v-else-if="scope.row.receipt_status==3"
            style="background:#FFBDC8;"
          >{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
          <div v-else>{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="发货状态">
        <!-- 发货状态 -->
        <template slot-scope="scope">
          <div
            v-if="scope.row.delivery_status==3"
            style="background:#F4939A;"
          >{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</div>
          <div v-else>{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="开票状态">
        <!-- 开票状态 -->
        <template slot-scope="scope">
          <div
            v-if="scope.row.invoice_status==1"
            style="background:#DF7201;"
          >{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
          <div
            v-else-if="scope.row.invoice_status==2"
            style="background:#FFBDC8;"
          >{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
          <div
            v-else-if="scope.row.invoice_status==4"
            style="background:#BFBFBF;"
          >{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
          <div v-else>{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作管理" fixed="right" width="100px;">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="freightClick(scope.row.id)"
          >运费登记</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title='运费登记' :visible.sync="dialogFreight" width="70%">
      <el-form label-width="100px" label-position="top">
        <el-form-item label="需求信息:">
          <table border="1" bordercolor="#E5E5E5">
            <tr style="font-weight: bold;">
              <td>#询单号</td>
              <td>Cas</td>
              <td width='250'>产品名称</td>
              <td>规格</td>
              <td width='100'>纯度</td>
              <td>数量</td>
              <td>单价</td>
              <td>金额</td>
              <td width='60'>货币符号</td>
            </tr>
            <tr>
              <td>{{freight_list.inquiry_id}}</td>
              <td>{{freight_list.cas}}</td>
              <td>{{freight_list.product_name}}</td>
              <td>{{freight_list.package}}</td>
              <td>{{freight_list.purity}}</td>
              <td>
                {{freight_list.quantity}}
                {{getEnumValue(units,freight_list.quantity_unit)}}
              </td>
              <td>{{freight_list.price}}</td>
              <td>{{freight_list.total_money}}</td>
              <td>{{getEnumValue(currencys,freight_list.currency_id)}}</td>
            </tr>
            <tr>
              <td><b>发票情况</b></td>
              <td colspan="8">{{getEnumValue(enums.invoice_type,freight_list.invoice_type_id)}}</td>
            </tr>
            <tr>
              <td><b>分析要求</b></td>
              <td colspan="8">
                <!-- <el-checkbox-group v-model="freight_list.checked_items">
                  <el-checkbox v-for="i in test_item" :label="i.id" name="type">{{i.name}}</el-checkbox>
                </el-checkbox-group> -->
                <div v-if="freight_list.test_item">
                  <span
                    v-for="i in freight_list.test_item"
                    :key="i.id"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="i in freight_list.test_item" :key="i.id" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:45%;">
                      <span class="checked_items" style="font-weight: bold;">{{i.name}}</span>:
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
                </div>
              </td>
            </tr>
            <tr>
              <td><b>分析备注</b></td>
              <td colspan="3">{{freight_list.checked_requirement}}</td>
              <td><b>附加费用</b></td>
              <td colspan="4">{{freight_list.additional_cost}}</td>
            </tr>
            <tr>
              <td><b>包装要求</b></td>
              <td colspan="3">{{freight_list.package_requirement}}</td>
              <td><b>要求发货时间</b></td>
              <td colspan="4">{{freight_list.required_delivery_date}}</td>
            </tr>
            <tr>
              <td><b>标签要求</b></td>
              <td colspan="3">{{freight_list.label_requirement}}</td>
              <td><b>发货备注</b></td>
              <td colspan="4">{{freight_list.deliver_note}}</td>
            </tr>
            <tr>
              <td><b>随货文件</b></td>
              <td colspan="3">
                <el-checkbox-group v-model="freight_list.product_file">
                  <el-checkbox v-for="i in enums.product_file_info" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                </el-checkbox-group>
              </td>
              <td><b>是否报关</b></td>
              <td colspan="4">{{getEnumValue(enums.if_declare_info,freight_list.if_declare)}}</td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item label="物流信息:">
          <table border="1" bordercolor="#E5E5E5">
            <tr style="font-weight: bold;">
              <td>物流公司</td>
              <td>运单号</td>
              <td>运费</td>
              <td>备注</td>
              <td width='100px'><el-button @click="add()" type="primary" size="mini">+</el-button></td>
            </tr>
            <tr v-for="(items,index) in freight_list.saler_contract_freight">
              <td>
                <el-select
                  size="mini"
                  v-model="items.express_company_id"
                  clearable
                  style="width: 100%;"
                >
                  <el-option v-for="i in express_company" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
              </td>
              <td>
                <el-input v-model="items.waybill_number" size="mini"></el-input>
              </td>
              <td>
                <el-input v-model="items.total_money" size="mini"></el-input>
              </td>
              <td>
                <el-input v-model="items.remark" size="mini"></el-input>
              </td>
              <td>
                <el-button type="primary" @click="save_item(items)" size="mini" >保存</el-button><!-- 保存 -->
                <el-button @click="del(items,index)" type="primary" size="mini">-</el-button>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button @click="cancel()" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import { freight_manage,freight_registration_view,freight_registration,ship_logistic_del, } from "@/api/warehouse";
import {customer_lists} from '@/api/sale'
export default {
  name: "Warehouse-freight",
  data() {
    return {
      list: {},
      freight_list:{
        saler_contract_freight:[],
        product_file:[]
      },
      currentPage: 1,
      queryList: {
        page: "1",
        contract_number: "",
        cas: "",
        start_time: "",
        end_time: "",
        customer_id: "",
        sale_id: "",
        waybill_number:'',
        receipt_status_ids: [],
        invoice_status_ids: [],
        delivery_status_ids: []
      },
      loading_search: false,
      loading: false,
      dialogFreight:false,
      enums: {},
      customer: [],
      sales: [],
      currencys:[],
      express_account_type:[],
      express_company:[],
      units:[]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-freight") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      freight_manage(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.loading_search = false;
        }
        this.list = res.data;
        this.enums = res.enum;
        this.sales = this.GEnums.Sales
      });
    },
    handleCurrentChange(pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent;
      this.fetchData();
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.customer = res.data;
            this.loading = false;
          });
        }, 200);
      } else {
        this.customer = [];
      }
    },
    search() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.fetchData();
    },
    freightClick(id){
      freight_registration_view(id).then(res=>{
        this.freight_list = res.data
        if(this.freight_list.saler_contract_freight.length==0){
          this.freight_list.saler_contract_freight.push({
            contract_detail_id:this.freight_list.id,
            saler_contract_id:this.freight_list.saler_contract_id,
            express_company_id: '',
            waybill_number: '',
            total_money: '',
            currency_id: 2,
            remark: ''
          })
        }
        this.currencys = res.enum.currencys
        this.express_account_type = res.enum.express_account_type
        this.express_company = res.enum.express_company
        this.units = res.enum.units
        this.dialogFreight = true
      })
    },
    add () {
      this.freight_list.saler_contract_freight.push({
        contract_detail_id:this.freight_list.id,
        saler_contract_id:this.freight_list.saler_contract_id,
        express_company_id: '',
        waybill_number: '',
        total_money: '',
        currency_id: 2,
        remark: ''
      })
    },
    del(items, index) {
      if (items.id) {
        // ship_logistic_del(items.id, this)
      } else {
        this.freight_list.saler_contract_freight.splice(index, 1)
      }
    },
    save_item (item) {
      freight_registration(item, this)
    },
    cancel(){
      this.dialogFreight = false
      this.freight_list = {
        saler_contract_freight:[],
        product_file:[]
      }
    }
  }
};
</script>
