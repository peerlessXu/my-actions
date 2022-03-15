const axios = require('axios')

const instance = axios.create({
  timeout: 60000,
  responseType: 'json',
  withCredentials: false // 表示跨域请求时是否需要使用凭证
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    if (config.method === 'get') {
      config.params &&
        Object.keys(config.params).forEach((item) => {
          if (
            config.params[item] === null ||
            config.params[item] === undefined
          ) {
            config.params[item] = ''
          }
        })
    } else {
      config.data &&
        Object.keys(config.data).forEach((item) => {
          if (config.data[item] === null || config.data[item] === undefined) {
            config.data[item] = ''
          }
        })
    }
    if (config.requestConfig && config.requestConfig.cookie) {
      config.headers['Cookie'] = config.requestConfig.cookie
    }
    if(config.requestConfig && config.requestConfig.referer){
      config.headers['Referer'] = config.requestConfig.referer
    }
    return config
  },
  (error) => {
    notification.error({
      message: '提示',
      description: error
    })
    return Promise.reject(error)
  }
)

/**
 *
 * @param {String} method 请求方法(get|post|put|patch|delete...)
 * @param {String} url 请求地址
 * @param {Object} data 请求数据,key/value格式
 * @param {Object} requestConfig 请求配置，（noErrorMsg:错误请求是否展示提示;）
 * @returns {Promise} 响应
 * @示例
 * 		await this.$request('get', `/detail/${this.id}`, data, {noErrorMsg:false})
 * 		await this.$request({url:xxx, data:xxx, method:xxx, requestConfig:xxx})
 */
const request = (method, url, data, requestConfig) => {
  if (typeof method === 'object') {
    const config = method
    url = config.url || '/'
    data = config.data || {}
    method = config.method || 'post'
    requestConfig = config.requestConfig || null
  }
  const option = {
    url,
    method,
    requestConfig
  }
  if (/put|post|patch/i.test(method)) {
    option.data = data
  } else {
    option.params = data
  }
  return instance(option)
}

module.exports={
	request
}