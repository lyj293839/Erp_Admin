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
}

.sbaoDialog {
  font-size: 12px;
  font-weight: bold;
}

.question-select {
  height: 40px;
}

.question-select select {
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  outline: none;
  height: 100%;
  padding: 0 20px;
  color: #333;
  font-size: 22px;
}

.question-select .el-select {
  margin-right: 5px;
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
    <!-- 页眉 -->

    <div class="sbaoHeard">
      <el-button
        class="add"
        size="mini"
        type="primary"
        @click="handleAdd"
        icon="plus"
        v-if="permissions.indexOf(248)>-1"
      >{{$t('wareHouse.wareHome.addButton')}}</el-button>
      <div class="sbaoHeard-one">
        <el-input
          class="sbaoInput"
          v-model="queryList.name"
          :placeholder="$t('wareHouse.wareHome.serchInput')"
          size="mini"
          @focus="inputFocus"
        ></el-input>
        <el-button
          type="primary"
          size="mini"
          :loading="loading_search"
          @click="sbaoSearch"
        >{{$t('wareHouse.wareHome.searchButton')}}</el-button>
      </div>
    </div>

    <!-- 页面 -->

    <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="small">
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.id')">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column
        :label="$t('wareHouse.wareHome.wareHome_page.name')"
        class="sbaoTable"
      >
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.name_cn')">
        <template slot-scope="scope">{{scope.row.name_cn}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.telphone')" width="200px">
        <template slot-scope="scope">{{scope.row.telphone}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.fix')" width="200px">
        <template slot-scope="scope">{{scope.row.fax}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.zipcode')" width="200px">
        <template slot-scope="scope">{{scope.row.zipcode}}</template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.address_line')">
        <template slot-scope="scope">
          {{scope.row.district}}
          <span v-if="scope.row.address_line1" class="xx">/</span>
          {{scope.row.address_line1}}
          <span v-if="scope.row.address_line2" class="xx">/</span>
          {{scope.row.address_line2}}
        </template>
      </el-table-column>
      <el-table-column :label="$t('wareHouse.wareHome.wareHome_page.make')" width="130px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.row)"
          >{{$t('wareHouse.wareHome.editButton')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDel(scope.row)"
            v-if="permissions.indexOf(249)>-1"
          >{{$t('wareHouse.wareHome.delButton')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :page-size="list.per_page"
      :total="list.total"
    ></el-pagination>

    <!-- 增加 -->

    <el-dialog class="sbaoDialog" title :visible.sync="dialogAdd" top="5vh">
      <el-form class="sbaoFrom" :model="addForm" label-width="100px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.name')" :required="true">
              <el-input v-model="addForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.name_cn')">
              <el-input v-model="addForm.name_cn" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.telphone')">
              <el-input v-model="addForm.telphone" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.fix')">
              <el-input v-model="addForm.fax" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.zipcode')">
              <el-input v-model="addForm.zipcode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <el-form-item label="员工">
              <el-select v-model="addForm.user_ids"  multiple filterable placeholder="" style="width: 100%;">
                <el-option
                        v-for="item in staffs"
                        :key="item.id"
                        :label="item.username"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.address_line1.address')" :required="true">
          <div class="question-select">
            <el-select
              v-model="addForm.country_code"
              clearable
              filterable
              @change="selected_country_address(addForm.country_code)"
              size="small"
              :placeholder="$t('wareHouse.wareHome.wareHome_Form.address_line1.country')"
            >
              <el-option v-for="(i,index) in country" :key="index" :label="i.Name" :value="i.Code"></el-option>
            </el-select>
            <el-select
              v-model="addForm.city_id"
              clearable
              filterable
              size="small"
              :placeholder="$t('wareHouse.wareHome.wareHome_Form.address_line1.city')"
            >
              <el-option v-for="(i,index) in city" :key="index" :label="i.Name" :value="i.ID"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.address_line2')">
          <el-input v-model="addForm.address_line1" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.address_line3')">
          <el-input v-model="addForm.address_line2" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="save_fy"
            @click="saveAdd()"
            icon="el-icon-edit-outline"
            size="mini"
          >{{$t('wareHouse.wareHome.wareHome_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            @click="addClose"
            size="mini"
          >{{$t('wareHouse.wareHome.wareHome_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑 -->

    <el-dialog title :visible.sync="dialogEdit"  top="5vh">
      <el-form class="sbaoFrom" :model="editForm" label-width="100px" label-position="right">
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.name')" :required="true">
              <el-input v-model="editForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.name_cn')">
              <el-input v-model="editForm.name_cn" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.telphone')">
              <el-input v-model="editForm.telphone" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.fix')">
              <el-input v-model="editForm.fax" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="10">
            <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.zipcode')">
              <el-input v-model="editForm.zipcode" size="small"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <div></div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="24">
            <el-form-item label="员工">
              <el-select v-model="editForm.user_ids"  multiple filterable style="width: 100%;">
                <el-option
                        v-for="item in staffs"
                        :key="item.id"
                        :label="item.username"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.address_line1.address')" :required="true">
          <div class="question-select">
            <el-select
              v-model="editForm.country_code"
              clearable
              filterable
              @change="selected_country_address(editForm.country_code)"
              size="small"
              :placeholder="$t('wareHouse.wareHome.wareHome_Form.address_line1.country')"
            >
              <el-option v-for="(i,index) in country" :key="index" :label="i.Name" :value="i.Code"></el-option>
            </el-select>
            <el-select
              v-model="editForm.city_id"
              clearable
              filterable
              size="small"
              :placeholder="$t('wareHouse.wareHome.wareHome_Form.address_line1.city')"
            >
              <el-option v-for="(i,index) in city" :key="index" :label="i.Name" :value="i.ID"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.address_line2')">
          <el-input v-model="editForm.address_line1" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('wareHouse.wareHome.wareHome_Form.address_line3')">
          <el-input v-model="editForm.address_line2" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="save_fy"
            @click="saveEdit()"
            icon="el-icon-edit-outline"
            size="mini"
          >{{$t('wareHouse.wareHome.wareHome_Form.keepButton')}}</el-button>
          <el-button
            class="sbaoClose"
            @click="editClose"
            size="mini"
          >{{$t('wareHouse.wareHome.wareHome_Form.closeButton')}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { country_list, city_list, create, destroy, getTreeUsers } from '@/api/warehouse'
import { lists, update, list_Total } from '@/api/prod'
export default {
  name: 'Warehouse-index',
  data () {
    return {
      permissions: JSON.parse(localStorage.getItem('permissions')),
      clearable: false,
      save_fy:false,
      list: [],
      currentPage: 1,
      address: '',
      queryList: {
        page: '1',
        name: ''
      },
      dialogAdd: false,
      addForm: {
        name: '',
        name_cn: '',
        telphone: '',
        fax: '',
        zipcode: '',
        fax: '',
        address_line1: '',
        address_line2: '',
        country_code: '',
        city_id: '',
        user_ids: [],
        loading: false
      },
      addForm_loadingSave: false,
      dialogEdit: false,
      editForm: {
        id: '',
        name: '',
        name_cn: '',
        telphone: '',
        fax: '',
        zipcode: '',
        fax: '',
        address_line1: '',
        address_line2: '',
        country_code: '',
        city_id: '',
        user_ids: []
      },
      editForm_loadingSave: false,
      country: [],
      city: [],
      staffs: [],
      loading_search:false
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'Warehouse-index') {
        this.fetchData()
      }
    }
  },
  created () {
    this.fetchData()
    country_list().then(res => {
      this.country = res.data
    })
  },
  methods: {
    selected_country_address (id) {
      city_list(id).then(res => {
        this.city = res.data
      })
    },
    fetchData () {
      this.queryList.name = this.queryList.name.replace(/\s/g, '')
      lists(this.queryList, 'warehouse').then(res => {
          if(this.loading_search){
              this.$message({
                  message:res.msg,
                  type:'success'
              })
              this.loading_search=false
          }
        this.list = res.data
      })
      getTreeUsers().then(res => {
        this.staffs = []
        this.staffs = res.data
      })
    },
    handleAdd () {
      this.addForm = {
        name: '',
        name_cn: '',
        telphone: '',
        fax: '',
        zipcode: '',
        fax: '',
        country_code: '',
        city_id: '',
        address_line1: '',
        address_line2: ''
      }
      this.dialogAdd = true
    },
    saveAdd () {
      create(this.addForm, 'warehouse', 'create', this)
      this.prov = '请选择国家'
      this.fetchData()
    },
    handleCurrentChange (pageCurrent) {
      this.queryList.page = this.currentPage = pageCurrent
      this.fetchData()
    },
    inputFocus () {
      this.fetchData()
      this.searchInput = ''
    },
    sbaoSearch () {
      this.loading_search=true
      this.queryList.page = 1
      this.currentPage=1
      this.fetchData()
    },
    editClose () {
      this.dialogEdit = false
    },
    addClose () {
      this.dialogAdd = false
      this.addForm.country_code = ''
      this.addForm.city_id = ''
    },
    handleEdit (row) {
      this.editForm.user_ids = []
      this.dialogEdit = true
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.name_cn = row.name_cn
      this.editForm.telphone = row.telphone
      this.editForm.fax = row.fax
      row.users.forEach(i =>{
        this.editForm.user_ids.push(i.id)
      })
      // this.editForm.user_ids = row.users
      this.editForm.zipcode = row.zipcode
      this.editForm.address_line1 = row.address_line1
      this.editForm.address_line2 = row.address_line2
      this.editForm.country_code = row.country_code
      this.editForm.city_id = row.city_id
      country_list().then(res => {
        this.country = res.data
      })
      city_list(this.editForm.country_code).then(res => {
        this.city = res.data
      })
    },
    saveEdit () {
      update(this.editForm, 'warehouse', 'update', this)
    },
    handleDel (row) {
      destroy(row, 'warehouse', 'destroy', this, row.id)
      this.fetchData()
    },
  }
}
</script>
