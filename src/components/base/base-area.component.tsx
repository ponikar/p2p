import React, { FC, useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { io, Socket } from "socket.io-client";
import { useAuth } from "../../hooks/auth/use-auth.hook";
import { Toast } from "../common/toast/toast.component";
import {
  SetToastPropsType,
  ToastContext,
  ToastPropsType,
  TOAST_DEFAULT_STATE,
} from "../common/toast/toast.context";
import { StreamingControlTypes } from "../webcam-streaming/webcam-streaming.types";
import { BaseContext } from "./base.context";
export const BaseArea: FC = ({ children }) => {
  const [meetingControls, setMeetingControls] = useState<StreamingControlTypes>(
    { video: true, audio: true }
  );
  const [toast, setToast] = useState<ToastPropsType>(TOAST_DEFAULT_STATE);
  const [socket, setSocket] = useState<Socket | null>(null);
  useAuth();
  useEffect(() => {
    setSocket(io("ws://localhost:8085"));
  }, []);
  const setToastProps = useCallback(
    (props: SetToastPropsType) => setToast({ ...toast, ...props }),
    []
  );

  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <BaseContext.Provider
        value={{
          ...meetingControls,
          socketConnection: socket,
          setControls: (props: object) =>
            setMeetingControls({ ...meetingControls, ...props }),
        }}
      >
        <ToastContext.Provider value={{ ...toast, setToastProps }}>
          {children}
          <Toast />
        </ToastContext.Provider>
      </BaseContext.Provider>
    </QueryClientProvider>
  );
};
