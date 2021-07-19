import React, { FC, memo, useState } from "react";
import { MeetingCreation } from "../components/create-meeting/meeting-creation/meeeting-creation.component";
import { acceptOffer, createMeetingOffer } from "../utils/connection.util";

export const CreateMeeting: FC = memo(() => {
  return <main className="w-full text-highlight h-screen center">
    <MeetingCreation />    
  </main>;
});
