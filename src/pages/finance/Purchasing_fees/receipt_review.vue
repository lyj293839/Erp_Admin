<style lang="scss" scoped type="text/scss">
    .heard_top {
        .el-autocomplete {
            width: 180px;
            margin: 2px;
        }
        .el-input {
            width: 130px;
            margin: 2px;
        }
        .el-select {
            width: 90px;
            margin: 2px;
        }
        div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
    }
    .dialog {
        .el-input {
            width: 200px;
        }
        .el-select {
            width: 200px;
        }
    }
    .table{
        border-collapse: collapse;
    }
    .table th,td{
        padding: 10px;
    }
</style>
<template>
    <d2-container>
        <div class="heard_top">
            <div>
                <el-autocomplete
                        size="mini"
                        clearable
                        v-model="queryList.supplier_name"
                        :fetch-suggestions="querySearch"
                        placeholder="供应商"
                        :trigger-on-focus="false"
                        @select="handleSelect"
                ></el-autocomplete>
                <el-input placeholder="CAS" size="mini"
                              v-model="queryList.cas" 
                              clearable></el-input>
                <el-select placeholder="收票公司" size="mini" style="width:180px;" clearable v-model="queryList.corp_id">
                    <el-option
                            v-for="item in enums.company"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-input placeholder="发票号" class="d2-ml-5" clearable size="mini" v-model="queryList.invoice_number" ></el-input>
                <el-input placeholder="合同编号" class="d2-ml-5" size="mini" v-model="queryList.contract_number" clearable></el-input>
                <el-select placeholder="采购员" size="mini" class="d2-ml-5" clearable v-model="queryList.purchase_user_id">
                    <el-option
                            v-for="item in purchaseList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-select
                        placeholder="请选择"
                        size="mini"
                        clearable
                        v-model="queryList.status">
                    <el-option
                            v-for="item in enums.check_status"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                    ></el-option>
                </el-select>
                <el-date-picker
                        size="mini"
                        type="date"
                        clearable
                        class="d2-ml-5"
                        placeholder="合同开始日期"
                        v-model="queryList.date_from"
                        value-format="yyyy-MM-dd"
                        style="width: 130px;"
                ></el-date-picker>
                <span>至</span>
                <el-date-picker
                        size="mini"
                        clearable
                        type="date"
                        placeholder="合同截止日期"
                        v-model="queryList.date_to"
                        value-format="yyyy-MM-dd"
                        style="width: 130px;"
                ></el-date-picker>

                <el-date-picker
                        size="mini"
                        type="date"
                        clearable
                        class="d2-ml-5"
                        placeholder="收票开始日期"
                        v-model="queryList.kp_date_start"
                        value-format="yyyy-MM-dd"
                        style="width: 130px;"
                ></el-date-picker>
                <span>至</span>
                <el-date-picker
                        size="mini"
                        clearable
                        type="date"
                        placeholder="收票结束日期"
                        v-model="queryList.kp_date_end"
                        value-format="yyyy-MM-dd"
                        style="width: 130px;"
                ></el-date-picker>

                <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
                <el-button
                        v-if="permissions.indexOf(554)>-1"
                        class="d2-ml-5"
                        size="mini"
                        type="primary"
                        :loading="loading_purchase_invoice"
                        @click="export_purchase_invoice"
                >入库凭证
                </el-button>
                <a :href="export_purchase_invoice_url" ref="export_purchase_invoice_url" hidden></a>
                <el-button
                        v-if="permissions.indexOf(596)>-1&&queryList.status!=10"
                        class="d2-ml-5"
                        size="mini"
                        type="primary"
                        :loading="loading_purchase_invoice2"
                        @click="export_purchase_invoice2"
                >导出Excel
                </el-button>
                <a :href="export_purchase_invoice_url2" ref="export_purchase_invoice_url2" hidden></a>
            </div>
        </div>

        <!-- 页面 -->
        <el-table
                :data="list.data"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                size="mini"
                style="font-size: 12px"
        >
            <el-table-column label="#ID" width="80px;">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="合同编号" width="120px;">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="'合同时间:'+attr(scope.row,'contract_detail.created_at')" placement="top-start">
                        <span>{{attr(scope.row,'contract_detail.procurement_contract_number')}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="收票公司" width="200px;">
                <template slot-scope="scope">{{attr(scope.row,'contract.corp_name')}}</template>
            </el-table-column>
            <el-table-column label="供应商" width="200px;">
                <template slot-scope="scope">{{scope.row.supplier_name}}</template>
            </el-table-column>
            <el-table-column label="发票号" width="100px;">
                <template slot-scope="scope">{{scope.row.invoice_number}}</template>
            </el-table-column>
            <el-table-column label="CAS"  width="100px">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="'产品名称:'+scope.row.name_cn+' / '+scope.row.name" placement="top-start">
                        <span>{{scope.row.cas}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="合同金额" width="120px">
                <template slot-scope="scope">
                    ￥{{attr(scope.row,'contract_detail.total_price')}}
                </template>
            </el-table-column>
            <el-table-column label="不含税金额" width="120px">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="'税额:'+scope.row.tax_amount" placement="top-start">
                    <span>￥{{scope.row.amount}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="收票余额" width="120px">
                <template slot-scope="scope">
                    <span v-if="scope.row.contract_detail">￥{{scope.row.contract_detail.invoice_yue}}</span>
                </template>
            </el-table-column>
            <el-table-column label="采购人员" width="100px">
                <template slot-scope="scope">
                    {{attr(scope.row,'contract_detail.purchase_user.name')}}
                </template>
            </el-table-column>
            <el-table-column label="开票日期" >
                <template slot-scope="scope">
                    {{scope.row.invoice_date}}
                </template>
            </el-table-column>
            <el-table-column label="审核状态"  width="100px">
                <template slot-scope="scope">
                    {{getEnumValue(enums.status,scope.row.status)}}
                </template>
            </el-table-column>
            <el-table-column label="扫票时间"  >
                <template slot-scope="scope">
                    {{scope.row.created_at}}
                </template>
            </el-table-column>
            <el-table-column  label="到票时间">
                <template slot-scope="scope">
                    {{scope.row.invoice_receiver_date}}
                </template>
            </el-table-column>
            <el-table-column label="扫票人" width="60">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.user?scope.row.user.name:''}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column v-if="queryList.status==10" label="删除原因">
                <template slot-scope="scope">
                    {{scope.row.delete_note}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px" fixed="right">
                <template slot="header" slot-scope="scope">
                    <div v-if="queryList.status!=10">
                        <el-checkbox v-model="checked_all" @change="select_all" class="d2-mr-5"></el-checkbox>
                        <el-button type="primary" size="mini" @click="handle_invoice_more()">批量审</el-button>
                        <el-button type="primary" size="mini" @click="delete_invoice_more_()">批量删</el-button>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="checked_all" @change="select_all" class="d2-mr-5"></el-checkbox>
                        <el-button type="primary" size="mini" @click="recovery_more()">批量恢复</el-button>
                    </div>
                </template>
                <template slot-scope="scope">
                    <div v-if="queryList.status!=10">
                        <div v-if="scope.row.package_no" style="cursor: pointer;" @click="saopiao_check(scope.row)">{{scope.row.package_no}}</div>
                         <div v-else>
                            <el-checkbox v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row)" class="d2-mr-5"></el-checkbox>
                            <el-button type="primary" size="mini" @click="handle_invoice(scope.row)" >审核</el-button>
                            <el-button type="primary" size="mini" @click="delete_invoice_(scope.row)" >删除</el-button>
                         </div>
                    </div>
                    <div v-else>
                        <el-checkbox v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row)" class="d2-mr-5"></el-checkbox>
                        <el-button type="primary" size="mini" @click="recovery(scope.row)" >恢复</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="提示"
                :visible.sync="dialogDelete"
                width="30%"
                >
            <el-form ref="form" label-width="80px">
                <el-form-item label="删除原因">
                    <el-input type="textarea" v-model="delete_info.delete_note"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogDelete = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="delete_invoice" size="mini">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 审核 -->
        <el-dialog :visible.sync="dialog_Add" @close="close_()" width="90%" class="dialog">
            <div style="color: red;text-align: center;margin-bottom: 10px;">收票公司：{{attr(check_list,'contract.corp_name')}}</div>
            <table class="table" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;width: 100%;">
                <tr>
                    <th>CAS</th>
                    <th width="200">产品名称</th>
                    <th>纯度</th>
                    <th>发票号</th>
                    <th width="120">数量</th>
                    <th>单价</th>
                    <th>税率</th>
                    <th>税额</th>
                    <th>不含税金额</th>
                    <th>总金额</th>
                    <th>提交货时间</th>
                    <th>备注</th>
                    <th>发票</th>
                    <th>是否报关</th>
                    <th>操作</th>
                </tr>
                <tr >
                    <td>{{check_list.contract_detail.cas}}</td>
                    <td>
                        {{check_list.contract_detail.name_cn}}
                        <br>
                        {{check_list.contract_detail.name}}
                    </td>
                    <td>{{check_list.contract_detail.purity}}</td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                        >
                            <el-input  clearable size="mini" v-model="check_list.invoice_number"></el-input>
                            <span slot="reference">{{check_list.invoice_number}}</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible1">
                            <el-input  clearable size="mini" v-model="check_list.quantity" @input="change_quantity"></el-input>
                            <span slot="reference">{{check_list.quantity}}</span>
                        </el-popover>
                        <el-select
                                placeholder="请选择"
                                style="margin:0px 10px;width: 60px;display: inline-block"
                                size="mini"
                                clearable
                                v-model="check_list.quantity_unit">
                            <el-option
                                    v-for="item in enums.units"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible2">
                            <el-input  clearable size="mini" v-model="check_list.price" @input="change_price"></el-input>
                            <span slot="reference">{{check_list.price}}￥</span>
                        </el-popover>
                    </td>
                     <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible6">
                             <el-select
                                placeholder="请选择"
                                style="margin:0px 10px;width: 100px;display: inline-block"
                                size="mini"
                                clearable
                                v-model="check_list.tax"
                                @change='change_tax'>
                            <el-option
                                    v-for="item in rates"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                            ></el-option>
                        </el-select>
                            <span slot="reference">{{check_list.tax}}</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible3">
                            <el-input  clearable size="mini" v-model="check_list.tax_amount" @input="change_tax_amount"></el-input>
                            <span slot="reference">{{check_list.tax_amount}}￥</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible4">
                            <el-input  clearable size="mini" v-model="check_list.amount" @input="change_amount"></el-input>
                            <span slot="reference">{{check_list.amount}}￥</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible5">
                            <el-input  clearable size="mini" v-model="check_list.total" @input="change_total"></el-input>
                            <span slot="reference">{{check_list.total}}￥</span>
                        </el-popover>
                    </td>
                    <td>{{check_list.contract_detail.delivery_date}}</td>
                    <td>
                        <!--<el-popover-->
                                <!--placement="top"-->
                                <!--width="120"-->
                                <!--v-model="visible6">-->
                            <!--<el-input  clearable size="mini" v-model="check_list.note"></el-input>-->
                            <!--<span slot="reference">{{check_list.note}}</span>-->
                        <!--</el-popover>-->
                        <el-input  clearable size="mini" v-model="check_list.note" style="width: 100px"></el-input>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                v-model="visible7">
                            <el-select
                                    placeholder="请选择"
                                    style="margin:0px 10px;width: 120px;display: inline-block"
                                    size="mini"
                                    clearable
                                    v-model="check_list.invoice_type"
                                    >
                                <el-option
                                        v-for="item in enums.Invoicetype"
                                        :key="item"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                            <span slot="reference">{{getEnumValue(enums.Invoicetype,check_list.invoice_type)}}</span>
                        </el-popover>
                    </td>
                    <td>{{getEnumValue(enums.declare_info,check_list.contract_detail.if_declare)}}</td>
                    <td><el-button type="primary" size="mini" @click="save">保存</el-button></td>
                </tr>
            </table>
            <div class="d2-mt-20">
            <el-button type="primary" size="mini" @click="saveVerifyInvoice(check_list,1)" :loading="save_fy1">审核通过</el-button>
            <!--<el-button type="primary" size="mini" @click="saveVerifyInvoice(check_list,-1)" :loading="save_fy2">驳回</el-button>-->
            <el-button type="danger"  size="mini" @click="saveVerifyInvoice(check_list,0)" :loading="save_fy3">取消审核</el-button>
            </div>
        </el-dialog>
         <!-- 批量审核 -->
        <el-dialog :visible.sync="dialog_Add_more" @close="close_more()" width="90%" class="dialog">
            <div style="color: red;margin-bottom: 10px;">收票公司：<span v-for="(item,index) in companys" :key="index">{{item}};</span></div>
            <table class="table" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;width: 100%;">
                <tr>
                    <th width="20">ID</th>
                    <th>合同号</th>
                    <th>CAS</th>
                    <th width="200">产品名称</th>
                    <th>纯度</th>
                    <th>发票号</th>
                    <th width="120">数量</th>
                    <th>单价</th>
                    <th>税率</th>
                    <th>税额</th>
                    <th>不含税金额</th>
                    <th>总金额</th>
                    <th>提交货时间</th>
                    <th>备注</th>
                    <th>发票</th>
                    <th>是否报关</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item,index) in check_list_more" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{attr(item,'contract_detail.procurement_contract_number')}}</td>
                    <td>{{item.contract_detail.cas}}</td>
                    <td>
                        {{item.contract_detail.name_cn}}
                        <br>
                        {{item.contract_detail.name}}
                    </td>
                    <td>{{item.contract_detail.purity}}</td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                        >
                            <el-input  clearable size="mini" v-model="item.invoice_number" @input="change_invoice_number_pl(item,index)"></el-input>
                            <span slot="reference">{{item.invoice_number}}</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                >
                            <el-input  clearable size="mini" v-model="item.quantity" @input="change_quantity_pl(item,index)"></el-input>
                            <span slot="reference">{{item.quantity}}</span>
                        </el-popover>
                        <el-select
                                placeholder="请选择"
                                style="margin:0px 10px;width: 60px;display: inline-block"
                                size="mini"
                                @change="item.save_show=true"
                                clearable
                                v-model="item.quantity_unit">
                            <el-option
                                    v-for="item in enums.units"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                               >
                            <el-input  clearable size="mini" v-model="item.price" @input="change_price_pl(item,index)"></el-input>
                            <span slot="reference">{{item.price}}￥</span>
                        </el-popover>
                    </td>
                     <td>
                        <el-popover
                                placement="top"
                                width="120"
                                >
                             <el-select
                                placeholder="请选择"
                                style="margin:0px 10px;width: 100px;display: inline-block"
                                size="mini"
                                clearable
                                v-model="item.tax"
                                @change='change_tax_pl(item,index)'>
                            <el-option
                                    v-for="item in rates"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                            ></el-option>
                        </el-select>
                            <span slot="reference">{{item.tax}}</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                >
                            <el-input  clearable size="mini" v-model="item.tax_amount" @input="change_tax_amount_pl(item,index)"></el-input>
                            <span slot="reference">{{item.tax_amount}}￥</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                                >
                            <el-input  clearable size="mini" v-model="item.amount" @input="change_amount_pl(item,index)"></el-input>
                            <span slot="reference">{{item.amount}}￥</span>
                        </el-popover>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                               >
                            <el-input  clearable size="mini" v-model="item.total" @input="change_total_pl(item,index)"></el-input>
                            <span slot="reference">{{item.total}}￥</span>
                        </el-popover>
                    </td>
                    <td>{{item.contract_detail.delivery_date}}</td>
                    <td>
                        <!--<el-popover-->
                                <!--placement="top"-->
                                <!--width="120"-->
                                <!--v-model="visible6">-->
                            <!--<el-input  clearable size="mini" v-model="check_list.note"></el-input>-->
                            <!--<span slot="reference">{{check_list.note}}</span>-->
                        <!--</el-popover>-->
                        <el-input  clearable size="mini" v-model="item.note" @input='item.save_show=true' style="width: 100px"></el-input>
                    </td>
                    <td>
                        <el-popover
                                placement="top"
                                width="120"
                               >
                            <el-select
                                    placeholder="请选择"
                                    style="margin:0px 10px;width: 120px;display: inline-block"
                                    size="mini"
                                    clearable
                                    v-model="item.invoice_type"
                                    @change="item.save_show=true">
                                <el-option
                                        v-for="item in enums.Invoicetype"
                                        :key="item"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                            <span slot="reference">{{getEnumValue(enums.Invoicetype,item.invoice_type)}}</span>
                        </el-popover></td>
                    <td>{{getEnumValue(enums.declare_info,item.contract_detail.if_declare)}}</td>
                    <td><el-button v-if='item.save_show' type="primary" size="mini" @click="save_pl(item)">保存</el-button></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><span style='color:red;'>￥{{tax_amount_total}}</span></td>
                    <td><span style='color:red;'>￥{{amount_total}}</span></td>
                    <td><span style='color:red;'>￥{{total}}</span></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
            <div class="d2-mt-20">
            <el-button type="primary" size="mini" @click="saveVerifyInvoice_pl(check_list_more,1)" :loading="save_fy1">审核通过</el-button>
            <!--<el-button type="primary" size="mini" @click="saveVerifyInvoice_pl(check_list_more,-1)" :loading="save_fy2">驳回</el-button>-->
            <el-button type="danger"  size="mini" @click="saveVerifyInvoice_pl(check_list_more,0)" :loading="save_fy3">取消审核</el-button>
            </div>
        </el-dialog>

        <!-- 分页 -->
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                :page-sizes="[10, 50, 100, 200]"
                :page-size="10"
                 @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes,prev, pager, next"
                :total="list.total"
        ></el-pagination>
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
                <el-table-column label="发票类型" >
                    <template slot-scope="scope">{{getEnumValue(GEnums.InvoiceInfo,scope.row.invoice_type)}}</template>
                </el-table-column>
                <el-table-column label="不含税金额" >
                    <template slot-scope="scope">{{scope.row.amount}}</template>
                </el-table-column>
                <el-table-column label="税额" >
                    <template slot-scope="scope">{{scope.row.tax_amount}}</template>
                </el-table-column>
                <el-table-column label="总额" >
                    <template slot-scope="scope">{{scope.row.total}}</template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">{{getEnumValue(enums.invoice_check_status,scope.row.invoice_check_status)}}</template>
                </el-table-column>
                <el-table-column label="操作" width='220'>
                    <template slot-scope="scope">
                        <el-button type="primary"  size="mini"  @click="saopiao_pass(scope.row)">审核通过</el-button>
                        <el-button type="primary" style="margin-left:5px;" size="mini"  @click="saopiao_cancel(scope.row)">取消审核</el-button>
                        <el-button type="primary" style="margin-left:5px;" size="mini"  @click="saopiao_delete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </d2-container>
