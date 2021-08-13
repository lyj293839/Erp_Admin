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
    /deep/.dialog{
        .el-form-item{
            margin-bottom: 0px;
            padding: 0px;
        }
        .el-form-item__label{
            line-height: 20px;
            padding: 0px;
        }
        .el-dialog__body{
            padding: 10px 20px;
        }
    }
</style>
<template>
    <d2-container>
        <!--顶部搜索 开始-->
            <el-row style="margin: 10px 0px;">
                <el-col  :span="1">
                    <el-button type="primary" size="mini" name="add" @click="add" v-if="permissions.indexOf(450)>-1">{{$t('add')}}</el-button>
                </el-col>
                <el-col class="d2-text-right" :span="23">
                    <el-input
                            v-model="queryList.email"
                            style="width: 200px;margin: 0 5px;"
                            size="mini"
                            clearable
                            placeholder="邮箱"
                    ></el-input>
                    <el-input
                            v-model="queryList.keyword"
                            name="keyword"
                            style="width: 300px;margin: 0 5px;"
                            size="mini"
                            clearable
                            :placeholder="$t('user.customer.search_name')"
                    ></el-input>
                    <el-input
                            v-model="queryList.trim_name"
                            style="width: 200px;margin: 0 5px;"
                            size="mini"
                            clearable
                            placeholder="去白名称"
                    ></el-input>
                    <el-select v-model="queryList.country_code"  clearable filterable
                                style="width: 150px;margin: 0 5px;" size="mini"
                                :placeholder="$t('user.customer.search_country')">
                        <el-option
                                v-for="(item,index) in country"
                                :key="index"
                                :label="item.Name"
                                :value="item.Code">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.level_id" size="mini" clearable
                                style="width: 110px;margin: 0 5px;"
                                :placeholder="$t('user.customer.search_level')">
                        <el-option
                                v-for="(item,index) in levels"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.sale_head_id" clearable  filterable size="mini"
                                style="width: 100px;margin: 0 5px;"
                                placeholder="负责人">
                        <el-option
                                v-for="(i,index) in user_lists"
                                :key="index"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.special_customer"  clearable filterable
                                style="width: 100px;margin: 5px;" size="mini"
                                placeholder="客户类型">
                        <el-option
                                v-for="(item,index) in special_customer_info"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="queryList.stop_status"  clearable filterable
                                style="width: 80px;margin: 5px;" size="mini"
                                placeholder="状态">
                        <el-option
                                v-for="(item,index) in stop_status_info"
                                :key="index"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="mini" name="search" :loading="loading_search" @click="search">{{$t('search')}}
                    </el-button>
                </el-col>
            </el-row>
        <!--顶部搜索 结束-->

        <!--列表-->
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="small">
            <el-table-column label="ID" width="70">
                <template slot-scope="scope">{{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="客户名称" width="150">
                <template slot-scope="scope">
                    {{scope.row.name}}
                    <el-tooltip content="重要客户" v-if='scope.row.is_important==1' placement="top">
                      <i style='color:red;cursor: pointer;' class='el-icon-s-flag'></i>
                    </el-tooltip>
                    <br>
                    <span v-if="scope.row.is_black_cust==1" style="color:red;">(黑名单)</span>
                </template>
            </el-table-column>
            <el-table-column label="英文名称" width="150">
                <template slot-scope="scope">{{scope.row.english_name}}</template>
            </el-table-column>
            <el-table-column label="国家" width="100">
                <template slot-scope="scope">{{scope.row.countries?scope.row.countries.Name:''}}</template>
            </el-table-column>
            <el-table-column label="类别" width="50">
                <template slot-scope="scope">{{getEnumValue(customer_type_info,scope.row.customer_type)}}</template>
            </el-table-column>
            <el-table-column label="等级" width='50'>
                <template slot-scope="scope">{{getEnumValue(levels,scope.row.level_id)}}</template>
            </el-table-column>

            <el-table-column label="负责人" width="130">
                <template slot-scope="scope">
                    <span v-for="i in scope.row.responsible_persons">
                        <div v-if="i.responsible_level_id == 1103">开发负责人:{{getEnumValue(user_lists,i.duty_user_id)}}</div>
                        <div v-else-if="i.responsible_level_id == 1101">第一负责人:{{getEnumValue(user_lists,i.duty_user_id)}}</div>
                        <div v-else-if="i.responsible_level_id == 1102">第二负责人:{{getEnumValue(user_lists,i.duty_user_id)}}</div>
                        <span v-else></span>
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="人员" width="60">
                <template slot-scope="scope">{{getEnumValue(Users,scope.row.user_id)}}</template>
            </el-table-column>
            <el-table-column label="时间" width="90">
                <template slot-scope="scope">{{scope.row.created_at}}</template>
            </el-table-column>
            <el-table-column label="备注" min-width="100">
                <template slot-scope="scope">{{scope.row.remark}}</template>
            </el-table-column>
            <!-- <el-table-column label="类型" width="60">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_black_cust==1" style="color:red;">黑名单</span>
                    <span v-else style="color:green;">正常</span>
                </template>
            </el-table-column> -->
            <el-table-column label="状态" width="60">
                <template slot-scope="scope">
                    <span :style="scope.row.is_stop==1?'color:green':'color:red'">{{getEnumValue(stop_status_info,scope.row.is_stop)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240" fixed="right">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="primary"
                        @click="edit(scope.row.id)" 
                        v-if="permissions.indexOf(451)>-1"
                    >编辑</el-button>
                    <el-button
                        size="mini"
                        type="primary"
                        @click="combine(scope.row.name,scope.row.id)" 
                        v-if="permissions.indexOf(451)>-1&&scope.row.countries&&scope.row.countries.Name!='China'"
                    >合并</el-button>
                     <el-button
                        size="mini"
                        type="primary"
                        @click="mapp(scope.row)" 
                    >映射</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="delete_customer(scope.row)" 
                        v-if="permissions.indexOf(452)>-1"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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

         <!--映射-->
        <el-dialog title='映射客户' :visible.sync="MappDialog" width="30%" class="dialog">
            <el-form label-position="top">
                <el-form-item label="客户名称">
                    <el-input v-model="mapp_form.name" size="mini" disabled></el-input>
                </el-form-item>
                <el-form-item label="映射">
                    <el-select
                        v-model="mapp_form.map_customer_id"
                        filterable
                        clearable
                        remote
                        size="mini"
                        reserve-keyword
                        :remote-method="remoteMethod"
                        :loading="loading"
                        style="width: 100%;"
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
                    <el-button type="primary" size="mini" @click="mapp_save()">确定</el-button>
                    <el-button size="mini" @click="MappDialog = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                layout="prev, pager, next"
                :page-size="list.per_page"
                :total="list.total">
        </el-pagination>
    </d2-container>
</template>
<script>
    import {
        v2_lists,
        lists,
        destroy,
        country_list,
        member_company,
        merge_customer,
        customer_lists_id,
        map_customer
    } from '@/api/user'
    import { customer_lists} from '@/api/sale'
    import util from '@/libs/util'
    export default {
        name: "User-index_new",
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
                    stop_status:'',
                    email:'',
                    special_customer:'',
                    trim_name:''
                },
                list: [],
                combine_list:{
                    name:'',
                    member_id:'',
                    target_customer_id:''
                },
                mapp_form:{},
                country:[],
                levels:[],
                user_lists:[],
                Users:[],
                customer:[],
                customer_type_info:[],
                stop_status_info:[],
                special_customer_info:[],
                loading_search:false,
                CombineDialog:false,
                loading:false,
                MappDialog:false
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='User-index_new'){
                    this.fetchData();
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                v2_lists(this.queryList, 'customer').then(res => {
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
                        this.levels = res.enum.levels;
                        this.user_type = res.enum.user_type;
                        this.customer_type_info = res.enum.customer_type_info;
                        this.stop_status_info = res.enum.stop_status_info;
                        this.special_customer_info = res.enum.special_customer_info;
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
                this.Users = this.GEnums.Users
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
                this.customer = []
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
                    path: "/User/addNew",
                    name: "User-addNew",
                    query:{
                        new:true,
                        special_customer_info:JSON.stringify(this.special_customer_info)
                    }
                });
            },
            edit(id) {
                this.$router.push({
                    path: "/User/addNew",
                    name: "User-addNew",
                    query:{
                        id:id,
                        special_customer_info:JSON.stringify(this.special_customer_info)
                    }
                });
            },
            mapp(item){
                this.mapp_form = {
                    member_id:item.id,
                    name:item.name,
                    map_customer_id:item.map_customer_id?item.map_customer_id:''
                }
                this.customer = []
                if(item.map_customer_id){
                    customer_lists_id(item.map_customer_id).then(res=>{
                        this.customer = res.data
                        this.MappDialog = true
                    })
                }else{
                    this.MappDialog = true
                }
            },
            mapp_save(){
                map_customer(this.mapp_form,this)
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