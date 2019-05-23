
import {
  USERINFO
} from '../../constants/userinfo'
import api from '../../service/api'

// 异步的 action
export function getUserInfo (params) {
  console.log(params)
  return dispatch => {
    api.post('users/login', params).then(res => {
      let data = res.result
      wx.setStorage({
        key: 'userInfo',
        data: data
      })
      dispatch(userInfo(data));
    })
  }
}
export const userInfo = data => {
  return {
    type: USERINFO,
    payload: data
  };
}
