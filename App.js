import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Screens/Home';
import Category from './src/Screens/Category';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import Note from './src/Screens/NoteSCnew';


class App extends React.Component {
  render() {
    return (
      <AppNavigator />
    );
  }
}


const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
     Category: { screen: Category },
    Note: { screen: Note },
   
  },
  {
    initialRouteName: 'Home',
    

  }
);

export default createAppContainer(AppNavigator);