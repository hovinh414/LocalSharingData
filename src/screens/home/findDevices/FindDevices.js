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
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  unsubscribeFromPeersUpdates,
  unsubscribeFromThisDeviceChanged,
  unsubscribeFromConnectionInfoUpdates,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  getConnectionInfo,
  getGroupInfo,
} from 'react-native-wifi-p2p';
import {PermissionsAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './findDevices.style';
import DeviceCard from '../../../common/DeviceCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {images} from '../../../../constants';

export default function FindDevices() {
  const [devices, setDevices] = useState([]);
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

  useEffect(() => {
    const initWifiP2P = async () => {
      try {
        await initialize();

        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions, {
          title: 'Access to wi-fi P2P mode',
          message: 'Access to Wi-Fi P2P mode requires these permissions',
        });

        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('You can use the p2p mode');
        } else {
          console.log('Permission denied: p2p mode will not work');
        }

        subscribeOnPeersUpdates(handleNewPeers);
        subscribeOnConnectionInfoUpdates(handleNewInfo);
        subscribeOnThisDeviceChanged(handleThisDeviceChanged);

        try {
          await startDiscoveringPeers();
          console.log('Starting of discovering was successful');
        } catch (err) {
          console.log(err, 'at startDiscovering');
        }
      } catch (e) {
        console.error(e);
      }
    };

    initWifiP2P();

    return () => {
      unsubscribeFromConnectionInfoUpdates(handleNewInfo);
      unsubscribeFromPeersUpdates(handleNewPeers);
      unsubscribeFromThisDeviceChanged(handleThisDeviceChanged);
    };
  }, []);

  // console.log(devices)

  const handleNewInfo = info => {
    // console.log('OnConnectionInfoUpdated', info);
  };

  const handleNewPeers = ({devices}) => {
    // console.log('OnPeersUpdated', devices);
    setDevices(devices);
  };

  const handleThisDeviceChanged = groupInfo => {
    // console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
  };

  const connectToDevice = device => {
    console.log('Connect to: ', device.deviceAddress);
    navigation.navigate('NearbyChat', {
      isOwner: false,
      deviceAddress: device.deviceAddress,
    });
  };

  const onCancelConnect = () => {
    cancelConnect()
      .then(() =>
        console.log('cancelConnect', 'Connection successfully canceled'),
      )
      .catch(err =>
        console.error('cancelConnect', 'Something gone wrong. Details: ', err),
      );
  };

  const onCreateGroup = () => {
    createGroup()
      .then(() => console.log('Group created successfully!'))
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  const onRemoveGroup = () => {
    removeGroup()
      .then(() => console.log("Currently you don't belong to group!"))
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  const onStopInvestigation = () => {
    stopDiscoveringPeers()
      .then(() => console.log('Stopping of discovering was successful'))
      .catch(err =>
        console.error(
          'Something is gone wrong. Maybe your WiFi is disabled? Error details',
          err,
        ),
      );
  };

  const onStartInvestigate = () => {
    startDiscoveringPeers()
      .then(status =>
        console.log(
          'startDiscoveringPeers',
          `Status of discovering peers: ${status}`,
        ),
      )
      .catch(err =>
        console.error(
          `Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`,
        ),
      );
  };

  const onGetAvailableDevices = () => {
    onStartInvestigate();
    getAvailablePeers().then(peers => {
      console.log(peers);
      // setDevices(peers)
    });
  };

  const onGetConnectionInfo = () => {
    getConnectionInfo().then(info => console.log('getConnectionInfo', info));
  };

  const onGetGroupInfo = () => {
    getGroupInfo().then(info => console.log('getGroupInfo', info));
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
                return <DeviceCard key={index} device={data} />;
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
