import {
  initialize,
  startDiscoveringPeers,
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

export const getPermissions = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
    ];

    const granted = await PermissionsAndroid.requestMultiple(permissions, {
      title: 'Access to Wi-Fi P2P Mode',
      message: 'Access to Wi-Fi P2P Mode requires these permissions',
    });

    if (
      (granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
        PermissionsAndroid.RESULTS.GRANTED ||
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED) &&
      granted[PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use Wi-Fi P2P Mode');
      await initialize();
      return true;
    } else {
      console.log('Permission denied: Wi-Fi P2P Mode will not work');
      return false;
    }
  } catch (e) {
    console.error(e);
  }
};

const handleNewInfo = info => {
  // console.log('OnConnectionInfoUpdated', info);
};

const handleNewPeers = ({devices}) => {
  // console.log('OnPeersUpdated', devices);
  //   setDevices(devices);
};

const handleThisDeviceChanged = groupInfo => {
  // console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
};

export const initWifiP2P = async ({
  subscriptionOnPeersUpdates,
  subscriptionOnConnectionInfoUpdates,
  subscriptionOnThisDeviceChanged,
}) => {
  subscriptionOnPeersUpdates = subscribeOnPeersUpdates(handleNewPeers);
  subscriptionOnConnectionInfoUpdates =
    subscribeOnConnectionInfoUpdates(handleNewInfo);
  subscriptionOnThisDeviceChanged = subscribeOnThisDeviceChanged(
    handleThisDeviceChanged,
  );
};

export const startGetPeers = async () => {
  try {
    await startDiscoveringPeers();
  } catch (err) {
    console.error(err, 'at startDiscovering');
  }
};

export const cleanUpWifiP2P = (
  subscriptionOnPeersUpdates,
  subscriptionOnConnectionInfoUpdates,
  subscriptionOnThisDeviceChanged,
) => {
  subscriptionOnPeersUpdates.remove();
  subscriptionOnConnectionInfoUpdates.remove();
  subscriptionOnThisDeviceChanged.remove();
};

// Thêm các hàm khác liên quan đến WiFi P2P ở đây
