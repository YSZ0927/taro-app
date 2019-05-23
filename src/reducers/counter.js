import { ADD, MINUS, PRODUCTGETLIST } from '../constants/counter'

const INITIAL_STATE = {
  data: {
    title: '',
    authors: '',
    content: '',
  }
}

export default function counter (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD:
      return {
        ...state,
        num: state.num + 1
      }
    case MINUS:
      return {
        ...state,
        num: state.num - 1
      }
    case PRODUCTGETLIST:
      return {
        ...state,
        data: payload
      }
     default:
       return state
  }
}

