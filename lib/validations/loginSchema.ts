// import { z } from 'zod';

// export const loginSchema = z.object({
//     email: z.string().email('Invalid email address'),
//     password: z.string()
//         .min(8, 'Password must be at least 8 characters')
//         .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must include uppercase, lowercase, and number')
// });

// export type LoginFormData = z.infer<typeof loginSchema>;