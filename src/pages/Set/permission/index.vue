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
                        :expand-on-click-node="false">
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                      <span style="margin-right:5px;">{{data.id}}</span>
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
                                <el-select-tree v-model="form.parent_id" :treeData="list" :propNames="defaultProps" clearable
                                                placeholder="Please select parent">
                                </el-select-tree>
                            </el-form-item>
                            <el-form-item label="name" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="chinese_name" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.chinese_name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="english_name" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.english_name" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="sort" :label-width="formLabelWidth" :required="true">
                                <el-input v-model="form.sort" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="icon" :label-width="formLabelWidth">
                                <div class="title-group">
                                    <p class="sub-title">
                                        <template v-if="form.icon">
                                            {{form.icon}}
                                            <i :class="'fa fa-' + icon"></i>
                                        </template>
                                        <!--<template v-else>未选择</template>-->
                                    </p>
                                </div>
                                <d2-icon-select v-model="form.icon"/>
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
        permission_lists,
        permission_create,
        permission_update,
        permission_destroy
    } from '@/api/permission_manage';
    import selectTree from "@/components/selectTree/selectTree"
    export default {
        name:"Set-permission",
        components: {
            'el-select-tree': selectTree,
        },
        data() {
            return {
                permissions:JSON.parse(localStorage.getItem('permissions')),
                icon: '',
                filename: __filename,
                form: {
                    parent_id: 0,
                    sort:'',
                    name:'',
                    chinese_name: '',
                    english_name:'',
                    icon: '',
                },
                formLabelWidth: '100px',
                list: [],
                defaultProps: {
                    children: '_child',
                    label: 'english_name'
                }
            };
        },
        watch: {
            $route (to, from) {
                if(to.name=='permission-permission'){
                    this.fetchData()
                    if(this.$i18n.locale=='cn'){
                        this.defaultProps={
                            children: '_child',
                            label: 'chinese_name'
                        }
                    }
                }
            }
        },
        created() {
            this.fetchData();
            if(this.$i18n.locale=='cn'){
                this.defaultProps={
                    children: '_child',
                    label: 'chinese_name'
                }
            }
        },
        methods: {
            fetchData(page_current) {
                this.listLoading = true;
                permission_lists(page_current).then(res => {
                    console.log(res.data)
                    this.list = res.data;
                })
            },
            append(node,data){
                console.log(data)
                this.form={
                    sort:'',
                    name:'',
                    chinese_name: '',
                    english_name:'',
                    icon: '',
                }
                this.form.parent_id=data.id

            },
            edit(node,data){
                this.form.parent_id=data.parent_id
                this.form.id=data.id
                this.form.sort=data.sort
                this.form.chinese_name=data.chinese_name
                this.form.english_name=data.english_name
                this.form.name=data.name
                this.form.icon=data.icon
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
                                permission_destroy([data.id]).then(res => {
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
                            permission_destroy([form.id]).then(res => {
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
                    permission_update(form).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            this.fetchData();
                            this.form={
                                parent_id: 0,
                                sort:'',
                                name:'',
                                chinese_name: '',
                                english_name:'',
                                icon: '',
                            }
                        }
                    })
                }else{
                    permission_create(form).then(res => {
                        if (res && res.code == 0) {
                            this.$message({
                                message: 'success',
                                type: 'success'
                            });
                            this.fetchData();
                            this.form={
                                parent_id: 0,
                                sort:'',
                                name:'',
                                chinese_name: '',
                                english_name:'',
                                icon: '',
                            }
                        }
                    })
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
