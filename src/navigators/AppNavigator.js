import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import RegisterScreen from '../components/RegisterScreen';
import HomeScreen from '../components/HomeScreen';

import DrawerButton from '../components/DrawerButton';
import {signOut} from '../actions/auth';

export const MainStackNav = StackNavigator({
      Main: {
        screen: MainScreen,
        navigationOptions: ({navigation}) => ({
          headerLeft: <DrawerButton navigation={navigation}/>,
          drawerLabel: 'Main'
        })
      }
    }
);

export const LoginStackNav = StackNavigator({
      Login: {
        screen: LoginScreen,
        navigationOptions: ({navigation}) => ({
          headerLeft: <DrawerButton navigation={navigation}/>,
          drawerLabel: 'Login / Sign up' //TODO change to conditional on login status
        })
      },
      Register: { screen: RegisterScreen },
    }
);

function itemPress({route}, {navigation}) {
    if (route.routeName !== 'LogoutDrawer') {
        navigation.dispatch({type: route.routeName});
    }
    else {
        console.log("Signing out");
        navigation.dispatch(signOut());
    }
}

export const AppNavigator = DrawerNavigator({
  MainDrawer: { screen: MainStackNav },
  LoginDrawer: { screen: LoginStackNav },
  LogoutDrawer: { screen: LoginScreen,
      navigationOptions: ({navigation}) => ({
          drawerLabel: 'Log Out'
      })}
},{
    initialRouteName: 'MainDrawer',
    contentComponent: (props) =>
        <DrawerItems {...{...props, onItemPress: (route) => {
            itemPress(route, props)
        }}} />
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })}
    ref={nav => {this.navigator = nav;}} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
