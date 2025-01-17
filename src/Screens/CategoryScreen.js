/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import  Header from '../components/Header'
import HomeBg from '../Img/main_bg.jpg'
import BookIcon from '../Img/icon_book.png'
import ButtonBgImg from '../Img/bottom_btn_bg.png'
import TotalBg from '../Img/total_question_bg.png'
import SliderThumbImg from '../Img/progress_bar_btn.png'
import axios from 'axios'
import { Slider } from 'react-native-elements';
import Spinner from '../components/Spinner';
var Realm = require('realm');
import { Topics, Questions,QueAns,TopicProgress, AttendedMixQue, AttendedMixQueAll, AttendedQue } from '../Database/Schema'
let realm;
let realm2;
let realm4;
import _ from 'lodash'
var utf8 = require('utf8');




export default class CategoryScreen extends Component {

  constructor(props) {

    super(props);
    this.state= {
      questions: [],
      topics: [],
      isLoading: false,
      value: 0,
      disabled: false,
      slovedQue: 0,
      sliderProgress: 0,
      mixQue: 0,
      app_type: ''
    }
    realm = new Realm({
      path: `questions.realm`,
      schema: [ Questions ]
     });
     realm2 = new Realm({
       path: `topicProgress.realm`,
       schema: [TopicProgress]
       });
       realm4 = new Realm({
         path: 'attended_mix_que.realm',
         schema: [AttendedMixQue]

       })

       realm5 = new Realm({
        path: 'attended_mix_que_all.realm',
        schema: [AttendedMixQueAll]

      })


    realm6 = new Realm({
      path: "attended_que.realm",
      schema: [AttendedQue]
    });

 }


 async componentDidMount(){


       const { navigation } = this.props
       const topic = navigation.getParam('topic')
       const value = await AsyncStorage.getItem('app_type');

       if(value === null || value === "free"  ){
        this.setState({ app_type: 'free'})

       }else if(value === 'paid'){
        this.setState({ app_type: 'paid'})
       }
       var questions = realm.objects('questions')


       console.log("questions",questions)

       var mixQue = realm5.objects('attended_mix_questions_all')  //mix questions

       var attended_que = realm4.objects('attended_mix_questions')   //topic realted que
 

       var mixQueTopic = mixQue.filter((item) => item.topic_id === topic.id ) // topic question which are solved in mix

       var attended_que_topic = attended_que.filter((item)=> item.topic_id === topic.id ) // topic question which are solved


       this.setState({ mixQue: mixQueTopic.length  })

       
       if(value === null || value === "free"  ){
        var topicQue = questions.filter((item) => item.topic_id == topic.id).slice(0,20)

       }else if(value === 'paid'){
        var topicQue = questions.filter((item) => item.topic_id == topic.id)
      }

      

       var removeTopicAttendedQue =  topicQue.filter(function(objFromA) {
        return !attended_que_topic.find(function(objFromB) {
          return objFromA.id === objFromB.id
          })
         })

        var removeMixAttendedQue = removeTopicAttendedQue.filter(function(objFromA) {
          return !mixQueTopic.find(function(objFromB) {
            return objFromA.id === objFromB.id
            })
           })


          

        if(topicQue.length > 0){
          if(value === null ){
            this.setState({ questions: removeMixAttendedQue, isLoading: false })
          }else if(value === 'paid'){
            this.setState({ questions: removeMixAttendedQue, isLoading: false })
          }
        }else{
          axios.get("http://112.196.16.90:8080/Culture/api/get_topics_questions/")
              .then(response => {
                if(response.data.status == 200){
                 this.setState({ topics: response.data.topics , isLoading: false})
                 let currentTopic = response.data.topics.filter((item) => item.id == topic.id)
                 if(value === null || value === 'free' ){
                  this.setState({ questions: currentTopic[0].questions.slice(0,20), isLoading: false })
                }else if(value === 'paid'){
                  this.setState({ questions: currentTopic[0].questions, isLoading: false })
                }

                 currentTopic[0].questions.map((que) => {
                   realm.write(() => {
                      realm.create('questions', {
                        id: que.id,
                        name: que.name,
                        topic_id: que.topic_id,
                        question: que.question,
                        answer_1: que.answer_1,
                        answer_2: que.answer_2,
                        answer_3: que.answer_3,
                        correct_answer: que.correct_answer,
                        explaination: que.explaination,
                        user_ans: '0'
                        })
                      })
                   })

                 console.log("Questions", currentTopic[0].questions)
                }
               else{
                    this.setState({ error: true })
                }
            })
        }
        var topicProgress = realm2.objects('topic_progress')
        var topicProgressData = topicProgress.filter((item) => item.topic_id == topic.id)

        var progress = topicProgressData.map((item) => item.question_attempt)


        if(progress.length > 0 ){
            this.setState({ solvedQue: progress.pop() })
               
         }

         if(value === null || value === 'free'){
           if(this.state.solvedQue === 20){
             this.setState({ hideSlider: true })
           }
         }


     }



