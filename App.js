
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux'
import app from './src/reducers'
import thunk from 'redux-thunk'
import AppNavigation from './src/navigation/AppNavigation'
import { Provider } from 'react-redux';



let store = createStore(app, applyMiddleware(thunk))

const App = () => {
  //  console.disableYellowBox = true;
  return (
      <SafeAreaView style={{ flex: 1 , backgroundColor:"#639EE4" }}>
        <StatusBar backgroundColor="#639EE4" barStyle="light-content"/>
        <Provider store={store}>
          <AppNavigation />
        </Provider>
      </SafeAreaView>
  );
};



export default App;
