import { useCallback, useContext, useEffect } from "react";
import { BaseContext } from "../components/base/base.context";
import { getUserMedia } from "../utils/media.utils";

export const useWebcam = () => {
  const { video, videoRef, audio } = useContext(BaseContext);

  useEffect(() => {
    getUserMedia({ video, audio }, streamingWebcam, (err) =>
      console.log("MEDIA ERROR", err)
    );
  }, [video, audio]);

  const streamingWebcam = useCallback((stream: MediaStream) => {
    if (videoRef?.current && stream) {
      const video = videoRef?.current;
      video!.srcObject = stream;
      video!.play();
    }
  }, []);

  return [videoRef];
};
