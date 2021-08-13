<style lang="scss" scoped type="text/scss">
    .sales_form{
        margin: 30px;
    }
    table {
        border-collapse: collapse;
    }

    /deep/.el-input__inner {
        border: none;
    }

    table th{
        text-align: left;
        padding:5px 10px;
        font-size:14px;
    }
</style>
<template>
    <div class="sales_form">
        <el-form label-width="100px" :inline="true">
        <el-form-item label="采购合同号">
          <el-input :value="data.inventory?data.inventory.purchaseorder_no:''" disabled></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input :value="data.inventory.porder?data.inventory.porder.supplier.name:''" disabled></el-input>
        </el-form-item>
        <el-form-item label="CAS">
          <el-input :value="data.cas" disabled></el-input>
        </el-form-item>
        <el-form-item label="入库类型">
            <el-input value="退货入库" disabled></el-input>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input placeholder="英文名" :value="data.prod_name" disabled style="width: 400px;display: inline-block"></el-input>
          <el-input placeholder="中文名" :value="data.prod_name_cn" disabled style="width: 400px;display: inline-block;margin-left: 10px;"></el-input>
        </el-form-item>
            <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top: 10px;">
                <tr>
                    <th>规格</th>
                    <th>纯度</th>
                    <th>退货数量</th>
                    <th>已货数量</th>
                    <th>入库数量</th>
                    <th>单位</th>
                    <th>单价</th>
                    <th>币种</th>
                    <th>金额</th>
                </tr>
                <tr>
                    <td><el-input :value="data.quantity+getEnumValue(enums.units,data.quantity_unit_id)" disabled></el-input></td>
                    <td><el-input :value="data.inventory.purity" disabled></el-input></td>
                    <td><el-input :value="data.quantity+getEnumValue(enums.units,data.quantity_unit_id)" disabled></el-input></td>
                    <td><el-input :value="data.already_return_quantity" disabled></el-input></td>
                    <td><el-input v-model="form.quantity" disabled></el-input></td>
                    <td><el-input :value="getEnumValue(enums.units,data.quantity_unit_id)" disabled></el-input></td>
                    <td><el-input :value="data.price" disabled></el-input></td>
                    <td><el-input :value="getEnumValue(enums.Currency,data.currency_id)" disabled></el-input></td>
                    <td><el-input :value="data.money" disabled></el-input></td>
                </tr>
            </table>
            <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top: 10px;">
                <tr>
                    <th>生成日期</th>
                    <th>有效期</th>
                    <th>批次</th>
                    <th>仓库</th>
                    <th>货架</th>
                </tr>
                <tr>
                    <td>
                        <el-date-picker
                                type="date"
                                style="width:100%;"
                                v-model="data.inventory.manufactured_at"
                                value-format="yyyy-MM-dd"
                                size="small"
                                disabled
                        ></el-date-picker></td>
                    <td>
                        <el-date-picker
                                type="date"
                                style="width:100%;"
                                v-model="form.expired_at"
                                value-format="yyyy-MM-dd"
                                size="small"
                        ></el-date-picker></td>
                    <td><el-input v-model="form.batchno"  :value="data.batcno"></el-input></td>
                    <td>
                        <el-select
                                v-model="form.warehouse_id"
                                filterable
                                style="width: 200px"
                        >
                            <el-option v-for="i in enums.warehouses" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        </el-select>
                    </td>
                    <td><el-input v-model="form.shelf"  :value="data.shelf"></el-input></td>
                </tr>
            </table>
            <table border="1" bordercolor="#E5E5E5" style="width:100%;margin-top: 10px;">
                <tr>
                    <th>来货包装</th>
                    <th>包装数量</th>
                    <th>毛重</th>
                    <!-- <th>单位</th> -->
                    <th>性状外观</th>
                    <th>存放条件</th>
                    <th width='300'>备注</th>
                </tr>
                <tr>
                    <td> <el-select
                            v-model="data.chemprodappearance_id"
                            filterable
                            style="width: 100px;"
                    >
                        <el-option v-for="i in enums.virtual_units" :key="i.id" :label="i.name" :value="i.id"></el-option>
                    </el-select></td>
                    <td><el-input v-model="form.packinginfo" style="width: 80px;"></el-input></td>
                    <td><el-input v-model="form.netweightinfo" style="width: 80px;"></el-input></td>
                    <!-- <td>
                        <el-select
                            v-model="form.netweight_unit_id"
                            filterable
                            style="width: 60px;"
                    >
                        <el-option v-for="i in enums.units" :label="i.name" :value="i.id"></el-option>
                    </el-select></td>  -->
                    <td>
                        <el-select
                                v-model="form.chemprodappearance_id"
                                filterable
                                style="width: 100%;"
                        >
                            <el-option v-for="i in enums.ChemicalAppearance" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        </el-select>
                    </td>
                    <td>
                        <el-select
                                v-model="form.storage_cond"
                                filterable
                                multiple
                                style="width: 100%;"
                        >
                            <el-option v-for="i in enums.StorageCondition" :key="i.id" :label="i.name" :value="i.id"></el-option>
                        </el-select>
                    </td>
                    <td><el-input v-model="form.note" :value="data.note"></el-input></td>
                </tr>
            </table>
