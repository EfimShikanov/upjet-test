'use server';

import { revalidateTag } from 'next/cache';
import { User } from '../model';
import { CreateUserValidationSchema } from '../model/user.schema';
import { BASE_URL } from '@/shared/constants';

type UpdateUserRequest = CreateUserValidationSchema & {
  id: string;
};

export async function updateUser(userData: UpdateUserRequest): Promise<User> {
  try {
    const apiUrl = `${BASE_URL}/api/users`;
    const response = await fetch(apiUrl, {
      method: 'PUT',
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
          : 'Ошибка при редактировании пользователя',
      );
    }
    revalidateTag('users');
    return (await response.json()) as User;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Ошибка при редактировании пользователя');
    }
  }
}
