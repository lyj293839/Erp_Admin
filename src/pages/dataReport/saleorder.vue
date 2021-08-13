<template>
    <d2-container>
        <search :api="api" @search="get_search"></search>
    </d2-container>
</template>

<script>
    import search from "@/components/search/index2";
    import request from '@/plugin/axios';
    export default {
        name: "dataReport-index",
        data() {
            return {
                all_search:'',
                loading_search:false,
                loading_export:false,
                export_url:'',
                api:'api/v1/recentio/statsaleorder/form'
            }
        },
        components: {
            search
        },
        methods: {
            exports(){
                this.loading_export = true
                request({
                    url: process.env.VUE_APP_IFRAME_URL+'api/v1/recentio_export',
                    method:'post',
                    data:this.all_search
                }).then(res=>{
                    if(res && res.code == 0){
                        this.export_url = res.data
                        setTimeout(() => {
                            this.$refs.export_url.click()
                            this.loading_export = false
                        }, 200)
                    }else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_export = false
                    }
                }).catch(rr => {
                    this.loading_export = false
                })
            },
            get_search(data){
               this.all_search = JSON.parse(JSON.stringify(data)).params
            }
        }
    }
</script>

<style scoped>

</style>