</template>
<script>
    import request from "@/plugin/axios";
    import Big from "@/big/a/big.mjs";
    import { lists, listTotal } from "@/api/prod";
    import { verify_invoice } from "@/api/procurement_contract_invoice";
    import { export_purchase_invoice,verify_invoice_update,delete_invoice,invoice_recovery} from '@/api/finance'
    import { package_one,package_saopiao_verify,package_saopiao_delete} from '@/api/procure'

    export default {
        name:"finance-purchase_receipt",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                list: {},
                save_fy1:false,
                save_fy2:false,
                save_fy3:false,
                dialogAdd: false,
                dialog_Add: false,
                dialogTip: false,
                dialogTip2: false,
                dialog_Add_more:false,
                dialog_saopiao_check:false,
                dialogDelete:false,
                delete_info:{
                    ids:[],
                    delete_note:''
                },
                checked_all:false,
                currentPage: 1,
                queryList: {
                    page: "1",
                    per_page:'10',
                    corp_id:'',
                    invoice_number:'',
                    contract_number:'',
                    status:'',
                    supplier_name:'',
                    date_from:'',
                    date_to:'',
                    kp_date_start:'',
                    kp_date_end:'',
                    purchase_user_id:'',
                    cas:''
                },
                companys:[],
                check_list:{contract_detail:[]},
                check_list_more:[],
                saopaio_check_list:[],
                enums:{},
                purchaseList: [],
                loading_search:false,
                loading_purchase_invoice:false,
                loading_purchase_invoice2:false,
                export_purchase_invoice_url:'',
                export_purchase_invoice_url2:'',
                visible1:'',
                visible2:'',
                visible3:'',
                visible4:'',
                visible5:'',
                visible6:'',
                visible7:'',
                rates:[0,0.01,0.03,0.06,0.13]
            };
        },
        computed:{
            tax_amount_total(){
                let num=0
                this.check_list_more.forEach((items,index)=>{
                       num=(new Big(num).plus(items.tax_amount)).toFixed(2)
                })
                return num
            },
            amount_total(){
                let num=0
                this.check_list_more.forEach((items,index)=>{
                       num=(new Big(num).plus(items.amount)).toFixed(2)
                })
                return num
            },
            total(){
                let num=0
                this.check_list_more.forEach((items,index)=>{
                       num=(new Big(num).plus(items.total)).toFixed(2)
                })
                return num
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            saopiao_check(item){
                this.dialog_saopiao_check=true
                let obj={
                    package_no:item.package_no
                }
                package_one(obj).then(res=>{
                    this.saopaio_check_list=res.data.package_invoices
                })
            },
            saopiao_pass(item){
                let obj={
                    id:item.id,
                    finance_check_status:1
                }
                package_saopiao_verify(obj,this)
            },
            saopiao_cancel(item){
                let obj={
                    id:item.id,
                    finance_check_status:0
                }
                package_saopiao_verify(obj,this)
            },
            saopiao_delete(item){
                package_saopiao_delete(item.id,this)
            },
            handleSizeChange(val) {
                this.queryList.per_page=val
                this.fetchData();
            },
            close_more(){
              this.dialog_Add_more=false
            },
            close_(){
              this.dialog_Add=false
            },
            select_all() {
                this.ids = []
                this.list.data.forEach((items, index) => {
                    if (this.checked_all&&!items.package_no) {
                        items.checked = true;
                        this.ids.push(items.id);
                    } else {
                        this.ids = [];
                        items.checked = false;
                    }
                });
            },
            select_one(checked, item) {
                this.ids = []
                this.list.data.forEach((items, index) => {
                    if (items.checked) {
                    this.ids.push(items.id);
                    } 
                });
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
            save(){
                let obj={
                    id:this.check_list.id,
                    invoice_number:this.check_list.invoice_number,
                    tax:this.check_list.tax,
                    quantity:this.check_list.quantity,
                    quantity_unit:this.check_list.quantity_unit,
                    price:this.check_list.price,
                    amount:this.check_list.amount,
                    tax_amount:this.check_list.tax_amount,
                    total:this.check_list.total,
                    note:this.check_list.note,
                    invoice_type:this.check_list.invoice_type
                }
                verify_invoice_update(obj,this)
            },
            save_pl(item){
                let obj={
                    id:item.id,
                    invoice_number:item.invoice_number,
                    tax:item.tax,
                    quantity:item.quantity,
                    quantity_unit:item.quantity_unit,
                    price:item.price,
                    amount:item.amount,
                    tax_amount:item.tax_amount,
                    total:item.total,
                    note:item.note,
                    invoice_type:item.invoice_type
                }
                verify_invoice_update(obj,this,item)
                
            },
            change_tax(){
               this.check_list.tax_amount=(new Big(this.check_list.amount).times(this.check_list.tax)).toFixed(2);
               this.check_list.total=(new Big(this.check_list.amount).plus(this.check_list.tax_amount)).toFixed(2)
            },
            change_quantity(){
               this.check_list.amount=(new Big(this.check_list.quantity).times(this.check_list.price)).toFixed(2)
               this.check_list.tax_amount=(new Big(this.check_list.amount).times(this.check_list.tax)).toFixed(2)
               this.check_list.total=(new Big(this.check_list.amount).plus(this.check_list.tax_amount)).toFixed(2)
            },
            change_price(){
                this.check_list.amount=(new Big(this.check_list.quantity).times(this.check_list.price)).toFixed(2)
                this.check_list.tax_amount=(new Big(this.check_list.amount).times(this.check_list.tax)).toFixed(2)
                this.check_list.total=(new Big(this.check_list.amount).plus(this.check_list.tax_amount)).toFixed(2)
            },
            change_total(){
                // this.check_list.quantity=(new Big(this.check_list.total).div(this.check_list.price)).toFixed(2)
            },
            change_tax_amount(){
               this.check_list.total=(new Big(this.check_list.amount).plus(this.check_list.tax_amount)).toFixed(2)
            },
            change_amount(){
                this.check_list.tax_amount=(new Big(this.check_list.amount).times(this.check_list.tax)).toFixed(2);
                this.check_list.total=(new Big(this.check_list.amount).plus(this.check_list.tax_amount)).toFixed(2)
            },
            change_invoice_number_pl(item,index){
                item.save_show=true
            },
            change_tax_pl(item,index){
               item.save_show=true
               item.tax_amount=(new Big(item.amount).times(item.tax)).toFixed(2);
               item.total=(new Big(item.amount).plus(item.tax_amount)).toFixed(2)
            },
            change_quantity_pl(item,index){
               item.save_show=true
               item.amount=(new Big(item.quantity).times(item.price)).toFixed(2)
               item.tax_amount=(new Big(item.amount).times(item.tax)).toFixed(2)
               item.total=(new Big(item.amount).plus(item.tax_amount)).toFixed(2)
            },
            change_price_pl(item,index){
                item.save_show=true
                item.amount=(new Big(item.quantity).times(item.price)).toFixed(2)
                item.tax_amount=(new Big(item.amount).times(item.tax)).toFixed(2)
                item.total=(new Big(item.amount).plus(item.tax_amount)).toFixed(2)
            },
            change_total_pl(){
                item.save_show=true
                // this.check_list.quantity=(new Big(this.check_list.total).div(this.check_list.price)).toFixed(2)
            },
            change_tax_amount_pl(item,index){
               item.save_show=true
               item.total=(new Big(item.amount).plus(item.tax_amount)).toFixed(2)
            },
            change_amount_pl(item,index){
                item.save_show=true
                item.tax_amount=(new Big(item.amount).times(item.tax)).toFixed(2);
                item.total=(new Big(item.amount).plus(item.tax_amount)).toFixed(2)
            },
            export_purchase_invoice(){
                this.loading_purchase_invoice = true
                export_purchase_invoice(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.export_purchase_invoice_url = res.data
                        setTimeout(() => {
                            this.$refs.export_purchase_invoice_url.click()
                            this.loading_purchase_invoice = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_purchase_invoice = false
                    }
                }).catch(rr => {
                    this.loading_purchase_invoice = false
                })
            },
            export_purchase_invoice2(){
                this.loading_purchase_invoice2 = true;
                lists(this.queryList, "ProcurementContract/Invoice/invoice_list_excel").then(res => {
                    if (res && res.code === 0) {
                        this.export_purchase_invoice_url2 = res.data
                        setTimeout(() => {
                            this.$refs.export_purchase_invoice_url2.click()
                            this.loading_purchase_invoice2 = false
                        }, 200)
                        // window.open(res.data);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_purchase_invoice2 = false
                    }
                }).catch(rr => {
                    this.loading_purchase_invoice2 = false
                })
            },
            //审核通过; //审核不通过/驳回; //取消审核/待审核
            saveVerifyInvoice(data,status){
                let postData = {id:data.id, status:status};
                if(status == 1){
                    this.save_fy1 = true
                }else if(status == -1){
                    this.save_fy2 = true
                }else if(status == 0){
                    this.save_fy3 = true
                }
                verify_invoice(postData,this);
            },
            saveVerifyInvoice_pl(data,status){
                let postData = {ids:this.ids, status:status};
                if(status == 1){
                    this.save_fy1 = true
                }else if(status == -1){
                    this.save_fy2 = true
                }else if(status == 0){
                    this.save_fy3 = true
                }
                verify_invoice(postData,this);
            },
            fetchData() {
                this.dialog_saopiao_check=false
                this.dialogDelete=false
                this.checked_all=false;
                lists(this.queryList, "ProcurementContract/Invoice/invoice_list").then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    res.data.data.forEach((items,index)=>{
                         items.checked=false
                    })
                    this.list = res.data;
                    this.enums=res.enum
                    // this.Add_invoice.invoice_receiver_date=this.getDate()
                });
                listTotal("data/user_list?user_type=101").then(res => {
                    this.purchaseList = res.data;
                });
            },
            tax(){
                this.detailList.amount=(new Big(this.detailList.total).div(new Big(this.detailList.tax).plus(1))).toFixed(2)
                this.detailList.tax_amount=(new Big(this.detailList.amount).times(this.detailList.tax)).toFixed(2)
            },
            tax_amount(){
                this.detailList.amount=(new Big(this.detailList.total).minus(this.detailList.tax_amount)).toFixed(2)
            },
            handleSizeChange(val) {
                this.queryList.per_page=val
                this.fetchData();
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            size_change(size) {
                lists(this.queryList, "ProcurementContract/Invoice/index").then(res => {
                    this.list = res.data;
                    this.queryList.per_page = size;
                    for (var i = 0; i < this.list.data.length; i++) {
                        var item = { checkStyle: false };
                        this.check.push(item);
                    }
                    obj(this.Currency, res.enum.Currency);
                    obj(this.Invoicetype, res.enum.Invoicetype);
                    this.invoice_status = res.enum.invoice_status;
                });
            },
            querySearch(queryString, cb) {
                if (queryString != "") {
                    listTotal("data/member_list?type=2&name=" + queryString).then(res => {
                        this.results = res.data;
                        this.results = JSON.parse(
                            JSON.stringify(this.results).replace(/name/g, "value")
                        );
                        // 调用 callback 返回建议列表的数据
                        cb(this.results);
                    });
                }
            },
            handleSelect() {
                this.queryList.supplier_id = this.results.filter(item => {
                    return item.value == this.supplier;
                })[0].id;
            },
            Search() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData();
            },
            changeMoney() {
                this.detailList.amount = parseFloat(this.detailList.price) * parseFloat(this.detailList.quantity);
                this.detailList.total = this.detailList.amount;
            },
            handle_invoice(item) {
                this.check_list=item;
                this.dialog_Add = true;
            },
            recovery(item){
                let obj={
                    ids:[item.id]
                }
                invoice_recovery(obj,this)
            },
            recovery_more(item){
                let obj={
                    ids:this.ids
                }
                invoice_recovery(obj,this)
            },
            delete_invoice_(item){
                let that=this
                that.delete_info.delete_note=''
                that.dialogDelete=true
                that.delete_info.ids=[item.id]
            },
            delete_invoice(){
                delete_invoice(this.delete_info,this)
            },
            delete_invoice_more_(){
                let that=this
                that.delete_info.delete_note=''
                that.dialogDelete=true
                that.delete_info.ids=this.ids
            },
            delete_invoice_more(){
                delete_invoice(this.delete_info,this)
            },
            handle_invoice_more(){
                this.check_list_more=[]
                this.list.data.forEach((items,index)=>{
                      this.ids.forEach((m,n)=>{
                         if(items.id==m){
                           this.check_list_more.push(items)
                         }
                      })    
                })
                let corp_names=[]
                this.check_list_more.forEach((items,index)=>{
                       items.save_show=false
                    corp_names.push(items.contract.corp_name)
                })
                this.companys=[...new Set(corp_names)]
                this.dialog_Add_more=true
            }
        }
    };
    function create(datas, type, method_type, that) {
        datas.loading = true;
        let data = JSON.parse(JSON.stringify(datas));
        delete data.loading;
        request({
            url: "api/v1/" + type + "/" + method_type,
            method: "post",
            data
        })
            .then(res => {
                datas.loading = false;
                if (res && res.code == 0) {
                    that.$message({
                        message: "success",
                        type: "success"
                    });
                    that.dialog_Add = false;
                    that.fetchData();
                } else {
                    that.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            })
            .catch(rr => {
                datas.loading = false;
            });
    }
</script>
