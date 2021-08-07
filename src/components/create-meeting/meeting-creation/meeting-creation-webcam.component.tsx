import { BaseContext } from "../../base/base.context";
import { VideoArea } from "../../video-area/video-area.component";
import { ControlButtonArea } from "../../webcam-streaming/control-button-area.component";
import React, { FC, useContext } from "react";

export const MeetingCreationWebcam: FC = () => {
  const { video } = useContext(BaseContext);
  return (
    <>
      <VideoArea
        className="meeting-webcam-area"
        src=""
        participant_name=""
        muted
        {...{ video, videoRef: null }}
      />
      <div className="mt-5">
        <ControlButtonArea
          hideHangupButton
          buttonSize={18}
          buttonClassName="p-3 bg-secondryBack"
        />
      </div>
    </>
  );
};
