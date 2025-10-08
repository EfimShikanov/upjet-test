'use client';

import { deleteUser } from '@/entities/user/api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTransition } from 'react';

interface DeleteUserProps {
  userId: string;
  onClose: () => void;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
  open: boolean;
}

export function DeleteUser({
  userId,
  onClose,
  onSuccess,
  onError,
  open,
}: DeleteUserProps) {
  const [isDeleting, startDeletingTransition] = useTransition();

  const handleDelete = async () => {
    startDeletingTransition(async () => {
      try {
        const result = await deleteUser(userId);
        onSuccess(result.message);
        onClose();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Ошибка при удалении пользователя';
        onError(errorMessage);
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удаление пользователя</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Вы собираетесь удалить пользователя с ID {userId}. Отменить действие
          будет невозможно.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Отмена
        </Button>
        <Button
          onClick={handleDelete}
          autoFocus
          disabled={isDeleting}
          loading={isDeleting}
          color="error"
        >
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
