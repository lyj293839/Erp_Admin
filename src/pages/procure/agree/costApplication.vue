<style lang="scss" scoped type="text/scss">
/deep/.div {
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
      border-collapse: collapse;
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
    text-align: left;
  }
  th {
    padding: 0px 5px;
    text-align: left;
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
/deep/.quoteInput {
  padding: 20px 0px;
  .el-input__inner {
    border: 1px solid #dcdfe6;
    padding: 0px 10px;
  }
}
/deep/.dateInputStyle {
  .el-input__inner {
    padding: 0px 15px;
  }
  .el-input__prefix {
    left: -8px;
  }
}
</style>
<template>
  <d2-container>
    <div class="div" v-if="addContract.info">
      <!-- 页面 -->
      <el-form :model="addContract" label-position="right">
        <!-- 合同双方 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
              <b>双方</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show1" class="from-item">
            <table border="1" bordercolor="#E5E5E5" style="width:100%;">
              <tr>
                <th colspan="2">合同双方</th>
                <th>名称</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>传真</th>
              </tr>
              <tr>
                <td>甲方</td>
                <td>
                  <el-input v-model="addContract.info.supplier_id" size="small"></el-input>
                </td>
                <td>
                  <el-select
                    v-model="addContract.info.supplier_name"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="supplyMethod"
                    @change="supplyChange()"
                    :loading="supplyloading"
                    style="width:100%;"
                    size="small"
                  >
                    <el-option
                      v-for="item in supply_list"
                      :label="item.name"
                      :key="item.id"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.info.supplier_contact" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.info.supplier_mobile" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.info.supplier_fax" size="small"></el-input>
                </td>
              </tr>
              <tr>
                <td colspan="2">乙方</td>
                <td>
                  <el-select filterable v-model="addContract.info.corp_id" size="small" @change="corp_Change()">
                    <el-option
                      v-for="item in corp_List"
                      :label="item.name"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </td>
                <td>
                  <el-input v-model="addContract.info.corp_contact" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.info.corp_mobile" size="small"></el-input>
                </td>
                <td>
                  <el-input v-model="addContract.info.corp_fax" size="small"></el-input>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 备注 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show4 = !form_show4" icon="el-icon-arrow-down">
              <b>备注</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show4" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <td>备注内容</td>
                <td>备注人</td>
                <td>时间</td>
                <td>文件</td>
                <td>
                  <el-button type="primary" size="mini" @click="handNote()">增加</el-button>
                </td>
              </tr>
              <tr v-for="item in addContract.info.contract_note">
                <td v-text="item.note"></td>
                <td v-text="item.user.name"></td>
                <td v-text="item.created_at"></td>
                <td>
                  <a :href="item.file" target="_blank">{{item.origin_file}}</a>
                </td>
                <td>
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-minus"
                    @click="destroyNote(item)"
                  ></el-button>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 申请历史 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
              <b>申请历史</b>
            </el-button>
          </el-form-item>
          <el-form-item v-show="form_show2" class="from-item">
            <table border="1" bordercolor="#E5E5E5">
              <tr>
                <th>ID</th>
                <th>申请时间</th>
                <th>费用类型</th>
                <th>金额</th>
                <th>收款人</th>
                <th>收款银行</th>
                <th>收款账号</th>
                <th>审核状态</th>
                <th>状态</th>
                <th>申请人</th>
              </tr>
              <tr v-for="item in addContract.info.fee_apply">
                <td v-text="item.id"></td>
                <td v-text="item.createdate"></td>
                <td v-text="FeeType.filter(i=>{return item.fee_type == i.id})[0].name"></td>
                <td
                  v-text="item.amount+Currency.filter(res=>{return item.currency_id == res.id})[0].name"
                ></td>
                <td v-text="item.receiver"></td>
                <td v-text="item.bank"></td>
                <td v-text="item.bank_account"></td>
                <td
                  v-text="fee_apply_check_status.filter(i=>{return item.check_status == i.id})[0].name_cn"
                ></td>
                <td v-text="fee_apply_status.filter(i=>{return item.status == i.id})[0].name_cn"></td>
                <td v-text="item.user.name"></td>
              </tr>
              <tr>
                <td>申请合计：</td>
                <td colspan="2">
                  <span
                    v-for="item in addContract.payment_info"
                    v-text="item.amount+Currency.filter(res=>{return item.currency_id == res.id})[0].name"
                    style="margin:0px 3px;"
                  ></span>
                </td>
                <td
                  v-if="addContract.total_application.length!=0"
                  v-text="addContract.total_application.length!=0?is_paid_info.filter(i=>{return addContract.total_application[0].status == i.id})[0].name_cn:''+'：'"
                ></td>
                <td colspan="7">
                  <span
                    v-for="item in addContract.total_application"
                    v-text="item.amount+Currency.filter(res=>{return item.currency_id == res.id})[0].name"
                    style="margin:0px 3px;"
                  ></span>
                </td>
              </tr>
            </table>
          </el-form-item>
        </div>
        <!-- 申请表单 -->
        <div>
          <el-form-item class="form_title">
            <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
              <b>申请表单</b>
            </el-button>
          </el-form-item>
          <el-form
            label-width="100px"
            label-position="right"
            class="quoteInput"
            v-show="form_show3"
          >
            <el-form-item label="费用类型" :required="true">
              <el-select style="width:200px;" size="small" v-model="new_addContract.fee_type">
                <el-option
                  v-for="item in FeeType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="金额" :required="true">
              <el-input
                style="width:200px;margin-right:10px;"
                size="small"
                v-model="new_addContract.amount"
              ></el-input>
              <el-select style="width:200px;" size="small" v-model="new_addContract.currency_id">
                <el-option
                  v-for="item in Currency"
                  :key="item.id"
                  :label="item.name_cn"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <div style="display:flex;">
              <el-form-item label="收款公司">
                <el-select
                  style="width:410px;"
                  size="small"
                  v-model="c"
                  filterable
                  remote
                  reserve-keyword
                  :remote-method="supplyMethod"
                  @change="companyChange()"
                  clearable
                >
                  <el-option
                    v-for="item in supply_list"
                    :label="item.name"
                    :key="item.id"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收款银行" :required="true">
                <el-select
                  style="width:410px;margin-right:20px;"
                  size="small"
                  clearable
                  v-model="new_addContract.bank_account_id"
                  @change="bankChange()"
                >
                  <el-option
                    v-for="item in CompanyList"
                    :key="item.id"
                    :label="item.opening_bank"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <!-- <el-button type="primary" size="mini" @click="hand_account()">收款账号</el-button> -->
              </el-form-item>
            </div>
            <el-form-item label="收款人" :required="true">
              <el-input style="width:410px;" size="small" v-model="new_addContract.receiver"></el-input>
            </el-form-item>
            <el-form-item label="收款银行" :required="true">
              <el-input style="width:410px;" size="small" v-model="new_addContract.bank"></el-input>
            </el-form-item>
            <el-form-item label="收款账号" :required="true">
              <el-input style="width:410px;" size="small" v-model="new_addContract.bank_account"></el-input>
            </el-form-item>
            <el-form-item label="支付方式" :required="true">
              <el-select style="width:410px;" size="small" v-model="new_addContract.pay_type">
                <el-option
                  v-for="item in PayType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注:" size="small">
              <el-input
                type="textarea"
                :rows="3"
                style="width:920px;"
                v-model="new_addContract.note"
              ></el-input>
            </el-form-item>
            <el-form-item class="from-item">
              <el-button type="primary" @click="saveAdd()" size="mini">保存</el-button>
              <el-button @click="close()" size="mini">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-form>

      <!-- 备注 -->
      <el-dialog :visible.sync="note" width="50%" class="quoteInput">
        <el-form label-width="100px" label-position="right" class="quoteInput">
          <el-form-item label="合同备注">
            <el-input size="small" type="textarea" :rows="3" v-model="new_note.note"></el-input>
          </el-form-item>
          <el-form-item label="文件">
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
              :on-success="handleAvatarSuccess_updateAtlas"
            >
              <el-button size="mini" type="primary">上传文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="addNote()">保存</el-button>
            <el-button size="mini" @click="closeNote()">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 账户 -->
      <!-- <el-dialog :visible.sync="play" width="80%" class="quoteInput">
        <play @noticeClose="noticeClose($event)"></play>
      </el-dialog> -->
    </div>
  </d2-container>
</template>
<script>
import Cookies from "js-cookie";
import $ from "jquery";
import axios from "axios";
import util from "@/libs/util";
import play from "../agree/play";
import request from "@/plugin/axios";
import { listTotal, update } from "@/api/prod";
export default {
  name:"procure-costApplication",
  components: {
    play
  },
  data() {
    return {
      c: "",
      note: false,
      play: false,
      form_show1: true,
      form_show2: true,
      form_show3: true,
      form_show4: true,
      supplyloading: false,
      fileList: [],
      addContract: {},
      new_addContract: {
        amount: "",
        bank: "",
        bank_account: "",
        bank_account_id: "",
        contract_id: "",
        contract_number: "",
        currency_id: "",
        fee_type: "",
        pay_type: 1,
        receiver: "",
        note: "",
        type: 2
      },
      new_note: {
        contract_id: "",
        note: "",
        type: 2
      },
      upload_api: process.env.VUE_APP_API + "api/v1/contractNoteCreate",
      supply_list: [],
      corp_List: [],
      Currency: [],
      FeeType: [],
      PayType: [],
      fee_apply_check_status: [],
      fee_apply_status: [],
      fee_apply_type: [],
      is_paid_info: [],
      CompanyList: []
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='procure-costApplication'){
            this.fetchData()
        }
    }
  },
  created() {
      this.fetchData();
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
    fetchData() {
        listTotal("ProcurementContract/" + this.$route.query.item_id + "/fee_application_view").then(res => {
            this.addContract = res.data;
            obj(this.Currency, res.enum.Currency);
            obj(this.FeeType, res.enum.FeeType);
            obj(this.PayType, res.enum.PayType);
            obj(
                this.fee_apply_check_status,
                res.enum.fee_apply_check_status
            );
            obj(this.fee_apply_status, res.enum.fee_apply_status);
            obj(this.fee_apply_type, res.enum.fee_apply_type);
            this.is_paid_info = res.enum.is_paid_info;
            this.corp_List = res.enum.company
        });
    },
    handNote() {
      this.note = true;
    },
    closeNote() {
      this.note = false;
    },
    addNote() {
      this.new_note.contract_id = this.addContract.info.id;
      this.$refs.upload.submit();
    },
    destroyNote(row) {
      destroy(row, "contractNoteDestroy", this).then(res => {});
    },
    handleExceed(files, fileList) {
      // this.$message.warning(
      //   `当前限制选择 1 个文件，本次选择了 ${
      //     files.length
      //   } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      // );
      this.$message.warning(
        `当前限制选择1个文件，
        本次选择了 ${files.length}个文件，共选择了${files.length+fileList.length}文件`
      )
    },
    handleAvatarSuccess_updateAtlas(res, file, fileList) {
      if (res.code == 0) {
        this.note = false;
        this.new_note = {
          contract_id: "",
          note: "",
          type: 2
        };
        listTotal(
          "ProcurementContract/" +
            this.addContract.info.id +
            "/fee_application_view"
        ).then(res => {
          this.addContract = res.data;
        });
      }
    },
    supplyMethod(query) {
      if (query !== "") {
        this.supplyloading = true;
        setTimeout(() => {
          listTotal("data/member_list?type=2&name=" + query).then(res => {
            this.supply_list = res.data;
              this.supplyloading = false;
          });
        }, 200);
      } else {
        this.supply_list = [];
      }
    },
    supplyChange() {
      this.addContract.info.supplier_id = this.supply_list.filter(item => {
        return item.name == this.addContract.info.supplier_name;
      })[0].id;
    },
    companyChange() {
      var company_id = this.supply_list.filter(item => {
        return this.c == item.name;
      })[0].id;
      listTotal("data/" + company_id + "/member_bank_accounts").then(res => {
        this.CompanyList = res.data;
      });
    },
    bankChange() {
      var company_item = this.CompanyList.filter(item => {
        return this.new_addContract.bank_account_id == item.id;
      })[0];
      this.new_addContract.receiver = company_item.payee;
      this.new_addContract.bank = company_item.opening_bank;
      this.new_addContract.bank_account = company_item.bank_account_number;
    },
    hand_account() {
      // this.play = true;
    },
    noticeClose(even) {
      this.play = even;
    },
    corp_Change() {
      var corp = this.corp_List.filter(i => {
        return this.addContract.info.corp_id == i.id;
      })[0];
      this.addContract.info.corp_name = corp.name;
      if (corp.contacts.length != 0) {
        this.addContract.info.corp_mobile = corp.contacts[0].phone;
        this.addContract.info.corp_fax = corp.contacts[0].fax;
        this.addContract.info.corp_contact = corp.contacts[0].name;
      }
    },
    saveAdd() {
      this.new_addContract.contract_id = this.addContract.info.id;
      this.new_addContract.contract_number = this.addContract.info.contract_number;
      create(
        this.new_addContract,
        "ProcurementContract/" +
          this.new_addContract.contract_id +
          "/fee_application",
        this
      );
    },
    close() {
      this.$router.push({
        path: "/contract/index.vue",
        name: "procure-contract"
      });
    }
  }
};
function obj(arr, object) {
  for (let i in object) {
    arr.push(object[i]);
  }
}
function create(datas, type, that) {
  datas.loading = true;
  let data = JSON.parse(JSON.stringify(datas));
  delete data.loading;
  request({
    url: "api/v1/" + type,
    method: "post",
    data
  })
    .then(res => {
      datas.loading = false;
      if (res && res.code == 0) {
        that.$message({
          message: "success",
          type: "success"
        });
        that.new_addContract = {
          amount: "",
          bank: "",
          bank_account: "",
          bank_account_id: "",
          contract_id: "",
          contract_number: "",
          currency_id: "",
          fee_type: "",
          pay_type: 1,
          receiver: "",
          note: "",
          type: 2
        };
        that.c = "";
        listTotal(
          "ProcurementContract/" +
            that.addContract.info.id +
            "/fee_application_view"
        ).then(res => {
          that.addContract = res.data;
        });
      } else {
        that.$message({
          message: res.msg,
          type: "error"
        });
      }
    })
    .catch(rr => {
      datas.loading = false;
    });
}
function destroy(row, type, that) {
  const h = that.$createElement;
  that.$msgbox({
    message: h("p", null, [h("span", null, "确定要执行此操作吗？")]),
    showCancelButton: true,
    cancelButtonText: "取消",
    confirmButtonText: "确定",
    type: "warning",
    beforeClose: (action, instance, done) => {
      if (action === "confirm") {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = "执行中...";
        let ids = [row.id];
        request({
          url: "api/v1/" + type,
          method: "post",
          data: {
            ids
          }
        })
          .then(res => {
            instance.confirmButtonLoading = false;
            instance.confirmButtonText = "确定";
            if (res && res.code == 0) {
              that.$message({
                message: "success",
                type: "success"
              });
              done();
              listTotal(
                "ProcurementContract/" +
                  that.addContract.info.id +
                  "/fee_application_view"
              ).then(res => {
                that.addContract = res.data;
              });
            }
          })
          .catch(res => {
            instance.confirmButtonLoading = false;
          });
      }
      if (action === "cancel") {
        done();
      }
    }
  });
}
</script>

