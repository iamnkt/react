import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { schema } from '../../utils/validation';
import { dataSlice } from '../../store/reducers/dataSlice';
import { ValidationError } from 'yup';
import { ErrorMsg } from '../Error-msg/Error-msg';
import { Errs, ErrsState } from '../../types/types';
import './index.css';
import { formsSlice } from '../../store/reducers/formsSlice';

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
  const formsAction = formsSlice.actions;

  const countries = useAppSelector((state) => state.countriesReducer);
  const [suggestions, setSugesstions] = useState(['']);
  const [isHideSuggs, setIsHideSuggs] = useState(false);
  const [selectedVal, setSelectedVal] = useState('');

  const [validationErrs, setErrs] = React.useState<ErrsState>({});
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = {
      name: nameValue.current?.value,
      age: ageValue.current?.value,
      email: emailValue.current?.value,
      gender: genderValue.current?.value,
      password: passwordValue.current?.value,
      password2: password2Value.current?.value,
      country: selectedVal,
      terms: termsValue.current?.checked,
      image: imageValue.current?.files,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      const file = imageValue.current?.files![0];
      const base64 = await convertToBase64(file!);
      if (typeof base64 === 'string') {
        dispatch(actions.setImage(base64));
      }
      dispatch(actions.setName(formData.name!));
      dispatch(actions.setAge(Number(formData.age)));
      dispatch(actions.setEmail(formData.email!));
      dispatch(actions.setGender(formData.gender!));
      dispatch(actions.setPassword(formData.password!));
      dispatch(actions.setPassword2(formData.password2!));
      dispatch(actions.setCountry(formData.country!));
      dispatch(
        formsAction.setForm({
          image: base64 as string,
          name: formData.name!,
          age: Number(formData.age),
          email: formData.email!,
          gender: formData.gender!,
          password: formData.password!,
          password2: formData.password2!,
          country: formData.country!,
        })
      );
      navigate('/');
    } catch (err) {
      if (err instanceof ValidationError) {
        const errs: Errs = {};
        err.inner.forEach((e) => {
          if (e.path === 'image' || e.path === 'terms') {
            errs[`${e.path}`] = e.type as string;
          } else {
            errs[`${e.path}`] = e.message;
          }
        });
        setErrs(errs);
      }
    }
  };

  return (
    <div className="form__container">
      <div className="picture__container">
        <h5 className="picture__title">Upload a picture...</h5>
        <input
          type="file"
          accept="image/*"
          ref={imageValue}
          onClick={() => {
            delete validationErrs.image;
            setErrs(validationErrs);
            forceUpdate();
          }}
        />
        {validationErrs.image && <ErrorMsg msg={validationErrs.image} />}
      </div>
      <form
        onSubmit={handleSubmit}
        className="form"
        autoComplete="on"
        ref={form}
      >
        <label>
          <h5 className="input__title">Name:</h5>
          <div className="input__container">
            <input
              type="text"
              name="name"
              ref={nameValue}
              onFocus={() => {
                delete validationErrs.name;
                setErrs(validationErrs);
                forceUpdate();
              }}
            />
            {validationErrs.name && <ErrorMsg msg={validationErrs.name} />}
          </div>
        </label>
        <label>
          <h5 className="input__title">Age:</h5>
          <div className="input__container">
            <input
              type="text"
              name="age"
              ref={ageValue}
              onFocus={() => {
                delete validationErrs.age;
                setErrs(validationErrs);
                forceUpdate();
              }}
            />
            {validationErrs.age && <ErrorMsg msg={validationErrs.age} />}
          </div>
        </label>
        <label>
          <h5 className="input__title">Email:</h5>
          <div className="input__container">
            <input
              type="text"
              name="email"
              ref={emailValue}
              onFocus={() => {
                delete validationErrs.email;
                setErrs(validationErrs);
                forceUpdate();
              }}
            />
            {validationErrs.email && <ErrorMsg msg={validationErrs.email} />}
          </div>
        </label>
        <div className="select__container">
          <h5 className="select__title">Sex:</h5>
          <select
            className="select"
            ref={genderValue}
            onFocus={() => {
              delete validationErrs.gender;
              setErrs(validationErrs);
              forceUpdate();
            }}
          >
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
                  placeholder={'Choose a country...'}
                  type="search"
                  value={selectedVal}
                  ref={countryValue}
                  onChange={handleChange}
                  onKeyUp={handler}
                  onFocus={() => {
                    delete validationErrs.country;
                    setErrs(validationErrs);
                    forceUpdate();
                  }}
                />
                {validationErrs.country && (
                  <ErrorMsg msg={validationErrs.country} />
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
            <input
              type="password"
              name="password"
              ref={passwordValue}
              onFocus={() => {
                delete validationErrs.password;
                setErrs(validationErrs);
                forceUpdate();
              }}
            />
            {validationErrs.password && (
              <ErrorMsg msg={validationErrs.password} />
            )}
          </div>
        </label>
        <label>
          <h5 className="input__title">Password:</h5>
          <div className="input__container">
            <input
              type="password"
              name="password"
              ref={password2Value}
              onFocus={() => {
                delete validationErrs.password2;
                setErrs(validationErrs);
                forceUpdate();
              }}
            />
            {validationErrs.password2 && (
              <ErrorMsg msg={validationErrs.password2} />
            )}
          </div>
        </label>
        <label>
          <div className="terms__wrapper">
            <div className="terms__container">
              <input
                type="checkbox"
                name="terms"
                ref={termsValue}
                onFocus={() => {
                  delete validationErrs.terms;
                  setErrs(validationErrs);
                  forceUpdate();
                }}
              />
              <h5 className="input__title">
                I agree to the Terms and Conditions
              </h5>
            </div>
            {validationErrs.terms && <ErrorMsg msg={validationErrs.terms} />}
          </div>
        </label>
        <button className="button__submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
