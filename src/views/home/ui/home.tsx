import { searchParamsCache } from '@/app/searchParams';
import { UsersCreate } from '@/entities/user/ui/users-create';
import { UsersTableWithSuspense } from '@/entities/user/ui/users-table';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { type SearchParams } from 'nuqs/server';

interface HomePageProps {
  searchParams?: Promise<SearchParams>;
}

export async function HomePage({ searchParams }: HomePageProps) {
  const { page } = searchParamsCache.parse((await searchParams) || {});

  return (
    <Container maxWidth="md">
      <Box
        component="section"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}
      >
        <Typography variant="h4">Пользователи системы</Typography>
        <UsersCreate />
        <UsersTableWithSuspense page={page} />
      </Box>
    </Container>
  );
}
