import { motion } from "framer-motion";
import React, { FC, memo, useRef, useState } from "react";
import { MeetingCreationWebcam } from "../components/create-meeting/meeting-creation/meeting-creation-webcam.component";
import { MeetingArea } from "../components/meeting/meeting-area/meeting-area.component";
import { WebCamStreaming } from "../components/webcam-streaming/webcam-streaming.component";
import { useMeetingJoin } from "../hooks/use-meeting-join.hook";

export const MeetingAreaPage: FC = memo(() => {
  const contstrainRef = useRef(null);
  const [isJoined, setisJoined] = useState(false);

  return (
    <>
      {isJoined ? (
        <>
          <motion.div ref={contstrainRef}>
            <MeetingArea />
            <WebCamStreaming contstrainRef={contstrainRef} />
          </motion.div>
        </>
      ) : (
        <MeetingCreationWebcam setIsJoined={setisJoined} />
      )}
    </>
  );
});
