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
import {useSelector, useDispatch} from 'react-redux';

const HandleNewPeers = ({devices}, dispatch) => {
  // Cập nhật trạng thái Redux thông qua dispatch
  dispatch(setDevices(devices.devices));
};

const HandleThisDeviceChanged = (groupInfo, dispatch) => {
  // console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
};

const HandleNewInfo = (info, dispatch) => {
  // console.log('OnConnectionInfoUpdated', info);
};

export const onConnect = (navigation, device) => {
  console.log('Connect to: ', device.deviceAddress);
  connect(device.deviceAddress)
    .then(() => console.log('Successfully connected'))
    .catch(err => console.error('Something gone wrong. Details: ', err));
  const itemWithIsOwner = {...device, isOwner: false};
  navigation.navigate('Chat Detail', itemWithIsOwner);
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

export const onGetConnectionInfo = () => {
  getConnectionInfo().then(info => console.log('getConnectionInfo', info));
};

export const onGetGroupInfo = () => {
  getGroupInfo().then(info => console.log('getGroupInfo', info));
};

export const InitWifiP2P = async dispatch => {
  const subscriptionOnPeersUpdates = subscribeOnPeersUpdates(devices => {
    HandleNewPeers({devices}, dispatch);
  });
  const subscriptionOnThisDeviceChanged = subscribeOnThisDeviceChanged(
    groupInfo => {
      HandleThisDeviceChanged(groupInfo, dispatch);
    },
  );
  const subscriptionOnConnectionInfoUpdates = subscribeOnConnectionInfoUpdates(
    info => {
      HandleNewInfo(info, dispatch);
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

export const cleanUpWifiP2P = (
  subscriptionOnPeersUpdates,
  subscriptionOnConnectionInfoUpdates,
  subscriptionOnThisDeviceChanged,
) => {
  subscriptionOnPeersUpdates.remove();
  subscriptionOnConnectionInfoUpdates.remove();
  subscriptionOnThisDeviceChanged.remove();
};
