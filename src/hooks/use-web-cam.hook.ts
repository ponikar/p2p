import { useCallback, useContext, useEffect } from "react";
import { BaseContext } from "../components/base/base.context";
import { getUserMedia } from "../utils/media.utils";

type useWebCamType = (stream: MediaStream) => void;
export const useWebcam = (callback: useWebCamType, dependancies: any[]) => {
  const { video, audio } = useContext(BaseContext);
  useEffect(() => {
    getUserMedia({ video: video, audio: true }, streamingWebcam, (err) =>
      console.log("MEDIA ERROR", err)
    );
  }, [video, audio]);

  const streamingWebcam = useCallback(
    (stream: MediaStream) => {
      if (!video) stream.getTracks().forEach(track => track.stop());
      if (!audio) stream.getAudioTracks().forEach(track => track.stop());
      callback(stream);
    },
    [callback, video, audio]
  );

  return [];
};
