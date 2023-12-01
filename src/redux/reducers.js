import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  user: {},
  subscriptionOnPeersUpdates: {},
  subscriptionOnConnectionInfoUpdates: {},
  subscriptionOnThisDeviceChanged: {},
  darkMode: false,
  taskList: [],
};

const p2pSlice = createSlice({
  name: 'P2P',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
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

    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setTaskList: (state, action) => {
      state.taskList = action.payload;
    },
    setTodoTask: (state, action) => {
      state.todoTask = action.payload;
    },
  },
});

export const {
  setDevices,
  setUser,
  updatePeersSubscription,
  updateConnectionInfoSubscription,
  updateThisDeviceSubscription,
  setDarkMode,
  setTaskList,
  setTodoTask,
} = p2pSlice.actions;

export default p2pSlice.reducer;