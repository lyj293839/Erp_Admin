<style lang="scss" scoped type="text/scss">
.heard_top {
  margin: 10px 0px 15px 0px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  span{font-size: 10px;}
  .el-select {
    margin: 0px 10px;
  }
}
.table{
    width: 100%;
    border-collapse: collapse;
    td{padding-left: 5px;}
}
.form_item{
    .el-form-item{margin-top: 10px;}
}
/deep/.gutter {
  display: block !important;
}
</style>
<template>
  <d2-container>
    <!-- 页眉 -->
    <div class="heard_top">
      <div>
        <el-date-picker
          size="mini"
          type="date"
          placeholder="申请开始"
          v-model="queryList.start_date"
          value-format="yyyy-MM-dd"
          format="yyyyMMdd"
          style="width: 110px;"
        ></el-date-picker>
        <span style="margin:0px 5px">至</span>
        <el-date-picker
          size="mini"
          type="date"
          placeholder="申请日期"
          v-model="queryList.end_date"
          value-format="yyyy-MM-dd"
          format="yyyyMMdd"
          style="width: 110px;"
        ></el-date-picker>
      </div>
      <el-select size="mini" v-model="queryList.check_status" clearable style="width: 100px;">
        <el-option
          v-for="item in check_status_info"
          :key="item.id"
          :label="item.name_cn"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-button type="primary" size="mini" @click="Search()" :loading="loading_search">搜索</el-button>
    </div>

    <!-- 页面 -->
    <el-table
      :data="list.data"
      border
      style="width: 100%;padding:0px;margin:0px;font-size: 12px;"
      highlight-current-row
      fit
    >
      <el-table-column label="ID">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="合同类型">
        <template
          slot-scope="scope"
        >{{scope.row.type?fee_apply_type.filter(i=>{return scope.row.type==i.id})[0].name_cn:''}}</template>
      </el-table-column>
      <el-table-column label="合同号">
        <template slot-scope="scope">{{scope.row.contract_number}}</template>
      </el-table-column>
      <el-table-column label="结算月份">
        <template slot-scope="scope"></template>
      </el-table-column>
      <el-table-column label="费用类别">
        <template
          slot-scope="scope"
        >{{fee_type_info.filter(i=>{return scope.row.fee_type==i.id})[0].name}}</template>
      </el-table-column>
      <el-table-column label="申请金额">
        <template
          slot-scope="scope"
        >{{scope.row.amount}}{{currencys.filter(res=>{return scope.row.currency_id == res.id})[0].name_cn}}</template>
      </el-table-column>
      <el-table-column label="收款人">
        <template slot-scope="scope">{{scope.row.receiver}}</template>
      </el-table-column>
      <el-table-column label="备注">
        <template slot-scope="scope">{{scope.row.note}}</template>
      </el-table-column>
      <el-table-column label="审核状态">
        <template
          slot-scope="scope"
        >{{check_status_info.filter(i=>{return scope.row.check_status==i.id})[0].name_cn}}</template>
      </el-table-column>
      <el-table-column label="申请时间">
        <template slot-scope="scope">{{scope.row.createdate}}</template>
      </el-table-column>
      <el-table-column label="申请人">
        <template slot-scope="scope">{{scope.row.user.name}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.check_status==0&&permissions.indexOf(310)>-1"
            type="primary"
            size="mini"
            @click="reviewClick(scope.row.id)"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 审核 -->
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
            <el-table-column label="ID">
              <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="合同ID">
              <template slot-scope="scope">{{scope.row.contract_id}}</template>
            </el-table-column>
            <el-table-column label="合同号">
              <template slot-scope="scope">{{scope.row.contract_number}}</template>
            </el-table-column>
            <el-table-column label="申请时间">
              <template slot-scope="scope">{{scope.row.createdate}}</template>
            </el-table-column>
            <el-table-column label="费用类型">
              <template
                slot-scope="scope"
              >{{fee_type_info.filter(i=>{return scope.row.fee_type==i.id})[0].name}}</template>
            </el-table-column>
            <el-table-column label="金额">
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
            <el-table-column label="收款帐号">
              <template slot-scope="scope">{{scope.row.bank_account}}</template>
            </el-table-column>
            <el-table-column label="审核状态">
              <template
                slot-scope="scope"
              >{{check_status_info.filter(i=>{return scope.row.check_status==i.id})[0].name_cn}}</template>
            </el-table-column>
            <el-table-column label="状态">
              <template
                slot-scope="scope"
              >{{fee_apply_status.filter(i=>{return scope.row.status==i.id})[0].name_cn}}</template>
            </el-table-column>
            <el-table-column label="申请人员">
              <template slot-scope="scope">{{scope.row.user.name}}</template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="费用信息：">
          <table border bordercolor="#E5E5E5" class="table">
            <tr>
              <td>费用类别</td>
              <td>申请金额</td>
              <td>收款人</td>
              <td>收款银行</td>
              <td>收款账号</td>
              <td>支付方式</td>
              <td>备注</td>
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
              <td>
                  <!-- {{info_list.pay_type?pay_type_info.filter(res=>{return info_list.pay_type == res.id})[0].name_cn:''}} -->
              </td>
              <td>{{info_list.note}}</td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item label="审核信息：" class="form_item">
          <el-form label-width="100px" label-position="right">
            <el-form-item></el-form-item>
            <el-form-item label="审核意见：" :required="true">
              <el-row>
                <el-col :span="6">
                  <el-radio-group v-model="reviewData.check_status">
                    <el-radio :label="1">通过</el-radio>
                    <el-radio :label="-1">不通过</el-radio>
                  </el-radio-group>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="付款银行：" :required="true">
              <el-row>
                <el-col :span="6">
                  <el-select size="small" v-model="reviewData.pay_bank">
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
            <el-form-item label="审核意见：">
              <el-row>
                <el-col :span="12">
                  <el-input
                    type="textarea"
                    :rows="3"
                    size="small"
                    v-model="reviewData.check_remark"
                  ></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="reviewCreate()" :loading="save_fy">确定</el-button>
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
  name: 'finance-fee',
  data() {
    return {
      save_fy:false,
      permissions :JSON.parse(localStorage.getItem('permissions')),
      list: {},
      info_list: {},
      history_list: [],
      dialogAdd: false,
      currentPage: 1,
      queryList: {
        page: "1",
        start_date: "",
        end_date: "",
        check_status: 0
      },
      reviewData: {
        check_status: "",
        id: "",
        pay_bank: "",
        check_remark: ""
      },
      check_status_info: [],
      currencys: [],
      fee_apply_type: [],
      fee_type_info: [],
      fee_apply_status: [],
      pay_type_info: [],
      pay_bank_info: [],
      loading_search:false
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      lists(this.queryList, "fee_application_list").then(res => {
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
      });
    },
    reviewClick(id) {
      listTotal(id + "/fee_application_view").then(res => {
        this.info_list = res.data.info;
        this.history_list = res.data.list;
        obj(this.fee_apply_status, res.enum.fee_apply_status);
        this.pay_type_info = res.enum.pay_type_info;
        this.pay_bank_info = res.enum.pay_bank_info;
        this.dialogAdd = true;
      });
    },
    reviewCreate() {
      this.reviewData.id = this.info_list.id;
      this.save_fy = true
      create(
        this.reviewData,
        "finance/" + this.reviewData.id,
        "fee_application_verify",
        this
      );
    },
    reviewClose() {
      this.dialogAdd = false;
      this.reviewData = {
        check_status: "",
        id: "",
        pay_bank: "",
        note: ""
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
