import { fb } from "../firebase.config";

export const saveOffer = async (
  doc: fb.firestore.DocumentData,
  offer: Record<string, unknown>
): Promise<fb.firestore.DocumentData> => {
  return await doc.set({ offer });
};

export const saveOfferCandidates = (
  doc: fb.firestore.DocumentData,
  candidate: RTCIceCandidate
): void => {
  return doc.collection("offerCandidates").add(candidate.toJSON());
};

export const saveAnswerCandidates = (
  doc: fb.firestore.DocumentData,
  candidate: RTCIceCandidate
): void => {
  return doc.collection("answerCandidates").add(candidate.toJSON());
};

export const listenForICECandidate = (
  collection: fb.firestore.CollectionReference,
  connection: RTCPeerConnection
): void => {
  collection.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        connection.addIceCandidate(new RTCIceCandidate(change.doc.data()));
      }
    });
  });
};
