import * as yup from 'yup';

export const setupSchema = yup.object().shape({
  orgName: yup.string().required('Organization name is required'),
  centerName: yup.string().required('Center name is required'),
  centerAddress: yup.string().nullable(),
  adminEmail: yup.string().required('Admin email is required').email('Please enter a valid email address'),
  adminName: yup.string().required('Admin name is required'),
  adminPassword: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
});

export function extractErrors(err: yup.ValidationError) {
  return err.inner.reduce<Record<string, string>>((acc, err) => {
    if (err.path) {
      acc[err.path] = err.message;
    }
    return acc;
  }, {});
}
