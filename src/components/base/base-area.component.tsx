import React, { FC, useState } from "react";
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
    { video: true, audio: true, dataChannels: {} }
  );
  const [toast, setToast] = useState<ToastPropsType>(TOAST_DEFAULT_STATE);

  const setToastProps = (props: SetToastPropsType) =>
    setToast({ ...toast, ...props });

  return (
    <BaseContext.Provider
      value={{
        ...meetingControls,
        setControls: (props: object) =>
          setMeetingControls({ ...meetingControls, ...props }),
      }}
    >
      <ToastContext.Provider value={{ ...toast, setToastProps }}>
        {children}
        <Toast />
      </ToastContext.Provider>
    </BaseContext.Provider>
  );
};
