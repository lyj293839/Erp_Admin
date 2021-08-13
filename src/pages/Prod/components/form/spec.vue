<style lang="scss" scoped type="text/scss">
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
  /deep/table {
    border-collapse: collapse;
    width: 100%;
    .el-input__inner {
      border: 0px;
      padding: 0px 5px;
    }
    .el-select {
      width: 100%;
    }
    .el-textarea__inner {
      padding: 0px 5px;
      border: 0px;
      font-size: 14px;
    }
  }
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
    <el-card class="box-card specs" style="width: 100%;">
      <div slot="header" class="clearfix" style>
        <i @click="toggle_specs" class="el-icon-caret-bottom"></i>
        {{$t('product.specs.specs')}}
        <el-button style="float: right;" type="primary" size="mini" @click="add_specs">{{$t('add')}}</el-button>
      </div>
      <div
        style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);padding: 10px;margin: 10px 0;"
      >
        <!-- <div class="item1">
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.brand_id')}}</p>
                        <el-select v-model="item.brand_id" filterable  size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="i in brands"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.pack_size')}}</p>
                        <el-input v-model="item.pack_size" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.pack_number')}}</p>
                        <el-input v-model="item.pack_number" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.pack_unit_id')}}</p>
                        <el-select v-model="item.pack_unit_id" filterable  size="mini" placeholder="Please Select">
                            <el-option
                                    v-for="i in Unit"
                                    :key="i.id"
                                    :label="i.name"
                                    :value="i.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.inland_price')}}</p>
                        <el-input v-model="item.inland_price" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.abroad_price')}}</p>
                        <el-input v-model="item.abroad_price" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 140px;">
                        <p>{{$t('product.specs.purity')}}</p>
                        <el-input v-model="item.purity" size="mini" placeholder="请输入"></el-input>
                    </div>
                    <div class="d2-m-10" style="width: 400px;">
                        <p>{{$t('product.specs.note')}}:</p>
                        <el-input type="textarea" :rows="1" size="mini" v-model="item.note" placeholder="请输入备注"></el-input>
                    </div>
                    <div class="d2-mt-10 l_h80">
                        <el-button type="primary" size="mini" @click="save_specs(item)">{{$t('save')}}</el-button>
                        <el-button type="danger" size="mini" @click="delete_specs(item,index)">
                            {{$t('delete')}}
                        </el-button>
                    </div>
        </div>-->
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <td>{{$t('product.specs.brand_id')}}</td>
            <td><span style="color:red;">*</span>{{$t('product.specs.pack_size')}}</td>
            <td><span style="color:red;">*</span>{{$t('product.specs.pack_unit_id')}}</td>
            <td><span style="color:red;">*</span>{{$t('product.specs.pack_number')}}</td>
            <td><span style="color:red;">*</span>{{$t('product.specs.inland_price')}}</td>
            <td><span style="color:red;">*</span>{{$t('product.specs.abroad_price')}}</td>
            <td>{{$t('product.specs.purity')}}</td>
            <td>{{$t('product.specs.note')}}</td>
            <td>{{$t('product.specs.make')}}</td>
          </tr>
          <tr v-for="(item,index) in chemspec">
            <td>
              <el-select v-model="item.brand_id" filterable size="mini" placeholder="Please Select">
                <el-option v-for="i in brands" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="item.pack_size" size="mini" placeholder="请输入"></el-input>
            </td>

            <td>
              <el-select
                v-model="item.pack_unit_id"
                filterable
                size="mini"
                placeholder="Please Select"
              >
                <el-option v-for="i in Unit" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </td>
            <td>
              <el-input v-model="item.pack_number" size="mini" placeholder="请输入"></el-input>
            </td>
            <td>
              <el-input v-model="item.inland_price" size="mini" placeholder="请输入"></el-input>
            </td>
            <td>
              <el-input v-model="item.abroad_price" size="mini" placeholder="请输入"></el-input>
            </td>
            <td>
              <el-input v-model="item.purity" size="mini" placeholder="请输入"></el-input>
            </td>
            <td>
              <el-input
                type="textarea"
                :rows="1"
                size="mini"
                v-model="item.note"
                placeholder="请输入备注"
              ></el-input>
            </td>
            <td style="width:130px;text-align:center;">
              <el-button type="primary" size="mini" @click="save_specs(item)" :loading="save_fy">{{$t('save')}}</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="delete_specs(item,index)"
              >{{$t('delete')}}</el-button>
            </td>
          </tr>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { create, update, destroy, brand } from "@/api/prod";
import $ from "jquery";
export default {
  name: "",
  data() {
    return {
      prod_id: "",
      save_fy:false,
      chemspec: [
        {
          prod_id: "",
          brand_id: 1,
          pack_size: "",
          pack_number: "",
          inland_price: "",
          abroad_price: "",
          note: "",
          purity: "",
          pack_unit_id: ""
        }
      ],
      user_lists: [],
      brands: [],
      Unit: []
    };
  },
  props: {
    datas: {
      type: Array
    }
  },
  watch: {
    datas(val) {
      if (val != null) {
        this.chemspec = val;
      }
    }
  },
  created() {
    this.$bus.on("prod_id", target => {
      this.prod_id = target;
    });
    this.$bus.on("enum", target => {
      this.brands = target.Brand;
      this.Unit = target.Unit;
    });
  },
  methods: {
    add_specs() {
      this.chemspec.push({
        prod_id: "",
        brand_id: 1,
        pack_size: "",
        pack_number: 1,
        inland_price: "",
        abroad_price: "",
        note: "",
        purity: "",
        pack_unit_id: 1
      });
    },
    delete_specs(item, index) {
      if (item.id) {
        destroy(item, "chemspec", "destroy", this, index);
      } else {
        this.chemspec.splice(index, 1);
      }
    },
    toggle_specs() {
      $(".specs .el-card__body").toggle();
    },
    save_specs(item) {
      item.prod_id = this.prod_id;
      this.save_fy = true
      if (item.id) {
        update(item, "chemspec", "update", this);
      } else {
        create(item, "chemspec", "create", this);
      }
    }
  }
};
</script>
