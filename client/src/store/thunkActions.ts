import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { AxiosError } from 'axios';
import { UserType, UserResponseType } from '../types';

const fetchUserSignup = createAsyncThunk(
  'user/signup',
  async (user: Pick<UserType, 'email' | 'password' | 'username'>) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        `${import.meta.env.VITE_API}/auth/signup`,
        user
      );
      setAccessToken(response.data.accessToken);
      return response.data.user;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return { error: error.response.data.message as string };
      }
      return { error: 'An unexpected error occurred' };
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
      return response.data.user;
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

export { fetchUserSignup, fetchUserSignin, fetchUserLogout, fetchUserCheck };
