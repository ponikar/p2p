import React, { FC } from "react";
import { Airplay, Clock, MessageSquare, Users } from "react-feather";
import { useTime } from "../../../hooks/use-time.hook";
import { MeetingSelectTab } from "./meeting-select-tab.component";

const iconProps = { size: 14, className: "mr-1" };

interface MeetingTabHeaderProps {
  setIsChatTabActive: React.Dispatch<React.SetStateAction<boolean>>;
  isChatTabActive: boolean;
  totalUsers: number;
}
export const MeetingTabHeader: FC<MeetingTabHeaderProps> = ({
  setIsChatTabActive,
  isChatTabActive,
  totalUsers = 0,
}) => {
  const currentTime = useTime();

  return (
    <header className="w-full flex-col">
      <section className="w-11/12 relative py-3 mx-auto flex items-center justify-around">
        <div className="flex items-center">
          <Airplay size={20} className="text-primary" />
          <div className="mx-2"> {totalUsers} </div>
        </div>
        <div className="flex items-center">
          <Clock size={20} className="text-primary" />
          <div className="mx-2"> {currentTime} </div>
        </div>
      </section>
      <div className="flex">
        <MeetingSelectTab
          onClick={() => setIsChatTabActive(false)}
          isTabActive={!isChatTabActive}
        >
          <Users {...iconProps} /> Members
        </MeetingSelectTab>
        <MeetingSelectTab
          onClick={() => setIsChatTabActive(true)}
          isTabActive={isChatTabActive}
        >
          <MessageSquare {...iconProps} /> Messages
        </MeetingSelectTab>
      </div>
    </header>
  );
};
