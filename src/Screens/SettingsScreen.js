/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  Alert,
  Linking
} from 'react-native';
import Header from '../components/Header'
import HomeBg from '../Img/main_bg.jpg'
import { Topics, Questions, TopicProgress, QueAns, AttendedMixQue , AttendedQue, AttendedMixQueAll} from '../Database/Schema'
import ResetButton from '../Img/button_grey.png'
import BackButton from '../Img/button_blue.png'
import Swiper from 'react-native-deck-swiper'
import Realm from 'realm'
import RNIap, {
  Product,
  ProductPurchase,
  acknowledgePurchaseAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  PurchaseError,

} from 'react-native-iap';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from '../components/Spinner';



const itemSkus = Platform.select({
  ios: [
    'com.culture.et.plaisir'
  ],
  android: [
    'com.culture.et.plaisir'
  ]
});

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
      array: questions.map((item) => item.question),
      showRemoveAd: true,
      products: [],
      loading: false
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

      realm6 = new Realm({
        path: 'attended_mix_que_all.realm',
        schema: [AttendedMixQueAll]

      })
    
  }

  getProduct = async () =>{


    try {
      const products = await RNIap.getProducts(itemSkus);
     
      console.log("Products")
        console.log(products)

        this.setState({ products })
        this.setState({isLoading:false})
       

    } catch(err) {
      console.warn(err); // standardized err.code and err.message available
      this.setState({isLoading:false})
      Alert.alert('Get Product', err.message);
    }


  }

  

  async componentDidMount(){
    const { navigation } = this.props
    const value = await AsyncStorage.getItem('app_type');

    const questions = navigation.getParam('questions')
    if(questions.length > 0){
      this.setState({ showSwiper: true})
    }

    if(value === 'paid'){
      this.setState({ showRemoveAd: false })
    }


    try {
      const result = await RNIap.initConnection();
      console.log("Result", result)
      this.getProduct()
    } catch(err) {
      console.warn(err); // standardized err.code and err.message available
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
          
    try {
      await realm4.write(() => {
        let question =  attended_que.filter((item) => item.id === id)
        realm4.delete(question[0])
      })
      this.setState({ cardIndex: this.state.cardIndex + 1 })
      if(this.state.cardIndex == this.state.array.length ){
        this.setState({ showSwiper: false})
      }else{
        this.swiper.jumpToCardIndex(this.state.cardIndex)
      }
    } catch (error) {
      alert(error)
    } 
  
  }else{
    this.setState({ showSwiper: false})
  }
 
 }

 requestPurchase = async () => {
  try {
    const result = await  RNIap.buyProduct("com.culture.et.plaisir")
    Alert.alert('Purchase successfully', "Transaction id:- "  + result.transactionId);
    this.setState({showRemoveAd:false})
    await AsyncStorage.setItem('app_type', 'paid')
  } catch (err) {
    console.warn(err.code, err.message);
    Alert.alert('',err.message)
  }
}

