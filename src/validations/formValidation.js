// validations.js

// Validation types with their corresponding error messages
export const validationTypes = {
  required: { message: "This field is required" },
  email: { message: "Please enter a valid email address" },
  minLength: { message: "Must be at least {min} characters" },
  maxLength: { message: "Cannot exceed {max} characters" },
  pattern: { message: "Input does not match the required format" },
  numeric: { message: "Please enter numbers only" },
  phone: { message: "Please enter a valid phone number" },
  url: { message: "Please enter a valid URL" },
  min: { message: "Value must be at least {min}" },
  max: { message: "Value must not exceed {max}" },
  fileType: { message: "Invalid file type. Accepted types: {types}" },
  fileSize: { message: "File size must not exceed {size}MB" },
  custom: { message: "Validation failed" }
};

// Validation functions for each validation type
const validators = {
  required: (value) => value !== undefined && value !== null && value !== '',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  minLength: (value, options) => value.length >= options.min,
  maxLength: (value, options) => value.length <= options.max,
  pattern: (value, options) => new RegExp(options.pattern).test(value),
  numeric: (value) => /^[0-9]+$/.test(value),
  phone: (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value),
  url: (value) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value),
  min: (value, options) => Number(value) >= options.min,
  max: (value, options) => Number(value) <= options.max,
  fileType: (value, options) => {
    if (!value || !value.file) return true;
    const fileType = value.file.type;
    return options.types.includes(fileType);
  },
  fileSize: (value, options) => {
    if (!value || !value.file) return true;
    const fileSizeInMB = value.file.size / (1024 * 1024);
    return fileSizeInMB <= options.size;
  },
  custom: (value, options) => options.validator(value)
};

// Function to generate error message with placeholders replaced by actual values
export const getErrorMessage = (validationType, options) => {
  const baseMessage = validationTypes[validationType].message;
  
  if (!options) return baseMessage;
  
  return Object.keys(options).reduce((message, key) => {
    return message.replace(`{${key}}`, options[key]);
  }, baseMessage);
};

// Main validation function
export const validateField = (field, value) => {
  if (!field.validations) return { isValid: true };
  
  for (const validation of field.validations) {
    const validationType = Object.keys(validation)[0];
    const validationOptions = validation[validationType];
    
    const validatorFn = validators[validationType];
    if (!validatorFn) continue;
    
    const isValid = validatorFn(value, validationOptions);
    if (!isValid) {
      return {
        isValid: false,
        error: getErrorMessage(validationType, validationOptions)
      };
    }
  }
  
  return { isValid: true };
};

// Validate all fields in a form
export const validateForm = (fields) => {
  const errors = {};
  let isFormValid = true;
  
  fields.forEach(field => {
    const value = field.value;
    const validation = validateField(field, value);
    
    if (!validation.isValid) {
      errors[field.id] = validation.error;
      isFormValid = false;
    }
  });
  
  return { isFormValid, errors };
};

// Helper function to add validations to a field
export const addValidation = (field, validationType, options = {}) => {
  if (!field.validations) {
    field.validations = [];
  }
  
  const validation = { [validationType]: options };
  field.validations.push(validation);
  
  return field;
};

// Common validation presets
export const validationPresets = {
  requiredTextField: [
    { required: {} },
    { maxLength: { max: 255 } }
  ],
  requiredEmail: [
    { required: {} },
    { email: {} }
  ],
  phoneNumber: [
    { phone: {} }
  ],
  password: [
    { required: {} },
    { minLength: { min: 8 } },
    { pattern: { pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]" } }
  ],
  numericOnly: [
    { numeric: {} }
  ],
  imageUpload: [
    { fileType: { types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] } },
    { fileSize: { size: 5 } }
  ]
};