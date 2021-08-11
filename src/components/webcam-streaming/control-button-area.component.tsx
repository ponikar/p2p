import React, { FC, memo, useContext } from "react";
import { Mic, MicOff, PhoneCall, Video, VideoOff } from "react-feather";
import { BaseContext } from "../base/base.context";
import { StreamControlButton } from "./control-button.component";
import { HangupButton } from "./hangup-button.component";

interface ControlButtonAreaProps {
  buttonSize?: number;
  buttonClassName?: string;
  hideHangupButton?: boolean;
}
export const ControlButtonArea: FC<ControlButtonAreaProps> = memo(
  ({ buttonSize = 15, buttonClassName = "", hideHangupButton = false }) => {
    const { video, audio, setControls } = useContext(BaseContext);
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
