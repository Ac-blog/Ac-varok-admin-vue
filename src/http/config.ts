import { ResponseData } from './httpInterface'
/**
 * axios 封装
 * 功能：
 * 1、统一调用方式
 * 2、错误异常统一处理 & 重定向
 * 3、鉴权（可选）
 * 4、抽离通用配置项
 * 5、全局 Loading 动画
 */
import axios from 'axios'
// import store from '@/store'
import defaultOpt from '@/config/httpDefaultConfig'
import { Message } from 'element-ui'

let maxDurationTimer: any = null

const dataConfig = (method: string): boolean => {
  return ['POST', 'PUT', 'PATCH', 'DELETE'].indexOf(method) > -1
}

const resetLoading = () => {
  clearTimeout(maxDurationTimer)
  maxDurationTimer = null
  // close Loading animation
  // store.dispatch('update_publicLoading_status', false)
}

export default function $http(opt: object) {
  return new Promise((resolve, reject) => {
    const instance = axios.create(defaultOpt)
    // max time about wait request response is 10 seconds
    instance.defaults.timeout = 10000

    // request interceptors
    instance.interceptors.request.use(
      (config: any) => {
        // start Loading animation
        if (!maxDurationTimer) {
          maxDurationTimer = setTimeout(() => {
            // store.dispatch('update_publicLoading_status', true)
          }, 500)
        }
        // request 数据处理
        // 判断请求方式
        if (config.method.toUpperCase() === 'GET') {
          config.params = config.payload || ''
        } else if (dataConfig(config.method.toUpperCase())) {
          config.data = config.payload || ''
        }
        return config
      },
      (error) => {
        //  1.判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // console.log('根据你设置的timeout/真的请求超时 判断请求现在超时')
          // return service.request(originalRequest);//例如再重复请求一次
        }
        //  2.需要重定向到错误页面
        return Promise.reject(error)
      },
    )

    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        let data
        resetLoading()
        // 兼容IE9
        if (response.data === undefined) {
          data = response.request.responseText
        } else {
          data = response.data
        }

        // 接口返回 success=false 时统一给出错误提示
        if (!data.success) {
          Message.error(data.message || '请求失败')
        }

        return data
      },
      (error) => {
        console.log('config', error)
        // 请求失败取消loading状态
        resetLoading()
        if (error && error.response) {
          // 根据返回的错误状态码处理
          // console.log(error.response.status)
          return Promise.reject(error) // 返回接口返回的错误信息
        }
      },
    )

    // 请求处理
    instance(opt)
      .then((res) => {
        resolve(res)
        return false
      })
      .catch((error) => {
        reject(error)
      })
  })
}
