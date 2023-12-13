import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  devices: [],
  user: {
    deviceName: '',
    img: null,
    available: false,
    connection: {
      groupFormed: false,
      groupOwnerAddress: null,
      isGroupOwner: false,
    },
  },
  subscriptionOnPeersUpdates: {},
  subscriptionOnConnectionInfoUpdates: {},
  subscriptionOnThisDeviceChanged: {},
  darkMode: false,
  taskList: [],
  chatId: '',
};

const p2pSlice = createSlice({
  name: 'P2P',
  initialState,
  reducers: {
    setDevices: (state, action) => {
      state.devices = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    updateConnection: (state, action) => {
      state.user.connection = {
        ...state.user.connection,
        ...action.payload,
      };
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
    setCompletedTask: (state, action) => {
      state.completed = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    }
  },
});

export const {
  setDevices,
  updateUser,
  updateConnection,
  updatePeersSubscription,
  updateConnectionInfoSubscription,
  updateThisDeviceSubscription,
  setDarkMode,
  setTaskList,
  setTodoTask,
  setCompletedTask,
  setChatId
} = p2pSlice.actions;

export default p2pSlice.reducer;
