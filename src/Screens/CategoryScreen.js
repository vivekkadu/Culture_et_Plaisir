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
import { Topics, Questions,QueAns,TopicProgress, AttendedMixQue } from '../Database/Schema'
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
      isLoading: true,
      value: 0,
      disabled: false,
      slovedQue: 0,
      sliderProgress: 0,
      mixQue: 0
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

 }


 componentDidMount(){


       const { navigation } = this.props
       const topic = navigation.getParam('topic')
       var questions = realm.objects('questions')

       console.log("questions",questions)

       var mixQue = realm4.objects('attended_mix_questions')
       var mixQueTopic = mixQue.filter((item) => item.topic_id === topic.id )


       this.setState({ mixQue: mixQueTopic.length  })

        var filterData = questions.filter((item) => item.topic_id == topic.id)

        var RealQue = filterData.filter(function(objFromA) {
          return !mixQueTopic.find(function(objFromB) {
            return objFromA.id === objFromB.id
           })
        })


        if(filterData.length > 0){
          this.setState({ questions: RealQue, isLoading: false })
        }else{
          axios.get("http://112.196.16.90:8080/Culture/api/get_topics_questions/")
              .then(response => {
                if(response.data.status == 200){
                 this.setState({ topics: response.data.topics , isLoading: false})
                 let currentTopic = response.data.topics.filter((item) => item.id == topic.id)
                 this.setState({ questions: currentTopic[0].questions})

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
                  Ce suject traite
                 </Text>

                {descriptionArray.map((item, index) => {
                  return   <ImageBackground source={TotalBg} key={index} style={styles.viewStyle}>
                               <Image source={BookIcon} style={styles.imageStyle}/>
                               <Text selectable numberOfLines={2} style={styles.textStyle}>{item}</Text>
                            </ImageBackground>
                  })}



                   <ImageBackground source={TotalBg} style={{ marginTop: 25, margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', marginBottom: 5}}>Questions Posees dans le test mixte {this.state.mixQue} </Text>
                    <Text style={{ color: "#fff", fontSize: 24, fontWeight: 'bold'}}>Questions Totals {(this.state.questions.length)  - (this.state.solvedQue || 0) } </Text>
                  </ImageBackground>


                 <Text style={{ marginTop: "7%",  alignSelf: 'center', color : "#fff", fontSize: 16}}>Choisir le nombre de questions: {this.state.value - this.state.solvedQue < 0 ?  0 : this.state.value - (this.state.solvedQue || 0) }</Text>


                  <View style={{ marginTop: "5%"}}>

                  <Slider
                   value ={this.state.value}
                    minimumTrackTintColor={"#2B57B7"}
                    maximumTrackTintColor={"#fff"}
                    style={{ margin: 10 }}
                    minimumValue= {this.state.solvedQue  || 0 }
                    step={1}
                    onValueChange={(value) => this.setState({ value: value })}
                    thumbStyle={{ backgroundColor: '#2B57B7', borderColor: "#D4D4D4", borderWidth: 3, height: 40, width: 40, borderRadius: 20}}
                    trackStyle={{ height: 12, margin: 10, borderRadius: 5 }}
                    maximumValue={this.state.questions.length }
                    thumbTintColor={"#2B57B7"}
                  />
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
