<style lang="scss" scoped type="text/scss">
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

    p {
        margin: 5px 0;
        height: 20px;
        line-height: 20px;
    }
</style>
<template>
    <d2-container>
        <el-form class="el_form">
            <div style="margin-bottom:20px;">
                <el-form-item class="item_heard">
                    <el-button type="text" icon="el-icon-arrow-down" @click="show1 = !show1" size="mini">
                        <b>入库</b>
                    </el-button>
                </el-form-item>
                <el-form-item v-if="show1">
                    <div class="item1">
                        <div class="d2-m-10" style="width: 100px;">
                            <p><span style="color:red;">*</span>入库数量</p>
                            <el-input size="small" v-model="instore.quantity"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 100px;">
                            <p>单位</p>
                            <el-select
                                    clearable
                                    v-model="instore.unit_id"
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
                            <p>纯度</p>
                            <el-input size="mini" v-model="instore.purity"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>生产日期</p>
                            <el-date-picker
                                    size="mini"
                                    type="date"
                                    style="width: 140px;"
                                    v-model="instore.manufactured_at"
                                    value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>有效期</p>
                            <el-date-picker
                                    size="mini"
                                    type="date"
                                    style="width: 140px;"
                                    v-model="instore.expired_at"
                                    value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                        <!-- <div class="d2-m-10" style="width: 140px;">
                            <p>用途</p>
                            <el-input size="mini"></el-input>
                        </div> -->
                        <div class="d2-m-10" style="width: 120px;">
                            <p>批次</p>
                            <el-input size="small" v-model="instore.batchno"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>产品外观</p>
                            <el-select
                                    clearable
                                    size="mini"
                                    style="width: 150px;"
                                    v-model="instore.chemprodappearance_id"
                            >
                                <el-option
                                        v-for="item in ChemicalAppearance"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>来货包装</p>
                            <el-select
                                    placeholder="仓库"
                                    clearable
                                    v-model="instore.in_virtualunit_id"
                                    size="mini"
                                    style="width: 140px;"
                            >
                                <el-option
                                        v-for="item in virtualunits"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>仓库</p>
                            <el-select
                                    placeholder="仓库"
                                    clearable
                                    v-model="instore.warehouse_id"
                                    size="mini"
                                    style="width: 140px;"
                            >
                                <el-option
                                        v-for="item in enum_warehouse"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>货位</p>
                            <el-input size="small" v-model="instore.shelf"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>存储条件</p>
                            <el-select
                                    clearable
                                    size="mini"
                                    style="width: 140px;"
                                    v-model="instore.storagecondition_id"
                            >
                                <el-option
                                        v-for="item in StorageCondition"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span> 毛重</p>
                            <el-input size="small" v-model="instore.netweight"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p><span style="color:red;">*</span>毛重单位</p>
                            <el-select
                                    clearable
                                    v-model="instore.netweight_unit_id"
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
                        <div class="d2-m-10" style="width: 140px;">
                            <p>快递单号</p>
                            <el-input size="small" v-model="instore.express_number"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>快递费用</p>
                            <el-input size="small" v-model="instore.express_fee"></el-input>
                        </div>
                        <div class="d2-m-10" style="width: 140px;">
                            <p>产品特殊性</p>
                            <el-input size="small" v-model="instore.specificity"></el-input>
                        </div>
                        <div class="d2-m-10">
                            <p>备注</p>
                            <el-input type="textarea" :rows="2" v-model="instore.note"></el-input>
                        </div>
                    </div>
                    <div style="text-align:right;margin:20px;">
                        <el-button type="primary" @click="print()" size="mini">打印</el-button>
                        <el-button type="primary" size="mini" @click="save_instore()">保存</el-button>
                        <el-button @click="close()" size="mini">取消</el-button>
                    </div>
                </el-form-item>
            </div>
            <div style="margin-bottom: 20px;" v-if="has_id">
                <el-form-item class="item_heard">
                    <el-button type="text" icon="el-icon-arrow-down" @click="show2 = !show2" size="mini">
                        <b>取样</b>
                    </el-button>
                </el-form-item>
                <el-form-item v-if="show2">
                    <div v-for="item in sample.testitems" :key="item.id" style="display: inline-block;margin-left: 10px;">
                        <el-checkbox   @change="check(item)">
                            {{testitems[item].name}}
                        </el-checkbox>
                    </div>
                    <div>
                        其他要求：{{sample.checked_requirement}}
                    </div>
                    <div style="text-align:right;margin:20px;">
                        <el-button type="primary" size="mini" @click="save_sample">保存</el-button>
                    </div>
                </el-form-item>
            </div>
            <div style="margin-bottom: 20px;" >
                <el-form-item class="item_heard">
                    <el-button type="text" icon="el-icon-arrow-down" @click="show3 = !show3" size="mini">
                        <b>分装</b>
                    </el-button>
                    <el-button style="float: right;margin: 7px 7px 0 0;color: white;" type="primary" size="mini"
                               @click="add">{{$t('add')}}
                    </el-button>
                </el-form-item>
                <el-form-item v-if="show3">
                    <div class="item1" v-for="(item,index) in subpackage" :key="index">
                        <div class="d2-m-10" style="width: 100px;">
                            <p>大小</p>
                            <el-input v-model="item.packsize" size="small"></el-input>
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
                        <!--<div class="d2-m-10" style="width: 100px;">-->
                            <!--<p>数量</p>-->
                            <!--<el-input v-model="item.stock" size="small"></el-input>-->
                        <!--</div>-->
                        <div class="d2-m-10" style="width: 100px;">
                            <p>份数</p>
                            <el-input v-model="item.stock" size="small"></el-input>
                        </div>
                        <!--<div class="d2-m-10" style="width: 100px;">-->
                            <!--<p>包装单位</p>-->
                            <!--<el-select-->
                                    <!--clearable-->
                                    <!--size="mini"-->
                                    <!--style="width: 100px;"-->
                                    <!--v-model="item.virtualunit_id"-->
                            <!--&gt;-->
                                <!--<el-option-->
                                        <!--v-for="item in virtualunits"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.id"-->
                                <!--&gt;</el-option>-->
                            <!--</el-select>-->
                        <!--</div>-->
                        <div style="position: relative;">
                            <div style="position: absolute;bottom: 10px;width: 200px;">
                                <el-button type="primary" size="mini" @click="save_pack(item)">保存</el-button>
                                <el-button type="danger" size="mini" @click="del(index)">刪除</el-button>
                            </div>
                        </div>
                    </div>
                    <div>分装要求:{{packing_requirement}}</div>
                </el-form-item>
            </div>
        </el-form>
    </d2-container>
