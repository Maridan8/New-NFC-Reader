/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
} from 'react-native';


import PassportReader from './src/PassportReader';

function App(){

  return (
    <SafeAreaView style={{backgroundColor:"#555"}}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor:
        "#555"}}>
        <PassportReader />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
