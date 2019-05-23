import { combineReducers } from 'redux'
import counter from './counter'
import globals from './global'
import user from './user/user'
import state from './state/state'

export default combineReducers({
  counter,
  globals,
  user,
  state
})