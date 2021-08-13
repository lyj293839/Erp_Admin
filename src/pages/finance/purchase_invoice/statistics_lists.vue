<style lang="scss" scoped type="text/scss">
    .heard_top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 0;
        .el-autocomplete {
            width: 20%;
        }
        .el-input {
            width: 15%;
        }
        .el-select {
            width: 15%;
        }
        div {
            display: flex;
            justify-content: flex-end;
        }
    }
    .dialog {
        .el-input {
            width: 200px;
        }
        .el-select {
            width: 200px;
        }
    }
    .table{
        border-collapse: collapse;
    }
    .table th,td{
        padding: 10px;
    }
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
        <div class="heard_top">
            <div>
                <el-select placeholder="收票公司" size="mini" clearable v-model="queryList.corp_id">
                    <el-option
                            v-for="item in enums.company"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-input placeholder="发票号" class="d2-ml-5" size="mini" v-model="queryList.invoice_number" clearable></el-input>
                <el-input placeholder="合同编号" class="d2-ml-5" size="mini" v-model="queryList.contract_number" clearable></el-input>
                <el-autocomplete
                        size="mini"
                        style="margin:0px 10px;"
                        clearable
                        v-model="queryList.supplier_name"
                        :fetch-suggestions="querySearch"
                        placeholder="供应商"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                ></el-autocomplete>
                <el-date-picker
                        size="mini"
                        type="date"
                        clearable
                        class="d2-ml-5"
                        placeholder="到票开始日期"
                        v-model="queryList.date_from"
                        value-format="yyyy-MM-dd"
                        style="width: 150px;"
                ></el-date-picker>
                <span style="margin:0px 5px">至</span>
                <el-date-picker
                        size="mini"
                        clearable
                        type="date"
                        placeholder="到票截止日期"
                        v-model="queryList.date_to"
                        value-format="yyyy-MM-dd"
                        style="width: 150px;"
                ></el-date-picker>
                <el-button type="primary" style="margin-left:10px;" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
                <el-button
                         v-if="permissions.indexOf(597)>-1"
                        class="d2-ml-5"
                        size="mini"
                        type="primary"
                        :loading="loading_purchase_invoice"
                        @click="export_purchase_invoice"
                >导出Excel
                </el-button>
                <a :href="purchase_invoice_url" ref="purchase_invoice_url" hidden></a>
            </div>
        </div>

        <!-- 页面 -->
        <el-table
                :data="list.data"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                size="mini"
                style="font-size: 12px"
        >
            <el-table-column label="合同号" width="130px;">
                <template slot-scope="scope">{{scope.row.contract_detail.procurement_contract_number}}</template>
            </el-table-column>
            <el-table-column label="供应商" width="250px;">
                <template slot-scope="scope">{{scope.row.contract.supplier_name}}</template>
            </el-table-column>
            <el-table-column label="收票公司" width="250px;">
                <template slot-scope="scope">{{scope.row.contract.corp_name}}</template>
            </el-table-column>
            <el-table-column label="发票号" >
                <template slot-scope="scope">{{scope.row.invoice_number}}</template>
            </el-table-column>
            <el-table-column label="开票日期">
                <template slot-scope="scope">{{scope.row.invoice_date}}</template>
            </el-table-column>
            <el-table-column label="到票日期">
                <template slot-scope="scope">{{scope.row.invoice_receiver_date}}</template>
            </el-table-column>
            <el-table-column label="金额" >
                <template slot-scope="scope">
                    {{scope.row.total}}
                </template>
            </el-table-column>
            <el-table-column label="税额" >
                <template slot-scope="scope">
                    {{scope.row.tax_amount}}
                </template>
            </el-table-column>
            <el-table-column label="备注" >
                <template slot-scope="scope">
                    {{scope.row.note}}
                </template>
            </el-table-column>
            <el-table-column label="采购人员" >
                <template slot-scope="scope">
                    {{scope.row.contract.purchase_user?scope.row.contract.purchase_user.name:''}}
                </template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    收票
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
        ></el-pagination>
    </d2-container>
</template>
<script>
    import request from "@/plugin/axios";
    import Big from "@/big/a/big.mjs";
    import { lists, listTotal } from "@/api/prod";
    import { verify_invoice } from "@/api/procurement_contract_invoice";
    export default {
        name:"procure-invoice",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                list: {},
                save_fy1:false,
                save_fy2:false,
                save_fy3:false,
                dialogAdd: false,
                dialog_Add: false,
                dialogTip: false,
                dialogTip2: false,
                currentPage: 1,
                queryList: {
                    page: "1",
                    corp_id:'',
                    invoice_number:'',
                    contract_number:'',
                    status:'',
                    supplier_name:'',
                    date_from:'',
                    date_to:'',
                    purchase_user_id:'',
                },
                check_list:{contract_detail:[]},
                enums:{},
                purchaseList: [],
                loading_search:false,
                loading_purchase_invoice:false,
                purchase_invoice_url:''
            };
        },
        watch: {
            supplier($new, $old) {
                if ($new == "") {
                    this.queryList.supplier_id = "";
                }
            },
            $route(to,from) {
                if(to.name=='procure-collection'){
                    this.fetchData();
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            export_purchase_invoice(){
                this.loading_purchase_invoice = true;
                lists(this.queryList, "ProcurementContract/Invoice/statistics_downExcel").then(res => {
                    if (res && res.code === 0) {
                        this.purchase_invoice_url=res.data
                        setTimeout(() => {
                            this.$refs.purchase_invoice_url.click()
                            this.loading_purchase_invoice = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_purchase_invoice = false
                    }
                }).catch(rr => {
                    this.loading_purchase_invoice = false;
                })
            },
            fetchData() {
                lists(this.queryList, "ProcurementContract/Invoice/statistics_lists").then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    this.list = res.data;
                    this.enums=res.enum
                });
                listTotal("data/user_list?user_type=101").then(res => {
                    this.purchaseList = res.data;
                });
            },
            querySearch(queryString, cb) {
                if (queryString != "") {
                    listTotal("data/member_list?type=2&name=" + queryString).then(res => {
                        this.results = res.data;
                        this.results = JSON.parse(
                            JSON.stringify(this.results).replace(/name/g, "value")
                        );
                        // 调用 callback 返回建议列表的数据
                        cb(this.results);
                    });
                }
            },
            handleSelect() {
                this.queryList.supplier_id = this.results.filter(item => {
                    return item.value == this.supplier;
                })[0].id;
            },
            Search() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData();
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
        }
    };
</script>
