<template>
    <d2-container>
        <div>
            <el-row  type="flex" justify="end">
                <el-col :span="24" class="d2-text-right">
                    <el-input size="mini" style="width: 120px;" class="d2-ml-5" v-model="queryList.contract_number" clearable
                              :placeholder="$t('sale.add.sale44')"></el-input><!-- 合同号 -->
                    <el-input size="mini" style="width: 120px;"  class="d2-ml-5" v-model="queryList.cas" clearable
                              placeholder="cas"></el-input>
                    <el-input size="mini" style="width: 120px;"  class="d2-ml-5" v-model="queryList.invoice_number" clearable
                              placeholder="发票号码"></el-input>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.start_time"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale184')"
                            size="mini"
                            style="width: 125px;"
                    ></el-date-picker><!-- 开始日期 -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.end_time"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale185')"
                            size="mini"
                            style="width: 125px;"
                    ></el-date-picker><!-- 合同结束日期 -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.due_date_start"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="应收款开始日期"
                            size="mini"
                            style="width: 145px;"
                    ></el-date-picker>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.due_date_end"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            placeholder="应收款结束日期"
                            size="mini"
                            style="width: 145px;"
                    ></el-date-picker>
                    <el-input size="mini" style="width: 180px;margin-left:5px;"  class="d2-ml-5" v-model="queryList.customer_name"
                              :placeholder="$t('Inquery.index.customer')" clearable></el-input>
                    <el-select v-model="queryList.receipt_status_ids"  class="d2-ml-5" size="mini" multiple clearable placeholder="收款状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.receipt_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.delivery_status_ids"  class="d2-ml-5" size="mini" multiple clearable placeholder="发货状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.delivery_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.invoice_status_ids"  class="d2-ml-5" size="mini" multiple clearable placeholder="开票状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.invoice_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.sale_id" size="mini"  class="d2-ml-5" clearable placeholder="销售人员" style="width: 100px;">
                        <el-option
                                v-for="item in sales"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.currency_id" size="mini"  class="d2-ml-5" clearable placeholder="货币" style="width: 100px;">
                        <el-option
                                v-for="item in enums.currencys"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.overdue_status" size="mini"  class="d2-ml-5" clearable placeholder="是否逾期" style="width: 100px;">
                        <el-option
                                v-for="item in enums.overdue_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-checkbox v-model="queryList.is_old" :true-label="1"  :false-label="0" style="margin: 0 5px;">{{$t('sale.index.sale70')}}</el-checkbox>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search"
                            style="margin-top:5px;"
                    >{{$t('search')}}</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            style="margin-top:5px;"
                            :loading="loading_search_yun"
                            @click="search_yun()"
                    >导出自动搜索
                    </el-button>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_e"
                            v-if="permission_names['sales_contract_count.late_export']=='sales_contract_count.late_export'"
                            @click="doExport"
                    >导出</el-button>
                    <a :href="prod_export_url" ref="prod_export_url" hidden></a>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column align="center" :label="$t('sale.add.sale44')"  width="125"><!-- 合同号 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler_contract.contract_number')}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale44_')"  width="125"><!-- 子合同号 -->
                <template slot-scope="scope">
                    {{scope.row.contract_number}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="cas"  width="120"><!-- 子合同号 -->
                <template slot-scope="scope">
                    {{scope.row.cas}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale178')" width="250"><!-- 客户名称 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler_contract.customer_name')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="合同金额" width="90"><!-- 合同金额 -->
                <template slot-scope="scope">
                    {{scope.row.total_money}}
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="应收余额">-->
            <!--<template slot-scope="scope">-->
            <!--{{}}-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="签约时间" width="90"><!-- 签约时间 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler_contract.contract_date')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="销售人员" width="90"><!-- 销售人员 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler_contract.sale.name')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="逾期天数" width="90"><!-- 逾期天数 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'due_pay_dates')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="逾期金额" width="100"><!-- 逾期金额 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'due_pay_amount')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="应收款时间" width="100"><!-- 应收款时间 -->
                <template slot-scope="scope">
                    <el-popover
                    placement="top"
                    width="200"
                    v-if="scope.row.saler_contract.account_period_info"
                    trigger="hover">
                        <div>
                            <div>实付时间：{{scope.row.last_payment_date}}</div>
                            <div>
                                账期类型：{{getEnumValue(enums.account_period_type_info,scope.row.saler_contract.account_period_info.account_period_type)}}
                            </div>
                            <div>账期天数：{{scope.row.saler_contract.account_period_info.payment_days}}</div>
                            <span>月结日期：{{scope.row.saler_contract.account_period_info.statementat}}</span>
                        </div>
                        <span slot="reference" style="cursor: pointer;">{{attr(scope.row,'due_date')}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column align="center" label="收款状态" width="90"><!-- 收款状态 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.receipt_status==2" style="background:#E6A23C;">{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
                    <div v-else-if="scope.row.receipt_status==3" style="background:#FFBDC8;">{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
                    <div v-else>{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发货状态" width="90"><!-- 发货状态 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.delivery_status==3" style="background:#F4939A;">{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</div>
                    <div v-else>{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开票状态" width="90"><!-- 开票状态 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.invoice_status==1"  style="background:#DF7201;">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                    <div v-else-if="scope.row.invoice_status==2"  style="background:#FFBDC8;">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                    <div v-else-if="scope.row.invoice_status==4"  style="background:#BFBFBF;">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                    <div v-else>{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="120" fixed="right" v-if="permission_names['sales_contract_count.change_due_date_application']=='sales_contract_count.change_due_date_application'">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-if="scope.row.delivery_status==3||scope.row.delivery_status==4" @click="Accounting(scope.row)">账期修改申请</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改账期" :visible.sync="dialogDue" class="form" width="50%">
            <el-form label-width="100px" label-position="right">
                <el-form-item label="子合同号:">
                    <el-input size="mini" v-model="due_data.contract_number" disabled></el-input>
                </el-form-item>
                <el-form-item label="应收款日期:">
                    <el-input size="mini" v-model="due_data.due_old_data" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改收款日期:">
                    <!-- <el-input size="mini" v-model="due_data.due_date"></el-input> -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="due_data.due_date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            size="mini"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="申请理由:">
                    <el-input size="mini" type="textarea" v-model="due_data.remark"></el-input>
                </el-form-item>
            </el-form>
            <div><b>申请记录：</b> </div>
            <table v-if="due_data.due_date_change_logs.length>0" border="1" bordercolor="#E5E5E5" style="width:100%;text-align:center;font-size:12px;">
                <tr>
                    <th width='130'>申请时间</th>
                    <th width='60'>申请人</th>
                    <th width='80'>应收日期</th>
                    <th width='80'>修改应收日期</th>
                    <th width='80'>状态</th>
                    <th>申请理由</th>
                    <th width='60'>审核人</th>
                    <th>审核备注</th>
                </tr>
                <tr v-for="item in due_data.due_date_change_logs">
                    <td>{{item.created_at}}</td>
                    <td>{{item.user?item.user.name:''}}</td>
                    <td>{{item.original_due_date}}</td>
                    <td>{{item.due_date}}</td>
                    <td>{{getEnumValue(due_date_status_info,item.status)}}</td>
                    <td>{{item.remark}}</td>
                    <td>{{item.verify_user?item.verify_user.name:'-'}}</td>
                    <td>{{item.verify_remark?item.verify_remark:'-'}}</td>
                </tr>
            </table>
            <div style="text-align:right;margin-top:10px;">
                <el-button type="primary" size="mini" :loading="loading_save_due" @click="save_due()">保存</el-button>
                <el-button size="mini" @click="dialogDue = false">取消</el-button>
            </div>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size="list.per_page"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>

<script>
    import { sale_lists, customer_lists,customer_lists_all,saler_contract_count_details,details_download,late_export,
    change_due_date_application,
    change_due_date_application_save
    } from '@/api/sale'
    import util from "@/libs/util";
    export default {
        name: 'sales-sales_children',
        data () {
            return {
                permissions: JSON.parse(localStorage.getItem("permissions")),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                currentPage: 1,
                queryList: {
                    page: '1',
                    contract_number: '',
                    cas:'',
                    start_time: '',
                    end_time: '',
                    customer_name: '',
                    sale_id:'',
                    receipt_status_ids:[1,2],
                    invoice_status_ids:'',
                    delivery_status_ids:[2,3,4],
                    is_old:'',
                    invoice_number:'',
                    overdue_status:'',
                    currency_id:'',
                    due_date_end:'',
                    due_date_start:''
                },
                list: [],
                enums:{},
                customer: [],
                sales:[],
                due_data:{
                    saler_contract_detail_id:'',
                    contract_number:'',
                    due_old_data:'',
                    due_date:'',
                    remark:'',
                    due_date_change_logs:[]
                },
                prod_export_url:'',
                due_date_status_info:[],
                dialogDue:false,
                loading: false,
                loading_save_due:false,
                loading_search:false,
                file_loading:false,
                loading_search_yun:false,
                loading_e:false,
                file_url:''
            }
        },
        created () {
            sale_lists().then(res => {
                this.sales = res.data
            })
            let user_id=util.cookies.get("user_id");
            if(this.$route.query.date){
                // this.queryList.overdue_status=1;
                // this.queryList.sale_id=''
                // this.queryList.currency_id=''
                // this.queryList.receipt_status_ids = [1,2]
                // this.queryList.delivery_status_ids = [2,3,4]
                this.queryList={
                    page: '1',
                    contract_number: '',
                    cas:'',
                    start_time: '',
                    end_time: '',
                    customer_name: '',
                    sale_id:'',
                    receipt_status_ids:[1,2],
                    invoice_status_ids:'',
                    delivery_status_ids:[2,3,4],
                    is_old:'',
                    invoice_number:'',
                    overdue_status:1,
                    currency_id:''
                }
            }
            if(this.$route.query.overdue||this.$route.query.currency_id){
                // this.queryList.overdue_status = ''
                // this.queryList.receipt_status_ids = []
                // this.queryList.delivery_status_ids = []
                // this.queryList.sale_id = ''
                this.queryList={
                    page: '1',
                    contract_number: '',
                    cas:'',
                    start_time: '',
                    end_time: '',
                    customer_name: '',
                    sale_id:'',
                    receipt_status_ids:[],
                    invoice_status_ids:'',
                    delivery_status_ids:[],
                    is_old:'',
                    invoice_number:'',
                    overdue_status:'',
                    currency_id:''
                }
                if(this.$route.query.amount){
                    this.queryList.start_time=this.$route.query.overdue.start_date;
                    this.queryList.end_time=this.$route.query.overdue.end_date;
                    this.queryList.sale_id=Number(this.$route.query.sale_id);
                    this.queryList.delivery_status_ids=[3,4];
                    this.queryList.currency_id=Number(this.$route.query.currency_id);
                }else{
                    this.queryList.start_time=this.$route.query.overdue.start_date;
                    this.queryList.end_time=this.$route.query.overdue.end_date;
                    this.queryList.sale_id=Number(this.$route.query.sale_id);
                    this.queryList.overdue_status=1;
                    this.queryList.currency_id=Number(this.$route.query.currency_id);
                }
            }
            let flag=false
            JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
                if(items.id==1){
                    flag=true
                }
            })
            if(!this.$route.query.sale_id&&!flag){
                this.queryList.sale_id = Number(user_id)
            }
            this.fetchData()
        },
        watch: {
            $route(to, from) {
                let user_id=util.cookies.get("user_id");
                if(this.$route.query.date){
                    // this.queryList.overdue_status=1;
                    // this.queryList.sale_id=''
                    // this.queryList.currency_id=''
                    // this.queryList.receipt_status_ids = [1,2]
                    // this.queryList.delivery_status_ids = [2,3,4]
                    this.queryList={
                        page: '1',
                        contract_number: '',
                        cas:'',
                        start_time: '',
                        end_time: '',
                        customer_name: '',
                        sale_id:'',
                        receipt_status_ids:[1,2],
                        invoice_status_ids:'',
                        delivery_status_ids:[2,3,4],
                        is_old:'',
                        invoice_number:'',
                        overdue_status:1,
                        currency_id:''
                    }
                }
                if(this.$route.query.overdue||this.$route.query.currency_id){
                    // this.queryList.overdue_status = ''
                    // this.queryList.delivery_status_ids = []
                    // this.queryList.receipt_status_ids = []
                    // this.queryList.sale_id = ''
                    this.queryList={
                        page: '1',
                        contract_number: '',
                        cas:'',
                        start_time: '',
                        end_time: '',
                        customer_name: '',
                        sale_id:'',
                        receipt_status_ids:[],
                        invoice_status_ids:'',
                        delivery_status_ids:[],
                        is_old:'',
                        invoice_number:'',
                        overdue_status:'',
                        currency_id:''
                    }
                    if(this.$route.query.amount){
                        this.queryList.start_time=this.$route.query.overdue.start_date;
                        this.queryList.end_time=this.$route.query.overdue.end_date;
                        this.queryList.sale_id=Number(this.$route.query.sale_id);
                        this.queryList.delivery_status_ids=[3,4];
                        this.queryList.currency_id=Number(this.$route.query.currency_id);
                    }else{
                        this.queryList.start_time=this.$route.query.overdue.start_date;
                        this.queryList.end_time=this.$route.query.overdue.end_date;
                        this.queryList.sale_id=Number(this.$route.query.sale_id);
                        this.queryList.overdue_status=1;
                        this.queryList.currency_id=Number(this.$route.query.currency_id);
                    }
                }

                let flag=false
                JSON.parse(localStorage.getItem('roles_ids')).forEach((items,index)=>{
                    if(items.id==1){
                        flag=true
                    }
                })
                if(!this.$route.query.sale_id&&!flag){
                    this.queryList.sale_id = Number(user_id)
                }
                this.fetchData()
            }
        },
        methods: {
            down_file(){
                this.file_loading = true;
                details_download(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.file_url = res.data
                        setTimeout(() => {
                            this.$refs.file_url_down.click()
                            this.file_loading = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.file_loading = false
                    }
                }).catch(rr => {
                    this.file_loading = false
                })
            },
            fetchData () {
                saler_contract_count_details(this.queryList).then(res => {
                    if(this.loading_search||this.loading_search_yun){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                        this.loading_search_yun=false
                    }
                    this.list = res.data
                    this.enums=res.enum
                }).catch(rr => {
                    this.loading_search=false 
                    this.loading_search_yun=false
                })
            },
            querySearchAsync_corporation(queryString, cb) {
                var restaurants = '';
                if(queryString){
                    customer_lists(queryString).then(res => {
                        restaurants = res.data
                        cb(restaurants)
                    })
                }else{
                    cb(restaurants)
                }
            },
            Accounting(item){
                change_due_date_application(item.id).then(res=>{
                    if (res && res.code == 0){
                        this.due_data = {
                            saler_contract_detail_id:res.data.id,
                            contract_number:res.data.contract_number,
                            due_old_data:res.data.due_date,
                            due_date:'',
                            remark:'',
                            due_date_change_logs:res.data.due_date_change_logs
                        }
                        this.due_date_status_info = res.enum.due_date_status_info
                        this.dialogDue = true
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            save_due(){
                this.loading_save_due = true
                var obj = {
                    saler_contract_detail_id:this.due_data.saler_contract_detail_id,
                    due_date:this.due_data.due_date,
                    remark:this.due_data.remark
                }
                change_due_date_application_save(obj).then(res=>{if (res && res.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.fetchData()
                    this.dialogDue = false
                    this.loading_save_due = false
                    } else {
                    this.$message({
                        message: res.msg,
                        type: 'error'
                    })
                    this.loading_save_due = false
                    }
                }).catch(rr => {
                    this.loading_save_due = false
                })
            },
            handleSelect_corporation(item){
                this.queryList.customer_name=item.name
                this.$forceUpdate()
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
                    path: '/sales/notice_check_detail',
                    name: 'sales-notice_check_detail',
                    query: {
                        id: id
                    }
                })
            },
            doExport(){
                this.loading_e = true
                var queryList = JSON.parse(JSON.stringify(this.queryList))
                late_export(queryList).then(res => {
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
            search () {
                this.loading_search=true
                this.queryList.page=1
                this.currentPage=1
                this.fetchData()
            },
            search_yun(){
                this.loading_search_yun=true
                this.queryList.receipt_status_ids = [1,2]
                this.queryList.delivery_status_ids = [2,3,4]
                this.currentPage=1
                this.fetchData()
            },
            handleCurrentChange (page_current) {
                this.queryList.page = this.currentPage = page_current
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
            padding: 10px 0px;
            line-height: 20px;
            font-size: 11px;
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
