import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import {images} from '../../../constants';
import styles from './chat.style';
import ChatCard from '../../common/ChatCard';

const Chat = ({navigation}) => {
  const list = [
    {
      img: images.hieu,
      deviceName: 'Hieu',
      message: 'Hello there!',
      available: true,
    },
    {
      img: images.profile,
      deviceName: 'Vinh',
      message: 'Hi, how are you?',
      available: false,
    },
    // Add more chat messages here...
  ];

  const renderItem = ({item}) => (
    <ChatCard navigation={navigation} item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
      <View style={styles.chatList}>
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
