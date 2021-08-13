import request from '@/plugin/axios'
export function delFiles (inquiry_id,type,filepath) {
    return request({
        url: 'api/v1/inquiry/inquiry/delFiles?inquiry_id='+inquiry_id+'&type='+type+'&filepath='+filepath,
        method: 'get',
    })
}
export function country_list (data) {
    return request({
        url: 'api/v1/data/country_list',
        method: 'get',
    })
}
export function getOtherPrices (cas) {
    return request({
        url: 'api/v1/getOtherPrices?k='+cas,
        method: 'get',
    })
}
export function createPI (inquiry_id) {
    return request({
        url: 'api/v1/inquiry/inquiry/createPI?inquiry_id='+inquiry_id,
        method: 'get',
    })
}
export function previewGVK (id,customer_id) {
    return request({
        url: 'api/v1/inquiry/inquiry/previewGKV?id='+id+'&customer_id='+customer_id,
        method: 'get',
    })
}
export function setExpress (inquiry_id,index,express) {
    return request({
        url: 'api/v1/inquiry/inquiry/setExpress?inquiry_id='+inquiry_id+'&index='+index+'&express='+express,
        method: 'get',
    })
}
export function search_menu (query) {
    return request({
        url: 'api/v1/search_menu?type=inquiry',
        method: 'get',
        params: query
    })
}
export function downSupplierPriceExcel (query) {
    return request({
        url: 'api/v1/inquiry/inquiry/downSupplierPriceExcel',
        method: 'get',
        params: query
    })
}

export function recentio_search (query) {
    return request({
        url: 'api/v1/recentio/search_form',
        method: 'get',
        params: query
    })
}
export function recentio_search2 (query) {
    return request({
        url: 'api/v1/recentio/statsaleorder/form',
        method: 'get',
        params: query
    })
}
export function sale_price_switch (data) {
    return request({
        url: 'api/v1/data/sale_price_switch',
        method: 'post',
        data
    })
}

export function changeProdName (data,that) {
    return request({
        url: 'api/v1/inquiry/inquiry/changeProdName',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.refresh()
            that.show_edit_name=false
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function purchase_lists() {
    return request({
        url: 'api/v1/data/user_list?user_type=101',
        method: 'get',
    })
}
export function getInstore (id,quantity,unit_id) {
    return request({
        url: 'api/v1/inquiry/inquiry/getInstore?prod_id='+id+'&quantity='+quantity+'&unit_id='+unit_id,
        method: 'get',
    })
}
export function getInquiryNotices (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/getInquiryNotices?inquiry_id='+id,
        method: 'get',
    })
}
export function applyPurchase (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/applyPurchase?inquiry_id='+id,
        method: 'get',
    })
}
export function getLogs (id) {
    return request({
        url: 'api/v1/inquiry/PurchaseQuote/getLogs?id='+id,
        method: 'get',
    })
}
export function getOutPriceLogs (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/getOutPriceLogs?inquiry_id='+id,
        method: 'get',
    })
}
export function PurchaseQuote_edit (id) {
    return request({
        url: 'api/v1/inquiry/PurchaseQuote/'+id+'/edit',
        method: 'get',
    })
}
export function PurchaseQuote_update (data,that,id) {
    return request({
        url: 'api/v1/inquiry/PurchaseQuote/'+data.id+'/update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.$emit('refresh')
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function inquiryNoticesCreate (data,that,item) {
    item.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/inquiryNoticesCreate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            item.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.get_InquiryNotices()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        item.loading=false
    })
}
export function inquiry_edit (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/'+id+'/edit',
        method: 'get',
    })
}
export function getQuoteHistoryByProdId (cas,query) {
    if(isNaN(cas)){
        return request({
            url: 'api/v1/inquiry/PurchaseQuote/getQuoteHistoryByProdId?cas='+cas,
            method: 'get',
            params:query
        })
    }else{
        return request({
            url: 'api/v1/inquiry/PurchaseQuote/getQuoteHistoryByProdId?prod_id='+cas,
            method: 'get',
            params:query
        })
    }

}
export function getQuoteHistoryByProdId_inquery_id (cas,id,query) {
    if(isNaN(cas)){
        return request({
            url: 'api/v1/inquiry/PurchaseQuote/getQuoteHistoryByProdId?cas='+cas+'&inquiry_id='+id,
            method: 'get',
            params:query
        })
    }else{
        return request({
            url: 'api/v1/inquiry/PurchaseQuote/getQuoteHistoryByProdId?prod_id='+cas+'&inquiry_id='+id,
            method: 'get',
            params:query
        })
    }

}

export function inquiry_update (data,id,that,name) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/'+id+'/update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            const tagName= 'Inquery-add_edit'
            // that.closeAdd({
            //     tagName,
            //     vm: that
            // })
            that.closeInqueryAdd({
                tagName,
                vm: that
            })
            that.$router.push({
                path: "/Inquery/"+name.split('-').pop(),
                name: name,
            });
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function resources (data) {
    return request({
        url: 'api/v1/inquiry/inquiry/resources',
        method: 'get',
    })
}

