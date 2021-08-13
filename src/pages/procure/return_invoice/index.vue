<template>
  <d2-container>
    <div>
      <el-row :gutter="5" type="flex" align="middle" justify="end">
        <el-col :span="22" class="d2-text-right">
          <el-input size="mini" style="width: 150px;" v-model="queryList.invoice_number"
                    placeholder="发票号"></el-input>
          <el-date-picker
                  class="date_picker d2-ml-5"
                  v-model="queryList.fromdate"
                  value-format="yyyy-MM-dd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="开票时间"
                  size="mini"
                  style="width: 120px;"
          ></el-date-picker>
          <el-date-picker
                  class="date_picker d2-ml-5"
                  v-model="queryList.todate"
                  value-format="yyyy-MM-dd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="开票结束时间"
                  size="mini"
                  style="width: 120px;"
          ></el-date-picker>
          <el-input size="mini" style="width: 150px;"  class="d2-ml-5" v-model="queryList.supplier_name"
                    placeholder="公司名称"></el-input>
          <el-select v-model="queryList.post_status" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                     filterable
                     placeholder="状态">
            <el-option
                    v-for="(i,index) in enums.post_status"
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
    <el-table style="font-size: 12px" :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
      <el-table-column label='#ID' width="80">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='开票时间'>
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='发票号码'>
        <template slot-scope="scope">
          {{scope.row.invoice_number}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='公司名称'>
        <template slot-scope="scope">
          {{scope.row.invoice?scope.row.invoice.supplier_name:''}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='发票类型'>
        <template slot-scope="scope">
          {{getEnumValue(enums.Invoicetype,scope.row.invoice.invoice_type)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='开票金额'>
        <template slot-scope="scope">
          {{scope.row.invoice?scope.row.invoice.total_money:''}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='备注'>
        <template slot-scope="scope">
          {{scope.row.invoice.note}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='退票状态'>
        <template slot-scope="scope">
          {{getEnumValue(enums.post_status,scope.row.post_status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='审核状态'>
        <template slot-scope="scope">
          {{getEnumValue(enums.check_status,scope.row.check_status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='操作'>
        <template slot-scope="scope">
            <el-button  type="primary"  size="mini" @click="refund(scope.row.id)">退票</el-button>
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
    import { invoice_returns } from '@/api/procure'
    export default {
        name: 'procure-return_invoice',
        data () {
            return {
                currentPage: 1,
                queryList: {
                    page: '1',
                    invoice_number:'',
                    post_status:'',
                    supplier_name:'',
                    fromdate:'',
                    todate:''
                },
                list: [],
                enums:{},
                loading_search:false
            }
        },
        created () {
            this.fetchData()
        },
        methods: {
            fetchData () {
                invoice_returns(this.queryList).then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    this.list = res.data
                    this.enums= res.enum
                }).catch(rr => {this.loading_search=false})
            },
            refund (id) {
                this.$router.push({
                    path: '/procure/return_invoice/refund',
                    name: 'procure-return_invoice_detail',
                    query: {
                        id: id
                    }
                })
            },
            search () {
                this.loading_search=true
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
  .el-pagination {
    margin-top: 10px;
    text-align: right;
  }
</style>
