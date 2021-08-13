<template>
  <d2-container>
    <div>
      <el-row :gutter="5" type="flex" align="middle" justify="end">
        <el-col :span="22" class="d2-text-right">
          <el-date-picker
                  class="date_picker d2-ml-5"
                  v-model="queryList.start"
                  value-format="yyyy-MM-dd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="发送开始日期"
                  size="mini"
                  style="width: 140px;"
          ></el-date-picker>
          <el-date-picker
                  class="date_picker d2-ml-5"
                  v-model="queryList.end"
                  value-format="yyyy-MM-dd"
                  format="yyyyMMdd"
                  type="date"
                  placeholder="发送结束日期"
                  size="mini"
                  style="width: 140px;"
          ></el-date-picker>
          <el-select placeholder="是否确认" size="mini"  class="d2-ml-5" clearable v-model="queryList.confirmed_status" style="width: 100px;">
            <el-option
                    v-for="item in enums.confirmed_statuses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            ></el-option>
          </el-select>
          <el-button
                  class="d2-ml-5"
                  size="mini"
                  type="primary"
                  @click="search"
          >{{$t('search')}}
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
      <el-table-column label='ID' width="80px">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label='发送人'  width="160px">
        <template slot-scope="scope">
          {{scope.row.from_name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='接收人'  width="80px">
        <template slot-scope="scope">
          {{scope.row.to_name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='发送时间'  width="165px">
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='主题' >
        <template slot-scope="scope">
          <div v-html="scope.row.title"></div>
        </template>
      </el-table-column>
      <el-table-column align="center" label='内容'>
        <template slot-scope="scope">
          <div v-html="scope.row.description"></div>
        </template>
      </el-table-column>
      <el-table-column align="center" label='查看时间' width="165px">
        <template slot-scope="scope">
          <div v-html="scope.row.readed_at"></div>
        </template>
      </el-table-column>
      <el-table-column align="center" label='是否确认'>
        <template slot-scope="scope">
          {{getEnumValue(enums.confirmed_statuses,scope.row.confirmed_status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='操作' width="190" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-checkbox v-model="checked_all" @change="select_all"></el-checkbox>
          <el-button  type="primary" class="d2-ml-5"  size="mini" @click="AllRead()" >标记已读</el-button>
        </template>
        <template slot-scope="scope">
          <el-checkbox
                  v-model="scope.row.checked"
                  @change="select_one(scope.row.checked,scope.row.id)"
                  style="margin-right:5px;"
          ></el-checkbox>
          <span class="d2-mr-5">{{scope.row.readed_at?'已读':'未读'}}</span>
            <el-button v-if="scope.row.url" type="primary"  size="mini" @click="go(scope.row)">查看</el-button>
            <el-button v-if="scope.row.confirmed_status==1" type="primary"   size="mini" @click="confirmed(scope.row)">确认</el-button>
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
import { latest, read,reads, messages,confirm} from '@/api/email_manage'
export default {
  name: 'Set-notice',
  data () {
    return {
      currentPage: 1,
      queryList: {
        page: '1',
        start: '',
        end: '',
        confirmed_status:''
      },
      ids:[],
      list: [],
      enums:{},
      checked_all:false,

    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      messages(this.queryList).then(res => {
        res.data.data.forEach((items,index)=>{
            items.checked=false
        })
        this.list = res.data
        this.enums=res.enum
      })
    },
      AllRead(){
        let obj={
            ids:this.ids
        }
        reads(obj).then(res=>{
            if(res.code==0){
                this.fetchData()
                this.checked_all=false
                this.$message({
                    message: res.msg,
                    type: 'success'
                });
            }else{
                this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        })
      },
      select_all() {
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
    go (obj) {
      read(obj.id)
      obj.params.flag=true
      this.$router.push({
        path: obj.url,
        query: obj.params
      })
    },
    confirmed(obj){
        confirm(obj.id).then(res=>{
            if(res.code==0){
                this.$message({
                    message: res.msg,
                    type: 'success'
                })
                this.fetchData()
            }else{
                this.$message({
                    message: res.msg,
                    type: 'error'
                })
            }
        })
    },
    search () {
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
      font-size: 14px;
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
