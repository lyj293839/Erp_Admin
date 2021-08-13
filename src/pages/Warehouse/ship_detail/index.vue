<style lang="scss" scoped type="text/scss">
/deep/ .div {
  width: 100%;
  overflow: auto;
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
    font-size: 14px;
    .el-button {
      color: black;
    }
  }
  td {
    padding: 0px 5px;
    font-size: 12px;
  }
  th {
    padding: 5px;
    font-size: 12px;
  }
}

.from-item {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
  table {
    border-collapse: collapse;
    margin-top: 5px;
    width: 100%;
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
  .el-input__inner {
    border: 0px;
    padding: 0px;
  }
  th {
    line-height: 30px;
  }
  td {
    padding: 5px;
    line-height: 30px;
  }
}
/deep/.shelf_td {
  background: #f2f6fc;
  .el-input__inner {
    background: #f2f6fc;
  }
}
</style>
<template>
  <d2-container>
    <div class="div">
      <!-- 页面 -->
      <el-form label-width="0px" label-position="right">
        <div style="margin-bottom:20px;">
          <el-form-item class="form_title">
            <el-button @click="form_show2 = !form_show2" type="text" icon="el-icon-arrow-down">
              <b>{{$t('wareHouse.ship_detail.ship_detail1')}}</b><!-- 需求信息 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table v-for="(item,index) in details" border="1" bordercolor="#E5E5E5">
              <tr>
                <th class="td">#{{$t('wareHouse.ship_detail.ship_detail2')}}</th><!-- 询单号 -->
                <th class="td">Cas</th>
                <th class="td" width="300">{{$t('wareHouse.ship_detail.ship_detail3')}}</th><!-- 产品名称 -->
                <th class="td">规格</th><!-- 规格 -->
                <th class="td">纯度</th><!-- 纯度 -->
                <th class="td">数量</th><!-- 数量 -->
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail7')}}</th><!-- 单价 -->
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail8')}}</th><!-- 金额 -->
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail9')}}</th><!-- 货币符号 -->
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
                <td>{{$t('wareHouse.ship_detail.ship_detail10')}}</td><!-- 发票情况 -->
                <td colspan="9">
                  <span v-for="item in invoice_type" :key="item.id">
                    <span v-if="item.id==item.invoice_type_id">{{item.name}}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail11')}}</td><!-- 分析要求 -->
                <td colspan="9">
                  <el-checkbox-group v-model="item.checked_items">
                    <el-checkbox v-for="i in test_item" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail12')}}</td><!-- 其他要求 -->
                <td colspan="3">{{item.checked_requirement}}</td>
                <td>{{$t('wareHouse.ship_detail.ship_detail13')}}</td><!-- 附加费用 -->
                <td colspan="5">{{item.additional_cost}}</td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail14')}}</td><!-- 包装要求 -->
                <td colspan="3">{{item.package_requirement}}</td>
                <td>{{$t('wareHouse.ship_detail.ship_detail15')}}</td><!-- 要求发货时间 -->
                <td colspan="5">{{item.required_delivery_date}}</td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail16')}}</td><!-- 标签要求 -->
                <td colspan="3">{{item.label_requirement}}</td>
                <td>{{$t('wareHouse.ship_detail.ship_detail17')}}</td><!-- 发货备注 -->
                <td colspan="5">{{item.deliver_note}}</td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail18')}}</td><!-- 随货文件 -->
                <td colspan="6">
                  <el-checkbox-group v-model="item.product_file">
                    <el-checkbox v-for="i in product_file_info" :key="i.id" :label="i.id" name="type">{{i.name}}</el-checkbox>
                  </el-checkbox-group>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail19')}}</td><!-- 是否需要报关 -->
                <td colspan="2">
                  <span v-for="u in if_declare_info">
                    <span v-if="item.if_declare==u.id">{{u.name}}</span>
                  </span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div style="margin:20px 0px;">
          <el-form-item class="form_title">
            <el-button @click="form_show3 = !form_show3" type="text" icon="el-icon-arrow-down">
              <b>{{$t('wareHouse.ship_detail.ship_detail20')}}</b><!-- 库存 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show3" class="from-item">
            <table v-for="item in notices" border="1" bordercolor="#E5E5E5" style="width: 100%;">
              <tr>
                <th>{{$t('wareHouse.ship_detail.ship_detail21')}}</th><!-- 入库时间 -->
                <th style="width:80px;">{{$t('wareHouse.ship_detail.ship_detail4')}}</th><!-- 规格 -->
                <th>{{$t('wareHouse.ship_detail.ship_detail22')}}</th><!-- 仓库 -->
                <th width="80">{{$t('wareHouse.ship_detail.ship_detail23')}}</th><!-- 包装 -->
                <th>{{$t('wareHouse.ship_detail.ship_detail24')}}</th><!-- 批次 -->
                <th width="100">{{$t('wareHouse.ship_detail.ship_detail20')}}</th><!-- 库存 -->
                <th width="100">{{$t('wareHouse.ship_detail.ship_detail25')}}</th><!-- 检测状态 -->
                <th>{{$t('wareHouse.ship_detail.ship_detail26')}}
                  <el-tooltip placement="top" v-if="item.preout.split_package_log_id>0&&item.preout.split_package_log">
                    <div slot="content">从{{item.preout.split_package_log.out_shelf}}货架中规格为{{item.preout.split_package_log.packsize}}
                      {{getEnumValue(units,item.preout.split_package_log.unit_id)}}的拆出
                    </div>
                    <span style="color:red;cursor: pointer;">(拆)</span>
                  </el-tooltip>
                </th><!-- 预占数量 -->
                <th width="80">{{$t('wareHouse.ship_detail.ship_detail27')}}</th><!-- 发货方式 -->
                <th width="60">{{$t('wareHouse.ship_detail.ship_detail9')}}</th><!-- 货币符号 -->
                <th width="69">{{$t('wareHouse.ship_detail.ship_detail28')}}</th><!-- 发货 -->
              </tr>
              <tr>
                <td>{{item.created_at}}</td>
                <td>
                  {{item.packs?item.packs.packsize:'/'}}
                  <span v-for="u in units">
                    <span v-if="item.packs&&item.packs.unit_id==u.id">{{u.name}}</span>
                  </span>
                </td>
                <td>
                  <span v-for="w in warehouse">
                    <span v-if="item.inventory.warehouse_id==w.id">{{w.name}}</span>
                  </span>
                </td>
                <td>{{preout_type_info[item.preout.type].name}}</td>
                <td>{{item.inventory.batchno}}</td>
                <td>
                  <div v-if="item.preout.type==2">
                    {{item.inventory.remained_stock}}
                    <span v-for="u in units">
                      <span v-if="item.inventory.base_unit_id==u.id">{{u.name}}</span>
                    </span>
                  </div>
                  <div v-else>{{item.packs.stock}}</div>
                </td>
                <td>
                  <div v-if="item.preout.type==2">
                    <span
                      v-if="item.inventory.if_need_check"
                    >{{if_need_check[item.inventory.if_need_check].name}}</span>
                    <span v-else>{{checked_result[item.inventory.checked_result].name}}</span>
                  </div>
                  <div v-else>
                    <span
                      v-if="item.packs.if_need_check"
                    >{{if_need_check[item.packs.if_need_check].name}}</span>
                    <span v-else>{{checked_result[item.packs.checked_result].name}}</span>
                  </div>
                </td>
                <td>
                  <div v-if="item.preout.type==2">
                    {{item.preout.base_quantity}}
                    <span v-for="u in units">
                      <span v-if="item.preout.base_quantity_unit==u.id">{{u.name}}</span>
                    </span>
                  </div>
                  <div v-else>
                    {{item.preout.package_nums}}({{item.preout.quantity}}
                    <span v-for="u in units">
                      <span v-if="item.preout.quantity_unit==u.id">{{u.name}}</span>
                    </span>)
                  </div>
                </td>
                <td>
                  <span v-for="d in delivery_type">
                    <span v-if="d.id==combine_notice.delivery_type_id">{{d.name}}</span>
                  </span>
                </td>
                <td class="d2-text-center">
                  <span v-for="c in currencys">
                    <span v-if="item.currency_id==c.id">{{c.name}}</span>
                  </span>
                </td>
                <td v-if="item.status==1" style="width: 69px;" class="d2-text-center">
                  <el-button
                    type="danger"
                    @click="cancel(item.inventory_preout_id,item.prod_id)"
                    size="mini"
                  >{{$t('wareHouse.ship_detail.ship_detail29')}}</el-button><!-- 取消通知 -->
                </td>
                <td v-else style="width: 60px;">
                  <span v-for="i in notice_status_info">
                    <span v-if="i.id==item.status">{{i.name}}</span>
                  </span>
                </td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail30')}}</td><!-- 报关费 -->
                <td>
                  <el-input v-model="item.ship.customs_fee"></el-input>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail31')}}</td><!-- 鉴定费 -->
                <td>
                  <el-input v-model="item.ship.identification_fee"></el-input>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail32')}}</td><!-- 是否是样品 -->
                <td>
                  <el-select
                    size="mini"
                    v-model="item.ship.if_sample"
                    clearable
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="i in if_sample_info"
                      :key="i.id"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail33')}}</td><!-- 实际发货数量 -->
                <td colspan="2">
                  <div v-if="item.preout.type==2">
                    {{item.preout.base_quantity}}
                    <span v-for="u in units">
                      <span v-if="item.preout.base_quantity_unit==u.id">{{u.name}}</span>
                    </span>
                  </div>
                  <div v-else>
                    {{item.preout.package_nums}}({{item.preout.quantity}}
                    <span v-for="u in units">
                      <span v-if="item.preout.quantity_unit==u.id">{{u.name}}</span>
                    </span>)
                  </div>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail34')}}</td><!-- 应收金额 -->
                <td colspan="2">
                  <el-input v-model="item.ship.total_money"></el-input>
                </td>
              </tr>
              <!-- <tr v-if="item.preout.type== 1 && item.packs" v-for="item_i in item.packs.shelves">
                <td>{{item_i.shelf}}</td>
                <td :colspan="10">{{item.preout.type}}</td>
              </tr>
              <tr v-if="item.preout.type == 2 && item.inventory" v-for="item_i in item.inventory.shelves">
                <td>{{item_i.shelf}}</td>
                <td :colspan="10">{{item.preout.type}}</td>
              </tr>-->
              <tr>
                <th width="121">{{$t('wareHouse.ship_detail.ship_detail35')}}</th><!-- 包装类型 -->
                <th width="100">{{$t('wareHouse.ship_detail.ship_detail36')}}</th><!-- 货架 -->
                <th width="80">{{$t('wareHouse.ship_detail.ship_detail14')}}</th><!-- 规格 -->
                <th width="80">{{$t('wareHouse.ship_detail.ship_detail20')}}</th><!-- 库存 -->
                <th colspan="6">{{$t('wareHouse.ship_detail.ship_detail37')}}</th><!-- 发货数量 -->
                <th width="69">{{$t('wareHouse.ship_detail.ship_detail38')}}</th><!-- 发货单位 -->
              </tr>
              <tr v-if="item.preout.type== 1 && item.packs">
                <td :colspan="11" style="padding:0px;">
                  <table border="1" bordercolor="#E5E5E5" style="width: 100%;margin:0px;"> 
                    <tr
                      v-for="(item_i,index) in item.packs.shelves"
                      v-if="item_i.number"
                      style="background:#E9FAFF;"
                    >
                      <td width="120">
                        <b>{{$t('wareHouse.ship_detail.ship_detail39')}}</b><!-- 包装库存 -->
                      </td>
                      <td width="100">{{item_i.shelf}}</td>
                      <td
                        width="80"
                      >{{item_i.packsize}}{{units.filter(res=>{return item_i.packsize_unit_id == res.id})[0].name}}</td>
                      <td width="80">{{item_i.stock}}</td>
                      <td v-if="item.ship==null" class="shelf_td">
                        <el-input v-model="item_i.number" placeholder=" "></el-input>
                      </td>
                      <td v-else class="shelf_td">
                        <el-input v-model="item_i.number" placeholder=" " disabled></el-input>
                      </td>
                      <td width="69">{{$t('wareHouse.ship_detail.ship_detail40')}}</td><!-- 个 -->
                    </tr>
                  </table>
                </td>
              </tr>
              <tr v-if="item.preout.type== 2 && item.inventory">
                <td :colspan="11" style="padding:0px;">
                  <table border="1" bordercolor="#E5E5E5" style="width: 100%;margin:0px;">
                    <tr
                      v-for="(item_i,index_i) in item.inventory.shelves"
                      v-if="item_i.number"
                      style="background:#E9FAFF;"
                    >
                      <td width="120">
                        <b>{{$t('wareHouse.ship_detail.ship_detail41')}}</b><!-- 散装库存 -->
                      </td>
                      <td width="100">{{item_i.shelf}}</td>
                      <td width="80">/</td>
                      <td
                        width="80"
                      >{{item_i.base_quantity}}{{units.filter(res=>{return item_i.base_quantity_unit_id == res.id})[0].name}}</td>
                      <td v-if="item.ship==null" class="shelf_td">
                        <span>拆</span>
                        <el-input v-model="item_i.number" placeholder=" " ></el-input>
                      </td>
                      <td v-else class="shelf_td">
                        <el-input v-model="item_i.number" placeholder=" " disabled></el-input>
                      </td>
                      <td
                        width="69"
                      >{{units.filter(res=>{return item_i.base_quantity_unit_id == res.id})[0].name}}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>{{$t('wareHouse.ship_detail.ship_detail42')}}</b><!-- 发货通知 -->
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail43')}}</th><!-- 客户名称 -->
                <th style="width: 300px;">{{$t('wareHouse.ship_detail.ship_detail44')}}</th><!-- 收货地址 -->
                <th style="width: 300px;">{{$t('wareHouse.ship_detail.ship_detail45')}}</th><!-- 收票地址 -->
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail46')}}</th><!-- 账号类型 -->
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail47')}}</th><!-- 快递公司 -->
                <th class="td">{{$t('wareHouse.ship_detail.ship_detail48')}}</th><!-- 快递账号 -->
              </tr>
              <tr>
                <td>{{combine_notice.customer_name}}</td>
                <td>
                  <span v-for="address in combine_notice.ship_notice_address">
                    <span v-if="address.type==2">
                      <span>{{address.country?address.country.Name:''}}</span>
                      <span>{{address.city?address.city.Name:''}}</span>
                      <span>{{address.address}}</span>
                      <span v-if="address.contact_name!=null&&address.contact_name!=''">
                        <br />
                        {{address.contact_name}}
                        <br />
                      </span>
                      <span v-if="address.mobile!=null&&address.mobile!=''">
                        {{address.mobile}}
                        <br />
                      </span>
                      <span v-if="address.email!=null&&address.email!=''">{{address.email}}</span>
                    </span>
                  </span>
                </td>
                <td>
                  <span v-for="address in combine_notice.ship_notice_address">
                    <span v-if="address.type==1">
                      <span>{{address.country?address.country.Name:''}}</span>
                      <span>{{address.city?address.city.Name:''}}</span>
                      <span>{{address.address}}</span>
                      <span v-if="address.contact_name!=null&&address.contact_name!=''">
                        <br />
                        {{address.contact_name}}
                        <br />
                      </span>
                      <span v-if="address.mobile!=null&&address.mobile!=''">
                        {{address.mobile}}
                        <br />
                      </span>
                      <span v-if="address.email!=null&&address.email!=''">{{address.email}}</span>
                    </span>
                  </span>
                </td>
                <td>{{combine_notice.express_account_type?express_account_type[combine_notice.express_account_type].name:''}}</td>
                <td>
                  <span v-for="company in express_company">
                    <span v-if="company.id==combine_notice.express_company_id">{{company.name}}</span>
                  </span>
                </td>
                <td>{{combine_notice.express_account}}</td>
              </tr>
              <tr>
                <td>{{$t('wareHouse.ship_detail.ship_detail64')}}</td><!-- 发货备注 -->
                <td>
                  <span>{{combine_notice.remark}}</span>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail50')}}</td><!-- 发票备注 -->
                <td>
                  <span>{{combine_notice.invoice_remark}}</span>
                </td>
                <td>{{$t('wareHouse.ship_detail.ship_detail51')}}</td><!-- 发货文件备注 -->
                <td>
                  <span>{{combine_notice.ship_file_remark}}</span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>{{$t('wareHouse.ship_detail.ship_detail52')}}</b><!-- 发货信息 -->
            </el-button>
          </el-form-item>
          <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
            <tr>
              <th>{{$t('wareHouse.ship_detail.ship_detail27')}}</th><!-- 发货方式 -->
              <th>{{$t('wareHouse.ship_detail.ship_detail53')}}</th><!-- 发货确认日期 -->
              <th>{{$t('wareHouse.ship_detail.ship_detail54')}}</th><!-- 到货日期 -->
              <th>{{$t('wareHouse.ship_detail.ship_detail55')}}</th><!-- 运单状态 -->
              <th>{{$t('wareHouse.ship_detail.ship_detail56')}}</th><!-- 运单结束日期 -->
              <th>{{$t('wareHouse.ship_detail.ship_detail17')}}</th><!-- 发货备注 -->
            </tr>
            <tr>
              <td>
                <el-select
                  size="mini"
                  v-model="combine_notice.combine_ship.delivery_type_id"
                  clearable
                  style="width: 100%;"
                >
                  <el-option v-for="i in delivery_type" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
              </td>
              <td>
                <el-date-picker
                  value-format="yyyyMMdd"
                  type="date"
                  v-model="combine_notice.combine_ship.shipment_date"
                  size="mini"
                  style="width: 80%;padding-left: 30px"
                  clearable
                ></el-date-picker>
              </td>
              <td>
                <el-date-picker
                  class="date_picker"
                  value-format="yyyyMMdd"
                  type="date"
                  placeholder
                  size="mini"
                  v-model="combine_notice.combine_ship.arrival_date"
                  style="width: 80%;padding-left: 30px"
                  clearable
                ></el-date-picker>
              </td>
              <td>
                <el-select
                  size="mini"
                  v-model="combine_notice.combine_ship.waybill_status"
                  clearable
                  style="width: 100%;"
                >
                  <el-option
                    v-for="i in waybill_status_info"
                    :key="i.id"
                    :label="i.name"
                    :value="i.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <el-date-picker
                  class="date_picker"
                  value-format="yyyyMMdd"
                  type="date"
                  placeholder
                  size="mini"
                  v-model="combine_notice.combine_ship.waybill_end_date"
                  style="width: 80%;padding-left: 30px"
                  clearable
                ></el-date-picker>
              </td>
              <td>
                <el-input v-model="combine_notice.combine_ship.ship_remark"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>{{$t('wareHouse.ship_detail.ship_detail57')}}</b><!-- 物流信息 -->
            </el-button>
          </el-form-item>
          <table border="1" bordercolor="#E5E5E5" style="width: 100%;">
            <tr>
              <th>
                <span style="color:red;">*</span>{{$t('wareHouse.ship_detail.ship_detail58')}}<!-- 物流公司 -->
              </th>
              <th>{{$t('wareHouse.ship_detail.ship_detail59')}}</th><!-- 运单号 -->
              <th>{{$t('wareHouse.ship_detail.ship_detail60')}}</th><!-- 运费 -->
              <!--<th>-->
              <!--<span style="color:red;">*</span>货币-->
              <!--</th>-->
              <th>{{$t('wareHouse.ship_detail.ship_detail49')}}</th><!-- 备注 -->
              <th>
                <el-button @click="add" type="primary" size="mini">+</el-button>
              </th>
            </tr>
            <tr v-for="(items,index) in combine_notice.logistic">
              <td>
                <el-select
                  size="mini"
                  v-model="items.express_company_id"
                  clearable
                  style="width: 100%;"
                >
                  <el-option v-for="i in express_company" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
              </td>
              <td>
                <el-input v-model="items.waybill_number"></el-input>
              </td>
              <td>
                <el-input v-model="items.total_money"></el-input>
              </td>
              <!--<td>-->
              <!--<el-select size="mini" v-model="items.currency_id" clearable style="width: 100%;">-->
              <!--<el-option v-for="i in currencys" :key="i.id" :label="i.name" :value="i.id"></el-option>-->
              <!--</el-select>-->
              <!--</td>-->
              <td>
                <el-input v-model="items.remark"></el-input>
              </td>
              <td class="d2-text-center">
                <el-button type="primary" @click="save_item(items)" size="mini" >{{$t('save')}}</el-button><!-- 保存 -->
                <el-button @click="d(items,index)" type="primary" size="mini">-</el-button>
              </td>
            </tr>
          </table>
        </div>
        <el-form-item class="from-item" style="margin:0px;text-align: center">
          <el-button type="primary" :loading="save_fy" @click="save()" size="small">{{$t('wareHouse.ship_detail.ship_detail28')}}</el-button><!-- 发货 -->
          <el-button @click="close()" size="small">{{$t('cancel')}}</el-button><!-- 取消 -->
        </el-form-item>
      </el-form>
    </div>
    <!-- 备注 -->
    <el-dialog :visible.sync="note" width="50%" class="quoteInput">
      <el-form label-width="100px" label-position="right" class="quoteInput">
        <el-form-item :label="$t('wareHouse.ship_detail.ship_detail61')"><!-- 合同备注 -->
          <el-input size="small" type="textarea" :rows="3" v-model="new_note.note"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.ship_detail.ship_detail62')"><!-- 文件 -->
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
            <el-button size="mini" type="primary">{{$t('wareHouse.ship_detail.ship_detail63')}}</el-button><!-- 上传文件 -->
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="addNote()">{{$t('save')}}</el-button><!-- 保存 -->
          <el-button size="mini" @click="note = false">{{$t('cancel')}}</el-button><!-- 取消 -->
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- <el-dialog title="提示" :visible.sync="Dialog_split_package" width="30%">
      <el-form>
        <el-form-item>
          <div v-for="item in split_package_list">
            <span>
              从{{item.out_shelf}}货架中规格为{{item.packsize}}
              {{getEnumValue(units,item.unit_id)}}的拆出
            </span>
          </div>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button size="mini" type="primary" @click="save_b()">确定</el-button>
          <el-button size="mini" @click="Dialog_split_package = false">{{$t('cancel')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </d2-container>
</template>
<script>
import $ from 'jquery'
import {
  ship_view,
  ship,
  ship_logistic,
  ship_logistic_del,
  cancle_notice
} from '@/api/warehouse'
import util from '@/libs/util'
import { parse } from 'path'
import { mapState, mapActions } from "vuex";
export default {
  name: 'Warehouse-ship_detail',
  data () {
    return {
      id: '',
      res:'',
      save_fy:false,
      shipment_date:'',
      play: false,
      note: false,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      supplyloading: false,
      Dialog_split_package:false,
      split_package_list:[],
      contract: {},
      supply_list: [],
      corp_List: [],
      fee_apply_check_status: [],
      fee_apply_status: [],
      pay_type_info: [],
      currencys: [],
      fee_type_info: [],
      payment_info_name: '',
      total_application_info_name: '',
      customer_name: '',
      apply_form: {
        contract_id: '',
        contract_number: '',
        type: 1,
        fee_type: '',
        amount: '',
        currency_id: '',
        bank: '',
        receiver: '',
        bank_account_id: '',
        bank_account: '',
        pay_type: '',
        check_remark: ''
      },
      new_note: {
        contract_id: '',
        note: '',
        type: 1
      },
      upload_api: process.env.VUE_APP_API + 'api/v1/contractNoteCreate',
      loading: false,
      delivery_type: [],
      units: [],
      invoice_type: [],
      test_item: [],
      product_file_info: [],
      preout_status: [],
      fileList: [],
      express_company: [],
      express_account_type: [],
      country_list: [],
      city_list: [],
      preout_type_info: [],
      checked_result: [],
      if_need_check: [],
      if_sample_info: [],
      address: '',
      remark: '',
      invoice_remark: '',
      combine_notice: { combine_ship: {} },
      combine_notice_close:{},
      details: [],
      notices: [],
      tableData: [
        {
          combine_shipping_notice_id: '',
          express_company_id: '',
          waybill_number: '',
          total_money: '',
          currency_id: '',
          remark: ''
        }
      ],
      delivery_type_id: '',
      express_company_id: '',
      currency_id: '',
      item_id:'',
      warehouse: [],
      if_declare_info: [],
      waybill_status_info: {},
      notice_status_info: {}
    }
  },
  created () {
    if (this.$route.query.id) {
      this.fetchData()
      this.item_id = this.$route.query.id
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "Warehouse-ship_detail") {
        // this.fetchData();
        this.item_id = this.$route.query.id
      }
    },
    item_id(to,form){
      if(to&&to!=form&&form){
        this.fetchData_b()
      }
    }
  },
  computed: {
    headers () {
      const token = util.cookies.get('token')
      return {
        Authorization: 'Bearer ' + token,
        'Version-Number':process.env.VUE_APP_Version
      }
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData () {
      this.details = []
      if(this.$route.query.id){
        // ship_view(this.$route.query.id)
        // .then(res => {
        let res = JSON.parse(this.$route.query.res)  
          if (res.code == 0) {
            this.shipment_date = res.data.shipment_date
            if (res.data.combine_notice.combine_ship == null) {
              res.data.combine_notice.combine_ship = {}
              res.data.combine_notice.combine_ship.delivery_type_id =
                res.data.combine_notice.delivery_type_id
              res.data.combine_notice.combine_ship.shipment_date = this.shipment_date
              res.data.combine_notice.combine_ship.arrival_date = ''
              res.data.combine_notice.combine_ship.waybill_end_date = ''
              res.data.combine_notice.combine_ship.waybill_status = 1
              res.data.combine_notice.combine_ship.ship_remark = ''
            } else {
              res.data.combine_notice.combine_ship.shipment_date = res.data
                .combine_notice.combine_ship.shipment_date
                ? res.data.combine_notice.combine_ship.shipment_date.toString()
                : this.shipment_date
              res.data.combine_notice.combine_ship.arrival_date = res.data
                .combine_notice.combine_ship.arrival_date
                ? res.data.combine_notice.combine_ship.arrival_date.toString()
                : ''
              res.data.combine_notice.combine_ship.waybill_end_date = res.data
                .combine_notice.combine_ship.waybill_end_date
                ? res.data.combine_notice.combine_ship.waybill_end_date.toString()
                : ''
            }
            if (res.data.combine_notice.logistic.length == 0) {
              res.data.combine_notice.logistic.push({
                combine_shipping_notice_id: '',
                express_company_id: '',
                waybill_number: '',
                total_money: '',
                currency_id: 2,
                remark: ''
              })
            }else{
              res.data.combine_notice.logistic.forEach(i=>{
                i.currency_id = 2
              })
            }
            this.combine_notice = res.data.combine_notice
            this.combine_notice_close = JSON.parse(JSON.stringify(res.data.combine_notice))
            this.details.push(
              res.data.combine_notice.notice[0].contract_detail
            )
            //  res.data.combine_notice.notice.forEach(item=>{
            //   if(item.inventory&&item.inventory.shelves.length>0){
            //     item.inventory.shelves.forEach(i=>{
            //       i.number = ''
            //     })
            //   }
            //   if(item.packs&&item.packs.shelves.length>0){
            //     item.packs.shelves.forEach(i=>{
            //       i.number = ''
            //     })
            //   }
            // })
            res.data.combine_notice.notice.forEach((items, index) => {
              if (items.ship == null) {
                items.ship = {
                  shipping_notice_id: items.id,
                  customs_fee: 0,
                  identification_fee: 0,
                  if_sample: items.if_sample,
                  total_money: items.total_money
                }
              }
              // if(items.ship&&items.ship.inventory_log&&items.ship.inventory_log.length !=0){
              //   if(items.ship.type == 2){
              //     items.inventory.shelves.forEach(i=>{
              //       items.ship.inventory_log.forEach(j=>{
              //         if(i.id==j.inventory_shelve_id){
              //           i.number = j.base_quantity
              //         }
              //       })
              //     })
              //   }else if(items.ship.type == 1){
              //     items.packs.shelves.forEach(i=>{
              //       items.ship.inventory_log.forEach(j=>{
              //         if(i.id==j.inventory_shelve_id){
              //           i.number = j.package_nums
              //         }
              //       })
              //     })
              //   }
              // }
            })
            this.notices = res.data.combine_notice.notice
            this.delivery_type = res.enum.delivery_type
            this.units = res.enum.units
            this.invoice_type = res.enum.invoice_type
            this.test_item = res.enum.test_item
            this.product_file_info = res.enum.product_file_info
            this.preout_status = res.enum.preout_status
            this.express_company = res.enum.express_company
            this.express_account_type = res.enum.express_account_type
            this.preout_type_info = res.enum.preout_type_info
            this.if_need_check = res.enum.if_need_check
            this.checked_result = res.enum.checked_result
            this.if_sample_info = res.enum.if_sample_info
            this.currencys = res.enum.currencys
            this.warehouse = res.enum.warehouse
            this.if_declare_info = res.enum.if_declare_info
            this.waybill_status_info = res.enum.waybill_status_info
            this.notice_status_info = res.enum.notice_status_info
          } 
        //  })
      }
    },
    fetchData_b () {
      this.details = []
      if(this.$route.query.id){
        ship_view(this.$route.query.id)
        .then(res => {
        this.$route.query.res = JSON.stringify(res)  
          if (res.code == 0) {
            this.shipment_date = res.data.shipment_date
            if (res.data.combine_notice.combine_ship == null) {
              res.data.combine_notice.combine_ship = {}
              res.data.combine_notice.combine_ship.delivery_type_id =
                res.data.combine_notice.delivery_type_id
              res.data.combine_notice.combine_ship.shipment_date = this.shipment_date
              res.data.combine_notice.combine_ship.arrival_date = ''
              res.data.combine_notice.combine_ship.waybill_end_date = ''
              res.data.combine_notice.combine_ship.waybill_status = 1
              res.data.combine_notice.combine_ship.ship_remark = ''
            } else {
              res.data.combine_notice.combine_ship.shipment_date = res.data
                .combine_notice.combine_ship.shipment_date
                ? res.data.combine_notice.combine_ship.shipment_date.toString()
                : this.shipment_date
              res.data.combine_notice.combine_ship.arrival_date = res.data
                .combine_notice.combine_ship.arrival_date
                ? res.data.combine_notice.combine_ship.arrival_date.toString()
                : ''
              res.data.combine_notice.combine_ship.waybill_end_date = res.data
                .combine_notice.combine_ship.waybill_end_date
                ? res.data.combine_notice.combine_ship.waybill_end_date.toString()
                : ''
            }
            if (res.data.combine_notice.logistic.length == 0) {
              res.data.combine_notice.logistic.push({
                combine_shipping_notice_id: '',
                express_company_id: '',
                waybill_number: '',
                total_money: '',
                currency_id: 2,
                remark: ''
              })
            }else{
              res.data.combine_notice.logistic.forEach(i=>{
                i.currency_id = 2
              })
            }
            this.combine_notice = res.data.combine_notice
            this.combine_notice_close = JSON.parse(JSON.stringify(res.data.combine_notice))
            this.details.push(
              res.data.combine_notice.notice[0].contract_detail
            )
            res.data.combine_notice.notice.forEach((items, index) => {
              if (items.ship == null) {
                items.ship = {
                  shipping_notice_id: items.id,
                  customs_fee: 0,
                  identification_fee: 0,
                  if_sample: items.if_sample,
                  total_money: items.total_money
                }
              }
            })
            this.notices = res.data.combine_notice.notice
            this.delivery_type = res.enum.delivery_type
            this.units = res.enum.units
            this.invoice_type = res.enum.invoice_type
            this.test_item = res.enum.test_item
            this.product_file_info = res.enum.product_file_info
            this.preout_status = res.enum.preout_status
            this.express_company = res.enum.express_company
            this.express_account_type = res.enum.express_account_type
            this.preout_type_info = res.enum.preout_type_info
            this.if_need_check = res.enum.if_need_check
            this.checked_result = res.enum.checked_result
            this.if_sample_info = res.enum.if_sample_info
            this.currencys = res.enum.currencys
            this.warehouse = res.enum.warehouse
            this.if_declare_info = res.enum.if_declare_info
            this.waybill_status_info = res.enum.waybill_status_info
            this.notice_status_info = res.enum.notice_status_info
          } else {
              let that=this
              const tagName = "Warehouse-ship_detail";
              that.closeAdd({ tagName });
              that.$router.push({
                path: '/Warehouse/ship',
                name: 'Warehouse-ship'
              })
          }
         })
      }
    },
    fetchData_c () {
      if(this.$route.query.id){
        ship_view(this.$route.query.id)
        .then(res => {
          if (res.code == 0) {
            this.combine_notice.logistic = res.data.combine_notice.logistic
            
          } else {
              let that=this
              const tagName = "Warehouse-ship_detail";
              that.closeAdd({ tagName });
              that.$router.push({
                path: '/Warehouse/ship',
                name: 'Warehouse-ship'
              })
          }
         })
      }
    },
    add () {
      this.combine_notice.logistic.push({
        combine_shipping_notice_id: '',
        express_company_id: '',
        waybill_number: '',
        total_money: '',
        currency_id: 2,
        remark: ''
      })
    },
    d (items, index) {
      if (items.id) {
        ship_logistic_del(items.id, this.$route.query.id, this)
      } else {
        this.combine_notice.logistic.splice(index, 1)
      }
    },
    save_item (item) {
      item.currency_id = 2
      item.combine_shipping_notice_id = this.combine_notice.id
      ship_logistic(item, this.$route.query.id, this)
    },
    save () {
      let ships_a = this.notices
      let ships_b = this.notices
      ships_a.forEach((items, index) => {
        if (items.status == 2) {
          ships_b.splice(index, 1)
        }
      })
      ships_b.forEach((items, index) => {
        items.if_sample = items.ship.if_sample
        items.shipping_notice_id = items.ship.shipping_notice_id
        items.id = items.ship.id ? items.ship.id : ''
        items.base_quantity = items.preout.base_quantity
        items.base_quantity_unit = items.preout.base_quantity_unit
        items.package_nums = items.preout.package_nums
        items.type = items.preout.type
        items.customs_fee = items.ship.customs_fee
        items.identification_fee = items.ship.identification_fee
        if (items.preout.type == 1) {
          var arr = []
          items.packs.shelves.forEach(res => {
            var obj_i = {
              type: items.preout.type,
              shelve_id: res.id,
              base_quantity: parseInt(res.number)
                ? parseInt(res.number) * parseFloat(res.packsize)
                : res.number,
              base_quantity_unit_id: res.packsize_unit_id,
              nums: res.number
            }
            if(obj_i.nums&&obj_i.nums>=1){
              arr.push(obj_i)
            }
          })
          items.shelve = arr
        } else if (items.preout.type == 2) {
          var arr = []
          items.inventory.shelves.forEach(res => {
            var obj_i = {
              type: items.preout.type,
              shelve_id: res.id,
              base_quantity: res.number,
              base_quantity_unit_id: res.base_quantity_unit_id,
              nums: 1
            }
            if(obj_i.base_quantity&&obj_i.base_quantity!=0){
              arr.push(obj_i)
            }
          })
          items.shelve = arr
        }
        // if(items.preout.split_package_log_id>0&&items.preout.split_package_log){
        //   this.split_package_list = []
        //   this.split_package_list.push(items.preout.split_package_log)
        //   this.Dialog_split_package = true
        // }
      })
      // if(!this.Dialog_split_package){
        let obj = {
          combine_shipping_notice_id: this.combine_notice.id,
          combine_ship_id: this.combine_notice.combine_ship.id
            ? this.combine_notice.combine_ship.id
            : '',
          delivery_type_id: this.combine_notice.delivery_type_id,
          shipment_date: this.combine_notice.combine_ship.shipment_date,
          arrival_date: this.combine_notice.combine_ship.arrival_date,
          waybill_end_date: this.combine_notice.combine_ship.waybill_end_date,
          waybill_status: this.combine_notice.combine_ship.waybill_status,
          ship_remark: this.combine_notice.combine_ship.ship_remark,
          ship: ships_b
        }
        this.save_fy = true
        ship(obj, this.$route.query.id, this)
      // }
    },
    save_b(){
      let ships_a = this.notices
      let ships_b = this.notices
      ships_a.forEach((items, index) => {
        if (items.status == 2) {
          ships_b.splice(index, 1)
        }
      })
      ships_b.forEach((items, index) => {
        items.if_sample = items.ship.if_sample
        items.shipping_notice_id = items.ship.shipping_notice_id
        items.id = items.ship.id ? items.ship.id : ''
        items.base_quantity = items.preout.base_quantity
        items.base_quantity_unit = items.preout.base_quantity_unit
        items.package_nums = items.preout.package_nums
        items.type = items.preout.type
        items.customs_fee = items.ship.customs_fee
        items.identification_fee = items.ship.identification_fee
        if (items.preout.type == 1) {
          var arr = []
          items.packs.shelves.forEach(res => {
            var obj_i = {
              type: items.preout.type,
              shelve_id: res.id,
              base_quantity: parseInt(res.number)
                ? parseInt(res.number) * parseFloat(res.packsize)
                : res.number,
              base_quantity_unit_id: res.packsize_unit_id,
              nums: res.number
            }
            arr.push(obj_i)
          })
          items.shelve = arr
        } else if (items.preout.type == 2) {
          var arr = []
          items.inventory.shelves.forEach(res => {
            var obj_i = {
              type: items.preout.type,
              shelve_id: res.id,
              base_quantity: res.number,
              base_quantity_unit_id: res.base_quantity_unit_id,
              nums: 1
            }
            arr.push(obj_i)
          })
          items.shelve = arr
        }
      })
      let obj = {
        combine_shipping_notice_id: this.combine_notice.id,
        combine_ship_id: this.combine_notice.combine_ship.id
          ? this.combine_notice.combine_ship.id
          : '',
        delivery_type_id: this.combine_notice.delivery_type_id,
        shipment_date: this.combine_notice.combine_ship.shipment_date,
        arrival_date: this.combine_notice.combine_ship.arrival_date,
        waybill_end_date: this.combine_notice.combine_ship.waybill_end_date,
        waybill_status: this.combine_notice.combine_ship.waybill_status,
        ship_remark: this.combine_notice.combine_ship.ship_remark,
        ship: ships_b
      }
      this.save_fy = true
      ship(obj, this.$route.query.id, this)
    },
    cancel (id,prod_id) {
      cancle_notice(id,prod_id, this)
    },
    jinace(){
      let num = this.notices.length;
      this.notices.forEach(item=>{
        if (item.status==1) {
          num--;
        }
        if (num == 0){
          let that=this
              const tagName = "Warehouse-ship_detail";
              that.closeAdd({ tagName });
              that.$router.push({
                path: '/Warehouse/ship',
                name: 'Warehouse-ship'
              })
        }
      })
    },
    querySearchAsync_customer (queryString, cb) {
      if (queryString != '') {
        customer_lists(queryString).then(res => {
          var restaurants = res.data
          var results = queryString
            ? restaurants.filter(this.createFilter_customer(queryString))
            : restaurants
          // 调用 callback 返回建议列表的数据
          cb(results)
        })
      }
    },
    querySearchAsync (queryString, cb) {
      if (queryString != '') {
        cas_info(queryString).then(res => {
          var restaurants = res.data
          var results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants
          // 调用 callback 返回建议列表的数据
          cb(results)
        })
      }
    },
    createFilter_customer (queryString) {
      return restaurant => {
        return (
          restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    createFilter (queryString) {
      return restaurant => {
        return (
          restaurant.cas.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect_customer (item) {
      this.customer_name = item.name
      member_bank_accounts(item.id).then(res => {
        this.apply_form.bank = res.data[0].opening_bank
        this.apply_form.receiver = res.data[0].payee
        this.apply_form.bank_account = res.data[0].bank_account_number
        this.apply_form.bank_account_id = res.data[0].id
        this.apply_form.check_remark = res.data[0].remark
      })
    },
    add_note () {
      this.note = true
      this.new_note.note = ''
      this.fileList = []
      this.new_note.contract_id = this.contract.id
    },
    destroyNote (row) {
      contractNoteDestroy(row, this)
    },
    onSubmit () {
      this.$refs.upload.submit()
    },

    handlePreview (file) {
      // console.log(file)
    },
    handleExceed (files, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$message.warning('当前限制选择5个文件')
    },
    handleAvatarSuccess (res, file, fileList) {
      if (file.response.code == 0) {
        this.$message({
          message: 'success',
          type: 'success'
        })
        this.fetchData_b(this.id)
        this.note = false
      } else {
        this.$message.error(file.response.msg)
      }
    },
    handleRemove () {},
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    supplyMethod (query) {
      if (query !== '') {
        this.supplyloading = true
        setTimeout(() => {
          listTotal('data/member_list?type=2&name=' + query).then(res => {
            this.supply_list = res.data
              this.supplyloading = false

          })
        }, 200)
      } else {
        this.supply_list = []
      }
    },
    supplyChange () {
      this.contract.supplier_id = this.supply_list.filter(item => {
        return item.name == this.contract.supplier_name
      })[0].id
    },
    hand_account () {
      this.play = true
    },
    noticeClose (even) {
      this.play = even
    },
    close () {
      var that = this
      that.combine_notice= that.combine_notice_close
      that.$router.push({
        path: '/Warehouse/ship',
        name: 'Warehouse-ship'
      })
      const tagName = "Warehouse-ship_detail";
      that.closeAdd({ tagName });
    },
    addNote () {
      this.new_note.contract_id = this.contract.id
      this.$refs.upload.submit()
    },
    save_apply_form () {
      fee_application_save(this.id, this.apply_form, this)
    }
  }
}
function init () {
  var date = new Date()
  // 年
  var year = date.getFullYear()
  // 月
  var month = date.getMonth() + 1
  // 日
  var day = date.getDate()
  month = month < 10 ? '0' + month : month // 如果小于10即显示为09月
  day = day < 10 ? '0' + day : day // 如果小于10即显示为09日
  return year.toString() + month.toString() + day.toString()
}
</script>
