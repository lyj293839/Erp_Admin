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
        <el-date-picker v-model="queryList.date" size="mini" class="ml10" value-format="yyyyMM" type="month" placeholder="选择日期"></el-date-picker>
        <el-button type="primary" size="mini" :loading="loading_search" class="ml10" @click="search">Search</el-button>
        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="small">
            <el-table-column align="center" label='id'>
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="date" align="center">
                <template slot-scope="scope">
                    {{scope.row.date}}
                </template>
            </el-table-column>
            <el-table-column label="cny" align="center">
                <template slot-scope="scope">
                    {{scope.row.cny}}
                </template>
            </el-table-column>
            <el-table-column label="usd" align="center">
                <template slot-scope="scope">
                    {{scope.row.usd}}
                </template>
            </el-table-column>
            <el-table-column label="euro" align="center">
                <template slot-scope="scope">
                    {{scope.row.euro}}
                </template>
            </el-table-column>
            <el-table-column label="hk" align="center">
                <template slot-scope="scope">
                    {{scope.row.hk}}
                </template>
            </el-table-column>
            <el-table-column label="username" align="center">
                <template slot-scope="scope">
                    {{scope.row.username}}
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
                <el-form-item label="date">
                    <el-date-picker v-model="addForm.date" value-format="yyyyMM" type="month" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="cny">
                    <el-input v-model="addForm.cny" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="usd">
                    <el-input v-model="addForm.usd" placeholder="填入数字汇率"></el-input>
                </el-form-item>
                <el-form-item label="euro">
                    <el-input v-model="addForm.euro" placeholder="填入数字汇率"></el-input>
                </el-form-item>
                <el-form-item label="hk">
                    <el-input v-model="addForm.hk" placeholder="填入数字汇率"></el-input>
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
                <el-form-item label="date">
                    <el-date-picker v-model="editForm.date"  value-format="yyyyMM" type="month" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="cny">
                    <el-input v-model="editForm.cny" disabled auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="usd">
                    <el-input v-model="editForm.usd" placeholder="填入数字汇率"></el-input>
                </el-form-item>
                <el-form-item label="euro">
                    <el-input v-model="editForm.euro" placeholder="填入数字汇率"></el-input>
                </el-form-item>
                <el-form-item label="hk">
                    <el-input v-model="editForm.hk" placeholder="填入数字汇率"></el-input>
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
        exchange_rate,
        exchange_rate_create,
        exchange_rate_update,
    } from '@/api/Enum';

    export default {
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                list: [],
                currentPage: 1,
                queryList: {
                    'page': '1',
                    per_page:'',
                    date:''
                },
                dialogAdd: false,
                addForm: {
                    cny:1,
                    usd:'',
                    euro:'',
                    hk:'',
                    date:'',
                },
                addForm_loadingSave: false,
                dialogEdit: false,
                editForm: {
                    id: '',
                    cny:1,
                    usd:'',
                    euro:'',
                    hk:'',
                    date:'',
                },
                editForm_loadingSave: false,
                loading_search:false
            }
        },
        created() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                this.loading_search=true
                exchange_rate(this.queryList).then(res => {
                    this.list = res.data;
                    this.list.per_page = parseInt(res.data.per_page)
                    this.loading_search=false
                })
            },
            search(){
                this.fetchData();
            },
            handleAdd() {
                this.dialogAdd = true
            },
            saveAdd() {
                exchange_rate_create(this.addForm,this);
                this.addForm = {
                    cny:'',
                    usd:'',
                    euro:'',
                    hk:'',
                    date:'',
                }
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm={
                        id: row.id,
                        cny:row.cny,
                        usd:row.usd,
                        euro:row.euro,
                        hk:row.hk,
                        date:row.date,
                }
            },
            saveEdit(id, name, icon, status) {
                exchange_rate_update(this.editForm, this);
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
<style>
    .ml10{
        margin-left: 10px;
    }
</style>


