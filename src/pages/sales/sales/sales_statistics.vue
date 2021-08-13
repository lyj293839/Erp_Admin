<style lang="scss" scoped type="text/scss">
.heard {
  text-align: right;
  font-size: 13px;
  margin-bottom: 10px;
  .el-select {
    margin-left:10px;
  }
  .el-button{
    margin-left:10px;
  }
}
.table_s{
  font-size: 13px;
  td{
    line-height: 25px;
    padding-left: 5px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .td_background:hover{
      background:#F4F7FA;
  }
}
  .cursor{
    cursor: pointer;
    color: blue;
    text-decoration:underline
  }
</style>
<template>
  <d2-container>
    <div class="heard">
      <el-date-picker
        v-model="queryList.start_date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        type="date"
        size="mini"
        style="width: 125px;"
      ></el-date-picker>至
      <el-date-picker
        v-model="queryList.end_date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        type="date"
        size="mini"
        style="width: 125px;"
      ></el-date-picker>
      <el-select
        v-model="queryList.sale_id"
        size="mini"
        clearable
        placeholder="销售人员"
        style="width: 100px;"
      >
        <el-option v-for="item in sales" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <!-- <el-select
        v-model="queryList.purchases_id"
        size="mini"
        clearable
        placeholder="采购人员"
        style="width: 100px;"
      >
        <el-option v-for="item in Purchases" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select> -->
      <el-button
        size="mini"
        type="primary"
        :loading="loading_search"
        @click="search"
      >{{$t('search')}}</el-button>
    </div>
    
    <table border="1" bordercolor="#E5E5E5" class="table_s" style="width:100%;border-collapse: collapse;">
      <tr style="background: #f2f2f2;">
        <td colspan="21" align='center'><b>销售人员合同情况</b></td>
      </tr>
      <tr style="background: #f2f2f2;">
        <td width='60'>统计</td>
        <td>美元合同</td>
        <td>美元合同额</td>
        <td>美元取消合同数</td>
        <td>美元取消合同额</td>
        <td>$逾期/应收 </td>
        <td>人民币合同</td>
        <td>人民币合同额</td>
        <td>人民币取消合同数</td>
        <td>人民币取消合同额</td>
        <td>￥逾期/应收 </td>
        <td>欧元合同</td>
        <td>欧元合同额</td>
        <td>欧元取消合同数</td>
        <td>欧元取消合同额</td>
        <td>€逾期/应收 </td>
        <td>港元合同</td>
        <td>港元合同额</td>
        <td>港元取消合同数</td>
        <td>港元取消合同额</td>
        <td>HK$逾期/应收 </td>
      </tr>
      <tr v-for="(item,index) in list" class="td_background">
        <td>
          <span v-if="item[1]">{{getEnumValue(sales,item[1].sale_id)}}</span>
          <span v-else-if="item[2]">{{getEnumValue(sales,item[2].sale_id)}}</span>
          <span v-else-if="item[3]">{{getEnumValue(sales,item[3].sale_id)}}</span>
          <span v-else-if="item[4]">{{getEnumValue(sales,item[4].sale_id)}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].count}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].cancle_total_money}}</span>
        </td>
        <td>
          <span @click="overdue(1,item[1].sale_id)" class="cursor" v-if="item['1']">{{item['1'].overdue_total_money}}</span>
          /
          <span @click="overdue_amount(1,item[1].sale_id)" class="cursor">{{attr(item['1'],'overdue_contract_amount')}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].count}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].cancle_total_money}}</span>
        </td>
        <td>
          <span  @click="overdue(2,item[2].sale_id)" class="cursor" v-if="item['2']">{{item['2'].overdue_total_money}}</span>
          /
          <span  @click="overdue_amount(2,item[2].sale_id)" class="cursor">{{attr(item['2'],'overdue_contract_amount')}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].count}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].cancle_total_money}}</span>
        </td>
        <td>
          <span  @click="overdue(3,item[3].sale_id)" class="cursor" v-if="item['3']">{{item['3'].overdue_total_money}}</span>
          /
          <span  @click="overdue_amount(3,item[3].sale_id)" class="cursor">{{attr(item['3'],'overdue_contract_amount')}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].count}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].cancle_total_money}}</span>
        </td>
        <td>
          <span  @click="overdue(4,sales,item[4].sale_id)" class="cursor" v-if="item['4']">{{item['4'].overdue_total_money}}</span>
          /
          <span  @click="overdue_amount(4,sales,item[4].sale_id)" class="cursor">{{attr(item['4'],'overdue_contract_amount')}}</span>
        </td>
      </tr>
    </table>
    <table border="1" bordercolor="#E5E5E5" class="table_s" style="width:100%;border-collapse: collapse;">
      <tr style="background: #f2f2f2;">
        <td colspan="17" align='center'><b>采购人员子合同情况</b></td>
      </tr>
      <tr style="background: #f2f2f2;">
        <td width='60'>统计</td>
        <td>美元合同</td>
        <td>美元合同额</td>
        <td>美元取消合同数</td>
        <td>美元取消合同额</td>
        <td>人民币合同</td>
        <td>人民币合同额</td>
        <td>人民币取消合同数</td>
        <td>人民币取消合同额</td>
        <td>欧元合同</td>
        <td>欧元合同额</td>
        <td>欧元取消合同数</td>
        <td>欧元取消合同额</td>
        <td>港元合同</td>
        <td>港元合同额</td>
        <td>港元取消合同数</td>
        <td>港元取消合同额</td>
      </tr>
      <tr v-for="(item,index) in list_purchase" class="td_background">
        <td>
          <span v-if="item[1]">{{getEnumValue(Purchases,item[1].purchase_user_id)}}</span>
          <span v-else-if="item[2]">{{getEnumValue(Purchases,item[2].purchase_user_id)}}</span>
          <span v-else-if="item[3]">{{getEnumValue(Purchases,item[3].purchase_user_id)}}</span>
          <span v-else-if="item[4]">{{getEnumValue(Purchases,item[4].purchase_user_id)}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].count}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['1']">{{item['1'].cancle_total_money}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].count}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['2']">{{item['2'].cancle_total_money}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].count}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].cancle_count}}</span>
        </td>
        <td>
          <span v-if="item['3']">{{item['3'].cancle_total_money}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].count}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].total_money}}</span>
        </td>
        <td>
          <span v-if="item['4']">{{item['4'].cancle_count}}</span>
        </td>
        <td>
          <!-- <span v-for='(it,key,i) in item'>
             <span v-if='key==4'>
              {{item[key].cancle_total_money}}
             </span>
          </span> -->
          <span v-if="item['4']">{{item['4'].cancle_total_money}}</span>
        </td>
      </tr>
    </table>
  </d2-container>
