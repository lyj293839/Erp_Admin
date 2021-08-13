<style lang="scss" scoped type="text/scss" >
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  td {
    padding: 2px 5px;
    font-size: 13px;
  }
}
.el-col .el-input{margin: 5px 0px;}
</style>
<template>
  <d2-container>
    <el-row>
      <el-col :span="24" style="text-align:right;">
        <el-input
                size="mini"
                v-model="queryList.cas"
                style="width: 160px;margin-right: 10px;"
                placeholder="CAS"
                clearable
        ></el-input><!-- 合同号 -->
        <el-select
                v-model="queryList.customer_id"
                filterable
                clearable
                remote
                size="mini"
                reserve-keyword
                :placeholder="$t('sale.add.sale178')"
                :remote-method="remoteMethod"
                :loading="loading"
                style="width: 200px;margin-right: 10px;"
        >
          <!-- 客户 -->
          <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-date-picker
          class="date_picker"
          v-model="queryList.ship_start_date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="date"
          :placeholder="$t('sale.add.sale280')"
          size="mini"
          style="width: 125px;margin-right: 5px;"
          clearable
        ></el-date-picker><!-- 发货开始 -->
        <el-date-picker
          class="date_picker"
          v-model="queryList.ship_end_date"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="date"
          :placeholder="$t('sale.add.sale281')"
          size="mini"
          style="width: 125px;margin-right: 10px;"
          clearable
        ></el-date-picker><!-- 发货结束 -->
        <el-date-picker
          class="date_picker"
          v-model="queryList.notice_start_time"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="date"
          :placeholder="$t('sale.add.sale282')"
          size="mini"
          style="width: 125px;margin-right: 5px;"
          clearable
        ></el-date-picker><!-- 通知开始 -->
        <el-date-picker
          class="date_picker"
          v-model="queryList.notice_end_time"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          type="date"
          :placeholder="$t('sale.add.sale283')"
          size="mini"
          style="width: 125px;margin-right: 10px;"
          clearable
        ></el-date-picker><!-- 通知结束 -->
        <el-input
          size="mini"
          v-model="queryList.contract_detail_number"
          style="width: 160px;margin-right: 10px;"
          :placeholder="$t('sale.add.sale232')"
          clearable
        ></el-input><!-- 合同号 -->
        <el-select
          size="mini"
          v-model="queryList.notice_status"
          :placeholder="$t('sale.add.sale234')"
          clearable
          style="width: 100px;margin-right: 10px;"
        ><!-- 通知状态 -->
          <el-option v-for="item in notice_status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="queryList.doc_status"
          :placeholder="$t('sale.add.sale233')"
          size="mini"
          clearable
          filterable
          style="width: 100px;margin-right: 10px;"
        ><!-- 发货文件 -->
          <el-option v-for="i in doc_statuses" :key="i.id" :label="i.name" :value="i.id"></el-option>
        </el-select>
        <el-input
                size="mini"
                v-model="queryList.waybill_number"
                style="width: 150px;margin-right: 10px;"
                placeholder="运单号"
                clearable
        ></el-input>
        <el-button
          size="mini"
          type="primary"
          :loading="loading_search"
          @click="Search()"
        >{{$t('search')}}</el-button>
      </el-col>
    </el-row>
    <el-card v-for="list in lists.data" :key="list.id" class="box-card" style="margin:10px;">
      <table border="1" bordercolor="#E5E5E5">
        <tr style="background: #f2f2f2;font-weight:bold;line-height: 30px;">
          <td width="90">{{$t('sale.add.sale183')}}</td><!-- 日期 -->
          <td width="120">{{$t('sale.add.sale232')}}</td><!-- 合同号 -->
          <td width="110">{{$t('sale.add.sale200')}}/{{$t('sale.add.sale178')}}</td><!-- 销售人员 -->
          <td colspan="2">{{$t('sale.add.sale235')}}/{{$t('sale.add.sale250')}}</td><!-- 寄件地址 -->
          <td colspan="2">{{$t('sale.add.sale35')}}</td><!-- 随货文件 -->
          <td colspan="2">{{$t('sale.add.sale236')}}</td><!-- 账户信息 -->
          <td colspan="2">{{$t('sale.add.sale59')}}</td><!-- 备注 -->
          <td width="80">{{$t('sale.add.sale233')}}</td><!-- 发货文件 -->
          <td width="60">{{$t('sale.add.sale106')}}</td><!-- 处理 -->
        </tr>
        <tr>
          <td>{{list.created_at}}</td>
          <td>
            <div v-for="i in list.contract_detail_numbers">{{i}}</div>
          
          </td>
          <td>
            {{list.sales?list.sales.username:''}}<br>
            <span v-if="showCustomer_sale(department_id,list.sales.department_id,list.sales.id)">{{list.customer_name}}</span>
            <span v-else>********</span>
          </td>
          <td colspan="2">
            <div>
              {{list.ship_notice_address.filter(i=>{return i.type==2})[0].address}}
              {{'__'}}
              {{list.ship_notice_address.filter(i=>{return i.type==2})[0].contact_name}}
              {{list.ship_notice_address.filter(i=>{return i.type==2})[0].mobile}}
            </div>
            <div>
              <span v-for="(i,index) in list.logistic">{{i.waybill_number}} <span style="color:red;">{{index==(list.logistic.length-1)?'':','}}</span> </span>
            </div>
          </td>
          <td colspan="2">{{list.ship_file_remark}}</td>
          <td colspan="2">
            {{getEnumValue(express_account_type,list.express_account_type)}}
            <br />
            {{getEnumValue(express_company,list.express_company_id)}}
            <br />
            {{list.express_account}}
          </td>
          <td colspan="2">{{list.remark}}</td>
          <td>{{getEnumValue(doc_statuses,list.doc_status)}}</td>
          <td>
            <div>
              <!-- <div v-if="list.doc_status==0" style="margin:2px 0px;text-align:center;">
                <el-button size="mini" type="primary">{{$t('sale.add.sale171')}}</el-button>
              </div> --><!-- 修改 -->
              <div style="margin:2px 0px;text-align:center;">
                <el-button
                        v-if="!(list.ship_status === 1||list.notice_cancel_status ===1||list.doc_status===1||list.packing_status===2||list.packing_status===3)"
                        class="d2-mb-5"
                        size="mini"
                        type="primary"
                        @click="detail(list.id)"
                >{{$t('sale.add.sale298')}}</el-button>
                <el-button v-if="list.notice_cancel_status !=1" size="mini" type="primary" style="margin-left: 0;" @click="cancel_all_notice(list)">{{$t('sale.add.sale204')}}</el-button><!-- 取消通知 -->
                <el-button v-else size="mini" type="danger" style="margin-left: 0;">已取消</el-button>
              </div>
            </div>
          </td>
        </tr>
        <tr style="font-weight:bold;line-height: 30px;">
          <td>{{$t('sale.add.sale190')}}</td><!-- 批次 -->
          <td>{{$t('sale.add.sale188')}}</td><!-- 仓库 -->
          <td>CAS<span class="red">({{list.notice.length}})</span></td>
          <td>{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
          <td width="40">{{$t('sale.add.sale17')}}</td><!-- 纯度 -->
          <td width="60">{{$t('sale.add.sale9')}}</td><!-- 需求 -->
          <td width="80">{{$t('sale.add.sale75')}}</td><!-- 类型 -->
          <td width='60'>{{$t('sale.add.sale16')}}</td><!-- 规格 -->
          <td width="80">{{$t('sale.add.sale112')}}</td><!-- 发货数量 -->
          <td width="60">{{$t('sale.add.sale237')}}</td><!-- 分装状态 -->
          <td width='60'>{{$t('sale.add.sale234')}}</td><!-- 通知状态 -->
          <td width='100'>采购备注</td>
          <td>{{$t('sale.add.sale80')}}</td><!-- 操作 -->
        </tr>
        <tr v-for="item in list.notice">
          <td>{{item.inventory?item.inventory.batchno:''}}</td>
          <td>
            <!--<span v-for="w in warehouse">-->
              <!--<span v-if="item.inventory&&item.inventory.warehouse_id==w.id">{{w.name}}</span>-->
            <!--</span>-->
            {{getEnumValue(warehouse,item.inventory.warehouse_id)}}
          </td>
          <td>{{item.inventory?item.inventory.cas:''}}</td>
          <td>{{item.prod?item.prod.name:''}}</td>
          <td>{{item.inventory?item.inventory.purity:''}}</td>
          <td>{{attr(item,'contract_detail.quantity')}}{{getEnumValue(units,attr(item,'contract_detail.quantity_unit'))}}</td>
          <td>{{getEnumValue(preout_type_info,attr(item,'preout.type'))}}</td>
          <td>{{item.packs?item.packs.packsize:'/'}}{{getEnumValue(units,item.packs?item.packs.unit_id:'')}}</td>
          <td>
            <div
              v-if="item.preout&&item.preout.type==2"
            >{{item.preout.quantity}}{{getEnumValue(units,item.preout?item.preout.quantity_unit:'')}}</div>
            <div
              v-else
            >{{attr(item,'preout.package_nums')}}({{attr(item,'preout.quantity')}}{{getEnumValue(units,attr(item,'preout.quantity_unit'))}})</div>
            <span>
              <el-tooltip placement="top" v-if="item.preout.split_package_log_id>0&&item.preout.split_package_log&&item.preout.split_package_log">
                <div slot="content">从{{item.preout.split_package_log.out_shelf}}货架中规格为{{item.preout.split_package_log.packsize}}
                  {{getEnumValue(units,item.preout.split_package_log.unit_id)}}的拆出
                </div>
                <span style="color:red;cursor: pointer;">(拆)</span>
              </el-tooltip>
            </span>
          </td>
          <td>{{getEnumValue(enums.packing_status_info,item.packing_status)}}</td>
          <td>{{getEnumValue(notice_status_info,item.status)}}</td>
          <td>
            <span style="color:red;">{{item.inventory.order?item.inventory.order.purchase_requirement:''}}</span>
          </td>
          <td align="center">
            <el-button
              v-if="item.status==1"
              size="mini"
              type="primary"
              @click="cancel(item.inventory_preout_id,item.prod_id)"
            >{{$t('sale.add.sale204')}}</el-button><!-- 取消通知 -->
          </td>
        </tr>
      </table>
    </el-card>
    
    <!-- 分页 -->
    <el-pagination
      v-if="lists.total"
      :total="lists.total"
      style="text-align: right;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
    ></el-pagination>
  </d2-container>
</template>

<script>
import { customer_company,ship_notice_list, sale_list,cancel_ship_notice,cancel_all_notice,edit_notice_view } from "@/api/sale";
import util from '@/libs/util'
export default {
  name: 'sales-ship_notice',
  data() {
    return {
      lists: {},
      department_id:"",
      queryList: {
        page: "1",
        cas:'',
        customer_id:'',
        contract_detail_number: "",
        notice_start_time: "",
        notice_end_time: "",
        doc_status: "",
        // sale_id: "",
        notice_status: "",
        ship_start_date:'',
        ship_end_date:'',
        waybill_number:''
      },
      currentPage: 1,
      loading_search: false,
      enums: {},
      doc_statuses: [],
      units: [],
      delivery_type: [],
      warehouse: [],
      preout_type_info: [],
      waybill_status_info: [],
      transfer_ship_info: [],
      packing_status_info: [],
      notice_status_info: [],
      storage_condition: [],
      sales: [],
      express_company: [],
      express_account_type: [],
        customer:[],
        loading:false
    };
  },
  created() {
    this.fetchData();
    this.department_id=util.cookies.get('department_id')
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.Search()
      }
    }
  },
  methods: {
      remoteMethod(query) {
          if (query !== "") {
              this.loading = true;
              setTimeout(() => {
                  customer_company(query).then(res => {
                      this.customer = res.data;
                      this.loading = false;
                  });
              }, 200);
          } else {
              this.customer = [];
          }
      },
    fetchData() {
      ship_notice_list(this.queryList).then(res => {
        if (this.loading_search) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.loading_search = false;
        }
        this.lists = res.data;
        this.enums = res.enum;
        this.doc_statuses = res.enum.doc_statuses;
        this.units = res.enum.units;
        this.delivery_type = res.enum.delivery_type;
        this.warehouse = res.enum.warehouse;
        this.preout_type_info = res.enum.preout_type_info;
        this.waybill_status_info = res.enum.waybill_status_info;
        this.transfer_ship_info = res.enum.transfer_ship_info;
        this.packing_status_info = res.enum.packing_status_info;
        this.notice_status_info = res.enum.notice_status_info;
        this.storage_condition = res.enum.storage_condition;
        this.express_company = res.enum.express_company;
        this.express_account_type = res.enum.express_account_type;
      }).catch(rr => {this.loading_search=false})
      // sale_list().then(res => {
      //   this.sales = res.data;
      // });
    },
    doc_done(id) {
      docdone(id).then(res => {
        if (res && res.code == 0) {
          this.$message({
            message: "success",
            type: "success"
          });
          this.fetchData();
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          });
        }
      });
    },
    cancel_all_notice(list){
      cancel_all_notice(list.id,this)
    },
    detail(id){
      edit_notice_view(id).then(res=>{
          if(res.code===0){
              this.$router.push({
                  path:'ship_notice_detail',
                  query:{
                      id:id,
                      res: JSON.stringify(res)
                  }
              })
          }
      })
    },
    cancel(id,prod_id){
      cancel_ship_notice(id,prod_id, this)
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    Search() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage=1
      this.fetchData();
    }
  }
}
</script>