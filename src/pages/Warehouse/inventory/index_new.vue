<style lang="scss" scoped type="text/scss">
    .heard {
        display: flex;
        // justify-content: flex-end;
        flex-wrap: wrap;
        margin: 10px 0;
        align-items: center;
        .el-input {
            margin: 0px 5px;
            margin-top: 5px;
        }
        .el-select {
            margin: 0px 5px;
            margin-top: 5px;
        }
    }

    .el-input {
        width: 150px;
    }

    .card_first {
        margin: 10px 0px;
        font-size: 14px;
        /deep/ .el-card__body {
            padding: 0px !important;
        }
        ul {
            list-style: none;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px;
            margin: 0px;
            // li {
            //   border: 1px solid red;
            // }
            div {
                padding: 0px 10px;
            }
        }
        .wareHouse {
            .wareContent {
                width: 15%;
                border-left: 1px solid #e9e9e9;
            }
            .wareRight_body {
                border-bottom: 1px solid #e9e9e9;
                display: flex;
                align-items: center;
                justify-content: space-between;
                div {
                    padding: 0px 10px;
                    width: 25%;
                }
            }
        }
    }

    .card {
        margin: 10px 0px;
        /deep/ .el-card__body {
            padding: 0px !important;
        }
        ul {
            list-style: none;
            display: flex;
            justify-content: space-between;
            margin: 0px;
            padding: 0px;
            li {
                padding: 10px 0px;
            }
        }
    }

    .profit_form_item {
        .el-input {
            width: 100%;
        }
    }

    .profit_form {
        span {
            margin: 0px 5px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            td {
                padding: 0px 5px;
                line-height: 25px;
            }
        }
        .el-pagination {
            text-align: right;
            padding: 0px;
            line-height: 0px;
            margin-top: 10px;
        }
    }

    .packe_form {
        .el-input {
            width: 100%;
        }
        /deep/ table {
            width: 100%;
            border-collapse: collapse;
            .el-input__inner {
                border: 0px;
                padding: 0px;
            }
            td {
                padding: 0px 5px;
                line-height: 30px;
            }
        }
    }

    .checked_items {
        display: flex;
    }

    /deep/ .checkbox_nei {
        margin-left: 10px;
        padding-left: 0px;
        .el-checkbox__label {
            padding-left: 0px;
        }
    }

    /deep/ .el-checkbox__label {
        padding-left: 5px;
    }
    .el-checkbox{
        margin-right: 0px;
    }
    .active {
        border-top: 0px;
    }
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
        <div class="heard">
            <el-input clearable placeholder="合同号" v-model="queryList.purchaseorder_no" size="mini"></el-input>
            <el-input clearable placeholder="CAS" v-model="queryList.cas" size="mini"></el-input>
            <el-input clearable placeholder="产品名称" v-model="queryList.name" size="mini"></el-input>
            <el-input clearable placeholder="供应商批号" v-model="queryList.supplier_batchno" size="mini"></el-input>
            <el-input clearable placeholder="批号" v-model="queryList.batchno" size="mini"></el-input>
            <el-select
                    placeholder="仓库"
                    clearable
                    filterable
                    v-model="queryList.warehouse_id"
                    size="mini"
                    style="width: 150px;"
            >
                <el-option
                        v-for="item in enum_warehouse"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.started_at"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="入库开始"
                    size="mini"
                    style="width: 125px;"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.ended_at"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="入库结束"
                    size="mini"
                    style="width: 125px;"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.expired_at"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    type="date"
                    placeholder="过期日期"
                    size="mini"
                    style="width: 125px;"
                    clearable
            ></el-date-picker>
            <el-select
                    placeholder="是否有货"
                    clearable
                    v-model="queryList.stock_status"
                    size="mini"
                    style="width: 90px;"
            >
                <el-option
                        v-for="item in enums.stock_status"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-select
                    placeholder="非样品/样品/退货"
                    clearable
                    v-model="queryList.is_sample"
                    size="mini"
                    style="width: 140px;"
            >
                <el-option
                        v-for="item in enums.is_sample"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
            </el-select>
            <el-select
                    placeholder="采购员"
                    clearable
                    v-model="queryList.purchase_id"
                    size="mini"
                    style="width: 90px;"
            >
                <el-option v-for="item in purchaseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <!--<el-select-->
            <!--placeholder="检测状态"-->
            <!--clearable-->
            <!--v-model="queryList.check_status"-->
            <!--size="mini"-->
            <!--style="width: 150px;"-->
            <!--&gt;-->
            <!--<el-option v-for="item in enums.check_statuses" :key="item.id" :label="item.name"-->
            <!--:value="item.id"></el-option>-->
            <!--</el-select>-->

            <el-select
                    v-model="queryList.order_result"
                    clearable
                    filterable
                    size="mini"
                    style="width: 100px;"
                    :placeholder="$t('quality.queryList.result')"
            >
                <el-option v-for="i in enums.order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>
            <!-- <el-select
                    v-model="queryList.order_status"
                    clearable
                    filterable
                    size="mini"
                    style="width: 100px;"
                    :placeholder="$t('quality.queryList.status')"
            >
                <el-option v-for="i in enums.order_status" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select> -->
            <el-select
                v-model="queryList.flow_statuses"
                clearable
                filterable
                size="mini"
                style="width: 120px;"
                placeholder="状态">
                    <el-option v-for="i in flow_statuses" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>

            <el-select
                    placeholder="产品提示"
                    clearable
                    v-model="queryList.prodremind"
                    size="mini"
                    style="width: 150px;"
            >
                <el-option v-for="item in enums.prodremind" :key="item.id" :label="item.title"
                           :value="item.id"></el-option>
            </el-select>
            <el-select
                    v-model="queryList.supplier_id"
                    placeholder="供应商"
                    size="mini"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    :loading="supplyloading"
                    style="width: 220px"
                    clearable
            >
                <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
            <el-input clearable placeholder="货架" v-model="queryList.shelf" size="mini" style="width: 120px"></el-input>
            <div style="margin: 6px 5px 0 5px;display: inline-block;">
                <el-checkbox v-model="queryList.if_need_check" true-label="1"  false-label="0" >免检</el-checkbox>
            </div>
            <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
        </div>

        <!-- 页面 -->
        <div v-for="item in list.data" :key="item.id">
            <el-card class="card_first">
                <div style="border-bottom:1px solid #e9e9e9;padding:5px 0px;">
                    <ul>
                        <li style="width:400px;">
                            <div>ID:{{item.id}}</div>
                            <div>{{item.prod?item.prod.name_cn:''}}</div>
                            <div>{{item.prod?item.prod.name:''}}</div>
                            <div>MF :{{item.prod?item.prod.mf:''}}</div>
                            <div>CAS:{{item.prod?item.prod.cas:''}}</div>
                            <div>MDL:{{item.prod?item.prod.mdl:''}}</div>
                        </li>
                        <li style="width:310px;">
                            <el-tooltip placement="top">
                                <div slot="content">
                                    公司:{{item.company?item.company.name:''}}<br>
                                    供应商:{{item.supplier?item.supplier.name:''}}
                                </div>
                                <div v-if="user_type!=102||user_id==151">供应商:{{item.supplier?item.supplier.name:''}}</div>
                            </el-tooltip>
                            <div>供应商批次：{{item.supplier_batchno}}</div>
                            <div>
                                批次:{{item.batchno}}
                                <span v-if="item.if_need_check==2" style="color:#67C23A;margin-right:5px;">免检</span>

                                <!-- <span v-if="item.checked_result"> -->
                                    <!-- 结果-->
                                    <span v-if="item.checked_result==1" style="color:#67C23A;margin-right:5px;">
                                        {{getEnumValue(enums.order_result,item.checked_result)}}
                                    </span>
                                    <span v-else-if="item.checked_result==3" style="color:#F56C6C;margin-right:5px;">
                                        {{getEnumValue(enums.order_result,item.checked_result)}}
                                    </span>
                                    <span v-else style="color:#E6A23C;margin-right:5px;">{{getEnumValue(enums.order_result,item.checked_result)}}</span>
                                <!-- </span>   -->
                                <!-- <span v-else> -->
                                    <!-- 检测状态-->
                                    <span v-if="item.if_need_check!=2&&item.quality_orders&&item.quality_orders.length>0">
                                        <span v-if="item.flow_status==1300" style="color:#67C23A;">
                                            {{getEnumValue(flow_statuses,item.flow_status)}}
                                        </span>
                                        <span v-else-if="item.flow_status==1001||item.flow_status==1000" style="color:#F56C6C;">
                                            {{getEnumValue(flow_statuses,item.flow_status)}}
                                        </span>
                                        <span v-else style="color:#E6A23C;">
                                            {{getEnumValue(flow_statuses,item.flow_status)}}
                                        </span>
                                    </span>
                                <!-- </span> -->

                                <el-tooltip
                                        v-if="item.check_noticed==2"
                                        class="item"
                                        effect="dark"
                                        :content="item.expired_at"
                                        placement="top"
                                        style="padding: 0 0 !important;"
                                >
                                    <img src="/image/module/warn.png" class="img" alt style="width: 16px"/>
                                </el-tooltip>
                            </div>
                            <div>合同号:{{item.purchaseorder_no}}</div>
                            <div>采购:{{item.purchaser?item.purchaser.name:''}}</div>
                            <div>
                                产品外观：{{getEnumValue(ChemicalAppearance,item.chemprodappearance_id)?getEnumValue(ChemicalAppearance,item.chemprodappearance_id):item.characterinfo}}
                            </div>
                        </li>
                        <li>
                            <div>{{getEnumValue(enums.warehouse,item.warehouse_id)}}</div>
                            <div>入库:{{item.created_at}}</div>
                            <div>有效期:{{item.expired_at}}</div>
                            <div>纯度:{{item.purity}}</div>
                            <div>来货包装:{{getEnumValue(virtualunits,item.in_virtualunit_id)}}</div>
                        </li>
                        <li>
                            <div>
                                {{getEnumValue(enums.is_sample,item.is_sample?item.is_sample:'')}}
                                <span v-if="item.is_sample===1"
                                >{{getEnumValue(enums.is_sampled,item.is_sampled)}}</span>
                            </div>
                            <div>库存:{{item.stock}}{{getEnumValue(units,item.base_unit_id)}}</div>
                            <div>散装:{{item.remained_stock}}{{getEnumValue(base_units,item.base_unit_id)}}</div>
                            <div>
                                <el-popover
                                    placement="right"
                                    width="400"
                                    trigger="click">
                                    <el-table :data="item.getPreoutInfo" border>
                                        <el-table-column label="销售">
                                            <template slot-scope="scope">{{scope.row.sale_id}}</template>
                                        </el-table-column>
                                        <el-table-column label="项目号">
                                            <template slot-scope="scope">{{scope.row.contract_detail_number}}</template>
                                        </el-table-column>
                                        <el-table-column label="预占数量">
                                            <template slot-scope="scope">{{scope.row.quantity}}{{getEnumValue(units,scope.row.quantity_unit)}}</template>
                                        </el-table-column>
                                    </el-table>
                                    <span slot="reference" style="cursor:pointer;" @click="hover_popover(item)">预占:{{item.preout_stock}}{{getEnumValue(base_units,item.base_unit_id)}}</span>
                                </el-popover>
                            </div>
                            <div>毛重:{{item.netweightinfo}}</div>
                        </li>
                        <li>
                           <el-button
                                    type="text"
                                    size="small"
                                    class="d2-ml-10"
                                    @click="statusClick(item.id,item.checked_result,item.if_need_check)"
                                    v-if="permissions.indexOf(589)>-1"
                            >检测结果修改
                            </el-button>
                            <div style="display:flex;justify-content: flex-end;">
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="testClick(item)"
                                        v-if="permissions.indexOf(536)>-1"
                                >补充测试
                                </el-button>
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="recheckClick(item)"
                                        v-if="permissions.indexOf(531)>-1"
                                >复检
                                </el-button>
                            </div>
                            <div>
                                <el-button
                                        type="text"
                                        size="small"
                                        @click="revise(item)"
                                        v-if="permissions.indexOf(602)>-1"
                                >修改外观
                                </el-button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="wareHouse" v-if="item.shelves.length>0">
                    <el-row
                            style="display: flex;justify-content: center;align-items: center;border-bottom:1px solid #e9e9e9;"
                    >
                        <el-col :span="2" style="text-align:center;">散装</el-col>
                        <el-col :span="22" style="border-left:1px solid #e9e9e9;">
                            <div v-for="(item_i,index) in item.shelves" class="wareRight_body">
                                <div>ID:{{item_i.id}}</div>
                                <div>规格：/</div>
                                <div>
                                    库存：{{item_i.quantity}}{{getEnumValue(units,item_i.quantity_unit_id?item_i.quantity_unit_id:'')}}
                                </div>
                                <div>
                                    预占：{{item_i.preout_stock}}{{getEnumValue(units,item_i.base_quantity_unit_id?item_i.base_quantity_unit_id:'')}}
                                </div>
                                <div>货架：{{item_i.shelf}}</div>
                                <div style="text-align: right;width:350px;">
                                    <el-button size="small" type="text" @click="print(item,item_i)">打印</el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="packeClick(item_i,item)"
                                            v-if="permissions.indexOf(520)>-1"
                                    >分装
                                    </el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="profitClick(item_i.id,2)"
                                            v-if="permissions.indexOf(273)>-1"
                                    >盘盈
                                    </el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="profitLossClick(item_i.id,2)"
                                            v-if="permissions.indexOf(517)>-1"
                                    >盘亏
                                    </el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="allotClick(item.id,item_i.id,2)"
                                            v-if="permissions.indexOf(534)>-1"
                                    >调拨
                                    </el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="wareHouse" v-if="item.package_shelves.length>0">
                    <el-row style="display: flex;justify-content: center;align-items: center;">
                        <el-col :span="2" style="text-align:center;">包装</el-col>
                        <el-col :span="22" style="border-left:1px solid #e9e9e9;">
                            <div v-for="item_i in item.package_shelves" class="wareRight_body">
                                <div>
                                    规格：{{item_i.packsize}}{{getEnumValue(units,item_i.packsize_unit_id?item_i.packsize_unit_id:'')}}
                                </div>
                                <div>库存：{{item_i.stock}}</div>
                                <div>预占：{{item_i.preout_stock}}</div>
                                <div>货架：{{item_i.shelf}}</div>
                                <div style="text-align: right;">
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="splitClick(item,item_i.inventorypackage_id,item_i.id,1)"
                                            v-if="permissions.indexOf(518)>-1"
                                    >拆分
                                    </el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="profitClick(item_i.id,1)"
                                            v-if="permissions.indexOf(273)>-1"
                                    >盘盈
                                    </el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="profitLossClick(item_i.id,1)"
                                            v-if="permissions.indexOf(517)>-1"
                                    >盘亏
                                    </el-button>
                                    <el-button
                                            type="text"
                                            size="small"
                                            @click="allotClick(item.id,item_i.id,1)"
                                            v-if="permissions.indexOf(534)>-1"
                                    >调拨
                                    </el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-card>
        </div>

        <!-- 修改 -->
        <el-dialog :visible.sync="reviseDialog" width="40%" @close='close_revise()'>
            <el-form label-position="right" label-width="90px">
                <el-form-item label="外观:">
                    <el-select
                        v-model="Appearance.chemprodappearance_id"
                        clearable
                        filterable
                        size="mini"
                        style="width: 200px;"
                        >
                            <el-option v-for="i in ChemicalAppearance" :label="i.name" :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="change_revise()">确定</el-button>
                    <el-button size="mini" @click="close_revise()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 分装 -->
        <el-dialog :visible.sync="dialogAdd" width="40%" @close="close_packe()">
            <el-form label-position="right" class="packe_form">
                <el-form-item>
                    <table border="1" bordercolor="#E5E5E5">
                        <tr>
                            <td>货架</td>
                            <td>大小</td>
                            <td>单位</td>
                            <td>数量</td>
                            <td>操作</td>
                        </tr>
                        <tr v-for="(item,index) in addpackeage.packages">
                            <td>
                                <!-- <el-input v-model="item.shelf"></el-input> -->
                                <el-autocomplete
                                        v-model="item.shelf"
                                        :fetch-suggestions="querySearch_packe"
                                        placeholder="请输入内容"
                                        size="mini"
                                        @select="handleSelect_packe"
                                        @focus="package_id(index)"
                                        clearable
                                >
                                    <template slot-scope="{ item }">
                                        <div>{{ item }}</div>
                                    </template>
                                </el-autocomplete>
                            </td>
                            <td>
                                <el-input v-model="item.packsize"></el-input>
                            </td>
                            <td>
                                <el-select size="small" style="width:100%;" v-model="item.unit_id">
                                    <el-option
                                            v-for="item in units"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </td>
                            <td>
                                <el-input v-model="item.stock"></el-input>
                            </td>
                            <td>
                                <el-button
                                        type="primary"
                                        size="mini"
                                        @click="del_packe(index)"
                                        icon="el-icon-minus"
                                ></el-button>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item style="text-align:right;">
                    <el-button type="primary" @click="add_packe()" icon="el-icon-plus" size="mini"></el-button>
                    <el-button type="primary" size="mini" @click="save_packe()" :loading="save_fy">保存</el-button>
                    <el-button size="mini" @click="close_packe()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 拆分 -->
        <el-dialog :visible.sync="splitDialog" width="70%">
            <el-form label-position="right" label-width="90px" class="profit_form">
                <el-form-item label="信息：">
                    <table border bordercolor="#E5E5E5">
                        <tr>
                            <td>批次</td>
                            <td>仓库</td>
                            <td>CAS</td>
                            <td>名称</td>
                        </tr>
                        <tr>
                            <td>{{splitData.batchno?splitData.batchno:''}}</td>
                            <td>
                                {{splitData.warehouse_id?enum_warehouse.filter(i => {return splitData.warehouse_id ==
                                i.id})[0].name:''}}
                            </td>
                            <td>{{splitData.prod?splitData.prod.cas:''}}</td>
                            <td>
                                <div>{{splitData.name_cn}}</div>
                                <div>{{splitData.name}}</div>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="记录：">
                    <div>
                        <table border bordercolor="#E5E5E5">
                            <tr>
                                <td>批次</td>
                                <td>仓库</td>
                                <td>CAS</td>
                                <td>名称</td>
                                <td>规格</td>
                                <td>拆分数量</td>
                                <td>入货架</td>
                                <td>出货架</td>
                                <td>操作日期</td>
                            </tr>
                            <tr v-if="item.inventory!=null" v-for="item in split_package_log.data">
                                <td>{{item.inventory?item.inventory.batchno:''}}</td>
                                <td>{{item.warehouse_id?enum_warehouse.filter(res=>{return
                                    item.warehouse_id==res.id})[0].name:''}}
                                </td>
                                <td>{{item.inventory.cas}}</td>
                                <td>
                                    <div>{{item.inventory.name_cn}}</div>
                                    <div>{{item.inventory.name}}</div>
                                </td>
                                <td>
                                    <div
                                            v-if="item.package"
                                    >{{item.package.packsize}}{{getEnumValue(units,item.package.unit_id)}}
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
                            <el-form-item
                                    label="规格："
                            >{{package.packsize}}{{getEnumValue(units,package.packsize_unit_id)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量：">{{package.stock}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架：">{{package.shelf}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="拆分数量：">
                                <el-input size="small" v-model="splitList.package_nums"></el-input>
                                <!--<span>{{standards.virtualunit_id?virtualunits.filter(item=>{return standards.virtualunit_id == item.id})[0].name:''}}</span>-->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架：">
                                <el-autocomplete
                                        v-model="splitList.in_shelf"
                                        :fetch-suggestions="querySearch_split_shelf"
                                        placeholder="请输入内容"
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
                    <el-button type="primary" size="mini" @click="save_split()">确定</el-button>
                    <el-button size="mini" @click="close_split()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 盘盈 -->
        <el-dialog :visible.sync="profitDialog" width="70%">
            <el-form label-position="right" label-width="90px" class="profit_form">
                <el-form-item label="信息：">
                    <table v-if="profit_size_p != 2" border bordercolor="#E5E5E5">
                        <tr>
                            <td>批次</td>
                            <td>仓库</td>
                            <td>CAS</td>
                            <td>名称</td>
                        </tr>
                        <tr>
                            <td>{{standards.inventory?standards.inventory.batchno:''}}</td>
                            <td>{{standards.inventory&&standards.inventory.warehouse_id?enum_warehouse.filter(i =>
                                {return standards.inventory.warehouse_id ==i.id})[0].name:''}}
                            </td>
                            <td>{{standards.prod?standards.prod.cas:''}}</td>
                            <td>
                                <div>{{standards.inventory?standards.inventory.name_cn:''}}</div>
                                <div>{{standards.inventory?standards.inventory.name:''}}</div>
                            </td>
                        </tr>
                    </table>
                    <table v-if="profit_size_p == 2" border bordercolor="#E5E5E5">
                        <tr>
                            <td>批次</td>
                            <td>仓库</td>
                            <td>CAS</td>
                            <td>名称</td>
                        </tr>
                        <tr>
                            <td>{{profitData.inventory?profitData.inventory.batchno:''}}</td>
                            <td>{{profitData.inventory&&profitData.inventory.warehouse_id?enum_warehouse.filter(i =>
                                {return profitData.inventory.warehouse_id ==i.id})[0].name:''}}
                            </td>
                            <td>{{profitData.prod?profitData.prod.cas:''}}</td>
                            <td>
                                <div>{{profitData.inventory?profitData.inventory.name_cn:''}}</div>
                                <div>{{profitData.inventory?profitData.inventory.name:''}}</div>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="记录：">
                    <div>
                        <table border bordercolor="#E5E5E5">
                            <tr>
                                <td>批次</td>
                                <td>仓库</td>
                                <td>货架</td>
                                <td>CAS</td>
                                <td width="40px">类型</td>
                                <td>规格</td>
                                <td>数量</td>
                                <td>总量</td>
                                <td width="80px">状态</td>
                            </tr>
                            <tr v-for="item in history_list.data">
                                <td>{{item.inventory.batchno}}</td>
                                <td>
                                    {{item.warehouse_id?getEnumValue(enum_warehouse,item.warehouse_id):''}}
                                </td>
                                <td>{{item.shelf}}</td>
                                <td>{{item.prod.cas}}</td>
                                <td>{{item.package_type==1?'整装':'散装'}}</td>
                                <td>
                                    <div v-if="item.package">
                                        {{item.package.packsize}}{{item.package.base_unit_id?getEnumValue(base_units,item.package.base_unit_id):''}}
                                    </div>
                                </td>
                                <td>{{item.package_nums}}</td>
                                <td>
                                    {{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}
                                </td>
                                <td>
                                    {{getEnumValue(status_info,item.status)}}
                                </td>
                            </tr>
                        </table>
                        <el-pagination
                                v-if="history_list.total"
                                style="text-align: right;"
                                @current-change="history_handleCurrentChange"
                                :page-size="history_list.per_page"
                                :current-page.sync="history_currentPage"
                                layout="prev, pager, next"
                                :total="history_list.total"
                        ></el-pagination>
                    </div>
                </el-form-item>
                <div v-if="profit_size_p != 2">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item
                                    label="规格："
                            >{{standards.packsize}}{{standards.packsize_unit_id?base_units.filter(item=>{return
                                standards.packsize_unit_id == item.id})[0].name:''}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量：">{{standards.stock}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架：" style="width:300px;">
                                <span>{{standards.shelf}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="盘盈：">
                        <el-input size="small" v-model="standards.number"></el-input>
                        <span>{{standards.virtualunit_id?virtualunits.filter(item=>{return standards.virtualunit_id == item.id})[0].name:''}}</span>
                    </el-form-item>
                </div>
                <div v-if="profit_size_p == 2">
                    <el-form :inline="true" label-width="90px">
                        <el-form-item label="散装库存：" style="width:300px;">
                            <span>{{profitData.quantity}}</span>
                            <span>{{profitData.quantity_unit_id?base_units.filter(res=>{return profitData.quantity_unit_id==res.id})[0].name:''}}</span>
                        </el-form-item>
                        <el-form-item label="货架：" style="width:300px;">
                            <span>{{profitData.shelf}}</span>
                        </el-form-item>
                    </el-form>
                    <el-form-item label="盘盈：">
                        <el-input size="small" v-model="profitData.number"></el-input>
                        <span>{{profitData.quantity_unit_id?base_units.filter(res=>{return profitData.quantity_unit_id==res.id})[0].name:''}}</span>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="add_profit()" :loading="save_fy">确定</el-button>
                    <el-button size="mini" @click="close_profit()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 盘亏 -->
        <el-dialog :visible.sync="profitLoss_Dialog" width="70%">
            <el-form label-position="right" label-width="90px" class="profit_form">
                <el-form-item label="信息：">
                    <table v-if="profit_size_p != 2" border bordercolor="#E5E5E5">
                        <tr>
                            <td>批次</td>
                            <td>仓库</td>
                            <td>CAS</td>
                            <td>名称</td>
                        </tr>
                        <tr>
                            <td>{{standards.inventory?standards.inventory.batchno:''}}</td>
                            <td>{{standards.inventory&&standards.inventory.warehouse_id?enum_warehouse.filter(i =>
                                {return standards.inventory.warehouse_id ==i.id})[0].name:''}}
                            </td>
                            <td>{{standards.prod?standards.prod.cas:''}}</td>
                            <td>
                                <div>{{standards.inventory?standards.inventory.name_cn:''}}</div>
                                <div>{{standards.inventory?standards.inventory.name:''}}</div>
                            </td>
                        </tr>
                    </table>
                    <table v-if="profit_size_p == 2" border bordercolor="#E5E5E5">
                        <tr>
                            <td>批次</td>
                            <td>仓库</td>
                            <td>CAS</td>
                            <td>名称</td>
                        </tr>
                        <tr>
                            <td>{{profitData.inventory?profitData.inventory.batchno:''}}</td>
                            <td>{{profitData.inventory&&profitData.inventory.warehouse_id?enum_warehouse.filter(i =>
                                {return profitData.inventory.warehouse_id ==i.id})[0].name:''}}
                            </td>
                            <td>{{profitData.prod?profitData.prod.cas:''}}</td>
                            <td>
                                <div>{{profitData.inventory?profitData.inventory.name_cn:''}}</div>
                                <div>{{profitData.inventory?profitData.inventory.name:''}}</div>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="记录：">
                    <div>
                        <table border bordercolor="#E5E5E5">
                            <tr>
                                <td>批次</td>
                                <td>仓库</td>
                                <td>货架</td>
                                <td>CAS</td>
                                <td width="40px">类型</td>
                                <td>规格</td>
                                <td>数量</td>
                                <td>总量</td>
                                <td width="80px">状态</td>
                            </tr>
                            <tr v-for="item in history_list_l.data">
                                <td>{{item.inventory.batchno}}</td>
                                <td>{{item.warehouse_id?getEnumValue(enum_warehouse,item.warehouse_id):''}}
                                </td>
                                <td>{{item.shelf}}</td>
                                <td>{{item.prod.cas}}</td>
                                <td>{{item.package_type==1?'整装':'散装'}}</td>
                                <td>
                                    <div v-if="item.package">
                                        {{item.package.packsize}}{{item.package.base_unit_id?getEnumValue(base_units,item.package.base_unit_id):''}}
                                    </div>
                                </td>
                                <td>{{item.package_nums}}</td>
                                <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}
                                </td>
                                <td>
                                    {{getEnumValue(status_info,item.status)}}
                                </td>
                            </tr>
                        </table>
                        <el-pagination
                                v-if="history_list_l.total"
                                style="text-align: right;"
                                @current-change="history_handleCurrentChange"
                                :page-size="history_list_l.per_page"
                                :current-page.sync="history_currentPage"
                                layout="prev, pager, next"
                                :total="history_list_l.total"
                        ></el-pagination>
                    </div>
                </el-form-item>
                <div v-if="profit_size_p!='2'">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item
                                    label="规格"
                            >{{standards.packsize}}
                                {{getEnumValue(units,'standards.packsize_unit_id')}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量：">{{standards.stock}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架：" style="width:300px;">
                                <span>{{standards.shelf}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="盘亏：">
                        <el-input size="small" v-model="standards.number"></el-input>
                        <span>{{standards.virtualunit_id?virtualunits.filter(item=>{return standards.virtualunit_id == item.id})[0].name:''}}</span>
                    </el-form-item>
                    <el-form-item label="盘亏备注：">
                        <el-input size="small" type="textarea" v-model="standards.reason"></el-input>
                    </el-form-item>
                </div>
                <div v-if="profit_size_p=='2'">
                    <el-form :inline="true" label-width="90px">
                        <el-form-item label="散装库存：" style="width:300px;">
                            <span>{{profitData.quantity}}</span>
                            <span>{{profitData.quantity_unit_id?base_units.filter(res=>{return profitData.quantity_unit_id==res.id})[0].name:''}}</span>
                        </el-form-item>
                        <el-form-item label="货架：" style="width:300px;">
                            <span>{{profitData.shelf}}</span>
                        </el-form-item>
                    </el-form>
                    <el-form-item label="盘亏：">
                        <el-input size="small" v-model="profitData.number"></el-input>
                        <span>{{profitData.quantity_unit_id?base_units.filter(res=>{return profitData.quantity_unit_id==res.id})[0].name:''}}</span>
                    </el-form-item>
                    <el-form-item label="盘亏备注：">
                        <el-input size="small" type="textarea" v-model="profitData.reason"></el-input>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="add_profitLoss()" :loading="save_fy">确定</el-button>
                    <el-button size="mini" @click="close_profitLoss()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 调拨 -->
        <el-dialog :visible.sync="allot_Dialog" width="70%" @close="close_allot()">
            <el-form label-position="right" label-width="90px" class="profit_form">
                <el-form-item label="信息：">
                    <table border bordercolor="#E5E5E5">
                        <tr>
                            <td>批次</td>
                            <td>仓库</td>
                            <td>CAS</td>
                            <td>名称</td>
                        </tr>
                        <tr>
                            <td>{{profitData.batchno}}</td>
                            <td>{{profitData.warehouse_id?enum_warehouse.filter(i => {return profitData.warehouse_id == i.id})[0].name:''}}
                            </td>
                            <td>{{profitData.prod?profitData.prod.cas:''}}</td>
                            <td>
                                <div>{{profitData.name_cn}}</div>
                                <div>{{profitData.name}}</div>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item label="记录：">
                    <div>
                        <table border bordercolor="#E5E5E5" v-if="history_list_t">
                            <tr>
                                <td>批次</td>
                                <td>仓库/货架</td>
                                <td>类型</td>
                                <td>规格</td>
                                <td>数量</td>
                                <td>总量</td>
                                <td>调拨仓库/货架</td>
                                <td>状态</td>
                            </tr>
                            <tr v-for="item in history_list_t.data">
                                <td>{{item.inventory.batchno}}</td>
                                <td>
                                    {{item.warehouse_id?enum_warehouse.filter(res=>{return
                                    item.warehouse_id==res.id})[0].name:''}}/
                                    {{item.shelf}}
                                </td>
                                <td>{{item.package_type==1?'整装':'散装'}}</td>
                                <td>
                                    <div v-if="item.package_shelves&&item.package_type!=2">
                                        {{item.package_shelves.packsize}}
                                        {{getEnumValue(units,item.package_shelves.packsize_unit_id)}}
                                    </div>
                                </td>
                                <td>{{item.package_nums}}</td>
                                <td>
                                    {{item.quantity}}
                                    {{getEnumValue(units,item.quantity_unit)}}
                                </td>
                                <td>
                                    {{item.warehouse_id_to?enum_warehouse.filter(res=>{return
                                    item.warehouse_id_to==res.id})[0].name:''}}/
                                    {{item.shelf_to}}
                                </td>
                                <td>
                                    {{getEnumValue(status_info,item.status)}}
                                </td>
                            </tr>
                        </table>
                        <el-pagination
                                v-if="history_list.total"
                                style="text-align: right;"
                                @current-change="allot_handleCurrentChange"
                                :page-size="history_list.per_page"
                                :current-page.sync="history_currentPage"
                                layout="prev, pager, next"
                                :total="history_list.total"
                        ></el-pagination>
                    </div>
                </el-form-item>
                <el-row>
                    <!--<el-col :span="8">-->
                    <!--<el-form-item label="公司：">-->
                    <!--<el-select size="small" v-model="addAllot.company_id_to">-->
                    <!--<el-option-->
                    <!--v-for="item in company"-->
                    <!--:key="item.id"-->
                    <!--:label="item.name"-->
                    <!--:value="item.id"-->
                    <!--&gt;</el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <el-col :span="8">
                        <el-form-item label="仓库：">
                            <el-select size="small" v-model="addAllot.warehouse_id_to" clearable>
                                <el-option
                                        v-for="item in enum_warehouse"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="货架：">
                            <el-autocomplete
                                    v-model="addAllot.shelf_to"
                                    :fetch-suggestions="querySearch_shelf"
                                    placeholder="请输入内容"
                                    size="mini"
                                    @select="handleSelect_shelf"
                                    clearable
                            >
                                <template slot-scope="{ item }">
                                    <div>{{ item }}</div>
                                </template>
                            </el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div v-if="profit_size!='2'">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="规格：">
                                {{standards.packsize}}
                                {{getEnumValue(units,standards.packsize_unit_id)}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="数量：">{{standards.stock}}</el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架：">{{standards.shelf}}</el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="调拨：">
                        <el-input size="small" v-model="addAllot.package_nums"></el-input>
                        <span>{{standards.virtualunit_id?virtualunits.filter(item=>{return standards.virtualunit_id == item.id})[0].name:''}}</span>
                    </el-form-item>
                </div>
                <div v-if="profit_size=='2'">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="散装库存：">
                                {{profitData.shelves?(profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0]?profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0].quantity:''):''}}
                                <span>{{profitData.shelves?base_units.filter(res=>{return profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0].quantity_unit_id==res.id})[0].name:''}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="货架：">
                                <span>{{profitData.shelves?profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0].shelf:''}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="调拨：">
                        <el-input size="small" v-model="profitData.number"></el-input>
                        <span>{{profitData.shelves?base_units.filter(res=>{return profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0].quantity_unit_id==res.id})[0].name:''}}</span>
                    </el-form-item>
                </div>
                <el-form-item>
                    <el-button
                            v-if="profit_size=='1'"
                            type="primary"
                            size="mini"
                            :loading="save_fy"
                            @click="add_allot(profitData.package_shelves.filter(i=>{return i.id==profitList.package_id})[0].quantity_unit_id,profitData.package_shelves.filter(i=>{return i.id==profitList.package_id})[0].shelf)"
                    >确定
                    </el-button>
                    <el-button
                            v-if="profit_size=='2'"
                            type="primary"
                            size="mini"
                            :loading="save_fy"
                            @click="add_allot(profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0].quantity_unit_id,profitData.shelves.filter(i=>{return i.id==profitList.package_id})[0].shelf)"
                    >确定
                    </el-button>
                    <el-button size="mini" @click="close_allot()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 补充测试 -->
        <el-dialog :visible.sync="test_Dialog" width="60%" title="补充测试">
            <el-form label-position="top" label-width="90px" class="profit_form profit_form_item">
                <el-form-item label="分析要求：">
            <span
                    v-for="i in testitems"
                    :key="i.id"
                    v-if="i.child && i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
            >
                <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
            </span><br>
            <div v-for="i in testitems" :key="i.id" v-if="i.child && i.child.length!=0" style="display: inline-block;width:50%;">
                <span>{{i.name}}</span>
                <el-checkbox
                        v-for="j in i.child"
                        :key="j.id"
                        :label="j.id"
                        v-model="j.checked"
                        @change="select()"
                        class="checkbox_nei"
                >
                <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                </el-checkbox>
            </div>
                </el-form-item>
                <el-form-item label="分析备注：">
                    <el-input type="textarea" :rows="3" size="small" v-model="addTest.note"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" :loading="save_fy" @click="add_test()">确定</el-button>
                    <el-button size="mini" @click="close_test()">取消</el-button>
                </el-form-item>
                <el-form-item label="历史记录：">
                    <table border bordercolor="#E5E5E5">
                        <tr>
                            <td rowspan="2" width='100px'>合同号</td>
                            <td rowspan="2" width='100px'>批次</td>
                            <td colspan="3">检测项</td>
                            <td rowspan="2" width='100px'>备注</td>
                            <td rowspan="2" width='100px'>所在仓库</td>
                            <td rowspan="2" width='70px'>申请时间</td>
                        </tr>
                        <tr>
                            <td width='180px'>检测项目名称</td>
                            <td width='60px;'>是否取样</td>
                            <td width='80px'>取样时间</td>
                        </tr>
                        <tr v-for="item in test_hosdata.data">
                            <td>{{item.prod?item.prod.prodno:''}}</td>
                            <td>{{item.batchno}}</td>
                            <td colspan="3" style="padding:0px;">
                                <table border bordercolor="#E5E5E5">
                                    <tr v-for="(i,index_a) in item.testitems">
                                        <td width='180px'>
                                            {{i.testitem_name}}
                                            <!-- <span v-if="i.testitem_json">
                                              :<span v-for="j in i.testitem_json">{{j.name}};</span>
                                            </span> -->
                                            <span v-if="i.testitem_json_tostring">:{{i.testitem_json_tostring}}</span>
                                        </td>
                                        <td width='60px'>{{i.sampled_at?'已取样':'待取样'}}</td>
                                        <td width='80px'>{{i.sampled_at}}</td>
                                    </tr>
                                </table>
                            </td>
                            <td>{{item.note}}</td>
                            <td>{{item.warehouse?item.warehouse.name:''}}</td>
                            <td>{{item.created_at}}</td>
                        </tr>
                    </table>
                    <el-pagination
                            v-if="test_hosdata.total"
                            @current-change="test_handleCurrentChange"
                            :current-page.sync="test_currentPage"
                            :page-size="test_hosdata.per_page"
                            layout="prev, pager, next"
                            :total="test_hosdata.total"
                    ></el-pagination>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 复检 -->
        <el-dialog :visible.sync="recheck_Dialog" width="56%" title="补充测试">
            <el-form label-position="top" label-width="90px" class="profit_form profit_form_item">
                <el-form-item label="分析要求：">
          <span v-for="i in testitems" :key="i.id" v-if="i.child.length==0" :label="i.id" style="margin:0 5px">
            <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
          </span><br>
            <div v-for="i in testitems" :key="i.id" v-if="i.child.length!=0" style="display: inline-block;width:50%;">
                <span>{{i.name}}</span>
                <el-checkbox
                        v-for="j in i.child"
                        :key="j.id"
                        :label="j.id"
                        v-model="j.checked"
                        @change="select()"
                        class="checkbox_nei"
                >
                <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                </el-checkbox>
            </div>
                </el-form-item>
                <el-form-item label="分析备注：">
                    <el-input type="textarea" :rows="3" size="small" v-model="addRecheck.note"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" :loading="save_fy" @click="add_recheck()">确定</el-button>
                    <el-button size="mini" @click="close_recheck()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 检测结果修改 -->
        <el-dialog :visible.sync="test_statusDialog" width="30%" title="检测结果修改">
            <el-form  label-width="200px" >
                <el-form-item label="检测结果：">
                    <el-select
                            v-model="test_status.order_result"
                            clearable
                            filterable
                            size="mini"
                            style="width: 100px;"
                            :placeholder="$t('quality.queryList.status')"
                    >
                        <el-option v-for="i in enums.order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="免检：">
                    <el-checkbox v-model="test_status.if_need_check" true-label="1"  false-label="0" >免检</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="mini" @click="change_status()">确定</el-button>
                    <el-button size="mini" @click="close_change_status()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                v-if="list.total"
                style="text-align: right;"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="list.per_page"
                layout="prev, pager, next"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>
<script>
    import {
        lists,
        listTotal,
        create,
        listPost,
        split_packaging_view,
        split_packaging,
        change_checked_result,
        getPreoutInfo,
        changeAppearance
    } from '@/api/inventory'
    import {getShevies, supplier_lists} from '@/api/instore'
    import $ from 'jquery'
    import {mapState} from "vuex";
    import util from "@/libs/util";
    export default {
        name: 'Warehouse-inventory1',
        data() {
            return {
                user_type:'',
                user_id:'',
                getPreoutInfo:[],
                permissions: JSON.parse(localStorage.getItem('permissions')),
                save_fy: false,
                fname: '',
                index: '',
                shelf_warehouse_id: '',
                history_list_l:{},
                list: [],
                history_list: {},
                history_list_t: {},
                profitData: {},
                test_hosdata: {},
                currentPage: 1,
                history_currentPage: 1,
                test_currentPage: 1,
                splitData: {},
                split_package_log: {},
                package: {},
                splitDialog: false,
                dialogAdd: false,
                profitDialog: false,
                profitLoss_Dialog: false,
                allot_Dialog: false,
                test_Dialog: false,
                recheck_Dialog: false,
                reviseDialog:false,
                Appearance:{
                    id:'',
                    chemprodappearance_id:''
                },
                addpackeage: {
                    inventory_id: '',
                    packages: [
                        {
                            inventory_id: '',
                            packsize: '',
                            unit_id: '',
                            packnumber: 1,
                            stock: '',
                            shelf: ''
                        }
                    ]
                },
                addAllot: {
                    package_type: '',
                    prod_id: '',
                    company_id: '',
                    warehouse_id: '',
                    company_id_to: '',
                    warehouse_id_to: '',
                    quantity: '',
                    quantity_unit: '',
                    package_nums: '',
                    inventory_id: '',
                    package_id: '',
                    shelf_to: '',
                    shelf: ''
                },
                addProfit: {
                    type: '',
                    prod_id: '',
                    package_type: '',
                    warehouse_id: '',
                    package_id: '',
                    inventory_id: '',
                    quantity: '',
                    quantity_unit: '',
                    package_nums: ''
                },
                addTest: {
                    inventory_id: '',
                    testitems: [],
                    note: ''
                },
                addRecheck: {
                    inventory_id: '',
                    testitems: [],
                    note: ''
                },
                queryList: {
                    order_result: '',
                    order_status: '',
                    flow_statuses: '',
                    if_need_check: '',
                    stock_status: 1,
                    is_sample: 2,
                    page: '1',
                    name: '',
                    cas: '',
                    batchno: '',
                    supplier_batchno: '',
                    purchaseorder_no: '',
                    warehouse_id: '',
                    started_at: '',
                    ended_at: '',
                    purchase_id: '',
                    expired_at: '',
                    supplier_id: '',
                    check_status: '',
                    prodremind: ''
                },
                profitList: {
                    page: '1',
                    inventory_shelve_id: '',
                    package_type: '',
                    package_id: '',
                    type: ''
                },
                testList: {
                    page: '1',
                    id: ''
                },
                splitList: {
                    out_inventory_shelf_id: '',
                    package_nums: '',
                    in_shelf: '',
                    prod_id: ''
                },
                profit_size: '',
                profit_size_p: '',
                standards: '',
                enum_warehouse: [],
                enum_check_result: [],
                purchaseList: [],
                country: [],
                units: [],
                virtualunits: [],
                status_info: [],
                company: [],
                base_units: [],
                testitems: [],
                enums: [],
                supply_list: [],
                ChemicalAppearance: [],
                flow_statuses:[],
                supplyloading: false,
                loading_search: false,
                test_statusDialog:false,
                salelist:[],
                test_status:{
                    id:'',
                    order_result:'',
                    if_need_check: ''
                }
            }
        },
        watch: {
            $route(to, from) {
                if (to.name === 'Warehouse-inventory1') {
                    if (this.$route.query.cas) {
                        this.queryList.cas = this.$route.query.cas
                        this.fetchData(this.$route.query.cas)
                    }
                    this.fetchData()
                }
            }
        },
        created() {
            if (this.$route.query.cas) {
                this.queryList.cas = this.$route.query.cas
                this.fetchData(this.$route.query.cas)
            }
            this.user_type=util.cookies.get('user_type')
            this.user_id=util.cookies.get('user_id')
            this.fetchData()
        },
        computed: {
            ...mapState("d2admin/user", ["info"])
        },
        methods: {
            statusClick(id,status,type){
                this.test_status.id=id
                this.test_statusDialog=true
            },
            revise(item){
                this.reviseDialog = true
                this.Appearance.chemprodappearance_id = item.chemprodappearance_id
                this.Appearance.id = item.id
            },
            change_revise(){
                changeAppearance(this.Appearance,this)
            },
            close_revise(){
                this.reviseDialog = false
                this.Appearance = {
                    id:"",
                    chemprodappearance_id:''
                }
            },
            hover_popover(item){
                if(Number(item.preout_stock)>0){
                    getPreoutInfo(item.id).then(res=>{
                        if(res.data.length>0){
                            item.getPreoutInfo = res.data
                            this.$forceUpdate()
                        }
                    })
                }
            },
            change_status(){
                change_checked_result(this.test_status,this)
            },
            supplyMethod(query) {
                if (query !== '') {
                    this.supplyloading = true
                    setTimeout(() => {
                        supplier_lists(query).then(res => {
                            this.supply_list = res.data
                            this.supplyloading = false
                        })
                    }, 200)
                } else {
                    this.supply_list = []
                }
            },
            querySearch_shelf(queryString, cb) {
                getShevies(this.addAllot.warehouse_id_to).then(res => {
                    var restaurants = []
                    for (var i in res.data) {
                        restaurants.push(res.data[i])
                    }
                    cb(restaurants)
                })
            },
            handleSelect_shelf(item) {
                this.addAllot.shelf_to = item
            },
            querySearch_split_shelf(queryString, cb) {
                getShevies(this.package.inventory.warehouse_id).then(res => {
                    var restaurants = []
                    for (var i in res.data) {
                        restaurants.push(res.data[i])
                    }
                    cb(restaurants)
                })
            },
            handleSelect_split_shelf(item) {
                this.splitList.in_shelf = item
            },
            querySearch_packe(queryString, cb) {
                getShevies(this.shelf_warehouse_id).then(res => {
                    var restaurants = []
                    for (var i in res.data) {
                        restaurants.push(res.data[i])
                    }
                    cb(restaurants)
                })
            },
            package_id(index) {
                this.index = index
            },
            handleSelect_packe(item) {
                this.addpackeage.packages[this.index].shelf = item
            },
            select() {
                this.testitems.forEach((items, index) => {
                    if (items.child && items.child.length > 0) {
                        var num = 0
                        items.child.forEach((m, n) => {
                            if (!m.checked) {
                                num++
                            }
                        })
                        if (num == items.child.length) {
                            this.$set(this.testitems[index], 'checked', false)
                        } else {
                            this.$set(this.testitems[index], 'checked', true)
                        }
                    }
                })
            },
            // select_parent () {
            //   this.testitems.forEach((items, index) => {
            //     if (items.child && items.checked === false) {
            //       items.child.forEach((m, n) => {
            //         m.checked = false
            //       })
            //     }
            //   })
            // },
            fetchData() {
                listTotal('data/user_list?user_type=101').then(res_a => {
                    this.purchaseList = res_a.data
                    if (!this.fname) {
                        this.fname = JSON.parse(JSON.stringify(this.info.name))
                        res_a.data.forEach(i => {
                            if (this.fname == i.name) {
                                this.queryList.purchase_id = i.id;
                                this.fname = 1;
                            }
                        });
                    }
                    lists(this.queryList, 'inventory_deal_list').then(res => {
                        if (this.loading_search) {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                            this.loading_search = false
                        }
                        this.list = res.data
                        this.enum_warehouse = res.enum.warehouse
                        this.enums = res.enum
                        this.flow_statuses = res.enum.flow_statuses
                        this.enum_check_result = res.enum.check_statuses
                        this.units = res.enum.units
                        obj(this.base_units, res.enum.units)
                        this.virtualunits = res.enum.virtualunits
                    }).catch(rr=>{this.loading_search = false})
                })
                this.ChemicalAppearance = this.GEnums.ChemicalAppearance;
                this.salelist = this.GEnums.Sales
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current
                this.fetchData()
            },
            history_handleCurrentChange(page_current) {
                this.profitList.page = this.history_currentPage = page_current
                lists(this.profitList, 'profit_loss_view').then(res => {
                    this.history_list = res.data.inventory_profit_loss
                })
            },
            test_handleCurrentChange(page_current) {
                this.testList.page = this.test_currentPage = page_current
                listPost(this.testList, 'sample/index').then(res => {
                    this.test_hosdata = res.data
                })
            },
            allot_handleCurrentChange(page_current) {
                this.profitList.page = this.history_currentPage = page_current
                lists(this.profitList, 'transfer_form').then(res => {
                    this.history_list = res.data.inventory_profit_loss
                })
            },
            Search() {
                this.loading_search = true
                this.queryList.page = 1
                this.currentPage = 1
                this.queryList.name = this.queryList.name.replace(/\s/g, '')
                this.queryList.cas = this.queryList.cas.replace(/\s/g, '')
                this.queryList.batchno = this.queryList.batchno.replace(/\s/g, '')
                this.queryList.purchaseorder_no = this.queryList.purchaseorder_no.replace(
                    /\s/g,
                    ''
                )
                this.fetchData()
            },
            packeClick(a, b) {
                this.shelf_warehouse_id = b.warehouse_id
                this.addpackeage.packages.forEach(i => {
                    i.unit_id = a.quantity_unit_id
                    i.shelf = a.shelf
                })
                this.dialogAdd = true
                this.addpackeage.inventory_id = a.id
            },
            save_packe() {
                this.addpackeage.packages.forEach(item => {
                    item.inventory_id = this.addpackeage.inventory_id
                })
                this.save_fy = true
                create(this.addpackeage, 'pack', 'create', this)
            },

            splitClick(a, b, c) {
                (this.splitList = {
                    out_inventory_shelf_id: '',
                    package_nums: '',
                    in_shelf: ''
                }),
                    (this.splitList.out_inventory_shelf_id = c)
                this.splitList.prod_id = a.prod_id
                this.splitDialog = true
                split_packaging_view(a.id, b, c).then(res => {
                    this.splitData = res.data.shelve.inventory
                    this.package = res.data.shelve
                    this.split_package_log = res.data.split_package_log
                })
                // lists(this.profitList, "profit_loss_view").then(res => {
                //   this.profitData = res.data.inventory;
                //   this.history_list = res.data.inventory_profit_loss;
                //   obj(this.status_info, res.enum.status_info);
                //   if (
                //     res.data.inventory.packeds &&
                //     res.data.inventory.packeds.length != 0
                //   ) {
                //     res.data.inventory.packeds.forEach(element => {
                //       if (element.id == b) {
                //         this.standards = element;
                //       }
                //     });
                //   }
                // });
            },
            save_split() {
                this.splitList.package_nums = this.splitList.package_nums
                    ? parseFloat(this.splitList.package_nums)
                    : ''
                split_packaging(this.splitList, this)
            },
            profitClick(a, b) {
                this.profit_size_p = b
                this.profitDialog = true
                this.profitList.package_type = b
                this.profitList.inventory_shelve_id = a
                this.profitList.type = 3
                lists(this.profitList, 'profit_loss_view').then(res => {
                    if (b == 1) {
                        this.standards = res.data.shelf_model
                    } else if (b == 2) {
                        this.profitData = res.data.shelf_model
                    }
                    this.history_list = res.data.inventory_profit_loss
                    obj(this.status_info, res.enum.status_info)

                    // if (res.data.inventory.packeds &&res.data.inventory.packeds.length != 0) {
                    //   res.data.inventory.packeds.forEach(element => {
                    //     if (element.id == b) {
                    //       this.standards = element;
                    //     }
                    //   });
                    // }
                })
            },
            profitLossClick(a, b) {
                this.profit_size_p = b
                this.profitList.package_type = b
                this.profitList.inventory_shelve_id = a
                this.profitList.type = 4
                lists(this.profitList, 'profit_loss_view').then(res => {
                    this.history_list_l = res.data.inventory_profit_loss
                    obj(this.status_info, res.enum.status_info)
                    if (b == 1) {
                        this.standards = res.data.shelf_model
                    } else {
                        this.profitData = res.data.shelf_model
                    }
                    this.profitLoss_Dialog = true
                })
            },
            allotClick(a, b, c) {
                this.profitList.inventory_id = a
                this.profitList.package_id = b
                this.profit_size = c
                this.allot_Dialog = true
                lists(this.profitList, 'transfer_form').then(res => {
                    this.addAllot.company_id_to = res.data.inventory.company_id
                    this.profitData = res.data.inventory
                    this.history_list_t = res.data.inventory_transfer
                    obj(this.status_info, res.enum.status_info)
                    if (this.company.length == 0) {
                        obj(this.company, res.enum.company)
                    }
                    if (
                        res.data.inventory.package_shelves &&
                        res.data.inventory.package_shelves.length != 0
                    ) {
                        res.data.inventory.package_shelves.forEach(element => {
                            if (element.id == b) {
                                this.standards = element
                            }
                        })
                    }
                })
            },
            testClick(item) {
                this.addTest.inventory_id = item.id
                var clickList = {
                    page: '1',
                    batchno: ''
                }
                clickList.batchno = item.batchno
                listPost(clickList, 'sample/history').then(res => {
                    this.test_hosdata = res.data
                    for (var i in res.enum.testitems) {
                        if (res.enum.testitems[i].child) {
                            var arr = []
                            obj(arr, res.enum.testitems[i].child)
                            res.enum.testitems[i].child = arr
                        }
                    }
                    obj(this.testitems, res.enum.testitems)
                })
                this.test_Dialog = true
            },
            recheckClick(item) {
                this.addRecheck.inventory_id = item.id
                var clickList = {
                    page: '1',
                    batchno: item.batchno
                }
                listPost(clickList, 'sample/reviewCheckForm').then(res => {
                    this.testitems = res.data.testitems
                    this.recheck_Dialog = true
                })
            },
            add_profit() {
                this.addProfit.type = 3
                if (this.profit_size_p == 1) {
                    this.addProfit.prod_id = this.standards.prod_id
                    this.addProfit.warehouse_id = this.standards.inventory
                        ? this.standards.inventory.warehouse_id
                        : ''
                    this.addProfit.inventory_id = this.standards.inventory_id
                    this.addProfit.inventory_shelve_id = this.profitList.inventory_shelve_id
                    this.addProfit.package_type = 1
                    this.addProfit.package_id = this.standards.inventorypackage_id
                    this.addProfit.quantity_unit = this.standards.packsize_unit_id
                    this.addProfit.package_nums = this.standards.number
                    this.addProfit.quantity =
                        this.standards.packsize * this.standards.number
                } else {
                    this.addProfit.prod_id = this.profitData.prod_id
                    this.addProfit.warehouse_id = this.profitData.inventory
                        ? this.profitData.inventory.warehouse_id
                        : ''
                    this.addProfit.inventory_id = this.profitData.inventory_id
                    this.addProfit.inventory_shelve_id = this.profitList.inventory_shelve_id
                    this.addProfit.package_type = 2
                    this.addProfit.package_nums = 1
                    this.addProfit.package_id = 0
                    this.addProfit.quantity_unit = this.profitData.quantity_unit_id
                    this.addProfit.quantity = this.profitData.number
                }
                this.save_fy = true
                create(this.addProfit, 'inventory', 'inventory_profit', this)
            },
            add_profitLoss() {
                this.addProfit.type = 4
                if (this.profit_size_p == 1) {
                    this.addProfit.prod_id = this.standards.prod_id
                    this.addProfit.warehouse_id = this.standards.inventory
                        ? this.standards.inventory.warehouse_id
                        : ''
                    this.addProfit.inventory_id = this.standards.inventory_id
                    this.addProfit.inventory_shelve_id = this.profitList.inventory_shelve_id
                    this.addProfit.package_type = 1
                    this.addProfit.package_id = this.standards.inventorypackage_id
                    this.addProfit.quantity_unit = this.standards.packsize_unit_id
                    this.addProfit.package_nums = this.standards.number
                    this.addProfit.quantity =
                        this.standards.packsize * this.standards.number
                    this.addProfit.reason = this.standards.reason
                } else {
                    this.addProfit.prod_id = this.profitData.prod_id
                    this.addProfit.warehouse_id = this.profitData.inventory
                        ? this.profitData.inventory.warehouse_id
                        : ''
                    this.addProfit.inventory_id = this.profitData.inventory_id
                    this.addProfit.inventory_shelve_id = this.profitList.inventory_shelve_id
                    this.addProfit.package_type = 2
                    this.addProfit.package_nums = 1
                    this.addProfit.package_id = 0
                    this.addProfit.quantity_unit = this.profitData.quantity_unit_id
                    this.addProfit.quantity = this.profitData.number
                    this.addProfit.reason = this.profitData.reason
                }
                this.save_fy = true
                create(this.addProfit, 'inventory', 'inventory_loss', this)
            },
            add_allot(quantity_unit, shelf) {
                this.addAllot.package_type = this.profit_size
                this.addAllot.prod_id = this.profitData.prod_id
                this.addAllot.company_id = this.profitData.company_id
                this.addAllot.warehouse_id = this.profitData.warehouse_id
                this.addAllot.inventory_id = this.profitData.id
                if (
                    this.profit_size == 1 &&
                    this.profitData.package_shelves.length != 0
                ) {
                    this.addAllot.quantity = (
                        this.standards.package.packsize *
                        this.standards.package.packnumber *
                        this.addAllot.package_nums
                    ).toString()
                    this.addAllot.quantity_unit = this.standards.package.unit_id
                    this.addAllot.package_id = this.profitList.package_id
                    this.addAllot.shelf = this.standards.shelf
                } else if (this.profit_size == 2) {
                    this.addAllot.package_nums = 1
                    this.addAllot.package_id = this.profitList.package_id
                    this.addAllot.quantity = (
                        this.addAllot.package_nums * this.profitData.number
                    ).toString()
                    this.addAllot.quantity_unit = quantity_unit
                    this.addAllot.shelf = shelf
                }
                this.save_fy = true
                create(this.addAllot, 'inventory', 'transfer_create', this)
            },
            add_test() {
                var testitems = JSON.parse(JSON.stringify(this.testitems))
                var arr = []
                testitems.forEach((i, j) => {
                    if (i.checked == true) {
                        arr.push(i)
                    }
                })
                arr.forEach(m => {
                    var brr = []
                    if (m.child) {
                        m.child.forEach(i => {
                            if (i.checked == true) {
                                brr.push(i)
                            }
                        })
                        m.child = brr
                    }
                })
                var object = {}
                arr.forEach((item, index) => {
                    if (item.child && item.child.length > 0) {
                        var crr = []
                        item.child.forEach(i => {
                            crr.push(i.id)
                        })
                        object[item.id] = crr
                    } else {
                        object[item.id] = []
                    }
                })
                this.addTest.testitems = JSON.parse(JSON.stringify(object))
                this.save_fy = true
                create(this.addTest, 'sample', 'extraCreate', this)
            },
            add_recheck() {
                var testitems = JSON.parse(JSON.stringify(this.testitems))
                var arr = []
                testitems.forEach((i, j) => {
                    if (i.checked == true) {
                        arr.push(i)
                    }
                })
                arr.forEach(m => {
                    var brr = []
                    if (m.child) {
                        m.child.forEach(i => {
                            if (i.checked == true) {
                                brr.push(i)
                            }
                        })
                        m.child = brr
                    }
                })
                var object = {}
                arr.forEach((item, index) => {
                    if (item.child && item.child.length > 0) {
                        var crr = []
                        item.child.forEach(i => {
                            crr.push(i.id)
                        })
                        object[item.id] = crr
                    } else {
                        object[item.id] = []
                    }
                })
                this.addRecheck.testitems = JSON.parse(JSON.stringify(object))
                this.save_fy = true
                create(this.addRecheck, 'sample', 'reviewCheck', this)
            },
            add_packe() {
                var list = {
                    inventory_id: '',
                    packsize: '',
                    unit_id: '',
                    packnumber: 1,
                    stock: '',
                    shelf: ''
                }
                list.unit_id = this.addpackeage.packages[0].unit_id
                this.addpackeage.packages.push(list)
            },
            del_packe(index) {
                this.addpackeage.packages.splice(index, 1)
            },
            close_split() {
                this.splitDialog = false;
                (this.splitList = {
                    in_shelf: '',
                    package_nums: '',
                    out_inventory_shelf_id: '',
                    prod_id: ''
                }),
                    (this.standards = '')
                this.profitData = {}
                this.status_info = []
                this.profit_size = ''
            },
            close_packe() {
                this.dialogAdd = false
                this.addpackeage = {
                    id: '',
                    packages: [
                        {
                            inventory_id: '',
                            packsize: '',
                            unit_id: '',
                            packnumber: 1,
                            stock: '',
                            shelf: ''
                        }
                    ]
                }
            },
            close_profit() {
                this.profitDialog = false
                this.standards = ''
                this.profitData = {}
                this.profit_size = ''
                this.history_list = ''
            },
            close_profitLoss() {
                this.profitLoss_Dialog = false
                this.standards = ''
                this.profitData = {};
                (this.profit_size = ''), (this.history_list_l = '')
            },
            close_allot() {
                this.allot_Dialog = false
                this.standards = ''
                this.profitData = {}
                this.history_list = ''
                this.profit_size = ''
                this.addAllot = {
                    package_type: '',
                    prod_id: '',
                    company_id: '',
                    warehouse_id: '',
                    company_id_to: '',
                    warehouse_id_to: '',
                    quantity: '',
                    quantity_unit: '',
                    package_nums: '',
                    inventory_id: '',
                    package_id: '',
                    shelf: '',
                    shelf_to: ''
                }
            },
            close_test() {
                this.test_Dialog = false
                this.testitems = []
                this.addTest = {
                    inventory_id: '',
                    testitems: [],
                    note: ''
                }
            },
            close_recheck() {
                this.recheck_Dialog = false
                this.testitems = []
                this.addRecheck = {
                    inventory_id: '',
                    testitems: [],
                    note: ''
                }
            },
            close_change_status(){
                this.test_statusDialog=false,
                this.test_status={
                    id:'',
                    order_result:'',
                    if_need_check: ''
                }
            },
            print(item,item_i) {
                let data = {
                    批号: item.batchno,
                    外观: this.getEnumValue(this.ChemicalAppearance,item.chemprodappearance_id)? this.getEnumValue(this.ChemicalAppearance,item.chemprodappearance_id):item.characterinfo,
                    数量: item_i.quantity + this.getEnumValue(this.units, item_i.quantity_unit_id),
                    货架: item_i.shelf,
                    CAS: item.cas,
                    id: item.batchno,
                    configID: 1
                };
                $.ajax({
                    url: "http://127.0.0.1:8080/mac/codePrint.jsp",
                    method: "post",
                    data: data,
                    success: function (res) {
                        if (res && res.code == 0) {
                            this.$message({
                                message: "success",
                                type: "success"
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    },
                    error: function () {
                    },
                });
            },
        }
    }

    function obj(arr, object) {
        if (arr.length == 0) {
            for (let i in object) {
                arr.push(object[i])
            }
        }
    }
</script>
