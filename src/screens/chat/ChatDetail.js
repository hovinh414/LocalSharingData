import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  SafeAreaView,
  Modal
} from 'react-native';
import { COLORS } from '../../../constants';
import { images } from '../../../constants';
import {
  connect,
  createGroup,
  receiveMessage,
  sendMessage,
  getConnectionInfo,
} from 'react-native-wifi-p2p';
import { styles } from './chatDetail.style';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from 'react-native-vector-icons';
import { LogBox } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import DocumentPicker from 'react-native-document-picker';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { GetStoragePermissions } from '../../../hook/GetPermissions';

var net = require('react-native-tcp');
const ChatDetail = ({ navigation, route }) => {
  const item = route.params;
  console.log(route);
  const { isOwner } = route.params;
  console.log(isOwner);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const [showModal, setShowModal] = useState(false)
  const [recentPhotos, setRecentPhotos] = useState([]);

  const getRecentPhotos = async () => {
    const check = await GetStoragePermissions()

    if (check) {
      CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos'
      }).then( r => {
        console.log(r.edges)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  // useEffect(() => {
  //   getRecentPhotos()
  // }, [])

  // console.log("recent photos:", recentPhotos)

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['10%', '15%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const takePhoto = () => {
    bottomSheetModalRef.current?.close();
    try {
      ImagePicker.openCamera({ mediaType: 'photo' }).then((result) => {
        console.log(result)
      })
    }
    catch (err) {
      console.log(err)
    }
  };
  const recordVideo = () => {
    bottomSheetModalRef.current?.close();
    try {
      ImagePicker.openCamera({ mediaType: 'video' }).then((result) => {
        console.log(result)
      })
    }
    catch (err) {
      console.log(err)
    }
  };
  const handleSendMessage = () => { };
  const handleImageSelection = async () => { };
  function removeItems(item) { }
  const pickDocument = async () => { 
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
        quality: 1,
      });

      console.log(result)
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Người dùng đã hủy việc chọn tệp
      } else {
        throw err;
      }
    }
  };


  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView style={styles.container} enabled>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={images.left}
              size={25}
              style={{ width: 25, height: 25, marginRight: 8 }}
            />
          </TouchableOpacity>
          <Image
            source={item.img ? item.img : images.profile}
            style={styles.avatarDetail}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 10 }}>
            {item.deviceName}
          </Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
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
              renderItem={({ item, index }) => (
                <TouchableOpacity style={styles.viewFile} key={index}>
                  <View style={styles.file}>
                    {item.mimeType === 'video/mp4' ? (
                      <Image source={images.video} style={styles.fileIcon} />
                    ) : item.mimeType === 'image/jpeg' ? (
                      <Image source={{ uri: item.uri }} style={styles.fileIcon} />
                    ) : (
                      <Image source={images.file} style={styles.fileIcon} />
                    )}
                    <Text style={styles.fileName}>{item.name}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeItems(item)}
                    style={styles.btnRemoveFile}>
                    <MaterialIcons name="delete" size={15} color={COLORS.black} />
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
              onPress={handlePresentModalPress}>
              <Image
                source={images.camera}
                size={25}
                style={{ width: 25, height: 25, marginRight: 8, marginBottom: 55 }}
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
                    style={{ width: 25, height: 25, marginRight: 8 }}
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity onPress={getRecentPhotos}>
                    <Image
                      source={images.image}
                      size={25}
                      style={{ width: 25, height: 25, marginRight: 8 }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={pickDocument}>
                    <Image
                      source={images.attach}
                      size={25}
                      style={{ width: 25, height: 25, marginRight: 8 }}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1} 
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.bottomSheet}
        >
          <View style={styles.bottomSheetItemContainer}>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={takePhoto}>
              <Feather name='image' size={30} color={COLORS.primary}/>
              <Text style={styles.btnText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomSheetItem} onPress={recordVideo} >
              <Feather name='video' size={30} color={COLORS.primary}/>
              <Text style={styles.btnText}>Record Video</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>

      
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

export default ChatDetail;
