import React, { FC, memo, useContext } from "react";
import { MeetingCreationRightHero } from "./meeting-creation-right-hero.component";

export const MeetingCreationRight: FC = memo(() => {
  return (
    <div className="center flex-col flex-1">
      <MeetingCreationRightHero />
    </div>
  );
});
