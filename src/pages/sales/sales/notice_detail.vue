<style lang="scss" scoped type="text/scss">
/deep/ .div {
  width: 100%;
  overflow: auto;
  font-size: 14px;
  border: 1px solid #e5e5e5;
  .el-input__inner {
    border: 0px;
    padding: 0px 0px;
  }
  .el-dialog {
    table {
      width: 100%;
    }
  }
  .form_title {
    background: #f1f1f1;
    margin-bottom: 0px;
    .el-button {
      color: black;
    }
  }
  td {
    padding: 0px 5px;
  }
  th {
    padding: 5px;
  }
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
  table {
    border-collapse: collapse;
    margin-top: 5px;
    .el-select {
      width: 100%;
    }
  }
}

/deep/ .quoteInput {
  padding: 20px 0px;
  .el-input__inner {
    border: 1px solid #dcdfe6;
    padding: 0px 10px;
  }
}

/deep/ .dateInputStyle {
  .el-input__inner {
    padding: 0px 15px;
  }
  .el-input__prefix {
    left: -8px;
  }
}
/deep/ table {
  width: 100%;
  border-collapse: collapse;
  .el-checkbox {
    margin: 5px;
  }
  /deep/.el-checkbox__label {
    padding: 2px;
  }
  .el-input__inner {
    border: 0px;
    padding: 0px;
  }
  td {
    padding: 5px;
    line-height: 30px;
  }
}
.danger{
        font-size: 12px;
    }
