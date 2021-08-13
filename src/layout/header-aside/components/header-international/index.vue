<template>
    <el-dropdown placement="bottom" size="small" @command="handleChange">
        <el-button class="d2-mr btn-text can-hover" type="text">
            <d2-icon name="language" style="font-size: 16px;"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="cn">
                <d2-icon :name="iconName('cn')"  class="d2-mr-5"/>中文
            </el-dropdown-item>
            <el-dropdown-item command="en">
                <d2-icon :name="iconName('en')" class="d2-mr-5"/>英文
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
        name: 'd2-header-international',
        computed: {
            ...mapState('d2admin/internation', [
                'value'
            ])
        },
        watch: {
            // 注意 这里是关键
            // 因为需要访问 this.$ELEMENT 所以只能在这里使用这种方式
            value: {
                handler (val) {
                    if (this.$ELEMENT.internation !== val) {
                        // 设置 element 全局尺寸
                        this.$ELEMENT.internation = val
                        // 清空缓存设置
                        this.pageKeepAliveClean()
                        // 刷新此页面
                        this.$router.replace('/refresh')
                    }
                },
                immediate: true
            }
        },
        methods: {
            ...mapMutations({
                pageKeepAliveClean: 'd2admin/page/keepAliveClean'
            }),
            ...mapActions({
                internationSet: 'd2admin/internation/set'
            }),
            handleChange (value) {
                let locale = this.$i18n.locale
                locale === 'cn' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'cn'
                if(value=='cn'){
                    this.$i18n.locale = 'cn'
                }else{
                    this.$i18n.locale = 'en'
                }
                // LangStorage.setLang(this.$i18n.locale) //后面会用做切换和将用户习惯存储到本地浏览器
                this.internationSet(value)
            },
            iconName (name) {
                return name === this.value ? 'dot-circle-o' : 'circle-o'
            }
        }
    }
</script>
