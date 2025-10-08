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
import React, { useState, useTransition } from 'react';
import { createUser } from '../../api/create-user';
import { type CreateUserValidationSchema, CreateUserSchema } from '../../model';
import { User, UserRole } from '../../model';

interface UsersCreateDialogProps {
  onUserCreated?: (user: User) => void;
}

type CreateUserForm = CreateUserValidationSchema;
const defaultUser: CreateUserForm = {
  name: '',
  email: '',
  phone: '',
  role: UserRole.User,
};

export function UsersCreate({ onUserCreated }: UsersCreateDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, startSubmittingTransition] = useTransition();
  const { Field, handleSubmit, reset } = useForm({
    defaultValues: defaultUser,
    onSubmit: ({ value }) => {
      startSubmittingTransition(async () => {
        const newUser = await createUser(value);
        onUserCreated?.(newUser);
        setOpen(false);
        reset();
      });
    },
    validators: { onChange: CreateUserSchema },
  });

  const handleClickOpen = () => {
    setOpen(true);
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
          <form
            id="user-form"
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
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            type="reset"
            form="user-form"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            variant="contained"
            form="user-form"
            loading={isSubmitting}
          >
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
