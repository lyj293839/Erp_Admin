<template>
    <d2-container>
        <el-card class="box-card">
            <el-form :model="user_form" label-width="100px" class="demo-ruleForm"
                     style="width: 700px;margin: 0 auto;padding: 50px 0;">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.name')">
                            <el-input v-model="user_form.name" autocomplete="off" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.account')">
                            <el-input v-model="user_form.username" autocomplete="off" disabled size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.password')">
                            <el-input v-model="user_form.password" autocomplete="off"
                                      placeholder="" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.tel')">
                            <el-input v-model="user_form.tel" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.fax')" >
                            <el-input v-model="user_form.fax" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.email')">
                            <el-input v-model="user_form.email" autocomplete="off" size="mini"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item :label="$t('organize.userForm.sex')">
                            <el-select v-model="user_form.sex" placeholder="Please Select" size="mini">
                                <el-option
                                        v-for="item in $t('sexs')"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click="saveUser" size="mini">Save</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </d2-container>
</template>

<script>
    import {
        user_edit,
        user_update,
    } from '@/api/organize';
    import util from "@/libs/util";
    export default {
        name: "User-edit_user",
        data() {
            return {
                user_form: {
                    name: '',
                    username: '',
                    tel: '',
                    fax: '',
                    email: '',
                    password: '',
                    only_id: '',
                    department_id: '',
                    member_id: '',
                    user_type: '',
                    sex: '',
                    role_id: [],
                    grade: '',
                    status: 1
                },
            }
        },
        created() {
            let user_id = util.cookies.get('user_id')
            user_edit(user_id).then(res => {
                if (res && res.code == 0) {
                    this.user_form = {
                        id: res.data.id,
                        only_id: res.data.only_id,
                        member_id: res.data.member_id,
                        department_id: res.data.department_id,
                        name: res.data.name,
                        tel: res.data.tel,
                        fax: res.data.fax,
                        username: res.data.username,
                        email: res.data.email,
                        role_id: res.data.role_id,
                        sex: res.data.sex,
                        user_type: res.data.user_type,
                        grade: res.data.grade,
                        status: res.data.status,
                    }
                }
            })
        },
        methods: {
            saveUser() {
                user_update(this.user_form.id, this.user_form).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>