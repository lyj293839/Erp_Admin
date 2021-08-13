<template>
    <d2-container>
        <div>
            <el-row :gutter="5" type="flex" align="middle" justify="end" style="margin: 10px 0">
                <el-col :span="24" class="d2-text-right">
                    <el-input size="mini" style="width: 150px;" v-model="queryList.real_contract_no"
                              placeholder="真实合同号" clearable></el-input>
                    <el-input size="mini" style="width: 150px;"  class="d2-ml-5" v-model="queryList.contract_no"
                              placeholder="合同号" clearable></el-input>
                    <el-input size="mini" style="width: 170px;" class="d2-ml-5" v-model="queryList.declaration_no"
                              placeholder="出口报关单号" clearable></el-input>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.date_start"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="出口开始日期"
                            size="mini"
                            style="width: 140px;"
                    ></el-date-picker>
                    <el-date-picker
                        class="date_picker d2-ml-5"
                        v-model="queryList.date_end"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        type="date"
                        placeholder="出口结束日期"
                        size="mini"
                        style="width: 140px;"
                        ></el-date-picker>
                    <el-input size="mini" style="width: 150px;" class="d2-ml-5" v-model="queryList.tracking_no"
                              placeholder="运单号" clearable></el-input>
                    <el-input size="mini" style="width: 150px;" class="d2-ml-5" v-model="queryList.voyage_no"
                              placeholder="航次" clearable></el-input>
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
                            :loading="loading_down"
                            @click="downfile"
                    >下载
                    </el-button>
                    <a :href="down_url" ref="down_url" hidden></a>
                    <el-upload
                            :loading="loading_file"
                            :headers=headers
                            style="display: inline-block;"
                            class="upload-demo d2-ml-5"
                            :action=upload_api
                            :before-remove="beforeRemove"
                            :show-file-list="false"
                            :limit="1"
                            :on-progress="handleAvatarprogress"
                            :on-success="handleAvatarSuccess"
                            :file-list="fileList">
                        <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
                    </el-upload>
                </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading" style="font-size: 12px" :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <!--<el-table-column align="center" label='真假名'>-->
                <!--<template slot-scope="scope">-->
                    <!--{{scope.row.is_real_name}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label='真实合同号' width="140">
                <template slot-scope="scope">
                    <span @click="detail(scope.row)" style="cursor:pointer;">{{scope.row.real_contract_no}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='出口报关单号' width="160">
                <template slot-scope="scope">
                    {{scope.row.declaration_no}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='出口口岸名称' width="120">
                <template slot-scope="scope">
                    {{scope.row.export_port}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='合同号' width="120">
                <template slot-scope="scope">
                    {{scope.row.contract_no}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='出口日期' width="120">
                <template slot-scope="scope">
                    {{scope.row.export_date}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='运单号'>
                <template slot-scope="scope">
                    {{scope.row.tracking_no}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='运输方式'>
                <template slot-scope="scope">
                    {{scope.row.shipping_type}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='航次' width="120">
                <template slot-scope="scope">
                    {{scope.row.voyage_no}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='项号'>
                <template slot-scope="scope">
                    {{scope.row.item_no}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='商品编号' width="120">
                <template slot-scope="scope">
                    {{scope.row.sku_no}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='商品名称' width="200">
                <template slot-scope="scope">
                    <span class="text-overflow">{{scope.row.prod_name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='数量'>
                <template slot-scope="scope">
                    {{scope.row.quantity}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='单位名称'>
                <template slot-scope="scope">
                    {{scope.row.quantity_unit}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='法定数量'>
                <template slot-scope="scope">
                    {{scope.row.legal_quantity}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='法定计量单位'>
                <template slot-scope="scope">
                    {{scope.row.legal_quantity_unit}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='目的地名称'>
                <template slot-scope="scope">
                    {{scope.row.destination}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='货币名称'>
                <template slot-scope="scope">
                    {{scope.row.currency_name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='单价' width="100">
                <template slot-scope="scope">
                    {{scope.row.price}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='成交总价' width="120">
                <template slot-scope="scope">
                    {{scope.row.total}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='统计美元价' width="120">
                <template slot-scope="scope">
                    {{scope.row.total_usd}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='21位出口报关单号' width="200">
                <template slot-scope="scope">
                    {{scope.row.declaration_no_21}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px" fixed="right">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="checked_all" @change="select_all" class="d2-mr-5"></el-checkbox>
                    <el-button type="primary" size="mini" @click="Export_delete()">删除</el-button>
                </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row)" class="d2-mr-5"></el-checkbox>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                width="80%"
                >
            <div class="d2-m-10">报关数据</div>
            <el-table
                    border
                    :data="detailData.ExportDeclaration"
                    style="width: 100%">
                <el-table-column align="center" label='商品名称' width="150">
                    <template slot-scope="scope">
                        {{scope.row.prod_name}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='数量'>
                    <template slot-scope="scope">
                        {{scope.row.quantity}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='单位名称'>
                    <template slot-scope="scope">
                        {{scope.row.quantity_unit}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='法定数量'>
                    <template slot-scope="scope">
                        {{scope.row.legal_quantity}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='法定数量单位'>
                    <template slot-scope="scope">
                        {{scope.row.legal_quantity_unit}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='货币名称'>
                    <template slot-scope="scope">
                        {{scope.row.currency_name}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='单价'>
                    <template slot-scope="scope">
                        {{scope.row.price}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='成交总价'>
                    <template slot-scope="scope">
                        {{scope.row.total}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="d2-m-10">销售合同</div>
            <el-table
                    border
                    :data="detailData.SalerContract"
                    style="width: 100%">
                <el-table-column align="center" label='客户名称' width="120">
                    <template slot-scope="scope">
                        {{attr(scope.row,'saler_contract.customer_name')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='合同号' width="130">
                    <template slot-scope="scope">
                        {{scope.row.contract_number}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='cas'>
                    <template slot-scope="scope">
                        {{scope.row.cas}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='中文名' width="200">
                    <template slot-scope="scope">
                        {{scope.row.product_name}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='纯度'>
                    <template slot-scope="scope">
                        {{scope.row.purity}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='数量'>
                    <template slot-scope="scope">
                        {{scope.row.quantity}}{{getEnumValue(GEnums.Unit,scope.row.quantity_unit)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='单价'>
                    <template slot-scope="scope">
                        {{scope.row.price}}{{getEnumValue(GEnums.Currency,scope.row.currency_id)}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='总金额'>
                    <template slot-scope="scope">
                        {{scope.row.total_money}}{{getEnumValue(GEnums.Currency,scope.row.currency_id)}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="d2-m-10">采购合同</div>
            <el-table
                    v-if="detailData.SalerContract"
                    border
                    :data="detailData.SalerContract[0].ships"
                    style="width: 100%">
                <el-table-column align="center" label='供应商名称' width="120">
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.porder.supplier_name')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='合同号' width="130">
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.contract_number')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='批号'>
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.batchno')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='cas'>
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.cas')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='中文名' width="200">
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.name_cn')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='纯度'>
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.purity')}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='数量'>
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.quantity')}}
                        {{getEnumValue(GEnums.Unit,attr(scope.row,'inventory.order.quantity_unit'))}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='单价'>
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.price')}}
                        {{getEnumValue(GEnums.Currency,attr(scope.row,'inventory.order.currency_id'))}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label='总金额'>
                    <template slot-scope="scope">
                        {{attr(scope.row,'inventory.order.total_price')}}
                        {{getEnumValue(GEnums.Currency,attr(scope.row,'inventory.order.currency_id'))}}
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                background
                :page-sizes="[10, 50, 100, 300,500]"
                :page-size="10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes,prev, pager, next"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>

<script>
    import util from '@/libs/util'
    import { ExportDeclaration,ExportDeclaration_delete,saler_contract,ExportDeclaration_down} from '@/api/finance'
    import { parseTime, getEnumValue } from '@/utils/index'
    import axios from 'axios'
    export default {
        name: 'finance-K3',
        data () {
            return {
                detailData:[],
                dialogVisible: false,
                fileList: [],
                upload_api: process.env.VUE_APP_API + 'api/v1/ExportDeclaration/import',
                checked_all:false,
                ids:[],
                getEnumValue: getEnumValue,
                currentPage: 1,
                queryList: {
                    page: '1',
                    real_contract_no:'',
                    contract_no: '',
                    declaration_no: '',
                    date_start:'',
                    date_end:'',
                    tracking_no:'',
                    voyage_no:''
                },
                list: [],
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
                loading:false,
                loading_search: false,
                loading_down:false,
                loading_file:false,
                down_url:''
            }
        },
        created () {
            this.fetchData()
        },
        computed: {
            headers() {
                const token = util.cookies.get('token')
                return {
                    'Authorization': 'Bearer ' + token,
                    'Version-Number':process.env.VUE_APP_Version
                }
            }
        },
        methods: {
            downfile(){
                this.loading_down = true
                ExportDeclaration_down(this.queryList).then(res=>{
                    if(res.code==0){
                       this.down_url=res.data
                        setTimeout(() => {
                            this.$refs.down_url.click()
                            this.loading_down = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_down = false
                    }
                }).catch(rr => {
                    this.loading_down = false
                })
            },
            handleSizeChange(val) {
                this.queryList.per_page=val
                this.fetchData();
            },
            Export_delete(){
                let obj={
                    ids:this.ids
                }
                ExportDeclaration_delete(obj,this)
            },
            detail(item){
                this.dialogVisible=true
                let obj={
                    id:item.id,
                    real_contract_no:item.real_contract_no
                }
                saler_contract(obj).then(res=>{
                    if(res.code==0){
                        res.data.ExportDeclaration=[res.data.ExportDeclaration]
                        res.data.SalerContract=[res.data.SalerContract]
                         this.detailData=res.data
                    }
                })
            },
            handleAvatarprogress(){
                this.loading=true
            },
            handleAvatarSuccess(res, file, fileList) {
                this.loading=false
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.fileList = []
                    this.fetchData()
                } else {
                    this.$message.error(file.response.msg)
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            select_all() {
                this.ids = []
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
            select_one(checked, item) {
                this.ids = []
                this.list.data.forEach((items, index) => {
                    if (items.checked) {
                        this.ids.push(items.id);
                    }
                });
                let num = 0;
                this.list.data.forEach((items, index) => {
                    if (items.checked) {
                        num++;
                    }
                });
                if (num == this.list.data.length) {
                    this.ids = [];
                    this.checked_all = true;
                    this.list.data.forEach((items, index) => {
                        this.ids.push(items.id);
                    });
                } else {
                    this.checked_all = false;
                }
            },
            fetchData () {
                ExportDeclaration(this.queryList).then(res => {
                    if (this.loading_search) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.loading_search = false
                    }
                    res.data.data.forEach((items,index)=>{
                        items.checked=false
                    })
                    this.list = res.data
                    this.enums=res.enum
                })
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
    .text-overflow{
    white-space:nowrap;/*规定段落中的文本不进行换行*/
    overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
    text-overflow:ellipsis;/*显示省略号来代表被修剪的文本*/
    }
</style>
