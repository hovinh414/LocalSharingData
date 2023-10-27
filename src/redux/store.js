import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducers';

const store = configureStore({
  reducer: {
    P2P: reducers,
  },
});

export default store;
