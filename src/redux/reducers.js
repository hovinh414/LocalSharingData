import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  subscriptionOnPeersUpdates: {},
  subscriptionOnConnectionInfoUpdates: {},
  subscriptionOnThisDeviceChanged: {},
};

const p2pSlice = createSlice({
  name: 'P2P',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    updatePeersSubscription: (state, action) => {
      state.subscriptionOnPeersUpdates = action.payload;
    },
    updateConnectionInfoSubscription: (state, action) => {
      state.subscriptionOnConnectionInfoUpdates = action.payload;
    },
    updateThisDeviceSubscription: (state, action) => {
      state.subscriptionOnThisDeviceChanged = action.payload;
    },
  },
});

export const {
  setDevices,
  updatePeersSubscription,
  updateConnectionInfoSubscription,
  updateThisDeviceSubscription,
} = p2pSlice.actions;

export default p2pSlice.reducer;
