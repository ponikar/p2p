import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMeetingAreaContext } from "../components/meeting/meeting-area/meeting-area.context";
import { SocketChannel, SocketEvents } from "../constants/channels.constants";
import { selectUser } from "../store/user/user.selectors";
import { MeetingAreaParamsType } from "../types/params.types";

export const useMeetingJoin = (): [boolean, Function] => {
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const { socketConnection } = useMeetingAreaContext();
  const user = useSelector(selectUser);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (socketConnection && meetingId && user.uid) {
      setIsReady(true);
    }
  }, [socketConnection, meetingId, user.uid]);

  const askToJoin = useCallback(() => {
    if (isReady) {
      socketConnection?.emit(
        SocketChannel.onUser,
        JSON.stringify({ meetingId, user, type: SocketEvents.NEW })
      );
    }
  }, [isReady, socketConnection]);
  return [isReady, askToJoin];
};
