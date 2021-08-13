<template>
  <div class="d2-layout-header-aside-menu-side">
    <div>{{noticeNum}}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Echo from 'laravel-echo'
window.io = require('socket.io-client');




export default {
  name: 'header-websocket',
  mixins: [
  ],
  components: {
  },
  data () {
    return {
      notices : []
    }
  },
  computed: {
      noticeNum:function () {
          return this.notices.length
      }
  },
  watch: {
      notices($new,$old){
        this.noticeShow();
      }
  },
  mounted () {
      this.getWebSocket();
  },
  beforeDestroy () {

  },
  methods: {
      getWebSocket () {
          new Echo({
              broadcaster: 'socket.io',
              host: 'http://www.bm.pp:6001'
          }).channel('news').listen('News', (e) => {
              this.notices.push(e.message)
          });
      },
      noticeShow() {
          this.$message({
              message: '有新消息哦，请及时查看！',
              type: 'warning'
          });
      },

  }
}
</script>
<style lang="scss">

</style>
