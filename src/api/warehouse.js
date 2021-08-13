import request from '@/plugin/axios'
export function transfer_index (query) {
  return request({
    url: 'api/v2/inventory/transfer/index',
    method: 'get',
    params: query
  })
}
export function unit_lists (data) {
  return request({
    url: 'api/v1/warehouse',
    method: 'get'
  })
}
export function ship_list (query) {
  return request({
    url: 'api/v1/ship/ship_list',
    method: 'get',
    params: query
  })
}
export function msds (query) {
  return request({
    url: 'api/v1/ship/msds',
    method: 'get',
    params: query
  })
}

export function msds_generate (data, that) {
  return request({
    url: 'api/v1/ship/msds_generate',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogVisible_msds = false
      window.open(res.data)
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}

export function Shipping_document_view (id) {
  return request({
    url: 'api/v1/ship/' + id + '/shipping_document_view',
    method: 'get'
  })
}

export function shipping_document (data, ids, that) {
  return request({
    url: 'api/v1/ship/shipping_document',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.ship_file({id:ids})
      that.save_fy = false
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
      that.save_fy = false
    }
  }).catch(rr => {
    that.save_fy = false
  })
}
export function ship (data, id, that) {
  return request({
    url: 'api/v1/ship/ship',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData_b(id)
      that.save_fy = false
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
      that.save_fy = false
    }
  }).catch(rr => {
    that.save_fy = false
  })
}
export function hk (data, that) {
  that.hk_loading = true
  return request({
    url: 'api/v1/doc/hk',
    method: 'post',
    data
  })
}
export function mainland (data, that) {
  that.mainland_loading = true
  return request({
    url: 'api/v1/doc/mainland',
    method: 'post',
    data
  })
}
export function packingExcel (data, id, that) {
  return request({
    url: 'api/v1/doc/packingExcel',
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
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function dcExcel (data, id, that) {
  return request({
    url: 'api/v1/doc/dcExcel',
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
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}

export function transfer (data, that) {
  return request({
    url: 'api/v1/ship/transfer',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: res.msg,
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

export function transfer_file (data, that) {
  that.tranfer_file = false
  that.transfer_file_loading = true
  return request({
    url: 'api/v1/ship/transfer_file',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.tranfer_file_url = res.data
      // setTimeout(res=>{
      //     that.transfer_file_loading=false
      //     that.$message({
      //         message: 'success',
      //         type: 'success'
      //     });
      //     that.tranfer_file=true
      // },5000)
      that.transfer_file_loading = false
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.tranfer_file = true
    } else {
      that.transfer_file_loading = false
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
    that.transfer_file_loading = false
  })
}

export function packing_list (data, that) {
  return request({
    url: 'api/v1/ship/packing_list',
    method: 'post',
    data
  })
}

export function packing (data, that) {
  return request({
    url: 'api/v1/ship/packing',
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
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function packing_file (data, that) {
  that.file = false
  that.packing_file_loading = true
  return request({
    url: 'api/v1/ship/packing_file',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.file_url = res.data
      setTimeout(res=>{
          that.packing_file_loading=false
          that.$message({
              message: 'success',
              type: 'success'
          });
          that.file=true
      },5000)
      // that.packing_file_loading = false
      // that.$message({
      //   message: 'success',
      //   type: 'success'
      // })
      // that.file = true
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
    that.packing_file_loading = false
  })
}
export function ship_logistic (data, id, that) {
  return request({
    url: 'api/v1/ship/ship_logistic',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData_c(id)
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function ship_logistic_del (id, query_id, that) {
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
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        request({
          url: 'api/v1/ship/' + id + '/ship_logistic_del',
          method: 'post',
          data: {
            id
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
            that.fetchData_c()
          }
        })
      }
      if (action === 'cancel') {
        done()
      }
    }
  })
}
export function ship_view (id) {
  return request({
    url: 'api/v1/ship/ship_view?id=' + id,
    method: 'get'
  })
}
export function storageIn () {
  return request({
    url: 'api/v1/storageIn/form',
    method: 'get'
  })
}
export function saler_contract_info (id) {
  return request({
    url: 'api/v1/data/' + id + '/saler_contract_info',
    method: 'get'
  })
}
export function create (datas, type, method_type, that) {
  datas.loading = true
  that.save_fy = true
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
      // if(type=='hselement'){
      //     that.$nextTick(function () {
      //         that.$bus.emit('prod_id',res.data.prod_id);
      //     });
      // }
      that.fetchData()
      that.$emit('ee', res.data.prod_id)
      that.dialogAdd = false
      that.save_fy = false
      // that.edit_refresh(that.member_id);
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
      that.save_fy = false
    }
  }).catch(rr => {
    datas.loading = false
    that.save_fy = false
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
export function destroy (row, type, method_type, that, index) {
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
          var length = that.list.data.length
          if (res && res.code == 0) {
            that.$message({
              message: 'success',
              type: 'success'
            })
            done()
            length = length - 1
            if (length == 0) {
              that.queryList.page = that.queryList.page - 1
              if (that.queryList.page <= 1) {
                that.queryList.page = 1
              }
            }
            if (that.prod_id) {
              that.$emit('ee', that.prod_id)
              that.edit_refresh(that.prod_id)
              that.$emit('refresh', that.prod_id)
              that[type].splice(index, 1)
            } else {
              if (that.currentPage == 1) {
                that.fetchData()
              } else {
                that.currentPage = 1
                that.fetchData()
              }
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
export function getTreeUsers () {
  return request({
    url: 'api/v1/getAllUsers',
    method: 'get'
  })
}

export function generatePrebatchNo (contract_number) {
  return request({
    url: 'api/v1/inquiry/inquiry/generatePrebatchNo?contract_number=' + contract_number,
    method: 'get'
  })
}
export function docdone (id) {
  return request({
    url: 'api/v1/ship/'+id+'/docdone',
    method: 'get'
  })
}
// 取消通知
export function cancle_preout (id, that) {
  return request({
    url: 'api/v1/saler_contract/cancle_preout',
    method: 'post',
    data: {
      preout_id: id,
      is_notice:1
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
export function cancle_notice (id,prod_id, that) {
  return request({
    url: 'api/v1/ship/cancle_notice',
    method: 'post',
    data: {
      preout_id: id,
      is_notice:1,
      prod_id:prod_id
    }
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.jinace()
      that.fetchData_b()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function freight_manage (query) {
  return request({
    url: 'api/v1/ship/freight_manage',
    method: 'get',
    params: query
  })
}
export function freight_registration_view (id) {
  return request({
    url: 'api/v1/ship/'+id+'/freight_registration_view',
    method: 'get',
  })
}
export function freight_registration (data,that) {
  return request({
    url: 'api/v1/ship/freight_registration',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.freightClick(that.freight_list.id)
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function ship_logs (query) {
  return request({
    url: 'api/v1/ship/ship_logs',
    method: 'get',
    params: query
  })
}
export function ship_download (query) {
  return request({
    url: 'api/v1/ship/ship_download',
    method: 'get',
    params: query
  })
}
export function member_info (id) {
  return request({
    url: 'api/v1/data/'+id+'/member_info',
    method: 'get',
  })
}
export function customs_declaration_list (query) {
  return request({
    url: 'api/v1/ship/customs_declaration_list',
    method: 'get',
    params: query
  })
}
export function customs_declaration_import (data, that) {
  return request({
    url: 'api/v1/ship/customs_declaration_import',
    method: 'post',
    data
  })
}