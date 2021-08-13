<style lang="scss" scoped type="text/scss">
.box-card {
  width: 70%;
  margin: 0px auto;
  div {
    margin-top: 5px;
  }
  table{
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 14px;
    line-height: 25px;
    background: #EDEDED;
    td{
        padding: 0px 5px;
    }
    .cell{
        background:#A5A5A5;
        td{
            color: white !important;
            text-align: center;
        }
    }
  }
}
</style>

<template>
  <d2-container>
    <div style="text-align: right;margin:10px 20px;">
      <el-button size="mini" type="primary" v-print="'#print'">
        {{$t('wareHouse.ship.ship74')}}
      </el-button>
    </div>
    <el-card class="box-card" id="print" style="width:715px;height: auto;">
      <div style="display:flex;justify-content: space-between;align-items: center;margin-top: 10px;">
          <div style="width:180px;">
              <img src="../../../../public/image/theme/d2/logo/kaiwei.jpg" style="width:100%;margin-top: 10px;" />
          </div>
          <div style="text-align:right;font-size:13px;">
              <span style="font-size:16px;">上海凯为化学科技有限公司</span><br>
              <span>邮箱: service@aivichem.com</span><br>
              <span>网址: www.aivichem.com</span>
          </div>
      </div>
      <div style="text-align:center;font-size:20px;"><b>发货通知单</b></div>
      <div style="display:flex;justify-content: space-between;align-items: center;font-size:14px;">
          <div>
              <span>收货单位：{{ this.attr(list_a, "addr.contact_name") }}</span><br>
              <span>收货地址：
                <span>{{ this.attr(list_a, "addr.country.Name")}}</span>
                <span style="margin:0px 5px;">{{ this.attr(list_a, "addr.city.Name")}}</span>
                <span>{{ this.attr(list_a, "addr.address")}}</span>
              </span>
          </div>
          <div>
              <span>发货日期：{{data_time}}</span><br>
              <span>收货电话：{{ this.attr(list_a, "addr.mobile")}}</span>
          </div>
      </div>
      <table border="1" bordercolor="black">
          <tr class="cell">
              <td width='60'>ID</td>
              <td width='200'>产品名称</td>
              <td width='100'>CAS#</td>
              <td width='50'>纯度</td>
              <td width='60'>规格</td>
              <td width='60'>数量</td>
              <td>储藏条件</td>
          </tr>
          <tr v-for="item in lists">
              <td>{{item.inquiry_id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.cas}}</td>
              <td>{{item.purity}}</td>
              <td></td>
              <td>{{item.base_quantity}}</td>
              <td></td>
          </tr>
      </table>
      <div style="text-align:center;font-size:13px;">
          <span style="margin-right:10px;">邮箱: service@aivichem.com</span>
          <span>网址:www.aivichem.com</span><br>
          <span>地址：上海市浦东新区秋月路26号1号楼216室 电话: 021-58461859</span>
      </div>
      <!-- <div style="text-align:center;font-size:13px;">
          <span style="margin-right:10px;">邮箱: service@aivichem.com</span>
          <span>网址:www.aivichem.com</span><br>
          <span>地址：
            <span v-if="list_a.addr.country">{{ this.attr(list_a, "addr.country.Name")}}</span>
            <span v-if="list_a.addr.city" style="margin:0px 5px;">{{ this.attr(list_a, "addr.city.Name")}}</span>
            <span>{{ this.attr(list_a, "addr.address")}}</span>
        </span>
        <span>电话:{{ this.attr(list_a, "addr.mobile")}}</span>
      </div> -->
    </el-card>
  </d2-container>
</template>

<script>
import { packing_list } from '@/api/warehouse'
export default {
  name: 'Warehouse-packing_list_kh',
  data () {
    return {
      list_a:[],
      lists: [],
      data_time:'',
      order:false
    }
  },
  created () {
    if (this.$route.query.ids) {
      this.fetchData('not_all')
    }
    if (this.$route.query.all) {
      this.fetchData('all')
    }
    if (this.$route.query.shipping_notice_id) {
      this.fetchData('id')
    }
  },
  watch: {
    $route (to, from) {
      if (to.name == "Warehouse-packing_list_kh") {
        if (this.$route.query.ids) {
          this.fetchData('not_all')
        }
        if (this.$route.query.all) {
          this.fetchData('all')
        }
        if (this.$route.query.shipping_notice_id) {
          this.fetchData('id')
        }
      }
    }
  },
  methods: {
    fetchData (type) {
      this.lists = []
      this.data_time = init()
      if (type === 'not_all') {
        let obj = {
          ids: JSON.parse(this.$route.query.ids)
        }
        packing_list(obj)
          .then(res => {
            if (res && res.code === 0) {
              res.data.data.forEach(i=>{
                for(var j in i){
                  this.lists.push(i[j])
                }
              })
              this.list_a = res.data
              this.order = false
              this.lists.forEach(item=>{
                if(item.order_number){
                  this.order = true
                }
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
          .catch(rr => {})
      } else if (type === 'all') {
        let obj = JSON.parse(this.$route.query.all)
        packing_list(obj)
          .then(res => {
            if (res && res.code == 0) {
              res.data.data.forEach(i=>{
                for(var j in i){
                  this.lists.push(i[j])
                }
              })
              this.list_a = res.data
              this.order = false
              this.lists.forEach(item=>{
                if(item.order_number){
                  this.order = true
                }
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
          .catch(rr => {})
      } else {
        let obj = {
          shipping_notice_id: this.$route.query.shipping_notice_id
        }
        packing_list(obj)
          .then(res => {
            if (res && res.code === 0) {
              res.data.data.forEach(i=>{
                for(var j in i){
                  this.lists.push(i[j])
                }
              })
              this.list_a = res.data
              this.order = false
              this.lists.forEach(item=>{
                if(item.order_number){
                  this.order = true
                }
              })
            } else {
              this.$message({
                message: res.msg,
                type: 'error'
              })
            }
          })
          .catch(rr => {})
      }
    },
    doPrint (e) {
      let subOutputRankPrint = document.getElementById('print')
      let newContent = subOutputRankPrint.innerHTML


        var obj = document.getElementById('print');
        var new_iframe = document.createElement('IFRAME');
        var doc = null;
        new_iframe.setAttribute('style', 'width:0px;height:0px;position:absolute;left:-2000px;top:-2000px;');
        new_iframe.setAttribute('align', 'center');
        document.body.appendChild(new_iframe);
        doc = new_iframe.contentWindow.document;
        doc.write('<div style="width:100%;height:auto;min-width:1100px;margin:0px auto;"align="center">'+obj.innerHTML+'</div>');
        doc.close();
        new_iframe.contentWindow.focus();
        new_iframe.contentWindow.print();
    }
  }
}
function init() {
  var date = new Date();
  // 年
  var year = date.getFullYear();
  // 月
  var month = date.getMonth() + 1;
  // 日
  var day = date.getDate();
  month = month < 10 ? "0" + month : month; // 如果小于10即显示为09月
  day = day < 10 ? "0" + day : day; // 如果小于10即显示为09日

  return String(year) + '/'+ String(month)+'/'+String(day);
}
</script>
