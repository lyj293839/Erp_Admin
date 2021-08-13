<template>
    <div class="box">
        <el-scrollbar style="height:100%">
        <!--<el-badge :value="procurement_contract_notices&&procurement_contract_notices!=0?procurement_contract_notices:''" class="item" v-if="permissions.indexOf(436)>-1">-->
            <!--<el-button size="mini" @click="goUrl('/Inquery/inquery','Inquery-inquery')">需确认报价</el-button>-->
        <!--</el-badge>-->
        <!-- <el-badge :value="overdue_count&&overdue_count!=0?overdue_count:''" class="item" v-if="user_type==101||this.user_id==1">
            <el-button size="mini" @click="goUrl('/sales/sales_children','sales-sales_children')">自己订单</el-button>
        </el-badge> -->
        <el-badge :value="important_customer_inquiry_count&&important_customer_inquiry_count!=0?important_customer_inquiry_count:''" v-if="permission_names['inquiry_customer_is_important']&&permission_names['inquiry_customer_is_important']==='inquiry_customer_is_important'" class="item" >
            <el-button size="mini" @click="goUrl('/Inquery/inquery8','Inquery-inquery8','important_customer_inquiry_count')">当天重点客户询单</el-button>
        </el-badge>
        <el-badge :value="important_inquiry_count&&important_inquiry_count!=0?important_inquiry_count:''" v-if="permission_names['inquiry.set_key']==='inquiry.set_key'" class="item" >
            <el-button size="mini" @click="goUrl('/Inquery/inquery9','Inquery-inquery9','important_inquiry')">当天重点询单</el-button>
        </el-badge>
        <el-badge :value="inquiry_nums_belongs_self_prod&&inquiry_nums_belongs_self_prod!=0?inquiry_nums_belongs_self_prod:''" class="item"  v-if="permission_names['inquiry.inquiry.belongs_self_prod']==='inquiry.inquiry.belongs_self_prod'">
            <el-button size="mini" @click="goUrl('/Inquery/inquery10','Inquery-inquery10','belongs_self_prod')">产品负责人是自己的询单</el-button>
        </el-badge>
        <el-badge :value="overdue_count&&overdue_count!=0?overdue_count:''" class="item" v-if="permissions.indexOf(704)>-1">
            <el-button size="mini" @click="goUrl('/sales/sales_children','sales-sales_children')">账期逾期子合同数</el-button>
        </el-badge>
        <el-badge :value="no_operate_num&&no_operate_num.length!=0?no_operate_num.length:''" class="item" v-if="permissions.indexOf(72)>-1&&user_type==102&&no_operate_num&&no_operate_num.length>0">
            <!--<el-button size="mini">退款未处理</el-button>-->
            <el-tooltip placement="top">
                <div slot="content">
                    <span v-for="item in no_operate_num" :key='item.id'>{{attr(item,'procurement_contract.contract_number')}};</span>
                </div>
                <el-button size="mini">退款未处理</el-button>
            </el-tooltip>
        </el-badge>
        <el-badge :value="procurement_contract_notices&&procurement_contract_notices!=0?procurement_contract_notices:''" class="item" v-if="permissions.indexOf(72)>-1">
            <el-button size="mini" @click="goUrl('/procure/notice','procure-notice')">采购通知单</el-button>
        </el-badge>
        <el-badge class="item"  v-if="permissions.indexOf(4)>-1">
            <el-button size="mini" @click="goUrl('/procure/contract','procure-contract')">采购合同</el-button>
        </el-badge>
        <el-badge :value="procurement_wait_check&&procurement_wait_check!=0?procurement_wait_check:''" class="item" v-if="permissions.indexOf(88)>-1">
            <el-button size="mini" @click="goUrl('/procure/contract_check','procure-contract_check',1)">采购合同审核</el-button>
        </el-badge>
        <el-badge :value="procurement_package_pay_wait_check&&procurement_package_pay_wait_check!=0?procurement_package_pay_wait_check:''" class="item" v-if="permissions.indexOf(88)>-1">
            <el-button size="mini" @click="goUrl('/procure/package_list','procure-package_list',1)">打包付款审核</el-button>
        </el-badge>
        <el-badge :value="procurement_pay_wait_check&&procurement_pay_wait_check!=0?procurement_pay_wait_check:''" class="item" v-if="permissions.indexOf(507)>-1&&user_id!=5">
            <el-button size="mini" @click="goUrl('/procure/contract','procure-contract','',1)">采购付款审核</el-button>
        </el-badge>
        <!-- <el-badge :value="procurement_pay_wait_check&&procurement_pay_wait_check!=0?procurement_pay_wait_check:''" class="item" v-if="permissions.indexOf(507)>-1">
            <el-button size="mini" @click="goUrl('/procure/contract','procure-contract','',1)">打包付款审核</el-button>
        </el-badge> -->
        <el-badge class="item" v-if="permissions.indexOf(30)>-1&&user_id!=5">
            <el-button size="mini" @click="goUrl('/Warehouse/inventory','Warehouse-inventory')">库存管理</el-button>
        </el-badge>
        <el-badge :value="salercontract_wait_check&&salercontract_wait_check!=0?salercontract_wait_check:''" class="item" v-if="permissions.indexOf(464)>-1">
            <el-button size="mini" @click="goUrl('/sales/list_check','sales-list_check',-1)">销售合同审核</el-button>
        </el-badge>
        <el-badge :value="prod_wait_check&&prod_wait_check!=0?prod_wait_check:''" class="item" v-if="permissions.indexOf(560)>-1">
            <el-button size="mini" @click="goUrl('/Prod/check','Prod-check')">产品核对</el-button>
        </el-badge>

        <el-badge :value="instoreNotice_count&&(instoreNotice_count!=0?instoreNotice_count:'')" class="item" v-if="permissions.indexOf(560)>-1">
            <el-button size="mini" @click="goUrl_instore(instoreNotice_url,instoreNotice_name)">库存警戒</el-button>
        </el-badge>
        </el-scrollbar>
    </div>
