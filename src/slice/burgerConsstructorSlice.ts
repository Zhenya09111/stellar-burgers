import { createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import type { PayloadAction } from '@reduxjs/toolkit';

export type TBurgerConsturctorState = {
  burgerConstuctor: {
    bun: TIngredient | undefined;
    ingredients: Array<TConstructorIngredient>;
  };
};

const initialState: TBurgerConsturctorState = {
  burgerConstuctor: {
    bun: undefined,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.burgerConstuctor.bun = action.payload;
        } else {
          state.burgerConstuctor.ingredients.push(action.payload);
        }
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      }
    },
    removeItem: (state, action) => {
      state.burgerConstuctor.ingredients =
        state.burgerConstuctor.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    clearIngredients: (state) => {
      state.burgerConstuctor.bun = undefined;
      state.burgerConstuctor.ingredients = [];
    },
    ingredientUp: (state, action) => {
      const newIngredients = [...state.burgerConstuctor.ingredients];
      const currentItem = newIngredients.splice(action.payload, 1)[0];
      newIngredients.splice(action.payload - 1, 0, currentItem);
      state.burgerConstuctor.ingredients = [...newIngredients];
    },
    ingredientDown: (state, action) => {
      const newIngredients = [...state.burgerConstuctor.ingredients];
      const currentItem = newIngredients.splice(action.payload, 1)[0];
      newIngredients.splice(action.payload + 1, 0, currentItem);
      state.burgerConstuctor.ingredients = [...newIngredients];
    }
  }
});

export default burgerConstructorSlice;
export const {
  addIngredient,
  removeItem,
  clearIngredients,
  ingredientUp,
  ingredientDown
} = burgerConstructorSlice.actions;
