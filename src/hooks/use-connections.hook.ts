import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { SocketChannel, SocketEvents } from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";
import { UserType } from "../types/user.type";
import {
  createConnection,
  createConnectionAndOffer,
} from "../utils/connection.util";

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
    if (socketConnection) {
      socketConnection.on(channel, async (e) => {
        const data = JSON.parse(e);
        switch (data.type) {
          case SocketEvents.NEW:
            return createNewOffer(data);
          case SocketEvents.OFFER:
            return acceptNewOffer(data);
          case SocketEvents.ANSWER:
            break;
        }
      });
    }
  }, [socketConnection]);

  const addConnection = useCallback(
    (id: string, connection: Peer) =>
      setCon({
        ...con,
        [id]: connection,
      }),
    [con]
  );

  const createNewOffer = useCallback(
    async (data) => {
      const { user } = data;
      const { connection, offer } = await createConnectionAndOffer();

      addConnection(user.uid, { user, connection });
      // send offer
      socketConnection &&
        socketConnection.emit(
          channel,
          JSON.stringify({
            offer,
            type: SocketEvents.OFFER,
            from: auth,
            to: user.uid,
          })
        );
    },
    [con, channel]
  );

  const acceptNewOffer = useCallback(
    async (data) => {
      const { from, to, offer } = data;
      if (to === auth.uid) {
        const con = createConnection();
        await con.setRemoteDescription(offer);
        const answer = await con.createAnswer();
        con.setLocalDescription(answer);
        addConnection(from.uid, { connection: con, user: from });

        socketConnection &&
          socketConnection.emit(
            channel,
            JSON.stringify({
              type: SocketEvents.ANSWER,
              from: auth,
              to: from.uid,
              answer,
            })
          );
      }
    },
    [con, channel]
  );

  return [con];
};
