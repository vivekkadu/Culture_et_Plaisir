/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground
} from 'react-native';
import progress_circle from '../Img/progress_circle.png'
import * as Progress from 'react-native-progress';

const chart_wh = 33
    const series = [ 250, 750 ]
    const sliceColor = ['green','#ffffff00']

export default class ProgressCircle extends Component {

    constructor(props) {
      super(props)
      console.log("Total", this.props.totalQue)

    }

  renderPer(progress){
    if(isNaN(progress) || progress< 0){
      return 0
    }else{
      return (progress * 100).toFixed(0)
    }
  }

  render() {

   var progress = ((this.props.progress/ this.props.totalQue ) * 100 )/ 100

    return (
      <ImageBackground source={progress_circle} style={styles.container}>
      <View style={{ position: 'absolute'}}>
      <Progress.Pie progress={ progress || 0 } size={35} color="#48EF00" borderColor="#ffffff00"/>
      </View>
      <Text style={{ color: "#fff", zIndex: 100 , fontSize: 11, fontWeight: 'bold'}}>{this.renderPer(progress)}%</Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
    alignItems: 'center'

  },
});
