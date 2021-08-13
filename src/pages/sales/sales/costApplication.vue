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
        table{
            width: 100%;
        }
        .el-form-item__content{
            width: 100%;
        }
    }

    .from-item {
        width: 100%;
        overflow: auto;
        flex-wrap: wrap;
        table {
            width: 100%;
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
                                    <!-- <el-select
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
                                    </el-select> -->
                                    {{addContract.customer_name}}
                                    <span style="margin-left:5px;color:red;" v-if="addContract.customer_name2&&(addContract.customer_name2!=addContract.customer_name)">{{'('+addContract.customer_name2+')'}}</span>
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
                                    <!-- <el-select filterable v-model="addContract.corp_name"   size="small">
                                        <el-option
                                                v-for="item in corp_List"
                                                :label="item.name"
                                                :key="item.id"
                                                :value="item.id"
                                        ></el-option>
                                    </el-select> -->
                                    {{addContract.corp_name}}
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
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th>{{$t('sale.add.sale156')}}</th><!-- 备注内容 -->
                                <th>{{$t('sale.add.sale157')}}</th><!-- 备注人 -->
                                <th>{{$t('sale.add.sale108')}}</th><!-- 时间 -->
                                <th>{{$t('sale.add.sale158')}}</th><!-- 文件 -->
                                <th class="d2-text-center">
                                    <el-button size="mini" @click="add_note" type="primary">+</el-button>
                                </th>
                            </tr>
                            <tr  v-for="item in addContract.contract_note">
                                <td>{{item.note}}</td>
                                <td>{{item.user.name}}</td>
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
                <!-- 申请历史 -->
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale159')}}</b><!-- 申请历史 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show2" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th>ID</th>
                                <th>{{$t('sale.add.sale160')}}</th><!-- 申请时间 -->
                                <th>{{$t('sale.add.sale161')}}</th><!-- 费用类型 -->
                                <th>{{$t('sale.add.sale22')}}</th><!-- 金额 -->
                                <th>{{$t('sale.add.sale143')}}</th><!-- 收款人 -->
                                <th>{{$t('sale.add.sale162')}}</th><!-- 收款银行 -->
                                <th>{{$t('sale.add.sale163')}}</th><!-- 收款账号 -->
                                <th>{{$t('sale.add.sale105')}}</th><!-- 审核状态 -->
                                <th>{{$t('sale.add.sale91')}}</th><!-- 状态 -->
                                <th>{{$t('sale.add.sale164')}}</th><!-- 申请人 -->
                                <th>{{$t('sale.add.sale80')}}</th><!-- 操作 -->
                            </tr>
                            <tr v-for="item in addContract.fee_apply">
                                <td>{{item.id}}</td>
                                <td>{{item.createdate}}</td>
                                <td>{{item.fee_type_info_name}}</td>
                                <td>{{item.amount}}</td>
                                <td>{{item.receiver}}</td>
                                <td>{{item.bank}}</td>
                                <td>{{item.bank_account}}</td>
                                <td>{{fee_apply_check_status[item.check_status].name}}</td>
                                <td>{{fee_apply_status[item.status].name}}</td>
                                <td>{{item.user.name}}</td>
                                <td class="d2-text-center">
                                    <el-button v-if="item.check_status==0&&item.status==0" @click="cancel(item.id)" type="danger" size="mini">{{$t('cancel')}}</el-button><!-- 取消 -->
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale165')}}</td><!-- 申请合计： -->
                                <td colspan="2">
                                    {{total_application_info_name}}
                                </td>
                                <td colspan="8">
                                    {{payment_info_name}}
                                </td>
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
                        <el-form-item :label="$t('sale.add.sale161')" :required="true"><!-- 费用类型 -->
                            <el-select v-model="apply_form.fee_type" name="pay_way" size="mini">
                                <el-option
                                        v-for="(item,index) in fee_type_info"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('sale.add.sale22')" :required="true"><!-- 金额 -->
                            <el-input v-model="apply_form.amount" style="width:200px;margin-right:10px;"
                                      size="mini"></el-input>
                            <el-select v-model="apply_form.currency_id" name="pay_way" size="mini">
                                <el-option
                                        v-for="(item,index) in currencys"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div style="display:flex;">
                            <el-form-item :label="$t('sale.add.sale167')"><!-- 收款公司 -->
                                <el-select
                                        v-model="customer_id"
                                        filterable
                                        clearable
                                        remote
                                        size="mini"
                                        reserve-keyword
                                        :remote-method="remoteMethod"
                                        :loading="loading"
                                        @change="handleSelect_customer(customer_id)"
                                        style="width: 200px;"
                                >
                                    <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
                                </el-select>
                                <!--<el-autocomplete-->
                                        <!--v-model="customer_name"-->
                                        <!--:fetch-suggestions="querySearchAsync_customer"-->
                                        <!--@select="handleSelect_customer"-->
                                        <!--style="width: 100%;"-->
                                        <!--size="small"-->
                                <!--&gt;-->
                                    <!--<template slot-scope="{ item }">-->
                                        <!--<div class="mac">{{ item.name }}</div>-->
                                    <!--</template>-->
                                <!--</el-autocomplete>-->
                            </el-form-item>
                            <el-form-item :label="$t('sale.add.sale162')" :required="true"><!-- 收款银行 -->
                                <el-input v-model="apply_form.bank" style="width:410px;margin-right:20px;"
                                          size="mini"></el-input>
                                <!--<el-button type="primary" size="mini" @click="hand_account()">收款账号</el-button>-->
                            </el-form-item>
                        </div>
                        <el-form-item :label="$t('sale.add.sale143')" :required="true"><!-- 收款人 -->
                            <el-input v-model="apply_form.receiver" style="width:410px;" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('sale.add.sale162')"><!-- 收款银行 -->
                            <el-input v-model="apply_form.bank" style="width:410px;" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('sale.add.sale163')" :required="true"><!-- 收款账号 -->
                            <el-input v-model="apply_form.bank_account" style="width:410px;" size="mini"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('sale.add.sale146')" :required="true"><!-- 支付方式 -->
                            <el-select v-model="apply_form.pay_type" name="pay_way" size="mini">
                                <el-option
                                        v-for="(item,index) in pay_type_info"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="$t('sale.add.sale59')"><!-- 备注 -->
                            <el-input v-model="apply_form.check_remark" type="textarea" :rows="3"
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
        fee_application_view,
        fee_application_save,
        cancle_fee_application,
        contractNoteCreate,
        contractNoteDestroy,
        customer_lists,
        member_bank_accounts
    } from "@/api/sale";
    import util from '@/libs/util'
    import { mapActions } from 'vuex'
    export default {
        name: 'sales-costApplication',
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
                    contract_id:'',
                    contract_number:'',
                    type:1,
                    fee_type: '',
                    amount: '',
                    currency_id: '',
                    bank: '',
                    receiver: '',
                    bank_account_id: '',
                    bank_account: '',
                    pay_type: 1,
                    check_remark: ''
                },
                new_note: {
                    contract_id: "",
                    note: "",
                    type: 1
                },
                upload_api: process.env.VUE_APP_API + 'api/v1/contractNoteCreate',
                loading:false,
                customer:[],
                fileList:[]
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
                if (to.name=='sales-costApplication') {
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
                    contract_id:'',
                    contract_number:'',
                    type:1,
                    fee_type: '',
                    amount: '',
                    currency_id: '',
                    bank: '',
                    receiver: '',
                    bank_account_id: '',
                    bank_account: '',
                    pay_type: 1,
                    check_remark: ''
                }
                fee_application_view(id).then(res => {
                    res.data.info.fee_apply.forEach((item, index) => {
                        res.enum.fee_type_info.forEach((m, n) => {
                            if (item.id == m.id) {
                                item.fee_type_info_name = m.name
                            }
                        })
                    })
                    res.data.paid_info.forEach((m, n) => {
                        res.enum.is_paid_info.forEach((x, y) => {
                            res.enum.currencys.forEach((i, j) => {
                                if (m.status == x.id) {
                                    if (m.currency_id == i.id) {
                                        this.payment_info_name += x.name_cn + ':' + i.val + m.amount + ','
                                    }
                                }
                            })
                        })
                    })
                    res.data.total_application_info.forEach((m, n) => {
                        res.enum.currencys.forEach((i, j) => {
                            if (m.currency_id == i.id) {
                                this.total_application_info_name += i.val + m.amount + ','
                            }
                        })
                    })
                    this.apply_form.contract_id=res.data.info.id
                    this.apply_form.contract_number=res.data.info.contract_number
                    this.addContract = res.data.info
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
            handleSelect_customer(id) {
                this.customer_name = this.customer.filter(i=>{return id==i.id})[0].name
                member_bank_accounts(id).then((res) => {
                    if(res.data.length>0){
                        this.apply_form.bank = res.data[0].opening_bank
                        this.apply_form.receiver = res.data[0].payee
                        this.apply_form.bank_account = res.data[0].bank_account_number
                        this.apply_form.bank_account_id=res.data[0].id
                        this.apply_form.check_remark = res.data[0].remark
                    }
                })
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
                let  that=this
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
                var tagName = 'sales-costApplication'
                fee_application_save(this.id,this.apply_form,this,tagName)
            },
        }
    };
</script>

