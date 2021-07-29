import { motion } from "framer-motion";
import React, { FC, memo, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";
import { useMeetingInfo } from "../hooks/use-meeting-info.hook";
import { useWebcam } from "../hooks/use-web-cam.hook";
import { acceptOffer, Connection } from "../utils/connection.util";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  const { meetingId } = useParams<{ meetingId: string }>();
  const [] = useMeetingInfo();
  const { setControls, dataChannels } = useContext(BaseContext);
  useWebcam(() => {
    // For Recevier: Accepting offer and Setting up listener
    if (meetingId !== "me" && meetingId) {
      Connection.ondatachannel = (e) => {
        setControls({
          dataChannels: {
            ...dataChannels,
            [e.channel.label]: e.channel,
          },
        });
      };
      acceptOffer(meetingId);
    }
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
