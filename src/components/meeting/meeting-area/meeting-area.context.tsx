import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { StreamingControlTypes } from "../../webcam-streaming/webcam-streaming.types";

export interface MeetingAreaContextType extends StreamingControlTypes {
  setControls: (props: Partial<StreamingControlTypes>) => void;
  socketConnection: Socket | null;
}

const BASE_INITIAL_STATE: MeetingAreaContextType = {
  video: true,
  audio: true,
  setControls: () => {},
  socketConnection: null,
};

const Context = createContext<MeetingAreaContextType>(BASE_INITIAL_STATE);
export const MeetingAreaContextProvider: FC = ({ children }) => {
  const [meetingControls, setMeetingControls] = useState<StreamingControlTypes>(
    { video: true, audio: true }
  );

  let socket = useRef<Socket>(io("ws://localhost:8085"));

  const setControls = useCallback(
    (props: Partial<StreamingControlTypes>) => {
      setMeetingControls({ ...meetingControls, ...props });
    },
    [meetingControls.audio, meetingControls.video]
  );

  return (
    <Context.Provider
      value={{
        ...meetingControls,
        setControls,
        socketConnection: socket.current,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMeetingAreaContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error("Make sure you are using Context properly");
  return context;
};
