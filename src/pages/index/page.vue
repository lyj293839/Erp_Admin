<template>
  <d2-container class="page">
    <iframe id='iframe1' :src="url+'login'" style="display:none;width:100%;frameborder=no" frameborder="no" border="0" marginWidth=0
			 marginHeight=0></iframe>
  </d2-container>
</template>

<script>
import util from '@/libs/util.js'
import Cookies from 'js-cookie'
export default {
    name: "",
    data() {
        return {
          url:process.env.VUE_APP_IFRAME_URL
        };
    },
    mounted(){
      iframe1.onload = function () {
        let  name= util.cookies.get('name')
        let  password= util.cookies.get('password')
        var frame = document.getElementById('iframe1'); 
        var data={
          username:name,
          password:password,
          type:'login'
        }
        frame.contentWindow.postMessage(data,process.env.VUE_APP_IFRAME_URL+'login');
      }
    },
    methods:{
     
    }
}

    
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__logo {
    width: 120px;
  }
  .image{
    width: 80px;
    heigth:80px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
