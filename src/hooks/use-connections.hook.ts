import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContext } from "../components/common/toast/toast.context";
import { useMeetingAreaContext } from "../components/meeting/meeting-area/meeting-area.context";
import {
  DataChannels,
  SocketChannel,
  SocketEvents,
} from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";
import { ConnectionType, Peer } from "../types/connection.types";
import { MeetingAreaParamsType } from "../types/params.types";
import {
  addTracks,
  createConnection,
  onConnectionsICEStates,
  removeConnection,
  removeConnectionsICEStates,
} from "../utils/connection.util";

export const useConnections = (): [ConnectionType] => {
  const [con, setCon] = useState<ConnectionType>({});
  const { socketConnection, stream } = useMeetingAreaContext();
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const auth = useSelector(selectUser);
  const [channel, setChannel] = useState("");
  const { setToastProps } = useContext(ToastContext);

  useEffect(() => {
    meetingId && setChannel(SocketChannel.onRoom(meetingId));
  }, [meetingId]);

  useEffect(() => {
    if (socketConnection && channel && auth.uid) {
      socketConnection.on(channel, onSocketEvents);
    }

    return () => {
      if (socketConnection && channel && auth.uid) {
        socketConnection.off(channel, onSocketEvents);
      }
    };
  }, [socketConnection, channel, con, auth.uid]);

  useEffect(() => {
    // when meeting members get disconnected
    onConnectionsICEStates(con, (user) => {
      hangupCall({ user });
    });

    return () => {
      removeConnectionsICEStates(con);
    };
  }, [con]);

  const onSocketEvents = (e: string) => {
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
        case SocketEvents.USER_LEFT:
          return hangupCall(data);
      }
    }
  };

  const addConnection = useCallback(
    (id: string, connection: Peer) =>
      setCon((con) => ({ ...con, [id]: connection })),
    [con, setCon]
  );

  const createNewOffer = async (data: any) => {
    const { user } = data;
    const connection = createConnection();
    sendTracksAtInitial(connection);
    const dataChannel = connection.createDataChannel(DataChannels.CHAT);
    const controlChannel = connection.createDataChannel(
      DataChannels.STREAMING_CONTROLS
    );
    const offer = await connection.createOffer();
    await connection.setLocalDescription(offer);
    onICECandidate(connection, user.uid);
    addConnection(user.uid, {
      user,
      connection,
      dataChannels: {
        [DataChannels.CHAT]: dataChannel,
        [DataChannels.STREAMING_CONTROLS]: controlChannel,
      },
    });
    // send offer
    setTimeout(() => {
      broadcastSignal({ offer, type: SocketEvents.OFFER, to: user.uid });
    }, 1000);
    console.log("OFFER CREATED");
  };

  const sendTracksAtInitial = (connection: RTCPeerConnection) => {
    addTracks(connection, stream);
  };

  const acceptNewOffer = async (data: any) => {
    const { from, offer } = data;

    const connection = createConnection();
    sendTracksAtInitial(connection);
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
      const uid = peer.user.uid;
      connection.ondatachannel = (e) => {
        setCon((peers) => ({
          ...peers,
          [uid]: {
            ...peers[uid],
            dataChannels: {
              ...peers[uid].dataChannels,
              [e.channel.label]: e.channel,
            },
          },
        }));
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

    connection.onnegotiationneeded = () => {
      console.log("NEED TO NEGOTIATIONS");
    };
  };

  const broadcastSignal = (data: any) => {
    console.log("BRODCASTING", data.type);
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

  const hangupCall = (data: any) => {
    const { user } = data;
    console.log("HANGGING UP THE CALL", con);
    removeConnection(con[user.uid].connection);
    delete con[user.uid];
    setCon({ ...con });
    setToastProps({
      show: true,
      text: `${user.displayName} has left the meeting`,
    });
  };
  console.log(con);
  return [con];
};
