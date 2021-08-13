<style lang="scss" scoped type="text/scss">
    /deep/.el-select__tags-text {
        display: inline-block;
        max-width: 265px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    /deep/.el-select .el-tag__close.el-icon-close {
        top: -7px;
    }
</style>
<template>
    <div v-if="!form_type" style="display: inline-block;">
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
                <el-option v-for="(i,key,index) in menu" :key="index"
                           :label="language=='zh'||language=='cn'?i.name_cn:i.name"
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
                    style="width: 300px;margin:2px;"
                    placeholder="Please Select"
            >
                <el-option  v-for="(i,key,index) in menu_three" :key="index" :label="i[show_name]"
                           :value="i[value]" ></el-option>
            </el-select>
            <span v-if="!show_menu_three">
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
            <span v-for="(item,key,index) in buttons" :key="index">
                <el-button
                        v-if="item.form.click=='search_click'"
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
            >{{item.name}}
            </el-tag>
        </div>
    </div>
    <div v-else>
        <span v-for="(i,key,index) in menu" :key="index">
            <span v-if="i.form.label=='select'&&!i.form.mulit">
                 <el-select
                         v-if="Object.keys(i.condition.value).length>1"
                         v-model="all_search[key].op"
                         clearable
                         filterable
                         size="mini"
                         style="width: 130px;margin:2px;"
                         placeholder="Please Select"
                         @input="changeInput($event)"
                 >
                  <el-option v-for="(m,key,index) in i.condition.value" :key="index" :label="m.sign"
                             :value="key"></el-option>
                 </el-select>
                 <el-select
                         v-model="all_search[key].value"
                         clearable
                         filterable
                         size="mini"
                         style="width: 200px;margin:2px;"
                         placeholder="Please Select"
                         @input="changeInput($event)"
                         :hidden="i.form.hidden"
                 >
                <el-option v-for="(i,key,index) in i.form.select_lists" :key="index" :label="i[show_name]"
                           :value="i[value]"></el-option>
            </el-select>
            </span>
            <span v-if="i.form.label=='select'&&i.form.mulit">
                 <el-select
                         v-if="Object.keys(i.condition.value).length>1"
                         v-model="all_search[key].op"
                         clearable
                         filterable
                         size="mini"
                         style="width: 130px;margin:2px;"
                         placeholder="Please Select"
                         @input="changeInput($event)"
                 >
                  <el-option v-for="(m,key,index) in i.condition.value" :key="index" :label="m.sign"
                             :value="key"></el-option>
                 </el-select>
                <el-select
                        v-model="all_search[key].value"
                        multiple
                        clearable
                        filterable
                        size="mini"
                        style="margin:2px;min-width: 200px;"
                        placeholder="Please Select"
                        @input="changeInput($event)"
                        :hidden="i.form.hidden"
                >
                    <el-option v-for="(i,key,index) in i.form.select_lists" :key="index"  :label="i[show_name]"
                               :value="i[value]"></el-option>
                </el-select>
            </span>
            <span v-if="i.form.label=='input'">
                 <el-select
                         v-if="Object.keys(i.condition.value).length>1"
                        v-model="all_search[key].op"
                        clearable
                        filterable
                        size="mini"
                        style="width: 130px;margin:2px;"
                        placeholder="Please Select"
                        @input="changeInput($event)"
                >
                  <el-option v-for="(m,key,index) in i.condition.value" :key="index" :label="m.sign"
                           :value="key"></el-option>
                 </el-select>
                 <el-input
                         v-model="all_search[key].value"
                         :placeholder="i[language_name]"
                         style="width: 155px;margin:2px;"
                         size="mini"
                         @input="changeInput($event)"
                         clearable
                         :hidden="i.form.hidden"
                 ></el-input>
            </span>

             <span v-if="i.form.label!='select'&&i.form.label!='input'">
                <el-date-picker
                        v-if="!i.form.double"
                        v-model="search_content"
                        size="mini"
                        style="width: 130px;margin-left:2px;"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        @input="changeInput($event)"
                ></el-date-picker>
                 <span v-if="i.form.double">
                     <el-date-picker
                             v-model="all_search[key].value[0]"
                             size="mini"
                             style="width: 130px;margin-left:2px;padding-left: 10px;padding-right: 10px;"
                             type="date"
                             value-format="yyyy-MM-dd"
                             format="yyyy-MM-dd"
                             @input="changeInput($event)"
                     ></el-date-picker>
                     <span>至</span>
                     <el-date-picker
                             v-model="all_search[key].value[1]"
                             size="mini"
                             style="width: 130px;margin-left:2px;padding-left: 10px;"
                             type="date"
                             value-format="yyyy-MM-dd"
                             format="yyyy-MM-dd"
                             @input="changeInput($event)"
                     ></el-date-picker>
                 </span>
            </span>
        </span>
        <span v-for="(item,key,index) in buttons" :key="index">
                <el-button
                        v-if="item.form.click=='search_click'"
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
</template>

<script>
    import {
        recentio_search,
    } from "@/api/Inquery";
    import request from '@/plugin/axios'
    import util from "@/libs/util";
    import $ from 'jquery'

    export default {
        name: "",
        data() {
            return {
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                language: '',
                search_one: '',
                search_two: '',
                search_content: '',
                menu: {},
                buttons: {},
                list_data: [],
                menu_two: {},
                menu_three: {},
                all_search: {},
                show_time: false,
                show_time_double: false,
                show_menu_three: false,
                show_input: false,
                show_multiple: false,
                show_name: '',
                value: '',
                export_url: '',
                loading_search: false,
                loading_export: false,
                form_type: false,
                language_name:'name_cn',
                minWidth:'200'
            }
        },
        props: ['api','id','per_page'],
        mounted() {
            this.fetchData()
        },
        methods: {
            // setMinWidth (val) {
            //     this.minWidth = val.srcElement.clientWidth
            // },
            changeInput(e) {
                this.$forceUpdate();
            },
            fetchData() {
                let that = this
                that.language=util.cookies.get('language')
                if(that.language=='zh'||that.language=='cn'){
                    that.language_name='name_cn'
                }else{
                    that.language_name='name'
                }
                if(that.id){
                    that.api_=that.api + '&language=' + util.cookies.get('language')
                }else{
                    that.api_=that.api + '?language=' + util.cookies.get('language')
                }
                $.ajax({
                    url: process.env.VUE_APP_API + that.api_,
                    method: 'get',
                    success: function (res) {
                        // res.data.form_type=''
                        if(res.data.form_type && res.data.form_type == 'horizontal') {
                            that.form_type = true
                            for (var key in res.data.form) {
                                if(res.data.form[key].condition.default){
                                    that.all_search[key]={
                                        'op':res.data.form[key].condition.default,
                                        'dataType':res.data.form[key].form.dataType?res.data.form[key].form.dataType:'',
                                        'value':res.data.form[key].form.value?res.data.form[key].form.value:'',
                                    }
                                }else{
                                    that.all_search[key]={
                                        'op':'',
                                        'dataType':res.data.form[key].form.dataType?res.data.form[key].form.dataType:'',
                                        'value':res.data.form[key].form.value?res.data.form[key].form.value:'',
                                    }
                                }
                                if(res.data.form[key].form.mulit){
                                    if(res.data.form[key].condition.default) {
                                        that.all_search[key] = {
                                            'op': res.data.form[key].condition.default,
                                            'dataType':res.data.form[key].form.dataType?res.data.form[key].form.dataType:'',
                                            'value': res.data.form[key].form.selected,
                                        }
                                    }else{
                                        that.all_search[key] = {
                                            'op': '',
                                            'dataType':res.data.form[key].form.dataType?res.data.form[key].form.dataType:'',
                                            'value': res.data.form[key].form.selected,
                                        }
                                    }
                                }
                                if(res.data.form[key].form.label=='select'&&res.data.form[key].form.option.list){
                                    that.show_name=res.data.form[key].form.option.show
                                    that.value=res.data.form[key].form.option.value
                                    res.data.form[key].form.select_lists=that.GEnums[res.data.form[key].form.option.list]
                                }else if(res.data.form[key].form.label=='select'&&res.data.form[key].form.option.api){
                                    if(res.data.form[key].option.api.methods[0]=='GET'){
                                        request({
                                            url: process.env.VUE_APP_API+res.data.form[key].option.api.uri,
                                            method:res.data.form[key].option.api.methods[0],
                                            params: res.data.form[key].option.api.params
                                        }).then(res=>{
                                            if(res && res.code == 0){
                                                res.data.form[key].form.select_lists=res.data
                                            }
                                        })
                                    }else if(res.data.form[key].option.api.methods[0]=='POST'){
                                        request({
                                            url: process.env.VUE_APP_API+res.data.form[key].option.api.uri,
                                            method:res.data.form[key].option.api.methods[0],
                                            data:res.data.form[key].option.api.params
                                        }).then(res => {
                                            if (res && res.code == 0) {
                                                res.data.form[key].form.select_lists=res.data
                                            }
                                        }).catch(rr=>{
                                        })
                                    }
                                }
                            }
                        }else{
                            for (var key in res.data.form) {
                                if(!res.data.form[key].form.hidden){
                                    if(res.data.form[key].form.value||res.data.form[key].form.value===0){
                                        that.all_search[key]={
                                            'op':res.data.form[key].condition.default,
                                            'value':res.data.form[key].form.value?res.data.form[key].form.value:'',
                                            'dataType':res.data.form[key].form.dataType?res.data.form[key].form.dataType:'',
                                            'name': (that.language == 'zh' || 'cn' ? res.data.form[key].name_cn : res.data.form[key].name) + res.data.form[key].condition.default +res.data.form[key].form.value
                                        }
                                    }
                                    if(res.data.form[key].form.mulit){
                                        if(res.data.form[key].form.selected) {
                                            that.all_search[key] = {
                                                'op': res.data.form[key].condition.default?res.data.form[key].condition.default:'',
                                                'value': res.data.form[key].form.selected,
                                                'dataType':res.data.form[key].form.dataType?res.data.form[key].form.dataType:'',
                                                'name': (that.language == 'zh' || 'cn' ? res.data.form[key].name_cn : res.data.form[key].name) + res.data.form[key].condition.default +res.data.form[key].form.selected
                                            }
                                        }
                                    }
                                }
                                console.log(that.all_search)
                            }
                        }
                        that.menu = res.data.form
                        that.buttons = res.data.button
                        for(var key in that.buttons){
                            if(that.buttons[key].form.done){
                                that.search_click(that.buttons[key].form.api)
                            }
                        }
                    },
                    error: function () {
                    },
                    headers: {
                        "Version-Number":process.env.VUE_APP_Version
                    }
                });
                // recentio_search(obj).then(res=> {
                //     that.menu = res.data.form
                //     that.buttons= res.data.button
                //
                // })
            },
            add_search(search) {
                let that = this
                let search_one = that.search_one
                console.log(that.menu_three)
                console.log(that.search_content)
                if (that.search_one && that.search_two && that.search_content) {
                    if (that.show_menu_three) {
                        if(that.search_content.length>1){
                            let name='';
                            that.search_content.forEach((items,index)=>{
                               name+=that.menu_three.filter((item) => { return item.id==items})[0][that.show_name]+';'
                            })
                            that.all_search[search_one] = {
                                'op': that.search_two,
                                'value': that.search_content,
                                'dataType':that.menu[that.search_one].form.dataType?that.menu[that.search_one].form.dataType:'',
                                'name': (that.language == 'zh' || 'cn' ? that.menu[that.search_one].name_cn : that.menu[that.search_one].name) + that.menu_two[that.search_two].sign + name
                            }
                        }else{
                            that.all_search[search_one] = {
                                'op': that.search_two,
                                'value': that.search_content,
                                'dataType':that.menu[that.search_one].form.dataType?that.menu[that.search_one].form.dataType:'',
                                'name': (that.language == 'zh' || 'cn' ? that.menu[that.search_one].name_cn : that.menu[that.search_one].name) + that.menu_two[that.search_two].sign + that.menu_three.filter((item) => { return item.id==that.search_content})[0][that.show_name]
                            }
                        }
                    } else {
                        that.all_search[search_one] = {
                            'op': that.search_two,
                            'value': that.search_content,
                            'dataType':that.menu[that.search_one].form.dataType?that.menu[that.search_one].form.dataType:'',
                            'name': (that.language == 'zh' || 'cn' ? that.menu[that.search_one].name_cn : that.menu[that.search_one].name) + that.menu_two[that.search_two].sign + that.search_content
                        }
                    }
                    console.log(that.all_search)
                    that.$emit('search', JSON.stringify(that.all_search))
                    that.search_one = ''
                    that.search_two = ''
                    that.search_content = ''
                    that.show_time = false
                } else {
                    if(search!='search'){
                        that.$message({
                            message: '请填写搜索条件',
                            type: 'error'
                        });
                    }
                }
            },
            change_search_one() {
                this.search_two = ''
                this.search_content = ''
                if (this.menu[this.search_one].form.label == 'select') {
                    if (this.menu[this.search_one].form.mulit) {
                        this.show_multiple = true
                        this.search_content = this.menu[this.search_one].form.selected
                    } else {
                        this.show_multiple = false
                    }
                    this.show_menu_three = true
                    this.menu_two = this.menu[this.search_one].condition.value
                    this.search_two = this.menu[this.search_one].condition.default
                    if (this.menu[this.search_one].form.option.list) {
                        this.menu_three = this.GEnums[this.menu[this.search_one].form.option.list]
                        this.show_name = this.menu[this.search_one].form.option.show
                        this.value = this.menu[this.search_one].form.option.value
                    } else if (this.menu[this.search_one].form.option.api) {
                        this.show_name = this.menu[this.search_one].form.option.show
                        this.value = this.menu[this.search_one].form.option.value
                        if (this.menu[this.search_one].form.option.api.methods[0] == 'GET') {
                            request({
                                url: process.env.VUE_APP_API + this.menu[this.search_one].form.option.api.uri,
                                method: this.menu[this.search_one].form.option.api.methods[0],
                                params: this.menu[this.search_one].form.option.api.params
                            }).then(res => {
                                if (res && res.code == 0) {
                                    this.menu_three = res.data
                                }
                            })
                        } else if (this.menu[this.search_one].form.option.api.methods[0] == 'POST') {
                            request({
                                url: process.env.VUE_APP_API + this.menu[this.search_one].form.option.api.uri,
                                method: this.menu[this.search_one].form.option.api.methods[0],
                                data: this.menu[this.search_one].form.option.api.params
                            }).then(res => {
                                if (res && res.code == 0) {
                                    this.menu_three = res.data
                                }
                            }).catch(rr => {
                            })
                        }

                    }
                } else if (this.menu[this.search_one].form.label == 'input') {
                    this.menu_two = this.menu[this.search_one].condition.value
                    this.search_two = this.menu[this.search_one].condition.default
                    this.show_menu_three = false
                    this.show_time = false
                    this.show_time_double = false
                    this.show_input = true
                } else {
                    this.menu_two = this.menu[this.search_one].condition.value
                    this.search_two = this.menu[this.search_one].condition.default
                    this.show_menu_three = false
                    this.show_input = false
                    if (this.menu[this.search_one].form.double) {
                        this.show_time = false
                        this.show_time_double = true
                        this.search_content = this.menu[this.search_one].form.value
                    } else {
                        this.show_time = true
                        this.show_time_double = false
                        this.search_content = this.menu[this.search_one].form.value[0]
                    }
                }
            },
            handleClose(key) {
                delete this.all_search[key]
                this.$forceUpdate()
            },
            search_click(item) {
                if(!this.form_type){
                    this.add_search('search')
                }
                let obj={
                    url:item.uri,
                    method:item.methods[0],
                    params:this.all_search,
                }
                this.$emit('data', obj)
            },
            export_click(item) {
                this.loading_export = true
                request({
                    url: process.env.VUE_APP_API + item.uri,
                    method: 'post',
                    data: this.all_search
                }).then(res => {
                    if (res && res.code == 0) {
                        this.export_url = res.data
                        setTimeout(() => {
                            this.$refs.export_url.click()
                            this.loading_export = false
                        }, 200)
                    } else {
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