<style lang="scss" scoped type="text/scss">
.div {
  /deep/.el-table td {
    padding: 6px 0px;
  }
}
.el-pagination {
  text-align: right;
  margin-top: 10px;
}

.sbaoHeard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  .el-select{
    width: 120px;
    margin-right: 5px;
  }
}

.sbaoInput {
  width: 70%;
}

.sbaoHeard-one {
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: space-around;
}

.tipOne {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.sbaoClose {
  margin-left: 140px;
}

.sbaoClose:hover {
  color: black;
  background: gainsboro;
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
</style>
<template>
  <d2-container class="div">
    <div class="sbaoHeard">
      <el-button
        class="add"
        size="mini"
        type="primary"
        @click="handleAdd"
        icon="plus"
        v-if="permissions.indexOf(290)>-1"
      >{{$t('set.order.order_page.addButton')}}</el-button>
      <div>
        <el-select v-model="queryList.purchase_id" :placeholder="$t('set.order.order_page.purchases')" size="mini" clearable>
          <el-option v-for="item in saleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select v-model="queryList.status" :placeholder="$t('status')" size="mini" clearable>
          <el-option v-for="item in status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button size="mini" type="primary" @click="Search()">{{$t('search')}}</el-button>
      </div>
    </div>

    <!-- 页面 -->
    <el-table
      style="font-size: 12px"
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        :label="$t('set.order.order_page.purchases')"
        class="sbaoTable"
        width="100px"
        fixed="left"
      >
        <template slot-scope="scope">{{scope.row.purchases?scope.row.purchases.username:''}}</template>
      </el-table-column>
      <el-table-column :label="$t('set.order.order_page.current_status')" width="80px"  fixed="left">
        <template slot-scope="scope">
          <span v-if="scope.row.status==1" style="color:#67C23A;">{{getEnumValue(status_info,scope.row.status)}}</span>
          <span v-else style="color:#F56C6C;">{{getEnumValue(status_info,scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('set.order.order_page.is_continue')" width="100px">
        <template slot-scope="scope">{{scope.row.is_continue==1?scope.row.days+$t('set.order.order_page.day'):''}}</template>
      </el-table-column>
      <el-table-column :label="$t('set.order.order_page.distribution_level')" width="100px">
        <template slot-scope="scope">
          <span
            v-if="scope.row.is_continue==1"
          >Level:{{scope.row.start_level_id}}~{{scope.row.end_level_id}}</span>
        </template>
      </el-table-column>
      <tr v-for="item in levels">
        <el-table-column
          :label="$t('set.order.order_page.level')+item.num"
          width="100px"
          align="center"
        >
          <el-table-column :label="$t('set.order.order_page.is_join')" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.data?forArr(scope.row.data,item.id).is_join==1?'√':'':''}}</template>
          </el-table-column>
          <el-table-column :label="$t('set.order.order_page.nums')" align="center">
            <template
              slot-scope="scope"
            >{{scope.row.data?forArr(scope.row.data,item.id).is_join==1?forArr(scope.row.data,item.id).nums:'':''}}</template>
          </el-table-column>
        </el-table-column>
      </tr>
      <el-table-column
        :label="$t('set.order.order_page.make')"
        width="160"
        fixed="right"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
            v-if="permissions.indexOf(291)>-1"
          >{{$t('set.order.order_page.editButton')}}</el-button>
          <el-button
            style="display: none;"
            disabled
            size="mini"
            type="danger"
            @click="handleDel(scope.row)"
          >{{$t('set.order.order_page.delButton')}}</el-button>
          <el-button size="mini" type="danger" @click="operate(scope.row)" v-if="scope.row.status==1">{{$t('disable')}}</el-button>
          <el-button size="mini" type="primary" @click="operate(scope.row)" v-else>{{$t('enable')}}</el-button>
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

    <!-- 增加 -->
    <el-dialog
      class="sbaoDialog"
      title
      :visible.sync="dialogAdd"
      top="5vh"
      width="65%"
      @close="addClose()"
    >
      <el-form class="sbaoFrom" :model="addForm" label-width="120px" label-position="right">
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <el-form-item :label="$t('set.order.order_Form.purchases')" :required="true">
              <el-select v-model="addForm.purchase_id" placeholder="请选择" size="small">
                <el-option
                  v-for="item in saleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('set.order.order_Form.is_continue')">
              <el-checkbox v-model="checked"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('set.order.order_Form.days')">
              <el-input v-model="addForm.days" :disabled="!checked" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :label="$t('set.order.order_Form.level')">
              <el-row type="flex" justify="center">
                <el-col :span="10">
                  <el-form-item>
                    <el-select
                      v-model="addForm.start_level_id"
                      placeholder="请选择"
                      :disabled="!checked"
                      size="small"
                    >
                      <el-option
                        v-for="item in levels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item style="display:flex;justify-content: center;">~</el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item>
                    <el-select
                      v-model="addForm.end_level_id"
                      placeholder="请选择"
                      :disabled="!checked"
                      size="small"
                    >
                      <el-option
                        v-for="item in levels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-for="(item,index) in levels">
          <el-row type="flex">
            <el-col :span="8">
              <el-form-item :label="$t('set.order.order_Form.level')+item.num">
                <el-radio-group v-model="aas[index].join" @change="change_radio(aas[index])">
                  <el-radio :label="1">{{$t('set.order.order_Form.is_join1')}}</el-radio>
                  <el-radio :label="2">{{$t('set.order.order_Form.is_join2')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('set.order.order_Form.nums')">
                <el-input :disabled="aas[index].join==2" v-model.number="aas[index].nums" type='number' size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveAdd()"
            :loading='addForm.loading?true:false'
            size="mini"
          >{{$t('set.order.order_Form.keepButton')}}</el-button>
          <el-button @click="addClose()" size="mini">{{$t('set.order.order_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog title :visible.sync="dialogEdit" top="5vh" width="65%" @close="addClose()">
      <el-form class="sbaoFrom" :model="editForm" label-width="100px" label-position="right">
        <el-row type="flex" justify="space-around">
          <el-col :span="8">
            <el-form-item :label="$t('set.order.order_Form.purchases')">
              <el-select v-model="editForm.purchase_id" placeholder="请选择" size="small">
                <el-option
                  v-for="item in saleList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('set.order.order_Form.is_continue')">
              <el-checkbox v-model="checked"></el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('set.order.order_Form.days')">
              <el-input v-model="editForm.days" :disabled="!checked" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item :label="$t('set.order.order_Form.level')">
              <el-row type="flex" justify="center">
                <el-col :span="10">
                  <el-form-item>
                    <el-select
                      v-model="editForm.start_level_id"
                      placeholder="请选择"
                      :disabled="!checked"
                      size="small"
                    >
                      <el-option
                        v-for="item in levels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item style="display:flex;justify-content: center;">~</el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item>
                    <el-select
                      v-model="editForm.end_level_id"
                      placeholder="请选择"
                      :disabled="!checked"
                      size="small"
                    >
                      <el-option
                        v-for="item in levels"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <div v-for="(item,index) in levels">
          <el-row type="flex">
            <el-col :span="8">
              <el-form-item :label="$t('set.order.order_Form.level')+item.num">
                <el-radio-group v-model="aas[index].join" @change="change_radio(aas[index])">
                  <el-radio :label="1">{{$t('set.order.order_Form.is_join1')}}</el-radio>
                  <el-radio :label="2">{{$t('set.order.order_Form.is_join2')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('set.order.order_Form.nums')">
                <el-input :disabled="aas[index].join==2" v-model.number="aas[index].nums" type='number' size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveEdit()"
            :loading='editForm.loading?true:false'
            size="mini"
          >{{$t('set.order.order_Form.keepButton')}}</el-button>
          <el-button @click="addClose()" size="mini">{{$t('set.order.order_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import axios from "axios";
import { destroy, create, update, listTotal,lists ,set_status} from "@/api/order";
import { request } from "http";
export default {
  name: "Set-order",
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      aas: [],
      searchInput: "",
      checked: false,
      list: [],
      levels: [],
      saleList: [],
      currentPage: 1,
      address: "",
      queryList: {
        page: "1",
        purchase_id: "",
        status: ""
      },
      dialogAdd: false,
      addForm: {
        purchase_id: "",
        is_continue: 0,
        start_level_id: 1,
        end_level_id: 1,
        days: 0,
        data: [],
        loading:false
      },
      addForm_loadingSave: false,
      dialogEdit: false,
      editForm: {
        id: "",
        purchase_id: "",
        is_continue: 0,
        start_level_id: "",
        end_level_id: "",
        days: "",
        data: [],
        loading:false
      },
      editForm_loadingSave: false,
      status_info: [],
      loading:false
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Set-order") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    operate(item){
      var status = ''
      item.status==1?status=2:status=1
      set_status(status,item.id,this)
    },
    selected_country_address(id) {
      city_list(id).then(res => {
        this.city = res.data;
      });
    },
    forArr(arr, index) {
      var a = [];
      a = arr.filter(item => {
        return index == item.level_id;
      });
      if (a.length !== 0) {
        return a[0];
      } else {
        a = [{ nums: "", level_id: "", is_join: "0" }];
        return a[0];
      }
    },
    change_radio(val){
        if(val.join==2){
            val.nums=''
        }
    },
    fetchData() {
      lists(this.queryList,"level_purchase").then(res => {
        this.levels = res.enum.levels;
        this.status_info = res.enum.status_info;
        this.list = res.data;
        var leh = this.levels.length;
        for (var i = 0; i < leh; i++) {
          var item = { join: 2, nums: "" };
          this.aas.push(item);
        }
      });
      listTotal("data/user_list?user_type=101").then(res => {
        this.saleList = res.data;
      });
    },
    handleAdd() {
      this.addForm = {
        purchase_id: "",
        is_continue: 0,
        start_level_id: 1,
        end_level_id: 1,
        days: 0,
        data: [],
        loading:false
      };
      this.dialogAdd = true;
    },
    saveAdd() {
      if (this.checked) {
        this.addForm.is_continue = 1;
      } else {
        this.addForm.is_continue = 2;
      }
      for (var i = 0; i < this.levels.length; i++) {
        var ss = {};
        ss.level_id = this.levels[i].id.toString();
        ss.is_join =this.aas[i].join == "1" ? this.aas[i].join.toString() : "2";
        ss.nums = this.aas[i].nums ? this.aas[i].nums : "0";
        // if (ss.is_join != "2" || ss.nums != "0") {
        //   this.addForm.data.push(ss);
        // }
        this.addForm.data.push(ss);
      }
      this.addForm.start_level_id = parseInt(this.addForm.start_level_id);
      this.addForm.end_level_id = parseInt(this.addForm.end_level_id);
      this.addForm.days = parseInt(this.addForm.days);
      create(this.addForm, "level_purchase", "create", this);
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.editForm.id = row.id;
      this.editForm.purchase_id = row.purchase_id;
      this.editForm.is_continue = row.is_continue;
      this.editForm.start_level_id = row.start_level_id;
      this.editForm.end_level_id = row.end_level_id;
      this.editForm.days = row.days;
      this.levels.forEach((item, index) => {
        for (var i = 0; i < row.data.length; i++) {
          if (row.data[i].level_id == item.id) {
            this.aas[index].join =
              row.data[i].is_join == "1" ? parseInt(row.data[i].is_join) : 2;
            this.aas[index].nums = row.data[i].nums;
          }
        }
      });
      if (row.is_continue == 1) {
        this.checked = true;
      }
    },
    saveEdit() {
      if (this.checked) {
        this.editForm.is_continue = 1;
      } else {
        this.editForm.is_continue = 2;
        this.editForm.days = 0;
        this.editForm.start_level_id = 1;
        this.editForm.end_level_id = 1;
      }
        for (var i = 0; i < this.levels.length; i++) {
        var ss = {};
        ss.level_id = this.levels[i].id.toString();
        ss.is_join = this.aas[i].join == "1" ? this.aas[i].join.toString() : 2;
        ss.nums = this.aas[i].nums ? this.aas[i].nums : "0";
        if (ss.is_join != "2" || ss.nums != "0") {
          this.editForm.data.push(ss);
        }
      }
      update(this.editForm, "level_purchase", "update", this);
      this.editForm.data = [];
      this.aas=[]
    },
    handleDel(row) {
      destroy(row, "level_purchase", "destroy", this, row.id);
    },
    addClose() {
      this.addForm = {
        purchase_id: "",
        is_continue: 0,
        start_level_id: "",
        end_level_id: "",
        days: "",
        data: []
      };
      this.dialogAdd = false;
      this.checked = false;
      this.dialogEdit = false;
      this.aas.forEach(item => {
        item.join = 2;
        item.nums = "";
      });
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    Search(){
      this.queryList.page = 1
      this.fetchData()
    }
  }
};
</script>
