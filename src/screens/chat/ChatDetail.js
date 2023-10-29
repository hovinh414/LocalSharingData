import React, {useState, useRef, useEffect} from 'react';
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
} from 'react-native';
import {COLORS} from '../../../constants';
import {images} from '../../../constants';
import {styles} from './chatDetail.style';
import {
  MaterialIcons,
  FontAwesome,
  Feather,
  Ionicons,
} from 'react-native-vector-icons';
import {LogBox} from 'react-native';

const ChatDetail = ({navigation, route}) => {
  const {item} = route.params;
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedImages, setSelectedImage] = useState([]);
  const takePic = async () => {};
  const handleSendMessage = () => {};
  const handleImageSelection = async () => {};
  function removeItems(item) {}
  const pickDocument = async () => {};

  return (
    <KeyboardAvoidingView style={styles.container} enabled>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={images.left}
            size={25}
            style={{width: 25, height: 25, marginRight: 8}}
          />
        </TouchableOpacity>
        <Image source={item.img} style={styles.avatarDetail} />
        <Text style={{fontWeight: 'bold', fontSize: 16, marginLeft: 10}}>
          {item.name}
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
          <FlatList
            data={[...selectedImages, ...photo]} /// chỗ này show list ảnh
            horizontal={true}
            renderItem={({item, index}) => (
              <View style={styles.viewImage} key={index}>
                <Image source={{uri: item.uri}} style={styles.image} />
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
            onPress={takePic}>
            <Image
              source={images.camera}
              size={25}
              style={{width: 25, height: 25, marginRight: 8, marginBottom: 55}}
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
                <TouchableOpacity onPress={handleImageSelection}>
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
    </KeyboardAvoidingView>
  );
};

export default ChatDetail;
