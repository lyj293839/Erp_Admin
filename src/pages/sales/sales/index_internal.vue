<style lang="scss" scoped type="text/scss">
    .el-table {
        /deep/ td {
            padding: 8px 0px;
            font-size: 13px;
            .el-button {
                margin-top: 5px;
            }
            /deep/ .cell {
                padding: 0px;
            }
        }
        /deep/ th {
            font-size: 13px;
            padding: 8px 0;
            .el-button {
                // margin-top: 5px;
            }
            /deep/ .cell {
                padding: 0px;
            }
        }
    }

    .ym {
        /deep/ .el-checkbox__label {
            padding-left: 0px;
        }
        span {
            margin-left: 5px;
            font-size: 13px;
        }
        .el-col{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 10px 0px;
            flex-wrap: wrap;
        }
    }

    .text_e {
        display: block;
        word-break: keep-all;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .active {
        border-top: 1px solid #E5E5E5;
    }
    /deep/.plTableBox .el-table th{
        padding:10px 0px;
    }
    /deep/.plTableBox .el-table td{
        padding: 0px;
    }
    /deep/.plTableBox .el-table .cell {
         padding-left: 5px;
         padding-right: 5px;
         line-height: 22px;
    }
    /deep/.plTableBox .el-table .umy-table-beyond {
        word-break:break-all!important;
        white-space: inherit!important;

    }
    /deep/.plTableBox .el-table{
        font-size: 13px!important;
    }
    /deep/ .plTableBox .el-table--border th:first-child .cell {
        padding-left: 0 !important;
    }
    /deep/ .plTableBox .el-table--border td:first-child .cell {
        padding-left: 0px!important;
    }
    /deep/.d2-container-full__body::-webkit-scrollbar {
        overflow-y:hidden;
    }
</style>
<template>
    <d2-container ref="a">
        <!-- 页眉 -->
        <div class="ym">
            <el-row type="flex" justify="end">
                <el-col :span="24">
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale2')"
                            v-model="queryList.contract_number"
                            clearable
                            style="width:130px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="CAS"
                            v-model="queryList.cas"
                            clearable
                            style="width:120px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="原销售子合同号"
                            v-model="queryList.origin_saler_contract_detail_number "
                            clearable
                            style="width:130px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="原采购子合同号"
                            v-model="queryList.origin_procurement_contract_detail_number"
                            clearable
                            style="width:130px;margin:0px 2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="报关单号"
                            v-model="queryList.customs_declaration_number"
                            clearable
                            style="width:120px;margin:2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            :placeholder="$t('sale.index.sale8')"
                            v-model="queryList.customer_name"
                            clearable
                            style="width:150px;margin:2px;"
                    ></el-input>
                    <el-input
                            size="mini"
                            placeholder="乙方"
                            v-model="queryList.corp_name"
                            clearable
                            style="width:150px;margin:2px;"
                    ></el-input>
                    <el-select
                            size="mini"
                            v-model="queryList.invoice_status"
                            :placeholder="$t('sale.index.sale15')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="item in invoice_status_list"  :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.number_type"
                            :placeholder="$t('sale.index.sale68')"
                            style="width:100px;margin:2px;"
                            clearable
                    >
                        <el-option v-for="(item,key,index) in number_type_info" :key="index" :label="item" :value="key"></el-option>
                    </el-select>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search()"
                    >{{$t('search')}}
                    </el-button>
                </el-col>
            </el-row>
        </div>
        <!-- 页面 -->
        <div style="width: 100%;padding:1px;">
            <u-table
                    ref="plTable"
                    :min-height="height"
                    row-key="id"
                    use-virtual
                    :big-data-checkbox="checked"
                    :row-height="rowHeight"
                    border>
                <!-- <u-table-column align="center" width="65">
                    <template slot="header" class="add_bu">
                        <el-button size="mini" type="primary" v-if="permissions.indexOf(460)>-1" @click="add()">{{$t('add')}}</el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox
                            v-model="scope.row.checked"
                            v-if="!scope.row.show_checkbox&&scope.row.if_invoice!=0&&!scope.row.is_old&&!scope.row.finish_status"
                            @change="select_one(scope.row.checked,scope.row.id)"
                        ></el-checkbox>
                    </template>
                </u-table-column> -->
                <u-table-column align="center" :label="$t('sale.index.sale2')" width='150'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.re_invoicing_application==1" style="color:#409EFF;">{{scope.row.contract_number}}</span>
                        <span v-else-if="scope.row.re_invoicing_application==-1" style="color:red;">{{scope.row.contract_number}}</span>
                        <span v-else>{{scope.row.contract_number}}</span>
                        <el-tooltip placement="top" v-if="scope.row.quality_dispute&&scope.row.quality_dispute!=0">
                            <div slot="content">{{$t('sale.index.sale42')}}</div>
                            <i style="color:red;cursor: pointer;" class="el-icon-message-solid"></i>
                        </el-tooltip>
                        <br>
                        <span v-if="scope.row.pay_delay_days" style="color:red;font-size:12px;">{{$t('sale.index.sale73')}}:{{scope.row.pay_delay_days}}</span>
                        <!--已延期-->
                    </template>
                </u-table-column>
                <u-table-column align="center" label="CAS" width='100'>
                    <template slot-scope="scope">{{scope.row.details[0].cas}}</template>
                </u-table-column>
                <u-table-column align="center" label="报关单号" width='100'>
                    <template slot-scope="scope">{{scope.row.customs_declaration_number}}</template>
                </u-table-column>
                <u-table-column align="center" label="原销售子合同号" width='110'>
                    <template slot-scope="scope">{{scope.row.details[0].origin_saler_contract_detail_number}}</template>
                </u-table-column>
                <u-table-column align="center" label="原采购子合同号" width='110'>
                    <template slot-scope="scope">{{scope.row.details[0].origin_procurement_contract_detail_number}}</template>
                </u-table-column>
                <u-table-column align="center" :label="$t('sale.index.sale21')" >
                    <template slot-scope="scope">
                        <span v-if="showCustomer_sale(department_id,attr(scope.row,'sale.department_id'),attr(scope.row,'sale.id'))">{{scope.row.customer_name}}</span>
                        <span v-else>********</span>
                    </template>
                </u-table-column><!-- 客户名称 -->
                <u-table-column align="center" label="乙方" >
                    <template slot-scope="scope">{{scope.row.corp_name}}</template>
                </u-table-column>
                <u-table-column align="center" label="数量" width='60'>
                    <template slot-scope="scope">
                        {{scope.row.details[0].quantity?scope.row.details[0].quantity:'0'}}
                        {{getEnumValue(units,scope.row.details[0].quantity_unit)}}
                    </template>
                </u-table-column>
                <u-table-column align="center" :label="$t('sale.index.sale25')" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.total_money}}{{getEnumValue(currencys,scope.row.currency_id)}}</span>
                    </template>
                </u-table-column><!-- 合同金额 -->
                <u-table-column align="center" :label="$t('sale.index.sale58')" width="80">
                    <template slot-scope="scope">
                        <el-tooltip
                                class="item"
                                effect="dark"
                                :content="scope.row.created_at"
                                placement="top-start"
                        >
                            <span>{{scope.row.created_at.substring(0,10)}}</span>
                        </el-tooltip>
                    </template>
                </u-table-column><!-- 签约时间 -->
                <u-table-column align="center" :label="$t('sale.index.sale26')" width="70">
                    <template slot-scope="scope">
                        <el-tooltip placement="top" v-if="scope.row.details.length>1">
                            <div slot="content">
                                <span v-for="i in scope.row.details">
                                <span>
                                {{getEnumValue(invoice_status_info,i.invoice_status)}}
                                </span>;
                                </span>
                            </div>
                            <div class="text_e" v-if="scope.row.details[0].invoice_status==1"
                                 style="background:#DF7201;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==2"
                                 style="background:#FFBDC8;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==4"
                                 style="background:#BFBFBF;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}...
                            </div>
                        </el-tooltip>
                        <div v-else-if="scope.row.details.length>0">
                            <div class="text_e" v-if="scope.row.details[0].invoice_status==1"
                                 style="background:#DF7201;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==2"
                                 style="background:#FFBDC8;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else-if="scope.row.details[0].invoice_status==4"
                                 style="background:#BFBFBF;">
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                            <div class="text_e" v-else>
                                {{getEnumValue(invoice_status_info,scope.row.details[0].invoice_status)}}
                            </div>
                        </div>
                    </template>
                </u-table-column><!-- 开票状态 -->
                <u-table-column  align="center" width="80" label='操作' class="button_delivery">
                    <!-- <template slot="header">
                        <div style="display:flex;align-items: center;padding-right:0px;">
                            <el-button size="mini" type="primary"  style="margin-top:0px;margin:0 10px;" @click="select_all">
                                {{$t('sale.index.sale18')}}
                            </el-button>
                            <div>
                                <el-button size="mini" type="primary" @click="invoices()">{{$t('sale.index.sale17')}}
                                </el-button>
                                <br>
                            </div>
                        </div>
                    </template> -->
                    <template slot-scope="scope">
                        <el-button type="text" v-if="scope.row.has_purchase_express" @click="delivery(scope.row)"
                                   size="mini" style="display: inline-block;position: absolute;left: -8px;">
                            <i class="el-icon-truck" style="color: red;"></i>
                        </el-button>
                        <el-button v-if="permission_names['sales_contract_nb.view']=='sales_contract_nb.view'"
                                   @click="detail(scope.row.id)" type="primary"
                                   size="mini">
                            {{$t('sale.index.sale40')}}
                        </el-button>
                    </template>
                </u-table-column><!-- 操作 -->
            </u-table>
        </div>

        <!-- 快递 -->
        <el-dialog width="40%" :visible.sync="dialogDelivery" @close="deliveryClose()">
            <el-form>
                <el-form-item>
                    <table border="1" bordercolor="#E5E5E5" style="width:90%;border-collapse: collapse;margin: 0 auto;">
                        <tr>
                            <td>{{$t('sale.index.sale2')}}</td>
                            <td>{{$t('sale.index.sale69')}}</td>
                        </tr>
                        <tr v-for="(i,key,index) in delivery_list">
                            <td>{{key}}</td>
                            <td style="padding:0px;">
                                <table style="width:100%;">
                                    <tr v-for="(i_a,index_a) in i">
                                        <td style="padding:0px;">
                                            <div :class="{'active':(index_a%2 == 1)}">{{i_a}}</div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </el-form-item>
                <el-form-item style="display:flex;justify-content: flex-end;">
                    <el-button @click="deliveryClose()" size="mini">{{$t('cancel')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- 分页 -->
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="sizes,prev, pager, next"
                    :page-sizes="[10,20,50,100,200,300,500]"
                    :page-size="list.per_page"
                    @size-change="handleSizeChange"
                    :total="list.total"
            ></el-pagination>

    </d2-container>
</template>
<script>
    import $ from "jquery";
    import axios from "axios";
    import util from "@/libs/util";
    import {
        saler_contract_nb,
        quality_dispute,
        billing_application_view,
        express_delivery,
    } from "@/api/sale";
    import {mapState} from "vuex";

    export default {
        name: "sales-index_internal",
        data() {
            return {
                department_id: '',
                box: '',
                dialogDelivery: false,
                delivery_list: '',
                permissions: JSON.parse(localStorage.getItem("permissions")),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                list: {data: []},
                currentPage: 1,
                queryList: {
                    page: "1",
                    customer_name: "",
                    contract_number: "",
                    invoice_status: "",
                    customs_declaration_number: '',
                    number_type: '',
                    cas:'',
                    origin_saler_contract_detail_number:'',
                    origin_procurement_contract_detail_number:'',
                    corp_name:''
                },
                checked: false,
                invoice_status_info: [],
                invoice_status_list: [],
                number_type_info: [],
                currencys: [],
                finish_status: "",
                loading: false,
                checked_all: false,
                units:[],
                ids: [],
                loading_search: false,
                checked: true,
                height: 580,
                rowHeight: 50,
            };
        },
        created() {
            if (this.$route.query.status) {
                this.queryList.search_status = -1
            }
            if (this.$route.query.contract_number) {
                this.queryList.contract_number = this.$route.query.contract_number
            }
            this.fetchData();
            var lett = this;
            document.onkeydown = function (e) {
                var key = window.event.keyCode;
                if (key == 13) {
                    lett.search()
                }
            }
            this.department_id = util.cookies.get('department_id')
        },
        watch: {
            $route(to, from) {
                if (this.$route.query.status) {
                    this.queryList.search_status = -1
                    this.fetchData();
                }
                else if (this.$route.query.contract_number) {
                    this.queryList.contract_number = this.$route.query.contract_number
                    this.fetchData();
                } else if (from.name == "sales-add") {
                    this.fetchData();
                } else if (from.name == "sales-detail") {
                    this.fetchData();
                } else {
                    if (util.cookies.get('sale_scroll')) {
                        this.$refs.a.$children[0].$el.firstElementChild.scrollTop = util.cookies.get('sale_scroll')
                    }
                }
            }
        },
        computed: {
            ...mapState("d2admin/user", ["info"]),
        },
        mounted() {
            this.box = this.$refs.a.$children[0].$el.firstElementChild
            this.box.addEventListener('scroll', this.handleScroll, true);
        },
        methods: {
            handleScroll() {
                var hei = this.$refs.a.$children[0].$el.firstElementChild.scrollTop
                util.cookies.set('sale_scroll', hei)
            },
            handleSizeChange(val) {
                this.queryList.per_page = val;
                this.fetchData();
            },
            fetchData(a) {
                this.ids = [];
                this.$route.query.status = ''
                saler_contract_nb(this.queryList).then(res => {
                        if (this.loading_search) {
                            this.$message({
                                message: res.msg,
                                type: "success"
                            });
                            this.loading_search = false;
                        }
                        res.data.list.data.forEach((items, index) => {
                            items.checked = false;
                            items.details.forEach((m, n) => {
                                if (m.notice_money > 0 || m.invoice_money > 0) {
                                    items.show_checkbox = true
                                }
                            })
                        });
                        this.list = res.data.list;
                        this.$refs.plTable.reloadData(res.data.list.data)
                        this.list.per_page = parseInt(res.data.list.per_page)
                        this.invoice_status_info = res.enum.invoice_status_info;
                        this.invoice_status_list = res.enum.invoice_status_info;
                        this.currencys = res.enum.currencys;
                        this.units = res.enum.units;
                        this.number_type_info = res.enum.number_type_info
                        if (a) {
                            document.getElementById("id").scrollIntoView();
                        }
                    }).catch(rr => {this.loading_search=false})
            },
            search() {
                this.loading_search = true;
                this.queryList.page = 1;
                this.currentPage = 1
                this.fetchData();
            },
            invoices() {
                let obj = {
                    ids: this.ids,
                    type: 2
                };
                billing_application_view(obj, this).then(res => {
                    if (res && res.code == 0) {
                        this.$router.push({
                            path: "/sales/invoice",
                            name: "sales-invoice",
                            query: {
                                ids: JSON.stringify(this.ids),
                                type: 2
                            }
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: "error"
                        });
                    }
                });
            },
            select_all() {
                this.checked_all = !this.checked_all;
                this.ids = [];
                this.list.data.forEach((items, index) => {
                    if (this.checked_all) {
                        items.checked = true;
                        if (!items.show_checkbox && items.if_invoice != 0 && !items.is_old && !items.finish_status) {
                            this.ids.push(items.id);
                        }
                    } else {
                        this.ids = [];
                        items.checked = false;
                    }
                });
            },
            select_one(checked, id) {
                this.ids = [];
                let num = 0;
                this.list.data.forEach((items, index) => {
                    if (items.checked && !items.show_checkbox && items.if_invoice != 0 && !items.is_old && !items.finish_status) {
                        // if (items.checked) {
                        num++;
                        this.ids.push(items.id);
                    }
                });
                if (num == this.list.data.length) {
                    this.checked_all = true;
                } else {
                    this.checked_all = false;
                }
            },
            detail(id) {
                this.$router.push({
                    path: "/sales/detail_internal",
                    name: "sales-detail_internal",
                    query: {
                        id: id,
                    }
                });
            },
            delivery(item) {
                this.dialogDelivery = true
                express_delivery(item.id).then(res => {
                    this.delivery_list = res.data
                })
            },
            deliveryClose() {
                this.dialogDelivery = false
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData(true);
            },
        }
    };
</script>