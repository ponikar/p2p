import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import {
  DataChannels,
  SocketChannel,
  SocketEvents,
} from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";
import { ConnectionType, Peer } from "../types/connection.types";
import { createConnection } from "../utils/connection.util";





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
    if (socketConnection && channel && auth.uid) {
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
  }, [socketConnection, channel, con, auth.uid]);

  const addConnection = useCallback(
    (id: string, connection: Peer) =>
      setCon((con) => ({ ...con, [id]: connection })),
    [con, setCon]
  );

  const createNewOffer = async (data: any) => {
    const { user } = data;
    const connection = await createConnection();
    const dataChannel = connection.createDataChannel(DataChannels.CHAT);
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    onICECandidate(connection, user.uid);
    addConnection(user.uid, {
      user,
      connection,
      dataChannels: { [DataChannels.CHAT]: dataChannel },
    });
    // send offer
    broadcastSignal({ offer, type: SocketEvents.OFFER, to: user.uid });
    console.log("OFFER CREATED");
  };

  const acceptNewOffer = async (data: any) => {
    const { from, offer } = data;

    const connection = await createConnection();
    const peer = { connection, user: from };
    addConnection(from.uid, peer);
    onDataChannel(peer);
    await connection.setRemoteDescription(new RTCSessionDescription(offer));
    onICECandidate(connection, from.uid);
    const answer = await connection.createAnswer();
    connection.setLocalDescription(answer);
    broadcastSignal({ answer, to: from.uid, type: SocketEvents.ANSWER });
    console.log("SENDING THE ANSWER");
  };

  const onDataChannel = (peer: Peer) => {
    if (peer) {
      const { connection, user } = peer;
      connection.ondatachannel = (e) => {
        addConnection(user.uid, {
          ...peer,
          dataChannels: { ...peer.dataChannels, [e.channel.label]: e.channel },
        });
      };
    }
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
