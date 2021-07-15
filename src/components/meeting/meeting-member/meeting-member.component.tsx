import React, { FC, useRef } from "react";
import { VideoArea } from "../../video-area/video-area.component";
import "./meeting-member.style.css"


interface MeetingMemberType {
   membersLength: number;
}

export const MeetingMember:FC<MeetingMemberType> = ({ membersLength }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div  className={`${membersLength == 1 ? "member-wide-area": membersLength == 2 ? "member-med-area" : "member-shrink-area"} m-2`}>
      <VideoArea
        videoRef={videoRef}
        video={false}
        src="src"
        muted
        className="w-full h-full"
        participant_name="Darshan"
      />
    </div>
  );
};