<!--        <el-form-item  label="入库检测" style="width: 100%;">-->
<!--            <el-radio-group v-model="form.need_check">-->
<!--                <el-radio :label="1">需要</el-radio>-->
<!--                <el-radio :label="2">不需要</el-radio>-->
<!--            </el-radio-group>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :loading="save_fy" size="mini">保存</el-button>
          <!--<el-button size="mini" @click="">取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { apiIn } from '@/api/returns'
import { apidoIn } from '../../../api/returns'
import Big from "@/big/a/big.mjs";
export default {
  props: ['row', 'time'],
  data () {
    return {
      save_fy:false,
      data: { inventory: {} },
      enums: [],
      form: {
        shelf: '', // 货架
        warehouse_id: '', // 仓库
        manufactured_at: '', // 生产日期
        expired_at: '', // 有效期
        batchno: '', // 批次
        netweightinfo: '', // 毛重
        // netweight_unit_id: '', // 毛重单位
        quantity: '',
        quantity_unit_id: '',
        packinginfo: '', // 包装数量
        chemprodappearance_id: '', // 外观
        storage_cond: [], // 存储条件
        note: '', // 备注
        need_check: 1// 1需要检测 2不需要检测
      }
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
    onSubmit () {
      this.save_fy = true
      apidoIn(this.row.id, this.form).then(res => {
        if (res && res.hasOwnProperty('code') && res.code === 0) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.$emit('success')
          this.data = { inventory: {} }
          this.form = {
            shelf: '', // 货架
            warehouse_id: '', // 仓库
            manufactured_at: '', // 生产日期
            expired_at: '', // 有效期
            batchno: '', // 批次
            netweightinfo: '', // 毛重
            // netweight_unit_id: '', // 毛重单位
            quantity: '',
            quantity_unit_id: '',
            packinginfo: '', // 包装数量
            chemprodappearance_id: '', // 外观
            storage_cond: [], // 存储条件
            note: '', // 备注
            need_check: 1// 1需要检测 2不需要检测
          }
        }
        this.save_fy = false
      }).catch(rr=>{this.save_fy = false})
    },
    fetchData () {
      apiIn(this.row.id).then(res => {
        this.data = res.data
        this.enums = res.enum
        this.form.already_return_quantity = res.data.already_return_quantity
        this.form.chemprodappearance_id = res.data.inventory.chemprodappearance_id
        this.form.storage_cond = res.data.inventory.storage_cond
        this.form.batchno = res.data.inventory.batchno
        this.form.expired_at = res.data.inventory.expired_at
        this.form.warehouse_id = res.data.inventory.warehouse_id
        // this.form.netweight_unit_id = res.data.inventory.netweight_unit_id
        this.form.manufactured_at = res.data.inventory.manufactured_at
        this.form.quantity_unit_id = res.data.quantity_unit_id
        this.form.note = res.data.note?res.data.note:res.data.inventory.purchaseorder_no+' ('+res.data.sale.name+') '+'退货'
        this.form.quantity = Number(new Big(res.data.quantity).minus(res.data.already_return_quantity))
      })
    }
  }
}
</script>
<style></style>
