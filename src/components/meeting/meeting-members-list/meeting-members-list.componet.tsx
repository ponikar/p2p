import React, { FC, useContext } from "react";
import { MemberProps } from "../../../types/members.types";
import { MeetingAreaContext } from "../meeting-area/meeting-area.component";

type MemberListType = [key: string, member: MemberProps];
export const MeetingMembersList: FC = () => {
  const { members } = useContext(MeetingAreaContext);
  return (
    <ul className="px-4 py-2">
      {Object.entries(members).map(([key, { user }]: MemberListType) => {
        return (
          user.displayName && (
            <li key={key} className="p-1 text-sm flex items-center">
              <img
                src="https://robohash.org/23"
                className="object-cover w-12 h-12 border-secondryBack border rounded-full"
                alt={user.displayName}
              />
              <h2 className="ml-4"> {user.displayName} </h2>
            </li>
          )
        );
      })}
    </ul>
  );
};
