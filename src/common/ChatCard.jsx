import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS, FONT, SIZES} from '../../constants';
import { useDispatch } from 'react-redux';
import { setChatId } from '../redux/reducers';
import p2pService from '../../hook/P2PService';

const ChatCard = ({navigation, item}) => {
  const [latestMessage, setLatestMessage] = useState('');
  const dispatch = useDispatch()

  const handlePress = () => {
    navigation.navigate('Chat Detail', {item: item, check: false});
    p2pService.messages = item.messages
    dispatch(setChatId(item.chatId))
  };

  useEffect(() => {
    if (item.messages.length > 0) {
      setLatestMessage(item.messages[0]);
    }

    return () => {};
  }, [item.messages, navigation]);

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress()}>
      <View style={styles.imgContainer}>
        <Image source={item.img} resizeMode="cover" style={styles.img} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{item.deviceName}</Text>
          <AntDesign
            name={item.available ? 'checkcircleo' : 'minuscircleo'}
            size={SIZES.medium}
            style={styles.statusIcon}
            color={item.available ? COLORS.primary : COLORS.red}
          />
        </View>
        <Text style={styles.message}>{latestMessage.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: SIZES.small,
    paddingHorizontal: SIZES.small + 2,
  },
  imgContainer: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: COLORS.yellow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: SIZES.small,
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large - 2,
    color: COLORS.black,
  },
  message: {
    fontFamily: FONT.regular,
    fontSize: SIZES.medium,
    color: COLORS.darkgray,
  },
  statusIcon: {},
});
