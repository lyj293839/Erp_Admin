<style lang="scss" scoped type="text/scss">
.heard {
  margin: 10px 0px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  text-align: right;
  .el-button {
    margin-left: 5px;
  }
}
/deep/.el-dialog__body{
  padding: 0px;
}
</style>
<template>
  <d2-container>
    <div class="heard">
      <el-input
          v-model="queryList.origin"
          clearable
          placeholder="文件名"
          size="mini"
          style="width:150px;margin:0px 5px;"
        ></el-input>
           <el-date-picker
            v-model="queryList.start"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="开始日期"
            size="mini"
            style="width: 130px;"
            clearable
          ></el-date-picker>
          <el-date-picker
            v-model="queryList.end"
            value-format="yyyyMMdd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="结束日期" 
            size="mini"
            style="width: 130px;margin-left:5px;"
            clearable
          ></el-date-picker>
        <el-button
          type="primary"
          size="mini"
          :loading="loading_search"
          @click="sbaoSearch"
        >{{$t('wareHouse.xunit.searchButton')}}</el-button>
      <el-upload
        style="display: inline-block;"
        class="upload-demo"
        ref="upload"
        :action="upload_api"
        :data="form"
        :headers="headers"
        :before-remove="beforeRemove"
        multiple
        accept=".pdf,.zip"
        :on-success="handleAvatarSuccess"
        :auto-upload="true"
        :file-list="fileList"
      >
        <el-button size="mini" type="primary" @click="onSubmit" v-if="permission_names['sg.create']=='sg.create'">上传</el-button>
      </el-upload>
      <a :href="prod_export_url" ref="prod_export_url" hidden></a>
      <a :href="file_url" ref="file_url_down" :download="file_name"></a>
      <!-- <el-button type="primary" @click="onSubmit" size="mini">提交</el-button> -->
    </div>
    <!-- 页面 -->
    <el-table :data="list.data" border fit highlight-current-row size="mini">
      <el-table-column label="编号" width="80">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="批次号" width="140">
        <template slot-scope="scope">{{scope.row.batchno}}</template>
      </el-table-column>
      <el-table-column label="文件原名">
        <template slot-scope="scope">{{scope.row.origin}}</template>
      </el-table-column>
      <el-table-column label="上传者" width="80">
        <template slot-scope="scope">{{getEnumValue(Users,scope.row.user_id)}}</template>
      </el-table-column>
      <el-table-column label="上传时间" width="160">
        <template slot-scope="scope">{{scope.row.created_at}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="preview(scope.row.url)">预览</el-button>
          <el-button
            type="success"
            size="mini"
            @click="downloadPDF(scope.row.url,scope.row.origin,scope.row.postfix)"
          >下载</el-button>
          <!-- <el-button type="success" size="mini" @click="doExport(scope.row)">下载</el-button> -->
          <el-button type="danger" size="mini" v-if="permission_names['sg.delete']=='sg.delete'" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="预览"
      :visible.sync="viewVisible"
      :width="width_pdf=='100%'?width_pdf:(width_pdf+'px')"
      :top="top_pdf"
      @close="close_pdf()"
    >
      <div class="pdf" v-show="fileType === 'pdf'">
        <div style="display:flex;justify-content:space-between;padding:10px 20px;">
          <div>
            <el-button type="primary" size="mini" @click="change1">上一页</el-button>
            <el-button type="primary" size="mini" @click="change2">下一页</el-button>
            <!-- <el-button type="primary" size="mini" @click="clock">旋转</el-button> -->
          </div>
          <div>
            <el-button
              size="mini"
              :class="{select:idx==0}"
              @touchstart="idx=0"
              @touchend="idx=-1"
              @click="scaleD"
              icon="el-icon-zoom-in"
            ></el-button>
            <el-button
              size="mini"
              :class="{select:idx==1}"
              @touchstart="idx=1"
              @touchend="idx=-1"
              @click="scaleX"
              icon="el-icon-zoom-out"
            ></el-button>
            <el-button type="primary" size="mini" @click="scaleY">全屏</el-button>
          </div>
        </div>
        <br />
        <div>
          <pdf
            ref="pdf"
            :src="pdfsrc"
            :page="i"
            :rotate="pageRotate"
            @num-pages="pageCount = $event"
            @page-loaded="i = $event"
            style="100%"
          ></pdf>
        </div>
      </div>
    </el-dialog>
    <!-- 分页 -->

    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="total,sizes,prev, pager, next"
      :page-sizes="[15,20,50,100]"
      :total="list.total"
      @size-change="handleSizeChange"
      :page-size="list.per_page"
    ></el-pagination>
  </d2-container>
</template>
<script>
import pdf from "@/vue-pdf/src/vuePdfSss";
import axios from "axios";
import util from "@/libs/util";
import { sg_index, sg_create, sg_delete } from "@/api/quality";
import { specUploadList } from "@/api/prod";
export default {
  name: "Quality-sg",
  components: {
    pdf
  },
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem("permissions")),
      permission_names: JSON.parse(localStorage.getItem("permission_names")),
      list: [],
      form: {
        mark: "Spectrogram"
      },
      fileList: [],
      upload_api: process.env.VUE_APP_API + "api/v1/sg/create",
      currentPage: 1,
      pageCount: 1,
      queryList: {
        page: "1",
        start: "",
        end: "",
        origin:'',
        per_page:15
      },
      loading_search:false,
      prod_export_url:'',
      Users: [],
      width_pdf: 1000,
      top_pdf: "15vh",
      viewVisible: false,
      i: 1,
      pdfsrc: "",
      pageRotate:0,
      fileType: "pdf",
      scale: 100, //放大系数
      idx: -1,
      inputStyWidth:'',
      file_url:'',
      file_name:''
    };
  },
  watch: {
    $route(to, from) {
      if (to.name == "Quality-sg"){
        this.fetchData();
      }
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
  created() {
    this.fetchData();
    var lett = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key == 13) {
        lett.sbaoSearch()
      }
    }
  },
  methods: {
    fetchData() {
      if(!this.queryList.origin){
        delete this.queryList.origin
      }
      if(!this.queryList.start){
        delete this.queryList.start
      }
      if(!this.queryList.end){
        delete this.queryList.end
      }
      sg_index(this.queryList).then(res => {
        this.list = res.data;
        this.list.per_page = parseInt(res.data.per_page)
        this.Users = this.GEnums.Users;
        this.loading_search=false
      });
    },
    clock(){
      this.pageRotate += 90 
    },
    change1() {
      if (this.i > 1) {
        this.i--;
      }
    },
    change2() {
      if (this.i < this.pageCount) {
        this.i++;
      }
    },
    scaleD() {
      // this.scale += 5;
      // this.width_pdf = parseInt(this.scale + 60) - 100 + "%";
      this.width_pdf = this.width_pdf+100
    },
    scaleX() {
      // if (this.scale == 80) {
      //   return;
      // }
      // this.scale += -5;
      // this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      // this.width_pdf = parseInt(this.scale + 60) - 100 + "%";
      if(this.width_pdf>500){
        this.width_pdf = this.width_pdf-100
      }
    },
    scaleY() {
      this.width_pdf = "100%";
      this.top_pdf = "0vh";
    },
    preview(url) {
      if (!/\.(pdf|PDF)$/.test(url)) {
        // 非pdf文件
        return false;
      } else {
        this.pdfsrc = pdf.createLoadingTask(url);
        this.viewVisible = true;
        this.newAddBtn()
      }
    },
    newAddBtn(){
    let me = this;
    this.$nextTick(function () {
        me.inputStyWidth = me.$refs.pdf.$el.clientWidth + 'px';
        console.log(me.inputStyWidth)
      })
    },
    close_pdf() {
      this.viewVisible = false
      this.width_pdf = 1000;
      this.top_pdf = "15vh";
      this.i = 1
      this.pageCount = 1
      this.pdfsrc = ''
      this.pageRotate = 0
    },
    downloadPDF(urls,fileName,type){
            // axios({
            //     method: 'get',
            //     responseType: 'arraybuffer',
            //     url: url,
            // }).then(function(res){
            //         //调用下载方法，把后端传过来的流传给fileDownload方法
            //         this.fileDownload(res.data, fileName);
            //     }.bind(this)
            // )
            // .catch(
            //     function(error) {
            //         this.$Message.error("网络请求出错")
            //         //调试阶段可以看看报的什么错
            //         //console.log("error",error)
            //         this.$message({
            //           message: error,
            //           type: "error"
            //         });
            //     }.bind(this)
            // );
            if(type=='pdf'){
                axios({
                    method: 'get',
                    responseType: 'arraybuffer',
                    url: urls,
                }).then(function(res){
                        //调用下载方法，把后端传过来的流传给fileDownload方法
                        this.fileDownload(res.data, fileName);
                    }.bind(this)
                )
                .catch(
                    function(error) {
                        this.$Message.error("网络请求出错")
                        //调试阶段可以看看报的什么错
                        //console.log("error",error)
                        this.$message({
                          message: error,
                          type: "error"
                        });
                    }.bind(this)
                );
            }else{
              // this.file_url = url
              // this.file_name = fileName
              // setTimeout(() => {
              //     this.$refs.file_url_down.click()
              // }, 200)
              const url = urls
              const link = document.createElement('a')
              link.style.display = 'none'
              link.href = url
              link.setAttribute(
                'download',
                fileName
              )
              document.body.appendChild(link)
              link.click()
            }
        },
    fileDownload(data, fileName) {
      let blob = new Blob([data], {
        //type类型后端返回来的数据中会有，根据自己实际进行修改
        type: "application/pdf;charset-UTF-8"
      });
      let filename = fileName || "报表.xls";
      if (typeof window.navigator.msSaveBlob !== "undefined") {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var blobURL = window.URL.createObjectURL(blob);
        // 创建隐藏<a>标签进行下载
        var tempLink = document.createElement("a");
        tempLink.style.display = "none";
        tempLink.href = blobURL;
        tempLink.setAttribute("download", filename);
        if (typeof tempLink.download === "undefined") {
          tempLink.setAttribute("target", "_blank");
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
      }
    },
    doExport(item){
      this.prod_export_url = item.url
          setTimeout(() => {
            this.$refs.prod_export_url.click()
          }, 200)
    },
    del(id) {
      sg_delete(id, this);
    },
    sbaoSearch() {
      this.loading_search=true
      this.queryList.page = 1;
      this.currentPage=1
      this.fetchData();
    },
    handleSizeChange(val) {
      this.queryList.per_page = val;
      this.fetchData();
    },
    handleCurrentChange(page_current) {
      this.queryList.page = this.currentPage = page_current;
      this.fetchData();
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file, fileList) {
      if (file.response.code == 0) {
        this.$message({
          message: "success",
          type: "success"
        });
        this.form = {
          mark: "Spectrogram"
        };
        this.fileList = [];
        sg_index(this.queryList).then(res => {
          this.list = res.data;
        });
      } else {
        this.$message.error(file.response.msg);
      }
    },
    onSubmit() {
      this.$refs.upload.submit();
    }
  }
};
</script>
