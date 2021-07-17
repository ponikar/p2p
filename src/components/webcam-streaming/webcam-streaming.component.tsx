import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { getUserMedia } from "../../utils/media.utils";
import "./webcam-streaming.style.css";
import { StreamingControlTypes } from "./webcam-streaming.types";
import { Mic, MicOff, PhoneCall, Video, VideoOff } from "react-feather";
import { StreamControlButton } from "./control-button.component";
import { VideoArea } from "../video-area/video-area.component";
import { ControlButtonArea } from "./control-button-area.component";

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
      <div className="streaming-area">
        <VideoArea
          {...{ video, videoRef }}
          src="src"
          muted
          className="streaming-video"
          participant_name="Darshan Ponikar"
        />
        <div className="streaming-control">
            <ControlButtonArea {...{video,audio,setControls}} />
        </div>
      </div>
  );
};
