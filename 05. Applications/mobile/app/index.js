import React from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './HomeScreen';
import FriendsScreen from './FriendsScreen';
import SignInScreen from './SignInScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Friends: FriendsScreen,
  },
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
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  },
);
