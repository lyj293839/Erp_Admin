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
<template>
    <div>
        <el-row :gutter="10">
            <el-col v-if="specs.length>0||inventory_total.length>0" :span="6">
                <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;max-height: 200px!important;overflow:scroll;display:inline-block;width: 313px;">
                    <tr>
                        <th class="td">{{$t('Inquery.index.table5_title1')}}</th><!--品牌-->
                        <th class="td">{{$t('Inquery.index.table5_title2')}}</th><!--规格-->
                        <th class="td">{{$t('Inquery.index.table5_title3')}}</th><!--纯度-->
                        <th class="td">{{$t('Inquery.index.table5_title4')}}</th><!--中国定价(￥)-->
                        <th class="td">{{$t('Inquery.index.table5_title5')}}</th><!--国外定价($)-->
                    </tr>
                    <tr v-for="spec in specs">
                        <td>{{attr(spec,'brand.name')}}</td>
                        <td><span v-if="spec.pack_number">{{spec.pack_number}}*</span>{{spec.pack_size}}{{getEnumValue(units,spec.pack_unit_id)}}
                        </td>
                        <td>{{spec.purity}}</td>
                        <td>{{spec.inland_price}}</td>
                        <td>{{spec.abroad_price}}</td>
                    </tr>
                </table>
            </el-col>
            <el-col  v-if="inventory_total.length>0||specs.length>0" :span="18">
                <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
                    <tr>
                        <th class="td">{{$t('Inquery.index.table6_title1')}}</th><!--仓库-->
                        <th class="td">{{$t('Inquery.index.table6_title2')}}</th><!--入库日期-->
                        <th class="td">{{$t('Inquery.index.table6_title3')}}</th><!--纯度-->
                        <th v-if="user_type!=102" class="td">{{$t('Inquery.index.table6_title4')}}</th><!--运输条件-->
                        <th class="td">{{$t('Inquery.index.table6_title5')}}</th><!--性质外观-->
                        <th v-if="user_type!=102" class="td">{{$t('Inquery.index.table6_title6')}}</th><!--包装-->
                        <th class="td">{{$t('Inquery.index.table6_title7')}}</th><!--检测数据-->
                        <th class="td">{{$t('Inquery.index.table6_title8')}}</th><!--采购人员-->
                        <th class="td">{{$t('Inquery.index.table6_title9')}}</th><!--库存数量-->
                        <th class="td">{{$t('Inquery.index.table6_title17')}}</th><!--结算价-->
                        <th class="td">{{$t('Inquery.index.table6_title15')}}</th><!--是否含税-->
                        <!--<th class="td">{{$t('Inquery.index.table6_title10')}}</th>&lt;!&ndash;采购单价&ndash;&gt;-->
                        <!--<th class="td">{{$t('Inquery.index.table6_title11')}}</th>&lt;!&ndash;成本单价&ndash;&gt;-->
                        <!--<th class="td">{{$t('Inquery.index.table6_title12')}}</th>&lt;!&ndash;合同预占&ndash;&gt;-->
                    </tr>
                    <tr v-for="inventory in inventory_total">
                        <td>{{attr(inventory,'warehouse.name')}}</td>
                        <td>{{inventory.created_at}}</td>
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
                        <!--<td>{{getEnumValue(Currency,attr(inventory,'order.currency_id'),'icon')}}{{attr(inventory,'order.price')}}/{{getEnumValue(units,attr(inventory,'order.quantity_unit'))}}</td>-->
                        <td>
                            <span v-if="attr(inventory,'order.jiesuan_price')">
                                <!--{{attr(inventory,'order.jiesuan_price')}}-->
                                ￥{{inventory.order.jiesuan_price}}/<span v-if="inventory.order.quantity_unit==1||inventory.order.quantity_unit==3||inventory.order.quantity_unit==4||inventory.order.quantity_unit==5">g</span><span v-if="inventory.order.quantity_unit==2||inventory.order.quantity_unit==6">ml</span>
                            </span>
                            <span>{{getEnumValue(Currency,attr(inventory,'order.currency_id'),'icon')}}{{attr(inventory,'order.price')}}/{{getEnumValue(units,attr(inventory,'order.quantity_unit'))}}</span>
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
        <table border="1"  bordercolor="#E5E5E5" style="margin-top: 10px;">
            <tr>
                <th class="td" v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80">{{$t('Inquery.index.table4_title1')}}</th><!--供应商名称-->
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
            <tr >
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
                <td>{{quote.info_string}}</td>
                <td><span v-html='quote.self_note'></span></td>
                <td>{{quote.delivery_city}}</td>
                <td>
                    <a v-if="quote.supplier_coa&&quote.supplier_coa.length>0" v-for="coa in quote.supplier_coa" class="d2-ml-5" :href="coa.filename">{{coa.desc}}</a>
                </td>
                <td>{{quote.supplier_contact?quote.supplier_contact.name:''}}</td>
                <td>
                    {{quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''}}
                </td>
                <td>{{quote.created_at}}</td>
                <td style="color: red;">{{quantity}}<span v-if="note">/{{note}}</span></td>
                <td style="color: red;">{{specification}}</td>
                <!--<td style="color: red;">{{quote.inquiry?quote.inquiry.quantity:''}}</td>-->
                <!--<td style="color: red;">{{quote.inquiry?quote.inquiry.specification:''}}</td>-->
            </tr>
        </table>
        <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
            <tr >
                <th class="td">{{$t('pack')}}</th>
                <th class="td">{{$t('purity')}}</th>
                <th class="td">{{$t('leadtime')}}</th>
                <th class="td">{{$t('invoice')}}</th>
                <th class="td">{{$t('remark')}}</th>
                <th class="td"></th>
            </tr>
            <tr v-for="(info,index) in quote.info">
                <td>
                    <span class="d2-mr-5"><el-badge v-if="info.statistics_saler_contracts&&info.statistics_saler_contracts!=''&&info.statistics_saler_contracts!=0" :value="info.statistics_saler_contracts" class="badge">
                     </el-badge></span>
                    <el-select
                            v-if="info.currency!=2"
                            size="mini"
                            v-model="info.trade"
                            :placeholder="$t('trade')"
                            @change="change_trade(info,index)"
                            style="width: 70px;margin: 0 2px;"
                    >
                        <el-option
                                v-for="(item,index) in types"
                                :key="index"
                                :label="item"
                                :value="item"
                        ></el-option>
                    </el-select>
                    <el-select size="mini" v-model="info.currency" :placeholder="$t('currency')"
                               style="width: 70px;margin: 0 2px;">
                        <el-option
                                v-for="item in Currency"
                                :key="item.value"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-input size="mini" type="text" class="input" :placeholder="$t('price')" v-model="info.price"
                              style="width: 60px;margin: 0 2px;"></el-input>
                    /
                    <el-input size="mini" type="text" class="input" placeholder="" v-model="info.prefix_packsize"
                              style="width: 60px;margin: 0 2px;"></el-input>
                    <el-select size="mini" v-model="info.prefix_packunit" :placeholder="$t('unit')"
                               style="width: 70px;margin: 0 2px;">
                        <el-option
                                v-for="item in units"
                                :key="item.id"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                    for
                    <el-input size="mini" type="text" class="input" placeholder="" v-model="info.postfix_packsize"
                              style="width: 60px;margin: 0 2px;"></el-input>
                    <el-select size="mini" v-model="info.postfix_packunit" :placeholder="$t('unit')"
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
                    <el-input size="mini" type="text" class="input" :placeholder="$t('purity')" v-model="info.purity"
                              style="width: 60px"></el-input>
                </td>
                <td>
                    <el-input size="mini" type="text" class="input" placeholder="" v-model="info.leadtime"
                              style="width: 60px"></el-input>
                    <el-select size="mini" v-model="info.leadtime_unit" :placeholder="$t('leadtime')"
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
                    <el-select size="mini" v-model="info.invoice" :placeholder="$t('invoice')"
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
                              v-model="info.note"></el-input>
                </td>
                <td>
                    <el-button
                            size="mini"
                            v-if="quote.info.length>1"
                            type="primary"
                            @click="del(index)"
                    >-</el-button>
                    <el-button v-if="index==0" size="mini" type="primary" @click="add()">+</el-button>
                </td>
            </tr>
        </table>
        <el-button type="primary" :loading="loading" size="mini" @click="save">{{$t('submit')}}</el-button>
        <el-button v-if="show_watch&&permissions.indexOf(434)>-1" class="d2-mt-5" type="primary" @click="send_email()" size="mini" >{{$t('preview')}}</el-button>
        <el-button v-if="show_watch&&permissions.indexOf(434)>-1&&(cust_id==1001034||cust_id==43622||cust_id==1002736)" class="d2-mt-5" type="primary" @click="send_GVK()"
                   size="mini">GVK{{$t('preview')}}
        </el-button>
        <el-button v-if="show_watch&&permissions.indexOf(434)>-1&&(cust_id==1001034||cust_id==43622||cust_id==1002736)" class="d2-mt-5" type="primary" @click="upload_GVK()"
                   size="mini">GVK下载
        </el-button>
        <table border="1" bordercolor="#E5E5E5" style="margin-top: 30px;">
            <tr>
                <th v-if="(user_type!=102&&roles_ids.indexOf(42)==-1)||user_id==151||user_id==80" class="td">{{$t('Inquery.index.table4_title1')}}</th><!--供应商名称-->
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
                <td><el-badge v-if="quote.statistics_purchase_contracts&&quote.statistics_purchase_contracts!=''&&quote.statistics_purchase_contracts!=0" :value="quote.statistics_purchase_contracts" class="badge">
                </el-badge>{{quote.info_string}}</td>
                <td><span v-html='quote.self_note'></span></td>
                <td>{{quote.delivery_city}}</td>
                <td><a v-if="quote.supplier_coa&&quote.supplier_coa.length>0" v-for="coa in quote.supplier_coa" class="d2-ml-5" :href="coa.filename">{{coa.desc}}</a></td>
                <td>{{quote.supplier_contact?quote.supplier_contact.name:''}}</td>
                <td>
                    {{quote.supplier_contact?(quote.supplier_contact.phone?quote.supplier_contact.phone:quote.supplier_contact.mobile):''}}
                </td>
                <td>{{quote.updated_at}}</td>
                <td>{{quote.user?quote.user.name:''}}</td>
                <td><el-button type="primary" @click="checked(quote)" size="mini">{{$t('Inquery.index.selectd')}}</el-button></td>
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
        previewGVK,
        inquiry_lists,
        getQuoteHistoryByProdId,
        getInstore,
        outPrice_quote,
        outPriceCreate,
        sale_price_switch,
        previewEmail,
        setExpress
    } from "@/api/Inquery";
    import util from "@/libs/util";
    import Big from "@/big/a/big.mjs";
    export default {
        name: "",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                user_type:'',
                user_id:'',
                units: [],
                inventory_total: [],
                specs: [],
                historys: [],
                Currency:[],
                Cycle:[],
                InvoiceInfo:[],
                quote: {},
                info_:[],
                loading:false,
                dialogVisible_email:false,
                dialogVisible_GVK:false,
                html:null,
                GVKDATA:[],
                outprice:{},
                ChemicalAppearance:[],
                quantity:'',
                specification:'',
                note:'',
                show_watch:false,
                types:['EXW','CIP','DAP','FOB','CIF'],
                express:['By DHL','By FedEx','By Air','By Courier','By Road'],
                roles_ids:[]
            }
        },
        props: ["id","cas","prod_id", 'select_time','country_code','cust_id','inquery_id'],
        watch: {
            select_time(val) {
                if (this.id != undefined) {
                    this.user_type=util.cookies.get('user_type')
                    this.user_id=util.cookies.get('user_id')
                    this.fetchData()
                }
            }
        },
        created() {
            this.user_type=util.cookies.get('user_type')
            this.user_id=util.cookies.get('user_id')
            var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
            this.roles_ids=[]
            roles_ids_list.forEach(item=>{
                this.roles_ids.push(item.id)
            })
            this.fetchData()
        },
        methods: {
            fetchData() {
                outPrice_quote(this.id).then(res => {
                    if (res && res.code == 0) {
                        this.Currency=res.enum.Currency
                        this.Cycle=res.enum.Cycle
                        this.InvoiceInfo=res.enum.InvoiceInfo
                        this.units=res.enum.units
                        this.quote = res.data.quote
                        this.quantity= res.data.quote.inquiry?res.data.quote.inquiry.quantity:''
                        this.specification= res.data.quote.inquiry?res.data.quote.inquiry.specification:''
                        this.note= res.data.quote.inquiry?res.data.quote.inquiry.note:''
                        this.info_=JSON.parse(JSON.stringify(res.data.quote)).info
                        if(this.country_code!=='CHN'){
                           this.quote.info.forEach((items,index)=>{
                               if(!items.trade){
                                   items.trade='EXW'
                               }
                               let obj={
                                   price:items.price,
                                   cust_id:this.cust_id,
                                   currency:items.currency
                               }
                               sale_price_switch(obj).then(res=>{
                                   items.price=res.data.price
                               })
                               items.invoice=2
                               items.currency=1

                           })
                        }else{
                            this.quote.info.forEach((items,index)=>{
                                if(!items.trade){
                                    items.trade='EXW'
                                }
                                let obj={
                                    price:items.price,
                                    cust_id:this.cust_id,
                                    currency:items.currency
                                }
                                sale_price_switch(obj).then(res=>{
                                    items.price=res.data.price
                                })
                                items.invoice=1
                                items.currency=2
                            })
                        }
                        this.quote.info[0].statistics_saler_contracts=this.quote.inquiry.statistics_saler_contracts
                    }
                })
                getInstore(this.prod_id).then(res => {
                    if (res && res.code == 0) {
                        this.inventory_total = res.data.inventories
                        if(res.data.specs&&res.data.specs.length>0){
                            this.specs = res.data.specs
                        }else{
                            this.specs =[]
                        }
                        this.units = res.enum.units
                        this.ChemicalAppearance=res.enum.ChemicalAppearance
                    }
                })
                getQuoteHistoryByProdId(this.cas).then(res => {
                    if (res && res.code == 0) {
                        this.historys = res.data.data
                    }
                })
            },
            change_trade(item,index){
                this.$set(this.quote.info[index],item)
            },
            send_email() {
                previewEmail(this.inquery_id).then(res => {
                    this.dialogVisible_email=true
                    this.html=res.data
                    // this.$emit('get_html', res.data)
                })
            },
            add(){
                this.quote.info.push({
                    trade: this.quote.info[0].trade,
                    currency: this.quote.info[0].currency,
                    price: "",
                    prefix_packsize: "",
                    prefix_packunit: this.quote.info[0].prefix_packunit,
                    postfix_packsize: "",
                    postfix_packunit: this.quote.info[0].postfix_packunit,
                    purity: this.quote.info[0].purity,
                    leadtime: this.quote.info[0].leadtime,
                    leadtime_unit:this.quote.info[0].leadtime_unit,
                    invoice: this.quote.info[0].invoice,
                    note: this.quote.info[0].note,
                    skuno:''
                });
            },
            del(index){
                this.quote.info.splice(index,1)
            },
            checked(item){
                if(this.country_code!=='CHN'){
                    item.info.forEach((items,index)=>{
                        if(!items.trade){
                            items.trade='EXW'
                        }
                        let obj={
                            price:items.price,
                            cust_id:this.cust_id,
                            currency:items.currency
                        }
                        sale_price_switch(obj).then(res=>{
                            items.price=res.data.price
                        })
                        items.invoice=2
                        items.currency=1
                    })
                }else{
                    item.info.forEach((items,index)=>{
                        if(!items.trade){
                            items.trade='EXW'
                        }
                        let obj={
                            price:items.price,
                            cust_id:this.cust_id,
                            currency:items.currency
                        }
                        sale_price_switch(obj).then(res=>{
                            items.price=res.data.price
                        })
                        items.invoice=1
                        items.currency=2
                    })
                }
                this.quote=item

            },
            send_GVK(){
                previewGVK(this.inquery_id,this.cust_id).then(res=>{
                    this.dialogVisible_GVK=true
                    this.GVKDATA=res.data
                })
            },
            selectExpress(index,express){
                setExpress(this.inquery_id,index,express)
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
            save(){
                let obj={
                    inquiry_id:this.quote.inquiry_id,
                    quote_id:this.quote.id,
                    quote_price:this.info_,
                    price:this.quote.info,
                }
                outPriceCreate(obj,this)
            }
        }
    }
</script>
<style scoped>

</style>