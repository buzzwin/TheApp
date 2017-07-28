import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';
import {LOGIN_DRAWER, MAIN_DRAWER} from '../actions/auth';

//DrawerNavigator will load first item in its list
//If a firstAction is defined, that component will be mounted twice
const initialNavState = AppNavigator.router.getStateForAction({});
const registerAction = AppNavigator.router.getActionForPathAndParams('Register');
const homeAction = AppNavigator.router.getActionForPathAndParams('Home');
const loginAction = AppNavigator.router.getActionForPathAndParams('Login');
const mainAction = AppNavigator.router.getActionForPathAndParams('Main');

//const initialNavState = AppNavigator.router.getStateForAction(
//  secondAction,
//  tempNavState
//
//);

function nav(state = initialNavState, action) {
  let nextState;

  switch (action.type) {
    case LOGIN_DRAWER:
      nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'LoginDrawer', undefined, loginAction }),
          state
      );
      break;
    case MAIN_DRAWER:
      nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'MainDrawer', undefined, mainAction }),
          state
      );
      break;
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
        break;
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'LoginDrawer', undefined, homeAction }),
        state
      );
        break;
    case 'Logout':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
        break;
      case 'Register':
        nextState = AppNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Register' }),
          state
        );
          break;
        case 'Main':
        
          nextState = AppNavigator.router.getStateForAction(
            NavigationActions.navigate({ routeName: 'Main' }),
            state
          );
          nextState = { ...nextState, user: action.user };
            break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.

  return nextState || state;
}

const initialAuthState = { user: {}, isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    //case 'Login':
    //  return { ...state, isLoggedIn: true };

   case 'Logout':
    //  return { ...state, isLoggedIn: false };

    case 'LOGIN_REQUESTED':
      return { ...state, isLoggedIn: false };

    case 'LOGIN_SUCCESS':
      return { ...state, user: action.user, isLoggedIn: true };

    case 'LOGIN_REJECTED':
      return { ...state, error: action.error , isLoggedIn: false };

    case 'SIGN_UP_REQUESTED':
      return { ...state, isLoggedIn: false };

    case 'SIGN_UP_SUCCESS':
      return { ...state, user: action.user, isLoggedIn: false };

    case 'SIGN_UP_REJECTED':
      return { ...state, error: action.error , isLoggedIn: false };

    default:
      return state;
  }
}

const AppReducer = combineReducers({
  nav,
  auth,
});

export default AppReducer;
