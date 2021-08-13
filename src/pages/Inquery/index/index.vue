<style lang="scss"  type="text/scss">
.add {
  margin-bottom: 15px;
}

.el-pagination {
  text-align: right;
}

.l_h80 {
  // height: 80px;
  // line-height: 80px;
}

.l_h20 {
  height: 25px;
  line-height: 25px;
  font-size: 13px;
}

.l_h40 {
  height: 40px;
  line-height: 40px;
}

.t_left {
  text-align: left;
}

.border_t {
  border-top: 1px solid #f2f2f2;
}

.img {
  width: 20px;
  vertical-align: middle;
  margin: 0 5px;
}
.el-popover {
  left: 200px !important;
  width: calc(100% - 240px);
}
.text {
  margin-top: 20px;
  table {
    width: 100%;
    margin: 10px 0px;
    border-collapse: collapse;
    td {
      padding-left: 5px;
      span {
        margin-right: 5px;
      }
    }
  }
  .div {
    display: flex;
    align-items: center;
    border-top: 1px solid #e5e5e5;
    padding-top: 10px;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .el-button {
        margin-right: 10px;
      }
    }
  }
}
</style>
<template>
  <d2-container>
    <div class="inquery">
      <el-form>
        <el-row>
          <el-col :span="1.5" style="margin-top:4px;">
            <el-button type="primary" size="mini" @click="add">{{$t('create')}}</el-button>
            <el-button type="primary" size="mini" @click="import_go">{{$t('import')}}</el-button>
          </el-col>
          <el-col :span="22" class="d2-text-right">
            <el-input
              v-model="queryList.keywords"
              style="width: 180px;margin:2px;"
              size="mini"
              clearable
              :placeholder="$t('Inquery.index.keywords')"
            ></el-input>
            <el-date-picker
              v-model="queryList.date_from"
              size="mini"
              style="width: 123px;margin-left:5px;"
              type="date"
              value-format="yyyy-MM-dd"
              :placeholder="$t('Inquery.index.date_from')"
            ></el-date-picker>
            <el-date-picker
              v-model="queryList.date_to"
              style="width: 123px;margin-right:5px;"
              size="mini"
              type="date"
              value-format="yyyy-MM-dd"
              :placeholder="$t('Inquery.index.date_to')"
            ></el-date-picker>
            <el-select
              v-model="queryList.country_code"
              clearable
              filterable
              size="mini"
              style="width: 100px;margin:5px;"
              :placeholder="$t('Inquery.index.country_code')"
            >
              <el-option v-for="(i,index) in country" :key="index" :label="i.Name" :value="i.Code"></el-option>
            </el-select>
            <el-select
              v-model="queryList.customer"
              filterable
              clearable
              remote
              size="mini"
              reserve-keyword
              :placeholder="$t('Inquery.index.customer')"
              :remote-method="remoteMethod"
              :loading="loading"
              style="width: 190px;margin:5px;"
            >
              <el-option v-for="item in customer" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select
              v-model="queryList.resource_id"
              clearable
              filterable
              size="mini"
              style="width: 100px;margin:5px;"
              :placeholder="$t('Inquery.index.resource_id')"
            >
              <el-option v-for="(i,index) in resources" :key="index" :label="i.name" :value="i.id"></el-option>
            </el-select>
            <el-select
              v-model="queryList.user_id"
              clearable
              filterable
              size="mini"
              style="width: 90px;margin:5px;"
              :placeholder="$t('Inquery.index.user_id')"
            >
              <el-option v-for="(i,index) in users" :key="index" :label="i.name" :value="i.id"></el-option>
            </el-select>
            <el-select
              v-model="queryList.assignsaler_id"
              clearable
              filterable
              size="mini"
              style="width: 90px;margin:5px;"
              :placeholder="$t('Inquery.index.assignsaler_id')"
            >
              <el-option v-for="(i,index) in sellers" :key="index" :label="i.name" :value="i.id"></el-option>
            </el-select>
            <el-select
              v-model="queryList.status"
              clearable
              filterable
              size="mini"
              style="width: 100px;margin:5px;"
              :placeholder="$t('Inquery.index.status')"
            >
              <el-option
                v-for="(i,index) in InquiryStatus"
                :key="index"
                :label="i.name"
                :value="i.id"
              ></el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="search">{{$t('search')}}</el-button>
            <!--<el-button type="primary" size="mini" @click="dialogAdd=1">{{$t('create')}}</el-button>-->
            <!--<el-button type="primary" size="mini" @click="dialogAdd=2">{{$t('import')}}</el-button>-->

            <!--<el-button type="primary" size="mini" @click="search">{{$t('Inquery.index.sale_order')}}-->
            <!--</el-button>-->
          </el-col>
        </el-row>
      </el-form>
      <div v-for="(item,index) in list.data" class="d2-mt-10" style="font-size: 14px;">
        <el-card class="text" style="background: #d6f1f7;">
          <div>
            <table border="1" bordercolor="#E5E5E5" style="background: #fff;">
              <tr style="font-weight: 600;">
                <td>ID</td>
                <td>CAS</td>
                <td>中文名称</td>
                <td>英文名称</td>
                <td>需求</td>
                <td>备注</td>
              </tr>
              <tr>
                <td style="width:50px;">{{item.id}}</td>
                <td style="width:90px;">{{item.cas}}</td>
                <td>{{item.name_cn}}</td>
                <td>{{item.name ? item.name : ''}}</td>
                <td style="width:80px;">{{item.specification}}*{{item.quantity}}</td>
                <td style="width:100px;">{{item.note}}</td>
              </tr>
            </table>
            <table border="1" bordercolor="#E5E5E5" style="background: #fff;">
              <tr>
                <td>客户</td>
                <td>客户联系人</td>
                <td>等级</td>
                <td>来源</td>
                <td>国家</td>
                <td>销售</td>
                <td>录入</td>
                <td>采购</td>
              </tr>
              <tr>
                <td>{{item.customer ? item.customer.name : ''}}</td>
                <td>{{item.customer_contact ? item.customer_contact.name : ''}}</td>
                <td>{{item.customer ? item.customer.level_id : ''}}</td>
                <td>{{item.resource?item.resource.name:''}}</td>
                <td>{{item.customer ? item.customer.country_code : ''}}</td>
                <td>
                  <div>{{item.assignsaler ? item.assignsaler.name:''}}</div>
                  <div>
                    <div v-if="item.outprice">
                      <span style="display: inline-block">{{$t('Inquery.index.success')}}</span>
                      <span>{{item.outprice ? item.outprice.updated_at : ''}}</span>
                    </div>
                    <div v-else>未报</div>
                  </div>
                </td>
                <td>
                  <div>{{item.user?item.user.name:''}}</div>
                  <div>{{item.user?item.user.created_at:''}}</div>
                </td>
                <td>
                  <div>{{item.purchaseuser ? item.purchaseuser.name:''}}</div>
                  <div>
                    <span>{{$t('Inquery.index.success')}}{{item.price_status1}}</span>
                    <span>{{$t('Inquery.index.priceing')}}{{item.price_status0}}</span>
                    <span
                      v-if="item.quotes.length>0"
                      style="display: inline-block"
                    >{{item.quotes[0].created_at}}</span>
                  </div>
                </td>
              </tr>
            </table>
            <div class="div" style="border: none;padding-top: 0px;">
              <div style="margin-right: 20px;">
                <el-popover placement="top-start" title width="300" trigger="hover">
                  <img
                    v-if="item.chemprod"
                    :src="item.chemprod.img"
                    :id="index"
                    alt
                    style="width: 300px;"
                  />
                  <img
                    slot="reference"
                    v-if="item.chemprod"
                    src="/image/module/ben.png"
                    class="img"
                    alt
                  />
                </el-popover>
                <el-tooltip
                  v-if="item.chemprod&&item.chemprod.status==1"
                  class="item"
                  effect="dark"
                  content="Product information has been reviewed"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <img src="/image/module/check.png" class="img" alt />
                </el-tooltip>
                <el-tooltip
                  v-if="item.chemprod&&item.chemprod.property"
                  class="item"
                  effect="dark"
                  :content="'storagecondition:'+item.chemprod.property.storagecondition+',trancondition:'+item.chemprod.property.trancondition"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <img src="/image/module/warn.png" class="img" alt />
                </el-tooltip>
                <!-- <el-tooltip
                  v-if="item.chemprod&&item.chemprod.is_advantage==1"
                  class="item"
                  effect="dark"
                  content="优势产品"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <img src="/image/module/spellcheck.png" class="img" alt />
                </el-tooltip>-->
                <el-tooltip
                  class="supplier"
                  effect="dark"
                  content="可供货的供应商"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <el-popover placement="bottom" width="250" trigger="click">
                    <el-table :data="suppliers">
                      <el-table-column width="250" property="company.name" label="可供货的供应商"></el-table-column>
                    </el-table>
                    <img
                      slot="reference"
                      src="/image/module/supplier.png"
                      class="img"
                      @click="get_supplier(item.cas)"
                      alt
                    />
                  </el-popover>
                </el-tooltip>
                <el-tooltip
                  v-if="item.prodreminds.length>0"
                  class="item"
                  effect="dark"
                  :content="item.prodreminds_name"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <img src="/image/module/notice.png" class="img" alt />
                </el-tooltip>

                <el-tooltip
                  v-if="item.chemprod&&item.chemprod.is_advantage == 1"
                  class="item"
                  effect="dark"
                  content="优势产品"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <img src="image\module\ResponsibleLevel.png" class="img" alt />
                </el-tooltip>
                <el-tooltip
                  v-if="item.chemprod&&item.chemprod.is_secret == 1"
                  class="item"
                  effect="dark"
                  content="保密产品"
                  placement="top"
                  style="padding: 0 0 !important;"
                >
                  <img src="image\module\PayBank.png" class="img" alt />
                </el-tooltip>
              </div>
              <div>
                <!--采购报价-->
                <el-popover placement="bottom" trigger="click">
                  <form1 v-if="id==item.id" :datas="id" :time="time" @refresh="refresh"></form1>
                  <el-button
                    slot="reference"
                    @click="get_id(item.id,item)"
                    size="mini"
                  >{{$t('Inquery.index.g')}}</el-button>
                </el-popover>
                <!--销售报价-->
                <el-popover placement="bottom-start" trigger="click">
                  <form2
                    v-if="id==item.id"
                    :datas="id"
                    :time="time"
                    @refresh="refresh"
                    @get_html="get_html($event)"
                  ></form2>
                  <el-button
                    slot="reference"
                    @click="get_id(item.id)"
                    size="mini"
                  >{{$t('Inquery.index.h')}}</el-button>
                </el-popover>
                <!--默认图谱-->
                <el-button
                  v-if="!item.atlas"
                  slot="reference"
                  @click="creatAtlas(item.id,item.atlas)"
                  size="mini"
                >{{$t('Inquery.index.a')}}</el-button>
                <el-button
                  v-if="item.atlas"
                  type="text"
                  slot="reference"
                  @click="creatAtlas(item.id,item.atlas)"
                  size="mini"
                >已有默认图谱</el-button>
                <!--默认coa-->
                <el-button
                  slot="reference"
                  @click="creatCoa(item.id,item.coa)"
                  size="mini"
                  style="margin:0px 0px;"
                >{{$t('Inquery.index.b')}}</el-button>
                <!--默认msds-->
                <el-button
                  slot="reference"
                  @click="creatMsds(item.id,item.msds)"
                  size="mini"
                >{{$t('Inquery.index.c')}}</el-button>
                <!--生成订单-->
                <el-popover placement="bottom-start" trigger="click">
                  <form3 v-if="id==item.id" :datas="customer_id" :id="id" :time="time"></form3>
                  <el-button
                    slot="reference"
                    @click="get_customer_id(item.id,item.customer.id)"
                    size="mini"
                  >{{$t('Inquery.index.i')}}</el-button>
                </el-popover>
                <!--放弃-->
                <el-col v-if="item.cancel_reason_id" style="cursor: pointer;">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="InquiryCancelReason[item.cancel_reason_id].name"
                    placement="top"
                    style="padding: 0 0 !important;"
                  >
                    <span style="color: red;margin-right:10px;">{{$t('Inquery.index.j')}}</span>
                  </el-tooltip>
                </el-col>
                <el-button
                  v-if="!item.cancel_reason_id"
                  style="margin-right:0px;"
                  @click="get_Abandon_id(item.id)"
                  size="mini"
                >{{$t('Inquery.index.o')}}</el-button>
                <!--预占批号-->
                <el-col v-if="item.prebatch_no" style="cursor: pointer;">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.prebatch_no"
                    placement="top"
                    style="padding: 0 0 !important;"
                  >
                    <span style="color: red;margin-left:10px;">{{$t('Inquery.index.l')}}</span>
                  </el-tooltip>
                </el-col>
                <el-button v-if="!item.prebatch_no" @click="get_inquiry_id_ph(item.id)" size="mini">{{$t('Inquery.index.m')}}</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <el-pagination
        class="d2-mt"
        background
        :page-size="list.per_page"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="prev, pager, next"
        :total="list.total"
      ></el-pagination>
    </div>
    <el-dialog title="指派采购" :visible.sync="dialogVisible" width="25%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="指派采购">
          <el-select v-model="purchaseuser_id" clearable filterable size="mini" placeholder="采购员">
            <el-option v-for="(i,index) in purchases" :key="index" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_purchases">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="放弃" :visible.sync="dialogVisible_abandon" width="25%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="放弃原因" :required="true">
          <el-select v-model="cancel_reason_id" clearable filterable size="mini" placeholder="放弃原因">
            <el-option
              v-for="(i,index) in InquiryCancelReason"
              :key="index"
              :label="i.name"
              :value="i.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_abandon = false">取 消</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save_abandon">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('Inquery.index.n')" :visible.sync="dialogVisible_ph" width="25%">
      <el-form label-width="80px" label-position="left">
        <el-form-item :label="$t('Inquery.index.n')" :required="true">
          <el-input v-model="prebatch_no" size="mini"></el-input>
          <el-button
            size="mini"
            type="primary"
            @click="generatePrebatchNo()"
          >{{$t('Inquery.index.n')}}</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_ph = false">{{$t('cancel')}}</el-button>
        <el-button
          size="mini"
          type="primary"
          :loading="loading"
          @click="save_prebatch_no"
        >{{$t('save')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="dialogVisible_updateAtlas" width="40%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="上传文件">
          <el-upload
            style="display: inline-block;margin-left: 45px;"
            class="upload-demo"
            :action="upload_api"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headers"
            :before-remove="beforeRemove"
            multiple
            :on-exceed="handleExceed"
            :on-success="handleAvatarSuccess_updateAtlas"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-table
          v-if="Atlas.length>0"
          :data="Atlas"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
          size="small"
        >
          <el-table-column align="center" label="文件名">
            <template slot-scope="scope">
              <a :href="scope.row.filename">{{scope.row.origin}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" label="Options">
            <template slot-scope="scope">
              <template>
                <el-button size="mini" type="danger" @click="handleDel_Atlas(scope.$index)">Delete</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_updateAtlas = false">{{$t('cancel')}}</el-button>
        <el-button
          size="mini"
          type="primary"
          :loading="loading"
          @click="save_updateAtlas"
        >{{$t('save')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="dialogVisible_updateCoa" width="40%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="上传文件">
          <el-upload
            style="display: inline-block;margin-left: 45px;"
            class="upload-demo"
            :action="upload_api"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headers"
            :before-remove="beforeRemove"
            multiple
            :on-exceed="handleExceed"
            :on-success="handleAvatarSuccess_updateCoa"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table
        v-if="coa.length>0"
        :data="coa"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        size="small"
      >
        <el-table-column align="center" label="文件名">
          <template slot-scope="scope">
            <a :href="scope.row.filename">{{scope.row.origin}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Options">
          <template slot-scope="scope">
            <template>
              <el-button size="mini" type="danger" @click="handleDel_Coa(scope.$index)">Delete</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_updateCoa = false">{{$t('cancel')}}</el-button>
        <el-button
          size="mini"
          type="primary"
          :loading="loading"
          @click="save_updateCoa"
        >{{$t('save')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="上传文件" :visible.sync="dialogVisible_updateMsds" width="40%">
      <el-form label-width="80px" label-position="left">
        <el-form-item label="上传文件">
          <el-upload
            style="display: inline-block;margin-left: 45px;"
            class="upload-demo"
            :action="upload_api"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :headers="headers"
            :before-remove="beforeRemove"
            multiple
            :on-exceed="handleExceed"
            :on-success="handleAvatarSuccess_updateMsds"
            :show-file-list="false"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table
        v-if="Msds.length>0"
        :data="Msds"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
        size="small"
      >
        <el-table-column align="center" label="文件名">
          <template slot-scope="scope">
            <a :href="scope.row.filename">{{scope.row.origin}}</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="Options">
          <template slot-scope="scope">
            <template>
              <el-button size="mini" type="danger" @click="handleDel_Msds(scope.$index)">Delete</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible_updateMsds = false">{{$t('cancel')}}</el-button>
        <el-button
          size="mini"
          type="primary"
          :loading="loading"
          @click="save_updateMsds"
        >{{$t('save')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog title="邮件模板" :visible.sync="dialog">
      <div v-html="html"></div>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  inquiry_lists,
  country_list,
  customer_lists,
  ProdProvidedCompanies,
  assignedPurchase,
  markAbandon,
  generatePrebatchNo,
  savePrebatchNo,
  updateAtlas,
  updateCoa,
  updateMsds
} from "@/api/Inquery";
import $ from "jquery";
import form1 from "../comments/form1";
import form2 from "../comments/form2";
import form3 from "../comments/form3";
import add from "./add";
import imports from "./imports";
import util from "@/libs/util";
export default {
  name: "Inquery-index",
  components: {
    form1,
    form2,
    form3,
    add,
    imports
  },
  data() {
    return {
      html: "",
      time: "",
      dialog: false,
      id: "",
      customer_id: "",
      list: [],
      currentPage: 1,
      queryList: {
        page: "1",
        keywords: "",
        customer: "",
        date_from: "",
        date_to: "",
        country_code: "",
        resource_id: "",
        user_id: "",
        assignsaler_id: "",
        cancel_reason_id: ""
      },
      dialogVisible: false,
      dialogVisible_abandon: false,
      dialogVisible_ph: false,
      dialogVisible_updateAtlas: false,
      dialogVisible_updateCoa: false,
      dialogVisible_updateMsds: false,
      Atlas: [],
      coa: [],
      Msds: [],
      Atlas_id: "",
      Coa_id: "",
      Msds_id: "",
      purchaseuser_id: "",
      cancel_reason_id: "",
      dialogAdd: 0,
      ChemicalType: [],
      order_result: [],
      order_status: [],
      InquiryCancelReason: [],
      InquiryStatus: [],
      resources: [],
      sellers: [],
      users: [],
      units: [],
      country: [],
      customer: [],
      purchases: [],
      loading: false,
      prebatch_no: "",
      upload_api: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/uploadFile",
      fileList: [],
      suppliers: []
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Inquery-index'){
          this.fetchData(this.queryList);
        }
    }
  },
  created() {
    // this.queryList.date_from = new Date();
    // this.queryList.date_to = new Date();
    this.fetchData(this.queryList);
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
      fetchData() {
          inquiry_lists(this.queryList).then(res => {
              res.data.data.forEach((items, index) => {
                  items.price_status0 = 0;
                  items.price_status1 = 0;
                  items.quotes.forEach((m, n) => {
                      if (m.status == 0) {
                          items.price_status0 += 1;
                      } else if (m.status == 1) {
                          items.price_status1 += 1;
                      }
                  });
                  if (items.chemprod) {
                      if (items.chemprod.img) {
                          items.chemprod.img =
                              items.chemprod.img.substr(0, 4).toLowerCase() == "http"
                                  ? items.chemprod.img
                                  : process.env.VUE_APP_API + items.chemprod.img;
                      }
                      if (items.chemprod.property) {
                          items.chemprod.property.storagecondition = items.chemprod.property
                              .storagecondition_id
                              ? res.enum.StorageCondition[
                                  items.chemprod.property.storagecondition_id
                                  ].name
                              : "";
                          items.chemprod.property.trancondition = items.chemprod.property
                              .trancondition_id
                              ? res.enum.Trancondition[
                                  items.chemprod.property.trancondition_id
                                  ].name
                              : "";
                      }
                  }
                  items.prodreminds_name = "";
                  if (items.prodreminds.length > 0) {
                      items.prodreminds.forEach((m, n) => {
                          if (m.reminds) {
                              items.prodreminds_name += m.reminds.title + " ";
                          }
                      });
                  }
              });
              this.list = res.data;
              this.InquiryCancelReason = res.enum.InquiryCancelReason;
              this.InquiryStatus = res.enum.InquiryStatus;
              this.resources = res.enum.resources;
              this.sellers = res.enum.sellers;
              this.users = res.enum.users;
              this.units = res.enum.units;
              this.purchases = res.enum.purchases;
          });
          country_list().then(res => {
              this.country = res.data;
          });
          // member_company().then(res=>{
          //     this.customer=res.data
          // })
      },
      get_html(e) {
      this.html = e;
      this.dialog = true;
    },
    add() {
      this.$router.push({
        path: "/Inquery/add",
        name: "Inquery-add",
      });
    },
    import_go() {
      this.$router.push({
        path: "/Inquery/import",
        name: "Inquery-import",
      });
    },
    get_supplier(cas) {
      let obj = {
        cas: cas
      };
      ProdProvidedCompanies(obj).then(res => {
        this.suppliers = res.data;
      });
    },
    creatAtlas(id, Atlas) {
      if (Atlas == null) {
        Atlas = [];
      }
      this.Atlas_id = id;
      this.Atlas = Atlas;
      this.dialogVisible_updateAtlas = true;
    },
    creatCoa(id, Coa) {
      if (Coa == null) {
        Coa = [];
      }
      this.Coa_id = id;
      this.coa = Coa;
      this.dialogVisible_updateCoa = true;
    },
    creatMsds(id, Msds) {
      if (Msds == null) {
        Msds = [];
      }
      this.Msds_id = id;
      this.Msds = Msds;
      this.dialogVisible_updateMsds = true;
    },
    save_updateAtlas() {
      let obj = {
        inquiry_id: this.Atlas_id,
        atlas: this.Atlas
      };
      updateAtlas(obj, this);
    },
    save_updateCoa() {
      let obj = {
        inquiry_id: this.Coa_id,
        coa: this.coa
      };
      updateCoa(obj, this);
    },
    save_updateMsds() {
      let obj = {
        inquiry_id: this.Msds_id,
        msds: this.Msds
      };
      updateMsds(obj, this);
    },
    generatePrebatchNo() {
      generatePrebatchNo().then(res => {
        this.prebatch_no = res.data;
      });
    },
    save_prebatch_no() {
      let obj = {
        inquiry_id: this.id,
        prebatch_no: this.prebatch_no
      };
      savePrebatchNo(obj, this).then();
    },
    save_purchases() {
      this.dialogVisible = false;
      let obj = {
        inquiry_id: this.id,
        purchaseuser_id: this.purchaseuser_id
      };
      assignedPurchase(obj, this);
    },
    save_abandon() {
      this.dialogVisible_abandon = false;
      let obj = {
        inquiry_id: this.id,
        cancel_reason_id: this.cancel_reason_id
      };
      markAbandon(obj, this);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.customer = res.data;
              this.loading = false;
          });
        }, 200);
      } else {
        this.customer = [];
      }
    },
    search() {
      this.fetchData();
    },
    refresh() {
      this.fetchData();
    },
    get_id(id, item) {
      this.id = id;
      this.time = new Date().getTime();
      this.fetchData();
    },
    get_customer_id(id, customer_id) {
      this.id = id;
      this.time = new Date().getTime();
      this.customer_id = customer_id;
    },
    get_inquiry_id(id, purchaseuser_id) {
      this.dialogVisible = true;
      this.id = id;
      this.purchaseuser_id = purchaseuser_id;
    },
    get_inquiry_id_ph(id) {
      this.prebatch_no = "";
      this.dialogVisible_ph = true;
      this.id = id;
    },
    get_Abandon_id(id) {
      this.dialogVisible_abandon = true;
      this.id = id;
    },
    getValue(event) {
      this.dialogAdd = event;
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.warning("当前限制选择5个文件");
    },
    handleAvatarSuccess_updateAtlas(res, file, fileList) {
      if (file.response.code == 0) {
        this.Atlas.push({
          filename: res.data.filename,
          origin: res.data.origin
        });
      } else {
        this.$message.error(file.response.msg);
      }
    },
    handleAvatarSuccess_updateCoa(res, file, fileList) {
      if (file.response.code == 0) {
        this.coa.push({
          filename: res.data.filename,
          origin: res.data.origin
        });
      } else {
        this.$message.error(file.response.msg);
      }
    },
    handleAvatarSuccess_updateMsds(res, file, fileList) {
      if (file.response.code == 0) {
        this.Msds.push({
          filename: res.data.filename,
          origin: res.data.origin
        });
      } else {
        this.$message.error(file.response.msg);
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleDel_Atlas(index) {
      this.Atlas.forEach((items, i) => {
        if (index == i) {
          this.Atlas.splice(i, 1);
        }
      });
    },
    handleDel_Coa(index) {
      this.coa.forEach((items, i) => {
        if (index == i) {
          this.coa.splice(i, 1);
        }
      });
    },
    handleDel_Msds(index) {
      this.Msds.forEach((items, i) => {
        if (index == i) {
          this.Msds.splice(i, 1);
        }
      });
    }
  }
};
</script>


