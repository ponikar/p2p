import React, { FC, useCallback, useContext } from "react";
import { Icon, PhoneCall } from "react-feather";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  SocketChannel,
  SocketEvents,
} from "../../constants/channels.constants";
import { selectUser } from "../../store/user/user.selectors";
import { BaseContext } from "../base/base.context";
import { StreamControlButton } from "./control-button.component";

interface HangupButtonProps {
  commonProps: Partial<Icon>;
  buttonClassName: string;
}

export const HangupButton: FC<HangupButtonProps> = ({
  buttonClassName,
  commonProps,
}) => {
  const { socketConnection } = useContext(BaseContext);
  const user = useSelector(selectUser);
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const hangupCall = useCallback(() => {
    if (socketConnection) {
      console.log("I AM HANNGING UP PHONE!");
      socketConnection.emit(
        SocketChannel.onUser,
        JSON.stringify({ user, meetingId, type: SocketEvents.USER_LEFT })
      );
    }
  }, [socketConnection]);

  return (
    <StreamControlButton
      iconClassName="text-white"
      IconComponent={PhoneCall}
      {...commonProps}
      onClick={hangupCall}
      buttonClassName={`bg-red-900 ${buttonClassName}`}
    />
  );
};
