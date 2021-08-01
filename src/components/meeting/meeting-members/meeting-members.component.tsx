import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketChannel } from "../../../constants/channels.constants";
import { BaseContext } from "../../base/base.context";
import { MeetingControl } from "../meeting-control/meeting-control.component";
import { MeetingMember } from "../meeting-member/meeting-member.component";

export interface MemberType {
  stream: MediaStream | null;
}
export const MeetingMembers: FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const { socketConnection } = useContext(BaseContext);
  const { meetingId } = useParams<MeetingAreaParamsType>();

  useEffect(() => {
    if (socketConnection) {
      socketConnection.on(SocketChannel.onRoom(meetingId), (e) => {
          
      });
    }
  }, [socketConnection, members]);

  return (
    <section
      className={`container relative col-span-9 ${
        members.length <= 4 && "items-center"
      } flex justify-center flex-wrap max-h-screen overflow-y-auto h-screen`}
    >
      {members.map((m, index) => (
        <MeetingMember
          stream={m.stream}
          membersLength={members.length}
          key={index}
        />
      ))}
      <MeetingControl />
    </section>
  );
};
