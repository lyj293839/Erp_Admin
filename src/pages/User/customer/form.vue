<style lang="scss" scoped type="text/scss">
    p{
        height: 20px;
        line-height: 20px;
    }
    .bold {
        font-weight: bold;
    }

    .grey {
        color: grey;
    }

    .l_h {
        line-height: 1.5;
    }

    .l_h80 {
        line-height: 86px;
    }

    .el-pagination {
        text-align: right;
        margin: 30px;
    }

    .d2-text-center {
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }

    .border-right {
        border-right: 1px solid #f2f2f2;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0;
    }

    .options {
        justify-content: center;
    }

    .options div {
        width: 33%;
        text-align: center;
    }

    .item1 {
        margin-bottom: 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        /*width: 400px;*/
        width: 31%;
        margin: 10px 0;
        box-sizing: border-box;
    }

    .el-main {
        padding: 0;
    }

    .el-card__body {
        padding: 10px;
    }

    .basis {
        padding: 10px;
    }

    .basis .el-card__header {
        background-color: rgba(250, 250, 250, 1);
    }

    .logo {
        width: 100px;
        height: 100px;
        background-color: rgba(246, 246, 246, 1);
    }

    .logo i {
        font-size: 30px;
        margin: 45px;
    }

    p {
        margin: 5px 0;
    }

    .customWidth {
        width: 70%;
    }

    .level {
        width: 40px;
        height: 30px;
        line-height: 30px;
        margin: 0 15px;
        background-color: yellow;
        text-align: center;
        box-shadow: 0 2px 12px 2px rgba(0, 0, 0, .1);;
    }

    .check {
        width: 30px;
        height: 30px;
        margin: 5px 20px;
    }

    .level span {
        display: inline-block !important;
        width: 100% !important;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .logo i {
        margin: 20px;
    }
</style>
<style lang="scss" type="text/scss">
    .el-tooltip span {
        display: inline-block !important;
        width: 100% !important;
    }

    .el-switch__label--left {
        position: relative;
        left: 46px;
        color: #fff;
        z-index: -1111;
    }

    .el-switch__label--right {
        position: relative;
        right: 46px;
        color: #fff;
        z-index: -1111;
    }

    .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
    }

    .el-switch__label--left.is-active {
        z-index: 1111;
        color: #9c9c9c !important;
    }

    .el-pagination {
        text-align: right;
    }
