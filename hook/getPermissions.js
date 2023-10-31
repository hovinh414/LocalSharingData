import { initialize } from 'react-native-wifi-p2p';
import { PermissionsAndroid, Platform } from 'react-native';

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

export const GetStoragePermissions = async () => {
  try {
    if (Platform.Version >= 33) {
      const permissions = [PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO]

      const granted = await PermissionsAndroid.requestMultiple(permissions)

      if (granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] === PermissionsAndroid.RESULTS.GRANTED
        && granted[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      else {
        console.log('Permission denied: READ_MEDIA_IMAGES & READ_MEDIA_VIDEO will not work');
        return false
      }
    }
    else {
      const permissions = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE

      const granted = await PermissionsAndroid.request(permissions)

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      }
      else {
        console.log('Permission denied: READ_EXTERNAL_STORAGE will not work');
        return false
      }
    }
  }
  catch (err) {
    console.log(err)
  }
}