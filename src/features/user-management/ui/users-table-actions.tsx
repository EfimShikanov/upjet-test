'use client';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

import { User } from '../../../entities/user/model';
import { UsersDelete } from './users-delete';
import { UsersUpdate } from './users-update';

interface UsersTableActionsProps {
  user: User;
}

type DialogType = 'update' | 'delete';

interface AlertState {
  type: 'success' | 'error';
  message: string;
}

export function UsersTableActions({ user }: UsersTableActionsProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dialog, setDialog] = useState<DialogType>();
  const [alert, setAlert] = useState<AlertState | null>(null);
  const open = Boolean(anchorEl);

  const handleDeleteSuccess = (message: string) => {
    setAlert({ type: 'success', message });
    setDialog(undefined);
  };

  const handleDeleteError = (message: string) => {
    setAlert({ type: 'error', message });
  };

  const handleUpdateSuccess = () => {
    setAlert({ type: 'success', message: 'Пользователь успешно обновлен' });
    setDialog(undefined);
  };

  const handleUpdateError = (message: string) => {
    setAlert({ type: 'error', message });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </svg>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          key={'edit'}
          onClick={() => {
            setAnchorEl(null);
            setDialog('update');
          }}
        >
          Редактировать
        </MenuItem>
        <MenuItem
          key={'delete'}
          onClick={() => {
            setAnchorEl(null);
            setDialog('delete');
          }}
        >
          Удалить
        </MenuItem>
      </Menu>
      <UsersDelete
        open={dialog === 'delete'}
        userId={user.id}
        onClose={() => setDialog(undefined)}
        onSuccess={handleDeleteSuccess}
        onError={handleDeleteError}
      />
      <UsersUpdate
        open={dialog === 'update'}
        user={user}
        onClose={() => setDialog(undefined)}
        onSuccess={handleUpdateSuccess}
        onError={handleUpdateError}
      />
      <Snackbar
        open={alert?.type === 'success'}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeAlert}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
      <Snackbar
        open={alert?.type === 'error'}
        autoHideDuration={5000}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeAlert}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
