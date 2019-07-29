/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import HomeBg from '../Img/main_bg.jpg'
import BottomTabComponent from '../components/BottomTabComponent'
import Header from '../components/Header'
import SliderThumbImg from '../Img/progress_bar_btn.png'
import axios from 'axios'
import { Topics, Questions, TopicProgress, QueAns, AttendedMixQue, AttendedQue } from '../Database/Schema'
import { Slider } from 'react-native-elements';
import ButtonBgImg from '../Img/bottom_btn_bg.png'
import  _ from 'lodash'
let realm4;
import Realm from 'realm'

export default class MixTestScreen extends Component {

 constructor(props){
   super(props)
   this.state ={
     value: 0
   }
   realm4 = new Realm({
     path: 'attended_mix_que.realm',
     schema: [AttendedMixQue]

   })

   realm5 = new Realm({
     path: 'attended_que',
     schema: [AttendedQue]
     })

 }

  render() {
    const { navigation } = this.props
    const allQuestion = navigation.getParam('allQuestion')
    var mixQue = realm4.objects('attended_mix_questions')
    var attended_que = realm5.objects('attended_questions')

      const questionsWithoutMix = allQuestion.filter(function(objFromA) {
                return !mixQue.find(function(objFromB) {
                  return objFromA.id === objFromB.id
                 })
      })

      const questions = questionsWithoutMix.filter(function(objFromA) {
                return !attended_que.find(function(objFromB) {
                  return objFromA.id === objFromB.id
                 })
      })


    return (
      <ImageBackground source= {HomeBg} style={styles.container}>

        <Header headerText="Test Mixte" />

        <View style={{ marginTop: 25, margin: 10, padding: 5, justifyContent: 'center', alignItems: 'center'}}>
         <Text style={{ color: "#fff", fontSize: 24, fontWeight: 'bold'}}>Questions Totals {questions.length} </Text>
       </View>

       <Text style={{ marginTop: "7%",  alignSelf: 'center', color : "#fff", fontSize: 16}}>Choisir le nombre de questions: {this.state.value}</Text>

       <Slider
        value ={this.state.value}
         minimumTrackTintColor={"#2B57B7"}
         maximumTrackTintColor={"#fff"}
         style={{ margin: 10 }}
         minimumValue= {0}
         step={1}
         onValueChange={(value) => this.setState({ value: value })}
         thumbStyle={{ backgroundColor: '#2B57B7', borderColor: "#D4D4D4", borderWidth: 3, height: 40, width: 40, borderRadius: 20}}
         trackStyle={{ height: 12, margin: 10, borderRadius: 5 }}
         maximumValue={allQuestion.length }
         thumbTintColor={"#2B57B7"}
       />

       {this.state.value > 0 ? <TouchableOpacity onPress={() => this.props.navigation.navigate("MixTestQueScreen", {  questions: questions, questionlimit: this.state.value })}
                                  style={{  alignSelf: 'center', margin: "5%", marginTop: "10%", height: "14%", width: "80%"}}>
             <ImageBackground source={ButtonBgImg} style={{ height: "100%", justifyContent: 'center', alignItems: 'center'}}>
               <Text style={{ fontSize: 16, fontWeight: 'bold',color: "#fff"}}>Commencer</Text>
             </ImageBackground>
         </TouchableOpacity>:  null }

        <BottomTabComponent screen={"MixTestScreen"} navigation={this.props.navigation}/>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
