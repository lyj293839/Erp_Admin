<style lang="scss" scoped type="text/scss">
.heard_top {
  margin: 10px 0px 15px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span{font-size: 14px;}
  .el-select {
    margin: 0px 10px;
  }
  .input {
    margin-left: 10px;
    width: 20%;
  }
}
.table {
  width: 100%;
  border-collapse: collapse;
  td {
    padding-left: 5px;
  }
}
.form_item {
  .el-form-item {
    margin-top: 10px;
  }
  .el-select {
    width: 200px;
  }
  .el-input {
    width: 200px;
  }
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <div>
        <span>申请时间：</span>
        <el-date-picker
          size="mini"
          type="date"
          placeholder="开始日期"
          v-model="queryList.start_date"
          value-format="yyyy-MM-dd"
          style="width: 150px;"
        ></el-date-picker>
        <span style="margin:0px 5px">至</span>
        <el-date-picker
          size="mini"
          type="date"
          placeholder="结束日期"
          v-model="queryList.end_date"
          value-format="yyyy-MM-dd"
          style="width: 150px;"
        ></el-date-picker>
      </div>
      <el-input size="mini" v-model="queryList.contract_number" placeholder="合同号" class="input"></el-input>
      <el-select size="mini" clearable v-model="queryList.status">
        <el-option
          v-for="item in is_paid_info"
          :key="item.id"
          :label="item.name_cn"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
    </div>

    <!-- 页面 -->
    <el-table
      :data="list.data"
      border
      style="width: 100%;padding:0px;margin:0px;font-size: 12px;"
      highlight-current-row
      fit
    >
      <el-table-column label="#ID">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="合同号">
        <template slot-scope="scope">{{scope.row.contract_number}}</template>
      </el-table-column>
      <el-table-column label="申请金额">
        <template
          slot-scope="scope"
        >{{scope.row.amount}}{{currencys.filter(res=>{return scope.row.currency_id == res.id})[0].name_cn}}</template>
      </el-table-column>
      <el-table-column label="收款人">
        <template slot-scope="scope">{{scope.row.receiver}}</template>
      </el-table-column>
      <el-table-column label="银行">
        <template slot-scope="scope">{{scope.row.bank}}</template>
      </el-table-column>
      <el-table-column label="银行账号">
        <template slot-scope="scope">{{scope.row.bank_account}}</template>
      </el-table-column>
      <el-table-column label="付款方式">
        <template
          slot-scope="scope"
        >{{pay_type_info.filter(res=>{return scope.row.pay_type == res.id})[0].name}}</template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">{{scope.row.note}}</template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template
          slot-scope="scope"
        >{{check_status_info.filter(res=>{return scope.row.check_status == res.id})[0].name_cn}}</template>
      </el-table-column>
      <el-table-column label="处理状态">
        <template
          slot-scope="scope"
        >{{is_paid_info.filter(res=>{return scope.row.status == res.id})[0].name_cn}}</template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">{{scope.row.createdate}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==0&&permissions.indexOf(312)>-1" type="primary" size="mini" @click="reviewClick(scope.row.id)">付款</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 付款 -->
    <el-dialog :visible.sync="dialogAdd" width="80%">
      <el-form label-width="90px" label-position="right">
        <el-form-item label="申请历史：">
          <el-table
            :data="history_list"
            border
            size="mini"
            style="width: 100%;padding:0px;margin:0px;"
            highlight-current-row
            fit
          >
            <el-table-column label="#ID">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="申请时间">
              <template slot-scope="scope">{{scope.row.createdate}}</template>
            </el-table-column>
            <el-form-item label="费用类型">
              <template
                slot-scope="scope"
              >{{scope.row?fee_apply_type.filter(res=>{return scope.row.fee_type == res.id})[0].name:''}}</template>
            </el-form-item>
            <el-table-column label="申请金额">
              <template
                slot-scope="scope"
              >{{currencys.filter(res=>{return scope.row.currency_id == res.id})[0].name_cn}}{{scope.row.amount}}</template>
            </el-table-column>
            <el-table-column label="收款人">
              <template slot-scope="scope">{{scope.row.receiver}}</template>
            </el-table-column>
            <el-table-column label="收款银行">
              <template slot-scope="scope">{{scope.row.bank}}</template>
            </el-table-column>
            <el-table-column label="收款账号">
              <template slot-scope="scope">{{scope.row.bank_account}}</template>
            </el-table-column>
            <el-table-column label="申请人员">
              <template slot-scope="scope">{{scope.row.user.name}}</template>
            </el-table-column>
            <el-table-column label="审核状态">
              <template
                slot-scope="scope"
              >{{check_status_info.filter(res=>{return scope.row.check_status == res.id})[0].name_cn}}</template>
            </el-table-column>
            <el-table-column label="状态">
              <template
                slot-scope="scope"
              >{{fee_apply_status.filter(res=>{return scope.row.status == res.id})[0].name_cn}}</template>
            </el-table-column>
            <el-table-column label="处理时间">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column label="处理人员">
              <template slot-scope="scope">{{scope.row.check_user_id}}</template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="付款信息：">
          <table border bordercolor="#E5E5E5" class="table">
            <tr>
              <td>费用类别</td>
              <td>申请金额</td>
              <td>收款人</td>
              <td>收款银行</td>
              <td>收款账号</td>
              <td>支付方式</td>
              <td>申请备注</td>
            </tr>
            <tr>
              <td>{{info_list.fee_type?fee_type_info.filter(i=>{return info_list.fee_type==i.id})[0].name:''}}</td>
              <td>
                {{info_list.amount}}
                {{info_list.currency_id?currencys.filter(res=>{return info_list.currency_id == res.id})[0].name_cn:''}}
              </td>
              <td>{{info_list.receiver}}</td>
              <td>{{info_list.bank}}</td>
              <td>{{info_list.bank_account}}</td>
              <td>{{info_list.pay_type?pay_type_info.filter(res=>{return info_list.pay_type == res.id})[0].name_cn:''}}</td>
              <td>{{info_list.note}}</td>
            </tr>
            <tr>
                <td>审核意见</td>
                <td colspan="6">
                    {{info_list.check_status?check_status_info.filter(res=>{return info_list.check_status == res.id})[0].name_cn:''}}
                </td>
            </tr>
            <tr>
                <td>审核备注</td>
                <td colspan="6">
                    {{info_list.check_remark}}
                </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item label class="form_item">
          <el-form label-width="100px" label-position="right">
            <el-form-item></el-form-item>
            <el-form-item label="付款银行：">
              <el-row>
                <el-col :span="6">
                  <el-select size="small" v-model="review_pay.pay_bank">
                    <el-option
                      v-for="item in pay_bank_info"
                      :key="item.id"
                      :label="item.name_cn"
                      :value="item.name_cn"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-row>
              <el-col :span="7">
                <el-form-item label="人民币汇率：">
                  <el-input size="small" v-model="review_pay.rmb_ratio" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="人民币金额：">
                  <el-input size="small" v-model="review_pay.rmb_amount" disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="付款状态：" :required="true">
              <el-row>
                <el-col :span="6">
                  <el-select size="small" v-model="review_pay.status">
                    <el-option
                      v-for="item in pay_status_info"
                      :key="item.id"
                      :label="item.name_cn"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="付款备注：">
              <el-row>
                <el-col :span="12">
                  <el-input
                    type="textarea"
                    :rows="3"
                    size="small"
                    v-model="review_pay.pay_remark"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="reviewCreate()" v-if="permissions.indexOf(313)>-1" :loading="save_fy">确定</el-button>
              <el-button size="mini" @click="reviewClose()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      style="text-align: right;margin-top:10px;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev,pager,next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import { lists, listTotal, create } from "@/api/finance";
export default {
  name: 'finance-pay',
  data() {
    return {
      permissions :JSON.parse(localStorage.getItem('permissions')),
      save_fy:false,
      list: {},
      info_list: [],
      history_list: [],
      currentPage: 1,
      dialogAdd: false,
      queryList: {
        page: "1",
        start_date: "",
        end_date: "",
        status: 0,
        contract_number: ""
      },
      review_pay: {
        fee_apply_id: "",
        status: "",
        pay_bank: "",
        rmb_ratio: "",
        rmb_amount: "",
        pay_remark:''
      },
      check_status_info: [],
      currencys: [],
      fee_apply_type: [],
      fee_type_info: [],
      is_paid_info: [],
      pay_type_info: [],
      fee_apply_status: [],
      pay_bank_info: [],
      pay_status_info: [],
      loading_search:false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      lists(this.queryList, "fee_application_pay_list").then(res => {
          if(this.loading_search){
              this.$message({
                  message: 'success',
                  type: 'success'
              })
              this.loading_search=false
          }
        this.list = res.data;
        obj(this.check_status_info, res.enum.check_status_info);
        obj(this.fee_apply_type, res.enum.fee_apply_type);
        this.currencys = res.enum.currencys;
        this.fee_type_info = res.enum.fee_type_info;
        this.is_paid_info = res.enum.is_paid_info;
        this.pay_type_info = res.enum.pay_type_info;
      });
    },
    reviewClick(id) {
      listTotal(id + "/fee_application_pay_view").then(res => {
        this.info_list = res.data.info;
        this.history_list = res.data.list;
        this.review_pay.pay_bank = res.data.info.pay_bank
        obj(this.fee_apply_status, res.enum.fee_apply_status);
        obj(this.pay_status_info, res.enum.pay_status_info);
        this.pay_bank_info = res.enum.pay_bank_info;
        this.review_pay.rmb_ratio = res.data.rmb_radio
        this.review_pay.rmb_amount =  parseFloat(res.data.rmb_radio)*parseFloat(res.data.info.amount)
        this.dialogAdd = true;
      });
    },
    reviewCreate() {
      this.review_pay.fee_apply_id = this.info_list.id;
      this.save_fy = true
      create(
        this.review_pay,
        "finance/" + this.review_pay.fee_apply_id,
        "fee_application_pay_save",
        this
      );
    },
    reviewClose() {
      this.dialogAdd = false;
      this.review_pay = {
        fee_apply_id: "",
        status: "",
        pay_bank: "",
        rmb_ratio: "",
        rmb_amount: ""
      };
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    Search() {
        this.loading_search=true
      this.queryList.page = 1;
        this.currentPage=1
      this.fetchData();
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
