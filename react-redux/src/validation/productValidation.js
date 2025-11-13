import * as Yup from 'yup';

const productValidation = Yup.object().shape({
  name: Yup.string()
    .required('Product name is required')
    .min(2, 'Product name must be at least 2 characters')
    .max(100, 'Product name must not exceed 100 characters'),
  price: Yup.number()
    .typeError('Price must be a number')
    .required('Price is required')
    .positive('Price must be a positive number')
    .min(0.01, 'Price must be at least 0.01'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must not exceed 500 characters'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileOrString', 'Image is required', (value) => {
      // Allow File objects or non-empty strings
      return value instanceof File || (typeof value === 'string' && value.length > 0);
    }),
});

export default productValidation;

