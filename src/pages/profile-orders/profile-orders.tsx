import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderList } from '../../slice/orderSlice';

export const ProfileOrders: FC = () => {
  const { myOrder } = useSelector((store) => store.orderList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderList());
  }, []);

  return <ProfileOrdersUI orders={myOrder} />;
};
