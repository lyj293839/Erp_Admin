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
    .el-tooltip span {
        display: inline-block !important;
        width: 100% !important;
    }

    .el-switch__label--left {
        position: relative;
        left: 46px;
        color: #fff;
        z-index: -1111;
    }

    .el-switch__label--right {
        position: relative;
        right: 46px;
        color: #fff;
        z-index: -1111;
    }

    .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
    }

    .el-switch__label--left.is-active {
        z-index: 1111;
        color: #9c9c9c !important;
    }
</style>
<template>
    <div>
        <el-table :data="detail" element-loading-text="Loading" border fit highlight-current-row size="small">
            <el-table-column align="center" :label="$t('quality.quality_list.company')">
                <template slot-scope="scope">
                    {{scope.row.company?scope.row.company.name:''}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.contact_name')" align="center">
                <template slot-scope="scope">
                    {{scope.row.contact_name}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.telephone')" align="center">
                <template slot-scope="scope">
                    {{scope.row.telephone}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.name')" align="center">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column label="CAS" align="center">
                <template slot-scope="scope">
                    {{scope.row.cas}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.batchno')" align="center">
                <template slot-scope="scope">
                    {{scope.row.batchno}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.img')" align="center">
                <template slot-scope="scope">
                    <img :src="scope.row.prod.img" alt="" style="width: 60px;height:60px;">
                </template>
            </el-table-column>

            <el-table-column :label="$t('quality.quality_list.note')" align="center">
                <template slot-scope="scope">
                    {{scope.row.note}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.stocked_at')" align="center">
                <template slot-scope="scope">
                    {{scope.row.stocked_at}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.sampled_at')"  align="center">
                <template slot-scope="scope">
                    {{scope.row.sampled_at}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.storagecondition')" align="center">
                <template slot-scope="scope">
                    {{scope.row.storagecondition}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.warehouse')" align="center">
                <template slot-scope="scope">
                    {{scope.row.warehouse}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.items')" align="center">
                <template slot-scope="scope">
                    {{scope.row.testitems_name}}
                </template>
            </el-table-column>
            <el-table-column :label="$t('quality.quality_list.result')" align="center">
                <template slot-scope="scope">
                    {{scope.row.result}}
                </template>
            </el-table-column>
        </el-table>
        <el-card class="box-card testitem" style="width: 100%;">
            <div slot="header" class="clearfix" style="">
                <i @click="toggle_testitem" class="el-icon-caret-bottom"></i>{{$t('quality.detail.testitem')}}
                <el-button style="float: right;" type="primary" size="mini" @click="dialogAdd=true">{{$t('add')}}</el-button>
                <el-button style="float: right;margin-right: 10px;" type="primary" size="mini" @click="back">{{$t('back')}}
                </el-button>

            </div>
            <div v-if="testitems" v-for="(item,index) in testitems"
                 style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
                <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <span style="width: 40px;display: inline-block;">{{$t('quality.detail.items')}}:</span>
                        <el-input
                                disabled
                                v-model="item.testitem_name"
                                style="width: 100px;"
                                size="mini">
                        </el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <span style="width: 40px;display: inline-block;">{{$t('quality.detail.testitem_fee')}}:</span>
                        <el-input
                                v-model="item.testitem_fee"
                                style="width: 100px;"
                                size="mini">
                        </el-input>
                    </div>
                    <div class="d2-m-10" style="width: 200px;">
                        <el-input
                                v-model="item.result"
                                style="width: 200px;"
                                :placeholder="$t('quality.detail.result')"
                                size="mini">
                        </el-input>
                    </div>
                    <div class="d2-m-10" style="width: 150px;">
                        <el-upload
                                style="display: inline-block;margin-left: 45px;"
                                class="upload-demo"
                                :action=upload_api
                                :data=pramas
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :headers=headers
                                :before-remove="beforeRemove"
                                multiple
                                :limit="5"
                                :on-exceed="handleExceed"
                                :on-success="handleAvatarSuccess"
                                :file-list="item.fileList">
                            <el-button size="small" type="primary" @click="file_index(item.id,index)">{{$t('quality.detail.upload')}}</el-button>
                        </el-upload>
                    </div>
                    <div class="d2-mt-10">
                        <el-select v-model="item.status" clearable filterable size="mini"
                                   style="width: 100px;margin: 0 10px;"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="i in item_status"
                                    :key="i.id"
                                    :label="i.name_cn"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="item.success" clearable filterable size="mini"
                                   style="width: 100px;margin: 0 10px;"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="i in item_success"
                                    :key="i.id"
                                    :label="i.name_cn"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                        <el-select v-model="item.failure" clearable filterable size="mini"
                                   style="width: 100px;margin: 0 10px;"
                                   placeholder="Please Select">
                            <el-option
                                    v-for="i in order_status"
                                    :key="i.id"
                                    :label="i.name_cn"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                        <el-button style="float: right;" type="primary" size="mini" @click="save_item(item)">{{$t('save')}}
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <el-dialog title="Add" :visible.sync="dialogAdd" size="small">
            <el-form label-width="40px" label-position="left" style="width: 240px;margin: 0 auto;">
                <el-form-item :label="$t('quality.detail.class')">
                    <el-select v-model="add_item.testitem_pid" @change="select_type(add_item.testitem_pid)" size="mini"
                               placeholder="Please Select"
                               style="width: 200px;">
                        <el-option
                                v-for="i in itemtype"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('quality.detail.items')">
                    <el-select v-model="add_item.testitem_id" @change="get_fee(add_item.testitem_id)" size="mini"
                               placeholder="Please Select"
                               style="width: 200px;">
                        <el-option
                                v-for="i in items"
                                :key="i.id"
                                :label="i.name"
                                :value="i.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('quality.detail.testitem_fee')">
                    <el-input size="mini" v-model="add_item.testitem_fee"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary"
                           @click="add_test()">{{$t('save')}}
                </el-button>
                <el-button @click="dialogAdd = false">{{$t('cancel')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
  quality_edit,
  testitem,
  quality_check_create,
  quality_check_update,
  quality_upload,
  quality_deleteFile
} from '@/api/quality'
import $ from 'jquery'
import util from '@/libs/util'
export default {
  name: '',
  data () {
    return {
      dialogAdd: false,
      prod_id: '',
      detail: [],
      testitems: [],
      add_item: {
        qualityorder_id: '',
        testitem_pid: '',
        testitem_id: '',
        testitem_fee: ''
      },
      fileList: [],
      detail_id: '',
      upload_api: process.env.VUE_APP_API + 'api/v1/quality/check/upload',
      item_success: [],
      order_status: [],
      itemtype: [],
      items: [],
      qualityorder_testitem_id: '',
      f_index: '',
      val: '',
      pramas: {
        qualityorder_testitem_id: ''
      }
    }
  },
  props: {
    datas: {
      type: Number
    }
  },
  watch: {
    datas (val) {
      if (val != null) {
        this.val = val
        quality_edit(val).then(res => {
          this.detail = []
          res.data.testitems_name = ''
          res.data.testitems.forEach((m, n) => {
            m.testitems_name += m.testitem_name + ','
          })
          this.detail.push(res.data)
          this.testitems = res.data.testitems
          if (this.testitems) {
            this.testitems.forEach((item, index) => {
              item.fileList = []
              if (item.files) {
                item.files.forEach((m, n) => {
                  item.fileList.push({
                    name: m.origin,
                    url: n.url,
                    material_id: m.pivot.material_id,
                    qualityorder_testitem_file_id: m.pivot.qualityorder_testitem_file_id
                  })
                })
              }
            })
          }
        })
      }
    }
  },
  computed: {
    headers () {
      const token = util.cookies.get('token')
      return {
        'Authorization': 'Bearer ' + token,
        'Version-Number':process.env.VUE_APP_Version
      }
    }
  },
  created () {
    testitem().then(res => {
      this.itemtype = res.enum.Testprodcate
    })
    if (this.datas != undefined) {
      this.val = this.datas
      quality_edit(this.datas).then(res => {
        res.data.testitems_name = ''
        if (res.data.testitems) {
          res.data.testitems.forEach((m, n) => {
            res.data.testitems_name += m.testitem_name + ','
          })
        }
        this.detail.push(res.data)
        this.testitems = res.data.testitems
        this.item_success = res.enum.item_success
        this.item_failure = res.enum.item_failure
        this.item_status = res.enum.item_status
        this.order_status = res.enum.order_status
        if (this.testitems) {
          this.testitems.forEach((item, index) => {
            item.fileList = []
            if (item.files) {
              item.files.forEach((m, n) => {
                item.fileList.push({
                  name: m.origin,
                  url: n.url,
                  material_id: m.pivot.material_id,
                  qualityorder_testitem_file_id: m.pivot.qualityorder_testitem_file_id
                })
              })
            }
          })
        }
      })
    }
  },
  methods: {
    file_index (id, index) {
      this.pramas.qualityorder_testitem_id = id
      this.f_index = index
    },
    back () {
      this.$emit('getValue', 0)
    },
    handleRemove (file, fileList) {
      console.log(file)
      console.log(file, fileList)
      if (file.material_id) {
        quality_deleteFile(file.material_id, file.qualityorder_testitem_file_id).then(res => {

        })
      } else {
        quality_deleteFile(file.response.data.material_id, file.response.data.qualityorder_testitem_file_id).then(res => {

        })
      }
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.warning('当前限制选择5个文件')
    },
    handleAvatarSuccess (res, file, fileList) {

    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    add_test () {
      this.add_item.qualityorder_id = this.detail[0].id
      quality_check_create(this.add_item, this)
    },
    save_item (item) {
      quality_check_update(item, this)
    },
    add_testitem () {
      this.testitem.push({
        company_id: '',
        prod_id: '',
        code: '',
        country_code: '',
        year: '',
        rate: '',
        status: ''
      })
    },
    select_type (id) {
      let query = {
        testprodcate_id: id
      }
      testitem(query).then(res => {
        this.items = res.data.data
      })
    },
    get_fee (name) {
      this.items.forEach((items, index) => {
        if (items.id == name) {
          this.add_item.testitem_fee = items.fee
        }
      })
    },
    toggle_testitem () {
      $('.testitem .el-card__body').toggle()
    }
  }
}
</script>
