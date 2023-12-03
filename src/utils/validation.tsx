import { boolean, object, ref, string, number, mixed } from 'yup';

export const schema = object({
  name: string()
    .matches(/^[A-ZА-ЯЁ]/, 'Must begin with the capital letter')
    .required('Required field'),
  age: number()
    .min(12, 'Please, enter the correct age')
    .max(120, 'Please, enter the correct age')
    .typeError('Must be a number')
    .required('Required field'),
  email: string()
    .email()
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      'Please enter the correct email'
    )
    .required('Required field'),
  gender: string().required(),
  password: string()
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Must contain at least one special character'
    )
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(/[A-ZА-ЯЁ]/, 'Must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Must contain at least one lowercase letter')
    .required('Required field'),
  password2: string()
    .oneOf([ref('password')], 'Passwords do not match')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Must contain at least one special character'
    )
    .matches(/[0-9]/, 'Must contain at least one digit')
    .matches(/[A-ZА-ЯЁ]/, 'Must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Must contain at least one lowercase letter')
    .required('Required field'),
  country: string().required('Required field'),
  terms: boolean().test(
    'You should accept terms and conditions',
    (terms) => !!terms
  ),
  image: mixed<FileList>()
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
      const types = ['image/jpeg', 'image/png'];
      return types.includes(file.type);
    })
    .test('File is required', (value) => !!value?.[0]),
});
