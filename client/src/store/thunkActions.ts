import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAccessToken } from '../axiosInstance';
import { AxiosError } from 'axios';
import { User, UserResponseType } from '../types';
const api = import.meta.env.VITE_API;

const fetchUserSignup = createAsyncThunk(
  'user/signup',
  async (user: Pick<User, 'email' | 'password' | 'username'>) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        `${api}/auth/signup`,
        user
      );
      setAccessToken(response.data.accessToken);
      return { user: response.data.user };
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
  async (user: Pick<User, 'email' | 'password'>) => {
    try {
      const response = await axiosInstance.post<UserResponseType>(
        `${api}/auth/signin`,
        user
      );
      setAccessToken(response.data.accessToken);
      return { user: response.data.user };
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data) {
        return { error: error.response.data.message as string };
      }
      return { error: 'An unexpected error occurred' };
    }
  }
);

const fetchUserLogout = createAsyncThunk('user/logout', async () => {
  await axiosInstance.get(`${api}/auth/logout`);
  setAccessToken('');
});

const fetchUserCheck = createAsyncThunk('user/check', async () => {
  const response = await axiosInstance.get<UserResponseType>(
    `${api}/tokens/refresh`
  );
  setAccessToken(response.data.accessToken);
  return response.data.user;
});

export { fetchUserSignup, fetchUserSignin, fetchUserLogout, fetchUserCheck };
