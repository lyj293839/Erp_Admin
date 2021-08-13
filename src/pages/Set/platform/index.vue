<style lang="scss" scoped type="text/scss">
  .add {
    margin-bottom: 10px;
  }
  .el-pagination {
    text-align: right;
    margin-top: 10px;
  }
  .heard_top {
    margin: 10px 0px 15px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    span {
      font-size: 14px;
    }
    .el-select {
      margin: 0px 5px;
    }
    .el-input {
      margin: 0px 5px;
    }
  }
</style>
<template>
  <d2-container>
    <div class="heard_top">
      <el-input v-model="value" size="mini" style="width: 200px;" class="d2-mb-10" placeholder="平台名称"></el-input>
      <el-button
              class="add"
              size="mini"
              type="primary"
              @click="handleAdd">ADD
      </el-button>
      <el-button
              class="add"
              size="mini"
              type="primary"
              @click="handleAdd">Search
      </el-button>
    </div>
    <el-table :data="list.data" element-loading-text="Loading" border fit highlight-current-row size="small">
      <el-table-column label="平台名称" align="center">
        <template slot-scope="scope">
          {{scope.row.value.name}}
        </template>
      </el-table-column>
      <el-table-column label="结算方式" align="center">
        <template slot-scope="scope">
          {{scope.row.value.name_cn}}
        </template>
      </el-table-column>
      <el-table-column label='类型' align="center">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="Options">
        <template slot-scope="scope">
          <template>
            <el-button
                    size="mini"
                    type="primary"
                    v-if="permissions.indexOf(305)>-1"
                    @click="handleEdit(scope.row)">Edit
            </el-button>
            <el-button
                    size="mini"
                    type="danger"
                    v-if="permissions.indexOf(307)>-1"
                    @click="handleDel(scope.row)">Delete
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="list.per_page"
            layout="total,sizes,prev, pager, next"
            :page-sizes="[15,20,50,100]"
            @size-change="handleSizeChange"
            :total="list.total">
    </el-pagination>

    <el-dialog title="Add" :visible.sync="dialogAdd" size="mini" >
      <el-input v-model="value" class="d2-mb-10" placeholder="平台名称"></el-input>
      <el-transfer v-model="value" :data="data" @right-check-change="handleChange"></el-transfer>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading='addForm_loadingSave' size="mini"
                   @click="saveAdd()">Sure
        </el-button>
        <el-button @click="dialogAdd = false" size="mini">Cancel</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Edit" :visible.sync="dialogEdit" size="small" >
      <el-form :model="editForm" label-width="80px" label-position="right">
        <el-form-item label="name" :required="true">
          <el-input v-model="editForm.value.name"></el-input>
        </el-form-item>
        <el-form-item label="name_cn" :required="true">
          <el-input v-model="editForm.value.name_cn"></el-input>
        </el-form-item>
        <el-form-item label="value" :required="true">
          <el-input v-model="editForm.index"></el-input>
        </el-form-item>
        <el-form-item label="status">
          <el-radio-group v-model="editForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading='editForm_loadingSave' size="mini"
                   @click="saveEdit()">Sure
        </el-button>
        <el-button @click="dialogEdit = false" size="mini">Cancel</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
    import {
        lists,
        create,
        update,
        destroy,
    } from '@/api/Enum';
    export default {
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                    });
                }
                return data;
            };
            return {
                data: generateData(),
                value: [1, 4],
                selected:'',
                permissions:JSON.parse(localStorage.getItem('permissions')),
                key:'AdditionalCostType',
                list: [],
                currentPage: 1,
                queryList:{
                    'page':'1',
                    per_page:''
                },
                dialogAdd: false,
                addForm: {
                    value:{
                        name: '',
                        name_cn: '',
                    },
                    index:'',
                    status: '1'
                },
                addForm_loadingSave: false,
                dialogEdit: false,
                editForm: {
                    id: '',
                    value:{
                        name: '',
                        name_cn: '',
                    },
                    index:'',
                    status: ''
                },
                editForm_loadingSave: false,
            }
        },
        created() {
            this.fetchData();
        },

        methods: {
            fetchData() {
                lists(this.queryList,this.key).then(res => {
                    this.list = res.data;
                    this.list.per_page = parseInt(res.data.per_page)
                })
            },
            handleAdd() {
                this.dialogAdd = true
            },
            handleChange(key,key2){
                let that=this
                if(this.selected===''){
                    this.selected=key2
                    that.value.forEach(item=>{
                        if(item!=key2[0]){
                            that.data.forEach(res=>{
                                if(res.key==item){
                                    res.disabled=true
                                }
                            })
                        }
                    })
                }else{
                    if(this.selected==key2[0]){
                        this.selected=''
                        this.data.forEach(res=>{
                            res.disabled=false
                        })
                    }else{
                        this.selected=key2
                        this.value.forEach(item=>{
                            if(item!=key2[0]){
                                that.data.forEach(res=>{
                                    if(res.key==item){
                                        res.disabled=true
                                    }
                                })
                            }
                        })
                    }
                }
                console.log(this.value)
                // if(){
                //
                // }
            },
            saveAdd() {
                create(this.addForm,this.key,this);
                this.addForm = {
                    value:{
                        name: '',
                        name_cn: '',
                    },
                    index:'',
                    status: '1'
                }
            },
            handleEdit(row) {
                this.dialogEdit = true;
                this.editForm.id = row.id;
                this.editForm.value = JSON.parse(JSON.stringify(row.value));
                this.editForm.index = row.index;
                this.editForm.status = row.status;
            },
            saveEdit() {
                update(this.editForm,this.key,this);
            },
            handleDel(row) {
                destroy (row,this.key,this);
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleSizeChange(val) {
                this.queryList.per_page = val;
                this.fetchData();
            },
        },
    };
</script>


