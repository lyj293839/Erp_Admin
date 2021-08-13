<template>
    <d2-container>
        <div>
            <el-row  type="flex" justify="end">
                <el-col :span="24" class="d2-text-right">
                    <el-input size="mini" style="width: 180px;" class="d2-ml-5" v-model="queryList.contract_number" clearable
                              placeholder="子合同号"></el-input><!-- 合同号 -->
                    <el-select v-model="queryList.status"  class="d2-ml-5" size="mini" clearable placeholder="审核状态" style="width: 115px;">
                        <el-option
                                v-for="item in due_date_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search"
                            style="margin-top:5px;"
                    >{{$t('search')}}</el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column align="center" label='子合同号' width="120px">
                <template slot-scope="scope">
                    <div>{{scope.row.saler_contract_detail?scope.row.saler_contract_detail.contract_number:''}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请时间" width="135">
                <template slot-scope="scope">
                    {{scope.row.created_at}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="申请人" width="70">
                <template slot-scope="scope">
                    {{scope.row.user?scope.row.user.name:''}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="原收款账期" width="100">
                <template slot-scope="scope">
                    {{scope.row.original_due_date}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改收款账期" width="100">
                <template slot-scope="scope">
                    {{scope.row.due_date}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale59')" min-width="100"><!-- 备注 -->
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale105')" width="90"><!-- 审核状态 -->
                <template slot-scope="scope">
                    {{getEnumValue(due_date_status_info,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale80')" width="70"><!-- 操作 -->
                <template slot-scope="scope">
                    <el-button  type="primary"  
                    size="mini"
                    v-if="scope.row.status==1&&permission_names['due_data_change.verify']=='due_data_change.verify'"
                    @click="check(scope.row)">{{$t('sale.add.sale86')}}</el-button><!-- 审核 -->
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="审核账期" :visible.sync="dialogDue" class="form" width="50%">
            <el-form label-width="100px" label-position="right">
                <el-form-item label="子合同号:">
                    <el-input size="mini" v-model="due_data.contract_number" disabled></el-input>
                </el-form-item>
                <el-form-item label="应收款日期:">
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="due_data.original_due_date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            size="mini"
                            disabled
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="修改收款日期:">
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="due_data.due_date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            size="mini"
                            disabled
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="申请备注:">
                    <el-input size="mini" type="textarea" v-model="due_data.remark" disabled></el-input>
                </el-form-item>
                <el-form-item label="审核:">
                    <el-radio-group v-model="due_data.status">
                        <el-radio :label="2">{{$t('sale.add.sale87')}}</el-radio>
                        <!-- 审合通过 -->
                        <el-radio :label="3">{{$t('sale.add.sale88')}}</el-radio>
                        <!-- 不通过 -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="审核备注:">
                    <el-input size="mini" type="textarea" v-model="due_data.verify_remark"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align:right;margin-top:10px;">
                <el-button type="primary" size="mini" :loading="loading_save_due" @click="save_due()">确定</el-button>
                <el-button size="mini" @click="dialogDue = false">取消</el-button>
            </div>
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
import { due_date_change_verify_list, due_date_change_verify } from '@/api/sale'

export default {
  name: 'sales-due_data_change',
  data () {
    return {
      currentPage: 1,
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      queryList: {
        page: '1',
        contract_number:'',
        status:1
      },
      list: {},
      due_data:{
        saler_contract_detail_id:'',
        contract_number:'',
        due_old_data:'',
        due_date:'',
        remark:'',
        status:2
     },
      due_date_status_info:[],
      dialogDue:false,
      loading_save_due: false,
      loading_search:false
    }
  },
  watch: {
    $route (to, from) {
        if(to.name=='sales-due_data_change'){
            this.fetchData()
        }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      due_date_change_verify_list(this.queryList).then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.list = res.data
        this.due_date_status_info = res.enum.due_date_status_info
      }).catch(rr => {this.loading_search=false})
    },
    check (item) {
        this.due_data = {
            id:item.id,
            contract_number:item.saler_contract_detail.contract_number,
            original_due_date:item.original_due_date,
            due_date:item.due_date,
            remark:item.remark,
            status:2,
            verify_remark:''
        }
      this.dialogDue = true
    },
    save_due(){
        var obj = {
            id:this.due_data.id,
            status:this.due_data.status,
            verify_remark:this.due_data.verify_remark
        }
        this.loading_save_due = true
        due_date_change_verify(obj).then(res => {
            if(res && res.code == 0){
                this.$message({
                    message:res.msg,
                    type:'success'
                })
                this.loading_save_due=false
                this.dialogDue = false
                this.fetchData()
            }else{
                this.$message({
                    message: res.msg,
                    type: 'error'
                })
                this.loading_save_due = false
            }
        }).catch(rr => {
            this.loading_save_due=false
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
