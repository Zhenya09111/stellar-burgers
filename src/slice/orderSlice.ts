import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TFeedsResponse
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TBurgerConsturctorState } from './burgerConsstructorSlice';
import { TOrder } from '@utils-types';

type TOrderState = {
  feed: {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  selected: {
    _success: boolean;
    _orders: Array<TOrder>;
  };
  myOrder: Array<TOrder>;
};

const initialState: TOrderState = {
  feed: { success: false, orders: [], total: 0, totalToday: 0 },
  selected: {
    _success: false,
    _orders: []
  },
  myOrder: []
};

export const orderBurger = createAsyncThunk(
  'order/POST',
  async (data: TBurgerConsturctorState) => {
    const newArr = data.burgerConstuctor.ingredients.map((item) => item._id);
    if (data.burgerConstuctor.bun && data.burgerConstuctor.bun._id) {
      newArr.push(data.burgerConstuctor.bun._id);
    }
    return orderBurgerApi(newArr);
  }
);

export const getFeeds = createAsyncThunk('feeds/get', async () =>
  getFeedsApi()
);

export const getOrderList = createAsyncThunk('orders/getAll', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'orders/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {},
  extraReducers(Builder) {
    Builder.addCase(orderBurger.fulfilled, () => {})
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.myOrder = action.payload;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feed.orders = action.payload.orders;
        state.feed.success = action.payload.success;
        state.feed.total = action.payload.total;
        state.feed.totalToday = action.payload.totalToday;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.selected._orders = action.payload.orders;
        state.selected._success = action.payload.success;
      });
  }
});

export default orderSlice;
