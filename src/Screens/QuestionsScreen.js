/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import Header from '../components/Header'
import HomeBg from '../Img/main_bg.jpg'
import ButtonBgImg from '../Img/bottom_btn_bg.png'
import { Icon } from 'react-native-elements'
var Realm = require('realm');
import { Topics, Questions, TopicProgress, QueAns, AttendedQue,AttendedMixQue } from '../Database/Schema'
let realm;
let realm2;
let realm3;

export default class QuestionsScreen extends Component {
  constructor(props) {

    super(props);
    this.state= {
      current_que: 0,
      timer: 0,
      selectedAns: 0,
      progress: 0,
      optionBackground1: "#052666",
      optionBackground2: "#052666",
      optionBackground3: "#052666",
      proviousOption: 0,
      score: 0,
      disableButton: false,
      attended_questions: [],
      correct_answers: [],
      wrong_answers: []

    }
     realm = new Realm({
       path: `topicProgress.realm`,
       schema: [TopicProgress]
       });

       realm2 = new Realm({
         path: `questions.realm`,
         schema: [ Questions ]
        });

        realm3 = new Realm({
          path: `answers.realm`,
          schema: [ QueAns ]
         });

         realm4 = new Realm({
           path: 'attended_que.realm',
           schema: [AttendedQue]
           })

           realm5 = new Realm({
            path: 'attended_mix_que.realm',
            schema: [AttendedMixQue]
            })

  }

  componentDidMount(){
    const { navigation } = this.props
    const questions = navigation.getParam('questions')
    const questionlimit = navigation.getParam('questionlimit')
    const topic = navigation.getParam('topic')
    var topicProgress = realm.objects('topic_progress')

    this.interval = setInterval(
       () => this.setState((prevState)=> ({ timer: prevState.timer + 1 })),
      1000
    );
      var topicProgress = realm.objects('topic_progress')
      var topicProgressData = topicProgress.filter((item) => item.topic_id == topic.id)

      var progress = topicProgressData.map((item) => item.question_attempt)

      if(progress.length > 0){
        this.setState({ current_que: progress.pop()})

    }



}

  componentDidUpdate(){
    // if(this.state.timer === 1){
    //   clearInterval(this.interval);
    // }
  }

  componentWillUnmount(){
    clearInterval(this.interval);
    var answers = realm3.objects('answers')

    realm3.write(() => {
    realm3.delete(answers)
    })
  }

  highlightAns(ans){
    var scoreCut = true

    this.setState({ disableButton: true })
    if(ans === "1"){
      this.option1Selected(scoreCut)
    }else if(ans === "2"){
      this.option2Selected(scoreCut)
    }else if(ans === "3"){
      this.option3Selected(scoreCut)
    }
  }

  async option1Selected(scoreCut){
    var answers = realm3.objects('answers')

    const { navigation } = this.props
    const questionsNav = navigation.getParam('questions')
    const topic = navigation.getParam('topic')
    const questions = navigation.getParam('questions')

    this.setState({optionBackground1: "#000", optionBackground2: "#052666", optionBackground3: "#052666"})

    this.setState({  attended_questions: [...this.state.attended_questions, questions[this.state.current_que]], selectedAns: 1, optionBackground1: "#000", optionBackground2: "#052666",  optionBackground3: "#052666"})

    if(!scoreCut){
      if(questionsNav[this.state.current_que].correct_answer == "1"){
          this.setState({ score: this.state.score + 1 , correct_answers: [...this.state.correct_answers, questionsNav[this.state.current_que]] })
      }else{
        this.setState({ wrong_answers: [...this.state.wrong_answers, questionsNav[this.state.current_que]] })
      }
    }

    realm4.write(() => {
      realm4.create('attended_questions' , {
         topic_id: questions[this.state.current_que].topic_id.toString(),
         id:  questions[this.state.current_que].id.toString()  ,
         answer_1: questions[this.state.current_que].answer_1,
         answer_2: questions[this.state.current_que].answer_2,
         answer_3: questions[this.state.current_que].answer_3,
         correct_answer: questions[this.state.current_que].correct_answer,
         explaination: questions[this.state.current_que].explaination,
         name: questions[this.state.current_que].name,
         question: questions[this.state.current_que].question,
         user_ans: '1'
        })
     })


     realm5.write(() => {
      realm5.create('attended_mix_questions' , {
        topic_id: questions[this.state.current_que].topic_id.toString(),
        id:  questions[this.state.current_que].id.toString()  ,
        answer_1: questions[this.state.current_que].answer_1,
        answer_2: questions[this.state.current_que].answer_2,
        answer_3: questions[this.state.current_que].answer_3,
        correct_answer: questions[this.state.current_que].correct_answer,
        explaination: questions[this.state.current_que].explaination,
        name: questions[this.state.current_que].name,
        question: questions[this.state.current_que].question,
        user_ans: '1'
        })
     })


    await realm3.write(() => {
     realm3.create('answers' , {
        topic_id: topic.id,
        queId: this.state.current_que  ,
        answer: '1'
       })
       if(!scoreCut){
         this.nextQue()
     }
    })
  }


