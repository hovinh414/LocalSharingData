import {SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import styles from './task.style';
import {COLORS} from '../../../constants';
import leftIcon from '../../../assets/images/left-chevron.png';
import rightIcon from '../../../assets/images/right-chevron.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskTopTabNavigator from '../../../navigators/TaskTopTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {setCompletedTask, setTaskList, setTodoTask} from '../../redux/reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const Task = ({navigation}) => {
  let today = moment().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);
  const [isManager, setIsManager] = useState(true);
  const user = useSelector(state => state.P2P.user);
  const dispatch = useDispatch();
  const getDataFromStorage = async () => {
    const storageData = await AsyncStorage.getItem('taskKey');
    // console.log(storageData);
    if (storageData !== null) {
      const data = JSON.parse(storageData);
      const completedTask = data.filter(
        task =>
          task.date === moment(date).format('DD/MM/YYYY') &&
          task.isDone === true,
      );
      const todoTasks = data.filter(
        task =>
          task.date === moment(date).format('DD/MM/YYYY') &&
          task.joinedParticipants.some(
            participant => user.deviceName === participant.deviceName,
          ),
      );

      const regularTasks = data.filter(
        task =>
          task.date === moment(date).format('DD/MM/YYYY') &&
          !task.joinedParticipants.some(
            participant => user.deviceName === participant.deviceName,
          ),
      );

      dispatch(setTodoTask(todoTasks));
      dispatch(setTaskList(regularTasks));
      dispatch(setCompletedTask(completedTask));
    } else {
      dispatch(setTaskList([]));
      dispatch(setTodoTask([]));
      dispatch(setCompletedTask([]));
    }
  };

  // useEffect(() => {
  //   getDataFromStorage()
  // }, [date]);
  getDataFromStorage();

  useFocusEffect(() => {
    // Logic cập nhật hoặc render lại ở đây
    getDataFromStorage();
  });

  const markedDatesFunc = today => [
    {
      date: today,
      dots: [
        {
          color: COLORS.white,
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CalendarStrip
        scrollable
        markedDates={markedDatesFunc(today)}
        style={styles.calendarStrip}
        calendarColor={COLORS.primary}
        calendarHeaderStyle={{color: COLORS.white, marginBottom: 15}}
        dateNumberStyle={{color: COLORS.white}}
        dateNameStyle={{color: COLORS.white}}
        iconContainer={{flex: 0.1}}
        selectedDate={date}
        onDateSelected={params => {
          setDate(params.format('YYYY-MM-DD'));
          // console.log(params.format('DD/MM/YYYY'))
        }}
        calendarAnimation={{type: 'sequence', duration: 30}}
        iconLeft={leftIcon}
        iconRight={rightIcon}
        dayContainerStyle={{paddingTop: 7, paddingBottom: 7}}
        highlightDateNameStyle={{color: COLORS.white}}
        highlightDateNumberStyle={{color: COLORS.white}}
        daySelectionAnimation={{
          type: 'border',
          duration: 100,
          borderHighlightColor: COLORS.white,
          borderWidth: 1,
        }}
        // highlightDateContainerStyle={{backgroundColor: COLORS.secondary}}
        minDate={moment().subtract(10, 'days')}
        maxDate={moment().add(10, 'days')}
      />

      {isManager ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('AddTask')}
          style={styles.buttonAdd}>
          <Ionicons name="add-outline" size={32} color={COLORS.white} />
        </TouchableOpacity>
      ) : null}

      <TaskTopTabNavigator />
    </SafeAreaView>
  );
};

export default Task;
