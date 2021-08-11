import React, {
  FC,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./webcam-streaming.style.css";
import { VideoArea } from "../video-area/video-area.component";
import { ControlButtonArea } from "./control-button-area.component";
import { motion } from "framer-motion";
import { BaseContext } from "../base/base.context";
import { getMedia } from "../../utils/media.utils";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user/user.selectors";

interface WebCamStreamingProps {
  contstrainRef: RefObject<Element>;
}
export const WebCamStreaming: FC<WebCamStreamingProps> = ({
  contstrainRef,
}) => {
  const { video, audio } = useContext(BaseContext);
  const videoRef = useRef<HTMLVideoElement>(null);
  const user = useSelector(selectUser);

  useEffect(() => {
    getUserMedia();
  }, [video]);

  const getUserMedia = useCallback(async () => {
    const stream = await getMedia({ video: true, audio: true });
    if (!video) {
      stream.getTracks().forEach((e) => (e.enabled = false));
    }
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    }
  }, [video, audio, videoRef.current]);

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
