<style lang="scss" scoped type="text/scss">
.box-card {
  width: 70%;
  margin: 0px auto;
  position:relative;
  div {
    margin-top: 5px;
  }
  /deep/.el-table{
    font-size: 12px;
    .cell{
      padding: 5px;
    }
  }
  .img_a{
    position: absolute;
    bottom: 10px;
    width:130px;
    right: 20px;
    z-index: 1;
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
      <div>
        <b>
          {{$t('wareHouse.ship.ship75')}}
          <br />JIANGSU AIKON BIOPHARMACEUTICAL R&D CO.,LTD
        </b>
      </div>
      <div style="margin:20px 0px;">
        Tel:025-66099280
        <br />www.aikonchem.com
      </div>
        <div style="text-align: center;font-size:20px;">{{$t('wareHouse.ship.ship76')}}</div>
        <el-table :data="lists" border style="width: 100%" size='mini'>
            <el-table-column :label="$t('wareHouse.ship.ship77')" width="50">
              <template slot-scope="scope">{{ scope.row.inquiry_id }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship78')" >
              <template slot-scope="scope">{{ scope.row.customer_name }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship28')" >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship29')" width="60">
              <template slot-scope="scope">{{ scope.row.purity }}</template>
            </el-table-column>
            <el-table-column label="CAS No.">
              <template slot-scope="scope">{{ scope.row.cas }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship83')" width="60">
              <template slot-scope="scope">{{ scope.row.base_quantity }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship3')">
              <template slot-scope="scope">{{ scope.row.batchno }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship2')">
              <template slot-scope="scope">{{ scope.row.contract_number }}</template>
            </el-table-column>
            <el-table-column :label="$t('wareHouse.ship.ship85')" v-if="order">
              <template slot-scope="scope">{{ scope.row.order_number }}</template>
            </el-table-column>
        </el-table>
      <div>
        {{$t('wareHouse.ship.ship79')}}：{{ this.attr(list_a, "addr.contact_name") }}
      </div>
      <div>
        {{$t('wareHouse.ship.ship80')}}：
        <span>{{ this.attr(list_a, "addr.country.Name")}}</span>
        <span style="margin:0px 5px;">{{ this.attr(list_a, "addr.city.Name")}}</span>
        <span>{{ this.attr(list_a, "addr.address")}}</span>
      </div>
      <div>{{$t('wareHouse.ship.ship81')}}：{{ this.attr(list_a, "addr.mobile")}}</div>
      <div :style="list_a.img?'width:80%;':'width:100%;'">
        {{$t('wareHouse.ship.ship82')}}
      </div>
      <img class="img_a" v-if="list_a.img" :src="list_a.img" />
    </el-card>
  </d2-container>
</template>

<script>
import { packing_list } from '@/api/warehouse'
export default {
  name: 'Warehouse-packing_list',
  data () {
    return {
      list_a:[],
      lists: [],
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
      if (to.name == "Warehouse-packing_list") {
        // if (this.$route.query.ids) {

        //   this.fetchData(this.$route.query.ids)
        // }
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
      // console.log(subOutputRankPrint.innerHTML)
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
        setTimeout(()=>{
          new_iframe.contentWindow.print();
        })
        




      // let oldContent = document.body.innerHTML
      // document.body.innerHTML = newContent
      // window.print()
      //   this.$router.push({
      //       path: "/Warehouse/packing_list.vue",
      //       name: "Warehouse-packing_list",
      //   });
      // // window.location.reload()
      // document.body.innerHTML = oldContent
      // return false
    }
  }
}
</script>
