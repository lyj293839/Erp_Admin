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
    /deep/ .el-checkbox{
        margin-right: 10px;
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
    .dialog_yao{
        /deep/.el-dialog__body{
            padding-bottom: 20px;
            padding-top: 0px;
        }
        .el-form-item{
            margin: 0px;
        }
    }
    .yaoshi_a{
        position: absolute;
        bottom: 0px;
        right: 5px;
        text-align: center;
        line-height: 20px;
        padding: 0px 10px;
        font-size: 12px;
        cursor: pointer;
    }
    .yaoshi_success{
        border: 1px solid #409EFF;
        color: #409EFF;
    }
    .yaoshi_fail{
        border: 1px solid red;
        color: red;
    }
    .yaoshi_no{
        color: white;
        background: #409EFF;
    }
    .w130{
        width: 130px;
    }
    .ml10{
        margin-left: 10px;
    }
    .el-icon-s-data{
        font-size: 16px;
        margin-left: 5px;
        cursor: pointer;
    }
    .Angene_MSDS{
        position: absolute;
        bottom: 21px;
        right: 5px;
        text-align: center;
        line-height: 20px;
        padding: 0px 6px;
        font-size: 12px;
        cursor: pointer;
        color: white;
        background: #409EFF;
    }
    .pdf{
        width: 800px;
        margin: 0 auto;
        color:black;
        padding: 40px 30px;
    }
    .pdf h1{
        text-align: center;
        font-size: 20px;
        letter-spacing: 50px;
    }
    .pdf h1 img{
        vertical-align: middle;
        width: 100px;
        margin-right: 30px;
        margin-bottom: 10px;
    }
    .pdf .el-row{
        margin: 6px;
    }
    .pdf table{
        margin-top: 30px;
    }
    .pdf table td{
        text-align: center;
    }

    /deep/ .pdf .el-input--mini {
        font-size: 12px;
        display: inline-block;
        width: 200px;
        padding: 0;
        font-size: 13px;
    }
    /deep/ .pdf .el-input--mini .el-input__inner {
        border: none;
        color:black
    }
    .w100{
        width: 100px!important;
    }
</style>
<style lang="scss" type="text/scss">
    .data-thead {
        background: #dae0e5;
    }
    .data-td-supplier {
        color: #95c5ed;
    }
    .data-td-instore {
        color: red;
        font-weight: bold;
    }
    .data-testitem {
        color:red;
        font-weight: bold;
    }

    .data-testitem1 {
        color: green;
        font-weight: bold;
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
                        @click="add"
                        v-if="permissions.indexOf(415)>-1"
                >{{$t('create')}}</el-button>
                <el-button
                        class="search_button"
                        type="primary"
                        size="mini"
                        @click="import_go"
                        v-if="permissions.indexOf(428)>-1"
                >{{$t('import')}}</el-button>
                <el-button
                        class="search_button"
                        type="primary"
                        size="mini"
                        @click="uploadGVK"
                        v-if="showGVK"
                >GVK下载</el-button>
                <el-tooltip placement="top">
                    <div slot="content">
                        <span>限制条件：1、只能导业务员自己名下的客户询单；2、只能导三天以内的询单；3、一次只能导一个客户的询单</span>
                    </div>
                    <el-button
                            class="search_button"
                            type="primary"
                            size="mini"
                            @click="export_go"
                            :loading="loading_export"
                            v-if="permissions.indexOf(682)>-1"
                    >{{$t('export_supplier_advantage')}}</el-button>
                </el-tooltip>
                <a :href="export_url" ref="export_url" hidden></a>
                <el-button
                        v-if="cookie_name!='Inquery-inquery10'"
                        class="search_button"
                        type="primary"
                        size="mini"
                        @click="add_inquery"
                >{{$t('add_inquery')}}</el-button>
                <el-button
                        v-if="permission_names['downloadInquiryOutPrice']=='downloadInquiryOutPrice'"
                        class="search_button"
                        type="warning"
                        size="mini"
                        @click="export_price"
                        style="position: fixed;z-index: 1;"
                >导出销售报价</el-button>
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
                :key="item.id +'card'"
                style="margin: 5px 0;"
        >
            <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                <tr  style="background: rgb(217, 211, 211);">
                    <!-- 询单信息 -->
                    <th class="td" width='130'>
                        <el-checkbox  v-if="permission_names['downloadInquiryOutPrice']=='downloadInquiryOutPrice'" v-model="item.checked"></el-checkbox>
                        {{$t('Inquery.index.table3_title9')}}
                        <el-tooltip class="item" effect="dark" content="重点询单" v-if="item.is_key==2" placement="top">
                            <i class="el-icon-s-flag" style="color:red;cursor: pointer;"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="点击标记为重点询单"  v-else placement="top">
                            <i class="el-icon-s-flag" @click="set_key_inquery(item.id)" style="color:rgb(54 58 62);cursor: pointer;"></i>
                        </el-tooltip>
                    </th>
                    <!-- 客户信息 -->
                    <th class="td" width='190'>
                        <el-badge v-if="item.statistics_saler_contracts&&item.statistics_saler_contracts!=''&&item.statistics_saler_contracts!=0" :value="item.statistics_saler_contracts" class="badge">
                        </el-badge>
                        {{$t('Inquery.index.table3_title10')}}</th>
                    <!-- 产品信息 -->
                    <th class="td" width="285" >
                        <span class="red bold" v-if="!item.prod_id">(产品不存在)</span><span class="red bold" v-if="item.chemprod&&attr(item,'chemprod.can_saled')!=1">({{attr(item,'chemprod.can_saled')==2?'不经营':(attr(item,'chemprod.can_saled')==3?'待定':'审核中')}})</span>
                        <span style="margin-right:5px;" v-if="attr(item,'chemprod.ffmsds.url')">
                            <a target="_blank"  :href="attr(item,'chemprod.ffmsds.url')" style="color:red;font-size:12px;">货代msds</a>
                         </span>
                        <span v-else>
                            <span style="margin-right:5px;" v-if="item.chemprod&&item.chemprod.msds_material">
                                <a target="_blank" v-if="item.chemprod.msds_material.filename.indexOf('http')>-1" :href="item.chemprod.msds_material.filename" style="color:red;font-size:12px;">货代msds</a>
                                <a target="_blank" :href="url+'storage/'+item.chemprod.msds_material.filename" style="color:red;font-size:12px;">货代msds</a>
                            </span>
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
                    <th class="td" width="150">{{$t('Inquery.index.table3_title12')}}</th>
                    <!-- 报价信息 -->
                    <th class="td">
                        <span v-if="attr(item,'chemprod.is_danger')==1" style="color: red;" class="danger">
                            {{attr(item,'chemprod.property.uncode')}}<span style="margin:0px 3px">,</span>
                            Class:{{attr(item,'chemprod.property.hazardclass')}}<span style="margin:0px 3px">,</span>
                            PG:{{attr(item,'chemprod.property.packinggroup')}}<span v-if="attr(item,'chemprod.property.limited_packing')" style="margin:0px 3px">,</span>
                            {{attr(item,'chemprod.property.limited_packing')}}{{getEnumValue(GEnums.Unit,attr(item,'chemprod.property.limited_packing_unit_id'))}}
                        </span>
                        {{$t('Inquery.index.table3_title13')}}
                        <span v-if="attr(item,'chemprod.is_danger')==0" class="danger">(非危)</span>
                        <span v-if="attr(item,'chemprod.is_danger')==null" class="danger">(未知)</span>
                    </th>
                    <th width="190" class="td" rowspan="2" style='text-align:left;background: white;'>
                        <!--销售报价-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="sale_direct_price(item.id,item.prod_id,attr(item,'country_code'),item.cust_id,item.cas)"
                                v-if="permissions.indexOf(422)>-1"
                        >{{$t('Inquery.index.sale_price')}}</el-button>
                        <!--采购报价-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="price(item.id,item.quantity,item.specification,item.note,item.cas,item.prod_id)"
                                v-if="(permissions.indexOf(435)>-1&&item.cust_id!=43599)||(permissions.indexOf(435)>-1&&item.cust_id==43599&&(attr(item,'purchaseuser.name')==user_name||user_name=='admin'||!item.purchaseuser))"
                        >{{$t('Inquery.index.procure')}}</el-button>
                        <!--供应商-->
                        <el-popover
                                placement="bottom-start"
                                title
                                width="1000"
                                trigger="click"
                                v-if="permissions.indexOf(148)>-1&&item.supplierprovided&&((user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80)"
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
                                            {{scope.row.company?scope.row.company.name:scope.row.company_name}}
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
                                    <el-table-column
                                            width="200"
                                            property="note"
                                            :label="$t('Inquery.index.price_note')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.note}}
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
                                            :label="$t('Inquery.index.supplier_need')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.company?scope.row.company.name:scope.row.company_name}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            width="200"
                                            :label="$t('Inquery.index.price_info')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.price+(scope.row.instore?'/库存:'+scope.row.instore:'')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            width="200"
                                            property="note"
                                            :label="$t('Inquery.index.price_note')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.note}}
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
                                            :label="$t('Inquery.index.supplier_need')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.company?scope.row.company.name:scope.row.company_name}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            width="200"
                                            :label="$t('Inquery.index.price_info')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.price+(scope.row.instore?'/库存:'+scope.row.instore:'')}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                            width="200"
                                            property="note"
                                            :label="$t('Inquery.index.price_note')"
                                    >
                                        <template slot-scope="scope">
                                            {{scope.row.note}}
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
                        <!--询单成交-->
                        <el-button
                                type="primary"
                                class="d2-mt-5 d2-mb-5 w87"
                                size="mini"
                                @click="order(item.id,item.cust_id,item.prod_id)"
                                v-if="permissions.indexOf(425)>-1&&((item.status>1001&&item.status<1005)||(item.chemprod && item.chemprod.inventory))"
                        >{{$t('Inquery.index.order')}}</el-button>
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
                                        :key="i.id + 'Inquiry'"
                                        :command="beforeHandleCommand(item.id,i.id)"
                                >{{i.name}}</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-dropdown >
                            <el-button type="primary" size='mini' class='w87'>
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <!-- <el-dropdown-item>
                                    <div v-if="item.push_yaoshi_log">
                                        <span v-if="item.push_yaoshi_log.push_status==2" style="color:#409EFF;">已转询药石</span>
                                        <div v-else style="color:red;" @click="yaoshi_inquery(item)">
                                            <el-tooltip class="item" effect="dark" :content="item.push_yaoshi_log.return_msg" placement="top">
                                                <span>转询失败</span>
                                            </el-tooltip>
                                        </div>
                                    </div>
                                    <div v-else @click="yaoshi_inquery(item)">转询药石科技</div>
                                </el-dropdown-item> -->
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
                                <el-dropdown-item>
                                    <!--历史报价-->
                                    <div v-if="permissions.indexOf(485)>-1" @click="history(item.cas)">{{$t('Inquery.index.history_price')}}</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <!-- 克隆询单 -->
                                    <div v-if="permissions.indexOf(415)>-1" @click="clone_inquery(item)">{{$t('Inquery.index.clone')}}</div>
                                </el-dropdown-item>
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
                                <el-dropdown-item v-if="member_id!=1001555">
                                    <div @click="Add_ak(item)">COA艾康</div>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="member_id!=1001555">
                                    <div @click="Add_aq(item)">COA安勤</div>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="item.company_id==1001555">
                                    <div @click="Add_AIVI(item)">COA凯为</div>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <div @click="Create_PI(item.id)">生成PI</div>
                                </el-dropdown-item>
                                <el-dropdown-item v-if="permission_names['inquiry.set_key']=='inquiry.set_key'">
                                    <div @click="set_key_inquery(item.id)">标记重点询单</div>
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
                        <div v-if="showCustomer(department_id,attr(item,'assignsaler.department_id'),attr(item,'country.Name'),attr(item,'assignsaler.id'))">{{attr(item,'resource.name')}}</div>
                        <div v-else>***</div>
                        <div>{{item.created_at}}</div>
                    </td>
                    <td>
                        <div v-if="(user_type!=101||user_id==5)&&showCustomer(department_id,attr(item,'assignsaler.department_id'),attr(item,'country.Name'),attr(item,'assignsaler.id'))&&roles_ids.indexOf(42)==-1" style="display: flex;">
                            <div v-if="item.cust_name&&item.cust_name.length<15">
                                <span class='overflow1' style="color: #409EFF;font-weight: bold;">{{item.cust_name}}</span>

                            </div>
                            <div v-else>
                                <el-tooltip class="item" effect="dark" :content="item.cust_name" placement="top">
                                    <span class='overflow1' style="color: #409EFF;font-weight: bold;">{{item.cust_name}}</span>
                                </el-tooltip>
                            </div>
                            <div><i class="el-icon-s-data blue" @click="countCustomer(item.cust_id)"></i></div>
                        </div>
                        <div v-else>********</div>
                        <div v-if="showCustomer(department_id,attr(item,'assignsaler.department_id'),attr(item,'country.Name'),attr(item,'assignsaler.id'))">
                            <span class="d2-mr-10" style="color: #409EFF;font-weight: bold;">{{attr(item,'country.Name')}}</span>
                            <span>level <span style="color: #409EFF;font-weight: bold;">{{item.level}}</span></span>
                        </div>
                        <div v-if="(user_type!=101||user_id==5)&&showCustomer(department_id,attr(item,'assignsaler.department_id'),attr(item,'country.Name'),attr(item,'assignsaler.id'))">{{$t('Inquery.index.table3_title14')}}：{{attr(item,'customer_contact.name')}}</div>
                        <div v-else>{{$t('Inquery.index.table3_title14')}}：***</div>
                        <div>
                            <span>{{attr(item,'purchaseuser.name')}}<span style="color: #2f74ff;padding-left: 5px;cursor: pointer;" @click="zhipai_purchaseuser(item)" v-if="permissions.indexOf(581)>-1&&attr(item,'purchaseuser.name')==user_name"><i class="el-icon-edit"></i>{{$t('Hand_over')}}</span></span>/
                            <span v-if="showCustomer(department_id,attr(item,'assignsaler.department_id'),attr(item,'country.Name'),attr(item,'assignsaler.id'))">
                                <span>{{attr(item,'assignsaler.name')}}</span><span style="color: #2f74ff;padding-left: 5px;cursor: pointer;" v-if="attr(item,'assignsaler.name')==user_name" @click="edit_assignsalername(item.id,attr(item,'assignsaler.id'))"><i  class="el-icon-edit"></i>{{$t('Hand_over')}}</span>/
                                <span>{{attr(item,'user.name')}}</span>
                            </span>
                            <span v-else>***</span>
                        </div>
                    </td>
                    <td style="width: 280px!important;">
                        <div>{{item.prodno}}<el-badge v-if="attr(item,'chemprod.is_advantage')==1" value="优" class="badge"></el-badge>
                            <el-tooltip  v-if="attr(item,'chemprod.is_inventory')"   placement="top"  effect="light">
                                <div slot="content">
                                    <table v-if="is_inventorys.length>0" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;background: white;">
                                        <tr>
                                            <th class="td">{{$t('Inquery.index.table5_title1')}}</th>
                                            <th class="td">{{$t('Inquery.index.table5_title2')}}</th>
                                            <th class="td">{{$t('Inquery.index.table5_title3')}}</th>
                                            <th class="td">{{$t('Inquery.index.table5_title4')}}</th>
                                            <th class="td">{{$t('Inquery.index.table5_title5')}}</th>
                                        </tr>
                                        <tr v-for="spec in is_inventorys" :key="spec.id +'spec'">
                                            <td>{{attr(spec,'brand.name')}}</td>
                                            <td><span v-if="spec.pack_number">{{spec.pack_number}}*</span>{{spec.pack_size}}{{units_ku[spec.pack_unit_id].name}}</td>
                                            <td>{{spec.purity}}</td>
                                            <td>{{spec.inland_price}}</td>
                                            <td>{{spec.abroad_price}}</td>
                                        </tr>
                                    </table>
                                </div>
                                <i class="el-icon-shopping-cart-full"  @mouseover="mouseOver(item.prod_id)" style="font-weight: bold;margin-left: 5px;color: red;font-size: 18px;"></i>
                            </el-tooltip>
                        </div>
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
                                    <span v-for="remind in item.chemprod.reminds" :key="remind.id+'remind'">{{remind.title}};</span>
                                </div>
                                <i class="el-icon-warning"></i>
                            </el-tooltip>
                            <span>CAS# <span style="color: #409EFF;font-weight: bold;">{{item.cas}}</span> </span>
                            <!-- <span v-if="item.chemprod&&item.chemprod.msds_material" style="margin-left:20px;"> <a target="_blank" :href="url+item.chemprod.msds_material.filename">MSDS文件</a></span></span> -->
                            <el-tooltip v-if="item.prodgrade.length>0" v-for="(i,index) in item.prodgrade" :key="index+i.note" placement="top" >
                                <div slot="content">
                                    <span>{{i.note}}</span><br>
                                    <span>{{i.reason}}</span>
                                </div>
                                <i class="el-icon-bell" style="font-weight: bold;margin-left: 5px;color: red;">({{i.grade}})</i>
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
                    <td style="position: relative;vertical-align: top;padding:0px 0px 20px 0px;">
                        <div v-html="attr(item,'outprice.price_string')"></div>
                        <div v-if="item.sales_contract_no">{{$t('Inquery.index.table3_title16')}}:{{item.sales_contract_no}}
                            <el-tooltip placement="top" v-if="item.inquiry_confirm">
                                <div slot="content">
                                        <span>
                                        {{item.inquiry_confirm.comfirm_pack?item.inquiry_confirm.comfirm_pack+'/':''}}
                                        {{item.inquiry_confirm.comfirm_purity?item.inquiry_confirm.comfirm_purity+'/':''}}
                                        {{item.inquiry_confirm.comfirm_quantity?item.inquiry_confirm.comfirm_quantity:''}}
                                        {{item.inquiry_confirm.comfirm_quantity_unit?getEnumValue(GEnums.Unit,item.inquiry_confirm.comfirm_quantity_unit) +'/':''}}
                                        {{item.inquiry_confirm.comfirm_price?item.inquiry_confirm.comfirm_price:''}}
                                        {{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id)+'/':''}}
                                        {{item.inquiry_confirm.comfirm_total_price?item.inquiry_confirm.comfirm_total_price:''}}
                                        {{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id):''}}
                                        </span>
                                </div>
                                <i class="el-icon-warning"></i>
                            </el-tooltip>
                        </div>
                        <div v-if="item.cancel_purchase_reason_id||item.cancel_sale_reason_id">
                            {{$t('Inquery.index.table3_title17')}}
                            <span v-if="item.cancel_purchase_reason_id">({{$t('Inquery.index.table3_title18')}})：{{getEnumValue(GEnums.InquiryCancelReason,item.cancel_purchase_reason_id)}}</span>
                            <br>
                            <span v-if="item.cancel_sale_reason_id">({{$t('Inquery.index.table3_title19')}})：{{getEnumValue(GEnums.InquiryCancelReason,item.cancel_sale_reason_id)}}</span>
                        </div>
                        <PushLog :list='item' v-if="permission_names['inquiry.inquiry.labnetwork_push']=='inquiry.inquiry.labnetwork_push'"></PushLog>
                        <div class="Angene_MSDS" v-if="item.is_msds" @click="Create_MSDS(item.cas)">Angene MSDS</div>
                        <div v-if="permission_names['inquiry.PurchaseQuote.sendInquiryToYaoshi']=='inquiry.PurchaseQuote.sendInquiryToYaoshi'">
                            <div v-if="item.push_yaoshi_log">
                                <div v-if="item.push_yaoshi_log.push_status==2" class="yaoshi_a yaoshi_success">已转询药石</div>
                                <el-tooltip v-else effect="dark" :content="item.push_yaoshi_log.return_msg" placement="top">
                                    <div class="yaoshi_a yaoshi_fail" @click="yaoshi_inquery(item)">转询失败</div>
                                </el-tooltip>
                            </div>
                            <div v-else class="yaoshi_a yaoshi_no" @click="yaoshi_inquery(item)">转询药石科技</div>
                        </div>

                    </td>
                </tr>
            </table>
            <table v-if="item.quotes.length>0" class="price_info" style="margin: 5px 0;">
                <tr>
                    <!--供应商名称-->
                    <th class="td" width="200" v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                        <!--<i @click="show_supplier(item)" class="el-icon-arrow-down"></i>-->
                        {{$t('Inquery.index.table4_title1')}}
                    </th>
                    <!--报价-->
                    <th class="td" width="260">
                        <el-tooltip placement="top" v-if="item.inquiry_confirm">
                            <div slot="content">
                <span>
                  {{item.inquiry_confirm.comfirm_pack?item.inquiry_confirm.comfirm_pack+'/':''}}
                  {{item.inquiry_confirm.comfirm_purity?item.inquiry_confirm.comfirm_purity+'/':''}}
                  {{item.inquiry_confirm.comfirm_quantity?item.inquiry_confirm.comfirm_quantity:''}}
                  {{item.inquiry_confirm.comfirm_quantity_unit?getEnumValue(GEnums.Unit,item.inquiry_confirm.comfirm_quantity_unit) +'/':''}}
                  {{item.inquiry_confirm.comfirm_price?item.inquiry_confirm.comfirm_price:''}}
                  {{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id)+'/':''}}
                  {{item.inquiry_confirm.comfirm_total_price?item.inquiry_confirm.comfirm_total_price:''}}
                  {{item.inquiry_confirm.comfirm_currency_id?getEnumValue(GEnums.Currency,item.inquiry_confirm.comfirm_currency_id):''}}
                </span>
                            </div>
                            <i class="el-icon-warning"></i>
                        </el-tooltip>
                        {{$t('Inquery.index.table4_title9')}}
                    </th>
                    <!--采购备注-->
                    <th class="td" >{{$t('Inquery.index.table4_title2')}}</th>
                    <!--COA及谱图-->
                    <th class="td" width="120">{{$t('Inquery.index.table4_title4')}}</th>
                    <!--采购员-->
                    <th class="td" width="100">{{$t('Inquery.index.table4_title7')}}</th>
                    <th class="td" width="190"></th>
                </tr>
                <tr
                        v-for="quote in item.quotes"
                        :key="quote.id+'change_bg'"
                        :style="quote.flag==1?'background:rgb(249, 233, 150);':''"
                        class="change_bg"
                >
                    <td v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                        <span v-if="quote.supplier_id==0">
                          <span class="red">
                              {{quote.supplier_name}} <span v-if="quote.platform">({{quote.platform}})</span>
                            </span>
                        </span>
                        <span v-else>
                            <span v-if="attr(quote,'supplier.supplier_status')==3">
                                 <el-tooltip class="item" effect="dark" content="限制性询价" placement="top">
                                    <span class="red"> {{attr(quote,'supplier.name')}} <span v-if="quote.platform">({{quote.platform}})</span></span>
                                </el-tooltip>
                            </span>
                            <span v-else>
                                {{attr(quote,'supplier.name')}}<span v-if="quote.platform">({{quote.platform}})</span>
                            </span>
                        </span>
                        <el-tag type="danger" size="mini" v-if="quote.supplier&&quote.supplier.pay_way==2" style="margin-left:3px;">月</el-tag>
                    </td>
                    <td>
                        <i class="el-icon-s-data blue" @click="countSupplier(quote.supplier_id)"></i>
                        <el-badge v-if="quote.statistics_purchase_contracts&&quote.statistics_purchase_contracts!=''&&quote.statistics_purchase_contracts!=0" :value="quote.statistics_purchase_contracts" class="d2-mr-5 badge2">
                        </el-badge>
                        <span v-html="quote.info_string"></span>
                    </td>
                    <td>
                        <span v-html="quote.self_note" ></span>
                        <span v-if="quote.delivery_city" style="margin-left: 10px;">发货城市: <span style="color: rgb(0, 0, 255);">{{quote.delivery_city}}</span></span>
                    </td>
                    <td>
                        <i
                                v-if="permissions.indexOf(564)>-1"
                                @click="suppler_creatCoa(quote.id,quote.supplier_coa)"
                                class="el-icon-plus"
                                style="color:red;"
                        ></i>
                        <a
                                v-if="quote.supplier_coa&&quote.supplier_coa.length>0"
                                v-for="(coa,index) in quote.supplier_coa"
                                :key="index"
                                class="d2-ml-5"
                                :href="coa.filename"
                        >{{coa.desc}}</a>
                    </td>
                    <td>{{quote.user?quote.user.name:''}}</td>
                    <td>
                        <el-button
                                class="w50"
                                v-if="(permissions.indexOf(438)>-1&&!(quote.supplier_id!=39057&&quote.supplier_id!=49293&&quote.supplier_id!=44033&&quote.user_id==1&&quote.list_sort==2)&&quote.supplier_id!=0&&item.cust_id!=43599)||(permissions.indexOf(438)>-1&&!(quote.supplier_id!=39057&&quote.supplier_id!=49293&&quote.supplier_id!=44033&&quote.user_id==1&&quote.list_sort==2)&&quote.supplier_id!=0&&item.cust_id==43599&&(attr(item,'purchaseuser.name')==user_name||user_name=='admin'||!item.purchaseuser))"
                                size="mini"
                                type="primary"
                                @click="edit(quote.id,item.id,item.quantity,item.specification,item.note,item.cas)"
                        >{{$t('Inquery.index.edit')}}</el-button>
                        <!--<el-button  class="w87" v-if="permissions.indexOf(440)>-1" type="primary" size="mini" @click="getLogs(quote.id)">{{$t('Inquery.index.watch')}}</el-button>-->
                        <el-button  class="w50" v-if="permissions.indexOf(422)>-1" type="primary" size="mini" @click="select(quote.id,item.prod_id,attr(item,'country_code'),item.cust_id,item.cas,item.id)">{{$t('Inquery.index.select')}}</el-button>
                        <el-button
                                class="w50"
                                v-if="(permissions.indexOf(436)>-1&&item.cust_id!=43599)||(permissions.indexOf(436)>-1&&item.cust_id==43599&&(attr(item,'purchaseuser.name')==user_name||user_name=='admin'||!item.purchaseuser))"
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
                    <el-select  v-if="is_xiangmubu" v-model="assignsaler_id" clearable filterable size="mini" placeholder="销售员">
                        <el-option v-for="(i,index) in xiangmubuSell" :key="i.id+'Sales'" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                    <el-select v-else v-model="assignsaler_id" clearable filterable size="mini" placeholder="销售员">
                        <el-option v-for="(i,index) in GEnums.Sales" :key="i.id+'Sales'" :label="i.name" :value="i.id"></el-option>
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

                <tr v-for="quote in logs" :key="quote.id+'logs'">
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
                            <th  v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th>
                            <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                        </tr>
                        <tr v-for="quote in historys_no_collection.data" :key="quote.id +'historys'">
                            <td  v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">{{quote.supplier?quote.supplier.name:''}}</td>
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
                            <th  v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th>
                            <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                        </tr>
                        <tr v-for="quote in historys_collection.data" :key="quote.id +'collection'">
                            <td  v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">{{quote.supplier?quote.supplier.name:''}}</td>
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
                            <th  v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th>
                            <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title2')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title3')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title4')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title5')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title6')}}</th>
                            <th class="td">{{$t('Inquery.index.table4_title8')}}</th>
                        </tr>
                        <tr v-for="(quote,index) in yilan_collection.data" :key="index">
                            <td  v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
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
                        <tr v-for="spec in specs" :key="spec.id +'spec'">
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
                            <td>{{getEnumValue(GEnums.InvoiceInfo, attr(inventory,'order.invoice_type_id'))}}</td>
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
                            <td>{{getEnumValue(GEnums.InvoiceInfo,attr(inventory,'order.invoice_type_id'))}}</td>
                            <!--<td></td>-->
                            <!--<td></td>-->
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
                <tr v-for="change in changes" :key="change.id +'change'">
                    <td>{{change.price_string}}</td>
                    <td>{{change.datetime}}</td>
                </tr>
            </table>
        </el-dialog>
        <!--指派采购-->
        <el-dialog title="指派采购" :visible.sync="dialogVisible_zhipai" width="25%">
            <el-form label-width="80px" label-position="left">
                <el-form-item label="指派采购">
                    <el-select v-if="is_xiangmubu" v-model="purchaseuser_id" clearable filterable size="mini" placeholder="采购员">
                        <el-option v-for="(i) in xiangmubuPurchase" :disabled="i.status==0" :key="i.id+'purchases'" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                    <el-select v-else v-model="purchaseuser_id" clearable filterable size="mini" placeholder="采购员">
                        <el-option v-for="(i) in purchases" :disabled="i.status==0" :key="i.id+'purchases'" :label="i.name" :value="i.id"></el-option>
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
                                :key="i.id+'CancelReason'"
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
                    :time_sale="time_sale"
            ></form4sale>
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
        <el-dialog  :visible.sync="viewVisible_add_Ak" width="50%" @close="close_Add()" class="dialog">
            <addAk @close_Add='close_Add()' :coa_cas='coa_cas' ref="addAk"></addAk>
        </el-dialog>
        <!-- 安勤新增 -->
        <el-dialog  :visible.sync="viewVisible_add_Aq" width="50%" @close="close_Add()" class="dialog">
            <addAq @close_Add='close_Add()' :coa_cas='coa_cas' ref="addAq"></addAq>
        </el-dialog>
        <!-- 安勤新增 -->
        <el-dialog :visible.sync="viewVisible_add_AIVI" width="50%" @close="close_Add()" class="dialog">
            <addAIVI @close_Add='close_Add()' :coa_cas='coa_cas' ref="addAq"></addAIVI>
        </el-dialog>

        <!-- 药石 -->
        <el-dialog :visible.sync="viewVisible_yaoshi" title="药石询价" width="350px" class="dialog_yao">
            <el-form label-position="left" label-width="50px" :model="formYao">
                <el-form-item label="数量:">
                    <el-input size="mini" v-model="formYao.quantity"></el-input>
                </el-form-item>
                <el-form-item label="纯度:">
                    <el-input size="mini" v-model="formYao.purity"></el-input>
                </el-form-item>
                <el-form-item style="text-align:right;">
                    <el-button size="mini"  @click="viewVisible_yaoshi=false">取消</el-button>
                    <el-button size="mini" type="primary" :loading='is_yaoshi' @click="sure_yaoshi(formYao)">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--统计-->
        <el-dialog :visible.sync="dialogVisible_count" title="统计" width="800px" class="dialog_yao">
            <div class="d2-text-right">
                <el-date-picker
                        v-model="formCount.strattime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        :placeholder="$t('Inquery.index.table13_title1')"
                        size="mini"
                        format="yyyy-MM-dd"
                        class="inblock w130"
                ></el-date-picker>
                <el-date-picker
                        v-model="formCount.endtime"
                        value-format="yyyy-MM-dd"
                        type="date"
                        :placeholder="$t('Inquery.index.table13_title2')"
                        size="mini"
                        format="yyyy-MM-dd"
                        class="inblock w130 ml10"
                ></el-date-picker>

                <el-button size="mini" class="inblock" type="primary" @click="searchCount()">{{$t('Inquery.index.table13_title3')}}</el-button>
            </div>
            <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;text-align: center;">
                <tr>
                    <!--countData-->
                    <th class="td">{{$t('Inquery.index.table13_title4')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title5')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title6')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title7')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title8')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title9')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title10')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title11')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title12')}}</th>
                </tr>
                <tr>
                    <td>{{countData.inquire_num}}</td>
                    <td>{{countData.outprice_num}}</td>
                    <td>{{countData.notprice_num}}</td>
                    <td>{{countData.deal_num}}</td>
                    <td>{{countData.cancel_num}}</td>
                    <td>{{countData.unfin_num}}</td>
                    <td>{{countData.quoted_rate}}</td>
                    <td>{{countData.deal_rate}}</td>
                    <td>{{countData.cancel_rate}}</td>
                </tr>
            </table>
            <table v-if="countData.usa" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;text-align: center;">
                <tr>
                    <!--countData-->
                    <th class="td">{{$t('Inquery.index.table13_title18')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title7')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title13')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title8')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title15')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title16')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title17')}}</th>
                </tr>
                <tr>
                    <td>$</td>
                    <td>{{attr(countData,'usa.deal_num')}}</td>
                    <td>{{attr(countData,'usa.deal_money')}}</td>
                    <td>{{attr(countData,'usa.cancel_num')}}</td>
                    <td>{{attr(countData,'usa.cancel_money')}}</td>
                    <td>{{attr(countData,'usa.unfin_num')}}</td>
                    <td>{{attr(countData,'usa.unfin_money')}}</td>

                </tr>
            </table>
            <table v-if="countData.rmb" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;text-align: center;">
                <tr>
                    <!--countData-->
                    <th class="td">{{$t('Inquery.index.table13_title18')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title7')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title13')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title8')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title15')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title16')}}</th>
                    <th class="td">{{$t('Inquery.index.table13_title17')}}</th>
                </tr>
                <tr>
                    <td>￥</td>
                    <td>{{attr(countData,'rmb.deal_num')}}</td>
                    <td>{{attr(countData,'rmb.deal_money')}}</td>
                    <td>{{attr(countData,'rmb.cancel_num')}}</td>
                    <td>{{attr(countData,'rmb.cancel_money')}}</td>
                    <td>{{attr(countData,'rmb.unfin_num')}}</td>
                    <td>{{attr(countData,'rmb.unfin_money')}}</td>

                </tr>
            </table>
        </el-dialog>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisibleExportPrice"
                width="70%"
        >
            <div class="pdf" ref="pdf">
                <h1><img src="image/theme/d2/logo/icon-only.png"><span>报价单</span></h1>
                <el-row>
                    <el-col :span="12">
                        公司地址： <el-input size="mini" v-model="ExportPriceData.company_address"></el-input>
                    </el-col>
                    <el-col :span="12">
                        报价日期： <el-input size="mini" v-model="ExportPriceData.outprice_date"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        电&nbsp;&nbsp;话： <el-input size="mini" v-model="ExportPriceData.mobile"></el-input>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        传&nbsp;&nbsp;真： <el-input size="mini" v-model="ExportPriceData.fax"></el-input>
                    </el-col>
                    <el-col :span="12">
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        联&nbsp;系&nbsp;人：<el-input size="mini" v-model="ExportPriceData.contact"></el-input>
                    </el-col>
                    <el-col :span="12">
                        手机：<el-input size="mini" v-model="ExportPriceData.phone"></el-input>
                    </el-col>
                </el-row>
                <table border>
                    <thead>
                    <th>物料名称</th>
                    <th width="120">CAS</th>
                    <th width="120">纯度</th>
                    <th width="60">数量</th>
                    <th width="100">单价</th>
                    <th width="100">合计/元</th>
                    <th width="100">交货时间</th>
                    </thead>
                    <tbody>
                    <tr v-for="item,ind in ExportPriceData.items" :key="ind">
                        <td><el-input class="-text-center" size="mini" v-model="item.prod_name"></el-input></td>
                        <td width="120">{{item.cas}}</td>
                        <td width="120">
                            <p v-for="i in item.out_price">{{i.purity}}</p>
                        </td>
                        <td width="60">
                            <p v-for="i in item.out_price">{{i.num_str}}</p>
                        </td>
                        <td width="100">
                            <p v-for="i in item.out_price">{{i.price_str}}</p>
                        </td>
                        <td width="100">
                            <p v-for="i in item.out_price"><el-input class="w100 -text-center" size="mini" v-model="i.sub"></el-input></p>
                        </td>
                        <td width="100">
                            <p v-for="i in item.out_price"><el-input class="w100 -text-center" size="mini" v-model="i.leadtime"></el-input></p>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createPdf(ExportPriceData.contact)">生成pdf</el-button>
             </span>
        </el-dialog>

        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                layout="sizes,prev, pager, next"
                :current-page.sync="currentPage"
                :page-sizes="[15,30,50,100]"
                :page-size="list.per_page"
                @size-change="handleSizeChange"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>


