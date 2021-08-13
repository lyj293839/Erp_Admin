<style lang="scss" type="text/scss">
    .add {
        margin-bottom: 15px;
    }

    .el-pagination {
        text-align: right;
    }

    .l_h80 {
        // height: 80px;
        // line-height: 80px;
    }

    .l_h20 {
        height: 25px;
        line-height: 25px;
        font-size: 13px;
    }

    .l_h40 {
        height: 40px;
        line-height: 40px;
    }

    .t_left {
        text-align: left;
    }

    .border_t {
        border-top: 1px solid #f2f2f2;
    }

    .img {
        width: 20px;
        vertical-align: middle;
        margin: 0 5px;
    }

    .el-popover {
        left: 200px !important;
        width: calc(100% - 240px);
    }
</style>
<template>
    <d2-container>
        <div class="inquery">
            <el-form label-width="80px">
                <el-row style="margin: 10px 0;">
                    <el-col :span="2">
                        <el-button type="primary" size="mini" @click="add">{{$t('create')}}</el-button>
                        <el-button type="primary" size="mini" @click="import_go">{{$t('import')}}</el-button>
                    </el-col>
                    <el-col :span="22" class="d2-text-right">
                        <el-input
                                v-model="queryList.keywords"
                                style="width: 205px;margin:5px;"
                                size="mini"
                                clearable
                                :placeholder="$t('Inquery.index.keywords')"
                        ></el-input>
                        <el-date-picker
                                v-model="queryList.date_from"
                                size="mini"
                                style="width: 130px;margin:5px;"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :placeholder="$t('Inquery.index.date_from')"
                        ></el-date-picker>
                        <el-date-picker
                                v-model="queryList.date_to"
                                style="width: 130px;margin:5px;"
                                size="mini"
                                type="date"
                                value-format="yyyy-MM-dd"
                                :placeholder="$t('Inquery.index.date_to')"
                        ></el-date-picker>
                        <el-select
                                v-model="queryList.country_code"
                                clearable
                                filterable
                                size="mini"
                                style="width: 100px;margin:5px;"
                                :placeholder="$t('Inquery.index.country_code')"
                        >
                            <el-option v-for="(i,index) in country" :key="index" :label="i.Name"
                                       :value="i.Code"></el-option>
                        </el-select>
                        <el-select
                                v-model="queryList.customer"
                                filterable
                                clearable
                                remote
                                size="mini"
                                reserve-keyword
                                :placeholder="$t('Inquery.index.customer')"
                                :remote-method="remoteMethod"
                                :loading="loading"
                                style="width: 200px;margin:5px;"
                        >
                            <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <el-select
                                v-model="queryList.resource_id"
                                clearable
                                filterable
                                size="mini"
                                style="width: 100px;margin:5px;"
                                :placeholder="$t('Inquery.index.resource_id')"
                        >
                            <el-option v-for="(i,index) in resources" :key="index" :label="i.name"
                                       :value="i.id"></el-option>
                        </el-select>
                        <el-select
                                v-model="queryList.user_id"
                                clearable
                                filterable
                                size="mini"
                                style="width: 120px;margin:5px;"
                                :placeholder="$t('Inquery.index.user_id')"
                        >
                            <el-option v-for="(i,index) in users" :key="index" :label="i.name"
                                       :value="i.id"></el-option>
                        </el-select>
                        <el-select
                                v-model="queryList.assignsaler_id"
                                clearable
                                filterable
                                size="mini"
                                style="width: 120px;margin:5px;"
                                :placeholder="$t('Inquery.index.assignsaler_id')"
                        >
                            <el-option v-for="(i,index) in sellers" :key="index" :label="i.name"
                                       :value="i.id"></el-option>
                        </el-select>
                        <el-select
                                v-model="queryList.status"
                                clearable
                                filterable
                                size="mini"
                                style="width: 100px;margin:5px;"
                                :placeholder="$t('Inquery.index.status')"
                        >
                            <el-option
                                    v-for="(i,index) in InquiryStatus"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id"
                            ></el-option>
                        </el-select>
                        <el-button type="primary" size="mini" @click="search">{{$t('search')}}</el-button>
                        <!--<el-button type="primary" size="mini" @click="dialogAdd=1">{{$t('create')}}</el-button>-->
                        <!--<el-button type="primary" size="mini" @click="dialogAdd=2">{{$t('import')}}</el-button>-->

                        <!--<el-button type="primary" size="mini" @click="search">{{$t('Inquery.index.sale_order')}}-->
                        <!--</el-button>-->
                    </el-col>
                </el-row>
            </el-form>
            <div
                    v-for="(item,index) in list.data"
                    class="d2-mt-10"
                    style="box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);padding: 10px 10px 0 10px;font-size: 14px;"
            >
                <div class="text">
                    <el-row :gutter="20">
                        <el-col :span="18">
                            <div>
                                <el-row>
                                    <el-col class="l_h80" :span="3">
                                        <div>ID:{{item.id}}</div>
                                        <div>CAS：{{item.cas}}</div>
                                    </el-col>
                                    <el-col class="l_h80" :span="2">{{item.mdl}}</el-col>
                                    <el-col :span="10">
                                        <div>{{item.name_cn}}</div>
                                        <div>{{item.name ? item.name : ''}}</div>
                                    </el-col>
                                    <el-col :span="7"></el-col>
                                    <el-col :span="2">
                                        <div style="text-align:right;">{{item.specification}}*{{item.quantity}}</div>
                                    </el-col>
                                </el-row>
                            </div>
                            <div style="margin-top:10px;">
                                <el-row>
                                    <el-col :span="10">
                                        <div class="l_h20">
                                            <div
                                                    style="display: inline-block;margin: 0 5px;"
                                            >{{item.purchaseuser ? item.purchaseuser.name : ''}}
                                            </div>
                                            <div
                                                    style="display: inline-block;margin: 0 5px;"
                                            >{{$t('Inquery.index.success')}}{{item.price_status1}}
                                            </div>
                                            <div
                                                    style="display: inline-block;margin: 0 5px;"
                                            >{{$t('Inquery.index.priceing')}}{{item.price_status0}}
                                            </div>
                                            <div
                                                    v-if="item.quotes.length>0"
                                                    style="display: inline-block"
                                            >{{item.quotes[0].created_at}}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="10">
                                        <div class="l_h20">
                                            <div
                                                    style="display: inline-block;margin: 0 5px;"
                                            >{{item.assignsaler ? item.assignsaler.name : ''}}
                                            </div>
                                            <el-tooltip
                                                    class="item"
                                                    effect="dark"
                                                    v-if="item.outprice"
                                                    :content="item.outprice.price_string"
                                                    placement="top"
                                            >
                                                <div style="display: inline-block">{{$t('Inquery.index.success')}}</div>
                                            </el-tooltip>
                                            <div
                                                    style="display: inline-block;margin: 0 5px;"
                                            >{{item.outprice ? item.outprice.updated_at : ''}}
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col class="l_h20" :span="4">{{item.note}}</el-col>
                                </el-row>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div>
                                <el-row>
                                    <el-col
                                            class="t_left l_h20"
                                            :span="24"
                                    >{{item.customer ? item.customer.name : ''}}
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <el-row class="l_h20">
                                    <el-col
                                            class="t_left"
                                            :span="8"
                                    >{{item.customer.countries ? item.customer.countries.Name : ''}}
                                    </el-col>
                                    <el-col
                                            class="t_left"
                                            :span="8"
                                    >grade:{{item.customer ? item.customer.level_id : ''}}
                                    </el-col>
                                    <el-col class="t_left" :span="8">{{item.resource ? item.resource.name : ''}}
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <el-row class="l_h20">
                                    <el-col class="t_left" :span="24">{{item.customer ? item.customer.remark : ''}}
                                    </el-col>
                                </el-row>
                            </div>
                            <div>
                                <el-row class="l_h20">
                                    <el-col :span="6" class="t_left">{{item.user ? item.user.name : ''}}</el-col>
                                    <el-col :span="18" class="t_left">{{item.created_at}}</el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row class="border_t l_h40">
                        <el-col :span="4">
                            <el-popover placement="top-start" title width="300" trigger="hover">
                                <img
                                        v-if="item.chemprod"
                                        :src="item.chemprod.img"
                                        :id="index"
                                        alt
                                        style="width: 300px;"
                                />
                                <img
                                        slot="reference"
                                        v-if="item.chemprod"
                                        src="/image/module/ben.png"
                                        class="img"
                                        alt
                                />
                            </el-popover>
                            <el-tooltip
                                    v-if="item.chemprod&&item.chemprod.status==1"
                                    class="item"
                                    effect="dark"
                                    content="Product information has been reviewed"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <img src="/image/module/check.png" class="img" alt/>
                            </el-tooltip>
                            <el-tooltip
                                    v-if="item.chemprod&&item.chemprod.property"
                                    class="item"
                                    effect="dark"
                                    :content="'storagecondition:'+item.chemprod.property.storagecondition+',trancondition:'+item.chemprod.property.trancondition"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <img src="/image/module/warn.png" class="img" alt/>
                            </el-tooltip>
                            <el-tooltip
                                    v-if="item.chemprod&&item.chemprod.is_advantage==1"
                                    class="item"
                                    effect="dark"
                                    content="优势产品"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <img src="/image/module/spellcheck.png" class="img" alt/>
                            </el-tooltip>
                            <el-tooltip
                                    class="supplier"
                                    effect="dark"
                                    content="可供货的供应商"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <el-popover placement="bottom" width="250" trigger="click">
                                    <el-table :data="suppliers">
                                        <el-table-column width="250" property="company.name"
                                                         label="可供货的供应商"></el-table-column>
                                    </el-table>
                                    <img
                                            slot="reference"
                                            src="/image/module/supplier.png"
                                            class="img"
                                            @click="get_supplier(item.cas)"
                                            alt
                                    />
                                </el-popover>
                            </el-tooltip>
                            <el-tooltip
                                    v-if="item.prodreminds.length>0"
                                    class="item"
                                    effect="dark"
                                    :content="item.prodreminds_name"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <img src="/image/module/notice.png" class="img" alt/>
                            </el-tooltip>
                        </el-col>
                        <el-col :span="3">
                            {{item.chemprod && item.chemprod.is_advantage == 1 ? '优势产品' : ''}}
                            {{item.chemprod && item.chemprod.is_secret == 1 ? '保密产品' : ''}}
                        </el-col>

                        <el-col :span="13">
                            <el-row>
                                <!--默认图谱-->
                                <el-col :span="3">
                  <span
                          @click="creatAtlas(item.id,item.atlas)"
                          style="cursor: pointer"
                  >{{$t('Inquery.index.a')}}</span>
                                </el-col>
                                <!--默认coa-->
                                <el-col :span="3">
                  <span
                          @click="creatCoa(item.id,item.coa)"
                          style="cursor: pointer"
                  >{{$t('Inquery.index.b')}}</span>
                                </el-col>
                                <!--默认msds-->
                                <el-col :span="3">
                  <span
                          @click="creatMsds(item.id,item.msds)"
                          style="cursor: pointer"
                  >{{$t('Inquery.index.c')}}</span>
                                </el-col>
                                <el-col :span="7" class="d2-text-center" v-if="item.chemprod&&item.chemprod.stock">
                                    <!--<el-tooltip  class="item" effect="dark" :content="item.chemprod&&item.chemprod.stock?item.chemprod.stock:''+item.chemprod&&item.chemprod.unit_id?units[item.chemprod.unit_id].name:''" placement="top" style="padding: 0 0 !important;">-->
                                    <!--<span>总库存:{{item.chemprod&&item.chemprod.stock?item.chemprod.stock:''}}{{item.chemprod&&item.chemprod.unit_id?units[item.chemprod.unit_id].name:''}}</span>-->
                                    <!--</el-tooltip>-->
                                    <!--<span>{{$t('Inquery.index.d')}}:{{item.chemprod && item.chemprod.stock ? item.chemprod.stock : ''}}{{item.chemprod && item.chemprod.unit_id ? units[item.chemprod.unit_id].name : ''}}</span>-->
                                </el-col>
                                <!--<el-col :span="3">{{$t('Inquery.index.e')}}</el-col>-->
                                <!--<el-col :span="3">{{$t('Inquery.index.f')}}</el-col>-->
                            </el-row>
                        </el-col>
                        <el-col :span="4">
                            <!--<img src="/image/module/grade.png" class="img" alt="">-->
                        </el-col>
                    </el-row>
                    <el-row class="border_t l_h40 d2-text-center">
                        <!--采购报价-->
                        <el-col :span="2" style="cursor: pointer;">
                            <el-popover placement="bottom-start" trigger="click">
                                <form1 v-if="id==item.id" :datas="id" :time="time" @refresh="refresh"></form1>
                                <el-button
                                        slot="reference"
                                        @click="get_id(item.id)"
                                        size="mini"
                                >{{$t('Inquery.index.g')}}
                                </el-button>
                            </el-popover>
                        </el-col>
                        <!--销售报价-->
                        <el-col :span="2" style="cursor: pointer;">
                            <el-popover placement="bottom-start" trigger="click">
                                <form2
                                        v-if="id==item.id"
                                        :datas="id"
                                        :time="time"
                                        @refresh="refresh"
                                        @get_html="get_html($event)"
                                ></form2>
                                <el-button
                                        slot="reference"
                                        @click="get_id(item.id)"
                                        size="mini"
                                >{{$t('Inquery.index.h')}}
                                </el-button>
                            </el-popover>
                        </el-col>
                        <!--生成订单-->
                        <el-col :span="2" style="cursor: pointer;">
                            <el-popover placement="bottom-start" trigger="click">
                                <form3 v-if="id==item.id" :datas="customer_id" :id="id" :time="time"></form3>
                                <el-button
                                        slot="reference"
                                        @click="get_customer_id(item.id,item.customer.id)"
                                        size="mini"
                                >{{$t('Inquery.index.i')}}
                                </el-button>
                            </el-popover>
                        </el-col>
                        <!--放弃-->
                        <el-col v-if="item.cancel_reason_id" :span="2" style="cursor: pointer;">
                            <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="InquiryCancelReason[item.cancel_reason_id].name"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <span style="color: red;">{{$t('Inquery.index.j')}}</span>
                            </el-tooltip>
                        </el-col>
                        <el-col v-else :span="2" style="cursor: pointer;">
                            <el-button @click="get_Abandon_id(item.id)" size="mini">{{$t('Inquery.index.o')}}
                            </el-button>
                        </el-col>
                        <!--指派采购-->
                        <!--<el-col :span="2" style="cursor: pointer;">-->
                        <!--<el-button @click="get_inquiry_id(item.id,item.purchaseuser.id)" size="mini">{{$t('Inquery.index.k')}}-->
                        <!--</el-button>-->
                        <!--</el-col>-->
                        <!--预占批号-->
                        <el-col v-if="item.prebatch_no" style="cursor: pointer;" :span="2">
                            <el-tooltip
                                    class="item"
                                    effect="dark"
                                    :content="item.prebatch_no"
                                    placement="top"
                                    style="padding: 0 0 !important;"
                            >
                                <span style="color: red;">{{$t('Inquery.index.l')}}</span>
                            </el-tooltip>
                        </el-col>
                        <el-col v-else style="cursor: pointer;" :span="2">
                            <el-button @click="get_inquiry_id_ph(item.id)" size="mini">{{$t('Inquery.index.m')}}
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <el-pagination
                    class="d2-mt"
                    background
                    :page-size="list.per_page"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :total="list.total"
            ></el-pagination>
        </div>
        <el-dialog title="指派采购" :visible.sync="dialogVisible" width="25%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="指派采购">
                    <el-select v-model="purchaseuser_id" clearable filterable size="mini" placeholder="采购员">
                        <el-option v-for="(i,index) in purchases" :key="index" :label="i.name"
                                   :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_purchases">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog title="放弃" :visible.sync="dialogVisible_abandon" width="25%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="放弃原因">
                    <el-select v-model="cancel_reason_id" clearable filterable size="mini" placeholder="放弃原因">
                        <el-option
                                v-for="(i,index) in InquiryCancelReason"
                                :key="index"
                                :label="i.name"
                                :value="i.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_abandon = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_abandon">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog :title="$t('Inquery.index.n')" :visible.sync="dialogVisible_ph" width="25%">
            <el-form label-width="80px" label-position="left">
                <el-form-item :label="$t('Inquery.index.n')">
                    <el-input v-model="prebatch_no" size="mini"></el-input>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="generatePrebatchNo()"
                    >{{$t('Inquery.index.n')}}
                    </el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_ph = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_prebatch_no"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <el-dialog title="上传文件" :visible.sync="dialogVisible_updateAtlas" width="40%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="上传文件">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :headers="headers"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateAtlas"
                            :show-file-list="false"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-table
                        v-if="Atlas.length>0"
                        :data="Atlas"
                        element-loading-text="Loading"
                        border
                        fit
                        highlight-current-row
                        size="small"
                >
                    <el-table-column align="center" label="文件名">
                        <template slot-scope="scope">
                            <a :href="scope.row.filename">{{scope.row.origin}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="Options">
                        <template slot-scope="scope">
                            <template>
                                <el-button size="mini" type="danger" @click="handleDel_Atlas(scope.$index)">Delete
                                </el-button>
                            </template>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_updateAtlas = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_updateAtlas"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <el-dialog title="上传文件" :visible.sync="dialogVisible_updateCoa" width="40%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="上传文件">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :headers="headers"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateCoa"
                            :show-file-list="false"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-table
                    v-if="coa.length>0"
                    :data="coa"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    size="small"
            >
                <el-table-column align="center" label="文件名">
                    <template slot-scope="scope">
                        <a :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button size="mini" type="danger" @click="handleDel_Coa(scope.$index)">Delete</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_updateCoa = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_updateCoa"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <el-dialog title="上传文件" :visible.sync="dialogVisible_updateMsds" width="40%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="上传文件">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :headers="headers"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateMsds"
                            :show-file-list="false"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-table
                    v-if="Msds.length>0"
                    :data="Msds"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    size="small"
            >
                <el-table-column align="center" label="文件名">
                    <template slot-scope="scope">
                        <a :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button size="mini" type="danger" @click="handleDel_Msds(scope.$index)">Delete
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_updateMsds = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_updateMsds"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <el-dialog title="邮件模板" :visible.sync="dialog">
            <div v-html="html"></div>
        </el-dialog>
    </d2-container>
</template>
<script>
    import {
        inquiry_lists,
        country_list,
        customer_lists,
        ProdProvidedCompanies,
        assignedPurchase,
        markAbandon,
        generatePrebatchNo,
        savePrebatchNo,
        updateAtlas,
        updateCoa,
        updateMsds
    } from "@/api/Inquery";
    import $ from "jquery";
    import form1 from "../comments/form1";
    import form2 from "../comments/form2";
    import form3 from "../comments/form3";
    import add from "./add";
    import imports from "./imports";
    import util from "@/libs/util";

    export default {
        name: "Inquery-index",
        components: {
            form1,
            form2,
            form3,
            add,
            imports
        },
        data() {
            return {
                html: "",
                time: "",
                dialog: false,
                id: "",
                customer_id: "",
                list: [],
                currentPage: 1,
                queryList: {
                    page: "1",
                    keywords: "",
                    customer: "",
                    date_from: "",
                    date_to: "",
                    country_code: "",
                    resource_id: "",
                    user_id: "",
                    assignsaler_id: "",
                    cancel_reason_id: ""
                },
                dialogVisible: false,
                dialogVisible_abandon: false,
                dialogVisible_ph: false,
                dialogVisible_updateAtlas: false,
                dialogVisible_updateCoa: false,
                dialogVisible_updateMsds: false,
                Atlas: [],
                coa: [],
                Msds: [],
                Atlas_id: "",
                Coa_id: "",
                Msds_id: "",
                purchaseuser_id: "",
                cancel_reason_id: "",
                dialogAdd: 0,
                ChemicalType: [],
                order_result: [],
                order_status: [],

                InquiryCancelReason: [],
                InquiryStatus: [],
                resources: [],
                sellers: [],
                users: [],
                units: [],
                country: [],
                customer: [],
                purchases: [],
                loading: false,
                prebatch_no: "",
                upload_api: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/uploadFile",
                fileList: [],
                suppliers: []
            };
        },
        watch: {
            $route (to, from) {
                if(to.name=='Inquery-index'){
                    this.queryList.date_from = new Date();
                    this.queryList.date_to = new Date();
                    this.fetchData(this.queryList);
                }
            }
        },
        created() {
            this.queryList.date_from = new Date();
            this.queryList.date_to = new Date();
            this.fetchData(this.queryList);
        },
        computed: {
            headers() {
                const token = util.cookies.get("token");
                return {
                    Authorization: "Bearer " + token,
                    'Version-Number':process.env.VUE_APP_Version
                };
            }
        },
        methods: {
            get_html(e) {
                this.html = e;
                this.dialog = true;
            },
            add() {
                this.$router.push({
                    path: "/Inquery/add",
                    name: "Inquery-add",
                    query: {
                        resources: this.resources
                    }
                });
            },
            import_go() {
                this.$router.push({
                    path: "/Inquery/import",
                    name: "Inquery-import",
                    query: {
                        resources: this.resources
                    }
                });
            },
            get_supplier(cas) {
                let obj = {
                    cas: cas
                };
                ProdProvidedCompanies(obj).then(res => {
                    this.suppliers = res.data;
                });
            },
            creatAtlas(id, Atlas) {
                if (Atlas == null) {
                    Atlas = [];
                }
                this.Atlas_id = id;
                this.Atlas = Atlas;
                this.dialogVisible_updateAtlas = true;
            },
            creatCoa(id, Coa) {
                if (Coa == null) {
                    Coa = [];
                }
                this.Coa_id = id;
                this.coa = Coa;
                this.dialogVisible_updateCoa = true;
            },
            creatMsds(id, Msds) {
                if (Msds == null) {
                    Msds = [];
                }
                this.Msds_id = id;
                this.Msds = Msds;
                this.dialogVisible_updateMsds = true;
            },
            save_updateAtlas() {
                let obj = {
                    inquiry_id: this.Atlas_id,
                    atlas: this.Atlas
                };
                updateAtlas(obj, this);
            },
            save_updateCoa() {
                let obj = {
                    inquiry_id: this.Coa_id,
                    coa: this.coa
                };
                updateCoa(obj, this);
            },
            save_updateMsds() {
                let obj = {
                    inquiry_id: this.Msds_id,
                    msds: this.Msds
                };
                updateMsds(obj, this);
            },
            generatePrebatchNo() {
                generatePrebatchNo().then(res => {
                    this.prebatch_no = res.data;
                });
            },
            save_prebatch_no() {
                let obj = {
                    inquiry_id: this.id,
                    prebatch_no: this.prebatch_no
                };
                savePrebatchNo(obj, this).then();
            },
            save_purchases() {
                this.dialogVisible = false;
                let obj = {
                    inquiry_id: this.id,
                    purchaseuser_id: this.purchaseuser_id
                };
                assignedPurchase(obj, this);
            },
            save_abandon() {
                this.dialogVisible_abandon = false;
                let obj = {
                    inquiry_id: this.id,
                    cancel_reason_id: this.cancel_reason_id
                };
                markAbandon(obj, this);
            },
            remoteMethod(query) {
                if (query !== "") {
                    this.loading = true;
                    setTimeout(() => {
                        customer_lists(query).then(res => {
                            this.customer = res.data;
                            this.loading = false;
                        });
                    }, 200);
                } else {
                    this.customer = [];
                }
            },
            fetchData() {
                inquiry_lists(this.queryList).then(res => {
                    res.data.data.forEach((items, index) => {
                        items.price_status0 = 0;
                        items.price_status1 = 0;
                        items.quotes.forEach((m, n) => {
                            if (m.status == 0) {
                                items.price_status0 += 1;
                            } else if (m.status == 1) {
                                items.price_status1 += 1;
                            }
                        });
                        if (items.chemprod) {
                            if (items.chemprod.img) {
                                items.chemprod.img =
                                    items.chemprod.img.substr(0, 4).toLowerCase() == "http"
                                        ? items.chemprod.img
                                        : process.env.VUE_APP_API + items.chemprod.img;
                            }
                            if (items.chemprod.property) {
                                items.chemprod.property.storagecondition = items.chemprod.property
                                    .storagecondition_id
                                    ? res.enum.StorageCondition[
                                        items.chemprod.property.storagecondition_id
                                        ].name
                                    : "";
                                items.chemprod.property.trancondition = items.chemprod.property
                                    .trancondition_id
                                    ? res.enum.Trancondition[
                                        items.chemprod.property.trancondition_id
                                        ].name
                                    : "";
                            }
                        }
                        items.prodreminds_name = "";
                        if (items.prodreminds.length > 0) {
                            items.prodreminds.forEach((m, n) => {
                                items.prodreminds_name += m.reminds.title + " ";
                            });
                        }
                    });
                    this.list = res.data;
                    this.InquiryCancelReason = res.enum.InquiryCancelReason;
                    this.InquiryStatus = res.enum.InquiryStatus;
                    this.resources = res.enum.resources;
                    this.sellers = res.enum.sellers;
                    this.users = res.enum.users;
                    this.units = res.enum.units;
                    this.purchases = res.enum.purchases;
                });
                country_list().then(res => {
                    this.country = res.data;
                });
                // member_company().then(res=>{
                //     this.customer=res.data
                // })
            },
            search() {
                this.fetchData();
            },
            refresh() {
                this.fetchData();
            },
            get_id(id) {
                this.id = id;
                this.time = new Date().getTime();
                this.fetchData();
            },
            get_customer_id(id, customer_id) {
                this.id = id;
                this.time = new Date().getTime();
                this.customer_id = customer_id;
            },
            get_inquiry_id(id, purchaseuser_id) {
                this.dialogVisible = true;
                this.id = id;
                this.purchaseuser_id = purchaseuser_id;
            },
            get_inquiry_id_ph(id) {
                this.prebatch_no = "";
                this.dialogVisible_ph = true;
                this.id = id;
            },
            get_Abandon_id(id) {
                this.dialogVisible_abandon = true;
                this.id = id;
            },
            getValue(event) {
                this.dialogAdd = event;
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleRemove(file, fileList) {
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.$message.warning("当前限制选择5个文件");
            },
            handleAvatarSuccess_updateAtlas(res, file, fileList) {
                if (file.response.code == 0) {
                    this.Atlas.push({
                        filename: res.data.filename,
                        origin: res.data.origin
                    });
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            handleAvatarSuccess_updateCoa(res, file, fileList) {
                if (file.response.code == 0) {
                    this.coa.push({
                        filename: res.data.filename,
                        origin: res.data.origin
                    });
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            handleAvatarSuccess_updateMsds(res, file, fileList) {
                if (file.response.code == 0) {
                    this.Msds.push({
                        filename: res.data.filename,
                        origin: res.data.origin
                    });
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            handleDel_Atlas(index) {
                this.Atlas.forEach((items, i) => {
                    if (index == i) {
                        this.Atlas.splice(i, 1);
                    }
                });
            },
            handleDel_Coa(index) {
                this.coa.forEach((items, i) => {
                    if (index == i) {
                        this.coa.splice(i, 1);
                    }
                });
            },
            handleDel_Msds(index) {
                this.Msds.forEach((items, i) => {
                    if (index == i) {
                        this.Msds.splice(i, 1);
                    }
                });
            }
        }
    };
</script>


