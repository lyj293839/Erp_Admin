<style lang="scss" scoped type="text/scss">
    .heard_top {
        margin: 10px 0px 15px 0px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
            font-size: 14px;
        }
        .el-select {
            margin: 0px 5px;
        }
        .el-input {
            margin: 0px 5px;
        }
    }
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
        <div class="heard_top">
            <el-select
                    v-model="queryList.corp_name"
                    filterable
                    clearable
                    size="mini"
                    placeholder="收款公司"
                    style="width: 200px;"
            >
                <el-option v-for="(i,index) in enums.system_company" :label="i.name" :value="i.name" :key="index"></el-option>
            </el-select>
            <el-input
                    size="mini"
                    v-model="queryList.contract_number"
                    placeholder="合同号"
                    style="width:150px;"
                    clearable
            ></el-input>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.date_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="申请开始时间"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.date_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:150px;margin: 0 2px;"
                    placeholder="申请结束时间"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.pay_date_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="操作开始时间"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.pay_date_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:150px;margin: 0 2px;"
                    placeholder="操作结束时间"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-select
                    v-model="queryList.supplier_id"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    :loading="supplyloading"
                    placeholder="供应商"
                    style="width:200px;"
                    size="mini"
                    clearable
            >
                <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
            <el-select
                    v-model="queryList.finance_pay_status"
                    filterable
                    clearable
                    size="mini"
                    placeholder="状态"
                    style="width: 100px;"
            >
                <el-option v-for="(i,index) in enums.finance_pay_status"  :label="i.name" :value="i.id" :key="index"></el-option>
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
            <el-table-column label="#ID" width="50px">
                <template
                        slot-scope="scope"
                >{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="合同编号" width="100px">
                <template
                        slot-scope="scope"
                >{{scope.row.procurement_contract?scope.row.procurement_contract.contract_number:''}}</template>
            </el-table-column>
            <el-table-column label="供应商">
                <template slot-scope="scope">{{scope.row.supplier_name}}</template>
            </el-table-column>
            <el-table-column label="退款金额" width="100px">
                <template slot-scope="scope">
                    {{scope.row.refund_amount}}{{enums.Currency[scope.row.currency_id].icon}}
                    <el-tag type="danger"  size="mini" v-if="scope.row.refund_credit_flag">转往来账</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="采购">
                <template slot-scope="scope">{{attr(scope.row,'procurement_contract.purchase_user.name')}}</template>
            </el-table-column>
            <el-table-column label="收款银行">
                <template slot-scope="scope">{{scope.row.paybank}}</template>
            </el-table-column>
            <el-table-column label="收款方式">
                <template slot-scope="scope">{{getEnumValue(enums.PayType,scope.row.pay_type)}}</template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">{{scope.row.note}}</template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">{{getEnumValue(enums.finance_pay_status,scope.row.finance_pay_status)}}</template>
            </el-table-column>
            <el-table-column label="审核人">
                <template slot-scope="scope">{{attr(scope.row,'check_user.name')}}</template>
            </el-table-column>
            <el-table-column label="操作员">
                <template slot-scope="scope">{{attr(scope.row,'finance_pay_user.name')}}</template>
            </el-table-column>
            <el-table-column label="操作时间">
                <template slot-scope="scope">{{scope.row.finance_pay_time}}</template>
            </el-table-column>
            <el-table-column label="操作" width="70px" fixed="right">
                <template slot-scope="scope">
                    <el-button
                            class="d2-ml-5"
                            type="primary"
                            size="mini"
                            v-if="scope.row.finance_pay_status!=1"
                            @click="reviewClick(scope.row.id)"
                    >收款</el-button>
                </template>
            </el-table-column>
        </el-table>
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
    import {listTotal} from "@/api/prod";
    import { refund_money_list } from "@/api/finance";
    export default {
        name: "finance-return_money",
        data() {
            return {
                loading:false,
                list: {},
                currentPage: 1,
                supplyloading: false,
                dialogVisible_check:false,
                queryList: {
                    page: "1",
                    corp_name:'',
                    contract_number:'',
                    date_start:'',
                    date_end:'',
                    pay_date_start:'',
                    pay_date_end:'',
                    supplier_id:'',
                    finance_pay_status:''
                },
                supply_list: [],
                check:{
                    id:'',
                    finance_pay_status:1
                },
                enums:{},
                loading_search:false,
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                refund_money_list(this.queryList).then(res => {
                    if(this.loading_search){
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.loading_search=false
                    }
                    this.list = res.data;
                    this.enums=res.enum;
                });
            },
            Search(){
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData();
            },
            reviewClick(id){
                this.$router.push({
                    path: "/finance/return_money_detail",
                    name: "finance-return_money_detail",
                    query: {
                        id: id
                    }
                });
            },
            save_check(){
                verify_pay(this.check,this)
            },
            supplyMethod(query) {
                if (query !== "") {
                    this.supplyloading = true;
                    setTimeout(() => {
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                            this.supplyloading = false;

                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            }
        }
    };
</script>