  async option2Selected(scoreCut){
    var answers = realm3.objects('answers')

    const { navigation } = this.props
    const questionsNav = navigation.getParam('questions')
    const topic = navigation.getParam('topic')
    const questions = navigation.getParam('questions')
    this.setState({optionBackground2: "#000", optionBackground1: "#052666", optionBackground3: "#052666"})
    this.setState({ attended_questions: [...this.state.attended_questions, questions[this.state.current_que]], selectedAns: 2, })

    if(!scoreCut){
      if(questionsNav[this.state.current_que].correct_answer == "2"){
          this.setState({ score: this.state.score + 1, correct_answers: [...this.state.correct_answers, questionsNav[this.state.current_que]] })
      }else{
        this.setState({ wrong_answers: [...this.state.wrong_answers, questionsNav[this.state.current_que]] })
      }

    }
    realm4.write(() => {
      realm4.create('attended_questions' , {
         topic_id: questions[this.state.current_que].topic_id.toString(),
         id:  questions[this.state.current_que].id.toString()  ,
         answer_1: questions[this.state.current_que].answer_1,
         answer_2: questions[this.state.current_que].answer_2,
         answer_3: questions[this.state.current_que].answer_3,
         correct_answer: questions[this.state.current_que].correct_answer,
         explaination: questions[this.state.current_que].explaination,
         name: questions[this.state.current_que].name,
         question: questions[this.state.current_que].question,
         user_ans: '2'
        })
     })

     realm5.write(() => {
      realm5.create('attended_mix_questions' , {
        topic_id: questions[this.state.current_que].topic_id.toString(),
        id:  questions[this.state.current_que].id.toString()  ,
        answer_1: questions[this.state.current_que].answer_1,
        answer_2: questions[this.state.current_que].answer_2,
        answer_3: questions[this.state.current_que].answer_3,
        correct_answer: questions[this.state.current_que].correct_answer,
        explaination: questions[this.state.current_que].explaination,
        name: questions[this.state.current_que].name,
        question: questions[this.state.current_que].question,
        user_ans: '2'
        })
     })

    await realm3.write(() => {
     realm3.create('answers' , {
        topic_id: topic.id,
        queId: this.state.current_que,
        answer: '2'
       })

       if(!scoreCut){
         this.nextQue()
     }
    })
  }

