<style lang="scss"  type="text/scss">
  .l_h80 {
    line-height: 86px;
  }
  .item1 {
    margin-bottom: 0;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0;
  }
  .el-switch__label--left {
    position: relative;
    left: 46px;
    color: #fff;
    z-index: -1111;
  }

  .el-switch__label--right {
    position: relative;
    right: 46px;
    color: #fff;
    z-index: -1111;
  }

  .el-switch__label--right.is-active {
    z-index: 1111;
    color: #fff !important;
  }

  .el-switch__label--left.is-active {
    z-index: 1111;
    color: #9c9c9c !important;
  }

</style>
<template>
  <el-form>
    <el-form-item label="账户">
      <el-table :data="list" border style="width:100%">
        <el-table-column label="类型">
          <template slot-scope="scope">
            {{bank_account_type_info.filter(i=>{return i.id==scope.row.type})[0].name}}
          </template>
        </el-table-column>
        <el-table-column label="国家">
          <template slot-scope="scope">
            {{scope.row.country?scope.row.country.Name:''}}
          </template>
        </el-table-column>
        <el-table-column label="省">
          <template slot-scope="scope">
            {{scope.row.province_code}}
          </template>
        </el-table-column>
        <el-table-column label="市">
          <template slot-scope="scope">
            {{scope.row.city?scope.row.city.Name:''}}
          </template>
        </el-table-column>
        <el-table-column label="开户行">
          <template slot-scope="scope">
            {{scope.row.opening_bank}}
          </template>
        </el-table-column>
        <el-table-column label="收款人">
          <template slot-scope="scope">
            {{scope.row.payee}}
          </template>
        </el-table-column>
        <el-table-column label="银行账号">
          <template slot-scope="scope">
            {{scope.row.bank_account_number}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="update(scope.row)">修改</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <div
         style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;">
      <div class="item1">
        <div class="d2-m-10" style="width: 140px;">
          <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.type')}}</p>
          <el-select v-model="bank_accouts.type" size="mini" clearable
                     >
            <el-option
                    v-for="(item,index) in bank_account_type_info"
                    :key="index"
                    :label="item.name"
                    :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('user.supplier.bank_accouts.country_code')}}</p>
          <el-select v-model="bank_accouts.country_code" clearable filterable
                     @change="selected_country(bank_accouts)"
                     size="mini" >
            <el-option
                    v-for="(i,index) in country"
                    :key="index"
                    :label="i.Name"
                    :value="i.Code">
            </el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('user.supplier.bank_accouts.province_code')}}</p>
          <el-select v-model="bank_accouts.province_code" filterable clearable
                     @change="selected_province(bank_accouts)"
                     size="mini">
            <el-option
                    v-for="(i,index) in province"
                    :key="index"
                    :label="i.province_code"
                    :value="i.province_code">
            </el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('user.supplier.bank_accouts.city_id')}}</p>
          <el-select v-model="bank_accouts.city_id" filterable clearable
                     size="mini" >
            <el-option
                    v-for="(i,index) in city"
                    :key="index"
                    :label="i.Name"
                    :value="i.ID">
            </el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.opening_bank')}}</p>
          <el-input v-model="bank_accouts.opening_bank"  size="mini"
                    placeholder=""></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.payee')}}</p>
          <el-input v-model="bank_accouts.payee"  size="mini"
                    placeholder=""></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p><span style="color:red;">*</span>{{$t('user.supplier.bank_accouts.bank_account_number')}}</p>
          <el-input v-model="bank_accouts.bank_account_number"  size="mini"
                    placeholder=""></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('user.supplier.bank_accouts.remark')}}</p>
          <el-input v-model="bank_accouts.remark"  size="mini"
                    placeholder=""></el-input>
        </div>
        <div class="d2-m-10 l_h80">
          <p style="width: 1px;"></p>
          <span>{{$t('user.supplier.bank_accouts.is_default')}}:</span>
          <el-switch
                  name="status"
                  v-model="bank_accouts.is_default"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="开"
                  inactive-text="关">
          </el-switch>
        </div>
      </div>
      <el-button type="primary" size="mini" name="save" @click="save(item)">
        {{$t('save')}}
      </el-button>
    </div>
  </el-form>
</template>
<script>
import {create,
    update,
    country_list,
    province_list,
    city_list,
    bank_accounts} from "@/api/user";
import {
    destroy
  } from "@/api/procure";
export default {
    name:"procure-play",
    props:['member'],
  data() {
    return {
        bank_accouts: {
            user_id:'',
            member_id:'',
            province:[],
            city:[],
            country_code: '',
            province_code: '',
            city_id: '',
            type: '',
            opening_bank: '',
            payee: '',
            bank_account_number: '',
            remark: '',
            is_default: '',
        },
        bank_account_type_info: [],
        list:[],
        country:[],
        province:[],
        city:[]
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='procure-play'){
            this.fetchData()
        }
    }
  },
  created() {
      this.fetchData()
  },
  methods: {
      fetchData(){
          bank_accounts(this.member).then(res=>{
              if(res&&res.code==0){
                  this.list=res.data
                  this.bank_account_type_info=res.enum.bank_account_type_info
              }
          })
          country_list().then(res => {
              this.country = res.data;
          })
      },
      update(item){
          this.bank_accouts=item
      },
      del(item){
          destroy(item, 'supplier', 'bank_account_destory', this)
      },
      selected_country(item) {
          if(item.province_code){
              item.province_code=''
          }
          if(item.city_id){
              item.city_id=''
          }
          province_list(item.country_code).then(res => {
              this.province = res.data;
          })
      },
      selected_province(item){
          if(item.city_id){
              item.city_id=''
          }
          city_list(item.country_code,item.province_code).then(res => {
              this.city = res.data;
          })
      },
      save(){
          this.bank_accouts.member_id = this.member
          if (this.bank_accouts.id) {
              update(this.bank_accouts, 'supplier', 'bank_account_update', this)
          } else {
              create(this.bank_accouts, 'supplier', 'bank_account_create', this)
          }
          this.$emit("noticeClose", false);
      },
  }
};
</script>
