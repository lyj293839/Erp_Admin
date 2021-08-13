<template>
  <div>
    <el-tooltip
      effect="dark"
      content="更新日志"
      placement="bottom">
      <el-button
        class="d2-ml-0 d2-mr btn-text can-hover"
        type="text"
        @click="handleClick">
        <el-badge
          :max="99"
          :value="logLengthError"
          :is-dot="logLengthError === 0">
          <d2-icon
            :name="logLengthError === 0 ? 'dot-circle-o' : 'bug'"
            style="font-size: 20px"/>
        </el-badge>
        <!--<d2-icon-->
          <!--v-else-->
          <!--name="dot-circle-o"-->
          <!--style="font-size: 20px"/>-->
      </el-button>
    </el-tooltip>
    <el-dialog
      :fullscreen="true"
      :visible.sync="dialogVisible"
      :append-to-body="true">
      <iframe   :src="url+'log'" style="width:100%;height:100%;frameborder=no" frameborder="no" border="0" marginWidth=0 marginHeight=0></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      dialogVisible: false,
      url:process.env.VUE_APP_IFRAME_URL
    }
  },
  computed: {
    ...mapGetters('d2admin', {
      logLength: 'log/length',
      logLengthError: 'log/lengthError'
    }),
  },
  methods: {
    ...mapMutations('d2admin/log', [
      'clean'
    ]),
    handleClick () {
      // if (this.logLength > 0) {
        this.dialogVisible = true
      // }
    },
    handleLogClean () {
      this.dialogVisible = false
      this.clean()
    }
  }
}
</script>
<style scoped>
  /deep/.el-dialog__header {
    padding: 0;
  }
  /deep/.el-dialog__body {
    padding: 0;
    color: #606266;
    height: 700px;
  }
</style>
