<template>
    <d2-container>
        <div>
            <el-row :gutter="5" type="flex" align="middle" justify="end" style="margin: 10px 0">
                <el-col :span="24" class="d2-text-right">
                    <el-date-picker
                            v-model="queryList.downloaded_start_at"
                            value-format="yyyyMMdd"
                            format="yyyy-MM-dd"
                            type="date"
                            style="width:140px;margin: 0 5px;"
                            placeholder="下载开始时间"
                            size="mini"
                    ></el-date-picker>
                    <el-date-picker
                            v-model="queryList.downloaded_end_at"
                            value-format="yyyyMMdd"
                            format="yyyy-MM-dd"
                            type="date"
                            style="width:140px;margin: 0 5px;"
                            placeholder="下载结束时间"
                            size="mini"
                    ></el-date-picker>
                    <el-date-picker
                            v-model="queryList.date"
                            value-format="yyyyMMdd"
                            format="yyyy-MM-dd"
                            type="date"
                            style="width:130px;margin: 0 5px;"
                            placeholder="货代时间"
                            size="mini"
                    ></el-date-picker>
                    <el-input size="mini" style="width: 150px;" v-model="queryList.cas"
                              placeholder="cas" clearable></el-input>
                    <el-select v-model="queryList.status" class="d2-ml-5" style="width: 90px;" size="mini" clearable
                               filterable
                               placeholder="状态">
                        <el-option
                                v-for="(i,index) in Status"
                                :key="index"
                                :label="i"
                                :value="index">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.sale_id" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               placeholder="销售人员">
                        <el-option
                                v-for="(i,index) in sale_charges"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.purchase_id" class="d2-ml-5" style="width: 110px;" size="mini" clearable
                               filterable
                               placeholder="采购人员">
                        <el-option
                                v-for="(i,index) in purchase_charge"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.downloaded" class="d2-ml-5" style="width: 100px;" size="mini" clearable
                               filterable
                               placeholder="是否下载">
                        <el-option
                                v-for="(i,index) in Downloaded"
                                :key="index"
                                :label="i"
                                :value="index">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.is_danger" class="d2-ml-5" style="width: 100px;" size="mini" clearable
                               filterable
                               placeholder="是否危险品">
                        <el-option
                                v-for="(i,index) in danger"
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
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading='loading_download'
                            v-if="permission_names['ffmsds.download']=='ffmsds.download'"
                            @click="download_ffmsds()"
                    >下载
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" style="font-size: 12px" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column width="60" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="checked_all" @change="select_all()"></el-checkbox>
                </template>
                <template slot-scope="scope">
                        <el-checkbox
                                v-model="scope.row.checked"
                                @change="select_one(scope.row.checked,scope.row.id)"
                        ></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='ID' width='60'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label='时间' width='160'>
                <template slot-scope="scope">
                    {{scope.row.date}}
                </template>
            </el-table-column>
            <el-table-column label='CAS' width='200'>
                <template slot-scope="scope">
                   <span @click='cas_click(scope.row)' style="cursor: pointer;">{{scope.row.cas}}</span>
                    <span class="red" v-if="attr(scope.row,'prodproperty.uncode')&&attr(scope.row,'prodproperty.uncode').indexOf('UN')>-1">(危险品)</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='销售'>
                <template slot-scope="scope">
                   {{getEnumValue(sale_charges,scope.row.sod_userid)}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='采购'>
                <template slot-scope="scope">
                    {{getEnumValue(purchase_charge,scope.row.pod_userid)}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='状态'>
                <template slot-scope="scope">
                    <span v-for="(i,index) in Status">
                        <span v-if="index==scope.row.status" :style="scope.row.status==2?'color:green;':''">{{i}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='是否下载'>
                <template slot-scope="scope">
                    <span v-for="(i,index) in Downloaded">
                        <span v-if="index==scope.row.downloaded" :style="scope.row.downloaded==2?'color:green;':''">{{i}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='下载日期'>
                <template slot-scope="scope">
                    {{scope.row.downloaded_at}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.note}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作'>
                <template slot="header">
                    <span>操作</span>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            @click="checkMore()"
                    >批量通过
                    </el-button>
                </template>
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.status===2"
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            @click="check(scope.row.id)"
                    >通过
                    </el-button>
                    <el-button
                            v-if="scope.row.status===2"
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            style="margin-top:5px;"
                            @click="reject_check(scope.row.id)"
                    >驳回
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes,prev, pager, next"
                :page-sizes="[15,30,50,100]"
                :page-size="list.per_page"
                @size-change="handleSizeChange"
                :total="list.total"
        ></el-pagination>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-input size="mini"  v-model="note"
                      placeholder="note" clearable></el-input>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </span>
        </el-dialog>
    </d2-container>
</template>

<script>
import { ffmsds_index,ffmsds_download,msds_check,msds_reject,msds_check_more } from "@/api/prod";
import { customer_lists,credit_note_list,credit_note_invoicing_view } from '@/api/sale'
import { parseTime, getEnumValue,forceFileDownload } from '@/utils/index'
import axios from 'axios'
export default {
  name: 'Prod-forwarder',
  data () {
    return {
      getEnumValue: getEnumValue,
      forceFileDownload:forceFileDownload,
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      currentPage: 1,
      queryList: {
        page: '1',
        per_page:'',
        date: '',
        sale_id: '',
        purchase_id: '',
        cas: '',
        status:'',
        is_danger:'',
        downloaded:'',
        downloaded_start_at:'',
        downloaded_end_at:''
      },
      list: [],
      ids:[],
      sale_charges:[],
      purchase_charge:[],
      Users:[],
      Status:[],
      Downloaded:[],
      danger:[{id:1,name:'是'},{id:2,name:'否'}],
      checked_all:false,
      loading: false,
      loading_download:false,
      loading_search: false,
      dialogVisible:false,
      note:'',
      reject_id:''
    }
  },
    watch: {
        $route(to, from) {
            if (to.name=='Prod-forwarder') {
                this.fetchData();
            }
        }
    },
  created () {
    this.queryList.date = init()
    this.fetchData()
  },
  methods: {
    fetchData () {
      ffmsds_index(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.loading_search = false
        }
        res.data.data.forEach((items, index) => {
            items.checked = false;
        });
        this.checked_all = false
        this.list = res.data
        this.Status = res.enum.status
        this.Downloaded = res.enum.downloaded
        this.purchase_charge = this.GEnums.Purchases
        this.sale_charges = this.GEnums.Sales
        this.Users = this.GEnums.Users
      })
    },
      check(id){
        let obj={
            ids:id
        }
        msds_check(obj).then(res=>{
          if(res.code==0){
              this.$message({
                  message: 'success',
                  type: 'success'
              });
              this.fetchData();
          }
        })
      },
      checkMore(){
        let obj={
            ids:this.ids
        }
       msds_check_more(obj).then(res=>{
           if(res.code==0){
               this.$message({
                   message: 'success',
                   type: 'success'
               });
               this.fetchData();
           }
       })
      },
      reject_check(id){
        this.reject_id=id
        this.note=''
        this.dialogVisible=true
      },
      save(){
          let obj={
              ids:this.reject_id,
              note:this.note
          }
          msds_reject(obj).then(res=>{
              if(res.code==0){
                  this.$message({
                      message: 'success',
                      type: 'success'
                  });
                  this.dialogVisible=false
                  this.fetchData();
              }
          })
      },
    select_all(){
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
    cas_click(item){
        this.$router.push({
            path: "../index/index.vue",
            name: "Prod-index",
            query: {
                cas: item.cas
            }
      })
    },
    download_ffmsds(){
        var obj = {
            id:this.ids
        }
        this.loading_download = true
        ffmsds_download(obj).then(res => {
            if (res && res.code === 0) {
                let fileNames = res.data.split("/");
                let fileName = fileNames[fileNames.length - 1];
                axios({
                    method: "get",
                    withCredentials: false,
                    url: res.data,
                    responseType: "arraybuffer"
                })
                    .then(response => {
                        this.forceFileDownload(response.data, fileName);
                        this.loading_download = false
                    })
                    .catch(() => 
                        this.$message({
                            message: "error occured",
                            type: 'error'
                        }),
                        this.loading_download = false
                    );
            }
        }).catch(rr => {
            this.loading_download = false
        })
    },
    search () {
        this.loading_search = true
        this.queryList.page = 1;
        this.currentPage=1
        this.fetchData()
    },
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    },
      handleSizeChange(val) {
          this.queryList.per_page = val;
          this.fetchData();
      },
  }
}
function init() {
  var date = new Date();
  //年
  var year = date.getFullYear();
  //月
  var month = date.getMonth() + 1;
  //日
  var day = date.getDate();
  month = month < 10 ? "0" + month : month; //如果小于10即显示为09月
  day = day < 10 ? "0" + day : day; //如果小于10即显示为09日

  return year.toString() + month.toString() + day.toString();
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
    /deep/.item .el-button{
        padding: 5px 0px;
    }
</style>
