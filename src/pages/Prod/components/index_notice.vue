<template>
    <div>
        <div style="margin: 10px 0px;">
                <div class="heard">
                    <el-date-picker
                            size="mini"
                            type="date"
                            placeholder="推迟提醒时间"
                            v-model="queryList.stock_notice_delay_at"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            style="width: 140px;"
                    ></el-date-picker>
                    <el-input
                            v-model="queryList.query"
                            style="width: 140px;margin: 0 5px;"
                            size="mini"
                            clearable
                            placeholder="CAS/MDL/Name"
                    ></el-input>
                    
                    <div class="aa">
                      <el-input
                              v-model="queryList.stock_noticed_percent"
                              style="width: 150px;margin: 0 0px;"
                              size="mini"
                              clearable
                      >
                        <el-select v-model="queryList.stock_noticed_percent_op" clearable slot="prepend" size="mini" style="width: 50px;" placeholder>
                            <el-option
                                    v-for="i in quality_indexs"
                                    :key="i.name"
                                    :label="i.name"
                                    :value="i.name">
                            </el-option>
                        </el-select>
                      </el-input>
                      <el-select v-model="queryList.stock_notice_delay_note" clearable size="mini" style="width: 120px;margin: 0 5px;" placeholder='推迟提醒备注'>
                        <el-option
                                v-for="i in stock_notice_delay_note"
                                :key="i"
                                :label="i"
                                :value="i">
                        </el-option>
                    </el-select>
                    </div>
                    <el-button type="primary" size="mini" :loading="loading_search" @click="search">{{$t('search')}}</el-button>
                    <el-button class="d2-mr-5" type="primary" size="mini" :loading="prod_export_loading" @click="prod_export()" v-if="permission_names['prod.export_instore_notice']=='prod.export_instore_notice'">导出</el-button>
                    <a hidden="hidden" :href="prod_export_url" ref="prod_export_url" >产品文件</a>
                </div>
        </div>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row
                  size="small" style="z-index: 99">
            <el-table-column width="80" align="center" label='ID'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='名称' width='200'>
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span><br>
                    <span>{{scope.row.name_cn}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='CAS' width='140'>
                <template slot-scope="scope">
                    {{scope.row.cas}}
                </template>
            </el-table-column>
            
            <el-table-column align="center" label='现有库存' width='140'>
                <template slot-scope="scope">
                    {{scope.row.stock}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='警戒值' width='140'>
                <template slot-scope="scope">
                    {{scope.row.notice_size}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='90天内待入库' width='140'>
                <template slot-scope="scope">
                    {{scope.row.stock_futrue}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='负责人' width="70">
                <template slot-scope="scope">
                    <span>{{getEnumValue(Users,scope.row.purchase_charge1)}}</span><br>
                    <span>{{getEnumValue(Users,scope.row.purchase_charge2)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='时间' width='95'>
                <template slot-scope="scope">
                    <span>{{(scope.row.stock_notice_delay_at)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='备注' min-width='140'>
                <template slot-scope="scope">
                    <span>{{scope.row.stock_notice_delay_note}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250" fixed="right">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permissions.indexOf(133)>-1"
                                @click="edit(scope.row.id,scope.row.prod_id,'edit')">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permission_names['kucun_jingjie_create_inquiry']=='kucun_jingjie_create_inquiry'"
                                @click="inquery(scope.row)">新建询单
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permission_names['prod.delayNotice']=='prod.delayNotice'"
                                @click="Stock_notice(scope.row.id)">推迟提醒
                        </el-button>
                    </template>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新建询单 -->
        <el-dialog title="新建询单" :visible.sync="dialogInquery" width="30%">
            <el-form label-width="60px" label-position="left">
                <el-form-item label="数量：">
                    <el-input size="mini" v-model="inqueryForm.quantity" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button
                        size="mini"
                        type="primary"
                        :loading='inquery_loading'
                        @click="save_inquery()"
                >{{$t('save')}}</el-button>
                <el-button size="mini" @click="dialogNotice = false">{{$t('cancel')}}</el-button>
            </div>
        </el-dialog>

        <!-- 推迟提醒 -->
        <el-dialog title="推迟提醒" :visible.sync="dialogNotice" width="30%">
            <el-form label-width="120px" label-position="left">
                <el-form-item label="时间:">
                    <el-date-picker
                            size="mini"
                            type="date"
                            v-model="noticeList.stock_notice_delay_at"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            style="width: 140px;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注:">
                    <el-input size="mini" type="textarea" v-model="noticeList.stock_notice_delay_note" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align:right;">
                <el-button
                        size="mini"
                        type="primary"
                        :loading='notice_loading'
                        @click="save_stock_notice()"
                >{{$t('save')}}</el-button>
                <el-button size="mini" @click="dialogNotice = false">{{$t('cancel')}}</el-button>
            </div>
        </el-dialog>

        <el-pagination
                class="d2-m"
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
  create,
  edit,
  form_edit,
  update,
  destroy,
  country_list,
  city_list,
  member_company,
  getUserByType,
  chemprod_exportSpec,
  chemprod_export,
  export_instore_notice,
  delayNotice,
  doCreateFromInstock
} from '@/api/prod'
import $ from 'jquery'
import axios from 'axios'
import { beforeSearch } from '../../../utils'
export default {
  name: 'Prod-index_notice',
  data () {
    return {
      permissions: JSON.parse(localStorage.getItem('permissions')),
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      value7: '',
      dialogAdd: false,
      dialogNotice:false,
      dialogInquery:false,
      notice_loading:false,
      prod_export_loading: false,
      inquery_loading:false,
      prod_export_url: '',
      member_id: '',
      currentPage: 1,
      queryList: {
        page: '1',
        per_page: '10',
        query: '',
        stock_noticed_percent:'',
        stock_noticed_percent_op:'',
        stock_notice_delay_at:'',
        stock_notice_delay_note:''
      },
      list: [],
      noticeList:{},
      inqueryForm:{},
      Users:[],
      stock_notice_delay_note:[],
      loading_search: false,
      quality_indexs: [
        {
          name: ""
        },
        {
          name: "≥"
        },
        {
          name: "≤"
        },{
          name: "="
        }
      ],
      now: new Date().getTime()
    }
  },
  props: ['cas'],
  watch: {
    $route (to, from) {
      if (to.name === 'Prod-index_notice') {
        if(this.$route.query.url){
          if (this.cas) {
            this.queryList.query = this.cas
          }
          this.queryList.query = this.$route.query.query?this.$route.query.query:''
          this.queryList.stock_noticed_percent = this.$route.query.stock_noticed_percent?this.$route.query.stock_noticed_percent:''
          this.queryList.stock_noticed_percent_op = this.$route.query.stock_noticed_percent_op?this.$route.query.stock_noticed_percent_op:''
          this.queryList.stock_notice_delay_at = this.$route.query.stock_notice_delay_at?this.$route.query.stock_notice_delay_at:''
          this.queryList.stock_notice_delay_note = this.$route.query.stock_notice_delay_note?this.$route.query.stock_notice_delay_note:''
          this.fetchData()
        }
      }
    }
  },
  created () {
  if (this.cas) {
      this.queryList.query = this.cas
  }
  this.queryList.query = this.$route.query.query?this.$route.query.query:''
  this.queryList.stock_noticed_percent = this.$route.query.stock_noticed_percent?this.$route.query.stock_noticed_percent:''
  this.queryList.stock_noticed_percent_op = this.$route.query.stock_noticed_percent_op?this.$route.query.stock_noticed_percent_op:''
  this.queryList.stock_notice_delay_at = this.$route.query.stock_notice_delay_at?this.$route.query.stock_notice_delay_at:''
  this.queryList.stock_notice_delay_note = this.$route.query.stock_notice_delay_note?this.$route.query.stock_notice_delay_note:''
  this.fetchData()
  },
  methods: {
    fetchData() {
      if(!this.queryList.stock_noticed_percent_op){
        delete this.queryList.stock_noticed_percent_op
      }
      lists(this.queryList, 'prod').then(res => {
        if (res && res.code === 0) {
          this.$route.query.url = false
          if (this.loading_search) {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.loading_search = false
          }
          this.list = res.data
          this.Unit = this.GEnums.Unit
          this.stock_notice_delay_note = res.enum.stock_notice_delay_note
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
      this.Users = this.GEnums.Users
    },
    show_img (now) {
      this.now = new Date().getTime()
    },
    enter (id) {
      $('#' + id).show()
    },
    leave (id) {
      $('#' + id).hide()
    },
    inquery(item){
      this.inqueryForm = {
        quantity:'',
        cas:item.cas,
        id:item.id
      }
      this.dialogInquery = true
    },
    save_inquery(){
      this.inquery_loading = true
      doCreateFromInstock(this.inqueryForm).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.inquery_loading = false
          this.dialogInquery = false
          this.fetchData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.inquery_loading = false
        }
      }).catch(rr => {this.inquery_loading = false})
    },
    stock (cas) {
      this.$router.push({
        path: '/Warehouse/inventory',
        name: 'Warehouse-inventory',
        query: {
          cas: cas
        }
      })
    },
    edit (id, prod_id, type) {
      this.$router.push({
        path: '/Prod/components',
        name: 'Prod-Add2',
        query: {
          id: id
        }
      })
    },
    Stock_notice(id){
        this.noticeList = {
            id:id,
            stock_notice_delay_note:'',
            stock_notice_delay_at:''
        }
        this.noticeList.stock_notice_delay_at = init()
        this.dialogNotice = true
    },
    save_stock_notice(){
        this.notice_loading = true
        delayNotice(this.noticeList,this)
    },
    search () {
      beforeSearch(this)
      this.queryList.page = 1
      this.currentPage = 1
      this.fetchData()
    },
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    },
    prod_export () {
      var queryList = {
        query: '',
        stock_noticed_percent:'',
        stock_noticed_percent_op:'',
        stock_notice_delay_at:'',
        stock_notice_delay_note:''
      }
      queryList.stock_notice_delay_at = this.queryList.stock_notice_delay_at
      queryList.stock_noticed_percent_op = this.queryList.stock_noticed_percent_op
      queryList.stock_noticed_percent = this.queryList.stock_noticed_percent
      queryList.stock_notice_delay_note = this.queryList.stock_notice_delay_note
      queryList.query = this.queryList.query
      this.prod_export_loading = true
      export_instore_notice(queryList).then(res => {
        if (res && res.code === 0) {
          this.prod_export_url = res.data
          this.prod_export_loading = false
          setTimeout(() => {
            this.$refs.prod_export_url.click()
          }, 500)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.prod_export_loading = false
        }
      }).catch(rr => {
        this.prod_export_loading = false
      })
    },
    delete_prod (item, index) {
      destroy(item, 'chemprod', 'destroy', this, index)
    }
  }
}
function init() {
  var date = new Date();
  var lastDay  = date.getTime()+ 60 * 60 * 1000 * 24 * 30;
  let lastTime = new Date(lastDay)

  //年
  var year = lastTime.getFullYear();
  //月
  var month = lastTime.getMonth() + 1;
  //日
  var day = lastTime.getDate();
  month = month < 10 ? "0" + month : month; //如果小于10即显示为09月
  day = day < 10 ? "0" + day : day; //如果小于10即显示为09日
  return year+'-' + month+'-' + day;
}
</script>
<style lang="scss" scoped type="text/scss">
    .el-progress-circle{
        height: 32px;
        width: 32px;
    }
    .el-progress__text{
        font-size:10px;
    }
    .img{
      display: flex;
      justify-content: center;
      align-items: center;
    }
    /deep/ .el-table td, .el-table th{
        padding: 0 0!important;
    }
    /deep/.heard{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .aa{
        .el-input__inner{
          padding: 0px 10px;
        }
      }
    }
    .danger{
        margin-left: 10px;
        font-size: 12px;
    }
</style>
