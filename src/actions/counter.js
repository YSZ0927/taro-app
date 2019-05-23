import {
  ADD,
  MINUS,
  PRODUCTGETLIST
} from '../constants/counter'
import api from '../service/api'

export const add = () => {
  // api.get('recommendPoetry')
  return {
    type: ADD
  }
}
export const minus = () => {
  return {
    type: MINUS
  }
}

// 异步的 action
export function getRecommend () {
  return dispatch => {
    api.post('article/getArticleList').then(res => {
      let data = res.result
      dispatch(getlistdata(data));
    })
  }
}
export const getlistdata = data => {
  return {
    type: PRODUCTGETLIST,
    payload: data
  };
}
