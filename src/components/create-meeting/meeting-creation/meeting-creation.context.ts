import { createContext } from "react";

export interface MeetingCreationPropsType {
  meetingID: string;
  showMeetingID: boolean;
  setProps: (props: Partial<MeetingCreationPropsType>) => void;
}

export const MEETING_CREATION_DEFAULT_STATE = {
  meetingID: "",
  showMeetingID: false,
};

export const MeetingCreationContext = createContext<MeetingCreationPropsType>({
  ...MEETING_CREATION_DEFAULT_STATE,
  setProps: () => null,
});
