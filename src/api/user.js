import request from '@/plugin/axios'

export function lists(query,method_type) {
    return request({
        url: 'api/v1/'+method_type,
        method: 'get',
        params:query
    })
}
export function v2_lists(query,method_type) {
    return request({
        url: 'api/v2/'+method_type,
        method: 'get',
        params:query
    })
}
export function create (datas,type,method_type,that) {
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
                type: 'success'
            });
            if(method_type=='create'){
                that.member_id=res.data.id
            }else if(method_type=='responsible_person_create'){
                that.responsible_level = [];
                that.responsible_person = [];
            }
            that.fetchData();
            setTimeout(()=>{
                that.edit_refresh(that.member_id);
            },1000)
            // that.edit_refresh(that.member_id);

        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        if(that.basis.pid==0){
            that.basis.pid=''
        }
        datas.loading=false
    })
}
export function edit (type,id) {
    return request({
        url: 'api/v1/'+type+'/'+id+'/edit',
        method: 'get',
    })
}
export function update (datas,type,method_type,that) {
    datas.loading=true
    let data= JSON.parse(JSON.stringify(datas));
    delete data.loading
    request({
        url: 'api/v1/'+type+'/'+data.id+'/'+method_type,
        method: 'post',
        data
    }).then(res => {
        datas.loading=false
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData();
            that.edit_refresh(that.member_id);
        }else {
            that.$message({
                message: res.msg,
                type: 'success'
            });
        }
    }).catch(rr=>{
        datas.loading=false
    })
}
export function update_responsible(data,type,method_type,that) {
    request({
        url: 'api/v1/'+type+'/'+data.id+'/'+method_type,
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData();
            setTimeout(()=>{
                that.edit_refresh(that.member_id);
            },1000)
        }else {
            that.$message({
                message: res.msg,
                type: 'success'
            });
        }
    }).catch(rr=>{
    })
}
export function destroy (row,type,method_type,that,home) {
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
                        if(home=='supplier'||home=='customer'){
                            if (that.currentPage == 1) {
                                that.fetchData()
                            } else {
                                that.currentPage = 1;
                            }
                        }else{
                            that.edit_refresh(that.member_id);
                        }
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

export function country_list (data) {
    return request({
        url: 'api/v1/data/country_list',
        method: 'get',
    })
}
export function province_list (data) {
    return request({
        url: 'api/v1/data/'+data+'/province_list',
        method: 'get',
    })
}
export function city_list (data,query) {
    return request({
        url: 'api/v1/data/'+data+'/city_list?province_code='+query,
        method: 'get',
    })
}
export function member_company (name,type,id) {
    return request({
        url: 'api/v1/data/member_list?sort=1&name='+name+'&type='+type+'&id='+id,
        method: 'get',
    })
}
export function bank_accounts (id) {
    return request({
        url: 'api/v1/member/bank_accounts?member_id='+id,
        method: 'get',
    })
}
export function get_member_foreign_bank_account(query,type) {
    return request({
        url: 'api/v1/'+type+'/get_member_foreign_bank_account',
        method: 'get',
        params:query
    })
}
export function get_receive_address(query,type) {
    return request({
        url: 'api/v1/'+type+'/get_receive_address',
        method: 'get',
        params:query
    })
}
export function get_bank_accouts(query,type) {
    return request({
        url: 'api/v1/'+type+'/get_bank_account',
        method: 'get',
        params:query
    })
}
export function get_member_contact(query,type) {
    return request({
        url: 'api/v1/'+type+'/get_member_contact',
        method: 'get',
        params:query
    })
}
export function get_member_invoice(query,type) {
    return request({
        url: 'api/v1/'+type+'/get_member_invoice',
        method: 'get',
        params:query
    })
}
export function merge_customer (data, that) {
    return request({
      url: 'api/v1/customer/merge_customer',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.fetchData()
        that.close_combine()
      } else {
        that.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(rr => {
    })
}
export function v2_edit (type,id) {
    return request({
        url: 'api/v2/'+type+'/'+id+'/edit',
        method: 'get',
    })
}
export function v2_create (data,that) {
    request({
        url: 'api/v2/customer/create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.member_id=res.data.id
            that.receive_good_address_get()
            that.receive_address_get()
            that.member_contact_get()
            that.get_invoice()
            that.bank_accouts_get()
            that.loading_base = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading_base = false
        }
    }).catch(rr=>{
        that.loading_base = false
    })
}
export function edit_update (data,that) {
    request({
        url: 'api/v2/customer/'+that.member_id+'/update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.loading_base = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading_base = false
        }
    }).catch(rr=>{
        that.loading_base = false
    })
}
export function v2_de_create (data,type,method_type,that) {
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
            if(res.data&&res.data.type==1){
                that.receive_address_get()
            }else if(res.data&&res.data.type==2){
                that.receive_good_address_get()
            }else if(method_type=='contract_create'){
                that.member_contact_get()
            }else if(method_type=='invoice_create'){
                that.get_invoice()
            }else if(method_type=='bank_account_create'){
                that.bank_accouts_get()
            }else{
                that.fetchData_b()
            }
            that.dialogTableVisible = false
            that.dialogContracts = false
            that.dialogInvoice = false
            that.dialogBank = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function v2_update (data,type,method_type,that) {
    request({
        url: 'api/v1/'+type+'/'+data.id+'/'+method_type,
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            if(res.data&&res.data.type==1){
                that.receive_address_get()
            }else if(res.data&&res.data.type==2){
                that.receive_good_address_get()
            }else if(method_type=='contract_update'){
                that.member_contact_get()
            }else if(method_type=='invoice_update'){
                that.get_invoice()
            }else if(method_type=='bank_account_update'){
                that.bank_accouts_get()
            }else{
                that.fetchData_b()
            }
            that.dialogTableVisible = false
            that.dialogContracts = false
            that.dialogInvoice = false
            that.dialogBank = false
        }else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function v2_destroy (row,type,method_type,that) {
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
                        if(method_type=="receive_address_destory"){
                            that.receive_address_get()
                            that.receive_good_address_get()
                        }else if(method_type=="contract_destory"){
                            that.member_contact_get()
                        }else if(method_type=="invoice_destory"){
                            that.get_invoice()
                        }else if(method_type=='bank_account_destory'){
                            that.bank_accouts_get()
                        }else{
                            that.fetchData_b()
                        }
                        done();
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
export function v2_create_supplier (data,that) {
    request({
        url: 'api/v2/supplier/create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.member_id = res.data.id
            that.api = 'api/v1/form/providedSupplierProdIndexForm?company_id='+that.member_id
            that.api_t = true
            that.loading_base = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading_base = false
        }
    }).catch(rr=>{
        that.loading_base = false
    })
}
export function edit_update_supplier (data,that) {
    request({
        url: 'api/v2/supplier/'+that.member_id+'/update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.loading_base = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading_base = false
        }
    }).catch(rr=>{
        that.loading_base = false
    })
}
export function prod_change_vue(query) {
    return request({
        url: query.url,
        method: query.method,
        params:query.params
    })
}
export function deleteProvidedSupplier (id,that) {
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
                    url: 'api/v1/prod/deleteProvidedSupplier',
                    method: 'post',
                    data: {
                        company_id:id
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
                        that.get_prod_form()
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
export function deleteProvidedSupplierProds (id,that) {
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
                    url: 'api/v1/prod/deleteProvidedSupplierProds',
                    method: 'post',
                    data: {
                        ids:id
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
                        that.get_prod_form()
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
export function foreign_bank_account_create (data,that) {
    return request({
      url: 'api/v1/customer/foreign_bank_account_create',
      method: 'post',
      data
    }).then(res=>{
        if(res && res.code == 0){
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogAccound = false
            that.loading_acound = false
            that.getAccound()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading_acound = false
        }
    }).catch(rr=>{
        that.loading_acound = false
    })
  }
  export function foreign_bank_account_update (data,that) {
    return request({
      url: 'api/v1/customer/'+data.id+'/foreign_bank_account_update',
      method: 'post',
      data
    }).then(res=>{
        if(res && res.code == 0){
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogAccound = false
            that.loading_acound = false
            that.getAccound()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading_acound = false
        }
    }).catch(rr=>{
        that.loading_acound = false
    })
  }
  export function foreign_bank_account_destory (id,that) {
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
                    url: 'api/v1/customer/foreign_bank_account_destory',
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
                        that.getAccound()
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
export function providedSupplierProdUploadList (query) {
    return request({
      url: 'api/v1/prod/providedSupplierProdUploadList',
      method: 'post',
      params: query
    })
  }
export function ProvidedSupplierProdSave (data,that) {
    request({
        url: 'api/v1/prod/providedSupplierProdSave',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.get_prod_form()
            that.dialogProd = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function party_b(query) {
    return request({
        url: 'api/v1/party_b',
        method: 'get',
        params:query
    })
}
export function customer_lists_id(id) {
    return request({
        url: 'api/v1/data/member_list?type=1&member_id=' + id,
        method: 'get',
    })
}
export function map_customer (data,that) {
    request({
        url: 'api/v1/customer/map_customer',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData()
            that.MappDialog = false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function supplier_prod_is_open (id) {
    return request({
        url: 'api/v2/supplier/prod_is_open/'+id,
        method: 'get',
    })
}
export function auto_clear_responsible_person_logs (id) {
    return request({
        url: 'api/v2/customer/auto_clear_responsible_person_logs?member_id='+id,
        method: 'get',
    })
}