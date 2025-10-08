'use client';

import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useForm } from '@tanstack/react-form';
import { useTransition } from 'react';
import { updateUser } from '../../api';
import { UpdateUserSchema, User } from '../../model';

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
  const { Field, handleSubmit, reset } = useForm({
    defaultValues: user,
    onSubmit: ({ value }) => {
      startSubmittingTransition(async () => {
        try {
          await updateUser(value);
          onSuccess();
          onClose();
          reset();
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : 'Ошибка при редактировании пользователя';
          onError(errorMessage);
        }
      });
    },
    validators: { onChange: UpdateUserSchema },
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Редактирование пользователя</DialogTitle>

      <DialogContent>
        <form
          id="update-user-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Stack direction={'column'} spacing={2} mt={2}>
            <Field
              name="name"
              // eslint-disable-next-line
              children={({ state, handleChange, handleBlur }) => (
                <TextField
                  autoFocus
                  required
                  label="Имя"
                  fullWidth
                  defaultValue={state.value}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  error={!!state.meta.errors[0]}
                  helperText={state.meta.errors[0]?.message}
                />
              )}
            />
            <Field
              name="email"
              // eslint-disable-next-line
              children={({ state, handleChange, handleBlur }) => (
                <TextField
                  required
                  label="Email"
                  type="email"
                  fullWidth
                  defaultValue={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={isSubmitting}
                  error={!!state.meta.errors[0]}
                  helperText={state.meta.errors[0]?.message}
                />
              )}
            />
            <Field
              name="phone"
              // eslint-disable-next-line
              children={({ state, handleChange, handleBlur }) => (
                <TextField
                  required
                  label="Телефон"
                  fullWidth
                  type="tel"
                  inputMode="tel"
                  defaultValue={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  disabled={isSubmitting}
                  placeholder="+79261234567"
                  error={!!state.meta.errors[0]}
                  helperText={state.meta.errors[0]?.message}
                />
              )}
            />
            <Field
              name="role"
              // eslint-disable-next-line
              children={({ state, handleChange, handleBlur }) => (
                <FormControl fullWidth>
                  <InputLabel>Роль</InputLabel>
                  <Select
                    value={state.value}
                    label="Роль"
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    // disabled={isSubmitting}
                  >
                    <MenuItem value="user">Пользователь</MenuItem>
                    <MenuItem value="manager">Менеджер</MenuItem>
                    <MenuItem value="admin">Администратор</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </Stack>
        </form>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          disabled={isSubmitting}
          type="reset"
          form="update-user-form"
        >
          Отмена
        </Button>
        <Button
          type="submit"
          variant="contained"
          form="update-user-form"
          loading={isSubmitting}
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
