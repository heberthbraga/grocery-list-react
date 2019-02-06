import { appConstants } from '../constants';

const INITIAL_STATE = {
  collapsed: false
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case appConstants.TOGGLE_NAVIGATION:
      return { ...state, collapsed: !state.collapsed };
    case appConstants.CLOSE_NAVIGATION:
      return { ...state, collapsed: true };
  default:
    return state;  
  }
}