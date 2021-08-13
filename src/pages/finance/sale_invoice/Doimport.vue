
<template>
<d2-container>
    <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
            <el-col :span="6">
                <!-- <el-form-item label="下载模版:">
                    <a :href="upload" style="color:rgb(0, 0, 238);">模版文件</a>
                </el-form-item> -->
                 <el-form-item label="类型：">
                    <el-radio-group v-model="form.cover">
                        <el-radio :label="0">专票|普票</el-radio>
                        <el-radio :label="1">电子发票</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传文件:" :required="true">
                    <el-upload
                            style="display: inline-block;"
                            class="upload-demo"
                            ref="upload"
                            :action=upload_api
                            :data='form'
                            :headers=headers
                            :before-remove="beforeRemove"
                            multiple
                            accept=".xlsx"
                            :limit="1"
                            :on-success="handleAvatarSuccess"
                            :auto-upload="false"
                            :file-list="fileList">
                        <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" size="mini">提交</el-button>
                    <el-button @click="black()" size="mini">返回</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="18">
                    <el-table  :data="list.data" element-loading-text="Loading" border fit highlight-current-row>
                        <el-table-column align="center" label='id' width="80">
                            <template slot-scope="scope">
                                {{scope.row.id}}
                            </template>
                        </el-table-column>
                        <el-table-column label="操作人" align="center"  width="90">
                            <template slot-scope="scope">
                                {{scope.row.username?scope.row.username.username:''}}
                            </template>
                        </el-table-column>
                        <el-table-column label="原始文件" align="center">
                            <template slot-scope="scope">
                                {{scope.row.origin}}
                            </template>
                        </el-table-column>
                        <el-table-column label="创建时间" align="center"  width="100">
                            <template slot-scope="scope">
                                <el-tooltip class="item" effect="dark" :content="scope.row.created_at" placement="top-start">
                                    <span>{{scope.row.created_at?scope.row.created_at.substring(0,10):''}}</span>
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="备注" align="center">
                            <template slot-scope="scope">
                                {{scope.row.remark}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center"  width="100">
                            <template slot="header" slot-scope="scope">
                                <el-button type="primary" size="mini" :loading='loading' @click="uploading()">刷新</el-button>
                            </template>
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" v-if="scope.row.result_url">
                                    <a :href="scope.row.result_url" target="_blank" style="color: white;">Download</a>
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                            style="text-align: right;margin: 10px 0 0;"
                            background
                            @current-change="handleCurrentChange"
                            :current-page.sync="currentPage"
                            :page-size="list.per_page"
                            layout="prev, pager, next"
                            :total="list.total">
                    </el-pagination>
            </el-col>
        </el-row>
    </el-form>
</d2-container>
</template>

<script>
    import util from '@/libs/util'
    import {import_sales_list} from '@/api/finance'
    import { mapActions } from "vuex";
    export default {
        name:'finance-doimport',
        data() {
            return {
                form: {
                    cover: 0
                },
                currentPage: 1,
                queryList: {
                    'page': '1',
                },
                upload: process.env.VUE_APP_API + 'template/excel/prodspec.xlsx',
                upload_api: process.env.VUE_APP_API + 'api/v1/finance/sales_invoice/upload_sales',
                fileList: [],
                list: {},
                loading:false
            }
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
        created() {
            this.fetchData()
        },
        methods: {
            ...mapActions("d2admin/page", ["closeAdd"]),
            fetchData() {
                import_sales_list(this.queryList).then(res => {
                    if(this.loading){
                        this.$message.success('success')
                        this.loading = false
                    }
                    this.list = res.data
                }).catch(err=>{this.loading = false})
            },
            uploading(){
                this.loading = true
                this.fetchData()
            },
            onSubmit() {
                this.$refs.upload.submit()
            },
            black(){
                var that = this
                that.$router.push({
                    path: '/finance/sale_invoice',
                    name: 'finance-sale_invoice',
                })
                const tagName = "finance-doimport";
                that.closeAdd({ tagName });
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.form = {
                        cover: 0
                    }
                    this.fileList = []
                    import_sales_list(this.queryList).then(res => {
                        this.list = res.data
                    })
                } else {
                    this.$message.error(file.response.msg)
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            }
        }
    }
</script>
