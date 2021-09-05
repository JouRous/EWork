import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../../models/user';
import { loginAction } from './asyncActions';

export interface IAuthState {
  user: IUser | null;
  accessToken: string | null;
}

const initialState = { user: null, accessToken: null } as IAuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => ({
      accessToken: action.payload?.token,
      user: action.payload?.user,
    }));
  },
});

export default authSlice.reducer;
