import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants';
import moment from 'moment';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress'
import countCompletedSubTask from '../screens/tasks/methods/countCompletedSubTask';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window')

const TaskCard = ({ navigation, task }) => {
  const [joinedPeople, setJoinedPeople] = useState(task.joinedParticipants.length)
  console.log(joinedPeople)
  const user = useSelector(state => state.P2P.user)

  const handleNavigate = () => {
    navigation.navigate('Task Detail', task);
  };

  const checkJoinedTask = () => {
    const findDevice = task.joinedParticipants.find(participant => participant.deviceName === user.deviceName)

    if (findDevice) {
      return true
    }

    return false
  }

  const [joined, setJoined] = useState(checkJoinedTask())

  const handleJoinTask = async () => {
    const newArray = JSON.parse(await AsyncStorage.getItem('taskKey'))

    const indexToUpdate = newArray.findIndex(item => item.taskId === task.taskId)

    newArray[indexToUpdate].joinedParticipants.push({ deviceName: user.deviceName })

    await AsyncStorage.setItem('taskKey', JSON.stringify(newArray))

    setJoinedPeople(joinedPeople + 1)
    setJoined(!joined)

    ToastAndroid.show('Join task thành công!', ToastAndroid.SHORT)
  }



  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View
        style={[
          styles.priorityContainer,
          {
            backgroundColor: task.isDone
              ? COLORS.green
              : task.selected === 'High'
                ? COLORS.red
                : task.selected === 'Medium'
                  ? COLORS.lightyellow
                  : COLORS.darkgray,
          },
        ]}>
        <Text style={[styles.priority, { color: (task.isDone === false && task.selected === 'Medium') ? COLORS.black : COLORS.lightwhite }]}>
          {task.isDone ? 'Done' : task.selected}
        </Text>
      </View>

      <View style={[styles.in4Container, { opacity: task.isDone ? 0.5 : 1 }]}>
        <View style={styles.titleAndStatusContainer}>
          <Text
            style={[styles.title,
            ]}
            numberOfLines={1}>
            {task.title}
          </Text>

          {joinedPeople === parseInt(task.maxParticipants)
            ? <Text style={styles.fullParticipants}>Đã đủ</Text>
            : (
              joined
                ? <FontAwesome5 name='user-check' size={SIZES.large + 2} color={COLORS.primary} />
                : <TouchableOpacity onPress={handleJoinTask}>
                  <FontAwesome5 name='user-plus' size={SIZES.large + 2} color={COLORS.primary} />
                </TouchableOpacity>
            )
          }
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.dueAndAssigneeWrapper}>
            <View style={styles.dueContainer}>
              <MaterialCommunityIcons name="alarm" color={COLORS.red} size={SIZES.large} />

              <Text style={styles.due}>
                {task.time}
              </Text>
            </View>

            <View style={styles.assigneeContainer}>
              <MaterialCommunityIcons name='account-group' size={SIZES.large} color={COLORS.primary} />

              <Text style={styles.assigneeNumber}>{joinedPeople}/{task.maxParticipants}</Text>
            </View>
          </View>

          <BouncyCheckbox
            size={28}
            fillColor={COLORS.green}
            unfillColor="#FFFFFF"
            innerIconStyle={{
              borderWidth: 2,
              borderColor: task.isDone ? 'transparent' : COLORS.lightgray,
            }}
            disabled={true}
            isChecked={task.isDone}
            disableText
          />
        </View>


        {task.detailTasks.length === 0
          ? null
          : <View style={{ gap: 5 }}>
            <Progress.Bar progress={countCompletedSubTask(task.detailTasks) / task.detailTasks.length}
              width={width - width * 0.06 - 32}
              unfilledColor={COLORS.lightgray}
              color={COLORS.primary}
              borderWidth={0} />

            <View style={styles.progressContainer}>
              <Text style={styles.progress}>TIẾN ĐỘ: {countCompletedSubTask(task.detailTasks)}/{task.detailTasks.length}</Text>

              <Text style={styles.progress}>{(countCompletedSubTask(task.detailTasks) / task.detailTasks.length * 100).toFixed(0)}%</Text>
            </View>
          </View>}
      </View>
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    elevation: 5,
    borderRadius: 16,
    marginVertical: 7,
    marginHorizontal: '3%',
    alignItems: 'center',
  },

  priorityContainer: {
    height: 30,
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    borderTopEndRadius: 16,
    borderTopLeftRadius: 16,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  priority: {
    fontWeight: '500',
  },

  in4Container: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 16,
    width: '100%',
    gap: 10,
  },

  titleAndStatusContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },

  titleContainer: {
    gap: 10,
    flex: 1,
  },

  fullParticipants: {
    fontWeight: '500',
    color: COLORS.gray
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
    flex: 1
  },

  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },

  dueAndAssigneeWrapper: {
    gap: 10,
    flex: 1,
  },

  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  due: {
    color: COLORS.red,
    fontSize: 16,
    fontWeight: '500'
  },

  assigneeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  assigneeNumber: {
    fontSize: 16,
    color: COLORS.primary
  },

  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  progress: {
    color: COLORS.black,
    fontWeight: '500'
  }
});
