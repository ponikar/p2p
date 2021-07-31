import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";

export const useMeetingJoin = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { socketConnection } = useContext(BaseContext);

  useEffect(() => {
    if (socketConnection) {
        socketConnection.emit("user-joined", JSON.stringify({ meetingId, }));
    }
  }, [socketConnection]);
  return [];
};
