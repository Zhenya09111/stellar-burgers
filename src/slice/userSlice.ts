import {
  getUserApi,
  isTokenExists,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from './../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../utils/cookie';

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

// export const registerUser = createAsyncThunk(
//   'user/registration',
//   registerUserApi
// );

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });
    return data;
  }
);

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(setUser({ user: { email: '', name: '' } }));
      dispatch(setIsAuthChecked(false));
    });
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      getUserApi()
        .then((data) => dispatch(setUser(data.user)))
        .then(() => dispatch(setIsAuthChecked(true)))
        .catch(() => dispatch(setIsAuthChecked(false)));
    } else {
      dispatch(setIsAuthChecked(false));
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/update',
  async (userData: Partial<TRegisterData>, { dispatch }) => {
    updateUserApi(userData).then((data) => {
      dispatch(setUser({ ...data }));
    });
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    newData: (state, data) => {
      Object.assign(state.user, data.payload);
    },
    setUser: (state, data) => {
      state.user = data.payload;
    },
    setIsAuthChecked: (state, data) => {
      state.isAuth = data.payload;
    }
  },
  extraReducers(builder) {
    builder
      // .addCase(registerUser.fulfilled, () => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
        state.isAuth = true;
      });
    // .addCase(logout.fulfilled, (state, action) => {
    //   state.isAuth = false;
    //   state.user.name = '';
    //   state.user.email = '';
    // })
    // .addCase(updateUser.fulfilled, () => {});
  }
});

export default userSlice;
export const { newData, setUser, setIsAuthChecked } = userSlice.actions;
