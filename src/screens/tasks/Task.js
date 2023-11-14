import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import styles from './task.style';
import {COLORS, images} from '../../../constants';
import leftIcon from '../../../assets/images/left-chevron.png';
import rightIcon from '../../../assets/images/right-chevron.png';
import {tasks} from '../../../assets/data/tasks';
import TaskCard from '../../common/TaskCard';
import noTasks from '../../../assets/images/no-task.png';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TaskTopTabNavigator from '../../../navigators/TaskTopTabNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {setTaskList} from '../../redux/reducers';

const Task = ({navigation}) => {
  let today = moment().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTaskList(tasks.filter(task => task.date === date)));
  }, [date]);

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
          // console.log(timestamp)
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

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddTask')}
        style={styles.buttonAdd}>
        <Ionicons name="add-outline" size={32} color={COLORS.white} />
      </TouchableOpacity>

      <TaskTopTabNavigator />
    </SafeAreaView>
  );
};

export default Task;
