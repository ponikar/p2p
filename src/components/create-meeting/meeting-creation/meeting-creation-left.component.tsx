import React, { FC, useCallback, useContext } from "react";
import { Plus } from "react-feather";
import { WebRTCChannels } from "../../../constants/channels.constants";
import { useWebcam } from "../../../hooks/use-web-cam.hook";
import {
  Connection,
  createMeetingOffer,
  createWebRTCChannel,
} from "../../../utils/connection.util";
import { BaseContext } from "../../base/base.context";
import { PrimaryButton } from "../../common/button.component";
import { MeetingCreationContext } from "./meeting-creation.context";

export const MeetingCreationLeft: FC = () => {
  const { setProps } = useContext(MeetingCreationContext);
  const { setControls } = useContext(BaseContext);

  // asking for permisson and setting up data channel
  useWebcam(() => {}, []);
  const createMeeting = useCallback(async () => {
    try {
      // temp
      const channel_name = WebRTCChannels.getUserStreamingControl("A");
      createWebRTCChannel(channel_name);
      const meetingID = await createMeetingOffer();
      setProps({ meetingID, showMeetingID: true });
    } catch (e) {
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
