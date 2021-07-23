import React, { useEffect, useState } from "react";
import { MessageType } from "../../../types/chat.types";
import { DataChannel } from "../../../utils/connection.util";
import { ChatContext } from "../chat-context/chat.context";
import { ChatHeader } from "../chat-header/chat-header.component";
import { ChatInput } from "../chat-input/chat-input.component";
import { ChatMessageArea } from "../chat-message-area/chat-message-area.component";

const ChatArea = () => {
  const [messages, setMessage] = useState<MessageType[]>([]);

  // Listen for Messages
  useEffect(() => {
    if (DataChannel) {
      DataChannel.onmessage = (e) => {
        setMessage([...messages, JSON.parse(e.data)]);
      };
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        setMessageProps: (message: MessageType) =>
          setMessage([...messages, message]),
      }}
    >
      <section className="col-span-3 text-highlight flex flex-col justify-around items-center border-secondryBack border">
        <ChatHeader />
        <ChatMessageArea />
        <ChatInput />
      </section>
    </ChatContext.Provider>
  );
};

export default ChatArea;
