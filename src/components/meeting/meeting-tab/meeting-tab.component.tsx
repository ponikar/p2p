import React, { FC, useState } from "react";
import { ChatArea } from "../../chat/chat-area/chat-area.component";
import { MeetingTabHeader } from "./meeting-tab-header.component";

export const MeetingTab: FC = () => {
  const [isChatTabActive, setIsChatTabActive] = useState(true);

  return (
    <section className="col-span-3 flex flex-col text-highlight border-secondryBack border">
      <MeetingTabHeader />
      {isChatTabActive ? <ChatArea /> : <div />}
    </section>
  );
};
