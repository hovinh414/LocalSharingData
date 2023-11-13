import React, {useEffect, useState} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllTasks from '../src/screens/tasks/allTasks/AllTasks';
import TodoTasks from '../src/screens/tasks/completedTasks/TodoTasks';
import CompletedTasks from '../src/screens/tasks/todoTasks/CompletedTasks';

const Tab = createMaterialTopTabNavigator();

const TaskTopTabNavigator = () => {

  return (
    <Tab.Navigator initialRouteName='AllTasks'>
        <Tab.Screen name='AllTasks' component={AllTasks}/>
        <Tab.Screen name='TodoTasks' component={TodoTasks}/>
        <Tab.Screen name='CompletedTasks' component={CompletedTasks}/>
    </Tab.Navigator>
  )
}

export default TaskTopTabNavigator
