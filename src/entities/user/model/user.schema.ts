import { z } from 'zod';
import { UserRole } from './user.types';

export const CreateUserSchema = z.object({
  email: z.string().email('Невалидный формат email'),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, 'Невалидный формат номера телефона'),
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя не должно превышать 100 символов'),
  role: z.enum(UserRole), // Использование z.nativeEnum для TypeScript enum
});

export type CreateUserValidationSchema = z.infer<typeof CreateUserSchema>;
