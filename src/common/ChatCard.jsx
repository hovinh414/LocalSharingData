import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const ChatCard = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={item.img} resizeMode="contain" style={styles.img} />
      </View>
      <View>
        <Text>{item.name}</Text>
      </View>
    </View>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imgContainer: {
    borderRadius: 25,
    borderColor: COLORS.black,
    height: 50,
    width: 50,
  },
  img: {},
});
