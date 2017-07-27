import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator, DrawerNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import RegisterScreen from '../components/RegisterScreen';
import HomeScreen from '../components/HomeScreen';

import DrawerButton from '../components/DrawerButton';

//export const AppNavigator = StackNavigator({
//  Home: { screen: HomeScreen },
//  Login: { screen: LoginScreen },
//  Main: { screen: MainScreen },
//  Profile: { screen: ProfileScreen },
//  Register: { screen: RegisterScreen },
//});

//export const StackNav = StackNavigator({
//      //Home: { screen: HomeScreen },
//      //Login: { screen: LoginScreen },
//      Main: { screen: MainScreen,
//        navigationOptions: ({navigation}) => ({
//          title: 'Main',
//          headerLeft: <DrawerButton navigation={navigation} />,
//          drawer: 'WTH'
//        })
//      },
//      //Profile: { screen: ProfileScreen },
//      //Register: { screen: RegisterScreen },
//    }
//);

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

export const AppNavigator = DrawerNavigator({
  MainDrawer: { screen: MainStackNav },
  LoginDrawer: { screen: LoginStackNav }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
