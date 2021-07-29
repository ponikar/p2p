import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { WebRTCChannels } from "../../../constants/channels.constants";
import { BaseContext } from "../../base/base.context";
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
  const { meetingId } = useParams<{ meetingId: string }>();
  const [{ video, audio }, setControls] = useState({
    video: true,
    audio: false,
  });
  const { dataChannels } = useContext(BaseContext);
 
  // setting up control
  useEffect(() => {
    const channel =
      dataChannels[
        WebRTCChannels.getUserStreamingControl(meetingId === "me" ? "B" : "A")
      ];
    if (channel) {
      channel.onmessage = (e) => {
        setControls(JSON.parse(e.data));
      };
    }
  }, [dataChannels]);

  useEffect(() => {
    const src = videoRef.current;
    if (src) {
      console.log("ADDING TRACKS", stream);
      src.srcObject = stream;
      src.play();
    }
  }, [videoRef]);

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
        video={video}
        src="src"
        muted={!audio}
        className="w-full h-full"
        participant_name="Darshan"
      />
    </div>
  );
};
