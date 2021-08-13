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
        line-height: 80px;
    }

    .el-pagination {
        text-align: right;
        margin: 10px;
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

    .div {
        width: 100%;
        overflow: auto;
        font-size: 14px;
        margin: 0px auto;
        border: 1px solid #e5e5e5;
        .form_title {
            background: #f1f1f1;
            margin-bottom: 0px;
            .el-button {
                color: black;
            }
        }
    }

    .from-item {
        width: 100%;
        display: flex;
        overflow: auto;
        flex-wrap: wrap;
        /deep/.el-form-item__content{
            width: 100%;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
    }
    /deep/.checkbox_nei{
    margin-left: 10px;padding-left:0px;
    .el-checkbox__label{padding-left:0px;}
  }
/deep/.el-checkbox__label{padding-left:5px;}
.el-checkbox{margin-right: 0px;}
.sales /deep/.el-input__inner {
        border: none;
    }
</style>
<template>
    <d2-container>
        <div class="div sales">
            <el-form label-width="0px">
                <div>
                    <el-form-item class="form_title">
                        <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale1')}}</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show1" class="from-item">
                        <table border="1" bordercolor="#E5E5E5" >
                            <tr>
                                <th class="td">{{$t('sale.add.sale2')}}</th>
                                <th class="td">{{$t('sale.add.sale3')}}</th>
                                <th class="td">{{$t('sale.add.sale4')}}</th>
                                <th class="td">{{$t('sale.add.sale5')}}</th>
                                <th class="td">{{$t('sale.add.sale6')}}</th>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale7')}}</td>
                                <td>
                                    <!-- <el-autocomplete
                                            v-model="sale.customer_name"
                                            :fetch-suggestions="querySearchAsync_customer"
                                            @select="handleSelect_customer"
                                            style="width: 100%;"
                                    >
                                        <template slot-scope="{ item }">
                                            <div class="mac">{{ item.name }}</div>
                                        </template>
                                    </el-autocomplete> -->
                                    {{sale.customer_name}}
                                    <span style="margin-left:5px;color:red;" v-if="sale.customer_name2&&(sale.customer_name2!=sale.customer_name)">{{'('+sale.customer_name2+')'}}</span>
                                </td>
                                <td>
                                    <el-input v-model="sale.customer_contact"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="sale.customer_mobile"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="sale.customer_fax"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale8')}}</td>
                                <td>
                                    <!-- <el-select v-model="sale.corp_id" @change="get_custcontact_crop_id(sale.corp_id)"
                                               clearable filterable>
                                        <el-option
                                                v-for="i in corp"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select> -->
                                    {{sale.corp_name}}
                                </td>
                                <td>
                                    <el-input v-model="sale.corp_contact"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="sale.corp_mobile"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="sale.corp_fax"></el-input>
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <div style="margin:20px 0px;">
                    <el-form-item class="form_title">
                        <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale9')}}</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.detail" :key="index">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">{{$t('sale.add.sale84')}}</th>
                                <th class="td">{{$t('sale.add.sale14')}}</th>
                                <th class="td" width='150'>Cas</th>
                                <th class="td" width="200">{{$t('sale.add.sale15')}}</th>
                                <th class="td">{{$t('sale.add.sale16')}}</th>
                                <th class="td">{{$t('sale.add.sale17')}}</th>
                                <th class="td">{{$t('sale.add.sale18')}}</th>
                                <th class="td">{{$t('sale.add.sale19')}}</th>
                                <th class="td">{{$t('sale.add.sale20')}}</th>
                                <th class="td">{{$t('sale.add.sale21')}}</th>
                                <th class="td" width='90'>{{$t('sale.add.sale22')}}</th>
                                <th class="td" width="130">{{$t('sale.add.sale23')}}</th>
                            </tr>
                            <tr>
                                <td>
                                    <el-input v-model="item.inquiry_id" disabled></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.batchno" disabled></el-input>
                                </td>
                                <td>
                                    <el-autocomplete
                                            v-model="item.cas"
                                            :fetch-suggestions="querySearchAsync"
                                            placeholder=""
                                            @select="handleSelect"
                                    >
                                        <template slot-scope="{ item }">
                                            <div @click="get_index(index)">{{ item.cas }}</div>
                                        </template>
                                    </el-autocomplete>
                                </td>
                                <td>
                                    <el-input v-model="item.product_name_cn"></el-input>
                                </td>

                                <td>
                                    <el-input v-model="item.package"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.purity"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.quantity" ></el-input>
                                </td>
                                <td>
                                    <el-select v-model="item.quantity_unit" clearable filterable
                                               placeholder="">
                                        <el-option
                                                v-for="i in units"
                                                :key="i.id"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="item.currency_id" clearable filterable>
                                        <el-option
                                                v-for="i in currencys"
                                                :key="i.id"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="item.price"></el-input>
                                </td>
                                <td>
                                    {{(Number(item.total_money) - Number(item.additional_cost)).toFixed(2)}}
                                </td>
                                <td>
                                    <el-date-picker
                                            type="date"
                                            style="width:100%;"
                                            v-model="item.leadtime"
                                            value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale24')}}</td>
                                <td colspan="2">
                                    <el-input v-model="item.prod_no"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.product_name" placeholder="english product name"></el-input>
                                </td>
                                <td>{{$t('sale.add.sale25')}}</td>
                                <td>
                                    <el-select v-model="item.invoice_type_id" clearable filterable
                                               style="width: 140px;">
                                        <el-option
                                                v-for="i in invoice_type"
                                                :key="i.id"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-button type="primary" size="mini" @click="show_dialog(index)">{{$t('sale.add.sale26')}}</el-button>
                                </td>
                                <td>{{item.additional_cost}}</td>
                                <td>{{$t('sale.add.sale124')}}</td>
                                <td>{{item.commission}}</td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale27')}}</td>
                                <td colspan="11" class="checkbox">
                                      <span v-for="i in item.test_item" :key="i.id" v-if="i.child.length==0" :label="i.id" style="margin:0 5px">
                                        <el-checkbox  v-model="i.checked" name="type">
                                            {{i.name}}
                                        </el-checkbox>
                                      </span><br>
                                    <div v-for="i in item.test_item" :key="i.id" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                                            <!-- <el-checkbox   v-model="i.checked" @change="select_parent(index,i)" name="type" > -->
                                                <span class="checked_items" style="font-weight: bold;">
                                                    {{i.name}}
                                                </span>:
                                            <!-- </el-checkbox>: -->
                                            <el-checkbox v-for="j in i.child" :key="j.id" :label="j.id" v-model="j.checked"  @change="select(index,j,item.id)" class="checkbox_nei"><span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale28')}}</td>
                                <td colspan="5">
                                    <el-input v-model="item.checked_requirement"></el-input>
                                </td>
                                <td colspan="2">{{$t('sale.add.sale29')}}</td>
                                <td colspan="4">
                                    <el-select v-model="item.if_declare" style="width:100%;">
                                        <el-option
                                                v-for="i in if_declare_info"
                                                :key="i.id"
                                                :label="i.name"
                                                :value="i.id"
                                        ></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale31')}} </td>
                                <td colspan="5">
                                    <div v-for="(i,index_i) in item.claims">
                                         <el-input v-model="i.claim_pack_number"
                                              style="width: 80px;border: 1px solid #f2f2f2;"></el-input>*
                                        <el-input v-model="i.claim_pack_size"
                                                style="width: 80px;border: 1px solid #f2f2f2;"></el-input>
                                        /
                                        <el-select v-model="i.claim_unit_id"
                                                style="width: 100px;border: 1px solid #f2f2f2;">
                                            <el-option
                                                    v-for="i in units"
                                                    :key="i.id"
                                                    :label="i.name"
                                                    :value="i.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </td>
                                <td colspan="2">{{$t('sale.add.sale32')}}</td>
                                <td colspan="5">
                                    <el-date-picker
                                            type="date"
                                            style="width:100%;"
                                            v-model="item.required_delivery_date"
                                            value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale33')}}</td>
                                <td colspan="5">
                                    <el-input v-model="item.label_requirement"></el-input>
                                </td>
                                <td colspan="2">{{$t('sale.add.sale34')}}</td>
                                <td colspan="4">
                                    <el-input v-model="item.deliver_note"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale35')}}</td>
                                <td colspan="5">
                                    <el-checkbox-group v-model="item.product_file">
                                        <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id"
                                                     name="type">{{i.name}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </td>
                                <td colspan="2">{{$t('sale.add.sale36')}}</td>
                                <td colspan="5">
                                    <el-radio-group v-model="item.if_auto_delivery">
                                        <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio>
                                        <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio>
                                    </el-radio-group>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale39')}}</td>
                                <td colspan="5">
                                    <el-radio-group v-model="item.is_generation">
                                        <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                                        <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                                    </el-radio-group>
                                </td>
                                <td colspan="2">{{$t('sale.add.sale294')}}</td>
                                <td colspan="5">
                                    <el-radio-group v-model="item.inventory_auto_preempt">
                                        <el-radio v-for="i in inventory_auto_preempt_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale289')}}</td>
                                <td colspan="5">
                                    <el-radio-group v-model="item.is_straight_hair">
                                        <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                                        <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                                    </el-radio-group>
                                </td>
                                <td colspan="2">{{$t('sale.add.sale278')}}</td>
                                <td colspan="5">
                                    <el-input v-model="item.straight_hair_note"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>是否中转</td>
                                <td colspan="12">
                                    <el-radio-group v-model="item.is_transfer">
                                        <el-radio :label="2">{{$t('sale.add.sale40')}}</el-radio>
                                        <el-radio :label="1">{{$t('sale.add.sale41')}}</el-radio>
                                    </el-radio-group>
                                    <el-select
                                        placeholder="仓库"
                                        filterable
                                        v-model="item.transfer_warehouse_id"
                                        v-if="item.is_transfer==2"
                                        style="width:200px;border-bottom:1px solid #dcdfe6;margin-left:50px;"
                                        size="mini"
                                    >
                                        <el-option
                                        v-for="item in GEnums.Warehouse"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                        ></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr v-if="index==(sale.detail.length-1)">
                                <td colspan="6"></td>
                                <td colspan="2">{{$t('sale.add.sale42')}}</td>
                                <td colspan="4">
                                    {{sale.total_money>0?sale.total_money:''}}
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale43')}}</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show3" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">{{$t('sale.add.sale44')}}</th>
                                <th class="td">{{$t('sale.add.sale45')}}</th>
                                <th class="td">{{$t('sale.add.sale46')}}</th>
                                <th class="td">{{$t('sale.add.sale47')}}</th>
                                <th class="td">PO</th>
                                <th style="min-width:400px">{{$t('sale.add.sale48')}}</th>
                            </tr>
                            <tr>
                                <td>
                                    <el-input v-model="sale.contract_number"></el-input>
                                </td>
                                <td>
                                    <el-date-picker
                                            type="date"
                                            style="width:100%;"
                                            v-model="sale.contract_date"
                                            value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </td>
                                <td>
                                    <el-input v-model="sale.contract_address"></el-input>
                                </td>
                                <td>
                                    <el-select v-model="sale.sale_id" clearable filterable>
                                        <el-option
                                                v-for="(i,index) in sale_list"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="sale.customer_po"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="sale.settle_type"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale49')}}</td>
                                <td>
                                    <el-select v-model="sale.trade_type_id" clearable filterable
                                               placeholder="">
                                        <el-option
                                                v-for="(i,index) in trade_mode"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td><span style="color:red;">*</span>交货天数</td>
                                <td>
                                    <el-input style="width:80%;" v-model="sale.delivery_days"></el-input>
                                    <span>天</span>
                                </td>
                                <!--<td>是否含税</td>-->
                                <!--<td>-->
                                    <!--<el-radio-group v-model="sale.if_invoice">-->
                                        <!--<el-radio :label="1">含税</el-radio>-->
                                        <!--<el-radio :label="0">不含税</el-radio>-->
                                    <!--</el-radio-group>-->
                                <!--</td>-->
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale50')}}</td>
                                <td colspan="6">
                                    <el-input v-model="sale.quality_stardard"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale51')}}</td>
                                <td colspan="6">
                                    <el-input v-model="sale.reasonable_loss"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale52')}}</td>
                                <td colspan="6">
                                    <el-input v-model="sale.package_stardard"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale53')}}</td>
                                <td colspan="6">
                                    <el-input v-model="sale.accept_stardard"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale54')}}</td>
                                <td colspan="1">
                                    <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            v-model="sale.expdate_start"
                                            type="date"
                                    >
                                    </el-date-picker>
                                </td>
                                <td>{{$t('sale.add.sale55')}}</td>
                                <td colspan="1">
                                    <el-date-picker
                                            value-format="yyyy-MM-dd"
                                            v-model="sale.expdate_end"
                                            type="date"
                                    >
                                    </el-date-picker>
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
                </div>
                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale60')}}</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show4" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">{{$t('sale.add.sale61')}}</th>
                                <th class="td">{{$t('sale.add.sale62')}}</th>
                                <th style="width: 300px;">{{$t('sale.add.sale63')}}</th>
                                <th style="width: 300px;">{{$t('sale.add.sale64')}}</th>
                                <th class="td">{{$t('sale.add.sale65')}}</th>
                                <th class="td">{{$t('sale.add.sale66')}}</th>
                                <th class="td">{{$t('sale.add.sale67')}}</th>
                                <th class="td">{{$t('sale.add.sale68')}}</th>
                            </tr>
                            <tr>
                                <td>
                                    <el-input v-model="sale.from_port"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="sale.dest_port"></el-input>
                                </td>
                                <td>
                                    <el-select v-model="sale.delivery_address_id" clearable filterable
                                               style="width: 100%"
                                               placeholder="">
                                        <el-option
                                                v-for="(i,index) in receive_goods_addresses"
                                                :key="index"
                                                :label="i.address+'__'+i.contact_name+i.mobile"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="sale.invoice_address_id" clearable filterable
                                               style="width: 100%"
                                               placeholder="">
                                        <el-option
                                                v-for="(i,index) in receive_invoice_addresses"
                                                :key="index"
                                                :label="i.address+'__'+i.contact_name+i.mobile"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="sale.delivery_type_id" clearable filterable
                                               placeholder="">
                                        <el-option
                                                v-for="(i,index) in delivery_type"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="sale.express_account_type"
                                               @change="select_express_account_type(sale.express_account_type)"
                                               clearable filterable
                                               placeholder="">
                                        <el-option
                                                v-for="(i,index) in express_account_type"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="sale.express_company_id"
                                               @change="select_express_company(sale.express_company_id)" clearable
                                               filterable
                                               placeholder="">
                                        <el-option
                                                v-for="(i,index) in enum_express_company"
                                                :key="index"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    {{sale.express_account}}
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>

                <div>
                    <el-form-item class="form_title">
                        <el-button type="text" @click="form_show5 = !form_show5" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale85')}}</b>
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show5" class="from-item">
                        <div class="d2-m-10">
                            <span style="margin-right: 10px;">{{$t('sale.add.sale86')}}:</span>
                            <el-radio-group v-model="check_contract.status">
                                <el-radio :label="1">{{$t('sale.add.sale87')}}</el-radio>
                                <el-radio :label="2">{{$t('sale.add.sale88')}}</el-radio>
                            </el-radio-group>
                        </div>
                        <div class="d2-m-10">
                            <span style="margin-right: 10px;vertical-align: top;display: inline-block;">{{$t('sale.add.sale89')}}:</span>
                            <textarea v-model="check_contract.approval_comment" name="" id="" cols="100%"
                                      rows="4"></textarea>
                        </div>
                    </el-form-item>
                </div>
                
                <el-form-item class="from-item" style="margin:0px;text-align:right;">
                    <el-button type="primary" :loading="loading" @click="save()" size="mini">{{$t('save')}}</el-button>
                    <el-button @click="close()" size="mini">{{$t('cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </d2-container>
</template>

<script>
    import {
        saler_contract,
        saler_contract_info,
        saler_create,
        customer_lists,
        contact_info,
        corp_lists,
        sale_lists,
        corp_info,
        cas_info,
        get_deliver_goods,
        saler_contract_detail,
        saler_verify_view,
        saler_contract_generate,
        saler_contract_verify,
    } from '@/api/sale'
    import $ from 'jquery'
    import{mapActions} from 'vuex'
    export default {
        name: "sales-check",
        data() {
            return {
                corp: [],
                form_show1: true,
                form_show2: true,
                form_show3: true,
                form_show4: true,
                form_show5: true,
                detail_index: '',
                loading: false,
                dialogVisible: false,
                sale: {
                    customer_id: '',
                    customer_name: '',
                    customer_contact: '',
                    customer_mobile: '',
                    customer_fax: '',
                    corp_id: '',
                    corp_name: '',
                    corp_contact: '',
                    corp_mobile: '',
                    corp_fax: '',
                    currency_id: '',
                    detail: [{
                        inquiry_id: '',
                        cas: '',
                        product_name: '',
                        product_name_cn: '',
                        package: '',
                        purity: '',
                        quantity: '',
                        quantity_unit: '',
                        currency_id: '',
                        price: '',
                        leadtime: '',
                        prod_no: '',
                        prod_id: '',
                        invoice_type_id: '',
                        additional: [{
                            additional_type_id: '',
                            price: ''
                        }],
                        additional_cost: '',
                        checked_items: [],
                        checked_requirement: '',
                        package_requirement: '',
                        deliver_note: '',
                        label_requirement: '',
                        file_requirement: '',
                        product_file: [],
                        if_declare: '',
                        required_delivery_date: '',
                        if_auto_delivery: 0,
                        is_generation: 0
                    }],
                    contract_number: '',
                    contract_date: '',
                    contract_address: '',
                    customer_po: '',
                    sale_id: '',
                    expdate_start: '',
                    expdate_end: '',
                    if_invoice: 0,
                    transportation: '',
                    quality_stardard: '',
                    reasonable_loss: '',
                    package_stardard: '',
                    accept_stardard: '',
                    total_money: '',
                    trade_type_id: '',
                    delivery_days:3,
                    payment_id: '',
                    receive_money_date: '',
                    settle_type: '',
                    if_echapter: 0,

                    from_port: '',
                    dest_port: '',
                    delivery_address_id: '',
                    invoice_address_id: '',
                    delivery_type_id: '',
                    express_account_type: '',
                    express_company_id: '',
                    express_account: '',
                },
                sale_list: [],
                index: '',
                customers: [],
                customers_crop: [],
                additional_cost_type: [],
                address_type_info: [],
                currencys: [],
                delivery_type: [],
                express_account_type: [],
                express_company: [],
                enum_express_company: [],
                if_declare_info: [],
                if_echapter_info: [],
                if_invoice_info: [],
                invoice_type: [],
                product_type: [],
                test_item: [],
                trade_mode: [],
                units: [],
                product_file_info: [],
                checked: false,
                payment_type: [],
                receive_invoice_addresses: [],
                receive_goods_addresses: [],
                get_deliver_goods: [],
                inventory_auto_preempt_info:[],
                account: [],
                save_show: true,
                check_contract: {
                    saler_contract_id: '',
                    approval_comment: '',
                    status: 1
                },
            }
        },
        watch: {
            $route (to, from) {
                if(to.name=='sales-check'){
                    this.fetch_data()
                    if (this.$route.query.id) {
                        this.check_contract.saler_contract_id = this.$route.query.id
                    }
                }
            }
        },
        created() {
            this.fetch_data()
            if (this.$route.query.id) {
                this.check_contract.saler_contract_id = this.$route.query.id
            }
        },
        methods: {
            ...mapActions('d2admin/page',['closeAdd']),
            fetch_data() {
                saler_verify_view(this.$route.query.id).then(res => {
                    res.data.detail = res.data.details
                    this.sale = res.data
                    this.sale.transportation = res.data.remarks.transportation
                    this.sale.quality_stardard = res.data.remarks.quality_stardard
                    this.sale.reasonable_loss = res.data.remarks.reasonable_loss
                    this.sale.package_stardard = res.data.remarks.package_stardard
                    this.sale.accept_stardard = res.data.remarks.accept_stardard
                    this.additional_cost_type = res.enum.additional_cost_type
                    this.address_type_info = res.enum.address_type_info
                    this.currencys = res.enum.currencys
                    this.delivery_type = res.enum.delivery_type
                    this.express_account_type = res.enum.express_account_type
                    this.enum_express_company = res.enum.express_company
                    this.if_declare_info = res.enum.if_declare_info
                    this.if_echapter_info = res.enum.if_echapter_info
                    this.if_invoice_info = res.enum.if_invoice_info
                    this.invoice_type = res.enum.invoice_type
                    this.test_item = res.enum.test_item
                    this.trade_mode = res.enum.trade_mode
                    this.product_file_info = res.enum.product_file_info
                    this.units = res.enum.units
                    this.product_type = res.enum.product_type
                    this.payment_type = res.enum.payment_type
                    this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info
                    saler_contract_info(res.data.customer_id).then((response) => {
                        response.data.info.receive_addresses.forEach((items, index) => {
                            if (items.type == 1) {
                                this.receive_invoice_addresses.push(items)
                            } else {
                                this.receive_goods_addresses.push(items)
                            }
                        })
                    })
                })
                sale_lists().then(res => {
                    this.sale_list = res.data
                })

            },
            select_express_account_type(id) {
                get_deliver_goods(this.sale.customer_id, id).then(res => {
                    let express_company = []
                    this.get_deliver_goods = res.data
                    this.enum_express_company.forEach((items, index) => {
                        for (var key in res.data) {
                            if (items.id == key) {
                                express_company.push(items)
                            }
                        }
                    })
                    this.express_company = express_company
                })
            },
            select_express_company(id) {
                this.account = this.get_deliver_goods[id]
            },
            get_index(index) {
                this.detail_index = index
            },
            querySearchAsync_customer(queryString, cb) {
                if (queryString != '') {
                    customer_lists(queryString).then(res => {
                        var restaurants = res.data;
                        var results = queryString ? restaurants.filter(this.createFilter_customer(queryString)) : restaurants;
                        // 调用 callback 返回建议列表的数据
                        cb(results);
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
            handleSelect_customer(item) {
                this.sale.customer_id = item.id
                this.sale.customer_name = item.name
                this.receive_invoice_addresses = []
                this.receive_goods_addresses = []
                saler_contract_info(item.id).then((res) => {
                    this.sale.customer_contact = res.data.info.contacts[0].name
                    this.sale.customer_mobile = res.data.info.contacts[0].mobile
                    this.sale.customer_fax = res.data.info.contacts[0].fax
                    this.sale.contract_number = res.data.number
                    this.sale.payment_id = res.data.corporation.payment_day_id
                    this.sale.receive_money_date = res.data.corporation.receiver_money_date
                    this.sale.settle_type = res.data.corporation.settle_type
                    res.data.info.receive_addresses.forEach((items, index) => {
                        if (items.type == 1) {
                            this.receive_invoice_addresses.push(items)
                        } else {
                            this.receive_goods_addresses.push(items)
                        }
                    })
                })
            },
            handleSelect(item) {
                this.sale.detail[this.detail_index].cas = item.cas
                this.sale.detail[this.detail_index].product_name_cn = item.name_cn
                this.sale.detail[this.detail_index].product_name = item.name
                this.sale.detail[this.detail_index].prod_no = item.prodno
                this.sale.detail[this.detail_index].prod_id = item.prod_id
            },
            get_custcontact_id(id) {
                contact_info(id).then(res => {
                    this.sale.customer_contact = res.data[0].name
                    this.sale.customer_mobile = res.data[0].phone ? res.data[0].phone : res.data[0].mobile
                    this.sale.customer_fax = res.data[0].fax
                })
            },
            get_custcontact_crop_id(id) {
                corp_info(id).then(res => {
                    this.sale.corp_name = res.data.info.name
                    this.sale.corp_contact = res.data.info.contacts[0].name
                    this.sale.corp_mobile = res.data.info.contacts[0].phone ? res.data.info.contacts[0].phone : res.data.info.contacts[0].mobile
                    this.sale.corp_fax = res.data.info.contacts[0].fax
                })
            },
            remoteMethod_crop(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        corp_lists(query).then(res => {
                            this.customers_crop = res.data
                            this.loading = false;
                        })
                    }, 200);
                } else {
                    this.customers_crop = [];
                }
            },
            show_dialog(index) {
                this.dialogVisible = true;
                this.index = index
            },
            hide_dialogVisible() {
                // this.dialogVisible = false;
                // let num = 0
                // this.sale.detail[this.index].additional.forEach((item, index) => {
                //     num += parseFloat(item.price)
                // })
                // this.sale.detail[this.index].additional_cost = num
                // let money = 0
                // this.sale.detail.forEach((items, index) => {
                //     money += parseFloat(items.quantity * items.price + items.additional_cost)
                // })
                // this.sale.total_money = money
            },
            add_demand() {
                this.sale.detail.push({
                    inquiry_id: '',
                    cas: '',
                    product_name: '',
                    product_name_cn: '',
                    package: '',
                    purity: '',
                    quantity: '',
                    quantity_unit: '',
                    currency_id: '',
                    price: '',
                    leadtime: '',
                    prod_no: '',
                    prod_id: '',
                    invoice_type_id: '',
                    additional: [{
                        additional_type_id: '',
                        price: ''
                    }],
                    additional_cost: '',
                    checked_items: [],
                    checked_requirement: '',
                    package_requirement: '',
                    deliver_note: '',
                    label_requirement: '',
                    file_requirement: '',
                    product_file: [],
                    if_declare: 0,
                    required_delivery_date: '',
                    if_auto_delivery: 0,
                    is_generation: 0,
                    commission:''
                })
            },
            add_cost() {
                this.sale.detail[this.index].additional.push({
                    additional_type_id: '',
                    price: ''
                })
            },
            save() {
                var tagName = 'sales-check'
                saler_contract_verify(this.check_contract, this,tagName)
            },
            close() {
                let that=this
                that.$router.push({
                    path: "/sales/sales",
                    name: "sales-sales"
                });
                var tagName = 'sales-check'
                that.closeAdd({tagName})
            },
            delete_cost(index) {
                this.sale.detail[this.index].additional.splice(index, 1)
            },
            delete_sale(item, index) {
                if (item.id) {
                    destroy(item, 'hs', 'destroy', this, index)
                } else {
                    this.sale.detail.splice(index, 1)
                }
            },
            toggle_both() {
                $('.both .el-card__body').toggle()
            },
            toggle_demand() {
                $('.demand .el-card__body').toggle()
            },
            toggle_item() {
                $('.item .el-card__body').toggle()
            },
            toggle_transport() {
                $('.transport .el-card__body').toggle()
            },
        }
    }
</script>
