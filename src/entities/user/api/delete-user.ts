'use server';

import { BASE_URL } from '@/shared/constants';
import { revalidateTag } from 'next/cache';

export async function deleteUser(id: string): Promise<{ message: string }> {
  try {
    const apiUrl = `${BASE_URL}/api/users?id=${id}`;

    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        'message' in errorData
          ? errorData.message
          : 'Ошибка при удалении пользователя',
      );
    }

    revalidateTag('users');
    return await response.json();
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Ошибка при удалении пользователя');
    }
  }
}
