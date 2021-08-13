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
        font-size: 10px;
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
        font-size: 12px;
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
        /deep/.el-form-item__content{width: 100%;}
        /deep/.el-input__inner {
            border: none;
            padding-right: 0px;
        }
        table {
            border-collapse: collapse;
            .el-checkbox{
                margin-right: 10px;
            }
        }
    }

    table {
        width: 100%;
        border-collapse: collapse;
        .el-input__inner {
            border: 0px;
            padding: 0px;
        }
        td {
            padding: 0px 5px;
            line-height: 30px;
            word-wrap:break-word;
            word-break:break-all;
        }
    }
    .table_preem{
        td{
            /deep/.el-input__inner{
                padding: 0px;
            }
        }
    }
</style>
<template>
    <d2-container>
        <div class="div sales">
            <el-form label-width="0px">
                <div>
                    <el-form-item class="form_title">
                        <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
                            <b>{{$t('sale.add.sale1')}}</b><!-- 双方 -->
                        </el-button>
                        <el-button style="float: right;margin: 7px 7px 0 0;color: white;" type="primary" size="mini"
                                   @click="cancel">{{$t('cancel')}}<!-- 取消 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show1" class="from-item">
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">{{$t('sale.add.sale2')}}</th><!-- 合同双方 -->
                                <th class="td">{{$t('sale.add.sale3')}}</th><!-- 名称 -->
                                <th class="td">{{$t('sale.add.sale4')}}</th><!-- 联系人 -->
                                <th class="td">{{$t('sale.add.sale5')}}</th><!-- 联系电话 -->
                                <th class="td">{{$t('sale.add.sale6')}}</th><!-- 传真 -->
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale7')}}</td><!-- 甲方 -->
                                <td>
                                    <!-- <el-autocomplete
                                            v-model="sale.customer_name"
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
                                <td>{{$t('sale.add.sale8')}}</td><!-- 乙方 -->
                                <td>
                                    <!-- <el-input v-model="sale.corp_name"></el-input> -->
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
                            <b>{{$t('sale.add.sale9')}}</b><!-- 需求 -->
                        </el-button>
                    </el-form-item>
                    <el-form-item v-show="form_show2" class="from-item" v-for="(item,index) in sale.details" :key="index">
                        <el-dialog
                                :title="$t('sale.add.sale10')"
                                :visible.sync="dialogVisible"
                                width="50%"
                        >
                            <el-table
                                    :data="item.additional"
                                    border
                                    style="width: 100%">
                                <el-table-column :label="$t('sale.add.sale11')" align="center" min-width="80">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.additional_type_id" clearable filterable
                                                   size="mini"
                                                   style="width: 150px;margin: 0 10px;">
                                            <el-option
                                                    v-for="(i,index) in additional_cost_type"
                                                    :key="index"
                                                    :label="i.name"
                                                    :value="i.id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="$t('sale.add.sale12')" align="center" min-width="80"><!-- 金额 -->
                                    <template slot-scope="scope" class="d2-text-center">
                                        <el-input size="mini" type="text" class="input" placeholder=""
                                                  v-model="scope.row.price"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        :label="$t('sale.add.sale13')"
                                        width="100">
                                    <template slot-scope="scope"><!-- 操作 -->
                                        <el-button @click="delete_cost(scope.row)" type="primary" size="mini">-
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <span slot="footer" class="dialog-footer">
                            <el-button type="primary" size="mini">+</el-button>
                            <el-button @click="dialogVisible = false">{{$t('cancel')}}</el-button><!-- 取 消 -->
                            <el-button type="primary" @click="dialogVisible=true">{{$t('define')}}</el-button><!-- 确 定 -->
                            </span>
                        </el-dialog>
                        <table border="1" bordercolor="#E5E5E5">
                            <tr>
                                <th class="td">{{$t('sale.add.sale84')}}</th><!-- 询单号 -->
                                <th class="td">CAS</th>
                                <th class="td" width="200">{{$t('sale.add.sale15')}}</th><!-- 产品名称 -->
                                <th class="td">{{$t('sale.add.sale16')}}</th><!-- 规格 -->
                                <th class="td">{{$t('sale.add.sale17')}}</th><!-- 纯度 -->
                                <th class="td">{{$t('sale.add.sale18')}}</th><!-- 数量 -->
                                <th class="td">{{$t('sale.add.sale19')}}</th><!-- 数量单位 -->
                                <th class="td">{{$t('sale.add.sale20')}}</th><!-- 币种 -->
                                <th class="td">{{$t('sale.add.sale21')}}</th><!-- 单价 -->
                                <th class="td" width='100'>{{$t('sale.add.sale22')}}</th><!-- 金额 -->
                                <th class="td" width="130">{{$t('sale.add.sale23')}}</th><!-- 提交货时间 -->
                            </tr>
                            <tr>
                                <td>
                                    <el-input v-model="item.inquiry_id" disabled></el-input>
                                </td>
                                <td>
                                    <el-autocomplete
                                            v-model="item.cas"
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
                                    <el-input v-model="item.quantity" @input="change_quantity(index)"></el-input>
                                </td>
                                <td>
                                    <el-select v-model="item.quantity_unit" clearable filterable>
                                        <el-option
                                                v-for="i in units"
                                                :key="i.id"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-select v-model="item.currency_id" clearable filterable style="width: 100%;">
                                        <el-option
                                                v-for="i in currencys"
                                                :key="i.id"
                                                :label="i.name"
                                                :value="i.id">
                                        </el-option>
                                    </el-select>
                                </td>
                                <td>
                                    <el-input v-model="item.price" @input="change_price(index)"></el-input>
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
                                <td>{{$t('sale.add.sale24')}}</td><!-- 产品编码 -->
                                <td>
                                    <el-input v-model="item.prod_no"></el-input>
                                </td>
                                <td>
                                    <el-input v-model="item.product_name" placeholder="english product name"></el-input>
                                </td>
                                <td>{{$t('sale.add.sale25')}}</td><!-- 发票类型 -->
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
                                    <el-button type="primary" size="mini" >{{$t('sale.add.sale26')}}</el-button><!-- 附加费用 -->
                                </td>
                                <td>{{item.additional_cost}}</td>
                                <td>{{$t('sale.add.sale124')}}</td>
                                <td>{{item.commission}}</td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale27')}}</td><!-- 分析要求 -->
                                <td colspan="12" class="checkbox">
                                  <span
                                          v-for="i in item.test_item"
                                          :key="i.id"
                                          v-if="i.child.length==0"
                                          :label="i.id"
                                          style="margin:0 5px"
                                  >
                                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                                  </span> <br>
                                    <div v-for="i in item.test_item" :key="i.id" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                                      <!-- <el-checkbox v-model="i.checked"  name="type"> -->
                                        <span class="checked_items" style="font-weight: bold;">{{i.name}}</span>:
                                      <!-- </el-checkbox>: -->
                                        <el-checkbox
                                                v-for="j in i.child"
                                                :label="j.id"
                                                v-model="j.checked"
                                                :key="j.id"
                                                class="checkbox_nei"
                                        ><span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>
                                  </div>
                                </td>
                                <!--<td colspan="12">-->
                                <!--<el-checkbox-group v-model="item.checked_items">-->
                                <!--<el-checkbox v-for="i in test_item" :label="i.id" name="type">{{i.name}}-->
                                <!--</el-checkbox>-->
                                <!--</el-checkbox-group>-->
                                <!--</td>-->
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale28')}}</td><!-- 其他要求 -->
                                <td colspan="4">
                                    <el-input v-model="item.checked_requirement"></el-input>
                                </td>
                                <td>{{$t('sale.add.sale29')}}</td><!-- 是否需要报关 -->
                                <td width="120">
                                    <el-select v-model="item.if_declare" style="width: 100%;">
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
                                <td>{{$t('sale.add.sale31')}}</td><!-- 包装要求 -->
                                <td colspan="4">
                                    <div v-for="(i,index_i) in item.claims">
                                        <el-input v-model="i.claim_pack_number" style="width: 80px;border: 1px solid #f2f2f2;"></el-input>*
                                        <el-input v-model="i.claim_pack_size" style="width: 80px;border: 1px solid #f2f2f2;"></el-input>/
                                        <el-select v-model="i.claim_unit_id" style="width: 100px;border: 1px solid #f2f2f2;">
                                            <el-option
                                                    v-for="i in units"
                                                    :key="i.id"
                                                    :label="i.name"
                                                    :value="i.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </td>
                                <td>{{$t('sale.add.sale32')}}</td><!-- 要求发货时间 -->
                                <td colspan="6">
                                    <el-date-picker
                                            type="date"
                                            style="width:100%;"
                                            v-model="item.required_delivery_date"
                                            value-format="yyyy-MM-dd"
                                    ></el-date-picker>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale33')}}</td><!-- 标签要求 -->
                                <td colspan="4">
                                    <el-input v-model="item.label_requirement"></el-input>
                                </td>
                                <td>{{$t('sale.add.sale34')}}</td><!-- 发货备注 -->
                                <td colspan="5">
                                    <el-input v-model="item.deliver_note"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale35')}}</td><!-- 随货文件 -->
                                <td colspan="4">
                                    <el-checkbox-group v-model="item.product_file">
                                        <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id"
                                                     name="type">{{i.name}}
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </td>
                                
                                <td>{{$t('sale.add.sale36')}}</td><!-- 是否自动发货 -->
                                <td colspan="5">
                                    <el-radio-group v-model="item.if_auto_delivery">
                                        <el-radio :label="1">{{$t('sale.add.sale37')}}</el-radio><!-- 自动 -->
                                        <el-radio :label="0">{{$t('sale.add.sale38')}}</el-radio><!-- 不自动 -->
                                    </el-radio-group>
                                </td>
                                
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale39')}}</td><!-- 是否代发 -->
                                <td colspan="4">
                                    <el-radio-group v-model="item.is_generation">
                                        <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio><!-- 是 -->
                                        <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio><!-- 否 -->
                                    </el-radio-group>
                                </td>
                                <td>{{$t('sale.add.sale294')}}</td>
                                <td colspan="5">
                                    <el-radio-group v-model="item.inventory_auto_preempt">
                                        <el-radio v-for="i in inventory_auto_preempt_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
                                    </el-radio-group>
                                </td>
                            </tr>
                            <tr>
                                <td>{{$t('sale.add.sale289')}}</td>
                                <td colspan="4">
                                    <el-radio-group v-model="item.is_straight_hair">
                                        <el-radio :label="1">{{$t('sale.add.sale40')}}</el-radio>
                                        <el-radio :label="0">{{$t('sale.add.sale41')}}</el-radio>
                                    </el-radio-group>
                                </td>
                                <td>{{$t('sale.add.sale278')}}</td>
                                <td colspan="5">
                                    <el-input v-model="item.straight_hair_note"></el-input>
                                </td>
                            </tr>
                            <tr>
                                <td>是否中转</td>
                                <td colspan="11">
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
                            <tr v-if="index==(sale.details.length-1)">
                                <td colspan="5"></td>
                                <td>{{$t('sale.add.sale42')}}</td><!-- 总金额 -->
                                <td colspan="5">
                                    {{sale.total_money>0?sale.total_money:''}}
                                </td>
                            </tr>
                        </table>

                        <table v-for="(inventory,index_a) in item.inventory_list" border bordercolor="#E5E5E5"
                               style="margin: 20px 0;" class="table_preem">
                            <tr>
                                <th width='140'>{{$t('sale.add.sale190')}}/CAS</th><!-- 批次 -->
                                <th width='140'>{{$t('sale.add.sale188')}}/{{$t('sale.add.sale187')}}</th><!-- 仓库 -->
                                <!-- <th width='60'></th> -->
                                <th width='100'>{{$t('sale.add.sale277')}}/{{$t('sale.add.sale75')}}</th><!-- 类型 -->
                                <th width='50'>{{$t('sale.add.sale17')}}</th>
                                <th width='100'>{{$t('sale.add.sale16')}}</th><!-- 规格 -->
                                <th width='100'>{{$t('sale.add.sale186')}}</th><!-- 库存 -->
                                <!-- <th>{{$t('sale.add.sale279')}}</th>检测时间 -->
                                <th min-width='160'>{{$t('sale.add.sale205')}}</th><!-- 本单预占 -->
                                <th width='100'>{{$t('sale.add.sale194')}}</th><!-- 已发货 -->
                                <th width='120'><span style="color:red;">*</span>{{$t('sale.add.sale192')}}</th><!-- 预占数量 -->
                                <th width='120'><span style="color:red;">*</span>{{$t('sale.add.sale192')}}(个)</th><!-- 预占数量 -->
                                <th width='100'>{{$t('sale.add.sale77')}}</th><!-- 操作 -->
                            </tr>
                            <tr>
                                <td class="d2-text-center">{{inventory.batchno}}<br>{{inventory.cas}}</td>
                                <td class="d2-text-center">
                                    <span v-for="w in warehouse">
                                        <span v-if="inventory.warehouse_id==w.id">{{w.name}}<br>{{inventory.created_at}}</span>
                                    </span></td>
                                <!-- <td class="d2-text-center">{{inventory.purchase?inventory.purchase.name:''}}</td> -->
                                <td class="d2-text-center">
                                    {{inventory.purchase?inventory.purchase.name:''}}<br>
                                    <span style="color:red;">{{$t('sale.add.sale206')}}</span> 
                                </td><!-- 散装 -->
                                <td class="d2-text-center">{{inventory.purity}}</td>
                                <td class="d2-text-center">/</td>
                                <td class="d2-text-center">{{inventory.remained_stock}}
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span>
                                </td>
                                <!-- <td class="d2-text-center">{{inventory.checkresult_info}}</td> -->
                                <td class="d2-text-center">{{inventory.preout_nums}}
                                    <!--{{item.inventory_list[0].base_unit_id?units.filter(i => {return-->
                                    <!--item.inventory_list[0].base_unit_id==i.id}):''}}-->
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span>
                                    <el-button type="primary" size="mini"
                                               icon="el-icon-back"
                                               @click="cancel_preemption(item.id,inventory.prod_id,'2',inventory.id,'')"
                                               style="padding: 4px;margin-left: 5px;"></el-button>
                                    <el-button type="primary" size="mini"
                                               @click="Ship(item.cas)"
                                               style="padding: 4px;margin-left: 5px;">{{$t('sale.add.sale194')}}</el-button><!-- 发货 -->
                                </td>
                                <td class="d2-text-center">{{inventory.shipments_nums}}
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span></td>
                                <td class="d2-text-center">
                                    <el-input style="width: 70%;" v-model="inventory.base_quantity"
                                              autofocus="autofocus" clearable></el-input>
                                    <span>{{getEnumValue(units,inventory.base_unit_id)}}</span>
                                </td>
                                <td class="d2-text-center">
                                    1
                                </td>
                                <td class="d2-text-center">
                                    <div v-if="(inventory.if_need_check!=2&&(inventory.checked_result ==1 || inventory.checked_result ==4))||(inventory.if_need_check == 2 && (inventory.checked_result ==1 || inventory.checked_result ==4 || inventory.checked_result ===null))">
                                        <el-button type="primary" size="mini"
                                               @click="preemption1(inventory.id,inventory.prod_id,item.inquiry_id,sale.id,item.id,'2',inventory.base_quantity,inventory.base_unit_id,1)"
                                               style="padding: 4px;">正常预占<!-- 预占 -->
                                        </el-button>
                                        <el-button type="primary" size="mini" v-if="item.is_transfer==2"
                                               @click="preemption1(inventory.id,inventory.prod_id,item.inquiry_id,sale.id,item.id,'2',inventory.base_quantity,inventory.base_unit_id,6,item.transfer_warehouse_id)"
                                               style="margin-left:0px;">中转预占<!-- 预占 -->
                                        </el-button>
                                    </div>
                                </td>
                            </tr>
                            <tr v-for="(i,index_b) in inventory.packs">
                                <td class="d2-text-center">{{inventory.batchno}}<br>{{inventory.cas}}</td>
                                <td class="d2-text-center">
                                    <span v-for="w in warehouse">
                                        <span v-if="inventory.warehouse_id==w.id">{{w.name}}<br>{{inventory.instored_at}}</span>
                                    </span>
                                </td>
                                <!-- <td class="d2-text-center">{{inventory.purchase?inventory.purchase.name:''}}</td> -->
                                <td class="d2-text-center">
                                    {{inventory.purchase?inventory.purchase.name:''}}<br>
                                    <span style="color:red;">{{$t('sale.add.sale189')}}</span> 
                                </td><!-- 包装 -->
                                <td class="d2-text-center">
                                    <span v-if="i.purity">{{i.purity}}</span>
                                    <span v-else>{{inventory.purity}}</span>
                                </td>
                                <td class="d2-text-center">
                                    {{i.packsize}}
                                    <span v-for="u in units">
                                        <span v-if="i.unit_id==u.id">{{u.name}}</span>
                                    </span>
                                </td>
                                <td class="d2-text-center">{{i.stock}}<br>
                                    <span v-if="i.stock">({{(Number(i.stock)*Number(i.packsize))}}{{getEnumValue(units,i.unit_id)}})</span>
                                </td>
                                <!-- <td class="d2-text-center">{{inventory.checked_time}}</td> -->
                                <td class="d2-text-center">{{i.preout_nums}}
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span>
                                    <el-button type="primary" size="mini"
                                               icon="el-icon-back"
                                               @click="cancel_preemption(item.id,inventory.prod_id,'1',inventory.id,i.id)"
                                               style="padding: 4px;margin-left: 5px;"></el-button>
                                    <el-button type="primary" size="mini"
                                               @click="Ship(item.cas)"
                                               style="padding: 4px;margin-left: 5px;">{{$t('sale.add.sale194')}}</el-button><!-- 发货 -->
                                </td>
                                <td class="d2-text-center">{{i.shipments_nums}}
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span></td>
                                <td class="d2-text-center">
                                    <el-input v-model="i.base_quantity" clearable @input="quantity_change(i.package_nums,i.base_quantity,i.packsize,index,index_a,index_b)" style="width: 70%;"></el-input>
                                    <span>{{getEnumValue(units,i.unit_id)}}</span>
                                </td>
                                <td class="d2-text-center">
                                    <el-input v-model="i.package_nums" clearable @input="nums_change(i.package_nums,i.base_quantity,i.packsize,index,index_a,index_b)" style="width: 100%;"></el-input>
                                </td>
                                <td class="d2-text-center">
                                    <div style="text-align:center;" v-if="inventory.if_need_check!=2&&(inventory.checked_result ==1 || inventory.checked_result ==4)||inventory.if_need_check == 2 && (inventory.checked_result ==1 || inventory.checked_result ==4 || inventory.checked_result ===null)">
                                        <div>
                                            <el-button type="primary" size="mini"
                                               @click="preemption2(inventory.id,inventory.prod_id,item.inquiry_id,sale.id,item.id,'1',i.package_nums,i.base_quantity,i.id,i.packsize,i.unit_id,1)"
                                               style="">正常预占<!-- 预占 -->
                                            </el-button>
                                            <el-button type="primary" size="mini" v-if="item.is_transfer==2"
                                               @click="preemption2(inventory.id,inventory.prod_id,item.inquiry_id,sale.id,item.id,'1',i.package_nums,i.base_quantity,i.id,i.packsize,i.unit_id,6,item.transfer_warehouse_id)"
                                               style="margin-left:0px;">中转预占<!-- 预占 -->
                                            </el-button>
                                        </div>
                                        
                                        <!-- <el-button type="primary" size="mini" @click="split_shelve(i.id,item)"
                                                style="">{{$t('sale.add.sale208')}}
                                        </el-button>  -->
                                        <!-- 拆分 -->
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <!-- <td></td> -->
                                <th>储存条件:</th>
                                <td colspan="5">
                                    <span v-for="(j,index_j) in inventory.storage_cond">
                                        {{getEnumValue(StorageCondition,j)}}
                                        <span v-if="index_j!=(inventory.storage_cond.length-1)">,</span>
                                    </span>
                                </td>
                                <td class="d2-text-center">{{inventory.preout_nums_total}}
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span></td>
                                <td class="d2-text-center">{{inventory.shipments_nums_toatl}}
                                    <span v-for="u in units">
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span></td>
                                <td ></td>
                                <td colspan="2" style="text-align:right;font-weight: bold;">{{$t('sale.add.sale259')}}:{{inventory.preout_nums_total+inventory.shipments_nums_toatl}}
                                    <span v-for="u in units"><!-- 总计 -->
                                        <span v-if="inventory.base_unit_id==u.id">{{u.name}}</span>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="8"></td>
                                <th>{{$t('sale.add.sale209')}}：</th><!-- 检测结果： -->
                                <td colspan="2">
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
                                    <!-- <span v-if="inventory.if_need_check==2" style="color:#67C23A;">免检</span>
                                    <span v-if="inventory.checked_result==1" style="color:#67C23A;margin-right:5px;">
                                        {{getEnumValue(enums.order_result,inventory.checked_result)}}
                                    </span>
                                    <span v-else-if="inventory.checked_result==3" style="color:#F56C6C;margin-right:5px;">
                                        {{getEnumValue(enums.order_result,inventory.checked_result)}}
                                    </span>
                                    <span v-else style="color:#E6A23C;margin-right:5px;">{{getEnumValue(enums.order_result,inventory.checked_result)}}</span>
                                    
                                    <span v-if="inventory.if_need_check!=2&&inventory.quality_orders&&inventory.quality_orders.length>0">
                                        <span v-if="inventory.flow_status==1300" style="color:#67C23A;">
                                            {{getEnumValue(enums.flow_statuses,inventory.flow_status)}}
                                        </span>
                                        <span v-else-if="inventory.flow_status==1001||inventory.flow_status==1000" style="color:#F56C6C;">
                                            {{getEnumValue(enums.flow_statuses,inventory.flow_status)}}
                                        </span>
                                        <span v-else style="color:#E6A23C;">
                                            {{getEnumValue(enums.flow_statuses,inventory.flow_status)}}
                                        </span>
                                    </span> -->
                                </td>
                            </tr>
                        </table>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <el-dialog :visible.sync="splitShelfDialog" width="70%">
                    <table border bordercolor="#E5E5E5" style="border-collapse: collapse;">
                        <tr>
                            <td>{{$t('sale.add.sale16')}}</td><!-- 规格 -->
                            <td>{{$t('sale.add.sale186')}}</td><!-- 库存 -->
                            <td>{{$t('sale.add.sale207')}}</td><!-- 预占 -->
                            <td>{{$t('sale.add.sale213')}}</td><!-- 货架 -->
                            <td>{{$t('sale.add.sale80')}}</td><!-- 操作 -->
                        </tr>
                        <tr v-for="item in shelve_list">
                            <td>{{item.packsize}}{{getEnumValue(units,item.unit_id )}}</td>
                            <td>{{item.stock}}</td>
                            <td>{{item.preout_stock}}</td>
                            <td>{{item.shelf}}</td>
                            <td> <el-button type="primary" size="mini" @click="split(item.shelves[0].id,item.id)"
                                            style="padding: 4px;margin-left: 5px;">{{$t('sale.add.sale208')}}<!-- 拆分 -->
                            </el-button></td>
                        </tr>
                    </table>
        </el-dialog>
        <!-- 拆分 -->
        <el-dialog :visible.sync="splitDialog" width="70%">
            <el-form label-position="right" label-width="90px" class="profit_form">
                <el-form-item :label="$t('sale.add.sale214')"><!-- 信息： -->
                    <table border bordercolor="#E5E5E5" style="border-collapse: collapse;">
                        <tr>
                            <td>{{$t('sale.add.sale190')}}</td><!-- 批次 -->
                            <td>{{$t('sale.add.sale188')}}</td><!-- 仓库 -->
                            <td>CAS</td><!-- CAS -->
                            <td>{{$t('sale.add.sale3')}}</td><!-- 名称 -->
                        </tr>
                        <tr>
                            <td>{{splitData.batchno}}</td>
                            <td>
                                <!--{{splitData.warehouse_id?warehouse.filter(i => {return-->
                                <!--splitData.warehouse_id ==i.id}).name:''}}-->
                                <span v-for="w in warehouse">
                                        <span v-if="splitData.warehouse_id==w.id">{{w.name}}</span>
                                    </span>
                            </td>
                            <td>{{splitData.prod?splitData.prod.cas:''}}</td>
                            <td>
                                <div>{{splitData.name_cn}}({{splitData.name}})</div>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item :label="$t('sale.add.sale215')"><!-- 记录： -->
                    <div>
                        <table border bordercolor="#E5E5E5" style="border-collapse: collapse;">
                            <tr>
                                <td>{{$t('sale.add.sale190')}}</td><!-- 批次 -->
                                <td>{{$t('sale.add.sale188')}}</td><!-- 仓库 -->
                                <td>CAS</td><!-- CAS -->
                                <td>{{$t('sale.add.sale3')}}</td><!-- 名称 -->
                                <td>{{$t('sale.add.sale16')}}</td><!-- 规格 -->
                                <td>{{$t('sale.add.sale216')}}</td><!-- 拆分数量 -->
                                <td>{{$t('sale.add.sale217')}}</td><!-- 入货架 -->
                                <td>{{$t('sale.add.sale218')}}</td><!-- 出货架 -->
                                <td>{{$t('sale.add.sale108')}}</td><!-- 操作日期 -->
                            </tr>
                            <tr v-if="item.inventory!=null" v-for="item in split_package_log.data">
                                <td>{{item.inventory?item.inventory.batchno:''}}</td>
                                <td>
                                          <span v-for="w in warehouse">
                                                  <span v-if="splitData.warehouse_id==w.id">{{w.name}}</span>
                                             </span>
                                </td>
                                <td>{{item.inventory.cas}}</td>
                                <td>
                                    <div>{{item.inventory.name_cn}}({{item.inventory.name}})</div>
                                </td>
                                <td>
                                    <div v-if="item.package">
                                        {{item.package.packsize}}
                                        <!--{{item.package.unit_id?units.filter(res=>{return-->
                                        <!--item.package.unit_id == res.id})[0].name:''}}-->
                                        <span v-for="u in units">
                                                  <span v-if="package.unit_id==u.id">{{u.name}}</span>
                                             </span>
                                    </div>
                                </td>
                                <td>{{item.package_nums}}</td>
                                <td>{{item.in_shelf}}</td>
                                <td>{{item.out_shelf}}</td>
                                <td>{{item.updated_at?item.updated_at:item.created_at}}</td>
                            </tr>
                        </table>
                        <el-pagination
                                style="text-align: right;"
                                @current-change="history_handleCurrentChange"
                                :current-page.sync="history_currentPage"
                                layout="prev, pager, next"
                                :total="split_package_log.total"
                        ></el-pagination>
                    </div>
                </el-form-item>
                <div>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item :label="$t('sale.add.sale16')"><!-- 规格： -->
                                {{package.packsize}}
                                <span v-for="u in units">
                                                  <span v-if="package.unit_id==u.id">{{u.name}}</span>
                                             </span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('sale.add.sale18')">{{package.stock}}</el-form-item><!-- 数量： -->
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('sale.add.sale213')">{{package.shelf}}</el-form-item><!-- 货架： -->
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item :label="$t('sale.add.sale216')"><!-- 拆分数量： -->
                                <el-input size="small" v-model="splitList.package_nums"></el-input>
                                <!--<span>{{standards.virtualunit_id?virtualunits.filter(item=>{return standards.virtualunit_id == item.id})[0].name:''}}</span>-->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('sale.add.sale213')"><!-- 货架： -->
                                <el-autocomplete
                                        v-model="splitList.in_shelf"
                                        :fetch-suggestions="querySearch_split_shelf"
                                        size="small"
                                        @select="handleSelect_split_shelf"
                                        clearable
                                >
                                    <template slot-scope="{ item }">
                                        <div>{{ item }}</div>
                                    </template>
                                </el-autocomplete>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="save_split()">{{$t('define')}}</el-button><!-- 确定 -->
                    <el-button size="mini" @click="splitDialog=false">{{$t('cancel')}}</el-button><!-- 取消 -->
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--取消预占-->
        <el-dialog
                :title="$t('sale.add.sale219')"
                :visible.sync="cancelDialog"
                width="60%"
                ><!-- 取消预占或通知 -->
            <table border bordercolor="#E5E5E5" style="border-collapse: collapse;">
                <tr>
                    <td>{{$t('sale.add.sale190')}}</td><!-- 批次 -->
                    <td>{{$t('sale.add.sale188')}}</td><!-- 仓库 -->
                    <td>{{$t('sale.add.sale16')}}</td><!-- 规格 -->
                    <td>类型</td>
                    <td>{{$t('sale.add.sale91')}}</td><!-- 状态 -->
                    <td><span style="color:red;">*</span>{{$t('sale.add.sale192')}}</td><!-- 预占数量 -->
                    <td>{{$t('sale.add.sale220')}}</td><!-- 预占时间 -->
                    <td>{{$t('sale.add.sale77')}}</td><!-- 操作 -->
                </tr>
                <tr v-for="item in cancelData" style="line-height:25px !important;">
                    <td>{{item.inventory.batchno}}</td>
                    <td>
                        <span v-for="w in warehouse">
                            <span v-if="item.inventory.warehouse_id==w.id">{{w.name}}</span>
                        </span>
                    </td>
                    <td v-if="item.packs">{{item.packs.packsize}}
                        <span v-for="u in units"><span v-if="item.packs.unit_id==u.id">{{u.name}}</span></span>
                    </td>
                    <td v-else>/</td>
                    <td>
                        {{item.cate_id==6?'中转预占':'正常预占'}}<br/>
                        <span style="color:red;">{{getEnumValue(GEnums.Warehouse,item.transfer_warehouse_id)}}</span>
                        
                    </td>
                    <td>
                        {{preout_status[item.status].name}}
                        <!--<span v-for="s in status_info">-->
                            <!--<span v-if="item.status==s.id">{{s.name}}</span>-->
                        <!--</span>-->
                    </td>
                    <td v-if="item.packs" class="d2-text-center">{{item.package_nums}}</td>
                    <td v-else class="d2-text-center">{{item.base_quantity}}
                        <span v-for="u in units"><span v-if="item.base_quantity_unit==u.id">{{u.name}}</span></span>
                    </td>
                    <td>{{item.created_at}}</td>
                    <td>
                        <el-button size="mini" type="primary" @click="cancel_preout(item.id,item.prod_id,item.status)" v-text="item.status==0?$t('sale.add.sale203'):$t('sale.add.sale204')" style="padding: 4px;"><!-- 取消预占/取消通知 -->
                        </el-button>
                    </td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancelDialog = false">{{$t('cancel')}}</el-button><!-- 取 消 -->
          </span>
        </el-dialog>

        <!-- 预占 -->
        <el-dialog
            :visible.sync="DialogPree"
            title="提示"
            width="30%"
            >
                <div style="text-align:left;font-size:15px;">
                    <i style="color:#E6A23C;margin:0px 5px;font-size:20px;" class="el-icon-warning"></i>
                    <span>是否确定需要预占{{pree_list.package_nums}}个规格为{{pree_list.packsize}}{{getEnumValue(units,pree_list.unit_id)}}</span>
                </div>
                <div style="text-align:right;margin:20px 0px;">
                    <el-button @click="preemption2_b()" type="primary" size="mini">确定</el-button>
                    <el-button @click="DialogPree = false"  size="mini">取消</el-button>
                </div>
        </el-dialog>

        <!-- 预占拆分 -->
        <el-dialog
            :visible.sync="DialogPree_split"
            title="提示"
            width="30%"
            >
                <div style="text-align:left;font-size:15px;">
                    <i style="color:#E6A23C;margin:0px 5px;font-size:20px;" class="el-icon-warning"></i>
                    <span>是否确定要拆分预占包装</span>
                </div>
                <div style="text-align:right;margin:20px 0px;">
                    <el-button @click="preemption2_b()" type="primary" size="mini">确定</el-button>
                    <el-button @click="DialogPree_split = false"  size="mini">取消</el-button>
                </div>
        </el-dialog>
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
        saler_contract_generate,
        saler_contract_verify,
        preemption_view,
        split_packaging_view,
        split_shelve_list,
        split_packaging,
        preemption,
        preout_view,
        cancle_preout
    } from '@/api/sale'
    import Big from "@/big/a/big.mjs";
    import { getShevies } from '@/api/instore'
    import $ from 'jquery'
    import { mapActions } from 'vuex'

    export default {
        name: "sales-preemption",
        data() {
            return {
                form_show1: true,
                form_show2: true,
                form_show3: true,
                form_show4: true,
                form_show5: true,
                check: false,
                splitDialog: false,
                splitShelfDialog:false,
                cancelDialog: false,
                detail_index: '',
                loading: false,
                dialogVisible: false,
                DialogPree:false,
                DialogPree_split:false,
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
                    details: [{
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
                        is_generation: 0,
                        commission:''
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
                if_declare_info: [],
                if_echapter_info: [],
                if_invoice_info: [],
                invoice_type: [],
                product_type: [],
                test_item: [],
                trade_mode: [],
                warehouse: [],
                units: [],
                product_file_info: [],
                checked: false,
                payment_type: [],
                receive_invoice_addresses: [],
                receive_goods_addresses: [],
                get_deliver_goods: [],
                account: [],
                save_show: true,
                check_contract: {
                    saler_contract_id: '',
                    approval_comment: '',
                    status: ''
                },
                splitData: [],
                cancelData: [],
                package: [],
                split_package_log: [],
                splitList: {
                    inventory_id: "",
                    package_id: "",
                    package_nums: '',
                    saler_contract_detail_id: '',
                    loading: false,
                    in_shelf:'',
                    out_inventory_shelf_id:''
                },
                pree_list:{
                    inventory_id: '',
                    inquiry_id: '',
                    saler_contract_id: '',
                    contract_detail_id: '',
                    type: '',
                    base_quantity:'',
                    package_nums: '',
                    package_id: '',
                    prod_id:'',
                    packsize:'',
                    unit_id:''
                },
                history_currentPage: 1,
                status_info:[],
                preout_status:{},
                shelve_list:[],
                enums:{},
                inventory_auto_preempt_info:[],
                StorageCondition:[],
                saler_contract_detail_id:''
            }
        },
        created() {
            if (this.$route.query.id) {
                this.fetchData(this.$route.query.id)
            }
        },
        watch: {
            $route(to,from) {
                if(to.name=='sales-preemption'){
                    this.fetchData(this.$route.query.id);
                }
            }
        },
        methods: {
            ...mapActions('d2admin/page',['close']),
            querySearch_split_shelf (queryString, cb) {
                getShevies(this.package.inventory.warehouse_id).then(res => {
                    var restaurants = []
                    for (var i in res.data) {
                        restaurants.push(res.data[i])
                    }
                    cb(restaurants)
                })
            },
            handleSelect_split_shelf (item) {
                this.splitList.in_shelf = item
            },
            fetchData(id) {
                preemption_view(id).then(res => {
                    this.sale = res.data
                    this.additional_cost_type = res.enum.additional_cost_type
                    this.address_type_info = res.enum.address_type_info
                    this.currencys = res.enum.currencys
                    this.delivery_type = res.enum.delivery_type
                    this.express_account_type = res.enum.express_account_type
                    this.express_company = res.enum.express_company
                    this.if_declare_info = res.enum.if_declare_info
                    this.if_echapter_info = res.enum.if_echapter_info
                    this.if_invoice_info = res.enum.if_invoice_info
                    this.invoice_type = res.enum.invoice_type
                    this.test_item = res.enum.test_item
                    this.trade_mode = res.enum.trade_mode
                    this.product_file_info = res.enum.product_file_info
                    this.units = res.enum.units
                    this.warehouse = res.enum.warehouse
                    this.status_info = res.enum.status_info
                    this.inventory_auto_preempt_info = res.enum.inventory_auto_preempt_info
                    this.enums = res.enum
                    this.StorageCondition = this.GEnums.StorageCondition;
                    this.sale.details.forEach((items,index)=>{
                        items.inventory_list.forEach((m,n)=>{
                            m.preout_nums_total=Number(m.preout_nums) 
                            m.shipments_nums_toatl=Number(m.shipments_nums) 
                            m.packs.forEach((i,j)=>{
                                m.preout_nums_total+=Number(i.preout_nums) 
                                m.shipments_nums_toatl+=Number(i.shipments_nums) 
                            })
                        })
                    })
                })
            },
            fetchData_b(id) {
                preemption_view(id).then(res => {
                    this.sale = res.data
                    this.sale.details.forEach((items,index)=>{
                        items.inventory_list.forEach((m,n)=>{
                            m.preout_nums_total=Number(m.preout_nums) 
                            m.shipments_nums_toatl=Number(m.shipments_nums) 
                            m.packs.forEach((i,j)=>{
                                m.preout_nums_total+=Number(i.preout_nums) 
                                m.shipments_nums_toatl+=Number(i.shipments_nums) 
                            })
                        })
                    })
                })
            },
            nums_change(num,quantity,packsize,index,index_a,index_b){
                if(num){
                    this.sale.details[index].inventory_list[index_a].packs[index_b].base_quantity = Number(new Big(num).times(packsize)).toFixed(6);
                }
            },
            quantity_change(num,quantity,packsize,index,index_a,index_b){
                if(quantity){
                    var number = toNonExponential(new Big(quantity).div(packsize));
                    this.sale.details[index].inventory_list[index_a].packs[index_b].package_nums = Math.ceil(number)
                }else{
                    this.sale.details[index].inventory_list[index_a].packs[index_b].package_nums = ''
                }
            },
            Ship(cas){
                this.$router.push({
                    path: '/sales/notice',
                    name: 'sales-notice',
                    query: {
                        cas:cas,
                        contract_number:this.sale.contract_number,
                        preout_status:0
                    }
                })
            },
            cancel_preemption(contract_detail_id,prod_id, type, inventory_id, package_id) {
                let obj = {
                    contract_detail_id: contract_detail_id,
                    type: type,
                    inventory_id: inventory_id,
                    package_id: package_id,
                    prod_id:prod_id
                }
                this.cancelData = []
                preout_view(obj).then(res => {
                    this.cancelData = res.data
                    this.preout_status=res.enum.preout_status
                    this.cancelDialog = true
                })
            },
            cancel_preout(id,prod_id,status) {
                cancle_preout(id,prod_id, this, this.$route.query.id,'',status)
            },
            preemption1(inventory_id,prod_id, inquiry_id, saler_contract_id, contract_detail_id, type, base_quantity, base_quantity_unit,cate_id,transfer_warehouse_id ) {
                if (inquiry_id == null) {
                    inquiry_id = 0
                }
                let obj = {
                    inventory_id: inventory_id,
                    inquiry_id: inquiry_id,
                    saler_contract_id: saler_contract_id,
                    contract_detail_id: contract_detail_id,
                    type: type,
                    base_quantity: base_quantity,
                    base_quantity_unit: base_quantity_unit,
                    prod_id:prod_id,
                    cate_id
                }
                if(cate_id==6){obj.transfer_warehouse_id=transfer_warehouse_id}
                preemption(obj, this.$route.query.id, this)
            },
            preemption2_b(){
                this.DialogPree = false
                this.DialogPree_split = false
                preemption(this.pree_list, this.$route.query.id, this)
            },
            preemption2(inventory_id,prod_id, inquiry_id, saler_contract_id, contract_detail_id, type, package_nums,base_quantity, package_id,packsize,unit_id,cate_id,transfer_warehouse_id ) {
                if (inquiry_id == null) {
                    inquiry_id = 0
                }
                this.pree_list = {
                    inventory_id: inventory_id,
                    inquiry_id: inquiry_id,
                    saler_contract_id: saler_contract_id,
                    contract_detail_id: contract_detail_id,
                    type: type,
                    base_quantity:base_quantity,
                    package_nums: package_nums,
                    package_id: package_id,
                    prod_id:prod_id,
                    packsize:packsize,
                    unit_id:unit_id,
                    cate_id,
                }
                if(cate_id==6){this.pree_list.transfer_warehouse_id=transfer_warehouse_id}
                if(package_nums%1===0){
                    if((Number(base_quantity)%Number(packsize))!==0 ){
                        this.DialogPree_split = true
                    }else{
                        preemption(this.pree_list, this.$route.query.id, this)
                    }
                }else{
                    this.DialogPree = true
                }
            },
            split_shelve(package_id,item){
                this.splitShelfDialog = true
                this.saler_contract_detail_id=item.id
                this.splitList.prod_id = item.prod_id
                split_shelve_list(package_id).then(res=>{
                     this.shelve_list=res.data
                })
            },
            split(inventory_shelve_id,package_id) {
                this.splitDialog = true
                this.splitList.out_inventory_shelf_id = inventory_shelve_id
                this.splitList.package_nums = ''
                this.splitList.inventory_shelve_id = inventory_shelve_id,
                this.splitList.package_id = package_id,
                this.splitList.saler_contract_detail_id = this.saler_contract_detail_id
                split_packaging_view(inventory_shelve_id, package_id).then(res => {
                    this.splitData = res.data.shelve.inventory;
                    this.package = res.data.shelve;
                    this.split_package_log = res.data.split_package_log;
                })
            },
            save_split() {
                split_packaging(this.splitList, this.$route.query.id, this)
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
            cancel() {
                this.$router.replace({
                    path: '/sales/sales',
                    name: 'sales-sales'
                })
                const tagName= 'sales-preemption'
                this.close({tagName});
            },
            history_handleCurrentChange(page_current) {
                this.profitList.page = this.history_currentPage = page_current;
                lists(this.profitList, "profit_loss_view").then(res => {
                    this.history_list = res.data.inventory_profit_loss;
                });
            },
        }
    }
    function toNonExponential(num) {
        var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
        return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
    }
</script>
