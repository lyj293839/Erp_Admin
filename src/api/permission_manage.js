import request from '@/plugin/axios'

export function permission_lists (data) {
    return request({
        url: 'api/v1/permission',
        method: 'get',
    })
}
export function permission_create (data) {
    return request({
        url: 'api/v1/permission/create',
        method: 'post',
        data
    })
}
export function permission_update (data) {
    return request({
        url: 'api/v1/permission/'+data.id+'/update',
        method: 'post',
        data
    })
}
export function permission_destroy (ids) {
    return request({
        url: 'api/v1/permission/destroy',
        method: 'post',
        data: {
            ids
        }
    })
}
