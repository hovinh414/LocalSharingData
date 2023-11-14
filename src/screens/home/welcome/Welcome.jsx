import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import styles from './welcome.style';

const Welcome = () => {
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    async function fetchData() {
      // Lấy deviceName từ DeviceInfo và cập nhật state
      const name = await DeviceInfo.getDeviceName();
      setDeviceName(name);
    }

    fetchData();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {deviceName}</Text>
        <Text style={styles.welcomeMessage}>Find your connect</Text>
      </View>
    </View>
  );
};

export default Welcome;
