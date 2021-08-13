<style lang="scss" scoped type="text/scss">
.heard {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  align-items: center;
  .el-input {
    margin: 0px 5px;
    margin-top: 5px;
    width: 150px;
  }
}
table {
  // width: 100%;
  border-collapse: collapse;
  td {
    padding: 0px 5px;
    line-height: 30px;
  }
}
.his_table{
  margin-bottom: 0px;
  border-top: 0px;
  td{
    border-top: 0px;
    line-height: 20px;
    font-size: 13px;
  }
}
.el-dialog{
  table{
    width: 100%;
    td{
      line-height: 20px;
    }
  }
}
.form {
  /deep/.el-input__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-radius: 0;
    padding: 0px 5px;
  }
}
/deep/.el-table {
  td {
    padding: 0px;
    padding-bottom: 20px;
  }
  .cell{
    padding:0px 5px;
  }
  table {
    td {
      padding: 0px 5px;
    }
  }
}
.table_item{
  td{
    line-height: 25px;
    div{
      height: 40px;
      line-height: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      padding: 0px 5px;
    }
  }
}
.template_table{
  td{
    border-top:none;
  }
}
.el-checkbox{
  margin-right: 0px;
  margin-left: 10px;
  /deep/.el-checkbox__label{
    padding-left: 5px;
  }
}
.test_form{
  .el-form-item{
    margin-bottom: 5px;
  }
}
.notice_size{
  /deep/.el-input__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-radius: 0;
    padding: 0px 5px;
  }
}
.packe_form{
  /deep/.el-input__inner {
    border: 0px;
    padding: 0px;
  }
}
.dialog{
        /deep/.el-dialog__body{
            padding-top: 0px;
        }
    }
</style>
<style lang="scss" type="text/scss">
.data-thead {
  background: #dae0e5;
}
.data-td-supplier {
  color: #95c5ed;
}
.data-td-instore {
  color: red;
  font-weight: bold;
}
.data-testitem {
  color: red;
  font-weight: bold;
}

