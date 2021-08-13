import request from '@/plugin/axios'
export function package_w_check (data,that) {
    return request({
        url: 'api/v2/procurement/package_w_check',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function contract_detail_lists (data) {
    return request({
        url: 'api/v2/procurement/contract_detail_lists',
        method: 'post',
        data
    })
}
export function ProcurementContract_doPush (data) {
    return request({
        url: 'api/v1/ProcurementContract/doPush',
        method: 'post',
        data
    })
}
export function package_one (query) {
    return request({
        url: 'api/v2/procurement/package_one',
        method: 'get',
        params: query
    })
}


export function  package_down (query) {
    return request({
        url: 'api/v2/procurement/package_down',
        method: 'get',
        params: query
    })
}
export function package_finance (id) {
    return request({
        url: 'api/v2/procurement/package_finance?id='+id,
        method: 'get',
    })
}
export function package_lists (data) {
    return request({
        url: 'api/v2/procurement/package_lists',
        method: 'post',
        data
    })
}
export function invoice_lists (data, method_type) {
    return request({
        url: 'api/v1/' + method_type,
        method: 'post',
        data
    })
}
export function update_complete_status (id,status,that) {
    request({
        url: "api/v2/procurement/update_complete_status?id="+id+'&complete_status='+status,
        method: 'get',
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function payment_cancel (data, that) {
    request({
        url: "api/v1/ProcurementContract/modify/payment_cancel",
        method: 'post',
        data:{
            id: data.id,
            status: "-1"
        }
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_saopiao_verify (data, that) {
    request({
        url: "api/v2/procurement/package_saopiao_verify",
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_delete (id, that) {
    request({
        url: "api/v2/procurement/package_delete?id="+id,
        method: 'get',
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_finance_cancel (data, that) {
    request({
        url: "api/v2/procurement/package_finance_cancel",
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_finance_create (data, that) {
    request({
        url: "api/v2/procurement/package_finance_create",
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_finance_check (data, that) {
    request({
        url: "api/v2/procurement/package_finance_check",
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_finance_pay (data, that) {
    request({
        url: "api/v2/procurement/package_finance_pay",
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_saopiao_delete(id,that) {
    const h = that.$createElement;
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
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                request({
                    url: 'api/v2/procurement/package_saopiao_delete?id='+id,
                    method: 'post',
                    data:id
                }).then(res => {
                    instance.confirmButtonLoading = false;
                    instance.confirmButtonText = '确定';
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        });
                        that.fetchData()
                        done();
                    }
                }).catch(res=>{
                })
            }
            if (action === 'cancel') {
                done();
            }
        }
    })
}
export function package_create (data,that) {
    request({
        url: 'api/v2/procurement/package_create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function package_saopiao_create (data,that) {
    request({
        url: 'api/v2/procurement/package_saopiao_create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function enum_lists (data) {
    return request({
        url: 'api/v1/enum/types',
        method: 'get',
    })
}
export function supplier_exemption_amount (id) {
    return request({
        url: 'api/v1/data/supplier_exemption_amount?supplier_id='+id,
        method: 'get',
    })
}
export function edit (id) {
    return request({
        url: 'api/v1/ProcurementContract/'+id+'/edit',
        method: 'post',
    })
}
export function create (data,type,method_type,that) {
    request({
        url: 'api/v1/'+type+'/'+method_type,
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogAdd = false;
            that.dialogEdit = false;
            that.dialogIndex =true;
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

export function return_contract (id,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/return_contract?id='+id,
        method: 'get',
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            const tagName = "procure-contract";
            that.closeAdd({ tagName });
            that.$router.push({
              path: "/procure/contract",
              name: "procure-contract"
            });
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function verify (data, that) {
    request({
        url: "api/v1/ProcurementContract/Notice/"+data.id+"/verify",
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function save_verify (id, that) {
    request({
        url: "api/v1/ProcurementContract/modify/save_verify?id="+id,
        method: 'get',
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function update (data,method_type,that) {
    that.editForm_loadingSave = true;
    data.key = method_type;
    request({
        url: 'api/v1/enum/'+data.id+'/update',
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
export function package_detail_delete (row,that) {
    const h = that.$createElement;
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
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                let id = row.id
                request({
                    url: 'api/v2/procurement/package_detail_delete',
                    method: 'post',
                    data: {
                        id
                    }
                }).then(res => {
                    instance.confirmButtonLoading = false;
                    instance.confirmButtonText = '确定';
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        });
                        done();
                        that.fetchData()
                    }
                }).catch(res=>{
                    instance.confirmButtonLoading = false;
                })
            }
            if (action === 'cancel') {
                done();
            }
        }
    })
}
export function destroy (row,type,method_type,that) {
    const h = that.$createElement;
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
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                let id = row.id
                request({
                    url: 'api/v1/'+type+'/'+method_type,
                    method: 'post',
                    data: {
                        id
                    }
                }).then(res => {
                    instance.confirmButtonLoading = false;
                    instance.confirmButtonText = '确定';
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        });
                        done();
                        that.fetchData()
                    }
                }).catch(res=>{
                    instance.confirmButtonLoading = false;
                })
            }
            if (action === 'cancel') {
                done();
            }
        }
    })
}
export function ProcurementContract (id) {
    return request({
        url: 'api/v1/ProcurementContract/modify/modify_form?id='+id,
        method: 'get',
    })
}

export function supplier_receive_addresses (id) {
    return request({
        url: 'api/v1/data/'+id+'/supplier_receive_addresses',
        method: 'get',
    })
}
export function modify_invoice_cerate (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_invoice_cerate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function modify_return_goods_cerate (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_return_goods_cerate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function modify_payment_cerate (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_payment_cerate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function modify_invoice_verify (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_invoice_verify',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function payment_verify (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/payment_verify',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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
export function modify_return_goods_verify (id,status,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_return_goods_verify?id='+id+'&status='+status,
        method: 'get',
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
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

export function modify_goods_cerate (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_goods_cerate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: "success",
                type: "success"
            });
            that.dialogVisible = false;
            that.fetchData();
        } else {
            that.$message({
                message: res.msg,
                type: "error"
            });
        }
    });
}
export function modify_goods_update (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_goods_update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: "success",
                type: "success"
            });
            that.dialogVisible = false;
            that.fetchData();
        } else {
            that.$message({
                message: res.msg,
                type: "error"
            });
        }
    });
}
export function modify_goods_verify (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_goods_verify',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: "success",
                type: "success"
            });
            that.fetchData();
        } else {
            that.$message({
                message: res.msg,
                type: "error"
            });
        }
    });
}
export function invoice_returns (query) {
    return request({
        url: 'api/v1/ProcurementContract/modify/invoice_returns',
        method: 'get',
        params:query
    })
}
export function invoice_return_detail (query) {
    return request({
        url: 'api/v1/ProcurementContract/modify/invoice_return_detail',
        method: 'get',
        params:query
    })
}
export function modify_invoice_post (data,that) {
    request({
        url: 'api/v1/ProcurementContract/modify/modify_invoice_post',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: "success",
                type: "success"
            });
            that.$router.push({
                path: '/procure/return_invoice/index',
                name: 'procure-return_invoice'
            })
        } else {
            that.$message({
                message: res.msg,
                type: "error"
            });
        }
    });
}


export function receive_address_create(data,that,type,a) {
    return request({
        url: 'api/v1/ProcurementContract/receive_address_create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            if(type=='detail'){
                that.fetch_data();
            }
            that.delete_receive_good()
            if(a){
                that.add_ref()
            }else{
                that.supplyChange()
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {})
}

export function receive_address_update(data,id,that,a) {
    return request({
        url: 'api/v1/ProcurementContract/'+id+'/receive_address_update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.delete_receive_good()
            if(a){
                that.add_ref()
            }else{
                that.handleSelect_customer()
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {})
}

export function receive_address_destory(row,type,method_type,that) {
    const h = that.$createElement;
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
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                request({
                    url: 'api/v1/'+type+'/'+method_type,
                    method: 'post',
                    data: row
                }).then(res => {
                    instance.confirmButtonLoading = false;
                    instance.confirmButtonText = '确定';
                    if (res && res.code == 0) {
                        that.$message({
                            message: 'success',
                            type: 'success'
                        });
                        done();
                        if(that.addressItem.type==1){that.invoice_edit()}
                        else if(that.addressItem.type==2){that.delivery_edit()}
                        that.check_total=false
                    }
                }).catch(res=>{
                })
            }
            if (action === 'cancel') {
                done();
            }
        }
    })
}

export function receive_address(id,index) {
    return request({
        url: 'api/v1/ProcurementContract/' + id + '/receive_address?type='+index,
        method: 'get',
    })
}

export function cancel_contract(id,flag) {
    return request({
        url: 'api/v1/ProcurementContract/cancel_contract?id='+id+'&flag='+flag,
        method: 'get',
    })
}
export function package_export (data) {
    return request({
        url: 'api/v2/procurement/package_export',
        method: 'post',
        data: data
    })
}
export function sendContractToYaoshi (data) {
    return request({
        url: 'api/v1/ProcurementContract/sendContractToYaoshi',
        method: 'post',
        data: data
    })
}
export function  huichuan_index (query) {
    return request({
        url: 'api/v2/procurement/huichuan/index',
        method: 'get',
        params: query
    })
}
export function  uploads (data) {
    return request({
        url: 'api/v2/procurement/huichuan/uploads',
        method: 'post',
        data
    })
}
export function  getInvoiceList (query) {
    return request({
        url: 'api/v1/getInvoiceList',
        method: 'get',
        params: query
    })
}
export function  getInvoiceDetail (query) {
    return request({
        url: 'api/v1/getInvoiceDetail',
        method: 'get',
        params: query
    })
}
export function  getContractDetails (query) {
    return request({
        url: 'api/v1/getContractDetails',
        method: 'get',
        params: query
    })
}
export function  doHexiao (query) {
    return request({
        url: 'api/v1/doHexiao',
        method: 'get',
        params: query
    })
}
export function  doCancelHexiao (query) {
    return request({
        url: 'api/v1/doCancelHexiao',
        method: 'get',
        params: query
    })
}
export function  doCancelHexiaoDetail (query) {
    return request({
        url: 'api/v1/doCancelHexiaoDetail',
        method: 'get',
        params: query
    })
}
export function  exportRukuPingzheng (query) {
    return request({
        url: 'api/v1/exportRukuPingzheng',
        method: 'get',
        params: query
    })
}
export function  syncSmy (query) {
    return request({
        url: 'http://127.0.0.1/bm/public/api/v1/puInvoice/syncSmy',
        method: 'get',
        params: query
    })
}
export function  updateNote (data) {
    return request({
        url: 'api/v1/puInvoice/updateNote',
        method: 'post',
        data
    })
}
export function  updateDetailNote (data) {
    return request({
        url: 'api/v1/puInvoice/updateDetailNote',
        method: 'post',
        data
    })
}
export function  feiqi (data) {
    return request({
        url: 'api/v1/puInvoice/feiqi',
        method: 'post',
        data
    })
}
export function  doCreate (data) {
    return request({
        url: 'api/v1/puInvoice/doCreate',
        method: 'post',
        data
    })
}

export function  getCasNames (query) {
    return request({
        url: 'api/v1/puInvoice/getCasNames',
        method: 'get',
        params: query
    })
}
export function  get_prod (name_cn) {
    return request({
        url: 'api/v1/data/get_prod?name_cn='+name_cn,
        method: 'get',
    })
}

export function  getInvoiceNoPassedList (query) {
    return request({
        url: 'api/v1/getInvoiceNoPassedList',
        method: 'get',
        params: query
    })
}
export function  getInvoiceNoPassed (query) {
    return request({
        url: 'http://127.0.0.1/bm/public/api/v1/getInvoiceNoPassed/syncSmy',
        method: 'get',
        params: query
    })
}
export function  markPassed (query) {
    return request({
        url: 'api/v1/getInvoiceNoPassed/markPassed',
        method: 'get',
        params: query
    })
}
export function  getRelatedContracts (query) {
    return request({
        url: 'api/v1/puInvoice/getRelatedContracts',
        method: 'get',
        params: query
    })
}
export function  packageNo (query) {
    return request({
        url: 'api/v1/puInvoice/packageNo',
        method: 'get',
        params: query
    })
}
export function  doSetHongzi (query) {
    return request({
        url: 'api/v1/puInvoice/doSetHongzi',
        method: 'get',
        params: query
    })
}
export function  hongziList (query) {
    return request({
        url: 'api/v1/puInvoice/hongziList',
        method: 'get',
        params: query
    })
}
export function  uploadInvoiceItem (data) {
    return request({
        url: 'api/v1/puInvoice/saveInvoiceItem',
        method: 'post',
        data
    })
}
export function  getInvoiceItem (query) {
    return request({
        url: 'api/v1/puInvoice/getInvoiceItem',
        method: 'get',
        params: query
    })
}
export function  getRelatedDownload (query) {
    return request({
        url: 'api/v1/puInvoice/getRelatedDownload',
        method: 'get',
        params: query
    })
}
export function getQueueCount (data) {
    return request({
        url: 'api/v1/puInvoice/getQueueCount',
        method: 'post',
        data
    })
}

export function doHexiaoHongzi (data) {
    return request({
        url: 'api/v1/puInvoice/doHexiaoHongzi',
        method: 'post',
        data
    })
}

export function doHexiaoPackage (data) {
    return request({
        url: 'api/v1/puInvoice/doHexiaoPackage',
        method: 'post',
        data
    })
}

export function sendDingTalk (data) {
    return request({
        url: 'api/v1/puInvoice/sendDingTalk',
        method: 'post',
        data
    })
}




