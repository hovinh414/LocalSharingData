import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Modal from 'react-native-modal';
import {COLORS} from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import TaskCardSend from './TaskCardSend';
const ChooseTask = ({visible, onRequestClose, onSelectTasks}) => {
  let today = moment().format('YYYY-MM-DD');
  const navigation = useNavigation();
  const [date, setDate] = useState(today);
  const [taskList, setTaskList] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const getDataFromStorage = async () => {
    const storageData = await AsyncStorage.getItem('taskKey');
    const data = JSON.parse(storageData);
    const regularTasks = data.filter(
      task =>
        task.date === moment(date).format('DD/MM/YYYY') &&
        task.isDone === false,
    );
    setTaskList(regularTasks);
  };
  useEffect(() => {
    getDataFromStorage();
  }, [visible]);
  const handleTaskCardPress = task => {
    // Thêm logic tương ứng khi TaskCard được click
    setSelectedTasks([...selectedTasks, task]);
    setTaskList(prevTaskList => prevTaskList.filter(item => item.taskId !== task.taskId));
  };
  const closeModal = () => {
    onRequestClose();
    setSelectedTasks([]);
    onSelectTasks(selectedTasks);
  };
  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={closeModal}
      customBackdrop={
        <TouchableWithoutFeedback onPress={closeModal}>
          <View
            style={{
              flex: 1,
            }}
          />
        </TouchableWithoutFeedback>
      }
      avoidKeyboard={true}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingBottom: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            padding: 15,
            borderBottomColor: '#cccc',
            zIndex: 2,
          }}>
          <TouchableOpacity onPress={closeModal} activeOpacity={0.8}>
            <Text
              style={{
                fontWeight: '500',
                fontSize: 18,
                color: COLORS.primary,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={{fontWeight: 'bold', fontSize: 19}}>Choose Task</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={{
                fontWeight: '600',
                fontSize: 18,
                color: COLORS.blue,
              }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 25,
            top: -25,
          }}>
          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={taskList}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TaskCardSend
                    task={item}
                    key={index}
                    navigation={navigation}
                    onTaskCardPress={handleTaskCardPress}
                    selectedTasks={selectedTasks}
                    setSelectedTasks={setSelectedTasks}
                    checkTask={() => checkTask(item)}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ChooseTask;
