<template>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('Inquery.index.imports.imports1')" name="first"><!-- 询单导入 -->
            <div style="margin: 20px 100px;width: 800px;">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="$t('Inquery.index.imports.imports2')"><!-- 客户信息 -->
                            <!-- 请输入客户名称 -->
                                <el-select
                                        v-model="form.cust_id"
                                        filterable
                                        clearable
                                        remote
                                        size="small"
                                        reserve-keyword
                                        :placeholder="$t('Inquery.index.add_edit.add_edit11')"
                                        :remote-method="remoteMethod"
                                        :loading="loading"
                                        @change="get_custcontact_id(form.cust_id)"
                                        style="width: 100%;"
                                >
                                    <el-option :style="{color:item.is_stop==2?'red':''}" v-for="item in customers" :key="item.id"  :label="item.name+'-'+(item.countries&&item.countries.Cname?item.countries.Cname:'无国家')+(item.is_stop==1?'':'-停用')" :value="item.id" :disabled="item.disabled||item.is_stop==2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('Inquery.index.imports.imports4')"><!-- 联系人 -->
                                <el-select v-model="form.custcontact_id" filterable
                                           size="mini" placeholder="Please Select">
                                    <el-option
                                            v-for="(i,index) in contacts_lists"
                                            :key="i.id"
                                            :label="i.name"
                                            :value="i.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item :label="$t('Inquery.index.imports.imports5')"><!-- 来源 -->
                                <el-select v-model="form.resource_id" filterable
                                           size="mini" placeholder="Please Select"
                                           @change="select_resource_id(form.resource_id)">
                                    <el-option
                                            v-for="(i,index) in resources"
                                            :key="i.id"
                                            :label="i.name"
                                            :value="i.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item :label="$t('Inquery.index.imports.imports6')"><!-- 指定销售 -->
                                <el-select
                                    v-model="form.assignsaler_id"
                                    filterable
                                    size="small"
                                    placeholder="Please Select"
                                    style="width: 100%;"
                                    @change="change_assignsaler(form.assignsaler_id)"
                                    >
                                    <el-option v-for="(i,index) in GEnums.Sales" :key="i.id" :label="i.name" :value="i.id"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label=" " style="margin-top: -30px;">
                        <p>1:{{$t('Inquery.index.imports.imports8')}}。<a :href="upload_file">{{$t('Inquery.index.imports.imports7')}}</a><!-- 模板文件 --></p><!-- 请下载模板文件，并按格式填写 -->
                        <p>2:{{$t('Inquery.index.imports.imports9')}}。</p><!-- Casno，数量，纯度必须填写，其他的信息尽量填写 -->
                        <p>3:{{$t('Inquery.index.imports.imports10')}}。</p><!-- 上传成功后，请在文件列表中进行数据处理 -->
                        <p>4:{{$t('Inquery.index.imports.imports11')}}。</p><!-- 每次上传的数据不要超过50条 -->
                        <p>5:{{$t('Inquery.index.imports.imports12')}}。</p><!-- 如有问题，请与系统管理员联系 -->
                    </el-form-item>
                    <el-form-item :label="$t('Inquery.index.imports.imports13')"><!-- 询单文件 -->
                        <el-upload
                                style="display: inline-block;"
                                class="upload-demo"
                                ref="upload"
                                :action=upload_api
                                :data=form
                                :headers=headers
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                accept=".xlsx"
                                :limit="1"
                                :on-exceed="handleExceed"
                                :on-error="handleAvatarError"
                                :on-success="handleAvatarSuccess"
                                :auto-upload="false"
                                :file-list="fileList">
                            <el-button size="mini" type="primary">{{$t('quality.detail.upload')}}</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" size="mini">{{$t('Inquery.index.imports.imports14')}}</el-button><!-- 导入 -->
                        <el-button  @click="close" size="mini">{{$t('close')}}</el-button><!-- 关闭 -->
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('Inquery.index.imports.imports15')" name="second"><!-- 文件列表 -->
            <el-table :data="uploadLists.data" element-loading-text="Loading" size="small" border fit highlight-current-row>
                <el-table-column label='name'>
                    <template slot-scope="scope">
                        {{scope.row.customer.name}}
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('Inquery.index.imports.imports16')"><!-- 上传日期 -->
                    <template slot-scope="scope">
                        {{scope.row.created_at}}
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('Inquery.index.imports.imports17')"><!-- 文件名称 -->
                    <template slot-scope="scope">
                        {{scope.row.material.origin}}
                    </template>
                </el-table-column>
                <!--<el-table-column align="center" label='数据'>-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.customer.name}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column align="center" label='报价文件'>-->
                    <!--<template slot-scope="scope">-->
                        <!--{{scope.row.customer.name}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <!--<el-table-column align="center" label='生成文件'>-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="primary" @click="onSubmit">生成报价文件</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column align="center" :label="$t('Inquery.index.imports.imports18')"><!-- 处理 -->
                    <template slot-scope="scope">
                        <template>
                            <el-button
                                    size="small"
                                    type="primary"
                                    v-if="scope.row.status==0"
                                    @click="deal(scope.row.id)">{{$t('Inquery.index.imports.imports18')}}
                            </el-button><!-- 处理 -->
                            <el-button
                                    size="small"
                                    type="danger"
                                    @click="handleDel(scope.row.id)">{{$t('Inquery.index.imports.imports19')}}
                            </el-button><!-- 删除 -->
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                    :title="$t('Inquery.index.imports.imports20')"
                    :visible.sync="dialogVisible"
                    width="90%"
            ><!-- 询单信息 -->
                <el-table :data="lists2" element-loading-text="Loading" border fit highlight-current-row>
                    <el-table-column label='CASNo'>
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.cas" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports21')"><!-- 产品中文名称 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name_zh" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports22')"><!-- 产品英文名称 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports23')"><!-- 需求数量 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.quantity" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports24')"><!-- 纯度要求 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.specification" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports25')"><!-- 到货时间 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.leadtime" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports26')"><!-- 其他信息 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.other_desc" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" :label="$t('Inquery.index.imports.imports27')"><!-- 产品编码 -->
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.prod_id" size="mini" ></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">{{$t('Inquery.index.imports.imports28')}}</el-button><!-- 取 消 -->
        <el-button type="primary" @click="saveDeal" :loading='loading?true:false' size="mini">{{$t('Inquery.index.imports.imports29')}}</el-button><!-- 确 定 -->
      </span>
            </el-dialog>
        </el-tab-pane>
    </el-tabs>

