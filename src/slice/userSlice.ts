import { forgotPasswordApi, updateUserApi } from './../utils/burger-api';
import {
  fetchWithRefresh,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';
const URL = process.env.BURGER_API_URL;

type TUserState = {
  user: { name: string; email: string };
  isAuth: boolean;
};

const initialState: TUserState = {
  user: {
    name: '',
    email: ''
  },
  isAuth: false
};

export const registerUser = createAsyncThunk(
  'user/registration',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const getUser = createAsyncThunk('user/getAuth', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (data: Partial<TRegisterData>) => {
    updateUserApi(data);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newData: (state, data) => {
      Object.assign(state.user, data.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, () => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuth = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.isAuth = action.payload.success;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(updateUser.fulfilled, () => {});
  }
});

export default userSlice;
export const { newData } = userSlice.actions;
