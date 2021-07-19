import { motion } from "framer-motion";
import React, { FC, memo, useRef } from "react";
import { BaseArea } from "../components/base/base-area.component";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  return (
    <BaseArea>
      <motion.div ref={contstrainRef}>
        <MeetingArea />
        <WebCamStreaming contstrainRef={contstrainRef} />
      </motion.div>
    </BaseArea>
  );
});
