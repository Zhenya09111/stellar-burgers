import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { TRegisterData } from '@api';
import { newData, updateUser } from '../../slice/userSlice';

export const Profile: FC = () => {
  const { user } = useSelector((store) => store.user);
  const dispath = useDispatch();
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, []);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newValue: Partial<TRegisterData> = {};
    if (user.name !== formValue.name) {
      newValue.name = formValue.name;
    }
    if (user.email !== formValue.email) {
      newValue.email = formValue.email;
    }
    if (formValue.password !== '') {
      newValue.password = formValue.password;
    }
    dispath(updateUser(newValue));
    dispath(newData(newValue));
    if (formValue.password !== '') {
      setFormValue((prevState) => ({ ...prevState, password: '' }));
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
