import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { WebRTCChannels } from "../constants/channels.constants";
import { Connection } from "../utils/connection.util";

export const useMeetingInfo = () => {
  const { video, audio, dataChannels } = useContext(BaseContext);

  // Testing Temporary Approach
  const { meetingId } = useParams<{ meetingId: string }>();
  useEffect(() => {
    const channel =
      dataChannels[
        WebRTCChannels.getUserStreamingControl(meetingId === "me" ? "A" : "B")
      ];
    if (channel) {
      channel.send(JSON.stringify({ video, audio }));
    }
  }, [meetingId, video, audio]);

  return [];
};
