<style lang="scss" scoped type="text/scss">
    .el-radio+.el-radio {
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
    /deep/.cell{
        text-align: center;
    }
    /*/deep/.el-table__expand-column{*/
    /*display: none;*/
    /*}*/
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
    .inquery th{
        display: none!important;
    }
    /*.el-table__expand-column{*/
        /*display: none;*/
    /*}*/
    .inquery .el-icon-arrow-right:before {
        content: "";
    }
    /*.el-popover{*/
        /*opacity: 0!important;*/
    /*}*/

</style>
<template>
    <d2-container>
        <el-card class="box-card" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                {{$t('Inquery.comments.form2.form2_1')}}<!-- 销售报价 -->
            </div>
            <el-row  style="width: 100%;padding: 10px;">
                <el-col class="d2-text-center" :span="3">
                    {{$t('Inquery.comments.form2.form2_2')}}</el-col><!-- 供应商名称 -->
                <el-col class="d2-text-center" :span="3" style="white-space: normal;word-break: break-all;">
                    {{$t('Inquery.comments.form2.form2_3')}}</el-col><!-- 规格信息 -->
                <el-col class="d2-text-center" :span="3" >{{$t('Inquery.comments.form2.form2_4')}}</el-col><!-- 采购备注 -->
                <el-col class="d2-text-center" :span="3">{{$t('Inquery.comments.form2.form2_5')}}</el-col><!-- 交货城市 -->
                <el-col class="d2-text-center" :span="3">{{$t('Inquery.comments.form2.form2_6')}}</el-col><!-- 特征 -->
                <el-col class="d2-text-center" :span="3">{{$t('Inquery.comments.form2.form2_7')}}</el-col><!-- 联系人 -->
                <el-col class="d2-text-center" :span="3">{{$t('Inquery.comments.form2.form2_8')}}</el-col><!-- 日期 -->
                <el-col :span="3" style="text-align: right"></el-col>
            </el-row>
                <div class="item1">
                    <el-table
                            :data="list.data"
                            style="width: 100%"
                            row-key="id"
                            class="inquery"
                            :expand-row-keys="expands">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-table
                                        :data="inquiry.info"
                                        border
                                        tooltip-effect="dark"
                                        style="width: 100%;"
                                        class="d2-mt-5 d2-text-center"
                                >
                                    <el-table-column :label="$t('Inquery.comments.form2.form2_9')" align="center" min-width="400"><!-- 格式:价格/数量 for 数量等级 -->
                                        <template slot-scope="scope">
                                            <el-select size="mini" v-model="scope.row.currency" :placeholder="$t('Inquery.comments.form2.form2_10')"
                                                       style="width: 70px;margin: 0 2px;"><!-- 货币 -->
                                                <el-option
                                                        v-for="item in Currency"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                            <el-input size="mini" type="text" class="input" :placeholder="$t('Inquery.comments.form2.form2_11')" v-model="scope.row.price"
                                                      style="width: 60px;margin: 0 2px;"></el-input><!-- 价格 -->
                                            /
                                            <el-input size="mini" type="text" class="input" placeholder="" v-model="scope.row.prefix_packsize"
                                                      style="width: 60px;margin: 0 2px;"></el-input>
                                            <el-select size="mini" v-model="scope.row.prefix_packunit" :placeholder="$t('Inquery.comments.form2.form2_12')"
                                                       style="width: 70px;margin: 0 2px;"><!-- 单位 -->
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
                                            <el-select size="mini" v-model="scope.row.postfix_packunit" :placeholder="$t('Inquery.comments.form2.form2_12')"
                                                       style="width: 70px;margin: 0 2px;"><!-- 单位 -->
                                                <el-option
                                                        v-for="item in units"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('Inquery.comments.form2.form2_13')" align="center" min-width="80"><!-- 含量 -->
                                        <template slot-scope="scope">
                                            <el-input size="mini" type="text" class="input" :placeholder="$t('Inquery.comments.form2.form2_13')" v-model="scope.row.purity"
                                                      style="width: 60px"></el-input><!-- 含量 -->
                                            %
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('Inquery.comments.form2.form2_14')" align="center" min-width="140"><!-- 交货期 -->
                                        <template slot-scope="scope">
                                            <el-input size="mini" type="text" class="input" placeholder="" v-model="scope.row.leadtime"
                                                      style="width: 60px"></el-input>
                                            <el-select size="mini" v-model="scope.row.leadtime_unit"  :placeholder="$t('Inquery.comments.form2.form2_14')"
                                                       style="width: 80px;margin: 0 2px;"><!-- 交货期 -->
                                                <el-option
                                                        v-for="item in Cycle"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('Inquery.comments.form2.form2_15')" align="center" min-width="80"><!-- 税票 -->
                                        <template slot-scope="scope">
                                            <el-select size="mini" v-model="scope.row.invoice" :placeholder="$t('Inquery.comments.form2.form2_15')"
                                                       style="width: 70px;margin: 0 2px;"><!-- 税票 -->
                                                <el-option
                                                        v-for="item in InvoiceInfo"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.name">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('Inquery.comments.form2.form2_16')" align="center" min-width="80"><!-- 备注 -->
                                        <template slot-scope="scope">
                                            <el-input size="mini" type="text" class="input" :placeholder="$t('Inquery.comments.form2.form2_16')"
                                                      v-model="scope.row.note"></el-input><!-- 备注 -->
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="$t('Inquery.comments.form2.form2_17')" align="center" min-width="80">
                                        <template slot-scope="scope"><!-- 操作 -->
                                            <el-button size="mini" v-if="inquiry.info.length>1" type="primary"
                                                       @click="del(scope.$index)">-
                                            </el-button>
                                            <el-button  v-if="scope.$index==0" size="mini" type="primary" @click="add()" name="add">+</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="supplier.name">
                        </el-table-column>
                        <el-table-column
                                prop="info_string" class="d2-text-center">
                        </el-table-column>
                        <el-table-column
                                prop="self_note" class="d2-text-center">
                        </el-table-column>
                        <el-table-column
                                prop="delivery_city" class="d2-text-center">
                        </el-table-column>
                        <el-table-column
                                prop="remark">
                        </el-table-column>
                        <el-table-column
                                prop="supplier_contact.name">
                        </el-table-column>
                        <el-table-column
                                prop="created_at">
                        </el-table-column>
                        <el-table-column width="240" align="right">
                            <template slot-scope="scope" >
                                <span  v-if="scope.row.is_select" style="color:red;margin-right: 10px;display: inline-block;">{{$t('Inquery.comments.form2.form2_18')}}</span><!-- 已选用 -->
                                <el-button
                                        size="mini"
                                        type="primary"
                                        :loading="loading"
                                        @click="send(scope.row.id)">{{$t('Inquery.comments.form2.form2_19')}}</el-button><!-- 发送 -->
                                <el-button
                                        size="mini"
                                        type="primary"
                                        @click="rowClick(scope.row)">{{$t('Inquery.comments.form2.form2_20')}}</el-button><!-- 详情 -->
                                <!--<el-button-->
                                        <!--size="mini"-->
                                        <!--type="danger"-->
                                        <!--v-if="scope.row.is_select"-->
                                        <!--@click="select(scope.row)"-->
                                        <!--&gt;已选用</el-button>-->
                                <el-button
                                        size="mini"
                                        type="primary"
                                        :loading="loading"
                                        @click="select(scope.row)"
                                >{{$t('Inquery.comments.form2.form2_21')}}</el-button><!-- 选用 -->
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            layout="prev, pager, next"
                            :total="list.total"
                            style="width: 100%">
                    </el-pagination>
                </div>
        </el-card>

    </d2-container>
</template>

<script>
    import {
        PurchaseQuote_lists,
        send,
        previewEmail
    } from '@/api/Inquery'
    import $ from 'jquery'
    export default {
        name: "",
        data() {
            return {
                ChemicalType:[],
                list:[],
                currentPage:1,
                inquiry:{
                    info:[{
                        currency: '',
                        price: '',
                        prefix_packsize: '',
                        prefix_packunit: '',
                        postfix_packsize: '',
                        postfix_packunit: '',
                        purity: '',
                        leadtime: '',
                        leadtime_unit: '',
                        invoice:'',
                        note: '',
                    }]
                },
                info_:[],
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
                // 要展开的行，数值的元素是row的key值
                expands: [],
                html:"",
                dialog:false,
                loading:false
            }
        },
        props:['datas','time'],
        watch: {
            time(val) {
                if(this.datas != undefined) {
                    this.fetchData(this.datas)
                }
            }
        },
        created(){
            if (this.datas != undefined) {
                this.fetchData(this.datas)
            }
        },
        methods: {
           fetchData(id){
               PurchaseQuote_lists(id).then(res=>{
                   this.list=res.data;
                   this.Currency=res.enum.Currency;
                   this.Cycle=res.enum.Cycle;
                   this.InvoiceInfo=res.enum.InvoiceInfo;
                   this.units=res.enum.units;
               })
           },
            rowClick(row) {
                this.info_=JSON.parse(JSON.stringify(row)).info
                this.inquiry=row
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
            send(){
                previewEmail(this.datas).then(res=>{
                    // this.html=res.data
                    this.$emit('get_html',res.data)
                    // this.dialog=true
                })
            },
            select(info){
               if(this.inquiry.info[0].currency==''){
                   this.info_=JSON.parse(JSON.stringify(info)).info
                   this.inquiry=JSON.parse(JSON.stringify(info))
               }
                send(info.inquiry_id,info.id,this.info_,this.inquiry.info,this)
            },
            add() {
                this.inquiry.info.push({
                    currency: '',
                    price: '',
                    prefix_packsize: '',
                    prefix_packunit: '',
                    postfix_packsize: '',
                    postfix_packunit: '',
                    purity: '',
                    leadtime: '',
                    leadtime_unit: '',
                    invoice:'',
                    note: '',
                })
            },
            del: function (index) {
                this.inquiry.info.splice(index, 1)
            },
            handleCurrentChange(){

            }
        }
    }
</script>

