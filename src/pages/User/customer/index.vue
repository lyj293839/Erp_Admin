<style lang="scss" scoped type="text/scss">
    p{
        height: 20px;
        line-height: 20px;
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
        justify-content: center;
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
    .item .el-card__header {
        border-bottom: none;
    }
</style>
<style>
    @import "/map/flags.css";
</style>
<template>
    <d2-container>
            <!--顶部搜索 开始-->
                <el-row style="margin: 10px 30px;">
                    <el-col  :span="2">
                        <el-button type="primary" size="mini" name="add" @click="add" v-if="permissions.indexOf(450)>-1">{{$t('add')}}</el-button>
                    </el-col>
                    <el-col class="d2-text-right" :span="22">
                        <el-input
                                v-model="queryList.keyword"
                                name="keyword"
                                style="width: 300px;margin: 0 10px;"
                                size="mini"
                                clearable
                                :placeholder="$t('user.customer.search_name')"
                        ></el-input>
                        <el-select v-model="queryList.country_code"  clearable filterable
                                   style="width: 150px;margin: 0 10px;" size="mini"
                                   :placeholder="$t('user.customer.search_country')">
                            <el-option
                                    v-for="(item,index) in country"
                                    :key="index"
                                    :label="item.Name"
                                    :value="item.Code">
                            </el-option>
                        </el-select>
                        <el-select v-model="queryList.level_id" size="mini" clearable
                                   style="width: 150px;margin: 0 10px;"
                                   :placeholder="$t('user.customer.search_level')">
                            <el-option
                                    v-for="(item,index) in levels"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="queryList.sale_head_id" clearable  filterable size="mini"
                                   style="width: 150px;margin: 0 10px;"
                                   :placeholder="$t('user.customer.search_person')">
                            <el-option
                                    v-for="(i,index) in user_lists"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                        <el-button type="primary" size="mini" name="search" :loading="loading_search" @click="search">{{$t('search')}}
                        </el-button>
                    </el-col>
                </el-row>
            <!--顶部搜索 结束-->
            <!--列表及分页 开始-->
            <div class="item">
                <el-card v-for="(item,index) in list.data" :key="item.id" class="box-card d2-m-10" style="position: relative;">
                    <div slot="header" class="clearfix">
                        <el-container>
                            <el-aside width="70px" style="height: 100px;">
                                <img src="map/blank.gif" class="flag" :class="item.map"
                                     :title="item.countries?item.countries.Name:''"
                                     style="margin: 0 10px;"/>
                                <el-tooltip class="item level" v-if="item.level_id" effect="dark" content="等级"
                                            placement="top-start">
                                    <el-button style="padding: 0 15px;">{{item.level_name}}</el-button>
                                </el-tooltip>
                            </el-aside>
                            <el-main style="padding: 8px 0;">
                                <div v-if="item.name" class="bold l_h" style="font-size: 14px;">{{item.name}}</div>
                                <div class="bold l_h" style="font-size: 14px;">{{item.english_name}}</div>
                                <div class="grey l_h" style="font-size: 13px;" v-text="item.sort==1?'公司':'个人'">
                                    {{item.type}}
                                </div>
                            </el-main>
                        </el-container>
                    </div>
                    <el-row :gutter="10" style="position: absolute;bottom: 0;width: 100%;hiehgt:40px;line-height: 40px;border-top: 1px solid #ebeef5;">
                        <el-col :span="8">
                            <div class="d2-text-center border-right" name="edit" @click="edit(item.id)" v-if="permissions.indexOf(451)>-1">{{$t('edit')}}
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="d2-text-center border-right" name="edit" @click="combine(item.name,item.id)" v-if="permissions.indexOf(451)>-1">合并
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="d2-text-center" name="delete" @click="delete_customer(item,index)" v-if="permissions.indexOf(452)>-1">
                                {{$t('delete')}}
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="list.per_page"
                    :total="list.total">
            </el-pagination>
            <!--列表及分页 结束-->

            <!--合并-->
            <el-dialog title='合并' :visible.sync="CombineDialog" width="30%" @close="close_combine()">
                <el-form label-position="right" label-width="80px">
                    <el-form-item label="客户名称:">
                        <span>{{combine_list.name}}</span>
                    </el-form-item>
                    <el-form-item label="合并到:">
                        <el-select
                            v-model="combine_list.target_customer_id"
                            filterable
                            clearable
                            remote
                            size="mini"
                            reserve-keyword
                            :remote-method="remoteMethod"
                            :loading="loading"
                            class="d2-ml-5"
                            style="width: 90%;"
                    >
                        <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id">
                            <span style="float: left">
                                <span style='color:red;'>{{item.id+'-'}}</span>
                                <span style='margin-left:5px;'>{{item.name}}</span>
                            </span>
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                        <el-button type="primary" size="mini" @click="combine_save()">确定</el-button>
                        <el-button size="mini" @click="close_combine()">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
    </d2-container>
</template>
<script>
    import {
        lists,
        destroy,
        country_list,
        member_company,
        merge_customer
    } from '@/api/user'
    import { customer_lists} from '@/api/sale'
    import util from '@/libs/util'
    export default {
        name: "User-customer",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                currentPage: 1,
                queryList: {
                    page: '1',
                    keyword: '',
                    level_id: '',
                    country_code: '',
                    sale_head_id: '',
                },
                list: [],
                combine_list:{
                    name:'',
                    member_id:'',
                    target_customer_id:''
                },
                country:[],
                levels:[],
                user_lists:[],
                customer:[],
                loading_search:false,
                CombineDialog:false,
                loading:false,
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='User-customer'){
                    this.fetchData();
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                lists(this.queryList, 'customer').then(res => {
                    if (res && res.code == 0) {
                        if(this.loading_search){
                            this.$message({
                                message: 'success',
                                type: 'success'
                            })
                            this.loading_search=false
                        }
                        this.customer_type_info = res.enum.customer_type_info;
                        this.payment_day_info_ = res.enum.payment_day_info;
                        this.business_modes = res.enum.business_modes;
                        this.currencys = res.enum.currencys;
                        this.formula_type = res.enum.formula_type;
                        this.levels = res.enum.levels;
                        this.product_sort = res.enum.product_sorts;
                        this.sort_info = res.enum.sort_info;
                        this.type_info = res.enum.type_info;
                        this.user_type = res.enum.user_type;
                        res.data.data.forEach((items, index) => {
                            if (items.countries) {
                                items.map = 'flag-' + items.countries.Code2.toLowerCase()
                            }
                            // items.level_name=items.level_id?res.enum.levels[items.level_id].num:''
                            res.enum.levels.forEach((m, n) => {
                                if(items.level_id){
                                    if (m.id == items.level_id) {
                                        items.level_name = m.num
                                    }
                                }
                            })
                        })
                        this.list = res.data;
                        this.per_page = res.data.per_page;
                        this.total = res.data.total;
                        // for(var key in res.enum.responsible_level){
                        //     res.enum.responsible_level[key].duty_user_id=''
                        //     res.enum.responsible_level[key].responsible_level_id= res.enum.responsible_level[key].id
                        //     res.enum.responsible_level[key].member_id=''
                        //     res.enum.responsible_level[key].id=''
                        // }
                        res.enum.responsible_level.forEach((item,index)=>{
                            item.duty_user_id=''
                            item.responsible_level_id=item.id
                            item.member_id=''
                            item.id=''
                        })
                        this.responsible_level = res.enum.responsible_level;
                        this.responsible_person = res.enum.responsible_level;
                        this.express_company = res.enum.express_company;
                        this.bank_account_type_info=res.enum.bank_account_type_info
                    }
                })
                country_list().then(res => {
                    this.country = res.data;
                })
                let query_list = {
                    user_type: 102
                }
                lists(query_list, 'data/user_list').then(res => {
                    this.user_lists = res.data
                })
            },
            combine(name,id){
                this.combine_list = {
                    name:name,
                    member_id:id,
                    target_customer_id:'',
                }
                this.CombineDialog = true
            },
            combine_save(){
                merge_customer(this.combine_list,this)
            },
            close_combine(){
                this.combine_list = {
                    name:'',
                    member_id :'',
                    target_customer_id:'',
                }
                this.customer = []
                this.CombineDialog = false
            },
            remoteMethod (query) {
                if (query !== '') {
                    this.loading = true
                    setTimeout(() => {
                        customer_lists(query).then(res => {
                            this.customer = res.data.filter(i=>{return i.id!=this.combine_list.member_id})
                            this.loading = false
                        })
                    }, 200)
                } else {
                    this.customer = []
                }
            },
            search() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            add() {
                this.$router.push({
                    path: "/User/customerAdd",
                    name: "User-customerAdd",
                });
                // this.$router.push({
                //     path: "/User/addNew",
                //     name: "User-addNew",
                //     query:{
                //         new:true
                //     }
                // });
            },
            edit(id) {
                this.$router.push({
                    path: "/User/customerForm",
                    name: "User-customerForm",
                    query:{
                        id:id
                    }
                });
                // this.$router.push({
                //     path: "/User/addNew",
                //     name: "User-addNew",
                //     query:{
                //         id:id
                //     }
                // });
            },
            delete_customer(item) {
                destroy(item, 'customer', 'destory', this,'customer')
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData()
            },
        }
    };
    function obj(arr, object) {
        if (arr.length == 0) {
            for (let i in object) {
                arr.push(object[i]);
            }
        }
    }
</script>