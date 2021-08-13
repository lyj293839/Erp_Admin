<style lang="scss" scoped type="text/scss">
    .add {
        margin-bottom: 10px;
    }

    .el-pagination {
        text-align: right;
        margin-top: 10px;
    }

    //   .top{
    //         position: fixed;
    //         top: 90px;
    //         z-index: 999;
    //     }  
    .log_table {
        table {
            td {
                padding: 5px;
            }
        }
    }
    .el-table{
        .el-button{
                    margin-top: 5px;
                }
    }
</style>
<template>
    <d2-container>
        <div class="top">
            <search :api="api" :per_page='10' @data="get_lists($event)"></search>
            <el-button
                    class="add"
                    size="mini"
                    type="primary"
                    v-if="permission_names['transactionpipe.upload']=='transactionpipe.upload'"
                    @click="import_execl" icon="plus"
                    style="vertical-align: top;margin-top: 2px;margin-left: 5px;">导入
            </el-button>
        </div>


        <div v-if="!dialogImport">
            <el-table id="id" :data="list.data" class="d2-mt-5" ref="table" :height="tableHeight" element-loading-text="Loading"
                      border fit highlight-current-row size="mini">
                <el-table-column align="center" label='id' width="60">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="业务类型" align="left" width="70">
                    <template slot-scope="scope">
                        {{scope.row.business_type}}
                    </template>
                </el-table-column>
                <el-table-column label="交易日期" align="left" width="85">
                    <template slot-scope="scope">
                        {{scope.row.trade_date}}
                    </template>
                </el-table-column>
                <el-table-column label="付款账户" align="left" width="300">
                    <template slot-scope="scope">
                        {{scope.row.pay_account}}<br>
                        {{scope.row.pay_account_name}}
                    </template>
                </el-table-column>
                <el-table-column label="贷方/未认" align="left" width="90">
                    <template slot-scope="scope">
                        {{scope.row.pay_in}}/{{scope.row.pay_in_balance}}
                    </template>
                </el-table-column>
                <el-table-column label="借方/未认" align="left" width="90">
                    <template slot-scope="scope">
                        {{scope.row.pay_out}}/{{scope.row.pay_out_balance}}
                    </template>
                </el-table-column>
                <el-table-column label="货币" align="left" width="50">
                    <template slot-scope="scope">
                        {{attr(scope.row,'account.currency')}}
                    </template>
                </el-table-column>
                <el-table-column label="账户名称" align="left" width="140">
                    <template slot-scope="scope">
                        {{attr(scope.row,'account.account')}}
                    </template>
                </el-table-column>
                <el-table-column label="收款账户" align="left" width="200">
                    <template slot-scope="scope">
                        {{scope.row.receive_account}}<br>
                        {{scope.row.receive_account_name}}
                    </template>
                </el-table-column>
                <el-table-column label="交易备注/用途/交易号/产品名称" align="left" width="350">
                    <template slot-scope="scope">
                        备注:{{scope.row.remarks}}<br/>
                        用途:{{scope.row.purpose}}<br/>
                        交易号:{{scope.row.trade_no}}<br/>
                        产品:{{scope.row.product_name}}
                    </template>
                </el-table-column>
                <el-table-column align="left" label="操作" fixed="right" width="180">
                    <template slot-scope="scope">
                        <el-tooltip v-if="scope.row.pay_in_balance>0" effect="dark" content="销售认款" placement="top">
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="handle_Subscription(scope.row)">认款
                            </el-button>
                        </el-tooltip>
                        <span v-if="permission_names['transactionpipe.apply']=='transactionpipe.apply'"
                              >
                                <el-tooltip v-if="scope.row.pay_in_balance>0" effect="dark" content="财务认款"
                                            placement="top">
                                    <el-button
                                            size="mini"
                                            type="info"
                                            style="margin: 0px 10px;"
                                            @click="Transfer(scope.row)">认款
                                    </el-button>
                                </el-tooltip>
                            </span>
                        <el-button
                                size="mini"
                                type="success"
                                v-if="scope.row.logs&&scope.row.logs.length>0"
                                @click="logs(scope.row)">记录
                        </el-button>
                        <div style="margin-top:5px;">
                            <el-button
                                    size="mini"
                                    v-if="permission_names['transactionpipe.show']=='transactionpipe.show'&&display!==1"
                                    @click="show(scope.row.id)">显示
                            </el-button>
                            <el-button
                                    size="mini"
                                    v-if="permission_names['transactionpipe.hiden']=='transactionpipe.hiden'&&display!==0"
                                    @click="hiden(scope.row.id)">隐藏
                            </el-button>
                        </div>
                        <!-- <el-row>
                            <el-col :span='8'>
                                <el-tooltip v-if="scope.row.pay_in_balance>0" effect="dark" content="销售认款" placement="top">
                                    <el-button
                                            size="mini"
                                            type="primary"
                                            @click="handle_Subscription(scope.row)">认款
                                    </el-button>
                                </el-tooltip>
                            </el-col>
                            <el-col :span='8'>
                                <span v-if="permission_names['transactionpipe.apply']=='transactionpipe.apply'">
                                    <el-tooltip v-if="scope.row.pay_in_balance>0" effect="dark" content="财务认款"
                                                placement="top">
                                        <el-button
                                                size="mini"
                                                type="info"
                                                @click="Transfer(scope.row)">认款
                                        </el-button>
                                    </el-tooltip>
                                </span>
                            </el-col>
                            <el-col :span='8'>
                                <el-button
                                        size="mini"
                                        type="success"
                                        v-if="scope.row.logs&&scope.row.logs.length>0&&scope.row.pay_in>0"
                                        @click="logs(scope.row)">记录
                                </el-button>
                            </el-col>
                            <el-col :span='8'>
                                <el-button
                                    size="mini"
                                    @click="show(scope.row.id)">显示
                                </el-button>
                            </el-col>
                            <el-col :span='8'>
                                <el-button
                                        size="mini"
                                        @click="hiden(scope.row.id)">隐藏
                                </el-button>
                            </el-col>
                        </el-row> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="list.per_page"
                    layout="total,sizes,prev, pager, next"
                    :page-sizes="[50,100,200]"
                    @size-change="handleSizeChange"
                    :total="list.total">
            </el-pagination>
        </div>
        <div v-else style="margin-top:40px;">
            <el-form ref="form" :model="form" label-width="90px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="选择账户:" :required="true">
                            <el-select v-model="form.account_id" placeholder="" size="mini" clearable
                                       style="width:100%;">
                                <el-option
                                        v-for="item in accounts"
                                        :key="item.id"
                                        :label="item.accountText"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上传文件:" :required="true">
                            <el-upload
                                    style="display: inline-block;"
                                    class="upload-demo"
                                    ref="upload"
                                    :action=upload_api
                                    :data=form
                                    :headers=headers
                                    :before-remove="beforeRemove"
                                    multiple
                                    accept=".xlsx,.csv,.xls"
                                    :limit="1"
                                    :on-success="handleAvatarSuccess"
                                    :auto-upload="false"
                                    :file-list="fileList">
                                <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
                            <el-button @click="dialogImport=false" size="mini">返回</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="list_import.data" element-loading-text="Loading" border fit
                                  highlight-current-row size='mini'>
                            <el-table-column align="center" label='id' width="60">
                                <template slot-scope="scope">
                                    {{scope.row.id}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label='Material_id' width="90">
                                <template slot-scope="scope">
                                    {{scope.row.material_id}}
                                </template>
                            </el-table-column>
                            <el-table-column align="center" label='Time' width="150">
                                <template slot-scope="scope">
                                    {{scope.row.created_at}}
                                </template>
                            </el-table-column>
                            <el-table-column label="username" align="center" width="80">
                                <template slot-scope="scope">
                                    {{getEnumValue(GEnums.Users,scope.row.material.user_id)}}
                                </template>
                            </el-table-column>
                            <el-table-column label="账户信息" align="center">
                                <template slot-scope="scope">
                                    {{getEnumValue(accounts,scope.row.account_id)}}
                                </template>
                            </el-table-column>
                            <el-table-column label="origin" align="center">
                                <template slot-scope="scope">
                                    {{scope.row.material.origin}}
                                </template>
                            </el-table-column>
                            <el-table-column label="result_url" align="center" width="100">
                                <template slot-scope="scope">
                                    <el-button type="primary" size="mini" v-if="scope.row.material.result_url">
                                        <a :href="scope.row.material.result_url" target="_blank" style="color: white;">Download</a>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination
                                style="text-align: right;margin: 10px 0 0;"
                                background
                                @current-change="handleCurrentChange_import"
                                :current-page.sync="currentPage_import"
                                :page-size="list_import.per_page"
                                layout="prev, pager, next"
                                :total="list_import.total">
                        </el-pagination>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!-- logs -->
        <el-dialog title="认款记录" :visible.sync="is_log" width="90%" class="log_table">
            <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
                <tr style="font-weight:bold;">
                    <td width='50'>ID</td>
                    <td width='80'>Reciept ID</td>
                    <td width='50'>TPID</td>
                    <td width='80'>合同号</td>
                    <th width="90px;">合同总金额</th>
                    <td width='80'>收款</td>
                    <td width='80'>费用</td>
                    <th width="70px;">合同状态</th>
                    <td width="200">客户名称</td>
                    <td width='200'>收款账户</td>
                    <td width='80'>时间</td>
                    <td width='50'>用户</td>
                    
                    <td width='130'>备注</td>
                    <td width='40'>状态</td>
                </tr>
                <tr v-for="item in log_list.data" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.reciept?item.reciept.id:''}}</td>
                    <td>{{item.transactionpipe_id}}</td>
                    <td>{{item.reciept?item.reciept.saler_contract_detail.contract_number:''}}</td>
                    <td>{{item.reciept?item.reciept.saler_contract_detail.total_money:''}}</td>
                    <td>{{item.pay_in_flow}}
                        <span v-if="item.reciept">{{getEnumValue(accounts,item.reciept.account_id,'currency')}}</span>
                        <span v-else>{{log_list.currency}}</span>
                    </td>
                    <td>{{item.pay_out_flow}}</td>
                    <td>{{getEnumValue(receipt_status_info,item.reciept?item.reciept.saler_contract_detail.receipt_status:'')}}</td>
                    <td>{{item.reciept?item.reciept.saler_contract_detail.customer_name2:''}}</td>
                    <td>
                        <span v-if="item.reciept">{{getEnumValue(accounts,item.reciept.account_id)}}</span>
                    </td>
                    <td>{{item.created_at}}</td>
                    <td>{{getEnumValue(Users,item.user_id)}}</td>
                    
                    <td>{{item.note}}
                        <span v-if="item.reciept">{{item.reciept.note}}</span>
                    </td>
                    <td>{{item.type}}</td>
                </tr>
            </table>
        </el-dialog>

        <!-- 财务认款 -->
        <el-dialog title="财务认款" :visible.sync="dialogTransfer" width="40%">
            <div style="text-align:left;display:flex;align-items: center;">
                <span>认款金额:</span>
                <el-input size="mini" v-model="Transfer_form.checkin" @input='checkin_change(Transfer_form.checkin)'
                          style="width:50%;margin:0px 10px"></el-input>
                <span style="color:red;">(未认金额:{{pay_in_balance}})</span>
            </div>
            <div style="text-align:left;display:flex;align-items: center;margin-top:10px;">
                <span>认款备注:</span>
                <el-input type="textarea" size="mini" v-model="Transfer_form.note"
                          style="width:75%;margin-left:10px"></el-input>
            </div>
            <!-- <div style="text-align:left;display:flex;align-items: center;margin-top:10px;">
                <span>转往来账:</span>
                <el-switch v-model="Transfer_form.to_currentaccount" :active-value="1" :inactive-value="0" style="margin-left:10px"></el-switch>
            </div>
            <div v-if="Transfer_form.to_currentaccount" style="text-align:left;display:flex;align-items: center;margin-top:10px;">
                <span>选择客户:</span>
                <el-select
                    v-model="Transfer_form.customer_id"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    :loading="supplyloading"
                    placeholder="客户"
                    @change="supplyChange()"
                    style="width:50%;margin-left:10px"
                    size="mini"
                    clearable
                >
                    <el-option v-for="item in supply_list" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </div> -->
            <div style="text-align:right;margin-top:10px;">
                <el-button type="primary" size="mini" @click="Transfer_save()">确定</el-button>
                <el-button size="mini" @click="dialogTransfer = false">取消</el-button>
            </div>
        </el-dialog>

    </d2-container>
