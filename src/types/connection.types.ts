import { UserType } from "./user.type";

export interface DataChannelType {
    [key: string]: RTCDataChannel;
}


export interface Peer {
    connection: RTCPeerConnection;
    user: UserType;
    dataChannels?: DataChannelType;
}

export interface ConnectionType {
    [key: string]: Peer;
  }
  