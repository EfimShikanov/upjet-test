'use client';

import { updateUser } from '@/entities/user/api';
import { User } from '@/entities/user/model';
import { UserForm } from '@/shared/ui';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTransition } from 'react';

interface UsersUpdateProps {
  user: User;
  onSuccess: () => void;
  onError: (error: string) => void;
  open: boolean;
  onClose: () => void;
}

export function UsersUpdate({
  user,
  onSuccess,
  onError,
  open,
  onClose,
}: UsersUpdateProps) {
  const [isSubmitting, startSubmittingTransition] = useTransition();

  const onSubmit = async (values: User) => {
    startSubmittingTransition(async () => {
      await updateUser(values);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактирование пользователя</DialogTitle>

      <DialogContent>
        <UserForm
          mode="update"
          onSubmit={onSubmit}
          formId="update-user"
          onError={onError}
          onSuccess={onSuccess}
          initialValues={user}
        />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          type="reset"
          form="update-user"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="contained"
          form="update-user"
          loading={isSubmitting}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
