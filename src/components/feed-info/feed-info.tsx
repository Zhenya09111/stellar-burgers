import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../slice/orderSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const { feed } = useSelector((store) => store.orderList);
  const orders: TOrder[] = feed.orders;
  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
