<template>
    <d2-container>
        <div class="top">
            <el-input
                    v-model="queryList.invoice_number"
                    placeholder="发票号"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-input
                    v-model="queryList.prod_name"
                    placeholder="产品名称"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-input
                    v-model="queryList.seller_name"
                    placeholder="销方名称"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-select
                    v-model="queryList.purchaser_name"
                    placeholder="购方名称"
                    filterable
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            >
                <el-option v-for="(item,key,index) in enums.purchaser_names" :label="key" :key="index" :value="key"></el-option>
            </el-select>
            <el-button type="primary" :loading="loading_search" @click="search" size="mini" style="margin: 0 2px;">搜索
            </el-button>
            <el-button type="success" :loading="loading_Download" @click="getRelatedDownload_" size="mini" style="margin: 0 2px;">导出
        </el-button>
            <a :href="export_url" ref="export_url" hidden></a>
        </div>
        <el-table
                :data="InvoiceList.data"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                style="font-size: 12px;"
        >
            <el-table-column label="ID" width="70">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="发票号码" width="170">
                <template slot-scope="scope">{{scope.row.invoice_number}}</template>
            </el-table-column>
            <el-table-column label="销方名称">
                <template slot-scope="scope">{{scope.row.seller_name}}</template>
            </el-table-column>
            <el-table-column label="购方名称" width="170">
                <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
            </el-table-column>
            <el-table-column label="发票产品名称">
                <template slot-scope="scope">{{scope.row.base_name}}</template>
            </el-table-column>
            <el-table-column label="含税金额" width="80">
                <template slot-scope="scope">{{scope.row.amount}}</template>
            </el-table-column>

            <el-table-column label="合同号" width="130">
                <template slot-scope="scope">{{scope.row.contract_number}}</template>
            </el-table-column>
            <el-table-column label="合同产品名称">
                <template slot-scope="scope">{{scope.row.prod_name_cn}}</template>
            </el-table-column>
            <el-table-column label="合同金额" width="80">
                <template slot-scope="scope">{{scope.row.contract_total}}</template>
            </el-table-column>
            <el-table-column label="收票状态" width="80">
                <template slot-scope="scope">
                    <div  class="d2-text-center" v-if="getEnumValue(enums.invoice_status,scope.row.contract_invoice_status)" :style="{background:(scope.row.contract_invoice_status==0?'':(scope.row.contract_invoice_status==1?'#FFF0DD':(scope.row.contract_invoice_status==2?'#FFC0CB':(scope.row.contract_invoice_status==3?'#F5DEB3':''))))}">{{getEnumValue(enums.invoice_status,scope.row.contract_invoice_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column label="采购员" width="80">
                <template slot-scope="scope">{{scope.row.purchase_user}}</template>
            </el-table-column>

             <el-table-column label="核销金额" width="80">
                <template slot-scope="scope">{{scope.row.hexiao_amount}}</template>
            </el-table-column>
            <el-table-column label="核销员" width="100">
                <template slot-scope="scope">{{scope.row.hexiao_user}}</template>
            </el-table-column>
            <el-table-column label="付款状态" width="100">
                <template slot-scope="scope">
                    <span :style="{background:scope.row.pay_result===2?'rgb(103, 194, 58)':(scope.row.pay_result===3?'red':''),'padding':'5px'}">{{enums.pay_status[scope.row.pay_result].name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="入库状态" width="100">
                <template slot-scope="scope">
                    <span  :style="{background:scope.row.storage_status===1?'rgb(103, 194, 58)':'','padding':'5px'}">{{enums.storage_status[scope.row.storage_status].name }}</span>
                </template>
            </el-table-column>
            <!--<el-table-column label="操作" width="200">-->
            <!--</el-table-column>-->
        </el-table>
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                :page-sizes="[10,20,50,100,500]"
                :page-size="10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="total,sizes,prev, pager, next"
                :total="InvoiceList.total"
        ></el-pagination>
    </d2-container>
</template>

<script>
    import {getRelatedContracts,getRelatedDownload} from "@/api/procure"
    export default {
        name: "procure-checkInvoiceList",
        data() {
            return {
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                queryList: {
                    page: "1",
                    per_page: 10,
                    invoice_number:'',
                    prod_name:'',
                    seller_name:'',
                    purchaser_name:''
                },
                InvoiceList: [],
                loading_search: false,
                currentPage: 1,
                enums:{},
                dialogVisible:false,
                loading_sao:false,
                loading_Download:false,
                url:'',
                export_url:''
            }
        },
        created() {
            this.queryList.invoice_number=this.$route.query.invoice_number
            this.queryList.seller_name=this.$route.query.seller_name
            this.queryList.purchaser_name=this.$route.query.purchaser_name
            this.fetchData()
        },
        watch:{
            $route(to, from) {
                this.queryList.invoice_number=this.$route.query.invoice_number
                this.queryList.seller_name=this.$route.query.seller_name
                this.queryList.purchaser_name=this.$route.query.purchaser_name
                this.fetchData()
            }
        },
        methods:{
            fetchData() {
                this.loading_search=true
                getRelatedContracts(this.queryList).then(res => {
                    this.loading_search=false
                    if (res && res.code == 0) {
                        this.InvoiceList = res.data
                        this.enums=res.enum
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            },
            getRelatedDownload_(){
                getRelatedDownload(this.queryList).then(res => {
                    this.loading_Download=false
                    if (res && res.code == 0) {
                        this.export_url = res.data
                        setTimeout(() => {
                            this.$refs.export_url.click()
                            this.loading_Download=false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_Download=false
                    }
                }).catch(rr => {
                    this.loading_Download=false
                })
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleSizeChange(val) {
                this.queryList.per_page=val
                this.fetchData();
            },
            search() {
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
        }
    }
</script>

<style scoped>
    .top {
        margin: 10px 0;
    }

</style>