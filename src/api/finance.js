import request from '@/plugin/axios'
export function lists (query, method_type) {
  return request({
    url: 'api/v1/finance/' + method_type,
    method: 'get',
    params: query
  })
}
export function ExportDeclaration (query) {
    return request({
        url: 'api/v1/ExportDeclaration/index',
        method: 'get',
        params: query
    })
}
export function ExportDeclaration_down (query) {
    return request({
        url: 'api/v1/ExportDeclaration/down',
        method: 'get',
        params: query
    })
}
export function saler_contract (query) {
    return request({
        url: 'api/v1/ExportDeclaration/saler_contract',
        method: 'get',
        params: query
    })
}
export function ExportDeclaration_delete (obj, that) {
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
                    url: 'api/v1/ExportDeclaration/delete',
                    method: 'post',
                    data:obj
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
export function invoice_recovery (data, that) {
    return request({
        url: 'api/v1/ProcurementContract/Invoice/invoice_recovery',
        method: 'post',
        data: data
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
export function delete_invoice (obj, that) {
    request({
        url: 'api/v1/ProcurementContract/Invoice/invoice_delete',
        method: 'post',
        data:obj
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            })
            that.fetchData()
        }
    }).catch(res => {
    })
}
export function refund_money_list (query) {
    return request({
        url: 'api/v1/ProcurementContract/modify/refund_money_list',
        method: 'get',
        params: query
    })
}
export function currentaccount (query) {
  return request({
      url: 'api/v1/currentaccount/statistics',
      method: 'get',
      params: query
  })
}

export function refund_money_detail (id) {
    return request({
        url: 'api/v1/ProcurementContract/modify/refund_money_detail?id='+id,
        method: 'get',
    })
}
export function refund_money_do(id, data, that,tagName) {
    that.loading = true
    return request({
        url: 'api/v1/ProcurementContract/modify/refund_money_do',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading = false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.$router.push({
                path: "/finance/return_money",
                name: "finance-return_money"
            });
            if(tagName){
                that.closeAdd({tagName})
            }
        } else {
            that.loading = false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
        that.loading = false
    })
}
export function notice_billing_list (query) {
  return request({
    url: 'api/v1/invoice/notice_billing_list',
    method: 'get',
    params: query
  })
}
export function notice_nb_billing_list (query) {
  return request({
    url: 'api/v1/invoice/notice_nb_billing_list',
    method: 'get',
    params: query
  })
}
export function notice_billing_view (id) {
  return request({
    url: 'api/v1/invoice/notice_billing_view?id=' + id,
    method: 'get'
  })
}
export function notice_nb_billing_view (id) {
  return request({
    url: 'api/v1/invoice/notice_nb_billing_view?id=' + id,
    method: 'get'
  })
}
export function notice_billing (data, that) {
  return request({
    url: 'api/v1/invoice/notice_billing',
    method: 'post',
    data: data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.save_fy = false
      that.close()
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
export function notice_nb_billing (data, that) {
  return request({
    url: 'api/v1/invoice/notice_nb_billing',
    method: 'post',
    data: data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.save_fy = false
      that.close()
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
export function currentaccount_lists (query) {
  return request({
    url: 'api/v1/currentaccount',
    method: 'get',
    params: query
  })
}
export function currentaccount_create (data, that, type) {
  return request({
    url: 'api/v1/currentaccount/create',
    method: 'post',
    data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      if (type == 'customer') {
        that.customer_dialog = false
      } else {
        that.supplier_dialog = false
      }
      that.fetchData()
    } else {
      that.$message({
        message: res.msg,
        type: 'error'
      })
    }
    setTimeout(() => {
      that.addForm_loadingSave = false
    }, 500)
  }).catch(rr => {
    that.addForm_loadingSave = false
  })
}
// 内部公司列表
export function company () {
  return request({
    url: 'api/v1/organize/company?is_system=1',
    method: 'get'
  })
}
// 客户
export function customer_company (name) {
  return request({
    url: 'api/v1/data/member_list?type=1&name=' + name,
    method: 'get'
  })
}
// 供应商
export function supplier_company (name) {
  return request({
    url: 'api/v1/data/member_list?type=2&name=' + name,
    method: 'get'
  })
}
// 审核
export function currentaccount_review (id, status, that) {
  return request({
    url: 'api/v1/currentaccount/' + id + '/review',
    method: 'post',
    data: {
      id: id,
      status: status
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
export function verify_invoice_update (data,that,item) {
    return request({
        url: 'api/v1/ProcurementContract/Invoice/verify_invoice_update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            })
            item.save_show=false
            that.$forceUpdate()
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            })
        }
    }).catch(rr => {
    })
}

export function listTotal (method_type) {
  return request({
    url: 'api/v1/finance/' + method_type,
    method: 'get'
  })
}
export function create (datas, type, method_type, that) {
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
      that.fetchData()
      that.dialogAdd = false
      that.save_fy = false
      that.reviewData = {
        check_status: '',
        id: '',
        pay_bank: '',
        note: ''
      }
      that.review_pay = {
        fee_apply_id: '',
        status: '',
        pay_bank: '',
        rmb_ratio: '',
        rmb_amount: ''
      }
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
export function verify (data, that) {
  return request({
    url: 'api/v1/ProcurementContract/modify/payment_finance_verify',
    method: 'post',
    data: data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogVisible_check = false
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
export function verify_pay (data, that) {
  return request({
    url: 'api/v1/ProcurementContract/modify/payment_finance_pay',
    method: 'post',
    data: data
  }).then(res => {
    if (res && res.code == 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.dialogVisible_check = false
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
// 退票
export function return_invoice (data, that) {
  return request({
    url: 'api/v1/invoice/' + data.id + '/return_invoice',
    method: 'post',
    data: data
  }).then(res => {
    if (res && res.code === 0) {
      that.$message({
        message: 'success',
        type: 'success'
      })
      that.save_fy = false
      that.back()
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
// 退票详情
export function return_invoice_view (id) {
  return request({
    url: 'api/v1/invoice/' + id + '/return_invoice_view',
    method: 'get'
  })
}
export function salesReturnMoney (query) {
  return request({
    url: 'api/v1/finance/return_money/sales',
    method: 'get',
    params: query
  })
}

export function select_sales (data, that) {
    return request({
        url: 'api/v1/finance/return_money/select_sales',
        method: 'post',
        data: data
    })
}
export function select_sales_detail (data) {
    return request({
        url: 'api/v1/finance/return_money/select_sales_detail',
        method: 'post',
        data: data
    })
}
export function sales_return (data, that,tagName) {
    return request({
        url: 'api/v1/finance/return_money/sales_return',
        method: 'post',
        data: data
    }).then(res => {
        if (res && res.code === 0) {
            that.$message({
                message: 'success',
                type: 'success'
            })
            that.save_fy = false
            that.$router.push({
                path: '/finance/return/sales_money',
                name: 'finance-return_sales_money'
            })
            if(tagName){
              that.closeAdd({tagName})
            }
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
export function sales_invoice_export (query){
  return request({
    url: 'api/v1/finance/sales_invoice/sales_export',
    method: 'post',
    params: query
  })
}
export function sales_export_dz (query){
  return request({
    url: 'api/v1/finance/sales_invoice/sales_export_dz',
    method: 'post',
    params: query
  })
}
export function sales_invoice_export_nb (query){
  return request({
    url: 'api/v1/finance/sales_invoice/sales_export_nb',
    method: 'post',
    params: query
  })
}
export function sales_invoice_export_nb_xz (query){
  return request({
    url: 'api/v1/finance/sales_invoice/sales_export_nb_xz',
    method: 'post',
    params: query
  })
}
export function import_sales_list (query) {
  return request({
    url: 'api/v1/finance/sales_invoice/import_sales_list',
    method: 'get',
    params: query
  })
}
export function import_sales_list_nb (query) {
  return request({
    url: 'api/v1/finance/sales_invoice/import_sales_list_nb',
    method: 'get',
    params: query
  })
}
export function export_sales_invoice (data, that) {
    return request({
        url: 'api/v1/finance/k3/export_sales_invoice',
        method: 'post',
        data: data
    })
}
export function export_invoice_cost (data) {
  return request({
      url: 'api/v1/finance/k3/export_invoice_cost',
      method: 'post',
      data: data
  })
}
export function export_purchase_invoice (data, that) {
    return request({
        url: 'api/v1/finance/k3/export_purchase_invoice',
        method: 'post',
        data: data
    })
}
export function export_cost_invoice (data, that) {
    return request({
        url: 'api/v1/finance/k3/export_cost_invoice',
        method: 'post',
        data: data
    })
}
export function sales_invoice (query) {
    return request({
        url: 'api/v1/finance/k3/sales_invoice',
        method: 'get',
        params: query
    })
}
export function cancel_billing (id, that) {
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
                  url: 'api/v1/invoice/cancel_billing',
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
export function cancel_refund (id, that) {
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
                  url: 'api/v1/finance/return_money/cancel_refund',
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
export function rollback_invoice (id) {
  return request({
    url: 'api/v1/invoice/rollback_invoice',
    method: 'post',
    data: {
        id
    }
  })
}
export function cancel_declarat (data) {
  return request({
    url: 'api/v1/invoice/del_customs_declaration',
    method: 'post',
    data
  })
}
export function confirm_income (data,that) {
  return request({
      url: 'api/v1/finance/k3/confirm_income',
      method: 'post',
      data: {
        ids:data
      }
  }).then(res => {
      if (res && res.code === 0) {
          that.$message({
              message: 'success',
              type: 'success'
          })
          that.loading_confirm_income = false
      } else {
          that.$message({
              message: res.msg,
              type: 'error'
          })
          that.loading_confirm_income = false
      }
  }).catch(rr => {
    that.loading_confirm_income = false
  })
}
export function confirm_cost (data,that) {
  return request({
      url: 'api/v1/finance/k3/confirm_cost',
      method: 'post',
      data: {
        ids:data
      }
  }).then(res => {
      if (res && res.code === 0) {
          that.$message({
              message: 'success',
              type: 'success'
          })
          that.loading_confirm_cost = false
      } else {
          that.$message({
              message: res.msg,
              type: 'error'
          })
          that.loading_confirm_cost = false
      }
  }).catch(rr => {
    that.loading_confirm_cost = false
  })
}