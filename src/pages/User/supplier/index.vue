<style lang="scss" scoped type="text/scss">
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
        width: 120px;
        height: 120px;
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
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
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
            <el-row style="margin: 10px 30px;">
                <el-col  :span="2">
                    <el-button type="primary" size="mini" name="add" @click="add" v-if="permissions.indexOf(455)>-1">{{$t('add')}}</el-button>
                </el-col>
                <el-col class="d2-text-right" :span="22">
                    <el-input
                            v-model="queryList.keyword"
                            style="width: 300px;margin: 0 10px;"
                            size="mini"
                            clearable
                            :placeholder="$t('user.supplier.search_name')"
                    ></el-input>
                    <el-select v-model="queryList.product_sorts" filterable  size="mini"
                    style="width: 180px;margin: 0 10px;"
                    multiple :placeholder="$t('user.customer.search_sorts')">
                    <el-option
                    v-for="(item,index) in product_sort"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                    </el-select>
                    <el-select v-model="queryList.supplier_status"  clearable filterable
                                   style="width: 100px;margin: 0 10px;" size="mini"
                                   placeholder="状态">
                            <el-option
                                    v-for="(item,index) in supplier_status_info"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    <el-button type="primary" size="mini" :loading="loading_search" @click="search_supplier">{{$t('search')}}</el-button>
                </el-col>
            </el-row>
            <div class="item">
                <el-card v-for="(item,index) in lists.data" :key="item.id" class="box-card d2-m-10" style="position: relative;">
                    <div slot="header" class="clearfix">
                        <el-container>
                            <el-aside width="70px" style="height: 100px;">
                                <img src="map/blank.gif" class="flag" :class="item.map"
                                     :title="item.countries?item.countries.Name:''" style="margin: 0 10px;"/>
                                <el-tooltip v-if="item.level_id" class="item level" effect="dark" content="等级" placement="top-start">
                                    <el-button>{{item.level_name}}</el-button>
                                </el-tooltip>
                            </el-aside>
                            <el-main style="padding: 8px 0;">
                                <div>{{item.name}}</div>
                                <div>{{item.english_name}}</div>
                                <div v-text="item.sort==1?'公司':'个人'">{{item.type}}</div>
                                <div>{{item.business_mode_name}}</div>
                                <div class="grey l_h" style="font-size: 13px;">{{item.product_sorts_name}}</div>
                            </el-main>
                        </el-container>
                    </div>
                    <el-row :gutter="10" style="position: absolute;bottom: 0;width: 100%;hiehgt:40px;line-height: 40px;border-top: 1px solid #ebeef5;">
                        <el-col :span="12">
                            <div class="d2-text-center border-right" @click="edit(item.id)" v-if="permissions.indexOf(456)>-1">{{$t('edit')}}</div>
                        </el-col>
                        <el-col :span="12">
                            <div class="d2-text-center" @click="delete_supplier(item,index)" v-if="permissions.indexOf(457)>-1">{{$t('delete')}}</div>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :page-size="lists.pageSize"
                    :total="lists.total">
            </el-pagination>
    </d2-container>
</template>
<script>
    import {
        lists,
        v2_lists,
        create,
        edit,
        update,
        destroy,
        country_list,
        province_list,
        city_list,
        member_company
    } from '@/api/user'
    import $ from 'jquery'
    import util from '@/libs/util'
    import axios from 'axios'
    export default {
        name: "User-supplier",
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                member_id: '',
                lists: [],
                input: '',
                imageUrl: '',
                currentPage: 1,
                queryList: {
                    page: '1',
                    keyword: '',
                    product_sorts:'',
                    supplier_status:''
                },
                product_sort:[],
                supplier_status_info:[],
                loading_search:false
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='User-supplier'){
                    this.fetchData();
                }
            }
        },
        created() {
            this.fetchData();
        },
        computed: {
            headers() {
                const token = util.cookies.get('token')
                return {
                    'Authorization': 'Bearer ' + token
                }
            }
        },
        methods: {
            add() {
                this.$router.push({
                    path: "/User/supplierAdd",
                    name: "User-supplierAdd",
                });
            },
            search_supplier() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            edit(id) {
                this.$router.push({
                    path: "/User/supplierForm",
                    name: "User-supplierForm",
                    query:{
                        id:id
                    }
                });
            },
            fetchData() {
                lists(this.queryList, 'supplier').then(res => {
                    if(this.loading_search){
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.loading_search=false
                    }
                    res.data.data.forEach((items, index) => {
                        if (items.countries) {
                            items.map = 'flag-' + items.countries.Code2.toLowerCase()
                        }
                        items.product_sorts_name=""
                        res.enum.product_sorts.forEach((m, n) => {
                            if (items.product_sorts) {
                                items.product_sorts.forEach((i, j) => {
                                    if (i == m.id) {
                                        if (items.product_sorts.length > 1) {
                                            items.product_sorts_name += m.name + '/'
                                        } else {
                                            items.product_sorts_name = m.name
                                        }
                                    }
                                })
                            }
                        })
                        res.enum.levels.forEach((m, n) => {
                            if(m.id==items.level_id){
                                items.level_name=m.num
                            }
                        })
                        res.enum.business_modes.forEach((m, n) => {
                            if(m.id==items.business_mode_id){
                                items.business_mode_name=m.name
                            }
                        })
                    })
                    this.lists = res.data;
                    this.pay_ways = res.enum.pay_ways;
                    this.business_modes = res.enum.business_modes;
                    this.currencys = res.enum.currencys;
                    this.formula_type = res.enum.formula_type;
                    this.levels = res.enum.levels;
                    this.product_sort = res.enum.product_sorts;
                    this.sort_info = res.enum.sort_info;
                    this.type_info = res.enum.type_info;
                    this.user_type = res.enum.user_type;
                    this.express_company = res.enum.express_company;
                    this.bank_account_type_info=res.enum.bank_account_type_info;
                    this.supplier_status_info = res.enum.supplier_status_info
                })
                country_list().then(res => {
                    this.country = res.data;
                })
            },
            delete_supplier(item) {
                destroy(item, 'supplier', 'destory', this,'supplier')
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData()
            },
        }
    };
</script>