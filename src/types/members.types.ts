import { UserType } from "./user.type";

export interface MemberProps {
  stream: MediaStream;
  user: UserType;
  controlChannel?: RTCDataChannel | null;
}

export interface MemberType {
  [key: string]: MemberProps;
}
