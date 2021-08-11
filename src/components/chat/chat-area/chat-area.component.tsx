import React, { FC, memo, useContext } from "react";
import { MessageType } from "../../../types/chat.types";
import { MeetingAreaContext } from "../../meeting/meeting-area/meeting-area.component";
import { ChatContext } from "../chat-context/chat.context";
import { ChatInput } from "../chat-input/chat-input.component";
import { ChatMessageArea } from "../chat-message-area/chat-message-area.component";

interface ChatAreaInterfaceProps {
  messages: MessageType[];
  setMessageProps: (msg: MessageType) => void;
}

export const ChatArea: FC<ChatAreaInterfaceProps> = memo(
  ({ messages, setMessageProps }) => {
    return (
      <ChatContext.Provider
        value={{
          messages,
          setMessageProps,
        }}
      >
        <section className="flex flex-col justify-around flex-1 items-center">
          <ChatMessageArea />
          <ChatInput />
        </section>
      </ChatContext.Provider>
    );
  }
);
