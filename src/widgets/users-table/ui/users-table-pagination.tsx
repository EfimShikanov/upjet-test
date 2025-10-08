'use client';

import TablePagination from '@mui/material/TablePagination';
import { useQueryState } from 'nuqs';
import React, { useTransition } from 'react';

interface UsersTablePaginationProps {
  currentPage: number;
  totalCount: number;
}

export function UsersTablePagination({
  currentPage,
  totalCount,
}: UsersTablePaginationProps) {
  const [pageTransition, setPageTransition] = useTransition();
  const [pageQuery, setPageQuery] = useQueryState('page', {
    defaultValue: '1',
    shallow: false,
  });
  const muiPage = currentPage - 1;

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPageTransition(() => {
      setPageQuery((newPage + 1).toString());
    });
  };

  return (
    <TablePagination
      component="div"
      page={muiPage}
      onPageChange={onPageChange}
      rowsPerPage={10}
      rowsPerPageOptions={[]}
      count={totalCount}
      disabled={pageTransition}
    />
  );
}
