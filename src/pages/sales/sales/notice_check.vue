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
                    <el-select size="mini" v-model="queryList.invoice_type" :placeholder="$t('sale.add.sale25')" style="width: 120px;margin-left:5px;" clearable>
                        <el-option
                            v-for="item in invoice_type"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
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
                                v-for="(i,index) in finance_status_info"
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
                    <el-select v-model="queryList.flag" class="d2-ml-5" style="width: 90px;" size="mini" clearable
                               filterable
                               placeholder="标识"><!--  -->
                        <el-option
                                v-for="(i,index) in flag_info"
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
        <u-table :data='list.data' border use-virtual class="d2-mt-10" @selection-change="handleSelectionChange">
            <el-table-column
            align="center"
            type="selection"
            :selectable='checkboxT'
            width="55">
            </el-table-column>
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
            <el-table-column align="center" :label="$t('sale.add.sale183')" width="70"><!-- 通知时间 -->
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
                    {{getEnumValue(invoice_type,scope.row.invoice_type)}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale182')" width="90"><!-- 发票金额 -->
                <template slot-scope="scope">
                    {{scope.row.total_money}}{{getEnumValue(currencys,scope.row.currency_id)}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale59')" min-width="100"><!-- 备注 -->
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="开票分类" width="80"><!--  -->
                <template slot-scope="scope">
                    <span v-if="scope.row.type==1" style="color:green;">{{getEnumValue(type_info,scope.row.type)}}</span>
                    <span v-else style="color:red;">{{getEnumValue(type_info,scope.row.type)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale240')"  width="70"><!-- 开票状态 -->
                <template slot-scope="scope">
                    <span :style="scope.row.invoice_status==10?'color:red;':''">{{invoice_notice_status[scope.row.invoice_status].name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="是否虚拟开票"  width="80">
                <template slot-scope="scope">
                    <span :style="scope.row.is_virtual==2?'color:red;':''">{{getEnumValue(is_virtual_info,scope.row.is_virtual)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale105')" width="110"><!-- 审核状态 -->
                <template slot-scope="scope">
                    {{getEnumValue(status_info,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column align="center" width="90" fixed="right"><!-- 操作 -->
                <template slot="header">
                    <el-button  type="primary"  size="mini" @click="check_all()">批量审核</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button  type="primary"  size="mini" v-if="scope.row.status==1||scope.row.status==-9" @click="check(scope.row.id)">{{$t('sale.add.sale86')}}</el-button><!-- 审核 -->
                </template>
            </el-table-column>
        </u-table>
        

        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes,prev, pager, next"
                :page-size="list.per_page"
                :page-sizes="[15,20,50,100,200,300,500]"
                @size-change="handleSizeChange"
                :total="list.total"
        ></el-pagination>

        <el-dialog width="40%" :visible.sync="dialog">
            <el-form label-position="right" label-width="80">
                <el-form-item>
                    <table border="1" bordercolor="#E5E5E5" style="width:100%;border-collapse: collapse;margin: 0 auto;">
                        <tr>
                            <td width='50'>ID</td>
                            <td>合同号</td>
                            <td width='80'>{{$t('sale.add.sale25')}}</td>
                            <td width='80'>{{$t('sale.add.sale182')}}</td>
                        </tr>
                        <tr v-for="(item,index) in multipleSelection">
                            <td>{{item.id}}</td>
                            <td>
                                <span v-for="(i,index_i) in item.contract_numbers">
                                    {{i}}
                                    <span v-if="index_i!=(item.contract_numbers.length-1)">,</span>
                                </span>
                            </td>
                            <td>{{getEnumValue(invoice_type,item.invoice_type)}}</td>
                            <td>{{item.total_money}}{{ getEnumValue(currencys,item.currency_id)}}</td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale86')+':'">
                    <el-radio-group v-model="form.status">
                        <el-radio :label="2">{{$t('sale.add.sale87')}}</el-radio>
                        <!-- 审合通过 -->
                        <el-radio :label="3">{{$t('sale.add.sale88')}}</el-radio>
                        <!-- 不通过 -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale89')+':'">
                    <!-- <textarea style="width:100%" v-model="form.remark" cols="100%" rows="4"></textarea> -->
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="form.remark">
                    </el-input>
                </el-form-item>
                <el-form-item class="from-item" style="margin:0px;text-align: center">
                    <el-button type="primary" :loading='loading_check' size="small" @click="save_check()">{{$t('save')}}</el-button>
                    <!-- 保存 -->
                </el-form-item>
            </el-form>
        </el-dialog>
    </d2-container>
</template>
<script>
import { notice_list, customer_lists,batch_notice_verify} from '@/api/sale'

export default {
  name: 'sales-notice_check',
  data () {
    return {
      currentPage: 1,
      queryList: {
        page: '1',
        contract_number: '',
        start_date: '',
        end_date: '',
        customer_name: '',
        invoice_status:'',
        status: 1,
        type:'',
        invoice_type:'',
        flag:1,
        per_page: '',
        billing_party_id:'',
        is_virtual:''
      },
      list: [],
      form:{
        status:2,
        remark:'',
        ids:[],
        },
      multipleSelection:[],
      currencys: [],
      invoice_info: [],
      invoice_notice_status: [],
      invoice_type: [],
      status_info: [],
      finance_status_info:[],
      units: [],
      customer: [],
      type_info:[],
      flag_info:[],
      is_virtual_info:[],
      loading: false,
      loading_check:false,
      dialog:false,
      loading_search:false
    }
  },
  watch: {
    $route (to, from) {
        if(to.name=='sales-notice_check'){
            this.fetchData()
        }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      notice_list(this.queryList).then(res => {
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
        this.list.per_page = parseInt(res.data.per_page)
        this.currencys = res.enum.currencys
        this.invoice_info = res.enum.invoice_info
        this.invoice_notice_status = res.enum.invoice_notice_status
        this.invoice_type = res.enum.invoice_type
        this.status_info = res.enum.status_info
        this.finance_status_info = res.enum.finance_status_info
        this.units = res.enum.units
        this.type_info = res.enum.type_info
        this.flag_info = res.enum.flag_info
        this.is_virtual_info = res.enum.is_virtual_info
      }).catch(rr => {this.loading_search=false})
    },
    handleSelectionChange(val){
        this.multipleSelection = val
    },
    handleSizeChange(val) {
        this.queryList.per_page = val;
        this.fetchData();
    },
    checkboxT(row,index){
        if (row.status == 1||row.status==-9) {
            return true
        }else{
            return false
        }
    },
    check_all(){
        this.form = {
            ids:[],
            status:2,
            remark:''
        }
        if(this.multipleSelection&&this.multipleSelection.length>0){
            this.dialog = true
        }else{
            this.dialog = false
            this.$message({
                message: '请先选择需要审核的开票合同',
                type: 'error'
            })
        }
    },
    save_check(){
        this.form.ids = []
        this.multipleSelection.forEach(res=>{
            this.form.ids.push(res.id)
        })
        this.loading_check = true
        batch_notice_verify(this.form).then(res=>{
            if (res && res.code == 0) {
                this.$message({
                    message: 'success',
                    type: 'success'
                })
                this.loading_check = false
                this.dialog = false
                this.fetchData()
                } else {
                this.$message({
                    message: res.msg,
                    type: 'error'
                })
                this.loading_check = false
            }
        }).catch(rr => {
            this.loading_check = false
        })
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
        path: '/sales/notice_check_detail',
        name: 'sales-notice_check_detail',
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
    .el-col{
        .el-input{margin: 5px 0px;}
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
