<style lang="scss" scoped type="text/scss">
.form_title {
  background: #f1f1f1;
  margin-top: 10px;
  .el-button {
    color: black;
  }
}
.el-form-item {
  margin-bottom: 0px;
}
.cas_css{
  background: #FFCE45;
  /deep/.el-input__inner{
    background: #FFCE45;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  /deep/ .el-input__inner {
    border: none;
  }
  td {
    padding: 0px 5px;
    line-height: 24px;
    .el-select {
      width: 100%;
    }
  }
  .td_x {
    /deep/.el-input__inner {
      border: 1px solid #dcdfe6;
      border-radius: 0px;
    }
  }
}
.checkbox{
  /deep/.el-checkbox{
    margin-right: 5px;
    .el-checkbox__label{
      padding-left: 5px;
    }
  }
  
}
</style>

<template>
  <d2-container>
    <div>
      <el-form label-width="0px">
        <el-form-item class="form_title">
          <el-button @click="form_show1 = !form_show1" type="text" icon="el-icon-arrow-down">
            <b>基础信息</b>
          </el-button>
        </el-form-item>
        <el-form-item v-show="form_show1">
          <table border="1" bordercolor="#E5E5E5">
            <tr>
              <td colspan="2"><span style="color:red;">*</span>中文名称</td>
              <td colspan="2"><span style="color:red;">*</span>英文名称</td>
              <td colspan="2">
                <div style="display:flex;justify-content: space-between;align-items: center;">
                  <span>IUPAC Name</span>
                  <el-button
                    v-if="iupac_name"
                    class="btn-text can-hover"
                    type="text"
                    @click="iupac_change"
                  >
                    <d2-icon name="exchange" style="font-size: 16px;" />
                  </el-button>
                </div>
              </td>
              <td colspan="2">InChI</td>
            </tr>
            <tr>
              <td colspan="2">
                <el-input size="mini" v-model="name_cn"></el-input>
              </td>
              <td colspan="2">
                <el-input size="mini" v-model="name"></el-input>
              </td>
              <td colspan="2">
                <el-input size="mini" v-model="iupac_name"></el-input>
              </td>
              <td colspan="2">
                <el-input size="mini" v-model="inchi"></el-input>
              </td>
            </tr>
            <tr>
              <td colspan="2">中文别名</td>
              <td colspan="2">英文别名</td>
              <td colspan="2">
                <div style="display:flex;justify-content: space-between;align-items: center;">
                  <span>SMILES</span>
                  <el-button
                    v-if="smiles"
                    class="btn-text can-hover"
                    type="text"
                    @click="smiles_change"
                  >
                    <d2-icon name="exchange" style="font-size: 16px;" />
                  </el-button>
                </div>
              </td>
              <td colspan="2">InChI Key</td>
            </tr>
            <tr>
              <td colspan="2">
                <el-input size="mini" v-model="name_cn_alias"></el-input>
              </td>
              <td colspan="2">
                <el-input size="mini" v-model="name_alias"></el-input>
              </td>
              <td colspan="2">
                <el-input size="mini" v-model="smiles"></el-input>
              </td>
              <td colspan="2">
                <el-input size="mini" v-model="inchi_key"></el-input>
              </td>
            </tr>
            <tr>
              <td><span style="color:red;">*</span>CAS</td>
              <td>MDL</td>
              <td>MF</td>
              <td>MW</td>
              <td>ID1</td>
              <td>ID2</td>
              <td>ID3</td>
              <td><span style="color:red;">*</span> 产品分类</td>
            </tr>
            <tr>
              <td>
                <el-input size="mini" v-model="cas"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="mdl"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="mf"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="mw"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="productid1" disabled></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="productid2"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="productid3" disabled></el-input>
              </td>
              <td>
                <el-select v-model="chemicalcate_id" filterable size="mini">
                  <el-option
                    v-for="(i,index) in ChemicalType"
                    :key="index"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>标签</td>
              <td>保质期(天)</td>
              <td>库存预警重量</td>
              <td>提前n天通知复验(天)</td>
              <td>国内运输条件</td>
              <td>国外运输条件</td>
              <td>储藏条件</td>
              <td rowspan="6" class="d2-text-center">
                <el-image style="width: 90%; height: 90%" :src="img+'?'+now" fit="fill"></el-image>
              </td>
            </tr>
            <tr>
              <td class="checkbox">
                <el-checkbox v-model="s_advantage" @change="advantage()">{{$t('product.basis.is_advantage')}}</el-checkbox>
                <el-checkbox v-model="s_secret" @change="secret()">{{$t('product.basis.is_secret')}}</el-checkbox>
              </td>
              <td class="td_x">
                <el-input-number
                  v-model="expired_interval"
                  :min="0"
                  :max="1000000"
                  label="请输入"
                  size="mini"
                ></el-input-number>
              </td>
              <td>
                <el-input v-model="notice_size" size="mini" autocomplete="off"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="pre_notice_check"></el-input>
              </td>
              <td>
                <el-select v-model="inland_trancond_id" clearable size="mini">
                  <el-option
                    v-for="item in Trancondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="abroad_trancond_id" clearable size="mini">
                  <el-option
                    v-for="item in Trancondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="property.storagecondition_id" clearable size="mini">
                  <el-option
                    v-for="item in StorageCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td>海关编码</td>
              <td>产品销售负责人</td>
              <td>采购第一负责人</td>
              <td>采购第二负责人</td>
              <td>新建产品人员</td>
              <td>审核状态</td>
              <td>审核时间</td>
            </tr>
            <tr>
              <td v-if="this.$route.query.id" class="cas_css">
                <el-input size="mini" v-model="hscode"></el-input>
              </td>
              <td v-else>
                <el-input size="mini" v-model="hscode"></el-input>
              </td>
              <td>
                <el-select v-model="sale_charge1" size="mini" clearable>
                  <el-option
                    v-for="item in sale_charges"
                    :disabled="item.id==disabled_sale_charge1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="purchase_charge1" size="mini" clearable>
                  <el-option
                    v-for="item in charges1"
                    :disabled="item.id==disabled_purchase_charge1"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="purchase_charge2" size="mini" clearable>
                  <el-option
                    v-for="item in charges2"
                    :disabled="item.id==disabled_purchase_charge2"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="user_id" size="mini" disabled clearable>
                  <el-option
                    v-for="item in Users"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>{{getEnumValue(prod_statuses,status)}}</td>
              <td>
                <el-input size="mini" v-model="verified_at" disabled></el-input>
              </td>
            </tr>

            <tr>
              <td colspan="7">产品提示</td>
            </tr>
            <tr>
              <td colspan="7">
                <el-select v-model="reminds" multiple size="mini">
                  <el-option
                    v-for="item in Prodremind"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item class="form_title">
          <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
            <b>库存定价</b>
          </el-button>
        </el-form-item>
        <el-form-item v-show="form_show2">
          <table border="1" bordercolor="#E5E5E5">
            <tr>
              <td>规格</td>
              <td>纯度</td>
              <td>警戒线</td>
              <td>库存数量</td>
              <td>国内定价（RMB）</td>
              <td>国外定价（USD）</td>
              <td>备注</td>
              <td width="80">
                操作
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="add_inventory"></el-button>
              </td>
            </tr>
            <tr v-for="(item,index) in spec" :key="index">
              <td class="td_x">
                <div style="display:flex;align-items: center;">
                  <!-- <el-input size="mini" style="width: 100px;" v-model="item.pack_size"></el-input> -->
                  <el-select v-model="item.pack_size" size="mini" style="width: 80px;" placeholder="" clearable @change="pack_change(item.pack_size,index)">
                    <el-option v-for="(i,index) in CommonSpec" :key="i" :label="i" :value="i"></el-option>
                  </el-select>
                  <el-select v-model="item.pack_unit_id" size="mini" style="width: 80px;" placeholder="" clearable>
                    <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </div>
              </td>
              <td>
                <el-input size="mini" v-model="item.purity" @change="purity_change(item.purity,index)"></el-input>
              </td>
              <td class="td_x">
                <div style="display:flex;align-items: center;">
                  <el-input
                    v-model="item.notice_size"
                    size="mini"
                    autocomplete="off"
                    style="width: 100px;"
                  ></el-input>
                  <el-select v-model="item.notice_unit_id" size="mini" style="width: 80px;" placeholder="">
                    <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </div>
              </td>
              <td class="td_x">
                <div style="display:flex;align-items: center;">
                  <el-input
                    v-model="item.stock"
                    size="mini"
                    autocomplete="off"
                    style="width: 100px;"
                  ></el-input>
                  <el-select v-model="item.stock_unit_id" size="mini" style="width: 80px;" placeholder="">
                    <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
                  </el-select>
                </div>
              </td>
              <td>
                <el-input size="mini" v-model="item.inland_price"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.abroad_price"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.note"></el-input>
              </td>
              <td>
                <el-button
                  type="primary"
                  icon="el-icon-minus"
                  size="mini"
                  @click="del_inventory(index)"
                ></el-button>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item class="form_title">
          <el-button @click="form_show4 = !form_show4" type="text" icon="el-icon-arrow-down">
            <b>检测项</b>
          </el-button>
        </el-form-item>
        <el-form-item v-show="form_show4">
          <table border="1" bordercolor="#E5E5E5">
            <tr>
              <td>检测项目</td>
              <td>指标</td>
              <td>指标值</td>
              <td>检测费用</td>
              <td>备注</td>
              <td width="80">
                操作
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="add_test"></el-button>
              </td>
            </tr>
            <tr v-for="(item,index) in testitem" :key="index">
              <td>
                <el-select v-model="item.testitem_id" placeholder="请选择" size="mini" clearable>
                  <el-option v-for="i in testitem_enum" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
              </td>
              <td>
                <el-select v-model="item.quality_range" placeholder="请选择" size="mini" clearable>
                  <el-option v-for="i in quality_indexs" :key="i.id" :label="i.name" :value="i.name"></el-option>
                </el-select>
              </td>
              <td>
                <el-input size="mini" v-model="item.quality_index"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.fee"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.note"></el-input>
              </td>
              <td>
                <el-button type="primary" icon="el-icon-minus" size="mini" @click="del_test(index)"></el-button>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item class="form_title">
          <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
            <b>产品其他信息</b>
          </el-button>
        </el-form-item>
        <el-form-item v-show="form_show3">
          <table border="1" bordercolor="#E5E5E5">
            <tr>
              <td>safetystatements(安全说明)</td>
              <td>packinggroup(包装等级)</td>
              <td>hazardoussubstances(危险物质)</td>
              <td>MP（熔点）</td>
              <td>BP（沸点）</td>
              <td>FP（闪点）</td>
              <td>freezingpoint（冻点）</td>
              <td>Density（密度）</td>
            </tr>
            <tr>
              <td>
                <el-input size="mini" v-model="property.safetystatements"></el-input>
              </td>
              <td>
                <el-select v-model="property.packinggroup" size="mini" clearable>
                  <el-option v-for="i in Packagelevel" :key="i.id" :label="i.name" :value="i.name"></el-option>
                </el-select>
              </td>
              <td>
                <el-input size="mini" v-model="property.hazardoussubstances"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.mp"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.bp"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.flashpoint"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.freezingpoint"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.density"></el-input>
              </td>
            </tr>
            <tr>
              <td>Vapor Density(蒸汽密度)</td>
              <td>vapour pressure(蒸汽压）</td>
              <td>refractive index(折射率)</td>
              <td>solubility(溶解度)</td>
              <td>watersolubility(水溶解性)</td>
              <td>statibility(稳定性)</td>
              <td>riskstatements(危险品类别）</td>
              <td>ridadr(危险品运输编号)</td>
            </tr>
            <tr>
              <td>
                <el-input size="mini" v-model="property.vapordensity"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.vaporpressure"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.refractiveindex"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.solubility"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.watersolubility"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.stability"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.riskstatements"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.ridadr"></el-input>
              </td>
            </tr>
            <tr>
              <td>hazardclass(危险类别)</td>
              <td>UNCODE</td>
              <td>特质</td>
              <td>产品外观</td>
              <td>MSDS(链接)</td>
              <td>产品特殊属性</td>
              <td>有限包装</td>
              <td></td>
            </tr>
            <tr>
              <td>
                <el-input size="mini" v-model="property.hazardclass"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.uncode"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.trait"></el-input>
              </td>
              <td>
                <el-select v-model="chemprodappearance_id" filterable size="mini" clearable>
                  <el-option
                    v-for="(i,index) in ChemicalAppearance"
                    :key="index"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-input size="mini" v-model="property.msds_url"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.specificity"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="property.limited_packing"></el-input>
              </td>
              <td></td>
            </tr>
          </table>
        </el-form-item>
        <!-- <el-form-item class="form_title">
          <el-button @click="form_show5 = !form_show5" type="text" icon="el-icon-arrow-down">
            <b>GHS性质</b>
          </el-button>
        </el-form-item>
        <el-form-item v-show="form_show5">
          <el-form label-width="220px" label-position="left">
            <el-form-item label="Pictogram(s)">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="Signal">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="GHS Hazard Statements">
              <el-input size="mini"></el-input>
            </el-form-item>
            <el-form-item label="Precautionary Statement Codes">
              <el-input size="mini"></el-input>
            </el-form-item>
          </el-form>
        </el-form-item>-->
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" @click="save()" :loading="loading" >{{$t('save')}}</el-button>
          <el-button type="danger" size="mini" @click="back()">{{$t('back')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import {
  testitem,
  getUserByType,
  prod_update,
  listTotalPost,
  listTotalPost_smiles,
  form,
  form_edit,
} from "@/api/prod";
export default {
  name: "Prod-Add1",
  data() {
    return {
      useID:'',
      loading: false,
      loading_verify: false,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      form_show5: false,
      s_advantage:false,
      s_secret:false,
      now: Date.now(),
      // 基础
      id: "",
      name: "",
      name_cn: "",
      name_cn_alias: "",
      name_alias: "",
      iupac_name: "",
      inchi: "",
      inchi_key: "",
      smiles: "",
      cas: "",
      mdl: "",
      mf: "",
      mw: "",
      img: "",
      chemicalcate_id: "",
      is_advantage: "",
      is_secret: "",
      productid1: "",
      productid2: "",
      productid3: "",
      expired_interval: "",
      notice_size: "",
      notice_unit_id: "",
      pre_notice_check: "",
      inland_trancond_id: "",
      abroad_trancond_id: "",
      hscode: "",
      reminds: [],
      sale_charge1: "",
      purchase_charge1: "",
      purchase_charge2: "",
      user_id: "",
      status: "",
      verified_at: "",
      spec: [], // 库存定价
      testitem: [], // 检测项
      property: {
        safetystatements: "",
        packinggroup: "",
        hazardoussubstances: "",
        mp: "",
        bp: "",
        flashpoint: "",
        freezingpoint: "",
        density: "",
        vapordensity: "",
        vaporpressure: "",
        refractiveindex: "",
        solubility: "",
        watersolubility: "",
        stability: "",
        riskstatements: "",
        ridadr: "",
        hazardclass: "",
        uncode: "",
        trait: "",
        msds_url: "",
        specificity: ""
      }, // 产品其他信息
      chemprodappearance_id: "",
      //
      enum: {},
      ChemicalType: [],
      ChemicalAppearance: [],
      Unit: [],
      testitem_enum: [],
      Prodremind: {},
      charges1: [],
      charges2: [],
      prod_statuses: [],
      sale_charges: [],
      disabled_sale_charge1: "",
      disabled_purchase_charge1: "",
      disabled_purchase_charge2: "",
      Packagelevel: [],
      StorageCondition:[],
      Trancondition:[],
      Users:[],
      quality_indexs: [
        {
          name: ""
        },
        {
          name: "≥"
        },
        {
          name: "≤"
        }
      ],
      CommonSpec:[]
    };
  },
  created() {
    // this.fetchData();
    this.useID = this.$route.query.id
  },
  watch: {
    $route (to, from) {
      if (to.name === 'Prod-Add1') {
        this.useID = this.$route.query.id
      }
    },
    useID(to,form){
      if(to!=form){
        this.fetchData()
      }
    }
  },
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    pack_change(item,index){
      this.spec[index].pack_size = item.replace(/[a-zA-Z]/g, "")
      if(item.replace(/[0-9]*/g, "")=='g'){
        this.spec[index].pack_unit_id = 1
      }else if(item.replace(/[0-9]*/g, "")=='mg'){
        this.spec[index].pack_unit_id = 5
      }else if(item.replace(/[0-9]*/g, "")=='ml'){
        this.spec[index].pack_unit_id = 2
      }else if(item.replace(/[0-9]*/g, "")=='l'){
        this.spec[index].pack_unit_id = 6
      }else if(item.replace(/[0-9]*/g, "")=='kg'){
        this.spec[index].pack_unit_id = 4
      }else{
        this.spec[index].pack_unit_id = ''
      }
    },
    fetchData() {
      if (this.$route.query.id) {
        form_edit(this.$route.query.id).then(res => {
          this.prod_statuses = res.enum.prod_statuses
            this.id = this.$route.query.id
            this.name = res.data.name ? res.data.name : res.data.prod.name
            this.name_cn = res.data.name_cn
              ? res.data.name_cn
              : res.data.prod.name_cn
            this.name_cn_alias = res.data.prod.name_cn_alias
            this.name_alias = res.data.prod.name_alias
            this.iupac_name = res.data.prod.iupac_name
            this.inchi = res.data.prod.inchi
            this.inchi_key = res.data.prod.inchi_key
            this.smiles = res.data.prod.smiles
            this.cas = res.data.prod&&res.data.prod.cas ? res.data.prod.cas : res.data.cas
            this.mdl = res.data.prod ? res.data.prod.mdl : res.data.mdl
            this.mf = res.data.prod.mf
            this.mw = res.data.prod.mw
            this.img = res.data.prod.img
            this.chemicalcate_id = res.data.prod.chemicalcate_id
            this.is_advantage = res.data.prod.is_advantage
            this.is_secret = res.data.prod.is_secret
            this.productid1 = res.data.prod
              ? res.data.prod.prodno
              : res.data.prodno
            this.productid2 = res.data.prod
              ? res.data.prod.productid2
              : res.data.productid2
            this.productid3 = res.data.prod
              ? res.data.prod.itemno
              : res.data.itemno
            this.expired_interval = res.data.prod.expired_interval
            this.notice_size = res.data.prod.notice_size
            this.notice_unit_id = res.data.prod.notice_unit_id
            this.pre_notice_check = res.data.prod.pre_notice_check
            this.inland_trancond_id = res.data.prod.inland_trancond_id
            this.abroad_trancond_id = res.data.prod.abroad_trancond_id
            this.hscode = res.data.prod.hscode
            this.reminds = []
            res.data.prod.reminds.forEach(item=>{
              this.reminds.push(item.id)
            })
            this.sale_charge1 = res.data.prod.sale_charge1
            this.purchase_charge1 = res.data.prod.purchase_charge1
            this.purchase_charge2 = res.data.prod.purchase_charge2
            this.user_id = res.data.prod.user_id
            this.status = res.data.prod
              ? res.data.prod.status
              : res.data.status
            this.verified_at = res.data.prod.verified_at
            this.spec = res.data.prod.spec ? res.data.prod.spec : []
            this.testitem = res.data.prod.testitem
              ? res.data.prod.testitem
              : []
            this.property = res.data.prod.property
              ? res.data.prod.property
              : {
                  safetystatements: "",
                  packinggroup: "",
                  hazardoussubstances: "",
                  mp: "",
                  bp: "",
                  flashpoint: "",
                  freezingpoint: "",
                  density: "",
                  vapordensity: "",
                  vaporpressure: "",
                  refractiveindex: "",
                  solubility: "",
                  watersolubility: "",
                  stability: "",
                  riskstatements: "",
                  ridadr: "",
                  hazardclass: "",
                  uncode: "",
                  trait: "",
                  msds_url: "",
                  specificity: "",
                  storagecondition_id:'',
                  limited_packing:''
                }
            this.is_advantage==1?this.s_advantage=true:this.s_advantage=false
            this.is_secret==1?this.s_secret=true:this.s_secret=false
            this.chemprodappearance_id = res.data.prod.chemprodappearance_id
            this.sale_charges = JSON.parse(JSON.stringify(this.GEnums.Sales))
            this.charges1 = this.charges2 = JSON.parse(JSON.stringify(this.GEnums.Purchases))
            if(this.sale_charge1&&!this.GEnums.Sales[this.sale_charge1]){
              this.disabled_sale_charge1 = this.sale_charge1
              this.sale_charges[this.GEnums.Users[this.sale_charge1].id] = this.GEnums.Users[this.sale_charge1]
            }
            if (this.purchase_charge1&&!this.GEnums.Purchases[this.purchase_charge1]) {
            this.disabled_purchase_charge1 = this.purchase_charge1
            this.charges1[this.GEnums.Users[this.purchase_charge1].id] = this.GEnums.Users[this.purchase_charge1]
            }
            if (this.purchase_charge2&&!this.GEnums.Purchases[this.purchase_charge2]) {
            this.disabled_purchase_charge2 = this.purchase_charge2
            this.charges2[this.GEnums.Users[this.purchase_charge2].id] = this.GEnums.Users[this.purchase_charge2]
            }
        });
      } else {
        form().then(res => {
          this.prod_statuses = res.enum.prod_statuses;
          this.id = res.data.id;
          this.name = res.data.name;
          this.name_cn = res.data.name_cn;
          this.cas = res.data.cas;
          this.mdl = res.data.mdl;
          this.productid1 = res.data.prodno;
          this.productid2 = res.data.productid2;
          this.productid3 = res.data.itemno;
          this.name_cn_alias = ""
          this.name_alias = ""
          this.iupac_name = ""
          this.inchi = ""
          this.inchi_key = ""
          this.smiles = ""
          this.mf = ""
          this.mw = ""
          this.img = ""
          this.chemicalcate_id = ""
          this.is_advantage = ""
          this.is_secret = ""
          this.expired_interval = ""
          this.notice_size = ""
          this.notice_unit_id = ""
          this.pre_notice_check = ""
          this.inland_trancond_id = ""
          this.abroad_trancond_id = ""
          this.hscode = ""
          this.reminds = ""
          this.sale_charge1 = ""
          this.purchase_charge1 = ""
          this.purchase_charge2 = ""
          this.user_id = ""
          this.status = ""
          this.verified_at = ""
          this.spec = []
          this.testitem = []
          this.property = {
              safetystatements: "",
              packinggroup: "",
              hazardoussubstances: "",
              mp: "",
              bp: "",
              flashpoint: "",
              freezingpoint: "",
              density: "",
              vapordensity: "",
              vaporpressure: "",
              refractiveindex: "",
              solubility: "",
              watersolubility: "",
              stability: "",
              riskstatements: "",
              ridadr: "",
              hazardclass: "",
              uncode: "",
              trait: "",
              msds_url: "",
              specificity: "",
              storagecondition_id:'',
              limited_packing:''
            }
            this.chemprodappearance_id = ""
          this.specificity = ""
          this.is_advantage==1?this.s_advantage=true:this.s_advantage=false
          this.is_secret==1?this.s_secret=true:this.s_secret=false
        });
        this.sale_charges = JSON.parse(JSON.stringify(this.GEnums.Sales)) 
        this.charges1 =  this.charges2 = JSON.parse(JSON.stringify(this.GEnums.Purchases))
      }
      this.ChemicalType = this.GEnums.ChemicalType;
      this.Packagelevel = this.GEnums.Packagelevel;
      this.ChemicalAppearance = this.GEnums.ChemicalAppearance;
      this.Unit = this.GEnums.Unit;
      this.Prodremind = this.GEnums.Prodremind;
      this.StorageCondition = this.GEnums.StorageCondition
      this.Trancondition = this.GEnums.Trancondition;
      // this.testitem_enum = this.GEnums.Testitem;
      this.Users = this.GEnums.Users
      this.CommonSpec = this.GEnums.CommonSpec
      this.testitem_enum = []
      for(let i in this.GEnums.Testitem){
        if(this.GEnums.Testitem[i].pid==0){
          this.testitem_enum.push(this.GEnums.Testitem[i])
        }
      }
    },
    advantage(){
      if(this.s_advantage){
        this.is_advantage = 1
      }else{
        this.is_advantage = ''
      }
    },
    secret(){
      if(this.s_secret){
        this.is_secret = 1
      }else{
        this.is_secret = ''
      }
    },
    add_inventory() {
      this.spec.push({
        pack_size: this.spec[0]?this.spec[0].pack_size:'',
        pack_unit_id:this.spec[0]?this.spec[0].pack_unit_id:'',
        purity: this.spec[0]?this.spec[0].purity:'',
        notice_size: "",
        notice_unit_id: "",
        stock: "",
        stock_unit_id: "",
        inland_price: "",
        abroad_price: "",
        note: ""
      });
    },
    del_inventory(index) {
      this.spec.splice(index, 1);
    },
    add_test() {
      this.testitem.push({
        testitem_id: "",
        quality_range: "",
        quality_index: "",
        fee: "",
        note: ""
      });
    },
    del_test(index) {
      this.testitem.splice(index, 1);
    },
    iupac_change() {
      var obj = {
        iupac_name: this.iupac_name,
        prod_id: this.id
      };
      listTotalPost("prod/iupac", obj).then(res => {
        this.smiles = res.data.smiles;
        this.mf = res.data.mf;
        this.mw = res.data.mw;
        this.img = res.data.img;
      });
    },
    purity_change(item,index){
      if(item.indexOf("%")==-1){
        this.spec[index].purity = item+'%'
        this.$forceUpdate()
      }
    },
    smiles_change() {
      var obj = {
        smiles: this.smiles,
        prod_id: this.id
      };
      listTotalPost_smiles("prod/smiles", obj).then(res => {
        this.now = Date.now();
        if (res.data.mf) {
          this.mf = res.data.mf;
        }
        if (res.data.mw) {
          this.mw = res.data.mw;
        }
        this.img = res.data.img;
      });
    },
    save() {
      this.loading = true;
      var obj = {
        id: this.id,
        name: this.name,
        name_cn: this.name_cn,
        name_cn_alias: this.name_cn_alias,
        name_alias: this.name_alias,
        iupac_name: this.iupac_name,
        inchi: this.inchi,
        inchi_key: this.inchi_key,
        smiles: this.smiles,
        cas: this.cas,
        mdl: this.mdl,
        mf: this.mf,
        mw: this.mw,
        img: this.img,
        chemicalcate_id: this.chemicalcate_id,
        is_advantage: this.is_advantage,
        is_secret: this.is_secret,
        prodno: this.productid1,
        productid2: this.productid2,
        itemno: this.productid3,
        expired_interval: this.expired_interval,
        notice_size: this.notice_size,
        notice_unit_id: this.notice_unit_id,
        pre_notice_check: this.pre_notice_check,
        inland_trancond_id: this.inland_trancond_id,
        abroad_trancond_id: this.abroad_trancond_id,
        hscode: this.hscode,
        reminds: this.reminds,
        sale_charge1: this.sale_charge1,
        purchase_charge1: this.purchase_charge1,
        purchase_charge2: this.purchase_charge2,
        user_id: this.user_id,
        status: this.status,
        verified_at: this.verified_at,
        spec: this.spec,
        testitem: this.testitem,
        property: this.property,
        chemprodappearance_id: this.chemprodappearance_id,
        specificity: this.specificity
      };
      prod_update(obj)
        .then(res => {
          if (res && res.code == 0) {
            this.$message({
              message: "success",
              type: "success"
            });
            this.loading = false;
            this.back();
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
            this.loading = false;
          }
        })
        .catch(rr => {
          this.loading = false;
        });
    },
    back() {
        let that=this
        that.$router.push({
          path: "/Prod/components",
          name: "Prod-index"
        });
        const tagName = "Prod-Add1";
        that.closeAdd({ tagName });
    }
  }
};
function obj(arr, object) {
  if (arr.length == 0) {
    for (let i in object) {
      arr.push(object[i]);
    }
  }
}
</script>
