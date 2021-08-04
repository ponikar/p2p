import { useCallback, useContext, useEffect } from "react";
import { BaseContext } from "../components/base/base.context";
import { getUserMedia } from "../utils/media.utils";

type useWebCamType = (stream: MediaStream) => void;
export const useWebcam = (callback: useWebCamType, dependancies: any[]) => {
  const { video } = useContext(BaseContext);
  useEffect(() => {
    getUserMedia({ video, audio: true }, streamingWebcam, (err) =>
      console.log("MEDIA ERROR", err)
    );
  }, [video, ...dependancies]);

  const streamingWebcam = useCallback(
    (stream: MediaStream) => {
      callback(stream);
    },
    [callback]
  );

  return [];
};
