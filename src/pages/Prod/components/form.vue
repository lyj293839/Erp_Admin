<style lang="scss" scoped type="text/scss">
    .bold {
        font-weight: bold;
    }

    .grey {
        color: grey;
    }

    .l_h {
        line-height: 1.5;
    }

    .l_h80 {
        line-height: 80px;
    }

    .el-pagination {
        text-align: right;
        margin: 10px;
    }

    .d2-text-center {
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }

    .border-right {
        border-right: 1px solid #f2f2f2;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 0;
        display: flex;
        /*justify-content: center;*/
        flex-wrap: wrap;
        padding: 0;
    }

    .options {
        justify-content: center;
    }

    .options div {
        width: 33%;
        text-align: center;
    }

    .item1 {
        margin-bottom: 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 0;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        /*width: 400px;*/
        width: 31%;
        margin: 10px 0;
        box-sizing: border-box;
    }

    .el-main {
        padding: 0;
    }

    .el-card__body {
        padding: 10px;
    }

    .basis {
        padding: 10px;
    }

    .basis .el-card__header {
        background-color: rgba(250, 250, 250, 1);
    }

    .logo {
        width: 100px;
        height: 100px;
        background-color: rgba(246, 246, 246, 1);
    }

    .logo i {
        font-size: 30px;
        margin: 45px;
    }

    p {
        margin: 5px 0;
    }

    .customWidth {
        width: 70%;
    }

    .level {
        width: 40px;
        height: 30px;
        line-height: 30px;
        margin: 0 15px;
        background-color: yellow;
        text-align: center;
        box-shadow: 0 2px 12px 2px rgba(0, 0, 0, .1);;
    }

    .check {
        width: 30px;
        height: 30px;
        margin: 5px 20px;
    }

    .level span {
        display: inline-block !important;
        width: 100% !important;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
    }

    .avatar {
        width: 100px;
        height: 100px;
        display: block;
    }

    .logo i {
        margin: 20px;
    }
</style>
<template>
    <div>
        <form1 :datas="basis" @getValue="getValue($event)" ></form1>
        <form2 :datas="form_all.hscodes"  @ee="cc"></form2>
        <form9 :datas="form_all.reminds" :enum='prodremind' :prod_id='prod_id'  @ee="cc"></form9>
        <form3 :datas="form_all.supervisions" @ee="cc"></form3>
        <form4 :datas="form_all.property" @ee="cc"></form4>
        <form5 :datas="form_all.msds" @ee="cc"></form5>
        <form6 :datas="form_all.chemtests" @ee="cc"></form6>
        <form7 :datas="form_all.specs" @ee="cc"></form7>
        <form8 :datas="form_all.charges" @ee="cc"></form8>
    </div>
</template>
<script>
    import {
        lists,
        edit,
    } from '@/api/prod'
    import form1 from './form/base'
    import form2 from './form/hscode'
    import form3 from './form/supervision'
    import form4 from './form/property'
    import form5 from './form/msds'
    import form6 from './form/testitem'
    import form7 from './form/spec'
    import form8 from './form/charge'
    import form9 from './form/reminds'
    export default {
        name: "",
        components: {
            form1,
            form2,
            form3,
            form4,
            form5,
            form6,
            form7,
            form8,
            form9
        },
        data() {
            return {
               form_all:[],
               prodremind:'',
               prod_id:'',
                basis:{
                    id:'',
                    prod_id:'',
                    name: '',
                    name_cn:'',
                    cas: '',
                    mdl: '',
                    hscode:'',
                    smiles: '',
                    chemprodappearance_id:'',
                    chemicalcate_id:'',
                    notice_size:'',
                    notice_unit_id:'',
                    tag:'',
                    is_advantage:'',
                    is_secret:'',
                    note:'',
                    status:'',
                },
                property:{}
            }
        },
        created(){
            this.EditData()
        },
        methods: {
            EditData(){
                this.$bus.$off("val");
                this.$bus.on('val', target => {
                    edit('chemprod', target).then(res => {
                        this.form_all = res.data;
                        this.prodremind = res.enum.prodremind
                        this.prod_id = res.data.prod_id
                        this.basis.prod_id=res.data.prod_id;
                        this.basis.name=res.data.name;
                        this.basis.name_cn=res.data.name_cn;
                        this.basis.smiles=res.data.smiles;
                        this.basis.itemno=res.data.itemno;
                        this.basis.note=res.data.note;
                        this.basis.cas=res.data.cas;
                        this.basis.hscode=res.data.hscode;
                        this.basis.note=res.data.note;
                        this.basis.chemicalcate_id=res.data.chemicalcate_id;
                        this.basis.chemprodappearance_id=res.data.chemprodappearance_id;
                        this.basis.id=res.data.id;
                        this.basis.is_advantage=res.data.is_advantage;
                        this.basis.is_secret=res.data.is_secret;
                        this.basis.mdl=res.data.mdl;
                        this.basis.notice_unit_id=res.data.notice_unit_id;
                        this.basis.notice_size=res.data.notice_size;
                        this.basis.status=res.data.status
                        this.basis.expired_interval = res.data.expired_interval
                        this.basis.img = res.data.img
                        this.basis.svg = res.data.svg
                    })
                });
            },
            cc: function (str) {
                edit('chemprod', str).then(res => {
                    this.form_all = res.data;
                    this.prodremind = res.enum.prodremind
                    this.prod_id = res.data.prod_id
                    this.basis.prod_id=res.data.prod_id;
                    this.basis.name=res.data.name;
                    this.basis.name_cn=res.data.name_cn;
                    this.basis.smiles=res.data.smiles;
                    this.basis.itemno=res.data.itemno;
                    this.basis.note=res.data.note;
                    this.basis.cas=res.data.cas;
                    this.basis.hscode=res.data.hscode;
                    this.basis.note=res.data.note;
                    this.basis.chemicalcate_id=res.data.chemicalcate_id;
                    this.basis.chemprodappearance_id=res.data.chemprodappearance_id;
                    this.basis.id=res.data.id;
                    this.basis.is_advantage=res.data.is_advantage;
                    this.basis.is_secret=res.data.is_secret;
                    this.basis.mdl=res.data.mdl;
                    this.basis.notice_unit_id=res.data.notice_unit_id;
                    this.basis.notice_size=res.data.notice_size;
                    this.basis.status=res.data.status
                })
            },
            getValue(e){
                this.$emit('getValues',e)
            },
            getValues(e){
                if(e){
                    edit('chemprod', e).then(res => {
                        this.form_all = res.data;
                    })
                }
            },
        }
    }
</script>
