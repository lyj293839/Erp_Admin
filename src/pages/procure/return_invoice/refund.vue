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
    /deep/ .form .el-form-item__content{
        width: 80%;
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
        td {
            padding: 5px;
            line-height: 30px;
        }
    }
</style>
<template>
    <d2-container>
        <div class="div">
            <!-- 页面 -->
            <el-form  label-position="right">
                <div style="margin:0;">
                    <el-form-item class="form_title">
                        <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
                            <b>本次退票</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show1" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">发票类型</th>
                                <th class="td">发票号码</th>
                                <th class="td">发票日期</th>
                                <th class="td">到票日期</th>
                                <th class="td">公司名称</th>
                                <th class="td">CAS</th>
                                <th class="td">产品名称</th>
                                <th class="td">数量</th>
                                <th class="td">单价</th>
                                <th class="td">金额</th>
                                <th class="td">税率</th>
                                <th class="td">税额</th>
                                <th class="td">不含税金额</th>
                            </tr>
                            <tr>
                                <td>{{getEnumValue(enums.Invoicetype,list.invoice.invoice_type)}}</td>
                                <td>{{list.invoice_number}}</td>
                                <td>{{list.invoice.invoice_date}}</td>
                                <td>{{list.invoice.invoice_receiver_date}}</td>
                                <td>{{list.invoice.supplier_name}}</td>
                                <td>{{list.invoice.cas}}</td>
                                <td>{{list.invoice.name}}</td>
                                <td>{{list.invoice.quantity}}
                                    {{getEnumValue(enums.Invoicetype,list.invoice.invoice_type)}}
                                </td>
                                <td>{{list.invoice.price}}</td>
                                <td>{{list.invoice.total_money}}</td>
                                <td>{{list.invoice.tax}}</td>
                                <td>{{list.invoice.tax_amount}}</td>
                                <td>{{list.invoice.total_money-list.invoice.tax_amount}}</td>
                            </tr>
                            <tr>
                                <td>退票申请时间</td>
                                <td>{{list.created_at}}</td>
                                <td>快递公司</td>
                                <td>{{list.post_corp}}</td>
                                <td>退票处理时间</td>
                                <td>{{list.post_time}}</td>
                                <td>快递代码</td>
                                <td>{{list.post_code}}</td>
                                <td>快递费</td>
                                <td>{{list.post_fee}}</td>
                                <td>备注</td>
                                <td colspan="2">{{list.post_note}}</td>
                            </tr>
                        </table>
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">发票类型</th>
                                <th class="td">发票编号</th>
                                <th class="td">开票日期</th>
                                <th class="td">到票日期</th>
                                <th class="td">公司名称</th>
                                <th class="td">CAS</th>
                                <th class="td">产品名称</th>
                                <th class="td">数量</th>
                                <th class="td">单价</th>
                                <th class="td">金额</th>
                                <th class="td">税率</th>
                                <th class="td">税额</th>
                                <th class="td">合计</th>
                            </tr>
                            <tr>
                                <td>{{getEnumValue(enums.Invoicetype,list.invoice.invoice_type)}}</td>
                                <td>{{list.invoice_number}}</td>
                                <td>{{list.invoice.invoice_date}}</td>
                                <td>{{list.invoice.invoice_receiver_date}}</td>
                                <td>{{list.invoice.supplier_name}}</td>
                                <td>{{list.invoice.cas}}</td>
                                <td>{{list.invoice.name}}</td>
                                <td>{{list.invoice.quantity}}
                                    {{getEnumValue(enums.Invoicetype,list.invoice.invoice_type)}}
                                </td>
                                <td>{{list.invoice.price}}</td>
                                <td>{{list.invoice.total_money}}</td>
                                <td>{{list.invoice.tax}}</td>
                                <td>{{list.invoice.tax_amount}}</td>
                                <td>{{list.invoice.total_money}}</td>
                            </tr>
                        </table>

                    </el-form-item>
                    <el-form :inline="true" class="quoteInput form">
                        <el-form-item label="退票备注" style="width: 32%;">
                            <el-input type="textarea" colspan="200" rows="6"  v-model="list.refund_invoicenote" placeholder="" disabled></el-input>
                        </el-form-item>
                        <el-form-item label="处理备注" style="width: 32%;">
                            <el-input type="textarea" colspan="200" rows="6" v-model="form.post_note" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="退票地址" style="width: 32%;">
                            <el-input type="textarea" colspan="200" rows="6" v-model="form.refund_address" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="快递公司" style="width: 32%;">
                            <el-select v-model="form.post_corp" class="d2-ml-5" style="width: 100%;" size="mini" clearable
                                       filterable
                                       placeholder="状态">
                                <el-option
                                        v-for="(i,index) in enums.ExpressCompany"
                                        :key="index"
                                        :label="i.name"
                                        :value="i.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="快递编号" style="width: 32%;">
                            <el-input size="mini" v-model="form.post_code" placeholder=""></el-input>
                        </el-form-item>
                        <el-form-item label="快递费" style="width: 32%;">
                            <el-input size="mini" v-model="form.post_fee" placeholder=""></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form-item class="from-item" style="margin:0px;text-align: center">
                        <el-button type="primary" @click="refund()" size="small">退票</el-button>
                        <el-button type="primary" @click="back()" size="small">返回</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </d2-container>
</template>
<script>
import { invoice_return_detail,modify_invoice_post} from '@/api/procure'
export default {
  name: 'procure-return_invoice_detail',
  data () {
    return {
      form_show1: true,
      list: [],
    form:{
        id:'',
        post_note:'',
        refund_address:"",
        post_corp:'',
        post_code:'',
        post_fee:''
    },
      enums: {},
    }
  },
  created () {
      this.fetchData()
  },
  watch: {
    $route (to, from) {
      if (to.name === 'procure-return_invoice_detail') {
        this.fetchData()
      }
    }
  },
  methods: {
    fetchData () {
        let obj={
            id:this.$route.query.id
        }
        invoice_return_detail(obj).then(res => {
        if (res && res.code === 0) {
          this.list = res.data
          this.form.refund_address=this.list.refund_address
          this.enums = res.enum
        }
      })
    },
    refund () {
        this.form.id=this.$route.query.id
        modify_invoice_post(this.form, this)
    },
    back () {
      this.$router.push({
        path: '/procure/return_invoice/index',
        name: 'procure-return_invoice'
      })
    }
  }
}
</script>
