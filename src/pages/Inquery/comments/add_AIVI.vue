<style lang="scss" scoped type="text/scss">
.dialog_aq{
  /deep/.el-dialog__body {
    padding: 0px 20px;
    padding-bottom: 20px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    td {
      line-height: 30px;
      text-align: left;
      /deep/.el-input__inner {
        border: 0px;
        padding-left: 10px;
      }
      /deep/.el-input__prefix{
        left:-10px;
      }
    }
  }
}
</style>
<template>
   <div class="dialog_aq">
       <div >
          <el-input size="mini" style="width:50%;margin-right:5px;" v-model="prod" placeholder="请输入cas或者批次号"></el-input>
          <el-button @click="search_sure()" type="primary" size="mini">搜索</el-button>
          <a :href="prod_export_url" ref="prod_export_url" hidden></a>
        </div>
      <div style="width:180px;margin-top:10px;">
        <img src="../../../../public/image/theme/d2/logo/60.jpg" style="width:100%;" />
      </div>
      <div style="text-align:center;margin:20px 0px;font-size:16px;">
        <span><b>上海凯为化学技术有限公司</b></span>
      </div>
      <div style="text-align:center;margin:10px 0px;font-size:14px;">
          <span>产品质量分析报告</span>
      </div>
      <div style="padding-bottom:10px;">
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <td>
                <b>产品名称:</b>
            </td>
            <td colspan="2">
                <el-input v-if="prod_list_aq.product_name" size="mini" style="width:100%;" v-model="prod_list_aq.product_name"></el-input>
            </td>
          </tr>
          <tr>
            <td><b>CAS No:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.cas"></el-input>
            </td>
            <td style="text-align:center;"><b>结构</b></td>
          </tr>
          <tr>
            <td><b>分子式:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.mf"></el-input>
            </td>
            <td rowspan="5" style="text-align:center;">
              <el-image
                style="width: 250px;"
                :src="prod_list_aq.imgstructure+'?'+now"
              ></el-image>
            </td>
          </tr>
          <tr>
            <td><b>分子量:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.mw"></el-input>
            </td>
          </tr>
          <tr>
            <td><b>储藏温度:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.storecond"></el-input>
            </td>
          </tr>
            <tr>
            <td><b>产品批号:</b></td>
            <td>
              <el-autocomplete
                clearable
                size="mini"
                v-model="prod_list_aq.batchno"
                :fetch-suggestions="querySearchAsync_corporation"
                :trigger-on-focus="true"
                @select="handleSelect_corporation"
                style="width:100%;"
              >
                <template slot-scope="{ item }">
                  <div>{{ item.batchno }}</div>
                </template>
              </el-autocomplete>
            </td>
          </tr>
          <tr>
            <td><b>生产日期:</b></td>
            <td>
              <el-date-picker
                v-model="prod_list_aq.manufactured_at"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                type="date"
                size="mini"
                style="width:100%;"
                clearable
                :disabled="date_able">
              </el-date-picker>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <td><b>检测项目</b></td>
            <td><b>结果</b></td>
            <td><b>检查结果</b></td>
            <td><b>操作</b></td>
          </tr>
          <tr v-for="(item,index) in prod_list_aq.testitem" :key='item.id'>
            <td>
              <el-select
                size="mini"
                v-model="item.testitem_id"
                clearable
                filterable
                @change="select_(item)"
                style="width:100%;"
              >
                <el-option
                  v-for="i in Testitem"
                  :key='i.id'
                  :label="i.coa_name==i.name?i.coa_name:i.coa_name+'('+i.name+')'"
                  :value="i.id"
                >
                </el-option>
              </el-select>
            </td>
            <td>
              <el-autocomplete
                                    clearable
                                    v-if="item.testitem=='Appearance'"
                                    size='mini'
                                    v-model="item.Results"
                                    :fetch-suggestions="querySearchAsync_corporation_wg"
                                    :trigger-on-focus="true"
                                    @focus="select_index(index)"
                                    @select="handleSelect_corporation_wg"
                            >
                                <template slot-scope="{ item }">
                                <div>{{ item.name }}</div>
                                </template>
                            </el-autocomplete>
              <el-input v-else size="mini" v-model="item.Results"></el-input>
            </td>
            <td>
              <span v-if="item.check_result==1" style="color:#67C23A;">合格</span>
              <span v-else-if="item.check_result==2" style="color:#E6A23C;">降格通过</span>
              <span v-else-if="item.check_result==11" style="color:#F56C6C;">不合格</span>
            </td>
            <td>
              <el-button @click="delete_test(index)" type="danger" size="mini">-</el-button>
              <el-button @click="up(index)" icon="el-icon-arrow-up" size="mini"></el-button>
              <el-button @click="down(index)" icon="el-icon-arrow-down" size="mini"></el-button>
            </td>
          </tr>
        </table>
        <div style="text-align:right;margin-top:10px;">
          <el-button @click="add_test()" type="primary" size="mini">+</el-button>
        </div>
      </div>
      <div style="margin:40px 0px;font-size:13px;">
        <div style="display:flex;justify-content: flex-end;margin:10px 0px;">
            <div><b>检测员/日期:</b> </div>
            <div style="border-bottom:1px solid black;margin-left:10px;width:180px;text-align:center;">
              Li Yan/
              <span style="margin-left:3px;">{{date_time}}</span>
            </div>
        </div>
        <div style="display:flex;justify-content: flex-end;">
            <div><b>QA专员/日期:</b> </div>
            <div style="border-bottom:1px solid black;margin-left:10px;width:180px;text-align:center;">
              Dean Chen/
              <span style="margin-left:3px;">{{date_time}}</span>
            </div>
        </div>
      </div>
      <div style="text-align:center;font-size:12px;color:#808080;">
          <span>上海市浦东新区秋月路26号1号楼216室，邮编：200437</span><br>
          <span>http://www.aivichem.com	Tel (中国):+86 22 5998 7315   邮箱：service@aivichem.com</span>
      </div>
      <div style="text-align:right;margin:20px 0px;">
        <el-button @click="aq_save()" type="primary" :loading="save_loading" size="mini">生成</el-button>
        <el-button size="mini" @click="close_Add()">取消</el-button>
      </div>
      <!-- <div style="text-align:right;margin:10px 0px;" v-for="item in aaa">
        <el-checkbox
                v-if="item.name=='生成'"
                v-model="item.need_seal"
                :true-label="1"
                :false-label="0"
                style="margin: 0 10px;"
        >图章</el-checkbox>
        <span style="margin-right:5px;">
          <b>{{item.name}}:</b>
        </span>
        <span>
          <el-select
                  size="mini"
                  v-model="item.obj"
                  clearable
                  v-if="item.list.length>1"
                  style="width:120px;margin-right:5px;"
          >
            <el-option v-for="i in item.list" :label="i.name" :value="i.val">
            </el-option>
          </el-select>
          <el-button @click="aaa_save(item)" type="primary" size="mini">{{item.name=='生成'?'生成(word)':'确认'}}</el-button>
          <el-button v-if="item.name=='生成'" @click="aq_getPdf()" type="primary" size="mini">生成(pdf)</el-button>
        </span>
      </div> -->
   </div>
