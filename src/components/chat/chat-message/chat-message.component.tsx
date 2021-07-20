import React, { FC } from "react";
import { MessageType } from "../../../types/chat.types";
import { getMessageTime } from "../../../utils/time.utills";
import "./chat-message.style.css";

interface ChatMessageType extends MessageType {
  byUser?: boolean;
  isSameMessageBy: boolean;
}
export const ChatMessage: FC<ChatMessageType> = ({
  text,
  createdAt,
  isSameMessageBy,
  id,
  byUser = false,
}) => {
  return (
    <div
      className={`flex w-full m-4 items-center relative ${
        byUser && "justify-end"
      }`}
    >
      {!byUser && (
        <img
          src="https://robohash.org/logo"
          className="w-10 border h-10 object-contain rounded-full"
        />
      )}

      <p className={`chat-message-area ${byUser && "bg-primary text-white"}`}>
        {text}
      </p>
      {!isSameMessageBy && createdAt && (
        <span className="text-xs absolute -bottom-6 text-highlight right-5">
          {getMessageTime(createdAt)}
        </span>
      )}
    </div>
  );
};
