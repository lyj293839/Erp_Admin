<template>
    <d2-container>
        <div>
            <el-row>
                <el-col :span="24" style="text-align: right;">
                    <SelectTree2
                        :value="queryList.only_id"
                        :options="search_list"
                        @getValue="getValue($event)"
                        style="width:300px;"
                    />
                    <el-select
                            size="mini"
                            v-model="queryList.user_id"
                            filterable
                            placeholder="选择人员"
                            style="width:130px;margin:0px 5px;"
                            clearable
                    >
                        <el-option v-for="item in UsersList"  :label="item.name" :value="item.id" :key='item.id'></el-option>
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
        <el-table :data="list.data" @selection-change="handleSelectionChange" border fit highlight-current-row class="d2-mt-10">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" label="ID" width="70">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='公司'>
                <template slot-scope="scope">
                    <div>{{getEnumValue(search_list,scope.row.member_id)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label='部门'>
                <template slot-scope="scope">
                    <div>{{scope.row.department?scope.row.department.name:''}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="人员">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="分配数量">
                <template slot-scope="scope">
                    {{scope.row.inquiry_allocation_quantity}}
                </template>
            </el-table-column>
            <el-table-column align="center" width="100">
                <template slot="header">
                    <el-button  
                        type="primary"  
                        size="mini"
                        v-if="permission_names['inquiry_set.assigned_quantity']=='inquiry_set.assigned_quantity'"
                        @click="check_all()">多人分配</el-button>
                </template>
                <template slot-scope="scope">
                    <el-button  
                        type="primary"  
                        size="mini"
                        v-if="permission_names['inquiry_set.assigned_quantity']=='inquiry_set.assigned_quantity'"
                        @click="check(scope.row)">分配</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="询单数量分配" :visible.sync="dialogDue" class="form" width="40%">
            <el-form label-width="100px" label-position="right">
                <el-form-item label="选择的人员:">
                    <el-row>
                        <el-col style="border:1px solid #EBEEF5;text-align:center;margin:5px;" :span="7" v-for="(i,index) in user_ids_list" :key='index'>{{i.name}}</el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="分配数量:">
                    <el-input size="small" clearable v-model="due_data.inquiry_allocation_quantity"></el-input>
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
                layout="sizes,prev, pager, next"
                :page-size="list.per_page"
                :page-sizes="[10,20,50,100,200]"
                @size-change="handleSizeChange"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>
<script>
import { assigned_quantity_list, assigned_quantity } from '@/api/Inquery'
import {company_lists_NoPermission} from "@/api/organize";
import SelectTree2 from "@/components/selectTree/selectTree2"
export default {
  name: 'Inquery-assigned_quantity',
  components: {
        'SelectTree2': SelectTree2,
    },
  data () {
    return {
      currentPage: 1,
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      queryList: {
        page: '1',
        only_id:'',
        member_id:'',
        department_id:'',
        user_id:''
      },
      list: {},
      search_list:[],
      multipleSelection:[],
      user_ids_list:[],
      due_data:{
        inquiry_allocation_quantity:'',
        user_ids:[]
      },
      user_type:[],
      UsersList:[],
      ACompany:{},
      dialogDue:false,
      loading_save_due: false,
      loading_search:false
    }
  },
  watch: {
    $route (to, from) {
        if(to.name=='Inquery-assigned_quantity'){
        }
    }
  },
  created () {
    company_lists_NoPermission().then(res => {
        this.search_list = res.data.companies;
        this.fetchData()
    })
  },
  methods: {
    fetchData () {
      assigned_quantity_list(this.queryList).then(res => {
        if (this.loading_search) {
            this.$message({
                message: res.msg,
                type: "success"
            });
            this.loading_search = false;
        }
          this.list = res.data
          this.list.per_page = parseInt(res.data.per_page)
          this.user_type = res.user_type
          this.UsersList = this.GEnums.Users
          this.ACompany = this.GEnums.ACompany
      }).catch(rr => {this.loading_search = false;})
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    getValue(event) {
        if(JSON.stringify(event).indexOf("_")>-1){
            this.queryList.member_id = event.split('_')[0]
            this.queryList.department_id = event.split('_')[1]
        }else{
            this.queryList.member_id = event
            this.queryList.department_id = ''
        }
        this.queryList.only_id = event
    },
    check(item){
        this.user_ids_list = []
        this.user_ids_list.push(item)
        this.due_data={
            inquiry_allocation_quantity:item.inquiry_allocation_quantity?item.inquiry_allocation_quantity:'',
            user_ids:[]
        }
        this.dialogDue = true
    },
    check_all(){
        this.user_ids_list = []
        if(this.multipleSelection.length>0){
            this.due_data={
                inquiry_allocation_quantity:'',
                user_ids:[]
            }
            this.user_ids_list = this.multipleSelection
            this.dialogDue = true
        }else{
            this.$message({
                    message: '请选择需要分配的人员',
                    type: 'error'
                })
        }
    },
    save_due(){
        this.due_data.user_ids = []
        this.user_ids_list.forEach(i=>{
            this.due_data.user_ids.push(i.id)
        })
        this.loading_save_due = true
        assigned_quantity(this.due_data).then(res=>{
            if (res && res.code == 0) {
                this.$message({
                    message: 'success',
                    type: 'success'
                })
                this.fetchData()
                this.loading_save_due = false
                this.dialogDue = false
                } else {
                this.$message({
                    message: res.msg,
                    type: 'error'
                })
                this.loading_save_due = false
            }
        }).catch(rr => {
            this.loading_save_due = false
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
    },
    handleSizeChange(val) {
        this.queryList.per_page = val;
        this.fetchData();
    },
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
