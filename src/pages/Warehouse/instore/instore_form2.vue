<style lang="scss" scoped type="text/scss">
/deep/ table {
  width: 100%;
  border-collapse: collapse;
  .el-input__inner {
    border: 0px;
  }
  td,th {
    padding: 5px;
    line-height: 30px;
    font-size: 14px;
    // text-align: center;
    .el-input__inner{
      padding: 0px;
    }
  }
  th{
    background-color: #f2f2f2;
  }
  textarea {
    border: none;
  }
}
/deep/.data{
      .el-input__inner {
        padding: 0px 15px;
      }
      .el-input__prefix {
        left: -8px;
      }
    }
/deep/.none {
  .el-input__suffix-inner {
    display: none;
  }
}
.el-icon-video-play:before {
  height: 32px;
  line-height: 32px;
}
.el-icon-video-pause:before{
  height: 32px;
  line-height: 32px;
}
.el_form {
        .item_heard {
            background: #f1f1f1;
            margin: 0px;
            .el-button {
                color: black;
            }
        }
    }
    .item1 {
        margin-bottom: 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0;
    }
</style>
<template>
  <d2-container>
    <el-form class="el_form">
      <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
        <tr>
          <th class="td" width="120px;">合同编号</th>
          <th class="td" width="120">CAS</th>
          <th class="td" width="120">采购数量</th>
          <th class="td" width="120">纯度</th>
          <th class="td" width="120">包装等级/危险性</th>
          <th class="td" width="120">产品特殊性</th>
          <th class="td" width="120">性状外观</th>
          <th class="td" width="120">来货包装</th>
          <th class="td" width="120">存储条件</th>
          <!-- <th class="td">存储条件(多选)</th> -->
          <th class="td" width="120">批号</th>
        </tr>
        <tr>
          <td>{{data.purchase_contract?data.purchase_contract.contract_number:''}}</td>
          <td>{{data.cas}}</td>
          <td>{{data.quantity}}{{units[data.quantity_unit]?units[data.quantity_unit].name:''}}</td>
          <td>{{data.purity}}</td>
          <td>
            {{data.chemprod&&data.chemprod.property?data.chemprod.property.packinggroup:''}}
            <br />
            {{data.chemprod&&data.chemprod?data.chemprod.uncode:''}}
          </td>
          <td>{{data.chemprod&&data.chemprod.property?data.chemprod.property.specificity:''}}</td>
          <td>
            <el-select
              clearable
              filterable
              v-model="instore.chemprodappearance_id"
              size="mini"
              style="width: 100%;"
            >
              <el-option
                v-for="item in ChemicalAppearance"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </td>
          <td>
            <el-select
              clearable
              v-model="instore.in_virtualunit_id"
              size="mini"
              style="width: 100%;"
              filterable
            >
              <el-option
                v-for="item in virtualunits"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </td>
          <!-- <td class="none">
            <el-select
              clearable
              size="mini"
              style="width: 140px;"
              v-model="instore.storagecondition_id"
              placeholder
            >
              <el-option
                v-for="item in StorageCondition"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </td> -->
          <td>
            <el-select
              clearable
              size="mini"
              style="width: 120px;"
              v-model="instore.storage_cond"
              multiple
              placeholder
            >
              <el-option
                v-for="item in StorageCondition"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </td>
          <td>
            <el-input size="mini" v-model="instore.batchno"></el-input>
          </td>
        </tr>
      </table>
      <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
        <tr>
          <th class="td" width="120">
            <span style="color: red;">*</span>入库数量
          </th>
          <th class="td" width="120">单位</th>
          <th class="td" width="120">生产日期</th>
          <th class="td" width="120">
            <span style="color: red;">*</span>有效期
          </th>
          <th class="td" width="120">
            <span style="color: red;">*</span>仓库
          </th>
          <th class="td" width="120">货位</th>
