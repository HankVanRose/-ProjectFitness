import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import axios, { AxiosError } from 'axios';
import { UserType, UserResponseType, SessionType, UserDayType } from '../types';

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
interface SigninSuccessResponse {
  success: true;
  user: UserType;
  accessToken: string;
}

interface SigninErrorResponse {
  success: false;
  message: string;
}

type SigninResponse = SigninSuccessResponse | SigninErrorResponse;

const fetchUserSignin = createAsyncThunk<
  { user?: UserType; success?: boolean; error?: string },
  Pick<UserType, 'email' | 'password'>
>('user/signin', (user) => {
  return axios
    .post<SigninResponse>(
      `http://localhost:3000${import.meta.env.VITE_API}/auth/signin`,
      user,
      {
        withCredentials: true,
      }
    ) //! эт пиздец
    .then((response) => {
      if (response?.data?.success) {
        setAccessToken(response.data.accessToken);
        return {
          user: response.data.user,
          success: true,
        };
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message;
        return {
          success: false,
          error: errorMessage,
        };
      }

      return {
        success: false,
        error:
          'Произошла ошибка, пожалуйста, повторите ещё раз или попробуйте попозже.',
      };
    });
});

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
      // console.log('Отправляемые данные:', filteredData);
      const response = await axiosInstance.patch<UserResponseType>(
        `${import.meta.env.VITE_API}/auth/profile`,
        filteredData,
      );
      console.log('Ответ от сервера:', response);
      if (response.status >= 400) {
        return rejectWithValue(
          response.data.message || 'Ошибка при обновлении профиля'
        );
      }
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      // console.error('Ошибка в fetchUpdateProfile:', error);
      // console.log('error.toJSON():', error.toJSON());
      // console.log('error.response:', error.response);

      if (error instanceof AxiosError && error.response?.data) {
        return rejectWithValue(error.response.data.message);
      }
      console.error('Ошибка в fetchUpdateProfile:', error);
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
>('user/activeplans', async (userId: number, { rejectWithValue }) => {
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

const fetchUserProgress = createAsyncThunk(
  'user/progress',
  async (userId: number, { rejectWithValue }) => {
    try {
      const responseUserPlans = await axiosInstance.get<SessionType[]>(
        `${import.meta.env.VITE_API}/session/plans/${userId}`
      );
      const sessions = responseUserPlans.data;

      const responseUserDays = await axiosInstance.get<UserDayType[]>(
        `${import.meta.env.VITE_API}/userdays/all/${userId}`
      );
      const userDays = responseUserDays.data;
      return { sessions, userDays };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('An unexpected error occurred');
    }
  }
);
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
  fetchUserProgress,
};
