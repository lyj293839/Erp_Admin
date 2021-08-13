<template>
    <d2-container>
        <el-row style="margin: 10px 0;">
            <el-col  :span="24" class="d2-text-right">
                <el-input
                        v-model="queryList.cas"
                        style="width: 150px"
                        size="mini"
                        clearable
                        placeholder="CAS"
                ></el-input>
                <el-date-picker
                        v-model="queryList.start_date"
                        type="date"
                        size="mini"
                        style="width:125px;margin:2px;"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :placeholder="$t('sale.generate.generate1')"
                ></el-date-picker><!-- 开始时间 -->
                <el-date-picker
                        v-model="queryList.end_date"
                        type="date"
                        size="mini"
                        style="width:125px;margin:2px;"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :placeholder="$t('sale.generate.generate2')"
                ></el-date-picker><!-- 结束时间 -->
                <el-select
                        v-model="queryList.cust_id"
                        filterable
                        clearable
                        remote
                        size="mini"
                        reserve-keyword
                        :placeholder="$t('Inquery.index.customer')"
                        :remote-method="remoteMethod"
                        :loading="loading"
                        class="d2-ml-5"
                        style="width: 140px;"
                >
                    <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
                <el-input
                        v-model="queryList.inquiryids"
                        style="width: 200px;margin:2px;"
                        size="mini"
                        clearable
                        :placeholder="$t('sale.generate.generate3')"
                ></el-input><!-- 多个询单号以,分开,如86,87 -->
                <el-select v-model="queryList.assignsaler_id" clearable filterable size="mini" style="width: 90px;margin:2px;">
                    <el-option
                            v-for="i in sale_lists"
                            :key="i.id"
                            :label="i.name"
                            :value="i.id">
                    </el-option>
                </el-select>
                <el-select v-model="queryList.deal_contract" clearable filterable size="mini" style="width: 110px;margin:2px;"
                >
                    <el-option
                            v-for="i in is_generated_contract"
                            :key="i.id"
                            :label="i.name"
                            :value="i.id">
                    </el-option>
                </el-select>
                <el-button type="primary" size="mini" :loading="loading_search" @click="search">{{$t('search')}}</el-button>
                <el-button type="primary" size="mini" @click="saler_contract_generate">{{$t('quality.queryList.create')}}</el-button>
            </el-col>
        </el-row>
        <el-table style="font-size: 12px" :data="list.data" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" :label="$t('sale.generate.generate4')" width="80"><!-- 询单号 -->
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate13')" width="135"><!-- 时间 -->
                <template slot-scope="scope">
                    {{scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_datetime:''}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate5')"><!-- 客户名称 -->
                <template slot-scope="scope">
                    <span v-if="showCustomer_sale(department_id,attr(scope.row,'price_confirm_user.department_id'),attr(scope.row,'assignsaler.id'))">{{scope.row.customer?scope.row.customer.name:''}}</span>
                    <span v-else>********</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label='CAS'>
                <template slot-scope="scope">
                    {{scope.row.cas}}
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label='产品名称'>
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column> -->
            <el-table-column align="center" :label="$t('sale.generate.generate6')"><!-- 数量 -->
                <template slot-scope="scope">
                    {{scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_quantity:''}}{{getEnumValue(units,scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_quantity_unit:'')}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate7')"><!-- 单价 -->
                <template slot-scope="scope">
                    {{scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_price:''}}{{getEnumValue(currencys,scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_currency_id:'')}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate8')"><!-- 金额 -->
                <template slot-scope="scope">
                    {{scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_total_price:''}}{{getEnumValue(currencys,scope.row.inquiry_confirm?scope.row.inquiry_confirm.comfirm_currency_id:'')}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate9')"><!-- 销售 -->
                <template slot-scope="scope">
                    {{scope.row.assignsaler.name}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate10')"><!-- 报价人员 -->
                <template slot-scope="scope">
                    {{scope.row.price_confirm_user?scope.row.price_confirm_user.name:''}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate11')" width="80"><!-- 状态 -->
                <template slot-scope="scope">
                    {{getEnumValue(status_info,scope.row.status?scope.row.status:'')}}
                    <!--                {{status_info[scope.row.status].name}}-->
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.generate.generate12')" width="100"><!-- 建立合同 -->
                <template slot-scope="scope">
                    {{scope.row.deal_contract_name}}
                </template>
            </el-table-column>
            <el-table-column align="center"  width="80">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="checked_all" @change="select_all()"></el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.checked" @change="select_one(scope.row.checked,scope.row.id)"></el-checkbox>
                </template>
            </el-table-column>
        </el-table>

        <!-- 询单已经生成合同 -->
        <el-dialog
            :visible.sync="dialogSettle"
            title="提示"
            width="30%"
            >
                <div style="text-align:left;font-size:15px;">
                    <b> 询单已经生成合同，是否重新生成合同？</b>
                </div>
                <div style="text-align:right;margin:20px 0px;">
                    <el-button @click="settle_save()" type="primary" size="mini">确定</el-button>
                    <el-button @click="dialogSettle = false"  size="mini">取消</el-button>
                </div>
        </el-dialog>


        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="sizes,prev, pager, next"
                :page-sizes="[10,20,30]"
                @size-change="handleSizeChange"
                :page-size="list.per_page"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>

<script>
    import {
        customer_lists,
        sale_lists,
        saler_contract_inquiry,
        saler_contract_generate
    } from '@/api/sale'
    import { getEnumValue } from '@/utils/index'
    import util from '@/libs/util'
    export default {
        name: 'sales-ss_generate',
        data () {
            return {
                getEnumValue: getEnumValue,
                department_id:'',
                queryList: {
                    cas: '',
                    start_date: '',
                    end_date: '',
                    cust_id: '',
                    inquiryids: '',
                    assignsaler_id: '',
                    deal_contract: 0,
                    per_page: 10
                },
                currentPage:1,
                list: [],
                sale_lists: [],
                is_generated_contract: [],
                status_info: [],
                checked_all: false,
                loading: false,
                dialogSettle:false,
                ids: [],
                units: {},
                currencys: [],
                customer: [],
                loading_search:false
            }
        },
        props: {
            resources: {}
        },
        created () {
            sale_lists().then(res => {
                this.sale_lists = res.data
            })
            var day = new Date()
            this.queryList.start_date = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate()
            this.queryList.end_date = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate()
            this.queryList.assignsaler_id = Number(util.cookies.get('user_id'))
            this.department_id=util.cookies.get('department_id')
            this.fetchData()
        },
        watch: {
            $route (to,from) {
                if(to.name=='sales-ss_generate'&&from.name!='sales-generate'){
                    sale_lists().then(res => {
                        this.sale_lists = res.data
                    })
                    this.fetchData()
                }
            }
        },
        computed: {
            headers () {
                const token = util.cookies.get('token')
                return {
                    'Authorization': 'Bearer ' + token
                }
            }
        },
        methods: {
            search () {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            handleSizeChange(val) {
              this.queryList.per_page = val;
              this.fetchData();
            },
            remoteMethod (query) {
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        customer_lists(query).then(res => {
                            this.customer = res.data
                            this.loading = false

                        })
                    }, 200)
                } else {
                    this.customer = []
                }
            },
            querySearchAsync_customer (queryString, cb) {
                if (queryString != '') {
                    customer_lists(queryString).then(res => {
                        var restaurants = res.data
                        var results = queryString ? restaurants.filter(this.createFilter_customer(queryString)) : restaurants
                        // 调用 callback 返回建议列表的数据
                        cb(results)
                    })
                }
            },
            createFilter_customer (queryString) {
                return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) == 0)
                }
            },
            handleSelect_customer (item) {
                this.queryList.searchkey = item.name
                this.queryList.cust_id = item.id
            },
            settle_save(){
                this.ids=Array.from(new Set(this.ids))
                let obj = {
                        ids: this.ids
                    }
                saler_contract_generate(obj).then(res => {
                            if (res.code == 0) {
                                this.$router.push({
                                    path: '/sales/generate',
                                    name: 'sales-generate',
                                    query: {
                                        ids: JSON.stringify(this.ids)
                                    }
                                })
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })

                            }
                        })
                this.dialogSettle = false
            },
            saler_contract_generate () {
                this.ids=Array.from(new Set(this.ids))
                if (this.ids.length != 0) {
                    let obj = {
                        ids: this.ids
                    }
                    var num = 0
                    this.ids.forEach(i=>{
                        if(this.list.data.filter(j=>{return j.id==i})[0]&&this.list.data.filter(j=>{return j.id==i})[0].deal_contract==1){
                            num++
                        }
                    })
                    if(num>0){
                        this.dialogSettle = true
                    }else{
                        saler_contract_generate(obj).then(res => {
                            if (res.code == 0) {
                                this.$router.push({
                                    path: '/sales/generate',
                                    name: 'sales-generate',
                                    query: {
                                        ids: JSON.stringify(this.ids)
                                    }
                                })
                            } else {
                                this.$message({
                                    message: res.msg,
                                    type: 'error'
                                })

                            }
                        })
                    }
                }
            },
            select_all () {
                this.ids = []
                this.list.data.forEach((items, index) => {
                    if (this.checked_all) {
                        items.checked = true
                        this.ids.push(items.id)
                    } else {
                        this.ids = []
                        items.checked = false
                    }
                })
            },
            select_one (checked, id) {
                // if (checked) {
                //     this.ids.push(id)
                // } else {
                //     this.ids.forEach((items, index) => {
                //         if (items == id) {
                //             this.ids.splice(index, 1)
                //         }
                //     })
                // }
                this.ids = []
                this.list.data.forEach((items, index) => {
                        if (items.checked) {
                            this.ids.push(items.id)
                        }
                    })
                let num = 0
                this.list.data.forEach((items, index) => {
                    if (items.checked) {
                        num++
                    }
                })
                if (num == this.list.data.length) {
                    this.ids = []
                    this.checked_all = true
                    this.list.data.forEach((items, index) => {
                        this.ids.push(items.id)
                    })
                } else {
                    this.checked_all = false
                }
            },
            handleCurrentChange(page_current){
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            fetchData () {
                this.ids = []
                saler_contract_inquiry(this.queryList).then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    res.data.data.forEach((items, index) => {
                        items.checked = false
                        res.enum.is_generated_contract.forEach((m, n) => {
                            if (items.deal_contract == m.id) {
                                items.deal_contract_name = m.name_cn
                            }
                        })
                    })
                    this.checked_all = false
                    this.list = res.data
                    this.list.per_page = parseInt(res.data.per_page)
                    this.status_info = res.enum.status_info
                    this.is_generated_contract = res.enum.is_generated_contract
                    this.units = res.enum.units
                    this.currencys = res.enum.currencys
                }).catch(rr => {this.loading_search=false})
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>
