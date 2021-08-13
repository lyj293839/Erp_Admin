<style lang="scss" scoped type="text/scss">
    .add {
        margin-bottom: 10px;
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
                v-if="permissions.indexOf(304)>-1"
                @click="handleAdd" icon="plus">ADD
        </el-button>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="small">
            <el-table-column align="center" label='id' width="50">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='排序' width="50">
                <template slot-scope="scope">
                    {{scope.row.rank}}
                </template>
            </el-table-column>
            <el-table-column label="支付平台" align="center" width="80">
                <template slot-scope="scope">
                    {{getEnumValue(enums.vendor,scope.row.vendor)}}
                </template>
            </el-table-column>
            <el-table-column label="账户" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.account}}
                </template>
            </el-table-column>
            <el-table-column label="账户名称" align="center" width="260">
                <template slot-scope="scope">
                    {{scope.row.account_name}}
                </template>
            </el-table-column>
            <el-table-column label="货币" align="center" width="50">
                <template slot-scope="scope">
                    {{scope.row.currency}}
                </template>
            </el-table-column>
            <el-table-column label="银行" align="center" width="80">
                <template slot-scope="scope">
                    {{scope.row.account_bank}}
                </template>
            </el-table-column>
            <el-table-column label="开户名称" align="center" width="160">
                <template slot-scope="scope">
                    {{scope.row.account_bank_name}}
                </template>
            </el-table-column>
            <el-table-column label="开户行号" align="center" width="80">
                <template slot-scope="scope">
                    {{scope.row.account_bank_no}}
                </template>
            </el-table-column>
            <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                    {{scope.row.note}}
                </template>
            </el-table-column>
            <el-table-column label="应用ID" align="center">
                <template slot-scope="scope">
                    {{scope.row.app_id}}
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center"  width="50">
                <template slot-scope="scope">
                    {{scope.row.status==1?'启用':'禁用'}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Options">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permission_names['account.save']=='account.save'"
                                @click="handleEdit(scope.row)">Edit
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
                layout="total,sizes,prev, pager, next"
                :page-sizes="[10,20,50,100]"
                @size-change="handleSizeChange"
                :total="list.total">
        </el-pagination>

        <el-dialog title="Add" :visible.sync="dialogAdd" size="small" >
            <el-form :model="addForm" label-width="100px" label-position="right">
                <el-form-item label="支付平台" :required="true">
                    <el-select v-model="addForm.vendor"  placeholder="支付平台" size="mini" clearable style="width:100%;">
                        <el-option
                                v-for="item in enums.vendor"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="账户" :required="true">
                    <el-input v-model="addForm.account"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.vendor===4" label="账户名称" :required="true">
                    <el-input v-model="addForm.account_name"></el-input>
                </el-form-item>
                <el-form-item  v-if="addForm.vendor===4" label="银行" :required="true">
                    <el-input v-model="addForm.account_bank"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.vendor===4" label="开户行号" :required="true">
                    <el-input v-model="addForm.account_bank_no"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.vendor===4" label="开户名称" :required="true">
                    <el-input v-model="addForm.account_bank_name"></el-input>
                </el-form-item>
                <el-form-item label="货币" :required="true">
                    <el-input v-model="addForm.currency"></el-input>
                </el-form-item>
                <el-form-item label="rank" :required="true">
                    <el-input v-model="addForm.rank"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.vendor!==4&&addForm.vendor!=''" label="应用ID">
                    <el-input v-model="addForm.app_id"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.vendor!==4&&addForm.vendor!=''" label="private_key" >
                    <el-input  type="textarea" :rows="4" v-model="addForm.private_key"></el-input>
                </el-form-item>
                <el-form-item v-if="addForm.vendor!==4&&addForm.vendor!=''" label="public_key" >
                    <el-input type="textarea" :rows="4" v-model="addForm.public_key"></el-input>
                </el-form-item>
                <el-form-item  label="note" >
                    <el-input type="textarea" :rows="4" v-model="addForm.note"></el-input>
                </el-form-item>
                <el-form-item label="状态" :required="true">
                    <template>
                        <el-switch
                                v-model="addForm.status"
                                active-text="启用"
                                inactive-text="禁用"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='addForm_loadingSave' size="mini"
                           @click="saveAdd()">Sure
                </el-button>
                <el-button @click="dialogAdd = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Edit" :visible.sync="dialogEdit" size="small" >
            <el-form :model="addForm" label-width="100px" label-position="right">
                <el-form-item label="支付平台" :required="true">
                    <el-select v-model="editForm.vendor"  placeholder="支付平台" size="mini" clearable style="width:100%;">
                        <el-option
                                v-for="item in enums.vendor"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="账户" :required="true">
                    <el-input v-model="editForm.account"></el-input>
                </el-form-item>
                <el-form-item  label="账户名称" :required="true">
                    <el-input v-model="editForm.account_name"></el-input>
                </el-form-item>
                <el-form-item  label="货币" :required="true">
                    <el-input v-model="editForm.currency"></el-input>
                </el-form-item>
                <el-form-item  label="rank" :required="true">
                    <el-input v-model="editForm.rank"></el-input>
                </el-form-item>
                <el-form-item  v-if="editForm.vendor===4" label="银行" :required="true">
                    <el-input v-model="editForm.account_bank"></el-input>
                </el-form-item>
                <el-form-item v-if="editForm.vendor===4" label="开户行号" :required="true">
                    <el-input v-model="editForm.account_bank_no"></el-input>
                </el-form-item>
                <el-form-item v-if="editForm.vendor===4" label="开户名称" :required="true">
                    <el-input v-model="editForm.account_bank_name"></el-input>
                </el-form-item>
                <el-form-item v-if="editForm.vendor!==4&&editForm.vendor!=''" label="应用ID" >
                    <el-input v-model="editForm.app_id"></el-input>
                </el-form-item>
                <el-form-item v-if="editForm.vendor!==4&&editForm.vendor!=''" label="private_key" >
                    <el-input type="textarea" :rows="4" v-model="editForm.private_key"></el-input>
                </el-form-item>
                <el-form-item v-if="editForm.vendor!==4&&editForm.vendor!=''" label="public_key" >
                    <el-input type="textarea" :rows="4" v-model="editForm.public_key"></el-input>
                </el-form-item>
                <el-form-item  label="note">
                    <el-input type="textarea" :rows="4" v-model="editForm.note"></el-input>
                </el-form-item>
                <el-form-item label="状态" :required="true">
                    <template>
                        <el-switch
                                v-model="editForm.status"
                                active-text="启用"
                                inactive-text="禁用"
                                active-value="1"
                                inactive-value="0">
                        </el-switch>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='editForm_loadingSave' size="mini"
                           @click="saveEdit()">Sure
                </el-button>
                <el-button @click="dialogEdit = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>
<script>
    import {
        account,
        payment_save,
    } from '@/api/commission';
    export default {
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                list: [],
                currentPage: 1,
                queryList:{
                    'page':'1',
                    'per_page':'50'
                },
                dialogAdd: false,
                addForm: {
                    vendor:'',
                    account:'',
                    rank:'',
                    currency:'',
                    account_name:'',
                    account_bank:'',
                    account_bank_no:'',
                    account_bank_name:'',
                    app_id:'',
                    private_key:'',
                    public_key:'',
                    status:'1',
                    note:''
                },
                addForm_loadingSave: false,
                dialogEdit: false,
                editForm: {
                    id: '',
                    vendor:'',
                    rank:'',
                    account:'',
                    currency:'',
                    account_name:'',
                    account_bank:'',
                    account_bank_no:'',
                    account_bank_name:'',
                    app_id:'',
                    private_key:'',
                    public_key:'',
                    status:'1',
                    note:''
                },
                editForm_loadingSave: false,
                enums:{}
            }
        },
        created() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                account(this.queryList).then(res => {
                    this.list = res.data;
                    this.enums=res.enum
                })
            },
            handleAdd() {
                this.dialogAdd = true
            },
            saveAdd() {
                payment_save(this.addForm,this,'add');
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm.id = row.id;
                this.editForm.rank = row.rank;

                this.editForm.currency = row.currency;
                this.editForm.vendor = Number(row.vendor);
                this.editForm.account = row.account;
                this.editForm.account_name = row.account_name;
                this.editForm.account_bank = row.account_bank;
                this.editForm.account_bank_no = row.account_bank_no;
                this.editForm.account_bank_name = row.account_bank_name;
                this.editForm.app_id = row.app_id;
                this.editForm.private_key = row.private_key;
                this.editForm.public_key = row.public_key;
                this.editForm.status = String(row.status);
                this.editForm.note = row.note;
            },
            saveEdit() {
                payment_save(this.editForm,this,'edit');
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleSizeChange(val) {
                this.queryList.per_page = val;
                this.fetchData();
            },
        },
    };
</script>


