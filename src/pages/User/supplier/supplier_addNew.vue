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
table {
  border-collapse: collapse;
  font-size: 13px;
  .td_pad{
    td{
      padding: 0px 5px;
      line-height: 30px;
      font-weight: bolder;
    }
  }
  .td_{
    td{
      padding: 0px 5px;
      line-height: 25px;
    }
  }
}
.form {
  /deep/.el-input__inner {
    border: 1px solid #dcdfe6;
    padding: 0 15px;
    border-radius: 4px;
  }
  /deep/.el-form-item__label {
    text-align: right;
    color: black;
  }
  .el-row {
    margin-top: 10px;
  }
}
/deep/.el-input__inner {
  width: 100%;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
  border-bottom-width: 0px;
  border-radius: 0;
  padding: 0px 5px;
  /*outline: medium;*/
}
/deep/.el-form-item__label {
  text-align: left;
  color: black;
}
.jc {
  /deep/.el-input__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-radius: 0;
    /*outline: medium;*/
  }
  /deep/.el-tabs__item.is-active {
    color: green;
    font-weight: bold;
  }
  /deep/.el-tabs__active-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background-color: green;
  }
  /deep/.el-tabs__item:hover {
    color: green;
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
}
</style>

<template>
  <d2-container>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first" class="jc">
        <el-row :gutter="20">
          <el-col :span="10">
            <el-form label-width="100px">
              <el-form-item label="供应商名称" required>
                <el-input size="mini" v-model="basis.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="英文名称">
                <el-input size="mini" v-model="basis.english_name" clearable></el-input>
              </el-form-item>
              <el-form-item label="国家" required>
                <el-select v-model="basis.country_code" @change="selected_country(basis.country_code)" filterable size="mini" placeholder>
                  <el-option
                    v-for="(item,index) in country"
                    :key="index"
                    :label="item.Name"
                    :value="item.Code"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="省 城市">
                <el-row>
                  <el-col :span="12">
                    <el-select v-model="basis.province_code" 
                                filterable
                                clearable
                                @change="selected_province()"
                                size="mini">
                        <el-option
                                v-for="(i,index) in province"
                                :key="index"
                                :label="i.province_code"
                                :value="i.province_code">
                        </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-select v-model="basis.city_id" 
                                filterable
                                clearable
                                size="mini">
                        <el-option
                                v-for="(i,index) in city"
                                :key="index"
                                :label="i.Name"
                                :value="i.ID">
                        </el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="免检金额">
                <el-input size="mini" v-model="basis_exemption_amounts.amount" clearable style="width:80%;"></el-input>
                <el-select size="mini" v-model="basis_exemption_amounts.currency_id" style="width:20%;" placeholder="选择货币" clearable>
                    <el-option
                            v-for="item in currencys"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="主营产品类别" >
                <el-select v-model="basis.product_sorts" multiple filterable size="mini" placeholder clearable>
                  <el-option
                    v-for="(item,index) in product_sort"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="经营方式" >
                <el-select v-model="basis.business_mode_id" filterable size="mini" placeholder clearable>
                  <el-option
                    v-for="(item,index) in business_modes"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-checkbox style="margin-right:20px;" v-model="basis.is_stop" :true-label="2"  :false-label="1">停用</el-checkbox>
                <el-checkbox v-model="basis.is_exemption" :true-label="1"  :false-label="2">免检</el-checkbox>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10">
            <el-form label-width="100px">
              <el-form-item label="付款方式" >
                <el-select v-model="basis.pay_way" size="mini" clearable>
                    <el-option
                            v-for="item in pay_ways"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="网址" >
                <el-input size="mini" v-model='basis.web_site' clearable></el-input>
              </el-form-item>
              <el-form-item label="父公司">
                <el-select
                        v-model="basis.pid"
                        filterable
                        clearable
                        remote
                        reserve-keyword
                        :remote-method="supplyMethod"
                        :loading="supplyloading"
                        style="width:100%;"
                        size="mini"
                >
                    <el-option
                            v-for="item in parent_company"
                            :label="item.name"
                            :key="item.id"
                            :value="item.id"
                    ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发票类型" required>
                <el-select v-model="basis.invoice_type" size="mini" clearable>
                    <el-option
                            v-for="item in InvoiceInfo"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="供应商类别" >
                <el-select v-model="basis.supplier_status" size="mini" clearable>
                    <el-option
                            v-for="item in supplier_status_info"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="发货地址" >
                <el-input size="mini" v-model="basis.ship_address" ></el-input>
              </el-form-item>
              <el-form-item label="备注" >
                <el-input size="mini" v-model="basis.remark" ></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div style="text-align:right;margin-top:10px;">
          <el-button type="primary" size="mini" :loading='loading_base' @click="save_basis()">保存</el-button>
          <el-button size="mini" @click="black()">取消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="联系人" name="third">
        <div>
          <el-button @click="add_contracts()" type="primary" size="mini">添加</el-button>
        </div> 
        <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;">
          <tr class="td_pad">
            <td width="60">ID</td>
            <td width="80">名称</td>
            <td width="120">固话</td>
            <td width="120">电话</td>
            <td width="120">传真</td>
            <td width="100">QQ</td>
            <td >Email</td>
            <td width="40">默认</td>
            <td width="80">创建者</td>
            <td width="80">创建日期</td>
            <td width="100">操作</td>
          </tr>
          <tr v-for="(item,index) in contracts.data" class="td_">
            <td>{{item.id}}</td>
            <td>{{item.name}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.phone}}</td>
            <td>{{item.fax}}</td>
            <td>{{item.qq}}</td>
            <td>{{item.email}}</td>
            <td>
              <i v-if="item.is_default" style="color:green;" class="el-icon-check"></i>
              <i v-else style="color:red;" class="el-icon-close"></i>
            </td>
            <td>{{getEnumValue(Users,item.user_id)}}</td>
            <td>{{item.created_at}}</td>
            <td>
              <el-button @click="edit_contracts(item)" type="primary" size="mini">编辑</el-button>
              <el-button
                @click="delete_contracts(item,index)"
                type="danger"
                size="mini"
                style="margin-left:5px;"
              >删除</el-button>
            </td>
          </tr>
        </table>
        <el-pagination
                background
                @current-change="handleCurrentChange_contracts"
                :current-page.sync="currentPage_contracts"
                layout="prev, pager, next"
                :page-size="contracts.per_page"
                :total="contracts.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="银行账户" name="fourth">
        <div>
          <el-button @click="bank_accouts_add()" type="primary" size="mini">添加</el-button>
        </div>
        <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;">
          <tr class="td_pad">
            <td width="60">ID</td>
            <td width='150'>账户名称</td>
            <td width='60'>性质</td>
            <td width='160'>账户号码</td>
            <td width='160'>开户行</td>
            <td width='80'>国家</td>
            <td width='80'>省</td>
            <td width='80'>市</td>
            <td>备注</td>
            <td width="100">操作</td>
          </tr>
          <tr v-for="(item,index) in bank_accouts.data" class="td_">
            <td>{{item.id}}</td>
            <td>{{item.payee}}</td>
            <td>{{getEnumValue(bank_account_type_info,item.type)}}</td>
            <td>{{item.bank_account_number}}</td>
            <td>{{item.opening_bank}}</td>
            <td>{{item.country_code}}</td>
            <td>{{item.province_code}}</td>
            <td>{{item.city_name}}</td>
            <td>{{item.remark}}</td>
            <td>
              <el-button @click="bank_accouts_edit(item)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini" style="margin-left:5px;" @click="bank_accouts_delete(item,index)">删除</el-button>
            </td>
          </tr>
        </table>
        <el-pagination
                background
                @current-change="handleCurrentChange_bank"
                :current-page.sync="currentPage_bank"
                layout="prev, pager, next"
                :page-size="bank_accouts.per_page"
                :total="bank_accouts.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="产品目录" name="fifth" v-if="member_id">
        <div class="form" style="display:flex;justify-content: space-between;align-items: center;">
          <div>
            <el-button type="primary" size="mini" @click="prod_list_add()" v-if="permission_names['prod.providedSupplierProdSave']=='prod.providedSupplierProdSave'">添加</el-button>
            <el-button type="primary" size="mini" @click="is_prod_import=!is_prod_import" v-if="permission_names['prod.providedProdUpload']=='prod.providedProdUpload'">导入</el-button>
            <el-button type="warning" size="mini" @click="delet_prod_list()" v-if="permission_names['prod.deleteProvidedSupplierProds']=='prod.deleteProvidedSupplierProds'">清空目录</el-button>
          </div>
          <div v-show="!is_prod_import" style="display:flex;justify-content: space-between;align-items: center;">
            <div v-if="api_t">
              <search :api="api" :id='member_id' @data="get_lists($event)"></search>
            </div>
          </div>
        </div>
        <div v-if="!is_prod_import">
          <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;" >
            <tr class="td_pad">
              <td width="60">ID</td>
              <td>产品目录号</td>
              <td width='100'>CAS</td>
              <td>产品中文名称</td>
              <td>产品英文名称</td>
              <td width='60'>库存量</td>
              <td width='60'>价格</td>
              <td>备注</td>
              <td width='60'>创建者</td>
              <td width='130'>创建日期</td>
              <td width="120">
                <el-checkbox v-model="prod_check" @change="check_all()"></el-checkbox>
                操作
                <el-button type="danger" size="mini" @click="delet_prod_all()" v-if="permission_names['prod.deleteProvidedSupplierProds']=='prod.deleteProvidedSupplierProds'">删除</el-button>
              </td>
            </tr>
            <tr v-for="(item,index) in prods.data" class="td_">
              <td>{{item.id}}</td>
              <td>{{item.no}}</td>
              <td>{{item.cas}}</td>
              <td>{{item.name_cn}}</td>
              <td>{{item.name}}</td>
              <td>{{item.instore}}</td>
              <td>{{item.price}}</td>
              <td>{{item.note}}</td>
              <td>{{getEnumValue(Users,item.user_id)}}</td>
              <td>{{item.created_at}}</td>
              <td>
                <el-checkbox v-model="item.check" @change="check_item()"></el-checkbox>
                <el-button type="primary" size="mini" @click="edit_prod(item)" v-if="permission_names['prod.providedSupplierProdSave']=='prod.providedSupplierProdSave'">编辑</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="delet_prod(item.id)"
                  v-if="permission_names['prod.deleteProvidedSupplierProds']=='prod.deleteProvidedSupplierProds'"
                  style="margin-left:5px;">
              删除</el-button>
              </td>
            </tr>
          </table>
          <el-pagination
            background
            @current-change="handleCurrentChange_prod"
            :current-page.sync="currentPage_prod"
            :page-size="prods.per_page"
            layout="total, prev, pager, next"
            :total="prods.total"
          ></el-pagination>
        </div>
        <div style="margin: 20px;" v-else>
            <formSupplierCanProvide :company_id="member_id" @prod_close="prod_close($event)"></formSupplierCanProvide>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收货地址" name="sixth">
        <el-tabs type="border-card" style="margin-top:20px;">
          <el-tab-pane label="收货地址">
            <div>
              <el-button @click="add_receive_good()" type="primary" size="mini">添加</el-button>
            </div>
            <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;">
              <tr class="td_pad">
                <td width="60">ID</td>
                <td width="80">名称</td>
                <td width="100">电话</td>
                <td width="140">Email</td>
                <td >收货地址</td>
                <td width="40">默认</td>
                <td width="80">创建者</td>
                <td width="80">创建日期</td>
                <td width='40'>状态</td>
                <td width="100">操作</td>
              </tr>
              <tr v-for="(item,index) in receive_good_address.data" class="td_">
                <td>{{item.id}}</td>
                <td>{{item.contact_name}}</td>
                <td>{{item.mobile}}</td>
                <td>{{item.email}}</td>
                <td>{{item.address}}</td>
                <td>
                  <i v-if="item.is_default" style="color:green;" class="el-icon-check"></i>
                  <i v-else style="color:red;" class="el-icon-close"></i>
                </td>
                <td>{{getEnumValue(Users,item.user_id)}}</td>
                <td>{{item.created_at}}</td>
                <td>
                  <i v-if="!item.deleted_at" style="color:green;" class="el-icon-check"></i>
                  <i v-else style="color:red;" class="el-icon-close"></i>
                </td>
                <td>
                  <el-button @click="edit_receive_good(item)" type="primary" size="mini">编辑</el-button>
                  <el-button
                    @click="delete_receive_good(item,index)"
                    :type="item.deleted_at?'success':'danger'"
                    size="mini"
                    style="margin-left:5px;"
                  >{{item.deleted_at?'启用':'作废'}}</el-button>
                </td>
              </tr>
            </table>
            <el-pagination
                    background
                    @current-change="handleCurrentChange_receive_good"
                    :current-page.sync="currentPage_receive_good"
                    layout="prev, pager, next"
                    :page-size="receive_good_address.per_page"
                    :total="receive_good_address.total">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="开票信息" name="seventh">
        <div>
          <el-button type="primary" size="mini" @click="add_invoice()">添加</el-button>
        </div>
        <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;">
          <tr class="td_pad">
            <td width="60">ID</td>
            <td width="100">公司名称</td>
            <td width="140">税号</td>
            <td>地址</td>
            <td width="100">电话</td>
            <td width="100">开户行</td>
            <td width="140">银行账号</td>
            <td width='40'>默认</td>
            <td width="100">操作</td>
          </tr>
          <tr v-for="(item,index) in invoice_list.data" class="td_">
            <td>{{item.id}}</td>
            <td>{{item.company_name}}</td>
            <td>{{item.duty_paragraph}}</td>
            <td>{{item.address}}</td>
            <td>{{item.mobile}}</td>
            <td>{{item.opening_bank}}</td>
            <td>{{item.bank_account_number}}</td>
            <td>
              <i v-if="item.is_default" style="color:green;" class="el-icon-check"></i>
              <i v-else style="color:red;" class="el-icon-close"></i>
            </td>
            <td>
              <el-button type="primary" size="mini" @click="edit_invoice(item)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="delete_invoice(item,index)"
                style="margin-left:5px;"
              >删除</el-button>
            </td>
          </tr>
        </table>
        <el-pagination
                background
                @current-change="handleCurrentChange_invoice"
                :current-page.sync="currentPage_invoice"
                layout="prev, pager, next"
                :page-size="invoice_list.per_page"
                :total="invoice_list.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <!-- 收货地址 -->
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" class="form" width="40%">
      <el-form label-width="80px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="国家：">
              <el-select v-model="good_address_form.country_code"  filterable clearable
                          @change="selected_country_address(good_address_form)"
                          size="mini">
                  <el-option
                          v-for="(i,index) in country"
                          :key="index"
                          :label="i.Name"
                          :value="i.Code">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市：">
              <el-select v-model="good_address_form.city_id"  filterable size="mini" clearable>
                  <el-option
                          v-for="(i,index) in good_address_form.city"
                          :key="index"
                          :label="i.Name"
                          :value="i.ID">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址：" required>
              <el-input size="mini" v-model="good_address_form.address" clearable type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人：" required>
              <el-input size="mini" v-model="good_address_form.contact_name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话：" required>
              <el-input size="mini" v-model="good_address_form.mobile" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱：">
              <el-input size="mini" v-model="good_address_form.email" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="默认：">
              <el-switch
                name="is_default"
                v-model="good_address_form.is_default"
                :active-value="1"
                :inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="save_receive_good(good_address_form)">保存</el-button>
        <el-button size="mini" @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 联系人 -->
    <el-dialog title="联系人" :visible.sync="dialogContracts" class="form" width="50%">
      <div style="text-align:right;">
        <span style="color:red;font-size:13px;">(*邮箱，QQ，电话，固话必填至少两个)</span>
      </div>
      <el-form label-width="80px" label-position="right">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名称：" required>
              <el-input size="mini" v-model="contracts_form.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机：">
              <el-input size="mini" v-model="contracts_form.phone" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邮箱：">
              <el-input size="mini" v-model="contracts_form.email" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="固话：">
              <el-input size="mini" v-model="contracts_form.mobile" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="传真：">
              <el-input size="mini" v-model="contracts_form.fax" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Skype：">
              <el-input size="mini" v-model="contracts_form.skype" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="QQ：">
              <el-input size="mini" v-model="contracts_form.qq" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签：">
              <el-input size="mini" v-model="contracts_form.tag" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="备注：">
              <el-input size="mini" v-model="contracts_form.remark" clearable type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="默认：">
              <el-switch
                name="is_default"
                v-model="contracts_form.is_default"
                :active-value="1"
                :inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="save_contracts(contracts_form)">保存</el-button>
        <el-button size="mini" @click="dialogContracts = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 银行账户 -->
    <el-dialog title="银行账户" :visible.sync="dialogBank" class="form" width="60%">
      <el-form label-width="100px" label-position="right">
        <el-row>
          <el-col :span="8">
            <el-form-item label="国家：">
              <el-select v-model="bank_accouts_form.country_code"  filterable clearable
                          @change="selected_country_form(bank_accouts_form)"
                          size="mini">
                  <el-option
                          v-for="(i,index) in country"
                          :key="index"
                          :label="i.Name"
                          :value="i.Code">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="省：">
              <el-select v-model="bank_accouts_form.province_code" filterable clearable
                          @change="selected_province_form(bank_accouts_form)"
                          size="mini">
                  <el-option
                          v-for="(i,index) in bank_accouts_form.province"
                          :key="index"
                          :label="i.province_code"
                          :value="i.province_code">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="市：">
              <el-select v-model="bank_accouts_form.city_id" filterable clearable
                          size="mini">
                  <el-option
                          v-for="(i,index) in bank_accouts_form.city"
                          :key="index"
                          :label="i.Name"
                          :value="i.ID">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开户行：" required>
              <el-input size="mini" v-model="bank_accouts_form.opening_bank" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款人：" required>
              <el-input size="mini" v-model="bank_accouts_form.payee" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="银行帐号：" required>
              <el-input size="mini" v-model="bank_accouts_form.bank_account_number" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="类型：" required>
              <el-select size="mini" v-model="bank_accouts_form.type" clearable>
                <el-option
                  v-for="(item,index) in bank_account_type_info"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="备注：">
              <el-input size="mini" v-model="bank_accouts_form.remark" clearable type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="默认：">
              <el-switch
                v-model="bank_accouts_form.is_default"
                :active-value="1"
                :inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="save_bank_account(bank_accouts_form)">保存</el-button>
        <el-button size="mini" @click="dialogBank = false">取消</el-button>
      </div>
    </el-dialog>

     <!-- 开票信息 -->
    <el-dialog title="开票信息" :visible.sync="dialogInvoice" class="form" width="40%">
      <el-form label-width="100px" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司名称:" required>
              <el-input v-model="invoice_form.company_name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="税号:" required>
              <el-input v-model="invoice_form.duty_paragraph" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="地址：" >
              <el-input size="mini" v-model="invoice_form.address" clearable type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电话:" >
              <el-input v-model="invoice_form.mobile" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开户行:" >
              <el-input v-model="invoice_form.opening_bank" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="银行账号" >
              <el-input v-model="invoice_form.bank_account_number" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="默认：">
              <el-switch
                name="is_default"
                v-model="invoice_form.is_default"
                :active-value="1"
                :inactive-value="0"
                active-text="开"
                inactive-text="关"
              ></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="save_invoice(invoice_form)">保存</el-button>
        <el-button size="mini" @click="dialogInvoice = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 产品目录 -->
    <el-dialog title="产品信息" :visible.sync="dialogProd" class="form" width="40%">
      <el-form label-width="100px" label-position="right">
        <el-form-item label="中文名称:">
          <el-input size="mini" v-model="prod_form.name_cn" clearable></el-input>
        </el-form-item>
        <el-form-item label="英文名称:">
          <el-input size="mini" v-model="prod_form.name" clearable></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="目录号:">
              <el-input size="mini" v-model="prod_form.no" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="CAS:" required>
              <el-input size="mini" v-model="prod_form.cas" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存量:">
              <el-input size="mini" v-model="prod_form.instore" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价格:">
              <el-input size="mini" v-model="prod_form.price" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：">
              <el-input size="mini" v-model="prod_form.note" clearable type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="save_prod()">保存</el-button>
        <el-button size="mini" @click="dialogProd = false">取消</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  lists,
  deleteProvidedSupplier,
  deleteProvidedSupplierProds,
  ProvidedSupplierProdSave,
  v2_create_supplier,
  edit_update_supplier,
  get_member_contact,
  get_receive_address,
  get_member_invoice,
  get_bank_accouts,
  prod_change_vue,
  v2_de_create,
  v2_update,
  v2_destroy,
  v2_edit,
  edit,
  update,
  destroy,
  country_list,
  province_list,
  city_list,
  member_company
} from "@/api/user";
import search from "@/components/search/index2";
import $ from "jquery";
import util from "@/libs/util";
import { mapState, mapActions } from "vuex";
import request from '@/plugin/axios'
import formSupplierCanProvide from '../supplierCanProvidedImport/supplierCanProvided'
export default {
  name: "User-supplier_addNew",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      activeName: "first",
      activeName_import:"first",
      currentPage: 1,
      dialogTableVisible: false,
      dialogContracts: false,
      dialogBank: false,
      checked: false,
      supplyloading: false,
      dialogInvoice:false,
      is_prod_import:false,
      loading_base:false,
      member_id: "",
      //基础信息
      basis_exemption_amounts:{
        amount: "",
        currency_id: "",
        status: 1
      },
      basis: {
        name: "",
        english_name: "",
        country_code: "CHN",
        province_code:'',
        city_id:'',
        exemption_amounts:[],
        pay_way: "",
        business_mode_id: "",
        product_sorts: [],
        pid: "",
        type: 2,
        remark: "",
        ship_address:'',
        invoice_type:'',
        supplier_status:1,
        is_stop:1,
        is_exemption:2
      },
      //联系人
      query_contact:{
          member_id:'',
          page:''
      },
      currentPage_contracts:1,
      contracts: {},
      contracts_form:{
        name: '',
        phone: '',
        email: '',
        mobile: '',
        fax: '',
        skype: '',
        qq: '',
        remark: '',
        tag: '',
        is_default: 0,
        member_id: '',
      },
      //产品
      currentPage_prod:1,
      prod_check:false,
      dialogProd:false,
      prod_form:{},
      prod_ids:[],
      prod_vue:{},
      prods:{},
      //银行
      user_id:'',
      query_bank:{
          member_id:'',
          page:''
      },
      currentPage_bank:1,
      bank_accouts:{},
      bank_accouts_form:{
          user_id: "",
          member_id: "",
          province: [],
          city: [],
          country_code: "",
          province_code: "",
          city_id: "",
          type: "",
          opening_bank: "",
          payee: "",
          bank_account_number: "",
          remark: "",
          is_default: 0
      },
      //开票信息
      query_invoice:{
          member_id:'',
          page:''
      },
      currentPage_invoice:1,
      invoice_list: {},
      invoice_form:{
        company_name: '',
        duty_paragraph: '',
        address: '',
        mobile: '',
        opening_bank: '',
        bank_account_number: '',
        is_default: 0,
        member_id: ''
      },
      //收货地址
      query_good:{
          type:'',
          member_id:'',
          page:''
      },
      currentPage_receive_good:1,
      receive_good_address:{},
      good_address_form:{
        country_code: "",
        city_id: "",
        city: [],
        address: "",
        contact_name: "",
        mobile: "",
        email: "",
        is_default: 0,
        type: 2,
        member_id: ""
      },
      create: false,
      city: [],
      province:[],
      restaurants: [],
      state4: "",
      timeout: null,
      country: [],
      company: [],
      pay_ways: [],
      business_modes: [],
      currencys: [],
      product_sort: [],
      parent_company: [],
      user_type: [],
      supplier_status_info:[],
      bank_account_type_info:[],
      Users:[],
      Unit:[],
      InvoiceInfo:[],
      useID: "",
      api:'',
      api_t:false
    };
  },
  components: {
      search,
      formSupplierCanProvide,
  },
  created() {
    this.useID = this.$route.query.id;
    if(this.$route.query.id){
      this.api_t = true
    }
  },
  watch: {
    $route (to, from) {
        if(to.name=='User-supplier_addNew'){
          this.useID = this.$route.query.id
          if(this.$route.query.new){
            this.fetchData();
          }
        }
    },
    useID(to, form) {
      if (to != form) {
        this.aaa()
        this.fetchData();
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    ...mapActions('d2admin/page',['closeAdd']),
    aaa() {
      this.api_t = false
      this.$nextTick(() => {
        this.api_t = true
      })
    },
    fetchData() {
      this.activeName="first"
      if(this.$route.query.new){this.$route.query.new = false}
      this.basis_exemption_amounts={
        amount: "",
        currency_id: "",
        status: 1
      }
      this.contracts={}
      this.invoice_list = {}
      this.parent_company = []
      this.receive_good_address = {}
      this.prod_vue={}
      this.prods={}
      this.bank_accouts = {}
      if(this.$route.query.id){
        this.member_id = this.$route.query.id
        this.api = 'api/v1/form/providedSupplierProdIndexForm?company_id='+this.member_id
        this.is_prod_import = false
        v2_edit('supplier', this.member_id).then(res=>{
          this.basis = res.data
          this.user_id=res.data.user_id;
          if(!this.basis.pid){
            this.basis.pid = ''
          }
          if(res.data.exemption_amounts.length>0){
            this.basis_exemption_amounts = res.data.exemption_amounts[0]
          }else{
            this.basis_exemption_amounts={
              amount: "",
              currency_id: "",
              status: 1
            }
          }
          if(res.data.parent){
              this.parent_company=[{
                  id: res.data.parent.id,
                  name: res.data.parent.name
              }]
          }
          province_list(this.basis.country_code).then(res => {
              this.province = res.data
          })
          if(this.basis.province_code){
            city_list(this.basis.country_code,this.basis.province_code).then(res => {
                this.city = res.data;
            })
          }
          this.receive_good_address_get()
          this.member_contact_get()
          this.get_invoice()
          this.bank_accouts_get()
        })
        lists(this.queryList, 'supplier').then(res=>{
          this.pay_ways = res.enum.pay_ways;
          this.user_type = res.enum.user_type;
          this.supplier_status_info = res.enum.supplier_status_info
          this.bank_account_type_info = res.enum.bank_account_type_info
        })
      }else{
        this.member_id = ''
        this.api = ''
        this.basis={
          name: "",
          english_name: "",
          country_code: "CHN",
          province_code:'',
          city_id:'',
          exemption_amounts:[],
          pay_way: "",
          business_mode_id: "",
          product_sorts: [],
          pid: "",
          type: 2,
          remark: "",
          ship_address:'',
          supplier_status:1,
          is_stop:1,
          is_exemption:2
        }
        // this.basis_exemption_amounts={
        //   amount: "",
        //   currency_id: "",
        //   status: 1
        // }
        // this.contracts={}
        // this.invoice_list = {}
        // this.parent_company = []
        // this.receive_good_address = {}
        // this.prod_vue={}
        // this.prods={}
        // this.bank_accouts = {}
        this.is_prod_import = false
        lists('', "supplier/add").then(res => {
          this.pay_ways = res.enum.pay_ways;
          this.user_type = res.enum.user_type;
          this.supplier_status_info = res.enum.supplier_status_info
          this.bank_account_type_info = res.enum.bank_account_type_info
          this.basis.pay_way = this.pay_ways[0].id;
        });
        province_list(this.basis.country_code).then(res => {
            this.province = res.data
        })
      }
      this.country = this.GEnums.Country;
      this.currencys = this.GEnums.Currency;
      this.business_modes = this.GEnums.OperationType;
      this.product_sort = this.GEnums.SupplierTag;
      this.Users = this.GEnums.Users;
      this.Unit = this.GEnums.Unit;
      this.InvoiceInfo = this.GEnums.InvoiceInfo;
    },
    fetchData_b(){
      this.basis_exemption_amounts={
        amount: "",
        currency_id: "",
        status: 1
      }
      this.contracts={}
      this.invoice_list = {}
      this.parent_company = []
      this.receive_good_address = {}
      this.prod_vue={}
      this.prods={}
      this.bank_accouts = {}
      
      this.member_id = this.$route.query.id
      this.api = 'api/v1/form/providedSupplierProdIndexForm?company_id='+this.member_id
      this.api_t = true
      v2_edit('supplier', this.member_id).then(res=>{
        this.user_id=res.data.user_id;
        this.basis = res.data
        if(!this.basis.pid){
            this.basis.pid = ''
          }
        if(res.data.exemption_amounts.length>0){
          this.basis_exemption_amounts = res.data.exemption_amounts[0]
        }else{
          this.basis_exemption_amounts={
            amount: "",
            currency_id: "",
            status: 1
          }
        }
        if(res.data.parent){
            this.parent_company=[{
                id: res.data.parent.id,
                name: res.data.parent.name
            }]
        }
        province_list(this.basis.country_code).then(res => {
            this.province = res.data
        })
        if(this.basis.province_code){
          city_list(this.basis.country_code,this.basis.province_code).then(res => {
              this.city = res.data;
          })
        }
        this.receive_good_address_get()
        this.member_contact_get()
        this.get_invoice()
        this.bank_accouts_get()
      })
    },
    get_lists(obj){
        this.prods = JSON.parse(JSON.stringify(obj)).data;
        this.prod_vue = JSON.parse(JSON.stringify(obj))
        this.prod_vue.params.page = ''
        this.prod_vue.params.per_page = 20
        this.get_prod_form()
    },
    get_prod_form(){
      this.prod_ids = [];
      this.prod_check = false
      let prod_vue = this.prod_vue
      if(prod_vue.method == 'post'||'POST'){
        request({
            url: process.env.VUE_APP_API + prod_vue.url,
            method: 'POST',
            data: prod_vue.params
        }).then(res => {
            if (res && res.code == 0) {
              res.data.data.forEach(i=>{
                i.check = false
              })
              this.prods = res.data
            }
        }).catch(rr => {
        })
      }else{
        request({
            url: process.env.VUE_APP_API + prod_vue.url,
            method: 'GET',
            params:  prod_vue.params
        }).then(res => {
            if (res && res.code == 0) {
              res.data.data.forEach(i=>{
                i.check = false
              })
              this.prods = res.data
            }
        }).catch(rr => {
        })
      }
    },
    prod_close(event){
      this.is_prod_import = event
    },
    prod_list_add(){
      this.prod_form = {
        company_id:this.member_id,
        cas:'',
        name_cn:'',
        name:'',
        instore:'',
        note:'',
        price:'',
        no:''
      }
      this.dialogProd = true
    },
    edit_prod(item){
      this.prod_form = JSON.parse(JSON.stringify(item))
      this.dialogProd = true
    },
    save_prod(){
      if(this.prod_form.id){
        ProvidedSupplierProdSave(this.prod_form,this)
      }else{
        ProvidedSupplierProdSave(this.prod_form,this)
      }
    },
    check_all(){
      this.prod_ids = [];
      this.prods.data.forEach(item=>{
        item.check = this.prod_check
        if(this.prod_check){
          this.prod_ids.push(item.id)
        }
      })
    },
    check_item(){
      this.prod_ids = [];
      let num = 0;
      this.prods.data.forEach(item=>{
        if(item.check){
          num++
          this.prod_ids.push(item.id)
        }
      })
      if (num == this.prods.data.length) {
          this.prod_check = true;
      } else {
          this.prod_check = false;
      }
    },
    delet_prod_list(){
      deleteProvidedSupplier(this.member_id,this)
    },
    delet_prod(id){
      deleteProvidedSupplierProds([id],this)
    },
    delet_prod_all(){
      deleteProvidedSupplierProds(this.prod_ids,this)
    },
    handleCurrentChange_prod(page_current) {
      this.prod_vue.params.page = this.currentPage_prod = page_current;
      this.get_prod_form()
    },
    supplyMethod(query) {
        if (query !== "") {
            setTimeout(() => {
                member_company(query,'2',this.member_id).then(res => {
                    this.parent_company = res.data;
                });
            }, 200);
        } else {
            this.parent_company = [];
        }
    },
    selected_country_form(item){
      item.province_code=''
      item.city_id=''
      province_list(item.country_code).then(res => {
          item.province = res.data;
          this.$forceUpdate()
      })
    },
    selected_province_form(item){
      item.city_id=''
      city_list(item.country_code,item.province_code).then(res => {
          item.city = res.data;
          this.$forceUpdate()
      })
    },
    selected_country(){
      this.basis.province_code = ''
      this.basis.city_id = ''
      this.province = []
      this.city = []
      province_list(this.basis.country_code).then(res => {
          this.province = res.data
      })
    },
    selected_province(){
        if(this.basis.city_id){
            this.basis.city_id=''
        }
        if(this.basis.province_code){
          city_list(this.basis.country_code,this.basis.province_code).then(res => {
              this.city = res.data;
          })
        }else{
          this.city = []
        }
    },
    selected_country_address(item) {
      if (item.city_id) {
        item.city_id = "";
      }
      city_list(item.country_code, "").then(res => {
        this.$set(item, "city", res.data);
      });
    },
    save_basis(){
      this.basis.exemption_amounts = []
      if(this.basis_exemption_amounts.amount){
        this.basis.exemption_amounts.push(this.basis_exemption_amounts)
      }
      var basis = JSON.parse(JSON.stringify(this.basis))
      if(!basis.pid){
        basis.pid = 0
      }
      this.loading_base = true
      if (this.member_id) {
          edit_update_supplier(basis, this)
      } else {
          v2_create_supplier(basis,this)
      }
    },
    add_deliver() {
      this.deliver_good.push({
        express_company_id: "",
        accounts: "",
        is_straight_hair: true,
        member_id: ""
      });
    },
    add_contracts() {
      this.contracts_form = {
        name: '',
        phone: '',
        email: '',
        mobile: '',
        fax: '',
        skype: '',
        qq: '',
        remark: '',
        tag: '',
        is_default: 0,
        member_id: '',
        user_type: 102,
      }
      this.dialogContracts = true
    },
    edit_contracts(item){
      this.contracts_form = JSON.parse(JSON.stringify(item))
      this.dialogContracts = true
    },
    save_contracts(item) {
        item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'supplier', 'contract_update', this)
        } else {
            v2_de_create(item, 'supplier', 'contract_create', this)
        }
    },
    member_contact_get(){
        this.query_contact.member_id = this.member_id
        get_member_contact(this.query_contact,'supplier').then(res=>{
            this.contracts = res.data
            this.contracts.per_page = parseInt(res.data.per_page)
        })
    },
    handleCurrentChange_contracts(page_current){
        this.query_contact.page = this.currentPage_contracts = page_current;
        this.member_contact_get()
    },
    add_invoice(){
      this.invoice_form = {
        company_name: '',
        duty_paragraph: '',
        address: '',
        mobile: '',
        opening_bank: '',
        bank_account_number: '',
        is_default: 0,
        member_id: ''
      }
      this.dialogInvoice = true
    },
    edit_invoice(item){
      this.invoice_form = JSON.parse(JSON.stringify(item))
      this.dialogInvoice = true
    },
    save_invoice(item){
      item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'supplier', 'invoice_update', this)
        } else {
            v2_de_create(item, 'supplier', 'invoice_create', this)
        }
    },
    delete_invoice(item,index){
        v2_destroy(item, "supplier", "invoice_destory", this);
    },
    handleCurrentChange_invoice(page_current){
        this.query_invoice.page = this.currentPage_invoice = page_current;
        this.get_invoice()
    },
    get_invoice (){
        this.query_invoice.member_id = this.member_id
        get_member_invoice(this.query_invoice,'supplier').then(res=>{
            this.invoice_list = res.data
            this.invoice_list.per_page = parseInt(res.data.per_page)
        })
    },
    receive_address_get(){},
    receive_good_address_get(){
        this.query_good.member_id = this.member_id
        this.query_good.type = 2
        get_receive_address(this.query_good,'supplier').then(res=>{
            this.receive_good_address = res.data
            this.receive_good_address.per_page = parseInt(res.data.per_page)
            this.receive_good_address.data.forEach((items, index) => {
                if(items.country_code){
                    city_list(items.country_code,'').then(res => {
                        this.$set(items,'city',res.data);
                    })
                }
            })
        })
    },
    handleCurrentChange_receive_good(page_current) {
        this.query_good.page = this.currentPage_receive_good = page_current;
        this.receive_good_address_get()
    },
    add_receive_good() {
      this.good_address_form = {
          country_code: "",
          city_id: "",
          city: [],
          address: "",
          contact_name: "",
          mobile: "",
          email: "",
          is_default: 0,
          type: 2,
          member_id: ""
      }
      this.dialogTableVisible = true;
    },
    edit_receive_good(item){
      this.good_address_form =JSON.parse(JSON.stringify(item))
      this.dialogTableVisible = true;
    },
    close_receive_good() {
      this.dialogTableVisible = false;
    },
    save_receive_good(item) {
        item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'supplier', 'receive_address_update', this)
        } else {
            v2_de_create(item, 'supplier', 'receive_address_create', this)
        }
    },
    bank_accouts_get(){
      this.query_bank.member_id = this.member_id
      get_bank_accouts(this.query_bank,'supplier').then(res=>{
          this.bank_accouts = res.data
          this.bank_accouts.per_page = parseInt(res.data.per_page)
          this.bank_accouts.data.forEach((items, index) => {
                if(items.country_code){
                    city_list(items.country_code,'').then(res => {
                        items.city_name = res.data.filter(i=>{return i.ID==items.city_id})[0]?res.data.filter(i=>{return i.ID==items.city_id})[0].Name:''
                        this.$forceUpdate()
                    })
                }
            })
      })
    },
    handleCurrentChange_bank(page_current) {
        this.query_bank.page = this.currentPage_receive_good = page_current;
        this.bank_accouts_get()
    },
    bank_accouts_add(){
      this.bank_accouts_form={
          user_id: "",
          member_id: "",
          province: [],
          city: [],
          country_code: "",
          province_code: "",
          city_id: "",
          type: "",
          opening_bank: "",
          payee: "",
          bank_account_number: "",
          remark: "",
          is_default: 0
      }
      this.dialogBank = true
    },
    bank_accouts_edit(item){
      this.bank_accouts_form =JSON.parse(JSON.stringify(item))
      this.bank_accouts_form.province = []
      this.bank_accouts_form.city = []
      province_list(this.bank_accouts_form.country_code).then(res => {
          this.bank_accouts_form.province = res.data;
          this.$forceUpdate()
      })
      city_list(this.bank_accouts_form.country_code,this.bank_accouts_form.province_code).then(res => {
          this.bank_accouts_form.city = res.data;
          this.$forceUpdate()
      })
      this.dialogBank = true;
    },
    save_bank_account(item){
        item.user_id = this.user_id
        item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'supplier', 'bank_account_update', this)
        } else {
            v2_de_create(item, 'supplier', 'bank_account_create', this)
        }
    },
    bank_accouts_delete(item,index){
      if (item.id) {
          v2_destroy(item, 'supplier', 'bank_account_destory', this)
      } 
    },
    delete_contracts(item, index) {
      if (item.id) {
        v2_destroy(item, "supplier", "contract_destory", this);
      } 
    },
    delete_receive_good(item, index) {
      if (item.id) {
        if(item.deleted_at){
            item.enabled_state = 1
        }else{
            item.enabled_state = 0
        }
        var obj = {
            id:[item.id],
            enabled_state:item.enabled_state
        }
        v2_destroy(obj, "supplier", "receive_address_destory", this);
      } 
    },
    black(){
      let that=this
      var tagName = 'User-supplier_addNew'
      that.closeAdd({tagName})
      that.$router.push({
          path: "/User/supplier_index_new",
          name: "User-supplier_index_new",
      });
    }
  }
};
</script>
