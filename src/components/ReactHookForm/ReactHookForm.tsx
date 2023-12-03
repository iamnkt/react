import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { dataSlice } from '../../store/reducers/dataSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../utils/validation';
import { FormData } from '../../types/types';
import { ErrorMsg } from '../Error-msg/Error-msg';
import { formsSlice } from '../../store/reducers/formsSlice';

export const ReactHookForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const actions = dataSlice.actions;
  const formsAction = formsSlice.actions;
  const countries = useAppSelector((state) => state.countriesReducer);
  const [suggestions, setSugesstions] = useState(['']);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState('');

  const handler = () => {
    setSugesstions(
      countries.filter((cntr) =>
        cntr.toLowerCase().startsWith(selectedVal.toLowerCase())
      )
    );
  };

  const hideSuggs = (value: string) => {
    setSelectedVal(value);
    setIsHideSuggs(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsHideSuggs(false);
    setSelectedVal(e.target.value);
  };

  const convertToBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    const file = data.image![0];
    const base64 = await convertToBase64(file!);
    if (typeof base64 === 'string') {
      dispatch(actions.setImage(base64));
    }
    dispatch(actions.setName(data.name));
    dispatch(actions.setAge(data.age));
    dispatch(actions.setEmail(data.email));
    dispatch(actions.setGender(data.gender));
    dispatch(actions.setPassword(data.password));
    dispatch(actions.setPassword2(data.password2));
    dispatch(actions.setCountry(data.country));
    dispatch(
      formsAction.setForm({
        image: base64 as string,
        name: data.name,
        age: data.age,
        email: data.email,
        gender: data.gender,
        password: data.password,
        password2: data.password2,
        country: selectedVal,
      })
    );
    navigate('/');
  });

  return (
    <div className="form__container">
      <div className="picture__container">
        <h5 className="picture__title">Upload a picture...</h5>
        <input type="file" accept="image/*" {...register('image')} />
        {errors.image && errors.image.type && (
          <ErrorMsg msg={errors.image.type} />
        )}
      </div>
      <form className="form" onSubmit={onSubmit}>
        <label>
          <h5 className="input__title">Name:</h5>
          <div className="input__container">
            <input type="text" {...register('name')} />
            {errors.name && errors.name.message && (
              <ErrorMsg msg={errors.name.message} />
            )}
          </div>
        </label>
        <label>
          <h5 className="input__title">Age:</h5>
          <div className="input__container">
            <input type="text" {...register('age')} />
            {errors.age && errors.age.message && (
              <ErrorMsg msg={errors.age.message} />
            )}
          </div>
        </label>
        <label>
          <h5 className="input__title">Email:</h5>
          <div className="input__container">
            <input type="text" {...register('email')} />
            {errors.email && errors.email.message && (
              <ErrorMsg msg={errors.email.message} />
            )}
          </div>
        </label>
        <div className="select__container">
          <h5 className="select__title">Sex:</h5>
          <select className="select" {...register('gender')}>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="sugesstion-auto">
          <div className="form-control-auto">
            <label htmlFor="tag-input">
              <h5 className="input__title">Countries:</h5>
              <div className="input__container">
                <input
                  {...register('country')}
                  placeholder={'Choose a country...'}
                  type="search"
                  value={selectedVal}
                  onChange={handleChange}
                  onKeyUp={handler}
                />
                {errors.country && errors.country?.message && (
                  <ErrorMsg msg={errors.country?.message} />
                )}
              </div>
            </label>
          </div>
          <div
            className="suggestions"
            style={{ display: isHideSuggs ? 'none' : 'block' }}
          >
            {suggestions.map((item, idx) => (
              <div
                className="country-item"
                key={'' + item + idx}
                onClick={() => {
                  hideSuggs(item);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <label>
          <h5 className="input__title">Password:</h5>
          <div className="input__container">
            <input type="password" {...register('password')} />
            {errors.password && errors.password.message && (
              <ErrorMsg msg={errors.password.message} />
            )}
          </div>
        </label>
        <label>
          <h5 className="input__title">Password:</h5>
          <div className="input__container">
            <input type="password" {...register('password2')} />
            {errors.password2 && errors.password2.message && (
              <ErrorMsg msg={errors.password2.message} />
            )}
          </div>
        </label>
        <label>
          <div className="terms__wrapper">
            <div className="terms__container">
              <input type="checkbox" {...register('terms')} />
              <h5 className="input__title">
                I agree to the Terms and Conditions
              </h5>
            </div>
            {errors.terms && errors.terms.type && (
              <ErrorMsg msg={errors.terms.type} />
            )}
          </div>
        </label>
        <button className="button__submit" type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </div>
  );
};
