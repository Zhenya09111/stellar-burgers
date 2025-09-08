import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { registerUserApi } from '@api';
import { useDispatch, useSelector } from '../../services/store';
// import { registerUser } from '../../slice/userSlice';
import { Navigate } from 'react-router-dom';

const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispath = useDispatch();
  // const { isRegister } = useSelector((store) => store.user);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    registerUserApi({
      email: email,
      name: userName,
      password: password
    });
  };

  // if (isRegister) {
  //   return <Navigate replace to='/login' />;
  // }
  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
export default Register;
