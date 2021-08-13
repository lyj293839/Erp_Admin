<template>
    <d2-container>
        <div v-if="!dialogAdd">
            <Home  @getValue="getValue($event)" :cas="cas" @getId="getId($event)"></Home>
        </div>
        <div v-else>
            <Forms   @getValues="getValues($event)" :id="id"></Forms>
        </div>
    </d2-container>
</template>
<script>
import {
  destroy
} from '@/api/prod'
import Home from '../components/index_notice'
import Forms from '../components/form'
export default {
  name: 'Prod-index_notice',
  components: {
    Home,
    Forms
  },
  data () {
    return {
      dialogAdd: false,
      id: '',
      cas:''
    }
  },
    watch: {
        $route(to, from) {
            if(this.$route.query.cas){
                this.cas=this.$route.query.cas
            }
        }
    },
  created () {
      if(this.$route.query.cas){
          this.cas=this.$route.query.cas
      }
  },
  methods: {
    getId (event) {
      //                alert(event)
      this.id = event
    },
    getValue (event) {
      this.dialogAdd = event
    },
    getValues (event) {
      this.dialogAdd = event
    },
    delete_customer (item) {
      destroy(item, 'customer', 'destory', this)
    },
    edit (item) {
      this.dialogAdd = true
      this.edit_refresh(item.id)
    }
  }
}
</script>
