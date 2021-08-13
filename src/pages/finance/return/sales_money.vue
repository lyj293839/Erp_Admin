<template>
    <d2-container>
        <div class="search">
            <el-input placeholder="请输入合同号" size="mini" v-model="query.contract_number" style="width:150px" class="d2-mr-5" clearable></el-input>
            <el-input placeholder="请输入cas" size="mini" v-model="query.cas" style="width:150px" class="d2-mr-5" clearable></el-input>
            <el-input placeholder="收款人" size="mini" v-model="query.payee" style="width:150px" class="d2-mr-5" clearable></el-input>
            <el-select size="mini" v-model="query.status" placeholder='审核状态' clearable>
                <el-option
                        v-for="item in enums.statuses"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-select size="mini" v-model="query.pay_status" placeholder='付款状态' clearable>
                <el-option
                        v-for="item in enums.pay_statuses"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
        </div>
        <el-table
                :data="tableData.data"
                border
                style="width: 100%;font-size:12px">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="60">
            </el-table-column>
            <el-table-column
                    prop="sales_contract_detail.contract_number"
                    label="销售合同号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="sales_contract_detail.cas"
                    label="CAS"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="sales_contract_detail.prod_no"
                    label="产品编号"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="sales_contract_detail.batchno"
                    label="批次"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="申请金额"
                    width="70">
                <template slot-scope="scope">
                    {{getEnumValue(enums.Currency,scope.row.currency_id,'icon')}}{{scope.row.actual_amount}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="applicant.name"
                    label="申请人"
                    width="70"
            >
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="申请时间"
                    width="140"
            >
            </el-table-column>
            <el-table-column
                    prop="payee"
                    label="收款人"
                    width="120"
            >
            </el-table-column>
            <el-table-column
                    prop="checker.name"
                    label="审核人"
                    width="80"
            >
            </el-table-column>
            <el-table-column
                    prop="check_time"
                    label="审核时间"
                    width="140"
            >
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="80"
            >
                <template slot-scope="scope">{{getEnumValue(enums.statuses,scope.row.status)}}</template>
            </el-table-column>

            <el-table-column
                    label="退款状态"
                    width="80"
            >
                <template slot-scope="scope">
                  <span :style="scope.row.pay_status==10?'color:red;':''">{{getEnumValue(enums.pay_statuses,scope.row.pay_status)}}</span> 
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="120">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="checked_all" @change="select_all" style="margin-right: 5px;"></el-checkbox>
                    <el-button type="primary" @click="handleClick_all" class="d2-ml-5" size="mini">打款</el-button>
                </template>
                <template slot-scope="scope">
                  <div>
                    <el-checkbox  v-if="scope.row.status===1&&scope.row.pay_status!==1&&scope.row.pay_status!==10&&scope.row.transfer_to_account===1" v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row.id)"
                                 style="margin-right: 5px;"></el-checkbox>
                    <el-button v-if="scope.row.status===1&&scope.row.pay_status!==1&&scope.row.pay_status!==10&&scope.row.transfer_to_account===1" type="primary"
                               @click="handleClick(scope.row.id)" size="mini" class="d2-ml-5">打款
                    </el-button>
                  </div>
                  <div style="margin-top:5px;text-align:center;">
                    <el-button v-if="scope.row.status===1&&scope.row.pay_status==0&&scope.row.transfer_to_account===1" type="primary"
                              @click="Cancellation(scope.row.id)" size="mini" class="d2-ml-5">取消退款
                    </el-button>
                  </div>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                :page-sizes="[10, 50, 100, 200]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes,prev,pager,next"
                :page-size="Number(tableData.per_page)"
                :total="tableData.total"
        ></el-pagination>
    </d2-container>
</template>
<script>
import { salesReturnMoney, select_sales,cancel_refund } from '@/api/finance'

export default {
  name: 'finance-return_sales_money',
  components: {},
  data () {
    return {
      row: [],
      enums: [],
      currentPage: 1,
      tableData: [],
      query: {
        page: 1,
        per_page: '',
        status: '',
        pay_status:'',
        contract_number:'',
        payee:''
      },
      checked_all: false,
        loading_search:false,
      ids: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      salesReturnMoney(this.query).then(res => {
          if(this.loading_search){
              this.$message({
                  message: 'success',
                  type: 'success'
              })
              this.loading_search=false
          }
        res.data.data.forEach((items, index) => {
          items.checked = false
        })
        this.tableData = res.data
        this.enums = res.enum
      })
    },
    select_one (checked, id) {
      if (checked) {
        this.ids.push(id)
      } else {
        this.ids.forEach((items, index) => {
          if (items == id) {
            this.ids.splice(index, 1)
          }
        })
      }
      let num = 0
      this.tableData.data.forEach((items, index) => {
        if (items.checked) {
          num++
        }
      })
      if (num == this.tableData.data.length) {
        this.ids = []
        this.checked_all = true
        this.tableData.data.forEach((items, index) => {
          this.ids.push(items.id)
        })
      } else {
        this.checked_all = false
      }
    },
    select_all () {
      this.tableData.data.forEach((items, index) => {
        if (this.checked_all && items.status === 1 && items.transfer_to_account === 1) {
          items.checked = true
          this.ids.push(items.id)
        } else if (!this.checked_all) {
          this.ids = []
          items.checked = false
        }
      })
    },
    Cancellation(id){
      cancel_refund(id,this)
    },
    handleClick_all () {
      let obj = {
        ids: this.ids
      }
      select_sales(obj).then(res => {
        if (res && res.code === 0) {
          this.$router.push({
            path: '/finance/finance-sale_invoice',
            name: 'finance-return_sales_money_detail',
            query: {
              ids: JSON.stringify(this.ids)
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(rr => {
      })
    },
    handleCurrentChange (pageCurrent) {
      this.query.page = this.currentPage = pageCurrent
      this.fetchData()
    },
    handleSizeChange (val) {
      this.query.per_page = val
      this.fetchData()
    },
    handleClick (id) {
      let obj = {
        ids: [id]
      }
      select_sales(obj).then(res => {
        if (res && res.code === 0) {
          this.$router.push({
            path: '/finance/finance-sale_invoice',
            name: 'finance-return_sales_money_detail',
            query: {
              ids: JSON.stringify([id])
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      }).catch(rr => {
      })
    },
    Search () {
      this.loading_search=true
        this.query.page = 1;
        this.currentPage=1
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
    .search {
        margin: 10px 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      .el-select {
          margin-left: 10px;
          width: 100px;
      }
      .el-input {
          width: 200px;
          margin-left: 10px;
      }
      .el-button {
          margin-left: 10px;
      }
    }
    /deep/ .el-dialog__body {
        padding: 0 20px;
    }
</style>
