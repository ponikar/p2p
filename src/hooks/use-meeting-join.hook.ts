import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { SocketChannel } from "../constants/channels.constants";

export const useMeetingJoin = () => {
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const { socketConnection } = useContext(BaseContext);

  useEffect(() => {
    if (socketConnection) {
        socketConnection.emit(SocketChannel.onUser, JSON.stringify({ meetingId, user: "ponikar" }));
    }
  }, [socketConnection]);
  return [];
};
