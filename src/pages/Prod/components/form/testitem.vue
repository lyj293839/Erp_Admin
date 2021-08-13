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
        <el-card class="box-card test" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_test" class="el-icon-caret-bottom"></i>{{$t('product.test.test')}}
                <el-button style="float: right;" type="primary" size="mini" @click="add_test">{{$t('add')}}</el-button>
            </div>
            <div v-for="(item,index) in chemtest"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10">
                        <span>{{$t('product.test.open')}}:</span>
                        <el-switch
                                v-model="item.status"
                                :active-value="1"
                                :inactive-value="0"
                                active-text="开"
                                inactive-text="关">
                        </el-switch>
                    </div>
                    <div class="d2-m-10" style="width: 180px;">
                        <span style="width: 50px;display: inline-block;"><span style="color:red;">*</span>{{$t('product.test.testitem_id')}}:</span>
                        <el-select v-model="item.testitem_id" size="mini" placeholder="Please Select" style="width: 120px;">
                            <el-option
                                    v-for="i in testitems"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id"
                                    >
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 160px;">
                        <span style="width: 40px;display: inline-block;">{{$t('product.test.quality_range')}}:</span>
                        <el-select v-model="item.quality_range" size="mini" placeholder="Please Select" style="width: 120px;">
                            <el-option
                                    v-for="i in quality_indexs"
                                    :key="i.name"
                                    :label="i.name"
                                    :value="i.name">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 160px;">
                        <span style="width: 40px;display: inline-block;">{{$t('product.test.quality_index')}}:</span>
                        <el-input v-model="item.quality_index"  size="mini" placeholder="请输入备注" style="width: 120px"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 400px;">
                        <span style="width: 40px;display: inline-block;vertical-align: top;">{{$t('product.test.documentation')}}:</span>
                        <el-input type="textarea" :rows="1" size="mini" v-model="item.documentation" resize="both"  placeholder="请输入" style="width: 360px"></el-input>
                    </div>
                    <div class="d2-mt-10">
                        <el-button type="primary" size="mini" @click="save_test(item)" :loading="save_fy">{{$t('save')}}</el-button>
                        <el-button type="danger" size="mini" @click="delete_test(item,index)">
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
  prod_testitem
} from '@/api/prod'
import $ from 'jquery'
export default {
  name: '',
  data () {
    return {
      prod_id: '',
      save_fy:false,
      chemtest: [{
        prod_id: '',
        testitem_id: '',
        quality_range: '',
        quality_index: '',
        documentation: ''
      }],
      testitems: [],
      quality_indexs: [{
        name: ''
      }, {
        name: '≥'
      }, {
        name: '≤'
      }]
    }
  },
  props: {
    datas: {
      type: Array
    }
  },
  watch: {
    datas (val) {
      if (val != null) {
        this.chemtest = val
      }
    }
  },
  created () {
      prod_testitem().then(res => {
          this.testitems = res.data.data
      })
    this.$bus.on('prod_id', target => {
      this.prod_id = target
    })
  },
  methods: {
    add_test () {
      this.chemtest.push({
        prod_id: '',
        testitem_id: '',
        quality_range: '',
        quality_index: '',
        documentation: ''
      })
    },
    delete_test (item, index) {
      if (item.id) {
        destroy(item, 'chemtest', 'destroy', this, index)
      } else {
        this.chemtest.splice(index, 1)
      }
    },
    toggle_test () {
      $('.test .el-card__body').toggle()
    },
    save_test (item) {
      item.prod_id = this.prod_id
      this.save_fy = true
      if (item.id) {
        update(item, 'chemtest', 'update', this)
      } else {
        create(item, 'chemtest', 'create', this)
      }
    }
  }
}
</script>
