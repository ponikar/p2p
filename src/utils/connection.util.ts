import { db, fb } from "../firebase/firebase.config";
import {
  listenForICECandidate,
  saveAnswerCandidates,
  saveOffer,
  saveOfferCandidates,
} from "../firebase/firestore/calls.fs";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};

export let DataChannel: RTCDataChannel | null = null;

export const Connection = new RTCPeerConnection(servers);

// listener

// for Sender
// creating a meeting link
export const createMeetingOffer = async () => {
  const callDoc = db.collection("calls").doc();
  
  Connection.onicecandidate = (e) => {
    e.candidate && callDoc && saveOfferCandidates(callDoc, e.candidate);
  };

  // createDataChannel();
  const offerDescription = await Connection.createOffer();
  await Connection.setLocalDescription(offerDescription);

  //store this one at serve side
  await saveOffer(callDoc, {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
  });

  // listen for the answer
  callDoc.onSnapshot((snapshot) => {
    const data = snapshot.data();
    if (!Connection.remoteDescription && data?.answer) {
      console.log("ANSER", data?.answer)
      connectRemoteToLocal(new RTCSessionDescription(data?.answer));
    }
  });

  const answerCandidates = callDoc.collection("answerCandidates");
  listenForICECandidate(answerCandidates, Connection);
  console.log("MEETING ID", callDoc.id);
};

// for Receiver
// when Answered
export const acceptOffer = async (docid: string) => {
  const doc = db.collection("calls").doc(docid);

  Connection.onicecandidate = (e) => {
    e.candidate && saveAnswerCandidates(doc, e.candidate);
  };

  const offerDescription = (await doc.get()).data();
  // listenForRemoteChannel();
  // set Answerer Remote Description
  connectRemoteToLocal(offerDescription?.offer);

  // creating Answer
  const responseOfOffer = await Connection.createAnswer();
  await Connection.setLocalDescription(responseOfOffer);

  doc.update({
    answer: { type: responseOfOffer.type, sdp: responseOfOffer.sdp },
  });

  const offerCandidates = doc.collection("offerCandidates");
  listenForICECandidate(offerCandidates, Connection);
};

// when Receiver accept offer and send Response
export const connectRemoteToLocal = async (
  offerOfResponse: RTCSessionDescriptionInit
) => {
  await Connection.setRemoteDescription(offerOfResponse);
  console.log("CONNECTION CREATED");
};

// export const createDataChannel = () => {
//   const DataChannel = Connection.createDataChannel("meeting-chats");
//   addDataListener(DataChannel);
// };

// export const listenForRemoteChannel = () => {
//   Connection.ondatachannel = (e) => {
//     addDataListener(e.channel);
//   };
// };

// export const addDataListener = (dataChannel: RTCDataChannel) => {
//   DataChannel = dataChannel;
//   dataChannel.onmessage = (e) => console.log("GOT MESSAGE", e.data);
//   dataChannel.onopen = (e) => console.log("CHANNEL OPENED");
//   dataChannel.onclose = (e) => console.log("CHANNEL CLOSED");
// };
