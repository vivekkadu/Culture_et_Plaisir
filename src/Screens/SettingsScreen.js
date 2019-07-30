/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
  Platform
} from 'react-native';
import Header from '../components/Header'
import HomeBg from '../Img/main_bg.jpg'
import { Topics, Questions, TopicProgress, QueAns, AttendedMixQue , AttendedQue} from '../Database/Schema'
import ResetButton from '../Img/button_grey.png'
import BackButton from '../Img/button_blue.png'
import Swiper from 'react-native-deck-swiper'
import Realm from 'realm'


export default class SettingsScreen extends Component {

  constructor(props){
    super(props)
    const { navigation } = this.props
    const questions = navigation.getParam('questions')

    this.state ={
      index: 0,
      pagination: 7,
      cardIndex: 0,
      showSwiper: false,
      array: questions.map((item) => item.question)
    }


   
    realm2 = new Realm({
      path: `topicProgress.realm`,
      schema: [TopicProgress]
      });


    realm4 = new Realm({
      path: 'attended_mix_que.realm',
      schema: [AttendedMixQue]

    })

    realm5 = new Realm({
      path: 'attended_que',
      schema: [AttendedQue]
      })

    
  }

  componentDidMount(){
    const { navigation } = this.props
    const questions = navigation.getParam('questions')
    if(questions.length > 0){
      this.setState({ showSwiper: true})
    }
  }

async removeAttemptedQue(index){
  const { navigation } = this.props
  const questions = navigation.getParam('questions')
   var topicProgress = realm2.objects('topic_progress')
  


  if(index < questions.length){
    var attended_que = realm4.objects('attended_mix_questions')
    var id = attended_que[index].id
    var TopicId = attended_que[index].topic_id
    
    let question = attended_que.filter((item) => item.topic_id === TopicId)
    const TopicfromProgress = topicProgress.filter((item) => item.topic_id === question[0].topic_id)

     
    if(TopicfromProgress.length > 0){
      const question_attempt = TopicfromProgress.pop().question_attempt
      
         
   realm2.write(() => {
          realm2.create('topic_progress', {
              topic_id: TopicId,
                question_attempt:  question_attempt - 1 
              })
          })
            console.log("TOPIC", TopicfromProgress)
      
    }
          
     
   await realm4.write(() => {
      let question =  attended_que.filter((item) => item.id === id)
      console.log("new",question[0])
      realm4.delete(question[0])
      this.swiper.swipeCard()
      this.setState({ cardIndex: this.state.cardIndex + 1 })
    })
  }else{
    this.setState({ showSwiper: false})
  }
 
 }



  render() {
    

    return (
      <ImageBackground source={HomeBg} style={styles.container}>
        <Header showHome={true} headerText={"Settings"} navigation={this.props.navigation}/>


        {this.state.showSwiper ?  <Swiper

                    cards={this.state.array}
                    renderCard={(card) => {
                        return (
                            <View style={styles.card}>
                                <Text style={styles.text}>{card}</Text>
                            </View>

                        )
                    }}
                    containerStyle={{ height: 100 }}
                    containerStyle={{ marginTop: 70 , backgroundColor: '#5994DA'}}
                    ref={ref => this.swiper = ref}
                    onSwiped={(cardIndex) => this.setState({ pagination: this.state.pagination+ 1  })}
                    onSwipedLeft={() => this.setState({ index: this.state.index + 1 })}
                    onSwipedRight={() => this.setState({ index: this.state.index + 1 })}
                    cardIndex={this.state.index}
                    backgroundColor={'#fff'}
                    useViewOverflow={false}
                    stackSize= {6}>

                    </Swiper>

                    :  
                         <Text style={{ color: "#fff", alignSelf: 'center', fontSize: 20, marginTop: 30}}>NO QUESTIONS TO RESET</Text>
       }
       
       { this.state.showSwiper ? 
       
      
       <TouchableOpacity onPress={() => this.removeAttemptedQue(this.state.index)} style={{ marginTop: 320, flexDirection: 'row', margin: 15, justifyContent: 'center', alignItems: 'center'}}>
        
       <ImageBackground imageStyle={{ borderRadius: 0 , resizeMode: 'contain'}}
         style={styles.backgroundStyle} source={ResetButton}>

       <Text style={styles.textStyle}>Reset</Text>

      </ImageBackground>


        </TouchableOpacity> : null
      }




      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A53AD'
  },
  backgroundStyle: {
    width:120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: "#fff",
    fontWeight: 'bold',
  },
  card:{
    backgroundColor: "#3362CA",
    height: 120,
    justifyContent: 'center',
    alignItems:'center',
    padding: 20

  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 'bold'
  }
});
