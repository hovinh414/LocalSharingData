import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({
  reducer: {
    P2P: reducers,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;
