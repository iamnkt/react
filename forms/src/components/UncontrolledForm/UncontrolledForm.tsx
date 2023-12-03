import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { schema } from '../../utils/validation';
import { dataSlice } from '../../store/reducers/dataSlice';
import './index.css';

export const UncontrolledForm: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const imageValue = useRef<HTMLInputElement>(null);
  const nameValue = useRef<HTMLInputElement>(null);
  const ageValue = useRef<HTMLInputElement>(null);
  const emailValue = useRef<HTMLInputElement>(null);
  const passwordValue = useRef<HTMLInputElement>(null);
  const password2Value = useRef<HTMLInputElement>(null);
  const genderValue = useRef<HTMLSelectElement>(null);
  const countryValue = useRef<HTMLInputElement>(null);
  const termsValue = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const actions = dataSlice.actions;

  const countries = useAppSelector((state) => state.countriesReducer);
  const [suggestions, setSugesstions] = useState(['']);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState('');

  const handler = () => {
    setSugesstions(
      countries.filter((cntr) =>
        cntr.toLowerCase().startsWith(countryValue.current!.value.toLowerCase())
      )
    );
  };

  const hideSuggs = (value: string) => {
    setSelectedVal(value);
    setIsHideSuggs(true);
  };

  const handleChange = () => {
    if (countryValue.current) {
      setIsHideSuggs(false);
      setSelectedVal(countryValue.current.value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameValue.current?.value,
      age: ageValue.current?.value,
      email: emailValue.current?.value,
      gender: genderValue.current?.value,
      password: passwordValue.current?.value,
      password2: password2Value.current?.value,
      country: countryValue.current?.value,
      terms: termsValue.current?.checked,
    };

    console.log(formData);

    try {
      await schema.validate(formData, { abortEarly: false });
      dispatch(actions.setName(formData.name!));
      dispatch(actions.setAge(formData.age!));
      dispatch(actions.setEmail(formData.email!));
      dispatch(actions.setGender(formData.gender!));
      dispatch(actions.setPassword(formData.password!));
      dispatch(actions.setPassword2(formData.password2!));
      dispatch(actions.setCountry(formData.country!));
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form__container">
      <div className="picture">
        <img src="" className="" alt="" />
        <h6>Upload a picture...</h6>
        <input type="file" className="form-control" ref={imageValue} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="form"
        autoComplete="on"
        ref={form}
      >
        <label>
          Name:
          <input type="text" name="name" ref={nameValue} />
        </label>
        <label>
          Age:
          <input type="number" name="age" ref={ageValue} />
        </label>
        <label>
          Email:
          <input type="text" name="email" ref={emailValue} />
        </label>
        <select ref={genderValue}>
          <option disabled>Gender:</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        <div className="sugesstion-auto">
          <div className="form-control-auto">
            <label htmlFor="tag-input">{'Countries:'}</label>
            <input
              placeholder={'Choose a country...'}
              type="search"
              value={selectedVal}
              ref={countryValue}
              onChange={handleChange}
              onKeyUp={handler}
            />
          </div>
          <div
            className="suggestions"
            style={{ display: isHideSuggs ? 'none' : 'block' }}
          >
            {suggestions.map((item, idx) => (
              <div
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
          Password:
          <input type="password" name="password" ref={passwordValue} />
        </label>
        <label>
          Password:
          <input type="password" name="password" ref={password2Value} />
        </label>
        <label>
          <input type="checkbox" name="terms" ref={termsValue} />I agree to the
          Terms and Conditions
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
