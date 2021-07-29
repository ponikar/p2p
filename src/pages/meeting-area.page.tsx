import { motion } from "framer-motion";
import React, { FC, memo, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { BaseContext } from "../components/base/base.context";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";
import { WebRTCChannels } from "../constants/channels.constants";
import { useMeetingInfo } from "../hooks/use-meeting-info.hook";
import { useWebcam } from "../hooks/use-web-cam.hook";
import {
  acceptOffer,
  Connection,
  createWebRTCChannel,
} from "../utils/connection.util";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  const { meetingId } = useParams<{ meetingId: string }>();
  const [] = useMeetingInfo();
  const { setControls, dataChannels } = useContext(BaseContext);
  useWebcam(() => {
    // listening for event
    // Todo: need to refactor
    Connection.ondatachannel = (e) => {
      setControls({
        dataChannels: {
          ...dataChannels,
          [e.channel.label]: e.channel,
        },
      });
    };
    if (meetingId !== "me" && meetingId) {
      const channel_name = WebRTCChannels.getUserStreamingControl("B");
      createWebRTCChannel(channel_name);
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
