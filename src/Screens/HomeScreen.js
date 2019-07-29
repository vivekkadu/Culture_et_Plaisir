import React, { Component } from 'react';
import { View, Text ,Platform, ImageBackground, Image , TouchableOpacity} from 'react-native';
import Header from '../components/Header'
import { fethAllTopics } from '../actions/topicActions'
import { connect } from 'react-redux'
import HomeBg from '../Img/main_bg.jpg'
import UniIcon from '../Img/icon_univers.png'
import { ScrollView, TouchableNativeFeedback  } from 'react-native-gesture-handler';
import BottomTabComponent from '../components/BottomTabComponent'
import axios from 'axios'
var Realm = require('realm');
import Spinner from '../components/Spinner'
import ProgressCircle from '../components/ProgressCircle'
import { Topics, Questions, TopicProgress, QueAns, AttendedMixQue , AttendedQue} from '../Database/Schema'
import _ from 'lodash'
import firebase from 'react-native-firebase';

let realm;
let realm2;
let realm3;



class HomeScreen extends Component {
  constructor(props) {

    super(props);
    this.state = {
      topics: [],
      error: false,
      isFetchingTopics: true,
      isFetchingAllQue: true,
      dataSource: [],
      questions: [],
      progressArray: [0,0,0,0,0,0,0,0,0,0,0,0],
      allQuestion: [],
      topicQue:[],
      totalQue: [0,0,0,0,0,0,0,0,0,0,0,0],
      attended_que: []
    };

  realm = new Realm({
    path: 'topic.realm',
    schema: [ Topics ]
   });

  realm2 = new Realm({
     path: `topicProgress.realm`,
     schema: [TopicProgress]
     });

  realm3 = new Realm({
      path: `questions.realm`,
      schema: [ Questions ]
   });

   realm4 = new Realm({
    path: 'attended_mix_que.realm',
    schema: [AttendedMixQue]

  })

  realm5 = new Realm({
    path: 'attended_que',
    schema: [AttendedQue]
    })

   this.didFocus = props.navigation.addListener('didFocus', payload =>
       this.loadTotal(),
     );
  this.didFocus = props.navigation.addListener('didFocus', payload =>
      this.loadProgress()
    );
  }


  static navigationOptions = {
    header: null
  }

componentDidMount(){
  var attended_que = realm4.objects('attended_mix_questions')
  this.setState({ attended_que })
  
  this.loadData()
  this.loadAllQue()
  this.loadNextTopics()
  this.loadNextQuestions()
  firebase.admob.initialize("ca-app-pub-6459003673906970~7269326254") ;

}

componentWillReceiveProps(){
  this.loadProgress()
}

componentWillUnmount() {
    this.didFocus.remove();
  }



loadNextTopics(){
    var topic = realm.objects('topic')

     if(topic.length > 0){
      var offsetValue = _.last(topic).id
      axios.get(`http://112.196.16.90:8080/Culture/api/get_next_topics?offset=${offsetValue}`)
      .then((response)=> {
        if(response.data.status == 200){
           if(response.data.topics){
             response.data.topics.map((topic) => {
               realm.write(() => {
                  realm.create('topic', {
                      id: topic.id,
                      name: topic.name,
                      description: topic.description,
                      content: topic.content,
                      total_que: topic.questions.length
                    })
                  })
                 })
           }
        }
        console.log("OFFSET TOPICS", response.data)
      })
     }
  }

