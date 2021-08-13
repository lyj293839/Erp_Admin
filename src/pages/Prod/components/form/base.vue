<style lang="scss" scoped type="text/scss">
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
</style>
<template>
  <div>
    <el-card class="box-card basis" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_basis" class="el-icon-caret-bottom"></i>
        {{$t('product.basis.basis')}}
        <el-button style="float: right;" type="primary" size="mini" @click="back()">{{$t('back')}}</el-button>
      </div>
      <div class>
        <el-row>
          <el-col :span="11">
            <div class="d2-m-10">
              <p>{{$t('product.basis.name')}}</p>
              <el-input v-model="basis.name_cn" size="mini" placeholder="请输入"></el-input>
            </div>
          </el-col>
          <el-col :span="2" class="d2-text-center" style="margin-top: 28px;">
            <el-button class="btn-text can-hover" type="text" @click="translates">
              <d2-icon
                v-if="!((basis.name_cn&&basis.name)||(!basis.name_cn&&!basis.name))"
                name="exchange"
                style="font-size: 16px;"
              />
            </el-button>
          </el-col>
          <el-col :span="11">
            <div class="d2-m-10">
              <p>{{$t('product.basis.english_name')}}</p>
              <el-input
                v-model="basis.name"
                size="mini"
                placeholder="请输入"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="d2-m-10">
              <p>SMILES</p>
              <el-input
                v-model="basis.smiles"
                size="mini"
                placeholder="请输入"
              ></el-input>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="d2-m-10">
              <p>分子式</p>
              <el-input
                      v-model="basis.mf"
                      size="mini"
                      placeholder="" disabled
              ></el-input>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="d2-m-10">
              <p>分子量</p>
              <el-input
                      v-model="basis.mw"
                      size="mini"
                      placeholder="" disabled
              ></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="item1">
        <div class="d2-m-10" style="width: 140px;">
          <p style="height: 20.8px;">CAS</p>
          <el-input v-model="basis.cas" size="mini" placeholder="请输入"></el-input>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p style="height: 20.8px;">MDL</p>
          <el-input v-model="basis.mdl" size="mini" placeholder="请输入"></el-input>
        </div>
        <div v-if="basis.itemno" class="d2-m-10" style="width: 140px;">
          <p>{{$t('product.basis.itemno')}}</p>
          <el-input v-model="basis.itemno" size="mini" disabled placeholder="请输入"></el-input>
        </div>
        <!-- <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('product.basis.hscode')}}</p>
          <el-input v-model="basis.hscode" size="mini" placeholder="请输入"></el-input>
        </div> -->
        <div class="d2-m-10" style="width: 140px;">
          <p>
            <span style="color:red;">*</span>
            {{$t('product.basis.chemicalcate_id')}}
          </p>
          <el-select
            v-model="basis.chemicalcate_id"
            filterable
            size="mini"
            placeholder="Please Select"
          >
            <el-option v-for="(i,index) in ChemicalType" :key="index" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>{{$t('product.basis.chemprodappearance_id')}}</p>
          <el-select
            v-model="basis.chemprodappearance_id"
            filterable
            size="mini"
            placeholder="Please Select"
          >
            <el-option
              v-for="(i,index) in ChemicalAppearance"
              :key="index"
              :label="i.name"
              :value="i.id"
            ></el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 170px;">
          <p>{{$t('product.basis.tag')}}</p>
          <el-checkbox-group
            v-model="basis.is_advantage"
            style="display: inline-block;height: 28px;line-height: 28px;"
          >
            <el-checkbox
              :label="basis.is_advantage"
              :true-label="1"
              :false-label="0"
            >{{$t('product.basis.is_advantage')}}</el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group
            v-model="basis.is_secret"
            style="display: inline-block;margin-left:15px;height: 28px;line-height: 28px;"
          >
            <el-checkbox
              :label="basis.is_secret"
              :true-label="1"
              :false-label="0"
            >{{$t('product.basis.is_secret')}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="d2-m-10" style="width: 220px;">
          <p>{{$t('product.basis.notice_size')}}</p>
          <el-input
            v-model="basis.notice_size"
            size="mini"
            placeholder="请输入"
            autocomplete="off"
            style="width: 100px;"
          ></el-input>
          <el-select
            v-model="basis.notice_unit_id"
            filterable
            size="mini"
            style="width: 90px;margin-left: 5px;"
          >
            <el-option v-for="(i,index) in Unit" :key="index" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </div>
        <div class="d2-m-10" style="width: 140px;">
          <p>有效期(天)</p>
          <el-input-number
            v-model="basis.expired_interval"
            :min="0"
            :max="1000000"
            label="请输入"
            size="mini"
          ></el-input-number>
        </div>
        <div class="d2-m-10" style="width: 400px;">
          <p>{{$t('product.basis.note')}}</p>
          <el-input
            type="textarea"
            :rows="1"
            size="mini"
            v-model="basis.note"
            resize="both"
            placeholder="请输入备注"
          ></el-input>
        </div>
        <div>
          <el-image style="width: 200px; height: 200px" :src="basis.img+'?'+now" fit="fill"></el-image>
        </div>
      </div>
      <div class="d2-mt-10">
        <el-button
          type="primary"
          size="mini"
          :loading="search_loading?true:false"
          @click="check"
          v-text="basis.status==1?'已审核':'审核'"
        ></el-button>
        <el-button
           v-if="!type"
          type="primary"
          size="mini"
          :loading="basis.loading?true:false"
          @click="save_basis"
        >{{$t('save')}}</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  create,
  update,
  destroy,
  country_list,
  member_company,
  check_prod,
  translate,
  listTotalPost,
  listTotalPost_smiles
} from "@/api/prod";
import $ from "jquery";
export default {
  name: "",
  data() {
    return {
      dialogAdd: false,
      basis: {
        name: "",
        name_cn: "",
        cas: "",
        mdl: "",
        itemno: "",
        smiles: "",
        chemprodappearance_id: "",
        chemicalcate_id: "",
        notice_size: "",
        notice_unit_id: "",
        tag: "",
        hscode:'',
        is_advantage: "",
        is_secret: "",
        expired_interval: "",
        note: "",
        loading: false,
      },
      ChemicalAppearance: "",
      ChemicalType: "",
      Unit: "",
      prod_id: "",
      search_loading:false,
      type:false,
      now:Date.now()
    };
  },
  props: {
    datas: {
      type: Object
    }
  },
  watch: {
    "basis.name": function(val,oldval) {
      if (val&&oldval) {
        listTotalPost("chemprod/iupac", val).then(
          res => {
            this.basis.smiles = res.data.smiles;
            this.basis.is_iupac = res.data.is_iupac
          }
        );
      }
    },
    "basis.smiles": function(val) {
      if (val) {
        listTotalPost_smiles("chemprod/smiles", val).then(
          res => {
            this.now =Date.now()
            if(res.data.mf){
              this.basis.mf = res.data.mf
            }
            if(res.data.mw){
              this.basis.mw = res.data.mw
            }
            this.basis.img = res.data.img
          }
        );
      }
    },
    deep:true

  },
  created() {
    if (this.datas != undefined) {
      this.basis = this.datas;
    }
    this.$bus.on("enum", target => {
      this.ChemicalAppearance = target.ChemicalAppearance;
      this.ChemicalType = target.ChemicalType;
      this.Unit = target.Unit;
    });
      this.$bus.on('type', target => {
          if(target=='edit'){
              this.type=false
          }else{
              this.type=true
          }
      });
  },
  methods: {
    back() {
      this.$emit("getValue", false);
    },
    translates() {
      if (
        (this.basis.name_cn == null || this.basis.name_cn == "") &&
        (this.basis.name != null || this.basis.name != "")
      ) {
        translate("en", "zh", this.basis.name).then(res => {
          this.basis.name_cn = res.data.result.result;
          this.$set(this.basis, "name_cn", res.data.result.result);
        });
      } else if (
        (this.basis.name_cn != null || this.basis.name_cn != "") &&
        (this.basis.name == null || this.basis.name == "")
      ) {
        translate("zh", "en", this.basis.name_cn).then(res => {
          this.basis.name = res.data.result.result;
          this.$set(this.basis, "name", res.data.result.result);
        });
      }
    },
    toggle_basis() {
      $(".basis .el-card__body").toggle();
    },
    save_basis() {
      if (this.basis.id) {
        update(this.basis, "chemprod", "update", this);
      } else {
        create(this.basis, "chemprod", "create", this);
      }
    },
    check() {
      // if (this.basis.status !== 1) {
        var that = this;
        that.basis.status = 1
        that.search_loading= true;
        check_prod(that.basis).then(res => {
          if (res && res.code == 0) {
            that.search_loading = false;
            that.basis.status = 1;
            that.$message({
              message: res.msg,
              type: "success"
            });
          } else {
              that.search_loading = false;
            that.$message({
              message: res.msg,
              type: "error"
            });
          }
        });
      // }
    }
  }
};
</script>

<style scoped>
</style>
