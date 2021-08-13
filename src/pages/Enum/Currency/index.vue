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
            <el-table-column align="center" label='id'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="name" align="center">
                <template slot-scope="scope">
                    {{scope.row.value.name}}
                </template>
            </el-table-column>
            <el-table-column label="name_cn" align="center">
                <template slot-scope="scope">
                    {{scope.row.value.name_cn}}
                </template>
            </el-table-column>
            <el-table-column label="value" align="center">
                <template slot-scope="scope">
                    {{scope.row.index}}
                </template>
            </el-table-column>
            <el-table-column label="icon" align="center">
                <template slot-scope="scope">
                    {{scope.row.value.icon}}
                </template>
            </el-table-column>
            <el-table-column label="ratio" align="center">
                <template slot-scope="scope">
                    {{scope.row.value.ratio}}
                </template>
            </el-table-column>
            <el-table-column label="人民币折算率" align="center">
                <template slot-scope="scope">
                    {{scope.row.value.rmb_conversion_rate}}
                </template>
            </el-table-column>
            <el-table-column label="status" align="center">
                <template slot-scope="scope">
                    {{scope.row.status == 1 ? '启用' : '禁用'}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Options">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                v-if="permissions.indexOf(305)>-1"
                                @click="handleEdit(scope.row)">Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                v-if="permissions.indexOf(307)>-1"
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
                layout="total,sizes,prev, pager, next"
                :page-sizes="[15,20,50,100]"
                @size-change="handleSizeChange"
                :total="list.total">
        </el-pagination>
        <el-dialog title="Add" :visible.sync="dialogAdd" size="small">
            <el-form :model="addForm" label-width="100px" label-position="right">
                <el-form-item label="name" :required="true">
                    <el-input v-model="addForm.value.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="name_cn" :required="true">
                    <el-input v-model="addForm.value.name_cn"></el-input>
                </el-form-item>
                <el-form-item label="value" :required="true">
                    <el-input v-model="addForm.index"></el-input>
                </el-form-item>
                <el-form-item label="icon">
                    <el-input v-model="addForm.value.icon" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="ratio">
                    <el-input v-model="addForm.value.ratio" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="人民币折算率">
                    <el-input v-model="addForm.value.rmb_conversion_rate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期"> 
                    <el-date-picker v-model="addForm.value.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="status">
                    <template>
                        <el-radio v-model="addForm.status" label="0">禁用</el-radio>
                        <el-radio v-model="addForm.status" label="1">启用</el-radio>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" :loading='addForm_loadingSave'
                           @click="saveAdd(addForm.name,addForm.icon,addForm.status)">Sure
                </el-button>
                <el-button @click="dialogAdd = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Edit" :visible.sync="dialogEdit" size="small">
            <el-form :model="editForm" label-width="100px" label-position="right">
                <el-form-item label="name" :required="true">
                    <el-input v-model="editForm.value.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="name_cn" :required="true">
                    <el-input v-model="editForm.value.name_cn"></el-input>
                </el-form-item>
                <el-form-item label="value" :required="true">
                    <el-input v-model="editForm.index"></el-input>
                </el-form-item>
                <el-form-item label="icon">
                    <el-input v-model="editForm.value.icon" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="ratio">
                    <el-input v-model="editForm.value.ratio" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="人民币折算率">
                    <el-input v-model="editForm.value.rmb_conversion_rate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker v-model="editForm.value.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="status">
                    <el-radio-group v-model="editForm.status">
                        <el-radio :label="0">禁用</el-radio>
                        <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" :loading='editForm_loadingSave'
                           @click="saveEdit(editForm.id,editForm.name,editForm.icon,editForm.status)">Sure
                </el-button>
                <el-button @click="dialogEdit = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
    </d2-container>
</template>
<script>
    import {
        lists,
        create,
        update,
        destroy,
    } from '@/api/Enum';

    export default {
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                key: 'Currency',
                list: [],
                currentPage: 1,
                queryList: {
                    'page': '1',
                    per_page:''
                },
                dialogAdd: false,
                addForm: {
                    value: {
                        name: '',
                        name_cn: '',
                        icon: '',
                        ratio: '',
                        rmb_conversion_rate:'',
                        date:''
                    },
                    index: '',
                    status: '1'
                },
                addForm_loadingSave: false,
                dialogEdit: false,
                editForm: {
                    id: '',
                    value: {
                        name: '',
                        name_cn: '',
                        icon: '',
                        ratio: '',
                        rmb_conversion_rate:'',
                        date:''
                    },
                    index: '',
                    status: ''
                },
                editForm_loadingSave: false,
            }
        },
        created() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                lists(this.queryList, this.key).then(res => {
                    this.list = res.data;
                    this.list.per_page = parseInt(res.data.per_page)
                })
            },
            handleAdd() {
                this.dialogAdd = true
            },
            saveAdd() {
                create(this.addForm, this.key, this);
                this.addForm = {
                    value: {
                        name: '',
                        name_cn: '',
                        icon: '',
                        ratio: '',
                        rmb_conversion_rate:'',
                        date:''
                    },
                    index: '',
                }
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm.id = row.id;
                this.editForm.value = JSON.parse(JSON.stringify(row.value));
                this.editForm.index = row.index;
                this.editForm.status = row.status;
            },
            saveEdit(id, name, icon, status) {
                update(this.editForm, this.key, this);
            },
            handleDel(row) {
                destroy(row, this.key, this);
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


