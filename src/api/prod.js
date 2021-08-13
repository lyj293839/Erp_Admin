import request from '@/plugin/axios'
export function lists (query, method_type) {
  return request({
    url: 'api/v1/' + method_type,
    method: 'get',
    params: query
  })
}
export function prod_grade (query) {
    return request({
        url: 'api/v1/prod/grade',
        method: 'get',
        params: query
    })
}
export function msds_check (data) {
    return request({
        url: 'api/v2/prod/msds/pass/'+data.ids,
        method: 'post',
        data
    })
}
export function msds_check_more (data) {
    return request({
        url: 'api/v2/prod/msds/pass',
        method: 'post',
        data
    })
}
export function msds_reject (data) {
    return request({
        url: 'api/v2/prod/msds/reject/'+data.ids,
        method: 'post',
        data
    })
}

export function chemprod_export (query, method_type) {
  return request({
    url: 'api/v1/prod/export',
    method: 'get',
    params: query
  })
}
export function export_instore_notice (query) {
  return request({
    url: 'api/v1/prod/export_instore_notice',
    method: 'get',
    params: query
  })
}
export function prodcate () {
  return request({
    url: 'api/v1/prodcate',
    method: 'get'
  })
}

export function prod_instore (data,that) {
    that.addForm_loadingSave = true;
    request({
        url: 'api/v1/prod/grade/instore',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogAdd = false
            that.fetchData();
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
        setTimeout(()=>{
            that.addForm_loadingSave = false;
        },500)
    }).catch(rr=>{
        that.addForm_loadingSave = false;
    })
}
export function prod_instore_update (data,that) {
    that.editForm_loadingSave = true;
    request({
        url: 'api/v1/prod/grade/update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogEdit = false
            that.fetchData();
        }else {
            that.$message({
                message: res.msg,
                type: 'success'
            });
        }
        setTimeout(()=>{
            that.editForm_loadingSave = false;
        },500)
    }).catch(rr=>{
        that.editForm_loadingSave = false;
    })
}
export function prodcate_create (data,that) {
  request({
      url: 'api/v1/prodcate/add',
      method: 'post',
      data
  }).then(res => {
    if (res && res.code == 0) {
       that.$message({
            message: 'success',
            type: 'success'
        });
        that.fetchData();
        that.form={
            pid: 0,
            rank:'',
            name:'',
            name_cn: '',
        }
    }
})
}
export function prodcate_update (data,that) {
  request({
      url: 'api/v1/prodcate/'+data.id+'/update',
      method: 'post',
      data
  }).then(res => {
    if (res && res.code == 0) {
        that.$message({
            message: 'success',
            type: 'success'
        });
        that.fetchData();
        that.form={
            pid: 0,
            rank:'',
            name:'',
            name_cn: '',
        }
    }
})
}
export function prodcate_destroy (id) {
  return request({
      url: 'api/v1/prodcate/'+id+'/delete',
      method: 'get',
  })
}
export function chemprod_exportSpec () {
  return request({
    url: 'api/v1/prod/exportspec',
    method: 'get'
  })
}
export function translate (source, target, string) {
  return request({
    url: 'api/v1/translate?source=' + source + '&target=' + target + '&string=' + string,
    method: 'get'
  })
}
export function listTotal (method_type) {
  return request({
    url: 'api/v1/' + method_type,
    method: 'get'
  })
}
export function listTotalPost (method_type,data) {
  if(data){
    return request({
      url: 'api/v1/' + method_type,
      method: 'post',
      data
    })
  }else{
    return request({
      url: 'api/v1/' + method_type,
      method: 'post',
    })
  }
}
export function listTotalPost_smiles (method_type,data) {
  if(data){
    return request({
      url: 'api/v1/' + method_type,
      method: 'post',
      data
    })
  }else{
    return request({
      url: 'api/v1/' + method_type,
      method: 'post',
    })
  }
}
export function listPost (method_type, id, type) {
  return request({
    url: 'api/v1/' + method_type + '/' + id + '/' + type,
    method: 'post',
    data: {
      id: id,
      status: 1
    }
  })
}

export function list_Total (method_type, page) {
  return request({
    url: 'api/v1/' + method_type + '?page=' + page,
    method: 'get'
  })
}

export function create (datas, type, method_type, that) {
  that.save_fy = true
  datas.loading = true
  let data = JSON.parse(JSON.stringify(datas))
  delete data.loading
  request({
    url: 'api/v1/' + type + '/' + method_type,
    method: 'post',
    data
  }).then(res => {
    datas.loading = false
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogAdd=false
      that.fetchData()
      that.$emit('ee', res.data.prod_id)
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
    datas.loading = false
    that.save_fy = false
  })
}
export function edit (type, id) {
  return request({
    url: 'api/v1/' + type + '/' + id,
    method: 'get'
  })
}
export function update (datas, type, method_type, that) {
  that.save_fy = true
  datas.loading = true
  let data = JSON.parse(JSON.stringify(datas))
  delete data.loading
  request({
    url: 'api/v1/' + type + '/' + data.id + '/' + method_type,
    method: 'post',
    data
  }).then(res => {
    datas.loading = false
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.dialogEdit = false
      that.edit_refresh(that.member_id)
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
    datas.loading = false
    that.save_fy = false
  })
}

