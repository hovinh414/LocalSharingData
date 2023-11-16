import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTasks from '../src/screens/tasks/allTasks/AllTasks';
import TodoTasks from '../src/screens/tasks/todoTasks/TodoTasks';
import CompletedTasks from '../src/screens/tasks/completedTasks/CompletedTasks';
import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../constants';

const {width} = Dimensions.get('window')

const Tab = createMaterialTopTabNavigator();

const TaskTopTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator initialRouteName='AllTasks'
      screenOptions={{
        swipeEnabled:false,
        tabBarLabelStyle: { fontWeight: 'bold' },
        tabBarIndicatorStyle: styles.tabBarIndicator,
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#fff',
        tabBarStyle: styles.tabBar,
        tabBarIndicatorContainerStyle: { justifyContent: 'center' },
        tabBarPressColor: 'transparent'
      }}
    >
      <Tab.Screen name='All Tasks' component={AllTasks} initialParams={navigation}/>
      <Tab.Screen name='To do' component={TodoTasks} initialParams={navigation}/>
      <Tab.Screen name='Completed' component={CompletedTasks} initialParams={navigation}/>
    </Tab.Navigator>
  )
}

export default TaskTopTabNavigator

const styles = StyleSheet.create({
  tabBar: {
    width: Dimensions.get('window').width / 1.05,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: '#fff',
    marginVertical: 10,
    elevation: 4
  },

  tabBarIndicator: {
    height: null,
    width: width / 3.5,
    left: (width / 3.15 - (width / 3.5)) / 2,
    top: '10%',
    bottom: '10%',
    borderRadius: 10,
    backgroundColor: COLORS.dark,
  }
})
