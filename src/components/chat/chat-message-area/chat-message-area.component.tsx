import React, { FC, useContext } from "react";
import { ChatContext } from "../chat-context/chat.context";
import { ChatMessage } from "../chat-message/chat-message.component";
import "./chat-message-area.style.css"

export const ChatMessageArea: FC = () => {

  const { messages } = useContext(ChatContext)

  return (
    <section className="chat-message-list">
      {messages.map((chat, i) => {
        const current = messages[i];
        const next = messages[i + 1];
        const isSameMessageBy = next && (current.user?.id === next.user?.id || !current == !next)
        return (
          <ChatMessage {...chat} isSameMessageBy={isSameMessageBy}  byUser={!chat.user} key={chat.id} />
        ) })
      }
    </section>
  );
};
