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
            <el-table-column label="type" align="center">
                <template slot-scope="scope">
                    {{scope.row.value.type}}
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
            <el-form :model="addForm" label-width="80px" label-position="right">
                <el-form-item label="name" :required="true">
                    <el-input v-model="addForm.value.name"></el-input>
                </el-form-item>
                <el-form-item label="name_cn" :required="true">
                    <el-input v-model="addForm.value.name_cn"></el-input>
                </el-form-item>
                <el-form-item label="value" :required="true">
                    <el-input v-model="addForm.index"></el-input>
                </el-form-item>
                <el-form-item label="type">
                    <template>
                        <el-select v-model="addForm.value.type" placeholder="请选择">
                            <el-option
                                    v-for="item in list.types"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="status">
                    <template>
                        <el-radio v-model="addForm.status" label="0">禁用</el-radio>
                        <el-radio v-model="addForm.status" label="1">启用</el-radio>
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
        <el-dialog title="Edit" :visible.sync="dialogEdit" size="small">
            <el-form :model="editForm" label-width="80px" label-position="right">
                <el-form-item label="name" :required="true">
                    <el-input v-model="editForm.value.name"></el-input>
                </el-form-item>
                <el-form-item label="name_cn" :required="true">
                    <el-input v-model="editForm.value.name_cn"></el-input>
                </el-form-item>
                <el-form-item label="value" :required="true">
                    <el-input v-model="editForm.index"></el-input>
                </el-form-item>
                <el-form-item label="type">
                    <template>
                        <el-select v-model="editForm.value.type" placeholder="请选择">
                            <el-option
                                    v-for="item in list.types"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="status">
                    <el-radio-group v-model="editForm.status">
                        <el-radio :label="0">禁用</el-radio>
                        <el-radio :label="1">启用</el-radio>
                    </el-radio-group>
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
        lists,
        create,
        update,
        destroy,
    } from '@/api/Enum';

    export default {
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                key: 'ProcurementWarehouse',
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
                        type: ''
                    },
                    status: '1'
                },
                addForm_loadingSave: false,
                dialogEdit: false,
                editForm: {
                    id: '',
                    value: {
                        name: '',
                        name_cn: '',
                        type: ''
                    },
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
                        type: ''
                    },
                    status: '1'
                }
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm.id = row.id;
                this.editForm.value = JSON.parse(JSON.stringify(row.value));
                this.editForm.index = row.index;
                this.editForm.status = row.status;
            },
            saveEdit() {
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


