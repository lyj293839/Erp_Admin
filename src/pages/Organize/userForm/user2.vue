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
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.email')" :required="true">
                                <el-input v-model="user_form.email" autocomplete="off" size="mini"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.grade')">
                                <el-input v-model="user_form.grade" autocomplete="off" size="mini"></el-input>
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
                        <el-col :span="8">
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
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="$t('organize.userForm.role')">
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

                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="saveUser" size="mini">Save</el-button>
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
                    <el-row :gutter="5" v-for="(item,index) in mac_form">
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
                <div v-if="parent">
                <el-tree
                        :data="permission_"
                        ref="permission_"
                        check-strictly
                        show-checkbox
                        node-key="id"
                        @node-expand="expand"
                        :default-checked-keys="permission_own_ids"
                        :props="defaultProps_p"
                        @check-change="handleCheckChange">
                </el-tree>
                </div>
                <div v-else>
                    <el-tree
                            :data="permission_"
                            ref="permission_"
                            show-checkbox
                            node-key="id"
                            @node-expand="expand"
                            :default-checked-keys="permission_own_ids"
                            :props="defaultProps_p"
                            @check-change="handleCheckChange">
                    </el-tree>
                </div>
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
        assignPermission
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
                user_list: [],
                is_department: false,
                queryList: {
                    'page': '1',
                },
                currentPage: 1,
                roles: [],
                dialogUser: true,
                compnayOrDepartment: '',
                user_form: {
                    name: '',
                    username: '',
                    email: '',
                    password: '',
                    only_id: '',
                    department_id: '',
                    member_id: '',
                    user_type: '',
                    sex: '',
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
                permission_: [],
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
                checked:false,
                parent:true,
                all_id:[]
            }
        },
        props: {
            datas: {
                type: Object,
                required: true
            },
            list: {
                type: Array,
                required: true
            },
            date: {
                type: Number,
                required: true
            },
            page: {
                type: Number,
                required: true
            },
        },
        created() {
            this.get_user_list()
        },
        watch: {
            date(val) {
                this.queryList.page = this.currentPage = 1;
                this.get_user_list()
            }
        },
        methods: {
            checkedAll(){
                if (this.checked) {
                    //全选
                    this.parent=false
                    this.$refs.permission_.setCheckedKeys(this.all_id);
                    this.permission_own_ids=this.all_id
                }else{
                    //取消选中
                    this.parent=false
                    this.$refs.permission_.setCheckedKeys([]);
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
                        }
                    })
                } else {
                    user_list_(this.queryList, this.datas.member_id, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                        }
                    })
                }
            },
            get_user_list_update() {
                if (!this.datas.member_id) {
                    user_list(this.queryList, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                        }
                    })
                } else {
                    user_list_(this.queryList, this.datas.member_id, this.datas.id).then(res => {
                        if (res && res.code == 0) {
                            this.user_list = res.data
                            this.user_type = res.user_type
                            this.roles = res.roles
                        }
                    })
                }
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
                this.dialogUser = false
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
                            username: res.data.username,
                            email: res.data.email,
                            role_id: res.data.role_id,
                            sex: res.data.sex,
                            user_type: res.data.user_type,
                            grade: res.data.grade,
                            status: res.data.status,
                        }
                        this.mac_form = res.data.macs
                        res.data.permissions.forEach((items,index)=>{
                            this.all_id.push(items.id)
                            if(items._child){
                                items._child.forEach((m,n)=>{
                                    this.all_id.push(m.id)
                                    if(m._child){
                                        m._child.forEach((i,j)=>{
                                            this.all_id.push(i.id)
                                            if(i._child){
                                                i._child.forEach((x,y)=>{
                                                    this.all_id.push(x.id)
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        this.permission_ = res.data.permissions
                        this.permission_own_ids = res.data.permission_own_ids
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
                    email: '',
                    password: '',
                    user_type: '',
                    only_id: this.datas.only_id,
                    department_id: this.datas.id,
                    member_id: this.datas.member_id,
                    sex: '',
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
                    this.permission_ = []
                this.permission_own_ids = []
            },
            saveUser() {
                if (this.user_form.id) {
                    user_update(this.user_form.id, this.user_form).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
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
            saveEditPermission() {
                let that = this
                assignPermission(this.user_form.id, this.permission_own_ids).then(res => {
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        });
                        user_edit(this.user_form.id).then(res => {
                            if (res && res.code == 0) {
                                // that.permission_ = []
                                // that.permission_own_ids = []
                                that.permission_ = res.data.permissions
                                that.permission_own_ids = res.data.permission_own_ids
                            }
                        })
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