
<template>
    <d2-container>
        <el-row style="margin: 10px 30px;">
            <el-col  :span="2">
                <el-button type="primary" size="mini" name="add" @click="add">{{$t('add')}}</el-button>
            </el-col>
            <el-col class="d2-text-right" :span="22">
                <el-input
                        v-model="queryList.cas"
                        placeholder="cas"
                        size="mini"
                        clearable
                        style="width: 120px;margin: 0 2px;"
                ></el-input>
                <el-input
                        v-model="queryList.name"
                        placeholder="名称"
                        size="mini"
                        clearable
                        style="width: 200px;margin: 0 2px;"
                ></el-input>
                <el-select v-model="queryList.grade" placeholder="等级" size="mini" clearable style="width:120px;margin: 0 2px;">
                    <el-option
                            v-for="item in enums.grade"
                            :key="item"
                            :label="item"
                            :value="item"
                    ></el-option>
                </el-select>
                <el-button
                        type="primary"
                        size="mini"
                        @click="search"
                        :loading="search_loading"
                >{{$t('set.market.searchButton')}}</el-button>
                <el-upload
                        :loading="loading_file"
                        :headers=headers
                        style="display: inline-block;"
                        class="upload-demo d2-ml-5"
                        :action=upload_api
                        :before-remove="beforeRemove"
                        :show-file-list="false"
                        :limit="1"
                        :on-progress="handleAvatarprogress"
                        :on-success="handleAvatarSuccess"
                        :file-list="fileList">
                    <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
                </el-upload>
            </el-col>
        </el-row>
        <!-- 页面 -->

        <el-table v-loading="loading"  style="font-size: 12px" :data="list.data" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column label="CAS">
                <template slot-scope="scope">{{scope.row.cas}}</template>
            </el-table-column>
            <el-table-column label="产品名称" width="300">
                <template slot-scope="scope">{{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="原因">
                <template slot-scope="scope">
                    {{scope.row.reason}}
                </template>
            </el-table-column>
            <el-table-column label="等级">
                <template slot-scope="scope">
                    {{scope.row.grade}}
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope">
                    {{scope.row.note}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="edit(scope.row)"
                    >编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handle_delete(scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->

        <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="list.per_page"
                layout="prev, pager, next"
                :total="list.total"
        ></el-pagination>

        <el-dialog
                title="新增"
                :visible.sync="dialogAdd"
                width="50%"
        >
            <el-form :model="addForm" label-width="80px" label-position="right">
                <el-form-item label="CAS" :required="true">
                    <el-input v-model="addForm.cas"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" :required="true">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="原因" :required="true">
                    <el-input v-model="addForm.reason"></el-input>
                </el-form-item>
                <el-form-item label="等级" :required="true">
                    <el-select v-model="addForm.grade" placeholder="等级" size="mini" clearable style="width:100%;">
                        <el-option
                                v-for="item in enums.grade"
                                :key="item"
                                :label="item"
                                :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :required="true">
                    <el-input v-model="addForm.note"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" :loading='addForm_loadingSave' size="mini"
                           @click="saveAdd()">Sure
                </el-button>
                <el-button @click="dialogAdd = false" size="mini">Cancel</el-button>
            </div>
        </el-dialog>
        <el-dialog
                title="编辑"
                :visible.sync="dialogEdit"
                width="50%"
        >
            <el-form :model="editForm" label-width="80px" label-position="right">
                <el-form-item label="CAS" :required="true">
                    <el-input v-model="editForm.cas"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" :required="true">
                    <el-input v-model="editForm.name"></el-input>
                </el-form-item>
                <el-form-item label="原因" :required="true">
                    <el-input v-model="editForm.reason"></el-input>
                </el-form-item>
                <el-form-item label="等级" :required="true">
                    <el-select v-model="editForm.grade" placeholder="等级" size="mini" clearable style="width:100%;">
                        <el-option
                                v-for="item in enums.grade"
                                :key="item"
                                :label="item"
                                :value="item"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :required="true">
                    <el-input v-model="editForm.note"></el-input>
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
    import util from '@/libs/util'
    import axios from "axios";
    import request from "@/plugin/axios";
    import $ from "jquery";
    import { lists, listTotal,prod_grade, prod_instore ,prod_instore_update ,destroy} from "@/api/prod";
    export default {
        name: "Prod-prod_category",
        data() {
            return {
                permissions :JSON.parse(localStorage.getItem('permissions')),
                list: [],
                fileList: [],
                currentPage: 1,
                queryList: {
                    page: "1",
                    cas:'',
                    name: "",
                    grade: ""
                },
                search_loading:false,
                dialogAdd:false,
                dialogEdit:false,
                addForm_loadingSave:false,
                editForm_loadingSave:false,
                addForm:{
                    cas:'',
                    name:'',
                    grade:'',
                    reason:'',
                    note:''
                },
                editForm:{
                    id:'',
                    cas:'',
                    name:'',
                    grade:'',
                    reason:'',
                    note:''
                },
                loading_file:false,
                loading:false,
                enums:{},
                upload_api: process.env.VUE_APP_API + 'api/v1/prod/grade/import',
            };
        },
        watch: {
            $route (to, from) {
                if(to.name=='Prod-prod_category'){
                    this.fetchData()
                }
            }
        },
        created() {
            this.fetchData();
        },
        computed: {
            headers() {
                const token = util.cookies.get('token')
                return {
                    'Authorization': 'Bearer ' + token,
                    'Version-Number':process.env.VUE_APP_Version
                }
            }
        },
        methods: {
            fetchData() {
                prod_grade(this.queryList).then(res => {
                    this.list = res.data;
                    this.enums=res.enum;
                    this.search_loading = false
                });
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            add(){
                this.dialogAdd=true
            },
            saveAdd(){
                prod_instore(this.addForm,this)
            },
            edit(item){
                this.dialogEdit=true
                this.editForm={
                    id:item.id,
                    cas:item.cas,
                    name:item.name,
                    grade:item.grade,
                    reason:item.reason,
                    note:item.note
                }
            },
            saveEdit(){
                prod_instore_update(this.editForm,this)
            },
            handle_delete(item){
                destroy(item,'prod/grade','destory',this)
            },
            handleAvatarprogress(){
                this.loading=true
            },
            handleAvatarSuccess(res, file, fileList) {
                this.loading=false
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.fileList = []
                    this.fetchData()
                } else {
                    this.$message.error(file.response.msg)
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            search(){
                this.search_loading=true
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            }
        }
    };
</script>