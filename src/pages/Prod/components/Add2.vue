<style lang="scss" scoped type="text/scss">
.el-form-item {
  margin-bottom: 0px;
}
.el-checkbox {
  margin-right: 5px;
}
.el-select {
  width: 100%;
}
.w300{
  width: 300px!important;
}
/deep/.el-table {
  margin-top: 10px;
  td,
  th {
    padding: 5px 0px;
    font-size: 13px;
  }
}
table {
  border-collapse: collapse;
  font-size: 13px;
  /deep/.el-input__inner {
    width: 100%;
    border: none;
  }
}
/deep/.el-form-item__label {
  text-align: left;
  color: black;
}
/deep/.el-input__inner {
  width: 100%;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 1px;
  border-radius: 0;
  padding: 0px 5px;
  /*outline: medium;*/
}
/deep/.el-tabs__item.is-active {
  color: #409eff;
  font-weight: bold;
}
/deep/.el-tabs__active-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background-color: #409eff;
}
/deep/.el-tabs__item:hover {
  color: #409eff;
  cursor: pointer;
}
/deep/.d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-full
  .d2-container-full__body {
  background: white;
  padding: 20px !important;
}
/deep/.d2-layout-header-aside-group
  .d2-layout-header-aside-content
  .d2-theme-container
  .d2-theme-container-main
  .d2-theme-container-main-body
  .container-component
  .d2-container-full
  .d2-container-full__body {
  padding: 10px 20px !important;
}
/deep/.prod_num .el-form-item__label {
  color: grey !important;
}
/deep/ .el-divider {
  margin: 5px 0 !important;
}
.el-date {
  /deep/.el-input__inner {
    padding-left: 30px;
  }
}
.data_ {
  /deep/.el-input__inner {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0px 30px;
  }
  font-size: 14px;
  div {
    width: 50%;
    text-align: right;
  }
  table {
    width: 50%;
    margin-top: 10px;
    font-size: 14px;
    td {
      line-height: 40px;
      padding-left: 5px;
    }
  }
}
// /deep/.prod_info{
//   .el-form-item__label{
//     line-height: 30px;
//   }
// }
/deep/.data{
  .el-input__inner{
    padding-left: 30px;
  }
}
  .flex{
    display: flex;
    border: none;
  }
</style>

