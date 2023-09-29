import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './Store/Store';
import HomeScreen from './FetchAPIDemo/HomeScreen';
import MyStack from './Navigation/Navigation';

const App = () => {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
