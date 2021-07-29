import { useCallback, useContext, useEffect } from "react";
import { BaseContext } from "../components/base/base.context";
import { Connection } from "../utils/connection.util";
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
      const streamSource = new MediaStream();
      stream.getTracks().forEach((s) => {
        Connection.addTrack(s, streamSource);
      });
      callback(stream);
    },
    [callback]
  );

  return [];
};
