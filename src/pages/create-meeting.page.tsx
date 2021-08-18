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
      <main className="w-full flex items-end flex-col text-highlight">
        <header className="text-center w-full py-5">
          <h1 className="text-3xl">Video Meeting for You and Your Love one!</h1>
        </header>
        <MeetingCreation />
      </main>
    </React.Fragment>
  );
});
