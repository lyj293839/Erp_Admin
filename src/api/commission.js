import request from '@/plugin/axios'
export function Rate_index (query) {
    return request({
        url: 'api/v1/rate/index',
        method: 'get',
        params:query
    })
}
export function account (query) {
    return request({
        url: 'api/v1/payment/account',
        method: 'get',
        params:query
    })
}
export function account_search (query) {
    return request({
        url: 'api/v1/payment/account/search',
        method: 'get',
        params:query
    })
}
export function transactionpipe_index (query) {
    return request({
        url: 'api/v1/payment/transactionpipe',
        method: 'get',
        params:query
    })
}
export function transactionpipe_show (data,that) {
  return request({
      url: 'api/v1/payment/transactionpipe/show/'+data.id,
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
export function transactionpipe_hiden (data,that) {
  return request({
      url: 'api/v1/payment/transactionpipe/hiden/'+data.id,
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
export function transactionpipe_upload_index (query) {
    return request({
        url: 'api/v1/payment/transactionpipe/upload_index',
        method: 'get',
        params:query
    })
}

export function paymentsync (data,item,that) {
    request({
        url: 'api/v1/payment/paymentsync/sync',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            })
            item.loading=false;
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
export function payment_save (data, that,type) {
    request({
        url: 'api/v1/payment/account/save',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            })
            if(type=='add'){
                that.dialogAdd = false
                that.addForm = {
                    vendor:'',
                    account:'',
                    account_name:'',
                    account_bank:'',
                    account_bank_no:'',
                    account_bank_name:'',
                    app_id:'',
                    private_key:'',
                    public_key:'',
                    status:''
                }
            }else{
                that.dialogEdit = false
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'success'
            })
        }
    }).catch(rr => {
    })
}
export function Rate_create (datas, that) {
    let data = JSON.parse(JSON.stringify(datas))
    request({
      url: 'api/v1/rate/create',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.addClose()
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
  export function Rate_update (datas, that) {
    let data = JSON.parse(JSON.stringify(datas))
    request({
      url: 'api/v1/rate/update',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.EditClose()
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
  export function documentary_index (query) {
    return request({
        url: 'api/v1/documentary/index',
        method: 'get',
        params:query
    })
}
export function documentary_create (datas, that) {
  let data = JSON.parse(JSON.stringify(datas))
  return request({
    url: 'api/v1/documentary/create',
    method: 'post',
    data
  })
}
export function documentary_make (url,data,that) {
  return request({
    url: url.uri,
    method: url.methods[0],
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.fetch_data()
      that.dialogConfirmed = false
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function documentary_export(data) {
  return request({
      url: 'api/v1/documentary/export',
      method: 'post',
      data
  })
}
export function documentary_update (data,that) {
  return request({
    url: 'api/v1/documentary/update',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.dialogUpdate = false
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function documentary_docing (data,that) {
  return request({
    url: 'api/v1/documentary/docing',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.dialogDoc = false
    } else {
      that.$message({
        message: res.msg,
        type: 'success'
      })
    }
  }).catch(rr => {
  })
}
export function documentary_upload_list (query) {
  return request({
    url: 'api/v1/documentary/upload_list',
    method: 'get',
    params:query
  })
}
export function documentary_log (url,data,that) {
  return request({
    url: url.uri,
    method: url.methods[0],
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.fetchData()
      that.fetch_data()
      that.dialogUpdate = false
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
  }).catch(rr => {
  })
}
export function can_receipt (query) {
  return request({
      url: 'api/v1/payment/transactionpipe/can_reciept',
      method: 'get',
      params:query
  })
}
export function transactionpipe_detail (query) {
  return request({
      url: 'api/v1/payment/transactionpipe/detail',
      method: 'get',
      params:query
  })
}
export function fixRecieptStatus (datas, that) {
  let data = JSON.parse(JSON.stringify(datas))
  request({
    url: 'api/v1/receipt/fixRecieptStatus',
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
export function apply (data,that) {
  request({
      url: 'api/v1/payment/transactionpipe/apply',
      method: 'post',
      data
  }).then(res => {
      if (res && res.code == 0) {
          that.$message({
              message: 'success',
              type: 'success'
          })
          that.fetchData()
          that.dialogTransfer = false
      } else {
          that.$message({
              message: res.msg,
              type: 'success'
          })
      }
  }).catch(rr => {
  })
}