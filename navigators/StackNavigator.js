import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabsNavigator';

const Stack = createStackNavigator();

function StackTabs() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabsNavigator"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Chat Wifi P2P" component={} />
      <Stack.Screen name="Get Local Data" component={} /> */}
    </Stack.Navigator>
  );
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StackTabs />
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
