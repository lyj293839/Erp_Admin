<template>
    <d2-container>
        <div class="top">
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.hexiao_time_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="核销开始日期"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
            ></el-date-picker>
            -
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.hexiao_time_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="核销结束日期"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
            ></el-date-picker>
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.scan_time_start"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="扫描开始日期"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
            ></el-date-picker>
            -
            <el-date-picker
                    class="date_picker"
                    v-model="queryList.scan_time_end"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="扫描结束日期"
                    style="width:150px;margin: 0 2px;"
                    size="mini"
            ></el-date-picker>
            <el-input
                    v-model="queryList.seller_name"
                    placeholder="销方名称"
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            ></el-input>
            <el-select
                    v-model="queryList.purchaser_name"
                    placeholder="购方名称"
                    filterable
                    clearable
                    size="mini"
                    style="width: 200px;margin: 0 2px;"
            >
                <el-option v-for="(item,key,index) in enums.purchaser_names" :label="key" :key="index" :value="key"></el-option>
            </el-select>
            <el-input
                    v-model="queryList.invoice_number"
                    placeholder="发票号码"
                    clearable
                    size="mini"
                    style="width: 140px;margin: 0 2px;"
            ></el-input>
            <el-select
                    v-model="queryList.p_user_name"
                    filterable
                    placeholder="采购员"
                    style="width:140px;"
                    clearable
                    size="mini"
            >
                <el-option v-for="item in enums.p_user_names" :value="item" :label="item" :key="item"></el-option>
            </el-select>
            <el-select
                    v-model="queryList.hexiao_status"
                    filterable
                    placeholder="核销状态"
                    style="width:140px;"
                    clearable
                    size="mini"
            >
                <el-option v-for="(item,key,index) in enums.hexiao_status" :label="item" :key="key" :value="key"></el-option>
            </el-select>
            <el-button type="primary" :loading="loading_search" @click="search" size="mini" style="margin: 0 2px;">搜索
            </el-button>
            <el-button   type="primary" v-if="permission_names['PuInvoiceRkPz']==='PuInvoiceRkPz'" :loading="loading_excel" @click="excel" size="mini" style="margin: 0 2px;">导出入库凭证</el-button>
            <a :href="export_url" ref="export_url" hidden></a>
        </div>
            <el-table
                :data="InvoiceList.data"
                element-loading-text="Loading"
                border
                fit
                highlight-current-row
                style="font-size: 12px;"
                :row-class-name="tableRowClassName"
        >
            <el-table-column label="ID" width="50">
                <template slot-scope="scope">
                    <el-popover
                            placement="top"
                            width="350"
                            :ref="scope.$index">
                        <el-input size="mini" placeholder="包编号" v-model="scope.row.package_no"></el-input>
                        <el-row>
                            <el-col :span="12">
                                <el-button style="margin: 10px 0" type="warning" size="mini"  @click="doHexiaoPackage(scope.row);scope._self.$refs[scope.$index].doClose()">自动核销</el-button>
                            </el-col>
                            <el-col :span="12">
                                <div style="text-align: right; margin: 10px 0">
                                    <el-button size="mini" type="text" @click="scope._self.$refs[scope.$index].doClose()">取消</el-button>
                                    <el-button type="primary" size="mini" @click="savePackageNo(scope.row);scope._self.$refs[scope.$index].doClose()">确定</el-button>
                                </div>
                            </el-col>
                        </el-row>
                        <span slot="reference" class="pointer" :style="{'color':scope.row.package_no?'red':'','fontWeight':scope.row.package_no?'bold':''}">{{scope.row.id}}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="销方名称">
                <template slot-scope="scope">{{scope.row.seller_name}}</template>
            </el-table-column>
            <el-table-column label="购方名称">
                <template slot-scope="scope">{{scope.row.purchaser_name}}</template>
            </el-table-column>
            <el-table-column label="发票类型" width="130">
                <template slot-scope="scope">{{scope.row.invoice_type}}</template>
            </el-table-column>
            <el-table-column label="税率" width="60">
                <template slot-scope="scope">{{scope.row.rate}}%</template>
            </el-table-column>
            <el-table-column label="发票号码" width="170">
                <template slot-scope="scope">
                    <span v-if="scope.row.invoice_note">
                         <el-popover
                                 placement="top"
                                 width="350"
                         >
                         <span>{{scope.row.invoice_note}}</span>
                        <span slot="reference" class="pointer" style="background:#ff9800;padding:3px">{{scope.row.invoice_number}}</span>
                    </el-popover>
                    </span>
                    <span v-else>{{scope.row.invoice_number}}</span>
                </template>
            </el-table-column>
            <el-table-column label="开票日期" width="90">
                <template slot-scope="scope">{{scope.row.invoice_date?scope.row.invoice_date.split(' ')[0]:''}}</template>
            </el-table-column>
            <el-table-column label="扫描时间" width="90">
                <template slot-scope="scope" >
                    <span class="pointer" @click="getInvoice(scope.row)" :style="{'color':scope.row.is_upload?'rgb(103, 194, 58)':''}">{{scope.row.scan_time?scope.row.scan_time.split(' ')[0]:''}}</span>
                </template>
            </el-table-column>
            <el-table-column label="核销时间" width="90">
                <template slot-scope="scope">{{scope.row.hexiao_time?scope.row.hexiao_time.split(' ')[0]:''}}</template>
            </el-table-column>
            <el-table-column label="开票金额" width="80">
                <template slot-scope="scope">{{scope.row.total}}</template>
            </el-table-column>
            <el-table-column label="核销状态" width="80">
                <template slot-scope="scope">
                    <span class="pointer" @click="goList(scope.row)" :style="{'background':scope.row.hexiao_status==1?'rgb(103, 194, 58)':'','padding':'5px'}">
                        {{enums.hexiao_status[scope.row.hexiao_status]}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="备注">
                <template slot-scope="scope" >
                    <span style="width: 100%;height: 37px;line-height: 37px;display: inline-block;" @click="edit(scope.row)">
                        <span style="width: 100%;display: inline-block;" v-if="scope.row.oldNote&&!scope.row.edit" >{{scope.row.note}}</span>
                        <input  v-focus
                                class="input"
                                v-if="scope.row.edit"
                                v-model="scope.row.note"
                                @blur="saveNote(scope.row.id,scope.row.note)"
                                v-focus
                                type="text">
                      </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="scope.row.tax_number_check==='success'&&scope.row.flag!=0" type="primary" @click="ViewDetail(scope.row.invoice_number,scope.row.rate,scope.row.seller_name,scope.row.purchaser_name)">详情</el-button>
                    <el-tooltip class="item" v-if="scope.row.tax_number_check==='error'&&scope.row.flag!=0" effect="dark" content="购方发票号有误" placement="top-start">
                        <el-button size="mini"  type="info">详情</el-button>
                    </el-tooltip>
                    <el-button size="mini" type="primary" @click="ViewPhotos(scope.row.image)"
                    >照片
                    </el-button>
                    <el-button  size="mini"  type="danger" :loading="scope.row.refundLoading" v-if="scope.row.hexiao_status==1&&scope.row.tax_number_check==='success'&&permission_names['PuInvoiceCancel']=='PuInvoiceCancel'" @click="refund(scope.row)"
                    >退票
                    </el-button>
                    <el-tooltip class="item" v-if="scope.row.hexiao_status==1&&scope.row.tax_number_check==='error'" effect="dark" content="购方发票号有误" placement="top-start">
                        <el-button size="mini"  type="info">退票</el-button>
                    </el-tooltip>
                    <el-button  size="mini"  type="warning" :loading="scope.row.refundLoading" v-if="scope.row.hexiao_status==2&&scope.row.tax_number_check==='success'&&permission_names['PuInvoiceCancel']=='PuInvoiceCancel'" @click="refund(scope.row)"
                    >取消
                    </el-button>
                    <el-tooltip class="item" v-if="scope.row.hexiao_status==2&&scope.row.tax_number_check==='error'" effect="dark" content="购方发票号有误" placement="top-start">
                        <el-button size="mini"  type="info">取消</el-button>
                    </el-tooltip>
                    <el-button  size="mini"  type="info" :loading="scope.row.abandonLoading" v-if="scope.row.hexiao_status==0&&scope.row.flag==1&&permission_names['PuInvoiceFeiqi']=='PuInvoiceFeiqi'" @click="abandon(scope.row)"
                    >废弃
                    </el-button>
                    <el-button  size="mini"  type="info"  v-if="scope.row.hexiao_status==0&&scope.row.flag==0"
                    >已废弃
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="12">
                <el-input size="mini" placeholder="发票号码" v-model="invoice_number" style="width: 120px;display: inline-block;"></el-input>
                <el-button v-if="permission_names['SyncSaomiaoyi']==='SyncSaomiaoyi'" type="primary" :loading="loading_sao" @click="syncSmy" size="mini" style="margin: 0 2px;">同步扫描仪</el-button> |
                <el-button   type="danger"  v-if="permission_names['PuInvoiceAdd']==='PuInvoiceAdd'" @click="addInvoice" size="mini" style="margin: 0 2px;">添加发票</el-button>
                <el-button   type="primary"  @click="unCheck" size="mini" style="margin-top: 10px;">未检测通过的发票</el-button>
                <el-button   type="danger"  @click="goRed" size="mini" style="margin-top: 10px;">红字列表</el-button>
                <el-button   type="warning"  @click="goInvoice" size="mini" style="margin-top: 10px;">上传发票目录</el-button>
                <el-button   type="success"  @click="getQueueCount" size="mini" style="margin-top: 10px;">查看队列数量{{QueueCount}}</el-button>
            </el-col>
            <el-col :span="12" class="d2-text-right"> <el-pagination
                    style="text-align: right;margin-top:10px;display: inline-block;"
                    background
                    :page-sizes="[10,20,50,100]"
                    :page-size="10"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    layout="total,sizes,prev, pager, next"
                    :total="InvoiceList.total"
            ></el-pagination></el-col>
        </el-row>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="80%"
                >
            <!--<el-image-->
                    <!--style="width: 100%;"-->
                    <!--:src="url"-->
                    <!--fit="fill"></el-image>-->
            <img :src="url" style="width: 100%;" alt="">
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="添加发票"
                :visible.sync="dialogInvoice"
                width="85%"
        >
            <el-form :inline="true" :model="invoiceForm" class="demo-form-inline">
                <el-form-item label="销方名称" required="required">
                    <el-autocomplete
                            clearable
                            v-model="invoiceForm.seller_name"
                            :fetch-suggestions="querySearch_"
                            @select="handleSelect_supplier"
                    >
                        <template slot-scope="{ item }">
                            <div>{{ item.name }}</div>
                        </template>
                    </el-autocomplete>
                </el-form-item>
                <el-form-item label="购方名称" required="required">
                    <el-select
                            size="small"
                            v-model="invoiceForm.purchaser_name"
                            filterable
                            clearable
                            @change="getContractDetails"
                    >
                        <el-option v-for="(item,key,index) in enums.purchaser_names" :label="key" :key="key" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票类型" required="required">
                    <el-select
                            size="small"
                            v-model="invoiceForm.invoice_type"
                            filterable
                            clearable
                    >
                        <el-option v-for="(item,index) in enums.invoice_types" :label="item" :key="index" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票编码-号码" required="required">
                    <el-input size="small" v-model="invoiceForm.invoice_number"></el-input>
                </el-form-item>
                <el-form-item label="开票日期" required="required">
                    <el-date-picker
                            size="small"
                            class="date_picker"
                            v-model="invoiceForm.invoice_date"
                            value-format="yyyy-MM-dd"
                            type="date"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="税率" required="required">
                    <el-select
                            size="small"
                            v-model="invoiceForm.tax_rate"
                            filterable
                            clearable
                            style="width: 100px;"
                            @change="change_rate"
                    >
                        <el-option v-for="(item,index) in enums.tax_rates" :label="item" :key="index" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="file"
                        :on-change="fileChange"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                <!--<el-form-item label="不含税金额">-->
                    <!--<el-input style="width: 150px;" readonly v-model="invoiceForm.total_excluding_tax"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="税额">-->
                    <!--<el-input style="width: 150px;" readonly v-model="invoiceForm.total_tax_amount"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="开票金额">-->
                    <!--<el-input style="width: 150px;" readonly v-model="invoiceForm.total"></el-input>-->
                <!--</el-form-item>-->
            </el-form>
            <el-table
                    class="table"
                    :data="invoiceTable.data"
                    element-loading-text="Loading"
                    border
                    fit
                    highlight-current-row
                    style="font-size: 12px;"
                    :row-class-name="tableRowClassName"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column label="合同编号" width="150">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.procurement_contract_number" disabled  clearable size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="产品名称">
                    <template slot-scope="scope">
                        <el-autocomplete
                                size="mini"
                                clearable
                                v-model="scope.row.prod_name"
                                :fetch-suggestions="querySearch"
                                :trigger-on-focus="false"
                                placeholder
                                @select="handleSelect"
                                style="width: 100%;"
                                disabled
                        >
                            <template slot-scope="{ item }">
                                <div>{{item.name_cn}}</div>
                            </template>
                        </el-autocomplete>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="产品规格" width="100">
                    <template slot-scope="scope"><el-input v-model="scope.row.prod_model"  clearable size="mini"></el-input></template>
                </el-table-column> -->
                <el-table-column label="标准单位" width="100">
                    <template slot-scope="scope">
                        <el-select
                                v-model="scope.row.base_unit"
                                filterable
                                clearable
                                size="mini"
                                disabled
                        >
                            <el-option v-for="(item,index) in units" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column width="100">
                    <template slot="header" slot-scope="scope">
                       <span class="red">*</span>标准数量
                    </template>
                    <template slot-scope="scope"><el-input v-model="scope.row.base_quantity"  clearable size="mini"></el-input></template>
                </el-table-column>
                <el-table-column  width="120">
                    <template slot="header" slot-scope="scope">
                        <span class="red">*</span>含税金额
                    </template>
                    <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" @input="change_tax(scope.row)" clearable size="mini"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="税额" width="120">
                    <template slot-scope="scope"><el-input v-model="scope.row.amount_tax_amount"  clearable size="mini"></el-input></template>
                </el-table-column>
                <el-table-column label="不含税金额" width="120">
                    <template slot-scope="scope"><el-input v-model="scope.row.amount_excluding_tax"  clearable size="mini"></el-input></template>
                </el-table-column>
                <!--<el-table-column label="操作" width="120">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button type="primary"  @click="add" size="mini" >添加</el-button>-->
                        <!--<el-button v-if="scope.$index>0" type="primary"  @click="del(scope.$index)" size="mini" >删除</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
            </el-table>
            <el-pagination
                    style="text-align: right;margin-top:10px;"
                    background
                    :page-sizes="[10,20,50,100]"
                    :page-size="10"
                    @size-change="handleSizeChange_invoice"
                    @current-change="handleCurrentChange_invoice"
                    :current-page.sync="currentPage_invoice"
                    layout="total,sizes,prev, pager, next"
                    :total="invoiceTable.total"
            ></el-pagination>
            <div class="total"><span>开票金额:{{invoiceForm.total}}</span><span>税额:{{invoiceForm.total_tax_amount}}</span><span>不含税金额:{{invoiceForm.total_excluding_tax}}</span></div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogInvoice = false" size="small">取 消</el-button>
            <el-button type="primary" @click="invoiceSave" :loading="loadingInvoice" size="small">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
                title="上传发票目录"
                :visible.sync="dialogInvoiceUpload"
                width="50%"
        >
            <el-form status-icon label-width="100px" style="width: 450px;margin: 0 auto;" class="demo-ruleForm">
                <el-form-item label="购方名称" >
                    <el-select
                            v-model="InvoiceUpload.purchaser_name"
                            filterable
                            clearable
                            size="mini"
                            style="width:200px;"
                    >
                        <el-option v-for="(item,key,index) in enums.purchaser_names" :label="key" :key="index" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期" >
                    <el-date-picker
                            class="date_picker"
                            v-model="InvoiceUpload.scan_time"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="日期"
                            style="width:200px;"
                            size="mini"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="上传附件">
                    <el-upload
                            class="upload-demo"
                            ref="upload"
                            :action="upload_api"
                            multiple
                            :headers="headers"
                            list-type="picture-card"
                            :on-success="handleAvatarSuccess"
                            :file-list="InvoiceUpload.file_path">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog
                title="发票目录"
                :visible.sync="dialogInvoiceUploadDetail"
                width="50%"
        >
            <el-form  status-icon label-width="100px" style="width: 450px;margin: 0 auto;" class="demo-ruleForm">
                <el-form-item label="购方名称" >
                    <span style="width:200px;">{{InvoiceUploadDetail.purchaser_name}}</span>
                </el-form-item>
                <el-form-item label="日期" >
                    <span style="width:200px;">{{InvoiceUploadDetail.scan_time}}</span>
                </el-form-item>
                <el-form-item label="附件">
                    <span v-for="i,ind in InvoiceUploadDetail.file_path" :key="ind">
                         <el-image
                                 style="width: 100px; height: 100px;margin: 0 5px;"
                                 :src="i"
                                 :preview-src-list="InvoiceUploadDetail.file_path">
                         </el-image>
                    </span>
                </el-form-item>
            </el-form>
        </el-dialog>
    </d2-container>
</template>

<script>
    import Big from "@/big/a/big.mjs";
    import {getInvoiceList,doCancelHexiao,exportRukuPingzheng,syncSmy,updateNote,feiqi,doCreate,get_prod,packageNo,doHexiaoPackage,uploadInvoiceItem,getInvoiceItem,getQueueCount,getContractDetails} from "@/api/procure"
    import {
        listTotal,
    } from "@/api/prod";
    import util from "@/libs/util";
    export default {
        name: "procure-checkInvoice",
        data() {
            return {
                permission_names: JSON.parse(localStorage.getItem("permission_names")),
                queryList: {
                    page: "1",
                    per_page: 10,
                    hexiao_time_start: "",
                    hexiao_time_end: "",
                    scan_time_start:'',
                    scan_time_end:'',
                    seller_name:"",
                    purchaser_name:'',
                    invoice_number:'',
                    hexiao_status:'',
                    p_user_name:''
                },
                queryInvoiceList:{
                    page: "1",
                    per_page: 10,
                    seller_name:'',
                    purchaser_name:'',
                    hexiao_flag:0
                },
                InvoiceList: [],
                loading_search: false,
                currentPage: 1,
                currentPage_invoice:1,
                url:'',
                dialogVisible:false,
                loading_excel:false,
                loading_sao:false,
                export_url:'',
                dialogInvoice:false,
                invoiceForm:{
                    seller_name:'',
                    purchaser_name:'江苏艾康商贸有限公司',
                    invoice_type:'机打发票',
                    invoice_number:'',
                    invoice_date:'',
                    total:'',
                    tax_rate:'0%',
                    total_tax_amount:'',
                    total_excluding_tax:'',
                    file:''
                },
                invoiceTable:{},
                enums:{},
                InvoiceUpload:{
                    purchaser_name:'',
                    scan_time:'',
                    file_path:[]
                },
                InvoiceUploadDetail:{},
                loadingInvoice:false,
                dialogInvoiceUpload:false,
                dialogInvoiceUploadDetail:false,
                restaurants: [],
                files:null,
                fileList:[],
                upload_api: process.env.VUE_APP_API + "api/v1/puInvoice/uploadItemImg",
                QueueCount:'',
                units:{},
                multipleSelection: [],
                invoice_number:''
            }
        },
        created() {
            this.fetchData()
        },
        computed: {
            headers() {
                const token = util.cookies.get("token");
                return {
                    Authorization: "Bearer " + token,
                    'Version-Number':process.env.VUE_APP_Version
                };
            }
        },
        // computed:{
        //     'invoiceForm.total_tax_amount':function(){
        //         alert(1)
        //        const total_tax_amount= this.invoiceTable.reduce((total,item)=>{return new Big(total).plus(item.total_tax_amount)},0)
        //         return total_tax_amount
        //     },
        //     'invoiceForm.total_excluding_tax':()=>{
        //         const total_excluding_tax= this.invoiceTable.reduce((total,item)=>{return new Big(total).plus(item.total_excluding_tax)},0)
        //         return total_excluding_tax
        //     },
        //     'invoiceForm.total':()=>{
        //         const total= this.invoiceTable.reduce((total,item)=>{return new Big(total).plus(item.amount)},0)
        //         return total
        //     }
        // },
        methods: {
            fetchData() {
                this.loading_search=true
                getInvoiceList(this.queryList).then(res => {
                    this.loading_search=false
                    if (res && res.code == 0) {
                        res.data.data.forEach(res=>{
                            res.rate=((Number(res.total_tax_amount)/Number(res.total_excluding_tax)).toFixed(2))*100
                            res.refundLoading=false
                            res.abandonLoading=false
                            res.edit=false
                            res.oldNote=JSON.parse(JSON.stringify(res.note))
                        })
                        this.InvoiceList = res.data
                        this.enums=res.enum
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.invoiceForm.total_tax_amount=this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(item.amount_tax_amount)},0)
                this.invoiceForm.total_excluding_tax= this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(Number(item.amount_excluding_tax))},0)
                this.invoiceForm.total= this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(Number(item.amount))},0)
            },
            handleSizeChange_invoice(){
                this.queryInvoiceList.per_page=val
                this.fetchData();
            },
            handleCurrentChange_invoice(){
                this.queryInvoiceList.page = this.currentPage_invoice = page_current;
                this.fetchData();
            },
            getContractDetails(){
                this.queryInvoiceList.seller_name=this.invoiceForm.seller_name
                this.queryInvoiceList.purchaser_name=this.invoiceForm.purchaser_name
                getContractDetails(this.queryInvoiceList).then(res => {
                    if (res && res.code == 0) {
                        res.data.data.forEach(item=>{
                            item.prod_name=item.name_cn
                            item.base_unit=item.storage_quantity_unit  
                            item.amount=Number(item.total_price)
                            const tax_rate=parseInt(this.invoiceForm.tax_rate)*0.01
                            item.amount_excluding_tax=new Big(Number(item.total_price)).div(1+tax_rate)
                            item.amount_tax_amount=new Big(Number(item.amount_excluding_tax)).times(tax_rate)
                        })
                        this.invoiceTable = res.data
                        this.units= Object.values(res.enum.units)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {

                })
            },
            getQueueCount(){
                getQueueCount().then(res=>{
                    if(res&&res.code==0){
                        this.QueueCount=res.data
                    }
                })
            },
            savePackageNo(item){
                let obj={
                    id:item.id,
                    package_no:item.package_no
                }
                packageNo(obj).then(res=>{
                    if(res&&res.code===0){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message:  res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            doHexiaoPackage(item){
                doHexiaoPackage({id:item.id}).then(res=>{
                    if(res&&res.code===0){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message:  res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            goList(item){
                this.$router.push({
                    path:'/procure/checkInvoiceList',
                    query:{
                        invoice_number:item.invoice_number,
                        seller_name:item.seller_name,
                        purchaser_name:item.purchaser_name
                    }
                })
            },
            unCheck(){
                 this.$router.push({
                     path:'/procure/checkInvoiceUnCheck'
                 })
            },
            goRed(){
                this.$router.push({
                    path:'/procure/checkInvoiceRedList'
                })
            },
            goInvoice(){
                this.dialogInvoiceUpload=true
            },
            fileChange(file) {
                this.files = file.raw;
                this.fileList=[file]
            },
            fileUploadChange(file){
                this.InvoiceUpload.file_path.push(file.raw)
            },
            handleAvatarSuccess(res, file, fileList) {
                if (file.response.code == 0) {
                    this.InvoiceUpload.file_path.push(res.data.filename);
                } else {
                    this.$message.error(file.response.msg);
                }
            },
            submitForm(){
                uploadInvoiceItem(this.InvoiceUpload).then(res=>{
                    if(res&&res.code===0){
                        this.dialogInvoiceUpload=false
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                })
            },
            getInvoice(item){
                const obj={
                    purchaser_name:item.purchaser_name,
                    scan_time:item.scan_time
                }
                getInvoiceItem(obj).then(res=>{
                    if(res&&res.code===0){
                        this.InvoiceUploadDetail=res.data
                        this.dialogInvoiceUploadDetail=true
                    }
                })
            },
            querySearch(queryString, cb) {
                get_prod(queryString).then(res => {
                    cb(res.data);
                });
            },
            handleSelect(item) {
                this.invoiceTable[0].prod_name=item.name_cn
            },
            invoiceSave(){
                if(!this.invoiceForm.seller_name||!this.invoiceForm.purchaser_name||!this.invoiceForm.invoice_type||!this.invoiceForm.invoice_number||!this.invoiceForm.invoice_date||!this.invoiceForm.tax_rate){
                    this.$message({
                        message: '请输入必填字段！',
                        type: 'success'
                    })
                    return
                }
                const flag=this.invoiceTable.data.some(item=>{
                    return  item.base_quantity&&item.amount_excluding_tax
                })
                if(!flag){
                    this.$message({
                        message: '请输入必填字段！',
                        type: 'success'
                    })
                    return
                }
                this.loadingInvoice=true
                // let obj={
                //     invoice:this.invoiceForm,
                //     details:this.invoiceTable
                // }
                const formData = new FormData();
                // Object.keys(obj).forEach((ele) => {
                //     formData.append(ele, obj[ele]);
                // });
                formData.append('file', this.files);
                formData.append('invoice', JSON.stringify(this.invoiceForm));
                formData.append('details', JSON.stringify(this.multipleSelection));
                doCreate(formData).then(res=>{
                    if (res && res.code == 0) {
                        this.loadingInvoice=false
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.dialogInvoice=false
                        this.fetchData()
                    } else {
                        this.loadingInvoice=false
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                    this.loadingInvoice=false
                })
            },
            change_tax(item){
                const tax_rate=parseInt(this.invoiceForm.tax_rate)*0.01
                item.amount_excluding_tax=(new Big(Number(item.amount)).div(1+tax_rate)).toFixed(2)
                item.amount_tax_amount=(new Big(item.amount_excluding_tax).times(tax_rate)).toFixed(2)
                // item.amount=new Big(item.amount_excluding_tax).times(1+tax_rate)
                // this.invoiceForm.total_tax_amount= this.invoiceTable.data.reduce((total,item)=>{return new Big(total).plus(item.amount_tax_amount)},0)
                // this.invoiceForm.total_excluding_tax= this.invoiceTable.data.reduce((total,item)=>{return new Big(total).plus(Number(item.amount_excluding_tax))},0)
                // this.invoiceForm.total= this.invoiceTable.data.reduce((total,item)=>{return new Big(total).plus(Number(item.amount))},0)
                // this.$forceUpdate()
                 this.invoiceForm.total_tax_amount=this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(item.amount_tax_amount)},0)
                this.invoiceForm.total_excluding_tax= this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(Number(item.amount_excluding_tax))},0)
                this.invoiceForm.total= this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(Number(item.amount))},0)
            },
            change_rate(){
                this.invoiceTable.data.forEach(res=>{
                    const tax_rate=parseInt(this.invoiceForm.tax_rate)*0.01
                    res.amount_excluding_tax= (new Big(Number(res.amount)).div(1+tax_rate)).toFixed(2)
                    res.amount_tax_amount=(new Big(res.amount_excluding_tax).times(tax_rate)).toFixed(2)
                    // res.amount=new Big(res.amount_excluding_tax).times(1+tax_rate)
                })
                // this.invoiceForm.total_tax_amount= this.invoiceTable.data.reduce((total,item)=>{return new Big(total).plus(item.amount_tax_amount)},0)
                // this.invoiceForm.total_excluding_tax= this.invoiceTable.data.reduce((total,item)=>{return new Big(total).plus(Number(item.amount_excluding_tax))},0)
                // this.invoiceForm.total= this.invoiceTable.data.reduce((total,item)=>{return new Big(total).plus(Number(item.amount))},0)
                 this.invoiceForm.total_tax_amount=this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(item.amount_tax_amount)},0)
                this.invoiceForm.total_excluding_tax= this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(Number(item.amount_excluding_tax))},0)
                this.invoiceForm.total= this.multipleSelection.reduce((total,item)=>{return new Big(total).plus(Number(item.amount))},0)
            },
            handleSelect_supplier(item){
                this.invoiceForm.seller_name=item.name
                this.getContractDetails()
            },
            querySearch_(queryString, cb) {
                listTotal("data/member_list?type=2&name=" + queryString).then(res => {
                    cb(res.data);
                });
            },
            addInvoice(){
                this.dialogInvoice=true
            },
            add(){
                this.invoiceTable.push({
                    item_or_note:'',
                    prod_name:'',
                    prod_model:'',
                    prod_unit:'',
                    prod_num:'',
                    base_price:'',
                    amount:'',
                    tax_rate:'',
                    amount_tax_amount:'',
                    amount_excluding_tax:''
                })
            },
            del(index){
                this.invoiceTable.splice(index,1)
            },
            abandon(item){
                item.abandonLoading=true
                feiqi({id:item.id}).then(res => {
                    item.abandonLoading=false
                    if (res && res.code == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                    item.abandonLoading=false
                })
            },
            tableRowClassName({row, rowIndex}) {
                if(row.tax_number_check==='error'){
                    return 'disabled'
                }
            },
            edit(item){
                item.edit=true
                this.$forceUpdate()
            },
            saveNote(id,note){
                updateNote({id,note}).then(res=>{
                    if(res&&res.code===0){
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(error=>{
                    this.$message({
                        message: error.msg,
                        type: 'error'
                    })
                })
            },
            syncSmy(){
                this.loading_sao = true
                syncSmy({invoice_number:this.invoice_number}).then(res=>{
                    if (res && res.code === 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.loading_sao = false
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_sao = false
                    }
                })
            },
            excel(){
                this.loading_excel = true
                exportRukuPingzheng(this.queryList).then(res => {
                    if (res && res.code === 0) {
                        this.export_url = res.data
                        setTimeout(() => {
                            this.$refs.export_url.click()
                            this.loading_excel = false
                        }, 200)
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                        this.loading_excel = false
                    }
                }).catch(rr => {
                    this.loading_excel = false
                })
            },
            handleCurrentChange(page_current) {
                this.queryList.page = this.currentPage = page_current;
                this.fetchData();
            },
            handleSizeChange(val) {
                this.queryList.per_page=val
                this.fetchData();
            },
            search() {
                this.queryList.page = 1;
                this.currentPage=1
                this.fetchData()
            },
            ViewPhotos(url){
                this.url=url,
                this.dialogVisible=true
            },
            ViewDetail(invoice_number,rate,seller_name,purchaser_name){
                this.$router.push({
                    path:'/procure/checkInvoiceDetail',
                    query:{
                        invoice_number:invoice_number,
                        rate:rate+'%',
                        seller_name:seller_name,
                        purchaser_name:purchaser_name
                    }
                })
            },
            refund(item){
                item.refundLoading=true
                doCancelHexiao({invoice_number:item.invoice_number}).then(res => {
                    item.refundLoading=false
                    if (res && res.code == 0) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        this.fetchData()
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(rr => {
                })
            }
        }
    }
</script>

<style scoped>
    .top {
        margin: 10px 0;
    }

    p {
        margin: 5px 0;
    }
    .input{
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        height: 37px;
        line-height: 37px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
     /deep/ .el-table tr.disabled {
        background: #dedad2!important;
    }
    /deep/  .table .cell{
        padding: 0 5px;
    }
    .total{
        text-align: right;
    }
    .total span{
        display: inline-block;
        padding: 10px;
        font-size: 16px;
    }
    /deep/ .el-table__body tr.current-row>td {
        background-color: #bbd4f0;
    }
    .upload-demo{
        display: inline-block;
        margin-top: 5px;
    }
    .blue{
        background: blue;
    }
    .pointer{
        cursor: pointer;
    }
</style>