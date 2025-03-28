import * as Yup from 'yup';

// Validation schema for initial fields
export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must not exceed 100 characters'),
  
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
    .test('len', 'Phone number must be exactly 10 digits', val => val.length === 10),
  
  radio: Yup.string()
    .required('Please select an option'),
  
  dropdown: Yup.string()
    .required('Please select a dropdown option'),
  
  checkbox: Yup.boolean()
    .oneOf([true], 'Checkbox must be checked')
});

// Validation schema for data fields (image uploads)
export const dataFieldsValidationSchema = Yup.object().shape({
  'company-logo': Yup.mixed()
    .required('Company logo is required')
    .test('fileSize', 'File is too large', (value) => {
      // Check file size (e.g., max 5MB)
      return value && value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported file type', (value) => {
      // Allowed file types
      const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return value && supportedTypes.includes(value.type);
    }),
  
  'image-footer': Yup.mixed()
    .required('Footer image is required')
    .test('fileSize', 'File is too large', (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported file type', (value) => {
      const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return value && supportedTypes.includes(value.type);
    }),
  
  'image-header': Yup.mixed()
    .required('Header image is required')
    .test('fileSize', 'File is too large', (value) => {
      return value && value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Unsupported file type', (value) => {
      const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      return value && supportedTypes.includes(value.type);
    })
});

// Initial values to match your fields
export const initialValues = {
  name: '',
  email: '',
  phone: '',
  radio: '',
  dropdown: '',
  checkbox: false,
  'company-logo': null,
  'image-footer': null,
  'image-header': null
};