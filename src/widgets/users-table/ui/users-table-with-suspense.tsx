import { Suspense } from 'react';
import { UsersTable } from './users-table';
import { UsersTableSkeleton } from './users-table-skeleton';

interface UsersTableWithSuspenseProps {
  page: number;
}

export function UsersTableWithSuspense({ page }: UsersTableWithSuspenseProps) {
  return (
    <Suspense key={page} fallback={<UsersTableSkeleton />}>
      <UsersTable page={page} />
    </Suspense>
  );
}
