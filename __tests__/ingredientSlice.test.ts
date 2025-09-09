import { expect, test, describe, jest } from '@jest/globals';
import ingredientSlice, { getIngredients } from '../src/slice/ingredientsSlice';
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
describe('ingredientSlice', () => {
  test('getIngredients pending', () => {
    const initialState = {
      ingredients: [],
      success: false,
      isIngredientsLoading: false,
      buns: [],
      sauces: [],
      mains: []
    };

    const action = { type: getIngredients.pending.type };
    const newState = ingredientSlice.reducer(initialState, action);

    expect(newState.isIngredientsLoading).toBe(true);
    expect(newState.success).toBe(false);
  });

  test('getIngredients fulfilled', () => {
    const initialState = {
      ingredients: [],
      success: false,
      isIngredientsLoading: false,
      buns: [],
      sauces: [],
      mains: []
    };

    const action = { type: getIngredients.fulfilled.type, payload: testData };
    const newState = ingredientSlice.reducer(initialState, action);

    expect(newState.success).toBe(true);
    expect(newState.isIngredientsLoading).toBe(false);
    expect(newState.ingredients).toEqual(testData);
    expect(newState.buns).toEqual([testData[1]]);
    expect(newState.sauces).toEqual([testData[2]]);
    expect(newState.mains).toEqual([testData[0]]);
  });
});
