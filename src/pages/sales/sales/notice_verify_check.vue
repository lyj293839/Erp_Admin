<style lang="scss" scoped type="text/scss">
    /deep/ table {
        width: 100%;
        border-collapse: collapse;
        .el-input__inner {
            border: 0px;
            padding: 0px;
        }
        td, th {
            padding: 10px;
            line-height: 20px;
            font-size: 11px;
        }
    }
    .button:focus, .button:hover {
        color: #606266;
        border: none;
        background-color: white;
    }
    .el-pagination {
        margin-top: 10px;
        text-align: right;
    }
    /deep/.el-table{
        .cell{
            padding: 0px !important;
        }
    }
</style>
<template>
    <d2-container>
        <div>
            <el-row :gutter="5" type="flex" align="middle" justify="end">
                <el-col :span="22" class="d2-text-right">
                    <el-input size="mini" style="width: 150px;" v-model="queryList.contract_number"
                              :placeholder="$t('sale.add.sale44')"></el-input><!-- 合同号 -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.start_date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale184')"
                            size="mini"
                            style="width: 125px;"
                    ></el-date-picker><!-- 开始日期 -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.end_date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale185')"
                            size="mini"
                            style="width: 125px;"
                    ></el-date-picker><!-- 合同结束日期 -->
                    <el-input size="mini" style="width: 150px;margin-left:5px;" v-model="queryList.customer_name"
                              :placeholder="$t('Inquery.index.customer')"></el-input>
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
                    <el-select v-model="queryList.invoice_status" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               :placeholder="$t('sale.add.sale240')"><!-- 开票状态 -->
                        <el-option
                                v-for="(i,index) in invoice_notice_status"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.status" class="d2-ml-5" style="width: 140px;" size="mini" clearable
                               filterable
                               :placeholder="$t('sale.add.sale105')"><!-- 审核状态 -->
                        <el-option
                                v-for="(i,index) in supervisor_status_info"
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
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column align="center" label='ID' width="70px">
                <template slot-scope="scope">
                    <div>{{scope.row.id}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale44')"  width="120px;"><!-- 合同号 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.contract_numbers.length>2">
                    <el-tooltip class="item" effect="dark" :content="scope.row.contract_numbers_all" placement="top">
                        <div style="background:white;display: block;">{{scope.row.contract_numbers_name}}...</div>
                    </el-tooltip>
                    </div>
                    <div v-else>
                       {{scope.row.contract_numbers[0]}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale183')" width="90"><!-- 通知时间 -->
                <template slot-scope="scope">
                    {{scope.row.created_at}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale178')" width="220"><!-- 客户名称 -->
                <template slot-scope="scope">
                    {{scope.row.customer_name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请人" width="60">
                <template slot-scope="scope">
                    {{scope.row.user.username}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale25')" width="90"><!-- 发票类型 -->
                <template slot-scope="scope">
                    {{invoice_type.filter(i => {return i.id == scope.row.invoice_type})[0].name}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale182')" width="90"><!-- 发票金额 -->
                <template slot-scope="scope">
                    {{scope.row.total_money}}{{currencys.filter(i => {return i.id == scope.row.currency_id})[0].name}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale59')" min-width="100"><!-- 备注 -->
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale240')"  width="70"><!-- 开票状态 -->
                <template slot-scope="scope">
                    <span :style="scope.row.invoice_status==10?'color:red;':''">{{invoice_notice_status[scope.row.invoice_status].name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否虚拟开票"  width="100">
                <template slot-scope="scope">
                    <span :style="scope.row.is_virtual==2?'color:red;':''">{{getEnumValue(is_virtual_info,scope.row.is_virtual)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale105')" width="120"><!-- 审核状态 -->
                <template slot-scope="scope">
                    {{getEnumValue(supervisor_status_info,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale80')" width="70" fixed="right"><!-- 操作 -->
                <template slot-scope="scope">
                    <el-button  type="primary"  size="mini" v-if="scope.row.status==-10&&permission_names['invoice.supervisor_billing_review']=='invoice.supervisor_billing_review'" @click="check(scope.row.id)">{{$t('sale.add.sale86')}}</el-button><!-- 审核 -->
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
import { notice_verify_list, customer_lists } from '@/api/sale'

export default {
  name: 'sales-notice_verify_check',
  data () {
    return {
        permission_names: JSON.parse(localStorage.getItem("permission_names")),
      currentPage: 1,
      queryList: {
        page: '1',
        contract_number: '',
        start_date: '',
        end_date: '',
        customer_name: '',
        invoice_status:'',
        status: -10,
        billing_party_id:'',
        is_virtual:''
      },
      list: [],
      currencys: [],
      invoice_info: [],
      invoice_notice_status: [],
      invoice_type: [],
      supervisor_status_info: [],
      units: [],
      customer: [],
      is_virtual_info:[],
      loading: false,
      loading_search:false
    }
  },
  watch: {
    $route (to, from) {
        if(to.name=='sales-notice_verify_check'){
            this.fetchData()
        }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      notice_verify_list(this.queryList).then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
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
        this.invoice_notice_status = res.enum.invoice_notice_status
        this.invoice_type = res.enum.invoice_type
        this.supervisor_status_info = res.enum.supervisor_status_info
        this.units = res.enum.units
        this.is_virtual_info = res.enum.is_virtual_info
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
    check (id) {
      this.$router.push({
        path: '/sales/notice_verify_check_detail',
        name: 'sales-notice_verify_check_detail',
        query: {
          id: id
        }
      })
    },
    search () {
      this.loading_search=true
      this.queryList.page=1
      this.currentPage=1
      this.fetchData()
    },
    handleCurrentChange (page_current) {
      this.queryList.page = this.currentPage = page_current
      this.fetchData()
    }
  }
}
</script>