  loadNextQuestions(){
    var questions = realm3.objects('questions')

    if(questions.length > 0){
      var offsetValue = _.last(questions).id
     axios.get(`http://112.196.16.90:8080/Culture/api/get_next_questions?offset=${offsetValue}`)
     .then((response)=> {
       if(response.data.status == 200){
          if(response.data.topics){
            response.data.questions.map((que) => {
              realm3.write(() => {
                 realm3.create('questions', {
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
          }
       }
       console.log("New Questions", response.data)
     })
    }
  }

  loadAllQue(){

    var questions = realm3.objects('questions')

    if(questions.length > 0){
      this.setState({ allQuestion: questions, isFetchingAllQue: false })
    }else {
      axios.get("http://112.196.16.90:8080/Culture/api/get_all_questions")
       .then((response)  => {
         this.setState({ allQuestion: response.data.questions, isFetchingAllQue: false })

         response.data.questions.map((que) => {
           realm3.write(() => {
              realm3.create('questions', {
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

       })
       .catch((err) => alert(err))
    }
  }

loadProgress(){

          var topic = realm.objects('topic')
          var topicProgress = realm2.objects('topic_progress')
          var topicProgressData = topicProgress.filter((item) => item.topic_id == topic.id)

          var progress = topicProgressData.map((item) => item.question_attempt)


           console.log("Progress", topicProgress.map((item) => item))



            var topic1Progress = topicProgress.filter((item) => item.topic_id == "1").pop()
            var topic2Progress = topicProgress.filter((item) => item.topic_id == "2").pop()
            var topic3Progress = topicProgress.filter((item) => item.topic_id == "3").pop()
            var topic4Progress = topicProgress.filter((item) => item.topic_id == "4").pop()
            var topic5Progress = topicProgress.filter((item) => item.topic_id == "5").pop()
            var topic6Progress = topicProgress.filter((item) => item.topic_id == "6").pop()
            var topic7Progress = topicProgress.filter((item) => item.topic_id == "7").pop()
            var topic8Progress = topicProgress.filter((item) => item.topic_id == "8").pop()
            var topic9Progress = topicProgress.filter((item) => item.topic_id == "9").pop()
            var topic10Progress = topicProgress.filter((item) => item.topic_id == "10").pop()
            var topic11Progress = topicProgress.filter((item) => item.topic_id == "11").pop()
            // var topic12Progress = topicProgress.filter((item) => item.topic_id == "12").pop()

            let a = this.state.progressArray.slice();

            if(topicProgress.length > 0){
              if(topic1Progress){
                a[0] = topic1Progress.question_attempt
              }
              if(topic2Progress){
                a[1] = topic2Progress.question_attempt
              }
              if(topic3Progress){
                a[2] = topic3Progress.question_attempt
              }
              if(topic4Progress){
                a[3] = topic4Progress.question_attempt
              }
              if(topic5Progress){
                a[4] = topic5Progress.question_attempt
              }
              if(topic6Progress){
                a[5] = topic6Progress.question_attempt
              }
              if(topic7Progress){
                a[6] = topic7Progress.question_attempt
              }
              if(topic8Progress){
                a[7] = topic8Progress.question_attempt
              }
              if(topic9Progress){
                a[8] = topic9Progress.question_attempt
              }
              if(topic10Progress){
                a[9] = topic10Progress.question_attempt
              }
              if(topic11Progress){
                a[10] = topic11Progress.question_attempt
              }
            //   if(topic12Progress){
            //     a[11] = topic12Progress.question_attempt
            // }

            this.setState({progressArray: a });

          }else {
            this.setState({ progressArray: [...this.state.progressArray, '0']})

          }

}

loadTotal(){
  var topic = realm.objects('topic')
  var topicProgress = realm2.objects('topic_progress')
  var topicProgressData = topicProgress.filter((item) => item.topic_id == topic.id)

  var progress = topicProgressData.map((item) => item.question_attempt)

  var topic1totalQue = topic.filter((item) => item.id === "1")
  var topic2totalQue = topic.filter((item) => item.id === "2")
  var topic3totalQue = topic.filter((item) => item.id === "3")
  var topic4totalQue = topic.filter((item) => item.id === "4")
  var topic5totalQue = topic.filter((item) => item.id === "5")
  var topic6totalQue = topic.filter((item) => item.id === "6")
  var topic7totalQue = topic.filter((item) => item.id === "7")
  var topic8totalQue = topic.filter((item) => item.id === "8")
  var topic9totalQue = topic.filter((item) => item.id === "9")
  var topic10totalQue = topic.filter((item) => item.id === "10")
  var topic11totalQue = topic.filter((item) => item.id === "11")
  // var topic12totalQue = topic.filter((item) => item.id === "12")




  let a = this.state.totalQue.slice();

  if (topic.length > 0) {
    if(topic1totalQue){
      a[0] = topic1totalQue[0].total_que
    }
    if(topic2totalQue){
      a[1] = topic2totalQue[0].total_que
    }
    if(topic3totalQue){
      a[2] = topic3totalQue[0].total_que
    }
    if(topic4totalQue){
      a[3] = topic4totalQue[0].total_que
    }
    if(topic5totalQue){
       a[4] = topic5totalQue[0].total_que
     }
     if(topic6totalQue){
       a[5] = topic6totalQue[0].total_que
     }
     if(topic7totalQue){
       a[6] = topic7totalQue[0].total_que
     }
     if(topic8totalQue){
       a[7] = topic8totalQue[0].total_que
     }
     if(topic9totalQue){
       a[8] = topic9totalQue[0].total_que
     }
     if(topic10totalQue){
       a[9] = topic10totalQue[0].total_que
     }
     if(topic11totalQue){
       a[10] = topic11totalQue[0].total_que
     }
     // if(topic12totalQue){
     //   a[11] = topic12totalQue[0].total_que
     // }
    this.setState({ totalQue: a });
  }

}


  loadData(){

        this.loadProgress()

        var topic = realm.objects('topic')
        var topicProgress = realm2.objects('topic_progress')
        var topicProgressData = topicProgress.filter((item) => item.topic_id == topic.id)

        var progress = topicProgressData.map((item) => item.question_attempt)


       console.log("Topic",topic)


      if(topic.length > 0){
          this.setState({ topics: topic, isFetchingTopics: false })
          this.loadTotal()
       }else {
        axios.get("http://112.196.16.90:8080/Culture/api/get_topics_questions")
            .then(response => {
              if(response.data.status == 200){

            this.setState({ topics: response.data.topics, isFetchingTopics: false, topicQue: response.data.topics.questions  })

            response.data.topics.map((topic) => {
              realm.write(() => {
                 realm.create('topic', {
                     id: topic.id,
                     name: topic.name,
                     description: topic.description,
                     content: topic.content,
                     total_que: topic.questions.length
                   })
                 })
                })
              }
             else{
                  this.setState({ error: true })
              }
          })
      }
  }

toSetting() {
  this.props.navigation.navigate("SettingsScreen", { questions: this.state.attended_que })
}

  render() {

    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const unitId =
    Platform.OS === 'ios'
      ? 'ca-app-pub-6459003673906970/6423202342'
      : 'ca-app-pub-6459003673906970/2627373668';
    const request = new AdRequest();
    request.addKeyword('foobar');
    
    
  
  

    return (
      <ImageBackground source={HomeBg}  style={{ flex: 1 }} >

          <Header navigateToSettings={() => this.toSetting()} headerText="Sujet" navigation={this.props.navigation} showSetting={true} showInfo={true}/>

            <ScrollView style={{ }}>
            {this.state.isFetchingTopics && this.state.isFetchingAllQue ? <Spinner/> : this.state.topics.map((topic) => {
              return <TouchableOpacity onPress={() => this.props.navigation.navigate("Category", { topic: topic})}  key ={topic.id} style={styles.cardStyle}>
                        <View style={{ flexDirection: 'row'}}>
                        <Image source={UniIcon} style={styles.iconStyle}/>
                        <Text style={styles.headingStyle}>{topic.name}</Text>
                        </View>
                      <ProgressCircle totalQue={this.state.totalQue[topic.id -  1]} progress={this.state.progressArray[topic.id -  1]}/>
                      </TouchableOpacity>

            })}


            </ScrollView>
        
            <Banner
              unitId={unitId}
              size={'SMART_BANNER'}
              request={request.build()}
              onAdLoaded={() => {
                console.log('Advert loaded');
              }}
            />
           
            <BottomTabComponent allQuestion={this.state.allQuestion} screen={"HomeScreen"} navigation={this.props.navigation}/>

      </ImageBackground>
    );
  }
}

const styles = {
  headingStyle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: '500',
    padding: 8,
    marginLeft: "2%",

  },
  cardStyle: {
    borderBottomColor: "#fff",
    borderBottomWidth: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 6,
    justifyContent: 'space-between',
    height: 50,
    width: "100%"

  },
  iconStyle: {
    height: 40,
    width: 40,
    padding: 7,
    marginLeft: "2%",
  }
}


function mapStateToProps (state) {
    return {
     topics: state.topicReducer.topics,
     isFetchingTopics: state.topicReducer.isFetchingTopics
  }
}

  function mapDispatchToProps (dispatch) {
    return {
        fethAllTopics: () => dispatch(fethAllTopics())
    }
  }

  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreen)
