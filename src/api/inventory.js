import request from '@/plugin/axios'
export function lists (query,method_type) {
    return request({
        url: 'api/v1/inventory/'+method_type,
        method: 'get',
        params: query
    })
}
export function listTotal(method_type) {
    return request({
        url: 'api/v1/'+method_type,
        method: 'get',
    })
}

export function split_packaging_view(inventory_id,package_id,inventory_shelve_id,page) {
    return request({
        url: 'api/v1/inventory/split_packaging_view',
        method: 'get',
        params: {
            inventory_id:inventory_id,
            package_id:package_id,
            inventory_shelve_id:inventory_shelve_id,
            page:page
        }
    })
}

export function split_packaging (data,that) {
    request({
        url: 'api/v1/inventory/split_packaging',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData();
            that.splitDialog=false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function change_checked_result (data,that) {
    request({
        url: 'api/v1/inventory/change_checked_result',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData();
            that.test_statusDialog=false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function sample_cancle (data,that) {
    request({
        url: 'api/v1/sample/cancle',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData();
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function cancleByBuy (data,batchno,that) {
    request({
        url: 'api/v1/sample/cancleByBuy',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            // that.fetchData();
            that.testClick_a(batchno)
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function create (datas,type,method_type,that) {
    that.save_fy = true
    datas.loading=true
    let data= JSON.parse(JSON.stringify(datas));
    delete data.loading
    request({
        url: 'api/v1/'+type+'/'+method_type,
        method: 'post',
        data
    }).then(res => {
        datas.loading=false
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData();
            that.profitDialog = false
            that.dialogAdd=false
            that.allot_Dialog=false
            that.profitLoss_Dialog = false
            that.test_Dialog = false
            that.recheck_Dialog = false
            that.testitems = []
            that.packe_loading = false
            that.save_fy = false
            that.close_test()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.packe_loading = false
            that.save_fy = false
        }
        that.button_status = false
    }).catch(rr=>{
        datas.loading=false
        that.packe_loading = false
        that.save_fy = false
    })
}
export function listPost(query,method_type) {
    return request({
        url: 'api/v1/'+method_type,
        method: 'post',
        params: query
    })
}
export function getPreoutInfo(id) {
    return request({
        url: 'api/v2/instore/'+id+'/getPreoutInfo',
        method: 'post',
    })
}

export function lists_v2 (query) {
    return request({
        url: 'api/v2/instore',
        method: 'get',
        params: query
    })
}
export function spec (index) {
    return request({
      url: 'api/v2/prod/'+index+'/spec',
      method: 'get'
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
        that.spec_list(that.spec_id)
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
        that.spec_list(that.spec_id)
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
                        that.spec_list(that.spec_id)
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
export function profit_create (data,method_type,that) {
    request({
        url: 'api/v1/inventory/'+method_type,
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
          that.$message({
            message: "success",
            type: "success"
          });
          if(data.type==3){
            that.loading_profit = false
            that.close_profit();
          }else if(data.type==4){
            that.loading_profitLoss = false
            that.close_profitLoss();
          }else{
              that.loading_allot = false
              that.close_allot()
          }
          that.fetchData();
        } else {
          that.$message({
            message: res.msg,
            type: "error"
          });
          that.loading_allot = false
          that.loading_profit = false
          that.loading_profitLoss = false
        }
      })
      .catch(rr => {
        that.loading_allot = false
        that.loading_profit = false
        that.loading_profitLoss = false
      });
}
export function changeAppearance (datas,that) {
    let data= JSON.parse(JSON.stringify(datas));
    request({
        url: 'api/v1/inventory/changeAppearance',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.close_revise()
            that.fetchData()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function form_all (query) {
    return request({
        url: 'api/v2/inventory/form_all',
        method: 'get',
        params: query
    })
}
export function unit_change (query) {
    return request({
        url: 'api/v1/data/unit_change',
        method: 'get',
        params: query
    })
}
export function sample_export(query) {
    return request({
      url: 'api/v1/sample/export',
      method: 'post',
      params: query
    })
  }
  export function deleteSpectrogram (ids,that) {
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
                    url: 'api/v1/inventory/deleteSpectrogram',
                    method: 'get',
                    params: {
                        id:ids
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
                        that.fetchData()
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
  export function createCheck (data,that) {
    request({
        url: 'api/v1/sample/createCheck',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData();
            that.save_fy = false;
            that.testClick_a(that.test_batchno)
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.save_fy = false;
        }
    }).catch(rr=>{
        that.save_fy = false;
    })
}
export function export_duplicate_batches (data,that) {
    request({
        url: 'api/v1/inventory/export_duplicate_batches',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.prod_batchno_url = res.data
            setTimeout(() => {
                that.$refs.prod_batchno_url.click()
            }, 200)
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function setNoticeSize (data,that) {
    return request({
        url: 'api/v2/prod/'+data.prod_id+'/setNoticeSize',
        method: 'get',
        params: {
            notice_size:data.notice_size
        }
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.notice_loading = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.notice_loading = false
        }
    }).catch(rr=>{
        that.notice_loading = false
    })
}
export function preout_logs (query) {
    return request({
      url: 'api/v1/inventory/preout_logs',
      method: 'get',
      params: query
    })
  }
export function update_jisuan_price (data,that) {
    return request({
        url: 'api/v1/ProcurementContract/update_jisuan_price',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.fetchData()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}


