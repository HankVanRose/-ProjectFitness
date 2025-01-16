import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ExercisesType,
  PlansType,
  SessionType,
  UserDayType,
  UserType,
} from '../types';
import {
  fetchUpdateProfile,
  fetchUserCheck,
  fetchUserLogout,
  fetchUserProgress,
  fetchUserSignin,
  fetchUserSignup,
  userActivePlan,
} from './thunkActions';
import { RootState } from './store';

type InitialState = {
  user: UserType | null;
  exercises: ExercisesType;
  plans: PlansType;
  loading: boolean;
  error: string | null;
  userplan: SessionType[] | null;
  userDays: UserDayType[];
  sessions: SessionType[];
};

const initialState: InitialState = {
  user: null,
  exercises: [] as ExercisesType,
  plans: [] as PlansType,
  loading: false,
  error: '',
  userplan: null,
  userDays: [],
  sessions: [],
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
    setCalories: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.calories += action.payload;
        console.log('Updated calories:', state.user.calories);
      } else {
        console.warn('User not found! Calories not updated.');
      }
    },
    setUserplan: (state, action) => {
      state.userplan = action.payload;
    },
    setDayStatus: (
      state,
      action: PayloadAction<{
        dayId: number;
        userId: number;
        isCompleted: boolean;
      }>
    ) => {
      const { dayId, userId, isCompleted } = action.payload;
      const existingDay = state.userDays.find(
        (day) => day.dayId === dayId && day.userId === userId
      );
      if (existingDay) {
        existingDay.isCompleted = isCompleted;
      } else {
        state.userDays.push({
          userId,
          dayId,
          isCompleted,
        });
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
        state.loading = false;
        if ('error' in action.payload && action.payload.error) {
          state.error = action.payload.error;
        } else {
          state.user = action.payload.user || null;
          state.error = null;
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
      })

      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.sessions = action.payload.sessions;
        state.userDays = action.payload.userDays;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default appSlice.reducer;
export const {
  setError,
  setLoading,
  setPoints,
  setUserplan,
  setCalories,
  setDayStatus,
} = appSlice.actions;
