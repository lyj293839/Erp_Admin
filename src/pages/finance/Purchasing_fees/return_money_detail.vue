<style lang="scss" scoped type="text/scss">
    /deep/ .div {
        width: 100%;
        overflow: auto;
        font-size: 14px;
        border: 1px solid #e5e5e5;
        .el-input__inner {
            border: 0px;
            padding: 0px 0px;
        }
        .el-dialog {
            table {
                width: 100%;
            }
        }
        .form_title {
            background: #f1f1f1;
            margin-bottom: 0px;
            .el-button {
                color: black;
            }
        }
        td {
            padding: 0px 5px;
        }
        th {
            padding: 0px 5px;
        }
    }

    .from-item {
        width: 100%;
        overflow: auto;
        flex-wrap: wrap;
        table {
            border-collapse: collapse;
            margin-top: 5px;
            .el-select {
                width: 100%;
            }
        }
    }

    /deep/ .quoteInput {
        padding: 20px 0px;
        .el-input__inner {
            border: 1px solid #dcdfe6;
            padding: 0px 10px;
        }
    }

    /deep/ .dateInputStyle {
        .el-input__inner {
            padding: 0px 15px;
        }
        .el-input__prefix {
            left: -8px;
        }
    }
    .el-form-item__content{
        width: 100%;
    }
