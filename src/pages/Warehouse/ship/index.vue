<style lang="scss" scoped type="text/scss" >
table {
  border-collapse: collapse;
  td,th{
    line-height: 20px;
    padding: 5px 2px!important;
  }
}
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
/deep/ .el-table th{
  padding: 5px 0!important;
  font-size: 13px;
}
/deep/ .el-table td{
  padding: 5px 0!important;
  font-size: 13px;
}
.el-row{
  margin: 5px;
}
table >>> .el-input__inner {
  border: none;
}

table >>> td {
  padding: 2px;
}
.el_form{
  .el-form{
    margin-bottom: 10px;
  }
  .el-form-item{
    margin-bottom: 0px;
  }
}
/deep/.el-table{
  /deep/.cell{
    padding:0px 5px;
  }
  td{
    vertical-align:text-top;
  }
}
.table_list{
  width: 100%;
  td{
    word-wrap:break-word;
    word-break:break-all;
    font-size: 13px;
    min-width: 50px;
    .el-badge{
      cursor: pointer;
    }
  }
  .table_list_tr:hover {
    background:#F4F7FA;
  }
}
</style>
<template>
  <d2-container ref="a">
    <div>
      <el-row type="flex" justify="start">
        <el-col :span="24">
          <el-input
            size="mini"
            v-model="queryList.combine_id"
            style="width: 85px;margin-right: 5px;margin-top:2px;"
            :placeholder="$t('wareHouse.ship.ship1')"
            clearable
          ></el-input><!-- 合发ID -->
          <el-input
            size="mini"
            v-model="queryList.contract_detail_number"
            style="width: 120px;margin-right: 5px;margin-top:2px;"
            :placeholder="$t('wareHouse.ship.ship2')"
            clearable
          ></el-input><!-- 合同号 -->
          <el-input
            size="mini"
            v-model="queryList.cas"
            style="width: 120px;margin-right: 5px;margin-top:2px;"
            placeholder="CAS"
            clearable
          ></el-input>
          <el-input
            size="mini"
            v-model="queryList.batchno"
            style="width: 120px;margin-right: 5px;margin-top:2px;"
            :placeholder="$t('wareHouse.ship.ship3')"
            clearable
          ></el-input><!-- 批号 -->
          <el-select
                  placeholder="仓库"
                  clearable
                  v-model="queryList.warehouse_id"
                  filterable
                  size="mini"
                  style="width: 150px;margin-right: 5px;"
          >
            <el-option
                    v-for="item in warehouse"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
            ></el-option>
          </el-select>
          <el-select
            v-model="queryList.customer_id"
            :placeholder="$t('wareHouse.ship.ship4')"
            size="mini"
            filterable
            remote
            reserve-keyword
            :remote-method="supplyMethod"
            :loading="supplyloading"
            style="width: 200px;margin-right: 5px;margin-top:2px;"
            clearable
          >
            <el-option
              v-for="item in supply_list"
              :label="item.name"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select><!-- 客户 -->
          <el-date-picker
            class="date_picker"
            v-model="queryList.notice_start_time"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('wareHouse.ship.ship5')"
            size="mini"
            style="width: 130px;margin-right: 5px;margin-top:2px;"
            clearable
          ></el-date-picker><!-- 通知开始 -->
          <el-date-picker
            class="date_picker"
            v-model="queryList.notice_end_time"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
            type="date"
            :placeholder="$t('wareHouse.ship.ship6')"
            size="mini"
            style="width: 130px;margin-right: 5px;margin-top:2px;"
            clearable
          ></el-date-picker><!-- 通知结束 -->
          <el-date-picker
            class="date_picker"
            v-model="queryList.transfer_start_date"
            type="datetime"
            value-format="yyyyMMddHHmmss"
            :placeholder="$t('wareHouse.ship.ship7')"
            size="mini"
            style="width: 175px;margin-right: 5px;margin-top:2px;"
            clearable
          ></el-date-picker><!-- 中转开始 -->
          <el-date-picker
            class="date_picker"
            v-model="queryList.transfer_end_date"
            type="datetime"
            value-format="yyyyMMddHHmmss"
            :placeholder="$t('wareHouse.ship.ship8')"
            size="mini"
            style="width: 175px;margin-right: 5px;margin-top:2px;"
            clearable
          ></el-date-picker><!-- 中转结束 -->
          <el-select
            v-model="queryList.packing_status"
            :placeholder="$t('wareHouse.ship.ship9')"
            size="mini"
            clearable
            filterable
            style="width: 100px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in packing_status_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select><!-- 分装状态 -->
          <el-select
            v-model="queryList.has_waybill_number"
            placeholder="填写快递单"
            size="mini"
            clearable
            filterable
            style="width: 110px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in enums.has_waybill_number_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
          <el-select
            v-model="queryList.notice_status"
            :placeholder="$t('wareHouse.ship.ship10')"
            size="mini"
            clearable
            filterable
            style="width: 94px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in notice_status_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select><!-- 通知状态 -->
          <el-select
            v-model="queryList.transfer_ship"
            :placeholder="$t('wareHouse.ship.ship11')"
            size="mini"
            clearable
            filterable
            style="width: 100px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in transfer_ship_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select><!-- 直发/中转 -->
          <el-select
            v-model="queryList.waybill_status"
            :placeholder="$t('wareHouse.ship.ship12')"
            size="mini"
            clearable
            filterable
            style="width: 94px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in waybill_status_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select><!-- 运单状态 -->
          <el-select
            v-model="queryList.doc_status"
            :placeholder="$t('wareHouse.ship.ship13')"
            size="mini"
            clearable
            filterable
            style="width: 94px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in doc_statuses" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select><!-- 发货文件 -->
          <el-select
            v-model="queryList.if_large_label_print"
            placeholder="大标签"
            size="mini"
            clearable
            filterable
            style="width: 94px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in label_print_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
          <el-select
            v-model="queryList.if_small_label_print"
            placeholder="小标签"
            size="mini"
            clearable
            filterable
            style="width: 94px;margin-right: 5px;margin-top:2px;"
          >
            <el-option v-for="i in label_print_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
          <el-input
            size="mini"
            v-model="queryList.waybill_number"
            style="width: 140px;margin-right: 5px;margin-top:2px;"
            :placeholder="$t('wareHouse.ship.ship84')"
            clearable
          ></el-input><!-- 运单号 -->
          <el-button size="mini" type="primary" :loading="loading_search" @click="search()" style="margin-top:2px;">{{$t('search')}}</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <div class="d2-text-right d2-m-10">
        <el-button
          type="primary"
          size="mini"
          @click="print_all()"
        >批量打印</el-button>
        <el-button
          type="primary"
          size="mini"
          class="d2-mr-10"
          @click="packing"
          :loading="packing_file_loading"
        >{{$t('wareHouse.ship.ship14')}}</el-button><!-- 分装文件 -->
        <el-button v-if="file" type="primary" size="mini" class="d2-mr-10">
          <a :href="file_url" style="color:white">{{$t('wareHouse.ship.ship19')}}</a><!-- 文件 -->
        </el-button>
        <el-button
          type="primary"
          size="mini"
          class="d2-mr-10"
          @click="package"
          :loading="package_loading"
        >{{$t('wareHouse.ship.ship15')}}</el-button><!-- 装箱单 -->
        <el-button
          type="primary"
          size="mini"
          class="d2-mr-10"
          @click="package_kh"
        >凯为装箱单</el-button><!-- 装箱单凯为 -->
        <el-button type="primary" size="mini" class="d2-mr-10" @click="pack">{{$t('wareHouse.ship.ship20')}}</el-button><!-- 分装 -->
        <el-button
          type="primary"
          size="mini"
          class="d2-mr-10"
          @click="transfer_file"
          :loading="transfer_file_loading"
        >{{$t('wareHouse.ship.ship16')}}</el-button><!-- 中转发货文件 -->
        <el-button v-if="tranfer_file" type="primary" size="mini" class="d2-mr-10">
          <a :href="tranfer_file_url" style="color:white">{{$t('wareHouse.ship.ship18')}}</a><!-- 中转文件 -->
        </el-button>
        <el-button
          type="primary"
          size="mini"
          class="d2-mr-10"
          v-model="checked_all"
          @click="select_all"
        >{{$t('wareHouse.ship.ship17')}}</el-button><!-- 全选 -->
      </div>

      <el-card v-for="list in lists.data" :key="list.id" class="box-card" style="margin:15px 0;">
        <div class="text item">
          <el-row style="margin: 5px;color: black;font-size: 13px;font-weight: bold;">
            <el-col :span="18">
              <span style="display:flex;align-item:center;">
              <span style="width: 100px;display: inline-block;">{{$t('wareHouse.ship.ship1')}}:{{list.id}}</span>
              <span style="width: 250px;display: inline-block;">{{$t('wareHouse.ship.ship4')}}:{{list.customer_name}}</span>
              <!-- <span
                v-if="list.address"
                style="width: 200px;display: inline-block;"
              >{{$t('wareHouse.ship.ship21')}}:{{list.address}}</span> -->
              <!-- 收货信息 -->
              <span style="width: 200px;display: inline-block;">
                {{$t('wareHouse.ship.ship22')}}:{{transfer_ship_info[list.transfer_ship].name}}<!-- 是否直发 -->
                <span
                  @click="transfer(list.id,list.transfer_ship)"
                >
                  <i class="fa fa-exchange" style="cursor:pointer;"></i>
                </span>
              </span>
              <span style="margin-right:20px;">销售人员：{{getEnumValue(Sales,list.user_id)}}</span>
              <span v-if="list.logistic&&list.logistic.length>0">
                {{$t('wareHouse.ship.ship84')}}：<span v-for="(i,index) in list.logistic">{{i.waybill_number}} <span style="color:red;">{{index==(list.logistic.length-1)?'':','}}</span> </span>
              </span>
              </span>
            </el-col>
            <el-col class="d2-text-right" :span="6"><!-- 发货文件已做/发货文件 -->
              <el-button type="primary" size="mini" @click="Declaration_start(list)" v-if="permission_names['ship.customs_declaration_import']=='ship.customs_declaration_import'">报关单导入</el-button>
              <el-button type="primary" size="mini" @click="doc_done(list.id)">{{list.doc_status==1?$t('wareHouse.ship.ship72'):$t('wareHouse.ship.ship13')}}</el-button>
              <el-checkbox
                v-model="list.checked"
                @change="select_one(list.checked,list.id)"
                style="margin:0px 10px;"
              ></el-checkbox>
              <el-button type="primary" size="mini" @click="detail(list.id)">{{$t('wareHouse.ship.ship24')}}</el-button><!-- 发货 -->
            </el-col>
          </el-row>
          <div v-if="list.notice.length>0">
            <table border="1" bordercolor="#E5E5E5" class='table_list'>
              <tr style="font-weight: bold;">
                <td width='125'>合同号/通知日期</td>
                <td width='100'>批次/仓库</td>
                <td width='90'>CAS/库存类型</td>
                <td width='200'>产品名称</td>
                <td style="min-width:100px;">采购备注</td>
                <td style="min-width:100px;">发货备注</td>
                <td width='60'>发货数量</td>
                <td width='90'>产品外观/包装等级</td>
                <td width='60'>库位</td>
                <td width='100'>运输条件</td>
                <td width='60'>发货文件/打印标签</td>
                <td width='60'>分装/通知状态</td>
                <td width='60'>操作</td>
              </tr>
              <tr v-for="(item,index) in list.notice" class="table_list_tr">
                <td>
                  <span v-if="contract_detail_number_color&&item.contract_detail.contract_number.indexOf(contract_detail_number_color)>-1" style="color:#409EFF;">
                    {{attr(item,'contract_detail.contract_number')}}
                  </span>
                  <span v-else>
                    {{attr(item,'contract_detail.contract_number')}}
                  </span>
                  <br>
                  {{list.created_at}}
                </td>
                <td>
                  {{attr(item,'inventory.batchno')}}
                  <br>
                  {{getEnumValue(warehouse,attr(item,'inventory.warehouse_id'))}}
                </td>
                <td>
                  {{item.inventory?item.inventory.cas:''}}
                  <br>
                  {{getEnumValue(preout_type_info,attr(item,'preout.type'))}}
                </td>
                <td>
                  {{item.inventory?(item.contract_detail?item.contract_detail.product_name:''):''}}
                </td>
                <td style="vertical-align:text-top;">
                  <span style="color:red;">{{item.inventory.order?item.inventory.order.purchase_requirement:''}}</span>
                </td>
                <td :rowspan="list.notice.length" v-if="index==0" style="vertical-align:text-top;">
                  <span style="color:red;">{{list.remark}}</span>
                </td>
                <td>
                  <div v-if="item.preout&&item.preout.type==2">
                    {{attr(item,'preout.quantity')}}{{getEnumValue(units,attr(item,'preout.quantity_unit'))}}
                    <el-tooltip placement="top" v-if="item.preout.split_package_log&&item.preout.split_package_log_id>0">
                      <div slot="content">从{{item.preout.split_package_log.out_shelf}}货架中规格为{{item.preout.split_package_log.packsize}}
                        {{getEnumValue(units,item.preout.split_package_log.unit_id)}}的拆出
                      </div>
                      <span style="color:red;cursor: pointer;">(拆)</span>
                    </el-tooltip>
                  </div>
                  <div v-else>
                    {{attr(item,'preout.package_nums')}}*{{Number(item.preout.quantity)/Number(item.preout.package_nums)}}{{getEnumValue(units,attr(item,'preout.quantity_unit'))}}<br>
                    ({{attr(item,'preout.quantity')}}{{getEnumValue(units,attr(item,'preout.quantity_unit'))}})
                  </div>
                </td>
                <td>
                  <div>
                    {{getEnumValue(ChemicalAppearance,item.inventory.chemprodappearance_id)?getEnumValue(ChemicalAppearance,item.inventory.chemprodappearance_id):item.inventory.characterinfo}}
                  </div>
                  <div v-if="item.prod.property">
                    <span v-if="item.prod.property.uncode">{{item.prod.property.uncode}},</span>
                    <span v-if="item.prod.property.hazardclass">Class:{{item.prod.property.hazardclass}},</span>
                    <span v-if="item.prod.property.packinggroup">PG:{{item.prod.property?item.prod.property.packinggroup:''}}</span>
                  </div>
                </td>
                <td>
                  <div v-if="item.preout.shelf_preout&&item.preout.shelf_preout.length>0" v-for="i in item.preout.shelf_preout">
                    {{i.shelf}};
                  </div>
                </td>
                <td>
                  <div>国内：<span style="color:red;">{{getEnumValue(Trancondition,item.prod.inland_trancond_id)}}</span></div>
                  <div>国外：<span style="color:red;">{{getEnumValue(Trancondition,item.prod.abroad_trancond_id)}}</span></div>
                </td>
                <td>
                  {{getEnumValue(doc_statuses,list.doc_status)}}
                  <el-tooltip class="item" effect="dark" :content="item.if_large_label_print==2?'大标签已打印':'大标签未打印'" placement="top">
                    <el-badge value="大" :type="item.if_large_label_print==2?'success':'danger'"></el-badge>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" :content="item.if_small_label_print==2?'小标签已打印':'小标签未打印'" placement="top">
                    <el-badge value="小" :type="item.if_small_label_print==2?'success':'danger'"></el-badge>
                  </el-tooltip>
                </td>
                <td>
                  {{getEnumValue(enums.packing_status_info,item.packing_status)}}<br>
                  {{notice_status_info[item.status].name}}
                </td>
                <td>
                  <el-dropdown v-if="item.status!=2">
                    <el-button type="primary" size="mini">
                      {{$t('wareHouse.ship.ship35')}}
                      <i class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" size="mini">
                      <el-dropdown-item @click.native="package_one(item.id)">{{$t('wareHouse.ship.ship15')}}</el-dropdown-item>
                      <el-dropdown-item @click.native="Msds(item)">MSDS</el-dropdown-item>
                      <el-dropdown-item @click.native="more_d(item)">angene 大标签</el-dropdown-item>
                      <el-dropdown-item @click.native="more_e(item)">angene 小标签</el-dropdown-item>
                      <!-- <el-dropdown-item @click.native="more_f(item)">aablocks 大标签</el-dropdown-item> -->
                      <!-- <el-dropdown-item @click.native="more_g(item)">aablocks 小标签</el-dropdown-item> -->
                      <el-dropdown-item @click.native="more_h(item)">aikon 大标签</el-dropdown-item>
                      <el-dropdown-item @click.native="more_i(item)">aikon 小标签</el-dropdown-item>
                      <el-dropdown-item @click.native="more_ll_d(item)">中性 大标签</el-dropdown-item>
                      <el-dropdown-item @click.native="more_ll_s(item)">中性 小标签</el-dropdown-item>
                      <el-dropdown-item @click.native="more_big(list,item)">大标签</el-dropdown-item>
                      <el-dropdown-item @click.native="more_small(list,item)">小标签</el-dropdown-item>
                      <el-dropdown-item @click.native="make_tag(list,item)">新标签</el-dropdown-item>
                      <el-dropdown-item @click.native="print_item(list,item)">打印标签</el-dropdown-item>
                      <el-dropdown-item @click.native="ship_file(list)">{{$t('wareHouse.ship.ship13')}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </el-card>

      <!--  报关单导入 -->
      <el-dialog title="报关单导入" :visible.sync="dialogDeclaration" width="30%">
         <el-form label-width="90px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="报关单号:" required>
                <el-input size="mini" v-model="declarationForm.customs_declaration_number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="报关日期:" required>
                <el-date-picker
                  class="date_picker"
                  v-model="declarationForm.customs_declaration_date"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  type="date"
                  size="mini"
                  clearable
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="运抵国:" required>
                <el-input size="mini" v-model="declarationForm.destination"></el-input>
                <!-- <el-select
                  v-model="declarationForm.destination"
                  filterable
                  size="mini"
                >
                  <el-option
                    v-for="(i,index) in country"
                    :key="index"
                    :label="i.Name"
                    :value="i.Code"
                  ></el-option>
                </el-select> -->
              </el-form-item>
              <el-form-item label="发货方:" required>
                <el-input size="mini" v-model="declarationForm.ship_company"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item style="text-align:right;">
            <el-button @click="dialogDeclaration = false" size="mini">{{$t('cancel')}}</el-button><!-- 取 消 -->
            <el-button type="primary" size="mini" @click="declaration_make()" :loading="loading_declaration">确定</el-button><!-- 生 成 -->
          </el-form-item>
        </el-form>
      </el-dialog>

      <!-- 批量打印· -->
      <!-- <el-dialog title="批量打印" :visible.sync="dialogVisible_print_all" width="20%">
        <div style="text-align:center;">
          <el-button type="primary" size="mini" @click="print_all_big()">打印大标签</el-button>
          <el-button type="primary" size="mini" @click="print_all_small()">打印小标签</el-button>
        </div>
      </el-dialog> -->

      <!-- Print_make -->
      <el-dialog title="Print" :visible.sync="dialogVisible_make" width="40%">
        <el-form label-width="130px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="CAS#:">
                <el-input v-model="agnene_big.cas"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Batch No#:">
                <el-input v-model="agnene_big.batch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Weight:">
                <el-input v-model="agnene_big.weight"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_make = false">{{$t('cancel')}}</el-button><!-- 取 消 -->
          <el-button type="primary" @click="print_make()">打印</el-button><!-- 生 成 -->
        </span>
      </el-dialog>

      <!-- 生成MSDS文件 -->
      <el-dialog
        :title="$t('wareHouse.ship.ship38')"
        v-if="dialogVisible_msds"
        :visible.sync="dialogVisible_msds"
        width="50%"
      >
        <el-form label-width="150px">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('wareHouse.ship.ship28')"><!-- 产品名称 -->
                <el-input size="mini" v-model="msds_data.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item :label="$t('wareHouse.ship.ship39')"><!-- 产品编码 -->
                <el-input size="mini" v-model="msds_data.prodno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CAS"><!-- 全选 -->
                <el-input size="mini" v-model="msds_data.cas"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('wareHouse.ship.ship2')"><!-- 合同号 -->
                <el-input size="mini" v-model="msds_data.contactno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Formula">
                <el-input size="mini" v-model="msds_data.mf"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Weight">
                <el-input size="mini" v-model="msds_data.mw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Appearance">
                <el-input size="mini" v-model="msds_data.appearance"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Melting">
                <el-input size="mini" v-model="msds_data.mp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Boiling">
                <el-input size="mini" v-model="msds_data.bp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Flash">
                <el-input size="mini" v-model="msds_data.fp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ignition Temperature">
                <el-input size="mini" v-model="msds_data.it"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('wareHouse.ship.ship40')"><!-- 性状 -->
                <el-input size="mini" v-model="msds_data.trait"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('wareHouse.ship.ship41')"><!-- 日期 -->
                <el-input size="mini" v-model="msds_data.created_at"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('wareHouse.ship.ship42')"><!-- 模板 -->
                <el-select
                  v-model="msds_data.type"
                  size="mini"
                  clearable
                  filterable
                >
                  <el-option v-for="i in template_info" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="info" @click="translate(msds_data)" size="mini">{{$t('wareHouse.ship.ship43')}}</el-button><!-- 翻 译 -->
          <el-button @click="close_msds()" size="mini">{{$t('cancel')}}</el-button><!-- 取 消 -->
          <el-button type="primary" @click="add_msds(msds_data)" size="mini">生成</el-button><!-- 生 成 -->
        </span>
      </el-dialog>

      <!-- Print -->
      <el-dialog title="Print" :visible.sync="dialogVisible_d" width="55%">
        <el-form label-width="130px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="ID#:">
                <el-input v-model="agnene_big.id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="PO#:">
                <el-input v-model="agnene_big.po"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Ref:">
                <el-input v-model="agnene_big.ref"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ProductName:">
                <el-input v-model="agnene_big.productName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CAS#:">
                <el-input v-model="agnene_big.cas"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Batch No#:">
                <el-input v-model="agnene_big.batch"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="MW.:">
                <el-input v-model="agnene_big.mw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="MF:">
                <el-input v-model="agnene_big.mf"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Purity:">
                <el-input v-model="agnene_big.purity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Weight:">
                <el-input v-model="agnene_big.weight"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="12">
              <el-form-item label="Store Condtion:">
                <el-input v-model="agnene_big.storeInfo"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="24">
              <el-form-item label="Store Condtion:">
                <el-input v-model="agnene_big.storeInfo"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Remark:">
                <el-input v-model="agnene_big.Remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_d = false">{{$t('cancel')}}</el-button><!-- 取 消 -->
          <!-- <el-button type="primary" @click="print_d">{{$t('wareHouse.ship.ship44')}}</el-button> -->
          <el-button type="primary" @click="print_d()">打印</el-button><!-- 生 成 -->
        </span>
      </el-dialog>

      <!-- 发票信息=生成文件前请先保存数据 -->
      <el-dialog
        :title="$t('wareHouse.ship.ship45')+'(合发ID：'+list_id+')'"
        v-if="dialogVisible_ship_file"
        :visible.sync="dialogVisible_ship_file"
        width="80%"
        @close="dialogVisible_ship_close"
        class='el_form'
      >
        <el-form label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="Sold By">
                <el-select v-model="combine_notice.sold_by" size="mini" placeholder="Please Select">
                  <el-option
                    v-for="(item,index) in sold_info"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Invoice No">
                <el-input v-model="combine_notice.invoice_number" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Manufactured By">
                <el-select
                  v-model="combine_notice.manufactured_by"
                  size="mini"
                  placeholder="Please Select"
                >
                  <el-option
                    v-for="(item,index) in manufactured_info"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Date">
                <el-input v-model="combine_notice.create_date" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Shipped By">
                <el-select
                  v-model="combine_notice.shipped_by"
                  size="mini"
                  placeholder="Please Select"
                >
                  <el-option
                    v-for="(item,index) in shipped_info"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Terms">
                <el-input v-model="combine_notice.terms" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <table
          v-for="(notice,index) in combine_notice.notice"
          border="1"
          bordercolor="#E5E5E5"
          style="width: 100%;margin-top:5px;"
        >
          <tr>
            <th width='70px'>{{$t('wareHouse.ship.ship73')}}</th><!-- 产品ID -->
            <th width='120'>{{$t('wareHouse.ship.ship2')}}</th><!-- 合同号 -->
            <th>PO NO</th>
            <th>CASNo</th>
            <th width='80'>{{$t('wareHouse.ship.ship46')}}</th><!-- 合同数量 -->
            <th width='80'>{{$t('wareHouse.ship.ship47')}}</th><!-- 产品单价 -->
            <th width='80'>{{$t('wareHouse.ship.ship48')}}</th><!-- 产品合计 -->
            <th width='80'>{{$t('wareHouse.ship.ship49')}}</th><!-- 其他费用 -->
            <th width='90'>{{$t('wareHouse.ship.ship33')}}
              <el-tooltip placement="top" v-if="notice.preout.split_package_log_id&&notice.preout.split_package_log_id>0&&notice.preout.split_package_log">
                <div slot="content">从{{notice.preout.split_package_log.out_shelf}}货架中规格为{{notice.preout.split_package_log.packsize}}
                  {{getEnumValue(units,notice.preout.split_package_log.unit_id)}}的拆出
                </div>
                <span style="color:red;cursor: pointer;">(拆)</span>
              </el-tooltip>
            </th><!-- 发货数量 -->
            <th width="100">{{$t('wareHouse.ship.ship50')}}</th><!-- 发票单价 -->
            <th width="110">{{$t('wareHouse.ship.ship51')}}</th><!-- 发票合计 -->
          </tr>
          <tr style="text-align:center;">
            <td>{{notice.prod?notice.prod.id:''}}</td>
            <td>{{notice.contract_detail.contract_number}}</td>
            <td>{{notice.contract_detail.prod_no}}</td>
            <td>{{notice.contract_detail.cas}}</td>
            <td>
              {{notice.contract_detail.quantity}}
              {{getEnumValue(units,notice.contract_detail.quantity_unit)}}
            </td>
            <td>
              {{notice.contract_detail.price}}
              {{getEnumValue(currencys,notice.contract_detail.currency_id)}}
            </td>
            <td>
              {{notice.contract_detail.total_money}}
              {{getEnumValue(currencys,notice.contract_detail.currency_id)}}
            </td>
            <td>
              {{notice.contract_detail.additional_cost}}
              {{getEnumValue(currencys,notice.contract_detail.currency_id)}}
            </td>
            <td>
              <div v-if="notice.preout.type==2">
                {{notice.preout.quantity}}
                {{getEnumValue(units,notice.preout.quantity_unit)}}
              </div>
              <div v-else>
                <span v-if="notice.packs">
                  {{notice.preout.package_nums}}*{{notice.packs.packsize}}{{getEnumValue(units,notice.packs.unit_id)}}<br>
                  ({{notice.preout.quantity}}{{getEnumValue(units,notice.preout.quantity_unit)}})
                </span>
              </div>
            </td>
            <td>
              {{(notice.total_money/notice.preout.quantity).toFixed(2)}}
              {{getEnumValue(currencys,notice.currency_id)}}
            </td>
            <td>
              {{notice.total_money}}
              {{getEnumValue(currencys,notice.currency_id)}}
            </td>
          </tr>
          <tr>
            <td><b>{{$t('wareHouse.ship.ship52')}}:</b></td><!-- 英文名称 -->
            <td colspan="4">{{notice.contract_detail?notice.contract_detail.product_name:''}}</td>
            <td><b>{{$t('wareHouse.ship.ship53')}}:</b></td><!-- 中文名称 -->
            <td colspan="3">{{notice.contract_detail?notice.contract_detail.product_name_cn:''}}</td>
            <td><b>{{$t('wareHouse.ship.ship54')}}:</b></td><!-- 包装数量 -->
            <td>{{notice.preout.package_nums}}</td>
          </tr>
          <tr>
            <td><b>{{$t('wareHouse.ship.ship55')}}:</b></td><!-- 发货备注 -->
            <td colspan="4">{{combine_notice.remark}}</td>
            <td><b>{{$t('wareHouse.ship.ship56')}}:</b></td><!-- 发票备注 -->
            <td colspan="2">{{combine_notice.invoice_remark}}</td>
            <td><b>{{$t('wareHouse.ship.ship57')}}:</b></td><!-- 发货文件备注 -->
            <td colspan="2">{{combine_notice.ship_file_remark}}</td>
          </tr>
          <tr v-if="combine_notice.notice.length-1==index">
            <td colspan="8"></td>
            <td><b>Subtotal:</b></td>
            <td colspan="2">
              <el-input size="mini" v-model="invoice_money_total" disabled style="width:100px"></el-input>
              {{getEnumValue(currencys,notice.currency_id)}}
            </td>
          </tr>
          <tr v-if="combine_notice.notice.length-1==index">
            <td colspan="8"></td>
            <td><b>Shipping & Handling:</b></td>
            <td colspan="2">
              <el-input size="mini" v-model="shipping_handling" style="width:100px" @input="change_()"></el-input>
              {{getEnumValue(currencys,notice.currency_id)}}
            </td>
          </tr>
          <tr v-if="combine_notice.notice.length-1==index">
            <td colspan="8"></td>
            <td><b>Adjustment:</b></td>
            <td colspan="2">
              <el-input size="mini" v-model="adjustment" style="width:100px" @input="change_()"></el-input>
              {{getEnumValue(currencys,notice.currency_id)}}
            </td>
          </tr>
          <tr v-if="combine_notice.notice.length-1==index">
            <td colspan="8"></td>
            <td><b>The total amount of:</b></td>
            <td colspan="2">
              <el-input size="mini" v-model="total_amount" disabled style="width:100px"></el-input>
              {{getEnumValue(currencys,notice.currency_id,)}}
            </td>
          </tr>
          <tr v-if="combine_notice.notice.length-1==index">
            <td><b>Bill To:</b></td>
            <td colspan="4">
              <span v-for="address in combine_notice.ship_notice_address">
                <span v-if="address.type==1"><pre>{{address.address}}</pre></span>
              </span>
            </td>
            <td><b>Ship To:</b></td>
            <td colspan="5">
              <span v-for="address in combine_notice.ship_notice_address">
                <span v-if="address.type==2">
                  <pre>{{address.address}}<br></pre>
                  <pre>{{address.contact_name}}<br></pre>
                  <pre>{{address.mobile}}</pre>
                </span>
              </span>
            </td>
          </tr>
          <tr>
            <td><b>账号:</b></td>
            <td>{{getEnumValue(express_account_type,combine_notice.express_account_type)}}</td>
            <td><b>快递公司:</b> </td>
            <td colspan="2">{{getEnumValue(express_company,combine_notice.express_company_id)}}</td>
            <td><b>快递账号</b></td>
            <td colspan="5">{{combine_notice.express_account}}</td>
          </tr>
        </table>
        <table border="1" bordercolor="#E5E5E5" style="width: 100%;margin-top: 20px;">
          <tr>
            <th>{{$t('wareHouse.ship.ship58')}}</th><!-- 物流公司 -->
            <th>{{$t('wareHouse.ship.ship59')}}</th><!-- 提运单号 -->
            <th>{{$t('wareHouse.ship.ship60')}}</th><!-- 包装种类 -->
            <th width="140">{{$t('wareHouse.ship.ship61')}}</th><!-- 运输鉴定书编号 -->
            <th>{{$t('wareHouse.ship.ship62')}}</th><!-- 签发日期 -->
            <th>{{$t('wareHouse.ship.ship63')}}</th><!-- 目的港 -->
            <th>{{$t('wareHouse.ship.ship64')}}</th><!-- 保费 -->
            <th>{{$t('wareHouse.ship.ship65')}}</th><!-- 运抵国 -->
            <th>{{$t('wareHouse.ship.ship66')}}</th><!-- 总毛重 -->
            <th>{{$t('wareHouse.ship.ship67')}}</th><!-- 总净重 -->
          </tr>
          <tr>
            <td>
              <el-select
                v-model="combine_notice.shipping_document.express_company_id"
                size="mini"
                placeholder="Please Select"
              >
                <el-option
                  v-for="(item,index) in express_company"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input size="mini" v-model="combine_notice.shipping_document.waybill_number"></el-input>
            </td>
            <td>
              <el-select
                v-model="combine_notice.shipping_document.package_type"
                size="mini"
                placeholder="Please Select"
              >
                <el-option
                  v-for="(item,index) in package_types"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </td>
            <td>
              <el-input
                size="mini"
                v-model="combine_notice.shipping_document.transportation_appraisal_number"
              ></el-input>
            </td>
            <td>
              <el-date-picker
                v-model="combine_notice.shipping_document.appraisal_date"
                value-format="yyyy-MM-dd"
                type="date"
                size="mini"
              ></el-date-picker>
            </td>
            <td>
              <el-input size="mini" v-model="combine_notice.shipping_document.dest_port"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="combine_notice.shipping_document.premium"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="combine_notice.shipping_document.arrival_country"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="combine_notice.shipping_document.total_gross_weight"></el-input>
            </td>
            <td>
              <el-input size="mini" v-model="combine_notice.shipping_document.total_net_weight"></el-input>
            </td>
          </tr>
        </table>
        <div class="d2-m">
          <el-button type="primary" size="mini" @click="save_document" :loading="save_fy">{{$t('save')}}</el-button><!-- 保存 -->
          <el-button type="primary" size="mini" @click="doc_done()">{{doc_status==1?$t('wareHouse.ship.ship72'):$t('wareHouse.ship.ship13')}}</el-button><!-- 发货文件已做/发货文件 -->
        </div>
        <div class="d2-m">
          <el-button type="primary" size="mini" @click="hk" :loading="hk_loading">{{$t('wareHouse.ship.ship68')}}</el-button><!-- 香港 -->
          <el-button type="primary" size="mini" @click="mainland" :loading="mainland_loading">{{$t('wareHouse.ship.ship69')}}</el-button><!-- 大陆 -->
        </div>
        <div class="d2-m">
          <el-button v-if="document_file_hk" type="primary" size="mini">
            <a :href="document_file_url_hk" style="color:white">{{$t('wareHouse.ship.ship70')}}</a><!-- 文件(香港) -->
          </el-button>
          <el-button v-if="document_file_mainland" type="primary" size="mini">
            <a :href="document_file_url_mainland" style="color:white">{{$t('wareHouse.ship.ship71')}}</a><!-- 文件(大陆) -->
          </el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <div v-if="lists.total" style="display:flex;align-items: center;justify-content: flex-end;">
      <div style="font-size:14px;padding-top:6px;margin-right:10px;">项目总数:
        <span style="text-decoration:underline;">{{notice_total}}</span>
      </div>
      <el-pagination
        v-if="lists.total"
        :total="lists.total"
        style="text-align: right;"
        background
        :page-sizes="[50, 100]"
        @size-change="handleSizeChange"
        :page-size="Number(lists.per_page)"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total,sizes,prev, pager, next"
      ></el-pagination>
    </div>
  </d2-container>
</template>
<script>
import Big from "@/big/a/big.mjs";
import {
  ship_list,
  Shipping_document_view,
  shipping_document,
  hk,
  mainland,
  packing_file,
  transfer_file,
  packing_list,
  packing,
  transfer,
  msds,
  msds_generate,
  ship_view,
  docdone,
  member_info,
  customs_declaration_import
} from "@/api/warehouse";
import { country_list } from "@/api/user";
import { customer_lists } from "@/api/sale";
import { translate } from "@/api/prod";
import $ from "jquery";
import util from '@/libs/util'
export default {
  name: "Warehouse-ship",
  data() {
    return {
      box:'',
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      user_id:'',
      contract_detail_number_color:'',
      notice_total:'',
      queryList: {
        page: "1",
        per_page:50,
        contract_detail_number: "",
        cas: "",
        batchno: "",
        packing_status: "",
        notice_status: 1,
        notice_start_time: "",
        notice_end_time: "",
        customer_id: "",
        transfer_start_date: "",
        transfer_end_date: "",
        transfer_ship: "",
        combine_id: "",
        waybill_status: "",
        value: "",
        doc_status:'',
        waybill_number:'',
        warehouse_id:'',
        if_small_label_print:'',
        if_large_label_print:'',
        has_waybill_number:''
      },
      total_amount:'',
      save_fy:false,
      filename:'',
      currentPage: 1,
      lists: [],
      units: [],
      Trancondition:[],
      delivery_type: [],
      warehouse: [],
      doc_status:'',
      doc_statuses: {},
      preout_type_info: {},
      currencys: [],
      waybill_status_info: {},
      transfer_ship_info: {},
      packing_status_info: {},
      notice_status_info: {},
      storage_condition: [],
      supply_list: [],
      express_account_type:[],
      checked_all: false,
      dialogVisible_msds: false,
      dialogVisible_d: false,
      dialogVisible_ship_file: false,
      dialogVisible_print_all:false,
      dialogVisible_make:false,
      dialogDeclaration:false,
      label_list:[],
      agnene_big: {
        id:'',
        po: "",
        ref: "",
        productName: "",
        cas: "",
        batch: "",
        mw: "",
        mf: "",
        purity: "",
        weight: "",
        storeInfo: "",
        Remark: ""
      },
      declarationForm:{
        customs_declaration_number:'',
        customs_declaration_date:'',
        destination:'',
        ship_company:'南京艾康医药信息咨询有限公司',
        ship_notice_ids:[]
      },
      supplyloading: false,
      combine_notice: {shipping_document:{}},
      sold_info: {},
      manufactured_info: {},
      shipped_info: {},
      express_company: [],
      package_types: [],
      ChemicalAppearance:[],
      shipping_document_id: "",
      express_company_id: "",
      waybill_number: "",
      package_type: 1,
      transportation_appraisal_number: "",
      appraisal_date: "",
      dest_port: "",
      premium: "",
      arrival_country: "",
      packing_quantity: "",
      total_gross_weight: "",
      total_net_weight: "",
      ids: [],
      file: false,
      file_url: "",
      tranfer_file: false,
      tranfer_file_url: "",
      invoice_money_total: "",
      document_file_hk: false,
      document_file_url_hk: "",
      document_file_mainland: false,
      document_file_url_mainland: "",
      msds_data: {
        name: "",
        prodno: "",
        cas: "",
        contactno: "",
        mf: "",
        mw: "",
        appearance: "",
        mp: "",
        bp: "",
        fp: "",
        it: "",
        trait: "",
        created_at: "",
        type: 1
      },
      enums:{},
      template_info: {},
      template_type: "",
      list_id: "",
      shipping_handling: '',
      adjustment: '',
      Sales:[],
      label_print_info:[],
      country:[],
      packing_file_loading: false,
      package_loading: false,
      transfer_file_loading: false,
      hk_loading: false,
      mainland_loading: false,
      loading_declaration:false,
      loading_search:false,
    };
  },
  watch: {
    $route(to, from) {
      if (to.name === "Warehouse-ship") {
        if(util.cookies.get('ship_scroll')){
          this.$refs.a.$children[0].$el.firstElementChild.scrollTop = util.cookies.get('ship_scroll')
        }
      }
    }
  },
  created() {
    this.fetchData();
    this.user_id = util.cookies.get("user_id");
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.search()
      }
    }
  },
  mounted() {
    this.box = this.$refs.a.$children[0].$el.firstElementChild
    this.box.addEventListener('scroll', this.handleScroll, true)
  },
  // computed: {
  //   total_amount: function() {
  //     return Number(new Big(this.invoice_money_total)
  //       .plus(this.shipping_handling)
  //       .plus(this.adjustment));
  //   }
  // },
  methods: {
    handleScroll() {
      var hei = this.$refs.a.$children[0].$el.firstElementChild.scrollTop
      util.cookies.set('ship_scroll',hei)
    },
    handleSizeChange (val) {
        this.queryList.per_page = val
        this.fetchData()
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }){
      if (columnIndex === 4) {
          if (rowIndex === 0) {
            return {
              rowspan: 100,
              colspan: 1
            };
          }else if(rowIndex === 1){
            return {
              rowspan: 1,
              colspan: 0
            };
          } else {
            return {
              rowspan: 1,
              colspan: 0
            };
          }
        }
    },
    // 主观性、动态性、不确定性、双向性、可预测性
    doc_done(id){
      var ids = ''
      id?ids = id:ids = this.list_id
      docdone(ids).then(res=>{
        if (res && res.code == 0) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.fetchData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error'
          })
        }
      })
    },
    translate(item){
      // var a = /^[\u4e00-\u9fa5]+$/
      var a = /[\u4E00-\u9FA5]/i
      for(let i in item){
        if(a.test(item[i])){
          translate("zh", "en", item[i]).then(res => {
              item[i] = res.data.result.result;
              this.$set(item, i, res.data.result.result);
          });
        }
      }
    },
    dialogVisible_ship_close() {
      this.document_file_hk = false;
      this.document_file_mainland = false;
    },
    fetchData() {
      ship_list(this.queryList).then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.notice_total = 0
        res.data.data.forEach((items, index) => {
          items.checked = false;
          this.notice_total = Number(this.notice_total) + Number(items.notice.length)

          if(items.logistic.length>0){
            var arr = []
            items.logistic.forEach(i=>{
              arr.push(this.getEnumValue(res.enum.express_company,i.express_company_id))
            })
            items.notice.forEach(j=>{
              j.express_company = arr
            })
          }
        });

        this.lists = res.data;
        this.ids = []
        this.checked_all = false
        this.enums = res.enum
        this.doc_statuses = res.enum.doc_statuses
        this.units = res.enum.units;
        this.delivery_type = this.GEnums.DeliveryType;
        this.warehouse = this.GEnums.Warehouse
        this.preout_type_info = res.enum.preout_type_info;
        this.waybill_status_info = res.enum.waybill_status_info;
        this.transfer_ship_info = res.enum.transfer_ship_info;
        this.packing_status_info = res.enum.packing_status_info;
        this.notice_status_info = res.enum.notice_status_info;
        this.storage_condition = res.enum.storage_condition;
        this.label_print_info = res.enum.label_print_info;
      });
      this.Trancondition = this.GEnums.Trancondition;
      this.ChemicalAppearance = this.GEnums.ChemicalAppearance;
      this.Sales = this.GEnums.Sales
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
            this.supply_list = res.data;
              this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    Declaration_start(item){
      this.declarationForm={
        customs_declaration_number:'',
        customs_declaration_date:'',
        destination:'',
        ship_company:'南京艾康医药信息咨询有限公司',
        ship_notice_ids:[]
      }
      item.notice.forEach(i=>{
        this.declarationForm.ship_notice_ids.push(i.id)
      })
      this.dialogDeclaration = true
      // country_list().then(res => {
      //   this.country = res.data;
      //   this.dialogDeclaration = true
      // });
    },
    declaration_make(){
      this.loading_declaration = true
      customs_declaration_import(this.declarationForm).then(res=>{
        if(res && res.code == 0){
          this.$message({
            message: 'success',
            type: "success"
          });
          this.dialogDeclaration = true
          this.loading_declaration = false
          this.fetchData()
        }else{
          this.$message({
            message: res.msg,
            type: "error"
          });
          this.loading_declaration = false
        }
      }).catch(err=>{this.loading_declaration = false})
    },
    transfer(id,transfer_ship) {
      let obj = {
        id: id,
        transfer_ship:transfer_ship==1?2:1
      };
      this.$confirm(transfer_ship==1?'是否中转':'是否直发', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          transfer(obj, this);
        }).catch(() => {
                  
        });
    },
    add_msds(item) {
      if (item.type == 1) {
        item.type = "kd";
      } else if (item.type == 2) {
        item.type = "sh";
      }else if(item.type==3){
        item.type = 'aaron'
      }
      msds_generate(item, this);
    },
    close_msds() {
      this.dialogVisible_msds = false;
    },
    Msds(item) {
      let obj = {
        prod_id: item.prod_id,
        shipping_notice_id: item.id
      };
      msds(obj)
        .then(res => {
          if (res && res.code == 0) {
            (this.msds_data = {
              name: res.data.notice.contract_detail?res.data.notice.contract_detail.product_name:res.data.prod_info.name,
              prodno: res.data.prod_info.prodno,
              cas: res.data.prod_info.cas,
              contactno: res.data.contractnumber,
              mf: res.data.prod_info.mf,
              mw: res.data.prod_info.mw,
              appearance: res.data.appearance,
              mp: res.data.prod_info.property?res.data.prod_info.property.mp:'',
              bp: res.data.prod_info.property?res.data.prod_info.property.bp:'',
              fp: res.data.prod_info.property?res.data.prod_info.property.flashpoint:'',
              it: res.data.prod_info.property?res.data.prod_info.property.uncode:"",
              trait: res.data.prod_info.property?res.data.prod_info.property.specificity:'',
              created_at: res.data.createdate,
              type: 1
            }),
              (this.template_info = res.enum.template_info);
            this.dialogVisible_msds = true;
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {});
    },
    pack() {
      if (this.checked_all) {
        let obj = this.queryList;
        obj.select = "all";
        packing(obj, this);
      } else {
        let obj = {
          ids: this.ids
        };
        packing(obj, this);
      }
    },
    packing() {
      if (this.ids.length > 0) {
        if (this.checked_all) {
          let obj = this.queryList;
          obj.select = "all";
          packing_file(obj, this);
        } else {
          let obj = {
            ids: this.ids
          };
          packing_file(obj, this);
        }
      } else {
        this.$message({
          message: "Please select an item",
          type: "error"
        });
        this.file = false;
      }
    },
    hk() {
      let obj = {
        id: this.combine_notice.id,
        filename:this.filename
      };
      this.document_file_hk = false;
      this.hk_loading = true;
      hk(obj, this)
        .then(res => {
          if (res && res.code == 0) {
            this.document_file_url_hk = res.data;
            // setTimeout(res=>{
            //     this.hk_loading=false
            //     this.$message({
            //         message: 'success',
            //         type: 'success'
            //     });
            //     this.document_file_hk=true
            // },5000)
            this.$message({
              message: "success",
              type: "success"
            });
            this.document_file_hk = true;
            this.hk_loading = false;
          } else {
            this.hk_loading = false;
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {
          this.hk_loading = false;
        });
    },
    mainland() {
      let obj = {
        id: this.combine_notice.id,
        filename:this.filename
      };
      this.document_file_mainland = false;
      this.mainland_loading = true;
      mainland(obj, this)
        .then(res => {
          if (res && res.code === 0) {
            this.document_file_url_mainland = res.data;
            // setTimeout(res=>{
            //     this.mainland_loading=false
            //     this.$message({
            //         message: 'success',
            //         type: 'success'
            //     });
            //     this.document_file_mainland=true
            // },5000)
            this.mainland_loading = false;
            this.$message({
              message: "success",
              type: "success"
            });
            this.document_file_mainland = true;
          } else {
            this.mainland_loading = false;
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {
          this.mainland_loading = false;
        });
    },
    package(id) {
      if (this.ids.length > 0) {
        if (this.checked_all) {
          let obj = this.queryList;
          obj.select = "all";
          this.$router.push({
            path: "/packing-list",
            name: "Warehouse-packing_list",
            query: {
              all: JSON.stringify(obj),
              ids:'',
              shipping_notice_id:''
            }
          });
        } else {
          this.$router.push({
            path: "/packing-list",
            name: "Warehouse-packing_list",
            query: {
              ids: JSON.stringify(this.ids),
              all:'',
              shipping_notice_id:''
            }
          });
        }
      } else {
        this.$message({
          message: "Please select an item",
          type: "error"
        });
      }
    },
    package_kh(id){
      if (this.ids.length > 0) {
        if (this.checked_all) {
          let obj = this.queryList;
          obj.select = "all";
          this.$router.push({
            path: "/packing-list_kh",
            name: "Warehouse-packing_list_kh",
            query: {
              all: JSON.stringify(obj),
              ids:'',
              shipping_notice_id:''
            }
          });
        } else {
          this.$router.push({
            path: "/packing-list_kh",
            name: "Warehouse-packing_list_kh",
            query: {
              ids: JSON.stringify(this.ids),
              all:'',
              shipping_notice_id:''
            }
          });
        }
      } else {
        this.$message({
          message: "Please select an item",
          type: "error"
        });
      }
    },
    package_one(id) {
      this.$router.push({
        path: "/packing-list",
        name: "Warehouse-packing_list",
        query: {
          shipping_notice_id: id,
          all:'',
          ids:''
        }
      });
    },
    transfer_file() {
      if (this.ids.length > 0) {
        if (this.checked_all) {
          let obj = this.queryList;
          obj.select = "all";
          transfer_file(obj, this);
        } else {
          let obj = {
            ids: this.ids
          };
          transfer_file(obj, this);
        }
      } else {
        this.$message({
          message: "Please select an item",
          type: "error"
        });
        this.tranfer_file = false;
      }
    },
    search() {
      this.loading_search=true
      this.queryList.page = 1;
      this.currentPage=1
      this.contract_detail_number_color = this.queryList.contract_detail_number
      this.fetchData();
    },
    save_document() {
      let obj = {
        combine_shipping_notice_id: this.combine_notice.id,
        sold_by: this.combine_notice.sold_by,
        manufactured_by: this.combine_notice.manufactured_by,
        shipped_by: this.combine_notice.shipped_by,
        invoice_number: this.combine_notice.invoice_number,
        create_date: this.combine_notice.create_date,
        terms: this.combine_notice.terms,
        shipping_document_id: this.combine_notice.shipping_document
          ? this.combine_notice.shipping_document.id
          : 0,
        express_company_id: this.combine_notice.shipping_document
          .express_company_id,
        waybill_number: this.combine_notice.shipping_document.waybill_number,
        package_type: this.combine_notice.shipping_document.package_type,
        transportation_appraisal_number: this.combine_notice.shipping_document
          .transportation_appraisal_number,
        appraisal_date: this.combine_notice.shipping_document.appraisal_date,
        dest_port: this.combine_notice.shipping_document.dest_port,
        premium: this.combine_notice.shipping_document.premium,
        arrival_country: this.combine_notice.shipping_document.arrival_country,
        packing_quantity: this.combine_notice.shipping_document
          .packing_quantity,
        total_gross_weight: this.combine_notice.shipping_document
          .total_gross_weight,
        total_net_weight: this.combine_notice.shipping_document
          .total_net_weight,
        total_amount: this.total_amount,
        shipping_handling: this.shipping_handling,
        adjustment: this.adjustment,
        currency_id: this.combine_notice.notice[0].currency_id
      };
      this.hk_loading = false;
      this.mainland_loading = false;
      this.save_fy = true
      shipping_document(obj, this.list_id, this);
    },
    more_big(item,i,a){
      if(item.customer_name=='南京一览生物'){
        this.more_yl_d(i,a)
      }else if(item.customer_name=='上海凯为化学科技有限公司'){
        this.more_sk_d(i,a)
      }else if(item.customer_name=='1pluschem LLC'){
        this.more_pl_d(i,a)
      }else if(item.customer_name=='AA BLOCKS LLC'){
        this.more_f(i,a)
      }else if(item.customer_name=='辽宁库克生物技术有限公司'){
        this.more_ll_d(i,a)
      }else if(item.customer_name=='南京库克生物技术有限公司'){
        this.more_kk_d(i,a)
      }else if(item.customer_name=='梯希爱(上海)化成工业发展有限公司'){
        this.more_d(i,a)
      }else if(item.customer_name=='Aaron Chemicals LLC.'){
        this.more_ACL_d(i,a)
      }else if(item.customer_name=='A2B Chem LLC'){
        this.more_A2B_d(i,a)
      }else if(item.customer_name=='Yu Shing Tang Co., LTD'){
        this.more_d(i,a)
      }else{
        if(i.contract_detail.contract_number.indexOf('CH')!=-1){
          this.more_yl_d(i,a)
        }
        if(i.contract_detail.contract_number.indexOf('AK')!=-1){
          this.more_h(i,a)
        }
        if(i.contract_detail.contract_number.indexOf('AGN')!=-1){
          this.more_d(i,a,item.customer_id)
        }
        if(i.contract_detail.contract_number.indexOf('AR')!=-1){
          this.more_ACL_d(i,a)
        }
        if(i.corp_id==1001555){
          this.more_sk_d(i,a)
        }
      }
    },
    more_small(item,i,a){
      if(item.customer_name=='南京一览生物'){
        this.more_yl_s(i,a)
      }else if(item.customer_name=='上海凯为化学科技有限公司'){
        this.more_sk_s(i,a)
      }else if(item.customer_name=='1pluschem LLC'){
        this.more_pl_s(i,a)
      }else if(item.customer_name=='AA BLOCKS LLC'){
        this.more_g(i,a)
      }else if(item.customer_name=='辽宁库克生物技术有限公司'){
        this.more_ll_s(i,a)
      }else if(item.customer_name=='南京库克生物技术有限公司'){
        this.more_kk_s(i,a)
      }else if(item.customer_name=='梯希爱(上海)化成工业发展有限公司'){
        this.more_e(i,a)
      }else if(item.customer_name=='Aaron Chemicals LLC.'){
        this.more_ACL_s(i,a)
      }else if(item.customer_name=='A2B Chem LLC'){
        this.more_A2B_s(i,a)
      }else if(item.customer_name=='Yu Shing Tang Co., LTD'){
        this.more_e(i,a)
      }else{
        if(i.contract_detail.contract_number.indexOf('CH')!=-1){
          this.more_yl_s(i,a)
        }
        if(i.contract_detail.contract_number.indexOf('AK')!=-1){
          this.more_i(i,a)
        }
        if(i.contract_detail.contract_number.indexOf('AGN')!=-1){
          this.more_e(i,a,item.customer_id)
        }
        if(i.contract_detail.contract_number.indexOf('AR')!=-1){
          this.more_ACL_s(i,a)
        }
        if(i.corp_id==1001555){
          this.more_sk_s(i,a)
        }
      }
    },
    more_ACL_d(item,a){
      this.agnene_big = {
        configID: 17,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_ll_d(item,a){
      this.agnene_big = {
        configID: 13,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_kk_d(item,a){
      this.agnene_big = {
        configID: 15,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_yl_d(item,a){
      this.agnene_big = {
        configID: 7,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_yl_s(item,a){
      this.agnene_big = {
        configID: 8,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_A2B_d(item,a){
      this.agnene_big = {
        configID: 19,
        id:item.contract_detail.prod_no,
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_sk_d(item,a){
      this.agnene_big = {
        configID: 9,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo:'',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_A2B_s(item,a){
      this.agnene_big = {
        configID: 20,
        id:item.contract_detail.prod_no,
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_ACL_s(item,a){
      this.agnene_big = {
        configID: 18,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_ll_s(item,a){
      this.agnene_big = {
        configID: 14,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_kk_s(item,a){
      this.agnene_big = {
        configID: 16,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_sk_s(item,a){
      this.agnene_big = {
        configID: 10,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_pl_d(item,a){
      this.agnene_big = {
        configID: 11,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_pl_s(item,a){
      this.agnene_big = {
        configID: 12,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_d(item,a,id) {
      this.agnene_big = {
        configID: 1,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.contract_detail.contract_number.indexOf('AGN')!=-1&&id){
        member_info(id).then(res=>{
          if(res.data.label_po==2){
            this.agnene_big.po = item.saler_contract?item.saler_contract.customer_po:''
          }
        })
      }
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    print_d(){
        // $.ajax({
        //     url: "http://127.0.0.1:8080/mac/codePrint.jsp",
        //     method: "post",
        //     data: this.agnene_big,
        //     success: function(response) {},
        //     error: function() {}
        // });
        this.label_list = []
        this.label_list.push(this.agnene_big)
        $.ajax({
            url: "http://127.0.0.1:8080/batchp.jsp",
            method: "post",
            data: {label:JSON.stringify(this.label_list)},
            success: function(response) {},
            error: function() {},
        });
    },
    more_e(item,a,id) {
      this.agnene_big = {
        configID: 3,
        id:'',
        po:'',
        ref: item.contract_detail.contract_number,
        codeNumber:item.inventory.batchno,
        productName: item.contract_detail.product_name,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        storage_cond:'',
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.contract_detail.contract_number.indexOf('AGN')!=-1&&id){
        member_info(id).then(res=>{
          if(res.data.label_po==2){
            this.agnene_big.po = item.saler_contract?item.saler_contract.customer_po:''
          }
        })
      }
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_f(item,a) {
      this.agnene_big = {
        configID: 5,
        id:item.contract_detail.prod_no,
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        codeNumber:item.inventory.batchno,
        purity: item.contract_detail.purity,
        weight:
          item.preout.quantity +
          this.units.filter(i => {
            return i.id == item.preout.quantity_unit;
          })[0].name,
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_g(item,a) {
      this.agnene_big = {
        configID: 6,
        id:item.contract_detail.prod_no,
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        cas: item.prod.cas,
        codeNumber:item.inventory.batchno,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:
          item.preout.quantity +
          this.units.filter(i => {
            return i.id == item.preout.quantity_unit;
          })[0].name,
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_h(item,a) {
      this.agnene_big = {
        configID: 2,
        id:item.prod.productid2,
        po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        cas: item.prod.cas,
        codeNumber:item.inventory.batchno,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    more_i(item,a) {
      this.agnene_big = {
        configID: 4,
        id:item.prod.productid2,
          po: '',
          ref: item.contract_detail.contract_number,
          productName: item.contract_detail.product_name,
          cas: item.prod.cas,
          codeNumber:item.inventory.batchno,
          batch: item.inventory.batchno,
          mw: item.prod.mw,
          mf: item.prod.mf,
          purity: item.contract_detail.purity,
          weight:item.weight,
          // weight: formatWeight(item.preout.quantity+this.units.filter(i => {return i.id == item.preout.quantity_unit;})[0].name),
          storeInfo: '',
          notice_id:item.id,
          user_id:this.user_id,
          express_company:item.express_company?item.express_company:[],
          ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      // if(item.inventory.storagecondition_id){
      //   if(this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0]){
      //     this.agnene_big.storeInfo = this.storage_condition.filter(i=>{return i.id==item.inventory.storagecondition_id})[0].name_en
      //   }else{
      //     this.agnene_big.storeInfo = "2-8℃"
      //   }
      // }else{
      //   this.agnene_big.storeInfo = "2-8℃"
      // }
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
        item.inventory.storage_cond.forEach((i,index)=>{
          if(i==1||i==2||i==4){
            aa++
            if(aa!=1){
              this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
            }else{
              this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
            }
          }
        })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(!a){
        this.dialogVisible_d = true;
      }
    },
    ship_file(item) {
      this.invoice_money_total = 0;
      this.list_id = item.id;
      this.doc_status = item.doc_status
      this.mainland_loading = false;
      this.hk_loading = false;
      Shipping_document_view(item.id).then(res => {
        res.data.combine_notice.notice.forEach((items, index) => {
          this.invoice_money_total =  Number(new Big(this.invoice_money_total).plus(items.total_money))
        });
        if (res.data.combine_notice.shipping_document == null) {
          res.data.combine_notice.shipping_document = {
            express_company_id: "",
            waybill_number: "",
            package_type: 1,
            transportation_appraisal_number: "",
            appraisal_date: "",
            dest_port: "",
            premium: "",
            arrival_country: "",
            packing_quantity: "",
            total_gross_weight: "",
            total_net_weight: ""
          };
        } else {
          // res.data.combine_notice.shipping_document.express_company_id=
        }
        // console.log(
        //   res.data.combine_notice.shipping_document.express_company_id
        // );
        // console.log(res.data.combine_notice);
        this.shipping_handling = res.data.combine_notice.shipping_handling
        this.adjustment = res.data.combine_notice.adjustment
        this.total_amount = Number(new Big(this.shipping_handling).plus(this.adjustment).plus(this.invoice_money_total)) 
        this.combine_notice = res.data.combine_notice;
        this.filename = res.data.contract_detail_numbers
        this.sold_info = res.enum.sold_info;
        this.manufactured_info = res.enum.manufactured_info;
        this.shipped_info = res.enum.shipped_info;
        this.express_company = res.enum.express_company;
        this.package_types = res.enum.package_type;
        this.currencys = res.enum.currencys;
        this.express_account_type = res.enum.express_account_type
        this.dialogVisible_ship_file = true;
      });
    },
    change_(){
      this.total_amount = Number(new Big(this.shipping_handling?this.shipping_handling:0).plus(this.adjustment?this.adjustment:0).plus(this.invoice_money_total))
    },
    make_tag(list,item){
      this.agnene_big = {
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        weight:item.weight
      };
      this.dialogVisible_make = true
    },
    print_make(){
      $.ajax({
          url: "http://127.0.0.1:8080/mac/newPrint.jsp",
          method: "post",
          data: {label:JSON.stringify(this.agnene_big)},
          success: function(response) {},
          error: function() {},
      });
    },
    more_d_all(item) {
      this.agnene_big = {
        configID: 1,
        id:'',
        po:item.saler_contract?item.saler_contract.customer_po:'',
        ref: item.contract_detail.contract_number,
        productName: item.contract_detail.product_name,
        codeNumber:item.inventory.batchno,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
    },
    more_e_all(item) {
      this.agnene_big = {
        configID: 3,
        id:'',
        po:item.saler_contract?item.saler_contract.customer_po:'',
        ref: item.contract_detail.contract_number,
        codeNumber:item.inventory.batchno,
        productName: item.contract_detail.product_name,
        cas: item.prod.cas,
        batch: item.inventory.batchno,
        mw: item.prod.mw,
        mf: item.prod.mf,
        purity: item.contract_detail.purity,
        weight:item.weight,
        storeInfo: '',
        notice_id:item.id,
        user_id:this.user_id,
        storage_cond:'',
        express_company:item.express_company?item.express_company:[],
        ghs:item.prod.property.ghs?item.prod.property.ghs:[]
      };
      if(item.inventory.storage_cond&&item.inventory.storage_cond.length>0){
        let aa = 0
          item.inventory.storage_cond.forEach((i,index)=>{
            if(i==1||i==2||i==4){
              aa++
              if(aa!=1){
                this.agnene_big.storeInfo += ','+this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }else{
                this.agnene_big.storeInfo += this.storage_condition.filter(j=>{return j.id==i})[0].name_en
              }
            }
          })
      }else{
        this.agnene_big.storeInfo = "2-8℃"
      }
      if(item.contract_detail.contract_number.indexOf('AK')!=-1||item.contract_detail.contract_number.indexOf('SYG')!=-1||item.contract_detail.contract_number.indexOf('PT')!=-1||item.contract_detail.contract_number.indexOf('CH')!=-1){
        this.agnene_big.id=item.prod.productid2
      }
      if(item.contract_detail.contract_number.indexOf('JMC')!=-1||item.contract_detail.contract_number.indexOf('AGN')!=-1||item.contract_detail.contract_number.indexOf('AR')!=-1||item.contract_detail.contract_number.indexOf('KW')!=-1){
        this.agnene_big.id=item.contract_detail.prod_no
      }
    },
    print_item(list,item){
      this.label_list = []
      if(Number(item.preout.base_quantity)>=50){
        this.more_big(list,item)
      }else if(Number(item.preout.base_quantity)<=50){
        this.more_small(list,item)
      }
    },
    print_all(){
      this.label_list = []
      this.lists.data.forEach((items, index) => {
        if(items.checked){
          member_info(items.customer_id).then(res=>{
            if(res.data.label_po==2){
              items.notice.forEach(i=>{
                if(i.preout&&Number(i.preout.base_quantity)>=100){
                  if(i.contract_detail.contract_number.indexOf('AGN')!=-1&&items.customer_name!='Yu Shing Tang Co., LTD'&&items.customer_name!='梯希爱(上海)化成工业发展有限公司'){
                    
                    this.more_d_all(i)
                    this.label_list.push(this.agnene_big)
                    
                  }else{
                    
                    this.more_big(items,i,1)
                    this.label_list.push(this.agnene_big)
                    
                  }
                }else if(i.preout&&Number(i.preout.base_quantity)<100){
                  if(i.contract_detail.contract_number.indexOf('AGN')!=-1&&items.customer_name!='Yu Shing Tang Co., LTD'&&items.customer_name!='梯希爱(上海)化成工业发展有限公司'){
                    
                    this.more_e_all(i)
                    this.label_list.push(this.agnene_big)
                    
                  }else{
                    this.more_small(items,i,1)
                    this.label_list.push(this.agnene_big)
                    
                  }
                }else{
                  alert('error')
                }
              })
            }else{
              items.notice.forEach(i=>{
                if(i.preout&&Number(i.preout.base_quantity)>=100){
                    this.more_big(items,i,1)
                    this.label_list.push(this.agnene_big)
                }else if(i.preout&&Number(i.preout.base_quantity)<100){
                    this.more_small(items,i,1)
                    this.label_list.push(this.agnene_big)
                }else{
                  alert('error')
                }
              })
            }
          })
        }
      });
      console.log(this.label_list)
      setTimeout(() => {
      this.print_d_all()
              }, 1000);
      
      // this.dialogVisible_print_all = true
    },
    print_d_all(){
        $.ajax({
            url: "http://127.0.0.1:8080/batchp.jsp",
            method: "post",
            data: {label:JSON.stringify(this.label_list)},
            success: function(response) {},
            error: function() {},
        });
    },
    // print_all_big(){
    //   this.label_list = []
    //   this.lists.data.forEach((items, index) => {
    //     if(items.checked){
    //       items.notice.forEach(i=>{
    //         this.more_big(items,i,1)
    //         this.label_list.push(this.agnene_big)
    //       })
    //     }
    //   });
    //   this.print_d_all()
    // },
    // print_all_small(){
    //   this.label_list = []
    //   this.lists.data.forEach((items, index) => {
    //     if(items.checked){
    //       items.notice.forEach(i=>{
    //         this.more_small(items,i,1)
    //         this.label_list.push(this.agnene_big)
    //       })
    //     }
    //   });
    //   this.print_d_all()
    // },
    select_all() {
      this.ids = [];
      this.checked_all = !this.checked_all;
      this.lists.data.forEach((items, index) => {
        if (this.checked_all) {
          items.checked = true;
          this.ids.push(items.id);
        } else {
          this.ids = [];
          items.checked = false;
        }
      });
    },
    select_one(checked, id) {
      // let num = 0;
      this.ids = [];
      this.lists.data.forEach((items, index) => {
        if (items.checked) {
          this.ids.push(items.id);
          // num++;
        }
      });
      // if (num == this.lists.data.length) {
      //   this.checked_all=true
      // } else {
      //   this.checked_all = false;
      // }
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    detail(id) {
      ship_view(id)
        .then(res => {
          if (res.code == 0) {
            this.$router.push({
              path: "/Warehouse/ship_detail",
              name: "Warehouse-ship_detail",
              query: {
                id: id,
                res:JSON.stringify(res)
              }
            });
          } else {
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        })
        .catch(rr => {
          this.$message({
            message: res.msg,
            type: "error"
          });
        });
    }
  }
};
function formatWeight(weight) {
    var num;
    if(weight&&weight.match(RegExp(/kg/))){
        num = weight.replace(/kg/, "");
        if(num < 1){
            return (num * 1000) + 'g';
        }
    }else if(weight.match(RegExp(/mg/))){
        return weight;
    }else if(weight.match(RegExp(/g/))){
        num = weight.replace(/g/, "");
        if(num < 1){
            return (num * 1000) + 'mg';
        }
    }
    return weight;
}
</script>

<style scoped>
</style>
