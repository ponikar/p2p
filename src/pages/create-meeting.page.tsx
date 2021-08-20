import React, { FC, memo, useEffect, useState } from "react";
import { HeaderTitle } from "../components/common/typography/typography.component";
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
          <HeaderTitle title="Video Meeting for You and Your Love one!" />
        </header>
        <MeetingCreation />
      </main>
    </React.Fragment>
  );
});
