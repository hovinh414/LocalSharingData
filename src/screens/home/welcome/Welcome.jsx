import {View, Text} from 'react-native';
import React from 'react';
import styles from './welcome.style';

const Welcome = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello XXX Device</Text>
        <Text style={styles.welcomeMessage}>Find your connect</Text>
      </View>
    </View>
  );
};

export default Welcome;
