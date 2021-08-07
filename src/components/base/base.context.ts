import { createContext } from "react";
import { Socket } from "socket.io-client";
import { StreamingControlTypes } from "../webcam-streaming/webcam-streaming.types";

export interface BaseContextTypes extends StreamingControlTypes {
  setControls: (props: Partial<StreamingControlTypes>) => void;
  socketConnection: Socket | null;
}

const BASE_INITIAL_STATE: BaseContextTypes = {
  video: true,
  audio: true,
  setControls: () => null,
  socketConnection: null,
};

export const BaseContext = createContext<BaseContextTypes>(BASE_INITIAL_STATE);
