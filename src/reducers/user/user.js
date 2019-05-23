
import { USERINFO } from '../../constants/global'

const INITIAL_STATE = {
  data: {
    userInfo: null
  }
}

export default function change (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case USERINFO:
      return {
        ...state,
        data: payload
      }
     default:
       return state
  }
}

