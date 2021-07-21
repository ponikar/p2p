import React, { FC, useState } from "react";
import { MeetingLinkPopup } from "../meeting-link-popup/meeting-link-popup.component";
import { MeetingCreationLeft } from "./meeting-creation-left.component";
import { MeetingCreationRight } from "./meeting-creation-right.component";
import {
  MeetingCreationContext,
  MEETING_CREATION_DEFAULT_STATE,
} from "./meeting-creation.context";
import "./meeting-creation.style.css";
export const MeetingCreation: FC = () => {
  const [createMeeting, setCreateMeeting] = useState(
    MEETING_CREATION_DEFAULT_STATE
  );

  const { meetingID, showMeetingID } = createMeeting;

  const setProps = (props: object) =>
    setCreateMeeting({ ...createMeeting, ...props });

  return (
    <MeetingCreationContext.Provider value={{ ...createMeeting, setProps }}>
      <section className="p-5 w-10/12 mx-auto flex items-center border-black">
        <MeetingCreationLeft />
        <MeetingCreationRight />
        { (meetingID && showMeetingID) &&  <MeetingLinkPopup /> }
      </section>
    </MeetingCreationContext.Provider>
  );
};