export function ProdProvidedCompanies (data) {
    return request({
        url: 'api/v1/prod/getProdProvidedCompanies',
        method: 'post',
        data
    })
}
export function confirmGenerate (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/confirmGenerate?inquiry_id='+id,
        method: 'get',
    })
}
export function previewEmail (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/previewEmail?id='+id,
        method: 'get',
    })
}

//预占批号
export function generatePrebatchNo (query) {
    return request({
        url: 'api/v1/inquiry/inquiry/generatePrebatchNo?contract_number='+query,
        method: 'get',
    })
}
export function generatePrebatchNo_customer_id(query) {
    return request({
        url: 'api/v1/inquiry/inquiry/generatePrebatchNo',
        method: 'get',
        params:query
    })
}
//图谱
export function updateAtlas (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/updateAtlas',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogVisible_updateAtlas=false
            that.fetchData();
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
//供应商COA
export function update_supplier_Coa (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/PurchaseQuote/updateSupplierCoa',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogVisible_update_supplier_Coa=false
            that.fetchData();
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
//COA
export function updateCoa (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/updateCoa',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogVisible_updateCoa=false
            that.fetchData();
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
//Msds
export function updateMsds (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/updateMsds',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogVisible_updateMsds=false
            that.fetchData();
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function assignedSaler (data,that) {
    return request({
        url: 'api/v1/inquiry/inquiry/assignedSaler',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.show_edit_assignsalername = false
            that.refresh()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
    })
}
export function savePrebatchNo (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/savePrebatchNo',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogVisible_ph = false
            that.refresh()
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function confirmCreate (data) {
    return request({
        url: 'api/v1/inquiry/inquiry/confirmCreate',
        method: 'post',
        data
    })
}


export function cas_info (cas) {
    return request({
        url: 'api/v1/es_login/cas/'+cas,
        method: 'get',
    })
}
export function assignedPurchase (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/assignedPurchase',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'success'
            });
            // that.fetchData();
            that.refresh('iz_zhipai')
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function markAbandon (data,that) {
    that.loading=true
    return request({
        url: 'api/v1/inquiry/inquiry/markAbandon',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.refresh()
            // that.fetchData();
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function member_company () {
    return request({
        url: 'api/v1/data/member_list?type=1',
        method: 'get',
    })
}
export function inquiry_lists (query) {
    return request({
        url: 'api/v1/inquiry/inquiry',
        method: 'get',
        params: query
    })
}

export function PurchaseQuote_lists (id) {
    return request({
        url: 'api/v1/inquiry/PurchaseQuote/quotes?id='+id,
        method: 'get',
    })
}
export function contacts_lists (id) {
    return request({
        url: 'api/v1/data/contacts_by_member?member_id='+id,
        method: 'get',
    })
}
export function supplier_lists (name) {
    return request({
        url: 'api/v1/data/member_list?type=2&name='+name,
        method: 'get',
    })
}

export function customer_lists (name) {
    return request({
        url: 'api/v1/data/member_list?type=1&name='+name,
        method: 'get',
    })
}
export function contact_info (id) {
    return request({
        url: 'api/v1/data/contacts_by_member?user_type=102&member_id='+id,
        method: 'get',
    })
}
export function lists (query,method_type) {
    return request({
        url: 'api/v1/inquiry/'+method_type,
        method: 'get',
        params: query
    })
}
export function sales_lists () {
    return request({
        url: 'api/v1/data/user_list?user_type=102',
        method: 'get',
    })
}
export function outPrice (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/outPrice?inquiry_id='+id,
        method: 'get',
    })
}
export function outPrice_quote (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/outPrice?quote_id='+id,
        method: 'get',
    })
}
export function upload () {
    return request({
        url: 'api/v1/inquiry/inquiry/upload',
        method: 'get',
    })
}
export function uploadList () {
    return request({
        url: 'api/v1/inquiry/inquiry/uploadList',
        method: 'get',
    })
}
export function uploadDeal (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/uploadDeal?id='+id,
        method: 'get',
    })
}

export function saveDeal (data,that) {
    that.loading=true
    request({
        url: 'api/v1/inquiry/inquiry/saveDeal',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData();
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function create_source (data, type, method_type, that) {
    that.loading = true
    request({
        url: 'api/v1/' + type + '/' + method_type,
        method: 'post',
        data
    }).then(res => {
        that.loading = false
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
        that.loading = false
    })
}
export function create (data,method_type,that,type,name) {
    that.loading=true
    request({
        url: 'api/v1/inquiry/'+method_type+'/create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            if(type=='add'){
                const tagName= 'Inquery-add'
                that.closeInqueryAdd({
                    tagName,
                    vm: that
                })
                that.$router.push({
                    path: "/Inquery/"+name.split('-').pop(),
                    name: name,
                });
            }else{
                that.dialogAdd = false
                that.$emit('refresh')
            }
        }else{
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function update (data,method_type,that,id) {
    that.loading=true
    request({
        url: 'api/v1/inquiry/'+method_type+'/'+data.id+'/update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.dialogAdd = false
            that.dialogEdit = false
            that.fetchData(id);
            that.$emit('refresh')
        }else {
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'success'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function outPriceCreate (data,that) {
    that.loading=true
    request({
        url: 'api/v1/inquiry/inquiry/outPriceCreate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.show_watch=true
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            // that.fetchData(inquiry_id);
            // that.$emit('refresh')
        }else {
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function send_sale (inquiry_id,quote_id,quote_price,price,that) {
    that.loading=true
    request({
        url: 'api/v1/inquiry/inquiry/outPriceCreate',
        method: 'post',
        data:{
            inquiry_id:inquiry_id,
            quote_id:quote_id,
            quote_price:quote_price,
            price:price,
        }
    }).then(res => {
        if (res && res.code == 0) {
            that.loading=false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.show_watch=true
        }else {
            that.loading=false
            that.$message({
                message: res.msg,
                type: 'success'
            });
        }
    }).catch(rr=>{
        that.loading=false
    })
}
export function destroy(id,that) {
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
                    url: 'api/v1/inquiry/inquiry/uploadDestory',
                    method: 'post',
                    data: {
                        ids:[id]
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
                        if (that.currentPage === 1) {
                            that.fetchData();
                        } else {
                            that.currentPage = 1;
                            that.fetchData();
                        }
                    }
                })
            }
            if (action === 'cancel') {
                done();
            }
        }
    })
}
export function destroy_SalerAllocList(id,that) {
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
                    url: 'api/v1/inquiry/SalerAllocList/destroy',
                    method: 'post',
                    data: {
                        ids:[id]
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
                        that.fetchData();
                    }
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
        url: 'api/v1/saler_contract/' + id + '/receive_address?type='+index,
        method: 'get',
    })
}
export function receive_address_create(data,that) {
    return request({
        url: 'api/v1/saler_contract/receive_address_create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData();
            that.dialogAddresses=false
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {})
}
export function receive_address_update(data,id,that) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/receive_address_update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData();
            that.dialogAddresses=false
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
                        that.fetchData();
                        that.dialogAddresses=false
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
export function msds (query) {
    return request({
        url: 'api/v1/inquiry/inquiry/msds',
        method: 'get',
        params: query
    })
}
export function msds_generate (data, that) {
    return request({
      url: 'api/v1/inquiry/inquiry/msds_generate',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.close_msds()
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
  export function coa_create (data, that) {
    request({
      url: 'api/v1/inquery_generate/create',
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
            that.aaa=[]
            that.aaa = that.workflow(res.data.id,res.workflow.enabledTrans,res.workflow.i18n,that.aaa,res.workflow.routes)
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
  export function pushOutpriceToLanbo (data) {
    return request({
      url: 'api/v1/inquiry/inquiry/pushOutpriceToLanbo',
      method: 'post',
      data
    })
  }
  export function cancelPushOutprice (data) {
    return request({
      url: 'api/v1/inquiry/inquiry/cancelPushOutprice',
      method: 'post',
      data
    })
  }
  export function sendInquiryToYaoshi (data) {
    return request({
      url: 'api/v1/inquiry/PurchaseQuote/sendInquiryToYaoshi',
      method: 'post',
      data
    })
  }
  export function assigned_quantity (data) {
    return request({
      url: 'api/v1/inquiry/inquiry_set/assigned_quantity',
      method: 'post',
      data
    })
  }
  export function userSetting_list (query) {
    return request({
        url: 'api/v1/userSetting/xiangmubuUser',
        method: 'get',
        params: query
    })
}
export function userSetting_update (data) {
    return request({
        url: 'api/v1/userSetting/updateSetting',
        method: 'post',
        data
    })
}
  export function assigned_quantity_list (query) {
    return request({
        url: 'api/v1/inquiry/inquiry_set/assigned_quantity_list',
        method: 'get',
        params: query
    })
}
export function set_key (id) {
    return request({
        url: 'api/v1/inquiry/inquiry/'+id+'/set_key',
        method: 'post',
    })
}
export function inquiryNoticesCreateFromConsign (data) {
    return request({
        url: 'api/v1/inquiry/inquiry/inquiryNoticesCreateFromConsign',
        method: 'post',
        data
    })
}
export function getXiangmubuZhipaiSell (inquiry_id) {
    return request({
        url: 'api/v1/data/getXiangmubuZhipaiSell?inquiry_id='+inquiry_id,
        method: 'get',
    })
}
export function getXiangmubuZhipaiPurchase (inquiry_id) {
    return request({
        url: 'api/v1/data/getXiangmubuZhipaiPurchase?inquiry_id='+inquiry_id,
        method: 'get',
    })
}
export function getOutPriceByInquiryIds (data) {
    return request({
        url: 'api/v1/inquiry/inquiry/getOutPriceByInquiryIds',
        method: 'post',
        data
    })
}