</template>
<script>
    import request from '@/plugin/axios'
    import util from '@/libs/util.js'
    import Echo from 'laravel-echo'
    window.io = require('socket.io-client')
    import { latest } from '@/api/email_manage'
    export default {
        name: 'd2-header-size',
        data() {
            return {
                user_type:'',
                user_id:'',
                role_id: '',
                permissions :JSON.parse(localStorage.getItem('permissions')),
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                procurement_contract_notices: 0,
                procurement_wait_check: 0,
                procurement_package_pay_wait_check:0,
                procurement_pay_wait_check: 0,
                salercontract_wait_check: 0,
                prod_wait_check: 0,
                setInterval:'',
                no_operate_num:[],
                instoreNotice_url:'/Prod/index_notice',
                instoreNotice_name:'',
                instoreNotice_param:{
                    stock_noticed_percent:100,
                    stock_noticed_percent_op:'≤'
                },
                instoreNotice_count:'',
                overdue_count:'',
                inquiry_nums_belongs_self_prod:'',
                important_inquiry_count:'',
                important_customer_inquiry_count:''
            }
        },
        created() {
            this.getData();
            this.user_type = util.cookies.get("user_type");
            this.user_id=Number(util.cookies.get('user_id'))

        },
        mounted() {
            this.getBadges();
            this.getInstoreNotice();
            // this.setInterval = setInterval(()=>{this.getData();},10000);
        },
        methods: {
            goUrl(url,name,status,pay_wait_check){
                let date=new Date().getTime()
                if(status){
                    this.$router.push({
                        path:url,
                        name:name,
                        query:{
                            status:status,
                            date:date
                        }
                    });

                }else{
                    if(pay_wait_check){
                        this.$router.push({
                            path:url,
                            name:name,
                            query:{
                                pay_wait_check:pay_wait_check,
                                date:date
                            }
                        });
                    }else{
                        this.$router.push({
                            path:url,
                            name:name,
                            query:{
                                date:date
                            }
                        });
                    }
                }
            },
            goUrl_instore(url,name){
                let date=new Date().getTime()
                let that=this;
                that.instoreNotice_param.url = true
                that.$router.push({
                    path:url,
                    name:name,
                    query:JSON.parse(JSON.stringify(that.instoreNotice_param)),
                });
            },
            getData(){
                if(!util.cookies.get('token')){
                    clearInterval(this.setInterval);
                    return;
                }
                request({url: 'api/v1/badge', method: 'get'}).then(res => {
                    if (res && res.code == 0) {
                        this.role_id = res.data.role_id;
                        this.procurement_contract_notices = res.data.procurement_contract_notices;
                        this.procurement_wait_check = res.data.procurement_wait_check;
                        this.procurement_package_pay_wait_check = res.data.procurement_package_pay_wait_check;
                        this.procurement_pay_wait_check = res.data.procurement_pay_wait_check;
                        this.salercontract_wait_check = res.data.salercontract_wait_check;
                        this.prod_wait_check = res.data.prod_wait_check;
                        this.overdue_count= res.data.overdue_count;
                        this.inquiry_nums_belongs_self_prod=res.data.inquiry_nums_belongs_self_prod;
                        this.important_inquiry_count=res.data.important_inquiry_count;
                        this.important_customer_inquiry_count=res.data.important_customer_inquiry_count
                    }
                }).catch(rr => {
                })
                request({url: 'api/v1/ProcurementContract/Paylist/no_operate_num', method: 'get'}).then(res => {
                    if (res && res.code == 0) {
                            this.no_operate_num=res.data
                    }
                }).catch(rr => {
                })
                latest().then(res => {
                   if(res&&res.code==0){
                       this.instoreNotice_url=res.instore_notice.url;
                       this.instoreNotice_name=res.instore_notice.name;
                       if(this.attr(res,'instore_notice.params.notice_count')&&this.attr(res,'instore_notice.params.notice_count')>0){
                           localStorage.setItem('instoreNotice_count',this.attr(res,'instore_notice.params.notice_count'))
                       }
                       if(localStorage.getItem('instoreNotice_count')){
                           this.instoreNotice_count=localStorage.getItem('instoreNotice_count')
                       }
                       this.instoreNotice_param=this.attr(res,'instore_notice.params')
                   }
                })
            },
            getInstoreNotice(){
                const Channel = 'notice_prod_warning';
                const ListenEvent = "Messages"
                // new Echo({
                //     broadcaster: 'socket.io',
                //     host: process.env.VUE_APP_SOCKET_URL,
                // }).channel(Channel).listen(ListenEvent, (e) => {
                //     console.log(e.message);
                // });

                const token = util.cookies.get('token');
                const userId = util.cookies.get('user_id');
                new Echo({
                    broadcaster: 'socket.io',
                    host: process.env.VUE_APP_SOCKET_URL,
                    auth: { headers: { Authorization: 'Bearer ' + token } }
                }).private(Channel+ "." + userId).listen(ListenEvent, e => {
                    console.log(e.message);
                    console.log('++++++++++++private Channel result------------');
                      localStorage.setItem('instoreNotice_count',this.attr(e.message,'params.notice_count'))
                      this.instoreNotice_param=e.message.params
                      this.instoreNotice_count=this.attr(e.message,'params.notice_count')
                  this.showInstoreNotice(e.message);
                });
            },
            getBadges(){
                console.log('------------++++++++++++');
                const Channel = 'badge';
                console.log(Channel);
                new Echo({
                    broadcaster: 'socket.io',
                    host: process.env.VUE_APP_SOCKET_URL,
                }).channel(Channel).listen('Badges', (e) => {
                    console.log('++++++++++++Channel------------');
                    console.log(e.message);
                });

                const token = util.cookies.get('token');
                const userId = util.cookies.get('user_id');
                new Echo({
                    broadcaster: 'socket.io',
                    host: process.env.VUE_APP_SOCKET_URL,
                    auth: { headers: { Authorization: 'Bearer ' + token } }
                }).private('badge.' + userId).listen('Badges', e => {
                    console.log(e.message);
                    console.log('++++++++++++private Channel result------------');
                    this.showBadge(e.message);
                });

            },
            showBadge(obj){
                this.procurement_contract_notices = `${obj.procurement_contract_notices}`;
                this.procurement_wait_check = `${obj.procurement_wait_check}`;
                this.procurement_package_pay_wait_check = `${obj.procurement_package_pay_wait_check}`;
                this.procurement_pay_wait_check = `${obj.procurement_pay_wait_check}`;
                this.salercontract_wait_check = `${obj.salercontract_wait_check}`;
                this.prod_wait_check = `${obj.prod_wait_check}`;
                this.overdue_count=`${obj.overdue_count}`;
            },
            showInstoreNotice(obj){
                this.instoreNotice = `${obj.params.notice_count}`;
            }

        }
    }
</script>
<style scoped>
    .item{margin-right: 20px;}
    /deep/ .el-badge__content{
        z-index: 999;
    }
    .box{
        width: 1000px;
        text-align: right;
        overflow-x: auto;
        white-space: nowrap;
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        -webkit-overflow-scrolling: touch;
    }
    .box::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .el-scrollbar__thumb {
        display: none;
    }
    .el-scrollbar__wrap {
        overflow-x: auto;
        overflow-y: hidden;
    }
    /deep/.el-scrollbar__view{
        padding: 10px 0;
    }
</style>
