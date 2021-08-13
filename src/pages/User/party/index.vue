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
            <el-row style="margin: 10px 0px;">
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
                    <el-select v-model="queryList.stop_status"  clearable filterable
                                style="width: 100px;margin: 0 10px;" size="mini"
                                placeholder="使用状态">
                        <el-option
                                v-for="(item,index) in stop_status_info"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" :loading="loading_search" @click="search_supplier">{{$t('search')}}</el-button>
                </el-col>
            </el-row>
        <!--列表-->
        <el-table :data="lists.data" element-loading-text="Loading" border fit highlight-current-row size="small">
            <el-table-column label="ID" width="70">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="乙方名称" width="200">
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="英文名称" width="200">
                <template slot-scope="scope">{{scope.row.english_name}}</template>
            </el-table-column>
            <el-table-column label="国家" width="90">
                <template slot-scope="scope">{{scope.row.countries?scope.row.countries.Name:''}}</template>
            </el-table-column>
            <el-table-column label="时间" width="90">
                <template slot-scope="scope">{{scope.row.created_at}}</template>
            </el-table-column>
            <el-table-column label="备注" min-width="100">
                <template slot-scope="scope">{{scope.row.remark}}</template>
            </el-table-column>
            <el-table-column label="黑名单" width="60">
                <template slot-scope="scope">
                    <span :style="scope.row.supplier_status==1?'color:green':'color:red'">
                        {{getEnumValue(supplier_status_info,scope.row.supplier_status)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="状态" width="60">
                <template slot-scope="scope">
                    <span :style="scope.row.is_stop==1?'color:green':'color:red'">
                        {{getEnumValue(stop_status_info,scope.row.is_stop)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="130" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="edit(scope.row.id)" 
                        v-if="permissions.indexOf(456)>-1"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="delete_supplier(scope.row)" 
                        v-if="permissions.indexOf(457)>-1"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size="lists.per_page"
                :total="lists.total">
        </el-pagination>
    </d2-container>
</template>
<script>
    import {party_b,destroy} from '@/api/user'
    import $ from 'jquery'
    import util from '@/libs/util'
    import axios from 'axios'
    export default {
        name: "User-party",
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                member_id: '',
                lists: {},
                input: '',
                imageUrl: '',
                currentPage: 1,
                queryList: {
                    page: '1',
                    keyword: '',
                    supplier_status:'',
                    stop_status:''
                },
                supplier_status_info:[],
                stop_status_info:[],
                loading_search:false
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='User-party'){
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
                    path: "/User/party_add",
                    name: "User-party_add",
                    query:{
                        new:true
                    }
                });
            },
            search_supplier() {
                this.loading_search=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            edit(id) {
                // this.$router.push({
                //     path: "/User/supplier_addNew",
                //     name: "User-supplier_addNew",
                //     query:{
                //         id:id
                //     }
                // });
            },
            fetchData() {
                party_b(this.queryList, 'supplier').then(res => {
                    if(this.loading_search){
                        this.$message({
                            message: 'success',
                            type: 'success'
                        })
                        this.loading_search=false
                    }
                    this.lists = res.data;
                    this.business_modes = this.GEnums.OperationType;
                    this.supplier_status_info = res.enum.supplier_status_info
                    this.stop_status_info = res.enum.stop_status_info
                    this.country = this.GEnums.Country;
                })
            },
            delete_supplier(item) {
                // destroy(item, 'supplier', 'destory', this,'supplier')
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData()
            },
        }
    };
</script>