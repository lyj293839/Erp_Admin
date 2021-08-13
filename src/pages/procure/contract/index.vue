<style lang="scss" scoped type="text/scss">
  .td {
    width: 100px;
    overflow: auto;
    text-align: left;
  }
  .input {
    width: 100%;
  }
  el-table {
    background: #d9edf6;
  }
  .el-switch {
    margin-left: 20px;
  }
  .heard {
    display: flex;
    justify-content:flex-start;
    align-items: center;
    .el-input {
      width: 400px;
    }
    .date_picker {
      width: 130px;
    }
    .el-switch {
      width: 100px;
    }
    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    /deep/ .el-checkbox__label {
        padding-left: 0px;
    }
  }
  /deep/.el-dialog {
    .el-input__inner {
      border: 0px;
      padding: 0px 0px;
    }
    td {
      padding-left: 5px;
    }
  }
  .green {
    color: green;
  }
  .cell{
    padding: 0;
  }
  /deep/ table {
    width: 100%;
    border-collapse: collapse;
    .el-input__inner {
      border: 0px;
      padding: 0px;
    }
    td,
    th {
      padding:5px 0;
      line-height: 20px;
      font-size: 13px;
      text-align: center;
    }
    th {
      background-color: white;
    }
  }
  /deep/ .el-card__body {
    margin: 5px !important;
  }
  /deep/ .el-dropdown-menu__item div{
    font-size: 13px;
  }
  /deep/ .el-dropdown-menu--mini .el-dropdown-menu__item {
    line-height: 32px!important;
    color:black;
  }
  /deep/ .el-dropdown-menu__item {
    line-height: 32px!important;
    color:black;
  }
  .macke{
    display:flex;
    align-items: center;
    justify-content: center;
    span{
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <!--<search :menu="menu" :cookie="cookie_name" ref="search"></search>-->
    <div class="heard">
      <el-button
              size="mini"
              type="primary"
              @click="handleAdd()"
              v-if="permissions.indexOf(85)>-1"
      >新增合同</el-button>
      <!--<el-input-->
      <!--v-model="queryList.keywords"-->
      <!--placeholder="客户名称/CAS"-->
      <!--size="mini"-->
      <!--style="width: 200px;"-->
      <!--&gt;</el-input>-->
      <el-input
              v-model="queryList.contract_number"
              placeholder="合同号"
              clearable
              size="mini"
              style="width: 140px;margin: 0 2px;"
      ></el-input>
      <el-select v-model="queryList.pay_status" placeholder="所有付款状态" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in enums.pay_status"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="queryList.storage_status"  placeholder="所有收货状态"
                 size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in enums.storage_status"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="queryList.invoice_status"  placeholder="所有发票状态" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in enums.invoice_status"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="queryList.keywords" placeholder="请输入CASNo或产品名称" size="mini" style="width: 170px;margin: 0 2px;"></el-input>
      <el-select v-model="queryList.is_stock_info"  placeholder="现货状态" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in enums.is_stock_info"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-autocomplete
              clearable
              size="mini"
              placeholder="请输入供应商名称"
              v-model="queryList.supplier_name"
              :fetch-suggestions="querySearch"
              @select="handleSelect_supplier"
              style="width:200px;margin: 0 2px;height: 28px;"
      >
        <template slot-scope="{ item }">
          <div>{{ item.name }}</div>
        </template>
      </el-autocomplete>
      <el-date-picker
              class="date_picker"
              v-model="queryList.date_start"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="合同开始时间"
              style="width:150px;margin: 0 2px;"
              size="mini"
      ></el-date-picker>
      <el-date-picker
              class="date_picker"
              v-model="queryList.date_end"
              value-format="yyyy-MM-dd"
              type="date"
              style="width:150px;margin: 0 2px;"
              placeholder="合同结束时间"
              size="mini"
      ></el-date-picker>
    </div>
    <div class="heard d2-mt-5" >
      <el-select v-model="queryList.check_status"  placeholder="全部审核状态" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in enums.check_status_show"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-select v-model="queryList.purchase_id"  placeholder="采购人员" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in purchaseList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <!--<el-input v-model="queryList.customer_po" placeholder="PO" clearable size="mini" style="width: 140px;margin: 0 2px;"></el-input>-->
      <el-select v-model="queryList.contract_status"  placeholder="全部状态" size="mini" clearable style="width:120px;margin: 0 2px;">
        <el-option
                v-for="item in enums.contract_status"
                :key="item.id"
                :label="item.name"
                :value="item.id"
        ></el-option>
      </el-select>
      <el-input
              v-model="queryList.order_total"
              placeholder="金额例：>=100000"
              clearable
              size="mini"
              style="width: 160px;margin: 0 2px;"
              v-if="user_id==5||user_id==77||user_id==1"
      ></el-input>
      <el-input
              v-model="queryList.sku_no"
              placeholder="供应商货号"
              clearable
              size="mini"
              style="width: 160px;margin: 0 2px;"
      ></el-input>
      <!--<el-select v-model="queryList.needmeasure"  placeholder="送检状态"-->
      <!--size="mini" clearable style="width:120px;">-->
      <!--<el-option-->
      <!--v-for="item in enums.needmeasure"-->
      <!--:key="item.id"-->
      <!--:label="item.name"-->
      <!--:value="item.id"-->
      <!--&gt;</el-option>-->
      <!--</el-select>-->
      <el-checkbox v-model="queryList.includecancel" true-label="1"  false-label="0" style="margin: 0 2px;">取消</el-checkbox>
      <el-checkbox v-model="queryList.is_over" true-label="-1" false-label="" style="margin: 0 5px;">
          {{$t('sale.index.sale79')}}
      </el-checkbox>
      <el-button type="primary" :loading="loading_search" @click="search" size="mini" style="margin: 0 2px;">搜索</el-button>
      <el-button  v-if="permissions.indexOf(594)>-1" type="primary" :loading="loading_excel" @click="excel" size="mini" style="margin: 0 2px;">导出Excel</el-button>
      <a :href="export_purchase_url" ref="export_purchase_url" hidden></a>
       <div style="font-size:13px;padding:5px 5px;position:absolute;right:10px;">
                <span>{{$t('Inquery.index.Search_volume')}}：{{list.total}}个</span><!--搜索数量-->
            </div>
    </div>
    <span style="width:100%;" id="id"></span>
      <el-table
              :data="list.data"
              border
              style="width: 100%;margin-top: 15px;">
        <!--<el-table-column align="center" label='#ID' width="80">-->
          <!--<template slot-scope="scope">-->
            <!--<span>{{scope.row.id}}</span>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center" label='合同号' width="150">
          <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" :content="enums.is_flag_all[scope.row.is_flag_all].name" placement="top">
                <span :style="{'background':scope.row.bgColor}" >{{scope.row.contract_number}}</span>
              </el-tooltip>
              <el-tooltip v-if="scope.row.show_push&&scope.row.is_push_status!=0" class="item" effect="dark" :content="scope.row.is_push_status==1?'推送成功':(scope.row.is_push_status==-1?'推送失败':'')" placement="top">
                  <i class="el-icon-upload2 d2-ml-5 bold" :style="{color:scope.row.is_push_status==1?'rgb(103, 194, 58)':(scope.row.is_push_status==-1?'red':'')}"></i>
              </el-tooltip>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label='po' width="80">-->
        <!--<template slot-scope="scope">-->
        <!--<span>{{scope.row.customer_po}}</span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center" label='供应商名称' min-width="240">
          <template slot-scope="scope">
            <span>{{scope.row.supplier_name}}</span>
            <span v-if='scope.row.real_supplier_name&&scope.row.real_supplier_name!==scope.row.supplier_name' style="color:red;">
              <br><span>{{scope.row.real_supplier_name}}</span>
            </span>
            <el-tag type="danger" size="mini" v-if="scope.row.supplier&&scope.row.supplier.pay_way==2" style="margin-left:3px;">月</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label='现货/定制' width="80">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">
                    <span  v-for="detail in scope.row.details">
                      <span v-text="detail.is_stock==1?'现货':'定制'"></span>;
                    </span>
              </div>
              <div v-if="scope.row.details.length>0">
                <span v-if="scope.row.details[0].is_stock==1">现货</span>
                <span v-else style="color: red;">定制</span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label='合同金额'  width="90">
          <template slot-scope="scope">
            <span>{{getEnumValue(enums.Currency,scope.row.currency_id,'icon')}}{{scope.row.total_money}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label='签约时间' width="90">
          <template slot-scope="scope">
            <span>{{scope.row.contract_date}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label='审核状态'>
          <template slot-scope="scope">
            <div v-if="scope.row.check_status==1" style="background:#67C23A;" v-text="checkStatus(scope.row.check_status)"></div>
            <div v-else v-text="checkStatus(scope.row.check_status)"></div>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label='合同状态' width="90">-->
        <!--<template slot-scope="scope">-->
        <!--<span></span>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column align="center" label='付款状态'>
          <template slot-scope="scope">
              <div v-if="scope.row.pay_result==5" style="background-color: rgb(255, 193, 7);">已申请<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
              <div v-if="scope.row.pay_result==1" style="background-color: #FFF0DD;">部分付款<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
              <div v-if="scope.row.pay_result==2" style="background-color: #FFC0CB;">付款完成<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
              <div v-if="scope.row.pay_result==3" style="background-color: #F5DEB3;">超额付款<span v-if="scope.row.offset_amount" style="color: red;">(往)</span></div>
              <div v-if="scope.row.pay_result==0||scope.row.pay_result==6">未申请</div>
              <div v-if="scope.row.pay_result==9" style="background-color: lightgrey;">处理中</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label='收货状态'>
          <template slot-scope="scope">
            <div :style="{backgroundColor:(scope.row.storage_status=='部分入库'?'#FFF0DD':(scope.row.storage_status=='已入库'?'#FFC0CB':(scope.row.storage_status=='超额入库'?'#F5DEB3':(scope.row.storage_status=='未入库'?'':''))))}">{{scope.row.storage_status}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label='发票状态'>
          <template slot-scope="scope">
            <div :style="{backgroundColor:(scope.row.invoice_status==4?'#C0C0C0':(scope.row.invoice_status==2?'#FFC0CB':(scope.row.invoice_status==1?'#FFF0DD':(scope.row.invoice_status==3?'#F5DEB3':''))))}">{{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}</div>
          </template>
        </el-table-column>
        <el-table-column
                fixed="right"
                label="操作"
                width="210">
          <template slot-scope="scope">
          <div class="macke">
            <div style="display: inline-block;position: absolute;left: 5px;">
              <span v-if="scope.row.supplier_id==39057&&permission_names['ProcurementContract.sendContractToYaoshi']=='ProcurementContract.sendContractToYaoshi'">
                <el-tooltip v-if="scope.row.is_push_status==1" class="item" effect="light" content="推送成功" placement="top">
                  <img src="../../../../public/image/module/yaoshi_success.jpg" width="14px" height="14px">
                </el-tooltip>
                <el-tooltip v-else-if="scope.row.is_push_status==-1" class="item" effect="dark" :content="scope.row.push_msg" placement="top">
                  <img src="../../../../public/image/module/yaoshi_fail.jpg" width="14px" height="14px" @click="is_yaoshi?send_yaoshi(scope.row.id):''">
                </el-tooltip>
                <el-tooltip v-else class="item" effect="light" content="推送药石" placement="top">
                  <img src="../../../../public/image/module/yaoshi.jpg" width="14px" height="14px" @click="is_yaoshi?send_yaoshi(scope.row.id):''">
                </el-tooltip>
              </span>
              <span v-if="permissions.indexOf(89)>-1 && scope.row.is_old!=1">
                  <i class="el-icon-truck" style="color: red;cursor: pointer;" @click="delivery(scope.row)" v-if="scope.row.express_numbers&&scope.row.express_numbers.length>0"></i>
              </span>
            </div>
            <el-button @click="detail(scope.row)" type="primary" size="mini" class="d2-mr-5">详情</el-button>
            <el-dropdown split-button type="primary" size="mini">
              更多操作
              <el-dropdown-menu slot="dropdown"  v-if="scope.row.is_old!=1">
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(562)>-1 && scope.row.check_status!=0  && scope.row.check_status!=-1 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="change(scope.row)">
                      合同变更
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div  v-if="permissions.indexOf(563)>-1 && scope.row.check_status==3 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="check_change(scope.row)">
                      <i class="el-icon-warning-outline" style="color: #F56C6C;" v-if="scope.row.check_status==3"></i>审核
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(88)>-1&&(scope.row.check_status!=3) && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="check(scope.row)" >
                      <i class="el-icon-warning-outline" style="color: #F56C6C;" v-if="scope.row.check_status==0"></i>
                      <i class="el-icon-warning-outline" style="color:#FFB870;" v-if="scope.row.paylist.length>0"></i
                      >审核
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(90)>-1 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="packRequirement(scope.row)">
                      分装要求
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(492)>-1 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="pay_apply(scope.row)">
                      付款申请
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(89)>-1 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="delivery(scope.row)">
                      快递
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(69)>-1 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="load(scope.row)">
                      下载合同(PDF)
                    </div>
                  </div>
                </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="permissions.indexOf(70)>-1 && scope.row.is_old!=1">
                    <div class="d2-text-center"  @click="load_excel(scope.row)">
                      下载合同(EXCEL)
                    </div>
                  </div>
                </el-dropdown-item>
                  <el-dropdown-item>
                      <div v-if="scope.row.show_push&&scope.row.is_old!=1">
                          <div class="d2-text-center"  @click="pull(scope.row)">
                              推送至供应商
                          </div>
                      </div>
                  </el-dropdown-item>
                <el-dropdown-item>
                  <div v-if="(permissions.indexOf(566)>-1 || permissions.indexOf(567)>-1 )&& scope.row.is_old!=1">
                    <div class="d2-text-center" @click="cancel_contract(scope.row,'-1')"  v-if="permissions.indexOf(566)>-1 && scope.row.status==1">
                      取消合同
                    </div>
                    <div class="d2-text-center"  @click="cancel_contract(scope.row,1)"  v-if="permissions.indexOf(567)>-1 && scope.row.status==-1">
                      恢复合同
                    </div>
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span v-if='scope.row.supplier_order_no_show' @click="supplier_order_no(scope.row)" style="display: inline-block;position: absolute;right: 10px;">
                <i class="el-icon-s-order" style="color: red;cursor: pointer;"></i>
            </span>
          </div>
          </template>
        </el-table-column>
      </el-table>
    
    <el-dialog width="60%" :visible.sync="dialog_supplier_order_no">
      <table border="1" bordercolor="#E5E5E5" style="width:90%;border-collapse: collapse;margin: 0 auto;">
        <tr>
          <td>子合同号</td>
          <td width='250'>产品名称</td>
          <td>cas</td>
          <td>合同金额</td>
          <td>供应商订单编号</td>
        </tr>
        <tr v-if='item.supplier_order_no'  v-for="(item,index) in supplier_order_nos.details">
         <td>{{item.procurement_contract_number}}</td>
         <td>{{item.name}}</td>
         <td>{{item.cas}}</td>
         <td>{{getEnumValue(enums.Currency,item.currency_id,'icon')}}{{item.total_price}}</td>
        <td>{{item.supplier_order_no}}</td>
        </tr>
      </table>
    </el-dialog>
    <!-- 快递 -->
    <el-dialog width="40%" :visible.sync="dialogDelivery" @close="deliveryClose()">
      <el-form>
        <el-form-item>
          <table border="1" bordercolor="#E5E5E5" style="width:90%;border-collapse: collapse;margin: 0 auto;">
            <tr>
              <td>快递单号</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in aaa">
              <td>
                <el-input v-model="deliveryList.express_numbers[index]"></el-input>
              </td>
              <td align="center">
                <el-button
                        type="primary"
                        @click="deliveryCut(index)"
                        icon="el-icon-minus"
                        size="mini"
                ></el-button>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item style="display:flex;justify-content: flex-end;">
          <el-button type="primary" icon="el-icon-plus" @click="deliveryAdd()" size="mini"></el-button>
          <el-button type="primary" @click="deliverySave()" size="mini">保存</el-button>
          <el-button @click="deliveryClose()" size="mini">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
            style="text-align: right;"
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="prev,pager,next"
            :page-size="20"
            :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
    import $ from "jquery";
    import axios from "axios";
    import {
        lists,
        create,
        update,
        list_Total,
        listTotal,
        listPost
    } from "@/api/prod";
    import search from "@/components/search/index"
    import util from "@/libs/util";
    import {cancel_contract,ProcurementContract_doPush,sendContractToYaoshi} from "@/api/procure";
    import {
        search_menu
    } from "@/api/Inquery"
    import { request } from "http";
    export default {
        name: "procure-contract",
        components: {
            search
        },
        data() {
            return {
                menu:{},
                permissions: JSON.parse(localStorage.getItem("permissions")),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                user_id:'',
                enums: [],
                enum_playList: [],
                dialogDelivery: false,
                deliveryList: {},
                aaa: [],
                list: [],
                currentPage: 1,
                queryList: {
                    page: "1",
                    per_page:20,
                    keywords: "",
                    date_start: "",
                    date_end: "",
                    contract_number: "",
                    customer_po: "",
                    pay_status:'',
                    storage_status:'',
                    invoice_status:'',
                    is_stock_info:'',
                    supplier_name:'',
                    check_status:'',
                    pay_wait_check:'',
                    purchase_id:'',
                    includecancel:'',
                    contract_status:'',
                    needmeasure:'',
                    sku_no:'',
                    order_total:'',
                    is_over:''
                },
                purchaseList: [],
                check_status:[],
                enums:{},
                loading_search:false,
                loading_excel:false,
                supplyloading:false,
                is_yaoshi:true,
                dialog_supplier_order_no:false,
                supplier_order_nos:[],
                export_purchase_url:'',
                supply_list: [],

            };
        },
        created() {
            this.user_id=Number(util.cookies.get('user_id'))
            if (this.$route.query) {
                this.queryList={
                    page: "1",
                    keywords: this.$route.query.keywords?this.$route.query.keywords:'',
                    date_start: this.$route.query.date_start?this.$route.query.date_start:'',
                    date_end: this.$route.query.date_end?this.$route.query.date_end:'',
                    contract_number: this.$route.query.contract_number?this.$route.query.contract_number:'',
                    customer_po: this.$route.query.customer_po?this.$route.query.customer_po:'',
                    pay_status:this.$route.query.pay_status?this.$route.query.pay_status:'',
                    storage_status:this.$route.query.storage_status?this.$route.query.storage_status:'',
                    invoice_status:this.$route.query.invoice_status?this.$route.query.invoice_status:'',
                    is_stock_info:this.$route.query.is_stock_info?this.$route.query.is_stock_info:'',
                    supplier_id:this.$route.query.supplier_id?this.$route.query.supplier_id:'',
                    check_status:this.$route.query.check_status?this.$route.query.check_status:'',
                    pay_wait_check:this.$route.query.pay_wait_check?this.$route.query.pay_wait_check:'',
                    purchase_id:this.$route.query.purchase_id?this.$route.query.purchase_id:'',
                    includecancel:this.$route.query.includecancel?this.$route.query.includecancel:'',
                    contract_status:this.$route.query.contract_status?this.$route.query.contract_status:'',
                    needmeasure:this.$route.query.needmeasure?this.$route.query.needmeasure:'',
                    sku_no:this.$route.query.sku_no?this.$route.query.sku_no:'',
                    order_total:''
                }
                if(this.user_id==5||this.user_id==77||this.user_id==1){
                  this.queryList.order_total = this.$route.query.order_total?this.$route.query.order_total:''
                }
            }
            if (this.$route.query.status) {
                this.queryList={
                    page: "1",
                    keywords: "",
                    date_start: "",
                    date_end: "",
                    contract_number: "",
                    customer_po: "",
                    pay_status:'',
                    storage_status:'',
                    invoice_status:'',
                    is_stock_info:'',
                    supplier_id:'',
                    check_status:'',
                    pay_wait_check:'',
                    purchase_id:'',
                    includecancel:'',
                    contract_status:'',
                    needmeasure:'',
                    sku_no:'',
                    order_total:''
                },
                    this.queryList.check_status = 0
                this.queryList.pay_wait_check = ''
            }
            if (this.$route.query.pay_wait_check) {
                this.queryList={
                    page: "1",
                    keywords: "",
                    date_start: "",
                    date_end: "",
                    contract_number: "",
                    customer_po: "",
                    pay_status:'',
                    storage_status:'',
                    invoice_status:'',
                    is_stock_info:'',
                    supplier_id:'',
                    check_status:'',
                    pay_wait_check:'',
                    purchase_id:'',
                    includecancel:'',
                    contract_status:'',
                    needmeasure:'',
                    sku_no:'',
                    order_total:''
                },
                    this.queryList.check_status = ''
                this.queryList.pay_wait_check = 1
            }
            this.getPurchases();
        },
        watch: {
            $route(to, from) {
                if (from.name == "procure-check"||from.name == "procure-costApplication"||from.name == "procure-generate_agree"||from.name == "procure-pay_apply_agree"||from.name == "procure-repurchase"||from.name == "procure-packRequiery") {
                    if (this.$route.query.status) {
                        this.queryList={
                            page: "1",
                            keywords: "",
                            date_start: "",
                            date_end: "",
                            contract_number: "",
                            customer_po: "",
                            pay_status:'',
                            storage_status:'',
                            invoice_status:'',
                            is_stock_info:'',
                            supplier_id:'',
                            check_status:'',
                            pay_wait_check:'',
                            purchase_id:'',
                            includecancel:'',
                            contract_status:'',
                            needmeasure:'',
                            sku_no:'',
                            order_total:''
                        },
                            this.queryList.check_status = 0
                        this.queryList.pay_wait_check = ''
                    }
                    if (this.$route.query.pay_wait_check) {
                        this.queryList={
                            page: "1",
                            keywords: "",
                            date_start: "",
                            date_end: "",
                            contract_number: "",
                            customer_po: "",
                            pay_status:'',
                            storage_status:'',
                            invoice_status:'',
                            is_stock_info:'',
                            supplier_id:'',
                            check_status:'',
                            pay_wait_check:'',
                            purchase_id:'',
                            includecancel:'',
                            contract_status:'',
                            needmeasure:'',
                            sku_no:'',
                            order_total:''
                        },
                            this.queryList.check_status = ''
                        this.queryList.pay_wait_check = 1
                    }
                    // this.getPurchases();
                    this.fetchData();
                }
                if (this.$route.query&&this.$route.query.flag) {
                    this.queryList={
                        page: "1",
                        keywords: this.$route.query.keywords?this.$route.query.keywords:'',
                        date_start: this.$route.query.date_start?this.$route.query.date_start:'',
                        date_end: this.$route.query.date_end?this.$route.query.date_end:'',
                        contract_number: this.$route.query.contract_number?this.$route.query.contract_number:'',
                        customer_po: this.$route.query.customer_po?this.$route.query.customer_po:'',
                        pay_status:this.$route.query.pay_status?this.$route.query.pay_status:'',
                        storage_status:this.$route.query.storage_status?this.$route.query.storage_status:'',
                        invoice_status:this.$route.query.invoice_status?this.$route.query.invoice_status:'',
                        is_stock_info:this.$route.query.is_stock_info?this.$route.query.is_stock_info:'',
                        supplier_id:this.$route.query.supplier_id?this.$route.query.supplier_id:'',
                        check_status:this.$route.query.check_status?this.$route.query.check_status:'',
                        pay_wait_check:this.$route.query.pay_wait_check?this.$route.query.pay_wait_check:'',
                        purchase_id:this.$route.query.purchase_id?this.$route.query.purchase_id:'',
                        includecancel:this.$route.query.includecancel?this.$route.query.includecancel:'',
                        contract_status:this.$route.query.contract_status?this.$route.query.contract_status:'',
                        needmeasure:this.$route.query.needmeasure?this.$route.query.needmeasure:'',
                        sku_no:this.$route.query.sku_no?this.$route.query.sku_no:'',
                        order_total:this.$route.query.order_total?this.$route.query.order_total:'',
                    }
                    if(this.user_id==5||this.user_id==77||this.user_id==1){
                      this.queryList.order_total = this.$route.query.order_total?this.$route.query.order_total:''
                    }
                    // this.getPurchases();
                    this.fetchData();
                }
            }
        },
        methods: {
            fetchData(a) {
                lists(this.queryList, "ProcurementContract").then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    res.data.data.forEach((items,index)=>{
                        items.show_push=false
                        if(res.enum.is_push_suppliers.includes(items.supplier_id)){
                            items.show_push=true
                        }
                        if(items.is_flag_all==0){
                            items.bgColor=''
                        }else if(items.is_flag_all==1){
                           items.bgColor='lightgreen'
                        }else if(items.is_flag_all==2){
                           items.bgColor='green'
                        }else if(items.is_flag_all==3){
                           items.bgColor='red'
                        }else if(items.is_flag_all==-1){
                           items.bgColor='orange'
                        }else if(items.is_flag_all==-2){
                           items.bgColor='yellow'
                        }
                        items.offset_amount=''
                        if(items.paylist.length>0){
                            items.paylist.forEach((m,n)=>{
                                if(Number(m.offset_amount)>0){
                                    items.offset_amount=true
                                }
                            })
                        }
                        if(items.paylistexist&&Number(items.paylistexist.offset_amount)>0){
                            items.offset_amount=true  
                        }
                        // if(items.procurement_pay_result){
                        //     if(Number(items.procurement_pay_result.pay_requestamount)>0 && Number(items.procurement_pay_result.pay_requestamount)<Number(items.total_money)){
                        //         items.backgroundColor_pay='#FFF0DD'
                        //     }else if(Number(items.procurement_pay_result.pay_requestamount)==Number(items.total_money)){
                        //         items.backgroundColor_pay='#FFC0CB'
                        //     }else if(Number(items.procurement_pay_result.pay_requestamount)>Number(items.total_money)){
                        //         items.backgroundColor_pay='#F5DEB3'
                        //     }else if(Number(items.procurement_pay_result.pay_requestamount)<=0){
                        //         items.backgroundColor_pay='#FFC107'
                        //     }
                        // }else{
                        //     if(items.paylist&&items.paylist.length>0){
                        //         items.backgroundColor_pay='#FFC107'
                        //     }
                        // }
                        items.storage_status=''
                        let a=[]
                        let num=0,b=0,c=0,d=0 //已入库  超额入库  未入库
                        items.details.forEach((m,n)=> {
                         
                            num++
                            if(m.storage_status==2){
                                a.push(m.storage_status)
                                items.storage_status='部分入库'
                            }else if(m.storage_status==1){
                                a.push(m.storage_status)
                                b++
                            }else if(m.storage_status==4){
                                a.push(m.storage_status)
                                c++
                            }else if(m.storage_status==0){
                                a.push(m.storage_status)
                                d++
                            }
                        })
                        if(num==items.details.length){
                            if(b==items.details.length){
                                items.storage_status='已入库'
                            }else if(c==items.details.length){
                                items.storage_status='超额入库'
                            }else if(d==items.details.length){
                                items.storage_status='未入库'
                            }else if(!a.includes(0)&&!a.includes(2)){
                                items.storage_status='超额入库'
                            }else{
                                items.storage_status='部分入库'
                            }
                        }
                        items.invoice_type=''
                        items.invoice_types=[]
                        let arr=[]
                        let nums=0,x=0,y=0,z=0,v=0 //不含税  全额收票  未收票  超额收票
                        items.details.forEach((m,n)=> {
                           if(m.supplier_order_no){
                             items.supplier_order_no_show=true
                          }
                            nums++
                            // if (m.invoice_type_id == 2) {
                            //     items.invoice_types.push('不含税')
                            //     arr.push('不含税')
                            //     x++
                            // } else {
                            //     if (m.total_price == 0) {
                            //         items.invoice_types.push('全额收票')
                            //         arr.push('全额收票')
                            //         y++
                            //     } else {
                            //         if (m.view_invoice) {
                            //             if (Number(m.view_invoice.total) == 0) {
                            //                 items.invoice_types.push('未收票')
                            //                 arr.push('未收票')
                            //                 z++
                            //             } else if (Number(m.view_invoice.total) != 0 && Number(m.view_invoice.total) < Number(m.total_price)) {
                            //                 items.invoice_types.push('部分收票')
                            //                 arr.push('部分收票')
                            //                 items.invoice_type='部分收票'
                            //             } else if (Number(m.view_invoice.total) == Number(m.total_price)) {
                            //                 items.invoice_types.push('全额收票')
                            //                 arr.push('全额收票')
                            //                 y++
                            //             } else if (Number(m.view_invoice.total) > Number(m.total_price)) {
                            //                 items.invoice_types.push('超额收票')
                            //                 arr.push('超额收票')
                            //                 v++
                            //             }
                            //         } else {
                            //             items.invoice_types.push('未收票')
                            //             arr.push('未收票')
                            //             z++
                            //         }
                            //     }
                            // }
                        })
                        // if(nums==items.details.length){
                        //     if(x==items.details.length){
                        //         items.invoice_type='不含税'
                        //     }else if(y==items.details.length){
                        //         items.invoice_type='全额收票'
                        //     }else if(z==items.details.length){
                        //         items.invoice_type='未收票'
                        //     }else if(v==items.details.length){
                        //         items.invoice_type='超额收票'
                        //     }else if(!arr.includes('未收票')&&!arr.includes('部分收票')){
                        //         items.invoice_type='超额收票'
                        //     }else{
                        //         items.invoice_type='部分收票'
                        //     }
                        // }
                    })
                    this.list = res.data;
                    this.enums=res.enum;
                    obj(this.check_status,res.enum.check_status)
                    if (a) {
                        document.getElementById("id").scrollIntoView();
                    }
                }).catch(rr => {this.loading_search=false})
            },
            send_yaoshi(id){
              var obj = {
                id:id
              }
              this.is_yaoshi = false
              sendContractToYaoshi(obj).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.is_yaoshi = true
                        this.fetchData()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.is_yaoshi = true
                    }
                }).catch(rr => {this.is_yaoshi = true})
            },
            querySearch(queryString, cb) {
                listTotal("data/member_list?type=2&name=" + queryString).then(res => {
                    cb(res.data);
                });
            },
            handleSelect_supplier(item){
                this.queryList.supplier_name=item.name
            },
            pull(row){
                let obj={
                    id:row.id
                }
                ProcurementContract_doPush(obj).then(res=>{
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.fetchData();
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            },
            supplier_order_no(item){
              this.dialog_supplier_order_no=true
              this.supplier_order_nos=item
            },
            product_detail(prod_id) {
                if(prod_id){
                    this.$router.push({
                        path: '/Prod/Add2',
                        query: {
                            id: prod_id
                        }
                    })
                }
            },
            supplyMethod(query) {
                if (query !== "") {
                    this.supplyloading = true;
                    setTimeout(() => {
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                            this.supplyloading = false;
                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            getPurchases() {
                listTotal("data/user_list?user_type=101").then(res => {
                    this.purchaseList = res.data;
                    this.purchaseList.forEach((items,index)=>{
                        if(items.id==Number(util.cookies.get('user_id'))&&Number(util.cookies.get('user_id'))!=5){
                            this.queryList.purchase_id=Number(util.cookies.get('user_id'));
                        }
                    })
                    this.fetchData();
                });
            },
            checkStatus(a) {
                var b = this.check_status.filter(item => {
                    return item.id == a;
                });
                if (b.length != 0) {
                    return b[0].name_cn;
                } else {
                    return this.enums[1].name_cn;
                }
            },
            handleAdd() {
                this.$router.push({
                    path: "/agree/agreeNew.vue",
                    name: "procure-agreeNew"
                });
            },
            search() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            excel(){
              this.loading_excel = true
              lists(this.queryList, "ProcurementContract/down_excel").then(res => {
                    if (res && res.code === 0) {
                        this.export_purchase_url = res.data
                        setTimeout(() => {
                            this.$refs.export_purchase_url.click()
                            this.loading_excel = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_excel = false
                    }
                }).catch(rr => {
                    this.loading_excel = false
                })
            },
            detail(item) {
                this.$router.push({
                    path: "/agree/agree.vue",
                    name: "procure-agree",
                    query: {
                        ids: item.id,
                        enum_detail: true
                    }
                });
            },
            packRequirement(item) {
                this.$router.push({
                    path: "/agree/packRequiery.vue",
                    name: "procure-packRequiery",
                    query: {
                        item_id: item.id,
                        enum_pack: true
                    }
                });
            },
            check(item) {
                this.$router.push({
                    path: "/agree/check.vue",
                    name: "procure-check",
                    query: {
                        id: item.id,
                    }
                });
            },
            change(item) {
                if(item.settled_month){
                    this.$message({
                        message: '该合同已结算！',
                        type: 'warning'
                    });
                }else{
                    this.$router.push({
                        path: "/change/index",
                        name: "procure-change",
                        query: {
                            ids: item.id
                        }
                    });
                }
            },
            check_change(item) {
                this.$router.push({
                    path: "/check_change/index",
                    name: "procure-check_change",
                    query: {
                        ids: item.id
                    }
                });
            },
            pay_apply_check(item) {
                this.$router.push({
                    path: "/pay_apply_check/index",
                    name: "procure-pay_apply_check",
                    query: {
                        id: item.id
                    }
                });
            },
            repurchase(item) {
                this.$router.push({
                    path: "/agree/repurchase.vue",
                    name: "procure-repurchase",
                    query: {
                        item_id: item.id
                    }
                });
            },
            delivery(item) {
                this.dialogDelivery = !this.dialogDelivery;
                item.express_numbers
                    ? ((this.deliveryList.express_numbers = item.express_numbers),
                        (this.deliveryList.id = item.id))
                    : ((this.deliveryList.express_numbers = [""]),
                        (this.deliveryList.id = item.id));
                this.aaa = this.deliveryList.express_numbers;
            },
            pay_apply(item) {
                this.$router.push({
                    path: "/agree/pay_apply_agree.vue",
                    name: "procure-pay_apply_agree",
                    query: {
                        ids: item.id,
                        enum_pay: true
                    }
                });
            },
            cost_application(item) {
                // listTotal('ProcurementContract/'+item.id+'/fee_application_view').then(res => {
                //   this.$router.push({
                //     path: "/agree/costApplication.vue",
                //     name: "procure-costApplication",
                //     query: {
                //       item_id:item.id,
                //       ids: res.data,
                //       enum:res.enum
                //     }
                //   });
                // });
                this.$router.push({
                    path: "/agree/costApplication.vue",
                    name: "procure-costApplication",
                    query: {
                        item_id: item.id
                    }
                });
            },
            load(item) {
                listTotal("ProcurementContract/createPdfContract?id=" + item.id).then(res => {
                    if (res && res.code === 0) {
                        // window.open(res.data);
                        let fileNames = res.filename.split('/')
                        let fileName = fileNames[fileNames.length - 1]
                        axios({
                            method: 'get',
                            withCredentials:false,
                            url: res.filename,
                            responseType: 'arraybuffer'
                        })
                            .then(response => {
                                this.forceFileDownload(response.data,fileName)
                            })
                            .catch(() => console.log('error occured'))
                    }
                })
            },
            load_excel(item) {
                listTotal(
                    "ProcurementContract/createPurchaseContractPrintFile?reportid=1&id=" +
                    item.id
                ).then(res => {
                    if (res && res.code == 0) {
                        window.open(res.filename);
                    }
                });
            },
            reback(item) {
                this.$router.push({
                    path: "/agree/agree.vue",
                    name: "procure-agree",
                    query: {
                        ids: item.id,
                        enum_reback: true
                    }
                });
            },
            deliveryAdd() {
                this.deliveryList.express_numbers.push("");
                this.aaa = this.deliveryList.express_numbers;
            },
            deliveryCut(index) {
                this.deliveryList.express_numbers.splice(index, 1);
                // this.deliveryList.express_numbers.length > 1? this.deliveryList.express_numbers.splice(index, 1): this.deliveryList.express_numbers.splice(index, 0);
            },
            deliverySave() {
                this.deliveryList.express_numbers = this.deliveryList.express_numbers.filter(
                    item => {
                        return item != "";
                    }
                );
                this.dialogDelivery = !this.dialogDelivery;
                create(this.deliveryList, "ProcurementContract", "expressNumbers", this);
            },
            deliveryClose() {
                this.dialogDelivery = false;
                this.deliveryList.express_numbers = this.deliveryList.express_numbers.filter(
                    item => {
                        return item != "";
                    }
                );
                this.aaa = this.deliveryList.express_numbers;
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData(true);
               
            },
            cancel_contract(item,flag){
                var that = this;
                cancel_contract(item.id,flag).then(res => {
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.fetchData(true);
                    } else {
                        that.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                });
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
