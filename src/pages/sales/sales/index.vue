<style lang="scss" scoped type="text/scss">
    .el-table {
        /deep/ td {
            padding: 8px 0px;
            font-size: 13px;
            .el-button {
                margin-top: 5px;
            }
            /deep/ .cell {
                padding: 0px;
            }
        }
        /deep/ th {
            font-size: 13px;
            padding: 8px 0;
            .el-button {
                // margin-top: 5px;
            }
            /deep/ .cell {
                padding: 0px;
            }
        }
    }

    .ym {
        /deep/ .el-checkbox__label {
            padding-left: 0px;
        }
        span {
            margin-left: 5px;
            font-size: 13px;
        }
    }

    .text_e {
        display: block;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .active {
        border-top: 1px solid #E5E5E5;
    }
    /deep/.plTableBox .el-table th{
        padding: 0px;
    }
    /deep/.plTableBox .el-table td{
        padding: 0px;
    }
    /deep/.plTableBox .el-table .cell {
         padding-left: 0;
         padding-right: 0;
         line-height: 22px;
         padding:3px 0px 3px 0px;
    }
    /deep/.plTableBox .el-table .umy-table-beyond {
        word-break:break-all!important;
        white-space: inherit!important;

    }
    /deep/.plTableBox .el-table{
        font-size: 13px!important;
    }
    /deep/ .plTableBox .el-table--border th:first-child .cell {
        padding-left: 0!important;
    }
    /deep/ .plTableBox .el-table--border td:first-child .cell {
        padding-left: 0!important;
    }
    /deep/.d2-container-full__body::-webkit-scrollbar {
        overflow-y:hidden;
    }
</style>
<template>
    <d2-container ref="a">
        <!-- 页眉 -->
        <div class="ym">
            <el-row type="flex" justify="start">
                <el-col :span="24">
                    <el-input placeholder="合同号/订单号" size="mini" type="textarea" autosize
                              v-model="queryList.origin_order_no" style="margin:0px 2px;width:200px;"
                              clearable></el-input>
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale1')"
                            v-model="queryList.invoice_number"
                            clearable
                            style="width:110px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="Invoice No"
                            v-model="queryList.invoice_no"
                            clearable
                            style="width:110px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="CAS"
                            v-model="queryList.cas"
                            clearable
                            style="width:110px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale2')"
                            v-model="queryList.contract_number"
                            clearable
                            style="width:120px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale3')"
                            v-model="queryList.customer_po"
                            clearable
                            style="width:120px;margin:0px 2px;"
                    ></el-input>
                    <el-date-picker
                            v-model="queryList.ship_start_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.index.sale4')"
                            size="mini"
                            format="yyyy-MM-dd"
                            style="width: 125px;margin:0px 2px;"
                    ></el-date-picker>
                    <el-date-picker
                            v-model="queryList.ship_end_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.index.sale5')"
                            size="mini"
                            format="yyyy-MM-dd"
                            style="width: 125px;margin:0px 2px;"
                    ></el-date-picker>
                    <el-date-picker
                            v-model="queryList.start_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.index.sale6')"
                            size="mini"
                            format="yyyy-MM-dd"
                            style="width: 125px;margin:0px 2px;"
                    ></el-date-picker>
                    <el-date-picker
                            v-model="queryList.end_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.index.sale7')"
                            size="mini"
                            format="yyyy-MM-dd"
                            style="width: 125px;margin:0px 2px;"
                    ></el-date-picker>
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale8')"
                            v-model="queryList.customer_name"
                            clearable
                            style="width:120px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale59')"
                            v-model="queryList.waybill_number"
                            clearable
                            style="width:120px;margin:0px 2px;"
                    ></el-input>
                    <el-select
                            size="mini"
                            v-model="queryList.sale_id"
                            :placeholder="$t('sale.index.sale9')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.invoice_type_id"
                            :placeholder="$t('sale.index.sale78')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in invoice_type" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.search_status"
                            :placeholder="$t('sale.index.sale10')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in search_status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.finish_status"
                            :placeholder="$t('sale.index.sale11')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in finish_status_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.quality_dispute"
                            :placeholder="$t('sale.index.sale75')"
                            style="width:120px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in quality_dispute_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.delivery_status"
                            :placeholder="$t('sale.index.sale13')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in delivery_status_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.receipt_status"
                            :placeholder="$t('sale.index.sale14')"
                            style="width:100px;margin:5px;"
                            clearable
                    >
                        <el-option v-for="item in receipt_status_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.invoice_status"
                            :placeholder="$t('sale.index.sale15')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in invoice_status_list" :key="item.id"  :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.preout_status"
                            :placeholder="$t('sale.index.sale66')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in preout_status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.assign_purchase"
                            :placeholder="$t('sale.index.sale67')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in assign_purchase_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.number_type"
                            :placeholder="$t('sale.index.sale68')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="(item,key,index) in number_type_info" :key="index" :label="item" :value="key"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.is_end"
                            :placeholder="$t('sale.index.sale60')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in is_end_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-date-picker
                            v-model="queryList.settled_month"
                            value-format="yyyyMM"
                            type="month"
                            :placeholder="$t('sale.index.sale74')"
                            size="mini"
                            format="yyyyMM"
                            style="width: 125px;margin:0px 2px;"
                    ></el-date-picker>
                    <el-select
                        v-model="queryList.corp_id"
                        :placeholder="$t('sale.add.sale8')"
                        clearable
                        size='mini'
                        filterable
                    >
                        <el-option v-for="i in GEnums.ACompany"  :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                    <el-checkbox v-model="queryList.is_old" true-label="1" false-label="" style="margin: 0 5px;">
                        {{$t('sale.index.sale70')}}
                    </el-checkbox>
                    <el-checkbox v-model="queryList.is_cancle" true-label="1" false-label="" style="margin: 0 5px;">
                        {{$t('sale.index.sale71')}}
                    </el-checkbox>
                    <el-checkbox v-model="queryList.is_over" true-label="-1" false-label="" style="margin: 0 5px;">
                        {{$t('sale.index.sale79')}}
                    </el-checkbox>
                    <!-- <el-checkbox v-model="queryList.is_pay_delayed" true-label="1"  false-label="" style="margin: 0 5px;">{{$t('sale.index.sale73')}}</el-checkbox>已延期 -->
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search()"
                    >{{$t('search')}}
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <div style="text-align:right;font-size:13px;">
            <span>共<u>{{list.total}}</u>个合同</span> /
            <span>共<u>{{contract_details_count}}</u>个子合同</span>
        </div>
        <!-- 页面 -->
        <div style="width: 100%;padding:1px;">
            <u-table
                    ref="plTable"
                    :min-height="height"
                    row-key="id"
                    use-virtual
                    :big-data-checkbox="checked"
                    :row-height="rowHeight"
                    border>
                <!-- <u-table-column type="selection" width="55" :selectable="selectable"/> -->
                <u-table-column align="center" width="60">
                <template slot="header" class="add_bu">
                 <el-button size="mini" type="primary" v-if="permissions.indexOf(460)>-1" @click="add()">{{$t('add')}}</el-button>
                </template>
                <template slot-scope="scope">
                <el-checkbox
                v-model="scope.row.checked"
                v-if="!scope.row.show_checkbox&&scope.row.if_invoice!=0&&!scope.row.is_old&&!scope.row.finish_status"
                @change="select_one(scope.row.checked,scope.row.id)"
                ></el-checkbox>
                </template>
                </u-table-column>
                <u-table-column align="center" :label="$t('sale.index.sale2')" width="120">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.finish_status&&scope.row.finish_status!=0">
                            <div slot="content">{{getEnumValue(finish_status_info,scope.row.finish_status)}}</div>
                            <span style="color:#FF560C;">{{scope.row.contract_number}}</span>
                        </el-tooltip>
                        <span v-else>
                            <span v-if="scope.row.re_invoicing_application==1" style="color:#409EFF;">{{scope.row.contract_number}}</span>
                            <span v-else-if="scope.row.re_invoicing_application==-1" style="color:red;">{{scope.row.contract_number}}</span>
                            <span v-else>{{scope.row.contract_number}}</span>
                        </span>
                        <el-tooltip placement="top" v-if="scope.row.quality_dispute&&scope.row.quality_dispute!=0">
                            <div slot="content">{{$t('sale.index.sale42')}}</div>
                            <i style="color:red;cursor: pointer;" class="el-icon-message-solid"></i>
                        </el-tooltip>
                        <br>
                        <span v-if="scope.row.pay_delay_days" style="color:red;font-size:12px;">{{$t('sale.index.sale73')}}:{{scope.row.pay_delay_days}}</span>
                        <!--已延期-->
                    </template>
                </u-table-column>
                <u-table-column align="center" label='PO' width="60">
                    <template slot-scope="scope">
                        <div>{{scope.row.customer_po}}</div>
                    </template>
                </u-table-column>
                <u-table-column align="center" :label="$t('sale.index.sale21')" >
                    <template slot-scope="scope">
                        <span v-if="showCustomer_sale(department_id,attr(scope.row,'sale.department_id'),attr(scope.row,'sale.id'))">
                            <span v-if="scope.row.customer_id2!=scope.row.customer_id">
                                <el-tooltip :content="'添加甲方:'+scope.row.customer_name2" placement="top" >
                                    <span style="color:red;">{{scope.row.customer_name}}</span>
                                </el-tooltip>
                            </span>
                            <span v-else>{{scope.row.customer_name}}</span>
                        </span>
                        <span v-else>********</span>
                    </template>
                </u-table-column><!-- 客户名称 -->
                <u-table-column align="center" :label="$t('sale.index.sale25')" width="70">
                    <template slot-scope="scope">
                        <span>{{scope.row.total_money}}{{getEnumValue(currencys,scope.row.currency_id)}}</span>
                    </template>
                </u-table-column><!-- 合同金额 -->
                <u-table-column align="center" :label="$t('sale.index.sale58')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip
                                class="item"
                                effect="dark"
                                :content="scope.row.created_at"
                                placement="top-start"
                        >
                            <span>{{scope.row.created_at.substring(0,10)}}</span>
                        </el-tooltip>
                    </template>
                </u-table-column><!-- 签约时间 -->
                <u-table-column align="center" :label="$t('sale.index.sale28')" width="70">
                    <template slot-scope="scope">
                        <div class="text_e" v-if="scope.row.status==1" style="background:#67C23A;">
                            {{getEnumValue(status_info,scope.row.status)}}
                        </div>
                        <div class="text_e" v-else-if="scope.row.status==0">
                            {{getEnumValue(status_info,scope.row.status)}}
                        </div>
                        <div class="text_e" v-else style="background:#F56C6C;">
                            {{getEnumValue(status_info,scope.row.status)}}
                        </div>
                    </template>
                </u-table-column><!-- 审核状态 -->
                <u-table-column align="center" label="现货/定制" width="70">
                    <template slot-scope="scope">
                        <!-- <div class="text_e" v-if="scope.row.finish_status&&scope.row.finish_status!=1"
                             style="background:#F56C6C;">
                            {{getEnumValue(finish_status_info,scope.row.finish_status)}}
                        </div>
                        <div class="text_e" v-else-if="scope.row.finish_status&&scope.row.finish_status==1"
                             style="background:#67C23A;">
                            {{getEnumValue(finish_status_info,scope.row.finish_status)}}
                        </div> -->
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                                <span v-for="i in scope.row.details"><span>{{getEnumValue(is_stock_info,parseInt(i.confirm_is_stock))}}</span>;</span>
                            </div>
                            <div class="text_e">
                                {{getEnumValue(is_stock_info,parseInt(scope.row.details[0].confirm_is_stock))}}...
                            </div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e">
                                {{getEnumValue(is_stock_info,parseInt(scope.row.details[0].confirm_is_stock))}}
                            </div>
                        </div>
                    </template>
                </u-table-column><!-- 结束状态 -->
                <u-table-column align="center" :label="$t('sale.index.sale67')" width="60">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
        <span v-for="i in scope.row.details">
        <span>
        {{getEnumValue(assign_purchase_info,i.assign_purchase)}}
        </span>;
        </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].assign_purchase==1"
                                 style="background:#E6A23C;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].assign_purchase==2"
                                 style="background:#67C23A;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}...
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}...
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e" v-if="scope.row.details[0].assign_purchase==1"
                                 style="background:#E6A23C;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].assign_purchase==2"
                                 style="background:#67C23A;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}
                            </div>
                        </div>
                    </template>
                </u-table-column><!-- 指派采购 -->
                <u-table-column align="center" :label="$t('sale.index.sale66')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
        <span v-for="i in scope.row.details">
        <span>
        {{getEnumValue(preout_status_info,i.preout_status)}}
        </span>;
        </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].preout_status==1"
                                 style="background:#67C23A;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==2"
                                 style="background:#E6A23C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==3"
                                 style="background:#F56C6C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e" v-if="scope.row.details[0].preout_status==1"
                                 style="background:#67C23A;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==2"
                                 style="background:#E6A23C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==3"
                                 style="background:#F56C6C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}
                            </div>
                        </div>
                    </template>
                </u-table-column><!-- 预占状态 -->
                <u-table-column align="center" :label="$t('sale.index.sale26')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
        <span v-for="i in scope.row.details">
        <span>
        {{getEnumValue(invoice_status_info,i.invoice_status)}}
        </span>;
        </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].invoice_status==1"
                                 style="background:#DF7201;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==2"
                                 style="background:#FFBDC8;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==4"
                                 style="background:#BFBFBF;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e" v-if="scope.row.details[0].invoice_status==1"
                                 style="background:#DF7201;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==2"
                                 style="background:#FFBDC8;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==4"
                                 style="background:#BFBFBF;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                        </div>
                    </template>
                </u-table-column><!-- 开票状态 -->
                <u-table-column align="center" :label="$t('sale.index.sale27')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
        <span v-for="i in scope.row.details">
        <span>{{getEnumValue(receipt_status_info,i.receipt_status)}};</span>
        </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].receipt_status==2"
                                 style="background:#E6A23C;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].receipt_status==3"
                                 style="background:#FFBDC8;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}...
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}...
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e" v-if="scope.row.details[0].receipt_status==2"
                                 style="background:#E6A23C;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].receipt_status==3"
                                 style="background:#FFBDC8;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}
                            </div>
                        </div>
                    </template>
                </u-table-column><!-- 收款状态 -->
                <u-table-column align="center" :label="$t('sale.index.sale38')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
        <span v-for="i in scope.row.details">
        <span>
        {{getEnumValue(delivery_status_info,i.delivery_status)}}
        </span>;
        </span>
                            </div>
                            <div :style="scope.row.delivery_if=='全部发货'?'background:#67C23A;':''">
                                {{scope.row.delivery_if}}
                            </div>
                        </el-tooltip>
                        <div v-else :style="scope.row.delivery_if=='全部发货'?'background:#67C23A;':''">
                            {{scope.row.delivery_if}}
                        </div>
                    </template>
                </u-table-column><!-- 发货状态 -->
                <u-table-column align="center" :label="$t('sale.index.sale60')" width="80">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
        <span v-for="i in scope.row.details">
        <span v-if="i.settled_month">{{i.settled_month}};</span>
        <span v-else>{{$t('sale.index.sale76')}};</span>
        </span>
                            </div>
                            <div class="text_e">
        <span v-if="scope.row.details.filter(i=>{return i.settled_month})[0]">
        {{scope.row.details.filter(i=>{return i.settled_month})[0].settled_month}}
        </span>
                                <span v-if="scope.row.details.filter(i=>{return i.settled_month})[0]">...</span>
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e">{{scope.row.details[0].settled_month}}</div>
                        </div>
                    </template>
                </u-table-column><!-- 结算状态 -->
                <u-table-column align="center" :label="$t('sale.index.sale39')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                                <span v-for="i in scope.row.details"><span>{{getEnumValue(prod_status_info,i.prod.status)}}</span>;</span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].prod.status==1" style="background:#67C23A;">
                                {{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}...
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}...
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e" v-if="scope.row.details[0].prod.status==1" style="background:#67C23A;">
                                {{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}
                            </div>
                        </div>
                    </template>
                </u-table-column>
                <u-table-column align="center" :label="$t('sale.index.sale77')" width="70">
                    <template slot-scope="scope">
                        <div>
                            {{getEnumValue(ordered_info,scope.row.ordered)}}
                        </div>
                    </template>
                </u-table-column>
                <!-- 产品审核 -->
                <u-table-column  align="center" width="160" class="button_delivery">
                    <template slot="header">
                        <div style="display:flex;align-items: center;padding:0px;line-height:normal;">
                            <el-button size="mini" type="primary"  style="margin-top:0px;margin:0 10px;" @click="select_all">
                                {{$t('sale.index.sale18')}}
                            </el-button>
                            <div style="padding:0px;">
                                <el-button size="mini" type="primary" @click="invoices()">{{$t('sale.index.sale17')}}
                                </el-button>
                                <br>
                                <!-- <el-button size="mini" type="primary" @click="Add_customer_list()" v-if="permission_names['sales_contract.set_customer_other']=='sales_contract.set_customer_other'">添加甲方</el-button> -->
                            </div>
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.has_purchase_express" @click="delivery(scope.row)"
                                   size="mini" style="display: inline-block;position: absolute;left: -8px;">
                            <i class="el-icon-truck" style="color: red;"></i>
                        </el-button>
                        <el-button v-if="permissions.indexOf(463)>-1"
                                   @click="detail(scope.row.id,scope.row.sale.department_id)" type="primary"
                                   size="mini">
                            {{$t('sale.index.sale40')}}
                        </el-button>
                        <el-dropdown split-button type="primary" size="mini" style="margin-left:5px;">
                            <span>{{$t('sale.index.sale64')}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div v-if="scope.row.status!=1&&scope.row.status!=3&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="revise(scope.row.id)">
                                            <span>修改合同</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="permission_names['sales_contract.set_customer_other']=='sales_contract.set_customer_other'&&scope.row.status==1">
                                        <div class="d2-text-center" @click="Add_customer(scope.row)">
                                            <span>添加甲方</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==0&&scope.row.finish_status!=1&&permissions.indexOf(464)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="check(scope.row.id)">
                                            <span><i class="el-icon-warning-outline" style="color: #F56C6C;"></i>{{$t('sale.index.sale41')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==3&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="contract_change_check(scope.row.id)">
                                            <span><i class="el-icon-warning-outline" style="color: #F56C6C;"></i>{{$t('sale.index.sale41')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="permissions.indexOf(466)>-1">
                                    <div v-if="scope.row.status!=3&&scope.row.quality_dispute==0&&!scope.row.is_old||scope.row.quality_dispute==null&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="dispute(scope.row.id,'1')">
                                            <span>{{$t('sale.index.sale42')}}</span>
                                        </div>
                                    </div>
                                    <div v-else-if="scope.row.status!=3&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="dispute(scope.row.id,'0')">
                                            <span>{{$t('sale.index.sale43')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.finish_status==0&&scope.row.status!=3&&permissions.indexOf(465)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="visible(scope.row.id)">
                                            <span>{{$t('sale.index.sale44')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status == 1&&scope.row.if_invoice!=0&&!scope.row.is_old&&!scope.row.finish_status">
                                        <div class="d2-text-center" @click="invoice(scope.row.id)">
        <span
                v-if="scope.row.re_invoicing_application==1||scope.row.re_invoicing_application==-1"
                style="color:#F56C6C;"
        >{{$t('sale.index.sale45')}}</span>
                                            <span v-else>{{$t('sale.index.sale46')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==1&&!scope.row.is_old&&!scope.row.finish_status">
                                        <div class="d2-text-center" @click="Receipt(scope.row)">
                                            <span>{{$t('sale.index.sale48')}}</span><!-- 批量 -->
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==1&&scope.row.finish_status==0&&permissions.indexOf(467)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="ship(scope.row.id)">
                                            <span>{{$t('sale.index.sale49')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status!=0&&scope.row.status!=3&&scope.row.finish_status==0&&permissions.indexOf(468)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="Preemption(scope.row.id)">
                                            <span>{{$t('sale.index.sale50')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status!=0&&scope.row.finish_status==0&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="notice(scope.row.contract_number)">
                                            <span>{{$t('sale.index.sale51')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status!=2&&!scope.row.is_old">
                                        <div class="d2-text-center" @click="contract_change(scope.row.id)">
                                            <span>{{$t('sale.index.sale55')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="scope.row.finish_status!=0">
                                    <div>
                                        <div class="d2-text-center" @click="resume(scope.row.id)">
                                            <span>{{$t('sale.index.sale72')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="!scope.row.is_old">
                                        <div class="d2-text-center" @click="download_pdf(scope.row)">
                                            <span>{{$t('sale.index.sale53')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="!scope.row.is_old">
                                        <div class="d2-text-center" @click="download_excel(scope.row.id)">
                                            <span>{{$t('sale.index.sale54')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </u-table-column><!-- 操作 -->
                <!--<u-table-column-->
                <!--v-for="item in list.data"-->
                <!--:key="item.id"-->
                <!--:resizable="item.resizable"-->
                <!--:show-overflow-tooltip="item.showOverflow"-->
                <!--:prop="item.prop"-->
                <!--:label="item.label"-->
                <!--:fixed="item.fixed"-->
                <!--:width="item.width"/>-->
            </u-table>
        </div>

        <!-- 快递 -->
        <el-dialog width="40%" :visible.sync="dialogDelivery" @close="deliveryClose()">
            <el-form>
                <el-form-item>
                    <table border="1" bordercolor="#E5E5E5" style="width:90%;border-collapse: collapse;margin: 0 auto;">
                        <tr>
                            <td>{{$t('sale.index.sale2')}}</td>
                            <td>{{$t('sale.index.sale69')}}</td>
                        </tr>
                        <tr v-for="(i,key,index) in delivery_list">
                            <td>{{key}}</td>
                            <td style="padding:0px;">
                                <table style="width:100%;">
                                    <tr v-for="(i_a,index_a) in i">
                                        <td style="padding:0px;">
                                            <div :class="{'active':(index_a%2 == 1)}">{{i_a}}</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item style="display:flex;justify-content: flex-end;">
                    <el-button @click="deliveryClose()" size="mini">{{$t('cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 结束说明 -->
        <el-dialog :title="$t('sale.index.sale52')" :visible.sync="dialogVisible" width="25%">
            <el-form label-width="80px" label-position="left">
                <el-form-item :label="$t('sale.index.sale52')" :required="true">
                    <el-select
                            v-model="finish_status"
                            clearable
                            filterable
                            size="mini"
                            :placeholder="$t('sale.index.sale52')"
                    >
                        <el-option v-for="(i,index) in finish_status_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_finish_status"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>

        <!-- 添加甲方 -->
        <el-dialog width="30%" :visible.sync="dialogCustomer" title="添加甲方">
            <el-form label-width="50px">
                <el-form-item label="甲方:">
                    <el-select
                            v-model="customer_form.customer_name2"
                            clearable
                            filterable
                            remote
                            reserve-keyword
                            :remote-method="supplyMethod_form"
                            @change="supplyChange()"
                            style="width:96%;"
                            size="small"
                    >
                        <el-option
                                v-for="item in supply_list_form"
                                :label="item.name"
                                :key="item.id"
                                :value="item.name"
                        >
                            <span style="float: left">{{ item.name }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.country_code }}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="display:flex;justify-content: flex-end;">
                    <el-button type="primary" @click="Customer_save()" size="mini">{{$t('save')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 添加甲方批量 -->
        <!-- <el-dialog width="50%" style="" :visible.sync="dialogCustomer_list" title="添加甲方">
          <el-form label-width="170px">
            <el-row type="flex" align="middle" >
              <el-col :span='14' style="max-height:260px;overflow-y:auto;">
                <div v-for="items in customer_form_list" >
                  <el-form-item :label="'('+items.contract_number+') 甲方:'">
                    <el-select
                      v-model="items.customer_name2"
                      clearable
                      filterable
                      remote
                      reserve-keyword
                      :remote-method="supplyMethod_form"
                      @change="supplyChange()"
                      style="width:200px;"
                      size="small"
                    >
                      <el-option
                        v-for="item in supply_list_form"
                        :label="item.name"
                        :key="item.id"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span='10'>
                <el-form-item label-width="100px" label="添加甲方:">
                  <el-select
                    v-model="customer_form.customer_name2"
                    clearable
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod_form"
                    @change="supplyChange()"
                    style="width:200px;"
                    size="small"
                  >
                    <el-option
                      v-for="item in supply_list_form"
                      :label="item.name"
                      :key="item.id"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item style="display:flex;justify-content: flex-end;">
              <el-button type="primary" @click="Customer_list_save()" size="mini">{{$t('save')}}</el-button>
              <el-button @click="dialogCustomer_list=false" size="mini">{{$t('cancel')}}</el-button>
            </el-form-item>
          </el-form>
        </el-dialog> -->

        <!-- PT询单 -->
        <el-dialog
                title="提示"
                :visible.sync="dialogPT"
                width="30%"
        >
            <div style="font-size:16px;">
        <span>订单号为
          <span v-for="(item,index) in pt_number">
            <span style="color:red;">{{item}}</span>
            <span v-if="index!=(pt_number.length-1)">,</span>
          </span>
          的不存在
        </span>
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPT = false" size='mini'>确定</el-button>
      </span>
        </el-dialog>

        <!-- 分页 -->
        <div style="display:flex;justify-content: space-between;">
            <div style="display:flex;align-items: flex-start;">
                <el-input placeholder="PT订单号" size="mini" type="textarea" autosize v-model="queryList_PT"
                          style="margin:10px 5px;width:200px;" clearable></el-input>
                <el-button
                        size="mini"
                        type="primary"
                        :loading="loading_search_pt"
                        @click="search_pt()"
                        style="margin-top:12px;"
                >检测
                </el-button>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="sizes,prev, pager, next"
                    :page-sizes="[10,20,50,100,200,300,500]"
                    :page-size="list.per_page"
                    @size-change="handleSizeChange"
                    :total="list.total"
            ></el-pagination>
        </div>

    </d2-container>
</template>
<script>
    import $ from "jquery";
    import pdf from "@/vue-pdf/src/vuePdfSss";
    import axios from "axios";
    import util from "@/libs/util";
    import {
        saler_contract_list,
        end_processing,
        quality_dispute,
        billing_application_view,
        automatic_delivery,
        DownLoad_pdf,
        download_pdf_flow,
        express_delivery,
        revoke_cancel,
        set_customer_other,
        batch_add_party_a,
        check_pt_number,
        download_pdf
    } from "@/api/sale";
    import {listTotal} from "@/api/prod";
    import {forceFileDownload} from "@/utils/index";
    import {mapState} from "vuex";

    export default {
        name: "sales-sales",
        components: {
            pdf
        },
        data() {
            return {
                forceFileDownload: forceFileDownload,
                department_id: '',
                contract_details_count: '',
                box: '',
                dialogDelivery: false,
                dialogCustomer: false,
                dialogCustomer_list: false,
                delivery_list: '',
                fname: '',
                export_url: '',
                permissions: JSON.parse(localStorage.getItem("permissions")),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                value_switch: true,
                searchInput: "",
                list: {data: []},
                listYe: [],
                listTotal: [],
                currentPage: 1,
                address: "",
                customer_form: {},
                customer_form_list: [],
                pt_number: [],
                queryList: {
                    page: "1",
                    origin_order_no: "",
                    date_start: "",
                    customer_name: "",
                    contract_number: "",
                    customer_po: "",
                    sale_id: "",
                    invoice_type_id: "",
                    finish_status: "",
                    invoice_status: "",
                    delivery_status: "",
                    receipt_status: "",
                    cas: "",
                    invoice_number: "",
                    start_date: "",
                    end_date: "",
                    ship_start_date: "",
                    ship_end_date: "",
                    quality_dispute: "",
                    waybill_number: '',
                    is_end: '',
                    search_status: '',
                    is_old: '',
                    is_cancle: '',
                    is_over:'',
                    preout_status: '',
                    assign_purchase: '',
                    number_type: '',
                    invoice_no: '',
                    per_page: '',
                    settled_month: '',
                    // is_pay_delayed:''
                },
                queryList_PT: '',
                checked: false,
                dialogVisible: false,
                dialogPT: false,
                prod_status_info: {},
                finish_status_info: [],
                preout_status_info: [],
                delivery_status_info: [],
                invoice_status_info: [],
                receipt_status_info: [],
                if_invoice_info: [],
                status_info: [],
                quality_dispute_info: [],
                salesList: [],
                trade_type: [],
                finish_status_list: [],
                delivery_status_list: [],
                receipt_status_list: [],
                invoice_status_list: [],
                search_status_info: [],
                supply_list: [],
                supply_list_form: [],
                units: [],
                assign_purchase_info: [],
                number_type_info: [],
                currencys: [],
                is_end_info: [],
                invoice_type: [],
                finish_status: "",
                saler_contract_id: "",
                loading: false,
                checked_all: false,
                supplyloading: false,
                ids: [],
                loading_search: false,
                loading_search_pt: false,
                ordered_info: [],
                is_over_info:[],
                is_stock_info:[],
                checked: true,
                height: 580,
                rowHeight: 50,
            };
        },
        created() {
            if (this.$route.query.status) {
                this.queryList.search_status = -1
            }
            if (this.$route.query.contract_number) {
                this.queryList.contract_number = this.$route.query.contract_number
            }
            this.fetchData();
            var lett = this;
            document.onkeydown = function (e) {
                var key = window.event.keyCode;
                if (key == 13) {
                    lett.search()
                }
            }
            this.department_id = util.cookies.get('department_id')
        },
        watch: {
            $route(to, from) {
                // if (to.name == "sales-sales") {
                if (this.$route.query.status) {
                    this.queryList.search_status = -1
                    this.fetchData();
                }
                else if (this.$route.query.contract_number) {
                    this.queryList.contract_number = this.$route.query.contract_number
                    this.fetchData();
                } else if (from.name == "sales-add") {
                    this.fetchData();
                } else if (from.name == "sales-change_check") {
                    this.fetchData();
                } else if (from.name == "sales-change") {
                    this.fetchData();
                } else if (from.name == "sales-detail") {
                    this.fetchData();
                } else if (from.name == "sales-generate") {
                    this.fetchData();
                } else if (from.name == "sales-procure") {
                    this.fetchData();
                } else if (from.name == "sales-alter") {
                    this.fetchData();
                } else if (from.name == "sales-check") {
                    this.fetchData();
                } else if (from.name == "sales-costApplication") {
                    this.fetchData();
                } else if (from.name == "sales-notice_detail") {
                    this.fetchData();
                } else if (from.name == "sales-preemption") {
                    this.fetchData();
                } else if (from.name == "finance-return_money_detail") {
                    this.fetchData();
                } else if (from.name == "sales-revise") {
                    this.fetchData();
                } else if (from.name == "procure-change") {
                    this.fetchData();
                } else {
                    if (util.cookies.get('sale_scroll')) {
                        this.$refs.a.$children[0].$el.firstElementChild.scrollTop = util.cookies.get('sale_scroll')
                    }
                }
            }
            // }
        },
        computed: {
            ...mapState("d2admin/user", ["info"]),
        },
        mounted() {
            this.box = this.$refs.a.$children[0].$el.firstElementChild
            this.box.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleScroll() {
                var hei = this.$refs.a.$children[0].$el.firstElementChild.scrollTop
                util.cookies.set('sale_scroll', hei)
            },
            handleSizeChange(val) {
                this.queryList.per_page = val;
                this.fetchData();
            },
            fetchData(a) {
                this.ids = [];
                listTotal("data/user_list?user_type=102").then(res => {
                    this.salesList = res.data;
                    this.$route.query.status = ''
                    if (!this.fname) {
                        this.fname = JSON.parse(JSON.stringify(this.info.name))
                        res.data.forEach(i => {
                            if (this.fname == i.name) {
                                this.queryList.sale_id = i.id;
                                this.fname = 1;
                            }
                        });
                    }
                    saler_contract_list(this.queryList).then(res => {
                        if (this.loading_search) {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                            this.loading_search = false;
                        }
                        res.data.list.data.forEach((items, index) => {
                            items.checked = false;
                            items.details.forEach((m, n) => {
                                if (m.notice_money > 0 || m.invoice_money > 0) {
                                    items.show_checkbox = true
                                }
                            })
                            if (items.details.filter(item => {
                                return item.delivery_status == 1
                            }).length == items.details.length) {
                                items.delivery_if = '未发货'
                            }
                            else if (items.details.filter(item => {
                                return item.delivery_status == 2
                            }).length == items.details.length) {
                                items.delivery_if = '部分发货'
                            }
                            else if (items.details.filter(item => {
                                return item.delivery_status == 3
                            }).length == items.details.length) {
                                items.delivery_if = '全部发货'
                            }
                            else if (items.details.filter(item => {
                                return item.delivery_status == 4
                            }).length == items.details.length) {
                                items.delivery_if = '超额发货'
                            }
                            else if (items.details.filter(item => {
                                return item.delivery_status == 2
                            }).length > 0 || items.details.filter(item => {
                                return item.delivery_status == 1
                            }).length > 0) {
                                items.delivery_if = '部分发货'
                            }
                            else if (items.details.filter(item => {
                                return item.delivery_status == 3
                            }).length > 0) {
                                if (items.details.filter(item => {
                                    return item.delivery_status == 1
                                }).length > 0) {
                                    items.delivery_if = '部分发货'
                                }
                                else if (items.details.filter(item => {
                                    return item.delivery_status == 4
                                }).length > 0) {
                                    items.delivery_if = '超额发货'
                                }
                            }
                        });
                        this.list = res.data.list;
                        this.$refs.plTable.reloadData(res.data.list.data)
                        this.list.per_page = parseInt(res.data.list.per_page)
                        this.contract_details_count = res.data.contract_details_count
                        this.prod_status_info = res.enum.prod_status_info;
                        this.finish_status_info = res.enum.finish_status_info;
                        this.delivery_status_info = res.enum.delivery_status_info;
                        this.invoice_status_info = res.enum.invoice_status_info;
                        this.receipt_status_info = res.enum.receipt_status_info;
                        this.if_invoice_info = res.enum.if_invoice_info;
                        this.status_info = res.enum.status_info;
                        this.search_status_info = res.enum.search_status_info;
                        this.quality_dispute_info = res.enum.quality_dispute_info;
                        this.trade_type = res.enum.trade_type;
                        this.finish_status_list = res.enum.finish_status_info;
                        this.delivery_status_list = res.enum.delivery_status_info;
                        this.receipt_status_list = res.enum.receipt_status_info;
                        this.invoice_status_list = res.enum.invoice_status_info;
                        this.invoice_type = res.enum.invoice_type;
                        this.units = res.enum.units;
                        this.currencys = res.enum.currencys;
                        this.is_end_info = res.enum.is_end_info
                        this.preout_status_info = res.enum.preout_status_info
                        this.assign_purchase_info = res.enum.assign_purchase_info
                        this.number_type_info = res.enum.number_type_info
                        this.ordered_info = res.enum.ordered_info
                        this.is_over_info = res.enum.is_over_info
                        this.is_stock_info = res.enum.is_stock_info
                        // this.enums=res.enum
                        // if (this.$route.query.status) {
                        //     this.queryList.search_status = -1
                        // }
                        // obj(this.finish_status_list, res.enum.finish_status_info);
                        // obj(this.delivery_status_list, res.enum.delivery_status_info);
                        // obj(this.receipt_status_list, res.enum.receipt_status_info);
                        // obj(this.invoice_status_list, res.enum.invoice_status_info);
                        if (a) {
                            document.getElementById("id").scrollIntoView();
                        }
                    });
                }).catch(rr => {this.loading_search=false})
            },
            resume(id) {
                revoke_cancel(id, this)
            },
            product_detail(prod_id) {
                if (prod_id) {
                    this.$router.push({
                        path: '/Prod/Add2',
                        query: {
                            id: prod_id
                        }
                    })
                }
            },
            search() {
                this.loading_search = true;
                this.queryList.page = 1;
                this.currentPage = 1
                this.fetchData();
            },
            search_pt() {
                this.loading_search_pt = true
                var obj = {
                    origin_order_no: this.queryList_PT
                }
                check_pt_number(obj).then(res => {
                    if (res && res.code == 0) {
                        if (res.data.length > 0) {
                            this.pt_number = res.data
                            this.dialogPT = true
                        } else {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            })
                        }
                        this.loading_search_pt = false
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_search_pt = false
                    }
                }).catch(rr => {
                    this.loading_search_pt = false
                })
            },
            Add_customer_list() {
                this.customer_form_list = []
                this.list.data.forEach(res => {
                    if (this.ids.filter(i => {
                        return i == res.id
                    })[0] && res.status == 1) {
                        this.customer_form_list.push({
                            id: res.id,
                            contract_number: res.contract_number,
                            customer_name2: res.customer_name2 ? res.customer_name2 : res.customer_name
                        })
                    }
                })
                this.customer_form = {
                    saler_contracts: this.customer_form_list,
                    customer_id2: '',
                    customer_name2: ''
                }
                this.supply_list_form = []
                if (this.customer_form_list.length > 0) {
                    this.dialogCustomer_list = true
                }
            },
            Add_customer(item) {
                this.customer_form = {
                    saler_contract_id: item.id,
                    customer_id2: item.customer_id2 ? item.customer_id2 : item.customer_id,
                    customer_name2: item.customer_name2 ? item.customer_name2 : item.customer_name
                }
                this.supply_list_form = []
                listTotal("data/member_list?type=1&name=" + this.customer_form.customer_name2).then(res => {
                    this.supply_list_form = res.data;
                    this.dialogCustomer = true
                });
            },
            Customer_list_save() {
                batch_add_party_a(this.customer_form, this)
            },
            Customer_save() {
                set_customer_other(this.customer_form, this)
            },
            supplyMethod(query) {
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
            supplyMethod_form(query) {
                if (query !== "") {
                    setTimeout(() => {
                        listTotal("data/member_list?type=1&name=" + query).then(res => {
                            this.supply_list_form = res.data;
                        });
                    }, 200);
                } else {
                    this.supply_list_form = [];
                }
            },
            supplyChange() {
                this.customer_form.customer_id2 = this.supply_list_form.filter(item => {
                    return item.name == this.customer_form.customer_name2;
                })[0] ? this.supply_list_form.filter(item => {
                    return item.name == this.customer_form.customer_name2;
                })[0].id : "";
            },
            contract_change(id) {
                this.$router.push({
                    path: "/sales/change",
                    name: "sales-change",
                    query: {
                        ids: id
                    }
                });
            },
            contract_change_check(id) {
                this.$router.push({
                    path: "/sales/change_check",
                    name: "sales-change_check",
                    query: {
                        ids: id,
                        check: true
                    }
                });
            },
            invoice(id) {
                let ids = [];
                ids.push(id);
                this.$router.push({
                    path: "/sales/invoice",
                    name: "sales-invoice",
                    query: {
                        ids: JSON.stringify(ids),
                        type: 1
                    }
                });
            },
            invoices() {
                // let obj = {
                //     ids: this.ids,
                //     type: 2
                // };
                this.$router.push({
                    path: "/sales/invoice",
                    name: "sales-invoice",
                    query: {
                        ids: JSON.stringify(this.ids),
                        type: 2
                    }
                });
                // billing_application_view(obj, this).then(res => {
                //     if (res && res.code == 0) {
                //         this.$router.push({
                //             path: "/sales/invoice",
                //             name: "sales-invoice",
                //             query: {
                //                 ids: JSON.stringify(this.ids),
                //                 type: 2
                //             }
                //         });
                //     } else {
                //         this.$message({
                //             message: res.msg,
                //             type: "error"
                //         });
                //     }
                // });
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            Receipt(item) {
                var arr = []
                item.details.forEach(res => {
                    arr.push(res.id)
                })
                this.$router.push({
                    path: "/commission/Receipt",
                    name: "commission-Receipt",
                    query: {
                        ids: JSON.stringify(arr)
                    }
                });
            },
            Preemption(id) {
                this.$router.push({
                    path: "/sales/preemption",
                    name: "sales-preemption",
                    query: {
                        id: id
                    }
                });
            },
            procure_application(id) {
                this.$router.push({
                    path: "/sales/procure",
                    name: "sales-procure",
                    query: {
                        id: id
                    }
                });
            },
            cost_application(id) {
                this.$router.push({
                    path: "/sales/costApplication",
                    name: "sales-costApplication",
                    query: {
                        id: id
                    }
                });
            },
            visible(id) {
                this.saler_contract_id = id;
                this.dialogVisible = true;
            },
            dispute(id, dispute) {
                let obj = {
                    saler_contract_id: id,
                    quality_dispute: dispute
                };
                this.$confirm("确定要执行此操作吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        quality_dispute(obj, this);
                    })
                    .catch(() => {
                    });
            },
            ship(id) {
                let obj = {
                    id: id
                };
                this.$confirm("确定要执行此操作吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        automatic_delivery(obj, this);
                    })
                    .catch(() => {
                    });
            },
            select_all() {
                this.checked_all = !this.checked_all;
                this.ids = [];
                this.list.data.forEach((items, index) => {
                    if (this.checked_all) {
                        items.checked = true;
                        if (!items.show_checkbox && items.if_invoice != 0 && !items.is_old && !items.finish_status) {
                            this.ids.push(items.id);
                        }
                    } else {
                        this.ids = [];
                        items.checked = false;
                    }
                });
            },
            select_one(checked, id) {
                this.ids = [];
                let num = 0;
                this.list.data.forEach((items, index) => {
                    if (items.checked && !items.show_checkbox && items.if_invoice != 0 && !items.is_old && !items.finish_status) {
                        // if (items.checked) {
                        num++;
                        this.ids.push(items.id);
                    }
                });
                if (num == this.list.data.length) {
                    this.checked_all = true;
                } else {
                    this.checked_all = false;
                }
            },
            detail(id, department_id) {
                this.$router.push({
                    path: "/sales/detail",
                    name: "sales-detail",
                    query: {
                        id: id,
                        department_id: department_id
                    }
                });
            },
            alter(id) {
                this.$router.push({
                    path: "/sales/alter",
                    name: "sales-alter",
                    query: {
                        id: id
                    }
                });
            },
            revise(id) {
                this.$router.push({
                    path: "/sales/revise",
                    name: "sales-revise",
                    query: {
                        id: id
                    }
                });
            },
            check(id) {
                this.$router.push({
                    path: "/sales/check",
                    name: "sales-check",
                    query: {
                        id: id
                    }
                });
            },
            add() {
                this.$router.push({
                    path: "/sales/add",
                    name: "sales-add",
                    query: {
                        sales_add: true
                    }
                });
            },
            notice(contract_number) {
                this.$router.push({
                    path: "/sales/notice",
                    name: "sales-notice",
                    query: {
                        contract_number: contract_number
                    }
                });
            },
            delivery(item) {
                this.dialogDelivery = true
                express_delivery(item.id).then(res => {
                    this.delivery_list = res.data
                })
            },
            deliveryClose() {
                this.dialogDelivery = false
            },
            download_pdf(item) {
                const token = util.cookies.get('token')
                axios({
                    method: "get",   // 根据个人请求状况，添加请求方式：post、get等。
                    url: process.env.VUE_APP_API + "api/v1/saler_contract/" + item.id + "/download_pdf",   // 添加对应请求的URL
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Version-Number': process.env.VUE_APP_Version
                    },
                    responseType: 'blob'   // 设置接收格式为blob格式
                }).then((res) => {
                    let binaryData = [];
                    binaryData.push(res.data);
                    let image = window.URL.createObjectURL(new Blob(binaryData, {type: 'application/pdf'}));
                    // 创建隐藏的可下载链接
                    var eleLink = document.createElement("a");
                    eleLink.download = item.contract_number;
                    eleLink.style.display = "none";
                    eleLink.href = image;
                    // 触发点击
                    document.body.appendChild(eleLink);
                    eleLink.click();
                    // 然后移除
                    document.body.removeChild(eleLink);
                });
            },
            download_excel(id) {
                listTotal("saler_contract/" + id + "/download_excel").then(res => {
                    if (res && res.code === 0) {
                        window.open(res.data);
                        // this.export_url = res.data
                        // setTimeout(()=>{
                        //   this.$refs.ee.click()
                        //   console.log(12)
                        // },200)

                    }
                });
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData(true);
            },
            save_finish_status() {
                let obj = {
                    saler_contract_id: this.saler_contract_id,
                    finish_status: this.finish_status
                };
                end_processing(obj, this);
            }
        }
    };

    function obj(arr, object) {
        for (let i in object) {
            arr.push(object[i]);
        }
    }

    var funDownload = function (content, filename) {
        // 创建隐藏的可下载链接
        var eleLink = document.createElement("a");
        eleLink.download = filename;
        eleLink.style.display = "none";
        // 字符内容转变成blob地址
        var blob = new Blob([content]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    };
</script>