  async option3Selected(scoreCut){
    var answers = realm3.objects('answers')

    const { navigation } = this.props
    const questionsNav = navigation.getParam('questions')
    const topic = navigation.getParam('topic')
    const questions = navigation.getParam('questions')
    this.setState({optionBackground3: "#000", optionBackground1: "#052666", optionBackground2: "#052666"})


    this.setState({ attended_questions: [...this.state.attended_questions, questions[this.state.current_que]], selectedAns: 3, optionBackground3: "#000", optionBackground1: "#052666", optionBackground2: "#052666"})

   if(!scoreCut){
     if(questionsNav[this.state.current_que].correct_answer == "3"){
         this.setState({ score: this.state.score + 1, correct_answers: [...this.state.correct_answers, questionsNav[this.state.current_que]] })
     }else{
       this.setState({ wrong_answers: [...this.state.wrong_answers, questionsNav[this.state.current_que]] })
     }
   }

   realm4.write(() => {
     realm4.create('attended_questions' , {
        topic_id: questions[this.state.current_que].topic_id.toString(),
        id:  questions[this.state.current_que].id.toString()  ,
        answer_1: questions[this.state.current_que].answer_1,
        answer_2: questions[this.state.current_que].answer_2,
        answer_3: questions[this.state.current_que].answer_3,
        correct_answer: questions[this.state.current_que].correct_answer,
        explaination: questions[this.state.current_que].explaination,
        name: questions[this.state.current_que].name,
        question: questions[this.state.current_que].question,
        user_ans: '3'
       })
    })

    realm5.write(() => {
      realm5.create('attended_mix_questions' , {
        topic_id: questions[this.state.current_que].topic_id.toString(),
        id:  questions[this.state.current_que].id.toString()  ,
        answer_1: questions[this.state.current_que].answer_1,
        answer_2: questions[this.state.current_que].answer_2,
        answer_3: questions[this.state.current_que].answer_3,
        correct_answer: questions[this.state.current_que].correct_answer,
        explaination: questions[this.state.current_que].explaination,
        name: questions[this.state.current_que].name,
        question: questions[this.state.current_que].question,
        user_ans: '3'
        })
     })

   await realm3.write(() => {
     realm3.create('answers' , {
        topic_id: topic.id,
        queId: this.state.current_que  ,
        answer: '3'
       })

       if(!scoreCut){
         this.nextQue()
      }
   })
  }

  previosQue(){
    this.setState({ proviousOption: this.state.proviousOption - 1, current_que: this.state.current_que - 1, optionBackground1: "#052666", optionBackground2: "#052666", optionBackground3: "#052666"  })
    var answers = realm3.objects('answers')
    const { navigation } = this.props
    const questionsNav = navigation.getParam('questions')
    const topic = navigation.getParam('topic')



    var filterData = answers.filter((item) => item.queId == this.state.current_que - 1)
    console.log("filterData", filterData.length)


    if(filterData.length == 1 ){
      if(filterData[0].answer == "1"){
        this.setState({ selectedAns: 1, optionBackground2: "#052666", optionBackground1: "#0000", optionBackground3: "#052666"})
      }else if(filterData[0].answer == "2"){
        this.setState({ selectedAns: 2, optionBackground2: "#000", optionBackground1: "#052666", optionBackground3: "#052666"})
      }else if(filterData[0].answer == "3"){
        this.setState({ selectedAns: 3, optionBackground3: "#000", optionBackground1: "#052666", optionBackground2: "#052666"})
      }
    }else{
      if(filterData.length > 0){
        if(filterData.pop().answer == "1"){
          this.setState({ selectedAns: 1, optionBackground2: "#052666", optionBackground1: "#000", optionBackground3: "#052666"})
        }else if(filterData.pop().answer == "2"){
          this.setState({ selectedAns: 2, optionBackground2: "#000", optionBackground1: "#052666", optionBackground3: "#052666"})
        }else if(filterData.pop().answer == "3"){
          this.setState({ selectedAns: 3, optionBackground3: "#000", optionBackground1: "#052666", optionBackground2: "#052666"})
        }
      }
    }


  }

  nextQue() {
    const { navigation } = this.props
    const questions = navigation.getParam('questions')
    const topic = navigation.getParam('topic')
    var answers = realm3.objects('answers')


    var filterData = answers.filter((item) => item.queId == this.state.current_que - 1)
    console.log("filterData", answers.map((item) => item))



    if(this.state.current_que < questions.length - 1 ){
      this.setState({ attended_questions: [...this.state.attended_questions, questions[this.state.current_que]], progress: this.state.progress + 1 , disableButton: false,proviousOption: this.state.proviousOption + 1, current_que: this.state.current_que + 1, optionBackground1: "#052666", optionBackground2: "#052666", optionBackground3: "#052666" })
    }







    // console.log("filterData", filterData)
    //
    // if(filterData.length > 0 ){
    //   if(filterData.pop().answer == "1"){
    //     this.option1Selected()
    //   }else if(filterData.pop().answer == "2"){
    //     this.option2Selected()
    //   }else if(filterData.pop().answer == "3"){
    //     this.option3Selected()
    //   }
    // }

  }

