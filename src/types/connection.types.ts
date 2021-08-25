import { StreamingControlTypes } from "../components/webcam-streaming/webcam-streaming.types";
import { UserType } from "./user.type";

export interface DataChannelType {
  [key: string]: RTCDataChannel;
}

export interface Peer {
  connection: RTCPeerConnection;
  user: UserType;
  dataChannels?: DataChannelType;
  streamingControls: StreamingControlTypes;
}

export interface ConnectionType {
  [key: string]: Peer;
}