</template>
<script>
import { detail, instore, sample_create, pack_create } from '@/api/instore'
import { futureDate } from '@/utils/index'
import $ from 'jquery'
export default {
  data () {
    return {
      show1: true,
      show2: true,
      show3: true,
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
        chemprodappearance_id: '',
        specificity: '',
        warehouse_id: '',
        shelf: '',
        netweight: '',
        netweight_unit_id: '',
        express_fee: '',
        express_number: ''
      },
      sample: {
        saler_contract_id: '',
        procurement_contract_id: '',
        inventory_id: '',
        batchno: '',
        testitems: [],
        checked_requirement: ''
      },
      enum_warehouse: [],
      checked_items: [],
      units: [],
      ChemicalAppearance: [],
      StorageCondition: [],
      virtualunits: [],
      switch_value: true,
      subpackage: [{
        inventory_id: '',
        packsize: '',
        unit_id: '',
        packnumber: 1,
        stock: '',
        virtualunit_id: ''
      }],
      inventory_id: '',
      packing_requirement: '',
      has_id: false
    }
  },
  props: ['datas'],
  created () {
    this.fetchData()
  },
  methods: {
    add () {
      this.subpackage.push({
        inventory_id: '',
        packsize: '',
        unit_id: '',
        packnumber: '',
        stock: '',
        virtualunit_id: ''
      })
    },
    del (index) {
      this.subpackage.splice(index, 1)
    },
    print () {
      let data = {
        批号: this.instore.batchno,
        外观: this.instore.chemprodappearance_id ? this.ChemicalAppearance[this.instore.chemprodappearance_id].name : '',
        数量: this.instore.quantity,
        货架: this.instore.shelf,
        CAS: this.instore.cas,
        id: this.instore.batchno,
        configID: 1
      }
      $.ajax({
        url: 'http://127.0.0.1:8080/mac/codePrint.jsp',
        method: 'post',
        data:data,
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
      instore(this.instore, this)
    },
    save_sample () {
      sample_create(this.sample, this)
    },
    save_pack (item) {
      item.inventory_id = this.inventory_id
      pack_create(item, this)
    },
    check (item) {
      item.status = !item.status
      if (item.status) {
        this.sample.testitems.push(item.id)
      } else {
        this.sample.testitems.forEach((items, index) => {
          if (items.id == item.id) {
            this.sample.testitems.splice(index, 1)
          }
        })
      }
    },
    close () {
      this.$emit('FormClose', false)
    },
    fetchData () {
      detail(this.datas.id).then(res => {
        this.instore.id = this.datas.id
        this.instore.quantity = res.data.detail.quantity
        this.instore.cas = res.data.detail.cas
        this.instore.purity = res.data.detail.purity
        this.instore.unit_id = Number(res.data.detail.quantity_unit)
        this.instore.batchno = res.data.batchnumber
        this.instore.specificity = res.data.detail.chemprod.property ? res.data.detail.chemprod.property.specificity : ''
        this.instore.storagecondition_id = res.data.detail.chemprod.property ? res.data.detail.chemprod.property.storagecondition_id : ''
        this.instore.chemprodappearance_id = res.data.detail.chemprod.property ? res.data.detail.chemprod.property.chemprodappearance_id : ''
        var d = new Date()
        var y1 = d.getFullYear()
        var m1 = d.getMonth() + 1
        var d1 = d.getDate()
        if (m1 < 10) {
          m1 = '0' + m1
        }
        if (d1 < 10) {
          d1 = '0' + d1
        }
        this.instore.manufactured_at = y1 + '-' + m1 + '-' + d1
        this.instore.expired_at = futureDate(y1 + '-' + m1 + '-' + d1, 90).split(' ')[0]
        console.log(this.instore.expired_at)
        this.sample.batchno = res.data.batchnumber
        this.sample.checked_requirement = res.data.detail.checked_requirement
        this.sample.saler_contract_id = res.data.detail.purchase_contract.sales_contract ? res.data.detail.purchase_contract.sales_contract.id : ''
        this.sample.procurement_contract_id = res.data.detail.purchase_contract ? res.data.detail.purchase_contract.id : ''
        this.packing_requirement = res.data.detail.packing_requirement
        this.enum_warehouse = res.enum.warehouse
        this.testitems = res.enum.testitems
        this.ChemicalAppearance = res.enum.ChemicalAppearance
        this.StorageCondition = res.enum.StorageCondition
        this.units = res.enum.units
        this.virtualunits = res.enum.virtualunits
        // for (var i in res.data.detail.checked_items) {
        //     this.sample.items[i] = {
        //         testitem_id: res.data.detail.checked_items[i],
        //         status: false,
        //     }
        // }
        this.sample.testitems = res.data.detail.checked_items
        this.checked_items = res.data.detail.checked_items
      })
    }
  }
}
</script>
