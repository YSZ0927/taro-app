import { MENUINDEX } from '../constants/global'

const INITIAL_STATE = {
  data: {
    menuIndex: 0
  }
}

export default function change (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case MENUINDEX:
      return {
        ...state,
        menuIndex: payload
      }
     default:
       return state
  }
}

