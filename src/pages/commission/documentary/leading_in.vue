<style lang="scss" scoped type="text/scss">
</style>
<template>
  <d2-container>
    <div style='text-align:right;margin:10px 5px;'>
      <el-upload
                style="display: inline-block;"
                class="upload-demo"
                ref="upload"
                v-if="permission_names['documentary.upload']=='documentary.upload'"
                :action='upload_api'
                :data='form'
                :headers='headers'
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-success="handleAvatarSuccess"
                :auto-upload="true"
                :show-file-list='true'
                accept=".xlsx"
                :file-list="fileList">
            <el-button size="mini" type="primary" @click="onSubmit()">导入</el-button>
        </el-upload>
    </div>
    <!-- 页面 -->
    <el-table
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      size="mini"
    >
      <el-table-column label="ID" width="80px">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="时间" width="200px">
        <template slot-scope="scope">{{scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column label="操作员" width="100px">
        <template slot-scope="scope">{{getEnumValue(Users,scope.row.user_id)}}</template>
      </el-table-column>
      <el-table-column label="文件">
        <template slot-scope="scope">{{scope.row.origin}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" v-if="scope.row.result_url">
            <a :href="scope.row.result_url" target="_blank" style="color: white;">Download</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total,prev, pager, next"
      :total="list.total"
      :page-size="list.per_page"
    ></el-pagination>
  </d2-container>
</template>
<script>
import axios from "axios";
import util from '@/libs/util'
import {
  documentary_upload_list
} from "@/api/commission";
export default {
  name: "commission-leading_in",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      list:{},
      currentPage:1,
      fileList:[],
      queryList: {
        page: 1,
      },
      form:{},
      upload_api: process.env.VUE_APP_API + 'api/v1/documentary/upload',
      Users:[]
    };
  },
  computed: {
      headers() {
          const token = util.cookies.get('token')
          return {
              'Authorization': 'Bearer ' + token,
              'Version-Number':process.env.VUE_APP_Version
          }
      }
  },
  watch: {
    $route(to, from) {
      if (to.name == "commission-leading_in") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      documentary_upload_list(this.queryList).then(res => {
          this.list = res.data
          this.Users = this.GEnums.Users;
      });
    },
    beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleAvatarSuccess(res, file, fileList) {
        if (file.response.code == 0) {
            this.$message({
                message: 'success',
                type: 'success'
            })
            this.fetchData();
        } else {
            this.$message({
                message: file.response.msg,
                type: 'error'
            })
        }
    },
    onSubmit() {
        this.$refs.upload.submit()
    },
    handleCurrentChange(pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent;
      this.fetchData();
    }
  }
}
</script>