</style>
<template>
    <d2-container>
        <div class="div">
            <!-- 页面 -->
            <el-form label-width="0px" :model="addContract" label-position="right">
                <!-- 合同双方 -->
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale1')}}</b><!-- 双方 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show1" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th>{{$t('sale.add.sale2')}}</th><!-- 合同双方 -->
                                <th>{{$t('sale.add.sale3')}}</th><!-- 名称 -->
                                <th>{{$t('sale.add.sale4')}}</th><!-- 联系人 -->
                                <th>{{$t('sale.add.sale5')}}</th><!-- 联系电话 -->
                                <th>{{$t('sale.add.sale6')}}</th><!-- 传真 -->
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale7')}}</td><!-- 甲方 -->
                                <td>
                                    <el-select
                                            v-model="addContract.customer_name"
                                            filterable
                                            remote
                                            reserve-keyword
                                            :remote-method="supplyMethod"
                                            @change="supplyChange()"
                                            :loading="supplyloading"
                                            style="width:100%;"
                                            size="small"
                                    >
                                        <el-option
                                                v-for="item in supply_list"
                                                :label="item.name"
                                                :key="item.id"
                                                :value="item.name"
                                        ></el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="addContract.customer_contact" size="small"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="addContract.customer_mobile" size="small"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="addContract.customer_fax" size="small"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale8')}}</td><!-- 乙方 -->
                                <td>
                                    <el-select filterable v-model="addContract.corp_name"   size="small">
                                        <el-option
                                                v-for="item in corp_List"
                                                :label="item.name"
                                                :key="item.id"
                                                :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="addContract.corp_contact" size="small"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="addContract.corp_mobile" size="small"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="addContract.corp_fax" size="small"></el-input>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <!--合同备注-->
                <div >
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale155')}}</b><!-- 合同备注 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show1" class="from-item">
                        <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
                            <tr>
                                <th>{{$t('sale.add.sale156')}}</th><!-- 备注内容 -->
                                <th>{{$t('sale.add.sale157')}}</th><!-- 备注人 -->
                                <th>{{$t('sale.add.sale108')}}</th><!-- 时间 -->
                                <th>{{$t('sale.add.sale158')}}</th><!-- 文件 -->
                                <th class="d2-text-center">
                                    <el-button size="mini" @click="add_note" type="primary">+</el-button>
                                </th>
                            </tr>
                            <tr  v-for="item in contract_note" :key="item.id">
                                <td>{{item.note}}</td>
                                <td>{{attr(item,'user.name')}}</td>
                                <td>{{item.created_at}}</td>
                                <td><a href="item.file">{{item.origin_file}}</a></td>
                                <td class="d2-text-center">
                                    <el-button
                                            size="mini"
                                            type="danger"
                                            @click="destroyNote(item)"
                                    >-
                                    </el-button>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <!--条款-->
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale43')}}</b>
                            <!-- 条款 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show3" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td" width="130px">
                                    {{$t('sale.add.sale44')}}
                                    <!-- 合同号 -->
                                </th>
                                <th class="td">{{$t('sale.add.sale45')}}</th>
                                <!-- 签约时间 -->
                                <th class="td">{{$t('sale.add.sale46')}}</th>
                                <!-- 签约地点 -->
                                <th class="td">
                                    {{$t('sale.add.sale47')}}
                                    <!-- 销售 -->
                                </th>
                                <th class="td">
                                    PO
                                </th>
                                <th style="min-width:400px">
                                    {{$t('sale.add.sale48')}}
                                    <!-- 结算方式 -->
                                </th>
                            </tr>
                            <tr>
                                <td>
                                    <el-input v-model="addContract.contract_number"></el-input>
                                </td>
                                <td class="dateInput">
                                    <el-date-picker
                                            type="date"
                                            style="width:100%;"
                                            v-model="addContract.contract_date"
                                            value-format="yyyy-MM-dd"
                                            size="small"
                                    ></el-date-picker>
                                </td>
                                <td>
                                    <el-input v-model="addContract.contract_address"></el-input>
                                </td>
                                <td>
                                    <el-select v-model="addContract.sale_id" clearable filterable>
                                        <el-option
                                                v-for="(i,index) in sale_list"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id"
                                        ></el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="addContract.customer_po"></el-input>
                                </td>
                                <td>
                                    <el-select v-model="addContract.settle_type" clearable filterable>
                                        <el-option
                                                v-for="(i,index) in enums.PurchaseSettlementMethod"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id"
                                        ></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale99')}}</td>
                                <!-- 是否含税 -->
                                <td>
                                    <el-radio-group v-model="addContract.if_invoice">
                                        <el-radio :label="1">{{$t('sale.add.sale97')}}</el-radio>
                                        <!-- 含税 -->
                                        <el-radio :label="0">{{$t('sale.add.sale98')}}</el-radio>
                                        <!-- 不含税 -->
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale90')}}</td>
                                <td colspan="6">
                                    <el-input v-model="addContract.transportation"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale50')}}</td>
                                <!-- 质量标准 -->
                                <td colspan="6">
                                    <el-input v-model="addContract.quality_stardard"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale51')}}</td>
                                <!-- 合理损耗 -->
                                <td colspan="6">
                                    <el-input v-model="addContract.reasonable_loss"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale95')}}</td>
                                <!-- 包装标准&运输方式 -->
                                <td colspan="6">
                                    <el-input v-model="addContract.package_stardard"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale53')}}</td>
                                <!-- 验收标准 -->
                                <td colspan="6">
                                    <el-input v-model="addContract.accept_stardard"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale54')}}</td>
                                <!-- 有效期开始 -->
                                <td colspan="1" class="dateInput">
                                    <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            v-model="addContract.expdate_start"
                                            type="date"
                                            size="small"
                                    ></el-date-picker>
                                </td>
                                <td>{{$t('sale.add.sale55')}}</td>
                                <!-- 有效期结束 -->
                                <td colspan="1" class="dateInput">
                                    <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            v-model="addContract.expdate_end"
                                            type="date"
                                            size="small"
                                    ></el-date-picker>
                                </td>
                                <td>{{$t('sale.add.sale56')}}</td>
                                <!-- 加电子章 -->
                                <td>
                                    <el-radio-group v-model="addContract.if_echapter">
                                        <el-radio :label="1">{{$t('sale.add.sale57')}}</el-radio>
                                        <!-- 是 -->
                                        <el-radio :label="0">{{$t('sale.add.sale58')}}</el-radio>
                                        <!-- 否 -->
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale59')}}</td>
                                <!-- 备注 -->
                                <td colspan="5">
                                    <el-input v-model="addContract.note"></el-input>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <!-- 申请历史 -->
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale159')}}</b><!-- 申请历史 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show2" class="from-item">
                        <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
                            <tr>
                                <th>#ID</th>
                                <th>申请时间</th>
                                <th>支付方式</th>
                                <th>付款金额</th>
                                <th>收款金额(退款)</th>
                                <th>付款银行</th>
                                <th>付款时间</th>
                                <th>处理状态</th>
                                <th>审核状态</th>
                                <th>操作人员</th>
                                <th>备注</th>
                            </tr>
                            <tr v-for="item in paylist" :key="item.id">
                                <td>{{item.id}}</td>
                                <td>{{item.created_at}}</td>
                                <td>{{getEnumValue(enums.PayType,'item.pay_type')}}</td>
                                <td>{{getEnumValue(enums.Currency,item.currency_id,'icon')}}{{item.pay_requestamount}}</td>
                                <td>
                                    {{getEnumValue(enums.Currency,item.currency_id,'icon')}}{{item.refund_amount}}
                                    <el-tag type="danger" size="mini" v-if="item.refund_credit_flag">转往来账</el-tag>
                                </td>
                                <td>{{item.paybank}}</td>
                                <td>{{item.finance_pay_time}}</td>
                                <td>{{getEnumValue(enums.finance_pay_status,item.finance_pay_status)}}</td>
                                <td>{{getEnumValue(enums.check_status,item.check_status)}}</td>
                                <td>{{attr(item,'finance_pay_user.name')}}</td>
                                <td>{{item.note}}</td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <!-- 申请表单 -->
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale166')}}</b><!-- 申请表单 -->
                        </el-button>
                    </el-form-item>
                    <el-form label-width="100px" label-position="right" class="quoteInput">
                        <el-form-item label="收款方式" v-if="!refund_credit_flag"><!-- 收款方式 -->
                            <el-select v-model="apply_form.pay_type"  size="mini">
                                <el-option
                                        v-for="(item,index) in enums.PayType"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收款银行" v-if="!refund_credit_flag"><!-- 收款银行 -->
                            <el-select v-model="apply_form.paybank" style="width:300px" size="mini">
                                <el-option
                                        v-for="(item,index) in enums.paybanks"
                                        :key="index"
                                        :label="item.bank"
                                        :value="item.bank">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="收款方式" v-if="refund_credit_flag"><!-- 收款方式 -->
                           <div>转往来账</div>
                        </el-form-item>
                        <el-form-item label="审批金额"><!-- 审批金额 -->
                            <el-input
                                    size="mini"
                                    v-model="apply_form.money"
                                    style="width:100px;"
                                    clearable
                                    disabled
                            ></el-input>元
                        </el-form-item>
                        <el-form-item :label="$t('sale.add.sale59')"><!-- 备注 -->
                            <el-input v-model="apply_form.note" type="textarea" :rows="3"
                                      style="width:920px;"></el-input>
                        </el-form-item>
                        <el-form-item class="from-item">
                            <el-button type="primary" @click="save_apply_form()" :loading="loading" size="mini">{{$t('save')}}</el-button><!-- 保存 -->
                            <el-button @click="close"  size="mini">{{$t('cancel')}}</el-button><!-- 取消 -->
                        </el-form-item>
                    </el-form>
                </div>
            </el-form>
        </div>
        <!-- 备注 -->
        <el-dialog :visible.sync="note" width="50%" class="quoteInput">
            <el-form label-width="100px" label-position="right" class="quoteInput">
                <el-form-item :label="$t('sale.add.sale155')"><!-- 合同备注 -->
                    <el-input size="small" type="textarea" :rows="3" v-model="new_note.note"></el-input>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale158')"><!-- 文件 -->
                    <el-upload
                            :action="upload_api"
                            :headers="headers"
                            :data="new_note"
                            ref="upload"
                            :auto-upload="false"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                            :on-success="handleAvatarSuccess"
                    >
                        <el-button size="mini" type="primary">{{$t('sale.add.sale168')}}</el-button><!-- 上传文件 -->
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button size="mini" type="primary" :loading="loading" @click="addNote()">{{$t('save')}}</el-button><!-- 保存 -->
                    <el-button size="mini" @click="note = false">{{$t('cancel')}}</el-button><!-- 取消 -->
                </el-form-item>
            </el-form>
        </el-dialog>
    </d2-container>
