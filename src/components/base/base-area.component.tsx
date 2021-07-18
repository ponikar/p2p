import { motion } from "framer-motion";
import React, { FC, useRef, useState } from "react";
import { StreamingControlTypes } from "../webcam-streaming/webcam-streaming.types";
import { BaseContext } from "./base.context";

export const BaseArea: FC = ({ children }) => {
  const [meetingControls, setMeetingControls] = useState<StreamingControlTypes>(
    { video: true, audio: true }
  );

  return (
    <BaseContext.Provider
      value={{
        ...meetingControls,
        setControls: (props: object) =>
          setMeetingControls({ ...meetingControls, ...props }),
      }}
    >
      {children}
    </BaseContext.Provider>
  );
};
