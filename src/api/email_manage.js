import request from '@/plugin/axios'

export function email_manage (data) {
  return request({
    url: 'api/v1/email/less',
    method: 'post'
  })
}
export function email_lists (data) {
  return request({
    url: 'api/v1/email/mailbox',
    method: 'post',
    data
  })
}
export function email_content (data) {
  return request({
    url: 'api/v1/email/mailbox/detail',
    method: 'post',
    data
  })
}
export function latest () {
  return request({
    url: 'api/v1/message/latest',
    method: 'get'
  })
}
export function read (id) {
  return request({
    url: 'api/v1/message/' + id + '/read',
    method: 'get'
  })
}
export function reads (data) {
    return request({
        url: 'api/v1/message/reads',
        method: 'post',
        data
    })
}
export function confirm (id) {
    return request({
        url: 'api/v1/message/' + id + '/confirm',
        method: 'get'
    })
}
export function messages (query) {
  return request({
    url: 'api/v1/message',
    method: 'get',
    params: query
  })
}
