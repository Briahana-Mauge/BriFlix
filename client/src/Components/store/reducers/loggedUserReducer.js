import { RECEIVE_USER } from '../actionTypes';

const initialState = {
  loggedUser: '',
  
}

const loggedUserReducer = (state = initialState, action) => {
  // copy state
  let newState = { ...state, action }

  // Deicide how the state is to be modified
  // depending on the action type
    switch (action.type) {
      case RECEIVE_USER:
        newState =  action.payload;
        break;

      default:
        break;

    }
  
  return newState;

}

export default loggedUserReducer;