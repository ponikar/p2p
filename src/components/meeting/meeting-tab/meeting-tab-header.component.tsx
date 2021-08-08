import React, { FC, useEffect, useState } from "react";
import { MessageSquare, Users } from "react-feather";
import { getCurrentTime } from "../../../utils/time.utills";
import { MeetingSelectTab } from "./meeting-select-tab.component";

const iconProps = { size: 14, className: "mr-1" };

interface MeetingTabHeaderProps {
  setIsChatTabActive: React.Dispatch<React.SetStateAction<boolean>>;
  isChatTabActive: boolean;
}
export const MeetingTabHeader: FC<MeetingTabHeaderProps> = ({
  setIsChatTabActive,
  isChatTabActive,
}) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
  }, []);

  return (
    <header className="w-full flex-col">
      <div> {currentTime} </div>
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
