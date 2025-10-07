'use server';

import { User } from '../model';

export interface PaginationMeta {
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export interface GetUsersResponse {
  data: User[];
  meta: PaginationMeta;
}

interface GetUsersParams {
  page?: number;
}

export async function getUsers({
  page = 1,
}: GetUsersParams = {}): Promise<GetUsersResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const apiUrl = `${baseUrl}/api/users?page=${page}`;

  try {
    const response = await fetch(apiUrl, {
      next: { tags: ['users'] },
      cache: 'force-cache',
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      throw new Error(
        `Ошибка при загрузке пользователей: ${response.status} - ${errorData.message}`,
      );
    }

    const data: GetUsersResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Не удалось загрузить пользователей:', error);
    return {
      data: [],
      meta: {
        totalCount: 0,
        totalPages: 1,
        currentPage: page,
      },
    };
  }
}
