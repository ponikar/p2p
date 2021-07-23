import { motion } from "framer-motion";
import React, { FC, memo, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";
import { useWebcam } from "../hooks/use-web-cam.hook";
import { acceptOffer, Connection } from "../utils/connection.util";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  const { meetingId } = useParams<{ meetingId: string }>();

  // sending media tracks
  useWebcam((stream) => {
    const streamSource = new MediaStream();
    if (stream) {
      console.log("SENDING TRACKS", stream)
      stream.getTracks().forEach((s) => {
        Connection.addTrack(s, streamSource);
      });
    }
  });
  useEffect(() => {
    if (meetingId !== "me" && meetingId) acceptOffer(meetingId);
  }, [meetingId]);
  return (
    <>
      <motion.div ref={contstrainRef}>
        <MeetingArea />
        <WebCamStreaming contstrainRef={contstrainRef} />
      </motion.div>
    </>
  );
});
