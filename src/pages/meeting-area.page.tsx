import { motion } from "framer-motion";
import React, { FC, memo, useRef } from "react";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";
import { useMeetingInfo } from "../hooks/use-meeting-info.hook";
import { useMeetingJoin } from "../hooks/use-meeting-join.hook";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  useMeetingInfo();
  useMeetingJoin();
  return (
    <>
      <motion.div ref={contstrainRef}>
        <MeetingArea />
        <WebCamStreaming contstrainRef={contstrainRef} />
      </motion.div>
    </>
  );
});

MeetingAreaPage.displayName = "MeetingAreaPage";
