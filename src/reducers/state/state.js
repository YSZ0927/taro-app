
import { ADDNEWSTATE } from '../../constants/global'
import { STATELIST } from '../../constants/global'

const INITIAL_STATE = {
  data: {
    stateList: null,
    addState: null
  }
}

export default function change (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case STATELIST:
      return {
        ...state,
        stateList: payload
      }
    case ADDNEWSTATE:
      return {
        ...state,
        addState: payload
      }
     default:
       return state
  }
}

