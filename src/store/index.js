import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
// import {persistStore, persistCombineReducers} from 'redux-persist'
// import storage from 'redux-persist/es/storage'

import rootReducer from '../reducers'

const middlewares = [
  thunkMiddleware,
  createLogger()
]

// const config = {
//   key: 'root',
//   storage,
// }

export default function configStore () {
  // let reducer = persistCombineReducers(config, rootReducer)
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  // let persistor = persistStore(store)
  return store
  // return { persistor, store }
}