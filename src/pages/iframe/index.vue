<template>
  <d2-container class="page">
    <div class="content" style="position: absolute; top: 1.5rem; width: 100%; bottom: 0.8rem;">
			<iframe :src="'http://api.aikonchem.cn:8801/instore?page=3&session_id='+session_id" style="height: 100%;width:100%; frameborder=no" frameborder="no" border="0" marginWidth=0
			 marginHeight=0></iframe>
		</div>
  </d2-container>
</template>

<script>
import util from '@/libs/util.js'
import Cookies from 'js-cookie'
export default {
    name: "Set-iframe",
    data() {
        return {
           session_id: util.cookies.get('session_id')
        };
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
