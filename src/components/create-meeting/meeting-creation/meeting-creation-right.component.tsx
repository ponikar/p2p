import React, { FC, useContext } from "react";
import { MeetingCreationRightHero } from "./meeting-creation-right-hero.component";
import { MeetingCreationWebcam } from "./meeting-creation-webcam.component";

export const MeetingCreationRight: FC = () => {
 
  return (
    <div className="center flex-col flex-1">
     {/* <MeetingCreationWebcam /> */}
     <MeetingCreationRightHero />
    </div>
  );
};
