import { StreamingControlTypes } from "../components/webcam-streaming/webcam-streaming.types";
import { UserType } from "./user.type";

export interface MemberProps {
  stream: MediaStream | null;
  user: UserType;
  controlChannel?: RTCDataChannel | null;

  initialControlState: StreamingControlTypes;
}

export interface MemberType {
  [key: string]: MemberProps;
}
