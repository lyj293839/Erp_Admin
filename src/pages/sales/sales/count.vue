<template>
    <d2-container>
        <div>
            <el-row  type="flex" justify="end">
                <el-col :span="24" class="d2-text-right">
                    <el-input size="mini" style="width: 120px;" class="d2-ml-5" v-model="queryList.contract_number" clearable
                              :placeholder="$t('sale.add.sale44')"></el-input><!-- 合同号 -->
                    <el-input size="mini" style="width: 120px;"  class="d2-ml-5" v-model="queryList.cas" clearable
                              placeholder="cas"></el-input>
                    <el-input size="mini" style="width: 120px;"  class="d2-ml-5" v-model="queryList.invoice_number" clearable
                              placeholder="发票号码"></el-input>
                    <el-input size="mini" style="width: 120px;"  class="d2-ml-5" v-model="queryList.waybill_number" clearable
                              placeholder="快递单号"></el-input>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.start_time"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale184')"
                            size="mini"
                            style="width: 125px;"
                    ></el-date-picker><!-- 开始日期 -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.end_time"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale185')"
                            size="mini"
                            style="width: 125px;"
                    ></el-date-picker><!-- 合同结束日期 -->
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.collection_start"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale299')"
                            size="mini"
                            style="width: 135px;"
                    ></el-date-picker>
                    <el-date-picker
                            class="date_picker d2-ml-5"
                            v-model="queryList.collection_end"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                            type="date"
                            :placeholder="$t('sale.add.sale300')"
                            size="mini"
                            style="width: 135px;"
                    ></el-date-picker>
                    <!-- <el-select
                            v-model="queryList.customer_id"
                            filterable
                            clearable
                            remote
                            size="mini"
                            reserve-keyword
                            :placeholder="$t('Inquery.index.customer')"
                            :remote-method="remoteMethod"
                            :loading="loading"
                            class="d2-ml-5"
                            style="width: 180px;"
                    >
                        <el-option v-for="item in customer" :label="item.name" :value="item.id"></el-option>
                    </el-select> -->
                    <!-- <el-autocomplete
                          clearable
                          size='mini'
                          v-model="queryList.customer_name"
                          :fetch-suggestions="querySearchAsync_corporation"
                          :placeholder="$t('Inquery.index.customer')"
                          :trigger-on-focus="false"
                          @select="handleSelect_corporation"
                          style="margin-left:5px;"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.name }}</div>
                    </template>
                  </el-autocomplete> -->
                  <el-input size="mini" style="width: 180px;margin-left:5px;"  class="d2-ml-5" v-model="queryList.customer_name"
                              :placeholder="$t('Inquery.index.customer')" clearable></el-input>
                    <el-select v-model="queryList.receipt_status_ids"  class="d2-ml-5" size="mini" multiple clearable placeholder="收款状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.receipt_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.delivery_status_ids"  class="d2-ml-5" size="mini" multiple clearable placeholder="发货状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.delivery_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.invoice_status_ids"  class="d2-ml-5" size="mini" multiple clearable placeholder="开票状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.invoice_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.sale_id" size="mini"  class="d2-ml-5" clearable placeholder="销售人员" style="width: 100px;">
                        <el-option
                                v-for="item in sales"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.search_status" size="mini"  class="d2-ml-5" clearable placeholder="审核状态" style="width: 110px;">
                        <el-option
                                v-for="item in enums.search_status_info"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select
                            size="mini"
                            v-model="queryList.is_end"
                            :placeholder="$t('sale.index.sale60')"
                            style="width:100px;margin:5px;"
                            clearable
                    >
                        <el-option v-for="item in enums.is_end_info" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                    <el-checkbox v-model="queryList.is_old" :true-label="1"  :false-label="0" style="margin: 0 5px;">{{$t('sale.index.sale70')}}</el-checkbox>
                    <el-button
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="loading_search"
                            @click="search"
                            style="margin-top:5px;"
                    >{{$t('search')}}
                    </el-button>
                    <el-button
                            v-if="permissions.indexOf(593)>-1"
                            class="d2-ml-5"
                            size="mini"
                            type="primary"
                            :loading="file_loading"
                            @click="down_file"
                            style="margin-top:5px;"
                    >导出
                    </el-button>
                    <a :href="file_url" ref="file_url_down" hidden></a>
                </el-col>
            </el-row>
        </div>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row class="d2-mt-10">
            <el-table-column align="center" :label="$t('sale.add.sale44')"  width="125px;"><!-- 合同号 -->
                <template slot-scope="scope">
                {{attr(scope.row,'saler_contract.contract_number')}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale44_')"  width="125px;"><!-- 子合同号 -->
                <template slot-scope="scope">
                  {{scope.row.contract_number}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="cas"  width="120px;"><!-- 子合同号 -->
                <template slot-scope="scope">
                    {{scope.row.cas}}
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('sale.add.sale178')" width="300"><!-- 客户名称 -->
                <template slot-scope="scope">
                {{attr(scope.row,'saler_contract.customer_name')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="合同金额" ><!-- 合同金额 -->
                <template slot-scope="scope">
                    {{scope.row.total_money}}
                </template>
            </el-table-column>
            <!--<el-table-column align="center" label="应收余额">-->
                <!--<template slot-scope="scope">-->
                    <!--{{}}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column align="center" label="签约时间" ><!-- 签约时间 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler_contract.contract_date')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="销售人员"><!-- 销售人员 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler_contract.sale.name')}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="收款状态"><!-- 收款状态 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.receipt_status==2" style="background:#E6A23C;">{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
                    <div v-else-if="scope.row.receipt_status==3" style="background:#FFBDC8;">{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
                    <div v-else>{{getEnumValue(enums.receipt_status_info,scope.row.receipt_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发货状态"><!-- 发货状态 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.delivery_status==3" style="background:#F4939A;">{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</div>
                    <div v-else>{{getEnumValue(enums.delivery_status_info,scope.row.delivery_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="开票状态"><!-- 开票状态 -->
                <template slot-scope="scope">
                    <div v-if="scope.row.invoice_status==1"  style="background:#DF7201;">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                    <div v-else-if="scope.row.invoice_status==2"  style="background:#FFBDC8;">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                    <div v-else-if="scope.row.invoice_status==4"  style="background:#BFBFBF;">{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                    <div v-else>{{getEnumValue(enums.invoice_status_info,scope.row.invoice_status)}}</div>
                </template>
            </el-table-column>
            <el-table-column align="center" label="结算状态"><!-- 结算状态 -->
                <template slot-scope="scope">
                    <div>{{scope.row.settled_month}}</div>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size="list.per_page"
                :total="list.total"
        ></el-pagination>
    </d2-container>
</template>

<script>
    import { sale_lists, customer_lists,customer_lists_all,saler_contract_count,details_download} from '@/api/sale'

    export default {
        name: 'sales-count',
        data () {
            return {
                permissions: JSON.parse(localStorage.getItem("permissions")),
                currentPage: 1,
                queryList: {
                    page: '1',
                    contract_number: '',
                    cas:'',
                    start_time: '',
                    end_time: '',
                    customer_name: '',
                    sale_id:'',
                    receipt_status_ids:'',
                    invoice_status_ids:'',
                    delivery_status_ids:'',
                    is_old:'',
                    invoice_number:'',
                    waybill_number:'',
                    collection_start:'',
                    collection_end:'',
                    search_status:'',
                    is_end:''
                },
                list: [],
                enums:{},
                customer: [],
                search_status_info:[],
                sales:[],
                is_end_info:[],
                loading: false,
                loading_search:false,
                file_loading:false,
                file_url:''
            }
        },
        created () {
            this.fetchData()
        },
        methods: {
            down_file(){
                this.file_loading = true;
                details_download(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.file_url = res.data
                        setTimeout(() => {
                            this.$refs.file_url_down.click()
                            this.file_loading = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.file_loading = false
                    }
                }).catch(rr => {
                    this.file_loading = false
                })
            },
            fetchData () {
                sale_lists().then(res => {
                    this.sales = res.data
                })
                saler_contract_count(this.queryList).then(res => {
                    if(this.loading_search){
                        this.$message({
                            message:res.msg,
                            type:'success'
                        })
                        this.loading_search=false
                    }
                    this.list = res.data
                    this.enums=res.enum
                }).catch(rr => {this.loading_search=false})
            },
            querySearchAsync_corporation(queryString, cb) {
                var restaurants = '';
                if(queryString){
                    customer_lists(queryString).then(res => {
                        restaurants = res.data
                        cb(restaurants)
                    })
                }else{
                    cb(restaurants)
                }
            },
            handleSelect_corporation(item){
                this.queryList.customer_name=item.name
                this.$forceUpdate()
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
            check (id) {
                this.$router.push({
                    path: '/sales/notice_check_detail',
                    name: 'sales-notice_check_detail',
                    query: {
                        id: id
                    }
                })
            },
            search () {
                this.loading_search=true
                this.queryList.page=1
                this.currentPage=1
                this.fetchData()
            },
            handleCurrentChange (page_current) {
                this.queryList.page = this.currentPage = page_current
                this.fetchData()
            }
        }
    }
</script>
<style lang="scss" scoped type="text/scss">
    /deep/ table {
        width: 100%;
        border-collapse: collapse;
        .el-input__inner {
            border: 0px;
            padding: 0px;
        }
        td, th {
            padding: 10px;
            line-height: 20px;
            font-size: 11px;
        }
    }
    .button:focus, .button:hover {
        color: #606266;
        border: none;
        background-color: white;
    }
    .el-pagination {
        margin-top: 10px;
        text-align: right;
    }
</style>
