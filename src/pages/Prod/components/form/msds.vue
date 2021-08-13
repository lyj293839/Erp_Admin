<style lang="scss" scoped type="text/scss">
    .bold {
        font-weight: bold;
    }

    .grey {
        color: grey;
    }

    .l_h {
        line-height: 1.5;
    }

    .l_h80 {
        line-height: 80px;
    }

    .el-pagination {
        text-align: right;
        margin: 10px;
    }

    .d2-text-center {
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }

    .border-right {
        border-right: 1px solid #f2f2f2;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 0;
        display: flex;
        /*justify-content: center;*/
        flex-wrap: wrap;
        padding: 0;
    }

    .options {
        justify-content: center;
    }

    .options div {
        width: 33%;
        text-align: center;
    }

    .item1 {
        margin-bottom: 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        /*width: 400px;*/
        width: 31%;
        margin: 10px 0;
        box-sizing: border-box;
    }

    .el-main {
        padding: 0;
    }

    .el-card__body {
        padding: 10px;
    }

    .basis {
        padding: 10px;
    }

    .basis .el-card__header {
        background-color: rgba(250, 250, 250, 1);
    }

    .logo {
        width: 100px;
        height: 100px;
        background-color: rgba(246, 246, 246, 1);
    }

    .logo i {
        font-size: 30px;
        margin: 45px;
    }

    p {
        margin: 5px 0;
    }

    .customWidth {
        width: 70%;
    }

    .level {
        width: 40px;
        height: 30px;
        line-height: 30px;
        margin: 0 15px;
        background-color: yellow;
        text-align: center;
        box-shadow: 0 2px 12px 2px rgba(0, 0, 0, .1);;
    }

    .check {
        width: 30px;
        height: 30px;
        margin: 5px 20px;
    }

    .level span {
        display: inline-block !important;
        width: 100% !important;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .logo i {
        margin: 20px;
    }
</style>
<style lang="scss" type="text/scss">
    // .el-tooltip span {
    //     display: inline-block !important;
    //     width: 100% !important;
    // }

    // .el-switch__label--left {
    //     position: relative;
    //     left: 46px;
    //     color: #fff;
    //     z-index: -1111;
    // }

    // .el-switch__label--right {
    //     position: relative;
    //     right: 46px;
    //     color: #fff;
    //     z-index: -1111;
    // }

    // .el-switch__label--right.is-active {
    //     z-index: 1111;
    //     color: #fff !important;
    // }

    // .el-switch__label--left.is-active {
    //     z-index: 1111;
    //     color: #9c9c9c !important;
    // }

    // .el-pagination {
    //     text-align: right;
    // }
</style>
<template>
    <div>
        <el-card class="box-card MSDS" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_MSDS" class="el-icon-caret-bottom"></i>MSDS
                <el-button style="float: right;" type="primary" size="mini" @click="add_MSDS">{{$t('add')}}</el-button>
            </div>
            <div v-for="(item,index) in msds"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10">
                        <span>{{$t('is_default')}}:</span>
                        <el-switch
                                v-model="item.is_default"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-m-10" style="width: 200px;">
                        <span style="width: 50px;display: inline-block;"><span style="color:red;">*</span>{{$t('product.MSDS.company_id')}}</span>
                        <el-select v-model="item.company_id" size="mini" placeholder="Please Select" style="width: 140px">
                            <el-option
                                    v-for="item in company"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 180px;position: relative;">
                        <span style="width: 40px;display: inline-block;position: absolute;top: 2px;" >{{$t('product.MSDS.file')}}:</span>
                        <el-upload
                                style="display: inline-block;margin-left: 45px;"
                                class="upload-demo"
                                :action=upload_api
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                :headers=headers
                                multiple
                                :limit="1"
                                :on-exceed="handleExceed"
                                :on-success="handleAvatarSuccess"
                                :file-list="item.fileList">
                            <el-button size="mini" type="primary" @click="file_index(index)">{{$t('product.MSDS.upload')}}</el-button>
                        </el-upload>
                    </div>
                    <div class="d2-mt-10" style="position: absolute;right: 30px;">
                        <el-button type="primary" size="mini" @click="save_MSDS(item)" :loading="save_fy">{{$t('save')}}</el-button>
                        <el-button type="danger" size="mini" @click="delete_MSDS(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        create,
        update,
        destroy,
        country_list,
        member_list,
    } from '@/api/prod'
    import util from '@/libs/util'
    import $ from 'jquery'
    export default {
        name: "",
        data() {
            return {
                save_fy:false,
                prod_id:'',
                country:[],
                company:[],
                msds:[{
                    prod_id:'',
                    company_id:'',
                    material_id:'',
                    is_default:''
                }],
                currencys:[],
                fileList: [],
                upload_api: process.env.VUE_APP_API + 'api/v1/msds/upload',
                f_index:''
            }
        },
        props: {
            datas:{
                type:Array,
            }
        },
        watch: {
            datas(val){
                if(val!=null){
                    val.forEach((item,index)=>{
                        item.fileList=[{
                            name:item.material.origin,
                            url:item.material.url
                        }]
                    })
                    this.msds=val
                }
            }
        },
        created(){
            this.fetch_country()
            this.$bus.on('prod_id', target => {
                this.prod_id=target
            });
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
            file_index(index){
                this.f_index=index
            },
            handleRemove(file, fileList) {
                // console.log(file, fileList);
                this.msds[this.f_index].material_id=''
            },
            handlePreview(file) {
                // console.log(file);
            },
            handleExceed(files, fileList) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleAvatarSuccess(res, file, fileList) {
                this.msds[this.f_index].material_id=res.data.id
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            fetch_country(){
                country_list().then(res => {
                    this.country = res.data;
                })
                member_list().then(res=>{
                    this.company = res.data;
                })
            },
            add_MSDS(){
                this.msds.push({
                    prod_id:'',
                    company_id:'',
                    material_id:'',
                    is_default:''
                })
            },
            delete_MSDS(item,index){
                if(item.id){
                    destroy(item, 'msds', 'destroy', this,index)
                }else{
                    this.msds.splice(index,1)
                }
            },
            toggle_MSDS() {
                $('.MSDS .el-card__body').toggle()
            },
            save_MSDS(item) {
                item.prod_id=this.prod_id
                this.save_fy = true
                if (item.id) {
                    update(item, 'msds', 'update', this)
                } else {
                    create(item, 'msds', 'create', this)
                }
            },
        }
    }
</script>