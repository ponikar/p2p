import { db } from "../firebase/firebase.config";
import {
  listenForICECandidate,
  saveAnswerCandidates,
  saveOffer,
  saveOfferCandidates,
} from "../firebase/firestore/calls.fs";

const servers: RTCConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
};

export const Connection = new RTCPeerConnection(servers);

// listener

// for Sender
export const createMeetingOffer = async () => {
  const callDoc = db.collection("calls").doc();

  Connection.onicecandidate = (e) => {
    console.log("ICE CANDIDATE", e);
    e.candidate && callDoc && saveOfferCandidates(callDoc, e.candidate);
  };

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
      console.log("ANSER", data?.answer);
      connectRemoteToLocal(new RTCSessionDescription(data?.answer));
    }
  });

  const answerCandidates = callDoc.collection("answerCandidates");
  listenForICECandidate(answerCandidates, Connection);
  return callDoc.id;
};

// for Receiver
// when Answered
export const acceptOffer = async (docid: string) => {
  const doc = db.collection("calls").doc(docid);

  const offerDescription = (await doc.get()).data();
  // set Answerer Remote Description
  connectRemoteToLocal(offerDescription?.offer);

  Connection.onicecandidate = (e) => {
    console.log("ICE CANDIDATE", e);
    e.candidate && saveAnswerCandidates(doc, e.candidate);
  };

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
};

export const createWebRTCChannel = (channelName: string) => {
  return Connection.createDataChannel(channelName);
};

export const createConnection = async () => {
  const con = new RTCPeerConnection();
  const stream = await sendMediaTrack(con);
  console.log("SENDING TRACKS", stream);
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