 closePress(){

   const { navigation } = this.props
   const topic = navigation.getParam('topic')
   const mixQue = navigation.getParam('mixQue')
   var topicProgress = realm.objects('topic_progress')
   const questions = navigation.getParam('questions')
   var answers = realm3.objects('answers')


   const TopicIDLocal = topicProgress.filter((item) => item.topic_id == topic.id)

   console.log("TopicIDLocal", TopicIDLocal)

   if(TopicIDLocal.topic_id  == topic.id){
     realm.write(() => {
       topicProgress.question_attempt = this.state.current_que + 1 + mixQue
    })
   } else{
     realm.write(() => {
        realm.create('topic_progress', {
          topic_id: topic.id,
          question_attempt:  this.state.current_que + 1 + mixQue
          })
      })
   }

   this.setState({ attended_questions: [...this.state.attended_questions, questions[this.state.current_que]]})

   this.props.navigation.navigate("ResultScreen",
    { answers: answers, topic: topic, attended_questions: this.state.attended_questions,score:
     this.state.score, progress: this.state.progress, time: this.state.timer,
     correct_answers: this.state.correct_answers,
     wrong_answers: this.state.wrong_answers
     })

   var topicProgress = realm.objects('topic_progress')
   var topicProgressData = topicProgress.filter((item) => item.topic_id == topic.id)

   var progress = topicProgressData.map((item) => item.question_attempt)

   // this.setState({ progress: progress.reduce((a, b) => a + b)})

   console.log("TopicProgress", progress.reduce((a, b) => a + b))
 }

  render() {

    const { navigation } = this.props
    const questions = navigation.getParam('questions')
    const questionlimit = navigation.getParam('questionlimit')


    return (
      <ImageBackground source= {HomeBg} style={styles.container}>

        <View style={{ margin: 5, marginTop: 15, padding: 10, backgroundColor: "#052666", borderRadius: 5}}>
          <Text style={{ color: "#fff", fontSize: 19}}>Q {this.state.current_que + 1 }. {questions[this.state.current_que].question}</Text>
        </View>

        <TouchableOpacity disabled={this.state.disableButton} onPress={() => this.option1Selected()} style={[{ margin: 5, padding: 10, borderRadius: 5}, { backgroundColor: this.state.optionBackground1}]}>
          <Text style={{ color: "#fff", fontSize: 19}}>{questions[this.state.current_que].answer_1}</Text>
        </TouchableOpacity>

        <TouchableOpacity  disabled={this.state.disableButton} onPress={() => this.option2Selected()} style={[{ margin: 5,  padding: 10, borderRadius: 5}, { backgroundColor: this.state.optionBackground2}]}>
          <Text style={{ color: "#fff", fontSize: 19}}>{questions[this.state.current_que].answer_2}</Text>
        </TouchableOpacity>

        <TouchableOpacity  disabled={this.state.disableButton} onPress={() => this.option3Selected()} style={[{ margin: 5, padding: 10, borderRadius: 5}, , { backgroundColor: this.state.optionBackground3}]}>
          <Text style={{ color: "#fff", fontSize: 19}}>{questions[this.state.current_que].answer_3}</Text>
        </TouchableOpacity>

        <View style={styles.bottomView}>


        <ImageBackground source={ButtonBgImg} style={{ height: "100%", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>


        <View>
         <Text style={{ color: "#fff", fontSize: 18, fontWeight: 'bold'}}>{this.state.timer}</Text>
        </View>

        {this.state.proviousOption > 0 ?
          <TouchableOpacity  onPress={() => this.previosQue()}>
            <Icon
            name='arrow-left'
            type="font-awesome"
            color='#fff' />
          </TouchableOpacity> : null
        }


        <TouchableOpacity onPress={() => this.highlightAns(questions[this.state.current_que].correct_answer)}>
          <Text style={{ color: "#fff", fontWeight: 'bold', fontSize: 20}}>R</Text>
        </TouchableOpacity>

        {this.state.current_que <  questionlimit - 1 ? <TouchableOpacity onPress={() => this.nextQue()}>
            <Icon
            name='arrow-right'
            type="font-awesome"
            color='#fff' />
          </TouchableOpacity> : null }

          <TouchableOpacity onPress={() => this.closePress()}>
            <Icon
            name='close'
            type="material-community"
            style={{ fontWeight: 'bold', fontSize: 24}}
            color='#fff' />
          </TouchableOpacity>



        </ImageBackground>


        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  bottomView: {
   position: 'absolute', bottom: 0 , height: "10%", width: "100%"
  }
});
