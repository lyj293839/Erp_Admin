<style lang="scss" scoped type="text/scss">

</style>
<template>
<div>
    <div v-if="list.cust_id==55214&&list.push_log&&list.status>=1002&&list.push_log.lab_quote">
        <span v-if="list.push_log.push_status===1">
            <span style="color:green;">(已推送)</span><el-button size="mini" type="primary" @click="cancelPush_Outprice(list)">取消推送</el-button>
        </span>
        <span v-else-if="list.push_log.push_status===2">
            <span style="color:green;">(推送成功)</span>
        </span>
        <span v-else-if="list.push_log.push_status===3">
            <span style="color:#F56C6C;">(推送失败)</span>
        </span>
        <span v-else>
            <span style="color:#909399;">(未推送)</span> <el-button size="mini" class="d2-mt-5 d2-mb-5 w50" type="primary" @click="push_Outprice(list)">推送</el-button>
        </span>
    </div>
</div>
</template>

<script>
import {
        pushOutpriceToLanbo,
        cancelPushOutprice
    } from "@/api/Inquery";
    import $ from 'jquery'
    import util from "@/libs/util";
    export default {
        name: "",
        data() {
            return {

            }
        },
        props: ['list'],
        watch:{
            
        },
        created() {
            
        },
        methods: {
            push_Outprice(item){
                var obj = {
                    inquiry_id: item.id
                }
                pushOutpriceToLanbo(obj).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                        message: 'success',
                        type: 'success'
                        })
                        item.push_log.push_status = 1
                        this.$forceUpdate()
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            },
            cancelPush_Outprice(item){
                var obj = {
                    inquiry_id: item.id
                }
                cancelPushOutprice(obj,this).then(res => {
                    if (res && res.code == 0) {
                        this.$message({
                        message: 'success',
                        type: 'success'
                        })
                        item.push_log.push_status = 0
                        this.$forceUpdate()
                    } else {
                        this.$message({
                        message: res.msg,
                        type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            },
        }
    }
</script>

