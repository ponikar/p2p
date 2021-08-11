import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { MessageType } from "../../../types/chat.types";
import { ChatArea } from "../../chat/chat-area/chat-area.component";
import { MeetingAreaContext } from "../meeting-area/meeting-area.component";
import { MeetingMembersList } from "../meeting-members-list/meeting-members-list.componet";
import { MeetingTabHeader } from "./meeting-tab-header.component";

export const MeetingTab: FC = () => {
  const [isChatTabActive, setIsChatTabActive] = useState(false);
  const { chatChannels } = useContext(MeetingAreaContext);

  const [messages, setMessage] = useState<MessageType[]>([]);

  const setMessageProps = useCallback(
    (message: MessageType) => setMessage([...messages, message]),
    [messages, setMessage]
  );

  useEffect(() => {
    if (chatChannels) {
      Object.entries(chatChannels).forEach((peer) => {
        if (peer[1])
          peer[1].onmessage = (e) => {
            console.log("I GOT MESSAGE for you!!");
            setMessageProps(JSON.parse(e.data));
          };
      });
    }
  }, [chatChannels, messages]);

  return (
    <section className="col-span-3 flex flex-col text-highlight border-secondryBack border">
      <MeetingTabHeader {...{ isChatTabActive, setIsChatTabActive }} />
      {isChatTabActive ? (
        <ChatArea {...{ messages, setMessageProps }} />
      ) : (
        <MeetingMembersList />
      )}
    </section>
  );
};