removeAllQue(){


  realm2.write(() =>  {
    realm2.deleteAll()
  })
  realm4.write(() =>  {
    realm4.deleteAll()
  })


  realm6.write(() => {
    realm6.deleteAll()
  })

  
  realm2.write(() => {
    realm2.create('topic_progress', {
         topic_id: "1" ,
          question_attempt:  0
        })
    })

    realm2.write(() => {
      realm2.create('topic_progress', {
           topic_id: "2" ,
            question_attempt:  0
          })
      })

      realm2.write(() => {
        realm2.create('topic_progress', {
             topic_id: "3" ,
              question_attempt:  0
            })
        })

        realm2.write(() => {
          realm2.create('topic_progress', {
               topic_id: "4" ,
                question_attempt:  0
              })
          })

          realm2.write(() => {
            realm2.create('topic_progress', {
                 topic_id: "5" ,
                  question_attempt:  0
                })
            })

            realm2.write(() => {
              realm2.create('topic_progress', {
                   topic_id: "6" ,
                    question_attempt:  0
                  })
              })


              realm2.write(() => {
                realm2.create('topic_progress', {
                     topic_id: "7" ,
                      question_attempt:  0
                    })
                })

                realm2.write(() => {
                  realm2.create('topic_progress', {
                       topic_id: "8" ,
                        question_attempt:  0
                      })
                  })

                  realm2.write(() => {
                    realm2.create('topic_progress', {
                         topic_id: "9" ,
                          question_attempt:  0
                        })
                    })

                    realm2.write(() => {
                      realm2.create('topic_progress', {
                           topic_id: "10" ,
                            question_attempt:  0
                          })
                      })

                      realm2.write(() => {
                        realm2.create('topic_progress', {
                             topic_id: "11" ,
                              question_attempt:  0
                            })
                        })


 
  this.setState({ showSwiper: false })
}
restorePurchase = async () =>{


  var isFree = true

    try {
      const purchases = await RNIap.getAvailablePurchases();
     console.log("restore purchases")
      console.log(purchases)

      purchases.forEach(purchase => {
        switch (purchase.productId) {
        case 'com.culture.et.plaisir':
         
           this.setState({showRemoveAd:false})
          isFree = false
          AsyncStorage.setItem('app_type', 'paid')
         
          break

        }
      })

      if(isFree){

         this.requestPurchase()
      }

    //  Alert.alert('Restore Successful', 'You successfully restored the following purchases: ' + restoredTitles.join(', '));
    } catch(err) {
      console.warn(err); // standardized err.code and err.message available
      Alert.alert(err.message);
      
    }
  
}


 purchaseApp() {

  Alert.alert(
    'REMOVE ADS',
    'Remove Ads and get full access of question for all topics',
    [
      {text: 'Acheter', onPress: () => this.requestPurchase()},
      {
        text: 'Réinitialiser',
        onPress: () => this.restorePurchase(),
        style: 'cancel',
      },
      {text: 'Annuler', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: true},
  );
  
}

  render() {
    

    return (
      <ImageBackground source={HomeBg} style={styles.container}>
        <Header showHome={true} headerText={"Paramètres"} navigation={this.props.navigation}/>

      <ScrollView style={{ flex: 1 }}>
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
                    cardIndex={this.state.cardIndex}
                    backgroundColor={'#fff'}
                    useViewOverflow={false}
                    stackSize= {6}>

                    </Swiper>

                    :  
                         <Text style={{ color: "#fff", alignSelf: 'center', fontSize: 20, marginTop: 30}}>NO QUESTIONS TO RESET</Text>
       }

      {
       
       this.state.showSwiper ? <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 20}}>
         <TouchableOpacity onPress={() => this.removeAttemptedQue(this.state.index)} style={{ marginTop: 320, flexDirection: 'row', margin: 15, justifyContent: 'center', alignItems: 'center'}}>
        
        <ImageBackground imageStyle={{ borderRadius: 0 , resizeMode: 'contain'}}
          style={styles.backgroundStyle} source={ResetButton}>
 
        <Text style={styles.textStyle}>Réinitialiser</Text>
 
        </ImageBackground> 
 
 
         </TouchableOpacity>

         <TouchableOpacity onPress={() => this.removeAllQue(this.state.index)} style={{ marginTop: 320, flexDirection: 'row', margin: 15, justifyContent: 'center', alignItems: 'center'}}>
        
        <ImageBackground imageStyle={{ borderRadius: 0 , resizeMode: 'contain'}}
          style={styles.backgroundStyle} source={ResetButton}>
 
        <Text style={styles.textStyle}>Effacer tout</Text>
 
        </ImageBackground> 
 
 
         </TouchableOpacity>

       
       </View>    : null
      
    
      }




      { this.state.showRemoveAd ? <TouchableOpacity style={{  borderRadius: 5, marginTop: 20, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', padding: 10, backgroundColor:'#052666'}} onPress={() => this.purchaseApp()}>
       <Text style={{ fontSize: 18, color: "#fff"}}>Enlever publicités 1$</Text>
     </TouchableOpacity>
      : null  }

      <TouchableOpacity style={{ alignSelf: 'center', margin: 25 }} onPress={() => Linking.openURL('https://sites.google.com/view/culture-et-plaisir-quiz/home')}>
       <Text style={{ color: "#fff", fontSize: 18, }}>Politique de confidentialité</Text>
      </TouchableOpacity>
     
      </ScrollView>

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
