import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import p2pService from '../../../hook/P2PService';
import styles from './chat.style';
import ChatCard from '../../common/ChatCard';
import {images, COLORS} from '../../../constants';
import {onGetGroupInfo} from '../../../hook/FunctionsP2P';
import {ToastAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setChatId } from '../../redux/reducers';

const Chat = ({navigation}) => {
  const [chatList, setChatList] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    // Get the initial chatList from P2PService when the component is created
    const initialChatList = p2pService.chatList;
    setChatList(initialChatList);
  }, []);

  useFocusEffect(() => {
    setChatList(p2pService.chatList);
  });

  const renderItem = ({item}) => (
    <ChatCard navigation={navigation} item={item} />
  );

  const createChatObject = data => {
    return {
      chatId: Math.random().toString(),
      img: images.profile,
      deviceName: data.networkName,
      messages: [],
    };
  };

  const handleCreateChat = async () => {
    if (p2pService.isServer) {
      console.log('được phép nhắn tin');
      const group = await onGetGroupInfo();
      const item = createChatObject(group);
      p2pService.addChatToChatList(item);
      p2pService.onSendMessage(item);
      setChatList(p2pService.chatList);
      dispatch(setChatId(item.chatId))
      // p2pService.messages = item.messages
      navigation.navigate('Chat Detail', {item: item, check: true});
    } else {
      ToastAndroid.show('Bạn không có quyền này!!', ToastAndroid.SHORT);
      console.log('CÚT');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
      <View style={styles.chatList}>
        {chatList.length > 0 ? (
          <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={item => item.chatId.toString()}
          />
        ) : (
          <Text style={styles.chatText}>No messages available</Text>
        )}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleCreateChat()}
        style={styles.buttonAdd}>
        <Ionicons name="add-outline" size={32} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Chat;
