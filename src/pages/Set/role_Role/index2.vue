<style lang="scss" scoped type="text/scss">
    .add {
        margin-bottom: 15px;
    }

    .wrapMenu {
        margin-top: 12px;
        .menuMoudle {
            border: 1px solid #bfcbd9;
            height: 60px;
            .menuHeader {
                line-height: 30px;
                padding-left: 5px;
                height: 30px;
                border-bottom: 1px solid #bfcbd9;
            }
            .menuBody {
                line-height: 30px;
                padding-left: 5px;
            }
        }
    }

    .el-form-item__label {
        width: 100px !important;
    }

    .el-form-item__content {
        margin-left: 110px !important;
    }

    .el-pagination {
        text-align: right;
        margin-top: 10px;
    }
</style>
<template>
    <d2-container>
        <el-button
                class="add"
                size="mini"
                type="primary"
                @click="handleAdd" icon="plus">ADD
        </el-button>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="small">
            <el-table-column align="center" label='id'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="name_cn" align="center">
                <template slot-scope="scope">
                    {{scope.row.name_cn}}
                </template>
            </el-table-column>
            <el-table-column label="name_en" align="center">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Options">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row)">Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handlePermission(scope.row)">Permission
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
        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="list.per_page"
                layout="prev, pager, next"
                :total="list.total">
        </el-pagination>
        <el-dialog title="Add" :visible.sync="dialogAdd" size="small">
            <el-form :model="addForm" label-width="80px" label-position="left">
                <el-form-item label="name_cn" :required="true">
                    <el-input v-model="addForm.name_cn" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="name_en" :required="true">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='addForm.loadingSave' size="mini"
                           @click="saveAddRole(addForm.name_cn,addForm.name)">Sure
                </el-button>
                <el-button @click="dialogAdd = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Edit" :visible.sync="dialogEdit" size="small">
            <el-form :model="editForm" label-width="80px" label-position="left">
                <el-form-item label="name_cn" :required="true">
                    <el-input v-model="editForm.name_cn" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="name_en" :required="true">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='editForm.loadingSave' size="mini"
                           @click="saveEditRole(editForm.id,editForm.name_cn,editForm.name)">Sure
                </el-button>
                <el-button @click="dialogEdit = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Permission" :visible.sync="dialogPermission" size="small" >
            <el-tabs type="border-card">
                <el-checkbox v-model="checked" @change="checkedAll"/>全选
                <div v-if="parent">
                    <el-tree
                            :data="data"
                            ref="data"
                            show-checkbox
                            node-key="id"
                            check-strictly
                            default-expand-all
                            @node-expand="expand"
                            :default-checked-keys="permission"
                            :props="defaultProps"
                            @check-change="handleCheckChange">
                    </el-tree>
                </div>
                <div v-else>
                    <el-tree
                            :data="data"
                            ref="data"
                            show-checkbox
                            node-key="id"
                            default-expand-all
                            @node-expand="expand"
                            :default-checked-keys="permission"
                            :props="defaultProps"
                            @check-change="handleCheckChange">
                    </el-tree>
                </div>
            </el-tabs>
            <!--<el-tabs type="border-card">-->
            <!--&lt;!&ndash;此处添加v-if使得组件重新渲染，因为此树形组件selectKeys没有实现双向绑定&ndash;&gt;-->
            <!--<el-tab-pane v-for="(menu, index) in theModel" :key="index" :label="menu.menuName" v-if="dialogEdit">-->
            <!--<menutreeedit :model="menu" :menuList="menu" :label="index" :selectKeys="editForm.selectKeys"-->
            <!--@getkeys="getAllNodeId"></menutreeedit>-->
            <!--</el-tab-pane>-->
            <!--</el-tabs>-->
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini"
                           @click="saveEditPermission()">Sure
                </el-button>
                <el-button @click="dialogPermission = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>
