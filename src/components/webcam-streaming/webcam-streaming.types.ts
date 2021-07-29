export interface StreamingControlTypes {
  video: boolean;
  audio: boolean;

  dataChannels: DataChannelType;
}

interface DataChannelType {
  [key: string]: RTCDataChannel;
}
