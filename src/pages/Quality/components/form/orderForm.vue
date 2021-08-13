<style lang="scss" scoped type="text/scss">
/deep/.checkbox_nei {
  margin-left: 10px;
  padding-left: 0px;
  .el-checkbox__label {
    padding-left: 0px;
  }
}
/deep/.el-checkbox__label {
  padding-left: 5px;
}
.el-radio + .el-radio {
  margin-left: 15px;
}
/*.el-radio{*/
/*height: 28px;*/
/*line-height: 28px;*/
/*}*/
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
  line-height: 80px;
}

.el-pagination {
  text-align: right;
  margin: 10px;
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
  /*justify-content: center;*/
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
table{
  td{
    line-height: 25px;
  }
  .el-checkbox {
      margin-right: 0px;
    }
   /deep/.el-input__inner {
      padding: 0px;
      width: 100%;
      border: 0px;
      font-size: 14px;
    }
  /deep/.el-textarea__inner {
      border: 0px;
      padding: 0px;
    }
}
</style>
<style lang="scss" type="text/scss">
// .el-tooltip span {
//   display: inline-block !important;
//   width: 100% !important;
// }

// .el-switch__label--left {
//   position: relative;
//   left: 46px;
//   color: #fff;
//   z-index: -1111;
// }

// .el-switch__label--right {
//   position: relative;
//   right: 46px;
//   color: #fff;
//   z-index: -1111;
// }

// .el-switch__label--right.is-active {
//   z-index: 1111;
//   color: #fff !important;
// }

// .el-switch__label--left.is-active {
//   z-index: 1111;
//   color: #9c9c9c !important;
// }

// .el-pagination {
//   text-align: right;
// }
// .div {
//   table {
//     td {
//       padding-left: 5px;
//     }
//     .el-checkbox {
//       margin-right: 0px;
//     }
//     .el-textarea__inner {
//       border: 0px;
//       padding: 0px;
//     }
//     .el-autocomplete {
//       width: 100%;
//     }
//     .el-select {
//       width: 100%;
//     }
//     .el-input__inner {
//       padding: 0px;
//       width: 100%;
//       border: 0px;
//       font-size: 14px;
//     }
//   }
// }
</style>
<template>
  <!-- <div>
    <el-card class="box-card basis" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_basis" class="el-icon-caret-bottom"></i>
        <el-button style="float: right;" type="primary" size="mini" @click="back()">返回</el-button>
      </div>
      <div>
        <div class="d2-m-10" style="display: inline-block;width: 250px;">
          <p>
            <span style="color:red;">*</span>公司
          </p>
          <el-autocomplete
            v-model="check_prod.company_id"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            size="mini"
          ></el-autocomplete>
        </div>
        <div class="d2-m-10" style="display: inline-block;width: 200px;">
          <p>联系人</p>
          <el-select
            v-model="check_prod.contact_id"
            @change="get_telephone(check_prod.contact_id)"
            clearable
            filterable
            size="mini"
            style="width: 150px;margin: 0 10px;"
            placeholder="请选择"
          >
            <el-option v-for="i in contacts" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="display: inline-block;width: 200px;">
          <p>联系方式</p>
          <el-input
            v-model="check_prod.telephone"
            disabled
            size="mini"
            placeholder="请输入"
            style="width: 200px;"
          ></el-input>
        </div>
      </div>
    </el-card>
    <el-card class="box-card prod" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_prod" class="el-icon-caret-bottom"></i>
      </div>
      <div class="item1">
        <div class="d2-m-10" style="width: 200px">
          <p>产品CAS</p>
          <el-select
            v-model="check_prod.prod_id"
            @change="prod_detail(check_prod.prod_id)"
            filterable
            remote
            size="mini"
            reserve-keyword
            placeholder="请输入产品cas"
            :remote-method="remoteMethod_prod"
            :loading="loading"
            style="width:100%;"
          >
            <el-option v-for="item in prods" :label="item.cas_name" :value="item.prod_id"></el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px">
          <p>产品名称</p>
          <el-input v-model="check_prod.name" size="mini" placeholder="请输入"></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px">
          <p>批次</p>
          <el-input v-model="check_prod.batchno" size="mini" placeholder="请输入"></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px">
          <p>保存条件</p>
          <el-input v-model="check_prod.storagecondition" size="mini" placeholder="请输入"></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px">
          <p>所在仓库</p>
          <el-input v-model="check_prod.warehouse" size="mini" placeholder="请输入"></el-input>
        </div>
        <div class="d2-m-10" style="width: 400px;">
          <p>备注(可选):</p>
          <el-input
            type="textarea"
            :rows="2"
            size="mini"
            v-model="check_prod.note"
            resize="both"
            placeholder="请输入备注"
          ></el-input>
        </div>
      </div>
      <div class="d2-m-10" style="width: 100px;">
        <p>结构式</p>
        <img
          v-if="check_prod.img!=''"
          class="logo"
          :src="check_prod.img"
          v-preview="check_prod.svg"
          style="width: 100px;height: 100px;"
        />
      </div>
    </el-card>
    <el-card class="box-card testitem" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_testitem" class="el-icon-caret-bottom"></i>检测项
      </div>
      <div>
        <el-checkbox-group v-model="check_prod.testitem_ids">
          <el-checkbox v-for="i in checked_items" :label='i.id'>{{i.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <div style="text-align: right;margin:10px 5px;">
      <el-button type="primary" size="mini" @click="Save">Save</el-button>
    </div>
  </div>-->
  <div class="div">
    <table
      border="1"
      bordercolor="#E5E5E5"
      style="border-collapse: collapse;width:100%;font-size:14px;background-color: #fff"
    >
      <tr>
        <td style="width:120px;">{{$t('quality.quality_list.quality_list1')}}</td><!-- 公司名称 -->
        <td>
          <el-autocomplete
            v-model="check_prod.company_name"
            :fetch-suggestions="querySearch"
            size="mini"
            @select="handleSelect"
            clearable
            :trigger-on-focus="false"
          >
            <template slot-scope="{ item }">
              <div>{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </td>
        <td style="width:80px;">{{$t('quality.quality_list.contact_name')}}</td><!-- 联系人 -->
        <td style="width:220px;">
          <el-autocomplete
            v-model="check_prod.contact_name"
            :fetch-suggestions="querySearch_contact"
            size="mini"
            @select="handleSelect_contact"
          >
            <template slot-scope="{ item }">
              <div>{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </td>
        <td style="width:80px;">{{$t('quality.quality_list.telephone')}}</td><!-- 联系电话 -->
        <td>
          <el-input v-model="check_prod.telephone" size="small"></el-input>
        </td>
      </tr>
      <tr>
        <td>{{$t('quality.quality_list.name')}}</td><!-- 产品名称 -->
        <td>
          <el-autocomplete
            v-model="check_prod.name"
            :fetch-suggestions="querySearch_prod"
            size="mini"
            @select="handleSelect_prod"
            clearable
            :trigger-on-focus="false"
          >
            <template slot-scope="{ item }">
              <div>{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </td>
        <td>CAS</td>
        <td>
          <el-autocomplete
            v-model="check_prod.cas"
            :fetch-suggestions="querySearch_cas"
            size="mini"
            @select="handleSelect_cas"
            clearable
            :trigger-on-focus="false"
          >
            <template slot-scope="{ item }">
              <div>{{ item.cas }}</div>
            </template>
          </el-autocomplete>
        </td>
        <td style="width:100px;">{{$t('quality.quality_list.batchno')}}</td><!-- 批次 -->
        <td>
          <el-input v-model="check_prod.batchno" size="small"></el-input>
        </td>
      </tr>
      <tr>
        <td>{{$t('quality.quality_list.warehouse')}}</td><!-- 所在仓库 -->
        <td>
          <el-autocomplete
            v-model="check_prod.warehouse_name"
            :fetch-suggestions="querySearch_warehouse"
            size="mini"
            @select="handleSelect_warehouse"
            clearable
          >
            <template slot-scope="{ item }">
              <div>{{ item.name }}</div>
            </template>
          </el-autocomplete>
        </td>
        <td>{{$t('quality.quality_list.storagecondition')}}</td><!-- 保存条件 -->
        <td>
          <el-autocomplete
            v-model="check_prod.storagecondition"
            :fetch-suggestions="querySearch_storagecondition"
            size="mini"
            @select="handleSelect_storagecondition"
            clearable
          >
            <template slot-scope="{ item }">
              <div>{{ item.name }}</div>
            </template>
          </el-autocomplete>
          <!-- <el-input v-model="check_prod.storagecondition" placeholder="请输入"></el-input> -->
        </td>
        <td>{{$t('quality.quality_list.quality_list2')}}</td><!-- 备注（可选） -->
        <td>
          <el-input
            type="textarea"
            :rows="2"
            v-model="check_prod.note"
            resize="both"
            size="small"
          ></el-input>
        </td>
      </tr>
      <tr>
        <td>{{$t('quality.quality_list.items')}}</td><!-- 检测项目 -->
        <td colspan="5">
          <span v-for="i in checked_items" :label="i.id" style="margin:0 5px">
            <el-checkbox v-model="i.checked" name="type" v-if="i.child.length==0">{{i.name}}</el-checkbox>
          </span><br>
            <div v-for="i in checked_items" v-if="i.child.length!=0" style="display: inline-block;width:40%;">
              <span>{{i.name}}</span>:
              <el-checkbox
                class="checkbox_nei"
                v-for="j in i.child"
                :key="j.id"
                :label="j.id"
                v-model="j.checked"
                @change="select(j.id,j.checked)"
                style="margin-left: 10px;padding-left:0px;"
              >
                <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
              </el-checkbox>
            </div>
        </td>
      </tr>
    </table>
    <div style="text-align:right;margin-top:10px;">
      <el-button type="primary" size="mini" @click="Save" :loading='loading?true:false'>{{$t('save')}}</el-button>
      <el-button size="mini" @click="back">{{$t('back')}}</el-button>
    </div>
  </div>
</template>

<script>
import {
  member_company,
  contact_info,
  chemprod_list,
  testitem,
  quality_create,
  testitem_destroy
} from "@/api/quality";
import $ from "jquery";
import { setTimeout } from "timers";
export default {
  name: "",
  data() {
    return {
      addForm_loadingSave: false,
      dialogAdd: false,
      index: "",
      check_prod: {
        company_name: "",
        company_id: "",
        contact_id: "",
        contact_name: "",
        telephone: "",
        prod_id: "",
        name: "",
        cas: "",
        batchno: "",
        storagecondition: "",
        warehouse_name: "",
        warehouse_id: "",
        note: "",
        img: "",
        svg: "",
        testitem_ids: []
      },

      user_id: "",
      companys: [],
      contacts: [],

      prods: [],
      prod_id: "",
      itemtype: [],
      items: [],
      checked_items: [],
      warehouse: [],
      storagecondition:[],
      go: false,
      loading: false
    };
  },
  watch: {
    user_id(val) {
      this.contacts.forEach((item, index) => {
        if (val == item.id) {
          this.check_prod.telephone = item.phone;
        }
      });
    }
  },
  created() {
    // chemprod_list().then(res=>{
    //     this.prods=res.data.data
    // })
    testitem().then(res => {
      // this.itemtype = res.enum.Testprodcate;
      this.checked_items = res.data;
      this.warehouse = res.enum.warehouse;
      obj(this.storagecondition,res.enum.StorageCondition)
    });
  },
  methods: {
    select(id,checked) {
        if(checked){
            this.checked_items.forEach((items, index) => {
                items.child.forEach((m, n) => {
                    if (id == m.id) {
                        this.$set(this.checked_items[index], "checked", true);
                    }
                });
            });
        }else{
            this.checked_items.forEach((items, index) => {
                items.child.forEach((m, n) => {
                    if (id == m.id) {
                        this.$set(this.checked_items[index], "checked", false);
                    }
                });
            });
        }
    },
    select_parent() {
      this.checked_items.forEach((items, index) => {
        if (!items.checked) {
          items.child.forEach((m, n) => {
            m.checked = false;
          });
        }
      });
    },
    querySearch(queryString, cb) {
      if (queryString != "") {
        member_company(queryString).then(res => {
          var restaurants = res.data;
          cb(restaurants);
        });
      }
    },
    handleSelect(item) {
      this.check_prod.company_name = item.name;
      this.check_prod.company_id = item.id;
      this.get_contact(item.id);
    },
    querySearch_contact(queryString, cb) {
      var restaurants = this.contacts;
      cb(restaurants);
    },
    handleSelect_contact(item) {
      this.check_prod.contact_id = item.id;
      this.check_prod.contact_name = item.name;
      this.check_prod.telephone = item.phone;
    },
    querySearch_prod(queryString, cb) {
      if (queryString !== "") {
        chemprod_list(queryString).then(res => {
          var restaurants = res.data;
          cb(restaurants);
        });
      }
    },
    handleSelect_prod(item) {
      this.check_prod.name = item.name;
      this.check_prod.cas = item.cas;
      this.check_prod.img = item.img;
      this.check_prod.svg = item.svg;
      this.check_prod.batchno = item.batchno;
      this.check_prod.storagecondition = item.storagecondition;
      this.check_prod.note = item.note;
    },
    querySearch_cas(queryString, cb){
      if (queryString !== "") {
        chemprod_list(queryString).then(res => {
          var restaurants = res.data;
          cb(restaurants);
        });
      }
    },
    handleSelect_cas(item){
      this.check_prod.name = item.name;
      this.check_prod.cas = item.cas;
      this.check_prod.img = item.img;
      this.check_prod.svg = item.svg;
      this.check_prod.batchno = item.batchno;
      this.check_prod.storagecondition = item.storagecondition;
      this.check_prod.note = item.note;
    },
    querySearch_warehouse(queryString, cb) {
      var restaurants = this.warehouse;
      cb(restaurants);
    },
    handleSelect_warehouse(item) {
      this.check_prod.warehouse_name = item.name;
      this.check_prod.warehouse_id = item.id;
    },
    querySearch_storagecondition(queryString, cb) {
      var restaurants = this.storagecondition;
      cb(restaurants);
    },
    handleSelect_storagecondition(item) {
      this.check_prod.storagecondition = item.name;
    },
    // remoteMethod(query) {
    //   if (query !== "") {
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       member_company(query).then(res => {
    //         this.companys = res.data;
    //       });
    //     }, 500);
    //   } else {
    //     this.companys = [];
    //   }
    // },
    remoteMethod_prod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          chemprod_list(query).then(res => {
            this.prods = res.data;
            this.loading = false;
          });
        }, 500);
      } else {
        this.prods = [];
      }
    },
    // go_to(id){
    //     this.$router.push({
    //         path: '/User/customerForm',
    //         name: 'User-customerForm',
    //         query: {
    //             id:id
    //         }
    //     })
    // },
    back() {
      this.$emit("getValue", 0);
    },
    get_contact(id) {
      contact_info(id).then(res => {
        this.contacts = res.data;
        if (this.contacts.length > 0) {
          this.go = false;
          this.contacts.forEach((item, index) => {
            if (item.is_default == 1) {
              this.check_prod.contact_id = item.id;
              this.user_id = item.id;
            }
          });
        } else {
          this.go = true;
          this.user_id = "";
          this.check_prod.contact_id = "";
          this.check_prod.telephone = "";
        }
      });
    },
    get_telephone(id) {
      this.contacts.forEach((item, index) => {
        if (id == item.id) {
          this.check_prod.telephone = item.phone;
        }
      });
    },
    toggle_basis() {
      $(".basis .el-card__body").toggle();
    },

    prod_detail(id) {
      this.prods.forEach((items, index) => {
        if (id == items.cas) {
          this.check_prod.img = items.img;
          this.check_prod.svg = items.svg;
          this.check_prod.name = items.name;
          this.check_prod.batchno = items.batchno;
          this.check_prod.storagecondition = items.storagecondition;
          this.check_prod.warehouse = items.warehouse;
          this.check_prod.note = items.note;
        }
      });
    },
    toggle_prod() {
      $(".prod .el-card__body").toggle();
    },

    // select_type(item, index) {
    //   let query = {
    //     testprodcate_id: item.type
    //   };
    //   testitem(query).then(res => {
    //     this.check_prod.testitems[index].items = res.data.data;
    //   });
    // },
    // add_testitem() {
    //   this.check_prod.testitems.push({
    //     type: "",
    //     name: "",
    //     items: []
    //   });
    // },
    // delete_testitem(item, index) {
    //   this.check_prod.testitems.splice(index, 1);
    // },
    toggle_testitem() {
      $(".testitem .el-card__body").toggle();
    },
    Save() {
      // this.check_prod.testitems.forEach((items, index) => {
      //   this.check_prod.testitem_ids.push(items.id);
      // });
      // this.check_prod.testitem_ids = unique(this.check_prod.testitem_ids);
      this.check_prod.testitem_ids = JSON.parse(
        JSON.stringify(this.checked_items)
      );
      var arr = [];
      this.check_prod.testitem_ids.forEach(item => {
        if (item.checked == true) {
          arr.push(item);
        }
      });
      arr.forEach(item => {
        if (item.child.length > 0) {
          var brr = [];
          item.child.forEach(i => {
            if (i.checked == true) {
              brr.push(i.id);
            }
          });
          item.child = brr;
        }
      });
      var obj = {};
      arr.forEach(item => {
        obj[item.id] = item.child;
      });
      // this.check_prod.testitem_ids = []
      // for (let i in obj) {
      //   this.check_prod.testitem_ids.push(obj[i]);
      // }
      this.check_prod.testitems = obj;
      // console.log(this.check_prod);
      quality_create(this.check_prod, this);
    }
  }
};
function obj(arr, object) {
  if (arr.length == 0) {
    for (let i in object) {
      arr.push(object[i]);
    }
  }
}
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}
</script>

<style scoped>
</style>
