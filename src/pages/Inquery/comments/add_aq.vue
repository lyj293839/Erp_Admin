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
      text-align: center;
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
      <div style="width:150px;">
        <img src="../../../../public/image/theme/d2/logo/angene.png" style="width:100%;" />
      </div>
      <div style="text-align:center;margin:20px 0px;font-size:16px;">
        <span><b>CERTIFICATE OF ANALYSIS</b></span>
      </div>
      <div style="border-bottom:1px solid black;padding-bottom:10px;">
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <td><b>Chemical Name:</b>
              <el-input v-if="prod_list_aq.product_name" size="mini" style="width:200px;" v-model="prod_list_aq.product_name"></el-input>
            </td>
            <td><b>Batch Number:</b></td>
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
            <td><b>Chemical Structure:</b></td>
            <td><b>CAS Registry No:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.cas"></el-input>
            </td>
          </tr>
          <tr>
            <td rowspan="6">
              <el-image
                style="width: 300px;"
                :src="prod_list_aq.imgstructure+'?'+now"
              ></el-image>
            </td>
            <td><b>Product ID:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.productid"></el-input>
            </td>
          </tr>
          <tr>
            <td><b>Manufacture Date:</b></td>
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
          <tr>
            <td><b>Storage Temperature:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.storecond"></el-input>
            </td>
          </tr>
          <tr>
            <td><b>Formula:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.mf"></el-input>
            </td>
          </tr>
          <tr>
            <td><b>Molecular Weight:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.mw"></el-input>
            </td>
          </tr>
          <tr>
            <td><b>Quantity:</b></td>
            <td>
              <el-input size="mini" v-model="prod_list_aq.weight"></el-input>
            </td>
          </tr>
        </table>
      </div>
      <div style="margin:20px 0px;font-size:16px;">
        <span><b><u>Analysis Data</u></b></span>
      </div>
      <div>
        <table border="1" bordercolor="#E5E5E5">
          <tr>
            <td><b>Items</b></td>
            <td><b>Specifications</b></td>
            <td><b>Results</b></td>
            <td><b>检查结果</b></td>
            <td><b>操作</b></td>
          </tr>
          <tr v-for="(item,index) in prod_list_aq.testitem">
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
                  :key="i.id"
                  :label="i.coa_name_en==i.name_en?i.coa_name_en:i.coa_name_en+'('+i.name_en+')'"
                  :value="i.id"
                >
                </el-option>
              </el-select>
            </td>
            <td>
              <el-input size="mini" v-model="item.Specifications"></el-input>
            </td>
            <td>
              <!-- <el-select
                size="mini"
                v-model="item.Results"
                clearable
                filterable
                style="width:100%;"
                v-if="item.testitem=='Appearance'"
              >
                <el-option v-for="i in ChemicalAppearance" :key="i.id" :label="i.name_en" :value="i.name_en">
                </el-option>
              </el-select> -->
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
                                <div>{{ item.name_en }}</div>
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
      <div style="text-align:center;margin:30px 0px;">
        <span><b>Conclusion:</b></span>
        <span>The above product meets the specifications of Angene.</span>
      </div>
      <div style="margin-bottom:20px;">
        <el-row type="flex" justify="center" :gutter="20">
          <el-col :span="10">
            <div style="border-bottom:1px solid black;padding-bottom:18px;margin-bottom:20px;">
              <img src="../../../../public/image/theme/d2/logo/签名1.png" style="width:100px;" />
            </div>
            <div style="font-size:16px;">
              <el-row>
                <el-col :span="12">QC:Chase</el-col>
                <el-col :span="12">Date:</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="border-bottom:1px solid black;padding-bottom:10px;margin-bottom:20px;">
              <img src="../../../../public/image/theme/d2/logo/签名2.png" style="width:100px;" />
            </div>
            <div style="font-size:16px;">
              <el-row>
                <el-col :span="12">QA:Jessie</el-col>
                <el-col :span="12">Date:</el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="text-align:center;color:#9BBB59;">
        <span><b>Angene International Limited</b></span>
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
                          storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i,'name_en')+','
                        }else{
                          storage_cond = storage_cond+this.getEnumValue(this.StorageCondition,i,'name_en')
                        }
                      })
                    }
                    this.batch_list = res.data.batchnos;
                    this.prod_list_aq = {
                        template: "ANGENE",
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
                      for(var item in this.Testitem){
                        if(this.Testitem[item].coa_default==1){
                          var obj = {
                            testitem_id: this.Testitem[item].id,
                            testitem: this.Testitem[item].name_en,
                            Specifications: this.Testitem[item].specification_en ? this.Testitem[item].specification_en : "",
                            Results: this.Testitem[item].coa_result?this.Testitem[item].coa_result:'',
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
                this.prod_list_aq.testitem[this.index].Results = item.name_en
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
</script>