<!--          <th class="td" width="120">净重</th>-->
          <th class="td" width="120">
            <span style="color: red;">*</span>毛重
          </th>
          <!-- <th class="td" width="120">
            <span style="color: red;">*</span>毛重单位
          </th> -->
          <th class="td" width="120">
            <div style="line-height:15px;">
              <span style="color: red;">*</span>包装数量<br>
               <span style="color: red;font-size:12px;">格式:10g*10+25g*4</span>
            </div>

          </th>
        </tr>
        <tr>
          <td >
            <el-input size="small" v-model="instore.quantity"></el-input>

            <!-- <span
              v-if="data.view_inventory_purchase_total&&data.view_inventory_purchase_total.unit_id != data.quantity_unit"
            >(已入)</span> -->
          </td>
          <td>
            <el-select clearable v-model="instore.unit_id" size="mini" style="width: 100%;" disabled>
              <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </td>
          <td class="data">
            <el-date-picker
              size="mini"
              type="date"
              style="width: 100%;"
              v-model="instore.manufactured_at"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
          <td class="data">
            <el-date-picker
              size="mini"
              type="date"
              style="width: 100%;"
              v-model="instore.expired_at"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </td>
          <td>
            <el-select
              placeholder="仓库"
              clearable
              v-model="instore.warehouse_id"
              @change="warehouse_change()"
              size="mini"
              style="width: 100%;"
            >
              <el-option
                v-for="item in enum_warehouse"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </td>
          <td>
            <el-autocomplete
              v-model="instore.shelf"
              :fetch-suggestions="querySearch_shelf"
              placeholder="请输入内容"
              size="mini"
              :trigger-on-focus="true"
              @select="handleSelect_shelf_a"
              clearable
            >
              <template slot-scope="{ item }">
                <div>{{ item }}</div>
              </template>
            </el-autocomplete>
          </td>
