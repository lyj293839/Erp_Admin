import request from '@/plugin/axios'
export function company_lists (data) {
    return request({
        url: 'api/v1/organize/company?departments=1&users=1&is_system=1&roles=1',
        method: 'get',
    })
}
export function company_lists_NoPermission (data) {
    return request({
        url: 'api/v1/data/company_list?departments=1&users=1&is_system=1&roles=1',
        method: 'get',
    })
}
export function company_create (data) {
    return request({
        url: 'api/v1/organize/company/create',
        method: 'post',
        data
    })
}
export function company_update (data) {
    return request({
        url: 'api/v1/organize/company/'+data.id+'/update',
        method: 'post',
        data
    })
}
export function company_destroy (ids) {
    return request({
        url: 'api/v1/organize/company/destroy',
        method: 'post',
        data: {
            ids
        }
    })
}

//department
export function departments_create (data) {
    return request({
        url: 'api/v1/organize/department/create',
        method: 'post',
        data
    })
}
export function departments_update (data) {
    return request({
        url: 'api/v1/organize/department/'+data.id+'/update',
        method: 'post',
        data
    })
}
export function departments_destroy (ids) {
    return request({
        url: 'api/v1/organize/department/destroy',
        method: 'post',
        data: {
            ids
        }
    })
}

//user
export function user_list(query,member_id) {
    return request({
        url: 'api/v1/user?member_id='+member_id,
        method: 'get',
        params: query
    })
}
export function user_list_(query,member_id,department_id) {
    return request({
        url: 'api/v1/user?member_id='+member_id+'&department_id='+department_id,
        method: 'get',
        params: query
    })
}
export function user_create (data) {
    return request({
        url: 'api/v1/user/create',
        method: 'post',
        data
    })
}
export function user_edit (id) {
    return request({
        url: 'api/v1/user/'+id+'/edit',
        method: 'post',
    })
}
export function user_update (id,data) {
    return request({
        url: 'api/v1/user/'+id+'/update',
        method: 'post',
        data
    })
}
export function user_destroy (ids) {
    return request({
        url: 'api/v1/user/destroy',
        method: 'post',
        data: {
            ids
        }
    })
}
//user mac
export function mac_lists () {
    return request({
        url: 'api/v1/user/noBindMac',
        method: 'get',
    })
}
export function mac_create (user_id,data) {
    return request({
        url: 'api/v1/user/'+user_id+'/mac/create',
        method: 'post',
        data
    })
}
export function mac_update (user_id,id,data) {
    return request({
        url: 'api/v1/user/'+user_id+'/mac/'+id+'/update',
        method: 'post',
        data
    })
}
export function mac_destroy (user_id,ids) {
    return request({
        url: 'api/v1/user/'+user_id+'/mac/destroy',
        method: 'post',
        data: {
            ids
        }
    })
}
//user permission
export function permissions_lists(user_id) {
    return request({
        url: 'api/v1/user/'+user_id+'/permission',
        method: 'post',
    })
}
export function assignPermission (user_id,data) {
    return request({
        url: 'api/v1/user/'+user_id+'/assignPermission',
        method: 'post',
        data:{
            permissions:data
        }
    })
}
export function update_has_warehouses (data) {
    return request({
        url: 'api/v1/user/update_has_warehouses',
        method: 'post',
        data
    })
}

