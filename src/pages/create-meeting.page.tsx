import React, { FC, memo, useEffect, useState } from "react";
import { CreateMeetingHeader } from "../components/create-meeting/create-meeting-header/create-meeting-header.component";
import { MeetingCreation } from "../components/create-meeting/meeting-creation/meeeting-creation.component";

export const CreateMeeting: FC = memo(() => {
  useEffect(() => {
    document.title = "Hello | 🥳️ Hangout with your friends.";
  }, []);
  return (
    <React.Fragment>
      <CreateMeetingHeader />
      <main className="w-full text-highlight h-screen center">
        <MeetingCreation />
      </main>
    </React.Fragment>
  );
});
