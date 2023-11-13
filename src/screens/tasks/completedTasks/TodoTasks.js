import React from 'react'
import {View, Text, SafeAreaView, Image, FlatList} from 'react-native'
import { useSelector } from 'react-redux'
import filterTasks from '../filterTasks'
import styles from '../task.style'
import noTasks from '../../../../assets/images/no-task.png'
import TaskCard from '../../../common/TaskCard'
import sortTasks from '../sortTasks'

const TodoTasks = () => {
  const taskList = useSelector(state => state.P2P.taskList)

  filteredTasks = filterTasks(taskList, 'To do')

  sortedTasks = sortTasks(filteredTasks)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {sortedTasks.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Image source={noTasks} style={styles.noTasksImage} />

          <Text style={styles.noTasks}>No tasks found!</Text>
        </View>
      ) : (
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={sortedTasks}
          renderItem={({ item, index }) => {
            return <TaskCard task={item} key={index} />;
          }}
          style={styles.taskList}
        />
      )}
    </SafeAreaView>
  )
}

export default TodoTasks
