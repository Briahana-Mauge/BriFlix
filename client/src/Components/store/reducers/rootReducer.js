import { combineReducers } from 'redux'

import loggedUserReducer from './loggedUserReducer';

const rootReducer = combineReducers({
  receiveUser: loggedUserReducer,
})

export default rootReducer;