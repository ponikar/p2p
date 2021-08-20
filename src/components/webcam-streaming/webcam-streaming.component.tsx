import React, { FC, RefObject, useCallback, useEffect, useRef } from "react";
import "./webcam-streaming.style.css";
import { VideoArea } from "../video-area/video-area.component";
import { ControlButtonArea } from "./control-button-area.component";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selectors";
import { useMeetingAreaContext } from "../meeting/meeting-area/meeting-area.context";

interface WebCamStreamingProps {
  contstrainRef: RefObject<Element>;
}
export const WebCamStreaming: FC<WebCamStreamingProps> = ({
  contstrainRef,
}) => {
  const { video, audio, stream } = useMeetingAreaContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    getUserMedia();
  }, [videoRef.current]);

  const getUserMedia = useCallback(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [videoRef.current]);

  return (
    <motion.div className="streaming-area" drag dragConstraints={contstrainRef}>
      <VideoArea
        audio={audio}
        video={video}
        videoRef={videoRef}
        src="src"
        muted
        className="streaming-video"
        {...user}
      />
      <div className="streaming-control">
        <ControlButtonArea />
      </div>
    </motion.div>
  );
};
