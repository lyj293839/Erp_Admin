<template>
    <el-dropdown placement="bottom" @command="handleChange">
        <el-button  class="d2-mr btn-text can-hover" type="text">
            <!--{{ noticeNum ? noticeNum : "" }}-->
            <el-badge  :value="unread?unread:0" class="item">
                <d2-icon-svg  class="icon" name="notice"/>
            </el-badge>
            <!--<img style="width: 28px;height: 28px;" src="../../../../../dist/img/notice.png">-->
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <div class="menu">
                <div style="padding: 10px;">
                    <el-card v-for="(item,index) in notices" :key="index" class="box-card d2-mb-5">
                        <div @click="go(item)" style="cursor: pointer;">
                        <div slot="header" class="clearfix">
                            <div
                                 style="font-weight:bold;display: flex;flex-direction: row;justify-content: space-between;font-size: 14px;">
                                {{item.from_name}}({{item.created_at}})<i @click.stop="closer(item.id)" class="el-icon-close"
                                                                          style="margin-top: 4px;"></i></div>
                        </div>
                        <div class="text item">
                            <div style="padding: 5px 0;font-weight:bold;font-size: 14px;">{{ item.title }}</div>
                            <div style="padding: 5px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size: 14px;"
                                 v-html="item.description"></div>
                        </div>
                        </div>
                    </el-card>
                </div>
                <div style="text-align: right;padding: 0 10px;">
                    <el-link @click="watch_all">{{$i18n.locale=='cn'?'查看所有通知':'View all notifications'}}<i class="el-icon-view el-icon--right"></i></el-link>
                </div>
            </div>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import util from '@/libs/util'
import { latest, read } from '@/api/email_manage'
import Echo from 'laravel-echo'

window.io = require('socket.io-client')

export default {
  name: 'd2-header-size',
  data () {
    return {
      notices: [],
      unread:'',
      user_name:''
    }
  },
  created () {
    this.get_all()
    this.user_name=util.cookies.get('user_name')
  },
  mounted () {
    this.getWebSocket()
  },
  computed: {
    ...mapState('d2admin/size', ['value']),
    noticeNum: function () {
      return this.notices.length
    }
  },
  watch: {
    // 注意 这里是关键
    // 因为需要访问 this.$ELEMENT 所以只能在这里使用这种方式
    value: {
      handler (val) {
        if (this.$ELEMENT.size !== val) {
          // 设置 element 全局尺寸
          this.$ELEMENT.size = val
          // 清空缓存设置
          this.pageKeepAliveClean()
          // 刷新此页面
          this.$router.replace('/refresh')
        }
      },
      immediate: true
    }
    // notices($new, $old) {
    //     this.noticeShow()
    // }
  },
  methods: {
    ...mapMutations({
      pageKeepAliveClean: 'd2admin/page/keepAliveClean'
    }),
    ...mapActions({
      sizeSet: 'd2admin/size/set'
    }),
    handleChange (value) {
      this.sizeSet(value)
    },
    get_all () {
      latest().then(res => {
        this.notices = res.data
        this.unread = res.read.unread
      })
    },
    iconName (name) {
      return name === this.value ? 'dot-circle-o' : 'circle-o'
    },
    getWebSocket () {
      const token = util.cookies.get('token')
      const userId = util.cookies.get('user_id')
      const privateChannel = 'message.' + userId

      // new Echo({
      //   broadcaster: 'socket.io',
      //   host: process.env.VUE_APP_SOCKET_URL,
      //   auth: { headers: { Authorization: 'Bearer ' + token } }
      // }).channel('message').listen('Messages', e => {
      //   console.log(e.message)
      //   this.notices.unshift(e.message)
      //   this.noticeShow(e.message)
      // })
      new Echo({
        broadcaster: 'socket.io',
        host: process.env.VUE_APP_SOCKET_URL,
        auth: { headers: { Authorization: 'Bearer ' + token } }
      }).private(privateChannel).listen('Messages', e => {
        console.log(util.cookies.get('user_id'))
        console.log(e.message)
        this.notices.unshift(e.message)
        // this.noticeShow(e.message)
      })
    },
    noticeShow (obj) {
      let that = this
      that.$notify({
        title: `${obj.title}`,
        offset: 100,
        dangerouslyUseHTMLString: true,
        message: `<pre style="width: 300px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${obj.description}</pre>`,
        onClick: function () {
          that.$router.push({
            path: obj.url,
            query: obj.params
          })
        }
      })
    },
    go (obj) {
      this.notices.forEach((items, index) => {
        if (items.id == obj.id) {
          this.notices.splice(index, 1)
        }
      })
      read(obj.id)
      obj.params.flag=true
      this.$router.push({
        path: obj.url,
        query: obj.params
      })
    },
    closer (id) {
      this.notices.forEach((items, index) => {
        if (items.id == id) {
          this.notices.splice(index, 1)
        }
      })
      read(id)
    },
    watch_all () {
      this.$router.push({
        path: '/Set/notice',
        name: 'Set-notice'
      })
    }
  }
}
</script>
<style scoped>
    .icon {
        height: 15px;
        width: 15px;
        transition: all 0.3s;
        cursor: pointer;
    }

    /*.el-dropdown-menu{*/
    /*width: 350px;*/
    /*height: 500px;*/
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
    /*}*/
    .menu {
        width: 350px;
        height: 500px;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    /*/deep/.el-card__body {*/
    /*padding: 0!important;*/
    /*}*/
    /deep/.el-card__header {
        padding: 10px;
        border-bottom: 1px solid #ebeef5;
        box-sizing: border-box;
    }

</style>
