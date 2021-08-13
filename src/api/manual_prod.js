import request from '@/plugin/axios'
export function lists (method_url) {
    return request({
        url: 'api/v1/'+method_url,
        method: 'get',
    })
}
export function create (method_url,data){
    return request({
        url: 'api/v1/'+method_url+'/create',
        method: 'post',
        data
    })
}
export function update (method_url,data) {
    return request({
        url: 'api/v1/'+method_url+data.id+'/update',
        method: 'post',
        data
    })
}
export function destroy (row,type,that) {
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
                let ids = [row.Capital]
                request({
                    url: 'api/v1/'+type+'/destroy',
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
                        if(that.prod_id){
                            // that.edit_refresh(that.prod_id);
                            // that.$emit('refresh',that.prod_id)
                            that[type].splice(index,1)
                        }else{
                            if (that.currentPage === 1) {
                                that.fetchData()
                            } else {
                                that.currentPage = 1;
                                that.fetchData()
                            }
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
export function list_page (queryList,method_url) {
    return request({
        url: 'api/v1/'+method_url,
        method: 'get',
        params:queryList
    })
}