<template>
    <el-select :value="valueTitle" @change="chooseCustom" clearable @clear="clearHandle" size="mini" ref="multiSelect">
        <el-option :value="valueTitle" :label="valueTitle">
            <el-tree
                    accordion
                    ref="selectTree"
                    :data="options"
                    :props="defaultProps"
                    :node-key="defaultProps.value"
                    :default-expanded-keys="defaultExpandedKey"
                    @node-click="handleNodeClick">
            </el-tree>
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "el-tree-select",
//         props: ['options', 'defaultProps', 'value'],
        props:{
            value:{
                default: ()=>{
                    return null
                }
            },
            options:{
                type: Array,        // 必须是树形结构的对象数组
                default: ()=>{
                    return []
                }
            },
            defaultProps:{
                type: Object,
                default:()=>{
                    return {
                        value:'only_id',             // ID字段名
                        label: 'name',         // 显示名称
                        children: 'children'    // 子级字段名
                    }
                }
            }
        },
        data() {
            return {
                valueId:this.value,    // 初始值
                valueTitle:'',
                defaultExpandedKey:[]
            }
        },
        mounted(){
            this.initHandle()
        },
        methods: {
            // 初始化值
            initHandle(){
                console.log(this.value);
                if(this.value){
                    this.valueTitle = this.$refs.selectTree.getNode(this.value).data.name     // 初始化显示
                    this.$refs.selectTree.setCurrentKey(this.value)       // 设置默认选中
                    this.defaultExpandedKey = [this.value]      // 设置默认展开
                }
            },
            // 切换选项
            handleNodeClick(node){
                this.valueTitle = node[this.defaultProps.label]
                this.valueId = node[this.defaultProps.value]
                this.chooseCustom()
                this.$emit('getValue',this.valueId)
                this.defaultExpandedKey = []
            },
            // 清除选中
            clearHandle(){
                this.valueTitle = ''
                this.valueId = null
                this.defaultExpandedKey = []
                this.$refs.selectTree.setCurrentKey(null)       // 设置默认选中
                this.$emit('getValue',null)
            },
            chooseCustom(){
            //调用element-ui select组件blur方法
            //要包再timeout里面，直接调用不会关闭下拉框option
                setTimeout(() => {
                    this.$refs.multiSelect.blur()
                }, 50)
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-scrollbar .el-scrollbar__view .el-select-dropdown__item{
        height: auto;
        padding: 0;
    }
    .el-select-dropdown__item.selected{
        font-weight: normal;
    }
    ul li >>>.el-tree .el-tree-node__content{
        height:auto;
    }
    .el-tree-node__label{
        font-weight: normal;
    }
    .el-tree >>>.is-current .el-tree-node__label{
        color: #409EFF;
        font-weight: 700;
    }
    .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
        color:#606266;
        font-weight: normal;
    }
</style>