export function destroy_msds (id,index, that) {
    const h = that.$createElement
    that.$msgbox({
        message: h('p', null, [
            h('span', null, '确定要执行此操作吗？')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                request({
                    url: 'api/v2/prod/msds_del',
                    method: 'post',
                    data: {
                        prod_id:id
                    }
                }).then(res => {
                    instance.confirmButtonLoading = false
                    instance.confirmButtonText = '确定'
                    if (res && res.code == 0) {
                        that.Atlas.forEach((items, i) => {
                            if (index == i) {
                                that.Atlas.splice(i, 1);
                            }
                        });
                        that.$message({
                            message: 'success',
                            type: 'success'
                        })
                        done()

                        // that.fetchData()
                    }
                }).catch(res => {
                    instance.confirmButtonLoading = false
                })
            }
            if (action === 'cancel') {
                done()
            }
        }
    })
}
export function destroy (row, type, method_type, that) {
  const h = that.$createElement
  that.$msgbox({
    message: h('p', null, [
      h('span', null, '确定要执行此操作吗？')
    ]),
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: '确定',
    type: 'warning',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        let ids = [row.id]
        request({
          url: 'api/v1/' + type + '/' + method_type,
          method: 'post',
          data: {
            ids
          }
        }).then(res => {
          instance.confirmButtonLoading = false
          instance.confirmButtonText = '确定'
          // var length = that.list.data.length
          if (res && res.code == 0) {
            that.$message({
              message: 'success',
              type: 'success'
            })
            done()
            // length = length-1
            // if(length == 0){
            //     that.queryList.page = that.queryList.page -1
            //     if(that.queryList.page<=1){
            //         that.queryList.page = 1
            //     }
            // }
            if (that.prod_id) {
              that.$emit('ee', that.prod_id)
              // that.edit_refresh(that.prod_id);
              // that.$emit('refresh',that.prod_id)
              that[type].splice(index, 1)
            } else {
                that.fetchData()
            }
          }
        }).catch(res => {
          instance.confirmButtonLoading = false
        })
      }
      if (action === 'cancel') {
        done()
      }
    }
  })
}
export function destroy_more (ids, type, method_type, that) {
    const h = that.$createElement
    that.$msgbox({
        message: h('p', null, [
            h('span', null, '确定要执行此操作吗？')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                instance.confirmButtonText = '执行中...'
                request({
                    url: 'api/v1/' + type + '/' + method_type,
                    method: 'post',
                    data: {
                        ids
                    }
                }).then(res => {
                    instance.confirmButtonLoading = false
                    instance.confirmButtonText = '确定'
                    // var length = that.list.data.length
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        })
                        done()
                        // length = length-1
                        // if(length == 0){
                        //     that.queryList.page = that.queryList.page -1
                        //     if(that.queryList.page<=1){
                        //         that.queryList.page = 1
                        //     }
                        // }
                        if (that.prod_id) {
                            that.$emit('ee', that.prod_id)
                            // that.edit_refresh(that.prod_id);
                            // that.$emit('refresh',that.prod_id)
                            that[type].splice(index, 1)
                        } else {
                            that.fetchData()
                        }
                    }
                }).catch(res => {
                    instance.confirmButtonLoading = false
                })
            }
            if (action === 'cancel') {
                done()
            }
        }
    })
}
export function check_prod (data) {
  return request({
    url: 'api/v1/chemprod/' + data.id + '/verify',
    method: 'post',
    data
  })
}
export function country_list (data) {
  return request({
    url: 'api/v1/data/country_list',
    method: 'get'
  })
}
export function city_list (data) {
  return request({
    url: 'api/v1/data/' + data + '/city_list',
    method: 'get'
  })
}
export function member_list (name) {
  return request({
    url: 'api/v1/data/member_list?sort=1&name='+name,
    method: 'get'
  })
}
export function prod_testitem (index) {
  return request({
    url: 'api/v2/prod/'+index+'/testitem',
    method: 'get'
  })
}
export function getUserByType (id) {
  return request({
    url: 'api/v1/user/getUserByType?user_type_id=' + id,
    method: 'get'
  })
}
export function providedProdUploadList (query) {
  return request({
    url: 'api/v1/prod/providedProdUploadList',
    method: 'post',
    params: query
  })
}
export function specUploadList (query) {
  return request({
    url: 'api/v1/prod/specUploadList',
    method: 'post',
    params: query
  })
}
export function updateprodredmine (data,that) {
  return request({
    url: 'api/v1/prod/updateprodredmine',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.$emit('ee', data.prod_id)
      that.cancel()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr=>{that.save_fy = false})
}
export function enums () {
  return request({
    url: 'api/v1/enums',
    method: 'get'
  })
}
export function form () {
  return request({
    url: 'api/v1/prod/form',
    method: 'get'
  })
}
export function form_edit (id,check) {
  if(check){
    return request({
    url: 'api/v1/prod/form?id='+id+'&check='+check,
    method: 'get'
  })
  }else{
    return request({
    url: 'api/v1/prod/form?id='+id,
    method: 'get'
  })
  }
}
export function prod_update (data) {
  return request({
    url: 'api/v2/prod/update',
    method: 'post',
    data
  })
}
export function doCreateFromInstock (data) {
  return request({
    url: 'api/v1/inquiry/inquiry/doCreateFromInstock',
    method: 'post',
    data
  })
}
export function prod_verify (data) {
    return request({
        url: 'api/v1/prod/verify',
        method: 'post',
        data
    })
}
export function cas_show(query) {
  return request({
      url: 'api/v1/prod/show?query=' + query,
      method: 'get',
  })
}
export function spec (index) {
  return request({
    url: 'api/v2/prod/'+index+'/spec',
    method: 'get'
  })
}
export function Prod_property (index) {
  return request({
    url: 'api/v2/prod/'+index+'/property',
    method: 'get'
  })
}
export function updateProperty (data,that) {
  return request({
      url: 'api/v2/prod/'+data.id+'/updateProperty',
      method: 'post',
      data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function getStock (index) {
  return request({
    url: 'api/v2/prod/'+index+'/getStock',
    method: 'get'
  })
}
export function getStatistics (index,query) {
  return request({
    url: 'api/v2/prod/'+index+'/getStatistics',
    method: 'get',
    params: query
  })
}
export function spec_create (data,id, that) {
  request({
    url: 'api/v2/prod/spec/'+ id +'/create',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.spec_list()
      that.dialogSpec = false;
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function spec_update (datas, that) {
  let data = JSON.parse(JSON.stringify(datas))
  request({
    url: 'api/v2/prod/spec/' + data.id + '/update',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.spec_list()
      that.dialogSpec = false;
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function spec_delete (ids,that) {
  const h = that.$createElement
  that.$msgbox({
      message: h('p', null, [
          h('span', null, '确定要执行此操作吗？')
      ]),
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning',
      beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              request({
                  url: 'api/v2/prod/spec/' + ids + '/delete',
                  method: 'post',
                  data: {
                      ids
                  }
              }).then(res => {
                  instance.confirmButtonLoading = false
                  instance.confirmButtonText = '确定'
                  if (res && res.code == 0) {
                      that.$message({
                          message: 'success',
                          type: 'success'
                      })
                      done()
                      that.spec_list()
                  }
              }).catch(res => {
                  instance.confirmButtonLoading = false
              })
          }
          if (action === 'cancel') {
              done()
          }
      }
  })
}
export function testitem_create (data,id, that) {
  request({
    url: 'api/v2/prod/testitem/'+ id +'/create',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.testitem_list()
      that.dialogTestitem = false;
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function testitem_update (datas, that) {
  let data = JSON.parse(JSON.stringify(datas))
  request({
    url: 'api/v2/prod/testitem/' + data.id + '/update',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.testitem_list()
      that.dialogTestitem = false;
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function testitem_delete (ids,that) {
  const h = that.$createElement
  that.$msgbox({
      message: h('p', null, [
          h('span', null, '确定要执行此操作吗？')
      ]),
      showCancelButton: true,
      cancelButtonText: '取消',
      confirmButtonText: '确定',
      type: 'warning',
      beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonText = '执行中...'
              request({
                  url: 'api/v2/prod/testitem/' + ids + '/delete',
                  method: 'post',
                  data: {
                      ids
                  }
              }).then(res => {
                  instance.confirmButtonLoading = false
                  instance.confirmButtonText = '确定'
                  if (res && res.code == 0) {
                      that.$message({
                          message: 'success',
                          type: 'success'
                      })
                      done()
                      that.testitem_list()
                  }
              }).catch(res => {
                  instance.confirmButtonLoading = false
              })
          }
          if (action === 'cancel') {
              done()
          }
      }
  })
}
export function ignore (index,that) {
  return request({
    url: 'api/v2/prod/'+index+'/ignore',
    method: 'get',
    params: {
      id:index
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
export function delayNotice (data, that) {
  request({
    url: 'api/v1/prod/delayNotice',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.notice_loading = false
      that.dialogNotice = false
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
      that.notice_loading = false
    }
  }).catch(rr => {
    that.notice_loading = false
  })
}
export function providedSupplierProdUploadIndex (query) {
  return request({
    url: 'api/v1/prod/providedSupplierProdUploadIndex',
    method: 'get',
    params: query
  })
}
export function canSaled (query) {
  return request({
    url: 'api/v2/prod/canSaled',
    method: 'get',
    params: query
  })
}
export function ffmsds_index (query) {
  return request({
    url: 'api/v2/prod/msds',
    method: 'get',
    params: query
  })
}
export function ffmsds_download (data) {
  return request({
    url: 'api/v2/prod/msds/download',
    method: 'post',
    data
  })
}
export function msds_generate_prod (data, that) {
  return request({
    url: 'api/v2/prod/msds',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function setInventory (id) {
    return request({
        url: 'api/v2/prod/setInventory/'+id,
        method: 'get',
    })
}
export function supplier_lists (name) {
    return request({
        url: 'api/v1/data/member_list?type=2&name='+name,
        method: 'get',
    })
}
