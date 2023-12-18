import {
  startDiscoveringPeers,
  stopDiscoveringPeers,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  getConnectionInfo,
  getGroupInfo,
} from 'react-native-wifi-p2p';
import {
  setDevices,
  updatePeersSubscription,
  updateConnectionInfoSubscription,
  updateThisDeviceSubscription,
} from '../src/redux/reducers';

const handleNewPeers = ({devices}, dispatch) => {
  // Cập nhật trạng thái Redux thông qua dispatch
  dispatch(setDevices(devices.devices));
};

const handleThisDeviceChanged = (groupInfo, dispatch) => {
  // console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
};

const handleNewInfo = (info, dispatch) => {
  // console.log('OnConnectionInfoUpdated', info);
};

export const onConnect = (navigation, device) => {
  console.log('Connect to: ', device.deviceAddress);
  connect(device.deviceAddress)
    .then(() => console.log('Successfully connected'))
    .catch(err => console.error('Something gone wrong. Details: ', err));

  navigation.navigate('Chat Detail', {item: device, check: true});
};

export const onCancelConnect = () => {
  cancelConnect()
    .then(() =>
      console.log('cancelConnect', 'Connection successfully canceled'),
    )
    .catch(err =>
      console.error('cancelConnect', 'Something gone wrong. Details: ', err),
    );
};

export const onCreateGroup = () => {
  createGroup()
    .then(() => console.log('Group created successfully!'))
    .catch(err => console.error('Something gone wrong. Details: ', err));
};

export const onRemoveGroup = () => {
  removeGroup()
    .then(() => console.log("Currently you don't belong to group!"))
    .catch(err => console.error('Something gone wrong. Details: ', err));
  startDiscoveringPeers();
};

export const onStopInvestigation = () => {
  stopDiscoveringPeers()
    .then(() => console.log('Stopping of discovering was successful'))
    .catch(err =>
      console.error(
        'Something is gone wrong. Maybe your WiFi is disabled? Error details',
        err,
      ),
    );
};

export const onStartInvestigate = () => {
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

export const onGetAvailableDevices = dispatch => {
  getAvailablePeers().then(peers => {
    dispatch(setDevices(peers.devices));
  });
};

export const onGetConnectionInfo = async () => {
  try {
    const info = await getConnectionInfo();
    console.log('getConnectionInfo', info);
    return info;
  } catch (error) {
    console.error('Error getting connection info:', error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};

export const onGetGroupInfo = async () => {
  try {
    const info = await getGroupInfo();
    console.log('getGroupInfo', info);
    return info;
  } catch (error) {
    console.error('Error getting group info:', error);
    throw error;
  }
};

export const initWifiP2P = async dispatch => {
  const subscriptionOnPeersUpdates = subscribeOnPeersUpdates(devices => {
    handleNewPeers({devices}, dispatch);
  });
  const subscriptionOnThisDeviceChanged = subscribeOnThisDeviceChanged(
    groupInfo => {
      handleThisDeviceChanged(groupInfo, dispatch);
    },
  );
  const subscriptionOnConnectionInfoUpdates = subscribeOnConnectionInfoUpdates(
    info => {
      handleNewInfo(info, dispatch);
    },
  );

  try {
    dispatch(updatePeersSubscription(subscriptionOnPeersUpdates));
    dispatch(updateThisDeviceSubscription(subscriptionOnThisDeviceChanged));
    dispatch(
      updateConnectionInfoSubscription(subscriptionOnConnectionInfoUpdates),
    );

    const status = await startDiscoveringPeers();
    console.log('startDiscoveringPeers status: ', status);
  } catch (error) {
    console.log(error, 'at initWifiP2P');
  }
};

export const cleanUpWifiP2P = dispatch => {
  if (dispatch.subscriptionOnPeersUpdates) {
    dispatch.subscriptionOnPeersUpdates.remove();
  }
  if (dispatch.subscriptionOnConnectionInfoUpdates) {
    dispatch.subscriptionOnConnectionInfoUpdates.remove();
  }
  if (dispatch.subscriptionOnThisDeviceChanged) {
    dispatch.subscriptionOnThisDeviceChanged.remove();
  }
};
