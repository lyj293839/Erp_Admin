<style lang="scss" scoped type="text/scss">
.heard {
  margin: 10px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: right;
  .el-button {
    margin-left: 5px;
  }
}
.el-form-item {
  margin-bottom: 10px;
}
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
      line-height: 30px;
      text-align: center;
      /deep/.el-input__inner {
        border: 0px;
        padding: 5px;
      }
    }
  }
}
.dialog {
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
        padding: 5px;
      }
    }
  }
}
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
      }
    }
  }
}
</style>
<template>
  <d2-container>
    
    <div class="heard">
      <el-input
        v-model="queryList.query"
        clearable
        placeholder="cas/批号"
        size="mini"
        style="width:200px;margin:0px 5px;"
      ></el-input>
      <el-select
        placeholder="是否审核"
        clearable
        v-model="queryList.currentState"
        size="mini"
        style="width: 100px;margin-right:5px;"
      >
        <el-option
          v-for="item in enum_currentState"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-date-picker
        v-model="queryList.start"
        value-format="yyyyMMdd"
        format="yyyy-MM-dd"
        type="date"
        placeholder="开始日期"
        size="mini"
        style="width: 130px;"
        clearable
      ></el-date-picker>
      <el-date-picker
        v-model="queryList.end"
        value-format="yyyyMMdd"
        format="yyyy-MM-dd"
        type="date"
        placeholder="结束日期"
        size="mini"
        style="width: 130px;margin-left:5px;"
        clearable
      ></el-date-picker>
      <el-button
        type="primary"
        size="mini"
        :loading="loading_search"
        @click="sbaoSearch"
      >{{$t('wareHouse.xunit.searchButton')}}</el-button>
      <el-button type="primary" size="mini" @click="Add_ak()">新增艾康模板</el-button>
      <el-button type="primary" size="mini" @click="Add_aq()">新增安勤模板</el-button>
      <a :href="prod_export_url" ref="prod_export_url" hidden></a>
    </div>
    <!-- 页面 -->
    <el-table :data="list.data" border highlight-current-row size="mini">
      <el-table-column label="ID" width="50px">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="模板" width="80px">
        <template slot-scope="scope">{{scope.row.template}}</template>
      </el-table-column>
      <el-table-column label="CAS" width='110'>
        <template slot-scope="scope">{{scope.row.cas}}</template>
      </el-table-column>
      <el-table-column label="批号" width='110'>
        <template slot-scope="scope">{{scope.row.batchno}}</template>
      </el-table-column>
      <el-table-column label="产品名称" width="200px">
        <template slot-scope="scope">
          {{scope.row.product_name}}
          <br />
          {{scope.row.product_name_cn}}
        </template>
      </el-table-column>
      <el-table-column label="申请人" width="70">
        <template slot-scope="scope">{{getEnumValue(Users,scope.row.creator_id)}}</template>
      </el-table-column>
      <el-table-column label="检测">
        <template slot-scope="scope">
          <span v-for="i in scope.row.testitem">
            <b>{{i.testitem}}</b>:
            <span v-if="i.Results">{{i.Results}},</span>
            <span v-if="i.check_result">
              <span v-if="i.check_result==1" style="color:#67C23A;">合格</span>
              <span v-else-if="i.check_result==2" style="color:#E6A23C;">降格通过</span>
              <span v-else-if="i.check_result==11" style="color:#F56C6C;">不合格</span>
            </span>;
          </span>
        </template>
      </el-table-column>
      <el-table-column label="审核" width="70">
        <template slot-scope="scope">{{getEnumValue(Users,scope.row.reviewer_id)}}</template>
      </el-table-column>
      <el-table-column label="通过" width="70">
        <template slot-scope="scope">{{getEnumValue(Users,scope.row.passer_id)}}</template>
      </el-table-column>
      <el-table-column label="签发时间" width="90px">
        <template slot-scope="scope">{{scope.row.signed_at}}</template>
      </el-table-column>
      <el-table-column label="申请日期" width="90px">
        <template slot-scope="scope">{{scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column label="操作" width="130px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button
            type="danger"
            size="mini"
            v-if="permission_names['coa.delete']=='coa.delete'"
            @click="del(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-dialog title="搜索" :visible.sync="viewVisible_search" width="30%" @close="close_search()">
      <div style="text-align:center;margin-bottom:10px;">
        <el-input size="mini" style="width:50%;" v-model="prod"></el-input>
      </div>
      <div style="text-align:right;">
        <el-button @click="search_sure()" type="primary" size="mini">确定</el-button>
        <el-button size="mini" @click="close_search()">取消</el-button>
      </div>
    </el-dialog> -->

    <!-- 艾康新增 -->
    <el-dialog :visible.sync="viewVisible_add_Ak" width="50%" @close="close_Add()" class="dialog">
      <div>
        <div v-if="viewVisible_search">
          <el-input size="mini" style="width:50%;margin-right:5px;" placeholder="请输入cas或者批次号" v-model="prod"></el-input>
          <el-button @click="search_sure()" type="primary" size="mini">搜索</el-button>
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
                    :src="prod_list_ak.imgstructure+'?'+now"
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
                  <td>检测结果</td>
                  <td width='120'>操作</td>
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
            <el-button @click="ak_save()" type="primary" :loading="save_loading" size="mini">保存</el-button>
            <el-button size="mini" @click="close_Add()">取消</el-button>
          </div>
          <div style="text-align:right;margin:10px 0px;" v-for="item in aaa">
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
                <el-option v-for="i in item.list" :key="i.val" :label="i.name" :value="i.val">
                </el-option>
              </el-select>
              <el-button @click="aaa_save(item)" type="primary" size="mini">{{item.name=='生成'?'生成(word)':'确认'}}</el-button>
              <!-- <el-button v-if="item.name=='生成'" @click="ak_getPdf()" type="primary" size="mini">生成(pdf)</el-button> -->
            </span>
          </div>
        </el-col>
      </el-row>
      </div>
    </el-dialog>
    <!-- <el-dialog :visible.sync="viewVisible_add_Ak" width="50%" @close="close_Add()" class="dialog">
      <FormAk 
      :ids='ids' 
      :prod_list_ak_edit='prod_list_ak_edit'
      @close_Add='close_Add($event)' 
      @fetchData='fetchData($event)'></FormAk>
    </el-dialog> -->

    <!-- 安勤新增 -->
    <el-dialog :visible.sync="viewVisible_add_Aq" width="50%" @close="close_Add()" class="dialog_aq">
      <div v-if="viewVisible_search">
          <el-input size="mini" style="width:50%;margin-right:5px;" v-model="prod" placeholder="请输入cas或者批次号"></el-input>
          <el-button @click="search_sure()" type="primary" size="mini">搜索</el-button>
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
            <td rowspan="4">
              <el-image
                style="width: 300px;"
                :src="prod_list_aq.imgstructure+'?'+now"
              ></el-image>
            </td>
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
                :disabled="date_able"
                placeholder="选择日期">
              </el-date-picker>
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
        <el-button @click="aq_save()" type="primary" :loading="save_loading" size="mini">保存</el-button>
        <el-button size="mini" @click="close_Add()">取消</el-button>
      </div>
      <div style="text-align:right;margin:10px 0px;" v-for="item in aaa">
        <!-- <el-checkbox
                v-if="item.name=='生成'"
                v-model="item.need_seal"
                :true-label="1"
                :false-label="0"
                style="margin: 0 10px;"
        >图章</el-checkbox> -->
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
            <el-option v-for="i in item.list" :key="i.val" :label="i.name" :value="i.val">
            </el-option>
          </el-select>
          <el-button @click="aaa_save(item)" type="primary" size="mini">{{item.name=='生成'?'生成(word)':'确认'}}</el-button>
          <!-- <el-button v-if="item.name=='生成'" @click="aq_getPdf()" type="primary" size="mini">生成(pdf)</el-button> -->
        </span>
      </div>
    </el-dialog>
    
  <!-- 艾康pdf -->
    <el-dialog :visible.sync="pdf_ak_show" width="50%"  class="dialog" top="1vh">
      <div ref="ak_ref">
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
                    <image
                      style="width: 300px;"
                      :src="prod_list_ak.imgstructure+'?'+now"
                    ></image>
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
                  </tr>
                  <tr v-for="(item,index) in prod_list_ak.testitem">
                    <td>
                      <el-input size="mini" v-model="item.coa_name"></el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.Specifications"></el-input>
                    </td>
                    <td>
                      <el-input size="mini" v-model="item.Results"></el-input>
                    </td>
                  </tr>
                </table>
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
          </el-col>
        </el-row>
      </div>
    </el-dialog> 

  <!-- 安勤pdf -->
    <el-dialog :visible.sync="pdf_aq_show" width="50%" class="dialog" top="1vh">
      <div ref="aq_ref">
        <div style="width:150px;">
          <img src="../../../../public/image/theme/d2/logo/angene.png" style="width:100%;" />
        </div>
        <div style="text-align:center;margin:20px 0px;font-size:16px;">
          <span><b>CERTIFICATE OF ANALYSIS</b></span>
        </div>
        <div style="border-bottom:1px solid black;padding-bottom:10px;">
          <table border="1" bordercolor="#E5E5E5">
            <tr>
              <td><b>Chemical Name:Guanidine thiocyanate</b></td>
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
              <td rowspan="4">
                <image
                  style="width: 300px;"
                  :src="prod_list_aq.imgstructure+'?'+now"
                ></image>
              </td>
              <td><b>Manufacture Date:</b></td>
              <td>
                <el-input size="mini" v-model="prod_list_aq.manufactured_at"></el-input>
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
            </tr>
            <tr v-for="(item,index) in prod_list_aq.testitem">
              <td>
                <el-input size="mini" v-model="item.coa_name_en"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.Specifications"></el-input>
              </td>
              <td>
                <el-input size="mini" v-model="item.Results"></el-input>
              </td>
            </tr>
          </table>
        </div>
        <div style="text-align:center;margin:30px 0px;">
          <span><b>Conclusion:</b></span>
          <span>The above product meets the specifications of Angene.</span>
        </div>
        <div style="text-align:center;color:#9BBB59;">
          <span><b>Angene International Limited</b></span>
        </div>
      </div>
    </el-dialog> 

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total,sizes,prev, pager, next"
      :page-sizes="[15,20,50,100]"
      :total="list.total"
      @size-change="handleSizeChange"
      :page-size="list.per_page"
    ></el-pagination>
  </d2-container>
</template>
<script>
import pdf from "@/vue-pdf/src/vuePdfSss";
import axios from "axios";
import util from "@/libs/util";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import $ from "jquery";
import {
  generatecoa,
  search_coa,
  coa_create,
  coa_approve,
  coa_review,
  coa_generate,
  coa_detail,
  coa_update,
  inquery_generate
} from "@/api/quality";
export default {
  name: "Quality-coa_create",
  data() {
    return {
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      list: [],
      //   test_list_ak: [],
      //   test_list_aq:[],
      currentPage: 1,
      prod: "",
      prod_list_ak: { testitem: [] },
      prod_list_aq: { testitem: [] },
      need_seal_ak: "",
      need_seal_aq: "",
      now: "",
      is_ak: "",
      batch_list: [],
      ids: "",
      aaa:[],
      prod_export_url:'',
      // Review:{
      //   id:"",
      //   review:'',
      // },
      // Approve:{
      //   id:'',
      //   approve:""
      // },
      queryList: {
        page: "1",
        start: "",
        end: "",
        query: "",
        currentState:'',
        per_page: 15
      },
      // Review_list:[],
      // Approve_list:[],
      Users: [],
      Testitem: {},
      ChemicalAppearance:[],
      enum_currentState:[
        {
          id:1,
          name:'审核通过'
        },
        {
          id:2,
          name:'审核中'
        }
      ],
      index:'',
      // Review_is:false,
      // Approve_is:false,
      date_able:false,
      pdf_ak_show:false,
      pdf_aq_show:false,
      save_loading:false,
      generate_is:false,
      viewVisible_add_Ak: false,
      viewVisible_add_Aq: false,
      viewVisible_search: true,
      loading_search: false,
      prod_list_ak_edit:'',
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Quality-coa_create") {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      generatecoa(this.queryList).then(res => {
        this.list = res.data;
        this.list.per_page = parseInt(res.data.per_page);
        this.Users = this.GEnums.Users;
        this.StorageCondition = this.GEnums.StorageCondition;
        this.Testitem = this.GEnums.TestitemCOA;
        obj(this.ChemicalAppearance,this.GEnums.ChemicalAppearance)
        this.loading_search = false;
        for (var i in this.Testitem) {
          if (this.Testitem[i].pid != 0) {
            delete this.Testitem[i];
          }
        }
      });
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
          if(this.is_ak==1){
             obj['need_seal'] = item.need_seal
             obj['template'] = 'AIKON'
          }else{
            obj['template'] = 'ANGENE'
          }
            coa_generate(obj,this)
        }
    },
    ak_getPdf(){
      this.pdf_ak_show = true
      setTimeout(() => {
        var title = this.prod_list_ak.batchno
        html2Canvas(this.$refs.ak_ref, {
          allowTaint: true,
		        taintTest: false,
		        useCORS: true,
		        //width:960,
		        //height:5072,
		        dpi: window.devicePixelRatio*4, //将分辨率提高到特定的DPI 提高四倍
		        scale:4 //按比例增加分辨率 
        }).then(function (canvas) {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          let pageHeight = contentWidth / 592.28 * 841.89
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = 588
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 5, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
        })
      }, 300)
    },
    aq_getPdf(){
      this.pdf_aq_show = true
      setTimeout(() => {
        var title = this.prod_list_aq.batchno
        html2Canvas(this.$refs.aq_ref, {
          allowTaint: true,
		        taintTest: false,
		        useCORS: true,
		        //width:960,
		        //height:5072,
		        dpi: window.devicePixelRatio*4, //将分辨率提高到特定的DPI 提高四倍
		        scale:4 //按比例增加分辨率 
        }).then(function (canvas) {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          let pageHeight = contentWidth / 592.28 * 841.89
          let leftHeight = contentHeight
          let position = 0
          let imgWidth = 588
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 5, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          PDF.save(title + '.pdf')
        })
      }, 300)
      
    },
    sbaoSearch() {
      this.loading_search = true;
      this.queryList.page = 1;
      this.currentPage = 1;
      this.fetchData();
    },
    handleSizeChange(val) {
      this.queryList.per_page = val;
      this.fetchData();
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
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
      if(is_ak==1){
        this.prod_list_ak.testitem[this.index].Results = item.name_cn
      }else{
        this.prod_list_aq.testitem[this.index].Results = item.name_en
      }
    },
    select_index(index) {
        this.index = index
    },
    search_sure() {
      if (this.is_ak == 1) {
        search_coa(this.prod).then(res => {
          this.now = Date.now();
          this.batch_list = res.data.batchnos;
          this.prod_list_ak = {
            template: "AIKON",
            product_name_cn: res.data.product.name_cn,
            product_name: res.data.product.name,
            cas: res.data.product.cas,
            mf: res.data.product.mf,
            mw: res.data.product.mw,
            batchno:
              res.data.batchnos.length == 1 ? res.data.batchnos[0].batchno : "",
            weight: "",
            imgstructure: res.data.product.imgstructure,
            testitem: []
          };
          if(res.data.testitems.length>0){
            res.data.testitems.forEach(item => {
              this.select_(item)
              if (item.testitem_name) {
                var obj = {
                  id: item.id,
                  testitem_id: item.testitem_id,
                  testitem: item.testitem,
                  Specifications: item.specifications ? item.specifications : "",
                  Results: item.result,
                  check_result: item.check_result,
                  coa_name: item.coa_name ? item.coa_name : "",
                  coa_name_en: item.coa_name_en ? item.coa_name_en : ""
                };
                this.prod_list_ak.testitem.push(obj);
              }
            });
          }else{
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
          }
          this.close_search();
          this.viewVisible_add_Ak = true;
        });
      } else {
        search_coa(this.prod).then(res => {
          this.now = Date.now();
          this.batch_list = res.data.batchnos;
          this.prod_list_aq = {
            template: "ANGENE",
            product_name_cn: res.data.product.name_cn,
            product_name: res.data.product.name,
            cas: res.data.product.cas,
            mf: res.data.product.mf,
            mw: res.data.product.mw,
            batchno:
              res.data.batchnos.length == 1 ? res.data.batchnos[0].batchno : "",
            weight: "",
            manufactured_at: 
              res.data.batchnos.length == 1 ? res.data.batchnos[0].manufactured_at.substring(0,res.data.batchnos[0].manufactured_at.indexOf(' ')) : "",
            imgstructure: res.data.product.imgstructure,
            testitem: []
          };
          if(this.prod_list_aq.manufactured_at){
            this.date_able = true
          }
          if(res.data.testitems.length>0){
            res.data.testitems.forEach(item => {
              this.select_(item)
              if (item.testitem_name) {
                var obj = {
                  id: item.id,
                  testitem_id: item.testitem_id,
                  testitem: item.testitem,
                  Specifications: item.specifications ? item.specifications : "",
                  Results: item.result,
                  check_result: item.check_result,
                  coa_name: item.coa_name ? item.coa_name : "",
                  coa_name_en: item.coa_name_en ? item.coa_name_en : "",
                };
                this.prod_list_aq.testitem.push(obj);
              }
            });
          }else{
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
          }
          this.close_search();
          this.viewVisible_add_Aq = true;
        });
      }
    },
    querySearchAsync_corporation(queryString, cb) {
      var restaurants = "";
      restaurants = this.batch_list;
      cb(restaurants);
    },
    handleSelect_corporation(item) {
      if (this.is_ak == 1) {
        this.prod_list_ak.batchno = item.batchno;
      } else {
        this.prod_list_aq.batchno = item.batchno;
        this.prod_list_aq.manufactured_at = item.manufactured_at.substring(0,item.manufactured_at.indexOf(' '))
        if(this.prod_list_aq.manufactured_at){
            this.date_able = true
          }
      }
      this.$forceUpdate();
    },
    select_(item) {
      for (var i in this.Testitem) {
        if (this.is_ak == 1) {
          if (item.testitem_id && this.Testitem[i].id == item.testitem_id) {
            item.testitem_id = this.Testitem[i].id;
            item.testitem = this.Testitem[i].name;
            item.coa_name = this.Testitem[i].coa_name==this.Testitem[i].name?this.Testitem[i].coa_name:this.Testitem[i].coa_name+'('+this.Testitem[i].name+')';
            item.coa_name_en = this.Testitem[i].coa_name_en==this.Testitem[i].name_en?this.Testitem[i].coa_name_en:this.Testitem[i].coa_name_en+'('+this.Testitem[i].name_en+')';
          }
        } else {
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
      }
    },
    Add_ak() {
      this.viewVisible_add_Ak = true;
      this.is_ak = 1;
    },
    Add_aq() {
      this.viewVisible_add_Aq = true;
      this.is_ak = 0;
    },
    close_search() {
      // this.viewVisible_search = false;
      // this.prod = "";
    },
    add_test() {
      if (this.is_ak == 1) {
        this.prod_list_ak.testitem.push({
          testitem_id: "",
          testitem: "",
          Specifications: "",
          Results: "",
          check_result: "",
          coa_name: "",
          coa_name_en: ""
        });
      } else {
        this.prod_list_aq.testitem.push({
          testitem_id: "",
          testitem: "",
          Specifications: "",
          Results: "",
          check_result: "",
          coa_name: "",
          coa_name_en: ""
        });
      }
    },
    delete_test(index) {
      if (this.is_ak == 1) {
        this.prod_list_ak.testitem.splice(index, 1);
      } else {
        this.prod_list_aq.testitem.splice(index, 1);
      }
    },
    edit(item) {
      this.now = Date.now();
      this.batch_list = [];
      this.ids = item.id;
      this.aaa = []
      this.viewVisible_search = false
      coa_detail(item.id,this)
      if (item.template == "AIKON") {
        this.is_ak = 1;
        this.prod_list_ak = JSON.parse(JSON.stringify(item));
        this.prod_list_ak.testitem.forEach(res=>{
          this.select_(res)
        })
        this.viewVisible_add_Ak = true;
      } else {
        this.is_ak = 0;
        this.prod_list_aq = JSON.parse(JSON.stringify(item));
        this.prod_list_aq.testitem.forEach(res=>{
          this.select_(res)
        })
        this.viewVisible_add_Aq = true;
        if(this.prod_list_aq.manufactured_at){
            this.date_able = true
          }
      }
    },
    ak_save() {
      this.save_loading = true
      if (this.ids) {
        this.prod_list_ak.id = this.ids
        coa_update(this.prod_list_ak, this);
      } else {
        coa_create(this.prod_list_ak, this);
      }
    },
    aq_save() {
      this.save_loading = true
      if (this.ids) {
        this.prod_list_aq.id = this.ids
        coa_update(this.prod_list_aq, this);
      } else {
        coa_create(this.prod_list_aq, this);
      }
    },
    // Review_save(){
    //   this.Review.id = this.ids
    //   coa_review(this.Review, this);
    // },
    // Approve_save(){
    //   this.Approve.id = this.ids
    //   coa_approve(this.Approve, this);
    // },
    // Review_ok(a) {
    //   var obj = {
    //     id: this.ids,
    //     review: a
    //   };
    //   coa_review(obj, this);
    // },
    // Approve_ok(a) {
    //   var obj = {
    //     id: this.ids,
    //     approve: a
    //   };
    //   coa_approve(obj, this);
    // },
    // coa_generate_(need) {
    //   var obj = {
    //     id: this.ids,
    //     template:this.is_ak==1?'AIKON':'ANGENE',
    //     need_seal: need
    //   };
    //   coa_generate(obj, this);
    // },
    close_Add() {
      this.viewVisible_add_Ak = false;
      this.viewVisible_add_Aq = false;
      this.date_able = false
      this.viewVisible_search = true
      this.prod_list_ak = { testitem: [] };
      this.prod_list_aq = { testitem: [] };
      this.need_seal_ak = "";
      this.need_seal_aq = "";
      this.batch_list = [];
      this.aaa = []
      this.is_ak = "";
      this.ids = "";
      this.prod = "";
      this.index = ''
    },
    up(index){
      if(this.is_ak==1){
        this.upGo(this.prod_list_ak.testitem,index)
      }else{
        this.upGo(this.prod_list_aq.testitem,index)
      }
    },
    down(index){
      if(this.is_ak==1){
        this.downGo(this.prod_list_ak.testitem,index)
      }else{
        this.downGo(this.prod_list_aq.testitem,index)
      }
    }
  }
};
function obj(arr, object) {
        for (let i in object) {
            arr.push(object[i]);
        }
    }
</script>