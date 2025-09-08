import { getIngredientsApi } from './../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsSlice = {
  ingredients: TIngredient[];
  success: boolean;
  isIngredientsLoading: boolean;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
};

const initialState: TIngredientsSlice = {
  ingredients: [],
  buns: [],
  sauces: [],
  mains: [],
  success: false,
  isIngredientsLoading: false
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  getIngredientsApi
);

const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.fulfilled, (state, action) => {
        (state.buns = action.payload.filter((bun) => bun.type === 'bun')),
          (state.sauces = action.payload.filter(
            (sauce) => sauce.type === 'sauce'
          )),
          (state.mains = action.payload.filter((main) => main.type === 'main'));
        state.success = true;
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.pending, (state) => {
        state.success = false;
        state.isIngredientsLoading = true;
      });
  }
});

export default ingredientSlice;
