<template>
    <d2-container>
    <div class="top">
        <el-button v-if="permission_names['SyncSaomiaoyi']==='SyncSaomiaoyi'" type="primary" :loading="loading_sao" @click="syncSmy" size="mini" style="margin: 0 2px;">同步查验未通过的发票</el-button>
        <el-date-picker
                class="date_picker"
                v-model="queryList.scan_time_start"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="扫描开始日期"
                style="width:150px;margin: 0 2px;"
                size="mini"
        ></el-date-picker>
        -
        <el-date-picker
                class="date_picker"
                v-model="queryList.scan_time_end"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="扫描结束日期"
                style="width:150px;margin: 0 2px;"
                size="mini"
        ></el-date-picker>
        <el-input
                v-model="queryList.seller_name"
                placeholder="销方名称"
                clearable
                size="mini"
                style="width: 200px;margin: 0 2px;"
        ></el-input>
        <el-input
                v-model="queryList.purchaser_name"
                placeholder="购方名称"
                clearable
                size="mini"
                style="width: 200px;margin: 0 2px;"
        ></el-input>
        <el-input
                v-model="queryList.invoice_number"
                placeholder="发票号码"
                clearable
                size="mini"
                style="width: 140px;margin: 0 2px;"
        ></el-input>
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
            <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="销方名称">
            <template slot-scope="scope">{{scope.row.seller_name}}</template>
        </el-table-column>
        <el-table-column label="购方名称">
            <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
        </el-table-column>
        <el-table-column label="发票类型" width="130">
            <template slot-scope="scope">{{scope.row.invoice_type}}</template>
        </el-table-column>
        <el-table-column label="发票号码" width="170">
            <template slot-scope="scope">{{scope.row.invoice_number}}</template>
        </el-table-column>
        <el-table-column label="开票日期" width="90">
            <template slot-scope="scope">{{scope.row.invoice_date?scope.row.invoice_date.split(' ')[0]:''}}</template>
        </el-table-column>
        <el-table-column label="扫描时间" width="90">
            <template slot-scope="scope">{{scope.row.scan_time?scope.row.scan_time.split(' ')[0]:''}}</template>
        </el-table-column>
        <el-table-column label="开票金额" width="80">
            <template slot-scope="scope">{{scope.row.total}}</template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="ViewPhotos(scope.row.image)"
                >照片
                </el-button>
                <el-button size="mini" type="primary" @click="markPassed(scope.row)"
                >标记为查验通过
                </el-button>
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
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="80%"
        >
            <!--<el-image-->
            <!--style="width: 100%;"-->
            <!--:src="url"-->
            <!--fit="fill"></el-image>-->
            <img :src="url" style="width: 100%;" alt="">
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
    </d2-container>
</template>

<script>
    import {getInvoiceNoPassedList,getInvoiceNoPassed,markPassed} from "@/api/procure"
    export default {
        name: "procure-checkInvoice",
        data() {
            return {
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                queryList: {
                    page: "1",
                    per_page: 10,
                    hexiao_time_start: "",
                    hexiao_time_end: "",
                    scan_time_start:'',
                    scan_time_end:'',
                    seller_name:"",
                    purchaser_name:'',
                    invoice_number:'',
                    hexiao_status:''
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
            this.fetchData()
        },
        methods:{
            fetchData() {
                this.loading_search=true
                getInvoiceNoPassedList(this.queryList).then(res => {
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
            ViewPhotos(url){
                this.url=url,
                    this.dialogVisible=true
            },
            syncSmy(){
                this.loading_sao = true
                getInvoiceNoPassed().then(res=>{
                    if (res && res.code === 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.loading_sao = false
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_sao = false
                    }
                })
            },
            markPassed(item){
                markPassed({id:item.id}).then(res=>{
                    if (res && res.code === 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .top {
        margin: 10px 0;
    }

</style>