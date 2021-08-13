<template>
    <d2-container>
   <iframe   :src="url+'currentaccount'" style="width:100%;height:100%;frameborder=no" frameborder="no" border="0" marginWidth=0 marginHeight=0></iframe>
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
    created(){
    }
}
</script>



