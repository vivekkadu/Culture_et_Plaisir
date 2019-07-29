import React, { Component } from 'react';
import { View, Text, Image, ImageBackground , TouchableOpacity} from 'react-native';
import SubjectIcon from '../Img/icon_subject_btn.png';
import Button from '../Img/button.png';
import ActiveButton from '../Img/active_button.png'
import _ from 'lodash'


export default class BottomTabComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (

      <View source={Button}  style={{ height: "7%",   position: 'absolute',bottom:0, width:"100%", flexDirection: 'row' }}>


        <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.tab1Style}>
       
        <ImageBackground source={ActiveButton} style={{ justifyContent: 'center', flexDirection: 'row', width: '100%', height: "100%", alignItems: 'center'}}>

            <Image source={SubjectIcon} style={{ width: 30, height: 30 }}/>
            <Text style={styles.textStyle}>Sujet</Text>
       
        </ImageBackground>

        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("MixTestScreen", { allQuestion:  _.shuffle(this.props.allQuestion) })} style={styles.tab2Style}>
          
          <ImageBackground source={ActiveButton} style={{ justifyContent: 'center', flexDirection: 'row', width: '100%', height: "100%", alignItems: 'center'}}>

            <Image source={SubjectIcon} style={{ width: 30, height: 30 }}/>
            <Text style={styles.textStyle}>Test Mixte</Text>

            </ImageBackground>

        </TouchableOpacity>



      </View>

    );
  }
}

const styles = {
    tab1Style: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#fff',
        borderRightWidth: 0.4,
        height: "100%"
    },
    buttonStyle: {
      width: "100%",
      flexDirection: 'row',
      height: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: '#fff',
    },
    tab2Style: {

        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#fff',
        height: "100%"


    },
    textStyle: {
      color: '#fff',
      fontSize: 16,
      marginLeft: 5,
      fontWeight: 'bold'
    },

}



         //  <TouchableOpacity style={styles.tab1Style}>
         //  <ImageBackground source={ActiveButton} style={styles.tab1Style} style={styles.buttonStyle} >
         //
         //     <Image source={SubjectIcon} style={{ width: 30, height: 30 }}/>
         //     <Text style={styles.textStyle}>Suject</Text>
         //
         //  </ImageBackground>
         //  </TouchableOpacity>
         //
         //  <TouchableOpacity style={styles.tab1Style}>
         //
         //  <ImageBackground source={Button} style={styles.buttonStyle} >
         //      <Image source={SubjectIcon} style={{ width: 30, height: 30 }}/>
         //     <Text style={styles.textStyle}>Test Mixte</Text>
         // </ImageBackground>
         //
         // </TouchableOpacity>
