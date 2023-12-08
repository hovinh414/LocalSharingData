import React, {useEffect} from 'react'
import { View, Text, FlatList, SafeAreaView, Image } from 'react-native'
import styles from '../task.style'
import TaskCard from '../../../common/TaskCard'
import noTasks from '../../../../assets/images/no-task.png'
import { useSelector } from 'react-redux'
import sortTasks from '../methods/sortTasks'
import { COLORS } from '../../../../constants'

const AllTasks = ({navigation}) => {
  let taskList = useSelector(state => state.P2P.taskList)

  // const GetData = async () => {
  //  taskList =  await useSelector(state => state.P2P.taskList)
  // }

  // GetData()
  const sortedTasks = sortTasks(taskList)

  // console.log(sortedTasks)
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
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
            return <TaskCard task={item} key={index} navigation={navigation}/>;
          }}
          style={styles.taskList}
        />
      )}
    </SafeAreaView>
  )
}

export default AllTasks
