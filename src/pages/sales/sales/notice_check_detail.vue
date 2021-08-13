<style lang="scss" scoped type="text/scss">
/deep/ .div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  .el-input__inner {
    border: 0px;
    padding: 0px 0px;
  }
  .el-dialog {
    table {
      width: 100%;
    }
  }
  .form_title {
    background: #f1f1f1;
    margin-bottom: 0px;
    .el-button {
      color: black;
    }
  }
  td {
    padding: 0px 5px;
  }
  th {
    padding: 5px;
  }
}

.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
  /deep/.el-form-item__content{
    width: 100%;
  }
  table {
    border-collapse: collapse;
    margin-top: 5px;
    .el-select {
      width: 100%;
    }
  }
}

/deep/ .quoteInput {
  padding: 20px 0px;
  .el-input__inner {
    border: 1px solid #dcdfe6;
    padding: 0px 10px;
  }
}

/deep/ .dateInputStyle {
  .el-input__inner {
    padding: 0px 15px;
  }
  .el-input__prefix {
    left: -8px;
  }
}

/deep/ table {
  width: 100%;
  border-collapse: collapse;
  .el-input__inner {
    border: 0px;
    padding: 0px;
  }
  td,th {
    padding: 5px;
    line-height: 30px;
    word-break:break-all;
    min-width: 50px;
  }
}
</style>
<template>
  <d2-container>
    <div class="div">
      <!-- 页面 -->
      <el-form label-width="0px" label-position="right">
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale173')}}</b>
              <!-- 发票信息 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">{{$t('sale.add.sale160')}}</th>
                <!-- 申请时间 -->
                <th class="td">{{$t('sale.add.sale164')}}</th>
                <!-- 申请人员 -->
                <th class="td">{{$t('sale.add.sale25')}}</th>
                <!-- 发票类型 -->
                <th class="td">{{$t('sale.add.sale179')}}</th>
                <!-- 公司开票名称 -->
                <th class="td">{{$t('sale.add.sale175')}}</th>
                <!-- 税号 -->
                <th class="td">{{$t('sale.add.sale71')}}{{$t('sale.add.sale73')}}</th>
                <!-- 地址电话 -->
                <th class="td">{{$t('sale.add.sale150')}}</th>
                <!-- 银行账号 -->
                <th class="td" v-if="detail.invoice_type==3">接收发票邮箱</th>
                <!--  -->
              </tr>
              <tr>
                <td>{{detail.created_at}}</td>
                <td>{{detail.user.name}}</td>
                <td>{{getEnumValue(invoice_type,detail.invoice_type)}}</td>
                <td>{{detail.company_name}}</td>
                <td>{{detail.duty_paragraph}}</td>
                <td>{{detail.address}}{{detail.mobile}}</td>
                <td>{{detail.bank_account_number}}</td>
                <td v-if="detail.invoice_type==3">{{detail.receive_invoice_email}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale286')}}</b><!-- 开票记录 -->
            </el-button>
          </el-form-item>
          <el-form-item>
            <div v-if="invoice_notice_list.length>0" v-for="item in invoice_notice_list">
              <table
                border="1"
                bordercolor="#E5E5E5"
                style="width: 100%;margin-top: 20px;"
              >
                <tr style="background:#EAF2F7;">
                  <th width='80'>开票分类</th>
                  <th width="150">{{$t('sale.add.sale160')}}</th> <!-- 申请时间 -->
                  <th width="100">{{$t('sale.add.sale25')}}</th> <!-- 发票类型 -->
                  <th width='60'>税率</th>
                  <th width="150">{{$t('sale.add.sale239')}}</th> <!-- 开票金额 -->
                  <th>{{$t('sale.add.sale59')}}</th> <!-- 备注 -->
                  <th width="100">{{$t('sale.add.sale105')}}</th> <!-- 审核状态 -->
                  <th width="200">{{$t('sale.add.sale240')}}</th> <!-- 开票状态 -->
                  <th width="200">{{$t('sale.add.sale181')}}</th> <!-- 处理状态 -->
                </tr>
                <tr>
                  <td>
                    <span v-if="item.type==1" style="color:green;">{{getEnumValue(type_info,item.type)}}</span>
                    <span v-else style="color:red;">{{getEnumValue(type_info,item.type)}}</span>
                  </td>
                  <td>{{item.created_at}}</td>
                  <td>{{getEnumValue(invoice_type,item.invoice_type)}}</td>
                  <td>{{item.tax}}</td>
                  <td>{{item.total_money}}</td>
                  <td>{{item.remark}}</td>
                  <td>
                    <span
                      v-if="item.status==3"
                      style="color:red;"
                    >{{getEnumValue(status_info,item.status)}}</span>
                    <span v-else-if="item.status==2" style="color:green;">{{getEnumValue(status_info,item.status)}}</span>
                    <span v-else style="color:#E6A23C;">{{getEnumValue(status_info,item.status)}}</span>
                  </td>
                  <td>
                    <span v-if="item.invoice_status==2" style="color:green;">{{getEnumValue(invoice_notice_status,item.invoice_status)}}</span>
                    <span v-else-if="item.invoice_status==10" style="color:red;">{{getEnumValue(invoice_notice_status,item.invoice_status)}}</span>
                    <span v-else>{{getEnumValue(invoice_notice_status,item.invoice_status)}}</span>
                  </td>
                  <td>
                    <span :style="(item.deal_status==2)?'color:green;':'color:red;'">{{getEnumValue(deal_status_info,item.deal_status)}}</span>
                  </td>
                </tr>
              </table>
              <table
                border="1"
                bordercolor="#E5E5E5"
                v-if="item.invoices.length>0"
                v-for="item_a in item.invoices"
              >
                <tr style="background:#F5F8FB;">
                  <td>{{$t('sale.add.sale242')}}</td> <!-- 发票号码 -->
                  <td>{{$t('sale.add.sale243')}}</td> <!-- 通知单ID -->
                  <td>{{$t('sale.add.sale174')}}</td> <!-- 公司名称 -->
                  <td>{{$t('sale.add.sale25')}}</td> <!-- 发票类型 -->
                  <td>{{$t('sale.add.sale244')}}</td> <!-- 发票日期 -->
                  <td>{{$t('sale.add.sale175')}}</td> <!-- 税号 -->
                  <td colspan="3">{{$t('sale.add.sale287')}}</td> <!-- 地址电话 -->
                  <td>{{$t('sale.add.sale150')}}</td> <!-- 银行账号 -->
                  <td width='60'>{{$t('sale.add.sale181')}}</td><!-- 处理状态 -->
                </tr>
                <tr>
                  <td>{{item_a.invoice_number}}</td>
                  <td>{{item_a.invoice_notice_id}}</td>
                  <td>{{item_a.company_name}}</td>
                  <td>
                    {{getEnumValue(invoice_type,item_a.invoice_type)}}
                    <!-- <el-select
                      v-model="item_a.invoice_type"
                      size="mini"
                      clearable
                      filterable
                      style="width:100%;"
                    >
                      <el-option
                        v-for="(i,index) in invoice_type"
                        :key="index"
                        :label="i.name"
                        :value="i.id"
                      ></el-option>
                    </el-select> -->
                  </td>
                  <td>{{item_a.invoice_date}}</td>
                  <td>{{item.duty_paragraph}}</td>
                  <td colspan="3">
                    <span>{{item.address}}</span>
                    <br />
                    <span>{{item.mobile}}</span>
                  </td>
                  <td>{{item.bank_account_number}}</td>
                  <td>
                    <span :style="(item_a.status==2)?'color:red;':'color:green;'">{{getEnumValue(statuses,item_a.status)}}</span>
                  </td>
                </tr>
                <tr v-if="item_a.invoice_details&&item_a.invoice_details.length>0" style="background:#F5F8FB;">
                  <td width="120">
                    {{$t('sale.add.sale44')}}
                    <span v-if="item.type==2">/原发票号</span>
                  </td><!-- 合同号 -->
                  <td width="100">CAS</td>
                  <td width="280">{{$t('sale.add.sale15')}}</td><!-- 产品名称 -->
                  <td width='80'>{{$t('sale.add.sale18')}}</td><!-- 数量 -->
                  <td width='80'>{{$t('sale.add.sale21')}}</td><!-- 单价 -->
                  <td width='80'>{{$t('sale.add.sale12')}}</td><!-- 金额 -->
                  <td width='60'>{{$t('sale.add.sale245')}}</td><!-- 税率 -->
                  <td width='80'>{{$t('sale.add.sale246')}}</td><!-- 税额 -->
                  <td width='80'>{{$t('sale.add.sale98')}}</td><!-- 不含税金额 -->
                  <td colspan="2">{{$t('sale.add.sale59')}}</td><!-- 备注 -->
                </tr>
                <tr v-if="item_a.invoice_details&&item_a.invoice_details.length>0" v-for="i in item_a.invoice_details">
                  <td>
                    {{i.contract_number}}<br>
                    <span v-if="item.type==2">{{i.related_invoice_number}}</span>
                  </td>
                  <td>{{i.cas}}</td>
                  <td>{{i.product_name}}</td>
                  <td>{{i.quantity}}{{getEnumValue(units,i.quantity_unit)}}</td>
                  <td>{{i.price}}</td>
                  <td>{{i.total_money}}</td>
                  <td>{{i.tax}}</td>
                  <td>{{i.tax_amount}}</td>
                  <td>{{i.excluding_tax_amount}}</td>
                  <td colspan="2">{{i.remark}}</td>
                </tr>
                <tr>
                  <td><b>{{$t('sale.add.sale259')}}:</b></td>
                  <td colspan="4"></td>
                  <td>{{item_a.total_money}}</td>
                  <td></td>
                  <td>{{item_a.tax_money}}</td>
                  <td colspan="3"></td>
                </tr>
              </table>
            </div>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale180')}}</b>
              <!-- 开票明细 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th width='100' v-if="detail.type==2">原开票号</th>
                <th class="td" width="110">{{$t('sale.add.sale44')}}</th>
                <!-- 合同号 -->
                <th class="td" width="110">CAS</th>
                <!-- CAS -->
                <th class="td" width="400">{{$t('sale.add.sale15')}}</th>
                <!-- 产品名称 -->
                <th class="td" width="110">{{$t('sale.add.sale16')}}</th>
                <th class="td" width="80">{{$t('sale.add.sale18')}}</th>
                <!-- 数量 -->
                <th class="td" width="80">{{$t('sale.add.sale21')}}</th>
                <!-- 单价 -->
                <th class="td" width="90">{{$t('sale.add.sale22')}}</th>
                <!-- 金额 -->
                <th class="td">{{$t('sale.add.sale59')}}</th>
                <!-- 备注 -->
              </tr>
              <tr v-for="item in detail.details">
                <td v-if="detail.type==2">{{item.red_invoice_related?item.red_invoice_related.invoice_number:''}}</td>
                <td>{{item.contract_number}}</td>
                <td>{{item.cas}}</td>
                <td>{{item.saler_contract_detail.product_name_cn?item.saler_contract_detail.product_name_cn:item.product_name}}</td>
                <td>{{item.package}}</td>
                <td>{{item.quantity}}{{units[item.quantity_unit]?units[item.quantity_unit].name:" "}}</td>
                <td>{{item.price}}{{currencys[item.currency_id]?currencys[item.currency_id].name:''}}</td>
                <td>{{item.total_money}}{{currencys[item.currency_id]?currencys[item.currency_id].name:''}}</td>
                <td>{{item.remark}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale59')}}：</td>
                <td colspan="7">{{detail.remark}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale59')}}</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <el-input v-model="detail.remark" type="textarea" style="width:100%;"></el-input>
          </el-form-item>
        </div> -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale85')}}</b>
              <!-- 审合信息 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item" label>
            <div class="d2-m-10">
              <span style="margin-right: 10px;">{{$t('sale.add.sale86')}}:</span>
              <!-- 审合 -->
              <el-radio-group v-model="form.status">
                <el-radio :label="2">{{$t('sale.add.sale87')}}</el-radio>
                <!-- 审合通过 -->
                <el-radio :label="3">{{$t('sale.add.sale88')}}</el-radio>
                <!-- 不通过 -->
              </el-radio-group>
            </div>
            <div class="d2-m-10">
              <span
                style="margin-right: 10px;vertical-align: top;display: inline-block;"
              >{{$t('sale.add.sale89')}}:</span>
              <!-- 审合意见 -->
              <textarea v-model="form.remark" cols="100%" rows="4"></textarea>
            </div>
          </el-form-item>
        </div>
        <el-form-item class="from-item" style="margin:0px;text-align: center">
          <el-button type="primary" :loading='loading' @click="save()" size="small">{{$t('save')}}</el-button>
          <!-- 保存 -->
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import $ from "jquery";
import {
  // eslint-disable-next-line camelcase
  notice_verify_view,
  // eslint-disable-next-line camelcase
  notice_verify
} from "@/api/sale";
// eslint-disable-next-line no-unused-vars
import util from "@/libs/util";
import { mapActions } from "vuex";

export default {
  name: "sales-notice_check_detail",
  data() {
    return {
      ids: "",
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      loading:false,
      detail: {user:{}},
      invoice_notice_list: [],
      invoice_type: [],
      units: [],
      currencys: [],
      deal_status_info:[],
      invoice_notice_return_statuses:[],
      statuses:[],
      invoice_status_info:[],
      status_info:[],
      invoice_notice_status:[],
      type_info:[],
      form: {
        status: 2,
        remark: "",
        invoice_notice_id: ""
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      if (!this.ids || this.ids != this.$route.query.id) {
        this.fetchData(this.$route.query.id);
        this.form = {
          status: 2,
          remark: "",
          invoice_notice_id: ""
        };
        this.ids = this.$route.query.id;
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-notice_check_detail") {
        if (this.$route.query.id) {
          if (!this.ids || this.ids != this.$route.query.id) {
            this.fetchData(this.$route.query.id);
            this.form = {
              status: 2,
              remark: "",
              invoice_notice_id: ""
            };
            this.ids = this.$route.query.id;
          }
        }
      }
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData(id) {
      notice_verify_view(id).then(res => {
        // eslint-disable-next-line eqeqeq
        if (res && res.code === 0) {
          // res.data.notice.details.forEach(i=>{
          //   i.package = i.cas
          // })
          this.detail = res.data.notice;
          this.invoice_notice_list = res.data.invoice_notice_list;
          this.invoice_type = res.enum.invoice_type;
          this.units = res.enum.units;
          this.currencys = res.enum.currencys;
          this.deal_status_info = res.enum.deal_status_info
          this.invoice_notice_return_statuses = res.enum.invoice_notice_return_statuses
          this.status_info = res.enum.status_info
          this.invoice_status_info = res.enum.invoice_status_info
          this.statuses = res.enum.statuses
          this.invoice_notice_status = res.enum.invoice_notice_status
          this.type_info = res.enum.type_info
        }
      });
    },
    save() {
      this.form.invoice_notice_id = this.detail.id;
      var tagName = "sales-notice_check_detail";
      this.loading = true
      notice_verify(this.form, this, tagName);
    }
  }
};
</script>
