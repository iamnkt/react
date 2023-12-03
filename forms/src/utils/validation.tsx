import { boolean, number, object, ref, string, mixed } from 'yup';

export const schema = object({
  name: string()
    .required('Field is mandatory')
    .matches(/^[A-ZА-ЯЁ]/, 'The first letter must be uppercase'),
  age: number()
    .required('Field is mandatory')
    .typeError('The field must be a number')
    .min(1, 'The value cannot be negative')
    .max(120),
  email: string()
    .required('Field is mandatory')
    .email('Email has an invalid format')
    .matches(
      /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/,
      'Email has an invalid format'
    ),
  gender: string().required(),
  password: string()
    .required('Field is mandatory')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    ),
  password2: string()
    .required('Field is mandatory')
    .matches(/[A-ZА-ЯЁ]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-zа-яё]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Confirm Password must contain at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character (e.g., !@#$%^&*)'
    )
    .oneOf([ref('password')], 'should match the password field'),
  country: string().required('Field is mandatory'),
  terms: boolean().test((terms) => !!terms),
  image: mixed<FileList>()
    .required('Field is mandatory')
    .test((file) => !!file)
    .test('fileSize', 'Only image up to 2MB are permitted.', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];
      return !file || file.size <= 2_000_000;
    })
    .test('fileType', 'The image must be in png or jpeg format', (fileList) => {
      if (fileList?.length !== 1) {
        return false;
      }
      const file = fileList[0];

      const allowedTypes = ['image/jpeg', 'image/png'];

      return allowedTypes.includes(file.type);
    }),
});
