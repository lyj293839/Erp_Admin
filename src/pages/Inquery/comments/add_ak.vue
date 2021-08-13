<style lang="scss" scoped type="text/scss">
.form_base {
  /deep/.el-input__inner {
    border: 0px;
    border-bottom: 1px solid #dcdfe6;
    padding: 5px;
  }
}
.form_test {
  /deep/.el-form-item__label {
    font-weight: bold;
    padding: 0px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    td {
      text-align: center;
      /deep/.el-input__inner {
        border: 0px;
        padding: 5px;
      }
    }
  }
}
</style>
<template>
    <div>
        <div>
                <div>
                    <el-input size="mini" style="width:50%;margin-right:5px;" v-model="prod" placeholder="请输入cas或者批次号"></el-input>
                    <el-button @click="search_sure()" type="primary" size="mini">搜索</el-button>
                    <a :href="prod_export_url" ref="prod_export_url" hidden></a>
                </div>
            <div
                style="border-bottom:1px solid black;padding-bottom:20px;display:flex;justify-content: space-between;align-items: center;"
            >
                <div>
                <span style="font-size:18px;">
                    <b>江苏艾康生物医药研发有限公司</b>
                </span>
                <br />
                <span style="font-size:12px;">
                    <b>Jiangsu Aikon Biopharmaceutical R&D Co.,Ltd</b>
                </span>
                </div>
                <div style="width:150px;">
                <img src="../../../../public/image/theme/d2/logo/all.png" style="width:100%;" />
                </div>
            </div> 
            <div style="text-align:center;line-height:30px;margin-top:10px;">
                <span style="font-size:20px;">
                <b>产 品 检 测 报 告</b>
                </span>
                <br />
                <span>
                <b>Certificate of Analysis</b>
                </span>
            </div>
            <el-row>
                <el-col :span="24">
                <el-form label-width="120px">
                    <el-row class="form_base">
                    <el-col :span="12">
                        <el-form-item label="产品中文名称:">
                        <el-input size="mini" v-model="prod_list_ak.product_name_cn"></el-input>
                        </el-form-item>
                        <el-form-item label="产品英文名称:">
                        <el-input size="mini" v-model="prod_list_ak.product_name"></el-input>
                        </el-form-item>
                        <el-form-item label="CAS Number:">
                        <el-input size="mini" v-model="prod_list_ak.cas"></el-input>
                        </el-form-item>
                        <el-form-item label="分子式(M.F):">
                        <el-input size="mini" v-model="prod_list_ak.mf"></el-input>
                        </el-form-item>
                        <el-form-item label="分子量(M.W):">
                        <el-input size="mini" v-model="prod_list_ak.mw"></el-input>
                        </el-form-item>
                        <el-form-item label="批号(Batch No.):">
                        <el-autocomplete
                            clearable
                            size="mini"
                            v-model="prod_list_ak.batchno"
                            :fetch-suggestions="querySearchAsync_corporation"
                            :trigger-on-focus="true"
                            @select="handleSelect_corporation"
                            style="width:100%;"
                        >
                            <template slot-scope="{ item }">
                            <div>{{ item.batchno }}</div>
                            </template>
                        </el-autocomplete>
                        </el-form-item>
                        <el-form-item label="产品数量:">
                        <el-input size="mini" v-model="prod_list_ak.weight"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" style="display:flex;justify-content: center;margin-top:10px;">
                        <div style="width:350px;height:350px;text-align:center;border:1px solid black;">
                        <span>结构式(Structure)</span>
                        <br />
                        <el-image
                            style="width: 300px;"
                            :src="prod_list_ak.imgstructure+'?'+now_ak"
                        ></el-image>
                        </div>
                    </el-col>
                    </el-row>
                </el-form>
                <el-form label-position="top" class="form_test">
                    <el-form-item label="检测结果(Analysis of Result):">
                    <table border="1" bordercolor="#E5E5E5">
                        <tr>
                        <td>检测项目(Test Item)</td>
                        <td>指标(Specifications)</td>
                        <td>结果(Results)</td>
                        <td>检查结果</td>
                        <td>操作</td>
                        </tr>
                        <tr v-for="(item,index) in prod_list_ak.testitem">
                        <td>
                            <el-select
                            size="mini"
                            v-model="item.testitem_id"
                            clearable
                            filterable
                            @change="select_(item)"
                            style="width:100%;"
                            >
                                <el-option v-for="i in Testitem" :key="i.id" :label="i.coa_name==i.name?i.coa_name:i.coa_name+'('+i.name+')'" :value="i.id">
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
                            v-if="item.testitem=='外观'"
                            >
                                <el-option v-for="i in ChemicalAppearance" :key="i.id" :label="i.name_cn" :value="i.name_cn">
                                </el-option>
                            </el-select> -->
                            <el-autocomplete
                                    clearable
                                    v-if="item.testitem=='外观'"
                                    size='mini'
                                    v-model="item.Results"
                                    :fetch-suggestions="querySearchAsync_corporation_wg"
                                    :trigger-on-focus="true"
                                    @focus="select_index(index)"
                                    @select="handleSelect_corporation_wg"
                            >
                                <template slot-scope="{ item }">
                                <div>{{ item.name_cn }}</div>
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
                    </el-form-item>
                    <el-form-item style="text-align:right;">
                    <el-button @click="add_test()" type="primary" size="mini">+</el-button>
                    </el-form-item>
                </el-form>
                <table border="0" bordercolor="#E5E5E5" style="width:100%;border-collapse: collapse;">
                    <tr>
                    <td>
                        <b>检测人:</b>
                    </td>
                    <td>
                        <b>审核人:</b>
                    </td>
                    <td>
                        <b>批准人:</b>
                    </td>
                    </tr>
                    <tr>
                    <td colspan="2"></td>
                    <td>
                        <b>日期:</b>
                    </td>
                    </tr>
                </table>
                <div style="display:flex;justify-content: space-between;">
                    <div>
                    <span>南京市浦口区星火路中建环球大厦502室</span>
                    <br />
                    <span>www.aikonchem.com</span>
                    </div>
                    <div>
                    <span>Tel:025-6602818</span>
                    <br />
                    <span>E-mail:sales@aikonchem.com</span>
                    </div>
                </div>
                <div style="text-align:right;margin:20px 0px;">
                    <el-checkbox
                            v-model="prod_list_ak.need_seal"
                            :true-label="1"
                            :false-label="0"
                            style="margin: 0 10px;"
                    >图章</el-checkbox>
                    <el-button @click="ak_save()" type="primary" :loading="save_loading" size="mini">生成</el-button>
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
                    <el-button v-if="item.name=='生成'" @click="ak_getPdf()" type="primary" size="mini">生成(pdf)</el-button>
                    </span>
                </div> -->
                </el-col>
            </el-row>
            </div>
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
                now_ak:'',
                prod_list_ak:{testitem:[]},
                is_ak:'',
                prod_export_url:'',
                need_seal:'',
                aaa:[],
                ChemicalAppearance:[],
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
                obj(this.ChemicalAppearance,this.GEnums.ChemicalAppearance)
                // this.ChemicalAppearance =JSON.parse(JSON.stringify(this.GEnums.ChemicalAppearance));
                    for (var i in this.Testitem) {
                        if (this.Testitem[i].pid != 0) {
                            delete this.Testitem[i];
                        }
                }
            },
            up(index){
                this.upGo(this.prod_list_ak.testitem,index)
            },
            down(index){
                this.downGo(this.prod_list_ak.testitem,index)
            },
            search_sure() {
                    search_coa(this.prod).then(res => {
                        this.now_ak = Date.now();
                        this.batch_list = res.data.batchnos;
                        this.prod_list_ak = {
                            template: "AIKON",
                            product_name_cn: res.data.product?res.data.product.name_cn:'',
                            product_name: res.data.product?res.data.product.name:'',
                            cas: res.data.product?res.data.product.cas:this.prod,
                            mf: res.data.product?res.data.product.mf:'',
                            mw: res.data.product?res.data.product.mw:"",
                            batchno:this.coa_batchno?this.coa_batchno:
                            (res.data.batchnos.length == 1 ? res.data.batchnos[0].batchno : ""),
                            weight: "",
                            imgstructure: res.data.product?res.data.product.imgstructure:'',
                            testitem: [],
                            need_seal:""
                        };
                        // if(res.data.testitems.length>0){
                        //     res.data.testitems.forEach(item => {
                        //         this.select_(item)
                        //         if (item.testitem_name) {
                        //         var obj = {
                        //             id: item.id,
                        //             testitem_id: item.testitem_id,
                        //             testitem: item.testitem,
                        //             Specifications: item.specifications ? item.specifications : "",
                        //             Results: item.result,
                        //             check_result: item.check_result,
                        //             coa_name: item.coa_name ? item.coa_name : "",
                        //             coa_name_en: item.coa_name_en ? item.coa_name_en : ""
                        //         };
                        //         this.prod_list_ak.testitem.push(obj);
                        //         }
                        //     });
                        // }else{
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
                                    this.prod_list_ak.testitem.push(obj);
                                }
                            }
                            this.prod_list_ak.testitem.sort(
                                function compareFunction(param1, param2) {
                                    return param1.coa_rank.localeCompare(param2.coa_rank);
                                }
                            );
                        // }
                    });
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
                this.prod_list_ak.testitem[this.index].Results = item.name_cn
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
                this.prod_list_ak.batchno = item.batchno;
                this.$forceUpdate();
            },
            select_(item){
                for (var i in this.Testitem) {
                    if (item.testitem_id && this.Testitem[i].id == item.testitem_id) {
                        item.testitem_id = this.Testitem[i].id;
                        item.testitem = this.Testitem[i].name;
                        item.coa_name = this.Testitem[i].coa_name==this.Testitem[i].name?this.Testitem[i].coa_name:this.Testitem[i].coa_name+'('+this.Testitem[i].name+')';
                        item.coa_name_en = this.Testitem[i].coa_name_en==this.Testitem[i].name_en?this.Testitem[i].coa_name_en:this.Testitem[i].coa_name_en+'('+this.Testitem[i].name_en+')';
                    }
                }
            },
            add_test() {
                    this.prod_list_ak.testitem.push({
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
                    this.prod_list_ak.testitem.splice(index, 1);
            },
            ak_save() {
                this.save_loading = true
                inquery_generate(this.prod_list_ak, this);
            },
            close_Add() {
                this.prod_list_ak = { testitem: [] };
                this.batch_list = [];
                this.aaa = []
                this.prod = "";
                this.$emit('close_Add')
            },
            close_Add_child() {
                this.prod_list_ak = { testitem: [] };
                this.batch_list = [];
                this.aaa = []
                this.prod = "";
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
                    obj['need_seal'] = item.need_seal
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

