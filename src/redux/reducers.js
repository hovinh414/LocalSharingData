import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  subscriptionOnPeersUpdates: {},
  subscriptionOnConnectionInfoUpdates: {},
  subscriptionOnThisDeviceChanged: {},
};

const slice = createSlice({
  name: 'P2P',
  initialState,
  reducers: {},
});

export default slice.reducer;
