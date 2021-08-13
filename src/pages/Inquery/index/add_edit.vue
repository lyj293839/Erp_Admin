<template>
  <d2-container>
    <div style="margin: 20px 0px;">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item :label="$t('Inquery.index.add_edit.add_edit1')"><!-- 客户信息 -->
        <table class="table" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
          <tr>
            <td width="200">{{$t('Inquery.index.add_edit.add_edit2')}}</td><!-- 客户名称 -->
            <td width="140">{{$t('Inquery.index.add_edit.add_edit3')}}</td><!-- 联系人 -->
            <td>{{$t('Inquery.index.add_edit.add_edit4')}}</td><!-- 联系电话 -->
            <td>{{$t('Inquery.index.add_edit.add_edit5')}}</td><!-- 邮箱 -->
            <td>{{$t('Inquery.index.add_edit.add_edit6')}}</td><!-- 国家 -->
            <td width="140">{{$t('Inquery.index.add_edit.add_edit7')}}</td><!-- 询单来源 -->
            <td>{{$t('Inquery.index.add_edit.add_edit8')}}</td><!-- 销售负责人 -->
            <td>{{$t('Inquery.index.add_edit.add_edit9')}}</td><!-- QQ联系 -->
            <td>{{$t('Inquery.index.add_edit.add_edit10')}}</td><!-- 传真 -->
          </tr>
          <tr >
            <td>
              <!-- 请输入客户名称 -->
              <el-select
              v-model="form.cust_id"
              filterable
              clearable
              remote
              size="small"
              reserve-keyword
              :placeholder="$t('Inquery.index.add_edit.add_edit11')"
              :remote-method="remoteMethod"
              :loading="loading"
              @change="get_custcontact_id(form.cust_id)"
              style="width: 100%;"
              >
                <el-option :style="{color:item.is_stop==2?'red':''}" v-for="item in customers"  :key="item.id" :label="item.name+'-'+(item.countries&&item.countries.Cname?item.countries.Cname:'无国家')+(item.is_stop==1?'':'-停用')" :value="item.id" :disabled="item.disabled||item.is_stop==2"></el-option>
              </el-select>
            </td>
            <td>
              <el-select
              v-model="form.custcontact_id"
              filterable
              size="small"
              placeholder="Please Select"
              @change="select_contact(form.custcontact_id)"
              style="width: 100%;"
              >
              <el-option v-for="(i,index) in contacts_lists" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </td>
            <td><el-input v-model="form.cust_phone" size="small"></el-input></td>
            <td>
              <el-input v-model="form.cust_email" size="small"></el-input>
            </td>
            <td><el-input v-model="form.country_code" size="small"></el-input></td>
            <td>
              <el-select
              v-model="form.resource_id"
              filterable
              size="small"
              placeholder="Please Select"
              style="width: 100%;"
              @change="select_resource_id(form.resource_id)"
              >
              <el-option v-for="(i,index) in resources" :key="i.id" :label="i.name" :value="i.id"></el-option>
              </el-select>
            </td>
            <td>
             <el-select
                v-model="form.assignsaler_id"
                filterable
                size="small"
                placeholder="Please Select"
                style="width: 100%;"
                @change="change_assignsaler(form.assignsaler_id)"
                :disabled='!responsible_select'
                >
                <el-option v-for="(i,index) in GEnums.Sales" :key="i.id" :label="i.name" :value="i.id"></el-option>
                </el-select>
            </td>
            <td><el-input v-model="form.cust_qq" size="small"></el-input></td>
            <td><el-input v-model="form.cust_fax" size="small"></el-input></td>
          </tr>
        </table>
        </el-form-item>
        <el-form-item :label="$t('Inquery.index.add_edit.add_edit12')"><!-- 操作 -->
        <el-button type="primary" @click="onSubmit" :loading="loading?true:false"  size="mini">{{$t('Inquery.index.add_edit.add_edit13')}}</el-button><!-- 保存 -->
        </el-form-item>
        <el-form-item :label="$t('Inquery.index.add_edit.add_edit14')"><!-- 文件上传 -->
          <el-upload
                  style="display: inline-block;margin: 0 10px;"
                  class="upload-demo"
                  :action="upload_api"
                  :data="pramas"
                  :headers="headers"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="5"
                  :on-exceed="handleExceed"
                  :on-success="handleAvatarSuccess"
                  :file-list="fileList"
          >
            <el-button size="mini" type="primary">{{$t('Inquery.index.add_edit.add_edit14')}}</el-button><!-- 文件上传 -->
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('Inquery.index.add_edit.add_edit15')"><!-- 产品信息 -->
        <table  class="table" border="1" bordercolor="#E5E5E5" style="margin: 5px 0;">
          <tr>
            <td>{{$t('Inquery.index.add_edit.add_edit16')}}</td><!-- CAS -->
            <td>{{$t('Inquery.index.add_edit.add_edit17')}}</td><!-- 国外ID -->
            <td>{{$t('Inquery.index.add_edit.add_edit18')}}</td><!-- 中文名称 -->
            <td>{{$t('Inquery.index.add_edit.add_edit19')}}</td><!-- 英文名称 -->
            <td>{{$t('Inquery.index.add_edit.add_edit20')}}</td><!-- 数量 -->
            <td>{{$t('Inquery.index.add_edit.add_edit21')}}</td><!-- MDL号 -->
            <td>{{$t('Inquery.index.add_edit.add_edit22')}}</td><!-- 规格要求 -->
            <td>{{$t('Inquery.index.add_edit.add_edit23')}}</td><!-- 备注 -->
          </tr>
          <tr >
            <td>
              <el-autocomplete
                      v-model="form.cas"
                      size="small"
                      :fetch-suggestions="querySearchAsync"
                      :placeholder="$t('Inquery.index.add_edit.add_edit24')"
                      :debounce=0
                      style="width: 100%;"
                      @select="((item)=>handleSelect(item))"
              >
                <template slot-scope="{ item }"><!-- 请输入CAS -->
                  <div class="mac">{{ item.cas }}</div>
                </template>
              </el-autocomplete>
            </td>
            <td><el-input v-model="form.prodno" size="small"></el-input></td>
            <td><el-input v-model="form.name_cn" size="small"></el-input></td>
            <td><el-input v-model="form.name" size="small"></el-input></td>
            <td><el-input v-model="form.quantity" size="small"></el-input></td>
            <td><el-input v-model="form.mdl" size="small"></el-input></td>
            <td><el-input v-model="form.specification" size="small"></el-input></td>
            <td><el-input v-model="form.note" size="small"></el-input></td>
          </tr>
        </table>
        </el-form-item>
        <el-form-item :label="$t('Inquery.index.add_edit.add_edit25')"><!-- 邮件主题 -->
          <el-input v-model="form.title" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Inquery.index.add_edit.add_edit26')"><!-- 邮件内容 -->
          <quill-editor
            v-model="form.content"
            :options="newOption"
            style="height: 200px;margin-bottom: 84px;line-height: 22px;"
          ></quill-editor>
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { resources,customer_lists, contact_info, create, cas_info,inquiry_edit,inquiry_update} from "@/api/Inquery";
import util from "@/libs/util";
export default {
  name: "Inquery-add_edit",
  data() {
    return {
      newOption: {},
      customers: [],
      contacts_lists: [],
      cas_list: [],
      form: {
        id: "",
        product_img: [],
        leadtime: "",
        note: "",
        attention: "",
        cust_id: "",
        country_code: "",
        cust_qq:'',
        cust_fax:'',
        cust_email:'',
        cust_phone:'',
        cust_po: "",
        level: "",
        custcontact_id: "",
        resource_id: "",
        assignsaler_id: "",
        assignsaler_name: "",
        title: "",
        content: "",
        purchaseuser_id: "",
        cas: "",
        quantity: "",
        name: "",
        name_cn: "",
        mdl: "",
        prodno:'',
        prod_id: "",
        specification:'',
        note:''
      },
      fileList: [],
      pramas: {},
      upload_api: process.env.VUE_APP_API + "api/v1/inquiry/inquiry/uploadFile",
      loading: false,
      resources:[],
      origin:[],
      responsible_select:true
    };
  },
  watch: {
    $route (to, from) {
        if(to.name=='Inquery-add_edit'){
          if (this.$route.query.id) {
            inquiry_edit(this.$route.query.id).then(res=>{
                if(res&&res.code==0){
                    contact_info(res.data.cust_id).then(res => {
                        this.contacts_lists = res.data;
                    });
                    this.customers=[]
                    this.customers.push(res.data.customer)
                    res.data.product_img.forEach((items,index)=>{
                        this.origin.push(items)
                        this.fileList.push({
                            name:'1',
                            url:items
                        })

                    })
                    this.form={
                            cas: res.data.cas,
                            name: res.data.name,
                            name_cn: res.data.name_cn,
                            note:res.data.note,
                            mdl: res.data.mdl,
                            prod_id:  res.data.prod_id,
                            prodno:  res.data.prodno,
                            product_img: res.data.product_img,
                            quantity: res.data.quantity,
                            specification: res.data.specification,
                            leadtime: res.data.leadtime,
                            attention: res.data.attention,
                            cust_id: res.data.cust_id,
                            country_code: res.data.country_code,
                            cust_po: res.data.cust_po,
                            level: res.data.level,
                            custcontact_id: res.data.custcontact_id,
                            resource_id: res.data.resource_id,
                            assignsaler_id: res.data.assignsaler_id,
                            assignsaler_name:res.data.assignsaler?res.data.assignsaler.name:'',
                            title: res.data.email?res.data.email.title:'',
                            content: res.data.email?res.data.email.content:'',
                            purchaseuser_id: res.data.purchaseuser_id,
                            cust_qq:res.data.cust_qq,
                            cust_fax:res.data.cust_fax,
                            cust_email:res.data.cust_email,
                            cust_phone:res.data.cust_phone,
                    }
                }
            })
          }
        }
    }
  },
  created() {
      this.fetchData();
      if (this.$route.query.id) {
          inquiry_edit(this.$route.query.id).then(res=>{
              if(res&&res.code==0){
                  customer_lists(res.data.cust_name).then(res => {
                      if(res.data[0].responsible_persons&&res.data[0].responsible_persons.length>0){
                          this.responsible_select=false
                      }else{
                          this.responsible_select=true
                      }
                  });
                  contact_info(res.data.cust_id).then(res => {
                      this.contacts_lists = res.data;
                  });
                  this.customers=[]
                  this.customers.push(res.data.customer)
                  if(res.data.product_img && res.data.product_img!=''&&res.data.product_img!=null){
                      res.data.product_img.forEach((items,index)=>{
                          this.origin.push(items)
                          this.fileList.push({
                              name:items,
                              url:items
                          })
                      })
                  }
                  this.form={
                      cas: res.data.cas,
                      name: res.data.name,
                      name_cn: res.data.name_cn,
                      note:res.data.note,
                      mdl: res.data.mdl,
                      prod_id:  res.data.prod_id,
                      prodno:  res.data.prodno,
                      product_img: res.data.product_img,
                      quantity: res.data.quantity,
                      specification: res.data.specification,
                      leadtime: res.data.leadtime,
                      attention: res.data.attention,
                      cust_id: res.data.cust_id,
                      country_code: res.data.country_code,
                      cust_po: res.data.cust_po,
                      level: res.data.level,
                      custcontact_id: res.data.custcontact_id,
                      resource_id: res.data.resource_id,
                      assignsaler_id: res.data.assignsaler_id,
                      assignsaler_name:res.data.assignsaler?res.data.assignsaler.name:'',
                      title: res.data.email?res.data.email.title:'',
                      content: res.data.email?res.data.email.content:'',
                      purchaseuser_id: res.data.purchaseuser_id,
                      cust_qq:res.data.cust_qq,
                      cust_fax:res.data.cust_fax,
                      cust_email:res.data.cust_email,
                      cust_phone:res.data.cust_phone,
                  }
              }
          })
    }
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
  methods: {
    ...mapActions("d2admin/page", ["closeInqueryAdd","close"]),
     change_assignsaler(id){
          this.form.assignsaler_name =this.GEnums.Sales[id].name;
    },
    select_contact(id){
          this.contacts_lists.forEach((items,index)=>{
              if(id==items.id){
                  this.form.cust_phone=items.phone
                  this.form.cust_email=items.cust_email
                  this.form.cust_qq=items.cust_qq
                  this.form.cust_fax=items.cust_fax
              }
          })
    },
    querySearchAsync(queryString, cb) {
      if (queryString != "") {
        cas_info(queryString).then(res => {
          var restaurants = res.data;
          var results = queryString
            ? restaurants.filter(this.createFilter(queryString))
            : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
        });
      }
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.cas.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
        this.form.cas=item.cas;
        this.form.name=item.name;
        this.form.name_cn=item.name_cn;
        this.form.mdl=item.mdl;
        this.form.note=item.note;
        this.form.prod_id=item.prod_id;
        this.form.prodno=item.prodno;
    },
    fetchData() {
        this.responsible_select=true
        this.origin=[]
        resources().then(res=>{
            this.resources=res.enum.resources
        })
    },
    cancel() {
      this.$emit("getValue", 0);
    },
    select_resource_id(id) {
        if(this.responsible_select){
          this.form.assignsaler_id = "";
          this.form.assignsaler_name = "";
          this.resources.forEach((items, index) => {
            if (items.id == id) {
              this.form.assignsaler_id = items.user.id;
              this.form.assignsaler_name = items.user.username;
            }
          });
        }
    },
    get_custcontact_id(id) {
      this.form.custcontact_id = "";
      this.customers.forEach((items, index) => {
        if (items.id == id) {
          this.form.country_code = items.country_code;
          this.form.level = items.level_id;
            if(items.responsible_persons&&items.responsible_persons.length>0){
                this.responsible_select=false
                this.form.assignsaler_id =items.responsible_persons[0].users.id;
                this.form.assignsaler_name =items.responsible_persons[0].users.username;
            }else{
                this.responsible_select=true
                this.form.assignsaler_id = "";
                this.form.assignsaler_name = "";
            }
        }
      });
        contact_info(id).then(res => {
            this.contacts_lists = res.data;
            if(this.contacts_lists.length>0){
                this.form.custcontact_id = this.contacts_lists[0].id;
                this.select_contact(this.form.custcontact_id)
            }
        });
    },
    remoteMethod(query) {
      if (query !== " ") {
        this.loading = true;
        setTimeout(() => {
          customer_lists(query).then(res => {
              this.customers = res.data;
            this.customers.forEach((items, index) => {
                if (items.country_code) {
                    this.customers[index].disabled = false;
                }else{
                    this.customers[index].disabled = true;
                }
            });
              this.loading = false;
          });
        }, 200);
      } else {
        this.customers = [];
      }
    },
    onSubmit() {
        if(this.$route.query.id){
            this.form.id=this.$route.query.id
            inquiry_update(this.form,this.$route.query.id,this,this.$route.query.cookie_name);
        }else{
            create(this.form, "inquiry", this,'edit');
        }
    },
      handleRemove(file, fileList) {
          this.origin.forEach((items,index)=>{
              if(file.name==items){
                  this.form.product_img.splice(index,1)
              }
          })
      },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$i18n.locale=='cn'?this.$message.warning("当前限制选择5个文件"):this.$message.warning("Current limit of 5 files")
    },
    handleAvatarSuccess(res, file, fileList) {
      if (file.response.code == 0) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.product_img.push(res.data.filename);
        this.origin.push(res.data.origin)
      } else {
        this.$message.error(file.response.msg);
      }
    },
    beforeRemove(file, fileList) {
      return this.$i18n.locale=='cn'?this.$confirm(`确定移除 ${file.name}？`):this.$confirm(`Confirm removal ${file.name}？`)
    }
  }
};
</script>

<style scoped>
  table {
    border-collapse: collapse;
  }
   /deep/ .table .el-input__inner {
    border: none;
  }
  th,td{
    text-align: center;
  }
</style>
