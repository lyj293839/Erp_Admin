<template>
    <d2-container>
        <div>
            <el-row :gutter="5" type="flex" align="middle" justify="start" style="margin: 10px 0">
                <el-col :span="24" class="d2-text-right">
                    <el-input size="mini" style="width: 150px;" v-model="queryList.contract_number"
                              placeholder="销售合同号"></el-input>
                    <el-select
                        v-model="queryList.billing_party_id"
                        placeholder="开票方"
                        clearable
                        size='mini'
                        filterable
                        style="width: 200px;margin-left:5px;"
                    >
                        <el-option v-for="i in GEnums.ACompany"  :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                    <el-input size="mini" style="width: 150px;margin-left:5px;" v-model="queryList.invoice_number"
                              placeholder="发票号"></el-input>
                    <!-- <el-select
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
                            style="width: 140px;"
                    >
                        <el-option v-for="item in customer" :label="item.name" :value="item.id"></el-option>
                    </el-select> -->
                    <el-input size="mini" style="width: 150px;margin-left:5px;" v-model="queryList.customer_name"
                              :placeholder="$t('Inquery.index.customer')"></el-input>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.start_date"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            type="date"
                            placeholder="申请开始"
                            size="mini"
                            style="width: 115px;"
                    ></el-date-picker>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.end_date"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            type="date"
                            placeholder="申请结束"
                            size="mini"
                            style="width: 115px;"
                    ></el-date-picker>
                    <!-- <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.verify_start_date"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            type="date"
                            placeholder="审核开始"
                            size="mini"
                            style="width: 115px;"
                    ></el-date-picker>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.verify_end_date"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            type="date"
                            placeholder="审核结束"
                            size="mini"
                            style="width: 115px;"
                    ></el-date-picker> -->
                    <el-input size="mini" style="width: 90px;margin-left:5px;" v-model="queryList.applicant_user"
                              placeholder="申请人"></el-input>
                    <el-select v-model="queryList.invoice_status" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               placeholder="通知单状态">
                        <el-option
                                v-for="(i,index) in invoice_notice_status"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.invoice_type" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               placeholder="发票类型">
                        <el-option
                                v-for="(i,index) in invoice_type"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.deal_status" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               placeholder="处理状态">
                        <el-option
                                v-for="(i,index) in deal_status_info"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.type" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               placeholder="开票分类"><!--  -->
                        <el-option
                                v-for="(i,index) in type_info"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.is_virtual" class="d2-ml-5" style="width: 125px;" size="mini" clearable
                               filterable
                               placeholder="是否虚拟开票"><!--  -->
                        <el-option
                                v-for="(i,index) in is_virtual_info"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search"
                    >{{$t('search')}}
                    </el-button>

                    <!-- //@todo 导入 -->
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            @click="doImport"
                            style="margin-top:5px;"
                    >导入
                    </el-button>
                    <!-- //@todo 导出 -->
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_e"
                            @click="doExport"
                            style="margin-top:5px;"
                    >专票|普票导出
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_d"
                            @click="doExport_dian"
                            style="margin-top:5px;"
                    >电子发票导出
                    </el-button>
                    <!--<el-button-->
                            <!--class="d2-ml-5"-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--:loading="loading_sales_invoice"-->
                            <!--@click="export_sales_invoice"-->
                    <!--&gt;收入凭证-->
                    <!--</el-button>-->
                    <!--<el-button-->
                            <!--class="d2-ml-5"-->
                            <!--size="mini"-->
                            <!--type="primary"-->
                            <!--:loading="loading_cost_invoice"-->
                            <!--@click="export_cost_invoice"-->
                    <!--&gt;结转成本-->
                    <!--</el-button>-->
                    <a :href="export_cost_invoice_url" ref="export_cost_invoice_url" hidden></a>
                    <a :href="export_sales_invoice_url" ref="export_sales_invoice_url" hidden></a>
                    <a :href="prod_export_url" ref="prod_export_url" hidden></a>
                    <a :href="prod_export_dian_url" ref="prod_export_dian_url" hidden></a>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" style="font-size: 12px" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column label='#ID' width="70">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='申请时间' width="100">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.created_at" placement="top-start">
                        <span>{{scope.row.created_at.substring(0,10)}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请人" width="70">
                <template slot-scope="scope">
                    {{scope.row.user.username}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='合同号'>
                <template slot-scope="scope">
                    <div v-if="scope.row.contract_numbers.length>2">
                        <el-tooltip class="item" effect="dark" :content="scope.row.contract_numbers_all" placement="top">
                            <el-button class="button" style="border: none;">{{scope.row.contract_numbers_name}}</el-button>
                        </el-tooltip>
                    </div>
                    <div v-else>
                        {{scope.row.contract_numbers_name}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" label='客户名称' min-width="150">
                <template slot-scope="scope">
                    {{scope.row.customer_name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='发票类型' width="100">
                <template slot-scope="scope">
                    {{invoice_type.filter(i => {return i.id == scope.row.invoice_type})[0].name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="开票分类" width="80"><!--  -->
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1" style="color:green;">{{getEnumValue(type_info,scope.row.type)}}</span>
                    <span v-else style="color:red;">{{getEnumValue(type_info,scope.row.type)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='开票金额' width="100">
                <template slot-scope="scope">
                    {{scope.row.total_money}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='通知单开票状态' width="120">
                <template slot-scope="scope">
                  <span v-if="scope.row.invoice_status==10" style="color:red;">{{getEnumValue(invoice_notice_status,scope.row.invoice_status)}}</span>
                  <span v-else>{{getEnumValue(invoice_notice_status,scope.row.invoice_status)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='审核状态' width="100">
                <template slot-scope="scope">
                    {{getEnumValue(status_info,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='处理状态' width="80">
                <template slot-scope="scope">
                  <span :style="(scope.row.deal_status==1||scope.row.deal_status==4)?'color:red;':''">
                    {{getEnumValue(deal_status_info,scope.row.deal_status)}}
                  </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作' width="100">
                <template slot-scope="scope">
                    <div>
                        <el-button  type="primary" v-if="scope.row.invoice_status!==10" size="mini" @click="check(scope.row.id)">开票</el-button>
                        <!-- <el-button v-if="scope.row.invoice_status!==0&&scope.row.invoice_status!==10" type="primary"  size="mini" @click="refund(scope.row.id)">退票</el-button> -->
                    </div>
                    <div style="text-align:center;margin-top:5px;">
                      <el-button v-if="scope.row.status==2&&(scope.row.deal_status==1||scope.row.deal_status==4)" @click="cancel(scope.row.id)"  type="primary"  size="mini">取消申请</el-button>
                    </div> 
                </template>
            </el-table-column>
        </el-table>
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

import { notice_billing_list,sales_invoice_export,export_sales_invoice,export_cost_invoice,cancel_billing,sales_export_dz} from '@/api/finance'
import { customer_lists } from '@/api/sale'
import { parseTime, getEnumValue } from '@/utils/index'
import axios from 'axios'
export default {
  name: 'finance-sale_invoice',
  data () {
    return {
      getEnumValue: getEnumValue,
      currentPage: 1,
      queryList: {
        page: '1',
        start_date: '',
        end_date: '',
        invoice_type: '',
        customer_name: '',
        contract_number: '',
        invoice_number: '',
        // verify_start_date: '',
        // verify_end_date: '',
        invoice_status:'',
        deal_status:'',
        type:'',
        applicant_user:'',
        is_virtual:'',
        billing_party_id:''
      },
      list: [],
      list_export:[],
      prod_export_url:'',
      prod_export_dian_url:'',
      currencys: [],
      invoice_info: [],
      invoice_status_info: [],
      invoice_type: [],
      invoice_notice_status: [],
      invoice_notice_return_statuses: [],
      status_info: [],
      statuses: [],
      units: [],
      customer: [],
      loading: false,
      loading_search: false,
      loading_sales_invoice:false,
      export_sales_invoice_url:'',
      loading_e:false,
      loading_d:false,
      loading_cost_invoice:false,
      export_cost_invoice_url:'',
      deal_status_info:[],
      type_info:[],
      is_virtual_info:[]
    }
  },
    watch: {
        $route(to, from) {
            if (to.name=='finance-sale_invoice') {
                this.fetchData();
            }
        }
    },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      notice_billing_list(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.loading_search = false
        }
        res.data.data.forEach((items, index) => {
          items.contract_numbers_all = ''
          items.contract_numbers.forEach((m, n) => {
            items.contract_numbers_all += m + ','
          })
          items.contract_numbers_name = items.contract_numbers[0] + ',' + (items.contract_numbers[1] ? items.contract_numbers[1] : '')
        })
        this.list = res.data
        this.currencys = res.enum.currencys
        this.invoice_info = res.enum.invoice_info
        this.invoice_type = res.enum.invoice_type
        this.status_info = res.enum.status_info
        this.statuses = res.enum.statuses
        this.units = res.enum.units
        this.invoice_notice_status = res.enum.invoice_notice_status
        this.invoice_notice_return_statuses = res.enum.invoice_notice_return_statuses
        this.deal_status_info = res.enum.deal_status_info
        this.type_info = res.enum.type_info
        this.is_virtual_info = res.enum.is_virtual_info
      })
    },
    cancel(id){
      cancel_billing(id,this)
    },
    remoteMethod (query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.customer = res.data
            this.loading = false
          })
        }, 200)
      } else {
        this.customer = []
      }
    },
    check (id) {
      this.$router.push({
        path: '/finance/sale_invoice_detail',
        name: 'finance-sale_invoice_detail',
        query: {
          id: id
        }
      })
    },
    refund (id) {
      this.$router.push({
        path: '/finance/sale_invoice_refund',
        name: 'finance-sale_invoice_refund',
        query: {
          id: id
        }
      })
    },
    doSearch(){
      //@todo
    },
    doExport_dian(){
      this.loading_d = true
      this.queryList.flag = [1]
      sales_export_dz(this.queryList).then(res => {
        if (res && res.code === 0) {
          this.prod_export_dian_url = res.data
          setTimeout(() => {
            this.$refs.prod_export_dian_url.click()
            this.loading_d = false
          }, 200)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.loading_d = false
        }
      }).catch(rr => {
        this.loading_d = false
      })
    },
    doExport(){
      //@todo
      this.loading_e = true
      this.queryList.flag = [1]
      sales_invoice_export(this.queryList).then(res => {
        if (res && res.code === 0) {
          this.prod_export_url = res.data
          setTimeout(() => {
            this.$refs.prod_export_url.click()
            this.loading_e = false
          }, 200)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.loading_e = false
        }
      }).catch(rr => {
        this.loading_e = false
      })
    },
      export_sales_invoice(){
          this.loading_sales_invoice = true
          export_sales_invoice(this.queryList).then(res => {
              if (res && res.code === 0) {
                  this.export_sales_invoice_url = res.data
                  setTimeout(() => {
                      this.$refs.export_sales_invoice_url.click()
                      this.loading_sales_invoice = false
                  }, 200)
              } else {
                  this.$message({
                      message: res.msg,
                      type: 'error'
                  })
                  this.loading_sales_invoice = false
              }
          }).catch(rr => {
              this.loading_sales_invoice = false
          })
      },
      export_cost_invoice(){
          this.loading_cost_invoice = true
          export_cost_invoice(this.queryList).then(res => {
              if (res && res.code === 0) {
                  this.export_cost_invoice_url = res.data
                  setTimeout(() => {
                      this.$refs.export_cost_invoice_url.click()
                      this.loading_cost_invoice = false
                  }, 200)
              } else {
                  this.$message({
                      message: res.msg,
                      type: 'error'
                  })
                  this.loading_cost_invoice = false
              }
          }).catch(rr => {
              this.loading_cost_invoice = false
          })
      },
    doImport(){
      this.$router.push({
        path: '/finance/doimport',
        name: 'finance-doimport',
      })
    },
    search () {
      this.loading_search = true
        this.queryList.page = 1;
        this.currentPage=1
      this.fetchData()
    },
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
.el-col{
  .el-input{margin: 5px 0px;}
}
    /deep/ table {
        width: 100%;
        border-collapse: collapse;
        .el-input__inner {
            border: 0px;
            padding: 0px;
        }
        td, th {
            padding: 5px;
            line-height: 30px;
            font-size: 12px;
        }
    }
    .button:focus, .button:hover {
        color: #606266;
        border: none;
        background-color: white;
    }
</style>
