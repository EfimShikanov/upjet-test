'use server';

import { revalidateTag } from 'next/cache';
import { User } from '../model';
import { CreateUserValidationSchema } from '../model/user.schema';

type CreateUserRequest = CreateUserValidationSchema;

export async function createUser(userData: CreateUserRequest): Promise<User> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/users`;
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
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
  return await response.json();
}