<script>
    import html2Canvas from "html2canvas";
    import JsPDF from "jspdf";
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
        getOutPriceLogs,
        update_supplier_Coa,
        search_menu,
        getOtherPrices,
        changeProdName,
        assignedSaler,
        msds,
        msds_generate,
        coa_create,
        downSupplierPriceExcel,
        createPI,
        sendInquiryToYaoshi,
        set_key,
        getXiangmubuZhipaiPurchase,
        getXiangmubuZhipaiSell,
        getOutPriceByInquiryIds
    } from "@/api/Inquery";
    import {
        generatecoa,
        search_coa,
        // coa_create,
        coa_approve,
        coa_review,
        coa_generate,
    } from "@/api/quality";
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
    import addAIVI from "../comments/add_AIVI";//艾康
    import PushLog from "../comments/push_log";//推送
    import { getDay,futureDate,getDate } from '@/utils/index'
    import util from "@/libs/util";
    import request from "@/plugin/axios";
    import axios from "axios";
    import { translate } from "@/api/prod";
    export default {
        name: "Inquery-inquery",
        components: {
            form1,
            form4sale,
            form3,
            form4,
            form5,
            addAk,
            addAq,
            addAIVI,
            search,
            PushLog
        },
        data() {
            return {
                url:process.env.VUE_APP_API,
                permissions: JSON.parse(localStorage.getItem("permissions")),//权限集合
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                cookie_name: this.$route.name,//cookie名称
                user_name:'',//登录人名称
                queryList: {
                    page: "1",
                    per_page:'',
                    is_old: "",
                    all_search: [],
                    genGVKQuotePriceZip:'',
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
                is_key_info:[],
                //弹层显示隐藏变量
                viewVisible_add_Aq:false,
                viewVisible_add_Ak:false,
                viewVisible_add_AIVI:false,
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
                dialogVisible_zhipai: false,
                dialogVisible_update_supplier_Coa: false,
                dialogVisibleExportPrice:false,
                show_edit_name: false,
                show_edit_assignsalername: false,
                viewVisible_yaoshi:false,
                dialogVisible_count:false,
                countId:'',
                countData:{},
                formCount:{
                    strattime:'',
                    endtime:'',
                },
                is_yaoshi:false,
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
                formYao:{},
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
                export_url:'',
                department_id:'',
                showGVK:false,
                is_inventorys:[],
                roles_ids:[],
                is_xiangmubu:'',
                xiangmubuSell:[],
                xiangmubuPurchase:[],
                ExportPriceData:{}
            };
        },
        created() {
            let that=this
            var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
            this.roles_ids=[]
            roles_ids_list.forEach(item=>{
                this.roles_ids.push(item.id)
            })
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
            that.department_id=util.cookies.get('department_id')
            that.is_xiangmubu=util.cookies.get('is_xiangmubu')
            that.fetchData();
            if(this.$route.query.status==='important_customer_inquiry_count'&&this.cookie_name==='Inquery-inquery8'){
                this.queryList.all_search=[]
                this.queryList.all_search.push({
                    search_one: 'customer_is_important',
                    search_two: 'dy',
                    search_content:2,
                    name:'重点客户询单'
                })
                this.queryList.all_search.push({
                    search_one: 'created_at',
                    search_two: 'dy',
                    search_content: getDay(),
                    name:'询单日期等于'+getDay()
                })
                localStorage.setItem('Inquery-inquery8', JSON.stringify(this.queryList.all_search))
                this.$refs.search.$emit('refresh')
                this.fetchData();
            }
            if(this.$route.query.status==='important_inquiry'&&this.cookie_name==='Inquery-inquery9'){
                this.queryList.all_search=[]
                this.queryList.all_search.push({
                    search_one: 'is_key',
                    search_two: 'dy',
                    search_content:2,
                    name:'重点询单'
                })
                this.queryList.all_search.push({
                    search_one: 'created_at',
                    search_two: 'dy',
                    search_content: getDay(),
                    name:'询单日期等于'+getDay()
                })
                localStorage.setItem('Inquery-inquery9', JSON.stringify(this.queryList.all_search))
                this.$refs.search.$emit('refresh')
                this.fetchData();
            }
            if(this.$route.query.status==='belongs_self_prod'&&this.cookie_name==='Inquery-inquery10'){
                const week= new Date().getDay()
                this.queryList.all_search=[]
                this.queryList.all_search.push({
                    search_one: 'charge',
                    search_two: 'dy',
                    search_content:this.user_name,
                    name:'产品负责人等于'+this.user_name
                })
                if(week===1){
                    this.queryList.all_search.push({
                        search_one: 'created_at',
                        search_two: 'gtedy',
                        search_content: futureDate(getDate(),-3),
                        name:'询单日期大于等于'+futureDate(getDate(),-3)
                    })
                }else{
                    this.queryList.all_search.push({
                        search_one: 'created_at',
                        search_two: 'gtedy',
                        search_content: futureDate(getDate(),-1),
                        name:'询单日期大于等于'+futureDate(getDate(),-1)
                    })
                }
                localStorage.setItem('Inquery-inquery10', JSON.stringify(this.queryList.all_search))
                this.$refs.search.$emit('refresh')
                this.fetchData();
            }
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
                this.user_name=util.cookies.get('user_name')
                if(this.$route.query.status==='important_customer_inquiry_count'&&this.cookie_name==='Inquery-inquery8'){
                    this.queryList.all_search=[]
                    this.queryList.all_search.push({
                        search_one: 'customer_is_important',
                        search_two: 'dy',
                        search_content:2,
                        name:'重点客户询单'
                    })
                    this.queryList.all_search.push({
                        search_one: 'created_at',
                        search_two: 'dy',
                        search_content: getDay(),
                        name:'询单日期等于'+getDay()
                    })
                    localStorage.setItem('Inquery-inquery8', JSON.stringify(this.queryList.all_search))
                    this.$refs.search.$emit('refresh')
                    this.fetchData();
                }
                if(this.$route.query.status==='important_inquiry'&&this.cookie_name==='Inquery-inquery9'){
                    this.queryList.all_search=[]
                    this.queryList.all_search.push({
                        search_one: 'is_key',
                        search_two: 'dy',
                        search_content:2,
                        name:'重点询单'
                    })
                    this.queryList.all_search.push({
                        search_one: 'created_at',
                        search_two: 'dy',
                        search_content: getDay(),
                        name:'询单日期等于'+getDay()
                    })
                    localStorage.setItem('Inquery-inquery9', JSON.stringify(this.queryList.all_search))
                    this.$refs.search.$emit('refresh')
                    this.fetchData();
                }
                if(this.$route.query.status==='belongs_self_prod'&&this.cookie_name==='Inquery-inquery10'){
                    const week= new Date().getDay()
                    this.queryList.all_search=[]
                    this.queryList.all_search.push({
                        search_one: 'charge',
                        search_two: 'dy',
                        search_content:this.user_name,
                        name:'产品负责人等于'+this.user_name
                    })
                    if(week===1){
                        this.queryList.all_search.push({
                            search_one: 'created_at',
                            search_two: 'gtedy',
                            search_content: futureDate(getDate(),-3),
                            name:'询单日期大于等于'+futureDate(getDate(),-3)
                        })
                    }else{
                        this.queryList.all_search.push({
                            search_one: 'created_at',
                            search_two: 'gtedy',
                            search_content: futureDate(getDate(),-1),
                            name:'询单日期大于等于'+futureDate(getDate(),-1)
                        })
                    }
                    localStorage.setItem('Inquery-inquery10', JSON.stringify(this.queryList.all_search))
                    this.$refs.search.$emit('refresh')
                    this.fetchData();
                }
            },
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
        beforeDestroy() {
            window.removeEventListener('keydown',this.events)
        },
        mounted() {
            this.box = this.$refs.a.$children[0].$el.firstElementChild;
            this.box.addEventListener("scroll", this.handleScroll, true);
        },
        activated() {
            window.addEventListener('keydown', this.events)
        },
        deactivated() {
            window.removeEventListener('keydown', this.events)
        },
        methods: {
            events(event){
                var key =event.keyCode;
                if (key == 13) {
                    this.search()
                }
            },
            //获取列表数据
            fetchData(a) {
                this.queryList.genGVKQuotePriceZip=''
                if (localStorage.getItem(this.$route.name)) {
                    this.queryList.all_search = JSON.parse(
                        localStorage.getItem(this.$route.name)
                    )
                }
                // console.log()
                this.queryList.all_search.forEach((item,index)=>{
                    if(item.search_content=="Aragen Life Sciences Pvt Ltd"){
                        this.showGVK=true
                    }
                })
                inquiry_lists(this.queryList).then(res => {
                    if (this.loading_search) {
                        this.$message({
                            message: "success",
                            type: "success"
                        });
                        this.loading_search = false;
                    }
                    res.data.data.forEach((items, index) => {
                        items.checked=false
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
                    this.purchases = res.enum.purchases_zhipai;
                    if (a) {
                        document.getElementById("id").scrollIntoView();
                    }
                }).catch(rr => {this.loading_search=false})
                country_list().then(res => {
                    this.country = res.data;
                });
            },
            export_price(){
                let ids=[]
                this.list.data.forEach(res=>{
                    if(res.checked){
                        ids.push(res.id)
                    }
                })
                if(!ids.length){
                    this.$message({
                        message: '请勾选询单',
                        type: 'warning'
                    })
                    return
                }else{
                    getOutPriceByInquiryIds({ids}).then(res=>{
                        if(res&&res.code===0){
                            this.dialogVisibleExportPrice=true
                            this.ExportPriceData=res.data
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            })
                        }
                    })
                }
            },
            createPdf(contact){
                setTimeout(() => {
                    var title = contact+'报价单'
                    html2Canvas(this.$refs.pdf, {
                        allowTaint: true,
                        taintTest: false,
                        useCORS: true,
                        //width:960,
                        //height:5072,
                        dpi: window.devicePixelRatio*4, //将分辨率提高到特定的DPI 提高四倍
                        scale:4 //按比例增加分辨率
                    }).then(function (canvas) {
                        let contentWidth = canvas.width
                        let contentHeight = canvas.height
                        let pageHeight = contentWidth / 592.28 * 841.89
                        let leftHeight = contentHeight
                        let position = 0
                        let imgWidth = 588
                        let imgHeight = 592.28 / contentWidth * contentHeight
                        let pageData = canvas.toDataURL('image/jpeg', 1.0)
                        let PDF = new JsPDF('', 'pt', 'a4')
                        if (leftHeight < pageHeight) {
                            PDF.addImage(pageData, 'JPEG', 5, 0, imgWidth, imgHeight)
                        } else {
                            while (leftHeight > 0) {
                                PDF.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
                                leftHeight -= pageHeight
                                position -= 841.89
                                if (leftHeight > 0) {
                                    PDF.addPage()
                                }
                            }
                        }
                        PDF.save(title + '.pdf')
                    })
                }, 300)
            },
            mouseOver(prod_id){
                getInstore(prod_id).then(res => {
                    if (res && res.code == 0) {
                        this.is_inventorys = res.data.specs;
                        this.enums_ku=res.enum
                        this.units_ku=res.enum.units
                        this.$forceUpdate()
                    }
                });
            },
            handleSizeChange(val) {
                this.queryList.per_page = val;
                this.fetchData();
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
            //标记重点询单
            set_key_inquery(id){
                set_key(id).then(res=>{
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.fetchData()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            //推送药石
            yaoshi_inquery(item){
                this.formYao = {
                    inquiry_id:item.id,
                    quantity:item.quantity,
                    purity:''
                }
                this.viewVisible_yaoshi = true
            },
            sure_yaoshi(a){
                this.is_yaoshi = true
                sendInquiryToYaoshi(this.formYao).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.is_yaoshi = false
                        this.fetchData()
                        this.viewVisible_yaoshi = false
                    } else {
                        that.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.is_yaoshi = false
                    }
                }).catch(rr => {this.is_yaoshi = false})
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
            Add_AIVI(item){
                this.coa_cas = item.cas
                this.viewVisible_add_AIVI = true;
            },
            Create_PI(id){
                createPI(id).then(res=>{
                    if(res.code===0){
                        var eleLink = document.createElement("a");
                        eleLink.download = '';
                        eleLink.style.display = "none";
                        eleLink.href = res.data;
                        eleLink.target='_blank';
                        // 触发点击
                        document.body.appendChild(eleLink);
                        eleLink.click();
                        // 然后移除
                        document.body.removeChild(eleLink);
                    }
                })
            },
            Create_MSDS(cas){
                axios({
                    method: "get",   // 根据个人请求状况，添加请求方式：post、get等。
                    url: 'http://180.96.11.28:8008/api/sds/sdspdf/Angene/'+cas,   // 添加对应请求的URL
                    responseType: 'blob'   // 设置接收格式为blob格式
                }).then((res) => {
                    let binaryData = [];
                    binaryData.push(res.data);
                    let image = window.URL.createObjectURL(new Blob(binaryData, {type: 'application/pdf'}));
                    // 创建隐藏的可下载链接
                    var eleLink = document.createElement("a");
                    eleLink.download = cas;
                    eleLink.style.display = "none";
                    eleLink.href = image;
                    // 触发点击
                    document.body.appendChild(eleLink);
                    eleLink.click();
                    // 然后移除
                    document.body.removeChild(eleLink);
                });
            },
            close_Add() {
                this.viewVisible_add_Ak = false;
                this.viewVisible_add_Aq = false;
                this.viewVisible_add_AIVI = false
                this.coa_cas = ''
                if(this.$refs.addAk){
                    this.$refs.addAk.close_Add_child()
                }else{
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
                if(this.is_xiangmubu){
                    getXiangmubuZhipaiPurchase(item.id).then(res=>{
                        if(res&&res.code==0){
                            this.xiangmubuPurchase=res.data
                        }
                    })
                }
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
            countCustomer(id){
                let that=this
                that.formCount= {
                    strattime:'',
                    endtime:''
                }
                that.countId=id
                $.ajax({
                    url: 'http://221.226.240.154:8807/api/erp/customer/'+id,
                    method:'get',
                    success: function (res) {
                        if (res && res.code == 0) {
                            that.countData=res.data
                        }
                    }
                })
                this.dialogVisible_count=true
            },
            countSupplier(id){
                let that=this
                that.formCount= {
                    strattime:'',
                    endtime:''
                }
                that.countId=id
                $.ajax({
                    url: 'http://221.226.240.154:8807/api/erp/supplier/'+id,
                    method:'get',
                    success: function (res) {
                        if (res && res.code == 0) {
                            that.countData=res.data
                        }
                    }
                })
                this.dialogVisible_count=true
            },
            searchCount(){
                let that=this
                $.ajax({
                    url: 'http://221.226.240.154:8807/api/erp/customer/'+that.countId+'?strattime='+(that.formCount.strattime?that.formCount.strattime:'')+'&endtime='+(that.formCount.endtime?that.formCount.endtime:''),
                    method:'get',
                    success: function (res) {
                        if (res && res.code == 0) {
                            that.countData=res.data
                        }
                    }
                })
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
            uploadGVK(){
                this.queryList.genGVKQuotePriceZip=1
                inquiry_lists(this.queryList).then(res => {
                    if(res.code==0){
                        var eleLink = document.createElement('a');
                        eleLink.download = res.data;
                        eleLink.style.display = 'none';
                        eleLink.href = res.data;
                        document.body.appendChild(eleLink);
                        eleLink.click();
                        document.body.removeChild(eleLink);
                    }
                })
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
                if(this.$refs.search.search_content=='Aragen Life Sciences Pvt Ltd'){
                    this.showGVK=true
                }else{
                    this.showGVK=false
                }
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
                if(this.is_xiangmubu){
                    getXiangmubuZhipaiSell(id).then(res=>{
                        if(res&&res.code==0){
                            this.xiangmubuSell=res.data
                        }
                    })
                }
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


