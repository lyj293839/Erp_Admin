<style lang="scss" scoped type="text/scss">
    .add {
        margin-bottom: 9px;
    }
</style>
<template>
    <d2-container>
        <el-button
                class="add"
                size="mini"
                type="primary"
                @click="handleAdd"
                v-if="permissions.indexOf(410)>-1">Add
        </el-button>

        <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="mini">
            <el-table-column align="center" :label="$t('Inquery.SalerAllocList.SalerAllocList1')"><!-- 销售人员 -->
                <template slot-scope="scope">
                    {{attr(scope.row,'saler.username')}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('Inquery.SalerAllocList.SalerAllocList2')" align="center" ><!-- 国内询单 -->
                <template slot-scope="scope" >
                    <div :style="{color:(scope.row.is_china==1?'red':'')}">{{scope.row.is_china==1?$t('Inquery.SalerAllocList.SalerAllocList5'):$t('Inquery.SalerAllocList.SalerAllocList6')}}</div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('Inquery.SalerAllocList.SalerAllocList3')" align="center"><!-- 分配数量 -->
                <template slot-scope="scope">
                    {{scope.row.alloc_num}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('Inquery.SalerAllocList.SalerAllocList4')" align="center"><!-- 排序 -->
                <template slot-scope="scope">
                    {{scope.row.sort}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="Options">
                <template slot-scope="scope">
                    <template>
                        <el-button
                                size="mini"
                                type="primary"
                                @click="handleEdit(scope.row)"
                                v-if="permissions.indexOf(411)>-1"
                        >Edit
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                v-if="permissions.indexOf(413)>-1"
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
                layout="prev, pager, next"
                :page-size="list.per_page"
                :total="list.total"
        style="margin-top: 10px;">
        </el-pagination>

        <el-dialog title="Add" :visible.sync="dialogAdd" size="small" width="30%" >
            <el-form :model="addForm" :label-width="$i18n.locale=='cn'?'80px':'190px'" label-position="left" style="width: 300px;margin: 0 auto;">
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList1')" :required="true"><!-- 销售人员 -->
                    <el-select v-model="addForm.sale_id"  clearable filterable size="mini" style="width: 150px;margin: 0 10px;"
                               placeholder="">
                        <el-option
                                v-for="i in sales"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList2')" :required="true"><!-- 国内询单 -->
                    <el-select v-model="addForm.is_china"  clearable filterable size="mini" style="width: 150px;margin: 0 10px;"
                               placeholder="">
                        <el-option
                                v-for="i in type"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList3')" :required="true"><!-- 分配数量 -->
                    <el-input v-model="addForm.alloc_num" size="mini" style="width: 150px;margin: 0 10px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList4')" :required="true"><!-- 排序 -->
                    <el-input v-model="addForm.sort" size="mini" style="width: 150px;margin: 0 10px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='loading' size="mini"
                           @click="saveAdd()">Save
                </el-button>
                <el-button @click="dialogAdd = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog title="Edit" :visible.sync="dialogEdit" size="small" width="30%" >
            <el-form :model="editForm" :label-width="$i18n.locale=='cn'?'80px':'190px'" label-position="left" style="width: 300px;margin: 0 auto;">
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList1')"><!-- 销售人员 -->
                    <el-select v-model="editForm.sale_id"  clearable filterable size="mini" style="width: 150px;margin: 0 10px;"
                               placeholder="">
                        <el-option
                                v-for="i in sales"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList2')"><!-- 国内询单 -->
                    <el-select v-model="editForm.is_china"  clearable filterable size="mini" style="width: 150px;margin: 0 10px;"
                               placeholder="">
                        <el-option
                                v-for="i in type"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList3')"><!-- 分配数量 -->
                    <el-input v-model="editForm.alloc_num" size="mini" style="width: 150px;margin: 0 10px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('Inquery.SalerAllocList.SalerAllocList4')"><!-- 排序 -->
                    <el-input v-model="editForm.sort" size="mini" style="width: 150px;margin: 0 10px;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='loading'
                           @click="saveEdit()" size="mini">Save
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
        destroy_SalerAllocList,
        sales_lists
    } from '@/api/Inquery';
    export default {
        name: "Inquery-SalerAllocList",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                list: [],
                currentPage: 1,
                queryList:{
                    'page':'1',
                },
                dialogAdd: false,
                addForm: {
                    sale_id: '',
                    is_china: '',
                    alloc_num: '',
                    sort:''
                },
                dialogEdit: false,
                editForm: {
                    id: '',
                    sale_id: '',
                    is_china: '',
                    alloc_num: '',
                    sort:''
                },
                sales:[],
                type:[{
                    id:1,
                    name:'国内询单'
                },{
                    id:0,
                    name:'国外询单'
                }],
                loading: false,
            }
        },
        created() {
            this.fetchData();
        },
        watch: {
            $route (to, from) {
                if(to.name=='Inquery-SalerAllocList'){
                    this.fetchData()
                }
            }
        },
        methods: {
            fetchData() {
                lists(this.queryList,'SalerAllocList').then(res => {
                    this.list = res.data;
                })
                sales_lists().then(res=>{
                    this.sales=res.data
                })
            },
            handleAdd() {
                this.dialogAdd = true
            },
            saveAdd() {
                create(this.addForm,'SalerAllocList',this);
                this.addForm = {
                    sale_id: '',
                    is_china: '',
                    alloc_num: '',
                    sort:''
                }
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm.id = row.id;
                this.editForm.sale_id = row.sale_id;
                this.editForm.is_china = row.is_china;
                this.editForm.alloc_num = row.alloc_num;
                this.editForm.sort = row.sort;
            },
            saveEdit() {
                update(this.editForm,'SalerAllocList',this);
            },
            handleDel(row) {
                destroy_SalerAllocList(row.id,this);
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            }
        },
    };
</script>


