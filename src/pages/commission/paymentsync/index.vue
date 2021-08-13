<style lang="scss" scoped type="text/scss">
    .add {
        margin-bottom: 10px;
    }
    .el-pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>
<template>
    <d2-container>
        <search :api="api" :per_page='10'  @data="get_lists($event)"></search>
        <div v-if="!dialogImport">
            <el-table :data="list.data" class="d2-mt-5" element-loading-text="Loading" border fit highlight-current-row size="mini">
                <el-table-column align="center" label='id' width="80">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="type" align="center" width="60">
                    <template slot-scope="scope">
                        {{scope.row.type}}
                    </template>
                </el-table-column>
                <el-table-column label="平台" align="center" width="160">
                    <template slot-scope="scope">
                        {{scope.row.vendor}}
                    </template>
                </el-table-column>
                <el-table-column label="处理状态" align="center" width="85">
                    <template slot-scope="scope">
                        {{scope.row.processed}}
                    </template>
                </el-table-column>

                <el-table-column label="合同号" align="center" width="140">
                    <template slot-scope="scope">
                        {{scope.row.contract_number}}
                    </template>
                </el-table-column>
                <el-table-column label="交易号" align="center" width="220">
                    <template slot-scope="scope">
                        {{scope.row.trade_no}}
                    </template>
                </el-table-column>
                <el-table-column label="支付金额" align="center" width="80">
                    <template slot-scope="scope">
                        {{scope.row.checkin}}
                    </template>
                </el-table-column>
                <el-table-column label="其他费用" align="center" width="80">
                    <template slot-scope="scope">
                        {{scope.row.other_fee}}
                    </template>
                </el-table-column>
                <el-table-column label="回调次数" align="center" width="110">
                    <template slot-scope="scope">
                        {{scope.row.callback_times}}
                    </template>
                </el-table-column>
                <el-table-column label="回调状态" align="center" width="110">
                    <template slot-scope="scope">
                        {{scope.row.callback_status}}
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" align="center" width="140">
                    <template slot-scope="scope">
                        {{scope.row.created_at}}
                    </template>
                </el-table-column>
                <el-table-column label="回调返回" align="center" width="155">
                    <template slot-scope="scope">
                        <el-tooltip placement="top">
                            <div slot="content">
                                <span>{{scope.row.callback_response_data}}</span>
                            </div>
                            <span>{{attr(scope.row,'callback_response_data.msg')}}</span>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" fixed="right">
                    <template slot-scope="scope">
                        <template>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    v-if="permission_names['paymentsync.sync']=='paymentsync.sync'&&scope.row.processed!=1"
                                    @click="handle_paymentsync(scope.row)"
                                    :loading="scope.row.loading"
                                   >同步
                            </el-button>
                        </template>
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
        <div v-else>
            <el-form ref="form" :model="form" label-width="90px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="选择账户:" :required="true">
                            <el-select v-model="form.account_id"  placeholder="" size="mini" clearable style="width:100%;">
                                <el-option
                                        v-for="item in accounts"
                                        :key="item.id"
                                        :label="item.name"
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
                            <el-button  @click="dialogImport=false" size="mini">返回</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span="18">
                        <el-table  :data="list_import.data" element-loading-text="Loading" border fit highlight-current-row size='mini'>
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
                            <el-table-column label="username" align="center"  width="80">
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
                            <el-table-column label="result_url" align="center"  width="100">
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
        paymentsync
    } from '@/api/commission';
    import util from '@/libs/util';
    import request from '@/plugin/axios';
    import search from "@/components/search/index2";
    export default {
        name:'commission-paymentsync',
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                list: [],
                currentPage: 1,
                enums:{},
                dialogImport:false,
                form: {
                    account_id:''
                },
                currentPage_import: 1,
                queryList_import: {
                    'page': '1',
                },
                upload: process.env.VUE_APP_API + 'template/excel/prodspec.xlsx',
                upload_api: process.env.VUE_APP_API + 'api/v1/payment/transactionpipe/upload',
                fileList: [],
                list_import: {},
                accounts:[],
                api:'api/v1/payment/paymentsync/index_form',
                obj:{},
            }
        },
        watch: {
            $route(to, from) {
                if (to.name === "commission-paymentsync") {
                    
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
        methods: {
            fetchData() {
                if(this.obj.method=='POST'){
                    request({
                        url: process.env.VUE_APP_API + this.obj.url,
                        method: this.obj.method,
                        data: this.obj.params
                    }).then(res => {
                        if (res && res.code == 0) {
                            console.log(res.data)
                            res.data.data.forEach((items,index)=>{
                                items.loading=false
                            })
                            this.list = res.data;
                            this.enums=res.enum
                        }
                    }).catch(rr => {
                    })
                }else{
                    request({
                        url: process.env.VUE_APP_API + this.obj.url,
                        method: this.obj.method,
                        params: this.obj.params
                    }).then(res => {
                        if (res && res.code == 0) {
                            console.log(res.data)
                            this.list = res.data;
                            this.enums=res.enum
                        }
                    }).catch(rr => {
                    })
                }
                account_search().then(res => {
                    res.data.forEach((items,index)=>{
                        items.name = items.account_name+'-'+(items.account?items.account:'')+(items.currency?'-'+items.currency:'')
                    })
                    this.accounts = res.data;
                })
            },
            get_lists(obj){
                this.obj=JSON.parse(JSON.stringify(obj));
                this.obj.params.per_page = 100;
                this.fetchData()
            },
            import_execl(){
                this.dialogImport=true
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
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleCurrentChange_import(page_current) {
                this.queryList_import.page = this.currentPage_import = page_current;
                transactionpipe_upload_index(this.queryList_import).then(res => {
                    this.list_import = res.data
                })
            },
            handle_paymentsync(item){
                item.loading=true
                var obj={
                    id:item.id
                }
                paymentsync(obj,item,this)
            }
        }
    };
</script>


