<style lang="scss" scoped type="text/scss">
.input_border{
    /deep/.el-input__inner {
    width: 100%;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
    border-bottom-width: 1px;
    border-radius: 0;
  }
  .el-form-item{
      margin-bottom: 0px;
  }
}
table {
  border-collapse: collapse;
  width: 100%;
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
  /deep/.el-input__inner {
    width: 100%;
    border: none;
  }
}
</style>
<template>
    <d2-container>
        <el-tabs v-model="activeName" class="input_border">
            <el-tab-pane label="基础信息" name="first">
                <el-row>
                    <el-col :span="10">
                        <el-form label-width="100px">
                            <el-form-item label="乙方名称" required>
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
                            <el-form-item>
                                <el-checkbox style="margin-right:20px;" v-model="basis.is_stop" :true-label="2"  :false-label="1">停用</el-checkbox>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>
                <div style="text-align:right;margin-top:10px;">
                    <el-button type="primary" size="mini" @click="save_basis()">保存</el-button>
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
            <el-tab-pane label="发货账号" name="fourth">
                <div>
                    <el-button @click="add_deliver()" type="primary" size="mini">添加</el-button>
                </div>
                <table border="1" bordercolor="#E5E5E5" style="line-height:30px;margin-top:10px;">
                    <tr class="td_pad">
                        <td width='120'>快递公司</td>
                        <td width='180'>快递账号</td>
                        <td width='40'>状态</td>
                        <td align='center' width='120'>
                            操作
                        </td>
                    </tr>
                    <tr v-for="(item,index) in deliver_good">
                        <td>
                            <el-select v-model="item.express_company_id" size="mini" placeholder style="width:100%;">
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
            </el-tab-pane>
        </el-tabs>

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

    </d2-container>
</template>
<script>
import {
  listPost,
  cancleByBuy,
  change_checked_result,
  createCheck
} from "@/api/inventory";
import { getShevies, supplier_lists } from "@/api/instore";
import $ from "jquery";
import { mapState, mapActions } from "vuex";
import util from "@/libs/util";
export default {
  name: "User-party_add",
  data() {
    return {
        activeName:"first",
        basis:{},
        contracts:{},
        deliver_good:[],
        //
        contracts_form:{},
        currentPage_contracts:1,
        dialogContracts:false,
        country:[],
        express_company:[],
    };
  },
  created() {
    this.fetchData()
  },
  watch: {
    $route(to, from) {
      if (to.name == "User-party_add") {
        this.fetchData()
      }
    }
  },
  methods: {
      ...mapActions('d2admin/page',['closeAdd']),
      fetchData(){
        this.country = this.GEnums.Country;
        this.Users = this.GEnums.Users;
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
    handleCurrentChange_contracts(){},
    add_deliver() {
      this.deliver_good.push({
        express_company_id: "",
        accounts: "",
        member_id: ""
      });
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
        // v2_destroy(obj, "customer", "deliver_good_destory", this);
      } else {
        this.deliver_good.splice(index, 1);
      }
    },
    black(){
      let that=this
      var tagName = 'User-party_add'
      that.closeAdd({tagName})
      that.$router.push({
          path: "/User/party/index",
          name: "User-party",
      });
    }
  }
}
</script>