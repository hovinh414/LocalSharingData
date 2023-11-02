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
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import {COLORS} from '../../../constants';
import {images} from '../../../constants';
import {
  connect,
  receiveMessage,
  sendMessage,
  getConnectionInfo,
} from 'react-native-wifi-p2p';
import {styles} from './chatDetail.style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
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
import CustomButton from '../../common/CustomButton';

const PORT = 6000;
const IP = '192.168.49.1';
const SERVER_IP = '127.0.0.1';
const IPIDK = '25.226.115.47';

const ChatDetail = ({navigation, route}) => {
  const item = route.params;
  const {isOwner} = route.params;
  const receiveInterval = useRef(null);
  const connectionInterval = useRef(null);

  // const [message, setMessage] = useState('');
  // const [photo, setPhoto] = useState([]);
  // const [selectedFiles, setSelectedFiles] = useState([]);
  const [messages, setMessages] = useState([
    {
      _id: Math.random(1000).toString(),
      text: 'alo',
      createAt: new Date(),
      user: {
        _id: 2,
      },
    },
  ]);
  // const [selectedImages, setSelectedImage] = useState([]);

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '15%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  const onReceiveMessage = () => {
    receiveMessage()
      .then(message => {
        const msg = [
          {
            _id: Math.random(1000).toString(),
            text: message,
            createAt: new Date(),
            user: {
              _id: 2,
            },
          },
        ];
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, msg),
        );
      })
      .catch(err => console.log('[FATAL] Unable to receive messages'));
  };

  const onSendMessage = useCallback((message = []) => {
    if (false) {
      // SERVER [TODO]
      // server.current.socket.write(message)
    } else {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, message),
      );
      sendMessage(message[0].text)
        .then(metaInfo =>
          console.log('[INFO] Send client message successfully', metaInfo),
        )
        .catch(err => console.log('[FATAL] Unable to send client message'));
    }
  }, []);

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
    }, 300);

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

  const [recentPhotos, setRecentPhotos] = useState([]);

  const cameraBottomSheetModalRef = useRef(null);
  const imageBottomSheetModalRef = useRef(null);

  const cameraSnapPoints = useMemo(() => ['15%', '15%'], []);
  const imageSnapPoints = useMemo(() => ['80%', '80%'], []);

  const dispatch = useDispatch();
  const {selectedImages} = useSelector(state => state.P2P);
  // console.log(selectedImages)

  const getRecentPhotos = async () => {
    const check = await GetStoragePermissions();

    if (check) {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
        .then(r => {
          console.log(r.edges);
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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

  // const handleSendMessage = () => {};

  // const handleImageSelection = async () => {};

  // function removeItems(item) {}

  const handleShowCameraBottomSheet = () => {
    cameraBottomSheetModalRef.current?.present();
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

  const handleShowImageBottomSheet = () => {
    dispatch(removeAllSelectedImages());

    getRecentPhotos();

    imageBottomSheetModalRef.current?.present();
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

  const handleSendImages = () => {
    console.log('Sent: ', selectedImages);
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
            <Image
              source={images.left}
              size={25}
              style={{width: 25, height: 25, marginRight: 8}}
            />
          </TouchableOpacity>
          <Image
            source={item.img ? item.img : images.profile}
            style={styles.avatarDetail}
          />
          <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 10}}>
            {item.deviceName}
          </Text>
        </View>

        <FlatList
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
            {/* <FlatList
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
            /> */}

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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <TouchableOpacity
              style={{
                marginLeft: 10,
              }}
              onPress={handleShowCameraBottomSheet}>
              <Image
                source={images.camera}
                size={25}
                style={{
                  width: 25,
                  height: 25,
                  marginRight: 8,
                  marginBottom: 55,
                }}
              />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nhập nội dung tin nhắn"
                value={message}
                onChangeText={text => setMessage(text)}
              />

              {message ? (
                <TouchableOpacity onPress={handleSendMessage}>
                  <Image
                    source={images.send}
                    size={25}
                    style={{width: 25, height: 25, marginRight: 8}}
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
                      style={{width: 25, height: 25, marginRight: 8}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pickDocument}>
                    <Image
                      source={images.attach}
                      size={25}
                      style={{width: 25, height: 25, marginRight: 8}}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

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
              <Feather name="image" size={30} color={COLORS.primary} />
              <Text style={styles.btnText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={recordVideo}>
              <Feather name="video" size={30} color={COLORS.primary} />
              <Text style={styles.btnText}>Record Video</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>

        <BottomSheetModal
          ref={imageBottomSheetModalRef}
          index={1}
          snapPoints={imageSnapPoints}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}>
          <CustomButton title="Send" onPress={handleSendImages} />

          <BottomSheetFlatList
            data={recentPhotos}
            scrollEnabled={true}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.imageList}
            renderItem={({item, index}) => {
              return <LibraryImageCard key={index} image={item} />;
            }}
          />
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

export default ChatDetail;
