import request from '@/plugin/axios'

export function returnsIndex (query) {
  return request({
    url: 'api/v1/returns/index',
    method: 'get',
    params: query
  })
}

export function apiIn (id) {
  return request({
    url: 'api/v1/returns/' + id + '/in',
    method: 'get'
  })
}

export function apiOut (id) {
  return request({
    url: 'api/v1/returns/' + id + '/out',
    method: 'get'
  })
}

export function apidoIn (id,data) {
  return request({
    url: 'api/v1/returns/' + id + '/doin',
    method: 'post',
    data
  })
}


export function apidoOut (id,data) {
  return request({
    url: 'api/v1/returns/' + id + '/dout',
    method: 'post',
    data
  })
}

