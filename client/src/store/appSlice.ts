import { createSlice } from '@reduxjs/toolkit';
import { Exercises, Plans, User } from '../types';
// import { fetchAddTask, fetchDeleteTask, fetchTasks } from './thunkActions';

type InitialState = {
  user: User;
  exercises: Exercises;
  plans: Plans;
  isLoading: boolean;
  error: string;
};

const initialState: InitialState = {
  user: {} as User,
  exercises: [],
  plans: [],
  isLoading: false,
  error: '',
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchTasks.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchTasks.rejected, (state) => {
    //   state.error = 'Не удалось получить все записи';
    // });
    // builder.addCase(fetchTasks.fulfilled, (state, action) => {
    //   state.tasks = action.payload;
    //   state.isLoading = false;
    // });
    // builder.addCase(fetchDeleteTask.fulfilled, (state, action) => {
    //   state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    // });
    // builder.addCase(fetchAddTask.fulfilled, (state, action) => {
    //   state.tasks.push(action.payload);
    // });
  },
});

export default appSlice.reducer;
// export const { increment, decrement, changeCount } = appSlice.actions;
