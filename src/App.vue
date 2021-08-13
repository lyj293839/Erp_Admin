<template>
  <div id="app">
    <router-view/>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
export default {
  name: 'app',
    data() {
        return {}
    },
    created() {
        // localStorage.setItem('permissions','')
    },
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';
  .el-card__body{padding: 5px 10px !important;}
  .el-cascader__dropdown .el-scrollbar{
    height: 200px;
}
  .el-button--mini, .el-button--mini.is-round {
    padding: 7px 10px!important;
  }
   .red{
     color: red;
   }
  .green{
    color: green;
  }
  .d2-text-center{
    text-align: center;
  }
  .search_button{
    vertical-align: top;
    margin-top: 2px!important;
  }
  .el-pagination {
    text-align: right;
    margin-top:10px;
  }
  .el-form{
    background-color: #fff;
  }
  body .el-table th.gutter{
    display: table-cell!important;
  }
  input::-webkit-input-placeholder {
    color: rgb(108, 108, 109)!important;
  }
  input::-moz-input-placeholder {
    color: rgb(108, 108, 109)!important;
  }
  input::-ms-input-placeholder {
    color: rgb(108, 108, 109)!important;
  }
  table th{
    color: black!important;
    font-weight: bold!important;
  }
  table td{
    color: black!important;
  }
  .el-select-dropdown__wrap{
      max-height: 500px !important;
    }
  .select_height .el-select-dropdown__wrap{
      max-height: 300px !important;
    }
</style>