</template>

<script>
import $ from "jquery";
import axios from "axios";
import { sales_statistics } from "@/api/sale";
export default {
  name: "sales-sales_statistics",
  data() {
    return {
      list: [],
      list_purchase:[],
      queryList: {
        start_date: "",
        end_date: "",
        sale_id: "",
        // purchases_id:''
      },
      loading_search: false,
      sales: [],
      Purchases:[]
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route (to, from){
      if(to.name == 'sales-sales_statistics'){
        
      }
    }
  },
  methods: {
    fetchData() {
      sales_statistics(this.queryList).then(res=>{
        if(this.loading_search){
            this.$message({
                message:res.msg,
                type:'success'
            })
            this.loading_search=false
        }
        this.list = res.data.sale_result
        this.list_purchase = res.data.purchase_result
      }).catch(rr => {this.loading_search=false})
      this.sales = this.GEnums.Sales;
      this.Purchases = this.GEnums.Purchases;
    },
    search() {
      this.loading_search = true
      localStorage.setItem('overdue', JSON.stringify(this.queryList))
      this.fetchData();
    },
    overdue(currency_id,sale_id){
      this.$router.push({
          path:'sales_children',
          query:{
              overdue:localStorage.getItem('overdue')?JSON.parse(localStorage.getItem('overdue')):{},
              currency_id:currency_id,
              sale_id:sale_id
          }
      })
    },
    overdue_amount(currency_id,sale_id){
      this.$router.push({
          path:'sales_children',
          query:{
              overdue:localStorage.getItem('overdue')?JSON.parse(localStorage.getItem('overdue')):{},
              currency_id:currency_id,
              sale_id:sale_id,
              amount:true
          }
      })
    },
  }
};
</script>