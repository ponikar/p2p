import React, { FC, memo, useState } from "react";
import { MeetingLinkPopup } from "../meeting-link-popup/meeting-link-popup.component";
import { MeetingCreationLeft } from "./meeting-creation-left.component";
import { MeetingCreationRight } from "./meeting-creation-right.component";
import {
  MeetingCreationContext,
  MEETING_CREATION_DEFAULT_STATE,
} from "./meeting-creation.context";
import "./meeting-creation.style.css";
export const MeetingCreation: FC = memo(() => {
  const [createMeeting, setCreateMeeting] = useState(
    MEETING_CREATION_DEFAULT_STATE
  );

  const { meetingID, showMeetingID } = createMeeting;

  const setProps = (props: object) =>
    setCreateMeeting({ ...createMeeting, ...props });

  return (
    <MeetingCreationContext.Provider value={{ ...createMeeting, setProps }}>
      <section className="w-11/12 lg:gap-0 gap-5 grid md:grid-cols-12 grid-cols-1">
        <MeetingCreationLeft />
        <MeetingCreationRight />
        {meetingID && showMeetingID && <MeetingLinkPopup />}
      </section>
    </MeetingCreationContext.Provider>
  );
});
