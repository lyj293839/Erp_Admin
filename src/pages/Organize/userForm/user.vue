<template>
    <div>
        <div v-if="dialogUser">
            <el-button type="primary" @click="add_user" style="margin:10px;" size="mini">
                Add
            </el-button>
            <el-table :data="user_list.data" border fit highlight-current-row size="small">

                <el-table-column align="center" label='id'>
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="name" align="center">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="account" align="center">
                    <template slot-scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column label="email" align="center">
                    <template slot-scope="scope">
                        {{scope.row.email}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="Options">
                    <template slot-scope="scope">
                        <template>
                            <!-- <el-button
                                    size="mini"
                                    type="primary"
                                    v-if="permissions_all.indexOf(498)>-1"
                                    @click="UserEdit(scope.row)">Edit
                            </el-button> -->
                            <el-button
                                    size="mini"
                                    type="primary"
                                    @click="UserEdit(scope.row)">Edit
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDel(scope.row)">Delete
                            </el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <!--<el-pagination-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page.sync="currentPage"-->
            <!--layout="total, prev, pager, next,jumper"-->
            <!--:page-size="user_list.per_page"-->
            <!--:total="user_list.total">-->
            <!--</el-pagination>-->
            <el-pagination
                    class="d2-mt"
                    background
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="prev, pager, next"
                    :total="user_list.total">
            </el-pagination>
        </div>
        <div v-else>
            <el-card class="box-card base">
                <div slot="header" class="clearfix">
                    <i @click="toggle" class="el-icon-caret-bottom"></i>Basis
                    <el-button style="float: right;" type="primary" size="mini" @click="dialogUser=true">返回</el-button>
                </div>
                <el-form :model="user_form" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.type')">
                                <SelectTree2 v-if="flag"
                                             :value="valueId"
                                             :options="list"
                                             @getValue="getValue($event)"
                                />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.name')" :required="true">
                                <el-input v-model="user_form.name" autocomplete="off" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.account')" :required="true">
                                <el-input v-model="user_form.username" autocomplete="off" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.password')" :required="true">
                                <el-input v-model="user_form.password" autocomplete="off"
                                          placeholder="The original password is not entered" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.tel')" :required="true">
                                <el-input v-model="user_form.tel" autocomplete="off" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.fax')" :required="true">
                                <el-input v-model="user_form.fax" autocomplete="off" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.email')" :required="true">
                                <el-input v-model="user_form.email" autocomplete="off" size="mini"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.grade')">
                                <el-input v-model="user_form.grade" autocomplete="off" type="number" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.user_type')">
                                <el-select v-model="user_form.user_type" clearable placeholder="Please Select" size="mini">
                                    <el-option
                                            v-for="item in user_type"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!-- <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.sex')" :required="true">
                                <el-select v-model="user_form.sex" placeholder="Please Select" size="mini">
                                    <el-option
                                            v-for="item in $t('sexs')"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.role')" >
                                <el-select  size="mini" v-model="user_form.role_id" multiple placeholder="Please Select">
                                    <el-option
                                            v-for="item in roles"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('status')">
                                <el-radio-group v-model="user_form.status">
                                    <el-radio :label="0">{{$t('disable')}}</el-radio>
                                    <el-radio :label="1">{{$t('enable')}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item label="标识">
                                <el-radio-group v-model="user_form.flag">
                                    <el-radio v-for="i in flag_list" :key="i.id" :label="i.id">{{i.name_cn}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="saveUser" size="mini">Save</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card mac" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <i @click="toggle_mac" class="el-icon-caret-bottom"></i>仓库
                </div>
                <el-form label-width="70px" class="demo-ruleForm">
                    <el-form-item label="仓库" :required="true">
                        <el-select v-model="warehouse_list" style="width:300px;" size="mini" multiple placeholder="请选择">
                            <el-option
                            v-for="item in Warehouse"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                        <el-button type="primary" style="margin-left:10px;" size="mini" @click="save_Warehouse()">save</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card mac" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <i @click="toggle_mac" class="el-icon-caret-bottom"></i>mac
                    <el-button style="float: right; padding: 3px 0" @click="add_mac" type="text">
                        <d2-icon name="plus" style="font-size: 16px;"/>
                    </el-button>
                </div>
                <el-form label-width="70px" class="demo-ruleForm">
                    <el-row :gutter="5" v-for="(item,index) in mac_form" :key="index">
                        <el-col :span="6">
                            <el-form-item label="Mac" :required="true">
                                <el-autocomplete
                                        class="inline-input"
                                        v-model="item.mac"
                                        label="address"
                                        @focus="select_index(index)"
                                        :fetch-suggestions="querySearch"
                                        placeholder="请输入内容"
                                        @select="handleSelect" size="mini">
                                    <template slot-scope="{ item }">
                                        <div class="mac">{{ item.mac }}</div>
                                    </template>
                                </el-autocomplete>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item :label="$t('organize.userForm.validity')" :required="true">
                                <el-date-picker
                                        v-model="item.expirydate"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        placeholder="Select Date" size="mini">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6" class="status">
                            <el-form-item :label="$t('status')">
                                <el-radio-group v-model="item.status">
                                    <el-radio :label="0">{{$t('disable')}}</el-radio>
                                    <el-radio :label="1">{{$t('enable')}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5" class="status">
                            <el-form-item>
                                <el-button type="primary" size="mini" @click="save_mac(item)">save</el-button>
                                <el-button type="danger" size="mini" @click="delete_mac(item)"
                                           v-show="item.id&&item.id!=null">delete
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </el-card>
            <el-card class="box-card permission" style="margin-top: 20px;">
                <div slot="header" class="clearfix">
                    <i @click="toggle_permission" class="el-icon-caret-bottom"></i>Permission
                    <el-button type="primary" @click="saveEditPermission()" style="float: right;" size="mini">
                        Save
                    </el-button>
                </div>
                <el-checkbox v-model="checked" @change="checkedAll"/> 全选
                    <el-tree
                            :data="data"
                            ref="data"
                            check-strictly
                            @node-contextmenu="select_child"
                            :render-content="renderContent"
                            show-checkbox
                            node-key="id"
                            @node-expand="expand"
                            default-expand-all
                            :default-checked-keys="permission_own_ids"
                            :props="defaultProps_p"
                            @check-change="handleCheckChange">
                    </el-tree>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {
        user_list,
        user_list_,
        user_create,
        user_edit,
        user_update,
        user_destroy,
        mac_lists,
        mac_create,
        mac_update,
        mac_destroy,
        assignPermission,
        update_has_warehouses
    } from '@/api/organize';
    import selectTree from "@/components/selectTree/selectTree"
    import SelectTree2 from "@/components/selectTree/selectTree2"
    import $ from 'jquery'
    export default {
        name: "",
        components: {
            'el-select-tree': selectTree,
            'SelectTree2': SelectTree2,
        },
        data() {
            return {
                permissions_all:JSON.parse(localStorage.getItem('permissions')),
                user_list: [],
                is_department: false,
                queryList: {
                    'page': '1',
                    keywords:this.keywords
                },
                currentPage: 1,
                roles: [],
                dialogUser: true,
                compnayOrDepartment: '',
                warehouse_list:[],
                flag_list:[],
                user_form: {
                    name: '',
                    username: '',
                    // tel:'',
                    // fax:'',
                    // email: '',
                    password: '',
                    only_id: '',
                    department_id: '',
                    member_id: '',
                    user_type: '',
                    // sex: '',
                    role_id: [],
                    grade: '',
                    status: 1
                },
                mac_form: [{
                    mac: '',
                    options: [],
                    expirydate: '',
                    status: 1
                }],
                defaultProps_p: {
                    children: '_child',
                    label: 'english_name'
                },
                data:[],
                permission_: [],
                permission_ids:[],
                permission_own_ids: [],
                permissions: [],
                defaultProps: {
                    children: 'children',
                    label: 'english_name'
                },
                valueId: '',
                flag: false,
                restaurants: [],
                mac_lists: [],
                index: '',
                user_type: [],
                Warehouse:[],
                checked:false,
            }
        },
        props:['datas','keywords','list','date','page'],
        created() {
            this.get_user_list()
            if(this.$i18n.locale=='cn'){
                this.defaultProps_p={
                    children: '_child',
                        label: 'chinese_name'
                },
                this.defaultProps={
                    children: '_child',
                    label: 'chinese_name'
                }
            }
        },
        watch: {
            date(val) {
                this.queryList.page = this.currentPage = 1;
                this.get_user_list()
            },
            keywords(val){
                this.queryList.page = this.currentPage = 1;
                this.queryList.keywords = val
                this.get_user_list()
            }
        },
        methods: {
            // 内容区渲染后执行 判断底层 赋 class
            renderContent(h, { node, data, store }) {
                let classname = ''
                if (node.level === 4) {
                    classname = 'levelname'
                }
                return (
                    <p class={classname}>
                    {node.label}
            </p>)
            },
            changeCss() {
                var levelName = document.getElementsByClassName('levelname') // levelname是上面的最底层节点的名字
                for (var i = 0; i < levelName.length; i++) {
                    // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
                    levelName[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
                    levelName[i].parentNode.style.styleFloat = 'left'
                }
            },
            checkedAll(){
                if (this.checked) {
                    //全选
                    this.$refs.data.setCheckedKeys(this.permission_ids);

                }else{
                    //取消选中
                    this.$refs.data.setCheckedKeys([]);
                    this.permission_own_ids=[]
                }
            },
            select_index(index) {
                this.index = index
            },
            querySearch(queryString, cb) {
                mac_lists().then(res => {
                    var restaurants = res.data;
                    var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                    // 调用 callback 返回建议列表的数据
                    cb(results);
                })
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.mac_form[this.index].mac = item.mac
                this.mac_form[this.index].id = item.id
            },
            getValue(event) {
                this.user_form.only_id = event
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.get_user_list();
            },
            get_user_list() {
                this.dialogUser = true
                if (!this.datas.member_id) {
                    user_list(this.queryList, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                            this.flag_list = res.flag
                        }
                    })
                } else {
                    user_list_(this.queryList, this.datas.member_id, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                            this.flag_list = res.flag
                        }
                    })
                }
                this.Warehouse = this.GEnums.Warehouse;
            },
            get_user_list_update() {
                if (!this.datas.member_id) {
                    user_list(this.queryList, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                            this.flag_list = res.flag
                        }
                    })
                } else {
                    user_list_(this.queryList, this.datas.member_id, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                            this.flag_list = res.flag
                        }
                    })
                }
                this.Warehouse = this.GEnums.Warehouse;
            },
            toggle() {
                $('.base .el-card__body').toggle()
            },
            toggle_mac() {
                $('.mac .el-card__body').toggle()
            },
            toggle_permission() {
                $('.permission .el-card__body').toggle()
            },
            UserEdit(row) {
                this.flag = false
                user_edit(row.id).then(res => {
                    if (res && res.code == 0) {
                        this.valueId = res.data.only_id;
                        this.flag = true
                        this.user_form = {
                            id: res.data.id,
                            only_id: res.data.only_id,
                            member_id: res.data.member_id,
                            department_id: res.data.department_id,
                            name: res.data.name,
                            // tel:res.data.tel,
                            // fax:res.data.fax,
                            username: res.data.username,
                            // email: res.data.email,
                            role_id: res.data.role_id,
                            // sex: res.data.sex,
                            user_type: res.data.user_type,
                            grade: res.data.grade,
                            status: res.data.status,
                            flag:res.data.flag
                        }
                        this.mac_form = res.data.macs
                        this.data = res.data.permissions
                        this.permission_ids=res.data.permission_ids
                        this.permission_own_ids = res.data.permission_own_ids
                        this.warehouse_list = []
                        if(res.data.permission_ids.sort().toString()==res.data.permission_own_ids.sort().toString()){
                            this.checked=true
                        }else{
                            this.checked=false
                        }
                        res.data.UserHasWarehouse.forEach(i=>{
                            this.warehouse_list.push(i.user_has_warehouses_id)
                        })
                        setTimeout(()=>{
                            this.changeCss()
                        },1000)
                        this.dialogUser = false
                    }
                })
            },
            add_user() {
                this.dialogUser = false
                this.flag = true
                this.valueId = ''
                this.user_form = {
                    name: '',
                    username: '',
                    // email: '',
                    password: '',
                    user_type: '',
                    // tel:'',
                    // fax:'',
                    only_id: this.datas.only_id,
                    department_id: this.datas.id,
                    member_id: this.datas.member_id,
                    // sex: '',
                    role_id: [],
                    grade: '',
                    status: 1
                }
                this.mac_form = [{
                    mac: '',
                    options: [],
                    expirydate: '',
                    status: 1
                }],
                    this.data = []
                this.permission_own_ids = []
                this.warehouse_list = []
            },
            save_Warehouse(){
                var obj = {
                    user_id:this.user_form.id,
                    warehouse_ids:this.warehouse_list
                }
                update_has_warehouses(obj).then(res=>{
                    if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            // this.fetchData();
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                })
            },
            saveUser() {
                // this.dialogUser = true
                if (this.user_form.id) {
                    user_update(this.user_form.id, this.user_form).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            // this.fetchData();
                            this.get_user_list_update()
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                } else {
                    user_create(this.user_form).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            this.user_form.id = res.data.id
                            this.get_user_list_update()
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }
            },
            add_mac() {
                this.mac_form.push({
                    mac: '',
                    status: 1
                })
            },
            save_mac(data) {
                if (data.id) {
                    mac_update(this.user_form.id, data.id, data).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            user_edit(this.user_form.id).then(res => {
                                if (res && res.code == 0) {
                                    this.mac_form = res.data.macs
                                }
                            })
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                } else {
                    mac_create(this.user_form.id, data).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            user_edit(this.user_form.id).then(res => {
                                if (res && res.code == 0) {
                                    this.mac_form = res.data.macs
                                }
                            })
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    })
                }
            },
            delete_mac(data) {
                const h = this.$createElement;
                this.$msgbox({
                    message: h('p', null, [
                        h('span', null, '确定要执行此操作吗？')
                    ]),
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            mac_destroy(this.user_form.id, [data.id]).then(res => {
                                instance.confirmButtonLoading = false;
                                instance.confirmButtonText = '确定';
                                if (res && res.code == 0) {
                                    this.$message({
                                        message: 'success',
                                        type: 'success'
                                    });
                                    done();
                                    user_edit(this.user_form.id).then(res => {
                                        if (res && res.code == 0) {
                                            this.mac_form = res.data.macs
                                        }
                                    })
                                }
                            })
                        }
                        if (action === 'cancel') {
                            done();
                        }
                    }
                })
            },
            expand(){
                this.parent=false
            },
            handleCheckChange(data, checked, indeterminate) {
                let that = this
                if (checked) {
                    that.permission_own_ids.push(data.id)
                    // that.permission_own_ids.push(data.parent_id)
                } else {
                    that.permission_own_ids.forEach(function (items, index) {
                        if (items == data.id) {
                            that.permission_own_ids.splice(index, 1)
                        }
                    })
                }
                // that.permission_own_ids=[...new Set(that.permission_own_ids)]
            },
            select_child(event,data,Node,self){
                Node.checked=!Node.checked
                if(Node.childNodes&&Node.childNodes.length>0){
                    Node.childNodes.forEach((items,index)=>{
                        items.checked=Node.checked
                        if(items.childNodes.length>0){
                            items.childNodes.forEach((m,n)=>{
                                m.checked=Node.checked
                                if(m.childNodes.length>0){
                                    m.childNodes.forEach((i,j)=>{
                                        i.checked=Node.checked
                                    })
                                }
                            })
                        }
                    })
                }
                if(Node.parent){
                    if(Node.checked){
                        Node.parent.checked=Node.checked
                    }
                    if(Node.parent.parent){
                        if(Node.checked) {
                            Node.parent.parent.checked = Node.checked
                        }
                    }
                    if(Node.parent.parent.parent){
                        if(Node.checked) {
                            Node.parent.parent.parent.checked = Node.checked
                        }
                    }
                }
            },
            saveEditPermission() {
                let that = this
                assignPermission(this.user_form.id, this.permission_own_ids).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        // user_edit(this.user_form.id).then(res => {
                        //     if (res && res.code == 0) {
                        //         that.permission_ = []
                        //         that.permission_own_ids = []
                        //         that.permission_own_ids = res.data.permission_own_ids
                        //         that.permission_ = res.data.permissions

                        //     }
                        // })
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .el-pagination {
        text-align: right;
        margin: 10px;
    }
    .el-form-item__content {
        height: 28px;
        line-height: 28px;
    }
    .el-input--mini .el-input__inner {
        height: 28px!important;
        line-height: 28px;
    }

</style>