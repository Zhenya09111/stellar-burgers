import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  changeIngredients,
  removeItem
} from '../../slice/burgerConsstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const { burgerConstuctor } = useSelector((store) => store.burger);
    const handleMoveDown = () => {
      const newIngredients = [...burgerConstuctor.ingredients];
      const currentItem = newIngredients.splice(index, 1)[0];
      newIngredients.splice(index + 1, 0, currentItem);
      dispatch(changeIngredients(newIngredients));
    };

    const handleMoveUp = () => {
      const newIngredients = [...burgerConstuctor.ingredients];
      const currentItem = newIngredients.splice(index, 1)[0];
      newIngredients.splice(index - 1, 0, currentItem);
      dispatch(changeIngredients(newIngredients));
    };

    const handleClose = () => {
      dispatch(removeItem(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
