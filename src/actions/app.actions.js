import { appConstants } from '../constants';

class AppActions {

  toggleNavigation = _ => ({
    type: appConstants.TOGGLE_NAVIGATION
  })

  closeNavigation = _ => ({
    type: appConstants.CLOSE_NAVIGATION
  })
}

export const actions = new AppActions();