.data-testitem1 {
  color: green;
  font-weight: bold;
}
</style>
<template>
  <d2-container >
    <!-- 页眉 -->
    <div class="heard">
      <el-input clearable placeholder="合同号" v-model="queryList.purchaseorder_no" size="mini"></el-input>
      <el-input clearable placeholder="CAS" v-model="queryList.cas" size="mini"></el-input>
      <el-input clearable placeholder="产品名称" v-model="queryList.name" size="mini"></el-input>
      <el-input clearable placeholder="供应商批号" v-model="queryList.supplier_batchno" size="mini"></el-input>
      <el-input clearable placeholder="批号" v-model="queryList.batchno" size="mini"></el-input>
      <el-input clearable placeholder="快递单号" v-model="queryList.express_number" size="mini"></el-input>
      <el-select
        placeholder="仓库"
        clearable
        filterable
        v-model="queryList.warehouse_id"
        size="mini"
        style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option
          v-for="item in enum_warehouse"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        class="date_picker"
        v-model="queryList.started_at"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        type="date"
        placeholder="入库开始"
        size="mini"
        style="width: 125px;"
        clearable
      ></el-date-picker>
      <el-date-picker
        class="date_picker"
        v-model="queryList.ended_at"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        type="date"
        placeholder="入库结束"
        size="mini"
        style="width: 125px;"
        clearable
      ></el-date-picker>
      <el-date-picker
        class="date_picker"
        v-model="queryList.expired_at"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        type="date"
        placeholder="过期日期"
        size="mini"
        style="width: 125px;"
        clearable
      ></el-date-picker>
      <el-select
        placeholder="是否有货"
        clearable
        v-model="queryList.stock_status"
        size="mini"
        style="width: 90px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option
          v-for="item in enums.stock_status"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="非样品/样品/退货"
        clearable
        v-model="queryList.is_sample"
        size="mini"
        style="width: 140px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option
          v-for="item in enums.is_sample"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="采购员"
        clearable
        v-model="queryList.purchase_id"
        size="mini"
        style="width: 90px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option v-for="item in purchaseList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select
        v-model="queryList.order_result"
        clearable
        filterable
        size="mini"
        style="width: 100px;margin: 0px 5px; margin-top: 5px;"
        :placeholder="$t('quality.queryList.result')"
      >
        <el-option v-for="i in enums.order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
      </el-select>
      <el-select
        v-model="queryList.flow_statuses"
        clearable
        filterable
        size="mini"
        style="width: 120px;margin: 0px 5px; margin-top: 5px;"
        placeholder="状态"
      >
        <el-option v-for="i in flow_statuses" :label="i.name" :value="i.id" :key="i.id"></el-option>
      </el-select>
      <el-select
        placeholder="产品提示"
        clearable
        v-model="queryList.prodremind"
        size="mini"
        style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option
          v-for="item in Prodremind"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="是否危化品"
        clearable
        v-model="queryList.is_danger_inland"
        size="mini"
        style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option
          v-for="item in enums.danger_inland_status"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-select
        placeholder="产品报价"
        clearable
        v-model="queryList.priced"
        size="mini"
        style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option v-for="item in priced" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select
        v-model="queryList.supplier_id"
        placeholder="供应商"
        size="mini"
        filterable
        remote
        reserve-keyword
        :remote-method="supplyMethod"
        :loading="supplyloading"
        style="width: 220px;margin: 0px 5px; margin-top: 5px;"
        clearable
      >
        <el-option v-for="item in supply_list" :label="item.name" :key="item.id" :value="item.id"></el-option>
      </el-select>
      <el-input
        clearable
        placeholder="货架"
        v-model="queryList.shelf"
        size="mini"
        style="width: 120px"
      ></el-input>
      <div >
        <el-input
                v-model="queryList.stock_noticed_percent"
                style="width: 150px;"
                size="mini"
                clearable
        >
          <el-select v-model="queryList.stock_noticed_percent_op" clearable slot="prepend" size="mini" style="width: 60px;" placeholder>
                <el-option
                        v-for="i in quality_indexs"
                        :key="i.name"
                        :label="i.name"
                        :value="i.name">
                </el-option>
          </el-select>
        </el-input>
      </div>
      <el-select
              placeholder="是否空气敏感"
              clearable
              v-model="queryList.air_sensitive"
              size="mini"
              style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
      <el-select
              placeholder="是否水汽敏感"
              clearable
              v-model="queryList.water_sensitive"
              size="mini"
              style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
      <el-select
              placeholder="是否分装"
              clearable
              v-model="queryList.pre_packing"
              size="mini"
              style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option label="是" :value="1"></el-option>
        <el-option label="否" :value="0"></el-option>
      </el-select>
      <el-select
              placeholder="存储条件"
              clearable
              v-model="queryList.storage_cond"
              size="mini"
              style="width: 150px;margin: 0px 5px; margin-top: 5px;"
      >
        <el-option
                v-for="(item,key,index) in GEnums.StorageCondition"
                :key="key"
                :label="item.name"
                :value="key">
        </el-option>
      </el-select>
      <div style="margin: 6px 5px 0 5px;display: inline-block;">
        <el-checkbox v-model="queryList.if_need_check" :true-label="1" :false-label="0">免检</el-checkbox>
      </div>
      <el-button type="primary" size="mini" :loading="loading_search" @click="Search()">搜索</el-button>
      <el-button type="primary" size="mini" @click="batchonDialog = true">导出重复批次</el-button>
      <el-checkbox v-model="show_number" :true-label="1" :false-label="0">是否显示0库存</el-checkbox>
      <a :href="prod_batchno_url" ref="prod_batchno_url" hidden></a>
    </div>
    <!-- 页面 -->
    <el-table
      @click.native="hide"
      :data="list.data"
      border
      style="width: 100%;padding:0px;margin:0px;font-size: 13px;"
      highlight-current-row
      fit
      :default-expand-all="true"
    >
      <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <table
            border="1"
            bordercolor="#E5E5E5"
            style="margin:0px -6px;border-right:0px;border-top:none;"
            class="template_table"
            v-if="user_type!=101&&user_type!=102"
          >
            <tr v-for="item_i in props.row.shelves" :key="item_i.id" v-if='item_i.quantity!=0||item_i.preout_stock!=0||show_number'>
              <td width="201">散装</td>
              <td width="200">规格：/</td>
              <td
                width="200"
              >库存：{{item_i.quantity}}{{getEnumValue(units,item_i.quantity_unit_id?item_i.quantity_unit_id:'')}}</td>
              <td
                width="220"
              >预占：{{item_i.preout_stock}}{{getEnumValue(units,item_i.base_quantity_unit_id?item_i.base_quantity_unit_id:'')}}</td>
              <td width="200">货架：{{item_i.shelf}}</td>
              <td width='150'></td>
              <td width='250'></td>
              <td style="border-right:0px;border:none;">
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left:5px;"
                  @click="packeClick(item_i,props.row)"
                >分装</el-button>
                <el-button type="primary" size="mini" @click="item_profitClick(props.row.id,item_i.id,2,3)">盘盈</el-button>
                <el-button type="primary" size="mini" @click="item_profitLossClick(props.row.id,item_i.id,2,4)">盘亏</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  v-if="permissions.indexOf(534)>-1"
                  @click="item_allotClick(props.row.id,item_i.id,2)"
                >调拨</el-button>
                <el-button  v-show="w==250" size="mini" type="info" @click="print(props.row,item_i)" style="margin-left:5px;">打印</el-button>
              </td>
            </tr>
            <tr v-for="item_i in props.row.package_shelves" :key="item_i.id" v-if='item_i.stock!=0||item_i.preout_stock!=0||show_number'>
              <td width="201">包装</td>
              <td width="200">规格：{{item_i.packsize}}{{getEnumValue(units,item_i.packsize_unit_id?item_i.packsize_unit_id:'')}}</td>
              <td
                width="200"
              >库存：{{item_i.stock}}</td>
              <td
                width="220"
              >预占：{{item_i.preout_stock}}</td>
              <td width="200">货架：{{item_i.shelf}}</td>
              <td width='150'></td>
              <td width='250'></td>
              <td style="border-right:0px;border:none;">
                <el-button
                  type="primary"
                  size="mini"
                  style="margin-left:5px;"
                  @click="splitClick(props.row,item_i.inventorypackage_id,item_i.id)"
                >拆分</el-button>
                <el-button type="primary" size="mini" @click="item_profitClick(props.row.id,item_i.id,1,3)">盘盈</el-button>
                <el-button type="primary" size="mini" @click="item_profitLossClick(props.row.id,item_i.id,1,4)">盘亏</el-button>
                <el-button
                  type="primary"
                  size="mini"
                  v-if="permissions.indexOf(534)>-1"
                  @click="item_allotClick(props.row.id,item_i.id,1)"
                >调拨</el-button>
                <el-button  v-show="w==250" size="mini" type="info" @click="print(props.row,item_i,1)" style="margin-left:5px;">打印</el-button>
              </td>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="入库信息" width="200">
        <template slot-scope="scope">
          <div>批次:{{scope.row.batchno}}</div>
          <div>供应商批次：{{scope.row.supplier_batchno}}</div>
          <div>时间:{{scope.row.created_at}}</div>
          <div>人员:{{getEnumValue(Users,scope.row.creator_id)}}</div>
          <div>单号:{{scope.row.express_number}}</div>
        </template>
      </el-table-column>
      <el-table-column label="库存来源" width="200">
        <template slot-scope="scope">
          <div style="color:#409EFF;" v-if="user_type!=102&&roles_ids.indexOf(42)==-1">供应商:{{scope.row.supplier?scope.row.supplier.name:''}}</div>
          <div v-else>********</div>
          <div>订单号:{{scope.row.purchaseorder_no}}</div>
          <div>
            <span style="margin-right:5px;">采购人:{{scope.row.purchaser?scope.row.purchaser.name:''}}</span>
            <span>销售人:{{getEnumValue(salelist,scope.row.sales_order?scope.row.sales_order.saler_contract.sale_id:'')}}</span>
          </div>
          <div>
            用途类型:
            <span v-for="(i,key,index) in type" :key="index">
              <span v-if="key == scope.row.type">{{i}}</span>
              <span v-else></span>
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" width="200">
        <template slot-scope="scope">
          <div>
            {{scope.row.cas}}
            <span>
              <el-tooltip placement="top" v-if="scope.row.prod&&scope.row.prod.is_danger_inland">
                  <div slot="content">
                      <span>{{getEnumValue(enums.danger_inland_status,scope.row.prod.is_danger_inland)}}</span>
                  </div>
                  <i class="el-icon-bell" style="font-weight: bold;margin-left: 5px;color: red;"></i>
              </el-tooltip>
            </span>
          </div>
          <div>{{scope.row.name_cn}}</div>
          <div>{{scope.row.name}}</div>
          <div>纯度:{{scope.row.purity}}</div>
        </template>
      </el-table-column>
      <el-table-column label="库存信息" width="220">
        <template slot-scope="scope">
          <div>仓库:{{getEnumValue(enum_warehouse,scope.row.warehouse_id)}}</div>
          <div v-if="scope.row.order">
            <span>价格:{{getEnumValue(Currency,scope.row.order.currency_id,'icon')}}</span>
            <span>{{scope.row.order.price}}/</span>
            <span>{{getEnumValue(units,scope.row.order.quantity_unit,'name_en')}}</span>
            <span style="margin-left:5px;" v-if="scope.row.order">{{getEnumValue(InvoiceInfo_All,scope.row.order.invoice_type_id)}}</span>
          </div>
          <div v-else>
            <span>价格:{{getEnumValue(Currency,scope.row.priceunit_id,'icon')}}</span>
            <span>{{scope.row.price}}/</span>
            <span>{{getEnumValue(units,scope.row.unit_id,'name_en')}}</span>
            <span style="margin-left:5px;" v-if="scope.row.order">{{getEnumValue(InvoiceInfo_All,scope.row.order.invoice_type_id)}}</span>
          </div>
          <div>
            <span>结算价: </span>
            <span v-if="scope.row.order">
              <span v-if="scope.row.order.jiesuan_price&&!scope.row.show" @click.stop="scope.row.show=true"  style="color:#F56C6C;cursor: pointer">
                ￥{{scope.row.order.jiesuan_price}}/<span v-if="scope.row.order.quantity_unit==1||scope.row.order.quantity_unit==3||scope.row.order.quantity_unit==4||scope.row.order.quantity_unit==5">g</span><span v-if="scope.row.order.quantity_unit==2||scope.row.order.quantity_unit==6">ml</span>
              </span>
              <span v-if="!scope.row.order.jiesuan_price&&!scope.row.show" style="font-style: italic;cursor:pointer;color:#F56C6C;font-szie:10px" @click.stop="scope.row.show=true" >点击设置</span> 
              <span v-if="scope.row.show"  @click.stop="scope.row.show=true">
                <el-input  size="mini" style="width: 60px;margin-right: 5px;" v-model="scope.row.order.jiesuan_price"></el-input>
                <el-button type="primary" size="mini" @click.stop="save_jiesuan(scope.row)">保存</el-button>
              </span>
            </span>
          </div>
          <div>
            入库:
            <span
              style="color:#F56C6C;"
            >{{scope.row.original_stock}}{{getEnumValue(units,scope.row.original_stock_unit_id)}}</span>
          </div>
          <div>
            库存:
            <span
              style="color:#F56C6C;"
            >{{scope.row.stock}}{{getEnumValue(units,scope.row.base_unit_id)}}</span>
          </div>
          <div>预占:{{scope.row.preout_stock}}{{getEnumValue(units,scope.row.base_unit_id)}}</div>
          <div>入库备注:<span style="color:#F56C6C;">{{scope.row.note}}</span></div>
        </template>
      </el-table-column>
      <el-table-column label="检测安全" width="200">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            v-if="scope.row.spectrograms&&scope.row.spectrograms.length>0"
            width="360"
            trigger="click">
            <table border bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <td><b>名称</b></td>
                <td width='160'><b>操作</b></td>
              </tr>
              <tr v-for="item in scope.row.spectrograms" :key="item.id">
                <td>{{item.name}}</td>
                <td>
                  <el-button type="primary" size="mini" @click="preview(item.url)">预览</el-button>
                  <el-button v-if="item.name.indexOf('pdf')>-1" type="success" size="mini" @click="downloadPDF(item.url,item.name)">下载</el-button>
                  <el-button v-else type="success" size="mini" @click="doExport(item)">下载</el-button>
                  <el-button type="danger" size="mini" @click="cancel(item)" v-if="permissions.indexOf(618)>-1">删除</el-button>
                </td>
              </tr>
            </table>
            <a :href="prod_export_url" ref="prod_export_url" hidden></a>
            <div slot="reference" style="cursor: pointer;color:#409EFF;">谱图</div>
          </el-popover>
          <!-- <div>储存条件:{{getEnumValue(StorageCondition,scope.row.storagecondition_id)}}</div> -->
          <div>储存条件:
            <span v-if="scope.row.storage_cond" v-for="(i,index) in scope.row.storage_cond">
              {{getEnumValue(StorageCondition,i)}}
              <span v-if="index!=(scope.row.storage_cond.length-1)">,</span>
            </span>
          </div>
          <div>内部指标:{{scope.row.sales_order?scope.row.sales_order.purity:''}}</div>
          <div>
            <span>检测结果:</span>
            <el-popover
              v-if="scope.row.checkresult_more_info"
              placement="top-start"
              width="300"
              trigger="hover"
            >
              <span v-html="scope.row.checkresult_more_info"></span>
              <span slot="reference" v-html="scope.row.checkresult_info"></span>
            </el-popover>
            <span v-else v-html="scope.row.checkresult_info"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="外观毛重" width="150">
        <template slot-scope="scope">
          <div>包装:{{getEnumValue(virtualunits,scope.row.in_virtualunit_id)}}</div>
          <div>外观:{{getEnumValue(ChemicalAppearance,scope.row.chemprodappearance_id)?getEnumValue(ChemicalAppearance,scope.row.chemprodappearance_id):scope.row.characterinfo}}</div>
          <div>毛重:{{scope.row.netweightinfo}}</div>
        </template>
      </el-table-column>
      <el-table-column label="库存包装明细" width="250">
        <template slot-scope="scope">
          <el-row v-if="scope.row.shelves.length>0">
            <el-col>散装</el-col>
            <el-col>
              <div v-for="(item_i,index) in scope.row.shelves" :key="index">
                <span><b>库存:</b>{{item_i.quantity}}{{getEnumValue(units,item_i.quantity_unit_id)}}</span>,
                <span><b>包装数量:</b>{{item_i.packinginfo}}</span>,
                <span><b>货架:</b>{{item_i.shelf}}</span>;
              </div>
            </el-col>
          </el-row>
          <el-row v-if="scope.row.package_shelves.length>0">
            <el-col>包装</el-col>
            <el-col>
              <div v-for="(item_i,index) in scope.row.package_shelves" :key="index">
                <span><b>规格:</b> {{item_i.packsize}}{{getEnumValue(units,item_i.packsize_unit_id)}}</span>,
                <span><b>库存:</b>{{item_i.stock}}</span>,
                <span><b>货架:</b>{{item_i.shelf}}</span>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right"  :min-width="w">
        <template slot="header">
          <span v-show="w==250">操作</span> <d2-icon @click.native="change_w" name="bars"/>
        </template>
        <template slot-scope="scope">
          <div v-show="w==250">
            <div>
              <!-- <el-button type="primary" size="mini" @click="profitClick(scope.row.id,3)">盘盈</el-button>
              <el-button type="primary" size="mini" @click="profitLossClick(scope.row.id,4)">盘亏</el-button> -->
            </div>
            <div style="margin-top:10px;">
              <!-- <el-button
                type="primary"
                size="mini"
                v-if="permissions.indexOf(534)>-1"
                @click="allotClick(scope.row.id)"
              >调拨</el-button> -->
              <el-button type="primary" size="mini" @click="testClick(scope.row)" v-if="permissions.indexOf(620)>-1">检测</el-button>
              <el-button
                v-if="scope.row.priced==1"
                :type="scope.row.priced_profit_warned?'danger':'success'"
                size="mini"
                @click="spec_list(scope.row.prod_id)"
              >报价</el-button>
              <el-button type="primary" size="mini" v-else @click="spec_list(scope.row.prod_id)">报价</el-button>
              <el-button
                type="primary"
                size="mini"
                @click="revise(scope.row)"
                v-if="permissions.indexOf(602)>-1"
              >外观</el-button>
            </div>
            <div style="margin:5px 0px;" v-if="scope.row.inventory_logs.length>0">
              <el-button type="primary" size="mini" @click="logs(scope.row.inventory_logs)">日志</el-button>
              <el-button type="primary" size="mini" @click="preout_logs_(scope.row.id)">预占日志</el-button>
            </div>
            <!-- <div v-if="scope.row.stock!=0&&scope.row.checkresult_info.indexOf('不通过')==-1&&scope.row.checkresult_info.indexOf('入库未检')==-1">
              <el-button type="primary" size="mini" @click="Add_ak(scope.row)">COA艾康</el-button>
              <el-button type="primary" size="mini" @click="Add_aq(scope.row)">COA安勤</el-button>
            </div> -->
            <div>
              <el-button type="primary" size="mini" v-if="scope.row.supplier_id!=1001555" @click="Add_ak(scope.row)">COA艾康</el-button>
              <el-button type="primary" size="mini" style="margin-left:5px;" v-if="scope.row.supplier_id!=1001555" @click="Add_aq(scope.row)">COA安勤</el-button>
              <el-button type="primary" size="mini" style="margin-left:5px;" v-if="scope.row.supplier_id!=1001555" @click="Add_YLan(scope.row)">COA一览</el-button>
              <el-button type="primary" size="mini" v-if="scope.row.supplier_id==1001555" @click="Add_AIVI(scope.row)">COA凯为</el-button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="预览"
      :visible.sync="viewVisible"
      :width="width_pdf"
      :top="top_pdf"
      @close="close_pdf()"
    >
      <div class="pdf" v-show="fileType === 'pdf'">
        <div style="display:flex;justify-content:space-between ;">
          <div>
            <el-button type="primary" size="mini" @click="change1">上一页</el-button>
            <el-button type="primary" size="mini" @click="change2">下一页</el-button>
          </div>
          <div>
            <el-button
              size="mini"
              :class="{select:idx==0}"
              @touchstart="idx=0"
              @touchend="idx=-1"
              @click="scaleD"
              icon="el-icon-zoom-in"
            ></el-button>
            <el-button
              size="mini"
              :class="{select:idx==1}"
              @touchstart="idx=1"
              @touchend="idx=-1"
              @click="scaleX"
              icon="el-icon-zoom-out"
            ></el-button>
            <el-button type="primary" size="mini" @click="scaleY">全屏</el-button>
          </div>
        </div>
        <br />
        <pdf
          ref="pdf"
          :src="pdfsrc"
          :page="i"
          @num-pages="pageCount = $event"
          @page-loaded="i = $event"
          style="width:100%;"
        ></pdf>
      </div>
    </el-dialog>

    <!-- 艾康新增 -->
        <el-dialog  :visible.sync="viewVisible_add_Ak" width="50%" @close="close_Add()" class="dialog">
            <addAk @close_Add='close_Add()' :coa_cas='coa_cas' :coa_batchno='coa_batchno' ref="addAk"></addAk>
        </el-dialog>
        <!-- 安勤新增 -->
        <el-dialog  :visible.sync="viewVisible_add_Aq" width="50%" @close="close_Add()" class="dialog">
            <addAq @close_Add='close_Add()' :coa_cas='coa_cas' :coa_batchno='coa_batchno' ref="addAq"></addAq>
        </el-dialog>
        <!-- 安勤新增 -->
        <el-dialog :visible.sync="viewVisible_add_AIVI" width="50%" @close="close_Add()" class="dialog">
            <addAIVI @close_Add='close_Add()' :coa_cas='coa_cas' :coa_batchno='coa_batchno' ref="addAq"></addAIVI>
        </el-dialog>
        <!-- 安勤新增 -->
        <el-dialog :visible.sync="viewVisible_add_YLan" width="50%" @close="close_Add()" class="dialog">
            <addYLan @close_Add='close_Add()' :coa_cas='coa_cas' :coa_batchno='coa_batchno' ref="addYLan"></addYLan>
        </el-dialog>

    <!-- 艾康新增 -->
    <!-- <el-dialog  :visible.sync="viewVisible_add_Ak" width="50%" @close="close_Add()" class="dialog">
        <addAk @close_Add='close_Add()' :coa_cas='coa_cas' :coa_list='coa_list' ref="addAk"></addAk>
    </el-dialog> -->
    <!-- 安勤新增 -->
    <!-- <el-dialog  :visible.sync="viewVisible_add_Aq" width="50%" @close="close_Add()" class="dialog">
        <addAq @close_Add='close_Add()' :coa_cas='coa_cas' :coa_list='coa_list' ref="addAq"></addAq>
    </el-dialog> -->

    <!-- 分装 -->
    <el-dialog :visible.sync="dialogPack" width="40%">
      <el-form label-position="right">
        <el-form-item>
          <table border="1" bordercolor="#E5E5E5" class="packe_form">
              <tr>
                  <td>货架</td>
                  <td>大小</td>
                  <td>单位</td>
                  <td>数量</td>
                  <td>操作</td>
              </tr>
              <tr v-for="(item,index) in addpackeage.packages" :key="index">
                  <td>
                      <el-autocomplete
                        v-model="item.shelf"
                        :fetch-suggestions="querySearch_packe"
                        placeholder="请输入内容"
                        size="mini"
                        @select="handleSelect_packe"
                        @focus="package_id(index)"
                        clearable
                      >
                        <template slot-scope="{ item }">
                            <div>{{ item }}</div>
                        </template>
                      </el-autocomplete>
                  </td>
                  <td>
                      <el-input size="mini" v-model="item.packsize"></el-input>
                  </td>
                  <td>
                      <el-select size="mini" style="width:100%;" v-model="item.unit_id">
                          <el-option
                            v-for="item in units"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                      </el-select>
                  </td>
                  <td>
                      <el-input size="mini" v-model="item.stock"></el-input>
                  </td>
                  <td>
                      <el-button
                        type="primary"
                        size="mini"
                        @click="del_packe(index)"
                        icon="el-icon-minus"
                      ></el-button>
                  </td>
              </tr>
          </table>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" @click="add_packe()" icon="el-icon-plus" size="mini"></el-button>
          <el-button type="primary" size="mini" @click="save_packe()" :loading="packe_loading">保存</el-button>
          <el-button size="mini" @click="dialogPack=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 拆分 -->
    <el-dialog :visible.sync="splitDialog" width="70%">
      <el-form label-position="right" label-width="90px" class="profit_form">
        <el-form-item label="信息：">
          <table border bordercolor="#E5E5E5">
              <tr>
                  <td>批次</td>
                  <td>仓库</td>
                  <td>CAS</td>
                  <td>名称</td>
              </tr>
              <tr>
                  <td>{{splitData.inventory.batchno?splitData.inventory.batchno:''}}</td>
                  <td>
                      {{getEnumValue(enum_warehouse,splitData.inventory.warehouse_id)}}
                  </td>
                  <td>{{splitData.inventory.prod?splitData.inventory.prod.cas:''}}</td>
                  <td>
                      <div>{{splitData.inventory.name_cn}}</div>
                      <div>{{splitData.inventory.name}}</div>
                  </td>
              </tr>
          </table>
        </el-form-item>
        <el-form-item label="记录：">
          <div>
            <table border bordercolor="#E5E5E5">
                <tr>
                    <td>批次</td>
                    <td>仓库</td>
                    <td>CAS</td>
                    <td>名称</td>
                    <td>规格</td>
                    <td>拆分数量</td>
                    <td>入货架</td>
                    <td>出货架</td>
                    <td>操作日期</td>
                </tr>
                <tr v-if="item.inventory!=null" v-for="item in split_package_log.data" :key="item.id">
                    <td>{{item.inventory?item.inventory.batchno:''}}</td>
                    <td>
                      {{getEnumValue(enum_warehouse,item.warehouse_id)}}
                    </td>
                    <td>{{item.inventory.cas}}</td>
                    <td>
                        <div>{{item.inventory.name_cn}}</div>
                        <div>{{item.inventory.name}}</div>
                    </td>
                    <td>
                        <div
                                v-if="item.package"
                        >{{item.package.packsize}}{{getEnumValue(units,item.package.unit_id)}}
                        </div>
                    </td>
                    <td>{{item.package_nums}}</td>
                    <td>{{item.in_shelf}}</td>
                    <td>{{item.out_shelf}}</td>
                    <td>{{item.updated_at?item.updated_at:item.created_at}}</td>
                </tr>
            </table>
            <el-pagination
                    style="text-align: right;"
                    @current-change="history_handleCurrentChange_split"
                    :current-page.sync="history_currentPage_split"
                    layout="prev, pager, next"
                    :total="split_package_log.total"
            ></el-pagination>
          </div>
        </el-form-item>
        <div>
          <el-row>
              <el-col :span="8">
                  <el-form-item
                          label="规格："
                  >{{splitData.packsize}}{{getEnumValue(units,splitData.packsize_unit_id)}}
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="数量：">{{splitData.stock}}</el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="货架：">{{splitData.shelf}}</el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="8">
                  <el-form-item label="拆分数量：">
                      <el-input size="small" v-model="splitList.package_nums"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="8">
                  <el-form-item label="货架：">
                      <el-autocomplete
                              v-model="splitList.in_shelf"
                              :fetch-suggestions="querySearch_split_shelf"
                              placeholder="请输入内容"
                              size="small"
                              @select="handleSelect_split_shelf"
                              clearable
                      >
                          <template slot-scope="{ item }">
                              <div>{{ item }}</div>
                          </template>
                      </el-autocomplete>
                  </el-form-item>
              </el-col>
          </el-row>
        </div>
        <el-form-item style="text-align:right;">
            <el-button type="primary" size="mini" @click="save_split()">确定</el-button>
            <el-button size="mini" @click="splitDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 调拨 -->
    <el-dialog :visible.sync="allot_Dialog" width="70%" @close="close_allot()">
      <el-form label-position="right" label-width="90px">
        <el-form-item label="信息：">
          <table border bordercolor="#E5E5E5">
            <tr>
              <td width='100'>批次</td>
              <td width='100'>仓库</td>
              <td width='100'>CAS</td>
              <td>名称</td>
              <td width='90'>入库</td>
            </tr>
            <tr>
              <td>{{profit_data.batchno}}</td>
              <td>{{getEnumValue(enum_warehouse,profit_data.warehouse_id)}}</td>
              <td>{{profit_data.cas}}</td>
              <td>
                <span>{{profit_data.name_cn}}</span>
                <br />
                <span>{{profit_data.name}}</span>
              </td>
              <td>
                {{profit_data.original_stock}}
                {{getEnumValue(units,profit_data.original_stock_unit_id)}}
              </td>
            </tr>
          </table>
        </el-form-item>
        <!-- <el-form-item label="库存：">
          <table border bordercolor="#E5E5E5">
            <tr>
              <td>库存</td>
              <td>预占</td>
              <td>货架</td>
            </tr>
            <tr v-for="item in selec_shelf">
              <td>{{item.quantity}}{{getEnumValue(units,item.quantity_unit_id)}}</td>
              <td>{{item.preout_stock}}{{getEnumValue(units,item.base_quantity_unit_id)}}</td>
              <td>{{item.shelf}}</td>
            </tr>
          </table>
        </el-form-item> -->
        <el-form-item label="记录：">
          <table border bordercolor="#E5E5E5" v-if="selects">
            <tr>
              <td>批次</td>
              <td>仓库</td>
              <td>货架</td>
              <td>数量</td>
              <td>总量</td>
              <td>调拨仓库</td>
              <td>调拨货架</td>
              <td width="80px">状态</td>
            </tr>
            <tr v-for="item in history_list.data" :key="item.id" v-if="item.shelf==selects">
              <td>{{item.inventory.batchno}}</td>
              <td>
                <span>{{getEnumValue(enum_warehouse,item.warehouse_id)}}</span>
              </td>
              <td>{{item.shelf}}</td>
              <td>{{item.package_nums}}</td>
              <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}</td>
              <td>
                <span>{{getEnumValue(enum_warehouse,item.warehouse_id_to)}}</span>
              </td>
              <td>{{item.shelf_to}}</td>
              <td>{{getEnumValue(status_info,item.status)}}</td>
            </tr>
          </table>
          <table border bordercolor="#E5E5E5" v-else>
            <tr>
              <td>批次</td>
              <td>仓库</td>
              <td>货架</td>
              <td>数量</td>
              <td>总量</td>
              <td>调拨仓库</td>
              <td>调拨货架</td>
              <td width="80px">状态</td>
            </tr>
            <tr v-for="item in history_list.data" :key="item.id">
              <td>{{item.inventory.batchno}}</td>
              <td>
                <span>{{getEnumValue(enum_warehouse,item.warehouse_id)}}</span>
              </td>
              <td>{{item.shelf}}</td>
              <td>{{item.package_nums}}</td>
              <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}</td>
              <td>
                <span>{{getEnumValue(enum_warehouse,item.warehouse_id_to)}}</span>
              </td>
              <td>{{item.shelf_to}}</td>
              <td>{{getEnumValue(status_info,item.status)}}</td>
            </tr>
          </table>
          <el-pagination
            v-if="history_list.total"
            style="text-align: right;"
            @current-change="history_handleCurrentChange_allot"
            :page-size="history_list.per_page"
            :current-page.sync="history_currentPage"
            layout="prev, pager, next"
            :total="history_list.total"
          ></el-pagination>
        </el-form-item>
        <!-- <el-form-item label="货架：">
          <el-select
            placeholder="请选择"
            clearable
            filterable
            v-model="selects"
            size="mini"
            style="width: 150px;"
            @change="profit_shelf()"
          >
            <el-option
              v-for="item in profit_data.shelves"
              :key="item.shelf"
              :label="item.shelf"
              :value="item.shelf"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="调拨仓库：">
              <el-select size="small" v-model="addAllot.warehouse_id_to" @change="warehouse_change()" clearable>
                <el-option
                  v-for="item in enum_warehouse"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="调拨货架：">
              <el-autocomplete
                v-model="addAllot.shelf_to"
                :fetch-suggestions="querySearch_shelf"
                placeholder="请输入内容"
                size="mini"
                @select="handleSelect_shelf"
                clearable
              >
                <template slot-scope="{ item }">
                  <div>{{ item }}</div>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="shelf_model.package_type==2">
          <el-col :span="8">
            <el-form-item label="散装库存：">
              <!-- <span
                v-if="selec_shelf.length>0&&selects"
              >{{selec_shelf[0].quantity}}{{getEnumValue(units,selec_shelf[0].quantity_unit_id)}}</span>
              <span v-else>{{profit_data.stock}}{{getEnumValue(units,profit_data.unit_id)}}</span> -->
              <span>
                {{allot_standards.quantity}}
                {{getEnumValue(units,allot_standards.quantity_unit_id)}}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货架：">
              <!-- <span v-if="selec_shelf.length>0&&selects">{{selec_shelf[0].shelf}}</span>
              <span v-else></span> -->
              <span>{{allot_standards.shelf}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else>
            <el-col :span="8">
                <el-form-item label="规格：">
                    {{allot_standards.packsize}}
                    {{getEnumValue(units,allot_standards.packsize_unit_id)}}
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="数量：">{{allot_standards.stock}}</el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="货架：">{{allot_standards.shelf}}</el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="调拨：">
          <el-input size="small" v-model="addAllot.quantity" style="width:150px;"></el-input>
          <span v-if="shelf_model.package_type==2">{{getEnumValue(units,allot_standards.quantity_unit_id)}}</span>
          <span v-else>
              *{{allot_standards.packsize}}
              {{getEnumValue(units,allot_standards.packsize_unit_id)}}
          </span>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" @click="add_allot()" :loading='loading_allot'>确定</el-button>
          <el-button size="mini" @click="close_allot()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 盘盈 -->
    <el-dialog :visible.sync="profitDialog" width="60%" title="盘盈" @close="close_profit()">
      <el-form label-position="right" label-width="90px">
        <el-form-item label="信息：">
          <table border bordercolor="#E5E5E5">
            <tr>
              <td width='100'>批次</td>
              <td width='100'>仓库</td>
              <td width='100'>CAS</td>
              <td>名称</td>
              <td width='90'>入库</td>
            </tr>
            <tr>
              <td>{{profit_data.batchno}}</td>
              <td>{{getEnumValue(enum_warehouse,profit_data.warehouse_id)}}</td>
              <td>{{profit_data.cas}}</td>
              <td>
                <span>{{profit_data.name_cn}}</span>
                <br />
                <span>{{profit_data.name}}</span>
              </td>
              <td>
                {{profit_data_a.original_stock}}
                {{getEnumValue(units,profit_data_a.original_stock_unit_id)}}
              </td>
            </tr>
          </table>
        </el-form-item>
        <!-- <el-form-item label="库存：">
          <table border bordercolor="#E5E5E5">
            <tr>
              <td>库存</td>
              <td>预占</td>
              <td>货架</td>
            </tr>
            <tr v-for="item in selec_shelf">
              <td>{{item.quantity}}{{getEnumValue(units,item.quantity_unit_id)}}</td>
              <td>{{item.preout_stock}}{{getEnumValue(units,item.base_quantity_unit_id)}}</td>
              <td>{{item.shelf}}</td>
            </tr>
          </table>
        </el-form-item> -->
        <el-form-item label="记录：">
          <table border bordercolor="#E5E5E5" v-if="selects">
            <tr>
              <td>批次</td>
              <td>仓库</td>
              <td>货架</td>
              <td>CAS</td>
              <td>数量</td>
              <td>总量</td>
              <td>备注</td>
              <td width="60px">状态</td>
            </tr>
            <tr v-for="item in history_list.data" :key="item.id" v-if="item.shelf==selects">
              <td>{{item.inventory.batchno}}</td>
              <td>{{getEnumValue(enum_warehouse,item.warehouse_id)}}</td>
              <td>{{item.shelf}}</td>
              <td>{{item.prod?item.prod.cas:''}}</td>
              <td>{{item.package_nums}}</td>
              <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}</td>
              <td>{{item.reason}}</td>
              <td>{{getEnumValue(status_info,item.status)}}</td>
            </tr>
          </table>
          <table border bordercolor="#E5E5E5" v-else>
            <tr>
              <td>批次</td>
              <td>仓库</td>
              <td>货架</td>
              <td>CAS</td>
              <td>数量</td>
              <td>总量</td>
              <td>备注</td>
              <td width="60px">状态</td>
            </tr>
            <tr v-for="item in history_list.data" :key="item.id">
              <td>{{item.inventory.batchno}}</td>
              <td>{{getEnumValue(enum_warehouse,item.warehouse_id)}}</td>
              <td>{{item.shelf}}</td>
              <td>{{item.prod?item.prod.cas:''}}</td>
              <td>{{item.package_nums}}</td>
              <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}</td>
              <td>{{item.reason}}</td>
              <td>{{getEnumValue(status_info,item.status)}}</td>
            </tr>
          </table>
          <el-pagination
            v-if="history_list.total"
            style="text-align: right;"
            @current-change="history_handleCurrentChange"
            :page-size="history_list.per_page"
            :current-page.sync="history_currentPage"
            layout="prev, pager, next"
            :total="history_list.total"
          ></el-pagination>
        </el-form-item>
        <!-- <el-form-item label="货架：">
          <el-select
            placeholder="请选择"
            clearable
            filterable
            v-model="selects"
            size="mini"
            style="width: 150px;"
            @change="profit_shelf()"
          >
            <el-option
              v-for="item in profit_data.shelves"
              :key="item.id"
              :label="item.shelf"
              :value="item.shelf"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-row v-if="shelf_model.package_type==2">
          <el-col :span="8">
            <el-form-item label="散装库存：">
              <!-- <span
                v-if="selec_shelf.length>0&&selects"
              >{{selec_shelf[0].quantity}}{{getEnumValue(units,selec_shelf[0].quantity_unit_id)}}</span>
              <span v-else>{{profit_data.stock}}{{getEnumValue(units,profit_data.base_unit_id)}}</span> -->
              <span>{{shelf_model.quantity}}{{getEnumValue(units,shelf_model.quantity_unit_id)}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货架：">
              <!-- <span v-if="selec_shelf.length>0&&selects">{{selec_shelf[0].shelf}}</span>
              <span v-else></span> -->
              <span>{{shelf_model.shelf}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else-if="shelf_model.package_type==1">
          <el-col :span="8">
            <el-form-item label="规格：">
              <span>{{shelf_model.packsize}}{{getEnumValue(units,shelf_model.packsize_unit_id)}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量：">
              <span>{{shelf_model.stock}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货架：">
              <span>{{shelf_model.shelf}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="盘盈：">
          <el-input size="small" v-model="addProfit.quantity" style="width:150px;"></el-input>
          <span v-if="shelf_model.package_type==2">{{getEnumValue(units,shelf_model.quantity_unit_id)}}</span>
          <span v-else>
              *{{shelf_model.packsize}}
              {{getEnumValue(units,shelf_model.packsize_unit_id)}}
          </span>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input size="small" type="textarea" v-model="addProfit.reason" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" @click="add_profit()" :loading='loading_profit'>确定</el-button>
          <el-button size="mini" @click="close_profit()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 盘亏 -->
    <el-dialog :visible.sync="profitLoss_Dialog" width="60%" title="盘亏" @close="close_profitLoss()">
      <el-form label-position="right" label-width="90px">
        <el-form-item label="信息：">
          <table border bordercolor="#E5E5E5">
            <tr>
              <td width='100'>批次</td>
              <td width='100'>仓库</td>
              <td width='100'>CAS</td>
              <td>名称</td>
              <td width='90'>入库</td>
            </tr>
            <tr>
              <td>{{profit_data.batchno}}</td>
              <td>{{getEnumValue(enum_warehouse,profit_data.warehouse_id)}}</td>
              <td>{{profit_data.cas}}</td>
              <td>
                <span>{{profit_data.name_cn}}</span>
                <br />
                <span>{{profit_data.name}}</span>
              </td>
              <td>
                {{profit_data_a.original_stock}}
                {{getEnumValue(units,profit_data_a.original_stock_unit_id)}}
              </td>
            </tr>
          </table>
        </el-form-item>
        <!-- <el-form-item label="库存：">
          <table border bordercolor="#E5E5E5">
            <tr>
              <td>库存</td>
              <td>预占</td>
              <td>货架</td>
            </tr>
            <tr v-for="item in selec_shelf">
              <td>{{item.quantity}}{{getEnumValue(units,item.quantity_unit_id)}}</td>
              <td>{{item.preout_stock}}{{getEnumValue(units,item.base_quantity_unit_id)}}</td>
              <td>{{item.shelf}}</td>
            </tr>
          </table>
        </el-form-item> -->
        <el-form-item label="记录：">
          <table border bordercolor="#E5E5E5" v-if="selects">
            <tr>
              <td width='80'>批次</td>
              <td width='80'>时间</td>
              <td width='80'>仓库</td>
              <td width='80'>货架</td>
              <td width='80'>CAS</td>
              <td width='60'>数量</td>
              <td width='60'>总量</td>
              <td>备注</td>
              <td width="50px">状态</td>
            </tr>
            <tr v-for="item in history_list.data" :key="item.id" v-if="item.shelf==selects">
              <td>{{item.inventory.batchno}}</td>
              <td>{{item.created_at}}</td>
              <td>{{getEnumValue(enum_warehouse,item.warehouse_id)}}</td>
              <td>{{item.shelf}}</td>
              <td>{{item.prod?item.prod.cas:''}}</td>
              <td>{{item.package_nums}}</td>
              <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}</td>
              <td>{{item.reason}}</td>
              <td>{{getEnumValue(status_info,item.status)}}</td>
            </tr>
          </table>
          <table border bordercolor="#E5E5E5" v-else>
            <tr>
              <td width='80'>批次</td>
              <td width='80'>时间</td>
              <td width='80'>仓库</td>
              <td width='80'>货架</td>
              <td width='80'>CAS</td>
              <td width='60'>数量</td>
              <td width='60'>总量</td>
              <td>备注</td>
              <td width="50px">状态</td>
            </tr>
            <tr v-for="item in history_list.data" :key="item.id">
              <td>{{item.inventory.batchno}}</td>
              <td>{{item.created_at}}</td>
              <td>{{getEnumValue(enum_warehouse,item.warehouse_id)}}</td>
              <td>{{item.shelf}}</td>
              <td>{{item.prod?item.prod.cas:''}}</td>
              <td>{{item.package_nums}}</td>
              <td>{{item.quantity}}{{item.quantity_unit?getEnumValue(units,item.quantity_unit):''}}</td>
              <td>{{item.reason}}</td>
              <td>{{getEnumValue(status_info,item.status)}}</td>
            </tr>
          </table>
          <el-pagination
            v-if="history_list.total"
            style="text-align: right;"
            @current-change="history_handleCurrentChange_Loss"
            :page-size="history_list.per_page"
            :current-page.sync="history_currentPage"
            layout="prev, pager, next"
            :total="history_list.total"
          ></el-pagination>
        </el-form-item>
        <!-- <el-form-item label="货架：">
          <el-select
            placeholder="请选择"
            clearable
            filterable
            v-model="selects"
            size="mini"
            style="width: 150px;"
            @change="profit_shelf()"
          >
            <el-option
              v-for="item in profit_data.shelves"
              :key="item.shelf"
              :label="item.shelf"
              :value="item.shelf"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-row v-if="shelf_model.package_type==2">
          <el-col :span="8">
            <el-form-item label="散装库存：">
              <!-- <span
                v-if="selec_shelf.length>0&&selects"
              >{{selec_shelf[0].quantity}}{{getEnumValue(units,selec_shelf[0].quantity_unit_id)}}</span>
              <span v-else>{{profit_data.stock}}{{getEnumValue(units,profit_data.base_unit_id)}}</span> -->
              <span>{{shelf_model.quantity}}{{getEnumValue(units,shelf_model.quantity_unit_id)}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货架：">
              <!-- <span v-if="selec_shelf.length>0&&selects">{{selec_shelf[0].shelf}}</span>
              <span v-else></span> -->
              <span>{{shelf_model.shelf}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-else-if="shelf_model.package_type==1">
          <el-col :span="8">
            <el-form-item label="规格：">
              <span>{{shelf_model.packsize}}{{getEnumValue(units,shelf_model.packsize_unit_id)}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="数量：">
              <span>{{shelf_model.stock}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="货架：">
              <span>{{shelf_model.shelf}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="盘亏：">
              <el-input
                size="mini"
                v-model="addProfit.quantity"
                style="width:150px;"
                @input="addProfit_blur(shelf_model.package_type==1?shelf_model.packsize_unit_id:shelf_model.quantity_unit_id)"
              ></el-input>
              <!-- <span
                v-if="selec_shelf.length>0&&selects"
              >{{getEnumValue(units,selec_shelf[0].quantity_unit_id)}}</span> -->
              <span v-if="shelf_model.package_type==2">{{getEnumValue(units,shelf_model.quantity_unit_id)}}</span>
              <span v-else>
                  *{{shelf_model.packsize}}
                  {{getEnumValue(units,shelf_model.packsize_unit_id)}}
              </span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="价格：">
              <span>{{profitLoss_b.price}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="占比：">
              <span>{{profitLoss_b.pre}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注：">
          <el-input size="mini" type="textarea" v-model="addProfit.reason" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" @click="add_profitLoss()" :loading='loading_profitLoss'>确定</el-button>
          <el-button size="mini" @click="close_profitLoss()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 补充测试 -->
    <el-dialog :visible.sync="test_Dialog" width="72%" title="检测" @close="close_test()" class="test_form">
      <el-form label-position="right" label-width="90px">
        <el-form-item label="分析要求：" v-if="testitems.length>0">
          <span
            v-for="(i,index) in testitems"
            :key="index"
            v-if="i.child && i.child.length==0"
            :label="i.id"
            style="margin:0 5px"
          >
            <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
          </span>
          <br />
          <div
            v-for="(i,index) in testitems"
            :key="index"
            v-if="i.child && i.child.length!=0"
            style="display: inline-block;width:50%;"
          >
            <span>{{i.name}}</span>
            <el-checkbox
              v-for="(j,index) in i.child"
              :key="index"
              :label="j.id"
              v-model="j.checked"
              @change="select()"
              class="checkbox_nei"
            >
              <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
            </el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label="分析备注：">
          <el-input type="textarea" :rows="3" size="small" v-model="addTest.note"></el-input>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" :loading="save_fy" @click="add_test()">确定</el-button>
          <el-button size="mini" @click="close_test()">取消</el-button>
        </el-form-item>
        <div v-if="roles_ids.indexOf(1)>-1||roles_ids.indexOf(19)>-1">
          <el-form-item label="检测结果：">
            <el-select
              v-model="test_status.order_result"
              clearable
              filterable
              size="mini"
              style=""
              :placeholder="$t('quality.queryList.status')"
            >
              <el-option v-for="i in enums.order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="免检：">
            <el-checkbox v-model="test_status.if_need_check" :true-label="1" :false-label="0">免检</el-checkbox>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" size="small" v-model="test_status.checked_note"></el-input>
          </el-form-item>
          <el-form-item style="text-align:right;">
            <el-button type="primary" size="mini" @click="change_status()">确定</el-button>
            <el-button size="mini" @click="close_test()">取消</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div>
        <div style="margin-bottom:10px;"><b>历史记录:</b></div>
        <table border bordercolor="#E5E5E5" class="his_table" v-for="(item,index) in test_hosdata.data" :key="index">
            <tr v-if="index==0" style="font-weight: bolder;border-top:1px solid #E5E5E5">
              <td>合同号</td>
              <td>批次</td>
              <td>所在仓库</td>
              <td>备注</td>
              <td>检测项目名称</td>
              <td>是否取样</td>
              <td>取样时间</td>
              <td>申请时间</td>
              <td>备注</td>
              <td>操作</td>
            </tr>
            <tr v-for="(i,index_a) in item.testitems" :key="index_a">
              <td :rowspan="item.testitems.length" v-if="index_a==0" width="100px">{{item.prod?item.prod.prodno:''}}</td>
              <td :rowspan="item.testitems.length" v-if="index_a==0" width="100px">{{item.batchno}}</td>
              <td :rowspan="item.testitems.length" v-if="index_a==0" width="100px">{{item.warehouse?item.warehouse.name:''}}</td>
              <td :rowspan="item.testitems.length" v-if="index_a==0">{{item.note}}</td>
              <td width="150px">
                {{i.testitem_name}}
                <span v-if="i.testitem_json_tostring">:{{i.testitem_json_tostring}}</span>
              </td>
              <td width="60px">
                {{getEnumValue(sampled_status,i.sampled_status)}}
              </td>
              <td width="70px">{{i.sampled_at}}</td>
              <td width="70px">{{i.created_at}}</td>
              <td width='110px'>{{i.note}}</td>
              <td width='60' align='center'>
                <el-button type="primary" size="mini" v-if="(i.sampled_status==2)&&permissions.indexOf(619)>-1" @click="cancelClick(i.id,item.batchno)">取消</el-button>
              </td>
            </tr>
        </table>
        <el-pagination
            v-if="test_hosdata.total"
            @current-change="test_handleCurrentChange"
            :current-page.sync="test_currentPage"
            :page-size="test_hosdata.per_page"
            layout="prev, pager, next"
            :total="test_hosdata.total"
          ></el-pagination>
      </div>
    </el-dialog>

    <!-- 复检 -->
    <el-dialog :visible.sync="recheck_Dialog" width="70%" title="复检" @close="close_recheck()">
      <el-form label-position="top" label-width="90px">
        <el-form-item label="分析要求：">
          <span v-for="i in testitems" :key="i.id" v-if="i.child.length==0" :label="i.id" style="margin:0 5px">
            <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
          </span>
          <br />
          <div
            v-for="(i,index) in testitems"
            :key="index"
            v-if="i.child.length!=0"
            style="display: inline-block;width:50%;"
          >
            <span>{{i.name}}</span>
            <el-checkbox
              v-for="j in i.child"
              :key="j.id"
              :label="j.id"
              v-model="j.checked"
              @change="select()"
              class="checkbox_nei"
            >
              <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
            </el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label="分析备注：">
          <el-input type="textarea" :rows="3" size="small" v-model="addRecheck.note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" :loading="save_fy" @click="add_recheck()">确定</el-button>
          <el-button size="mini" @click="close_recheck()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 检测结果修改 -->
    <el-dialog
      :visible.sync="test_statusDialog"
      width="30%"
      title="检测结果修改"
      @close="close_change_status()"
    >
      <el-form label-width="100px">
        <el-form-item label="检测结果：">
          <el-select
            v-model="test_status.order_result"
            clearable
            filterable
            size="mini"
            style="width: 100px;"
            :placeholder="$t('quality.queryList.status')"
          >
            <el-option v-for="i in enums.order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="免检：">
          <el-checkbox v-model="test_status.if_need_check" true-label="1" false-label="0">免检</el-checkbox>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" size="small" v-model="test_status.checked_note"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="change_status()">确定</el-button>
          <el-button size="mini" @click="close_change_status()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 报价 -->
    <el-dialog :visible.sync="spec_Dialog" width="80%" title="报价">
      <div style="margin-bottom:10px;">
        <el-button @click="spec_add()" type="primary" size="mini">添加</el-button>
        <span style="margin-left:20px;">
          <b>库存预警:</b>
          <span style="color:red;" class="notice_size">
            <el-input size="mini" v-model="spec_notice.notice_size" clearable style="width:100px;"></el-input>
            {{getEnumValue(units,spec_notice.notice_unit_id,'name_en')}}
          </span>
        </span>
        <el-button @click="notice_save(spec_notice)" :loading="notice_loading" type="primary" size="mini">确认</el-button>
      </div>
      <el-table :data="spec" border size="mini">
        <el-table-column label="规格">
          <template slot-scope="scope">
            <span>{{scope.row.pack_size}}{{getEnumValue(units,scope.row.pack_unit_id)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="纯度">
          <template slot-scope="scope">
            <span>{{scope.row.purity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="警戒线">
          <template slot-scope="scope">
            <span>{{scope.row.notice_size}}{{getEnumValue(units,scope.row.notice_unit_id)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存数量">
          <template slot-scope="scope">
            <span>{{scope.row.stock}}{{getEnumValue(units,scope.row.stock_unit_id)}}</span>
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
        <el-table-column label="备注" width="200">
          <template slot-scope="scope">
            <span>{{scope.row.note}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span>
              <el-button @click="spec_edit(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button
                @click="del_inventory(scope.row.id)"
                type="danger"
                size="mini"
                style="margin-left:5px;"
              >删除</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align:right;margin-top:10px;">
        <el-button @click="spec_Dialog = false" size="mini">取消</el-button>
      </div>
    </el-dialog>

    <!-- 报价新增 -->
    <el-dialog title="新增牌价" :visible.sync="dialogSpec" class="form" width="50%">
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
                <el-option v-for="(i,index) in units" :key="index" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="纯度:">
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
                <el-option v-for="(i,index) in units" :key="index" :label="i.name" :value="i.id"></el-option>
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
                <el-option v-for="(i,index) in units" :key="index" :label="i.name" :value="i.id"></el-option>
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

    <!-- 修改 -->
    <el-dialog :visible.sync="reviseDialog" width="30%" @close="close_revise()">
      <el-form label-position="right" label-width="90px">
        <el-form-item label="外观:">
          <el-select
            v-model="Appearance.chemprodappearance_id"
            clearable
            filterable
            size="mini"
            style="width: 200px;"
          >
            <el-option v-for="i in ChemicalAppearance" :label="i.name" :value="i.id" :key="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库数量:">
          <el-input size="mini" v-model="Appearance.quantity" clearable style="width:200px;margin-right:5px;"></el-input>
          <span>{{getEnumValue(units,Appearance.unit_id)}}</span>
        </el-form-item>
        <el-form-item style="text-align:right;">
          <el-button type="primary" size="mini" @click="change_revise()">确定</el-button>
          <el-button size="mini" @click="close_revise()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- logs -->
    <el-dialog :visible.sync="logsDialog" width="60%">
      <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
        <tr style="font-weight: bold;">
          <td width='50'>ID</td>
          <td width='80'>时间</td>
          <td width='60'>用户</td>
          <td width='100'>用途类型</td>
          <td width='60'>类型</td>
          <td width='100'>数量</td>
          <td width='100'>货架</td>
          <td>备注</td>
        </tr>
        <tr v-for="item in logs_list">
          <td>{{item.id}}</td>
          <td>{{item.created_at}}</td>
          <td>{{item.username?item.username:getEnumValue(Users,item.user_id)}}</td>
          <td>
            <span v-for="(i,key,index) in type">
              <span v-if="key == item.type">{{i}}</span>
              <span v-else></span>
            </span>
          </td>
          <td>{{item.flow}}</td>
          <td>{{item.quantity/item.package_nums}}{{getEnumValue(units,item.quantity_unit)}} *{{item.package_nums}} </td>
          <td>{{item.shelf}}</td>
          <td>{{item.note}}</td>
        </tr>
      </table>
    </el-dialog>

    <!-- 打印批次 -->
    <el-dialog :visible.sync="batchonDialog" width="30%" @close="close_batchon()">
      <div style="text-align:left;">
        <span>导出批次次数:</span>
        <span style="margin:0px 10px;">≥</span>
        <el-input size="mini" v-model="batchon_num" clearable style="width:200px;"></el-input>
        <span style="margin:0px 5px;">次</span>
      </div>
      <div style="text-align:right;">
        <el-button type="primary" size="mini" @click="save_batchon()">确定</el-button>
        <el-button size="mini" @click="close_batchon()">取消</el-button>
      </div>
    </el-dialog>

    <!-- 预占logs -->
    <el-dialog title="预占日志" :visible.sync="preout_logsDialog" width="60%">
      <table border="1" bordercolor="#E5E5E5" style="border-collapse: collapse;width:100%;">
        <tr style="font-weight: bold;">
          <td width='80'>时间</td>
          <td width='50'>用户</td>
          <td width='100'>子合同号</td>
          <td width='100'>批次</td>
          <td width='60'>预占类型</td>
          <td width='80'>数量</td>
          <td width='80'>总量</td>
          <td width='60'>状态</td>
          <td>备注</td>
        </tr>
        <tr v-for="item in preout_logs_list.data">
          <td>{{item.created_at}}</td>
          <td>{{getEnumValue(Users,item.user_id)}}</td>
          <td>
            <span v-if="item.return_id">
              {{attr(item,'return.contract_no')}}
            </span>
            <span v-else-if="!item.profit_loss_id&&!item.transfer_id&&!item.return_id">
              {{attr(item,'contract_detail.contract_number')}}
            </span>
          </td>
          <td>{{item.inventory.batchno}}</td>
          <td>
            <span v-if="item.transfer_id">调拨预占</span>
            <span v-if="item.profit_loss_id">盘亏预占</span>
            <span v-if="item.return_id">采购退货预占</span>
            <span v-if="!item.profit_loss_id&&!item.transfer_id&&!item.return_id">销售预占</span>
          </td>
          <td>{{item.package_nums}}</td>
          <td>{{item.quantity}}{{getEnumValue(units,item.quantity_unit)}}</td>
          <td>{{getEnumValue(status_info_logs,item.status)}}</td>
          <td>{{item.note}}</td>
        </tr>
      </table>
      <el-pagination
              @current-change="handleCurrentChange_preout_logs"
              :current-page.sync="currentPage_preout_logs"
              layout="prev, pager, next"
              :page-size="preout_logs_list.per_page"
              :total="preout_logs_list.total">
      </el-pagination>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      v-if="list.total"
      style="text-align: right;"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="list.per_page"
      layout="total,prev, pager, next"
      :total="list.total"
    ></el-pagination>
  </d2-container>
</template>
<script>
import {
  lists_v2,
  lists,
  listTotal,
  listPost,
  create,
  profit_create,
  change_checked_result,
  spec,
  spec_create,
  spec_update,
  spec_delete,
  form_all,
  unit_change,
  changeAppearance,
  deleteSpectrogram,
  createCheck,
  cancleByBuy,
  export_duplicate_batches,
  setNoticeSize,
  preout_logs,
  split_packaging_view,
  split_packaging,
  update_jisuan_price
} from "@/api/inventory";
import { getShevies, supplier_lists } from "@/api/instore";
import pdf from "@/vue-pdf/src/vuePdfSss";
import axios from "axios";
import $ from "jquery";
import { mapState } from "vuex";
import util from "@/libs/util";
import addAk from "./add_AK";//艾康
import addAq from "./add_AQ";//艾康
import addAIVI from "./add_AIVI";//艾康
import addYLan from "./add_YLan";//艾康
export default {
  name: "Warehouse-inventory",
  components: {
    pdf,
    addAk,
    addAq,
    addAIVI,
    addYLan
  },
  data() {
    return {
      loading_search: false,
      loading_allot:false,
      loading_profit:false,
      loading_profitLoss:false,
      preout_logsDialog:false,
      packe_loading:false,
      splitDialog:false,
      viewVisible_add_Aq:false,
      viewVisible_add_Ak:false,
      viewVisible_add_AIVI:false,
      viewVisible_add_YLan:false,
      show_number:0,
      list: {},
      logs_list:{},
      user_type: "",
      member_id:'',
      coa_cas:'',
      coa_batchno:"",
      coa_list:{
        batch_no:'',
        purity:'',
        chemprodappearance_id:'',
        storage_cond:''
      },
      batch_no:'',
      batchon_num:'',
      spec: [],
      spec_id: "",
      selec_shelf: [],
      spec_notice:{},
      selects: "",
      test_hosdata: {},
      profit_data: {},
      profit_data_a:{},
      shelf_model:{},
      allot_standards:{},
      roles_ids:[],
      prod_export_url:'',
      prod_batchno_url:'',
      test_currentPage: 1,
      history_currentPage_split:1,
      test_batchno:'',
      preout_logs_list:{},
      index:'',
      splitList:{},
      splitData:{inventory:{}},
      split_package_log:{},
      Appearance: {
        id: "",
        chemprodappearance_id: "",
        quantity:'',
        unit_id:''
      },
      profitLoss_b: {
        price: "",
        pre: ""
      },
      shelf_warehouse_id:'',
      addpackeage: {
        inventory_id: '',
        packages: [
          {
              inventory_id: '',
              packsize: '',
              unit_id: '',
              packnumber: 1,
              stock: '',
              shelf: ''
          }
        ]
      },
      addAllot: {
        package_type: "",
        prod_id: "",
        company_id: "",
        warehouse_id: "",
        company_id_to: "",
        warehouse_id_to: "",
        quantity: "",
        quantity_unit: "",
        package_nums: "",
        inventory_id: "",
        package_id: "",
        shelf_to: "",
        shelf: ""
      },
      addProfit: {
        type: "",
        prod_id: "",
        package_type: "",
        warehouse_id: "",
        package_id: "",
        inventory_id: "",
        inventory_shelve_id: "",
        quantity: "",
        quantity_unit: "",
        package_nums: "",
        reason:''
      },
      history_list: [],
      addTest: {
        prod_id:'',
        inventory_id: "",
        testitems: [],
        note: ""
      },
      addRecheck: {
        inventory_id: "",
        testitems: [],
        note: ""
      },
      test_status: {
        id: "",
        prod_id:'',
        order_result: "",
        if_need_check: "",
        checked_note: ""
      },
      spec_item: {
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
      },
      queryList_preout_logs:{
        page:'',
        inventory_id:''
      },
      queryList: {
        order_result: "",
        order_status: "",
        flow_statuses: "",
        if_need_check: "",
        stock_status: 1,
        is_sample: '',
        page: "1",
        name: "",
        cas: "",
        batchno: "",
        supplier_batchno: "",
        purchaseorder_no: "",
        warehouse_id: "",
        started_at: "",
        ended_at: "",
        purchase_id: "",
        expired_at: "",
        supplier_id: "",
        check_status: "",
        prodremind: "",
        is_danger_inland:'',
        stock_noticed_percent:'',
        stock_noticed_percent_op:'',
        express_number:'',
        air_sensitive:'',
        water_sensitive:'',
        pre_packing:'',
        storage_cond:''
      },
      pdfsrc:'',
      pageCount:1,
      currentPage_preout_logs:1,
      i:1,
      fileType: "pdf",
      scale: 100, //放大系数
      idx: -1,
      width_pdf:'60%',
      top_pdf:"15vh",
      currentPage: 1,
      history_currentPage: 1,
      dialogPack:false,
      logsDialog:false,
      notice_loading:false,
      batchonDialog:false,
      viewVisible:false,
      supplyloading: false,
      profitLoss_Dialog: false,
      profitDialog: false,
      test_Dialog: false,
      recheck_Dialog: false,
      test_statusDialog: false,
      spec_Dialog: false,
      dialogSpec: false,
      save_fy: false,
      allot_Dialog: false,
      reviseDialog: false,
      enums: {},
      enum_warehouse: [],
      flow_statuses: [],
      enum_check_result: [],
      units: [],
      virtualunits: [],
      purchaseList: [],
      ChemicalAppearance: [],
      salelist: [],
      supply_list: [],
      Users: [],
      StorageCondition: [],
      type: [],
      testitems: [],
      CommonSpec: [],
      Standardpurity: [],
      priced: [],
      status_info: [],
      Currency:[],
      InvoiceInfo_All:[],
      sampled_status:[],
      warehouse_shelf:[],
      Prodremind:[],
      preout_type_info:[],
      status_info_logs:[],
      w:250,
      quality_indexs: [
        {
          name: ""
        },
        {
          name: "≥"
        },
        {
          name: "≤"
        },{
          name: "="
        }
      ],
      permissions: JSON.parse(localStorage.getItem("permissions")),
    };
  },
  created() {
    for (var i in this.GEnums.Purchases) {
      if (this.GEnums.Purchases[i].id == util.cookies.get("user_id")) {
        this.queryList.purchase_id = Number(util.cookies.get("user_id"));
      }
    }
    var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
    this.roles_ids=[]
    roles_ids_list.forEach(item=>{
      this.roles_ids.push(item.id)
    })
    if (this.$route.query.cas) {
          this.queryList.cas = this.$route.query.cas;
        }
        if (this.$route.query.batchno) {
          this.queryList.batchno = this.$route.query.batchno;
        }
      if (this.$route.query.purchase_id&&(this.$route.query.purchase_id=='null'||this.$route.query.purchase_id==null)) {
          this.queryList.purchase_id = '';
      }
    this.fetchData();
    this.user_type = util.cookies.get("user_type");
    this.member_id=util.cookies.get('member_id')
  },
  watch: {
    // $route(to, from) {
    //   if (to.name === "Warehouse-inventory_new") {
    //   }
    // }
    $route(to, from) {
      if (to.name === "Warehouse-inventory"&&from.name!="Warehouse-test") {
        if (this.$route.query.cas) {
          this.queryList.cas = this.$route.query.cas;
        }
        if (this.$route.query.batchno) {
          this.queryList.batchno = this.$route.query.batchno;
        }
          if (this.$route.query.purchase_id&&(this.$route.query.purchase_id=='null'||this.$route.query.purchase_id==null)) {
              this.queryList.purchase_id = '';
          }
        this.fetchData();
      }
    }
  },
  methods: {
      hide(){
          this.fetchData()
      },
      save_jiesuan(item){
          let obj={
              purchaseorder_id:item.purchaseorder_id,
              purchaseorder_no:item.purchaseorder_no,
              jiesuan_price:item.order.jiesuan_price
          }
          update_jisuan_price(obj,this)
      },
    change_w(){
        if(this.w==25){
            this.w=250
        }else{
            this.w=25
        }
    },
    fetchData() {
      lists(this.queryList, "inventory_deal_list")
        .then(res => {
          if (this.loading_search) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.loading_search = false;
          }
            res.data.data.forEach(res=>{
                res.show=false
            })
          this.list = res.data;
          this.enum_warehouse = this.GEnums.Warehouse;
          this.enums = res.enum;
          this.flow_statuses = res.enum.flow_statuses;
          this.enum_check_result = res.enum.check_statuses;
          this.units = this.GEnums.Unit;
          this.virtualunits = this.GEnums.Virtualunits;
          this.Prodremind = this.GEnums.Prodremind;
          this.type = res.enum.type;
          this.priced = res.enum.priced;
        })
        .catch(rr => {
          this.loading_search = false;
        });
      this.ChemicalAppearance = this.GEnums.ChemicalAppearance;
      this.salelist = this.GEnums.Sales;
      this.Users = this.GEnums.Users;
      this.Currency = this.GEnums.Currency;
      this.purchaseList = this.GEnums.Purchases;
      this.StorageCondition = this.GEnums.StorageCondition;
      this.InvoiceInfo_All = this.GEnums.InvoiceInfo_All;
    },
    //新增艾康安勤COA
            Add_ak(item) {
                this.coa_cas = item.cas
                this.coa_batchno = item.batchno
                this.viewVisible_add_Ak = true;
            },
            Add_aq(item) {
                this.coa_cas = item.cas
                this.coa_batchno = item.batchno
                this.viewVisible_add_Aq = true;
            },
            Add_AIVI(item){
                this.coa_cas = item.cas
                this.coa_batchno = item.batchno
                this.viewVisible_add_AIVI = true;
            },
            Add_YLan(item){
              this.coa_cas = item.cas
              this.coa_batchno = item.batchno
              this.viewVisible_add_YLan = true;
            },
            close_Add() {
                this.viewVisible_add_Ak = false;
                this.viewVisible_add_Aq = false;
                this.viewVisible_add_AIVI = false;
                this.viewVisible_add_YLan = false
                this.coa_cas = ''
                if(this.$refs.addAk){
                    this.$refs.addAk.close_Add_child()
                } else if(this.$refs.addYLan){
                    this.$refs.addYLan.close_Add_child()
                }else{
                    this.$refs.addAq.close_Add_child()
                }
            },
    // Add_ak(item) {
    //     this.coa_cas = item.cas
    //     var storage_cond = ''
    //     if(item.storage_cond&&item.storage_cond.length>0){
    //       item.storage_cond.forEach((i,index)=>{
    //         if(index!=(item.storage_cond.length-1)){
    //           storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)+'、'
    //         }else{
    //           storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)
    //         }
    //       })
    //     }
    //     this.coa_list = {
    //       batch_no:item.batchno,
    //       purity:item.purity,
    //       chemprodappearance_id:item.chemprodappearance_id,
    //       storage_cond:storage_cond
    //     }
    //     this.viewVisible_add_Ak = true;
    // },
    // Add_aq(item) {
    //     this.coa_cas = item.cas
    //     var storage_cond = ''
    //     if(item.storage_cond&&item.storage_cond.length>0){
    //       item.storage_cond.forEach((i,index)=>{
    //         if(index!=(item.storage_cond.length-1)){
    //           storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i,'name_en')+'、'
    //         }else{
    //           storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i,'name_en')
    //         }
    //       })
    //     }
    //     this.coa_list = {
    //       batch_no:item.batchno,
    //       purity:item.purity,
    //       chemprodappearance_id:item.chemprodappearance_id,
    //       storage_cond:storage_cond
    //     }
    //     this.viewVisible_add_Aq = true;
    // },
    // close_Add() {
    //     this.viewVisible_add_Ak = false;
    //     this.viewVisible_add_Aq = false;
    //     this.coa_cas = ''
    //     this.coa_list = {}
    //     if(this.$refs.addAk){
    //         this.$refs.addAk.close_Add_child()
    //     }else{
    //         this.$refs.addAq.close_Add_child()
    //     }
    // },
    packeClick(a, b) {
      this.addpackeage={
        inventory_id: a.id,
        packages: [
          {
              inventory_id: '',
              packsize: '',
              unit_id: a.quantity_unit_id?a.quantity_unit_id:'',
              packnumber: 1,
              stock: '',
              shelf: a.shelf?a.shelf:''
          }
        ]
      }
      this.shelf_warehouse_id = b.warehouse_id
      this.dialogPack = true
    },
    querySearch_packe(queryString, cb) {
        getShevies(this.shelf_warehouse_id).then(res => {
            var restaurants = []
            for (var i in res.data) {
                restaurants.push(res.data[i])
            }
            cb(restaurants)
        })
    },
    package_id(index) {
      this.index = index
    },
    handleSelect_packe(item) {
      this.addpackeage.packages[this.index].shelf = item
    },
    add_packe() {
        var list = {
            inventory_id: '',
            packsize: '',
            unit_id: '',
            packnumber: 1,
            stock: '',
            shelf: ''
        }
        list.unit_id = this.addpackeage.packages[0]?this.addpackeage.packages[0].unit_id:''
        list.shelf = this.addpackeage.packages[0]?this.addpackeage.packages[0].shelf:''
        this.addpackeage.packages.push(list)
    },
    del_packe(index) {
      this.addpackeage.packages.splice(index, 1)
    },
    save_packe() {
      this.addpackeage.packages.forEach(item => {
          item.inventory_id = this.addpackeage.inventory_id
      })
      this.packe_loading = true
      create(this.addpackeage, 'pack', 'create', this)
    },
    splitClick(a, b, c) {
        this.splitList = {
            out_inventory_shelf_id: c,
            package_nums: '',
            in_shelf: '',
            prod_id:a.prod_id
        }
        this.splitData = {inventory:{}}
        this.split_package_log = []
        split_packaging_view(a.id, b, c,1).then(res => {
            this.splitData = res.data.shelve
            this.split_package_log = res.data.split_package_log
            this.splitDialog = true
        })
    },
    history_handleCurrentChange_split(page_current){
      this.history_currentPage_split = page_current
      split_packaging_view(this.splitData.inventory_id, this.splitData.inventorypackage_id, this.splitData.id,page_current).then(res => {
          this.split_package_log = res.data.split_package_log
      })
    },
    querySearch_split_shelf(queryString, cb) {
        getShevies(this.splitData.inventory.warehouse_id).then(res => {
            var restaurants = []
            for (var i in res.data) {
                restaurants.push(res.data[i])
            }
            cb(restaurants)
        })
    },
    handleSelect_split_shelf(item) {
        this.splitList.in_shelf = item
    },
    save_split() {
      this.splitList.package_nums = this.splitList.package_nums
          ? parseFloat(this.splitList.package_nums)
          : ''
      split_packaging(this.splitList, this)
    },
    logs(list){
      this.logs_list = []
      this.logs_list = list
      if(this.logs_list.length>0){
        this.logsDialog = true
      }
    },
    preout_logs_(id){
      this.queryList_preout_logs.inventory_id = id
      this.preout_logs_list = {}
      preout_logs(this.queryList_preout_logs).then(res=>{
        this.preout_logs_list = res.data
        this.preout_type_info = res.enum.preout_type_info
        this.status_info_logs = res.enum.status_info
        this.preout_logsDialog = true
      })
    },
    handleCurrentChange_preout_logs(page_current) {
        this.queryList_preout_logs.page = this.currentPage_preout_logs = page_current;
        preout_logs(this.queryList_preout_logs).then(res=>{
          this.preout_logs_list = res.data
        })
    },
    preview(url) {
      if (!/\.(pdf|PDF)$/.test(url)) {
        // 非pdf文件
        return false;
      } else {
        this.pdfsrc = pdf.createLoadingTask(url);
        this.viewVisible = true;
      }
    },
    close_pdf() {
      this.viewVisible = false
      this.width_pdf = "60%";
      this.top_pdf = "15vh";
      this.i = 1
      this.pageCount = 1
      this.pdfsrc = ''
    },
    downloadPDF(url,fileName){
            axios({
                method: 'get',
                responseType: 'arraybuffer',
                url: url
            }).then(function(res){
                    //调用下载方法，把后端传过来的流传给fileDownload方法
                    this.fileDownload(res.data, fileName);
                }.bind(this)
            )
            .catch(
                function(error) {
                    // this.$Message.error("网络请求出错")
                    //调试阶段可以看看报的什么错
                    //console.log("error",error)
                    this.$message({
                      message: error,
                      type: "error"
                    });
                }.bind(this)
            );
        },
    fileDownload(data, fileName) {
      let blob = new Blob([data], {
        //type类型后端返回来的数据中会有，根据自己实际进行修改
        type: "application/pdf;charset-UTF-8"
      });
      let filename = fileName || "报表.xls";
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var blobURL = window.URL.createObjectURL(blob);
        // 创建隐藏<a>标签进行下载
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
      }
    },
    save_batchon(){
      var obj = {
        nums:this.batchon_num
      }
      export_duplicate_batches(obj,this)
    },
    close_batchon(){
      this.batchonDialog = false
      this.batchon_num = ''
    },
    change1() {
      if (this.i > 1) {
        this.i--;
      }
    },
    change2() {
      if (this.i < this.pageCount) {
        this.i++;
      }
    },
    scaleD() {
      this.scale += 5;
      // this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      this.width_pdf = parseInt(this.scale + 60) - 100 + "%";
    },
    scaleX() {
      if (this.scale == 80) {
        return;
      }
      this.scale += -5;
      // this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      this.width_pdf = parseInt(this.scale + 60) - 100 + "%";
    },
    scaleY() {
      this.width_pdf = "100%";
      this.top_pdf = "0vh";
    },
    doExport(item){
      this.prod_export_url = item.url
          setTimeout(() => {
            this.$refs.prod_export_url.click()
          }, 200)
    },
    cancelClick(id,batchno){
        let obj={
            id:id
        }
        cancleByBuy(obj,batchno,this)
    },
    cancel(item){
      var ids = item.id
      deleteSpectrogram(ids,this)
    },
    querySearchAsync_contact(queryString, cb) {
      var restaurants = [];
      obj(restaurants, this.Standardpurity);
      cb(restaurants);
    },
    handleSelect_contact(item) {
      this.spec_item.purity = item.name;
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          supplier_lists(query).then(res => {
            this.supply_list = res.data;
            this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    warehouse_change(){
      this.warehouse_shelf = []
      this.addAllot.shelf_to = ''
      getShevies(this.addAllot.warehouse_id_to).then(res=>{
        for (var i in res.data) {
          this.warehouse_shelf.push(res.data[i]);
        }
      })
    },
    querySearch_shelf(queryString, cb) {
      var restaurants = this.warehouse_shelf
      var results = queryString ? restaurants.filter(i=>{return i.toString().indexOf(queryString)>-1}) : restaurants;
      cb(results)
    },
    addProfit_blur(unit_id) {
      // var obj = {
      //   in_quantity: this.addProfit.quantity ? this.addProfit.quantity : 0,
      //   in_unit_id: this.selects
      //     ? this.selec_shelf[0].quantity_unit_id
      //     : this.profit_data.unit_id
      // };
      var obj = {}
      if(this.shelf_model.package_type==1){
        obj = {
          in_quantity: this.addProfit.quantity ? Number(this.addProfit.quantity)*Number(this.shelf_model.packsize) : 0,
          in_unit_id:unit_id
        };
      }else{
        obj = {
          in_quantity: this.addProfit.quantity ? this.addProfit.quantity : 0,
          in_unit_id:unit_id
        };
      }
      unit_change(obj).then(res => {
        this.profitLoss_b.pre = GetPercent(
          Number(res.data.out_quantity),
          Number(this.profit_data_a.storage_base_quantity)

        );
        this.profitLoss_b.price = (
          Number(res.data.out_quantity) * Number(this.profit_data_a.base_price)
        ).toFixed(2);
      });
    },
    handleSelect_shelf(item) {
      this.addAllot.shelf_to = item;
    },
    test_handleCurrentChange(page_current) {
      var clickList = {
        page: page_current,
        id:'',
        batchno: ""
      };
      this.test_currentPage = page_current
      this.list.data.forEach(res=>{
        if(res.id==this.addTest.inventory_id){
          clickList.batchno = res.batchno;
          clickList.id = res.id;
        }
      })
      listPost(clickList, "sample/history").then(res => {
        this.test_hosdata = res.data;
      });
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    history_handleCurrentChange(page_current) {
      this.history_currentPage = page_current;
      var ids = {
        id: this.profit_data.id,
        page: page_current,
        type: 3
      };
      lists(ids, "profit_loss_new_view").then(res => {
        this.history_list = res.data.inventory_profit_loss;
      });
    },
    history_handleCurrentChange_Loss(page_current) {
      this.history_currentPage = page_current;
      var ids = {
        id: this.profit_data.id,
        page: page_current,
        type: 4
      };
      lists(ids, "profit_loss_new_view").then(res => {
        this.history_list = res.data.inventory_profit_loss;
      });
    },
    history_handleCurrentChange_allot(page_current) {
      this.history_currentPage = page_current;
      // var ids = {
      //   inventory_id: this.profit_data.id,
      //   page: page_current
      // };
      // form_all(ids).then(res => {
      //   this.history_list = res.data.inventory_transfer;
      // });
      var obj = {
        inventory_id:this.shelf_model.inventory_id,
        package_id:this.shelf_model.package_id,
      }
      lists(obj, 'transfer_form').then(res => {
        this.history_list = res.data.inventory_transfer;
      })
    },
    item_profitClick(up_id,id,package_type,type){
      var obj = {
        inventory_id:up_id,
        inventory_shelve_id:id,
        package_type:package_type,
        type:type
      }
      this.shelf_model = {}
      lists(obj, 'profit_loss_view').then(res => {
        this.shelf_model = res.data.shelf_model
        this.shelf_model.package_type = package_type
        this.shelf_model.inventory_shelve_id = id
        this.profit_data = res.data.shelf_model.inventory;
        this.profit_data_a = res.data.inventory
        // this.selec_shelf = res.data.inventory.shelves;
        this.history_list = res.data.inventory_profit_loss;
        this.status_info = res.enum.status_info;
        this.profitDialog = true;
      })
    },
    item_profitLossClick(up_id,id,package_type,type){
      var obj = {
        inventory_id:up_id,
        inventory_shelve_id:id,
        package_type:package_type,
        type:type
      }
      this.shelf_model = {}
      lists(obj, 'profit_loss_view').then(res => {
        this.shelf_model = res.data.shelf_model
        this.shelf_model.package_type = package_type
        this.shelf_model.inventory_shelve_id = id
        this.profit_data = res.data.shelf_model.inventory;
        this.profit_data_a = res.data.inventory
        // this.selec_shelf = res.data.inventory.shelves;
        this.history_list = res.data.inventory_profit_loss;
        this.status_info = res.enum.status_info;
        this.profitLoss_Dialog = true;
      })
    },
    profitClick(id, type) {
      var ids = {
        id: id,
        type: type
      };
      lists(ids, "profit_loss_new_view").then(res => {
        res.data.inventory.shelves.forEach(a => {
          if (!a.shelf) {
            a.shelf = " ";
          }
        });
        this.profitDialog = true;
        this.profit_data = res.data.inventory;
        this.selec_shelf = res.data.inventory.shelves;
        this.history_list = res.data.inventory_profit_loss;
        this.status_info = res.enum.status_info;
      });
    },
    profit_shelf() {
      if (this.selects) {
        this.selec_shelf = this.profit_data.shelves.filter(res => {
          return res.shelf == this.selects;
        });
      } else {
        this.selec_shelf = this.profit_data.shelves;
      }
      this.$forceUpdate();
    },
    add_profit() {
      // this.addProfit.prod_id = this.profit_data.prod_id;
      // this.addProfit.warehouse_id = this.profit_data.warehouse_id;
      // this.addProfit.inventory_id = this.profit_data.id;
      // this.addProfit.inventory_shelve_id = this.selects
      //   ? this.selec_shelf[0].id
      //   : "";
      // this.addProfit.package_type = 2;
      // this.addProfit.package_nums = 1;
      // this.addProfit.package_id = 0;
      // this.addProfit.type = 3;
      // this.addProfit.quantity_unit = this.selects
      //   ? this.selec_shelf[0].quantity_unit_id
      //   : "";
      if(this.shelf_model.package_type==2){
        this.addProfit.prod_id = this.profit_data.prod_id;
        this.addProfit.warehouse_id = this.profit_data.warehouse_id;
        this.addProfit.inventory_id = this.profit_data.id;
        this.addProfit.inventory_shelve_id = this.shelf_model.inventory_shelve_id
        this.addProfit.package_type = 2;
        this.addProfit.package_nums = 1;
        this.addProfit.package_id = 0;
        this.addProfit.type = 3;
        this.addProfit.quantity_unit = this.shelf_model.quantity_unit_id
      }else{
        this.addProfit.prod_id = this.profit_data.prod_id;
        this.addProfit.warehouse_id = this.profit_data.warehouse_id;
        this.addProfit.inventory_id = this.profit_data.id;
        this.addProfit.inventory_shelve_id = this.shelf_model.inventory_shelve_id
        this.addProfit.package_type = 1;
        this.addProfit.package_nums = JSON.parse(JSON.stringify(this.addProfit.quantity));
        this.addProfit.package_id = this.shelf_model.inventorypackage_id;
        this.addProfit.type = 3;
        this.addProfit.quantity_unit = this.shelf_model.packsize_unit_id
        this.addProfit.quantity = Number(this.shelf_model.packsize) * Number(this.addProfit.quantity)
      }
      this.loading_profit = true
      profit_create(this.addProfit, "inventory_profit", this);
    },
    close_profit() {
      this.profitDialog = false;
      this.addProfit = {
        type: "",
        prod_id: "",
        package_type: "",
        warehouse_id: "",
        package_id: "",
        inventory_id: "",
        inventory_shelve_id: "",
        quantity: "",
        quantity_unit: "",
        package_nums: "",
        reason:''
      };
      this.profit_data = {};
      this.selec_shelf = [];
      this.history_list = [];
      this.selects = "";
      this.history_currentPage = 1;
    },
    profitLossClick(id, type) {
      var ids = {
        id: id,
        type: type
      };
      lists(ids, "profit_loss_new_view").then(res => {
        res.data.inventory.shelves.forEach(a => {
          if (!a.shelf) {
            a.shelf = " ";
          }
        });
        this.profitLoss_Dialog = true;
        this.profit_data = res.data.inventory;
        this.selec_shelf = res.data.inventory.shelves;
        this.history_list = res.data.inventory_profit_loss;
        this.status_info = res.enum.status_info;
      });
    },
    add_profitLoss() {
      // this.addProfit.prod_id = this.profit_data.prod_id;
      // this.addProfit.warehouse_id = this.profit_data.warehouse_id;
      // this.addProfit.inventory_id = this.profit_data.id;
      // this.addProfit.inventory_shelve_id = this.selects
      //   ? this.selec_shelf[0].id
      //   : "";
      // this.addProfit.package_type = 2;
      // this.addProfit.package_nums = 1;
      // this.addProfit.package_id = 0;
      // this.addProfit.type = 4;
      // this.addProfit.quantity_unit = this.selects
      //   ? this.selec_shelf[0].quantity_unit_id
      //   : "";
      if(this.shelf_model.package_type==2){
        this.addProfit.prod_id = this.profit_data.prod_id;
        this.addProfit.warehouse_id = this.profit_data.warehouse_id;
        this.addProfit.inventory_id = this.profit_data.id;
        this.addProfit.inventory_shelve_id = this.shelf_model.inventory_shelve_id
        this.addProfit.package_type = 2;
        this.addProfit.package_nums = 1;
        this.addProfit.package_id = 0;
        this.addProfit.type = 4;
        this.addProfit.quantity_unit = this.shelf_model.quantity_unit_id
      }else{
        this.addProfit.prod_id = this.profit_data.prod_id;
        this.addProfit.warehouse_id = this.profit_data.warehouse_id;
        this.addProfit.inventory_id = this.profit_data.id;
        this.addProfit.inventory_shelve_id = this.shelf_model.inventory_shelve_id
        this.addProfit.package_type = 1;
        this.addProfit.package_nums = JSON.parse(JSON.stringify(this.addProfit.quantity));
        this.addProfit.package_id = this.shelf_model.inventorypackage_id;
        this.addProfit.type = 4;
        this.addProfit.quantity_unit = this.shelf_model.packsize_unit_id
        this.addProfit.quantity = Number(this.shelf_model.packsize) * Number(this.addProfit.quantity)
      }
      this.loading_profitLoss = true
      profit_create(this.addProfit, "inventory_loss", this);
    },
    close_profitLoss() {
      this.profitLoss_Dialog = false;
      this.addProfit = {
        type: "",
        prod_id: "",
        package_type: "",
        warehouse_id: "",
        package_id: "",
        inventory_id: "",
        inventory_shelve_id: "",
        quantity: "",
        quantity_unit: "",
        package_nums: "",
        reason:''
      };
      this.profit_data = {};
      this.selec_shelf = [];
      this.history_list = [];
      this.selects = "";
      this.history_currentPage = 1;
      this.profitLoss_b = {
        price: "",
        pre: ""
      };
    },
    item_allotClick(a,b,package_type){
      var obj = {
        inventory_id:a,
        package_id:b,
        // package_type:package_type
      }
      this.shelf_model = {}
      this.shelf_model.inventory_id = a
      this.shelf_model.package_id = b
      this.shelf_model.package_type = package_type
      lists(obj, 'transfer_form').then(res => {
        this.profit_data = res.data.inventory;
        // this.selec_shelf = res.data.inventory.shelves;
        this.history_list = res.data.inventory_transfer;
        this.status_info = res.enum.status_info;
        if(package_type==2){
          this.allot_standards = res.data.inventory.shelves.filter(i=>{return i.id == b})[0]
        }else{
          this.allot_standards = res.data.inventory.package_shelves.filter(i=>{return i.id == b})[0]
        }
        this.allot_Dialog = true;
      })
    },
    allotClick(id) {
      var ids = {
        inventory_id: id
      };
      form_all(ids).then(res => {
        res.data.inventory.shelves.forEach(a => {
          if (!a.shelf) {
            a.shelf = " ";
          }
        });
        this.profit_data = res.data.inventory;
        this.selec_shelf = res.data.inventory.shelves;
        this.history_list = res.data.inventory_transfer;
        this.status_info = res.enum.status_info;
        this.allot_Dialog = true;
      });
    },
    add_allot() {
      // this.addAllot.package_type = 2;
      // this.addAllot.prod_id = this.profit_data.prod_id;
      // this.addAllot.company_id = this.profit_data.company_id;
      // this.addAllot.warehouse_id = this.profit_data.warehouse_id;
      // this.addAllot.company_id_to = this.profit_data.company_id;
      // this.addAllot.inventory_id = this.profit_data.id;
      // this.addAllot.quantity_unit = this.selects
      //   ? this.selec_shelf[0].quantity_unit_id
      //   : "";
      // this.addAllot.shelf = this.selects ? this.selec_shelf[0].shelf : "";
      // this.addAllot.package_nums = 1;
      // this.addAllot.package_id = this.selects ? this.selec_shelf[0].id : "";
      // this.loading_allot = true
      var obj = {}
      this.addAllot.prod_id = this.profit_data.prod_id;
      this.addAllot.company_id = this.profit_data.company_id;
      this.addAllot.warehouse_id = this.profit_data.warehouse_id;
      this.addAllot.company_id_to = this.profit_data.company_id;
      this.addAllot.inventory_id = this.profit_data.id;
      this.addAllot.shelf = this.allot_standards.shelf
      this.addAllot.package_id = this.allot_standards.id
      obj = JSON.parse(JSON.stringify(this.addAllot))
      if(this.shelf_model.package_type==2){
        obj.package_type = 2;
        obj.quantity_unit = this.allot_standards.quantity_unit_id
        obj.package_nums = 1;
      }else{
        obj.package_type = 1;
        obj.quantity_unit = this.allot_standards.packsize_unit_id
        obj.package_nums = this.addAllot.quantity
        obj.quantity =Number(this.allot_standards.packsize)*Number(this.addAllot.quantity)*Number(this.allot_standards.package.packnumber)
      }
      this.loading_allot = true
      profit_create(obj, "transfer_create", this);
    },
    close_allot() {
      this.allot_Dialog = false;
      this.addAllot = {
        package_type: "",
        prod_id: "",
        company_id: "",
        warehouse_id: "",
        company_id_to: "",
        warehouse_id_to: "",
        quantity: "",
        quantity_unit: "",
        package_nums: "",
        inventory_id: "",
        package_id: "",
        shelf_to: "",
        shelf: ""
      };
      this.profit_data = {};
      this.selec_shelf = [];
      this.history_list = [];
      this.selects = "";
      this.history_currentPage = 1;
    },
    xintest(item){
      this.$router.push({
        path: "/Warehouse/inventory/test",
        name: "Warehouse-test",
        query: {
          id:item.id,
          batchno: item.batchno
        }
      });
    },
    testClick_a(batchno){
      var clickList = {
        page: "1",
        id:'',
        batchno: ""
      };
      clickList.batchno = batchno;
      clickList.id = this.addTest.inventory_id
      listPost(clickList, "sample/history").then(res => {
        this.test_hosdata = res.data;
      });
    },
    testClick(item) {
      this.addTest.inventory_id = item.id;
      this.addTest.prod_id = item.prod_id
      this.test_status.id = item.id
      this.test_status.prod_id = item.prod_id
      this.test_status.checked_note = item.checked_note
      var clickList = {
        page: "1",
        id:'',
        batchno: ""
      };
      clickList.batchno = item.batchno;
      clickList.id = item.id;
      this.test_batchno = item.batchno
      listPost(clickList, "sample/history").then(res => {
        this.test_hosdata = res.data;
        this.addTest.note = res.inventory.order.checked_requirement
        for (var i in res.enum.testitems) {
          if (res.enum.testitems[i].child) {
            var arr = [];
            obj(arr, res.enum.testitems[i].child);
            res.enum.testitems[i].child = arr;
          }
        }
        obj(this.testitems, res.enum.testitems);
        this.sampled_status = res.enum.sampled_status
        this.test_Dialog = true;
      });
    },
    add_test() {
      var testitems = JSON.parse(JSON.stringify(this.testitems));
      var arr = [];
      testitems.forEach((i, j) => {
        if (i.checked == true) {
          arr.push(i);
        }
      });
      arr.forEach(m => {
        var brr = [];
        if (m.child) {
          m.child.forEach(i => {
            if (i.checked == true) {
              brr.push(i);
            }
          });
          m.child = brr;
        }
      });
      var object = {};
      arr.forEach((item, index) => {
        if (item.child && item.child.length > 0) {
          var crr = [];
          item.child.forEach(i => {
            crr.push(i.id);
          });
          object[item.id] = crr;
        } else {
          object[item.id] = [];
        }
      });
      this.addTest.testitems = JSON.parse(JSON.stringify(object));
      this.save_fy = true;
      // create(this.addTest, "sample", "extraCreate", this);
      createCheck(this.addTest,this)
    },
    close_test() {
      this.test_Dialog = false;
      this.testitems = [];
      this.addTest = {
        inventory_id: "",
        testitems: [],
        note: "",
        prod_id:''
      };
      this.test_status = {
        id: "",
        prod_id:'',
        order_result: "",
        if_need_check: "",
        checked_note: ""
      };
    },
    recheckClick(item) {
      this.addRecheck.inventory_id = item.id;
      var clickList = {
        page: "1",
        batchno: item.batchno
      };
      listPost(clickList, "sample/reviewCheckForm").then(res => {
        this.testitems = res.data.testitems;
        this.recheck_Dialog = true;
      });
    },
    add_recheck() {
      var testitems = JSON.parse(JSON.stringify(this.testitems));
      var arr = [];
      testitems.forEach((i, j) => {
        if (i.checked == true) {
          arr.push(i);
        }
      });
      arr.forEach(m => {
        var brr = [];
        if (m.child) {
          m.child.forEach(i => {
            if (i.checked == true) {
              brr.push(i);
            }
          });
          m.child = brr;
        }
      });
      var object = {};
      arr.forEach((item, index) => {
        if (item.child && item.child.length > 0) {
          var crr = [];
          item.child.forEach(i => {
            crr.push(i.id);
          });
          object[item.id] = crr;
        } else {
          object[item.id] = [];
        }
      });
      this.addRecheck.testitems = JSON.parse(JSON.stringify(object));
      this.save_fy = true;
      create(this.addRecheck, "sample", "reviewCheck", this);
    },
    close_recheck() {
      this.recheck_Dialog = false;
      this.testitems = [];
      this.addRecheck = {
        inventory_id: "",
        testitems: [],
        note: ""
      };
    },
    statusClick(id) {
      this.test_status.id = id;
      this.test_statusDialog = true;
    },
    change_status() {
      change_checked_result(this.test_status, this);
    },
    close_change_status() {
      this.test_statusDialog = false;
      this.test_status = {
        id: "",
        prod_id:'',
        order_result: "",
        if_need_check: "",
        checked_note: ""
      };
    },
    spec_list(id) {
      this.spec_notice = {}
      this.spec = []
      spec(id).then(res => {
        this.spec = res.data;
        this.spec_notice = res.chemprod
        this.spec_Dialog = true;
      });
      this.spec_id = id;
      this.CommonSpec = this.GEnums.CommonSpec;
      this.Standardpurity = this.GEnums.Standardpurity;
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
      this.dialogSpec = true;
    },
    spec_edit(item) {
      this.spec_item = JSON.parse(JSON.stringify(item));
      this.dialogSpec = true;
    },
    spec_save(item) {
      if (this.spec_item.id) {
        spec_update(item, this);
      } else {
        spec_create(item, this.spec_id, this);
      }
    },
    notice_save(item){
      this.notice_loading = true
      var obj = {
        prod_id:item.prod_id,
        notice_size:item.notice_size?item.notice_size:''
      }
      setNoticeSize(obj,this)
    },
    del_inventory(index) {
      spec_delete(index, this);
    },
    select() {
      this.testitems.forEach((items, index) => {
        if (items.child && items.child.length > 0) {
          var num = 0;
          items.child.forEach((m, n) => {
            if (!m.checked) {
              num++;
            }
          });
          if (num == items.child.length) {
            this.$set(this.testitems[index], "checked", false);
          } else {
            this.$set(this.testitems[index], "checked", true);
          }
        }
      });
    },
    Search() {
      this.loading_search = true;
      this.queryList.page = 1;
      // this.show_number = this.queryList.stock_status
      this.fetchData();
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
    revise(item) {
      this.Appearance= {
        id: item.id,
        chemprodappearance_id: item.chemprodappearance_id,
        quantity:'',
        unit_id:item.unit_id
      }
      this.reviseDialog = true;
    },
    change_revise() {
      changeAppearance(this.Appearance, this);
    },
    close_revise() {
      this.reviseDialog = false;
      this.Appearance = {
        id: "",
        chemprodappearance_id: "",
        quantity:'',
        unit_id:''
      };
    },
    print(item, item_i,a) {
      // let data = {
      //   批号: item.batchno,
      //   外观: this.getEnumValue(
      //     this.ChemicalAppearance,
      //     item.chemprodappearance_id
      //   )
      //     ? this.getEnumValue(
      //         this.ChemicalAppearance,
      //         item.chemprodappearance_id
      //       )
      //     : item.characterinfo,
      //   数量:
      //     item_i.quantity +
      //     this.getEnumValue(this.units, item_i.quantity_unit_id),
      //   货架: item_i.shelf,
      //   CAS: item.cas,
      //   id: item.batchno,
      //   configID: 1
      // };

      
      var storage_cond = ''
      if(item.storage_cond&&item.storage_cond.length>0){
        item.storage_cond.forEach((i,index)=>{
          if(index!=(item.storage_cond.length-1)){
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)+'、'
          }else{
            storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i)
          }
        })
      }
      let data=[];
      if(a){
         data={
          批号: item.batchno,
          存储条件:storage_cond,
          外观: this.getEnumValue(
            this.ChemicalAppearance,
            item.chemprodappearance_id
          )
            ? this.getEnumValue(
                this.ChemicalAppearance,
                item.chemprodappearance_id
              )
            : item.characterinfo,
          数量:
            (Number(item_i.stock)*Number(item_i.packsize)) +
            this.getEnumValue(this.units, item_i.packsize_unit_id),
          货架: item_i.shelf,
          CAS: item.cas,
          id: item.batchno,
          configID: 1
        };
      }else{
         data={
          批号: item.batchno,
          存储条件:storage_cond,
          外观: this.getEnumValue(
            this.ChemicalAppearance,
            item.chemprodappearance_id
          )
            ? this.getEnumValue(
                this.ChemicalAppearance,
                item.chemprodappearance_id
              )
            : item.characterinfo,
          数量:
            item_i.quantity +
            this.getEnumValue(this.units, item_i.quantity_unit_id),
          货架: item_i.shelf,
          CAS: item.cas,
          id: item.batchno,
          configID: 1
        };
      }
        $.ajax({
            url: "http://127.0.0.1:8080/mac/codePrint.jsp",
            method: "post",
            data: data,
            success: function(res) {
                if (res && res.code == 0) {
                    this.$message({
                        message: "success",
                        type: "success"
                    });
                } else {
                    this.$message({
                        message: res.msg,
                        type: "error"
                    });
                }
            },
            error: function() {},
        });
    }
  }
};
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
function GetPercent(num, total) {
  /// <summary>
  /// 求百分比
  /// </summary>
  /// <param name="num">当前数</param>
  /// <param name="total">总数</param>
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0%" : Math.round((num / total) * 10000) / 100.0 + "%";
}
</script>
