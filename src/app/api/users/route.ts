import { User, UserRole } from '@/entities/user';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { CreateUserSchema } from '@/entities/user/model/user.schema';

const users: User[] = [
  {
    id: '100000',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+79261234567',
    role: UserRole.Admin,
  },
  {
    id: '100001',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100002',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100003',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100004',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100005',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+79261234567',
    role: UserRole.Admin,
  },
  {
    id: '100006',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100007',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100008',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100009',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
  {
    id: '100010',
    name: 'Мария Петрова',
    email: 'maria@example.com',
    phone: '+79039876543',
    role: UserRole.Manager,
  },
];

export async function GET(request: NextRequest) {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки сети

  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  const paginatedUsers = users.slice(offset, offset + limit);
  const totalCount = users.length;
  const totalPages = Math.ceil(totalCount / limit);

  return NextResponse.json({
    data: paginatedUsers,
    meta: {
      totalCount,
      totalPages,
      currentPage: page,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const generateRandomSixDigitNumber = (): string => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const body = await request.json();

    const validatedBody = CreateUserSchema.parse(body);

    const newUser: User = {
      id: generateRandomSixDigitNumber(),
      name: validatedBody.name,
      email: validatedBody.email,
      phone: validatedBody.phone,
      role: validatedBody.role,
    };

    users.push(newUser);

    return NextResponse.json(newUser, { status: 201 }); // 201 Created
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Ошибка валидации', errors: error.flatten() },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: 'Ошибка при обработке запроса' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { message: 'ID пользователя не указан' },
        { status: 400 },
      );
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 404 },
      );
    }

    users.splice(userIndex, 1);

    return NextResponse.json(
      { message: 'Пользователь успешно удален' },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Ошибка при обработке запроса' },
      { status: 500 },
    );
  }
}
