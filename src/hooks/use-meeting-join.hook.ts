import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { SocketChannel, SocketEvents } from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";

export const useMeetingJoin = (): [boolean, Function] => {
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const { socketConnection } = useContext(BaseContext);
  const user = useSelector(selectUser);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (socketConnection && meetingId && user.uid) {
      setIsReady(true);
    }
  }, [socketConnection, meetingId, user.uid]);

  const askToJoin = useCallback(() => {
    if (isReady) {
      console.log("I AM IN");
      socketConnection?.emit(
        SocketChannel.onUser,
        JSON.stringify({ meetingId, user, type: SocketEvents.NEW })
      );
    }
  }, [isReady, socketConnection]);
  return [isReady, askToJoin];
};
