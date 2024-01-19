import React from 'react';
import {
  View,
  Text
} from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigation/Navigation';
import store from './src/redux/store';

function App(){

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
