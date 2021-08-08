import React, { FC, useState } from "react";
import { ChatArea } from "../../chat/chat-area/chat-area.component";
import { MeetingMembersList } from "../meeting-members-list/meeting-members-list.componet";
import { MeetingTabHeader } from "./meeting-tab-header.component";

export const MeetingTab: FC = () => {
  const [isChatTabActive, setIsChatTabActive] = useState(false);

  return (
    <section className="col-span-3 flex flex-col text-highlight border-secondryBack border">
      <MeetingTabHeader {...{ isChatTabActive, setIsChatTabActive }} />
      {isChatTabActive ? <ChatArea /> : <MeetingMembersList />}
    </section>
  );
};
