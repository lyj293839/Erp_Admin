<style lang="scss" scoped type="text/scss">
    .el-table {
        /deep/td{
            padding: 5px 2px;
            font-size: 13px;
        }
        /deep/th{
            font-size: 13px;
            padding: 5px 2px;
        }
        /deep/.cell{
            padding: 0px !important;
            line-height: 20px;
        }
    }
    .ym{
        /deep/.el-checkbox__label{
            padding-left: 0px;
        }
    }
    .text_e{
        display:block;
        word-break:keep-all;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
    .active{
        border-top: 1px solid #E5E5E5;
    }
</style>
<template>
    <d2-container ref="a">
        <!-- 页眉 -->
        <div class="ym" >
            <el-row type="flex" justify="start">
                <el-col :span="24">
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale1')"
                            v-model="queryList.invoice_number"
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
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in salesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.search_status"
                            :placeholder="$t('sale.index.sale10')"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in search_status_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.finish_status"
                            :placeholder="$t('sale.index.sale11')"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in finish_status_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.quality_dispute"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in quality_dispute_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.delivery_status"
                            :placeholder="$t('sale.index.sale13')"
                            style="width:90px;margin:2px;"
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
                        <el-option v-for="item in receipt_status_list" :key="item.id"  :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.invoice_status"
                            :placeholder="$t('sale.index.sale15')"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in invoice_status_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.is_end"
                            :placeholder="$t('sale.index.sale60')"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in is_end_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.preout_status"
                            :placeholder="$t('sale.index.sale66')"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in preout_status_info"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.assign_purchase"
                            :placeholder="$t('sale.index.sale67')"
                            style="width:90px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in assign_purchase_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-checkbox v-model="queryList.is_old" true-label="1"  false-label="" style="margin: 0 5px;">{{$t('sale.index.sale70')}}</el-checkbox>
                    <el-checkbox v-model="queryList.is_cancle" true-label="1"  false-label="" style="margin: 0 5px;">{{$t('sale.index.sale71')}}</el-checkbox>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search()"
                    >{{$t('search')}}</el-button>
                </el-col>
            </el-row>
        </div>
        <div style="text-align:right;font-size:13px;">
        <span>共<u>{{list.total}}</u>个合同</span> /
        <span>共<u>{{contract_details_count}}</u>个子合同</span> 
    </div>
        <!-- 页面 -->
        <div style="width: 100%;padding:1px;">
            <el-table :data="list.data" border>
                <el-table-column align="center" width="50">
                    <template slot="header" class="add_bu">
                        <el-button size="mini" type="primary" v-if="permissions.indexOf(460)>-1" @click="add()">{{$t('add')}}</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox
                                v-if="!scope.row.show_checkbox&&scope.row.if_invoice!=0&&!scope.row.is_old&&!scope.row.finish_status"
                                v-model="scope.row.checked"
                                @change="select_one(scope.row.checked,scope.row.id)"
                        ></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('sale.index.sale2')" width="110">
                    <template slot-scope="scope">
                        <span :style="scope.row.re_invoicing_application==1?'color:#409EFF;':''">{{scope.row.contract_number}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label='PO' width="80">
                    <template slot-scope="scope">
                        <div>{{scope.row.customer_po}}</div>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('sale.index.sale21')" width="">
                    <template slot-scope="scope">
                        <span>{{scope.row.customer_name}}</span>
                    </template>
                </el-table-column><!-- 客户名称 -->
                <el-table-column align="center" :label="$t('sale.index.sale25')" width="80">
                    <template slot-scope="scope">
                        <span>{{scope.row.total_money}}{{getEnumValue(currencys,scope.row.currency_id)}}</span>
                    </template>
                </el-table-column><!-- 合同金额 -->
                <el-table-column align="center" :label="$t('sale.index.sale58')" width="75">
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
                </el-table-column><!-- 签约时间 -->
                <el-table-column align="center" :label="$t('sale.index.sale28')" width="70">
                    <template slot-scope="scope">
                        <div class="text_e" v-if="scope.row.status==1" style="background:#67C23A;">{{getEnumValue(status_info,scope.row.status)}}</div>
                        <div class="text_e" v-else-if="scope.row.status==0">{{getEnumValue(status_info,scope.row.status)}}</div>
                        <div class="text_e" v-else style="background:#F56C6C;">{{getEnumValue(status_info,scope.row.status)}}</div>
                    </template>
                </el-table-column><!-- 审核状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale29')" width="70">
                    <template slot-scope="scope">
                        <div class="text_e" v-if="scope.row.finish_status&&scope.row.finish_status!=1" style="background:#F56C6C;">
                            {{getEnumValue(finish_status_info,scope.row.finish_status)}}
                        </div>
                        <div class="text_e" v-else-if="scope.row.finish_status&&scope.row.finish_status==1" style="background:#67C23A;">
                            {{getEnumValue(finish_status_info,scope.row.finish_status)}}
                        </div>
                    </template>
                </el-table-column><!-- 结束状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale67')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                <span v-for="i in scope.row.details">
                  <span>
                    {{getEnumValue(assign_purchase_info,i.assign_purchase)}}
                  </span>;
                </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].assign_purchase==1" style="background:#E6A23C;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].assign_purchase==2" style="background:#67C23A;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}...
                            </div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e" v-if="scope.row.details[0].assign_purchase==1" style="background:#E6A23C;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].assign_purchase==2" style="background:#67C23A;">
                                {{getEnumValue(assign_purchase_info,scope.row.details[0].assign_purchase)}}
                            </div>
                        </div>
                    </template>
                </el-table-column><!-- 指派采购 -->
                <el-table-column align="center" :label="$t('sale.index.sale66')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                <span v-for="i in scope.row.details">
                  <span>
                    {{getEnumValue(preout_status_info,i.preout_status)}}
                  </span>;
                </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].preout_status==1" style="background:#67C23A;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==2" style="background:#E6A23C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==3" style="background:#F56C6C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}...
                            </div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e" v-if="scope.row.details[0].preout_status==1" style="background:#67C23A;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==2" style="background:#E6A23C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].preout_status==3" style="background:#F56C6C;">
                                {{getEnumValue(preout_status_info,scope.row.details[0].preout_status)}}
                            </div>
                        </div>
                    </template>
                </el-table-column><!-- 预占状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale26')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                <span v-for="i in scope.row.details">
                  <span>
                    {{getEnumValue(invoice_status_info,i.invoice_status)}}
                  </span>;
                </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].invoice_status==1" style="background:#DF7201;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==2" style="background:#FFBDC8;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==4" style="background:#BFBFBF;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...</div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e" v-if="scope.row.details[0].invoice_status==1" style="background:#DF7201;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==2" style="background:#FFBDC8;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==4" style="background:#BFBFBF;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}</div>
                        </div>
                    </template>
                </el-table-column><!-- 开票状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale27')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                <span v-for="i in scope.row.details">
                  <span>{{getEnumValue(receipt_status_info,i.receipt_status)}};</span>
                </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].receipt_status==2" style="background:#E6A23C;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].receipt_status==3" style="background:#FFBDC8;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}...
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}...</div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e" v-if="scope.row.details[0].receipt_status==2" style="background:#E6A23C;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].receipt_status==3" style="background:#FFBDC8;">
                                {{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(receipt_status_info,scope.row.details[0].receipt_status)}}</div>
                        </div>
                    </template>
                </el-table-column><!-- 收款状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale38')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                                <span v-for="i in scope.row.details"><span>{{getEnumValue(delivery_status_info,i.delivery_status)}}</span>;</span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].delivery_status==3" style="background:#F4939A;">
                                {{getEnumValue(delivery_status_info,scope.row.details[0].delivery_status)}}...
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(delivery_status_info,scope.row.details[0].delivery_status)}}...</div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e" v-if="scope.row.details[0].delivery_status==3" style="background:#F4939A;">
                                {{getEnumValue(delivery_status_info,scope.row.details[0].delivery_status)}}
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(delivery_status_info,scope.row.details[0].delivery_status)}}</div>
                        </div>
                    </template>
                </el-table-column><!-- 发货状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale60')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                                <span v-for="i in scope.row.details"><span>{{i.settled_month?$t('sale.index.sale61'):$t('sale.index.sale62')}}</span>;</span>
                            </div>
                            <div class="text_e">{{scope.row.details[0].settled_month?$t('sale.index.sale61'):$t('sale.index.sale62')}}...</div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e">{{scope.row.details[0].settled_month?$t('sale.index.sale61'):$t('sale.index.sale62')}}</div>
                        </div>
                    </template>
                </el-table-column><!-- 完结状态 -->
                <el-table-column align="center" :label="$t('sale.index.sale39')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                                <span v-for="i in scope.row.details"><span>{{getEnumValue(prod_status_info,i.prod.status)}}</span>;</span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].prod.status==1" style="background:#67C23A;">
                                {{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}...
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}...</div>
                        </el-tooltip>
                        <div v-else>
                            <div class="text_e" v-if="scope.row.details[0].prod.status==1" style="background:#67C23A;">
                                {{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}
                            </div>
                            <div class="text_e" v-else>{{getEnumValue(prod_status_info,scope.row.details[0].prod.status)}}</div>
                        </div>
                    </template>
                </el-table-column><!-- 产品审核 -->
                <el-table-column fixed="right" align="center" width="150" class="button_delivery">
                    <template slot="header">
                        <el-button size="mini" type="primary" @click="invoices()">{{$t('sale.index.sale17')}}</el-button>
                        <el-button size="mini" type="primary" @click="select_all">{{$t('sale.index.sale18')}}</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.has_purchase_express" @click="delivery(scope.row)" size="mini" style="display: inline-block;position: absolute;left: -8px;">
                            <i class="el-icon-truck" style="color: red;"></i>
                        </el-button>
                        <el-button v-if="permissions.indexOf(463)>-1" @click="detail(scope.row.id)" type="primary" size="mini">
                            {{$t('sale.index.sale40')}}
                        </el-button>
                        <el-dropdown split-button type="primary" size="mini" style="margin-left:5px;">
                            <span>{{$t('sale.index.sale64')}}</span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==0&&scope.row.finish_status!=1&&permissions.indexOf(464)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="check(scope.row.id)">
                                            <span><i class="el-icon-warning-outline" style="color: #F56C6C;"></i>{{$t('sale.index.sale41')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==3&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="contract_change_check(scope.row.id)">
                                            <span><i class="el-icon-warning-outline" style="color: #F56C6C;"></i>{{$t('sale.index.sale41')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status!=3&&permissions.indexOf(466)>-1&&scope.row.quality_dispute==0&&!scope.row.is_old||scope.row.quality_dispute==null&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="dispute(scope.row.id,'1')" >
                                            <span>{{$t('sale.index.sale42')}}</span>
                                        </div>
                                    </div>
                                    <div v-else-if="scope.row.status!=3&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="dispute(scope.row.id,'0')" >
                                            <span>{{$t('sale.index.sale43')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.finish_status==0&&scope.row.status!=3&&permissions.indexOf(465)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="visible(scope.row.id)">
                                            <span>{{$t('sale.index.sale44')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status == 1&&scope.row.if_invoice!=0&&!scope.row.is_old&&!scope.row.finish_status">
                                        <div class="d2-text-center"  @click="invoice(scope.row.id)">
                      <span
                              v-if="scope.row.re_invoicing_application==1"
                              style="color:#F56C6C;"
                      >{{$t('sale.index.sale45')}}</span>
                                            <span v-else>{{$t('sale.index.sale46')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==1&&!scope.row.is_old&&!scope.row.finish_status">
                                        <div class="d2-text-center"  @click="Receipt(scope.row)">
                                            <span>{{$t('sale.index.sale48')}}</span><!-- 批量 -->
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status==1&&scope.row.finish_status==0&&permissions.indexOf(467)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="ship(scope.row.id)">
                                            <span>{{$t('sale.index.sale49')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="scope.row.status!=0&&scope.row.status!=3&&scope.row.finish_status==0&&permissions.indexOf(468)>-1&&!scope.row.is_old">
                                        <div class="d2-text-center"  @click="Preemption(scope.row.id)">
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
                                <el-dropdown-item>
                                    <div>
                                        <div class="d2-text-center" @click="delivery(scope.row)">
                                            <span>{{$t('sale.index.sale65')}}</span>
                                        </div>
                                    </div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div v-if="!scope.row.is_old">
                                        <div class="d2-text-center" @click="download_pdf(scope.row.id)">
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
                </el-table-column><!-- 操作 -->
            </el-table>
        </div>

        <!-- 快递 -->
        <el-dialog width="40%" :visible.sync="dialogDelivery" @close="deliveryClose()">
            <el-form>
                <el-form-item>
                    <table border="1" bordercolor="#E5E5E5" style="width:90%;border-collapse: collapse;margin: 0 auto;">
                        <tr>
                            <td>合同号</td>
                            <td>快递单号</td>
                        </tr>
                        <tr v-for="(i,key,index) in delivery_list">
                            <td>{{key}}</td>
                            <td style="padding:0px;">
                                <table style="width:100%;">
                                    <tr v-for="(i_a,index_a) in i">
                                        <td style="padding:0px;"><div :class="{'active':(index_a%2 == 1)}">{{i_a}}</div></td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item style="display:flex;justify-content: flex-end;">
                    <el-button @click="deliveryClose()" size="mini">取消</el-button>
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
        <!-- 分页 -->
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            layout="sizes,prev, pager, next"
            :page-sizes="[10, 20,50,100]"
            :page-size="list.per_page"
            @size-change="handleSizeChange"
            :total="list.total"
    ></el-pagination>
    </d2-container>
</template>
<script>
    import $ from "jquery";
    import axios from "axios";
    import util from "@/libs/util";
    import {
        verify_list,
        end_processing,
        quality_dispute,
        billing_application_view,
        automatic_delivery,
        DownLoad_pdf,
        download_pdf_flow,
        express_delivery
    } from "@/api/sale";
    import { listTotal } from "@/api/prod";
    import { forceFileDownload } from "@/utils/index";
    import { mapState } from "vuex";
    export default {
        name: "sales-list_check",
        data() {
            return {
                contract_details_count:'',
                forceFileDownload: forceFileDownload,
                box:'',
                dialogDelivery:false,
                delivery_list:'',
                fname: '',
                export_url:'',
                permissions: JSON.parse(localStorage.getItem("permissions")),
                value_switch: true,
                searchInput: "",
                list: { data: [] },
                listYe: [],
                listTotal: [],
                currentPage: 1,
                address: "",
                queryList: {
                    page: "1",
                    date_start: "",
                    customer_name: "",
                    contract_number: "",
                    customer_po: "",
                    sale_id: "",
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
                    waybill_number:'',
                    is_end:'',
                    search_status:'',
                    is_old:'',
                    is_cancle:'',
                    preout_status:'',
                    assign_purchase:'',
                    per_page:10
                },
                checked: false,
                dialogVisible: false,
                prod_status_info: {},
                finish_status_info: [],
                preout_status_info:[],
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
                search_status_info:[],
                supply_list: [],
                units: [],
                assign_purchase_info:[],
                currencys: [],
                is_end_info:[],
                finish_status: "",
                saler_contract_id: "",
                loading: false,
                checked_all: false,
                supplyloading: false,
                ids: [],
                loading_search: false
            };
        },
        created() {
            if (this.$route.query.status) {
                this.queryList.search_status = -1
            }
            this.fetchData();
        },
        watch: {
            $route(to, from) {
                // if (to.name == "sales-sales") {
                if (this.$route.query.status) {
                    this.queryList.search_status = -1
                    this.fetchData();
                }else if(from.name == "sales-add"){
                    this.fetchData();
                }else if(from.name == "sales-change_check"){
                    this.fetchData();
                }else if(from.name == "sales-change"){
                    this.fetchData();
                }else if(from.name == "sales-detail"){
                    this.fetchData();
                }else if(from.name == "sales-generate"){
                    this.fetchData();
                }else if(from.name == "sales-procure"){
                    this.fetchData();
                }else if(from.name == "sales-alter"){
                    this.fetchData();
                }else if(from.name == "sales-check"){
                    this.fetchData();
                }else if(from.name == "sales-costApplication"){
                    this.fetchData();
                }else if(from.name == "sales-notice_detail"){
                    this.fetchData();
                }else if(from.name == "sales-preemption"){
                    this.fetchData();
                }else if(from.name == "finance-return_money_detail"){
                    this.fetchData();
                }else if(from.name == "procure-change"){
                    this.fetchData();
                }else{
                    if(util.cookies.get('sale_scroll')){
                        this.$refs.a.$children[0].$el.firstElementChild.scrollTop = util.cookies.get('sale_scroll')
                    }
                }
            }
            // }
        },
        computed: {
            ...mapState("d2admin/user", ["info"])
        },
        mounted() {
            this.box = this.$refs.a.$children[0].$el.firstElementChild
            this.box.addEventListener('scroll', this.handleScroll, true)
        },
        methods: {
            handleScroll() {
                var hei = this.$refs.a.$children[0].$el.firstElementChild.scrollTop
                util.cookies.set('sale_scroll',hei)
            },
            handleSizeChange(val) {
              this.queryList.per_page = val;
              this.fetchData();
            },
            fetchData(a) {
                this.ids = [];
                listTotal("data/user_list?user_type=102").then(res => {
                    this.salesList = res.data;
                    // if (JSON.stringify(this.$route.query)!='{}') {
                    //   this.queryList = this.$route.query;
                    // }
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

                    verify_list(this.queryList).then(res => {
                        if (this.loading_search) {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                            this.loading_search = false;
                        }
                        res.data.list.data.forEach((items, index) => {
                            items.checked = false;
                            items.details.forEach((m,n)=>{
                                if(m.notice_money>0||m.invoice_money>0){
                                    items.show_checkbox=true
                                }
                            })
                            // res.enum.status_info.forEach((m, n) => {
                            //     if (items.status == m.id) {
                            //         items.status_name = m.name
                            //     }
                            // })
                        });
                        this.list = res.data.list;
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
                        this.units = res.enum.units;
                        this.currencys = res.enum.currencys;
                        this.is_end_info = res.enum.is_end_info
                        this.preout_status_info = res.enum.preout_status_info
                        this.assign_purchase_info = res.enum.assign_purchase_info
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
                    }).catch(rr => {this.loading_search=false})
                });
            },
            product_detail(prod_id) {
                if(prod_id){
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
                this.currentPage=1
                this.fetchData();
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
                        check:true
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
                let obj = {
                    ids: this.ids,
                    type: 2
                };
                billing_application_view(obj, this).then(res => {
                    if (res && res.code == 0) {
                        this.$router.push({
                            path: "/sales/invoice",
                            name: "sales-invoice",
                            query: {
                                ids: JSON.stringify(this.ids),
                                type: 2
                            }
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
                item.details.forEach(res=>{
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
                    .catch(() => {});
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
                    .catch(() => {});
            },
            select_all() {
                this.checked_all = !this.checked_all;
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
            select_one(checked, id) {
                if (checked) {
                    this.ids.push(id);
                } else {
                    this.ids.forEach((items, index) => {
                        if (items == id) {
                            this.ids.splice(index, 1);
                        }
                    });
                }
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
            detail(id) {
                this.$router.push({
                    path: "/sales/detail",
                    name: "sales-detail",
                    query: {
                        id: id
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
            check(id) {
                this.$router.push({
                    path: "/sales/check",
                    name: "sales-check",
                    query: {
                        id: id,
                        name:'sales-list_check'
                    }
                });
            },
            add() {
                this.$router.push({
                    path: "/sales/add",
                    name: "sales-add"
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
            delivery(item){
                this.dialogDelivery = true
                express_delivery(item.id).then(res=>{
                    this.delivery_list = res.data
                })
            },
            deliveryClose(){
                this.dialogDelivery = false
            },
            download_pdf(id) {
                listTotal("saler_contract/" + id + "/download_pdf").then(res => {
                    if (res && res.code === 0) {
                        // window.open(res.data);
                        let fileNames = res.data.split("/");
                        let fileName = fileNames[fileNames.length - 1];
                        axios({
                            method: "get",
                            withCredentials: false,
                            url: res.data,
                            responseType: "arraybuffer"
                        })
                            .then(response => {
                                this.forceFileDownload(response.data, fileName);
                            })
                            .catch(() => console.log("error occured"));
                    }
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
    var funDownload = function(content, filename) {
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