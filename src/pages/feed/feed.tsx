import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds } from '../../slice/orderSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.orderList.feed);
  useEffect(() => {
    dispatch(getFeeds());
  }, []);
  return !orders.length ? (
    <Preloader />
  ) : (
    <FeedUI orders={orders} handleGetFeeds={() => {}} />
  );
};
