import { combineReducers } from 'redux'

import loggedUserReducer from './loggedUserReducer';

const rootReducer = combineReducers({
  loggedUser: loggedUserReducer,
})

export default rootReducer;