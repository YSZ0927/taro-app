
import {
  MENUINDEX,
  USERINFO
} from '../constants/global'
import api from '../service/api'



// const MENU_INDEX = 'MENU_INDEX'

export const changeMenu = index => {
  wx.setStorage({
    key: 'index',
    data: index
  })
  return {
    type: MENUINDEX,
    payload: index
  }
}

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
