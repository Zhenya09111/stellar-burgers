import React from 'react';
import { useSelector } from '../services/store';
import { Navigate, useLocation } from 'react-router-dom';
type TProtectedRouteProps = {
  children: React.ReactElement;
  onlyForGuests?: boolean;
};
export const ProtectedRoute = ({
  children,
  onlyForGuests
}: TProtectedRouteProps) => {
  const { isAuth } = useSelector((store) => store.user);
  const location = useLocation();
  if (!isAuth && !onlyForGuests) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (isAuth && onlyForGuests) {
    if (location.state?.from) {
      return <Navigate replace to={location.state.from} />;
    } else {
      return <Navigate replace to='/' />;
    }
  }

  return children;
};
