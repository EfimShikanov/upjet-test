import { searchParamsCache } from '@/app/searchParams';
import { UsersTable } from '@/entities/user/ui/users-table/users-table';
import Container from '@mui/material/Container';
import { type SearchParams } from 'nuqs/server';

interface HomePageProps {
  searchParams?: Promise<SearchParams>;
}

export async function HomePage({ searchParams }: HomePageProps) {
  const { page } = searchParamsCache.parse((await searchParams) || {});

  return (
    <Container maxWidth="md">
      <UsersTable page={page} />
    </Container>
  );
}
