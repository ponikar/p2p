import React, { FC } from "react";
import { UserType } from "../../../types/user.type";
import { MeetingControl } from "../meeting-control/meeting-control.component";
import { MeetingMember } from "../meeting-member/meeting-member.component";


interface MeetingMembersProps {
   members: MemberType[]
}

export interface MemberType {
    stream: MediaStream,
    user: UserType
}


export const MeetingMembers: FC<MeetingMembersProps> = ({ members = [] }) => {
  
  return (
    <section
      className={`container relative col-span-9 ${
        members.length <= 4 && "items-center"
      } flex justify-center flex-wrap max-h-screen overflow-y-auto h-screen`}
    >
      {members.map((m, index) => (
        <MeetingMember
          {...m}
          membersLength={members.length}
          key={m.user.uid}
        />
      ))}
      <MeetingControl />
    </section>
  );
};
