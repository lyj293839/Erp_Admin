<style lang="scss" scoped type="text/scss">
.add {
  margin-bottom: 15px;
}
.el-pagination {
  text-align: right;
}
.active {
  background-color: #409eff;
  color: white;
}
 table td,th{
   padding: 6px;
 }
table,th,td { border: 1px solid #EBEEF5;word-wrap:break-word;word-break:break-all;}
table{border-width: 1px 0 0 1px;}
th,td{border-width:0 1px 1px 0;}
tr{border: none;}
table{
  border-top: 0px;
}
// .template_table{
//   td{
//     border-top:none;
//   }
// }
// /deep/.el-table {
//   td {
//     padding: 0px;
//     padding-bottom: 20px;
//   }
//   .cell{
//     padding:0px 5px;
//   }
//   table {
//     border-collapse: collapse;
//     td {
//       padding: 0px 5px;
//     }
//   }
// }
</style>
<template>
  <d2-container>
      <el-row style="margin: 10px;">
        <el-col class="d2-text-left" :span="8">
          <el-button type="primary" size="mini" @click="handleAdd" v-if="permissions.indexOf(226)>-1">{{$t('add')}}</el-button>
          <!--<el-button type="primary" size="mini" @click="deletes">删除</el-button>-->
        </el-col>
        <el-col class="d2-text-right" :span="16" style="text-align: right;">
          <el-button
            size="mini"
            v-for="item in Testprodcate"
            :key="item.id"
            @click="queryList.testprodcate_id=item.id"
            :class="{active:queryList.testprodcate_id==item.id}"
          >{{item.name}}</el-button>
          <el-input
            size="mini"
            prefix-icon="el-icon-search"
            v-model="queryList.name"
            style="width: 300px;margin:0 10px;"
          ></el-input>
          <el-button type="primary" size="mini" :loading="loading_search" @click="search">{{$t('search')}}</el-button>
        </el-col>
      </el-row>
      <!-- <el-table
        :data="list.data"
        border
        style="width: 100%;padding:0px;margin:0px;font-size: 13px;"
        highlight-current-row
        fit
        :default-expand-all="true">
        <el-table-column type="expand" width="1" style="border:none;">
          <template slot-scope="props">
            <table
              border="1"
              bordercolor="#E5E5E5"
              style="margin:0px -5px;border-right:0px;border-bottom:none;"
              class="template_table"
              v-if="props.row.testitems.length>0"
            >
              <tr v-for="i in props.row.testitems" >
                <td width="61">-{{i.id}}</td>
                <td width="100">
                  <span v-if="i.testprodcate">{{getEnumValue(Testprodcate,i.testprodcate.id)}}</span>
                </td>
                <td width="100">{{i.name}}</td>
                <td width="100">{{i.name_en}}</td>
                <td width="100">{{i.coa_name}}</td>
                <td width='100'>{{i.coa_name_en}}</td>
                <td width='100'>
                  <span v-if="i.fee">{{i.fee}}/{{i.unit}}</span>
                </td>
                <td style="width:100px;">{{i.mark}}</td>
                <td style="width:100px;">
                  <span v-if="i.cost">{{i.cost}}/{{i.unit}}</span>
                </td>
                <td style="width:100px;">{{i.user?i.user.name:''}}</td>
                <td width='100'>{{i.created_at}}</td>
                <td width='100'>{{i.aging_in}}</td>
                <td width='100'>{{i.aging_out}}</td>
                <td width='100'>{{getEnumValue(status,i.status)}}</td>
                <td style="border-right:0px;" width='120'>
                  <el-button style="margin-left:5px;" size="mini" type="primary" @click="handleEdit(i)" v-if="permissions.indexOf(227)>-1">Edit</el-button>
                  <el-button v-if="i.status==1&&permissions.indexOf(502)>-1" size="mini" type="danger" @click="handleDel(i)">{{$t('disable')}}</el-button>
                  <el-button v-else size="mini" @click="handle_reuse(i)" type="primary">{{$t('enable')}}</el-button>
                </td>
              </tr>
            </table>
          </template>
        </el-table-column>
        <el-table-column label="ID" width="60">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类别" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.testprodcate">{{getEnumValue(Testprodcate,scope.row.testprodcate.id)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="英文名称" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.name_en}}</span>
          </template>
        </el-table-column>
        <el-table-column label="COA名称" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.coa_name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="COA英文" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.coa_name_en}}</span>
          </template>
        </el-table-column>
        <el-table-column label="费用" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.fee">{{scope.row.fee}}/{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="标识" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.mark}}</span>
          </template>
        </el-table-column>
        <el-table-column label="成本" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.cost">{{scope.row.cost}}/{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.user?scope.row.user.name:''}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.created_at}}</span>
          </template>
        </el-table-column>
        <el-table-column label="内部时效/h" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.aging_in}}</span>
          </template>
        </el-table-column>
        <el-table-column label="外部时效/h" width="100">
          <template slot-scope="scope">
            <span>{{scope.row.aging_out}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span>{{getEnumValue(status,scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.row)">Edit</el-button>
            <el-button v-if="scope.row.status==1" size="mini" type="danger" @click="handleDel(scope.row)">{{$t('disable')}}</el-button>
            <el-button v-else size="mini" type="primary" @click="handle_reuse(scope.row)">{{$t('enable')}}</el-button>
          </template>
        </el-table-column>
      </el-table> -->


    <div style="font-size:13px;text-align: center">
      <table v-for="(item,index) in list.data" cellspacing="0" cellpadding="0" style="width:100%;">
        <tr v-if="index == 0" style="background: #f2f2f2;font-weight:bold;line-height: 30px;">
          <th>ID</th>
          <th>{{$t('quality.cost.cost1')}}</th><!-- 类别 -->
          <th>{{$t('quality.cost.cost2')}}</th><!-- 名称 -->
          <th>英文名称</th>
          <th>COA名称</th>
          <th>COA英文</th>
          <th>{{$t('quality.cost.cost3')}}</th><!-- 费用 -->
          <th>标识</th>
          <th>{{$t('quality.cost.cost4')}}</th><!-- 成本 -->
          <th>{{$t('quality.cost.cost5')}}</th><!-- 创建人 -->
          <th>{{$t('quality.cost.cost6')}}</th><!-- 创建日期 -->
          <th>内部时效/h</th>
          <th>外部时效/h</th>
          <th>{{$t('quality.cost.cost7')}}</th><!-- 状态 -->
          <th>{{$t('quality.cost.cost8')}}</th><!-- 操作 -->
        </tr>
        <tr>
          <td style="width:50px;">{{item.id}}</td>
          <td style="width:100px;">{{item.testprodcate?Testprodcate[item.testprodcate.id].name:''}}</td>
          <td style="width:80px;">{{item.name}}</td>
          <td style="width:80px;">{{item.name_en}}</td>
          <td style="width:80px;">{{item.coa_name}}</td>
          <td style="width:80px;">{{item.coa_name_en}}</td>
          <td style="width:60px;">
            <span v-if="item.fee">{{item.fee}}/{{item.unit}}</span>
          </td>
          <td style="width:80px;">{{item.mark}}</td>
          <td style="width:80px;">
            <span v-if="item.cost">{{item.cost}}/{{item.unit}}</span>
          </td>
          <td style="width:60px;">{{item.user?item.user.name:''}}</td>
          <td width='70'>{{item.created_at}}</td>
          <td width='80px'>{{item.aging_in}}</td>
          <td width='80px'>{{item.aging_out}}</td>
          <td>{{status[item.status]}}</td>
          <td style="width:110px;text-align:center;">
            <el-button size="mini" type="primary" @click="handleEdit(item)">Edit</el-button>
            <el-button v-if="item.status==1" size="mini" type="danger" @click="handleDel(item)">{{$t('disable')}}</el-button><!-- 禁用 -->
            <el-button v-else size="mini" type="primary" @click="handle_reuse(item)">{{$t('enable')}}</el-button><!-- 启用 -->
          </td>
        </tr>
        <tr v-if="item.testitems.length>0" v-for="i in item.testitems" :key="i.id">
          <td style="width:50px;">-{{i.id}}</td>
          <td style="width:100px;">{{Testprodcate[i.testprodcate_id]?Testprodcate[i.testprodcate_id].name:''}}</td>
          <td style="width:80px;">{{i.name}}</td>
          <td style="width:80px;">{{i.name_en}}</td>
          <td style="width:80px;">{{i.coa_name}}</td>
          <td style="width:80px;">{{i.coa_name_en}}</td>
          <td style="width:60px;">
            <span v-if="i.fee">{{i.fee}}/{{i.unit}}</span>
          </td>
          <td style="width:80px;">{{i.mark}}</td>
          <td style="width:80px;">
            <span v-if="i.cost">{{i.cost}}/{{i.unit}}</span>
          </td>
          <td style="width:60px;">{{i.user?i.user.name:''}}</td>
          <td width='70'>{{i.created_at}}</td>
          <td width='80px'>{{i.aging_in}}</td>
          <td width='80px'>{{i.aging_out}}</td>
          <td>{{status[i.status]}}</td>
          <td style="width:110px;text-align:center;">
            <el-button size="mini" type="primary" @click="handleEdit(i)" v-if="permissions.indexOf(227)>-1">Edit</el-button>
            <el-button v-if="i.status==1&&permissions.indexOf(502)>-1" size="mini" type="danger" @click="handleDel(i)">{{$t('disable')}}</el-button>
            <el-button v-else size="mini" @click="handle_reuse(i)" type="primary">{{$t('enable')}}</el-button>
          </td>
        </tr>
      </table>
    </div>
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :total="list.total"
    ></el-pagination>

    <el-dialog title="Add" :visible.sync="dialogAdd" width="40%">
      <el-form
        :model="addForm"
        label-width="100px"
        label-position="right"
      >
        <el-form-item :label="$t('quality.cost.cost1')" :required="true"><!-- 类别 -->
          <el-select
            v-model="addForm.testprodcate_id"
            clearable
            filterable
            style="width: 150px;"
            size="small"
          >
            <el-option v-for="i in Testprodcate" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('quality.cost.cost9')"><!-- 父级 -->
          <el-select
            v-model="addForm.pid"
            @change="pid_change()"
            clearable
            filterable
            style="width: 150px;"
            size="small"
          >
            <el-option v-for="i in parent" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('quality.cost.cost2')" :required="true"><!-- 名称 -->
          <el-input v-model="addForm.name" size="small" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="addForm.name_en" size="small" style="width: 90%;"></el-input>
        </el-form-item>
        <el-row v-if='addForm_aging'>
          <el-col :span="12">
            <el-form-item label="COA名称" v-if='addForm_aging'>
              <el-input v-model="addForm.coa_name" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COA英文" v-if='addForm_aging'>
              <el-input v-model="addForm.coa_name_en" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='addForm_aging'>
          <el-col :span="12">
            <el-form-item label="COA规格" v-if='addForm_aging'>
              <el-input v-model="addForm.specification" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格英文" v-if='addForm_aging'>
              <el-input v-model="addForm.specification_en" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='addForm_aging'>
          <el-col :span="12">
            <el-form-item label="COA结果" v-if='addForm_aging'>
              <el-input v-model="addForm.coa_result_cn" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结果英文" v-if='addForm_aging'>
              <el-input v-model="addForm.coa_result" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='addForm_aging'>
          <el-col :span="12">
            <el-form-item label="内部时效" v-if="addForm_aging">
              <el-input v-model="addForm.aging_in" size="small" style="width: 90%;"></el-input>
              <span style="margin-left:10px;">h</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外部时效" v-if="addForm_aging">
              <el-input v-model="addForm.aging_out" size="small" style="width: 90%;"></el-input>
              <span style="margin-left:10px;">h</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='addForm_aging'>
          <el-col :span="12">
            <el-form-item label="标识" v-if='addForm_aging'>
              <el-input v-model="addForm.mark" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COA排序" v-if='addForm_aging'>
              <el-input-number v-model="addForm.coa_rank" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('quality.cost.cost4')"><!-- 成本 -->
              <el-input v-model="addForm.cost" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('quality.cost.cost3')" :required="true"><!-- 费用 -->
              <el-input v-model="addForm.fee" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="仅COA" v-if='addForm_aging'>
          <el-switch
                  v-model="addForm.only_for_coa"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item label="COA默认:" v-if='addForm_aging'>
          <el-switch
                  v-model="addForm.coa_default"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="addForm_loadingSave" size="mini" @click="saveAdd()">{{$t('save')}}</el-button>
        <el-button @click="AddClose()" size="mini">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Edit" :visible.sync="dialogEdit" width="40%">
      <el-form
        :model="addForm"
        label-width="100px"
        label-position="right"
      >
        <el-form-item :label="$t('quality.cost.cost1')" :required="true"><!-- 类别 -->
          <el-select
            size="small"
            v-model="editForm.testprodcate_id"
            clearable
            filterable
            style="width: 150px;"
          >
            <el-option v-for="i in Testprodcate" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('quality.cost.cost9')"><!-- 父级 -->
          <el-select
            v-model="editForm.pid"
            clearable
            filterable
            style="width: 150px;"
            size="small"
          >
            <el-option v-for="i in parent" :key="i.id" :label="i.name" :value="i.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('quality.cost.cost2')" :required="true"><!-- 名称 -->
          <el-input v-model="editForm.name" size="small" style="width: 90%;"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="editForm.name_en" size="small" style="width: 90%;"></el-input>
        </el-form-item>
        <el-row v-if='edit_aging'>
          <el-col :span="12">
            <el-form-item label="COA名称" v-if='edit_aging'>
              <el-input v-model="editForm.coa_name" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COA英文" v-if='edit_aging'>
              <el-input v-model="editForm.coa_name_en" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='edit_aging'>
          <el-col :span="12">
            <el-form-item label="COA规格" v-if='edit_aging'>
              <el-input v-model="editForm.specification" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格英文" v-if='edit_aging'>
              <el-input v-model="editForm.specification_en" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='edit_aging'>
          <el-col :span="12">
            <el-form-item label="COA结果" v-if='edit_aging'>
              <el-input v-model="editForm.coa_result_cn" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结果英文" v-if='edit_aging'>
              <el-input v-model="editForm.coa_result" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='edit_aging'>
          <el-col :span="12">
            <el-form-item label="内部时效" v-if='edit_aging'>
              <el-input v-model="editForm.aging_in" size="small" style="width: 90%;"></el-input>
              <span style="margin-left:10px;">h</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外部时效" v-if='edit_aging'>
              <el-input v-model="editForm.aging_out" size="small" style="width: 90%;"></el-input>
              <span style="margin-left:10px;">h</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if='edit_aging'>
          <el-col :span="12">
            <el-form-item label="标识" v-if='edit_aging'>
              <el-input v-model="editForm.mark" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="COA排序" v-if='edit_aging'>
              <!-- <el-input v-model="editForm.coa_rank" size="small" style="width: 90%;"></el-input> -->
              <el-input-number v-model="editForm.coa_rank" :min="0"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('quality.cost.cost4')"><!-- 成本 -->
              <el-input v-model="editForm.cost" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('quality.cost.cost3')" :required="true"><!-- 费用 -->
              <el-input v-model="editForm.fee" size="small" style="width: 90%;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="仅COA:" v-if='edit_aging'>
          <el-switch
                  v-model="editForm.only_for_coa"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否">
          </el-switch>
        </el-form-item>
        <el-form-item label="COA默认:" v-if='edit_aging'>
          <el-switch
                  v-model="editForm.coa_default"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="是"
                  inactive-text="否">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          :loading="editForm_loadingSave"
          size="mini"
          @click="saveEdit()"
        >{{$t('save')}}</el-button>
        <el-button @click="EditClose()" size="mini">{{$t('cancel')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  testitem,
  firstlevel,
  testItemIndex,
  testitem_create,
  testitem_update,
  testitem_destroy,
  testitem_reuse
} from '@/api/quality'
export default {
  name: 'Quality-cost',
  data () {
    return {
      permissions :JSON.parse(localStorage.getItem('permissions')),
      list: [],
      expands: [],
      currentPage: 1,
      queryList: {
        page: '1',
        testprodcate_id: '',
        name: ''
      },
      dialogAdd: false,
      addForm: {
        testprodcate_id: '',
        pid: '',
        name: '',
        name_en:'',
        coa_name:'',
        coa_name_en:'',
        cost: '',
        aging_in:'',
        aging_out:'',
        fee: '',
        mark:'',
        specification_en:'',
        specification:'',
        coa_default:0,
        coa_rank:'',
        only_for_coa:0,
        coa_result_cn:'',
        coa_result:''
      },
      addForm_loadingSave: false,
      dialogEdit: false,
      editForm: {
        id: '',
        pid: '',
        testprodcate_id: '',
        name: '',
        name_en:'',
        coa_name:'',
        coa_name_en:'',
        cost: '',
        aging_in:'',
        aging_out:'',
        fee: '',
        mark:'',
        specification_en:'',
        specification:'',
        coa_default:0,
        coa_rank:'',
        only_for_coa:0,
        coa_result_cn:'',
        coa_result:''
      },
      edit_aging:false,
      addForm_aging:true,
      editForm_loadingSave: false,
      Testprodcate: {},
      ids: [],
      parent: [],
      status: {},
      loading_search:false
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "Quality-cost") {
        this.fetchData();
      }
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    search () {
      this.loading_search=true
      this.queryList.page = 1;
      this.currentPage=1
      this.fetchData()
    },
    deletes () {
      if (this.ids.length > 0) {
        testitem_destroy(this.ids, this)
      }
    },
    fetchData () {
      // testitem(this.queryList).then(res => {
      //   res.data.data.forEach((items, index) => {
      //     if (items.testitems.length > 0) {
      //       this.expands.push(items.id);
      //     }
      //   });

      // });
      testItemIndex(this.queryList).then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.list = res.data
        this.parent = res.data.data
        res.enum.Testprodcate[0] = {
          id: '',
          name: '全部',
          val: ''
        }
        this.Testprodcate = res.enum.Testprodcate
        this.status = res.enum.status
      })
    },
    handleAdd () {
      this.addForm= {
        testprodcate_id: '',
        pid: '',
        name: '',
        name_en:'',
        cost: '',
        aging_in:'',
        aging_out:'',
        fee: '',
        mark:'',
        coa_name:"",
        coa_name_en:'',
        specification_en:'',
        specification:'',
        coa_default:0,
        coa_rank:'',
        only_for_coa:0,
        coa_result_cn:'',
        coa_result:''
      },
      this.dialogAdd = true
    },
    pid_change(){
      if(this.addForm.pid){
        this.addForm_aging = false
        this.addForm.aging_in = ''
        this.addForm.aging_out = ''
        this.addForm.mark = ''
        this.addForm.coa_name = ''
        this.addForm.coa_name_en = ''
        this.addForm.only_for_coa = 0
        this.addForm.specification_en = ''
        this.addForm.specification = ''
        this.addForm.coa_default = 0
        this.addForm.coa_rank = '',
        this.addForm.coa_result_cn='',
        this.addForm.coa_result=''
      }else{
        this.addForm_aging = true
      }
    },
    saveAdd () {
      testitem_create(this.addForm, this)
    },
    AddClose(){
      this.dialogAdd = false
      this.addForm_aging = true
    },
    handleEdit (row) {
      this.editForm.id = row.id
      this.editForm.aging_in=''
      this.editForm.aging_out = ''
      this.editForm.mark = ''
      this.editForm.coa_name = ''
      this.editForm.coa_name_en = ''
      this.editForm.specification_en=''
      this.editForm.specification=''
      this.editForm.coa_default=0
      this.editForm.coa_rank=''
      this.editForm.only_for_coa=0
      this.editForm.coa_result_cn=''
      this.editForm.coa_result=''
      if (row.pid === 0||!row.pid) {
        this.editForm.pid = ''
        this.edit_aging = true
        this.editForm.aging_in=row.aging_in
        this.editForm.aging_out=row.aging_out
        this.editForm.mark = row.mark
        this.editForm.coa_name = row.coa_name
        this.editForm.coa_name_en = row.coa_name_en
        this.editForm.specification_en= row.specification_en
        this.editForm.specification= row.specification
        this.editForm.coa_default= row.coa_default
        this.editForm.coa_rank= row.coa_rank
        this.editForm.only_for_coa= row.only_for_coa
        this.editForm.coa_result_cn=row.coa_result_cn
        this.editForm.coa_result=row.coa_result
        if(row.name=='核磁'||row.name=='液相'||row.name=='气相'||row.name=='比旋度'||row.name=='水分'||row.name=='熔点'||row.name=='MS'){
          this.editForm.aging_in=row.aging_in?row.aging_in:48
          this.editForm.aging_out=row.aging_out?row.aging_out:96
        }
        if(row.name=='LCMS'||row.name=='GCMS'||row.name=='红外'){
          this.editForm.aging_in=row.aging_in
          this.editForm.aging_out=row.aging_out?row.aging_out:96
        }
        if(row.name=='高温测试'||row.name=='滴定'){
          this.editForm.aging_in=row.aging_in
          this.editForm.aging_out=row.aging_out?row.aging_out:120
        }
      } else {
        this.editForm.pid = row.pid
        this.edit_aging = false
      }
      this.editForm.testprodcate_id = row.testprodcate_id
      this.editForm.cost = row.cost
      this.editForm.name = row.name
      this.editForm.name_en = row.name_en
      this.editForm.fee = row.fee
      this.dialogEdit = true
    },
    saveEdit () {
      this.editForm.coa_rank= parseInt(this.editForm.coa_rank)
      testitem_update(this.editForm,this)
    },
    EditClose(){
      this.dialogEdit = false
      this.edit_aging = false
    },
    handleDel (row) {
      testitem_destroy([row.id], this)
    },
    handle_reuse (row) {
      testitem_reuse(row.id, this)
    },
    handleCurrentChange (page_current) {
      this.queryList.page = this.currentPage = page_current
      this.fetchData()
    },
    handleSelectionChange (val) {
      this.ids = []
      val.forEach((item, index) => {
        this.ids.push(item.id)
      })
    }
  }
}
</script>
