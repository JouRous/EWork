import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'services/axios-instance';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (data: any, thunkAPI) => {
    const res = await axios.post('/api/v1/auth/login', data);
    return res.data;
  }
);
