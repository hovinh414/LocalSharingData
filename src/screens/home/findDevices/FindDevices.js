import React, {useState, useEffect, useLayoutEffect} from 'react';
import {ScrollView, Text, View, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './findDevices.style';
import DeviceCard from '../../../common/DeviceCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../../../../constants';
import {useDispatch, useSelector} from 'react-redux';

import p2pService from '../../../../hook/P2PService';

import {
  onConnect,
  onRemoveGroup,
  onGetAvailableDevices,
} from '../../../../hook/FunctionsP2P';
import {updateUser} from '../../../redux/reducers';

const FindDevices = ({navigation, user, setIsOptionModalOpen}) => {
  const devices = useSelector(state => state.P2P.devices);
  const dispatch = useDispatch();

  console.log('Devices: ', devices);

  const handleOpenModal = () => {
    setIsOptionModalOpen(true);
  };

  const handleConnect = data => {
    const itemWithIsOwner = {...user, isOwner: false};
    dispatch(updateUser(itemWithIsOwner));
    onConnect(navigation, data);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={[styles.container, styles.scrollView]}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => onGetAvailableDevices(dispatch)}>
            <Text style={styles.btnLabel}>Find Devices</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {devices.length !== 0 ? (
            <View>
              <Text style={styles.devicesTitle}>Available Devices</Text>

              {devices.map((data, index) => {
                return (
                  <DeviceCard
                    key={index}
                    device={data}
                    onPress={() => handleConnect(data)}
                  />
                );
              })}
            </View>
          ) : (
            <View style={styles.findingContainer}>
              <Image source={images.deviceFinding} style={styles.findingGif} />
              <Text style={styles.findingTitle}>Searching for devices...</Text>
            </View>
          )}
        </View>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={
              !user.connection.groupFormed ? styles.btn : styles.btnDisable
            }
            disabled={user.connection.groupFormed}
            onPress={() => handleOpenModal()}>
            <Text style={styles.btnLabel}>Create Group</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={user.connection.groupFormed ? styles.btn : styles.btnDisable}
            disabled={!user.connection.groupFormed}
            onPress={() => {
              p2pService.cleanUp();
              onRemoveGroup();
            }}>
            <Text style={styles.btnLabel}>Remove Group</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default FindDevices;
