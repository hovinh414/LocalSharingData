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
const Task = ({navigation}) => {
  let today = moment().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);
  const [filter, setFilter] = useState('All');
  const [taskList, setTaskList] = useState(
    tasks.filter(task => task.date === today),
  );
  // console.log(date)

  useEffect(() => {
    setTaskList(
      tasks
        .filter(task => {
          if (filter === 'To do') {
            return task.date === date && task.completed === false;
          } else if (filter === 'Completed') {
            return task.date === date && task.completed === true;
          }

          return task.date === date;
        })
        .sort((task1, task2) => {
          if (task1.completed && !task2.completed) {
            return 1;
          } else if (!task1.completed && task2.completed) {
            return -1;
          }

          const priorityOrder = {High: 1, Medium: 2, Low: 3};
          const priorityA = priorityOrder[task1.priority];
          const priorityB = priorityOrder[task2.priority];

          return priorityA - priorityB;
        }),
    );
  }, [date, filter]);

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
          setFilter('All');
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
      <TouchableOpacity onPress={() => navigation.navigate('AddTask')} style={styles.buttonAdd}>
        <Ionicons name="add-outline" size={32} color={COLORS.white} />
      </TouchableOpacity>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterItem,
            filter === 'All'
              ? styles.activeFilterItem
              : styles.inactiveFilterItem,
          ]}
          onPress={() => setFilter('All')}>
          <Text
            style={[
              styles.filterText,
              filter === 'All'
                ? styles.activeFilterText
                : styles.inactiveFilterText,
            ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            filter === 'To do'
              ? styles.activeFilterItem
              : styles.inactiveFilterItem,
          ]}
          onPress={() => setFilter('To do')}>
          <Text
            style={[
              styles.filterText,
              filter === 'To do'
                ? styles.activeFilterText
                : styles.inactiveFilterText,
            ]}>
            To do
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterItem,
            filter === 'Completed'
              ? styles.activeFilterItem
              : styles.inactiveFilterItem,
          ]}
          onPress={() => setFilter('Completed')}>
          <Text
            style={[
              styles.filterText,
              filter === 'Completed'
                ? styles.activeFilterText
                : styles.inactiveFilterText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {taskList.length === 0 ? (
        <View style={styles.noTasksContainer}>
          <Image source={noTasks} style={styles.noTasksImage} />

          <Text style={styles.noTasks}>No tasks found!</Text>
        </View>
      ) : (
        <FlatList
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          data={taskList}
          renderItem={({item, index}) => {
            return <TaskCard task={item} key={index} />;
          }}
          style={styles.taskList}
        />
      )}
    </SafeAreaView>
  );
};

export default Task;
