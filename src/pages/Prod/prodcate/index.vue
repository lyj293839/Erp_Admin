<style lang="scss" scoped>
    .title-group {
        margin-top: 20px;
        margin-bottom: 10px;
    &:first-child {
         margin-top: 0px;
     }
    .title {
        margin: 0px;
    }
    .sub-title {
        margin: 0px;
        font-size: 10px;
    }
    }
</style>
<template>
    <d2-container :filename="filename">

        <el-row  :gutter="24" style="margin-bottom: 20px;">
            <el-col v-if="list.length>0" :span="10" style="margin-bottom: 20px;">
                <el-tree
                        :data="list"
                        :props="defaultProps"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button
                                type="text"
                                size="mini"
                                v-if="permissions.indexOf(480)>-1"
                                @click="() => edit(node,data)" style="margin-left: 5px;padding: 7px 0!important;">
                       <d2-icon name="edit" style="font-size: 16px;color: #333;"/>
                      </el-button>
                      <el-button
                              type="text"
                              size="mini"
                              v-if="permissions.indexOf(479)>-1"
                              @click="() => append(node,data)" style="margin-left: 5px;padding: 7px 0!important;">
                       <d2-icon name="plus" style="font-size: 16px;color: #333;"/>
                      </el-button>
                      <el-button
                              type="text"
                              size="mini"
                              v-if="permissions.indexOf(481)>-1"
                              @click="() => remove(node,data)" style="margin-left: 5px;padding: 7px 0!important;">
                       <d2-icon name="times" style="font-size: 16px;color: #333;"/>
                      </el-button>
                    </span>
                  </span>
                </el-tree>
            </el-col>
            <el-col :span="14" >
                <el-card class="box-card" style="width: 800px;position: fixed;top: 100px;">
                    <div class="text item">
                        <el-form :model="form" ref="form">
                            <el-form-item label="parent" :label-width="formLabelWidth">
                                <el-select-tree v-model="form.pid" :treeData="list" :propNames="defaultProps" clearable
                                                placeholder="Please select parent">
                                </el-select-tree>
                            </el-form-item>
                            <el-form-item label="name" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="chinese_name" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.name_cn" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="rank" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.rank" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="" :label-width="formLabelWidth">
                                <el-button type="primary" @click="saveAdd(form)"  v-text="form.id?'Save':'Add'"  size="mini"></el-button>
                                <el-button type="danger" @click="destroy(form)"  icon="delete" v-show="form.id && form.id!=null" size="mini">Delete
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </d2-container>
</template>
<script>
    import {
        prodcate,
        prodcate_create,
        prodcate_update,
        prodcate_destroy
    } from "@/api/prod";
    import selectTree from "@/components/selectTree/selectTree"
    export default {
        name:"Prod-prodcate",
        components: {
            'el-select-tree': selectTree,
        },
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                icon: '',
                filename: __filename,
                form: {
                    pid: 0,
                    rank:'',
                    name:'',
                    name_cn: '',
                },
                formLabelWidth: '100px',
                list: [],
                defaultProps: {
                    children: 'child',
                    label: 'name'
                }
            };
        },
        watch: {
            $route (to, from) {
                if(to.name=='permission-permission'){
                    this.fetchData()
                }
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            fetchData(page_current) {
                this.listLoading = true;
                prodcate(page_current).then(res => {
                    console.log(res.data)
                    this.list = res.data;
                })
            },
            append(node,data){
                this.form={
                    rank:'',
                    name:'',
                    name_cn: '',
                }
                this.form.pid=data.id

            },
            edit(node,data){
                console.log(data)
                this.form.pid=data.pid
                this.form.id=data.id
                this.form.rank=data.rank
                this.form.name_cn=data.name
                this.form.name=data.name
            },
            remove(node,data) {
                    const h = this.$createElement;
                    this.$msgbox({
                        message: h('p', null, [
                            h('span', null, '确定要执行此操作吗？ ')
                        ]),
                        showCancelButton: true,
                        cancelButtonText: '取消',
                        confirmButtonText: '确定',
                        type: 'warning',
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true;
                                instance.confirmButtonText = '执行中...';
                                 prodcate_destroy(data.id).then(res => {
                                    instance.confirmButtonLoading = false;
                                    instance.confirmButtonText = '确定';
                                    if (res && res.code == 0) {
                                        this.$message({
                                            message: 'success',
                                            type: 'success'
                                        });
                                        done();
                                        this.fetchData();
                                        this.form={
                                            parent_id: 0,
                                            sort:'',
                                            name:'',
                                            chinese_name: '',
                                            english_name:'',
                                            icon: '',
                                        }
                                    }else{
                                        this.$message({
                                            message: res.msg,
                                            type: 'error'
                                        });
                                        done();
                                    }
                                })
                            }
                            if (action === 'cancel') {
                                done();
                            }
                        }
                    })
            },
            destroy(form){
                const h = this.$createElement;
                this.$msgbox({
                    message: h('p', null, [
                        h('span', null, '确定要执行此操作吗？ ')
                    ]),
                    showCancelButton: true,
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                             prodcate_destroy([form.id]).then(res => {
                                instance.confirmButtonLoading = false;
                                instance.confirmButtonText = '确定';
                                if (res && res.code == 0) {
                                    this.$message({
                                        message: 'success',
                                        type: 'success'
                                    });
                                    done();
                                    this.fetchData();
                                    this.form={
                                        parent_id: 0,
                                        sort:'',
                                        name:'',
                                        chinese_name: '',
                                        english_name:'',
                                        icon: '',
                                    }
                                }else{
                                    this.$message({
                                        message: res.msg,
                                        type: 'error'
                                    });
                                    done();
                                }
                            })
                        }
                        if (action === 'cancel') {
                            done();
                        }
                    }
                })
            },
            saveAdd(form) {
                if(form.id){
                     prodcate_update(form,this)
                }else{
                    prodcate_create(form,this)
                }


            },
            handleNodeClick(data) {
                console.log(data);
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
    };
</script>
