<style lang="scss" scoped type="text/scss">
    .el-radio + .el-radio {
        margin-left: 15px;
    }

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
                                            clearable
                                            remote
                                            size="mini"
                                            reserve-keyword
                                            :placeholder="$t('Inquery.index.table4_title1')"
                                            :remote-method="remoteMethod"
                                            :loading="loading"
                                            @change="get_supplier_id(inquiry.supplier_id)"
                                            style="width: 100%;">
                                        <el-option
                                                v-for="item in options"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="d2-m-5">
                                <el-select v-model="inquiry.supplier_contact_id" filterable clearable
                                           size="mini" :placeholder="$t('Inquery.index.table4_title5')">
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
                            <el-col :span="2">
                                <div class="d2-m-5">
                                    <el-input size="mini" v-model="inquiry.delivery_city"  type="text" class="input" :placeholder="$t('Inquery.index.table4_title3')">
                                    </el-input>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="d2-m-5">
                                    <el-select v-model="inquiry.status" filterable clearable
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
                                <el-select size="mini" v-model="scope.row.currency" :placeholder="$t('currency')" clearable
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
                                <el-select size="mini" v-model="scope.row.prefix_packunit" :placeholder="$t('unit')" clearable
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
                                <el-select size="mini" v-model="scope.row.postfix_packunit" :placeholder="$t('unit')" clearable
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
                                <el-select size="mini" v-model="scope.row.leadtime_unit" :placeholder="$t('leadtime')" clearable
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
                        <el-table-column :label="$t('invoice')" align="center" min-width="80">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="scope.row.invoice" :placeholder="$t('invoice')" clearable
                                           style="width: 70px;margin: 0 2px;">
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
                        <el-table-column :label="$t('remark')" align="center" min-width="80">
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
                                <el-button  v-if="scope.$index==0" size="mini" type="primary" @click="add()">+</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>

    </div>
</template>

<script>
    import {
        getLogs,
        PurchaseQuote_lists,
        supplier_lists,
        contacts_lists,
        create,
        update,
        PurchaseQuote_edit,
        PurchaseQuote_update
    } from '@/api/Inquery'
    import $ from 'jquery'

    export default {
        name: "",
        data() {
            return {
                dialogAdd: false,
                lists: [],
                currentPage:1,
                inquiry: {
                    inquiry_id: '',
                    supplier_id: '',
                    supplier_contact_id: '',
                    info:[{
                        currency: '',
                        price: '',
                        prefix_packsize: '',
                        prefix_packunit: 'g',
                        postfix_packsize: '',
                        postfix_packunit: 'g',
                        purity: '',
                        leadtime: '',
                        leadtime_unit: '',
                        invoice:'',
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
                invoiceDisabled:false
            }
        },
        props: ['datas','edit_time','quantity','specification','note','cas'],
        watch: {
            edit_time(val) {
                if(this.datas != undefined) {
                    this.fetchData(this.datas)
                }
            }
        },
        created() {
            if (this.datas != undefined) {
                this.inquiry.inquiry_id=this.datas
                this.fetchData(this.datas)
            }
        },
        methods: {
            edit(item){
                this.dialogAdd=true
                this.inquiry=JSON.parse(JSON.stringify(item))
                this.options=[]
                this.options.push(item.supplier)
                contacts_lists(item.supplier_id).then(res=>{
                    this.contacts_lists=res.data
                })
            },
            // get_supplier_id(id){
            //     this.inquiry.supplier_contact_id=''
            //     contacts_lists(id).then(res=>{
            //         this.contacts_lists=res.data
            //     })
            // },
            get_supplier_id(id){
                if(id){
                    this.inquiry.supplier_contact_id=''
                    this.inquiry.info.forEach(res=>{
                        console.log(this.options)
                        console.log(id)
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
                    })
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
                            this.options=res.data
                            this.loading = false;

                        })
                    }, 200);
                } else {
                    this.options = [];
                }
            },
            fun1(name){
                return new Promise((resolve, reject) => {
                    supplier_lists(name).then(res=>{
                        this.options=res.data
                        resolve(1)
                    })
                });
            },
            fun2(id){
                return new Promise((resolve, reject) => {
                    contacts_lists(id).then(res=>{
                        this.contacts_lists=res.data
                        resolve(1)
                    })
                });
            },
            fetchData(id) {
                this.inquiry={
                    inquiry_id: this.datas,
                    supplier_id: '',
                    supplier_contact_id: '',
                    info:[{
                        currency: '',
                        price: '',
                        prefix_packsize: '',
                        prefix_packunit: 'g',
                        postfix_packsize: '',
                        postfix_packunit: 'g',
                        purity: '',
                        leadtime: '',
                        leadtime_unit: '',
                        invoice:2,
                        note: '',
                    }],
                    self_note: '',
                    delivery_city: '',
                    remark: '',
                    status: 1
                }
                this.invoiceDisabled=false
                PurchaseQuote_lists(id).then(res => {
                    this.lists = res.data
                    this.Currency=res.enum.Currency;
                    this.Cycle=res.enum.Cycle;
                    Object.values(res.enum.InvoiceInfo).forEach(res=>{
                        res.invoiceDisabled=false
                    })
                    this.InvoiceInfo=res.enum.InvoiceInfo;
                    this.units=res.enum.units;
                })
                PurchaseQuote_edit(id).then(res=>{
                    if(res&&res.code==0){
                        Promise.all([
                            this.fun1(res.data.supplier.name),
                            this.fun2(res.data.supplier.id)
                        ]).then(r => {
                            this.get_supplier_id(res.data.supplier.id)
                            this.inquiry=res.data
                        })
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
            add() {
                this.inquiry.info.push({
                    currency: this.inquiry.info[0].currency,
                    price: '',
                    prefix_packsize: '',
                    prefix_packunit: this.inquiry.info[0].prefix_packunit,
                    postfix_packsize: '',
                    postfix_packunit: this.inquiry.info[0].postfix_packunit,
                    purity: this.inquiry.info[0].purity,
                    leadtime: this.inquiry.info[0].leadtime,
                    leadtime_unit: this.inquiry.info[0].leadtime_unit,
                    invoice:this.inquiry.info[0].invoice,
                    note: this.inquiry.info[0].note,
                })
            },
            del: function (index) {
                this.inquiry.info.splice(index, 1)
            },
            save() {
                PurchaseQuote_update(this.inquiry,this,this.inquiry.inquiry_id)
            },
            handleCurrentChange(){

            }
        }
    }
</script>

