import React from "react";
import ChatArea from "../../chat/chat-area/chat-area.component";
import { MeetingMembers } from "../meeting-members/meeting-members.component";

export const MeetingArea = () => {
  return (
    <main className="w-full relative grid grid-cols-12">
      <MeetingMembers />
      <ChatArea />
    </main>
  );
};