</template>

<script>
    import {
        customer_lists,
        contact_info,
        create,
        upload,
        uploadList,
        uploadDeal,
        saveDeal,
        destroy,
        resources
    } from '@/api/Inquery';
    import util from '@/libs/util'
    export default {
        name: "Inquery-import",
        data() {
            return {
                id:'',
                activeName: 'first',
                newOption: {},
                customers: [],
                resources:[],
                contacts_lists: [],
                form: {
                    cust_id: '',
                    country_code: '',
                    level: '',
                    custcontact_id: '',
                    resource_id: '',
                    assignsaler_id: '',
                    assignsaler_name: '',
                    purchaseuser_id: ''
                },
                fileList: [],
                upload_api: process.env.VUE_APP_API + 'api/v1/inquiry/inquiry/upload',
                upload_file: process.env.VUE_APP_API + 'data/inquiry_upload.xlsx',
                loading: false,
                uploadLists: [],
                lists2:[],
                dialogVisible: false,
                responsible_select:true
            }
        },
        watch: {
            $route (to, from) {
                if(to.name=='Inquery-import'){
                    this.fetchData()
                }
            }
        },
        created() {
            // if (this.$route.query.resources) {
            //     this.resources=this.$route.query.resources
            // }
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
             change_assignsaler(id){
             this.form.assignsaler_name =this.GEnums.Sales[id].name;
            },
            handleDel(id){
                destroy(id,this)
            },
            close(){
                this.$router.push({
                    path:'/Inquery/inquery',
                    name:'Inquery-inquery'
                })
            },
            saveDeal(){
                this.dialogVisible=false;
                let query={
                    id:this.id,
                    prods:this.lists2
                }
                saveDeal(query,this)
            },
            fetchData() {
                customer_lists().then(res => {
                    this.customers = res.data
                })
                resources().then(res=>{
                    this.resources=res.enum.resources
                })
                uploadList().then(res => {
                    this.uploadLists = res.data
                })
                this.form.resource_id=6
                this.select_resource_id(this.form.resource_id)
            },
            handleClick(tab, event) {
                if(tab.index==0){
                    this.form={
                            cust_id: '',
                            country_code: '',
                            level: '',
                            custcontact_id: '',
                            resource_id: '',
                            assignsaler_id: '',
                            assignsaler_name: '',
                            purchaseuser_id: ''
                    },
                    this.fileList=[]
                }
                if(tab.index){
                    uploadList().then(res => {
                        this.uploadLists = res.data
                    })
                }
            },
            deal(id) {
                this.id=id;
                uploadDeal(id).then(res => {
                    this.lists2=res.datas
                    this.dialogVisible = true
                })
            },
            back() {
                this.$emit('getValue', 0)
            },
            select_resource_id(id) {
                if(this.responsible_select){
                    this.form.assignsaler_id = ''
                    this.form.assignsaler_name = ''
                    this.resources.forEach((items, index) => {
                        if (items.id == id) {
                            this.form.assignsaler_id = items.user.id
                            this.form.assignsaler_name = items.user.username
                        }
                    })
                }
            },
            get_custcontact_id(id) {
                this.form.custcontact_id=''
                this.contacts_lists=[]
                this.customers.forEach((items, index) => {
                    if (items.id == id) {
                        this.form.country_code = items.country_code
                        this.form.level = items.level_id
                        if(items.responsible_persons&&items.responsible_persons.length>0){
                            this.responsible_select=false
                            this.form.assignsaler_id =items.responsible_persons[0].users.id;
                            this.form.assignsaler_name =items.responsible_persons[0].users.username;
                        }else{
                            this.responsible_select=true
                            this.form.assignsaler_id = "";
                            this.form.assignsaler_name = "";
                        }
                    }
                })
                contact_info(id).then(res => {
                    this.contacts_lists = res.data
                    if(this.contacts_lists.length>0){
                        this.form.custcontact_id=this.contacts_lists[0].id
                    }
                })
            },
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        customer_lists(query).then(res => {
                            this.customers = res.data
                            this.customers.forEach((items, index) => {
                                if (items.country_code) {
                                    this.customers[index].disabled = false;
                                }else{
                                    this.customers[index].disabled = true;
                                }
                            });
                            this.loading = false;
                        })
                    }, 500);
                } else {
                    this.customers = [];
                }
            },
            onSubmit() {
                this.$refs.upload.submit();
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.$i18n.locale=='cn'?this.$message.warning("当前限制选择1个文件"):this.$message.warning("Current limit of 1 files")
            },
            handleAvatarError(res, file, fileList){
                this.$message({
                    message: 'The given data was invalid.',
                    type: 'error'
                });
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    uploadList().then(res => {
                        if(res.code==0){
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            this.uploadLists = res.data
                            this.activeName = "second";
                        }else{
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }).catch(rr=>{
                        this.$message({
                            message: rr.msg,
                            type: 'error'
                        });
                    })
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            handleRemove(){

            },
            beforeRemove(file, fileList) {
                return this.$i18n.locale=='cn'?this.$confirm(`确定移除 ${file.name}？`):this.$confirm(`Confirm removal ${file.name}？`)
            },
        }
    }
</script>

<style scoped>
    p {
        line-height: 20px;
    }
</style>