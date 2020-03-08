/**
 * @format
 */
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Drawer from './src/router/Drawer.js';
import { Provider } from 'react-redux'
import store from './src/store';

const RNRedux = () => {
  return (
    <Provider store={store()}>
      <Drawer />
    </Provider>
  );
};

// AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => RNRedux);
