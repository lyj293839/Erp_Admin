import request from '@/plugin/axios'

export function enum_lists (data) {
    return request({
        url: 'api/v1/enum/types',
        method: 'get',
    })
}

//list
export function lists (query,method_type) {
    query.key = method_type;
    return request({
        url: 'api/v1/enum',
        method: 'get',
        params: query
    })
}
export function create (data,method_type,that) {
    that.addForm_loadingSave = true;
    data.key = method_type;
    request({
        url: 'api/v1/enum/create',
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
export function destroy (row,method_type,that) {
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
                    url: 'api/v1/enum/destroy',
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
                        if (that.currentPage === 1) {
                            that.fetchData();
                        } else {
                            that.currentPage = 1;
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
export function exchange_rate (query) {
    return request({
        url: 'api/v1/exchange_rate/index',
        method: 'get',
        params: query
    })
}
export function exchange_rate_create (data,that) {
    that.addForm_loadingSave = true;
    request({
        url: 'api/v1/exchange_rate/add',
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
export function exchange_rate_update (data,that) {
    that.editForm_loadingSave = true;
    request({
        url: 'api/v1/exchange_rate/update',
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
