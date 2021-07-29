export interface StreamingControlTypes {
  video: boolean;
  audio: boolean;

  dataChannel: RTCDataChannel | null;
}
