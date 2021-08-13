<template>
    <div>
        <el-row style="margin: 10px 0px;">
            <el-col class="d2-text-right" :span="24">
                <el-input
                        v-model="queryList.query"
                        style="width: 150px;margin: 0 1px;"
                        size="mini"
                        clearable
                        placeholder="CAS/MDL/Name"
                ></el-input>
                <el-date-picker
                          v-model="queryList.created_at_start"
                          value-format="yyyy-MM-dd"
                          type="date"
                          placeholder="开始时间"
                          size="mini"
                          format="yyyy-MM-dd"
                          style="width: 125px;margin:0px 5px;"
                ></el-date-picker>
                <el-date-picker
                        v-model="queryList.created_at_end"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="结束时间"
                        size="mini"
                        format="yyyy-MM-dd"
                        style="width: 125px;"
                ></el-date-picker>
                 <el-select v-model="queryList.status" clearable filterable size="mini" style="width: 120px;margin: 0 5px;" placeholder="状态">
                    <el-option
                            v-for="i in status"
                            :key="i.id"
                            :label="i.name"
                            :value="i.id">
                    </el-option>
                </el-select>
                <el-checkbox v-model="queryList.sci" :true-label="1"  :false-label="0" >是否SCI</el-checkbox>
                <el-button type="primary" size="mini" :loading="loading_search" @click="search" style="margin: 0 5px;">{{$t('search')}}
                </el-button>
            </el-col>
        </el-row>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row
                  size="small" style="z-index: 99">
            <el-table-column width="80" align="center" label='ID'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column width="80" align="center" label='询单ID'>
                <template slot-scope="scope">
                    {{scope.row.inquiry_id}}
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='产品编号'>
                <template slot-scope="scope">
                    {{scope.row.prodno}}
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='CAS'>
                <template slot-scope="scope">
                  <div style='color:#409EFF;cursor:pointer;' @click="cas_click(scope.row.cas)">{{scope.row.cas}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label='中文名称'>
                <template slot-scope="scope">
                    <span>{{scope.row.name_cn}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='英文名称'>
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150" align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.note}}
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='状态'>
                <template slot-scope="scope">
                    {{getEnumValue(status,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="140">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="edit(scope.row.id,scope.row.prod_id)">Review
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permissions.indexOf(622)>-1"
                                @click="ignore_(scope.row.id)">忽略
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :total="list.total">
        </el-pagination>
    </div>
</template>

<script>
import {
  lists,
  destroy,
  form_edit,
  ignore
} from '@/api/prod'
import $ from 'jquery'

export default {
  name: 'Prod-check',
  data () {
    return {
      dialogAdd: false,
      currentPage: 1,
      queryList: {
        page: '1',
        per_page: '10',
        query: '',
        created_at_start:'',
        created_at_end:'',
        sci:0,
        status:2
      },
      list: [],
      status:[],
      permissions: JSON.parse(localStorage.getItem('permissions')),
      loading_search: false
    }
  },
  watch: {
    $route (to, from) {
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (this.$route.query) {
        // this.queryList.query = this.$route.query
      }
      var queryList = JSON.parse(JSON.stringify(this.queryList))
      if(!queryList.sci){
        delete queryList.sci
      }
      lists(queryList, 'prod/verify_list').then(res => {
        if (res && res.code === 0) {
          if (this.loading_search) {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.loading_search = false
          }
          this.list = res.data
          this.status = res.enum.status
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    cas_click(cas){
      this.$router.push({
        path: '/Prod/index/index',
        name: 'Prod-index',
        query: {
          cas:cas
        }
      })
    },
    edit(id,prod_id){
      this.$router.push({
        path: '/Prod/components',
        name: 'Prod-prodCheck',
        query: {
          id: id,
          prod_id:prod_id,
          check:true
        }
      })
    },
    ignore_(id){
      ignore(id,this)
    },
      search(){
        this.loading_search = true
        this.queryList.page = 1
        this.currentPage=1
        this.fetchData()
      },
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    },
  }
}
</script>