</template>

<script>
    import {
    generatecoa,
    search_coa,
    inquery_generate,
    coa_approve,
    coa_review,
    coa_generate,
    } from "@/api/quality";
    import $ from 'jquery'
    import util from "@/libs/util";
    export default {
        name: "",
        data() {
            return {
                Testitem:[],
                date_time:'',
                save_loading:false,
                 prod:'',
                batch_list:'',
                now:'',
                prod_list_aq:{testitem:[]},
                is_ak:'',
                aaa:[],
                prod_export_url:'',
                date_able:false,
                ChemicalAppearance:[],
                StorageCondition:[],
                index:''
            }
        },
        props: ['coa_cas','coa_batchno'],
        watch:{
            coa_cas(news, olds){
                if(news){
                    this.prod = this.coa_cas
                    this.search_sure()
                }
            }
        },
        created() {
            this.fetchData()
            if(this.coa_cas){
                this.prod = this.coa_cas
                this.search_sure()
            }
        },
        methods: {
            fetchData() {
                this.date_time = init()
                this.Testitem =JSON.parse(JSON.stringify(this.GEnums.TestitemCOA));
                this.StorageCondition = this.GEnums?this.GEnums.StorageCondition:[];
                obj(this.ChemicalAppearance,this.GEnums.ChemicalAppearance)
                // this.ChemicalAppearance =JSON.parse(JSON.stringify(this.GEnums.ChemicalAppearance));
                    for (var i in this.Testitem) {
                        if (this.Testitem[i].pid != 0) {
                            delete this.Testitem[i];
                        }
                }
            },
            up(index){
                this.upGo(this.prod_list_aq.testitem,index)
            },
            down(index){
                this.downGo(this.prod_list_aq.testitem,index)
            },
            search_sure() {
                search_coa(this.prod).then(res => {
                    this.now = Date.now();
                    var storage_cond = ''
                    if(res.data.product&&res.data.product.storage_cond&&res.data.product.storage_cond.length>0){
                      res.data.product.storage_cond.forEach((i,index)=>{
                        if(index!=(res.data.product.storage_cond.length-1)){
                          storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i,'name')+','
                        }else{
                          storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i,'name')
                        }
                      })
                    }
                    this.batch_list = res.data.batchnos;
                    this.prod_list_aq = {
                        template: "AIVI",
                        product_name_cn: res.data.product?res.data.product.name_cn:'',
                        product_name: res.data.product?res.data.product.name:'',
                        cas: res.data.product?res.data.product.cas:this.prod,
                        mf: res.data.product?res.data.product.mf:'',
                        mw: res.data.product?res.data.product.mw:"",
                        batchno:this.coa_batchno?this.coa_batchno:
                        (res.data.batchnos.length == 1 ? res.data.batchnos[0].batchno : ""),
                        weight: "",
                        manufactured_at: 
                        res.data.batchnos.length == 1 ? res.data.batchnos[0].manufactured_at.substring(0,res.data.batchnos[0].manufactured_at.indexOf(' ')) : "",
                        imgstructure: res.data.product?res.data.product.imgstructure:'',
                        testitem: [],
                        productid:res.data.product?res.data.product.prodno:'',
                        storecond:storage_cond
                    };
                    if(this.prod_list_aq.manufactured_at){
                        this.date_able = true
                    }
                    // if(res.data.testitems.length>0){
                    //   res.data.testitems.forEach(item => {
                    //     this.select_(item)
                    //     if (item.testitem_name) {
                    //       var obj = {
                    //         id: item.id,
                    //         testitem_id: item.testitem_id,
                    //         testitem: item.testitem,
                    //         Specifications: item.specifications ? item.specifications : "",
                    //         Results: item.result,
                    //         check_result: item.check_result,
                    //         coa_name: item.coa_name ? item.coa_name : "",
                    //         coa_name_en: item.coa_name_en ? item.coa_name_en : "",
                    //       };
                    //       this.prod_list_aq.testitem.push(obj);
                    //     }
                    //   });
                    // }else{
                      var batchnos_item = res.data.batchnos.filter(i=>{return i.batchno==this.prod_list_aq.batchno})[0]
                      for(var item in this.Testitem){
                        if(this.Testitem[item].coa_default==1){
                          var obj = {
                            testitem_id: this.Testitem[item].id,
                            testitem: this.Testitem[item].name,
                            Specifications: this.Testitem[item].specification ? this.Testitem[item].specification : "",
                            Results: this.Testitem[item].coa_result_cn?this.Testitem[item].coa_result_cn:'',
                            check_result: this.Testitem[item].check_result?this.Testitem[item].check_result:'',
                            coa_name: this.Testitem[item].coa_name ? this.Testitem[item].coa_name : "",
                            coa_name_en: this.Testitem[item].coa_name_en ? this.Testitem[item].coa_name_en : "",
                            coa_rank:this.Testitem[item].coa_rank?this.Testitem[item].coa_rank.toString():''
                          };
                          this.prod_list_aq.testitem.push(obj);
                        }
                      }
                      this.prod_list_aq.testitem.sort(
                        function compareFunction(param1, param2) {
                          return param1.coa_rank.localeCompare(param2.coa_rank);
                        }
                      );
                      this.handleSelect_corporation(batchnos_item)
                    // }
                })
            },
            querySearchAsync_corporation_wg(queryString, cb){
                var restaurants = '';
                // if(queryString){
                    restaurants=this.ChemicalAppearance
                    cb(restaurants)
                // }else{
                //     cb(restaurants)
                // }
            },
            handleSelect_corporation_wg(item){
                this.prod_list_aq.testitem[this.index].Results = item.name
            },
            select_index(index) {
                this.index = index
            },
            querySearchAsync_corporation(queryString, cb) {
                var restaurants = "";
                restaurants = this.batch_list;
                cb(restaurants);
            },
            handleSelect_corporation(item) {
                this.prod_list_aq.batchno = item.batchno;
                this.prod_list_aq.manufactured_at = item.manufactured_at.substring(0,item.manufactured_at.indexOf(' '))
                if(this.prod_list_aq.manufactured_at){
                    this.date_able = true
                }
                var arr = []
                item.storage_cond.forEach(i=>{
                    arr.push(this.getEnumValue(this.StorageCondition,i))
                })
                this.prod_list_aq.testitem.forEach(i=>{
                    if(i.testitem=='Appearance'){
                     i.Results = item.chemprodappearance_id?this.GEnums.ChemicalAppearance[item.chemprodappearance_id].name_cn:i.Results
                    }
                    if(i.testitem=='Purity'){
                     i.Results = item.purity
                    }
                    if(i.testitem=='StorageCondition'){
                     i.Results = arr.join()
                    }
                })
                this.$forceUpdate();
            },
            select_(item){
                for (var i in this.Testitem) {
                    if (
                        item.testitem_id &&
                        this.Testitem[i].id == item.testitem_id
                    ) {
                        item.testitem_id = this.Testitem[i].id;
                        item.testitem = this.Testitem[i].name_en;
                        item.coa_name = this.Testitem[i].coa_name==this.Testitem[i].name?this.Testitem[i].coa_name:this.Testitem[i].coa_name+'('+this.Testitem[i].name+')';
                        item.coa_name_en = this.Testitem[i].coa_name_en==this.Testitem[i].name_en?this.Testitem[i].coa_name_en:this.Testitem[i].coa_name_en+'('+this.Testitem[i].name_en+')';
                      }
                }
            },
            add_test() {
                    this.prod_list_aq.testitem.push({
                    testitem_id: "",
                    testitem: "",
                    Specifications: "",
                    Results: "",
                    check_result: "",
                    coa_name: "",
                    coa_name_en: ""
                    });
            },
            delete_test(index) {
                    this.prod_list_aq.testitem.splice(index, 1);
            },
            aq_save() {
                this.save_loading = true
                inquery_generate(this.prod_list_aq, this);
            },
            close_Add() {
                this.prod_list_aq = { testitem: [] };
                this.batch_list = [];
                this.aaa = []
                this.prod = "";
                this.date_able = false
                this.$emit('close_Add')
            },
            close_Add_child() {
                this.prod_list_aq = { testitem: [] };
                this.batch_list = [];
                this.aaa = []
                this.prod = "";
                this.date_able = false
            },
            aaa_save(item){
                var obj = {
                    id:item.id,
                }
                if(item.name=='coa.review'){
                    obj[item.obj_name] = item.obj
                    coa_review(obj,this)
                }else if(item.name=='审核'){
                    obj[item.obj_name] = item.obj 
                    coa_review(obj,this)
                }else if(item.name=='签发'){
                    obj[item.obj_name] = item.obj 
                    coa_approve(obj,this)
                }else if(item.name=='生成'){
                    // obj['need_seal'] = item.need_seal
                    obj['template'] = this.is_ak==1?'AIKON':'ANGENE'
                    coa_generate(obj,this)
                }
            },
        }
    }
    function obj(arr, object) {
        for (let i in object) {
            arr.push(object[i]);
        }
    }
    function init() {
      var date = new Date();
      // 年
      var year = date.getFullYear();
      // 月
      var month = date.getMonth() + 1;
      // 日
      var day = date.getDate();
      month = month < 10 ? "0" + month : month; // 如果小于10即显示为09月
      day = day < 10 ? "0" + day : day; // 如果小于10即显示为09日

      return String(year) + '/'+ String(month)+'/'+String(day);
    }
</script>