<!--          <td>{{data.quantity}}{{units[data.quantity_unit]?units[data.quantity_unit].name:''}}</td>-->
          <td style="display:flex;min-width: 180px;">
            <el-input size="small" v-model="instore.netweightinfo"></el-input>
            <i style="cursor: pointer;" @click="stop" :class="stop_Socket?'el-icon-video-play':'el-icon-video-pause'"></i>
          </td>
          <!-- <td>
            <el-select
              clearable
              v-model="instore.netweight_unit_id"
              size="mini"
              style="width: 100%;"
            >
              <el-option v-for="item in units" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </td> -->
          <td>
            <el-input size="small" v-model="instore.packinginfo"></el-input>
          </td>
        </tr>
      </table>
      <table border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
        <tr>
          <th class="td"><span style="color:red;">*</span>是否是样品</th>
          <th class="td">供应商批号</th>
          <th class="td">快递单号</th>
          <th class="td">快递费用</th>
          <th class="td">备注</th>
        </tr>
        <tr>
          <td>
            <el-select
                    placeholder=""
                    v-model="instore.is_sample"
                    size="mini"
                    style="width: 100%;"
                    disabled
                    @change="is_sample_change(instore.is_sample)"
            >
              <el-option
                      v-for="item in is_sample_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
              ></el-option>
            </el-select>
          </td>
          <td>
            <el-input size="small" v-model="instore.supplier_batchno"></el-input>
          </td>
          <td>
            <el-input size="small" v-model="instore.express_number"></el-input>
          </td>
          <td>
            <el-input size="small" v-model="instore.express_fee"></el-input>
          </td>
          <td>
            <el-input type="textarea" rows="1" v-model="instore.note"></el-input>
          </td>
        </tr>
        <tr>
          <td><b>分析备注:</b></td>
          <td colspan="4">{{data.checked_requirement}}</td>
        </tr>
        <tr>
          <td><b>采购备注:</b></td>
          <td colspan="4">{{data.purchase_requirement}}</td>
        </tr>
      </table>
      <div style="margin: 20px 0px;" >
            <el-form-item class="item_heard">
                <el-button type="text" icon="el-icon-arrow-down" size="small">
                    <b>分装</b>
                </el-button>
                <el-button style="float: right;margin: 7px 7px 0 0;color: white;" type="primary" size="mini"
                            @click="add()">{{$t('add')}}
                </el-button>
            </el-form-item>
            <el-form-item>
              <table border="1" bordercolor="#E5E5E5" v-if="packages.length>0" style="width:auto;margin-top:10px;">
                <tr>
                  <th width='100'>大小</th>
                  <th width='80'><span style="color:red;">*</span>单位</th>
                  <th width='100'>份数</th>
                  <th width='100'>库位</th>
                  <th width='100'>操作</th>
                </tr>
                <tr v-for="(item,index) in packages">
                  <td>
                    <el-input v-model="item.packsize" size="mini"></el-input>
                  </td>
                  <td>
                    <el-select
                                clearable
                                v-model="item.unit_id"
                                size="mini"
                                style="width: 100%;"
                        >
                            <el-option
                                    v-for="item in units"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                  </td>
                  <td>
                    <el-input v-model="item.stock" size="mini"></el-input>
                  </td>
                  <td>
                    <el-autocomplete
                      v-model="item.shelf"
                      :fetch-suggestions="querySearch_shelf"
                      placeholder="请输入内容"
                      size="mini"
                      :trigger-on-focus="true"
                      @select="handleSelect_shelf"
                      @focus="select_index(index)"
                      clearable
                    >
                      <template slot-scope="{ item }">
                        <div>{{ item }}</div>
                      </template>
                    </el-autocomplete>
                  </td>
                  <td align='center'>
                    <el-button type="primary" @click="print_g(item)" size="mini">打印</el-button>
                    <el-button type="danger" size="mini" @click="del(index)">刪除</el-button>
                  </td>
                </tr>
              </table>
            </el-form-item>
      </div>
      <div style="display:flex;justify-content: flex-end;">
        <table
          border="1"
          bordercolor="#E5E5E5"
          style="margin: 5px 0;width: 600px;"
          v-if="show_testitems==1&&Object.keys(checked_items).length>0"
        >
          <tr >
            <td colspan="2" style="background:#598EBB;color:white !important;">测试项目</td>
          </tr>
          <tr style="color:#71A074;">
            <td style="text-align:left;">
              <span v-for="items in test_item" :key="items.id">
                <span v-for="(value,key,index) in checked_items">
                  <span v-if="items.id==key" class="d2-ml-5">{{items.name}}:
                    <span v-for="item in value">
                      <span v-for="c in items.child">
                          <span v-if="item==c.id">
                            {{c.name}},
                          </span>
                      </span>
                    </span>
                    <br>
                  </span>
                </span>
              </span>
            </td>
            <td v-if="testitems.length>0">
              <el-checkbox v-model="checked_all" @change="select_all" style="margin-right: 10px;"></el-checkbox>
              <span>全选</span>
            </td>
          </tr>
          <!-- <tr>
            <td colspan="2">备注:{{data.checked_requirement}}</td>
          </tr> -->
        </table>
      </div>
      <!-- <el-button type="primary" @click="save_sample" size="mini" style="float: right;right: 0;">取样</el-button> -->
      <el-form-item style="text-align:right;">
        <el-button type="primary" @click="print()" size="mini">打印</el-button>
        <el-button type="primary" size="mini" @click="save_instore()" :loading="save_fy">保存</el-button>
        <el-button @click="close()" size="mini">关闭</el-button>
      </el-form-item>
      <!-- <div style="margin-bottom: 20px;" >
            <el-form-item class="item_heard">
                <el-button type="text" icon="el-icon-arrow-down" size="mini">
                    <b>分装</b>
                </el-button>
                <el-button style="float: right;margin: 7px 7px 0 0;color: white;" type="primary" size="mini"
                            @click="add()">{{$t('add')}}
                </el-button>
            </el-form-item>
            <el-form-item>
                <div class="item1" v-for="(item,index) in packages">
                    <div class="d2-m-10" style="width: 100px;">
                        <p>大小</p>
                        <el-input v-model="item.packsize" size="mini"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 100px;">
                        <p><span style="color:red;">*</span>单位</p>
                        <el-select
                                clearable
                                v-model="item.unit_id"
                                size="mini"
                                style="width: 100px;"
                        >
                            <el-option
                                    v-for="item in units"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 100px;">
                        <p>份数</p>
                        <el-input v-model="item.stock" size="mini"></el-input>
                    </div>
                    <div style="position: relative;">
                        <div style="position: absolute;bottom: 10px;width: 200px;">
                            <el-button type="primary" size="mini" @click="save_pack(item)">保存</el-button>
                            <el-button type="danger" size="mini" @click="del(index)">刪除</el-button>
                        </div>
                    </div>
                </div>
            </el-form-item>
      </div> -->
    </el-form>

  </d2-container>
