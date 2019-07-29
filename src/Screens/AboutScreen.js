/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground
} from 'react-native';
import Header from '../components/Header'
var Realm = require('realm');
let realm;
import HomeBg from '../Img/main_bg.jpg'


export default class AboutScreen extends Component {


  render() {
    return (
      <ImageBackground source={HomeBg} style={styles.container}>
        <Header headerText="À propos" showHome={true} navigation={this.props.navigation} />
        <ScrollView style={{ padding: 10}}>

                  <Text style={styles.headingStyle}>DESCRIPTION</Text>

                  <Text style={styles.containStyle}>

                  Quizz Culture et Plaisir - L'application préférée des français : Ce quizz est destiné à vous faire plaisir tout en améliorant votre culture générale. Ne vous sentez plus mal à l’aise lors des conversations dans des diners ou des fêtes et sachez quoi dire à propos de n'importe quel sujet, histoire, science, religions, mythologies, etc. Etonnez vos amis par votre culture ….Toutes les questions auxquelles vous devez vous poser !

                  (Merci de mettre un commentaire si vous avez aimé !!!)

                  </Text>

                  <Text style={styles.headingStyle}>PRÉPARER PAR SUJETS :</Text>

                  <Text style={styles.containStyle}>

                  Vous pouvez améliorez votre connaissance par sujet. Toutes les questions sont classifiées par sujet. 
                  {"\n"}  Art et Lettres
                  {"\n"}  Corps et Santé
                  {"\n"}  Économie et Politiques
                  {"\n"}  Nature
                  {"\n"}  Histoire
                  {"\n"}  Mythologies et Légendes
                  {"\n"}  Pays du Monde
                  {"\n"}  Religions 
                  {"\n"}  Sciences et Techniques
                  {"\n"}  Sports et Loisirs
                  {"\n"}  Univers

                  </Text>

                  <Text style={styles.headingStyle}>TEXTE MIXTE :</Text>

                  <Text style={styles.containStyle}>
                  Dans le test mixte les questions sont présentées aléatoirement de tous les sujets. 
                  </Text>

                  <Text style={styles.headingStyle}>RÉSULTATS DE TEST DÉTAILLÉS : </Text>

                  <Text style={styles.containStyle}>
                  Un résumé est présenté à fin de chaque test. Il vous montre le temps que vous avez pris pour répondre, le score, les questions auxquels vous avez répondu correctement et la où vous aviez eu tort. Et oui, vous pouvez envoyer les résultats par e-mail.
                  </Text>

                  <Text style={styles.headingStyle}>INDICATEUR DE PROGRESSION :</Text>

                  <Text style={styles.containStyle}>
                  L’application enregistre votre progrès des que vous commencez à faire les tests.
                  il vous montre un beau graphique circulaire de sorte que vous puissiez dépister vos faiblesses et mettre plus d’efforts pour vous améliorer. 
                  </Text>

                  <Text style={styles.headingStyle}>TRÈS FACILE À UTILISER: </Text>

                  <Text style={styles.containStyle}>
                  L'interface graphique lisse vous permet de choisir les réponses possibles. Vous n'avez pas besoin d'appuyer sur trop de boutons et n’aurez pas à rencontrer des messages d’alertes inutiles. L’application est très interactif .Utilisation innovatrice du petit écran tactile de l’iPhone Secouer
                  votre iPhone/iPod pour sauter une question.
                  </Text>

                  <Text style={styles.headingStyle}>CARACTÉRISTIQUES:</Text>

                  <Text style={styles.containStyle}>
                  Choisissez le nombre de questions que vous voudriez dans chaque test.
                  {"\n"} Donne des résultats du quizz dans le format HTML.
                  {"\n"} Envoyez vous-même les résultats du quizz par e-mail et suivez votre progrès. 
                  {"\n"} Un nouveau module « indicateur de progression » vous informe de votre performance dans chaque sujet ou dans le texte mixte.
                  {"\n"} Un algorithme spécial qui randomise les questions a chaque fois que vous prenez le test.
                  </Text>




        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingStyle: {
    fontSize: 18,
    color:"#fff",
    marginTop: 5,
    margin: 8,
    fontWeight: 'bold'
  },
  containStyle: {
    color: "#fff",
    fontSize: 16,
    margin: 8
  }
});
