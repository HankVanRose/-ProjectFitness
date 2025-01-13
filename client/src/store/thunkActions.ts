import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { AxiosError } from 'axios';
import { UserType, UserResponseType, SessionType } from '../types';

const fetchUserSignup = createAsyncThunk(
  'user/signup',
  async (user: Pick<UserType, 'email' | 'password' | 'username'>) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        `${import.meta.env.VITE_API}/auth/signup`,
        user
      );
      setAccessToken(response.data.accessToken);
      return { user: response.data.user, success: response.data.success };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return { error: error.response.data.message as string };
      }
      return {
        error:
          'Произошла ошибка, пожалуйста, повторите ещё раз или попробуйте попозже.',
      };
    }
  }
);
const fetchUserSignin = createAsyncThunk(
  'user/signin',
  async (user: Pick<UserType, 'email' | 'password'>) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        `${import.meta.env.VITE_API}/auth/signin`,
        user
      );
      setAccessToken(response.data.accessToken);
      return { user: response.data.user, success: response.data.success };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return { error: error.response.data.message as string };
      }
      return {
        error:
          'Произошла ошибка, пожалуйста, повторите ещё раз или попробуйте попозже.',
      };
    }
  }
);

const fetchUserLogout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.get(`${import.meta.env.VITE_API}/auth/signout`);
  setAccessToken('');
});

const fetchUserCheck = createAsyncThunk(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<UserResponseType>(
        `${import.meta.env.VITE_API}/tokens/refresh`
      );
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data.message || 'Ошибка при проверке пользователя'
        );
      }
      return rejectWithValue('Неизвестная ошибка');
    }
  }
);

const fetchUpdateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<UserType>, { rejectWithValue }) => {
    try {
      const filteredData = Object.fromEntries(
        Object.entries(profileData).filter(
          ([_, value]) => value !== null && value !== undefined && value !== ''
        )
      );

      if ('password' in filteredData && filteredData.password === '') {
        delete filteredData.password;
      }

      const response = await axiosInstance.patch<UserType>(
        `${import.meta.env.VITE_API}/auth/profile`,
        filteredData
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        'Произошла ошибка, пожалуйста, повторите ещё раз или попробуйте попозже.'
      );
    }
  }
);

const userActivePlan = createAsyncThunk<
  SessionType[], // успех
  number, // тип аргумента
  { rejectValue: string } //тип ошибки
>('user/activeplans', async (userId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<SessionType[]>(
      `${import.meta.env.VITE_API}/session/plans/${userId}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('An unexpected error occurred');
  }
});

// const fetchExercises = createAsyncThunk('exercises', async () => {
//   try {
//     const response = await axiosInstance.get<PlanType>(
//       `${import.meta.env.VITE_API}`
//     )
//   } catch (error) {

//   }
// })

export {
  fetchUserSignup,
  fetchUserSignin,
  fetchUserLogout,
  fetchUserCheck,
  fetchUpdateProfile,
  userActivePlan,
};
