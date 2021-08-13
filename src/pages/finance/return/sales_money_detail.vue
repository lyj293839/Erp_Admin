<style lang="scss" scoped type="text/scss">
    table {
        border-collapse: collapse;
        width: 100%;
    }
    /deep/ table .el-input__inner {
        border: none;
    }

    table td,th{
        font-size: 14px;
        padding: 5px;
        line-height: 25px;
    }
</style>
<template>
    <d2-container>
        <table border="1" bordercolor="#E5E5E5" style="width:100%;">
            <tr>
                <th>#ID</th>
                <th>合同号</th>
                <th>开户银行</th>
                <th>收款人</th>
                <th>开户账号</th>
                <th>退款方式</th>
                <th>退款金额</th>
                <th>已退金额</th>
                <th>货币</th>
                <th>备注</th>
                <th>审核状态</th>
                <th>状态</th>
            </tr>
            <tr v-for="item in list" :key="item.id">
                <td>{{item.id}}</td>
                <td>{{item.sales_contract_detail?item.sales_contract_detail.contract_number:''}}</td>
                <td>{{item.opening_bank}}</td>
                <td>{{item.payee}}</td>
                <td>{{item.bank_account_number}}</td>
                <td>{{getEnumValue(enums.PayType,item.pay_type)}}</td>
                <td>{{item.total_money}}</td>
                <td>{{item.already_return_money}}</td>
                <td>{{getEnumValue(enums.Currency,item.currency_id)}}</td>
                <td>{{item.remark}}</td>
                <td>{{getEnumValue(enums.statuses,item.status)}}</td>
                <td>{{getEnumValue(enums.pay_statuses,item.pay_status)}}</td>
            </tr>
        </table>
        <table border="1" bordercolor="#E5E5E5" class="d2-mt-10" style="width:100%;">
            <tr>
                <th>开户银行</th>
                <th width='140'>国家/省市</th>
                <th width='100'>收款人</th>
                <th>开户账号</th>
                <th>退款金额</th>
                <th>退款银行</th>
                <th width="60">货币</th>
                <th width='100'>人民币汇率</th>
                <th>退款金额(人民币)</th>
            </tr>
            <tr>
                <td><el-input  size="mini" v-model="form.opening_bank" disabled></el-input></td>
                <td>
                    {{form.country_code}}
                    <span v-if="form.province_code">,{{form.province_code}}</span>
                </td>
                <td><el-input  size="mini" v-model="form.payee" disabled></el-input></td>
                <td><el-input  size="mini" v-model="form.bank_account_number" disabled></el-input></td>
                <td><el-input  size="mini" v-model="return_money" disabled></el-input></td>
                <td>
                    <el-select size="mini" v-model="bank_id" clearable class="d2-mr-5">
                        <el-option
                                v-for="item in enums.PayBank"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </td>
                <td>{{getEnumValue(enums.Currency,form.currency_id)}}</td>
                <td><el-input  size="mini" v-model="rate"></el-input></td>
                <td><el-input  size="mini" :value="return_money*rate" disabled></el-input></td>
            </tr>
            <tr v-if="form.type==2">
                <th>Swift</th>
                <th>退款方式</th>
                <th>汇款货币</th>
                <th>汇款费用选择</th>
            </tr>
            <tr v-if="form.type==2">
                <td>{{form.swift}}</td>
                <td><el-input  size="mini" :value="getEnumValue(enums.PayType,form.pay_type)" disabled></el-input></td>
                <td>{{getEnumValue(enums.Currency,form.trade_currency)}}</td>
                <td>{{getEnumValue(enums.remittance_fee_selection,form.remittance_fee_selection)}}</td>
            </tr>
        </table>
        <el-form label-width="40px" class="demo-ruleForm d2-mt-10">
            <el-form-item label="备注" prop="desc">
                <el-input type="textarea" v-model="note"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()" size="mini" :loading="save_fy">保存</el-button>
                <el-button type="primary" @click="back()" size="mini">返回</el-button>
            </el-form-item>
        </el-form>
    </d2-container>
</template>
<script>
    import {select_sales_detail,sales_return} from "@/api/finance"
    import Big from "@/big/a/big.mjs";
    import { mapActions } from 'vuex'
    export default {
        name: "finance-return_sales_money_detail",
        watch: {
            $route(to, from) {
                if (to.name=='finance-sale_invoice_detail') {
                    this.fetchData();
                }
            }
        },
        data() {
            return {
                list: [],
                save_fy:false,
                form:{},
                return_money:0,
                rate:'',
                bank_id:'',
                note:'',
                enums: {}
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            ...mapActions('d2admin/page',['closeAdd']),
            fetchData() {
                let obj = {
                    ids: JSON.parse(this.$route.query.ids)
                }
                select_sales_detail(obj).then(res => {
                    res.data.forEach((items,index)=>{
                        items.already_return_money=0
                        items.receipts.forEach((m,n)=>{
                            items.already_return_money+=Math.abs(m.checkin)
                        })
                    })
                    this.list = res.data
                    this.list.forEach((items,index)=>{
                        this.return_money=new Big(this.return_money).plus(new Big(items.total_money).minus(items.already_return_money))
                    })
                    this.form=res.data[0]
                    this.bank_id = this.form.refund_bank_id
                    for(var value in res.enum.Currency){
                        if(res.enum.Currency[value].id==res.data[0].currency_id){
                            this.rate=(new Big(1).div(res.enum.Currency[value].ratio)).toFixed(2)
                        }
                    }
                    this.enums = res.enum
                })
            },
           submitForm(){
                let obj={
                    ids:JSON.parse(this.$route.query.ids),
                    pay_type:this.form.pay_type,
                    to_name:this.form.payee,
                    to_bank:this.form.opening_bank,
                    to_account:this.form.bank_account_number,
                    money:this.return_money,
                    rate:this.rate,
                    bank_id:this.bank_id,
                    note:this.note,
                }
                this.save_fy = true
                var tagName = 'finance-return_sales_money_detail'
                sales_return(obj,this,tagName)
           },
           back(){
               let  that=this
               that.$router.push({
                   path: '/finance/return/sales_money',
                   name: 'finance-return_sales_money'
               })
               var tagName = 'finance-return_sales_money_detail'
               that.closeAdd({tagName})
           }
        }

    }
</script>

<style scoped>

</style>