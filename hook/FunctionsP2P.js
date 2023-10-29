import {
  startDiscoveringPeers,
  stopDiscoveringPeers,
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
import {
  setDevices,
  updatePeersSubscription,
  updateConnectionInfoSubscription,
  updateThisDeviceSubscription,
} from '../src/redux/reducers';
import {useSelector, useDispatch} from 'react-redux';

const HandleNewPeers = ({devices}) => {
  const dispatch = useDispatch();
  // Cập nhật trạng thái Redux thông qua dispatch
  dispatch(setDevices(devices));
};

const HandleThisDeviceChanged = groupInfo => {
  // console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
};

const HandleNewInfo = info => {
  // console.log('OnConnectionInfoUpdated', info);
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
  const subscriptionOnPeersUpdates = subscribeOnPeersUpdates(HandleNewPeers);
  const subscriptionOnThisDeviceChanged = subscribeOnThisDeviceChanged(
    HandleThisDeviceChanged,
  );
  const subscriptionOnConnectionInfoUpdates =
    subscribeOnConnectionInfoUpdates(HandleNewInfo);

  try {
    dispatch(updatePeersSubscription(subscriptionOnPeersUpdates));
    dispatch(updateThisDeviceSubscription(subscriptionOnThisDeviceChanged));
    dispatch(
      updateConnectionInfoSubscription(subscriptionOnConnectionInfoUpdates),
    );
  } catch (error) {
    console.log(error, 'at initWifiP2P');
  }
};

export const startGetPeers = async () => {
  try {
    await startDiscoveringPeers();
  } catch (error) {
    console.error(error, 'at startDiscovering');
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
