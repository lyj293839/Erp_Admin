<style lang="scss" scoped type="text/scss">
    .form_title {
        background: #f1f1f1;
        .el-button {
            color: black;
        }
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    /deep/ table .el-input__inner {
        border: none;
    }

    table td,th{
        font-size: 14px;
        padding: 5px;
        line-height: 25px;
    }

    .additional_cost_a {
        /deep/ .el-input__inner {
            border: 1px solid #dcdfe6;
            width: 200px;
        }
        .el-input {
            width: 200px;
        }
        .el-col {
            display: flex;
            margin: 5px 0px;
            div {
                width: 80px;
            }
        }
        table {
            line-height: 25px;
            /deep/ .el-input__inner {
                border: none;
            }
        }
    }
</style>
<template>
    <d2-container>
        <el-form label-width="0px">
            <el-form-item class="form_title">
                <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
                    <b>{{$t('sale.add.sale1')}}</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show1" class="from-item">
                <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                    <tr>
                        <th>合同双方</th>
                        <th>名称</th>
                        <th>联系人</th>
                        <th>联系电话</th>
                        <th>传真</th>
                    </tr>
                    <tr>
                        <td>需方</td>
                        <td>{{sale.supplier_name}}</td>
                        <td>{{sale.supplier_contact}}</td>
                        <td>{{sale.supplier_mobile}}</td>
                        <td>{{sale.supplier_fax}}</td>
                    </tr>
                    <tr>
                        <td>供方</td>
                        <td>{{sale.corp_name}}</td>
                        <td>{{sale.corp_contact}}</td>
                        <td>{{sale.corp_mobile}}</td>
                        <td>{{sale.corp_fax}}</td>
                    </tr>
                </table>
            </el-form-item>
            <el-form-item class="form_title">
                <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
                    <b>产品信息</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show3" class="from-item" v-for="(item,index) in sale.details" :key="index">
                <el-dialog
                        :visible.sync="dialogVisible"
                        width="50%"
                        class="additional_cost_a"
                >
                    <el-row>
                        <el-col :span="12">合同号：{{list.contract_number}}</el-col>
                        <el-col :span="12">产品名称：{{list.product_name_cn}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div>最终数量：</div>
                            <el-input v-model="list.quantity" size="small" @input="change_quantity()"></el-input>
                        </el-col>
                        <el-col :span="12">
                            数量单位：
                            {{getEnumValue(enums.units,list.quantity_unit)}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div>最终单价：</div>
                            <el-input v-model="list.price" size="small" @input="change_price()"></el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div>最终金额：</div>
                            <el-input v-model="list.total_money" size="small" @input="change_money()"></el-input>
                        </el-col>
                        <el-col :span="12">
                            货币单位：
                            {{getEnumValue(enums.Currency,list.currency_id)}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <div>规格：</div>
                            <el-input v-model="list.package" size="small"></el-input>
                        </el-col>
                        <el-col :span="12">
                            <div>纯度：</div>
                            <el-input v-model="list.purity" size="small"></el-input>
                        </el-col>
                    </el-row>
                    <table border="1" bordercolor="#E5E5E5">
                        <tr>
                            <td>{{$t('sale.add.sale11')}}</td>
                            <td>{{$t('sale.add.sale12')}}</td>
                            <td width="100px" style="text-align:center;">
                                {{$t('sale.add.sale13')}}
                                <el-button @click="add_cost" type="primary" size="mini">+</el-button>
                            </td>
                        </tr>
                        <tr v-for="(item_i,index) in list.additional_cost_info" :key="index">
                            <td>
                                <el-select
                                        v-model="item_i.additional_type_id"
                                        clearable
                                        filterable
                                        size="mini"
                                        style="width: 100%;"
                                        placeholder="Please Select"
                                >
                                    <el-option
                                            v-for="(i,index) in enums.additional_cost_type"
                                            :key="index"
                                            :label="i.name"
                                            :value="i.id"
                                    ></el-option>
                                </el-select>
                            </td>
                            <td>
                                <el-input
                                        size="mini"
                                        type="text"
                                        class="input"
                                        placeholder
                                        v-model="item_i.price"
                                        style="width: 100%;"
                                ></el-input>
                            </td>
                            <td style="text-align:center;">
                                <el-button @click="delete_cost(index)" type="primary" size="mini">-</el-button>
                            </td>
                        </tr>
                    </table>
                    <el-row style="margin-top:10px;">
                        <el-col :span="12">
                            变更备注：
                            <el-input type="textarea" v-model="list.remark" style="width:80%;"></el-input>
                        </el-col>
                    </el-row>
                    <span slot="footer" class="dialog-footer">
            <!--<el-button @click="hide_close()" size="mini">{{$t('cancel')}}</el-button>-->
            <el-button type="primary" @click="hide_dialogVisible(list)" size="mini">{{$t('save')}}</el-button>
          </span>
                </el-dialog>
                <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                    <tr>
                        <th width="100">询单号</th>
                        <th>CASNo.</th>
                        <th>产品名称</th>
                        <th>规格</th>
                        <th>纯度</th>
                        <th>数量</th>
                        <th>单价</th>
                        <th>金额</th>
                        <th>附加费用</th>
                        <th>附加费金额</th>
                        <th width="100">提交货时间</th>
                        <th width="100">状态</th>
                    </tr>
                    <tr>
                        <td>{{item.inquiry_id}}</td>
                        <td>{{item.cas}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.package}}</td>
                        <td>{{item.purity}}</td>
                        <td>
                            {{item.quantity}}
                            {{getEnumValue(enums.units,item.quantity_unit)}}
                        </td>
                        <td>{{item.price}}</td>
                        <td>{{item.total_price}}</td>
                        <td>{{item.additional_names}}</td>
                        <td>{{item.additional_cost}}</td>
                        <td>{{item.delivery_date}}</td>
                        <td style="text-align: center;">
                            <el-button type="primary" icon="el-icon-edit" size="mini" @click="show_dialog(item,'',index,'create')">
                            </el-button>
                        </td>
                    </tr>
                    <tr v-if="item.change_logs.length>0" v-for="(i,index_i) in item.change_logs">
                        <td colspan="3">{{i.remark}}</td>
                        <td>{{i.package}}</td>
                        <td>{{i.purity}}</td>
                        <td> {{i.quantity}}
                            {{getEnumValue(enums.units,i.quantity_unit)}}</td>
                        <td>{{i.price}}</td>
                        <td>{{i.total_money}}</td>
                        <td>{{i.additional_names}}</td>
                        <td>{{i.additional_cost}}</td>
                        <td></td>
                        <td>{{getEnumValue(enums.contract_change_log_status,i.status)}}
                            <el-button v-if="i.status==0" type="primary" icon="el-icon-edit" size="mini" @click="show_dialog(item,i,index_i,'edit')">
                            </el-button>
                        </td>
                    </tr>
                    <tr v-if="index==(sale.details.length-1)">
                        <td colspan="6"></td>
                        <td>{{$t('sale.add.sale42')}}</td>
                        <td colspan="5">{{sale.total_money}}</td>
                    </tr>
                </table>
            </el-form-item>
            <el-form-item label="变更备注:" label-width="80px">
                <el-input type="textarea" v-model="remark"></el-input>
            </el-form-item>

            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="收货数据" name="first">
                    <table v-if="returns.length>0" border="1" bordercolor="#E5E5E5" style="width:100%;margin-bottom: 10px;text-align: center;">
                        <tr>
                            <th>申请时间</th>
                            <th>CAS</th>
                            <th>产品名称</th>
                            <th>规格</th>
                            <th>退货数量</th>
                            <th>审核状态</th>
                            <th>退货状态</th>
                            <th>发货时间</th>
                            <th>快递公司</th>
                            <th>快递代码</th>
                            <th>快递费</th>
                        </tr>
                        <tr v-for="item in returns">
                            <td>{{item.created_at}}</td>
                            <td>{{item.cas}}</td>
                            <td>{{item.prod_name}}/{{item.prod_name_cn}}</td>
                            <td></td>
                            <td>{{item.base_quantity}}{{getEnumValue(enums.units,item.base_quantity_unit_id)}}</td>
                            <td>{{getEnumValue(enums.returns_status,item.status)}}</td>
                            <td>{{getEnumValue(enums.return_delivery_statuses,item.delivery_status)}}</td>
                            <td>{{item.returnships[0]?item.returnships[0].created_at:''}}</td>
                            <td>{{getEnumValue(enums.ExpressCompany,item.returnships[0]?item.returnships[0].company:'')}}</td>
                            <td>{{item.returnships[0]?item.returnships[0].number:''}}</td>
                            <td>{{item.returnships[0]?item.returnships[0].fee:''}}</td>
                        </tr>
                    </table>
                    <table v-if="inventories.length>0" v-for="(item,index) in inventories" border="1" bordercolor="#E5E5E5" style="width:100%;text-align: center;">
                        <tr style="background-color: rgb(228, 231, 235);">
                            <th>CAS</th>
                            <!--<th>产品名称</th>-->
                            <th>纯度</th>
                            <th>批次</th>
                            <th width="100">数量</th>
                            <th width="100">库存</th>
                            <th width="100">单价</th>
                            <th width="100">金额</th>
                            <th>仓库</th>
                            <!--<th>包装</th>-->
                            <th width="160">入库时间</th>
                            <!--<th>退货数量</th>-->
                        </tr>
                        <tr >
                            <td>{{item.cas}}</td>
                            <!--<td>{{item.name}}</td>-->
                            <td>{{item.purity}}</td>
                            <td>{{item.batchno}}</td>
                            <td>{{item.original_stock}}{{getEnumValue(enums.units,item.original_stock_unit_id)}}</td>
                            <td>{{item.stock}}{{getEnumValue(enums.units,item.original_stock_unit_id)}}</td>
                            <td>{{item.order.price}}{{getEnumValue(enums.Currency,item.currency_id)}}</td>
                            <td>{{(item.order.price*item.stock).toFixed(2)}}{{getEnumValue(enums.Currency,item.currency_id)}}</td>
                            <td>{{item.warehouse?item.warehouse.name:''}}</td>
                            <!--<td></td>-->
                            <td>{{item.created_at}}</td>
                            <!--<td>{{item.stock}}{{getEnumValue(enums.units,item.original_stock_unit_id)}}</td>-->
                        </tr>
                            <tr style="background-color: rgb(220, 226, 235);">
                                <th >类型</th>
                                <th colspan="3">规格</th>
                                <th colspan="3">库存</th>
                                <th colspan="1">退货数量</th>
                                <th>操作</th>
                            </tr>
                            <tr >
                                <td>散装</td>
                                <td colspan="3">/</td>
                                <td colspan="3">{{item.stock}}{{getEnumValue(enums.units,item.original_stock_unit_id)}}</td>
                                <td colspan="1"> <el-input v-model="item.base_quantity"  size="small" @input="change_base_quantity(item)" style="display: inline-block; width: 100px; border: 1px solid #f2f2f2;margin-right: 5px;"></el-input>{{getEnumValue(enums.units,item.original_stock_unit_id)}} </td>
                               <td><el-checkbox  :disabled="item.stock==0?true:false"  v-model="item.checked" @change="check_inventories(item.checked,item)" :true-label="1" :false-label="0"></el-checkbox></td>
                            </tr>
                            <!-- <tr v-for="(i,ind) in item.packeds">
                                <td>包装</td>
                                <td colspan="3">{{i.packsize}}</td>
                                <td colspan="3">{{i.stock}}{{getEnumValue(enums.units,i.unit_id)}}</td>
                                <td colspan="1"> 
                                    <el-input  size="small" v-model="i.base_quantity"  @input="change_quantity()"  style="display: inline-block; width: 100px; border: 1px solid #f2f2f2;margin-right: 5px;"></el-input>
                                    {{getEnumValue(enums.units,i.unit_id)}}
                                </td>
                                <td>
                                    <el-checkbox :disabled="i.stock==0?true:false"  v-model="i.checked" @change="check_inventories(i.checked,item)" :true-label="1" :false-label="0"></el-checkbox>
                                </td>
                            </tr> -->
                        
                    </table>
                    <el-form  v-if="inventories.length>0":inline="true" class="demo-form-inline">
                        <el-form-item label="退货地址" style="width:70%;">
                            <el-select size="mini" v-model="address" @change="select_address_inventories(address)" clearable style="width: 700px;">
                                <el-option
                                        v-for="item in receive_addresses"
                                        :key="item.id"
                                        :label="(item.country?item.country.Name:'')+(item.city?item.city.Name:'')+item.address+item.contact_name+item.mobile"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                            <el-button type="primary"  @click="delivery_edit" size="mini">退货地址</el-button>
                        </el-form-item>
                        <el-form-item label="退货地址" style="width:45%;">
                            <el-input type="textarea" v-model="refund_inventories.return_address" :rows="6" :cols="60"></el-input>
                        </el-form-item>
                        <el-form-item label="退货备注" style="width:45%;">
                            <el-input type="textarea" v-model="refund_inventories.return_note" :rows="6" :cols="60"></el-input>
                            <el-button type="primary" size="mini" @click="saveTuiguo()">退货{{$t('save')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="付款数据" name="second">
                    <table v-if="paylists.length>0" border="1" bordercolor="#E5E5E5" style="width:100%;">
                        <tr>
                            <th width="180">申请时间</th>
                            <th width="100">申请金额</th>
                            <th width="80">支付方式</th>
                            <th>支付金额</th>
                            <th width="100">退款金额</th>
                            <th width="80">货币</th>
                            <th>付款时间</th>
                            <th width="80">审核状态</th>
                            <th width="80"></th>
                            <th>备注</th>
                        </tr>
                        <tr v-for="(item,index) in paylists">
                            <td>{{item.pay_time}}</td>
                            <td>{{item.pay_requestamount}}</td>
                            <td>{{getEnumValue(enums.PayType,item.pay_type)}}</td>
                            <td>{{item.pay_amount}}
                            <span v-if="item.offset_amount>0" style="font-size: 10px;">
                                (抵充往来账{{item.offset_amount}})
                            </span></td>
                            <td>{{item.refund_amount}}<span v-if="item.refund_credit_flag==1" style="font-size: 10px;">(往来账)</span></td>
                            <td>{{getEnumValue(enums.Currency,item.currency_id)}}</td>
                            <td>{{item.finance_pay_time}}</td>
                            <td>{{getEnumValue(enums.check_status,item.check_status)}}
                            </td>
                            <td v-if="item.status==-1" >撤销</td>
                            <td v-if="item.status==1&&item.finance_pay_status==1">已处理
                                <el-button v-if="item.check_status==0" type="danger" size="mini" @click="cancel_refund(item)">取消退款</el-button>
                            </td>
                            <td v-if="item.status==1&&item.finance_pay_status!=1">待处理
                                <el-button v-if="item.check_status==0" type="danger" size="mini" @click="cancel_refund(item)">取消退款</el-button>
                            </td>
                            <td>{{item.note}}</td>
                        </tr>
                        <tr >
                            <td>退款金额</td>
                            <td>
                                <el-input v-if="index==0" v-model="refund_amount_pay" size="mini" style="border: 1px solid #f2f2f2;"></el-input>
                            </td>
                            <td width="150" >
                                <el-checkbox  v-if="index==0" v-model="refund_credit_flag" :true-label="1" :false-label="0">往来账</el-checkbox>&nbsp;&nbsp;
                                <el-button v-if="index==0" type="primary" size="mini" @click="save_pay(paylists[0].id,refund_amount_pay,refund_credit_flag)">保存</el-button>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="发票数据" name="third">
                    <table v-if="invoices.length>0" border="1" bordercolor="#E5E5E5" v-for="item in invoices" style="width:100%;">
                        <tr>
                            <th>发票类型</th>
                            <th>发票号码</th>
                            <th>开票日期</th>
                            <th>到票日期</th>
                            <th>公司名称</th>
                            <th>产品名称</th>
                            <th>数量</th>
                            <th>单位</th>
                            <th>单价</th>
                            <th>金额</th>
                            <th>税率</th>
                            <th>税额</th>
                            <th>不含税金额</th>
                        </tr>
                        <tr>
                            <td>{{getEnumValue(enums.InvoiceInfo,item.invoice_type)}}</td>
                            <td>{{item.invoice_number}}</td>
                            <td>{{item.invoice_date}}</td>
                            <td>{{item.invoice_receiver_date}}</td>
                            <td>{{item.supplier_name}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.quantity}}</td>
                            <td>{{getEnumValue(enums.units,item.quantity_unit)}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.total}}</td>
                            <td>{{item.tax}}</td>
                            <td>{{item.tax_amount}}</td>
                            <td>{{item.amount}}</td>
                        </tr>
                        <tr v-if="item.returns">
                            <td colspan="2">申请时间：{{item.modify_time}}</td>
                            <td colspan="2">快递公司：{{item.post_corp}}</td>
                            <td colspan="2">退票时间：{{item.post_time}}</td>
                            <td colspan="2">快递代码：{{item.post_code}}</td>
                            <td colspan="2">快递费：{{item.post_fee}}</td>
                            <td colspan="3">备注：{{item.post_note}}</td>
                        </tr>
                        <tr v-if="item.returns">
                            <td colspan="10"></td>
                            <td v-if="item.returns.check_status==1 && item.returns.post_corp==null">未处理</td>
                            <td v-if="item.returns.check_status==2">未处理</td>
                            <td v-if="item.returns.check_status==1 && item.returns.post_corp!=null"><span class="green">已处理</span></td>
                            <td colspan="2">
                                <el-checkbox @change="check(item.id)" v-if="item.returns.check_status!=1"><span class="red">选择退票</span></el-checkbox>&nbsp;
                                <span :class="item.returns.check_status==1?'green':'red'">{{getEnumValue(enums.invoice_return_check_status,item.returns.check_status)}}</span>
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="10"></td>
                            <td><span class="green">已处理</span></td>
                            <td colspan="2">
                                <el-checkbox @change="check(item.id)" ><span class="red">选择退票</span></el-checkbox>&nbsp;&nbsp;
                                <span v-if="item.returns" :class="item.status==1?'green':'red'">{{getEnumValue(enums.invoice_return_check_status,item.returns.check_status)}}</span></td>
                        </tr>
                    </table>
                    <el-form  v-if="invoices.length>0" :inline="true" class="demo-form-inline">
                        <el-form-item label="退票地址" style="width:70%;">
                            <el-select size="mini" v-model="address" @change="select_address(address)" clearable style="width: 700px;">
                                <el-option
                                        v-for="item in receive_invoice_addresses"
                                        :key="item.id"
                                        :label="(item.country?item.country.Name:'')+(item.city?item.city.Name:'')+item.address+item.contact_name+item.mobile"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                            <el-button type="primary" size="mini" @click="invoice_edit()">退票地址</el-button>
                        </el-form-item>
                        <el-form-item label="退票地址" style="width:45%;">
                            <el-input type="textarea" v-model="refund.refund_address" :rows="6" :cols="60"></el-input>
                        </el-form-item>
                        <el-form-item label="退票备注" style="width:45%;">
                            <el-input type="textarea" v-model="refund.refund_invoicenote" :rows="6" :cols="60"></el-input>
                            <el-button type="primary" size="mini" @click="saveTuipiao()">退票{{$t('save')}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-form-item class="form_title">
                <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
                    <b>合同条款</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show2" class="from-item">
                <table border="1" bordercolor="#E5E5E5">
                    <tr>
                        <th class="td">
                            <span style="color:red;">*</span>
                            {{$t('sale.add.sale44')}}
                        </th>
                        <th class="td">{{$t('sale.add.sale45')}}</th>
                        <th class="td">{{$t('sale.add.sale46')}}</th>
                        <th class="td">
                            {{$t('sale.add.sale47')}}
                        </th>
                        <th class="td">
                           PO
                        </th>
                        <th style="min-width:400px">
                            <span style="color:red;">*</span>
                            {{$t('sale.add.sale48')}}
                        </th>
                    </tr>
                    <tr>
                        <td>
                            {{sale.contract_number}}
                        </td>
                        <td class="dateInput">
                            {{sale.contract_date}}
                        </td>
                        <td>
                            {{sale.contract_address}}
                        </td>
                        <td>
                            {{getEnumValue(sale_list,sale.sale_id)}}
                        </td>
                        <td>
                            {{sale.customer_po}}
                        </td>
                        <td>
                            {{sale.settle_type}}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="color:red;">*</span>
                            {{$t('sale.add.sale49')}}
                        </td>
                        <td>
                            {{getEnumValue(trade_mode,sale.trade_type_id)}}
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale90')}}</td>
                        <td colspan="6">
                            {{sale.transportation}}
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale50')}}</td>
                        <td colspan="6">
                            {{sale.quality_stardard}}
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale51')}}</td>
                        <td colspan="6">
                            {{sale.reasonable_loss}}
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale52')}}</td>
                        <td colspan="6">
                            {{sale.package_stardard}}
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale53')}}</td>
                        <td colspan="6">
                            {{sale.accept_stardard}}
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale54')}}</td>
                        <td colspan="1" class="dateInput">
                            {{sale.expdate_start}}
                        </td>
                        <td>{{$t('sale.add.sale55')}}</td>
                        <td colspan="1" class="dateInput">
                            {{sale.expdate_end}}
                        </td>
                        <td>{{$t('sale.add.sale56')}}</td>
                        <td>
                            <el-radio-group v-model="sale.if_echapter">
                                <el-radio :label="1">{{$t('sale.add.sale57')}}</el-radio>
                                <el-radio :label="0">{{$t('sale.add.sale58')}}</el-radio>
                            </el-radio-group>
                        </td>
                    </tr>
                    <tr>
                        <td>{{$t('sale.add.sale59')}}</td>
                        <td colspan="5">
                            <el-input v-model="sale.note"></el-input>
                        </td>
                    </tr>
                </table>
            </el-form-item>
        </el-form>
        <!-- 编辑地址 -->
        <el-dialog
                :title="titleAddresses"
                :visible.sync="dialogAddresses"
                width="65%"
                @close="delete_receive_good(addressItem)"
        >
            <el-tabs type="card">
                <el-tab-pane label="启用地址">
                    <table
                            border="1"
                            bordercolor="#E5E5E5"
                            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
                            v-if="addresses"
                    >
                        <tr>
                            <td style="width:60px;"> {{$t('sale.add.sale69')}}</td>
                            <td style="width:100px;"> {{$t('sale.add.sale70')}}</td>
                            <td> {{$t('sale.add.sale71')}}</td>
                            <td style="width:60px;"> {{$t('sale.add.sale72')}}</td>
                            <td style="width:90px;"> {{$t('sale.add.sale73')}}</td>
                            <td style="width:110px;"> {{$t('sale.add.sale74')}}</td>
                            <td style="width:40px;"> {{$t('sale.add.sale91')}}</td><!-- 状态 -->
                            <td style="width:60px;"> {{$t('sale.add.sale76')}}</td>
                            <td style="width:160px;">
                                <el-checkbox v-model="check_total" @change="check_change()">{{$t('sale.add.sale92')}}</el-checkbox><!-- 全选 -->
                                <el-button type="danger" class="d2-ml-5" size="mini" @click="address_del()">{{$t('sale.add.sale94')}}</el-button><!-- 作废 -->
                            </td>
                        </tr>
                        <tr v-for="item in addressList" v-if="!item.deleted_at">
                            <td>{{item.country?item.country.Name:''}}</td>
                            <td>{{item.city?item.city.Name:''}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.contact_name}}</td>
                            <td>{{item.mobile}}</td>
                            <td>{{item.email}}</td>
                            <td align='center'>
                                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
                            </td>
                            <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
                            <td>
                                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                                <el-button type="primary" size="mini" class="d2-ml-5" @click="update_address(item)"> {{$t('edit')}}</el-button>
                                <el-button type="danger" size="mini" @click="destory_address(item)">{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
                <el-tab-pane label="作废地址">
                    <table
                            border="1"
                            bordercolor="#E5E5E5"
                            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
                            v-if="addresses"
                    >
                        <tr>
                            <td style="width:60px;"> {{$t('sale.add.sale69')}}</td>
                            <td style="width:100px;"> {{$t('sale.add.sale70')}}</td>
                            <td> {{$t('sale.add.sale71')}}</td>
                            <td style="width:60px;"> {{$t('sale.add.sale72')}}</td>
                            <td style="width:90px;"> {{$t('sale.add.sale73')}}</td>
                            <td style="width:110px;"> {{$t('sale.add.sale74')}}</td>
                            <td style="width:40px;"> {{$t('sale.add.sale91')}}</td><!-- 状态 -->
                            <td style="width:60px;"> {{$t('sale.add.sale76')}}</td>
                            <td style="width:160px;">
                                <el-checkbox v-model="check_total" @change="check_change()">{{$t('sale.add.sale92')}}</el-checkbox><!-- 全选 -->
                                <el-button type="primary" size="mini" class="d2-ml-5" @click="address_star()">{{$t('sale.add.sale93')}}</el-button><!-- 启用 -->
                            </td>
                        </tr>
                        <tr v-for="item in addressList" v-if="item.deleted_at">
                            <td>{{item.country?item.country.Name:''}}</td>
                            <td>{{item.city?item.city.Name:''}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.contact_name}}</td>
                            <td>{{item.mobile}}</td>
                            <td>{{item.email}}</td>
                            <td align='center'>
                                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
                            </td>
                            <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
                            <td>
                                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                                <el-button type="primary" size="mini" class="d2-ml-5" @click="update_address(item)"> {{$t('edit')}}</el-button>
                                <el-button type="danger" size="mini" @click="destory_address(item)">{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                            </td>
                        </tr>
                    </table>
                </el-tab-pane>
            </el-tabs>
            <el-form label-position="right" label-width="80px" class="dialog_input">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('sale.add.sale69')" :required="true">
                            <el-select
                                    v-model="addressItem.country_code"
                                    filterable
                                    @change="selected_country_address(addressItem)"
                                    size="small"
                                    placeholder="Please Select"
                            >
                                <el-option
                                        v-for="(i,index) in country"
                                        :key="index"
                                        :label="i.Name"
                                        :value="i.Code"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('sale.add.sale70')" :required="true">
                            <el-select
                                    v-model="addressItem.city_id"
                                    filterable
                                    size="small"
                                    placeholder="Please Select"
                            >
                                <el-option
                                        v-for="(i,index) in addressItem.city"
                                        :key="index"
                                        :label="i.Name"
                                        :value="i.ID"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('sale.add.sale71')" :required="true">
                    <el-input v-model="addressItem.address" size="small" placeholder="Please Write"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('sale.add.sale72')" :required="true">
                            <el-input v-model="addressItem.contact_name" size="small" placeholder="Please Write"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('sale.add.sale73')" :required="true">
                            <el-input v-model="addressItem.mobile" size="small" placeholder="Please Write"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('sale.add.sale74')">
                            <el-input v-model="addressItem.email" size="small" placeholder="Please Write"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item :label="$t('sale.add.sale81')">
                    <el-switch
                            name="is_default"
                            v-model="addressItem.is_default"
                            :active-value="1"
                            :inactive-value="0"
                            :active-text="$t('sale.add.sale82')"
                            :inactive-text="$t('sale.add.sale83')"
                    ></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="save_receive_good(addressItem)">{{$t('save')}}</el-button>
                    <el-button size="mini" @click="delete_receive_good(addressItem)">{{$t('cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </d2-container>
</template>

<script>
    import $ from "jquery";
    import axios from "axios";
    import Big from "@/big/a/big.mjs";
    import {sale_lists,
        contract_change,
        } from "@/api/sale";
    import { city_list, country_list } from "@/api/user";
    import {listTotal} from "@/api/prod";
    import {ProcurementContract,supplier_receive_addresses,modify_invoice_cerate,modify_payment_cerate,modify_return_goods_cerate,modify_goods_cerate,modify_goods_update,
        receive_address,
        receive_address_create,
        receive_address_update,
        receive_address_destory,
        payment_cancel} from "@/api/procure";

    export default {
        name: "procure-change",
        data() {
            return {
                dialogAddresses:false,
                activeName: 'first',
                form: {
                    name: ""
                },
                index: "",
                remark: "",
                dialogVisible: false,
                form_show1: true,
                form_show2: true,
                form_show3: true,
                list: {},
                sale: {},
                inventories: [],
                returns:[],
                invoices: [],
                paylists: [],
                units: [],
                currencys: [],
                additional_cost_type: [],
                status_info: [],
                sale_list: [],
                trade_mode: [],
                enums: {},
                checked: false,
                refund:{
                    ids:[],
                    refund_address:'',
                    refund_invoicenote:''
                },
                refund_pay:{
                    id:'',
                    refund_amount:'',
                    refund_credit_flag:''
                },
                refund_inventories:{
                    returns:[],
                    return_address:'',
                    return_note:''
                },
                addressItem: {
                    country_code: "",
                    city_id: "",
                    city: [],
                    address: "",
                    contact_name: "",
                    mobile: "",
                    email: "",
                    is_default: 0,
                    user_type: 101,
                    member_id: "",
                    type: ""
                },
                address:'',
                addressList:[],
                country:[],
                titleAddresses:'',
                addresses: true,
                receive_addresses:[],
                receive_invoice_addresses:[],
                refund_amount_pay:'',
                refund_credit_flag:'',

                check_total:false,//地址
                check_list:[],
                type:''
            };
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route(to, from) {
                if (to.name == "procure-change") {
                    this.fetchData();
                }
            }
        },
        methods: {
            change_base_quantity(item){
                this.refund_inventories.returns.forEach((items, index) => {
                    if(items.inventory_id == item.id) {
                        items.base_quantity=item.base_quantity
                    }
                })
            },
            cancel_refund(item){
                payment_cancel(item,this)
            },
            address_star(){
                var obj = {
                    id:this.check_list,
                    enabled_state:1
                }
                receive_address_destory(
                    obj,
                    "saler_contract",
                    "receive_address_destory",
                    this
                );
            },
            check_change(){
                this.check_list = []
                this.addressList.forEach(res=>{
                    res.check = this.check_total
                    if(this.check_total){
                        this.check_list.push(res.id)
                    }
                })
            },
            check_item_change(item){
                this.check_list = []
                this.check_total = item.check
                this.addressList.forEach(res=>{
                    if(res.check==false){
                        this.check_total = false
                    }else{
                        this.check_list.push(res.id)
                    }
                })
            },
            address_del(){
                var obj = {
                    id:this.check_list,
                    enabled_state:0
                }
                receive_address_destory(
                    obj,
                    "saler_contract",
                    "receive_address_destory",
                    this
                );
            },
            delivery_edit(){
                this.titleAddresses = "收货地址";
                this.dialogAddresses=true
                country_list().then(res => {
                    this.country = res.data;
                });
                receive_address(this.sale.supplier_id, 2).then(res => {
                    this.addressList = res.data;
                    this.user_type = res.enum.user_type;
                    if (res.data.length == 0) {
                        this.addresses = false;
                    }
                });
                this.addressItem.member_id=this.sale.supplier_id
                this.addressItem.type = 2;
            },
            invoice_edit(){
                this.titleAddresses = "收票地址";
                this.dialogAddresses=true
                country_list().then(res => {
                    this.country = res.data;
                });
                receive_address(this.sale.supplier_id, 2).then(res => {
                    this.addressList = res.data;
                    this.user_type = res.enum.user_type;
                    if (res.data.length == 0) {
                        this.addresses = false;
                    }
                });
                this.addressItem.member_id=this.sale.supplier_id
                this.addressItem.type=2
            },
            selected_country_address(item) {
                if (item.city_id) {
                    item.city_id = "";
                }
                city_list(item.country_code, "").then(res => {
                    this.$set(item, "city", res.data);
                });
            },
            save_receive_good() {
                if (this.addressItem.id) {
                    receive_address_update(this.addressItem,this.addressItem.id,this);
                } else {
                    receive_address_create(this.addressItem,this);
                }
            },
            update_address(item) {
                this.addressItem.country_code = item.country_code;
                this.addressItem.address = item.address;
                this.addressItem.contact_name = item.contact_name;
                this.addressItem.mobile = item.mobile;
                this.addressItem.email = item.email;
                // this.addressItem.user_type = item.user_type.toString();
                this.addressItem.is_default = item.is_default;
                this.addressItem.member_id = item.member_id;
                this.addressItem.id = item.id;
                city_list(item.country_code, "").then(res => {
                    this.addressItem.city_id = item.city_id;
                    this.$set(this.addressItem, "city", res.data);
                });
            },
            destory_address(item) {
                if(item.deleted_at){
                    item.enabled_state = 1
                }else{
                    item.enabled_state = 0
                }
                this.receive_goods_addresses = []
                var obj = {
                    id:[],
                    enabled_state:item.enabled_state
                }
                obj.id.push(item.id)
                receive_address_destory(
                    obj,
                    "saler_contract",
                    "receive_address_destory",
                    this
                );
            },
            delete_receive_good() {
                this.receive_invoice_addresses=[]
                this.receive_addresses=[]
                supplier_receive_addresses(this.sale.supplier_id).then(res=>{
                    if(res&&res.code==0){
                        this.receive_invoice_addresses=res.data
                        this.receive_addresses=res.data
                    }
                })
                this.dialogAddresses = false;
                this.addressItem = {
                    country_code: "",
                    city_id: "",
                    city: [],
                    address: "",
                    contact_name: "",
                    mobile: "",
                    email: "",
                    is_default: 0,
                    user_type: 101,
                    member_id: "",
                    type: ""
                };
            },
            check_inventories(checked,item){
                if (checked) {
                    this.refund_inventories.returns.push({
                        type:2,
                        prod_id:item.prod_id,
                        batchno:item.batchno,
                        contract_detail_no:item.purchaseorder_no,
                        base_quantity:item.base_quantity,
                        base_quantity_unit:item.original_stock_unit_id,
                        inventory_id:item.id,
                        procurement_contract_id:item.purchaseorder_pid,
                        procurement_contract_detail_id:item.purchaseorder_id,
                        procurement_contract_number:item.purchaseorder_pno
                    })
                } else {
                    this.refund_inventories.returns.forEach((items, index) => {
                        if (items.inventory_id == item.id) {
                            this.refund_inventories.returns.splice(index, 1)
                        }
                    })
                }
            },
            save_pay(id,refund_amount,refund_credit_flag){
                this.paylists.forEach((items,index)=>{
                    if(items.finance_pay_status==1){
                        this.refund_pay.id=items.id
                    }
                })
                this.refund_pay.refund_amount=refund_amount
                this.refund_pay.refund_credit_flag=refund_credit_flag
                modify_payment_cerate(this.refund_pay,this)
            },
            fetchData() {
                this.refund_inventories.returns=[]
                this.refund.ids=[]
                this.refund_pay.id=''
                ProcurementContract(this.$route.query.ids).then(res => {
                    res.data.contract.details.forEach((item,index)=>{
                        item.additional_names=''
                        item.additional.forEach((x,y)=>{
                            res.enum.additional_cost_type.forEach((m,n)=>{
                                if(x.additional_type_id==m.id){
                                    item.additional_names+=m.name+','
                                }
                           })
                         })
                        item.change_logs.forEach((x,y)=>{
                            x.additional_names=''
                            res.enum.additional_cost_type.forEach((m,n)=>{
                                x.additional_cost_info.forEach((j,k)=>{
                                    if(j.additional_type_id==m.id){
                                        x.additional_names+=m.name+','
                                    }
                                })
                            })
                        })
                    })
                    this.sale = res.data.contract
                    res.data.inventories.forEach((item,index)=>{
                        item.checked=false
                        item.base_quantity=item.stock
                    })
                    this.inventories = res.data.inventories
                    this.returns=res.data.returns
                    this.invoices = res.data.invoices
                    res.data.paylists.forEach((item,index)=>{
                        item.refund_amount_pay=''
                    })
                    this.paylists = res.data.paylists
                    this.enums = res.enum
                    this.receive_invoice_addresses=[]
                    this.receive_addresses=[]
                    supplier_receive_addresses(this.sale.supplier_id).then(r=>{
                        if(r&&r.code==0){
                            this.receive_invoice_addresses=r.data
                            this.receive_addresses=r.data
                        }
                    })
                })

                sale_lists().then(res => {
                    this.sale_list = res.data;
                });

            },
            select_address_inventories(address){
                this.receive_addresses.forEach((item,index)=>{
                    if(item.id==address){
                        this.refund_inventories.return_address='收货公司名称(收件人):'+item.contact_name+'\n'+'联系电话:'+item.mobile+'\n'+'邮寄地址:'+(item.country?item.country.Name:'')+(item.city?item.city.Name:'')+item.address+'\n'+'邮编:'+item.email
                    }
                })
            },
            select_address(address){
                this.receive_invoice_addresses.forEach((item,index)=>{
                    if(item.id==address){
                        this.refund.refund_address='收货公司名称(收件人):'+item.contact_name+'\n'+'联系电话:'+item.mobile+'\n'+'邮寄地址:'+(item.country?item.country.Name:'')+(item.city?item.city.Name:'')+item.address+'\n'+'邮编:'+item.email
                    }
                })

            },
            check(id){
                if(this.refund.ids.indexOf(id)==-1){
                    this.refund.ids.push(id)
                }else{
                    this.refund.ids.forEach((items,index)=>{
                        if(items==id){
                            this.refund.ids.splice(index,1)
                        }
                    })
                }
            },
            show_dialog(item,i, index, type) {
                this.dialogVisible = true;
                this.index = index;
                this.type=type
                if(!item.additional_cost_info||item.additional_cost_info.length==0){
                    item.additional_cost_info=[{
                        id: '',
                        additional_type_id: "",
                        price: ""
                    }]
                }
                if(i){
                    this.list = {
                        contract_number: item.procurement_contract_number,
                        product_name_cn: item.name_cn,
                        contract_detail_id: item.id,
                        package: item.package,
                        purity: item.purity,
                        quantity: i.quantity,
                        quantity_unit: item.quantity_unit,
                        currency_id: i.currency_id,
                        total_money: i.total_money,
                        price: i.price,
                        additional_cost: i.additional_cost,
                        additional_cost_info: i.additional_cost_info?JSON.parse(JSON.stringify(i.additional_cost_info)):[],
                        status: 0,
                        remark: item.remark,
                        type: 1
                    };
                }else{
                    this.list = {
                        contract_number: item.procurement_contract_number,
                        product_name_cn: item.name_cn,
                        contract_detail_id: item.id,
                        package: item.package,
                        purity: item.purity,
                        quantity: item.quantity,
                        quantity_unit: item.quantity_unit,
                        currency_id: item.currency_id,
                        total_money: item.total_price,
                        price: item.price,
                        additional_cost: item.additional_cost,
                        additional_cost_info: item.additional_cost_info?JSON.parse(JSON.stringify(item.additional_cost_info)):[],
                        status: 0,
                        remark: item.note,
                        type: 1
                    };
                }
                if(type=='edit'){
                    this.list.id=i.id
                }
            },
            delete_cost(index) {
                this.list.additional_cost_info.splice(index,1);
            },
            add_cost() {
                this.list.additional_cost_info.push({
                    id: '',
                    additional_type_id: "",
                    price: ""
                });
            },
            change_quantity() {
                this.list.total_money=(new Big(this.list.quantity).times(this.list.price)).toFixed(2)
            },
            change_price() {
                this.list.total_money=(new Big(this.list.quantity).times(this.list.price)).toFixed(2)
            },
            change_money() {
                this.list.price=(new Big(this.list.total_money).div(this.list.quantity)).toFixed(2)
            },
            hide_dialogVisible(item) {
                let num = 0;
                if(this.list.additional_cost_info[0].id){
                    this.list.additional_cost_info.forEach((item, index) => {
                        num = new Big(num).plus(item.price);
                    });
                }
                var list = {
                    contract_id: item.procurement_contract_id,
                    contract_detail_id: item.contract_detail_id,
                    package: item.package,
                    purity: item.purity,
                    quantity: this.list.quantity,
                    quantity_unit: item.quantity_unit,
                    currency_id: item.currency_id,
                    total_money: this.list.total_money,
                    price: this.list.price,
                    additional_cost: num,
                    additional_cost_info: this.list.additional_cost_info,
                    status: item.status,
                    remark: item.note,
                    type: 1
                };
                if(this.type=='create'){
                    modify_goods_cerate(list,this)
                }else{
                    list.id=item.id
                    modify_goods_update(list,this)
                }
            },
            saveTuiguo(){
                modify_return_goods_cerate(this.refund_inventories,this);
            },
            saveTuipiao(){
                modify_invoice_cerate(this.refund,this);
            },
            close() {
                this.$router.push({
                    path: "/sales/sales",
                    name: "sales-sales"
                });
            }
        }
    };
</script>

<style scoped>
</style>
