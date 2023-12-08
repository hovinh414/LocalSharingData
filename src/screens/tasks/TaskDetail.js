import {
  Alert,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  FlatList,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
import DocumentPicker from 'react-native-document-picker';
import SubTaskItem from '../../common/SubTaskItem';
import RNFS from 'react-native-fs';
import styles from './taskDetail.style';
import {COLORS, SIZES, images} from '../../../constants';
import {tasks} from '../../../assets/data/tasks';
import ViewVideo from '../../common/ViewVideo';
import countCompletedSubTask from './methods/countCompletedSubTask';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';

const TaskDetail = ({navigation, route}) => {
  const [task, setTask] = useState(route.params);
  const [taskArray, setTaskArray] = useState([]);
  const [files, setFiles] = useState(task.files.length === 0 ? [] : task.files);
  const [photos, setPhotos] = useState([]);
  const allItems = [...photos, ...files];
  const [isOptionModalOpen, setIsOptionModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fileData, setFileData] = useState();
  const [note, setNote] = useState('');
  const [countCheck, setCountCheck] = useState(0); //đếm task con hoàn thành
  const [joined, setJoined] = useState(false);

  const {user} = useSelector(state => state.P2P);
  const handleCheckBoxChange = isChecked => {
    setCountCheck(isChecked ? countCheck + 1 : countCheck - 1);
  };

  const createTaskObject = detailTasks => {
    const taskObject = {
      taskId: task.taskId,
      detailTasks: detailTasks,
      date: task.date,
      time: task.time,
      title: task.title,
      selected: task.selected,
      description: task.description,
      maxParticipants: task.maxParticipants,
      images: task.images,
      files: files,
      joinedParticipants: task.joinedParticipants,
      isDone: task.isDone,
      note: note.trim(),
    };
    return taskObject;
  };

  const handleSubmitTask = async () => {
    const updatedTask = task.detailTasks.map(detail => ({
      ...detail,
      isDone: true,
    }));

    const taskObject = createTaskObject(updatedTask);

    try {
      let newArray = JSON.parse(await AsyncStorage.getItem('taskKey'));

      const indexToUpdate = newArray.findIndex(
        item => item.taskId === task.taskId,
      );

      newArray[indexToUpdate] = taskObject;

      await AsyncStorage.setItem('taskKey', JSON.stringify(newArray));

      ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
    } catch (err) {}
  };

  const getFileImage = item => {
    switch (item.type) {
      case 'image/jpeg':
      case 'image/png':
        return <Image source={{uri: item.uri}} style={styles.fileImg} />;
      case 'application/pdf':
        return <Image source={images.pdf} style={styles.fileImg} />;
      case 'text/plain':
        return <Image source={images.txt} style={styles.fileImg} />;
      case 'audio/mpeg':
      case 'audio/flac':
      case 'audio/amr':
        return <Image source={images.mp3} style={styles.fileImg} />;
      case 'video/mp4':
        return <Image source={images.video} style={styles.fileImg} />;
      case 'application/vnd.ms-excel':
        return <Image source={images.xls} style={styles.fileImg} />;
      case 'application/msword':
        return <Image source={images.doc} style={styles.fileImg} />;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return <Image source={images.ppt} style={styles.fileImg} />;
      default:
        return <Image source={images.file} style={styles.fileImg} />;
    }
  };
  const readFile = async item => {
    await RNFS.readFile(item.uri).then(result => setFileData(result));
  };
  const renderFileContent = item => {
    if (item.mime === 'image/jpeg') {
      return <Image source={{uri: item.path}} style={styles.fileContentImg} />;
    }

    switch (item.type) {
      case 'image/jpeg':
      case 'image/png':
        return <Image source={{uri: item.uri}} style={styles.fileContentImg} />;
      case 'video/mp4':
        return <ViewVideo uri={item.uri} />;
      case 'text/plain':
        readFile(item);
        return <Text style={styles.fileText}>{fileData}</Text>;
      // Xử lý các loại tệp tin khác tương tự
      default:
        return null; // Trả về null nếu không khớp với bất kỳ loại tệp nào
    }
  };
  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
        quality: 1,
      });
      console.log(result);

      if (!files) {
        setFiles(result);
        setIsOptionModalOpen(false);
      } else {
        setFiles([...files, ...result]);
        setIsOptionModalOpen(false);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const handleTakePhoto = () => {
    try {
      ImagePicker.openCamera({mediaType: 'photo'}).then(photo => {
        const newPhoto = [...photos, photo]; // Thêm ảnh mới vào danh sách
        setPhotos(newPhoto);
        console.log(photo);
        setIsOptionModalOpen(false);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRecordAudio = () => {
    try {
      ImagePicker.open;
    } catch (error) {}
  };
  const handleDeleteFile = index => {
    const updatedItems = [...allItems];
    updatedItems.splice(index, 1);
    const updatedPhotos = updatedItems.filter(
      item => item.mime === 'image/jpeg',
    );
    const updatedFiles = updatedItems.filter(
      item => item.mime !== 'image/jpeg',
    );

    setPhotos(updatedPhotos);
    setFiles(updatedFiles);
  };
  const handleDetailItem = item => {
    setIsDetailModalOpen(true);
    console.log(item);
    setSelectedItem(item);
  };

  useEffect(() => {
    if (task.joinedParticipants.length === 0) {
      setJoined(false);
    } else {
      for (let item of task.joinedParticipants) {
        if (item.deviceName === user.deviceName) {
          setJoined(true);
        }

        break;
      }
    }
  }, [task.joinedParticipants, user.deviceName]);

  // console.log(joined)
  let checkManager = task.joinedParticipants.some(
    participant => participant.deviceName === user.deviceName,
  );
  function areAllDetailTasksDone(task) {
    return task.detailTasks.every(detailTask => detailTask.isDone);
  }

  const isAllDetailTasksDone = areAllDetailTasksDone(task);
  const createConfirmTask = (task, isDone) => {
    const taskObject = {
      taskId: task.taskId,
      detailTasks: task.detailTasks,
      date: task.date,
      time: task.time,
      title: task.title,
      selected: task.selected,
      description: task.description,
      maxParticipants: task.maxParticipants,
      images: task.images,
      files: task.files,
      joinedParticipants: task.joinedParticipants,
      isDone: isDone,
      note: task.note.trim(),
    };
    return taskObject;
  };

  const handleConfirmTask = async () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc muốn xác nhận task này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },

        {
          text: 'Xác nhận',
          onPress: async () => {
            const updatedTask = {
              ...task,
              isDone: true,
            };

            const taskObject = createConfirmTask(updatedTask, true);

            try {
              let newArray = JSON.parse(await AsyncStorage.getItem('taskKey'));

              const indexToUpdate = newArray.findIndex(
                item => item.taskId === task.taskId,
              );

              newArray[indexToUpdate] = taskObject;

              await AsyncStorage.setItem('taskKey', JSON.stringify(newArray));

              ToastAndroid.show('Cập nhật thành công!', ToastAndroid.SHORT);
            } catch (err) {
              console.error('Lỗi khi cập nhật task:', err);
            }
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} enabled>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={images.left} size={25} style={styles.backBtn} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Task Details</Text>
        <View style={{width: 25, height: 25}} />
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.frameContainer}>
            <View style={styles.inforContainer}>
              <Text style={styles.titleText}>{task.title}</Text>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.descText}>{task.description}</Text>
                {task.images.length !== 0 ? (
                  <FlatList
                    horizontal
                    data={task.images}
                    renderItem={item => (
                      <Image source={item.item} style={styles.imgItem} />
                    )}
                    style={styles.imgFlatList}
                    showsHorizontalScrollIndicator={false}
                  />
                ) : null}
              </View>

              <View style={styles.optionContainer}>
                <View style={styles.dateTimeContainer}>
                  <MaterialCommunityIcons
                    name="alarm"
                    size={SIZES.medium}
                    color={COLORS.red}
                  />
                  <Text style={styles.timeText}>
                    {task.time} - {task.date}
                  </Text>
                </View>

                <View style={styles.memberContainer}>
                  <MaterialCommunityIcons
                    name="account-group"
                    size={SIZES.medium}
                    color={COLORS.primary}
                  />
                  <Text style={styles.memberText}>
                    {task.joinedParticipants.length}/{task.maxParticipants}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.inputContainer}>
              {allItems.length !== 0 ? (
                <FlatList
                  horizontal
                  data={allItems}
                  renderItem={({item, index}) => {
                    if (item.mime === 'image/jpeg') {
                      return (
                        <TouchableOpacity
                          onPress={() => handleDetailItem(item)}>
                          <View>
                            <Image
                              source={{uri: item.path}}
                              style={styles.imgItem}
                            />
                            <TouchableOpacity
                              style={styles.btnDelete}
                              onPress={() => handleDeleteFile(index)}>
                              <MaterialCommunityIcons
                                name="minus-circle"
                                size={SIZES.xLarge}
                                color={COLORS.red}
                              />
                            </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={() => handleDetailItem(item)}>
                          <View style={styles.fileContainer}>
                            <View>
                              {getFileImage(item)}
                              <TouchableOpacity
                                style={styles.btnDelete}
                                onPress={() => handleDeleteFile(index)}>
                                <MaterialCommunityIcons
                                  name="minus-circle"
                                  size={SIZES.xLarge}
                                  color={COLORS.red}
                                />
                              </TouchableOpacity>
                            </View>

                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              style={styles.fileName}>
                              {item.name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }
                  }}
                  style={styles.imgFlatList}
                  showsHorizontalScrollIndicator={false}
                />
              ) : null}

              {task.isDone ? (
                <Text style={styles.textInput}>{task.note}</Text>
              ) : (
                <TextInput
                  placeholder="Add note..."
                  multiline
                  textAlign="left"
                  defaultValue={task.note === '' ? '' : 'Note: ' + task.note}
                  style={styles.textInput}
                  placeholderTextColor={COLORS.gray2}
                  editable={joined}
                  onChangeText={text => setNote(text)}
                />
              )}

              {task.isDone ? (
                <View>
                  <Entypo
                    name="attachment"
                    size={SIZES.large}
                    color={COLORS.secondary}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => setIsOptionModalOpen(true)}
                  disabled={!joined}>
                  <Entypo
                    name="attachment"
                    size={SIZES.large}
                    color={COLORS.secondary}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.frameContainer}>
            <View style={styles.subContainer}>
              <Text style={styles.titleSubText}>Sub-Tasks</Text>

              <View style={{paddingHorizontal: 10}}>
                {task.detailTasks.length !== 0 ? (
                  task.detailTasks.map((item, index) => {
                    return (
                      <SubTaskItem
                        key={index}
                        task={item}
                        onCheckBoxChange={handleCheckBoxChange}
                        clickable={task.isDone ? null : joined}
                      />
                    );
                  })
                ) : (
                  <Text> No subtasks available</Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {countCheck === task.detailTasks.length ? (
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitTask}>
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableOpacity>
        ) : isAllDetailTasksDone && checkManager && !task.isDone ? (
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleConfirmTask}>
            <Text style={styles.btnText}>CONFIRM TASK</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <Modal
        animationType="fade"
        visible={isOptionModalOpen}
        transparent={true}
        onRequestClose={() => setIsOptionModalOpen(false)}>
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setIsOptionModalOpen(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.insideModalOption}>
              <TouchableOpacity
                style={styles.modalItem}
                activeOpacity={1}
                onPress={() => handlePickDocument()}>
                <View style={styles.iconContainer}>
                  <FontAwesome
                    name="file-text"
                    size={SIZES.large}
                    color="green"
                  />
                </View>
                <Text style={styles.textModalItem('green')}>File/Document</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalItem}
                activeOpacity={1}
                onPress={() => handleTakePhoto()}>
                <View style={styles.iconContainer}>
                  <FontAwesome
                    name="camera"
                    size={SIZES.large}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.textModalItem(COLORS.primary)}>
                  Take a Photo
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalItem, {borderBottomWidth: 0}]}
                activeOpacity={1}
                onPress={() => handleRecordAudio()}>
                <View style={styles.iconContainer}>
                  <FontAwesome
                    name="microphone"
                    size={SIZES.large}
                    color={COLORS.red}
                  />
                </View>
                <Text style={styles.textModalItem(COLORS.red)}>
                  Record Audio
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="fade"
        visible={isDetailModalOpen}
        transparent={true}
        onRequestClose={() => setIsDetailModalOpen(false)}>
        {/* <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setIsDetailModalOpen(false)}> */}
        <Pressable
          style={styles.modalContainer}
          onPress={event => {
            if (event.target === event.currentTarget) {
              setIsDetailModalOpen(false);
            }
          }}>
          <View style={styles.insideModalDetail}>
            <ScrollView>
              {selectedItem && renderFileContent(selectedItem)}
            </ScrollView>
          </View>
        </Pressable>
        {/* </TouchableOpacity> */}
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default TaskDetail;
