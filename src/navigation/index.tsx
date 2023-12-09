import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BarcodeScreen from '../screens/BarcodeScreen';
import CartlistScreen from '../screens/CartlistScreen';
import SplashScreen from '../screens/SplashScreen';
import {navigationRef} from './NavigationRoutes';

export type RootStackParamList = {
  barcodescreen: undefined;
  cartlistscreen: undefined;
  splashscreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'splashscreen'}
        screenOptions={{headerShown: false}}>
        {/*Define our routes*/}
        <Stack.Screen
          name="splashscreen"
          component={SplashScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="barcodescreen"
          component={BarcodeScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="cartlistscreen"
          component={CartlistScreen}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