<template>
  <d2-container>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first">
        <!-- 基础信息 -->
        <el-row :gutter="10">
          <el-col :span="9">
            <el-form label-width="110px">
              <el-form-item label="产品编码">
                <!-- 产品编码 -->
                <!-- <div style="border-bottom:1px solid #DCDFE6;line-height:35px;font-size:13px;"> -->
                <span>
                  ID1:
                  <el-input size="mini" v-model="basis.prodno" disabled style="width:25%;"></el-input>
                </span>
                <span>
                  ID2:
                  <el-input size="mini" v-model="basis.productid2" disabled style="width:25%;"></el-input>
                </span>
                <span>
                  ID3:
                  <el-input size="mini" v-model="basis.itemno" disabled style="width:25%;"></el-input>
                </span>
                <!-- </div> -->
              </el-form-item>
              <el-form-item label="中文名称" required>
                <!-- 中文名称 -->
                <el-input
                  size="mini"
                  v-model="basis.name_cn"
                  clearable
                  :style="basis.name_cn?'width:80%;':'width:100%;'"
                ></el-input>
                <el-button
                  v-if="basis.name_cn"
                  type="primary"
                  size="mini"
                  @click="fan_cn(basis.name_cn)"
                >翻译</el-button>
              </el-form-item>
              <el-form-item label="英文名称" required>
                <!-- 英文名称 -->
                <el-input
                  size="mini"
                  v-model="basis.name"
                  clearable
                  :style="basis.name?'width:80%;':'width:100%;'"
                ></el-input>
                <el-button v-if="basis.name" type="primary" size="mini" @click="fan(basis.name)">翻译</el-button>
              </el-form-item>
              <el-form-item label="标准英文名">
                <!-- 标准英文名 -->
                <el-input
                  size="mini"
                  v-model="basis.iupac_name"
                  clearable
                  :style="basis.iupac_name?'width:90%;':'width:100%;'"
                ></el-input>
                <el-button
                  v-if="basis.iupac_name"
                  class="btn-text can-hover"
                  type="text"
                  @click="iupac_change"
                >
                  <d2-icon name="exchange" style="font-size: 16px;" />
                </el-button>
              </el-form-item>
              <el-form-item label="同义词">
                <!-- 同义词 -->
                <el-input size="mini" v-model="basis.name_alias" clearable></el-input>
              </el-form-item>
              <el-form-item label="InChI Key">
                <el-input size="mini" v-model="basis.inchi_key" clearable></el-input>
              </el-form-item>
              <el-form-item label="Smiles">
                <el-input
                  size="mini"
                  v-model="basis.smiles"
                  clearable
                  :style="basis.smiles?'width:90%;':'width:100%;'"
                ></el-input>
                <el-button
                  v-if="basis.smiles"
                  class="btn-text can-hover"
                  type="text"
                  @click="smiles_change"
                >
                  <d2-icon name="exchange" style="font-size: 16px;" />
                </el-button>
              </el-form-item>
              <el-form-item label="Inchi">
                <el-input size="mini" v-model="basis.inchi" clearable></el-input>
              </el-form-item>
            </el-form>
            <el-row>
              <el-col :span="12">
                <el-form label-width="110px">
                  <el-form-item label="Cas No." required>
                    <el-input size="mini" v-model="basis.cas" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="分子式">
                    <!-- 分子式 -->
                    <el-input size="mini" v-model="basis.mf" clearable></el-input>
                  </el-form-item>

                  <el-form-item label="销售负责人">
                    <!-- 销售负责人 -->
                    <el-select v-model="basis.sale_charge1" size="mini" clearable>
                      <el-option
                              v-for="item in sale_charges"
                              :disabled="item.id==disabled_sale_charge1"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="70px">
                  <el-form-item label="MDL No.">
                    <el-input size="mini" v-model="basis.mdl" clearable></el-input>
                  </el-form-item>
                  <el-form-item label="分子量">
                    <!-- 分子量 -->
                    <el-input size="mini" v-model="basis.mw" clearable></el-input>
                  </el-form-item>

                  <el-form-item label="剩余时间" class="el-date">
                    <!-- 剩余时间 -->
                    <el-date-picker
                      v-model="basis.purchase_charge2_expired"
                      type="date"
                      size="mini"
                      value-format="yyyyMMdd"
                      format="yyyy-MM-dd"
                      style="width:100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="12">
                <el-form label-width="110px">
                  <el-form-item label="违禁类型">
                    <!-- 违禁类型 -->
                    <el-select v-model="basis.prohibited" placeholder clearable size="mini">
                      <el-option
                        v-for="item in Prohibited"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="标准纯度">
                    <el-autocomplete
                      clearable
                      v-model="basis.standardpurity"
                      :fetch-suggestions="querySearchAsync_contact"
                      placeholder
                      @select="handleSelect_contact_b"
                    >
                      <template slot-scope="{ item }">
                        <div>{{item.name}}</div>
                      </template>
                    </el-autocomplete>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12">
                <el-form label-width="110px">
                  <el-form-item label="默认计量单位">
                    <!-- 默认计量单位 -->
                    <el-select v-model="basis.unit_id" placeholder clearable size="mini">
                      <el-option
                        v-for="item in Unit"
                        :key="item.index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="产品等级">
                    <!-- 产品等级 -->
                    <el-select v-model="basis.prod_level_id" placeholder clearable size="mini">
                      <el-option
                        v-for="(i,index) in Productgrade"
                        :key="index"
                        :label="i.name"
                        :value="i.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-form label-width="110px">
              <el-form-item label="外观">
                <!-- 外观 -->
                <el-select v-model="basis.chemprodappearance_id" filterable size="mini" clearable>
                  <el-option
                    v-for="(i,index) in ChemicalAppearance"
                    :key="index"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品类型" required>
                <!-- 产品类型 -->
                <el-select v-model="basis.chemicalcate_id" filterable size="mini">
                  <el-option
                    v-for="(i,index) in ChemicalType"
                    :key="index"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品类别">
                <el-popover placement="right" width="400" trigger="click" v-model="visible">
                  <el-tree
                    :data="prodcates"
                    show-checkbox
                    node-key="id"
                    default-expand-all
                    :default-checked-keys="basis.cate"
                    @check-change="handleCheckChange"
                    :props="defaultProps"
                  ></el-tree>
                  <div style="text-align:center;">
                    <el-button type="primary" @click="visible = false" size="mini">确认</el-button>
                  </div>
                  <div
                    slot="reference"
                    style="border-bottom:1px solid #DCDFE6;line-height:35px;height:35px;font-size:13px;"
                  >
                    <span v-for="i in permissions_list">{{i}};</span>
                  </div>
                </el-popover>
              </el-form-item>
              <el-form-item label="保质期(天)">
                <!-- 保质期(月) -->
                <el-input size="mini" v-model="basis.expired_interval" clearable></el-input>
              </el-form-item>
              <el-form-item label="库存警戒(g/ml)">
                <!-- 库存警戒(g) -->
                <el-input size="mini" v-model="basis.notice_size" clearable style="width:100%;"></el-input>
                <!-- <el-select size="mini" v-model="basis.notice_unit_id" clearable style="width:20%;">
                  <el-option v-for="item in Unit" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="海关编码">
                <!-- 海关编码 -->
                <el-input size="mini" v-model="basis.hscode" clearable></el-input>
              </el-form-item>
              <!-- <el-form-item label="储藏条件">
                <el-select v-model="basis.storage_cond_id" clearable size="mini">
                  <el-option
                    v-for="item in StorageCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="储藏条件">
                <!-- 储藏条件 -->
                <el-select v-model="basis.storage_cond" clearable multiple size="mini">
                  <el-option
                    v-for="item in StorageCondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国内运输条件">
                <!-- 国内运输条件 -->
                <el-select v-model="basis.inland_trancond_id" clearable size="mini">
                  <el-option
                    v-for="item in Trancondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国外运输条件">
                <!-- 国外运输条件 -->
                <el-select v-model="basis.abroad_trancond_id" clearable size="mini">
                  <el-option
                    v-for="item in Trancondition"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="结算价(g/ml)">
                <el-input size="mini" v-model="basis.settle_price" style="width:80%;" clearable></el-input>
                <el-button type="primary" size="mini" v-if="basis.change_logs.length>0" @click="settle_log(basis.change_logs)">记录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="7">
            <el-form label-width="100px">
              <el-form-item label="包装运输要求">
                <!-- 包装运输要求 -->
                <el-input size="mini" v-model="basis.patr" clearable></el-input>
              </el-form-item>
              <el-form-item label="审核时间">
                <!-- 审核时间 -->
                <el-input size="mini" v-model="basis.verified_at" disabled></el-input>
              </el-form-item>
              <el-form-item label="新建人员">
                <!-- 新建人员 -->
                <el-select v-model="basis.user_id" size="mini" disabled clearable>
                  <el-option
                    v-for="item in Users"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <!-- 备注 -->
                <el-input size="mini" v-model="basis.note" clearable></el-input>
              </el-form-item>
              <el-form-item label="备注2" v-if="basis.note1">
                <!-- 备注 -->
                <el-input size="mini" v-model="basis.note1" clearable></el-input>
              </el-form-item>
              <!--<el-form-item label="是否经营">-->
                <!--<el-radio-group v-model="basis.can_saled" size="mini">-->
                  <!--<el-radio-button :label="3">待定</el-radio-button>-->
                  <!--<el-radio-button :label="1">经营</el-radio-button>-->
                  <!--<el-radio-button :label="2">不经营</el-radio-button>-->
                  <!--<el-radio-button :label="4">审核中</el-radio-button>-->
                <!--</el-radio-group>-->
              <!--</el-form-item>-->
            </el-form>
            <div style="margin:30px auto 0 auto;text-align:center">
              <el-checkbox
                v-model="basis.is_advantage"
                :true-label="1"
                :false-label="0"
                :checked="basis.is_advantage==1"
              > 优势产品</el-checkbox>
              <!-- 优势产品-->
              <el-checkbox
                v-model="basis.is_secret"
                :true-label="1"
                :false-label="0"
                :checked="basis.is_secret==1"
              >保密产品</el-checkbox>
              <!-- 保密产品 -->
              <el-checkbox
                v-model="basis.is_checked"
                :true-label="1"
                :false-label="0"
                :checked="basis.is_checked==1"
              >信息已核实</el-checkbox>
              <!-- 信息已核实 -->
              <!-- <el-checkbox
                v-model="basis.can_saled"
                :true-label="1"
                :false-label="0"
                :checked="basis.can_saled==1"
              >不经营产品</el-checkbox> -->
              <!-- 不经营产品 -->
              <el-image
                style="width: 80%; height: 80%;margin-top:10px;"
                :src="basis.img+'?'+now"
                fit="fill"
              ></el-image>
            </div>
          </el-col>
        </el-row>
        <el-form  :inline="true" >
            <el-form-item  label="采购第一负责人">
              <!-- 采购第一负责人 -->
              <el-select v-model="basis.purchase_charge1" size="mini" clearable @clear="basis.purchase_charge1_supplier=purchase_charge1_supplier=[]">
                <el-option
                        v-for="item in charges1"
                        :disabled="item.id==disabled_purchase_charge1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="供应商">
              <el-select
                      v-model="purchase_charge1_supplier"
                      filterable
                      remote
                      multiple
                      clearable
                      size="mini"
                      reserve-keyword
                      placeholder="请选择"
                      :remote-method="remoteMethod1"
                      :loading="loading1"
                      @change="selectSupplier1"
                      @remove-tag="remove1"
                      :disabled="!basis.purchase_charge1"
                      class="w300"
              >
                <el-option
                        v-for="item in supplier1"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <el-form  :inline="true" >
            <el-form-item label="采购第二负责人">
              <!-- 采购第二负责人 -->
              <el-select v-model="basis.purchase_charge2" size="mini" clearable @clear="basis.purchase_charge2_supplier=purchase_charge2_supplier=[]">
                <el-option
                        v-for="item in charges2"
                        :disabled="item.id==disabled_purchase_charge2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item   label="供应商">
              <el-select
                      v-model="purchase_charge2_supplier"
                      filterable
                      remote
                      multiple
                      clearable
                      size="mini"
                      reserve-keyword
                      placeholder="请选择"
                      :remote-method="remoteMethod2"
                      :loading="loading2"
                      @change="selectSupplier2"
                      @remove-tag="remove2"
                      :disabled="!basis.purchase_charge2"
                      class="w300"
              >
                <el-option
                        v-for="item in supplier2"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <el-form  :inline="true" >
            <el-form-item label="采购第三负责人">
              <!-- 采购第三负责人 -->
              <el-select v-model="basis.purchase_charge3" size="mini" clearable @clear="basis.purchase_charge3_supplier=purchase_charge3_supplier=[]">
                <el-option
                        v-for="item in charges3"
                        :disabled="item.id==disabled_purchase_charge3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item   label="供应商">
              <el-select
                      v-model="purchase_charge3_supplier"
                      filterable
                      remote
                      multiple
                      clearable
                      size="mini"
                      reserve-keyword
                      placeholder="请选择"
                      :remote-method="remoteMethod3"
                      :loading="loading3"
                      @change="selectSupplier3"
                      @remove-tag="remove3"
                      :disabled="!basis.purchase_charge3"
                      class="w300"
              >
                <el-option
                        v-for="item in supplier3"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div style="text-align:right;margin-top:20px;">
          <el-button type="primary" size="mini" :loading="loading_basis" v-if="permissions.indexOf(615)>-1" @click="save_basis()">保存</el-button>
          <!-- 保存 -->
          <el-button size="mini" @click="back()">取消</el-button>
          <!-- 取消 -->
        </div>
      </el-tab-pane>
      <el-tab-pane label="状态统计" name="second" v-if="second_show" class="data_">
        <div>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="Statistics_data.from_date"
            type="date"
            placeholder="开始日期"
            size="mini"
            format="yyyy-MM-dd"
            style="width: 125px;margin:0px 2px;"
          ></el-date-picker>
          <span>至</span>
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="Statistics_data.to_date"
            type="date"
            placeholder="结束日期"
            size="mini"
            format="yyyy-MM-dd"
            style="width: 125px;margin:0px 2px;"
          ></el-date-picker>
          <el-button type="primary" size="mini" @click="Statistics_search()">搜索</el-button>
        </div>
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <td width="100">询单次数</td>
            <td width="150">{{Statistics.inqueryCount}}</td>
            <td width="100">最后询单日期</td>
            <td>{{Statistics.lastInquery}}</td>
          </tr>
          <tr>
            <td>报价次数</td>
            <td>{{Statistics.outprice}}</td>
            <td>最后销售日期</td>
            <td>{{Statistics.lastSaleDate}}</td>
          </tr>
          <tr>
            <td>采购次数</td>
            <td>{{Statistics.buyTotalTimes}}</td>
            <td>最后采购日期</td>
            <td>{{Statistics.lastBuyDate}}</td>
          </tr>
          <tr>
            <td>采购总数量</td>
            <td>{{Statistics.buyTotal}}</td>
            <td>采购总金额</td>
            <td>
              <span
                v-if="Statistics.buyMoney"
                v-for="(i,key,index) in Statistics.buyMoney"
              >{{i}}{{getEnumValue(Currency,key)}}</span>
            </td>
          </tr>
          <tr>
            <td>国内销售次数</td>
            <td>{{Statistics.SaleTotalTimes}}</td>
            <td>国内销售总金额</td>
            <td>
              <span v-if="Statistics.saleMoney" v-for="(i,key,index) in Statistics.saleMoney">
                <span v-if="key==2">{{i}}{{getEnumValue(Currency,key)}}</span>
              </span>
            </td>
          </tr>
          <tr>
            <td>国外销售次数</td>
            <td>{{Statistics.AbroadSaleTotalTimes}}</td>
            <td>国外销售总金额</td>
            <td>
              <span v-if="Statistics.saleMoney" v-for="(i,key,index) in Statistics.saleMoney">
                <span v-if="key!=2">{{i}}{{getEnumValue(Currency,key)}}</span>
              </span>
            </td>
          </tr>
        </table>
      </el-tab-pane>
      <!-- <el-tab-pane label="产品数据信息" name="third">产品数据信息</el-tab-pane> -->
      <el-tab-pane label="产品牌价" name="fourth" v-if="fourth_show">
        <div style="display:flex;justify-content: space-between;">
          <el-button @click="spec_add()" type="primary" size="mini" v-if="permissions.indexOf(612)>-1">添加</el-button>
        </div>
        <el-table :data="spec" border>
          <el-table-column label="规格">
            <template slot-scope="scope">
              <span>{{scope.row.pack_size}}{{getEnumValue(Unit,scope.row.pack_unit_id)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="纯度">
            <template slot-scope="scope">
              <span>{{scope.row.purity}}</span>
            </template>
          </el-table-column>
          <el-table-column label="警戒线">
            <template slot-scope="scope">
              <span>{{scope.row.notice_size}}{{getEnumValue(Unit,scope.row.notice_unit_id)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="库存数量">
            <template slot-scope="scope">
              <span>{{scope.row.stock}}{{getEnumValue(Unit,scope.row.stock_unit_id)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="国内定价">
            <template slot-scope="scope">
              <span>{{scope.row.inland_price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="国外定价">
            <template slot-scope="scope">
              <span>{{scope.row.abroad_price}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.note}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <span>
                <el-button @click="spec_edit(scope.row,scope.$index)" type="primary" size="mini" v-if="permissions.indexOf(613)>-1">编辑</el-button>
                <el-button
                  @click="del_inventory(scope.row.id)"
                  type="danger"
                  size="mini"
                  style="margin-left:5px;"
                  v-if="permissions.indexOf(614)>-1"
                >删除</el-button>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="spec_stock" border style="width:50%;">
          <el-table-column >
            <template slot="header">
              <span>批次</span>
              <el-button size="mini" type="primary" @click="zhankai()" style="margin-left:10px;">展开</el-button>
            </template>
            <template slot-scope="scope">
              <span>{{scope.row.prod}}</span>
            </template>
          </el-table-column>
          <el-table-column label="库存数量">
            <template slot-scope="scope">
              <span>{{scope.row.stock}}{{getEnumValue(Unit,scope.row.unit_id)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="预占数量">
            <template slot-scope="scope">
              <span>{{scope.row.preout}}{{getEnumValue(Unit,scope.row.unit_id)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="剩余库存数量">
            <template slot-scope="scope">
              <span>{{scope.row.remain}}{{getEnumValue(Unit,scope.row.unit_id)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="检测项" name="five" v-if="five_show">
        <div>
          <el-button @click="testitem_add()" v-if="permissions.indexOf(610)>-1" type="primary" size="mini">添加</el-button>
        </div>
        <el-table :data="testitem" border>
          <el-table-column label="检测项目">
            <template slot-scope="scope">
              <span>{{getEnumValue(testitem_enum,scope.row.testitem_id)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指标">
            <template slot-scope="scope">
              <span>{{scope.row.quality_range}}</span>
            </template>
          </el-table-column>
          <el-table-column label="指标值">
            <template slot-scope="scope">
              <span>{{scope.row.quality_index}}</span>
            </template>
          </el-table-column>
          <el-table-column label="检测费用">
            <template slot-scope="scope">
              <span>{{scope.row.fee}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.note}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                @click="testitem_edit(scope.row,scope.$index)"
                type="primary"
                size="mini"
                v-if="permissions.indexOf(609)>-1"
              >编辑</el-button>
              <el-button
                @click="del_testitem(scope.row.id)"
                type="danger"
                size="mini"
                style="margin-left:5px;"
                v-if="permissions.indexOf(611)>-1"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="产品属性" name="sixth" v-if="sixth_show" class="prod_info">
        <el-row>
          <el-col :span="8">
            <el-form label-width="190px">
              <el-form-item label="packinggroup(包装等级)">
                <el-select v-model="property.packinggroup" size="mini" clearable>
                  <el-option v-for="i in Packagelevel" :key="i.id" :label="i.name" :value="i.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="MP（熔点）">
                <el-input size="mini" v-model="property.mp" clearable></el-input>
              </el-form-item>
              <el-form-item label="BP（沸点）">
                <el-input size="mini" v-model="property.bp" clearable></el-input>
              </el-form-item>
              <el-form-item label="FP（闪点）">
                <el-input size="mini" v-model="property.flashpoint" clearable></el-input>
              </el-form-item>
              <el-form-item label="freezingpoint（冻点）">
                <el-input size="mini" v-model="property.freezingpoint" clearable></el-input>
              </el-form-item>
              <el-form-item label="Density（密度）">
                <el-input size="mini" v-model="property.density" clearable></el-input>
              </el-form-item>
              <el-form-item label="safetystatements(安全说明)">
                <el-input size="mini" v-model="property.safetystatements" clearable></el-input>
              </el-form-item>
              <el-form-item label="hazardoussubstances(危险物质)">
                <el-input size="mini" v-model="property.hazardoussubstances" clearable></el-input>
              </el-form-item>
              <el-form-item label="Ghs Pictogram">
                <!-- <el-input size="mini" v-model="property.ghs" clearable ></el-input> -->
                <el-select size="mini" v-model="property.ghs" multiple @change="ghs_change()">
                  <el-option
                    v-for="item in Ghs_enum"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Signal word(警示语)">
                <el-input size="mini" v-model="property.signalword" clearable disabled></el-input>
              </el-form-item>
              <el-form-item label="Hazard statements(危险声明)">
                <el-input size="mini" v-model="property.hazardstatements" clearable></el-input>
              </el-form-item>
              <el-form-item label="Precautionary statements(警告声明)">
                <el-input size="mini" v-model="property.precautionarystatements" clearable></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form label-width="170px">
              <el-form-item label="Vapor Density(蒸汽密度)">
                <el-input size="mini" v-model="property.vapordensity" clearable></el-input>
              </el-form-item>
              <el-form-item label="vapour pressure(蒸汽压)">
                <el-input size="mini" v-model="property.vaporpressure" clearable></el-input>
              </el-form-item>
              <el-form-item label="refractive index(折射率)">
                <el-input size="mini" v-model="property.refractiveindex" clearable></el-input>
              </el-form-item>
              <el-form-item label="solubility(溶解度)">
                <el-input size="mini" v-model="property.solubility" clearable></el-input>
              </el-form-item>
              <el-form-item label="watersolubility(水溶解性)">
                <el-input size="mini" v-model="property.watersolubility" clearable></el-input>
              </el-form-item>
              <el-form-item label="statibility(稳定性)">
                <el-input size="mini" v-model="property.stability" clearable></el-input>
              </el-form-item>
              <el-form-item label="riskstatements(危险品类别）">
                <el-input size="mini" v-model="property.riskstatements" clearable></el-input>
              </el-form-item>
              <el-form-item label="ridadr(危险品运输编号)">
                <el-input size="mini" v-model="property.ridadr" clearable></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form label-width="180px">
              <el-form-item label="hazardclass(危险类别)">
                <el-input size="mini" v-model="property.hazardclass" clearable></el-input>
              </el-form-item>
              <el-form-item label="UNCODE">
                <el-input size="mini" v-model="property.uncode" clearable></el-input>
              </el-form-item>
              <el-form-item label="特质">
                <el-input size="mini" v-model="property.trait" clearable></el-input>
              </el-form-item>
              <el-form-item label="MSDS(链接)">
                <el-input size="mini" v-model="property.msds_url" clearable></el-input>
              </el-form-item>
              <el-form-item label="产品特殊属性">
                <el-input size="mini" v-model="property.specificity" clearable></el-input>
              </el-form-item>
              <el-form-item label="有限包装">
                <el-input size="mini" v-model="property.limited_packing" clearable style="width:70%;"></el-input>
                <el-select v-model="property.limited_packing_unit_id" clearable size="mini" style="width:30%;" placeholder="选择单位">
                      <el-option
                        v-for="item in Unit_limited"
                        :key="item.index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="空气敏感">
                <el-switch
                        v-model="property.air_sensitive"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="是"
                        inactive-text="否">
                </el-switch>
              </el-form-item>
              <el-form-item label="水汽敏感">
                <el-switch
                        v-model="property.water_sensitive"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="是"
                        inactive-text="否">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否分装">
                <el-switch
                        v-model="property.pre_packing"
                        :active-value="1"
                        :inactive-value="0"
                        active-text="是"
                        inactive-text="否">
                </el-switch>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div style="text-align:right;margin-top:10px;">
          <el-button type="primary" size="mini" @click="property_save(property)" v-if="permissions.indexOf(616)>-1">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MSDS" name="msds" v-if="msds_show&&permission_names['prod.msds']=='prod.msds'">
          <el-row :gutter='50'>
            <el-col :span="8">
              <el-form label-width="140px">
                <el-form-item label="产品名称">
                  <el-input size="mini" v-model="msds_data.name"></el-input>
                </el-form-item>
                <el-form-item label="产品编码">
                  <el-input size="mini" v-model="msds_data.prodno"></el-input>
                </el-form-item>
                <el-form-item label="CAS">
                  <el-input size="mini" v-model="msds_data.cas" clearable></el-input>
                </el-form-item>
                <el-form-item label="Formula">
                  <el-input size="mini" v-model="msds_data.mf" clearable></el-input>
                </el-form-item>
                <el-form-item label="Appearance">
                  <el-input size="mini" v-model="msds_data.appearance" clearable></el-input>
                </el-form-item>
                <el-form-item label="Boiling">
                  <el-input size="mini" v-model="msds_data.bp" clearable></el-input>
                </el-form-item>
                <el-form-item label="Ignition Temperature">
                  <el-input size="mini" v-model="msds_data.it" clearable></el-input>
                </el-form-item>
                <el-form-item label="日期" class="data">
                  <el-date-picker
                          v-model="msds_data.created_at"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          type="date"
                          style="width:100%;"
                          size="mini"
                  ></el-date-picker>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="8">
              <el-form label-width="120px">
                <el-form-item label="Weight">
                  <el-input size="mini" v-model="msds_data.mw" clearable></el-input>
                </el-form-item>
                <el-form-item label="Melting">
                  <el-input size="mini" v-model="msds_data.mp" clearable></el-input>
                </el-form-item>
                <el-form-item label="Flash">
                  <el-input size="mini" v-model="msds_data.fp" clearable></el-input>
                </el-form-item>
                <el-form-item label="性状">
                  <el-input size="mini" v-model="msds_data.trait" clearable></el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <div style="text-align:right;margin-top:10px;">
            <!-- <el-upload
                  style="display: inline-block;margin-right:5px;"
                  class="upload-demo"
                  :action="upload_api"
                  :data="pramas"
                  :headers="headers"
                  :before-remove="beforeRemove"
                  multiple
                  :on-success="handleAvatarSuccess_updateAtlas"
                  :show-file-list="false"
          >
            <el-button size="mini" type="primary">{{$t('Inquery.index.click_upload_msds')}}</el-button>
          </el-upload> -->
            <el-button type="primary" @click="add_msds(msds_data)" size="mini">保存</el-button><!-- 生 成 -->
          </div>
          <el-table
                  v-if="Atlas.length>0"
                  :data="Atlas"
                  element-loading-text="Loading"
                  border
                  fit
                  highlight-current-row
                  style="width: 50%;"
          >
            <el-table-column align="center" :label="$t('Inquery.index.file_name')">
              <template slot-scope="scope">
                <a v-if="scope.row.filename.indexOf('http')>-1" :href="scope.row.filename">{{scope.row.origin}}</a>
                <a v-else :href="url+'storage/'+scope.row.filename">{{scope.row.origin}}</a>
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
      </el-tab-pane>
      <!-- <el-tab-pane label="网站设置" name="seventh">网站设置</el-tab-pane> -->
    </el-tabs>

    <!-- 产品牌价 -->
    <el-dialog title="产品牌价" :visible.sync="dialogSpec" class="form" width="50%">
      <el-form label-width="80px" label-position="right">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="规格:" required>
              <el-select
                v-model="spec_item.pack_size"
                size="mini"
                style="width: 60%;"
                placeholder
                clearable
                @change="pack_change(spec_item.pack_size)"
              >
                <el-option v-for="(i,index) in CommonSpec" :key="i" :label="i" :value="i"></el-option>
              </el-select>
              <el-select
                v-model="spec_item.pack_unit_id"
                size="mini"
                style="width: 40%;"
                placeholder
                clearable
              >
                <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纯度:">
              <!-- <el-select v-model="spec_item.purity" placeholder size="mini">
                <el-option
                  v-for="item in Standardpurity"
                  :key="item.value"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>-->
              <el-autocomplete
                clearable
                v-model="spec_item.purity"
                :fetch-suggestions="querySearchAsync_contact"
                placeholder
                @select="handleSelect_contact"
              >
                <template slot-scope="{ item }">
                  <div>{{item.name}}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="警戒线:">
              <el-input size="mini" v-model="spec_item.notice_size" clearable style="width:60%;"></el-input>
              <el-select
                v-model="spec_item.notice_unit_id"
                size="mini"
                style="width: 40%;"
                placeholder
                clearable
              >
                <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="库存数量:">
              <el-input size="mini" v-model="spec_item.stock" clearable style="width:60%;"></el-input>
              <el-select
                v-model="spec_item.stock_unit_id"
                size="mini"
                style="width: 40%;"
                placeholder
                clearable
              >
                <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国内定价:">
              <el-input size="mini" v-model="spec_item.inland_price"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国外定价:">
              <el-input size="mini" v-model="spec_item.abroad_price"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="备注：">
              <el-input size="mini" v-model="spec_item.note"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="spec_save(spec_item)">保存</el-button>
        <el-button size="mini" @click="dialogSpec = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 检测项 -->
    <el-dialog title="检测项" :visible.sync="dialogTestitem" class="form" width="40%">
      <el-form label-width="100px" label-position="right">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="检测项目:" required>
              <el-select
                v-model="testitem_item.testitem_id"
                placeholder="请选择"
                size="mini"
                clearable
              >
                <el-option v-for="i in testitem_enum" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="检测费用:">
              <el-input size="mini" v-model="testitem_item.fee"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="10">
            <el-form-item label="指标:">
              <el-select
                v-model="testitem_item.quality_range"
                placeholder="请选择"
                size="mini"
                clearable
              >
                <el-option v-for="i in quality_indexs" :key="i.name" :label="i.name" :value="i.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="指标值:">
              <el-input size="mini" v-model="testitem_item.quality_index"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="备注：">
              <el-input size="mini" v-model="testitem_item.note"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="testitem_save(testitem_item)">保存</el-button>
        <el-button size="mini" @click="dialogTestitem = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- log -->
    <el-dialog :visible.sync="dialogLogs" width="40%" class="log_table">
      <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
        <tr style="font-weight: bold;">
        <td width='60'>ID</td>
        <td width='60'>修改人</td>
        <td>旧结算价</td>
        <td>现结算价</td>
        <td>修改日期</td>
      </tr>
      <tr v-for="item in logs_list">
        <td>{{item.id}}</td>
        <td>{{getEnumValue(Users,item.causer_id)}}</td>
        <td>{{item.properties.old?item.properties.old.settle_price:''}}</td>
        <td>{{item.properties.attributes?item.properties.attributes.settle_price:''}}</td>
        <td>{{item.updated_at}}</td>
      </tr>
      </table>
    </el-dialog>
  </d2-container>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import util from "@/libs/util";
import { futureDate } from "@/utils/index";
import { mapState, mapActions } from "vuex";
import { msds} from "@/api/Inquery";
import { msds_generate_prod ,supplier_lists} from "@/api/prod";
import {
  destroy_msds,
  prod_testitem,
  getUserByType,
  prod_update,
  listTotalPost,
  listTotalPost_smiles,
  form,
  form_edit,
  prodcate,
  spec,
  Prod_property,
  updateProperty,
  getStock,
  getStatistics,
  spec_create,
  spec_update,
  spec_delete,
  testitem_create,
  testitem_update,
  testitem_delete,
  translate
} from "@/api/prod";
export default {
  name: "Prod-Add2",
  data() {
    return {
      url:process.env.VUE_APP_API,
      permissions: JSON.parse(localStorage.getItem('permissions')),
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      activeName: "first",
      msds_show:false,
      dialogLogs:false,
      useID: "",
      upload_api: process.env.VUE_APP_API + "api/v2/prod/msds_upload",
      fileList: [],
      logs_list:[],
      basis: {
        id: "",
        name: "",
        name_cn: "",
        iupac_name: "",
        name_alias: "",
        inchi: "",
        inchi_key: "",
        smiles: "",
        cas: "",
        mdl: "",
        mf: "",
        mw: "",
        purchase_charge1: "",
        purchase_charge2: "",
        purchase_charge3: "",
        purchase_charge1_supplier:[],
        purchase_charge2_supplier:[],
        purchase_charge3_supplier:[],
        purchase_charge2_expired: "",
        purchase_charge3_expired: "",
        sale_charge1: "",
        prod_level_id: "",
        prohibited: "",
        standardpurity: "",
        unit_id: "",
        prodno: "",
        productid2: "",
        itemno: "",
        verified_at: "",
        settle_price:'',
        change_logs:[],
        chemprodappearance_id: "",
        user_id: "",
        chemicalcate_id: "",
        expired_interval: "",
        notice_size: "",
        // notice_unit_id:1,
        hscode: "",
        storagecondition_id: "",
        inland_trancond_id: "",
        abroad_trancond_id: "",
        note: "",
        is_advantage: "",
        is_secret: "",
        is_checked: "",
        can_saled: 3,
        img: "",
        patr: "",
        cate: []
      },
      Statistics_data: {
        from_date: "",
        to_date: ""
      },
      purchase_charge1_supplier:[],
      purchase_charge2_supplier:[],
      purchase_charge3_supplier:[],
      supplier1:[],
      loading1:false,
      supplier2:[],
      supplier3:[],
      loading2:false,
      loading3:false,
      Statistics: {},
      spec: [],
      spec_stock: [],
      testitem: [],
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
        specificity: "",
        limited_packing:'',
        limited_packing_unit_id:'',
        ghs:[],
        signalword:'',
        hazardstatements:'',
        precautionarystatements:'',
        air_sensitive:false,
        water_sensitive:false,
        pre_packing:false
      },
      now: "",
      value: "",
      spec_item: {},
      testitem_item: {},
      spec_index: "",
      testitem_index: "",
      loading_basis:false,
      second_show: false,
      fourth_show: false,
      sixth_show: false,
      five_show: false,
      visible: false,
      dialogSpec: false,
      dialogTestitem: false,
      disabled_sale_charge1: "",
      disabled_purchase_charge1: "",
      disabled_purchase_charge2: "",
      disabled_purchase_charge3: "",
      checkList: [],
      prodcates: [],
      msds_data:'',
      dangerous:'',
      defaultProps: {
        children: "child",
        label: "name"
      },
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
      zhankai_:false,
      permissions_list: [],
      prod_statuses: [],
      sale_charges: [],
      charges1: [],
      charges2: [],
      charges3: [],
      Prohibited: [],
      Standardpurity: [],
      Unit: [],
      ChemicalAppearance: [],
      ChemicalType: [],
      StorageCondition: [],
      Trancondition: [],
      Users: [],
      Productgrade: [],
      CommonSpec: [],
      testitem_enum: [],
      Packagelevel: [],
      Currency: [],
      Unit_limited:[],
      Atlas:[],
      pramas: {prod_id:''},
      Ghs_enum:['GHS01','GHS02','GHS03','GHS04','GHS05','GHS06','GHS07','GHS08','GHS09']
    };
  },
  created() {
    this.useID = this.$route.query.id;
      supplier_lists('').then(res=>{
          this.supplier1=res.data
          this.supplier2=res.data
      })
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
  watch: {
    $route(to, from) {
      if (to.name === "Prod-Add2") {
        this.useID = this.$route.query.id;
        if (this.$route.query.add) {
          this.fetchData();
        }
      }
    },
    useID(to, form) {
      if (to != form) {
        this.fetchData();
      }
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
      remoteMethod1(query) {
          if (query !== '') {
              this.loading1 = true;
              setTimeout(() => {
                  supplier_lists(query).then(res=>{
                    this.supplier1 = this.basis.purchase_charge1_supplier
                    res.data.forEach(item=>{
                      this.supplier1=this.supplier1.concat(item)
                    })
                    query = ''
                    this.loading1 = false;
                  })
              }, 200);
          }
      },
      selectSupplier1(){
          this.basis.purchase_charge1_supplier=[]
          this.purchase_charge1_supplier.forEach(res=>{
              this.basis.purchase_charge1_supplier.push({
                  id:res,
                  name:this.getEnumValue(this.supplier1,res)
              })
          })
      },
      remove1(e){
          this.supplier1.forEach((item,index)=>{
              if(item.id==e){
                  this.basis.purchase_charge1_supplier.splice(index,1)
                  this.supplier1.splice(index,1)
              }
          })
      },
      remove2(e){
          this.supplier2.forEach((item,index)=>{
              if(item.id==e){
                  this.basis.purchase_charge2_supplier.splice(index,1)
                  this.supplier2.splice(index,1)
              }
          })
      },
      remove3(e){
          this.supplier3.forEach((item,index)=>{
              if(item.id==e){
                  this.basis.purchase_charge3_supplier.splice(index,1)
                  this.supplier3.splice(index,1)
              }
          })
      },
      selectSupplier2(){
          this.basis.purchase_charge2_supplier=[]
          this.purchase_charge2_supplier.forEach(res=>{
              this.basis.purchase_charge2_supplier.push({
                  id:res,
                  name:this.getEnumValue(this.supplier2,res)
              })
          })
      },
      selectSupplier3(){
          this.basis.purchase_charge3_supplier=[]
          this.purchase_charge3_supplier.forEach(res=>{
              this.basis.purchase_charge3_supplier.push({
                  id:res,
                  name:this.getEnumValue(this.supplier3,res)
              })
          })
      },
      remoteMethod2(query) {
          if (query !== '') {
              this.loading2 = true;
              setTimeout(() => {
                  supplier_lists(query).then(res=>{
                      this.supplier2 = this.basis.purchase_charge2_supplier
                      res.data.forEach(item=>{
                        this.supplier2=this.supplier2.concat(item)
                      })
                      // var r = [];
                      //  for(var i = 0, l = this.supplier2.length; i < l; i++) {
                      //   for(var j = i + 1; j < l; j++)
                      //    if (this.supplier2[i].id === this.supplier2[j].id) j = ++i;
                      //   r.push(this.supplier2[i]);
                      //  }
                      // this.supplier2 = r
                      query = ''
                      this.loading2 = false;
                  })
              }, 200);
          }
      },
      remoteMethod3(query) {
          if (query !== '') {
              this.loading3 = true;
              setTimeout(() => {
                  supplier_lists(query).then(res=>{
                      this.supplier3 = this.basis.purchase_charge3_supplier
                      res.data.forEach(item=>{
                        this.supplier3=this.supplier3.concat(item)
                      })
                      query = ''
                      this.loading3 = false;
                  })
              }, 200);
          }
      },
      handleAvatarSuccess_updateAtlas(res, file, fileList) {
          if (file.response.code == 0) {
              this.Atlas = [
                  {
                      filename: res.data.filename,
                      filepath: res.data.filepath,
                      origin: res.data.origin
                  }
              ];
          } else {
              this.$message.error(file.response.msg);
          }
      },
      //移除文件
      beforeRemove(file, fileList) {
          return this.$i18n.locale == "cn"
              ? this.$confirm(`确定移除 ${file.name}？`)
              : this.$confirm(`Confirm removal ${file.name}？`);
      },
      //删除Atlas
      handleDel_Atlas(index) {
          destroy_msds(this.$route.query.id,index,this)

      },
    fetchData() {
      this.$route.query.add = false;
      this.purchase_charge1_supplier=[];
      this.purchase_charge2_supplier=[];
      this.purchase_charge3_supplier=[];
      this.supplier1=[];
      this.supplier2=[];
      this.supplier3=[];
      this.basis = {
        id: "",
        name: "",
        name_cn: "",
        iupac_name: "",
        name_alias: "",
        inchi: "",
        inchi_key: "",
        smiles: "",
        cas: "",
        mdl: "",
        mf: "",
        mw: "",
        purchase_charge1: "",
        purchase_charge2: "",
        purchase_charge3: "",
        purchase_charge1_supplier:[],
        purchase_charge2_supplier:[],
        purchase_charge3_supplier:[],
        purchase_charge2_expired: "",
        purchase_charge3_expired: "",
        sale_charge1: "",
        prod_level_id: "",
        prohibited: "",
        standardpurity: "",
        unit_id: "",
        // 包装要求,
        verified_at: "",
        settle_price:'',
        change_logs:[],
        chemprodappearance_id: "",
        user_id: "",
        chemicalcate_id: "",
        expired_interval: "",
        notice_size: "",
        // notice_unit_id:1,
        hscode: "",
        // storage_cond_id: "",
        storage_cond:[],
        inland_trancond_id: "",
        abroad_trancond_id: "",
        note: "",
        note1:'',
        is_advantage: "",
        is_secret: "",
        is_checked: "",
        can_saled: 3,
        img: "",
        patr: "",
        cate: []
      };
      this.Atlas = []
      // this.now = Date.now();
      if (this.$route.query.id) {
        this.pramas.prod_id= this.$route.query.id
        form_edit(this.$route.query.id).then(res => {
          if(res.data.prod.msds_material){
              this.Atlas=[res.data.prod.msds_material]
          }
          this.prod_statuses = res.enum.prod_statuses;
          this.basis.id = this.$route.query.id;
          this.basis.name = res.data.name ? res.data.name : res.data.prod.name;
          this.basis.name_cn = res.data.name_cn
            ? res.data.name_cn
            : res.data.prod.name_cn;
          this.basis.name_cn_alias = res.data.prod.name_cn_alias;
          this.basis.name_alias = res.data.prod.name_alias;
          this.basis.iupac_name = res.data.prod.iupac_name;
          this.basis.inchi = res.data.prod.inchi;
          this.basis.inchi_key = res.data.prod.inchi_key;
          this.basis.smiles = res.data.prod.smiles;
          this.basis.cas =
            res.data.prod && res.data.prod.cas
              ? res.data.prod.cas
              : res.data.cas;
          this.basis.prodno = res.data.prod
            ? res.data.prod.prodno
            : res.data.prodno;
          this.basis.productid2 = res.data.prod
            ? res.data.prod.productid2
            : res.data.productid2;
          this.basis.productid3 = res.data.prod
            ? res.data.prod.productid3
            : res.data.productid3;
          this.basis.itemno = res.data.prod
            ? res.data.prod.itemno
            : res.data.itemno;
          this.basis.mdl = res.data.prod ? res.data.prod.mdl : "";
          this.basis.mf = res.data.prod.mf;
          this.basis.mw = res.data.prod.mw;
          this.basis.img = res.data.prod.img;
          this.basis.chemicalcate_id = res.data.prod.chemicalcate_id;
          this.basis.is_advantage = res.data.prod.is_advantage;
          this.basis.is_secret = res.data.prod.is_secret;
          this.basis.expired_interval = res.data.prod.expired_interval;
          this.basis.notice_size = res.data.prod.notice_size;
          // this.basis.notice_unit_id = res.data.prod.notice_unit_id?res.data.prod.notice_unit_id:1
          this.basis.unit_id = res.data.prod.unit_id;
          this.basis.inland_trancond_id = res.data.prod.inland_trancond_id;
          this.basis.abroad_trancond_id = res.data.prod.abroad_trancond_id;
          this.basis.sale_charge1 = res.data.prod.sale_charge1;
          this.basis.purchase_charge1 = res.data.prod.purchase_charge1;
          this.basis.purchase_charge2 = res.data.prod.purchase_charge2;
          this.basis.purchase_charge3 = res.data.prod.purchase_charge3;
          this.basis.purchase_charge1_supplier = res.data.prod.purchase_charge1_supplier?res.data.prod.purchase_charge1_supplier:[];
          this.basis.purchase_charge2_supplier = res.data.prod.purchase_charge2_supplier?res.data.prod.purchase_charge2_supplier:[];
          this.basis.purchase_charge3_supplier = res.data.prod.purchase_charge3_supplier?res.data.prod.purchase_charge3_supplier:[];
          this.supplier1=res.data.prod.purchase_charge1_supplier?res.data.prod.purchase_charge1_supplier:[];
          this.supplier2=res.data.prod.purchase_charge2_supplier?res.data.prod.purchase_charge2_supplier:[];
          this.supplier3=res.data.prod.purchase_charge3_supplier?res.data.prod.purchase_charge3_supplier:[];
          this.basis.purchase_charge1_supplier.forEach(res=>{
              this.purchase_charge1_supplier.push(res.id)
          })
          this.basis.purchase_charge2_supplier.forEach(res=>{
              this.purchase_charge2_supplier.push(res.id)
          })
          this.basis.purchase_charge3_supplier.forEach(res=>{
              this.purchase_charge3_supplier.push(res.id)
          })
          this.basis.purchase_charge2_expired =
            res.data.prod.purchase_charge2_expired;
          this.basis.purchase_charge3_expired =
            res.data.prod.purchase_charge3_expired;
          this.basis.user_id = res.data.prod.user_id;
          this.basis.verified_at = res.data.prod.verified_at;
          this.basis.settle_price = res.data.prod.settle_price;
          this.basis.change_logs = res.data.prod.change_logs?res.data.prod.change_logs:[];
          this.basis.prohibited = res.data.prod.prohibited;
          this.basis.is_checked = res.data.prod.is_checked;
          this.basis.can_saled = res.data.prod.can_saled?res.data.prod.can_saled:3;
          this.basis.standardpurity = res.data.prod.standardpurity;
          this.basis.prod_level_id = res.data.prod.prod_level_id;
          this.basis.note = res.data.prod.note;
          this.basis.note1 = res.data.prod.note1;
          this.basis.patr = res.data.prod.patr;
          // this.basis.storage_cond_id = res.data.prod.storage_cond_id;
          this.basis.storage_cond = res.data.prod.storage_cond?res.data.prod.storage_cond:[];
          this.basis.hscode = res.data.prod.hscode;
          this.basis.chemprodappearance_id =
            res.data.prod.chemprodappearance_id;
          if (
            this.basis.sale_charge1 &&
            !this.GEnums.Sales[this.sale_charge1]
          ) {
            this.disabled_sale_charge1 = this.basis.sale_charge1;
            this.sale_charges[
              this.GEnums.Users[this.basis.sale_charge1].id
            ] = this.GEnums.Users[this.basis.sale_charge1];
          }
          if (
            this.basis.purchase_charge1 &&
            !this.GEnums.Purchases[this.basis.purchase_charge1]
          ) {
            this.disabled_purchase_charge1 = this.basis.purchase_charge1;
            this.charges1[
              this.GEnums.Users[this.basis.purchase_charge1].id
            ] = this.GEnums.Users[this.basis.purchase_charge1];
          }
          if (
            this.basis.purchase_charge2 &&
            !this.GEnums.Purchases[this.basis.purchase_charge2]
          ) {
            this.disabled_purchase_charge2 = this.basis.purchase_charge2;
            this.charges2[
              this.GEnums.Users[this.basis.purchase_charge2].id
            ] = this.GEnums.Users[this.basis.purchase_charge2];
          }
          if (
            this.basis.purchase_charge3 &&
            !this.GEnums.Purchases[this.basis.purchase_charge3]
          ) {
            this.disabled_purchase_charge3 = this.basis.purchase_charge3;
            this.charges3[
              this.GEnums.Users[this.basis.purchase_charge3].id
            ] = this.GEnums.Users[this.basis.purchase_charge3];
          }
          prodcate().then(res_a => {
            this.prodcates = res_a.data;
            if (res.data.prod.cate && res.data.prod.cate.length > 0) {
              this.permissions_list = [];
              this.basis.cate = res.data.prod.cate;
              this.prodcates.forEach(item => {
                if (res.data.prod.cate.indexOf(item.id) > -1) {
                  this.permissions_list.push(item.name);
                }
                if (item.child && item.child.length > 0) {
                    item.child.forEach(i => {
                      if (res.data.prod.cate.indexOf(i.id) > -1) {
                        this.permissions_list.push(i.name);
                      }
                    });
                  }
              });
            }
          });
        });
        this.msds_show = true;
        this.sixth_show = true;
        this.second_show = true;
        this.fourth_show = true;
        this.five_show = true;
      } else {
        form().then(res => {
          this.prod_statuses = res.enum.prod_statuses;
          this.basis.id = res.data.id;
          this.basis.name = res.data.name;
          this.basis.name_cn = res.data.name_cn;
          this.basis.cas = res.data.cas;
          this.basis.mdl = res.data.mdl;
          this.basis.prodno = res.data.prodno;
          this.basis.productid2 = res.data.productid2;
          this.basis.itemno = res.data.itemno;
          this.basis.user_id = Number(util.cookies.get("user_id"));
          var d = new Date();
          var y1 = d.getFullYear();
          var m1 = d.getMonth() + 1;
          var d1 = d.getDate();
          if (m1 < 10) {
            m1 = "0" + m1;
          }
          if (d1 < 10) {
            d1 = "0" + d1;
          }
          this.basis.purchase_charge2_expired = futureDate(
            y1 + "-" + m1 + "-" + d1,
            365
          );
        });
        prodcate().then(res => {
          this.prodcates = res.data;
        });
        this.sixth_show = false;
        this.msds_show = false;
        this.second_show = false;
        this.fourth_show = false;
        this.five_show = false;
      }
      this.sale_charges = JSON.parse(JSON.stringify(this.GEnums.Sales));
      this.charges1 = this.charges2 = this.charges3 = JSON.parse(
        JSON.stringify(this.GEnums.Purchases)
      );
      this.Prohibited = this.GEnums.Prohibited;
      this.Standardpurity = this.GEnums.Standardpurity;
      this.Unit = this.GEnums.Unit;
      this.Unit_limited = []
      for(let index in this.GEnums.Unit){
        if(this.GEnums.Unit[index].pid==0){
          this.Unit_limited.push(this.GEnums.Unit[index])
        }
      }
      this.ChemicalAppearance = this.GEnums.ChemicalAppearance;
      this.ChemicalType = this.GEnums.ChemicalType;
      this.StorageCondition = this.GEnums.StorageCondition;
      this.Trancondition = this.GEnums.Trancondition;
      this.Users = this.GEnums.Users;
      this.Productgrade = this.GEnums.Productgrade;
      this.CommonSpec = this.GEnums.CommonSpec;
      this.Packagelevel = this.GEnums.Packagelevel;
      this.Currency = this.GEnums.Currency;
      this.testitem_enum = [];
      for (let i in this.GEnums.Testitem) {
        if (this.GEnums.Testitem[i].pid == 0) {
          this.testitem_enum.push(this.GEnums.Testitem[i]);
        }
      }
      this.activeName = "first";
      this.Statistics_data = {
        from_date: "",
        to_date: ""
      };
    },
    fan_cn(item) {
      translate("zh", "en", item).then(res => {
        this.basis.name = res.data.result.result;
      });
    },
    fan(item) {
      translate("en", "zh", item).then(res => {
        this.basis.name_cn = res.data.result.result;
      });
    },
    settle_log(list){
      this.logs_list = list
      this.dialogLogs = true
    },
    spec_list() {
      spec(this.$route.query.id).then(res => {
        this.spec = res.data;
      });
    },
    testitem_list() {
      prod_testitem(this.$route.query.id).then(res => {
        this.testitem = res.data;
      });
    },
    zhankai(){
      this.zhankai_ = !this.zhankai_
      getStock(this.$route.query.id).then(res => {
        this.spec_stock = []
          for (let i in res.data) {
            if(this.zhankai_){
              this.spec_stock.push({
                prod: i,
                preout: res.data[i].preout,
                remain: res.data[i].remain,
                stock: res.data[i].stock,
                unit_id: res.data[i].unit_id
              });
            }else{
              if(res.data[i].preout||res.data[i].remain||res.data[i].stock||res.data[i].unit_id){
                this.spec_stock.push({
                  prod: i,
                  preout: res.data[i].preout,
                  remain: res.data[i].remain,
                  stock: res.data[i].stock,
                  unit_id: res.data[i].unit_id
                });
              }
            }
          }
        });
    },
    handleClick(tab, event) {
      this.spec_stock = [];
      if (tab.index == 2) {
        this.spec_list();
        getStock(this.$route.query.id).then(res => {
          for (let i in res.data) {
            if(res.data[i].preout||res.data[i].remain||res.data[i].stock||res.data[i].unit_id){
              this.spec_stock.push({
                prod: i,
                preout: res.data[i].preout,
                remain: res.data[i].remain,
                stock: res.data[i].stock,
                unit_id: res.data[i].unit_id
              });
            }
          }
        });
      } else if (tab.index == 1 && this.$route.query.id) {
        getStatistics(this.$route.query.id, this.Statistics_data).then(res => {
          this.Statistics = res.data;
        });
      } else if (tab.index == 3 && this.$route.query.id) {
        this.testitem_list();
      } else if (tab.index == 4 && this.$route.query.id) {
        Prod_property(this.$route.query.id).then(res => {
          if(res.data){
            this.property = res.data;
            if(res.data.ghs&&res.data.ghs.length>0){
              this.property.signalword = 'danger'
              if(res.data.ghs.length==1&&res.data.ghs[0]=='GHS07'){
                this.property.signalword = 'warning'
              }
            }else{
              this.property.signalword = ''
              this.property.ghs = []
            }
          }
        });
      } else if (tab.index == 5 && this.$route.query.id){
        this.Msds_click(this.$route.query.id)
      }
    },
    Msds_click(id){
        var obj = {
            prod_id:id
        }
            msds(obj).then(res => {
                if (res && res.code == 0) {
                    this.msds_data = {
                        prod_id:id,
                        name: res.data.prod_info.name,
                        prodno: res.data.prod_info.prodno,
                        cas: res.data.prod_info.cas,
                        mf: res.data.prod_info.mf,
                        mw: res.data.prod_info.mw,
                        appearance: res.data.appearance,
                        mp: res.data.prod_info.property?res.data.prod_info.property.mp:'',
                        bp: res.data.prod_info.property?res.data.prod_info.property.bp:'',
                        fp: res.data.prod_info.property?res.data.prod_info.property.flashpoint:'',
                        it: res.data.prod_info.property?res.data.prod_info.property.uncode:"",
                        trait: res.data.prod_info.property?res.data.prod_info.property.specificity:'',
                        created_at: init(res.data.createdate),
                        type: 'inquiry_kd',
                    }
                    if(!this.msds_data.it){
                        this.msds_data.it='no data available'
                    }
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            }).catch(rr => {})
    },
    add_msds(item) {
        if(!item.it){
            item.it='no data available'
        }
        msds_generate_prod(item, this);
    },
    ghs_change(){
      if(this.property.ghs&&this.property.ghs.length>0){
        this.property.signalword = 'danger'
        if(this.property.ghs.length==1&&this.property.ghs[0]=='GHS07'){
          this.property.signalword = 'warning'
        }
      }else{
        this.property.signalword = ''
      }
    },
    handleCheckChange(data, checked, indeterminate) {
      let that = this;
      if (checked) {
          that.basis.cate.push(data.id);
          that.permissions_list.push(data.name);
      } else {
        that.basis.cate.forEach(function(items, index) {
          if (items == data.id) {
            that.basis.cate.splice(index, 1);
            that.permissions_list.splice(index, 1);
          }
        });
      }
    },
    Statistics_search() {
      getStatistics(this.$route.query.id, this.Statistics_data).then(res => {
        this.Statistics = res.data;
      });
    },
    spec_add() {
      this.spec_item = {
        pack_size: "",
        pack_unit_id: "",
        purity: "",
        notice_size: "",
        notice_unit_id: "",
        stock: "",
        stock_unit_id: "",
        inland_price: "",
        abroad_price: "",
        note: ""
      };
      this.spec_index = "";
      this.dialogSpec = true;
    },
    testitem_add() {
      this.testitem_item = {
        testitem_id: "",
        quality_range: "",
        quality_index: "",
        fee: "",
        note: ""
      };
      this.testitem_index = "";
      this.dialogTestitem = true;
    },
    spec_edit(item, index) {
      this.spec_item = JSON.parse(JSON.stringify(item));
      this.spec_index = index;
      this.dialogSpec = true;
    },
    testitem_edit(item, index) {
      this.testitem_item = JSON.parse(JSON.stringify(item));
      this.testitem_index = index;
      this.dialogTestitem = true;
    },
    pack_change(item) {
      this.spec_item.pack_size = item.replace(/[a-zA-Z]/g, "");
      if (item.replace(/[0-9]*/g, "") == "g") {
        this.spec_item.pack_unit_id = 1;
      } else if (item.replace(/[0-9]*/g, "") == "mg") {
        this.spec_item.pack_unit_id = 5;
      } else if (item.replace(/[0-9]*/g, "") == "ml") {
        this.spec_item.pack_unit_id = 2;
      } else if (item.replace(/[0-9]*/g, "") == "l") {
        this.spec_item.pack_unit_id = 6;
      } else if (item.replace(/[0-9]*/g, "") == "kg") {
        this.spec_item.pack_unit_id = 4;
      } else {
        this.spec_item.pack_unit_id = "";
      }
    },
    // purity_change(item) {
    //   if (item.indexOf("%") == -1) {
    //     this.spec_item.purity = item + "%";
    //     this.$forceUpdate();
    //   }
    // },
    querySearchAsync_contact(queryString, cb) {
      var restaurants = [];
      obj(restaurants, this.Standardpurity);
      cb(restaurants);
    },
    handleSelect_contact(item) {
      this.spec_item.purity = item.name;
    },
    handleSelect_contact_b(item) {
      this.basis.standardpurity = item.name;
    },
    smiles_change() {
      var obj = {
        smiles: this.basis.smiles,
        prod_id: this.basis.id
      };
      listTotalPost_smiles("prod/smiles", obj).then(res => {
        this.now = Date.now();
        if (res.data.mf) {
          this.basis.mf = res.data.mf;
        }
        if (res.data.mw) {
          this.basis.mw = res.data.mw;
        }
        this.basis.img = res.data.img;
      });
    },
    iupac_change() {
      var obj = {
        iupac_name: this.basis.iupac_name,
        prod_id: this.basis.id
      };
      listTotalPost("prod/iupac", obj).then(res => {
        this.basis.smiles = res.data.smiles;
        this.basis.mf = res.data.mf;
        this.basis.mw = res.data.mw;
        this.basis.img = res.data.img;
        this.basis.inchi = res.data.inchi;
        this.basis.inchi_key = res.data.inchi_key;
      });
    },
    spec_save(item) {
      if (this.spec_index || this.spec_index === 0) {
        spec_update(item, this);
      } else {
        spec_create(item, this.$route.query.id, this);
      }
    },
    testitem_save(item) {
      if (this.testitem_index || this.testitem_index === 0) {
        testitem_update(item, this);
      } else {
        testitem_create(item, this.$route.query.id, this);
      }
    },
    property_save(item) {
      item.id = this.$route.query.id;
      updateProperty(item, this);
    },
    save_basis() {
      var a = 0
      var b= 0
      this.basis.purchase_charge1?a++:a=a
      this.basis.purchase_charge2?a++:a=a
      this.basis.purchase_charge3?a++:a=a
      this.basis.purchase_charge1_supplier.length>0?b++:b=b
      this.basis.purchase_charge2_supplier.length>0?b++:b=b
      this.basis.purchase_charge3_supplier.length>0?b++:b=b
      if(a>=2&&a!=b){
        this.$message({
                message: '请填入负责人对应的供应商',
                type: "error"
              });
      }else{
        this.loading_basis = true
        prod_update(this.basis)
          .then(res => {
            if (res && res.code == 0) {
              this.$message({
                message: "success",
                type: "success"
              });
              // this.back();
              this.pramas.prod_id = res.data.id
              this.sixth_show = true;
              this.msds_show = true;
              this.second_show = true;
              this.fourth_show = true;
              this.five_show = true;
              this.loading_basis = false
              // this.useID = res.data.id
              this.$route.query.id = res.data.id;
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
              this.loading_basis = false
            }
          })
          .catch(rr => {this.loading_basis = false});
      }
    },
    del_inventory(index) {
      // this.spec.splice(index, 1);
      spec_delete(index, this);
    },
    del_testitem(index) {
      // this.testitem.splice(index, 1);
      testitem_delete(index, this);
    },
    back() {
      let that = this;
      that.$router.push({
        path: "/Prod/components",
        name: "Prod-index"
      });
      const tagName = "Prod-Add2";
      that.closeAdd({ tagName });
    }
  }
};
function init(item) {
  var date = new Date(item);
  //年
  var year = date.getFullYear();
  //月
  var month = date.getMonth() + 1;
  //日
  var day = date.getDate();
  month = month < 10 ? "0" + month : month; //如果小于10即显示为09月
  day = day < 10 ? "0" + day : day; //如果小于10即显示为09日

  return year + "-" + month + "-" + day;
}
function obj(arr, object) {
  if (arr.length == 0) {
    if (object instanceof Object) {
      for (let i in object) {
        arr.push(object[i]);
      }
    } else {
      arr = object;
    }
  }
}
</script>
