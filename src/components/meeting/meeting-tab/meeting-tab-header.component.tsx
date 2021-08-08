import React, { FC, useEffect, useState } from "react";
import { MessageSquare, Users } from "react-feather";
import { getCurrentTime } from "../../../utils/time.utills";
import { MeetingSelectTab } from "./meeting-select-tab.component";

const iconProps = { size: 14, className: "mr-1" };

export const MeetingTabHeader: FC = () => {
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
        <MeetingSelectTab isTabActive={true}>
          <Users {...iconProps} /> Members
        </MeetingSelectTab>
        <MeetingSelectTab isTabActive={false}>
          <MessageSquare {...iconProps} /> Messages
        </MeetingSelectTab>
      </div>
    </header>
  );
};
