<template>
    <div style="display: inline-block;">
        <div>
            <el-button type="primary" size="mini" @click="add_search">{{$t('Add_search')}}</el-button>
            <el-select
                    v-model="search_one"
                    clearable
                    filterable
                    size="mini"
                    style="width: 130px;margin:2px;"
                    placeholder="Please Select"
                    @change="change_search_one"
            >
                <el-option v-for="(i,key,index) in menu" :key="index" :label="language=='zh'||language=='cn'?i.name_cn:i.name"
                           :value="key"></el-option>
            </el-select>
            <el-select
                    v-model="search_two"
                    clearable
                    filterable
                    size="mini"
                    style="width: 130px;margin:2px;"
                    placeholder="Please Select"
            >
                <el-option v-for="(i,key,index) in menu_two" :key="index" :label="i.sign"
                           :value="key"></el-option>
            </el-select>
            <el-select
                    v-if="show_menu_three&&!show_multiple"
                    v-model="search_content"
                    clearable
                    filterable
                    size="mini"
                    style="width: 200px;margin:2px;"
                    placeholder="Please Select"
            >
                <el-option v-for="(i,key,index) in menu_three" :key="index" :label="i[show_name]"
                           :value="i[value]"></el-option>
            </el-select>
            <el-select
                    v-if="show_menu_three&&show_multiple"
                    v-model="search_content"
                    multiple
                    clearable
                    filterable
                    size="mini"
                    style="width: 200px;margin:2px;"
                    placeholder="Please Select"
            >
                <el-option v-for="(i,key,index) in menu_three" :key="index" :label="i[show_name]"
                           :value="i[value]"></el-option>
            </el-select>
            <span  v-if="!show_menu_three">
                    <el-date-picker
                            v-if="show_time"
                            v-model="search_content"
                            size="mini"
                            style="width: 130px;margin-left:2px;"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                    ></el-date-picker>
                     <el-date-picker
                             v-if="show_time_double"
                             v-model="search_content"
                             type="daterange"
                             unlink-panels
                             size="mini"
                             range-separator="至"
                             start-placeholder="开始日期"
                             end-placeholder="结束日期"
                             value-format="yyyy-MM-dd"
                             format="yyyy-MM-dd">
                     </el-date-picker>
                    <el-input
                            v-if="show_input"
                            v-model="search_content"
                            style="width: 155px;margin:2px;"
                            size="mini"
                            clearable
                    ></el-input>
            </span>
            <span id="buttons"></span>
            <span  v-for="(item,key,index) in buttons"  :key="index">
                <el-button
                        v-if="permission_names[item.form.api.name]==item.form.api.name&&item.form.click=='search_click'"
                        class="search_button d2-ml-5"
                        type="primary"
                        size="mini"
                        @click="search_click(item.form.api)"
                        :loading="loading_search"
                >{{item.name}}</el-button>
                 <el-button
                         v-if="permission_names[item.form.api.name]==item.form.api.name&&item.form.click=='export_click'"
                         class="search_button d2-ml-5"
                         type="primary"
                         size="mini"
                         @click="export_click(item.form.api)"
                         :loading="loading_export"
                 >{{item.name}}</el-button>
            </span>
            <a :href="export_url" ref="export_url" hidden></a>
        </div>
        <div class="d2-mt-5">
            <span v-if="all_search.length>0">{{$t('Search_criteria')}}：</span>
            <el-tag
                    v-for="(item,key,index) in all_search"
                    :key="index"
                    closable
                    @close="handleClose(key)"
                    class="d2-mr-5"
            >
                {{item.name}}
            </el-tag>
        </div>
    </div>
</template>

