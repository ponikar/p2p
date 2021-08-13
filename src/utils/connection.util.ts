import { DataChannels } from "../constants/channels.constants";
import { ConnectionType, Peer } from "../types/connection.types";
import { UserType } from "../types/user.type";
import { iterateObjects } from "./common.util";

const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export const createConnection = () => {
  return new RTCPeerConnection(servers);
};

export const addTracks = (
  con: RTCPeerConnection,
  stream: MediaStream,
  video: boolean
) => {
  const newStream = new MediaStream();
  stream.getTracks().forEach((s) => {
    s.enabled = video;
    con.addTrack(s, newStream);
  });
};

export const removeTracks = (con: RTCPeerConnection) => {
  con.getSenders().forEach((sender) => con.removeTrack(sender));
};

export const removeConnection = (con: RTCPeerConnection) => {
  con.onicecandidate = null;
  con.ontrack = null;
  con.onnegotiationneeded = null;
  con.ondatachannel = null;
  con.close();
};

export const removeDataChannelListener = (channel: RTCDataChannel) => {
  channel.onmessage = null;
  channel.onclose = null;
  channel.onopen = null;
};

export const onOneConnectionICEStates = (
  { connection, user }: Peer,
  callback: (user: UserType) => void
) => {
  connection.oniceconnectionstatechange = (e) => {
    switch (connection.iceConnectionState) {
      case "disconnected":
      case "closed":
      case "failed":
        return callback(user);
      default:
        return;
    }
  };
};

export const onConnectionsICEStates = (
  connections: ConnectionType,
  callback: (user: UserType) => void
) => {
  iterateObjects<Peer>(connections, ([uid, peer]) => {
    onOneConnectionICEStates(peer, callback);
  });
};

export const removeOneConnectionICEStates = (connection: RTCPeerConnection) => {
  connection.oniceconnectionstatechange = null;
};

export const removeConnectionsICEStates = (connections: ConnectionType) => {
  iterateObjects<Peer>(connections, ([uid, peer]) => {
    removeOneConnectionICEStates(peer.connection);
  });
};
