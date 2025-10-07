export enum UserRole {
  Admin = 'admin',
  User = 'user',
  Manager = 'manager',
}

export interface User {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: UserRole;
}

export const USER_ROLE_NAMES: Record<UserRole, string> = {
  [UserRole.Admin]: 'Администратор',
  [UserRole.User]: 'Пользователь',
  [UserRole.Manager]: 'Менеджер',
};
