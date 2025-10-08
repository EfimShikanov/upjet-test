'use server';

import { revalidateTag } from 'next/cache';
import { User } from '../model';
import { CreateUserValidationSchema } from '../model/user.schema';
import { BASE_URL } from '@/shared/constants';

type CreateUserRequest = CreateUserValidationSchema;

export async function createUser(userData: CreateUserRequest): Promise<User> {
  try {
    const apiUrl = `${BASE_URL}/api/users`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().then((data) => data);
      throw new Error(
        'message' in errorData
          ? errorData.message
          : `HTTP error! status: ${response.status}`,
      );
    }
    revalidateTag('users');
    return (await response.json()) as User;
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
    throw error;
  }
}
