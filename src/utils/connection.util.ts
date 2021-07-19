const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export const Connection = new RTCPeerConnection(servers);

Connection.onicecandidate = e =>  {
    console.log(" NEW ice candidnat!! on localconnection reprinting SDP " )
     console.log(JSON.stringify(Connection.localDescription))
}
    
// listener

// for Sender
// creating a meeting link
export const createMeetingOffer = async () => {
  createDataChannel();
  const offerDescription = await Connection.createOffer();
  await Connection.setLocalDescription(offerDescription);
  return offerDescription;
  // TODO: store this one at serve side
};

// for Receiver
// when Answered
export const acceptOffer = async (meetingOffer: RTCSessionDescriptionInit) => {
  if (!Connection.currentRemoteDescription) {
    listenForRemoteChannel();
    // set Answerer Remote Description
    await Connection.setRemoteDescription(meetingOffer);

    // creating Answer
    const responseOfOffer = await Connection.createAnswer();
    await Connection.setLocalDescription(responseOfOffer);

    console.log("OFFER ACCEPTED SENDING ANSWER");
    console.log(JSON.stringify(responseOfOffer));
    return responseOfOffer;
  } else {
    console.log("THERE IS ALREADY THE ONE!");
  }
};

// when Receiver accept offer and send Response
export const connectRemoteToLocal = async (
  offerOfResponse: RTCSessionDescriptionInit
) => {
  await Connection.setRemoteDescription(offerOfResponse);
  console.log("CONNECTION CREATED");
};

export const createDataChannel = () => {
  const DataChannel = Connection.createDataChannel("meeting-chats");
  addDataListener(DataChannel);
};

export const listenForRemoteChannel = () => {
  Connection.ondatachannel = (e) => {
    addDataListener(e.channel);
  };
};

export const addDataListener = (DataChannel: RTCDataChannel) => {
    Connection.channel = DataChannel;
  DataChannel.onmessage = (e) => console.log("GOT MESSAGE", e.data);
  DataChannel.onopen = (e) => console.log("CHANNEL OPENED");
  DataChannel.onclose = (e) => console.log("CHANNEL CLOSED");

};
