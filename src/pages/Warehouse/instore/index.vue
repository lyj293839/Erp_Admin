<style lang="scss" scoped type="text/scss">
.heard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-input {
      margin: 0px 5px;
    }
    .el-select {
      margin: 0px 5px;
      width: 50%;
      /deep/.el-select__tags{
        max-width:none !important;
      }
    }
  }
}
/deep/ .box_card {
  width: 98%;
  margin: 10px auto;
  font-size: 13px;
  background: #f7f9fa;
  .el-card__body {
    padding: 0px !important;
  }
  .ul1 {
    margin: 0px;
    padding: 0px;
    width: 100%;
    list-style: none;
    display: flex;
    justify-content: flex-start;
    background: white;
    border-bottom: 1px solid #e9e9e9;
    li {
      width: (100 / 6) * 100%;
      border-left: 1px solid #e9e9e9;
      padding: 20px 10px;
      color: #8d8d8d;
    }
  }
  .ul2 {
    padding: 0px;
    margin: 5px 0px;
    list-style: none;
    display: flex;
    li {
      padding: 0px 30px;
      display: flex;
      align-items: center;
      border-left: 1px solid #e9e9e9;
      color: #8d8f8f;
      span {
        cursor: pointer;
      }
      .el-button {
        color: #8d8f8f;
      }
    }
  }
}
/deep/.el_table {
  .el-table__expanded-cell {
    padding: 0px;
    padding-bottom: 10px;
  }
}
.div {
  table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 13px;

    td,
    th {
      padding: 7px;
      line-height: 20px;
    }
  }
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard" v-if="!dialogForm">
      <div>
        <!--<el-button type="primary" @click="add" size="mini" v-if="permissions.indexOf(255)>-1">采购入库</el-button>-->
      </div>
      <div>
        <!-- <el-select
                v-model="queryList.supplier_id"
                placeholder="供应商"
                size="mini"
                filterable
                remote
                reserve-keyword
                :remote-method="supplyMethod"
                :loading="supplyloading"
                style="width: 800px"
                clearable
        >
          <el-option
                  v-for="item in supply_list"
                  :label="item.name"
                  :key="item.id"
                  :value="item.id"
          ></el-option>
        </el-select>-->
        <el-date-picker
                class="date_picker d2-ml-5"
                v-model="queryList.instored_start"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                placeholder="入库开始"
                size="mini"
                style="width: 125px;"
        ></el-date-picker>
        <el-date-picker
                class="date_picker d2-ml-5"
                v-model="queryList.instored_end"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                placeholder="入库结束"
                size="mini"
                style="width: 125px;"
        ></el-date-picker>
        <el-autocomplete
          v-model="supplier_name"
          label="address"
          :fetch-suggestions="querySearch"
          @select="handleSelect"
          placeholder="供应商"
          :trigger-on-focus="false"
          size="mini"
          style="width: 200px"
          clearable
        >
          <template slot-scope="{ item }">
            <div>{{ item.name }}</div>
          </template>
        </el-autocomplete>
        <el-input placeholder="快递单号" ref="express"   clearable v-model="queryList.express_number" size="mini" style="width:150px;" @keyup.enter.native="Search"></el-input>
        <el-input placeholder="合同号" clearable v-model="queryList.contract_number" size="mini" style="width:200px;"></el-input>
        <el-input placeholder="CAS" clearable v-model="queryList.cas" size="mini" style="width:180px;"></el-input>
        <el-select placeholder="入库状态" clearable v-model="queryList.storage_status" multiple size="mini" style="width:100px;">
          <el-option v-for="i in storage_status" :key="i.id" :label="i.name" :value="i.id"></el-option>
        </el-select>
        <el-button type="primary" :loading="loading_search" @click="Search()" size="mini">搜索</el-button>
        <el-button
                class="d2-ml-5"
                size="mini"
                type="primary"
                v-if="permission_names['storageIn.export']=='storageIn.export'"
                :loading="loading_e"
                @click="doExport"
        >导出
        </el-button>
        <a :href="prod_export_url" ref="prod_export_url" hidden></a>
      </div>
    </div>
    <div class="div" v-if="!dialogForm">
      <div v-for="item in list.data" style="margin-top:20px;">
        <table border="1" bordercolor="#E5E5E5">
          <tr style="background: #f2f2f2;font-weight:bold;line-height: 30px;">
            <td width="30px">ID</td>
            <td width="100px">合同编号</td>
            <td width="50px;">采购员</td>
            <td width="80px;">CAS</td>
            <td width="70px">合同日期</td>
            <td width="300px;" colspan="4">产品名称</td>
            <td width="110px;">包装等级/危险性</td>
            <td width="150px;" colspan="3">供应商</td>
            <td width="50px;">纯度</td>
            <td width="60px;">数量</td>
            <td width="60px;">入库状态</td>
            <td width='60'>操作</td>
          </tr>
          <tr>
            <td>{{item.id?item.id:''}}</td>
            <td>{{item.procurement_contract?item.procurement_contract.contract_number:''}}</td>
            <td>{{getEnumValue(Users,item.purchase_user_id)}}</td>
            <td>{{item.cas}}</td>
            <td >{{item.procurement_contract.contract_date}}</td>
            <td colspan="4">
              {{item.name_cn}}
              <br/>
              {{item.name}}
            </td>
            <td>
              <span v-if="item.chemproperty">{{item.chemproperty.packinggroup}}</span>
              <br />
              <span v-if="item.chemproperty">{{item.chemproperty.uncode}}</span>
            </td>
            <td colspan="3">{{item.procurement_contract.supplier_name}}
              <el-tag v-if="item.consign_batchno" type="danger" size="mini">寄售</el-tag>
            </td>
            <td>{{item.purity}}</td>
            <td>{{item.quantity}}{{getEnumValue(units,item.quantity_unit)}}</td>
            <td>{{getEnumValue(storage_status,item.storage_status)}}</td>
            <td>
              <div style="text-align:center;">
                <el-button
                size="mini"
                type="primary"
                @click="inStock(item,1)"
                v-if="permissions.indexOf(271)>-1&&item.is_old!=1&&!item.consign_batchno"
              >样品入库</el-button>
              <!-- <el-button
                size="mini"
                type="primary"
                @click="v_inStock(item)"
                v-if="permissions.indexOf(271)>-1&&item.is_old!=1"
              >虚拟入库</el-button> -->
              </div>
              <div style="text-align:center;margin-top:5px;">
                <el-button
                size="mini"
                type="primary"
                @click="inStock(item,2)"
                v-if="permissions.indexOf(271)>-1&&item.is_old!=1&&!item.consign_batchno"
              >非样品入库</el-button>
              </div>
              <div style="text-align:center;margin-top:5px;">
                <el-button
                        size="mini"
                        type="primary"
                        @click="consign_instore(item)"
                        :loading="item.consignLoading"
                        v-if="item.consign_batchno&&item.is_old!=1&&permission_names['inventory.consign_instore']=='inventory.consign_instore'"
                >寄售入库</el-button>
              </div>
            </td>
          </tr>
          <tr v-if="item.inventories&&item.inventories.length>0">
            <td>ID</td>
            <td>仓库</td>
            <td>操作员</td>
            <td>入库日期</td>
            <!-- <td>包装类型</td> -->
            <td width="70px">样品</td>
            <td width="50px">净重</td>
            <td width="50px">毛重</td>
            <td width="60px">包装数量</td>
            <td width='60'>性状外观</td>
            <td>批次</td>
            <td>来货包装</td>
            <td>存储条件</td>
            <td>纯度</td>
            <td>货位</td>
            <td colspan="2">快递单号/快递费用</td>
            <td>操作</td>
          </tr>
          <tr v-if="item.inventories&&item.inventories.length>0" v-for="i in item.inventories">
            <td>{{i.id?i.id:''}}</td>
            <td>{{getEnumValue(warehouse,i.warehouse_id)}}</td>
            <td>{{getEnumValue(Users,i.operator_id)}}</td>
            <!-- <td>
              <span v-if="i.unit_id==7">包装</span>
              <span v-else>散装</span>
            </td> -->
            <td>{{i.instored_at?i.instored_at.substring(0,10):''}}</td>
            <td>{{i.is_sample==1?'样品':'非样品'}}</td>
            <td>{{i.quantity}}{{getEnumValue(units,i.unit_id)}}</td>
            <td>{{i.netweightinfo}}</td>
            <td>{{i.packinginfo}}</td>
            <td>
              <span
                v-if="i.chemprodappearance_id"
              >{{getEnumValue(ChemicalAppearance,i.chemprodappearance_id)}}</span>
            </td>
            <td>
              <span>{{i.batchno}}</span>
              <span v-if="i.supplier_batchno">供:{{i.supplier_batchno}}</span>
            </td>
            <td>
              <span>{{getEnumValue(virtual_units,i.in_virtualunit_id)}}</span>
            </td>
            <td>
              <span v-for="(j,index) in i.storage_cond" :key="index">
                {{getEnumValue(StorageCondition,j)}}
                <span v-if="index!=(i.storage_cond.length-1)">,</span>
              </span>
            </td>
            <td>{{i.purity}}</td>
            <td>{{i.shelf}}</td>
            <td colspan="2">{{i.express_number}}<br>{{i.express_fee}}</td>
            <td style="text-align:center;"><el-button size="mini" type="primary" @click="print(i,item.cas)">打印</el-button></td>
          </tr>
        </table>
      </div>
    </div>
    <!-- <div v-if="dialogForm">
      <Form
        @FormClose="FormClose($event)"
        @refresh="refresh()"
        :v_stock='v_stock'
        :is_sample ='is_sample'
        :datas="contract_detail"
        :enums="enums"
        :express_number="queryList.express_number"
      ></Form>
    </div> -->

    <!-- 分页 -->
    <el-pagination
      v-if="!dialogForm"
      background
      style="text-align: right;margin-top: 10px;"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev,pager,next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import { lists, destroy, update, list_Total, listTotal } from "@/api/prod";
