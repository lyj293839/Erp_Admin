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
                    v-model="queryList.amount"
                    placeholder="产品名称"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-select
                    v-model="queryList.hexiao_flag"
                    filterable
                    placeholder="核销状态"
                    style="width:100px;"
                    clearable
                    size="mini"
            >
                <el-option  label="已核销"  :value="1"></el-option>
                <el-option  label="待核销"  :value="0"></el-option>
            </el-select>
            <el-button type="primary" :loading="loading_search" @click="search" size="mini" style="margin: 0 2px;">搜索
            </el-button>
        </div>
        <el-table
                :data="InvoiceList.data"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                style="font-size: 12px;"
        >
            <el-table-column label="ID" width="50">
                <template slot-scope="scope">{{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="销方名称" width="140">
                <template slot-scope="scope">{{scope.row.seller_name}}</template>
            </el-table-column>
            <el-table-column label="购方名称" width="140">
                <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
            </el-table-column>
            <el-table-column label="发票号码">
                <template slot-scope="scope">{{scope.row.invoice_number}}</template>
            </el-table-column>
            <!--<el-table-column label="开票日期">-->
            <!--<template slot-scope="scope">{{scope.row.invoice_date.split(' ')[0]}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="扫描时间" width="100">
                <template slot-scope="scope">{{scope.row.scan_time.split(' ')[0]}}</template>
            </el-table-column>
            <!--<el-table-column label="开票金额">-->
            <!--<template slot-scope="scope">{{scope.row.total}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="产品名称" width="140">
                <template slot-scope="scope">{{scope.row.prod_name}}</template>
            </el-table-column>
            <el-table-column label="产品规格">
                <template slot-scope="scope">{{scope.row.prod_model}}</template>
            </el-table-column>
            <el-table-column label="产品单位">
                <template slot-scope="scope">{{scope.row.prod_unit}}</template>
            </el-table-column>
            <el-table-column label="产品数量" width="80">
                <template slot-scope="scope">{{scope.row.prod_num}}</template>
            </el-table-column>
            <el-table-column label="不含税金额">
                <template slot-scope="scope">{{scope.row.amount_excluding_tax}}</template>
            </el-table-column>
            <el-table-column label="税率" width="60">
                <template slot-scope="scope">{{scope.row.tax_rate}}</template>
            </el-table-column>
            <!--<el-table-column label="税额">-->
            <!--<template slot-scope="scope">{{scope.row.amount_tax_amount}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="总金额">
                <template slot-scope="scope">{{scope.row.amount}}</template>
            </el-table-column>
            <el-table-column label="核销状态">
                <template slot-scope="scope">{{enums.hexiao_status[scope.row.hexiao_status]}}</template>
            </el-table-column>

            <el-table-column label="备注" width="140">
                <template slot-scope="scope" >
                    <span style="width: 100%;height: 37px;line-height: 37px;display: inline-block;" @click="edit(scope.row)">
                        <span style="width: 100%;display: inline-block;" v-if="scope.row.oldNote&&!scope.row.edit" >{{scope.row.note}}</span>
                        <!--<el-input-->
                        <!--style="height:37px"-->
                        <!--v-if="scope.row.edit"-->
                        <!--v-model="scope.row.note"-->
                        <!--clearable-->
                        <!--size="mini"-->
                        <!--@blur="saveNote(scope.row.id,scope.row.note)"-->
                        <!--&gt;</el-input>-->
                        <input  v-focus
                                class="input"
                                v-if="scope.row.edit"
                                v-model="scope.row.note"
                                @blur="saveNote(scope.row.id,scope.row.note)"
                                v-focus
                                type="text">
                    </span>
                </template>
            </el-table-column>

        </el-table>
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                :page-sizes="[10,20,50,100]"
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
    import {hongziList} from "@/api/procure"
    export default {
        name: "procure-checkInvoiceRedList",
        data() {
            return {
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                queryList: {
                    page: "1",
                    per_page: 10,
                    invoice_number:'',
                    prod_name:'',
                    amount:'',
                    hexiao_flag:0
                },
                InvoiceList: [],
                loading_search: false,
                currentPage: 1,
                enums:{},
                dialogVisible:false,
                loading_sao:false,
                url:''
            }
        },
        created() {
            this.queryList.invoice_number=this.$route.query.invoice_number
            this.fetchData()
        },
        watch:{
            $route(to, from) {
                this.queryList.invoice_number=this.$route.query.invoice_number
            }
        },
        methods:{
            fetchData() {
                this.loading_search=true
                hongziList(this.queryList).then(res => {
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