import React, { FC, useEffect, useRef } from "react";
import { VideoArea } from "../../video-area/video-area.component";
import { MemberType } from "../meeting-members/meeting-members.component";
import "./meeting-member.style.css";

interface MeetingMemberType extends MemberType {
  membersLength: number;
}

export const MeetingMember: FC<MeetingMemberType> = ({
  membersLength,
  stream,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const src = videoRef.current;
    if (src) {
      src.srcObject = stream;
    }
  }, []);
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
        videoRef={videoRef}
        video={stream ? true : false}
        src="src"
        muted
        className="w-full h-full"
        participant_name="Darshan"
      />
    </div>
  );
};
