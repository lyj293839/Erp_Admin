<style lang="scss" scoped type="text/scss">
/deep/.heard {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 0px;
}
</style>
<template>
  <d2-container>
    <div>
      <div class="heard">
        <el-select
          v-model="queryList.company_id"
          placeholder="供应商"
          size="mini"
          filterable
          remote
          reserve-keyword
          :remote-method="supplyMethod"
          :loading="supplyloading"
          style="width: 220px;margin-right: 5px;"
          clearable
        >
          <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
        </el-select>
        <el-date-picker
          size="mini"
          type="date"
          placeholder="创建开始时间"
          v-model="queryList.created_at_start"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          style="width: 140px;margin-right: 5px;"
        ></el-date-picker>
        <el-date-picker
          size="mini"
          type="date"
          placeholder="创建结束时间"
          v-model="queryList.created_at_end"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          style="width: 140px;margin-right: 5px;"
        ></el-date-picker>
        <el-select
          placeholder="采购员"
          clearable
          v-model="queryList.user_id"
          size="mini"
          style="width: 90px;margin-right: 5px;"
        >
          <el-option
            v-for="item in purchaseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="mini"
          :loading="loading_search"
          @click="search"
        >{{$t('search')}}</el-button>
      </div>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="list.data"
            element-loading-text="Loading"
            size="mini"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="Id" width="80">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column align="center" label="Time" width="140">
              <template slot-scope="scope">{{scope.row.material?scope.row.material.created_at:''}}</template>
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
                <el-button
                  type="primary"
                  size="mini"
                  v-if="scope.row.material&&scope.row.material.result_url"
                >
                  <a
                    :href="scope.row.material.result_url"
                    target="_blank"
                    style="color: white;"
                  >Download</a>
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
    </div>
  </d2-container>
</template>

<script>
import { providedSupplierProdUploadIndex } from "@/api/prod";
import { supplier_lists } from "@/api/instore";
import util from "@/libs/util";
export default {
  name: "Prod-sup_import",
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
        company_id: "",
        created_at_start: "",
        created_at_end: "",
        user_id: ""
      },
      customer: [],
      fileList: [],
      list: {},
      Users: [],
      purchaseList: [],
      supply_list: [],
      supplyloading: false,
      loading_search: false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      providedSupplierProdUploadIndex(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.loading_search = false;
        }
        this.list = res.data;
        // this.list.per_page = parseInt(res.data.per_page)
      });
      this.form.company_id = this.company_id;
      this.Users = this.GEnums.Users;
      this.purchaseList = this.GEnums.Purchases;
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
        providedSupplierProdUploadIndex(this.queryList).then(res => {
          this.list = res.data;
        });
      } else {
        this.$message.error(file.response.msg);
      }
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    search() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.fetchData()
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          supplier_lists(query).then(res => {
            this.supply_list = res.data;
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    }
  }
};
</script>