</style>
<template>
    <d2-container>
        <!--基础信息 开始-->
        <el-card class="box-card basis" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_basis" class="el-icon-caret-bottom"></i>{{$t('user.customer.basis.basis')}}
                <el-button style="float: right;" type="primary" size="mini" @click="back">
                    {{$t('back')}}
                </el-button>
            </div>
            <div class="item1">
                <div class="d2-m-10" style="width: 140px;">
                    <p><span style="color:red;">*</span>{{$t('user.customer.basis.name')}}</p>
                    <el-input v-model="basis.name" size="mini" placeholder="Please Write"></el-input>
                </div>
                <div class="d2-m-10" style="width: 140px;">
                    <p>{{$t('user.customer.basis.english_name')}}</p>
                    <el-input v-model="basis.english_name" size="mini"
                              placeholder="Please Write"></el-input>
                </div>
                <div class="d2-m-10" style="width: 130px;">
                    <p><span style="color:red;">*</span>{{$t('user.customer.basis.country_code')}}</p>
                    <el-select v-model="basis.country_code" filterable size="mini"
                               placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in country"
                                :key="index"
                                :label="item.Name"
                                :value="item.Code">
                        </el-option>
                    </el-select>
                </div>
                <div class="d2-m-10" style="width: 130px;">
                    <p>{{$t('user.customer.basis.sort')}}</p>
                    <el-select v-model="basis.sort" @change="change_sort(basis.sort)" size="mini"
                               placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in sort_info"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="d2-m-10" style="width: 130px;">
                    <p>客户类别</p>
                    <el-select v-model="basis.customer_type" size="mini" @change="select_customer(basis.customer_type)" placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in customer_type_info"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="d2-m-10" style="width: 130px;">
                    <p>{{$t('user.customer.basis.pay_way')}}</p>
                    <el-select v-model="basis.payment_day_id" size="mini" placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in payment_day_info"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="d2-m-10" style="width: 130px;">
                    <p>{{$t('user.customer.basis.business_mode_id')}}</p>
                    <el-select v-model="basis.business_mode_id" size="mini"
                               placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in business_modes"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="d2-m-10" style="width: 130px;">
                    <p>{{$t('user.customer.basis.level_id')}}</p>
                    <el-select v-model="basis.level_id" size="mini" placeholder="Please Select">
                        <el-option
                                v-for="(item,index) in levels"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="personal" class="d2-m-10" style="width: 200px;">
                    <p>{{$t('user.customer.basis.pid')}}</p>
                    <el-select
                            v-model="basis.pid"
                            filterable
                            clearable
                            remote
                            reserve-keyword
                            :remote-method="supplyMethod"
                            :loading="supplyloading"
                            style="width:100%;"
                            size="mini"
                            placeholder="请输入关键词"
                    >
                        <el-option
                                v-for="item in parent_company"
                                :label="item.name"
                                :key="item.id"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="d2-m-10" style="width: 200px;">
                    <p style="padding-bottom:5px;"><span style="color:red;">*</span> 是否自动发货</p>
                    <el-radio-group v-model="basis.if_auto_delivery" size="small">
                        <el-radio :label="1">自动</el-radio>
                        <el-radio :label="0">不自动</el-radio>
                    </el-radio-group>
                </div>
                <div class="d2-m-10" style="width: 400px;">
                    <p>{{$t('user.customer.basis.remark')}}</p>
                    <el-input type="textarea" :rows="4" v-model="basis.remark"
                              placeholder="Please Write"></el-input>
                </div>
                <div v-if="personal" class="d2-m-10" style="width: 140px;">
                    <p>Logo</p>
                    <div class="logo">
                        <el-upload
                                name="logo"
                                class="avatar-uploader"
                                :action=upload_api
                                :headers=headers
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
            </div>
            <div class="d2-mt-10">
                <el-button type="primary" size="mini" name="save" :loading='basis.loading?true:false'
                           @click="save_basis">{{$t('save')}}
                </el-button>
            </div>
        </el-card>
        <!--基础信息 结束-->

        <!--联系人 开始-->
        <el-card class="box-card contracts" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_contracts" class="el-icon-caret-bottom"></i>{{$t('user.customer.contracts.contracts')}}
                <el-button style="float: right;" type="primary" name="add" size="mini" @click="add_contracts">
                    {{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in contracts.data"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.contracts.name')}}</p>
                        <el-input v-model="item.name" size="mini" placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.phone')}}</p>
                        <el-input v-model="item.phone"  size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.email')}}</p>
                        <el-input v-model="item.email" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.mobile')}}</p>
                        <el-input v-model="item.mobile"  size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.fax')}}</p>
                        <el-input v-model="item.fax" size="mini" placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>Skype</p>
                        <el-input v-model="item.skype" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>QQ</p>
                        <el-input v-model="item.qq" size="mini" placeholder="Please Write"></el-input>
                    </div>
                    <!-- <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.user_type')}}</p>
                        <el-select v-model="item.user_type" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in user_type"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div> -->
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.remark')}}</p>
                        <el-input v-model="item.remark" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.contracts.tag')}}</p>
                        <el-input v-model="item.tag" size="mini" placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.contracts.is_default')}}:</span>
                        <el-switch
                                name="is_default"
                                v-model="item.is_default"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="save" :loading="item.loading?true:false"
                                   @click="save_contracts(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" name="delete" size="mini" @click="delete_contracts(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange_contracts"
                    :current-page.sync="currentPage_contracts"
                    layout="prev, pager, next"
                    :page-size="contracts.per_page"
                    :total="contracts.total">
            </el-pagination>
        </el-card>
        <!--联系人 结束-->

        <!--开票信息 开始-->
        <el-card class="box-card invoice" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_invoice" class="el-icon-caret-bottom"></i>{{$t('user.customer.invoice.invoice')}}
                <el-button style="float: right;" type="primary" size="mini" name="add" @click="add_invoice">
                    {{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in invoice"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.invoice.company_name')}}</p>
                        <el-input v-model="item.company_name" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.invoice.duty_paragraph')}}</p>
                        <el-input v-model="item.duty_paragraph" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 180px;">
                        <p>{{$t('user.customer.invoice.address')}}</p>
                        <el-input v-model="item.address" size="mini" type="textarea"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.invoice.mobile')}}</p>
                        <el-input v-model="item.mobile" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.invoice.opening_bank')}}</p>
                        <el-input v-model="item.opening_bank" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.invoice.bank_account_number')}}</p>
                        <el-input v-model="item.bank_account_number" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <!-- <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.invoice.user_type')}}</p>
                        <el-select v-model="item.user_type" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in user_type"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div> -->
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.invoice.is_default')}}:</span>
                        <el-switch
                                name="is_default"
                                v-model="item.is_default"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="add" @click="save_invoice(item)">{{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" name="delete" @click="delete_invoice(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <!--开票信息 结束-->

        <!--公式 开始-->
        <el-card class="box-card formula" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_formula" class="el-icon-caret-bottom"></i>{{$t('user.customer.formula.formula')}}
                <el-button style="float: right;" type="primary" name="add" size="mini" @click="add_formula">
                    {{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in formula"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 200px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.formula.formula')}}</p>
                        <el-input v-model="item.formula" size="mini"
                                  placeholder="例如p*6+10"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 200px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.formula.formula_type_id')}}</p>
                        <el-select v-model="item.formula_type_id" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in formula_type"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.formula.status')}}:</span>
                        <el-switch
                                name="status"
                                v-model="item.status"
                                :active-value="1"
                                :inactive-value="2"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="save" @click="save_formula(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" name="delete" @click="delete_formula(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <!--公式 结束-->

        <!--额度 开始-->
        <el-card class="box-card quota" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_quota" class="el-icon-caret-bottom"></i>{{$t('user.customer.quota.quota')}}
            </div>
            <div v-for="(item,index) in account"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.quota.quota')}}</p>
                        <el-input v-model="item.quota" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.quota.currency_id')}}</p>
                        <el-select v-model="item.currency_id" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in currencys"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.quota.status')}}:</span>
                        <el-switch
                                name="status"
                                v-model="item.status"
                                :active-value="1"
                                :inactive-value="2"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="save" @click="save_account(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" name="delete" @click="delete_account(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <!--额度 结束-->

        <!--账户 开始-->
        <el-card class="box-card account" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_account" class="el-icon-caret-bottom"></i>{{$t('user.customer.bank_accouts.account')}}
                <el-button style="float: right;" type="primary" name="add" size="mini" @click="add_bank_accouts">
                    {{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in bank_accouts"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.bank_accouts.type')}}</p>
                        <el-select v-model="item.type"  size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in bank_account_type_info"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.bank_accouts.country_code')}}</p>
                        <el-select v-model="item.country_code" filterable
                                   @change="selected_country(item)"
                                   size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in country"
                                    :key="index"
                                    :label="i.Name"
                                    :value="i.Code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.bank_accouts.province_code')}}</p>
                        <el-select v-model="item.province_code" filterable
                                   @change="selected_province(item)"
                                   size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in item.province"
                                    :key="index"
                                    :label="i.province_code"
                                    :value="i.province_code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.bank_accouts.city_id')}}</p>
                        <el-select v-model="item.city_id" filterable
                                   size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in item.city"
                                    :key="index"
                                    :label="i.Name"
                                    :value="i.ID">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.bank_accouts.opening_bank')}}</p>
                        <el-input v-model="item.opening_bank" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.bank_accouts.payee')}}</p>
                        <el-input v-model="item.payee" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.bank_accouts.bank_account_number')}}</p>
                        <el-input v-model="item.bank_account_number"  size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.bank_accouts.remark')}}</p>
                        <el-input v-model="item.remark" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.bank_accouts.is_default')}}:</span>
                        <el-switch
                                name="status"
                                v-model="item.is_default"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="save" @click="save_bank_account(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" name="delete" @click="delete_bank_account(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <!--账户 结束-->

        <!--发货 开始-->
        <el-card class="box-card deliver" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_deliver" class="el-icon-caret-bottom"></i>{{$t('user.customer.deliver.deliver')}}
                <el-button style="float: right;" type="primary" size="mini" @click="add_deliver">{{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in deliver_good"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.deliver.express_company_id')}}</p>
                        <el-select v-model="item.express_company_id" size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in express_company"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.deliver.accounts')}}</p>
                        <el-input v-model="item.accounts" size="mini" placeholder="Please Write"></el-input>
                    </div>
                    <!--<div class="d2-m-10 l_h80">-->
                    <!--<span>{{$t('user.customer.deliver.is_straight_hair')}}:</span>-->
                    <!--<el-switch-->
                    <!--v-model="item.is_straight_hair"-->
                    <!--:active-value="1"-->
                    <!--:inactive-value="2"-->
                    <!--active-text="开"-->
                    <!--inactive-text="关">-->
                    <!--</el-switch>-->
                    <!--</div>-->
                    <div style="width: 100px;display:flex;justify-content: center;align-items: center;">
                        <span>状态：</span>
                        <span>
                                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
                            </span>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" @click="save_deliver(item)">{{$t('save')}}</el-button>
                        <el-button type="danger" size="mini" @click="delete_deliver(item,index)">
                            {{item.deleted_at?'启用':'作废'}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <!--发货 结束-->

        <!--负责人 开始-->
        <el-card class="box-card responsible" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_responsible" class="el-icon-caret-bottom"></i>{{$t('user.customer.responsible.responsible')}}
            </div>
            <div v-for="(item,index) in responsible_person"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.responsible.duty_user_id')}}</p>
                        <el-select v-model="item.duty_user_id"  filterable size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in user_lists"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{item.name}}</span>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="save" @click="save_responsible(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" @click="delete_responsible(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <!--负责人 结束-->

        <!--收票地址 开始-->
        <el-card class="box-card receive" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_receive" class="el-icon-caret-bottom"></i>{{$t('user.customer.receive.receive')}}
                <el-button style="float: right;" type="primary" size="mini" name="add" @click="add_receive">
                    {{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in receive_address.data"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.receive.country_code')}}</p>
                        <el-select v-model="item.country_code" filterable clearable
                                   @change="selected_country_address(item)"
                                   size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in country"
                                    :key="index"
                                    :label="i.Name"
                                    :value="i.Code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.receive.city_id')}}</p>
                        <el-select v-model="item.city_id"  filterable size="mini" clearable
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in item.city"
                                    :key="index"
                                    :label="i.Name"
                                    :value="i.ID">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 180px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive.address')}}</p>
                        <el-input v-model="item.address" size="mini" type="textarea"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive.contact_name')}}</p>
                        <el-input v-model="item.contact_name" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive.mobile')}}</p>
                        <el-input v-model="item.mobile" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.receive.email')}}</p>
                        <el-input v-model="item.email" size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <!-- <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive.user_type')}}</p>
                        <el-select v-model="item.user_type" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in user_type"
                                    :key="item.index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div> -->
                    <div class="d2-m-10 l_h80">
                        <span>状态:</span>
                        <span>
                                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
                            </span>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.receive.is_default')}}:</span>
                        <el-switch
                                name="is_default"
                                v-model="item.is_default"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" name="save" @click="save_receive(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" @click="delete_receive(item,index)">
                            {{item.deleted_at?'启用':'作废'}}
                        </el-button>
                    </div>
                </div>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange_receive_address"
                    :current-page.sync="currentPage_receive_address"
                    layout="prev, pager, next"
                    :page-size="receive_address.per_page"
                    :total="receive_address.total">
            </el-pagination>
        </el-card>
        <!--收票地址 结束-->

        <!--收货地址 开始-->
        <el-card class="box-card receive_good" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_receive_good" class="el-icon-caret-bottom"></i>{{$t('user.customer.receive_good.receive_good')}}
                <el-button style="float: right;" type="primary" size="mini" name="add" @click="add_receive_good">
                    {{$t('add')}}
                </el-button>
            </div>
            <div v-for="(item,index) in receive_good_address.data"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.receive_good.country_code')}}</p>
                        <el-select v-model="item.country_code"  filterable clearable
                                   @change="selected_country_address(item)"
                                   size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in country"
                                    :key="index"
                                    :label="i.Name"
                                    :value="i.Code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.receive_good.city_id')}}</p>
                        <el-select v-model="item.city_id" filterable size="mini" clearable
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in item.city"
                                    :key="index"
                                    :label="i.Name"
                                    :value="i.ID">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 180px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.address')}}</p>
                        <el-input v-model="item.address" size="mini" type="textarea"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.contact_name')}}</p>
                        <el-input v-model="item.contact_name"  size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.mobile')}}</p>
                        <el-input v-model="item.mobile"  size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.customer.receive_good.email')}}</p>
                        <el-input v-model="item.email"  size="mini"
                                  placeholder="Please Write"></el-input>
                    </div>
                    <!-- <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.user_type')}}</p>
                        <el-select v-model="item.user_type" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in user_type"
                                    :key="item.index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div> -->
                    <div class="d2-m-10 l_h80">
                        <span>状态:</span>
                        <span>
                                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
                            </span>
                    </div>
                    <div class="d2-m-10 l_h80">
                        <span>{{$t('user.customer.receive_good.is_default')}}:</span>
                        <el-switch
                                name="is_default"
                                v-model="item.is_default"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" @click="save_receive_good(item)">
                            {{$t('save')}}
                        </el-button>
                        <el-button type="danger" size="mini" @click="delete_receive_good(item,index)">
                            {{item.deleted_at?'启用':'作废'}}
                        </el-button>
                    </div>
                </div>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange_receive_good"
                    :current-page.sync="currentPage_receive_good"
                    layout="prev, pager, next"
                    :page-size="receive_good_address.per_page"
                    :total="receive_good_address.total">
            </el-pagination>
        </el-card>
        <!--收货地址 结束-->
    </d2-container>
</template>

<script>
    import {
        lists,
        create,
        edit,
        update,
        update_responsible,
        destroy,
        country_list,
        province_list,
        city_list,
        member_company,
        get_receive_address,
        get_member_contact
    } from '@/api/user'
    import $ from 'jquery'
    import util from '@/libs/util'
    import axios from 'axios'
    import { mapState, mapActions } from "vuex";

    export default {
        name: "User-customerForm",
        data() {
            return {
                personal: true,
                query_address:{
                    type:'',
                    member_id:'',
                    page:''
                },
                query_good:{
                    type:'',
                    member_id:'',
                    page:''
                },
                query_contact:{
                    member_id:'',
                    page:''
                },
                currentPage_receive_address:1,
                currentPage_receive_good:1,
                currentPage_contracts:1,
                member_id: '',
                input: '',
                imageUrl: '',
                upload_api: process.env.VUE_APP_API + 'api/v1/customer/logo',
                create: false,
                //基础信息
                payment_day_info: [],
                business_modes: [],
                customer_type_info:[],
                levels: [],
                product_sort: [],
                sort_info: [],
                type_info: [],
                parent_company: [],
                basis: {
                    name: '',
                    english_name: '',
                    country_code: '',
                    // custmoer_type:'',
                    customer_type:'',
                    payment_day_id: '',
                    level_id: '',
                    pid: '',
                    product_sorts: '',
                    business_mode_id: '',
                    type: 1,
                    sort: '',
                    logo: '',
                    remark: '',
                    loading: false,
                    if_auto_delivery:''
                },
                payment_day_info_:{},
                //联系人
                contracts: {},
                //开票信息
                invoice: [{
                    company_name: '',
                    duty_paragraph: '',
                    address: '',
                    mobile: '',
                    opening_bank: '',
                    bank_account_number: '',
                    is_default: 0,
                    // user_type: 101,
                    member_id: ''
                }],
                //公式
                formula: [{
                    formula: '',
                    formula_type_id: '',
                    status: true,
                    member_id: ''
                }],
                formula_type: [],
                //额度
                account: [{
                    quota: '',
                    currency_id: '',
                    status: false,
                    member_id: ''
                }],
                currencys: [],
                //账户
                bank_accouts: [{
                    user_id:'',
                    member_id:'',
                    province:[],
                    city:[],
                    country_code: '',
                    province_code: '',
                    city_id: '',
                    type: '',
                    opening_bank: '',
                    payee: '',
                    bank_account_number: '',
                    remark: '',
                    is_default: 0,
                }],
                bank_account_type_info:[],
                user_id:'',
                //发货
                deliver_good: [{
                    express_company_id: '',
                    accounts: '',
                    is_straight_hair: false,
                    member_id: ''
                }],
                express_company: [],
                //负责人
                responsible_level:[],
                responsible_person: [],
                user_lists: [],
                user_lists2: [],
                //收票地址
                receive_address: {data:[]},
                //收货地址
                receive_good_address: {},
                country: [],
                user_type: [],
                restaurants: [],
                state4: '',
                timeout: null,
                supplyloading:false,
                query_id:''
            }
        },
        created() {
            if(this.$route.query.id){
                this.fetchData()
                this.edit_refresh(this.$route.query.id)
            }else{
                this.fetchData()
            }
        },
        watch: {
            $route(to) {
                if(to.name=='User-customerForm'){
                    this.query_id=this.$route.query.id
                }
            },
            query_id(newVlaue,oldVlaue){
                if(newVlaue!=oldVlaue){
                    this.fetchData()
                    this.edit_refresh(this.$route.query.id)
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
            supplyMethod(query) {
                if (query !== "") {
                    setTimeout(() => {
                        member_company(query,'2',this.member_id).then(res => {
                            this.parent_company = res.data;
                        });
                    }, 200);
                } else {
                    this.parent_company = [];
                }
            },
            back(){
                let  that=this
                that.$router.push({
                    path: "/User/customer",
                    name: "User-customer",
                });
                var tagName = 'User-customerForm'
                that.closeAdd({tagName})
            },
            fetchData() {
                // lists(this.queryList, 'customer').then(res => {
                //     if (res && res.code == 0) {
                //         this.customer_type_info = res.enum.customer_type_info;
                //         this.payment_day_info_ = res.enum.payment_day_info;
                //         this.business_modes = res.enum.business_modes;
                //         this.currencys = res.enum.currencys;
                //         this.formula_type = res.enum.formula_type;
                //         this.levels = res.enum.levels;
                //         this.product_sort = res.enum.product_sorts;
                //         this.sort_info = res.enum.sort_info;
                //         this.type_info = res.enum.type_info;
                //         this.user_type = res.enum.user_type;
                //         res.enum.responsible_level.forEach((item,index)=>{
                //             item.duty_user_id=''
                //             item.responsible_level_id=item.id
                //             item.member_id=''
                //             item.id=''
                //         })
                //         this.responsible_level = res.enum.responsible_level;
                //         this.responsible_person = res.enum.responsible_level;
                //         this.express_company = res.enum.express_company;
                //         this.bank_account_type_info=res.enum.bank_account_type_info
                //         this.basis.sort=1
                //     }
                // })
                country_list().then(res => {
                    this.country = res.data;
                })
                let query_list = {
                    user_type: 102
                }
                lists(query_list, 'data/user_list').then(res => {
                    this.user_lists = res.data
                })
                lists(query_list, 'data/user_list').then(res => {
                    this.user_lists2 = res.data
                })

            },
            change_sort(sort) {
                if (sort == 2) {
                    this.personal = false
                } else {
                    this.personal = true
                }
            },
            edit_refresh(id) {
                edit('customer', id).then(res => {
                    this.customer_type_info = res.enum.customer_type_info;
                    this.payment_day_info_ = res.enum.payment_day_info;
                    this.business_modes = res.enum.business_modes;
                    this.currencys = res.enum.currencys;
                    this.formula_type = res.enum.formula_type;
                    this.levels = res.enum.levels;
                    this.product_sort = res.enum.product_sorts;
                    this.sort_info = res.enum.sort_info;
                    this.type_info = res.enum.type_info;
                    this.user_type = res.enum.user_type;
                    res.enum.responsible_level.forEach((item,index)=>{
                        item.duty_user_id=''
                        item.responsible_level_id=item.id
                        item.member_id=''
                        item.id=''
                    })
                    this.responsible_level = res.enum.responsible_level;
                    this.responsible_person = res.enum.responsible_level;
                    this.express_company = res.enum.express_company;
                    this.bank_account_type_info=res.enum.bank_account_type_info
                    this.basis.sort=1
                    //
                    this.member_id = res.data.id;
                    this.user_id=res.data.user_id;
                    if(res.data.parent){
                        this.parent_company=[{
                            id: res.data.parent.id,
                            name: res.data.parent.name
                        }]
                    }
                    this.basis = {
                        id:res.data.id,
                        name:res.data.name,
                        customer_type:res.data.customer_type,
                        english_name:res.data.english_name,
                        country_code:res.data.country_code,
                        payment_day_id:res.data.payment_day_id,
                        level_id:res.data.level_id,
                        pid:res.data.pid == 0 ? '' : res.data.pid,
                        product_sorts:res.data.product_sorts,
                        business_mode_id:res.data.business_mode_id,
                        type:res.data.type,
                        sort:res.data.sort,
                        logo:res.data.logo,
                        remark:res.data.remark,
                        if_auto_delivery:res.data.if_auto_delivery
                    }
                    this.payment_day_info=this.payment_day_info_[res.data.customer_type]
                    this.imageUrl = res.data.logo;
                    this.personal = this.basis.sort == 2 ? false : true
                    this.loading = false
                    // res.data.contacts.forEach((items, index) => {
                    //     items.loading = false
                    // })
                    res.data.invoices.forEach((items, index) => {
                        items.loading = false
                    })
                    res.data.prices_formulas.forEach((items, index) => {
                        items.loading = false
                    })
                    res.data.accouts.forEach((items, index) => {
                        items.loading = false
                    })
                    res.data.deliver_goods.forEach((items, index) => {
                        items.loading = false
                    })
                    res.data.responsible_persons.forEach((items, index) => {
                        items.loading = false
                    })
                    res.data.bank_accouts.forEach((items, index) => {
                        items.loading = false
                    })
                    // res.data.receive_ticket_addresses.forEach((items, index) => {
                    //     items.loading = false
                    // })
                    // res.data.receive_goods_addresses.forEach((items, index) => {
                    //     items.loading = false
                    // })
                    // if(res.data.contacts.length != 0){
                    //     this.contracts = res.data.contacts;
                    // }
                    this.invoice = [{
                        company_name: '',
                        duty_paragraph: '',
                        address: '',
                        mobile: '',
                        opening_bank: '',
                        bank_account_number: '',
                        is_default: 0,
                        // user_type: 101,
                        member_id: ''
                    }]
                    this.formula = [{
                        formula: '',
                        formula_type_id: '',
                        status: true,
                        member_id: ''
                    }]
                    this.account = [{
                        quota: '',
                        currency_id: '',
                        status: false,
                        member_id: ''
                    }]
                    this.deliver_good = [{
                        express_company_id: '',
                        accounts: '',
                        is_straight_hair: false,
                        member_id: ''
                    }]
                    this.bank_accouts = [{
                        user_id:'',
                        member_id:'',
                        province:[],
                        city:[],
                        country_code: '',
                        province_code: '',
                        city_id: '',
                        type: '',
                        opening_bank: '',
                        payee: '',
                        bank_account_number: '',
                        remark: '',
                        is_default: 0,
                    }]
                    if(res.data.invoices.length != 0){
                        this.invoice = res.data.invoices;
                    }
                    if(res.data.prices_formulas.length != 0){
                        this.formula = res.data.prices_formulas;
                    }
                    if(res.data.accouts.length != 0){
                        this.account = res.data.accouts;
                    }
                    if(res.data.deliver_goods.length != 0){
                        this.deliver_good = res.data.deliver_goods;
                    }
                    this.responsible_person=JSON.parse(JSON.stringify(this.responsible_level));
                    if(res.data.responsible_persons.length != 0){
                        res.data.responsible_persons.forEach((item,index)=>{
                            this.responsible_level.forEach((m,n)=> {
                                if(m.responsible_level_id==item.responsible_level_id){
                                    item.name=m.name
                                }
                            })
                        })
                        this.responsible_person.forEach((item,index)=>{
                            res.data.responsible_persons.forEach((m,n)=>{
                                if(item.responsible_level_id==m.responsible_level_id){
                                    this.$set(this.responsible_person,index,res.data.responsible_persons[n])
                                }
                            })
                        })
                    }
                    if(res.data.bank_accouts.length != 0){
                        this.bank_accouts=res.data.bank_accouts;
                        this.bank_accouts.forEach((items, index) => {
                            province_list(items.country_code).then(res => {
                                this.$set(items,'province',res.data);
                                city_list(items.country_code,items.province_code).then(res => {
                                    this.$set(items,'city',res.data);
                                })
                            })

                        })
                    }
                    // if(res.data.receive_ticket_addresses.length != 0){
                    //     this.receive_address=res.data.receive_ticket_addresses
                    //     this.receive_address.forEach((items, index) => {
                    //         if(items.country_code){
                    //             city_list(items.country_code,'').then(res => {
                    //                 this.$set(items,'city',res.data);
                    //             })
                    //         }
                    //     })
                    // }
                    // if(res.data.receive_goods_addresses.length != 0){
                    //     this.receive_good_address=res.data.receive_goods_addresses
                    //     this.receive_good_address.forEach((items, index) => {
                    //         if(items.country_code){
                    //             city_list(items.country_code,'').then(res => {
                    //                 this.$set(items,'city',res.data);
                    //             })
                    //         }
                    //     })
                    // }
                })
                this.receive_address_get()
                this.receive_good_address_get()
                this.member_contact_get()
            },
            receive_address_get(){
                this.query_address.member_id = this.$route.query.id
                this.query_address.type = 1
                get_receive_address(this.query_address).then(res=>{
                    this.receive_address = res.data
                    this.receive_address.per_page = parseInt(res.data.per_page)
                    this.receive_address.data.forEach((items, index) => {
                        if(items.country_code){
                            city_list(items.country_code,'').then(res => {
                                this.$set(items,'city',res.data);
                            })
                        }
                    })
                    if(this.receive_address.data.length==0){
                        this.receive_address.data.push({
                            country_code: '',
                            city_id: '',
                            address: '',
                            contact_name: '',
                            mobile: '',
                            email: '',
                            is_default: 0,
                            user_type: 101,
                            type: 1,
                            member_id: ''
                        })
                    }
                })
            },
            handleCurrentChange_receive_address(page_current) {
                this.query_address.page = this.currentPage_receive_address = page_current;
                this.receive_address_get()
            },
            receive_good_address_get(){
                this.query_good.member_id = this.$route.query.id
                this.query_good.type = 2
                get_receive_address(this.query_good).then(res=>{
                    this.receive_good_address = res.data
                    this.receive_good_address.per_page = parseInt(res.data.per_page)
                    this.receive_good_address.data.forEach((items, index) => {
                        if(items.country_code){
                            city_list(items.country_code,'').then(res => {
                                this.$set(items,'city',res.data);
                            })
                        }
                    })
                    if(this.receive_good_address.data.length==0){
                        this.receive_good_address.data.push({
                            country_code: '',
                            city_id: '',
                            address: '',
                            contact_name: '',
                            mobile: '',
                            email: '',
                            is_default: 0,
                            user_type: 101,
                            type: 2,
                            member_id: ''
                        })
                    }
                })
            },
            handleCurrentChange_receive_good(page_current) {
                this.query_good.page = this.currentPage_receive_good = page_current;
                this.receive_good_address_get()
            },
            member_contact_get(){
                this.query_contact.member_id = this.$route.query.id
                get_member_contact(this.query_contact).then(res=>{
                    this.contracts = res.data
                    this.contracts.per_page = parseInt(res.data.per_page)
                    if(this.contracts.data.length==0){
                        this.contracts.data.push({
                            name: '',
                            phone: '',
                            email: '',
                            mobile: '',
                            fax: '',
                            skype: '',
                            qq: '',
                            remark: '',
                            tag: '',
                            is_default: 0,
                            // user_type: 101,
                            member_id: '',
                            loading: false
                        })
                    }
                })
            },
            handleCurrentChange_contracts(){
                this.query_contact.page = this.currentPage_contracts = page_current;
                this.member_contact_get()
            },
            select_customer(id){
                this.payment_day_info=this.payment_day_info_[id]
                this.basis.payment_day_id = this.payment_day_info[0].id
            },
            selected_country(item) {
                if(item.province_code){
                    item.province_code=''
                }
                if(item.city_id){
                    item.city_id=''
                }
                province_list(item.country_code).then(res => {
                    item.province = res.data;
                })
            },
            selected_country_address(item){
                if(item.city_id){
                    item.city_id=''
                }
                city_list(item.country_code,'').then(res => {
                    this.$set(item,'city',res.data);
                })
            },
            selected_province(item){
                if(item.city_id){
                    item.city_id=''
                }
                city_list(item.country_code,item.province_code).then(res => {
                    item.city = res.data;
                })
            },
            toggle_basis() {
                $('.basis .el-card__body').toggle()
            },
            toggle_contracts() {
                $('.contracts .el-card__body').toggle()
            },
            toggle_invoice() {
                $('.invoice .el-card__body').toggle()
            },
            toggle_formula() {
                $('.formula .el-card__body').toggle()
            },
            toggle_account() {
                $('.formula .el-card__body').toggle()
            },
            toggle_deliver() {
                $('.deliver .el-card__body').toggle()
            },
            toggle_responsible() {
                $('.responsible .el-card__body').toggle()
            },
            toggle_receive() {
                $('.receive .el-card__body').toggle()
            },
            toggle_receive_good() {
                $('.receive_good .el-card__body').toggle()
            },
            toggle_quota() {
                $('.quota .el-card__body').toggle()
            },
            add_bank_accouts(){
                this.bank_accouts.push({
                    user_id:'',
                    member_id:'',
                    province:[],
                    city:[],
                    country_code: '',
                    province_code: '',
                    city_id: '',
                    type: '',
                    opening_bank: '',
                    payee: '',
                    bank_account_number: '',
                    remark: '',
                    is_default: 0,
                })
            },
            add_formula() {
                this.formula.push({
                    formula: '',
                    formula_type_id: '',
                    status: true,
                    member_id: ''
                })
            },
            add_account() {
                this.account.push({
                    quota: '',
                    currency_id: '',
                    status: false,
                    member_id: ''
                })
            },
            add_deliver() {
                this.deliver_good.push({
                    express_company_id: '',
                    accounts: '',
                    is_straight_hair: true,
                    member_id: ''
                })
            },
            add_responsible() {
                this.responsible_person.push({
                    duty_user_id: '',
                    is_first_responsible: '',
                    member_id: ''
                })
            },
            add_receive() {
                this.receive_address.data.unshift({
                    country_code: '',
                    city_id: '',
                    address: '',
                    contact_name: '',
                    mobile: '',
                    email: '',
                    is_default: 0,
                    user_type: 101,
                    type: 1,
                    member_id: ''
                })
            },
            add_receive_good() {
                this.receive_good_address.data.unshift({
                    country_code: '',
                    city_id: '',
                    address: '',
                    contact_name: '',
                    mobile: '',
                    email: '',
                    is_default: 0,
                    user_type: 101,
                    type: 2,
                    member_id: ''
                })
            },
            add_contracts() {
                this.contracts.data.unshift({
                    name: '',
                    phone: '',
                    email: '',
                    mobile: '',
                    fax: '',
                    skype: '',
                    qq: '',
                    remark: '',
                    tag: '',
                    is_default: 0,
                    // user_type: 101,
                    member_id: '',
                    loading: false
                })
            },
            add_invoice() {
                this.invoice.push({
                    company_name: '',
                    duty_paragraph: '',
                    address: '',
                    mobile: '',
                    opening_bank: '',
                    bank_account_number: '',
                    is_default: 0,
                    // user_type: 101,
                    member_id: ''
                })
            },
            save_basis() {
                if (this.basis.pid == '') {
                    this.basis.pid = 0
                }
                if (this.basis.id) {
                    update(this.basis, 'customer', 'update', this)
                } else {
                    create(this.basis, 'customer', 'create', this)
                }
            },
            save_formula(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'prices_formula_update', this)
                } else {
                    create(item, 'customer', 'prices_formula_create', this)
                }
            },
            save_account(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'account_update', this)
                } else {
                    create(item, 'customer', 'account_create', this)
                }
            },
            save_bank_account(item){
                item.user_id = this.user_id
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'bank_account_update', this)
                } else {
                    create(item, 'customer', 'bank_account_create', this)
                }
            },
            save_deliver(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'deliver_good_update', this)
                } else {
                    create(item, 'customer', 'deliver_good_create', this)
                }
            },
            save_responsible(item) {
                item.member_id = this.member_id
                if (item.id!=='') {
                    update_responsible(item, 'customer', 'responsible_person_update', this)
                } else {
                    create(item, 'customer', 'responsible_person_create', this)
                }
            },
            save_receive(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'receive_address_update', this)
                } else {
                    create(item, 'customer', 'receive_address_create', this)
                }
            },
            save_receive_good(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'receive_address_update', this)
                } else {
                    create(item, 'customer', 'receive_address_create', this)
                }
            },
            save_contracts(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'contract_update', this)
                } else {
                    create(item, 'customer', 'contract_create', this)
                }
            },
            save_invoice(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'customer', 'invoice_update', this)
                } else {
                    create(item, 'customer', 'invoice_create', this)
                }
            },
            delete_bank_account(item,index){
                if (item.id) {
                    destroy(item, 'customer', 'bank_account_destory', this)
                } else {
                    this.bank_accouts.splice(index, 1)
                }
            },
            delete_contracts(item, index) {
                if (item.id) {
                    destroy(item, 'customer', 'contract_destory', this)
                } else {
                    this.contracts.data.splice(index, 1)
                }
            },
            delete_formula(item, index) {
                if (item.id) {
                    destroy(item, 'customer', 'prices_formula_destory', this)
                } else {
                    this.formula.splice(index, 1)
                }
            },
            delete_account(item, index) {
                if (item.id) {
                    destroy(item, 'customer', 'account_destory', this)
                } else {
                    this.account.splice(index, 1)
                }
            },
            delete_deliver(item, index) {
                if (item.id) {
                    if(item.deleted_at){
                        item.enabled_state = 1
                    }else{
                        item.enabled_state = 0
                    }
                    var obj = {
                        id:[item.id],
                        enabled_state:item.enabled_state
                    }
                    destroy(obj, 'customer', 'deliver_good_destory', this)
                } else {
                    this.deliver_good.splice(index, 1)
                }
            },
            delete_responsible(item, index) {
                if (item.id) {
                    destroy(item, 'customer', 'responsible_person_destory', this)
                } else {
                    this.responsible_person.splice(index, 1)
                }
            },
            delete_receive(item, index) {
                if (item.id) {
                    if(item.deleted_at){
                        item.enabled_state = 1
                    }else{
                        item.enabled_state = 0
                    }
                    var obj = {
                        id:[item.id],
                        enabled_state:item.enabled_state
                    }
                    destroy(obj, 'customer', 'receive_address_destory', this)
                } else {
                    this.receive_address.data.splice(index, 1)
                }
            },
            delete_receive_good(item, index) {
                if (item.id) {
                    if(item.deleted_at){
                        item.enabled_state = 1
                    }else{
                        item.enabled_state = 0
                    }
                    var obj = {
                        id:[item.id],
                        enabled_state:item.enabled_state
                    }
                    destroy(obj, 'customer', 'receive_address_destory', this)
                } else {
                    this.receive_good_address.data.splice(index, 1)
                }
            },
            delete_invoice(item, index) {
                if (item.id) {
                    destroy(item, 'customer', 'invoice_destory', this)
                } else {
                    this.invoice.splice(index, 1)
                }
            },
            handleAvatarSuccess(res, file) {
                if(file.response.code==0){
                    this.imageUrl = URL.createObjectURL(file.raw);
                    this.basis.logo = res.data
                }else{
                    this.$message.error(file.response.msg);
                }
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            querySearchAsync(queryString, cb) {
                member_company(queryString, this.member_id).then(res => {
                    this.restaurants = res.data;
                    cb(this.restaurants)
                })
            },
        }
    };
</script>