<script>
    import {
        role_lists,
        role_create,
        role_update,
        role_destroy,
        role_permission,
        role_assignPermission
    } from '@/api/role_manage';
    export default {
        name:"Set-role_Role",
        data() {
            return {
                list: [],
                total: null,
                pageSize:10,
                currentPage: 1,
                dialogAdd: false,
                dialogEdit: false,
                checked:false,
                dialogPermission:false,
                queryList:{
                    'page':'1',
                },
                addForm: {
                    loadingSave: false,
                    name_cn: '',
                    name: '',
                },
                editForm: {
                    loadingSave: false,
                    name_cn: '',
                    name: '',
                },
                permissionid:'',
                permission:[],
                permissions:[],
                data: [],
                defaultProps: {
                    children: '_child',
                    label: 'english_name'
                },
                parent:true
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route (to, from) {
                if(to.name=='Set-role_Role'){
                    this.fetchData()
                }
            }
        },
        methods: {
            fetchData() {
                role_lists(this.queryList).then(res => {
                    console.log(res.data)
                    this.list = res.data
                    // this.total = res.data.total;
                    // this.pageSize = res.data.per_page;
                })
            },
            expand(){
                this.parent=false
            },
            checkedAll(){
                if (this.checked) {
                    this.parent=false
                    //全选
                    this.$refs.data.setCheckedNodes(this.data);
                }else{
                    this.parent=false
                    //取消选中
                    this.$refs.data.setCheckedKeys([]);
                    this.permission=[]
                }
            },
            handleAdd() {
                this.dialogAdd = true
            },
            saveAddRole(name_cn, name) {
                this.addForm.loadingSave = true;
                role_create(name_cn, name).then(res => {
                    this.addForm.loadingSave = false;
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.dialogAdd = false
                        if (this.currentPage === 1) {
                            this.fetchData();
                        } else {
                            this.currentPage = 1;
                        }
                    }
                })
                this.addForm = {
                    name_cn: '',
                    name: ''
                }
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm.id = row.id;
                this.editForm.name = row.name;
                this.editForm.name_cn = row.name_cn;
            },
            saveEditRole(id, name_cn, name) {
                this.addForm.loadingSave = true;
                role_update(id, name_cn, name).then(res => {
                    this.dialogEdit = false
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.addForm.loadingSave = false;
                        this.fetchData();
                    }
                })
            },
            handlePermission(row) {
                let that=this
                that.dialogPermission = true;
                that.permissionid=row.id
                that.permission=[]
                role_permission(row).then(res => {
                    res.data.forEach(function(items,index){
                        if(items._child){
                            if(items.own=="checked"){
                                that.permission.push(items.id)
                                that.permissions.push(items.id)
                            }
                            items._child.forEach(function(m,n){
                                if(m._child){
                                    if(m.own=="checked"){
                                        that.permission.push(m.id)
                                        that.permissions.push(m.id)
                                    }
                                }else{
                                    if(m.own=="checked"){
                                        that.permission.push(m.id)
                                        that.permissions.push(m.id)
                                    }
                                }
                            })
                        }else{
                            if(items.own=="checked"){
                                that.permission.push(items.id)
                                that.permissions.push(items.id)
                            }
                        }
                    })
                    that.data = res.data;
                })
            },
            handleCheckChange(data, checked, indeterminate) {
                let that=this
                if(checked){
                    that.permissions.push(data.id)
                }else{
                    that.permissions.forEach(function(items,index){
                        if(items==data.id){
                            that.permissions.splice(index,1)
                        }
                    })
                }
                that.permissions=unique1(that.permissions)
            },
            saveEditPermission(){
                var permissions=unique1(this.permissions)
                role_assignPermission(this.permissionid,permissions).then(res => {
                    this.dialogPermission = false
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.fetchData();
                    }
                })
            },
            handleDel(row) {
                const h = this.$createElement;
                this.$msgbox({
                    message: h('p', null, [
                        h('span', null, '确定要执行此操作吗？ ')
                    ]),
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            role_destroy([row.id]).then(res => {
                                instance.confirmButtonLoading = false;
                                instance.confirmButtonText = '确定';
                                if (res && res.code == 0) {
                                    this.$message({
                                        message: 'success',
                                        type: 'success'
                                    });
                                    done();
                                    if (this.currentPage === 1) {
                                        this.fetchData();
                                    } else {
                                        this.currentPage = 1;
                                    }
                                }
                            })
                        }
                        if (action === 'cancel') {
                            done();
                        }
                    }
                })
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            }
        },
    };
    function unique1(arr){
        var hash=[];
        for (var i = 0; i < arr.length; i++) {
            if(hash.indexOf(arr[i])==-1){
                hash.push(arr[i]);
            }
        }
        return hash;
    }
</script>


