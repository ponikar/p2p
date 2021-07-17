import React, { FC } from "react";
import { Mic, MicOff, PhoneCall, Video, VideoOff } from "react-feather";
import { StreamControlButton } from "./control-button.component";

interface ControlButtonAreaProps {
  setControls: (props: object) => void;
  audio: boolean;
  video: boolean;
  buttonSize?: number;
  buttonClassName?: string;
}
export const ControlButtonArea: FC<ControlButtonAreaProps> = ({
  setControls,
  audio,
  video,
  buttonSize = 15,
  buttonClassName = ""
}) => {
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
      <StreamControlButton
        iconClassName="text-white"
        IconComponent={PhoneCall}
        {...commonProps}
        buttonClassName={`bg-red-900 ${buttonClassName}`}
        />
    </>
  );
};
