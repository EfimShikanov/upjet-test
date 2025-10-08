import { UsersCreate } from '@/features/user-management/ui';
import { ErrorBoundary } from '@/shared/lib/error-boundary';
import { UsersTableWithSuspense } from '@/widgets/users-table/ui';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface UsersManagementWidgetProps {
  page: number;
}

export function UsersManagementWidget({ page }: UsersManagementWidgetProps) {
  return (
    <ErrorBoundary>
      <Box sx={{ py: 4 }}>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 500 }}
            >
              Управление пользователями
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600 }}
            >
              Приложение для управления пользователями системы, включая создание
              новых учетных записей, редактирование существующих пользователей и
              управление правами доступа.
            </Typography>
            <UsersCreate />
          </Box>
        </Paper>

        <Divider sx={{ my: 3 }} />
        <Paper sx={{ p: 3 }}>
          <UsersTableWithSuspense page={page} />
        </Paper>
      </Box>
    </ErrorBoundary>
  );
}
