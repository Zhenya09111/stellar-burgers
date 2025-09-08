import { UnknownAction } from 'redux';
import { rootReducer } from '../src/services/store';
import { expect, test, describe, jest } from '@jest/globals';

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
