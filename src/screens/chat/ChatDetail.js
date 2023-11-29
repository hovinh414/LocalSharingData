import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Image,
  PermissionsAndroid,
} from 'react-native';
import { images, COLORS } from '../../../constants';
import {
  connect,
  sendMessage,
  receiveMessage,
  getConnectionInfo,
  receiveFile,
  sendFile,
} from 'react-native-wifi-p2p';
import styles from './chatDetail.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagesPickers from 'react-native-image-picker';
import { GiftedChat } from 'react-native-gifted-chat';
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
} from '@gorhom/bottom-sheet';
import { GetStoragePermissions } from '../../../hook/GetPermissions';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const PORT = 6000;
const SERVER_IP = '10.152.32.209';

const ChatDetail = ({ navigation, route }) => {
  // Server variables
  const device = route.params;
  const { isOwner } = route.params;
  const receiveInterval = useRef(null);
  const connectionInterval = useRef(null);
  const [serverStarted, setServerStarted] = useState(false);
  const [clientStarted, setClientStarted] = useState(false);
  const [ipAddress, setIpAddress] = useState();

  let server = useRef();
  let client = useRef();
  let socketRef = useRef(null);

  // ---------------------------
  // Messages, images, files variables
  const messageRef = useRef('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [photos, setPhotos] = useState([]); // ảnh từ take photo
  const [videos, setVideos] = useState([]); // video từ record video
  const [files, setFiles] = useState([]); // chọn file từ attach


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

      handleConnect(); // Bắt đầu xử lý kết nối
    };

    // Tạo kết nối P2P
    connectionInterval.current = setInterval(() => {
      onGetConnectionInfo();
    }, 10000);

    // Function to handle creating a server
    const handleCreateServer = () => {
      if (serverStarted) {
        console.log(
          '[INFO] Server is already created. Reusing the existing server.',
        );
        return;
      }

      console.log('[SOCKET] Creating socket at the server side');
      server.current = TcpSocket.createServer(socket => {
        console.log(
          'Client connected:',
          socket.remoteAddress,
          socket.remotePort,
        );

        socketRef.current = socket;

        console.log(socketRef.current);

        // socket.write({type: 'text', data: 'hello from server'});

        socket.on('error', error =>
          console.log('An error ocurred with client socket ', error),
        );

        socket.on('close', error => {
          console.log('Closed connection with ', socket.address());
        });
      });
      setServerStarted(true);

      server.current.listen({ port: PORT, host: ipAddress }, () => {
        console.log('Server is up and running on', PORT, ipAddress);

        receiveInterval.current = setInterval(() => {
          onReceiveMessages();
          onReceiveImages();
          onReceiveFiles();
        }, 100);
      });

      server.current.on('error', error => {
        console.log('An error ocurred with the server', error);
        setServerStarted(false); // Đặt trạng thái là chưa tạo server nếu có lỗi
      });

      server.current.on('close', () => {
        console.log('Server closed connection');
        setServerStarted(false);
      });
    };

    // Function to handle creating a client
    const handleCreateClient = () => {
      // Create socket
      client.current = TcpSocket.createConnection(
        { port: PORT, host: SERVER_IP },
        () => {
          console.log('Connected to server');
          client.current.write('Hello server from client!');
        },
      );

      client.current.on('data', async data => {
        const receivedData = await JSON.parse(data.toString());
        console.log(receivedData);
        let newMessage;

        // Kiểm tra loại dữ liệu

        // Xử lý tin nhắn văn bản
        if (receivedData.type === 'text') {
          console.log('Received text from client:', receivedData.data);

          const receivedText = receivedData.data.toString();
          newMessage = {
            _id: Math.random().toString(),
            text: receivedText,
            createdAt: new Date(),
            user: {
              _id: 2,
            },
          };
          // Xử lý tin nhắn hình ảnh
        } else if (receivedData.type === 'image') {
          console.log('Received image from client:', receivedData.data);
          const receivedImage = await receivedData.data.uri;
          newMessage = {
            _id: Math.random().toString(),
            image: `${receivedImage}`,
            createdAt: new Date(),
            user: {
              _id: 2, // Tin nhắn của phía người nhắn
            },
          };
        }
        else if (receivedData.type.startsWith('file/')) {
          console.log('Received file from client:', receivedData.data);
          const receivedFile = await receivedData.data.name;
          console.log(receivedFile)
          newMessage = {
            _id: Math.random().toString(),
            text: `${receivedFile}`,
            createdAt: new Date(),
            user: {
              _id: 2, // Tin nhắn của phía người nhắn
            },
          };
        }

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [newMessage]),
        );
      });

      client.current.on('error', error => {
        console.log('An error occurred with the client socket', error);
      });

      client.current.on('close', () => {
        console.log('Client closed connection');
        setClientStarted(false);
      });

      setClientStarted(true);
    };

    const handleConnect = async () => {
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
        // const clientIp = await arp.toIP(item.deviceAddress);
        // Connect to the group created by the server
        connect(device.deviceAddress)
          .then(() => {
            console.log('[INFO] Client connected to the group');
          })
          .catch(err =>
            console.log(
              '[FATAL] Unable to connect with the server group: ',
              err,
            ),
          );

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

    getIpAddress();

    return () => {
      unsubscribe();
      clearInterval(receiveInterval.current);
      clearInterval(connectionInterval.current);

      if (server) {
        server.current.close();
      }
    };
  }, []);

  // ---------------------------
  const onReceiveMessages = () => {
    // Server use this function to receive message from client
    receiveMessage()
      .then(text => {
        const newMessage = {
          _id: Math.random().toString(),
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
        const newData = {
          type: 'text',
          data: text.toString(),
        };
        socketRef.current.write(JSON.stringify(newData));
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
  const onReceiveImages = () => {
    receiveFile()
      .then(image => {
        const newMessage = {
          _id: Math.random().toString(),
          image: image,
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
  const onSendImages = useCallback(
    async (image) => {
      if (!image) {
        return;
      }
      console.log(image)

      const newMessage = {
        _id: Math.random().toString(),
        image: image.uri,
        createdAt: new Date(),
        user: {
          _id: 1, // Tin nhắn của phía người nhắn
        },
      };

      // Thêm tin nhắn mới vào danh sách tin nhắn
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newMessage]),
      );

      setSelectedImages([]);
      messageRef.current.clear();
      if (isOwner && socketRef.current) {
        const newData = {
          type: 'image',
          data: image,
        };
        console.log(socketRef.current);

        socketRef.current.write(JSON.stringify(newData));
      } else if (!isOwner) {
        console.log(image)

        sendMessage(image.fileName)

        const uri = await image.originalPath.toString()


        console.log(uri)
        // only client can use sendMessage function
        sendFile(uri)
          .then(metaInfo =>
            console.log('[INFO] Send client image successfully', metaInfo),
          )
          .catch(err =>
            console.log('[FATAL] Unable to send client image: ', err),
          );
      }
    },
    [isOwner],
  );
  const onReceiveFiles = () => {
    receiveFile('/')
      .then(file => {
        console.log(file);
        const newMessage = {
          _id: Math.random().toString(),
          text: '[FILE]: ' + file.uri,
          createAt: new Date(),
          user: {
            _id: 2, // Tin nhắn của phía người nhận
          },
        };

        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [newMessage]),
        );
      })
      .catch(err => console.log('[FATAL] Unable to receive file: ', err));
  };
  const onSendFiles = useCallback(
    (file = []) => {
      if (!file) {
        return;
      }

      const newMessage = {
        _id: Math.random().toString(),
        text: file.name,
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
      console.log(file);

      setFiles([]);

      if (isOwner && socketRef.current) {
        const newData = {
          type: 'file/' + file.type,
          data: file,
        };
        socketRef.current.write(JSON.stringify(newData));
      } else if (!isOwner) {
        // only client can use sendMessage function
        sendFile(file.uri)
          .then(metaInfo =>
            console.log('[INFO] Send client file successfully', metaInfo),
          )
          .catch(err =>
            console.log('[FATAL] Unable to send client file: ', err),
          );
      }
    },
    [isOwner],
  );
  const handleSendMessage = (text, image, file) => {
    console.log(text, image, file);
    if (text === '') {
      if (image && !file) {
        onSendImages(image);
        console.log('chỉ send ảnh');
      } else if (!image && file) {
        onSendFiles(file);
      }
    } else {
      if (image && !file) {
        onSendMessages(text);
        onSendImages(image);
      } else if (!image && file) {
        onSendImages(text);
        onSendFiles(file);
      } else if (!image && !file) {
        onSendMessages(text);
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
        return <Image source={{ uri: item.uri }} style={styles.image} />;
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
      ImagePicker.openCamera({ mediaType: 'photo' }).then(result => {
        console.log(result)
        setPhotos(result)

        onSendImages(result)
      });
    } catch (err) {
      console.log(err);
    }
  };
  const recordVideo = () => {
    cameraBottomSheetModalRef.current?.close();
    try {
      ImagePicker.openCamera({ mediaType: 'video' }).then(result => {
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

      console.log(result)

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

  const renderComposer = props => (
    <View style={styles.bottomContainer}>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <FlatList
            showsHorizontalScrollIndicator={false}
              data={[...selectedImages, ...files,]} /// chỗ này show list ảnh
              horizontal={true}
              renderItem={({ item, index }) => {
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
                )
                // console.log(item)
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

            {message || selectedImages.length !== 0 || files.length !== 0 ? (
              <TouchableOpacity
                onPress={() =>
                  handleSendMessage(message, selectedImages[0], files[0])
                }>
                <Image
                  source={images.send}
                  style={[styles.imgBtn, { marginHorizontal: 5 }]}
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
                    style={[styles.imgBtn, { marginHorizontal: 5 }]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickDocument()}>
                  <Image
                    source={images.attach}
                    size={25}
                    style={[styles.imgBtn, { marginHorizontal: 5 }]}
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
            source={device.img ? device.img : images.profile}
            style={styles.avatarDetail}
          />
          <Text style={styles.deviceNameText}>{device.deviceName}</Text>
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
