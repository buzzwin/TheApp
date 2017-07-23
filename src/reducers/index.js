import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Home');
const registerAction = AppNavigator.router.getActionForPathAndParams('Register');
const homeAction = AppNavigator.router.getActionForPathAndParams('Login');
const mainAction = AppNavigator.router.getActionForPathAndParams('Main');

const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState

);

function nav(state = tempNavState, action) {
  let nextState;

  switch (action.type) {
    case 'Home':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Home' }),
        state
      );
        break;
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
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
