import { createSlice } from '@reduxjs/toolkit';
import { ExercisesType, PlansType, UserType } from '../types';
import {
  fetchUpdateProfile,
  fetchUserCheck,
  fetchUserLogout,
  fetchUserSignin,
  fetchUserSignup,
} from './thunkActions';
import { FaHouseFloodWaterCircleArrowRight } from 'react-icons/fa6';

type InitialState = {
  user: UserType | null;
  exercises: ExercisesType;
  plans: PlansType;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  user: null,
  exercises: [] as ExercisesType,
  plans: [] as PlansType,
  loading: false,
  error: '',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSignup.fulfilled, (state, action) => {
        if ('error' in action.payload && action.payload.error) {
          state.error = action.payload.error;
          state.user = null;
          state.loading = false;
        } else {
          state.user = action.payload as UserType;
          state.loading = false;
          state.error = null;
        }
      })

      .addCase(fetchUserSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSignin.fulfilled, (state, action) => {
        if ('error' in action.payload && action.payload.error) {
          state.error = action.payload.error;
          state.user = null;
          state.loading = false;
        } else {
          state.user = action.payload as UserType;
          state.loading = false;
          state.error = null;
        }
      })

      .addCase(fetchUserLogout.fulfilled, (state) => {
        state.user = initialState.user;
      })

      .addCase(fetchUserCheck.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })

      .addCase(fetchUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
        if ('error' in action.payload && action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
        } else {
          if (state.user) {
            const updatedUser = {
              ...state.user,
              ...action.payload,
            } as UserType;
            updatedUser.id = state.user.id;
            state.user = updatedUser;
          }
          state.loading = false;
          state.error = null;
        }
      })
      .addCase(fetchUpdateProfile.rejected, (state) => {
        state.error = 'failed to update profile';
        state.loading = false;
      });
  },
});

export default appSlice.reducer;
// export const { increment, decrement, changeCount } = appSlice.actions;
