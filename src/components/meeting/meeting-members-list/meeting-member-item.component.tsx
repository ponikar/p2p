import React, { FC, memo } from "react";
import { UserType } from "../../../types/user.type";

export const MeetingMemberItem: FC<UserType> = memo(
  ({ displayName, avatar }) => {
    return (
      <li className="p-2 text-sm border-b border-secondryBack flex items-center">
        <img
          src={avatar}
          className="object-cover w-12 h-12 border-secondryBack border rounded-full"
          alt="p2p meeting App"
        />
        <h2 className="ml-4"> {displayName} </h2>
      </li>
    );
  }
);
