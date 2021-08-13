import request from '@/plugin/axios'
export function unit_lists (data) {
    return request({
        url: 'api/v1/unit',
        method: 'get',
    })
}
export function create (data) {
    return request({
        url: 'api/v1/unit/create',
        method: 'post',
        data
    })
}
export function update (data) {
    return request({
        url: 'api/v1/unit/'+data.id+'/update',
        method: 'post',
        data
    })
}
export function destroy (ids) {
    return request({
        url: 'api/v1/unit/destroy',
        method: 'post',
        data: {
            ids
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