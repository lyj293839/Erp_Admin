<style lang="scss" scoped type="text/scss">
    .heard_top {
        margin: 10px 0px 15px 0px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        span {
            font-size: 14px;
        }
        .el-select {
            margin: 0px 5px;
        }
        .el-input {
            margin: 0px 5px;
        }
    }
    /deep/ .el-table th,el-table td{
        padding: 5px;
    }
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
        <div class="heard_top">
            <!--<el-select-->
                    <!--v-model="queryList.supplier_id"-->
                    <!--filterable-->
                    <!--remote-->
                    <!--reserve-keyword-->
                    <!--:remote-method="supplyMethod"-->
                    <!--:loading="supplyloading"-->
                    <!--placeholder="供应商"-->
                    <!--style="width:200px;"-->
                    <!--size="mini"-->
                    <!--clearable-->
            <!--&gt;-->
                <!--<el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>-->
            <!--</el-select>-->
            <!--<el-input-->
                    <!--size="mini"-->
                    <!--v-model="queryList.contract_number"-->
                    <!--placeholder="合同号"-->
                    <!--style="width:100px;"-->
            <!--&gt;</el-input>-->
            <!--<el-select-->
                    <!--v-model="queryList.status"-->
                    <!--filterable-->
                    <!--size="mini"-->
                    <!--placeholder="状态"-->
                    <!--style="width: 100px;"-->
            <!--&gt;-->
                <!--<el-option v-for="(i,index) in enums.finance_pay_status" :label="i.name" :value="i.id"></el-option>-->
            <!--</el-select>-->
            <el-input
                    size="mini"
                    v-model="queryList.contract_number"
                    placeholder="合同号"
                    style="width:150px;"
                    clearable
            ></el-input>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.date_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="申请开始时间"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.date_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:150px;margin: 0 2px;"
                    placeholder="申请结束时间"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.pay_date_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="付款开始时间"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.pay_date_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:150px;margin: 0 2px;"
                    placeholder="付款结束时间"
                    size="mini"
                    clearable
            ></el-date-picker>
            <el-select
                    v-model="queryList.settlement_type"
                    filterable
                    clearable
                    size="mini"
                    placeholder="全部供应"
                    style="width: 100px;"
            >
                <el-option v-for="(i,index) in enums.SettlementType" :label="i.name" :value="i.id" :key="index"></el-option>
            </el-select>
            <el-select
                    v-model="queryList.contain_tax"
                    filterable
                    clearable
                    size="mini"
                    placeholder="不限含税"
                    style="width: 100px;"
            >
                <el-option v-for="(i,index) in enums.contain_tax_status" :label="i.name" :value="i.id" :key="index"></el-option>
            </el-select>
            <el-select
                    v-model="queryList.system_company"
                    filterable
                    clearable
                    size="mini"
                    placeholder="付款公司"
                    style="width: 150px;"
            >
                <el-option v-for="(i,index) in enums.system_company" :label="i.name" :value="i.id" :key="index"></el-option>
            </el-select>
            <el-input
                    size="mini"
                    v-model="queryList.paybank"
                    placeholder="付款账号"
                    style="width:100px;"
                    clearable
            ></el-input>

            </div>
            <div class="heard_top">
            <el-select
                    v-model="queryList.supplier_id"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    :loading="supplyloading"
                    placeholder="供应商"
                    style="width:200px;"
                    size="mini"
                    clearable
            >
                <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
            </el-select>
            <el-select
                    v-model="queryList.finance_pay_status"
                    filterable
                    clearable
                    size="mini"
                    placeholder="付款状态"
                    style="width: 100px;"
            >
                <el-option v-for="(i,index) in enums.finance_pay_status" :label="i.name" :value="i.id" :key="index"></el-option>
            </el-select>
            <el-input
                    size="mini"
                    v-model="queryList.po"
                    placeholder="PO"
                    style="width:100px;"
                    clearable
            ></el-input>
            <el-select
                    v-model="queryList.bank_account_type"
                    filterable
                    clearable
                    size="mini"
                    placeholder="全部账号类型"
                    style="width: 100px;"
            >
                <el-option v-for="(i,index) in enums.bank_account_status" :label="i.name" :value="i.id" :key="index"></el-option>
            </el-select>
            <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
            <el-button v-if="permissions.indexOf(595)>-1" type="primary" size="mini" :loading="loading_down" @click="DownLoadExcel()">导出Excel</el-button>
        </div>

        <!-- 页面 -->
        <el-table
                :data="list.data"
                border
                style="width: 100%;padding:0px;margin:0px;font-size: 12px;"
                highlight-current-row
                fit
        >
            <el-table-column label="#ID" width="80px">
                <template
                        slot-scope="scope"
                >{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="合同编号" width="120px">
                <template
                        slot-scope="scope"
                >{{scope.row?scope.row.procurement_contract_number:''}}</template>
            </el-table-column>
            <el-table-column label="付款公司"  width="150px">
                <template slot-scope="scope">
                    <el-tooltip placement="top">
                        <div slot="content">
                            <span>{{scope.row.paybank}}</span>
                        </div>
                        <span>{{scope.row.corp_name}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column label="供应商"  width="150px">
                <template slot-scope="scope">{{scope.row.supplier_name}}</template>
            </el-table-column>
            <el-table-column label="审批金额" width="100px">
                <template slot-scope="scope">{{scope.row.pay_requestamount}}{{Currency[scope.row.currency_id].icon}}</template>
            </el-table-column>
            <el-table-column label="金额详情" width="150px">
                <template slot-scope="scope">
                    付款:{{Currency[scope.row.currency_id].icon}}{{scope.row.pay_amount}}
                    <el-tag type="danger" size="mini" v-if="scope.row.offset_amount>0">往来账抵扣:{{scope.row.offset_amount?Currency[scope.row.currency_id].icon:''}}{{scope.row.offset_amount}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="收款人" width="150px">
                <template slot-scope="scope">{{scope.row.receiver}}</template>
            </el-table-column>
            <el-table-column label="对方银行账号" width="150px">
                <template slot-scope="scope">{{scope.row.bank}} {{scope.row.bank_account}}</template>
            </el-table-column>
            <el-table-column label="付款方式" width="80px">
                <template slot-scope="scope">
                    {{getEnumValue(enums.PayType,scope.row.pay_type)}}
                </template>
            </el-table-column>
            <!--<el-table-column label="付款银行" width="200px">-->
                <!--<template slot-scope="scope">{{scope.row.paybank}}</template>-->
            <!--</el-table-column>-->
            <el-table-column label="备注">
                <template slot-scope="scope">{{scope.row.note}}</template>
            </el-table-column>
            <el-table-column label="采购" width="80px">
                <template slot-scope="scope">{{scope.row?scope.row.purchase_user_name:''}}</template>
            </el-table-column>
            <el-table-column label="财务付款" width="80px">
                <template slot-scope="scope">{{getEnumValue(enums.finance_pay_status,scope.row.finance_pay_status)}}</template>
            </el-table-column>
            <el-table-column label="申请时间">
                <template slot-scope="scope">{{scope.row.pay_time?scope.row.pay_time.slice(0,10):''}}</template>
            </el-table-column>
            <el-table-column label="付款时间">
                <template slot-scope="scope">{{scope.row.finance_pay_time?scope.row.finance_pay_time.slice(0,10):''}}</template>
            </el-table-column>
            <el-table-column label="操作" width="120px" fixed="right">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="checked_all" @change="select_all"></el-checkbox>
                    <el-button
                            class="d2-ml-5"
                            type="primary"
                            size="mini"
                            @click="reviewClick_all()"
                    >批量付款</el-button>
                </template>
                <template slot-scope="scope">
                    <div v-if="!scope.row.package_no">
                        <el-checkbox v-if="scope.row.finance_pay_status!=1" v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row.id)"></el-checkbox>
                        <el-button
                                class="d2-ml-5"
                                type="primary"
                                size="mini"
                                v-if="scope.row.finance_pay_status!=1"
                                @click="reviewClick(scope.row.id)"
                        >付款</el-button>
                    </div>
                    <div v-else>{{scope.row.package_no}}</div>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="付款" :visible.sync="dialogVisible_check" width="30%">
            <el-form label-width="80px" label-position="left">
                <el-form-item class="from-item">
                    <div class="d2-m-10">
                        <span style="margin-right: 10px;">付款:</span>
                        <el-radio-group v-model="check.finance_pay_status">
                            <el-radio :label="1">确定付款</el-radio>
                            <el-radio :label="-1">取消付款</el-radio>
                        </el-radio-group>
                    </div>
                    <!--<div class="d2-m-10">-->
                        <!--<span style="margin-right: 10px;vertical-align: top;display: inline-block;">备注:</span>-->
                        <!--<textarea v-model="check.note" name="" id="" cols="40"-->
                                  <!--rows="4"></textarea>-->
                    <!--</div>-->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_check = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_check">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
                style="text-align: right;margin-top:10px;"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev,pager,next"
                :page-size="list.per_page"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>
<script>
    import { lists, listTotal, create } from "@/api/prod";
    import { verify_pay } from "@/api/finance";
    export default {
        name: "finance-Purchasing_fees",
        data() {
            return {
                permissions: JSON.parse(localStorage.getItem("permissions")),
                loading:false,
                list: {},
                currentPage: 1,
                supplyloading: false,
                dialogVisible_check:false,
                queryList: {
                    page: "1",
                    supplier_id: "",
                    system_company:'',
                    bank_account_type: "",
                    paybank:'',
                    settlement_type:'',
                    contain_tax:'',
                    finance_pay_status:'',
                    po:'',
                    status:'',
                    type:4
                },
                supply_list: [],
                check:{
                    id:'',
                    finance_pay_status:1
                },
                status:{},
                Currency:{},
                enums:{},
                loading_search:false,
                loading_down:false,
                checked_all:false,
                id:[]
            };
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                this.checked_all=false
                this.id=[]
                lists(this.queryList, "ProcurementContract/paylist").then(res => {
                    if(this.loading_search){
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.loading_search=false
                    }
                    res.data.data.forEach((items, index) => {
                        items.checked = false
                    })
                    this.list = res.data;
                    this.enums=res.enum;
                    this.status=res.enum.status
                    this.Currency=res.enum.Currency
                });
            },
            select_all () {
                this.list.data.forEach((items, index) => {
                    if (this.checked_all&&items.finance_pay_status!=1&&!items.package_no) {
                        items.checked = true
                        this.id.push(items.id)
                    }
                    if(!this.checked_all){
                        this.id = []
                        items.checked = false
                    }
                })
            },
            select_one (checked, id) {
                if (checked) {
                    this.id.push(id)
                } else {
                    this.id.forEach((items, index) => {
                        if (items == id) {
                            this.id.splice(index, 1)
                        }
                    })
                }
                let num = 0
                this.list.data.forEach((items, index) => {
                    if (items.checked) {
                        num++
                    }
                })
                if (num == this.list.data.length) {
                    this.id = []
                    this.checked_all = true
                    this.list.data.forEach((items, index) => {
                        this.id.push(items.id)
                    })
                } else {
                    this.checked_all = false
                }
            },
            Search(){
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData();
            },
            reviewClick(id){
                this.check.id=id
                this.dialogVisible_check=true
            },
            reviewClick_all(){
                this.check.id=this.id
                this.dialogVisible_check=true
            },
            save_check(){
                verify_pay(this.check,this)
            },
            supplyMethod(query) {
                if (query !== "") {
                    this.supplyloading = true;
                    setTimeout(() => {
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                            this.supplyloading = false;

                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            handleCurrentChange(page_current) {
                this.id = []
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            DownLoadExcel(){
                this.loading_down = true;
                lists(this.queryList, "ProcurementContract/paylist/downExcel").then(res => {
                    if (res && res.code === 0) {
                        window.open(res.data);
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_down = false
                    }
                });
                this.loading_down = false;
            }
        }
    };
</script>