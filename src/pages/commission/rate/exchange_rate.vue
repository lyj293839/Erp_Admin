<style lang="scss" scoped type="text/scss">
.el-table {
  margin-top: 10px;
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div>
      <el-button size="mini" type="primary" @click="clickAdd()">新增</el-button>
    </div>
    <!-- 页面 -->
    <el-table :data="list.data" border fit highlight-current-row size="small">
      <el-table-column label="ID">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="货币" class="sbaoTable">
        <template slot-scope="scope">{{getEnumValue(Currency,scope.row.currency_id)}}</template>
      </el-table-column>
      <el-table-column label="汇率">
        <template slot-scope="scope">{{scope.row.rate}}</template>
      </el-table-column>
      <el-table-column label="月份">
        <template slot-scope="scope">{{scope.row.month}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.make')" width="130px">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 增加 -->
    <el-dialog title :visible.sync="dialogAdd" @close="addClose()" width="40%">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="汇率">
          <el-input size="mini" v-model="Add.rate" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="货币">
          <el-select v-model="Add.currency_id" size="mini" placeholder="请选择">
            <el-option
              v-for="item in Currency"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份">
          <el-date-picker
            v-model="Add.month"
            size="mini"
            type="month"
            value-format="yyyyMM"
            format="yyyy-MM"
            style="width:150px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveAdd()" size="mini">确定</el-button>
          <el-button @click="addClose()" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title :visible.sync="dialogEdit" @close="EditClose()" width="40%">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="汇率">
          <el-input size="mini" v-model="Edit.rate" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="货币">
          <el-select v-model="Edit.currency_id" size="mini" placeholder="请选择">
            <el-option
              v-for="item in Currency"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月份">
          <el-date-picker
            v-model="Edit.month"
            size="mini"
            type="month"
            value-format="yyyyMM"
            format="yyyy-MM"
            style="width:150px;">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveEdit()" size="mini">确定</el-button>
          <el-button @click="EditClose()" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
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
import { Rate_index, Rate_create, Rate_update } from "@/api/commission";
export default {
  name: "commission-exchange_rate",
  data() {
    return {
      list: {},
      Add: {
        rate: "",
        currency_id: "",
        month: ""
      },
      Edit: {
        id:"",
        rate: "",
        currency_id: "",
        month: ""
      },
      currentPage: 1,
      queryList: {
        page: "1",
        name: ""
      },
      loading_search: false,
      dialogAdd: false,
      dialogEdit: false,
      Currency:[]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "commission-exchange_rate") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      Rate_index(this.queryList).then(res => {
        this.list = res.data;
        this.Currency = this.GEnums.Currency
      });
    },
    handleCurrentChange(pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent;
      this.fetchData();
    },
    clickAdd() {
      this.dialogAdd = true;
    },
    saveAdd() {
      Rate_create(this.Add, this);
    },
    addClose() {
      this.dialogAdd = false;
      this.Add = {
        rate: "",
        currency_id: "",
        month: ""
      }
    },
    handleEdit(item) {
      this.Edit.id = item.id
      this.Edit.currency_id = item.currency_id
      this.Edit.rate = item.rate
      this.Edit.month = item.month.toString()
      this.dialogEdit = true;
    },
    saveEdit() {
      Rate_update(this.Edit, this);
    },
    EditClose() {
      this.dialogEdit = false;
      this.Edit = {
        id:'',
        rate: "",
        currency_id: "",
        month: ""
      }
    }
  }
};
</script>
