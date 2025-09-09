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
test('feed', () => {
  const action = { type: getFeeds.fulfilled.type, payload: testFeed };
  const newState = orderSlice.reducer(initialState, action);
  expect(newState.feed.orders).toEqual(testFeed.orders);
  expect(newState.feed.success).toEqual(true);
  expect(newState.feed.total).toEqual(testFeed.total);
  expect(newState.feed.totalToday).toEqual(testFeed.totalToday);
});
const testBurger = {
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
}
test('get orderList', () => {
  const action = { type: orderBurger.pending.type };
  const newState = orderSlice.reducer(initialState, action);
  expect(newState.orderRequest).toBe(true);
});
test('get orderList fullfilled', () => {
  const action = { type: orderBurger.fulfilled.type, payload: testBurger };
  const newState = orderSlice.reducer(initialState, action);
  expect(newState.orderRequest).toBe(false);
  expect(newState.order).toEqual(testBurger);
});
test('getOrders', async () => {
  const action = { type: getOrderList.fulfilled.type, payload: testFeed}
  const newState = orderSlice.reducer(initialState, action);
  expect(newState.myOrder).toEqual(testFeed);
});
test('релюсер order', () => {
  const newState = orderSlice.reducer(initialState, closeOrder());
  const { order } = newState;
  expect(order).toBeNull();
});
