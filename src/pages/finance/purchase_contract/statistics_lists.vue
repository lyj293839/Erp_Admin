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
                <el-select v-model="queryList.pay_status" placeholder="付款状态" size="mini" clearable style="width:120px;margin: 0 2px;">
                    <el-option
                            v-for="item in enums.pay_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select v-model="queryList.storage_status" placeholder="入库状态" size="mini" clearable style="width:120px;margin: 0 2px;">
                    <el-option
                            v-for="item in enums.storage_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select v-model="queryList.invoice_status"  placeholder="发票状态" size="mini" clearable style="width:120px;margin: 0 2px;">
                    <el-option
                            v-for="item in enums.invoice_status"
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
                <el-input placeholder="采购合同号" class="d2-ml-5" size="mini" v-model="queryList.contract_number" clearable></el-input>
                <el-date-picker
                        size="mini"
                        type="date"
                        clearable
                        class="d2-ml-5"
                        placeholder="合同开始日期"
                        v-model="queryList.date_from"
                        value-format="yyyy-MM-dd"
                        style="width: 150px;"
                ></el-date-picker>
                <span style="margin:0px 5px">至</span>
                <el-date-picker
                        size="mini"
                        clearable
                        type="date"
                        placeholder="合同截止日期"
                        v-model="queryList.date_to"
                        value-format="yyyy-MM-dd"
                        style="width: 150px;"
                ></el-date-picker>
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
                <el-button type="primary" style="margin-left:10px;" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
                <el-button
                        v-if="permissions.indexOf(598)>-1"
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
            <el-table-column label="合同ID" width="80px;">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="合同号" width="120px;">
                <template slot-scope="scope">{{scope.row.contract_number}}</template>
            </el-table-column>
            <el-table-column label="供应商名称">
                <template slot-scope="scope">{{scope.row.supplier_name}}</template>
            </el-table-column>
            <el-table-column label="合同金额" width="100px;">
                <template slot-scope="scope">{{scope.row.total_money}}</template>
            </el-table-column>
            <el-table-column label="签约时间" width="100px;">
                <template slot-scope="scope">{{scope.row.contract_date}}</template>
            </el-table-column>
            <el-table-column label="到货天数" width="100px;">
                <template slot-scope="scope">{{scope.row.invoice_receiver_date}}</template>
            </el-table-column>
            <el-table-column label="审核状态" width="120px;">
                <template slot-scope="scope">
                    {{getEnumValue(enums.check_status,scope.row.check_status)}}
                </template>
            </el-table-column>
            <el-table-column label="付款状态" width="120px;">
                <template slot-scope="scope">
                    <span v-if="!scope.row.procurement_pay_result">未付款</span>
                    <div v-if="scope.row.procurement_pay_result" class="d2-text-center">
                        <div v-if="scope.row.procurement_pay_result.pay_requestamount==0">未付款</div>
                        <div v-else-if="scope.row.procurement_pay_result.pay_requestamount<scope.row.total_money" style="background-color:#FFF0DD;">部分付款</div>
                        <div v-else-if="scope.row.procurement_pay_result.pay_requestamount=scope.row.total_money" style="background-color:#FFC0CB;">付款完成</div>
                        <div v-else-if="scope.row.procurement_pay_result.pay_requestamount>scope.row.total_money" style="background-color:#F5DEB3;">超额付款</div>
                    </div>
                </template>
            </el-table-column>
            <!--<el-table-column label="付款日期" >-->
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.note}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="入库状态" width="120px;">
                <template slot-scope="scope">
                    <div v-for="(it,index) in scope.row.details" :key="index">
                        {{getEnumValue(enums.storage_status,it.storage_status)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="收票状态" width="120px;">
                <template slot-scope="scope">
                    {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                </template>
            </el-table-column>
            <el-table-column label="采购人员" width="120px;">
                <template slot-scope="scope">
                    {{attr(scope.row,'purchase_user.name')}}
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
                    invoice_status:'',
                    pay_status:'',
                    storage_status:'',
                    contract_number:'',
                    supplier_name:'',
                    date_from:'',
                    date_to:'',
                    purchase_user_id:''
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
                lists(this.queryList, "ProcurementContract/Contract/statistics_downExcel").then(res => {
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
                }).catch(rr=>{
                    this.loading_purchase_invoice = false
                })
            },
            fetchData() {
                lists(this.queryList, "ProcurementContract/Contract/statistics_lists").then(res => {
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
