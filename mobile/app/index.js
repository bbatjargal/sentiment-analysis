import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import SignInScreen from './SignInScreen';
import AuthLoadingScreen from './AuthLoadingScreen';

const AppStack = createStackNavigator(
  { Home: HomeScreen },
  {
    headerMode: 'none',
  },
);
const AuthStack = createStackNavigator(
  { SignIn: SignInScreen },
  {
    headerMode: 'none',
  },
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
