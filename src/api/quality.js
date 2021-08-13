import request from '@/plugin/axios'
export function quality_lists (query) {
  return request({
    url: 'api/v1/quality/order',
    method: 'get',
    params: query
  })
}
export function chemprod_list (query) {
  return request({
    url: 'api/v1/es/cas/' + query,
    method: 'get'
  })
}
export function quality_edit (id) {
  return request({
    url: 'api/v1/quality/order/' + id,
    method: 'get'
  })
}
export function quality_abandon (id, that) {
  return request({
    url: 'api/v1/quality/order/' + id + '/abandon',
    method: 'post',
    data: {
      id
    }
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function quality_upload (data) {
  return request({
    url: 'api/v1/quality/check/upload',
    method: 'post',
    data: data
  })
}
export function quality_deleteFile (material_id, qualityorder_testitem_file_id) {
  return request({
    url: 'api/v1/quality/check/deleteFile',
    method: 'post',
    data: {
      material_id: material_id,
      qualityorder_testitem_file_id: qualityorder_testitem_file_id
    }
  })
}
export function quality_check_create (data, that) {
  that.loading = true
  request({
    url: 'api/v1/quality/check/create',
    method: 'post',
    data
  }).then(res => {
    that.loading = false
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogAdd = false
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
    that.loading = false
  })
}
export function quality_check_update (data, that) {
  request({
    url: 'api/v1/quality/check/' + data.id + '/update',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function quality_check_updateResult (data, that) {
  request({
    url: 'api/v1/quality/check/' + data.id + '/updateResult',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function quality_create (data, that) {
  that.loading=true
  request({
    url: 'api/v1/quality/order/create',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.loading=false
      that.$emit('getValue', 0)
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogAdd = false
      that.$emit('refresh', 1)
    } else {
      that.loading=false
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
      that.loading=false
  })
}
export function testitem (query) {
  return request({
    url: 'api/v1/testitem/getTestItems',
    method: 'get',
    params: query
  })
}
export function testItemIndex (query) {
  return request({
    url: 'api/v1/testitem',
    method: 'get',
    params: query
  })
}

export function firstlevel (query) {
  return request({
    url: 'api/v1/testitem/firstlevel',
    method: 'get',
    params: query
  })
}

export function testitem_create (data, that) {
  that.addForm_loadingSave = true
  request({
    url: 'api/v1/testitem/create',
    method: 'post',
    data
  }).then(res => {
    that.addForm_loadingSave = false
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogAdd = false
      that.addForm = {
        testprodcate_id: '',
        name: '',
        cost: '',
        fee: ''
      }
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
    that.addForm_loadingSave = false
  })
}
export function testitem_update (data, that) {
  that.editForm_loadingSave = true
  request({
    url: 'api/v1/testitem/' + data.id + '/update',
    method: 'post',
    data
  }).then(res => {
    that.editForm_loadingSave = false
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogEdit = false
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
    that.editForm_loadingSave = false
  })
}
export function testitem_reuse (id, that) {
  request({
    url: 'api/v1/testitem/reuse',
    method: 'post',
    data: {
      id: id
    }
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  })
}
export function testitem_destroy (id, that) {
  const h = that.$createElement
  that.$msgbox({
    message: h('p', null, [
      h('span', null, '确定要执行此操作吗？ ')
    ]),
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        request({
          url: 'api/v1/testitem/destroy',
          method: 'post',
          data: {
            ids: id
          }
        }).then(res => {
          if (res && res.code == 0) {
            that.$message({
              message: 'success',
              type: 'success'
            })
            done()
            that.fetchData()
            // if (that.currentPage === 1) {
            //     that.fetchData();
            // } else {
            //     that.currentPage = 1;
            // }
          } else {
            that.$message({
              message: res.msg,
              type: 'success'
            })
          }
        })
      }
      if (action === 'cancel') {
        done()
      }
    }
  })
}
export function member_company (name) {
  return request({
    url: 'api/v1/data/member_list?type=1&name=' + name,
    method: 'get'
  })
}
export function contact_info (id) {
  return request({
    url: 'api/v1/data/contacts_by_member?user_type=103&member_id=' + id,
    method: 'get'
  })
}
export function update_purity (data, that) {
  request({
    url: 'api/v1/quality/order/update_purity',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.purityClose()
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function delivery (id, that) {
  request({
    url: 'api/v1/quality/check/' + id + '/delivery',
    method: 'post',
    data: {
      id
    }
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function sg_index (query) {
  return request({
    url: 'api/v1/sg/index',
    method: 'get',
    params: query
  })
}
export function sg_delete (id, that) {
  const h = that.$createElement
  that.$msgbox({
    message: h('p', null, [
      h('span', null, '确定要执行此操作吗？ ')
    ]),
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        request({
          url: 'api/v1/sg/delete',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          if (res && res.code == 0) {
            that.$message({
              message: 'success',
              type: 'success'
            })
            done()
            that.fetchData()
          } else {
            that.$message({
              message: res.msg,
              type: 'success'
            })
          }
        })
      }
      if (action === 'cancel') {
        done()
      }
    }
  })
}
export function coa_index (query) {
  return request({
    url: 'api/v1/coa/index',
    method: 'get',
    params: query
  })
}
export function coa_delete (id, that) {
  const h = that.$createElement
  that.$msgbox({
    message: h('p', null, [
      h('span', null, '确定要执行此操作吗？ ')
    ]),
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        request({
          url: 'api/v1/coa/delete',
          method: 'post',
          data: {
            id: id
          }
        }).then(res => {
          if (res && res.code == 0) {
            that.$message({
              message: 'success',
              type: 'success'
            })
            done()
            that.fetchData()
          } else {
            that.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      }
      if (action === 'cancel') {
        done()
      }
    }
  })
}
export function generatecoa (query) {
  return request({
    url: 'api/v1/coa',
    method: 'get',
    params: query
  })
}
export function search_coa (query) {
  return request({
    url: 'api/v1/coa/search',
    method: 'get',
    params: {
      query:query
    }
  })
}
export function coa_create (data, that) {
  request({
    url: 'api/v1/coa/create',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.save_loading = false
      that.fetchData()
      that.ids = res.data.id
        // if(res.workflow.enabledTrans['coa.review']){
        //  that.Review_is = true
        //     that.Review_list = res.workflow.enabledTrans['coa.review']
        // }
        if(res.workflow.enabledTrans){
          that.aaa=[]
          that.aaa = that.workflow(res.data.id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa,res.workflow.routes)
          // for(var i in res.workflow.enabledTrans){
          //   var b = []
          //   res.workflow.enabledTrans[i].forEach(j=>{
          //     var c = {
          //       name:res.workflow.i18n?res.workflow.i18n.zh_cn.places[j]:j,
          //       val:j
          //     }
          //     b.push(c)
          //   })
          //   var a = i.substring(0, i.indexOf("."))
          //   var arr = {
          //     id:res.data.id,
          //     need_seal:'',
          //     name:res.workflow.i18n?res.workflow.i18n.zh_cn.transitions[i]:i,
          //     obj:'',
          //     obj_name:i.substring(a.length+1, i.length),
          //     list:b
          //   }
          //   that.aaa.push(arr)
          // }
        }
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
      that.save_loading = false
    }
  }).catch(rr => {
    that.save_loading = false
  })
}
export function coa_review (data, that) {
  request({
    url: 'api/v1/coa/review',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      if(res.workflow.enabledTrans){
        that.aaa = that.workflow(res.data.id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa,res.workflow.routes)
            // for(var i in res.workflow.enabledTrans){
            //     var b = []
            //     res.workflow.enabledTrans[i].forEach(j=>{
            //         var c = {
            //             name:res.workflow.i18n?res.workflow.i18n.zh_cn.places[j]:j,
            //             val:j
            //         }
            //         b.push(c)
            //     })
            //     var a = i.substring(0, i.indexOf("."))
            //     var arr = {
            //         id:res.data.id,
            //         need_seal:'',
            //         name:res.workflow.i18n?res.workflow.i18n.zh_cn.transitions[i]:i,
            //         obj:'',
            //         obj_name:i.substring(a.length+1, i.length),
            //         list:b
            //     }
            //     that.aaa.push(arr)
            // }
        }
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function coa_approve (data, that) {
  request({
    url: 'api/v1/coa/approve',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
        if(res.workflow.enabledTrans){
          that.workflow(res.data.id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa,res.workflow.routes)
            // for(var i in res.workflow.enabledTrans){
            //     var b = []
            //     res.workflow.enabledTrans[i].forEach(j=>{
            //         var c = {
            //             name:res.workflow.i18n?res.workflow.i18n.zh_cn.places[j]:j,
            //             val:j
            //         }
            //         b.push(c)
            //     })
            //     var a = i.substring(0, i.indexOf("."))
            //     var arr = {
            //         id:res.data.id,
            //         need_seal:'',
            //         name:res.workflow.i18n?res.workflow.i18n.zh_cn.transitions[i]:i,
            //         obj:'',
            //         obj_name:i.substring(a.length+1, i.length),
            //         list:b
            //     }
            //     that.aaa.push(arr)
            // }
        }
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function coa_generate (data, that) {
  request({
    url: 'api/v1/coa/generate',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.prod_export_url = res.data.filename
      setTimeout(() => {
        that.$refs.prod_export_url.click()
      }, 200)
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function coa_detail (id,that) {
  return request({
    url: 'api/v1/wf/detail',
    method: 'get',
    params: {
      id:id,
      model:'App\\Model\\Material\\GenerateCoa'
    }
  }).then(res => {
    if (res && res.code == 0) {
      if(res.workflow.enabledTrans){
        that.aaa = []
        that.aaa = that.workflow(id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa,res.workflow.routes)
          // for(var i in res.workflow.enabledTrans){
          //     var b = []
          //     res.workflow.enabledTrans[i].forEach(j=>{
          //         var c = {
          //             name:res.workflow.i18n?res.workflow.i18n.zh_cn.places[j]:j,
          //             val:j
          //         }
          //         b.push(c)
          //     })
          //     var a = i.substring(0, i.indexOf("."))
          //     var arr = {
          //         id:id,
          //         need_seal:'',
          //         name:res.workflow.i18n?res.workflow.i18n.zh_cn.transitions[i]:i,
          //         obj:'',
          //         obj_name:i.substring(a.length+1, i.length),
          //         list:b
          //     }
          //     that.aaa.push(arr)
          // }
        }
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function coa_update (data, that) {
  request({
    url: 'api/v1/coa/update',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.save_loading = false
      that.fetchData()
      if(res.workflow.enabledTrans){
        that.aaa = []
        that.aaa = that.workflow(res.data.id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa,res.workflow.routes)
        }
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
      that.save_loading = false
    }
  }).catch(rr => {
    that.save_loading = false
  })
}
export function inquery_generate (data, that) {
  request({
    url: 'api/v1/coa/inquery_generate',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.save_loading = false
        // if(res.workflow.enabledTrans){
        //   that.aaa=[]
        //   that.aaa = that.workflow(res.data.id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa)
        // }
        that.prod_export_url = res.data.filename
        setTimeout(() => {
          that.$refs.prod_export_url.click()
        }, 200)
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
      that.save_loading = false
    }
  }).catch(rr => {
    that.save_loading = false
  })
}