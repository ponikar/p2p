import { VideoArea } from "../../video-area/video-area.component";
import { ControlButtonArea } from "../../webcam-streaming/control-button-area.component";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.selectors";
import { PrimaryButton } from "../../common/button.component";
import { useMeetingJoin } from "../../../hooks/use-meeting-join.hook";
import { getMedia } from "../../../utils/media.utils";
import { CreateMeetingHeader } from "../create-meeting-header/create-meeting-header.component";
import { useMeetingAreaContext } from "../../meeting/meeting-area/meeting-area.context";

interface MeetingCreationWebcamProps {
  setIsJoined: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MeetingCreationWebcam: FC<MeetingCreationWebcamProps> = ({
  setIsJoined,
}) => {
  const { video, audio } = useMeetingAreaContext();
  const user = useSelector(selectUser);
  const [isReady, askToJoin] = useMeetingJoin();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      if (videoRef.current) {
        const stream = await getMedia({ video: true, audio: true });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    })();
  }, [videoRef.current]);
  const joinMeeting = useCallback(() => {
    askToJoin();
    setIsJoined(true);
  }, [askToJoin, setIsJoined]);
  return (
    <>
      <CreateMeetingHeader />
      <div className="center flex-col h-screen">
        <VideoArea
          className="w-4/12"
          {...user}
          muted
          {...{ video, audio, videoRef }}
        />
        <div className="mt-5 center">
          <ControlButtonArea
            hideHangupButton
            buttonSize={18}
            buttonClassName="p-3 bg-secondryBack"
          />
          <PrimaryButton
            className="mx-2"
            onClick={joinMeeting}
            disabled={!isReady}
          >
            Join Meeting
          </PrimaryButton>
        </div>
      </div>
    </>
  );
};
