import store from '@/store'
import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import util from '@/libs/util'
let language = util.cookies.get('language')
// 创建一个错误
function errorCreat (msg) {
    const err = new Error(msg)
    errorLog(err)
    throw err
}

// 记录和显示错误
function errorLog (err) {
    // 添加到日志
    store.dispatch('d2admin/log/add', {
        type: 'error',
        err,
        info: '数据请求异常'
    })
    // 打印到控制台
    if (process.env.NODE_ENV === 'development') {
        util.log.danger('>>>>>> Error >>>>>>')
        // console.log(err)
    }
    // 显示提示
    if(err!='Error: Network Error'&&err!='Error:Network Error'&&err!='Error: timeout of 600000ms exceeded'){
        Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
        })
    }
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'x-requested-with': 'version_number'
    },
    timeout: 600000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        // 在请求发送之前做一些处理
        const token = util.cookies.get('token')
        const language = util.cookies.get('language')
        config.headers['Authorization'] = 'Bearer ' + token
        config.headers['Version-Number'] = process.env.VUE_APP_Version
        config.headers['language'] = language
        return config
    },
    error => {
        // 发送失败
        // console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        const code = dataAxios.code
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 0:
                    // [ 示例 ] code === 0 代表没有错误
                    // if(process.env.VUE_APP_Version== dataAxios){
                    //
                    // }
                    return dataAxios

                case 1:
                    if(dataAxios.msg==='Unauthenticated.'){
                        router.push({
                            path:'/login',
                        })
                    }
                    // [ 示例 ] 其它和后台约定的 code
                    // return dataAxios
                    errorCreat(`${dataAxios.msg}`)
                    break
                case 10:
                    return dataAxios
                default:
                    // 不是正确的 code
                    errorCreat(`${dataAxios.msg}`)
                    break
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400: error.message = '请求错误'; break
                case 401: error.message = error.response.data.msg; break
                case 403: error.message = '拒绝访问'; break
                case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
                case 408: error.message = `请求超时：${error.response.config.url}`; break
                case 422: error.message = showErrors(error); break
                case 500: error.message = `服务器内部错误：${error.response.config.url}`; break
                case 501: error.message = '服务未实现'; break
                case 502: error.message = '网关错误'; break
                case 503: error.message = '服务不可用'; break
                case 504: error.message = '网关超时'; break
                case 505: error.message = 'HTTP版本不受支持'; break
                default: break
            }
        }
        // console.log('__________')
        // console.log(error)
        // console.log('+++++++++')
        errorLog(error)
        return Promise.reject(error)
    }
)

function showErrors (error) {
    let errors = error.response.data.errors
    let err = ''
    for (let key in errors) {
        for (let k in errors[key]) {
            err += errors[key][k] + '\r\n'
        }
    }
    return err
}

export default service
