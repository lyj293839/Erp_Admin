import request from '@/plugin/axios'
export function lists(query,method_type) {
    return request({
        url: 'api/v1/'+method_type,
        method: 'get',
        params:query
    })
}
export function translate(source,target,string) {
    return request({
        url: 'api/v1/translate?source='+source+'&target='+target+'&string='+string,
        method: 'get',
    })
}
export function listTotal(method_type) {
    return request({
        url: 'api/v1/'+method_type,
        method: 'get',
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
                type: 'success',
            });
            that.fetchData();
            that.dialogAdd = false
            that.addForm.data = [];
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
        datas.data = []
    }).catch(rr=>{
        datas.loading=false
    })
}
export function edit (type,id) {
    return request({
        url: 'api/v1/'+type+'/'+id,
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
            that.dialogEdit = false;
            that.edit_refresh(that.member_id);
        }else {
            that.$message({
                message: res.msg,
                type: 'success'
            });
        }
        datas.data = []
    }).catch(rr=>{
        datas.loading=false
    })
}

export function destroy (row,type,method_type,that,index) {
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
                let ids = [row.id]
                request({
                    url: 'api/v1/'+type+'/'+method_type,
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
                            that.$emit('refresh',that.prod_id)
                            that[type].splice(index,1)
                        }else{
                            if (that.currentPage === 1) {
                                that.fetchData()
                            } else {
                                that.currentPage = 1;
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
export function check_prod (id) {
    return request({
        url: 'api/v1/chemprod/'+id+'/verify',
        method: 'post',
        data:{
            id:id,
            status:1
        }
    })
}
export function country_list (data) {
    return request({
        url: 'api/v1/data/country_list',
        method: 'get',
    })
}
export function city_list (data) {
    return request({
        url: 'api/v1/data/'+data+'/city_list',
        method: 'get',
    })
}
export function member_list (name,id) {
    return request({
        url: 'api/v1/data/member_list?sort=1',
        method: 'get',
    })
}
export function testitem (name,id) {
    return request({
        url: 'api/v1/testitem',
        method: 'get',
    })
}
export function getUserByType (id) {
    return request({
        url: 'api/v1/user/getUserByType?user_type_id='+id,
        method: 'get',
    })
}
export function set_status (status,type,that) {
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
                    url: 'api/v1/level_purchase/'+type+'/set_status',
                    method: 'post',
                    data: {
                        status
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