</template>
<script>
import {
  detail,
  instore,
  sample_create,
  pack_create,
  getShevies
} from '@/api/instore'
import $ from 'jquery'
import { futureDate,getDate } from '@/utils/index'
import { mapState, mapActions } from "vuex";
import util from '@/libs/util'
import Echo from 'laravel-echo'
window.io = require('socket.io-client')
export default {
  name: "Warehouse-instore_form2",
  data () {
    return {
      save_fy:false,
      show1: true,
      show2: true,
      show3: true,
      is_sample_show: true,
      index: '',
      data: {},
      show_testitems:'',
      instore: {
        id: '',
        quantity: '',
        unit_id: '',
        purity: '',
        manufactured_at: '',
        expired_at: '',
        batchno: '',
        in_virtualunit_id: '',
        storagecondition_id: '',
        storage_cond:[],
        chemprodappearance_id: '',
        specificity: '',
        packinginfo: '',
        warehouse_id: '',
        shelf: '',
        netweightinfo: '',
        // netweight_unit_id: '',
        express_fee: '',
        express_number: '',
        is_sample: 2
      },
      warehouse_shelf:[],
      sample: {
        saler_contract_id: '',
        procurement_contract_id: '',
        inventory_id: '',
        batchno: '',
        testitems: [],
        checked_requirement: ''
      },
      test_item: [],
      enum_warehouse: [],
      warehouse: [],
      checked_items: [],
      units: [],
      is_sample_list: [],
      ChemicalAppearance: [],
      StorageCondition: [],
      virtualunits: [],
      switch_value: true,
      // packages: {
      //   inventory_id: "",
      //   subpackage: [
      //     {
      //       inventory_id: "",
      //       packsize: "",
      //       unit_id: "",
      //       packnumber: 1,
      //       stock: "",
      //       virtualunit_id: ""
      //     }
      //   ]
      // },
      packages: [
        // {
        //   // inventory_id: '',
        //   packsize: '',
        //   unit_id: '',
        //   // packnumber: 1,
        //   stock: '',
        //   // virtualunit_id: '',
        //   shelf: ''
        // }
      ],
      inventory_id: '',
      packing_requirement: '',
      has_id: false,
      checked_all: true,
      ids: [],
      testitems:[],
      stop_Socket:false,
      ws:'',
      useID:''
    }
  },
  // props: ['datas','express_number','v_stock','is_sample'],
   watch: {
    $route(to, from) {
      if (to.name == "Warehouse-instore_form2") {
        this.useID = this.$route.query.id
        if(this.$route.query.id){
          // this.fetchData()
        }
      }
    },
    useID(to,form){
      if(to&&to!=form&&form){
        this.fetchData()
      }
    },
   'instore.manufactured_at'(newValue, oldValue) {
       this.instore.expired_at = futureDate(getDate(this.instore.manufactured_at), 730)
   }
  },
  created () {
      if(this.$route.query.id){
          this.ws = new WebSocket("ws://127.0.0.1:5678/")
          this.fetchData()
          this.useID = this.$route.query.id
    }
  },
  methods: {
    ...mapActions('d2admin/page',['closeAdd']),
    is_sample_change (is_sample) {
      if (is_sample == 1) {
        this.is_sample_show = false
      } else {
        this.is_sample_show = true
      }
    },
    select_all () {
      this.ids = []
      for (var i in this.testitems) {
        if (this.checked_all) {
          this.testitems[i].checked = true
          this.ids.push(this.testitems[i].id)
        } else {
          this.ids = []
          this.testitems[i].checked = false
        }
      }
    },
    select_one (checked, id) {
      if (checked) {
        this.ids.push(id)
      } else {
        this.ids.forEach((items, index) => {
          if (items == id) {
            this.ids.splice(index, 1)
          }
        })
      }
      let num = 0
      for (var i in this.testitems) {
        if (this.testitems[i].checked) {
          num++
        }
      }
      if (num == this.testitems.length) {
        this.ids = []
        this.checked_all = true
        for (var i in this.testitems) {
          this.ids.push(this.testitems[i].id)
        }
        // this.testitems.forEach((items, index) => {
        //     this.ids.push(items.id)
        // })
      } else {
        this.checked_all = false
      }
    },
    warehouse_change(){
      this.warehouse_shelf = []
      this.instore.shelf = ''
      getShevies(this.instore.warehouse_id).then(res => {
        if(res.data){
          for (var i in res.data) {
            this.warehouse_shelf.push(res.data[i])
          }
        }
      })
    },
    querySearch_shelf (queryString, cb) {
      var restaurants = this.warehouse_shelf
      var results = queryString ? restaurants.filter(i=>{return i.toString().indexOf(queryString)>-1}) : restaurants;
      cb(results)
    },
    select_index (index) {
      this.index = index
    },
    handleSelect_shelf (item) {
      this.packages[this.index].shelf = item
    },
    handleSelect_shelf_a (item) {
      this.instore.shelf = item
    },
    add () {
      // if (this.packages[0]) {
      //   this.packages.push({
      //     // inventory_id: '',
      //     packsize: '',
      //     unit_id: parseInt(this.data.quantity_unit),
      //     // packnumber: 1,
      //     stock: '',
      //     // virtualunit_id: '',
      //     shelf: this.instore.shelf
      //   })
      // } else {
        this.packages.push({
          // inventory_id: '',
          packsize: '',
          unit_id: parseInt(this.data.quantity_unit),
          // packnumber: 1,
          stock: '',
          // virtualunit_id: '',
          shelf: this.instore.shelf
        })
      // }
    },
    del (index) {
      this.packages.splice(index, 1)
    },
    print_g(item){
      var storage_cond = ''
      if(this.instore.storage_cond&&this.instore.storage_cond.length>0){
        this.instore.storage_cond.forEach((i,index)=>{
          if(index!=(this.instore.storage_cond.length-1)){
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)+'、'
          }else{
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)
          }
        })
      }
      let data = {
        批号: this.instore.batchno,
        存储条件:storage_cond,
        外观: this.instore.chemprodappearance_id
          ? this.getEnumValue(this.ChemicalAppearance,this.instore.chemprodappearance_id)
          : '',
        数量: item.packsize+this.getEnumValue(this.units, item.unit_id),
        货架: item.shelf,
        份数:item.stock,
        CAS: this.instore.cas,
        configID: 1
      }
      $.ajax({
        url: 'http://127.0.0.1:8080/mac/batchPrint.jsp',
        method: 'post',
        data: data,
        success: function (res) {
          if (res && res.code == 0) {
            this.$message({
              message: 'success',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        },
        error: function () {},
      })
    },
    print () {
      var storage_cond = ''
      if(this.instore.storage_cond&&this.instore.storage_cond.length>0){
        this.instore.storage_cond.forEach((i,index)=>{
          if(index!=(this.instore.storage_cond.length-1)){
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)+'、'
          }else{
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)
          }
        })
      }

      let data = {
        批号: this.instore.batchno,
        存储条件:storage_cond,
        外观: this.instore.chemprodappearance_id
          ? this.getEnumValue(this.ChemicalAppearance,this.instore.chemprodappearance_id)
          : '',
        数量: this.instore.quantity+this.getEnumValue(this.units, this.instore.unit_id),
        货架: this.instore.shelf,
        CAS: this.instore.cas,
        id: this.instore.batchno,
        configID: 1
      }
      $.ajax({
        url: 'http://127.0.0.1:8080/mac/codePrint.jsp',
        method: 'post',
        data: data,
        success: function (res) {
          if (res && res.code == 0) {
            this.$message({
              message: 'success',
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        },
        error: function () {},
      })
    },
    save_instore () {
      // this.sample.testitems = this.ids;
      // this.packages.inventory_id = this.inventory_id;
      var arr = []
      this.packages.forEach((m, n) => {
        // m.inventory_id = this.inventory_id
        if (m.packsize && m.unit_id && m.stock) {
          arr.push(m)
        }
      })
      // this.packages = arr
      this.instore.packages = arr
      if (this.show_testitems==1&&JSON.stringify(this.checked_items)!=='[]') {
          if(this.checked_all){
              this.instore.testitems =  this.checked_items
          }else{
              this.instore.testitems =  []
          }
      }
      instore(this.instore, this)
    },
    save_sample () {
      this.sample.testitems = this.ids
      sample_create(this.sample, this)
    },
    save_pack () {
      this.packages.inventory_id = this.inventory_id
      pack_create(this.packages, this)
    },
    check (item) {
      item.status = !item.status
      if (item.status) {
        this.sample.testitems.push(item.id)
      } else {
        this.sample.testitems.forEach((items, index) => {
          if (items.id === item.id) {
            this.sample.testitems.splice(index, 1)
          }
        })
      }
    },
    close () {
      // this.$emit('FormClose', false)
      let  that=this
        that.$router.push({
        path: "/Warehouse/instore/index",
        name: "Warehouse-instore"
      });
      var tagName = 'Warehouse-instore_form2'
      that.closeAdd({tagName})
    },
    stop(){
        let that=this
        if(!that.stop_Socket){
            that.ws.close();
            that.instore.netweightinfo=''
            that.stop_Socket=true
        }else{
            that.ws = new WebSocket("ws://127.0.0.1:5678/")
            that.ws.onmessage = function(evt) {
                that.stop_Socket=false
                const items = JSON.parse(evt.data);
                var output = []
                for (var x in items){
                    output[x] = items[x];
                }
                var buffer = Buffer.from(output);
                if(buffer.length==10){
                    that.instore.netweightinfo=buffer.toString()
                }
            };
        }
    },
    fetchData () {
      var is_sample = {
        is_sample:this.$route.query.is_sample
      }
      this.data = {}
      this.instore={
        id: '',
        quantity: '',
        unit_id: '',
        purity: '',
        manufactured_at: '',
        expired_at: '',
        batchno: '',
        in_virtualunit_id: '',
        storagecondition_id: '',
        storage_cond:[],
        chemprodappearance_id: '',
        specificity: '',
        packinginfo: '',
        warehouse_id: '',
        shelf: '',
        netweightinfo: '',
        express_fee: '',
        express_number: '',
        is_sample: 2
      },
      this.packages = []
      detail(this.$route.query.id,is_sample).then(res => {
        this.show_testitems = res.data.show_testitems
        if (res.data.detail) {
          this.instore.id = this.$route.query.id
          this.instore.is_sample = Number(this.$route.query.is_sample)
          this.instore.express_number = this.$route.query.express_number
          if(this.$route.query.v_stock){
            this.instore.warehouse_id=9
          }else{
            this.instore.warehouse_id=1
          }
          this.data = res.data.detail
          this.instore.quantity = res.data.detail.view_inventory_purchase_total
            ? Number(res.data.detail.quantity) -
              Number(
                res.data.detail.view_inventory_purchase_total.stock
                  ? res.data.detail.view_inventory_purchase_total.stock
                  : 0
              )
            : Number(res.data.detail.quantity)
          // this.instore.netweight_unit_id = parseInt(
          //   res.data.detail.quantity_unit
          // )
          // this.packages[0].unit_id = parseInt(res.data.detail.quantity_unit)
          this.instore.cas = res.data.detail.cas
          this.instore.purity = res.data.detail.purity
          this.instore.unit_id = Number(res.data.detail.quantity_unit)
          this.instore.batchno = res.data.batchnumber
          this.instore.specificity = res.data.detail.chemprod.property?res.data.detail.chemprod.property.specificity:''
          // this.instore.specificity = res.data.detail.chemprod && res.data.detail.chemprod ? res.data.detail.chemprod.specificity
          //   : ''
          // this.instore.storagecondition_id = res.data.detail.chemprod && res.data.detail.chemprod ? res.data.detail.chemprod.storagecondition_id
          //   : ''
          // if(res.data.detail.storagecondition){
          //   for(var i in res.enum.StorageCondition){
          //     if(res.enum.StorageCondition[i].name == res.data.detail.storagecondition){
          //       this.instore.storagecondition_id = Number(i)
          //     }
          //   }
          // }else{
          //   this.instore.storagecondition_id = res.data.detail.chemprod?res.data.detail.chemprod.property.storagecondition_id:''
          // }
          //
          this.instore.storagecondition_id = res.data.detail.chemprod.storage_cond_id
          this.instore.storage_cond = res.data.detail.chemprod.storage_cond?res.data.detail.chemprod.storage_cond:[]
          this.instore.chemprodappearance_id = res.data.detail.chemical_appearance_id?res.data.detail.chemical_appearance_id:''
          if (res.data.detail.production_date) {
            this.instore.manufactured_at = res.data.detail.production_date
            this.instore.expired_at = futureDate(res.data.detail.production_date, 730)
          } else {
            this.instore.manufactured_at = getDate(this.instore.manufactured_at)
            console.log(this.instore.manufactured_at)
            this.instore.expired_at = futureDate(getDate(this.instore.manufactured_at), 730)
          }
          this.sample.batchno = res.data.batchnumber
          this.sample.checked_requirement = res.data.detail.checked_requirement
          this.sample.saler_contract_id = res.data.detail.purchase_contract
            .sales_contract
            ? res.data.detail.purchase_contract.sales_contract.id
            : ''
          this.sample.procurement_contract_id = res.data.detail
            .purchase_contract
            ? res.data.detail.purchase_contract.id
            : ''
          this.packing_requirement = res.data.detail.packing_requirement
          this.enum_warehouse = res.enum.warehouse
          this.test_item=res.enum.test_item
          this.warehouse = []
          for (var i in res.enum.warehouse) {
            this.warehouse.push(res.enum.warehouse[i])
          }
          if (this.warehouse.length == 1) {
            this.instore.warehouse_id = this.warehouse[0].id
          }
          for (var i in res.enum.testitems) {
            res.enum.testitems[i].checked = true
          }
          this.testitems = []
          for (var i in res.data.detail.checked_items) {
            this.ids.push(parseInt(i))
          }
          this.ids.forEach(index => {
            for (var i in res.enum.test_item) {
              if (res.enum.test_item[i].id == index) {
                this.testitems.push(res.enum.test_item[i])
              }
            }
          })
          this.select_all()
          this.warehouse_change()
          // this.testitems = res.enum.testitems;
          this.ChemicalAppearance = []
          obj(this.ChemicalAppearance,res.enum.ChemicalAppearance)
          this.StorageCondition = res.enum.StorageCondition
          this.units = res.enum.units
          this.is_sample_list = res.enum.is_sample
          this.virtualunits = res.enum.virtualunits
          this.sample.testitems = res.data.detail.checked_items
          this.checked_items = res.data.detail.checked_items
          this.ChemicalAppearance.sort(
            function compareFunction(param1, param2) {
              return param1.name.localeCompare(param2.name);
            }
          );
        }
      })
        let that=this
        that.ws.onmessage = function(evt) {
            that.stop_Socket=false
            const items = JSON.parse(evt.data);
            var output = []
            for (var x in items){
                output[x] = items[x];
            }
            var buffer = Buffer.from(output);
            if(buffer.length==10){
                that.instore.netweightinfo=buffer.toString()
            }
        };
    }
  }
}
function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
}
</script>