import { supplier_lists,storageIn_export,consign_instore } from "@/api/instore";
import Form from "../instore/instore_form2";
import { request } from "http";
import $ from "jquery";
export default {
  name: "Warehouse-instore",
  components: {
    Form
  },
  data() {
    return {
      loading_search: false,
      is_sample:'',
      permissions: JSON.parse(localStorage.getItem("permissions")),
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      expands: [],
      list: [],
      listYe: 1,
      listTotal: [],
      dialogForm: false,
      loading_e:false,
      consignLoading:false,
      currentPage: 1,
      supplier_name:'',
      prod_export_url:'',
      v_stock:false,
      queryList: {
        page: "1",
        supplier_id: "",
        express_number: "",
        contract_number: "",
        cas: "",
        instored_start:'',
        instored_end:'',
        storage_status: []
      },
      enums: [],
      supply_list: [],
      supplyloading: false,
      storage_status: [],
      units: [],
      contract_detail: [],
      Packagelevel: [],
      ChemicalAppearance: {},
      StorageCondition: {},
      virtual_units: {},
      Users:[],
      warehouse:[]
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-instore") {
        // this.$refs.express.focus()
        // this.fetchData()
        if(from.name == "Warehouse-instore_form2"){
          this.fetchData()
        }
      }
    },
    'supplier_name':{
      deep:true,
      handler: function (newVal,oldVal){
          this.queryList.supplier_id = ''
      }
    }
  },
  created() {
    this.units = this.GEnums?this.GEnums.Unit:[];
    this.Packagelevel = this.GEnums?this.GEnums.Packagelevel:[];
    this.ChemicalAppearance = this.GEnums?this.GEnums.ChemicalAppearance:[];
    this.StorageCondition = this.GEnums?this.GEnums.StorageCondition:[];
    this.virtual_units = this.GEnums?this.GEnums.Virtualunits:[];
    this.Users = this.GEnums?this.GEnums.Users:[]
    this.warehouse = this.GEnums?this.GEnums.Warehouse:[]
    this.fetchData();
  },
  mounted() {
    // this.$refs.express.focus()
  },
  methods: {
    consign_instore(item){
        item.consignLoading=true
        consign_instore({id:item.id}).then(res => {
            if (res && res.code == 0) {
                item.consignLoading=false
                this.$message({
                    message: 'success',
                    type: 'success',
                });
                this.fetchData()
            }else{
                item.consignLoading=false
                this.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        }).catch(rr=>{
            item.consignLoading=false
        })
    },
    querySearch(queryString, cb) {
      supplier_lists(queryString).then(res => {
        var restaurants =res.data
        cb(restaurants);
      });
    },
    handleSelect(item) {
      this.supplier_name = item.name
      setTimeout(() => {
            this.queryList.supplier_id = item.id;
          }, 200)
    },
    doExport(){
      this.loading_e = true
      storageIn_export(this.queryList).then(res => {
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
    fetchData() {
      lists(this.queryList, "storageIn").then(res => {
        if (this.loading_search) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.loading_search = false;
        }
        res.data.data.forEach((items, index) => {
          // this.expands.push(items.id);
            items.consignLoading=false
        });
        this.list = res.data;
        this.enums = res.enum;
        this.storage_status = res.enum.storage_status;
        // this.units = this.GEnums?this.GEnums.Unit:[];
        // this.Packagelevel = this.GEnums?this.GEnums.Packagelevel:[];
        // this.ChemicalAppearance = this.GEnums?this.GEnums.ChemicalAppearance:[];
        // this.StorageCondition = this.GEnums?this.GEnums.StorageCondition:[];
        // this.virtual_units = this.GEnums?this.GEnums.Virtualunits:[];
        // this.Users = this.GEnums?this.GEnums.Users:[]
        // this.warehouse = this.GEnums?this.GEnums.Warehouse:[]
        // this.queryList.supplier_id = ''
      });
    },
    // supplyMethod(query) {
    //   if (query !== "") {
    //     this.supplyloading = true;
    //     setTimeout(() => {
    //       supplier_lists(query).then(res => {
    //         this.supply_list = res.data;
    //         this.supplyloading = false;
    //       });
    //     }, 200);
    //   } else {
    //     this.supply_list = [];
    //   }
    // },
    print(item,cas) {
      var storage_cond = ''
      if(item.storage_cond&&item.storage_cond.length>0){
        item.storage_cond.forEach((i,index)=>{
          if(index!=(item.storage_cond.length-1)){
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)+'、'
          }else{
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)
          }
        })
      }
      let data = {
        批号: item.batchno,
        存储条件:storage_cond,
        外观: item.chemprodappearance_id
          ? this.getEnumValue(
              this.ChemicalAppearance,
              item.chemprodappearance_id
            )
          : "",
        数量: item.quantity + this.getEnumValue(this.units, item.unit_id),
        货架: item.shelf,
        CAS: cas,
        id: item.batchno,
        configID: 1
      };
      $.ajax({
        url: "http://127.0.0.1:8080/mac/codePrint.jsp",
        method: "post",
        data: data,
        success: function(res) {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        },
        error: function() {},
      });
    },
    // rowClick(row, event, column) {
    //   Array.prototype.remove = function(val) {
    //     let index = this.indexOf(val);
    //     if (index > -1) {
    //       this.splice(index, 1);
    //     }
    //   };
    //   if (this.expands.indexOf(row.id) < 0) {
    //     this.expands.push(row.id);
    //   } else {
    //     this.expands.remove(row.id);
    //   }
    // },
    add() {
      this.$router.push({
        path: "/Warehouse/instoreForm",
        name: "Warehouse-instoreForm"
      });
    },
    inStock(item,is_sample) {
      // this.dialogForm = true;
      // this.contract_detail = item;
      // this.is_sample=is_sample
      // this.v_stock = false
      this.$router.push({
                    path: "/Warehouse/instore_form2",
                    name: "Warehouse-instore_form2",
                    query: {
                        id: item.id,
                        express_number:this.queryList.express_number,
                        v_stock:false,
                        is_sample:is_sample
                    }
                });
    },
    v_inStock(item) {
      this.dialogForm = true;
      this.contract_detail = item;
      this.v_stock = true
    },
    refresh() {
      this.dialogForm = false;
      this.fetchData();
    },
    FormClose(event) {
      this.dialogForm = event;
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    Search() {
      if(!this.supplier_name){
        this.queryList.supplier_id = ''
      }else{
        if(!this.queryList.supplier_id){
          this.queryList.supplier_id = this.supplier_name
        }
      }
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.fetchData();
    }
  }
};
</script>
