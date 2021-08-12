import { DataChannels } from "../constants/channels.constants";

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
