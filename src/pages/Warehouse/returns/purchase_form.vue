<style lang="scss" scoped type="text/scss">
    .sales_form{
        margin: 30px;
    }
    table{
      border-collapse: collapse;
      width:100%;
      td{
        line-height: 30px;
        padding: 0px 5px;
      }
    }
    /*table th{*/
        /*text-align: left;*/
        /*padding:5px 10px;*/
        /*font-size:14px;*/
    /*}*/
    /deep/ .red  .el-form-item__label {
        color: red;
        font-weight: bold;
    }
</style>
<template>
    <div class="sales_form">
        <el-form label-width="100px" :inline="true">
            <el-form-item label="申请时间">
                <el-input :value="data.created_at" disabled></el-input>
            </el-form-item>
            <el-form-item label="产品名称">
                <el-input :value="data.prod_name" disabled></el-input>
            </el-form-item>
            <el-form-item label="CAS">
                <el-input :value="data.cas" disabled></el-input>
            </el-form-item>
            <el-form-item label="申请数量">
                <el-input :value="data.quantity+getEnumValue(enums.units,data.quantity_unit_id)" disabled></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-input :value="getEnumValue(enums.statuses,data.status)" disabled></el-input>
            </el-form-item>
            <el-form-item label="仓库">
                <el-input  :value="data.warehouse.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="发货备注">
                <el-input type="textarea" v-model="form.delivery_note" :value="data.delivery_note"></el-input>
            </el-form-item>
            <el-form-item label="发货状态">
                <el-select
                        v-model="form.delivery_status"
                        filterable
                        style="border: 1px solid #f2f2f2;"
                        size="mini"
                        :disabled="delivery_status==1||delivery_status==2"
                >
                    <el-option v-for="i in enums.delivery_statuses" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="*备注:" v-if="data.note==='退到寄售库'" class="red">
                <span class="red bold">{{data.note}}(无需发货给供应商)</span>
            </el-form-item>
            <el-form-item label="退货备注">
                <el-input type="textarea" style="width: 300px;" rows="6" v-model="data.return_note" readonly></el-input>
            </el-form-item>
            <el-form-item label="退货地址">
                <el-input type="textarea" style="width: 300px;" rows="6" v-model="form.return_address"></el-input>
            </el-form-item>
            <table border="1" bordercolor="#E5E5E5" v-for="(item,index) in data.inventory_preout" :key="index" :style="index?'border-top:white;':''">
              <tr v-if="index==0">
                <td><b>CAS</b> </td>
                <td><b>批次号</b></td>
                <td colspan="3"><b>仓库</b></td>
              </tr>
              <tr v-if="index==0">
                <td>{{data.cas}}</td>
                <td>{{data.batchno}}</td>
                <td colspan="3">{{data.warehouse.name}}</td>
              </tr>
              <tr v-if="index==0">
                <td><b>包装类型</b></td>
                <td><b>货架</b></td>
                <td><b>规格</b></td>
                <td><b>发货数量</b></td>
                <td><b>发货单位</b></td>
              </tr>
              <tr v-for="i in item.shelf_preout" :key="i.id" v-if="i.type==2">
                <td width='200'>散装库存</td>
                <td width='200'>{{i.shelf}}</td>
                <td width='200'>/</td>
                <td>{{i.quantity}}</td>
                <td width='100'>{{getEnumValue(enums.units,i.quantity_unit)}}</td>
              </tr>
            </table>
            <el-table
                    :data="form.express"
                    border
                    tooltip-effect="dark"
                    style="width: 100%;margin-top:20px;"
                    size='mini'
            >
                <el-table-column label="快递公司" align="center" min-width="80">
                    <template slot-scope="scope">
                        <el-select
                                v-model="scope.row.company"
                                filterable
                                style="border: 1px solid #f2f2f2;"
                                size="mini"
                        >
                            <el-option v-for="i in enums.ExpressCompany" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="快递号" align="center" min-width="80">
                    <template slot-scope="scope">
                        <el-input size="mini" type="text" class="input" 
                                  v-model="scope.row.number"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="快递费" align="center" min-width="80">
                    <template slot-scope="scope">
                        <el-input size="mini" type="text" class="input" 
                                  v-model="scope.row.fee"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="货币符号" align="center" min-width="80">
                    <template slot-scope="scope">
                        <el-select
                                v-model="scope.row.currency_id"
                                filterable
                                style="border: 1px solid #f2f2f2;"
                                size="mini"
                        >
                            <el-option v-for="i in enums.Currency" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="备注" align="center" min-width="80">
                    <template slot-scope="scope">
                        <el-input size="mini" type="text" class="input"
                                  v-model="scope.row.note"></el-input>
                    </template>
                </el-table-column>
                <el-table-column align="center" min-width="80">
                  <template slot="header">
                    <el-button  size="mini" type="primary" @click="add()">+</el-button>
                  </template>
                    <!-- <template slot-scope="scope">
                        <el-button  v-if="scope.$index==0" size="mini" type="primary" @click="add()">+</el-button>
                    </template> -->
                </el-table-column>
            </el-table>
        </el-form>
        <div style="text-align:right;padding:20px 0px;">
          <el-button type="primary" @click="onSubmit" :loading="save_fy" size="mini">保存</el-button>
        </div>
    </div>
</template>

<script>
import { apiOut, apidoOut } from '@/api/returns'
export default {
  props: ['row', 'time'],
  data () {
    return {
      save_fy:false,
      data: {},
      enums: [],
      returnships: [],
      express: {
        company: '',
        number: '',
        fee: '',
        currency_id: '',
        note: ''
      },
      form: {
        return_address: '',
        express:[],
        delivery_note: '',
        delivery_status: ''
      },
      delivery_status:'',
      
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    time () {
      this.fetchData()
    }
  },
  methods: {
    add () {
      this.form.express.push({
        company: '',
        number: '',
        fee: '',
        currency_id: '',
        note: '',
        returns_id: this.row.id
      })
    },
    onSubmit () {
      this.save_fy = true
      apidoOut(this.row.id, this.form).then(res => {
        if (res && res.hasOwnProperty('code') && res.code === 0) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$emit('success')
          this.data = {}
          this.form = {
            return_address: '',
            express:[],
            delivery_note: '',
            delivery_status: ''
          }
          this.delivery_status = ''
        }
        this.save_fy = false
      }).catch(rr=>{this.save_fy = false})
    },
    fetchData () {
      apiOut(this.row.id).then(res => {
        res.data.returnships.forEach(item => {
          item.company = Number(item.company)
        })
        this.data = res.data
        // this.form.express=[{
        //     company:'',
        //     number:'',
        //     fee:'',
        //     currency_id:'',
        //     note: ''
        // }],
        this.form.express = []
        this.form.return_address=res.data.return_address
          if(res.data.returnships.length>0){
              this.form.express = res.data.returnships
          }
        this.form.delivery_status = res.data.delivery_status
         this.delivery_status=res.data.delivery_status
        this.enums = res.enum
      })
    }
  }
}
</script>
<style></style>