</template>
<script>
    import $ from "jquery";
    import {
        sale_lists,
        customer_lists,
    } from "@/api/sale";
    import {
        fee_application_view,
        fee_application_save,
        cancle_fee_application,
        contractNoteCreate,
        contractNoteDestroy,
        member_bank_accounts
    } from "@/api/sale";
    import {refund_money_detail,refund_money_do} from "@/api/finance";
    import util from '@/libs/util'
    import { mapActions } from 'vuex'
    export default {
        name: 'finance-return_money_detail',
        data() {
            return {
                id: '',
                play: false,
                note: false,
                form_show1: true,
                form_show2: true,
                form_show3: true,
                supplyloading: false,
                addContract: {},
                supply_list: [],
                corp_List: [],
                fee_apply_check_status: [],
                fee_apply_status: [],
                pay_type_info: [],
                currencys:[],
                fee_type_info:[],
                payment_info_name: '',
                total_application_info_name: '',
                customer_name: '',
                customer_id:'',
                apply_form: {
                    id:'',
                    pay_type:1,
                    paybank:'',
                    note:'',
                    money:''
                },
                new_note: {
                    contract_id: "",
                    note: "",
                    type: 2
                },
                upload_api: process.env.VUE_APP_API + "api/v1/contractNoteCreate",
                loading:false,
                customer:[],
                fileList:[],
                paylist:[],
                sale_list:[],
                contract_note:[],
                enums:{},
                refund_credit_flag:''
            };
        },
        created() {
            if (this.$route.query.id) {
                this.id = this.$route.query.id
                this.fetchData(this.$route.query.id)
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.name=='finance-return_money_detail') {
                    this.id = this.$route.query.id
                    this.fetchData(this.$route.query.id)
                }
            }
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
            ...mapActions('d2admin/page',['closeAdd']),
            fetchData(id) {
                this.apply_form={
                    id:'',
                    pay_type:1,
                    paybank:'',
                    note:'',
                }
                sale_lists().then(res => {
                    this.sale_list = res.data;
                });
                refund_money_detail(id).then(res => {
                    this.apply_form.id=this.$route.query.id
                    this.refund_credit_flag=res.data.refund.refund_credit_flag
                    this.apply_form.money=res.data.refund.refund_amount
                    this.addContract.id=res.data.id
                    this.addContract.customer_name = res.data.supplier_name
                    this.addContract.customer_contact = res.data.supplier_contact
                    this.addContract.customer_mobile = res.data.supplier_mobile
                    this.addContract.customer_fax = res.data.supplier_fax

                    this.addContract.corp_name = res.data.corp_name
                    this.addContract.corp_contact = res.data.corp_contact
                    this.addContract.corp_mobile = res.data.corp_mobile
                    this.addContract.corp_fax = res.data.corp_fax

                    this.addContract.contract_number=res.data.contract_number
                    this.addContract.contract_date=res.data.contract_date
                    this.addContract.contract_address=res.data.signed_address
                    this.addContract.sale_id=res.data.sale_id
                    this.addContract.customer_po=res.data.customer_po
                    this.addContract.settle_type=res.data.settle_type_id
                    this.addContract.trade_type_id=res.data.trade_type_id
                    this.addContract.if_invoice=res.data.if_invoice
                    this.addContract.transportation=res.data.transportation
                    this.addContract.quality_stardard=res.data.quality_standard
                    this.addContract.reasonable_loss=res.data.reasonable_loss
                    this.addContract.package_stardard=res.data.package_stardard
                    this.addContract.accept_stardard=res.data.accept_stardard
                    this.addContract.expdate_start=res.data.expdate_start
                    this.addContract.expdate_end=res.data.expdate_end
                    this.addContract.if_echapter=res.data.if_echapter
                    this.addContract.note=res.data.note

                    this.paylist=res.data.paylist
                    this.contract_note=res.data.contract_note
                    this.enums=res.enum
                    this.apply_form.paybank=res.data.refund.paybank
                    this.fee_apply_check_status = res.enum.fee_apply_check_status
                    this.fee_apply_status = res.enum.fee_apply_status
                    this.pay_type_info = res.enum.pay_type_info
                    this.currencys=res.enum.currencys
                    this.fee_type_info=res.enum.fee_type_info
                })
            },
            cancel(id){
                cancle_fee_application(id,this)
            },
            remoteMethod(query) {
                if (query !== "") {
                    this.loading = true;
                    setTimeout(() => {
                        customer_lists(query).then(res => {
                            this.customer = res.data;
                            this.loading = false;
                        });
                    }, 200);
                } else {
                    this.customer = [];
                }
            },
            querySearchAsync_customer(queryString, cb) {
                if (queryString != '') {
                    customer_lists(queryString).then(res => {
                        var restaurants = res.data;
                        // var results = queryString ? restaurants.filter(this.createFilter_customer(queryString)) : restaurants;
                        // 调用 callback 返回建议列表的数据
                        cb(restaurants);
                    })
                }
            },
            querySearchAsync(queryString, cb) {
                if (queryString != '') {
                    cas_info(queryString).then(res => {
                        var restaurants = res.data;
                        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                        // 调用 callback 返回建议列表的数据
                        cb(results);
                    })
                }
            },
            createFilter_customer(queryString) {
                return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.cas.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            add_note() {
                this.note = true
                this.new_note.note = ''
                this.fileList = []
                this.new_note.contract_id = this.addContract.id
            },
            destroyNote(row) {
                contractNoteDestroy(row, this)
            },
            onSubmit() {
                this.$refs.upload.submit();
            },

            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.$i18n.locale=='cn'?this.$message.warning("当前限制选择5个文件"):this.$message.warning("Current limit of 5 files")
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    });
                    this.fetchData(this.id)
                    this.note = false
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            handleRemove() {

            },
            beforeRemove(file, fileList) {
                return this.$i18n.locale=='cn'?this.$confirm(`确定移除 ${file.name}？`):this.$confirm(`Confirm removal ${file.name}？`)
            },
            supplyMethod(query) {
                if (query !== "") {
                    this.supplyloading = true;
                    setTimeout(() => {
                        this.supplyloading = false;
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            supplyChange() {
                this.addContract.supplier_id = this.supply_list.filter(item => {
                    return item.name == this.addContract.supplier_name;
                })[0].id;
            },
            hand_account() {
                this.play = true;
            },
            noticeClose(even) {
                this.play = even;
            },
            close() {
                var that = this
                that.$router.push({
                    path: "/sales/sales",
                    name: "sales-sales"
                });
                var tagName = 'sales-costApplication'
                that.closeAdd({tagName})
            },
            addNote() {
                this.new_note.contract_id = this.addContract.id;
                this.$refs.upload.submit();
            },
            save_apply_form(){
                var tagName = 'finance-return_money_detail'
                refund_money_do(this.id,this.apply_form,this,tagName)
            },
        }
    };
</script>

