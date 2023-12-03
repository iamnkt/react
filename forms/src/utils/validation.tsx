import { boolean, number, object, ref, string, mixed } from 'yup';

export const schema = object({
  name: string()
    .required('Required field')
    .matches(/^[A-ZА-ЯЁ]/, 'Must begin with the capital letter'),
  age: number()
    .required('Required field')
    .typeError('Must be a number')
    .min(12, 'Please, enter the correct age')
    .max(120, 'Please, enter the correct age'),
  email: string()
    .required('Required field')
    .email('Please, enter the correct email')
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      'Please enter the correct email'
    ),
  gender: string().required(),
  password: string()
    .required('Required field')
    .matches(/[A-ZА-ЯЁ]/, 'Must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Must contain at least one special character'
    ),
  password2: string()
    .required('Required field')
    .matches(/[A-ZА-ЯЁ]/, 'Must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Must contain at least one special character'
    )
    .oneOf([ref('password')], 'Passwords do not match'),
  country: string().required('Required field'),
  terms: boolean().test(
    'You should accept terms and conditions',
    (terms) => !!terms
  ),
  image: mixed<FileList>()
    .required('Required field')
    .test((file) => !!file)
    .test('Only image up to 2MB are permitted.', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];
      return !file || file.size <= 2_000_000;
    })
    .test('Image must be png or jpeg', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];

      const allowedTypes = ['image/jpeg', 'image/png'];

      return allowedTypes.includes(file.type);
    }),
});
