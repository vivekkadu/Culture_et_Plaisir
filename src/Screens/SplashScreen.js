import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import SplashImg from '../Img/splash.png'

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    setTimeout(() => {
        this.props.navigation.navigate("Home")
    }, 1000)
}
  render() {
    return (
      <ImageBackground source={SplashImg} style={{ flex: 1 , height: "100%", width : "100%"}}>
      </ImageBackground>
    );
  }
}
