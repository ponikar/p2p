import { createContext } from "react";
import { StreamingControlTypes } from "../webcam-streaming/webcam-streaming.types";

export interface BaseContextTypes extends StreamingControlTypes {
  setControls: (props: object) => void;
}

const BASE_INITIAL_STATE: BaseContextTypes = {
  video: true,
  audio: true,
  setControls: () => {},
  dataChannel: null,
};

export const BaseContext = createContext<BaseContextTypes>(BASE_INITIAL_STATE);
