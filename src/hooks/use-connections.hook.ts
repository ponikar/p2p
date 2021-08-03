import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { SocketChannel, SocketEvents } from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";
import { UserType } from "../types/user.type";
import { createConnection } from "../utils/connection.util";

interface Peer {
  connection: RTCPeerConnection;
  user: UserType;
}
export interface ConnectionType {
  [key: string]: Peer;
}

export const useConnections = (): [ConnectionType] => {
  const [con, setCon] = useState<ConnectionType>({});
  const { socketConnection } = useContext(BaseContext);
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const auth = useSelector(selectUser);
  const [channel, setChannel] = useState("");

  useEffect(() => {
    meetingId && setChannel(SocketChannel.onRoom(meetingId));
  }, [meetingId]);

  useEffect(() => {
    if (socketConnection && channel) {
      socketConnection.on(channel, async (e) => {
        const data = JSON.parse(e);
        console.log(data.type);
        if (!data.to || (data.to && data.to === auth.uid)) {
          switch (data.type) {
            case SocketEvents.NEW:
              return createNewOffer(data);
            case SocketEvents.OFFER:
              return acceptNewOffer(data);
            case SocketEvents.ANSWER:
              return acceptAnswer(data);
            case SocketEvents.ADD_ICE:
              return addICECandidate(data);
          }
        }
      });
    }
  }, [socketConnection, channel, con]);

  const addConnection = useCallback(
    (id: string, connection: Peer) =>
      setCon((con) => ({ ...con, [id]: connection })),
    [con, setCon]
  );

  const createNewOffer = async (data: any) => {
    const { user } = data;
    const connection = await createConnection();
    const offer = await connection.createOffer();
    onICECandidate(connection, user.uid);
    await connection.setLocalDescription(offer);
    addConnection(user.uid, { user, connection });
    // send offer
    broadcastSignal({ offer, type: SocketEvents.OFFER, to: user.uid });
    console.log("OFFER CREATED");
  };

  const acceptNewOffer = async (data: any) => {
    const { from, offer } = data;
    
    const peer = await createConnection();
    onICECandidate(peer, from.uid);

    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    peer.setLocalDescription(answer);
    addConnection(from.uid, { connection: peer, user: from });
    broadcastSignal({ answer, to: from.uid, type: SocketEvents.ANSWER });
    console.log("SENDING THE ANSWER");
  };

  const acceptAnswer = async (data: any) => {
    const { answer, from, to } = data;
    console.log("ACCEPTING THE ANSWER", con[from.uid], con);
    const peer = con[from.uid];
    if (peer) {
      await peer.connection.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      addConnection(peer.user.uid, peer);
      console.log("ACCEPTED");
    }
  };

  const addICECandidate = (data: any) => {
    const { from, candidate } = data;
    const peer = con[from.uid];
    if (peer) peer.connection.addIceCandidate(candidate);
  };

  const onICECandidate = (connection: RTCPeerConnection, to: string) => {
    connection.onicecandidate = ({ candidate }) => {
      broadcastSignal({ type: SocketEvents.ADD_ICE, candidate, to });
    };
  };

  const broadcastSignal = (data: object) => {
    console.log("BRODCASTING", socketConnection);
    socketConnection &&
      socketConnection.emit(
        SocketChannel.onUser,
        JSON.stringify({
          meetingId,
          from: auth,
          ...data,
        })
      );
  };

  console.log(con);
  return [con];
};
