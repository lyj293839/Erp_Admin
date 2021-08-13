import request from '@/plugin/axios'

export function saler_select(id) {
    return request({
        url: 'api/v1/saler_contract/getDetailsByContractId?id=' + id,
        method: 'get',
    })
}

export function details_download(query) {
    return request({
        url: 'api/v1/saler_contract_count/details_download',
        method: 'get',
        params:query
    })
}
export function saler_contract_count(query) {
    return request({
        url: 'api/v1/saler_contract_count',
        method: 'get',
        params:query
    })
}
export function notice_preout_list(id,query) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/notice_preout_list',
        method: 'get',
        params:query
    })
}
export function download_pdf(item) {
    return request({
        url: 'api/v1/saler_contract/'+item.id+"/download_pdf",
        method: 'get',
        responseType: 'blob'
    })
}
export function edit_notice_view(id) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/edit_notice_view',
        method: 'get',
    })
}
export function saler_contract_count_details(query) {
    return request({
        url: 'api/v1/saler_contract_count/details',
        method: 'get',
        params:query
    })
}
export function customer_lists_all() {
    return request({
        url: 'api/v1/customer_lists',
        method: 'get',
    })
}

export function express_delivery(id) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/express_delivery',
        method: 'get',
    })
}

export function saler_contract(data) {
    return request({
        url: 'api/v1/saler_contract/add',
        method: 'get',
    })
}

export function saler_contract_list(data) {
    return request({
        url: 'api/v1/saler_contract',
        method: 'get',
        params: data
    })
}
export function saler_contract_nb(data) {
    return request({
        url: 'api/v1/saler_contract_nb',
        method: 'get',
        params: data
    })
}
export function verify_list(data) {
    return request({
        url: 'api/v1/saler_contract/verify_list',
        method: 'get',
        params: data
    })
}

export function batch_party_a(data) {
    return request({
        url: 'api/v1/saler_contract/batch_party_a',
        method: 'get',
        params: data
    })
}

export function saler_receipt_list(query) {
    return request({
        url: 'api/v1/saler_contract/receipt_list',
        method: 'get',
        params: query
    })
}

export function saler_contract_inquiry(query) {
    return request({
        url: 'api/v1/saler_contract/inquiry',
        method: 'get',
        params: query
    })
}

export function split_shelve_list(package_id) {
    return request({
        url: 'api/v1/saler_contract/split_shelve_list?package_id=' + package_id,
        method: 'get',
    })
}

export function split_packaging_view(inventory_shelve_id, package_id) {
    return request({
        url: 'api/v1/saler_contract/split_packaging_view?inventory_shelve_id=' + inventory_shelve_id + '&package_id=' + package_id,
        method: 'get',
    })
}

export function saler_contract_generate(data) {
    return request({
        url: 'api/v1/saler_contract/generate',
        method: 'post',
        data
    })
}

export function view_update(data,that) {
    return request({
        url: 'api/v1/saler_contract/view_update',
        method: 'post',
        data
    })
}
export function saler_update(data) {
    return request({
        url: 'api/v1/saler_contract/update',
        method: 'post',
        data
    })
}

export function receive_address_create(data,that,type,a) {
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
            if(type=='detail'){
                that.fetch_data();
            }
            that.delete_receive_good()
            if(a){
                that.add_ref()
            }else{
                that.supplyChange_a()
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
        url: 'api/v1/saler_contract/'+id+'/receive_address_update',
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

export function saler_contract_detail(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/view',
        method: 'get',
    })
}
export function saler_contract_detail_nb(id) {
    return request({
        url: 'api/v1/saler_contract_nb/' + id + '/view',
        method: 'get',
    })
}
export function saler_edit(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/edit',
        method: 'get',
    })
}

export function saler_verify_view(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/verify_view',
        method: 'get',
    })
}

export function preemption_view(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/preemption_view',
        method: 'get',
    })
}

export function fee_application_view(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/fee_application_view',
        method: 'get',
    })
}

