import React, { FC, useState } from "react";
import { MeetingMember } from "../meeting-member/meeting-member.component";

export const MeetingMembers: FC = () => {
  const [members, setMembers] = useState<number[]>([0, 0, 0, 0, 0]);

  return (
    <section
      className={`container col-span-9 ${
        members.length <= 4 && "items-center"
      } flex justify-center flex-wrap border max-h-screen overflow-y-auto h-screen`}
    >
      {members.map((m, index) => (
        <MeetingMember membersLength={members.length} key={index} />
      ))}
    </section>
  );
};
