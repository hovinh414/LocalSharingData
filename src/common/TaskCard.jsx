import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants';
import moment from 'moment';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import * as Progress from 'react-native-progress'
import countCompletedSubTask from '../screens/tasks/methods/countCompletedSubTask';

const { width } = Dimensions.get('window')

const TaskCard = ({ navigation, task }) => {
  const handleNavigate = () => {
    navigation.navigate('Task Detail', task);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View
        style={[
          styles.priorityContainer,
          {
            backgroundColor: task.completed
              ? COLORS.green
              : task.priority === 'High'
                ? COLORS.red
                : task.priority === 'Medium'
                  ? COLORS.lightyellow
                  : COLORS.darkgray,
          },
        ]}>
        <Text style={[styles.priority, { color: task.priority === 'Medium' ? COLORS.black : COLORS.lightwhite }]}>
          {task.completed ? 'Done' : task.priority}
        </Text>
      </View>

      <View style={[styles.in4Container, { opacity: task.completed ? 0.5 : 1 }]}>
        <View style={styles.titleAndStatusContainer}>
          <Text
            style={[styles.title,
            ]}
            numberOfLines={1}>
            {task.title}
          </Text>

          <BouncyCheckbox
            size={25}
            fillColor={COLORS.green}
            unfillColor="#FFFFFF"
            innerIconStyle={{
              borderWidth: 2,
              borderColor: task.completed ? 'transparent' : COLORS.lightgray,
            }}
            disabled={true}
            isChecked={task.completed}
            disableText
          />
        </View>

        <View style={styles.dueContainer}>
          <MaterialCommunityIcons name="alarm" color={COLORS.red} size={SIZES.large} />

          <Text style={styles.due}>
            {task.time}
          </Text>
        </View>

        <View style={styles.assigneeContainer}>
          <MaterialCommunityIcons name='account-group' size={SIZES.large} color={COLORS.primary} />

          <Text style={styles.assigneeNumber}>{task.taskAssignee.length}/{task.maxAssignee}</Text>
        </View>


        {task.details.length === 0
          ? null
          : <View style={{gap: 5}}>
            <Progress.Bar progress={countCompletedSubTask(task.details) / task.details.length}
              width={width - width * 0.06 - 32} 
              unfilledColor={COLORS.lightgray}
              borderWidth={0} />

            <View style={styles.progressContainer}>
              <Text style={styles.progress}>TIẾN ĐỘ: {countCompletedSubTask(task.details)}/{task.details.length}</Text>

              <Text style={styles.progress}>{(countCompletedSubTask(task.details) / task.details.length * 100).toFixed(0)}%</Text>
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
    alignItems: 'center'
  },

  titleContainer: {
    gap: 10,
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
    flex: 1
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
