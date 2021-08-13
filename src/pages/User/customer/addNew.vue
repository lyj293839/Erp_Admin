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
      line-height: 20px;
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
.form_small /deep/ .el-form-item__content{margin-left: 80px !important;}
.form_small /deep/ .el-form-item__label{width: 80px !important;}
</style>

<template>
  <d2-container>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="first" class="jc">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form label-width="110px">
              <el-form-item label="客户名称" required>
                <el-input size="mini" v-model="basis.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="客户英文名称">
                <el-input size="mini" v-model="basis.english_name" clearable></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="国家" required >
                    <el-select v-model="basis.country_code" filterable size="mini" @change="country_change(basis.country_code)" placeholder clearable>
                      <el-option
                        v-for="(item,index) in country"
                        :key="index"
                        :label="item.Name"
                        :value="item.Code"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" class="form_small">
                  <el-form-item label="重要等级" required>
                    <el-select v-model="basis.level_id" filterable size="mini" placeholder clearable>
                      <el-option
                        v-for="(item,index) in levels"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item label="客户类别">
                <el-select
                  v-model="basis.customer_type"
                  filterable
                  size="mini"
                  placeholder
                  clearable
                  @change="select_customer(basis.customer_type)"
                >
                  <el-option
                    v-for="(item,index) in customer_type_info"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开发负责人">
                <el-select v-model="persons_three.duty_user_id" filterable size="mini" placeholder clearable>
                  <el-option
                    v-for="(item,index) in user_lists"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="第一负责人">
                <el-select v-model="persons_one.duty_user_id" filterable size="mini" placeholder clearable>
                  <el-option
                    v-for="(item,index) in user_lists"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="第二负责人">
                <el-select v-model="persons_two.duty_user_id" filterable size="mini" placeholder clearable>
                  <el-option
                    v-for="(item,index) in user_lists"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="结算方式">
                <el-select v-model="basis.payment_day_id" filterable size="mini" placeholder clearable>
                  <el-option
                    v-for="(item,index) in payment_day_info"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账期类型">
                <el-radio-group v-model="basis.account_period_type" size="small" :disabled="permission_names['customer.set_billing_period']=='customer.set_billing_period'?false:true">
                  <el-radio v-for="i in account_period_type_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="额度">
                <el-input size="mini" v-if="basis.accounts.length>0" clearable style="width:85%;" v-model='basis.accounts[0].quota'></el-input>
                <span>人民币</span>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="basis.is_stop" :true-label="2"  :false-label="1">停用</el-checkbox>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form label-width="110px">
              <el-form-item label="国外银行账户">
                <el-input size="mini" v-model='basis.foreign_bank_account' clearable></el-input>
              </el-form-item>
              <el-form-item label="开户银行名称">
                <el-input size="mini" v-model='basis_invoices.opening_bank' clearable></el-input>
              </el-form-item>
              <el-form-item label="银行账号" >
                <el-input size="mini" v-model='basis_invoices.bank_account_number' clearable></el-input>
              </el-form-item>
              <el-form-item label="税号" >
                <el-input size="mini" v-model='basis_invoices.duty_paragraph' clearable></el-input>
              </el-form-item>
              <el-form-item label="开票电话">
                <el-input size="mini" v-model='basis_invoices.mobile' clearable></el-input>
              </el-form-item>
              <el-form-item label="开票抬头" >
                <el-input size="mini" v-model='basis_invoices.company_name' clearable></el-input>
              </el-form-item>
              <el-form-item label="开票地址">
                <el-input size="mini" v-model='basis_invoices.address' clearable></el-input>
              </el-form-item>
              <el-form-item label="电子发票邮箱">
                <el-input size="mini" v-model='basis_invoices.receive_invoice_email' clearable></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="账期天数" >
                    <el-input size="mini" v-model="basis.payment_days" clearable :disabled="permission_names['customer.set_billing_period']=='customer.set_billing_period'?false:true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="月结日期" label-width="70px">
                    <el-input size="mini" v-model='basis.statementat' clearable @change="inputChange" :disabled="permission_names['customer.set_billing_period']=='customer.set_billing_period'?false:true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item label="网址">
                <el-input size="mini" v-model='basis.web_site' clearable></el-input>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8">
            <el-form label-width="125px">
              <el-form-item label="定制报价公式">
                <el-input size="mini" v-model='basis_prices_formulas1.formula' clearable></el-input>
              </el-form-item>
              <el-form-item label="现货报价公式">
                <el-input size="mini" v-model='basis_prices_formulas2.formula' clearable></el-input>
              </el-form-item>
              <el-form-item label="标签打印po">
                <!--<el-input size="mini" v-model='basis.label_po' clearable></el-input>-->
                <el-radio-group v-model="basis.label_po" size="small">
                  <el-radio v-for="i in label_po_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="发票显示海关编码">
                <!--<el-input size="mini" v-model='basis.invoice_hs' clearable></el-input>-->
                <el-radio-group v-model="basis.invoice_hs" size="small">
                  <el-radio v-for="i in invoice_hs_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否自动发货">
                <el-radio-group v-model="basis.if_auto_delivery" size="small">
                  <el-radio :label="1">自动</el-radio>
                  <el-radio :label="0">不自动</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="特殊客户">
                <el-radio-group v-model="basis.special_customer" size="small">
                  <el-radio v-for="i in special_customer_info" :key="i.id" :label="i.id">{{i.name}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否黑名单">
                <el-radio-group v-model="basis.is_black_cust" size="small">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">正常</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否重要客户">
                <el-radio-group v-model="basis.is_important" size="small">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <span slot="label">询单级别
                   <el-tooltip class="item" effect="dark" content="选KG级时，询单如果是kg级别的，那么分给项目部" placement="top">
                     <i class="el-icon-question red"></i>
                    </el-tooltip>
                </span>
                <el-select v-model="basis.inquiry_level" filterable size="mini" placeholder clearable>
                  <el-option
                          label="KG以下"
                          value="KG以下"
                  ></el-option>
                  <el-option
                          label="KG级"
                          value="KG级"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input size="mini" v-model='basis.remark' clearable></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <div style="text-align:right;margin-top:10px;">
          <el-button type="primary" size="mini" @click='basis_save()' :loading="loading_base">保存</el-button>
          <el-button size="mini" @click="black()">取消</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="发货地址" name="second">
        <el-form label-width="110px">
          <el-form-item label="发货账号:" required>
            <table border="1" bordercolor="#E5E5E5" style="line-height:30px;">
              <tr class="td_pad">
                <td width='120'>快递公司</td>
                <td width='180'>快递账号</td>
                <td width='40'>状态</td>
                <td align='center' width='120'>
                  <el-button @click="add_deliver()" type="primary" size="mini">添加</el-button>
                </td>
              </tr>
              <tr v-for="(item,index) in deliver_good">
                <td>
                  <el-select v-model="item.express_company_id" size="mini" placeholder>
                    <el-option
                      v-for="(i,index) in express_company"
                      :key="index"
                      :label="i.name"
                      :value="i.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="item.accounts" size="mini" placeholder></el-input>
                </td>
                <td style="padding:0px 5px;">
                  <i v-if="!item.deleted_at&&item.id" style="color:green;" class="el-icon-check"></i>
                  <i v-else-if="item.deleted_at&&item.id" style="color:red;" class="el-icon-close"></i>
                  <span v-else></span>
                </td>
                <td style="text-align:center;">
                  <el-button type="primary" size="mini" @click="save_deliver(item)">{{$t('save')}}</el-button>
                  <el-button @click="delete_deliver(item,index)" :type="item.deleted_at?'success':'danger'" size="mini">
                    {{item.deleted_at?'启用':'作废'}}
                  </el-button>
                </td>
              </tr>
            </table>
          </el-form-item>
        </el-form>
        <el-tabs type="border-card" style="margin-top:20px;">
          <el-tab-pane label="收货地址">
            <div>
              <el-button @click="add_receive_good(2)" type="primary" size="mini">添加</el-button>
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
          <el-tab-pane label="收票地址">
            <div>
              <el-button @click="add_receive_good(1)" type="primary" size="mini">添加</el-button>
            </div>
            <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;">
              <tr class="td_pad">
                <td width="60">ID</td>
                <td width="80">名称</td>
                <td width="100">电话</td>
                <td width="140">Email</td>
                <td >收票地址</td>
                <td width="40">默认</td>
                <td width="80">创建者</td>
                <td width="80">创建日期</td>
                <td width='40'>状态</td>
                <td width="100">操作</td>
              </tr>
              <tr v-for="(item,index) in receive_address.data" class="td_">
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
                    @current-change="handleCurrentChange_receive_address"
                    :current-page.sync="currentPage_receive_address"
                    layout="prev, pager, next"
                    :page-size="receive_address.per_page"
                    :total="receive_address.total">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <!-- <el-tab-pane label="状态统计" name="third"></el-tab-pane> -->
      <el-tab-pane label="联系人" name="fourth">
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
      <el-tab-pane label="开票信息" name="fifth">
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
            <td width="140">接受电子邮箱</td>
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
            <td>{{item.receive_invoice_email}}</td>
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
      <el-tab-pane label="国外银行账户" name="sixth">
        <div>
          <el-button type="primary" size="mini" @click="add_accound()">添加</el-button>
        </div>
        <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;text-align:center;">
          <tr class="td_pad">
            <td width="60">ID</td>
            <td>国外银行账号</td>
            <td width='100'>默认</td>
            <td width="150">操作</td>
          </tr>
          <tr v-for="(item,index) in accound_list.data" class="td_">
            <td>{{item.id}}</td>
            <td>{{item.foreign_bank_account}}</td>
            <td>
              <i v-if="item.is_default" style="color:green;" class="el-icon-check"></i>
              <i v-else style="color:red;" class="el-icon-close"></i>
            </td>
            <td>
              <el-button type="primary" size="mini" @click="edit_accound(item)">编辑</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="delete_accound(item.id)"
                style="margin:5px;"
              >删除</el-button>
            </td>
          </tr>
        </table>
        <el-pagination
                    background
                    @current-change="handleCurrentChange_accound"
                    :current-page.sync="currentPage_accound"
                    layout="prev, pager, next"
                    :page-size="accound_list.per_page"
                    :total="accound_list.total">
            </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="自动置空负责人记录" v-if="useID" name="six">
        <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top:10px;">
          <tr class="td_pad">
            <td width="60">ID</td>
            <td width='140'>操作时间</td>
            <td width='100'>负责人</td>
            <td width='100'>分配人员</td>
            <td width='100'>类型</td>
            <td align='center'>备注</td>
          </tr>
          <tr v-for="(item,index) in person_logs_list.data" class="td_">
            <td>{{item.id}}</td>
            <td>{{item.created_at}}</td>
            <td>{{getEnumValue(enum_log.responsible_level,item.member_responsible_person?item.member_responsible_person.responsible_level_id:'')}}</td>
            <td>{{item.member_responsible_person.users.name}}</td>
            <td>{{getEnumValue(enum_log.del_type_info,item.type)}}</td>
            <td>{{item.remark}}</td>
          </tr>
        </table>
        <el-pagination
                background
                @current-change="handleCurrentChange_log"
                :current-page.sync="currentPage_log"
                layout="prev, pager, next"
                :page-size="person_logs_list.per_page"
                :total="person_logs_list.total">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <!-- 收货地址 -->
    <el-dialog :title="good_address_form.type==1?'收票地址':'收货地址'" :visible.sync="dialogTableVisible" class="form" width="40%">
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
        <span style="color:red;font-size:13px;">(*邮箱，QQ，电话，固话必填一个)</span>
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

    <!-- 开票信息 -->
    <el-dialog title="开票信息" :visible.sync="dialogInvoice" class="form" width="50%">
      <el-form label-width="150px" label-position="left">
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
            <el-form-item label="接受电子发票邮箱:" >
              <el-input v-model="invoice_form.receive_invoice_email" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="银行账号:" >
              <el-input v-model="invoice_form.bank_account_number" size="mini"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" @click="save_invoice(invoice_form)">保存</el-button>
        <el-button size="mini" @click="dialogTableVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 账户信息 -->
    <el-dialog title="账户信息" :visible.sync="dialogAccound" class="form" width="450px">
      <el-form label-width="90px" label-position="left">
        <el-form-item label="银行账号:" required>
          <el-input v-model="accound_form.foreign_bank_account" size="mini"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;margin-top:10px;">
        <el-button type="primary" size="mini" :loading='loading_acound' @click="save_accound(accound_form)">保存</el-button>
        <el-button size="mini" @click="dialogAccound = false">取消</el-button>
      </div>
    </el-dialog>

  </d2-container>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { mapState, mapActions } from "vuex";
import {
  lists,
  v2_create,
  v2_de_create,
  v2_update,
  v2_destroy,
  v2_edit,
  edit_update,
  get_receive_address,
  get_member_contact,
  get_member_invoice,
  get_member_foreign_bank_account,
  foreign_bank_account_update,
  foreign_bank_account_destory,
  edit,
  update,
  update_responsible,
  destroy,
  country_list,
  province_list,
  city_list,
  member_company,
  auto_clear_responsible_person_logs,
  foreign_bank_account_create
} from "@/api/user";
export default {
  name: "User-addNew",
  data() {
    return {
      activeName: "first",
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      dialogTableVisible: false,
      dialogContracts: false,
      dialogInvoice:false,
      loading_base:false,
      dialogAccound:false,
      loading_acound:false,
      member_id: "",
      address_type:'',
      query_good:{
          type:'',
          member_id:'',
          page:''
      },
      query_address:{
          type:'',
          member_id:'',
          page:''
      },
      query_contact:{
          member_id:'',
          page:''
      },
      query_invoice:{
          member_id:'',
          page:''
      },
      query_accound:{
        member_id:'',
        page:''
      },
      currentPage_receive_address:1,
      currentPage_receive_good:1,
      currentPage_contracts:1,
      currentPage_invoice:1,
      currentPage_log:1,
      currentPage_accound:1,
      //基础信息
      persons_three:{
        duty_user_id:'',
        responsible_level_id: 1103,
      },
      persons_one:{
        duty_user_id:'',
        responsible_level_id: 1101,
      },
      persons_two:{
        duty_user_id:'',
        responsible_level_id: 1102,
      },
      basis_invoices:{
        company_name: '',
        duty_paragraph: '',
        address: '',
        mobile: '',
        opening_bank: '',
        bank_account_number: '',
        receive_invoice_email:'',
        is_default: 1,
      },
      basis_prices_formulas1:{
        formula: '',
        formula_type_id: 1,
        status: 1,
      },
      basis_prices_formulas2:{
        formula: '',
        formula_type_id: 2,
        status: 1,
      },
      payment_day_info: [],
      customer_type_info: [],
      levels: [],
      basis: {
        name: "",
        english_name: "",
        country_code: "",
        customer_type: 3,
        payment_day_id: "",
        statementat:'',
        level_id: "",
        type: 1,
        sort:1,
        remark: "",
        web_site:'',
        foreign_bank_account:'',
        is_stop :1,
        if_auto_delivery:0,
        is_black_cust:0,
        is_important:0,
        inquiry_level:'',
        special_customer:'',
        account_period_type:1,
        payment_days:'',
        responsible_persons:[],
        accounts:[{
            quota: '',
            currency_id: 2,
            status: 1,
        }],
        invoices:[],
        prices_formulas:[],
        label_po:1,
        invoice_hs:1,
      },
      payment_day_info_: {},
      //联系人
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
      formula_type: [],
      currencys: [],
      //发货
      deliver_good: [
        {
          express_company_id: "",
          accounts: "",
          member_id: ""
        }
      ],
      express_company: [],
      //收货地址
      receive_good_address: {},
      receive_address:{},
      good_address_form:{
        country_code: "",
        city_id: "",
        city: [],
        address: "",
        contact_name: "",
        mobile: "",
        email: "",
        is_default: 0,
        type: '',
        member_id: ""
      },
      //开票信息
      invoice_list:{},
      invoice_form:{
        company_name: '',
        duty_paragraph: '',
        address: '',
        mobile: '',
        opening_bank: '',
        bank_account_number: '',
        receive_invoice_email:'',
        is_default: 0,
        member_id: ''
      },
      //账户
      accound_list:{},
      accound_form:{
        foreign_bank_account: '',
        is_default: 0,
        member_id:''
      },
      //记录
      person_logs_list:{},
      enum_log:{},
      special_customer_info:[],
      useID:'',
      Users:[],
      country: [],
      city: [],
      user_type: [],
      user_lists:[],
      label_po_info:[],
      invoice_hs_info:[],
      account_period_type_info:[]
    };
  },
  watch: {
      $route (to, from) {
          if(to.name=='User-addNew'){
            this.useID = this.$route.query.id
            if(this.$route.query.new){
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
  created() {
    // this.fetchData();
    this.useID = this.$route.query.id;
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    ...mapActions('d2admin/page',['closeAdd']),
    fetchData() {
        this.activeName="first",
        this.member_id = ''
        this.invoice_list={}
        this.receive_good_address={}
        this.deliver_good=[
            {
                express_company_id: "",
                accounts: "",
                member_id: ""
            }
        ]
        this.contracts={}
        this.receive_address={}
        this.basis = {
            name: "",
            english_name: "",
            country_code: "",
            customer_type: 3,
            payment_day_id: "",
            statementat:'',
            level_id: "",
            type: 1,
            sort:1,
            remark: "",
            web_site:'',
            foreign_bank_account:'',
            is_stop :1,
            if_auto_delivery:0,
            is_black_cust:0,
            is_important:0,
            inquiry_level:'',
            special_customer:1,
            account_period_type:'',
            payment_days:'',
            responsible_persons:[],
            accounts:[{
                quota: '',
                currency_id: 2,
                status: 1,
            }],
            invoices:[],
            prices_formulas:[],
            label_po:1,
            invoice_hs:1
        }
        this.persons_one={
            duty_user_id:'',
            responsible_level_id: 1101,
        }
        this.persons_two={
            duty_user_id:'',
            responsible_level_id: 1102,
        }
        this.persons_three={
            duty_user_id:'',
            responsible_level_id: 1103,
        }
        this.basis_invoices={
            company_name: '',
            duty_paragraph: '',
            receive_invoice_email:'',
            address: '',
            mobile: '',
            opening_bank: '',
            bank_account_number: '',
            is_default: 1,
        }
        this.basis_prices_formulas1={
            formula: '',
            formula_type_id: 1,
            status: 1,
        }
        this.basis_prices_formulas2={
            formula: '',
            formula_type_id: 2,
            status: 1,
        }
      if(this.$route.query.new){this.$route.query.new = false}
      if(this.$route.query.id){
        this.member_id = this.$route.query.id
        v2_edit('customer', this.member_id).then(res => {
          this.basis = JSON.parse(JSON.stringify(res.data))
          var accounts = [{
              quota: '',
              currency_id: 2,
              status: 1,
          }]
          if(res.data.responsible_persons.length>0){
            res.data.responsible_persons.forEach(i=>{
              if(i.responsible_level_id==1101){
                this.persons_one.duty_user_id = i.duty_user_id
              }
              if(i.responsible_level_id==1102){
                this.persons_two.duty_user_id = i.duty_user_id
              }
              if(i.responsible_level_id==1103){
                this.persons_three.duty_user_id = i.duty_user_id
              }
            })
          }
          if(res.data.prices_formulas.length>0){
            res.data.prices_formulas.forEach(i=>{
              if(i.formula_type_id==1){
                this.basis_prices_formulas1 = i
              }
              if(i.formula_type_id==2){
                this.basis_prices_formulas2 = i
              }
            })
          }
          if(res.data.accounts.length==0){
            this.basis.accounts = accounts
          }
          if(res.data.invoices.length>0){
            this.basis_invoices = res.data.invoices[0]
          }
          this.deliver_good = res.data.deliver_goods
          if(this.deliver_good.length==0){
            this.deliver_good=[
              {
                express_company_id: "",
                accounts: "",
                member_id: ""
              }
            ]
          }
          if(!this.basis.is_black_cust){
            this.basis.is_black_cust = 0
          }
          if(!this.basis.is_important){
            this.basis.is_important = 0
          }
          this.customer_type_info = res.enum.customer_type_info;
          this.payment_day_info_ = res.enum.payment_day_info;
          this.currencys = res.enum.currencys;
          this.formula_type = res.enum.formula_type;
          this.levels = res.enum.levels;
          this.user_type = res.enum.user_type;
          this.express_company = res.enum.express_company;
          this.label_po_info=res.enum.label_po_info;
          this.invoice_hs_info=res.enum.invoice_hs_info
          this.payment_day_info = this.payment_day_info_[this.basis.customer_type];
          // this.select_customer(this.basis.customer_type)
          this.Users = this.GEnums.Users;
          this.account_period_type_info = res.enum.account_period_type_info
          this.getAccound()
          this.receive_address_get()
          this.receive_good_address_get()
          this.member_contact_get()
          this.get_invoice()
          this.person_logs_get()
        })
      }else{
        // this.activeName="first",
        // this.member_id = ''
        // this.invoice_list={}
        // this.receive_good_address={}
        // this.deliver_good=[
        //   {
        //     express_company_id: "",
        //     accounts: "",
        //     member_id: ""
        //   }
        // ]
        // this.contracts={}
        // this.receive_address={}
        this.basis = {
          name: "",
          english_name: "",
          country_code: "",
          customer_type: 3,
          payment_day_id: "",
          statementat:'',
          level_id: "",
          type: 1,
          sort:1,
          remark: "",
          web_site:'',
          foreign_bank_account:'',
          is_stop :1,
          if_auto_delivery:0,
          is_black_cust:0,
          is_important:0,
          inquiry_level:'',
          special_customer:1,
          account_period_type:1,
          payment_days:'',
          responsible_persons:[],
          accounts:[{
              quota: '',
              currency_id: 2,
              status: 1,
          }],
          invoices:[],
          prices_formulas:[],
          label_po:1,
          invoice_hs:1
        }
        // this.persons_one={
        //   duty_user_id:'',
        //   responsible_level_id: 1101,
        // }
        // this.persons_two={
        //   duty_user_id:'',
        //   responsible_level_id: 1102,
        // }
        // this.basis_invoices={
        //   company_name: '',
        //   duty_paragraph: '',
        //   address: '',
        //   mobile: '',
        //   opening_bank: '',
        //   bank_account_number: '',
        //   is_default: 1,
        // }
        // this.basis_prices_formulas1={
        //   formula: '',
        //   formula_type_id: 1,
        //   status: 1,
        // }
        // this.basis_prices_formulas2={
        //   formula: '',
        //   formula_type_id: 2,
        //   status: 1,
        // }
        lists(this.queryList, "customer/add").then(res => {
          if (res && res.code == 0) {
            this.customer_type_info = res.enum.customer_type_info;
            this.payment_day_info_ = res.enum.payment_day_info;
            this.currencys = res.enum.currencys;
            this.formula_type = res.enum.formula_type;
            this.levels = res.enum.levels;
            this.user_type = res.enum.user_type;
            this.express_company = res.enum.express_company;
            this.select_customer(this.basis.customer_type)
            this.Users = this.GEnums.Users;
            this.label_po_info=res.enum.label_po_info;
            this.invoice_hs_info=res.enum.invoice_hs_info
            this.account_period_type_info = res.enum.account_period_type_info
          }
        });
      }
      country_list().then(res => {
        this.country = res.data;
      });
      let query_list = {
        user_type: 102
      };
      lists(query_list, 'data/user_list').then(res => {
          this.user_lists = res.data
      })
      this.special_customer_info = JSON.parse(this.$route.query.special_customer_info)
    },
    fetchData_b(){
      v2_edit('customer', this.member_id).then(res => {
          this.basis = res.data
          var accounts = [{
              quota: '',
              currency_id: 2,
              status: 1,
          }]
          if(res.data.responsible_persons.length>0){
            res.data.responsible_persons.forEach(i=>{
              if(i.responsible_level_id==1101){
                this.persons_one.duty_user_id = i.duty_user_id
              }
              if(i.responsible_level_id==1102){
                this.persons_two.duty_user_id = i.duty_user_id
              }
              if(i.responsible_level_id==1103){
                this.persons_three.duty_user_id = i.duty_user_id
              }
            })
          }
          if(res.data.prices_formulas.length>0){
            res.data.prices_formulas.forEach(i=>{
              if(i.formula_type_id==1){
                this.basis_prices_formulas1 = i
              }
              if(i.formula_type_id==2){
                this.basis_prices_formulas2 = i
              }
            })
          }
          if(res.data.accounts.length==0){
            this.basis.accounts = accounts
          }
          if(res.data.invoices.length>0){
            this.basis_invoices = res.data.invoices[0]
          }
          this.deliver_good = res.data.deliver_goods
          if(this.deliver_good.length==0){
            this.deliver_good=[
              {
                express_company_id: "",
                accounts: "",
                member_id: ""
              }
            ]
          }
          this.customer_type_info = res.enum.customer_type_info;
          this.payment_day_info_ = res.enum.payment_day_info;
          this.currencys = res.enum.currencys;
          this.formula_type = res.enum.formula_type;
          this.levels = res.enum.levels;
          this.user_type = res.enum.user_type;
          this.express_company = res.enum.express_company;
          this.label_po_info=res.enum.label_po_info;
          this.invoice_hs_info=res.enum.invoice_hs_info;
          this.payment_day_info = this.payment_day_info_[this.basis.customer_type];
          // this.select_customer(this.basis.customer_type)
          this.Users = this.GEnums.Users;
          this.getAccound()
          this.receive_address_get()
          this.receive_good_address_get()
          this.member_contact_get()
          this.person_logs_get()
          this.get_invoice()
        })
    },
    basis_save(){
      var basis = JSON.parse(JSON.stringify(this.basis))
      if(!basis.accounts[0].quota){
        basis.accounts = []
      }
      basis.responsible_persons = []
      basis.invoices = []
      basis.prices_formulas = []
      if(this.persons_one.duty_user_id){
        basis.responsible_persons.push(this.persons_one)
      }
      if(this.persons_two.duty_user_id){
        basis.responsible_persons.push(this.persons_two)
      }
      if(this.persons_three.duty_user_id){
        basis.responsible_persons.push(this.persons_three)
      }
      if(this.basis_prices_formulas1.formula){
        basis.prices_formulas.push(this.basis_prices_formulas1)
      }
      if(this.basis_prices_formulas2.formula){
        basis.prices_formulas.push(this.basis_prices_formulas2)
      }
      if(this.basis_invoices.company_name||this.basis_invoices.duty_paragraph||this.basis_invoices.address||this.basis_invoices.mobile||this.basis_invoices.opening_bank||this.basis_invoices.bank_account_number||this.basis_invoices.receive_invoice_email){
        basis.invoices.push(this.basis_invoices)
      }
      this.loading_base = true
      if(this.member_id){
        basis.id = this.member_id
        edit_update(basis, this)
      }else{
        v2_create(basis,this)
      }
    },
    inputChange() { //输入框值改变
      this.basis.statementat = this.basis.statementat.replace(/^(0+)|[^\d]+/g,'')
    },
    country_change(name){
      if(name=='CHN'){
          if(!this.$route.query.id){
              this.basis.inquiry_level=''
          }
          this.basis.level_id = 7
      }else if(name=='IND'){
          if(!this.$route.query.id){
             this.basis.inquiry_level=''
          }
          this.basis.level_id = 9
      }else if(name=='KOR'){
          if(!this.$route.query.id){
             this.basis.inquiry_level=''
          }
          this.basis.level_id = 8
      }else{
          if(!this.$route.query.id) {
              this.basis.inquiry_level = 'KG级'
          }
          this.basis.level_id = 8
      }
    },
    select_customer(id) {
      if(id){
        this.payment_day_info = this.payment_day_info_[id];
        this.basis.payment_day_id = this.payment_day_info[0].id;
      }else{
        this.payment_day_info = []
        this.basis.payment_day_id = ''
      }
    },
    add_deliver() {
      this.deliver_good.push({
        express_company_id: "",
        accounts: "",
        member_id: ""
      });
    },
    member_contact_get(){
        this.query_contact.member_id = this.member_id
        get_member_contact(this.query_contact,'customer').then(res=>{
            this.contracts = res.data
            this.contracts.per_page = parseInt(res.data.per_page)
        })
    },
    person_logs_get(){
      auto_clear_responsible_person_logs(this.member_id).then(res=>{
          this.person_logs_list = res.data
          this.person_logs_list.per_page = parseInt(res.data.per_page)
          this.enum_log = res.enum
      })
    },
    add_accound(){
      this.accound_form = {
        foreign_bank_account: '',
        is_default: 0,
        member_id:''
      }
      this.dialogAccound = true
    },
    edit_accound(item){
      this.accound_form = JSON.parse(JSON.stringify(item))
      this.dialogAccound = true
    },
    save_accound(item){
      item.member_id = this.member_id
      this.loading_acound = true
      if (item.id) {
          foreign_bank_account_update(item,this)
      } else {
          foreign_bank_account_create(item,this)
      }
    },
    delete_accound(index){
      foreign_bank_account_destory(index,this)
    },
    getAccound(){
      this.query_accound.member_id = this.member_id
      get_member_foreign_bank_account(this.query_accound,'customer').then(res=>{
        this.accound_list = res.data
      })
    },
    receive_good_address_get(){
        this.query_good.member_id = this.member_id
        this.query_good.type = 2
        get_receive_address(this.query_good,'customer').then(res=>{
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
    receive_address_get(){
        this.query_address.member_id = this.member_id
        this.query_address.type = 1
        get_receive_address(this.query_address,'customer').then(res=>{
            this.receive_address = res.data
            this.receive_address.per_page = parseInt(res.data.per_page)
            this.receive_address.data.forEach((items, index) => {
                if(items.country_code){
                    city_list(items.country_code,'').then(res => {
                        this.$set(items,'city',res.data);
                    })
                }
            })
        })
    },
    get_invoice (){
        this.query_invoice.member_id = this.member_id
        get_member_invoice(this.query_invoice,'customer').then(res=>{
            this.invoice_list = res.data
            this.invoice_list.per_page = parseInt(res.data.per_page)
        })
    },
    handleCurrentChange_receive_address(page_current) {
        this.query_address.page = this.currentPage_receive_address = page_current;
        this.receive_address_get()
    },
    handleCurrentChange_receive_good(page_current) {
        this.query_good.page = this.currentPage_receive_good = page_current;
        this.receive_good_address_get()
    },
    handleCurrentChange_contracts(page_current){
        this.query_contact.page = this.currentPage_contracts = page_current;
        this.member_contact_get()
    },
    handleCurrentChange_invoice(page_current){
        this.query_invoice.page = this.currentPage_invoice = page_current;
        this.get_invoice()
    },
    handleCurrentChange_log(page_current){
        this.person_logs_list.page = this.currentPage_log = page_current;
        this.person_logs_get()
    },
    handleCurrentChange_accound(page_current){
        this.accound_list.page = this.currentPage_accound = page_current;
        this.getAccound()
    },
    add_contracts(){
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
        user_type: 101,
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
            v2_update(item, 'customer', 'contract_update', this)
        } else {
            v2_de_create(item, 'customer', 'contract_create', this)
        }
    },
    add_receive_good(a) {
      this.good_address_form = {
          country_code: "",
          city_id: "",
          city: [],
          address: "",
          contact_name: "",
          mobile: "",
          email: "",
          is_default: 0,
          type: a,
          member_id: ""
      }
      this.address_type = a
      this.dialogTableVisible = true;
    },
    edit_receive_good(item){
      this.good_address_form =JSON.parse(JSON.stringify(item))
      this.dialogTableVisible = true;
    },
    add_invoice(){
      this.invoice_form = {
        company_name: '',
        duty_paragraph: '',
        address: '',
        mobile: '',
        opening_bank: '',
        bank_account_number: '',
        receive_invoice_email:'',
        is_default: 0,
        member_id: ''
      }
      this.dialogInvoice = true
    },
    edit_invoice(item){
      this.invoice_form = JSON.parse(JSON.stringify(item))
      this.dialogInvoice = true
    },
    delete_invoice(item,index){
        v2_destroy(item, "customer", "invoice_destory", this);
    },
    save_invoice(item){
      item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'customer', 'invoice_update', this)
        } else {
            v2_de_create(item, 'customer', 'invoice_create', this)
        }
    },
    selected_country_address(item){
        if(item.city_id){
            item.city_id=''
        }
        city_list(item.country_code,'').then(res => {
            this.$set(item,'city',res.data);
        })
    },
    save_receive_good(item) {
        item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'customer', 'receive_address_update', this)
        } else {
            v2_de_create(item, 'customer', 'receive_address_create', this)
        }
    },
    save_deliver(item) {
        item.member_id = this.member_id
        if (item.id) {
            v2_update(item, 'customer', 'deliver_good_update', this)
        } else {
            v2_de_create(item, 'customer', 'deliver_good_create', this)
        }
    },
    delete_deliver(item, index) {
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
        v2_destroy(obj, "customer", "deliver_good_destory", this);
      } else {
        this.deliver_good.splice(index, 1);
      }
    },
    delete_contracts(item, index) {
      if (item.id) {
        v2_destroy(item, "customer", "contract_destory", this);
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
        v2_destroy(obj, "customer", "receive_address_destory", this);
      } 
    },
    black(){
      let that=this
      var tagName = 'User-addNew'
      that.closeAdd({tagName})
      that.$router.push({
          path: "/User/index_new",
          name: "User-index_new",
      });
    }
  }
};
</script>
