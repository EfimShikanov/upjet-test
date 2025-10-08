'use server';

export async function deleteUser(id: string): Promise<{ message: string }> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/users?id=${id}`;

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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('Ошибка при удалении пользователя');
    }
  }
}
