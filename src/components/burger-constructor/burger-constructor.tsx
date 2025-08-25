import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { closeOrder, orderBurger } from '../../slice/orderSlice';
import { clearIngredients } from '../../slice/burgerConsstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const { burgerConstuctor } = useSelector((store) => store.burger);
  const { order, orderRequest } = useSelector((store) => store.orderList);
  const constructorItems = burgerConstuctor;

  const orderModalData = order ? order.order : null;

  const burgerItem = {
    burgerConstuctor: {
      bun: burgerConstuctor.bun,
      ingredients: burgerConstuctor.ingredients
    }
  };

  const onOrderClick = () => {
    dispatch(orderBurger(burgerItem));
  };
  const closeOrderModal = () => {
    dispatch(closeOrder());
    dispatch(clearIngredients());
  };

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
