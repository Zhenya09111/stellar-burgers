import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { getIngredients } from '../../slice/ingredientsSlice';
import { checkUserAuth } from '../../slice/userSlice';
import { ProtectedRoute } from '../../protectedRoute/protectedRoute';

const App = () => {
  const closureHandler = () => {
    {
      location.state?.background ? navigate(-1) : navigate('/');
    }
  };
  const ing = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyForGuests>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyForGuests>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyForGuests>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyForGuests>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route path='/profile'>
          <Route
            index
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='orders' element={<ProfileOrders />} />
        </Route>
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal
                title={location.pathname.split('/').pop() as string}
                onClose={closureHandler}
              >
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <Modal
              title={location.pathname.split('/').pop() as string}
              onClose={closureHandler}
            >
              <OrderInfo />
            </Modal>
          }
        />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали ингредиента' onClose={closureHandler}>
              <IngredientDetails />
            </Modal>
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={location.pathname.split('/').pop() as string}
                onClose={closureHandler}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal
                  title={location.pathname.split('/').pop() as string}
                  onClose={closureHandler}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closureHandler}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
