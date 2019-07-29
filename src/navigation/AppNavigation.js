import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer,createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from '../Screens/HomeScreen'
import AboutScreen from '../Screens/AboutScreen'
import SubjectIcon from '../Img/icon_subject_btn.png'
import CategoryScreen from '../Screens/CategoryScreen'
import QuestionsScreen from '../Screens/QuestionsScreen'
import SettingsScreen from '../Screens/SettingsScreen'
import ResultScreen from '../Screens/ResultScreen'
import MixTestScreen from '../Screens/MixTestScreen'
import MixTestQueScreen from '../Screens/MixTestQueScreen'
import { fromLeft, zoomIn, zoomOut, fromRight } from 'react-navigation-transitions'

const AppNavigation = createStackNavigator({
    Home: HomeScreen,
    About: AboutScreen,
    Category: CategoryScreen,
    QuestionsScreen: QuestionsScreen,
    SettingsScreen: SettingsScreen,
    ResultScreen: ResultScreen,
    MixTestScreen: MixTestScreen,
    MixTestQueScreen: MixTestQueScreen
},{
  headerMode: 'none',
  transitionConfig: () => fromRight(),
  navigationOptions: {
      headerVisible: false,

  }
})

export default createAppContainer(AppNavigation);
