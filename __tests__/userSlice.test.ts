import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userSlice, {
  loginUser,
  setIsAuthChecked,
  setUser
} from '../src/slice/userSlice';
const testUser = {
  user: {
    email: 'ggg',
    name: 'ddd'
  },
  isAuth: true
};
const initialState = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false
};

test('user', async () => {
  const action = { type: loginUser.fulfilled.type, payload: testUser };
  const newState = userSlice.reducer(initialState, action);
  expect(newState.user).toEqual(testUser.user);
});
describe('тест редюсера', () => {
  const initialStateUser = {
    user: {
      name: '',
      email: ''
    },
    isAuth: false
  };
  test('добавление пользователя', () => {
    const newState = userSlice.reducer(
      initialStateUser,
      setUser({ ...testUser.user })
    );
    const { name, email } = newState.user;
    expect(name).toEqual(testUser.user.name);
    expect(email).toEqual(testUser.user.email);
  });
  test('проверка флага аутификации', () => {
    const newState = userSlice.reducer(
      initialStateUser,
      setIsAuthChecked(true)
    );
    const { isAuth } = newState;
    expect(isAuth).toBe(true);
  });
});
