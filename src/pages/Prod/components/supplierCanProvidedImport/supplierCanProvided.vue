<template>
  <el-form ref="form" :model="form" label-width="90px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="下载模版:">
          <a :href="upload" style="color:rgb(0, 0, 238);">模版文件</a>
        </el-form-item>
        <el-form-item label="供应商:">
          <el-select
            v-model="form.company_id"
            size="mini"
            filterable
            remote
            reserve-keyword
            :remote-method="supplyMethod"
            :loading="supplyloading"
            placeholder="请选择供应商"
            clearable
          >
            <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="追加/覆盖:">
          <el-switch v-model="form.cover" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="上传文件:" :required="true">
          <el-upload
            style="display: inline-block;"
            class="upload-demo"
            ref="upload"
            :action="upload_api"
            :data="form"
            :headers="headers"
            :before-remove="beforeRemove"
            multiple
            accept=".xlsx"
            :limit="1"
            :on-success="handleAvatarSuccess"
            :auto-upload="false"
            :file-list="fileList"
          >
            <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row>
          <el-table-column align="center" label="id" width="80">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column align="center" label='Time' width="100">
                            <template slot-scope="scope">
                                {{scope.row.created_at}}
                            </template>
                        </el-table-column>
          <el-table-column label="username" align="center" width="90">
            <template slot-scope="scope">{{scope.row.username?scope.row.username.username:''}}</template>
          </el-table-column>
          <el-table-column label="origin" align="center">
            <template slot-scope="scope">{{scope.row.origin}}</template>
          </el-table-column>
          <el-table-column label="result_url" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" v-if="scope.row.result_url">
                <a :href="scope.row.result_url" target="_blank" style="color: white;">Download</a>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: right;margin-top: 10px;"
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="list.per_page"
          layout="prev, pager, next"
          :total="list.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { member_list, providedProdUploadList } from "@/api/prod";
import util from "@/libs/util";

export default {
  data() {
    return {
      form: {
        company_id: "",
        cover: ""
      },
      currentPage: 1,
      queryList: {
        page: "1"
      },
      customer: [],
      fileList: [],
      upload:
        process.env.VUE_APP_API +
        "template/excel/SupplierCanProvidedProducts.xlsx",
      upload_api: process.env.VUE_APP_API + "api/v1/prod/providedProdUpload",
      list: {},
      supplyloading:false
    };
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
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      providedProdUploadList(this.queryList).then(res => {
        this.list = res.data;
      });
      // member_list().then(res => {
      //   this.customer = res.data;
      // });
    },
    onSubmit() {
      this.$refs.upload.submit();
    },
    handleAvatarSuccess(res, file, fileList) {
      if (file.response.code == 0) {
        this.$message({
          message: "success",
          type: "success"
        });
        this.form = {
          company_id: "",
          cover: ""
        };
        this.fileList = [];
        providedProdUploadList(this.queryList).then(res => {
          this.list = res.data;
        });
      } else {
        this.$message.error(file.response.msg);
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          member_list(query).then(res => {
            this.customer = res.data;
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.customer = [];
      }
    },
  }
};
</script>
