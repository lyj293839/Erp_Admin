<style lang="scss" scoped type="text/scss">
    .heard_top {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        margin-bottom: 8px;
        margin-top: 5px;
        .el-autocomplete {
            width: 200px;
            margin: 2px 2px;
        }
        .el-input {
            width: 150px;
            margin: 2px 2px;
        }
        .el-select {
            width: 150px;
           margin: 2px 2px;
        }
    }

    table td, th {
        text-align: center;
    }

    .td {
        font-weight: normal !important;
    }

    .dialog {
        .el-input {
            width: 200px;
        }
        .el-select {
            width: 200px;
        }
    }

    /deep/ .plTableBox .el-table {
        font-size: 13px !important;
    }

    /deep/ .d2-container-full__body::-webkit-scrollbar {
        overflow-y: hidden;
    }
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
        <div class="heard_top">
                <el-input placeholder="发票号" size="mini" v-model="queryList.invoice_number"
                          style="" clearable></el-input>
                <el-input placeholder="包编号" size="mini" v-model="queryList.package_no" style=""
                          clearable></el-input>
                <el-autocomplete
                        size="mini"
                        style=""
                        v-model="queryList.supplier_name"
                        :fetch-suggestions="querySearch"
                        placeholder="供应商"
                        clearable
                ></el-autocomplete>
                <el-select
                        v-model="queryList.system_company"
                        filterable
                        clearable
                        size="mini"
                        placeholder="付款公司"
                        style="width: 150px;"
                >
                    <el-option v-for="(i,index) in enums.system_company"  :key="index" :label="i.name" :value="i.id"></el-option>
                </el-select>
                <el-select placeholder="打包人" size="mini" clearable v-model="queryList.user_id"
                           style="width: 130px;">
                    <el-option
                            v-for="item in purchaseList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="扫票状态" size="mini" clearable v-model="queryList.saopiao_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.saopiao_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="收票状态" size="mini" clearable v-model="queryList.invoice_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.invoice_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="付款申请状态" size="mini" clearable v-model="queryList.finance_create_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.finance_create_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="采购付款审核状态" size="mini" clearable v-model="queryList.w_check_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.w_check_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="付款审核状态" size="mini" clearable v-model="queryList.finance_check_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.finance_check_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="付款状态" size="mini" clearable v-model="queryList.finance_pay_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.finance_pay_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select placeholder="处理状态" size="mini" clearable v-model="queryList.complete_status"
                           style="width: 130px;">
                    <el-option
                            v-for="item in enums.complete_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-date-picker
                            v-model="queryList.start_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="付款开始"
                            size="mini"
                            format="yyyy-MM-dd"
                            v-if="department_id==4||user_id==1"
                            style="width: 125px;"
                    ></el-date-picker>
                    <el-date-picker
                            v-model="queryList.end_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="付款结束"
                            size="mini"
                            format="yyyy-MM-dd"
                            v-if="department_id==4||user_id==1"
                            style="width: 125px;"
                    ></el-date-picker>
                <el-button type="primary" style="margin-left:10px;" size="mini" :loading="loading_search"
                           @click="Search()">搜索
                </el-button>
                <el-button type="primary" style="margin-left:10px;" size="mini" :loading="loading_export"
                           @click="export_excel()">导出
                </el-button>
                <a :href="export_url" ref="export_url" hidden></a>
        </div>
        <a :href="down_url" ref="down_url" hidden></a>
        <!-- 页面 -->
        <u-table
                ref="plTable"
                :height="height"
                row-key="id"
                use-virtual
                :row-height="rowHeight"
                border>
            <u-table-column label="包编号" width="130">
                <template slot-scope="scope">
                    <div v-if="scope.row.complete_status==1">
                        <el-tooltip class="item" effect="dark" content="结束完成" placement="top">
                            <span>{{scope.row.package_no}}</span>
                        </el-tooltip>
                    </div>
                    <div v-else>
                        {{scope.row.package_no}}
                    </div>
                </template>
            </u-table-column>
            <u-table-column label="打包人" width="80">
                <template slot-scope="scope">{{attr(scope.row,'user.name')}}</template>
            </u-table-column>
            <u-table-column label="发票号" width="100">
                <template slot-scope="scope">
                    <span v-for="item in scope.row.package_invoices">{{item.invoice_number}}<span
                            v-if="scope.row.package_invoices.length>1">,</span></span>
                </template>
            </u-table-column>
            <u-table-column label="供应商">
                <template slot-scope="scope">{{scope.row.supplier_name}}</template>
            </u-table-column>
            <u-table-column label="甲方">
                <template slot-scope="scope">{{scope.row.corp_name}}</template>
            </u-table-column>
            <u-table-column label="合同金额" width="120">
                <template slot-scope="scope">
                    {{getEnumValue(GEnums.Currency,scope.row.currency_id,'icon')}}
                    {{scope.row.total}}
                </template>
            </u-table-column>
            <u-table-column label="发票类型" width="120">
                <template slot-scope="scope">
                    {{getEnumValue(GEnums.InvoiceInfo,scope.row.invoice_type_id)}}
                </template>
            </u-table-column>
            <u-table-column label="扫票状态" width="110">
                <template slot-scope="scope">
                    <div class="d2-text-center" v-if='scope.row.invoice_type_id==2'>无需扫票</div>
                    <div v-else>
                        <div class="d2-text-center" style="background-color:#FFC0CB;cursor:pointer;"
                             @click="saopiao_info(scope.row)" v-if="scope.row.saopiao_status==1">
                            {{getEnumValue(enums.saopiao_status,scope.row.saopiao_status)}}
                            <span style='color:#e6a23c;margin-right:3px;font-size:14px;'>({{scope.row.invoice_pending_number}}</span>
                            <span style='color:green;margin-right:3px;font-size:14px;'>{{scope.row.invoice_success_number}})</span>
                            <!-- <span style='color:#f56c6c;margin-right:3px;font-size:14px;'>{{scope.row.invoice_failuer_number}}</span> -->
                        </div>
                        <div class="d2-text-center" v-else
                             :style="{background:scope.row.saopiao_status==2?'rgb(255, 240, 221)':''}">
                            {{getEnumValue(enums.saopiao_status,scope.row.saopiao_status)}}
                        </div>

                    </div>
                </template>
            </u-table-column>
            <u-table-column label="收票状态" width="80">
                <template slot-scope="scope">
                    <div class="d2-text-center" v-if='scope.row.invoice_type_id==2'>无需收票</div>
                    <div v-else>
                        <div class="d2-text-center" v-if='scope.row.invoice_status==0'>
                            {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                        </div>
                        <div class="d2-text-center" style="background-color:#FFF0DD;"
                             v-if='scope.row.invoice_status==1'>
                            {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                        </div>
                        <div class="d2-text-center" style="background-color:#FFC0CB;"
                             v-if='scope.row.invoice_status==2'>
                            {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                        </div>
                        <div class="d2-text-center" style="background-color:#F5DEB3;"
                             v-if='scope.row.invoice_status==3'>
                            {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                        </div>
                        <div class="d2-text-center" v-if='scope.row.invoice_status==4'>
                            {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                        </div>
                    </div>
                </template>
            </u-table-column>
            <u-table-column label="付款申请状态" width="110">
                <template slot-scope="scope">
                    <!--<div class="d2-text-center" v-if="scope.row.finance_create_status==1" style="background-color:rgb(255, 193, 7);">{{getEnumValue(enums.finance_create_status,scope.row.finance_create_status)}}-->
                    <!--<span v-if='scope.row.pay_type==5' style='color:red;font-size: 16px;font-weight: bold;'>(往)</span>-->
                    <!--</div>-->
                    <div class="d2-text-center"
                         :style="{backgroundColor:(scope.row.finance_create_status==1?'rgb(240, 238, 236)':(scope.row.finance_create_status==2?'':(scope.row.finance_create_status==3?'#F5DEB3':(scope.row.finance_create_status==5?'rgb(255, 193, 7)':''))))}">
                        {{getEnumValue(enums.finance_create_status,scope.row.finance_create_status)}}
                        <span v-if='scope.row.pay_type==5'
                              style='color:red;font-size: 22px;font-weight: bold;'>(往)</span>
                    </div>
                </template>
            </u-table-column>
            <u-table-column label="采购付款审核" width="110">
                <template slot-scope="scope">
                    <div class="d2-text-center" :style="{backgroundColor:scope.row.w_check_status==1?'#67C23A':''}">
                        {{getEnumValue(enums.w_check_status,scope.row.w_check_status)}}
                    </div>
                </template>
            </u-table-column>
            <u-table-column label="财务付款审核" width="110">
                <template slot-scope="scope">
                    <div class="d2-text-center"
                         :style="{backgroundColor:scope.row.finance_check_status==1?'#67C23A':''}">
                        {{getEnumValue(enums.finance_check_status,scope.row.finance_check_status)}}
                    </div>
                </template>
            </u-table-column>
            <u-table-column label="付款状态" width="80">
                <template slot-scope="scope">
                    <div class="d2-text-center"
                         :style="{backgroundColor:(scope.row.finance_pay_status==2?'#FFC0CB':(scope.row.finance_pay_status==0?'':(scope.row.finance_pay_status==5?'rgb(255, 193, 7)':(scope.row.finance_pay_status==1?'#FFC0CB':''))))}">
                        {{getEnumValue(enums.finance_pay_status,scope.row.finance_pay_status)}}
                    </div>
                </template>
            </u-table-column>
            <u-table-column label="操作" fixed="right" width='190'>
                <template slot-scope="scope">
                    <el-button type="primary" class="d2-mr-5" size="mini" @click="detail(scope.row)">详情</el-button>
                    <el-dropdown split-button type="primary" size="mini">
                        更多操作
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-if="permissions.indexOf(490)>-1&&scope.row.finance_create_status!=2">
                                <div @click="apply_pay(scope.row)">申请付款</div>
                            </el-dropdown-item>
                            <!--<el-dropdown-item v-if='permissions.indexOf(490)>-1&&scope.row.invoice_type_id!=2'>-->
                                <!--<div @click="saopiao(scope.row)">扫票</div>-->
                            <!--</el-dropdown-item>-->
                            <el-dropdown-item v-if="permissions.indexOf(490)>-1">
                                <div @click="print(scope.row)">打印</div>
                            </el-dropdown-item>
                            <el-dropdown-item v-if="permissions.indexOf(490)>-1">
                                <div @click="down(scope.row)">下载Execl</div>
                            </el-dropdown-item>
                            <el-dropdown-item
                                    v-if="permissions.indexOf(490)>-1&&scope.row.saopiao_status!=1&&scope.row.finance_create_status!=1">
                                <div @click="cancel_package(scope.row)">撤销打包</div>
                            </el-dropdown-item>
                            <el-dropdown-item v-if='permissions.indexOf(540)>-1&&scope.row.saopiao_status==1'>
                                <div @click="saopiao_check(scope.row)">扫票审核</div>
                            </el-dropdown-item>
                            <el-dropdown-item v-if='permissions.indexOf(507)>-1&&scope.row.finance_create_status==1'>
                                <div @click="procure_check(scope.row)">采购付款审核</div>
                            </el-dropdown-item>
                            <el-dropdown-item
                                    v-if='permissions.indexOf(494)>-1&&scope.row.finance_create_status==1&&scope.row.w_check_status==1'>
                                <div @click="apply_check(scope.row)">财务付款审核</div>
                            </el-dropdown-item>
                            <el-dropdown-item
                                    v-if='permissions.indexOf(506)>-1&&scope.row.finance_create_status==1&&scope.row.finance_check_status==1&&scope.row.w_check_status===1'>
                                <div @click="apply_to(scope.row)">付款执行</div>
                            </el-dropdown-item>
                            <el-dropdown-item
                                    v-if='permissions.indexOf(490)>-1&&scope.row.invoice_type_id!=2&&scope.row.complete_status!=1'>
                                <div @click="sure_end(scope.row)">确认结束</div>
                            </el-dropdown-item>
                            <el-dropdown-item
                                    v-if='permissions.indexOf(490)>-1&&scope.row.invoice_type_id!=2&&scope.row.complete_status!=0'>
                                <div @click="cancel_end(scope.row)">取消结束</div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </u-table-column>
        </u-table>
        <el-dialog :visible.sync="apply_pay_show" title="申请付款" width="90%">
            <div class='dialog_pay'>
                <table border="1" bordercolor="#E5E5E5" style="width:100%; border-collapse: collapse;">
                    <tr v-if='apply_data.finance_create_status==1'>
                        <th>{{$t('procure.agree.agree63')}}</th><!-- 申请时间 -->
                        <th>{{$t('procure.agree.agree64')}}</th><!-- 支付方式 -->
                        <th>{{$t('procure.agree.agree65')}}</th><!-- 银行 -->
                        <th>银行账号</th><!-- 账号银行 -->
                        <th>账户类型</th><!-- 账户类型 -->
                        <th>付款金额</th>
                        <th>{{$t('procure.agree.agree71')}}</th><!-- 付款时间 -->
                        <th>财务付款</th>
                        <th>财务审核</th>
                        <th>操作</th>
                    </tr>
                    <tr v-if='apply_data.finance_create_status==1'>
                        <td>{{apply_data.created_at}}</td>
                        <td>{{getEnumValue(enums.pay_type,apply_data.pay_type)}}</td><!-- 银行转账/现金/paypal付款 -->
                        <td>{{apply_data.bank}}</td>
                        <td>{{apply_data.bank_account}}</td>
                        <td>{{getEnumValue(enums.bank_account_type,apply_data.bank_account_type)}}</td>
                        <td>{{apply_data.total}}{{getEnumValue(GEnums.Currency,apply_data.currency_id,'icon')}}</td>
                        <td>{{apply_data.finance_pay_time}}</td>
                        <td>
                            <div class="h-20">
                                <span v-if="apply_data.status==-1">撤销</span>
                                <span v-else>{{getEnumValue(enums.finance_pay_status,apply_data.finance_pay_status)}}</span>
                                <span v-if="apply_data.finance_pay_user">({{apply_data.finance_pay_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="apply_data.finance_pay_user">{{(apply_data.finance_pay_time)}}</div>
                        </td>
                        <td>
                            <div class="h-20">
                                {{getEnumValue(enums.finance_check_status,apply_data.finance_check_status)}}
                                <span v-if="apply_data.finance_check_user">({{apply_data.finance_check_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="apply_data.finance_check_user">{{(apply_data.finance_check_time)}}
                            </div>
                        </td>
                        <td class="d2-text-center">
                            <el-button type="primary" v-if='apply_data.finance_pay_status!=1'
                                       @click="cancel_apply(apply_data)" size="mini">取消申请
                            </el-button>
                        </td>
                    </tr>
                    <tr v-if='apply_data.finance_create_status==0'>
                        <td colspan="9">
                            <b style="margin:10px">{{$t('procure.agree.agree81')}}</b><!-- 详情 -->
                        </td>
                    </tr>
                    <tr v-if='apply_data.finance_create_status==0'>
                        <td><span style="color:red;">*</span>{{$t('procure.agree.agree65')}}</td><!-- 银行 -->
                        <td colspan="7">
                            <el-select v-model="bank" @change="change_bank()" size="small" style="width:100%;"
                                       clearable>
                                <el-option
                                        v-for="item in bank_account"
                                        :key="item.id"
                                        :label="item.opening_bank+'-'+item.payee+'-'+getEnumValue(enums.bank_account_type,item.type)"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td class="d2-text-center">
                            <el-button type="primary" @click="account(apply_data.supplier_id)" size="mini">
                                {{$t('procure.agree.agree82')}}
                            </el-button><!-- 账户 -->
                        </td>
                    </tr>
                    <tr v-if='apply_data.finance_create_status==0'>
                        <td rowspan="2">{{$t('procure.agree.agree83')}}</td><!-- 收款账户 -->
                        <td colspan="2">{{$t('procure.agree.agree65')}}</td><!-- 银行 -->
                        <td>{{$t('procure.agree.agree84')}}</td><!-- 收款人 -->
                        <td>{{$t('procure.agree.agree85')}}</td><!-- 银行账号 -->
                        <td>{{$t('procure.agree.agree86')}}</td><!-- 省份 -->
                        <td>{{$t('procure.agree.agree87')}}</td><!-- 地市 -->
                        <td>{{$t('procure.agree.agree88')}}</td><!-- 账户类型 -->
                        <td>{{$t('procure.agree.agree89')}}</td><!-- 银行备注 -->
                    </tr>
                    <tr v-if='apply_data.finance_create_status==0'>
                        <td colspan="2">{{bank_list.opening_bank}}</td>
                        <td>{{bank_list.payee}}</td>
                        <td>{{bank_list.bank_account_number}}</td>
                        <td>{{bank_list.province_code}}</td>
                        <td>{{bank_list.city?bank_list.city.Name:''}}</td>
                        <td style="background-color: red;color: #FFF;text-align: center">
                            {{getEnumValue(enums.bank_account_type,bank_list.type)}}
                        </td>
                        <td>{{bank_list.remark}}</td>
                    </tr>
                    <tr v-if='apply_data.finance_create_status==0'>
                        <td><span style="color:red;">*</span>{{$t('procure.agree.agree64')}}</td><!-- 支付方式 -->
                        <td colspan="8">
                  <span v-if="apply_data.currentaccount" style="display: inline-block;">
                    <el-select v-model="Addpay.pay_type" @change='change_pay_type(Addpay.pay_type)' clearable
                               size="small" style="width: 200px;border: 1px solid #f2f2f2;">
                      <el-option
                              v-for="item in enums.pay_type"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>

                  </span>
                            <span v-else style="display: inline-block;">
                    <el-select v-model="Addpay.pay_type" clearable size="small"
                               style="width: 200px;border: 1px solid #f2f2f2;">
                      <el-option
                              v-for="item in enums.pay_type"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </span>
                            <span class='d2-ml-5' style="display: inline-block;"
                                  v-if="apply_data.currentaccount&&currentaccount_show">往来账余额:{{apply_data.currentaccount}}</span>
                            <span class='d2-ml-5' style="display: inline-block;color:red;"
                                  v-if="apply_data.currentaccount&&currentaccount_show&&Number(apply_data.currentaccount)<Number(apply_data.total)">往来账余额不足！</span>
                        </td>
                    </tr>
                    <tr v-if='apply_data.finance_create_status==0'>
                        <td>{{$t('procure.agree.agree40')}}</td><!-- 合计金额 -->
                        <td colspan="7">
                            <el-input clearable v-model="Addpay.pay_requestamount" readonly="readonly"
                                      size="small"></el-input>
                        </td>
                        <td class='d2-text-center'>
                            <el-button type="primary" size="mini"
                                       :disabled='apply_data.currentaccount!=""&&Number(apply_data.currentaccount)<Number(apply_data.total)&&Addpay.pay_type==5'
                                       @click="save_finance()">保存
                            </el-button>
                        </td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="procure_pay_check_show" title="采购审核" width="90%">
            <div class='dialog_pay'>
                <table border="1" bordercolor="#E5E5E5" style="width:100%; border-collapse: collapse;">
                    <tr>
                        <th>{{$t('procure.agree.agree63')}}</th><!-- 申请时间 -->
                        <th>{{$t('procure.agree.agree64')}}</th><!-- 支付方式 -->
                        <th>{{$t('procure.agree.agree65')}}</th><!-- 银行 -->
                        <th>银行账号</th><!-- 账号银行 -->
                        <th>账户类型</th><!-- 账户类型 -->
                        <th>付款金额</th>
                        <th>采购付款审核</th>
                        <th width="150">操作</th>
                    </tr>
                    <tr>
                        <td>{{apply_check_data.created_at}}</td>
                        <td>{{getEnumValue(enums.pay_type,apply_check_data.pay_type)}}</td><!-- 银行转账/现金/paypal付款 -->
                        <td>{{apply_check_data.bank}}</td>
                        <td>{{apply_check_data.bank_account}}</td>
                        <td>{{getEnumValue(enums.bank_account_type,apply_check_data.bank_account_type)}}</td>
                        <td>
                            {{apply_check_data.total}}{{getEnumValue(GEnums.Currency,apply_check_data.currency_id,'icon')}}
                        </td>
                        <td>{{getEnumValue(enums.w_check_status,apply_check_data.w_check_status)}}</td>
                        <td class="d2-text-center">
                            <el-button type="primary" size="mini" v-if='apply_check_data.w_check_status==0'
                                       @click="procure_check_save(apply_check_data,'1')">审核通过
                            </el-button>
                            <el-button type="primary" size="mini" v-if='apply_check_data.w_check_status==1'
                                       @click="procure_check_save(apply_check_data,'0')" class="d2-ml-5">取消审核
                            </el-button>
                            <el-button type="primary" size="mini" v-if='apply_check_data.w_check_status==1'
                                       @click="procure_check_save(apply_check_data,'-1')" class="d2-ml-5">驳回
                            </el-button>
                        </td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="apply_pay_check_show" title="付款审核" width="90%">
            <div class='dialog_pay'>
                <table border="1" bordercolor="#E5E5E5" style="width:100%; border-collapse: collapse;">
                    <tr>
                        <th>{{$t('procure.agree.agree63')}}</th><!-- 申请时间 -->
                        <th>{{$t('procure.agree.agree64')}}</th><!-- 支付方式 -->
                        <th>{{$t('procure.agree.agree65')}}</th><!-- 银行 -->
                        <th>银行账号</th><!-- 账号银行 -->
                        <th>账户类型</th><!-- 账户类型 -->
                        <th>付款金额</th>
                        <th>{{$t('procure.agree.agree71')}}</th><!-- 付款时间 -->
                        <th>财务付款</th>
                        <th>财务审核</th>
                        <th width="150">操作</th>
                    </tr>
                    <tr>
                        <td>{{apply_check_data.created_at}}</td>
                        <td>{{getEnumValue(enums.pay_type,apply_check_data.pay_type)}}</td><!-- 银行转账/现金/paypal付款 -->
                        <td>{{apply_check_data.bank}}</td>
                        <td>{{apply_check_data.bank_account}}</td>
                        <td>{{getEnumValue(enums.bank_account_type,apply_check_data.bank_account_type)}}</td>
                        <td>
                            {{apply_check_data.total}}{{getEnumValue(GEnums.Currency,apply_check_data.currency_id,'icon')}}
                        </td>
                        <td>{{apply_check_data.finance_pay_time}}</td>
                        <td>
                            <div class="h-20">
                                <span v-if="apply_check_data.status==-1">撤销</span>
                                <span v-else>{{getEnumValue(enums.finance_pay_status,apply_check_data.finance_pay_status)}}</span>
                                <span v-if="apply_check_data.finance_pay_user">({{apply_check_data.finance_pay_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="apply_check_data.finance_pay_user">
                                {{(apply_check_data.finance_pay_time)}}
                            </div>
                        </td>
                        <td>
                            <div class="h-20">
                                {{getEnumValue(enums.finance_check_status,apply_check_data.finance_check_status)}}
                                <span v-if="apply_check_data.finance_check_user">({{apply_check_data.finance_check_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="apply_check_data.finance_check_user">
                                {{(apply_check_data.finance_check_time)}}
                            </div>
                        </td>
                        <td class="d2-text-center">
                            <el-button type="primary" size="mini" v-if='apply_check_data.finance_check_status==0'
                                       @click="finance_check(apply_check_data,'1')">审核通过
                            </el-button>
                            <el-button type="primary" size="mini" v-if='apply_check_data.finance_check_status==1'
                                       @click="finance_check(apply_check_data,'0')" class="d2-ml-5">取消审核
                            </el-button>
                            <el-button type="primary" size="mini" v-if='apply_check_data.finance_check_status==1'
                                       @click="finance_check(apply_check_data,'-1')" class="d2-ml-5">驳回
                            </el-button>
                        </td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="apply_to_show" title="付款执行" width="90%">
            <div class='dialog_pay'>
                <table border="1" bordercolor="#E5E5E5" style="width:100%; border-collapse: collapse;">
                    <tr>
                        <th>{{$t('procure.agree.agree63')}}</th><!-- 申请时间 -->
                        <th>{{$t('procure.agree.agree64')}}</th><!-- 支付方式 -->
                        <th>{{$t('procure.agree.agree65')}}</th><!-- 银行 -->
                        <th>银行账号</th><!-- 账号银行 -->
                        <th>账户类型</th><!-- 账户类型 -->
                        <th>付款金额</th>
                        <th>{{$t('procure.agree.agree71')}}</th><!-- 付款时间 -->
                        <th>财务付款</th>
                        <th>财务审核</th>
                        <th width="120">操作</th>
                    </tr>
                    <tr>
                        <td>{{apply_to_data.created_at}}</td>
                        <td>{{getEnumValue(enums.pay_type,apply_to_data.pay_type)}}</td><!-- 银行转账/现金/paypal付款 -->
                        <td>{{apply_to_data.bank}}</td>
                        <td>{{apply_to_data.bank_account}}</td>
                        <td>{{getEnumValue(enums.bank_account_type,apply_to_data.bank_account_type)}}</td>
                        <td>{{apply_to_data.total}}{{getEnumValue(GEnums.Currency,apply_to_data.currency_id,'icon')}}
                        </td>
                        <td>{{apply_to_data.finance_pay_time}}</td>
                        <td>
                            <div class="h-20">
                                <span v-if="apply_to_data.status==-1">撤销</span>
                                <span v-else>{{getEnumValue(enums.finance_pay_status,apply_to_data.finance_pay_status)}}</span>
                                <span v-if="apply_to_data.finance_pay_user">({{apply_to_data.finance_pay_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="apply_to_data.finance_pay_user">
                                {{(apply_to_data.finance_pay_time)}}
                            </div>
                        </td>
                        <td>
                            <div class="h-20">
                                {{getEnumValue(enums.finance_check_status,apply_to_data.finance_check_status)}}
                                <span v-if="apply_to_data.finance_check_user">({{apply_to_data.finance_check_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="apply_to_data.finance_check_user">
                                {{(apply_to_data.finance_check_time)}}
                            </div>
                        </td>
                        <td class="d2-text-center">
                            <el-button type="primary" size="mini" v-if='apply_to_data.finance_pay_status==0'
                                       @click="finance_pay(apply_to_data,'1')">执行
                            </el-button>
                            <el-button type="primary" size="mini" v-if='apply_to_data.finance_pay_status==1'
                                       class="d2-ml-5" @click="finance_pay(apply_to_data,'0')">取消执行
                            </el-button>
                        </td>
                    </tr>
                </table>
            </div>
        </el-dialog>
        <!-- 账户 -->
        <el-dialog :visible.sync="play" width="80%" class="quoteInput">
            <play :member="member_id" :type="enums.bank_account_type" @noticeClose="noticeClose($event)"></play>
        </el-dialog>
        <el-dialog :visible.sync="detail_show" title="详情" width="90%">
            <el-table
                    :data="detail_list.data"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    size="mini"
            >
                <el-table-column label="打包编号" width="120px;">
                    <template slot-scope="scope">{{scope.row.package_no}}</template>
                </el-table-column>
                <el-table-column label="合同编号">
                    <template slot-scope="scope">{{scope.row.procurement_contract_number}}</template>
                </el-table-column>
                <el-table-column label="合同时间">
                    <template slot-scope="scope">{{scope.row.contract_contract_date}}</template>
                </el-table-column>
                <el-table-column label="供应商" width="200px;">
                    <template slot-scope="scope">{{scope.row.supplier_name}}</template>
                </el-table-column>
                <el-table-column label="CAS">
                    <template slot-scope="scope">{{scope.row.cas}}</template>
                </el-table-column>
                <el-table-column label="产品名称" width="350px;">
                    <template slot-scope="scope">
                        <div>{{scope.row.name_cn}}</div>
                        <div>{{scope.row.name}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="采购数量" width="80px;">
                    <template slot-scope="scope">
                        {{scope.row.quantity}}{{getEnumValue(GEnums.Unit,scope.row.quantity_unit)}}
                    </template>
                </el-table-column>
                <el-table-column label="合同金额">
                    <template slot-scope="scope">
                        {{getEnumValue(GEnums.Currency,scope.row.currency_id,'icon')}}
                        {{scope.row.total_price}}
                    </template>
                </el-table-column>
                <el-table-column label="发票类型">
                    <template slot-scope="scope">
                        {{getEnumValue(InvoiceInfo,scope.row.invoice_type_id)}}
                    </template>
                </el-table-column>
                <el-table-column label="采购人员">
                    <template slot-scope="scope">
                        {{scope.row?scope.row.purchase_name:''}}
                    </template>
                </el-table-column>
                <el-table-column label="扫票状态" width="100">
                    <template slot-scope="scope">
                        <div class="d2-text-center" v-if="scope.row.saopiao_status=='0'">未扫票</div>
                        <div class="d2-text-center" style="background-color:#FFC0CB;"
                             v-if="scope.row.saopiao_status==1">已扫票
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收票情况" width="100">
                    <template slot-scope="scope">
                        <div class="d2-text-center" :style="{background:scope.row.invoice_status==2?'#FFC0CB':''}">
                            {{getEnumValue(enums.invoice_status,scope.row.invoice_status)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="收票余额">
                    <template slot-scope="scope">
                        <span v-if="scope.row.view_invoice">{{scope.row.total_price-scope.row.view_invoice.total}}</span>
                        <span slot-scope="scope" v-else>
            {{scope.row.total_price}}
          </span>
                    </template>
                </el-table-column>
                <el-table-column v-if="detail_list_delete_show" label="操作" fixed="right" width="70">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="delete_detail(scope.row)" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
                    style="text-align: right;margin-top:10px;"
                    background
                    :page-sizes="[10, 50, 100, 300,500]"
                    :page-size="queryList.per_page"
                    @size-change="handleSizeChange_detail"
                    @current-change="handleCurrentChange_detail"
                    :current-page.sync="currentPage_detail"
                    layout="sizes, prev, pager, next"
                    :total="detail_list.total"
            ></el-pagination>
        </el-dialog>
        <el-dialog :visible.sync="saopiao_show" title="扫票信息" width="50%">
            <el-table
                    :data="saopaio_list"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    size="mini"
            >
                <el-table-column label="发票号">
                    <template slot-scope="scope">{{scope.row.invoice_number}}</template>
                </el-table-column>
                <el-table-column label="发票类型">
                    <template slot-scope="scope">{{getEnumValue(GEnums.InvoiceInfo,scope.row.invoice_type)}}</template>
                </el-table-column>
                <el-table-column label="不含税金额">
                    <template slot-scope="scope">{{scope.row.amount}}</template>
                </el-table-column>
                <el-table-column label="税额">
                    <template slot-scope="scope">{{scope.row.tax_amount}}</template>
                </el-table-column>
                <el-table-column label="总额">
                    <template slot-scope="scope">{{scope.row.total}}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{getEnumValue(enums.invoice_check_status,scope.row.invoice_check_status)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button v-if='scope.row.invoice_check_status==0' type="primary" style="margin-left:5px;"
                                   size="mini" @click="saopiao_delete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog :visible.sync="dialog_saopiao_check" title="扫票审核" width="60%">
            <el-table
                    :data="saopaio_check_list"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    size="mini"
            >
                <el-table-column label="发票号">
                    <template slot-scope="scope">{{scope.row.invoice_number}}</template>
                </el-table-column>
                <el-table-column label="发票类型">
                    <template slot-scope="scope">{{getEnumValue(GEnums.InvoiceInfo,scope.row.invoice_type)}}</template>
                </el-table-column>
                <el-table-column label="不含税金额">
                    <template slot-scope="scope">{{scope.row.amount}}</template>
                </el-table-column>
                <el-table-column label="税额">
                    <template slot-scope="scope">{{scope.row.tax_amount}}</template>
                </el-table-column>
                <el-table-column label="总额">
                    <template slot-scope="scope">{{scope.row.total}}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{getEnumValue(enums.invoice_check_status,scope.row.invoice_check_status)}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width='220'>
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="saopiao_pass(scope.row)">审核通过</el-button>
                        <el-button type="primary" style="margin-left:5px;" size="mini"
                                   @click="saopiao_cancel(scope.row)">取消审核
                        </el-button>
                        <el-button type="primary" style="margin-left:5px;" size="mini"
                                   @click="saopiao_delete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <el-dialog :visible.sync="dialogSaopiao" width="50%" class="dialog">
            <el-form label-width="100px" label-position="right">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="发票编号：" :required="true">
                            <el-input size="small" v-model="Add_invoice.invoice_number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="收票公司：" :required="true">
                            <el-select size="small" v-model="Add_invoice.corp_name_new">
                                <el-option
                                        v-for="(item,index) in enums.system_company"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.name"
                                ></el-option>
                            </el-select>
                            <br>
                            <span style="color: red;margin-left: 5px">请核对收票公司是否一致！</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="开票日期：">
                            <el-date-picker
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    size="small"
                                    v-model="Add_invoice.invoice_date"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="发票类型：">
                            <el-select size="small" v-model="Add_invoice.invoice_type">
                                <el-option
                                        v-for="item in GEnums.Invoicetype"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="税率：">
                            <el-select size="mini" v-model="Add_invoice.tax">
                                <el-option
                                        v-for="(item,index) in taxs"
                                        :key="index"
                                        :label="item"
                                        :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="总金额：">
                    <el-input size="small" v-model="Add_invoice.total"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="save_saopaio()">保存</el-button>
                    <el-button size="mini" @click="dialogSaopiao=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                :page-sizes="[10, 50, 100, 300,500]"
                :page-size="Number(queryList.per_page)"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes, prev, pager, next"
                :total="list.total"
        ></el-pagination>
        <el-dialog :visible.sync="dialog_print" width="750px" class="dialog">
            <div class="d2-m-10" style="text-align:right;">
                <el-button size="mini" type="primary" v-print="'#print_detail'">预览打印</el-button>
            </div>
            <el-card class="box-card" id="print_detail" style="width:715px;height: auto;margin: 0 auto;">
                <div v-if="print_detail.data" class="d2-text-center d2-m-5" style="font-size: 10px;font-family: '宋体'">
                    {{print_detail.data[0].supplier_name}}
                </div>
                <table border="1" bordercolor="#606266"
                       style="margin: 5px 0;border-collapse: collapse;font-size: 10px;font-family: '宋体'">
                    <tr>
                        <th class="td" width="70">合同日期</th>
                        <th class="td" width="100">合同号</th>
                        <th class="td" width="200">中文产品名称</th>
                        <th class="td" width="80">casno</th>
                        <th class="td" width="50">数量</th>
                        <th class="td" width="50">单位</th>
                        <th class="td" width="75">金额</th>
                        <th class="td" width="60">采购人员</th>
                    </tr>
                    <tr v-for="item in print_detail.data" :key="item.id">
                        <td>{{item.contract_contract_date}}</td>
                        <td>
                            <div style="white-space:nowrap;width: 100px;overflow: hidden;">
                                {{item.procurement_contract_number}}
                            </div>
                        </td>
                        <td>
                            <div style="white-space:nowrap;width: 200px;overflow: hidden;text-align: left;">
                                {{item.name_cn}}
                            </div>
                        </td>
                        <td>
                            <div style="white-space:nowrap;width: 80px;overflow: hidden;">{{item.cas}}</div>
                        </td>
                        <td>{{item.quantity}}</td>
                        <td>{{getEnumValue(GEnums.Unit,item.quantity_unit,'name_en')}}</td>
                        <td>{{item.total_price}}</td>
                        <td>{{item.purchase_name}}</td>
                    </tr>
                </table>

                <div class="d2-m-10 d2-text-right" style="font-size: 10px;font-family: '宋体'">总金额：<span
                        style="color: red;" v-if="print_detail.data">{{getEnumValue(GEnums.Currency,print_detail.data[0].currency_id,'icon')}}{{print_total}}</span>
                </div>
            </el-card>
        </el-dialog>
    </d2-container>
</template>
<script>
    import play from "../agree/play";
    import request from "@/plugin/axios";
    import Big from "@/big/a/big.mjs";
    import {
        update_complete_status,
        package_down,
        package_detail_delete,
        package_lists,
        package_export,
        contract_detail_lists,
        package_saopiao_create,
        package_finance,
        package_saopiao_verify,
        package_saopiao_delete,
        package_finance_create,
        package_finance_check,
        package_finance_pay,
        package_finance_cancel,
        package_delete,
        package_w_check
    } from "@/api/procure";
    import {listTotal} from "@/api/prod";
    import util from "@/libs/util";

    export default {
        name: "procure-package_list",
        components: {
            play
        },
        data() {
            return {
                permissions: JSON.parse(localStorage.getItem('permissions')),
                department_id:util.cookies.get('department_id'),
                user_id:util.cookies.get('user_id'),
                list: {},
                detail_list: {},
                print_detail: [],
                saopaio_list: [],
                saopaio_check_list: [],
                purchaseList: [],
                apply_data: {},
                apply_to_data: {},
                apply_check_data: {},
                queryList: {
                    page: "1",
                    user_id: '',
                    invoice_number: '',
                    package_no: '',
                    per_page: '10',
                    supplier_id: "",
                    saopiao_status: '',
                    w_check_status: '',
                    invoice_status: '',
                    finance_create_status: '',
                    finance_check_status: '',
                    finance_pay_status: '',
                    system_company: '',
                    complete_status: 0,
                    start_date:'',
                    end_date:''
                },
                Add_invoice: {
                    id: '',
                    invoice_date: "",
                    invoice_number: "",
                    tax: '',
                    total: "",
                    invoice_type: "",
                    corp_name_new: '',
                    corp_name: '',
                },
                Addpay: {
                    id: '',
                    finance_create_status: '',
                    pay_type: 1,
                    pay_requestamount: "",
                    bank_account_id: "",
                    bank: "",
                    bank_account: "",
                    bank_account_type: '',
                    receiver: "",
                },
                taxs: ['0', '0.01', '0.03', '0.06', '0.13'],
                currentPage: 1,
                currentPage_detail: 1,
                enums: {},
                bank_account: [],
                bank: '',
                bank_list: {},
                detail_show: false,
                loading_search: false,
                loading_export: false,
                export_url: '',
                saopiao_show: false,
                dialogSaopiao: false,
                apply_pay_show: false,
                currentaccount_show: true,
                dialog_saopiao_check: false,
                apply_pay_check_show: false,
                procure_pay_check_show: false,
                apply_to_show: false,
                detail_list_delete_show: false,
                member_id: '',
                play: false,
                dialog_print: false,
                print_total: '',
                queryList_detail: {
                    page: '1',
                    per_page: '10',
                    package_no: ''
                },
                down_url: '',
                height: 0,
                rowHeight: 0,
            };
        },
        created() {
            if (this.$route.query.package_no) {
                this.queryList.package_no = this.$route.query.package_no
            }
            if (this.$route.query.status) {
                this.queryList.user_id =''
                this.queryList.w_check_status = 0
            }else{
                this.queryList.user_id = Number(util.cookies.get("user_id"));
            }
            this.fetchData();
        },
        mounted() {
            this.height = window.innerHeight - 180
            this.rowHeight = this.height / 10
        },
        watch: {
            $route(to, from) {
                if (to.name == "procure-package_list") {
                    if (this.$route.query.package_no) {
                        this.queryList.package_no = this.$route.query.package_no
                        this.fetchData();
                        this.queryList.user_id = Number(util.cookies.get("user_id"));
                    }
                    if (this.$route.query.status) {
                        this.queryList.user_id =''
                        this.queryList.w_check_status = 0
                        this.fetchData();
                    }
                }
            }
        },
        methods: {
            fetchData() {
                this.detail_show = false
                this.saopiao_show = false
                this.dialogSaopiao = false
                this.apply_pay_show = false
                this.currentaccount_show = false
                this.dialog_saopiao_check = false
                this.apply_pay_check_show = false
                this.procure_pay_check_show = false
                this.apply_to_show = false
                package_lists(this.queryList).then(res => {
                    if (this.loading_search) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.loading_search = false
                    }
                    res.data.data.forEach((items, index) => {
                        items.checked = false
                    })
                    this.list = res.data;
                    this.$refs.plTable.reloadData(res.data.data)
                    this.enums = res.enum;
                });
                listTotal("data/user_list?user_type=101").then(res => {
                    this.purchaseList = res.data;
                });
            },
            export_excel() {
                this.loading_export = true
                package_export(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.export_url = res.data
                        setTimeout(() => {
                            this.$refs.export_url.click()
                            this.loading_export = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_export = false
                    }
                }).catch(rr => {
                    this.loading_export = false
                })
            },
            sure_end(item) {
                update_complete_status(item.id, 1, this)
            },
            cancel_end(item) {
                update_complete_status(item.id, 0, this)
            },
            procure_check(item) {
                this.procure_pay_check_show = true
                package_finance(item.id).then(res => {
                    this.apply_check_data = res.data
                })
            },
            apply_check(item) {
                this.apply_pay_check_show = true
                package_finance(item.id).then(res => {
                    this.apply_check_data = res.data
                })
            },
            apply_to(item) {
                this.apply_to_show = true
                package_finance(item.id).then(res => {
                    this.apply_to_data = res.data
                })
            },
            saopiao_check(item) {
                this.dialog_saopiao_check = true
                this.saopaio_check_list = item.package_invoices
            },
            saopiao_pass(item) {
                let obj = {
                    id: item.id,
                    finance_check_status: 1
                }
                package_saopiao_verify(obj, this)
            },
            saopiao_cancel(item) {
                let obj = {
                    id: item.id,
                    finance_check_status: 0
                }
                package_saopiao_verify(obj, this)
            },
            cancel_package(item) {
                package_delete(item.id, this)
            },
            saopiao_delete(item) {
                package_saopiao_delete(item.id, this)
            },
            account(id) {
                this.member_id = id
                this.play = true;
            },
            noticeClose(even) {
                this.play = even;
                this.fetch_data();
            },
            change_bank() {
                this.bank_list = this.bank_account.filter(item => {
                    return item.id == this.bank;
                })[0];
            },
            change_pay_type(id) {
                if (id == 5) {
                    this.currentaccount_show = true
                } else {
                    this.currentaccount_show = false
                }
            },
            saopiao(item) {
                this.Add_invoice = {
                    id: '',
                    invoice_date: "",
                    invoice_number: "",
                    tax: '0.13',
                    total: "",
                    invoice_type: 1,
                    corp_name_new: "",
                    corp_name: item.corp_name
                },
                    this.dialogSaopiao = true
                this.Add_invoice.id = item.id
                this.Add_invoice.total = item.total
            },
            save_saopaio() {
                if (this.Add_invoice.corp_name_new != this.Add_invoice.corp_name) {
                    this.$message({
                        message: "收票公司不一致，请核实！",
                        type: "error"
                    });
                    return false;
                }
                package_saopiao_create(this.Add_invoice, this)
            },
            saopiao_info(item) {
                this.saopiao_show = true
                this.saopaio_list = item.package_invoices
            },
            apply_pay(item) {
                this.currentaccount_show = false
                this.Addpay.pay_type = 1
                this.apply_pay_show = true
                package_finance(item.id).then(res => {
                    this.apply_data = res.data
                    this.bank_account = res.enum.bank_accounts
                    if (res.data.currentaccount) {
                        this.Addpay.pay_type = 5
                        this.currentaccount_show = true
                    }
                    this.Addpay.id = item.id
                    this.Addpay.pay_requestamount = res.data.total
                    this.Addpay.finance_create_status = 1
                    // if((this.addContract.supplier_name=='上海易恩化学技术有限公司'||this.addContract.supplier_name=='上海迈瑞尔化学技术有限公司')&&Number(this.addContract.currentaccount)>=Number(this.addContract.total_money)){
                    //     this.Addpay.offset_amount=this.addContract.total_money;
                    //     this.Addpay.pay_amount=0
                    // }
                    let flag_person = false
                    let flag_company = false
                    this.bank_account.forEach((items, index) => {
                        if (this.apply_data.invoice_type_id == 2) {
                            if (items.type == 1 && items.is_default == 1) {
                                this.bank = items.id
                                this.bank_list = items
                                flag_person = true
                            }
                        } else {
                            if (items.type == 0 && items.is_default == 1) {
                                this.bank = items.id
                                this.bank_list = items
                                flag_company = true
                            }
                        }
                    })
                    if (!flag_person && this.apply_data.invoice_type_id == 2) {
                        for (var i = 0; i < this.bank_account.length; i++) {
                            if (this.bank_account[i].type == 1) {
                                this.bank = this.bank_account[i].id
                                this.bank_list = this.bank_account[i]
                                break;
                            }
                        }
                    }
                    if (!flag_company && this.apply_data.invoice_type_id !== 2) {
                        for (var i = 0; i < this.bank_account.length; i++) {
                            if (this.bank_account[i].type == 0) {
                                this.bank = this.bank_account[i].id
                                this.bank_list = this.bank_account[i]
                                break;
                            }
                        }
                    }
                })
            },
            delete_detail(row) {
                package_detail_delete(row, this)
            },
            cancel_apply(item) {
                let obj = {
                    id: item.id,
                }
                package_finance_cancel(obj, this)
            },
            procure_check_save(item, type) {
                let obj = {
                    id: item.id,
                    w_check_status: type
                }
                package_w_check(obj, this)
            },
            finance_check(item, type) {
                let obj = {
                    id: item.id,
                    finance_check_status: type
                }
                package_finance_check(obj, this)
            },
            finance_pay(item, type) {
                let obj = {
                    id: item.id,
                    finance_pay_status: type
                }
                package_finance_pay(obj, this)
            },
            save_finance() {
                this.Addpay.bank = this.bank_list.opening_bank
                this.Addpay.bank_account = this.bank_list.bank_account_number
                this.Addpay.bank_account_id = this.bank_list.id
                this.Addpay.bank_account_type = this.bank_list.type
                this.Addpay.receiver = this.bank_list.payee
                package_finance_create(this.Addpay, this)
            },
            querySearch(queryString, cb) {
                if (queryString != "") {
                    listTotal("data/member_list?type=2&name=" + queryString).then(res => {
                        this.results = res.data;
                        this.results = JSON.parse(
                            JSON.stringify(this.results).replace(/name/g, "value")
                        );
                        cb(this.results);
                    });
                }
            },
            detail(item) {
                if (item.invoice_status == 0 && item.finance_create_status != 1 && item.finance_check_status != 1 && item.finance_pay_status != 1) {
                    this.detail_list_delete_show = true
                }
                this.detail_show = true
                this.queryList_detail.package_no = item.package_no
                contract_detail_lists(this.queryList_detail).then(res => {
                    this.detail_list = res.data;
                })
            },
            print(item) {
                this.dialog_print = true
                this.print_total = Number(item.total).toFixed(2)
                let obj = {
                    package_no: item.package_no,
                    per_page: 1000
                }
                contract_detail_lists(obj).then(res => {
                    this.print_detail = res.data;
                })
            },
            down(item) {
                let obj = {
                    package_no: item.package_no,
                }
                package_down(obj).then(res => {
                    if (res && res.code === 0) {
                        this.down_url = res.data
                        setTimeout(() => {
                            this.$refs.down_url.click()
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            },
            handleSizeChange(val) {
                this.queryList.per_page = val
                this.fetchData();
            },
            handleSizeChange_detail(val) {
                this.queryList_detail.per_page = val
                contract_detail_lists(this.queryList_detail).then(res => {
                    this.detail_list = res.data;
                })
            },
            handleCurrentChange_detail(page_current) {
                this.queryList_detail.page = this.currentPage_detail = page_current
                contract_detail_lists(this.queryList_detail).then(res => {
                    this.detail_list = res.data;
                })
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            Search() {
                this.loading_search = true
                this.queryList.page = 1;
                this.currentPage = 1
                this.fetchData();
            },
        }
    };

    function obj(arr, object) {
        if (arr.length == 0) {
            for (let i in object) {
                arr.push(object[i]);
            }
        }
    }
</script>