  render() {

      const { navigation } = this.props
      const topic = navigation.getParam('topic')
      var descriptionArray = topic.description.split(',')


    return (
      <ImageBackground source={HomeBg}  style={{ flex: 1 }} >
        <Header headerText={topic.name} navigation={this.props.navigation} showHome={true}  />

        {this.state.isLoading ? <Spinner /> :

                <View style={{ flex: 1 }}>

                 <ScrollView style={{ flex: 1, marginBottom: "11%" }}>

                 <Text style={{ margin: 12 , fontSize: 16, color: '#fff', fontWeight: 'bold'}}>
                  Ce sujet traite
                 </Text>

                {descriptionArray.map((item, index) => {
                  return   <ImageBackground source={TotalBg} key={index} style={styles.viewStyle}>
                               <Image source={BookIcon} style={styles.imageStyle}/>
                               <Text selectable numberOfLines={2} style={styles.textStyle}>{item}</Text>
                            </ImageBackground>
                  })}



                   <ImageBackground source={TotalBg} style={{ marginTop: 25, margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                    
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 5}}>Questions Posées dans le texte mixte {this.state.mixQue} </Text>
                   
                    {
                      (this.state.solvedQue + this.state.mixQue) >= this.state.questions.length ?  <Text style={{ color: "#fff", fontSize: 24, fontWeight: 'bold'}}>Questions Totales 0 </Text> :  <Text style={{ color: "#fff", fontSize: 24, fontWeight: 'bold'}}>Questions Totales {(this.state.questions.length)}</Text>
                    }
                 
                  </ImageBackground>


                 <Text style={{ marginTop: "7%",  alignSelf: 'center', color : "#fff", fontSize: 16}}>Choisir le nombre de questions: {this.state.value - this.state.solvedQue < 0 ?  0 : this.state.value - (this.state.solvedQue || 0) }</Text>


               <View style={{ marginTop: "2%",}}>

                 {((this.state.solvedQue + this.state.mixQue) >= 20 && this.state.app_type === "free") || (this.state.solvedQue >= this.state.questions.length && this.state.app_type === "paid") ? <Text style={{ color: '#fff', alignSelf: 'center', fontSize: 16, marginTop: 5, margin: 5, marginBottom: 20, textAlign: 'center' }}>Ont répondu à toutes les questions sur le sujet</Text> :  <Slider
                    value ={this.state.value}
                      minimumTrackTintColor={"#2B57B7"}
                      maximumTrackTintColor={"#fff"}
                      style={{ margin: 10 }}
                      minimumValue= {this.state.solvedQue || 0 }
                      step={1}
                      onValueChange={(value) => this.setState({ value: value })}
                      thumbStyle={{ backgroundColor: '#2B57B7', borderColor: "#D4D4D4", borderWidth: 3, height: 40, width: 40, borderRadius: 20}}
                      trackStyle={{ height: 12, margin: 10, borderRadius: 5 }}
                      maximumValue={(this.state.questions.length)}
                      thumbTintColor={"#2B57B7"}
                    /> }

                    
                   
                    </View> 
                 

                  </ScrollView>

                  {this.state.value > 0 ?   <TouchableOpacity onPress={() => this.props.navigation.navigate("QuestionsScreen", { mixQue : this.state.mixQue, topic: topic,  questions:  this.state.questions.slice(0, this.state.value), questionlimit: this.state.value })} style={{ position: 'absolute', bottom: 0 , height: "10%", width: "100%"}}>
                        <ImageBackground source={ButtonBgImg} style={{ height: "100%", justifyContent: 'center', alignItems: 'center'}}>
                          <Text style={{ fontSize: 16, fontWeight: 'bold',color: "#fff"}}>Commencer</Text>
                        </ImageBackground>
                    </TouchableOpacity>:  null }



          </View>
        }


      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },sliderStyle: {
    width: "80%",
    alignSelf: 'center',
    margin: 7
  },imageStyle:{
    height: 30,
    width: 30
  },
  viewStyle: {
     padding: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginBottom: 1,
    marginTop: 1
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 10,
    width: 250,
  }
});
