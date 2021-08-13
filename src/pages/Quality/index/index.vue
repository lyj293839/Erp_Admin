<style lang="scss" scoped type="text/scss">
  /deep/.checkbox_nei {
    margin-left: 10px;
    padding-left: 0px;
    .el-checkbox__label {
      padding-left: 0px;
    }
  }
  /deep/.el-checkbox__label {
    padding-left: 5px;
  }
.add {
  margin-bottom: 15px;
}
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
  clear: both;
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
  box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.1);
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
  border-color: #409eff;
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
.clearfix {
  text-align: left;
}
/deep/.el-table{
  td,th{
    .cell{
      padding: 0px 5px;
    }
  }
  .el-input__inner {
    color:#000 !important;
  }
}
</style>
<template>
  <d2-container>
    <div v-if="dialogAdd==0">
        <el-row style="margin: 10px 0;">
          <el-col :span="1">
            <el-button type="primary" size="mini" @click="handleAdd">{{$t('add')}}</el-button>
          </el-col>
          <el-col :span="23" style="text-align: right;">
            <el-input
              v-model="queryList.company"
              style="width: 150px;margin:0 2px;"
              size="mini"
              clearable
              :placeholder="$t('quality.queryList.company')"
            ></el-input>
            <el-input
              v-model="queryList.cas"
              style="width: 125px;margin:0  2px;"
              size="mini"
              clearable
              :placeholder="$t('quality.queryList.cas')"
            ></el-input>
            <el-input
              v-model="queryList.name"
              style="width: 130px;margin:0 2px;"
              size="mini"
              clearable
              :placeholder="$t('quality.queryList.name')"
            ></el-input>
            <el-input
              v-model="queryList.batchno"
              style="width: 120px;margin:0 2px;"
              size="mini"
              clearable
              :placeholder="$t('quality.queryList.batchno')"
            ></el-input>
            <!--<el-select v-model="queryList.chemicalcate_id" clearable filterable size="mini" style="width: 150px;margin:5px;"-->
            <!--placeholder="请选择检验员">-->
            <!--<el-option-->
            <!--v-for="i in ChemicalType"-->
            <!--:key="i.id"-->
            <!--:label="i.name"-->
            <!--:value="i.id">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <el-select
              v-model="queryList.result"
              clearable
              filterable
              size="mini"
              style="width: 100px;margin:0 2px;"
              :placeholder="$t('quality.queryList.result')"
            >
              <el-option v-for="i in order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>
            <el-select
              v-model="queryList.status"
              clearable
              filterable
              size="mini"
              style="width: 100px;margin:0 2px;"
              :placeholder="$t('quality.queryList.status')"
            >
              <el-option v-for="i in order_status" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>

            <el-select
              v-model="queryList.sampled_status"
              clearable
              filterable
              size="mini"
              style="width: 105px;margin:0 2px;"
              :placeholder="$t('quality.queryList.is_sampled')"
            >
              <el-option v-for="i in sampled_status" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>
            <el-select
              v-model="queryList.class"
              clearable
              filterable
              size="mini"
              style="width: 105px;margin:0 2px;"
              placeholder="检测类别"
            >
              <el-option v-for="i in order_classes" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>
            <el-button type="primary" size="mini" :loading="loading_search" @click="search" style="margin: 0 2px">{{$t('search')}}</el-button>
          </el-col>
        </el-row>
      <el-table
        :data="list.data"
        style="width: 100%;font-size: 12px;"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        row-key="id"
        :expand-row-keys="expands"
        @row-click="rowClick"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-card class="box-card testitem" style="width: 95%;">
              <div slot="header" class="clearfix" style>
                <i @click="toggle_testitem" class="el-icon-caret-bottom"></i>
                {{$t('quality.detail.testitem')}}
                <el-button
                  style="float: right;"
                  type="primary"
                  size="mini"
                  @click="show_dialogAdd_(props.row.id)"
                >{{$t('add')}}</el-button>
                <!--<el-button style="float: right;margin-right: 10px;" type="primary" size="mini" @click="back">{{$t('back')}}</el-button>-->
              </div>

              <div
                v-if="testitems"
                v-for="(item,index) in props.row.testitems"
                style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
              >
                <div class="item1">
                  <div class="d2-m-10" style="width: 160px;">
                    <span style="width: 40px;display: inline-block;">申请人:</span>
                    <el-select
                      v-model="item.user_id"
                      clearable
                      disabled
                      filterable
                      size="mini"
                      style="width: 100px;margin: 0 10px;"
                    >
                      <el-option v-for="i in Users" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                  </div>
                  <div class="d2-m-10" style="width: 140px;">
                    <span style="width: 40px;display: inline-block;">{{$t('quality.detail.items')}}:</span>
                    <el-input
                      disabled
                      v-model="item.testitem_name"
                      style="width: 100px;"
                      size="mini"
                    ></el-input>
                  </div>
                  <div class="d2-m-10" style="width: 120px;">
                    <span style="width: 1200px;display: inline-block;line-height:28px">{{$t('quality.detail.queryList1')}}:{{item.testitem_json_tostring}}</span>
                  </div>
                  <div class="d2-m-10" style="width: 140px;">
                    <span
                      style="width: 40px;display: inline-block;"
                    >{{$t('quality.detail.testitem_fee')}}:</span>
                    <el-input v-model="item.testitem_fee" style="width: 80px;" size="mini"></el-input>
                  </div>
                  <div class="d2-m-10" style="width: 260px;">
                    <span style="width: 80px;display: inline-block;">{{$t('quality.detail.queryList2')}}:</span>
                    <el-date-picker
                      v-model="item.received_at"
                      type="datetime"
                      size="mini"
                      style="width: 180px;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </div>
                  <div class="d2-m-10" style="width: 260px;">
                    <span style="width: 80px;display: inline-block;">{{$t('quality.quality_list.stocked_at')}}:</span>
                    <el-date-picker
                      v-model="item.stocked_at"
                      type="datetime"
                      size="mini"
                      style="width: 180px;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      disabled
                    ></el-date-picker>
                  </div>
                  <div class="d2-m-10" style="width: 260px;">
                    <span style="width: 80px;display: inline-block;">{{$t('quality.quality_list.sampled_at')}}:</span>
                    <el-date-picker
                      v-model="item.sampled_at"
                      type="datetime"
                      size="mini"
                      style="width: 180px;"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      disabled
                    ></el-date-picker>
                  </div>
                  <div class="d2-m-10" style="width: 220px;">
                    <span style="width: 80px;display: inline-block;">{{$t('quality.quality_list.warehouse')}}:</span>
                    <el-input
                      v-model="item.warehouse_name"
                      style="width: 140px;"
                      size="mini"
                      disabled
                    ></el-input>
                  </div>
                  <div class="d2-m-10" style="display:flex;">
                    <span>检测备注:</span>
                    <el-input
                      type="textarea"
                      style="width: 200px;margin-left:10px;"
                      :autosize="{ minRows: 2}"
                      disabled
                      v-model="item.note">
                    </el-input>
                  </div>
                  <div class="d2-m-10" style="width: 280px;">
                    <span style="width: 80px;display: inline-block;">{{$t('quality.queryList.result')}}:</span>
                    <el-input v-model="item.result" style="width: 200px;" size="mini"></el-input>
                  </div>
                  <div class="d2-m-10" style="width: 300px;">
                    <el-upload
                      style="display: inline-block;"
                      class="upload-demo"
                      :action="upload_api"
                      :data="pramas"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      :headers="headers"
                      :before-remove="beforeRemove"
                      multiple
                      :limit="5"
                      :on-exceed="handleExceed"
                      :on-success="handleAvatarSuccess"
                      :file-list="item.fileList"
                    >
                      <el-button
                        size="mini"
                        type="primary"
                        @click="file_index(item.id,index)"
                      >{{$t('quality.detail.upload')}}</el-button>
                    </el-upload>
                  </div>
                  <div class="d2-text-left" style="width:100%;margin:10px 0 0 10px;">
                    <span style="width: 40px;display: inline-block;">{{$t('quality.quality_list.status')}}:</span>
                    <el-select
                      v-model="item.status"
                      clearable
                      filterable
                      size="mini"
                      style="width: 120px;margin: 0 10px;"
                    >
                      <el-option v-for="i in item_status" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                    <el-button type="primary" size="mini" @click="save(item)">{{$t('save')}}</el-button>
                    <span v-if="item.is_aginged==1" style="margin-left:10px;color:red;">
                      <span>已外送:</span>
                      <span>{{item.aginged_at}}</span>
                    </span>
                    <span v-else style="margin-left:10px;">
                      <el-button type="primary" size="mini" @click="delivery_(item.id)" v-if="permissions.indexOf(621)>-1">外送</el-button>
                    </span>
                  </div>
                </div>
                <div class="d2-text-left" style="margin:10px 0 0 10px">
                  <span style="width: 40px;display: inline-block;">结果:</span>
                  <el-select
                    v-model="item.check_result"
                    clearable
                    filterable
                    size="mini"
                    style="width: 120px;margin: 0 10px;"
                  >
                    <el-option v-for="i in item_check_results" :key="i.id" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                  <span>检测结果备注:</span>
                    <el-input
                      type="textarea"
                      style="width: 200px;margin: 0px 10px;"
                      v-model="item.checked_note ">
                    </el-input>
                  <el-button type="primary" size="mini" @click="save_item(item)">{{$t('save')}}</el-button>
                </div>
              </div>
            </el-card>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('quality.quality_list.id')" width="60px">
          <template slot-scope="scope">{{scope.row.id?scope.row.id:''}}</template>
        </el-table-column>
        <el-table-column align="center" label="客户及供应商" width="240px">
          <template slot-scope="scope">
            <div style="text-align:left;width:100%;">客户：{{scope.row.company_name?scope.row.company_name:''}}</div>
            <div style="text-align:left;width:100%;">供应商：{{scope.row.supplier_name?scope.row.supplier_name:''}}</div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('quality.quality_list.contact_name')"
          align="center"
          width="60"
        >
          <template slot-scope="scope">
            {{scope.row.contact_name}}
            <br />
            {{scope.row.telephone}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('quality.quality_list.name')" align="center" min-width="200px">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="CAS" align="center" width="100px">
          <template slot-scope="scope">{{scope.row.cas}}</template>
        </el-table-column>
        <el-table-column :label="$t('quality.quality_list.batchno')" align="center" width="120px">
          <template slot-scope="scope">{{scope.row.batchno}}</template>
        </el-table-column>
        <el-table-column label="纯度" align="center" width="60px">
          <template slot-scope="scope">{{scope.row.inventory?scope.row.inventory.purity:''}}</template>
        </el-table-column>
        <el-table-column :label="$t('quality.quality_list.img')" align="center" width="70">
          <template slot-scope="scope">
            <el-popover
              ref="popover"
              placement="bottom"
              width="200"
              trigger="hover">
                <img
                  v-if="scope.row.prod"
                  :src="scope.row.prod.img+'?time='+now"
                  alt
                  style="width:200px;height:200px;"
                />
              <img
                      v-if="scope.row.prod"
                      @mouseenter="show_img(now)"
                      slot="reference"
                      :src="scope.row.prod.img+'?time='+now"
                      alt
                      style="width: 60px;height:60px;"
              />
            </el-popover>

          </template>
        </el-table-column>
        <!--<el-table-column :label="$t('quality.quality_list.name')" align="center">-->
        <!--<template slot-scope="scope">{{scope.row.name}}</template>-->
        <!--</el-table-column>-->
        <el-table-column
          :label="$t('quality.quality_list.storagecondition')"
          align="center"
          width="80px"
        >
          <template slot-scope="scope">{{scope.row.storagecondition}}</template>
        </el-table-column>
        <el-table-column label="外观" align="center" width="80">
          <template slot-scope="scope">
            {{getEnumValue(ChemicalAppearance,scope.row.inventory.chemprodappearance_id)}}
          </template>
        </el-table-column>
        <el-table-column label="检测类别" align="center" min-width="60">
          <template slot-scope="scope">
            {{getEnumValue(order_classes,scope.row.class)}}
          </template>
        </el-table-column>
        <el-table-column :label="$t('quality.quality_list.status')" align="center" width="60">
          <template slot-scope="scope">{{order_status[scope.row.status].name}}</template>
        </el-table-column>
        <el-table-column label="采购备注" align="center" min-width="100">
          <template slot-scope="scope">
            {{scope.row.inventory.order?scope.row.inventory.order.purchase_requirement:''}}
          </template>
        </el-table-column>
        <el-table-column label="结果/备注" align="center" min-width="100">
          <template slot-scope="scope">
            <div>{{scope.row.result?order_result[scope.row.result].name:''}}</div>
            <div v-if="scope.row.note">
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover">
                <span>{{scope.row.note}}</span>
                <el-button slot="reference" type="text" size="small">检测备注</el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('quality.quality_list.opts')" align="center" width="80px" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.result!=1">
              <el-button
                size="mini"
                v-if="scope.row.status==0"
                type="primary"
                @click.stop="back_out(scope.row.id)"
              >{{$t('quality.quality_list.abandon')}}</el-button>
            </div>
            <div v-if="scope.row.type=='in'" style="margin-top:2px;">
              <el-button
                size="mini"
                type="primary"
                @click.stop="purity(scope.row.id)"
              >检测纯度</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :page-size="list.per_page"
        :total="list.total"
        ref="pagination"
      ></el-pagination>
    </div>
    <div v-if="dialogAdd==1">
      <orderForm @getValue="getValue($event)" @refresh="refresh()"></orderForm>
    </div>
    <div v-if="dialogAdd==2">
      <detail :datas="detail_id" @getValue="getValue($event)"></detail>
    </div>
    <el-dialog title="Add" width="80%" :visible.sync="dialogAdd_" @close='close()'>
      <el-form label-width="100px" label-position="left" style="width: 80%;margin: 0 auto;">
        <el-form-item :label="$t('quality.quality_list.items')">
          <span v-for="i in checked_items" :label="i.id" style="margin:0 5px">
            <el-checkbox v-model="i.checked" name="type" v-if="i.child.length==0">{{i.name}}</el-checkbox>
          </span> <br>
            <div v-for="i in checked_items" v-if="i.child.length!=0" style="display: inline-block;width:40%;">
              <span>{{i.name}}</span>:
              <el-checkbox
                      class="checkbox_nei"
                      v-for="j in i.child"
                      :key="j.id"
                      :label="j.id"
                      v-model="j.checked"
                      @change="select(j.id,j.checked)"
                      style="margin-left: 10px;padding-left:0px;"
              >
                <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
              </el-checkbox>
            </div>
        </el-form-item>
        <!--<el-form-item :label="$t('quality.detail.class')">-->
          <!--<el-select-->
            <!--v-model="add_item.testitem_pid"-->
            <!--@change="select_type(add_item.testitem_pid)"-->
            <!--size="mini"-->
            <!--placeholder="Please Select"-->
            <!--style="width: 200px;"-->
          <!--&gt;-->
            <!--<el-option v-for="i in itemtype" :key="i.id" :label="i.name" :value="i.id"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('quality.detail.items')">-->
          <!--<el-select-->
            <!--v-model="add_item.testitem_id"-->
            <!--@change="get_fee(add_item.testitem_id)"-->
            <!--size="mini"-->
            <!--placeholder="Please Select"-->
            <!--style="width: 200px;"-->
          <!--&gt;-->
            <!--<el-option v-for="i in items" :label="i.name" :value="i.id" :key="i.id"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item :label="$t('quality.detail.testitem_fee')">-->
          <!--<el-input size="mini" v-model="add_item.testitem_fee"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="检测备注:">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2}"
            v-model="add_item.note">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" :loading="loading" @click="add_test()">{{$t('save')}}</el-button>
        <el-button size="mini" @click="close()">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
    <!-- 放弃 -->
    <el-dialog :title="$t('quality.detail.queryList6')" :visible.sync="dialogVisible" width="30%">
      <span style="font-size:16px;">{{$t('quality.detail.queryList5')}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">{{$t('cancel')}}</el-button>
        <el-button type="primary" @click="abandon()" size="mini">{{$t('define')}}</el-button>
      </span>
    </el-dialog>
    <!-- 纯度 -->
    <el-dialog :visible.sync="dialogPurity" width="30%" @close='purityClose()'>
      <div>
        <span>纯度：</span>
        <el-input size="small" v-model="purity_data.purity" style="width:200px;"></el-input>
        <div style="text-align:right;">
          <el-button @click="purityCreat()" size="mini" type="primary">确定</el-button>
          <el-button @click="purityClose()" size="mini">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  quality_lists,
  quality_abandon,
  quality_check_create,
  quality_check_update,
  quality_check_updateResult,
  testitem,
  quality_deleteFile,
  update_purity,
  delivery
} from "@/api/quality";
import $ from "jquery";
import util from "@/libs/util";
import orderForm from "../components/form/orderForm";
import detail from "../components/detail/index";
export default {
  name: "Quality-index",
  components: {
    orderForm,
    detail
  },
  data() {
    return {
      expands: [],
      list: [],
      Users:{},
      currentPage: 1,
      purity_data:{
        id:'',
        purity:''
      },
      queryList: {
        page: "1",
        company: "",
        cas: "",
        name: "",
        batchno: "",
        result: "",
        status: "",
        sampled_status: 1,
        class:''
      },
      dialogAdd: 0,
      dialogAdd_: false,
      addForm: {
        name: "",
        name_cn: "",
        status: "1"
      },
      dialogEdit: false,
      editForm: {
        id: "",
        name: "",
        name_cn: "",
        status: ""
      },
      ChemicalType: [],
      charges: [],
      company: {
        company: "",
        contant_person: "",
        telephone: ""
      },
      prod: {
        loading: false,
        name: "",
        cas: "",
        batchno: "",
        storagecondition: "",
        warehouse: "",
        note: ""
      },
      testitem: [],
      detail_id: "",
      order_result: [],
      order_status: [],
      sampled_status: [],
      item_status: [],
      item_success: [],
      item_check_results:[],
      item_failure: [],
      dialogAdd: false,
      prod_id: "",
      detail: [],
      testitems: [],
      add_item: {
        qualityorder_id: "",
        testitem_ids: "",
        note:''
      },
      fileList: [],
      detail_id: "",
      upload_api: process.env.VUE_APP_API + "api/v1/quality/check/upload",
      item_success: [],
      itemtype: [],
      items: [],
      qualityorder_testitem_id: "",
      f_index: "",
      val: "",
      pramas: {
        qualityorder_testitem_id: ""
      },
      checked_items:[],
      order_classes:[],
      ChemicalAppearance:[],
      loading: false,
      dialogPurity:false,
      dialogVisible: false,
      abandon_id: "",
      now: new Date().getTime(),
      loading_search:false,
      permissions: JSON.parse(localStorage.getItem("permissions"))
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Quality-index") {
        testitem().then(res => {
            this.checked_items = res.data;
        });
        this.queryList.sampled_status = this.$route.query.sampled_status?this.$route.query.sampled_status:1
        if (this.$route.query.batchno) {
          this.queryList.batchno = this.$route.query.batchno;
          this.queryList.sampled_status = ''
        }
        this.queryList.class = this.$route.query.class?this.$route.query.class:''
        this.queryList.status = this.$route.query.status?this.$route.query.status:''
        this.queryList.result = this.$route.query.result?this.$route.query.result:''
        this.queryList.name = this.$route.query.name?this.$route.query.name:''
        this.queryList.cas = this.$route.query.cas?this.$route.query.cas:''
        this.queryList.company = this.$route.query.company?this.$route.query.company:''
        this.fetchData();
      }
    }
  },
  created() {
    testitem().then(res => {
        this.checked_items = res.data;
      // this.itemtype = res.enum.Testprodcate;
    });
    this.queryList.sampled_status = this.$route.query.sampled_status?this.$route.query.sampled_status:1
        if (this.$route.query.batchno) {
          this.queryList.batchno = this.$route.query.batchno;
          this.queryList.sampled_status = ''
        }
        this.queryList.class = this.$route.query.class?this.$route.query.class:''
        this.queryList.status = this.$route.query.status?this.$route.query.status:''
        this.queryList.result = this.$route.query.result?this.$route.query.result:''
        this.queryList.name = this.$route.query.name?this.$route.query.name:''
        this.queryList.cas = this.$route.query.cas?this.$route.query.cas:''
        this.queryList.company = this.$route.query.company?this.$route.query.company:''
    this.fetchData();
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.search()
      }
    }
  },
  computed: {
    headers() {
      const token = util.cookies.get("token");
      return {
        Authorization: "Bearer " + token,
        'Version-Number':process.env.VUE_APP_Version
      };
    }
  },
  methods: {
      show_dialogAdd_(id){
          this.dialogAdd_=true
          this.add_item.qualityorder_id=id
          testitem().then(res => {
              this.checked_items = res.data;
          });
      },
      delivery_(id){
        delivery(id,this)
      },
      purity(id){
        this.purity_data.id = id
        this.dialogPurity = true
      },
      purityCreat(){
        update_purity(this.purity_data,this)
      },
      purityClose(){
        this.purity_data = {
          id:'',
          purity:''
        }
        this.dialogPurity = false
      },
      select(id,checked) {
          if(checked){
              this.checked_items.forEach((items, index) => {
                  items.child.forEach((m, n) => {
                      if (id == m.id) {
                          this.$set(this.checked_items[index], "checked", true);
                      }
                  });
              });
          }else{
              this.checked_items.forEach((items, index) => {
                  items.child.forEach((m, n) => {
                      if (id == m.id) {
                          this.$set(this.checked_items[index], "checked", false);
                      }
                  });
              });
          }

      },
      select_parent() {
          this.checked_items.forEach((items, index) => {
              if (!items.checked) {
                  items.child.forEach((m, n) => {
                      m.checked = false;
                  });
              }
          });
      },
      show_img(now){
          this.now=new Date().getTime();
      },
    get_id(id, type) {
      if (type == "a") {
        this.dialogAdd = 2;
        this.detail_id = id;
      } else if (type == "b") {
        quality_abandon(id).then(res => {});
      } else if (type == "c") {
        this.dialogAdd = 2;
        this.detail_id = id;
      }
    },
    refresh() {
      this.fetchData();
    },
    back_out(id) {
      this.dialogVisible = true;
      this.abandon_id = id;
    },
    abandon() {
      quality_abandon(this.abandon_id, this);
      this.dialogVisible = false;
    },
    abandon_check() {},
    handleCommand(command) {},
    getValue(event) {
      this.dialogAdd = event;
    },
    fetchData() {
      if(util.cookies.get('page_quality')&&!this.loading_search){
          this.queryList.page = util.cookies.get('page_quality')
          this.$nextTick(() => {
              this.$refs.pagination.internalCurrentPage = Number(util.cookies.get('page_quality'));
          })
      }
      quality_lists(this.queryList).then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
          res.data.data.forEach((items, index) => {
            items.testitems_name = "";
            if(items.testitems&&items.testitems.length>0){
              items.testitems.forEach((m, n) => {
                items.testitems_name += m.testitem_name + ",";
                m.testitem_json_name = "";
                if (m.testitem_json&&typeof m.testitem_json==Array&&m.testitem_json.length>0) {
                  m.testitem_json.forEach(i => {
                    m.testitem_json_name += i.name + ",";
                  });
                }
                m.fileList = [];
                if (m.files&&m.files.length>0) {
                  m.files.forEach((mm, nn) => {
                    m.fileList.push({
                      name: mm.origin,
                      url: mm.url,
                      material_id: mm.pivot.material_id,
                      qualityorder_testitem_file_id:
                        mm.pivot.qualityorder_testitem_file_id
                    });
                  });
                }
              });
            }
          });
          
        // res.data.data.forEach((items, index) => {
        //   items.testitems.forEach((item, index) => {
        //     item.fileList = [];
        //     if (item.files) {
        //       item.files.forEach((m, n) => {
        //         item.fileList.push({
        //           name: m.origin,
        //           url: m.url,
        //           material_id: m.pivot.material_id,
        //           qualityorder_testitem_file_id:
        //             m.pivot.qualityorder_testitem_file_id
        //         });
        //       });
        //     }
        //   });
        // });
        this.list = res.data;
        this.order_result = res.enum.order_result;
        this.order_status = res.enum.order_status;
        this.sampled_status = res.enum.sampled_status;
        this.item_status = res.enum.item_status;
        this.item_check_results = res.enum.item_check_results
        this.order_classes = res.enum.order_classes
        this.ChemicalAppearance = this.GEnums.ChemicalAppearance;
        this.item_success = [];
        this.item_failure = [];
        for (var key in res.enum.item_success) {
          this.item_success.push(res.enum.item_success[key]);
        }
        for (var key in res.enum.item_failure) {
          this.item_failure.push(res.enum.item_failure[key]);
        }

      });
      this.Users = this.GEnums.Users
    },
    toggle_company() {
      $(".company .el-card__body").toggle();
    },
    search() {
      this.loading_search=true
      this.queryList.page = 1;
      this.currentPage=1
      util.cookies.set('page_quality',1)
      this.fetchData();
    },
    handleAdd() {
      this.dialogAdd = 1;
    },
    saveAdd() {
      create(this.addForm, "quality/order", this);
      this.addForm = {
        name: "",
        name_cn: "",
        status: "1"
      };
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.editForm.id = row.id;
      this.editForm.name = row.value.name;
      this.editForm.name_cn = row.value.name_cn;
      this.editForm.status = row.status;
    },
    saveEdit() {
      update(this.editForm, "quality/order", this);
    },
    handleDel(row) {
      destroy(row, "quality/order", this);
    },
    handleCurrentChange(page_current) {
      util.cookies.set('page_quality',page_current)
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    file_index(id, index) {
      this.pramas.qualityorder_testitem_id = id;
      this.f_index = index;
    },
    back() {
      this.$emit("getValue", 0);
    },
    handleRemove(file, fileList) {
      console.log(file);
      console.log(file, fileList);
      if (file.material_id) {
        quality_deleteFile(
          file.material_id,
          file.qualityorder_testitem_file_id
        ).then(res => {});
      } else {
        quality_deleteFile(
          file.response.data.material_id,
          file.response.data.qualityorder_testitem_file_id
        ).then(res => {});
      }
    },
    handlePreview(file) {
      if (file.response) {
        window.open(file.response.data.url);
      } else {
        window.open(file.url);
      }
    },
    handleExceed(files, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.warning("当前限制选择5个文件");
    },
    handleAvatarSuccess(res, file, fileList) {},
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    add_test() {
      // this.add_item.qualityorder_id = this.detail[0].id;
      this.add_item.testitem_ids=this.checked_items
      quality_check_create(this.add_item, this);
    },
    save(item) {
      quality_check_update(item, this);
    },
    save_item(item) {
      quality_check_updateResult(item, this);
    },
    add_testitem() {
      this.testitem.push({
        company_id: "",
        prod_id: "",
        code: "",
        country_code: "",
        year: "",
        rate: "",
        status: ""
      });
    },
    select_type(id) {
      let query = {
        testprodcate_id: id
      };
      testitem(query).then(res => {
        this.items = res.data.data;
      });
    },
    get_fee(name) {
      this.items.forEach((items, index) => {
        if (items.id == name) {
          this.add_item.testitem_fee = items.fee;
        }
      });
    },
    toggle_testitem() {
      $(".testitem .el-card__body").toggle();
    },
    rowClick(row, event, column) {
      Array.prototype.remove = function(val) {
        let index = this.indexOf(val);
        if (index > -1) {
          this.splice(index, 1);
        }
      };
      if (this.expands.indexOf(row.id) < 0) {
        this.expands.push(row.id);
      } else {
        this.expands.remove(row.id);
      }
    },
    close(){
      this.dialogAdd_ = false
      this.add_item= {
        qualityorder_id: "",
        testitem_ids: "",
        note:''
      }
      this.checked_items=[]
    },
  }
};
</script>
