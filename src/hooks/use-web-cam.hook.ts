import { useCallback, useContext, useEffect } from "react";
import { BaseContext } from "../components/base/base.context";
import { getUserMedia } from "../utils/media.utils";

type useWebCamType = (stram: MediaStream) => void;
export const useWebcam = (callback?: useWebCamType) => {
  const { videoRef, video } = useContext(BaseContext);
  useEffect(() => {
    getUserMedia({ video, audio: true }, streamingWebcam, (err) =>
      console.log("MEDIA ERROR", err)
    );
  }, [video]);

  const streamingWebcam = useCallback((stream: MediaStream) => {
    if (video) {
      if (stream && callback) callback(stream);
      const video = videoRef?.current;
      if (video && stream && !video.srcObject) {
        video.srcObject = stream;
        video.play();
      }
    }
  }, []);

  return [videoRef];
};
