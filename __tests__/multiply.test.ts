import { TOrder } from './../src/utils/types';
import { UnknownAction } from 'redux';
import { rootReducer } from './../src/services/store';
import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import ingredientSlice, {
  getIngredients
} from './../src/slice/ingredientsSlice';
import userSlice, { loginUser } from '../src/slice/userSlice';
import orderSlice, { getFeeds, orderBurger } from '../src/slice/orderSlice';
const testData = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

const testFeed = {
  success: true,
  orders: [
    {
      _id: '111',
      status: 'done',
      name: 'dsd',
      createdAt: 'e+3',
      updatedAt: '324f',
      number: 33333,
      ingredients: ['643d69a5c3f7b9001cfa093c']
    }
  ],
  total: 3343,
  totalToday: 333
};

const testUser = {
  success: true,
  refreshToken: 'ttt',
  accessToken: 'ttt',
  user: {
    email: 'ggg',
    name: 'ddd'
  }
};

const testOrderBurger = {
  success: true,
  order: {
    _id: '111',
    status: 'done',
    name: 'dsd',
    createdAt: 'e+3',
    updatedAt: '324f',
    number: 33333,
    ingredients: ['643d69a5c3f7b9001cfa093c']
  },
  name: 'gggg'
};

jest.mock('../src/utils/burger-api', () => ({
  getIngredientsApi: jest.fn(() => Promise.resolve(testData)),
  getFeedsApi: jest.fn(() => Promise.resolve(testFeed)),
  loginUserApi: jest.fn(() => Promise.resolve(testUser)),
  orderBurgerApi: jest.fn(() => Promise.resolve(testOrderBurger))
}));

test('инициализация корневого редюсера', () => {
  const emptyAction: UnknownAction = { type: 'UNKNOWACTION' };
  const newReducer = rootReducer(undefined, emptyAction);
  expect(newReducer).toMatchObject({
    ingredients: {
      ingredients: [],
      buns: [],
      sauces: [],
      mains: [],
      success: false,
      isIngredientsLoading: false
    },
    user: { user: { name: '', email: '' }, isAuth: false },
    burger: { burgerConstuctor: { bun: undefined, ingredients: [] } },
    orderList: {
      feed: { success: false, orders: [], total: 0, totalToday: 0 },
      selected: { _success: false, _orders: [] },
      myOrder: [],
      order: null,
      orderRequest: false
    }
  });
});

test('получение ингредиентов', async () => {
  const store = configureStore({
    reducer: {
      ingredients: ingredientSlice.reducer
    }
  });
  await store.dispatch(getIngredients());
  const { ingredients } = store.getState().ingredients;
  expect(ingredients).toEqual(testData);
});
test('feed', async () => {
  const store = configureStore({
    reducer: {
      orderList: orderSlice.reducer
    }
  });
  await store.dispatch(getFeeds());
  const { feed } = store.getState().orderList;
  expect(feed).toEqual(testFeed);
});
test('user', async () => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer
    }
  });
  await store.dispatch(loginUser({ email: 'kk', password: 'ee' }));
  const { user } = store.getState().user;
  expect(user).toEqual(testUser.user);
});
test('order', async () => {
  const store = configureStore({
    reducer: {
      orderList: orderSlice.reducer
    }
  });
  await store.dispatch(
    orderBurger({
      burgerConstuctor: {
        ingredients: ['123', '1234'],
        bun: {
          _id: '643d69a5c3f7b9001cfa093c',
          name: 'Краторная булка N-200i',
          type: 'bun',
          proteins: 80,
          fat: 24,
          carbohydrates: 53,
          calories: 420,
          price: 1255,
          image: 'https://code.s3.yandex.net/react/code/bun-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
        }
      }
    })
  );
  const { order } = store.getState().orderList;
  expect(order).toEqual(testOrderBurger);
});