</template>
<script>
    import {
        account,
        payment_save,
        account_search,
        transactionpipe_index,
        transactionpipe_upload_index,
        can_receipt,
        transactionpipe_show,
        transactionpipe_hiden,
        apply
    } from '@/api/commission';
    import util from '@/libs/util';
    import request from '@/plugin/axios';
    import search from "@/components/search/index2";
    import {listTotal} from "@/api/prod";

    export default {
        name: 'commission-subscription',
        data() {
            return {
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                permissions: JSON.parse(localStorage.getItem('permissions')),
                list: [],
                scrollTop:0,
                display:'',
                currentPage: 1,
                enums: {},
                dialogImport: false,
                is_log: false,
                dialogTransfer: false,
                supplyloading: false,
                is_Transfer: false,
                form: {
                    account_id: ''
                },
                Transfer_form: {},
                pay_in_balance: '',
                currentPage_import: 1,
                queryList_import: {
                    'page': '1',
                },
                log_list: {},
                upload: process.env.VUE_APP_API + 'template/excel/prodspec.xlsx',
                upload_api: process.env.VUE_APP_API + 'api/v1/payment/transactionpipe/upload',
                fileList: [],
                list_import: {},
                accounts: [],
                supply_list: [],
                api: 'api/v1/payment/transactionpipe/index_form',
                obj: {},
                Users: [],
                receipt_status_info:[],
                tableHeight: '75vh'
            }
        },
        watch: {
            $route(to, from) {
                if (to.name == "commission-subscription") {
                    this.handleScroll()
                }
            }
        },
        components: {
            search
        },
        created() {
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
        mounted: function () {
            setTimeout(() => {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 135;
            }, 100)
            this.$refs.table.bodyWrapper.addEventListener('scroll', () => {
                // 滚动距离
                this.scrollTop = this.$refs.table.bodyWrapper.scrollTop
            })
        },
        methods: {
            fetchData() {
                this.scrollTop = 0
                this.handleScroll()
                if(this.obj.params['transactionpipe_favs.display']){
                    if(this.obj.params['transactionpipe_favs.display'].value==1){
                        this.display = 1
                    }else{
                        this.display = 0
                    }
                }else{
                    this.display = ''
                }
                if (this.obj.method == 'POST') {
                    request({
                        url: process.env.VUE_APP_API + this.obj.url,
                        method: this.obj.method,
                        data: this.obj.params
                    }).then(res => {
                        if (res && res.code == 0) {
                            this.list = res.data;
                            this.enums = res.enum
                        }
                    }).catch(rr => {
                    })
                } else {
                    request({
                        url: process.env.VUE_APP_API + this.obj.url,
                        method: this.obj.method,
                        params: this.obj.params
                    }).then(res => {
                        if (res && res.code == 0) {
                            this.list = res.data;
                            this.enums = res.enum
                        }
                    }).catch(rr => {
                    })
                }
                account_search().then(res => {
                    res.data.forEach((items, index) => {
                        items.name = items.account_name + '-' + (items.account ? items.account : '') + (items.currency ? '-' + items.currency : '')
                    })
                    this.accounts = res.data;
                })
                this.Users = this.GEnums.Users
                this.receipt_status_info =this.GEnums.ReceiptStatus;
            },
            handleScroll() {
                this.$nextTick(()=> {
                        setTimeout(() => {
                        var scrollTop = this.$refs.table.bodyWrapper
                        scrollTop.scrollTop = this.scrollTop
                        }, 10)
                    })
            },
            show(id){
                var ids = {id:id}
                transactionpipe_show(ids,this)
            },
            hiden(id){
                var ids = {id:id}
                transactionpipe_hiden(ids,this)
            },
            get_lists(obj) {
                this.obj = JSON.parse(JSON.stringify(obj));
                this.obj.params.per_page = 100;
                this.fetchData()
            },
            import_execl() {
                this.dialogImport = true
                transactionpipe_upload_index(this.queryList_import).then(res => {
                    this.list_import = res.data
                })
            },
            handleCurrentChange(page_current) {
                this.obj.params.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleSizeChange(val) {
                this.obj.params.per_page = val;
                this.fetchData();
            },

            onSubmit() {
                this.$refs.upload.submit()
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.form = {
                        account_id: ''
                    }
                    this.fileList = []
                    transactionpipe_upload_index(this.queryList_import).then(res => {
                        this.list_import = res.data
                    })
                } else {
                    this.$message.error(file.response.msg)
                }
            },
            logs(item) {
                this.log_list = {
                    data: item.logs,
                    currency: item.account ? item.account.currency : ''
                }
                var data = {
                    id:item.id
                }
                this.is_log = true
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            supplyMethod(query) {
                this.supply_list = [];
                if (query !== "") {
                    this.supplyloading = true;
                    setTimeout(() => {
                        listTotal("data/member_list?type=1&name=" + query).then(res => {
                            this.supply_list = res.data;
                            this.supplyloading = false;
                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            supplyChange() {
                if (!this.Transfer_form.customer_id) {
                    this.supply_list = []
                }
            },
            handleCurrentChange_import(page_current) {
                this.queryList_import.page = this.currentPage_import = page_current;
                transactionpipe_upload_index(this.queryList_import).then(res => {
                    this.list_import = res.data
                })
            },
            Transfer(item) {
                this.pay_in_balance = item.pay_in_balance
                this.Transfer_form = {
                    id: item.id,
                    customer_id: '',
                    checkin: '',
                    note: '',
                    to_currentaccount: 0
                }
                this.supply_list = []
                this.dialogTransfer = true
            },
            Transfer_save() {
                var Transfer_form = JSON.parse(JSON.stringify(this.Transfer_form))
                if (this.Transfer_form.to_currentaccount == 0) {
                    delete Transfer_form.customer_id
                }
                apply(Transfer_form, this)
            },
            checkin_change(item) {
                if (Number(item) < 0 || Number(item) > Number(this.pay_in_balance)) {
                    this.Transfer_form.checkin = ''
                    this.$message({
                        message: '不可以小于零或大于未认金额',
                        type: 'error'
                    })
                }
            },
            handle_Subscription(item) {
                var obj = {
                    id: item.id
                }
                can_receipt(obj).then(res => {
                    if (res && res.code == 0){
                        var arr = {
                            ids: [],
                            name: ''
                        }
                        res.data.forEach(i => {
                            arr.ids.push(i.id)
                        })
                        arr.name = res.payaccount.pay_account_name
                        this.$router.push({
                            path: "/commission/Receipt/Receipt_list",
                            name: "commission-Receipt_list",
                            query: {
                                transactionpipe_id: JSON.stringify(arr.ids),
                                name: arr.name,
                                member_id:res.payaccount.pay_member_id?res.payaccount.pay_member_id:'',
                                pay_out_balance: res.payment.pay_out_balance ? (res.payment.pay_out_balance).toString() : '',
                                pay_in_balance: res.payment.pay_in_balance ? res.payment.pay_in_balance : '',
                                account_id: res.account ? res.account.account_id : '',
                                trade_date: item.trade_date,
                                currency:item.account.currency?item.account.currency:'',
                                is_click: true
                            }
                        });
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                    }
                    
                })
            }
        }
    };
</script>


