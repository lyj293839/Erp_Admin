<style lang="scss" scoped type="text/scss">
    .el-radio + .el-radio {
        margin-left: 15px;
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
        line-height: 80px;
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
        /*justify-content: center;*/
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
        clear: both;
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
        box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.1);
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
        border-color: #409eff;
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

    .form_title {
        margin-bottom: 0;
    }

    .text {
        color: black;
    }
    /deep/ el-form  .el-input__inner,el-row .el-input__inner{
        text-align: center!important;
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

    .el-table__expanded-cell[class*="cell"] {
        padding: 5px 0px;
    }

    .inquery th {
        display: none !important;
    }

    .inquery .el-icon-arrow-right:before {
        content: "";
    }

    .el-col {
        min-height: 20px;
    }
</style>
<template>
    <div>
        <div class="item1">
            <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                <tr>
                    <th class="td">{{$t('Inquery.index.table6_title1')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title2')}}</th>
                    <th class="td">{{$t('Inquery.index.table3_title4')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title13')}}</th>
                    <th class="td" width="80">{{$t('Inquery.index.table6_title3')}}</th>
                    <th v-if="user_type!=102&&roles_ids.indexOf(42)==-1" class="td">{{$t('Inquery.index.table6_title4')}}</th>
                    <th v-if="user_type!=102&&roles_ids.indexOf(42)==-1" class="td">{{$t('Inquery.index.table6_title6')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title5')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title7')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title8')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title9')}}</th>
                    <th class="td">{{$t('Inquery.index.table6_title17')}}</th><!--结算价-->
                    <th class="td">{{$t('Inquery.index.table6_title15')}}</th><!--是否含税-->
                    <!--<th class="td">{{$t('Inquery.index.table6_title11')}}</th>-->
                    <!--<th class="td">{{$t('Inquery.index.table6_title12')}}</th>-->
                </tr>
                <tr v-for="inventory in inventory_total" :key="inventory.id +'inventory'">
                    <td>{{attr(inventory,'warehouse.name')}}</td>
                    <td>{{inventory.created_at.slice(0,10)}}</td>
                    <td>
                                <span v-if="inventory.is_consign==1">
                                    <span>{{inventory.batchno}}</span>
                                    <el-tag type="danger" size="mini">寄售</el-tag>
                                </span>
                        <span v-else>{{inventory.batchno}}</span>
                    </td>
                    <td>{{inventory.purchaseorder_no}}</td>
                    <td>{{inventory.purity}}</td>
                    <td v-if="user_type!=102&&roles_ids.indexOf(42)==-1">{{attr(inventory,'supplier.name')}}</td>
                    <td v-if="user_type!=102&&roles_ids.indexOf(42)==-1">{{inventory.original_stock}}{{getEnumValue(units_ku,inventory.original_stock_unit_id)}}</td>
                    <td>{{getEnumValue(enums_ku.ChemicalAppearance,inventory.chemprodappearance_id)}}</td>
                    <td>
                        <!-- <span v-if="inventory.qualityorder&&inventory.qualityorder.updated_at">{{(attr(inventory,'qualityorder.updated_at')).slice(0,10)}}</span>
                        <br>
                        {{getEnumValue(enums_ku.quality_check_results,attr(inventory,'qualityorder.result'))}} -->
                        <el-popover
                                v-if="inventory.checkresult_more_info"
                                placement="top-start"
                                width="300"
                                trigger="hover"
                        >
                            <span v-html="inventory.checkresult_more_info"></span>
                            <span slot="reference" v-html="inventory.checkresult_info"></span>
                        </el-popover>
                        <span v-else v-html="inventory.checkresult_info"></span>
                    </td>
                    <td>{{attr(inventory,'purchase.name')}}</td>
                    <td>{{inventory.stock}}{{units_ku[inventory.base_unit_id].name}}</td>
                    <td><span v-if="attr(inventory,'order.jiesuan_price')">
                                <!--{{attr(inventory,'order.jiesuan_price')}}-->
                                ￥{{inventory.order.jiesuan_price}}/<span v-if="inventory.order.quantity_unit==1||inventory.order.quantity_unit==3||inventory.order.quantity_unit==4||inventory.order.quantity_unit==5">g</span><span v-if="inventory.order.quantity_unit==2||inventory.order.quantity_unit==6">ml</span>
                            </span>
                        <span v-else>{{getEnumValue(enums_ku.Currency,attr(inventory,'order.currency_id'),'icon')}}{{inventory.order?inventory.order.price:''}}/{{inventory.order?getEnumValue(enums_ku.units,inventory.order.quantity_unit):''}}</span>
                    </td>
                    <td>
                       <span v-if="attr(inventory,'order.jiesuan_price')">
                                  不含税
                          </span>
                      <span v-else>
                              {{getEnumValue(GEnums.InvoiceInfo,attr(inventory,'order.invoice_type_id'))}}
                      </span>
                    </td>
                    <!--<td></td>-->
                    <!--<td></td>-->
                </tr>
            </table>
            <div
                    style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);padding: 5px;margin-bottom: 20px;"
            >
                <table v-if="quote" border="1" bordercolor="#E5E5E5" style="margin-top: 30px;">
                    <tr>
                        <th class="td" v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">{{$t('Inquery.index.table4_title1')}}</th><!--供应商名称-->
                        <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th><!--供应商价格-->
                        <th class="td">{{$t('Inquery.index.table4_title2')}}</th><!--采购进展-->
                        <th class="td">{{$t('Inquery.index.table4_title3')}}</th><!--交货城市-->
                        <th class="td">{{$t('Inquery.index.table4_title4')}}</th><!--供应商COA及谱图-->
                        <th class="td">{{$t('Inquery.index.table4_title5')}}</th><!--联系人-->
                        <th class="td">{{$t('Inquery.index.table4_title6')}}</th><!--联系方式-->
                        <th class="td">{{$t('Inquery.index.table4_title8')}}</th><!--修改时间-->
                    </tr>
                    <tr>
                        <td v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                            <span v-if="quote.supplier_id==0">
                               <span class="red">{{quote.supplier_name}} <span v-if="quote.platform">({{quote.platform}})</span></span>
                            </span>
                            <span v-else>
                                <span v-if="attr(quote,'supplier.supplier_status')==3">
                                     <el-tooltip class="item" effect="dark" content="限制性询价" placement="top">
                                        <span class="red"> {{attr(quote,'supplier.name')}}</span>
                                    </el-tooltip>
                                </span>
                                <span v-else>
                                    {{attr(quote,'supplier.name')}}
                                </span>
                            </span>
                        </td>
                        <td>{{list.price_string}}</td>
                        <td><span v-if='quote' v-html='quote.self_note'></span></td>
                        <td>{{quote?quote.delivery_city:''}}</td>
                        <td>
                            <a v-if="quote.supplier_coa&&quote.supplier_coa.length>0" v-for="coa in quote.supplier_coa" class="d2-ml-5" :href="coa.filename">{{coa.desc}}</a>
                        </td>
                        <td>{{quote?(quote.supplier_contact?quote.supplier_contact.name:''):''}}</td>
                        <td>
                            {{quote?(quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''):''}}
                        </td>
                        <td>{{quote?quote.updated_at:''}}</td>
                    </tr>
                </table>
                <table v-if="list.price&&list.price.length>0" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                    <tr>
                        <th class="td">{{$t('pack')}}</th>
                        <th class="td">{{$t('Inquery.index.table5_title3')}}</th><!--纯度-->
                        <th class="td">{{$t('Inquery.index.table8_title1')}}</th><!--交货期-->
                        <th class="td">{{$t('Inquery.index.table8_title2')}}</th><!--税票-->
                        <th class="td">{{$t('remark')}}</th>
                        <th class="td">{{$t('options')}}</th>
                    </tr>
                    <tr v-for="items in list.price">
                        <td>
                            <el-select size="mini" v-model="items.currency" :placeholder="$t('currency')"
                                       style="width: 70px;margin: 0 2px;">
                                <el-option
                                        v-for="item in Currency"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-input size="mini" type="text" class="input" :placeholder="$t('price')" v-model="items.price"
                                      style="width: 60px;margin: 0 2px;"></el-input>
                            /
                            <el-input size="mini" type="text" class="input" placeholder=""
                                      v-model="items.prefix_packsize"
                                      style="width: 60px;margin: 0 2px;"></el-input>
                            <el-select size="mini" v-model="items.prefix_packunit" :placeholder="$t('unit')"
                                       style="width: 70px;margin: 0 2px;">
                                <el-option
                                        v-for="item in units"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                            for
                            <el-input size="mini" type="text" class="input" placeholder=""
                                      v-model="items.postfix_packsize"
                                      style="width: 60px;margin: 0 2px;"></el-input>
                            <el-select size="mini" v-model="items.postfix_packunit" :placeholder="$t('unit')"
                                       style="width: 70px;margin: 0 2px;">
                                <el-option
                                        v-for="item in units"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input size="mini" type="text" class="input" :placeholder="$t('purity')" v-model="items.purity"
                                      style="width: 60px"></el-input>
                            %
                        </td>
                        <td>
                            <el-input size="mini" type="text" class="input" placeholder="" v-model="items.leadtime"
                                      style="width: 60px"></el-input>
                            <el-select size="mini" v-model="items.leadtime_unit" :placeholder="$t('leadtime')"
                                       style="width: 80px;margin: 0 2px;">
                                <el-option
                                        v-for="item in Cycle"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-select size="mini" v-model="items.invoice" :placeholder="$t('invoice')"
                                       style="width: 70px;margin: 0 2px;">
                                <el-option
                                        v-for="item in InvoiceInfo"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input size="mini" type="text" class="input" :placeholder="$t('remark')"
                                      v-model="items.note"></el-input>
                        </td>
                        <td>
                            <el-button type="primary" @click="select(items)" size="mini">{{$t('Inquery.index.selectd')}}</el-button>
                        </td>
                    </tr>
                </table>
                <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                    <tr>
                        <th class="td">{{$t('Inquery.index.table9_title1')}}</th><!--成交规格-->
                        <th class="td">{{$t('Inquery.index.table9_title2')}}</th><!--纯度(%)-->
                        <th class="td">{{$t('Inquery.index.table9_title3')}}</th><!--成交数量-->
                        <th class="td">{{$t('Inquery.index.table9_title4')}}</th><!--数量单位-->
                        <th class="td">{{$t('Inquery.index.table9_title5')}}</th><!--成交单价-->
                        <th class="td">{{$t('Inquery.index.table9_title6')}}</th><!--货币-->
                        <th class="td">{{$t('Inquery.index.table9_title7')}}</th><!--成交总价-->
                        <th class="td">{{$t('Inquery.index.table9_title8')}}</th><!--提交货时间-->
                        <th class="td">{{$t('Inquery.index.table9_title9')}}</th><!--客户回复-->
                        <th class="td">{{$t('Inquery.index.table9_title10')}}</th><!--发票类型-->
                        <th class="td">{{$t('Inquery.index.table9_title11')}}</th><!--是否现货-->
                    </tr>
                    <tr>
                        <td>
                            <el-input
                                size="mini"
                                type="text"
                                class="input"
                                placeholder
                                v-model="info.comfirm_pack"
                                name="comfirm_pack"
                        ></el-input>
                        </td>
                        <td>
                            <el-input
                                    size="mini"
                                    type="text"
                                    class="input"
                                    placeholder
                                    v-model="info.comfirm_purity"
                            ></el-input>
                        </td>
                        <td>
                            <el-input
                                    size="mini"
                                    type="text"
                                    class="input"
                                    placeholder
                                    v-model="info.comfirm_quantity"
                                    @input="handleEdit()"
                            ></el-input>
                        </td>
                        <td>
                            <el-select
                                    size="mini"
                                    v-model="info.comfirm_quantity_unit"
                                    placeholder=""
                            >
                                <el-option
                                        v-for="(item,index) in units"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input
                                    size="mini"
                                    type="text"
                                    class="input"
                                    placeholder
                                    v-model="info.comfirm_price"
                                    @input="handleEdit()"
                            ></el-input>
                        </td>
                        <td>
                            <el-select
                                    size="mini"
                                    v-model="info.comfirm_currency_id"
                                    placeholder=""
                            >
                                <el-option
                                        v-for="(item,index) in Currency"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input
                                    size="mini"
                                    type="text"
                                    class="input"
                                    placeholder
                                    v-model="info.comfirm_total_price"
                                    @input="handleEdit_total()"
                            ></el-input>
                        </td>
                        <td>
                            <el-date-picker
                                    size="mini"
                                    value-format="yyyy-MM-dd"
                                    v-model="info.comfirm_leadtime"
                                    type="date"
                                    style="width: 140px;padding-left: 30px;"
                            ></el-date-picker>
                        </td>
                        <td>
                            <el-input
                                    size="mini"
                                    type="text"
                                    class="input"
                                    placeholder
                                    v-model="info.comfirm_custreturninfo"
                            ></el-input>
                        </td>
                        <td>
                            <el-select
                                    size="mini"
                                    v-model="info.comfirm_invoice_type_id"
                                    placeholder=""
                            >
                                <el-option v-for="item in InvoiceInfo"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-select
                                    size="mini"
                                    v-model="info.comfirm_isstock"
                                    placeholder=""
                            >
                                <el-option v-for="item in isstock" :key="item.id" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="11">
                            <el-button type="primary" @click="save()" :loading="loading?true:false" size="mini">{{$t('save')}}</el-button>

                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <el-form v-if="show" label-width="0px">
            <div>
                <el-form-item class="form_title">
                    <b>{{$t('Inquery.index.table10_title1')}}</b>
                </el-form-item>
                <el-form-item class="form_title">
                    <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th class="td" width="80">#ID</th>
                            <th v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td" width="200">{{$t('Inquery.index.table11_title2')}}</th><!--供应商名称-->
                            <th class="td">{{$t('Inquery.index.table11_title6')}}</th><!--采购-->
                            <th class="td">{{$t('Inquery.index.table11_title7')}}</th><!--纯度-->
                            <th class="td">{{$t('Inquery.index.table11_title8')}}</th><!--数量-->
                            <th class="td">{{$t('Inquery.index.table11_title12')}}</th><!--单价-->
                            <th class="td">{{$t('Inquery.index.table11_title13')}}</th><!--金额-->
                            <th class="td">{{$t('Inquery.index.table11_title10')}}</th><!--提交货时间-->
                            <th class="td">{{$t('Inquery.index.table11_title14')}}</th><!--审核状态-->
                        </tr>
                        <tr v-for="item in notices">
                            <td>{{item.id}}</td>
                            <td v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                                <span v-if="item.supplier_id==0">
                                   <span class="red">{{item.supplier_name}} <span v-if="item.platform">({{item.platform}})</span></span>
                                </span>
                                <span v-else>
                                    <span v-if="attr(item,'supplier.supplier_status')==3">
                                         <el-tooltip class="item" effect="dark" content="限制性询价" placement="top">
                                            <span class="red"> {{attr(item,'supplier.name')}}</span>
                                        </el-tooltip>
                                    </span>
                                    <span v-else>
                                        {{attr(item,'supplier.name')}}
                                    </span>
                                 </span>
                            </td>
                            <td>{{item.purchase?item.purchase.name:''}}</td>
                            <td>{{item.purity}}</td>
                            <td>{{item.quantity}}{{units[item.quantity_unit].name}}</td>
                            <td>{{item.price}}{{Currency[item.currency_id].name}}</td>
                            <td>{{item.total_price}}{{Currency[item.currency_id].name}}</td>
                           
                            <td>{{item.delivery_date}}</td>
                            <td>{{check_status.filter(i=>{return i.id==item.check_status})[0].name}}</td>
                        </tr>
                    </table>
                </el-form-item>
            </div>
            <div>
                <el-form-item class="form_title">
                        <b >{{$t('Inquery.index.table10_title2')}}:
                        <b v-if="info.comfirm_quantity">
                            {{info.comfirm_quantity}}
                            {{units[info.comfirm_quantity_unit]?units[info.comfirm_quantity_unit].name:info.comfirm_quantity_unit}}
                        </b>
                    </b>
                </el-form-item>
                <el-form-item class="form_title">
                    <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th class="td" width="80">{{$t('Inquery.index.table11_title1')}}</th><!--ID-->
                            <th v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td"  width="200">{{$t('Inquery.index.table11_title2')}}</th><!--供应商名称-->
                            <th class="td" width="250">{{$t('Inquery.index.table11_title3')}}</th><!--报价信息-->
                            <th class="td" width="80">{{$t('Inquery.index.table11_title4')}}</th><!--交货城市-->
                            <th class="td" width="150">{{$t('Inquery.index.table11_title5')}}</th><!--报价时间-->
                            <th class="td">{{$t('Inquery.index.table11_title6')}}</th><!--采购-->
                            <th class="td">{{$t('Inquery.index.table11_title7')}}</th><!--纯度-->
                            <th class="td">{{$t('Inquery.index.table11_title8')}}</th><!--数量-->
                            <th class="td">{{$t('Inquery.index.table11_title9')}}</th><!--单位-->
                            <th class="td">指派仓库</th><!--指派仓库-->
                            <th class="td">{{$t('Inquery.index.table11_title10')}}</th><!--提交货时间-->
                            <th class="td" width="100">{{$t('Inquery.index.table11_title11')}}</th><!--操作-->
                        </tr>
                        <tr v-for="item in apply" :style="item.flag==1?'background:rgb(249, 233, 150);':''">
                            <td>{{item.id}}</td>
                            <td v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                                <span v-if="item.supplier_id==0">
                                   <span class="red">{{item.supplier_name}} <span v-if="item.platform">({{item.platform}})</span></span>
                                </span>
                                <span v-else>
                                    <span v-if="attr(item,'supplier.supplier_status')==3">
                                         <el-tooltip class="item" effect="dark" content="限制性询价" placement="top">
                                            <span class="red"> {{attr(item,'supplier.name')}}</span>
                                        </el-tooltip>
                                    </span>
                                    <span v-else>
                                        {{attr(item,'supplier.name')}}
                                        <el-tag v-if="item.is_from_consign" type="danger" size="mini">寄售</el-tag>
                                    </span>
                                 </span>
                            </td>
                            <td><el-badge v-if="item.statistics_purchase_contracts&&item.statistics_purchase_contracts!=''&&item.statistics_purchase_contracts!=0" :value="item.statistics_purchase_contracts" class="badge">
                            </el-badge>{{item.info_string}}</td>
                            <td>{{item.delivery_city}}</td>
                            <td>{{item.created_at}}</td>
                            <td>
                                <el-select
                                        class="d2-text-center"
                                        size="mini"
                                        v-model="item.purchase_user_id"
                                >
                                    <el-option
                                            v-for="(i,index) in purchase_lists"
                                            :key="index"
                                            :label="i.name"
                                            :value="i.id"
                                            :disabled="item.purchase_user_id==191?true:false"
                                    ></el-option>

                                </el-select>
                            </td>
                            <td>
                                <el-input size="mini" type="text" v-model="item.purity"></el-input>
                            </td>
                            <td>
                                <el-input size="mini" type="text" v-model="item.quantity"></el-input>
                            </td>
                            <td>
                                <el-select
                                        class="d2-text-center"
                                        size="mini"
                                        v-model="item.unit_id"
                                >
                                    <el-option
                                            v-for="(item,index) in units"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </td>
                             <td>
                               <el-select
                                    size="mini"
                                    v-model="item.procurement_warehouse"
                                    placeholder=""
                            >
                                <el-option v-for="(item,index) in GEnums.ProcurementWarehouse" :key="index" :label="item.name" :value="item.name"></el-option>
                            </el-select> 
                            </td>
                            <td>
                                <el-date-picker
                                        type="date"
                                        style="width:100%;"
                                        v-model="item.delivery_date"
                                        value-format="yyyy-MM-dd"
                                        prefix-icon="aa"
                                        size="small"
                                ></el-date-picker>
                            </td>
                            <td>
                                <el-button v-if="notices.length>0&&item.is_old!=1" type="danger" @click="save_item(item)" :loading="item.loading" size="mini">{{$t('again_assign')}}</el-button>
                                <el-button v-if="(notices==null||notices.length==0)&&item.is_old!=1" type="primary" @click="save_item(item)" :loading="item.loading" size="mini">{{$t('assign')}}</el-button>
                            </td>
                        </tr>
                    </table>

                </el-form-item>
            </div>
        </el-form>
        <!-- 编辑地址 -->
        <el-dialog
                :title="$t('Inquery.index.table12_title1')"
                :visible.sync="dialogAddresses"
                width="60%"
                append-to-body
                @close="delete_receive_good(addressItem)"
        >
            <table
                    border="1"
                    bordercolor="#E5E5E5"
                    style="border-collapse: collapse;width:100%;margin-bottom:10px;"
            >
                <tr>
                    <td style="width:60px;">{{$t('Inquery.index.table12_title2')}}</td><!--国家-->
                    <td style="width:100px;">{{$t('Inquery.index.table12_title3')}}</td><!--城市-->
                    <td>{{$t('Inquery.index.table12_title4')}}</td><!--地址-->
                    <td style="width:80px;">{{$t('Inquery.index.table12_title5')}}</td><!--联系人-->
                    <td style="width:110px;">{{$t('Inquery.index.table12_title6')}}</td><!--电话-->
                    <td style="width:110px;">{{$t('Inquery.index.table12_title7')}}</td><!--邮箱-->
                    <td style="width:40px;">{{$t('Inquery.index.table12_title8')}}</td><!--类型-->
                    <td style="width:60px;">{{$t('Inquery.index.table12_title9')}}</td><!--是否默认-->
                    <td style="width:110px;">{{$t('Inquery.index.table12_title10')}}</td><!--操作-->
                </tr>
                <tr v-for="item in addressList">
                    <td>{{item.country_code}}</td>
                    <td>{{item.city_id}}</td>
                    <td>{{item.address}}</td>
                    <td>{{item.contact_name}}</td>
                    <td>{{item.mobile}}</td>
                    <td>{{item.email}}</td>
                    <td>{{user_type[item.user_type]}}</td>
                    <td>{{item.is_default==1?'是':'否'}}</td>
                    <td>
                        <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
                        <el-button type="danger" size="mini" @click="destory_address(item)">{{$t('delete')}}</el-button>
                    </td>
                </tr>
            </table>
            <el-form label-position="right" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('Inquery.index.table12_title2')" :required="true">
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
                        <el-form-item :label="$t('Inquery.index.table12_title3')" :required="true">
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
                <el-form-item :label="$t('Inquery.index.table12_title4')" :required="true">
                    <el-input v-model="addressItem.address" size="small" placeholder="Please Write"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('Inquery.index.table12_title5')" :required="true">
                            <el-input v-model="addressItem.contact_name" size="small" placeholder="Please Write"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item :label="$t('Inquery.index.table12_title6')" :required="true">
                            <el-input v-model="addressItem.mobile" size="small" placeholder="Please Write"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('Inquery.index.table12_title7')">
                            <el-input v-model="addressItem.email" size="small" placeholder="Please Write"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-form-item label="类型">
                  <el-select v-model="addressItem.user_type" size="mini" placeholder="Please Select">
                    <el-option
                      v-for="(item,index) in user_type"
                      :key="index"
                      :label="user_type[index]"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item :label="$t('is_default')">
                    <el-switch
                            name="is_default"
                            v-model="addressItem.is_default"
                            :active-value="1"
                            :inactive-value="0"
                            active-text="开"
                            inactive-text="关"
                    ></el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="save_receive_good(addressItem)">{{$t('save')}}</el-button>
                    <el-button size="mini" @click="delete_receive_good(addressItem)">{{$t('cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {
        getInstore,
        confirmGenerate,
        confirmCreate,
        outPrice,
        supplier_lists,
        contacts_lists,
        create,
        update,
        previewEmail,
        getInquiryNotices,
        applyPurchase,
        purchase_lists,
        inquiryNoticesCreate,
        receive_address,
        receive_address_update,
        receive_address_create,
        receive_address_destory,
        inquiryNoticesCreateFromConsign
    } from "@/api/Inquery";
    import Big from "@/big/a/big.mjs";
    import util from "@/libs/util";
    import { city_list, country_list } from "@/api/user";
    import $ from "jquery";
    import { getDay } from '@/utils/index'
    export default {
        name: "",
        data() {
            return {
                dialogAddresses:false,
                user_type:[],
                member_id:'',
                addressItem: {
                    country_code: "",
                    city_id: "",
                    city: [],
                    address: "",
                    contact_name: "",
                    mobile: "",
                    email: "",
                    is_default: 0,
                    user_type: "102",
                    member_id: "",
                    type: 1
                },
                country:[],
                addressList:[],
                inquiry_id: "",
                payment_day_id: "",
                Currency: [],
                InvoiceInfo: [],
                units: [],
                payment_day_info: [],
                receive_addresses: [],
                isstock: [],
                list: [],
                quote: {},
                Cycle: {},
                info: {
                        inquiry_id: "",
                        comfirm_pack: "",
                        comfirm_purity: "",
                        comfirm_quantity:"",
                        comfirm_quantity_unit: "",
                        comfirm_price: "",
                        comfirm_currency_id: "",
                        comfirm_total_price: "",
                        comfirm_leadtime: '',
                        comfirm_custreturninfo: "",
                        comfirm_invoice_type_id: "",
                        comfirm_isstock: "",
                        comfirm_settle_type_id: "",
                        comfirm_settle_type: "",
                        invoice_address_id: "",
                        skuno:''
                    },
                loading: false,
                assign_loading:false,
                show: false,
                notices: [],
                Currency: [],
                check_status: [],
                apply: [],
                purchase_lists: [],
                roles_ids:[],
                inventory_total:[],
                specs:[],
                units_ku:[],
                enums_ku:[],
            };
        },
        props: ["datas", "id","prod_id",'order_time'],
        watch: {
            order_time(val) {
                if (this.datas != undefined) {
                    this.user_type=util.cookies.get('user_type')
                    this.user_id=util.cookies.get('user_id')
                    this.fetchData()
                }
            },
        },
        created() {
            this.user_type=util.cookies.get('user_type')
            this.user_id=util.cookies.get('user_id')
            var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
            this.roles_ids=[]
            roles_ids_list.forEach(item=>{
                this.roles_ids.push(item.id)
            })
            if (this.datas != undefined && this.id != undefined) {
                this.info.inquiry_id = this.id;
                this.fetchData();
            }

        },
        methods: {
            fetchData() {
                this.show=false
                this.list=[]
                this.quote={}
                this.info= {
                        inquiry_id: this.id,
                        comfirm_pack: "",
                        comfirm_purity: "",
                        comfirm_quantity:"",
                        comfirm_quantity_unit: "",
                        comfirm_price: "",
                        comfirm_currency_id: "",
                        comfirm_total_price: "",
                        comfirm_leadtime: getDay(),
                        comfirm_custreturninfo: "",
                        comfirm_invoice_type_id: "",
                        comfirm_isstock: "",
                        comfirm_settle_type_id: "",
                        comfirm_settle_type: "",
                        invoice_address_id: "",
                        skuno:''
                    }
                this.apply=[]
                getInstore(this.prod_id).then(res => {
                    if (res && res.code == 0) {
                        this.inventory_total = res.data.inventories;
                        this.specs = res.data.specs;
                        this.units_ku=res.enum.units
                        this.enums_ku=res.enum
                    }
                })
                purchase_lists().then(res => {
                    if (res && res.code == 0) {
                        this.purchase_lists = res.data
                    }
                })
                confirmGenerate(this.id).then(res => {
                    if(res.data.outprice){
                        this.list = res.data.outprice;
                        this.quote = res.data.outprice.quote
                    }else{
                        this.quote =null
                    }
                    this.member_id=res.data.member.id
                    if(res.data.confirm){
                        // res.data.confirm.comfirm_quantity_unit
                        // res.data.confirm.comfirm_currency_id
                        // res.data.confirm.comfirm_invoice_type_id
                        // res.data.confirm.comfirm_currency_id
                        this.info=res.data.confirm
                        this.show=true

                        applyPurchase(this.id).then(res => {
                            if (res && res.code == 0) {
                                res.data.forEach((items,index)=>{
                                    if(items.user_id==1&&items.list_sort==2&&items.supplier_id!=49293&&items.supplier_id!=44033&&items.supplier_id!=39057){
                                        items.purchase_user_id=191
                                    }else{
                                        items.purchase_user_id=items.inquiry.purchaseuser?items.inquiry.purchaseuser.id:0;
                                    }

                                    // items.purchase_user_id=items.inquiry.purchaseuser?items.inquiry.purchaseuser.id:0;
                                    items.purity=this.info.comfirm_purity;
                                    items.quantity=this.info.comfirm_quantity;
                                    items.unit_id=this.info.comfirm_quantity_unit;
                                    items.delivery_date=this.info.comfirm_leadtime;
                                });
                                res.data.forEach((items,index)=>{
                                    items.procurement_warehouse=this.GEnums.ProcurementWarehouse[1].name
                                })
                                res.data.forEach(res=>{
                                    res.loading=false
                                })
                                this.apply = res.data;
                                this.inventory_total.forEach(item=>{
                                    if(item.is_consign==1){
                                        this.apply.unshift({
                                            is_from_consign:1,
                                            supplier_id:item.supplier_id,
                                            supplier:{
                                                name:item.supplier.name
                                            },
                                            inquiry_id:this.id,
                                            purchase_user_id:item.purchase.id,
                                            purity:this.info.comfirm_purity,
                                            quantity:this.info.comfirm_quantity,
                                            unit_id:this.info.comfirm_quantity_unit,
                                            delivery_date:this.info.comfirm_leadtime,
                                            batchno:item.batchno,
                                            procurement_warehouse:this.GEnums.ProcurementWarehouse[1].name
                                        })
                                    }
                                })
                            }
                        });
                    }
                    this.payment_day_id = res.data.payment_day_id;
                    this.receive_addresses = [];
                    res.data.member.receive_addresses.forEach((m, n) => {
                        if (m.type == 1) {
                            this.receive_addresses.push(m);
                        }
                    });
                    this.Currency = res.enum.Currency;
                    this.InvoiceInfo = res.enum.InvoiceInfo;
                    this.isstock = res.enum.isstock;
                    this.units = res.enum.units;
                    this.Cycle = res.enum.Cycle
                    this.payment_day_info =res.enum.payment_day_info[res.data.member ? res.data.member.custmoer_type : ''];
                });
                this.get_InquiryNotices();
            },
            invoice_edit() {
                this.dialogAddresses = true;
                country_list().then(res => {
                        this.country = res.data;
                    });
                    receive_address(this.member_id, 1).then(res => {
                        this.addressList = res.data;
                        this.receive_addresses=res.data;
                        this.user_type = res.enum.user_type;
                    });
            },
            save_receive_good(item) {
                if (item.id) {
                    receive_address_update(item, item.id, this);
                } else {
                    item.member_id =this.member_id
                    receive_address_create(item, this);
                }
            },
            update_address(item) {
                this.addressItem.country_code = item.country_code;
                this.addressItem.address = item.address;
                this.addressItem.contact_name = item.contact_name;
                this.addressItem.mobile = item.mobile;
                this.addressItem.email = item.email;
                this.addressItem.user_type = item.user_type.toString();
                this.addressItem.is_default = item.is_default;
                this.addressItem.member_id = this.member_id;
                this.addressItem.type = 1;
                this.addressItem.id = item.id;
                this.selected_country_address(this.addressItem);
                this.addressItem.city_id = item.city_id;
            },
            selected_country_address(item) {
                if (item.city_id) {
                    item.city_id = "";
                }
                city_list(item.country_code, "").then(res => {
                    this.$set(item, "city", res.data);
                });
            },
            delete_receive_good() {
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
                    user_type: "102",
                    member_id: "",
                    type:1
                };
            },
            destory_address(item) {
                receive_address_destory(
                    item,
                    "saler_contract",
                    "receive_address_destory",
                    this
                );
            },
            generate(id){
                this.$router.push({
                    name:'procure-agree',
                    path:'procure/agree',
                    query:{
                        id:[id]
                    }
                })
            },
            save_item(item){
                if(item.is_from_consign==1){
                    let obj={
                        inquiry_id:this.id,
                        is_from_consign:1,
                        supplier_name:item.supplier.name,
                        batchno:item.batchno,
                        purchase_user_id:item.purchase_user_id,
                        purity:item.purity,
                        quantity:item.quantity,
                        unit_id:item.unit_id,
                        delivery_date:item.delivery_date,
                        procurement_warehouse:item.procurement_warehouse
                    };
                    inquiryNoticesCreateFromConsign(obj).then(res=>{
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                        }
                    })
                }else{
                    let obj={
                        inquiry_id:this.id,
                        quote_id:item.id,
                        purchase_user_id:item.purchase_user_id,
                        purity:item.purity,
                        quantity:item.quantity,
                        unit_id:item.unit_id,
                        delivery_date:item.delivery_date,
                        procurement_warehouse:item.procurement_warehouse
                    };
                    getInstore(this.prod_id,item.quantity,item.unit_id).then(res => {
                        if (res && res.code == 0) {
                            if(res.data.inventories&&res.data.inventories.length>0&&res.data.is_adequate==1){
                                this.$confirm('艾康库存有现货, 是否继续指派采购?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    inquiryNoticesCreate(obj,this,item);
                                }).catch(() => {
                                });
                            }else if(res.data.inventories.length==0||res.data.is_adequate==0){
                                if(this.notices.length>0){
                                    this.$confirm('该询单已有指派记录, 是否继续?', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                    }).then(() => {
                                        inquiryNoticesCreate(obj,this,item);
                                    }).catch(() => {
                                    });
                                }else{
                                    inquiryNoticesCreate(obj,this,item);
                                }
                            }
                        }
                    });
                }
            },
            select(info) {
                var date1 = new Date();
                var date2 = new Date(date1);
                if(!info.purity){
                    info.purity=''
                }
                if(info.leadtime_unit==2){
                    date2.setDate(date1.getDate()+ 2);
                }else if(info.leadtime_unit==3){
                    date2.setDate(date1.getDate()+ parseInt(info.leadtime));
                }else if(info.leadtime_unit==4){
                    date2.setDate(date1.getDate()+ parseInt(info.leadtime)*7+ 7);
                }else if(info.leadtime_unit==5){
                    date2.setDate(date1.getDate()+ parseInt(info.leadtime)*30);
                }
                var comfirm_leadtime = date2.getFullYear()+"-"+(date2.getMonth()+1)+"-"+date2.getDate();
                this.info={
                    inquiry_id: this.id,
                    comfirm_pack: "",
                    comfirm_purity: info.purity+'%',
                    comfirm_quantity: '',
                    comfirm_quantity_unit: info.prefix_packunit,
                    comfirm_price: '',
                    comfirm_currency_id: info.currency,
                    comfirm_total_price: info.price,
                    comfirm_leadtime: comfirm_leadtime,
                    comfirm_custreturninfo: "",
                    comfirm_invoice_type_id: info.invoice,
                    comfirm_isstock: info.leadtime_unit == 2 ? 1 : 0,
                    comfirm_settle_type_id: info.comfirm_settle_type_id?info.comfirm_settle_type_id:'',
                    comfirm_settle_type: info.comfirm_settle_type?info.comfirm_settle_type:'',
                    invoice_address_id: info.invoice_address_id?info.invoice_address_id:'',
                    skuno:info.skuno?info.skuno:'',
                }
                if(!info.purity){
                    this.info.comfirm_purity= ''
                }
                if(info.postfix_packsize) {
                    this.info.comfirm_quantity=info.postfix_packsize;
                    this.info.comfirm_quantity_unit=info.postfix_packunit;
                    if(!info.prefix_packsize){
                        this.info.comfirm_price = info.price;
                        if(info.postfix_packunit!=info.prefix_packunit){
                            var fz = ''
                            var fm = ''
                            var rate = ''
                            for(var i in this.units){
                                if(info.postfix_packunit == this.units[i].name){
                                    fz = this.units[i].rate
                                }
                                if(info.prefix_packunit == this.units[i].name){
                                    fm = this.units[i].rate
                                }
                            }
                            rate = (new Big(fz).div(fm))
                            this.info.comfirm_price = (new Big(this.info.comfirm_price).times(rate)).toFixed(2);
                        }
                        this.info.comfirm_total_price = (new Big(this.info.comfirm_price).times(info.postfix_packsize)).toFixed(2);
                    }else{
                        this.info.comfirm_price = (new Big(info.price).div(info.prefix_packsize)).toFixed(2);
                        if(info.postfix_packunit!=info.prefix_packunit){
                            var fz = ''
                            var fm = ''
                            var rate = ''
                            for(var i in this.units){
                                if(info.postfix_packunit == this.units[i].name){
                                    fz = this.units[i].rate
                                }
                                if(info.prefix_packunit == this.units[i].name){
                                    fm = this.units[i].rate
                                }
                            }
                            rate = (new Big(fz).div(fm))
                            this.info.comfirm_price = (new Big(this.info.comfirm_price).times(rate)).toFixed(2);
                        }
                        this.info.comfirm_total_price = (new Big(this.info.comfirm_price).times(info.postfix_packsize)).toFixed(2);
                    }
                }else{
                    this.info.comfirm_quantity=info.prefix_packsize;
                    if(info.prefix_packsize){
                        this.info.comfirm_price=(new Big(info.price).div(info.prefix_packsize)).toFixed(2);
                    }else{
                        this.info.comfirm_price=info.price;
                    }
                }
            },

            handleEdit() {
                this.info.comfirm_total_price =(new Big(this.info.comfirm_quantity).times(this.info.comfirm_price)).toFixed(2);
            },
            handleEdit_total() {
                this.info.comfirm_price = (new Big(this.info.comfirm_total_price).div(this.info.comfirm_quantity)).toFixed(2);
            },
            select_payment(id) {
                this.payment_day_info.forEach((items, index) => {
                    if (id == items.id) {
                        this.info.comfirm_settle_type = items.name;
                    }
                });
            },
            go_to(id) {
                this.$router.push({
                    path: "/User/customerForm",
                    name: "User-customerForm",
                    query: {
                        id: id
                    }
                });
            },
            get_InquiryNotices(){
                this.notices=[]
                getInquiryNotices(this.id).then(res => {
                    if (res && res.code == 0) {
                        this.notices = res.data
                        this.Currency = res.enum.Currency
                        this.check_status = res.enum.check_status
                    }
                })
            },
            save() {
                if(!this.info.comfirm_leadtime){
                    this.$message({
                        message: '请选择提交货时间!',
                        type: 'error'
                    });
                    return
                }
                for (var key in this.units) {
                    if (this.units[key].name == this.info.comfirm_quantity_unit || this.units[key].name_cn == this.info.comfirm_quantity_unit) {
                        this.info.comfirm_quantity_unit = key
                    }
                }
                if(isNaN(this.info.comfirm_currency_id)){
                    for (var key in this.Currency) {
                        if (this.Currency[key].name == this.info.comfirm_currency_id || this.Currency[key].name_cn == this.info.comfirm_currency_id || this.Currency[key].name == this.info.comfirm_currency_id.toUpperCase()) {
                            this.info.comfirm_currency_id = key
                        }
                    }
                }
                for (var key in this.InvoiceInfo) {
                    if (this.InvoiceInfo[key].name == this.info.comfirm_invoice_type_id || this.InvoiceInfo[key].name_cn == this.info.comfirm_invoice_type_id) {
                        this.info.comfirm_invoice_type_id = key
                    }
                }
                this.loading=true
                confirmCreate(this.info).then(res => {
                    if (res && res.code == 0) {
                        this.loading=false
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.fetchData();
                        this.get_InquiryNotices()
                        applyPurchase(this.id).then(res => {
                            if (res && res.code == 0) {
                                res.data.forEach((items,index)=>{
                                    items.purchase_user_id=items.inquiry.purchaseuser.id
                                    items.purity=''
                                    items.quantity=''
                                    items.unit_id=1
                                    items.delivery_date=''
                                })
                                res.data.forEach(res=>{
                                    res.loading=false
                                })
                                this.apply = res.data
                            }
                        })
                        this.show = true
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }).catch(rr => {
                     this.loading=false
                });
            },
            handleCurrentChange() {
            }
        }
    };
</script>

