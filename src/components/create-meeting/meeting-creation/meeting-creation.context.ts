import { createContext } from "react";

interface MeetingCreationPropsType {
    meetingID: string,
    showMeetingID: boolean,
    setProps: (props: object) => void
}

export const MEETING_CREATION_DEFAULT_STATE = {
  meetingID: "",
  showMeetingID: false,
};

export const MeetingCreationContext = createContext<MeetingCreationPropsType>({...MEETING_CREATION_DEFAULT_STATE, setProps: () => {}});
