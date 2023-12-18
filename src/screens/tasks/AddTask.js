import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  TextInput,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './addTask.style';
import { COLORS } from '../../../constants';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import DateModal from './DateModal';
import TimeModal from './TimeModal';
import { SelectList } from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as ImagesPickers from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { selectedImagesList } from '../../redux/reducers';
import { useSelector, useDispatch } from 'react-redux';
import { setChatId } from '../../redux/reducers';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { images } from '../../../constants'
import p2pService from '../../../hook/P2PService';
import { onGetGroupInfo } from '../../../hook/FunctionsP2P';

const AddTask = ({ navigation }) => {
  const [detailTasks, setDetailTasks] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [title, setTitle] = useState('');
  const [selected, setSelected] = useState('');
  const [description, setDescription] = useState('');
  const [participants, setParticipants] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [openStartTimePicker, setOpenStartTimePicker] = useState(false);
  const dispatch = useDispatch()
  const user = useSelector(state => state.P2P.user);
  const { chatId } = useSelector(state => state.P2P)
  const createTaskObject = () => {
    const taskObject = {
      taskId: uuidv4(),
      detailTasks: detailTasks,
      date: date,
      time: time,
      title: title.trim(),
      selected: selected,
      description: description.trim(),
      maxParticipants: participants.trim(),
      images: selectedImages,
      files: [],
      joinedParticipants: [],
      isDone: false,
      note: '',
      deviceName: user.deviceName,
    };
    return taskObject;
  };
  const handleAddTask = () => {
    if (detailTasks.some(item => !item.description)) {
      Alert.alert('Notification', 'Please enter subtask description');
      return;
    }
    const newTask = { isDone: false, description: '' };
    setDetailTasks([...detailTasks, newTask]);
  };
  const handleDeleteAllTask = () => {
    setDetailTasks([]);
  };

  const createChatObject = data => {
    return {
      chatId: Math.random().toString(),
      img: images.profile,
      deviceName: data.networkName,
      messages: [{
        _id: Math.random().toString(),
        text: JSON.stringify(createTaskObject()),
        createdAt: new Date(),
        user: {
          _id: 1, // Tin nhắn của phía người nhắn
        },
      }],
    };
  };

  const handleCreateChat = async () => {
    if (p2pService.isServer) {
      console.log('được phép nhắn tin');
      const group = await onGetGroupInfo();
      const item = createChatObject(group);
      const task = createTaskObject()
      p2pService.addChatToChatList(item);
      p2pService.onSendTask(task);
      // setChatList(p2pService.chatList);
      dispatch(setChatId(item.chatId))
      // navigation.navigate('Chat Detail', { item: item, check: true });
    } else {
      ToastAndroid.show('Bạn không có quyền này!!', ToastAndroid.SHORT);
      console.log('CÚT');
    }
  };


  const handleCreateTask = async () => {
    try {
      if (
        !time ||
        !date ||
        detailTasks.length === 0 ||
        !title ||
        !participants ||
        !description ||
        !selected
        // selectedImages.length === 0
      ) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
      } else {
        if (!participants) {
          alert('Vui lòng nhập số người tham gia lớn hơn 0!');

          return;
        }
      }

      const datas = await AsyncStorage.getItem('taskKey');

      if (datas === null) {
        const taskObject = [createTaskObject()];
        await AsyncStorage.setItem('taskKey', JSON.stringify(taskObject));

        ToastAndroid.show('Thêm thành công!', ToastAndroid.SHORT);
      } else {
        const jsonDatas = JSON.parse(datas);

        const taskObject = createTaskObject();

        jsonDatas.push(taskObject);

        await AsyncStorage.setItem('taskKey', JSON.stringify(jsonDatas));

        ToastAndroid.show('Thêm thành công!', ToastAndroid.SHORT);
      }

      if (chatId === '') {
        handleCreateChat()
        console.log('chatid trong')
      }
      else {
        const newMessage = {
          _id: Math.random().toString(),
          text: JSON.stringify(createTaskObject()),
          createdAt: new Date(),
          user: {
            _id: 1, // Tin nhắn của phía người nhắn
          },
        }

        const updatedChatList = p2pService.chatList.map(chat =>
          chat.chatId === chatId
            ? {...chat, messages: [newMessage, ...chat.messages]}
            : chat,
        );

        p2pService.updateChatHistory(updatedChatList)
        console.log('co chat id')
      }

    } catch (error) {
      console.error('Error saving task to AsyncStorage:', error);
    }
  };
  const getTaskFromStorage = async () => {
    // await AsyncStorage.clear();
    try {
      const taskJSON = await AsyncStorage.getItem('chatHistory');

      if (taskJSON) {
        const taskObject = JSON.parse(taskJSON);
        console.log('Task from AsyncStorage:', taskObject[0].messages);
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
    // setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };
  const handleOnPressStartTime = () => {
    setOpenStartTimePicker(!openStartTimePicker);
  };
  const data = [
    { key: '0', value: 'High' },
    { key: '1', value: 'Medium' },
    { key: '2', value: 'Low' },
  ];
  const handleImageSelection = async () => {
    let result = await ImagesPickers.launchImageLibrary({
      mediaType: 'mixed',
      allowMultiSelection: true,
      selectionLimit: 10,
      aspect: [5, 5],
    });
    delete result.cancelled;
    if (!result.canceled) {
      if (!selectedImages) {
        setSelectedImages(result.assets);
      } else {
        setSelectedImages([...selectedImages, ...result.assets]);
      }
    }
  };
  function removeImage(item) {
    const newList = selectedImages.filter(listItem => listItem !== item);
    setSelectedImages(newList);
  }

  const handleInputChange = text => {
    // Loại bỏ các ký tự không phải là số từ chuỗi
    const sanitizedText = text.replace(/[^0-9]/g, '');

    // Kiểm tra xem giá trị đã nhập có lớn hơn 0 không
    if (sanitizedText !== '' && parseInt(sanitizedText) > 0) {
      setParticipants(sanitizedText);
    } else {
      setParticipants('');
    }
  };

  return (
    <ScrollView style={styles.modalContainer}>
      <View>
        {/* Your content for the small screen */}
        <DateModal
          visible={openStartDatePicker}
          onDateChanged={handleChangeStartDate}
          setDate={date =>
            setDate(moment(date, 'YYYY/MM/DD').format('DD/MM/YYYY').toString())
          }
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
              style={{ flexDirection: 'row' }}
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
                style={{ flexDirection: 'row', marginRight: 10 }}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>Participants</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.participants}
              placeholder="10"
              placeholderTextColor={COLORS.gray}
              onChangeText={text => handleInputChange(text)}
            />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={styles.title}>Priority</Text>
            <SelectList
              placeholder="Priority"
              setSelected={val => setSelected(val)}
              data={data}
              save="value"
              boxStyles={styles.box}
              dropdownStyles={{ height: 120 }}
            />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.title}>Images</Text>
            <TouchableOpacity
              onPress={handleImageSelection}
              activeOpacity={0.8}
              style={styles.buttonImage}>
              <MaterialIcons name="image" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={selectedImages}
          horizontal={true}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.listImage}>
              <Image source={{ uri: item.uri }} style={styles.imageTask} />
              <TouchableOpacity
                onPress={() => removeImage(item)}
                style={styles.deleteButton}>
                <MaterialIcons name="delete" size={20} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          )}
        />
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
