<style lang="scss" scoped type="text/scss">
.heard_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 5px;
  .el-autocomplete {
    width: 20%;
  }
  .el-input {
    width: 15%;
  }
  .el-select {
    width: 15%;
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
}
.dialog {
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
}
/deep/.plTableBox .el-table{
  font-size: 13px!important;
}
/deep/.d2-container-full__body::-webkit-scrollbar {
  overflow-y:hidden;
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <el-input placeholder="合同编号"  size="mini" type="textarea" autosize  v-model="queryList.contract_number" style="margin:0px 3px 0px 0px;width:200px;position: absolute;left:10px;top:10px;z-index: 99999;" clearable></el-input>
      <div style="margin-left: 203px;">
        <el-input placeholder="CAS" size="mini" style="margin:0px 3px 0px 0px;" v-model="queryList.cas" clearable></el-input>
        <el-date-picker
                type="date"
                placeholder="合同开始日期"
                clearable
                v-model="queryList.date_start"
                value-format="yyyy-MM-dd"
                style="width:200px;"
                class="d2-mr-5"
                size="mini"
        ></el-date-picker>
        <el-date-picker
                size="mini"
                type="date"
                clearable
                placeholder="合同结束日期"
                v-model="queryList.date_end"
                class="d2-mr-5"
                style="width:200px;"
                value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select placeholder="采购员" size="mini" clearable v-model="queryList.purchase_user_id" style="margin:0px 3px 0px 0px;width: 130px;">
          <el-option
                  v-for="item in purchaseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-autocomplete
          size="mini"
          style="margin:0px 3px 0px 0px;"
          v-model="supplier"
          :fetch-suggestions="querySearch"
          placeholder="供应商"
          :trigger-on-focus="false"
          @select="handleSelect"
          clearable
        ></el-autocomplete>
        <!-- <el-select placeholder="是否付款" size="mini" clearable v-model="queryList.pay_status" style="margin:0px 10px 0px 0px;">
          <el-option
                  v-for="item in enums.pay_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select> -->
         <el-select
          placeholder="入库状态"
          style="margin:0px 3px 0px 0px;"
          size="mini"
          clearable
          v-model="queryList.storage_status">
          <el-option
            v-for="item in storage_status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
          placeholder="扫票状态"
          style="margin:0px 3px 0px 0px;"
          size="mini"
          clearable
          v-model="queryList.saopiao_status">
          <el-option
            v-for="item in saopiao_status"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-select
                placeholder="收票情况"
                style="margin:0px 3px 0px 0px;"
                size="mini"
                clearable
                v-model="queryList.status">
          <el-option
                  v-for="item in invoice_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-select
                placeholder="付款状态"
                style="margin:0px 3px 0px 0px;"
                size="mini"
                clearable
                v-model="queryList.pay_status">
          <el-option
                  v-for="item in enums.pay_status"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-button type="primary" style="margin-left:3px;" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
        <el-button v-if="permissions.indexOf(600)>-1" type="primary" style="margin-left:3px;" size="mini" :loading="loading_down" @click="Down()">下载Excel</el-button>
        <a hidden :href="file_url" ref="file_url">下载Excel</a>
        <el-button type="primary" style="margin-left:3px;" size="mini"  @click="package()">打包</el-button>
      </div>
    </div>

    <!-- 页面 -->
    <u-table
            ref="plTable"
            :height="height"
            row-key="id"
            use-virtual
            :row-height="rowHeight"
            border>
      <!-- <u-table-column label="#ID" width="80p">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </u-table-column> -->
      <u-table-column label="合同编号" width="130">
        <template slot-scope="scope">
          <div class="d2-text-center" v-if="scope.row.invoice_status==2" style="background-color:#67C23A;">{{scope.row.procurement_contract_number}}</div>
          <div class="d2-text-center" v-else-if="scope.row.saopiao_status==1&&scope.row.invoice_status!=2" style="background-color:#FFC0CB;">{{scope.row.procurement_contract_number}}</div>
          <div class="d2-text-center" v-else>{{scope.row.procurement_contract_number}}</div>
        </template>
      </u-table-column>
      <u-table-column label="合同时间" width="90">
        <template slot-scope="scope">{{scope.row.contract_contract_date}}</template>
      </u-table-column>
      <u-table-column label="供应商" width="200">
        <template slot-scope="scope">{{scope.row.supplier_name}}</template>
      </u-table-column>
      <u-table-column label="CAS"  width="110">
        <template slot-scope="scope">{{scope.row.cas}}</template>
      </u-table-column>
      <u-table-column label="产品中文名称" width="200">
        <template slot-scope="scope">
          <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.name_cn"
                  placement="top-start"
          >
            <span>{{scope.row.name_cn}}</span>
          </el-tooltip>
        </template>
      </u-table-column>
      <u-table-column label="产品英文名称" width="200">
        <template slot-scope="scope">
          <el-tooltip
                  class="item"
                  effect="dark"
                  :content="scope.row.name"
                  placement="top-start"
          >
            <span>{{scope.row.name}}</span>
          </el-tooltip>
        </template>
      </u-table-column>
      <u-table-column label="合同金额" width="100">
        <template slot-scope="scope">
          {{getEnumValue(Currency,scope.row.currency_id,'icon')}}
          {{scope.row.total_price}}
        </template>
      </u-table-column>
      <u-table-column label="发票类型">
        <template slot-scope="scope">
          {{getEnumValue(InvoiceInfo,scope.row.invoice_type_id)}}
        </template>
      </u-table-column>
      <!-- <u-table-column label="发票税率">
        <template slot-scope="scope">
          {{getEnumValue(enums.InvoiceInfo,scope.row.invoice_type_id,'rate')}}
        </template>
      </u-table-column> -->
      <u-table-column label="采购人员" width='80'>
        <template slot-scope="scope">
          {{scope.row?scope.row.purchase_name:''}}
        </template>
      </u-table-column>
      <u-table-column label="扫票状态" width="80">
        <template slot-scope="scope">
          <div class="d2-text-center" v-if="scope.row.saopiao_status=='0'">未扫票</div>
          <div class="d2-text-center" style="background-color:#FFC0CB;" v-if="scope.row.saopiao_status==1">已扫票</div>
        </template>
      </u-table-column>
      <u-table-column label="收票情况" width="80">
        <template slot-scope="scope">
          <div  class="d2-text-center" v-if="getEnumValue(enums.invoice_status,scope.row.invoice_status)" :style="{background:(scope.row.invoice_status==0?'':(scope.row.invoice_status==1?'#FFF0DD':(scope.row.invoice_status==2?'#FFC0CB':(scope.row.invoice_status==3?'#F5DEB3':''))))}">{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
          <div class="d2-text-center" style="background-color:#F5DEB3;" v-if="scope.row.pending_flag==1">收票待审核</div>
          <div class="d2-text-center" style="background-color:#F5DEB3;" v-if="scope.row.failure_flag==1">收票审核驳回</div>
        </template>
      </u-table-column>
      <u-table-column label="收票金额">
        <template slot-scope="scope">
          {{scope.row.total_price-scope.row.invoice_yue}}
        </template>
      </u-table-column>
      <u-table-column label="收票余额">
        <template slot-scope="scope">
          {{scope.row.invoice_yue}}
        </template>
      </u-table-column>
      <u-table-column label="收票公司" width="200">
        <template slot-scope="scope" >
          {{scope.row.corp_name}}
        </template>
      </u-table-column>
      <u-table-column label="合同状态" width="80">
        <template slot-scope="scope">
          <div v-if="scope.row.check_status==1" style="background:#67C23A;">{{getEnumValue(enums.check_status,scope.row.check_status)}}</div>
          <div v-else>{{getEnumValue(enums.check_status,scope.row.check_status)}}</div>
        </template>
      </u-table-column>
      <u-table-column label="付款状态" width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.pay_result==5" style="background-color: rgb(255, 193, 7);">{{getEnumValue(enums.pay_status,scope.row.pay_result)}}</div>
          <div v-if="scope.row.pay_result==1" style="background-color: #FFF0DD;">{{getEnumValue(enums.pay_status,scope.row.pay_result)}}</div>
          <div v-if="scope.row.pay_result==2" style="background-color: #FFC0CB;">{{getEnumValue(enums.pay_status,scope.row.pay_result)}}</div>
          <div v-if="scope.row.pay_result==3" style="background-color: #F5DEB3;">{{getEnumValue(enums.pay_status,scope.row.pay_result)}}</div>
          <div v-if="scope.row.pay_result==0||scope.row.pay_result==6">{{getEnumValue(enums.pay_status,scope.row.pay_result)}}</div>
          <div v-if="scope.row.pay_result==9" style="background-color: lightgrey;">{{getEnumValue(enums.pay_status,scope.row.pay_result)}}</div>
        </template>
      </u-table-column>
      <u-table-column label="操作" width="180px" fixed="right">
        <!--<template slot="header" slot-scope="scope">-->
          <!--<el-checkbox v-model="checked_all" @change="select_all"></el-checkbox>-->
          <!--<span @click="AllCheck()" v-if="permissions.indexOf(491)>-1" style="color:#409EFF;cursor: pointer;padding-left: 10px;">批量收票</span>-->
        <!--</template>-->
        <template slot-scope="scope">
          <!--<el-checkbox-->
                  <!--v-model="check[list.data.indexOf(scope.row)].checkStyle"-->
                  <!--@change="checkChange()"-->
                  <!--style="margin-right:10px;"-->
          <!--&gt;</el-checkbox>-->
          <!--<el-button type="primary" size="mini" @click="handle_invoice(scope.row)" class="d2-mr-5" v-if="permissions.indexOf(81)>-1&&scope.row.package_status!=1">收票</el-button>-->
          <!--<el-button type="danger" size="mini" @click="handle_invoice(scope.row)" class="d2-mr-5" v-if="permissions.indexOf(81)>-1&&scope.row.package_status==1">收票</el-button>-->
          <el-button type="primary" size="mini" @click="handle_detail(scope.row.id)" v-if="permissions.indexOf(80)>-1">详情</el-button>
        </template>
      </u-table-column>
    </u-table>
    <!-- 批量开票 -->
    <el-dialog :visible.sync="dialogAdd" @close="close()" width="50%" class="dialog">
      <el-form label-width="100px" label-position="right">
        <el-row>
          <el-col :span="10">
            <el-form-item label="发票编号：" :required="true">
              <el-input size="small" v-model="Add_invoice.invoice_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="收票公司：">
              <el-select size="small" v-model="Add_invoice.corp_name_new">
                <el-option
                        v-for="(item,index) in enums.company"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                ></el-option>
              </el-select>
              <div style="color: red;margin-left: 5px">请核对收票公司是否一致！</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="开票日期：">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                size="small"
                v-model="Add_invoice.invoice_date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="到票日期：">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                size="small"
                v-model="Add_invoice.invoice_receiver_date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
        <el-form-item label="发票类型：">
          <el-select size="small" v-model="Add_invoice.invoice_type">
            <el-option
              v-for="item in Invoicetype"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
          </el-col>
          <el-col :span="10">
        <el-form-item label="税率：">
          <!--<el-input size="small" v-model="Add_invoice.tax"></el-input>-->
          <el-select size="mini" v-model="Add_invoice.tax">
            <el-option
                    v-for="(item,index) in taxs"
                    :key="index"
                    :label="item"
                    :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        </el-row>
        <el-form-item label="总金额：">
          <el-input size="small" v-model="Add_invoice.total_money"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            style="width:100%;"
            :rows="3"
            type="textarea"
            size="small"
            v-model="Add_invoice.note"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="keep_all()">保存</el-button>
          <el-button size="mini" @click="close()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 开票 -->
    <el-dialog :visible.sync="dialog_Add" @close="close_()" width="70%" class="dialog">
      <el-form :model="detailList" label-width="100px" label-position="right">
        <el-row>
            <el-col :span="8">
              <el-form-item label="发票编号：" :required="true">
                <el-input size="small" v-model="Add_invoice.invoice_number"></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="12">
            <el-form-item label="收票公司：" :required="true">
              <el-select size="small" v-model="Add_invoice.corp_name_new">
                <el-option
                        v-for="(item,index) in enums.company"
                        :key="index"
                        :label="item.name"
                        :value="item.name"
                ></el-option>
              </el-select>
              <span style="color: red;margin-left: 5px">请核对收票公司是否一致！</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开票日期：">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                size="small"
                v-model="Add_invoice.invoice_date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="到票日期：">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                size="small"
                v-model="Add_invoice.invoice_receiver_date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票类型：">
              <el-select size="small" v-model="Add_invoice.invoice_type">
                <el-option
                  v-for="item in Invoicetype"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="CAS：">
              <el-input size="small" v-model="detailList.cas"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="产品名称：">
              <el-input size="small" v-model="detailList.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中文名：">
              <el-input size="small" v-model="detailList.name_cn"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量：">
              <el-input size="small" v-model="detailList.quantity" @change="changeMoney()"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单位：">
              <el-select size="small" v-model="detailList.quantity_unit">
                <el-option
                  v-for="item in units"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价：">
              <el-input size="small" v-model="detailList.price" @change="changeMoney()"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="不含税金额：">
          <el-input size="small" v-model="detailList.amount" disabled></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="税率：">
              <!--<el-input size="small" v-model="detailList.tax" @input="tax"></el-input>-->
              <el-select size="mini" v-model="detailList.tax" @input="tax">
                <el-option
                        v-for="(item,index) in taxs"
                        :key="index"
                        :label="item"
                        :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="税额：">
              <el-input size="small" v-model="detailList.tax_amount" @input="tax_amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="合计：">
          <el-input size="small" v-model="detailList.total" @change="changeTotal()"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            style="width:100%;"
            :rows="3"
            type="textarea"
            size="small"
            v-model="Add_invoice.note"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="keep_()">保存</el-button>
          <el-button size="mini" @click="close_()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 提示 -->
    <el-dialog :visible.sync="dialogTip" title="提示" width="30%">
      <span>请先选择需要开票的订单</span>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="dialogTip = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogTip2" title="提示" width="30%">
      <div>必须选择相同的供应商,以下合同编号不一致:</div>
      <div v-for="item in different_contract">{{item}}</div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="dialogTip2 = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
      background
      :page-sizes="[10, 50, 100, 300,500,1000,1500]"
      :page-size="50"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="sizes, prev, pager, next"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import request from "@/plugin/axios";
import Big from "@/big/a/big.mjs";
import { lists, listTotal } from "@/api/prod";
import { invoice_lists } from "@/api/procure";
export default {
    name:"procure-invoice",
  data() {
    return {
      permissions :JSON.parse(localStorage.getItem('permissions')),
      list: {},
      check: [],
      checked_all:false,
      dialogAdd: false,
      dialog_Add: false,
      dialogTip: false,
      dialogTip2: false,
      results: [],
      supplier: "",
      currentPage: 1,
      queryList: {
        page: "1",
        per_page:'50',
        supplier_id: "",
        supplier_name: "",
        contract_number: "",
        cas: "",
        purchase_user_id: "",
        status: "",
        storage_status:'',
        pay_status:'',
      },
      Add_invoice: {
        invoice_date: "",
        corp_name:'',
        corp_name_new:'',
        invoice_receiver_date: "",
        invoice_number: "",
        note: "",
        tax:'',
        total_money: "",
        invoice_type: "",
        detail: []
      },
      detailList: {
        cas: "",
        procurement_contract_detail_id: "",
        procurement_contract_id: "",
        supplier_name: "",
        name: "",
        name_cn: "",
        quantity: "",
        quantity_unit: "",
        price: 0,
        amount: "",
        tax: 0,
        tax_amount: 0,
        total: ""
      },
      Currency: [],
      units:[],
      storage_status:[],
      Invoicetype: [],
      InvoiceInfo: [],
      invoice_status: [],
      saopiao_status: [],
      purchaseList: [],
      loading_search:false,
      loading_down:false,
      enums:{},
      file_url:'',
      taxs:['0','0.01','0.03','0.06','0.13'],
      different_contract:[],
      height: 0,
      rowHeight: 0,
    };
  },
  watch: {
    supplier($new, $old) {
      if ($new == "") {
        this.queryList.supplier_id = "";
        this.queryList.supplier_name = "";
      }
    },
      $route(to,from) {
          if(to.name=='procure-collection'){
              this.fetchData();
          }
      }
  },
  created() {
    this.fetchData();
  },
  mounted () {
      this.height = window.innerHeight-180
      this.rowHeight=this.height/10
  },
  methods: {
    fetchData() {
        invoice_lists(this.queryList, "ProcurementContract/Invoice/index").then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
          res.data.data.forEach((items,index)=>{
              // if(items.invoice.length==0){
              //     items.status_name="未收票"
              // }else{
              //     let num=0;
              //     items.invoice.forEach((m,n)=>{
              //         if(m.status==1){
              //             num+=Number(m.total)
              //         }
              //         if(m.status==0){
              //             items.pending_flag = 1;
              //         }
              //         if(m.status==-1){
              //             items.failure_flag = 1;
              //         }
              //     })
              //     if(num==items.total_price){
              //         items.status_name="全额收票"
              //     }else if(num>items.total_price){
              //         items.status_name="超额收票"
              //     }else if(num==0){
              //         items.status_name="未收票"
              //     }else{
              //         items.status_name="部分收票"
              //     }
              // }
          })
        this.list = res.data;
        this.$refs.plTable.reloadData(res.data.data)
        this.check = [];
        this.checked_all = false
        for (var i = 0; i < this.list.data.length; i++) {
          var item = { checkStyle: false };
          this.check.push(item);
        }
        obj(this.Currency, res.enum.Currency);
        obj(this.Invoicetype, res.enum.Invoicetype);
        obj(this.InvoiceInfo, res.enum.InvoiceInfo);
        this.units=res.enum.units;
        this.storage_status=res.enum.storage_status;
        this.invoice_status = res.enum.invoice_status;
        this.saopiao_status = res.enum.saopiao_status;
        this.enums=res.enum
        this.Add_invoice.invoice_receiver_date=this.getDate()
      }).catch(rr => {this.loading_search=false})
      listTotal("data/user_list?user_type=101").then(res => {
        this.purchaseList = res.data;
      });
    },

      tax(){
          this.detailList.amount=(new Big(this.detailList.total).div(new Big(this.detailList.tax).plus(1))).toFixed(2)
          this.detailList.tax_amount=(new Big(this.detailList.amount).times(this.detailList.tax)).toFixed(2)
      },
      changeTotal(){
          this.tax();
      },
      tax_amount(){
          this.detailList.amount=(new Big(this.detailList.total).minus(this.detailList.tax_amount)).toFixed(2)
      },
      handleSizeChange(val) {
          this.queryList.per_page=val
          this.fetchData();
      },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    size_change(size) {
        invoice_lists(this.queryList, "ProcurementContract/Invoice/index").then(res => {
        this.list = res.data;
        this.queryList.per_page = size;
        for (var i = 0; i < this.list.data.length; i++) {
          var item = { checkStyle: false };
          this.check.push(item);
        }
        obj(this.Currency, res.enum.Currency);
        obj(this.Invoicetype, res.enum.Invoicetype);
        this.invoice_status = res.enum.invoice_status;
      });
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        listTotal("data/member_list?type=2&name=" + queryString).then(res => {
          this.results = res.data;
          this.results = JSON.parse(
            JSON.stringify(this.results).replace(/name/g, "value")
          );
          // 调用 callback 返回建议列表的数据
          cb(this.results);
        });
      }
    },
    package(){
        this.$router.push({
            path: "/invoice/package.vue",
            name: "procure-package",
            query: {
                queryList:JSON.stringify(this.queryList),
                supplier:this.supplier
        }
        });
    },
    handleSelect() {
      this.queryList.supplier_id = this.results.filter(item => {
        return item.value == this.supplier;
      })[0].id;
      this.queryList.supplier_name = this.results.filter(item => {
          return item.value == this.supplier;
      })[0].value;
    },
    Search() {
        this.loading_search=true
        this.queryList.page = 1;
        this.currentPage=1
        this.fetchData();
    },
    Down(){
        this.loading_down=true;
        this.queryList.page = 1;
        this.currentPage=1;
        invoice_lists(this.queryList, "ProcurementContract/Invoice/downExcel").then(res => {
            if (res && res.code == 0) {
                this.loading_down=false;
                this.file_url=res.data
                setTimeout(() => {
                    this.$refs.file_url.click()
                }, 500)
            }else{
                this.loading_down=false;
            }
        }).catch(rr => {
            this.loading_down=false;
        });
    },
    changeMoney() {
      this.detailList.amount =new Big(this.detailList.price).times(this.detailList.quantity);
      this.detailList.total = this.detailList.amount;
      this.tax();
    },
    select_all(){
        this.Add_invoice.detail=[]
        if(this.checked_all){
        for (var i = 0; i < this.list.data.length; i++) {
            this.check[i].checkStyle = true
            var as = {};
            as.procurement_contract_detail_id = this.list.data[i].id;
            as.procurement_contract_id = this.list.data[i].procurement_contract_id;
            as.supplier_name = this.list.data[i].supplier_name;
            as.procurement_contract_number = this.list.data[i].procurement_contract_number;
            as.cas = this.list.data[i].cas;
            as.name = this.list.data[i].name;
            as.name_cn = this.list.data[i].name_cn;
            as.quantity = this.list.data[i].quantity;
            as.quantity_unit = this.list.data[i].quantity_unit;
            as.price = this.list.data[i].price;
            as.amount = this.list.data[i].total_price;
            as.tax = 0;
            as.tax_amount = 0;
            as.total = this.list.data[i].total_price;
            this.Add_invoice.detail.push(as);
        }
        }else{
            for (var i = 0; i < this.list.data.length; i++) {
                this.check[i].checkStyle = false
            }
        }
    },
    checkChange() {
      this.Add_invoice.detail = [];
      var num = 0
      for (var i = 0; i < this.list.data.length; i++) {
        if (this.check[i].checkStyle == true) {
          var as = {};
          as.procurement_contract_detail_id = this.list.data[i].id;
          as.procurement_contract_id = this.list.data[
            i
          ].procurement_contract_id;
          as.supplier_name = this.list.data[i].supplier_name;
          as.procurement_contract_number = this.list.data[i].procurement_contract_number;
          as.cas = this.list.data[i].cas;
          as.name = this.list.data[i].name;
          as.name_cn = this.list.data[i].name_cn;
          as.quantity = this.list.data[i].quantity;
          as.quantity_unit = this.list.data[i].quantity_unit;
          as.price = this.list.data[i].price;
          as.amount = this.list.data[i].total_price;
          as.tax = this.getEnumValue(this.enums.InvoiceInfo,this.list.data[i].invoice_type_id,'rate');
          as.tax_amount = 0;
          as.total = this.list.data[i].total_price;
          this.Add_invoice.detail.push(as);
        }
        if(this.check[i].checkStyle==true){
          num++
        }
      }
      if(num==this.list.data.length){
        this.checked_all = true
      }else{
        this.checked_all = false
      }
    },

    AllCheck() {
        this.different_contract=[]
      this.Add_invoice.detail.length == 0
        ? (this.dialogTip = true)
        : (this.dialogTip = false);
      this.Add_invoice.detail.forEach(item => {
          if(item.supplier_name != this.Add_invoice.detail[0].supplier_name){
              this.dialogTip2 = true,
              this.dialogAdd = false,
              this.different_contract.push(item.procurement_contract_number)
          }else{
              this.dialogTip2 = false,
              this.dialogAdd = true
          }
          // if(this.dialogTip2){
          //     foreach.break=new Error("StopIteration");
          // }
      });
      if (this.dialogAdd == true) {
        this.Add_invoice.total_money = 0;
        this.Add_invoice.detail.forEach(item => {
            this.Add_invoice.total_money=new Big(this.Add_invoice.total_money).plus(item.total)
          // this.Add_invoice.total_money += parseFloat(item.total);
        });
      }
        for (var i = 0; i < this.list.data.length; i++) {
            if (this.check[i].checkStyle == true) {
                this.Add_invoice.tax=this.getEnumValue(this.enums.InvoiceInfo,this.list.data[i].invoice_type_id,'rate')
                this.Add_invoice.corp_name=this.list.data[i].corp_name
            }
            if(this.list.data[i].invoice_type_id==1||this.list.data[i].invoice_type_id==4){
                this.Add_invoice.invoice_type=1
            }else if(this.list.data[i].invoice_type_id==2){
                this.Add_invoice.invoice_type=4
            }else if(this.list.data[i].invoice_type_id==3){
                this.Add_invoice.invoice_type=3
            }else{
                this.Add_invoice.invoice_type=2
            }
        }
    },
    handle_invoice(item) {
        this.Add_invoice.corp_name=item.corp_name
        this.detailList.tax=this.getEnumValue(this.enums.InvoiceInfo,item.invoice_type_id,'rate')
        if(item.invoice_type_id==1||item.invoice_type_id==4){
            this.Add_invoice.invoice_type=1
        }else if(item.invoice_type_id==2){
            this.Add_invoice.invoice_type=4
        }else if(item.invoice_type_id==3){
            this.Add_invoice.invoice_type=3
        }else{
            this.Add_invoice.invoice_type=2
        }
      this.detailList.procurement_contract_id = item.procurement_contract_id;
      this.detailList.procurement_contract_detail_id = item.id;
      this.detailList.supplier_name = item.supplier_name;
      this.detailList.cas = item.cas;
      this.detailList.name = item.name;
      this.detailList.name_cn = item.name_cn;
      this.detailList.quantity = item.quantity;
      this.detailList.quantity_unit = Number(item.quantity_unit);
      this.detailList.price = item.price;
      this.detailList.amount = this.detailList.total = item.total_price;
      this.dialog_Add = true;
      this.tax()
    },
    keep_() {
      if(this.Add_invoice.corp_name_new!=this.Add_invoice.corp_name){
          this.$message({
              message: "收票公司不一致，请核实！",
              type: "error"
          });
          return false;
      }
      this.Add_invoice.detail=[]
      this.Add_invoice.total_money = this.detailList.total;
      this.Add_invoice.detail.push(this.detailList);
      create(this.Add_invoice, "ProcurementContract/Invoice", "create", this);
    },
    keep_all() {
      if(this.Add_invoice.corp_name_new!=this.Add_invoice.corp_name){
          this.$message({
              message: "收票公司不一致，请核实！",
              type: "error"
          });
          return false;
      }
      create(this.Add_invoice, "ProcurementContract/Invoice", "create_all", this);
    },
    close_() {
      this.dialog_Add = false;
      this.Add_invoice.corp_name = "";
      this.Add_invoice.corp_name_new = "";
      this.Add_invoice.invoice_date = "";
      this.Add_invoice.invoice_receiver_date = "";
      this.Add_invoice.invoice_number = "";
      this.Add_invoice.note = "";
      this.Add_invoice.total_money = "";
      this.Add_invoice.invoice_type = "";
      this.detailList = {
        cas: "",
        procurement_contract_detail_id: "",
        procurement_contract_id: "",
        supplier_name: "",
        name: "",
        name_cn: "",
        quantity: "",
        quantity_unit: "",
        price: "",
        amount: "",
        tax: 0,
        tax_amount: 0,
        total: "",
        currency_id: ""
      };
    },
    close() {
      this.dialogAdd = false;
      this.Add_invoice.corp_name = "";
      this.Add_invoice.corp_name_new = "";
      this.Add_invoice.invoice_date = "";
      this.Add_invoice.invoice_receiver_date = "";
      this.Add_invoice.invoice_number = "";
      this.Add_invoice.note = "";
      this.Add_invoice.total_money = "";
      this.Add_invoice.invoice_type = "";
    },
    handle_detail(id) {
      // listTotal("ProcurementContract/Invoice/generate?id=" + id).then(res => {
      //   this.$router.push({
      //     path: "/agree/collection.vue",
      //     name: "procure-collection",
      //     query: {
      //       ids: res.data,
      //       enum: res.enum
      //     }
      //   });
      // });
      this.$router.push({
          path: "/agree/collection.vue",
          name: "procure-collection",
          query: {
            item_id:id
          }
      });
    }
  }
};
function obj(arr, object) {
  if (arr.length == 0) {
    for (let i in object) {
      arr.push(object[i]);
    }
  }
}
function create(datas, type, method_type, that) {
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
        that.dialog_Add = false;
        that.dialogAdd = false;
        that.detailList = {
          cas: "",
          procurement_contract_detail_id: "",
          procurement_contract_id: "",
          supplier_name: "",
          name: "",
          name_cn: "",
          quantity: "",
          quantity_unit: "",
          price: "",
          amount: "",
          tax: 0,
          tax_amount: 0,
          total: ""
        };
        that.Add_invoice.corp_name = "";
        that.Add_invoice.corp_name_new = "";
        that.Add_invoice.invoice_date = "";
        that.Add_invoice.invoice_receiver_date = "";
        that.Add_invoice.invoice_number = "";
        that.Add_invoice.note = "";
        that.Add_invoice.total_money = "";
        that.Add_invoice.invoice_type = "";
        that.fetchData();
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
