import {initialize} from 'react-native-wifi-p2p';
import {PermissionsAndroid} from 'react-native';

export const GetPermissions = async () => {
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
        PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
          PermissionsAndroid.RESULTS.GRANTED) ||
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
// Thêm các hàm khác liên quan đến WiFi P2P ở đây
