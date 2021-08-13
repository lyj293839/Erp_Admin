<style lang="scss" scoped type="text/scss">
    .d2-text-center {
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }
    .w120{
        width: 120px;
    }
    .w410{
        width: 410px;
    }
    .flex{
        display:flex;
        border-top: 1px solid #f2f2f2;
        border-left: 1px solid #f2f2f2;
    }
    .flex span{
        display: block;
        margin: 0 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .flex div{
        min-height: 22px;
        line-height: 22px;
        box-sizing: border-box;
    }
    .flex-1{
        flex: 1;
    }
    .bgRed{
        background-color: red;
    }
    .border{
        border-right: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
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
        color: red;
        font-weight: bold;
    }

    .data-testitem1 {
        color: green;
        font-weight: bold;
    }
</style>
<template>
    <div>
        <el-row :gutter="5">
            <el-col v-if="specs.length>0||inventory_total.length>0" :span="6">
                <table border="1" bordercolor="#E5E5E5"
                       style="margin: 5px 0;width:313px;max-height: 200px!important;overflow:scroll;display:inline-block">
                    <tr>
                        <th class="td">{{$t('Inquery.index.table5_title1')}}</th><!--品牌-->
                        <th class="td">{{$t('Inquery.index.table5_title2')}}</th><!--规格-->
                        <th class="td">{{$t('Inquery.index.table5_title3')}}</th><!--纯度-->
                        <th class="td">{{$t('Inquery.index.table5_title4')}}</th><!--中国定价(￥)-->
                        <th class="td">{{$t('Inquery.index.table5_title5')}}</th><!--国外定价($)-->
                    </tr>
                    <tr v-for="spec in specs">
                        <td>{{attr(spec,'brand.name')}}</td>
                        <td>
                            <span v-if="spec.pack_number">{{spec.pack_number}}*</span>
                            {{spec.pack_size}}{{getEnumValue(units,spec.pack_unit_id)}}
                        </td>
                        <td>{{spec.purity}}</td>
                        <td>{{spec.inland_price}}</td>
                        <td>{{spec.abroad_price}}</td>
                    </tr>
                </table>
            </el-col>
            <el-col v-if="inventory_total.length>0||specs.length>0" :span="18">
                <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                    <tr>
                        <th class="td">{{$t('Inquery.index.table6_title1')}}</th><!--仓库-->
                        <th class="td">{{$t('Inquery.index.table6_title2')}}</th><!--入库日期-->
                        <th class="td">{{$t('Inquery.index.table6_title14')}}</th><!--批号-->
                        <th class="td">{{$t('Inquery.index.table6_title3')}}</th><!--纯度-->
                        <th v-if="user_type!=102" class="td">{{$t('Inquery.index.table6_title4')}}</th><!--运输条件-->
                        <th class="td">{{$t('Inquery.index.table6_title5')}}</th><!--性质外观-->
                        <th v-if="user_type!=102" class="td">{{$t('Inquery.index.table6_title6')}}</th><!--包装-->
                        <th class="td">{{$t('Inquery.index.table6_title7')}}</th><!--检测数据-->
                        <th class="td">{{$t('Inquery.index.table6_title8')}}</th><!--采购人员-->
                        <th class="td">{{$t('Inquery.index.table6_title9')}}</th><!--库存数量-->
                        <th class="td">{{$t('Inquery.index.table6_title17')}}</th><!--结算价-->
                        <th class="td">{{$t('Inquery.index.table6_title15')}}</th><!--是否含税-->
                        <!--<th class="td">{{$t('Inquery.index.table6_title16')}}</th>&lt;!&ndash;成本单价&ndash;&gt;-->
                        <!--<th class="td">{{$t('Inquery.index.table6_title12')}}</th>&lt;!&ndash;合同预占&ndash;&gt;-->
                    </tr>
                    <tr v-for="inventory in inventory_total">
                        <td>{{attr(inventory,'warehouse.name')}}</td>
                        <td>{{inventory.created_at.split(' ')[0]}}</td>
                        <td>
                            <span v-if="inventory.is_consign==1">
                                 <span>{{inventory.batchno}}</span>
                                    <el-tag type="danger" size="mini">寄售</el-tag>
                                </span>
                                <span v-else>{{inventory.batchno}}</span>
                        </td>
                        <td>{{inventory.purity}}</td>
                        <td v-if="user_type!=102">{{attr(inventory,'supplier.name')}}</td>
                        <td>{{getEnumValue(ChemicalAppearance,inventory.chemprodappearance_id)}}</td>
                        <td v-if="user_type!=102">{{inventory.original_stock}}{{getEnumValue(units,inventory.original_stock_unit_id)}}</td>
                        <td>
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
                        <td>{{inventory.stock}}{{units[inventory.base_unit_id].name}}</td>
                        <td>
                            <span v-if="attr(inventory,'order.jiesuan_price')">
                                ￥{{inventory.order.jiesuan_price}}/<span v-if="inventory.order.quantity_unit==1||inventory.order.quantity_unit==3||inventory.order.quantity_unit==4||inventory.order.quantity_unit==5">g</span><span v-if="inventory.order.quantity_unit==2||inventory.order.quantity_unit==6">ml</span>
                            </span>
                            <span v-else>{{getEnumValue(Currency,attr(inventory,'order.currency_id'),'icon')}}{{attr(inventory,'order.price')}}/{{getEnumValue(units,attr(inventory,'order.quantity_unit'))}}</span>
                         </td>
                        <td>
                          <span v-if="attr(inventory,'order.jiesuan_price')">
                                  不含税
                          </span>
                          <span v-else>
                            {{getEnumValue(InvoiceInfo,attr(inventory,'order.invoice_type_id'))}}
                          </span>
                        </td>
                        <!--<td></td>-->
                        <!--<td></td>-->
                    </tr>
                </table>
            </el-col>
        </el-row>
        <table v-if="show" border="1" bordercolor="#E5E5E5" style="margin-top: 10px;">
            <tr>
                <th v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}
                </th><!--供应商名称-->
                <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th><!--供应商价格-->
                <th class="td">{{$t('Inquery.index.table4_title2')}}</th><!--采购进展-->
                <th class="td">{{$t('Inquery.index.table4_title3')}}</th><!--交货城市-->
                <th class="td">{{$t('Inquery.index.table4_title4')}}</th><!--供应商COA及谱图-->
                <th class="td">{{$t('Inquery.index.table4_title5')}}</th><!--联系人-->
                <th class="td">{{$t('Inquery.index.table4_title6')}}</th><!--联系方式-->
                <th class="td">{{$t('Inquery.index.table4_title8')}}</th><!--修改时间-->
                <th class="td" style="color: red;">{{$t('Inquery.index.table4_title10')}}</th><!--需求数量-->
                <th class="td" style="color: red;">{{$t('Inquery.index.table4_title11')}}</th><!--规格纯度-->
            </tr>
            <tr>
                <td v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                        <span v-if="quote_.supplier_id==0">
                           <span class="red">{{quote_.supplier_name}} <span
                                   v-if="quote_.platform">({{quote_.platform}})</span></span>
                            </span>
                        <span v-else>
                            <span v-if="attr(quote_,'supplier.supplier_status')==3">
                                 <el-tooltip class="item" effect="dark" content="限制性询价" placement="top">
                                    <span class="red"> {{attr(quote_,'supplier.name')}}</span>
                                </el-tooltip>
                            </span>
                            <span v-else>
                                {{attr(quote_,'supplier.name')}}
                            </span>
                       </span>
                </td>
                <td>{{quote_.info_string}}</td>
                <td><span v-html='quote_.self_note'></span></td>
                <td>{{quote_.delivery_city}}</td>
                <td>
                    <a v-if="quote_.supplier_coa&&quote_.supplier_coa.length>0" v-for="coa in quote_.supplier_coa"
                       class="d2-ml-5" :href="coa.filename">{{coa.desc}}</a>
                </td>
                <td>{{attr(quote_,'supplier_contact.name')}}</td>
                <td>
                    {{quote_.supplier_contact?(quote_.supplier_contact.phone?quote_.supplier_contact.phone:quote_.supplier_contact.mobile):''}}
                </td>
                <td>{{quote_.updated_at}}</td>
                <td style="color: red;">{{inquiry.quantity}}<span v-if="inquiry.note">/{{inquiry.note}}</span></td>
                <td style="color: red;">{{inquiry.specification}}</td>
            </tr>
        </table>
        <div v-if="!show&&inquiry" style="color: red;"><span>{{$t('Inquery.index.table4_title10')}}:{{inquiry.quantity}}<span
                v-if="inquiry.note">/{{inquiry.note}}</span></span>&nbsp;&nbsp;<span>{{$t('Inquery.index.table4_title11')}}:{{inquiry.specification}}</span>
        </div>
        <el-table
                :data="quote_price"
                border
                tooltip-effect="dark"
                style="width: 100%;"
                class="d2-mt-5 d2-text-center"
        >
            <el-table-column :label="$t('pack')" align="center" min-width="400">
                <template slot-scope="scope">
          <span class="d2-mr-5"><el-badge
                  v-if="scope.row.statistics_saler_contracts&&scope.row.statistics_saler_contracts!=''&&scope.row.statistics_saler_contracts!=0"
                  :value="scope.row.statistics_saler_contracts" class="badge">
        </el-badge></span>
                    <el-select
                            v-if="scope.row.currency!=2"
                            size="mini"
                            v-model="scope.row.trade"
                            :placeholder="$t('trade')"
                            @change="change_trade(scope.row,scope.$index)"
                            style="width: 70px;margin: 0 2px;"
                    >
                        <el-option
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item"
                                :value="item"
                        ></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="scope.row.currency"
                            :placeholder="$t('currency')"
                            style="width: 70px;margin: 0 2px;"
                    >
                        <el-option
                                v-for="(item,index) in Currency"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                    <el-input
                            size="mini"
                            type="text"
                            class="input"
                            :placeholder="$t('price')"
                            v-model="scope.row.price"
                            style="width: 60px;margin: 0 2px;"
                    ></el-input>
                    /
                    <el-input
                            size="mini"
                            type="text"
                            class="input"
                            placeholder
                            v-model="scope.row.prefix_packsize"
                            style="width: 60px;margin: 0 2px;"
                    ></el-input>
                    <el-select
                            size="mini"
                            v-model="scope.row.prefix_packunit"
                            :placeholder="$t('unit')"
                            style="width: 70px;margin: 0 2px;"
                    >
                        <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                    for
                    <el-input
                            size="mini"
                            type="text"
                            class="input"
                            placeholder
                            v-model="scope.row.postfix_packsize"
                            style="width: 60px;margin: 0 2px;"
                    ></el-input>
                    <el-select
                            size="mini"
                            v-model="scope.row.postfix_packunit"
                            :placeholder="$t('unit')"
                            style="width: 70px;margin: 0 2px;"
                    >
                        <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column :label="$t('purity')" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-input
                            size="mini"
                            type="text"
                            class="input"
                            :placeholder="$t('purity')"
                            v-model="scope.row.purity"
                            style="width: 60px"
                    ></el-input>
                    %
                </template>
            </el-table-column>
            <el-table-column :label="$t('leadtime')" align="center" min-width="140">
                <template slot-scope="scope">
                    <el-input
                            size="mini"
                            type="text"
                            class="input"
                            placeholder
                            v-model="scope.row.leadtime"
                            style="width: 60px"
                    ></el-input>
                    <el-select
                            size="mini"
                            v-model="scope.row.leadtime_unit"
                            :placeholder="$t('leadtime')"
                            style="width: 80px;margin: 0 2px;"
                    >
                        <el-option v-for="item in Cycle" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column :label="$t('invoice')" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-select
                            size="mini"
                            v-model="scope.row.invoice"
                            :placeholder="$t('invoice')"
                            style="width: 70px;margin: 0 2px;"
                    >
                        <el-option v-for="item in InvoiceInfo"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column :label="$t('remark')" align="center" min-width="160">
                <template slot-scope="scope">
                    <el-input size="mini" type="text" class="input" :placeholder="$t('remark')"
                              v-model="scope.row.note"></el-input>
                </template>
            </el-table-column>
            <el-table-column :label="$t('options')" align="center" min-width="80">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            v-if="quote_price.length>1"
                            type="primary"
                            @click="del(scope.$index)"
                    >-
                    </el-button>
                    <el-button v-if="scope.$index==0" size="mini" type="primary" @click="add()">+</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" :loading="loading" class="d2-mt-5" size="mini" @click="save">{{$t('submit')}}
        </el-button>
        <el-button v-if="show_watch&&permissions.indexOf(434)>-1" class="d2-mt-5" type="primary" @click="send()"
                   size="mini">{{$t('preview')}}
        </el-button>
        <el-button v-if="show_watch&&permissions.indexOf(434)>-1&&(cust_id==1001034||cust_id==43622||cust_id==1002736)" class="d2-mt-5" type="primary" @click="send_GVK()"
                   size="mini">GVK{{$t('preview')}}
        </el-button>
        <el-button v-if="show_watch&&permissions.indexOf(434)>-1&&(cust_id==1001034||cust_id==43622||cust_id==1002736)" class="d2-mt-5" type="primary" @click="upload_GVK()"
                   size="mini">GVK下载
        </el-button>
        <table border="1" bordercolor="#E5E5E5" style="margin-top: 30px;">
            <tr>
                <th v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}
                </th><!--供应商名称-->
                <th class="td" width="400">{{$t('Inquery.index.table4_title9')}}</th><!--供应商价格-->
                <th class="td">{{$t('Inquery.index.table4_title2')}}</th><!--采购进展-->
                <th class="td">{{$t('Inquery.index.table4_title3')}}</th><!--交货城市-->
                <th class="td">{{$t('Inquery.index.table4_title4')}}</th><!--供应商COA及谱图-->
                <th class="td">{{$t('Inquery.index.table4_title5')}}</th><!--联系人-->
                <th class="td">{{$t('Inquery.index.table4_title6')}}</th><!--联系方式-->
                <th class="td">{{$t('Inquery.index.table4_title8')}}</th><!--修改时间-->
                <th class="td">{{$t('Inquery.index.table4_title7')}}</th><!--采购-->
                <th class="td">{{$t('options')}}</th>
            </tr>
            <tr v-for="quote in historys" :style="quote.flag==1?'background:rgb(249, 233, 150);':''">
                <td v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">
                      <span v-if="quote.supplier_id==0">
                           <span class="red">{{quote.supplier_name}} <span
                                   v-if="quote.platform">({{quote.platform}})</span></span>
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
                <td>
                    <el-badge
                            v-if="quote.statistics_purchase_contracts&&quote.statistics_purchase_contracts!=''&&quote.statistics_purchase_contracts!=0"
                            :value="quote.statistics_purchase_contracts" class="badge">
                    </el-badge>
                    {{quote.info_string}}
                </td>
                <td><span v-html='quote.self_note'></span></td>
                <td>{{quote.delivery_city}}</td>
                <td>
                    <a v-if="quote.supplier_coa&&quote.supplier_coa.length>0" v-for="coa in quote.supplier_coa"
                       class="d2-ml-5" :href="coa.filename">{{coa.desc}}</a>
                </td>
                <td>{{attr(quote,'supplier_contact.name')}}</td>
                <td>
                    {{quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''}}
                </td>
                <td>{{quote.created_at}}</td>
                <td>{{attr(quote,'user.name')}}</td>
                <td>
                    <el-button v-if="quote.is_old!=1" type="primary" @click="checked(quote)" size="mini">
                        {{$t('Inquery.index.selectd')}}
                    </el-button>
                </td>
            </tr>
        </table>
        <el-dialog :title="$t('Inquery.index.email')" :visible.sync="dialogVisible_email" append-to-body>
            <div v-html="html"></div>
        </el-dialog>
        <el-dialog  width="80%" title="GVK预览" :visible.sync="dialogVisible_GVK" append-to-body>
            <div class="flex">
                <div class="w120">
                    <div class="border d2-text-center">RFQ Format</div>
                    <div class="border d2-text-center" v-for="(item,index) in GVKDATA" :key="index">{{index+1}}</div>
                </div>
                <div class="w410">
                    <div class="border"> <span>Details</span></div>
                    <div class="border"><span>Quotation No & Date</span></div>
                    <div class="border"><span>HSN Code</span></div>
                    <div class="border"><span>Material Description</span></div>
                    <div class="border"><span>CAS No</span></div>
                    <div class="border"><span>CAT No</span></div>
                    <div class="border"><span>Quantity</span></div>
                    <div class="border"><span>UOM  (Grm/Kg/Ml/Ltr/Mg/EA/Pack)</span></div>
                    <div class="border"><span>Unit Price</span></div>
                    <div class="border"><span>Currency (INR/USD/GBP/EUR)</span></div>
                    <div class="border"><span>Discount % Age</span></div>
                    <div class="border"><span>SGST / CGST / IGST % Age</span></div>
                    <div class="border"><span>Freight cost</span></div>
                    <div class="border"><span>Packing & Forwarding</span></div>
                    <div class="border"><span>Lead time</span></div>
                    <div class="border"><span>Insurance Value</span></div>
                    <div class="border"><span>Inco terms- (EXW/FOR/FOB/CIF/CFR/CIP/FCA)</span></div>
                    <div class="border"><span>Dispatch Mode (By DHL/ By FedEx/By Air /By Courier/By Road)</span></div>
                    <div class="border"><span>Quotation Validity Date</span></div>
                    <div class="border"><span>Payment Terms </span></div>
                    <div class="border"><span>Mandatory Documents (COA & MSDS)</span></div>
                </div>
                <div class="flex-1" v-for="(item,index) in GVKDATA[0]" style="flex: 1;">
                    <div class="border"> <span>Details</span></div>
                    <div class="border" v-for="(m,n) in GVKDATA" :class="(n==1&&m[index]==='')?'bgRed':''">
                         <span v-if="n!=16">{{m[index]}}</span>
                         <span v-else>
                             <el-select
                                 size="mini"
                                 v-model="m[index]"
                                 style="width: 120px;"
                                 @change="selectExpress(index,m[index])"
                                 >
                                <el-option v-for="(item,i) in express" :key="i" :label="item" :value="item"></el-option>
                             </el-select>
                         </span>
                    </div>

                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {
        inquiry_lists,
        getQuoteHistoryByProdId,
        getQuoteHistoryByProdId_inquery_id,
        getInstore,
        outPrice_quote,
        send_sale,
        confirmGenerate,
        previewEmail,
        sale_price_switch,
        previewGVK,
        setExpress
    } from "@/api/Inquery";
    import util from "@/libs/util";
    import Big from "@/big/a/big.mjs";

    export default {
        name: "",
        data() {
            return {
                permissions: JSON.parse(localStorage.getItem('permissions')),
                units: [],
                inventory_total: [],
                specs: [],
                historys: [],
                Currency: [],
                Cycle: [],
                InvoiceInfo: [],
                quote: {},
                quote_: {},
                info_: [],
                loading: false,
                outprice: {},
                quantity: "",
                advantage: {},
                advantage_show: false,
                show: false,
                show_watch: false,
                dialogVisible_email:false,
                dialogVisible_GVK:false,
                html:null,
                GVKDATA:[],
                ChemicalAppearance:[],
                quote_price: [{
                    trade: 'EXW',
                    statistics_saler_contracts: '',
                    currency: 2,
                    price: '',
                    prefix_packsize: '',
                    prefix_packunit: 'g',
                    postfix_packsize: '',
                    postfix_packunit: 'g',
                    purity: '',
                    leadtime: '',
                    leadtime_unit: '',
                    invoice: 1,
                    note: '',
                    skuno: ''
                }],
                types: ['EXW', 'CIP', 'DAP', 'FOB', 'CIF'],
                express:['By DHL','By FedEx','By Air','By Courier','By Road'],
                inquiry: {},
                user_type: '',
                user_id: '',
                roles_ids:[]
            };
        },
        props: ["id", "inquery_id", "prod_id", "time_sale", "country_code", "cust_id", "cas"],
        watch: {
            time_sale(val) {
                if (this.id != undefined) {
                    this.fetchData();
                }
            }
        },
        created() {
            this.user_type = util.cookies.get('user_type')
            this.user_id = util.cookies.get('user_id')
            var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
            this.roles_ids=[]
            roles_ids_list.forEach(item=>{
                this.roles_ids.push(item.id)
            })
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.advantage = []
                this.quote = {}
                this.quote_ = {}
                this.quote_price = []
                this.advantage_show = false
                this.show = false
                this.show_watch = false
                // outPrice_quote(this.id).then(res => {
                // if (res && res.code == 0) {
                //     this.quote = res.data.quote
                //     this.quantity=res.data.quote.inquiry.quantity
                //     this.info_=JSON.parse(JSON.stringify(res.data.quote)).info
                //     this.Currency=res.enum.Currency
                //     this.Cycle=res.enum.Cycle
                //     this.InvoiceInfo=res.enum.InvoiceInfo
                //     this.units=res.enum.units
                // }
                // })

                confirmGenerate(this.id).then(res => {
                    if (res && res.code == 0) {
                        this.inquiry = res.data.inquiry
                        this.quote = res.data.outprice;
                        if (res.data.outprice) {
                            this.info_ = JSON.parse(JSON.stringify(res.data.outprice)).price;
                        }
                        this.Currency = res.enum.Currency;
                        this.Cycle = res.enum.Cycle;
                        this.InvoiceInfo = res.enum.InvoiceInfo;
                        this.units = res.enum.units;
                        if (res.data.outprice && res.data.outprice.quote_id) {
                            this.show = true
                            this.show_watch = true
                            this.quote_price = res.data.outprice.price
                            this.quote_price.forEach((items, index) => {
                                if (!items.trade) {
                                    items.trade = 'EXW'
                                }
                            })
                            outPrice_quote(res.data.outprice.quote_id).then(res => {
                                if (res && res.code == 0) {
                                    this.quote_ = res.data.quote
                                }
                            })
                        } else if (res.data.outprice && !res.data.outprice.quote_id) {
                            this.show = false
                            this.show_watch = true
                            this.quote_price = res.data.outprice.price
                            this.quote_price.forEach((items, index) => {
                                if (!items.trade) {
                                    items.trade = 'EXW'
                                }
                            })
                        } else {
                            if (res.data.advantage) {
                                this.advantage = res.data.advantage
                                this.advantage_show = true
                                this.show = true
                                this.quote_price = res.data.advantage.info
                                this.quote_price.forEach((items, index) => {
                                    if (!items.trade) {
                                        items.trade = 'EXW'
                                    }
                                })
                                outPrice_quote(res.data.advantage.id).then(res => {
                                    if (res && res.code == 0) {
                                        this.quote_ = res.data.quote
                                        if (this.country_code !== 'CHN') {
                                            this.quote_price.forEach((items, index) => {
                                                // if(items.currency!==1){
                                                //     items.price=(new Big(items.price).times(this.getEnumValue(this.Currency,1,'ratio'))).toFixed(2)
                                                // }
                                                let obj = {
                                                    price: items.price,
                                                    cust_id: this.cust_id,
                                                    currency: items.currency
                                                }
                                                sale_price_switch(obj).then(res => {
                                                    items.price = res.data.price
                                                })
                                                items.invoice = 2
                                                items.currency = 1
                                            })
                                        } else {
                                            this.quote_price.forEach((items, index) => {
                                                let obj = {
                                                    price: items.price,
                                                    cust_id: this.cust_id,
                                                    currency: items.currency
                                                }
                                                sale_price_switch(obj).then(res => {
                                                    items.price = res.data.price
                                                })
                                                items.invoice = 1
                                                items.currency = 2
                                            })
                                        }
                                    }
                                })
                            } else {
                                this.show = false
                                this.advantage_show = false
                                if (this.country_code === 'CHN') {
                                    this.quote_price = [{
                                        trade: 'EXW',
                                        currency: 2,
                                        price: '',
                                        prefix_packsize: '',
                                        prefix_packunit: 'g',
                                        postfix_packsize: '',
                                        postfix_packunit: 'g',
                                        purity: '',
                                        leadtime: '',
                                        leadtime_unit: '',
                                        invoice: 1,
                                        note: '',
                                    }]
                                } else {
                                    this.quote_price = [{
                                        trade: 'EXW',
                                        currency: 1,
                                        price: '',
                                        prefix_packsize: '',
                                        prefix_packunit: 'g',
                                        postfix_packsize: '',
                                        postfix_packunit: 'g',
                                        purity: '',
                                        leadtime: '',
                                        leadtime_unit: '',
                                        invoice: 2,
                                        note: '',
                                    }]
                                }
                            }
                        }
                        this.quote_price[0].statistics_saler_contracts = this.inquiry.statistics_saler_contracts
                    }
                });
                this.inventory_total = []
                this.specs = []
                getInstore(this.prod_id).then(res => {
                    if (res && res.code == 0) {
                        this.inventory_total = res.data.inventories;
                        this.specs = res.data.specs;
                        this.units = res.enum.units;
                        this.ChemicalAppearance=res.enum.ChemicalAppearance
                    }
                });
                this.historys = []
                getQuoteHistoryByProdId_inquery_id(this.cas, this.inquery_id).then(res => {
                    if (res && res.code == 0) {
                        this.historys = res.data.data;
                    }
                });
            },
            change_trade(item, index) {
                this.$set(this.quote_price[index], item)
            },
            checked(item) {
                if (this.country_code !== 'CHN') {
                    item.info.forEach((items, index) => {
                        if (!items.trade) {
                            items.trade = 'EXW'
                        }
                        // if(items.currency!==1){
                        //     items.price=(new Big(items.price).times(this.getEnumValue(this.Currency,1,'ratio'))).toFixed(2)
                        // }
                        let obj = {
                            price: items.price,
                            cust_id: this.cust_id,
                            currency: items.currency
                        }
                        sale_price_switch(obj).then(res => {
                            items.price = res.data.price
                        })
                        items.invoice = 2
                        items.currency = 1
                    })
                } else {
                    item.info.forEach((items, index) => {
                        if (!items.trade) {
                            items.trade = 'EXW'
                        }
                        // if(items.currency!==1){
                        //     items.price=(new Big(items.price).times(this.getEnumValue(this.Currency,1,'ratio'))).toFixed(2)
                        // }
                        let obj = {
                            price: items.price,
                            cust_id: this.cust_id,
                            currency: items.currency
                        }
                        sale_price_switch(obj).then(res => {
                            items.price = res.data.price
                        })
                        items.invoice = 1
                        items.currency = 2
                    })
                }
                this.show = true
                this.quote = item
                this.quote_ = item
                this.quote_price = item.info
            },
            send() {
                previewEmail(this.id).then(res => {
                    this.dialogVisible_email=true
                    this.html=res.data
                    // this.$emit('get_html', res.data)
                })
            },
            send_GVK(){
                previewGVK(this.id,this.cust_id).then(res=>{
                    this.dialogVisible_GVK=true
                    this.GVKDATA=res.data
                    this.select_express= this.GVKDATA[16]
                })
            },
            selectExpress(index,express){
                setExpress(this.id,index,express)
            },
            upload_GVK(){
                let obj={
                    all_search:[{"search_one":"id","search_two":"dy","search_content":this.id,"name":""}],
                    genGVKQuotePriceZip:1,
                }
                inquiry_lists(obj).then(res => {
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
            add() {
                this.quote_price.push({
                    trade: this.quote_price[0].trade,
                    currency: this.quote_price[0].currency,
                    price: "",
                    prefix_packsize: "",
                    prefix_packunit: this.quote_price[0].prefix_packunit,
                    postfix_packsize: "",
                    postfix_packunit: this.quote_price[0].postfix_packunit,
                    purity: this.quote_price[0].purity,
                    leadtime: this.quote_price[0].leadtime,
                    leadtime_unit: this.quote_price[0].leadtime_unit,
                    invoice: this.quote_price[0].invoice,
                    note: this.quote_price[0].note,
                    skuno: ''
                });
            },
            del: function (index) {
                this.quote_price.splice(index, 1);
            },
            save() {
                if (this.quote) {
                    if (this.quote_) {
                        send_sale(
                            this.id,
                            this.quote_.id,
                            this.info_,
                            this.quote_price,
                            this
                        );
                    } else {
                        send_sale(
                            this.id,
                            this.quote.quote_id,
                            this.info_,
                            this.quote_price,
                            this
                        );
                    }
                } else {
                    send_sale(
                        this.id,
                        '',
                        '',
                        this.quote_price,
                        this
                    );
                }
            }
        }
    };
</script>