import Taro from '@tarojs/taro'
// import { HTTP_STATUS } from '../const/status'
import { base } from './config'
// import { console.log } from '../utils'

const token = ''

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    // let token = getApp().globalData.token
    // if (!token) login()
    console.log('params', params)
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    // const option = {
    //   isShowLoading: false,
    //   loadingText: '正在加载',
    //   url: base + url,
    //   data: data,
    //   method: method,
    //   header: { 'content-type': contentType, 'token': token },
    //   success(res) {
    //     if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
    //       return console.log('api', '请求资源不存在')
    //     } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
    //       return console.log('api', '服务端出现了问题')
    //     } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
    //       return console.log('api', '没有权限访问')
    //     } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
    //       return res.data
    //     }
    //     return res.data
    //   },
    //   error(e) {
    //     console.log('api', '请求接口出现问题', e)
    //   }
    // }
    // return Taro.request(option)

    return Taro.request({
      url: base + url,
      data: data,
      header: { 'content-type': contentType, 'token': token },
      method: method,
    }).then((res) => {
      const { statusCode, data } = res;
      // console.log(res)
      if (statusCode >= 200 && statusCode < 300) {
        // if (!noConsole) {
        //   console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`,res.data);
        // }
        if (data.code !== 200) {
          Taro.showToast({
            title: `${res.data.error.message}~` || res.data.error.code,
            icon: 'none',
            mask: true,
          });
        }
        console.log(data)
        return data;
      } else {
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    })
  },
  get(url, data = '') {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  }
}