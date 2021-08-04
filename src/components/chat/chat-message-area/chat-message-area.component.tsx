import React, { FC, useContext } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user/user.selectors";
import { ChatContext } from "../chat-context/chat.context";
import { ChatMessage } from "../chat-message/chat-message.component";
import "./chat-message-area.style.css"

export const ChatMessageArea: FC = () => {

  const { messages } = useContext(ChatContext);
  const { uid } = useSelector(selectUser);

  return (
    <section className="chat-message-list border-secondryBack">
      {messages.map((chat, i) => {
        const current = messages[i];
        const next = messages[i + 1];
        const isSameMessageBy = next && (current.user.uid === next.user.uid || !current == !next)
        return (
          <ChatMessage {...chat} isSameMessageBy={isSameMessageBy}  byUser={uid === chat.user.uid} key={chat.id} />
        ) })
      }
    </section>
  );
};
