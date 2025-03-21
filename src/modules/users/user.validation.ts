import { z } from 'zod';

const userSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum(['admin', 'teacher']),
});

const loginSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});
export const userValidation = {
  userSchema,
  loginSchema,
};
