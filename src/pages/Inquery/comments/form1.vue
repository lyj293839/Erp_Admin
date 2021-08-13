<style lang="scss" scoped type="text/scss">
/deep/ table td{
   padding: 5px 0!important;
}
/deep/ .el-table .cell {
    padding: 0;
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

    .el-table__expanded-cell[class*=cell] {
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
    <div >
        <el-row class="d2-mb-10">
            <el-col :span="16"><div style="color: red;margin-bottom: 10px;">cas:<span class="d2-mr-5">{{cas}}</span><span>{{$t('Inquery.index.table4_title10')}}:{{quantity}}<span v-if="note">/{{note}}</span></span>&nbsp;&nbsp;<span>{{$t('Inquery.index.table4_title11')}}:{{specification}}</span></div>
            </el-col>
            <el-col :span="8">
                <el-input
                        type="textarea"
                        :rows="2"
                        placeholder=""
                        v-model="textarea"
                        >
                </el-input>
            </el-col>
        </el-row>
        <div class="item1">
                <div  style="width: 100%;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);padding: 5px;margin-bottom: 20px;">
                        <el-row class="inquery">
                            <el-col :span="6">
                                <div class="d2-m-5" style="display:flex;">
                                    <span style="color:red;margin-right:2px;">*</span>
                                    <el-select
                                            v-model="inquiry.supplier_id"
                                            filterable
                                            remote
                                            clearable
                                            size="mini"
                                            reserve-keyword
                                            :placeholder="$t('Inquery.index.supplier')"
                                            :remote-method="remoteMethod"
                                            :loading="loading"
                                             @change="get_supplier_id(inquiry.supplier_id)"
                                            style="width: 100%;"
                                    >
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :style="{color:(item.supplier_status==2||item.is_stop==2)?'red':''}"
                                                :disabled="(item.supplier_status==2||item.is_stop==2)?true:false"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="d2-m-5">
                                <el-select v-model="inquiry.supplier_contact_id" filterable
                                           size="mini" :placeholder="$t('Inquery.index.contact_person')">
                                    <el-option
                                    v-for="(i,index) in contacts_lists"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id">
                                    </el-option>
                                </el-select>
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div class="d2-m-5">
                                    <el-input size="mini" v-model="inquiry.self_note"  type="text" class="input" :placeholder="$t('Inquery.index.table4_title2')">
                                    </el-input>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="d2-m-5">
                                    <el-input size="mini" v-model="inquiry.delivery_city"  type="text" class="input" :placeholder="$t('Inquery.index.table4_title3')">
                                </el-input>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="d2-m-5">
                                    <el-select v-model="inquiry.status" filterable
                                               size="mini" placeholder="Please Select">
                                        <el-option
                                        v-for="(i,index) in options2"
                                        :key="index"
                                        :label="i.name"
                                        :value="i.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="d2-m-5 d2-text-center">
                                    <el-button size="mini" type="primary" @click="save()" name="save" :loading="loading">{{$t('save')}}</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    <el-table
                            :data="inquiry.info"
                            border
                            tooltip-effect="dark"
                            style="width: 100%;"
                            class="d2-mt-5 d2-text-center"
                    >
                        <el-table-column :label="$t('pack')" align="center" min-width="400">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="scope.row.currency" :placeholder="$t('currency')"
                                           style="width: 70px;margin: 0 2px;">
                                    <el-option
                                            v-for="item in Currency"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-input size="mini" type="text" class="input" :placeholder="$t('price')" v-model="scope.row.price"
                                          style="width: 60px;margin: 0 2px;"></el-input>
                                /
                                <el-input size="mini" type="text" class="input" placeholder="" v-model="scope.row.prefix_packsize"
                                          style="width: 60px;margin: 0 2px;"></el-input>
                                <el-select size="mini" v-model="scope.row.prefix_packunit" :placeholder="$t('unit')"
                                           style="width: 70px;margin: 0 2px;">
                                    <el-option
                                            v-for="item in units"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                                for
                                <el-input size="mini" type="text" class="input" placeholder="" v-model="scope.row.postfix_packsize"
                                          style="width: 60px;margin: 0 2px;"></el-input>
                                <el-select size="mini" v-model="scope.row.postfix_packunit" :placeholder="$t('unit')"
                                           style="width: 70px;margin: 0 2px;">
                                    <el-option
                                            v-for="item in units"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('purity')" align="center" min-width="80">
                            <template slot-scope="scope">
                                <el-input size="mini" type="text" class="input" :placeholder="$t('purity')" v-model="scope.row.purity"
                                          style="width: 60px"></el-input>
                                %
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('leadtime')" align="center" min-width="140">
                            <template slot-scope="scope">
                                <el-input size="mini" type="text" class="input" placeholder="" v-model="scope.row.leadtime"
                                          style="width: 60px"></el-input>
                                <el-select size="mini" v-model="scope.row.leadtime_unit" :placeholder="$t('leadtime')"
                                           style="width: 80px;margin: 0 2px;">
                                    <el-option
                                            v-for="item in Cycle"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column :label="$t('invoice')" align="center" min-width="100">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="scope.row.invoice" :placeholder="$t('invoice')"
                                           style="width: 80px;margin: 0 2px;">
                                    <el-option
                                            v-for="item in InvoiceInfo"
                                            :key="item.id"
                                            :disabled="invoiceDisabled&&!item.invoiceDisabled"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
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
                                <el-button size="mini" v-if="inquiry.info.length>1" type="primary"
                                           @click="del(scope.$index)">-
                                </el-button>
                                <el-button  v-if="scope.$index==0" size="mini" type="primary" @click="add(inquiry.info.length-1)">+</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
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
                        <tr v-for="quote in historys_no_collection.data" :key="quote.id">
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
                        <tr v-for="quote in historys_collection.data" :key="quote.id">
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
                     <tr v-for="quote in yilan_collection.data" >
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
    </div>
</template>

<script>
    import {
        PurchaseQuote_lists,
        supplier_lists,
        contacts_lists,
        create,
        update,
        getQuoteHistoryByProdId
    } from '@/api/Inquery'
    import $ from 'jquery'
    import util from "@/libs/util";
    export default {
        name: "",
        data() {
            return {
                dialogAdd: false,
                lists: [],
                user_id:'',
                user_type:'',
                currentPage:1,
                inquiry: {
                    inquiry_id: '',
                    supplier_id: '',
                    supplier_contact_id: '',
                    info:[{
                        currency: 2,
                        price: '',
                        prefix_packsize: '',
                        prefix_packunit: 'g',
                        postfix_packsize: '',
                        postfix_packunit: 'g',
                        purity: '',
                        leadtime: '',
                        leadtime_unit: '',
                        invoice:1,
                        note: '',
                    }],
                    self_note: '',
                    delivery_city: '',
                    remark: '',
                    status: 1
                },
                // 要展开的行，数值的元素是row的key值
                expands: [],
                Currency:[],
                Cycle:[],
                InvoiceInfo:[],
                units:[],
                contacts_lists:[],
                options: [],
                options2: [{
                    id:0,
                    name:"报价中"
                },{
                    id:1,
                    name:"已报价"
                }],
                value: [],
                list: [],
                loading: false,
                textarea:'',
                historys_collection:[],
                historys_no_collection:[],
                yilan_collection:[],
                yilan_currentPage:1,
                history_price_activeName:'first',
                historys_currentPage:1,
                historys_no_currentPage:1,
                invoiceDisabled:false,
                roles_ids:[]
            }
        },
        props: ['datas','procure_time','quantity','specification','note','cas','prod_id'],
        watch: {
            procure_time(val) {
                if(this.datas != undefined) {
                    this.inquiry.inquiry_id=this.datas
                    this.fetchData(this.datas,this.cas)
                }
            }
        },
        created() {
            if (this.datas != undefined) {
                this.inquiry.inquiry_id=this.datas
                this.user_type=util.cookies.get('user_type')
                this.user_id=util.cookies.get('user_id')
                this.fetchData(this.datas,this.cas)
            }
            var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
            this.roles_ids=[]
            roles_ids_list.forEach(item=>{
                this.roles_ids.push(item.id)
            })
        },
        methods: {
            add_form(){
                this.inquiry={
                        inquiry_id: this.inquiry.inquiry_id,
                        supplier_id: '',
                        supplier_contact_id: '',
                        info:[{
                        currency: 2,
                        price: '',
                        prefix_packsize: '',
                        prefix_packunit: 'g',
                        postfix_packsize: '',
                        postfix_packunit: 'g',
                        purity: '',
                        leadtime: '',
                        leadtime_unit: '',
                        invoice:1,
                        note: '',
                    }],
                        self_note: '',
                        delivery_city: '',
                        remark: '',
                        status: 1
                }
            },
            
            edit(item){
                this.dialogAdd=true
                this.inquiry=JSON.parse(JSON.stringify(item))
                this.options=[]
                this.options.push(item.supplier)
                contacts_lists(item.supplier_id).then(res=>{
                    this.contacts_lists=res.data
                })
            },
            get_supplier_id(id){
                if(id){
                    this.inquiry.supplier_contact_id=''
                    this.inquiry.info.forEach(res=>{
                        res.invoice=this.options.filter(res=>{return res.id===id})[0].invoice_type
                        if(res.invoice){
                            this.invoiceDisabled=true
                            this.InvoiceInfo[res.invoice].invoiceDisabled=true
                            this.InvoiceInfo[2].invoiceDisabled=true
                        }else{
                            this.invoiceDisabled=false
                            Object.values(this.InvoiceInfo).forEach(res=>{
                                res.invoiceDisabled=false
                            })
                            this.inquiry.info.forEach(res=>{
                                res.invoice=''
                            })
                        }
                    })
                    contacts_lists(id).then(res=>{
                        this.contacts_lists=res.data
                        if(this.contacts_lists.length>0){
                            this.inquiry.supplier_contact_id=this.contacts_lists[0].id
                        }
                    })
                    this.inquiry.delivery_city=this.options.filter(res=>{return res.id===id})[0].ship_address
                }else{
                    this.invoiceDisabled=false
                    Object.values(this.InvoiceInfo).forEach(res=>{
                        res.invoiceDisabled=false
                    })
                    this.inquiry.info.forEach(res=>{
                        res.invoice=''
                    })
                }

            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        supplier_lists(query).then(res=>{
                            res.data.forEach((m,n)=>{
                                if(m.is_stop==2){
                                    m.name=m.name+'(停用)'
                                }
                                if(m.supplier_status==2){
                                    // m.name=m.name+'(黑名单)'
                                    res.data.splice(n,1)
                                }
                            })
                            this.options=res.data
                            this.loading = false;

                        })
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            fetchData(id,cas) {
                this.historys_collection=[]
                this.historys_no_collection=[]
                this.yilan_collection=[]
                this.textarea=''
                this.invoiceDisabled=false
                this.inquiry={
                    inquiry_id: this.inquiry.inquiry_id,
                    supplier_id: '',
                    supplier_contact_id: '',
                    info:[{
                        currency: 2,
                        price: '',
                        prefix_packsize: '',
                        prefix_packunit: 'g',
                        postfix_packsize: '',
                        postfix_packunit: 'g',
                        purity: '',
                        leadtime: '',
                        leadtime_unit: '',
                        invoice:1,
                        note: '',
                    }],
                    self_note: '',
                    delivery_city: '',
                    remark: '',
                    status: 1
                }
                PurchaseQuote_lists(id).then(res => {
                    this.lists = res.data.data
                    this.Currency=res.enum.Currency;
                    this.Cycle=res.enum.Cycle;
                    Object.values(res.enum.InvoiceInfo).forEach(res=>{
                        res.invoiceDisabled=false
                    })
                    this.InvoiceInfo=res.enum.InvoiceInfo;
                    this.units=res.enum.units;
                })
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
                    url: 'http://www.buysellchem.com/api/dataout/getHistoryPrice?cas='+this.cas+'&page=1',
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
            historys_handleCurrentChange(page_current){
                this.historys_currentPage = page_current;
                let obj={
                    spider:1,
                    page:this.historys_currentPage
                }
                getQuoteHistoryByProdId(this.cas,obj).then(res=>{
                    if(res&&res.code==0){
                        this.historys_collection=res.data
                    }
                })
            },
            yilan_handleCurrentChange(page_current){
                this.yilan_currentPage = page_current;
                let obj={
                    page:this.yilan_currentPage
                }
                let that=this
                $.ajax({
                    url: 'http://www.buysellchem.com/api/dataout/getHistoryPrice?cas='+this.cas+'&page='+page_current,
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
            historys_no_handleCurrentChange(page_current){
                this.historys_no_currentPage = page_current;
                let obj={
                    spider:0,
                    page:this.historys_no_currentPage
                }
                getQuoteHistoryByProdId(this.cas,obj).then(res=>{
                    if(res&&res.code==0){
                        this.historys_no_collection=res.data
                    }
                })
            },
            rowClick(row) {
                Array.prototype.remove = function (val) {
                    let index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };

                if (this.expands.indexOf(row.id) < 0) {
                    this.expands = []
                    this.expands.push(row.id);
                } else {
                    this.expands.remove(row.id);
                }

            },
            add(length) {
                this.inquiry.info.push({
                    currency: this.inquiry.info[length].currency,
                    price: '',
                    prefix_packsize: '',
                    prefix_packunit: this.inquiry.info[length].prefix_packunit,
                    postfix_packsize: '',
                    postfix_packunit: this.inquiry.info[length].postfix_packunit,
                    purity: this.inquiry.info[length].purity,
                    leadtime: this.inquiry.info[length].leadtime,
                    leadtime_unit: this.inquiry.info[length].leadtime_unit,
                    invoice:this.inquiry.info[length].invoice,
                    note: this.inquiry.info[length].note,
                })
            },
            del: function (index) {
                this.inquiry.info.splice(index, 1)
            },
            save() {
                if(this.inquiry.id){
                    update(this.inquiry,'PurchaseQuote',this,this.inquiry.inquiry_id)
                }else{
                    create(this.inquiry,'PurchaseQuote',this,this.inquiry.inquiry_id)
                }
            },
            handleCurrentChange(){

            }
        }
    }
</script>

