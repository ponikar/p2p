import React, { FC, useRef, useState } from "react";
import { useWebcam } from "../../hooks/use-web-cam.hook";
import { Connection } from "../../utils/connection.util";
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

  const setToastProps = (props: SetToastPropsType) =>
    setToast({ ...toast, ...props });

  // sending tracks
  useWebcam(
    (stream) => {
      const streamSource = new MediaStream();

      stream.getTracks().forEach((s) => {
        Connection.addTrack(s, streamSource);
      });
    },
    [meetingControls.video]
  );

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
