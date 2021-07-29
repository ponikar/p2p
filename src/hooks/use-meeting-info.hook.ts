import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { Connection } from "../utils/connection.util";

export const useMeetingInfo = () => {
  // const [meetingInfoChannel, setMeetingInfoChannel] =
  //   useState<RTCDataChannel | null>(null);
  // const { video, audio } = useContext(BaseContext);

  // // Testing Temporary Approach
  // const { meetingId } = useParams<{ meetingId: string }>();
  // useEffect(() => {
  //   setMeetingInfoChannel(
  //     Connection.createDataChannel(
  //       meetingId === "me" ? "meeting-info-A" : "meeting-info-B"
  //     )
  //   );
  // }, [meetingId]);
  // useEffect(() => {
  //   if (meetingInfoChannel && meetingInfoChannel.readyState == "open") {
  //     console.log("SENDING CONTROL info");
  //     meetingInfoChannel.send(JSON.stringify({ video, audio }));
  //   }
  // }, [video, audio]);

  return [];
};
