<style lang="scss" scoped type="text/scss">
  .sbaoHeard {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    div {
      width: 200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
  .sbaoFrom {
    .el-checkbox {
      margin: 0px;
      width: 13%;
    }
  }
  /deep/ .el-table .cell{
    padding: 0 5px!important;
  }
</style>
<template>
  <d2-container>
    <div class="sbaoHeard" v-if="dialogIndex">
      <!--<el-button type="primary" @click="handleAdd()" size="mini" v-if="permissions.indexOf(73)>-1">新增</el-button>-->
      <div>
        <el-checkbox v-model="checked_all" @change="handleCheckAll()" style="margin-right:0px;">全选</el-checkbox>
        <el-button type="primary" @click="handleContract(checkItem)" size="mini" v-if="permissions.indexOf(84)>-1">建立合同</el-button>
      </div>
       <el-input
              v-model="queryList.cas"
              placeholder="cas"
              size="mini"
              clearable
              style="width: 140px;margin: 0 2px;"
      ></el-input>
      <el-input
              v-model="queryList.contract_number"
              placeholder="销售合同号"
              size="mini"
              clearable
              style="width: 140px;margin: 0 2px;"
      ></el-input>
      <el-date-picker
              type="date"
              placeholder="通知单开始日期"
              clearable
              v-model="queryList.date_start"
              value-format="yyyy-MM-dd"
              style="width:160px;"
              size="mini"
      ></el-date-picker>
      <el-date-picker
              size="mini"
              type="date"
              clearable
              placeholder="通知单结束日期"
              v-model="queryList.date_end"
              style="width:160px;"
              value-format="yyyy-MM-dd"
      ></el-date-picker>
      <!-- <el-select v-model="queryList.purchase_user_id"  placeholder="采购人员" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in purchaseList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select> -->
      <el-select
              v-model="queryList.supplier_id"
              filterable
              remote
              reserve-keyword
              :remote-method="remoteMethod"
              :loading="loading"
              placeholder="供应商名称"
              style="width:140px;"
              clearable
              size="mini"
      >
        <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
      <el-select
              v-model="queryList.contract_status"
              filterable
              placeholder="状态"
              style="width:140px;"
              clearable
              size="mini"
      >
        <el-option v-for="item in contract_status" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
      <el-button type="primary" :loading="loading_search" @click="search()" size="mini">搜索</el-button>
    </div>

    <!-- 页面 -->
    <el-table
            :data="list.data"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
            v-show="dialogIndex"
             style="font-size: 12px;"
    >
      <el-table-column label="通知单号" width="70px">
      <template slot-scope="scope">{{scope.row.id}}</template>
    </el-table-column>
      <el-table-column label="询单号" width="90px" align="center">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.inquiry_id&&scope.row.saler_contract_check_status!=1" class="item" effect="dark" content="销售合同未生成或未审核" placement="top">
            <div style="background-color: #f2f2f2;font-size: 10px;">{{scope.row.inquiry_id}}</div>
          </el-tooltip>
          <div v-else class="d2-text-center">{{scope.row.inquiry_id}}</div>
        </template>
      </el-table-column>
      <el-table-column label="销售合同号"  width="120px">
        <template slot-scope="scope">
          <el-tooltip v-if="scope.row.note" class="item" effect="dark" :content="scope.row.note" placement="top">
            <span style="color: red;font-weight: bold;">{{scope.row.contract_number}}</span>
          </el-tooltip>
          <span v-else>{{scope.row.contract_number}}</span>
        </template>
      </el-table-column>
      <el-table-column label="供应商名称"  width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.supplier_id==0">
             <span class="red">{{scope.row.supplier_name}}<span v-if="scope.row.platform">({{scope.row.platform}})</span></span>
          </span>
          <span v-else>
            {{attr(scope.row,'supplier.name')}}
            <el-tooltip :content="scope.row.consign_note" placement="top" v-if="scope.row.consign_note!=null&&scope.row.consign_note!=''">
              <el-button type="danger" size="mini" style="padding: 3px 5px!important;">寄售</el-button>
            </el-tooltip>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="CAS" width="100px">
        <template slot-scope="scope">
          <el-tooltip  v-if="scope.row.product_check_status!=1" class="item" effect="dark" content="产品未审核,请找王国玉！" placement="top">
            <div  @click="product_detail(scope.row.prod_id)" style="background-color: #f2f2f2;color:#66b1ff;font-size: 12px;">{{scope.row.cas}}</div>
          </el-tooltip>
          <el-tooltip  v-else-if="attr(scope.row,'product.can_saled')!=1" class="item" effect="dark" content="产品不是允许经营状态,请找王国玉！" placement="top">
            <div  @click="product_detail(scope.row.prod_id)" style="background-color: #f2f2f2;color:#66b1ff;font-size: 12px;">{{scope.row.cas}}</div>
          </el-tooltip>
          <span v-else @click="product_detail(scope.row.prod_id)" :style="{cursor: 'pointer',color:(scope.row.prod_id?'#66b1ff':'')}">{{scope.row.cas}}</span>
        </template>
      </el-table-column>
      <el-table-column label="海关编码"  width="100px">
        <template slot-scope="scope">{{attr(scope.row,'product.hscode')}}</template>
      </el-table-column>
      <el-table-column label="是否经营"  width="70px">
        <template slot-scope="scope">
          <span v-if="attr(scope.row,'product.can_saled')==1">经营</span>
          <span v-if="attr(scope.row,'product.can_saled')==2">不经营</span>
          <span v-if="attr(scope.row,'product.can_saled')==3">待定</span>
          <span v-if="attr(scope.row,'product.can_saled')==4">审核中</span>
        </template>
      </el-table-column>
      <el-table-column label="数量" width="60px">
        <template slot-scope="scope">{{scope.row.quantity}}{{getEnumValue(units,scope.row.quantity_unit)}}</template>
      </el-table-column>
      <el-table-column label="销售合同报价" >
        <template slot-scope="scope">
          <span v-if="scope.row.saler_contract_detail">
           {{scope.row.saler_contract_detail.purity+'/'+scope.row.saler_contract_detail.quantity+getEnumValue(units,scope.row.saler_contract_detail.quantity_unit)+'/'+scope.row.saler_contract_detail.total_money+getEnumValue(Currency,scope.row.saler_contract_detail.currency_id)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="指派仓库" >
        <template slot-scope="scope">{{scope.row.procurement_warehouse}}</template>
      </el-table-column>
      <!-- <el-table-column label="单价" >
        <template slot-scope="scope">
          <span v-if="scope.row.price>0">
            {{scope.row.price}}{{getEnumValue(Currency,scope.row.currency_id)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="金额" >
        <template slot-scope="scope">
          <span v-if="scope.row.price>0">
            {{scope.row.total_price}}{{getEnumValue(Currency,scope.row.currency_id)}}
          </span>
        </template>
      </el-table-column> -->
       <el-table-column label=" 销售员">
        <template slot-scope="scope">{{attr(scope.row,'saler.name')}}</template>
      </el-table-column>
      <el-table-column label="采购人员">
        <template slot-scope="scope">{{attr(scope.row,'purchase.name')}}</template>
      </el-table-column>
      <el-table-column label="审核状态" >
        <template slot-scope="scope">{{check_status.filter(i=>{return i.id==scope.row.check_status})[0].name}}</template>
      </el-table-column>
      <el-table-column label="状态" >
        <template slot-scope="scope">
          <span :style="{color:(scope.row.contract_status==1?'#66b1ff':'')}">{{getEnumValue(contract_status,scope.row.contract_status)}}
</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="255" fixed="right">
        <template slot-scope="scope">
          <span v-if="scope.row.check_status!=3 && scope.row.contract_status!==1">
            <el-checkbox
                    v-model="scope.row.checked"
                    @change="handleCheckItem(scope.row.checked,scope.row.id)"
                    style="margin-right:5px;"
                    v-if="scope.row.check_status==1 && scope.row.product_check_status==1 && (!scope.row.inquiry_id || scope.row.saler_contract_check_status==1)&&scope.row.supplier_id!=0"
            ></el-checkbox>
            <el-button v-if="scope.row.check_status==1 && scope.row.product_check_status==1 && (!scope.row.inquiry_id || scope.row.saler_contract_check_status==1)&&attr(scope.row,'product.can_saled')==1&&scope.row.supplier_id!=0" size="mini" type="primary" @click="handleContract_item(scope.row)">建立</el-button>
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)" v-if="permissions.indexOf(75)>-1">详情</el-button>
            <el-button size="mini" type="primary" @click="check_agree(scope.row)" v-if="permissions.indexOf(71)>-1 && scope.row.check_status==0">审核</el-button>
            <el-button size="mini" type="danger" @click="handleDel(scope.row)" v-if="permissions.indexOf(495)>-1 && scope.row.contract_status==0">取消</el-button>
         </span>
          <!--<el-button size="mini" type="primary" style="margin: 5px 20px;" v-if="attr(scope.row,'purchase.name')=='郭倩玲'">推送至订单系统</el-button>-->
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
            :total="list.total"
            :page-size="list.per_page"
    ></el-pagination>

    <!-- 增加 -->
    <div v-if="dialogAdd">
      <FormAdd
              @noticeClose="noticeClose($event)"
              @saveAdd="saveAdd($event)"
              :Notic_enum="Notic_enum"
      ></FormAdd>
    </div>

    <!-- 详情 -->
    <div v-if="dialogEdit">
      <FormEdit
              @noticeClose="noticeClose($event)"
              :editItem="editItem"
              :id="check_id"
              :Notic_generate="Notic_generate"
              :Notic_enum="Notic_enum"
              :check="check_notice"
              @saveCheck="saveCheck($event)"
              @saveEdit="saveEdit($event)"
      ></FormEdit>
    </div>

    <!-- 提示 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>还没有选中通知单</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogCheck" width="30%">
      <span>不是同一个供应商的通知单不能一起生成合同</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogCheck = false">确 定</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
    import axios from "axios";
    import {
        lists,
        destroy,
        update,
        listTotal,
        list_Total,
        listTotalPost
    } from "@/api/prod";
    import { create,verify } from "@/api/procure";
    import FormAdd from "./formAdd";
    import FormEdit from "./formEdit";
    import util from "@/libs/util";
    import { truncate } from "fs";
    export default {
        name:"procure-notice",
        components: {
            FormAdd,
            FormEdit
        },
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                loading: false,
                supply_list: [],
                checked_all: false,
                check_notice:0,
                checkItem: [],
                check: [],
                check_id:'',
                check_status: 0,
                searchInput: "",
                editItem: "",
                Notic_enum: {},
                dialogVisible: false,
                dialogCheck: false,
                list: [],
                currentPage: 1,
                address: "",
                queryList: {
                    page: "1",
                    cas:'',
                    contract_number:'',
                    purchase_user_id:'',
                    contract_status:0,
                    supplier_id: "",
                    date_start: "",
                    date_end: ""
                },
                dialogIndex: true,
                dialogAdd: false,
                dialogEdit: false,
                contract_status:[],
                check_status:[],
                ids:[],
                Notic_generate:[],
                units:[],
                Currency:[],
                purchaseList:[],
                loading_search:false,
            };
        },
        watch: {
            $route (to, from) {
                if(to.name=='procure-notice'){
                    this.dialogIndex=true
                    this.dialogAdd=false
                    this.dialogEdit=false
                    this.fetchData()
                }
            }
        },
        created() {
            let user_type=util.cookies.get('user_type')
            if(user_type=='101'){
                  this.queryList.purchase_user_id=Number(util.cookies.get('user_id'))
            }
            JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
              if(items.id=='25'){
                 this.queryList.purchase_user_id=''
              }
            })
            listTotal("data/user_list?user_type=101").then(res => {
                this.purchaseList = res.data;
                // this.purchaseList.forEach((items,index)=>{
                //     if(items.id==util.cookies.get('user_id')){
                //         this.queryList.purchase_user_id=Number(util.cookies.get('user_id'))
                //     }
                // })
                this.fetchData();
            });
        },
        methods: {
            product_detail(id) {
                if(id){
                    this.$router.push({
                        path: '/Prod/Add2',
                        query: {
                            id: id
                        }
                    })
                }
            },
            selected_country_address(id) {
                city_list(id).then(res => {
                    this.city = res.data;
                });
            },
            noticeClose(even) {
                this.dialogAdd = even;
                this.dialogEdit = even;
                this.dialogIndex = !even;
            },
            fetchData() {
                this.ids=[]
                lists(this.queryList, "ProcurementContract/Notice").then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    res.data.data.forEach((items,index)=>{
                        items.checked=false
                    })
                    this.list = res.data;
                    var leh = this.list.data.length;
                    for (var i = 0; i < leh; i++) {
                        var item = { check: false };
                        this.check.push(item);
                    }
                    this.Notic_enum = res.enum;
                    this.check_status=res.enum.check_status
                    this.contract_status=res.enum.contract_status
                    this.units=res.enum.units
                    this.Currency=res.enum.Currency
                }).catch(rr => {this.loading_search=false})
            },
            handleAdd() {
                this.dialogAdd = true;
                this.dialogIndex = false;
            },
            saveAdd(even) {
                create(even, "ProcurementContract/Notice", "create", this);
            },
            handleContract_item(row){
                listTotal("ProcurementContract/generate?ids=" + [row.id]).then(
                    res => {
                        if(res&&res.code==0){
                            this.Notic_generate=res.enum
                            this.$router.push({
                                path: "/agree/generate_agree.vue",
                                name: "procure-generate_agree",
                                query: {
                                    id: [row.id],
                                }
                            });
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }
                );
                // this.$router.push({
                //                 path: "/agree/agree.vue",
                //                 name: "procure-agree",
                //                 query: {
                //                     id: [row.id],
                //                     Notic_enum: JSON.stringify(this.Notic_enum),
                //                 }
                //             });
            },
            handleContract(row) {
                var brr = [];
                this.ids=Array.from(new Set(this.ids))
                if (this.ids.length>0) {
                    listTotal("ProcurementContract/generate?ids=" + this.ids).then(
                        res => {
                            if(res&&res.code==0){
                                this.$router.push({
                                    path: "/agree/generate_agree.vue",
                                    name: "procure-generate_agree",
                                    query: {
                                        id: this.ids,
                                    }
                                });
                            }else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                });
                            }
                        }
                    );
                } else if (this.ids.length == 0) {
                    this.dialogVisible = true;
                }
            },
            handleEdit(row) {
                listTotalPost("ProcurementContract/Notice/" + row.id + "/edit").then(
                    res => {
                        this.check_id=row.id;
                        this.editItem = res.data;
                        if(row.supplier_id==0){
                            this.editItem.spicle_supply_name = row.supplier_name;
                        }else{
                            this.editItem.supply_name = row.supplier.name;
                        }
                        this.Notic_enum.brands = res.enum.brands;
                    }
                );
                this.check_notice=0
                this.dialogEdit = true;
                this.dialogIndex = false;
            },
            check_agree(row){
                listTotalPost("ProcurementContract/Notice/" + row.id + "/edit").then(
                    res => {
                        this.editItem = res.data;
                        this.editItem.supply_name = row.supplier.name;
                        this.Notic_enum.brands = res.enum.brands;
                    }
                );
                this.dialogEdit = true;
                this.check_notice=1
                this.dialogIndex = false;
            },
            saveCheck(even) {
                verify(even,this);
            },
            saveEdit(even) {
                update(even, "ProcurementContract/Notice", "update", this);
            },
            handleDel(row) {
                destroy(row, "ProcurementContract/Notice", "destroy", this);
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleCheckItem(checked,id){
                if(checked){
                    this.ids.push(id)
                }else{
                    this.ids.forEach((items,index)=>{
                        if(items==id){
                            this.ids.splice(index,1)
                        }
                    })
                }
                let num=0
                this.list.data.forEach((items,index)=>{
                    if(items.checked){
                        num++
                    }
                })
                if(num==this.list.data.length){
                    this.ids=[]
                    this.checked_all=true
                    this.list.data.forEach((items,index)=>{
                        this.ids.push(items.id)
                    })
                }else{
                    this.checked_all=false
                }
            },
            handleCheckAll(){
                this.list.data.forEach((items,index)=>{
                    if(this.checked_all){
                        items.checked=true
                        this.ids.push(items.id)
                    }else{
                        this.ids=[]
                        items.checked=false
                    }
                })
            },
            remoteMethod(query) {
                if (query !== "") {
                    this.loading = true;
                    setTimeout(() => {
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                            this.loading = false;
                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            search() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            }
        }
    };
    function obj(arr, object) {
        if (arr.length == 0) {
            for (let i in object) {
                arr.push(object[i]);
            }
        }
    }
</script>