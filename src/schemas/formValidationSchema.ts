import * as yup from 'yup';

const FILE_SIZE = 2 * 1024 * 1024;
const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .test(
      'is-uppercase',
      'The first letter must be uppercase',
      (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
    ),
  age: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid email format',
    ),
  password: yup
    .string()
    .required()
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(
      /[@$!%*?&#]/,
      'Password must contain at least one special character',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match')
    .defined(),
  gender: yup
    .string()
    .required('Gender is required')
    .oneOf(['female', 'male'], 'Please select a gender')
    .defined(),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .defined(),
  file: yup
    .mixed<File>()
    .required('A file is required')
    .transform((value) => {
      return value instanceof FileList ? value[0] : value;
    })
    .test(
      'fileFormat',
      'Unsupported file format. Only .jpeg and .png are permitted',
      (file) => file && SUPPORTED_FORMATS.includes(file.type),
    )
    .test(
      'fileSize',
      'File size too large. Max size - 2GB',
      (file) => file && file.size <= FILE_SIZE,
    ),
});

export type FormValidationSchema = yup.InferType<typeof formSchema>;
