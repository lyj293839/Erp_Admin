<template>
    <d2-container class="page">
        <el-row :gutter="12" style="">
            <el-col :span="4" v-for="(value, key, index) in lists" :key="index" class="d2-text-center">
                <el-card shadow="hover" class="d2-m-5" >
                    <router-link :to="key">
                        <img :src="'image/module/'+key+'.png'" class="image" style="height: 60px;width: 60px;">
                        <div class="title">{{value.name}}</div>
                    </router-link>
                </el-card>
            </el-col>
            <el-col :span="4"  class="d2-text-center">
                <el-card shadow="hover" class="d2-m-5" >
                    <router-link to="rate">
                        <img src="image/module/rate.png" class="image" style="height: 60px;width: 60px;">
                        <div class="title">汇率</div>
                    </router-link>
                </el-card>
            </el-col>
        </el-row>
    </d2-container>
</template>

<script>
    import {
        enum_lists
    } from '@/api/Enum';
    export default {
        data() {
            return {
             lists:[]
            }
        },
        created(){
            this.fetchData()
        },
        methods:{
            fetchData(){
                enum_lists().then(res => {
                    this.lists = res.data;
                })
            },
        },
        computed: {

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
        width: 70px!important;
        heigth:70px!important;
    }
    .title{
        color: #333;
    }
    }
</style>
