import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ExercisesType,
  PlansType,
  UserPlan,
  UserPlans,
  UserType,
} from '../types';
import {
  fetchUpdateProfile,
  fetchUserCheck,
  fetchUserLogout,
  fetchUserSignin,
  fetchUserSignup,
  userActivePlan,
} from './thunkActions';

type InitialState = {
  user: UserType | null;
  exercises: ExercisesType;
  plans: PlansType;
  loading: boolean;
  error: string | null;
  userplan: string[];
};

const initialState: InitialState = {
  user: null,
  exercises: [] as ExercisesType,
  plans: [] as PlansType,
  loading: false,
  error: '',
  userplan: [],
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserSignup.fulfilled, (state, action) => {
        if ('error' in action.payload && action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
        } else {
          if (action.payload.user) {
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
          }
        }
      })

      .addCase(fetchUserSignin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserSignin.fulfilled, (state, action) => {
        if ('error' in action.payload && action.payload.error) {
          state.error = action.payload.error;
          state.loading = false;
        } else {
          if (action.payload.user) {
            state.user = action.payload.user;
            state.loading = false;
            state.error = null;
          }
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
        console.log('Action payload:', action.payload);

        if (!action.payload) {
          state.error = 'No data from the server';
          state.loading = false;
          return;
        }

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
      })
      .addCase(userActivePlan.fulfilled, (state, action) => {
        state.userplan = [...action.payload];

        state.loading = false;
      })
      .addCase(userActivePlan.pending, (state) => {
        state.loading = true;
      });
  },
});

export default appSlice.reducer;
export const { setError, setLoading } = appSlice.actions;