</style>
<template>
  <d2-container>
    <div class="div">
      <!-- 页面 -->
      <el-form label-width="0px" :model="contract" label-position="right">
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show5 = !form_show5" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale173')}}</b>
              <!-- 发票信息 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show5" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">Sold By</th>
                <th class="td">Manufactured By</th>
                <th class="td">Shipped By</th>
                <th class="td">Invoice No</th>
                <th class="td">Terms</th>
              </tr>
              <tr>
                <td>
                  <el-select v-model="sold_by" size="mini" placeholder="Please Select">
                    <el-option
                      v-for="(item,index) in sold_info"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="manufactured_by" size="mini" placeholder="Please Select">
                    <el-option
                      v-for="(item,index) in manufactured_info"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select v-model="shipped_by" size="mini" placeholder="Please Select">
                    <el-option
                      v-for="(item,index) in shipped_info"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="contract.invoice_number" size="mini" disabled></el-input>
                </td>
                <td>
                  <el-input v-model="contract.terms" size="mini"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>

        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale131')}}</b>
              <!-- 需求信息 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table v-for="(item,index) in contract.details" border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width="100">{{$t('sale.add.sale84')}}</th>
                <!-- 询单号 -->
                <th class="td">Cas</th>
                <th class="td" width="300">{{$t('sale.add.sale15')}}</th>
                <!-- 产品名称 -->
                <th class="td">{{$t('sale.add.sale16')}}</th>
                <!-- 规格 -->
                <th class="td">{{$t('sale.add.sale17')}}</th>
                <!-- 纯度 -->
                <th class="td">{{$t('sale.add.sale18')}}</th>
                <!-- 数量 -->
                <th class="td">{{$t('sale.add.sale21')}}</th>
                <!-- 单价 -->
                <th class="td">{{$t('sale.add.sale22')}}</th>
                <!-- 金额 -->
                <th class="td">{{$t('sale.add.sale135')}}</th>
                <!-- 货币符号 -->
              </tr>
              <tr>
                <td>{{item.inquiry_id}}</td>
                <td>{{item.cas}}</td>
                <td>{{item.product_name}}</td>
                <td>{{item.package}}</td>
                <td>{{item.purity}}</td>
                <td>
                  {{item.quantity}}
                  <span v-for="unit in units">
                    <span v-if="unit.id==item.quantity_unit">{{unit.name}}</span>
                  </span>
                </td>
                <td>{{item.price}}</td>
                <td class="d2-text-center">{{item.total_money}}</td>
                <td class="d2-text-center">
                  <span v-for="c in currencys">
                    <span v-if="item.currency_id==c.id">{{c.name}}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale173')}}</td>
                <!-- 发票情况 -->
                <td colspan="9">
                  <span v-for="item in invoice_type" :key="item.id">
                    <span v-if="item.id==item.invoice_type_id">{{item.name}}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale27')}}</td>
                <!-- 分析要求 -->
                <td colspan="9" class="checkbox">
                  <span
                    v-for="i in test_item"
                    :key="i.id"
                    v-if="i.child.length==0"
                    :label="i.id"
                    style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                  <div v-for="i in test_item" :key="i.id" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                    <!-- <el-checkbox v-model="i.checked" name="type"> -->
                      <span class="checked_items" style="font-weight: bold;">{{i.name}}</span>:
                    <!-- </el-checkbox>: -->
                    <el-checkbox
                      v-for="j in i.child"
                      :key="j.id"
                      :label="j.id"
                      v-model="j.checked"
                      class="checkbox_nei"
                    >
                      <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
                    </el-checkbox>
                  </div>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale28')}}</td>
                <!-- 其他要求 -->
                <td colspan="3">{{item.checked_requirement}}</td>
                <td>{{$t('sale.add.sale26')}}</td>
                <!-- 附加费用 -->
                <td>{{item.additional_cost}}</td>
                <td>{{$t('sale.add.sale124')}}</td>
                <!-- 佣金 -->
                <td>{{item.commission}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale31')}}</td>
                <!-- 包装要求 -->
                <td colspan="3">
                  <div v-for="(i,index_i) in item.claims">
                    <el-input
                      v-model="i.claim_pack_number"
                      style="width: 80px;border: 1px solid #f2f2f2;"
                    ></el-input>*
                    <el-input
                      v-model="i.claim_pack_size"
                      style="width: 80px;border: 1px solid #f2f2f2;"
                    ></el-input>/
                    <el-select
                      v-model="i.claim_unit_id"
                      style="width: 100px;border: 1px solid #f2f2f2;"
                    >
                      <el-option v-for="i in units" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select>
                  </div>
                </td>
                <td>{{$t('sale.add.sale32')}}</td>
                <!-- 要求发货时间 -->
                <td colspan="5">{{item.required_delivery_date}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale33')}}</td>
                <!-- 标签要求 -->
                <td colspan="3">{{item.label_requirement}}</td>
                <td>{{$t('sale.add.sale34')}}</td>
                <!-- 发货备注 -->
                <td colspan="5">{{item.deliver_note}}</td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale35')}}</td>
                <!-- 随货文件 -->
                <td colspan="6">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{$t('sale.add.sale29')}}</td>
                <!-- 是否需要报关 -->
                <td colspan="2">{{item.if_declare}}</td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale186')}}</b>
              <!-- 库存 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
              <tr>
                <th width="80">{{$t('sale.add.sale187')}}</th>
                <!-- 入库时间 -->
                <th>CAS/子合同号</th>
                <th>{{$t('sale.add.sale190')}}/{{$t('sale.add.sale188')}}</th>
                <!-- 仓库 -->
                <th width='90'>采购人员/{{$t('sale.add.sale189')}}</th>
                <!-- 包装 -->
                <th>{{$t('sale.add.sale191')}}/Po</th>
                <!-- 检测状态 -->
                <th>{{$t('sale.add.sale228')}}</th>
                <!-- 产品外观 -->
                <!-- <th>{{$t('sale.add.sale190')}}</th> -->
                <!-- 批次 -->
                <!-- <th>采购人员</th> -->
                <th width='60'>{{$t('sale.add.sale16')}}</th>
                <!-- 规格 -->
                <th>{{$t('sale.add.sale186')}}</th>
                <!-- 库存 -->
                <th>{{$t('sale.add.sale192')}}</th>
                <!-- 预占数量 -->
                <th>{{$t('sale.add.sale65')}}</th>
                <!-- 发货方式 -->
                <th>{{$t('sale.add.sale193')}}</th>
                <!-- 应收款 -->
                <th width='60'>{{$t('sale.add.sale135')}}</th>
                <!-- 货币符号 -->
                <th>{{$t('sale.add.sale114')}}</th>
                <!-- 样品 -->
                <th width='80'>{{$t('sale.add.sale194')}}</th>
                <!-- 发货 -->
              </tr>
              <tr v-for="item in contract.preout_list">
                <td>{{item.created_at}}</td>
                <td>
                  {{item.cas}}
                  <span v-if="item.prod.is_danger==null" class="danger">(未知)</span>
                  <span v-if="item.prod.is_danger==0" class="danger">(非危)</span>
                  <el-tooltip placement="top"  v-if="item.prod.is_danger==1">
                    <div slot="content">
                      uncode:{{item.prod.property.uncode}},packinggroup:{{item.prod.property.packinggroup}},hazardclass:{{item.prod.property.hazardclass}}
                    </div>
                    <span style="color: red;" class="danger">(危险品)</span>
                  </el-tooltip>
                  <br>
                  {{item.contract_detail?item.contract_detail.contract_number:''}}
                </td>
                <td>{{item.inventory.batchno}}<br>{{item.inventory.warehouse.name}}</td>
                <td>{{item.inventory.purchaser?item.inventory.purchaser.name:''}}<br>
                  <span style="color:red;">{{preout_type_info[item.type]?preout_type_info[item.type].name:''}}</span>
                </td>
                <td>
                  <div v-if="item.inventory.if_need_check==2" style="color:#67C23A;">免检</div>
                    <!-- 结果 -->
                  <div
                    v-if="item.inventory.checked_result==1"
                    style="color:#67C23A;margin-right:5px;"
                  >{{getEnumValue(enums.order_result,item.inventory.checked_result)}}</div>
                  <div
                    v-else-if="item.inventory.checked_result==3"
                    style="color:#F56C6C;margin-right:5px;"
                  >{{getEnumValue(enums.order_result,item.inventory.checked_result)}}</div>
                  <div
                    v-else
                    style="color:#E6A23C;margin-right:5px;"
                  >{{getEnumValue(enums.order_result,item.inventory.checked_result)}}</div>
                  <!-- 检测状态 -->
                  <div
                    v-if="item.inventory.if_need_check!=2&&item.inventory.quality_orders&&item.inventory.quality_orders.length>0"
                  >
                    <span
                      v-if="item.inventory.flow_status==1300"
                      style="color:#67C23A;"
                    >{{getEnumValue(enums.flow_statuses,item.inventory.flow_status)}}</span>
                    <span
                      v-else-if="item.inventory.flow_status==1001||item.inventory.flow_status==1000"
                      style="color:#F56C6C;"
                    >{{getEnumValue(enums.flow_statuses,item.inventory.flow_status)}}</span>
                    <span
                      v-else
                      style="color:#E6A23C;"
                    >{{getEnumValue(enums.flow_statuses,item.inventory.flow_status)}}</span>
                  </div>
                  <div>{{item.saler_contract.customer_po}}</div>
                </td>
                <td>{{getEnumValue(GEnums.ChemicalAppearance,item.inventory.chemprodappearance_id)}}</td>
                <!-- <td>{{item.inventory.batchno}}</td> -->
                <!-- <td>{{item.inventory.purchaser?item.inventory.purchaser.name:''}}</td> -->
                <td>
                  {{item.packs?item.packs.packsize:'/'}}
                  <span v-for="u in units">
                    <span v-if="item.packs&&item.packs.unit_id==u.id">{{u.name}}</span>
                  </span>
                </td>
                <td>
                  <div v-if="item.type==2">
                    {{item.inventory.remained_stock}}
                    <span v-for="u in units">
                      <span v-if="item.inventory.base_unit_id==u.id">{{u.name}}</span>
                    </span>
                  </div>
                  <div v-else>{{item.packs.stock}} <br>
                    <span v-if="item.packs">({{Number(item.packs.stock)*Number(item.packs.packsize)}}{{getEnumValue(units,item.packs.unit_id)}})</span> 
                  </div>
                  <!-- <div>{{item.saler_contract.customer_po}}</div> -->
                </td>
                <td>
                  <div v-if="item.type==2">
                    {{item.base_quantity}}
                    <span v-for="u in units">
                      <span v-if="item.base_quantity_unit==u.id">{{u.name}}</span>
                    </span>
                  </div>
                  <div v-else>{{item.package_nums}} <br>
                    <span v-if="item.packs">({{Number(item.package_nums)*Number(item.packs.packsize)}}{{getEnumValue(units,item.packs.unit_id)}})</span> 
                  </div>
                  <div v-if="item.split_package_log_id>0">
                    <el-tooltip placement="top">
                      <div slot="content">从{{item.split_package_log.out_shelf}}货架中规格为{{item.split_package_log.packsize}}
                        {{getEnumValue(units,item.split_package_log.unit_id)}}的拆出
                      </div>
                      <span style="color:red;cursor: pointer;">(拆)</span>
                    </el-tooltip>
                  </div>
                </td>
                <td>
                  <span v-for="d in delivery_type" :key="d.id">
                    <span v-if="d.id==contract.notice_info.delivery_type_id">{{d.name}}</span>
                  </span>
                </td>
                <td class="d2-text-center">
                  <el-input v-model="item.total_money" @input="y_money()" disabled style="width: 80px;"></el-input>
                </td>
                <td class="d2-text-center">
                  <span v-for="c in currencys">
                    <span v-if="item.currency_id==c.id">{{c.name}}</span>
                  </span>
                </td>
                <td class="d2-text-center" width='60'>
                  <el-select size="mini" v-model="item.if_sample" clearable style="width: 100%;">
                    <el-option
                      v-for="i in if_sample_info"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td v-if="item.status==0" class="d2-text-center">
                  <el-button
                    type="danger"
                    @click="cancel(item.id,item.prod_id,contract.preout_list)"
                    size="mini"
                  >{{$t('sale.add.sale203')}}</el-button>
                  <!-- 取消预占 -->
                </td>
                <td v-else>
                  <span v-for="item in preout_status" :key="item.id">
                    <span v-if="item.id==item.status">{{item.name}}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td colspan="10"></td>
                <td colspan="2"><b>Number of products:</b></td>
                <td colspan="2">
                  <el-input size="mini" :value="contract.preout_list.length" disabled style="width:100%;"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="10"></td>
                <td colspan="2"><b>Subtotal:</b></td>
                <td colspan="2">
                  <el-input size="mini" v-model="contract.Subtotal" disabled style="width:100%;"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="10"></td>
                <td colspan="2"><b>Shipping & Handling:</b></td>
                <td colspan="2">
                  <el-input size="mini" v-model="contract.freight" @input="change_()" style="width:100%;"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="10"></td>
                <td colspan="2"><b>Adjustment:</b></td>
                <td colspan="2">
                  <el-input size="mini" v-model="contract.adjustment" @input="change_()" style="width:100%;"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="10"></td>
                <td colspan="2"><b>The total amount of:</b></td>
                <td colspan="2">
                  <el-input size="mini" v-model="contract.total_amount" disabled style="width:100%;"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>{{$t('sale.add.sale195')}}</b>
              <!-- 发货通知 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td" width="200">{{$t('sale.add.sale178')}}</th>
                <!-- 客户名称 -->
                <th style="width: 200px;">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale63')}}
                </th>
                <!-- 收货地址 -->
                <th style="width: 200px;">{{$t('sale.add.sale64')}}</th>
                <!-- 收票地址 -->
                <th class="td" width="100px">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale65')}}
                </th>
                <!-- 发货方式 -->
                <th class="td" width="100px">
                  <span style="color:red;">*</span>
                  {{$t('sale.add.sale153')}}
                </th>
                <!-- 账号类型 -->
                <th class="td" width="100px">{{$t('sale.add.sale78')}}</th>
                <!-- 快递公司 -->
                <th class="td">{{$t('sale.add.sale68')}}</th>
                <!-- 快递账号 -->
              </tr>
              <tr>
                <td>{{contract.notice_info.customer_name}}</td>
                <td>
                  <el-select
                    v-model="contract.notice_info.delivery_address_id"
                    clearable
                    filterable
                    style="width: 90%"
                    placeholder
                  >
                    <el-option
                      v-for="(i,index) in receive_goods_addresses"
                      :key="index"
                      :label="i.address+'__'+i.contact_name+i.mobile"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                  <i class="el-icon-edit" style="cursor: pointer;" @click="delivery_edit()"></i>
                </td>
                <td>
                  <el-select
                    v-model="contract.notice_info.invoice_address_id"
                    clearable
                    filterable
                    style="width: 90%"
                    placeholder
                  >
                    <el-option
                      v-for="(i,index) in receive_invoice_addresses"
                      :key="index"
                      :label="i.address+'__'+i.contact_name+i.mobile"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                  <i class="el-icon-edit" style="cursor: pointer;" @click="invoice_edit()"></i>
                </td>
                <td>
                  <el-select
                    v-model="contract.notice_info.delivery_type_id"
                    filterable
                    style="width: 100%"
                  >
                    <el-option
                      v-for="(i,index) in delivery_type"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-select
                    v-model="contract.notice_info.express_account_type"
                    @change="select_express_account_type(contract.notice_info.express_account_type)"
                    filterable
                    style="width: 80%"
                    placeholder
                  >
                    <el-option
                      v-for="(i,index) in express_account_type"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                  <i class="el-icon-edit" style="cursor: pointer;" @click="account_edit()"></i>
                </td>
                <td>
                  <el-select
                    v-model="contract.notice_info.express_company_id"
                    @change="select_express_company(contract.notice_info.express_company_id)"
                    clearable
                    filterable
                    placeholder
                  >
                    <el-option
                      v-for="(i,index) in express_company"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-autocomplete
                    clearable
                    v-model="contract.notice_info.express_account"
                    :fetch-suggestions="querySearchAsync_account"
                    placeholder
                    @select="handleSelect_account"
                    style="width:100%;"
                  >
                    <template slot-scope="{ item }">
                      <div>{{ item.accounts }}</div>
                    </template>
                  </el-autocomplete>
                </td>
              </tr>
              <tr>
                <td>{{$t('sale.add.sale34')}}</td>
                <!-- 备注 -->
                <td colspan="2">
                  <textarea v-model="remark" cols="30" rows="3" style="border: none;width: 100%;"></textarea>
                </td>
                <td>{{$t('sale.add.sale196')}}</td>
                <!-- 发票备注 -->
                <td colspan>
                  <textarea
                    v-model="invoice_remark"
                    cols="30"
                    rows="3"
                    style="border: none;width: 100%;"
                  ></textarea>
                </td>
                <td>{{$t('sale.add.sale197')}}</td>
                <!-- 发货文件备注 -->
                <td colspan>
                  <textarea
                    v-model="ship_file_remark"
                    cols="30"
                    rows="3"
                    style="border: none;width: 100%;"
                  ></textarea>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <el-form-item style="margin:0px;text-align: center;">
          <el-button type="primary" :loading="loading" @click="check_save()" size="small">{{$t('save')}}</el-button>
          <el-button @click="close()" size="small">{{$t('cancel')}}</el-button>
          <!-- 保存 -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 编辑地址 -->
    <el-dialog
      :title="titleAddresses"
      :visible.sync="dialogAddresses"
      width="65%"
      @close="delete_receive_good(addressItem)"
    >
      <el-tabs type="card">
        <el-tab-pane :label="$t('sale.add.sale169')">
          <!-- 启用地址 -->
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
          >
            <tr>
              <td style="width:60px;">{{$t('sale.add.sale69')}}</td>
              <td style="width:100px;">{{$t('sale.add.sale70')}}</td>
              <td>{{$t('sale.add.sale71')}}</td>
              <td style="width:60px;">{{$t('sale.add.sale72')}}</td>
              <td style="width:90px;">{{$t('sale.add.sale73')}}</td>
              <td style="width:110px;">{{$t('sale.add.sale74')}}</td>
              <td style="width:40px;">{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:60px;">{{$t('sale.add.sale76')}}</td>
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total"
                  @change="check_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="address_del()"
                >{{$t('sale.add.sale94')}}</el-button>
                <!-- 作废 -->
              </td>
            </tr>
            <tr v-for="item in addressList" v-if="!item.deleted_at">
              <td>{{item.country?item.country.Name:''}}</td>
              <td>{{item.city?item.city.Name:''}}</td>
              <td>
                <pre>{{item.address}}</pre>
              </td>
              <td>{{item.contact_name}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.email}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
              <!-- 是/否 -->
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="destory_address(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('sale.add.sale170')">
          <!-- 作废地址 -->
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
          >
            <tr>
              <td style="width:60px;">{{$t('sale.add.sale69')}}</td>
              <td style="width:100px;">{{$t('sale.add.sale70')}}</td>
              <td>{{$t('sale.add.sale71')}}</td>
              <td style="width:60px;">{{$t('sale.add.sale72')}}</td>
              <td style="width:90px;">{{$t('sale.add.sale73')}}</td>
              <td style="width:110px;">{{$t('sale.add.sale74')}}</td>
              <td style="width:40px;">{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:60px;">{{$t('sale.add.sale76')}}</td>
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total"
                  @change="check_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="address_star()"
                >{{$t('sale.add.sale93')}}</el-button>
                <!-- 启用 -->
              </td>
            </tr>
            <tr v-for="item in addressList" v-if="item.deleted_at">
              <td>{{item.country?item.country.Name:''}}</td>
              <td>{{item.city?item.city.Name:''}}</td>
              <td>
                <pre>{{item.address}}</pre>
              </td>
              <td>{{item.contact_name}}</td>
              <td>{{item.mobile}}</td>
              <td>{{item.email}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>{{item.is_default==1?$t('sale.add.sale57'):$t('sale.add.sale58')}}</td>
              <!-- 是/否 -->
              <td>
                <el-checkbox v-model="item.check" @change="check_item_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_address(item)">{{$t('edit')}}</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="destory_address(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <el-form label-position="right" label-width="90px" class="dialog_input">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale69')">
              <el-select
                v-model="addressItem.country_code"
                filterable
                @change="selected_country_address(addressItem)"
                size="small"
                placeholder="Please Select"
              >
                <el-option
                  v-for="(i,index) in country"
                  :key="index"
                  :label="i.Name"
                  :value="i.Code"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale70')">
              <!-- <el-select
                v-model="addressItem.city_id"
                clearable
                filterable
                remote
                reserve-keyword
                :remote-method="remoteMethod_city"
                :loading_city="loading_city"
                size="small"
              >
                <el-option
                  v-for="(i,index) in addressItem.city"
                  :key="index"
                  :label="i.Name"
                  :value="i.ID"
                ></el-option>
              </el-select> -->
              <el-select
                v-model="addressItem.city_id"
                clearable
                filterable
                size="small"
              >
                <el-option
                  v-for="(i,index) in addressItem.city"
                  :key="index"
                  :label="i.Name"
                  :value="i.ID"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('sale.add.sale71')" :required="true">
          <el-input
            v-model="addressItem.address"
            type="textarea"
            size="small"
            placeholder="Please Write"
          ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale72')" :required="titleAddresses==('收货地址'||'Shipping address')">
              <el-input v-model="addressItem.contact_name" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale73')" :required="titleAddresses==('收货地址'||'Shipping address')">
              <el-input v-model="addressItem.mobile" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale74')">
              <el-input v-model="addressItem.email" size="small" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('sale.add.sale81')">
          <el-switch
            name="is_default"
            v-model="addressItem.is_default"
            :active-value="1"
            :inactive-value="0"
            :active-text="$t('sale.add.sale82')"
            :inactive-text="$t('sale.add.sale83')"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="save_receive_good(addressItem)"
          >{{$t('save')}}</el-button>
          <el-button size="mini" @click="delete_receive_good(addressItem)">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 账号 -->
    <el-dialog
      :title="titleDeliver"
      :visible.sync="dialogAccount"
      width="65%"
      @close="deliver_good_close(deliveryItem)"
    >
      <el-tabs type="card">
        <el-tab-pane :label="$t('sale.add.sale169')">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
          >
            <tr>
              <td>{{$t('sale.add.sale78')}}</td>
              <td>{{$t('sale.add.sale79')}}</td>
              <td>{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total_account"
                  @change="check_account_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="danger"
                  size="mini"
                  @click="account_del()"
                >{{$t('sale.add.sale94')}}</el-button>
                <!-- 作废 -->
              </td>
            </tr>
            <tr v-for="item in deliverList" v-if="!item.deleted_at">
              <td>{{express_company_.filter(i=>{return item.express_company_id == i.id})[0]?express_company_.filter(i=>{return item.express_company_id == i.id})[0].name:''}}</td>
              <td>{{item.accounts}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>
                <el-checkbox v-model="item.check" @change="checkItem_account_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_deliver(item)">{{$t('edit')}}</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deliver_good_destory(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
        <el-tab-pane :label="$t('sale.add.sale170')">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="border-collapse: collapse;width:100%;margin-bottom:10px;"
          >
            <tr>
              <td>{{$t('sale.add.sale78')}}</td>
              <td>{{$t('sale.add.sale79')}}</td>
              <td>{{$t('sale.add.sale91')}}</td>
              <!-- 状态 -->
              <td style="width:160px;">
                <el-checkbox
                  v-model="check_total_account"
                  @change="check_account_change()"
                >{{$t('sale.add.sale92')}}</el-checkbox>
                <!-- 全选 -->
                <el-button
                  type="primary"
                  size="mini"
                  @click="account_star()"
                >{{$t('sale.add.sale93')}}</el-button>
                <!-- 启用 -->
              </td>
            </tr>
            <tr v-for="item in deliverList" v-if="item.deleted_at">
              <td>{{express_company_.filter(i=>{return item.express_company_id == i.id})[0]?express_company_.filter(i=>{return item.express_company_id == i.id})[0].name:''}}</td>
              <td>{{item.accounts}}</td>
              <td align="center">
                <i v-if="item.deleted_at" class="el-icon-close" style="color:#F56C6C;"></i>
                <i v-else class="el-icon-check" style="color:#67C23A;"></i>
              </td>
              <td>
                <el-checkbox v-model="item.check" @change="checkItem_account_change(item)"></el-checkbox>
                <el-button type="primary" size="mini" @click="update_deliver(item)">{{$t('edit')}}</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deliver_good_destory(item)"
                >{{item.deleted_at?$t('sale.add.sale93'):$t('sale.add.sale94')}}</el-button>
                <!-- 启用/作废 -->
              </td>
            </tr>
          </table>
        </el-tab-pane>
      </el-tabs>
      <el-form label-position="right" label-width="110px" class="dialog_input">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale78')" :required="true">
              <el-select
                v-model="deliveryItem.express_company_id"
                size="mini"
                placeholder="Please Select"
              >
                <el-option
                  v-for="(i,index) in express_company_"
                  :key="index"
                  :label="i.name"
                  :value="i.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('sale.add.sale79')" :required="true">
              <el-input v-model="deliveryItem.accounts" size="mini" placeholder="Please Write"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            @click="deliver_good_create(deliveryItem)"
          >{{$t('save')}}</el-button>
          <el-button size="mini" @click="deliver_good_close(deliveryItem)">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 备注 -->
    <el-dialog :visible.sync="note" width="50%" class="quoteInput">
      <el-form label-width="100px" label-position="right" class="quoteInput">
        <el-form-item :label="$t('sale.add.sale155')">
          <!-- 合同备注 -->
          <el-input size="small" type="textarea" :rows="3" v-model="new_note.note"></el-input>
        </el-form-item>
        <el-form-item :label="$t('sale.add.sale158')">
          <!-- 文件 -->
          <el-upload
            :action="upload_api"
            :headers="headers"
            :data="new_note"
            ref="upload"
            :auto-upload="false"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :on-success="handleAvatarSuccess"
          >
            <el-button size="mini" type="primary">{{$t('sale.add.sale168')}}</el-button>
            <!-- 上传文件 -->
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" :loading="loading" @click="addNote()">{{$t('save')}}</el-button>
          <!-- 保存 -->
          <el-button size="mini" @click="note = false">{{$t('cancel')}}</el-button>
          <!-- 取消 -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import $ from "jquery";
import {
  fee_application_view,
  fee_application_save,
  cancle_fee_application,
  contractNoteCreate,
  contractNoteDestroy,
  customer_lists,
  member_bank_accounts,
  pending_contract_view,
  shipping_notice_view,
  country_list,
  cancle_preout,
  shipping_notice,
  receive_address,
  receive_address_update,
  receive_address_create,
  receive_address_destory,
  deliver_good_destory,
  deliver_good_create,
  deliver_good_update,
  get_deliver_goods,
  deliver_good,
  saler_contract_info,
  check_ship_quantity
} from "@/api/sale";
import util from "@/libs/util";
import Big from "@/big/a/big.mjs";
import { city_list } from "@/api/user";
import { mapState, mapActions } from "vuex";
export default {
  name: "sales-notice_detail",
  data() {
    return {
      titleAddresses: "",
      loading_city: false,
      titleDeliver: "",
      dialogAddresses: false,
      dialogAccount: false,
      addressList: [],
      delivery: true,
      check_total_account: false,
      check_total: false,
      check_list: "",
      get_deliver_goods: {},
      id: "",
      play: false,
      note: false,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      supplyloading: false,
      contract: {
        notice_info:{},
        freight:0,
        adjustment:0
      },
      supply_list: [],
      corp_List: [],
      fee_apply_check_status: [],
      fee_apply_status: [],
      pay_type_info: [],
      currencys: [],
      fee_type_info: [],
      payment_info_name: "",
      total_application_info_name: "",
      customer_name: "",
      deliverList: [],
      deliveryItem: {
        express_company_id: "",
        accounts: "",
        is_straight_hair: 0,
        member_id: ""
      },
      addressItem: {
        country_code: "",
        city_id: "",
        city: [],
        address: "",
        contact_name: "",
        mobile: "",
        email: "",
        is_default: 0,
        user_type: 101,
        member_id: "",
        type: ""
      },
      apply_form: {
        contract_id: "",
        contract_number: "",
        type: 1,
        fee_type: "",
        amount: "",
        currency_id: "",
        bank: "",
        receiver: "",
        bank_account_id: "",
        bank_account: "",
        pay_type: "",
        check_remark: ""
      },
      new_note: {
        contract_id: "",
        note: "",
        type: 1
      },
      upload_api: process.env.VUE_APP_API + "api/v1/contractNoteCreate",
      loading: false,
      delivery_type: [],
      units: [],
      invoice_type: [],
      test_item: [],
      product_file_info: [],
      preout_status: [],
      fileList: [],
      account: [],
      express_company: [],
      express_account_type: [],
      country: [],
      city: [],
      preout_type_info: [],
      enums: {},
      if_need_check: [],
      if_sample_info: [],
      address: "",
      remark: "",
      invoice_remark: "",
      sold_info: {},
      manufactured_info: {},
      shipped_info: {},
      sold_by: "",
      manufactured_by: "",
      shipped_by: "",
      form_show5: true,
      enum_express_company: [],
      receive_goods_addresses: [],
      receive_invoice_addresses: [],
      express_company_: [],
      ChemicalAppearance: [],
      ship_file_remark: ""
    };
  },
  created() {
    if (this.$route.query.ids) {
      this.id = this.$route.query.id
      this.fetchData(this.$route.query.ids);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "sales-notice_detail") {
        if (this.$route.query.ids) {
          this.fetchData(this.$route.query.ids);
        }
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
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData(ids) {
      this.apply_form = {
        contract_id: "",
        contract_number: "",
        type: 1,
        fee_type: "",
        amount: "",
        currency_id: "",
        bank: "",
        receiver: "",
        bank_account_id: "",
        bank_account: "",
        pay_type: "",
        check_remark: ""
      };
      this.contract={ notice_info: {} }
      this.remark = ''
      this.invoice_remark = ''
      this.ship_file_remark = ''
      let obj;
      if (Array.isArray(ids)) {
        obj = {
          ids: ids
        };
      } else {
        obj = {
          ids: [ids]
        };
      }

      // shipping_notice_view(obj).then(res => {
        if (this.$route.query.res) {
          var Subtotal = 0
          var res = JSON.parse(this.$route.query.res)
          res.data.preout_list.forEach((items, index) => {
            items.if_sample = 2;
            Subtotal = new Big(Subtotal).plus(items.total_money)
          });
          res.data.details.forEach(item => {
            item.product_file = JSON.parse(item.product_file);
          });
          res.data.adjustment = 0
          this.contract =res.data;
          this.contract.Subtotal = Number(Subtotal)
          this.contract.adjustment = res.data.adjustment
          // this.contract.shipping_handling = res.data.freight
          this.contract.total_amount =Number(new Big(this.contract.freight?this.contract.freight:0).plus(this.contract.adjustment?this.contract.adjustment:0).plus(this.contract.Subtotal))
          this.delivery_type = res.enum.delivery_type;
          this.units = res.enum.units;
          this.invoice_type = res.enum.invoice_type;
          this.test_item = res.enum.test_item;
          this.product_file_info = res.enum.product_file_info;
          this.preout_status = res.enum.preout_status;
          this.enum_express_company = res.enum.express_company;
          this.express_account_type = res.enum.express_account_type;
          this.preout_type_info = res.enum.preout_type_info;
          this.if_need_check = res.enum.if_need_check;
          this.enums = res.enum;
          this.if_sample_info = res.enum.if_sample_info;
          this.currencys = res.enum.currencys;
          this.sold_info = res.enum.sold_info;
          this.manufactured_info = res.enum.manufactured_info;
          this.shipped_info = res.enum.shipped_info;
          this.ChemicalAppearance = res.enum.ChemicalAppearance;
          (this.sold_by = this.sold_info[0].id),
            (this.manufactured_by = this.manufactured_info[0].id),
            (this.shipped_by = 2);
          saler_contract_info(res.data.notice_info.customer_id).then(res_a => {
            this.receive_invoice_addresses = [];
            this.receive_goods_addresses = [];
            res_a.data.info.receive_addresses.forEach((items, index) => {
              if (items.type == 1) {
                this.receive_invoice_addresses.push(items);
              } else {
                this.receive_goods_addresses.push(items);
              }
            });
            res.data.address.forEach(i => {
              if (
                i.type == 2 &&
                this.receive_goods_addresses.filter(j => {
                  return j.id == i.id;
                }).length == 0
              ) {
                i.id = res.data.notice_info.delivery_address_id;
                // this.receive_goods_addresses.push(i);
              } else if (
                i.type == 1 &&
                this.receive_invoice_addresses.filter(j => {
                  return j.id == i.id;
                }).length == 0
              ) {
                i.id = res.data.notice_info.invoice_address_id;
                // this.receive_invoice_addresses.push(i);
              }
            });
          });
          this.select_express_account_type(
            res.data.notice_info.express_account_type,
            1
          );
        }
      // });
      this.$route.query.ids = "";
    },
    fetchData_b(ids) {
      this.apply_form = {
        contract_id: "",
        contract_number: "",
        type: 1,
        fee_type: "",
        amount: "",
        currency_id: "",
        bank: "",
        receiver: "",
        bank_account_id: "",
        bank_account: "",
        pay_type: "",
        check_remark: ""
      };
      this.contract={ notice_info: {} }
      this.remark = ''
      this.invoice_remark = ''
      this.ship_file_remark = ''
      let obj;
      if (Array.isArray(ids)) {
        obj = {
          ids: ids
        };
      } else {
        obj = {
          ids: [ids]
        };
      }
      shipping_notice_view(obj).then(res => {
        if (res) {
          var Subtotal = 0
          this.$route.query.res = JSON.stringify(res)
          res.data.preout_list.forEach((items, index) => {
            items.if_sample = 2;
            Subtotal = new Big(Subtotal).plus(items.total_money)
          });
          res.data.details.forEach(item => {
            item.product_file = JSON.parse(item.product_file);
          });
          res.data.adjustment = 0
          this.contract =res.data;
          this.contract.Subtotal = Number(Subtotal)
          this.contract.adjustment = res.data.adjustment
          // this.contract.shipping_handling = res.data.freight
          this.contract.total_amount =Number(new Big(this.contract.freight?this.contract.freight:0).plus(this.contract.adjustment?this.contract.adjustment:0).plus(this.contract.Subtotal))
          this.delivery_type = res.enum.delivery_type;
          this.units = res.enum.units;
          this.invoice_type = res.enum.invoice_type;
          this.test_item = res.enum.test_item;
          this.product_file_info = res.enum.product_file_info;
          this.preout_status = res.enum.preout_status;
          this.enum_express_company = res.enum.express_company;
          this.express_account_type = res.enum.express_account_type;
          this.preout_type_info = res.enum.preout_type_info;
          this.if_need_check = res.enum.if_need_check;
          this.enums = res.enum;
          this.if_sample_info = res.enum.if_sample_info;
          this.currencys = res.enum.currencys;
          this.sold_info = res.enum.sold_info;
          this.manufactured_info = res.enum.manufactured_info;
          this.shipped_info = res.enum.shipped_info;
          this.ChemicalAppearance = res.enum.ChemicalAppearance;
          (this.sold_by = this.sold_info[0].id),
            (this.manufactured_by = this.manufactured_info[0].id),
            (this.shipped_by = 2);
          saler_contract_info(res.data.notice_info.customer_id).then(res_a => {
            this.receive_invoice_addresses = [];
            this.receive_goods_addresses = [];
            res_a.data.info.receive_addresses.forEach((items, index) => {
              if (items.type == 1) {
                this.receive_invoice_addresses.push(items);
              } else {
                this.receive_goods_addresses.push(items);
              }
            });
            res.data.address.forEach(i => {
              if (
                i.type == 2 &&
                this.receive_goods_addresses.filter(j => {
                  return j.id == i.id;
                }).length == 0
              ) {
                i.id = res.data.notice_info.delivery_address_id;
                // this.receive_goods_addresses.push(i);
              } else if (
                i.type == 1 &&
                this.receive_invoice_addresses.filter(j => {
                  return j.id == i.id;
                }).length == 0
              ) {
                i.id = res.data.notice_info.invoice_address_id;
                // this.receive_invoice_addresses.push(i);
              }
            });
          });
          this.select_express_account_type(
            res.data.notice_info.express_account_type,
            1
          );
        }
      });
      this.$route.query.ids = "";
    },
    y_money(){
      var Subtotal = 0
      this.contract.preout_list.forEach((items, index) => {
        items.if_sample = 2;
        Subtotal = new Big(Subtotal).plus(items.total_money)
      });
      this.contract.Subtotal = Number(Subtotal)
      this.change_()
    },
    change_(){
      this.contract.total_amount =Number(new Big(this.contract.freight?this.contract.freight:0).plus(this.contract.adjustment?this.contract.adjustment:0).plus(this.contract.Subtotal)) 
    },
    remoteMethod_city(query) {
      if (query) {
        this.loading_city = false;
        city_list(this.addressItem.country_code, "").then(res => {
          this.addressItem.city = res.data.filter(item => {
            return item.Name.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
          this.loading_city = true;
        });
      } else {
        this.addressItem.city = [];
      }
    },
    querySearchAsync_account(queryString, cb) {
      var restaurants = this.account;
      cb(restaurants);
    },
    handleSelect_account(item) {
      this.contract.notice_info.express_account = item.accounts;
    },
    check_change() {
      this.check_list = [];
      this.addressList.forEach(res => {
        res.check = this.check_total;
        if (this.check_total) {
          this.check_list.push(res.id);
        }
      });
    },
    check_item_change(item) {
      this.check_list = [];
      this.check_total = item.check;
      this.addressList.forEach(res => {
        if (res.check == false) {
          this.check_total = false;
        } else {
          this.check_list.push(res.id);
        }
      });
    },
    delivery_edit() {
      if (this.contract.notice_info.customer_id) {
        this.$i18n.locale == "cn"
          ? (this.titleAddresses = "收货地址")
          : (this.titleAddresses = "Shipping address");
        country_list().then(res => {
          this.country = res.data;
        });
        receive_address(this.contract.notice_info.customer_id, 2).then(res => {
          res.data.forEach(i => {
            i.check = false;
          });
          this.addressList = res.data;
          this.receive_goods_addresses = [];
          res.data.forEach(item => {
            if (!item.deleted_at) {
              this.receive_goods_addresses.push(item);
            }
          });
          this.check_total = false;
          this.dialogAddresses = true;
        });
        this.addressItem.type = 2;
      }
    },
    invoice_edit() {
      if (this.contract.notice_info.customer_id) {
        this.$i18n.locale == "cn"
          ? (this.titleAddresses = "收票地址")
          : (this.titleAddresses = "Ticket collection address");
        country_list().then(res => {
          this.country = res.data;
        });
        receive_address(this.contract.notice_info.customer_id, 1).then(res => {
          res.data.forEach(i => {
            i.check = false;
          });
          this.addressList = res.data;
          this.receive_invoice_addresses = [];
          res.data.forEach(item => {
            if (!item.deleted_at) {
              this.receive_invoice_addresses.push(item);
            }
          });
          this.check_total = false;
          this.dialogAddresses = true;
        });
        this.addressItem.type = 1;
      }
    },
    selected_country_address(item) {
      if (item.city_id) {
        item.city_id = "";
      }
      item.city = [];
      city_list(item.country_code, '').then(res=>{
        item.city = res.data
      })
    },
    save_receive_good(item) {
      if (item.id) {
        receive_address_update(
          item,
          item.id,
          this,
          this.contract.notice_info.customer_id
        );
      } else {
        item.member_id = this.contract.notice_info.customer_id;
        receive_address_create(
          item,
          this,
          "",
          this.contract.notice_info.customer_id
        );
      }
    },
    add_ref() {
      saler_contract_info(this.contract.notice_info.customer_id).then(res => {
        this.receive_invoice_addresses = [];
        this.receive_goods_addresses = [];
        res.data.info.receive_addresses.forEach((items, index) => {
          if (items.type == 1) {
            this.receive_invoice_addresses.push(items);
          } else {
            this.receive_goods_addresses.push(items);
          }
        });
      });
      this.select_express_account_type(
        this.contract.notice_info.express_account_type
      );
    },
    delete_receive_good() {
      this.dialogAddresses = false;
      this.addressItem = {
        country_code: "",
        city_id: "",
        city: [],
        address: "",
        contact_name: "",
        mobile: "",
        email: "",
        is_default: 0,
        user_type: 101,
        member_id: "",
        type: ""
      };
    },
    update_address(item) {
      this.addressItem.country_code = item.country_code;
      this.addressItem.address = item.address;
      this.addressItem.contact_name = item.contact_name;
      this.addressItem.mobile = item.mobile;
      this.addressItem.email = item.email;
      // this.addressItem.user_type = item.user_type.toString();
      this.addressItem.is_default = item.is_default;
      this.addressItem.member_id = item.member_id;
      this.addressItem.id = item.id;
      city_list(item.country_code, "").then(res => {
        this.addressItem.city_id = item.city_id;
        this.$set(this.addressItem, "city", res.data);
      });
    },
    destory_address(item) {
      if (item.deleted_at) {
        item.enabled_state = 1;
      } else {
        item.enabled_state = 0;
      }
      this.receive_goods_addresses = [];
      var obj = {
        id: [],
        enabled_state: item.enabled_state
      };
      obj.id.push(item.id);
      receive_address_destory(
        obj,
        "saler_contract",
        "receive_address_destory",
        this
      );
    },
    address_star() {
      var obj = {
        id: this.check_list,
        enabled_state: 1
      };
      receive_address_destory(
        obj,
        "saler_contract",
        "receive_address_destory",
        this
      );
    },
    address_del() {
      var obj = {
        id: this.check_list,
        enabled_state: 0
      };
      receive_address_destory(
        obj,
        "saler_contract",
        "receive_address_destory",
        this
      );
    },
    select_express_account_type(id, a) {
      if (!a) {
        this.contract.notice_info.express_company_id = "";
        this.contract.notice_info.express_account = "";
      }
      this.express_company = [];
      this.account = [];
      if (id == 2) {
        //个人
        if (this.contract.notice_info.customer_name != "") {
          get_deliver_goods(this.contract.notice_info.customer_id, id).then(
            res => {
              if (res.data.length == 0) {
                this.express_company = this.enum_express_company;
              } else {
                let express_company = [];
                this.get_deliver_goods = res.data;
                this.enum_express_company.forEach((items, index) => {
                  for (var key in res.data) {
                    if (items.id == key) {
                      express_company.push(items);
                    }
                  }
                });
                // console.log(express_company)
                this.express_company = express_company;
              }
            }
          );
        }
      } else if (id == 1) {
        get_deliver_goods(this.contract.corp_id, id).then(res => {
          let express_company = [];
          this.get_deliver_goods = res.data;
          this.enum_express_company.forEach((items, index) => {
            for (var key in res.data) {
              if (items.id == key) {
                express_company.push(items);
              }
            }
          });
          this.express_company = express_company;
        });
      }
    },
    select_express_company(id) {
      (this.contract.notice_info.express_account = ""),
        (this.account = []((this.account = this.get_deliver_goods[id])));
    },
    account_edit_api() {
      if (
        this.contract.notice_info.express_account_type == 2 &&
        this.contract.notice_info.customer_id
      ) {
        deliver_good(this.contract.notice_info.customer_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      } else if (
        this.contract.notice_info.express_account_type == 1 &&
        this.contract.corp_id
      ) {
        deliver_good(this.contract.corp_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      }
    },
    account_edit() {
      if (
        this.contract.notice_info.express_account_type == 2 &&
        this.contract.notice_info.customer_id
      ) {
        deliver_good(this.contract.notice_info.customer_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.$i18n.locale == "cn"
            ? (this.titleDeliver = "个人账户")
            : (this.titleDeliver = "Private account");
          this.dialogAccount = true;
          this.express_company_ = res.enum.express_company;
          if (res.data.length == 0) {
            this.delivery = false;
          }
        });
      } else if (
        this.contract.notice_info.express_account_type == 1 &&
        this.contract.corp_id
      ) {
        deliver_good(this.contract.corp_id).then(res => {
          this.check_total_account = false;
          res.data.forEach(i => {
            i.check = false;
          });
          this.deliverList = res.data;
          this.$i18n.locale == "cn"
            ? (this.titleDeliver = "公司账户")
            : (this.titleDeliver = "Corporate account");
          this.dialogAccount = true;
          this.express_company_ = res.enum.express_company;
          // if (res.data.length == 0) {
          //   this.delivery = false;
          // }
        });
      }
    },
    check_account_change() {
      this.check_account_list = [];
      this.deliverList.forEach(res => {
        res.check = this.check_total_account;
        if (this.check_total_account) {
          this.check_account_list.push(res.id);
        }
      });
    },
    checkItem_account_change(item) {
      this.check_account_list = [];
      this.check_total_account = item.check;
      this.deliverList.forEach(res => {
        if (res.check == false) {
          this.check_total_account = false;
        } else {
          this.check_account_list.push(res.id);
        }
      });
    },
    deliver_good_close(item) {
      this.dialogAccount = false;
      this.deliveryItem = {
        express_company_id: "",
        accounts: "",
        is_straight_hair: 0,
        member_id: ""
      };
    },
    account_star() {
      var obj = {
        id: this.check_account_list,
        enabled_state: 1
      };
      deliver_good_destory(
        obj,
        "saler_contract",
        "deliver_good_destory",
        this,
        this.contract.notice_info.express_account_type
      );
    },
    account_del() {
      var obj = {
        id: this.check_account_list,
        enabled_state: 0
      };
      deliver_good_destory(
        obj,
        "saler_contract",
        "deliver_good_destory",
        this,
        this.contract.notice_info.express_account_type
      );
    },
    update_deliver(item) {
      this.deliveryItem.express_company_id = item.express_company_id;
      this.deliveryItem.accounts = item.accounts;
      this.deliveryItem.id = item.id;
      this.deliveryItem.is_straight_hair = item.is_straight_hair;
      this.deliveryItem.member_id = item.member_id;
    },
    deliver_good_destory(item) {
      if (item.deleted_at) {
        item.enabled_state = 1;
      } else {
        item.enabled_state = 0;
      }
      var obj = {
        id: [],
        enabled_state: item.enabled_state
      };
      obj.id.push(item.id);
      deliver_good_destory(
        obj,
        "saler_contract",
        "deliver_good_destory",
        this,
        this.contract.notice_info.express_account_type
      );
    },
    deliver_good_create(item) {
      if (item.id) {
        deliver_good_update(
          item,
          item.id,
          this,
          this.contract.notice_info.express_account_type
        );
      } else {
        if (this.contract.notice_info.express_account_type == 2) {
          this.deliveryItem.member_id = this.contract.notice_info.customer_id;
          deliver_good_create(
            item,
            this,
            this.contract.notice_info.express_account_type
          );
        } else if (this.contract.notice_info.express_account_type == 1) {
          this.deliveryItem.member_id = this.contract.corp_id;
          deliver_good_create(
            item,
            this,
            this.contract.notice_info.express_account_type
          );
        }
      }
    },
    open(msg) {
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.save()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    check_save(){
      var obj = {
        preout_ids:[],
        express_company_id:this.contract.notice_info.express_company_id
      }
      this.contract.preout_list.forEach((items, index) => {
        obj.preout_ids.push(items.id);
      });
      check_ship_quantity(obj).then(res=>{
        if (res && res.code == 0){
          this.save()
        }else if(res && res.code == 10){
          this.open(res.msg)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    save() {
      let notice = [];
      let num = 0;
      this.contract.preout_list.forEach((items, index) => {
        num++;
        notice.push({
          inventory_preout_id: items.id,
          if_sample: items.if_sample,
          total_money: items.total_money,
          currency_id: items.currency_id
        });
      });
      if (num == this.contract.preout_list.length) {
        let obj = {
          notice: notice,
          remark: this.remark,
          invoice_remark: this.invoice_remark,
          sold_by: this.sold_by,
          manufactured_by: this.manufactured_by,
          shipped_by: this.shipped_by,
          invoice_number: this.contract.invoice_number,
          terms: this.contract.terms,
          ship_file_remark: this.ship_file_remark,
          contract_type: this.contract.contract_type,
          delivery_type_id: this.contract.notice_info.delivery_type_id,
          delivery_address_id: this.contract.notice_info.delivery_address_id,
          invoice_address_id: this.contract.notice_info.invoice_address_id,
          express_account_type: this.contract.notice_info.express_account_type,
          express_company_id: this.contract.notice_info.express_company_id,
          express_account: this.contract.notice_info.express_account,
          shipping_handling:this.contract.freight?Number(this.contract.freight):0,
          adjustment:this.contract.adjustment?Number(this.contract.adjustment):0,
        };
        this.loading = true
        shipping_notice(obj)
          .then(res => {
            if (res && res.code == 0) {
              var that = this;
              that.$message({
                message: "success",
                type: "success"
              });
              that.loading = false
              that.$router.push({
                path: "/sales/notice",
                name: "sales-notice",
                query: {
                  notice_detail: true
                }
              });
              var tagName = "sales-notice_detail";
              that.closeAdd({ tagName });
            } else {
              this.$message({
                message: res.msg,
                type: "error"
              });
                this.loading = false
            }
          })
          .catch(rr => {this.loading = false});
      }
    },
    cancel(id,prod_id, items) {
      cancle_preout(id,prod_id, this, this.$route.query.ids, items.length, 0);
    },
    querySearchAsync_customer(queryString, cb) {
      if (queryString != "") {
        customer_lists(queryString).then(res => {
          var restaurants = res.data;
          var results = queryString
            ? restaurants.filter(this.createFilter_customer(queryString))
            : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        });
      }
    },
    querySearchAsync(queryString, cb) {
      if (queryString != "") {
        cas_info(queryString).then(res => {
          var restaurants = res.data;
          var results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        });
      }
    },
    createFilter_customer(queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.cas.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect_customer(item) {
      this.customer_name = item.name;
      member_bank_accounts(item.id).then(res => {
        this.apply_form.bank = res.data[0].opening_bank;
        this.apply_form.receiver = res.data[0].payee;
        this.apply_form.bank_account = res.data[0].bank_account_number;
        this.apply_form.bank_account_id = res.data[0].id;
        this.apply_form.check_remark = res.data[0].remark;
      });
    },
    add_note() {
      this.note = true;
      this.new_note.note = "";
      this.fileList = [];
      this.new_note.contract_id = this.contract.id;
    },
    destroyNote(row) {
      contractNoteDestroy(row, this);
    },
    onSubmit() {
      this.$refs.upload.submit();
    },

    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$i18n.locale == "cn"
        ? this.$message.warning("当前限制选择5个文件")
        : this.$message.warning("Current limit of 5 files");
    },
    handleAvatarSuccess(res, file, fileList) {
      if (file.response.code == 0) {
        this.$message({
          message: "success",
          type: "success"
        });
        this.fetchData_b(this.id);
        this.note = false;
      } else {
        this.$message.error(file.response.msg);
      }
    },
    handleRemove() {},
    beforeRemove(file, fileList) {
      return this.$i18n.locale == "cn"
        ? this.$confirm(`确定移除 ${file.name}？`)
        : this.$confirm(`Confirm removal ${file.name}？`);
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          this.supplyloading = false;
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.supply_list = res.data;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    supplyChange() {
      this.contract.supplier_id = this.supply_list.filter(item => {
        return item.name == this.contract.supplier_name;
      })[0].id;
    },
    hand_account() {
      this.play = true;
    },
    noticeClose(even) {
      this.play = even;
    },
    close() {
      var that = this;
      that.$router.push({
        path: "/sales/sales",
        name: "sales-notice"
      });
      var tagName = "sales-notice_detail";
      that.closeAdd({ tagName });
    },
    addNote() {
      this.new_note.contract_id = this.contract.id;
      this.$refs.upload.submit();
    },
    save_apply_form() {
      fee_application_save(this.id, this.apply_form, this);
    }
  }
};
</script>

