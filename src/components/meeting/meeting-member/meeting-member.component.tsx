import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { MemberProps } from "../../../types/members.types";
import { VideoArea } from "../../video-area/video-area.component";
import "./meeting-member.style.css";

interface MeetingMemberType extends MemberProps {
  membersLength: number;
}

export const MeetingMember: FC<MeetingMemberType> = ({
  membersLength,
  stream,
  user,
  controlChannel,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [{ video, audio }, setControls] = useState({
    video: true,
    audio: false,
  });

  useEffect(() => {
    if (controlChannel) {
      controlChannel.onmessage = (e) => {
        setControls(JSON.parse(e.data));
      };
    }
  }, [controlChannel, video, audio]);

  useEffect(() => {
    const src = videoRef.current;
    if (src) {
      src.srcObject = stream;
      src.play();
    }
  }, [videoRef, video, stream]);

  return (
    <div
      className={`${
        membersLength == 1
          ? "member-wide-area"
          : membersLength == 2
          ? "member-med-area"
          : "member-shrink-area"
      } m-2`}
    >
      <VideoArea
        audio={audio}
        videoRef={videoRef}
        video={video}
        src="src"
        muted={true}
        className="w-full h-full"
        {...user}
      />
    </div>
  );
};
