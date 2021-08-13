<style lang="scss" scoped type="text/scss">
.sbaoHeard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
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

.el-table {
  background: #d9edf6;
}
.log_table{
  table{
    td{
      line-height: 25px;
      padding: 0px 5px;
    }
  }
}
</style>
<template>
  <d2-container>
    <div>
      <el-row style="margin: 10px 0;">
        <el-col :span="1">
          <el-button
            size="mini"
            type="primary"
            @click="clickAdd()"
            v-if="permission_names['documentary.create']=='documentary.create'"
          >新增</el-button>
        </el-col>
        <el-col :span="23" style="text-align: right;">
          <el-input
            v-model="queryList.pod_id"
            style="width: 150px;margin:0 5px;"
            size="mini"
            clearable
            placeholder="子合同号"
          ></el-input>
          <el-input
            v-model="queryList.cas"
            style="width: 150px;"
            size="mini"
            clearable
            placeholder="CAS"
          ></el-input>
          <el-select
            v-model="queryList.supplier_id"
            placeholder="供应商"
            size="mini"
            filterable
            remote
            reserve-keyword
            :remote-method="supplyMethod"
            :loading="supplyloading"
            style="width: 180px;margin: 0px 5px; margin-top: 5px;"
            clearable
            @clear='clearable_'
            v-if="user_type!=102"
          >
            <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
          <el-select
            v-model="queryList.purchase_user_id"
            placeholder="采购员"
            size="mini"
            clearable
            style="width:120px;margin:0 5px;"
          >
            <el-option
              v-for="item in purchaseList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.sale_id"
            placeholder="销售员"
            size="mini"
            clearable
            style="width:120px;margin:0 5px;"
          >
            <el-option
              v-for="item in Sales"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-select
                v-model="queryList.apply_user_id"
                placeholder="申请人"
                size="mini"
                clearable
                style="width:120px;margin:0 5px;"
          >
            <el-option
                v-for="item in Users"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.currentState"
            clearable
            size="mini"
            style="width: 110px;"
            placeholder="跟单状态"
          >
            <el-option v-for="(item,key,index) in places" :key="index" :label="item" :value="key"></el-option>
          </el-select>
          <el-input
            v-model="queryList.total_money"
            style="width: 160px;margin: 0px 5px; margin-top: 5px;"
            size="mini"
            placeholder="订单金额"
            clearable
          >
            <el-select v-model="queryList.total_money_op" clearable slot="prepend" size="mini" style="width: 60px;" placeholder>
              <el-option
                      v-for="i in GEnums_OP"
                      :key="i.name"
                      :label="i.name"
                      :value="i.name">
              </el-option>
            </el-select>
          </el-input>
          <el-input
            v-model="queryList.overdue_dates"
            style="width: 160px;margin-top: 5px;"
            size="mini"
            placeholder="逾期天数"
            clearable
          >
            <el-select v-model="queryList.overdue_dates_op" clearable slot="prepend" size="mini" style="width: 60px;" placeholder>
              <el-option
                      v-for="i in GEnums_OP"
                      :key="i.name"
                      :label="i.name"
                      :value="i.name">
              </el-option>
            </el-select>
          </el-input>
          <el-button
            type="primary"
            size="mini"
            :loading="loading_search"
            @click="search()"
            style="margin:0 5px;"
          >{{$t('search')}}</el-button>
          <el-button
            type="primary"
            size="mini"
            :loading="loading_e"
            @click="doExport()"
            v-if="permission_names['documentary.export']=='documentary.export'"
          >导出</el-button>
          <a :href="prod_export_url" ref="prod_export_url" hidden></a>
          <el-button
            type="primary"
            size="mini"
            @click="inExport()"
            v-if="permission_names['documentary.upload_list']=='documentary.upload_list'"
          >导入</el-button>
          <!-- <el-upload
                style="display: inline-block;"
                class="upload-demo"
                ref="upload"
                :action='upload_api'
                :data='form'
                :headers='headers'
                :before-remove="beforeRemove"
                multiple
                :limit="1"
                :on-success="handleAvatarSuccess"
                :auto-upload="true"
                :show-file-list='false'
                accept=".xlsx"
                :file-list="fileList">
            <el-button size="mini" type="primary">导入</el-button>
        </el-upload> -->
        </el-col>
      </el-row>
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
      <el-table-column label="ID" width="60px">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="子合同" min-width="100px">
        <template slot-scope="scope">{{scope.row.pod.procurement_contract_number}}</template>
      </el-table-column>
      <el-table-column label="合同时间" width="90px">
        <template slot-scope="scope">{{scope.row.pod.created_at}}</template>
      </el-table-column>
      <el-table-column label="项目号" width="100px">
        <template slot-scope="scope">{{scope.row.pod.contract_number}}</template>
      </el-table-column>
      <el-table-column label="cas" width='100'>
        <template slot-scope="scope">{{scope.row.pod.cas}}</template>
      </el-table-column>
      <el-table-column label="供应商" min-width="150px" v-if="user_type!=102">
        <template slot-scope="scope">{{scope.row.pod.procurement_contract.supplier_name}}</template>
      </el-table-column>
      <el-table-column label="订单数量" width='90'>
        <template slot-scope="scope">{{scope.row.pod.quantity}}{{getEnumValue(Unit,scope.row.pod.quantity_unit)}}</template>
      </el-table-column>
      <el-table-column label="订单金额" width='90'>
        <template slot-scope="scope">{{scope.row.pod.total_price}}{{getEnumValue(GEnums.Currency,scope.row.pod.currency_id)}}</template>
      </el-table-column>
      <el-table-column label="产品纯度" width='70'>
        <template slot-scope="scope">{{scope.row.pod.purity}}</template>
      </el-table-column>
      <el-table-column label="交货期" width="90px">
        <template slot-scope="scope">{{scope.row.pod.delivery_date}}</template>
      </el-table-column>
      <el-table-column label="逾期天数" width="80px">
        <template slot-scope="scope" :style="scope.row.pod.over_due_receiving_product&&Number(scope.row.pod.over_due_receiving_product>0)?'color:red;':''">
          {{scope.row.pod.over_due_receiving_product}}
        </template>
      </el-table-column>
      <el-table-column label="销售员" width='60'>
        <template slot-scope="scope">{{getEnumValue(Sales,scope.row.pod.procurement_contract.sale_id)}}</template>
      </el-table-column>
      <el-table-column label="采购员" width='60'>
        <template slot-scope="scope">{{getEnumValue(purchaseList,scope.row.purchase_user_id)}}</template>
      </el-table-column>
      <el-table-column label="申请人" width="60px">
        <template slot-scope="scope">{{getEnumValue(Users,scope.row.apply_user_id)}}</template>
      </el-table-column>
      <el-table-column label="申请时间" width='90'>
        <template slot-scope="scope">{{scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column label="跟单状态" width="70px">
        <template slot-scope="scope">{{places[scope.row.currentState]}}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.aaa" :key='index'>
              <el-button
                type="primary"
                @click="confirmed(item)"
                size="mini"
                style="margin-right:5px;margin-top:5px;"
                v-if="permission_names[item.permission]==item.permission"
              >{{item.name}}</el-button>
          </span>
          <el-button
              type="primary"
              size="mini"
              style="margin-right:5px;margin-top:5px;"
              v-if='scope.row.logs.length>0'
              @click="logs_click(scope.row.logs)"
          >Logs</el-button>
        </template>

      </el-table-column>
    </el-table>

    <!-- 新增 -->
    <el-dialog title :visible.sync="dialogAdd" width="30%">
      <el-form>
        <el-form-item>
          <el-input size="mini" v-model="number" style="width:90%;" placeholder="请输入合同号"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="saveAdd()" size="mini">确定</el-button>
          <el-button @click="dialogAdd = false" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 审核 -->
    <el-dialog :title="list_Confirmed.name" :visible.sync="dialogConfirmed" width="20%">
      <div style="display:flex;justify-content: space-between;width:100%;">
        <div></div>
        <el-select size="mini" v-model="list_Confirmed.obj" clearable style="width:150px;">
          <el-option v-for="i in list_Confirmed.list" :key="i.val" :label="i.name" :value="i.val"></el-option>
        </el-select>
        <el-button @click="Confirmed_save(list_Confirmed)" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>

    <!-- 跟单 -->
    <el-dialog title="跟单Log" :visible.sync="dialogDoc" width="30%">
      <div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          style="width:100%;"
          v-model="docing_list.log">
        </el-input>
      </div>
      <div style="text-align:right;margin-top:20px;">
        <el-button @click="docing_save()" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>

    <!-- 更新 -->
    <el-dialog title="更新Log" :visible.sync="dialogUpdate" width="30%">
      <div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          style="width:100%;"
          v-model="update_list.log">
        </el-input>
      </div>
      <div style="text-align:right;margin-top:20px;">
        <el-button @click="update_save()" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>

    <!-- logs -->
    <el-dialog :visible.sync="dialogLogs" width="40%" class="log_table">
      <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
        <tr style="font-weight: bold;">
          <td width='50'>ID</td>
          <td width='140'>时间</td>
          <td width='60'>用户</td>
          <td>log</td>
        </tr>
        <tr v-for="item in logs_list" :key='item.id'>
          <td>{{item.id}}</td>
          <td>{{item.created_at}}</td>
          <td>{{getEnumValue(Users,item.user_id)}}</td>
          <td>{{item.log}}</td>
        </tr>
      </table>
    </el-dialog>

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
  documentary_index,
  documentary_create,
  documentary_make,
  documentary_export,
  documentary_update,
  documentary_docing
} from "@/api/commission";
import { getShevies, supplier_lists } from "@/api/instore";
export default {
  name: "commission-documentary",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      list: {},
      number: "",
      currentPage: 1,
      queryList: {
        page: 1,
        pod_id: "",
        currentState: "",
        settle_at_start: "",
        settle_at_end: "",
        purchase_user_id: "",
        sale_id:'',
        cas:'',
        overdue_dates_op:'',
        overdue_dates:'',
        total_money_op:'',
        total_money:''
      },
      list_Confirmed: {},
      logs_list:[],
      supply_list:[],
      docing_list:{},
      update_list:{
        documentary_id:'',
        log:''
      },
      // form:{},
      // upload_api: process.env.VUE_APP_API + 'api/v1/documentary/upload',
      prod_export_url: "",
      loading_search: false,
      dialogLogs:false,
      loading_e: false,
      dialogAdd: false,
      dialogConfirmed: false,
      dialogUpdate:false,
      dialogDoc:false,
      supplyloading: false,
      user_type:'',
      Users: [],
      Sales:[],
      places: [],
      purchaseList: [],
      Unit:[]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "commission-documentary") {
        this.fetchData();
      }
    }
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
  created() {
    this.fetchData();
    this.user_type = util.cookies.get("user_type");
  },
  methods: {
    fetchData() {
      documentary_index(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.loading_search = false;
        }
        this.list = res.data;
        this.list.data.forEach(i => {
          i.aaa = [];
          this.workflow(
            i.id,
            i.workflow.enabledTrans,
            i.workflow.i18n,
            i.aaa,
            i.workflow.routes
          );
        });
        this.Users = this.GEnums.Users;
        this.purchaseList = this.GEnums.Purchases;
        this.Unit = this.GEnums.Unit;
        this.Sales = this.GEnums.Sales
        this.places = this.list.data[0].workflow.i18n.zh_cn.places;
      });
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
    },
    clearable_(){
      this.supplyloading = false;
      this.supply_list = []
    },
    search() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.fetchData();
    },
    logs_click(list){
      this.logs_list = []
      this.logs_list = list
      this.dialogLogs = true
    },
    // beforeRemove(file, fileList) {
    //     return this.$confirm(`确定移除 ${file.name}？`)
    // },
    // handleAvatarSuccess(res, file, fileList) {
    //     if (file.response.code == 0) {
    //         this.$message({
    //             message: 'success',
    //             type: 'success'
    //         })
    //         this.fileList = []
    //         this.inExport()
    //     } else {
    //         this.$message.error(file.response.msg)
    //     }
    // },
    inExport(){
      this.$router.push({
        path: '/commission/documentary/leading_in',
        name: 'commission-leading_in',
      })
    },
    doExport() {
      this.loading_e = true;
      documentary_export(this.queryList)
        .then(res => {
          if (res && res.code === 0) {
            this.prod_export_url = res.data;
            setTimeout(() => {
              this.$refs.prod_export_url.click();
              this.loading_e = false;
            }, 200);
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.loading_e = false;
          }
        })
        .catch(rr => {
          this.loading_e = false;
        });
    },
    confirmed(item) {
      if(item.list.length>1){
        this.list_Confirmed = JSON.parse(JSON.stringify(item));
        this.dialogConfirmed = true;
      }else if(item.name == '更新'){
        this.update_list = {
          id:item.id,
          log:''
        }
        this.dialogUpdate = true
      }else if(item.name == '跟单'){
        this.docing_list = {
          id:item.id,
          log:''
        }
        this.docing_list[item.obj_name] = item.list[0].val;
        this.dialogDoc = true
      }else{
        var obj = {
          id: item.id
        };
        obj[item.obj_name] = item.list[0].val;
        documentary_make(item.url, obj, this);
      }
    },
    update_save(){
      documentary_update(this.update_list, this);
    },
    docing_save(){
      documentary_docing(this.docing_list, this);
    },
    Confirmed_save(item) {
      var obj = {
        id: item.id
      };
      obj[item.obj_name] = item.obj;
      documentary_make(item.url, obj, this);
    },
    clickAdd() {
      this.number = "";
      this.dialogAdd = true;
    },
    saveAdd() {
      var obj = {
        pod_id: this.number
      };
      documentary_create(obj).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.fetchData()
          this.dialogAdd = false
        } else {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      }).catch(rr => {
      })
    },
    handleCurrentChange(pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent;
      this.fetchData();
    }
  }
};
</script>
