<template>
    <d2-container>
        <div style="text-align:right;margin:10px 0px;">
            <el-input size="mini"
                placeholder="人员名称"
                v-model="queryList.username"
                clearable
                style="width:150px;margin:0px 2px;"
            ></el-input>
            <el-button class="d2-ml-5" size="mini" type="primary"
                :loading="loading_search"
                @click="search()"
            >{{$t('search')}}
            </el-button>
        </div>
        <el-table :data="list.data" border fit highlight-current-row class="d2-mt-10">
            <el-table-column align="center" label="ID" width="100">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="人员">
                <template slot-scope="scope">
                    {{scope.row.username}}
                </template>
            </el-table-column>
            <el-table-column align="center" width="200" label='状态设置'>
                <template slot-scope="scope">
                    <el-switch 
                        v-model="scope.row.xiangmubu_status" 
                        :active-value="1"
                        :inactive-value="0"
                        active-text="启用"
                        inactive-text="禁用"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="set_change(scope.row)"></el-switch>
                </template>
            </el-table-column>
        </el-table>

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
import { userSetting_list, userSetting_update } from '@/api/Inquery'
export default {
  name: 'Inquery-group_settings',
  data () {
    return {
      currentPage: 1,
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      list: {},
      queryList:{
        page:1,
        username:''
      },
      loading_search:false
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      userSetting_list(this.queryList).then(res => {
          if (this.loading_search) {
                this.$message({
                    message: res.msg,
                    type: "success"
                });
                this.loading_search = false;
            }
          this.list = res.datas
          this.list.per_page = parseInt(res.data.per_page)
      }).catch(rr => {this.loading_search = false;})
    },
    handleCurrentChange (page_current) {
      this.queryList.page = this.currentPage = page_current
      this.fetchData()
    },
    handleSizeChange(val) {
        this.queryList.per_page = val;
        this.fetchData();
    },
    search(){
        this.loading_search = true
        this.fetchData();
    },
    set_change(item){
        var obj = {
            id:item.id,
            xiangmubu_status:item.xiangmubu_status
        }
        userSetting_update(obj).then(res=>{
            if (res && res.code == 0){
                this.fetchData()
                this.$message.success(res.msg)
            }
        })
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
