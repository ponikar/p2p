import { fb } from "../firebase.config";

export const saveOffer = async (
  doc: fb.firestore.DocumentData,
  offer: object
) => {
  await doc.set({ offer });
};

export const saveOfferCandidates = (
  doc: fb.firestore.DocumentData,
  candidate: RTCIceCandidate
) => {
  return doc.collection("offerCandidates").add(candidate.toJSON());
};

export const saveAnswerCandidates = (
  doc: fb.firestore.DocumentData,
  candidate: RTCIceCandidate
) => {
  return doc.collection("answerCandidates").add(candidate.toJSON());
};

export const listenForICECandidate = (
  collection: fb.firestore.CollectionReference,
  connection: RTCPeerConnection
) => {
  collection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        connection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
      }
    });
  });
};
