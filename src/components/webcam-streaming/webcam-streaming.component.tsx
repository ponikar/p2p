import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { getUserMedia } from "../../utils/media.utils";
import "./webcam-streaming.style.css";
import { StreamingControlTypes } from "./webcam-streaming.types";
import { Mic, PhoneOff, Video } from "react-feather";
import { StreamControlButton } from "./control-button.component";

export const WebCamStreaming: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setSteam] = useState<MediaStream | null>(null);
  const [streamingControls, setStreamingControls] =
    useState<StreamingControlTypes>({ video: true, audio: true });
  const { video, audio } = streamingControls;

  const setControls = (props: object) =>
    setStreamingControls({ ...streamingControls, ...props });
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
    console.log(stream);
    const video = videoRef.current;
    video!.srcObject = stream;
    video!.play();
  }, []);

  return (
    <section className="streaming-area">
      <video muted className="streaming-video" ref={videoRef} />

      <div className="absolute flex justify-center w-full bottom-3">
         <StreamControlButton IconComponent={Mic} />
         <StreamControlButton IconComponent={Video} />
         <StreamControlButton iconClassName="text-white" buttonClassName="bg-red-900" IconComponent={PhoneOff} />
      </div>
    </section>
  );
};
