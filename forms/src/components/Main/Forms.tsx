import React from 'react';
import { useAppSelector } from '../../hooks/hooks';

export const Forms: React.FC = () => {
  const { data } = useAppSelector((state) => state.formsReducer);
  console.log(data);
  if (!data.length) {
    return <></>;
  }

  return (
    <>
      {data.map((form, i) => (
        <div className="form" key={i}>
          <div className="image__container">
            <img src={form.image} />
          </div>
          <ul className="form">
            <li>Name: {form.name}</li>
            <li>Age: {form.age}</li>
            <li>Email: {form.email}</li>
            <li>Gender: {form.gender}</li>
            <li>Password: {form.password}</li>
            <li>Password2: {form.password2}</li>
            <li>Country: {form.country}</li>
          </ul>
        </div>
      ))}
    </>
  );
};
