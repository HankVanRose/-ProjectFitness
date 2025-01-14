import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExercisesType, PlansType, SessionType, UserType } from '../types';
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
  userplan: SessionType[] | null;
};

const initialState: InitialState = {
  user: null,
  exercises: [] as ExercisesType,
  plans: [] as PlansType,
  loading: false,
  error: '',
  userplan: null,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state, action) => {
      state.user = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.points += action.payload;
        console.log('Updated points:', state.user.points);
      } else {
        console.warn('User not found! Points not updated.');
      }
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

      .addCase(fetchUserCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCheck.fulfilled, (state, action) => {
        state.user = action.payload; //? (|| null)
        state.loading = false;
        state.error = null;
         
      })
      .addCase(fetchUserCheck.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchUpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpdateProfile.fulfilled, (state, action) => {
        if (state.user) {
 
          state.user = action.payload.user;
         } 
          state.loading = false;
          state.error = null;
 
      })
      .addCase(fetchUpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(userActivePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.userplan = action.payload;
      })
      .addCase(userActivePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userActivePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An unexpected error';
        state.userplan = null;
      });
  },
});

export default appSlice.reducer;
export const { setError, setLoading, setPoints } = appSlice.actions;
