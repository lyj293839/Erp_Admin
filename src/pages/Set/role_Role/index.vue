<style lang="scss" scoped type="text/scss">
    .add {
        margin-bottom: 10px;
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
                v-if="permissions_.indexOf(474)>-1"
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
                                v-if="permissions_.indexOf(475)>-1"
                                @click="handleEdit(scope.row)">Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permissions_.indexOf(477)>-1"
                                @click="handlePermission(scope.row)">Permission
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                v-if="permissions_.indexOf(476)>-1"
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
                :page-size="Number(list.per_page)"
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
                    <el-tree
                            :data="data"
                            ref="data"
                            check-strictly
                            @node-contextmenu="select_child"
                            show-checkbox
                            node-key="id"
                            :render-content="renderContent"
                            default-expand-all
                            :default-checked-keys="permission"
                            :props="defaultProps"
                            @check-change="handleCheckChange">
                    </el-tree>
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
                permissions_:JSON.parse(localStorage.getItem('permissions')),
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
                    per_page:100,
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
                permission_ids:[],
                data: [],
                defaultProps: {
                    children: '_child',
                    label: 'english_name'
                },
            }
        },
        watch: {
            $route (to, from) {
                if(to.name=='Set-role_Role'){
                    this.fetchData()
                    if(this.$i18n.locale=='cn'){
                        this.defaultProps={
                            children: '_child',
                            label: 'chinese_name'
                        }
                    }
                }
            }
        },
        created() {
            this.fetchData();
            if(this.$i18n.locale=='cn'){
                this.defaultProps={
                    children: '_child',
                    label: 'chinese_name'
                }
            }
        },

        methods: {
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
            changeCss() {
                var levelName = document.getElementsByClassName('levelname') // levelname是上面的最底层节点的名字
                for (var i = 0; i < levelName.length; i++) {
                    // cssFloat 兼容 ie6-8  styleFloat 兼容ie9及标准浏览器
                    levelName[i].parentNode.style.cssFloat = 'left' // 最底层的节点，包括多选框和名字都让他左浮动
                    levelName[i].parentNode.style.styleFloat = 'left'
                }
            },
            fetchData() {
                role_lists(this.queryList).then(res => {
                    this.list = res.data
                    // this.total = res.data.total;
                    // this.pageSize = res.data.per_page;
                })
            },
            checkedAll(){
                if (this.checked) {
                    //全选
                    this.$refs.data.setCheckedKeys(this.permission_ids);
                }else{
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
                // that.dialogPermission = true;
                that.permissionid=row.id
                that.permission=[]
                role_permission(row).then(res => {
                    if(res.data.permission_ids.sort().toString()==res.data.checked_permission_ids.sort().toString()){
                        this.checked=true
                    }else{
                        this.checked=false
                    }
                    that.permissions=res.data.checked_permission_ids
                    that.permission=res.data.checked_permission_ids
                    that.data = res.data.permissions;
                    that.permission_ids=res.data.permission_ids
                    that.dialogPermission = true;
                    setTimeout(()=>{
                        this.changeCss()
                    },1000)
                })
            },
            handleCheckChange(data, checked, indeterminate) {
                console.log(data.id)
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
                // that.permissions=unique1(that.permissions)
            },
            saveEditPermission(){
                var permissions=unique1(this.permissions)
                role_assignPermission(this.permissionid,permissions).then(res => {
                    if (res && res.code == 0) {
                        this.dialogPermission = false
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.fetchData();
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
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


