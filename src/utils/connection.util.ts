
const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};


export const createConnection = async () => {
  const con = new RTCPeerConnection(servers);
  const stream = await sendMediaTrack(con);
  return con;
};

export const sendMediaTrack = (con: RTCPeerConnection) => {
  return new Promise((res, rej) => {
    navigator.getUserMedia(
      { video: true, audio: false },
      (stream) => {
        stream.getTracks().forEach((s) => {
          con.addTrack(s, stream);
          console.log("SENDING THE TRACKS");
        });
        res(stream);
      },
      () => {
        rej("SOMETHING WENT WRONG");
      }
    );
  });
};
