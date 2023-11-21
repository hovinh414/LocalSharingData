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
  sendMessage,
  receiveMessage,
  getConnectionInfo,
} from 'react-native-wifi-p2p';
import styles from './chatDetail.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LogBox} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import NetInfo from '@react-native-community/netinfo';
import TcpSocket from 'react-native-tcp-socket';
// import arp from '@network-utils/arp-lookup';
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
import {
  selectedImagesList,
  removeAllSelectedImages,
} from '../../redux/reducers';

const PORT = 6000;

const ChatDetail = ({navigation, route}) => {
  // Server variables
  const item = route.params;
  const {isOwner} = route.params;
  const receiveInterval = useRef(null);
  const connectionInterval = useRef(null);
  const [serverStarted, setServerStarted] = useState(false);
  const [clientStarted, setClientStarted] = useState(false);
  const [ipAddress, setIpAddress] = useState();
  const [serverIp, setServerIp] = useState();
  const [clientIp, setClientIp] = useState();
  let server = useRef();
  let client = useRef();
  let socketRef = useRef(null);

  // ---------------------------
  // Messages, images, files variables
  const dispatch = useDispatch();
  const messageRef = useRef('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const selectedImages = useSelector(state => state.P2P.selectedImages); // ảnh đang được chọn để gửi
  const [photos, setPhotos] = useState([]); // ảnh từ take photo
  const [videos, setVideos] = useState([]); // video từ record video

  // ---------------------------
  // Bottomsheet variables
  const cameraBottomSheetModalRef = useRef(null);
  const imageBottomSheetModalRef = useRef(null);
  const cameraSnapPoints = useMemo(() => ['15%', '15%'], []);
  const imageSnapPoints = useMemo(() => ['80%', '80%'], []);
  const [recentPhotos, setRecentPhotos] = useState([]); // ảnh trong điện thoại

  useEffect(() => {
    // Lắng nghe sự thay đổi kết nối mạng
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
    });

    // Lấy địa chỉ IP thiết bị
    const getIpAddress = async () => {
      const state = await NetInfo.fetch();
      console.log(['DEVICES IP'], state.details.ipAddress);
      setIpAddress(state.details.ipAddress);

      handleConnect();
    };

    // Tạo kết nối P2P
    connectionInterval.current = setInterval(() => {
      onGetConnectionInfo();
    }, 10000);

    getIpAddress();

    return () => {
      unsubscribe();
      // clearInterval(receiveInterval.current);
      clearInterval(connectionInterval.current);
    };
  }, []);

  // Function to handle creating a server
  const handleCreateServer = () => {
    console.log('[SOCKET] Creating socket at the server side');
    server.current = TcpSocket.createServer(socket => {
      console.log('Client connected:', socket.remoteAddress, socket.remotePort);

      socketRef.current = socket;

      console.log(socketRef.current);

      socket.write('hello from server');

      socket.on('error', error =>
        console.log('An error ocurred with client socket ', error),
      );

      socket.on('close', error => {
        console.log('Closed connection with ', socket.address());
      });
    });

    server.current.listen({port: PORT, host: ipAddress}, () => {
      console.log('Server is up and running on', PORT, ipAddress);
      setServerStarted(true);

      receiveInterval.current = setInterval(() => onReceiveMessage(), 100);
    });

    server.current.on('error', error => {
      console.log('An error ocurred with the server', error);
    });

    server.current.on('close', () => {
      console.log('Server closed connection');
      setServerStarted(false);
    });
  };

  // Function to handle creating a client
  const handleCreateClient = () => {
    client.current = TcpSocket.createConnection(
      {port: PORT, host: item.deviceAddress},
      () => {
        console.log('Connected to server');
      },
    );

    client.current.write('Hello server from client!');

    client.current.on('data', data => {
      const receivedText = data.toString();
      console.log('Received data from server:', receivedText);

      const newMessage = {
        _id: Math.random().toString(),
        text: receivedText,
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      };

      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );
    });

    client.current.on('error', error => {
      console.log('An error occurred with the client socket', error);
    });

    client.current.on('close', () => {
      console.log('Client closed connection');
    });

    setClientStarted(true);
  };

  const handleConnect = () => {
    if (isOwner) {
      // SERVER SIDE
      console.log('[INFO] Creating the group...');
      onCreateGroup();

      if (!serverStarted) {
        handleCreateServer();
        console.log('123', ipAddress);
      }
    } else {
      // CLIENT SIDE

      // Connect to the group created by the server
      connect(item.deviceAddress)
        .then(() => {
          console.log('[INFO] Client connected to the group');
        })
        .catch(err =>
          console.log('[FATAL] Unable to connect with the server group: ', err),
        );
      setClientIp(ipAddress);

      if (!clientStarted) {
        handleCreateClient();
      }

      setTimeout(() => {
        getConnectionInfo().then(info => {
          console.log('[GET CONNECTION INFO]', info);
        });
      }, 2000);

      console.log('[SENDING] Connection Message to the server');

      setTimeout(() => {
        console.log('Sending Message...');
        sendMessage('[INFO] Connection got established!')
          .then(metaInfo =>
            console.log('[INFO] Message from client -> server', metaInfo),
          )
          .catch(err =>
            console.log(
              '[ERROR] Error sending message from client -> server: ',
              err,
            ),
          );
      }, 5000);
    }
  };

  // ---------------------------
  const onReceiveMessage = () => {
    // Server use this function to receive message from client
    receiveMessage()
      .then(text => {
        const newMessage = {
          _id: Math.random(1000).toString(),
          text: text,
          createAt: new Date(),
          user: {
            _id: 2, // Tin nhắn của phía người nhận
          },
        };
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [newMessage]),
        );
      })
      .catch(err => console.log('[FATAL] Unable to receive messages: ', err));
  };
  const onSendMessages = useCallback(
    (text = []) => {
      if (!text) {
        return;
      }

      const newMessage = {
        _id: Math.random().toString(),
        text: text,
        createdAt: new Date(),
        user: {
          _id: 1, // Tin nhắn của phía người nhắn
        },
      };

      // Thêm tin nhắn mới vào danh sách tin nhắn
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );

      // Xóa nội dung tin nhắn sau khi gửi
      setMessage('');
      messageRef.current.clear();

      if (isOwner && socketRef.current) {
        const newText = text.toString();
        console.log(socketRef.current);
        socketRef.current.write(JSON.stringify({data: newText}));
      } else if (!isOwner) {
        // only client can use sendMessage function
        sendMessage(newMessage.text)
          .then(metaInfo =>
            console.log('[INFO] Send client message successfully', metaInfo),
          )
          .catch(err =>
            console.log('[FATAL] Unable to send client message: ', err),
          );
      }
    },
    [isOwner],
  );
  const onSendImages = useCallback((image = []) => {}, []);
  const onSendFiles = useCallback((image = []) => {}, []);
  const handleSendMessage = text => {
    onSendMessages(text);
  };
  // const handleSendImages = () => {
  //   console.log('Sent: ', selectedImages);
  // };
  function removeItems(item) {
    const image = selectedImages.filter(listItem => listItem !== item);
    console.log(image[0]);
    dispatch(selectedImagesList(image[0]));

    // const newPhoto = photo.filter((listItem) => listItem !== item)
    // setPhoto(newPhoto)
    // const file = selectedFiles.filter((listItem) => listItem !== item)
    // setSelectedFiles(file)
  }

  // ---------------------------
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
        include: ['filename', 'playableDuration'],
      })
        .then(r => {
          setRecentPhotos(r.edges);
        })
        .catch(err => {
          console.log(err);
        });
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

  const renderComposer = props => (
    <View style={styles.bottomContainer}>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <FlatList
              data={[...selectedImages]} /// chỗ này show list ảnh
              horizontal={true}
              renderItem={({item, index}) => (
                <View style={styles.viewImage} key={index}>
                  <Image
                    source={{uri: item.node.image.uri}}
                    style={styles.image}
                  />
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
              )}
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

            {message || selectedImages.length !== 0 ? (
              <TouchableOpacity onPress={() => handleSendMessage(message)}>
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
      </View>
    </View>
  );
  const renderActions = props => (
    <View style={styles.cameraContainer}>
      <TouchableOpacity onPress={handleShowCameraBottomSheet}>
        <Image source={images.camera} style={styles.cameraImg} />
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView style={styles.container} enabled>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              onRemoveGroup();
            }}>
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

        <BottomSheetModal
          ref={imageBottomSheetModalRef}
          index={1}
          snapPoints={imageSnapPoints}
          style={styles.bottomSheet}
          backdropComponent={renderBackdrop}>
          <View style={styles.sendBtnContainer}>
            <TouchableOpacity
              onPress={() => imageBottomSheetModalRef.current?.close()}
              style={styles.closeBtn}>
              <Ionicons name="close" color={COLORS.primary} size={45} />
            </TouchableOpacity>

            <View style={styles.allImagesTextContainer}>
              <Text style={styles.allImagesText}>All Images</Text>
            </View>

            <View style={{height: 45, width: 45}}>
              {/* {selectedImages.length !== 0 ? (
                <TouchableOpacity
                  style={styles.sendBtn}
                  onPress={handleSendImages}>
                  <MaterialCommunityIcons
                    name="send-circle"
                    color={COLORS.primary}
                    size={45}
                  />
                </TouchableOpacity>
              ) : null} */}
            </View>
          </View>

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