export function receive_address(id,index) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/receive_address?type='+index,
        method: 'get',
    })
}

export function deliver_good(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/deliver_good',
        method: 'get',
    })
}

export function deliver_good_create(data, that,a) {
    return request({
        url: 'api/v1/saler_contract/deliver_good_create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.account_edit_api()
            that.deliver_good_close()
            if(a){
                that.select_express_account_type(a)
            }else{
                that.select_express_account_type(that.sale.express_account_type)
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {})
}

export function deliver_good_update(data,id,that,a) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/deliver_good_update',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.deliver_good_close()
            if(a){
                that.select_express_account_type(a)
            }else{
                that.select_express_account_type(that.sale.express_account_type)
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {})
}

export function deliver_good_destory(row,type,method_type,that,a) {
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
                        that.account_edit()
                        if(a){
                            that.select_express_account_type(a)
                        }else{
                            that.select_express_account_type(that.sale.express_account_type)
                        }
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

export function fee_application_save(id, data, that,tagName) {
    that.loading = true
    return request({
        url: 'api/v1/saler_contract/' + id + '/fee_application_save',
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
                path: "/sales/sales",
                name: "sales-sales"
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

export function cancle_fee_application(id, that) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/cancle_fee_application',
        method: 'get',
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData(that.id)
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
}

export function automatic_delivery(data, that) {
    return request({
        url: 'api/v1/saler_contract/automatic_delivery',
        method: 'post',
        data: data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData()
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
}

export function billing_application(data, that,tagName) {
    return request({
        url: 'api/v1/invoice/billing_application',
        method: 'post',
        data: data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.loading = false
            that.$router.push({
                path: '/sales/sales',
                name: 'sales-sales',
            })
            if(tagName){
                that.close({tagName})
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading = false
        }
    }).catch(rr => {
        that.loading = false
    })
}

export function billing_application_view(data, that) {
    return request({
        url: 'api/v1/invoice/billing_application_view',
        method: 'post',
        data: data
    })
}

export function preemption(data, id, that) {
    return request({
        url: 'api/v1/saler_contract/preemption',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData(id)
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
}

export function split_packaging(data, id, that) {
    return request({
        url: 'api/v1/saler_contract/split_packaging',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.splitDialog = false
            that.fetchData(id)
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
}

export function contractNoteCreate(data, that) {
    that.loading = true
    return request({
        url: 'api/v1/contractNoteCreate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading = false
            that.$message({
                message: 'success',
                type: 'success'
            });
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

export function contractNoteDestroy(row, that) {
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
                let ids = [row.id]
                request({
                    url: 'api/v1/contractNoteDestroy',
                    method: 'post',
                    data: {
                        ids
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
                        that.fetchData_b(that.id)
                    }
                }).catch(res => {
                    instance.confirmButtonLoading = false;
                })
            }
            if (action === 'cancel') {
                done();
            }
        }
    })
}


export function saler_contract_verify(data, that,tagName) {
    that.loading = true
    return request({
        url: 'api/v1/saler_contract/' + data.saler_contract_id + '/verify',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading = false
            that.$message({
                message: 'success',
                type: 'success'
            });
            if(that.$route.query.name=='sales-list_check'){
                that.$router.push({
                    path: "/sales/list_check",
                    name: "sales-list_check"
                });
            }else{
                that.$router.push({
                    path: "/sales/sales",
                    name: "sales-sales"
                });
            }
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

export function end_processing(data, that) {
    that.loading = true
    return request({
        url: 'api/v1/saler_contract/end_processing',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.loading = false
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData()
            that.dialogVisible = false
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

export function quality_dispute(data, that) {
    return request({
        url: 'api/v1/saler_contract/quality_dispute',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.fetchData()
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
}

export function saler_create(data, that) {
    that.loading = true
    return request({
        url: 'api/v1/saler_contract/create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.close()
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

export function get_deliver_goods(memeber_id, express_account_type) {
    return request({
        url: 'api/v1/data/get_deliver_goods?member_id=' + memeber_id + '&express_account_type=' + express_account_type,
        method: 'get',
    })
}

export function cas_info(cas) {
    return request({
        url: 'api/v1/es/cas/' + cas,
        method: 'get',
    })
}

export function saler_contract_info(id) {
    return request({
        url: 'api/v1/data/' + id + '/saler_contract_info',
        method: 'get',
    })
}

export function customer_lists(name) {
    return request({
        url: 'api/v1/data/member_list?type=1&name=' + name,
        method: 'get',
    })
}

export function contact_info(id) {
    return request({
        url: 'api/v1/data/contacts_by_member?user_type=102&member_id=' + id,
        method: 'get',
    })
}

export function corp_lists(name) {
    return request({
        url: 'api/v1/data/member_list?is_system=1',
        method: 'get',
    })
}

export function sale_lists() {
    return request({
        url: 'api/v1/data/user_list?user_type=102',
        method: 'get',
    })
}

export function corp_info(id) {
    return request({
        url: 'api/v1/data/' + id + '/saler_contract_info',
        method: 'get',
    })
}

export function member_bank_accounts(id) {
    return request({
        url: 'api/v1/data/' + id + '/member_bank_accounts',
        method: 'get',
    })
}

//预占详情
export function preout_view(query) {
    return request({
        url: 'api/v1/saler_contract/preout_view',
        method: 'get',
        params: query
    })
}
export function edit_notice(data) {
    return request({
        url: 'api/v1/saler_contract/edit_notice',
        method: 'post',
        data
    })
}

//取消预占
export function cancle_preout(id, prod_id,that, query_id,length,status) {
    if(status==0){
        return request({
        url: 'api/v1/saler_contract/cancle_preout',
        method: 'post',
        data: {
            preout_id: id,
            prod_id:prod_id
        }
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.cancelDialog = false
            if (query_id) {
                if (length == 1) {
                    that.$router.push({
                        path: '/sales/notice',
                        name: 'sales-notice',
                    })
                } else {
                    that.fetchData_b(query_id)
                }
            } else {
                that.fetchData()
            }
            
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
    }else{
        return request({
            url: 'api/v1/saler_contract/cancle_preout',
            method: 'post',
            data: {
                preout_id: id,
                prod_id:prod_id,
                check_pack:1,
                is_notice:1
            }
        }).then(res => {
            if (res && res.code == 0) {
                that.$message({
                    message: 'success',
                    type: 'success'
                });
                that.cancelDialog = false
                if (query_id) {
                    if (length == 1) {
                        that.$router.push({
                            path: '/sales/notice',
                            name: 'sales-notice',
                        })
                    } else {
                        that.fetchData(query_id)
                    }
                } else {
                    that.fetchData()
                }
            } else {
                that.$message({
                    message: res.msg,
                    type: 'error'
                });
            }
        }).catch(rr => {
        })
    }
    
}

export function cancle_preout_normal(id, prod_id) {
    return request({
        url: 'api/v1/saler_contract/cancle_preout',
        method: 'post',
        data: {
            preout_id: id,
            prod_id:prod_id
        }
    })
}
//取消通知
export function cancle_notice(id,prod_id, that) {
    return request({
        url: 'api/v1/saler_contract/cancle_notice',
        method: 'post',
        data: {
            preout_id: id,
            prod_id:prod_id,
            is_notice:1,
            check_pack:1
        }
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.cancelDialog = false
            that.fetchData()
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
    })
}
//shipping_notice
export function shipping_notice(data, that) {
    return request({
        url: 'api/v1/saler_contract/shipping_notice',
        method: 'post',
        data
    })
}

//待发货通知
export function pending_contract_list(query) {
    return request({
        url: 'api/v1/saler_contract/preout_list',
        method: 'get',
        params: query
    })
}

//销售列表
export function sale_list(query) {
    return request({
        url: 'api/v1/data/user_list?user_type=102',
        method: 'get',
        params: query
    })
}

//客户
export function customer_company(name) {
    return request({
        url: 'api/v1/data/member_list?type=1&name=' + name,
        method: 'get',
    })
}

//发货详情
export function pending_contract_view(id) {
    return request({
        url: 'api/v1/saler_contract/pending_contract_view?contract_detail_id=' + id,
        method: 'get',
    })
}

//合并发货通知
export function shipping_notice_view(data) {
    return request({
        url: 'api/v1/saler_contract/shipping_notice_view',
        method: 'post',
        data
    })
}

//国家
export function country_list() {
    return request({
        url: 'api/v1/data/country_list',
        method: 'get',
    })
}

//城市
export function city_list(data) {
    return request({
        url: 'api/v1/data/' + data + '/city_lis',
        method: 'get',
    })
}

//applyPurchase
export function applyPurchase(id) {
    return request({
        url: 'api/v1/saler_contract/applyPurchase?id=' + id,
        method: 'get',
    })
}

export function applyPurchase_create(data, that) {
    return request({
        url: 'api/v1/saler_contract/applyPurchase/create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.loading = false
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading = false
        }
    }).catch(rr => {
        that.loading = false
    })
}

export function select(data, that) {
    return request({
        url: 'api/v1/receipt/select',
        method: 'post',
        data: data
    })
}

export function receipt_index(data, that) {
    return request({
        url: 'api/v1/receipt/index',
        method: 'post',
        data: data
    })
}

export function receipt_create(data, that,tagName) {
    return request({
        url: 'api/v1/receipt/create',
        method: 'post',
        data: data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.save_fy = false
            // that.$router.push({
            //     path: '/commission/Receipt_list',
            //     name: 'commission-Receipt_list',
            // })
            // if(tagName){
            //     that.closeAdd({tagName})
            // }
            that.fetchData_b()
            that.transactionpipe_detail_()
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.save_fy = false
        }
    }).catch(rr => {
        that.save_fy = false
    })
}
export function settling(data, that) {
    return request({
        url: 'api/v1/receipt/settling',
        method: 'post',
        data: data
    })
}
export function cancle_settle(data, that) {
    return request({
        url: 'api/v1/receipt/cancle_settle',
        method: 'post',
        data: data
    })
}
export function save_other_fee(data) {
    return request({
        url: 'api/v1/receipt/save_other_fee',
        method: 'post',
        data: data
    })
}

export function evaluate(data, that) {
    return request({
        url: 'api/v1/expression/evaluate',
        method: 'post',
        data: data
    })
}

export function notice_list(query) {
    return request({
        url: 'api/v1/invoice/notice_list',
        method: 'get',
        params: query
    })
}
export function due_date_change_verify_list(query) {
    return request({
        url: 'api/v1/due_data_change/due_date_change_verify_list',
        method: 'get',
        params: query
    })
}

export function notice_verify_list(query) {
    return request({
        url: 'api/v1/invoice/notice_verify_list',
        method: 'get',
        params: query
    })
}

export function notice_verify_view(id) {
    return request({
        url: 'api/v1/invoice/notice_verify_view?id=' + id,
        method: 'get',
    })
}

export function supervisor_notice_verify_view(id) {
    return request({
        url: 'api/v1/invoice/supervisor_notice_verify_view?id=' + id,
        method: 'get',
    })
}

export function notice_verify(data, that,tagName) {
    return request({
        url: 'api/v1/invoice/notice_verify',
        method: 'post',
        data: data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.loading = false
            that.$router.push({
                path: '/sales/notice_check',
                name: 'sales-notice_check',
            })
            if(tagName){
                that.closeAdd({tagName})
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading = false
        }
    }).catch(rr => {
        that.loading = false
    })
}

export function supervisor_notice_verify(data, that,tagName) {
    return request({
        url: 'api/v1/invoice/supervisor_notice_verify',
        method: 'post',
        data: data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success'
            });
            that.loading = false
            that.$router.push({
                path: '/sales/notice_verify_check',
                name: 'sales-notice_verify_check',
            })
            if(tagName){
                that.closeAdd({tagName})
            }
        } else {
            that.$message({
                message: res.msg,
                type: 'error'
            });
            that.loading = false
        }
    }).catch(rr => {
        that.loading = false
    })
}

export function export_file(data,that) {
    that.export_file_loading=true
    return request({
        url: 'api/v1/receipt/export',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.export_file_loading=false
            window.open(res.data)
        } else {
            that.export_file_loading=false
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr => {
        that.export_file_loading=false
    })
}
export function DownLoad_pdf (uri) {
    return request({
        url: uri,
        method: 'get',
        responseType: 'arraybuffer',
    });
}
export function contract_change(data) {
    return request({
        url: 'api/v1/saler_contract/contract_change',
        method: 'post',
        data
    })
}
export function change_log_edit(data) {
    return request({
        url: 'api/v1/saler_contract/change_log_edit',
        method: 'post',
        data
    })
}
export function retrun_application(data) {
    return request({
        url: 'api/v1/saler_contract/return_application',
        method: 'post',
        data
    })
}
export function bank_account_create(data) {
    return request({
        url: 'api/v1/saler_contract/bank_account_create',
        method: 'post',
        data
    })
}
export function bank_account_update(data,id,that) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/bank_account_update',
        method: 'post',
        data
    })
}
export function bank_account_destory(row,that) {
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
                    url: 'api/v1/saler_contract/bank_account_destory',
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
                        that.dialogCollection = false
                        
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
export function refund_application(data) {
    return request({
        url: 'api/v1/saler_contract/refund_application',
        method: 'post',
        data
    })
}
export function refund_review(data) {
    return request({
        url: 'api/v1/saler_contract/refund_review',
        method: 'post',
        data
    })
}
export function change_review(data) {
    return request({
        url: 'api/v1/saler_contract/change_review',
        method: 'post',
        data
    })
}
export function return_review(data) {
    return request({
        url: 'api/v1/saler_contract/return_review',
        method: 'post',
        data
    })
}
export function change_verify(data) {
    return request({
        url: 'api/v1/saler_contract/change_verify',
        method: 'post',
        data
    })
}
export function download_pdf_flow(id) {
    return request({
        url: 'api/v1/saler_contract/'+id+'/download_pdf_flow',
        method: 'get',
    })
}
export function ship_notice_list(query) {
    return request({
        url: 'api/v1/saler_contract/ship_notice_list',
        method: 'get',
        params: query
    })
}
export function cancel_ship_notice (id,prod_id, that) {
    return request({
      url: 'api/v1/saler_contract/cancel_ship_notice',
      method: 'post',
      data: {
        preout_id: id,
        prod_id:prod_id,
        is_notice:1,
        check_pack:1
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
export function cancel_ship_notice_detail (id,prod_id, that) {
    return request({
        url: 'api/v1/saler_contract/cancel_ship_notice',
        method: 'post',
        data: {
            preout_id: id,
            prod_id:prod_id,
            is_notice:1,
            check_pack:1
        }
    })
}

export function cancel_all_notice (id, that) {
    return request({
      url: 'api/v1/saler_contract/cancel_all_notice',
      method: 'post',
      data: {
        combine_id: id,
        check_pack:1
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
export function get_contract_number(id) {
    return request({
        url: 'api/v1/data/get_contract_number',
        method: 'get',
        params: {currency_id:id}
    })
}
export function sales_statistics(query) {
    return request({
        url: 'api/v1/saler_contract_count/sales_statistics',
        method: 'get',
        params: query
    })
}
export function revoke_cancel (id,that) {
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
                    url: 'api/v1/saler_contract/revoke_cancel',
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
                        that.dialogCollection = false
                        that.fetchData()
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
export function receipt_export(query) {
    return request({
        url: 'api/v1/receipt/export',
        method: 'get',
        params: query
    })
}
export function late_export(query) {
    return request({
        url: 'api/v1/saler_contract_count/late_export',
        method: 'get',
        params: query
    })
}
export function purchase_inventory_info(id) {
    return request({
        url: 'api/v1/saler_contract/' + id + '/purchase_inventory_info',
        method: 'get',
    })
}
export function settlement_remark (data, that) {
    return request({
      url: 'api/v1/saler_contract/settlement_remark',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.fetch_data()
        that.settle_close()
      } else {
        that.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(rr => {
    })
}
export function set_customer_other (data, that) {
    return request({
      url: 'api/v1/saler_contract/set_customer_other',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.fetchData()
        that.dialogCustomer = false
      } else {
        that.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(rr => {
    })
}
export function expected_pay_date (data, that) {
    return request({
      url: 'api/v1/saler_contract/expected_pay_date',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.fetch_data()
        that.dialogExpected = false
      } else {
        that.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(rr => {
    })
}
export function cancle_f (data,type, method_type, that) {
    return request({
      url: 'api/v1/' + type + '/' + method_type,
      method: 'post',
      data
    })
}
export function update_detial_remark (data, that) {
    return request({
      url: 'api/v1/saler_contract/update_detial_remark',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.dialogNote = true
        that.fetch_data()
      } else {
        that.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(rr => {
    })
}
export function auto_contract_list (query) {
    return request({
      url: 'api/v1/saler_contract/auto_contract_list',
      method: 'get',
      params: query
    })
  }
  export function batch_add_party_a (data, that) {
    return request({
      url: 'api/v1/saler_contract/batch_add_party_a',
      method: 'post',
      data
    }).then(res => {
      if (res && res.code == 0) {
        that.$message({
          message: 'success',
          type: 'success'
        })
        that.fetchData()
        that.dialogCustomer_list = false
      } else {
        that.$message({
          message: res.msg,
          type: 'error'
        })
      }
    }).catch(rr => {
    })
}
export function credit_note_list(data) {
    return request({
        url: 'api/v1/invoice/credit_note_list',
        method: 'get',
        params: data
    })
}
export function credit_note_invoicing_view (data) {
    return request({
      url: 'api/v1/invoice/credit_note_invoicing_view',
      method: 'post',
      data
    })
}
export function credit_note_invoicing (data,that) {
    return request({
      url: 'api/v1/invoice/credit_note_invoicing',
      method: 'post',
      data
    }).then(res => {
        if (res && res.code == 0) {
          that.$message({
            message: 'success',
            type: 'success'
          })
          that.loading_save = false
          that.back()
        } else {
          that.$message({
            message: res.msg,
            type: 'error'
          })
          that.loading_save = false
        }
      }).catch(rr => {
        that.loading_save = false
      })
}
export function check_pt_number (data) {
    return request({
      url: 'api/v1/data/check_pt_number',
      method: 'post',
      data
    })
}
export function change_due_date_application (id) {
    return request({
      url: 'api/v1/saler_contract_count/'+id+'/change_due_date_application',
      method: 'get',
    })
}
export function change_due_date_application_save (data) {
    return request({
      url: 'api/v1/saler_contract_count/change_due_date_application_save',
      method: 'post',
      data
    })
}
export function due_date_change_verify (data) {
    return request({
      url: 'api/v1/due_data_change/due_date_change_verify',
      method: 'post',
      data
    })
}
export function batch_notice_verify (data) {
    return request({
      url: 'api/v1/invoice/batch_notice_verify',
      method: 'post',
      data
    })
}
export function contract_review_allocation (data) {
    return request({
      url: 'api/v1/saler_contract_set/contract_review_allocation',
      method: 'post',
      data
    })
}
export function contract_review_allocation_list(data) {
    return request({
        url: 'api/v1/saler_contract_set/contract_review_allocation_list',
        method: 'get',
        params: data
    })
}
export function check_ship_quantity(data) {
    return request({
        url: 'api/v1/ship_notice/check_ship_quantity',
        method: 'post',
        data
    })
}
export function check_customer_account_period(data) {
    return request({
        url: 'api/v1/saler_contract/'+data+'/check_customer_account_period',
        method: 'post',
    })
}