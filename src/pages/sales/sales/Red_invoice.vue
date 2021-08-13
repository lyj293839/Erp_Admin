<template>
    <d2-container>
        <div>
            <el-row :gutter="5" type="flex" align="middle" justify="end" style="margin: 10px 0">
                <el-col :span="24" class="d2-text-right">
                    <el-input size="mini" style="width: 150px;" v-model="queryList.contract_number"
                              placeholder="销售合同号" clearable></el-input>

                    <el-input size="mini" style="width: 150px;margin-left:5px;" v-model="queryList.invoice_number"
                              placeholder="发票号" clearable></el-input>
                    <el-input size="mini" style="width: 150px;margin-left:5px;" v-model="queryList.customer_name"
                              :placeholder="$t('Inquery.index.customer')" clearable></el-input>
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
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search"
                    >{{$t('search')}}
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            v-if="permission_names['invoice.credit_note_invoicing']=='invoice.credit_note_invoicing'"
                            @click="invoice_detail_all()"
                    >开票
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" style="font-size: 12px" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column width="60" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="checked_all" @change="select_all()"></el-checkbox>
                </template>
                <template slot-scope="scope">
                        <el-checkbox
                                v-model="scope.row.checked"
                                @change="select_one(scope.row.checked,scope.row.id)"
                        ></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='发票号' width='120'>
                <template slot-scope="scope">
                    {{scope.row.invoice_number}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='合同号'>
                <template slot-scope="scope">
                    <div v-if="scope.row.contract_numbers.length>2">
                        <el-tooltip class="item" effect="dark" :content="scope.row.contract_numbers_all" placement="top">
                            <el-button class="button" style="border: none;padding:5px;">{{scope.row.contract_numbers_name}}</el-button>
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
            <el-table-column align="center" label='发票类型' width="120">
                <template slot-scope="scope">
                    {{invoice_type.filter(i => {return i.id == scope.row.invoice_type})[0].name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='开票金额' width="120">
                <template slot-scope="scope">
                    {{scope.row.total_money}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作' width="120">
                <template slot-scope="scope">
                    <div>
                        <el-button  type="primary" v-if="permission_names['invoice.credit_note_invoicing']=='invoice.credit_note_invoicing'" size="mini" @click="invoice_detail(scope.row.id)">开票</el-button>
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

import { sales_invoice_export,export_sales_invoice,export_cost_invoice} from '@/api/finance'
import { customer_lists,credit_note_list,credit_note_invoicing_view } from '@/api/sale'
import { parseTime, getEnumValue } from '@/utils/index'
import axios from 'axios'
export default {
  name: 'sales-Red_invoice',
  data () {
    return {
      getEnumValue: getEnumValue,
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      currentPage: 1,
      queryList: {
        page: '1',
        invoice_type: '',
        customer_name: '',
        contract_number: '',
        invoice_number: '',
      },
      list: [],
      list_export:[],
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
      ids:[],
      checked_all:false,
      loading: false,
      loading_search: false,
      loading_sales_invoice:false,
      loading_cost_invoice:false,
      deal_status_info:[]
    }
  },
    watch: {
        $route(to, from) {
            if (to.name=='sales-Red_invoice') {
                this.fetchData();
            }
        }
    },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      credit_note_list(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.loading_search = false
        }
        this.checked_all = false
        res.data.data.forEach((items, index) => {
          items.contract_numbers_all = ''
          items.contract_numbers.forEach((m, n) => {
            items.contract_numbers_all += m + ','
          })
          items.contract_numbers_name = items.contract_numbers[0] + ',' + (items.contract_numbers[1] ? items.contract_numbers[1] : '')
          items.checked = false
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
      }).catch(rr => {this.loading_search=false})
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
    select_all(){
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
                num++;
                this.ids.push(items.id);
            }
        });
        if (num == this.list.data.length) {
            this.checked_all = true;
        } else {
            this.checked_all = false;
        }
    },
    invoice_detail(id) {
      var obj = {
          ids:[id]
      }
      credit_note_invoicing_view(obj).then(res=>{
          if (res && res.code == 0) {
            this.$router.push({
              path: '/sales/Red_invoice_detail',
              name: 'sales-Red_invoice_detail',
              query: {
                res: JSON.stringify(res),
                ids: JSON.stringify(obj)
              }
            })
          } else {
            that.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
    },
    invoice_detail_all(){
        var obj = {
            ids:this.ids
        }
        credit_note_invoicing_view(obj).then(res=>{
          if (res && res.code == 0) {
            this.$router.push({
              path: '/sales/Red_invoice_detail',
              name: 'sales-Red_invoice_detail',
              query: {
                res: JSON.stringify(res),
                ids: JSON.stringify(obj)
              }
            })
          } else {
            that.$message({
              message: res.msg,
              type: 'error'
            })
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
    /deep/.item .el-button{
        padding: 5px 0px;
    }
</style>
