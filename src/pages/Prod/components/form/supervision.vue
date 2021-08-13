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
        <el-card class="box-card supervision" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_supervisions" class="el-icon-caret-bottom"></i>{{$t('product.supervision.supervision')}}
                <el-button style="float: right;" type="primary" size="mini" @click="add_supervisions">{{$t('add')}}</el-button>
            </div>
            <div v-for="(item,index) in supervision"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10 " style="width: 140px;">
                        <span>{{$t('product.supervision.supervision')}}:</span>
                        <el-switch
                                v-model="item.status"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-m-10 " style="width: 220px;">
                        <span style="width: 50px;display: inline-block"><span style="color:red;">*</span>{{$t('product.supervision.country_code')}}:</span>
                        <el-select style="width: 140px;" v-model="item.country_code" filterable
                                    size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="(i,index) in country"
                                    :key="i.index"
                                    :label="i.Name"
                                    :value="i.Code">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10 " style="width: 240px;">
                        <span style="width: 80px;display: inline-block">{{$t('product.supervision.condition')}}:</span>
                        <el-input v-model="item.condition" size="mini" placeholder="请输入" style="width: 140px;"></el-input>
                    </div>
                    <div class="d2-mt-10 ">
                        <el-button type="primary" size="mini" @click="save_supervisions(item)" :loading="save_fy">{{$t('save')}}</el-button>
                        <el-button type="danger" size="mini" @click="delete_supervisions(item,index)">
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
    } from '@/api/prod'
    import $ from 'jquery'
    export default {
        name: "",
        data() {
            return {
                country:[],
                save_fy:false,
                supervision:[{
                    prod_id:'',
                    condition:'',
                    country_code:'',
                    status:''
                }],
                prod_id:''
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
                    this.supervision=val
                }
            }
        },
        created(){
            this.fetch_country()
            this.$bus.on('prod_id', target => {
                this.prod_id=target
            });
        },
        methods: {
            fetch_country(){
                country_list().then(res => {
                    this.country = res.data;
                })
            },
            add_supervisions(){
                this.supervision.push({
                    prod_id:'',
                    condition:'',
                    status:''
                })
            },
            delete_supervisions(item,index){
                if(item.id){
                    destroy(item, 'supervision', 'destroy', this,index)
                }else{
                    this.supervision.splice(index,1)
                }
            },
            toggle_supervisions() {
                $('.supervision .el-card__body').toggle()
            },
            save_supervisions(item) {
                item.prod_id=this.prod_id
                this.save_fy = true
                if (item.id) {
                    update(item, 'supervision', 'update', this)
                } else {
                    this.$bus.on('prod_id', target => {
                        item.prod_id=target
                    });
                    create(item, 'supervision', 'create', this)
                }
            },
        }
    }
</script>