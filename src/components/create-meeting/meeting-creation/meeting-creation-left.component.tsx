import React, { FC, useCallback, useContext, useEffect } from "react";
import { Plus } from "react-feather";
import { useMutationApi } from "../../../hooks/apis/use-mutation.hook";
import { BaseContext } from "../../base/base.context";
import { PrimaryButton } from "../../common/button.component";
import { MeetingCreationContext } from "./meeting-creation.context";

export const MeetingCreationLeft: FC = () => {
  const { setProps } = useContext(MeetingCreationContext);
  const { setControls } = useContext(BaseContext);
  const { mutate, isLoading, error, data } = useMutationApi({ endpoint: "http://localhost:8085/create-meeting" })


  const createMeeting = useCallback(async () => {
      mutate({ uid: "hxhxhxhx" });
  }, []);
  
  useEffect(() => {
      if(data?.data) {
        const { data: { meetingid, uid } } = data;
        setProps({ meetingID: meetingid, showMeetingID: true });
      }
  }, [data]);

  return (
    <div className="flex-1">
      <header className="xl:text-4xl text-3xl">
        <h2> Hangout with your Friends,</h2>
        <h2> Feel like Home! </h2>
      </header>

      <div className="flex">
        <PrimaryButton onClick={createMeeting} className="my-5">
          <Plus className="mr-1" size={20} />
          { isLoading ? "Getting Link.." : "New Meeting" }
        </PrimaryButton>
      </div>
    </div>
  );
};
