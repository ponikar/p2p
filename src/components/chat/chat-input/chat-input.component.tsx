import React, { FC, KeyboardEvent, useContext, useState } from "react";
import { Send, Smile } from "react-feather";
import { ChatContext } from "../chat-context/chat.context";
import { makeNewMessage } from "../chat.helpers";
import { SendButton } from "./send-button.component";

export const ChatInput: FC = () => {
  const [newMessage, setNewMessage] = useState<string>("");
  const { setMessageProps, messages } = useContext(ChatContext);

  const onSendMessage = () => {
    if (newMessage) {
      setMessageProps(makeNewMessage({ text: newMessage, user: null }));
      setNewMessage("");
    }
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && onSendMessage();

  return (
    <section className="w-11/12 items-center flex rounded-3xl py-2 px-3 my-2  border">
      <Smile className="text-gray-400 cursor-pointer" size={28} />
      <input
        onKeyUp={onPressEnter}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="w-full mx-1 text-sm p-1"
        placeholder="Type a message!"
      />
      <SendButton onClick={onSendMessage} />
    </section>
  );
};
