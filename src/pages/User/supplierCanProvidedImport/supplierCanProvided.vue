<template>
<div>
  <el-form ref="form" :model="form" label-width="90px">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="下载模版:">
          <a :href="upload" style="color:rgb(0, 0, 238);">模版文件</a>
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
          <el-button size="mini" @click="is_port()">返回</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="16">
        <el-table :data="list.data" element-loading-text="Loading" size='mini' border fit highlight-current-row v-if="permission_names['prod.providedSupplierProdUploadList']=='prod.providedSupplierProdUploadList'">
          <el-table-column align="center" label="Id" width="80">
            <template slot-scope="scope">{{scope.row.id}}</template>
          </el-table-column>
          <el-table-column align="center" label='Time' width="140">
              <template slot-scope="scope">
                  {{scope.row.material?scope.row.material.created_at:''}}
              </template>
          </el-table-column>
          <el-table-column align="center" label="Material" width="80">
            <template slot-scope="scope">{{scope.row.material_id}}</template>
          </el-table-column>
          <el-table-column label="username" align="center" width="90">
            <template slot-scope="scope">{{getEnumValue(Users,scope.row.user_id)}}</template>
          </el-table-column>
          <el-table-column label="origin" align="center">
            <template slot-scope="scope">{{scope.row.material?scope.row.material.origin:''}}</template>
          </el-table-column>
          <el-table-column label="result_url" align="center" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" v-if="scope.row.material&&scope.row.material.result_url">
                <a :href="scope.row.material.result_url" target="_blank" style="color: white;">Download</a>
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
</div>
</template>

<script>
import {providedSupplierProdUploadList } from "@/api/user";
import util from "@/libs/util";

export default {
  props: ["company_id"],
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      form: {
        company_id: "",
        cover: ""
      },
      currentPage: 1,
      queryList: {
        page: "1",
        company_id:''
      },
      customer: [],
      fileList: [],
      upload:
        process.env.VUE_APP_API +
        "template/excel/suppliercanprovided.xlsx",
      upload_api: process.env.VUE_APP_API + "api/v1/prod/providedProdUpload",
      list: {},
      Users:[],
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
      this.queryList.company_id = this.company_id
      providedSupplierProdUploadList(this.queryList).then(res => {
        this.list = res.data;
      });
      this.form.company_id = this.company_id
      this.Users = this.GEnums.Users;
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
        providedSupplierProdUploadList(this.queryList).then(res => {
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
    is_port(){
      this.$emit("prod_close", false);
    }
    // supplyMethod(query) {
      
    //   if (query !== "") {
    //     this.supplyloading = true;
    //     setTimeout(() => {
    //       member_list(query).then(res => {
    //         this.customer = res.data;
    //         this.supplyloading = false;
    //       });
    //     }, 200);
    //   } else {
    //     this.customer = [];
    //   }
    // },
  }
};
</script>
