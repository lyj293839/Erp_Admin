<style lang="scss" scoped type="text/scss">
    .heard_top {
        margin: 10px 0px 10px 0px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
            font-size: 10px;
        }
        .el-select {
            margin: 0px 5px;
        }
        .el-input {
            margin: 0px 5px;
        }
    }
</style>
<template>
    <d2-container>
        <!-- 页眉 -->
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
            <el-input
                    size="mini"
                    v-model="queryList.contract_number"
                    placeholder="合同号"
                    style="width:100px;"
            ></el-input>
            <el-select
                    v-model="queryList.status"
                    filterable
                    size="small"
                    placeholder="状态"
                    style="width: 100px;"
            >
                <el-option v-for="(i,index) in status" :label="i.name" :value="i.id" :key="index"></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="Search()">搜索</el-button>
        </div>

        <!-- 页面 -->
        <el-table
                :data="list.data"
                border
                style="width: 100%;padding:0px;margin:0px;font-size:10px;"
                highlight-current-row
                fit
        >
            <el-table-column label="合同编号" width="100px">
                <template
                        slot-scope="scope"
                >{{scope.row.procurement_contract?scope.row.procurement_contract.contract_number:''}}</template>
            </el-table-column>
            <el-table-column label="供应商">
                <template slot-scope="scope">{{scope.row.supplier_name}}</template>
            </el-table-column>
            <el-table-column label="实付金额" width="100px">
                <template slot-scope="scope">{{scope.row.pay_amount}}{{Currency[scope.row.currency_id].icon}}</template>
            </el-table-column>
            <el-table-column label="申请付款时间" width="150px">
                <template slot-scope="scope">{{scope.row.pay_time}}</template>
            </el-table-column>
            <el-table-column label="付款公司">
                <template
                        slot-scope="scope"
                >{{scope.row.procurement_contract?scope.row.procurement_contract.corp_name:''}}</template>
            </el-table-column>
            <el-table-column label="银行">
                <template slot-scope="scope">{{scope.row.bank}}</template>
            </el-table-column>
            <el-table-column label="银行账号">
                <template slot-scope="scope">{{scope.row.bank_account}}</template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.type>2?'审核通过':(scope.row.status==1?'审核通过':(scope.row.status==-1?'审核不过':'待审核'))}}
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">{{scope.row.note}}</template>
            </el-table-column>
            <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                    <el-button
                            type="primary"
                            size="mini"
                            v-if="scope.row.status==0&&permissions.indexOf(507)>-1"
                            @click="reviewClick(scope.row.id)"
                    >审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="审核" :visible.sync="dialogVisible_check" width="30%">
            <el-form label-width="80px" label-position="left">
                <el-form-item class="from-item">
                    <div class="d2-m-10">
                        <span style="margin-right: 10px;">审核:</span>
                        <el-radio-group v-model="check.status">
                            <el-radio :label="1">审核通过</el-radio>
                            <el-radio :label="-1">不通过</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="d2-m-10">
                        <span style="margin-right: 10px;vertical-align: top;display: inline-block;">审核意见:</span>
                        <textarea v-model="check.note" name="" id="" cols="40"
                                  rows="4"></textarea>
                    </div>
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
    import { verify } from "@/api/finance";
    export default {
        name: "finance-Purchasing_fees",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                list: {},
                currentPage: 1,
                supplyloading: false,
                dialogVisible_check:false,
                queryList: {
                    page: "1",
                    supplier_id: "",
                    contract_number: "",
                    status:'',
                    type:2
                },
                supply_list: [],
                check:{
                    id:'',
                    status:1,
                    note:'',
                    type:2
                },
                Currency:{},
                status:[],
                loading:false
            };
        },
        watch: {
            $route (to, from) {
                if(to.name=='finance-Purchasing_fees'){
                    this.fetchData()
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                lists(this.queryList, "procurement_contract/paylist").then(res => {
                    this.list = res.data;
                    this.status=res.enum.status
                    this.Currency=res.enum.Currency
                });
            },
            Search(){
                this.fetchData();
            },
            reviewClick(id){
                this.check.id=id
                this.dialogVisible_check=true
            },
            save_check(){
                verify(this.check,this)
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
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            }
        }
    };
</script>