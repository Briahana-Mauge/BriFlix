import { RECEIVE_USER, RECEIVE_SUBMIT } from '../actionTypes';

const initialState = {
  loggedUser: '',
  submitted: false

}

const loggedUserReducer = (state = initialState, action) => {
  // copy state
  let newState = { ...state, action }

  // Deicide how the state is to be modified
  // depending on the action type
  switch (action.type) {
    case RECEIVE_USER:
      newState.loggedUser = action.payload;
      break;
    case RECEIVE_SUBMIT:
      newState.submitted = action.payload;
      break;
    default:
      break;

  }

  return newState;

}

export default loggedUserReducer;