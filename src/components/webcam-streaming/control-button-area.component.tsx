import React, { FC, memo } from "react";
import { Mic, MicOff, Video, VideoOff } from "react-feather";
import { useMeetingAreaContext } from "../meeting/meeting-area/meeting-area.context";
import { StreamControlButton } from "./control-button.component";
import { HangupButton } from "./hangup-button.component";

interface ControlButtonAreaProps {
  buttonSize?: number;
  buttonClassName?: string;
  hideHangupButton?: boolean;
}
export const ControlButtonArea: FC<ControlButtonAreaProps> = memo(
  ({ buttonSize = 15, buttonClassName = "", hideHangupButton = false }) => {
    const { video, audio, setControls } = useMeetingAreaContext();
    const commonProps = { size: buttonSize, buttonClassName };
    return (
      <>
        <StreamControlButton
          onClick={(_) => setControls({ audio: !audio })}
          IconComponent={!audio ? MicOff : Mic}
          {...commonProps}
        />
        <StreamControlButton
          onClick={(_) => setControls({ video: !video })}
          IconComponent={!video ? VideoOff : Video}
          {...commonProps}
        />
        {!hideHangupButton && (
          <HangupButton {...{ commonProps, buttonClassName }} />
        )}
      </>
    );
  }
);
