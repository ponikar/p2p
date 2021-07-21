import React, { FC, useCallback, useContext } from "react";
import { Plus } from "react-feather";
import { createMeetingOffer } from "../../../utils/connection.util";
import { PrimaryButton } from "../../common/button.component";
import { MeetingCreationContext } from "./meeting-creation.context";

export const MeetingCreationLeft: FC = () => {
  const { setProps } = useContext(MeetingCreationContext);
  
  const createMeeting = useCallback(async () => {
     try {
      const meetingID = await createMeetingOffer();
      setProps({ meetingID, showMeetingID: true });
     } catch(e) {
       console.log("FAILED TO CREATE MEETING");
     }
  }, [setProps]);

  return (
    <div className="flex-1">
      <header className="xl:text-4xl text-3xl">
        <h2> Hangout with your Friends,</h2>
        <h2> Feel like Home! </h2>
      </header>

      <div className="flex">
        <PrimaryButton onClick={createMeeting} className="my-5">
          <Plus className="mr-1" size={20} />
          New Meeting
        </PrimaryButton>
      </div>
    </div>
  );
};
