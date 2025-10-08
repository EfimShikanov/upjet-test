import { searchParamsCache } from '@/app/searchParams';
import { UsersManagementWidget } from '@/widgets/users-management';
import Container from '@mui/material/Container';
import { type SearchParams } from 'nuqs/server';

interface HomePageProps {
  searchParams?: Promise<SearchParams>;
}

export async function HomePage({ searchParams }: HomePageProps) {
  const { page } = searchParamsCache.parse((await searchParams) || {});

  return (
    <>
      <Container maxWidth="lg">
        <UsersManagementWidget page={page} />
      </Container>
    </>
  );
}
