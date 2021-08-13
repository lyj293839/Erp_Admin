<template>
<d2-container>
    <el-form ref="form" :model="form" label-width="190px" label-position='right'>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="允许通知ID对应多个报关号:">
                    <el-switch
                        v-model="form.cover"
                        :active-value='1'
                        :inactive-value='0'>
                    </el-switch>
                </el-form-item>
                <el-form-item label="上传文件:" :required="true">
                    <el-upload
                            style="display: inline-block;"
                            class="upload-demo"
                            ref="upload"
                            :action='upload_api'
                            :headers='headers'
                            :data='form'
                            :before-remove="beforeRemove"
                            :before-upload="beforeUpload"
                            multiple
                            accept=".xlsx,.xls"
                            :limit="5"
                            :on-exceed="handleExceed"
                            :on-success="handleAvatarSuccess"
                            :auto-upload="false"
                            :file-list="fileList">
                        <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="up_loading" @click="onSubmit" v-if="permission_names['ship.customs_declaration_upload']=='ship.customs_declaration_upload'" size="mini">提交</el-button>
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
                        <el-table-column label="error_msg" align="center">
                            <template slot-scope="scope">
                                {{scope.row.remark}}
                            </template>
                        </el-table-column>
                        <el-table-column label="result_url" align="center"  width="100">
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
    import {customs_declaration_list} from '@/api/warehouse'
    export default {
        data() {
            return {
                currentPage: 1,
                up_loading:false,
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                queryList: {
                    'page': '1',
                },
                form:{cover: 0},
                upload_api: process.env.VUE_APP_API + 'api/v1/ship/customs_declaration_upload',
                fileList: [],
                list: {}
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
                customs_declaration_list(this.queryList).then(res => {
                    this.list = res.data
                })
            },
            onSubmit() {
                this.$refs.upload.submit()
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    this.$message({
                        message: 'success',
                        type: 'success'
                    })
                    this.up_loading = false
                    fileList = []
                    this.fileList = []
                    this.form = {
                        cover: 0
                    }
                    customs_declaration_list(this.queryList).then(res => {
                        this.list = res.data
                    }).catch(rr => {this.up_loading = false})
                } else {
                    this.$message.error(file.response.msg)
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            beforeUpload(file){
                if(file){
                    this.up_loading = true
                }else{
                    this.$message.error('请选择提交文件');
                    this.up_loading = false
                }
                return
            },
             handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件`);
                
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            }
        }
    }
</script>
