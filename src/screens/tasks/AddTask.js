import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './addTask.style';
import {COLORS} from '../../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateTimeModal from './DateTimeModal';
import {addYears, format, addDays, parse, daysInWeek} from 'date-fns';
import moment from 'moment';
import { da } from 'date-fns/locale';
const AddTask = ({navigation}) => {
  const [detailTasks, setDetailTasks] = useState([]);
  const [date, setDate] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const formattedTime = moment(date).format('DD/MM/YYYY HH:mm');
  const handleAddTask = () => {
    const newTask = {isDone: false, description: ''};
    setDetailTasks([...detailTasks, newTask]);
  };
  const handleDeleteAllTask = () => {
    setDetailTasks([]);
  };
  const handleCreateTask = () => {
    if(!date || detailTasks.length === 0 || !title || !description) {
      alert('Nhập đủ đi cm tụi mày :))))')
      return
    }
    alert('Lôn Lầm Hehehehe :))))')
  };
  const handleDeleteTask = index => {
    const updatedTasks = [...detailTasks];
    updatedTasks.splice(index, 1);
    setDetailTasks(updatedTasks);
  };
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <View>
        {/* Your content for the small screen */}
        <DateTimeModal
          visible={openStartDatePicker}
          onDateChanged={handleChangeStartDate}
          setDate={date => setDate(date)}
          handleOnPressStartDate={handleOnPressStartDate}
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
            onPress={handleOnPressStartDate}
            style={styles.dateTimeView}>
            <Ionicons name="time-outline" size={27} style={styles.icon} />
            {!date ? (
              <Text style={styles.date}>Time</Text>
            ) : (
              <Text style={styles.date}>
                {date.slice(-5)}
              </Text>
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
                style={{flexDirection: 'row', marginRight:10}}
                onPress={handleDeleteAllTask}>
                <Ionicons
                  name="trash-outline"
                  size={25}
                  color={COLORS.white}
                />
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
                    onValueChange={newValue => {
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
        <TouchableOpacity onPress={handleCreateTask} activeOpacity={0.8} style={styles.buttonView}>
          <Text style={styles.buttonText}>Create Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTask;
