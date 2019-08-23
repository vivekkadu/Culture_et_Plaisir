/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler
} from 'react-native';
import Header from '../components/Header'
import Share from 'react-native-share';

export default class ResultScreen extends Component {
  constructor(props) {

    super(props);
    this.state= {
      optionBackground1: "#28C128",
      optionBackground2: "#28C128",
      optionBackground3: "#28C128",
      hideAllQue: false,
      showAllCorrect: false,
      showAllWrong: false,
      index: 0
    }
  }
  formatTime(seconds) {
    return seconds > 3600
    ?
      [
        parseInt(seconds / 60 / 60),
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ].join(":").replace(/\b(\d)\b/g, "0$1")
    :
      [
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ].join(":").replace(/\b(\d)\b/g, "0$1")
  }

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

  }

  openShare(topic, score, totalque){
    const shareOptions = {
      title: 'Share Options',
      message: `Download Culture et Plaisir App \n\n My Score for Topic ${topic.name} is ${score}/${totalque}\n\n`,
      url: 'app url will be here',
      subject: 	'My Result on Culture et Plaisir App'
    };
  Share.open(shareOptions);
  }

  showAllCorrect() {
    this.setState({ hideAllQue: true, showAllCorrect: true , showAllWrong: false})
  }

  showAllWrong() {
    this.setState({ hideAllQue: true, showAllCorrect: false, showAllWrong: true })
  }

  showAll() {
    this.setState({ hideAllQue: false, showAllCorrect: false, showAllWrong: false })

  }
  renderUserAnswers(index){
    const { navigation } = this.props
    const answers = navigation.getParam('answers')
    const topic = navigation.getParam('topic')

    var filterData = answers.filter((item) => item.topic_id === topic.id)



     if(filterData[index] === undefined){
       return index + 1
     }else{
       return filterData[index].answer
     }

    console.log("INDEXZ",index)
    console.log("DATA", filterData)

  }

  componentWillUnmount(){
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Home')
    return true;
  }


