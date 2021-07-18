import React, { FC, memo, useContext } from "react";
import { Mic, MicOff, PhoneCall, Video, VideoOff } from "react-feather";
import { BaseContext } from "../base/base.context";
import { StreamControlButton } from "./control-button.component";

interface ControlButtonAreaProps {
  buttonSize?: number;
  buttonClassName?: string;
}
export const ControlButtonArea: FC<ControlButtonAreaProps> = memo(({
  buttonSize = 15,
  buttonClassName = "",
}) => {
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
      <StreamControlButton
        iconClassName="text-white"
        IconComponent={PhoneCall}
        {...commonProps}
        buttonClassName={`bg-red-900 ${buttonClassName}`}
      />
    </>
  );
});
