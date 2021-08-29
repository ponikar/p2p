import React, { FC } from "react";

interface MeetingSelectTabProps {
  isTabActive: boolean;
  onClick?: () => void;
}

export const MeetingSelectTab: FC<MeetingSelectTabProps> = ({
  children,
  isTabActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 center ${
        isTabActive
          ? "text-primary border-b-2 border-primary"
          : "text-highlight"
      }  text-xs`}
    >
      {children}
    </button>
  );
};
