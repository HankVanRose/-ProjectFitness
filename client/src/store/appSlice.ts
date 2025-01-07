import { createSlice } from '@reduxjs/toolkit';
import { ExercisesType, PlansType, UserType } from '../types';
import { fetchUserCheck, fetchUserLogout, fetchUserSignin, fetchUserSignup } from './thunkActions';
// import { fetchAddTask, fetchDeleteTask, fetchTasks } from './thunkActions';

type InitialState = {
  user: UserType;
  exercises: ExercisesType;
  plans: PlansType;
  loading: boolean;
  error: string | null;
};

const initialState: InitialState = {
  user: {} as UserType,
  exercises: [] as ExercisesType,
  plans: [] as PlansType,
  loading: false,
  error: '',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserSignup.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      fetchUserSignup.fulfilled,
      (state, action) => {
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
      }
    )
    .addCase(fetchUserSignin.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      fetchUserSignin.fulfilled,
      (state, action) => {
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
      }
    )
    .addCase(fetchUserLogout.fulfilled, (state) => {
      state.user = initialState.user;
    })
    .addCase(fetchUserCheck.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export default appSlice.reducer;
// export const { increment, decrement, changeCount } = appSlice.actions;
