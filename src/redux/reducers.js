import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  subscriptionOnPeersUpdates: {},
  subscriptionOnConnectionInfoUpdates: {},
  subscriptionOnThisDeviceChanged: {},
  selectedImages: [],
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
    selectedImagesList: (state, action) => {
      const check = state.selectedImages.find(image => image.node.image.filename === action.payload.node.image.filename)
        // const check = state.selectedImages.find(image => image.node.timestamp === action.payload.node.timestamp)
        
        if (check) {
        state.selectedImages = state.selectedImages.filter(image => image.node.image.filename !== action.payload.node.image.filename)
      }
      else {
        state.selectedImages.push(action.payload)
      }

      // console.log(state.selectedImages)
    },
    removeAllSelectedImages: state => {
      state.selectedImages = [];
    },
  },
});

export const {
  setDevices,
  updatePeersSubscription,
  updateConnectionInfoSubscription,
  updateThisDeviceSubscription,
  selectedImagesList,
  removeAllSelectedImages,
} = p2pSlice.actions;

export default p2pSlice.reducer;
