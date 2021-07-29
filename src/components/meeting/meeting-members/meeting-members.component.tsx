import React, { FC, useContext, useEffect, useState } from "react";
import { Connection } from "../../../utils/connection.util";
import { BaseContext } from "../../base/base.context";
import { MeetingControl } from "../meeting-control/meeting-control.component";
import { MeetingMember } from "../meeting-member/meeting-member.component";

export interface MemberType {
  stream: MediaStream | null;
}
export const MeetingMembers: FC = () => {
  const [members, setMembers] = useState<MemberType[]>([]);
  const { dataChannels } = useContext(BaseContext);
  useEffect(() => {
    Connection.ontrack = (event) => {
      setMembers([...members, { stream: event.streams[0] }]);
    };
  }, []); 
  console.log(dataChannels);
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
