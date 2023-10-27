import React, { useState, useLayoutEffect } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from './getLocalData.style';
import images from '../../../constants/images'
const BLUE = '#007AFF';
const BLACK = '#000000';
const LENGTH = 6;

export default function GetLocalData() {

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
        quality: 1,
      });
      //   setSelectedImage(result);

      if (!selectedImages) {
        setSelectedImages(result);
      } else {
        setSelectedImages([...selectedImages, ...result]);
      }
      
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Người dùng đã hủy việc chọn tệp
      } else {
        throw err;
      }
    }
  }
  
  function removeImage(item) {
    const newList = selectedImages.filter(listItem => listItem !== item);
    setSelectedImages(newList);
  }

  const navigation = useNavigation();

  const handleNavigate = item => {
    // console.log(item)
    navigation.navigate('ViewLocalData', item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <Button color="#007AFF" onPress={pickDocument} title="Get Data" />
        </View>

        <FlatList
          data={selectedImages}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              key={index}
              onPress={() => handleNavigate(item)}>
              <View
                style={styles.itemType}>
                {item.type === 'image/jpeg' || item.type === 'image/png' ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.itemImg}
                  />
                ) : item.type === 'application/pdf' ? (
                  <Image
                    source={images.pdf}
                    style={styles.itemImg}
                  />
                ) : item.type === 'text/plain' ? (
                  <Image
                    source={images.txt}
                    style={styles.itemImg}
                  />
                ) : (item.type === 'audio/mpeg' || item.type === 'audio/flac' || item.type === 'audio/amr') ? (
                  <Image
                    source={images.mp3}
                    style={styles.itemImg}
                  />
                ) : item.type === 'video/mp4' ? (
                  <Image
                    source={images.video}
                    style={styles.itemImg}
                  />
                ) : item.type === 'application/vnd.ms-excel' ? (
                  <Image
                    source={images.xls}
                    style={styles.itemImg}
                  />
                ): item.type === 'application/msword' ? (
                  <Image
                    source={images.doc}
                    style={styles.itemImg}
                  />
                ) : item.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
                  <Image
                    source={images.ppt}
                    style={styles.itemImg}
                  />
                ) : (
                  <Image
                    source={images.file}
                    style={styles.itemImg}
                  />
                )}

                <Text
                  style={styles.itemName}>
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeImage(item)}
                style={styles.btnDel}>
                <Image
                  source={images.remove}
                  style={styles.iconImg}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
