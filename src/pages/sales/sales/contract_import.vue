<template>
<d2-container>
    <el-form ref="form" :model="form" label-width="90px">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="下载模版:">
                    <a :href="upload" style="color:rgb(0, 0, 238);">模版文件</a>
                </el-form-item>
                <el-form-item label="上传文件:" :required="true">
                    <el-upload
                            style="display: inline-block;"
                            class="upload-demo"
                            ref="upload"
                            :action='upload_api'
                            :headers='headers'
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
                </el-form-item>
            </el-col>
            <el-col :span="16">
                    <el-table  :data="list.data" element-loading-text="Loading" border fit highlight-current-row>
                        <el-table-column align="center" label='id' width="80">
                            <template slot-scope="scope">
                                {{scope.row.id}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label='Time' width="100">
                            <template slot-scope="scope">
                                {{scope.row.created_at}}
                            </template>
                        </el-table-column>
                        <el-table-column label="username" align="center"  width="90">
                            <template slot-scope="scope">
                                {{scope.row.username?scope.row.username.username:''}}
                            </template>
                        </el-table-column>
                        <el-table-column label="origin" align="center">
                            <template slot-scope="scope">
                                {{scope.row.origin}}
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
    import {auto_contract_list} from '@/api/sale'
    export default {
        data() {
            return {
                currentPage: 1,
                queryList: {
                    'page': '1',
                },
                form:{},
                upload: process.env.VUE_APP_API + 'template/excel/auto_contract.xlsx',
                // upload_api: process.env.VUE_APP_API + 'api/v1/prod/specUpload',
                upload_api: process.env.VUE_APP_API + 'api/v1/saler_contract/auto_contract_upload',
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
            fetchData() {
                auto_contract_list(this.queryList).then(res => {
                    if(this.loading){
                        this.$message.success('success')
                    }
                    this.list = res.data
                    this.loading = false
                }).catch(err=>{this.loading = false})
            },
            onSubmit() {
                this.$refs.upload.submit()
            },
            uploading(){
                this.loading = true
                this.fetchData()
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.fileList = []
                    auto_contract_list(this.queryList).then(res => {
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
