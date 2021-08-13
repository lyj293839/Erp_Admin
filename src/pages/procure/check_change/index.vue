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

    /deep/ .el-input__inner {
        border: none;
    }

    td {
        padding-left: 5px !important;
        font-size: 14px;
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
    /deep/ .h-20{
        line-height: 20px;
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
                        @close="hide_close()"
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
                            {{units.filter(res=>{return res.id == list.quantity_unit})[0]?units.filter(res=>{return
                            res.id == list.quantity_unit})[0].name:''}}
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
                            {{currencys.filter(res=>{return res.id ==
                            list.currency_id})[0]?currencys.filter(res=>{return res.id ==
                            list.currency_id})[0].name:''}}
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
                            <td width="100px" style="text-align:center;">{{$t('sale.add.sale13')}}<el-button @click="add_cost" type="primary" size="mini">+</el-button></td>
                        </tr>
                        <tr v-for="item_i in list.additional_cost_info">
                            <td>
                                <el-select
                                        v-model="item_i.additional_type_id"
                                        clearable
                                        filterable
                                        size="mini"
                                        style="width: 100%;"
                                        placeholder
                                >
                                    <el-option
                                            v-for="(i,index) in additional_cost_type"
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
                                <el-button @click="delete_cost(item_i)" type="primary" size="mini">-</el-button>
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
            <el-button @click="hide_close()" size="mini">{{$t('cancel')}}</el-button>
            <el-button type="primary" @click="hide_dialogVisible()" size="mini">{{$t('save')}}</el-button>
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
                        <th width="100">审核状态</th>
                        <th width="100">操作</th>
                    </tr>
                    <tr>
                        <td>{{item.inquiry_id}}</td>
                        <td>{{item.cas}}</td>
                        <td>{{item.product_name_cn}}</td>
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
                            {{getEnumValue(enums.check_status,item.status)}}
                        </td>
                        <td  class="d2-text-center">
                            <!--<el-button type="primary" size="mini" @click="show_dialog(index)">审批-->
                            <!--</el-button>-->
                        </td>
                    </tr>
                    <tr v-if="item.change_logs.length>0" v-for="i in item.change_logs">
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
                        <td >
                            <div v-if="i.status2==0">
                            <el-select size="mini" v-model="i.status"   clearable style="width:100px;">
                                <el-option
                                        v-for="item in enums.contract_change_log_status"
                                        v-if="item.id!=0"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                            </div >
                            <div v-else class="d2-text-center">
                               <span style="color: #606266;font-size:12px;">{{getEnumValue(enums.contract_change_log_status,i.status)}}</span>
                            </div>
                        </td>
                        <td class="d2-text-center"><el-button type="primary" size="mini" v-if="i.status2==0" @click="change_log_status(i.id,i.status)">审批</el-button></td>
                    </tr>
                    <tr v-if="index==(sale.details.length-1)">
                        <td colspan="6"></td>
                        <td>{{$t('sale.add.sale42')}}</td>
                        <td colspan="6">{{sale.total_money}}</td>
                    </tr>
                </table>
            </el-form-item>

            <el-form-item class="form_title" v-if="paylists.length>0">
                <el-button @click="form_show4 = !form_show4" type="text" icon="el-icon-arrow-down">
                    <b>付款数据</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show4" class="from-item" v-if="paylists.length>0">
                <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                    <tr>
                        <th>#ID</th>
                        <th width="200">申请时间</th>
                        <th>支付方式</th>
                        <th>申请金额</th>
                        <th>支付金额</th>
                        <th>付款时间</th>
                        <th>退款金额</th>
                        <th>货币</th>
                        <th>财务付款</th>
                        <th>财务审核</th>
                        <th>审核状态</th>
                        <th>备注</th>
                        <th width="80">操作</th>
                    </tr>
                    <tr v-for="(item,index) in paylists">
                        <td>{{item.id}}</td>
                        <td>{{item.pay_time}}</td>
                        <td>{{getEnumValue(enums.PayType,item.pay_type)}}</td>
                        <td>{{item.pay_requestamount}}</td>
                        <td>{{item.pay_amount}}
                            <span v-if="item.offset_amount>0">
                                (抵充往来账{{item.offset_amount}})
                            </span>
                        </td>
                        <td>{{item.finance_pay_time}}</td>
                        <td>{{item.refund_amount}}<span v-if="item.refund_credit_flag==1" style="font-size: 10px;">(往来账)</span></td>
                        <td>{{getEnumValue(enums.Currency,item.currency_id)}}</td>
                        <td>
                            <div class="h-20">
                                <span v-if="item.status==-1">撤销</span>
                                <span v-else>{{getEnumValue(enums.finance_pay_status,item.finance_pay_status)}}</span>
                                <span v-if="item.finance_pay_user">({{item.finance_pay_user.name}})</span>
                            </div>
                            <div class="h-20" v-if="item.finance_pay_user">{{(item.finance_pay_time)}}</div>
                        </td>
                        <td>
                            <div class="h-20">
                            {{getEnumValue(enums.finance_check_status,item.finance_check_status)}}
                            <span v-if="item.finance_check_user">({{item.finance_check_user.name}})</span>
                            </div>
                            <div  class="h-20" v-if="item.finance_check_user">{{(item.finance_check_time)}}</div>
                        </td>
                        <td>
                            <div v-if="item.status!=-1">
                            <div v-if="item.check_status2==0">
                            <el-select size="mini" v-model="item.check_status"   clearable style="width:100px;">
                                <el-option
                                        v-for="i in enums.check_status"
                                        v-if="i.id!==0"
                                        :key="i.id"
                                        :label="i.name"
                                        :value="i.id"
                                ></el-option>
                            </el-select>
                        </div>
                            <div v-else>
                                <div>
                                    <div class="h-20">
                                    {{getEnumValue(enums.check_status,item.check_status)}}
                                    <span v-if="item.check_user">({{item.check_user.name}})</span>
                                    </div>
                                    <div class="h-20" v-if="item.check_user">{{(item.check_time)}}</div>
                                </div>
                            </div>
                            </div>
                        </td>
                        <td>{{item.note}}</td>
                        <td class="d2-text-center">
                            <el-button type="primary" size="mini" v-if="item.check_status2==0&&item.status!=-1" @click="check_pay(item.check_status,item.id)">审批</el-button>
                            <!-- <el-button type="danger" size="mini" v-if="item.status==1&&item.check_status2!=0&&item.finance_check_status==0" @click="check_pay(0,item.id)">撤销</el-button> -->
                        </td>
                    </tr>
                </table>
            </el-form-item>

            <el-form-item class="form_title" v-if="returns.length>0">
                <el-button @click="form_show5 = !form_show5" type="text" icon="el-icon-arrow-down">
                    <b>退货数据</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show5" class="from-item" v-if="returns.length>0">
                <table border="1" bordercolor="#E5E5E5" style="width:100%;">
                    <tr>
                        <th>#ID</th>
                        <th>CAS</th>
                        <th>产品名称</th>
                        <th>仓库</th>
                        <th>规格</th>
                        <th>退货数量</th>
                        <th>时间</th>
                        <th>备注</th>
                        <th>状态</th>
                        <th width="120">审核状态</th>
                        <th>操作</th>
                    </tr>
                    <tr v-for="item in returns">
                        <td>{{item.id}}</td>
                        <td>{{item.cas}}</td>
                        <td>{{item.prod_name}}/{{item.prod_name_cn}}</td>
                        <td>{{attr(item,'warehouse.name')}}</td>
                        <td>
                            <span v-if="item.package_type==1&&item.package">
                                {{item.package.packsize}}{{getEnumValue(enums.units,item.package.unit_id)}}
                            </span>
                            <span v-else>/</span>
                        </td>
                        <td>
                            <span v-if="item.package_type==1">
                                {{item.package_nums}}
                                ({{item.base_quantity}}{{getEnumValue(enums.units,item.base_quantity_unit_id)}})
                            </span>
                            <span v-else>{{item.base_quantity}}{{getEnumValue(enums.units,item.base_quantity_unit_id)}}</span>
                        </td>
                        <td></td>
                        <td>{{item.note}}</td>
                        <td>{{getEnumValue(enums.return_delivery_statuses,item.delivery_status)}}</td>
                        <td>
                            <div v-if="item.status2==1">
                            <el-select size="mini" v-model="item.status"   clearable>
                                <el-option
                                        v-for="i in enums.returns_status"
                                        v-if="i.id!=1"
                                        :key="i.id"
                                        :label="i.name"
                                        :value="i.id"
                                ></el-option>
                            </el-select>
                            </div>
                            <div v-else style="color: #606266;font-size:12px;">
                             {{getEnumValue(enums.returns_status,item.status)}}
                            </div>
                        </td>
                        <td class="d2-text-center"><el-button type="primary" v-if="item.status2==1"  size="mini" @click="return_verify(item.id,item.status)">审批</el-button></td>
                    </tr>
                </table>
            </el-form-item>

            <el-form-item class="form_title" v-if="invoices_return_flag==1">
                <el-button @click="form_show6 = !form_show6" type="text" icon="el-icon-arrow-down">
                    <b>发票数据</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show6" class="from-item" v-if="invoices_return_flag==1">
                <table border="1" bordercolor="#E5E5E5" v-for="item in invoices" v-if="item.returns" style="width:100%;">
                    <tr>
                        <th>#ID</th>
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
                        <td>{{item.id}}</td>
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
                        <td colspan="11"></td>
                        <td v-if="item.returns.check_status==1 && item.returns.post_corp==null">未处理</td>
                        <td v-if="item.returns.check_status==2">未处理</td>
                        <td v-if="item.returns.check_status==1 && item.returns.post_corp!=null"><span class="green">已处理</span></td>
                        <td colspan="2">
                            <div v-if="item.returns.check_status2==2">
                            <el-select size="mini" v-model="item.returns.check_status"   clearable>
                                <el-option
                                        v-for="i in enums.invoice_return_check_status"
                                        v-if="i.id!=2"
                                        :key="i.id"
                                        :label="i.name"
                                        :value="i.id"
                                ></el-option>
                            </el-select>
                            </div>
                            <div v-else style="color: #606266;font-size:12px;">
                                {{getEnumValue(enums.invoice_return_check_status,item.returns.check_status)}}
                            </div>
                        </td>
                        <td><el-button type="primary" size="mini" v-if="item.returns.check_status2==2"   @click="check_invoice(item.returns.check_status,item.id)">审批</el-button></td>
                    </tr>
                    <tr v-else>
                        <td colspan="11"></td>
                        <td><span class="green">已处理</span></td>
                        <td colspan="2"> <el-checkbox @change="check(item.id)" ><span class="red">选择退票</span></el-checkbox>&nbsp;&nbsp;
                            <span v-if="item.returns" :class="item.returns.status==1?'green':'red'">{{getEnumValue(enums.invoice_return_check_status,item.returns.status)}}</span></td>
                    </tr>
                </table>
            </el-form-item>

            <el-form-item class="form_title">
                <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
                    <b>合同条款</b>
                </el-button>
            </el-form-item>
            <el-form-item v-show="form_show2" class="from-item">
                <table border="1" bordercolor="#E5E5E5">
                    <tr>
                        <th class="td" width="110">
                            <span style="color:red;">*</span>
                            {{$t('sale.add.sale44')}}
                        </th>
                        <th class="td">{{$t('sale.add.sale45')}}</th>
                        <th class="td">{{$t('sale.add.sale46')}}</th>
                        <th class="td">
                            <span style="color:red;">*</span>
                            {{$t('sale.add.sale47')}}
                        </th>
                        <th class="td">
                            <span style="color:red;">*</span>PO
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
            <div  style="display:flex;justify-content: flex-start;margin:0px;width:100%;margin-bottom:10px;">
                <div style="text-align:left;width:50%;display:inline-block;"><span v-if="sale.check_status==1&&paylists.length>0" style='color:red;line-height:28px;'>该合同有付款记录，打回操作请确认无误再操作！！</span></div>
                <div style="text-align:right;width:50%;display:inline-block;">
                    <el-button v-if="sale.check_status==1" type="danger" size="mini" @click="return_contract()">打回合同</el-button>
                    <el-button v-else type="primary" size="mini" @click="saveCheckSuccess()">审批通过</el-button>
                    <el-button size="mini" @click="close()">{{$t('cancel')}}</el-button>
                </div>
            </div>
            <!-- <el-form-item style="text-align:right;">
                <el-button v-if="sale.check_status==1" type="danger" size="mini" @click="return_contract()">打回合同</el-button>
                <el-button v-else type="primary" size="mini" @click="saveCheckSuccess()">审批通过</el-button>
                <el-button size="mini" @click="close()">{{$t('cancel')}}</el-button>
            </el-form-item> -->
        </el-form>
    </d2-container>
</template>

<script>
    import $ from "jquery";
    import axios from "axios";
    import Big from "@/big/a/big.mjs";
    import {sale_lists, contract_change} from "@/api/sale";
    import {listTotal} from "@/api/prod";
    import {return_contract,ProcurementContract,modify_invoice_verify,payment_verify,modify_return_goods_verify,modify_goods_verify,save_verify} from "@/api/procure";
    import { mapState, mapActions } from "vuex";
    export default {
        name: "procure-check_change",
        data() {
            return {
                activeName: 'first',
                form: {
                    name: ""
                },
                index: "",
                remark: "",
                dialogVisible: false,
                form_show1: true,
                form_show2: false,
                form_show3: true,
                form_show4: true,
                form_show5: true,
                form_show6: true,
                list: {},
                returns:[],
                sale: {},
                inventories: [],
                invoices: [],
                invoices_return_flag:0,
                paylists: [],
                units: [],
                currencys: [],
                additional_cost_type: [],
                status_info: [],
                sale_list: [],
                trade_mode: [],
                enums: {},
                checked: false
            };
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route(to, from) {
                if (to.name == "procure-check_change") {
                    this.fetchData();
                }
            }
        },
        methods: {
            ...mapActions("d2admin/page", ["closeAdd"]),
            return_contract(){
                return_contract(this.$route.query.ids,this)
            },
            return_verify(id,status){
                modify_return_goods_verify(id,status,this)
            },
            check_pay(status,id){
                let obj={
                    id:id,
                    check_status:status
                }
                payment_verify(obj,this)
            },
            check_invoice(status,id){
                let obj={
                   id:id,
                   check_status:status
                }
                modify_invoice_verify(obj,this)
            },
            change_log_status(id,status){
                let obj={
                    id:id,
                    status:status
                }
                modify_goods_verify(obj,this)
            },
            fetchData() {
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
                            x.status2= JSON.parse(JSON.stringify(x.status))
                            if(x.status==0){
                                x.status=1
                            }
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
                    this.inventories = res.data.inventories
                    this.invoices = res.data.invoices
                    res.data.invoices.forEach((items,index)=>{
                        if(items.returns){
                            this.invoices_return_flag = 1;
                            items.returns.check_status2=JSON.parse(JSON.stringify(items.returns.check_status))
                            if(items.returns.check_status==2){
                                items.returns.check_status=1
                            }
                        }
                    })
                    res.data.paylists.forEach((items,index)=>{
                        items.check_status2=JSON.parse(JSON.stringify(items.check_status))
                        if(items.check_status==0){
                            items.check_status=1
                        }
                    })
                    this.paylists = res.data.paylists
                    res.data.returns.forEach((x,y)=>{
                        x.status2= JSON.parse(JSON.stringify(x.status))
                        if(x.status==1){
                            x.status=2
                        }
                    })
                    this.returns=res.data.returns
                    this.enums = res.enum
                    console.log(this.sale)
                })

                sale_lists().then(res => {
                    this.sale_list = res.data;
                });

            },
            show_dialog(item, index) {
                this.dialogVisible = true;
                this.index = index;
                this.list = {
                    contract_number: item.contract_number,
                    product_name_cn: item.product_name_cn,
                    contract_detail_id: item.id,
                    package: item.package,
                    purity: item.purity,
                    quantity: item.quantity,
                    quantity_unit: item.quantity_unit,
                    currency_id: item.currency_id,
                    total_money: (Number(item.total_money) - Number(item.additional_cost)).toFixed(2),
                    price: item.price,
                    additional_cost: item.additional_cost,
                    additional_cost_info: JSON.parse(JSON.stringify(item.additionals)),
                    status: 0,
                    remark: item.remark,
                    type: 1
                };
            },
            delete_cost(index) {
                this.sale.details[this.index].additionals.splice(index, 1);
            },
            add_cost() {
                this.list.additional_cost_info.push({
                    id: null,
                    additional_type_id: "",
                    price: ""
                });
            },
            change_quantity() {
                let money = 0;
                this.sale.details.forEach((items, index) => {
                    if (items.quantity && items.quantity > 0) {
                        items.total_money = new Big(items.quantity).times(items.price).toFixed(2);
                        money = new Big(money).plus(
                            new Big(items.quantity)
                                .times(items.price)
                                .plus(items.additional_cost)
                        );
                    }
                });
                this.sale.total_money = Number(money);
            },
            change_price() {
                let money = 0;
                this.sale.details.forEach((items, index) => {
                    if (items.price && items.price > 0) {
                        items.total_money = new Big(items.quantity).times(items.price).toFixed(2);
                        money = new Big(money).plus(
                            new Big(items.quantity)
                                .times(items.price)
                                .plus(items.additional_cost)
                        );
                    }
                });
                this.sale.total_money = Number(money);
            },
            change_money() {
                let money = 0;
                this.sale.details.forEach((items, index) => {
                    if (items.quantity && items.quantity > 0) {
                        items.price = new Big(items.total_money).div(items.quantity).toFixed(2);
                    }
                    money = new Big(money).plus(
                        new Big(items.quantity).times(items.price).plus(items.additional_cost)
                    );
                });
                this.sale.total_money = Number(money);
            },
            hide_dialogVisible(item) {
                // this.dialogVisible = false;
                if (
                    this.sale.details[this.index].additionals[0].additional_type_id != ""
                ) {
                    let num = 0;
                    this.sale.details[this.index].additionals.forEach((item, index) => {
                        num = new Big(num).plus(item.price);
                    });
                    this.sale.details[this.index].additional_cost = Number(num);
                    // let money = 0;
                    // this.sale.details.forEach((items, index) => {
                    //   money = new Big(money).plus(
                    //     new Big(items.quantity)
                    //       .times(items.price)
                    //       .plus(items.additional_cost)
                    //   );
                    // });
                    // this.sale.total_money = Number(money);
                }
                var list = {
                    contract_detail_id: item.id,
                    package: item.package,
                    purity: item.purity,
                    quantity: item.quantity,
                    quantity_unit: item.quantity_unit,
                    currency_id: item.currency_id,
                    total_money: Number(item.total_money) + Number(item.additional_cost),
                    price: item.price,
                    additional_cost: item.additional_cost,
                    additional_cost_info: item.additionals,
                    status: item.status,
                    remark: this.remark,
                    type: 1
                };
                contract_change(list).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                            message: "success",
                            type: "success"
                        });
                        this.dialogVisible = false;
                        let money = 0;
                        this.sale.details.forEach((items, index) => {
                            money = new Big(money).plus(
                                new Big(items.quantity)
                                    .times(items.price)
                                    .plus(items.additional_cost)
                            );
                        });
                        this.sale.total_money = Number(money);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
            },
            saveCheckSuccess() {
                save_verify(this.$route.query.ids,this)
            },
            close() {
                this.$router.push({
                    path: "/procure/contract",
                    name: "procure-contract"
                });
            }
        }
    };
</script>

<style scoped>
</style>
