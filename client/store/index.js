import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import songs from './songs'
import current from './current'
import playlist from './playlist'
import room from './room'

const reducer = combineReducers({user, songs, current, playlist, room})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './songs'
export * from './search'
export * from './current'
export * from './playlist'
export * from './room'
