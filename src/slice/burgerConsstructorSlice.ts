import { BurgerConstructor } from '@components';
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
    }
  }
});

export default burgerConstructorSlice;
export const { addIngredient } = burgerConstructorSlice.actions;
