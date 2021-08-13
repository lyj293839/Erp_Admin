<template>
    <d2-container>
        <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="供应商产品导入" name="first">
                <div style="margin: 20px;">
                    <formSupplierCanProvide></formSupplierCanProvide>
                </div>
            </el-tab-pane>
            <el-tab-pane label="规格报价导入" name="second">
                <div style="margin: 20px;">
                     <formProdSpecImport></formProdSpecImport>
                </div>
            </el-tab-pane>
        </el-tabs>
    </d2-container>
</template>
<script>
import formSupplierCanProvide from '../components/supplierCanProvidedImport/supplierCanProvided'
import formProdSpecImport from '../components/prodSpecImport/prodSpecImport'
export default {
  components: {
    formSupplierCanProvide,
    formProdSpecImport
  },
  data () {
    return {
      activeName: 'second'
    }
  },
  created () {
  },
  methods: {
    handleClick (tab, event) {
    }
  }
}
</script>

<style scoped>

</style>
