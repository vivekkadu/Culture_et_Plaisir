import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import SplashImg from '../Img/splash.png'
import { ScrollView } from 'react-native-gesture-handler';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    setTimeout(() => {
        this.props.navigation.navigate("Home")
    }, 5000)
}
  render() {
    return (
     
      <ImageBackground source={SplashImg} style={{ flex: 1 , height: "100%", width : "100%"}} >
      </ImageBackground>
     
    );
  }
}