<script>
    import {
        recentio_search2,
    } from "@/api/Inquery";
    import request from '@/plugin/axios'
    import util from "@/libs/util";
    import $ from 'jquery'
    export default {
        name: "",
        data() {
            return {
                permission_names:JSON.parse(localStorage.getItem("permission_names")),
                language:'',
                search_one: '',
                search_two: '',
                search_content: '',
                menu:{},
                buttons:{},
                list_data:[],
                menu_two: {},
                menu_three: {},
                all_search: {},
                show_time: false,
                show_time_double: false,
                show_menu_three: false,
                show_input:false,
                show_multiple:false,
                show_name:'',
                value:'',
                export_url:'',
                loading_search:false,
                loading_export:false,
            }
        },
        mounted() {
            this.fetchData()
        },
        methods: {
            fetchData(){
                let that=this
                this.language=util.cookies.get('language')
                let obj={
                    language:util.cookies.get('language')
                }
                recentio_search2(obj).then(res=> {
                    that.menu = res.data.form
                    that.buttons= res.data.button
                })
            },
            add_search() {
                let that = this
                let search_one=that.search_one
                if (that.search_one && that.search_two && that.search_content) {
                    if (that.show_menu_three) {
                        that.all_search[search_one]={
                            'op':that.search_two,
                            'value':that.search_content,
                            'name':(that.language=='zh'||'cn'?that.menu[that.search_one].name_cn:that.menu[that.search_one].name)+that.menu_two[that.search_two].sign+that.search_content
                        }
                    } else {
                        that.all_search[search_one]={
                            'op':that.search_two,
                            'value':that.search_content,
                            'name':(that.language=='zh'||'cn'?that.menu[that.search_one].name_cn:that.menu[that.search_one].name)+that.menu_two[that.search_two].sign+that.search_content
                        }
                    }
                    console.log(that.all_search)
                    that.$emit('search',JSON.stringify(that.all_search))
                    that.search_one = ''
                    that.search_two = ''
                    that.search_content = ''
                    that.show_time = false
                } else {
                    that.$message({
                        message: '请填写搜索条件',
                        type: 'error'
                    });
                }
            },
            change_search_one() {
                this.search_two=''
                this.search_content=''
                if(this.menu[this.search_one].form.label=='select'){
                    if(this.menu[this.search_one].form.mulit){
                        this.show_multiple=true
                        this.search_content=this.menu[this.search_one].form.selected
                    }else{
                        this.show_multiple=false
                    }
                    this.show_menu_three=true
                    this.menu_two = this.menu[this.search_one].condition.value
                    this.search_two = this.menu[this.search_one].condition.default
                    if(this.menu[this.search_one].form.option.list){
                        this.menu_three =this.GEnums[this.menu[this.search_one].form.option.list]
                        this.show_name=this.menu[this.search_one].form.option.show
                        this.value=this.menu[this.search_one].form.option.value
                    }else if(this.menu[this.search_one].form.option.api){
                        this.show_name=this.menu[this.search_one].form.option.show
                        this.value=this.menu[this.search_one].form.option.value
                        if(this.menu[this.search_one].form.option.api.methods[0]=='GET'){
                            request({
                                url: process.env.VUE_APP_IFRAME_URL+this.menu[this.search_one].form.option.api.uri,
                                method:this.menu[this.search_one].form.option.api.methods[0],
                                params: this.menu[this.search_one].form.option.api.params
                            }).then(res=>{
                                if(res && res.code == 0){
                                    this.menu_three=res.data
                                }
                            })
                        }else if(this.menu[this.search_one].form.option.api.methods[0]=='POST'){
                            request({
                                url: process.env.VUE_APP_IFRAME_URL+this.menu[this.search_one].form.option.api.uri,
                                method:this.menu[this.search_one].form.option.api.methods[0],
                                data:this.menu[this.search_one].form.option.api.params
                            }).then(res => {
                                if (res && res.code == 0) {
                                    this.menu_three=res.data
                                }
                            }).catch(rr=>{
                            })
                        }

                    }
                }else if(this.menu[this.search_one].form.label=='input'){
                    this.menu_two = this.menu[this.search_one].condition.value
                    this.search_two = this.menu[this.search_one].condition.default
                    this.show_menu_three=false
                    this.show_time=false
                    this.show_time_double=false
                    this.show_input=true
                }else{
                    this.menu_two = this.menu[this.search_one].condition.value
                    this.search_two = this.menu[this.search_one].condition.default
                    this.show_menu_three=false
                    this.show_input=false
                    if(this.menu[this.search_one].form.double){
                        this.show_time=false
                        this.show_time_double=true
                        this.search_content=this.menu[this.search_one].form.value
                    }else{
                        this.show_time=true
                        this.show_time_double=false
                        this.search_content=this.menu[this.search_one].form.value[0]

                    }
                }
            },
            handleClose(key) {
                delete this.all_search[key]
                this.$forceUpdate()
            },
            search_click(item){
                this.loading_search = true
                request({
                    url: process.env.VUE_APP_IFRAME_URL+item.uri,
                    method:item.methods[0],
                    data:this.all_search
                }).then(res => {
                    if (res && res.code == 0) {
                        this.list_data=res.data
                        this.loading_search = false
                    }
                }).catch(rr=>{
                    this.loading_search = false
                })
            },
            export_click(item){
                this.loading_export = true
                request({
                    url: process.env.VUE_APP_IFRAME_URL+item.uri,
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
            }
        }
    }

</script>

<style scoped>

</style>