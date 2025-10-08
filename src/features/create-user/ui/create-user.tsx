'use client';

import { createUser } from '@/entities/user/api/create-user';
import { type CreateUserValidationSchema } from '@/entities/user/model';
import { Alert, AlertObject } from '@/shared/ui';
import { UserForm } from '@/shared/ui/user-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useTransition } from 'react';

export function CreateUser() {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<AlertObject | null>(null);
  const [isSubmitting, startSubmittingTransition] = useTransition();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const onSubmit = async (values: CreateUserValidationSchema) => {
    startSubmittingTransition(async () => {
      await createUser(values);
    });
  };

  const onSuccess = () => {
    setOpen(false);
    setAlert({
      severity: 'success',
      message: 'Пользователь успешно создан',
    });
  };

  const onError = (error: string) => {
    console.error('Ошибка при отправке формы:', error);
    setAlert({
      severity: 'error',
      message: error,
    });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color="primary"
        sx={{ width: 'fit-content' }}
      >
        Создать пользователя
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Создание нового пользователя</DialogTitle>
        <DialogContent>
          <UserForm
            mode="create"
            onSubmit={onSubmit}
            formId="create-user"
            onError={onError}
            onSuccess={onSuccess}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            type="reset"
            form="create-user"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            form="create-user"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
      <Alert severity={alert?.severity} open={!!alert} onClose={closeAlert}>
        {alert?.message}
      </Alert>
    </>
  );
}
