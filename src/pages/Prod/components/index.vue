<template>
    <div>
        <div style="margin: 10px 0px;">
                <div class="heard">
                    <el-radio-group v-model="queryList.status" size="mini" style="margin: 0 2px;">
                        <el-radio-button label="">全部</el-radio-button>
                        <el-radio-button label="0">未审</el-radio-button>
                        <el-radio-button label="3">急审</el-radio-button>
                        <el-radio-button label="1">已审</el-radio-button>
                    </el-radio-group>
                    <el-checkbox v-model="queryList.is_advantage" style="margin:0px 2px;">优势</el-checkbox>
                    <el-checkbox v-model="queryList.is_secret" style="margin:0px 2px;">保密</el-checkbox>
                    <el-select v-model="queryList.chemicalcate_id" clearable filterable size="mini" style="width: 95px;margin: 0 2px;" placeholder="产品分类">
                        <el-option
                                v-for="i in GEnums.ChemicalType"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.charge" clearable filterable size="mini" style="width: 105px;margin: 0 2px;" placeholder="采购负责人">
                        <el-option
                                v-for="i in GEnums.Purchases"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.can_saled" clearable filterable size="mini" style="width: 105px;margin: 0 2px;" placeholder="是否经营">
                        <el-option
                                v-for="i in Can_saled"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-date-picker
                            size="mini"
                            type="date"
                            placeholder="开始日期"
                            v-model="queryList.created_at[0]"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            style="width: 115px;"
                    ></el-date-picker>
                    <span style="margin:0px 2px;font-size:10px;">至</span>
                    <el-date-picker
                            size="mini"
                            type="date"
                            placeholder="结束日期"
                            v-model="queryList.created_at[1]"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            style="width: 115px;"
                    ></el-date-picker>
                    <el-input
                            v-model="queryList.query"
                            style="width: 140px;margin: 0 2px;"
                            size="mini"
                            clearable
                            placeholder="CAS/MDL/Name"
                    ></el-input>
                    <!-- <el-select v-model="queryList.stock_noticed_percent_op" clearable filterable size="mini" style="width: 90px;">
                        <el-option
                                v-for="i in quality_indexs"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select> -->
                    <div class="aa">
                      <el-input
                              v-model="queryList.stock_noticed_percent"
                              style="width: 150px;margin: 0 1px;"
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
                    </div>
                    <el-button type="primary" size="mini" class="d2-ml-5" :loading="loading_search" @click="search">{{$t('search')}}</el-button>
                    <el-button type="primary" class="d2-ml-5" size="mini" @click="add">{{$t('add')}}</el-button>
                </div>
                <div style="text-align:right;margin-top:5px;">
                    <el-button type="primary" class="d2-mr-5" size="mini" :loading="prod_exportSpec_loading" @click="exportSpec" v-if="permissions.indexOf(143)>-1">导出规格</el-button>
                   <a hidden="hidden" :href="prod_exportSpec_url"  ref="prod_exportSpec_url" >规格文件</a>
                    <el-button class="d2-mr-5" type="primary" size="mini" :loading="prod_export_loading" @click="prod_export" v-if="permissions.indexOf(132)>-1">导出产品</el-button>
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
            <el-table-column align="center" label='图标' width="110">
                <template slot-scope="scope">
                    <div class="img">
                        <img v-if="scope.row.status==1" src="/image/module/check.png"
                             style="width: 30px;"/>
                        <el-popover
                                placement="right"
                                title=""
                                width="200"
                                trigger="hover"
                        >
                            <div :id="scope.row.id">
                                <img v-if="scope.row.is_smilestranimg==1" :src="scope.row.img+'?time='+now"  v-preview="scope.row.svg+'?time='+now"
                                     style="width: 200px;"/>
                                <img v-else :src="scope.row.img+'?time='+now"
                                     style="width: 200px;"/>
                            </div>
                            <img  slot="reference"  @mouseenter="show_img(now)" src="/image/module/ben.png"
                                  style="width: 32px;margin-top: 10px;">
                        </el-popover>
                      <el-tooltip placement="top">
                        <div slot="content">库存预警:设定{{Number(scope.row.notice_size)}}{{getEnumValue(Unit,scope.row.notice_unit_id)}}的{{Number(scope.row.stock_noticed_percent)}}%</div>
                        <el-button v-if="scope.row.stock_noticed=='1'" type="danger" circle style="width: 32px;height: 32px;padding: 0;">{{Number(scope.row.stock_noticed_percent)}}%</el-button>
                      </el-tooltip>
                    </div>
                    <span v-if="scope.row.is_danger==null" class="danger">(未知)</span>
                    <span v-if="scope.row.is_danger==0" class="danger">(非危)</span>
                        <el-tooltip placement="top"  v-if="scope.row.is_danger==1">
                            <div slot="content">
                                uncode:{{scope.row.property.uncode}},packinggroup:{{scope.row.property.packinggroup}},hazardclass:{{scope.row.property.hazardclass}},EQ:{{scope.row.property.limited_packing}}{{getEnumValue(Unit,scope.row.property.limited_packing_unit_id)}}
                            </div>
                            <span style="color: red;" class="danger">(危险品)</span>
                        </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='产品编号/CAS'>
                <template slot-scope="scope">
                    {{scope.row.prodno}}<br/>{{scope.row.cas}}
                </template>
            </el-table-column>

            <el-table-column width="70" align="center" label='是否经营'>
              <template slot-scope="scope">
                <div v-if="scope.row.can_saled == 1">
                 经营
                </div>
                <div v-else-if="scope.row.can_saled == 2">
                 不经营
                </div>
                <div v-else-if="scope.row.can_saled == 3">
                  待定
                </div>
                <div v-else>
                  审核中
                </div>
              </template>
            </el-table-column>

            <el-table-column width="100" align="center" label='物料编号'>
                <template slot-scope="scope">
                    {{scope.row.itemno}}
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='HS code'>
                <template slot-scope="scope">
                    {{scope.row.hscode}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='中文名称' min-width='180'>
                <template slot-scope="scope">
                    <span>{{scope.row.name_cn}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='英文名称' min-width='180'>
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='负责人' width="70">
                <template slot-scope="scope">
                    <span>{{getEnumValue(Users,scope.row.purchase_charge1)}}</span><br>
                    <span>{{getEnumValue(Users,scope.row.purchase_charge2)}}</span><br>
                    <span>{{getEnumValue(Users,scope.row.purchase_charge3)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='标签' width="70">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_advantage||scope.row.is_secret">
                        <span v-if="scope.row.is_advantage">{{$t('product.list.is_advantage')}}</span><br>
                        <span v-if="scope.row.is_secret">{{$t('product.list.is_secret')}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='分类' width="95">
                <template slot-scope="scope">
                    <span>{{getEnumValue(GEnums.ChemicalType,scope.row.chemicalcate_id)}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='是否囤货' width="95">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.is_inventory"
                            :active-value="1"
                            :inactive-value="0"
                            @change="change_inventory(scope.row.id)"
                            :disabled="permission_names['prod.setInventory']!=='prod.setInventory'"
                            >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="110" fixed="right">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permissions.indexOf(133)>-1"
                                @click="edit(scope.row.id,scope.row.prod_id,'edit')">编辑
                        </el-button> <br> 
                        <el-dropdown trigger="click" v-if="permission_names['prod.canSaled']=='prod.canSaled'" style="margin-top:5px;">
                          <el-button size="mini" type="primary">
                            经营状态<i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item >
                              <div @click="can_saled_click(scope.row.id,3)">待定</div> 
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <div @click="can_saled_click(scope.row.id,1)">经营</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <div @click="can_saled_click(scope.row.id,2)">不经营</div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                              <div @click="can_saled_click(scope.row.id,4)">审核中</div>
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                        <!-- <el-button
                                v-if="scope.row.status!==1"
                                size="mini"
                                type="primary"
                                @click="edit(scope.row.id,scope.row.prod_id,'check')">审核
                        </el-button> -->
<!--                        <el-button-->
<!--                                size="mini"-->
<!--                                type="danger"-->
<!--                                v-if="permissions.indexOf(136)>-1"-->
<!--                                @click="delete_prod(scope.row)">删除-->
<!--                        </el-button>-->
                    </template>
                </template>
            </el-table-column>
        </el-table>

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
  canSaled,
  setInventory
} from '@/api/prod'
import $ from 'jquery'
import axios from 'axios'
import { beforeSearch } from '../../../utils'
export default {
  name: 'Prod-index',
  data () {
    return {
      permissions: JSON.parse(localStorage.getItem('permissions')),
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      value7: '',
      dialogAdd: false,
      prod_export_file: false,
      prod_exportSpec_file: false,
      prod_export_url: '',
      prod_exportSpec_url: '',
      prod_exportSpec_loading: false,
      prod_export_loading: false,
      member_id: '',
      currentPage: 1,
      queryList: {
        is_advantage: false,
        is_secret: false,
        page: '1',
        per_page: '10',
        status: '',
        chemicalcate_id: '',
        charge: '',
        created_at: ['', ''],
        query: '',
        stock_noticed_percent:'',
        stock_noticed_percent_op:'',
        can_saled:''
      },
      list: [],
      Users:[],
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
      Can_saled:[
        {
          id:4,
          name:"审核中"
        },
        {
          id:3,
          name:"待定"
        },
        {
          id:1,
          name:"经营"
        },
        {
          id:2,
          name:"不经营"
        }
      ],
      now: new Date().getTime()
    }
  },
  props: ['cas'],
  watch: {
    $route (to, from) {
      if (to.name === 'Prod-index') {
        this.queryList.query = this.$route.query.query?this.$route.query.query:this.queryList.query
        this.queryList.stock_noticed_percent = this.$route.query.stock_noticed_percent?this.$route.query.stock_noticed_percent:this.queryList.stock_noticed_percent
        this.queryList.stock_noticed_percent_op = this.$route.query.stock_noticed_percent_op?this.$route.query.stock_noticed_percent_op:this.queryList.stock_noticed_percent_op
        if (this.cas && (from.name == 'Prod-check'|| from.name == 'Prod-forwarder')) {
          this.queryList.query = this.cas
          this.fetchData()
        }
        if(from.name=="Prod-Add2"){
          this.fetchData()
        }
      }
    }
  },
  created () {
  if (this.cas) {
      this.queryList.query = this.cas
  }else{
    this.queryList.query = this.$route.query.query?this.$route.query.query:this.queryList.query
    this.queryList.stock_noticed_percent = this.$route.query.stock_noticed_percent?this.$route.query.stock_noticed_percent:this.queryList.stock_noticed_percent
    this.queryList.stock_noticed_percent_op = this.$route.query.stock_noticed_percent_op?this.$route.query.stock_noticed_percent_op:this.queryList.stock_noticed_percent_op
  }
  this.fetchData()
  },
  methods: {
    fetchData() {
      if(!this.queryList.stock_noticed_percent_op){
        delete this.queryList.stock_noticed_percent_op
      }
      lists(this.queryList, 'prod').then(res => {
        if (res && res.code === 0) {
          if (this.loading_search) {
            this.$message({
              message: 'success',
              type: 'success'
            })
            this.loading_search = false
          }
          // res.data.data.forEach((item, index) => {
          //   item.img = item.img + '?' + (new Date()).getTime()
          //   item.svg = item.svg + '?' + (new Date()).getTime()
          // })
          this.list = res.data
          this.Unit = this.GEnums.Unit
          this.cas = ''
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
      // country_list().then(res => {
      //   this.country = res.data
      // })
      // getUserByType('101').then(res => {
      //   this.charges = res.data
      // })
      this.Users = this.GEnums.Users
    },
    change_inventory(id){
        setInventory(id).then(res=>{
            if (res && res.code == 0) {
                this.$message({
                    message: 'success',
                    type: 'success'
                })
                this.fetchData()
            }else {
                this.$message({
                    message: res.msg,
                    type: 'error'
                })
            }
        }).catch(rr=>{
            this.fetchData()
        })
    },
    can_saled_click(prod_id,type){
      var obj = {
        id:prod_id,
        can_saled:type
      }
      canSaled(obj).then(res=>{
        if (res && res.code == 0) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.fetchData()
        }else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    show_img (now) {
      this.now = new Date().getTime()
    },
    prod_export () {
      var queryList = {
        status: '',
        is_advantage: '',
        is_secret: '',
        chemicalcate_id: '',
        charge: '',
        created_at: ['', ''],
        query: ''
      }
      queryList.status = this.queryList.status
      queryList.chemicalcate_id = this.queryList.chemicalcate_id
      queryList.charge = this.queryList.charge
      queryList.created_at = this.queryList.created_at
      queryList.query = this.queryList.query
      queryList.is_secret = this.queryList.is_secret
      queryList.is_advantage = this.queryList.is_advantage
      this.prod_export_file = false
      this.prod_export_loading = true
      chemprod_export(queryList).then(res => {
        if (res && res.code === 0) {
          // this.prod_export_file = true
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
    exportSpec () {
      this.prod_exportSpec_file = false
      this.prod_exportSpec_loading = true
      chemprod_exportSpec().then(res => {
        if (res && res.code === 0) {
          this.prod_exportSpec_loading = false
          // this.prod_exportSpec_file = true
          this.prod_exportSpec_url = res.data
          setTimeout(() => {
            this.$refs.prod_exportSpec_url.click()
          }, 500)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.prod_exportSpec_loading = false
        }
      }).catch(rr => {
        this.prod_exportSpec_loading = false
      })
    },

    enter (id) {
      $('#' + id).show()
    },
    leave (id) {
      $('#' + id).hide()
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
    // eslint-disable-next-line camelcase
    edit (id, prod_id, type) {
      // this.$emit('getValue', true)
      // this.$nextTick(function () {
      //   this.$bus.emit('val', id)
      //   this.$bus.emit('prod_id', prod_id)
      //   this.$bus.emit('type', type)
      //   this.$bus.emit('enum', this.enum)
      // })
      this.$router.push({
        path: '/Prod/components',
        name: 'Prod-Add2',
        query: {
          id: id
        }
      })
    },
    search () {
      // this.queryList.page = 1
      // eslint-disable-next-line no-undef
      beforeSearch(this)
      this.queryList.page = 1
      this.currentPage = 1
      this.fetchData()
    },
    add () {
      // this.$router.push({
      //   path: '/Prod/components',
      //   name: 'Prod-Add1'
      // })
      this.$router.push({
        path: '/Prod/components',
        name: 'Prod-Add2',
        query: {
          add: true
        }
      })
    },
    //  add2 () {
    //   this.$router.push({
    //     path: '/Prod/components',
    //     name: 'Prod-Add2',
    //     query: {
    //       add: true
    //     }
    //   })
    // },
    // eslint-disable-next-line camelcase
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    },
    delete_prod (item, index) {
      destroy(item, 'chemprod', 'destroy', this, index)
    }
  }
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
        .cell{
          padding: 0px 5px;
        }
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
