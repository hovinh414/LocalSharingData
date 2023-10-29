import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './findDevices.style';
import DeviceCard from '../../../common/DeviceCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../../../../constants';
import {useSelector} from 'react-redux';

export default function FindDevices({navigation}) {
  const devices = useSelector(state => state.P2P.devices);
  const [datas, setDatas] = useState([
    // {
    //   deviceName: 'Samsung Galaxy A13'
    // },
    // {
    //   deviceName: 'Samsung Galaxy A23'
    // },
    // {
    //   deviceName: 'Samsung Galaxy A33'
    // },
  ]);

  const connectToDevice = device => {
    console.log('Connect to: ', device.deviceAddress);
    navigation.navigate('Chat Detail', {
      isOwner: false,
      deviceAddress: device.deviceAddress,
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View style={{marginBottom: 10}}>
          <TouchableOpacity style={styles.createGroupBtn}>
            <Text style={styles.btnLabel}>Create Group</Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 10, paddingBottom: 10, flex: 1}}>
          {devices.length !== 0 ? (
            <View>
              <Text
                style={{fontSize: 14, fontWeight: '500', marginVertical: 10}}>
                Available Devices
              </Text>

              {devices.map((data, index) => {
                return (
                  <DeviceCard
                    key={index}
                    device={data}
                    onPress={() => connectToDevice(data)}
                  />
                );
              })}
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20%',
              }}>
              {/* <ActivityIndicator size='large' color='grey'/> */}
              <Image
                source={images.deviceFinding}
                style={{height: 140, width: 140}}
              />
              <Text style={{fontSize: 18, marginTop: 10}}>
                Searching for devices...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
