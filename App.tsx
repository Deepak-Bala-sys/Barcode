import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';

// components and utilities
import {store} from './src/redux/store';
import MainNavigator from './src/navigation';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
