import MuiAlert, { type AlertColor } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ReactNode } from 'react';

export interface AlertObject {
  severity: AlertColor;
  message: string;
}

interface AlertProps {
  autoHideDuration?: number;
  severity?: AlertColor;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Alert({
  severity,
  autoHideDuration = 5000,
  open,
  onClose,
  children,
}: AlertProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={onClose}
    >
      <MuiAlert
        severity={severity}
        onClose={onClose}
        sx={{ width: '100%' }}
        variant="filled"
      >
        {children}
      </MuiAlert>
    </Snackbar>
  );
}
