import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import styles from './welcome.style';
import {images} from '../../../../constants';
import {setUser} from '../../../redux/reducers';

const Welcome = () => {
  const [deviceName, setDeviceName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      // Lấy deviceName từ DeviceInfo và cập nhật state
      const name = await DeviceInfo.getDeviceName();
      setDeviceName(name);

      const user = {
        img: images.profile,
        deviceName: name,
        available: true,
      };

      dispatch(setUser(user));
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