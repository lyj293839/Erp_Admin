<style lang="scss" scoped type="text/scss">
    /deep/ table {
        width: 100%;
        border-collapse: collapse;
        .el-input__inner {
            border: 0px;
            padding: 0px;
        }
        td {
            padding: 5px;
            font-size: 13px;
            color: black;
            font-weight: normal!important;
            line-height: 1.6;
        }
        th {
            padding: 6px;
            font-size: 13px;
        }
    }
    /deep/ .price_info th {
        background-color: rgb(217, 211, 211);
        color: black;
        text-align: left;
        font-weight: 600!important;
    }
    /deep/ .price_info td {
        font-weight: normal;
    }
    /deep/ .price_info tr:nth-child(odd) {
        background-color: #e9eff7;
    }
    /deep/ .el-button {
        margin-left: 10px;
    }
    /deep/ .w87 {
        width: 80px;
        padding: 4px !important;
    }
    /deep/ .w50 {
        width: 50px;
        padding: 4px !important;
    }
    /deep/ .el-card__body {
        padding: 5px 10px 0 10px !important;
    }
    .badge{
        height: 14px;
        line-height: 14px;
        font-size: 9px;
        vertical-align: top;
        margin-top: -1px;
    }
    .badge2{
        height: 14px;
        line-height: 14px;
        font-size: 9px;
        vertical-align: top;
        margin-top: 1px;
    }
    .copy {position: absolute; top: 0; left: 0; opacity: 0; z-index: -10;}
    .change_bg:hover{
        background-color: rgba(0,0,0,0.1)!important;
    }
    .padding5 {
        padding: 5px !important;
    }
    .overflow1{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .overflow2{
        word-break:break-all;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .danger{
        margin-left: 10px;
        font-size: 13px;
        // word-break:break-all;
    }
    .create_MSDS{
        .el-form-item{
            margin-bottom: 0px;
        }
    }
    .dialog{
        /deep/.el-dialog__body{
            padding-top: 0px;
        }
    }
</style>
<template>
    <d2-container ref="a">
        <div style="display:flex;justify-content: space-between;">
            <div>
                <search :cookie="cookie_name" ref="search"></search>
                <el-button
                        class="search_button"
                        type="primary"
                        size="mini"
                        :loading="loading_search"
                        @click="search"
                >{{$t('search')}}</el-button>
                <el-button
                        class="search_button"
                        type="primary"
                        size="mini"
                        @click="import_go"
                        v-if="permissions.indexOf(428)>-1"
                >{{$t('import')}}</el-button>
            </div>
            <div style="font-size:13px;padding:5px 5px;">
                <span>{{$t('Inquery.index.Search_volume')}}：{{list.total}}个</span>
                <!--搜索数量-->
            </div>
        </div>
        <el-card
                id="id"
                class="box-card"
                v-for="(item,index) in list.data"
                :key="item.id"
                style="margin: 5px 0;"
        >
            <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                <tr style="background: rgb(217, 211, 211);">
                    <!-- 询单信息 -->
                    <th class="td" width='130'>{{$t('Inquery.index.table3_title9')}}</th>
                    <!-- 客户信息 -->
                    <th class="td" width='250'>
                        <el-badge v-if="item.statistics_saler_contracts&&item.statistics_saler_contracts!=''&&item.statistics_saler_contracts!=0" :value="item.statistics_saler_contracts" class="badge">
                        </el-badge>
                        {{$t('Inquery.index.table3_title10')}}</th>
                    <!-- 产品信息 -->
                    <th class="td" width="300" >

                        <span style="margin-right:5px;" v-if="item.chemprod&&item.chemprod.msds_material&&user_type!=102">
                            <a target="_blank" v-if="item.chemprod.msds_material.filename.indexOf('http')>-1" :href="item.chemprod.msds_material.filename" style="color:red;font-size:12px;">货代msds</a>
                            <a target="_blank" :href="url+'storage/'+item.chemprod.msds_material.filename" style="color:red;font-size:12px;">货代msds</a>
                        </span>
                        <i @click="edit_name(item.id,item.cas,item.name,item.name_cn)" class="el-icon-edit"></i>
                        {{$t('Inquery.index.table3_title11')}}
                        <span v-if="attr(item,'chemprod.is_danger')==0" class="danger">(非危)</span>
                        <span v-if="attr(item,'chemprod.is_danger')==null" class="danger">(未知)</span>
                        <el-tooltip placement="top"  v-if="attr(item,'chemprod.is_danger')==1">
                            <div slot="content">
                                uncode:{{attr(item,'chemprod.property.uncode')}},packinggroup:{{attr(item,'chemprod.property.packinggroup')}},hazardclass:{{attr(item,'chemprod.property.hazardclass')}},EQ:{{attr(item,'chemprod.property.limited_packing')}}{{getEnumValue(GEnums.Unit,attr(item,'chemprod.property.limited_packing_unit_id'))}}
                            </div>
                            <span style="color: red;" class="danger">(危险品)</span>
                        </el-tooltip>
                        <span v-if="(item.coa&&item.coa.length>0)||(item.msds&&item.msds.length>0)||(item.atlas&&item.atlas.length>0)" class="d2-ml-10" style="color: red;cursor: pointer;font-size: 12px;" @click="creatFiles(item.id,item.coa,item.msds,item.atlas)">附件</span>
                        <span v-else class="d2-ml-10" style="color: red;cursor: pointer;font-size: 14px;" @click="creatFiles(item.id,item.coa,item.msds,item.atlas)">+</span>
                    </th>
                    <!-- 规格信息 -->
                    <th class="td" width="160">{{$t('Inquery.index.table3_title12')}}</th>
                    <!-- 报价信息 -->
                    <!--<th class="td">-->
                        <!--<span v-if="attr(item,'chemprod.is_danger')==1" style="color: red;" class="danger">-->
                            <!--{{attr(item,'chemprod.property.uncode')}}<span style="margin:0px 3px">/</span>-->
                            <!--{{attr(item,'chemprod.property.packinggroup')}}<span style="margin:0px 3px">/</span>-->
                            <!--{{attr(item,'chemprod.property.hazardclass')}}<span style="margin:0px 3px">/</span>-->
                            <!--{{attr(item,'chemprod.property.limited_packing')}}{{getEnumValue(GEnums.Unit,attr(item,'chemprod.property.limited_packing_unit_id'))}}-->
                        <!--</span>-->
                        <!--{{$t('Inquery.index.table3_title13')}}-->
                        <!--<span v-if="attr(item,'chemprod.is_danger')==0" class="danger">(非危)</span>-->
                        <!--<span v-if="attr(item,'chemprod.is_danger')==null" class="danger">(未知)</span>-->
                    <!--</th>-->
                    <th width="155" class="td" rowspan="2" style='text-align:left;background: white;'>
                        <!--采购报价-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="price(item.id,item.quantity,item.specification,item.note,item.cas,item.prod_id)"
                                v-if="permissions.indexOf(435)>-1"
                        >{{$t('Inquery.index.procure')}}</el-button>
                        <!--供应商-->
                        <el-popover
                                placement="bottom-start"
                                title
                                width="800"
                                trigger="click"
                                v-if="permissions.indexOf(148)>-1&&item.supplierprovided&&(user_type!=102||user_id==151||user_id==80)"
                        >
                            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                                <el-tab-pane label="非试剂国内" name="first"><el-table
                                        :data="suppliers_feishijiguonei"
                                        max-height="300"
                                        border
                                        fit
                                        highlight-current-row
                                        size="mini"
                                >
                                    <el-table-column
                                            width="300"
                                            :label="$t('Inquery.index.supplier_need')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.company.name}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            width="200"
                                            property="price"
                                            :label="$t('Inquery.index.price_info')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.price+(scope.row.instore?'/库存:'+scope.row.instore:'')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="300" :label="$t('Inquery.index.price_title')">
                                        <template
                                                slot-scope="scope"
                                        >{{attr(scope.row,'user.name')}}/{{scope.row.created_at.slice(0,10)}}</template>
                                    </el-table-column>
                                </el-table></el-tab-pane>
                                <el-tab-pane label="试剂公司" name="second"><el-table
                                        :data="suppliers_shijigongsi"
                                        max-height="300"
                                        border
                                        fit
                                        highlight-current-row
                                        size="mini"
                                >
                                    <el-table-column
                                            width="300"
                                            property="company.name"
                                            :label="$t('Inquery.index.supplier_need')"
                                    ></el-table-column>
                                    <el-table-column
                                            width="200"
                                            :label="$t('Inquery.index.price_info')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.price+(scope.row.instore?'/库存:'+scope.row.instore:'')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="300" :label="$t('Inquery.index.price_title')">
                                        <template
                                                slot-scope="scope"
                                        >{{attr(scope.row,'user.name')}}/{{scope.row.created_at.slice(0,10)}}</template>
                                    </el-table-column>
                                </el-table></el-tab-pane>
                                <el-tab-pane label="非试剂国外" name="third"><el-table
                                        :data="suppliers_feishijiguowai"
                                        max-height="300"
                                        border
                                        fit
                                        highlight-current-row
                                        size="mini"
                                >
                                    <el-table-column
                                            width="300"
                                            property="company.name"
                                            :label="$t('Inquery.index.supplier_need')"
                                    ></el-table-column>
                                    <el-table-column
                                            width="200"
                                            :label="$t('Inquery.index.price_info')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.price+(scope.row.instore?'/库存:'+scope.row.instore:'')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="300" :label="$t('Inquery.index.price_title')">
                                        <template
                                                slot-scope="scope"
                                        >{{attr(scope.row,'user.name')}}/{{scope.row.created_at.slice(0,10)}}</template>
                                    </el-table-column>
                                </el-table></el-tab-pane>
                            </el-tabs>

                            <el-button
                                    slot="reference"
                                    type="primary"
                                    class="d2-mt-5 d2-mb-5 w87"
                                    size="mini"
                                    @click="get_supplier(item.cas)"
                                    :title="$t('Inquery.index.supplier_title')"
                                    v-if="permissions.indexOf(148)>-1"
                            >{{$t('Inquery.index.supplier')}}</el-button>
                        </el-popover>
                        <!--修改询单-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="edit_inquery(item.id)"
                                v-if="permissions.indexOf(488)>-1"
                        >{{$t('Inquery.index.edit_inquery')}}</el-button>
                        <!--库-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="ku(item.prod_id,item.cas)"
                        > <i v-if="permissions.indexOf(487)>-1 && item.chemprod && item.chemprod.inventory" class="el-icon-s-home"></i>
                            {{$t('Inquery.index.ku')}}</el-button>
                        <!--放弃报价-->
                        <el-dropdown @command="get_Abandon_id" trigger="click">
                          <span class="el-dropdown-link">
                            <el-button
                                    type="primary"
                                    class="d2-mt-5 d2-mb-5 w87"
                                    size="mini"
                                    v-if="permissions.indexOf(420)>-1"
                            >
                              {{$t('Inquery.index.abandon_price')}}
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                          </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                        v-for="(i,index) in GEnums.InquiryCancelReason"
                                        :key="i.id"
                                        :command="beforeHandleCommand(item.id,i.id)"
                                >{{i.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <!--历史报价-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="history(item.cas)"
                        > <i v-if="permissions.indexOf(485)>-1" ></i>
                            {{$t('Inquery.index.history_price')}}</el-button>
                        <!--克隆-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="clone_inquery(item)"
                        > <i v-if="permissions.indexOf(415)>-1"></i>
                            {{$t('Inquery.index.clone')}}</el-button>
                        <el-dropdown >
                            <el-button type="primary" size='mini' class='w87'>
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>
                                    <!--结构-->
                                    <el-popover
                                            placement="bottom-start"
                                            title
                                            width="300"
                                            trigger="hover"
                                            :open-delay="500"
                                    >
                                        <img
                                                v-if="item.chemprod&&item.chemprod.img"
                                                :src="item.chemprod.img+'?time='+now"
                                                :id="index"
                                                alt
                                                style="width: 300px;"
                                        />
                                        <div slot="reference" @mouseenter="show_img(now)">{{$t('Inquery.index.img')}}</div>
                                    </el-popover>
                                </el-dropdown-item>
                                <!--<el-dropdown-item>-->
                                    <!--&lt;!&ndash;历史报价&ndash;&gt;-->
                                    <!--<div v-if="permissions.indexOf(485)>-1" @click="history(item.cas)">{{$t('Inquery.index.history_price')}}</div>-->
                                <!--</el-dropdown-item>-->
                                <!--<el-dropdown-item>-->
                                    <!--&lt;!&ndash; 克隆询单 &ndash;&gt;-->
                                    <!--<div v-if="permissions.indexOf(415)>-1" @click="clone_inquery(item)">{{$t('Inquery.index.clone')}}</div>-->
                                <!--</el-dropdown-item>-->
                                <el-dropdown-item>
                                    <!--预占批号-->
                                    <div  @click="get_inquiry_id_ph(item.id,item.prebatch_no,item.cust_id)"  v-if="permissions.indexOf(432)>-1">{{$t('Inquery.index.prebatch_no')}}</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <!--变更记录-->
                                    <div v-if="permissions.indexOf(486)>-1"  @click="change(item.id)">{{$t('Inquery.index.change')}}</div>
                                </el-dropdown-item>
                                <!--Msds-->
                                <el-dropdown-item>
                                    <div v-if="permissions.indexOf(624)>-1" @click="Msds_click(item.prod_id,item)">Msds</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="Add_ak(item)">COA艾康</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="Add_aq(item)">COA安勤</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </th>
                </tr>
                <tr class="change_bg_td">
                    <td>
                        <div v-if="item.status==1005" style="background-color: #c0c0c0;">{{item.pre}}{{item.id}}</div>
                        <div v-if="item.status==1000||item.status==999">{{item.pre}}{{item.id}}</div>
                        <div v-if="item.status==1001" style="background-color: #FFFF00;">{{item.pre}}{{item.id}}</div>
                        <div v-if="item.status==1002" style="background-color: #87CEEB;">{{item.pre}}{{item.id}}</div>
                        <div v-if="item.status==1004" style="background-color: #EEB2EE;">{{item.pre}}{{item.id}}</div>
                        <div>{{attr(item,'resource.name')}}</div>
                        <div>{{item.created_at}}</div>
                    </td>
                    <td >
                        <div v-if="user_type!=101||user_id==5">
                            <div v-if="item.cust_name&&item.cust_name.length<15"><span class='overflow1' style="color: #409EFF;font-weight: bold;">
                               {{item.cust_name}}</span></div>
                            <div v-else>
                                <el-tooltip class="item" effect="dark" :content="item.cust_name" placement="top">
                                    <span class='overflow1' style="color: #409EFF;font-weight: bold;">{{item.cust_name}}</span>
                                </el-tooltip>
                            </div>
                        </div>
                        <div>
                            <span class="d2-mr-10" style="color: #409EFF;font-weight: bold;">{{attr(item,'country.Name')}}</span>
                            <span>level <span style="color: #409EFF;font-weight: bold;">{{item.level}}</span></span>
                        </div>
                        <div v-if="user_type!=101||user_id==5">{{$t('Inquery.index.table3_title14')}}：{{attr(item,'customer_contact.name')}}</div>
                        <div>
                            <span>{{attr(item,'purchaseuser.name')}}<span style="color: #2f74ff;padding-left: 5px;cursor: pointer;" @click="zhipai_purchaseuser(item)" v-if="permissions.indexOf(581)>-1&&attr(item,'purchaseuser.name')==user_name"><i class="el-icon-edit"></i>{{$t('Hand_over')}}</span></span>/
                            <span>{{attr(item,'assignsaler.name')}}</span><span style="color: #2f74ff;padding-left: 5px;cursor: pointer;" v-if="attr(item,'assignsaler.name')==user_name" @click="edit_assignsalername(item.id,attr(item,'assignsaler.id'))"><i  class="el-icon-edit"></i>{{$t('Hand_over')}}</span>/
                            <span>{{attr(item,'user.name')}}</span>
                        </div>
                    </td>
                    <td style="width: 300px!important;">
                        <div>{{item.prodno}}<el-badge v-if="attr(item,'chemprod.is_advantage')==1" value="优" class="badge"></el-badge></div>
                        <div>
                            <div v-if="item.name_cn&&item.name_cn.length<30"><span class='overflow1'>{{item.name_cn}}</span></div>
                            <div v-else>
                                <el-tooltip class="item" effect="dark" :content="item.name_cn" placement="top">
                                    <span class='overflow1'>{{item.name_cn}}</span>
                                </el-tooltip>
                            </div>
                        </div>
                        <div>
                            <div v-if="item.name&&item.name.length<80"><span class='overflow2'>{{item.name}}</span></div>
                            <div v-else>
                                <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                                    <span class='overflow2'>{{item.name}}</span>
                                </el-tooltip>
                            </div>
                        </div>
                        <div>
                            <el-tooltip placement="top" v-if="item.chemprod&&item.chemprod.reminds.length>0">
                                <div slot="content">
                                    <span v-for="remind in item.chemprod.reminds" :key="remind.id">{{remind.title}};</span>
                                </div>
                                <i class="el-icon-warning"></i>
                            </el-tooltip>
                            <span>CAS# <span style="color: #409EFF;font-weight: bold;">{{item.cas}}</span> </span>
                            <!-- <span v-if="item.chemprod&&item.chemprod.msds_material" style="margin-left:20px;"> <a target="_blank" :href="url+item.chemprod.msds_material.filename">MSDS文件</a></span></span> -->
                            <el-tooltip placement="top" v-if="item.prodgrade">
                                <div slot="content">
                                    <span>{{item.prodgrade.note}}</span><br>
                                    <span>{{item.prodgrade.reason}}</span>
                                </div>
                                <i class="el-icon-bell" style="font-weight: bold;margin-left: 5px;color: red;">({{item.prodgrade.grade}})</i>
                            </el-tooltip>
                        </div>
                        <div>{{item.quantity}}  <el-button type="primary" @click="copy(item)" size="mini" style="padding:3px!important;">复制</el-button>
                        </div>
                        <textarea class="copy" :id="item.id" type="text"></textarea>
                        <!--<div style="color: #409EFF;">附件</div>-->
                    </td>
                    <td>
                        <div v-if="item.specification||item.note">
                            {{$t('Inquery.index.table3_title15')}}:{{item.specification}}
                            <span v-if="item.note">{{'/'+item.note}}</span>
                        </div>
                    </td>
                    <!--<td>-->
                        <!--<div v-html="attr(item,'outprice.price_string')"></div>-->
                        <!--<div v-if="item.sales_contract_no">{{$t('Inquery.index.table3_title16')}}:{{item.sales_contract_no}}<el-tooltip placement="top" v-if="item.inquiry_confirm">-->
                            <!--<div slot="content">-->
                            <!--<span>-->
                              <!--{{item.inquiry_confirm.comfirm_pack?item.inquiry_confirm.comfirm_pack+'/':''}}-->
                              <!--{{item.inquiry_confirm.comfirm_purity?item.inquiry_confirm.comfirm_purity+'/':''}}-->
                              <!--{{item.inquiry_confirm.comfirm_quantity?item.inquiry_confirm.comfirm_quantity:''}}-->
                              <!--{{item.inquiry_confirm.comfirm_quantity_unit?getEnumValue(GEnums.Unit,item.inquiry_confirm.comfirm_quantity_unit) +'/':''}}-->
                              <!--{{item.inquiry_confirm.comfirm_price?item.inquiry_confirm.comfirm_price:''}}-->
                              <!--{{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id)+'/':''}}-->
                              <!--{{item.inquiry_confirm.comfirm_total_price?item.inquiry_confirm.comfirm_total_price:''}}-->
                              <!--{{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id):''}}-->
                            <!--</span>-->
                            <!--</div>-->
                            <!--<i class="el-icon-warning"></i>-->
                        <!--</el-tooltip></div>-->
                        <!--<div v-if="item.cancel_purchase_reason_id||item.cancel_sale_reason_id">-->
                            <!--{{$t('Inquery.index.table3_title17')}}-->
                            <!--<span v-if="item.cancel_purchase_reason_id">({{$t('Inquery.index.table3_title18')}})：{{getEnumValue(GEnums.InquiryCancelReason,item.cancel_purchase_reason_id)}}</span>-->
                            <!--<br>-->
                            <!--<span v-if="item.cancel_sale_reason_id">({{$t('Inquery.index.table3_title19')}})：{{getEnumValue(GEnums.InquiryCancelReason,item.cancel_sale_reason_id)}}</span>-->
                        <!--</div>-->
                    <!--</td>-->
                </tr>
            </table>
            <table v-if="item.quotes.length>0" class="price_info" style="margin: 5px 0;">
                <tr>
                    <!--供应商名称-->
                    <th class="td" width="300" v-if="user_type!=102||user_id==151||user_id==80">
                        <!--<i @click="show_supplier(item)" class="el-icon-arrow-down"></i>-->
                        {{$t('Inquery.index.table4_title1')}}
                    </th>
                    <!--报价-->
                    <!--<th class="td" width="260">-->
                        <!--<el-tooltip placement="top" v-if="item.inquiry_confirm">-->
                            <!--<div slot="content">-->
                <!--<span>-->
                  <!--{{item.inquiry_confirm.comfirm_pack?item.inquiry_confirm.comfirm_pack+'/':''}}-->
                  <!--{{item.inquiry_confirm.comfirm_purity?item.inquiry_confirm.comfirm_purity+'/':''}}-->
                  <!--{{item.inquiry_confirm.comfirm_quantity?item.inquiry_confirm.comfirm_quantity:''}}-->
                  <!--{{item.inquiry_confirm.comfirm_quantity_unit?getEnumValue(GEnums.Unit,item.inquiry_confirm.comfirm_quantity_unit) +'/':''}}-->
                  <!--{{item.inquiry_confirm.comfirm_price?item.inquiry_confirm.comfirm_price:''}}-->
                  <!--{{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id)+'/':''}}-->
                  <!--{{item.inquiry_confirm.comfirm_total_price?item.inquiry_confirm.comfirm_total_price:''}}-->
                  <!--{{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id):''}}-->
                <!--</span>-->
                            <!--</div>-->
                            <!--<i class="el-icon-warning"></i>-->
                        <!--</el-tooltip>-->
                        <!--{{$t('Inquery.index.table4_title9')}}-->
                    <!--</th>-->
                    <!--采购备注-->
                    <th class="td" >{{$t('Inquery.index.table4_title2')}}</th>
                    <!--COA及谱图-->
                    <!--<th class="td" width="120">{{$t('Inquery.index.table4_title4')}}</th>-->
                    <!--采购员-->
                    <th class="td" width="100">{{$t('Inquery.index.table4_title7')}}</th>
                    <th class="td" width="190"></th>
                </tr>
                <tr
                        v-for="quote in item.quotes"
                        :key="quote.id"
                        :style="quote.flag==1?'background:rgb(249, 233, 150);':''"
                        class="change_bg"
                >
                    <td v-if="user_type!=102||user_id==151||user_id==80">{{quote.supplier?quote.supplier.name:''}}</td>
                    <!--<td>-->
                        <!--<el-badge v-if="quote.statistics_purchase_contracts&&quote.statistics_purchase_contracts!=''&&quote.statistics_purchase_contracts!=0" :value="quote.statistics_purchase_contracts" class="d2-mr-5 badge2">-->
                        <!--</el-badge>-->
                        <!--<span v-html="quote.info_string"></span>-->
                    <!--</td>-->
                    <td>
                        <span v-html="quote.self_note" ></span>
                    </td>
                    <!--<td>-->
                        <!--<i-->
                                <!--v-if="permissions.indexOf(564)>-1"-->
                                <!--@click="suppler_creatCoa(quote.id,quote.supplier_coa)"-->
                                <!--class="el-icon-plus"-->
                                <!--style="color:red;"-->
                        <!--&gt;</i>-->
                        <!--<a-->
                                <!--v-if="quote.supplier_coa&&quote.supplier_coa.length>0"-->
                                <!--v-for="coa in quote.supplier_coa"-->
                                <!--class="d2-ml-5"-->
                                <!--:href="coa.filename"-->
                        <!--&gt;{{coa.desc}}</a>-->
                    <!--</td>-->
                    <td>{{quote.user?quote.user.name:''}}</td>
                    <td>
                        <el-button
                                class="w50"
                                v-if="permissions.indexOf(438)>-1&&!(quote.supplier_id!=39057&&quote.supplier_id!=49293&&quote.supplier_id!=44033&&quote.user_id==1&&quote.list_sort==2)"
                                type="primary"
                                size="mini"
                                @click="edit(quote.id,item.id,item.quantity,item.specification,item.note,item.cas)"
                        >{{$t('Inquery.index.edit')}}</el-button>
                        <!--<el-button  class="w87" v-if="permissions.indexOf(440)>-1" type="primary" size="mini" @click="getLogs(quote.id)">{{$t('Inquery.index.watch')}}</el-button>-->
                        <el-button  class="w50" v-if="permissions.indexOf(422)>-1" type="primary" size="mini" @click="select(quote.id,item.prod_id,attr(item,'country_code'),item.cust_id,item.cas,item.id)">{{$t('assign')}}</el-button>
                        <el-button
                                class="w50"
                                v-if="permissions.indexOf(436)>-1"
                                type="primary"
                                size="mini"
                                @click="select_flag(quote.id,item.id)"
                        >{{$t('Inquery.index.good')}}</el-button>
                        <!-- <el-button v-if="permissions.indexOf(564)>-1" type="primary" @click="suppler_creatCoa(quote.id,quote.supplier_coa)" size="mini">{{$t('Inquery.index.coa')}}</el-button> -->
                    </td>
                </tr>
            </table>
        </el-card>
        <!--变更销售员-->
        <el-dialog title="变更销售员" :visible.sync="show_edit_assignsalername" width="25%">
            <el-form label-width="100px" label-position="left">
                <el-form-item label="指派销售员">
                    <el-select v-model="assignsaler_id" clearable filterable size="mini" placeholder="销售员">
                        <el-option v-for="(i,index) in GEnums.Sales" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="show_edit_assignsalername = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_sellers">确 定</el-button>
      </span>
        </el-dialog>
        <!--采购报价-->
        <el-dialog
                :title="$t('Inquery.index.procure')"
                :visible.sync="dialogVisible"
                width="90%"
                v-dialogDrag
        >
            <form1
                    :datas="id"
                    @refresh="refresh"
                    :quantity="quantity"
                    :cas="cas"
                    :note="note"
                    :specification="specification"
                    :procure_time="procure_time"
            ></form1>
            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
        <!--缉-->
        <el-dialog :title="$t('Inquery.index.edit')" :visible.sync="dialogVisible_edit" width="90%">
            <form5
                    :datas="quote_id"
                    @refresh="refresh"
                    :cas="cas"
                    :quantity="quantity"
                    :note="note"
                    :specification="specification"
                    :edit_time="edit_time"
            ></form5>
            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
        <!--查-->
        <el-dialog :title="$t('Inquery.index.watch')" :visible.sync="dialogVisible_log" width="90%">
            <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                <tr>
                    <th class="td">{{$t('Inquery.index.table4_title1')}}</th>
                    <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                    <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                    <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                    <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                    <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                    <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                    <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                </tr>

                <tr v-for="quote in logs" :key="quote.id">
                    <td>{{quote.supplier?quote.supplier.name:''}}</td>
                    <td>{{quote.info_string}}</td>
                    <td>{{quote.self_note}}</td>
                    <td>{{quote.delivery_city}}</td>
                    <td></td>
                    <td>{{quote.supplier_contact?quote.supplier_contact.name:''}}</td>
                    <td>{{quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''}}</td>
                    <td>{{quote.updated_at}}</td>
                </tr>
            </table>
        </el-dialog>
        <!--生成订单-->
        <el-dialog
                :title="$t('Inquery.index.order')"
                :visible.sync="dialogVisible_order"
                @closed="close_select_order"
                width="90%"
        >
            <form3 :datas="customer_id" :prod_id="order_prod_id" :id="id" :order_time="order_time" @refresh="refresh"></form3>
            <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
        <!--上传供应商Coa-->
        <el-dialog
                :title="$t('Inquery.index.upload_file')"
                :visible.sync="dialogVisible_update_supplier_Coa"
                width="40%"
        >
            <el-form label-width="80px" label-position="left">
                <el-form-item :label="$t('Inquery.index.file_name')">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api"
                            :headers="headers"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_update_supplier_Coa"
                            :show-file-list="false"
                    >
                        <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload')}}</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <el-table
                    v-if="supplier_coa.length>0"
                    :data="supplier_coa"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    size="mini"
            >
                <el-table-column align="center" :label="$t('Inquery.index.file_name')">
                    <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="描述">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.desc" size="mini" clearable placeholder></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDel_supplier_Coa(scope.$index)"
                            >Delete</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_update_supplier_Coa = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_update_supplier_Coa"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <!--上传Atlas-->
        <el-dialog
                :title="$t('Inquery.index.upload_file')"
                :visible.sync="dialogVisible_updateAtlas"
                width="40%"
        >
            <el-form label-width="80px" label-position="left">
                <el-form-item :label="$t('Inquery.index.upload_file')">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api"
                            :headers="headers"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateAtlas"
                            :show-file-list="false"
                    >
                        <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload')}}</el-button>
                    </el-upload>
                </el-form-item>
                <el-table
                        v-if="Atlas.length>0"
                        :data="Atlas"
                        element-loading-text="Loading"
                        border
                        fit
                        highlight-current-row
                >
                    <el-table-column align="center" :label="$t('Inquery.index.file_name')">
                        <template slot-scope="scope">
                            <a :href="scope.row.filename">{{scope.row.origin}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="Options">
                        <template slot-scope="scope">
                            <template>
                                <el-button size="mini" type="danger" @click="handleDel_Atlas(scope.$index)">Delete</el-button>
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
                v-if="permissions.indexOf(417)>-1"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <!--上传Files-->
        <el-dialog
                :title="$t('Inquery.index.upload_file')"
                :visible.sync="dialogVisible_updateFiles"
                width="40%"
        >
            <el-form label-width="80px" label-position="left">
                <el-form-item :label="$t('Inquery.index.file_name')">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api_coa"
                            :headers="headers"
                            :data="params"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateCoa"
                            :show-file-list="false"
                    >
                        <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload_coa')}}</el-button>
                    </el-upload>
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api_msds"
                            :headers="headers"
                            :data="params"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateMsds"
                            :show-file-list="false"
                    >
                        <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload_msds')}}</el-button>
                    </el-upload>
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api_atlas"
                            :headers="headers"
                            :data="params"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateAtlas"
                            :show-file-list="false"
                    >
                        <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload_altas')}}</el-button>
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
                    class="d2-mb-10"
            >
                <el-table-column align="center" :label="$t('Inquery.index.file_name_coa')">
                    <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button size="mini" type="danger" @click="handleDel_Coa(scope.$index,scope.row.filepath)">Delete</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                    v-if="Msds.length>0"
                    :data="Msds"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    class="d2-mb-10"
            >
                <el-table-column align="center" :label="$t('Inquery.index.file_name_msds')">
                    <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button size="mini" type="danger" @click="handleDel_Msds(scope.$index,scope.row.filepath)">Delete</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                    v-if="Atlas.length>0"
                    :data="Atlas"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
            >
                <el-table-column align="center" :label="$t('Inquery.index.file_name_atlas')">
                    <template slot-scope="scope">
                        <a target="_blank" :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button size="mini" type="danger" @click="handleDel_Atlas(scope.$index,scope.row.filepath)">Delete</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!--上传Msds-->
        <el-dialog
                :title="$t('Inquery.index.upload_file')"
                :visible.sync="dialogVisible_updateMsds"
                width="40%"
        >
            <el-form label-width="80px" label-position="left">
                <el-form-item :label="$t('Inquery.index.upload_file')">
                    <el-upload
                            style="display: inline-block;margin-left: 45px;"
                            class="upload-demo"
                            :action="upload_api"
                            :headers="headers"
                            :before-remove="beforeRemove"
                            multiple
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess_updateMsds"
                            :show-file-list="false"
                    >
                        <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload')}}</el-button>
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
            >
                <el-table-column align="center" :label="$t('Inquery.index.file_name')">
                    <template slot-scope="scope">
                        <a :href="scope.row.filename">{{scope.row.origin}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <el-button size="mini" type="danger" @click="handleDel_Msds(scope.$index)">Delete</el-button>
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
                v-if="permissions.indexOf(419)>-1"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <!--历史报价-->
        <el-dialog
                :title="$t('Inquery.index.history_price')"
                :visible.sync="dialogVisible_history"
                width="90%"
        >
            <el-tabs v-model="history_price_activeName">
                <el-tab-pane v-if="historys_no_collection.data&&historys_no_collection.data.length>0" label="非采集报价" name="first">
                    <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th  v-if="user_type!=102||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th>
                            <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                        </tr>
                        <tr v-for="quote in historys_no_collection.data" :key="quote.id">
                            <td  v-if="user_type!=102||user_id==151||user_id==80">{{quote.supplier?quote.supplier.name:''}}</td>
                            <td><el-badge v-if="quote.statistics_purchase_contracts&&quote.statistics_purchase_contracts!=''&&quote.statistics_purchase_contracts!=0" :value="quote.statistics_purchase_contracts" class="badge">
                            </el-badge>{{quote.info_string}}</td>
                            <td v-html='quote.self_note'></td>
                            <td>{{quote.delivery_city}}</td>
                            <td></td>
                            <td>{{quote.supplier_contact?quote.supplier_contact.name:''}}</td>
                            <td>
                                {{quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''}}
                            </td>
                            <td>{{quote.created_at}}</td>
                        </tr>
                    </table>
                    <el-pagination
                            background
                            @current-change="historys_no_handleCurrentChange"
                            layout="prev, pager, next"
                            :current-page.sync="historys_no_currentPage"
                            :total="historys_no_collection.total"
                    ></el-pagination>
                </el-tab-pane>
                <el-tab-pane v-if="historys_collection.data&&historys_collection.data.length>0" label="采集报价" name="second">
                    <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th  v-if="user_type!=102||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th>
                            <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                        </tr>
                        <tr v-for="quote in historys_collection.data" :key="quote.id">
                            <td  v-if="user_type!=102||user_id==151||user_id==80">{{quote.supplier?quote.supplier.name:''}}</td>
                            <td><el-badge v-if="quote.statistics_purchase_contracts&&quote.statistics_purchase_contracts!=''&&quote.statistics_purchase_contracts!=0" :value="quote.statistics_purchase_contracts" class="badge">
                            </el-badge>{{quote.info_string}}</td>
                            <td v-html='quote.self_note'></td>
                            <td>{{quote.delivery_city}}</td>
                            <td></td>
                            <td>{{quote.supplier_contact?quote.supplier_contact.name:''}}</td>
                            <td>
                                {{quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''}}
                            </td>
                            <td>{{quote.created_at}}</td>
                        </tr>
                    </table>
                    <el-pagination
                            background
                            @current-change="historys_handleCurrentChange"
                            layout="prev, pager, next"
                            :current-page.sync="historys_currentPage"
                            :total="historys_collection.total"
                    ></el-pagination>
                </el-tab-pane>
                <el-tab-pane v-if="yilan_collection.data&&yilan_collection.data.length>0" label="一览报价" name="third">
                    <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th  v-if="user_type!=102||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th>
                            <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                        </tr>
                        <tr v-for="quote in yilan_collection.data" >
                            <td  v-if="user_type!=102||user_id==151||user_id==80">{{quote.supplier_name?quote.supplier_name:''}}</td>
                            <td>{{quote.item}}</td>
                            <td v-html='quote.note'></td>
                            <td>{{quote.city}}</td>
                            <td></td>
                            <td>{{quote.supplier_contact_name?quote.supplier_contact_name:''}}</td>
                            <td>
                                {{quote.supplier_contact_phone?quote.supplier_contact_phone:''}}
                            </td>
                            <td>{{quote.created_at}}</td>
                        </tr>
                    </table>
                    <el-pagination
                            background
                            @current-change="yilan_handleCurrentChange"
                            layout="prev, pager, next"
                            :current-page.sync="yilan_currentPage"
                            :total="yilan_collection.total"
                    ></el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
        <!--自动报价-->
        <el-dialog :title="$t('Inquery.index.n')" :visible.sync="dialogVisible_ph" width="25%">
            <el-form :label-width="$i18n.locale=='cn'?'80px':'170px'" label-position="left">
                <el-form-item :label="$t('Inquery.index.n')" :required="true">
                    <el-input v-model="prebatch_no" disabled size="mini"></el-input>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="generatePrebatchNo()"
                    >{{$t('Inquery.index.n')}}</el-button>
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
        <!--更改名称-->
        <el-dialog :title="$t('Inquery.index.edit_name')" :visible.sync="show_edit_name" width="50%">
            <el-form :label-width="$i18n.locale=='cn'?'80px':'170px'" label-position="left">
                <el-form-item label="cas">
                    <el-input v-model="names.cas" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <el-form :label-width="$i18n.locale=='cn'?'80px':'170px'" label-position="left">
                <el-form-item :label="$t('Inquery.index.name')">
                    <el-input v-model="names.name" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <el-form :label-width="$i18n.locale=='cn'?'80px':'170px'" label-position="left">
                <el-form-item :label="$t('Inquery.index.name_cn')">
                    <el-input v-model="names.name_cn" size="mini"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="show_edit_name = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_edit_name"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <!--库-->
        <el-dialog :title="$t('Inquery.index.ku')" :visible.sync="dialogVisible_ku" width="90%">
            <el-row :gutter="10">
                <el-col :span="7" >
                    <table v-if="specs.length>0" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th class="td">{{$t('Inquery.index.table5_title1')}}</th>
                            <th class="td">{{$t('Inquery.index.table5_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table5_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table5_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table5_title5')}}</th>
                        </tr>
                        <tr v-for="spec in specs" :key="spec.id">
                            <td>{{attr(spec,'brand.name')}}</td>
                            <td><span v-if="spec.pack_number">{{spec.pack_number}}*</span>{{spec.pack_size}}{{units_ku[spec.pack_unit_id].name}}</td>
                            <td>{{spec.purity}}</td>
                            <td>{{spec.inland_price}}</td>
                            <td>{{spec.abroad_price}}</td>
                        </tr>
                    </table>
                    <el-input
                            v-if="textarea"
                            type="textarea"
                            :rows="4"
                            placeholder=""
                            v-html="textarea">
                    </el-input>
                </el-col>
                <el-col :span="17" >
                    <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                        <tr>
                            <th class="td">{{$t('Inquery.index.table6_title0')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title1')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table3_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title13')}}</th>
                            <th class="td" width="80">{{$t('Inquery.index.table6_title3')}}</th>
                            <th v-if="user_type!=102" class="td">{{$t('Inquery.index.table6_title4')}}</th>
                            <th v-if="user_type!=102" class="td">{{$t('Inquery.index.table6_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title7')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title8')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title10')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title11')}}</th>
                            <th class="td">{{$t('Inquery.index.table6_title12')}}</th>
                        </tr>
                        <tr v-for="inventory in inventory_total" :key="inventory.id">
                            <td>{{getEnumValue(GEnums.InvoiceInfo, attr(inventory,'order.invoice_type_id'))}}</td>
                            <td>{{attr(inventory,'warehouse.name')}}</td>
                            <td>{{inventory.created_at.slice(0,10)}}</td>
                            <td>{{inventory.batchno}}</td>
                            <td>{{inventory.purchaseorder_no}}</td>
                            <td>{{inventory.purity}}</td>
                            <td v-if="user_type!=102">{{attr(inventory,'supplier.name')}}</td>
                            <td v-if="user_type!=102">{{inventory.original_stock}}{{getEnumValue(units_ku,inventory.original_stock_unit_id)}}</td>
                            <td>{{getEnumValue(enums_ku.ChemicalAppearance,inventory.chemprodappearance_id)}}</td>
                            <td><span v-if="inventory.qualityorder&&inventory.qualityorder.updated_at">{{(attr(inventory,'qualityorder.updated_at')).slice(0,10)}}</span>
                                <br>
                                {{getEnumValue(enums_ku.quality_check_results,attr(inventory,'qualityorder.result'))}}</td>
                            <td>{{attr(inventory,'purchase.name')}}</td>
                            <td>{{inventory.stock}}{{units_ku[inventory.base_unit_id].name}}</td>
                            <td>{{inventory.order?inventory.order.price:''}}{{inventory.order?getEnumValue(enums_ku.Currency,inventory.order.currency_id):''}}/{{inventory.order?getEnumValue(enums_ku.units,inventory.order.quantity_unit):''}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </el-col>
            </el-row>
        </el-dialog>
        <!--变更记录-->
        <el-dialog :title="$t('Inquery.index.change')" :visible.sync="dialogVisible_change" width="40%">
            <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                <tr>
                    <th class="td">{{$t('Inquery.index.table7_title1')}}</th>
                    <th class="td">{{$t('Inquery.index.table7_title2')}}</th>
                </tr>
                <tr v-for="change in changes" :key="change.id">
                    <td>{{change.price_string}}</td>
                    <td>{{change.datetime}}</td>
                </tr>
            </table>
        </el-dialog>
        <!--指派采购-->
        <el-dialog title="指派采购" :visible.sync="dialogVisible_zhipai" width="25%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="指派采购">
                    <el-select v-model="purchaseuser_id" clearable filterable size="mini" placeholder="采购员">
                        <el-option v-for="(i) in purchases" :disabled="i.status==0" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible_zhipai = false">取 消</el-button>
                <el-button size="mini" type="primary" :loading="loading" @click="save_purchases">确 定</el-button>
              </span>
        </el-dialog>
        <!--放弃报价-->
        <el-dialog
                :title="$t('Inquery.index.abandon')"
                :visible.sync="dialogVisible_abandon"
                width="25%"
        >
            <el-form :label-width="$i18n.locale=='cn'?'80px':'150px'" label-position="left">
                <el-form-item :label="$t('Inquery.index.cancel_reason')" :required="true">
                    <el-select
                            v-model="cancel_reason_id"
                            clearable
                            filterable
                            size="mini"
                            :placeholder="$t('Inquery.index.cancel_reason')"
                    >
                        <el-option
                                v-for="(i,index) in GEnums.InquiryCancelReason"
                                :key="index"
                                :label="i.name"
                                :value="i.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_abandon = false">{{$t('cancel')}}</el-button>
        <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="save_abandon"
        >{{$t('save')}}</el-button>
      </span>
        </el-dialog>
        <!--选用-->
        <el-dialog
                :title="$t('Inquery.index.selectd')"
                :visible.sync="dialogVisible_select"
                width="90%"
                @close="close_select"
        >
            <form4
                    :id="select_id"
                    :cas="cas"
                    :inquery_id="inquery_id"
                    :country_code="country_code"
                    :cust_id="cust_id"
                    :prod_id="select_prod_id"
                    @refresh="refresh"
                    @get_html="get_html($event)"
                    :select_time="select_time"
            ></form4>
        </el-dialog>
        <!--销售报价-->
        <el-dialog
                :title="$t('Inquery.index.sale_price')"
                :visible.sync="dialogVisible_select_sale"
                @closed="close_select_sale"
                width="90%"
        >
            <form4sale
                    :id="select_id"
                    :inquery_id="inquery_id"
                    :cas="cas"
                    :country_code="country_code"
                    :cust_id="cust_id"
                    :prod_id="select_prod_id"
                    @refresh="refresh"
                    @get_html="get_html($event)"
                    :time_sale="time_sale"
            ></form4sale>
        </el-dialog>
        <!--预览-->
        <el-dialog :title="$t('Inquery.index.email')" :visible.sync="dialogVisible_email">
            <div v-html="html"></div>
        </el-dialog>
        <!-- 生成MSDS文件 -->
        <el-dialog
                :title="$t('wareHouse.ship.ship38')"
                :visible.sync="dialogVisible_msds"
                width="50%"
                class="create_MSDS"
        >
            <el-form label-width="150px">
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$t('wareHouse.ship.ship28')"><!-- 产品名称 -->
                            <el-input size="mini" v-model="msds_data.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item :label="$t('wareHouse.ship.ship39')"><!-- 产品编码 -->
                            <el-input size="mini" v-model="msds_data.prodno"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="CAS"><!-- 全选 -->
                            <el-input size="mini" v-model="msds_data.cas"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Formula">
                            <el-input size="mini" v-model="msds_data.mf"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Weight">
                            <el-input size="mini" v-model="msds_data.mw"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Appearance">
                            <el-input size="mini" v-model="msds_data.appearance"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Melting">
                            <el-input size="mini" v-model="msds_data.mp"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Boiling">
                            <el-input size="mini" v-model="msds_data.bp"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Flash">
                            <el-input size="mini" v-model="msds_data.fp"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="Ignition Temperature">
                            <el-input size="mini" v-model="msds_data.it"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('wareHouse.ship.ship40')"><!-- 性状 -->
                            <el-input size="mini" v-model="msds_data.trait"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('wareHouse.ship.ship41')"><!-- 日期 -->
                            <el-input size="mini" v-model="msds_data.created_at"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="dangerous.is_dangerous==1">
                    <el-col :span="24">
                        <el-form-item label="危险品">
                            <el-switch
                                    v-model="msds_data.is_dangerous"
                                    :active-value='1'
                                    :inactive-value='0'
                                    @change="dangerous_change()"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="msds_data.is_dangerous==1">
                        <el-form-item label="uncode">
                            <el-input size="mini" disabled v-model="dangerous.uncode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="msds_data.is_dangerous==1">
                        <el-form-item label="packinggroup">
                            <el-input size="mini" disabled v-model="dangerous.packinggroup"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="msds_data.is_dangerous==1">
                        <el-form-item label="hazardclass">
                            <el-input size="mini" disabled v-model="dangerous.hazardclass"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="translate_(msds_data)" size="mini">{{$t('wareHouse.ship.ship43')}}</el-button><!-- 翻 译 -->
                <el-button @click="close_msds()" size="mini">{{$t('cancel')}}</el-button><!-- 取 消 -->
                <el-button type="primary" @click="add_msds(msds_data)" size="mini">生成</el-button><!-- 生 成 -->
            </span>
        </el-dialog>
        <!-- 艾康新增 -->
        <el-dialog :visible.sync="viewVisible_add_Ak" width="50%" @close="close_Add()" class="dialog">
            <addAk @close_Add='close_Add()' :coa_cas='coa_cas' ref="addAk"></addAk>
        </el-dialog>
        <!-- 安勤新增 -->
        <el-dialog :visible.sync="viewVisible_add_Aq" width="50%" @close="close_Add()" class="dialog">
            <addAq @close_Add='close_Add()' :coa_cas='coa_cas' ref="addAq"></addAq>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :current-page.sync="currentPage"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>


<script>
    import {
        delFiles,
        inquiry_lists,
        country_list,
        customer_lists,
        ProdProvidedCompanies,
        assignedPurchase,
        markAbandon,
        generatePrebatchNo_customer_id,
        savePrebatchNo,
        updateAtlas,
        updateCoa,
        updateMsds,
        getQuoteHistoryByProdId,
        getInstore,
        send,
        getLogs,
        previewEmail,
        getOutPriceLogs,
        update_supplier_Coa,
        search_menu,
        getOtherPrices,
        changeProdName,
        assignedSaler,
        msds,
        msds_generate,
        coa_create,
        downSupplierPriceExcel
    } from "@/api/Inquery";
    import {
        generatecoa,
        search_coa,
        // coa_create,
        coa_approve,
        coa_review,
        coa_generate,
    } from "@/api/quality";
    import { getDate } from "@/utils/index";
    import Big from "@/big/a/big.mjs";
    import $ from "jquery";
    import search from "@/components/search/index";
    import form1 from "../comments/form1";//采购报价
    import form4sale from "../comments/form4sale";//销售报价
    import form3 from "../comments/form3";//生成订单
    import form4 from "../comments/form4";//选用
    import form5 from "../comments/form5";//编辑
    import addAk from "../comments/add_ak";//艾康
    import addAq from "../comments/add_aq";//艾康
    import util from "@/libs/util";
    import request from "@/plugin/axios";
    import { translate } from "@/api/prod";
    export default {
        name: "Inquery-inqueryStock",
        components: {
            form1,
            form4sale,
            form3,
            form4,
            form5,
            addAk,
            addAq,
            search
        },
        data() {
            return {
                url:process.env.VUE_APP_API,
                permissions: JSON.parse(localStorage.getItem("permissions")),//权限集合
                cookie_name: this.$route.name,//cookie名称
                user_name:'',//登录人名称
                queryList: {
                    page: "1",
                    is_old: "",
                    all_search: []
                },//搜索条件
                box: "",//滚动位置标记
                //加载动画变量
                loading_search: false,
                loading: false,
                //分页变量
                currentPage: 1,
                historys_currentPage: 1,
                //列表数据
                list: [],
                //枚举
                suppliers_feishijiguonei:[],
                suppliers_feishijiguowai:[],
                suppliers_shijigongsi:[],
                purchases:[],
                units_ku:[],
                enums_ku: {},
                country: [],
                customer: [],
                historys: [],
                history_price_activeName:'first',
                historys_collection:[],
                historys_no_collection:[],
                historys_currentPage:1,
                historys_no_currentPage:1,
                inventory_total: [],
                logs: [],
                specs: [],
                changes: [],
                purchaseuser_id:'',
                template_info:[],
                //弹层显示隐藏变量
                viewVisible_add_Aq:false,
                viewVisible_add_Ak:false,
                dialogVisible_msds:false,
                dialogVisible: false,
                dialogVisible_order: false,
                dialogVisible_updateAtlas: false,
                dialogVisible_updateFiles: false,
                dialogVisible_updateMsds: false,
                dialogVisible_history: false,
                dialogVisible_ph: false,
                dialogVisible_ku: false,
                dialogVisible_change: false,
                dialogVisible_abandon: false,
                dialogVisible_zhipai: false,
                dialogVisible_select: false,
                dialogVisible_select_sale: false,
                dialogVisible_log: false,
                dialogVisible_edit: false,
                dialogVisible_email: false,
                dialogVisible_zhipai: false,
                dialogVisible_update_supplier_Coa: false,
                show_edit_name: false,
                show_edit_assignsalername: false,
                //coa/atlas/msds用到的变量
                supplier_Coa_id: "",
                supplier_coa: "",
                Atlas: [],
                coa: [],
                Msds: [],
                Atlas_id: "",
                Coa_id: "",
                Msds_id: "",
                upload_api: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/uploadFile",
                upload_api_coa: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/updateCoa",
                upload_api_msds: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/updateMsds",
                upload_api_atlas: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/updateAtlas",
                fileList: [],
                msds_data:{},
                //保存数据时用到的变量
                id: "",
                user_id: "",
                member_id:'',
                cas: "",
                user_type: "",
                purchaseuser_id: "",
                history_id: "",
                prebatch_no: "",
                customer_id: "",
                time: "",
                time_sale: "",
                select_id: "",
                inquery_id: "",
                select_prod_id: "",
                cancel_reason_id: "",
                html: "",
                customer_id: "",
                quantity: "",
                specification: "",
                country_code: "",
                cust_id: "",
                note: "",
                cas: "",
                assignsaler_id: "",
                saler_id: "",
                textarea: "",
                quote_id: "",
                order_prod_id:"",
                dangerous:'',
                coa_cas:'',
                //利用动态时间戳触发子组件事件
                now: new Date().getTime(),
                edit_time: "",
                procure_time: "",
                select_time: "",
                order_time: "",
                //高级搜索用到的变量
                menu: {},
                menu_two: {},
                menu_three: {},
                search_one: "",
                search_two: "",
                search_three: "",
                search_content: "",
                show_menu_three: false,
                //更改产品信息
                names: {
                    id: "",
                    cas: "",
                    name: "",
                    name_cn: ""
                },
                activeName:'first',
                yilan_collection:[],
                yilan_currentPage:1,
                params:{
                    inquiry_id:''
                },
                loading_export:false,
                export_url:''
            };
        },
        created() {
            let that=this
            document.onkeydown = function(e) {
                var key = window.event.keyCode;
                if (key == 13) {
                    that.search()
                }
            }
            let obj = {
                language: util.cookies.get("language")
            };
            search_menu(obj).then(res => {
                that.menu = res.data;
            });
            that.user_type = util.cookies.get("user_type");
            that.user_id = util.cookies.get("user_id");
            that.user_name=util.cookies.get('user_name')
            that.member_id=util.cookies.get('member_id')
            that.fetchData();
        },
        watch: {
            $route(to, from) {
                if (from.name == "Inquery-add"&&to.name==this.$route.name) {
                    this.fetchData();
                } else if (from.name == "Inquery-add_edit"&&to.name==this.$route.name) {
                    this.refresh();
                } else {
                    if (localStorage.getItem(this.$route.name + "scroll")) {
                        this.$refs.a.$children[0].$el.firstElementChild.scrollTop = localStorage.getItem(
                            this.$route.name + "scroll"
                        );
                    }
                }
            }
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
        mounted() {
            this.box = this.$refs.a.$children[0].$el.firstElementChild;
            this.box.addEventListener("scroll", this.handleScroll, true);
        },
        methods: {
            //获取列表数据
            fetchData(a) {
                if (localStorage.getItem(this.$route.name)) {
                    this.queryList.all_search = JSON.parse(
                        localStorage.getItem(this.$route.name)
                    )
                }
                inquiry_lists(this.queryList).then(res => {
                    if (this.loading_search) {
                        this.$message({
                            message: "success",
                            type: "success"
                        });
                        this.loading_search = false;
                    }
                    res.data.data.forEach((items, index) => {
                        var reg = /[;]/g;
                        items.quotes.forEach((m,n)=>{
                            m.info_string=m.info_string.replace(reg,"$&<br>");
                        })
                        if(items.outprice&&items.outprice.price_string){
                            items.outprice.price_string=items.outprice.price_string.replace(reg,"$&<br>");
                        }
                        if (items.chemprod) {
                            if (items.chemprod.img) {
                                items.chemprod.img =
                                    items.chemprod.img.substr(0, 4).toLowerCase() == "http"
                                        ? items.chemprod.img
                                        : process.env.VUE_APP_API + items.chemprod.img;
                            }
                        }
                    });
                    this.list = res.data;
                    this.purchases = res.enum.purchases;
                    if (a) {
                        document.getElementById("id").scrollIntoView();
                    }
                });
                country_list().then(res => {
                    this.country = res.data;
                });
            },
            handleClick(tab, event){
                console.log(tab.label)
            },
            copy(item){
                var input=document.getElementById(item.id);
                input.value=(item.name_cn?item.name_cn+'\n':'')+(item.name?item.name+'\n':'')+(item.cas?item.cas+'\n':'')+(item.quantity?item.quantity:'')
                input.select();
                document.execCommand("Copy");
            },
            //新增艾康安勤COA
            Add_ak(item) {
                this.coa_cas = item.cas
                this.viewVisible_add_Ak = true;
            },
            Add_aq(item) {
                this.coa_cas = item.cas
                this.viewVisible_add_Aq = true;
            },
            close_Add() {
                this.viewVisible_add_Ak = false;
                this.viewVisible_add_Aq = false;
                this.coa_cas = ''
                if(this.$refs.addAk){
                    this.$refs.addAk.close_Add_child()
                }
                if(this.$refs.addAq){
                    this.$refs.addAq.close_Add_child()
                }

            },
            //生成Msds
            Msds_click(id,item){
                var obj = {
                    prod_id:id
                }
                if(item.chemprod){
                    this.dangerous = {
                        is_dangerous:JSON.parse(JSON.stringify(item.chemprod.is_danger)),
                        uncode:item.chemprod.property.uncode,
                        packinggroup:item.chemprod.property.packinggroup,
                        hazardclass:item.chemprod.property.hazardclass
                    }
                    if(item.chemprod.property.uncode&&item.chemprod.property.uncode.indexOf('na')>-1){
                        this.dangerous.is_dangerous = 0
                    }
                    msds(obj).then(res => {
                        if (res && res.code == 0) {
                            this.msds_data = {
                                name: res.data.prod_info.name,
                                prodno: res.data.prod_info.prodno,
                                cas: res.data.prod_info.cas,
                                mf: res.data.prod_info.mf,
                                mw: res.data.prod_info.mw,
                                appearance: res.data.appearance,
                                mp: res.data.prod_info.property?res.data.prod_info.property.mp:'',
                                bp: res.data.prod_info.property?res.data.prod_info.property.bp:'',
                                fp: res.data.prod_info.property?res.data.prod_info.property.flashpoint:'',
                                it: res.data.prod_info.property?res.data.prod_info.property.uncode:"",
                                trait: res.data.prod_info.property?res.data.prod_info.property.specificity:'',
                                created_at: res.data.createdate,
                                type: 'inquiry_kd',
                                is_dangerous:1
                            }
                            if(!this.msds_data.it){
                                this.msds_data.it='no data available'
                            }
                            this.template_info = res.enum.template_info
                            this.dialogVisible_msds = true;
                            if(this.dangerous.is_dangerous){
                                this.msds_data.uncode = this.dangerous.uncode
                                this.msds_data.packinggroup = this.dangerous.packinggroup
                                this.msds_data.hazardclass = this.dangerous.hazardclass
                            }
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    }).catch(rr => {});
                }else{
                    this.$message({
                        message: '没有产品',
                        type: 'error'
                    })
                }

            },
            dangerous_change(){
                if(this.msds_data.is_dangerous){
                    this.msds_data.uncode = this.dangerous.uncode
                    this.msds_data.packinggroup = this.dangerous.packinggroup
                    this.msds_data.hazardclass = this.dangerous.hazardclass
                }else{
                    delete this.msds_data.uncode
                    delete this.msds_data.packinggroup
                    delete this.msds_data.hazardclass
                }
            },
            add_msds(item) {
                if(!item.it){
                    item.it='no data available'
                }
                if(this.dangerous.is_dangerous==1){
                    if(this.msds_data.is_dangerous==1){
                        if(this.dangerous.uncode&&this.dangerous.packinggroup&&this.dangerous.hazardclass){
                            msds_generate(item, this);
                        }else{
                            this.$message({
                                message: "uncode、packinggroup和hazardclass不能为空",
                                type: "error"
                            });
                        }
                    }else{
                        msds_generate(item, this);
                    }
                }else{
                    delete this.msds_data.is_dangerous
                    delete this.msds_data.uncode
                    delete this.msds_data.packinggroup
                    delete this.msds_data.hazardclass
                    msds_generate(item, this);
                }
            },
            close_msds() {
                this.dialogVisible_msds = false;
                this.dangerous = {}
                this.msds_data = {}
            },
            translate_(item){
                var a = /[\u4E00-\u9FA5]/i
                for(let i in item){
                    if(a.test(item[i])){
                        translate("zh", "en", item[i]).then(res => {
                            item[i] = res.data.result.result;
                            this.$set(item, i, res.data.result.result);
                        });
                    }
                }
            },
            //指派采购
            zhipai_purchaseuser(item) {
                this.dialogVisible_zhipai = true;
                this.purchaseuser_id = item.purchaseuser_id;
                this.id = item.id;
            },
            save_purchases() {
                this.dialogVisible_zhipai = false;
                let obj = {
                    inquiry_id: this.id,
                    purchaseuser_id: this.purchaseuser_id,
                };
                assignedPurchase(obj, this);
            },
            //导入
            import_go() {
                this.$router.push({
                    path: "/Inquery/import",
                    name: "Inquery-import"
                });
            },
            //追加询单页面
            add_inquery() {
                let str = this.$route.name;
                let num = str.charAt(new Big(str.length).minus(1));
                if (num === "y") {
                    num = 1;
                }
                num++;
                this.$router.push({
                    path: "/Inquery/inquery" + num,
                    name: "Inquery-inquery" + num
                });
            },
            //滚动至原位置
            handleScroll() {
                var hei = this.$refs.a.$children[0].$el.firstElementChild.scrollTop;
                localStorage.setItem(this.$route.name + "scroll", hei);
            },
            //新建询单
            add() {
                let that=this
                that.$router.push({
                    path: "/Inquery/add",
                    name: "Inquery-add",
                    query:{
                        cookie_name:that.cookie_name
                    }
                });
            },
            export_go(){
                let that = this;
                this.queryList.page = 1;
                this.currentPage = 1;
                this.$nextTick(function() {
                    if (
                        !this.$refs.search.search_one &&
                        !this.$refs.search.search_two &&
                        this.$refs.search.search_content
                    ) {
                        this.queryList.all_search = [];
                        this.queryList.all_search.push({
                            search_one: "cas",
                            search_two: "dy",
                            search_content: this.$refs.search.search_content,
                            name:
                            this.menu["cas"].name + "等于" + this.$refs.search.search_content
                        });
                        localStorage.setItem(this.$route.name, JSON.stringify(this.queryList.all_search));
                        this.$refs.search.refresh();
                    } else {
                        if (
                            this.$refs.search.search_one &&
                            this.$refs.search.search_two &&
                            this.$refs.search.search_content
                        ) {
                            this.queryList.all_search = [];
                            if (this.$refs.search.show_menu_three) {
                                this.queryList.all_search.push({
                                    search_one: this.$refs.search.search_one,
                                    search_two: this.$refs.search.search_two,
                                    search_content: this.$refs.search.search_content,
                                    name:
                                    this.menu[this.$refs.search.search_one].name +
                                    this.$refs.search.menu_two[this.$refs.search.search_two] +
                                    this.$refs.search.menu_three[this.$refs.search.search_content]
                                });
                                localStorage.setItem(this.$route.name, JSON.stringify(this.queryList.all_search));
                                this.$refs.search.refresh();
                            } else {
                                this.queryList.all_search.push({
                                    search_one: this.$refs.search.search_one,
                                    search_two: this.$refs.search.search_two,
                                    search_content: this.$refs.search.search_content,
                                    name:
                                    this.menu[this.$refs.search.search_one].name +
                                    this.$refs.search.menu_two[this.$refs.search.search_two] +
                                    this.$refs.search.search_content
                                });
                                localStorage.setItem(this.$route.name, JSON.stringify(this.queryList.all_search));
                                this.$refs.search.refresh();
                            }
                        }
                    }
                });
                downSupplierPriceExcel(this.queryList).then(res=>{
                    this.loading_export = true
                    if (res && res.code === 0) {
                        this.export_url = res.data
                        setTimeout(() => {
                            this.$refs.export_url.click()
                            this.loading_export = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_export = false
                    }
                }).catch(rr => {
                    this.loading_export = false
                })
            },
            //搜索
            search() {
                let that = this;
                this.queryList.page = 1;
                this.loading_search = true;
                this.currentPage = 1;
                this.$nextTick(function() {
                    if (
                        !this.$refs.search.search_one &&
                        !this.$refs.search.search_two &&
                        this.$refs.search.search_content
                    ) {
                        this.queryList.all_search = [];
                        this.queryList.all_search.push({
                            search_one: "cas",
                            search_two: "dy",
                            search_content: this.$refs.search.search_content,
                            name:
                            this.menu["cas"].name + "等于" + this.$refs.search.search_content
                        });
                        localStorage.setItem(this.$route.name, JSON.stringify(this.queryList.all_search));
                        this.$refs.search.refresh();
                    } else {
                        if (
                            this.$refs.search.search_one &&
                            this.$refs.search.search_two &&
                            this.$refs.search.search_content
                        ) {
                            this.queryList.all_search = [];
                            if (this.$refs.search.show_menu_three) {
                                this.queryList.all_search.push({
                                    search_one: this.$refs.search.search_one,
                                    search_two: this.$refs.search.search_two,
                                    search_content: this.$refs.search.search_content,
                                    name:
                                    this.menu[this.$refs.search.search_one].name +
                                    this.$refs.search.menu_two[this.$refs.search.search_two] +
                                    this.$refs.search.menu_three[this.$refs.search.search_content]
                                });
                                localStorage.setItem(this.$route.name, JSON.stringify(this.queryList.all_search));
                                this.$refs.search.refresh();
                            } else {
                                this.queryList.all_search.push({
                                    search_one: this.$refs.search.search_one,
                                    search_two: this.$refs.search.search_two,
                                    search_content: this.$refs.search.search_content,
                                    name:
                                    this.menu[this.$refs.search.search_one].name +
                                    this.$refs.search.menu_two[this.$refs.search.search_two] +
                                    this.$refs.search.search_content
                                });
                                localStorage.setItem(this.$route.name,JSON.stringify(this.queryList.all_search));
                                this.$refs.search.refresh();
                            }
                        }
                    }
                });
                this.fetchData();
            },
            //刷新页面单条数据
            refresh(type) {
                this.dialogVisible = false;
                this.dialogVisible_edit = false;
                this.dialogVisible_select = false;
                this.dialogVisible_select_sale = false;
                this.dialogVisible_order = false;
                if (type == "iz_zhipai") {
                    let queryList = {
                        all_search: [
                            {
                                search_one: "id",
                                search_two: "dy",
                                search_content: this.id
                            }
                        ],
                        iz_zhipai: 1
                    };
                    inquiry_lists(queryList).then(res => {
                        if (res.code == 0) {
                            this.list.data.forEach((items, index) => {
                                if (items.id == this.id) {
                                    this.list.data[index] = res.data.data[0];
                                    this.$forceUpdate();
                                }
                            });
                        }
                    });
                } else {
                    let queryList = {
                        all_search: [
                            {
                                search_one: "id",
                                search_two: "dy",
                                search_content: this.id
                            }
                        ]
                    };
                    inquiry_lists(queryList).then(res => {
                        if (res.code == 0) {
                            this.list.data.forEach((items, index) => {
                                if (items.id == this.id) {
                                    this.list.data[index] = res.data.data[0];
                                    this.$forceUpdate();
                                }
                            });
                        }
                    });
                }
            },
            //克隆询单
            clone_inquery(item) {
                this.$router.push({
                    path: "/Inquery/add",
                    name: "Inquery-add",
                    query: {
                        id: item.id
                    }
                });
            },

            //采购报价
            price(id, quantity, specification, note,cas,prod_id) {
                this.cas = cas;
                this.quantity = quantity;
                this.specification = specification;
                this.note = note;
                this.select_prod_id=prod_id
                this.procure_time = new Date().getTime();
                this.id = id;
                this.dialogVisible = true;
            },
            //销售报价
            sale_direct_price(id, prod_id, country_code, cust_id, cas) {
                this.inquery_id=id,
                    this.cas = cas;
                this.cust_id = cust_id;
                if (country_code) {
                    this.country_code = country_code;
                }
                (this.select_id = id), (this.select_prod_id = prod_id);
                this.time_sale = new Date().getTime();
                this.dialogVisible_select_sale = true;
            },
            //询单成交
            order(id, customer_id,prod_id) {
                this.order_time = new Date().getTime();
                this.id = id;
                this.order_prod_id=prod_id;
                this.customer_id = customer_id;
                this.dialogVisible_order = true;
            },
            //结构
            show_img(now) {
                this.now = new Date().getTime();
            },
            //变更记录
            change(id) {
                getOutPriceLogs(id).then(res => {
                    if (res && res.code == 0) {
                        this.changes = res.data;
                    }
                });
                this.dialogVisible_change = true;
            },
            //编辑询单
            edit_inquery(id) {
                let that = this;
                that.id = id;
                that.$router.push({
                    path: "/Inquery/add_edit",
                    name: "Inquery-add_edit",
                    query: {
                        id: id,
                        cookie_name: that.cookie_name
                    }
                });
            },
            //历史报价
            history(cas){
                this.historys_collection=[]
                this.historys_no_collection=[]
                this.yilan_collection=[]
                this.dialogVisible_history=true
                this.history_id=cas
                let obj={
                    spider:1
                }
                getQuoteHistoryByProdId(cas,obj).then(res=>{
                    if(res&&res.code==0){
                        this.historys_collection=res.data
                    }
                })
                let obj_no={
                    spider:0
                }
                getQuoteHistoryByProdId(cas,obj_no).then(res=>{
                    if(res&&res.code==0){
                        this.historys_no_collection=res.data
                    }
                })
                let that=this
                $.ajax({
                    url: 'http://www.buysellchem.com/api/dataout/getHistoryPrice?cas='+cas+'&page=1',
                    method:'get',
                    success: function (res) {
                        if(res.code==0){
                            that.yilan_collection=res
                        }
                    },
                    headers: {
                        "Version-Number":process.env.VUE_APP_Version
                    }
                });
            },
            yilan_handleCurrentChange(page_current){
                this.yilan_currentPage = page_current;
                let obj={
                    page:this.yilan_currentPage
                }
                let that=this
                $.ajax({
                    url: 'http://www.buysellchem.com/api/dataout/getHistoryPrice?cas='+this.history_id+'&page='+page_current,
                    method:'get',
                    success: function (res) {
                        if(res.code==0){
                            that.yilan_collection=res
                        }
                    },
                    headers: {
                        "Version-Number":process.env.VUE_APP_Version
                    }
                });
            },
            //获取可供货供应商信息
            get_supplier(cas) {
                let obj = {
                    cas: cas
                };
                ProdProvidedCompanies(obj).then(res => {
                    this.suppliers_feishijiguonei=res.datas.feishijiguonei
                    this.suppliers_feishijiguowai=res.datas.feishijiguowai
                    this.suppliers_shijigongsi=res.datas.shijigongsi
                });
            },
            //库
            ku(id, cas) {
                this.inventory_total=[]
                this.specs=[]
                this.textarea=[]
                this.dialogVisible_ku = true;
                getInstore(id).then(res => {
                    if (res && res.code == 0) {
                        this.inventory_total = res.data.inventories;
                        this.specs = res.data.specs;
                        this.units_ku=res.enum.units
                        this.enums_ku=res.enum
                    }
                });
                getOtherPrices(cas).then(res => {
                    this.textarea = res.data;
                });
            },
            //预占批号
            get_inquiry_id_ph(id, prebatch_no, customer_id) {
                this.prebatch_no = prebatch_no ? prebatch_no : "";
                this.dialogVisible_ph = true;
                this.id = id;
                this.customer_id = customer_id;
            },
            //自动报价
            generatePrebatchNo() {
                let obj = {
                    customer_id: this.customer_id
                };
                generatePrebatchNo_customer_id(obj).then(res => {
                    this.prebatch_no = res.data;
                });
            },

            //编辑产品信息
            edit_name(id, cas, name, name_cn) {
                this.show_edit_name = true;
                this.id = id;
                this.names.id = id;
                this.names.cas = cas;
                this.names.name = name;
                this.names.name_cn = name_cn;
            },
            //保存产品信息
            save_edit_name() {
                changeProdName(this.names, this);
            },
            //变更销售员
            edit_assignsalername(id, assignsaler_id) {
                this.show_edit_assignsalername = true;
                this.id = id;
                this.assignsaler_id = assignsaler_id;
            },
            //保存变更销售员
            save_sellers() {
                let obj = {
                    inquiry_id: this.id,
                    assignsaler_id: this.assignsaler_id
                };
                assignedSaler(obj, this);
            },
            //关闭选用
            close_select() {
                let queryList = {
                    all_search: [
                        {
                            search_one: "id",
                            search_two: "dy",
                            search_content: this.inquery_id
                        }
                    ]
                };
                inquiry_lists(queryList).then(res => {
                    if (res.code == 0) {
                        this.list.data.forEach((items, index) => {
                            if (items.id == this.inquery_id) {
                                this.list.data[index] = res.data.data[0];
                                this.$forceUpdate();
                            }
                        });
                    }
                });
            },
            //关闭生成订单
            close_select_order() {
                let queryList = {
                    all_search: [
                        {
                            search_one: "id",
                            search_two: "dy",
                            search_content: this.id
                        }
                    ]
                };
                inquiry_lists(queryList).then(res => {
                    if (res.code == 0) {
                        this.list.data.forEach((items, index) => {
                            if (items.id == this.id) {
                                this.list.data[index] = res.data.data[0];
                                this.$forceUpdate();
                            }
                        });
                    }
                });
            },
            //关闭销售报价
            close_select_sale() {
                let queryList = {
                    all_search: [
                        {
                            search_one: "id",
                            search_two: "dy",
                            search_content: this.select_id
                        }
                    ]
                };
                inquiry_lists(queryList).then(res => {
                    if (res.code == 0) {
                        this.list.data.forEach((items, index) => {
                            if (items.id == this.select_id) {
                                this.list.data[index] = res.data.data[0];
                                this.$forceUpdate();
                            }
                        });
                    }
                });
            },
            //邮件弹层
            get_html(e) {
                this.html = e;
                this.dialogVisible_email = true;
                this.dialogVisible_select_sale = false;
                this.dialogVisible_select = false;
            },
            //供应商报价编辑
            edit(quote_id, inquery_id, quantity, specification, note, cas) {
                this.quote_id = quote_id;
                this.id = inquery_id;
                this.quantity = quantity;
                this.specification = specification;
                this.note = note;
                this.cas = cas;
                this.dialogVisible_edit = true;
                this.edit_time = new Date().getTime();
            },
            //供应商报价查看
            getLogs(id) {
                this.dialogVisible_log = true;
                getLogs(id).then(res => {
                    if (res && res.code == 0) {
                        this.logs = res.data;
                    }
                });
            },
            //供应商报价选中
            select(id, prod_id, country_code, cust_id, cas, inquery_id) {
                this.cust_id = cust_id;
                this.cas = cas;
                if (country_code) {
                    this.country_code = country_code;
                }
                this.select_id = id;
                this.inquery_id = inquery_id;
                this.select_prod_id = prod_id;
                this.select_time = new Date().getTime();
                this.dialogVisible_select = true;
            },
            //供应商报价标记为优势报价
            select_flag(id, inquiry_id) {
                return request({
                    url:
                    "api/v1/inquiry/PurchaseQuote/setAdvantage?id=" +
                    id +
                    "&inquiry_id=" +
                    inquiry_id,
                    method: "get"
                })
                    .then(res => {
                        if (res && res.code == 0) {
                            this.fetchData();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: "error"
                            });
                        }
                    })
                    .catch(rr => {});
            },

            //放弃报价展开选项
            beforeHandleCommand(id, cancel_reason_id) {
                return {
                    id: id,
                    cancel_reason_id: cancel_reason_id
                };
            },
            //选中放弃报价选项
            get_Abandon_id(command) {
                this.id = command.id;
                let obj = {
                    inquiry_id: this.id,
                    cancel_reason_id: command.cancel_reason_id
                };
                markAbandon(obj, this);
            },
            //保存放弃报价
            save_abandon() {
                this.dialogVisible_abandon = false;
                let obj = {
                    inquiry_id: this.id,
                    cancel_reason_id: this.cancel_reason_id
                };
                markAbandon(obj, this);
            },
            //保存自动报价
            save_prebatch_no() {
                let obj = {
                    inquiry_id: this.id,
                    prebatch_no: this.prebatch_no
                };
                savePrebatchNo(obj, this).then();
            },
            creatFiles(id,Coa,Msds,Atlas) {
                this.params.inquiry_id=id
                if (Coa == null) {
                    Coa = [];
                }
                this.Coa_id = id;
                this.coa =JSON.parse(JSON.stringify(Coa));

                if (Msds == null) {
                    Msds = [];
                }
                this.Msds_id = id;
                this.Msds =JSON.parse(JSON.stringify(Msds));

                if (Atlas == null) {
                    Atlas = [];
                }
                this.Atlas_id = id;
                this.Atlas =JSON.parse(JSON.stringify(Atlas));
                this.dialogVisible_updateFiles = true;
            },
            //供应商coa/图谱弹层
            suppler_creatCoa(id, Coa) {
                if (Coa == null) {
                    Coa = [];
                }
                this.supplier_Coa_id = id;
                this.supplier_coa = JSON.parse(JSON.stringify(Coa));
                this.dialogVisible_update_supplier_Coa = true;
            },
            //保存供应商coa
            save_update_supplier_Coa() {
                let obj = {
                    id: this.supplier_Coa_id,
                    supplier_coa: this.supplier_coa
                };
                update_supplier_Coa(obj, this);
            },
            //保存Atlas
            save_updateAtlas() {
                let obj = {
                    inquiry_id: this.Atlas_id,
                    atlas: this.Atlas
                };
                updateAtlas(obj, this);
            },
            //保存coa
            save_updateCoa() {
                let obj = {
                    inquiry_id: this.Coa_id,
                    coa: this.coa
                };
                updateCoa(obj, this);
            },
            //保存msds
            save_updateMsds() {
                let obj = {
                    inquiry_id: this.Msds_id,
                    msds: this.Msds
                };
                updateMsds(obj, this);
            },

            //限制上传文件数量
            handleExceed(files, fileList) {
                this.$i18n.locale == "cn"
                    ? this.$message.warning("当前限制选择1个文件")
                    : this.$message.warning("Current limit of 1 files");
            },
            //上传Atlas成功时回调
            handleAvatarSuccess_updateAtlas(res, file, fileList) {
                if (file.response.code == 0) {
                    this.Atlas.push({
                        filename: res.data.filename,
                        filepath: res.data.filepath,
                        origin: res.data.origin,
                    })
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            //上传供应商Coa成功时回调
            handleAvatarSuccess_update_supplier_Coa(res, file, fileList) {
                if (file.response.code == 0) {
                    this.supplier_coa.push({
                        filename: res.data.filename,
                        filepath: res.data.filepath,
                        origin: res.data.origin,
                        desc: res.data.origin
                    });
                    console.log(this.supplier_coa);
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            //上传Coa成功时回调
            handleAvatarSuccess_updateCoa(res, file, fileList) {
                if (file.response.code == 0) {
                    this.coa.push({
                        filename: res.data.filename,
                        filepath: res.data.filepath,
                        origin: res.data.origin
                    })
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            //上传Msds成功时回调
            handleAvatarSuccess_updateMsds(res, file, fileList) {
                if (file.response.code == 0) {
                    this.Msds.push({
                        filename: res.data.filename,
                        filepath: res.data.filepath,
                        origin: res.data.origin
                    })
                } else {
                    this.$message.error(file.response.msg);
                }
            },

            //移除文件
            beforeRemove(file, fileList) {
                return this.$i18n.locale == "cn"
                    ? this.$confirm(`确定移除 ${file.name}？`)
                    : this.$confirm(`Confirm removal ${file.name}？`);
            },
            //删除Atlas
            handleDel_Atlas(index,filename) {
                let that=this
                that.Atlas.forEach((items, i) => {
                    if (index == i) {
                        that.Atlas.splice(i, 1);
                        delFiles(that.params.inquiry_id,'atlas',filename)
                    }
                });
            },
            //删除供应商Coa
            handleDel_supplier_Coa(index) {
                let that=this
                that.supplier_coa.forEach((items, i) => {
                    if (index == i) {
                        that.supplier_coa.splice(i, 1);
                    }
                });
            },
            //删除Coa
            handleDel_Coa(index,filename) {
                let that=this
                that.coa.forEach((items, i) => {
                    if (index == i) {
                        that.coa.splice(i, 1);
                        delFiles(that.params.inquiry_id,'coa',filename)
                    }
                });
            },
            //删除Msds
            handleDel_Msds(index,filename) {
                let that=this
                that.Msds.forEach((items, i) => {
                    if (index == i) {
                        that.Msds.splice(i, 1);
                        delFiles(that.params.inquiry_id,'msds',filename)
                    }
                });
            },

            //改变分页
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData(true);
            },
            //改变历史记录分页
            historys_handleCurrentChange(page_current){
                this.historys_currentPage = page_current;
                let obj={
                    spider:1,
                    page:this.historys_currentPage
                }
                getQuoteHistoryByProdId(this.history_id,obj).then(res=>{
                    if(res&&res.code==0){
                        this.historys_collection=res.data
                    }
                })
            },
            historys_no_handleCurrentChange(page_current){
                this.historys_no_currentPage = page_current;
                let obj={
                    spider:0,
                    page:this.historys_no_currentPage
                }
                getQuoteHistoryByProdId(this.history_id,obj).then(res=>{
                    if(res&&res.code==0){
                        this.historys_no_collection=res.data
                    }
                })
            },
        }
    };
</script>


