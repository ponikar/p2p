import React, { FC, useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth } from "../../hooks/auth/use-auth.hook";
import { Toast } from "../common/toast/toast.component";
import {
  SetToastPropsType,
  ToastContext,
  ToastPropsType,
  TOAST_DEFAULT_STATE,
} from "../common/toast/toast.context";
export const BaseArea: FC = ({ children }) => {
  const [toast, setToast] = useState<ToastPropsType>(TOAST_DEFAULT_STATE);
  useAuth();

  const setToastProps = useCallback(
    (props: SetToastPropsType) => setToast({ ...toast, ...props }),
    []
  );

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <ToastContext.Provider value={{ ...toast, setToastProps }}>
        {children}
        <Toast />
      </ToastContext.Provider>
    </QueryClientProvider>
  );
};
