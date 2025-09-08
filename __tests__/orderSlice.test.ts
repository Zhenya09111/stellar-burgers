import { expect, test, describe, jest } from '@jest/globals';
import { configureStore } from '@reduxjs/toolkit';
import orderSlice, {
  closeOrder,
  getFeeds,
  getOrderList,
  orderBurger
} from '../src/slice/orderSlice';
const initialState = {
  feed: { success: false, orders: [], total: 0, totalToday: 0 },
  selected: {
    _success: false,
    _orders: []
  },
  myOrder: [],
  order: {
    success: false,
    name: 'sdf',
    order: {
      _id: '111',
      status: 'done',
      name: 'dsd',
      createdAt: 'e+3',
      updatedAt: '324f',
      number: 33333,
      ingredients: ['643d69a5c3f7b9001cfa093c']
    }
  },
  orderRequest: false
};
const store = configureStore({
  reducer: {
    orderList: orderSlice.reducer
  }
});
jest.mock('../src/utils/burger-api', () => ({
  getFeedsApi: jest.fn(() => Promise.resolve(testFeed)),
  orderBurgerApi: jest.fn(() => Promise.resolve(testOrderBurger)),
  getOrdersApi: jest.fn(() => Promise.resolve(testFeed))
}));

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
test('feed', async () => {
  await store.dispatch(getFeeds());
  const { feed } = store.getState().orderList;
  expect(feed).toEqual(testFeed);
});
test('dd', async () => {
  const thunk = orderBurger({
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
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
      }
    }
  });
  expect(store.getState().orderList.orderRequest).toBe(false);
  store.dispatch(thunk);
  expect(store.getState().orderList.orderRequest).toBe(true);
  await store.dispatch(thunk);
  expect(store.getState().orderList.orderRequest).toBe(false);
  const { order } = store.getState().orderList;
  expect(order).toEqual(testOrderBurger);
});
test('getOrders', async () => {
  await store.dispatch(getOrderList());
  const { myOrder } = store.getState().orderList;
  expect(myOrder).toEqual(testFeed);
});
test('релюсер order', () => {
  const newState = orderSlice.reducer(initialState, closeOrder());
  const { order } = newState;
  expect(order).toBeNull();
});
