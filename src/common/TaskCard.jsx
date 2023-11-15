import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../constants';
import moment from 'moment';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TaskCard = ({navigation, task}) => {
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
              ? 'green'
              : task.priority === 'High'
              ? COLORS.red
              : task.priority === 'Medium'
              ? COLORS.yellow
              : COLORS.darkgray,
          },
        ]}>
        <Text style={styles.priority}>
          {task.completed ? 'Done' : task.priority}
        </Text>
      </View>

      <View style={styles.in4Container}>
        {/* <View style={[styles.iconContainer, { opacity: task.completed ? 0.5 : 1 }]}>
          <MaterialIcons name='task' size={30} color={COLORS.white} />
        </View> */}

        <View
          style={[styles.titleContainer, {opacity: task.completed ? 0.5 : 1}]}>
          <Text
            style={[
              styles.title,
              {textDecorationLine: task.completed ? 'line-through' : 'none'},
            ]}
            numberOfLines={1}>
            {task.title}
          </Text>

          <View style={styles.dueContainer}>
            <MaterialCommunityIcons name="alarm" color={COLORS.red} size={18} />

            <Text style={styles.due}>
              {moment(task.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
            </Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <BouncyCheckbox
            size={25}
            fillColor="green"
            unfillColor="#FFFFFF"
            innerIconStyle={{
              borderWidth: 2,
              borderColor: task.completed ? 'green' : COLORS.lightgray,
            }}
            disabled={true}
            isChecked={task.completed}
          />
        </View>
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
    color: COLORS.lightwhite,
    fontWeight: '500',
  },

  in4Container: {
    flexDirection: 'row',
    paddingVertical: '4%',
    paddingHorizontal: 16,
    width: '100%',
    alignItems: 'center',
    gap: 15,
    // backgroundColor: 'green'
  },

  iconContainer: {
    backgroundColor: COLORS.primary,
    padding: '2.5%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  titleContainer: {
    gap: 10,
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },

  dueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  due: {
    color: COLORS.red,
  },
});
