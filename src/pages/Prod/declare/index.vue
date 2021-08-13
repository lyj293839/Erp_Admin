<style lang="scss" scoped type="text/scss">
.sbaoHeard {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.sbaoInput {
  width: 70%;
}

.sbaoHeard-one {
  display: flex;
  align-items: center;
  width: 20%;
  justify-content: space-around;
}

.tipOne {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.sbaoClose {
  margin-left: 140px;
}

.sbaoClose:hover {
  color: black;
  background: gainsboro;
}

.sbaoFrom {
  font-weight: bold;
  border-top: 1px solid grey;
  padding-top: 15px;
}

.sbaoDialog {
  font-size: 12px;
  font-weight: bold;
}
/deep/.gutter {
  display: block !important;
}
el-table {
  background: #d9edf6;
}
</style>
<template>
  <d2-container>
    <div class="sbaoHeard">
      <el-button
        class="add"
        size="mini"
        type="primary"
        @click="handleAdd"
        icon="plus"
      >{{$t('product.declare.addButton')}}</el-button>
      <div class="sbaoHeard-one">
        <el-input
          class="sbaoInput"
          v-model="queryList.hscode"
          :placeholder="$t('product.declare.serchInput')"
          size="mini"
        ></el-input>
        <el-button
          type="primary"
          size="mini"
          :loading="loading_search"
          @click="sbaoSearch"
        >{{$t('product.declare.searchButton')}}</el-button>
      </div>
    </div>

    <!-- 页面 -->

    <el-table
      :data="list.data"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      size="small"
    >
      <el-table-column
        :label="$t('product.declare.declare_page.hscode')"
        width="100px"
        class="sbaoTable"
      >
        <template slot-scope="scope">{{scope.row.hscode}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.name')" width="60px">
        <template slot-scope="scope">
          <i v-if="scope.row.name" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.appearance')" width="60px">
        <template slot-scope="scope">
          <i v-if="scope.row.appearance" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.purity')" width="78px">
        <template slot-scope="scope">
          <i v-if="scope.row.purity" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.usage')" width="64px">
        <template slot-scope="scope">
          <i v-if="scope.row.usage" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.signdate')" width="82px">
        <template slot-scope="scope">
          <i v-if="scope.row.signdate" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.cas')" width="52px">
        <template slot-scope="scope">
          <i v-if="scope.row.cas" class="el-icon-check"></i>
        </template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.supervisio')" width="100px">
        <template slot-scope="scope">{{scope.row.supervisio}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.field7')">
        <template slot-scope="scope">{{scope.row.field7}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.field8')">
        <template slot-scope="scope">{{scope.row.field8}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.field9')">
        <template slot-scope="scope">{{scope.row.field9}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.field10')">
        <template slot-scope="scope">{{scope.row.field10}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.rate')+'%'">
        <template slot-scope="scope">{{scope.row.rate}}</template>
      </el-table-column>
      <el-table-column :label="$t('product.declare.declare_page.make')" width="130px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >{{$t('product.declare.editButton')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row)"
          >{{$t('product.declare.delButton')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>

    <!-- 增加 -->

    <el-dialog
      class="sbaoDialog"
      :title="$t('product.declare.declare_Form.declare_add')"
      :visible.sync="dialogAdd"
      top="5vh"
      @close='closeAdd()'
    >
      <el-form class="sbaoFrom" :model="addForm" label-width="90px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.hscode')" :required="true">
              <el-input v-model="addForm.hscode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.supervisio')">
              <el-input v-model="addForm.supervisio" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.name')">
              <template>
                <el-radio-group v-model="addForm.name">
                  <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
                  <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.rate')+'(%)'">
              <el-input v-model="addForm.rate" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('product.declare.declare_Form.appearance')">
          <template>
            <el-radio-group v-model="addForm.appearance">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.purity')">
          <template>
            <el-radio-group v-model="addForm.purity">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.usage')">
          <template>
            <el-radio-group v-model="addForm.usage">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.signdate')">
          <template>
            <el-radio-group v-model="addForm.signdate">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.cas')">
          <template>
            <el-radio-group v-model="addForm.cas">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field7')">
          <el-input v-model="addForm.field7" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field8')">
          <el-input v-model="addForm.field8" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field9')">
          <el-input v-model="addForm.field9" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field10')">
          <el-input v-model="addForm.field10" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveAdd()"
            icon="el-icon-edit-outline"
            size="mini"
          >{{$t('product.declare.declare_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            @click="closeAdd()"
            size="mini"
          >{{$t('product.declare.declare_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->

    <el-dialog
      :title="$t('product.declare.declare_Form.declare_edit')"
      :visible.sync="dialogEdit"
      top="5vh"
      :close-on-click-modal="false"
      @close='closeAdd()'
    >
      <el-form class="sbaoFrom" :model="editForm" label-width="90px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.hscode')" :required="true">
              <el-input v-model="editForm.hscode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.supervisio')">
              <el-input v-model="editForm.supervisio" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.name')">
              <template>
                <el-radio-group v-model="editForm.name">
                  <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
                  <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
                </el-radio-group>
              </template>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('product.declare.declare_Form.rate')">
              <el-input v-model="editForm.rate" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('product.declare.declare_Form.appearance')">
          <template>
            <el-radio-group v-model="editForm.appearance">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.purity')">
          <template>
            <el-radio-group v-model="editForm.purity">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.usage')">
          <template>
            <el-radio-group v-model="editForm.usage">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.signdate')">
          <template>
            <el-radio-group v-model="editForm.signdate">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.cas')">
          <template>
            <el-radio-group v-model="editForm.cas">
              <el-radio :label="1" size="small">{{$t('product.declare.need')}}</el-radio>
              <el-radio :label="0" size="small">{{$t('product.declare.no_need')}}</el-radio>
            </el-radio-group>
          </template>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field7')">
          <el-input v-model="editForm.field7" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field8')">
          <el-input v-model="editForm.field8" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field9')">
          <el-input v-model="editForm.field9" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('product.declare.declare_Form.field10')">
          <el-input v-model="editForm.field10" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="saveEdit()"
            icon="el-icon-edit-outline"
            size="mini"
          >{{$t('product.declare.declare_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            @click="closeAdd()"
            size="mini"
          >{{$t('product.declare.declare_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import { lists, update, destroy } from "@/api/prod";
import request from '@/plugin/axios'
export default {
  name: "Prod-declare",
  data() {
    return {
      list: [],
      currentPage: 1,
      queryList: {
        page: "1",
        hscode: ""
      },
      dialogAdd: false,
      addForm: {
        rate: "",
        hscode: "",
        supervisio: "",
        appearance: 1,
        name: 1,
        purity: 1,
        signdate: 1,
        usage: 1,
        cas: 1,
        field7: "",
        field8: "",
        field9: "",
        field10: "",
        loading: false
      },
      addForm_loadingSave: false,
      dialogEdit: false,
      editForm: {
        id: "",
        rate: "",
        hscode: "",
        signdate: "",
        supervisio: "",
        appearance: "",
        name: "",
        purity: "",
        usage: "",
        cas: "",
        field7: "",
        field8: "",
        field9: "",
        field10: ""
      },
      editForm_loadingSave: false,
      loading_search:false
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Prod-declare'){
            this.fetchData()
        }
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      lists(this.queryList, "hselement").then(res => {
          if(this.loading_search){
              this.$message({
                  message: 'success',
                  type: 'success'
              })
              this.loading_search=false
          }
          this.list = res.data;
      });
    },
    handleAdd() {
      this.dialogAdd = true;
      this.addForm.rate = 13
    },
    saveAdd() {
      create(this.addForm, "hselement", "create", this);
    },
    handleEdit(row) {
      this.dialogEdit = true;
      this.editForm.id = row.id;
      this.editForm.rate = row.rate;
      this.editForm.hscode = row.hscode;
      this.editForm.supervisio = row.supervisio;
      this.editForm.field7 = row.field7;
      this.editForm.field8 = row.field8;
      this.editForm.field9 = row.field9;
      this.editForm.field10 = row.field10;
      this.editForm.name = row.name;
      this.editForm.purity = row.purity;
      this.editForm.usage = row.usage;
      this.editForm.signdate = row.signdate;
      this.editForm.cas = row.cas;
      this.editForm.appearance = row.appearance ? row.appearance : 0;
    },
    saveEdit() {
      update(this.editForm, "hselement", "update", this);
    },
    handleDel(row) {
      destroy(row, "hselement", "destroy", this, row.id);
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    sbaoSearch() {
      this.loading_search=true
        this.queryList.page = 1;
        this.currentPage=1
      this.fetchData()
    },
    closeAdd() {
      this.addForm = {
        rate: "",
        hscode: "",
        supervisio: "",
        appearance: 1,
        name: 1,
        purity: 1,
        signdate: 1,
        usage: 1,
        cas: 1,
        field7: "",
        field8: "",
        field9: "",
        field10: ""
      };
      this.dialogAdd = false;
      this.dialogEdit = false;
    }
  }
};
function create (datas,type,method_type,that) {
    datas.loading=true
    let data= JSON.parse(JSON.stringify(datas));
    delete data.loading
    request({
        url: 'api/v1/'+type+'/'+method_type,
        method: 'post',
        data
    }).then(res => {
        datas.loading=false
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData()
            that.dialogAdd = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        datas.loading=false
    })
}
</script>

