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
                <div style="margin:20px 0px;">
                    <el-form-item class="form_title">
                        <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
                            <b>本次退票</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show1" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">合同号</th>
                                <th class="td">CAS</th>
                                <th class="td">名称</th>
                                <th class="td">规格</th>
                                <th class="td">数量</th>
                                <th class="td">单价</th>
                                <th class="td">金额</th>
                                <th class="td">税率</th>
                                <th class="td">含税额</th>
                                <th class="td">不含税额</th>
                                <th class="td">状态</th>
                                <th class="td">备注</th>
                            </tr>
                            <tr v-for="item in list.invoice_details" :key="item.id">
                                <td>{{item.contract_number}}</td>
                                <td>{{item.cas}}</td>
                                <td>{{item.product_name}}</td>
                                <td>{{item.package}}</td>
                                <td>{{item.quantity}}{{getEnumValue(enums.units,item.quantity_unit)}}</td>
                                <td>{{item.price}}{{currencyIcon = getEnumValue(enums.currencys,list.currency_id,'icon')}}</td>
                                <td>{{item.total_money}}{{currencyIcon}}</td>
                                <td>{{item.tax}}{{currencyIcon}}</td>
                                <td>{{item.tax_amount}}{{currencyIcon}}</td>
                                <td>{{item.excluding_tax_amount}}{{currencyIcon}}</td>
                                <td>{{getEnumValue(enums.statuses,item.status)}}</td>
                                <td>{{item.remark}}</td>
                            </tr>
                        </table>
                    </el-form-item>
                    <el-form :inline="true">
                        <el-form-item label="退票备注">
                            <el-input type="textarea" colspan="80" rowspan="3" v-model="audit_note" placeholder=""></el-input>
                        </el-form-item>
                    </el-form>
                    <el-form-item class="from-item" style="margin:0px;text-align: center">
                        <el-button type="primary" @click="refund()" size="small" :loading="save_fy">退票</el-button>
                        <el-button type="primary" @click="back()" size="small">返回</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </d2-container>
</template>
<script>
import Big from '@/big/a/big.mjs'
import $ from 'jquery'
import { return_invoice, return_invoice_view } from '@/api/finance'
import util from '@/libs/util'
import { mapActions } from "vuex";
export default {
  name: 'finance-sale_invoice_refund',
  data () {
    return {
      form_show1: true,
      save_fy:false,
      list: [],
      enums: {},
      audit_note: ''
    }
  },
  created () {
    if (this.$route.query.id) {
      this.fetchData()
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'finance-sale_invoice_refund') {
        this.fetchData(this.$route.query.id)
      }
    }
  },
  methods: {
      ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData () {
      return_invoice_view(this.$route.query.id).then(res => {
        if (res && res.code === 0) {
            res.data.invoice_details.forEach(i=>{
                if(!i.package){
                    i.package = i.cas
                }
            })
          this.list = res.data
          this.enums = res.enum
        }
      })
    },
    refund () {
      let obj = {
        id: this.$route.query.id,
        audit_note: this.audit_note
      }
      this.save_fy = true
      return_invoice(obj, this)
    },
    back () {
        var that = this
        that.$router.push({
        path: '/finance/finance-sale_invoice',
        name: 'finance-sale_invoice'
      })
      const tagName = "finance-sale_invoice_refund";
        that.closeAdd({ tagName });
    }
  }
}
</script>
