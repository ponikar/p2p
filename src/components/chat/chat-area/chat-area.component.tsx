import React, { FC, memo, useCallback, useEffect, useState } from "react";
import { MessageType } from "../../../types/chat.types";
import { DataChannelType } from "../../../types/connection.types";
import { ChatContext } from "../chat-context/chat.context";
import { ChatHeader } from "../chat-header/chat-header.component";
import { ChatInput } from "../chat-input/chat-input.component";
import { ChatMessageArea } from "../chat-message-area/chat-message-area.component";

interface ChatAreaProps {
  chatChannels: DataChannelType;
}

const ChatArea: FC<ChatAreaProps> = ({ chatChannels }) => {
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
      <section className="col-span-3 text-highlight flex flex-col justify-around items-center border-secondryBack border">
        <ChatHeader />
        <ChatMessageArea />
        <ChatInput />
      </section>
    </ChatContext.Provider>
  );
};

export default ChatArea;
