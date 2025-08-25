import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger } from '../../slice/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { burgerConstuctor } = useSelector((store) => store.burger);
  const constructorItems = burgerConstuctor;
  const orderRequest = false;

  const orderModalData = null;

  const burgerItem = {
    burgerConstuctor: {
      bun: burgerConstuctor.bun,
      ingredients: burgerConstuctor.ingredients
    }
  };

  const onOrderClick = () => {
    dispatch(orderBurger(burgerItem));
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
