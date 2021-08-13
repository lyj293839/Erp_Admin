<style lang="scss" scoped type="text/scss">
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
        width: 120px;
        height: 120px;
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
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
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
            <el-card class="box-card basis" style="width: 100%;">
                <div slot="header" class="clearfix" style="">
                    <i @click="toggle_basis" class="el-icon-caret-bottom"></i>{{$t('user.supplier.basis.basis')}}
                    <el-button style="float: right;" type="primary" size="mini" @click="back">{{$t('back')}}</el-button>
                </div>
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p><span style="color:red;">*</span>{{$t('user.supplier.basis.name')}}</p>
                        <el-input v-model="basis.name" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('user.supplier.basis.english_name')}}</p>
                        <el-input v-model="basis.english_name" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 130px;">
                        <p><span style="color:red;">*</span>{{$t('user.supplier.basis.country_code')}}</p>
                        <el-select v-model="basis.country_code" size="mini" filterable placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in country"
                                    :key="item.index"
                                    :label="item.Name"
                                    :value="item.Code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 130px;">
                        <p>{{$t('user.supplier.basis.sort')}}</p>
                        <el-select v-model="basis.sort" size="mini" @change="change_sort(basis.sort)" placeholder="Please Select">
                            <el-option
                                    v-for="item in sorts"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 130px;">
                        <p>{{$t('user.supplier.basis.pay_way')}}</p>
                        <el-select v-model="basis.pay_way" size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="item in pay_ways"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div v-if="personal" class="d2-m-10" style="width: 130px;">
                        <p>{{$t('user.supplier.basis.pid')}}</p>
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
                    <div class="d2-m-10" style="width: 150px;">
                        <p>{{$t('user.supplier.basis.business_mode_id')}}</p>
                        <el-select v-model="basis.business_mode_id" filterable size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in business_modes"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 150px;">
                        <p>{{$t('user.supplier.basis.product_sorts')}}</p>
                        <el-select v-model="basis.product_sorts" filterable size="mini" multiple
                                   placeholder="Please Select">
                            <el-option
                                    v-for="(item,index) in product_sort"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>供应商状态</p>
                        <el-select v-model="basis.supplier_status" size="mini"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="item in supplier_status_info"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 400px;">
                        <p>{{$t('user.supplier.basis.remark')}}</p>
                        <el-input type="textarea" v-model="basis.remark" placeholder="请输入备注"></el-input>
                    </div>
                    <div v-if="personal" class="d2-m-10" style="width: 140px;">
                        <p>Logo</p>
                        <div class="logo">
                            <el-upload
                                    name="logo"
                                    class="avatar-uploader"
                                    :action=upload
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
                    <el-button type="primary" size="mini" :loading='basis.loading?true:false' @click="save_basis">{{$t('save')}}
                    </el-button>
                </div>
            </el-card>
            <el-card class="box-card contracts" style="width: 100%;">
                <div slot="header" class="clearfix" style="">
                    <i @click="toggle_contracts" class="el-icon-caret-bottom"></i>联系人
                    <el-button style="float: right;" type="primary" size="mini" @click="add_contracts">新增</el-button>
                </div>
                <div v-for="(item,index) in contracts"
                     style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                    <div class="item1">
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>名称</p>
                            <el-input v-model="item.name" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>手机</p>
                            <el-input v-model="item.phone" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>邮箱</p>
                            <el-input v-model="item.email" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>固话</p>
                            <el-input v-model="item.mobile" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>传真</p>
                            <el-input v-model="item.fax" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>Skype</p>
                            <el-input v-model="item.skype" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>QQ</p>
                            <el-input v-model="item.qq" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <!-- <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>类型</p>
                            <el-select v-model="item.user_type" size="mini" placeholder="Please Select">
                                <el-option
                                        v-for="item in user_type"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div> -->
                        <div class="d2-m-10" style="width: 140px;">
                            <p>备注</p>
                            <el-input v-model="item.remark" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>标签</p>
                            <el-input v-model="item.tag" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10 l_h80">
                            <span>默认:</span>
                            <el-switch
                                    v-model="item.is_default"
                                    :active-value="1"
                                    :inactive-value="0"
                                    active-text="开"
                                    inactive-text="关">
                            </el-switch>
                        </div>
                        <div class="d2-mt-10 l_h80">
                            <el-button type="primary" size="mini" :loading="item.loading?true:false"
                                       @click="save_contracts(item)">
                                保存
                            </el-button>
                            <el-button type="danger" size="mini" @click="delete_contracts(item,index)">
                                删除
                            </el-button>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card exemption" style="width: 100%;">
                <div slot="header" class="clearfix" style="">
                    <i @click="toogle_exemption" class="el-icon-caret-bottom"></i>{{$t('user.supplier.exemption.exemption')}}
                </div>
                <div v-for="item in exemption_amount"
                     style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                    <div class="item1">
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.supplier.exemption.amount')}}</p>
                            <el-input v-model="item.amount" size="mini" placeholder="请输入"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>{{$t('user.supplier.exemption.currency_id')}}</p>
                            <el-select v-model="item.currency_id" size="mini" placeholder="Please Select">
                                <el-option
                                        v-for="item in currencys"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.supplier.exemption.effective_date')}}</p>
                            <el-date-picker
                                    style="width: 140px;"
                                    size="mini"
                                    v-model="item.effective_date"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    placeholder="Select Date">
                            </el-date-picker>
                        </div>
                        <div class="d2-m-10 l_h80">
                            <span>{{$t('user.supplier.exemption.amount')}}:</span>
                            <el-switch
                                    v-model="item.status"
                                    :active-value="1"
                                    :inactive-value="2"
                                    active-text="开"
                                    inactive-text="关">
                            </el-switch>
                        </div>
                        <div class="d2-mt-10 l_h80">
                            <el-button type="primary" size="mini" @click="save_exemption(item)">{{$t('save')}}</el-button>
                            <el-button type="danger" size="mini" @click="delete_exemption(item)">
                                {{$t('delete')}}
                            </el-button>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card account" style="width: 100%;">
                <div slot="header" class="clearfix" style="">
                    <i @click="toggle_account" class="el-icon-caret-bottom"></i>{{$t('user.supplier.bank_accouts.account')}}
                    <el-button style="float: right;" type="primary" name="add" size="mini" @click="add_bank_accouts">
                        {{$t('add')}}
                    </el-button>
                </div>
                <div v-for="(item,index) in bank_accouts"
                     style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                    <div class="item1">
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.type')}}</p>
                            <el-select v-model="item.type" size="mini"
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
                            <p>{{$t('user.supplier.bank_accouts.country_code')}}</p>
                            <el-select v-model="item.country_code"  filterable
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
                            <p>{{$t('user.supplier.bank_accouts.province_code')}}</p>
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
                            <p>{{$t('user.supplier.bank_accouts.city_id')}}</p>
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
                            <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.opening_bank')}}</p>
                            <el-input v-model="item.opening_bank"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.payee')}}</p>
                            <el-input v-model="item.payee"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.bank_account_number')}}</p>
                            <el-input v-model="item.bank_account_number"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>{{$t('user.supplier.bank_accouts.remark')}}</p>
                            <el-input v-model="item.remark"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10 l_h80">
                            <span>{{$t('user.supplier.bank_accouts.is_default')}}:</span>
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
                            <el-input v-model="item.company_name"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.customer.invoice.duty_paragraph')}}</p>
                            <el-input v-model="item.duty_paragraph"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 180px;">
                            <p>{{$t('user.customer.invoice.address')}}</p>
                            <el-input v-model="item.address"  size="mini" type="textarea"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>{{$t('user.customer.invoice.mobile')}}</p>
                            <el-input v-model="item.mobile"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>{{$t('user.customer.invoice.opening_bank')}}</p>
                            <el-input v-model="item.opening_bank"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>{{$t('user.customer.invoice.bank_account_number')}}</p>
                            <el-input v-model="item.bank_account_number" size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <!-- <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.customer.invoice.user_type')}}</p>
                            <el-select v-model="item.user_type"  size="mini"
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
            <!--收货地址 开始-->
            <el-card class="box-card receive_good" style="width: 100%;">
                <div slot="header" class="clearfix" style="">
                    <i @click="toggle_receive_good" class="el-icon-caret-bottom"></i>{{$t('user.customer.receive_good.receive_good')}}
                    <el-button style="float: right;" type="primary" size="mini" name="add" @click="add_receive_good">
                        {{$t('add')}}
                    </el-button>
                </div>
                <div v-for="(item,index) in receive_good_address"
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
                            <el-input v-model="item.address"  size="mini" type="textarea"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.contact_name')}}</p>
                            <el-input v-model="item.contact_name" size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.mobile')}}</p>
                            <el-input v-model="item.mobile"  size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>{{$t('user.customer.receive_good.email')}}</p>
                            <el-input v-model="item.email" size="mini"
                                      placeholder="Please Write"></el-input>
                        </div>
                        <!-- <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>{{$t('user.customer.receive_good.user_type')}}</p>
                            <el-select v-model="item.user_type"  size="mini"
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
                            <el-button type="primary" size="mini" name="save" @click="save_receive_good(item)">
                                {{$t('save')}}
                            </el-button>
                            <el-button type="danger" size="mini" name="delete" @click="delete_receive_good(item,index)">
                                {{item.deleted_at?'启用':'作废'}}
                            </el-button>
                        </div>
                    </div>
                </div>
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
        destroy,
        country_list,
        province_list,
        city_list,
        member_company
    } from '@/api/user'
    import $ from 'jquery'
    import util from '@/libs/util'
    import { mapState, mapActions } from "vuex";
    export default {
        name: "User-supplierForm",
        data() {
            return {
                supplyloading:false,
                member_id: '',
                input: '',
                imageUrl: '',
                sorts: [{
                    id: 1,
                    name: "company"
                }, {
                    id: 2,
                    name: "personal"
                }],
                basis: {
                    name: '',
                    english_name: '',
                    country_code: '',
                    pay_way: '',
                    business_mode_id:'',
                    product_sorts: '',
                    level_id: '',
                    pid: '',
                    sort: '',
                    type: 2,
                    logo: '',
                    remark: '',
                    supplier_status:'',
                    loading: false
                },
                upload: process.env.VUE_APP_API + 'api/v1/customer/logo',
                contracts: [{
                    name: '',
                    phone: '',
                    email: '',
                    mobile: '',
                    fax: '',
                    skype: '',
                    qq: '',
                    remark: '',
                    tag: '',
                    is_default: false,
                    member_id: '',
                    loading: false
                }],
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
                    is_default: false,
                }],
                exemption_amount: [{
                    member_id: '',
                    amount: '',
                    currency_id: '',
                    effective_date: '',
                    status: ''
                }],
                //开票信息
                invoice: [{
                    company_name: '',
                    duty_paragraph: '',
                    address: '',
                    mobile: '',
                    opening_bank: '',
                    bank_account_number: '',
                    is_default: false,
                    // user_type: 102,
                    member_id: ''
                }],
                //收货地址
                receive_good_address: [{
                    country_code: '',
                    city_id: '',
                    province:[],
                    city:[],
                    address: '',
                    contact_name: '',
                    mobile: '',
                    email: '',
                    is_default: false,
                    user_type: 102,
                    type: 2,
                    member_id: ''
                }],
                create: false,
                city: [],
                restaurants: [],
                state4: '',
                timeout: null,
                country: [],
                company: [],
                pay_ways: [],
                business_modes: [],
                currencys: [],
                formula_type: [],
                levels: [],
                product_sort: [],
                parent_company: [],
                sort_info: [],
                type_info: [],
                user_type: [],
                user_lists: [],
                express_company: [],
                user_id:'',
                bank_account_type_info:[],
                supplier_status_info:[],
                personal: true,
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
            '$route' (to, from) {
                if(to.name=='User-supplierForm'){
                    this.query_id=this.$route.query.id
                }
            },
            query_id(newVlaue,oldVlaue){
                if(newVlaue!=oldVlaue){
                    this.fetchData()
                    if(this.$route.query.id){
                        this.edit_refresh(this.$route.query.id)
                    }
                }
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
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
                var that = this
                that.$router.push({
                    path: "/User/supplier",
                    name: "User-supplier",
                });
                var tagName = 'User-supplierForm'
                that.closeAdd({tagName})
            },
            change_sort(sort) {
                if (sort == 2) {
                    this.personal = false
                } else {
                    this.personal = true
                }
            },
            edit_refresh(id) {
                edit('supplier', id).then(res => {
                    this.member_id = res.data.id;
                    this.user_id=res.data.user_id;
                    if(res.data.parent){
                        this.parent_company=[{
                            id: res.data.parent.id,
                            name: res.data.parent.name
                        }]
                    }
                    this.basis.id = res.data.id;
                    this.basis.supplier_status = res.data.supplier_status;
                    this.basis.name = res.data.name;
                    this.basis.english_name = res.data.english_name;
                    this.basis.country_code = res.data.country_code;
                    this.basis.pay_way = res.data.pay_way;
                    this.basis.level_id = res.data.level_id;
                    this.basis.pid = res.data.pid == 0 ? '' : res.data.pid;
                    this.basis.product_sorts = res.data.product_sorts;
                    this.basis.business_mode_id = res.data.business_mode_id;
                    this.basis.sort = res.data.sort;
                    this.personal = this.basis.sort == 2 ? false : true
                    this.basis.logo = res.data.logo;
                    this.imageUrl = res.data.logo;
                    this.basis.remark = res.data.remark;
                    this.loading = false
                    this.exemption_amount = res.data.exemption_amounts
                    res.data.contacts.forEach((items, index) => {
                        items.loading = false
                    })
                    res.data.bank_accouts.forEach((items, index) => {
                        items.loading = false
                        province_list(items.country_code).then(res => {
                            items.province = res.data;
                        })
                        if(items.country_code){
                            city_list(items.country_code,items.province_code).then(res => {
                                items.city = res.data;
                            })
                        }
                        
                    })

                    setTimeout(()=>{
                        this.bank_accouts=res.data.bank_accouts;
                        if (this.bank_accouts.length == 0) {
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
                                is_default: '',
                            })
                        }
                    },1000)
                    this.contracts = res.data.contacts;
                    this.invoice= res.data.invoices;
                    if (this.contracts.length == 0) {
                        this.contracts.push({
                            name: '',
                            phone: '',
                            email: '',
                            mobile: '',
                            fax: '',
                            skype: '',
                            qq: '',
                            remark: '',
                            tag: '',
                            is_default: false,
                            // user_type: 102,
                            member_id: '',
                            loading: false
                        })
                    }
                    if (this.exemption_amount.length == 0) {
                        this.exemption_amount.push({
                            member_id: '',
                            amount: '',
                            currency_id: '',
                            effective_date: '',
                            status: ''
                        })
                    }
                    if(res.data.receive_goods_addresses.length != 0){
                        this.receive_good_address=res.data.receive_goods_addresses
                        this.receive_good_address.forEach((items, index) => {
                            if(items.country_code){
                                city_list(items.country_code,'').then(res => {
                                    this.$set(items,'city',res.data);
                                })
                            }
                            
                        })
                    }
                })

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
            fetchData() {
                lists(this.queryList, 'supplier').then(res => {
                    res.data.data.forEach((items, index) => {
                        if (items.countries) {
                            items.map = 'flag-' + items.countries.Code2.toLowerCase()
                        }
                        items.product_sorts_name=""
                        res.enum.product_sorts.forEach((m, n) => {
                            if (items.product_sorts) {
                                items.product_sorts.forEach((i, j) => {
                                    if (i == m.id) {
                                        if (items.product_sorts.length > 1) {
                                            items.product_sorts_name += m.name + '/'
                                        } else {
                                            items.product_sorts_name = m.name
                                        }
                                    }
                                })
                            }
                        })
                        res.enum.levels.forEach((m, n) => {
                            if(m.id=items.level_id){
                                items.level_name=m.num
                            }
                        })
                        res.enum.business_modes.forEach((m, n) => {
                            if(m.id==items.business_mode_id){
                                items.business_mode_name=m.name
                            }
                        })
                    })
                    this.lists = res.data;
                    this.pay_ways = res.enum.pay_ways;
                    this.business_modes = res.enum.business_modes;
                    this.currencys = res.enum.currencys;
                    this.formula_type = res.enum.formula_type;
                    this.levels = res.enum.levels;
                    this.product_sort = res.enum.product_sorts;
                    this.sort_info = res.enum.sort_info;
                    this.type_info = res.enum.type_info;
                    this.user_type = res.enum.user_type;
                    this.express_company = res.enum.express_company;
                    this.bank_account_type_info=res.enum.bank_account_type_info;
                    this.supplier_status_info = res.enum.supplier_status_info
                })
                country_list().then(res => {
                    this.country = res.data;
                })
            },
            toggle_invoice() {
                $('.invoice .el-card__body').toggle()
            },
            toggle_account(){
                $('.account .el-card__body').toggle()
            },
            toggle_basis() {
                $('.basis .el-card__body').toggle()
            },
            toggle_contracts() {
                $('.contracts .el-card__body').toggle()
            },
            toogle_exemption() {
                $('.exemption .el-card__body').toggle()
            },
            toggle_receive_good() {
                $('.receive_good .el-card__body').toggle()
            },
            add_invoice() {
                this.invoice.push({
                    company_name: '',
                    duty_paragraph: '',
                    address: '',
                    mobile: '',
                    opening_bank: '',
                    bank_account_number: '',
                    is_default: '',
                    // user_type: 102,
                    member_id: ''
                })
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
                    is_default: '',
                })
            },
            add_receive_good() {
                this.receive_good_address.push({
                    country_code: '',
                    city_id: '',
                    address: '',
                    contact_name: '',
                    mobile: '',
                    email: '',
                    is_default: '',
                    user_type: 102,
                    type: 2,
                    member_id: ''
                })
            },
            save_bank_account(item){
                item.user_id = this.user_id
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'supplier', 'bank_account_update', this)
                } else {
                    create(item, 'supplier', 'bank_account_create', this)
                }
            },
            delete_bank_account(item,index){
                if (item.id) {
                    destroy(item, 'supplier', 'bank_account_destory', this)
                } else {
                    this.bank_accouts.splice(index, 1)
                }
            },
            add_contracts() {
                this.contracts.push({
                    name: '',
                    phone: '',
                    email: '',
                    mobile: '',
                    fax: '',
                    skype: '',
                    qq: '',
                    remark: '',
                    tag: '',
                    is_default: false,
                    // user_type: 102,
                    member_id: '',
                    loading: false
                })
            },
            save_basis() {
                if (this.basis.pid == '') {
                    this.basis.pid = 0
                }
                if (this.basis.id) {
                    update(this.basis, 'supplier', 'update', this)
                } else {
                    create(this.basis, 'supplier', 'create', this)
                }
            },
            save_invoice(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'supplier', 'invoice_update', this)
                } else {
                    create(item, 'supplier', 'invoice_create', this)
                }
            },
            save_contracts(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'supplier', 'contract_update', this)
                } else {
                    create(item, 'supplier', 'contract_create', this)
                }
            },
            save_exemption(item) {
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'supplier', 'exemption_amount_update', this)
                } else {
                    create(item, 'supplier', 'exemption_amount_create', this)
                }
            },
            save_receive_good(item){
                item.member_id = this.member_id
                if (item.id) {
                    update(item, 'supplier', 'receive_address_update', this)
                } else {
                    create(item, 'supplier', 'receive_address_create', this)
                }
            },
            delete_supplier(item) {
                destroy(item, 'supplier', 'destory', this,'supplier')
            },
            delete_contracts(item, index) {
                if (item.id) {
                    destroy(item, 'supplier', 'contract_destory', this)
                } else {
                    this.contracts.splice(index, 1)
                }
            },
            delete_receive_good(item, index){
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
                    destroy(obj, 'supplier', 'receive_address_destory', this)
                } else {
                    this.receive_good_address.splice(index, 1)
                }
            },
            delete_exemption(item) {
                destroy(item, 'supplier', 'exemption_amount_destory', this)
            },
            delete_invoice(item, index){
                if (item.id) {
                    // destroy(item, 'supplier', 'receive_address_destory', this)
                } else {
                    this.invoice.splice(index, 1)
                }
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.basis.logo = res.data
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt2M;
            },
            loadAll(name) {
                member_company(name).then(res => {
                    this.company = res.data;
                })
                return this.company
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
        }
    };
</script>