<style lang="scss" scoped type="text/scss">
p {
  height: 20px;
  line-height: 20px;
}
.bold {
  font-weight: bold;
}

.grey {
  color: grey;
}

.l_h {
  line-height: 1.5;
}

.l_h80 {
  line-height: 86px;
}

.el-pagination {
  text-align: right;
  margin: 30px;
}

.d2-text-center {
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.border-right {
  border-right: 1px solid #f2f2f2;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
}

.options {
  justify-content: center;
}

.options div {
  width: 33%;
  text-align: center;
}

.item1 {
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  /*width: 400px;*/
  width: 31%;
  margin: 10px 0;
  box-sizing: border-box;
}

.el-main {
  padding: 0;
}

.el-card__body {
  padding: 10px;
}

.basis {
  padding: 10px;
}

.basis .el-card__header {
  background-color: rgba(250, 250, 250, 1);
}

.logo {
  width: 100px;
  height: 100px;
  background-color: rgba(246, 246, 246, 1);
}

.logo i {
  font-size: 30px;
  margin: 45px;
}

p {
  margin: 5px 0;
}

.customWidth {
  width: 70%;
}

.level {
  width: 40px;
  height: 30px;
  line-height: 30px;
  margin: 0 15px;
  background-color: yellow;
  text-align: center;
  box-shadow: 0 2px 12px 2px rgba(0, 0, 0, 0.1);
}

.check {
  width: 30px;
  height: 30px;
  margin: 5px 20px;
}

.level span {
  display: inline-block !important;
  width: 100% !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.logo i {
  margin: 20px;
}
</style>

<template>
  <d2-container>
    <!--基础信息 开始-->
    <el-card class="box-card basis" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_basis" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.basis.basis')}}
        <el-button style="float: right;" type="primary" size="mini" @click="back">{{$t('back')}}</el-button>
      </div>
      <div class="item1">
        <div class="d2-m-10" style="width: 140px;">
          <p>
            <span style="color:red;">*</span>
            {{$t('user.customer.basis.name')}}
          </p>
          <el-input v-model="basis.name" size="mini" placeholder="Please Write"></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('user.customer.basis.english_name')}}</p>
          <el-input v-model="basis.english_name" size="mini" placeholder="Please Write"></el-input>
        </div>
        <div class="d2-m-10" style="width: 130px;">
          <p>
            <span style="color:red;">*</span>
            {{$t('user.customer.basis.country_code')}}
          </p>
          <el-select
            v-model="basis.country_code"
            filterable
            size="mini"
            placeholder="Please Select"
          >
            <el-option
              v-for="(item,index) in country"
              :key="index"
              :label="item.Name"
              :value="item.Code"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="d2-mt-10">
        <el-button
          type="primary"
          size="mini"
          name="save"
          v-if="permissions.indexOf(295)>-1"
          :loading="basis.loading?true:false"
          @click="save_basis"
        >{{$t('save')}}</el-button>
      </div>
    </el-card>
    <!--联系人 开始-->
    <el-card class="box-card contracts" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_contracts" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.contracts.contracts')}}
        <el-button
          style="float: right;"
          type="primary"
          name="add"
          size="mini"
          @click="add_contracts"
        >{{$t('add')}}</el-button>
      </div>
      <div
        v-for="(item,index) in contracts"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <div class="item1">
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.contracts.name')}}
            </p>
            <el-input v-model="item.name" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.contracts.phone')}}
            </p>
            <el-input v-model="item.phone" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.contracts.email')}}</p>
            <el-input v-model="item.email" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.contracts.mobile')}}</p>
            <el-input v-model="item.mobile" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.contracts.fax')}}</p>
            <el-input v-model="item.fax" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>Skype</p>
            <el-input v-model="item.skype" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>QQ</p>
            <el-input v-model="item.qq" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.contracts.user_type')}}
            </p>
            <el-select v-model="item.user_type" size="mini" placeholder="Please Select">
              <el-option
                v-for="(item,index) in user_type"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.contracts.remark')}}</p>
            <el-input v-model="item.remark" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.contracts.tag')}}</p>
            <el-input v-model="item.tag" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10 l_h80">
            <span>{{$t('user.customer.contracts.is_default')}}:</span>
            <el-switch
              name="is_default"
              v-model="item.is_default"
              :active-value="1"
              :inactive-value="0"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="d2-mt-10 l_h80">
            <el-button
              type="primary"
              size="mini"
              name="save"
              v-if="permissions.indexOf(297)>-1"
              :loading="item.loading?true:false"
              @click="save_contracts(item)"
            >{{$t('save')}}</el-button>
            <el-button
              type="danger"
              name="delete"
              size="mini"
              @click="delete_contracts(item,index)"
            >{{$t('delete')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <!--发货 开始-->
    <el-card class="box-card deliver" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_deliver" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.deliver.deliver')}}
        <el-button
          style="float: right;"
          type="primary"
          size="mini"
          @click="add_deliver"
        >{{$t('add')}}</el-button>
      </div>
      <div
        v-for="(item,index) in deliver_good"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <div class="item1">
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.deliver.express_company_id')}}
            </p>
            <el-select v-model="item.express_company_id" size="mini" placeholder="Please Select">
              <el-option
                v-for="(i,index) in express_company"
                :key="index"
                :label="i.name"
                :value="i.id"
              ></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.deliver.accounts')}}
            </p>
            <el-input v-model="item.accounts" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-mt-10 l_h80">
            <el-button type="primary" size="mini" @click="save_deliver(item)" v-if="permissions.indexOf(499)>-1">{{$t('save')}}</el-button>
            <el-button
              type="danger"
              size="mini"
              v-if="permissions.indexOf(500)>-1"
              @click="delete_deliver(item,index)"
            >{{$t('delete')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>
    <!--开票信息 开始-->
    <!-- <el-card class="box-card invoice" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_invoice" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.invoice.invoice')}}
        <el-button
          style="float: right;"
          type="primary"
          size="mini"
          name="add"
          @click="add_invoice"
        >{{$t('add')}}</el-button>
      </div>
      <div
        v-for="(item,index) in invoice"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <div class="item1">
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.invoice.company_name')}}
            </p>
            <el-input v-model="item.company_name" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.invoice.duty_paragraph')}}
            </p>
            <el-input v-model="item.duty_paragraph" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.invoice.address')}}
            </p>
            <el-input v-model="item.address" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.invoice.mobile')}}</p>
            <el-input v-model="item.mobile" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.invoice.opening_bank')}}
            </p>
            <el-input v-model="item.opening_bank" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.invoice.bank_account_number')}}
            </p>
            <el-input v-model="item.bank_account_number" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.invoice.user_type')}}
            </p>
            <el-select v-model="item.user_type" size="mini" placeholder="Please Select">
              <el-option
                v-for="(item,index) in user_type"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="d2-m-10 l_h80">
            <span>{{$t('user.customer.invoice.is_default')}}:</span>
            <el-switch
              name="is_default"
              v-model="item.is_default"
              :active-value="1"
              :inactive-value="0"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="d2-mt-10 l_h80">
            <el-button
              type="primary"
              size="mini"
              name="add"
              @click="save_invoice(item)"
            >{{$t('save')}}</el-button>
            <el-button
              type="danger"
              size="mini"
              name="delete"
              @click="delete_invoice(item,index)"
            >{{$t('delete')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>-->
    <!--账户 开始-->
    <!-- <el-card class="box-card account" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_account" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.bank_accouts.account')}}
        <el-button
          style="float: right;"
          type="primary"
          name="add"
          size="mini"
          @click="add_bank_accouts"
        >{{$t('add')}}</el-button>
      </div>
      <div
        v-for="(item,index) in bank_accouts"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <div class="item1">
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.bank_accouts.type')}}
            </p>
            <el-select v-model="item.type" size="mini" placeholder="Please Select">
              <el-option
                v-for="(item,index) in bank_account_type_info"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.bank_accouts.country_code')}}</p>
            <el-select
              v-model="item.country_code"
              filterable
              @change="selected_country(item)"
              size="mini"
              placeholder="Please Select"
            >
              <el-option v-for="(i,index) in country" :key="index" :label="i.Name" :value="i.Code"></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.bank_accouts.province_code')}}</p>
            <el-select
              v-model="item.province_code"
              filterable
              @change="selected_province(item)"
              size="mini"
              placeholder="Please Select"
            >
              <el-option
                v-for="(i,index) in item.province"
                :key="index"
                :label="i.province_code"
                :value="i.province_code"
              ></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.bank_accouts.city_id')}}</p>
            <el-select v-model="item.city_id" filterable size="mini" placeholder="Please Select">
              <el-option v-for="(i,index) in item.city" :key="index" :label="i.Name" :value="i.ID"></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.bank_accouts.opening_bank')}}
            </p>
            <el-input v-model="item.opening_bank" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.bank_accouts.payee')}}
            </p>
            <el-input v-model="item.payee" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.bank_accouts.bank_account_number')}}
            </p>
            <el-input v-model="item.bank_account_number" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.bank_accouts.remark')}}</p>
            <el-input v-model="item.remark" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10 l_h80">
            <span>{{$t('user.customer.bank_accouts.is_default')}}:</span>
            <el-switch
              name="status"
              v-model="item.is_default"
              :active-value="1"
              :inactive-value="0"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="d2-mt-10 l_h80">
            <el-button
              type="primary"
              size="mini"
              name="save"
              @click="save_bank_account(item)"
            >{{$t('save')}}</el-button>
            <el-button
              type="danger"
              size="mini"
              name="delete"
              @click="delete_bank_account(item,index)"
            >{{$t('delete')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>-->
    <!--负责人 开始-->
    <!-- <el-card class="box-card responsible" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_responsible" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.responsible.responsible')}}
      </div>
      <div
        v-for="(item,index) in responsible_person"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <div class="item1">
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.responsible.duty_user_id')}}
            </p>
            <el-select
              v-model="item.duty_user_id"
              filterable
              size="mini"
              placeholder="Please Select"
            >
              <el-option v-for="(i,index) in user_lists" :key="index" :label="i.name" :value="i.id"></el-option>
            </el-select>
          </div>
          <div class="d2-m-10 l_h80">
            <span>{{item.name}}</span>
          </div>
          <div class="d2-mt-10 l_h80">
            <el-button
              type="primary"
              size="mini"
              name="save"
              @click="save_responsible(item)"
            >{{$t('save')}}</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="delete_responsible(item,index)"
            >{{$t('delete')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>-->
    <!--收票地址 开始-->
    <!-- <el-card class="box-card receive" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_receive" class="el-icon-caret-bottom"></i>
        {{$t('user.customer.receive.receive')}}
        <el-button
          style="float: right;"
          type="primary"
          size="mini"
          name="add"
          @click="add_receive"
        >{{$t('add')}}</el-button>
      </div>
      <div
        v-for="(item,index) in receive_address"
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <div class="item1">
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.receive.country_code')}}
            </p>
            <el-select
              v-model="item.country_code"
              filterable
              @change="selected_country_address(item)"
              size="mini"
              placeholder="Please Select"
            >
              <el-option v-for="(i,index) in country" :key="index" :label="i.Name" :value="i.Code"></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.receive.city_id')}}
            </p>
            <el-select v-model="item.city_id" filterable size="mini" placeholder="Please Select">
              <el-option v-for="(i,index) in item.city" :key="index" :label="i.Name" :value="i.ID"></el-option>
            </el-select>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.receive.address')}}
            </p>
            <el-input v-model="item.address" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.receive.contact_name')}}
            </p>
            <el-input v-model="item.contact_name" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.receive.mobile')}}
            </p>
            <el-input v-model="item.mobile" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>{{$t('user.customer.receive.email')}}</p>
            <el-input v-model="item.email" size="mini" placeholder="Please Write"></el-input>
          </div>
          <div class="d2-m-10" style="width: 140px;">
            <p>
              <span style="color:red;">*</span>
              {{$t('user.customer.receive.user_type')}}
            </p>
            <el-select v-model="item.user_type" size="mini" placeholder="Please Select">
              <el-option
                v-for="(item,index) in user_type"
                :key="item.index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="d2-m-10 l_h80">
            <span>{{$t('user.customer.receive.is_default')}}:</span>
            <el-switch
              name="is_default"
              v-model="item.is_default"
              :active-value="1"
              :inactive-value="0"
              active-text="开"
              inactive-text="关"
            ></el-switch>
          </div>
          <div class="d2-mt-10 l_h80">
            <el-button
              type="primary"
              size="mini"
              name="save"
              @click="save_receive(item)"
            >{{$t('save')}}</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="delete_receive(item,index)"
            >{{$t('delete')}}</el-button>
          </div>
        </div>
      </div>
    </el-card>-->
  </d2-container>
</template>
<script>
import {
  edit,
  update_responsible,
  destroy,
  country_list,
  province_list,
  city_list,
  member_company
} from "@/api/user";
import { listTotal, update, create } from "@/api/prod";
import $ from "jquery";
export default {
  name: "Organize-edit",
  data() {
    return {
      //基础信息
      permissions:JSON.parse(localStorage.getItem('permissions')),
      member_id: "",
      supplyloading: true,
      personal: true,
      country: [],
      payment_day_info: [],
      business_modes: [],
      levels: [],
      product_sort: [],
      type_info: [],
      parent_company: [],
      basis: {
        id: "",
        name: "",
        english_name: "",
        country_code: "",
        type: 2,
        sort: 1,
        is_system: 1
      },
      //联系人
      contracts: [
        {
          name: "",
          phone: "",
          email: "",
          mobile: "",
          fax: "",
          skype: "",
          qq: "",
          remark: "",
          tag: "",
          is_default: false,
          user_type: "",
          member_id: "",
          loading: false
        }
      ],
      user_type: [],
      //发货
      deliver_good: [
        {
          express_company_id: "",
          accounts: "",
          is_straight_hair: false,
          member_id: ""
        }
      ],
      express_company: []
      //开票信息
      // invoice: [
      //   {
      //     company_name: "",
      //     duty_paragraph: "",
      //     address: "",
      //     mobile: "",
      //     opening_bank: "",
      //     bank_account_number: "",
      //     is_default: false,
      //     user_type: "",
      //     member_id: ""
      //   }
      // ],
      //账户
      // bank_accouts: [
      //   {
      //     user_id: "",
      //     member_id: "",
      //     province: [],
      //     city: [],
      //     country_code: "",
      //     province_code: "",
      //     city_id: "",
      //     type: "",
      //     opening_bank: "",
      //     payee: "",
      //     bank_account_number: "",
      //     remark: "",
      //     is_default: ""
      //   }
      // ],
      // bank_account_type_info: [],
      // user_id: "",
      //负责人
      // responsible_level: [],
      // responsible_person: [],
      // user_lists: [],
      // user_lists2: [],
      //收票地址
      //   receive_address: [
      //     {
      //       country_code: "",
      //       province: [],
      //       city: [],
      //       city_id: "",
      //       address: "",
      //       contact_name: "",
      //       mobile: "",
      //       email: "",
      //       is_default: false,
      //       user_type: "",
      //       type: 1,
      //       member_id: ""
      //     }
      //   ]
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Organize-edit'){
          if (this.$route.query.ids) {
            this.fetch_data();
            setTimeout(() => {
              this.edit_refresh(this.$route.query.ids);
            }, 1000);
          } else {
            this.fetch_data();
          }
        }
    }
  },
  created() {
    if (this.$route.query.ids) {
      this.fetch_data();
      setTimeout(() => {
        this.edit_refresh(this.$route.query.ids);
      }, 1000);
    } else {
      this.fetch_data();
    }
  },
  methods: {
    edit_refresh(id) {
      edit("organize/company", id).then(res => {
        this.member_id = res.data.id;
      });
    },
    fetch_data() {
      listTotal("organize/company/" + this.$route.query.ids + "/edit").then(
        res => {
          this.basis.id = res.data.id;
          this.basis.name = res.data.name;
          this.basis.english_name = res.data.english_name;
          this.basis.country_code = res.data.country_code;
          this.contracts = res.data.contacts;
          this.deliver_good = res.data.deliver_goods
          this.user_type = res.enum.user_type;
          this.express_company = res.enum.express_company;
        }
      );
      country_list().then(res => {
        this.country = res.data;
      });
    },
    //基础信息
    save_basis() {
      update(this.basis, "organize/company", "update", this);
    },
    toggle_basis() {},
    back() {
      this.$router.push({
        path: "/Organize/index",
        name: "Organize-index"
      });
    },
    //联系人
    toggle_contracts() {},
    add_contracts() {
      this.contracts.push({
        name: "",
        phone: "",
        email: "",
        mobile: "",
        fax: "",
        skype: "",
        qq: "",
        remark: "",
        tag: "",
        is_default: false,
        user_type: "",
        member_id: "",
        loading: false
      });
    },
    save_contracts(item) {
      item.member_id = this.member_id;
      if (item.id) {
        update(item, "organize/company", "contract_update", this);
      } else {
        create(item, "organize/company", "contract_create", this);
      }
    },
    delete_contracts(item, index) {
      if (item.id) {
        destroy(item, "customer", "contract_destory", this);
      } else {
        this.contracts.splice(index, 1);
      }
    },
    //发货
    toggle_deliver() {},
    add_deliver() {
      this.deliver_good.push({
        express_company_id: "",
        accounts: "",
        is_straight_hair: true,
        member_id: ""
      });
    },
    save_deliver(item) {
      item.member_id = this.member_id;
      if (item.id) {
        update(item, "organize/company", "deliver_good_update", this);
      } else {
        create(item, "organize/company", "deliver_good_create", this);
      }
    },
    delete_deliver(item, index) {
      if (item.id) {
        destroy(item, "customer", "deliver_good_destory", this);
      } else {
        this.deliver_good.splice(index, 1);
      }
    }
    //开票信息
    // toggle_invoice() {},
    // add_invoice() {},
    // save_invoice() {},
    // delete_invoice() {},
    // 账户
    // toggle_account() {},
    // add_bank_accouts() {},
    // selected_country() {},
    // selected_province() {},
    // save_bank_account() {},
    // delete_bank_account() {},
    //负责人
    // toggle_responsible() {},
    // save_responsible() {},
    // delete_responsible() {},
    //收票地址
    // toggle_receive() {},
    // add_receive() {},
    // selected_country_address() {},
    // save_receive() {},
    // delete_receive() {}
  }
};
</script>