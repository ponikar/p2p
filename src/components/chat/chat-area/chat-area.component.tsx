import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { MessageType } from "../../../types/chat.types";
import { MeetingAreaContext } from "../../meeting/meeting-area/meeting-area.component";
import { ChatContext } from "../chat-context/chat.context";
import { ChatInput } from "../chat-input/chat-input.component";
import { ChatMessageArea } from "../chat-message-area/chat-message-area.component";

export const ChatArea: FC = () => {
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
    <ChatContext.Provider
      value={{
        messages,
        setMessageProps,
        chatChannels,
      }}
    >
      <section className="flex flex-col justify-around flex-1 items-center">
        <ChatMessageArea />
        <ChatInput />
      </section>
    </ChatContext.Provider>
  );
};
