import React, {
  FC,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { getUserMedia } from "../../utils/media.utils";
import "./webcam-streaming.style.css";
import { StreamingControlTypes } from "./webcam-streaming.types";
import { VideoArea } from "../video-area/video-area.component";
import { ControlButtonArea } from "./control-button-area.component";
import { motion } from "framer-motion";
import { BaseContext } from "../base/base.context";
import { useWebcam } from "../../hooks/use-web-cam.hook";

interface WebCamStreamingProps {
  contstrainRef: RefObject<Element>;
}
export const WebCamStreaming: FC<WebCamStreamingProps> = ({
  contstrainRef,
}) => {
  const { video } = useContext(BaseContext);
  const [videoRef] = useWebcam();

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
