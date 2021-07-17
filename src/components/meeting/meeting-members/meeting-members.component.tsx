import React, { FC, useState } from "react";
import { MeetingControl } from "../meeting-control/meeting-control.component";
import { MeetingMember } from "../meeting-member/meeting-member.component";

export const MeetingMembers: FC = () => {
  const [members, setMembers] = useState<number[]>(Array(2).fill(5));

  return (
    <section
      className={`container relative col-span-9 ${
        members.length <= 4 && "items-center"
      } flex justify-center flex-wrap max-h-screen overflow-y-auto h-screen`}
    >
      {members.map((m, index) => (
        <MeetingMember membersLength={members.length} key={index} />
      ))}
      <MeetingControl />
    </section>
  );
};
