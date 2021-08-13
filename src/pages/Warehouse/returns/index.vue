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
    /deep/.el-dialog__body{
        padding: 0 20px;
    }
</style>
<template>
    <d2-container>
        <div class="search">
            <el-input placeholder="请输入CAS  " size="mini" style="width: 180px;" v-model="query.cas" clearable></el-input>
            <el-input placeholder="请输入批次号  " size="mini" style="width: 180px;" v-model="query.batchno" clearable></el-input>
            <el-input placeholder="请输入合同号" size="mini" style="width: 180px;" v-model="query.contract_no" clearable></el-input>
            <el-select size="mini" v-model="query.type" clearable>
                <el-option
                        v-for="item in enums.types"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-select size="mini" v-model="query.return_type" clearable>
                <el-option
                        v-for="item in enums.return_types"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-select size="mini" v-model="query.status" clearable>
                <el-option
                        v-for="item in enums.statuses"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-select size="mini" v-model="query.return_status" clearable>
                <el-option
                        v-for="item in enums.return_statuses"
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
                    style="width: 100%;font-size: 12px;">
                <el-table-column
                        prop="id"
                        label="ID"
                        width="50">
                </el-table-column>
                <el-table-column label="类型"  width="80px">
                    <template slot-scope="scope">
                        {{getEnumValue(enums.types,scope.row.type)}}-{{getEnumValue(enums.return_types,scope.row.return_type)}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="仓库"
                        >
                    <template slot-scope="scope">{{attr(scope.row,'.warehouse.name')}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="contract_no"
                        label="合同号"
                >
                </el-table-column>
                <el-table-column
                        prop="cas"
                        label="CAS"
                        >
                </el-table-column>
                <el-table-column
                        prop="batchno"
                        label="批次"
                        >
                </el-table-column>
                <el-table-column
                        label="库位"
                        width="80"
                        >
                    <template slot-scope="scope">{{scope.row.returnshelvesStr}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="退货数量"  width="90px">
                      >
                    <template slot-scope="scope">
                      {{scope.row.quantity}}{{getEnumValue(enums.units,scope.row.quantity_unit_id)}}<br>
                      <span v-if="scope.row.package">
                        ({{scope.row.package_nums}}*{{scope.row.package.packsize}}{{getEnumValue(enums.units,scope.row.package.unit_id)}})
                      </span>
                    </template>

                </el-table-column>
                <el-table-column
                        label="金额" width="100px">
                        >
                    <template slot-scope="scope">{{scope.row.money}}{{getEnumValue(enums.Currency,scope.row.currency_id,'icon')}}
                    </template>
                </el-table-column>
                <el-table-column label="申请时间" width="90px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.created_at" placement="top-start">
                            <span>{{scope.row.created_at?scope.row.created_at.substring(0,10):''}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="审核时间"  width="90px">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" :content="scope.row.audited_at" placement="top-start">
                            <span>{{scope.row.audited_at?scope.row.audited_at.substring(0,10):''}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="发货状态"  width="90px">
                >
                    <template slot-scope="scope">{{getEnumValue(enums.delivery_statuses,scope.row.delivery_status)}}</template>
                </el-table-column>

                <el-table-column
                        label="操作状态"  width="70px">
                    >
                    <template slot-scope="scope">{{getEnumValue(enums.return_statuses,scope.row.return_status)}}</template>
                </el-table-column>

                <el-table-column
                        label="状态"  width="60px">
                >
                    <template slot-scope="scope">{{getEnumValue(enums.statuses,scope.row.status)}}</template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope" v-if="scope.row.return_status===1&&scope.row.status===2">
                        <el-button v-if="scope.row.type===1&&scope.row.return_type===1" @click="handleClick(scope.row)" type="text" size="small">销售退货入库</el-button>
                        <el-button v-else-if="scope.row.type===2&&scope.row.return_type===1" @click="handleClick(scope.row)" type="text" size="small">采购退货出库</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev,pager,next"
                :page-size="tableData.per_page"
                :total="tableData.total"
        ></el-pagination>

        <el-dialog title="销售退货入库" :visible.sync="SalesFormShowFlag" width="70%" >
            <salesForm :row="row" @success="success($event)" :time="time"></salesForm>
        </el-dialog>

        <el-dialog title="采购退货出库" :visible.sync="PurchaseFormShowFlag" width="70%" >
            <purchaseForm  :row="row" @success="success($event)" :time="time"></purchaseForm>
        </el-dialog>
    </d2-container>
</template>
<script>
import { returnsIndex } from '@/api/returns'
import salesForm from './sales_form'
import purchaseForm from './purchase_form'
export default {
  name: 'returnsIndex',
  components: {
    salesForm,
    purchaseForm
  },
  data () {
    return {
      row: [],
      SalesFormShowFlag: false,
      PurchaseFormShowFlag: false,
      enums: [],
      currentPage: 1,
      address: '',
      tableData: [],
      query: {
        page: 1,
        cas: '',
        'contract_no': '',
        type: '',
        return_type: 1,
        status: 2,
        return_status: 1,
        batchno:''
      },
      time: '',
      loading_search: false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      returnsIndex(this.query).then(res => {
        if (this.loading_search) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.loading_search = false
        }
        this.tableData = res.data
        this.enums = res.enum
      })
    },
    success () {
      this.SalesFormShowFlag = false
      this.PurchaseFormShowFlag = false
      this.fetchData()
    },
    handleCurrentChange (pageCurrent) {
      this.query.page = this.currentPage = pageCurrent
      this.fetchData()
    },
    Search () {
      this.loading_search = true
      this.query.page = 1
      this.currentPage = 1
      this.fetchData()
    },
    handleClick (row) {
      this.time = new Date().getTime()
      if (row.type === 1) {
        this.SalesFormShowFlag = true
      } else {
        this.PurchaseFormShowFlag = true
      }
      this.row = row
    }
  }
}
</script>
