<style lang="scss" scoped type="text/scss">
.heard_top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0;
  .el-input {
    width: 15%;
  }
  .el-select {
    margin: 0px 10px;
  }
}
  table {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
    td {
      padding: 0px 5px;
      line-height: 25px;
      font-size: 13px;
      border-color: #E5E5E5;
      border-top: 0px;
      word-break:break-all;
      div{
        height: 40px;
        line-height: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 0px 5px;
      }
    }
  }
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <el-input placeholder="CAS" size="mini" v-model="queryList.cas" clearable></el-input>
      <el-input :placeholder="$t('wareHouse.sample.sample4')" size="mini" style="margin:0px 10px;" v-model="queryList.batchno" clearable></el-input><!-- 批次 -->
      <el-select clearable v-model="queryList.sampled_status" size="mini" style="width:150px;">
        <el-option v-for="i in enums.sampled_status" :key="i.id" :label="i.name" :value="i.id"></el-option>
      </el-select>
      <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">{{$t('search')}}</el-button>
      <el-button type="primary" size="mini" :loading="loading_e" @click="doExport()" v-if="permissions.indexOf(617)>-1">导出</el-button>
      <a :href="prod_export_url" ref="prod_export_url" hidden></a>
    </div>

    <!-- 页面 -->
    <!-- <table border bordercolor="#fff" fit highlight-current-row>
      <tr>
        <td rowspan="2" width='50'><b>ID</b></td>
        <td rowspan="2" width="60"><b>{{$t('wareHouse.sample.sample1')}}</b></td>
        <td rowspan="2" width="100"><b>{{$t('wareHouse.sample.sample2')}}</b></td>
        <td rowspan="2" width='100'><b>CAS</b></td>
        <td rowspan="2" width="60"><b>{{$t('wareHouse.sample.sample3')}}</b></td>
        <td rowspan="2" width='100'><b>{{$t('wareHouse.sample.sample4')}}</b></td>
        <td rowspan="2"><b>{{$t('wareHouse.sample.sample5')}}</b></td>
        <td rowspan="2" width="120"><b>{{$t('wareHouse.sample.sample6')}}</b></td>
        <td rowspan="2" width="60"><b>申请人</b></td>
        <td colspan="5" align="center"><b>{{$t('wareHouse.sample.sample7')}}</b></td>
      </tr>
      <tr>
        <td width='91'><b>{{$t('wareHouse.sample.sample8')}}</b></td>
        <td width='60'><b>{{$t('wareHouse.sample.sample9')}}</b></td>
        <td width='80'><b>{{$t('wareHouse.sample.sample10')}}</b></td>
        <td width='80'><b>{{$t('wareHouse.sample.sample11')}}</b></td>
        <td width='120'><b>{{$t('wareHouse.sample.sample12')}}</b></td>
      </tr>
      <tr v-for="item in list.data">
        <td>{{item.id}}</td>
        <td>{{item.contact_name}}</td>
        <td>{{item.prod?item.prod.prodno:''}}</td>
        <td>{{item.cas}}</td>
        <td>{{getEnumValue(enums.classes,item.class)}}</td>
        <td>{{item.batchno}}</td>
        <td>{{item.note}}</td>
        <td>{{item.warehouse?item.warehouse.name:''}}</td>
        <td>{{getEnumValue(User,item.user_id)}}</td>
        <td style="padding:0px;">
          <div v-for="(i,index_a) in item.testitems" :style="index_a==0?'border-top:0px;':'border-top:1px solid #E5E5E5;'">
            <span style="width:100%;">{{i.testitem_name}}</span>
            <br>
            <span style="width:100%;" v-if="i.testitem_json_tostring">:{{i.testitem_json_tostring}}</span>
          </div>
        </td>
        <td style="padding:0px;">
          <div v-for="(i,index_a) in item.testitems" :style="index_a==0?'border-top:0px;':'border-top:1px solid #E5E5E5;'">
            {{getEnumValue(enums.sampled_status,i.sampled_status)}}
          </div>
        </td>
        <td style="padding:0px;">
          <div v-for="(i,index_a) in item.testitems" :style="index_a==0?'border-top:0px;':'border-top:1px solid #E5E5E5;'">
            {{i.created_at}}
          </div>
        </td>
        <td style="padding:0px;">
          <div v-for="(i,index_a) in item.testitems" :style="index_a==0?'border-top:0px;':'border-top:1px solid #E5E5E5;'">
            {{i.sampled_at}}
          </div>
        </td>
        <td>
          <div v-for="(i,index_a) in item.testitems" :style="index_a==0?'border-top:0px;':'border-top:1px solid #E5E5E5;'">
                <el-button
                  v-if="i.sampled_at == null&&i.sampled_status==2"
                  type="primary"
                  size="mini"
                  @click="sampleClick(i.id)"
                >{{$t('wareHouse.sample.sample13')}}</el-button>
                <el-button
                        type="primary"
                        size="mini"
                        @click="cancelClick(i.id)"
                >取消</el-button>
          </div>
        </td>
      </tr>
    </table> -->

    <table border bordercolor="#fff" v-for="(item,index) in list.data">
      <tr v-if="index===0" style="background: #f2f2f2;border-top: 1px solid #E5E5E5;">
        <td ><b>ID</b></td>
        <td ><b>{{$t('wareHouse.sample.sample1')}}</b></td><!-- 联系人 -->
        <td  ><b>{{$t('wareHouse.sample.sample2')}}</b></td><!-- 产品编号 -->
        <td  ><b>CAS</b></td>
        <td  ><b>{{$t('wareHouse.sample.sample3')}}</b></td><!-- 类型 -->
        <td  ><b>{{$t('wareHouse.sample.sample4')}}</b></td><!-- 批次 -->
        <td ><b>{{$t('wareHouse.sample.sample5')}}</b></td><!-- 备注 -->
        <td  ><b>{{$t('wareHouse.sample.sample6')}}</b></td><!-- 所在仓库 -->
        <td  ><b>货架</b></td>
        <td  ><b>申请人</b></td><!-- 申请人 -->
        <td ><b>{{$t('wareHouse.sample.sample8')}}</b></td><!-- 检测项目名称 -->
        <td ><b>{{$t('wareHouse.sample.sample9')}}</b></td><!-- 是否取样 -->
        <td ><b>{{$t('wareHouse.sample.sample10')}}</b></td><!-- 申请时间 -->
        <td ><b>{{$t('wareHouse.sample.sample11')}}</b></td><!-- 取样时间 -->
        <td><b>备注</b></td>
        <td ><b>{{$t('wareHouse.sample.sample12')}}</b></td><!-- 操作 -->
      </tr>
      <tr v-for="(i,index_a) in item.testitems">
        <td :rowspan="item.testitems.length" v-if="index_a==0" width='40'>{{item.id}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width="40">{{item.contact_name}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width="80">{{item.prod?item.prod.prodno:''}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width="80">{{item.cas}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width="60">{{getEnumValue(enums.classes,item.class)}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width="100">{{item.batchno}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" >{{item.note}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width="80">{{item.warehouse?item.warehouse.name:''}}</td>
        <td :rowspan="item.testitems.length" v-if="index_a==0" width='80' v-html="item.shelfInfo"></td>
        <td width="40">
          <span>{{getEnumValue(User,i.user_id)}}</span>
        </td>
        <td width="80">
          <span>{{i.testitem_name}}</span>
          <br>
          <span v-if="i.testitem_json_tostring">:{{i.testitem_json_tostring}}</span>
        </td>
        <td width="60">{{getEnumValue(enums.sampled_status,i.sampled_status)}}</td>
        <td width="70">{{i.created_at}}</td>
        <td width="70">{{i.sampled_at}}</td>
        <td width='110px'>{{i.note}}</td>
        <td width="110">
                <el-button
                  v-if="(i.sampled_status==2)&&permissions.indexOf(266)>-1"
                  type="primary"
                  size="mini"
                  @click="sampleClick(i.id)"
                >{{$t('wareHouse.sample.sample13')}}</el-button>
                <el-button
                        type="primary"
                        size="mini"
                        @click="cancelClick(i.id)"
                        v-if="(i.sampled_status==2)&&permissions.indexOf(590)>-1"
                >取消</el-button>
        </td>
      </tr>
    </table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top: 10px;"
      v-if="list.total"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="list.per_page"
      layout="prev, pager, next"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import { lists, listTotal, create, listPost,sample_cancle,sample_export } from '@/api/inventory'
import $ from 'jquery'
export default {
  name: 'Warehouse-sample',
  data () {
    return {
      list: {},
      enums: {},
      prod_export_url:'',
      currentPage: 1,
      queryList: {
        page: '1',
        cas: '',
        batchno: '',
        sampled_status:2,
      },
      loading_search:false,
      loading_e:false,
      User:[],
      permissions: JSON.parse(localStorage.getItem("permissions"))
    }
  },
  watch: {
    $route (to, from) {
      if (to.name == 'Warehouse-sample') {
        this.fetchData()
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    cancelClick(id){
        let obj={
            id:id
        }
        sample_cancle(obj,this)
    },
    fetchData () {
      listPost(this.queryList, 'sample/index').then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.list = res.data
        this.enums = res.enum
        this.User = this.GEnums.Users
      })
    },
    handleCurrentChange (page_current) {
      this.queryList.page = this.currentPage = page_current
      this.fetchData()
    },
    sampleClick (id) {
      var queryList = JSON.parse(JSON.stringify(this.queryList))
      queryList.id = id
      listPost(queryList, 'sample/sampled').then(res => {
          if(res&&res.code==0){
              this.$message({
                  message: 'success',
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
    Search () {
      this.loading_search=true
      this.queryList.page = 1
      this.currentPage=1
      this.queryList.cas = this.queryList.cas.replace(/\s/g, '')
      this.queryList.batchno = this.queryList.batchno.replace(/\s/g, '')
      this.fetchData()
    },
    doExport(){
      this.loading_e = true
      sample_export(this.queryList).then(res => {
        if (res && res.code === 0) {
          this.prod_export_url = res.data
          setTimeout(() => {
            this.$refs.prod_export_url.click()
            this.loading_e = false
          }, 200)
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
          this.loading_e = false
        }
      }).catch(rr => {
        this.loading_e = false
      })
    },
  }
}
</script>
