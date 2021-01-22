import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './src/Screens/Home';
import Category from './src/Screens/Category';

import Note from './src/Screens/Note';
/*
import CameraGo from './Pages/CameraGo';
 */


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
   /* CameraGo: { screen: CameraGo } */
  },
  {
    initialRouteName: 'Home',
    

  }
);

export default createAppContainer(AppNavigator);