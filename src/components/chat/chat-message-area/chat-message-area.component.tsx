import React, { FC } from "react";
import { ChatMessage } from "../chat-message/chat-message.component";
import "./chat-message-area.style.css"
const Message = Array(20).fill(20);

export const ChatMessageArea: FC = () => {
  return (
    <section className="chat-message-list">
      {Message.map((_, index) => (
        <ChatMessage byUser={index % 2 === 0} key={index} />
      ))}
    </section>
  );
};
