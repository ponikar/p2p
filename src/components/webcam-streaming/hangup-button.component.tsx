import React, { FC, useCallback, useEffect } from "react";
import { Icon, PhoneCall } from "react-feather";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  SocketChannel,
  SocketEvents,
} from "../../constants/channels.constants";
import { selectUser } from "../../store/user/user.selectors";
import { MeetingAreaParamsType } from "../../types/params.types";
import { removeTracks } from "../../utils/connection.util";
import { onBeforeUnload, removeOnBeforeUnload } from "../../utils/media.utils";
import { useMeetingAreaContext } from "../meeting/meeting-area/meeting-area.context";
import { StreamControlButton } from "./control-button.component";

interface HangupButtonProps {
  commonProps: Partial<Icon>;
  buttonClassName: string;
}

export const HangupButton: FC<HangupButtonProps> = ({
  buttonClassName,
  commonProps,
}) => {
  useEffect(() => {
    onBeforeUnload();

    return () => {
      removeOnBeforeUnload();
    };
  }, []);
  const { socketConnection, stream } = useMeetingAreaContext();
  const user = useSelector(selectUser);
  const { meetingId } = useParams<MeetingAreaParamsType>();
  const { replace } = useHistory();
  const hangupCall = useCallback(() => {
    if (socketConnection) {
      socketConnection.emit(
        SocketChannel.onUser,
        JSON.stringify({ user, meetingId, type: SocketEvents.USER_LEFT })
      );
    }
    removeTracks(stream);
    replace(`/${meetingId}/bye`);
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
