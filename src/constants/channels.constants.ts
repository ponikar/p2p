export const WebRTCChannels = {
  CHAT_CHANNEL: "CHAT_CHANNEL",
  getUserStreamingControl: (id: string) => `STREAMING_CONTROL_${id}`,
};

export const SocketChannel = {
   onUser: "user-joined",
   onRoom: (id: string) => `room-${id}`
}
