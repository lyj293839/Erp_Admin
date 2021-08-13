<style lang="scss" scoped type="text/scss">
.form_title {
  background: #f1f1f1;
  margin-bottom: 5px;
  .el-button {
    color: black;
  }
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  td {
    font-size: 14px;
    padding: 0px 5px;
    line-height: 30px;
  }
}
.his_table{
  margin-bottom: 0px;
  border-top: 0px;
  td{
    border-top: 0px;
    line-height: 25px;
  }
}
/deep/.el-checkbox__inner {
  margin-left: 5px;
}
.el-checkbox {
  margin-right: 10px;
}
/deep/.el-textarea__inner {
  padding: 0px;
  border: none;
}
/deep/.el-input__inner{
  padding: 0px;
  border: none;
}
</style>
<template>
  <d2-container>
    <div>
      <div class="form_title">
        <el-button type="text" @click="form_show1 = !form_show1" icon="el-icon-arrow-down">
          <b>分析要求</b>
        </el-button>
      </div>
      <table border bordercolor="#E5E5E5" v-show="form_show1">
        <tr>
          <td width="100">分析要求</td>
          <td>
            <span
              v-for="i in testitems"
              :key="i.id"
              v-if="i.child && i.child.length==0"
              :label="i.id"
              style="margin:0 5px"
            >
              <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
            </span>
            <br />
            <div
              v-for="i in testitems"
              :key="i.id"
              v-if="i.child && i.child.length!=0"
              style="display: inline-block;width:50%;"
            >
              <span>{{i.name}}</span>
              <el-checkbox
                v-for="j in i.child"
                :key="j.id"
                :label="j.id"
                v-model="j.checked"
                @change="select()"
              >
                <span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span>
              </el-checkbox>
            </div>
          </td>
        </tr>
        <tr>
          <td>备注</td>
          <td>
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addTest.note"></el-input>
          </td>
        </tr>
      </table>
      <div style="text-align:right;margin-bottom:20px;" v-show="form_show1">
          <el-button type="primary" size="mini" @click="add_test()">确定</el-button>
          <el-button size="mini" @click="back()">返回</el-button>
      </div>
      <div v-if="roles_ids.indexOf(1)>-1||roles_ids.indexOf(19)>-1">
        <div class="form_title">
          <el-button type="text" @click="form_show2 = !form_show2" icon="el-icon-arrow-down">
            <b>检测结果修改</b>
          </el-button>
        </div>
        <table border bordercolor="#E5E5E5" v-show="form_show2">
          <tr>
            <td width='100'>检测结果</td>
            <td>
              <el-select
                v-model="test_status.order_result"
                clearable
                filterable
                size="mini"
                style="width: 100%;"
                :placeholder="$t('quality.queryList.status')"
              >
                <el-option v-for="i in order_result" :label="i.name" :value="i.id" :key="i.id"></el-option>
              </el-select>
            </td>
            <td width='100'>免检</td>
            <td>
              <el-checkbox v-model="test_status.if_need_check" true-label="1" false-label="0">免检</el-checkbox>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="3">
              <el-input type="textarea" :rows="2" v-model="test_status.checked_note"></el-input>
            </td>
          </tr>
        </table>
        <div style="text-align:right;margin-bottom:20px;" v-show="form_show2">
          <el-button type="primary" size="mini" @click="change_status()">确定</el-button>
          <el-button size="mini" @click="back()">返回</el-button>
        </div>
      </div>
      <div class="form_title">
        <el-button type="text" @click="form_show3 = !form_show3" icon="el-icon-arrow-down">
          <b>历史记录</b>
        </el-button>
      </div>
      <table border bordercolor="#E5E5E5" v-show="form_show3" class="his_table" v-for="(item,index) in test_hosdata">
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
        <tr v-for="(i,index_a) in item.testitems">
          <td :rowspan="item.testitems.length" v-if="index_a==0" width="100px">{{item.prod?item.prod.prodno:''}}</td>
          <td :rowspan="item.testitems.length" v-if="index_a==0" width="150px">{{item.batchno}}</td>
          <td :rowspan="item.testitems.length" v-if="index_a==0" width="100px">{{item.warehouse?item.warehouse.name:''}}</td>
          <td :rowspan="item.testitems.length" v-if="index_a==0">{{item.note}}</td>
          <td width="200px">
            {{i.testitem_name}}
            <span v-if="i.testitem_json_tostring">:{{i.testitem_json_tostring}}</span>
          </td>
          <td width="60px">{{getEnumValue(sampled_status,i.sampled_status)}}</td>
          <td width="80px">{{i.sampled_at}}</td>
          <td width="80px">{{i.created_at}}</td>
          <td width='120px'>{{i.note}}</td>
          <td width='60' align='center'>
            <el-button type="primary" size="mini" v-if="(i.sampled_status==2)&&permissions.indexOf(619)>-1" @click="cancelClick(i.id)">取消</el-button>
          </td>
        </tr>
      </table>
    </div>
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
import { mapActions } from "vuex";
import util from "@/libs/util";
export default {
  name: "Warehouse-test",
  data() {
    return {
      addTest: {
        inventory_id: "",
        testitems: [],
        note: ""
      },
      test_status: {
        id: "",
        order_result: "",
        if_need_check: "",
        checked_note: ""
      },
      form_show1:true,
      form_show2:true,
      form_show3:true,
      test_hosdata: [],
      testitems: [],
      order_result:[],
      sampled_status:[],
      roles_ids:[],
      permissions: JSON.parse(localStorage.getItem("permissions"))
    };
  },
  created() {
    var roles_ids_list = JSON.parse(localStorage.getItem("roles_ids"))
    this.roles_ids=[]
    roles_ids_list.forEach(item=>{
      this.roles_ids.push(item.id)
    })
    if(this.$route.query.batchno){
      this.fetchData();
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "Warehouse-test") {
        if(this.$route.query.batchno){
          this.fetchData();
        }
      }
    }
  },
  methods: {
    ...mapActions("d2admin/page", ["closeAdd"]),
    fetchData() {
      var clickList = {
        page: "1",
        batchno:this.$route.query.batchno
      };
      this.test_status.id = this.$route.query.id
      this.addTest.inventory_id = this.$route.query.id
      listPost(clickList, "sample/history").then(res => {
        this.test_hosdata = res.data.data;
        for (var i in res.enum.testitems) {
          if (res.enum.testitems[i].child) {
            var arr = [];
            obj(arr, res.enum.testitems[i].child);
            res.enum.testitems[i].child = arr;
          }
        }
        obj(this.testitems, res.enum.testitems);
        this.order_result =res.enum.order_result
        this.sampled_status = res.enum.sampled_status
      });
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
    add_test(){
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
      createCheck(this.addTest,this)
    },
    change_status(){
      change_checked_result(this.test_status, this);
    },
    cancelClick(id){
        let obj={
            id:id
        }
        cancleByBuy(obj,this)
    },
    back(){
      var that = this
      that.$router.push({
        path: "/Warehouse/inventory/index",
        name: "Warehouse-inventory"
      });
      const tagName = "Warehouse-test";
      that.closeAdd({ tagName });
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
</script>