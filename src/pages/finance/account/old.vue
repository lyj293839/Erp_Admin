<style lang="scss" scoped type="text/scss">
    .heard_top {
        margin: 10px 0px 15px 0px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
            font-size: 14px;
        }
        .el-select {
            margin: 0px 10px;
        }
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        td {
            padding-left: 5px;
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
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
        <div class="heard_top">
            <div>
                <el-button type="primary" size="mini" @click="account" class="d2-mr-5">统计</el-button>
                <el-button type="primary" size="mini" @click="customer_dialog=true" class="d2-mr-5">新增客户往来账</el-button>
                <el-button type="primary" size="mini" class="d2-mr-5" style="margin-left: 0" @click="supplier_dialog=true">新增供应商往来账</el-button>
                <el-input v-model="queryList.member_name" style="width: 200px;" size="mini" class="d2-mr-10" type="text" placeholder="名称" clearable></el-input>
                <el-date-picker
                        size="mini"
                        type="date"
                        placeholder="开始日期"
                        v-model="queryList.start"
                        value-format="yyyy-MM-dd"
                        format="yyyyMMdd"
                        style="width: 120px;"
                ></el-date-picker>
                <span style="margin:0px 2px">至</span>
                <el-date-picker
                        size="mini"
                        type="date"
                        placeholder="结束日期"
                        v-model="queryList.end"
                        value-format="yyyy-MM-dd"
                        format="yyyyMMdd"
                        style="width: 120px;"
                ></el-date-picker>
            </div>
            <el-select size="mini" v-model="queryList.type" clearable style="width: 100px;">
                <el-option
                        v-for="(item,key) in type"
                        :label="item.name"
                        :value="key"
                        :key="item.id"
                ></el-option>
            </el-select>
            <el-select size="mini" v-model="queryList.account_type" clearable style="width: 100px;">
                <el-option
                        v-for="(item,key) in enums.account_types"
                        :label="item.name"
                        :value="key"
                        :key="item.id"
                ></el-option>
            </el-select>
            <el-select size="mini" v-model="queryList.status" clearable style="width: 100px;">
                <el-option
                        v-for="(item,key) in enums.status"
                        :label="item.name"
                        :value="key"
                        :key="item.id"
                ></el-option>
            </el-select>
            <el-input v-model="queryList.contractno" style="width: 120px;" size="mini" type="text" placeholder="合同号" clearable></el-input>

            <el-button type="primary" size="mini" class="d2-ml-5" :loading="loading_search" @click="search()">搜索</el-button>
        </div>

        <!-- 页面 -->
        <el-table
                :data="list.data"
                border
                style="width: 100%;padding:0px;margin:0px;font-size:12px;"
                highlight-current-row
                fit
        >
            <el-table-column label="ID" width="60px;">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label=" 合同号" width="130px;">
                <template slot-scope="scope">{{scope.row.contractno}}</template>
            </el-table-column>
            <el-table-column label="录入日期" width="135px;">
                <template slot-scope="scope">{{scope.row.updated_at?scope.row.updated_at:scope.row.created_at}}</template>
            </el-table-column>
            <el-table-column label="客户类型" width="75px;">
                <template slot-scope="scope">{{getEnumValue(enums.type,scope.row.type)}}</template>
            </el-table-column>
            <el-table-column label="账户类型" width="70px;">
                <template slot-scope="scope">{{getEnumValue(enums.account_types,scope.row.account_type)}}</template>
            </el-table-column>
            <el-table-column label="客户/供应商">
                <template slot-scope="scope">{{attr(scope.row,'bcompany.name')}}</template>
            </el-table-column>

            <el-table-column label="金额" width="120px;">
                <template slot-scope="scope">
                    {{scope.row.flow}} {{getEnumValue(enums.Currency,scope.row.currency_id,'icon')}}{{scope.row.amount}}
                </template>
            </el-table-column>
            <el-table-column label="申请人" width="70px;">
                <template slot-scope="scope">{{scope.row.applicant?scope.row.applicant.name:''}}</template>
            </el-table-column>
            <el-table-column label="审核人" width="70px;">
                <template slot-scope="scope">{{scope.row.reviewer?scope.row.reviewer.name:''}}</template>
            </el-table-column>
            <el-table-column label="备注" width="100px;">
                <template slot-scope="scope">{{scope.row.note}}</template>
            </el-table-column>
            <el-table-column label="状态" width="60px;">
                <template slot-scope="scope">{{status[scope.row.status].name}}</template>
            </el-table-column>
            <el-table-column label="操作" width="130px;">
                <template slot-scope="scope" >
                    <div v-if="permissions.indexOf(223)>-1&&!(scope.row.type=='supplier'&&scope.row.contractno)">
                    <el-button
                            v-if="scope.row.status==1"
                            type="primary"
                            size="mini"
                            @click="check(scope.row.id,'2')"
                    >审核
                    </el-button>
                    <el-button
                            v-if="scope.row.status==1"
                            type="primary"
                            size="mini"
                            @click="check(scope.row.id,'3')"
                    >驳回
                    </el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--新增客户往来账-->
        <el-dialog title="新增客户往来账" :visible.sync="customer_dialog"  width="30%">
            <el-form   :model="addCustomerForm" label-width="80px" style="padding:0 30px;">
                <el-form-item label="公司名称" :required="true">
                    <el-select size="mini" v-model="addCustomerForm.a_member_id" clearable style="width: 100%;">
                        <el-option
                                v-for="item in company"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户名称" :required="true">
                    <el-select
                            v-model="addCustomerForm.b_member_id"
                            filterable
                            remote
                            size="mini"
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod"
                            :loading="loading"
                            style="width: 100%;">
                        <el-option
                                v-for="item in customer"
                                :label="item.name"
                                :value="item.id"
                                :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额" :required="true">
                    <el-input style="width: 100%;" size="mini" v-model="addCustomerForm.amount"></el-input>
                </el-form-item>
                <el-form-item label="货币" :required="true">
                    <el-select size="mini" v-model="addCustomerForm.currency_id" clearable style="width: 100%;">
                        <el-option
                                v-for="item in Currency"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="账户类型" :required="true">
                    <el-select size="mini" v-model="addCustomerForm.account_type" clearable style="width: 100%;">
                        <el-option
                                v-for="item in enums.account_types"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="方向" :required="true">
                    <el-select size="mini" v-model="addCustomerForm.flow" clearable style="width: 100%;">
                        <el-option
                                v-for="item in flow"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input  size="mini" v-model="addCustomerForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='addForm_loadingSave' size="mini"
                           @click="saveCustomerForm()">Save
                </el-button>
                <el-button @click="customer_dialog = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <!--新增供应商往来账-->
        <el-dialog title="新增供应商往来账" :visible.sync="supplier_dialog" width="30%">
            <el-form  :model="addSupplierForm" label-width="100px" style="padding:0 30px;">
                <el-form-item label="公司名称" :required="true">
                    <el-select size="mini" v-model="addSupplierForm.a_member_id" clearable style="width: 100%;">
                        <el-option
                                v-for="item in company"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商名称" :required="true">
                    <el-select
                            v-model="addSupplierForm.b_member_id"
                            filterable
                            remote
                            size="mini"
                            reserve-keyword
                            placeholder="请输入关键词"
                            :remote-method="remoteMethod_supplier"
                            :loading="loading"
                            style="width: 100%;">
                        <el-option
                                v-for="item in supplier"
                                :label="item.name"
                                :value="item.id"
                                :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="金额" :required="true">
                    <el-input size="mini" style="width: 100%;" v-model="addSupplierForm.amount"></el-input>
                </el-form-item>
                <el-form-item label="货币" :required="true">
                    <el-select size="mini" v-model="addSupplierForm.currency_id" clearable style="width: 100%;">
                        <el-option
                                v-for="item in Currency"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账户类型" :required="true">
                    <el-select size="mini" v-model="addSupplierForm.account_type" clearable style="width: 100%;">
                        <el-option
                                v-for="item in enums.account_types"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="方向" :required="true">
                    <el-select size="mini" v-model="addSupplierForm.flow" clearable style="width: 100%;">
                        <el-option
                                v-for="item in flow"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input size="mini" v-model="addSupplierForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='addForm_loadingSave' size="mini"
                           @click="saveSupplier()">Save
                </el-button>
                <el-button @click="supplier_dialog = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <!-- 统计 -->
        <el-dialog title="统计" :visible.sync="account_dialog"  width="90%">
            <el-select class="d2-m-10" size="mini" v-model="account_queryList.type" clearable style="width: 120px;">
                <el-option
                        v-for="(item,key) in account_enums.type"
                        :label="item.name"
                        :value="key"
                        :key="item.id"
                ></el-option>
            </el-select>
             <el-select  class="d2-m-10" size="mini" v-model="account_queryList.account_type" clearable style="width: 120px;">
                <el-option
                        v-for="(item,key) in account_enums.account_types"
                        :label="item.name"
                        :value="key"
                        :key="item.id"
                ></el-option>
            </el-select>
            <el-input  class="d2-m-10" v-model="account_queryList.member_name" style="width: 250px;" size="mini" type="text" placeholder="客户/供应商" clearable></el-input>
            <el-button  class="d2-m-10" type="primary" size="mini"   @click="account_search()">搜索</el-button>
            <el-table
            :data="account_list.data"
             border
            style="width: 100%">
             <el-table-column label="客户类型" width="100px;">
                <template slot-scope="scope">{{scope.row.type}}</template>
            </el-table-column>
            <el-table-column label="账户类型" width="100px;">
                <template slot-scope="scope">{{getEnumValue(account_enums.account_types,scope.row.account_type)}}</template>
            </el-table-column>
            <el-table-column label="内部公司" >
                <template slot-scope="scope">{{scope.row.acompany.name}}</template>
            </el-table-column>
            <el-table-column label="客户/供应商">
                <template slot-scope="scope">{{scope.row.bcompany.name}}</template>
            </el-table-column>
            <el-table-column label="金额" width="120px;">
                <template slot-scope="scope">{{getEnumValue(account_enums.Currency,scope.row.currency_id,'icon')}}{{scope.row.amount}}</template>
            </el-table-column>
            </el-table>
             <!-- 分页 -->
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                @current-change="account_handleCurrentChange"
                :current-page.sync="account_currentPage"
                layout="prev,pager,next"
                :page-size="account_list.per_page"
                :total="account_list.total"
        ></el-pagination>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev,pager,next"
                :page-size="list.per_page"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>
<script>
import { currentaccount_lists, company, currentaccount_create, customer_company, supplier_company, currentaccount_review,currentaccount } from '@/api/finance'
import { parseTime } from '@/utils'
export default {
  name: 'finance-account',
  data () {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      enums: [],
      list: {},
      info_list: {},
      history_list: [],
      customer_dialog: false,
      supplier_dialog: false,
      account_dialog:false,
      addForm_loadingSave: false,
      loading: false,
      currentPage: 1,
      account_currentPage:1,
      queryList: {
        page: '1',
        start: '',
        end: '',
        contractno: '',
        type: '',
        member_name:''
      },
      account_list: {},
      account_enums:{},
      account_queryList: {
        page: '1',
        member_name:'',
        type:'',
        account_type:''
      },
      reviewData: {
        check_status: '',
        id: '',
        pay_bank: '',
        check_remark: ''
      },
      check_status_info: [],
      currencys: [],
      fee_apply_type: [],
      fee_type_info: [],
      fee_apply_status: [],
      pay_type_info: [],
      pay_bank_info: [],
      addCustomerForm: {
        a_member_id: '',
        b_member_id: '',
        amount: '',
        currency_id: '',
        account_type: '',
        flow: '',
        type: 'customer',
        note: ''
      },
      addSupplierForm: {
        a_member_id: '',
        b_member_id: '',
        amount: '',
        currency_id: '',
        account_type: '',
        flow: '',
        type: 'supplier',
        note: ''
      },
      Currency: [],
      flow: [],
      status: [],
      type: [],
      company: [],
      customer: [],
      supplier: [],
      timeDefaultShow: '',
      loading_search:false
    }
  },
  created () {
    // this.queryList.start = parseTime(new Date(), '{y}-{m}-{d}');
    // this.queryList.end =parseTime(new Date(), '{y}-{m}-{d}');
    this.fetchData()
  },
  methods: {
    fetchData () {
      currentaccount_lists(this.queryList).then(res => {
      if(this.loading_search){
          this.$message({
              message: 'success',
              type: 'success'
          })
          this.loading_search=false
      }
        this.list = res.data
        this.enums = res.enum
        this.Currency = res.enum.Currency
        this.flow = res.enum.flow
        this.status = res.enum.status
        this.type = res.enum.type
        this.company = res.enum.company
      })
    },
    account(){
      this.account_dialog=true
      currentaccount(this.account_queryList).then(res=>{
          this.account_list=res.data
          this.account_enums=res.enum
      })
    },
    account_search(){
      currentaccount(this.account_queryList).then(res=>{
          this.account_list=res.data
      })
    },
    search () {
        this.loading_search=true
        this.queryList.page = 1;
        this.currentPage=1
        this.fetchData()
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          customer_company(query).then(res => {
            this.customer = res.data
              this.loading = false

          })
        }, 200)
      } else {
        this.customer = []
      }
    },
    remoteMethod_supplier (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          supplier_company(query).then(res => {
            this.supplier = res.data
              this.loading = false
          })
        }, 200)
      } else {
        this.supplier = []
      }
    },
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    },
    account_handleCurrentChange (pageCurrent) {
      this.account_queryList.page = this.account_currentPage = pageCurrent
      currentaccount(this.account_queryList).then(res=>{
          this.account_list=res.data
      })
    },
    saveCustomerForm () {
      currentaccount_create(this.addCustomerForm, this, 'customer')
    },
    saveSupplier () {
      currentaccount_create(this.addSupplierForm, this, 'supplier')
    },
    check (id, status) {
      currentaccount_review(id, status, this)
    }
  }
}
</script>
