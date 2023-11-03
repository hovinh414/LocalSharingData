import React, {useState, useCallback, useMemo, useRef, useEffect} from 'react';
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {COLORS} from '../../../constants';
import {images} from '../../../constants';
import {
  connect,
  receiveMessage,
  sendMessage,
  getConnectionInfo,
} from 'react-native-wifi-p2p';
import styles from './chatDetail.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LogBox} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import TcpSocket from 'react-native-tcp-socket';
import {io} from 'socket.io-client';
import {
  onCreateGroup,
  onGetConnectionInfo,
  onRemoveGroup,
} from '../../../hook/FunctionsP2P';
import ImagePicker from 'react-native-image-crop-picker';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {GetStoragePermissions} from '../../../hook/GetPermissions';
import LibraryImageCard from '../../common/LibraryImageCard';
import {useDispatch, useSelector} from 'react-redux';
import {removeAllSelectedImages} from '../../redux/reducers';

const PORT = 6000;
const IP = '192.168.49.1';
const SERVER_IP = '127.0.0.1';
const IPIDK = '25.226.115.47';

const ChatDetail = ({navigation, route}) => {
  // Server variables
  const item = route.params;
  const {isOwner} = route.params;
  const receiveInterval = useRef(null);
  const connectionInterval = useRef(null);

  useEffect(() => {
    const unsubcribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });
    unsubcribe();

    NetInfo.fetch().then(state =>
      console.log(['DEVICES IP'], state.details.ipAddress),
    );

    connectionInterval.current = setInterval(() => {
      onGetConnectionInfo();
    }, 10000);

    if (isOwner) {
      // SERVER SIDE

      // create the group
      console.log('[INFO] Creating the group...');
      onCreateGroup();

      // onRemoveGroup();
      receiveInterval.current = setInterval(() => onReceiveMessage(), 100);

      // Creating a socket at the server side.
      console.log('[SOCKET] Creating socket at the server side');
      let server = TcpSocket.createServer(socket => {
        socket.write('hello from server');

        socket.on('data', data => Alert.alert(data));

        socket.on('error', error =>
          console.log('An error ocurred with client socket ', error),
        );

        socket.on('close', error => {
          console.log('Closed connection with ', socket.address());
        });
      }).listen({port: PORT, host: SERVER_IP}, () => {
        console.log('Server is up and running on', PORT, SERVER_IP);
      });

      server.on('error', error => {
        console.log('An error ocurred with the server', error);
      });

      server.on('close', () => {
        console.log('Server closed connection');
      });

      let second_client = TcpSocket.createConnection(
        {port: PORT, host: SERVER_IP},
        () => {
          console.log('Client connected successfully');
        },
      );

      second_client.on('error', err => console.log(err));
    } else {
      // CLIENT SIDE

      // Connect to the group created by the server
      connect(item.deviceAddress)
        .then(() => {
          console.log('[INFO] Client connected to the group');
        })
        .catch(err =>
          console.log('[FATAL] Unable to connect with the server group'),
        );

      setTimeout(() => {
        getConnectionInfo().then(info => {
          console.log('[GET CONNECTION INFO]', info);
        });
      }, 2000);

      console.log('[SENDING] Connection Message to the server');

      setTimeout(() => {
        console.log('Sending Message...');
        // After connecting to the group, call sendMessage function
        sendMessage('[INFO] Connection got establised !')
          .then(metaInfo =>
            console.log('[INFO] Message from client -> server', metaInfo),
          )
          .catch(err =>
            console.log('[ERROR] Error sending message from client -> server'),
          );
      }, 5000);

      /*
        Hacky setup to receive messages from the server

        This work as follows:
          - [x] Client IP is sent to the server
          - [x] Server socket is created at the client IP
          - Client will join the connection socket of server
          - Server will send message, which client will listen on
      */

      setTimeout(() => {
        let c = io.connect('http://192.168.1.5:6000');
        console.log(c);
        c.on('data', data => {
          console.log(data);
        });

        c.on('error', err => {
          console.log(err);
        });
      }, 10000);
    }

    return () => {
      clearInterval(receiveInterval);
      clearInterval(connectionInterval);
    };
  }, []);

  // Messages, images, files variables
  const dispatch = useDispatch();
  const messageRef = useRef('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      _id: Math.random(1000).toString(),
      text: 'alo',
      createAt: new Date(),
      user: {
        _id: 1,
      },
    },
  ]);
  const selectedImages = useSelector(state => state.P2P.selectedImages);

  const onReceiveMessage = () => {
    receiveMessage()
      .then(text => {
        const msg = [
          {
            _id: Math.random(1000).toString(),
            text: text,
            createAt: new Date(),
            user: {
              _id: 1,
            },
          },
        ];
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, msg),
        );
      })
      .catch(err => console.log('[FATAL] Unable to receive messages'));
  };
  const onSendMessage = useCallback((text = []) => {
    console.log;
    // Kiểm tra xem nội dung tin nhắn có được điền hay không
    if (text) {
      // Tạo một đối tượng tin nhắn
      const newMessage = {
        _id: Math.random().toString(),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      };

      // Thêm tin nhắn mới vào danh sách tin nhắn
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );

      // Xóa nội dung tin nhắn sau khi gửi
      setMessage('');
      messageRef.current.clear();

      // Gửi tin nhắn đến đối tượng khác (thực hiện tùy theo logic của ứng dụng của bạn)
      sendMessage(newMessage.text)
        .then(metaInfo =>
          console.log('[INFO] Send client message successfully', metaInfo),
        )
        .catch(err => console.log('[FATAL] Unable to send client message'));
    }
  }, []);
  const handleSendMessage = () => {
    console.log(message);
  };
  const handleSendImages = () => {
    console.log('Sent: ', selectedImages);
  };
  function removeItems(item) {}

  // Bottomsheet variables
  const cameraBottomSheetModalRef = useRef(null);
  const imageBottomSheetModalRef = useRef(null);
  const cameraSnapPoints = useMemo(() => ['15%', '15%'], []);
  const imageSnapPoints = useMemo(() => ['80%', '80%'], []);
  const [recentPhotos, setRecentPhotos] = useState([]);

  const handleShowCameraBottomSheet = () => {
    cameraBottomSheetModalRef.current?.present();
  };
  const handleShowImageBottomSheet = () => {
    dispatch(removeAllSelectedImages());

    getRecentPhotos();

    imageBottomSheetModalRef.current?.present();
  };
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => {
          dispatch(removeAllSelectedImages());

          imageBottomSheetModalRef.current?.close();
        }}
      />
    ),
    [],
  );
  const takePhoto = () => {
    cameraBottomSheetModalRef.current?.close();
    try {
      ImagePicker.openCamera({mediaType: 'photo'}).then(result => {
        console.log(result);
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
  const getRecentPhotos = async () => {
    const check = await GetStoragePermissions();

    if (check) {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'All',
        include: ['filename', 'playableDuration']
      }).then(r => {
        setRecentPhotos(r.edges)
        // console.log(r.edges)
      })
        .catch(err => {
          console.log(err)
        })
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
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Người dùng đã hủy việc chọn tệp
      } else {
        throw err;
      }
    }
  };

  // return (
  //   <GiftedChat
  //     messages={messages}
  //     onSend={message => onSendMessage(message)}
  //     user={{
  //       _id: 2,
  //     }}
  //   />)

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView style={styles.container} enabled>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.left} size={25} style={styles.imgBtn} />
          </TouchableOpacity>
          <Image
            source={item.img ? item.img : images.profile}
            style={styles.avatarDetail}
          />
          <Text style={styles.deviceNameText}>{item.deviceName}</Text>
        </View>

        {/* <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={
                item.sender === 'me' ? styles.myMessage : styles.theirMessage
              }>
              <Text
                style={
                  item.sender === 'me'
                    ? styles.messageMyText
                    : styles.messageTheirText
                }>
                {item.text}
              </Text>
            </View>
          )}
        />

        <View style={styles.viewIcon}>
          <View style={styles.viewListImage}>
            <FlatList
              data={[...selectedImages, ...photo]} /// chỗ này show list ảnh
              horizontal={true}
              renderItem={({ item, index }) => (
                <View style={styles.viewImage} key={index}>
                  <Image source={{ uri: item.uri }} style={styles.image} />
                  <TouchableOpacity
                    onPress={() => removeItems(item)}
                    style={styles.btnRemoveImage}>
                    <MaterialIcons name="delete" size={20} color={COLORS.black} />
                  </TouchableOpacity>
                </View>
              )}
            />

            <FlatList
              data={selectedFiles}
              horizontal={true}
              renderItem={({item, index}) => (
                <TouchableOpacity style={styles.viewFile} key={index}>
                  <View style={styles.file}>
                    {item.mimeType === 'video/mp4' ? (
                      <Image source={images.video} style={styles.fileIcon} />
                    ) : item.mimeType === 'image/jpeg' ? (
                      <Image source={{uri: item.uri}} style={styles.fileIcon} />
                    ) : (
                      <Image source={images.file} style={styles.fileIcon} />
                    )}
                    <Text style={styles.fileName}>{item.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItems(item)}
                    style={styles.btnRemoveFile}>
                    <MaterialIcons
                      name="delete"
                      size={15}
                      color={COLORS.black}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        </View> */}

        <GiftedChat
          messages={messages}
          onSend={text => onSendMessage(text)}
          messagesContainerStyle={styles.messagesContainer}
          renderInputToolbar={props => (
            <View style={styles.bottomContainer}>
              <View style={styles.cameraContainer}>
                <TouchableOpacity onPress={handleShowCameraBottomSheet}>
                  <Image source={images.camera} style={styles.cameraImg} />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  ref={messageRef}
                  placeholder="Type your message..."
                  onChangeText={text => setMessage(text)}
                  {...props}
                />

                {message ? (
                  <TouchableOpacity onPress={() => onSendMessage(message)}>
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
                    <TouchableOpacity onPress={handleShowImageBottomSheet}>
                      <Image
                        source={images.image}
                        size={25}
                        style={[styles.imgBtn, {marginHorizontal: 5}]}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={pickDocument}>
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
          )}
        />

        <BottomSheetModal
          ref={cameraBottomSheetModalRef}
          index={1}
          snapPoints={cameraSnapPoints}
          // onChange={handleSheetChanges}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}>
          <View style={styles.bottomSheetItemContainer}>
          <TouchableOpacity style={styles.bottomSheetItem} onPress={takePhoto}>
              <Ionicons name='images-outline' size={30} color={COLORS.primary} />
              <Text style={styles.btnText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={recordVideo} >
              <Ionicons name='videocam-outline' size={30} color={COLORS.primary} />
              <Text style={styles.btnText}>Record Video</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>

        <BottomSheetModal
          ref={imageBottomSheetModalRef}
          index={1}
          snapPoints={imageSnapPoints}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}
        >
          <View style={styles.sendBtnContainer}>
            <TouchableOpacity onPress={() => imageBottomSheetModalRef.current?.close()} style={styles.closeBtn}>
              <Ionicons name='close' color={COLORS.primary} size={45} />
            </TouchableOpacity>

            <View style={styles.allImagesTextContainer}>
              <Text style={styles.allImagesText}>All Images</Text>
            </View>

            <View style={{height: 45, width: 45}}>
            {selectedImages.length !== 0
              ? <TouchableOpacity style={styles.sendBtn} onPress={handleSendImages}>
              <MaterialCommunityIcons name='send-circle' color={COLORS.primary} size={45} />
            </TouchableOpacity>
              : null}
            </View>
          </View>

          <BottomSheetFlatList
            data={recentPhotos}
            scrollEnabled={true}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.imageList}
            renderItem={({ item, index }) => {
              return <LibraryImageCard key={index} image={item} />

            }}
          />
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

export default ChatDetail;
