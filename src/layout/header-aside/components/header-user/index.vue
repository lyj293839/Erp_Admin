<template>
  <el-dropdown size="small" >
    <span class="btn-text">
      <d2-icon name="user" style="font-size: 16px;"/>
      {{name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        {{$i18n.locale=='cn'?'退出':'Sign out'}}
      </el-dropdown-item>
      <el-dropdown-item @click.native="edit">
        <d2-icon name="gear" class="d2-mr-5"/>
        {{$i18n.locale=='cn'?'修改账户信息':'Edit account information'}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import util from "@/libs/util";
export default {
    data () {
        return {
            dialogVisible:false,
            name:''
        }
    },
    created(){
        this.name = util.cookies.get('name');
    },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
      ...mapActions('d2admin/page', [
          'closeAll'
      ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        vm: this,
        confirm: true,
      })
      this.closeAll(this)
    },
    edit(){
        this.$router.push({
            path: "/User/edit_user.vue",
            name: "User-edit_user",
        });
    }
  }
}
</script>
