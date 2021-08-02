import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { SocketChannel, SocketEvents } from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";

export const useMeetingJoin = () => {
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const { socketConnection } = useContext(BaseContext);
  const user = useSelector(selectUser);
  useEffect(() => {
    if (socketConnection && user.uid) {
      socketConnection.emit(
        SocketChannel.onUser,
        JSON.stringify({ meetingId, user, type: SocketEvents.NEW })
      );
    }
  }, [socketConnection, user.uid]);
  return [];
};
