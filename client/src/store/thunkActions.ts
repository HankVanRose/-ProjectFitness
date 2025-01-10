import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { AxiosError } from 'axios';
import { UserType, UserResponseType, SessionType, UserPlans } from '../types';

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
      return { error: 'An unexpected error occurred' }; // Returns string instead of undefined
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
      return { error: 'An unexpected error occurred' };
    }
  }
);

const fetchUserLogout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.get(`${import.meta.env.VITE_API}/auth/signout`);
  setAccessToken('');
});

const fetchUserCheck = createAsyncThunk('user/check', async () => {
  const response = await axiosInstance.get<UserResponseType>(
    `${import.meta.env.VITE_API}/tokens/refresh`
  );
  setAccessToken(response.data.accessToken);
  return response.data.user;
});

const fetchUpdateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: UserType) => {
    try {
      const response = await axiosInstance.patch<UserType>(
        `${import.meta.env.VITE_API}/auth/profile`,
        profileData
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return { error: error.response.data.message as string };
      }
      return { error: 'An unexpected error occurred' };
    }
  }
);

const userActivePlan = createAsyncThunk('user/activeplans', async (userId) => {
  const response = await axiosInstance.get<UserPlans>(
    `${import.meta.env.VITE_API}/session/plans/${userId}`
  );
  return response.data
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
