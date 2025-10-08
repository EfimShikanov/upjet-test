import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { UsersTablePagination } from './users-table-pagination';
import { getUsers, type PaginationMeta } from '@/entities/user/api/get-users';
import { User, USER_ROLE_NAMES } from '../../model';
import { UsersTableActions } from './users-table-actions';

interface UsersTableProps {
  page: number;
}

export async function UsersTable({ page }: UsersTableProps) {
  let users: User[] = [];
  let meta: PaginationMeta = {
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
  };

  try {
    const apiResponse = await getUsers({ page });
    users = apiResponse.data;
    meta = apiResponse.meta;
  } catch (error) {
    console.error('Не удалось загрузить пользователей в UsersTable:', error);
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: '78svh' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Телефон</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{USER_ROLE_NAMES[user.role]}</TableCell>
                  <TableCell>
                    <UsersTableActions user={user} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Пользователи не найдены.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <UsersTablePagination
        currentPage={meta.currentPage}
        totalCount={meta.totalCount}
      />
    </>
  );
}
