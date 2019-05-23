
import {
  ADDNEWSTATE,
  STATELIST
} from '../../constants/global'
import api from '../../service/api'

// 异步的 action
export function getStateList () {
  return dispatch => {
    api.post('state/stateList').then(res => {
      let data = res.result
      dispatch(stateList(data));
    })
  }
}
export const stateList = data => {
  return {
    type: STATELIST,
    payload: data
  };
}

export function addState (params) {
  console.log(params)
  return dispatch => {
    api.post('state/addNewState', params).then(res => {
      if (res.success) {
        let data = res
        dispatch(newState(data));
      }
    })
  }
}
export const newState = data => {
  return {
    type: ADDNEWSTATE,
    payload: data
  };
}
