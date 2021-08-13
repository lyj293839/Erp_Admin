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
        <el-card class="box-card propertise" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_propertise" class="el-icon-caret-bottom"></i>{{$t('product.propertise.propertise')}}
            </div>
            <div
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.trancondition_id')}}</p>
                        <el-select v-model="propertise.trancondition_id"  filterable size="mini" style="width: 90px;margin-left: 5px;">
                            <el-option
                                    v-for="(i,index) in Trancondition"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.storagecondition_id')}}</p>
                        <el-select v-model="propertise.storagecondition_id"  filterable size="mini" style="width: 90px;margin-left: 5px;">
                            <el-option
                                    v-for="(i,index) in StorageCondition"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.danger_id')}}</p>
                        <el-select v-model="propertise.danger_id"  filterable size="mini" style="width: 90px;margin-left: 5px;">
                            <el-option
                                    v-for="(i,index) in Danger"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.dangerclass_id')}}</p>
                        <el-select v-model="propertise.dangerclass_id"  filterable size="mini" style="width: 90px;margin-left: 5px;">
                            <el-option
                                    v-for="(i,index) in Dangertype"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.dangerlevel_id')}}</p>
                        <el-select v-model="propertise.dangerlevel_id"  filterable size="mini" style="width: 90px;margin-left: 5px;">
                            <el-option
                                    v-for="(i,index) in Dangerlevel"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.packagelevel_id')}}</p>
                        <el-select v-model="propertise.packagelevel_id"  filterable size="mini" style="width: 90px;margin-left: 5px;">
                            <el-option
                                    v-for="(i,index) in Packagelevel"
                                    :key="index"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.mp')}}</p>
                        <el-input v-model="propertise.mp"  size="mini" placeholder="请输入"></el-input>
                    </div>

                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.bp')}}</p>
                        <el-input v-model="propertise.bp"  size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.density')}}</p>
                        <el-input v-model="propertise.density" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.vapordensity')}}</p>
                        <el-input v-model="propertise.vapordensity" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.vaporpressure')}}</p>
                        <el-input v-model="propertise.vaporpressure" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.flashpoint')}}</p>
                        <el-input v-model="propertise.flashpoint" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.refractiveindex')}}</p>
                        <el-input v-model="propertise.refractiveindex" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.solubility')}}</p>
                        <el-input v-model="propertise.solubility" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.watersolubility')}}</p>
                        <el-input v-model="propertise.watersolubility" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.freezingpoint')}}</p>
                        <el-input v-model="propertise.freezingpoint" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.stability')}}</p>
                        <el-input v-model="propertise.stability" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.propertise.specificity')}}</p>
                        <el-input v-model="propertise.specificity"  size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>uncode</p>
                        <el-input v-model="propertise.uncode"  size="mini" placeholder="请输入"></el-input>
                    </div>
                </div>
                <div class="d2-mt-10">
                    <el-button type="primary" size="mini" :loading="propertise.loading?true:false"
                               @click="save_propertise()">
                        {{$t('save')}}
                    </el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        create,
        update,
        country_list,
    } from '@/api/prod'
    import $ from 'jquery'
    export default {
        name: "",
        data() {
            return {
                country:[],
                propertise:{
                    loading:false,
                    prod_id:'',
                    danger_id:'',
                    dangerclass_id:'',
                    dangertype_id:'',
                    dangerlevel_id:'',
                    packagelevel_id:'',
                    trancondition_id:'',
                    storagecondition_id:'',
                    stability:'',
                    refractiveindex:'',
                    solubility:'',
                    watersolubility:'',
                    freezingpoint:'',
                    flashpoint:'',
                    mp:'',
                    bp:'',
                    density:'',
                    vapordensity:'',
                    vaporpressure:'',
                    safetystatements:'',
                    specificity:"",
                    uncode:''
                },
                Trancondition:{},
                StorageCondition:{},
                Danger:{},
                Dangerlevel:{},
                Dangertype:{},
                Packagelevel:{}
            }
        },
        props: {
            datas:{
                type:Object,
            }
        },
        watch: {
            datas(val){
                if(val!=null){
                    this.propertise=val
                }
            }
        },
        created(){
            this.$bus.on('enum', target => {
                this.Trancondition=target.Trancondition
                this.StorageCondition=target.StorageCondition
                this.Danger=target.Danger
                this.Dangertype=target.Dangertype
                this.Packagelevel=target.Packagelevel
                this.Dangerlevel=target.Dangerlevel
            });
            this.$bus.on('prod_id', target => {
                this.propertise.prod_id=target
            });
        },
        methods: {
            toggle_propertise() {
                $('.propertise .el-card__body').toggle()
            },
            save_propertise() {
                if (this.propertise.id) {
                    update(this.propertise, 'chemproperty', 'update', this)
                } else {
                    create(this.propertise, 'chemproperty', 'create', this)
                }
            },
        }
    }
</script>