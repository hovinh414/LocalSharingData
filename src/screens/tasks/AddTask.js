import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './addTask.style';
import {COLORS} from '../../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateModal from './DateModal';
import TimeModal from './TimeModal';
import {SelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const AddTask = ({navigation}) => {
  const [detailTasks, setDetailTasks] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const createTaskObject = () => {
    const taskObject = {
      detailTasks: detailTasks,
      date: date,
      time: time,
      title: title,
      selected: selected,
      description: description,
      participants: participants,
      images: [],
      files: [],
      isDone: false
    };
    return taskObject;
  };
  const [newTask, setNewTask] = useState();
  const handleAddTask = () => {
    if (detailTasks.some(item => !item.description)) {
      Alert.alert('Notification', 'Please enter subtask description');
      return;
    }
    const newTask = {isDone: false, description: ''};
    setDetailTasks([...detailTasks, newTask]);
  };
  const handleDeleteAllTask = () => {
    setDetailTasks([]);
  };
  const handleCreateTask = async () => {
    try {
      if (
        !time ||
        !date ||
        detailTasks.length === 0 ||
        !title ||
        !description ||
        !participants ||
        !selected
      ) {
        alert('Nhập đủ thông tin đi các cậu');
        return;
      }

      const data = await AsyncStorage.getItem('taskKey')

      if (data === null) {
        const taskObject = [createTaskObject()]
        await AsyncStorage.setItem('taskKey', JSON.stringify(taskObject));
      }
      else {
        const taskObject = createTaskObject();
        const newData = JSON.parse(data)

        newData.push(taskObject)


        await AsyncStorage.setItem('taskKey', JSON.stringify(newData))
      }


      console.log('Task saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving task to AsyncStorage:', error);
    }
  };
  const getTaskFromStorage = async () => {
    // await AsyncStorage.clear()
    try {
      const taskJSON = await AsyncStorage.getItem('taskKey');

  
      if (taskJSON) {
        const taskObject = JSON.parse(taskJSON);
        console.log('Task from AsyncStorage:', taskObject);
      } else {
        console.log('No task found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error getting task from AsyncStorage:', error);
    }
  };
  const handleDeleteTask = index => {
    const updatedTasks = [...detailTasks];
    updatedTasks.splice(index, 1);
    setDetailTasks(updatedTasks);
  };

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const handleOnPressStartTime = () => {
    setOpenStartTimePicker(!openStartTimePicker);
  };
  const data = [
    {key: '1', value: 'High'},
    {key: '2', value: 'Medium'},
    {key: '3', value: 'Low'},
  ];
  return (
    <ScrollView style={styles.modalContainer}>
      <View>
        {/* Your content for the small screen */}
        <DateModal
          visible={openStartDatePicker}
          onDateChanged={handleChangeStartDate}
          setDate={date => setDate(moment(date, "YYYY/MM/DD").format("DD/MM/YYYY").toString())}
          handleOnPressStartDate={handleOnPressStartDate}
        />
        <TimeModal
          visible={openStartTimePicker}
          setTime={time => setTime(time)}
          handleOnPressStartDate={handleOnPressStartTime}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={25} color={COLORS.black} />
          <Text style={styles.date}>Back</Text>
        </TouchableOpacity>

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={'Enter new task here'}
            placeholderTextColor={'#999'}
            keyboardType={'default'}
            style={styles.textInput}
            onChangeText={title => setTitle(title)}
          />
        </View>
        <Text style={styles.title}>Deadline</Text>
        <View style={styles.dateTime}>
          {/* Your other components */}
          <TouchableOpacity
            onPress={handleOnPressStartDate}
            style={styles.dateTimeView}>
            <Ionicons name="calendar-outline" size={27} style={styles.icon} />
            {!date ? (
              <Text style={styles.date}>Date</Text>
            ) : (
              <Text style={styles.date}>
                {date.slice(0, 10).split('/').reverse().join('/')}
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleOnPressStartTime}
            style={styles.dateTimeView}>
            <Ionicons name="time-outline" size={27} style={styles.icon} />
            {!time ? (
              <Text style={styles.date}>Time</Text>
            ) : (
              <Text style={styles.date}>{time}</Text>
            )}
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Add detail task</Text>
        <View style={styles.textInputView}>
          <View style={styles.headerAddDetail}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{flexDirection: 'row'}}
              onPress={handleAddTask}>
              <Ionicons
                name="add-circle-outline"
                size={25}
                color={COLORS.white}
              />
              <Text style={styles.headerText}>Add detail task</Text>
            </TouchableOpacity>
            {detailTasks.length === 0 ? null : (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{flexDirection: 'row', marginRight: 10}}
                onPress={handleDeleteAllTask}>
                <Ionicons name="trash-outline" size={25} color={COLORS.white} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.contentAddDetail}>
            <View>
              {detailTasks.map((item, index) => (
                <View style={styles.taskItem} key={index}>
                  <BouncyCheckbox
                    size={20}
                    isChecked={item.isDone}
                    onPress={newValue => {
                      const updatedTasks = [...detailTasks];
                      updatedTasks[index].isDone = newValue;
                      setDetailTasks(updatedTasks);
                    }}
                    fillColor="#005792"
                    unfillColor="#FFFFFF"
                  />
                  <TextInput
                    value={item.description}
                    onChangeText={text => {
                      const updatedTasks = [...detailTasks];
                      updatedTasks[index].description = text;
                      setDetailTasks(updatedTasks);
                    }}
                    placeholder="Subtask description"
                    style={styles.taskTextInput}
                  />
                  <TouchableOpacity onPress={() => handleDeleteTask(index)}>
                    <Ionicons
                      name="close-circle-outline"
                      size={20}
                      color={COLORS.gray}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TextInput
              multiline
              placeholder={'Add notes or task descriptions'}
              placeholderTextColor={'#999'}
              keyboardType={'default'}
              style={styles.contentInput}
              onChangeText={description => setDescription(description)}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.title}>Participants</Text>
            <TextInput
              style={styles.participants}
              placeholder="10"
              onChangeText={text => setParticipants(text)}
            />
          </View>
          <View style={{flexDirection: 'column', marginRight: 50}}>
            <Text style={styles.title}>Priority</Text>
            <SelectList
              setSelected={val => setSelected(val)}
              data={data}
              save="value"
              boxStyles={styles.box}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleCreateTask}
          activeOpacity={0.8}
          style={styles.buttonView}>
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={getTaskFromStorage}
          activeOpacity={0.8}
          style={styles.buttonView}>
          <Text style={styles.buttonText}>Get Task Demo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTask;
