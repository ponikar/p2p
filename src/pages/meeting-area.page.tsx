import { motion } from "framer-motion";
import React, { FC, memo, useRef } from "react";
import { useParams } from "react-router-dom";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";
import { useMeetingInfo } from "../hooks/use-meeting-info.hook";
import { useWebcam } from "../hooks/use-web-cam.hook";
import { acceptOffer } from "../utils/connection.util";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  const { meetingId } = useParams<{ meetingId: string }>();
  const [] = useMeetingInfo();
  useWebcam(() => {
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
