import React, { FC, useContext } from "react";
import { MemberProps } from "../../../types/members.types";
import { MeetingAreaContext } from "../meeting-area/meeting-area.component";
import { MeetingMemberItem } from "./meeting-member-item.component";
import "./meeting-members-list.style.css";
type MemberListType = [key: string, member: MemberProps];
export const MeetingMembersList: FC = () => {
  const { members } = useContext(MeetingAreaContext);
  return (
    <ul className="list-container">
      {Object.entries(members).map(([key, { user }]: MemberListType) => {
        return user && <MeetingMemberItem key={key} {...user} />;
      })}
    </ul>
  );
};
