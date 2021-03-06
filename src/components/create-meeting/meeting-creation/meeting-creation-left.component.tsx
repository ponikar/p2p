import React, { FC, useCallback, useContext, useEffect } from "react";
import { Plus } from "react-feather";
import { useSelector } from "react-redux";
import { useMutationApi } from "../../../hooks/apis/use-mutation.hook";
import { selectUser } from "../../../store/user/user.selectors";
import { PrimaryButton } from "../../common/button.component";
import { ToastContext } from "../../common/toast/toast.context";
import { SectionTitle } from "../../common/typography/typography.component";
import { MeetingCreationContext } from "./meeting-creation.context";

export const MeetingCreationLeft: FC = () => {
  const { setProps } = useContext(MeetingCreationContext);
  const { uid } = useSelector(selectUser);
  const { mutate, isLoading, error, data } = useMutationApi<
    any,
    Error,
    { uid: string }
  >({
    endpoint: "http://localhost:8085/create-meeting",
  });
  const { setToastProps } = useContext(ToastContext);

  const createMeeting = useCallback(async () => {
    if (!uid)
      return setToastProps({
        show: true,
        text: "Please login with your Google account!",
        type: "danger",
      });

    mutate({ uid });
  }, [uid]);

  useEffect(() => {
    if (data?.data) {
      const {
        data: { meetingid, uid },
      } = data;
      setProps({ meetingID: meetingid, showMeetingID: true });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setToastProps({
        text: error.message,
        show: true,
        type: "danger",
      });
    }
  }, [error]);

  return (
    <div className="col-span-4 lg:order-first order-last self-center">
      <header className="lg:w-full md:w-10/12 w-full">
        <SectionTitle title="Get a meeting link and start convertation!" />
      </header>

      <div className="flex">
        <PrimaryButton onClick={createMeeting} className="my-5">
          <Plus className="mr-1" size={20} />
          {isLoading ? "Getting Link.." : "New Meeting"}
        </PrimaryButton>
      </div>
    </div>
  );
};
