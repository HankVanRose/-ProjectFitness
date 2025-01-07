import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';

const storeOptions = {
  reducer: {
    user: appSlice,
  },
};

const store = configureStore(storeOptions);

export default store;
