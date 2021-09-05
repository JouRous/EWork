import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../../services/http-service';

export const loginAction = createAsyncThunk(
  'auth/login',
  async (data: any, thunkAPI) => {
    const res = await http.post('/api/v1/auth/login', data);

    return res.data;
  }
);
