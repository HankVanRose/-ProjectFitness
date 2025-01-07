import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';

const storeOptions = {
  reducer: {
    appSlice,
  },
};

const store = configureStore(storeOptions);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

