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
import {useDispatch, useSelector} from 'react-redux';
import {
  onConnect,
  onCreateGroup,
  onRemoveGroup,
  onGetAvailableDevices,
} from '../../../../hook/FunctionsP2P';
import {setUser} from '../../../redux/reducers';

export default function FindDevices({navigation}) {
  const devices = useSelector(state => state.P2P.devices);
  const user = useSelector(state => state.P2P.user);
  const dispatch = useDispatch();
  console.log('Devices: ', devices);

  const handleCreateGroup = () => {
    const itemWithIsOwner = {...user, isOwner: true};
    dispatch(setUser(itemWithIsOwner));

    navigation.navigate('Chat Detail', itemWithIsOwner);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onGetAvailableDevices(dispatch)}>
            <Text style={styles.btnLabel}>Find Devices</Text>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 10}}>
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
                    onPress={() => onConnect(navigation, data)}
                  />
                );
              })}
            </View>
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: '5%',
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

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleCreateGroup()}>
            <Text style={styles.btnLabel}>Create Group</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => onRemoveGroup()}>
            <Text style={styles.btnLabel}>Remove Group</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}