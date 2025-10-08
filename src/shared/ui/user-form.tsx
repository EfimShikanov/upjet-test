'use client';

import {
  CreateUserSchema,
  UpdateUserSchema,
  USER_ROLE_NAMES,
  UserRole,
  type CreateUserValidationSchema,
  type UpdateUserValidationSchema,
} from '@/entities/user/model';
import { Stack } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { useForm } from '@tanstack/react-form';
import { useTransition } from 'react';

interface BaseUserFormProps {
  onSuccess: () => void;
  onError: (message: string) => void;
  formId: string;
}

interface CreateUserFormProps extends BaseUserFormProps {
  mode: 'create';
  onSubmit: (values: CreateUserValidationSchema) => Promise<void>;
}

interface UpdateUserFormProps extends BaseUserFormProps {
  mode: 'update';
  initialValues: UpdateUserValidationSchema;
  onSubmit: (values: UpdateUserValidationSchema) => Promise<void>;
}

type UserFormProps = CreateUserFormProps | UpdateUserFormProps;

const defaultCreateValues: CreateUserValidationSchema = {
  name: '',
  email: '',
  phone: '',
  role: UserRole.User,
};

export function UserForm(props: UserFormProps) {
  const [isSubmitting, startSubmittingTransition] = useTransition();

  const isEditMode = props.mode === 'update';
  const schema = isEditMode ? UpdateUserSchema : CreateUserSchema;
  const defaultValues = isEditMode ? props.initialValues : defaultCreateValues;

  const { Field, handleSubmit, reset } = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      startSubmittingTransition(async () => {
        try {
          if (isEditMode) {
            await (props as UpdateUserFormProps).onSubmit(
              value as UpdateUserValidationSchema,
            );
          } else {
            await (props as CreateUserFormProps).onSubmit(
              value as CreateUserValidationSchema,
            );
          }
          if (!isEditMode) {
            reset();
          }
          props.onSuccess();
        } catch (error) {
          props.onError(
            error instanceof Error ? error.message : 'Неизвестная ошибка',
          );
        }
      });
    },
    validators: { onChange: schema },
  });

  return (
    <form
      id={props.formId}
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
              autoFocus={!isEditMode}
              required
              label="Имя"
              fullWidth
              value={state.value || ''}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              disabled={isSubmitting}
              error={state.meta.errors.length > 0}
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
              value={state.value || ''}
              onBlur={handleBlur}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isSubmitting}
              error={state.meta.errors.length > 0}
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
              value={state.value || ''}
              onBlur={handleBlur}
              onChange={(e) => handleChange(e.target.value)}
              disabled={isSubmitting}
              placeholder="+79261234567"
              error={state.meta.errors.length > 0}
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
                value={state.value || UserRole.User}
                label="Роль"
                onChange={(e) => handleChange(e.target.value as UserRole)}
                onBlur={handleBlur}
                disabled={isSubmitting}
              >
                {Object.entries(USER_ROLE_NAMES).map(([key, name]) => (
                  <MenuItem key={key} value={key}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Stack>
    </form>
  );
}
