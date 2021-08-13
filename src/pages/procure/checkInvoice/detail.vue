<template>
    <d2-container>
        <div class="top">
            <el-input
                    v-model="queryList.id"
                    placeholder="ID"
                    clearable
                    size="mini"
                    style="width: 100px;margin: 0 2px;"
            ></el-input>
            <el-select
                    v-model="queryList.hexiao_status"
                    filterable
                    placeholder="核销状态"
                    style="width:140px;"
                    clearable
                    size="mini"
            >
                <el-option v-for="(item,key,index) in hexiao_status" :label="item" :key="key" :value="key"></el-option>
            </el-select>
            <el-input
                    v-model="queryList.amount"
                    placeholder="总金额"
                    clearable
                    size="mini"
                    style="width: 100px;margin: 0 2px;"
            ></el-input>
            <el-input
                    v-model="queryList.prod_name"
                    placeholder="产品名称"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-input
                    v-model="queryList.invoice_number"
                    placeholder="发票号"
                    clearable
                    size="mini"
                    style="width: 100px;margin: 0 2px;"
            ></el-input>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.scan_time_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="扫描开始日期"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
            ></el-date-picker>
            -
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.scan_time_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="扫描结束日期"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
            ></el-date-picker>
            <el-input
                    v-model="queryList.seller_name"
                    placeholder="销方名称"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-select
                    v-model="queryList.purchaser_name"
                    placeholder="购方名称"
                    filterable
                    clearable
                    size="mini"
                    style="width: 200px;margin:4px 2px;"
            >
                <el-option v-for="(item,key,index) in enums.purchaser_names" :label="key" :key="index" :value="key"></el-option>
            </el-select>
            <el-button type="primary" :loading="loading_search" @click="search" size="mini" style="margin:4px 2px;">搜索
            </el-button>
            <el-button type="info" @click="back" size="mini" style="margin: 4px 2px;">返回
            </el-button>
        </div>
        <el-table
                :data="list.data"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                style="font-size: 12px;"
        >
            <el-table-column label="ID" width="50">
                <template slot-scope="scope">{{scope.row.id}}
                    <el-badge v-if="scope.row.is_hongzi==1"  value="红" class="item"></el-badge>
                </template>
            </el-table-column>
            <el-table-column label="销方名称" width="140">
                <template slot-scope="scope">{{scope.row.seller_name}}</template>
            </el-table-column>
            <el-table-column label="购方名称" width="140">
                <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
            </el-table-column>
            <el-table-column label="发票号码">
                <template slot-scope="scope">{{scope.row.invoice_number}}</template>
            </el-table-column>
            <!--<el-table-column label="开票日期">-->
                <!--<template slot-scope="scope">{{scope.row.invoice_date.split(' ')[0]}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="扫描时间" width="100">
                <template slot-scope="scope">{{scope.row.scan_time.split(' ')[0]}}</template>
            </el-table-column>
            <!--<el-table-column label="开票金额">-->
                <!--<template slot-scope="scope">{{scope.row.total}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="产品名称" width="140">
                <template slot-scope="scope">{{scope.row.prod_name}}</template>
            </el-table-column>
            <el-table-column label="产品规格">
                <template slot-scope="scope">{{scope.row.prod_model}}</template>
            </el-table-column>
            <el-table-column label="产品单位">
                <template slot-scope="scope">{{scope.row.prod_unit}}</template>
            </el-table-column>
            <el-table-column label="产品数量" width="80">
                <template slot-scope="scope">{{scope.row.prod_num}}</template>
            </el-table-column>
            <el-table-column label="不含税金额">
                <template slot-scope="scope">{{scope.row.amount_excluding_tax}}</template>
            </el-table-column>
            <el-table-column label="税率" width="60">
                <template slot-scope="scope">{{scope.row.tax_rate}}</template>
            </el-table-column>
            <!--<el-table-column label="税额">-->
                <!--<template slot-scope="scope">{{scope.row.amount_tax_amount}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="总金额">
                <template slot-scope="scope">{{scope.row.amount}}</template>
            </el-table-column>
            <el-table-column label="核销状态">
                <template slot-scope="scope">{{hexiao_status[scope.row.hexiao_status]}}</template>
            </el-table-column>
            <el-table-column label="已核销金额">
                <template slot-scope="scope">{{scope.row.hexiao_amount}}</template>
            </el-table-column>
            <el-table-column label="未核销金额">
                 <template slot-scope="scope">{{scope.row.hexiao_amount_leave}}</template>
            </el-table-column>
            <el-table-column label="备注" width="140">
                <template slot-scope="scope" >
                    <span style="width: 100%;height: 37px;line-height: 37px;display: inline-block;" @click="edit(scope.row)">
                        <span style="width: 100%;display: inline-block;" v-if="scope.row.oldNote&&!scope.row.edit" >{{scope.row.note}}</span>
                        <!--<el-input-->
                                <!--style="height:37px"-->
                                <!--v-if="scope.row.edit"-->
                                <!--v-model="scope.row.note"-->
                                <!--clearable-->
                                <!--size="mini"-->
                                <!--@blur="saveNote(scope.row.id,scope.row.note)"-->
                        <!--&gt;</el-input>-->
                        <input  v-focus
                                class="input"
                                v-if="scope.row.edit"
                                v-model="scope.row.note"
                                @blur="saveNote(scope.row.id,scope.row.note)"
                                v-focus
                                type="text">
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" v-if="scope.row.hexiao_status!=1&&scope.row.is_hongzi!=1" @click="match(scope.row)"
                    >匹配
                    </el-button>
                    <el-button size="mini" type="danger" :loading="scope.row.cancelLoading" v-if="(scope.row.hexiao_status===1||scope.row.hexiao_status===2)&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'&&scope.row.is_hongzi!=1" @click="cancel(scope.row)"
                >取消
                </el-button>
                <el-button size="mini" type="warning" v-if="scope.row.hexiao_status==1&&scope.row.is_hongzi!=1" @click="match(scope.row)"
                >查看
                </el-button>
                <el-button size="mini" type="danger" v-if="scope.row.hexiao_status==0&&scope.row.amount>0&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'&&scope.row.is_hongzi!=1" @click="setRed(scope.row.id)"
                >设红字
                </el-button>
                    <el-button size="mini" type="danger" v-if="scope.row.hexiao_status==1&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'&&scope.row.is_hongzi==1" @click="cancelRed(scope.row.id)"
                    >取消红字
                    </el-button>
</template>
            </el-table-column>
        </el-table>
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                :page-sizes="[10,20,50,100]"
                :page-size="10"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="total,sizes,prev, pager, next"
                :total="list.total"
        ></el-pagination>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="90%"
                :before-close="handleClose"
        >
            <div ref="canvas" id="canvas" style="background: white;">
                <el-table
                        :data="matchData"
                        element-loading-text="Loading"
                        border
                        fit
                        highlight-current-row
                        style="font-size: 12px;"
                >
                    <el-table-column label="ID" width="50">
                        <template slot-scope="scope">{{scope.row.id}}</template>
                    </el-table-column>
                    <el-table-column label="销方名称" width="200">
                        <template slot-scope="scope">{{scope.row.seller_name}}</template>
                    </el-table-column>
                    <el-table-column label="购方名称" width="200">
                        <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
                    </el-table-column>
                    <el-table-column label="发票号码">
                        <template slot-scope="scope">{{scope.row.invoice_number}}</template>
                    </el-table-column>
                    <el-table-column label="产品名称" width="160">
                        <template slot-scope="scope">{{scope.row.prod_name}}</template>
                    </el-table-column>
                    <el-table-column label="产品规格">
                        <template slot-scope="scope">{{scope.row.prod_model}}</template>
                    </el-table-column>
                    <el-table-column label="产品单位">
                        <template slot-scope="scope">{{scope.row.prod_unit}}</template>
                    </el-table-column>
                    <el-table-column label="产品数量">
                        <template slot-scope="scope">{{scope.row.prod_num}}</template>
                    </el-table-column>
                    <el-table-column label="税率">
                        <template slot-scope="scope">{{scope.row.tax_rate}}</template>
                    </el-table-column>
                    <el-table-column label="标准单价">
                        <template slot-scope="scope">{{scope.row.base_price}}</template>
                    </el-table-column>
                    <el-table-column label="总金额">
                        <template slot-scope="scope">{{scope.row.amount}}</template>
                    </el-table-column>
                    <el-table-column label="未核销金额">
                        <template slot="header" slot-scope="scope">
                            <span v-red>未核销金额</span>
                        </template>
                        <template slot-scope="scope"><span v-red>{{scope.row.hexiao_amount_leave}}</span></template>
                    </el-table-column>
                </el-table>
                <div v-if="amount>0">
                <div class="top">
                    <el-button type="success" v-if="permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'" :loading="loading_search" @click="hexiaoMore" size="mini" style="margin: 0 2px;">批量核销
                    </el-button>
                    <el-input
                            v-model="queryList_match.contract_number"
                            placeholder="合同编号"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-date-picker
                            class="date_picker"
                            v-model="queryList.date_start"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="合同开始日期"
                            style="width:130px;margin: 0 2px;"
                            size="mini"
                    ></el-date-picker>
                    -
                    <el-date-picker
                            class="date_picker"
                            v-model="queryList_match.date_end"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="合同结束日期"
                            style="width:130px;margin: 0 2px;"
                            size="mini"
                    ></el-date-picker>
                    <el-input
                            v-model="queryList_match.cas"
                            placeholder="CAS"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-input
                            v-model="queryList_match.base_name"
                            placeholder="产品名称"
                            clearable
                            size="mini"
                            style="width: 200px;margin: 0 2px;"
                    ></el-input>
                    <el-input
                            v-model="queryList_match.base_price"
                            placeholder="标准单价"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-input
                            v-model="queryList_match.total_price"
                            placeholder="总金额"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-select
                            v-model="queryList_match.purchase_user_id"
                            filterable
                            placeholder="采购人员"
                            style="width:140px;"
                            clearable
                            size="mini"
                    >
                        <el-option v-for="(item,key,index) in GEnums.Purchases" :label="item.name" :key="key" :value="key"></el-option>
                    </el-select>
                    <el-input
                            v-model="queryList_match.sku_no"
                            placeholder="货号"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-input
                            v-model="queryList_match.tax_rate"
                            placeholder="税率"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-select
                            v-model="queryList_match.hexiao_flag"
                            filterable
                            placeholder="核销状态"
                            style="width:100px;"
                            clearable
                            size="mini"
                    >
                        <el-option  label="已核销"  :value="1"></el-option>
                        <el-option  label="待核销"  :value="0"></el-option>
                    </el-select>
                    <el-input
                            v-model="queryList_match.package_no"
                            placeholder="包编号"
                            clearable
                            size="mini"
                            style="width: 100px;margin: 0 2px;"
                    ></el-input>
                    <el-button type="primary" :loading="loading_search_match" @click="search_match" size="mini" style="margin: 0 2px;">搜索
                    </el-button>

                </div>
                    <el-table

                            :data="list_match.data"
                            element-loading-text="Loading"
                            border
                            fit
                            highlight-current-row
                            @selection-change="handleSelectionChange"

                            style="font-size: 12px;"
                    >
                        <el-table-column
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column label="合同编号" width="140">
                            <template slot-scope="scope">{{scope.row.procurement_contract_number}}</template>
                        </el-table-column>
                        <el-table-column label="合同时间" width="100">
                            <template slot-scope="scope">{{scope.row.contract_date}}</template>
                        </el-table-column>
                        <el-table-column label="CAS" width="120">
                            <template slot-scope="scope">
                                <el-popover
                                        class="popover"
                                        placement="bottom"
                                        trigger="click"
                                        :content="casNames">
                                    <span slot="reference" class="pointer" @click="getCasNames(scope.row.cas)">{{scope.row.cas}}</span>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="产品名称">
                            <template slot-scope="scope">{{scope.row.name_cn}}</template>
                        </el-table-column>
                        <el-table-column label="货号" width="100">
                            <template slot-scope="scope">{{scope.row.sku_no}}</template>
                        </el-table-column>
                        <el-table-column label="标准单价" width="100">
                            <template slot-scope="scope">{{scope.row.base_price}}</template>
                        </el-table-column>
                        <el-table-column label="采购数量" width="100">
                            <template slot-scope="scope">{{scope.row.base_quantity}}{{getEnumValue(units,scope.row.storage_quantity_unit)}}</template>
                        </el-table-column>
                        <el-table-column label="合同金额" width="100">
                            <template slot-scope="scope">{{scope.row.total_price}}</template>
                        </el-table-column>
                        <el-table-column label="未核销金额" width="100">
                            <template slot-scope="scope">{{scope.row.hexiao_amount_leave}}</template>
                        </el-table-column>
                        <el-table-column label="发票类型" width="80">
                            <template slot-scope="scope"><span>{{scope.row.invoice_type}}</span></template>
                        </el-table-column>

                        <el-table-column label="已核销发票" width="100">
                            <template slot-scope="scope">
                                <p v-for="it,ii in scope.row.invoice" :key="ii">
                                    {{it.invoice_number}}
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="采购人员" width="80">
                            <template slot-scope="scope">{{scope.row.purchase_name}}</template>
                        </el-table-column>
                        <el-table-column label="操作"  width="150">
                            <template slot-scope="scope" >
                                <el-button v-if="scope.row.hexiao_status!=1&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'"  size="mini" type="primary" :loading="scope.row.loading" @click="Hexiao(scope.row)"
                                >核销
                                </el-button>
                                <el-button v-if="scope.row.hexiao_status==1&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'&&matchData[0].hexiao_amount_leave<0"  size="mini" type="primary" :loading="scope.row.loadingRed" @click="Hexiao(scope.row)"
                                >红字核销
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="total"><span>{{base_quantity}}</span><span>{{total_price}}</span><span>{{hexiao_amount_leave}}</span></div>
                    <el-row>
                        <el-col :span="12"> <el-button type="primary" :loading="loading_picture"  @click="clickGeneratePicture" size="mini" style="margin: 0 2px;">截图发钉钉
                        </el-button></el-col>
                        <el-col :span="12"><el-pagination
                                style="text-align: right;margin-top:10px;"
                                background
                                :page-sizes="[10,20,50,100]"
                                :page-size="10"
                                @size-change="handleSizeChange_match"
                                @current-change="handleCurrentChange_match"
                                :current-page.sync="currentPage_match"
                                layout="total,sizes,prev, pager, next"
                                :total="list_match.total"
                        ></el-pagination></el-col>
                    </el-row>
                </div>
                <div v-else>
                    <div class="top">
                        <el-input
                                v-model="queryRedList.invoice_number"
                                placeholder="发票号"
                                clearable
                                size="mini"
                                style="width: 200px;margin: 0 2px;"
                        ></el-input>
                        <el-input
                                v-model="queryRedList.prod_name"
                                placeholder="产品名称"
                                clearable
                                size="mini"
                                style="width: 200px;margin: 0 2px;"
                        ></el-input>
                        <el-input
                                v-model="queryRedList.amount"
                                placeholder="总金额"
                                clearable
                                size="mini"
                                style="width: 200px;margin: 0 2px;"
                        ></el-input>
                        <el-select
                                v-model="queryRedList.hexiao_flag"
                                filterable
                                placeholder="核销状态"
                                style="width:100px;"
                                clearable
                                size="mini"
                        >
                            <el-option  label="已核销"  :value="1"></el-option>
                            <el-option  label="待核销"  :value="0"></el-option>
                        </el-select>
                        <el-button type="primary" :loading="loading_search_red" @click="searchRed" size="mini" style="margin: 0 2px;">搜索
                        </el-button>
                    </div>
                    <el-table
                            :data="InvoiceList.data"
                            element-loading-text="Loading"
                            border
                            fit
                            highlight-current-row
                            style="font-size: 12px;"
                    >
                        <el-table-column label="ID" width="50">
                            <template slot-scope="scope">{{scope.row.id}}
                            </template>
                        </el-table-column>
                        <el-table-column label="销方名称" width="140">
                            <template slot-scope="scope">{{scope.row.seller_name}}</template>
                        </el-table-column>
                        <el-table-column label="购方名称" width="140">
                            <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
                        </el-table-column>
                        <el-table-column label="发票号码">
                            <template slot-scope="scope">{{scope.row.invoice_number}}</template>
                        </el-table-column>
                        <!--<el-table-column label="开票日期">-->
                        <!--<template slot-scope="scope">{{scope.row.invoice_date.split(' ')[0]}}</template>-->
                        <!--</el-table-column>-->
                        <el-table-column label="扫描时间" width="100">
                            <template slot-scope="scope">{{scope.row.scan_time.split(' ')[0]}}</template>
                        </el-table-column>
                        <!--<el-table-column label="开票金额">-->
                        <!--<template slot-scope="scope">{{scope.row.total}}</template>-->
                        <!--</el-table-column>-->
                        <el-table-column label="产品名称" width="140">
                            <template slot-scope="scope">{{scope.row.prod_name}}</template>
                        </el-table-column>
                        <el-table-column label="产品规格">
                            <template slot-scope="scope">{{scope.row.prod_model}}</template>
                        </el-table-column>
                        <el-table-column label="产品单位">
                            <template slot-scope="scope">{{scope.row.prod_unit}}</template>
                        </el-table-column>
                        <el-table-column label="产品数量" width="80">
                            <template slot-scope="scope">{{scope.row.prod_num}}</template>
                        </el-table-column>
                        <el-table-column label="不含税金额">
                            <template slot-scope="scope">{{scope.row.amount_excluding_tax}}</template>
                        </el-table-column>
                        <el-table-column label="税率" width="60">
                            <template slot-scope="scope">{{scope.row.tax_rate}}</template>
                        </el-table-column>
                        <!--<el-table-column label="税额">-->
                        <!--<template slot-scope="scope">{{scope.row.amount_tax_amount}}</template>-->
                        <!--</el-table-column>-->
                        <el-table-column label="总金额">
                            <template slot-scope="scope">{{scope.row.amount}}</template>
                        </el-table-column>
                        <el-table-column label="核销状态">
                            <template slot-scope="scope">{{enumsRed.hexiao_status[scope.row.hexiao_status]}}</template>
                        </el-table-column>
                        <el-table-column label="备注" width="140">
                            <template slot-scope="scope" >
                        <span style="width: 100%;height: 37px;line-height: 37px;display: inline-block;" @click="edit(scope.row)">
                            <span style="width: 100%;display: inline-block;" v-if="scope.row.oldNote&&!scope.row.edit" >{{scope.row.note}}</span>
                            <!--<el-input-->
                            <!--style="height:37px"-->
                            <!--v-if="scope.row.edit"-->
                            <!--v-model="scope.row.note"-->
                            <!--clearable-->
                            <!--size="mini"-->
                            <!--@blur="saveNote(scope.row.id,scope.row.note)"-->
                            <!--&gt;</el-input>-->
                            <input  v-focus
                                    class="input"
                                    v-if="scope.row.edit"
                                    v-model="scope.row.note"
                                    @blur="saveNote(scope.row.id,scope.row.note)"
                                    v-focus
                                    type="text">
                        </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" fixed="right" width="150">
                            <template slot-scope="scope">
                                <el-button v-if="scope.row.hexiao_status!=1&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'"  size="mini" type="primary" :loading="scope.row.loading" @click="HexiaoRed(scope.row)"
                                >核销
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            style="text-align: right;margin-top:10px;"
                            background
                            :page-sizes="[10,20,50,100]"
                            :page-size="10"
                            @size-change="handleSizeChangeRed"
                            @current-change="handleCurrentChangeRed"
                            :current-page.sync="currentPageRed"
                            layout="total,sizes,prev, pager, next"
                            :total="InvoiceList.total"
                    ></el-pagination>
                    <div class="top">
                        <el-button type="success" v-if="permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'" :loading="loading_search" @click="hexiaoMore" size="mini" style="margin: 0 2px;">批量核销
                        </el-button>
                        <el-input
                                v-model="queryList_match.contract_number"
                                placeholder="合同编号"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-date-picker
                                class="date_picker"
                                v-model="queryList.date_start"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="合同开始日期"
                                style="width:130px;margin: 0 2px;"
                                size="mini"
                        ></el-date-picker>
                        -
                        <el-date-picker
                                class="date_picker"
                                v-model="queryList_match.date_end"
                                value-format="yyyy-MM-dd"
                                type="date"
                                placeholder="合同结束日期"
                                style="width:130px;margin: 0 2px;"
                                size="mini"
                        ></el-date-picker>
                        <el-input
                                v-model="queryList_match.cas"
                                placeholder="CAS"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-input
                                v-model="queryList_match.base_name"
                                placeholder="产品名称"
                                clearable
                                size="mini"
                                style="width: 200px;margin: 0 2px;"
                        ></el-input>
                        <el-input
                                v-model="queryList_match.base_price"
                                placeholder="标准单价"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-input
                                v-model="queryList_match.total_price"
                                placeholder="总金额"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-select
                                v-model="queryList_match.purchase_user_id"
                                filterable
                                placeholder="采购人员"
                                style="width:140px;"
                                clearable
                                size="mini"
                        >
                            <el-option v-for="(item,key,index) in GEnums.Purchases" :label="item.name" :key="key" :value="key"></el-option>
                        </el-select>
                        <el-input
                                v-model="queryList_match.sku_no"
                                placeholder="货号"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-input
                                v-model="queryList_match.tax_rate"
                                placeholder="税率"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-select
                                v-model="queryList_match.hexiao_flag"
                                filterable
                                placeholder="核销状态"
                                style="width:100px;"
                                clearable
                                size="mini"
                        >
                            <el-option  label="已核销"  :value="1"></el-option>
                            <el-option  label="待核销"  :value="0"></el-option>
                        </el-select>
                        <el-input
                                v-model="queryList_match.package_no"
                                placeholder="包编号"
                                clearable
                                size="mini"
                                style="width: 100px;margin: 0 2px;"
                        ></el-input>
                        <el-button type="primary" :loading="loading_search_match" @click="search_match" size="mini" style="margin: 0 2px;">搜索
                        </el-button>

                    </div>
                    <el-table
                            :data="list_match.data"
                            element-loading-text="Loading"
                            border
                            fit
                            highlight-current-row
                            @selection-change="handleSelectionChange"

                            style="font-size: 12px;"
                    >
                        <el-table-column
                                type="selection"
                                width="40">
                        </el-table-column>
                        <el-table-column label="合同编号" width="140">
                            <template slot-scope="scope">{{scope.row.procurement_contract_number}}</template>
                        </el-table-column>
                        <el-table-column label="合同时间" width="100">
                            <template slot-scope="scope">{{scope.row.contract_date}}</template>
                        </el-table-column>
                        <el-table-column label="CAS" width="120">
                            <template slot-scope="scope">
                                <el-popover
                                        class="popover"
                                        placement="bottom"
                                        trigger="click"
                                        :content="casNames">
                                    <span slot="reference" class="pointer" @click="getCasNames(scope.row.cas)">{{scope.row.cas}}</span>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="产品名称">
                            <template slot-scope="scope">{{scope.row.name_cn}}</template>
                        </el-table-column>
                        <el-table-column label="货号" width="100">
                            <template slot-scope="scope">{{scope.row.sku_no}}</template>
                        </el-table-column>
                        <el-table-column label="标准单价" width="100">
                            <template slot-scope="scope">{{scope.row.base_price}}</template>
                        </el-table-column>
                        <el-table-column label="采购数量" width="100">
                            <template slot-scope="scope">{{scope.row.base_quantity}}{{getEnumValue(units,scope.row.storage_quantity_unit)}}</template>
                        </el-table-column>
                        <el-table-column label="合同金额" width="100">
                            <template slot-scope="scope">{{scope.row.total_price}}</template>
                        </el-table-column>
                        <el-table-column label="未核销金额" width="100">
                            <template slot-scope="scope">{{scope.row.hexiao_amount_leave}}</template>
                        </el-table-column>
                        <el-table-column label="发票类型" width="80">
                            <template slot-scope="scope"><span>{{scope.row.invoice_type}}</span></template>
                        </el-table-column>

                        <el-table-column label="已核销发票" width="100">
                            <template slot-scope="scope">
                                <p v-for="it,ii in scope.row.invoice" :key="ii">
                                    {{it.invoice_number}}
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column label="采购人员" width="80">
                            <template slot-scope="scope">{{scope.row.purchase_name}}</template>
                        </el-table-column>
                        <el-table-column label="操作"  width="150">
                            <template slot-scope="scope" >
                                <el-button v-if="scope.row.hexiao_status!=1&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'"  size="mini" type="primary" :loading="scope.row.loading" @click="Hexiao(scope.row)"
                                >核销
                                </el-button>
                                <el-button v-if="scope.row.hexiao_status==1&&permission_names['PuInvoiceHexiao']==='PuInvoiceHexiao'&&matchData[0].hexiao_amount_leave<0"  size="mini" type="primary" :loading="scope.row.loadingRed" @click="Hexiao(scope.row)"
                                >红字核销
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="total"><span>{{base_quantity}}</span><span>{{total_price}}</span><span>{{hexiao_amount_leave}}</span></div>
                    <el-pagination
                            style="text-align: right;margin-top:10px;"
                            background
                            :page-sizes="[10,20,50,100]"
                            :page-size="10"
                            @size-change="handleSizeChange_match"
                            @current-change="handleCurrentChange_match"
                            :current-page.sync="currentPage_match"
                            layout="total,sizes,prev, pager, next"
                            :total="list_match.total"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>
    </d2-container>
</template>

<script>
    import Big from "@/big/a/big.mjs";
    import html2canvas from "html2canvas"
    import {getInvoiceDetail,getContractDetails,doHexiao,doCancelHexiaoDetail,updateDetailNote,getCasNames,doSetHongzi,hongziList,doHexiaoHongzi,sendDingTalk} from "@/api/procure"
    import util from "@/libs/util";
    function polling(data,delay = 10000) {
        return new Promise((resolve, reject) =>{
            doHexiao(data).then(res => {
                if (res.code &&res.code==0) {  // 这个继续进行轮询的条件，需要根据自己的需要修改
                    setTimeout(() => {
                        resolve(polling(data,delay));
                    }, delay)
                } else {
                    resolve(res);
                }
            })
        })
    }
    export default {
        name: "procure-checkInvoiceDetail",
        components: {
            html2canvas
        },
        data() {
            return {
                list:[],
                list_match:[],
                matchData:[],
                InvoiceList:[],
                currentPage: 1,
                currentPage_match: 1,
                currentPageRed:1,
                queryList:{
                    page:'1',
                    per_page: 10,
                    id:'',
                    invoice_number:'',
                    hexiao_status:'',
                    amount:'',
                    prod_name:'',
                    scan_time_start:'',
                    scan_time_end:'',
                    seller_name:'',
                    purchaser_name:''
                },
                queryList_match:{
                    page:'',
                    contract_number:'',
                    date_start:'',
                    date_end:'',
                    cas:'',
                    purchase_user_id:'',
                    base_name:'',
                    base_price:'',
                    total_price:'',
                    purchaser_name:'',
                    seller_name:'',
                    tax_rate:'',
                    sku_no:'',
                    hexiao_flag:0,
                    package_no:''
                },
                queryRedList: {
                    page: "1",
                    per_page: 10,
                    invoice_number:'',
                    prod_name:'',
                    amount:'',
                    hexiao_flag:0
                },
                hexiao_status:{},
                multipleSelection:[],
                InvoiceInfo:{},
                units:{},
                loading_search:false,
                loading_search_match:false,
                loading_picture:false,
                loading_search_red:false,
                dialogVisible:false,
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                casNames:'',
                loadingRed:false,
                base_quantity:'',
                total_price:'',
                hexiao_amount_leave:'',
                amount:'',
                start:new Date().getTime(),
                enumsRed:{},
                enums:{}
            }
        },
        created() {
            this.queryList.invoice_number=this.$route.query.invoice_number
            this.queryList.seller_name=this.$route.query.seller_name
            this.queryList.purchaser_name=this.$route.query.purchaser_name
            this.queryList_match.tax_rate=this.$route.query.rate
            if(this.$route.query.hexiao_status){
                this.queryList.hexiao_status=this.$route.query.hexiao_status
            }
            this.fetchData()
        },
        watch: {
            $route(to, from) {
                this.queryList.invoice_number=this.$route.query.invoice_number
                this.queryList.seller_name=this.$route.query.seller_name
                this.queryList.purchaser_name=this.$route.query.purchaser_name
                this.queryList_match.tax_rate=this.$route.query.rate
                if(this.$route.query.hexiao_status){
                    this.queryList.hexiao_status=this.$route.query.hexiao_status
                }
                this.fetchData()
            }
        },
        methods: {
            back(){
                this.$router.push({
                    path:'/procure/checkInvoice'
                })
            },
            fetchData() {
                this.loading_search=true
                getInvoiceDetail(this.queryList).then(res => {
                    this.loading_search=false
                    if (res && res.code == 0) {
                        res.data.data.forEach(res=>{
                            res.cancelLoading=false
                            res.edit=false
                            res.oldNote=JSON.parse(JSON.stringify(res.note))
                        })
                        this.list = res.data
                        this.hexiao_status=res.enum.hexiao_status
                        this.enums=res.enum
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_search=false
                    }
                }).catch(rr => {
                    this.loading_search=false
                })
            },
            setRed(id){
                doSetHongzi({id:id,is_hongzi:1}).then(res=>{
                    if(res&&res.code===0){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            cancelRed(id){
                doSetHongzi({id:id,is_hongzi:0}).then(res=>{
                    if(res&&res.code===0){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            HexiaoRed(item){
                item.loading=true
                doHexiaoHongzi({invoice_detail_id:this.matchData[0].id,list_id:item.id}).then(res=>{
                    if(res&&res.code===0){
                        item.loading=false
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchDataRed()
                    }else{
                        item.loading=false
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(r=>{
                    item.loading=false
                })
            },
            getCasNames(cas){
                this.casNames=''
                getCasNames({cas:cas}).then(res=>{
                     if(res&&res.code==0){
                         res.data.forEach(item=>{
                             this.casNames+=item+'\n'
                         })
                     }
                })
            },
            edit(item){
                item.edit=true
                this.$forceUpdate()
            },
            saveNote(id,note){
                updateDetailNote({id,note}).then(res=>{
                    if(res&&res.code===0){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(error=>{
                    this.$message({
                        message: error.msg,
                        type: 'error'
                    })
                })
            },
            match(item){
                this.amount=item.amount
                this.matchData=[]
                this.list_match=[]
                this.matchData.push(item)
                this.queryList_match={
                    page:'',
                    contract_number:'',
                    date_start:'',
                    date_end:'',
                    cas:'',
                    // purchase_user_id: util.cookies.get("user_id"),
                    purchase_user_id:'',
                    base_name:'',
                    base_price:item.base_price,
                    package_no:item.package_no,
                    total_price:'',
                    purchaser_name:item.purchaser_name,
                    seller_name:item.seller_name,
                    sku_no:'',
                    hexiao_flag:0
                }
                if(this.amount>0){
                    this.loading_search_match=true
                    getContractDetails(this.queryList_match).then(res => {
                        this.loading_search_match=false
                        if (res && res.code == 0) {
                            res.data.data.forEach(res=>{
                                res.loading=false,
                                    res.loadingRed=false
                            })
                            this.list_match = res.data
                            this.hexiao_status=res.enum.hexiao_status
                            this.InvoiceInfo=res.enum.InvoiceInfo
                            this.units=res.enum.units
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    }).catch(rr => {
                    })
                }else{
                    this.loading_search_match=true
                    this.queryRedList.amount=Math.abs(this.matchData[0].amount)
                    getContractDetails(this.queryList_match).then(res => {
                        this.loading_search_match=false
                        if (res && res.code == 0) {
                            res.data.data.forEach(res=>{
                                res.loading=false,
                                    res.loadingRed=false
                            })
                            this.list_match = res.data
                            this.hexiao_status=res.enum.hexiao_status
                            this.InvoiceInfo=res.enum.InvoiceInfo
                            this.units=res.enum.units
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    }).catch(rr => {
                    })
                    hongziList(this.queryRedList).then(res => {
                        if (res && res.code == 0) {
                            res.data.data.forEach(item=>{
                                item.loading=false
                            })
                            this.InvoiceList = res.data
                            this.enumsRed=res.enum
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    }).catch(rr => {
                    })
                }
                this.dialogVisible=true
            },
            clickGeneratePicture() {
                this.loading_picture=true
                var box = document.getElementById("canvas");
                html2canvas(box, {
                    backgroundColor: "#142E48"
                })
                    .then(canvas => {
                        let dataURL = canvas.toDataURL("image/png");
                        this.dataURL = dataURL;
                        let ids=[];
                        let names=[];
                        this.list_match.data.forEach(item=>{
                            ids.push(item.id)
                            names.push(item.purchase_name)
                        })
                        let obj={
                            picture:dataURL,
                            invoice_number:this.matchData[0].invoice_number,
                            item_id:this.matchData[0].id,
                            contract_ids:ids,
                            names:names
                        }
                        sendDingTalk(obj).then(res=>{
                            if(res&&res.code==0){
                                this.loading_picture=false
                                this.$message({
                                    message: res.msg,
                                    type: "success"
                                });
                            }else{
                                this.loading_picture=false
                                this.$message({
                                    message: res.msg,
                                    type: "error"
                                });
                            }
                        }).catch(r=>{
                            this.loading_picture=false
                        })
                        // let creatDom = document.createElement("a");
                        // document.body.appendChild(creatDom);
                        // creatDom.href = dataURL;
                        // creatDom.download = "这是刚刚的截图";
                        // creatDom.click();
                    })
                    .catch(err => {
                        this.loading_picture=false
                        this.$message({
                            message: "图片生成失败",
                            type: "error"
                        });
                    });
            },
            fetchDataRed(){
                this.loading_search_red=true
                hongziList(this.queryRedList).then(res => {
                    if (res && res.code == 0) {
                        res.data.data.forEach(item=>{
                            item.loading=false
                        })
                        this.InvoiceList = res.data
                        this.enumsRed=res.enum
                        this.loading_search_red=false
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_search_red=false
                    }
                }).catch(rr => {
                    this.loading_search_red=false
                })
            },
            handleCurrentChangeRed(page_current) {
                this.queryRedList.page = this.currentPageRed = page_current;
                this.fetchDataRed();
            },
            handleSizeChangeRed(val) {
                this.queryRedList.per_page=val
                this.fetchDataRed();
            },
            searchRed() {
                this.queryRedList.page = 1;
                this.currentPageRed=1
                this.fetchDataRed();
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleSizeChange(val) {
                this.queryList.per_page=val
                this.fetchData();
            },
            handleSizeChange_match(val) {
                this.queryList_match.per_page=val
                this.search_match();
            },
            handleCurrentChange_match(page_current) {
                this.queryList_match.page = this.currentPage_match = page_current;
                this.search_match();
            },
            search(){
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            search_match(){
                this.loading_search_match=true
                getContractDetails(this.queryList_match).then(res => {
                    this.loading_search_match=false
                    if (res && res.code == 0) {
                        res.data.data.forEach(res=>{
                            res.loading=false
                        })
                        this.list_match = res.data
                        this.hexiao_status=res.enum.hexiao_status
                        this.InvoiceInfo=res.enum.InvoiceInfo
                        this.units=res.enum.units
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.base_quantity=this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(item.base_quantity)},0)
                this.total_price=this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(item.total_price)},0)
                this.hexiao_amount_leave=this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(item.hexiao_amount_leave)},0)
                // this.list_match.data.splice(this.list_match.data.length-1)
                // this.list_match.data.push({
                //     base_quantity:base_quantity,
                //     total_price:total_price,
                //     hexiao_amount_leave:hexiao_amount_leave,
                //     storage_quantity_unit:this.list_match.data[0].storage_quantity_unit
                // })
            },
            hexiaoMore(){
                // let that=this
                // for(var i = 0; i < this.multipleSelection.length; i++) {
                //     (function(i) {
                //         setTimeout(function() {
                //             that.Hexiao(that.multipleSelection[i])
                //         }, (i + 1) * 1000);
                //     })(i)
                // }
               // const invoiceType= this.list_match.data.some(item=>{return item.invoice_type_id!=1})
               // const invoiceType2= this.list_match.data.some(item=>{return item.invoice_type_id==1})
               //  if((this.matchData[0].invoice_type==='增值税专用发票'&&invoiceType)||(this.matchData[0].invoice_type!=='增值税专用发票'&&invoiceType2)){
               //      this.$message({
               //          message: '发票类型与税率不一致，禁止核销！',
               //          type: 'error'
               //      })
               //      return
               //  }
               const flag= this.list_match.data.some(item=>{return item.base_price!=this.matchData[0].base_price})
               const ids=this.multipleSelection.map(item=>{return item.id})
                if(flag){
                    this.$confirm('存在标准单价不一致，是否强制核销?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj={
                            invoice_detail_id:this.matchData[0].id,
                            contract_detail_ids:ids
                        }
                        doHexiao(obj).then(res => {
                            if (res && res.code == 0) {
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                })
                                getContractDetails(this.queryList_match).then(res => {
                                    if (res && res.code == 0) {
                                        this.list_match = res.data
                                        getInvoiceDetail({id:this.matchData[0].id}).then(res => {
                                            if (res && res.code == 0) {
                                                this.matchData = res.data.data
                                                this.$forceUpdate()
                                            } else {
                                                this.$message({
                                                    message: res.msg,
                                                    type: 'error'
                                                })
                                            }
                                        }).catch(rr => {
                                        })
                                    } else {
                                        this.$message({
                                            message: res.msg,
                                            type: 'error'
                                        })
                                    }
                                }).catch(rr => {
                                })
                            } else {
                                item.loading=false
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })
                            }
                        }).catch(rr => {
                            item.loading=false
                        })
                    }).catch(rr => {
                    })
                }else{
                    let obj={
                        invoice_detail_id:this.matchData[0].id,
                        contract_detail_ids:ids
                    }
                    doHexiao(obj).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                            getContractDetails(this.queryList_match).then(res => {
                                if (res && res.code == 0) {
                                    this.list_match = res.data
                                    getInvoiceDetail({id:this.matchData[0].id}).then(res => {
                                        if (res && res.code == 0) {
                                            this.matchData = res.data.data
                                            this.$forceUpdate()
                                        } else {
                                            this.$message({
                                                message: res.msg,
                                                type: 'error'
                                            })
                                        }
                                    }).catch(rr => {
                                    })
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    })
                                }
                            }).catch(rr => {
                            })
                        } else {
                            item.loading=false
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    }).catch(rr => {
                        item.loading=false
                    })
                }
            },
            Hexiao(item){
                // if((this.matchData[0].invoice_type==='增值税专用发票'&&item.invoice_type_id!=1)||(this.matchData[0].invoice_type!=='增值税专用发票'&&item.invoice_type_id==1)){
                //     this.$message({
                //         message: '发票类型与税率不一致，禁止核销！',
                //         type: 'error'
                //     })
                //     return
                // }
                if(this.matchData[0].base_price!=item.base_price){
                    this.$confirm('标准单价不一致，是否强制核销?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj={
                            invoice_detail_id:this.matchData[0].id,
                            contract_detail_ids:[item.id]
                        }
                        item.loading=true
                        doHexiao(obj).then(res => {
                            item.loading=false
                            if (res && res.code == 0) {
                                this.$message({
                                    message: res.msg,
                                    type: 'success'
                                })
                                getContractDetails(this.queryList_match).then(res => {
                                    if (res && res.code == 0) {
                                        res.data.data.forEach(item=>{
                                            item.loading=false
                                        })
                                        this.list_match = res.data
                                        getInvoiceDetail({id:this.matchData[0].id}).then(res => {
                                            if (res && res.code == 0) {
                                                this.matchData = res.data.data
                                                this.$forceUpdate()
                                            } else {
                                                this.$message({
                                                    message: res.msg,
                                                    type: 'error'
                                                })
                                            }
                                        }).catch(rr => {
                                            res.loading=false
                                        })
                                    } else {
                                        this.$message({
                                            message: res.msg,
                                            type: 'error'
                                        })
                                    }
                                }).catch(rr => {
                                    res.loading=false
                                })
                            } else {
                                item.loading=false
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })
                            }
                        }).catch(rr => {
                            item.loading=false
                        })
                    }).catch(() => {
                        item.loading=false
                    });
                }else{
                    let obj={
                        invoice_detail_id:this.matchData[0].id,
                        contract_detail_ids:[item.id]
                    }
                    item.loading=true
                    doHexiao(obj).then(res => {
                        item.loading=false
                        if (res && res.code == 0) {
                            this.$message({
                                message: res.msg,
                                type: 'success'
                            })
                            getContractDetails(this.queryList_match).then(res => {
                                if (res && res.code == 0) {
                                    res.data.data.forEach(item=>{
                                        item.loading=false
                                    })
                                    this.list_match = res.data
                                    getInvoiceDetail({id:this.matchData[0].id}).then(res => {
                                        if (res && res.code == 0) {
                                            this.matchData = res.data.data
                                             this.$forceUpdate()
                                        } else {
                                            this.$message({
                                                message: res.msg,
                                                type: 'error'
                                            })
                                        }
                                    }).catch(rr => {
                                    })
                                } else {
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    })
                                }
                            }).catch(rr => {
                            })
                        } else {
                            item.loading=false
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    }).catch(rr => {
                        item.loading=false
                    })
                }
            },
            handleClose(){
                this.fetchData()
                this.dialogVisible=false
            },
            cancel(item){
                item.cancelLoading=true
                doCancelHexiaoDetail({invoice_number:item.invoice_number,id:item.id}).then(res => {
                    item.cancelLoading=false
                    if (res && res.code == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            }

        }
    }
</script>
<style>
    .el-popover{
        white-space: pre!important;
        background: #303133!important;
        color: #fff!important;
    }
    .el-popper[x-placement^=bottom] .popper__arrow::after {
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #303133;
    }
</style>
<style scoped>
    .top {
        margin: 10px 0;
    }

    p {
        margin: 5px 0;
    }
    .pointer{
        cursor: pointer;
    }
    .input{
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: 37px;
        line-height: 37px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
    .total{
        text-align: right;
        color: red;
        margin-right: 410px;
        margin-top: 10px;
    }
    .total span{
        width: 100px;
        display: inline-block;
        text-align: center;
    }
    /deep/ .el-table__body tr.current-row>td {
        background-color: #bbd4f0;
    }
</style>