import React, { FC, RefObject, useCallback, useContext, useEffect, useRef, useState } from "react";
import { getUserMedia } from "../../utils/media.utils";
import "./webcam-streaming.style.css";
import { StreamingControlTypes } from "./webcam-streaming.types";
import { VideoArea } from "../video-area/video-area.component";
import { ControlButtonArea } from "./control-button-area.component";
import { motion } from "framer-motion";
import { BaseContext } from "../base/base.context";

interface WebCamStreamingProps {
  contstrainRef: RefObject<Element>;
}
export const WebCamStreaming: FC<WebCamStreamingProps> = ({
  contstrainRef,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setSteam] = useState<MediaStream | null>(null);
  const { video, audio } = useContext(BaseContext)

  useEffect(() => {
    getWebcamAccess();
  }, [video, audio]);

  const getWebcamAccess = () => {
    if (video || audio) {
      getUserMedia({ video, audio }, streamingWebcam, (err) =>
        console.log("MEDIA ERROR", err)
      );
    }
  };

  const streamingWebcam = useCallback((stream: MediaStream) => {
    setSteam(stream);
    const video = videoRef.current;
    video!.srcObject = stream;
    video!.play();
  }, []);

  return (
    <motion.div className="streaming-area" drag dragConstraints={contstrainRef}>
      <VideoArea
        {...{ video, videoRef }}
        src="src"
        muted
        className="streaming-video"
        participant_name="Darshan Ponikar"
      />
      <div className="streaming-control">
        <ControlButtonArea />
      </div>
    </motion.div>
  );
};
