<style lang="scss" scoped type="text/scss">
.heard_top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 5px;
  .el-autocomplete {
    width: 200px;
    margin-right:5px;
  }
  .el-input {
    width: 100px;
    margin-right:5px;
  }
  .el-select {
    width: 100px;
    margin-right:5px;
  }
  .el-button{margin-right: 5px;}
}
.dialog {
  .el-input {
    width: 200px;
  }
  .el-select {
    width: 200px;
  }
}
/deep/.plTableBox .el-table{
  font-size: 13px!important;
}
/deep/.d2-container-full__body::-webkit-scrollbar {
  overflow-y:hidden;
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <el-upload
          class="upload-demo"
          multiple
          ref="upload"
          action="files"
          :http-request="uploadFile"
          :show-file-list="false"
          :file-list="fileList"
        >
        <el-tooltip class="item" effect="dark" content="文件必须以合同号命名；同一个合同号多个文件请打包成一个文件" placement="right">
          <el-button size="mini" type="primary" @click="onSubmit">批量上传</el-button>
        </el-tooltip>
        </el-upload>
        
        <!-- <el-button size="mini" type="primary" @click="onSubmit">上传</el-button> -->
      <div>
        <el-input placeholder="合同号"  size="mini" style="width:150px;"  v-model="queryList.contract_number" clearable></el-input>
        <el-date-picker
                type="date"
                placeholder="合同开始日期"
                clearable
                v-model="queryList.date_start"
                value-format="yyyy-MM-dd"
                style="width:150px;"
                class="d2-mr-5"
                size="mini"
        ></el-date-picker>
        <el-date-picker
                size="mini"
                type="date"
                clearable
                placeholder="合同结束日期"
                v-model="queryList.date_end"
                class="d2-mr-5"
                style="width:150px;"
                value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-select placeholder="采购员" size="mini" clearable v-model="queryList.purchase_user_id" >
          <el-option
                  v-for="item in purchaseList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-input
              size="mini"
              placeholder="乙方"
              v-model="queryList.corp_name"
              clearable
              style="width:150px;"
        ></el-input>
        <el-autocomplete
                clearable
                size="mini"
                placeholder="请输入供应商名称"
                v-model="queryList.supplier_name"
                :fetch-suggestions="querySearch"
                @select="handleSelect_supplier"
                style="width:200px;"
        >
          <template slot-scope="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </el-autocomplete>
        <el-select
                placeholder="是否回传"
                size="mini"
                clearable
                v-model="queryList.is_huichuan">
          <el-option
                  v-for="item in huiList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
          ></el-option>
        </el-select>
        <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
        <a hidden :href="file_url" ref="file_url"></a>
        <!--<a hidden :href="file_url_p" ref="file_url_p"></a>-->
        <el-button type="primary" size="mini" :loading="loading_download" @click="Down_p()">批量下载</el-button>
      </div>
    </div>

    <!-- 页面 -->
    <el-table
      :data="list.data"
      border
      fit
      highlight-current-row
      size="mini"
    >
      <el-table-column label="合同号" width="150px">
        <template slot-scope="scope">{{scope.row.contract_number}}</template>
      </el-table-column>
      <el-table-column
        label="时间"
        width="100px"
      >
        <template slot-scope="scope">{{scope.row.contract_date}}</template>
      </el-table-column>
      <el-table-column label="供应商">
        <template slot-scope="scope">{{scope.row.supplier_name}}</template>
      </el-table-column>
      <el-table-column label="乙方">
        <template slot-scope="scope">{{scope.row.corp_name}}</template>
      </el-table-column>
      <el-table-column label="采购员">
        <template slot-scope="scope">{{scope.row.corp_contact}}</template>
      </el-table-column>
      <el-table-column label="是否回传" width="100">
        <template slot-scope="scope">
          {{scope.row.is_huichuan==1?'是':'否'}}
        </template>
      </el-table-column>
      <el-table-column label="回传人" width="100">
        <template slot-scope="scope">
          {{scope.row.huichuan?scope.row.huichuan.username:''}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.is_huichuan==1"
            @click="Down(scope.row)"
          >下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
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
import { lists, listTotal } from "@/api/prod";
import { huichuan_index,uploads } from "@/api/procure";
import util from "@/libs/util";
export default {
    name:"procure-huichuan",
  data() {
    return {
        list:{},
        queryList:{
          page:1,
          contract_number:'',
          date_start:'',
          date_end:'',
          purchase_user_id:'',
          corp_name:'',
          supplier_name:'',
          is_huichuan:''
        },
        file_url:'',
        file_url_p:'',
        fileList: [],
        purchaseList:[],
        huichuan:[],
        loading_search:false,
        loading_download:false,
        huiList:[{id:0,name:'否'},{id:1,name:'是'}],
        currentPage:1,
        permission_names: JSON.parse(localStorage.getItem("permission_names")),
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    headers() {
      const token = util.cookies.get("token");
      return {
        Authorization: "Bearer " + token,
        'Version-Number':process.env.VUE_APP_Version
      };
    }
  },
  methods: {
    fetchData(){
        huichuan_index(this.queryList).then(res => {
          if(this.loading_search){
            this.$message({
                message:res.msg,
                type:'success'
            })
          }
          this.loading_search=false
          this.list = res.data
          this.purchaseList = this.GEnums.Purchases
      }).catch(rr => {this.loading_search=false})
    },
    Search(){
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1
      this.fetchData();
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    querySearch(queryString, cb) {
        listTotal("data/member_list?type=2&name=" + queryString).then(res => {
            cb(res.data);
        });
    },
    handleSelect_supplier(item){
      this.queryList.supplier_name=item.name
    },
    uploadFile(file) {
        let data=  new FormData()
        data.append("file", file.file);
        data.append("mark","Spectrogram")
        uploads(data).then(res=>{
            if(res.code===0){
                this.$message({
                    message: res.msg,
                    type: "success",
                    duration:'5000'
                });
            }else {
                this.$message({
                    message: res.msg,
                    type: "error",
                    duration:'5000'
                });
            }
        })
    },
    Down_p(){
      this.loading_down = true
      huichuan_down(this.queryList).then(res=>{
        this.file_url_p = res;
        // setTimeout(() => {
        //   this.$refs.file_url_p.click();
        // }, 200);
      }).catch(i=>{this.loading_down = false})
    },
    Down(item){
      this.file_url = item.huichuan.file_url;
      setTimeout(() => {
        this.$refs.file_url.click();
      }, 200);
    }
  },
};
</script>
