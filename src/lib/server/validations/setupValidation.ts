import { z } from 'zod';

const setupSchema = z.object({
  orgName: z.string().min(1, { message: 'Organization name is required' }),
  centerName: z.string().min(1, { message: 'Center name is required' }),
  centerAddress: z.string().nullable(),
  adminEmail: z.string().min(1, { message: 'Admin email is required' }).email({ message: 'Please enter a valid email address' }),
  adminName: z.string().min(1, { message: 'Admin name is required' }),
  adminPassword: z.string().min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

export default setupSchema;
