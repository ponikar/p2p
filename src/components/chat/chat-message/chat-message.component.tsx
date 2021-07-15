import React, { FC } from "react";
import "./chat-message.style.css";

interface ChatMessageType {
  byUser?: boolean;
}
export const ChatMessage: FC<ChatMessageType> = ({ byUser = false }) => {
  return (
    <div className={`flex w-full m-4 items-center ${byUser && "justify-end"}`}>
      {!byUser && (
        <img
          src="https://robohash.org/logo"
          className="w-10 border h-10 object-contain rounded-full"
        />
      )}

      <div className="chat-message-area">
        This is message you will see! hey this
      </div>
    </div>
  );
};
