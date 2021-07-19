import React, { FC, useContext } from "react";
import { useWebcam } from "../../../hooks/use-web-cam.hook";
import { BaseContext } from "../../base/base.context";
import { VideoArea } from "../../video-area/video-area.component";
import { ControlButtonArea } from "../../webcam-streaming/control-button-area.component";
export const MeetingCreationRight: FC = () => {
  const [videoRef] = useWebcam();
  const { video } = useContext(BaseContext);
  return (
    <div className="center flex-col flex-1">
      <VideoArea
        className="meeting-webcam-area"
        src=""
        participant_name=""
        muted
        {...{ video, videoRef }}
      />
      <div className="mt-5">
        <ControlButtonArea buttonSize={18} buttonClassName="p-3" />
      </div>
    </div>
  );
};
