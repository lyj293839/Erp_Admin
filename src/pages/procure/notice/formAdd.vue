<style lang="scss" scoped type="text/scss">
    .sbaoHeard {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 15px;
        .el-input {
            max-width: 200px;
        }
        .el-date-picker {
            max-width: 150px;
        }
        .el-select {
            max-width: 150px;
        }
    }
    .sbaoFrom {
        .el-checkbox {
            margin: 0px;
            /*width: 13%;*/
        }
    }
    /deep/.inputStyle{
        .el-input__inner{
            border: 0px;
        }
    }
    /deep/.checkbox_nei{
    margin-left: 10px;padding-left:0px;
    .el-checkbox__label{padding-left:0px;}
  }
/deep/.el-checkbox__label{padding-left:5px;}
</style>
<template>
    <d2-container>
        <el-form class="sbaoFrom" :model="addForm" label-width="90px" label-position="right">
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <el-form-item label="合同号">
                        <el-row :gutter="20" type="flex">
                            <el-col :span="12">
                                <el-select v-model="addForm.prefix" size="small" clearable>
                                    <el-option
                                            v-for="item in contractNumberPrefix"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.name"
                                    ></el-option>
                                </el-select>
                            </el-col>
                            <el-col :span="12">
                                <el-input v-model="addForm.postfix" size="small" clearable></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="供应商" :required="true">
                        <el-select
                                v-model="addForm.supplier_id"
                                clearable
                                filterable
                                remote
                                reserve-keyword
                                :remote-method="remoteMethod"
                                :loading="loading"
                                style="width:100%;"
                                size="small"
                        >
                            <el-option
                                    v-for="item in supply_list"
                                    :label="item.name"
                                    :key="item.id"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <el-form-item label="CAS">
                        <el-select
                                @change="casEven(addForm.cas)"
                                v-model="addForm.cas"
                                clearable
                                filterable
                                remote
                                reserve-keyword
                                :remote-method="remoteCas"
                                :loading="loadCas"
                                style="width:100%;"
                                size="small"
                        >
                            <el-option
                                    v-for="item in cas_list"
                                    :label="item.cas"
                                    :key="item.id"
                                    :value="item.cas"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="产品名称">
                        <el-input v-model="addForm.product_name+addForm.product_name_cn" size="small" clearable></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <table border="1" bordercolor="#C2C6CE" cellpadding="2" cellspacing="0" class="inputStyle" style="border-collapse: collapse;text-align: center">
                    <tr>
                        <td>品牌</td>
                        <td>规格</td>
                        <td>纯度</td>
                        <td>数量</td>
                        <td>数量单位</td>
                        <td>单价</td>
                        <td>货币</td>
                        <td>金额</td>
                        <td>采购人员</td>
                        <td>提交货时间</td>
                    </tr>
                    <tr>
                        <td>
                            <el-select clearable v-model="addForm.brand_id" size="small" >
                                <el-option
                                        v-for="item in brand_list"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input v-model="addForm.package" size="small" clearable></el-input>
                        </td>
                        <td>
                            <el-input v-model="addForm.purity" size="small" clearable></el-input>
                        </td>
                        <td>
                            <el-input v-model="addForm.quantity" @input="quantity_change()" size="small" clearable></el-input>
                        </td>
                        <td>
                            <el-select v-model="addForm.quantity_unit" size="small" clearable>
                                <el-option
                                        v-for="item in this.units"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input v-model="addForm.price" @input="price_change()" size="small" clearable></el-input>
                        </td>
                        <td>
                            <el-select v-model="addForm.currency_id" size="small" clearable>
                                <el-option
                                        v-for="item in currency"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-input v-model="addForm.total_price" @input="total_change()" size="small" clearable></el-input>
                        </td>
                        <td>
                            <el-select v-model="addForm.purchase_user_id" size="small" clearable>
                                <el-option
                                        v-for="item in purchaseList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-date-picker type="date" v-model="addForm.delivery_date" size="small"
                                            value-format="yyyy-MM-dd" clearable></el-date-picker>
                        </td>
                    </tr>
                </table>
            </el-form-item>
            <el-form-item label="发票类型" :required="true">
                <el-radio-group v-model="addForm.invoice_type_id">
                    <el-radio v-for="item in InvoiceInfo"  :key="item.id" :label="item.id">{{item.name}}</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分析要求">
                  <span
                          v-for="i in addForm.checked_items"
                          v-if="i.child.length==0"
                          :label="i.id"
                          style="margin:0 5px"
                  >
                    <el-checkbox v-model="i.checked" name="type">{{i.name}}</el-checkbox>
                  </span><br>
                    <div v-for="i in addForm.checked_items" v-if="i.child.length!=0" style="margin-right:10px;display: inline-block;width:40%;">
                               <span>{{i.name}}</span>：
                                <el-checkbox
                                        v-for="j in i.child"
                                        :key="j.id"
                                        :label="j.id"
                                        v-model="j.checked"
                                        @change="select(j.id,j.checked)"
                                        class="checkbox_nei"
                                ><span style="font-size:12px;color:#999;padding-left:0px;">{{j.name}}</span></el-checkbox>
                    </div>
            </el-form-item>
            <el-form-item label="其他要求">
                <el-input v-model="addForm.checked_requirement" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="包装要求">
                <el-input v-model="addForm.package_requirement" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="标签要求">
                <el-input v-model="addForm.label_requirement" size="small" clearable></el-input>
            </el-form-item>
            <el-form-item label="随货文件">
                <el-checkbox-group v-model="addForm.product_file">
                    <el-checkbox
                            v-for="item in product_file_info"
                            :label="item.id"
                            :key="item.id"
                    >{{item.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-row type="flex" justify="space-between">
                <el-col :span="12">
                    <el-form-item label="是否报关">
                        <el-select v-model="addForm.if_declare" size="small" clearable>
                            <el-option
                                    v-for="item in if_declare_info"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否现货">
                        <el-select v-model="addForm.is_stock" size="small" clearable>
                            <el-option
                                    v-for="item in is_stock_info"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注">
                <el-input
                        v-model="addForm.note"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        size="small"
                        clearable
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveAdd()"  :loading='loading?true:false' size="mini">保存</el-button>
                <el-button class="sbaoClose" @click="addClose()" size="mini">关闭</el-button>
            </el-form-item>
        </el-form>
    </d2-container>
</template>
<script>
    import axios from "axios";
    import util from '@/libs/util'
    import Big from "@/big/a/big.mjs";
    import {
        lists,
        destroy,
        create,
        update,
        listTotal,
        list_Total
    } from "@/api/prod";
    export default {
        props: ["Notic_enum","Notic_generate"],
        data() {
            return {
                queryList: {
                    page: "1"
                },
                datas: [],
                loading: false,
                loadCas: false,
                addForm: {
                    prefix: "",
                    postfix: "",
                    contract_number: "",
                    supplier_id: "",
                    cas: "",
                    product_name: "",
                    product_name_cn: "",
                    brand_id: "",
                    purity: "",
                    quantity: "",
                    quantity_unit:1,
                    price: "",
                    currency_id: 2,
                    total_price: "",
                    purchase_user_id: "",
                    delivery_date: "",
                    invoice_type_id: 1,
                    checked_requirement: "",
                    label_requirement: "",
                    package_requirement: "",
                    package: "",
                    product_file: [],
                    is_stock: 1,
                    note: "",
                    checked_items: [],
                    if_declare: 0,
                    prod_id: ""
                },
                editForm: {},
                contractNumberPrefix: [],
                units: [],
                currency: [],
                InvoiceInfo: [],
                test_item: [],
                product_file_info: [],
                if_declare_info: [],
                is_stock_info: [],
                purchaseList: [],
                supply_list: [],
                cas_list: [],
                brand_list: []
            };
        },
        created() {
            this.addForm.purchase_user_id = Number(util.cookies.get('user_id'))
            this.fetchData_child();
        },
        methods: {
            fetchData_child() {
                lists(this.queryList, "ProcurementContract/Notice/generate").then(res => {
                    this.addForm.postfix = res.data.postfix_contract_number;
                    this.test_item = JSON.parse(JSON.stringify(res.enum.test_item));
                    this.addForm.checked_items = res.enum.test_item;
                    obj(this.brand_list, res.enum.brands);
                    obj(this.contractNumberPrefix, res.enum.ContractNumberPrefix);
                    obj(this.units, res.enum.units);
                    obj(this.currency, res.enum.Currency);
                    obj(this.InvoiceInfo, res.enum.InvoiceInfo);
                    obj(this.product_file_info, res.enum.product_file_info);
                    obj(this.if_declare_info, res.enum.if_declare_info);
                    obj(this.is_stock_info, res.enum.is_stock_info);
                });
                listTotal("data/user_list?user_type=101").then(res => {
                    this.purchaseList = res.data;
                });
            },
            select(id,checked) {
                if(checked){
                    this.addForm.checked_items.forEach((items, index) => {
                        items.child.forEach((m, n) => {
                            if (id == m.id) {
                                this.$set(
                                    this.addForm.checked_items[index],
                                    "checked",
                                    true
                                );
                            }
                        });
                    });
                }else{
                    this.addForm.checked_items.forEach((items, index) => {
                        items.child.forEach((m, n) => {
                            if (id == m.id) {
                                this.$set(
                                    this.addForm.checked_items[index],
                                    "checked",
                                    false
                                );
                            }
                        });
                    });
                }
            },
            select_parent() {
                this.addForm.checked_items.forEach((items, index) => {
                    if (!items.checked) {
                        items.child.forEach((m, n) => {
                            m.checked = false;
                        });
                    }
                });
            },
            remoteMethod(query) {
                if (query !== "") {
                    this.loading = true;
                    setTimeout(() => {
                        listTotal("data/member_list?type=2&name=" + query).then(res => {
                            this.supply_list = res.data;
                            this.loading = false;
                        });
                    }, 200);
                } else {
                    this.supply_list = [];
                }
            },
            remoteCas(query) {
                if (query !== "") {
                    this.loadCas = true;
                    setTimeout(() => {
                        listTotal("es/cas/" + query).then(res => {
                            this.cas_list = res.data;
                            this.loadCas = false;
                        });
                    }, 200);
                } else {
                    this.cas_list = [];
                }
            },
            casEven(a) {
                this.addForm.product_name_cn = this.cas_list.filter(item => {
                    return item.cas == a;
                })[0].name_cn;
                this.addForm.product_name = this.cas_list.filter(item => {
                    return item.cas == a;
                })[0].name;
                this.addForm.prod_id = this.cas_list.filter(item => {
                    return item.cas == a;
                })[0].prod_id;
            },
            quantity_change() {
                if (!this.addForm.price) {
                    this.addForm.price = 0;
                }
                this.addForm.total_price =(new Big(this.addForm.price).times(this.addForm.quantity)).toFixed(2)
            },
            price_change() {
                this.addForm.total_price=(new Big(this.addForm.price).times(this.addForm.quantity)).toFixed(2)
            },
            total_change() {
                this.addForm.price =(new Big(this.addForm.total_price).div(this.addForm.quantity)).toFixed(2)
            },
            saveAdd() {
                this.addForms = JSON.parse(JSON.stringify(this.addForm));
                    var arr = [];
                    this.addForms.checked_items.forEach((item, index) => {
                        if (item.checked == true) {
                            arr.push(item);
                        }
                    });
                    this.addForms.checked_items = arr;
                    this.addForms.checked_items.forEach(m => {
                        var brr = [];
                        m.child.forEach(n => {
                            if (n.checked == true) {
                                brr.push(n);
                            }
                        });
                        m.child = brr;
                    });
                var addForm = this.addForm.contract_number;
                this.addForm.contract_number = this.addForm.prefix + this.addForm.postfix;
                this.addForms.contract_number = this.addForms.prefix + this.addForms.postfix;
                this.$emit("saveAdd", this.addForms);
                this.addForm.contract_number = addForm;
                // this.$emit("noticeClose", false);
            },
            addClose() {
                this.addForm = {
                    contract_number: "",
                    contract_numbe_cn: "",
                    contract_number_note: "",
                    name: "",
                    cas: "",
                    product_name: "",
                    product_name_cn: "",
                    brand_id: "",
                    purity: "",
                    quantity: "",
                    quantity_unit: 1,
                    price: "",
                    price_unit: "",
                    total_price: "",
                    purchase_user_id: "",
                    delivery_date: "",
                    invoice_type_id: 1,
                    checked_requirement: "",
                    label_requirement: "",
                    package_requirement: "",
                    package: "",
                    product_file: [],
                    is_stock: 1,
                    note: "",
                    checked_items: "",
                    if_declare: 0
                };
                this.$emit("noticeClose", false);
            }
        }
    };

    function obj(arr, object) {
        for (let i in object) {
            arr.push(object[i]);
        }
    }
</script>