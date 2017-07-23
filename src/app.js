import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';


import AppReducer from './reducers';
import AppWithNavigationState from './navigators/AppNavigator';

import configureStore from './store';

console.ignoredYellowBox = ['Setting a timer'];

class TheApp extends React.Component {

  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('TheApp', () => TheApp);

export default TheApp;
