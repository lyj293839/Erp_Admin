<template>
  <div v-loading="loading2"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)" class="login-page">
    <div class="layer bg" id="login"></div>
    <div v-if="!loading2" class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <!--<img src="./image/logo.png" alt="logo">-->
      </div>
      <h1 style="color: #66b1ff;font-size: 30px;letter-spacing: 3px;">艾康ERP业务管理平台</h1>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <el-form-item  prop="email">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="el-icon-s-custom"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <i slot="prepend" class="el-icon-view"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="language">
              <el-radio v-model="formLogin.language" label="zh">zh</el-radio>
              <el-radio v-model="formLogin.language" label="en">en</el-radio>
            </el-form-item>
            <!--<el-form-item prop="code">-->
              <!--<el-input type="text" v-model="formLogin.code" placeholder="- - - -">-->
                <!--<template slot="prepend">验证码</template>-->
                <!--<template slot="append">-->
                  <!--<img class="login-code" src="./image/login-code.png">-->
                <!--</template>-->
              <!--</el-input>-->
            <!--</el-form-item>-->
            <el-button size="default" @click="submit" type="primary" :loading="dl_loading" class="button-login">登录</el-button>
          </el-form>
        </el-card>
      </div>
      <!-- 快速登录按钮 -->
      <!--<el-button size="default" type="info" class="button-help" @click="dialogVisible = true">-->
      <!--快速选择用户（测试功能）-->
      <!--</el-button>-->
    </div>
    <!--<el-dialog-->
    <!--title="快速选择用户"-->
    <!--:visible.sync="dialogVisible"-->
    <!--width="400px">-->
    <!--<el-row :gutter="10" style="margin: -20px 0px -10px 0px;">-->
    <!--<el-col v-for="(user, index) in users" :key="index" :span="8">-->
    <!--<div class="user-btn" @click="handleUserBtnClick(user)">-->
    <!--<d2-icon name="user-circle-o"/>-->
    <!--<span>{{user.name}}</span>-->
    <!--</div>-->
    <!--</el-col>-->
    <!--</el-row>-->
    <!--</el-dialog>-->
    <p class="page-login--content-footer-copyright">
      ©版权所有 Copyright(C)2009-2020 江苏艾康生物医药研发有限公司
      <a href="http://www.beian.miit.gov.cn/">
        苏ICP备15058685号-2
      </a>
    </p>
    <iframe  id='iframe_logout'  :src="url+'logoutIframe'" style="width:0;height:0;frameborder=no" frameborder="no" border="0" marginWidth=0 marginHeight=0></iframe>
    <el-dialog
            title="请设置密码"
            :visible.sync="dialogVisible"
            width="30%"
            >
      <el-input type="password" v-model="user_form.password" placeholder="密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save_password">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    /* eslint-disable */
    require('particles.js')
    import config from './config/default'
    import {AccountLogin} from '@/api/sys/login';
    import { user_edit,user_update} from '@/api/organize';
    import {enums} from '@/api/prod';
    import { mapActions } from 'vuex'
    import axios from 'axios'
    import $ from 'jquery'
    import util from '@/libs/util.js'
    export default {
        data () {
            return {
                // 快速选择用户
                radio:'1',
                password:'',
                dialogVisible: false,
                dl_loading:false,
                loading2: true,
                url:process.env.VUE_APP_IFRAME_URL,
                users: [
                    {
                        name: '管理员',
                        username: 'admin',
                        password: 'admin'
                    },
                    {
                        name: '编辑',
                        username: 'editor',
                        password: 'editor'
                    },
                    {
                        name: '用户1',
                        username: 'user1',
                        password: 'user1'
                    }
                ],
                // 表单
                formLogin: {
                    username: '',
                    password: '',
                    language:'zh',
                    code: 'v9am',
                    macdata:''
                },
                user_form: {
                  id:'',
                  only_id: '',
                  member_id: '',
                  department_id: '',
                  name: '',
                  tel: '',
                  password: 'Ak0808',
                  fax: '',
                  username: '',
                  email: '',
                  role_id: '',
                  sex: '',
                  user_type: '',
                  grade: '',
                  status: '',
                },
                // 校验
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                }
            }
        },
        created(){
            util.cookies.set('token', '');
            util.cookies.remove('token');
            console.log('------remove token------');
            let that=this
            document.onkeydown = function(e) {
              var key = window.event.keyCode;
              if (key == 13) {
                  that.submit()
              }
            }
            axios.get(process.env.VUE_APP_API+'api/v1/who')
                .then(function (response) {
                    if(response.data.code==0){
                        that.loading2=false
                    }else{
                        // that.loading2=false
                        $.ajax({
                            url: 'http://localhost:12345',
                            method:'get',
                            dataType: "jsonp",
                            success: function (response) {
                                    axios.get(process.env.VUE_APP_API+'api/v1/mac?data='+response.data)
                                        .then(function (res) {
                                            if(res.data.code==0){
                                                that.loading2=false
                                            }else{
                                                that.$message({
                                                    type: 'error',
                                                    message:res.data.msg,
                                                    duration:0
                                                });
                                            }
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });

                            },
                            error:function(){
                                that.loading2=true
                                that.$confirm('请运行tk.exe,如果没有tk.exe请点击确定下载(Please run tk.exe, if there is no tk.exe, please click OK to download)','提示', {
                                    confirmButtonText: 'OK',
                                    showCancelButton:false,
                                    showClose:false,
                                    closeOnClickModal:false
                                }).then(() => {
                                    window.location='test.exe';
                                }).catch(() => {
                                    this.$message({
                                        type: 'info',
                                        message: '已取消删除'
                                    });
                                });
                            },
                            headers: {
                                "Version-Number":process.env.VUE_APP_Version
                            }
                        });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        mounted () {
            // 初始化例子插件
            particlesJS('login', config)
             iframe_logout.onload = function () {
                var iframe = document.getElementById('iframe_logout'); 
               iframe.contentWindow.postMessage('logout',process.env.VUE_APP_IFRAME_URL+'iframe_logout');
            }
        },
        beforeDestroy () {
            // 销毁 particlesJS
            // thanks https://github.com/d2-projects/d2-admin/issues/65
            // ref https://github.com/VincentGarreau/particles.js/issues/63
            if (pJSDom && pJSDom.length > 0) {
                pJSDom[0].pJS.fn.vendors.destroypJS()
                pJSDom = []
            }
        },
        methods: {
            ...mapActions('d2admin/account', [
                'login'
            ]),
            ...mapActions({
                internationSet: 'd2admin/internation/set'
            }),
            /**
             * @description 接收选择一个用户快速登录的事件
             * @param {Object} user 用户信息
             */
            handleUserBtnClick (user) {
                this.formLogin.username = user.username
                this.formLogin.password = user.password
                this.submit()
            },
            /**
             * @description 提交表单
             */
            // 提交登录信息
            submit () {
                let that=this
                that.dl_loading = true

                that.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        $.ajax({
                            url: 'http://localhost:12345',
                            method:'get',
                            dataType: "jsonp",
                            success: function (response) {
                                that.login({
                                    vm: that,
                                    username: that.formLogin.username,
                                    language:that.formLogin.language,
                                    password: that.formLogin.password,
                                    macdata:response.data
                                })
                                that.dl_loading = false
                            },
                            error:function () {
                                that.login({
                                    vm: that,
                                    username: that.formLogin.username,
                                    password: that.formLogin.password,
                                    language:that.formLogin.language,
                                })
                                that.dl_loading = false
                            },
                            headers: {
                                "Version-Number":process.env.VUE_APP_Version
                            }
                        });

                    } else {
                        // 登录表单校验失败
                        that.$message.error('表单校验失败')
                    }
                })
            },
            save_password(){
                user_update(this.user_form.id, this.user_form).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                            message: 'success',
                            type: 'success'
                        });
                        this.formLogin.password=this.user_form.password
                        this.submit()
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

<style lang="scss">
  @import './style.scss';
  @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }

  .Rotation{
    -webkit-transform: rotate(360deg);
    animation: rotation 20s linear infinite;
    -moz-animation: rotation 20s linear infinite;
    -webkit-animation: rotation 20s linear infinite;
    -o-animation: rotation 20s linear infinite;
  }
  .page-login--content-footer-copyright {
    width: 100%;
    position: fixed;
    text-align: center;
    bottom: 20px;
    padding: 0px;
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: $color-text-normal;
  a {
    color: #66b1ff;
  }
  }
</style>
