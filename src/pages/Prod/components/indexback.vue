<template>
    <div>
        <el-form :model="queryList" label-width="80px" class="d2-m-10">
            <el-row style="margin: 10px 2px;">
                <el-col :span="5">
                    <el-button type="primary" size="mini" @click="add">{{$t('add')}}</el-button>
                    <el-button type="primary" size="mini" :loading="prod_exportSpec_loading" @click="exportSpec" v-if="permissions.indexOf(143)>-1">导出规格</el-button>
                    <el-button v-if="prod_exportSpec_file"  type="primary" size="mini"><a :href="prod_exportSpec_url" style="color:white">规格文件</a></el-button>
                    <el-button type="primary" size="mini" :loading="prod_export_loading" @click="prod_export" v-if="permissions.indexOf(132)>-1">导出产品</el-button>
                    <el-button v-if="prod_export_file"  type="primary" size="mini"><a :href="prod_export_url" style="color:white">产品文件</a></el-button>
                </el-col>
                <el-col class="d2-text-right" :span="19">
                    <div style="display: inline-block;">
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
                                    v-for="i in ChemicalType"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="queryList.charge" clearable filterable size="mini" style="width: 110px;margin: 0 2px;" placeholder="采购负责人">
                            <el-option
                                    v-for="i in charges"
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
                                style="width: 118px;"
                        ></el-date-picker>
                        <span style="margin:0px 2px;font-size:10px;">至</span>
                        <el-date-picker
                                size="mini"
                                type="date"
                                placeholder="结束日期"
                                v-model="queryList.created_at[1]"
                                value-format="yyyy-MM-dd"
                                format="yyyyMMdd"
                                style="width: 118px;"
                        ></el-date-picker>
                        <el-input
                                v-model="queryList.query"
                                style="width: 152px;margin: 0 1px;"
                                size="mini"
                                clearable
                                placeholder="ID/CAS/MDL/Name"
                        ></el-input>
                        <el-button type="primary" size="mini" @click="search">{{$t('search')}}</el-button>
                    </div>

                </el-col>
            </el-row>
        </el-form>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row
                  size="small" style="z-index: 99">
            <el-table-column width="80" align="center" label='ID'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='图标' width="200">
                <template slot-scope="scope">
                    <el-popover
                            placement="top-start"
                            title=""
                            width="300"
                            trigger="hover"
                           >
                        <div :id="scope.row.id">
                            <img v-if="scope.row.is_smilestranimg==1" :src="scope.row.img"  v-preview="scope.row.svg"
                                 style="width: 300px;"/>
                            <img v-else :src="scope.row.img"
                                 style="width: 300px;"/>
                        </div>
                        <img  slot="reference" src="/image/module/ben.png"   @mouseenter="enter(scope.row.id)" @mouseleave="leave(scope.row.id)"
                              alt="" style="width: 32px;margin:10px;">
                    </el-popover>
                    <img v-if="scope.row.status==1" src="/image/module/check.png"
                    style="margin:10px;"/>
                    <el-progress v-if="scope.row.stock_noticed=='1'" :text-inside="true" :stroke-width="22" :percentage="Number(scope.row.stock_noticed_percent)" style="width: 100px;right: 0;position: absolute;"></el-progress>
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='产品编号'>
                <template slot-scope="scope">
                    {{scope.row.prodno}}
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" label='CAS'>
                <template slot-scope="scope">
                    {{scope.row.cas}}
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
            <el-table-column align="center" label='标签' width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_advantage||scope.row.is_secret">
                        <span v-if="scope.row.is_advantage">{{$t('product.list.is_advantage')}};</span><span v-if="scope.row.is_secret">{{$t('product.list.is_secret')}}</span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='分类' width="120">
                <template slot-scope="scope">
                    <span>{{getEnumValue(ChemicalType,scope.row.chemicalcate_id)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="210">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permissions.indexOf(137)>-1"
                                @click="edit(scope.row.id,scope.row.prod_id)">Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="edit(scope.row.id,scope.row.prod_id)">Review
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                v-if="permissions.indexOf(136)>-1"
                                @click="delete_prod(scope.row)">Delete
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
  create,
  edit,
  update,
  destroy,
  country_list,
  city_list,
  member_company,
  getUserByType,
  chemprod_exportSpec,
  chemprod_export
} from '@/api/prod'
import $ from 'jquery'
export default {
  name: 'Prod-index',
  data () {
    return {
      permissions: JSON.parse(localStorage.getItem('permissions')),
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
        per_page: '9',
        status: 3,
        chemicalcate_id: '',
        charge: '',
        created_at: ['', ''],
        query: ''
      },
      list: [],
      charges: [],
      enum: {},
      ChemicalType: [],
      Unit: {}
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'Prod-index') {
        this.fetchData()
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      if (this.$route.query) {
        this.queryList = this.$route.query
      }
      this.queryList.status = 3
      lists(this.queryList, 'chemprod').then(res => {
        if (res && res.code === 0) {
          res.data.data.forEach((item, index) => {
            item.img = item.img + '?' + (new Date()).getTime()
            item.svg = item.svg + '?' + (new Date()).getTime()
          })
          this.list = res.data
          this.enum = res.enum
          this.ChemicalType = res.enum.ChemicalType
          this.Unit = res.enum.Unit
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
      country_list().then(res => {
        this.country = res.data
      })
      getUserByType('101').then(res => {
        this.charges = res.data
      })
    },
    prod_export () {
      var queryList = {
        status: '',
        is_advantage: '',
        is_secret: '',
        chemicalcate_id: '',
        charge: '',
        created_at: ['', ''],
        query: '',
        cas: ''
      }
      queryList.cas = this.queryList.cas
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
        if (!(res && res.code === 0)) {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.prod_export_loading = false
        } else {
          this.prod_export_loading = false
          this.prod_export_file = true
          this.prod_export_url = res.data
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
          this.prod_exportSpec_file = true
          this.prod_exportSpec_url = res.data
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
    edit (id, prod_id) {
      this.$emit('getValue', true)
      this.$nextTick(function () {
        this.$bus.emit('val', id)
        this.$bus.emit('prod_id', prod_id)
        this.$bus.emit('enum', this.enum)
      })
    },
    search () {
      this.fetchData()
    },
    add () {
      this.$emit('getValue', true)
      this.$nextTick(function () {
        this.$bus.emit('enum', this.enum)
      })
    },
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
