<template>
    <d2-container>
        <div>
            <el-row :gutter="5" type="flex" align="middle" justify="end">
                <el-col :span="24" class="d2-text-right">
                    <!--<el-input size="mini" style="width: 150px;" v-model="queryList.contract_number"-->
                              <!--placeholder="合同号"></el-input>-->
                    <el-select
                        v-model="queryList.billing_party_id"
                        placeholder="开票方"
                        clearable
                        size='mini'
                        filterable
                    >
                        <el-option v-for="i in corp"  :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.start_date"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            type="date"
                            placeholder="开票开始时间"
                            size="mini"
                            style="width: 140px;"
                    ></el-date-picker>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.end_date"
                            value-format="yyyy-MM-dd"
                            format="yyyyMMdd"
                            type="date"
                            placeholder="开票截止时间"
                            size="mini"
                            style="width: 140px;"
                    ></el-date-picker>
                    <el-select
                            size="mini"
                            multiple
                            v-model="queryList.delivery_status"
                            placeholder="发货状态"
                            style="width:100px;margin:5px;"
                            clearable
                    >
                        <el-option v-for="item in enums.settle_delivery_status" :label="item.name_cn" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.scoc_status"
                            placeholder="结转状态"
                            style="width:100px;"
                            clearable
                    >
                        <el-option v-for="item in enums.scoc_statuses" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.scic_status"
                            placeholder="操作状态"
                            style="width:120px;margin:5px;"
                            clearable
                    >
                        <el-option v-for="item in enums.scic_statuses" :label="item.name" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                    <!--<el-select v-model="queryList.invoice_status" class="d2-ml-5" style="width: 110px;" size="mini" clearable-->
                               <!--filterable-->
                               <!--placeholder="发票类型">-->
                        <!--<el-option-->
                                <!--v-for="(i,index) in enums.Invoicetype"-->
                                <!--:key="index"-->
                                <!--:label="i.name"-->
                                <!--:value="i.id">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search"
                    >{{$t('search')}}
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_sales_invoice"
                            @click="export_sales_invoice"
                    >收入凭证
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_cost_invoice"
                            @click="export_cost_invoice"
                    >结转成本
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading='loading_cost'
                            @click="export_cost"
                            v-if="permission_names['k3.export_invoice_cost']=='k3.export_invoice_cost'"
                    >成本导出
                    </el-button>
                    <a :href="export_cost_invoice_url" ref="export_cost_invoice_url" hidden></a>
                    <a :href="export_sales_invoice_url" ref="export_sales_invoice_url" hidden></a>
                    <a :href="export_invoice_cost_url" ref="export_invoice_cost_url" hidden></a>
                    <a :href="prod_export_url" ref="prod_export_url" hidden></a>
                </el-col>
            </el-row>
            <div style="text-align:right;">
                <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            v-if="permissions.indexOf(625)>-1"
                            :loading="loading_confirm_income"
                            @click="confirm_income_click()"
                    >确认收入凭证
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            v-if="permissions.indexOf(626)>-1"
                            :loading="loading_confirm_cost"
                            @click="confirm_cost_click()"
                    >确认结转成本
                    </el-button>
            </div>
        </div>
        <el-table style="font-size: 12px" :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column align="center" width="100">
                <template slot="header">
                   <el-button size="mini" type="primary" @click="select_all">全选</el-button>
                </template>
                <template slot-scope="scope">
                       <el-checkbox
                                v-model="scope.row.checked"
                                @change="select_one(scope.row.checked,scope.row.id)"
                        ></el-checkbox>
                        {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='合同号'>
                <template slot-scope="scope">
                       {{scope.row.contract_number}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='客户名称'>
                <template slot-scope="scope">
                    {{attr(scope.row,"sale_contract_detail.saler_contract.customer_name")}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='发票号码'>
                <template slot-scope="scope">
                    {{scope.row.invoice_number}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='发票类型'>
                <template slot-scope="scope">
                    {{getEnumValue(enums.Invoicetype,scope.row.main_invoice_notice.invoice_type)}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='公司名称'>
                <template slot-scope="scope">
                    {{scope.row.main_invoice_notice.company_name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='总金额(￥)'>
                <template slot-scope="scope">
                    {{scope.row.total_money}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='税额(￥)'>
                <template slot-scope="scope">
                    {{scope.row.tax_amount}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='销售人员' width='80'>
                <template slot-scope="scope">
                    {{attr(scope.row,"sale_contract_detail.saler_contract.sale.name")}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='开票日期' width='100'>
                <template slot-scope="scope">
                    {{scope.row.created_at}}
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="total,sizes,prev, pager, next"
                :page-sizes="[15,50,100,200,500]"
                :page-size="list.per_page"
                @size-change="handleSizeChange"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>

<script>

    import { 
        notice_billing_list,
        sales_invoice_export,
        export_sales_invoice,
        export_cost_invoice,
        export_invoice_cost,
        sales_invoice,
        confirm_income,
        confirm_cost
    } from '@/api/finance'
    import { customer_lists } from '@/api/sale'
    import { parseTime, getEnumValue } from '@/utils/index'
    import axios from 'axios'
    export default {
        name: 'finance-K3',
        data () {
            return {
                getEnumValue: getEnumValue,
                currentPage: 1,
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                queryList: {
                    page: '1',
                    per_page:'',
                    start_date: '',
                    end_date: '',
                    delivery_status:[],
                    scoc_status:'',
                    scic_status:'',
                    billing_party_id:100000,
                },
                list: [],
                ids:[],
                list_export:[],
                prod_export_url:'',
                currencys: [],
                invoice_info: [],
                invoice_status_info: [],
                invoice_type: [],
                invoice_notice_status: [],
                invoice_notice_return_statuses: [],
                status_info: [],
                statuses: [],
                enums: [],
                customer: [],
                corp:[],
                permissions: JSON.parse(localStorage.getItem("permissions")),
                checked_all:false,
                loading: false,
                loading_search: false,
                loading_sales_invoice:false,
                export_sales_invoice_url:'',
                export_invoice_cost_url:'',
                loading_e:false,
                loading_cost:false,
                loading_cost_invoice:false,
                loading_confirm_income:false,
                loading_confirm_cost:false,
                export_cost_invoice_url:''
            }
        },
        created () {
            this.fetchData()
        },
        methods: {
            fetchData () {
                sales_invoice(this.queryList).then(res => {
                    if (this.loading_search) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.loading_search = false
                    }
                    this.ids = []
                    this.checked_all = false
                    res.data.data.forEach(item=>{
                        item.checked = false
                    })
                    this.list = res.data
                    this.list.per_page = parseInt(res.data.per_page);
                    this.enums=res.enum
                })
                this.corp = this.GEnums.ACompany
            },
            select_all() {
                this.checked_all = !this.checked_all;
                this.ids = [];
                this.list.data.forEach((items, index) => {
                    if (this.checked_all) {
                        items.checked = true;
                        this.ids.push(items.id);
                    } else {
                        this.ids = [];
                        items.checked = false;
                    }
                });
            },
            select_one(checked, id) {
                this.ids = [];
                let num = 0;
                this.list.data.forEach((items, index) => {
                    if (items.checked) {
                        num++;
                        this.ids.push(items.id);
                    }
                });
                if (num == this.list.data.length) {
                    this.checked_all = true;
                } else {
                    this.checked_all = false;
                }
            },
            confirm_income_click(){
                this.loading_confirm_income = true
                confirm_income(this.ids,this)
            },
            confirm_cost_click(){
                this.loading_confirm_cost = true
                confirm_cost(this.ids,this)
            },
            remoteMethod (query) {
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        customer_lists(query).then(res => {
                            this.customer = res.data
                            this.loading = false
                        })
                    }, 200)
                } else {
                    this.customer = []
                }
            },
            check (id) {
                this.$router.push({
                    path: '/finance/sale_invoice_detail',
                    name: 'finance-sale_invoice_detail',
                    query: {
                        id: id
                    }
                })
            },
            refund (id) {
                this.$router.push({
                    path: '/finance/sale_invoice_refund',
                    name: 'finance-sale_invoice_refund',
                    query: {
                        id: id
                    }
                })
            },
            doSearch(){
                //@todo
            },
            doExport(){
                //@todo
                this.loading_e = true
                sales_invoice_export(this.queryList).then(res => {
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
            export_cfen(){
                this.$message.error('功能未开放')
            },
            export_sales_invoice(){
                this.loading_sales_invoice = true
                export_sales_invoice(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.export_sales_invoice_url = res.data
                        setTimeout(() => {
                            this.$refs.export_sales_invoice_url.click()
                            this.loading_sales_invoice = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_sales_invoice = false
                    }
                }).catch(rr => {
                    this.loading_sales_invoice = false
                })
            },
            export_cost_invoice(){
                this.loading_cost_invoice = true
                export_cost_invoice(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.export_cost_invoice_url = res.data
                        setTimeout(() => {
                            this.$refs.export_cost_invoice_url.click()
                            this.loading_cost_invoice = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_cost_invoice = false
                    }
                }).catch(rr => {
                    this.loading_cost_invoice = false
                })
            },
            export_cost(){
                this.loading_cost = true
                export_invoice_cost(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.export_invoice_cost_url = res.data
                        setTimeout(() => {
                            this.$refs.export_invoice_cost_url.click()
                            this.loading_cost = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_cost = false
                    }
                }).catch(rr => {
                    this.loading_cost = false
                })
            },
            doImport(){
                this.$router.push({
                    path: '/finance/doimport',
                    name: 'finance-doimport',
                })
            },
            search () {
                this.loading_search = true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            handleSizeChange(val) {
              this.queryList.per_page = val;
              this.fetchData();
            },
            handleCurrentChange (pageCurrent) {
                this.queryList.page = this.currentPage = pageCurrent
                this.fetchData()
            }
        }
    }
</script>

<style lang="scss" scoped type="text/scss">
    /deep/ table {
        width: 100%;
        border-collapse: collapse;
        .el-input__inner {
            border: 0px;
            padding: 0px;
        }
        td, th {
            padding: 5px;
            line-height: 30px;
            font-size: 12px;
        }
    }
    .button:focus, .button:hover {
        color: #606266;
        border: none;
        background-color: white;
    }
    .el-pagination {
        margin-top: 10px;
        text-align: right;
    }
</style>
