import request from '@/plugin/axios'

export function role_lists (query) {
    return request({
        url: 'api/v1/role',
        method: 'get',
        params: query
    })
}
export function role_create (name_cn,name) {
    return request({
        url: 'api/v1/role/create',
        method: 'post',
        data: {
            name_cn,
            name,
        }
    })
}
export function role_update (id,name_cn,name) {
    return request({
        url: 'api/v1/role/'+id+'/update',
        method: 'post',
        data: {
            id:id,
            name_cn,
            name,
        }
    })
}
export function role_destroy (ids) {
    return request({
        url: 'api/v1/role/destroy',
        method: 'post',
        data: {
            ids
        }
    })
}
export function role_permission (data) {
    return request({
        url: 'api/v1/role/'+data.id+'/permission',
        method: 'get'
    })
}
export function role_assignPermission(id,permissions) {
    return request({
        url: 'api/v1/role/'+id+'/assignPermission',
        method: 'post',
        data:{
            permissions:permissions
        }
    })
}
