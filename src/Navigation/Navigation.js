import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../FetchAPIDemo/HomeScreen';
import ProductDetails from '../FetchAPIDemo/ProductDetails';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{title: 'HomeScreen'}}
        />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
