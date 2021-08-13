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
                <el-option v-for="(i,key,index) in menu" :key="index" :label="i.name"
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
                <el-option v-for="(i,key,index) in menu_two" :key="index" :label="i"
                           :value="key"></el-option>
            </el-select>
            <el-select
                    v-if="show_menu_three"
                    v-model="search_content"
                    clearable
                    filterable
                    size="mini"
                    style="width: 130px;margin:2px;"
                    placeholder="Please Select"
            >
                <el-option v-for="(i,key,index) in menu_three" :key="index" :label="i"
                           :value="key"></el-option>
            </el-select>
            <span v-else>
                    <el-date-picker
                            v-if="show_time"
                            v-model="search_content"
                            size="mini"
                            style="width: 130px;margin-left:2px;"
                            type="date"
                            value-format="yyyy-MM-dd"
                            format="yyyy-MM-dd"
                    ></el-date-picker>
                    <el-input
                            v-else
                            v-model="search_content"
                            style="width: 155px;margin:2px;"
                            size="mini"
                            clearable
                    ></el-input>
                        </span>
        </div>
        <div class="d2-mt-5">
            <span v-if="all_search.length>0">{{$t('Search_criteria')}}：</span>
            <el-tag
                    v-for="(item,index) in all_search"
                    :key="index"
                    closable
                    @close="handleClose(item)"
                    class="d2-mr-5"
                    >
                {{item.name}}
            </el-tag>
        </div>
    </div>
</template>

<script>
    import {
        search_menu,
    } from "@/api/Inquery";
    import util from "@/libs/util";
    export default {
        name: "",
        data() {
            return {
                search_one: '',
                search_two: '',
                search_content: '',
                menu:{},
                menu_two: {},
                menu_three: {},
                all_search: [],
                show_time: false,
                show_menu_three: false
            }
        },
        props: ['cookie'],
        created() {
            if(localStorage.getItem(this.cookie)){
                this.all_search = JSON.parse(localStorage.getItem(this.cookie))
            }
            let obj={
                language:util.cookies.get('language')
            }
            search_menu(obj).then(res=> {
              this.menu = res.data
            })
        },
        mounted(){
            this.$on('refresh', ()=>{
                if(localStorage.getItem(this.cookie)){
                    this.all_search = JSON.parse(localStorage.getItem(this.cookie))
                }
                let obj={
                    language:util.cookies.get('language')
                }
                search_menu(obj).then(res=> {
                    this.menu = res.data
                })
            })
        },
        methods: {

            add_search() {
                let that = this
                if (that.search_one && that.search_two && that.search_content) {
                    if (that.show_menu_three) {
                        that.all_search.push({
                            search_one: that.search_one,
                            search_two: that.search_two,
                            search_content: that.search_content,
                            name: that.menu[that.search_one].name + that.menu_two[that.search_two] + that.menu_three[that.search_content]
                        })
                    } else {
                        that.all_search.push({
                            search_one: that.search_one,
                            search_two: that.search_two,
                            search_content: that.search_content,
                            name: that.menu[that.search_one].name + that.menu_two[that.search_two] + that.search_content
                        })
                    }
                    that.search_one = ''
                    that.search_two = ''
                    that.search_content = ''
                    that.show_time = false
                    localStorage.setItem(that.cookie, JSON.stringify(that.all_search))
                } else {
                    that.$message({
                        message: '请填写搜索条件',
                        type: 'error'
                    });
                }
            },
            change_search_one() {
                this.search_two = ''
                this.search_content = ''
                if (this.search_one === 'createtime' || this.search_one === 'created_at') {
                    this.show_time = true
                } else {
                    this.show_time = false
                }
                if (this.menu[this.search_one].value) {
                    this.show_time = false
                    this.show_menu_three = true
                    this.menu_three = this.menu[this.search_one].value
                } else {
                    this.show_menu_three = false
                }
                this.menu_two = this.menu[this.search_one].con
                for (var key in this.menu_two) {
                    this.search_two = key
                    return this.search_two;
                }
            },
            handleClose(item) {
                this.all_search.splice(this.all_search.indexOf(item), 1);
                localStorage.setItem(this.cookie, JSON.stringify(this.all_search))
                this.$forceUpdate()
            },
            refresh(){
                this.all_search = JSON.parse(localStorage.getItem(this.cookie))
            }
        }
    }
</script>

<style scoped>

</style>