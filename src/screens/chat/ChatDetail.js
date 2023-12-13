import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Image,
  AppState
} from 'react-native';
import {images, COLORS} from '../../../constants';
import styles from './chatDetail.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagesPickers from 'react-native-image-picker';
import {GiftedChat} from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-crop-picker';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {GetStoragePermissions} from '../../../hook/GetPermissions';
import DocumentPicker from 'react-native-document-picker';
import p2pService from '../../../hook/P2PService';
import RNFS from 'react-native-fs';
import {useSelector} from 'react-redux';
import ChooseTask from '../../common/ChooseTask';
import TaskCardSend from '../../common/TaskCardSend';
import TaskCard from '../../common/TaskCard';

const ChatDetail = ({navigation, route}) => {
  // Server variables
  const device = route.params;
  const user = useSelector(state => state.P2P.user);
  const isOwner = user.isOwner;

  const {chatId} = useSelector(state => state.P2P)

  // console.log('route: ', route);

  // ---------------------------
  // Messages, images, files variables
  const messageRef = useRef('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(device.messages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [photos, setPhotos] = useState([]); // ảnh từ take photo
  const [videos, setVideos] = useState([]); // video từ record video
  const [files, setFiles] = useState([]); // chọn file từ attach
  const [showChooseTask, setShowChooseTask] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [taskSends, setTaskSends] = useState([]);
  // ---------------------------
  // Bottomsheet variables
  const cameraBottomSheetModalRef = useRef(null);
  const cameraSnapPoints = useMemo(() => ['15%', '15%'], []);

  // Hàm chuyển đổi URI thành đường dẫn thực tế
  const uriToFilePath = async uri => {
    try {
      if (uri.startsWith('file://')) {
        // Nếu là URI file://, sử dụng trực tiếp
        return uri.substring(7); // Bỏ đi 'file://'
      } else if (uri.startsWith('content://')) {
        // Nếu là URI content://, sao chép tệp vào thư mục local và sử dụng đường dẫn local
        const fileName = uri.split('/').pop();
        const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        await RNFS.copyFile(uri, localPath);
        return localPath;
      } else {
        // Các trường hợp khác, không xử lý
        return null;
      }
    } catch (error) {
      console.error('Error converting URI to file path:', error);
      return null;
    }
  };

  const createTextMessageObject = text => {
    const newMessage = {
      _id: Math.random().toString(),
      text: text,
      createdAt: new Date(),
      user: {
        _id: 1, // Tin nhắn của phía người nhắn
      },
    };

    messageRef.current.clear();
    setMessage('')
    // Hiển thị tin nhắn trên UI
    setMessages(prevMessages => [newMessage, ...prevMessages]);
    // Lưu tin nhắn trong storage
    updateMessagesCallback(newMessage);
  };

  const updateMessagesCallback = newMessage => {
    // Update the messages in the current chat in the Chat component
    const updatedChatList = p2pService.chatList.map(chat =>
      chat.chatId === device.chatId
        ? {...chat, messages: [newMessage, ...chat.messages]}
        : chat,
    );

    p2pService.updateChatHistory(updatedChatList);
  };

  const handleSendMessage = (text, image, file) => {
    setSelectedTasks([]);
    setTaskSends([...taskSends, ...selectedTasks]);
    console.log(text, image, file);
    if (text === '') {
      if (image && !file) {
        p2pService.onSendImage(image);
        // onSendImages(image);
        console.log('chỉ send ảnh');
      } else if (!image && file) {
        p2pService.onSendFiles(file);
      }
    } else {
      if (image && !file) {
        p2pService.onSendMessage(text);
        createTextMessageObject(text);

        p2pService.onSendImage(image);
      } else if (!image && file) {
        p2pService.onSendImage(text);
        p2pService.onSendFile(file);
      } else if (!image && !file) {
        p2pService.onSendMessage(text);
        createTextMessageObject(text);
      }
    }
  };

  function removeItems(item) {
    if (item.type && item.type.startsWith('image/')) {
      const newSelectedImages = selectedImages.filter(
        listItem => listItem !== item,
      );
      setSelectedImages(newSelectedImages);
      const newFiles = files.filter(listItem => listItem !== item);
      setFiles(newFiles);
    }
    // Kiểm tra nếu item là tệp
    else if (item.type) {
      const newFiles = files.filter(listItem => listItem !== item);
      setFiles(newFiles);
    } else if (selectedTasks) {
      const newTasks = selectedTasks.filter(listItem => listItem !== item);
      setSelectedTasks(newTasks);
    }
    // const newPhoto = photo.filter(listItem => listItem !== item);
    // setPhoto(newPhoto);
  }

  // ---------------------------
  const handleShowCameraBottomSheet = () => {
    cameraBottomSheetModalRef.current?.present();
  };
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => cameraBottomSheetModalRef.current?.close()}
      />
    ),
    [],
  );

  const getFileImage = item => {
    switch (item.type) {
      case 'image/jpeg':
      case 'image/png':
        return <Image source={{uri: item.uri}} style={styles.image} />;
      case 'application/pdf':
        return <Image source={images.pdf} style={styles.image} />;
      case 'text/plain':
        return <Image source={images.txt} style={styles.image} />;
      case 'audio/mpeg':
      case 'audio/flac':
      case 'audio/amr':
        return <Image source={images.mp3} style={styles.image} />;
      case 'video/mp4':
        return <Image source={images.video} style={styles.image} />;
      case 'application/vnd.ms-excel':
        return <Image source={images.xls} style={styles.image} />;
      case 'application/msword':
        return <Image source={images.doc} style={styles.image} />;
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return <Image source={images.ppt} style={styles.image} />;
      default:
        return <Image source={images.file} style={styles.image} />;
    }
  };
  const takePhoto = () => {
    cameraBottomSheetModalRef.current?.close();
    try {
      ImagePicker.openCamera({mediaType: 'photo'}).then(result => {
        console.log(result);
        setPhotos(result);

        p2pService.onSendImages(result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const recordVideo = () => {
    cameraBottomSheetModalRef.current?.close();
    try {
      ImagePicker.openCamera({mediaType: 'video'}).then(result => {
        console.log(result);
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleImageSelection = async () => {
    const check = await GetStoragePermissions();

    if (check) {
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
    }
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
        quality: 1,
      });

      console.log(result);

      // Thêm thuộc tính filePath cho mỗi đối tượng trong mảng result
      const updatedResult = await Promise.all(
        result.map(async item => ({
          ...item,
          filePath: await uriToFilePath(item.uri),
        })),
      );

      // Cập nhật state files bằng kết quả đã được cập nhật
      setFiles(updatedResult);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Người dùng đã hủy việc chọn tệp
      } else {
        throw err;
      }
    }
  };
  // Lấy list selected Task từ Modal

  const handleSelectTasks = tasks => {
    // Xử lý giá trị selectedTasks ở đây
    setSelectedTasks([...selectedTasks, ...tasks]);
  };
  const renderComposer = props => (
    <View style={styles.bottomContainer}>
      <ChooseTask
        visible={showChooseTask}
        onRequestClose={() => setShowChooseTask(false)}
        onSelectTasks={handleSelectTasks} // Gửi hàm callback vào ChooseTask
      />
      {isOwner ? (
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={[...selectedImages, ...files]} /// chỗ này show list ảnh
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.viewImage} key={index}>
                      {getFileImage(item)}

                      <TouchableOpacity
                        onPress={() => removeItems(item)}
                        style={styles.btnRemoveImage}>
                        <MaterialIcons
                          name="delete"
                          size={20}
                          color={COLORS.black}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                  // console.log(item)
                }}
              />
              <FlatList
                data={selectedTasks}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => removeItems(item)}
                        style={styles.btnRemoveImage}>
                        <MaterialIcons
                          name="delete"
                          size={20}
                          color={COLORS.black}
                        />
                      </TouchableOpacity>
                      <TaskCardSend
                        task={item}
                        key={index}
                        navigation={navigation}
                      />
                    </View>
                  );
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.input}
                ref={messageRef}
                placeholder="Type your message..."
                onChangeText={text => setMessage(text)}
                {...props}
              />

              {message ||
              selectedImages.length !== 0 ||
              files.length !== 0 ||
              selectedTasks.length !== 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    handleSendMessage(message, selectedImages[0], files[0])
                  }>
                  <Image
                    source={images.send}
                    style={[styles.imgBtn, {marginHorizontal: 5}]}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={() => setShowChooseTask(true)}>
                    <Image
                      source={images.task}
                      size={25}
                      style={[styles.imgBtn, {marginHorizontal: 5}]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleImageSelection()}>
                    <Image
                      source={images.image}
                      size={23}
                      style={[styles.imgBtn, {marginHorizontal: 5}]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => pickDocument()}>
                    <Image
                      source={images.attach}
                      size={25}
                      style={[styles.imgBtn, {marginHorizontal: 5}]}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : device.check ? (
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={[...selectedImages, ...files]} /// chỗ này show list ảnh
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.viewImage} key={index}>
                      {getFileImage(item)}

                      <TouchableOpacity
                        onPress={() => removeItems(item)}
                        style={styles.btnRemoveImage}>
                        <MaterialIcons
                          name="delete"
                          size={20}
                          color={COLORS.black}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                  // console.log(item)
                }}
              />
              <FlatList
                data={selectedTasks}
                horizontal={true}
                renderItem={({item, index}) => {
                  return (
                    <View>
                      <TaskCardSend
                        task={item}
                        key={index}
                        navigation={navigation}
                      />
                    </View>
                  );
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                style={styles.input}
                ref={messageRef}
                placeholder="Type your message..."
                onChangeText={text => setMessage(text)}
                {...props}
              />

              {message ||
              selectedImages.length !== 0 ||
              files.length !== 0 ||
              selectedTasks.length !== 0 ? (
                <TouchableOpacity
                  onPress={() =>
                    handleSendMessage(message, selectedImages[0], files[0])
                  }>
                  <Image
                    source={images.send}
                    style={[styles.imgBtn, {marginHorizontal: 5}]}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={() => handleImageSelection()}>
                    <Image
                      source={images.image}
                      size={25}
                      style={[styles.imgBtn, {marginHorizontal: 5}]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => pickDocument()}>
                    <Image
                      source={images.attach}
                      size={25}
                      style={[styles.imgBtn, {marginHorizontal: 5}]}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
  const renderActions = props => (
    <View style={styles.cameraContainer}>
      {isOwner ? (
        <TouchableOpacity onPress={handleShowCameraBottomSheet}>
          <Image source={images.camera} style={styles.cameraImg} />
        </TouchableOpacity>
      ) : device.check ? (
        <TouchableOpacity onPress={handleShowCameraBottomSheet}>
          <Image source={images.camera} style={styles.cameraImg} />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => {
      const chatData = JSON.parse(await AsyncStorage.getItem('chatHistory'))

      const indexToUpdate = chatData.findIndex(
        item => item.chatId === chatId
      )
  
      chatData[indexToUpdate].messages = [...chatData[indexToUpdate].messages, p2pService.messages]
  
      await AsyncStorage.setItem('chatHistory', JSON.stringify(chatData))

      console.log('back')
    })


    return () => {
      // AppState.removeEventListener('change', handleAppStateChange)

      unsubscribe()
    }
  }, [navigation])

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView style={styles.container} enabled>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={images.left} size={25} style={styles.imgBtn} />
          </TouchableOpacity>
          <Image
            source={device.img ? device.img : images.profile}
            style={styles.avatarDetail}
          />
          <Text style={styles.deviceNameText}>{device.deviceName}</Text>
        </View>
        <View>
          <FlatList
            data={taskSends}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TaskCard
                    task={item}
                    key={index}
                    navigation={navigation}
                  />
                </View>
              );
            }}
          />
        </View>
        <GiftedChat
          messages={messages}
          // onSend={text => onSendMessage(text)}
          user={{
            _id: 1,
          }}
          messagesContainerStyle={styles.messagesContainer}
          renderComposer={renderComposer}
          renderActions={renderActions}
        />

        <BottomSheetModal
          ref={cameraBottomSheetModalRef}
          index={1}
          snapPoints={cameraSnapPoints}
          // onChange={handleSheetChanges}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}>
          <View style={styles.bottomSheetItemContainer}>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={takePhoto}>
              <Ionicons
                name="images-outline"
                size={30}
                color={COLORS.primary}
              />
              <Text style={styles.btnText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={recordVideo}>
              <Ionicons
                name="videocam-outline"
                size={30}
                color={COLORS.primary}
              />
              <Text style={styles.btnText}>Record Video</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

export default ChatDetail;
