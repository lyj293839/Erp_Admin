import request from '@/plugin/axios'
export function detail (id,query) {
    return request({
        url: 'api/v1/storageIn/form_by_procurement_contract?id='+id,
        method: 'get',
        params: query
    })
}

export function getShevies (id) {
    return request({
        url: 'api/v1/getShevies?warehouse_id='+id,
        method: 'get',
    })
}

export function instore (data,that) {
    that.save_fy=true
    request({
        url: 'api/v1/inventory/instore',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
            });
            that.has_id=true
            that.save_fy=false
            that.sample.inventory_id = res.data.id
            // that.inventory_id= res.data.inventory_shelf?res.data.inventory_shelf.id:''
            that.inventory_id = res.data.id
            // that.$emit('refresh')
            // that.close()
        }else{
            that.$message({
                message: res.msg,
                type: 'error'
            });
        }
    }).catch(rr=>{
        that.save_fy = false
    })
}
export function sample_create (data,that) {
    request({
        url: 'api/v1/sample/extraCreate',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {

            that.$message({
                message: 'success',
                type: 'success',
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
export function pack_create (data,that) {
    request({
        url: 'api/v1/pack/create',
        method: 'post',
        data
    }).then(res => {
        if (res && res.code == 0) {
            that.$message({
                message: 'success',
                type: 'success',
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
export function supplier_lists(name) {
    return request({
        url: 'api/v1/data/member_list?type=2&name=' + name,
        method: 'get',
    })
}
export function storageIn_export(query) {
    return request({
        url: 'api/v1/storageIn/export',
        method: 'get',
        params: query
    })
}
export function consign_instore (data) {
    return request({
        url: 'api/v1/inventory/consign_instore',
        method: 'post',
        data
    })
}