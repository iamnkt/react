import React, { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { schema } from '../../utils/validation';
import { dataSlice } from '../../store/reducers/dataSlice';
import { ValidationError } from 'yup';
import { ErrorMsg } from '../Error-msg/error-msg';
import './index.css';

type Errs = {
  [key: string]: string;
};

type ErrsState = {
  name?: string;
  age?: string;
  email?: string;
  gender?: string;
  password?: string;
  password2?: string;
  country?: string;
  terms?: string;
  image?: string;
};

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

  const handleFileUpload = async () => {
    const file = imageValue.current?.files![0];
    const base64 = await convertToBase64(file!);
    if (typeof base64 === 'string') {
      dispatch(actions.setImage(base64));
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
      image: imageValue.current?.files,
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      handleFileUpload();
      dispatch(actions.setName(formData.name!));
      dispatch(actions.setAge(formData.age!));
      dispatch(actions.setEmail(formData.email!));
      dispatch(actions.setGender(formData.gender!));
      dispatch(actions.setPassword(formData.password!));
      dispatch(actions.setPassword2(formData.password2!));
      dispatch(actions.setCountry(formData.country!));
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
          Name:
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
        </label>
        <label>
          Age:
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
        </label>
        <label>
          Email:
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
        </label>
        <select
          ref={genderValue}
          onFocus={() => {
            delete validationErrs.gender;
            setErrs(validationErrs);
            forceUpdate();
          }}
        >
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
        </label>
        <label>
          Password:
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
        </label>
        <label>
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
          I agree to the Terms and Conditions
          {validationErrs.terms && <ErrorMsg msg={validationErrs.terms} />}
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
