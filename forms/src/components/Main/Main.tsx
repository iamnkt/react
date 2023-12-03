import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import './index.css';

export const Main: React.FC = () => {
  const { data } = useAppSelector((state) => state.dataReducer);
  return (
    <ul className="main">
      <li>Name:{data.name}</li>
      <li>Age:{data.age}</li>
      <li>Email:{data.email}</li>
      <li>Gender:{data.gender}</li>
      <li>Password:{data.password}</li>
      <li>Password2:{data.password2}</li>
      <li>Country:{data.country}</li>
    </ul>
  );
};
