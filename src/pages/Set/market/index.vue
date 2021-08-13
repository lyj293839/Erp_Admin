<style lang="scss" scoped type="text/scss">
.sbaoHeard {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px 0px;
}
/deep/ .el-table td, .el-table th {
  padding: 6px 0;
}
.sbaoInput {
  width: 70%;
}

.sbaoHeard-one {
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: space-around;
  margin-left: 5px;
}

.tipOne {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.sbaoFrom {
  font-weight: bold;
}

.sbaoDialog {
  font-size: 12px;
  font-weight: bold;
}

.question-select {
  height: 40px;
}

.question-select select {
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  outline: none;
  height: 100%;
  padding: 0 20px;
  color: #333;
  font-size: 22px;
}

.question-select .el-select {
  margin-right: 5px;
}

.dialog {
  width: 50px;
}

.saleSearch {
  margin: 0px 10px;
}

</style>
<template>
  <d2-container>
    <div class="sbaoHeard">
      <el-checkbox @change="changeSale">{{$t('set.market.checkSale')}}</el-checkbox>
      <el-select
        class="saleSearch"
        v-model="queryList.sale_id"
        :placeholder="$t('set.market.saleInput')"
        :disabled="value"
        clearable
        size="mini"
      >
        <el-option v-for="item in saleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <div class="sbaoHeard-one">
        <el-input
          class="sbaoInput"
          v-model="queryList.country_name"
          :placeholder="$t('set.market.countrySearch')"
          size="mini"
          clearable
        ></el-input>
        <el-button
          type="primary"
          @click="sbaoSearch"
          size="mini"
        >{{$t('set.market.searchButton')}}</el-button>
      </div>
    </div>

    <!-- 页面 -->

    <el-table style="font-size: 12px" :data="list.data" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column :label="$t('set.market.market_page.Code')">
        <template slot-scope="scope">{{scope.row.Code}}</template>
      </el-table-column>
      <el-table-column :label="$t('set.market.market_page.Name')">
        <template slot-scope="scope">{{scope.row.Name}}</template>
      </el-table-column>
      <el-table-column :label="$t('set.market.market_page.sale')">
        <template
          slot-scope="scope"
        >
          {{getEnumValue(saleList,attr(scope.row,'country_sales.sale_id'))}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('set.market.market_page.default_level_id')">
        <template
          slot-scope="scope">
        {{attr(scope.row,'country_sales.default_level_id')}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('set.market.market_page.make')" width="90px">
        <template slot-scope="scope" >
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
            v-if="permissions.indexOf(287)>-1"
          >{{$t('set.market.editButton')}}</el-button>
          <!-- <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row)"
          >{{$t('set.market.delButton')}}</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="list.per_page"
      layout="prev, pager, next"
      :total="list.total"
    ></el-pagination>

    <!-- 编辑 -->

    <el-dialog
      :title="$t('set.market.market_Form.country_set')"
      :visible.sync="dialogEdit"
      width="30%"
    >
      <el-form class="sbaoFrom" :model="editForm" label-width="100px" label-position="right">
        <el-form-item :label="$t('set.market.market_Form.Code')">
          <el-input v-model="editForm.country_code" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('set.market.market_Form.Name')">
          <el-input v-model="editForm.country" :disabled="true" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('set.market.market_Form.sale')">
          <el-select v-model="editForm.sale_id" :placeholder="$t('set.market.saleInput')" size="small" clearable>
            <el-option v-for="item in saleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('set.market.market_Form.default_level_id')">
          <el-input v-model="editForm.default_level_id" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            type="primary"
            @click="saveEdit()"
            :loading='loading?true:false'
          >{{$t('set.market.market_Form.keepButton')}}</el-button>
          <el-button
            size="mini"
            @click="editClose"
          >{{$t('set.market.market_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import axios from "axios";
import request from "@/plugin/axios";
import $ from "jquery";
import { lists, listTotal } from "@/api/prod";
import { destroy } from "@/api/manual_prod";
export default {
  name: "Set-market",
  data() {
    return {
      permissions :JSON.parse(localStorage.getItem('permissions')),
      value: true,
      list: [],
      saleList: [],
      currentPage: 1,
      queryList: {
        page: "1",
        has_sale:'',
        sale_id: "",
        country_name: ""
      },
      dialogEdit: false,
      editForm: {
        id: "",
        country_code: "",
        country: "",
        default_level_id: "",
        sale_id: ""
      },
      editForm_loadingSave: false,
      loading:false
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Set-market'){
            this.fetchData()
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    aa(index) {
      var a = "";
      if (index) {
        a = this.saleList.filter(item => {
          return index == item.id;
        });
      } else {
        a = [{ id: "", name: "" }];
      }
      return a[0];
    },
    fetchData() {
      lists(this.queryList, "country_sale").then(res => {
        this.list = res.data;
      });
      listTotal("data/user_list").then(res => {
        this.saleList = res.data;
      });
    },
    handleEdit(row) {
      for (var i = 0; i < this.list.data.length; i++) {
        if (this.list.data[i].Capital == row.Capital) {
          row.id = i;
        }
      }
      this.dialogEdit = true;
      this.editForm.id = row.id;
      this.editForm.country = row.Name;
      this.editForm.country_code = row.Code;
      this.editForm.sale_id = row.country_sales
        ? this.aa(row.country_sales.sale_id).id
        : "";
      this.editForm.default_level_id = row.country_sales
        ? row.country_sales.default_level_id
        : 0;
    },
    saveEdit() {
      var data = this.editForm;
      this.loading=true
      request({
        url: "api/v1/country_sale/" + this.editForm.country_code + "/update",
        method: "post",
        data
      }).then(res => {
        if (res && res.code == 0) {
          this.dialogEdit = false;
            this.loading=false
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
        } else {
            this.loading=false
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      }).catch(rr=>{
          this.loading=false
      });
    },
    // handleDel(row) {
    //   destroy(row, "country_sale", this);
    // },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    editClose() {
      this.dialogEdit = false;
    },
    changeSale(value) {
      this.value = !value;
      if(this.value==true){
        this.queryList.sale_id = ''
        this.queryList.has_sale = 0
      }else{
        this.queryList.has_sale = 1
      }
    },
    sbaoSearch() {
      this.queryList.page = 1
      lists(this.queryList, "country_sale").then(res => {
        this.list = res.data;
      });
      this.currentPage=1
    }
  }
};
</script>