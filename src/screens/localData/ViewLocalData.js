import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import RNFS from 'react-native-fs';
import styles from './viewLocalData.style';

const ViewLocalData = ({route}) => {
  const content = route.params;
  // console.log(content)
  const [fileData, setFileData] = useState();

  const readFile = async () => {
    const response = await RNFS.readFile(content.uri);

    setFileData(response);
  };

  useEffect(() => {
    if (content.type.includes('text')) {
      readFile();
    }
  });

  return (
    <View style={styles.contentText}>
      {content.type.includes('text') ? (
        <Text>{fileData}</Text>
      ) : (
        <Image source={{uri: content.uri}} style={styles.contextImg} />
      )}
    </View>
  );
};

export default ViewLocalData;
