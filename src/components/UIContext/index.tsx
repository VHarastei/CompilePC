import React, { createContext, useState } from 'react';
import { AlertColor } from '@mui/lab/Alert';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const UIContext = createContext<UIContextProps>({} as UIContextProps);

interface UIContextProps {
  setAlert: React.Dispatch<React.SetStateAction<AlertProps>>;
}

interface AlertProps {
  show: boolean;
  severity?: AlertColor;
  message?: string;
}

type UIContextProviderProps = {
  children: React.ReactNode;
};

export const UIContextProvider: React.FC<UIContextProviderProps> = ({
  children,
}) => {
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    severity: 'info',
    message: '',
  });
  const handleClose = () => setAlert((prev) => ({ ...prev, show: false }));

  return (
    <UIContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert elevation={6} variant="filled" severity={alert.severity}>
          {alert.message}
        </MuiAlert>
      </Snackbar>
    </UIContext.Provider>
  );
};