renderUserAnswersOptions(index,que){
  if(!this.renderUserAnswers()[index].answer === undefined){
    if(this.renderUserAnswers()[index].answer == "1" && que.correct_answer !== "1" ){
      return <View style={[styles.option1Style, { backgroundColor: "red" }]}>
       <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_1}</Text>
       </View>
      }
    if(this.renderUserAnswers()[index].answer == "2" && que.correct_answer !== "2" ){
        return <View style={[styles.option1Style, { backgroundColor: "red" }]}>
         <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_2}</Text>
         </View>
        }
    if(this.renderUserAnswers()[index].answer == "3" && que.correct_answer !== "3" ){
          return <View style={[styles.option1Style, { backgroundColor: "red" }]}>
           <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_3}</Text>
           </View>
          }
  }
}

  render() {
    const { navigation } = this.props
    const score = navigation.getParam('score')
    const progress = navigation.getParam('progress')
    const attended_questions = navigation.getParam('attended_questions')
    const time = navigation.getParam('time')
    const topic = navigation.getParam('topic')
    const answers = navigation.getParam('answers')
    const correct_answers = navigation.getParam('correct_answers')
    const wrong_answers = navigation.getParam('wrong_answers')

    var per = (score/attended_questions.length) * 100

    return (
      <View style={styles.container}>

        <Header ShowAll={() => this.showAll()} showAllWrong={() => this.showAllWrong()} showAllCorrect={() => this.showAllCorrect()} openShare={() => this.openShare(topic, score, attended_questions.length)} headerText={"Résultats"} showSideMenu={true}  showHome={true} navigation={this.props.navigation}/>

        <View style={{ backgroundColor: "#639EE4",  padding: 8}}>

             <Text style={{ fontSize: 22, fontWeight: 'bold', alignSelf: 'center', color: "#fff", margin: 7}}>{topic.name}</Text>

            <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between'}}>

            <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold'}}>Résultats:</Text> {score}/{attended_questions.length}</Text>
            <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold'}}>Temps:</Text> {this.formatTime(time)} Min</Text>
            {per > 50 ? <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold'}}>Statut:</Text>Passé</Text> : <Text style={styles.textStyle}><Text style={{ fontWeight: 'bold'}}>Statut:</Text> Échoué</Text>}
            </View>
        </View>

        <ScrollView>

          {this.state.hideAllQue ? null :
            attended_questions.map((que, index)=> {
                return <View key={index} style={styles.cardStyle}>
                <Text style={{ fontSize: 16, color: '#3261CB', marginBottom: 3}}>Q {index + 1 }. {que.question}</Text>


               {que.correct_answer == "1"   ?  <View style={[styles.option1Style, { backgroundColor: this.state.optionBackground1 }]}>
                <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_1}</Text>
                </View> : this.renderUserAnswers(index) == "1"  ? null :  <View style={[styles.option1Style]}>
                  <Text style={{ fontSize: 16}}>{que.answer_1}</Text>
                  </View> }



              {this.renderUserAnswers(index) == "1" && que.correct_answer !== "1" ? <View style={[styles.option1Style, { backgroundColor: "red" }]}>
                 <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_1}</Text>
               </View>  : null }



               {que.correct_answer == "2"  ?   <View style={[styles.option2Style,{ backgroundColor: this.state.optionBackground2 }]}>
                <Text style={{ fontSize: 16,color: "#fff"}}>{que.answer_2}</Text>
                </View> : this.renderUserAnswers(index) == "2"  ? null :   <View style={[styles.option2Style]}>
                  <Text style={{ fontSize: 16}}>{que.answer_2}</Text>
                  </View> }


              {this.renderUserAnswers(index) == "2" && que.correct_answer !== "2"   ?  <View style={[styles.option1Style, { backgroundColor: "red" }]}>
                      <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_2}</Text>
                </View>  : null }


               {que.correct_answer == "3" ? <View style={[styles.option3Style,{ backgroundColor: this.state.optionBackground3 }]}>
               <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_3}</Text>
               </View> : this.renderUserAnswers(index)  == "3"  ? null :  <View style={[styles.option3Style]}>
               <Text style={{ fontSize: 16}}>{que.answer_3}</Text>
               </View>
               }


              {this.renderUserAnswers(index) == "3" && que.correct_answer !== "3" ?  <View style={[styles.option1Style, { backgroundColor: "red" }]}>
                      <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_3}</Text>
               </View>  : null }


              <View style={{ margin: 5, marginLeft: 10, backgroundColor: "#F8F8F8", padding: 5 }}>
                <Text>{que.explaination}</Text>
              </View>

            </View>
            })
           }

           {this.state.showAllCorrect ?
             correct_answers.map((que, index) => {
                return <View key={index} style={styles.cardStyle}>
                <Text style={{ fontSize: 16, color: '#3261CB', marginBottom: 3}}>Q {index + 1 }. {que.question}</Text>


               {que.correct_answer == "1"   ?  <View style={[styles.option1Style, { backgroundColor: this.state.optionBackground1 }]}>
                <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_1}</Text>
                </View> : null }


               {que.correct_answer == "2"  ?   <View style={[styles.option2Style,{ backgroundColor: this.state.optionBackground2 }]}>
                <Text style={{ fontSize: 16,color: "#fff"}}>{que.answer_2}</Text>
                </View> : null }


               {que.correct_answer == "3" ? <View style={[styles.option3Style,{ backgroundColor: this.state.optionBackground3 }]}>
               <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_3}</Text>
               </View> : null
                }

              <View style={{ margin: 5, marginLeft: 10, backgroundColor: "#F8F8F8", padding: 5 }}>
                <Text>{que.explaination}</Text>
              </View>

            </View> }) : null
            }

            {this.state.showAllWrong ? wrong_answers.map((que, index) => {
              return <View key={index} style={styles.cardStyle}>
              <Text style={{ fontSize: 16, color: '#3261CB', marginBottom: 3}}>Q {index + 1 }. {que.question}</Text>


             {que.correct_answer == "1"   ?  <View style={[styles.option1Style, { backgroundColor: this.state.optionBackground1 }]}>
              <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_1}</Text>
              </View> : this.renderUserAnswers(index) == "1"  ? null :  <View style={[styles.option1Style]}>
                <Text style={{ fontSize: 16}}>{que.answer_1}</Text>
                </View> }


              {this.renderUserAnswers(index) == "1" && que.correct_answer !== "1" ? <View style={[styles.option1Style, { backgroundColor: "red" }]}>
                 <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_1}</Text>
                 </View>  : null }


             {que.correct_answer == "2"  ?   <View style={[styles.option2Style,{ backgroundColor: this.state.optionBackground2 }]}>
              <Text style={{ fontSize: 16,color: "#fff"}}>{que.answer_2}</Text>
              </View> : this.renderUserAnswers(index) == "2"  ? null :   <View style={[styles.option2Style]}>
                <Text style={{ fontSize: 16}}>{que.answer_2}</Text>
                </View> }

             {this.renderUserAnswers(index) == "2" && que.correct_answer !== "2"   ?  <View style={[styles.option1Style, { backgroundColor: "red" }]}>
                 <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_2}</Text>
                 </View>  : null }


             {que.correct_answer == "3" ? <View style={[styles.option3Style,{ backgroundColor: this.state.optionBackground3 }]}>
             <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_3}</Text>
             </View> : this.renderUserAnswers(index) == "3"  ? null :  <View style={[styles.option3Style]}>
             <Text style={{ fontSize: 16}}>{que.answer_3}</Text>
             </View>
           }

           {this.renderUserAnswers(index) == "3" && que.correct_answer !== "3" ?  <View style={[styles.option1Style, { backgroundColor: "red" }]}>
            <Text style={{ fontSize: 16, color: "#fff"}}>{que.answer_3}</Text>
            </View>  : null }


            <View style={{ margin: 5, marginLeft: 10, backgroundColor: "#F8F8F8", padding: 5 }}>
              <Text>{que.explaination}</Text>
            </View>

          </View>
              }) :
              null
            }

        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    color: '#fff',
    fontSize: 15,
  },
  cardStyle: {
    padding: 10,
    margin: 5,
    marginBottom: 7
  },
  option1Style: {
    margin: 2,
    borderColor: "#ddd",
    borderWidth: 0.5,
    padding: 7,
    backgroundColor: "#fff"
  },
  option2Style: {
    margin: 2,
    borderColor: "#ddd",
    borderWidth: 0.5,
    padding: 7,
    backgroundColor: "#fff"

  },
  option3Style: {
    margin: 2,
    borderColor: "#ddd",
    borderWidth: 0.5,
    padding: 7,
    backgroundColor: "#fff"

  }
});
