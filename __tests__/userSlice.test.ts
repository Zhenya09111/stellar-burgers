import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import userSlice, { loginUser, setIsAuthChecked, setUser } from '../src/slice/userSlice';
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
});
jest.mock('../src/utils/burger-api', () => ({
  loginUserApi: jest.fn(() => Promise.resolve(testUser))
}));
const testUser = {
  success: true,
  refreshToken: 'ttt',
  accessToken: 'ttt',
  user: {
    email: 'ggg',
    name: 'ddd'
  }
};
test('user', async () => {
  await store.dispatch(loginUser({ email: 'Evgeniy', password: 'ee@mail.ru' }));
  const { user } = store.getState().user;
  expect(user).toEqual(testUser.user);
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
